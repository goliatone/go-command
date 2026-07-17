package dispatcher

import (
	"context"
	stderrors "errors"
	"sync/atomic"
	"testing"
	"time"

	"github.com/goliatone/go-command"
	gerrors "github.com/goliatone/go-errors"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

type fakeRemoteDispatcher struct {
	dispatch func(context.Context, command.DispatchRoute, command.MessageRegistration, any, command.DispatchOptions) (command.DispatchOutcome, error)
	calls    atomic.Int32
}

func (f *fakeRemoteDispatcher) DispatchRemote(ctx context.Context, route command.DispatchRoute, registration command.MessageRegistration, message any, options command.DispatchOptions) (command.DispatchOutcome, error) {
	f.calls.Add(1)
	return f.dispatch(ctx, route, registration, message, options)
}

func configureRemoteRuntime(t *testing.T, kind command.HandlerKind, remote command.RemoteDispatcher) (*Runtime, command.MessageRegistration) {
	t.Helper()
	runtime, provider := buildDynamicRuntime(t)
	var registration command.MessageRegistration
	var ok bool
	switch kind {
	case command.HandlerKindQuery:
		registration, ok = provider.RegistrationByMessageType(kind, "dynamic.query")
	default:
		registration, ok = provider.RegistrationByMessageType(kind, "dynamic.command")
	}
	require.True(t, ok)
	require.NoError(t, runtime.ReplacePlacementPolicies(command.PlacementPolicy{
		Kind: kind, RegistrationID: registration.ID(),
		Route: command.DispatchRoute{Target: command.DispatchTargetRemote, Name: "worker-a"},
	}))
	require.NoError(t, runtime.ConfigureRemoteDispatcher(remote))
	return runtime, registration
}

func TestRuntimeRemoteInlineCommandNormalizesExecutingProcessOutcome(t *testing.T) {
	remote := &fakeRemoteDispatcher{dispatch: func(_ context.Context, route command.DispatchRoute, registration command.MessageRegistration, message any, options command.DispatchOptions) (command.DispatchOutcome, error) {
		assert.Equal(t, "worker-a", route.Name)
		assert.Equal(t, "ok", message.(dynamicCommandMessage).Value)
		return command.DispatchOutcome{Receipt: command.DispatchReceipt{
			Accepted: true, Mode: command.ExecutionModeInline, CommandID: registration.ID(), CorrelationID: options.CorrelationID,
		}}, nil
	}}
	runtime, _ := configureRemoteRuntime(t, command.HandlerKindCommand, remote)
	outcome, err := runtime.Dispatch(context.Background(), command.HandlerKindCommand, dynamicCommandMessage{Value: "ok"}, command.DispatchOptions{CorrelationID: "corr-1"})
	require.NoError(t, err)
	assert.Equal(t, command.DispatchTargetRemote, outcome.Target)
	assert.Equal(t, "worker-a", outcome.Route)
	assert.Equal(t, int32(1), remote.calls.Load())
}

func TestRuntimeRemoteQueryRequiresPresentTypedResult(t *testing.T) {
	tests := []struct {
		name    string
		result  any
		present bool
		code    string
	}{
		{name: "missing", code: command.TextCodeDynamicResultMissing},
		{name: "mismatch", result: "wrong", present: true, code: command.TextCodeDynamicResultTypeMismatch},
		{name: "present nil", result: (*dynamicQueryResult)(nil), present: true},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			remote := &fakeRemoteDispatcher{dispatch: func(_ context.Context, _ command.DispatchRoute, registration command.MessageRegistration, _ any, _ command.DispatchOptions) (command.DispatchOutcome, error) {
				return command.DispatchOutcome{
					Receipt:       command.DispatchReceipt{Accepted: true, Mode: command.ExecutionModeInline, CommandID: registration.ID()},
					Result:        tt.result,
					ResultPresent: tt.present,
				}, nil
			}}
			runtime, _ := configureRemoteRuntime(t, command.HandlerKindQuery, remote)
			outcome, err := runtime.Dispatch(context.Background(), command.HandlerKindQuery, dynamicQueryMessage{}, command.DispatchOptions{})
			if tt.code != "" {
				assertStructuredTextCode(t, err, tt.code)
				return
			}
			require.NoError(t, err)
			assert.True(t, outcome.ResultPresent)
			assert.Nil(t, outcome.Result)
		})
	}
}

func TestRuntimeRemoteQueuedAcceptanceRequiresCompleteReceipt(t *testing.T) {
	now := time.Now().UTC()
	remote := &fakeRemoteDispatcher{dispatch: func(_ context.Context, _ command.DispatchRoute, registration command.MessageRegistration, _ any, _ command.DispatchOptions) (command.DispatchOutcome, error) {
		return command.DispatchOutcome{
			Receipt: command.DispatchReceipt{
				Accepted: true, Mode: command.ExecutionModeQueued, CommandID: registration.ID(),
				DispatchID: "dispatch-remote", EnqueuedAt: &now,
			},
			StatusReference: "status/dispatch-remote",
		}, nil
	}}
	runtime, _ := configureRemoteRuntime(t, command.HandlerKindCommand, remote)
	outcome, err := runtime.Dispatch(context.Background(), command.HandlerKindCommand, dynamicCommandMessage{}, command.DispatchOptions{Mode: command.ExecutionModeQueued})
	require.NoError(t, err)
	assert.Equal(t, "dispatch-remote", outcome.Receipt.DispatchID)
	assert.Equal(t, "status/dispatch-remote", outcome.StatusReference)
}

func TestRuntimeRemotePropagatesDeadlineCancellationAndAmbiguousErrors(t *testing.T) {
	t.Run("deadline and cancellation", func(t *testing.T) {
		remote := &fakeRemoteDispatcher{dispatch: func(ctx context.Context, _ command.DispatchRoute, _ command.MessageRegistration, _ any, _ command.DispatchOptions) (command.DispatchOutcome, error) {
			_, hasDeadline := ctx.Deadline()
			assert.True(t, hasDeadline)
			<-ctx.Done()
			return command.DispatchOutcome{}, ctx.Err()
		}}
		runtime, _ := configureRemoteRuntime(t, command.HandlerKindCommand, remote)
		ctx, cancel := context.WithTimeout(context.Background(), 20*time.Millisecond)
		defer cancel()
		_, err := runtime.Dispatch(ctx, command.HandlerKindCommand, dynamicCommandMessage{}, command.DispatchOptions{})
		assert.ErrorIs(t, err, context.DeadlineExceeded)
	})

	t.Run("ambiguous structured error", func(t *testing.T) {
		ambiguous := gerrors.New("outcome unknown", gerrors.CategoryExternal).WithTextCode("REMOTE_OUTCOME_AMBIGUOUS")
		remote := &fakeRemoteDispatcher{dispatch: func(context.Context, command.DispatchRoute, command.MessageRegistration, any, command.DispatchOptions) (command.DispatchOutcome, error) {
			return command.DispatchOutcome{}, ambiguous
		}}
		runtime, _ := configureRemoteRuntime(t, command.HandlerKindCommand, remote)
		_, err := runtime.Dispatch(context.Background(), command.HandlerKindCommand, dynamicCommandMessage{}, command.DispatchOptions{})
		assert.Same(t, ambiguous, err)
		assert.True(t, stderrors.Is(err, ambiguous))
	})
}

func TestRuntimeRemoteRejectsUncorrelatedReceipt(t *testing.T) {
	remote := &fakeRemoteDispatcher{dispatch: func(_ context.Context, _ command.DispatchRoute, _ command.MessageRegistration, _ any, _ command.DispatchOptions) (command.DispatchOutcome, error) {
		return command.DispatchOutcome{Receipt: command.DispatchReceipt{
			Accepted: true, Mode: command.ExecutionModeInline, CommandID: "wrong",
		}}, nil
	}}
	runtime, _ := configureRemoteRuntime(t, command.HandlerKindCommand, remote)
	_, err := runtime.Dispatch(context.Background(), command.HandlerKindCommand, dynamicCommandMessage{}, command.DispatchOptions{})
	assertStructuredTextCode(t, err, command.TextCodeDispatchReceiptInvalid)
}

func TestRuntimeRemoteConfigurationRequiresProviderAndAcceptsTypedNilClear(t *testing.T) {
	runtime := NewRuntime()
	remote := &fakeRemoteDispatcher{dispatch: func(context.Context, command.DispatchRoute, command.MessageRegistration, any, command.DispatchOptions) (command.DispatchOutcome, error) {
		return command.DispatchOutcome{}, nil
	}}
	assertStructuredTextCode(t, runtime.ConfigureRemoteDispatcher(remote), command.TextCodeRegistrationProviderNotConfigured)

	runtime, _ = buildDynamicRuntime(t)
	require.NoError(t, runtime.ConfigureRemoteDispatcher(remote))
	var typedNil *fakeRemoteDispatcher
	require.NoError(t, runtime.ConfigureRemoteDispatcher(typedNil))
}

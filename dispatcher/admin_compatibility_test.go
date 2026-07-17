package dispatcher

import (
	"context"
	"fmt"
	"testing"

	"github.com/goliatone/go-command"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

type adminStringCommand struct{}

func (adminStringCommand) Type() string { return "admin.string" }

type adminZeroCommand struct{}

func (adminZeroCommand) Type() string { return "admin.zero" }

type adminNilCommand struct{}

func (adminNilCommand) Type() string { return "admin.nil" }

type adminCompatibilityResult struct{ Value string }

func goAdminStyleFactory[T any, R any](ctx context.Context, message T) (R, error) {
	collector := command.NewResult[R]()
	ctx = command.ContextWithResult(ctx, collector)
	if _, err := DispatchWith(ctx, message, command.DispatchOptions{}); err != nil {
		var zero R
		return zero, err
	}
	result, stored := collector.Load()
	if !stored {
		var zero R
		return zero, fmt.Errorf("result not stored")
	}
	return result, collector.Error()
}

func buildAdminCompatibilityRuntime(t *testing.T, remote command.RemoteDispatcher) *Runtime {
	t.Helper()
	runtime := NewRuntime()
	SubscribeCommandTo(runtime, command.CommandFunc[adminStringCommand](func(ctx context.Context, _ adminStringCommand) error {
		command.ResultFromContext[string](ctx).Store("local-string")
		return nil
	}))
	SubscribeCommandTo(runtime, command.CommandFunc[adminZeroCommand](func(ctx context.Context, _ adminZeroCommand) error {
		command.ResultFromContext[int](ctx).Store(0)
		return nil
	}))
	SubscribeCommandTo(runtime, command.CommandFunc[adminNilCommand](func(ctx context.Context, _ adminNilCommand) error {
		command.ResultFromContext[*adminCompatibilityResult](ctx).Store(nil)
		return nil
	}))

	registry := command.NewRegistry()
	require.NoError(t, registry.RegisterCommand(command.CommandFunc[adminStringCommand](func(context.Context, adminStringCommand) error { return nil })))
	require.NoError(t, registry.RegisterCommand(command.CommandFunc[adminZeroCommand](func(context.Context, adminZeroCommand) error { return nil })))
	require.NoError(t, registry.RegisterCommand(command.CommandFunc[adminNilCommand](func(context.Context, adminNilCommand) error { return nil })))
	require.NoError(t, registry.Initialize())
	require.NoError(t, runtime.AttachRegistrationProvider(registry))

	policies := make([]command.PlacementPolicy, 0, 3)
	for _, registration := range registry.Registrations() {
		policies = append(policies, command.PlacementPolicy{
			Kind: command.HandlerKindCommand, RegistrationID: registration.ID(),
			Route: command.DispatchRoute{Target: command.DispatchTargetRemote, Name: "admin-worker"},
		})
	}
	require.NoError(t, runtime.ReplacePlacementPolicies(policies...))
	require.NoError(t, runtime.ConfigureRemoteDispatcher(remote))
	return runtime
}

func TestGoAdminStyleFactoryReceivesRemoteInlineZeroAndNilResults(t *testing.T) {
	remote := &fakeRemoteDispatcher{dispatch: func(_ context.Context, _ command.DispatchRoute, registration command.MessageRegistration, _ any, _ command.DispatchOptions) (command.DispatchOutcome, error) {
		outcome := command.DispatchOutcome{
			Receipt:       command.DispatchReceipt{Accepted: true, Mode: command.ExecutionModeInline, CommandID: registration.ID()},
			ResultPresent: true,
		}
		switch registration.MessageType() {
		case "admin.string":
			outcome.Result = "remote-string"
		case "admin.zero":
			outcome.Result = 0
		case "admin.nil":
			outcome.Result = (*adminCompatibilityResult)(nil)
		}
		return outcome, nil
	}}
	runtime := buildAdminCompatibilityRuntime(t, remote)
	restore, err := InstallDefaultRuntime(runtime)
	require.NoError(t, err)
	t.Cleanup(restore)

	stringResult, err := goAdminStyleFactory[adminStringCommand, string](context.Background(), adminStringCommand{})
	require.NoError(t, err)
	assert.Equal(t, "remote-string", stringResult)
	zeroResult, err := goAdminStyleFactory[adminZeroCommand, int](context.Background(), adminZeroCommand{})
	require.NoError(t, err)
	assert.Zero(t, zeroResult)
	nilResult, err := goAdminStyleFactory[adminNilCommand, *adminCompatibilityResult](context.Background(), adminNilCommand{})
	require.NoError(t, err)
	assert.Nil(t, nilResult)
}

func TestGoAdminStyleFactoryForcedLocalIngressDoesNotRepublish(t *testing.T) {
	remote := &fakeRemoteDispatcher{dispatch: func(context.Context, command.DispatchRoute, command.MessageRegistration, any, command.DispatchOptions) (command.DispatchOutcome, error) {
		t.Fatal("forced-local go-admin factory reached remote dispatcher")
		return command.DispatchOutcome{}, nil
	}}
	runtime := buildAdminCompatibilityRuntime(t, remote)
	restore, err := InstallDefaultRuntime(runtime)
	require.NoError(t, err)
	t.Cleanup(restore)

	ctx := command.ContextWithForcedLocalDispatch(context.Background())
	result, err := goAdminStyleFactory[adminStringCommand, string](ctx, adminStringCommand{})
	require.NoError(t, err)
	assert.Equal(t, "local-string", result)
	assert.Zero(t, remote.calls.Load())
}

func TestGoAdminStyleFactoryRejectsRemoteResultMismatch(t *testing.T) {
	remote := &fakeRemoteDispatcher{dispatch: func(_ context.Context, _ command.DispatchRoute, registration command.MessageRegistration, _ any, _ command.DispatchOptions) (command.DispatchOutcome, error) {
		return command.DispatchOutcome{
			Receipt:       command.DispatchReceipt{Accepted: true, Mode: command.ExecutionModeInline, CommandID: registration.ID()},
			Result:        42,
			ResultPresent: true,
		}, nil
	}}
	runtime := buildAdminCompatibilityRuntime(t, remote)
	restore, err := InstallDefaultRuntime(runtime)
	require.NoError(t, err)
	t.Cleanup(restore)

	_, err = goAdminStyleFactory[adminStringCommand, string](context.Background(), adminStringCommand{})
	assertStructuredTextCode(t, err, command.TextCodeDynamicResultTypeMismatch)
}

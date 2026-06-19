package dispatcher

import (
	"context"
	stderrors "errors"
	"testing"
	"time"

	"github.com/goliatone/go-command"
	"github.com/goliatone/go-command/router"
	gerrors "github.com/goliatone/go-errors"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

type routingDispatchMessage struct {
	Value string
}

func (routingDispatchMessage) Type() string {
	return "routing.dispatch.test"
}

type captureExecutor struct {
	called       bool
	gotCommandID string
	gotOpts      command.DispatchOptions
	gotRun       command.DispatchRunContext
	receipt      command.DispatchReceipt
	err          error
}

func (e *captureExecutor) Execute(ctx context.Context, _ any, commandID string, opts command.DispatchOptions) (command.DispatchReceipt, error) {
	e.called = true
	e.gotCommandID = commandID
	e.gotOpts = opts
	e.gotRun, _ = command.DispatchRunFromContext(ctx)
	return e.receipt, e.err
}

type captureResolver struct {
	mode   command.ExecutionMode
	found  bool
	err    error
	calls  int
	lastID string
}

func (r *captureResolver) ResolveMode(_ context.Context, commandID string) (command.ExecutionMode, bool, error) {
	r.calls++
	r.lastID = commandID
	return r.mode, r.found, r.err
}

func setupDispatchRoutingTest(t *testing.T) {
	t.Helper()
	Reset()
	setTestMuxes(
		router.NewMux(router.WithMatcher(exactRouteMatcher)),
		router.NewMux(router.WithMatcher(exactRouteMatcher)),
	)
	ExitOnErr = false
	t.Cleanup(func() {
		Reset()
		ExitOnErr = false
	})
}

type routingUntypedMessage struct {
	Value string
}

func TestDispatchWithExplicitModeWinsOverContextAndResolver(t *testing.T) {
	setupDispatchRoutingTest(t)

	queuedExec := &captureExecutor{
		receipt: command.DispatchReceipt{
			Accepted:   true,
			DispatchID: "dispatch-1",
			EnqueuedAt: ptrTime(time.Now().UTC()),
		},
	}
	require.NoError(t, RegisterExecutor(command.ExecutionModeQueued, queuedExec))

	resolver := &captureResolver{mode: command.ExecutionModeInline, found: true}
	SetModeResolver(resolver)

	ctx := command.ContextWithDispatchOptions(context.Background(), command.DispatchOptions{
		Mode:          command.ExecutionModeInline,
		CorrelationID: "ctx-correlation",
		Metadata: map[string]any{
			"ctx_only": "yes",
			"shared":   "ctx",
		},
	})

	receipt, err := DispatchWith(ctx, routingDispatchMessage{Value: "x"}, command.DispatchOptions{
		Mode:          command.ExecutionModeQueued,
		CorrelationID: "explicit-correlation",
		Metadata: map[string]any{
			"explicit_only": "yes",
			"shared":        "explicit",
		},
	})
	require.NoError(t, err)
	require.True(t, queuedExec.called)
	assert.Equal(t, "routing.dispatch.test", queuedExec.gotCommandID)
	assert.Equal(t, command.ExecutionModeQueued, queuedExec.gotOpts.Mode)
	assert.Equal(t, "explicit-correlation", queuedExec.gotOpts.CorrelationID)
	assert.Equal(t, "yes", queuedExec.gotOpts.Metadata["ctx_only"])
	assert.Equal(t, "yes", queuedExec.gotOpts.Metadata["explicit_only"])
	assert.Equal(t, "explicit", queuedExec.gotOpts.Metadata["shared"])
	assert.Equal(t, 0, resolver.calls)

	assert.True(t, receipt.Accepted)
	assert.Equal(t, command.ExecutionModeQueued, receipt.Mode)
	assert.Equal(t, "routing.dispatch.test", receipt.CommandID)
	assert.Equal(t, "explicit-correlation", receipt.CorrelationID)
	assert.Equal(t, "dispatch-1", receipt.DispatchID)
	require.NotNil(t, receipt.EnqueuedAt)
}

func TestDispatchWithContextModeWinsWhenExplicitMissing(t *testing.T) {
	setupDispatchRoutingTest(t)

	queuedExec := &captureExecutor{
		receipt: command.DispatchReceipt{
			Accepted:   true,
			DispatchID: "dispatch-2",
			EnqueuedAt: ptrTime(time.Now().UTC()),
		},
	}
	require.NoError(t, RegisterExecutor(command.ExecutionModeQueued, queuedExec))

	resolver := &captureResolver{mode: command.ExecutionModeInline, found: true}
	SetModeResolver(resolver)

	ctx := command.ContextWithDispatchOptions(context.Background(), command.DispatchOptions{
		Mode: command.ExecutionModeQueued,
	})

	receipt, err := DispatchWith(ctx, routingDispatchMessage{}, command.DispatchOptions{})
	require.NoError(t, err)

	assert.True(t, queuedExec.called)
	assert.Equal(t, 0, resolver.calls)
	assert.True(t, receipt.Accepted)
	assert.Equal(t, command.ExecutionModeQueued, receipt.Mode)
}

func TestDispatchWithResolverModeWhenNoExplicitOrContextMode(t *testing.T) {
	setupDispatchRoutingTest(t)

	queuedExec := &captureExecutor{
		receipt: command.DispatchReceipt{
			Accepted:   true,
			DispatchID: "dispatch-3",
			EnqueuedAt: ptrTime(time.Now().UTC()),
		},
	}
	require.NoError(t, RegisterExecutor(command.ExecutionModeQueued, queuedExec))

	resolver := &captureResolver{mode: command.ExecutionModeQueued, found: true}
	SetModeResolver(resolver)

	receipt, err := DispatchWith(context.Background(), routingDispatchMessage{}, command.DispatchOptions{})
	require.NoError(t, err)

	assert.True(t, queuedExec.called)
	assert.Equal(t, 1, resolver.calls)
	assert.Equal(t, "routing.dispatch.test", resolver.lastID)
	assert.Equal(t, command.ExecutionModeQueued, receipt.Mode)
}

func TestDispatchWithResolverIgnoresModeValueWhenNotFound(t *testing.T) {
	setupDispatchRoutingTest(t)

	var inlineCalled bool
	SubscribeCommand(command.CommandFunc[routingDispatchMessage](func(ctx context.Context, msg routingDispatchMessage) error {
		inlineCalled = true
		return nil
	}))

	SetModeResolver(&captureResolver{
		mode:  command.ExecutionMode("bad-mode"),
		found: false,
	})

	receipt, err := DispatchWith(context.Background(), routingDispatchMessage{}, command.DispatchOptions{})
	require.NoError(t, err)
	assert.True(t, inlineCalled)
	assert.Equal(t, command.ExecutionModeInline, receipt.Mode)
}

func TestDispatchWithFallsBackToInlineWhenModeMissingEverywhere(t *testing.T) {
	setupDispatchRoutingTest(t)

	var inlineCalled bool
	SubscribeCommand(command.CommandFunc[routingDispatchMessage](func(ctx context.Context, msg routingDispatchMessage) error {
		inlineCalled = true
		return nil
	}))

	receipt, err := DispatchWith(context.Background(), routingDispatchMessage{}, command.DispatchOptions{})
	require.NoError(t, err)
	assert.True(t, inlineCalled)
	assert.True(t, receipt.Accepted)
	assert.Equal(t, command.ExecutionModeInline, receipt.Mode)
	assert.Equal(t, "routing.dispatch.test", receipt.CommandID)
	assert.Empty(t, receipt.DispatchID)
	assert.Nil(t, receipt.EnqueuedAt)
}

func TestDispatchWithInvalidModeReturnsValidationErrorWithoutFallback(t *testing.T) {
	setupDispatchRoutingTest(t)

	tests := []struct {
		name      string
		ctx       context.Context
		opts      command.DispatchOptions
		resolver  *captureResolver
		wantCalls int
	}{
		{
			name:      "invalid explicit mode",
			ctx:       context.Background(),
			opts:      command.DispatchOptions{Mode: command.ExecutionMode("bad-mode")},
			resolver:  &captureResolver{mode: command.ExecutionModeQueued, found: true},
			wantCalls: 0,
		},
		{
			name: "invalid context mode",
			ctx: command.ContextWithDispatchOptions(context.Background(), command.DispatchOptions{
				Mode: command.ExecutionMode("bad-mode"),
			}),
			opts:      command.DispatchOptions{},
			resolver:  &captureResolver{mode: command.ExecutionModeQueued, found: true},
			wantCalls: 0,
		},
		{
			name:      "invalid resolver mode",
			ctx:       context.Background(),
			opts:      command.DispatchOptions{},
			resolver:  &captureResolver{mode: command.ExecutionMode("bad-mode"), found: true},
			wantCalls: 1,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			setupDispatchRoutingTest(t)
			SetModeResolver(tt.resolver)

			_, err := DispatchWith(tt.ctx, routingDispatchMessage{}, tt.opts)
			gerr := mustGoError(t, err)
			assert.Equal(t, command.TextCodeInvalidExecutionMode, gerr.TextCode)
			assert.Equal(t, tt.wantCalls, tt.resolver.calls)
		})
	}
}

func TestDispatchWithInlineSchedulingValidationError(t *testing.T) {
	setupDispatchRoutingTest(t)

	_, err := DispatchWith(context.Background(), routingDispatchMessage{}, command.DispatchOptions{
		Delay: time.Second,
	})
	gerr := mustGoError(t, err)
	assert.Equal(t, command.TextCodeDispatchOptionsInvalid, gerr.TextCode)
}

func TestDispatchWithQueuedMissingIdempotencyValidationError(t *testing.T) {
	setupDispatchRoutingTest(t)

	queuedExec := &captureExecutor{}
	require.NoError(t, RegisterExecutor(command.ExecutionModeQueued, queuedExec))

	_, err := DispatchWith(context.Background(), routingDispatchMessage{}, command.DispatchOptions{
		Mode:        command.ExecutionModeQueued,
		DedupPolicy: command.DedupPolicyDrop,
	})
	gerr := mustGoError(t, err)
	assert.Equal(t, command.TextCodeDispatchOptionsInvalid, gerr.TextCode)
	assert.False(t, queuedExec.called)
}

func TestDispatchWithQueuedModeRejectsMultiHandler(t *testing.T) {
	setupDispatchRoutingTest(t)

	SubscribeCommand(command.CommandFunc[routingDispatchMessage](func(ctx context.Context, msg routingDispatchMessage) error {
		return nil
	}))
	SubscribeCommand(command.CommandFunc[routingDispatchMessage](func(ctx context.Context, msg routingDispatchMessage) error {
		return nil
	}))

	queuedExec := &captureExecutor{
		receipt: command.DispatchReceipt{
			Accepted:   true,
			DispatchID: "dispatch-x",
			EnqueuedAt: ptrTime(time.Now().UTC()),
		},
	}
	require.NoError(t, RegisterExecutor(command.ExecutionModeQueued, queuedExec))

	_, err := DispatchWith(context.Background(), routingDispatchMessage{}, command.DispatchOptions{
		Mode: command.ExecutionModeQueued,
	})
	gerr := mustGoError(t, err)
	assert.Equal(t, command.TextCodeQueueMultiHandlerUnsupported, gerr.TextCode)
	assert.False(t, queuedExec.called)
}

func TestDispatchWithQueuedModeUsesExecutorWhenSingleHandler(t *testing.T) {
	setupDispatchRoutingTest(t)

	SubscribeCommand(command.CommandFunc[routingDispatchMessage](func(ctx context.Context, msg routingDispatchMessage) error {
		return nil
	}))

	now := time.Now().UTC()
	queuedExec := &captureExecutor{
		receipt: command.DispatchReceipt{
			Accepted:   true,
			DispatchID: "dispatch-single",
			EnqueuedAt: &now,
		},
	}
	require.NoError(t, RegisterExecutor(command.ExecutionModeQueued, queuedExec))

	receipt, err := DispatchWith(context.Background(), routingDispatchMessage{}, command.DispatchOptions{
		Mode:          command.ExecutionModeQueued,
		CorrelationID: "corr-queued",
	})
	require.NoError(t, err)

	assert.True(t, queuedExec.called)
	assert.Equal(t, command.ExecutionModeQueued, receipt.Mode)
	assert.Equal(t, "routing.dispatch.test", receipt.CommandID)
	assert.Equal(t, "corr-queued", receipt.CorrelationID)
	assert.Equal(t, "dispatch-single", receipt.DispatchID)
	require.NotNil(t, receipt.EnqueuedAt)
}

func TestDispatchWithQueuedModeRequiresCanonicalCommandID(t *testing.T) {
	setupDispatchRoutingTest(t)

	queuedExec := &captureExecutor{}
	require.NoError(t, RegisterExecutor(command.ExecutionModeQueued, queuedExec))

	_, err := DispatchWith(context.Background(), routingUntypedMessage{}, command.DispatchOptions{
		Mode: command.ExecutionModeQueued,
	})
	gerr := mustGoError(t, err)
	assert.Equal(t, command.TextCodeInvalidCommandID, gerr.TextCode)
	assert.False(t, queuedExec.called)
}

func TestObservedExecutorEmitsSubmittedAfterAcceptedReceipt(t *testing.T) {
	setupDispatchRoutingTest(t)

	var events []command.CommandRunEvent
	AddCommandRunObserver(command.CommandRunObserverFunc(func(_ context.Context, event command.CommandRunEvent) error {
		events = append(events, event)
		return nil
	}))

	now := time.Now().UTC()
	queuedExec := &captureExecutor{
		receipt: command.DispatchReceipt{
			Accepted:   true,
			DispatchID: "dispatch-observed",
			EnqueuedAt: &now,
		},
	}
	require.NoError(t, RegisterObservedExecutor(command.ExecutionModeQueued, queuedExec))

	metadata := map[string]any{"source": "api"}
	receipt, err := DispatchWith(context.Background(), routingDispatchMessage{}, command.DispatchOptions{
		Mode:           command.ExecutionModeQueued,
		CorrelationID:  "corr-observed",
		IdempotencyKey: "idem-observed",
		Metadata:       metadata,
	})
	require.NoError(t, err)
	require.NoError(t, command.ValidateDispatchReceipt(receipt))
	metadata["source"] = "mutated"

	require.True(t, queuedExec.called)
	assert.NotEmpty(t, queuedExec.gotRun.RunID)
	assert.Equal(t, "routing.dispatch.test", queuedExec.gotRun.CommandID)
	require.Len(t, events, 1)
	assert.Equal(t, command.CommandRunPhaseSubmitted, events[0].Phase)
	assert.Equal(t, queuedExec.gotRun.RunID, events[0].RunID)
	assert.Equal(t, "dispatch-observed", events[0].DispatchID)
	assert.Equal(t, command.ExecutionModeQueued, events[0].ExecutionMode)
	assert.Equal(t, "corr-observed", events[0].CorrelationID)
	assert.Equal(t, "idem-observed", events[0].IdempotencyKey)
	assert.Equal(t, "api", events[0].Metadata["source"])
}

func TestRunObservedCommandEmitsQueuedLifecycleWithCapturedRunContext(t *testing.T) {
	setupDispatchRoutingTest(t)

	var events []command.CommandRunEvent
	AddCommandRunObserver(command.CommandRunObserverFunc(func(_ context.Context, event command.CommandRunEvent) error {
		events = append(events, event)
		return nil
	}))

	now := time.Now().UTC()
	queuedExec := &captureExecutor{
		receipt: command.DispatchReceipt{
			Accepted:   true,
			DispatchID: "dispatch-delayed",
			EnqueuedAt: &now,
		},
	}
	require.NoError(t, RegisterObservedExecutor(command.ExecutionModeQueued, queuedExec))

	receipt, err := DispatchWith(context.Background(), routingDispatchMessage{}, command.DispatchOptions{
		Mode:           command.ExecutionModeQueued,
		CorrelationID:  "corr-delayed",
		IdempotencyKey: "idem-delayed",
		Metadata:       map[string]any{"source": "queue"},
	})
	require.NoError(t, err)

	run := queuedExec.gotRun
	run.DispatchID = receipt.DispatchID
	run.Handler = "delayed-worker"
	err = RunObservedCommand(context.Background(), run, func(ctx context.Context) error {
		gotRun, ok := command.DispatchRunFromContext(ctx)
		require.True(t, ok)
		assert.Equal(t, run.RunID, gotRun.RunID)
		assert.Equal(t, "dispatch-delayed", gotRun.DispatchID)
		command.Checkpoint(ctx, "dequeued")
		command.Progress(ctx, 5, 10, command.WithProgressMetadata(map[string]any{"worker": "a"}))
		return nil
	})
	require.NoError(t, err)

	require.Len(t, events, 5)
	wantPhases := []command.CommandRunPhase{
		command.CommandRunPhaseSubmitted,
		command.CommandRunPhaseStarted,
		command.CommandRunPhaseCheckpoint,
		command.CommandRunPhaseProgress,
		command.CommandRunPhaseSucceeded,
	}
	for i, phase := range wantPhases {
		assert.Equal(t, phase, events[i].Phase)
		assert.Equal(t, run.RunID, events[i].RunID)
		assert.Equal(t, "dispatch-delayed", events[i].DispatchID)
		assert.Equal(t, command.ExecutionModeQueued, events[i].ExecutionMode)
		assert.Equal(t, "corr-delayed", events[i].CorrelationID)
		assert.Equal(t, "idem-delayed", events[i].IdempotencyKey)
		assert.Equal(t, "queue", events[i].Metadata["source"])
	}
	assert.Equal(t, "dequeued", events[2].Checkpoint)
	assert.Equal(t, int64(5), events[3].Current)
	assert.Equal(t, int64(10), events[3].Total)
	assert.Equal(t, "a", events[3].Metadata["worker"])
}

func TestObservedExecutorEmitsRejectedForAcceptanceError(t *testing.T) {
	setupDispatchRoutingTest(t)

	var events []command.CommandRunEvent
	AddCommandRunObserver(command.CommandRunObserverFunc(func(_ context.Context, event command.CommandRunEvent) error {
		events = append(events, event)
		return nil
	}))

	acceptErr := stderrors.New("queue unavailable")
	queuedExec := &captureExecutor{err: acceptErr}
	require.NoError(t, RegisterObservedExecutor(command.ExecutionModeQueued, queuedExec))

	_, err := DispatchWith(context.Background(), routingDispatchMessage{}, command.DispatchOptions{
		Mode: command.ExecutionModeQueued,
	})
	require.ErrorIs(t, err, acceptErr)
	require.Len(t, events, 1)
	assert.Equal(t, command.CommandRunPhaseRejected, events[0].Phase)
	assert.ErrorIs(t, events[0].Error, acceptErr)
	assert.NotEqual(t, command.CommandRunPhaseFailed, events[0].Phase)
}

func TestDispatchWithInlineCompatibilityAllowsNonCanonicalMessage(t *testing.T) {
	setupDispatchRoutingTest(t)

	var inlineCalled bool
	SubscribeCommand(command.CommandFunc[routingUntypedMessage](func(ctx context.Context, msg routingUntypedMessage) error {
		inlineCalled = true
		return nil
	}))

	receipt, err := DispatchWith(context.Background(), routingUntypedMessage{}, command.DispatchOptions{})
	require.NoError(t, err)
	assert.True(t, inlineCalled)
	assert.True(t, receipt.Accepted)
	assert.Equal(t, command.ExecutionModeInline, receipt.Mode)
}

func TestDispatchWithResolverPolicyPathRequiresCanonicalCommandID(t *testing.T) {
	setupDispatchRoutingTest(t)

	SetModeResolver(&captureResolver{
		mode:  command.ExecutionModeInline,
		found: false,
	})

	_, err := DispatchWith(context.Background(), routingUntypedMessage{}, command.DispatchOptions{})
	gerr := mustGoError(t, err)
	assert.Equal(t, command.TextCodeInvalidCommandID, gerr.TextCode)
}

func TestDispatchWithQueuedExecutorNotConfigured(t *testing.T) {
	setupDispatchRoutingTest(t)

	SubscribeCommand(command.CommandFunc[routingDispatchMessage](func(ctx context.Context, msg routingDispatchMessage) error {
		return nil
	}))

	_, err := DispatchWith(context.Background(), routingDispatchMessage{}, command.DispatchOptions{
		Mode: command.ExecutionModeQueued,
	})
	gerr := mustGoError(t, err)
	assert.Equal(t, TextCodeDispatchExecutorNotConfigured, gerr.TextCode)
}

func TestDispatchWithResolverErrorPropagatesWithoutFallback(t *testing.T) {
	setupDispatchRoutingTest(t)

	var inlineCalled bool
	SubscribeCommand(command.CommandFunc[routingDispatchMessage](func(ctx context.Context, msg routingDispatchMessage) error {
		inlineCalled = true
		return nil
	}))

	resolver := &captureResolver{
		err:   stderrors.New("resolver failed"),
		found: false,
	}
	SetModeResolver(resolver)

	_, err := DispatchWith(context.Background(), routingDispatchMessage{}, command.DispatchOptions{})
	gerr := mustGoError(t, err)
	assert.Equal(t, TextCodeDispatchModeResolverFailed, gerr.TextCode)
	assert.Equal(t, 1, resolver.calls)
	assert.False(t, inlineCalled)
}

func TestDispatchCompatibilityPathRemainsInline(t *testing.T) {
	setupDispatchRoutingTest(t)

	var inlineCalled bool
	SubscribeCommand(command.CommandFunc[routingDispatchMessage](func(ctx context.Context, msg routingDispatchMessage) error {
		inlineCalled = true
		return nil
	}))

	queuedExec := &captureExecutor{
		receipt: command.DispatchReceipt{
			Accepted:   true,
			DispatchID: "dispatch-compat",
			EnqueuedAt: ptrTime(time.Now().UTC()),
		},
	}
	require.NoError(t, RegisterExecutor(command.ExecutionModeQueued, queuedExec))
	SetModeResolver(&captureResolver{mode: command.ExecutionModeQueued, found: true})

	err := Dispatch(context.Background(), routingDispatchMessage{})
	require.NoError(t, err)
	assert.True(t, inlineCalled)
	assert.False(t, queuedExec.called)
}

func mustGoError(t *testing.T, err error) *gerrors.Error {
	t.Helper()
	require.Error(t, err)
	var gerr *gerrors.Error
	if !gerrors.As(err, &gerr) {
		t.Fatalf("expected *go-errors.Error, got %T", err)
	}
	return gerr
}

func ptrTime(v time.Time) *time.Time {
	return &v
}

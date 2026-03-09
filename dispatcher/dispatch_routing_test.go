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
	receipt      command.DispatchReceipt
	err          error
}

func (e *captureExecutor) Execute(_ context.Context, _ any, commandID string, opts command.DispatchOptions) (command.DispatchReceipt, error) {
	e.called = true
	e.gotCommandID = commandID
	e.gotOpts = opts
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
	setTestMuxes(router.NewMux(), router.NewMux())
	ExitOnErr = false
	t.Cleanup(func() {
		Reset()
		ExitOnErr = false
	})
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

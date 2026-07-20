package dispatcher

import (
	"context"
	"errors"
	"sync"
	"sync/atomic"
	"testing"
	"time"

	"github.com/goliatone/go-command"
	"github.com/goliatone/go-command/runner"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

type lifecycleMessage struct {
	Value string
}

func (lifecycleMessage) Type() string {
	return "lifecycle.test"
}

type firstLifecycleHandler struct{}

func (firstLifecycleHandler) Execute(context.Context, lifecycleMessage) error {
	return nil
}

type secondLifecycleHandler struct{}

func (secondLifecycleHandler) Execute(context.Context, lifecycleMessage) error {
	return nil
}

func TestCommandRunObserverReceivesEmittedEventClone(t *testing.T) {
	Reset()
	t.Cleanup(Reset)

	var got command.CommandRunEvent
	AddCommandRunObserver(command.CommandRunObserverFunc(func(_ context.Context, event command.CommandRunEvent) error {
		got = event
		event.Metadata["observer"] = "mutated"
		return nil
	}))

	event := command.CommandRunEvent{
		RunID:    "run-1",
		Phase:    command.CommandRunPhaseStarted,
		Metadata: map[string]any{"source": "dispatch"},
	}
	emitCommandRunEvent(context.Background(), event)

	assert.Equal(t, "run-1", got.RunID)
	assert.Equal(t, "dispatch", got.Metadata["source"])
	assert.NotContains(t, event.Metadata, "observer")
}

func TestCommandRunObserverUnsubscribeIsIdempotent(t *testing.T) {
	Reset()
	t.Cleanup(Reset)

	var calls atomic.Int64
	sub := AddCommandRunObserver(command.CommandRunObserverFunc(func(context.Context, command.CommandRunEvent) error {
		calls.Add(1)
		return nil
	}))

	emitCommandRunEvent(context.Background(), command.CommandRunEvent{})
	sub.Unsubscribe()
	sub.Unsubscribe()
	emitCommandRunEvent(context.Background(), command.CommandRunEvent{})

	assert.Equal(t, int64(1), calls.Load())
}

func TestSetCommandRunObserversReplacesSnapshotAndResetClears(t *testing.T) {
	Reset()
	t.Cleanup(Reset)

	first := command.CommandRunObserverFunc(func(context.Context, command.CommandRunEvent) error { return nil })
	second := command.CommandRunObserverFunc(func(context.Context, command.CommandRunEvent) error { return nil })

	AddCommandRunObserver(first)
	SetCommandRunObservers(second, nil)

	observers := CommandRunObservers()
	require.Len(t, observers, 1)

	Reset()
	assert.Empty(t, CommandRunObservers())
}

func TestCommandRunObserverFailureAndPanicAreFailOpen(t *testing.T) {
	Reset()
	t.Cleanup(Reset)

	var calls atomic.Int64
	AddCommandRunObserver(command.CommandRunObserverFunc(func(context.Context, command.CommandRunEvent) error {
		panic("observer panic")
	}))
	AddCommandRunObserver(command.CommandRunObserverFunc(func(context.Context, command.CommandRunEvent) error {
		return errors.New("observer error")
	}))
	AddCommandRunObserver(command.CommandRunObserverFunc(func(context.Context, command.CommandRunEvent) error {
		calls.Add(1)
		return nil
	}))

	require.NotPanics(t, func() {
		emitCommandRunEvent(context.Background(), command.CommandRunEvent{})
	})
	assert.Equal(t, int64(1), calls.Load())
}

func TestCommandRunObserversConcurrentRegisterUnregisterEmit(t *testing.T) {
	Reset()
	t.Cleanup(Reset)

	var wg sync.WaitGroup
	for range 50 {
		wg.Add(1)
		go func() {
			defer wg.Done()
			sub := AddCommandRunObserver(command.CommandRunObserverFunc(func(context.Context, command.CommandRunEvent) error {
				return nil
			}))
			emitCommandRunEvent(context.Background(), command.CommandRunEvent{})
			sub.Unsubscribe()
		}()
	}
	wg.Wait()
}

func TestObservedExecutorValidatesRejectedReceiptBeforeClassification(t *testing.T) {
	setupDispatchRoutingTest(t)
	executor := &captureExecutor{receipt: command.DispatchReceipt{
		Accepted: false, Mode: command.ExecutionModeQueued, CommandID: "lifecycle.test", DispatchID: "must-be-empty",
	}}
	var events []command.CommandRunEvent
	AddCommandRunObserver(command.CommandRunObserverFunc(func(_ context.Context, event command.CommandRunEvent) error {
		events = append(events, event)
		return nil
	}))

	receipt, err := ObserveExecutor(executor).Execute(context.Background(), lifecycleMessage{}, "lifecycle.test", command.DispatchOptions{Mode: command.ExecutionModeQueued})
	assertStructuredTextCode(t, err, command.TextCodeDispatchReceiptInvalid)
	assert.Equal(t, "must-be-empty", receipt.DispatchID)
	require.Len(t, events, 1)
	assert.Equal(t, command.CommandRunPhaseRejected, events[0].Phase)
	assert.Error(t, events[0].Error)
}

func TestObservedExecutorReturnsErrorForValidRejection(t *testing.T) {
	setupDispatchRoutingTest(t)
	executor := &captureExecutor{receipt: command.DispatchReceipt{
		Accepted: false, Mode: command.ExecutionModeQueued, CommandID: "lifecycle.test",
	}}

	receipt, err := ObserveExecutor(executor).Execute(context.Background(), lifecycleMessage{}, "lifecycle.test", command.DispatchOptions{Mode: command.ExecutionModeQueued})
	assertStructuredTextCode(t, err, command.TextCodeDispatchRejected)
	assert.False(t, receipt.Accepted)
}

func TestRunObservedCommandStartsExecutionClockAtWorkerInvocation(t *testing.T) {
	setupDispatchRoutingTest(t)
	acceptedAt := time.Now().Add(-time.Hour)
	var events []command.CommandRunEvent
	AddCommandRunObserver(command.CommandRunObserverFunc(func(_ context.Context, event command.CommandRunEvent) error {
		events = append(events, event)
		return nil
	}))

	err := RunObservedCommand(context.Background(), command.DispatchRunContext{
		RunID: "queued-run", CommandID: "lifecycle.test", StartedAt: acceptedAt,
	}, func(context.Context) error { return nil })
	require.NoError(t, err)
	require.Len(t, events, 2)
	assert.True(t, events[0].StartedAt.After(acceptedAt))
	assert.Less(t, events[1].Duration, time.Minute)
}

func TestDispatchEmitsInlineLifecycleAndProgressEvents(t *testing.T) {
	setupDispatchRoutingTest(t)

	var events []command.CommandRunEvent
	AddCommandRunObserver(command.CommandRunObserverFunc(func(_ context.Context, event command.CommandRunEvent) error {
		events = append(events, event)
		return nil
	}))

	SubscribeCommand(command.CommandFunc[lifecycleMessage](func(ctx context.Context, msg lifecycleMessage) error {
		run, ok := command.DispatchRunFromContext(ctx)
		require.True(t, ok)
		assert.NotEmpty(t, run.RunID)
		assert.Equal(t, "lifecycle.test", run.CommandID)

		command.Checkpoint(ctx, "loaded", command.WithProgressMetadata(map[string]any{"step": "load"}))
		command.Progress(ctx, 1, 2, command.WithProgressMessage("halfway"))
		return nil
	}))

	require.NoError(t, Dispatch(context.Background(), lifecycleMessage{}))
	require.Len(t, events, 4)

	runID := events[0].RunID
	assert.NotEmpty(t, runID)
	assert.Equal(t, command.CommandRunPhaseStarted, events[0].Phase)
	assert.Equal(t, command.CommandRunPhaseCheckpoint, events[1].Phase)
	assert.Equal(t, "loaded", events[1].Checkpoint)
	assert.Equal(t, "load", events[1].Metadata["step"])
	assert.Equal(t, command.CommandRunPhaseProgress, events[2].Phase)
	assert.Equal(t, int64(1), events[2].Current)
	assert.Equal(t, int64(2), events[2].Total)
	assert.Equal(t, "halfway", events[2].Message)
	assert.Equal(t, 1, events[2].Attempt)
	assert.Equal(t, 1, events[2].MaxAttempts)
	assert.Equal(t, command.CommandRunPhaseSucceeded, events[3].Phase)
	assert.Equal(t, 1, events[3].Attempt)
	assert.Equal(t, 1, events[3].MaxAttempts)
	for _, event := range events {
		assert.Equal(t, runID, event.RunID)
		assert.Equal(t, "lifecycle.test", event.CommandID)
		assert.Equal(t, command.ExecutionModeInline, event.ExecutionMode)
		assert.NotEmpty(t, event.Handler)
	}
	assert.GreaterOrEqual(t, events[3].Duration, int64(0))
}

func TestLocalTypedAPIsEmitCompleteLifecycleContext(t *testing.T) {
	setupDispatchRoutingTest(t)
	runtime := NewRuntime()
	assertRun := func(ctx context.Context) {
		run, ok := command.DispatchRunFromContext(ctx)
		require.True(t, ok)
		assert.Equal(t, command.DispatchTargetLocal, run.DispatchTarget)
		assert.Equal(t, command.ExecutionModeInline, run.ExecutionMode)
		assert.Equal(t, "corr-local", run.CorrelationID)
		assert.Equal(t, "delivery-local", run.Provenance.DeliveryID)
	}
	commandHandler := command.CommandFunc[lifecycleMessage](func(ctx context.Context, _ lifecycleMessage) error {
		assertRun(ctx)
		return nil
	})
	queryHandler := command.QueryFunc[lifecycleMessage, string](func(ctx context.Context, _ lifecycleMessage) (string, error) {
		assertRun(ctx)
		return "ok", nil
	})
	SubscribeCommand(commandHandler)
	SubscribeQuery(queryHandler)
	SubscribeCommandTo(runtime, commandHandler)
	SubscribeQueryTo(runtime, queryHandler)

	var events []command.CommandRunEvent
	AddCommandRunObserver(command.CommandRunObserverFunc(func(_ context.Context, event command.CommandRunEvent) error {
		events = append(events, event)
		return nil
	}))
	ctx := command.ContextWithDispatchProvenance(context.Background(), command.DispatchProvenance{DeliveryID: "delivery-local"})
	ctx = command.ContextWithDispatchOptions(ctx, command.DispatchOptions{CorrelationID: "corr-local", Metadata: map[string]any{"source": "test"}})

	require.NoError(t, Dispatch(ctx, lifecycleMessage{}))
	_, err := DispatchWith(ctx, lifecycleMessage{}, command.DispatchOptions{})
	require.NoError(t, err)
	require.NoError(t, DispatchTo(ctx, runtime, lifecycleMessage{}))
	_, err = Query[lifecycleMessage, string](ctx, lifecycleMessage{})
	require.NoError(t, err)
	_, err = QueryTo[lifecycleMessage, string](ctx, runtime, lifecycleMessage{})
	require.NoError(t, err)

	require.Len(t, events, 10)
	wantKinds := []command.HandlerKind{
		command.HandlerKindCommand,
		command.HandlerKindCommand,
		command.HandlerKindCommand,
		command.HandlerKindQuery,
		command.HandlerKindQuery,
	}
	for operation, kind := range wantKinds {
		started := events[operation*2]
		finished := events[operation*2+1]
		assert.Equal(t, command.CommandRunPhaseStarted, started.Phase)
		assert.Equal(t, command.CommandRunPhaseSucceeded, finished.Phase)
		for _, event := range []command.CommandRunEvent{started, finished} {
			assert.Equal(t, kind, event.HandlerKind)
			assert.Equal(t, command.DispatchTargetLocal, event.DispatchTarget)
			assert.Equal(t, command.ExecutionModeInline, event.ExecutionMode)
			assert.Equal(t, "corr-local", event.CorrelationID)
			assert.Equal(t, "delivery-local", event.Provenance.DeliveryID)
			assert.Equal(t, "test", event.Metadata["source"])
			assert.NotEmpty(t, event.Handler)
		}
	}
}

func TestDispatchEmitsFailedAndCanceledTerminalEvents(t *testing.T) {
	tests := []struct {
		name      string
		err       error
		wantPhase command.CommandRunPhase
	}{
		{name: "failed", err: errors.New("boom"), wantPhase: command.CommandRunPhaseFailed},
		{name: "canceled", err: context.Canceled, wantPhase: command.CommandRunPhaseCanceled},
		{name: "deadline", err: context.DeadlineExceeded, wantPhase: command.CommandRunPhaseCanceled},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			setupDispatchRoutingTest(t)

			var events []command.CommandRunEvent
			AddCommandRunObserver(command.CommandRunObserverFunc(func(_ context.Context, event command.CommandRunEvent) error {
				events = append(events, event)
				return nil
			}))
			SubscribeCommand(command.CommandFunc[lifecycleMessage](func(context.Context, lifecycleMessage) error {
				return tt.err
			}))

			require.Error(t, Dispatch(context.Background(), lifecycleMessage{}))
			require.Len(t, events, 2)
			assert.Equal(t, command.CommandRunPhaseStarted, events[0].Phase)
			assert.Equal(t, tt.wantPhase, events[1].Phase)
			assert.ErrorIs(t, events[1].Error, tt.err)
		})
	}
}

func TestDispatchMultipleHandlersEmitDistinctRunsAndHandlers(t *testing.T) {
	setupDispatchRoutingTest(t)

	var events []command.CommandRunEvent
	AddCommandRunObserver(command.CommandRunObserverFunc(func(_ context.Context, event command.CommandRunEvent) error {
		events = append(events, event)
		return nil
	}))
	SubscribeCommand(firstLifecycleHandler{})
	SubscribeCommand(secondLifecycleHandler{})

	require.NoError(t, Dispatch(context.Background(), lifecycleMessage{}))
	require.Len(t, events, 4)

	firstRunID := events[0].RunID
	secondRunID := events[2].RunID
	assert.NotEmpty(t, firstRunID)
	assert.NotEmpty(t, secondRunID)
	assert.NotEqual(t, firstRunID, secondRunID)
	assert.NotEqual(t, events[0].Handler, events[2].Handler)
	assert.Equal(t, command.CommandRunPhaseStarted, events[0].Phase)
	assert.Equal(t, command.CommandRunPhaseSucceeded, events[1].Phase)
	assert.Equal(t, command.CommandRunPhaseStarted, events[2].Phase)
	assert.Equal(t, command.CommandRunPhaseSucceeded, events[3].Phase)
}

func TestDispatchObserverPanicDoesNotAlterExecution(t *testing.T) {
	setupDispatchRoutingTest(t)

	var called bool
	AddCommandRunObserver(command.CommandRunObserverFunc(func(context.Context, command.CommandRunEvent) error {
		panic("observer failed")
	}))
	SubscribeCommand(command.CommandFunc[lifecycleMessage](func(context.Context, lifecycleMessage) error {
		called = true
		return nil
	}))

	require.NoError(t, Dispatch(context.Background(), lifecycleMessage{}))
	assert.True(t, called)
}

func TestDispatchWithInlineEventsIncludeOptionsAndPreserveReceipt(t *testing.T) {
	setupDispatchRoutingTest(t)

	var events []command.CommandRunEvent
	AddCommandRunObserver(command.CommandRunObserverFunc(func(_ context.Context, event command.CommandRunEvent) error {
		events = append(events, event)
		return nil
	}))
	SubscribeCommand(command.CommandFunc[lifecycleMessage](func(ctx context.Context, msg lifecycleMessage) error {
		command.Progress(ctx, 3, 4, command.WithProgressMetadata(map[string]any{"progress": "yes"}))
		return nil
	}))

	opts := command.DispatchOptions{
		CorrelationID:  "corr-1",
		IdempotencyKey: "idem-1",
		Metadata:       map[string]any{"source": "api"},
	}
	receipt, err := DispatchWith(context.Background(), lifecycleMessage{}, opts)
	require.NoError(t, err)
	require.NoError(t, command.ValidateDispatchReceipt(receipt))
	assert.True(t, receipt.Accepted)
	assert.Equal(t, command.ExecutionModeInline, receipt.Mode)
	assert.Empty(t, receipt.DispatchID)
	assert.Nil(t, receipt.EnqueuedAt)

	opts.Metadata["source"] = "mutated"

	require.Len(t, events, 3)
	for _, event := range events {
		assert.Equal(t, "corr-1", event.CorrelationID)
		assert.Equal(t, "idem-1", event.IdempotencyKey)
		assert.Equal(t, "api", event.Metadata["source"])
	}
	assert.Equal(t, "yes", events[1].Metadata["progress"])
}

func TestDispatchTerminalEventIncludesFinalAttemptSummary(t *testing.T) {
	setupDispatchRoutingTest(t)

	var events []command.CommandRunEvent
	AddCommandRunObserver(command.CommandRunObserverFunc(func(_ context.Context, event command.CommandRunEvent) error {
		events = append(events, event)
		return nil
	}))

	var calls atomic.Int64
	SubscribeCommand(command.CommandFunc[lifecycleMessage](func(ctx context.Context, msg lifecycleMessage) error {
		attempt, ok := command.CommandRunAttemptFromContext(ctx)
		require.True(t, ok)
		if attempt.Attempt == 1 {
			command.Progress(ctx, 1, 2)
			calls.Add(1)
			return errors.New("retry")
		}
		calls.Add(1)
		return nil
	}), runner.WithMaxRetries(2))

	require.NoError(t, Dispatch(context.Background(), lifecycleMessage{}))
	require.Equal(t, int64(2), calls.Load())
	require.Len(t, events, 3)
	assert.Equal(t, command.CommandRunPhaseStarted, events[0].Phase)
	assert.Equal(t, command.CommandRunPhaseProgress, events[1].Phase)
	assert.Equal(t, 1, events[1].Attempt)
	assert.Equal(t, 3, events[1].MaxAttempts)
	assert.Equal(t, command.CommandRunPhaseSucceeded, events[2].Phase)
	assert.Equal(t, 2, events[2].Attempt)
	assert.Equal(t, 3, events[2].MaxAttempts)
}

func TestDispatchDoesNotEmitLifecycleWhenRunOnceSkipsHandler(t *testing.T) {
	setupDispatchRoutingTest(t)

	var events []command.CommandRunEvent
	AddCommandRunObserver(command.CommandRunObserverFunc(func(_ context.Context, event command.CommandRunEvent) error {
		events = append(events, event)
		return nil
	}))

	var calls atomic.Int64
	SubscribeCommand(command.CommandFunc[lifecycleMessage](func(context.Context, lifecycleMessage) error {
		calls.Add(1)
		return nil
	}), runner.WithRunOnce(true))

	require.NoError(t, Dispatch(context.Background(), lifecycleMessage{}))
	require.NoError(t, Dispatch(context.Background(), lifecycleMessage{}))

	assert.Equal(t, int64(1), calls.Load())
	require.Len(t, events, 2)
	assert.Equal(t, command.CommandRunPhaseStarted, events[0].Phase)
	assert.Equal(t, command.CommandRunPhaseSucceeded, events[1].Phase)
}

func TestDispatchDoesNotEmitLifecycleWhenMaxRunsSkipsHandler(t *testing.T) {
	setupDispatchRoutingTest(t)

	var events []command.CommandRunEvent
	AddCommandRunObserver(command.CommandRunObserverFunc(func(_ context.Context, event command.CommandRunEvent) error {
		events = append(events, event)
		return nil
	}))

	var calls atomic.Int64
	SubscribeCommand(command.CommandFunc[lifecycleMessage](func(context.Context, lifecycleMessage) error {
		calls.Add(1)
		return nil
	}), runner.WithMaxRuns(1))

	require.NoError(t, Dispatch(context.Background(), lifecycleMessage{}))
	require.NoError(t, Dispatch(context.Background(), lifecycleMessage{}))

	assert.Equal(t, int64(1), calls.Load())
	require.Len(t, events, 2)
	assert.Equal(t, command.CommandRunPhaseStarted, events[0].Phase)
	assert.Equal(t, command.CommandRunPhaseSucceeded, events[1].Phase)
}

func TestDispatchReturnsPreExecutionErrorWithoutLifecycleEvent(t *testing.T) {
	setupDispatchRoutingTest(t)

	var events []command.CommandRunEvent
	AddCommandRunObserver(command.CommandRunObserverFunc(func(_ context.Context, event command.CommandRunEvent) error {
		events = append(events, event)
		return nil
	}))

	control := runner.NewManualExecutionControl()
	control.Cancel(errors.New("stopped before start"))
	var calls atomic.Int64
	SubscribeCommand(command.CommandFunc[lifecycleMessage](func(context.Context, lifecycleMessage) error {
		calls.Add(1)
		return nil
	}), runner.WithExecutionControl(control))

	err := Dispatch(context.Background(), lifecycleMessage{})
	require.Error(t, err)
	assert.Equal(t, int64(0), calls.Load())
	assert.Empty(t, events)
}

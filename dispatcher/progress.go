package dispatcher

import (
	"context"
	"fmt"
	"maps"
	"strings"
	"sync"
	"sync/atomic"
	"time"

	"github.com/goliatone/go-command"
	"github.com/goliatone/go-errors"
)

var (
	commandRunObserversMu     sync.RWMutex
	commandRunObservers       = map[uint64]command.CommandRunObserver{}
	commandRunObserverNextID  uint64
	commandRunObserverEmitted atomic.Uint64
	commandRunIDSeq           atomic.Uint64
)

type commandRunObserverSubscription struct {
	id   uint64
	once sync.Once
}

func (s *commandRunObserverSubscription) Unsubscribe() {
	if s == nil {
		return
	}
	s.once.Do(func() {
		commandRunObserversMu.Lock()
		defer commandRunObserversMu.Unlock()
		delete(commandRunObservers, s.id)
	})
}

type noopSubscription struct{}

func (noopSubscription) Unsubscribe() {}

// AddCommandRunObserver registers a command run observer and returns an
// idempotent unsubscribe handle.
func AddCommandRunObserver(observer command.CommandRunObserver) Subscription {
	if observer == nil {
		return noopSubscription{}
	}

	id := atomic.AddUint64(&commandRunObserverNextID, 1)

	commandRunObserversMu.Lock()
	defer commandRunObserversMu.Unlock()
	commandRunObservers[id] = observer
	return &commandRunObserverSubscription{id: id}
}

// SetCommandRunObservers replaces all registered command run observers.
func SetCommandRunObservers(observers ...command.CommandRunObserver) {
	commandRunObserversMu.Lock()
	defer commandRunObserversMu.Unlock()

	commandRunObservers = map[uint64]command.CommandRunObserver{}
	for _, observer := range observers {
		if observer == nil {
			continue
		}
		id := atomic.AddUint64(&commandRunObserverNextID, 1)
		commandRunObservers[id] = observer
	}
}

// CommandRunObservers returns a snapshot of currently registered observers.
func CommandRunObservers() []command.CommandRunObserver {
	commandRunObserversMu.RLock()
	defer commandRunObserversMu.RUnlock()

	if len(commandRunObservers) == 0 {
		return nil
	}
	out := make([]command.CommandRunObserver, 0, len(commandRunObservers))
	for _, observer := range commandRunObservers {
		out = append(out, observer)
	}
	return out
}

func emitCommandRunEvent(ctx context.Context, event command.CommandRunEvent) {
	if ctx == nil {
		ctx = context.Background()
	}
	observers := CommandRunObservers()
	if len(observers) == 0 {
		return
	}

	for _, observer := range observers {
		if observer == nil {
			continue
		}
		func() {
			defer func() {
				_ = recover()
			}()
			_ = observer.OnCommandRunEvent(ctx, event.Clone())
			commandRunObserverEmitted.Add(1)
		}()
	}
}

func resetCommandRunObservers() {
	commandRunObserversMu.Lock()
	defer commandRunObserversMu.Unlock()
	commandRunObservers = map[uint64]command.CommandRunObserver{}
}

type commandRunProgressReporter struct {
	run command.DispatchRunContext
}

func commandRunEventWithRevision(
	ctx context.Context,
	run command.DispatchRunContext,
	phase command.CommandRunPhase,
	occurredAt time.Time,
	event command.CommandRunEvent,
) command.CommandRunEvent {
	if event.Revision == 0 {
		event.Revision = command.NextCommandRunRevision(ctx)
	}
	return commandRunEventFromContext(run, phase, occurredAt, event)
}

type observedExecutor struct {
	inner CommandExecutor
}

type lifecycleObservedExecutor interface {
	CommandExecutor
	lifecycleObserved()
}

func (observedExecutor) lifecycleObserved() {}

// ObserveExecutor wraps a queued executor with acceptance lifecycle events.
func ObserveExecutor(exec CommandExecutor) CommandExecutor {
	if isNilCommandExecutor(exec) {
		return nil
	}
	if _, ok := exec.(lifecycleObservedExecutor); ok {
		return exec
	}
	return observedExecutor{inner: exec}
}

// RegisterObservedExecutor registers a queued executor with acceptance
// lifecycle instrumentation. Inline execution is already observed directly.
func RegisterObservedExecutor(mode command.ExecutionMode, exec CommandExecutor) error {
	return RegisterExecutor(mode, ObserveExecutor(exec))
}

func (e observedExecutor) Execute(ctx context.Context, msg any, commandID string, opts command.DispatchOptions) (command.DispatchReceipt, error) {
	run, ok := command.DispatchRunFromContext(ctx)
	if !ok {
		run = command.DispatchRunContext{}
	}
	if strings.TrimSpace(run.RunID) == "" {
		run.RunID = newCommandRunID()
	}
	if strings.TrimSpace(run.CommandID) == "" {
		run.CommandID = commandID
	}
	if run.ExecutionMode == "" {
		run.ExecutionMode = command.NormalizeExecutionMode(opts.Mode)
	}
	if run.ExecutionMode == "" {
		run.ExecutionMode = command.ExecutionModeQueued
	}
	if run.CorrelationID == "" {
		run.CorrelationID = opts.CorrelationID
	}
	if run.IdempotencyKey == "" {
		run.IdempotencyKey = opts.IdempotencyKey
	}
	if run.StartedAt.IsZero() {
		run.StartedAt = time.Now()
	}
	if len(run.Metadata) == 0 {
		run.Metadata = command.CloneCommandRunMetadata(opts.Metadata)
	}
	// Acceptance owns revision 1. The executor sees that reserved baseline in
	// DispatchRunContext and can persist it with queued work before submission is
	// emitted after a successful receipt.
	if run.Revision == 0 {
		run.Revision = 1
	}

	execCtx := command.ContextWithDispatchRun(ctx, run)
	receipt, err := e.inner.Execute(execCtx, msg, commandID, opts)
	if err != nil {
		emitCommandRunEvent(ctx, commandRunEventFromContext(run, command.CommandRunPhaseRejected, time.Now(), command.CommandRunEvent{
			Revision: run.Revision,
			Duration: time.Since(run.StartedAt),
			Error:    err,
		}))
		return receipt, err
	}

	receipt = normalizeDispatchReceipt(receipt, run.ExecutionMode, commandID, opts.CorrelationID)
	run.DispatchID = receipt.DispatchID
	run.Receipt = receipt
	if err := command.ValidateDispatchReceipt(receipt); err != nil {
		emitCommandRunEvent(ctx, commandRunEventFromContext(run, command.CommandRunPhaseRejected, time.Now(), command.CommandRunEvent{
			Revision: run.Revision,
			Duration: time.Since(run.StartedAt),
			Error:    err,
		}))
		return receipt, err
	}
	if !receipt.Accepted {
		err := command.NewDispatchRejectedError(commandID, receipt)
		emitCommandRunEvent(ctx, commandRunEventFromContext(run, command.CommandRunPhaseRejected, time.Now(), command.CommandRunEvent{
			Revision: run.Revision,
			Duration: time.Since(run.StartedAt),
			Error:    err,
		}))
		return receipt, err
	}
	emitCommandRunEvent(ctx, commandRunEventFromContext(run, command.CommandRunPhaseSubmitted, time.Now(), command.CommandRunEvent{
		Revision: run.Revision,
		Duration: time.Since(run.StartedAt),
	}))
	return receipt, nil
}

// RunObservedCommand wraps delayed queued command execution with lifecycle and
// progress events using a run context captured at acceptance time.
func RunObservedCommand(ctx context.Context, run command.DispatchRunContext, fn func(context.Context) error) error {
	if strings.TrimSpace(run.RunID) == "" {
		return fmt.Errorf("command run id is required")
	}
	if strings.TrimSpace(run.CommandID) == "" {
		return fmt.Errorf("command id is required")
	}
	if fn == nil {
		return fmt.Errorf("observed command function is required")
	}
	run.ExecutionMode = command.NormalizeExecutionMode(run.ExecutionMode)
	if run.ExecutionMode == "" {
		run.ExecutionMode = command.ExecutionModeQueued
	}
	// A queued run's acceptance timestamp belongs to submission lifecycle.
	// Execution timing starts when the worker actually invokes the command.
	run.StartedAt = time.Now()
	run.Metadata = command.CloneCommandRunMetadata(run.Metadata)
	if run.Revision == 0 && run.ExecutionMode == command.ExecutionModeQueued {
		// Queued acceptance reserves revision 1 even when older queue payloads did
		// not persist the new field.
		run.Revision = 1
	}
	runCtx := command.ContextWithCommandRunRevision(ctx, run.Revision)

	emitCommandRunEvent(ctx, commandRunEventWithRevision(runCtx, run, command.CommandRunPhaseStarted, run.StartedAt, command.CommandRunEvent{}))

	runCtx = command.ContextWithDispatchRun(runCtx, run)
	runCtx = command.ContextWithCommandRunAttemptTracker(runCtx)
	runCtx = command.ContextWithCommandProgressReporter(runCtx, commandRunProgressReporter{run: run})

	err := fn(runCtx)
	if attempt, ok := command.CommandRunAttemptFromContext(runCtx); ok {
		run.Attempt = attempt.Attempt
		run.MaxAttempts = attempt.MaxAttempts
	}
	if err != nil {
		emitCommandRunEvent(ctx, commandRunEventWithRevision(runCtx, run, terminalCommandRunPhase(err), time.Now(), command.CommandRunEvent{
			Duration: time.Since(run.StartedAt),
			Error:    err,
		}))
		return err
	}

	emitCommandRunEvent(ctx, commandRunEventWithRevision(runCtx, run, command.CommandRunPhaseSucceeded, time.Now(), command.CommandRunEvent{
		Duration: time.Since(run.StartedAt),
	}))
	return nil
}

func (r commandRunProgressReporter) ReportProgress(ctx context.Context, update command.ProgressUpdate) {
	phase := command.CommandRunPhaseProgress
	if update.Checkpoint != "" {
		phase = command.CommandRunPhaseCheckpoint
	}
	run := r.run
	if attempt, ok := command.CommandRunAttemptFromContext(ctx); ok {
		run.Attempt = attempt.Attempt
		run.MaxAttempts = attempt.MaxAttempts
	}
	emitCommandRunEvent(ctx, commandRunEventWithRevision(ctx, run, phase, time.Now(), command.CommandRunEvent{
		Checkpoint: update.Checkpoint,
		Message:    update.Message,
		Current:    update.Current,
		Total:      update.Total,
		Metadata:   update.Metadata,
	}))
}

func commandRunEventFromContext(
	run command.DispatchRunContext,
	phase command.CommandRunPhase,
	occurredAt time.Time,
	event command.CommandRunEvent,
) command.CommandRunEvent {
	event.RunID = run.RunID
	event.DispatchID = run.DispatchID
	event.CommandID = run.CommandID
	event.Handler = run.Handler
	event.HandlerKind = run.HandlerKind
	event.DispatchTarget = run.DispatchTarget
	event.Route = run.Route
	event.ExecutionMode = run.ExecutionMode
	event.Phase = phase
	event.CorrelationID = run.CorrelationID
	event.IdempotencyKey = run.IdempotencyKey
	event.Attempt = run.Attempt
	event.MaxAttempts = run.MaxAttempts
	event.StartedAt = run.StartedAt
	event.Receipt = run.Receipt
	event.Provenance = run.Provenance
	if event.Error != nil && event.FailureCategory == "" {
		var structured *errors.Error
		if errors.As(event.Error, &structured) {
			event.FailureCategory = structured.Category.String()
		} else {
			event.FailureCategory = errors.RootCategory(event.Error).String()
		}
	}
	event.OccurredAt = occurredAt
	if len(event.Metadata) == 0 {
		event.Metadata = command.CloneCommandRunMetadata(run.Metadata)
	} else if len(run.Metadata) > 0 {
		merged := command.CloneCommandRunMetadata(run.Metadata)
		maps.Copy(merged, event.Metadata)
		event.Metadata = merged
	} else {
		event.Metadata = command.CloneCommandRunMetadata(event.Metadata)
	}
	return event
}

func newCommandRunID() string {
	return fmt.Sprintf("run-%d-%d", time.Now().UnixNano(), commandRunIDSeq.Add(1))
}

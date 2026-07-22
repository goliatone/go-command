package command

import (
	"context"
	"maps"
	"strings"
	"sync"
	"sync/atomic"
	"time"
)

// CommandRunPhase identifies a lifecycle or cooperative progress event.
type CommandRunPhase string

const (
	CommandRunPhaseSubmitted  CommandRunPhase = "submitted"
	CommandRunPhaseStarted    CommandRunPhase = "started"
	CommandRunPhaseCheckpoint CommandRunPhase = "checkpoint"
	CommandRunPhaseProgress   CommandRunPhase = "progress"
	CommandRunPhaseSucceeded  CommandRunPhase = "succeeded"
	CommandRunPhaseFailed     CommandRunPhase = "failed"
	CommandRunPhaseCanceled   CommandRunPhase = "canceled"
	CommandRunPhaseRejected   CommandRunPhase = "rejected"
)

// CommandRunEvent is the transport-neutral event emitted for command run
// lifecycle and cooperative progress updates.
type CommandRunEvent struct {
	RunID           string
	Revision        uint64
	DispatchID      string
	CommandID       string
	Handler         string
	HandlerKind     HandlerKind
	DispatchTarget  DispatchTarget
	Route           string
	ExecutionMode   ExecutionMode
	Phase           CommandRunPhase
	Checkpoint      string
	Message         string
	Current         int64
	Total           int64
	CorrelationID   string
	IdempotencyKey  string
	Attempt         int
	MaxAttempts     int
	OccurredAt      time.Time
	StartedAt       time.Time
	Duration        time.Duration
	Receipt         DispatchReceipt
	Provenance      DispatchProvenance
	FailureCategory string
	Metadata        map[string]any
	Error           error
}

// Clone returns an event copy with isolated metadata.
func (e CommandRunEvent) Clone() CommandRunEvent {
	e.Metadata = CloneCommandRunMetadata(e.Metadata)
	e.Receipt = cloneDispatchReceipt(e.Receipt)
	return e
}

// CommandRunObserver receives command run events. Implementations should return
// errors for host diagnostics only; dispatchers treat observers as fail-open.
type CommandRunObserver interface {
	OnCommandRunEvent(context.Context, CommandRunEvent) error
}

// CommandRunObserverFunc adapts a function into a CommandRunObserver.
type CommandRunObserverFunc func(context.Context, CommandRunEvent) error

func (f CommandRunObserverFunc) OnCommandRunEvent(ctx context.Context, event CommandRunEvent) error {
	if f == nil {
		return nil
	}
	return f(ctx, event)
}

// ProgressUpdate describes a cooperative progress or checkpoint update from
// command code.
type ProgressUpdate struct {
	Checkpoint string
	Message    string
	Current    int64
	Total      int64
	Metadata   map[string]any
}

func (u ProgressUpdate) clone() ProgressUpdate {
	u.Metadata = CloneCommandRunMetadata(u.Metadata)
	return u
}

// ProgressOption customizes a checkpoint or progress update.
type ProgressOption func(*ProgressUpdate)

// WithProgressMessage attaches a safe operator-facing message to an update.
func WithProgressMessage(message string) ProgressOption {
	return func(update *ProgressUpdate) {
		update.Message = strings.TrimSpace(message)
	}
}

// WithProgressMetadata attaches safe metadata to an update. The map is cloned.
func WithProgressMetadata(metadata map[string]any) ProgressOption {
	return func(update *ProgressUpdate) {
		update.Metadata = CloneCommandRunMetadata(metadata)
	}
}

// CommandProgressReporter receives cooperative progress updates from commands.
type CommandProgressReporter interface {
	ReportProgress(context.Context, ProgressUpdate)
}

// CommandProgressReporterFunc adapts a function into a CommandProgressReporter.
type CommandProgressReporterFunc func(context.Context, ProgressUpdate)

func (f CommandProgressReporterFunc) ReportProgress(ctx context.Context, update ProgressUpdate) {
	if f == nil {
		return
	}
	f(ctx, update.clone())
}

// ProgressAwareCommander can receive an explicit reporter while still
// supporting the ordinary Commander Execute method for compatibility.
type ProgressAwareCommander[T any] interface {
	ExecuteWithProgress(context.Context, T, CommandProgressReporter) error
}

type commandProgressReporterContextKey struct{}

// ContextWithCommandProgressReporter stores a progress reporter in context.
func ContextWithCommandProgressReporter(ctx context.Context, reporter CommandProgressReporter) context.Context {
	if ctx == nil {
		ctx = context.Background()
	}
	if reporter == nil {
		return ctx
	}
	return context.WithValue(ctx, commandProgressReporterContextKey{}, reporter)
}

// CommandProgressReporterFromContext returns the progress reporter, if present.
func CommandProgressReporterFromContext(ctx context.Context) (CommandProgressReporter, bool) {
	if ctx == nil {
		return nil, false
	}
	reporter, ok := ctx.Value(commandProgressReporterContextKey{}).(CommandProgressReporter)
	return reporter, ok && reporter != nil
}

// Checkpoint reports a named checkpoint when the context has a reporter.
func Checkpoint(ctx context.Context, checkpoint string, opts ...ProgressOption) {
	reportProgressUpdate(ctx, ProgressUpdate{Checkpoint: strings.TrimSpace(checkpoint)}, opts...)
}

// Progress reports current and total counts when the context has a reporter.
func Progress(ctx context.Context, current, total int64, opts ...ProgressOption) {
	reportProgressUpdate(ctx, ProgressUpdate{Current: current, Total: total}, opts...)
}

func reportProgressUpdate(ctx context.Context, update ProgressUpdate, opts ...ProgressOption) {
	reporter, ok := CommandProgressReporterFromContext(ctx)
	if !ok {
		return
	}
	for _, opt := range opts {
		if opt != nil {
			opt(&update)
		}
	}
	reporter.ReportProgress(ctx, update.clone())
}

// DispatchRunContext carries safe run identity and dispatch metadata through a
// command execution context.
type DispatchRunContext struct {
	RunID string
	// Revision is the last lifecycle revision reserved by the process handing
	// this run to another executor. Persist it with queued work so a worker can
	// continue the same monotonic sequence in another process.
	Revision       uint64
	DispatchID     string
	CommandID      string
	Handler        string
	HandlerKind    HandlerKind
	DispatchTarget DispatchTarget
	Route          string
	ExecutionMode  ExecutionMode
	CorrelationID  string
	IdempotencyKey string
	Attempt        int
	MaxAttempts    int
	StartedAt      time.Time
	Receipt        DispatchReceipt
	Provenance     DispatchProvenance
	Metadata       map[string]any
}

func (r DispatchRunContext) clone() DispatchRunContext {
	r.Metadata = CloneCommandRunMetadata(r.Metadata)
	r.Receipt = cloneDispatchReceipt(r.Receipt)
	return r
}

func cloneDispatchReceipt(receipt DispatchReceipt) DispatchReceipt {
	if receipt.EnqueuedAt != nil {
		enqueuedAt := *receipt.EnqueuedAt
		receipt.EnqueuedAt = &enqueuedAt
	}
	return receipt
}

type dispatchRunContextKey struct{}
type commandRunRevisionContextKey struct{}

type commandRunRevisionState struct {
	value atomic.Uint64
}

// ContextWithCommandRunRevision starts a process-local sequencer from the last
// revision persisted with a dispatch run. The state is shared by derived
// contexts so progress reporters and lifecycle emitters allocate one sequence.
func ContextWithCommandRunRevision(ctx context.Context, last uint64) context.Context {
	if ctx == nil {
		ctx = context.Background()
	}
	state := &commandRunRevisionState{}
	state.value.Store(last)
	return context.WithValue(ctx, commandRunRevisionContextKey{}, state)
}

// NextCommandRunRevision atomically reserves the next lifecycle revision.
func NextCommandRunRevision(ctx context.Context) uint64 {
	state, ok := commandRunRevisionStateFromContext(ctx)
	if !ok {
		return 0
	}
	return state.value.Add(1)
}

// CommandRunRevisionFromContext returns the latest reserved revision.
func CommandRunRevisionFromContext(ctx context.Context) (uint64, bool) {
	state, ok := commandRunRevisionStateFromContext(ctx)
	if !ok {
		return 0, false
	}
	return state.value.Load(), true
}

func commandRunRevisionStateFromContext(ctx context.Context) (*commandRunRevisionState, bool) {
	if ctx == nil {
		return nil, false
	}
	state, ok := ctx.Value(commandRunRevisionContextKey{}).(*commandRunRevisionState)
	return state, ok && state != nil
}

// ContextWithDispatchRun stores command run identity in context.
func ContextWithDispatchRun(ctx context.Context, run DispatchRunContext) context.Context {
	if ctx == nil {
		ctx = context.Background()
	}
	return context.WithValue(ctx, dispatchRunContextKey{}, run.clone())
}

// DispatchRunFromContext returns command run identity, if present.
func DispatchRunFromContext(ctx context.Context) (DispatchRunContext, bool) {
	if ctx == nil {
		return DispatchRunContext{}, false
	}
	run, ok := ctx.Value(dispatchRunContextKey{}).(DispatchRunContext)
	if !ok {
		return DispatchRunContext{}, false
	}
	if revision, exists := CommandRunRevisionFromContext(ctx); exists && revision > run.Revision {
		run.Revision = revision
	}
	return run.clone(), true
}

// CloneCommandRunMetadata shallow-clones event, run, and progress metadata.
func CloneCommandRunMetadata(metadata map[string]any) map[string]any {
	if len(metadata) == 0 {
		return nil
	}
	out := make(map[string]any, len(metadata))
	maps.Copy(out, metadata)
	return out
}

// CommandRunAttempt describes the current or final runner attempt.
type CommandRunAttempt struct {
	Attempt     int
	MaxAttempts int
}

// CommandProgressDescriptor describes optional, safe progress metadata for a
// command catalog entry.
type CommandProgressDescriptor struct {
	Units       string                      `json:"units,omitempty"`
	Total       int64                       `json:"total,omitempty"`
	Checkpoints []CommandProgressCheckpoint `json:"checkpoints,omitempty"`
	Metadata    map[string]any              `json:"metadata,omitempty"`
}

// CommandProgressCheckpoint describes a named checkpoint that a command may report.
type CommandProgressCheckpoint struct {
	ID          string         `json:"id"`
	Label       string         `json:"label,omitempty"`
	Description string         `json:"description,omitempty"`
	Order       int            `json:"order,omitempty"`
	Metadata    map[string]any `json:"metadata,omitempty"`
}

// CommandProgressDescriber lets a command provide optional progress metadata.
type CommandProgressDescriber interface {
	CommandProgressDescriptor() CommandProgressDescriptor
}

type commandRunAttemptContextKey struct{}
type commandRunAttemptTrackerContextKey struct{}

type commandRunAttemptTracker struct {
	mu      sync.RWMutex
	attempt CommandRunAttempt
}

// ContextWithCommandRunAttempt stores the current attempt for command code.
func ContextWithCommandRunAttempt(ctx context.Context, attempt CommandRunAttempt) context.Context {
	if ctx == nil {
		ctx = context.Background()
	}
	return context.WithValue(ctx, commandRunAttemptContextKey{}, attempt)
}

// CommandRunAttemptFromContext returns current attempt metadata, if present.
func CommandRunAttemptFromContext(ctx context.Context) (CommandRunAttempt, bool) {
	if ctx == nil {
		return CommandRunAttempt{}, false
	}
	if attempt, ok := ctx.Value(commandRunAttemptContextKey{}).(CommandRunAttempt); ok {
		return attempt, true
	}
	tracker, ok := ctx.Value(commandRunAttemptTrackerContextKey{}).(*commandRunAttemptTracker)
	if !ok || tracker == nil {
		return CommandRunAttempt{}, false
	}
	tracker.mu.RLock()
	defer tracker.mu.RUnlock()
	if tracker.attempt.Attempt == 0 && tracker.attempt.MaxAttempts == 0 {
		return CommandRunAttempt{}, false
	}
	return tracker.attempt, true
}

// ContextWithCommandRunAttemptTracker lets dispatch code read the latest
// attempt summary after runner execution.
func ContextWithCommandRunAttemptTracker(ctx context.Context) context.Context {
	if ctx == nil {
		ctx = context.Background()
	}
	if _, ok := ctx.Value(commandRunAttemptTrackerContextKey{}).(*commandRunAttemptTracker); ok {
		return ctx
	}
	return context.WithValue(ctx, commandRunAttemptTrackerContextKey{}, &commandRunAttemptTracker{})
}

// RecordCommandRunAttempt records the latest runner attempt when a tracker is
// present in context.
func RecordCommandRunAttempt(ctx context.Context, attempt CommandRunAttempt) {
	if ctx == nil {
		return
	}
	tracker, ok := ctx.Value(commandRunAttemptTrackerContextKey{}).(*commandRunAttemptTracker)
	if !ok || tracker == nil {
		return
	}
	tracker.mu.Lock()
	defer tracker.mu.Unlock()
	tracker.attempt = attempt
}

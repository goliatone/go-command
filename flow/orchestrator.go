package flow

import (
	"context"
	"errors"
	"fmt"
	"sort"
	"strconv"
	"strings"
	"sync"
	"sync/atomic"
	"time"

	"github.com/goliatone/go-command"
)

const (
	ExecutionStatePending   = "pending"
	ExecutionStateRunning   = "running"
	ExecutionStatePaused    = "paused"
	ExecutionStateStopped   = "stopped"
	ExecutionStateCompleted = "completed"
	ExecutionStateDegraded  = "degraded"
	ExecutionStateFailed    = "failed"
)

// RetryPolicy captures retry ownership settings for one execution path.
type RetryPolicy struct {
	WorkerRetries bool
	TaskRetries   bool
}

// Validate enforces the single retry owner rule.
func (p RetryPolicy) Validate() error {
	if p.WorkerRetries && p.TaskRetries {
		return fmt.Errorf("retry ownership conflict: worker and task retries cannot both be enabled")
	}
	return nil
}

// Orchestrator executes transition effects according to policy depth.
type Orchestrator[T any] interface {
	Start(ctx context.Context, req StartRequest[T]) (*ExecutionHandle, error)
	Pause(ctx context.Context, executionID string) error
	Resume(ctx context.Context, executionID string) error
	Stop(ctx context.Context, executionID string) error
	Status(ctx context.Context, executionID string) (*ExecutionStatus, error)
}

// ExecutionScope constrains execution control/query APIs.
type ExecutionScope struct {
	MachineID   string
	EntityID    string
	ExecutionID string
	Tenant      string
}

// ExecutionListProvider exposes execution listing for query handlers.
type ExecutionListProvider interface {
	List(ctx context.Context, scope ExecutionScope) ([]ExecutionStatus, error)
}

// ExecutionHistoryProvider exposes execution lifecycle history for query handlers.
type ExecutionHistoryProvider[T any] interface {
	History(ctx context.Context, scope ExecutionScope) ([]TransitionLifecycleEvent[T], error)
}

// StartRequest carries transition output into the orchestration layer.
type StartRequest[T any] struct {
	ExecutionID     string
	MachineID       string
	MachineVersion  string
	EntityID        string
	Event           string
	TransitionID    string
	PreviousState   string
	CurrentState    string
	ExpectedState   string
	ExpectedVersion int
	ExecCtx         ExecutionContext
	RetryPolicy     RetryPolicy
	Result          *TransitionResult[T]
	Snapshot        *Snapshot
	Msg             T
	Metadata        map[string]any
}

// ExecutionStatus reports orchestration progress.
type ExecutionStatus struct {
	ExecutionID string
	Policy      ExecutionPolicy
	Status      string
	Attempts    int
	ErrorCode   string
	Error       string
	UpdatedAt   time.Time
	Metadata    map[string]any
}

// ExecutionRecord persists durable execution tracking metadata.
type ExecutionRecord[T any] struct {
	ExecutionID     string
	Policy          ExecutionPolicy
	Status          string
	MachineID       string
	MachineVersion  string
	EntityID        string
	Event           string
	TransitionID    string
	PreviousState   string
	CurrentState    string
	ExpectedState   string
	ExpectedVersion int
	AttemptCount    int
	ErrorCode       string
	ErrorMessage    string
	RetryPolicy     RetryPolicy
	Effects         []Effect
	Metadata        map[string]any
	CreatedAt       time.Time
	UpdatedAt       time.Time
	Msg             T
}

// ExecutionDispatchHistory captures durable dispatch progression for one execution.
type ExecutionDispatchHistory struct {
	ExecutionID  string
	MachineID    string
	EntityID     string
	TransitionID string
	OutboxID     string
	Event        string
	Outcome      DispatchOutcome
	Attempt      int
	RetryAt      time.Time
	Error        string
	OccurredAt   time.Time
	Metadata     map[string]any
}

// ExecutionRecordStore persists execution records for durable orchestration.
type ExecutionRecordStore[T any] interface {
	Save(ctx context.Context, rec *ExecutionRecord[T]) error
	Load(ctx context.Context, executionID string) (*ExecutionRecord[T], error)
	List(ctx context.Context) ([]*ExecutionRecord[T], error)
	ListByScope(ctx context.Context, scope ExecutionScope) ([]*ExecutionRecord[T], error)
	UpdateStatus(ctx context.Context, executionID, status string) error
	UpdateResult(ctx context.Context, executionID, status, errorCode, errorMessage, currentState string) error
	ApplyDispatchOutcome(ctx context.Context, result DispatchEntryResult) error
	DispatchHistory(ctx context.Context, scope ExecutionScope) ([]ExecutionDispatchHistory, error)
}

// LifecycleIntentStore persists lifecycle intents for async/durable processing.
type LifecycleIntentStore[T any] interface {
	Append(ctx context.Context, evt TransitionLifecycleEvent[T]) error
	List(ctx context.Context) ([]TransitionLifecycleEvent[T], error)
}

// InMemoryExecutionRecordStore keeps execution records in memory.
type InMemoryExecutionRecordStore[T any] struct {
	mu      sync.RWMutex
	records map[string]*ExecutionRecord[T]
	history []ExecutionDispatchHistory
}

// NewInMemoryExecutionRecordStore constructs an empty execution record store.
func NewInMemoryExecutionRecordStore[T any]() *InMemoryExecutionRecordStore[T] {
	return &InMemoryExecutionRecordStore[T]{
		records: make(map[string]*ExecutionRecord[T]),
		history: make([]ExecutionDispatchHistory, 0),
	}
}

func (s *InMemoryExecutionRecordStore[T]) Save(_ context.Context, rec *ExecutionRecord[T]) error {
	if s == nil {
		return errors.New("execution record store not configured")
	}
	rec = cloneExecutionRecord(rec)
	if rec == nil {
		return errors.New("execution record required")
	}
	if strings.TrimSpace(rec.ExecutionID) == "" {
		return errors.New("execution id required")
	}
	now := time.Now().UTC()
	if rec.CreatedAt.IsZero() {
		rec.CreatedAt = now
	}
	rec.UpdatedAt = now
	s.mu.Lock()
	defer s.mu.Unlock()
	if _, exists := s.records[rec.ExecutionID]; exists {
		return fmt.Errorf("execution %s already exists", rec.ExecutionID)
	}
	s.records[rec.ExecutionID] = rec
	return nil
}

func (s *InMemoryExecutionRecordStore[T]) Load(_ context.Context, executionID string) (*ExecutionRecord[T], error) {
	if s == nil {
		return nil, errors.New("execution record store not configured")
	}
	executionID = strings.TrimSpace(executionID)
	if executionID == "" {
		return nil, nil
	}
	s.mu.RLock()
	defer s.mu.RUnlock()
	rec, ok := s.records[executionID]
	if !ok {
		return nil, nil
	}
	return cloneExecutionRecord(rec), nil
}

func (s *InMemoryExecutionRecordStore[T]) List(_ context.Context) ([]*ExecutionRecord[T], error) {
	return s.ListByScope(context.Background(), ExecutionScope{})
}

func (s *InMemoryExecutionRecordStore[T]) ListByScope(_ context.Context, scope ExecutionScope) ([]*ExecutionRecord[T], error) {
	if s == nil {
		return nil, errors.New("execution record store not configured")
	}
	scope = normalizeExecutionScope(scope)
	s.mu.RLock()
	defer s.mu.RUnlock()
	out := make([]*ExecutionRecord[T], 0, len(s.records))
	for _, rec := range s.records {
		if rec == nil {
			continue
		}
		if !executionScopeMatchesRecord(scope, rec) {
			continue
		}
		out = append(out, cloneExecutionRecord(rec))
	}
	sort.Slice(out, func(i, j int) bool {
		if out[i].UpdatedAt.Equal(out[j].UpdatedAt) {
			return out[i].ExecutionID < out[j].ExecutionID
		}
		return out[i].UpdatedAt.Before(out[j].UpdatedAt)
	})
	return out, nil
}

func (s *InMemoryExecutionRecordStore[T]) UpdateStatus(_ context.Context, executionID, status string) error {
	if s == nil {
		return errors.New("execution record store not configured")
	}
	executionID = strings.TrimSpace(executionID)
	if executionID == "" {
		return errors.New("execution id required")
	}
	status = strings.TrimSpace(status)
	if status == "" {
		return errors.New("status required")
	}
	s.mu.Lock()
	defer s.mu.Unlock()
	rec, ok := s.records[executionID]
	if !ok || rec == nil {
		return fmt.Errorf("execution %s not found", executionID)
	}
	rec.Status = status
	rec.UpdatedAt = time.Now().UTC()
	return nil
}

func (s *InMemoryExecutionRecordStore[T]) UpdateResult(
	_ context.Context,
	executionID, status, errorCode, errorMessage, currentState string,
) error {
	if s == nil {
		return errors.New("execution record store not configured")
	}
	executionID = strings.TrimSpace(executionID)
	if executionID == "" {
		return errors.New("execution id required")
	}
	s.mu.Lock()
	defer s.mu.Unlock()
	rec, ok := s.records[executionID]
	if !ok || rec == nil {
		return fmt.Errorf("execution %s not found", executionID)
	}
	rec.Status = strings.TrimSpace(status)
	rec.ErrorCode = strings.TrimSpace(errorCode)
	rec.ErrorMessage = strings.TrimSpace(errorMessage)
	if state := normalizeState(currentState); state != "" {
		rec.CurrentState = state
	}
	rec.UpdatedAt = time.Now().UTC()
	return nil
}

func (s *InMemoryExecutionRecordStore[T]) ApplyDispatchOutcome(_ context.Context, result DispatchEntryResult) error {
	if s == nil {
		return errors.New("execution record store not configured")
	}
	executionID := strings.TrimSpace(result.ExecutionID)
	if executionID == "" {
		return errors.New("execution id required")
	}
	now := time.Now().UTC()
	occurredAt := result.OccurredAt
	if occurredAt.IsZero() {
		occurredAt = now
	}

	s.mu.Lock()
	defer s.mu.Unlock()
	rec, ok := s.records[executionID]
	if !ok || rec == nil {
		return fmt.Errorf("execution %s not found", executionID)
	}

	history := ExecutionDispatchHistory{
		ExecutionID:  executionID,
		MachineID:    strings.TrimSpace(rec.MachineID),
		EntityID:     strings.TrimSpace(result.EntityID),
		TransitionID: strings.TrimSpace(result.TransitionID),
		OutboxID:     strings.TrimSpace(result.OutboxID),
		Event:        normalizeEvent(result.Event),
		Outcome:      result.Outcome,
		Attempt:      result.Attempt,
		RetryAt:      result.RetryAt,
		Error:        strings.TrimSpace(result.Error),
		OccurredAt:   occurredAt,
		Metadata:     copyMap(result.Metadata),
	}
	if history.EntityID == "" {
		history.EntityID = strings.TrimSpace(rec.EntityID)
	}
	if history.TransitionID == "" {
		history.TransitionID = strings.TrimSpace(rec.TransitionID)
	}
	if history.Event == "" {
		history.Event = normalizeEvent(rec.Event)
	}
	s.history = append(s.history, history)

	rec.Metadata = mergeFields(rec.Metadata, map[string]any{
		"last_dispatch_outcome": string(result.Outcome),
		"last_dispatch_outbox":  history.OutboxID,
	})
	switch result.Outcome {
	case DispatchOutcomeCompleted:
		completedCount := metadataInt(rec.Metadata, "dispatch_completed_count") + 1
		rec.Metadata["dispatch_completed_count"] = completedCount
		rec.Metadata["dispatch_effect_count"] = len(rec.Effects)
		rec.Status = ExecutionStateRunning
		if len(rec.Effects) == 0 || completedCount >= len(rec.Effects) {
			rec.Status = ExecutionStateCompleted
		}
		rec.ErrorCode = ""
		rec.ErrorMessage = ""
	case DispatchOutcomeRetryScheduled:
		rec.Status = ExecutionStateDegraded
		rec.ErrorCode = ErrCodeOrchestrationDegraded
		rec.ErrorMessage = strings.TrimSpace(result.Error)
		if !result.RetryAt.IsZero() {
			rec.Metadata["dispatch_retry_at"] = result.RetryAt.UTC().Format(time.RFC3339Nano)
		}
	case DispatchOutcomeDeadLettered:
		rec.Status = ExecutionStateFailed
		rec.ErrorCode = ErrCodeOrchestrationDegraded
		rec.ErrorMessage = strings.TrimSpace(result.Error)
	default:
		// Keep existing status for unknown outcomes.
	}
	if result.Attempt > rec.AttemptCount {
		rec.AttemptCount = result.Attempt
	}
	rec.UpdatedAt = now
	return nil
}

func (s *InMemoryExecutionRecordStore[T]) DispatchHistory(_ context.Context, scope ExecutionScope) ([]ExecutionDispatchHistory, error) {
	if s == nil {
		return nil, errors.New("execution record store not configured")
	}
	scope = normalizeExecutionScope(scope)
	s.mu.RLock()
	defer s.mu.RUnlock()
	out := make([]ExecutionDispatchHistory, 0, len(s.history))
	for _, item := range s.history {
		if !executionScopeMatchesDispatchHistory(scope, item) {
			continue
		}
		out = append(out, cloneExecutionDispatchHistory(item))
	}
	sort.Slice(out, func(i, j int) bool {
		if out[i].OccurredAt.Equal(out[j].OccurredAt) {
			if out[i].ExecutionID == out[j].ExecutionID {
				return out[i].OutboxID < out[j].OutboxID
			}
			return out[i].ExecutionID < out[j].ExecutionID
		}
		return out[i].OccurredAt.Before(out[j].OccurredAt)
	})
	return out, nil
}

// InMemoryLifecycleIntentStore keeps lifecycle intents in memory.
type InMemoryLifecycleIntentStore[T any] struct {
	mu      sync.RWMutex
	intents []TransitionLifecycleEvent[T]
}

// NewInMemoryLifecycleIntentStore constructs an empty lifecycle intent store.
func NewInMemoryLifecycleIntentStore[T any]() *InMemoryLifecycleIntentStore[T] {
	return &InMemoryLifecycleIntentStore[T]{}
}

func (s *InMemoryLifecycleIntentStore[T]) Append(_ context.Context, evt TransitionLifecycleEvent[T]) error {
	if s == nil {
		return errors.New("lifecycle intent store not configured")
	}
	evt = cloneLifecycleEvent(evt)
	if evt.OccurredAt.IsZero() {
		evt.OccurredAt = time.Now().UTC()
	}
	s.mu.Lock()
	defer s.mu.Unlock()
	s.intents = append(s.intents, evt)
	return nil
}

func (s *InMemoryLifecycleIntentStore[T]) List(_ context.Context) ([]TransitionLifecycleEvent[T], error) {
	if s == nil {
		return nil, errors.New("lifecycle intent store not configured")
	}
	s.mu.RLock()
	defer s.mu.RUnlock()
	out := make([]TransitionLifecycleEvent[T], 0, len(s.intents))
	for _, evt := range s.intents {
		out = append(out, cloneLifecycleEvent(evt))
	}
	return out, nil
}

// NonRetryableError marks terminal errors for retry classifiers.
type NonRetryableError struct {
	Message string
	Cause   error
}

func (e *NonRetryableError) Error() string {
	msg := strings.TrimSpace(e.Message)
	if msg == "" {
		msg = "non-retryable execution error"
	}
	if e.Cause != nil {
		return msg + ": " + e.Cause.Error()
	}
	return msg
}

func (e *NonRetryableError) Unwrap() error { return e.Cause }

// IsNonRetryable reports whether err is marked terminal for retries.
func IsNonRetryable(err error) bool {
	var target *NonRetryableError
	return errors.As(err, &target)
}

// LightweightOrchestrator executes transition effects in-process.
type LightweightOrchestrator[T command.Message] struct {
	actions         *ActionRegistry[T]
	hooks           TransitionLifecycleHooks[T]
	hookFailureMode HookFailureMode
	logger          Logger

	mu       sync.RWMutex
	statuses map[string]*ExecutionStatus
	history  []TransitionLifecycleEvent[T]
}

// LightweightOrchestratorOption customizes lightweight orchestration.
type LightweightOrchestratorOption[T command.Message] func(*LightweightOrchestrator[T])

// WithLightweightHooks sets lifecycle hooks for in-process fan-out.
func WithLightweightHooks[T command.Message](hooks ...TransitionLifecycleHook[T]) LightweightOrchestratorOption[T] {
	return func(o *LightweightOrchestrator[T]) {
		o.hooks = append(o.hooks[:0], hooks...)
	}
}

// WithLightweightHookFailureMode configures hook failure handling.
func WithLightweightHookFailureMode[T command.Message](mode HookFailureMode) LightweightOrchestratorOption[T] {
	return func(o *LightweightOrchestrator[T]) {
		o.hookFailureMode = normalizeHookFailureMode(mode)
	}
}

// WithLightweightLogger configures orchestration logs.
func WithLightweightLogger[T command.Message](logger Logger) LightweightOrchestratorOption[T] {
	return func(o *LightweightOrchestrator[T]) {
		o.logger = normalizeLogger(logger)
	}
}

// NewLightweightOrchestrator builds an in-process orchestrator.
func NewLightweightOrchestrator[T command.Message](
	actions *ActionRegistry[T],
	opts ...LightweightOrchestratorOption[T],
) *LightweightOrchestrator[T] {
	o := &LightweightOrchestrator[T]{
		actions:         actions,
		hookFailureMode: HookFailureModeFailOpen,
		logger:          normalizeLogger(nil),
		statuses:        make(map[string]*ExecutionStatus),
		history:         make([]TransitionLifecycleEvent[T], 0),
	}
	for _, opt := range opts {
		if opt != nil {
			opt(o)
		}
	}
	o.hookFailureMode = normalizeHookFailureMode(o.hookFailureMode)
	o.logger = normalizeLogger(o.logger)
	return o
}

func (o *LightweightOrchestrator[T]) Start(ctx context.Context, req StartRequest[T]) (*ExecutionHandle, error) {
	if o == nil {
		return nil, errors.New("lightweight orchestrator not configured")
	}
	executionID := strings.TrimSpace(req.ExecutionID)
	if executionID == "" {
		executionID = newExecutionID()
	}
	fields := mergeFields(copyMap(req.Metadata), map[string]any{
		"machine_id":      strings.TrimSpace(req.MachineID),
		"machine_version": strings.TrimSpace(req.MachineVersion),
		"entity_id":       strings.TrimSpace(req.EntityID),
		"event":           normalizeEvent(req.Event),
		"transition_id":   strings.TrimSpace(req.TransitionID),
		"execution_id":    executionID,
	})
	logger := withLoggerFields(o.logger.WithContext(ctx), fields)
	logger.Debug("lightweight execution started")

	status := &ExecutionStatus{
		ExecutionID: executionID,
		Policy:      ExecutionPolicyLightweight,
		Status:      ExecutionStateRunning,
		UpdatedAt:   time.Now().UTC(),
		Metadata:    copyMap(fields),
	}
	o.setStatus(status)

	if req.Result != nil {
		for _, effect := range req.Result.Effects {
			if err := o.executeEffect(ctx, req.Msg, effect, fields); err != nil {
				o.setStatus(&ExecutionStatus{
					ExecutionID: executionID,
					Policy:      ExecutionPolicyLightweight,
					Status:      ExecutionStateFailed,
					ErrorCode:   runtimeErrorCode(err),
					Error:       err.Error(),
					UpdatedAt:   time.Now().UTC(),
					Metadata:    copyMap(fields),
				})
				return nil, err
			}
		}
	}

	o.setStatus(&ExecutionStatus{
		ExecutionID: executionID,
		Policy:      ExecutionPolicyLightweight,
		Status:      ExecutionStateCompleted,
		UpdatedAt:   time.Now().UTC(),
		Metadata:    copyMap(fields),
	})
	return &ExecutionHandle{
		ExecutionID: executionID,
		Policy:      string(ExecutionPolicyLightweight),
		Status:      ExecutionStateCompleted,
		Metadata:    copyMap(fields),
	}, nil
}

func (o *LightweightOrchestrator[T]) Pause(_ context.Context, executionID string) error {
	return o.updateStatus(executionID, ExecutionStatePaused)
}

func (o *LightweightOrchestrator[T]) Resume(_ context.Context, executionID string) error {
	return o.updateStatus(executionID, ExecutionStateRunning)
}

func (o *LightweightOrchestrator[T]) Stop(_ context.Context, executionID string) error {
	return o.updateStatus(executionID, ExecutionStateStopped)
}

func (o *LightweightOrchestrator[T]) Status(_ context.Context, executionID string) (*ExecutionStatus, error) {
	if o == nil {
		return nil, errors.New("lightweight orchestrator not configured")
	}
	executionID = strings.TrimSpace(executionID)
	if executionID == "" {
		return nil, errors.New("execution id required")
	}
	o.mu.RLock()
	defer o.mu.RUnlock()
	status, ok := o.statuses[executionID]
	if !ok || status == nil {
		return nil, fmt.Errorf("execution %s not found", executionID)
	}
	cp := *status
	cp.Metadata = copyMap(status.Metadata)
	return &cp, nil
}

func (o *LightweightOrchestrator[T]) List(_ context.Context, scope ExecutionScope) ([]ExecutionStatus, error) {
	if o == nil {
		return nil, errors.New("lightweight orchestrator not configured")
	}
	scope = normalizeExecutionScope(scope)
	o.mu.RLock()
	defer o.mu.RUnlock()
	out := make([]ExecutionStatus, 0, len(o.statuses))
	for _, status := range o.statuses {
		if status == nil {
			continue
		}
		cp := *status
		cp.Metadata = copyMap(status.Metadata)
		if !executionScopeMatchesStatus(scope, &cp) {
			continue
		}
		out = append(out, cp)
	}
	sort.Slice(out, func(i, j int) bool {
		if out[i].UpdatedAt.Equal(out[j].UpdatedAt) {
			return out[i].ExecutionID < out[j].ExecutionID
		}
		return out[i].UpdatedAt.Before(out[j].UpdatedAt)
	})
	return out, nil
}

func (o *LightweightOrchestrator[T]) History(_ context.Context, scope ExecutionScope) ([]TransitionLifecycleEvent[T], error) {
	if o == nil {
		return nil, errors.New("lightweight orchestrator not configured")
	}
	scope = normalizeExecutionScope(scope)
	o.mu.RLock()
	defer o.mu.RUnlock()
	out := make([]TransitionLifecycleEvent[T], 0, len(o.history))
	for _, evt := range o.history {
		if !executionScopeMatchesEvent(scope, evt) {
			continue
		}
		out = append(out, cloneLifecycleEvent(evt))
	}
	sort.Slice(out, func(i, j int) bool {
		if out[i].OccurredAt.Equal(out[j].OccurredAt) {
			return out[i].ExecutionID < out[j].ExecutionID
		}
		return out[i].OccurredAt.Before(out[j].OccurredAt)
	})
	return out, nil
}

func (o *LightweightOrchestrator[T]) OnTransitionLifecycleEvent(ctx context.Context, evt TransitionLifecycleEvent[T]) error {
	if o == nil {
		return errors.New("lightweight orchestrator not configured")
	}
	o.mu.Lock()
	o.history = append(o.history, cloneLifecycleEvent(evt))
	o.mu.Unlock()
	return fanoutLifecycleHooks(ctx, o.hooks, evt, o.hookFailureMode, o.logger)
}

func (o *LightweightOrchestrator[T]) executeEffect(
	ctx context.Context,
	msg T,
	effect Effect,
	fields map[string]any,
) error {
	switch eff := effect.(type) {
	case CommandEffect:
		if err := waitForDelay(ctx, eff.Delay); err != nil {
			return err
		}
		if strings.TrimSpace(eff.ActionID) == "" {
			return cloneRuntimeError(ErrPreconditionFailed, "command effect action id required", nil, fields)
		}
		action, ok := o.actions.Lookup(eff.ActionID)
		if !ok {
			return cloneRuntimeError(
				ErrPreconditionFailed,
				fmt.Sprintf("command effect action %q not registered", eff.ActionID),
				nil,
				fields,
			)
		}
		return action(ctx, msg)
	case EmitEvent:
		// Event emission adapters are policy-specific; lightweight keeps this as a no-op.
		return nil
	default:
		return nil
	}
}

func (o *LightweightOrchestrator[T]) updateStatus(executionID, status string) error {
	if o == nil {
		return errors.New("lightweight orchestrator not configured")
	}
	executionID = strings.TrimSpace(executionID)
	if executionID == "" {
		return errors.New("execution id required")
	}
	status = strings.TrimSpace(status)
	if status == "" {
		return errors.New("status required")
	}
	o.mu.Lock()
	defer o.mu.Unlock()
	current, ok := o.statuses[executionID]
	if !ok || current == nil {
		return fmt.Errorf("execution %s not found", executionID)
	}
	current.Status = status
	current.UpdatedAt = time.Now().UTC()
	return nil
}

func (o *LightweightOrchestrator[T]) setStatus(status *ExecutionStatus) {
	if o == nil || status == nil {
		return
	}
	cp := *status
	cp.Metadata = copyMap(status.Metadata)
	o.mu.Lock()
	defer o.mu.Unlock()
	o.statuses[cp.ExecutionID] = &cp
}

// DurableOrchestrator persists execution metadata and lifecycle intents.
type DurableOrchestrator[T command.Message] struct {
	records           ExecutionRecordStore[T]
	intents           LifecycleIntentStore[T]
	scheduler         JobScheduler
	outbox            OutboxStore
	dispatcher        DispatcherRuntime
	autoDispatch      bool
	dispatcherOptions []OutboxDispatcherOption
	retryPolicy       RetryPolicy
	logger            Logger
}

// DurableOrchestratorOption customizes durable orchestration.
type DurableOrchestratorOption[T command.Message] func(*DurableOrchestrator[T])

// WithDurableRetryPolicy configures retry ownership defaults.
func WithDurableRetryPolicy[T command.Message](policy RetryPolicy) DurableOrchestratorOption[T] {
	return func(o *DurableOrchestrator[T]) {
		o.retryPolicy = policy
	}
}

// WithDurableLogger configures durable orchestrator logging.
func WithDurableLogger[T command.Message](logger Logger) DurableOrchestratorOption[T] {
	return func(o *DurableOrchestrator[T]) {
		o.logger = normalizeLogger(logger)
	}
}

// WithDurableLifecycleIntentStore configures lifecycle intent persistence.
func WithDurableLifecycleIntentStore[T command.Message](store LifecycleIntentStore[T]) DurableOrchestratorOption[T] {
	return func(o *DurableOrchestrator[T]) {
		o.intents = store
	}
}

// WithDurableDispatcherRunner overrides the default orchestrator-managed dispatcher runtime.
func WithDurableDispatcherRunner[T command.Message](runner DispatcherRuntime) DurableOrchestratorOption[T] {
	return func(o *DurableOrchestrator[T]) {
		o.dispatcher = runner
	}
}

// WithDurableDispatchAutoRun configures automatic RunOnce progression during Start.
func WithDurableDispatchAutoRun[T command.Message](enabled bool) DurableOrchestratorOption[T] {
	return func(o *DurableOrchestrator[T]) {
		o.autoDispatch = enabled
	}
}

// WithDurableOutboxDispatcherOptions configures options for the default managed outbox dispatcher runtime.
func WithDurableOutboxDispatcherOptions[T command.Message](opts ...OutboxDispatcherOption) DurableOrchestratorOption[T] {
	return func(o *DurableOrchestrator[T]) {
		o.dispatcherOptions = append(o.dispatcherOptions[:0], opts...)
	}
}

// NewDurableOrchestrator builds a durable orchestrator implementation.
func NewDurableOrchestrator[T command.Message](
	records ExecutionRecordStore[T],
	scheduler JobScheduler,
	outbox OutboxStore,
	opts ...DurableOrchestratorOption[T],
) (*DurableOrchestrator[T], error) {
	if records == nil {
		records = NewInMemoryExecutionRecordStore[T]()
	}
	o := &DurableOrchestrator[T]{
		records:      records,
		intents:      NewInMemoryLifecycleIntentStore[T](),
		scheduler:    scheduler,
		outbox:       outbox,
		autoDispatch: true,
		logger:       normalizeLogger(nil),
	}
	for _, opt := range opts {
		if opt != nil {
			opt(o)
		}
	}
	if o.intents == nil {
		o.intents = NewInMemoryLifecycleIntentStore[T]()
	}
	if err := o.retryPolicy.Validate(); err != nil {
		return nil, err
	}
	if o.dispatcher == nil && o.outbox != nil && o.scheduler != nil {
		dispatcherOpts := make([]OutboxDispatcherOption, 0, len(o.dispatcherOptions)+1)
		dispatcherOpts = append(dispatcherOpts, o.dispatcherOptions...)
		dispatcherOpts = append(dispatcherOpts, WithOutboxOutcomeHook(o.onDispatchOutcome))
		o.dispatcher = NewOutboxDispatcher(
			o.outbox,
			o.scheduler,
			dispatcherOpts...,
		)
	}
	o.logger = normalizeLogger(o.logger)
	return o, nil
}

func (o *DurableOrchestrator[T]) Start(ctx context.Context, req StartRequest[T]) (*ExecutionHandle, error) {
	if o == nil {
		return nil, errors.New("durable orchestrator not configured")
	}
	executionID := strings.TrimSpace(req.ExecutionID)
	if executionID == "" {
		executionID = newExecutionID()
	}
	retry := req.RetryPolicy
	if !retry.WorkerRetries && !retry.TaskRetries {
		retry = o.retryPolicy
	}
	if err := retry.Validate(); err != nil {
		return nil, err
	}

	effects := []Effect(nil)
	if req.Result != nil {
		effects = append(effects, req.Result.Effects...)
	}
	metadata := copyMap(req.Metadata)
	metadata = mergeFields(metadata, map[string]any{
		"dispatch_effect_count":     len(effects),
		"dispatch_completed_count":  0,
		"last_dispatch_outcome":     "",
		"dispatch_auto_progression": o.autoDispatch,
	})
	record := &ExecutionRecord[T]{
		ExecutionID:     executionID,
		Policy:          ExecutionPolicyOrchestrated,
		Status:          ExecutionStateRunning,
		MachineID:       strings.TrimSpace(req.MachineID),
		MachineVersion:  strings.TrimSpace(req.MachineVersion),
		EntityID:        strings.TrimSpace(req.EntityID),
		Event:           normalizeEvent(req.Event),
		TransitionID:    strings.TrimSpace(req.TransitionID),
		PreviousState:   normalizeState(req.PreviousState),
		CurrentState:    normalizeState(req.CurrentState),
		ExpectedState:   normalizeState(req.ExpectedState),
		ExpectedVersion: req.ExpectedVersion,
		AttemptCount:    1,
		RetryPolicy:     retry,
		Effects:         effects,
		Metadata:        metadata,
		Msg:             req.Msg,
	}
	if err := o.records.Save(ctx, record); err != nil {
		return nil, err
	}

	fields := mergeFields(copyMap(metadata), map[string]any{
		"machine_id":      record.MachineID,
		"machine_version": record.MachineVersion,
		"entity_id":       record.EntityID,
		"event":           record.Event,
		"transition_id":   record.TransitionID,
		"execution_id":    record.ExecutionID,
	})
	logger := withLoggerFields(o.logger.WithContext(ctx), fields)
	logger.Info("durable execution recorded status=%s", record.Status)

	if o.autoDispatch && o.dispatcher != nil && len(effects) > 0 {
		report, dispatchErr := o.dispatcher.RunOnce(ctx)
		if dispatchErr != nil {
			logger.Warn("durable dispatcher run-once failed: %v", dispatchErr)
			// If the cycle failed before emitting execution-scoped outcomes, mark degradation explicitly.
			if !reportContainsExecutionOutcome(report, executionID) {
				_ = o.records.UpdateResult(
					ctx,
					executionID,
					ExecutionStateDegraded,
					ErrCodeOrchestrationDegraded,
					dispatchErr.Error(),
					record.CurrentState,
				)
			}
		}
		if report.Lag > 0 {
			logger.Debug("durable dispatcher lag=%s claimed=%d processed=%d", report.Lag, report.Claimed, report.Processed)
		}
	}

	handleStatus := record.Status
	updated, loadErr := o.records.Load(ctx, executionID)
	if loadErr == nil && updated != nil && strings.TrimSpace(updated.Status) != "" {
		handleStatus = strings.TrimSpace(updated.Status)
	}

	return &ExecutionHandle{
		ExecutionID: record.ExecutionID,
		Policy:      string(ExecutionPolicyOrchestrated),
		Status:      handleStatus,
		Metadata:    copyMap(fields),
	}, nil
}

func (o *DurableOrchestrator[T]) Pause(ctx context.Context, executionID string) error {
	return o.records.UpdateStatus(ctx, strings.TrimSpace(executionID), ExecutionStatePaused)
}

func (o *DurableOrchestrator[T]) Resume(ctx context.Context, executionID string) error {
	return o.records.UpdateStatus(ctx, strings.TrimSpace(executionID), ExecutionStateRunning)
}

func (o *DurableOrchestrator[T]) Stop(ctx context.Context, executionID string) error {
	return o.records.UpdateStatus(ctx, strings.TrimSpace(executionID), ExecutionStateStopped)
}

func (o *DurableOrchestrator[T]) Status(ctx context.Context, executionID string) (*ExecutionStatus, error) {
	if o == nil {
		return nil, errors.New("durable orchestrator not configured")
	}
	rec, err := o.records.Load(ctx, strings.TrimSpace(executionID))
	if err != nil {
		return nil, err
	}
	if rec == nil {
		return nil, fmt.Errorf("execution %s not found", executionID)
	}
	return &ExecutionStatus{
		ExecutionID: rec.ExecutionID,
		Policy:      rec.Policy,
		Status:      rec.Status,
		Attempts:    rec.AttemptCount,
		ErrorCode:   rec.ErrorCode,
		Error:       rec.ErrorMessage,
		UpdatedAt:   rec.UpdatedAt,
		Metadata:    copyMap(rec.Metadata),
	}, nil
}

func (o *DurableOrchestrator[T]) List(ctx context.Context, scope ExecutionScope) ([]ExecutionStatus, error) {
	if o == nil {
		return nil, errors.New("durable orchestrator not configured")
	}
	scope = normalizeExecutionScope(scope)
	records, err := o.records.ListByScope(ctx, scope)
	if err != nil {
		return nil, err
	}
	out := make([]ExecutionStatus, 0, len(records))
	for _, rec := range records {
		if rec == nil {
			continue
		}
		status := executionStatusFromRecord(rec)
		out = append(out, status)
	}
	sort.Slice(out, func(i, j int) bool {
		if out[i].UpdatedAt.Equal(out[j].UpdatedAt) {
			return out[i].ExecutionID < out[j].ExecutionID
		}
		return out[i].UpdatedAt.Before(out[j].UpdatedAt)
	})
	return out, nil
}

func (o *DurableOrchestrator[T]) History(ctx context.Context, scope ExecutionScope) ([]TransitionLifecycleEvent[T], error) {
	if o == nil {
		return nil, errors.New("durable orchestrator not configured")
	}
	intents, err := o.intents.List(ctx)
	if err != nil {
		return nil, err
	}
	scope = normalizeExecutionScope(scope)
	out := make([]TransitionLifecycleEvent[T], 0, len(intents))
	for _, evt := range intents {
		if !executionScopeMatchesEvent(scope, evt) {
			continue
		}
		out = append(out, cloneLifecycleEvent(evt))
	}
	sort.Slice(out, func(i, j int) bool {
		if out[i].OccurredAt.Equal(out[j].OccurredAt) {
			return out[i].ExecutionID < out[j].ExecutionID
		}
		return out[i].OccurredAt.Before(out[j].OccurredAt)
	})
	return out, nil
}

func (o *DurableOrchestrator[T]) OnTransitionLifecycleEvent(ctx context.Context, evt TransitionLifecycleEvent[T]) error {
	if o == nil {
		return errors.New("durable orchestrator not configured")
	}
	fields := map[string]any{
		"machine_id":      strings.TrimSpace(evt.MachineID),
		"machine_version": strings.TrimSpace(evt.MachineVersion),
		"entity_id":       strings.TrimSpace(evt.EntityID),
		"event":           normalizeEvent(evt.Event),
		"transition_id":   strings.TrimSpace(evt.TransitionID),
		"execution_id":    strings.TrimSpace(evt.ExecutionID),
		"phase":           string(evt.Phase),
	}
	logger := withLoggerFields(o.logger.WithContext(ctx), fields)
	logger.Debug("durable lifecycle intent appended")
	return o.intents.Append(ctx, cloneLifecycleEvent(evt))
}

// LifecycleIntents returns stored lifecycle intents (testing/inspection helper).
func (o *DurableOrchestrator[T]) LifecycleIntents(ctx context.Context) ([]TransitionLifecycleEvent[T], error) {
	if o == nil {
		return nil, errors.New("durable orchestrator not configured")
	}
	return o.intents.List(ctx)
}

// DispatchRuntime exposes the orchestrator-managed dispatcher runtime.
func (o *DurableOrchestrator[T]) DispatchRuntime() DispatcherRuntime {
	if o == nil {
		return nil
	}
	return o.dispatcher
}

// Run starts the orchestrator-managed dispatcher runtime loop.
func (o *DurableOrchestrator[T]) Run(ctx context.Context) error {
	if o == nil {
		return errors.New("durable orchestrator not configured")
	}
	if o.dispatcher == nil {
		return errors.New("durable dispatcher runtime not configured")
	}
	return o.dispatcher.Run(ctx)
}

// RunOnce executes one orchestrator-managed dispatch cycle.
func (o *DurableOrchestrator[T]) RunOnce(ctx context.Context) (DispatchReport, error) {
	if o == nil {
		return DispatchReport{}, errors.New("durable orchestrator not configured")
	}
	if o.dispatcher == nil {
		return DispatchReport{}, errors.New("durable dispatcher runtime not configured")
	}
	return o.dispatcher.RunOnce(ctx)
}

// StopDispatcher stops the orchestrator-managed dispatcher runtime loop.
func (o *DurableOrchestrator[T]) StopDispatcher(ctx context.Context) error {
	if o == nil {
		return errors.New("durable orchestrator not configured")
	}
	if o.dispatcher == nil {
		return nil
	}
	return o.dispatcher.Stop(ctx)
}

// DispatcherStatus returns the latest dispatcher runtime status snapshot.
func (o *DurableOrchestrator[T]) DispatcherStatus() (DispatcherRuntimeStatus, error) {
	if o == nil {
		return DispatcherRuntimeStatus{}, errors.New("durable orchestrator not configured")
	}
	if o.dispatcher == nil {
		return DispatcherRuntimeStatus{}, errors.New("durable dispatcher runtime not configured")
	}
	return o.dispatcher.Status(), nil
}

// DispatcherHealth returns dispatcher runtime health and emits health hooks.
func (o *DurableOrchestrator[T]) DispatcherHealth(ctx context.Context) (DispatcherHealth, error) {
	if o == nil {
		return DispatcherHealth{}, errors.New("durable orchestrator not configured")
	}
	if o.dispatcher == nil {
		return DispatcherHealth{}, errors.New("durable dispatcher runtime not configured")
	}
	return o.dispatcher.Health(ctx), nil
}

// DeadLetters exposes dead-letter inspection through the orchestrator's outbox store.
func (o *DurableOrchestrator[T]) DeadLetters(ctx context.Context, scope DeadLetterScope) ([]OutboxEntry, error) {
	if o == nil {
		return nil, errors.New("durable orchestrator not configured")
	}
	if o.outbox == nil {
		return nil, errors.New("durable outbox store not configured")
	}
	return o.outbox.ListDeadLetters(ctx, scope)
}

// DispatchHistory returns durable dispatch progression records for inspection.
func (o *DurableOrchestrator[T]) DispatchHistory(ctx context.Context, scope ExecutionScope) ([]ExecutionDispatchHistory, error) {
	if o == nil {
		return nil, errors.New("durable orchestrator not configured")
	}
	return o.records.DispatchHistory(ctx, normalizeExecutionScope(scope))
}

func (o *DurableOrchestrator[T]) onDispatchOutcome(ctx context.Context, result DispatchEntryResult) {
	if o == nil || o.records == nil {
		return
	}
	executionID := strings.TrimSpace(result.ExecutionID)
	if executionID == "" {
		return
	}
	if err := o.records.ApplyDispatchOutcome(ctx, result); err != nil {
		logger := withLoggerFields(o.logger.WithContext(ctx), map[string]any{
			"execution_id": executionID,
			"outbox_id":    strings.TrimSpace(result.OutboxID),
			"outcome":      string(result.Outcome),
		})
		logger.Warn("durable dispatch outcome progression update failed: %v", err)
		return
	}

	logger := withLoggerFields(o.logger.WithContext(ctx), map[string]any{
		"execution_id": executionID,
		"outbox_id":    strings.TrimSpace(result.OutboxID),
		"outcome":      string(result.Outcome),
		"attempt":      result.Attempt,
	})
	switch result.Outcome {
	case DispatchOutcomeCompleted:
		logger.Info("durable dispatch outcome completed")
	case DispatchOutcomeRetryScheduled:
		logger.Warn("durable dispatch outcome retry_scheduled retry_at=%s", result.RetryAt.UTC().Format(time.RFC3339Nano))
	case DispatchOutcomeDeadLettered:
		logger.Error("durable dispatch outcome dead_lettered")
	}

	rec, err := o.records.Load(ctx, executionID)
	if err != nil || rec == nil {
		return
	}
	phase := TransitionPhaseCommitted
	if result.Outcome != DispatchOutcomeCompleted {
		phase = TransitionPhaseRejected
	}
	evt := TransitionLifecycleEvent[T]{
		Phase:          phase,
		MachineID:      strings.TrimSpace(rec.MachineID),
		MachineVersion: strings.TrimSpace(rec.MachineVersion),
		EntityID:       strings.TrimSpace(rec.EntityID),
		ExecutionID:    executionID,
		Event:          normalizeEvent(rec.Event),
		TransitionID:   strings.TrimSpace(rec.TransitionID),
		PreviousState:  normalizeState(rec.PreviousState),
		CurrentState:   normalizeState(rec.CurrentState),
		Metadata: mergeFields(copyMap(result.Metadata), map[string]any{
			"dispatch_outcome": string(result.Outcome),
			"outbox_id":        strings.TrimSpace(result.OutboxID),
			"dispatch_attempt": result.Attempt,
		}),
		OccurredAt: time.Now().UTC(),
		Msg:        rec.Msg,
	}
	if !result.RetryAt.IsZero() {
		evt.Metadata = mergeFields(evt.Metadata, map[string]any{
			"retry_at": result.RetryAt.UTC().Format(time.RFC3339Nano),
		})
	}
	if text := strings.TrimSpace(result.Error); text != "" {
		evt.ErrorCode = ErrCodeOrchestrationDegraded
		evt.ErrorMessage = text
		evt.Metadata = mergeFields(evt.Metadata, map[string]any{
			"error_code":    evt.ErrorCode,
			"error_message": text,
		})
	}
	_ = o.intents.Append(ctx, cloneLifecycleEvent(evt))
}

// ResumeRequest encapsulates a resume callback with stale-state safeguards.
type ResumeRequest[T command.Message] struct {
	ExecutionID     string
	EntityID        string
	Event           string
	Msg             T
	ExpectedState   string
	ExpectedVersion int
	ExecCtx         ExecutionContext
	Apply           func(context.Context, ApplyEventRequest[T]) (*ApplyEventResponse[T], error)
}

// HandleResume validates expected state/version and classifies stale paths as terminal.
func (o *DurableOrchestrator[T]) HandleResume(ctx context.Context, req ResumeRequest[T]) error {
	if o == nil {
		return errors.New("durable orchestrator not configured")
	}
	if req.Apply == nil {
		return errors.New("resume apply function required")
	}
	executionID := strings.TrimSpace(req.ExecutionID)
	if executionID == "" {
		return errors.New("execution id required")
	}

	rec, err := o.records.Load(ctx, executionID)
	if err != nil {
		return err
	}
	if rec == nil {
		return &NonRetryableError{Message: "stale resume execution not found"}
	}
	if rec.Status == ExecutionStateStopped {
		return &NonRetryableError{Message: "stale resume execution stopped"}
	}

	expectedState := normalizeState(req.ExpectedState)
	recordExpected := normalizeState(rec.ExpectedState)
	if recordExpected != "" && expectedState != recordExpected {
		return &NonRetryableError{
			Message: fmt.Sprintf("stale resume expected state mismatch: got %q want %q", expectedState, recordExpected),
		}
	}
	if rec.ExpectedVersion > 0 && req.ExpectedVersion > 0 && req.ExpectedVersion != rec.ExpectedVersion {
		return &NonRetryableError{
			Message: fmt.Sprintf("stale resume expected version mismatch: got %d want %d", req.ExpectedVersion, rec.ExpectedVersion),
		}
	}

	resp, err := req.Apply(ctx, ApplyEventRequest[T]{
		EntityID:        req.EntityID,
		Event:           req.Event,
		Msg:             req.Msg,
		ExecCtx:         req.ExecCtx,
		ExpectedState:   req.ExpectedState,
		ExpectedVersion: req.ExpectedVersion,
	})
	if err != nil {
		code := runtimeErrorCode(err)
		switch code {
		case ErrCodePreconditionFailed, ErrCodeVersionConflict, ErrCodeStateNotFound, ErrCodeInvalidTransition:
			_ = o.records.UpdateResult(ctx, executionID, ExecutionStateFailed, code, err.Error(), "")
			return &NonRetryableError{Message: "stale resume terminal failure", Cause: err}
		default:
			return err
		}
	}

	nextState := ""
	if resp != nil && resp.Transition != nil {
		nextState = resp.Transition.CurrentState
	}
	return o.records.UpdateResult(ctx, executionID, ExecutionStateCompleted, "", "", nextState)
}

func executionStatusFromRecord[T any](rec *ExecutionRecord[T]) ExecutionStatus {
	if rec == nil {
		return ExecutionStatus{}
	}
	metadata := copyMap(rec.Metadata)
	metadata = mergeFields(metadata, map[string]any{
		"machine_id":      strings.TrimSpace(rec.MachineID),
		"machine_version": strings.TrimSpace(rec.MachineVersion),
		"entity_id":       strings.TrimSpace(rec.EntityID),
		"execution_id":    strings.TrimSpace(rec.ExecutionID),
	})
	return ExecutionStatus{
		ExecutionID: rec.ExecutionID,
		Policy:      rec.Policy,
		Status:      rec.Status,
		Attempts:    rec.AttemptCount,
		ErrorCode:   rec.ErrorCode,
		Error:       rec.ErrorMessage,
		UpdatedAt:   rec.UpdatedAt,
		Metadata:    metadata,
	}
}

func executionScopeMatchesRecord[T any](scope ExecutionScope, rec *ExecutionRecord[T]) bool {
	if rec == nil {
		return false
	}
	scope = normalizeExecutionScope(scope)
	if scope.ExecutionID != "" && strings.TrimSpace(rec.ExecutionID) != scope.ExecutionID {
		return false
	}
	if scope.MachineID != "" && strings.TrimSpace(rec.MachineID) != scope.MachineID {
		return false
	}
	if scope.EntityID != "" && strings.TrimSpace(rec.EntityID) != scope.EntityID {
		return false
	}
	if scope.Tenant != "" && strings.TrimSpace(readStringFromMetadata(rec.Metadata, "tenant")) != scope.Tenant {
		return false
	}
	return true
}

func executionScopeMatchesDispatchHistory(scope ExecutionScope, item ExecutionDispatchHistory) bool {
	scope = normalizeExecutionScope(scope)
	if scope.ExecutionID != "" && strings.TrimSpace(item.ExecutionID) != scope.ExecutionID {
		return false
	}
	if scope.MachineID != "" && strings.TrimSpace(item.MachineID) != scope.MachineID {
		return false
	}
	if scope.EntityID != "" && strings.TrimSpace(item.EntityID) != scope.EntityID {
		return false
	}
	if scope.Tenant != "" && strings.TrimSpace(readStringFromMetadata(item.Metadata, "tenant")) != scope.Tenant {
		return false
	}
	return true
}

func cloneExecutionDispatchHistory(item ExecutionDispatchHistory) ExecutionDispatchHistory {
	cp := item
	cp.Metadata = copyMap(item.Metadata)
	return cp
}

func reportContainsExecutionOutcome(report DispatchReport, executionID string) bool {
	executionID = strings.TrimSpace(executionID)
	if executionID == "" {
		return false
	}
	for _, outcome := range report.Outcomes {
		if strings.TrimSpace(outcome.ExecutionID) == executionID {
			return true
		}
	}
	return false
}

func normalizeExecutionScope(scope ExecutionScope) ExecutionScope {
	scope.MachineID = strings.TrimSpace(scope.MachineID)
	scope.EntityID = strings.TrimSpace(scope.EntityID)
	scope.ExecutionID = strings.TrimSpace(scope.ExecutionID)
	scope.Tenant = strings.TrimSpace(scope.Tenant)
	return scope
}

func executionScopeMatchesStatus(scope ExecutionScope, status *ExecutionStatus) bool {
	if status == nil {
		return false
	}
	scope = normalizeExecutionScope(scope)
	if scope.ExecutionID != "" && strings.TrimSpace(status.ExecutionID) != scope.ExecutionID {
		return false
	}
	metadata := status.Metadata
	if scope.MachineID != "" && strings.TrimSpace(readStringFromMetadata(metadata, "machine_id")) != scope.MachineID {
		return false
	}
	if scope.EntityID != "" && strings.TrimSpace(readStringFromMetadata(metadata, "entity_id")) != scope.EntityID {
		return false
	}
	if scope.Tenant != "" && strings.TrimSpace(readStringFromMetadata(metadata, "tenant")) != scope.Tenant {
		return false
	}
	return true
}

func executionScopeMatchesEvent[T any](scope ExecutionScope, evt TransitionLifecycleEvent[T]) bool {
	scope = normalizeExecutionScope(scope)
	if scope.ExecutionID != "" && strings.TrimSpace(evt.ExecutionID) != scope.ExecutionID {
		return false
	}
	if scope.MachineID != "" && strings.TrimSpace(evt.MachineID) != scope.MachineID {
		return false
	}
	if scope.EntityID != "" && strings.TrimSpace(evt.EntityID) != scope.EntityID {
		return false
	}
	tenant := strings.TrimSpace(evt.ExecCtx.Tenant)
	if tenant == "" {
		tenant = strings.TrimSpace(readStringFromMetadata(evt.Metadata, "tenant"))
	}
	if scope.Tenant != "" && tenant != scope.Tenant {
		return false
	}
	return true
}

func readStringFromMetadata(metadata map[string]any, key string) string {
	if len(metadata) == 0 {
		return ""
	}
	raw, ok := metadata[strings.TrimSpace(key)]
	if !ok {
		return ""
	}
	switch value := raw.(type) {
	case string:
		return value
	case fmt.Stringer:
		return value.String()
	default:
		return fmt.Sprintf("%v", value)
	}
}

func metadataInt(metadata map[string]any, key string) int {
	if len(metadata) == 0 {
		return 0
	}
	raw, ok := metadata[strings.TrimSpace(key)]
	if !ok {
		return 0
	}
	switch value := raw.(type) {
	case int:
		return value
	case int8:
		return int(value)
	case int16:
		return int(value)
	case int32:
		return int(value)
	case int64:
		return int(value)
	case uint:
		return int(value)
	case uint8:
		return int(value)
	case uint16:
		return int(value)
	case uint32:
		return int(value)
	case uint64:
		return int(value)
	case float32:
		return int(value)
	case float64:
		return int(value)
	default:
		n, _ := strconv.Atoi(strings.TrimSpace(fmt.Sprintf("%v", raw)))
		return n
	}
}

func waitForDelay(ctx context.Context, delay time.Duration) error {
	if delay <= 0 {
		return nil
	}
	timer := time.NewTimer(delay)
	defer timer.Stop()
	select {
	case <-ctx.Done():
		return ctx.Err()
	case <-timer.C:
		return nil
	}
}

func cloneExecutionRecord[T any](rec *ExecutionRecord[T]) *ExecutionRecord[T] {
	if rec == nil {
		return nil
	}
	cp := *rec
	if len(rec.Effects) > 0 {
		cp.Effects = append([]Effect(nil), rec.Effects...)
	}
	cp.Metadata = copyMap(rec.Metadata)
	return &cp
}

var executionCounter atomic.Uint64

func newExecutionID() string {
	n := executionCounter.Add(1)
	return fmt.Sprintf("exec-%d-%d", time.Now().UTC().UnixNano(), n)
}

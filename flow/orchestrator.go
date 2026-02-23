package flow

import (
	"context"
	"errors"
	"fmt"
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

// ExecutionRecordStore persists execution records for durable orchestration.
type ExecutionRecordStore[T any] interface {
	Save(ctx context.Context, rec *ExecutionRecord[T]) error
	Load(ctx context.Context, executionID string) (*ExecutionRecord[T], error)
	UpdateStatus(ctx context.Context, executionID, status string) error
	UpdateResult(ctx context.Context, executionID, status, errorCode, errorMessage, currentState string) error
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
}

// NewInMemoryExecutionRecordStore constructs an empty execution record store.
func NewInMemoryExecutionRecordStore[T any]() *InMemoryExecutionRecordStore[T] {
	return &InMemoryExecutionRecordStore[T]{
		records: make(map[string]*ExecutionRecord[T]),
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

func (o *LightweightOrchestrator[T]) OnTransitionLifecycleEvent(ctx context.Context, evt TransitionLifecycleEvent[T]) error {
	if o == nil {
		return errors.New("lightweight orchestrator not configured")
	}
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
	records     ExecutionRecordStore[T]
	intents     LifecycleIntentStore[T]
	scheduler   JobScheduler
	outbox      OutboxStore
	retryPolicy RetryPolicy
	logger      Logger
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
		records:   records,
		intents:   NewInMemoryLifecycleIntentStore[T](),
		scheduler: scheduler,
		outbox:    outbox,
		logger:    normalizeLogger(nil),
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
		Metadata:        copyMap(req.Metadata),
		Msg:             req.Msg,
	}
	if err := o.records.Save(ctx, record); err != nil {
		return nil, err
	}

	fields := mergeFields(copyMap(req.Metadata), map[string]any{
		"machine_id":      record.MachineID,
		"machine_version": record.MachineVersion,
		"entity_id":       record.EntityID,
		"event":           record.Event,
		"transition_id":   record.TransitionID,
		"execution_id":    record.ExecutionID,
	})
	logger := withLoggerFields(o.logger.WithContext(ctx), fields)
	logger.Info("durable execution recorded status=%s", record.Status)

	return &ExecutionHandle{
		ExecutionID: record.ExecutionID,
		Policy:      string(ExecutionPolicyOrchestrated),
		Status:      record.Status,
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

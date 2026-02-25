package flow

import (
	"context"
	"fmt"
	"strings"
	"sync"
	"time"
)

// ExecutionMessage is the scheduler payload boundary used by orchestrators.
type ExecutionMessage struct {
	ID        string
	Topic     string
	Payload   []byte
	Metadata  map[string]any
	CreatedAt time.Time
}

// JobScheduler enqueues execution messages for durable workers.
type JobScheduler interface {
	Enqueue(ctx context.Context, msg *ExecutionMessage) error
	EnqueueAt(ctx context.Context, msg *ExecutionMessage, at time.Time) error
	EnqueueAfter(ctx context.Context, msg *ExecutionMessage, delay time.Duration) error
}

// DeadLetterScope constrains dead-letter inspection queries.
type DeadLetterScope struct {
	MachineID   string
	EntityID    string
	ExecutionID string
	Limit       int
}

// OutboxStore exposes lease/claim/retry operations for dispatch loops.
type OutboxStore interface {
	ClaimPending(ctx context.Context, workerID string, limit int, leaseTTL time.Duration) ([]ClaimedOutboxEntry, error)
	MarkCompleted(ctx context.Context, id, leaseToken string) error
	MarkFailed(ctx context.Context, id, leaseToken string, retryAt time.Time, reason string) error
	MarkDeadLetter(ctx context.Context, id, leaseToken, reason string) error
	ListDeadLetters(ctx context.Context, scope DeadLetterScope) ([]OutboxEntry, error)
	ExtendLease(ctx context.Context, id, leaseToken string, leaseTTL time.Duration) error
}

// DispatchOutcome classifies one dispatch attempt result.
type DispatchOutcome string

const (
	DispatchOutcomeCompleted      DispatchOutcome = "completed"
	DispatchOutcomeRetryScheduled DispatchOutcome = "retry_scheduled"
	DispatchOutcomeDeadLettered   DispatchOutcome = "dead_lettered"
)

// DispatchEntryResult captures one outbox entry dispatch result.
type DispatchEntryResult struct {
	OutboxID     string
	ExecutionID  string
	EntityID     string
	TransitionID string
	Event        string
	Attempt      int
	Outcome      DispatchOutcome
	RetryAt      time.Time
	Error        string
	OccurredAt   time.Time
	Metadata     map[string]any
}

// DispatchReport summarizes one dispatcher cycle.
type DispatchReport struct {
	WorkerID   string
	Claimed    int
	Processed  int
	Lag        time.Duration
	StartedAt  time.Time
	FinishedAt time.Time
	Outcomes   []DispatchEntryResult
}

// DispatchRetryOwner defines who owns retry/backoff decisions.
type DispatchRetryOwner string

const (
	DispatchRetryOwnerDispatcher DispatchRetryOwner = "dispatcher"
	DispatchRetryOwnerExternal   DispatchRetryOwner = "external"
)

func normalizeDispatchRetryOwner(owner DispatchRetryOwner) DispatchRetryOwner {
	owner = DispatchRetryOwner(strings.ToLower(strings.TrimSpace(string(owner))))
	switch owner {
	case DispatchRetryOwnerDispatcher, DispatchRetryOwnerExternal:
		return owner
	default:
		return DispatchRetryOwnerDispatcher
	}
}

// DispatcherRuntimeState tracks lifecycle of the background dispatch runner.
type DispatcherRuntimeState string

const (
	DispatcherRuntimeStateIdle     DispatcherRuntimeState = "idle"
	DispatcherRuntimeStateRunning  DispatcherRuntimeState = "running"
	DispatcherRuntimeStateStopping DispatcherRuntimeState = "stopping"
	DispatcherRuntimeStateStopped  DispatcherRuntimeState = "stopped"
)

// DispatcherRuntimeStatus captures the latest runtime state and cycle metrics.
type DispatcherRuntimeStatus struct {
	WorkerID            string
	State               DispatcherRuntimeState
	LastRunAt           time.Time
	LastSuccessAt       time.Time
	LastError           string
	ConsecutiveFailures int
	LastClaimed         int
	LastProcessed       int
	LastLag             time.Duration
}

// DispatcherHealth reports health derived from runtime status.
type DispatcherHealth struct {
	Healthy bool
	Reason  string
	Status  DispatcherRuntimeStatus
}

// DispatcherRuntime exposes managed dispatcher execution controls.
type DispatcherRuntime interface {
	Run(ctx context.Context) error
	RunOnce(ctx context.Context) (DispatchReport, error)
	Stop(ctx context.Context) error
	Status() DispatcherRuntimeStatus
	Health(ctx context.Context) DispatcherHealth
}

// DispatcherMetrics captures observability events for dispatch runtime behavior.
type DispatcherMetrics interface {
	RecordDispatchLag(duration time.Duration)
	RecordDispatchOutcome(outcome DispatchOutcome)
	RecordRetryAttempt(attempt int)
	RecordOrchestrationDegraded(reason string)
}

type noopDispatcherMetrics struct{}

func (noopDispatcherMetrics) RecordDispatchLag(time.Duration)       {}
func (noopDispatcherMetrics) RecordDispatchOutcome(DispatchOutcome) {}
func (noopDispatcherMetrics) RecordRetryAttempt(int)                {}
func (noopDispatcherMetrics) RecordOrchestrationDegraded(string)    {}

// OutboxDispatcher publishes pending outbox entries to a scheduler.
type OutboxDispatcher struct {
	store         OutboxStore
	scheduler     JobScheduler
	workerID      string
	limit         int
	leaseDuration time.Duration
	retryDelay    time.Duration
	retryOwner    DispatchRetryOwner
	maxAttempts   int
	runInterval   time.Duration
	backoff       func(attempt int, baseDelay time.Duration) time.Duration
	logger        Logger
	metrics       DispatcherMetrics
	now           func() time.Time

	statusHook  func(context.Context, DispatcherRuntimeStatus)
	healthHook  func(context.Context, DispatcherHealth)
	outcomeHook func(context.Context, DispatchEntryResult)

	stateMu sync.RWMutex
	status  DispatcherRuntimeStatus

	runMu     sync.Mutex
	runCancel context.CancelFunc
	runDone   chan struct{}
	running   bool
}

// OutboxDispatcherOption customizes dispatcher behavior.
type OutboxDispatcherOption func(*OutboxDispatcher)

// WithOutboxWorkerID overrides the worker identifier used by ClaimPending.
func WithOutboxWorkerID(workerID string) OutboxDispatcherOption {
	return func(d *OutboxDispatcher) {
		d.workerID = strings.TrimSpace(workerID)
	}
}

// WithOutboxLimit sets the max entries claimed per dispatch call.
func WithOutboxLimit(limit int) OutboxDispatcherOption {
	return func(d *OutboxDispatcher) {
		if limit > 0 {
			d.limit = limit
		}
	}
}

// WithOutboxLeaseDuration sets lease expiration for claimed entries.
func WithOutboxLeaseDuration(dur time.Duration) OutboxDispatcherOption {
	return func(d *OutboxDispatcher) {
		if dur > 0 {
			d.leaseDuration = dur
		}
	}
}

// WithOutboxRetryDelay sets retry schedule for failed dispatches.
func WithOutboxRetryDelay(delay time.Duration) OutboxDispatcherOption {
	return func(d *OutboxDispatcher) {
		if delay > 0 {
			d.retryDelay = delay
		}
	}
}

// WithOutboxRetryOwner configures single-owner retry/backoff authority.
func WithOutboxRetryOwner(owner DispatchRetryOwner) OutboxDispatcherOption {
	return func(d *OutboxDispatcher) {
		d.retryOwner = normalizeDispatchRetryOwner(owner)
	}
}

// WithOutboxMaxAttempts sets the terminal-attempt threshold before dead-lettering.
func WithOutboxMaxAttempts(maxAttempts int) OutboxDispatcherOption {
	return func(d *OutboxDispatcher) {
		if maxAttempts > 0 {
			d.maxAttempts = maxAttempts
		}
	}
}

// WithOutboxRunInterval sets background runner poll cadence.
func WithOutboxRunInterval(interval time.Duration) OutboxDispatcherOption {
	return func(d *OutboxDispatcher) {
		if interval > 0 {
			d.runInterval = interval
		}
	}
}

// WithOutboxBackoff customizes retry schedule per attempt.
func WithOutboxBackoff(fn func(attempt int, baseDelay time.Duration) time.Duration) OutboxDispatcherOption {
	return func(d *OutboxDispatcher) {
		if fn != nil {
			d.backoff = fn
		}
	}
}

// WithOutboxLogger configures dispatcher logging.
func WithOutboxLogger(logger Logger) OutboxDispatcherOption {
	return func(d *OutboxDispatcher) {
		d.logger = normalizeLogger(logger)
	}
}

// WithOutboxMetrics configures dispatcher metrics recording hooks.
func WithOutboxMetrics(metrics DispatcherMetrics) OutboxDispatcherOption {
	return func(d *OutboxDispatcher) {
		d.metrics = metrics
	}
}

// WithOutboxStatusHook receives runtime status updates.
func WithOutboxStatusHook(hook func(context.Context, DispatcherRuntimeStatus)) OutboxDispatcherOption {
	return func(d *OutboxDispatcher) {
		d.statusHook = hook
	}
}

// WithOutboxHealthHook receives health snapshots after each cycle.
func WithOutboxHealthHook(hook func(context.Context, DispatcherHealth)) OutboxDispatcherOption {
	return func(d *OutboxDispatcher) {
		d.healthHook = hook
	}
}

// WithOutboxOutcomeHook receives one callback per classified dispatch outcome.
func WithOutboxOutcomeHook(hook func(context.Context, DispatchEntryResult)) OutboxDispatcherOption {
	return func(d *OutboxDispatcher) {
		d.outcomeHook = hook
	}
}

// NewOutboxDispatcher constructs a dispatcher for durable outbox processing.
func NewOutboxDispatcher(
	store OutboxStore,
	scheduler JobScheduler,
	opts ...OutboxDispatcherOption,
) *OutboxDispatcher {
	d := &OutboxDispatcher{
		store:         store,
		scheduler:     scheduler,
		workerID:      "outbox-worker-1",
		limit:         100,
		leaseDuration: 30 * time.Second,
		retryDelay:    5 * time.Second,
		retryOwner:    DispatchRetryOwnerDispatcher,
		maxAttempts:   3,
		runInterval:   500 * time.Millisecond,
		backoff: func(attempt int, baseDelay time.Duration) time.Duration {
			if attempt <= 1 {
				return baseDelay
			}
			return time.Duration(attempt) * baseDelay
		},
		logger:  normalizeLogger(nil),
		metrics: noopDispatcherMetrics{},
		now:     func() time.Time { return time.Now().UTC() },
		status: DispatcherRuntimeStatus{
			WorkerID: "outbox-worker-1",
			State:    DispatcherRuntimeStateIdle,
		},
	}
	for _, opt := range opts {
		if opt != nil {
			opt(d)
		}
	}
	d.logger = normalizeLogger(d.logger)
	if d.metrics == nil {
		d.metrics = noopDispatcherMetrics{}
	}
	d.retryOwner = normalizeDispatchRetryOwner(d.retryOwner)
	d.status.WorkerID = d.workerID
	if d.backoff == nil {
		d.backoff = func(_ int, baseDelay time.Duration) time.Duration { return baseDelay }
	}
	return d
}

// DispatchPending claims pending entries and enqueues them into the scheduler.
func (d *OutboxDispatcher) DispatchPending(ctx context.Context) (int, error) {
	report, err := d.RunOnce(ctx)
	return report.Processed, err
}

// Run starts continuous dispatch polling until context cancellation or Stop.
func (d *OutboxDispatcher) Run(ctx context.Context) error {
	if d == nil {
		return fmt.Errorf("outbox dispatcher not configured")
	}
	if err := d.validate(); err != nil {
		return err
	}
	if ctx == nil {
		ctx = context.Background()
	}

	d.runMu.Lock()
	if d.running {
		d.runMu.Unlock()
		return fmt.Errorf("outbox dispatcher already running")
	}
	runCtx, cancel := context.WithCancel(ctx)
	runDone := make(chan struct{})
	d.runCancel = cancel
	d.runDone = runDone
	d.running = true
	d.runMu.Unlock()

	d.setRuntimeState(runCtx, DispatcherRuntimeStateRunning)
	logger := withLoggerFields(d.logger.WithContext(runCtx), map[string]any{"worker_id": d.workerID})
	logger.Info("outbox dispatcher runner started")

	defer func() {
		d.runMu.Lock()
		d.running = false
		d.runCancel = nil
		d.runDone = nil
		close(runDone)
		d.runMu.Unlock()
		d.setRuntimeState(context.Background(), DispatcherRuntimeStateStopped)
		logger.Info("outbox dispatcher runner stopped")
	}()

	ticker := time.NewTicker(d.runInterval)
	defer ticker.Stop()

	for {
		_, runErr := d.RunOnce(runCtx)
		if runErr != nil {
			logger.Warn("outbox dispatcher cycle failed: %v", runErr)
		}
		select {
		case <-runCtx.Done():
			return nil
		case <-ticker.C:
		}
	}
}

// RunOnce executes one claim/enqueue/ack cycle and classifies outcomes.
func (d *OutboxDispatcher) RunOnce(ctx context.Context) (DispatchReport, error) {
	report := DispatchReport{}
	if d == nil {
		return report, fmt.Errorf("outbox dispatcher not configured")
	}
	if err := d.validate(); err != nil {
		return report, err
	}
	if ctx == nil {
		ctx = context.Background()
	}

	now := d.now().UTC()
	report.WorkerID = d.workerID
	report.StartedAt = now

	entries, err := d.store.ClaimPending(ctx, d.workerID, d.limit, d.leaseDuration)
	if err != nil {
		report.FinishedAt = d.now().UTC()
		d.recordCycle(ctx, report, err)
		return report, err
	}
	report.Claimed = len(entries)
	if lag, ok := outboxLag(entries, now); ok {
		report.Lag = lag
		d.metrics.RecordDispatchLag(lag)
	}
	if len(entries) == 0 {
		report.FinishedAt = d.now().UTC()
		d.recordCycle(ctx, report, nil)
		return report, nil
	}

	var dispatchErr error
	for _, claimed := range entries {
		entry := claimed.OutboxEntry
		result := DispatchEntryResult{
			OutboxID:     strings.TrimSpace(entry.ID),
			ExecutionID:  strings.TrimSpace(entry.ExecutionID),
			EntityID:     strings.TrimSpace(entry.EntityID),
			TransitionID: strings.TrimSpace(entry.TransitionID),
			Event:        normalizeEvent(entry.Event),
			Attempt:      claimed.Attempts,
			OccurredAt:   d.now().UTC(),
			Metadata:     copyMap(entry.Metadata),
		}

		fields := mergeFields(copyMap(entry.Metadata), map[string]any{
			"outbox_id":        entry.ID,
			"entity_id":        entry.EntityID,
			"event":            entry.Event,
			"transition_id":    entry.TransitionID,
			"execution_id":     entry.ExecutionID,
			"lease_token":      claimed.LeaseToken,
			"dispatch_attempt": claimed.Attempts,
		})
		logger := withLoggerFields(d.logger.WithContext(ctx), fields)

		msg, msgErr := outboxEntryToExecutionMessage(entry)
		if msgErr != nil {
			classified, classErr := d.handleDispatchFailure(ctx, claimed, msgErr)
			logger.Error("outbox payload serialization failed: %v", msgErr)
			result = mergeDispatchResult(result, classified)
			report.Outcomes = append(report.Outcomes, result)
			d.emitOutcome(ctx, result)
			if classErr != nil {
				dispatchErr = classErr
			} else if dispatchErr == nil {
				dispatchErr = msgErr
			}
			continue
		}

		enqueueErr := d.enqueueEntry(ctx, msg, entry)
		if enqueueErr != nil {
			classified, classErr := d.handleDispatchFailure(ctx, claimed, enqueueErr)
			logger.Warn("outbox enqueue failed: %v", enqueueErr)
			result = mergeDispatchResult(result, classified)
			report.Outcomes = append(report.Outcomes, result)
			d.emitOutcome(ctx, result)
			if classErr != nil {
				dispatchErr = classErr
			} else if dispatchErr == nil {
				dispatchErr = enqueueErr
			}
			continue
		}

		if err := d.store.MarkCompleted(ctx, entry.ID, claimed.LeaseToken); err != nil {
			logger.Error("outbox mark completed failed: %v", err)
			classified, classErr := d.handleDispatchFailure(ctx, claimed, err)
			result = mergeDispatchResult(result, classified)
			report.Outcomes = append(report.Outcomes, result)
			d.emitOutcome(ctx, result)
			if classErr != nil {
				dispatchErr = classErr
			} else if dispatchErr == nil {
				dispatchErr = err
			}
			continue
		}

		result.Outcome = DispatchOutcomeCompleted
		report.Processed++
		report.Outcomes = append(report.Outcomes, result)
		d.emitOutcome(ctx, result)
		d.metrics.RecordDispatchOutcome(DispatchOutcomeCompleted)
	}

	report.FinishedAt = d.now().UTC()
	d.recordCycle(ctx, report, dispatchErr)
	return report, dispatchErr
}

// Stop requests background loop termination and waits for graceful stop.
func (d *OutboxDispatcher) Stop(ctx context.Context) error {
	if d == nil {
		return fmt.Errorf("outbox dispatcher not configured")
	}
	if ctx == nil {
		ctx = context.Background()
	}

	d.runMu.Lock()
	cancel := d.runCancel
	done := d.runDone
	running := d.running
	d.runMu.Unlock()

	if !running || cancel == nil || done == nil {
		d.setRuntimeState(ctx, DispatcherRuntimeStateStopped)
		return nil
	}

	d.setRuntimeState(ctx, DispatcherRuntimeStateStopping)
	cancel()
	select {
	case <-done:
		return nil
	case <-ctx.Done():
		return ctx.Err()
	}
}

// Status returns a copy of the latest runtime status.
func (d *OutboxDispatcher) Status() DispatcherRuntimeStatus {
	if d == nil {
		return DispatcherRuntimeStatus{State: DispatcherRuntimeStateStopped}
	}
	d.stateMu.RLock()
	defer d.stateMu.RUnlock()
	return d.status
}

// Health returns a derived health summary and emits health hooks.
func (d *OutboxDispatcher) Health(ctx context.Context) DispatcherHealth {
	if ctx == nil {
		ctx = context.Background()
	}
	status := d.Status()
	health := DispatcherHealth{
		Healthy: true,
		Status:  status,
	}
	if status.ConsecutiveFailures > 0 {
		health.Healthy = false
		health.Reason = "dispatch failures detected"
	} else if status.State == DispatcherRuntimeStateStopped && !status.LastRunAt.IsZero() {
		health.Healthy = false
		health.Reason = "dispatcher stopped"
	}
	if d.healthHook != nil {
		d.healthHook(ctx, health)
	}
	return health
}

func (d *OutboxDispatcher) handleDispatchFailure(
	ctx context.Context,
	claimed ClaimedOutboxEntry,
	cause error,
) (DispatchEntryResult, error) {
	now := d.now().UTC()
	result := DispatchEntryResult{
		OutboxID:     strings.TrimSpace(claimed.ID),
		ExecutionID:  strings.TrimSpace(claimed.ExecutionID),
		EntityID:     strings.TrimSpace(claimed.EntityID),
		TransitionID: strings.TrimSpace(claimed.TransitionID),
		Event:        normalizeEvent(claimed.Event),
		Attempt:      claimed.Attempts,
		OccurredAt:   now,
		Metadata:     copyMap(claimed.Metadata),
	}
	if cause != nil {
		result.Error = cause.Error()
	}

	shouldDeadLetter := d.retryOwner == DispatchRetryOwnerExternal
	if d.retryOwner == DispatchRetryOwnerDispatcher && d.maxAttempts > 0 && claimed.Attempts >= d.maxAttempts {
		shouldDeadLetter = true
	}

	if shouldDeadLetter {
		result.Outcome = DispatchOutcomeDeadLettered
		err := d.store.MarkDeadLetter(ctx, claimed.ID, claimed.LeaseToken, result.Error)
		d.metrics.RecordDispatchOutcome(DispatchOutcomeDeadLettered)
		d.metrics.RecordOrchestrationDegraded("dead_lettered")
		if err != nil {
			return result, err
		}
		return result, nil
	}

	result.Outcome = DispatchOutcomeRetryScheduled
	delay := d.backoff(claimed.Attempts, d.retryDelay)
	if delay <= 0 {
		delay = d.retryDelay
	}
	retryAt := now.Add(delay)
	result.RetryAt = retryAt
	if err := d.store.MarkFailed(ctx, claimed.ID, claimed.LeaseToken, retryAt, result.Error); err != nil {
		return result, err
	}
	d.metrics.RecordDispatchOutcome(DispatchOutcomeRetryScheduled)
	d.metrics.RecordRetryAttempt(claimed.Attempts)
	d.metrics.RecordOrchestrationDegraded("retry_scheduled")
	return result, nil
}

func (d *OutboxDispatcher) emitOutcome(ctx context.Context, result DispatchEntryResult) {
	if d == nil {
		return
	}
	if d.outcomeHook != nil {
		d.outcomeHook(ctx, result)
	}
}

func (d *OutboxDispatcher) recordCycle(ctx context.Context, report DispatchReport, cycleErr error) {
	if d == nil {
		return
	}
	now := d.now().UTC()
	d.stateMu.Lock()
	status := d.status
	status.WorkerID = d.workerID
	status.LastRunAt = now
	status.LastClaimed = report.Claimed
	status.LastProcessed = report.Processed
	status.LastLag = report.Lag
	if cycleErr == nil {
		status.LastSuccessAt = now
		status.LastError = ""
		status.ConsecutiveFailures = 0
		if status.State == "" {
			status.State = DispatcherRuntimeStateIdle
		}
	} else {
		status.LastError = cycleErr.Error()
		status.ConsecutiveFailures++
		if status.State == "" {
			status.State = DispatcherRuntimeStateIdle
		}
	}
	d.status = status
	d.stateMu.Unlock()

	if d.statusHook != nil {
		d.statusHook(ctx, status)
	}
	_ = d.Health(ctx)
}

func (d *OutboxDispatcher) setRuntimeState(ctx context.Context, state DispatcherRuntimeState) {
	if d == nil {
		return
	}
	d.stateMu.Lock()
	status := d.status
	status.WorkerID = d.workerID
	status.State = state
	d.status = status
	d.stateMu.Unlock()
	if d.statusHook != nil {
		d.statusHook(ctx, status)
	}
}

func (d *OutboxDispatcher) validate() error {
	if d.store == nil {
		return fmt.Errorf("outbox store not configured")
	}
	if d.scheduler == nil {
		return fmt.Errorf("job scheduler not configured")
	}
	if strings.TrimSpace(d.workerID) == "" {
		return fmt.Errorf("outbox worker id required")
	}
	if d.maxAttempts <= 0 {
		return fmt.Errorf("outbox max attempts must be > 0")
	}
	return nil
}

func outboxLag(entries []ClaimedOutboxEntry, now time.Time) (time.Duration, bool) {
	if len(entries) == 0 {
		return 0, false
	}
	var oldest time.Time
	for _, entry := range entries {
		if entry.CreatedAt.IsZero() {
			continue
		}
		ts := entry.CreatedAt.UTC()
		if oldest.IsZero() || ts.Before(oldest) {
			oldest = ts
		}
	}
	if oldest.IsZero() {
		return 0, false
	}
	if now.Before(oldest) {
		return 0, true
	}
	return now.Sub(oldest), true
}

func mergeDispatchResult(base DispatchEntryResult, patch DispatchEntryResult) DispatchEntryResult {
	base.Outcome = patch.Outcome
	if !patch.RetryAt.IsZero() {
		base.RetryAt = patch.RetryAt
	}
	if strings.TrimSpace(patch.Error) != "" {
		base.Error = patch.Error
	}
	if patch.OccurredAt.After(base.OccurredAt) {
		base.OccurredAt = patch.OccurredAt
	}
	if len(patch.Metadata) > 0 {
		base.Metadata = mergeFields(copyMap(base.Metadata), patch.Metadata)
	}
	return base
}

func (d *OutboxDispatcher) enqueueEntry(ctx context.Context, msg *ExecutionMessage, entry OutboxEntry) error {
	now := d.now()
	if !entry.RetryAt.IsZero() && entry.RetryAt.After(now) {
		return d.scheduler.EnqueueAt(ctx, msg, entry.RetryAt)
	}
	if cmd, ok := entry.Effect.(CommandEffect); ok && cmd.Delay > 0 {
		return d.scheduler.EnqueueAfter(ctx, msg, cmd.Delay)
	}
	return d.scheduler.Enqueue(ctx, msg)
}

func outboxEntryToExecutionMessage(entry OutboxEntry) (*ExecutionMessage, error) {
	topic := strings.TrimSpace(entry.Topic)
	if topic == "" {
		topic = "fsm.effect"
	}
	payload := entry.Payload
	if len(payload) == 0 {
		_, encoded, err := marshalEffect(entry.Effect)
		if err != nil {
			return nil, err
		}
		payload = encoded
	}
	return &ExecutionMessage{
		ID:        strings.TrimSpace(entry.ID),
		Topic:     topic,
		Payload:   append([]byte(nil), payload...),
		Metadata:  copyMap(entry.Metadata),
		CreatedAt: time.Now().UTC(),
	}, nil
}

// ScheduledExecutionMessage captures scheduled jobs for in-memory tests.
type ScheduledExecutionMessage struct {
	Message   *ExecutionMessage
	ExecuteAt time.Time
}

// InMemoryJobScheduler stores enqueued messages for inspection/testing.
type InMemoryJobScheduler struct {
	mu        sync.RWMutex
	enqueued  []ScheduledExecutionMessage
	enqueueFn func(*ExecutionMessage) error
}

// NewInMemoryJobScheduler constructs an empty in-memory scheduler.
func NewInMemoryJobScheduler() *InMemoryJobScheduler {
	return &InMemoryJobScheduler{}
}

// SetEnqueueHook sets an optional callback used by enqueue operations.
func (s *InMemoryJobScheduler) SetEnqueueHook(fn func(*ExecutionMessage) error) {
	if s == nil {
		return
	}
	s.mu.Lock()
	defer s.mu.Unlock()
	s.enqueueFn = fn
}

func (s *InMemoryJobScheduler) Enqueue(ctx context.Context, msg *ExecutionMessage) error {
	return s.enqueue(ctx, msg, time.Now().UTC())
}

func (s *InMemoryJobScheduler) EnqueueAt(ctx context.Context, msg *ExecutionMessage, at time.Time) error {
	return s.enqueue(ctx, msg, at.UTC())
}

func (s *InMemoryJobScheduler) EnqueueAfter(ctx context.Context, msg *ExecutionMessage, delay time.Duration) error {
	at := time.Now().UTC()
	if delay > 0 {
		at = at.Add(delay)
	}
	return s.enqueue(ctx, msg, at)
}

func (s *InMemoryJobScheduler) enqueue(ctx context.Context, msg *ExecutionMessage, at time.Time) error {
	if s == nil {
		return fmt.Errorf("in-memory scheduler not configured")
	}
	select {
	case <-ctx.Done():
		return ctx.Err()
	default:
	}
	if msg == nil {
		return fmt.Errorf("execution message required")
	}

	cp := *msg
	cp.Payload = append([]byte(nil), msg.Payload...)
	cp.Metadata = copyMap(msg.Metadata)

	s.mu.Lock()
	defer s.mu.Unlock()
	if s.enqueueFn != nil {
		if err := s.enqueueFn(&cp); err != nil {
			return err
		}
	}
	s.enqueued = append(s.enqueued, ScheduledExecutionMessage{
		Message:   &cp,
		ExecuteAt: at,
	})
	return nil
}

// Messages returns a copy of all enqueued messages.
func (s *InMemoryJobScheduler) Messages() []ScheduledExecutionMessage {
	if s == nil {
		return nil
	}
	s.mu.RLock()
	defer s.mu.RUnlock()
	out := make([]ScheduledExecutionMessage, 0, len(s.enqueued))
	for _, m := range s.enqueued {
		cp := m
		if m.Message != nil {
			msg := *m.Message
			msg.Payload = append([]byte(nil), m.Message.Payload...)
			msg.Metadata = copyMap(m.Message.Metadata)
			cp.Message = &msg
		}
		out = append(out, cp)
	}
	return out
}

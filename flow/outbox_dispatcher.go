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

// OutboxStore exposes lease/claim/retry operations for dispatch loops.
type OutboxStore interface {
	ClaimPending(ctx context.Context, workerID string, limit int, leaseUntil time.Time) ([]OutboxEntry, error)
	MarkCompleted(ctx context.Context, id string) error
	MarkFailed(ctx context.Context, id string, retryAt time.Time, reason string) error
}

// OutboxDispatcher publishes pending outbox entries to a scheduler.
type OutboxDispatcher struct {
	store         OutboxStore
	scheduler     JobScheduler
	workerID      string
	limit         int
	leaseDuration time.Duration
	retryDelay    time.Duration
	logger        Logger
	now           func() time.Time
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

// WithOutboxLogger configures dispatcher logging.
func WithOutboxLogger(logger Logger) OutboxDispatcherOption {
	return func(d *OutboxDispatcher) {
		d.logger = normalizeLogger(logger)
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
		logger:        normalizeLogger(nil),
		now:           func() time.Time { return time.Now().UTC() },
	}
	for _, opt := range opts {
		if opt != nil {
			opt(d)
		}
	}
	d.logger = normalizeLogger(d.logger)
	return d
}

// DispatchPending claims pending entries and enqueues them into the scheduler.
func (d *OutboxDispatcher) DispatchPending(ctx context.Context) (int, error) {
	if d == nil {
		return 0, fmt.Errorf("outbox dispatcher not configured")
	}
	if d.store == nil {
		return 0, fmt.Errorf("outbox store not configured")
	}
	if d.scheduler == nil {
		return 0, fmt.Errorf("job scheduler not configured")
	}
	now := d.now()
	entries, err := d.store.ClaimPending(ctx, d.workerID, d.limit, now.Add(d.leaseDuration))
	if err != nil {
		return 0, err
	}
	if len(entries) == 0 {
		return 0, nil
	}

	processed := 0
	var dispatchErr error
	for _, entry := range entries {
		fields := mergeFields(copyMap(entry.Metadata), map[string]any{
			"outbox_id":     entry.ID,
			"entity_id":     entry.EntityID,
			"event":         entry.Event,
			"transition_id": entry.TransitionID,
			"execution_id":  entry.ExecutionID,
		})
		logger := withLoggerFields(d.logger.WithContext(ctx), fields)

		msg, msgErr := outboxEntryToExecutionMessage(entry)
		if msgErr != nil {
			logger.Error("outbox payload serialization failed: %v", msgErr)
			_ = d.store.MarkFailed(ctx, entry.ID, now.Add(d.retryDelay), msgErr.Error())
			dispatchErr = msgErr
			continue
		}

		enqueueErr := d.enqueueEntry(ctx, msg, entry)
		if enqueueErr != nil {
			logger.Warn("outbox enqueue failed: %v", enqueueErr)
			_ = d.store.MarkFailed(ctx, entry.ID, now.Add(d.retryDelay), enqueueErr.Error())
			dispatchErr = enqueueErr
			continue
		}
		if err := d.store.MarkCompleted(ctx, entry.ID); err != nil {
			logger.Error("outbox mark completed failed: %v", err)
			dispatchErr = err
			continue
		}
		processed++
	}
	return processed, dispatchErr
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

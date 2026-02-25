package flow

import (
	"context"
	"errors"
	"sync/atomic"
	"testing"
	"time"
)

func TestInMemoryOutboxClaimLeaseAndRetry(t *testing.T) {
	store := NewInMemoryStateStore()
	err := store.RunInTransaction(context.Background(), func(tx TxStore) error {
		return tx.AppendOutbox(context.Background(), OutboxEntry{
			ID:       "outbox-1",
			EntityID: "1",
			Event:    "approve",
			Effect:   CommandEffect{ActionID: "mark"},
		})
	})
	if err != nil {
		t.Fatalf("append outbox failed: %v", err)
	}

	claimed, err := store.ClaimPending(context.Background(), "worker-a", 10, time.Minute)
	if err != nil {
		t.Fatalf("claim pending failed: %v", err)
	}
	if len(claimed) != 1 {
		t.Fatalf("expected one claimed entry, got %d", len(claimed))
	}
	if claimed[0].Status != "leased" {
		t.Fatalf("expected leased status, got %s", claimed[0].Status)
	}
	if claimed[0].Attempts != 1 {
		t.Fatalf("expected attempts=1, got %d", claimed[0].Attempts)
	}

	retryAt := time.Now().UTC().Add(20 * time.Millisecond)
	if err := store.MarkFailed(context.Background(), "outbox-1", claimed[0].LeaseToken, retryAt, "boom"); err != nil {
		t.Fatalf("mark failed: %v", err)
	}
	claimed, err = store.ClaimPending(context.Background(), "worker-a", 10, time.Minute)
	if err != nil {
		t.Fatalf("claim pending after failure: %v", err)
	}
	if len(claimed) != 0 {
		t.Fatalf("expected retry gate to block immediate re-claim")
	}

	time.Sleep(30 * time.Millisecond)
	claimed, err = store.ClaimPending(context.Background(), "worker-a", 10, time.Minute)
	if err != nil {
		t.Fatalf("claim pending after retry window: %v", err)
	}
	if len(claimed) != 1 {
		t.Fatalf("expected one claimed retry entry, got %d", len(claimed))
	}

	if err := store.MarkCompleted(context.Background(), "outbox-1", claimed[0].LeaseToken); err != nil {
		t.Fatalf("mark completed failed: %v", err)
	}
	claimed, err = store.ClaimPending(context.Background(), "worker-a", 10, time.Minute)
	if err != nil {
		t.Fatalf("claim pending after completion: %v", err)
	}
	if len(claimed) != 0 {
		t.Fatalf("expected completed entries to be excluded")
	}
}

func TestOutboxDispatcherEnqueueAndRetry(t *testing.T) {
	store := NewInMemoryStateStore()
	err := store.RunInTransaction(context.Background(), func(tx TxStore) error {
		if err := tx.AppendOutbox(context.Background(), OutboxEntry{
			ID:       "outbox-ok",
			EntityID: "1",
			Event:    "approve",
			Effect:   CommandEffect{ActionID: "ok"},
		}); err != nil {
			return err
		}
		if err := tx.AppendOutbox(context.Background(), OutboxEntry{
			ID:       "outbox-fail",
			EntityID: "1",
			Event:    "approve",
			Effect:   CommandEffect{ActionID: "fail"},
		}); err != nil {
			return err
		}
		return nil
	})
	if err != nil {
		t.Fatalf("append outbox failed: %v", err)
	}

	scheduler := NewInMemoryJobScheduler()
	failCount := 0
	scheduler.SetEnqueueHook(func(msg *ExecutionMessage) error {
		if msg == nil {
			return errors.New("missing message")
		}
		if msg.ID == "outbox-fail" && failCount == 0 {
			failCount++
			return errors.New("simulated enqueue failure")
		}
		return nil
	})

	dispatcher := NewOutboxDispatcher(
		store,
		scheduler,
		WithOutboxWorkerID("worker-1"),
		WithOutboxRetryDelay(50*time.Millisecond),
	)
	processed, dispatchErr := dispatcher.DispatchPending(context.Background())
	if processed != 1 {
		t.Fatalf("expected one successful dispatch on first pass, got %d", processed)
	}
	if dispatchErr == nil {
		t.Fatalf("expected first pass dispatch error due to simulated failure")
	}

	entries := store.OutboxEntries()
	var pendingRetry *OutboxEntry
	var completed int
	for _, entry := range entries {
		if entry.Status == "completed" {
			completed++
			continue
		}
		if entry.ID == "outbox-fail" {
			e := entry
			pendingRetry = &e
		}
	}
	if completed != 1 {
		t.Fatalf("expected one completed entry after first pass, got %d", completed)
	}
	if pendingRetry == nil {
		t.Fatalf("expected failed entry to remain pending for retry")
	}

	time.Sleep(60 * time.Millisecond)
	processed, dispatchErr = dispatcher.DispatchPending(context.Background())
	if dispatchErr != nil {
		t.Fatalf("second dispatch should succeed: %v", dispatchErr)
	}
	if processed != 1 {
		t.Fatalf("expected one processed retry entry, got %d", processed)
	}

	msgs := scheduler.Messages()
	if len(msgs) < 2 {
		t.Fatalf("expected two scheduled messages, got %d", len(msgs))
	}
}

func TestOutboxDispatcherDeadLetterClassification(t *testing.T) {
	store := NewInMemoryStateStore()
	err := store.RunInTransaction(context.Background(), func(tx TxStore) error {
		return tx.AppendOutbox(context.Background(), OutboxEntry{
			ID:          "outbox-dead",
			EntityID:    "1",
			ExecutionID: "exec-1",
			Event:       "approve",
			Effect:      CommandEffect{ActionID: "fail"},
		})
	})
	if err != nil {
		t.Fatalf("append outbox failed: %v", err)
	}

	scheduler := NewInMemoryJobScheduler()
	scheduler.SetEnqueueHook(func(*ExecutionMessage) error {
		return errors.New("always fail enqueue")
	})

	dispatcher := NewOutboxDispatcher(
		store,
		scheduler,
		WithOutboxMaxAttempts(1),
		WithOutboxRetryDelay(10*time.Millisecond),
	)
	report, runErr := dispatcher.RunOnce(context.Background())
	if runErr == nil {
		t.Fatalf("expected dispatch error")
	}
	if report.Claimed != 1 {
		t.Fatalf("expected claimed=1, got %d", report.Claimed)
	}
	if len(report.Outcomes) != 1 {
		t.Fatalf("expected one outcome, got %d", len(report.Outcomes))
	}
	if report.Outcomes[0].Outcome != DispatchOutcomeDeadLettered {
		t.Fatalf("expected dead_lettered outcome, got %s", report.Outcomes[0].Outcome)
	}

	dead, err := store.ListDeadLetters(context.Background(), DeadLetterScope{ExecutionID: "exec-1"})
	if err != nil {
		t.Fatalf("list dead letters failed: %v", err)
	}
	if len(dead) != 1 {
		t.Fatalf("expected one dead letter entry, got %d", len(dead))
	}
	if dead[0].Status != "dead_lettered" {
		t.Fatalf("expected dead_lettered status, got %s", dead[0].Status)
	}
}

func TestOutboxDispatcherRunStopStatusHealthHooksAndMetrics(t *testing.T) {
	store := NewInMemoryStateStore()
	err := store.RunInTransaction(context.Background(), func(tx TxStore) error {
		return tx.AppendOutbox(context.Background(), OutboxEntry{
			ID:       "outbox-runner",
			EntityID: "1",
			Event:    "approve",
			Effect:   CommandEffect{ActionID: "ok"},
		})
	})
	if err != nil {
		t.Fatalf("append outbox failed: %v", err)
	}

	metrics := &captureDispatcherMetrics{}
	var statusCalls atomic.Int32
	var healthCalls atomic.Int32
	dispatcher := NewOutboxDispatcher(
		store,
		NewInMemoryJobScheduler(),
		WithOutboxRunInterval(5*time.Millisecond),
		WithOutboxStatusHook(func(context.Context, DispatcherRuntimeStatus) {
			statusCalls.Add(1)
		}),
		WithOutboxHealthHook(func(context.Context, DispatcherHealth) {
			healthCalls.Add(1)
		}),
		WithOutboxMetrics(metrics),
	)

	done := make(chan error, 1)
	go func() {
		done <- dispatcher.Run(context.Background())
	}()
	time.Sleep(20 * time.Millisecond)
	if err := dispatcher.Stop(context.Background()); err != nil {
		t.Fatalf("stop dispatcher failed: %v", err)
	}
	select {
	case runErr := <-done:
		if runErr != nil {
			t.Fatalf("run returned error: %v", runErr)
		}
	case <-time.After(time.Second):
		t.Fatalf("dispatcher run did not stop")
	}

	status := dispatcher.Status()
	if status.State != DispatcherRuntimeStateStopped {
		t.Fatalf("expected stopped state, got %s", status.State)
	}
	if statusCalls.Load() == 0 {
		t.Fatalf("expected status hook calls")
	}
	if healthCalls.Load() == 0 {
		t.Fatalf("expected health hook calls")
	}
	if metrics.outcomes.Load() == 0 {
		t.Fatalf("expected dispatch outcome metrics")
	}
}

type captureDispatcherMetrics struct {
	lagEvents    atomic.Int32
	outcomes     atomic.Int32
	retries      atomic.Int32
	degradations atomic.Int32
}

func (m *captureDispatcherMetrics) RecordDispatchLag(time.Duration) {
	m.lagEvents.Add(1)
}

func (m *captureDispatcherMetrics) RecordDispatchOutcome(DispatchOutcome) {
	m.outcomes.Add(1)
}

func (m *captureDispatcherMetrics) RecordRetryAttempt(int) {
	m.retries.Add(1)
}

func (m *captureDispatcherMetrics) RecordOrchestrationDegraded(string) {
	m.degradations.Add(1)
}

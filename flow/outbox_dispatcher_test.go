package flow

import (
	"context"
	"errors"
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

	claimed, err := store.ClaimPending(context.Background(), "worker-a", 10, time.Now().UTC().Add(time.Minute))
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

	retryAt := time.Now().UTC().Add(2 * time.Minute)
	if err := store.MarkFailed(context.Background(), "outbox-1", retryAt, "boom"); err != nil {
		t.Fatalf("mark failed: %v", err)
	}
	claimed, err = store.ClaimPending(context.Background(), "worker-a", 10, time.Now().UTC().Add(time.Minute))
	if err != nil {
		t.Fatalf("claim pending after failure: %v", err)
	}
	if len(claimed) != 0 {
		t.Fatalf("expected retry gate to block immediate re-claim")
	}

	if err := store.MarkFailed(context.Background(), "outbox-1", time.Now().UTC().Add(-time.Second), "retry-now"); err != nil {
		t.Fatalf("mark failed for immediate retry: %v", err)
	}
	claimed, err = store.ClaimPending(context.Background(), "worker-a", 10, time.Now().UTC().Add(time.Minute))
	if err != nil {
		t.Fatalf("claim pending after retry window: %v", err)
	}
	if len(claimed) != 1 {
		t.Fatalf("expected one claimed retry entry, got %d", len(claimed))
	}

	if err := store.MarkCompleted(context.Background(), "outbox-1"); err != nil {
		t.Fatalf("mark completed failed: %v", err)
	}
	claimed, err = store.ClaimPending(context.Background(), "worker-a", 10, time.Now().UTC().Add(time.Minute))
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

	if err := store.MarkFailed(context.Background(), "outbox-fail", time.Now().UTC().Add(-time.Millisecond), "retry-now"); err != nil {
		t.Fatalf("force retry window open: %v", err)
	}
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

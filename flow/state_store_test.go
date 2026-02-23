package flow

import (
	"context"
	"errors"
	"sync"
	"testing"
	"time"
)

var (
	_ OutboxStore = (*InMemoryStateStore)(nil)
	_ OutboxStore = (*SQLiteStateStore)(nil)
	_ OutboxStore = (*RedisStateStore)(nil)
)

func TestInMemoryStateStoreSaveIfVersionAndConflict(t *testing.T) {
	store := NewInMemoryStateStore()

	v1, err := store.SaveIfVersion(context.Background(), &StateRecord{EntityID: "1", State: "draft"}, 0)
	if err != nil {
		t.Fatalf("initial save failed: %v", err)
	}
	if v1 != 1 {
		t.Fatalf("expected version 1, got %d", v1)
	}

	if _, err := store.SaveIfVersion(context.Background(), &StateRecord{EntityID: "1", State: "approved"}, 0); !errors.Is(err, ErrStateVersionConflict) {
		t.Fatalf("expected version conflict, got %v", err)
	}

	v2, err := store.SaveIfVersion(context.Background(), &StateRecord{EntityID: "1", State: "approved"}, 1)
	if err != nil {
		t.Fatalf("save with version 1 failed: %v", err)
	}
	if v2 != 2 {
		t.Fatalf("expected version 2, got %d", v2)
	}
}

func TestInMemoryStateStoreRunInTransactionRollback(t *testing.T) {
	store := NewInMemoryStateStore()

	err := store.RunInTransaction(context.Background(), func(tx TxStore) error {
		if _, err := tx.SaveIfVersion(context.Background(), &StateRecord{EntityID: "1", State: "draft"}, 0); err != nil {
			return err
		}
		if err := tx.AppendOutbox(context.Background(), OutboxEntry{EntityID: "1", Event: "approve"}); err != nil {
			return err
		}
		return errors.New("boom")
	})
	if err == nil {
		t.Fatalf("expected transaction error")
	}

	rec, err := store.Load(context.Background(), "1")
	if err != nil {
		t.Fatalf("load failed: %v", err)
	}
	if rec != nil {
		t.Fatalf("expected rollback to discard state")
	}
	if len(store.OutboxEntries()) != 0 {
		t.Fatalf("expected rollback to discard outbox entries")
	}
}

func TestInMemoryStateStoreConcurrentCompareAndSet(t *testing.T) {
	store := NewInMemoryStateStore()
	if _, err := store.SaveIfVersion(context.Background(), &StateRecord{EntityID: "1", State: "draft"}, 0); err != nil {
		t.Fatalf("seed state failed: %v", err)
	}

	var wg sync.WaitGroup
	wg.Add(2)
	errs := make(chan error, 2)
	attempt := func() {
		defer wg.Done()
		_, err := store.SaveIfVersion(context.Background(), &StateRecord{EntityID: "1", State: "approved"}, 1)
		errs <- err
	}
	go attempt()
	go attempt()
	wg.Wait()
	close(errs)

	success := 0
	conflicts := 0
	for err := range errs {
		switch {
		case err == nil:
			success++
		case errors.Is(err, ErrStateVersionConflict):
			conflicts++
		default:
			t.Fatalf("unexpected error: %v", err)
		}
	}

	if success != 1 || conflicts != 1 {
		t.Fatalf("expected one success and one conflict, success=%d conflicts=%d", success, conflicts)
	}
}

func TestRedisStateStoreOutboxClaimLeaseAndRetry(t *testing.T) {
	store := NewRedisStateStore(newMockRedisClient(), time.Minute)
	err := store.RunInTransaction(context.Background(), func(tx TxStore) error {
		return tx.AppendOutbox(context.Background(), OutboxEntry{
			ID:       "outbox-redis-1",
			EntityID: "1",
			Event:    "approve",
			Effect:   CommandEffect{ActionID: "mark"},
		})
	})
	if err != nil {
		t.Fatalf("append outbox failed: %v", err)
	}

	claimed, err := store.ClaimPending(context.Background(), "worker-r", 10, time.Now().UTC().Add(time.Minute))
	if err != nil {
		t.Fatalf("claim pending failed: %v", err)
	}
	if len(claimed) != 1 {
		t.Fatalf("expected one claimed entry, got %d", len(claimed))
	}
	if claimed[0].Status != "leased" {
		t.Fatalf("expected leased status, got %s", claimed[0].Status)
	}

	retryAt := time.Now().UTC().Add(30 * time.Second)
	if err := store.MarkFailed(context.Background(), "outbox-redis-1", retryAt, "boom"); err != nil {
		t.Fatalf("mark failed: %v", err)
	}
	claimed, err = store.ClaimPending(context.Background(), "worker-r", 10, time.Now().UTC().Add(time.Minute))
	if err != nil {
		t.Fatalf("claim pending after failure failed: %v", err)
	}
	if len(claimed) != 0 {
		t.Fatalf("expected retry gate to block immediate claim")
	}

	if err := store.MarkFailed(context.Background(), "outbox-redis-1", time.Now().UTC().Add(-time.Second), "retry-now"); err != nil {
		t.Fatalf("mark failed retry-now: %v", err)
	}
	claimed, err = store.ClaimPending(context.Background(), "worker-r", 10, time.Now().UTC().Add(time.Minute))
	if err != nil {
		t.Fatalf("claim pending retry window failed: %v", err)
	}
	if len(claimed) != 1 {
		t.Fatalf("expected one re-claimed entry, got %d", len(claimed))
	}

	if err := store.MarkCompleted(context.Background(), "outbox-redis-1"); err != nil {
		t.Fatalf("mark completed failed: %v", err)
	}
	claimed, err = store.ClaimPending(context.Background(), "worker-r", 10, time.Now().UTC().Add(time.Minute))
	if err != nil {
		t.Fatalf("claim after completion failed: %v", err)
	}
	if len(claimed) != 0 {
		t.Fatalf("expected completed outbox to be excluded")
	}
}

type mockRedisClient struct {
	mu    sync.RWMutex
	store map[string]string
}

func newMockRedisClient() *mockRedisClient {
	return &mockRedisClient{store: make(map[string]string)}
}

func (m *mockRedisClient) Get(_ context.Context, key string) (string, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	return m.store[key], nil
}

func (m *mockRedisClient) Set(_ context.Context, key string, value interface{}, _ time.Duration) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	if value == nil {
		delete(m.store, key)
		return nil
	}
	if str, ok := value.(string); ok {
		m.store[key] = str
		return nil
	}
	return errors.New("mock redis expects string value")
}

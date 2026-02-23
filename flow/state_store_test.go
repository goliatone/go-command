package flow

import (
	"context"
	"errors"
	"sync"
	"testing"
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

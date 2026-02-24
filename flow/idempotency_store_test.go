package flow

import (
	"context"
	"errors"
	"testing"
)

func TestInMemoryIdempotencyStoreSaveLoadAndDuplicate(t *testing.T) {
	store := NewInMemoryIdempotencyStore[smMsg]()
	scope := IdempotencyScope{
		MachineID:      "order",
		EntityID:       "entity-1",
		Event:          "approve",
		IdempotencyKey: "idem-1",
	}
	record := &IdempotencyRecord[smMsg]{
		Scope:       scope,
		RequestHash: "hash-1",
		Response: &ApplyEventResponse[smMsg]{
			EventID: "evt-1",
			Version: 1,
			Transition: &TransitionResult[smMsg]{
				PreviousState: "draft",
				CurrentState:  "approved",
			},
		},
	}

	if err := store.Save(context.Background(), record); err != nil {
		t.Fatalf("save record failed: %v", err)
	}
	loaded, err := store.Load(context.Background(), scope)
	if err != nil {
		t.Fatalf("load record failed: %v", err)
	}
	if loaded == nil {
		t.Fatalf("expected idempotency record")
	}
	if loaded.RequestHash != "hash-1" {
		t.Fatalf("expected hash-1, got %q", loaded.RequestHash)
	}
	if loaded.Response == nil || loaded.Response.EventID != "evt-1" {
		t.Fatalf("expected response replay payload")
	}

	if err := store.Save(context.Background(), record); !errors.Is(err, ErrIdempotencyRecordExists) {
		t.Fatalf("expected duplicate record error, got %v", err)
	}
}

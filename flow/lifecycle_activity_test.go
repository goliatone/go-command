package flow

import (
	"context"
	"errors"
	"testing"
	"time"
)

func TestBuildLifecycleActivityEnvelopeCanonicalMapping(t *testing.T) {
	occurredAt := time.Date(2026, time.February, 24, 10, 0, 0, 0, time.UTC)
	sourceMeta := map[string]any{"custom": "value"}
	evt := TransitionLifecycleEvent[struct{}]{
		Phase:           TransitionPhaseCommitted,
		MachineID:       "orders",
		MachineVersion:  "v2",
		EntityID:        "order-1",
		ExecutionID:     "exec-1",
		Event:           "approve",
		TransitionID:    "draft::approve",
		PreviousState:   "draft",
		CurrentState:    "approved",
		ExpectedState:   "draft",
		ExpectedVersion: 2,
		ErrorCode:       "FLOW_ERR_NONE",
		ExecCtx: ExecutionContext{
			ActorID: "user-1",
			Roles:   []string{"admin"},
			Tenant:  "tenant-1",
		},
		Metadata:   sourceMeta,
		OccurredAt: occurredAt,
	}

	envelope := BuildLifecycleActivityEnvelope(evt)

	if envelope.Channel != LifecycleActivityChannelFSM {
		t.Fatalf("expected channel %s, got %s", LifecycleActivityChannelFSM, envelope.Channel)
	}
	if envelope.Verb != "fsm.transition.committed" {
		t.Fatalf("expected committed verb, got %s", envelope.Verb)
	}
	if envelope.ObjectType != LifecycleActivityObjectTypeMachine {
		t.Fatalf("expected object type %s, got %s", LifecycleActivityObjectTypeMachine, envelope.ObjectType)
	}
	if envelope.ObjectID != "order-1" {
		t.Fatalf("expected object id order-1, got %s", envelope.ObjectID)
	}
	if envelope.ActorID != "user-1" {
		t.Fatalf("expected actor id user-1, got %s", envelope.ActorID)
	}
	if envelope.TenantID != "tenant-1" {
		t.Fatalf("expected tenant id tenant-1, got %s", envelope.TenantID)
	}
	if !envelope.OccurredAt.Equal(occurredAt) {
		t.Fatalf("expected occurred_at %s, got %s", occurredAt, envelope.OccurredAt)
	}

	for _, key := range []string{
		"machine_id",
		"machine_version",
		"entity_id",
		"execution_id",
		"event",
		"transition_id",
		"from_state",
		"to_state",
		"expected_state",
		"expected_version",
		"phase",
		"actor_id",
		"tenant",
	} {
		if _, ok := envelope.Metadata[key]; !ok {
			t.Fatalf("expected metadata key %s", key)
		}
	}
	if envelope.Metadata["custom"] != "value" {
		t.Fatalf("expected custom metadata passthrough")
	}

	envelope.Metadata["custom"] = "mutated"
	if sourceMeta["custom"] != "value" {
		t.Fatalf("expected source metadata to remain copy-on-write")
	}
}

func TestBuildLifecycleActivityEnvelopeUnknownPhase(t *testing.T) {
	envelope := BuildLifecycleActivityEnvelope(TransitionLifecycleEvent[struct{}]{
		Phase:    TransitionPhase("mystery"),
		EntityID: "entity-1",
	})
	if envelope.Verb != "fsm.transition.unknown" {
		t.Fatalf("expected unknown phase verb, got %s", envelope.Verb)
	}
}

func TestLifecycleActivityHookNotify(t *testing.T) {
	var called bool
	hook := &LifecycleActivityHook[struct{}]{
		Sink: LifecycleActivitySinkFunc(func(_ context.Context, envelope LifecycleActivityEnvelope) error {
			called = true
			if envelope.Verb != "fsm.transition.attempted" {
				t.Fatalf("unexpected verb %s", envelope.Verb)
			}
			return nil
		}),
	}

	err := hook.Notify(context.Background(), TransitionLifecycleEvent[struct{}]{
		Phase:    TransitionPhaseAttempted,
		EntityID: "entity-1",
	})
	if err != nil {
		t.Fatalf("notify failed: %v", err)
	}
	if !called {
		t.Fatalf("expected sink call")
	}
}

func TestLifecycleActivityHookNotifyPropagatesErrors(t *testing.T) {
	hook := &LifecycleActivityHook[struct{}]{
		Sink: LifecycleActivitySinkFunc(func(context.Context, LifecycleActivityEnvelope) error {
			return errors.New("sink failed")
		}),
	}
	err := hook.Notify(context.Background(), TransitionLifecycleEvent[struct{}]{EntityID: "entity-1"})
	if err == nil || err.Error() != "sink failed" {
		t.Fatalf("expected sink error, got %v", err)
	}
}

func TestLifecycleActivityHookNilSinkIsNoop(t *testing.T) {
	hook := &LifecycleActivityHook[struct{}]{}
	if err := hook.Notify(context.Background(), TransitionLifecycleEvent[struct{}]{EntityID: "entity-1"}); err != nil {
		t.Fatalf("expected nil sink to noop, got %v", err)
	}
}

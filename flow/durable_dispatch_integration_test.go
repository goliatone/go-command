package flow

import (
	"context"
	"errors"
	"sync/atomic"
	"testing"
	"time"
)

type durableDispatchMsg struct {
	ID    string
	Event string
	State string
}

func (durableDispatchMsg) Type() string { return "durable.dispatch.msg" }

func TestDurableOrchestrator_AutoDispatchRetryPreservesAtomicCommit(t *testing.T) {
	store := NewInMemoryStateStore()
	scheduler := NewInMemoryJobScheduler()
	var failOnce atomic.Bool
	failOnce.Store(true)
	scheduler.SetEnqueueHook(func(*ExecutionMessage) error {
		if failOnce.CompareAndSwap(true, false) {
			return errors.New("enqueue unavailable")
		}
		return nil
	})

	durable, err := NewDurableOrchestrator[durableDispatchMsg](
		NewInMemoryExecutionRecordStore[durableDispatchMsg](),
		scheduler,
		store,
		WithDurableOutboxDispatcherOptions[durableDispatchMsg](
			WithOutboxRetryDelay(5*time.Millisecond),
		),
	)
	if err != nil {
		t.Fatalf("new durable orchestrator: %v", err)
	}
	sm := buildDurableDispatchStateMachine(t, store, durable)

	res, err := sm.ApplyEvent(context.Background(), ApplyEventRequest[durableDispatchMsg]{
		EntityID: "entity-1",
		Event:    "approve",
		Msg:      durableDispatchMsg{ID: "entity-1", Event: "approve", State: "draft"},
	})
	if err != nil {
		t.Fatalf("apply event failed: %v", err)
	}
	if res == nil || res.Execution == nil {
		t.Fatalf("expected execution handle")
	}
	if res.Execution.Status != ExecutionStateDegraded {
		t.Fatalf("expected degraded status after first dispatch failure, got %s", res.Execution.Status)
	}

	rec, err := store.Load(context.Background(), "entity-1")
	if err != nil {
		t.Fatalf("load state failed: %v", err)
	}
	if rec == nil || rec.State != "approved" || rec.Version != 1 {
		t.Fatalf("expected committed approved state at version 1")
	}
	entries := store.OutboxEntries()
	if len(entries) != 1 {
		t.Fatalf("expected one outbox entry, got %d", len(entries))
	}
	if entries[0].Status != "pending" {
		t.Fatalf("expected pending outbox after retry scheduling, got %s", entries[0].Status)
	}

	time.Sleep(10 * time.Millisecond)
	report, runErr := durable.RunOnce(context.Background())
	if runErr != nil {
		t.Fatalf("dispatcher retry run failed: %v", runErr)
	}
	if report.Processed != 1 {
		t.Fatalf("expected one processed entry on retry, got %d", report.Processed)
	}

	entries = store.OutboxEntries()
	if len(entries) != 1 || entries[0].Status != "completed" {
		t.Fatalf("expected completed outbox entry after retry")
	}
	status, err := sm.ExecutionStatus(context.Background(), res.Execution.ExecutionID)
	if err != nil {
		t.Fatalf("execution status failed: %v", err)
	}
	if status.Status != ExecutionStateCompleted {
		t.Fatalf("expected completed execution status, got %s", status.Status)
	}
}

func TestDurableOrchestrator_DeadLetterInspection(t *testing.T) {
	store := NewInMemoryStateStore()
	scheduler := NewInMemoryJobScheduler()
	scheduler.SetEnqueueHook(func(*ExecutionMessage) error {
		return errors.New("scheduler down")
	})

	durable, err := NewDurableOrchestrator[durableDispatchMsg](
		NewInMemoryExecutionRecordStore[durableDispatchMsg](),
		scheduler,
		store,
		WithDurableOutboxDispatcherOptions[durableDispatchMsg](
			WithOutboxMaxAttempts(1),
			WithOutboxRetryDelay(5*time.Millisecond),
		),
	)
	if err != nil {
		t.Fatalf("new durable orchestrator: %v", err)
	}
	sm := buildDurableDispatchStateMachine(t, store, durable)

	res, err := sm.ApplyEvent(context.Background(), ApplyEventRequest[durableDispatchMsg]{
		EntityID: "entity-2",
		Event:    "approve",
		Msg:      durableDispatchMsg{ID: "entity-2", Event: "approve", State: "draft"},
	})
	if err != nil {
		t.Fatalf("apply event failed: %v", err)
	}
	if res == nil || res.Execution == nil {
		t.Fatalf("expected execution handle")
	}
	if res.Execution.Status != ExecutionStateFailed {
		t.Fatalf("expected failed execution status after dead-lettering, got %s", res.Execution.Status)
	}

	entries := store.OutboxEntries()
	if len(entries) != 1 {
		t.Fatalf("expected one outbox entry, got %d", len(entries))
	}
	if entries[0].Status != "dead_lettered" {
		t.Fatalf("expected dead_lettered outbox status, got %s", entries[0].Status)
	}

	dead, err := durable.DeadLetters(context.Background(), DeadLetterScope{ExecutionID: res.Execution.ExecutionID})
	if err != nil {
		t.Fatalf("dead-letter inspection failed: %v", err)
	}
	if len(dead) != 1 {
		t.Fatalf("expected one dead-letter record, got %d", len(dead))
	}
	status, err := sm.ExecutionStatus(context.Background(), res.Execution.ExecutionID)
	if err != nil {
		t.Fatalf("execution status failed: %v", err)
	}
	if status.Status != ExecutionStateFailed {
		t.Fatalf("expected failed status, got %s", status.Status)
	}
}

func TestExecutionHistoryIncludesDispatchOutcomes(t *testing.T) {
	store := NewInMemoryStateStore()
	scheduler := NewInMemoryJobScheduler()
	var failOnce atomic.Bool
	failOnce.Store(true)
	scheduler.SetEnqueueHook(func(*ExecutionMessage) error {
		if failOnce.CompareAndSwap(true, false) {
			return errors.New("first enqueue fail")
		}
		return nil
	})

	durable, err := NewDurableOrchestrator[durableDispatchMsg](
		NewInMemoryExecutionRecordStore[durableDispatchMsg](),
		scheduler,
		store,
		WithDurableOutboxDispatcherOptions[durableDispatchMsg](WithOutboxRetryDelay(5*time.Millisecond)),
	)
	if err != nil {
		t.Fatalf("new durable orchestrator: %v", err)
	}
	sm := buildDurableDispatchStateMachine(t, store, durable)

	res, err := sm.ApplyEvent(context.Background(), ApplyEventRequest[durableDispatchMsg]{
		EntityID: "entity-3",
		Event:    "approve",
		Msg:      durableDispatchMsg{ID: "entity-3", Event: "approve", State: "draft"},
	})
	if err != nil {
		t.Fatalf("apply event failed: %v", err)
	}
	if res == nil || res.Execution == nil {
		t.Fatalf("expected execution handle")
	}

	time.Sleep(10 * time.Millisecond)
	if _, err := durable.RunOnce(context.Background()); err != nil {
		t.Fatalf("dispatch retry cycle failed: %v", err)
	}

	events, err := sm.ExecutionHistory(context.Background(), ExecutionScope{ExecutionID: res.Execution.ExecutionID})
	if err != nil {
		t.Fatalf("execution history failed: %v", err)
	}
	if len(events) < 4 {
		t.Fatalf("expected lifecycle + dispatch history entries, got %d", len(events))
	}

	outcomes := make([]string, 0)
	for _, evt := range events {
		if outcome := readStringFromMetadata(evt.Metadata, "dispatch_outcome"); outcome != "" {
			outcomes = append(outcomes, outcome)
		}
	}
	if len(outcomes) < 2 {
		t.Fatalf("expected dispatch outcomes in history metadata")
	}
	if outcomes[0] != string(DispatchOutcomeRetryScheduled) {
		t.Fatalf("expected first dispatch outcome retry_scheduled, got %s", outcomes[0])
	}
	if outcomes[len(outcomes)-1] != string(DispatchOutcomeCompleted) {
		t.Fatalf("expected final dispatch outcome completed, got %s", outcomes[len(outcomes)-1])
	}
}

func buildDurableDispatchStateMachine(
	t *testing.T,
	store *InMemoryStateStore,
	durable *DurableOrchestrator[durableDispatchMsg],
) *StateMachine[durableDispatchMsg] {
	t.Helper()
	cfg := StateMachineConfig{
		Entity:          "order",
		ExecutionPolicy: ExecutionPolicyOrchestrated,
		States:          []StateConfig{{Name: "draft", Initial: true}, {Name: "approved"}},
		Transitions: []TransitionConfig{{
			Name:   "approve",
			From:   "draft",
			To:     "approved",
			Action: "mark",
		}},
	}
	req := TransitionRequest[durableDispatchMsg]{
		StateKey: func(m durableDispatchMsg) string { return m.ID },
		Event:    func(m durableDispatchMsg) string { return m.Event },
	}
	sm, err := newStateMachineFromConfig(cfg, store, req, nil, nil, WithOrchestrator[durableDispatchMsg](durable))
	if err != nil {
		t.Fatalf("new state machine: %v", err)
	}
	for _, entityID := range []string{"entity-1", "entity-2", "entity-3"} {
		mustSeedStateRecord(t, sm, entityID, "draft")
	}
	return sm
}

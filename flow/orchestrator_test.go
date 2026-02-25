package flow

import (
	"context"
	"errors"
	"strings"
	"sync"
	"testing"
)

type lifecycleHookFunc[T any] func(context.Context, TransitionLifecycleEvent[T]) error

func (f lifecycleHookFunc[T]) Notify(ctx context.Context, evt TransitionLifecycleEvent[T]) error {
	return f(ctx, evt)
}

func TestNewStateMachineRequiresExecutionPolicy(t *testing.T) {
	cfg := StateMachineConfig{
		Entity:      "order",
		States:      []StateConfig{{Name: "draft", Initial: true}, {Name: "approved"}},
		Transitions: []TransitionConfig{{Name: "approve", From: "draft", To: "approved"}},
	}
	req := TransitionRequest[smMsg]{
		StateKey: func(m smMsg) string { return m.ID },
		Event:    func(m smMsg) string { return m.Event },
	}
	_, err := newStateMachineFromConfig(cfg, NewInMemoryStateStore(), req, nil, nil)
	if err == nil {
		t.Fatalf("expected execution policy validation error")
	}
}

func TestLightweightOrchestratorExecutesEffectsAndReturnsHandle(t *testing.T) {
	cfg := StateMachineConfig{
		Entity:          "order",
		ExecutionPolicy: ExecutionPolicyLightweight,
		States:          []StateConfig{{Name: "draft", Initial: true}, {Name: "approved"}},
		Transitions: []TransitionConfig{
			{Name: "approve", From: "draft", To: "approved", Action: "mark"},
		},
	}
	req := TransitionRequest[smMsg]{
		StateKey: func(m smMsg) string { return m.ID },
		Event:    func(m smMsg) string { return m.Event },
	}
	actions := NewActionRegistry[smMsg]()
	called := false
	if err := actions.Register("mark", func(context.Context, smMsg) error {
		called = true
		return nil
	}); err != nil {
		t.Fatalf("register action: %v", err)
	}
	sm, err := newStateMachineFromConfig(cfg, NewInMemoryStateStore(), req, nil, actions)
	if err != nil {
		t.Fatalf("build state machine: %v", err)
	}
	mustSeedStateRecord(t, sm, "1", "draft")
	res, err := sm.ApplyEvent(context.Background(), ApplyEventRequest[smMsg]{
		EntityID: "1",
		Event:    "approve",
		Msg:      smMsg{ID: "1", Event: "approve", State: "draft"},
	})
	if err != nil {
		t.Fatalf("apply event failed: %v", err)
	}
	if !called {
		t.Fatalf("expected lightweight orchestrator to execute action effect")
	}
	if res.Execution == nil {
		t.Fatalf("expected execution handle in response")
	}
	if res.Execution.Policy != string(ExecutionPolicyLightweight) {
		t.Fatalf("unexpected execution policy %s", res.Execution.Policy)
	}
	if strings.TrimSpace(res.Execution.ExecutionID) == "" {
		t.Fatalf("expected execution id")
	}
}

func TestDurableOrchestratorLifecycleAndStatus(t *testing.T) {
	records := NewInMemoryExecutionRecordStore[smMsg]()
	durable, err := NewDurableOrchestrator[smMsg](records, NewInMemoryJobScheduler(), nil)
	if err != nil {
		t.Fatalf("new durable orchestrator: %v", err)
	}
	handle, err := durable.Start(context.Background(), StartRequest[smMsg]{
		ExecutionID:    "exec-1",
		MachineID:      "order",
		MachineVersion: "v2",
		EntityID:       "1",
		Event:          "approve",
		TransitionID:   "approve",
		Result: &TransitionResult[smMsg]{
			PreviousState: "draft",
			CurrentState:  "approved",
		},
		Msg: smMsg{ID: "1", Event: "approve"},
	})
	if err != nil {
		t.Fatalf("start failed: %v", err)
	}
	if handle.ExecutionID != "exec-1" {
		t.Fatalf("unexpected execution id: %s", handle.ExecutionID)
	}
	if err := durable.Pause(context.Background(), "exec-1"); err != nil {
		t.Fatalf("pause failed: %v", err)
	}
	if err := durable.Resume(context.Background(), "exec-1"); err != nil {
		t.Fatalf("resume failed: %v", err)
	}
	if err := durable.Stop(context.Background(), "exec-1"); err != nil {
		t.Fatalf("stop failed: %v", err)
	}
	status, err := durable.Status(context.Background(), "exec-1")
	if err != nil {
		t.Fatalf("status failed: %v", err)
	}
	if status.Status != ExecutionStateStopped {
		t.Fatalf("expected stopped status, got %s", status.Status)
	}
}

func TestRetryOwnershipConflictValidation(t *testing.T) {
	_, err := NewDurableOrchestrator[smMsg](
		NewInMemoryExecutionRecordStore[smMsg](),
		nil,
		nil,
		WithDurableRetryPolicy[smMsg](RetryPolicy{WorkerRetries: true, TaskRetries: true}),
	)
	if err == nil {
		t.Fatalf("expected retry ownership conflict")
	}
}

func TestDurableResumeStaleIsNonRetryable(t *testing.T) {
	records := NewInMemoryExecutionRecordStore[smMsg]()
	durable, err := NewDurableOrchestrator[smMsg](records, nil, nil)
	if err != nil {
		t.Fatalf("new durable orchestrator: %v", err)
	}
	_, err = durable.Start(context.Background(), StartRequest[smMsg]{
		ExecutionID:     "exec-2",
		MachineID:       "order",
		MachineVersion:  "v2",
		EntityID:        "1",
		Event:           "approve",
		TransitionID:    "approve",
		ExpectedState:   "draft",
		ExpectedVersion: 2,
		Msg:             smMsg{ID: "1", Event: "approve"},
	})
	if err != nil {
		t.Fatalf("start failed: %v", err)
	}
	err = durable.HandleResume(context.Background(), ResumeRequest[smMsg]{
		ExecutionID:     "exec-2",
		EntityID:        "1",
		Event:           "resume",
		ExpectedState:   "approved",
		ExpectedVersion: 2,
		Apply: func(context.Context, ApplyEventRequest[smMsg]) (*ApplyEventResponse[smMsg], error) {
			return nil, errors.New("should not be called")
		},
	})
	if err == nil {
		t.Fatalf("expected non-retryable stale error")
	}
	if !IsNonRetryable(err) {
		t.Fatalf("expected non-retryable classification, got %v", err)
	}
}

func TestLifecycleHooksPhasesAndCorrelationMetadata(t *testing.T) {
	cfg := StateMachineConfig{
		Entity:          "order",
		ExecutionPolicy: ExecutionPolicyLightweight,
		States:          []StateConfig{{Name: "draft", Initial: true}, {Name: "approved"}},
		Transitions: []TransitionConfig{
			{Name: "approve", From: "draft", To: "approved"},
		},
	}
	req := TransitionRequest[smMsg]{
		StateKey: func(m smMsg) string { return m.ID },
		Event:    func(m smMsg) string { return m.Event },
	}
	var mu sync.Mutex
	events := make([]TransitionLifecycleEvent[smMsg], 0)
	hook := lifecycleHookFunc[smMsg](func(_ context.Context, evt TransitionLifecycleEvent[smMsg]) error {
		mu.Lock()
		defer mu.Unlock()
		events = append(events, evt)
		return nil
	})
	sm, err := newStateMachineFromConfig(
		cfg,
		NewInMemoryStateStore(),
		req,
		nil,
		nil,
		WithLifecycleHooks[smMsg](hook),
		WithHookFailureMode[smMsg](HookFailureModeFailOpen),
	)
	if err != nil {
		t.Fatalf("build state machine: %v", err)
	}
	mustSeedStateRecord(t, sm, "1", "draft")
	_, err = sm.ApplyEvent(context.Background(), ApplyEventRequest[smMsg]{
		EntityID: "1",
		Event:    "approve",
		Msg:      smMsg{ID: "1", Event: "approve", State: "draft"},
	})
	if err != nil {
		t.Fatalf("apply event failed: %v", err)
	}

	mu.Lock()
	defer mu.Unlock()
	if len(events) < 2 {
		t.Fatalf("expected attempted+committed events, got %d", len(events))
	}
	if events[0].Phase != TransitionPhaseAttempted {
		t.Fatalf("expected first phase attempted, got %s", events[0].Phase)
	}
	if events[1].Phase != TransitionPhaseCommitted {
		t.Fatalf("expected second phase committed, got %s", events[1].Phase)
	}
	committed := events[1]
	for _, key := range []string{"machine_id", "machine_version", "entity_id", "event", "transition_id", "execution_id"} {
		if _, ok := committed.Metadata[key]; !ok {
			t.Fatalf("expected committed metadata key %s", key)
		}
	}
}

func TestLifecycleHookFailureModes(t *testing.T) {
	cfg := StateMachineConfig{
		Entity:          "order",
		ExecutionPolicy: ExecutionPolicyLightweight,
		States:          []StateConfig{{Name: "draft", Initial: true}, {Name: "approved"}},
		Transitions: []TransitionConfig{
			{Name: "approve", From: "draft", To: "approved"},
		},
	}
	req := TransitionRequest[smMsg]{
		StateKey: func(m smMsg) string { return m.ID },
		Event:    func(m smMsg) string { return m.Event },
	}
	failHook := lifecycleHookFunc[smMsg](func(context.Context, TransitionLifecycleEvent[smMsg]) error {
		return errors.New("boom")
	})

	failOpenSM, err := newStateMachineFromConfig(
		cfg,
		NewInMemoryStateStore(),
		req,
		nil,
		nil,
		WithLifecycleHooks[smMsg](failHook),
		WithHookFailureMode[smMsg](HookFailureModeFailOpen),
	)
	if err != nil {
		t.Fatalf("build fail-open state machine: %v", err)
	}
	mustSeedStateRecord(t, failOpenSM, "1", "draft")
	if _, err := failOpenSM.ApplyEvent(context.Background(), ApplyEventRequest[smMsg]{
		EntityID: "1",
		Event:    "approve",
		Msg:      smMsg{ID: "1", Event: "approve", State: "draft"},
	}); err != nil {
		t.Fatalf("expected fail-open hook mode to continue, got %v", err)
	}

	failClosedSM, err := newStateMachineFromConfig(
		cfg,
		NewInMemoryStateStore(),
		req,
		nil,
		nil,
		WithLifecycleHooks[smMsg](failHook),
		WithHookFailureMode[smMsg](HookFailureModeFailClosed),
	)
	if err != nil {
		t.Fatalf("build fail-closed state machine: %v", err)
	}
	mustSeedStateRecord(t, failClosedSM, "2", "draft")
	_, err = failClosedSM.ApplyEvent(context.Background(), ApplyEventRequest[smMsg]{
		EntityID: "2",
		Event:    "approve",
		Msg:      smMsg{ID: "2", Event: "approve", State: "draft"},
	})
	if err == nil {
		t.Fatalf("expected fail-closed hook mode to fail transition path")
	}
	if runtimeErrorCode(err) != ErrCodePreconditionFailed {
		t.Fatalf("expected precondition code for fail-closed hook, got %s", runtimeErrorCode(err))
	}
}

func TestOrchestratedPolicyStoresLifecycleIntents(t *testing.T) {
	cfg := StateMachineConfig{
		Entity:          "order",
		ExecutionPolicy: ExecutionPolicyOrchestrated,
		States:          []StateConfig{{Name: "draft", Initial: true}, {Name: "approved"}},
		Transitions: []TransitionConfig{
			{Name: "approve", From: "draft", To: "approved"},
		},
	}
	req := TransitionRequest[smMsg]{
		StateKey: func(m smMsg) string { return m.ID },
		Event:    func(m smMsg) string { return m.Event },
	}
	durable, err := NewDurableOrchestrator[smMsg](NewInMemoryExecutionRecordStore[smMsg](), nil, nil)
	if err != nil {
		t.Fatalf("new durable orchestrator: %v", err)
	}

	hookCalls := 0
	hook := lifecycleHookFunc[smMsg](func(context.Context, TransitionLifecycleEvent[smMsg]) error {
		hookCalls++
		return nil
	})

	sm, err := newStateMachineFromConfig(
		cfg,
		NewInMemoryStateStore(),
		req,
		nil,
		nil,
		WithOrchestrator[smMsg](durable),
		WithLifecycleHooks[smMsg](hook),
	)
	if err != nil {
		t.Fatalf("build state machine: %v", err)
	}
	mustSeedStateRecord(t, sm, "1", "draft")
	res, err := sm.ApplyEvent(context.Background(), ApplyEventRequest[smMsg]{
		EntityID: "1",
		Event:    "approve",
		Msg:      smMsg{ID: "1", Event: "approve", State: "draft"},
	})
	if err != nil {
		t.Fatalf("apply event failed: %v", err)
	}
	if res.Execution == nil || res.Execution.Policy != string(ExecutionPolicyOrchestrated) {
		t.Fatalf("expected orchestrated execution handle")
	}
	if hookCalls != 0 {
		t.Fatalf("expected lightweight hooks not to run inline for orchestrated policy")
	}
	intents, err := durable.LifecycleIntents(context.Background())
	if err != nil {
		t.Fatalf("list lifecycle intents: %v", err)
	}
	if len(intents) < 2 {
		t.Fatalf("expected attempted and committed intents, got %d", len(intents))
	}
	if intents[0].Phase != TransitionPhaseAttempted || intents[1].Phase != TransitionPhaseCommitted {
		t.Fatalf("unexpected lifecycle phases: %s, %s", intents[0].Phase, intents[1].Phase)
	}
}

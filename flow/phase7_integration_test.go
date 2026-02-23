package flow

import (
	"context"
	"errors"
	"sync"
	"sync/atomic"
	"testing"
	"time"
)

type phase7Msg struct {
	ID     string
	Event  string
	State  string
	Admin  bool
	Number int
}

func (phase7Msg) Type() string { return "phase7.msg" }

type phase7Hook[T any] func(context.Context, TransitionLifecycleEvent[T]) error

func (f phase7Hook[T]) Notify(ctx context.Context, evt TransitionLifecycleEvent[T]) error {
	return f(ctx, evt)
}

func TestPhase7Integration_ConcurrentApplyEventVersionConflict(t *testing.T) {
	cfg := StateMachineConfig{
		Entity:          "order",
		ExecutionPolicy: ExecutionPolicyOrchestrated,
		States:          []StateConfig{{Name: "draft", Initial: true}, {Name: "approved"}},
		Transitions: []TransitionConfig{{
			Name:   "approve",
			From:   "draft",
			To:     "approved",
			Guard:  "barrier",
			Action: "mark",
		}},
	}

	release := make(chan struct{})
	var arrived atomic.Int32
	guards := NewGuardRegistry[phase7Msg]()
	if err := guards.RegisterWithContext("barrier", func(context.Context, phase7Msg, ExecutionContext) error {
		if arrived.Add(1) == 2 {
			close(release)
		}
		<-release
		return nil
	}); err != nil {
		t.Fatalf("register guard: %v", err)
	}

	store := NewInMemoryStateStore()
	records := NewInMemoryExecutionRecordStore[phase7Msg]()
	durable, err := NewDurableOrchestrator[phase7Msg](records, nil, nil)
	if err != nil {
		t.Fatalf("new durable orchestrator: %v", err)
	}

	req := TransitionRequest[phase7Msg]{
		StateKey:     func(m phase7Msg) string { return m.ID },
		Event:        func(m phase7Msg) string { return m.Event },
		CurrentState: func(m phase7Msg) string { return m.State },
	}
	sm, err := NewStateMachine(cfg, store, req, guards, nil, WithOrchestrator[phase7Msg](durable))
	if err != nil {
		t.Fatalf("new state machine: %v", err)
	}

	type result struct {
		res *ApplyEventResponse[phase7Msg]
		err error
	}
	results := make(chan result, 2)
	apply := func() {
		res, applyErr := sm.ApplyEvent(context.Background(), ApplyEventRequest[phase7Msg]{
			EntityID: "entity-1",
			Event:    "approve",
			Msg: phase7Msg{
				ID:    "entity-1",
				Event: "approve",
				State: "draft",
			},
		})
		results <- result{res: res, err: applyErr}
	}
	go apply()
	go apply()

	first := <-results
	second := <-results

	success := 0
	conflicts := 0
	for _, item := range []result{first, second} {
		switch {
		case item.err == nil:
			success++
			if item.res == nil || item.res.Execution == nil {
				t.Fatalf("expected execution handle for successful apply")
			}
			if item.res.Execution.Policy != string(ExecutionPolicyOrchestrated) {
				t.Fatalf("expected orchestrated policy handle")
			}
		case runtimeErrorCode(item.err) == ErrCodeVersionConflict:
			conflicts++
		default:
			t.Fatalf("unexpected apply error: %v", item.err)
		}
	}
	if success != 1 || conflicts != 1 {
		t.Fatalf("expected one success and one conflict, success=%d conflicts=%d", success, conflicts)
	}

	entries := store.OutboxEntries()
	if len(entries) != 1 {
		t.Fatalf("expected exactly one committed outbox entry, got %d", len(entries))
	}
	if entries[0].Status != "pending" {
		t.Fatalf("expected pending outbox status, got %s", entries[0].Status)
	}
}

func TestPhase7Integration_ExecutionControlsAndOutboxRetrySemantics(t *testing.T) {
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

	store := NewInMemoryStateStore()
	durable, err := NewDurableOrchestrator[phase7Msg](NewInMemoryExecutionRecordStore[phase7Msg](), nil, nil)
	if err != nil {
		t.Fatalf("new durable orchestrator: %v", err)
	}

	req := TransitionRequest[phase7Msg]{
		StateKey:     func(m phase7Msg) string { return m.ID },
		Event:        func(m phase7Msg) string { return m.Event },
		CurrentState: func(m phase7Msg) string { return m.State },
	}
	sm, err := NewStateMachine(cfg, store, req, nil, nil, WithOrchestrator[phase7Msg](durable))
	if err != nil {
		t.Fatalf("new state machine: %v", err)
	}

	res, err := sm.ApplyEvent(context.Background(), ApplyEventRequest[phase7Msg]{
		EntityID: "entity-2",
		Event:    "approve",
		Msg: phase7Msg{
			ID:    "entity-2",
			Event: "approve",
			State: "draft",
		},
	})
	if err != nil {
		t.Fatalf("apply event: %v", err)
	}
	if res == nil || res.Execution == nil {
		t.Fatalf("expected execution handle")
	}
	executionID := res.Execution.ExecutionID

	if err := sm.PauseExecution(context.Background(), executionID); err != nil {
		t.Fatalf("pause execution: %v", err)
	}
	status, err := sm.ExecutionStatus(context.Background(), executionID)
	if err != nil {
		t.Fatalf("status after pause: %v", err)
	}
	if status.Status != ExecutionStatePaused {
		t.Fatalf("expected paused status, got %s", status.Status)
	}

	if err := sm.ResumeExecution(context.Background(), executionID); err != nil {
		t.Fatalf("resume execution: %v", err)
	}
	status, err = sm.ExecutionStatus(context.Background(), executionID)
	if err != nil {
		t.Fatalf("status after resume: %v", err)
	}
	if status.Status != ExecutionStateRunning {
		t.Fatalf("expected running status, got %s", status.Status)
	}

	if err := sm.StopExecution(context.Background(), executionID); err != nil {
		t.Fatalf("stop execution: %v", err)
	}
	status, err = sm.ExecutionStatus(context.Background(), executionID)
	if err != nil {
		t.Fatalf("status after stop: %v", err)
	}
	if status.Status != ExecutionStateStopped {
		t.Fatalf("expected stopped status, got %s", status.Status)
	}

	entries := store.OutboxEntries()
	if len(entries) != 1 {
		t.Fatalf("expected one outbox entry, got %d", len(entries))
	}
	scheduler := NewInMemoryJobScheduler()
	var failedOnce atomic.Bool
	scheduler.SetEnqueueHook(func(*ExecutionMessage) error {
		if failedOnce.CompareAndSwap(false, true) {
			return errors.New("simulated enqueue failure")
		}
		return nil
	})
	dispatcher := NewOutboxDispatcher(store, scheduler, WithOutboxRetryDelay(5*time.Millisecond))

	processed, dispatchErr := dispatcher.DispatchPending(context.Background())
	if dispatchErr == nil {
		t.Fatalf("expected dispatch error on first attempt")
	}
	if processed != 0 {
		t.Fatalf("expected no processed entries on failed dispatch, got %d", processed)
	}

	time.Sleep(10 * time.Millisecond)
	processed, dispatchErr = dispatcher.DispatchPending(context.Background())
	if dispatchErr != nil {
		t.Fatalf("retry dispatch should succeed: %v", dispatchErr)
	}
	if processed != 1 {
		t.Fatalf("expected one processed entry on retry, got %d", processed)
	}

	messages := scheduler.Messages()
	if len(messages) != 1 {
		t.Fatalf("expected one successfully enqueued message, got %d", len(messages))
	}

	entries = store.OutboxEntries()
	if len(entries) != 1 || entries[0].Status != "completed" {
		t.Fatalf("expected completed outbox status after retry")
	}
}

func TestPhase7Integration_SnapshotTargetsAndResolverSafety(t *testing.T) {
	def := &MachineDefinition{
		ID:      "orders",
		Version: "v2",
		States: []StateDefinition{
			{Name: "draft", Initial: true},
			{Name: "review"},
			{Name: "approved"},
		},
		Transitions: []TransitionDefinition{
			{ID: "approve", Event: "approve", From: "draft", To: "approved"},
			{ID: "route", Event: "route", From: "draft", DynamicTo: &DynamicTargetDefinition{Resolver: "pick_target"}},
		},
	}

	var resolverCalls atomic.Int32
	resolvers := NewResolverMap[phase7Msg]()
	resolvers.RegisterDynamicTarget("pick_target", func(_ context.Context, msg phase7Msg, _ ExecutionContext) (string, error) {
		resolverCalls.Add(1)
		if msg.Admin {
			return "review", nil
		}
		return "", errors.New("unsafe to evaluate")
	})

	store := NewInMemoryStateStore()
	req := TransitionRequest[phase7Msg]{
		StateKey:     func(m phase7Msg) string { return m.ID },
		Event:        func(m phase7Msg) string { return m.Event },
		CurrentState: func(m phase7Msg) string { return m.State },
	}
	sm, err := NewStateMachineFromDefinition(def, store, req, resolvers, nil, WithExecutionPolicy[phase7Msg](ExecutionPolicyLightweight))
	if err != nil {
		t.Fatalf("new state machine from definition: %v", err)
	}

	resolvedSnap, err := sm.Snapshot(context.Background(), SnapshotRequest[phase7Msg]{
		EntityID: "entity-3",
		Msg: phase7Msg{
			ID:    "entity-3",
			State: "draft",
			Admin: true,
		},
	})
	if err != nil {
		t.Fatalf("snapshot with resolvable dynamic target: %v", err)
	}
	if len(resolvedSnap.AllowedTransitions) != 2 {
		t.Fatalf("expected two transitions from draft, got %d", len(resolvedSnap.AllowedTransitions))
	}

	var staticTarget TargetInfo
	var dynamicTarget TargetInfo
	for _, tr := range resolvedSnap.AllowedTransitions {
		switch tr.Event {
		case "approve":
			staticTarget = tr.Target
		case "route":
			dynamicTarget = tr.Target
		}
	}
	if staticTarget.Kind != "static" || staticTarget.To != "approved" {
		t.Fatalf("expected static target to=approved, got kind=%s to=%s", staticTarget.Kind, staticTarget.To)
	}
	if dynamicTarget.Kind != "dynamic" || dynamicTarget.Resolver != "pick_target" {
		t.Fatalf("expected dynamic target resolver metadata")
	}
	if !dynamicTarget.Resolved || dynamicTarget.ResolvedTo != "review" {
		t.Fatalf("expected resolved dynamic target review, resolved=%v to=%s", dynamicTarget.Resolved, dynamicTarget.ResolvedTo)
	}
	if len(dynamicTarget.Candidates) != 3 {
		t.Fatalf("expected candidates for all machine states, got %d", len(dynamicTarget.Candidates))
	}

	unresolvedSnap, err := sm.Snapshot(context.Background(), SnapshotRequest[phase7Msg]{
		EntityID: "entity-3",
		Msg: phase7Msg{
			ID:    "entity-3",
			State: "draft",
			Admin: false,
		},
	})
	if err != nil {
		t.Fatalf("snapshot with non-resolvable dynamic target: %v", err)
	}
	if resolverCalls.Load() != 2 {
		t.Fatalf("expected resolver to be called for each snapshot, got %d", resolverCalls.Load())
	}
	for _, tr := range unresolvedSnap.AllowedTransitions {
		if tr.Event == "route" {
			if tr.Target.Resolved {
				t.Fatalf("expected unresolved dynamic target when resolver fails")
			}
			if tr.Target.ResolvedTo != "" {
				t.Fatalf("expected empty resolved target on resolver failure")
			}
		}
	}

	rec, err := store.Load(context.Background(), "entity-3")
	if err != nil {
		t.Fatalf("load state after snapshot: %v", err)
	}
	if rec != nil {
		t.Fatalf("snapshot should not persist state records")
	}
	if len(store.OutboxEntries()) != 0 {
		t.Fatalf("snapshot should not emit outbox entries")
	}
}

func TestPhase7Integration_LifecycleHookFailureModes(t *testing.T) {
	cfg := StateMachineConfig{
		Entity:          "order",
		ExecutionPolicy: ExecutionPolicyLightweight,
		States:          []StateConfig{{Name: "draft", Initial: true}, {Name: "approved"}},
		Transitions:     []TransitionConfig{{Name: "approve", From: "draft", To: "approved"}},
	}
	req := TransitionRequest[phase7Msg]{
		StateKey:     func(m phase7Msg) string { return m.ID },
		Event:        func(m phase7Msg) string { return m.Event },
		CurrentState: func(m phase7Msg) string { return m.State },
	}

	var mu sync.Mutex
	phases := make([]TransitionPhase, 0, 2)
	failHook := phase7Hook[phase7Msg](func(_ context.Context, evt TransitionLifecycleEvent[phase7Msg]) error {
		mu.Lock()
		defer mu.Unlock()
		phases = append(phases, evt.Phase)
		return errors.New("hook failure")
	})

	failOpen, err := NewStateMachine(
		cfg,
		NewInMemoryStateStore(),
		req,
		nil,
		nil,
		WithLifecycleHooks[phase7Msg](failHook),
		WithHookFailureMode[phase7Msg](HookFailureModeFailOpen),
	)
	if err != nil {
		t.Fatalf("new fail-open machine: %v", err)
	}
	_, err = failOpen.ApplyEvent(context.Background(), ApplyEventRequest[phase7Msg]{
		EntityID: "entity-4",
		Event:    "approve",
		Msg:      phase7Msg{ID: "entity-4", Event: "approve", State: "draft"},
	})
	if err != nil {
		t.Fatalf("fail-open apply should succeed: %v", err)
	}

	mu.Lock()
	if len(phases) < 2 || phases[0] != TransitionPhaseAttempted || phases[1] != TransitionPhaseCommitted {
		mu.Unlock()
		t.Fatalf("expected attempted+committed lifecycle phases under fail-open")
	}
	mu.Unlock()

	failClosed, err := NewStateMachine(
		cfg,
		NewInMemoryStateStore(),
		req,
		nil,
		nil,
		WithLifecycleHooks[phase7Msg](failHook),
		WithHookFailureMode[phase7Msg](HookFailureModeFailClosed),
	)
	if err != nil {
		t.Fatalf("new fail-closed machine: %v", err)
	}
	_, err = failClosed.ApplyEvent(context.Background(), ApplyEventRequest[phase7Msg]{
		EntityID: "entity-5",
		Event:    "approve",
		Msg:      phase7Msg{ID: "entity-5", Event: "approve", State: "draft"},
	})
	if err == nil {
		t.Fatalf("expected fail-closed lifecycle hook error")
	}
	if runtimeErrorCode(err) != ErrCodePreconditionFailed {
		t.Fatalf("expected precondition failed from fail-closed mode, got %s", runtimeErrorCode(err))
	}
}

package flow

import (
	"context"
	"errors"
	"sync"
	"sync/atomic"
	"testing"
	"time"
)

type executionFlowMsg struct {
	ID     string
	Event  string
	State  string
	Admin  bool
	Number int
}

func (executionFlowMsg) Type() string { return "execution.flow.msg" }

type executionLifecycleHook[T any] func(context.Context, TransitionLifecycleEvent[T]) error

func (f executionLifecycleHook[T]) Notify(ctx context.Context, evt TransitionLifecycleEvent[T]) error {
	return f(ctx, evt)
}

func TestOrchestratedApplyEvent_ConcurrentRequestsYieldSingleCommit(t *testing.T) {
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
	guards := NewGuardRegistry[executionFlowMsg]()
	if err := guards.RegisterWithContext("barrier", func(context.Context, executionFlowMsg, ExecutionContext) error {
		if arrived.Add(1) == 2 {
			close(release)
		}
		<-release
		return nil
	}); err != nil {
		t.Fatalf("register guard: %v", err)
	}

	store := NewInMemoryStateStore()
	records := NewInMemoryExecutionRecordStore[executionFlowMsg]()
	durable, err := NewDurableOrchestrator[executionFlowMsg](records, nil, nil)
	if err != nil {
		t.Fatalf("new durable orchestrator: %v", err)
	}

	req := TransitionRequest[executionFlowMsg]{
		StateKey: func(m executionFlowMsg) string { return m.ID },
		Event:    func(m executionFlowMsg) string { return m.Event },
	}
	sm, err := newStateMachineFromConfig(cfg, store, req, guards, nil, WithOrchestrator[executionFlowMsg](durable))
	if err != nil {
		t.Fatalf("new state machine: %v", err)
	}
	mustSeedStateRecord(t, sm, "entity-1", "draft")

	type result struct {
		res *ApplyEventResponse[executionFlowMsg]
		err error
	}
	results := make(chan result, 2)
	apply := func() {
		res, applyErr := sm.ApplyEvent(context.Background(), ApplyEventRequest[executionFlowMsg]{
			EntityID: "entity-1",
			Event:    "approve",
			Msg: executionFlowMsg{
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

func TestOrchestratedExecutionControlsAndOutboxRetry(t *testing.T) {
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
	durable, err := NewDurableOrchestrator[executionFlowMsg](NewInMemoryExecutionRecordStore[executionFlowMsg](), nil, nil)
	if err != nil {
		t.Fatalf("new durable orchestrator: %v", err)
	}

	req := TransitionRequest[executionFlowMsg]{
		StateKey: func(m executionFlowMsg) string { return m.ID },
		Event:    func(m executionFlowMsg) string { return m.Event },
	}
	sm, err := newStateMachineFromConfig(cfg, store, req, nil, nil, WithOrchestrator[executionFlowMsg](durable))
	if err != nil {
		t.Fatalf("new state machine: %v", err)
	}
	mustSeedStateRecord(t, sm, "entity-2", "draft")

	res, err := sm.ApplyEvent(context.Background(), ApplyEventRequest[executionFlowMsg]{
		EntityID: "entity-2",
		Event:    "approve",
		Msg: executionFlowMsg{
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

func TestSnapshotReportsTargetsWithoutMutatingState(t *testing.T) {
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
	resolvers := NewResolverMap[executionFlowMsg]()
	resolvers.RegisterDynamicTarget("pick_target", func(_ context.Context, msg executionFlowMsg, _ ExecutionContext) (string, error) {
		resolverCalls.Add(1)
		if msg.Admin {
			return "review", nil
		}
		return "", errors.New("unsafe to evaluate")
	})

	store := NewInMemoryStateStore()
	req := TransitionRequest[executionFlowMsg]{
		StateKey: func(m executionFlowMsg) string { return m.ID },
		Event:    func(m executionFlowMsg) string { return m.Event },
	}
	sm, err := NewStateMachineFromDefinition(def, store, req, resolvers, nil, WithExecutionPolicy[executionFlowMsg](ExecutionPolicyLightweight))
	if err != nil {
		t.Fatalf("new state machine from definition: %v", err)
	}
	mustSeedStateRecord(t, sm, "entity-3", "draft")

	resolvedSnap, err := sm.Snapshot(context.Background(), SnapshotRequest[executionFlowMsg]{
		EntityID: "entity-3",
		Msg: executionFlowMsg{
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

	unresolvedSnap, err := sm.Snapshot(context.Background(), SnapshotRequest[executionFlowMsg]{
		EntityID: "entity-3",
		Msg: executionFlowMsg{
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
	if rec == nil {
		t.Fatalf("expected seeded state record to remain available")
	}
	if rec.State != "draft" || rec.Version != 0 {
		t.Fatalf("snapshot should not mutate state, got state=%q version=%d", rec.State, rec.Version)
	}
	if len(store.OutboxEntries()) != 0 {
		t.Fatalf("snapshot should not emit outbox entries")
	}
}

func TestLifecycleHookFailureModes_FailOpenAndFailClosed(t *testing.T) {
	cfg := StateMachineConfig{
		Entity:          "order",
		ExecutionPolicy: ExecutionPolicyLightweight,
		States:          []StateConfig{{Name: "draft", Initial: true}, {Name: "approved"}},
		Transitions:     []TransitionConfig{{Name: "approve", From: "draft", To: "approved"}},
	}
	req := TransitionRequest[executionFlowMsg]{
		StateKey: func(m executionFlowMsg) string { return m.ID },
		Event:    func(m executionFlowMsg) string { return m.Event },
	}

	var mu sync.Mutex
	phases := make([]TransitionPhase, 0, 2)
	failHook := executionLifecycleHook[executionFlowMsg](func(_ context.Context, evt TransitionLifecycleEvent[executionFlowMsg]) error {
		mu.Lock()
		defer mu.Unlock()
		phases = append(phases, evt.Phase)
		return errors.New("hook failure")
	})

	failOpen, err := newStateMachineFromConfig(
		cfg,
		NewInMemoryStateStore(),
		req,
		nil,
		nil,
		WithLifecycleHooks[executionFlowMsg](failHook),
		WithHookFailureMode[executionFlowMsg](HookFailureModeFailOpen),
	)
	if err != nil {
		t.Fatalf("new fail-open machine: %v", err)
	}
	mustSeedStateRecord(t, failOpen, "entity-4", "draft")
	_, err = failOpen.ApplyEvent(context.Background(), ApplyEventRequest[executionFlowMsg]{
		EntityID: "entity-4",
		Event:    "approve",
		Msg:      executionFlowMsg{ID: "entity-4", Event: "approve", State: "draft"},
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

	failClosed, err := newStateMachineFromConfig(
		cfg,
		NewInMemoryStateStore(),
		req,
		nil,
		nil,
		WithLifecycleHooks[executionFlowMsg](failHook),
		WithHookFailureMode[executionFlowMsg](HookFailureModeFailClosed),
	)
	if err != nil {
		t.Fatalf("new fail-closed machine: %v", err)
	}
	mustSeedStateRecord(t, failClosed, "entity-5", "draft")
	_, err = failClosed.ApplyEvent(context.Background(), ApplyEventRequest[executionFlowMsg]{
		EntityID: "entity-5",
		Event:    "approve",
		Msg:      executionFlowMsg{ID: "entity-5", Event: "approve", State: "draft"},
	})
	if err == nil {
		t.Fatalf("expected fail-closed lifecycle hook error")
	}
	if runtimeErrorCode(err) != ErrCodePreconditionFailed {
		t.Fatalf("expected precondition failed from fail-closed mode, got %s", runtimeErrorCode(err))
	}
}

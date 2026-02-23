package flow

import (
	"bytes"
	"context"
	"sync"
	"sync/atomic"
	"testing"
)

type smMsg struct {
	ID     string
	Event  string
	State  string
	Number int
}

func (smMsg) Type() string { return "smMsg" }

func TestStateMachineApplyEventReturnsEnvelopeWithDescriptorEffects(t *testing.T) {
	cfg := StateMachineConfig{
		Entity:          "order",
		ExecutionPolicy: ExecutionPolicyOrchestrated,
		States:          []StateConfig{{Name: "draft", Initial: true}, {Name: "approved"}},
		Transitions: []TransitionConfig{
			{Name: "approve", From: "draft", To: "approved", Guard: "is_even", Action: "mark"},
		},
	}
	store := NewInMemoryStateStore()
	guards := NewGuardRegistry[smMsg]()
	if err := guards.Register("is_even", func(m smMsg) bool { return m.Number%2 == 0 }); err != nil {
		t.Fatalf("register guard: %v", err)
	}
	actions := NewActionRegistry[smMsg]()
	actionCalled := false
	if err := actions.Register("mark", func(context.Context, smMsg) error {
		actionCalled = true
		return nil
	}); err != nil {
		t.Fatalf("register action: %v", err)
	}

	req := TransitionRequest[smMsg]{
		StateKey:     func(m smMsg) string { return m.ID },
		Event:        func(m smMsg) string { return m.Event },
		CurrentState: func(m smMsg) string { return m.State },
	}
	durable, err := NewDurableOrchestrator[smMsg](NewInMemoryExecutionRecordStore[smMsg](), nil, nil)
	if err != nil {
		t.Fatalf("new durable orchestrator: %v", err)
	}
	sm, err := NewStateMachine(cfg, store, req, guards, actions, WithOrchestrator[smMsg](durable))
	if err != nil {
		t.Fatalf("expected state machine build success: %v", err)
	}

	res, err := sm.ApplyEvent(context.Background(), ApplyEventRequest[smMsg]{
		EntityID: "1",
		Event:    "approve",
		Msg:      smMsg{ID: "1", State: "draft", Event: "approve", Number: 2},
	})
	if err != nil {
		t.Fatalf("expected apply event success: %v", err)
	}
	if res == nil || res.Transition == nil {
		t.Fatalf("expected transition envelope")
	}
	if res.Transition.PreviousState != "draft" {
		t.Fatalf("expected previous state draft, got %s", res.Transition.PreviousState)
	}
	if res.Transition.CurrentState != "approved" {
		t.Fatalf("expected current state approved, got %s", res.Transition.CurrentState)
	}
	if len(res.Transition.Effects) != 1 {
		t.Fatalf("expected 1 effect, got %d", len(res.Transition.Effects))
	}
	if actionCalled {
		t.Fatalf("expected no inline action execution")
	}

	effect, ok := res.Transition.Effects[0].(CommandEffect)
	if !ok {
		t.Fatalf("expected command effect")
	}
	if effect.ActionID != "mark" {
		t.Fatalf("expected action id mark, got %s", effect.ActionID)
	}

	rec, err := store.Load(context.Background(), "1")
	if err != nil {
		t.Fatalf("load state failed: %v", err)
	}
	if rec == nil || rec.State != "approved" {
		t.Fatalf("expected persisted approved state")
	}
	if rec.Version != 1 {
		t.Fatalf("expected version 1, got %d", rec.Version)
	}
	if rec.MachineID != "order" {
		t.Fatalf("expected machine id pinning, got %q", rec.MachineID)
	}
	if rec.MachineVersion != "v1" {
		t.Fatalf("expected machine version v1, got %q", rec.MachineVersion)
	}

	outbox := store.OutboxEntries()
	if len(outbox) != 1 {
		t.Fatalf("expected one outbox entry, got %d", len(outbox))
	}
	if outbox[0].Status != "pending" {
		t.Fatalf("expected pending outbox status")
	}
}

func TestStateMachineGuardBlocks(t *testing.T) {
	cfg := StateMachineConfig{
		Entity:          "order",
		ExecutionPolicy: ExecutionPolicyLightweight,
		States:          []StateConfig{{Name: "draft", Initial: true}, {Name: "approved"}},
		Transitions: []TransitionConfig{
			{Name: "approve", From: "draft", To: "approved", Guard: "is_even"},
		},
	}
	store := NewInMemoryStateStore()
	guards := NewGuardRegistry[smMsg]()
	guards.Register("is_even", func(m smMsg) bool { return m.Number%2 == 0 })
	req := TransitionRequest[smMsg]{
		StateKey:     func(m smMsg) string { return m.ID },
		Event:        func(m smMsg) string { return m.Event },
		CurrentState: func(m smMsg) string { return m.State },
	}
	sm, _ := NewStateMachine(cfg, store, req, guards, nil)
	err := sm.Execute(context.Background(), smMsg{ID: "1", Event: "approve", State: "draft", Number: 3})
	if err == nil {
		t.Fatalf("expected guard to block")
	}
	if runtimeErrorCode(err) != ErrCodeGuardRejected {
		t.Fatalf("expected guard rejected code, got %s", runtimeErrorCode(err))
	}
}

func TestStateMachineExecuteNoImplicitIdentityFallback(t *testing.T) {
	cfg := StateMachineConfig{
		Entity:          "order",
		ExecutionPolicy: ExecutionPolicyLightweight,
		States:          []StateConfig{{Name: "draft", Initial: true}, {Name: "approved"}},
		Transitions:     []TransitionConfig{{Name: "approve", From: "draft", To: "approved"}},
	}
	req := TransitionRequest[smMsg]{
		StateKey:     func(smMsg) string { return "" },
		Event:        func(m smMsg) string { return m.Event },
		CurrentState: func(m smMsg) string { return m.State },
	}
	sm, err := NewStateMachine(cfg, NewInMemoryStateStore(), req, nil, nil)
	if err != nil {
		t.Fatalf("build state machine: %v", err)
	}
	err = sm.Execute(context.Background(), smMsg{Event: "approve", State: "draft"})
	if err == nil {
		t.Fatalf("expected missing identity error")
	}
	if runtimeErrorCode(err) != ErrCodePreconditionFailed {
		t.Fatalf("expected precondition code, got %s", runtimeErrorCode(err))
	}
}

func TestStateMachineSnapshotRequiresEntityID(t *testing.T) {
	cfg := StateMachineConfig{
		Entity:          "order",
		ExecutionPolicy: ExecutionPolicyLightweight,
		States:          []StateConfig{{Name: "draft", Initial: true}},
		Transitions:     nil,
	}
	req := TransitionRequest[smMsg]{StateKey: func(m smMsg) string { return m.ID }}
	sm, err := NewStateMachine(cfg, NewInMemoryStateStore(), req, nil, nil)
	if err != nil {
		t.Fatalf("build state machine: %v", err)
	}
	_, err = sm.Snapshot(context.Background(), SnapshotRequest[smMsg]{})
	if err == nil {
		t.Fatalf("expected error")
	}
	if runtimeErrorCode(err) != ErrCodePreconditionFailed {
		t.Fatalf("expected precondition code, got %s", runtimeErrorCode(err))
	}
}

func TestExecutionContextPlumbedToGuardAndDynamicResolver(t *testing.T) {
	def := &MachineDefinition{
		ID:      "orders",
		Version: "2",
		States:  []StateDefinition{{Name: "draft", Initial: true}, {Name: "approved"}},
		Transitions: []TransitionDefinition{{
			ID:        "approve",
			Event:     "approve",
			From:      "draft",
			DynamicTo: &DynamicTargetDefinition{Resolver: "next_state"},
			Guards:    []GuardDefinition{{Type: "resolver", Ref: "can_approve"}},
		}},
	}

	var guardExec ExecutionContext
	var resolverExec ExecutionContext
	reg := NewResolverMap[smMsg]()
	reg.RegisterGuard("can_approve", func(_ context.Context, _ smMsg, execCtx ExecutionContext) error {
		guardExec = execCtx
		if execCtx.ActorID == "" {
			return cloneRuntimeError(ErrGuardRejected, "missing actor", nil, nil)
		}
		return nil
	})
	reg.RegisterDynamicTarget("next_state", func(_ context.Context, _ smMsg, execCtx ExecutionContext) (string, error) {
		resolverExec = execCtx
		return "approved", nil
	})

	store := NewInMemoryStateStore()
	req := TransitionRequest[smMsg]{
		StateKey:     func(m smMsg) string { return m.ID },
		CurrentState: func(m smMsg) string { return m.State },
		Event:        func(m smMsg) string { return m.Event },
	}
	sm, err := NewStateMachineFromDefinition(def, store, req, reg, nil, WithExecutionPolicy[smMsg](ExecutionPolicyLightweight))
	if err != nil {
		t.Fatalf("build state machine: %v", err)
	}

	res, err := sm.ApplyEvent(context.Background(), ApplyEventRequest[smMsg]{
		EntityID: "1",
		Event:    "approve",
		Msg:      smMsg{ID: "1", State: "draft", Event: "approve"},
		ExecCtx:  ExecutionContext{ActorID: "user-1", Roles: []string{"admin"}, Tenant: "acme"},
	})
	if err != nil {
		t.Fatalf("apply event failed: %v", err)
	}
	if res.Transition.CurrentState != "approved" {
		t.Fatalf("expected approved, got %s", res.Transition.CurrentState)
	}
	if guardExec.ActorID != "user-1" || guardExec.Tenant != "acme" {
		t.Fatalf("guard did not receive execution context")
	}
	if resolverExec.ActorID != "user-1" || resolverExec.Tenant != "acme" {
		t.Fatalf("resolver did not receive execution context")
	}
}

func TestStateMachineGuardShortCircuit(t *testing.T) {
	def := &MachineDefinition{
		ID:      "orders",
		Version: "2",
		States:  []StateDefinition{{Name: "draft", Initial: true}, {Name: "approved"}},
		Transitions: []TransitionDefinition{{
			ID:    "approve",
			Event: "approve",
			From:  "draft",
			To:    "approved",
			Guards: []GuardDefinition{
				{Type: "resolver", Ref: "first"},
				{Type: "resolver", Ref: "second"},
			},
		}},
	}

	calls := 0
	reg := NewResolverMap[smMsg]()
	reg.RegisterGuard("first", func(context.Context, smMsg, ExecutionContext) error {
		calls++
		return cloneRuntimeError(ErrGuardRejected, "first rejected", nil, nil)
	})
	reg.RegisterGuard("second", func(context.Context, smMsg, ExecutionContext) error {
		calls++
		return nil
	})

	req := TransitionRequest[smMsg]{
		StateKey:     func(m smMsg) string { return m.ID },
		CurrentState: func(m smMsg) string { return m.State },
		Event:        func(m smMsg) string { return m.Event },
	}
	sm, err := NewStateMachineFromDefinition(def, NewInMemoryStateStore(), req, reg, nil, WithExecutionPolicy[smMsg](ExecutionPolicyLightweight))
	if err != nil {
		t.Fatalf("build state machine: %v", err)
	}

	_, err = sm.ApplyEvent(context.Background(), ApplyEventRequest[smMsg]{
		EntityID: "1",
		Event:    "approve",
		Msg:      smMsg{ID: "1", State: "draft", Event: "approve"},
	})
	if err == nil {
		t.Fatalf("expected guard rejection")
	}
	if runtimeErrorCode(err) != ErrCodeGuardRejected {
		t.Fatalf("expected guard code, got %s", runtimeErrorCode(err))
	}
	if calls != 1 {
		t.Fatalf("expected short-circuit after first guard, calls=%d", calls)
	}
}

func TestStateMachinePreconditionsExpectedStateAndVersion(t *testing.T) {
	cfg := StateMachineConfig{
		Entity:          "order",
		ExecutionPolicy: ExecutionPolicyLightweight,
		States:          []StateConfig{{Name: "draft", Initial: true}, {Name: "approved"}},
		Transitions:     []TransitionConfig{{Name: "approve", From: "draft", To: "approved"}},
	}
	store := NewInMemoryStateStore()
	_, err := store.SaveIfVersion(context.Background(), &StateRecord{EntityID: "1", State: "draft"}, 0)
	if err != nil {
		t.Fatalf("seed state failed: %v", err)
	}

	req := TransitionRequest[smMsg]{
		StateKey:     func(m smMsg) string { return m.ID },
		CurrentState: func(m smMsg) string { return m.State },
		Event:        func(m smMsg) string { return m.Event },
	}
	sm, err := NewStateMachine(cfg, store, req, nil, nil)
	if err != nil {
		t.Fatalf("build state machine: %v", err)
	}

	_, err = sm.ApplyEvent(context.Background(), ApplyEventRequest[smMsg]{
		EntityID:      "1",
		Event:         "approve",
		Msg:           smMsg{ID: "1", Event: "approve"},
		ExpectedState: "approved",
	})
	if err == nil {
		t.Fatalf("expected state precondition failure")
	}
	if runtimeErrorCode(err) != ErrCodePreconditionFailed {
		t.Fatalf("expected precondition code, got %s", runtimeErrorCode(err))
	}

	_, err = sm.ApplyEvent(context.Background(), ApplyEventRequest[smMsg]{
		EntityID:        "1",
		Event:           "approve",
		Msg:             smMsg{ID: "1", Event: "approve"},
		ExpectedVersion: 9,
	})
	if err == nil {
		t.Fatalf("expected version precondition failure")
	}
	if runtimeErrorCode(err) != ErrCodePreconditionFailed {
		t.Fatalf("expected precondition code, got %s", runtimeErrorCode(err))
	}
}

func TestStateMachineMachineVersionPinningMismatch(t *testing.T) {
	cfg := StateMachineConfig{
		Entity:          "order",
		ExecutionPolicy: ExecutionPolicyLightweight,
		States:          []StateConfig{{Name: "draft", Initial: true}, {Name: "approved"}},
		Transitions:     []TransitionConfig{{Name: "approve", From: "draft", To: "approved"}},
	}
	store := NewInMemoryStateStore()
	_, err := store.SaveIfVersion(context.Background(), &StateRecord{
		EntityID:       "1",
		State:          "draft",
		MachineID:      "order",
		MachineVersion: "legacy",
	}, 0)
	if err != nil {
		t.Fatalf("seed state failed: %v", err)
	}
	req := TransitionRequest[smMsg]{
		StateKey: func(m smMsg) string { return m.ID },
		Event:    func(m smMsg) string { return m.Event },
	}
	sm, err := NewStateMachine(cfg, store, req, nil, nil)
	if err != nil {
		t.Fatalf("build state machine: %v", err)
	}
	_, err = sm.ApplyEvent(context.Background(), ApplyEventRequest[smMsg]{
		EntityID: "1",
		Event:    "approve",
		Msg:      smMsg{ID: "1", Event: "approve"},
	})
	if err == nil {
		t.Fatalf("expected machine version mismatch")
	}
	if runtimeErrorCode(err) != ErrCodePreconditionFailed {
		t.Fatalf("expected precondition code, got %s", runtimeErrorCode(err))
	}
}

func TestStateMachineConcurrentVersionConflict(t *testing.T) {
	def := &MachineDefinition{
		ID:      "orders",
		Version: "v2",
		States:  []StateDefinition{{Name: "draft", Initial: true}, {Name: "approved"}},
		Transitions: []TransitionDefinition{{
			ID:     "approve",
			Event:  "approve",
			From:   "draft",
			To:     "approved",
			Guards: []GuardDefinition{{Type: "resolver", Ref: "barrier"}},
		}},
	}
	store := NewInMemoryStateStore()
	_, err := store.SaveIfVersion(context.Background(), &StateRecord{EntityID: "1", State: "draft"}, 0)
	if err != nil {
		t.Fatalf("seed state failed: %v", err)
	}

	release := make(chan struct{})
	var arrived atomic.Int32
	reg := NewResolverMap[smMsg]()
	reg.RegisterGuard("barrier", func(context.Context, smMsg, ExecutionContext) error {
		if arrived.Add(1) == 2 {
			close(release)
		}
		<-release
		return nil
	})

	req := TransitionRequest[smMsg]{StateKey: func(m smMsg) string { return m.ID }, Event: func(m smMsg) string { return m.Event }}
	sm, err := NewStateMachineFromDefinition(def, store, req, reg, nil, WithExecutionPolicy[smMsg](ExecutionPolicyLightweight))
	if err != nil {
		t.Fatalf("build state machine: %v", err)
	}

	results := make(chan error, 2)
	apply := func() {
		_, err := sm.ApplyEvent(context.Background(), ApplyEventRequest[smMsg]{
			EntityID: "1",
			Event:    "approve",
			Msg:      smMsg{ID: "1", Event: "approve"},
		})
		results <- err
	}
	go apply()
	go apply()

	err1 := <-results
	err2 := <-results

	conflicts := 0
	success := 0
	for _, err := range []error{err1, err2} {
		switch {
		case err == nil:
			success++
		case runtimeErrorCode(err) == ErrCodeVersionConflict:
			conflicts++
		default:
			t.Fatalf("unexpected error: %v", err)
		}
	}
	if success != 1 || conflicts != 1 {
		t.Fatalf("expected one success and one version conflict, success=%d conflicts=%d", success, conflicts)
	}
}

func TestRuntimeErrorCodesAreStable(t *testing.T) {
	if ErrInvalidTransition.TextCode != ErrCodeInvalidTransition {
		t.Fatalf("unexpected invalid transition code: %s", ErrInvalidTransition.TextCode)
	}
	if ErrGuardRejected.TextCode != ErrCodeGuardRejected {
		t.Fatalf("unexpected guard rejected code: %s", ErrGuardRejected.TextCode)
	}
	if ErrStateNotFound.TextCode != ErrCodeStateNotFound {
		t.Fatalf("unexpected state not found code: %s", ErrStateNotFound.TextCode)
	}
	if ErrVersionConflict.TextCode != ErrCodeVersionConflict {
		t.Fatalf("unexpected version conflict code: %s", ErrVersionConflict.TextCode)
	}
	if ErrPreconditionFailed.TextCode != ErrCodePreconditionFailed {
		t.Fatalf("unexpected precondition failed code: %s", ErrPreconditionFailed.TextCode)
	}
}

func TestWithLoggerAndFmtLoggerFallback(t *testing.T) {
	cfg := StateMachineConfig{
		Entity:          "order",
		ExecutionPolicy: ExecutionPolicyLightweight,
		States:          []StateConfig{{Name: "draft", Initial: true}, {Name: "approved"}},
		Transitions:     []TransitionConfig{{Name: "approve", From: "draft", To: "approved"}},
	}
	req := TransitionRequest[smMsg]{
		StateKey:     func(m smMsg) string { return m.ID },
		Event:        func(m smMsg) string { return m.Event },
		CurrentState: func(m smMsg) string { return m.State },
	}

	buf := &bytes.Buffer{}
	fallback := NewFmtLogger(buf)
	sm, err := NewStateMachine(cfg, NewInMemoryStateStore(), req, nil, nil, WithLogger[smMsg](fallback))
	if err != nil {
		t.Fatalf("build state machine: %v", err)
	}
	_, err = sm.ApplyEvent(context.Background(), ApplyEventRequest[smMsg]{
		EntityID: "1",
		Event:    "approve",
		Msg:      smMsg{ID: "1", State: "draft", Event: "approve"},
	})
	if err != nil {
		t.Fatalf("apply event failed: %v", err)
	}
	if buf.Len() == 0 {
		t.Fatalf("expected fallback logger output")
	}

	custom := &memoryLogger{}
	sm2, err := NewStateMachine(cfg, NewInMemoryStateStore(), req, nil, nil, WithLogger[smMsg](custom))
	if err != nil {
		t.Fatalf("build state machine: %v", err)
	}
	_, err = sm2.ApplyEvent(context.Background(), ApplyEventRequest[smMsg]{
		EntityID: "2",
		Event:    "approve",
		Msg:      smMsg{ID: "2", State: "draft", Event: "approve"},
	})
	if err != nil {
		t.Fatalf("apply event failed: %v", err)
	}
	if custom.count() == 0 {
		t.Fatalf("expected custom logger to receive entries")
	}
	if custom.lastField("entity_id") != "2" {
		t.Fatalf("expected structured fields propagation")
	}
}

type memoryLogger struct {
	sink   *memoryLogSink
	ctx    context.Context
	fields map[string]any
}

type memoryLogSink struct {
	mu     sync.Mutex
	logs   []string
	fields map[string]any
}

func (l *memoryLogger) Trace(msg string, args ...any) { l.append(msg) }
func (l *memoryLogger) Debug(msg string, args ...any) { l.append(msg) }
func (l *memoryLogger) Info(msg string, args ...any)  { l.append(msg) }
func (l *memoryLogger) Warn(msg string, args ...any)  { l.append(msg) }
func (l *memoryLogger) Error(msg string, args ...any) { l.append(msg) }
func (l *memoryLogger) Fatal(msg string, args ...any) { l.append(msg) }

func (l *memoryLogger) WithContext(ctx context.Context) Logger {
	if l == nil {
		return &memoryLogger{sink: &memoryLogSink{}}
	}
	if l.sink == nil {
		l.sink = &memoryLogSink{}
	}
	cp := *l
	cp.ctx = ctx
	return &cp
}

func (l *memoryLogger) WithFields(fields map[string]any) Logger {
	if l == nil {
		return &memoryLogger{sink: &memoryLogSink{}, fields: copyMap(fields)}
	}
	if l.sink == nil {
		l.sink = &memoryLogSink{}
	}
	cp := *l
	cp.fields = mergeFields(l.fields, fields)
	cp.sink.mu.Lock()
	cp.sink.fields = mergeFields(cp.sink.fields, fields)
	cp.sink.mu.Unlock()
	return &cp
}

func (l *memoryLogger) append(msg string) {
	if l == nil {
		return
	}
	if l.sink == nil {
		l.sink = &memoryLogSink{}
	}
	l.sink.mu.Lock()
	defer l.sink.mu.Unlock()
	l.sink.logs = append(l.sink.logs, msg)
}

func (l *memoryLogger) count() int {
	if l == nil || l.sink == nil {
		return 0
	}
	l.sink.mu.Lock()
	defer l.sink.mu.Unlock()
	return len(l.sink.logs)
}

func (l *memoryLogger) lastField(key string) any {
	if l == nil || l.sink == nil {
		return nil
	}
	l.sink.mu.Lock()
	defer l.sink.mu.Unlock()
	return l.sink.fields[key]
}

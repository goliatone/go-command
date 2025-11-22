package flow

import (
	"context"
	"testing"
)

type smMsg struct {
	ID     string
	Event  string
	State  string
	Number int
}

func (smMsg) Type() string { return "smMsg" }

func TestStateMachineTransitionsAndGuards(t *testing.T) {
	cfg := StateMachineConfig{
		Entity: "order",
		States: []StateConfig{
			{Name: "draft", Initial: true},
			{Name: "approved"},
		},
		Transitions: []TransitionConfig{
			{Name: "approve", From: "draft", To: "approved", Guard: "is_even", Action: "mark"},
		},
	}
	store := NewInMemoryStateStore()
	guards := NewGuardRegistry[smMsg]()
	guards.Register("is_even", func(m smMsg) bool { return m.Number%2 == 0 })
	actions := NewActionRegistry[smMsg]()
	var actionCalled bool
	actions.Register("mark", func(context.Context, smMsg) error {
		actionCalled = true
		return nil
	})
	req := TransitionRequest[smMsg]{
		StateKey: func(m smMsg) string { return m.ID },
		Event:    func(m smMsg) string { return m.Event },
	}
	sm, err := NewStateMachine(cfg, store, req, guards, actions)
	if err != nil {
		t.Fatalf("expected state machine build success: %v", err)
	}

	if err := sm.Execute(context.Background(), smMsg{ID: "1", Event: "approve", Number: 2}); err != nil {
		t.Fatalf("expected transition success: %v", err)
	}
	state, _ := store.Load(context.Background(), "1")
	if state != "approved" {
		t.Fatalf("expected state approved, got %s", state)
	}
	if !actionCalled {
		t.Fatalf("expected action called")
	}
}

func TestStateMachineGuardBlocks(t *testing.T) {
	cfg := StateMachineConfig{
		Entity: "order",
		States: []StateConfig{{Name: "draft", Initial: true}, {Name: "approved"}},
		Transitions: []TransitionConfig{
			{Name: "approve", From: "draft", To: "approved", Guard: "is_even"},
		},
	}
	store := NewInMemoryStateStore()
	guards := NewGuardRegistry[smMsg]()
	guards.Register("is_even", func(m smMsg) bool { return m.Number%2 == 0 })
	req := TransitionRequest[smMsg]{StateKey: func(m smMsg) string { return m.ID }, Event: func(m smMsg) string { return m.Event }}
	sm, _ := NewStateMachine(cfg, store, req, guards, nil)
	err := sm.Execute(context.Background(), smMsg{ID: "1", Event: "approve", Number: 3})
	if err == nil {
		t.Fatalf("expected guard to block")
	}
}

func TestStateMachineUsesCurrentStateFallback(t *testing.T) {
	cfg := StateMachineConfig{
		Entity: "order",
		States: []StateConfig{{Name: "draft", Initial: true}, {Name: "approved"}},
		Transitions: []TransitionConfig{
			{Name: "approve", From: "approved", To: "approved"},
		},
	}
	store := NewInMemoryStateStore()
	req := TransitionRequest[smMsg]{
		StateKey:     func(m smMsg) string { return m.ID },
		Event:        func(m smMsg) string { return m.Event },
		CurrentState: func(m smMsg) string { return m.State },
	}
	sm, _ := NewStateMachine(cfg, store, req, nil, nil)
	err := sm.Execute(context.Background(), smMsg{ID: "1", Event: "approve", State: "approved"})
	if err != nil {
		t.Fatalf("expected success with fallback state: %v", err)
	}
}

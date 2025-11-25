package flow

import (
	"context"
	"testing"
)

type condMsg struct {
	Value int
}

func (condMsg) Type() string { return "condMsg" }

func TestConditionalExecutorPredicate(t *testing.T) {
	var called bool
	exec := NewConditionalExecutor[condMsg]([]Conditional[condMsg]{
		{
			Predicate: func(m condMsg) bool { return m.Value == 1 },
			Handler: func(context.Context, condMsg) error {
				called = true
				return nil
			},
		},
	})

	if err := exec.Execute(context.Background(), condMsg{Value: 1}); err != nil {
		t.Fatalf("expected no error: %v", err)
	}
	if !called {
		t.Fatalf("expected handler called")
	}
}

func TestConditionalExecutorGuard(t *testing.T) {
	reg := NewGuardRegistry[condMsg]()
	reg.Register("is_even", func(m condMsg) bool { return m.Value%2 == 0 })
	exec := NewConditionalExecutor[condMsg]([]Conditional[condMsg]{
		{
			Guard: "is_even",
			Handler: func(context.Context, condMsg) error {
				return nil
			},
		},
	}, WithGuardRegistry(reg))

	if err := exec.Execute(context.Background(), condMsg{Value: 2}); err != nil {
		t.Fatalf("expected guard to pass: %v", err)
	}
}

func TestConditionalExecutorDefault(t *testing.T) {
	var called bool
	exec := NewConditionalExecutor[condMsg]([]Conditional[condMsg]{}, WithDefaultHandler(func(context.Context, condMsg) error {
		called = true
		return nil
	}))

	if err := exec.Execute(context.Background(), condMsg{Value: 3}); err != nil {
		t.Fatalf("expected default handler: %v", err)
	}
	if !called {
		t.Fatalf("expected default handler called")
	}
}

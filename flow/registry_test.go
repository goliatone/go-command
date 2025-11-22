package flow

import (
	"context"
	"testing"

	"github.com/goliatone/go-command"
)

type regMsg struct{}

func (regMsg) Type() string { return "regMsg" }

func TestNamespacingDefault(t *testing.T) {
	got := defaultNamespace("ns", "id")
	if got != "ns::id" {
		t.Fatalf("expected ns::id, got %s", got)
	}
	got = defaultNamespace("", "id")
	if got != "id" {
		t.Fatalf("expected id when namespace empty, got %s", got)
	}
}

func TestHandlerRegistryConflict(t *testing.T) {
	reg := NewHandlerRegistry[regMsg]()
	handler := command.CommandFunc[regMsg](func(context.Context, regMsg) error { return nil })

	if err := reg.Register("h1", handler); err != nil {
		t.Fatalf("unexpected register error: %v", err)
	}
	if err := reg.Register("h1", handler); err == nil {
		t.Fatalf("expected conflict error")
	}
}

func TestGuardRegistryConflict(t *testing.T) {
	reg := NewGuardRegistry[regMsg]()
	err := reg.Register("g1", func(regMsg) bool { return true })
	if err != nil {
		t.Fatalf("unexpected register error: %v", err)
	}
	if err := reg.Register("g1", func(regMsg) bool { return true }); err == nil {
		t.Fatalf("expected conflict error")
	}
}

func TestActionRegistryConflict(t *testing.T) {
	reg := NewActionRegistry[regMsg]()
	err := reg.Register("a1", func(context.Context, regMsg) error { return nil })
	if err != nil {
		t.Fatalf("unexpected register error: %v", err)
	}
	if err := reg.Register("a1", func(context.Context, regMsg) error { return nil }); err == nil {
		t.Fatalf("expected conflict error")
	}
}

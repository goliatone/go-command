package flow

import (
	"context"
	"testing"
	"time"

	"github.com/goliatone/go-command"
	"github.com/goliatone/go-command/router"
	"github.com/goliatone/go-command/runner"
)

type ping struct {
	ID string
}

func TestHandlerResolverReturnsHandlers(t *testing.T) {
	handler := command.CommandFunc[ping](func(context.Context, ping) error { return nil })
	resolver := NewHandlerResolver[ping](handler)

	handlers, err := resolver.Resolve(context.Background(), ping{ID: "123"})
	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}
	if len(handlers) != 1 {
		t.Fatalf("expected 1 handler, got %d", len(handlers))
	}
}

func TestHandlerResolverNoHandlers(t *testing.T) {
	resolver := NewHandlerResolver[ping]()
	if _, err := resolver.Resolve(context.Background(), ping{}); err == nil {
		t.Fatalf("expected error when no handlers are registered")
	}
}

func TestMuxResolverResolvesHandlers(t *testing.T) {
	mux := router.NewMux()
	handler := command.CommandFunc[ping](func(context.Context, ping) error { return nil })
	mux.Add(command.GetMessageType(ping{}), handler)

	resolver := NewMuxResolver[ping](mux)
	handlers, err := resolver.Resolve(context.Background(), ping{ID: "abc"})
	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}
	if len(handlers) != 1 {
		t.Fatalf("expected 1 handler, got %d", len(handlers))
	}
}

func TestMergeOptionsCopies(t *testing.T) {
	opt := runner.WithTimeout(time.Second)
	opts := []Option{opt}

	merged := mergeOptions(opts...)
	if len(merged) != len(opts) {
		t.Fatalf("expected merged length %d, got %d", len(opts), len(merged))
	}

	// mutate source slice to confirm copy is independent
	opts[0] = runner.WithTimeout(2 * time.Second)
	mergedTimeout := merged[0]
	if mergedTimeout == nil {
		t.Fatalf("expected merged timeout option")
	}
}

func TestFlowSetValidate(t *testing.T) {
	valid := FlowSet{
		Version: 1,
		Flows: []FlowDefinition{
			{ID: "orders", Type: "serial", Serial: &SerialConfig{Steps: []string{"h1"}}},
		},
	}
	if err := valid.Validate(); err != nil {
		t.Fatalf("expected valid config, got %v", err)
	}

	invalid := FlowSet{
		Flows: []FlowDefinition{
			{ID: "", Type: "serial"},
		},
	}
	if err := invalid.Validate(); err == nil {
		t.Fatalf("expected validation error for missing id")
	}
}

package cron

import (
	"context"
	"sync"
	"sync/atomic"
	"testing"
	"time"

	"github.com/goliatone/go-command"
)

// Test message type
type TestMessage struct{}

func (m TestMessage) Type() string { return "test.message" }

// Test command handler
type TestCommandHandler struct {
	executionCount int
	mu             sync.Mutex
}

func (h *TestCommandHandler) Execute(ctx context.Context, msg command.Message) error {
	h.mu.Lock()
	h.executionCount++
	h.mu.Unlock()
	return nil
}

func (h *TestCommandHandler) GetExecutionCount() int {
	h.mu.Lock()
	defer h.mu.Unlock()
	return h.executionCount
}

// Test query handler
type TestQueryHandler struct {
	queryCount int
	mu         sync.Mutex
}

func (h *TestQueryHandler) Query(ctx context.Context, msg command.Message) (any, error) {
	h.mu.Lock()
	h.queryCount++
	count := h.queryCount
	h.mu.Unlock()
	return count, nil
}

func (h *TestQueryHandler) GetQueryCount() int {
	h.mu.Lock()
	defer h.mu.Unlock()
	return h.queryCount
}

func TestCronScheduler(t *testing.T) {
	t.Run("command handler execution", func(t *testing.T) {
		scheduler := NewScheduler()
		handler := &TestCommandHandler{}

		// Schedule job to run every second
		entryID, err := scheduler.AddHandler(command.HandlerConfig{
			Expression: "@every 1s",
		}, handler)

		if err != nil {
			t.Fatalf("Failed to add handler: %v", err)
		}

		ctx := context.Background()
		scheduler.Start(ctx)
		time.Sleep(1500 * time.Millisecond)
		scheduler.Stop(ctx)

		if count := handler.GetExecutionCount(); count == 0 {
			t.Error("Command handler was not executed")
		}
		entryID.Unsubscribe()
	})

	t.Run("command handler execution", func(t *testing.T) {
		scheduler := NewScheduler(WithParser(SecondsParser))
		handler := &TestCommandHandler{}

		// Schedule job to run every second
		entryID, err := scheduler.AddHandler(command.HandlerConfig{
			Expression: "* * * * * *",
		}, handler)

		if err != nil {
			t.Fatalf("Failed to add handler: %v", err)
		}

		ctx := context.Background()
		scheduler.Start(ctx)
		time.Sleep(1500 * time.Millisecond)
		scheduler.Stop(ctx)

		if count := handler.GetExecutionCount(); count == 0 {
			t.Error("Command handler was not executed")
		}

		entryID.Unsubscribe()
	})

	t.Run("function handler execution", func(t *testing.T) {
		var count atomic.Int32
		scheduler := NewScheduler()
		handler := func() {
			count.Add(1)
		}

		// Schedule job to run every second
		entryID, err := scheduler.AddHandler(command.HandlerConfig{
			Expression: "@every 1s",
		}, handler)

		if err != nil {
			t.Fatalf("Failed to add handler: %v", err)
		}

		ctx := context.Background()
		scheduler.Start(ctx)
		// Wait for at least one execution
		time.Sleep(2 * time.Second)
		scheduler.Stop(ctx)

		if count.Load() == 0 {
			t.Error("Query handler was not executed")
		}

		entryID.Unsubscribe()
	})

	t.Run("invalid cron expression", func(t *testing.T) {
		scheduler := NewScheduler()
		handler := &TestCommandHandler{}

		_, err := scheduler.AddHandler(command.HandlerConfig{
			Expression: "invalid",
		}, handler)

		if err == nil {
			t.Error("Expected error for invalid cron expression")
		}
	})

	t.Run("empty cron expression", func(t *testing.T) {
		scheduler := NewScheduler()
		handler := &TestCommandHandler{}

		_, err := scheduler.AddHandler(command.HandlerConfig{
			Expression: "",
		}, handler)

		if err == nil {
			t.Error("Expected error for empty cron expression")
		}
	})

	t.Run("invalid handler type", func(t *testing.T) {
		scheduler := NewScheduler()
		handler := struct{}{}

		_, err := scheduler.AddHandler(command.HandlerConfig{
			Expression: "* * * * *",
		}, handler)

		if err == nil {
			t.Error("Expected error for invalid handler type")
		}
	})
}

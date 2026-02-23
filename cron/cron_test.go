package cron

import (
	"context"
	"sync/atomic"
	"testing"
	"time"

	"github.com/goliatone/go-command"
)

func TestScheduleAfterCompletesAndReportsStatus(t *testing.T) {
	scheduler := NewScheduler()
	var count atomic.Int32

	handle, err := scheduler.ScheduleAfter(50*time.Millisecond, command.HandlerConfig{}, func() {
		count.Add(1)
	})
	if err != nil {
		t.Fatalf("schedule after: %v", err)
	}

	select {
	case <-handle.Done():
	case <-time.After(time.Second):
		t.Fatal("expected handle completion")
	}

	if got := count.Load(); got != 1 {
		t.Fatalf("expected one execution, got %d", got)
	}
	if status := handle.Status(); status != ScheduleStatusCompleted {
		t.Fatalf("expected completed status, got %s", status)
	}
}

func TestScheduleAtCancelPreventsExecution(t *testing.T) {
	scheduler := NewScheduler()
	var count atomic.Int32

	handle, err := scheduler.ScheduleAt(time.Now().Add(250*time.Millisecond), command.HandlerConfig{}, func() {
		count.Add(1)
	})
	if err != nil {
		t.Fatalf("schedule at: %v", err)
	}

	handle.Cancel()

	select {
	case <-handle.Done():
	case <-time.After(time.Second):
		t.Fatal("expected canceled handle to close done channel")
	}

	time.Sleep(300 * time.Millisecond)
	if got := count.Load(); got != 0 {
		t.Fatalf("expected zero executions after cancel, got %d", got)
	}
	if status := handle.Status(); status != ScheduleStatusCanceled {
		t.Fatalf("expected canceled status, got %s", status)
	}
}

func TestScheduleCronCancelableHandle(t *testing.T) {
	scheduler := NewScheduler()
	var count atomic.Int32

	handle, err := scheduler.ScheduleCron(command.HandlerConfig{
		Expression: "@every 1s",
	}, func() {
		count.Add(1)
	})
	if err != nil {
		t.Fatalf("schedule cron: %v", err)
	}

	if err := scheduler.Start(context.Background()); err != nil {
		t.Fatalf("scheduler start: %v", err)
	}
	defer scheduler.Stop(context.Background())

	deadline := time.After(2500 * time.Millisecond)
	for count.Load() == 0 {
		select {
		case <-deadline:
			t.Fatal("expected at least one cron run")
		default:
			time.Sleep(20 * time.Millisecond)
		}
	}

	handle.Cancel()
	select {
	case <-handle.Done():
	case <-time.After(time.Second):
		t.Fatal("expected cancel to close handle done channel")
	}

	if status := handle.Status(); status != ScheduleStatusCanceled {
		t.Fatalf("expected canceled status, got %s", status)
	}
}

func TestSchedulerStopMarksHandleStopped(t *testing.T) {
	scheduler := NewScheduler()
	handle, err := scheduler.ScheduleCron(command.HandlerConfig{
		Expression: "@every 5s",
	}, func() {})
	if err != nil {
		t.Fatalf("schedule cron: %v", err)
	}

	if err := scheduler.Start(context.Background()); err != nil {
		t.Fatalf("scheduler start: %v", err)
	}

	if err := scheduler.Stop(context.Background()); err != nil {
		t.Fatalf("scheduler stop: %v", err)
	}

	select {
	case <-handle.Done():
	case <-time.After(time.Second):
		t.Fatal("expected handle done on stop")
	}

	if status := handle.Status(); status != ScheduleStatusStopped {
		t.Fatalf("expected stopped status, got %s", status)
	}
}

func TestAddHandlerCompatibility(t *testing.T) {
	scheduler := NewScheduler()
	sub, err := scheduler.AddHandler(command.HandlerConfig{
		Expression: "@every 10s",
	}, func() {})
	if err != nil {
		t.Fatalf("add handler: %v", err)
	}

	handle, ok := sub.(Handle)
	if !ok {
		t.Fatal("expected AddHandler subscription to implement Handle")
	}
	if handle.ID() == 0 {
		t.Fatal("expected non-zero handle id")
	}
}

func TestScheduleCronValidation(t *testing.T) {
	scheduler := NewScheduler()

	if _, err := scheduler.ScheduleCron(command.HandlerConfig{}, func() {}); err == nil {
		t.Fatal("expected empty expression error")
	}

	if _, err := scheduler.ScheduleCron(command.HandlerConfig{Expression: "@every 1s"}, struct{}{}); err == nil {
		t.Fatal("expected unsupported handler error")
	}
}

package flow

import (
	"context"
	"errors"
	"testing"
	"time"

	"github.com/goliatone/go-command"
)

type testMsg struct {
	Val string
}

func (testMsg) Type() string { return "testMsg" }

type testFlow[T command.Message] struct {
	fn func(context.Context, T) error
}

func (t testFlow[T]) Execute(ctx context.Context, msg T) error {
	return t.fn(ctx, msg)
}

func TestRetryableFlowRetries(t *testing.T) {
	attempts := 0
	flow := testFlow[testMsg]{fn: func(context.Context, testMsg) error {
		attempts++
		if attempts < 2 {
			return errors.New("fail")
		}
		return nil
	}}
	retry := NewRetryableFlow[testMsg](flow, runnerNoDelay{}, 2)

	if err := retry.Execute(context.Background(), testMsg{Val: "msg"}); err != nil {
		t.Fatalf("expected success after retry, got %v", err)
	}
	if attempts != 2 {
		t.Fatalf("expected 2 attempts, got %d", attempts)
	}
}

type runnerNoDelay struct{}

func (runnerNoDelay) SleepDuration(int, error) time.Duration { return 0 }

func TestCircuitBreakerHalfOpenProbe(t *testing.T) {
	fail := errors.New("fail")
	first := true
	mainFlow := testFlow[testMsg]{fn: func(context.Context, testMsg) error {
		if first {
			first = false
			return fail
		}
		return nil
	}}
	probeFlow := testFlow[testMsg]{fn: func(context.Context, testMsg) error { return nil }}

	cb := NewCircuitBreaker[testMsg](mainFlow, 1, time.Millisecond, WithHalfOpenProbe[testMsg](probeFlow))

	if err := cb.Execute(context.Background(), testMsg{Val: "a"}); err == nil {
		t.Fatalf("expected failure on first call")
	}

	time.Sleep(2 * time.Millisecond)
	if err := cb.Execute(context.Background(), testMsg{Val: "a"}); err != nil {
		t.Fatalf("expected probe to succeed, got %v", err)
	}
}

type captureRecorder struct {
	durCalled bool
	errCalled bool
	okCalled  bool
}

func (c *captureRecorder) RecordDuration(string, time.Duration) { c.durCalled = true }
func (c *captureRecorder) RecordError(string)                   { c.errCalled = true }
func (c *captureRecorder) RecordSuccess(string)                 { c.okCalled = true }

func TestMetricsDecoratorNilSafe(t *testing.T) {
	flow := testFlow[testMsg]{fn: func(context.Context, testMsg) error { return nil }}
	deco := NewMetricsDecorator[testMsg](flow, nil)
	if err := deco.Execute(context.Background(), testMsg{Val: "a"}); err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	rec := &captureRecorder{}
	deco2 := NewMetricsDecorator[testMsg](flow, rec)
	_ = deco2.Execute(context.Background(), testMsg{Val: "a"})
	if !rec.durCalled || !rec.okCalled {
		t.Fatalf("expected recorder to capture metrics")
	}
}

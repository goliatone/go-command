package runner

import (
	"context"
	"errors"
	"fmt"
	"sync"
	"testing"
	"time"
)

func TestHandler_NoError_NoRetries(t *testing.T) {
	h := NewHandler()

	cf := countingFunc{failUntil: 0}
	h.Run(context.Background(), cf.fn)

	if cf.calls != 1 {
		t.Errorf("expected calls=1, got %d", cf.calls)
	}

	if runs := hRuns(h); runs != 1 {
		t.Errorf("Handler.runs should be 1, got %d", runs)
	}
	if hSuccess := hSuccess(h); hSuccess != 1 {
		t.Errorf("Handler.successfulRuns should be 1, got %d", hSuccess)
	}
}

func TestHandler_SuccessOnSecondAttempt(t *testing.T) {
	h := NewHandler(WithMaxRetries(3))

	cf := countingFunc{failUntil: 1}
	h.Run(context.Background(), cf.fn)

	if cf.calls != 2 {
		t.Errorf("expected calls=2, got %d", cf.calls)
	}

	if hRuns(h) != 1 {
		t.Errorf("expected Handler runs=1, got %d", hRuns(h))
	}

	if hSuccess(h) != 1 {
		t.Errorf("expected Handler successfulRuns=1, got %d", hSuccess(h))
	}
}

func TestHandler_AllAttemptsFail(t *testing.T) {
	h := NewHandler(WithMaxRetries(2))

	cf := countingFunc{failUntil: 5}
	h.Run(context.Background(), cf.fn)

	if cf.calls != 3 {
		t.Errorf("expected calls=3 (1 initial + 2 retries), got %d", cf.calls)
	}
	if hSuccess(h) != 0 {
		t.Errorf("Handler.successfulRuns should remain 0 for all fail, got %d", hSuccess(h))
	}
}

func TestHandler_RunOnce(t *testing.T) {
	h := NewHandler(WithRunOnce(true))

	cf := countingFunc{}

	h.Run(context.Background(), cf.fn)
	if cf.calls != 1 {
		t.Errorf("expected calls=1 after first run, got %d", cf.calls)
	}

	h.Run(context.Background(), cf.fn)
	if cf.calls != 1 {
		t.Errorf("expected calls=1 after second run (skipped), got %d", cf.calls)
	}

	if hSuccess(h) != 1 {
		t.Errorf("expected successfulRuns=1, got %d", hSuccess(h))
	}
}

func TestHandler_MaxRuns(t *testing.T) {
	h := NewHandler(
		WithMaxRuns(2),
		WithMaxRetries(0),
	)

	cf := countingFunc{}

	h.Run(context.Background(), cf.fn)
	if hSuccess(h) != 1 {
		t.Errorf("expected 1 success, got %d", hSuccess(h))
	}

	h.Run(context.Background(), cf.fn)
	if hSuccess(h) != 2 {
		t.Errorf("expected 2 successes, got %d", hSuccess(h))
	}

	h.Run(context.Background(), cf.fn)

	if cf.calls != 2 {
		t.Errorf("expected calls=2, got %d", cf.calls)
	}

	if hSuccess(h) != 2 {
		t.Errorf("expected successfulRuns=2, got %d", hSuccess(h))
	}
}

func TestHandler_Timeout(t *testing.T) {
	h := NewHandler(
		WithTimeout(50*time.Millisecond),
		WithMaxRetries(0),
	)

	start := time.Now()
	h.Run(context.Background(), func(ctx context.Context) error {
		select {
		case <-ctx.Done():
			return ctx.Err() // "context deadline exceeded"
		case <-time.After(500 * time.Millisecond):
			return nil
		}
	})
	elapsed := time.Since(start)

	if elapsed >= 500*time.Millisecond {
		t.Error("expected function to time out quickly, but took too long")
	}

	if hSuccess(h) != 0 {
		t.Errorf("expected 0 successful runs, got %d", hSuccess(h))
	}
}

func TestHandler_Deadline(t *testing.T) {
	deadline := time.Now().Add(50 * time.Millisecond)
	h := NewHandler(WithDeadline(deadline))

	start := time.Now()
	h.Run(context.Background(), func(ctx context.Context) error {
		select {
		case <-ctx.Done():
			return ctx.Err()
		case <-time.After(500 * time.Millisecond):
			return nil
		}
	})
	elapsed := time.Since(start)

	if elapsed >= 500*time.Millisecond {
		t.Error("expected function to stop at deadline, but took too long")
	}

	if hSuccess(h) != 0 {
		t.Errorf("expected 0 successful runs, got %d", hSuccess(h))
	}
}

func TestHandler_Concurrency(t *testing.T) {
	h := NewHandler(WithMaxRetries(1))
	wg := sync.WaitGroup{}
	const goroutines = 10

	cf := &countingFunc{failUntil: 1}

	for i := 0; i < goroutines; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			h.Run(context.Background(), cf.fn)
		}()
	}
	wg.Wait()

	if hRuns(h) != goroutines {
		t.Errorf("expected Handler.runs=%d, got %d", goroutines, hRuns(h))
	}

	if hSuccess(h) != goroutines {
		t.Errorf("expected Handler.successfulRuns=%d, got %d", goroutines, hSuccess(h))
	}

	if cf.calls < goroutines {
		t.Errorf("expected at least %d calls, got %d", goroutines, cf.calls)
	}
}

func TestHandler_Logger(t *testing.T) {
	ml := &mockLogger{}
	h := NewHandler(
		WithLogger(ml),
		WithMaxRetries(1),
	)

	cf := countingFunc{failUntil: 2}
	h.Run(context.Background(), cf.fn)

	if len(ml.errorMessages) == 0 {
		t.Error("expected some error logs, got none")
	}
}

func TestRunCommand(t *testing.T) {
	c := &mockCommander{failMax: 1}
	msg := testMessage{name: "createUser"}
	h := NewHandler(WithMaxRetries(2))

	RunCommand(context.Background(), h, c, msg)

	if c.callCount < 2 {
		t.Errorf("expected at least 2 calls, got %d", c.callCount)
	}
	if hSuccess(h) != 1 {
		t.Errorf("expected 1 successful run, got %d", hSuccess(h))
	}
}

func TestRunQuery(t *testing.T) {
	q := &mockQuerier{
		failMax: 1,
		result:  "Hello, World!",
	}
	msg := testMessage{name: "fetchGreeting"}
	h := NewHandler(WithMaxRetries(2))

	res, err := RunQuery(context.Background(), h, q, msg)
	if err != nil {
		t.Errorf("unexpected error: %v", err)
	}

	if res != "Hello, World!" {
		t.Errorf("expected result='Hello, World!', got '%s'", res)
	}

	if q.callCount < 2 {
		t.Errorf("expected at least 2 calls to Querier, got %d", q.callCount)
	}

	if hSuccess(h) != 1 {
		t.Errorf("expected 1 successful run, got %d", hSuccess(h))
	}
}

func hRuns(h *Handler) int {
	hMu := h
	hMu.MuLock()
	defer hMu.MuUnlock()
	return hMuRuns(hMu)
}

func hSuccess(h *Handler) int {
	hMu := h
	hMu.MuLock()
	defer hMu.MuUnlock()
	return hMuSuccess(hMu)
}

func (h *Handler) MuLock() {
	h.mu.Lock()
}

func (h *Handler) MuUnlock() {
	h.mu.Unlock()
}

func hMuRuns(h *Handler) int {
	return h.runs
}

func hMuSuccess(h *Handler) int {
	return h.successfulRuns
}

type mockLogger struct {
	infoMessages  []string
	errorMessages []string
}

func (m *mockLogger) Info(msg string, args ...any) {
	fmt.Printf("[INF] mock: "+msg+"\n", args...)
	m.infoMessages = append(m.infoMessages, fmt.Sprintf(msg, args...))
}

func (m *mockLogger) Error(msg string, args ...any) {
	fmt.Printf("[ERR] mock: "+msg+"\n", args...)
	m.errorMessages = append(m.errorMessages, fmt.Sprintf(msg, args...))
}

type testMessage struct {
	name string
}

func (t testMessage) Type() string {
	return t.name
}

func (t testMessage) Validate() error {
	return nil
}

type mockCommander struct {
	callCount int
	failMax   int // number of times to fail before succeeding
}

func (m *mockCommander) Execute(ctx context.Context, msg testMessage) error {
	m.callCount++
	if m.callCount <= m.failMax {
		return errors.New("mockCommander forced failure")
	}
	return nil
}

type mockQuerier struct {
	callCount int
	failMax   int
	result    string
}

func (m *mockQuerier) Query(ctx context.Context, msg testMessage) (string, error) {
	m.callCount++
	if m.callCount <= m.failMax {
		return "", errors.New("mockQuerier forced failure")
	}
	return m.result, nil
}

func noErrorFunc(_ context.Context) error {
	return nil
}

type countingFunc struct {
	calls     int
	failUntil int // fail this many times, then succeed
}

func (cf *countingFunc) fn(_ context.Context) error {
	cf.calls++
	fmt.Printf("[FNC] count: %d\n", cf.calls)
	if cf.calls <= cf.failUntil {
		return fmt.Errorf("forced error attempt %d", cf.calls)
	}
	return nil
}

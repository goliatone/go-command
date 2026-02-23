package runner

import (
	"context"
	"fmt"
	"log"
	"sync"
	"time"

	"github.com/goliatone/go-command"
	"github.com/goliatone/go-errors"
)

// Logger interface shared across packages
type Logger interface {
	Info(msg string, args ...any)
	Error(msg string, args ...any)
}

// Handler wraps configuration options so that we can later
// call a function with known behavior in terms of handling
// errors, rtries, timeouts, etc
// We do so by providing a Run method:
//
//	Run(ctx context.Context, fn func(context.Context) error)
//
// This ensures consistent execution behavior
type Handler struct {
	mu sync.Mutex

	logger        Logger
	errorHandler  func(error)
	doneHandler   func(r *Handler)
	retryStrategy RetryStrategy
	control       ExecutionControl
	middleware    []Middleware

	EntryID        int
	runs           int
	successfulRuns int

	maxRuns             int
	maxRetries          int
	timeout             time.Duration
	noTimeout           bool
	deadline            time.Time
	runOnce             bool
	exitOnError         bool
	panicHandler        func(funcName string, fields ...map[string]any)
	panicContextBuilder func(ctx context.Context, reqCtx map[string]any)
}

// NewHandler constructs a Runner from various options, applying defaults if unset.
func NewHandler(opts ...Option) *Handler {
	r := &Handler{
		errorHandler: func(err error) {
			log.Printf("error: %v\n", err)
		},
		doneHandler: func(r *Handler) {
			log.Printf("runner done: %d\n", r.EntryID)
		},
		retryStrategy: NoDelayStrategy{},
		control:       noopExecutionControl{},
		panicHandler:  command.MakePanicHandler(command.DefaultPanicLogger),
		panicContextBuilder: func(ctx context.Context, m map[string]any) {
			if requestID, ok := ctx.Value("request_id").(string); ok {
				m["request_id"] = requestID
			}
		},
	}

	for _, o := range opts {
		if o != nil {
			o(r)
		}
	}
	return r
}

// ShouldStopOnError returns whether execution should stop on first error
func (h *Handler) ShouldStopOnErr() bool {
	h.mu.Lock()
	defer h.mu.Unlock()
	return h.exitOnError
}

func (h *Handler) execute(ctx context.Context, fn func(context.Context) error) error {
	err := func() (err error) {
		contextInfo := map[string]any{
			"goroutine_id": command.GetGoroutineID(),
			"timestamp":    time.Now().Format(time.RFC3339),
		}

		if h.panicContextBuilder != nil {
			h.panicContextBuilder(ctx, contextInfo)
		}

		defer h.panicHandler("Execute", contextInfo)
		return fn(ctx)
	}()
	return err
}

func (h *Handler) Run(ctx context.Context, fn func(context.Context) error) error {
	h.mu.Lock()

	if h.runOnce && h.successfulRuns >= 1 {
		h.mu.Unlock()
		return nil
	}

	if h.successfulRuns >= h.maxRuns && h.maxRuns > 0 {
		h.mu.Unlock()
		return nil
	}

	maxRetries := h.maxRetries
	strategy := h.retryStrategy
	control := h.control
	middleware := h.middleware
	h.mu.Unlock()

	if control == nil {
		control = noopExecutionControl{}
	}

	ctx, cancel := h.contextWithSettings(ctx)
	defer cancel()

	wrapped := fn
	for i := len(middleware) - 1; i >= 0; i-- {
		wrapped = middleware[i](wrapped)
	}

	var finalErr error
	interruptedByControl := false
	executionStart := time.Now()

	for attempt := 0; attempt <= maxRetries; attempt++ {
		if err := h.waitIfPausedOrCanceled(ctx, control); err != nil {
			return errors.Wrap(err, errors.CategoryExternal, "execution paused/canceled").
				WithTextCode("HANDLER_EXECUTION_CONTROLLED").
				WithMetadata(map[string]any{
					"attempt":     attempt + 1,
					"max_retries": maxRetries,
				})
		}

		if ctx.Err() != nil {
			return errors.Wrap(ctx.Err(), errors.CategoryExternal, "context canceled during handler execution").
				WithTextCode("HANDLER_CONTEXT_CANCELLED").
				WithMetadata(map[string]any{
					"attempt":         attempt + 1,
					"max_retries":     maxRetries,
					"elapsed_time":    time.Since(executionStart),
					"run_once":        h.runOnce,
					"max_runs":        h.maxRuns,
					"successful_runs": h.getSuccessfulRuns(),
				})
		}
		attemptStart := time.Now()
		err := h.execute(ctx, wrapped)
		attemptDuration := time.Since(attemptStart)

		if err == nil {
			finalErr = nil
			break
		}

		finalErr = err

		decision := h.retryDecision(err, attempt, maxRetries, strategy)
		if !decision.ShouldRetry {
			break
		}

		if attempt < maxRetries {
			retryErr := errors.Wrap(
				err,
				errors.CategoryInternal,
				fmt.Sprintf("handler failed on attempt %d of %d", attempt+1, maxRetries+1),
			).
				WithTextCode("HANDLER_RETRY_ATTEMPT").
				WithMetadata(map[string]any{
					"attempt":          attempt + 1,
					"max_attempts":     maxRetries + 1,
					"attempt_duration": attemptDuration,
					"retry_strategy":   fmt.Sprintf("%T", strategy),
					"retry_decision":   decision.Metadata,
				})

			h.handleError(retryErr)

			if delay := decision.Delay; delay > 0 {
				if waitErr := waitRetryDelay(ctx, control, delay); waitErr != nil {
					finalErr = waitErr
					interruptedByControl = true
					break
				}
			}
		}
	}

	h.mu.Lock()
	defer h.mu.Unlock()

	h.runs++
	totalDuration := time.Since(executionStart)

	if finalErr == nil {
		h.successfulRuns++
	} else {
		if interruptedByControl {
			h.handleError(finalErr)
			return finalErr
		}

		finalErr = errors.Wrap(
			finalErr,
			errors.CategoryInternal,
			fmt.Sprintf("handler failed after %d attempts", maxRetries+1),
		).
			WithTextCode("HANDLER_MAX_RETRIES_EXCEEDED").
			WithMetadata(map[string]any{
				"total_attempts":  maxRetries + 1,
				"total_duration":  totalDuration,
				"successful_runs": h.successfulRuns,
				"total_runs":      h.runs,
				"run_once":        h.runOnce,
				"max_runs":        h.maxRuns,
				"retry_strategy":  fmt.Sprintf("%T", strategy),
			})

		h.handleError(finalErr)
	}

	if h.maxRuns > 0 && h.successfulRuns >= h.maxRuns {
		h.done()
	}

	return finalErr
}

func (h *Handler) shouldRetryError(err error, attempt int, maxRetries int) bool {
	if h.exitOnError {
		return false
	}

	if attempt >= maxRetries {
		return false
	}

	if retryable, ok := err.(interface{ IsRetryable() bool }); ok {
		return retryable.IsRetryable()
	}

	return !h.isUnretryableError(err)
}

func (h *Handler) isUnretryableError(err error) bool {
	// TODO: we could add specfici unretryable error types here

	if errors.Is(err, context.Canceled) || errors.Is(err, context.DeadlineExceeded) {
		return true
	}
	return false
}

func (h *Handler) getRetryDelay(err error, attempt int, defaultStrategy RetryStrategy) time.Duration {

	if delayable, ok := err.(interface{ RetryDelay(int) time.Duration }); ok {
		if delay := delayable.RetryDelay(attempt); delay > 0 {
			return delay
		}
	}

	if defaultStrategy != nil {
		return defaultStrategy.SleepDuration(attempt, err)
	}

	return 0
}

func (h *Handler) retryDecision(err error, attempt int, maxRetries int, strategy RetryStrategy) RetryDecision {
	decision := RetryDecision{
		ShouldRetry: h.shouldRetryError(err, attempt, maxRetries),
		Delay:       h.getRetryDelay(err, attempt, strategy),
		Metadata: map[string]any{
			"attempt":     attempt + 1,
			"max_retries": maxRetries,
		},
	}
	if !decision.ShouldRetry {
		return decision
	}

	fromStrategy := DecideRetry(strategy, attempt, err)
	if fromStrategy.Metadata != nil {
		for key, value := range fromStrategy.Metadata {
			decision.Metadata[key] = value
		}
	}
	if fromStrategy.Delay > 0 {
		decision.Delay = fromStrategy.Delay
	}
	if !fromStrategy.ShouldRetry {
		decision.ShouldRetry = false
	}
	return decision
}

func (h *Handler) getSuccessfulRuns() int {
	h.mu.Lock()
	defer h.mu.Unlock()
	return h.successfulRuns
}

func (h *Handler) handleError(err error) {
	h.logError("handler error: %s", err)
	h.errorHandler(err)
}

func (h *Handler) logError(format string, args ...any) {
	if h.logger != nil {
		h.logger.Error(format, args...)
	}
}

func (h *Handler) done() {
	h.doneHandler(h)
}

func (h *Handler) contextWithSettings(parent context.Context) (context.Context, context.CancelFunc) {
	timeout := h.timeout
	if h.noTimeout {
		timeout = 0
	}
	switch {
	case timeout != 0 && !h.deadline.IsZero():
		ctx, cancelTimeout := context.WithTimeout(parent, timeout)
		ctxDeadline, cancelDeadline := context.WithDeadline(ctx, h.deadline)
		return ctxDeadline, func() {
			cancelDeadline()
			cancelTimeout()
		}
	case timeout != 0:
		return context.WithTimeout(parent, timeout)
	case !h.deadline.IsZero():
		return context.WithDeadline(parent, h.deadline)
	default:
		return parent, func() {}
	}
}

func RunCommand[T any](ctx context.Context, h *Handler, c command.Commander[T], msg T) error {
	if h == nil {
		return fmt.Errorf("handler cannot be nil")
	}
	return h.Run(ctx, func(ctx context.Context) error {
		if controlled, ok := any(c).(ControlAwareCommander[T]); ok {
			return controlled.ExecuteWithControl(ctx, msg, h.getControl())
		}
		return c.Execute(ctx, msg)
	})
}

func RunQuery[T any, R any](ctx context.Context, h *Handler, q command.Querier[T, R], msg T) (R, error) {
	var result R
	err := h.Run(ctx, func(ctx context.Context) error {
		var queryErr error
		result, queryErr = q.Query(ctx, msg)
		return queryErr
	})

	if err != nil {
		return result, err
	}

	return result, nil
}

func (h *Handler) getControl() ExecutionControl {
	if h == nil {
		return noopExecutionControl{}
	}
	h.mu.Lock()
	defer h.mu.Unlock()
	if h.control == nil {
		h.control = noopExecutionControl{}
	}
	return h.control
}

func (h *Handler) waitIfPausedOrCanceled(ctx context.Context, control ExecutionControl) error {
	if control == nil {
		return ctx.Err()
	}
	if err := control.WaitIfPaused(ctx); err != nil {
		return err
	}
	done := control.Done()
	if done == nil {
		return ctx.Err()
	}
	select {
	case <-done:
		if cause := control.CancelCause(); cause != nil {
			return cause
		}
		return context.Canceled
	default:
		return ctx.Err()
	}
}

func waitRetryDelay(ctx context.Context, control ExecutionControl, delay time.Duration) error {
	if delay <= 0 {
		return nil
	}
	if control == nil {
		control = noopExecutionControl{}
	}
	const maxStep = 100 * time.Millisecond

	remaining := delay
	for remaining > 0 {
		if err := control.WaitIfPaused(ctx); err != nil {
			return err
		}

		step := remaining
		if step > maxStep {
			step = maxStep
		}
		timer := time.NewTimer(step)
		done := control.Done()

		select {
		case <-ctx.Done():
			timer.Stop()
			return ctx.Err()
		case <-done:
			timer.Stop()
			if cause := control.CancelCause(); cause != nil {
				return cause
			}
			return context.Canceled
		case <-timer.C:
		}
		remaining -= step
	}
	return nil
}

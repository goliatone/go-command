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
	middleware := h.middleware
	h.mu.Unlock()

	ctx, cancel := h.contextWithSettings(ctx)
	defer cancel()

	wrapped := fn
	for i := len(middleware) - 1; i >= 0; i-- {
		wrapped = middleware[i](wrapped)
	}

	var finalErr error
	executionStart := time.Now()

	for attempt := 0; attempt <= maxRetries; attempt++ {
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

		if !h.shouldRetryError(err, attempt, maxRetries) {
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
				})

			h.handleError(retryErr)

			if delay := h.getRetryDelay(err, attempt, strategy); delay > 0 {
				time.Sleep(delay)
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

	if retryable, ok := err.(interface{ IsRetryable() bool }); ok {
		return retryable.IsRetryable() && attempt < maxRetries
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
	switch {
	case h.timeout != 0 && !h.deadline.IsZero():
		ctx, cancelTimeout := context.WithTimeout(parent, h.timeout)
		ctxDeadline, cancelDeadline := context.WithDeadline(ctx, h.deadline)
		return ctxDeadline, func() {
			cancelDeadline()
			cancelTimeout()
		}
	case h.timeout != 0:
		return context.WithTimeout(parent, h.timeout)
	case !h.deadline.IsZero():
		return context.WithDeadline(parent, h.deadline)
	default:
		return parent, func() {}
	}
}

func RunCommand[T any](ctx context.Context, h *Handler, c command.Commander[T], msg T) error {
	return h.Run(ctx, func(ctx context.Context) error {
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

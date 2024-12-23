package runner

import (
	"context"
	"fmt"
	"log"
	"sync"
	"time"

	"github.com/goliatone/command"
)

// Logger interface shared across packages
type Logger interface {
	Info(msg string, args ...any)
	Error(msg string, args ...any)
}

type Handler struct {
	mu sync.Mutex

	logger        Logger
	errorHandler  func(error)
	doneHandler   func(r *Handler)
	retryStrategy RetryStrategy

	EntryID        int
	runs           int
	successfulRuns int

	maxRuns    int
	maxRetries int
	timeout    time.Duration
	deadline   time.Time
	runOnce    bool
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
	}
	for _, o := range opts {
		if o != nil {
			o(r)
		}
	}
	return r
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
	h.mu.Unlock()

	ctx, cancel := h.contextWithSettings(ctx)
	defer cancel()

	var finalErr error
	for attempt := 0; attempt <= maxRetries; attempt++ {
		if ctx.Err() != nil {
			return ctx.Err() // catch context.DeadlineExceeded
		}
		err := fn(ctx)
		if err == nil {
			finalErr = nil
			break
		}

		finalErr = err

		if attempt < maxRetries {
			h.handleError(command.WrapError(
				"Run Failed",
				fmt.Sprintf("Runner failed, attempt %d of %d",
					attempt+1,
					maxRetries+1,
				),
				err,
			))

			if strategy != nil {
				delay := strategy.SleepDuration(attempt, err)
				if delay > 0 {
					time.Sleep(delay)
				}
			}
		}
	}

	h.mu.Lock()
	defer h.mu.Unlock()

	h.runs++

	if finalErr == nil {
		h.successfulRuns++
	} else {
		h.handleError(command.WrapError(
			"Run Failed",
			fmt.Sprintf("Runner failed after %d attempts", h.maxRetries+1),
			finalErr,
		))
	}

	if h.maxRuns > 0 && h.successfulRuns >= h.maxRuns {
		h.done()
	}

	return finalErr
}

func (h *Handler) handleError(err error) {
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

func RunCommand[T command.Message](ctx context.Context, h *Handler, c command.Commander[T], msg T) error {
	return h.Run(ctx, func(ctx context.Context) error {
		return c.Execute(ctx, msg)
	})
}

func RunQuery[T command.Message, R any](ctx context.Context, h *Handler, q command.Querier[T, R], msg T) (R, error) {
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

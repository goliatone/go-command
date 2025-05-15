//go:generate options-setters -input ./options.go -output ./options_setters.go
package runner

import (
	"context"
	"time"
)

// Middleware defines a function that wraps/enhances the behavior of
// a handler function. It allows you to intercept and modify the execution
// of the function passed to Handler.Run (business logic) without changing
// its implementation. Each middleware receives the next function in the
// chain and returns a new function that can perform additional actions
// before or after calling the next function. This pattern enables
// composable concerns such as logging, telemetry, authentication, retry logic,
// in a clean and decoupled manner, similar to middleware in HTTP routers
// or RPC frameworks.
type Middleware func(next func(context.Context) error) func(context.Context) error

type Option func(*Handler)

func WithMiddleware(mw ...Middleware) Option {
	return func(h *Handler) {
		h.middleware = append(h.middleware, mw...)
	}
}

func WithTimeout(t time.Duration) Option {
	return func(r *Handler) {
		r.timeout = t
	}
}

func WithNoTimeout() Option {
	return func(r *Handler) {
		r.noTimeout = true
	}
}

func WithDeadline(d time.Time) Option {
	return func(r *Handler) {
		r.deadline = d
	}
}

func WithRunOnce(once bool) Option {
	return func(r *Handler) {
		r.runOnce = once
	}
}

func WithMaxRetries(max int) Option {
	return func(r *Handler) {
		r.maxRetries = max
	}
}

func WithMaxRuns(max int) Option {
	return func(r *Handler) {
		r.maxRuns = max
	}
}

func WithErrorHandler(h func(error)) Option {
	return func(r *Handler) {
		if h == nil {
			h = func(err error) {}
		}
		r.errorHandler = h
	}
}

func WithLogger(l Logger) Option {
	return func(r *Handler) {
		r.logger = l
	}
}

func WithDoneHandler(d func(*Handler)) Option {
	return func(r *Handler) {
		if d == nil {
			d = func(r *Handler) {}
		}
		r.doneHandler = d
	}
}

// WithRetryStrategy lets you define a custom retry/backoff approach
func WithRetryStrategy(s RetryStrategy) Option {
	return func(r *Handler) {
		r.retryStrategy = s
	}
}

// WithExitOnError configures a runner to stop on first error
func WithExitOnError(exit bool) Option {
	return func(h *Handler) {
		h.exitOnError = exit
	}
}

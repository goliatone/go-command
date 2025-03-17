//go:generate options-setters -input ./options.go -output ./options_setters.go
package runner

import "time"

type Option func(*Handler)

func WithTimeout(t time.Duration) Option {
	return func(r *Handler) {
		r.timeout = t
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

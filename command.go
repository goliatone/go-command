package command

import (
	"context"
	"time"
)

// CommandFunc is an adapter that lets you use a function as a CommandHandler[T]
type CommandFunc[T Message] func(ctx context.Context, msg T) error

// Execute calls the underlying function
func (f CommandFunc[T]) Execute(ctx context.Context, msg T) error {
	return f(ctx, msg)
}

// Commander is responsible for executing side effects
type Commander[T Message] interface {
	Execute(ctx context.Context, msg T) error
}

// QueryFunc is an adapter that lets you use a function as a QueryHandler[T, R]
type QueryFunc[T Message, R any] func(ctx context.Context, msg T) (R, error)

// Query calls the underlying function
func (f QueryFunc[T, R]) Query(ctx context.Context, msg T) (R, error) {
	return f(ctx, msg)
}

// Querier is responsible for returning data, with no side effects
type Querier[T Message, R any] interface {
	Query(ctx context.Context, msg T) (R, error)
}

type HandlerConfig struct {
	Timeout    time.Duration `json:"timeout"`
	Deadline   time.Time     `json:"deadline"`
	MaxRetries int           `json:"max_retries"`
	MaxRuns    int           `json:"max_runs"`
	RunOnce    bool          `json:"run_once"`
	Expression string        `json:"expression"`
}

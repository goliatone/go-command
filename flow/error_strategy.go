package flow

import (
	"context"
	"errors"
	"time"

	"github.com/goliatone/go-command"
	"github.com/goliatone/go-command/runner"
)

// ErrorStrategy defines how to handle multiple errors from parallel execution
type ErrorStrategy interface {
	HandleErrors([]error) error
}

// FailFastStrategy returns the first error encountered
type FailFastStrategy struct{}

func (f FailFastStrategy) HandleErrors(errs []error) error {
	if len(errs) > 0 {
		return errs[0]
	}
	return nil
}

// AggregateErrorStrategy combines all errors into one
type AggregateErrorStrategy struct{}

func (a AggregateErrorStrategy) HandleErrors(errs []error) error {
	return errors.Join(errs...)
}

// Example usage of retry with backoff for any flow pattern
type RetryableFlow[T command.Message] struct {
	flow          Flow[T]
	retryStrategy runner.RetryStrategy
	maxRetries    int
}

func NewRetryableFlow[T command.Message](
	flow Flow[T],
	retryStrategy runner.RetryStrategy,
	maxRetries int,
) *RetryableFlow[T] {
	return &RetryableFlow[T]{
		flow:          flow,
		retryStrategy: retryStrategy,
		maxRetries:    maxRetries,
	}
}

func (r *RetryableFlow[T]) Execute(ctx context.Context, msg T) error {
	var lastErr error

	for attempt := 0; attempt <= r.maxRetries; attempt++ {
		if err := r.flow.Execute(ctx, msg); err == nil {
			return nil
		} else {
			lastErr = err
			if attempt < r.maxRetries {
				delay := r.retryStrategy.SleepDuration(attempt, err)
				select {
				case <-ctx.Done():
					return ctx.Err()
				case <-time.After(delay):
				}
			}
		}
	}

	return lastErr
}

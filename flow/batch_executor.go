package flow

import (
	"context"
	"errors"

	"github.com/goliatone/go-command"
	"github.com/goliatone/go-command/runner"
)

// BatchExecutor processes commands in batches
type BatchExecutor[T command.Message] struct {
	batchSize   int
	concurrency int
	handler     command.Commander[T]
	options     []runner.Option
}

type BatchExecutorOption[T command.Message] func(*BatchExecutor[T])

func WithBatchSize[T command.Message](size int) BatchExecutorOption[T] {
	return func(be *BatchExecutor[T]) {
		if size > 0 {
			be.batchSize = size
		}
	}
}

func WithConcurrency[T command.Message](n int) BatchExecutorOption[T] {
	return func(be *BatchExecutor[T]) {
		if n > 0 {
			be.concurrency = n
		}
	}
}

func NewBatchExecutor[T command.Message](handler command.Commander[T], opts ...BatchExecutorOption[T]) *BatchExecutor[T] {
	be := &BatchExecutor[T]{
		handler:     handler,
		batchSize:   100,
		concurrency: 5,
	}

	for _, opt := range opts {
		if opt != nil {
			opt(be)
		}
	}

	return be
}

func (b *BatchExecutor[T]) Execute(ctx context.Context, messages []T) error {
	if len(messages) == 0 {
		return nil
	}
	var batches [][]T
	for i := 0; i < len(messages); i += b.batchSize {
		end := i + b.batchSize
		if end > len(messages) {
			end = len(messages)
		}
		batches = append(batches, messages[i:end])
	}

	errCh := make(chan error, len(batches))
	semaphore := make(chan struct{}, b.concurrency)

	for _, batch := range batches {
		select {
		case <-ctx.Done():
			return ctx.Err()
		case semaphore <- struct{}{}:
			// worker slot available
		}

		go func(batchItems []T) {
			defer func() { <-semaphore }()

			h := runner.NewHandler(b.options...)

			var batchErr error
			for _, msg := range batchItems {
				if err := runner.RunCommand(ctx, h, b.handler, msg); err != nil {
					wrappedErr := command.WrapError(
						"BatchExecutionFailed",
						"handler failed in batch execution",
						err,
					)

					if h.ShouldStopOnErr() {
						errCh <- wrappedErr
						return
					}

					batchErr = errors.Join(batchErr, wrappedErr)
				}
			}

			if batchErr != nil {
				errCh <- batchErr
			} else {
				errCh <- nil
			}
		}(batch)
	}

	var finalErr error
	for i := 0; i < len(batches); i++ {
		if err := <-errCh; err != nil {
			finalErr = errors.Join(finalErr, err)
		}
	}

	return finalErr
}

// ExecuteBatch processes messages in batches with a function handler
func ExecuteBatch[T command.Message](ctx context.Context, messages []T, handler command.CommandFunc[T], batchSize, concurrency int, opts ...runner.Option) error {
	executor := NewBatchExecutor(
		handler,
		WithBatchSize[T](batchSize),
		WithConcurrency[T](concurrency),
	)
	executor.options = opts

	return executor.Execute(ctx, messages)
}

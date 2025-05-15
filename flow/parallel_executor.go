package flow

import (
	"context"

	"fmt"
	"sync"

	"github.com/goliatone/go-command"
	"github.com/goliatone/go-command/runner"
	"github.com/goliatone/go-errors"
)

type ParallelExecutor[T any] struct {
	handlers []command.Commander[T]
	options  []runner.Option
}

// NewParallelExecutor creates a new ParallelExecutor with the provided handlers
func NewParallelExecutor[T any](handlers []command.Commander[T], opts ...runner.Option) *ParallelExecutor[T] {
	return &ParallelExecutor[T]{
		handlers: handlers,
		options:  opts,
	}
}

func (p *ParallelExecutor[T]) Execute(ctx context.Context, msg T) error {
	var wg sync.WaitGroup
	errs := make([]error, len(p.handlers))

	runCtx, cancel := context.WithCancel(ctx)
	defer cancel()

	for i, handler := range p.handlers {
		wg.Add(1)

		go func(index int, cmd command.Commander[T]) {
			defer wg.Done()

			h := runner.NewHandler(p.options...)

			if err := runner.RunCommand(runCtx, h, cmd, msg); err != nil {
				errs[index] = errors.Wrap(
					err,
					errors.CategoryHandler,
					"handler failed in parallel execution",
				).
					WithTextCode("PARALLEL_EXECUTION_FAILED").
					WithMetadata(map[string]any{
						"handler_index":     index,
						"handler_type":      fmt.Sprintf("%T", cmd),
						"message_type":      command.GetMessageType(msg),
						"total_handlers":    len(p.handlers),
						"stop_on_error":     h.ShouldStopOnErr(),
						"context_cancelled": runCtx.Err() != nil,
					})

				if h.ShouldStopOnErr() {
					cancel()
				}
			}
		}(i, handler)
	}
	wg.Wait()

	var finalErr error
	var successCount int
	for _, err := range errs {
		if err != nil {
			finalErr = errors.Join(finalErr, err)
		} else {
			successCount++
		}
	}

	if finalErr != nil {
		finalErr = errors.Wrap(
			finalErr,
			errors.CategoryHandler,
			fmt.Sprintf("parallel execution completed with %d failures out of %d handlers",
				len(p.handlers)-successCount, len(p.handlers)),
		).
			WithTextCode("PARALLEL_EXECUTION_SUMMARY").
			WithMetadata(map[string]any{
				"total_handlers":   len(p.handlers),
				"successful_count": successCount,
				"failed_count":     len(p.handlers) - successCount,
				"message_type":     command.GetMessageType(msg),
			})
	}

	return finalErr
}

// ParallelExecute runs handlers concurrently with function handlers
func ParallelExecute[T any](ctx context.Context, msg T, handlers []command.CommandFunc[T], opts ...runner.Option) error {
	var commanders []command.Commander[T]
	for _, h := range handlers {
		commanders = append(commanders, h)
	}

	executor := NewParallelExecutor(commanders, opts...)
	return executor.Execute(ctx, msg)
}

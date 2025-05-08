package flow

import (
	"context"
	"errors"
	"sync"

	"github.com/goliatone/go-command"
	"github.com/goliatone/go-command/runner"
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
				errs[index] = command.WrapError(
					"ParallelExecutor",
					"handler failed in paralled execution",
					err,
				)

				if h.ShouldStopOnErr() {
					cancel()
				}
			}
		}(i, handler)
	}
	wg.Wait()

	var finalErr error
	for _, err := range errs {
		if err != nil {
			finalErr = errors.Join(finalErr, err)
		}
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

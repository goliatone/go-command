package flow

import (
	"context"
	"fmt"

	"github.com/goliatone/go-command"
	"github.com/goliatone/go-command/runner"
	"github.com/goliatone/go-errors"
)

// SerialExecutor runs multiple command handlers in sequence
type SerialExecutor[T any] struct {
	handlers []command.Commander[T]
	options  []Option
}

// NewSerialExecutor creates a new SerialExecutor with the provided handlers
func NewSerialExecutor[T any](handlers []command.Commander[T], opts ...runner.Option) *SerialExecutor[T] {
	return &SerialExecutor[T]{
		handlers: handlers,
		options:  mergeOptions(opts...),
	}
}

func (s *SerialExecutor[T]) Execute(ctx context.Context, msg T) error {
	var errs error

	h := runner.NewHandler(s.options...)

	for i, handler := range s.handlers {
		if ctx.Err() != nil {
			return errors.Wrap(ctx.Err(), errors.CategoryExternal, "context canceled or deadline exceeded").
				WithTextCode("SERIAL_CONTEXT_CANCELLED").
				WithMetadata(map[string]any{
					"total_handlers":     len(s.handlers),
					"completed_handlers": i,
					"message_type":       command.GetMessageType(msg),
					"stop_on_error":      h.ShouldStopOnErr(),
				})
		}

		if err := runner.RunCommand(ctx, h, handler, msg); err != nil {
			wrappedErr := errors.Wrap(
				err,
				errors.CategoryHandler,
				"handler failed in serial execution",
			).
				WithTextCode("SERIAL_EXECUTION_FAILED").
				WithMetadata(map[string]any{
					"handler_index":      i,
					"handler_type":       fmt.Sprintf("%T", handler),
					"message_type":       command.GetMessageType(msg),
					"total_handlers":     len(s.handlers),
					"completed_handlers": i,
					"stop_on_error":      h.ShouldStopOnErr(),
				})

			if h.ShouldStopOnErr() {
				return wrappedErr
			}
			errs = errors.Join(errs, wrappedErr)
		}
	}

	return errs
}

// SerialExecute will run each handler in sequence with function handlers
func SerialExecute[T any](ctx context.Context, msg T, handlers []command.CommandFunc[T], opts ...runner.Option) error {
	var commanders []command.Commander[T]
	for _, h := range handlers {
		commanders = append(commanders, h)
	}

	executor := NewSerialExecutor(commanders, opts...)

	return executor.Execute(ctx, msg)
}

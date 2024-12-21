package dispatcher

import (
	"context"
	"errors"
	"fmt"
	"sync"

	"github.com/goliatone/command"
)

// // NEEDS REVIEW ////
// Dispatcher is the core struct to handle dispatcher options
type Dispatcher struct {
	mu        sync.RWMutex
	handlers  map[string][]any
	ExitOnErr bool
}

// Option defines the functional option signature.
type Option func(*Dispatcher)

// NewDispatcher applies the given options to a new instance of the dispatcher.
func NewDispatcher(opts ...Option) *Dispatcher {
	d := &Dispatcher{
		handlers:  make(map[string][]any),
		ExitOnErr: false,
	}
	for _, opt := range opts {
		opt(d)
	}
	return d
}

func (d *Dispatcher) RegisterHandler(msgType string, handler any) {
	d.mu.Lock()
	defer d.mu.Unlock()
	d.handlers[msgType] = append(d.handlers[msgType], handler)
}

func (d *Dispatcher) GetHandlers(msgType string) []any {
	d.mu.RLock()
	defer d.mu.RUnlock()
	return d.handlers[msgType]
}

// WithExitOnError sets exitOnErr to true.
func WithExitOnError() Option {
	return func(d *Dispatcher) {
		d.ExitOnErr = true
	}
}

var Default = NewDispatcher()

////

// Subscribe a CommandHandler for a particular message type T.
func SubscribeCommand[T command.Message](handler command.Commander[T]) {
	var msg T
	Default.RegisterHandler(msg.Type(), handler)
}

func SubscribeCommandFunc[T command.Message](handler command.CommandFunc[T]) {
	var msg T
	Default.RegisterHandler(msg.Type(), handler)
}

// Subscribe a QueryHandler for a particular message type T, R.
func SubscribeQuery[T command.Message, R any](handler command.Querier[T, R]) {
	var msg T
	Default.RegisterHandler(msg.Type(), handler)
}

func SubscribeQueryFunc[T command.Message, R any](handler command.QueryFunc[T, R]) {
	var msg T
	Default.RegisterHandler(msg.Type(), handler)
}

func getCommandHandlers[T command.Message](id *Dispatcher) ([]command.Commander[T], error) {
	var msg T
	handlers := id.GetHandlers(msg.Type())
	if len(handlers) == 0 {
		return nil, fmt.Errorf("no command handlers for message type %s", msg.Type())
	}

	var typedHandlers []command.Commander[T]
	for _, h := range handlers {
		cmdHandler, ok := h.(command.Commander[T])
		if !ok {
			return nil, fmt.Errorf("handler does not implement CommandHandler for type %s", msg.Type())
		}
		typedHandlers = append(typedHandlers, cmdHandler)
	}
	return typedHandlers, nil
}

// Dispatch executes all registered CommandHandlers for T.
func Dispatch[T command.Message](ctx context.Context, msg T) error {
	handlers, err := getCommandHandlers[T](Default)
	if err != nil {
		return command.WrapMessageError("NoHandlers", err.Error(), err)
	}

	if ctx.Err() != nil {
		return command.WrapMessageError("ContextError", "context canceled or deadline exceeded", ctx.Err())
	}

	var errs error
	for _, handler := range handlers {
		select {
		case <-ctx.Done():
			return command.WrapMessageError("ContextError", "context canceled during execution", ctx.Err())
		default:
			if err := handler.Execute(ctx, msg); err != nil {
				wrappedErr := command.WrapMessageError(
					"HandlerExecutionFailed",
					fmt.Sprintf("handler failed for type %s", msg.Type()),
					err,
				)

				if Default.ExitOnErr {
					return wrappedErr
				}
				errors.Join(errs)
			}
		}
	}

	return errs
}

func getQueryHandler[T command.Message, R any](qb *Dispatcher) (command.Querier[T, R], error) {
	var msg T
	handlers := qb.GetHandlers(msg.Type())
	if len(handlers) == 0 {
		return nil, fmt.Errorf("no query handlers for message type %s", msg.Type())
	}
	if len(handlers) > 1 {
		return nil, errors.New("multiple query handlers found, ambiguous query")
	}

	qh, ok := handlers[0].(command.Querier[T, R])
	if !ok {
		return nil, fmt.Errorf("handler does not implement QueryHandler for type %s", msg.Type())
	}
	return qh, nil
}

// Query executes the single registered QueryHandler for T, returning R.
func Query[T command.Message, R any](ctx context.Context, msg T) (R, error) {
	var zero R
	handler, err := getQueryHandler[T, R](Default)
	if err != nil {
		return zero, command.WrapMessageError("NoHandlers", err.Error(), err)
	}

	if ctx.Err() != nil {
		return zero, command.WrapMessageError("ContextError", "context canceled or deadline exceeded", ctx.Err())
	}

	result, qerr := handler.Query(ctx, msg)
	if qerr != nil {
		return zero, command.WrapMessageError(
			"HandlerExecutionFailed",
			fmt.Sprintf("query handler failed for type %s", msg.Type()),
			qerr,
		)
	}
	return result, nil
}

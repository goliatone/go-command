package dispatcher

import (
	"context"
	"errors"
	"fmt"
	"sync"

	"github.com/goliatone/go-command"
	"github.com/goliatone/go-command/runner"
)

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

// Subscribe a CommandHandler for a particular message type T.
func SubscribeCommand[T command.Message](cmd command.Commander[T], runnerOpts ...runner.Option) Subscription {
	var msg T
	h := runner.NewHandler(runnerOpts...)
	wrapper := &commandWrapper[T]{
		runner: h,
		cmd:    cmd,
	}

	Default.RegisterHandler(msg.Type(), wrapper)

	return &subs{
		dispatcher: Default,
		msgType:    msg.Type(),
		handler:    wrapper,
	}
}

func SubscribeCommandFunc[T command.Message](handler command.CommandFunc[T], runnerOpts ...runner.Option) Subscription {
	return SubscribeCommand(handler, runnerOpts...)
}

// Subscribe a QueryHandler for a particular message type T, R.
func SubscribeQuery[T command.Message, R any](qry command.Querier[T, R], runnerOpts ...runner.Option) Subscription {
	var msg T
	r := runner.NewHandler(runnerOpts...)
	wrapper := &queryWrapper[T, R]{
		runner: r,
		qry:    qry,
	}
	Default.RegisterHandler(msg.Type(), wrapper)

	return &subs{
		dispatcher: Default,
		msgType:    msg.Type(),
		handler:    wrapper,
	}
}

func SubscribeQueryFunc[T command.Message, R any](qry command.QueryFunc[T, R], runnerOpts ...runner.Option) Subscription {
	return SubscribeQuery(qry, runnerOpts...)
}

func getCommandHandlers[T command.Message](id *Dispatcher) ([]*commandWrapper[T], error) {
	var msg T
	handlers := id.GetHandlers(msg.Type())
	if len(handlers) == 0 {
		return nil, fmt.Errorf("no command handlers for message type %s", msg.Type())
	}

	var typedHandlers []*commandWrapper[T]
	for _, h := range handlers {
		cmdHandler, ok := h.(*commandWrapper[T])
		if !ok {
			return nil, fmt.Errorf("handler does not implement CommandHandler for type %s", msg.Type())
		}
		typedHandlers = append(typedHandlers, cmdHandler)
	}
	return typedHandlers, nil
}

// Dispatch executes all registered CommandHandlers for T.
func Dispatch[T command.Message](ctx context.Context, msg T) error {
	if err := (&command.MessageHandler[T]{}).ValidateMessage(msg); err != nil {
		return err
	}

	wrapers, err := getCommandHandlers[T](Default)
	if err != nil {
		return command.WrapError("DispatchHandlerError", err.Error(), err)
	}

	if ctx.Err() != nil {
		return command.WrapError("ContextError", "context canceled or deadline exceeded", ctx.Err())
	}

	var errs error
	for _, cw := range wrapers {
		if err := runner.RunCommand(ctx, cw.runner, cw.cmd, msg); err != nil {
			wrappedErr := command.WrapError(
				"HandlerExecutionFailed",
				fmt.Sprintf("handler failed for type %s", msg.Type()),
				err,
			)

			if Default.ExitOnErr {
				return wrappedErr
			}

			errs = errors.Join(errs, err)
		}
	}

	return errs
}

func getQueryHandler[T command.Message, R any](qb *Dispatcher) (*queryWrapper[T, R], error) {
	var msg T
	handlers := qb.GetHandlers(msg.Type())

	if len(handlers) == 0 {
		return nil, fmt.Errorf("no query handlers for message type %s", msg.Type())
	}

	if len(handlers) > 1 {
		return nil, errors.New("multiple query handlers found, ambiguous query")
	}

	qh, ok := handlers[0].(*queryWrapper[T, R])
	if !ok {
		return nil, fmt.Errorf("handler does not implement QueryHandler for type %s", msg.Type())
	}
	return qh, nil
}

// Query executes the single registered QueryHandler for T, returning R.
func Query[T command.Message, R any](ctx context.Context, msg T) (R, error) {
	if err := (&command.MessageHandler[T]{}).ValidateMessage(msg); err != nil {
		var zero R
		return zero, err
	}

	var zero R
	qw, err := getQueryHandler[T, R](Default)
	if err != nil {
		return zero, command.WrapError("QueryHandlerError", err.Error(), err)
	}

	if ctx.Err() != nil {
		return zero, command.WrapError("ContextError", "context canceled or deadline exceeded", ctx.Err())
	}

	result, qerr := runner.RunQuery(ctx, qw.runner, qw.qry, msg)
	if qerr != nil {
		return zero, command.WrapError(
			"HandlerExecutionFailed",
			fmt.Sprintf("query handler failed for type %s", msg.Type()),
			qerr,
		)
	}
	return result, nil
}

type commandWrapper[T command.Message] struct {
	runner *runner.Handler
	cmd    command.Commander[T]
}

type queryWrapper[T command.Message, R any] struct {
	runner *runner.Handler
	qry    command.Querier[T, R]
}

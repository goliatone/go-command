package dispatcher

import (
	"context"
	"fmt"
	"sync"

	"github.com/goliatone/go-command"
	"github.com/goliatone/go-command/router"
	"github.com/goliatone/go-command/runner"
	"github.com/goliatone/go-errors"
)

type Subscription interface {
	Unsubscribe()
}

var ExitOnErr = false

var (
	defaultMux = router.NewMux()
	testMux    *router.Mux // Only set during tests for isolation
	testMuxMu  sync.RWMutex
)

// getMux returns the active mux (test override or default)
func getMux() *router.Mux {
	testMuxMu.RLock()
	defer testMuxMu.RUnlock()
	if testMux != nil {
		return testMux
	}
	return defaultMux
}

// setTestMux overrides the mux for testing (package-private, test-only)
func setTestMux(m *router.Mux) {
	testMuxMu.Lock()
	defer testMuxMu.Unlock()
	testMux = m
}

// Subscribe a CommandHandler for a particular message type T.
// TODO: should this return an error?!
func SubscribeCommand[T any](cmd command.Commander[T], runnerOpts ...runner.Option) Subscription {
	var msg T
	h := runner.NewHandler(runnerOpts...)
	wrapper := &commandWrapper[T]{
		runner: h,
		cmd:    cmd,
	}
	return getMux().Add(command.GetMessageType(msg), wrapper)
}

func SubscribeCommandFunc[T any](handler command.CommandFunc[T], runnerOpts ...runner.Option) Subscription {
	return SubscribeCommand(handler, runnerOpts...)
}

// Subscribe a QueryHandler for a particular message type T, R.
func SubscribeQuery[T any, R any](qry command.Querier[T, R], runnerOpts ...runner.Option) Subscription {
	var msg T
	r := runner.NewHandler(runnerOpts...)
	wrapper := &queryWrapper[T, R]{
		runner: r,
		qry:    qry,
	}
	return getMux().Add(command.GetMessageType(msg), wrapper)
}

func SubscribeQueryFunc[T any, R any](qry command.QueryFunc[T, R], runnerOpts ...runner.Option) Subscription {
	return SubscribeQuery(qry, runnerOpts...)
}

func getCommandHandlers[T any]() ([]*commandWrapper[T], error) {
	var msg T
	handlers := getMux().Get(command.GetMessageType(msg))
	if len(handlers) == 0 {
		return nil, fmt.Errorf("no command handlers for message type %s", command.GetMessageType(msg))
	}

	var typedHandlers []*commandWrapper[T]
	for _, h := range handlers {
		cmdHandler, ok := h.Handler.(*commandWrapper[T])
		if !ok {
			return nil, fmt.Errorf("handler does not implement CommandHandler for type %s", command.GetMessageType(msg))
		}
		typedHandlers = append(typedHandlers, cmdHandler)
	}

	if len(typedHandlers) == 0 {
		return nil, fmt.Errorf("no command handlers for message type %s", command.GetMessageType(msg))
	}

	return typedHandlers, nil
}

func DispatchWithResult[T any, R any](ctx context.Context, msg T) (R, error) {
	result := command.NewResult[R]()
	ctx = command.ContextWithResult(ctx, result)

	if err := Dispatch(ctx, msg); err != nil {
		var zero R
		// TODO: how do we handle agumenting a returned errors.Error?
		return zero, errors.Wrap(err, errors.CategoryCommand, "dispatch generated error").
			WithTextCode("DISPATCHER_ERROR")
	}

	value, stored := result.Load()
	if !stored {
		var zero R
		return zero, errors.New("command did not store a result", errors.CategoryCommand).
			WithTextCode("RESULT_ERROR")
	}

	return value, result.Error()
}

// Dispatch executes all registered CommandHandlers for T.
func Dispatch[T any](ctx context.Context, msg T) error {
	if err := command.ValidateMessage(msg); err != nil {
		return err
	}

	wrapers, err := getCommandHandlers[T]()
	if err != nil {
		return errors.Wrap(err, errors.CategoryHandler, "failed to get command handlers").
			WithTextCode("HANDLER_LOOKUP_ERROR").
			WithMetadata(map[string]any{
				"message_type": command.GetMessageType(msg),
			})
	}

	if ctx.Err() != nil {
		return errors.Wrap(ctx.Err(), errors.CategoryExternal, "context canceled or deadline exceeded").
			WithTextCode("CONTEXT_ERROR")
	}

	var errs error
	for _, cw := range wrapers {
		if err := runner.RunCommand(ctx, cw.runner, cw.cmd, msg); err != nil {
			wrappedErr := errors.Wrap(
				err,
				errors.CategoryHandler,
				fmt.Sprintf("handler failed for type %s", command.GetMessageType(msg)),
			).
				WithTextCode("HANDLER_EXECUTION_FAILED").
				WithMetadata(map[string]any{
					"message_type": command.GetMessageType(msg),
					"handler":      fmt.Sprintf("%T", cw.cmd),
				})
			if ExitOnErr {
				return wrappedErr
			}
			errs = errors.Join(errs, wrappedErr)
		}
	}

	return errs
}

func getQueryHandler[T any, R any]() (*queryWrapper[T, R], error) {
	var msg T
	handlers := getMux().Get(command.GetMessageType(msg))

	if len(handlers) == 0 {
		return nil, fmt.Errorf("no query handlers for message type %s", command.GetMessageType(msg))
	}

	if len(handlers) > 1 {
		return nil, errors.New(
			"multiple query handlers found, ambiguous query",
			errors.CategoryBadInput)
	}

	qh, ok := handlers[0].Handler.(*queryWrapper[T, R])
	if !ok {
		return nil, fmt.Errorf("handler does not implement QueryHandler for type %s", command.GetMessageType(msg))
	}
	return qh, nil
}

// Query executes the single registered QueryHandler for T, returning R.
func Query[T any, R any](ctx context.Context, msg T) (R, error) {
	if err := command.ValidateMessage(msg); err != nil {
		var zero R
		return zero, err
	}

	var zero R
	qw, err := getQueryHandler[T, R]()
	if err != nil {
		return zero, errors.Wrap(err, errors.CategoryHandler, "failed to get query handler").
			WithTextCode("QUERY_HANDLER_LOOKUP_ERROR").
			WithMetadata(map[string]any{
				"message_type": command.GetMessageType(msg),
				"result_type":  fmt.Sprintf("%T", zero),
			})
	}

	if ctx.Err() != nil {
		return zero, errors.Wrap(ctx.Err(), errors.CategoryExternal, "context canceled or deadline exceeded").
			WithTextCode("CONTEXT_ERROR")
	}

	result, qerr := runner.RunQuery(ctx, qw.runner, qw.qry, msg)
	if qerr != nil {
		return zero, errors.Wrap(
			qerr,
			errors.CategoryHandler,
			fmt.Sprintf("query handler failed for type %s", command.GetMessageType(msg)),
		).
			WithTextCode("QUERY_EXECUTION_FAILED").
			WithMetadata(map[string]any{
				"message_type": command.GetMessageType(msg),
				"result_type":  fmt.Sprintf("%T", zero),
				"handler":      fmt.Sprintf("%T", qw.qry),
			})
	}
	return result, nil
}

type commandWrapper[T any] struct {
	runner *runner.Handler
	cmd    command.Commander[T]
}

type queryWrapper[T any, R any] struct {
	runner *runner.Handler
	qry    command.Querier[T, R]
}

package dispatcher

import (
	"context"
	"errors"
	"fmt"
	"reflect"
	"regexp"
	"strings"

	"github.com/goliatone/go-command"
	"github.com/goliatone/go-command/router"
	"github.com/goliatone/go-command/runner"
)

type Subscription interface {
	Unsubscribe()
}

var ExitOnErr = false
var mux = router.NewMux()

// Subscribe a CommandHandler for a particular message type T.
func SubscribeCommand[T any](cmd command.Commander[T], runnerOpts ...runner.Option) Subscription {
	var msg T
	h := runner.NewHandler(runnerOpts...)
	wrapper := &commandWrapper[T]{
		runner: h,
		cmd:    cmd,
	}
	return mux.Add(getType(msg), wrapper)
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
	return mux.Add(getType(msg), wrapper)
}

func SubscribeQueryFunc[T any, R any](qry command.QueryFunc[T, R], runnerOpts ...runner.Option) Subscription {
	return SubscribeQuery(qry, runnerOpts...)
}

func getCommandHandlers[T any](mx *router.Mux) ([]*commandWrapper[T], error) {
	var msg T
	handlers := mx.Get(getType(msg))
	if len(handlers) == 0 {
		return nil, fmt.Errorf("no command handlers for message type %s", getType(msg))
	}

	var typedHandlers []*commandWrapper[T]
	for _, h := range handlers {
		cmdHandler, ok := h.Handler.(*commandWrapper[T])
		if !ok {
			return nil, fmt.Errorf("handler does not implement CommandHandler for type %s", getType(msg))
		}
		typedHandlers = append(typedHandlers, cmdHandler)
	}

	if len(typedHandlers) == 0 {
		return nil, fmt.Errorf("no command handlers for message type %s", getType(msg))
	}

	return typedHandlers, nil
}

// Dispatch executes all registered CommandHandlers for T.
func Dispatch[T any](ctx context.Context, msg T) error {
	if err := (&command.MessageHandler[T]{}).ValidateMessage(msg); err != nil {
		return err
	}

	wrapers, err := getCommandHandlers[T](mux)
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
				fmt.Sprintf("handler failed for type %s", getType(msg)),
				err,
			)
			if ExitOnErr {
				return wrappedErr
			}
			errs = errors.Join(errs, wrappedErr)
		}
	}

	return errs
}

func getQueryHandler[T any, R any](mx *router.Mux) (*queryWrapper[T, R], error) {
	var msg T
	handlers := mx.Get(getType(msg))

	if len(handlers) == 0 {
		return nil, fmt.Errorf("no query handlers for message type %s", getType(msg))
	}

	if len(handlers) > 1 {
		return nil, errors.New("multiple query handlers found, ambiguous query")
	}

	qh, ok := handlers[0].Handler.(*queryWrapper[T, R])
	if !ok {
		return nil, fmt.Errorf("handler does not implement QueryHandler for type %s", getType(msg))
	}
	return qh, nil
}

// Query executes the single registered QueryHandler for T, returning R.
func Query[T any, R any](ctx context.Context, msg T) (R, error) {
	if err := (&command.MessageHandler[T]{}).ValidateMessage(msg); err != nil {
		var zero R
		return zero, err
	}

	var zero R
	qw, err := getQueryHandler[T, R](mux)
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
			fmt.Sprintf("query handler failed for type %s", getType(msg)),
			qerr,
		)
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

func getType(msg any) string {
	if msg == nil {
		return "unknown_type"
	}

	v := reflect.ValueOf(msg)
	if v.Kind() == reflect.Ptr && v.IsNil() {
		return "unknown_type"
	}

	if msgTyper, ok := msg.(interface{ Type() string }); ok {
		return msgTyper.Type()
	}

	t := reflect.TypeOf(msg)
	if t == nil {
		return "unknown_type"
	}

	typeName := t.String()

	if t.Kind() == reflect.Ptr {
		typeName = typeName[1:] // remove the "*" prefix
		t = t.Elem()            // get the type that the pointer points to
	}

	pkgPath := t.PkgPath()
	if pkgPath != "" {
		parts := strings.Split(pkgPath, "/")
		pkgPath = parts[len(parts)-1]
	}

	txName := toSnakeCase(typeName)

	if pkgPath == "" {
		return txName
	}
	return pkgPath + "::" + txName
}

func toSnakeCase(s string) string {
	//TODO: use tocase package
	snake := regexp.MustCompile("([a-z0-9])([A-Z])").ReplaceAllString(s, "${1}_${2}")
	return strings.ToLower(snake)
}

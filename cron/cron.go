package cron

import (
	"context"
	"fmt"
	"io"
	"log"
	"os"
	"reflect"
	"time"

	"github.com/goliatone/go-command"
	"github.com/goliatone/go-command/runner"

	rcron "github.com/robfig/cron/v3"
)

// Logger interface shared across packages
type Logger interface {
	Info(msg string, args ...any)
	Error(msg string, args ...any)
}

// Scheduler wraps cron functionality
type Scheduler struct {
	cron         *rcron.Cron
	location     *time.Location
	errorHandler func(error)

	logger    Logger
	parser    Parser
	logWriter io.Writer
	logLevel  LogLevel
}

// NewScheduler creates a new scheduler instance with the provided options
// TODO: Move to scheduler.NewCron()?
func NewScheduler(opts ...Option) *Scheduler {
	cs := &Scheduler{
		location: time.Local,
		parser:   DefaultParser,
		logLevel: LogLevelError,
		errorHandler: func(err error) {
			log.Printf("error: %v\n", err)
		},
	}

	for _, opt := range opts {
		if opt != nil {
			opt(cs)
		}
	}

	cs.cron = rcron.New(cs.build()...)
	return cs
}

func (cs *Scheduler) SetLogger(logger Logger) {
	cs.logger = logger
}

// build converts our implementation-agnostic options to rcron options
func (cs *Scheduler) build() []rcron.Option {
	opts := make([]rcron.Option, 0)

	if cs.location != nil {
		opts = append(opts, rcron.WithLocation(cs.location))
	}

	switch cs.parser {
	case StandardParser:
		opts = append(opts, rcron.WithParser(rcron.NewParser(
			rcron.Minute|rcron.Hour|rcron.Dom|rcron.Month|rcron.Dow|rcron.Descriptor,
		)))
	case SecondsParser:
		opts = append(opts, rcron.WithParser(rcron.NewParser(
			rcron.Second|rcron.Minute|rcron.Hour|rcron.Dom|rcron.Month|rcron.Dow|rcron.Descriptor,
		)))
	}

	if cs.errorHandler != nil {
		opts = append(opts, rcron.WithChain(
			rcron.Recover(&errorHandlerAdapter{handler: cs.errorHandler}),
		))
	}

	var cronLogger rcron.Logger
	switch {
	case cs.logger != nil:
		cronLogger = &loggerAdapter{logger: cs.logger, level: cs.logLevel}
	case cs.logWriter != nil:
		cronLogger = makeLogger(cs.logWriter, cs.logLevel)
	default:
		if cs.logLevel > LogLevelSilent {
			cronLogger = makeLogger(os.Stdout, cs.logLevel)
		}
	}

	if cronLogger != nil {
		opts = append(opts, rcron.WithLogger(cronLogger))
	}

	return opts
}

// AddCommand is a type-safe way to add command handlers
func AddCommand[T any](s *Scheduler, opts command.HandlerConfig, handler command.CommandFunc[T]) (Subscription, error) {
	runnerOpts := makeRunnerOptions(s, opts)
	h := runner.NewHandler(runnerOpts...)

	job := makeCommandJob(context.Background(), s, h, handler)
	return s.addJob(opts.Expression, job)
}

func (s *Scheduler) addJob(expr string, job rcron.Job) (Subscription, error) {
	entryID, err := s.cron.AddJob(expr, job)
	if err != nil {
		return nil, fmt.Errorf("failed to add job: %w", err)
	}

	return &cronSubscription{
		scheduler: s,
		entryID:   int(entryID),
	}, nil
}

// AddHandler registers a handler for scheduled execution
// It accepts any handler type that implements the Message interface and returns
// an entryID that can be used to remove the job later
//   - handler: func()
//   - handler: func() error
//   - handler: command.Commander[T]
//   - handler: command.CommandFunc[T]
func (s *Scheduler) AddHandler(opts command.HandlerConfig, handler any) (Subscription, error) {
	if opts.Expression == "" {
		return nil, fmt.Errorf("cron expression cannot be empty")
	}

	runnerOpts := makeRunnerOptions(s, opts)
	h := runner.NewHandler(runnerOpts...)

	var job rcron.Job
	switch r := handler.(type) {
	case func():
		job = makeSimpleJob(context.Background(), s, h, r)
	case func() error:
		job = makeErrorJob(context.Background(), s, h, r)
	default:
		// TODO: we might want to deprectate this, it is overly complicated :/
		if cmdJob := tryCommandJob(handler, s, h); cmdJob != nil {
			job = cmdJob
		} else {
			return nil, fmt.Errorf("unsupported handler type: %T", handler)
		}
	}

	return s.addJob(opts.Expression, job)
}

// RemoveHandler removes a scheduled job by its entry ID
func (c *Scheduler) RemoveHandler(entryID int) {
	c.cron.Remove(rcron.EntryID(entryID))
}

// Start begins executing scheduled jobs
func (c *Scheduler) Start(_ context.Context) error {
	c.cron.Start()
	return nil
}

// Stop stops executing scheduled jobs
func (c *Scheduler) Stop(_ context.Context) error {
	c.cron.Stop()
	return nil
}

func makeRunnerOptions(s *Scheduler, opts command.HandlerConfig) []runner.Option {
	runnerOpts := []runner.Option{
		runner.WithMaxRetries(opts.MaxRetries),
		runner.WithDeadline(opts.Deadline),
		runner.WithRunOnce(opts.RunOnce),
		runner.WithErrorHandler(s.errorHandler),
		runner.WithLogger(s.logger),
	}
	if opts.NoTimeout {
		runnerOpts = append(runnerOpts, runner.WithNoTimeout())
	} else if opts.Timeout > 0 {
		runnerOpts = append(runnerOpts, runner.WithTimeout(opts.Timeout))
	}
	if opts.MaxRuns > 0 {
		runnerOpts = append(runnerOpts, runner.WithMaxRuns(opts.MaxRuns))
	}
	return runnerOpts
}

func makeSimpleJob(ctx context.Context, s *Scheduler, h *runner.Handler, fn func()) rcron.Job {
	return rcron.FuncJob(func() {
		err := h.Run(ctx, func(ctx context.Context) error {
			fn()
			return nil
		})
		if err != nil {
			s.errorHandler(err)
		}
	})
}

func makeErrorJob(ctx context.Context, s *Scheduler, h *runner.Handler, fn func() error) rcron.Job {
	return rcron.FuncJob(func() {
		err := h.Run(ctx, func(ctx context.Context) error {
			return fn()
		})
		if err != nil {
			s.errorHandler(err)
		}
	})
}

// TODO: Is there a way we can actually make this so that the message is not an empty message?!
func makeCommandJob[T any](ctx context.Context, s *Scheduler, h *runner.Handler, handler command.CommandFunc[T]) rcron.Job {
	return rcron.FuncJob(func() {
		var msg T
		if err := runner.RunCommand(ctx, h, handler, msg); err != nil {
			s.errorHandler(err)
		}
	})
}

func makeLogger(out io.Writer, level LogLevel) rcron.Logger {
	stdLogger := log.New(out, "cron: ", log.LstdFlags)
	cronLogger := rcron.PrintfLogger(stdLogger)
	if level >= LogLevelDebug {
		cronLogger = rcron.VerbosePrintfLogger(stdLogger)
	}
	return cronLogger
}

// tryCommandJob attempts to match any command.Commander[T] or command.CommandFunc[T]
func tryCommandJob(handler any, s *Scheduler, h *runner.Handler) rcron.Job {
	if handler == nil {
		return nil
	}

	handlerValue := reflect.ValueOf(handler)
	handlerType := handlerValue.Type()

	if handlerType.Kind() == reflect.Func {
		msgType, ok := commandFuncMessageType(handlerType)
		if !ok {
			return nil
		}
		wrappedFunc := func(ctx context.Context, msg any) error {
			msgValue := buildMessageValue(msgType, msg)
			results := handlerValue.Call([]reflect.Value{reflect.ValueOf(ctx), msgValue})
			if err, ok := results[0].Interface().(error); ok {
				return err
			}
			return nil
		}
		return makeCommandJob(context.Background(), s, h, wrappedFunc)
	}

	msgType, ok := commandExecuteMessageType(handlerType)
	if !ok {
		return nil
	}
	wrappedFunc := func(ctx context.Context, msg any) error {
		msgValue := buildMessageValue(msgType, msg)
		results := handlerValue.MethodByName("Execute").Call([]reflect.Value{reflect.ValueOf(ctx), msgValue})
		if err, ok := results[0].Interface().(error); ok {
			return err
		}
		return nil
	}
	return makeCommandJob(context.Background(), s, h, wrappedFunc)

}

func commandFuncMessageType(handlerType reflect.Type) (reflect.Type, bool) {
	contextType := reflect.TypeOf((*context.Context)(nil)).Elem()
	errorType := reflect.TypeOf((*error)(nil)).Elem()
	messageType := reflect.TypeOf((*command.Message)(nil)).Elem()

	if handlerType.NumIn() != 2 || handlerType.NumOut() != 1 {
		return nil, false
	}
	if !handlerType.In(0).Implements(contextType) {
		return nil, false
	}
	if !handlerType.Out(0).Implements(errorType) {
		return nil, false
	}
	msgType := handlerType.In(1)
	if !implementsMessage(msgType, messageType) {
		return nil, false
	}
	return msgType, true
}

func commandExecuteMessageType(handlerType reflect.Type) (reflect.Type, bool) {
	contextType := reflect.TypeOf((*context.Context)(nil)).Elem()
	errorType := reflect.TypeOf((*error)(nil)).Elem()
	messageType := reflect.TypeOf((*command.Message)(nil)).Elem()

	method, ok := handlerType.MethodByName("Execute")
	if !ok {
		return nil, false
	}
	if method.Type.NumIn() != 3 || method.Type.NumOut() != 1 {
		return nil, false
	}
	if !method.Type.In(1).Implements(contextType) {
		return nil, false
	}
	if !method.Type.Out(0).Implements(errorType) {
		return nil, false
	}
	msgType := method.Type.In(2)
	if !implementsMessage(msgType, messageType) {
		return nil, false
	}
	return msgType, true
}

func implementsMessage(msgType, messageType reflect.Type) bool {
	if msgType == nil {
		return false
	}
	if msgType.Implements(messageType) {
		return true
	}
	if msgType.Kind() == reflect.Ptr && msgType.Elem().Implements(messageType) {
		return true
	}
	if msgType.Kind() != reflect.Ptr && reflect.PtrTo(msgType).Implements(messageType) {
		return true
	}
	return false
}

func buildMessageValue(msgType reflect.Type, msg any) reflect.Value {
	if msg == nil {
		return reflect.Zero(msgType)
	}
	msgValue := reflect.ValueOf(msg)
	if !msgValue.IsValid() {
		return reflect.Zero(msgType)
	}
	if msgValue.Type().AssignableTo(msgType) {
		return msgValue
	}
	if msgValue.Type().ConvertibleTo(msgType) {
		return msgValue.Convert(msgType)
	}
	return reflect.Zero(msgType)
}

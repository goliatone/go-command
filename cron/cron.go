package cron

import (
	"context"
	"fmt"
	"io"
	"log"
	"os"
	"reflect"
	"sync"
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

// Scheduler wraps cron functionality.
type Scheduler struct {
	mu           sync.Mutex
	cron         *rcron.Cron
	location     *time.Location
	errorHandler func(error)

	logger    Logger
	parser    Parser
	logWriter io.Writer
	logLevel  LogLevel

	nextHandleID int64
	handles      map[int64]*cronSubscription
}

// NewScheduler creates a new scheduler instance with the provided options.
func NewScheduler(opts ...Option) *Scheduler {
	cs := &Scheduler{
		location: time.Local,
		parser:   DefaultParser,
		logLevel: LogLevelError,
		errorHandler: func(err error) {
			log.Printf("error: %v\n", err)
		},
		handles: make(map[int64]*cronSubscription),
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

// ScheduleCron schedules a recurring handler by cron expression.
func (s *Scheduler) ScheduleCron(opts command.HandlerConfig, handler any) (Handle, error) {
	if opts.Expression == "" {
		return nil, fmt.Errorf("cron expression cannot be empty")
	}
	run, err := s.buildRunnable(opts, handler)
	if err != nil {
		return nil, err
	}

	sub := s.newHandle()
	job := rcron.FuncJob(func() {
		status := sub.Status()
		if isTerminalStatus(status) {
			return
		}

		sub.setStatus(ScheduleStatusRunning, nil)
		if err := run(); err != nil {
			sub.setStatus(ScheduleStatusFailed, err)
			s.errorHandler(err)
			return
		}

		if !isTerminalStatus(sub.Status()) {
			sub.setStatus(ScheduleStatusIdle, nil)
		}
	})

	entryID, err := s.cron.AddJob(opts.Expression, job)
	if err != nil {
		return nil, fmt.Errorf("failed to add job: %w", err)
	}
	sub.entryID = int(entryID)
	s.storeHandle(sub)
	return sub, nil
}

// ScheduleAfter schedules one execution after delay.
func (s *Scheduler) ScheduleAfter(delay time.Duration, opts command.HandlerConfig, handler any) (Handle, error) {
	if delay < 0 {
		delay = 0
	}
	return s.ScheduleAt(time.Now().Add(delay), opts, handler)
}

// ScheduleAt schedules one execution at a specific time.
func (s *Scheduler) ScheduleAt(at time.Time, opts command.HandlerConfig, handler any) (Handle, error) {
	run, err := s.buildRunnable(opts, handler)
	if err != nil {
		return nil, err
	}

	sub := s.newHandle()
	s.storeHandle(sub)

	go func() {
		wait := time.Until(at)
		if wait < 0 {
			wait = 0
		}

		timer := time.NewTimer(wait)
		defer timer.Stop()

		select {
		case <-timer.C:
		case <-sub.Done():
			return
		}

		if isTerminalStatus(sub.Status()) {
			return
		}
		sub.setStatus(ScheduleStatusRunning, nil)
		if err := run(); err != nil {
			sub.setTerminal(ScheduleStatusFailed, err)
			s.errorHandler(err)
			s.removeStoredHandle(sub.id)
			return
		}
		sub.setTerminal(ScheduleStatusCompleted, nil)
		s.removeStoredHandle(sub.id)
	}()

	return sub, nil
}

// AddCommand is a type-safe compatibility wrapper around ScheduleCron.
func AddCommand[T any](s *Scheduler, opts command.HandlerConfig, handler command.CommandFunc[T]) (Subscription, error) {
	if s == nil {
		return nil, fmt.Errorf("scheduler cannot be nil")
	}
	return s.ScheduleCron(opts, handler)
}

// AddHandler registers a recurring handler for scheduled execution.
// Deprecated: prefer ScheduleCron/ScheduleAfter/ScheduleAt.
func (s *Scheduler) AddHandler(opts command.HandlerConfig, handler any) (Subscription, error) {
	return s.ScheduleCron(opts, handler)
}

// RemoveHandler removes a scheduled job by entry ID.
func (s *Scheduler) RemoveHandler(entryID int) {
	if s == nil {
		return
	}

	var affected []*cronSubscription
	s.mu.Lock()
	for id, handle := range s.handles {
		if handle != nil && handle.entryID == entryID {
			affected = append(affected, handle)
			delete(s.handles, id)
		}
	}
	s.mu.Unlock()

	s.cron.Remove(rcron.EntryID(entryID))
	for _, handle := range affected {
		handle.setTerminal(ScheduleStatusCanceled, nil)
	}
}

// Start begins executing scheduled cron jobs.
func (s *Scheduler) Start(_ context.Context) error {
	s.cron.Start()
	return nil
}

// Stop stops executing scheduled jobs and marks active handles as stopped.
func (s *Scheduler) Stop(_ context.Context) error {
	s.cron.Stop()

	var handles []*cronSubscription
	s.mu.Lock()
	for _, handle := range s.handles {
		handles = append(handles, handle)
	}
	s.handles = make(map[int64]*cronSubscription)
	s.mu.Unlock()

	for _, handle := range handles {
		if handle == nil {
			continue
		}
		if handle.entryID > 0 {
			s.cron.Remove(rcron.EntryID(handle.entryID))
		}
		if isTerminalStatus(handle.Status()) {
			continue
		}
		handle.setTerminal(ScheduleStatusStopped, nil)
	}
	return nil
}

func (s *Scheduler) removeHandle(id int64) {
	handle := s.removeStoredHandle(id)
	if handle == nil {
		return
	}
	if handle.entryID > 0 {
		s.cron.Remove(rcron.EntryID(handle.entryID))
	}
}

func (s *Scheduler) removeStoredHandle(id int64) *cronSubscription {
	if s == nil || id == 0 {
		return nil
	}
	s.mu.Lock()
	defer s.mu.Unlock()
	handle := s.handles[id]
	delete(s.handles, id)
	return handle
}

func (s *Scheduler) storeHandle(handle *cronSubscription) {
	if s == nil || handle == nil {
		return
	}
	s.mu.Lock()
	defer s.mu.Unlock()
	if s.handles == nil {
		s.handles = make(map[int64]*cronSubscription)
	}
	s.handles[handle.id] = handle
}

func (s *Scheduler) newHandle() *cronSubscription {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.nextHandleID++
	return &cronSubscription{
		scheduler: s,
		id:        s.nextHandleID,
		status:    ScheduleStatusScheduled,
		done:      make(chan struct{}),
	}
}

func isTerminalStatus(status ScheduleStatus) bool {
	switch status {
	case ScheduleStatusCompleted, ScheduleStatusCanceled, ScheduleStatusFailed, ScheduleStatusStopped:
		return true
	default:
		return false
	}
}

func (s *Scheduler) buildRunnable(opts command.HandlerConfig, handler any) (func() error, error) {
	runnerOpts := makeRunnerOptions(s, opts)
	h := runner.NewHandler(runnerOpts...)

	switch r := handler.(type) {
	case func():
		return func() error {
			r()
			return nil
		}, nil
	case func() error:
		return r, nil
	default:
		cmdRun := tryCommandRunnable(handler, h)
		if cmdRun == nil {
			return nil, fmt.Errorf("unsupported handler type: %T", handler)
		}
		return cmdRun, nil
	}
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

func makeLogger(out io.Writer, level LogLevel) rcron.Logger {
	stdLogger := log.New(out, "cron: ", log.LstdFlags)
	cronLogger := rcron.PrintfLogger(stdLogger)
	if level >= LogLevelDebug {
		cronLogger = rcron.VerbosePrintfLogger(stdLogger)
	}
	return cronLogger
}

// build converts implementation-agnostic options to rcron options.
func (s *Scheduler) build() []rcron.Option {
	opts := make([]rcron.Option, 0)

	if s.location != nil {
		opts = append(opts, rcron.WithLocation(s.location))
	}

	switch s.parser {
	case StandardParser:
		opts = append(opts, rcron.WithParser(rcron.NewParser(
			rcron.Minute|rcron.Hour|rcron.Dom|rcron.Month|rcron.Dow|rcron.Descriptor,
		)))
	case SecondsParser:
		opts = append(opts, rcron.WithParser(rcron.NewParser(
			rcron.Second|rcron.Minute|rcron.Hour|rcron.Dom|rcron.Month|rcron.Dow|rcron.Descriptor,
		)))
	}

	if s.errorHandler != nil {
		opts = append(opts, rcron.WithChain(
			rcron.Recover(&errorHandlerAdapter{handler: s.errorHandler}),
		))
	}

	var cronLogger rcron.Logger
	switch {
	case s.logger != nil:
		cronLogger = &loggerAdapter{logger: s.logger, level: s.logLevel}
	case s.logWriter != nil:
		cronLogger = makeLogger(s.logWriter, s.logLevel)
	default:
		if s.logLevel > LogLevelSilent {
			cronLogger = makeLogger(os.Stdout, s.logLevel)
		}
	}

	if cronLogger != nil {
		opts = append(opts, rcron.WithLogger(cronLogger))
	}

	return opts
}

// tryCommandRunnable attempts to match any command.Commander[T] or command.CommandFunc[T].
func tryCommandRunnable(handler any, h *runner.Handler) func() error {
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
		return func() error {
			return runner.RunCommand(context.Background(), h, command.CommandFunc[any](wrappedFunc), nil)
		}
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
	return func() error {
		return runner.RunCommand(context.Background(), h, command.CommandFunc[any](wrappedFunc), nil)
	}
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

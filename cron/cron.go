package cron

import (
	"context"
	"fmt"
	"io"
	"log"
	"os"
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
func AddCommand[T command.Message](s *Scheduler, opts command.HandlerConfig, handler command.CommandFunc[T]) (Subscription, error) {
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
func (s *Scheduler) AddHandler(opts command.HandlerConfig, handler any) (Subscription, error) {
	if opts.Expression == "" {
		return nil, fmt.Errorf("cron expression cannot be empty")
	}

	runnerOpts := makeRunnerOptions(s, opts)
	h := runner.NewHandler(runnerOpts...)

	var job rcron.Job
	switch r := handler.(type) {
	case command.Commander[command.Message]:
		job = makeCommandJob(context.Background(), s, h, r.Execute)
	case command.CommandFunc[command.Message]:
		job = makeCommandJob(context.Background(), s, h, r)
	case func():
		job = makeSimpleJob(context.Background(), s, h, r)
	case func() error:
		job = makeErrorJob(context.Background(), s, h, r)
	default:
		return nil, fmt.Errorf("unsupported handler type: %T", handler)
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
	return []runner.Option{
		runner.WithMaxRetries(opts.MaxRetries),
		runner.WithTimeout(opts.Timeout),
		runner.WithDeadline(opts.Deadline),
		runner.WithRunOnce(opts.RunOnce),
		runner.WithErrorHandler(s.errorHandler),
		runner.WithLogger(s.logger),
	}
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

func makeCommandJob[T command.Message](ctx context.Context, s *Scheduler, h *runner.Handler, handler command.CommandFunc[T]) rcron.Job {
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

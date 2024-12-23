package cron

import (
	"context"
	"fmt"
	"io"
	"log"
	"os"
	"time"

	"github.com/goliatone/command"
	"github.com/goliatone/command/runner"

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
		stdLogger := log.New(cs.logWriter, "cron: ", log.LstdFlags)
		cronLogger = rcron.PrintfLogger(stdLogger)
		if cs.logLevel >= LogLevelDebug {
			cronLogger = rcron.VerbosePrintfLogger(stdLogger)
		}
	default:
		if cs.logLevel > LogLevelSilent {
			stdLogger := log.New(os.Stdout, "cron: ", log.LstdFlags)
			cronLogger = rcron.PrintfLogger(stdLogger)
			if cs.logLevel >= LogLevelDebug {
				cronLogger = rcron.VerbosePrintfLogger(stdLogger)
			}
		}
	}

	if cronLogger != nil {
		opts = append(opts, rcron.WithLogger(cronLogger))
	}

	return opts
}

// AddCommand is a type-safe way to add command handlers
func AddCommand[T command.Message](s *Scheduler, opts HandlerOptions, handler command.CommandFunc[T]) (Subscription, error) {
	runnerOpts := createRunnerOptions(s, opts)
	h := runner.NewHandler(runnerOpts...)

	job := createCommandJob(context.Background(), s, h, handler)
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
func (s *Scheduler) AddHandler(opts HandlerOptions, handler any) (Subscription, error) {
	if opts.Expression == "" {
		return 0, fmt.Errorf("cron expression cannot be empty")
	}

	runnerOpts := createRunnerOptions(s, opts)
	h := runner.NewHandler(runnerOpts...)

	var job rcron.Job
	switch r := handler.(type) {
	case command.Commander[command.Message]:
		job = createCommandJob(context.Background(), s, h, r.Execute)
	case command.CommandFunc[command.Message]:
		job = createCommandJob(context.Background(), s, h, r)
	case func():
		job = createSimpleJob(context.Background(), s, h, r)
	case func() error:
		job = createErrorJob(context.Background(), s, h, r)
	default:
		return 0, fmt.Errorf("unsupported handler type: %T", handler)
	}

	return s.addJob(opts.Expression, job)
}

// wrapCommandHandler creates a cron.Job from a command handler
func (c *Scheduler) wrapCommandHandler(handler interface {
	Execute(context.Context, command.Message) error
}, h *runner.Handler) rcron.Job {
	return rcron.FuncJob(func() {
		ctx := context.Background()
		err := h.Run(ctx, func(ctx context.Context) error {
			return handler.Execute(ctx, nil)
		})
		if err != nil {
			c.errorHandler(err)
		}
	})
}

func (c *Scheduler) wrapSimpleHandler(handler func(), h *runner.Handler) rcron.Job {
	return rcron.FuncJob(func() {
		ctx := context.Background()
		err := h.Run(ctx, func(ctx context.Context) error {
			handler()
			return nil
		})
		if err != nil {
			c.errorHandler(err)
		}
	})
}

func (c *Scheduler) wrapErrorHandler(handler func() error, h *runner.Handler) rcron.Job {
	return rcron.FuncJob(func() {
		ctx := context.Background()
		err := h.Run(ctx, func(ctx context.Context) error {
			return handler()
		})
		if err != nil {
			c.errorHandler(err)
		}
	})
}

// RemoveHandler removes a scheduled job by its entry ID
func (c *Scheduler) RemoveHandler(entryID int) {
	c.cron.Remove(rcron.EntryID(entryID))
}

// Start begins executing scheduled jobs
func (c *Scheduler) Start() error {
	c.cron.Start()
	return nil
}

// Stop stops executing scheduled jobs
func (c *Scheduler) Stop() error {
	c.cron.Stop()
	return nil
}

func createRunnerOptions(s *Scheduler, opts HandlerOptions) []runner.Option {
	return []runner.Option{
		runner.WithMaxRetries(opts.MaxRetries),
		runner.WithTimeout(opts.Timeout),
		runner.WithDeadline(opts.Deadline),
		runner.WithRunOnce(opts.RunOnce),
		runner.WithErrorHandler(s.errorHandler),
		runner.WithLogger(s.logger),
	}
}

func createSimpleJob(ctx context.Context, s *Scheduler, h *runner.Handler, fn func()) rcron.Job {
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

func createErrorJob(ctx context.Context, s *Scheduler, h *runner.Handler, fn func() error) rcron.Job {
	return rcron.FuncJob(func() {
		err := h.Run(ctx, func(ctx context.Context) error {
			return fn()
		})
		if err != nil {
			s.errorHandler(err)
		}
	})
}

func createCommandJob[T command.Message](ctx context.Context, s *Scheduler, h *runner.Handler, handler command.CommandFunc[T]) rcron.Job {
	return rcron.FuncJob(func() {
		var msg T
		if err := runner.RunCommand(ctx, h, handler, msg); err != nil {
			s.errorHandler(err)
		}
	})
}

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

// CronScheduler wraps cron functionality
type CronScheduler struct {
	cron         *rcron.Cron
	location     *time.Location
	errorHandler func(error)
	logger       Logger
	parser       Parser
	logWriter    io.Writer
	logLevel     LogLevel
}

// Logger interface for the scheduler
type Logger interface {
	Info(msg string, args ...interface{})
	Error(msg string, args ...interface{})
}

// NewCronScheduler creates a new scheduler instance with the provided options
func NewCronScheduler(opts ...Option) *CronScheduler {
	cs := &CronScheduler{
		location: time.Local,
		parser:   DefaultParser,
		logLevel: LogLevelError,
		errorHandler: func(err error) {
			log.Printf("cron error: %v\n", err)
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
func (cs *CronScheduler) build() []rcron.Option {
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
		errorLogger := &errorHandlerAdapter{handler: cs.errorHandler}
		opts = append(opts, rcron.WithChain(
			rcron.Recover(errorLogger),
		))
	}

	var cronLogger rcron.Logger
	switch {
	case cs.logger != nil:
		cronLogger = &loggerAdapter{logger: cs.logger, level: cs.logLevel}
	case cs.logWriter != nil:
		stdLogger := log.New(cs.logWriter, "cron: ", log.LstdFlags)
		if cs.logLevel >= LogLevelDebug {
			cronLogger = rcron.VerbosePrintfLogger(stdLogger)
		} else {
			cronLogger = rcron.PrintfLogger(stdLogger)
		}
	default:
		if cs.logLevel > LogLevelSilent {
			stdLogger := log.New(os.Stdout, "cron: ", log.LstdFlags)
			if cs.logLevel >= LogLevelDebug {
				cronLogger = rcron.VerbosePrintfLogger(stdLogger)
			} else {
				cronLogger = rcron.PrintfLogger(stdLogger)
			}
		}
	}

	if cronLogger != nil {
		opts = append(opts, rcron.WithLogger(cronLogger))
	}

	return opts
}

// AddCommandHandler is a type-safe way to add command handlers
func AddCommandHandler[T command.Message](c *CronScheduler, opts HandlerOptions, handler command.CommandFunc[T]) (int, error) {
	runnerOpts := []runner.Option{
		runner.WithMaxRetries(opts.Retry),
		runner.WithTimeout(opts.Timeout),
		runner.WithDeadline(opts.Deadline),
		runner.WithRunOnce(opts.Once),
		runner.WithErrorHandler(c.errorHandler),
	}
	if c.logger != nil {
		runnerOpts = append(runnerOpts, runner.WithLogger(c.logger))
	}

	h := runner.NewHandler(runnerOpts...)

	job := rcron.FuncJob(func() {
		ctx := context.Background()
		var msg T
		err := runner.RunCommand(ctx, h, handler, msg)
		if err != nil {
			c.errorHandler(err)
		}
	})

	entryID, err := c.cron.AddJob(opts.Expression, job)
	if err != nil {
		return 0, fmt.Errorf("failed to add job: %w", err)
	}

	return int(entryID), nil
}

// AddHandler registers a handler for scheduled execution
// It accepts any handler type that implements the Message interface and returns
// an entryID that can be used to remove the job later
func (c *CronScheduler) AddHandler(opts HandlerOptions, handler any) (int, error) {
	if opts.Expression == "" {
		return 0, fmt.Errorf("cron expression cannot be empty")
	}

	var job rcron.Job
	if j, ok := c.tryCreateGenericJob(handler, opts); ok {
		job = j
	} else {
		return 0, fmt.Errorf("unsupported handler type: %T", handler)
	}

	entryID, err := c.cron.AddJob(opts.Expression, job)
	if err != nil {
		return 0, fmt.Errorf("failed to add job: %w", err)
	}

	return int(entryID), nil
}

func (c *CronScheduler) tryCreateGenericJob(handler any, opts HandlerOptions) (rcron.Job, bool) {
	// Create runner options
	runnerOpts := []runner.Option{
		runner.WithMaxRetries(opts.Retry),
		runner.WithTimeout(opts.Timeout),
		runner.WithDeadline(opts.Deadline),
		runner.WithRunOnce(opts.Once),
		runner.WithErrorHandler(c.errorHandler),
	}
	if c.logger != nil {
		runnerOpts = append(runnerOpts, runner.WithLogger(c.logger))
	}

	// Create a new runner.Handler
	r := runner.NewHandler(runnerOpts...)

	switch h := handler.(type) {
	case command.Commander[command.Message]:
		return c.wrapCommandHandler(h, r), true
	case command.CommandFunc[command.Message]:
		return c.wrapCommandHandler(h, r), true
	case func():
		return c.wrapSimpleHandler(h, r), true
	case func() error:
		return c.wrapErrorHandler(h, r), true
	}

	return nil, false
}

// wrapCommandHandler creates a cron.Job from a command handler
func (c *CronScheduler) wrapCommandHandler(handler interface {
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

func (c *CronScheduler) wrapSimpleHandler(handler func(), h *runner.Handler) rcron.Job {
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

func (c *CronScheduler) wrapErrorHandler(handler func() error, h *runner.Handler) rcron.Job {
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
func (c *CronScheduler) RemoveHandler(entryID int) {
	c.cron.Remove(rcron.EntryID(entryID))
}

// Start begins executing scheduled jobs
func (c *CronScheduler) Start() error {
	c.cron.Start()
	return nil
}

// Stop stops executing scheduled jobs
func (c *CronScheduler) Stop() error {
	c.cron.Stop()
	return nil
}

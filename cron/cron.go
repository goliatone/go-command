package cron

import (
	"context"
	"fmt"
	"io"
	"log"
	"os"
	"time"

	"github.com/goliatone/command"

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
		location: time.Local, // Set default location
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

	log.Printf("opts %v", cs.build())

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
	job := c.wrapErrorHandler(func() error {
		ctx := context.Background()
		return handler(ctx, *new(T))
	}, opts)

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
	switch h := handler.(type) {
	case command.Commander[command.Message]:
		return c.wrapCommandHandler(h, opts), true
	case command.CommandFunc[command.Message]:
		return c.wrapCommandHandler(h, opts), true
	case func():
		return c.wrapSimpleHandler(h, opts), true
	case func() error:
		return c.wrapErrorHandler(h, opts), true
	}
	return nil, false
}

// wrapCommandHandler creates a cron.Job from a command handler
func (c *CronScheduler) wrapCommandHandler(handler interface {
	Execute(context.Context, command.Message) error
}, opts HandlerOptions) rcron.Job {
	wrapper := &jobWrapper{
		scheduler: c,
		options:   opts,
	}

	return rcron.FuncJob(func() {
		wrapper.execute(context.Background(), func(ctx context.Context) error {
			return handler.Execute(ctx, nil)
		})
	})
}

func (c *CronScheduler) wrapSimpleHandler(handler func(), opts HandlerOptions) rcron.Job {
	wrapper := &jobWrapper{
		scheduler: c,
		options:   opts,
	}

	return rcron.FuncJob(func() {
		wrapper.execute(context.Background(), func(ctx context.Context) error {
			handler()
			return nil
		})
	})
}

func (c *CronScheduler) wrapErrorHandler(handler func() error, opts HandlerOptions) rcron.Job {
	wrapper := &jobWrapper{
		scheduler: c,
		options:   opts,
	}

	return rcron.FuncJob(func() {
		wrapper.execute(context.Background(), func(ctx context.Context) error {
			return handler()
		})
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

func wrapCommandHandler[T command.Message](c *CronScheduler, handler command.CommandFunc[T]) rcron.Job {
	return rcron.FuncJob(func() {
		ctx := context.Background()
		var msg T
		if err := handler(ctx, msg); err != nil {
			if c.errorHandler != nil {
				c.errorHandler(err)
			}

			if c.logger != nil {
				c.logger.Error("Error executing command handler: %v", err)
			}
		}
	})
}

// jobWrapper wraps a job with execution options
type jobWrapper struct {
	scheduler *CronScheduler
	options   HandlerOptions
	runs      int
	entryID   int
}

func (j *jobWrapper) execute(ctx context.Context, fn func(context.Context) error) {
	// If Once is true and we've already run, remove the job and return early.
	if j.options.Once && j.runs > 0 {
		j.removeIfNeeded()
		return
	}

	// Create a context with any timeout or deadline.
	ctx, cancel := j.contextWithSettings(ctx)
	defer cancel()

	// Try to execute the function up to j.options.Retry + 1 times.
	var err error
	for attempt := 0; attempt <= j.options.Retry; attempt++ {
		if err = fn(ctx); err == nil {
			break // success
		}

		// If there are more attempts left, log the failure and continue.
		if attempt < j.options.Retry {
			j.logError(
				"Job failed, attempt %d of %d: %v",
				attempt+1,
				j.options.Retry+1,
				err,
			)
		}
	}

	// If we still have an error after exhausting all attempts, handle it.
	if err != nil {
		j.handleError(err)
	}

	// Increment the run count.
	j.runs++
}

// removeIfNeeded removes the current job if we have a valid entry ID.
func (j *jobWrapper) removeIfNeeded() {
	if j.entryID != 0 {
		j.scheduler.RemoveHandler(j.entryID)
	}
}

// contextWithSettings returns a context with any configured timeout or deadline.
func (j *jobWrapper) contextWithSettings(parent context.Context) (context.Context, context.CancelFunc) {
	if j.options.Timeout == 0 && j.options.Deadline.IsZero() {
		return parent, func() {}
	}

	// If we have a non-zero timeout, wrap with WithTimeout.
	if j.options.Timeout > 0 {
		ctx, cancel := context.WithTimeout(parent, j.options.Timeout)
		// If we also have a deadline, nest it inside the existing timeout context.
		if !j.options.Deadline.IsZero() {
			ctxWithDeadline, deadlineCancel := context.WithDeadline(ctx, j.options.Deadline)
			return ctxWithDeadline, func() {
				// Always cancel both
				deadlineCancel()
				cancel()
			}
		}
		return ctx, cancel
	}

	return context.WithDeadline(parent, j.options.Deadline)
}

// logError is a convenience method to log errors if a logger is available.
func (j *jobWrapper) logError(format string, args ...interface{}) {
	if j.scheduler.logger != nil {
		j.scheduler.logger.Error(format, args...)
	}
}

// handleError calls the user-provided error handler (if any) and logs an error.
func (j *jobWrapper) handleError(err error) {
	if j.scheduler.errorHandler != nil {
		j.scheduler.errorHandler(err)
	}
	j.logError(
		"Job failed after %d attempts: %v",
		j.options.Retry+1,
		err,
	)
}

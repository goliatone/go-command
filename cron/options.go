package cron

import (
	"fmt"
	"io"
	"time"
)

// LogLevel represents different logging levels
type LogLevel int

const (
	LogLevelSilent LogLevel = iota
	LogLevelError
	LogLevelInfo
	LogLevelDebug
)

// Parser represents a cron expression parser type
type Parser int

const (
	DefaultParser Parser = iota
	StandardParser
	SecondsParser
)

// Option defines the functional option type for CronScheduler
type Option func(*CronScheduler)

// WithLocation sets the timezone location for the scheduler
func WithLocation(loc *time.Location) Option {
	return func(cs *CronScheduler) {
		cs.location = loc
	}
}

// WithLogger sets a custom logger for the scheduler
func WithLogger(logger Logger) Option {
	return func(cs *CronScheduler) {
		cs.logger = logger
	}
}

// WithLogWriter sets a custom writer for logging
func WithLogWriter(writer io.Writer) Option {
	return func(cs *CronScheduler) {
		cs.logWriter = writer
	}
}

// WithLogLevel sets the logging level
func WithLogLevel(level LogLevel) Option {
	return func(cs *CronScheduler) {
		cs.logLevel = level
	}
}

// WithErrorHandler sets a custom error handler for the scheduler
func WithErrorHandler(handler func(error)) Option {
	return func(cs *CronScheduler) {
		cs.errorHandler = handler
	}
}

// WithParser sets the type of cron expression parser to use
func WithParser(p Parser) Option {
	return func(cs *CronScheduler) {
		cs.parser = p
	}
}

// loggerAdapter adapts our Logger interface to robfig/cron's logger
type loggerAdapter struct {
	logger Logger
	level  LogLevel
}

func (l *loggerAdapter) Info(msg string, args ...interface{}) {
	if l.level >= LogLevelInfo {
		l.logger.Info(msg, args...)
	}
}

func (l *loggerAdapter) Error(err error, msg string, args ...interface{}) {
	if l.level >= LogLevelError {
		if err != nil {
			l.logger.Error(fmt.Sprintf("%s: %v", fmt.Sprintf(msg, args...), err))
		} else {
			l.logger.Error(msg, args...)
		}
	}
}

// errorHandlerAdapter adapts a simple error handler function to implement cron.Logger
type errorHandlerAdapter struct {
	handler func(error)
}

func (e *errorHandlerAdapter) Info(msg string, args ...interface{}) {
	// Info messages are ignored for error handler
}

func (e *errorHandlerAdapter) Error(err error, msg string, args ...interface{}) {
	if e.handler != nil {
		if err != nil {
			e.handler(err)
		} else {
			e.handler(fmt.Errorf(msg, args...))
		}
	}
}

// HandlerOptions defines scheduling options for a cron job
type HandlerOptions struct {
	Expression string
	Retry      int
	Timeout    time.Duration
	Deadline   time.Time
	Once       bool
}

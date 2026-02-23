package flow

import (
	"context"
	"fmt"
	"io"
	"os"
	"sort"
	"strings"
	"time"
)

// Logger is the runtime logging contract.
type Logger interface {
	Trace(msg string, args ...any)
	Debug(msg string, args ...any)
	Info(msg string, args ...any)
	Warn(msg string, args ...any)
	Error(msg string, args ...any)
	Fatal(msg string, args ...any)
	WithContext(ctx context.Context) Logger
}

// FieldsLogger extends Logger with structured-field support.
type FieldsLogger interface {
	WithFields(map[string]any) Logger
}

// FmtLogger is the local fallback logger used when no external logger is configured.
type FmtLogger struct {
	out    io.Writer
	ctx    context.Context
	fields map[string]any
}

// NewFmtLogger constructs a fallback logger writing to stdout when out is nil.
func NewFmtLogger(out io.Writer) *FmtLogger {
	if out == nil {
		out = os.Stdout
	}
	return &FmtLogger{out: out, ctx: context.Background()}
}

func (l *FmtLogger) Trace(msg string, args ...any) { l.log("TRACE", msg, args...) }
func (l *FmtLogger) Debug(msg string, args ...any) { l.log("DEBUG", msg, args...) }
func (l *FmtLogger) Info(msg string, args ...any)  { l.log("INFO", msg, args...) }
func (l *FmtLogger) Warn(msg string, args ...any)  { l.log("WARN", msg, args...) }
func (l *FmtLogger) Error(msg string, args ...any) { l.log("ERROR", msg, args...) }
func (l *FmtLogger) Fatal(msg string, args ...any) { l.log("FATAL", msg, args...) }

func (l *FmtLogger) WithContext(ctx context.Context) Logger {
	if l == nil {
		return NewFmtLogger(nil)
	}
	cp := *l
	if ctx == nil {
		ctx = context.Background()
	}
	cp.ctx = ctx
	return &cp
}

// WithFields adds fields on a shallow-copy logger.
func (l *FmtLogger) WithFields(fields map[string]any) Logger {
	if l == nil {
		return NewFmtLogger(nil)
	}
	cp := *l
	cp.fields = mergeFields(l.fields, fields)
	return &cp
}

func (l *FmtLogger) log(level, msg string, args ...any) {
	if l == nil {
		l = NewFmtLogger(nil)
	}
	if len(args) > 0 {
		msg = fmt.Sprintf(msg, args...)
	}
	line := fmt.Sprintf("%s %-5s %s", time.Now().UTC().Format(time.RFC3339Nano), level, strings.TrimSpace(msg))
	if fields := formatFields(l.fields); fields != "" {
		line += " " + fields
	}
	fmt.Fprintln(l.out, line)
}

func normalizeLogger(logger Logger) Logger {
	if logger == nil {
		return NewFmtLogger(nil)
	}
	return logger
}

func withLoggerFields(logger Logger, fields map[string]any) Logger {
	if logger == nil {
		return NewFmtLogger(nil)
	}
	if fl, ok := logger.(FieldsLogger); ok {
		return fl.WithFields(fields)
	}
	return logger
}

func mergeFields(a, b map[string]any) map[string]any {
	if len(a) == 0 && len(b) == 0 {
		return nil
	}
	out := make(map[string]any, len(a)+len(b))
	for k, v := range a {
		out[k] = v
	}
	for k, v := range b {
		out[k] = v
	}
	return out
}

func formatFields(fields map[string]any) string {
	if len(fields) == 0 {
		return ""
	}
	keys := make([]string, 0, len(fields))
	for k := range fields {
		keys = append(keys, k)
	}
	sort.Strings(keys)
	parts := make([]string, 0, len(keys))
	for _, k := range keys {
		parts = append(parts, fmt.Sprintf("%s=%v", k, fields[k]))
	}
	return strings.Join(parts, " ")
}

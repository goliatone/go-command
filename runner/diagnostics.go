package runner

import (
	"context"
	"fmt"
	"log/slog"

	gerrors "github.com/goliatone/go-errors"
)

func DefaultErrorHandler(err error) {
	logHandlerFailure(slog.Default(), err)
}

func logHandlerFailure(logger *slog.Logger, err error) {
	attrs := []slog.Attr{slog.String("error_type", fmt.Sprintf("%T", err))}
	reason := "operation_failed"
	level := slog.LevelError
	if gerrors.Is(err, context.DeadlineExceeded) {
		reason = "deadline_exceeded"
	}
	if gerrors.Is(err, context.Canceled) {
		reason = "context_canceled"
		level = slog.LevelDebug
	}
	attrs = append(attrs, slog.String("reason", reason))
	var structured *gerrors.Error
	if gerrors.As(err, &structured) {
		attrs = append(attrs, slog.String("error_code", structured.TextCode), slog.String("category", string(structured.Category)))
		for _, key := range []string{"attempt", "max_attempts", "total_attempts"} {
			if value, ok := structured.Metadata[key].(int); ok {
				attrs = append(attrs, slog.Int(key, value))
			}
		}
	}
	causeCode := ""
	for cause, depth := err, 0; cause != nil && depth < 12; depth++ {
		if structured, ok := cause.(*gerrors.Error); ok {
			causeCode = structured.TextCode
		}
		if coded, ok := cause.(interface{ Code() int }); ok {
			attrs = append(attrs, slog.Int("cause_number", coded.Code()))
		}
		if next := gerrors.Unwrap(cause); next != nil {
			cause = next
			continue
		}
		attrs = append(attrs, slog.String("cause_type", fmt.Sprintf("%T", cause)))
		break
	}
	if causeCode != "" {
		attrs = append(attrs, slog.String("cause_code", causeCode))
	}
	logger.LogAttrs(context.Background(), level, "command handler failed", attrs...)
}

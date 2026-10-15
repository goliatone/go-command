package runner

import (
	"bytes"
	"context"
	"errors"
	"log/slog"
	"strings"
	"testing"

	gerrors "github.com/goliatone/go-errors"
)

func TestFailureReportingUsesActualAttempts(t *testing.T) {
	sentinel := errors.New("failure")
	for _, tc := range []struct {
		name     string
		retries  int
		stop     bool
		cause    error
		code     string
		attempts int
	}{
		{"single", 0, false, sentinel, "HANDLER_EXECUTION_FAILED", 1},
		{"exhausted", 2, false, sentinel, "HANDLER_MAX_RETRIES_EXCEEDED", 3},
		{"policy stop", 4, true, sentinel, "HANDLER_EXECUTION_FAILED", 1},
		{"deadline", 0, false, context.DeadlineExceeded, "HANDLER_DEADLINE_EXCEEDED", 1},
		{"canceled", 0, false, context.Canceled, "HANDLER_CONTEXT_CANCELLED", 1},
	} {
		t.Run(tc.name, func(t *testing.T) {
			h := NewHandler(WithMaxRetries(tc.retries), WithExitOnError(tc.stop), WithErrorHandler(func(error) {}))
			calls := 0
			err := h.Run(context.Background(), func(context.Context) error { calls++; return tc.cause })
			var structured *gerrors.Error
			if !errors.As(err, &structured) || structured.TextCode != tc.code || structured.Metadata["total_attempts"] != tc.attempts || calls != tc.attempts || !errors.Is(err, tc.cause) {
				t.Fatalf("failure: %#v calls=%d", structured, calls)
			}
		})
	}
}

func TestDefaultFailureDiagnosticsPreserveCodesAndHideSourceText(t *testing.T) {
	var out bytes.Buffer
	cause := gerrors.Wrap(context.DeadlineExceeded, gerrors.CategoryExternal, "SECRET_CANARY").WithTextCode("SOURCE_TIMEOUT")
	wrapped := gerrors.Wrap(cause, gerrors.CategoryInternal, "SECRET_CANARY").WithTextCode("HANDLER_DEADLINE_EXCEEDED").WithMetadata(map[string]any{"total_attempts": 1, "token": "SECRET_CANARY"})
	logHandlerFailure(slog.New(slog.NewTextHandler(&out, nil)), wrapped)
	for _, want := range []string{"reason=deadline_exceeded", "cause_code=SOURCE_TIMEOUT", "total_attempts=1", "error_code=HANDLER_DEADLINE_EXCEEDED"} {
		if !strings.Contains(out.String(), want) {
			t.Fatalf("missing %s: %s", want, out.String())
		}
	}
	if strings.Contains(out.String(), "SECRET_CANARY") {
		t.Fatal(out.String())
	}
}

package rpc

import (
	"context"
	"errors"
	"maps"

	gerrors "github.com/goliatone/go-errors"
)

// Public error codes are stable transport classifications, not execution policy.
const (
	CodeInvalidArgument    = "INVALID_ARGUMENT"
	CodeUnauthenticated    = "UNAUTHENTICATED"
	CodeForbidden          = "FORBIDDEN"
	CodeNotFound           = "NOT_FOUND"
	CodeConflict           = "CONFLICT"
	CodeFailedPrecondition = "FAILED_PRECONDITION"
	CodeRateLimited        = "RATE_LIMITED"
	CodeUnavailable        = "UNAVAILABLE"
	CodeDeadlineExceeded   = "DEADLINE_EXCEEDED"
	CodeCanceled           = "CANCELED"
	CodeInternal           = "INTERNAL"
	CodeOutcomeUnknown     = "OUTCOME_UNKNOWN"
)

// ErrorMapper explicitly projects a Go error into a public error. Returning nil
// declines the mapping. Implementations must use controlled public messages and
// allowlisted, JSON-safe details; error text and diagnostic metadata are not safe
// by default. A mapper must not mutate err or shared details during a call.
// Retryable is informational and never authorizes automatic mutation replay.
type ErrorMapper func(context.Context, error) *Error

// MapError applies a host mapper, falling back to DefaultErrorMapper when nil or
// declined. A nil error returns nil without invoking the host. Transports opt in
// explicitly; Server.Invoke and handler-created envelopes are unchanged.
// The returned envelope and top-level details map are fresh; nested host details
// remain host-owned and must be immutable or independently allocated per call.
func MapError(ctx context.Context, err error, mapper ErrorMapper) *Error {
	if err == nil {
		return nil
	}
	if ctx == nil {
		ctx = context.Background()
	}
	if mapper != nil {
		if public := mapper(ctx, err); public != nil {
			out := *public
			out.Details = maps.Clone(public.Details)
			return &out
		}
	}
	return DefaultErrorMapper(ctx, err)
}

// DefaultErrorMapper returns fixed public classifications without copying source
// messages, arbitrary text codes, validation values, metadata or retry hints.
// Context causes take precedence, then the nearest structured error after known
// runner wrappers. Only the canonical text codes below are recognized; custom
// application codes/details require an explicit host ErrorMapper.
// Cancellation/deadline do not prove rollback, and unknown outcome is explicit.
func DefaultErrorMapper(_ context.Context, err error) (public *Error) {
	if err == nil {
		return nil
	}
	// Error inspection can panic, including go-errors.Unwrap on a typed nil
	// nested beneath an ordinary, runner or joined wrapper. Keep the public
	// fallback safe without mutating the original diagnostic error.
	defer func() {
		if recover() != nil {
			public = publicError(CodeInternal)
		}
	}()
	if errors.Is(err, context.Canceled) {
		return publicError(CodeCanceled)
	}
	if errors.Is(err, context.DeadlineExceeded) {
		return publicError(CodeDeadlineExceeded)
	}
	for err != nil {
		var rich *gerrors.Error
		if !errors.As(err, &rich) || rich == nil {
			break
		}
		if isRunnerErrorCode(rich.TextCode) {
			err = rich.Unwrap()
			continue
		}
		if public := publicError(rich.TextCode); public != nil {
			return public
		}
		switch rich.Category {
		case gerrors.CategoryValidation, gerrors.CategoryBadInput:
			return publicError(CodeInvalidArgument)
		case gerrors.CategoryAuth:
			return publicError(CodeUnauthenticated)
		case gerrors.CategoryAuthz:
			return publicError(CodeForbidden)
		case gerrors.CategoryNotFound:
			return publicError(CodeNotFound)
		case gerrors.CategoryConflict:
			return publicError(CodeConflict)
		case gerrors.CategoryRateLimit:
			return publicError(CodeRateLimited)
		case gerrors.CategoryExternal:
			return publicError(CodeUnavailable)
		}
		// An intentional non-runner classification is not bypassed for a deeper cause.
		break
	}
	return publicError(CodeInternal)
}

func isRunnerErrorCode(code string) bool {
	switch code {
	case "HANDLER_EXECUTION_FAILED", "HANDLER_MAX_RETRIES_EXCEEDED",
		"HANDLER_RETRY_ATTEMPT", "HANDLER_EXECUTION_CONTROLLED",
		"HANDLER_CONTEXT_CANCELLED", "HANDLER_DEADLINE_EXCEEDED":
		return true
	}
	return false
}

func publicError(code string) *Error {
	var category gerrors.Category
	var message string
	switch code {
	case CodeInvalidArgument:
		category, message = gerrors.CategoryValidation, "Invalid argument."
	case CodeUnauthenticated:
		category, message = gerrors.CategoryAuth, "Authentication required."
	case CodeForbidden:
		category, message = gerrors.CategoryAuthz, "Permission denied."
	case CodeNotFound:
		category, message = gerrors.CategoryNotFound, "Resource not found."
	case CodeConflict:
		category, message = gerrors.CategoryConflict, "Request conflicts with current state."
	case CodeFailedPrecondition:
		category, message = gerrors.CategoryOperation, "Precondition failed."
	case CodeRateLimited:
		category, message = gerrors.CategoryRateLimit, "Rate limit exceeded."
	case CodeUnavailable:
		category, message = gerrors.CategoryExternal, "Service unavailable."
	case CodeDeadlineExceeded:
		category, message = gerrors.CategoryExternal, "Deadline exceeded."
	case CodeCanceled:
		category, message = gerrors.CategoryExternal, "Request canceled."
	case CodeInternal:
		category, message = gerrors.CategoryInternal, "An unexpected error occurred."
	case CodeOutcomeUnknown:
		category, message = gerrors.CategoryExternal, "Operation outcome is unknown."
	default:
		return nil
	}
	return &Error{Code: code, Category: string(category), Message: message}
}

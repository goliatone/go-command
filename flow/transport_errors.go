package flow

import (
	"errors"
	"net/http"
	"strings"

	apperrors "github.com/goliatone/go-errors"
)

const (
	GRPCCodeAborted            = "Aborted"
	GRPCCodeAlreadyExists      = "AlreadyExists"
	GRPCCodeFailedPrecondition = "FailedPrecondition"
	GRPCCodeInternal           = "Internal"
	GRPCCodeNotFound           = "NotFound"
	GRPCCodePermissionDenied   = "PermissionDenied"
	GRPCCodeUnavailable        = "Unavailable"
)

const rpcCodeInternal = "FSM_INTERNAL"

// TransportErrorMapping defines protocol-level mappings for runtime errors.
type TransportErrorMapping struct {
	RuntimeCode string
	HTTPStatus  int
	GRPCCode    string
	RPCCode     string
}

// RPCErrorEnvelope is the internal RPC transport error shape.
type RPCErrorEnvelope struct {
	Code      string         `json:"code"`
	Message   string         `json:"message"`
	Category  string         `json:"category,omitempty"`
	Retryable bool           `json:"retryable,omitempty"`
	Details   map[string]any `json:"details,omitempty"`
}

// MapRuntimeError maps canonical runtime categories to transport protocol categories.
func MapRuntimeError(err error) TransportErrorMapping {
	code := strings.TrimSpace(runtimeErrorCode(err))

	switch code {
	case ErrCodeInvalidTransition:
		return TransportErrorMapping{
			RuntimeCode: code,
			HTTPStatus:  http.StatusConflict,
			GRPCCode:    GRPCCodeFailedPrecondition,
			RPCCode:     code,
		}
	case ErrCodeGuardRejected:
		return TransportErrorMapping{
			RuntimeCode: code,
			HTTPStatus:  http.StatusForbidden,
			GRPCCode:    GRPCCodePermissionDenied,
			RPCCode:     code,
		}
	case ErrCodeStateNotFound:
		return TransportErrorMapping{
			RuntimeCode: code,
			HTTPStatus:  http.StatusNotFound,
			GRPCCode:    GRPCCodeNotFound,
			RPCCode:     code,
		}
	case ErrCodeVersionConflict:
		return TransportErrorMapping{
			RuntimeCode: code,
			HTTPStatus:  http.StatusConflict,
			GRPCCode:    GRPCCodeAborted,
			RPCCode:     code,
		}
	case ErrCodePreconditionFailed:
		return TransportErrorMapping{
			RuntimeCode: code,
			HTTPStatus:  http.StatusPreconditionFailed,
			GRPCCode:    GRPCCodeFailedPrecondition,
			RPCCode:     code,
		}
	case ErrCodeIdempotencyConflict:
		return TransportErrorMapping{
			RuntimeCode: code,
			HTTPStatus:  http.StatusConflict,
			GRPCCode:    GRPCCodeAlreadyExists,
			RPCCode:     code,
		}
	case ErrCodeOrchestrationDegraded:
		return TransportErrorMapping{
			RuntimeCode: code,
			HTTPStatus:  http.StatusServiceUnavailable,
			GRPCCode:    GRPCCodeUnavailable,
			RPCCode:     code,
		}
	default:
		return TransportErrorMapping{
			RuntimeCode: code,
			HTTPStatus:  http.StatusInternalServerError,
			GRPCCode:    GRPCCodeInternal,
			RPCCode:     rpcCodeInternal,
		}
	}
}

// HTTPStatusForError returns the mapped HTTP status code for an engine error.
func HTTPStatusForError(err error) int {
	return MapRuntimeError(err).HTTPStatus
}

// GRPCCodeForError returns the mapped gRPC status code string for an engine error.
func GRPCCodeForError(err error) string {
	return MapRuntimeError(err).GRPCCode
}

// RPCErrorForError returns a canonical RPC envelope for engine/runtime errors.
func RPCErrorForError(err error) *RPCErrorEnvelope {
	if err == nil {
		return nil
	}
	mapping := MapRuntimeError(err)
	category := runtimeCategoryForMapping(mapping)
	if appErr := runtimeAppError(err); appErr != nil {
		if text := strings.TrimSpace(appErr.Category.String()); text != "" {
			category = text
		}
	}
	return &RPCErrorEnvelope{
		Code:      mapping.RPCCode,
		Message:   err.Error(),
		Category:  category,
		Retryable: isRetryableRuntimeError(err, mapping),
		Details:   runtimeErrorDetails(err, mapping),
	}
}

func runtimeAppError(err error) *apperrors.Error {
	if err == nil {
		return nil
	}
	var target *apperrors.Error
	if errors.As(err, &target) {
		return target
	}
	return nil
}

func runtimeErrorDetails(err error, mapping TransportErrorMapping) map[string]any {
	details := map[string]any{}
	if runtimeCode := strings.TrimSpace(mapping.RuntimeCode); runtimeCode != "" {
		details["runtime_code"] = runtimeCode
	}
	if appErr := runtimeAppError(err); appErr != nil {
		if code := strings.TrimSpace(appErr.TextCode); code != "" {
			details["runtime_code"] = code
		}
		if len(appErr.Metadata) > 0 {
			for key, value := range appErr.Metadata {
				details[key] = value
			}
		}
	}
	if len(details) == 0 {
		return nil
	}
	return details
}

func runtimeCategoryForMapping(mapping TransportErrorMapping) string {
	switch strings.TrimSpace(mapping.RuntimeCode) {
	case ErrCodeInvalidTransition, ErrCodeGuardRejected, ErrCodeStateNotFound, ErrCodePreconditionFailed:
		return string(apperrors.CategoryBadInput)
	case ErrCodeVersionConflict, ErrCodeIdempotencyConflict:
		return string(apperrors.CategoryConflict)
	case ErrCodeOrchestrationDegraded:
		return string(apperrors.CategoryExternal)
	default:
		return string(apperrors.CategoryInternal)
	}
}

func isRetryableRuntimeError(err error, mapping TransportErrorMapping) bool {
	if apperrors.IsRetryableError(err) {
		return true
	}
	return strings.TrimSpace(mapping.RuntimeCode) == ErrCodeOrchestrationDegraded
}

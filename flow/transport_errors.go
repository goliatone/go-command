package flow

import (
	"net/http"
	"strings"
)

const (
	GRPCCodeAborted            = "Aborted"
	GRPCCodeFailedPrecondition = "FailedPrecondition"
	GRPCCodeInternal           = "Internal"
	GRPCCodeNotFound           = "NotFound"
	GRPCCodePermissionDenied   = "PermissionDenied"
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
	Code    string `json:"code"`
	Message string `json:"message"`
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
	return &RPCErrorEnvelope{
		Code:    mapping.RPCCode,
		Message: err.Error(),
	}
}

package flow

import (
	"errors"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestMapRuntimeErrorCategories(t *testing.T) {
	cases := []struct {
		name       string
		err        error
		httpStatus int
		grpcCode   string
		rpcCode    string
	}{
		{
			name:       "invalid transition",
			err:        cloneRuntimeError(ErrInvalidTransition, "invalid transition", nil, nil),
			httpStatus: 409,
			grpcCode:   GRPCCodeFailedPrecondition,
			rpcCode:    ErrCodeInvalidTransition,
		},
		{
			name:       "guard rejected",
			err:        cloneRuntimeError(ErrGuardRejected, "guard rejected", nil, nil),
			httpStatus: 403,
			grpcCode:   GRPCCodePermissionDenied,
			rpcCode:    ErrCodeGuardRejected,
		},
		{
			name:       "state not found",
			err:        cloneRuntimeError(ErrStateNotFound, "state missing", nil, nil),
			httpStatus: 404,
			grpcCode:   GRPCCodeNotFound,
			rpcCode:    ErrCodeStateNotFound,
		},
		{
			name:       "version conflict",
			err:        cloneRuntimeError(ErrVersionConflict, "conflict", nil, nil),
			httpStatus: 409,
			grpcCode:   GRPCCodeAborted,
			rpcCode:    ErrCodeVersionConflict,
		},
		{
			name:       "precondition failed",
			err:        cloneRuntimeError(ErrPreconditionFailed, "precondition", nil, nil),
			httpStatus: 412,
			grpcCode:   GRPCCodeFailedPrecondition,
			rpcCode:    ErrCodePreconditionFailed,
		},
		{
			name:       "idempotency conflict",
			err:        cloneRuntimeError(ErrIdempotencyConflict, "idempotency conflict", nil, nil),
			httpStatus: 409,
			grpcCode:   GRPCCodeAlreadyExists,
			rpcCode:    ErrCodeIdempotencyConflict,
		},
		{
			name:       "orchestration degraded",
			err:        cloneRuntimeError(ErrOrchestrationDegraded, "orchestration degraded", nil, nil),
			httpStatus: 503,
			grpcCode:   GRPCCodeUnavailable,
			rpcCode:    ErrCodeOrchestrationDegraded,
		},
	}

	for _, tt := range cases {
		t.Run(tt.name, func(t *testing.T) {
			mapped := MapRuntimeError(tt.err)
			assert.Equal(t, tt.httpStatus, mapped.HTTPStatus)
			assert.Equal(t, tt.grpcCode, mapped.GRPCCode)
			assert.Equal(t, tt.rpcCode, mapped.RPCCode)
		})
	}
}

func TestMapRuntimeErrorUnknownDefaults(t *testing.T) {
	err := errors.New("boom")
	mapped := MapRuntimeError(err)
	assert.Equal(t, 500, mapped.HTTPStatus)
	assert.Equal(t, GRPCCodeInternal, mapped.GRPCCode)
	assert.Equal(t, rpcCodeInternal, mapped.RPCCode)

	rpcErr := RPCErrorForError(err)
	require.NotNil(t, rpcErr)
	assert.Equal(t, rpcCodeInternal, rpcErr.Code)
	assert.Equal(t, "boom", rpcErr.Message)
	assert.Equal(t, "internal", rpcErr.Category)
	assert.False(t, rpcErr.Retryable)
	assert.Nil(t, rpcErr.Details)
}

func TestRPCErrorForErrorPreservesStructuredDetails(t *testing.T) {
	err := cloneRuntimeError(
		ErrGuardRejected,
		"guard rejected by policy",
		nil,
		map[string]any{
			"machine_id":      "order",
			"entity_id":       "entity-1",
			"execution_id":    "exec-1",
			"guard_rejection": GuardRejection{Code: "POLICY_BLOCK", Category: GuardClassificationDomainReject, Message: "blocked"},
		},
	)
	rpcErr := RPCErrorForError(err)
	require.NotNil(t, rpcErr)
	assert.Equal(t, ErrCodeGuardRejected, rpcErr.Code)
	assert.Equal(t, "bad_input", rpcErr.Category)
	assert.False(t, rpcErr.Retryable)
	require.NotNil(t, rpcErr.Details)
	assert.Equal(t, ErrCodeGuardRejected, rpcErr.Details["runtime_code"])
	assert.Equal(t, "order", rpcErr.Details["machine_id"])
	assert.Equal(t, "entity-1", rpcErr.Details["entity_id"])
	assert.Equal(t, "exec-1", rpcErr.Details["execution_id"])
	assert.Contains(t, rpcErr.Details, "guard_rejection")
}

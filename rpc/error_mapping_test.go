package rpc_test

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"testing"

	"github.com/goliatone/go-command/rpc"
	gerrors "github.com/goliatone/go-errors"
	"github.com/stretchr/testify/require"
)

func TestDefaultErrorMapperClassifications(t *testing.T) {
	for _, tc := range []struct {
		category gerrors.Category
		code     string
	}{
		{gerrors.CategoryValidation, rpc.CodeInvalidArgument},
		{gerrors.CategoryBadInput, rpc.CodeInvalidArgument},
		{gerrors.CategoryAuth, rpc.CodeUnauthenticated},
		{gerrors.CategoryAuthz, rpc.CodeForbidden},
		{gerrors.CategoryNotFound, rpc.CodeNotFound},
		{gerrors.CategoryConflict, rpc.CodeConflict},
		{gerrors.CategoryRateLimit, rpc.CodeRateLimited},
		{gerrors.CategoryExternal, rpc.CodeUnavailable},
		{gerrors.CategoryInternal, rpc.CodeInternal},
		{gerrors.CategoryOperation, rpc.CodeInternal},
		{gerrors.Category("SECRET_CANARY"), rpc.CodeInternal},
	} {
		t.Run(string(tc.category), func(t *testing.T) {
			cause := gerrors.New("SECRET_CANARY", tc.category).WithTextCode("SECRET_CANARY").WithMetadata(map[string]any{"token": "SECRET_CANARY"})
			public := rpc.DefaultErrorMapper(context.Background(), fmt.Errorf("SECRET_CANARY: %w", cause))
			require.Equal(t, tc.code, public.Code)
			require.False(t, public.Retryable)
			require.Nil(t, public.Details)
			wire, err := json.Marshal(rpc.ResponseEnvelope[any]{Error: public})
			require.NoError(t, err)
			require.NotContains(t, string(wire), "SECRET_CANARY")
			require.Equal(t, "SECRET_CANARY", cause.Message)
		})
	}
	for _, code := range []string{rpc.CodeInvalidArgument, rpc.CodeUnauthenticated, rpc.CodeForbidden, rpc.CodeNotFound, rpc.CodeConflict, rpc.CodeFailedPrecondition, rpc.CodeRateLimited, rpc.CodeUnavailable, rpc.CodeDeadlineExceeded, rpc.CodeCanceled, rpc.CodeInternal, rpc.CodeOutcomeUnknown} {
		t.Run(code, func(t *testing.T) {
			got := rpc.DefaultErrorMapper(nil, gerrors.New("SECRET_CANARY").WithTextCode(code))
			require.Equal(t, code, got.Code)
			require.NotEmpty(t, got.Category)
			require.NotContains(t, got.Message, "SECRET_CANARY")
			require.False(t, got.Retryable)
		})
	}
}

func TestDefaultErrorMapperPrecedence(t *testing.T) {
	cause := gerrors.New("SECRET_CANARY", gerrors.CategoryConflict)
	for _, code := range []string{"HANDLER_EXECUTION_FAILED", "HANDLER_MAX_RETRIES_EXCEEDED", "HANDLER_RETRY_ATTEMPT", "HANDLER_EXECUTION_CONTROLLED", "HANDLER_CONTEXT_CANCELLED", "HANDLER_DEADLINE_EXCEEDED"} {
		wrapped := gerrors.Wrap(cause, gerrors.CategoryInternal, "SECRET_CANARY").WithTextCode(code)
		got := rpc.DefaultErrorMapper(nil, fmt.Errorf("outer: %w", wrapped))
		require.Equal(t, rpc.CodeConflict, got.Code, code)
		require.ErrorIs(t, wrapped, cause)
	}
	for _, tc := range []struct {
		err  error
		code string
	}{
		{context.Canceled, rpc.CodeCanceled}, {context.DeadlineExceeded, rpc.CodeDeadlineExceeded},
	} {
		wrapped := gerrors.Wrap(tc.err, gerrors.CategoryConflict, "SECRET_CANARY").WithTextCode(rpc.CodeConflict)
		require.Equal(t, tc.code, rpc.DefaultErrorMapper(nil, wrapped).Code)
	}
	outer := gerrors.Wrap(cause, gerrors.CategoryAuthz, "SECRET_CANARY")
	require.Equal(t, rpc.CodeForbidden, rpc.DefaultErrorMapper(nil, outer).Code)
	require.Equal(t, rpc.CodeInternal, rpc.DefaultErrorMapper(nil, errors.New("SECRET_CANARY")).Code)
	require.Nil(t, rpc.DefaultErrorMapper(nil, nil))
	var nilError *gerrors.Error
	require.Equal(t, rpc.CodeInternal, rpc.DefaultErrorMapper(nil, nilError).Code)
}

func TestMapErrorHostProjectionAndFallback(t *testing.T) {
	cause := errors.New("SECRET_CANARY")
	type contextKey struct{}
	ctx := context.WithValue(context.Background(), contextKey{}, "scope")
	projection := &rpc.Error{Code: "APP_CONFLICT", Category: "conflict", Message: "Choose another name.", Details: map[string]any{"field": "name"}, Retryable: true}
	host := func(gotCtx context.Context, gotErr error) *rpc.Error {
		require.Equal(t, "scope", gotCtx.Value(contextKey{}))
		require.Same(t, cause, gotErr)
		return projection
	}
	got := rpc.MapError(ctx, cause, host)
	require.Equal(t, projection, got)
	got.Code = "changed"
	got.Details["field"] = "changed"
	require.Equal(t, "APP_CONFLICT", projection.Code)
	require.Equal(t, "name", projection.Details["field"])
	require.Nil(t, rpc.MapError(nil, nil, func(context.Context, error) *rpc.Error { t.Fatal("called for nil"); return nil }))
	require.Equal(t, rpc.CodeInternal, rpc.MapError(nil, cause, nil).Code)
	require.Equal(t, rpc.CodeInternal, rpc.MapError(nil, cause, func(ctx context.Context, err error) *rpc.Error { require.NotNil(t, ctx); return nil }).Code)
}

func TestDefaultErrorMapperWrappedNil(t *testing.T) {
	var nilError *gerrors.Error
	for name, err := range map[string]error{
		"ordinary wrapper": fmt.Errorf("SECRET_CANARY: %w", nilError),
		"runner wrapper":   gerrors.Wrap(nilError, gerrors.CategoryInternal, "SECRET_CANARY").WithTextCode("HANDLER_EXECUTION_FAILED"),
		"joined cause":     errors.Join(errors.New("SECRET_CANARY"), nilError),
		"empty retryable":  &gerrors.RetryableError{},
	} {
		t.Run(name, func(t *testing.T) {
			var public *rpc.Error
			require.NotPanics(t, func() { public = rpc.MapError(nil, err, nil) })
			require.Equal(t, &rpc.Error{Code: rpc.CodeInternal, Category: "internal", Message: "An unexpected error occurred."}, public)
		})
	}
}

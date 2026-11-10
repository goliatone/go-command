package rpc_test

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"os"
	"testing"

	command "github.com/goliatone/go-command"
	"github.com/goliatone/go-command/rpc"
	"github.com/goliatone/go-command/runner"
	gerrors "github.com/goliatone/go-errors"
	"github.com/stretchr/testify/require"
)

// These exact Go envelope bytes are also consumed by the TypeScript client tests
// and can be reused by transports without importing go-admin.
func TestPublicErrorWireFixtures(t *testing.T) {
	raw, err := os.ReadFile("testdata/public_errors.json")
	require.NoError(t, err)
	var fixtures []struct {
		Name     string          `json:"name"`
		Response json.RawMessage `json:"response"`
	}
	require.NoError(t, json.Unmarshal(raw, &fixtures))
	require.Len(t, fixtures, 13)
	for _, fixture := range fixtures {
		t.Run(fixture.Name, func(t *testing.T) {
			cause := gerrors.New("SECRET_CANARY").WithTextCode(fixture.Name)
			var mapper rpc.ErrorMapper
			if fixture.Name == "APP_BUSY" {
				mapper = func(context.Context, error) *rpc.Error {
					return &rpc.Error{Code: "APP_BUSY", Message: "Try later.", Category: "external", Retryable: true, Details: map[string]any{"field": "name"}}
				}
			}
			got, err := json.Marshal(rpc.ResponseEnvelope[any]{Error: rpc.MapError(nil, cause, mapper)})
			require.NoError(t, err)
			var want bytes.Buffer
			require.NoError(t, json.Compact(&want, fixture.Response))
			require.Equal(t, want.String(), string(got))
			require.NotContains(t, string(got), "SECRET_CANARY")
		})
	}
}

func TestMappedInvocationPreservesReturnedErrorAndPanicDiagnostics(t *testing.T) {
	cause := errors.New("SECRET_CANARY")
	var diagnostic rpc.FailureEvent
	server := rpc.NewServer(rpc.WithFailureMode(rpc.FailureModeRecover), rpc.WithFailureLogger(func(event rpc.FailureEvent) { diagnostic = event }))
	for _, method := range []string{"return", "panic"} {
		require.NoError(t, server.RegisterEndpoint(rpc.NewEndpoint[struct{}, string](rpc.EndpointSpec{Method: method}, func(context.Context, rpc.RequestEnvelope[struct{}]) (rpc.ResponseEnvelope[string], error) {
			if method == "panic" {
				panic(cause)
			}
			return rpc.ResponseEnvelope[string]{}, cause
		})))
		_, err := server.Invoke(context.Background(), method, rpc.RequestEnvelope[struct{}]{})
		require.Error(t, err)
		if method == "return" {
			require.Same(t, cause, err)
		} else {
			require.Same(t, cause, diagnostic.Panic)
			require.Same(t, err, diagnostic.Err)
			require.Contains(t, err.Error(), "SECRET_CANARY")
		}
		public := rpc.MapError(context.Background(), err, nil)
		require.Equal(t, rpc.CodeInternal, public.Code)
		wire, marshalErr := json.Marshal(public)
		require.NoError(t, marshalErr)
		require.NotContains(t, string(wire), "SECRET_CANARY")
	}
}

func TestMappedRunnerFailurePreservesRetriesAndCauses(t *testing.T) {
	for _, tc := range []struct {
		name    string
		retries int
		stop    bool
		cause   error
		code    string
		calls   int
	}{
		{"single", 0, false, gerrors.New("SECRET_CANARY", gerrors.CategoryValidation), rpc.CodeInvalidArgument, 1},
		{"exhausted", 2, false, gerrors.New("SECRET_CANARY", gerrors.CategoryConflict), rpc.CodeConflict, 3},
		{"policy stop", 4, true, gerrors.New("SECRET_CANARY", gerrors.CategoryAuthz), rpc.CodeForbidden, 1},
		{"deadline", 0, false, context.DeadlineExceeded, rpc.CodeDeadlineExceeded, 1},
		{"canceled", 0, false, context.Canceled, rpc.CodeCanceled, 1},
	} {
		t.Run(tc.name, func(t *testing.T) {
			calls := 0
			var observed error
			h := runner.NewHandler(runner.WithMaxRetries(tc.retries), runner.WithExitOnError(tc.stop), runner.WithRetryStrategy(runner.NoDelayStrategy{}), runner.WithErrorHandler(func(err error) { observed = err }))
			err := h.Run(context.Background(), func(context.Context) error { calls++; return tc.cause })
			require.Equal(t, tc.calls, calls)
			require.ErrorIs(t, err, tc.cause)
			require.ErrorIs(t, observed, tc.cause)
			public := rpc.MapError(nil, err, nil)
			require.Equal(t, tc.code, public.Code)
			require.False(t, public.Retryable)
			require.ErrorIs(t, err, tc.cause)
			require.Equal(t, tc.calls, calls)
		})
	}
}

func TestMappingPreservesEnvelopeAndReceiptSemantics(t *testing.T) {
	receipt := command.CommandDispatchResponse{Receipt: command.DispatchReceipt{Accepted: true, Mode: command.ExecutionModeQueued, CommandID: "reindex", DispatchID: "dispatch-1"}, Result: map[string]any{"failed": true}, StatusReference: "/runs/dispatch-1"}
	server := rpc.NewServer()
	public := &rpc.Error{Code: "HANDLER_PUBLIC", Message: "Already projected."}
	response := rpc.ResponseEnvelope[command.CommandDispatchResponse]{Data: receipt, Error: public}
	require.NoError(t, server.RegisterEndpoint(rpc.NewEndpoint[struct{}, command.CommandDispatchResponse](rpc.EndpointSpec{Method: "receipt"}, func(context.Context, rpc.RequestEnvelope[struct{}]) (rpc.ResponseEnvelope[command.CommandDispatchResponse], error) {
		return response, nil
	})))
	out, err := server.Invoke(context.Background(), "receipt", rpc.RequestEnvelope[struct{}]{})
	require.NoError(t, err)
	require.Equal(t, response, out)
	require.Nil(t, rpc.MapError(nil, err, nil))
	response.Error = rpc.DefaultErrorMapper(nil, context.DeadlineExceeded)
	wire, err := json.Marshal(response)
	require.NoError(t, err)
	var decoded rpc.ResponseEnvelope[command.CommandDispatchResponse]
	require.NoError(t, json.Unmarshal(wire, &decoded))
	require.Equal(t, receipt, decoded.Data)
	require.Equal(t, rpc.CodeDeadlineExceeded, decoded.Error.Code)
	for _, envelope := range []any{rpc.ResponseEnvelope[bool]{}, rpc.ResponseEnvelope[int]{}, rpc.ResponseEnvelope[string]{}, rpc.ResponseEnvelope[[]string]{Data: []string{}}, rpc.ResponseEnvelope[any]{}} {
		wire, err := json.Marshal(envelope)
		require.NoError(t, err)
		require.Equal(t, "{}", string(wire))
	}
	wire, err = json.Marshal(rpc.ResponseEnvelope[any]{Error: &rpc.Error{Code: "LEGACY", Message: "Legacy message."}})
	require.NoError(t, err)
	require.Equal(t, `{"error":{"code":"LEGACY","message":"Legacy message."}}`, string(wire))
}

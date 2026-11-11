package rpc

import (
	"context"
	"encoding/json"
	"fmt"
	"reflect"
	"testing"

	"github.com/stretchr/testify/require"
)

type readinessStatefulRequest struct{ Kind *string }

func (r *readinessStatefulRequest) Type() string { return *r.Kind }

type readinessStatefulEndpoint struct {
	spec                EndpointSpec
	factories, handlers *int
}

func (e readinessStatefulEndpoint) Spec() EndpointSpec { return e.spec }
func (e readinessStatefulEndpoint) RequestType() reflect.Type {
	return reflect.TypeFor[*readinessStatefulRequest]()
}
func (e readinessStatefulEndpoint) ResponseType() reflect.Type          { return reflect.TypeFor[string]() }
func (e readinessStatefulEndpoint) ValidateEndpoint() []ValidationIssue { return nil }
func (e readinessStatefulEndpoint) NewRequest() any {
	*e.factories++
	kind := "initialized"
	return &readinessStatefulRequest{Kind: &kind}
}
func (e readinessStatefulEndpoint) Invoke(context.Context, any) (any, error) {
	*e.handlers++
	return "ok", nil
}

func TestReadinessStrictMessageTypeInferenceFailure(t *testing.T) {
	for _, mode := range []FailureMode{FailureModeReject, FailureModeRecover, FailureModeLogAndContinue} {
		t.Run(fmt.Sprint(mode), func(t *testing.T) {
			factories, handlers := 0, 0
			def := readinessStatefulEndpoint{EndpointSpec{Method: "stateful"}, &factories, &handlers}
			result := ValidateEndpoint(def)
			require.Equal(t, ValidationUnverifiable, result.Status)
			require.Equal(t, []ValidationIssue{{Method: "stateful", Code: IssueValidationPanicked, Status: ValidationUnverifiable, Message: "endpoint validation panicked"}}, result.Issues)
			strategyCalls, loggerCalls := 0, 0
			server := NewServer(WithStrictValidation(), WithFailureStrategy(func(event FailureEvent) FailureMode {
				strategyCalls++
				require.Equal(t, FailureStageRegister, event.Stage)
				require.Equal(t, "stateful", event.Method)
				var validationErr *EndpointValidationError
				require.ErrorAs(t, event.Err, &validationErr)
				require.Equal(t, result, validationErr.Validation)
				return mode
			}), WithFailureLogger(func(event FailureEvent) { loggerCalls++; require.Nil(t, event.Panic) }))
			var err error
			require.NotPanics(t, func() { err = server.RegisterEndpoint(def) })
			if mode == FailureModeLogAndContinue {
				require.NoError(t, err)
				require.Equal(t, 1, loggerCalls)
			} else {
				require.Error(t, err)
				require.Zero(t, loggerCalls)
			}
			require.Equal(t, 1, strategyCalls)
			require.Empty(t, server.Endpoints())
			_, err = server.NewRequestForMethod("stateful")
			require.Error(t, err)
			first := server.ValidateEndpoints()
			require.False(t, first.Ready)
			require.Equal(t, result.Issues, first.RegistrationIssues)
			require.Equal(t, first, server.ValidateEndpoints())
			// Supplying explicit static metadata repairs registration, without invoking
			// request Type() on an uninitialized zero value or erasing startup evidence.
			def.spec.MessageType = "stateful.request"
			require.Equal(t, ValidationValid, ValidateEndpoint(def).Status)
			require.NoError(t, server.RegisterEndpoint(def))
			require.False(t, server.ValidateEndpoints().Ready)
			require.Zero(t, factories)
			require.Zero(t, handlers)
			fresh := NewServer(WithStrictValidation())
			require.NoError(t, fresh.RegisterEndpoint(def))
			require.True(t, fresh.ValidateEndpoints().Ready)
			request, err := fresh.NewRequestForMethod("stateful")
			require.NoError(t, err)
			require.Equal(t, "initialized", request.(*readinessStatefulRequest).Type())
			_, err = fresh.Invoke(context.Background(), "stateful", request)
			require.NoError(t, err)
			require.Equal(t, 1, factories)
			require.Equal(t, 1, handlers)
		})
	}
}

func TestReadinessStrictRejectsPaddedMethodIdentity(t *testing.T) {
	for _, method := range []string{" method", "method ", "\tmethod", "method\n", "\u00a0method\u2003"} {
		for _, mode := range []FailureMode{FailureModeReject, FailureModeRecover, FailureModeLogAndContinue} {
			t.Run(fmt.Sprintf("%q/%d", method, mode), func(t *testing.T) {
				called := 0
				def := readinessEndpoint(method, &called)
				result := ValidateEndpoint(def)
				require.Equal(t, ValidationInvalid, result.Status)
				require.Equal(t, "method_invalid", result.Issues[0].Code)
				require.Equal(t, method, result.Method)
				server := NewServer(WithStrictValidation(), WithFailureMode(mode))
				err := server.RegisterEndpoint(def)
				if mode == FailureModeLogAndContinue {
					require.NoError(t, err)
				} else {
					require.Error(t, err)
				}
				require.Empty(t, server.Endpoints())
				require.False(t, server.ValidateEndpoints().Ready)
				require.Equal(t, result.Issues, server.ValidateEndpoints().RegistrationIssues)
				require.Zero(t, called)
				// Default mode still registers the exact historical identity.
				legacy := NewServer()
				require.NoError(t, legacy.RegisterEndpoint(def))
				require.Equal(t, method, legacy.Endpoints()[0].Method)
			})
		}
	}
}

func TestReadinessDefaultMetadataInferenceAndBuiltInParity(t *testing.T) {
	factories, handlers := 0, 0
	def := readinessStatefulEndpoint{EndpointSpec{Method: "legacy.stateful"}, &factories, &handlers}
	// Preserve legacy panic behavior; only strict registration is hardened.
	require.Panics(t, func() { _ = NewServer(WithFailureMode(FailureModeRecover)).RegisterEndpoint(def) })
	valid := readinessEndpoint("valid.method", nil)
	strict := NewServer(WithStrictValidation())
	legacy := NewServer()
	require.NoError(t, strict.RegisterEndpoint(valid))
	require.NoError(t, legacy.RegisterEndpoint(valid))
	require.Equal(t, legacy.Endpoints(), strict.Endpoints())
	for i := 0; i < 3; i++ {
		report, err := json.Marshal(strict.ValidateEndpoints())
		require.NoError(t, err)
		require.Contains(t, string(report), `"ready":true`)
	}
}

package command

import (
	"context"
	stderrors "errors"
	"reflect"
	"testing"

	gerrors "github.com/goliatone/go-errors"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

type routedContractMessage struct{}

func (routedContractMessage) Type() string { return "routed.contract" }

type routedContractRegistration struct{}

func (routedContractRegistration) ID() string          { return "contract" }
func (routedContractRegistration) MessageType() string { return "routed.contract" }
func (routedContractRegistration) Kind() HandlerKind   { return HandlerKindQuery }
func (routedContractRegistration) NewMessage() any     { return &routedContractMessage{} }
func (routedContractRegistration) RequestType() reflect.Type {
	return reflect.TypeFor[*routedContractMessage]()
}
func (routedContractRegistration) ResultType() reflect.Type { return reflect.TypeFor[string]() }

type routedContractPort struct{}

func (routedContractPort) ResolvePlacement(context.Context, MessageRegistration, DispatchOptions) (DispatchRoute, bool, error) {
	return DispatchRoute{Target: DispatchTargetRemote, Name: "worker"}, true, nil
}

func (routedContractPort) InvokeLocal(context.Context, MessageRegistration, any, DispatchOptions) (DispatchOutcome, error) {
	return DispatchOutcome{Target: DispatchTargetLocal}, nil
}

func (routedContractPort) DispatchRemote(context.Context, DispatchRoute, MessageRegistration, any, DispatchOptions) (DispatchOutcome, error) {
	return DispatchOutcome{Target: DispatchTargetRemote}, nil
}

func TestRoutedDispatchPortsRemainTransportNeutral(t *testing.T) {
	var _ PlacementResolver = routedContractPort{}
	var _ LocalInvoker = routedContractPort{}
	var _ RemoteDispatcher = routedContractPort{}

	outcome, err := (routedContractPort{}).DispatchRemote(
		context.Background(),
		DispatchRoute{Target: DispatchTargetRemote, Name: "worker"},
		routedContractRegistration{},
		&routedContractMessage{},
		DispatchOptions{},
	)
	require.NoError(t, err)
	assert.Equal(t, DispatchTargetRemote, outcome.Target)
}

func TestRoutedErrorsAreClassifiedAndStructured(t *testing.T) {
	reg := routedContractRegistration{}
	tests := []struct {
		name string
		err  error
		code string
		cat  gerrors.Category
	}{
		{"registration not found", NewRegistrationNotFoundError(HandlerKindQuery, "contract"), TextCodeRegistrationNotFound, gerrors.CategoryNotFound},
		{"registration conflict", NewRegistrationConflictError(HandlerKindQuery, "contract"), TextCodeRegistrationConflict, gerrors.CategoryConflict},
		{"provider missing", NewRegistrationProviderNotConfiguredError(), TextCodeRegistrationProviderNotConfigured, gerrors.CategoryConflict},
		{"message mismatch", NewDynamicMessageTypeMismatchError(reg, 42), TextCodeDynamicMessageTypeMismatch, gerrors.CategoryValidation},
		{"result mismatch", NewDynamicResultTypeMismatchError(reg, 42), TextCodeDynamicResultTypeMismatch, gerrors.CategoryValidation},
		{"result missing", NewDynamicResultMissingError(reg), TextCodeDynamicResultMissing, gerrors.CategoryCommand},
		{"remote missing", NewRemoteDispatcherNotConfiguredError(reg, DispatchRoute{Name: "worker"}), TextCodeRemoteDispatcherNotConfigured, gerrors.CategoryConflict},
		{"local required", NewLocalInvocationRequiredError(reg), TextCodeLocalInvocationRequired, gerrors.CategoryConflict},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			var got *gerrors.Error
			require.True(t, gerrors.As(tt.err, &got))
			assert.Equal(t, tt.code, got.TextCode)
			assert.Equal(t, tt.cat, got.Category)
		})
	}
}

func TestPlacementErrorPreservesStructuredMetadata(t *testing.T) {
	source := gerrors.Wrap(stderrors.New("policy store unavailable"), gerrors.CategoryExternal, "lookup failed").
		WithTextCode("POLICY_STORE_UNAVAILABLE").
		WithMetadata(map[string]any{"provider": "test"})

	err := NewPlacementResolutionError(routedContractRegistration{}, source)
	assert.Equal(t, TextCodePlacementResolutionFailed, err.TextCode)
	assert.Equal(t, gerrors.CategoryExternal, err.Category)
	assert.Equal(t, "test", err.Metadata["provider"])
	assert.Equal(t, "POLICY_STORE_UNAVAILABLE", err.Metadata["source_text_code"])

	withoutSource := NewPlacementResolutionError(routedContractRegistration{}, nil)
	assert.Equal(t, TextCodePlacementResolutionFailed, withoutSource.TextCode)
	assert.Equal(t, gerrors.CategoryRouting, withoutSource.Category)
}

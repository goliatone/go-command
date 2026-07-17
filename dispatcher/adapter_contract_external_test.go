package dispatcher_test

import (
	"context"
	"reflect"
	"testing"

	command "github.com/goliatone/go-command"
	"github.com/goliatone/go-command/dispatcher"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

type adapterContractMessage struct{}

func (adapterContractMessage) Type() string { return "adapter.contract" }

type adapterContractRegistration struct{}

func (adapterContractRegistration) ID() string                { return "adapter.contract" }
func (adapterContractRegistration) MessageType() string       { return "adapter.contract" }
func (adapterContractRegistration) Kind() command.HandlerKind { return command.HandlerKindCommand }
func (adapterContractRegistration) NewMessage() any           { return &adapterContractMessage{} }
func (adapterContractRegistration) RequestType() reflect.Type {
	return reflect.TypeFor[adapterContractMessage]()
}
func (adapterContractRegistration) ResultType() reflect.Type { return nil }

type exportedFakeRemote struct{}

func (exportedFakeRemote) DispatchRemote(
	_ context.Context,
	route command.DispatchRoute,
	registration command.MessageRegistration,
	_ any,
	options command.DispatchOptions,
) (command.DispatchOutcome, error) {
	return command.DispatchOutcome{
		Receipt: command.DispatchReceipt{
			Accepted:      true,
			Mode:          options.Mode,
			CommandID:     registration.ID(),
			CorrelationID: options.CorrelationID,
		},
		Target: command.DispatchTargetRemote,
		Route:  route.Name,
	}, nil
}

func TestExportedAdapterContractCompilesAndDispatches(t *testing.T) {
	provider, err := command.NewMessageRegistrationIndex(adapterContractRegistration{})
	require.NoError(t, err)
	runtime := dispatcher.NewRuntime()
	require.NoError(t, runtime.AttachRegistrationProvider(provider))
	require.NoError(t, runtime.ReplacePlacementPolicies(command.PlacementPolicy{
		Kind:           command.HandlerKindCommand,
		RegistrationID: "adapter.contract",
		Route: command.DispatchRoute{
			Target: command.DispatchTargetRemote,
			Name:   "logical-route",
		},
	}))
	require.NoError(t, runtime.ConfigureRemoteDispatcher(exportedFakeRemote{}))
	require.NoError(t, runtime.RoutedReady())

	outcome, err := runtime.Dispatch(
		context.Background(),
		command.HandlerKindCommand,
		adapterContractMessage{},
		command.DispatchOptions{Mode: command.ExecutionModeInline},
	)
	require.NoError(t, err)
	assert.Equal(t, command.DispatchTargetRemote, outcome.Target)
	assert.Equal(t, "logical-route", outcome.Route)
}

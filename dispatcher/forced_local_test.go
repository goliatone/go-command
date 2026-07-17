package dispatcher

import (
	"context"
	"testing"

	"github.com/goliatone/go-command"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

type ingressOuterMessage struct {
	Route string
}

func (ingressOuterMessage) Type() string { return "ingress.outer" }

type ingressInnerMessage struct {
	Target string
}

func (ingressInnerMessage) Type() string { return "ingress.inner" }

func TestInvokeLocalMarksNestedCompatibilityDispatchForcedLocal(t *testing.T) {
	runtime := NewRuntime()
	var outerCalls, innerCalls int
	SubscribeCommandTo(runtime, command.CommandFunc[ingressOuterMessage](func(ctx context.Context, _ ingressOuterMessage) error {
		outerCalls++
		_, err := DispatchWith(ctx, ingressInnerMessage{Target: "attacker-route"}, command.DispatchOptions{})
		return err
	}))
	SubscribeCommandTo(runtime, command.CommandFunc[ingressInnerMessage](func(context.Context, ingressInnerMessage) error {
		innerCalls++
		return nil
	}))
	registry := command.NewRegistry()
	require.NoError(t, registry.RegisterCommand(command.CommandFunc[ingressOuterMessage](func(context.Context, ingressOuterMessage) error { return nil })))
	require.NoError(t, registry.RegisterCommand(command.CommandFunc[ingressInnerMessage](func(context.Context, ingressInnerMessage) error { return nil })))
	require.NoError(t, registry.Initialize())
	require.NoError(t, runtime.AttachRegistrationProvider(registry))
	outerRegistration, ok := registry.RegistrationByMessageType(command.HandlerKindCommand, "ingress.outer")
	require.True(t, ok)
	innerRegistration, ok := registry.RegistrationByMessageType(command.HandlerKindCommand, "ingress.inner")
	require.True(t, ok)
	require.NoError(t, runtime.ReplacePlacementPolicies(
		command.PlacementPolicy{Kind: command.HandlerKindCommand, RegistrationID: outerRegistration.ID(), Route: command.DispatchRoute{Target: command.DispatchTargetRemote, Name: "remote"}},
		command.PlacementPolicy{Kind: command.HandlerKindCommand, RegistrationID: innerRegistration.ID(), Route: command.DispatchRoute{Target: command.DispatchTargetRemote, Name: "remote"}},
	))
	remote := &fakeRemoteDispatcher{dispatch: func(context.Context, command.DispatchRoute, command.MessageRegistration, any, command.DispatchOptions) (command.DispatchOutcome, error) {
		t.Fatal("forced-local nested dispatch reached remote port")
		return command.DispatchOutcome{}, nil
	}}
	require.NoError(t, runtime.ConfigureRemoteDispatcher(remote))
	restore, err := InstallDefaultRuntime(runtime)
	require.NoError(t, err)
	t.Cleanup(restore)

	_, err = runtime.InvokeLocalByID(context.Background(), command.HandlerKindCommand, outerRegistration.ID(), ingressOuterMessage{Route: "attacker-route"}, command.DispatchOptions{})
	require.NoError(t, err)
	assert.Equal(t, 1, outerCalls)
	assert.Equal(t, 1, innerCalls)
	assert.Zero(t, remote.calls.Load())
}

func TestForcedLocalContextBypassesRemotePlacement(t *testing.T) {
	runtime, _ := buildDynamicRuntime(t)
	registration, ok := runtime.RegistrationProvider().RegistrationByMessageType(command.HandlerKindCommand, "dynamic.command")
	require.True(t, ok)
	require.NoError(t, runtime.ReplacePlacementPolicies(command.PlacementPolicy{
		Kind: command.HandlerKindCommand, RegistrationID: registration.ID(),
		Route: command.DispatchRoute{Target: command.DispatchTargetRemote, Name: "remote"},
	}))
	remote := &fakeRemoteDispatcher{dispatch: func(context.Context, command.DispatchRoute, command.MessageRegistration, any, command.DispatchOptions) (command.DispatchOutcome, error) {
		return command.DispatchOutcome{}, assert.AnError
	}}
	require.NoError(t, runtime.ConfigureRemoteDispatcher(remote))
	ctx := command.ContextWithForcedLocalDispatch(context.Background())
	_, err := runtime.Dispatch(ctx, command.HandlerKindCommand, dynamicCommandMessage{}, command.DispatchOptions{})
	require.NoError(t, err)
	assert.Zero(t, remote.calls.Load())
}

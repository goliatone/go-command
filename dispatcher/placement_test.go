package dispatcher

import (
	"context"
	stderrors "errors"
	"testing"

	"github.com/goliatone/go-command"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

type placementResolverFunc func(context.Context, command.MessageRegistration, command.DispatchOptions) (command.DispatchRoute, bool, error)

func (f placementResolverFunc) ResolvePlacement(ctx context.Context, registration command.MessageRegistration, options command.DispatchOptions) (command.DispatchRoute, bool, error) {
	return f(ctx, registration, options)
}

type typedNilPlacementResolver struct{}

func (*typedNilPlacementResolver) ResolvePlacement(context.Context, command.MessageRegistration, command.DispatchOptions) (command.DispatchRoute, bool, error) {
	panic("typed-nil placement resolver must be cleared before dispatch")
}

func TestRuntimePlacementDefaultsLocalAndRemoteFailsClosed(t *testing.T) {
	runtime, provider := buildDynamicRuntime(t)
	_, err := runtime.Dispatch(context.Background(), command.HandlerKindCommand, dynamicCommandMessage{}, command.DispatchOptions{})
	require.NoError(t, err)
	registration, ok := provider.RegistrationByMessageType(command.HandlerKindCommand, "dynamic.command")
	require.True(t, ok)

	require.NoError(t, runtime.ReplacePlacementPolicies(command.PlacementPolicy{
		Kind: command.HandlerKindCommand, RegistrationID: registration.ID(),
		Route: command.DispatchRoute{Target: command.DispatchTargetRemote, Name: "worker-a"},
	}))
	assertStructuredTextCode(t, runtime.RoutedReady(), command.TextCodeRemoteDispatcherNotConfigured)
	_, err = runtime.Dispatch(context.Background(), command.HandlerKindCommand, dynamicCommandMessage{}, command.DispatchOptions{})
	assertStructuredTextCode(t, err, command.TextCodeRemoteDispatcherNotConfigured)

	require.NoError(t, runtime.ReplacePlacementPolicies(command.PlacementPolicy{
		Kind: command.HandlerKindCommand, RegistrationID: registration.ID(),
		Route: command.DispatchRoute{Target: command.DispatchTargetLocal},
	}))
	_, err = runtime.Dispatch(context.Background(), command.HandlerKindCommand, dynamicCommandMessage{}, command.DispatchOptions{})
	require.NoError(t, err)
}

func TestRuntimePlacementConfigurationRequiresProviderAndRejectsInvalidPolicies(t *testing.T) {
	runtime := NewRuntime()
	err := runtime.ConfigurePlacementResolver(placementResolverFunc(func(context.Context, command.MessageRegistration, command.DispatchOptions) (command.DispatchRoute, bool, error) {
		return command.DispatchRoute{}, false, nil
	}))
	assertStructuredTextCode(t, err, command.TextCodeRegistrationProviderNotConfigured)
	err = runtime.ReplacePlacementPolicies(command.PlacementPolicy{Kind: command.HandlerKindCommand, RegistrationID: "missing"})
	assertStructuredTextCode(t, err, command.TextCodeRegistrationProviderNotConfigured)

	runtime, _ = buildDynamicRuntime(t)
	err = runtime.ReplacePlacementPolicies(command.PlacementPolicy{
		Kind: command.HandlerKindCommand, RegistrationID: "missing",
		Route: command.DispatchRoute{Target: command.DispatchTargetRemote, Name: "worker"},
	})
	assertStructuredTextCode(t, err, command.TextCodeRegistrationNotFound)
}

func TestRuntimePlacementConfigurationTreatsTypedNilResolverAsClear(t *testing.T) {
	runtime, _ := buildDynamicRuntime(t)
	require.NoError(t, runtime.ConfigurePlacementResolver(placementResolverFunc(func(context.Context, command.MessageRegistration, command.DispatchOptions) (command.DispatchRoute, bool, error) {
		return command.DispatchRoute{Target: command.DispatchTargetRemote, Name: "worker"}, true, nil
	})))
	var resolver *typedNilPlacementResolver
	require.NoError(t, runtime.ConfigurePlacementResolver(resolver))
	_, err := runtime.Dispatch(context.Background(), command.HandlerKindCommand, dynamicCommandMessage{}, command.DispatchOptions{})
	require.NoError(t, err)
}

func TestRuntimePlacementResolverErrorsAndInvalidRoutesDoNotFallback(t *testing.T) {
	runtime, _ := buildDynamicRuntime(t)
	require.NoError(t, runtime.ConfigurePlacementResolver(placementResolverFunc(func(context.Context, command.MessageRegistration, command.DispatchOptions) (command.DispatchRoute, bool, error) {
		return command.DispatchRoute{}, false, stderrors.New("resolver unavailable")
	})))
	_, err := runtime.Dispatch(context.Background(), command.HandlerKindCommand, dynamicCommandMessage{}, command.DispatchOptions{})
	assertStructuredTextCode(t, err, command.TextCodePlacementResolutionFailed)

	require.NoError(t, runtime.ConfigurePlacementResolver(placementResolverFunc(func(context.Context, command.MessageRegistration, command.DispatchOptions) (command.DispatchRoute, bool, error) {
		return command.DispatchRoute{Target: command.DispatchTargetRemote}, true, nil
	})))
	_, err = runtime.Dispatch(context.Background(), command.HandlerKindCommand, dynamicCommandMessage{}, command.DispatchOptions{})
	assertStructuredTextCode(t, err, command.TextCodeInvalidDispatchRoute)
}

func TestRuntimePlacementReplacementKeepsInflightGeneration(t *testing.T) {
	runtime, _ := buildDynamicRuntime(t)
	entered := make(chan struct{})
	release := make(chan struct{})
	require.NoError(t, runtime.ConfigurePlacementResolver(placementResolverFunc(func(context.Context, command.MessageRegistration, command.DispatchOptions) (command.DispatchRoute, bool, error) {
		close(entered)
		<-release
		return command.DispatchRoute{Target: command.DispatchTargetRemote, Name: "old-worker"}, true, nil
	})))

	errCh := make(chan error, 1)
	go func() {
		_, err := runtime.Dispatch(context.Background(), command.HandlerKindCommand, dynamicCommandMessage{}, command.DispatchOptions{})
		errCh <- err
	}()
	<-entered
	require.NoError(t, runtime.ConfigurePlacementResolver(placementResolverFunc(func(context.Context, command.MessageRegistration, command.DispatchOptions) (command.DispatchRoute, bool, error) {
		return command.DispatchRoute{Target: command.DispatchTargetLocal}, true, nil
	})))
	close(release)
	assertStructuredTextCode(t, <-errCh, command.TextCodeRemoteDispatcherNotConfigured)
	_, err := runtime.Dispatch(context.Background(), command.HandlerKindCommand, dynamicCommandMessage{}, command.DispatchOptions{})
	require.NoError(t, err)
}

func TestRuntimeProviderReplacementValidatesExistingPlacementPolicies(t *testing.T) {
	runtime, provider := buildDynamicRuntime(t)
	registration, ok := provider.RegistrationByMessageType(command.HandlerKindCommand, "dynamic.command")
	require.True(t, ok)
	require.NoError(t, runtime.ReplacePlacementPolicies(command.PlacementPolicy{
		Kind: command.HandlerKindCommand, RegistrationID: registration.ID(),
		Route: command.DispatchRoute{Target: command.DispatchTargetLocal},
	}))
	empty, err := command.NewMessageRegistrationIndex()
	require.NoError(t, err)
	err = runtime.AttachRegistrationProvider(empty)
	assertStructuredTextCode(t, err, command.TextCodeRegistrationNotFound)
	_, ok = runtime.RegistrationProvider().RegistrationByID(command.HandlerKindCommand, registration.ID())
	assert.True(t, ok)
}

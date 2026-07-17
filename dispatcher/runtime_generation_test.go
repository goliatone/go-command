package dispatcher

import (
	"context"
	"sync"
	"testing"
	"time"

	"github.com/goliatone/go-command"
	gerrors "github.com/goliatone/go-errors"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestRemoteLifecycleIncludesRoutingReceiptProvenanceAndFailureCategory(t *testing.T) {
	SetCommandRunObservers()
	t.Cleanup(func() { SetCommandRunObservers() })
	var events []command.CommandRunEvent
	var mu sync.Mutex
	AddCommandRunObserver(command.CommandRunObserverFunc(func(_ context.Context, event command.CommandRunEvent) error {
		mu.Lock()
		events = append(events, event)
		mu.Unlock()
		return nil
	}))

	remote := &fakeRemoteDispatcher{dispatch: func(_ context.Context, _ command.DispatchRoute, registration command.MessageRegistration, _ any, _ command.DispatchOptions) (command.DispatchOutcome, error) {
		return command.DispatchOutcome{Receipt: command.DispatchReceipt{Accepted: true, Mode: command.ExecutionModeInline, CommandID: registration.ID()}}, nil
	}}
	runtime, _ := configureRemoteRuntime(t, command.HandlerKindCommand, remote)
	ctx := command.ContextWithDispatchProvenance(context.Background(), command.DispatchProvenance{
		IngressKind: "event", DeliveryID: "delivery-1", CorrelationID: "corr-ingress", CausationID: "cause-1", Attempt: 2,
	})
	_, err := runtime.Dispatch(ctx, command.HandlerKindCommand, dynamicCommandMessage{}, command.DispatchOptions{})
	require.NoError(t, err)
	mu.Lock()
	require.Len(t, events, 1)
	event := events[0]
	mu.Unlock()
	assert.Equal(t, command.HandlerKindCommand, event.HandlerKind)
	assert.Equal(t, command.DispatchTargetRemote, event.DispatchTarget)
	assert.Equal(t, "worker-a", event.Route)
	assert.True(t, event.Receipt.Accepted)
	assert.Equal(t, "delivery-1", event.Provenance.DeliveryID)
	assert.GreaterOrEqual(t, event.Duration, time.Duration(0))

	remote.dispatch = func(context.Context, command.DispatchRoute, command.MessageRegistration, any, command.DispatchOptions) (command.DispatchOutcome, error) {
		return command.DispatchOutcome{}, gerrors.New("remote failed", gerrors.CategoryExternal).WithTextCode("REMOTE_FAILED")
	}
	_, err = runtime.Dispatch(ctx, command.HandlerKindCommand, dynamicCommandMessage{}, command.DispatchOptions{})
	require.Error(t, err)
	mu.Lock()
	require.Len(t, events, 2)
	failed := events[1]
	mu.Unlock()
	assert.Equal(t, command.CommandRunPhaseRejected, failed.Phase)
	assert.Equal(t, gerrors.CategoryExternal.String(), failed.FailureCategory)
}

func TestRuntimeResetClearsOwnedStateAndStaleUnsubscribeIsSafe(t *testing.T) {
	runtime, _ := buildDynamicRuntime(t)
	stale := SubscribeCommandTo(runtime, command.CommandFunc[ingressInnerMessage](func(context.Context, ingressInnerMessage) error { return nil }))
	require.NoError(t, runtime.ConfigureRemoteDispatcher(&fakeRemoteDispatcher{dispatch: func(context.Context, command.DispatchRoute, command.MessageRegistration, any, command.DispatchOptions) (command.DispatchOutcome, error) {
		return command.DispatchOutcome{}, nil
	}}))
	runtime.Reset()
	assert.Error(t, runtime.RoutedReady())
	assert.Error(t, DispatchTo(context.Background(), runtime, dynamicCommandMessage{}))
	stale.Unsubscribe()
	stale.Unsubscribe()
	newSub := SubscribeCommandTo(runtime, command.CommandFunc[dynamicCommandMessage](func(context.Context, dynamicCommandMessage) error { return nil }))
	require.NotNil(t, newSub)
	assert.True(t, runtime.hasSubscriptions())
	require.NoError(t, DispatchTo(context.Background(), runtime, dynamicCommandMessage{}))
}

func TestStaleRuntimeSubscriptionDoesNotDecrementNewGeneration(t *testing.T) {
	runtime := NewRuntime()
	stale := SubscribeCommandTo(runtime, command.CommandFunc[dynamicCommandMessage](func(context.Context, dynamicCommandMessage) error { return nil }))
	require.NotNil(t, stale)
	runtime.Reset()
	current := SubscribeCommandTo(runtime, command.CommandFunc[dynamicCommandMessage](func(context.Context, dynamicCommandMessage) error { return nil }))
	require.NotNil(t, current)

	stale.Unsubscribe()
	assert.True(t, runtime.hasSubscriptions())
	require.NoError(t, DispatchTo(context.Background(), runtime, dynamicCommandMessage{}))
	current.Unsubscribe()
	assert.False(t, runtime.hasSubscriptions())
}

func TestLocalDynamicQueryLifecycleIncludesHandlerKindAndTarget(t *testing.T) {
	SetCommandRunObservers()
	t.Cleanup(func() { SetCommandRunObservers() })
	var events []command.CommandRunEvent
	AddCommandRunObserver(command.CommandRunObserverFunc(func(_ context.Context, event command.CommandRunEvent) error {
		events = append(events, event)
		return nil
	}))
	runtime, _ := buildDynamicRuntime(t)
	_, err := runtime.Dispatch(context.Background(), command.HandlerKindQuery, dynamicQueryMessage{}, command.DispatchOptions{})
	require.NoError(t, err)
	require.Len(t, events, 2)
	assert.Equal(t, command.CommandRunPhaseStarted, events[0].Phase)
	assert.Equal(t, command.CommandRunPhaseSucceeded, events[1].Phase)
	for _, event := range events {
		assert.Equal(t, command.HandlerKindQuery, event.HandlerKind)
		assert.Equal(t, command.DispatchTargetLocal, event.DispatchTarget)
	}
	assert.True(t, events[1].Receipt.Accepted)
}

func TestConcurrentProviderPolicyReplacementAndDispatch(t *testing.T) {
	runtime, provider := buildDynamicRuntime(t)
	registration, ok := provider.RegistrationByMessageType(command.HandlerKindCommand, "dynamic.command")
	require.True(t, ok)
	remote := &fakeRemoteDispatcher{dispatch: func(_ context.Context, _ command.DispatchRoute, registration command.MessageRegistration, _ any, options command.DispatchOptions) (command.DispatchOutcome, error) {
		return command.DispatchOutcome{Receipt: command.DispatchReceipt{Accepted: true, Mode: options.Mode, CommandID: registration.ID()}}, nil
	}}
	require.NoError(t, runtime.ConfigureRemoteDispatcher(remote))
	local := command.PlacementPolicy{Kind: command.HandlerKindCommand, RegistrationID: registration.ID(), Route: command.DispatchRoute{Target: command.DispatchTargetLocal}}
	remotePolicy := command.PlacementPolicy{Kind: command.HandlerKindCommand, RegistrationID: registration.ID(), Route: command.DispatchRoute{Target: command.DispatchTargetRemote, Name: "worker"}}
	require.NoError(t, runtime.ReplacePlacementPolicies(local))

	errorsCh := make(chan error, 600)
	var wg sync.WaitGroup
	wg.Add(3)
	go func() {
		defer wg.Done()
		for i := 0; i < 200; i++ {
			_, err := runtime.Dispatch(context.Background(), command.HandlerKindCommand, dynamicCommandMessage{}, command.DispatchOptions{})
			if err != nil {
				errorsCh <- err
			}
		}
	}()
	go func() {
		defer wg.Done()
		for i := 0; i < 200; i++ {
			policy := local
			if i%2 == 0 {
				policy = remotePolicy
			}
			if err := runtime.ReplacePlacementPolicies(policy); err != nil {
				errorsCh <- err
			}
		}
	}()
	go func() {
		defer wg.Done()
		for i := 0; i < 200; i++ {
			if err := runtime.AttachRegistrationProvider(provider); err != nil {
				errorsCh <- err
			}
		}
	}()
	wg.Wait()
	close(errorsCh)
	for err := range errorsCh {
		t.Errorf("concurrent runtime operation failed: %v", err)
	}
}

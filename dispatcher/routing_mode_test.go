package dispatcher

import (
	"context"
	"strings"
	"sync"
	"testing"

	"github.com/goliatone/go-command"
	"github.com/goliatone/go-command/router"
	gerrors "github.com/goliatone/go-errors"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

type routingModeMessage struct{}

func (routingModeMessage) Type() string {
	return "orders.created"
}

type stubDispatchRunnable struct {
	called bool
}

func (s *stubDispatchRunnable) run(_ context.Context, _ any) error {
	s.called = true
	return nil
}

func (s *stubDispatchRunnable) handler() any {
	return s
}

func TestDispatcherRoutingModeDefaultsToExact(t *testing.T) {
	Reset()
	t.Cleanup(Reset)

	assert.Equal(t, RoutingModeExact, CommandRoutingMode())

	handler := &stubDispatchRunnable{}
	getCommandMux().Add("orders", handler)

	err := Dispatch(context.Background(), routingModeMessage{})
	require.Error(t, err)
	assert.False(t, handler.called)
}

func TestDispatcherRoutingModeRichOptInSupportsPatternMatching(t *testing.T) {
	Reset()
	t.Cleanup(Reset)

	require.NoError(t, SetCommandRoutingMode(
		RoutingModeRich,
		WithRoutingMatcher(func(pattern, topic string) bool {
			return strings.HasPrefix(topic, pattern)
		}),
		WithRoutingMatchStrategy(router.MatchStrategyFirst),
	))

	handler := &stubDispatchRunnable{}
	getCommandMux().Add("orders", handler)

	err := Dispatch(context.Background(), routingModeMessage{})
	require.NoError(t, err)
	assert.True(t, handler.called)
}

func TestDispatcherResetRestoresExactRoutingMode(t *testing.T) {
	Reset()
	require.NoError(t, SetCommandRoutingMode(
		RoutingModeRich,
		WithRoutingMatcher(func(pattern, topic string) bool {
			return strings.HasPrefix(topic, pattern)
		}),
	))

	Reset()
	t.Cleanup(Reset)

	assert.Equal(t, RoutingModeExact, CommandRoutingMode())

	handler := &stubDispatchRunnable{}
	getCommandMux().Add("orders", handler)

	err := Dispatch(context.Background(), routingModeMessage{})
	require.Error(t, err)
	assert.False(t, handler.called)
}

func TestSetCommandRoutingModeFailsAfterSubscriptions(t *testing.T) {
	Reset()
	t.Cleanup(Reset)

	sub := SubscribeCommand(command.CommandFunc[routingDispatchMessage](func(ctx context.Context, msg routingDispatchMessage) error {
		return nil
	}))
	defer sub.Unsubscribe()

	err := SetCommandRoutingMode(RoutingModeRich)
	require.Error(t, err)

	var gerr *gerrors.Error
	require.True(t, gerrors.As(err, &gerr))
	assert.Equal(t, TextCodeDispatchRoutingLocked, gerr.TextCode)
}

func TestStaleDefaultSubscriptionDoesNotUnlockRoutingForNewGeneration(t *testing.T) {
	Reset()
	t.Cleanup(Reset)
	stale := SubscribeCommand(command.CommandFunc[routingDispatchMessage](func(context.Context, routingDispatchMessage) error { return nil }))
	require.NotNil(t, stale)
	Reset()
	current := SubscribeCommand(command.CommandFunc[routingDispatchMessage](func(context.Context, routingDispatchMessage) error { return nil }))
	require.NotNil(t, current)

	stale.Unsubscribe()
	err := SetCommandRoutingMode(RoutingModeRich)
	assertStructuredTextCode(t, err, TextCodeDispatchRoutingLocked)
	current.Unsubscribe()
	require.NoError(t, SetCommandRoutingMode(RoutingModeRich))
}

func TestSetCommandRoutingModeRejectsInstalledRuntimeSubscriptions(t *testing.T) {
	Reset()
	t.Cleanup(Reset)
	runtime := NewRuntime()
	restore, err := InstallDefaultRuntime(runtime)
	require.NoError(t, err)
	t.Cleanup(restore)
	require.NotNil(t, SubscribeCommandTo(runtime, command.CommandFunc[routingDispatchMessage](func(context.Context, routingDispatchMessage) error { return nil })))

	err = SetCommandRoutingMode(RoutingModeRich)
	assertStructuredTextCode(t, err, TextCodeDispatchRoutingLocked)
	require.NoError(t, DispatchTo(context.Background(), runtime, routingDispatchMessage{}))
}

func TestConcurrentRoutingModeChangeNeverOrphansSubscription(t *testing.T) {
	for iteration := range 100 {
		Reset()
		start := make(chan struct{})
		var wg sync.WaitGroup
		wg.Add(2)
		var sub Subscription
		var modeErr error
		go func() {
			defer wg.Done()
			<-start
			sub = SubscribeCommand(command.CommandFunc[routingDispatchMessage](func(context.Context, routingDispatchMessage) error { return nil }))
		}()
		go func() {
			defer wg.Done()
			<-start
			modeErr = SetCommandRoutingMode(RoutingModeRich)
		}()
		close(start)
		wg.Wait()

		require.NotNil(t, sub)
		if modeErr != nil {
			assertStructuredTextCode(t, modeErr, TextCodeDispatchRoutingLocked)
		}
		require.NoError(t, Dispatch(context.Background(), routingDispatchMessage{}), "iteration %d", iteration)
		sub.Unsubscribe()
	}
	Reset()
}

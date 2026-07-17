package registry

import (
	"context"
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"github.com/goliatone/go-command"
	"github.com/goliatone/go-command/cron"
	"github.com/goliatone/go-command/dispatcher"
	"github.com/goliatone/go-command/router"
	"github.com/goliatone/go-command/runner"
)

type runtimeCronScheduler struct {
	calls int
}

func (s *runtimeCronScheduler) AddHandler(opts command.HandlerConfig, handler any) (cron.Subscription, error) {
	s.calls++
	return &runtimeSubscription{}, nil
}

type runtimeSubscription struct {
	unsubscribed bool
}

func (s *runtimeSubscription) Unsubscribe() {
	s.unsubscribed = true
}

func TestNewRuntimeContainerWiresSchedulerAndRegistry(t *testing.T) {
	scheduler := &runtimeCronScheduler{}
	rt := NewRuntimeContainer(RuntimeDependencies{
		Scheduler: scheduler,
	})

	require.NotNil(t, rt.Registry())
	require.NoError(t, rt.RegisterCommand(&GlobalTestCommand{name: "runtime-cron"}))
	require.NoError(t, rt.Start(context.Background()))
	assert.Equal(t, 1, scheduler.calls)
}

func TestRuntimeContainerIsInstanceFirst(t *testing.T) {
	runtimeA := NewRuntimeContainer(RuntimeDependencies{Registry: command.NewRegistry()})
	runtimeB := NewRuntimeContainer(RuntimeDependencies{Registry: command.NewRegistry()})

	require.NoError(t, runtimeA.AddResolver("tenant-a", func(cmd any, meta command.CommandMeta, r *command.Registry) error {
		return nil
	}))

	assert.True(t, runtimeA.HasResolver("tenant-a"))
	assert.False(t, runtimeB.HasResolver("tenant-a"))
}

func TestRuntimeContainerUsesInjectedDispatcherHooks(t *testing.T) {
	var commandCalls int
	var queryCalls int
	var gotRunnerOpts int
	rt := NewRuntimeContainer(RuntimeDependencies{
		Registry:       command.NewRegistry(),
		RunnerDefaults: []runner.Option{runner.WithMaxRetries(1)},
		SubscribeCommand: func(cmd any, opts ...runner.Option) (dispatcher.Subscription, error) {
			commandCalls++
			gotRunnerOpts = len(opts)
			return &runtimeSubscription{}, nil
		},
		SubscribeQuery: func(qry any, opts ...runner.Option) (dispatcher.Subscription, error) {
			queryCalls++
			gotRunnerOpts = len(opts)
			return &runtimeSubscription{}, nil
		},
	})

	require.NoError(t, rt.RegisterCommand(command.CommandFunc[TestMessage](func(ctx context.Context, msg TestMessage) error {
		return nil
	})))
	require.NoError(t, rt.RegisterQuery(command.QueryFunc[TestMessage, TestResponse](func(ctx context.Context, msg TestMessage) (TestResponse, error) {
		return TestResponse{Result: "ok"}, nil
	})))

	assert.Equal(t, 1, commandCalls)
	assert.Equal(t, 1, queryCalls)
	assert.Equal(t, 1, gotRunnerOpts)
}

func TestRuntimeContainerDependenciesSnapshot(t *testing.T) {
	deps := RuntimeDependencies{
		Registry:       command.NewRegistry(),
		Router:         router.NewMux(),
		Dispatcher:     "dispatcher-ref",
		Orchestrator:   "orchestrator-ref",
		RunnerDefaults: []runner.Option{runner.WithMaxRetries(2)},
		RPCRegister: func(opts command.RPCConfig, handler any, meta command.CommandMeta) error {
			return nil
		},
		CronRegister: func(opts command.HandlerConfig, handler any) error {
			return nil
		},
	}
	rt := NewRuntimeContainer(deps)
	snapshot := rt.Dependencies()

	assert.NotNil(t, snapshot.Registry)
	assert.NotNil(t, snapshot.Router)
	assert.Equal(t, "dispatcher-ref", snapshot.Dispatcher)
	assert.Equal(t, "orchestrator-ref", snapshot.Orchestrator)
	assert.Len(t, snapshot.RunnerDefaults, 1)
}

func TestRuntimeContainerStopUnsubscribesTrackedSubs(t *testing.T) {
	subA := &runtimeSubscription{}
	subB := &runtimeSubscription{}
	counter := 0

	rt := NewRuntimeContainer(RuntimeDependencies{
		Registry: command.NewRegistry(),
		SubscribeCommand: func(cmd any, opts ...runner.Option) (dispatcher.Subscription, error) {
			counter++
			if counter == 1 {
				return subA, nil
			}
			return subB, nil
		},
	})

	require.NoError(t, rt.RegisterCommand(command.CommandFunc[TestMessage](func(ctx context.Context, msg TestMessage) error {
		return nil
	})))
	require.NoError(t, rt.RegisterCommand(command.CommandFunc[TestMessage](func(ctx context.Context, msg TestMessage) error {
		return fmt.Errorf("ignored")
	})))

	require.NoError(t, rt.Stop(context.Background()))
	assert.True(t, subA.unsubscribed)
	assert.True(t, subB.unsubscribed)
}

func TestRuntimeContainerRollsBackSubscriptionWhenRegistryRejectsRegistration(t *testing.T) {
	registry := command.NewRegistry()
	require.NoError(t, registry.Initialize())
	commandSub := &runtimeSubscription{}
	querySub := &runtimeSubscription{}
	container := NewRuntimeContainer(RuntimeDependencies{
		Registry: registry,
		SubscribeCommand: func(any, ...runner.Option) (dispatcher.Subscription, error) {
			return commandSub, nil
		},
		SubscribeQuery: func(any, ...runner.Option) (dispatcher.Subscription, error) {
			return querySub, nil
		},
	})

	err := container.RegisterCommand(command.CommandFunc[TestMessage](func(context.Context, TestMessage) error { return nil }))
	require.Error(t, err)
	assert.True(t, commandSub.unsubscribed)
	err = container.RegisterQuery(command.QueryFunc[TestMessage, TestResponse](func(context.Context, TestMessage) (TestResponse, error) { return TestResponse{}, nil }))
	require.Error(t, err)
	assert.True(t, querySub.unsubscribed)
}

func TestRuntimeContainerWiresSelectedDispatcherRuntimeAndProvider(t *testing.T) {
	dispatchRuntime := dispatcher.NewRuntime()
	container := NewRuntimeContainer(RuntimeDependencies{
		Registry:         command.NewRegistry(),
		DispatchRuntime:  dispatchRuntime,
		SubscribeCommand: dispatcher.CommandSubscriptionHook[TestMessage](dispatchRuntime),
		SubscribeQuery:   dispatcher.QuerySubscriptionHook[TestMessage, TestResponse](dispatchRuntime),
	})
	require.NoError(t, container.RegisterCommand(command.CommandFunc[TestMessage](func(context.Context, TestMessage) error {
		return nil
	})))
	require.NoError(t, container.RegisterQuery(command.QueryFunc[TestMessage, TestResponse](func(context.Context, TestMessage) (TestResponse, error) {
		return TestResponse{Result: "runtime"}, nil
	})))

	require.Error(t, dispatchRuntime.RoutedReady())
	require.NoError(t, container.Start(context.Background()))
	require.NoError(t, dispatchRuntime.RoutedReady())
	assert.Len(t, dispatchRuntime.RegistrationProvider().Registrations(), 2)
	require.NoError(t, dispatcher.DispatchTo(context.Background(), dispatchRuntime, TestMessage{}))
	result, err := dispatcher.QueryTo[TestMessage, TestResponse](context.Background(), dispatchRuntime, TestMessage{})
	require.NoError(t, err)
	assert.Equal(t, "runtime", result.Result)
}

func TestRuntimeContainerDoesNotAttachProviderAfterFailedInitialization(t *testing.T) {
	dispatchRuntime := dispatcher.NewRuntime()
	container := NewRuntimeContainer(RuntimeDependencies{
		Registry:        command.NewRegistry(),
		DispatchRuntime: dispatchRuntime,
	})
	require.NoError(t, container.AddResolver("fail", func(any, command.CommandMeta, *command.Registry) error {
		return assert.AnError
	}))
	require.NoError(t, container.Registry().RegisterCommand(command.CommandFunc[TestMessage](func(context.Context, TestMessage) error {
		return nil
	})))
	require.Error(t, container.Start(context.Background()))
	assert.Error(t, dispatchRuntime.RoutedReady())
	assert.Nil(t, dispatchRuntime.RegistrationProvider())
}

func TestLocalTypedRuntimeDoesNotRequireRegistrationProvider(t *testing.T) {
	dispatchRuntime := dispatcher.NewRuntime()
	dispatcher.SubscribeCommandTo(dispatchRuntime, command.CommandFunc[TestMessage](func(context.Context, TestMessage) error {
		return nil
	}))
	require.NoError(t, dispatcher.DispatchTo(context.Background(), dispatchRuntime, TestMessage{}))
	assert.Error(t, dispatchRuntime.RoutedReady())
}

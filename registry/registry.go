package registry

import (
	"context"
	"sync"

	"github.com/alecthomas/kong"
	"github.com/goliatone/go-command"
	"github.com/goliatone/go-command/dispatcher"
	"github.com/goliatone/go-command/runner"
)

var globalRegistry = command.NewRegistry()
var globalStateMu sync.Mutex
var withTestRegistryMu sync.Mutex
var globalSubs []dispatcher.Subscription

func RegisterCommand[T any](cmd command.Commander[T], runnerOpts ...runner.Option) (dispatcher.Subscription, error) {
	globalStateMu.Lock()
	sub := dispatcher.SubscribeCommand(cmd, runnerOpts...)
	err := globalRegistry.RegisterCommand(cmd)
	if err == nil {
		trackSubscriptionLocked(sub)
	}
	globalStateMu.Unlock()

	if err != nil {
		if sub != nil {
			sub.Unsubscribe()
		}
		return nil, err
	}
	return sub, nil
}

func RegisterQuery[T any, R any](qry command.Querier[T, R], runnerOpts ...runner.Option) (dispatcher.Subscription, error) {
	globalStateMu.Lock()
	sub := dispatcher.SubscribeQuery(qry, runnerOpts...)
	err := globalRegistry.RegisterCommand(qry)
	if err == nil {
		trackSubscriptionLocked(sub)
	}
	globalStateMu.Unlock()

	if err != nil {
		if sub != nil {
			sub.Unsubscribe()
		}
		return nil, err
	}
	return sub, nil
}

func SetCronRegister(fn func(opts command.HandlerConfig, handler any) error) {
	globalStateMu.Lock()
	defer globalStateMu.Unlock()
	globalRegistry.SetCronRegister(fn)
}

func SetRPCRegister(fn func(opts command.RPCConfig, handler any, meta command.CommandMeta) error) {
	globalStateMu.Lock()
	defer globalStateMu.Unlock()
	globalRegistry.SetRPCRegister(fn)
}

func AddResolver(key string, res command.Resolver) error {
	globalStateMu.Lock()
	defer globalStateMu.Unlock()
	return globalRegistry.AddResolver(key, res)
}

func HasResolver(key string) bool {
	globalStateMu.Lock()
	defer globalStateMu.Unlock()
	return globalRegistry.HasResolver(key)
}

func GetCLIOptions() ([]kong.Option, error) {
	globalStateMu.Lock()
	defer globalStateMu.Unlock()
	return globalRegistry.GetCLIOptions()
}

func Start(_ context.Context) error {
	globalStateMu.Lock()
	reg := globalRegistry
	globalStateMu.Unlock()
	return reg.Initialize()
}

func Stop(_ context.Context) error {
	globalStateMu.Lock()
	subs := globalSubs
	globalSubs = nil
	globalRegistry = command.NewRegistry()
	globalStateMu.Unlock()

	unsubscribeSubscriptions(subs)
	dispatcher.Reset()
	return nil
}

func WithTestRegistry(fn func()) {
	withTestRegistryMu.Lock()
	defer withTestRegistryMu.Unlock()

	testRegistry := command.NewRegistry()

	globalStateMu.Lock()
	old := globalRegistry
	oldSubs := globalSubs
	globalRegistry = testRegistry
	globalSubs = nil
	globalStateMu.Unlock()

	defer func() {
		globalStateMu.Lock()
		// Another caller (eg. Stop) replaced the test registry while fn ran:
		// do not overwrite that state during cleanup.
		if globalRegistry != testRegistry {
			globalStateMu.Unlock()
			return
		}

		testSubs := globalSubs
		globalSubs = nil
		globalStateMu.Unlock()

		unsubscribeSubscriptions(testSubs)

		globalStateMu.Lock()
		if globalRegistry == testRegistry {
			globalRegistry = old
			globalSubs = oldSubs
		}
		globalStateMu.Unlock()
	}()

	fn()
}

func trackSubscriptionLocked(sub dispatcher.Subscription) {
	if sub == nil {
		return
	}
	globalSubs = append(globalSubs, sub)
}

func unsubscribeSubscriptions(subs []dispatcher.Subscription) {
	for _, sub := range subs {
		if sub != nil {
			sub.Unsubscribe()
		}
	}
}

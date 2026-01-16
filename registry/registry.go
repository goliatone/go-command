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
var globalSubsMu sync.Mutex
var globalSubs []dispatcher.Subscription

func RegisterCommand[T any](cmd command.Commander[T], runnerOpts ...runner.Option) (dispatcher.Subscription, error) {
	sub := dispatcher.SubscribeCommand(cmd, runnerOpts...)
	if err := globalRegistry.RegisterCommand(cmd); err != nil {
		sub.Unsubscribe()
		return nil, err
	}
	trackSubscription(sub)
	return sub, nil
}

func RegisterQuery[T any, R any](qry command.Querier[T, R], runnerOpts ...runner.Option) (dispatcher.Subscription, error) {
	sub := dispatcher.SubscribeQuery(qry, runnerOpts...)
	if err := globalRegistry.RegisterCommand(qry); err != nil {
		sub.Unsubscribe()
		return nil, err
	}
	trackSubscription(sub)
	return sub, nil
}

func SetCronRegister(fn func(opts command.HandlerConfig, handler any) error) {
	globalRegistry.SetCronRegister(fn)
}

func AddResolver(key string, res command.Resolver) error {
	return globalRegistry.AddResolver(key, res)
}

func HasResolver(key string) bool {
	return globalRegistry.HasResolver(key)
}

func GetCLIOptions() ([]kong.Option, error) {
	return globalRegistry.GetCLIOptions()
}

func Start(_ context.Context) error {
	return globalRegistry.Initialize()
}

func Stop(_ context.Context) error {
	unsubscribeAll()
	globalRegistry = command.NewRegistry()
	dispatcher.Reset()
	return nil
}

func WithTestRegistry(fn func()) {
	old := globalRegistry
	oldSubs := stashSubscriptions()
	defer func() { globalRegistry = old }()
	globalRegistry = command.NewRegistry()
	fn()
	unsubscribeAll()
	restoreSubscriptions(oldSubs)
}

func trackSubscription(sub dispatcher.Subscription) {
	if sub == nil {
		return
	}
	globalSubsMu.Lock()
	defer globalSubsMu.Unlock()
	globalSubs = append(globalSubs, sub)
}

func stashSubscriptions() []dispatcher.Subscription {
	globalSubsMu.Lock()
	defer globalSubsMu.Unlock()
	old := globalSubs
	globalSubs = nil
	return old
}

func restoreSubscriptions(subs []dispatcher.Subscription) {
	globalSubsMu.Lock()
	defer globalSubsMu.Unlock()
	globalSubs = subs
}

func unsubscribeAll() {
	globalSubsMu.Lock()
	subs := globalSubs
	globalSubs = nil
	globalSubsMu.Unlock()

	for _, sub := range subs {
		if sub != nil {
			sub.Unsubscribe()
		}
	}
}

package registry

import (
	"context"

	"github.com/alecthomas/kong"
	"github.com/goliatone/go-command"
	"github.com/goliatone/go-command/dispatcher"
	"github.com/goliatone/go-command/runner"
)

func NilCronRegister(opts command.HandlerConfig, handler any) error {
	return nil
}

var globalRegistry = command.NewRegistry()

func RegisterCommand[T any](cmd command.Commander[T], runnerOpts ...runner.Option) (dispatcher.Subscription, error) {
	sub := dispatcher.SubscribeCommand(cmd, runnerOpts...)
	return sub, globalRegistry.RegisterCommand(cmd)
}

func RegisterQuery[T any, R any](qry command.Querier[T, R], runnerOpts ...runner.Option) (dispatcher.Subscription, error) {
	sub := dispatcher.SubscribeQuery(qry, runnerOpts...)
	return sub, globalRegistry.RegisterCommand(qry)
}

func SetCronRegister(fn func(opts command.HandlerConfig, handler any) error) {
	globalRegistry.SetCronRegister(fn)
}

func GetCLIOptions() ([]kong.Option, error) {
	return globalRegistry.GetCLIOptions()
}

func Start(_ context.Context) error {
	return globalRegistry.Initialize()
}

func Stop() error {
	globalRegistry = command.NewRegistry()
	return nil
}

func WithTestRegistry(fn func()) {
	old := globalRegistry
	defer func() { globalRegistry = old }()
	globalRegistry = command.NewRegistry()
	fn()
}

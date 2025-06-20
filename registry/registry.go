package registry

import (
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

func SetCLIRegister(fn func(opts command.CLIConfig, handler any) error) {
	globalRegistry.SetCLIRegister(fn)
}

func Init() error {
	return globalRegistry.Initialize()
}

func GetCLIOptions() []kong.Option {
	return globalRegistry.GetCLIOptions()
}

func Reset() {
	globalRegistry = command.NewRegistry()
}

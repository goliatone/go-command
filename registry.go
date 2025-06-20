package command

import (
	"fmt"
	"sync"

	"github.com/alecthomas/kong"
)

type Registry struct {
	mu                 sync.RWMutex
	commandsToRegister []any
	initialized        bool
	cronRegisterFn     func(opts HandlerConfig, handler any) error
	cliRegisterFn      func(opts CLIConfig, handler any) error
	cliOptions         []kong.Option
}

func NewRegistry() *Registry {
	return &Registry{
		cliOptions: make([]kong.Option, 0),
	}
}

func (r *Registry) SetCronRegister(fn func(opts HandlerConfig, handler any) error) *Registry {
	r.mu.Lock()
	defer r.mu.Unlock()
	r.cronRegisterFn = fn
	return r
}

func (r *Registry) SetCLIRegister(fn func(opts CLIConfig, handler any) error) *Registry {
	r.mu.Lock()
	defer r.mu.Unlock()
	r.cliRegisterFn = fn
	return r
}

func (r *Registry) RegisterCommand(cmd any) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	if r.initialized {
		return fmt.Errorf("cannot register commands after registry has been initialized")
	}
	r.commandsToRegister = append(r.commandsToRegister, cmd)

	return nil
}

func (r *Registry) Initialize() error {
	r.mu.Lock()
	defer r.mu.Unlock()

	if r.initialized {
		return fmt.Errorf("registry already initialized")
	}

	r.initialized = true

	for _, cmd := range r.commandsToRegister {
		r.registerWithCLI(cmd)
		r.registerWithCron(cmd)
	}

	return nil
}

func (r *Registry) registerWithCron(cmd any) error {
	cronCmd, ok := cmd.(CronCommand)

	if !ok {
		return fmt.Errorf("command does not implement CronCommand interface")
	}

	if r.cronRegisterFn == nil {
		return fmt.Errorf("cron scheduler not provided during initialization")
	}

	handler := cronCmd.CronHandler()
	config := cronCmd.CronOptions()

	return r.cronRegisterFn(config, handler)
}

func (r *Registry) registerWithCLI(cmd any) error {
	cliCmd, ok := cmd.(CLICommand)
	if !ok {
		return fmt.Errorf("command does not implement CLICommand interface")
	}

	opts := cliCmd.CLIOptions()
	kongCmd := cliCmd.CLIHandler()

	if r.cliRegisterFn != nil {
		return r.cliRegisterFn(opts, kongCmd)
	}

	tags := opts.BuildTags()

	option := kong.DynamicCommand(
		opts.Name,
		opts.Description,
		opts.Group,
		kongCmd,
		tags...,
	)

	r.cliOptions = append(r.cliOptions, option)
	return nil
}

func (r *Registry) GetCLIOptions() []kong.Option {
	r.mu.Lock()
	defer r.mu.Unlock()

	if !r.initialized {
		panic("registry not initialzied")
	}

	options := make([]kong.Option, len(r.cliOptions))
	copy(options, r.cliOptions)
	return options
}

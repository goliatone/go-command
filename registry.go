package command

import (
	"errors"
	"fmt"
	"sync"

	"github.com/alecthomas/kong"
)

type Registry struct {
	mu                 sync.RWMutex
	commandsToRegister []any
	initialized        bool
	cronRegisterFn     func(opts HandlerConfig, handler any) error
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

func (r *Registry) RegisterCommand(cmd any) error {
	if cmd == nil {
		return fmt.Errorf("command cannot be nil")
	}

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

	var errs error
	for _, cmd := range r.commandsToRegister {
		if cliCmd, ok := cmd.(CLICommand); ok {
			r.registerWithCLI(cliCmd)
		}

		if cronCmd, ok := cmd.(CronCommand); ok {
			if err := r.registerWithCron(cronCmd); err != nil {
				errs = errors.Join(errs, err)
			}
		}
	}

	r.initialized = true

	return errs
}

func (r *Registry) registerWithCron(cronCmd CronCommand) error {
	if r.cronRegisterFn == nil {
		return fmt.Errorf("cron scheduler not provided during initialization")
	}

	handler := cronCmd.CronHandler()
	config := cronCmd.CronOptions()

	return r.cronRegisterFn(config, handler)
}

func (r *Registry) registerWithCLI(cliCmd CLICommand) error {
	opts := cliCmd.CLIOptions()
	kongCmd := cliCmd.CLIHandler()

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

func (r *Registry) GetCLIOptions() ([]kong.Option, error) {
	r.mu.Lock()
	defer r.mu.Unlock()

	if !r.initialized {
		return nil, fmt.Errorf("registry not initialzied")
	}

	options := make([]kong.Option, len(r.cliOptions))
	copy(options, r.cliOptions)
	return options, nil
}

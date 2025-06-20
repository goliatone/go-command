package command

import (
	"sync"

	"github.com/alecthomas/kong"
	"github.com/goliatone/go-errors"
)

func NilCronRegister(opts HandlerConfig, handler any) error {
	return nil
}

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
		return errors.New("command cannot be nil", errors.CategoryBadInput).
			WithTextCode("NIL_COMMAND")
	}

	r.mu.Lock()
	defer r.mu.Unlock()

	if r.initialized {
		return errors.New("cannot register commands after registry has been initialized", errors.CategoryConflict).
			WithTextCode("REGISTRY_ALREADY_INITIALIZED")
	}
	r.commandsToRegister = append(r.commandsToRegister, cmd)

	return nil
}

func (r *Registry) Initialize() error {
	r.mu.Lock()
	defer r.mu.Unlock()

	if r.initialized {
		return errors.New("registry already initialized", errors.CategoryConflict).
			WithTextCode("REGISTRY_ALREADY_INITIALIZED")
	}

	var errs error
	for _, cmd := range r.commandsToRegister {
		if cliCmd, ok := cmd.(CLICommand); ok {
			if err := r.registerWithCLI(cliCmd); err != nil {
				errs = errors.Join(errs, err)
			}
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
		return errors.New("cron scheduler not provided during initialization", errors.CategoryBadInput).
			WithTextCode("CRON_SCHEDULER_NOT_SET")
	}

	handler := cronCmd.CronHandler()
	config := cronCmd.CronOptions()

	if err := r.cronRegisterFn(config, handler); err != nil {
		return errors.Wrap(err, errors.CategoryExternal, "cron scheduler registration failed").
			WithTextCode("CRON_REGISTRATION_FAILED").
			WithMetadata(map[string]any{
				"config": config,
			})
	}

	return nil
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
		return nil, errors.New("registry not initialized", errors.CategoryConflict).
			WithTextCode("REGISTRY_NOT_INITIALIZED")
	}

	options := make([]kong.Option, len(r.cliOptions))
	copy(options, r.cliOptions)
	return options, nil
}

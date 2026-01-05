package command

import (
	"sync"

	"github.com/alecthomas/kong"
	"github.com/goliatone/go-errors"
)

func NilCronRegister(opts HandlerConfig, handler any) error {
	return nil
}

type Resolver func(cmd any, meta CommandMeta, r *Registry) error

type registeredCommand struct {
	cmd  any
	meta CommandMeta
}

type Registry struct {
	mu                 sync.RWMutex
	commandsToRegister []registeredCommand
	initialized        bool
	initializing       bool
	cronRegisterFn     func(opts HandlerConfig, handler any) error
	cliRoot            *cliNode
	cliOptions         []kong.Option
	resolvers          map[string]Resolver
	resolverOrder      []string
}

func NewRegistry() *Registry {
	registry := &Registry{
		cliRoot:       newCLINode("root"),
		cliOptions:    make([]kong.Option, 0),
		resolvers:     make(map[string]Resolver),
		resolverOrder: make([]string, 0, 2),
	}

	_ = registry.AddResolver("cli", func(cmd any, _ CommandMeta, r *Registry) error {
		cliCmd, ok := cmd.(CLICommand)
		if !ok {
			return nil
		}
		return r.registerWithCLI(cliCmd)
	})

	_ = registry.AddResolver("cron", func(cmd any, _ CommandMeta, r *Registry) error {
		cronCmd, ok := cmd.(CronCommand)
		if !ok {
			return nil
		}
		return r.registerWithCron(cronCmd)
	})

	return registry
}

func (r *Registry) SetCronRegister(fn func(opts HandlerConfig, handler any) error) *Registry {
	r.mu.Lock()
	defer r.mu.Unlock()
	if r.initialized || r.initializing {
		return r
	}
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

	if r.initialized || r.initializing {
		return errors.New("cannot register commands after registry has been initialized", errors.CategoryConflict).
			WithTextCode("REGISTRY_ALREADY_INITIALIZED")
	}

	meta := MessageTypeForCommand(cmd)
	r.commandsToRegister = append(r.commandsToRegister, registeredCommand{
		cmd:  cmd,
		meta: meta,
	})

	return nil
}

func (r *Registry) Initialize() error {
	r.mu.Lock()
	if r.initialized || r.initializing {
		r.mu.Unlock()
		return errors.New("registry already initialized", errors.CategoryConflict).
			WithTextCode("REGISTRY_ALREADY_INITIALIZED")
	}
	r.initializing = true

	commands := make([]registeredCommand, len(r.commandsToRegister))
	copy(commands, r.commandsToRegister)

	resolverOrder := make([]string, len(r.resolverOrder))
	copy(resolverOrder, r.resolverOrder)

	resolvers := make(map[string]Resolver, len(r.resolvers))
	for key, resolver := range r.resolvers {
		resolvers[key] = resolver
	}
	r.mu.Unlock()

	var errs error
	for _, item := range commands {
		for _, key := range resolverOrder {
			resolver := resolvers[key]
			if resolver == nil {
				continue
			}
			if err := resolver(item.cmd, item.meta, r); err != nil {
				errs = errors.Join(errs, err)
			}
		}
	}

	var opts []kong.Option
	if builtOpts, err := buildCLIOptions(r.cliRoot); err != nil {
		errs = errors.Join(errs, err)
	} else {
		opts = builtOpts
	}

	r.mu.Lock()
	defer r.mu.Unlock()
	if opts != nil {
		r.cliOptions = opts
	}
	r.initialized = true
	r.initializing = false

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

	path := opts.normalizedPath()
	if len(path) == 0 {
		return errors.New("cli command path required", errors.CategoryBadInput).
			WithTextCode("CLI_COMMAND_PATH_MISSING")
	}

	if kongCmd == nil {
		return errors.New("cli handler cannot be nil", errors.CategoryBadInput).
			WithTextCode("CLI_HANDLER_NIL")
	}

	if err := r.cliRoot.insert(path, opts, kongCmd); err != nil {
		return err
	}
	return nil
}

func (r *Registry) GetCLIOptions() ([]kong.Option, error) {
	r.mu.Lock()
	defer r.mu.Unlock()

	if !r.initialized || r.initializing {
		return nil, errors.New("registry not initialized", errors.CategoryConflict).
			WithTextCode("REGISTRY_NOT_INITIALIZED")
	}

	// Lazily build CLI options if not yet computed (eg: when no CLI commands).
	if r.cliOptions == nil {
		opts, err := buildCLIOptions(r.cliRoot)
		if err != nil {
			return nil, err
		}
		r.cliOptions = opts
	}

	options := make([]kong.Option, len(r.cliOptions))
	copy(options, r.cliOptions)
	return options, nil
}

func (r *Registry) AddResolver(key string, res Resolver) error {
	if key == "" {
		return errors.New("resolver key cannot be empty", errors.CategoryBadInput).
			WithTextCode("RESOLVER_KEY_EMPTY")
	}
	if res == nil {
		return errors.New("resolver cannot be nil", errors.CategoryBadInput).
			WithTextCode("RESOLVER_NIL")
	}

	r.mu.Lock()
	defer r.mu.Unlock()

	if r.initialized || r.initializing {
		return errors.New("cannot add resolver after registry has been initialized", errors.CategoryConflict).
			WithTextCode("REGISTRY_ALREADY_INITIALIZED")
	}

	if r.resolvers == nil {
		r.resolvers = make(map[string]Resolver)
	}

	if _, exists := r.resolvers[key]; exists {
		return errors.New("resolver already registered", errors.CategoryConflict).
			WithTextCode("RESOLVER_ALREADY_REGISTERED")
	}

	r.resolvers[key] = res
	r.resolverOrder = append(r.resolverOrder, key)

	return nil
}

func (r *Registry) HasResolver(key string) bool {
	r.mu.RLock()
	defer r.mu.RUnlock()

	if r.resolvers == nil {
		return false
	}
	_, exists := r.resolvers[key]
	return exists
}

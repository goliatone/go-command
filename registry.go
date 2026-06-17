package command

import (
	"strings"
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
	rpcRegisterFn      func(opts RPCConfig, handler any, meta CommandMeta) error
	cliRoot            *cliNode
	cliOptions         []kong.Option
	resolvers          map[string]Resolver
	resolverOrder      []string
	descriptors        map[string]CommandDescriptor
	descriptorOrder    []string
}

func NewRegistry() *Registry {
	registry := &Registry{
		cliRoot:       newCLINode("root"),
		cliOptions:    make([]kong.Option, 0),
		resolvers:     make(map[string]Resolver),
		resolverOrder: make([]string, 0, 2),
		descriptors:   make(map[string]CommandDescriptor),
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

	_ = registry.AddResolver("rpc", func(cmd any, meta CommandMeta, r *Registry) error {
		rpcCmd, ok := cmd.(RPCCommand)
		if !ok {
			return nil
		}
		return r.registerWithRPC(rpcCmd, meta)
	})

	_ = registry.AddResolver("catalog", func(cmd any, meta CommandMeta, r *Registry) error {
		descriptor, ok := DescriptorForCommand(cmd, meta)
		if !ok {
			return nil
		}
		return r.RegisterCatalogDescriptor(descriptor)
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

func (r *Registry) SetRPCRegister(fn func(opts RPCConfig, handler any, meta CommandMeta) error) *Registry {
	r.mu.Lock()
	defer r.mu.Unlock()
	if r.initialized || r.initializing {
		return r
	}
	r.rpcRegisterFn = fn
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

func (r *Registry) registerWithRPC(rpcCmd RPCCommand, meta CommandMeta) error {
	if r.rpcRegisterFn == nil {
		return errors.New("rpc transport not provided during initialization", errors.CategoryBadInput).
			WithTextCode("RPC_TRANSPORT_NOT_SET")
	}

	handler := rpcCmd.RPCHandler()
	config := rpcCmd.RPCOptions()
	if describer, ok := rpcCmd.(RPCDescriber); ok {
		config = mergeRPCDescription(config, describer.RPCDescription())
	}

	if err := r.rpcRegisterFn(config, handler, meta); err != nil {
		return errors.Wrap(err, errors.CategoryExternal, "rpc transport registration failed").
			WithTextCode("RPC_REGISTRATION_FAILED").
			WithMetadata(map[string]any{
				"config": config,
				"meta":   meta,
			})
	}

	return nil
}

func mergeRPCDescription(config RPCConfig, description RPCDescription) RPCConfig {
	if description.Summary != "" {
		config.Summary = description.Summary
	}
	if description.Description != "" {
		config.Description = description.Description
	}
	if len(description.Tags) > 0 {
		config.Tags = append([]string(nil), description.Tags...)
	}
	if description.Deprecated {
		config.Deprecated = true
	}
	if description.Since != "" {
		config.Since = description.Since
	}
	return config
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

// RegisterCatalogDescriptor registers or replaces an external catalog
// descriptor. Duplicate IDs replace in place and preserve original ordering.
func (r *Registry) RegisterCatalogDescriptor(descriptor CommandDescriptor) error {
	descriptor = MergeCommandDescriptor(CommandMeta{MessageType: descriptor.MessageType}, descriptor.Exposure, descriptor.RPC, descriptor)
	if descriptor.ID == "" {
		return errors.New("command descriptor id required", errors.CategoryBadInput).
			WithTextCode("COMMAND_DESCRIPTOR_ID_REQUIRED")
	}
	if !descriptor.ExposeInAdmin && !descriptor.Exposure.ExposeInAdmin {
		return nil
	}

	r.mu.Lock()
	defer r.mu.Unlock()
	if r.descriptors == nil {
		r.descriptors = make(map[string]CommandDescriptor)
	}
	if _, exists := r.descriptors[descriptor.ID]; !exists {
		r.descriptorOrder = append(r.descriptorOrder, descriptor.ID)
	}
	r.descriptors[descriptor.ID] = cloneCommandDescriptor(descriptor)
	return nil
}

// CatalogDescriptor returns one descriptor by stable command ID.
func (r *Registry) CatalogDescriptor(commandID string) (CommandDescriptor, bool) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	if r.descriptors == nil {
		return CommandDescriptor{}, false
	}
	descriptor, ok := r.descriptors[commandID]
	if !ok {
		return CommandDescriptor{}, false
	}
	return cloneCommandDescriptor(descriptor), true
}

// CatalogDescriptors returns descriptors in deterministic registration order.
func (r *Registry) CatalogDescriptors() []CommandDescriptor {
	r.mu.RLock()
	defer r.mu.RUnlock()
	if r.descriptors == nil {
		return nil
	}
	out := make([]CommandDescriptor, 0, len(r.descriptorOrder))
	for _, id := range r.descriptorOrder {
		if descriptor, ok := r.descriptors[id]; ok {
			out = append(out, cloneCommandDescriptor(descriptor))
		}
	}
	return out
}

// CatalogDescriptorsByTag returns descriptors matching at least one tag.
func (r *Registry) CatalogDescriptorsByTag(tags ...string) []CommandDescriptor {
	wanted := map[string]bool{}
	for _, tag := range tags {
		if normalized := strings.ToLower(strings.TrimSpace(tag)); normalized != "" {
			wanted[normalized] = true
		}
	}
	if len(wanted) == 0 {
		return nil
	}
	out := []CommandDescriptor{}
	for _, descriptor := range r.CatalogDescriptors() {
		for _, tag := range descriptor.Tags {
			if wanted[strings.ToLower(strings.TrimSpace(tag))] {
				out = append(out, descriptor)
				break
			}
		}
	}
	return out
}

// CatalogDescriptorsByExposure returns descriptors with the requested admin
// exposure state. It does not perform actor authorization.
func (r *Registry) CatalogDescriptorsByExposure(exposed bool) []CommandDescriptor {
	out := []CommandDescriptor{}
	for _, descriptor := range r.CatalogDescriptors() {
		effective := descriptor.ExposeInAdmin || descriptor.Exposure.ExposeInAdmin
		if effective == exposed {
			out = append(out, descriptor)
		}
	}
	return out
}

func cloneCommandDescriptor(in CommandDescriptor) CommandDescriptor {
	out := in
	out.Tags = cloneCatalogStrings(in.Tags)
	out.Permissions = cloneCatalogStrings(in.Permissions)
	out.Roles = cloneCatalogStrings(in.Roles)
	out.RedactionHints = cloneCatalogStrings(in.RedactionHints)
	out.Exposure.Tags = cloneCatalogStrings(in.Exposure.Tags)
	out.Exposure.Permissions = cloneCatalogStrings(in.Exposure.Permissions)
	out.Exposure.Roles = cloneCatalogStrings(in.Exposure.Roles)
	out.RPC.Permissions = cloneCatalogStrings(in.RPC.Permissions)
	out.RPC.Roles = cloneCatalogStrings(in.RPC.Roles)
	out.RPC.Tags = cloneCatalogStrings(in.RPC.Tags)
	out.DisplayHints = cloneCatalogMap(in.DisplayHints)
	out.Input = cloneCommandInputSchema(in.Input)
	out.Result.ResultSchema = cloneCatalogMap(in.Result.ResultSchema)
	out.Result.RedactionHints = cloneCatalogStrings(in.Result.RedactionHints)
	out.Result.DisplayHints = cloneCatalogMap(in.Result.DisplayHints)
	return out
}

func cloneCommandInputSchema(in CommandInputSchema) CommandInputSchema {
	out := in
	out.Required = cloneCatalogStrings(in.Required)
	out.JSONSchema = cloneCatalogMap(in.JSONSchema)
	out.Extensions = cloneCatalogMap(in.Extensions)
	if len(in.Fields) > 0 {
		out.Fields = make([]CommandInputField, len(in.Fields))
		for i, field := range in.Fields {
			out.Fields[i] = cloneCommandInputField(field)
		}
	}
	return out
}

func cloneCommandInputField(in CommandInputField) CommandInputField {
	out := in
	out.Default = cloneCatalogValue(in.Default)
	out.Validation = cloneCatalogMap(in.Validation)
	out.DisplayHints = cloneCatalogMap(in.DisplayHints)
	if len(in.StaticOptions) > 0 {
		out.StaticOptions = make([]CommandOption, len(in.StaticOptions))
		for i, option := range in.StaticOptions {
			out.StaticOptions[i] = option
			out.StaticOptions[i].Metadata = cloneCatalogMap(option.Metadata)
		}
	}
	if in.OptionSource != nil {
		source := *in.OptionSource
		source.Params = cloneCatalogMap(in.OptionSource.Params)
		out.OptionSource = &source
	}
	return out
}

func cloneCatalogMap(in map[string]any) map[string]any {
	if len(in) == 0 {
		return nil
	}
	out := make(map[string]any, len(in))
	for key, value := range in {
		out[key] = cloneCatalogValue(value)
	}
	return out
}

func cloneCatalogValue(value any) any {
	switch typed := value.(type) {
	case map[string]any:
		return cloneCatalogMap(typed)
	case []any:
		if len(typed) == 0 {
			return []any{}
		}
		out := make([]any, len(typed))
		for i, item := range typed {
			out[i] = cloneCatalogValue(item)
		}
		return out
	case []string:
		return cloneCatalogStrings(typed)
	case []map[string]any:
		if len(typed) == 0 {
			return []map[string]any{}
		}
		out := make([]map[string]any, len(typed))
		for i, item := range typed {
			out[i] = cloneCatalogMap(item)
		}
		return out
	default:
		return value
	}
}

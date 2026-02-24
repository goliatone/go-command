package command

import (
	"context"
	"errors"
	"fmt"
	"sync"
	"testing"
	"time"

	"github.com/alecthomas/kong"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

type TestCommand struct {
	name string
}

func (t *TestCommand) Execute(ctx context.Context, msg string) error {
	return nil
}

func (t *TestCommand) CLIHandler() any {
	return &TestCLICommand{name: t.name}
}

func (t *TestCommand) CLIOptions() CLIConfig {
	return CLIConfig{
		Path:        []string{t.name},
		Description: fmt.Sprintf("Test command %s", t.name),
		Group:       "test",
	}
}

func (t *TestCommand) CronHandler() func() error {
	return func() error {
		return nil
	}
}

func (t *TestCommand) CronOptions() HandlerConfig {
	return HandlerConfig{
		Expression: "0 0 * * *",
		MaxRetries: 3,
		Timeout:    time.Hour,
	}
}

type TestCLICommand struct {
	name string
}

func (t *TestCLICommand) Run(ctx *kong.Context) error {
	return nil
}

type CLIOnlyCommand struct {
	name string
}

func (c *CLIOnlyCommand) CLIHandler() any {
	return &TestCLICommand{name: c.name}
}

func (c *CLIOnlyCommand) CLIOptions() CLIConfig {
	return CLIConfig{
		Path:        []string{c.name},
		Description: fmt.Sprintf("CLI only command %s", c.name),
		Group:       "cli",
	}
}

type PathCommand struct {
	name    string
	path    []string
	desc    string
	aliases []string
	groups  []CLIGroup
}

type PathCommandCLI struct {
}

func (c *PathCommand) CLIHandler() any {
	return &PathCommandCLI{}
}

func (c *PathCommand) CLIOptions() CLIConfig {
	return CLIConfig{
		Path:        c.path,
		Description: c.desc,
		Aliases:     c.aliases,
		Groups:      c.groups,
	}
}

func (c *PathCommandCLI) Run(_ *kong.Context) error {
	return nil
}

type injectedService struct {
	called bool
}

type pointerCLICommand struct {
	svc *injectedService
}

func (c *pointerCLICommand) CLIHandler() any {
	return c
}

func (c *pointerCLICommand) CLIOptions() CLIConfig {
	return CLIConfig{
		Path: []string{"new"},
	}
}

func (c *pointerCLICommand) Run(_ *kong.Context) error {
	if c.svc == nil {
		return errors.New("service not configured")
	}
	c.svc.called = true
	return nil
}

type CronOnlyCommand struct {
	name string
}

func (c *CronOnlyCommand) CronHandler() func() error {
	return func() error {
		return nil
	}
}

func (c *CronOnlyCommand) CronOptions() HandlerConfig {
	return HandlerConfig{
		Expression: "0 */6 * * *",
		MaxRetries: 1,
	}
}

type RPCOnlyCommand struct {
	config RPCConfig
}

func (c *RPCOnlyCommand) RPCHandler() any {
	return c
}

func (c *RPCOnlyCommand) RPCOptions() RPCConfig {
	return c.config
}

type RPCDescribedCommand struct {
	config      RPCConfig
	description RPCDescription
}

func (c *RPCDescribedCommand) RPCHandler() any {
	return c
}

func (c *RPCDescribedCommand) RPCOptions() RPCConfig {
	return c.config
}

func (c *RPCDescribedCommand) RPCDescription() RPCDescription {
	return c.description
}

type mockCronRegister struct {
	mu            sync.Mutex
	registrations []HandlerConfig
	shouldError   bool
}

func (m *mockCronRegister) register(opts HandlerConfig, handler any) error {
	m.mu.Lock()
	defer m.mu.Unlock()

	if m.shouldError {
		return errors.New("mock cron registration error")
	}

	m.registrations = append(m.registrations, opts)
	return nil
}

func (m *mockCronRegister) getRegistrations() []HandlerConfig {
	m.mu.Lock()
	defer m.mu.Unlock()

	result := make([]HandlerConfig, len(m.registrations))
	copy(result, m.registrations)
	return result
}

type rpcRegistration struct {
	config RPCConfig
	meta   CommandMeta
}

type mockRPCRegister struct {
	mu            sync.Mutex
	registrations []rpcRegistration
	shouldError   bool
}

func (m *mockRPCRegister) register(opts RPCConfig, _ any, meta CommandMeta) error {
	m.mu.Lock()
	defer m.mu.Unlock()

	if m.shouldError {
		return errors.New("mock rpc registration error")
	}

	m.registrations = append(m.registrations, rpcRegistration{
		config: opts,
		meta:   meta,
	})
	return nil
}

func (m *mockRPCRegister) getRegistrations() []rpcRegistration {
	m.mu.Lock()
	defer m.mu.Unlock()

	result := make([]rpcRegistration, len(m.registrations))
	copy(result, m.registrations)
	return result
}

func TestNewRegistry(t *testing.T) {
	registry := NewRegistry()

	assert.NotNil(t, registry)
	assert.Empty(t, registry.commandsToRegister)
	assert.False(t, registry.initialized)
	assert.Empty(t, registry.cliOptions)
	assert.Nil(t, registry.cronRegisterFn)
	assert.Nil(t, registry.rpcRegisterFn)
}

func TestRegistrySetCronRegister(t *testing.T) {
	registry := NewRegistry()
	mockCron := &mockCronRegister{}

	result := registry.SetCronRegister(mockCron.register)

	assert.Same(t, registry, result)
	assert.NotNil(t, registry.cronRegisterFn)
}

func TestRegistrySetCronRegisterAfterInitialize(t *testing.T) {
	registry := NewRegistry()
	registry.initializing = true

	registry.SetCronRegister(NilCronRegister)

	assert.Nil(t, registry.cronRegisterFn)

	registry.initializing = false
	registry.initialized = true

	registry.SetCronRegister(NilCronRegister)

	assert.Nil(t, registry.cronRegisterFn)
}

func TestRegistrySetRPCRegister(t *testing.T) {
	registry := NewRegistry()
	mockRPC := &mockRPCRegister{}

	result := registry.SetRPCRegister(mockRPC.register)

	assert.Same(t, registry, result)
	assert.NotNil(t, registry.rpcRegisterFn)
}

func TestRegistrySetRPCRegisterAfterInitialize(t *testing.T) {
	registry := NewRegistry()
	registry.initializing = true

	registry.SetRPCRegister(NilRPCRegister)

	assert.Nil(t, registry.rpcRegisterFn)

	registry.initializing = false
	registry.initialized = true

	registry.SetRPCRegister(NilRPCRegister)

	assert.Nil(t, registry.rpcRegisterFn)
}

func TestRegisterCommand(t *testing.T) {
	tests := []struct {
		name        string
		cmd         any
		initialized bool
		wantErr     string
	}{
		{
			name: "valid command",
			cmd:  &TestCommand{name: "test"},
		},
		{
			name:    "nil command",
			cmd:     nil,
			wantErr: "command cannot be nil",
		},
		{
			name:        "registry already initialized",
			cmd:         &TestCommand{name: "test"},
			initialized: true,
			wantErr:     "cannot register commands after registry has been initialized",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			registry := NewRegistry()
			if tt.initialized {
				registry.initialized = true
			}

			err := registry.RegisterCommand(tt.cmd)

			if tt.wantErr != "" {
				assert.Error(t, err)
				assert.Contains(t, err.Error(), tt.wantErr)
			} else {
				assert.NoError(t, err)
				assert.Len(t, registry.commandsToRegister, 1)
				assert.Equal(t, tt.cmd, registry.commandsToRegister[0].cmd)
			}
		})
	}
}

func TestRegisterMultipleCommands(t *testing.T) {
	registry := NewRegistry()
	cmd1 := &TestCommand{name: "cmd1"}
	cmd2 := &CLIOnlyCommand{name: "cmd2"}

	err1 := registry.RegisterCommand(cmd1)
	err2 := registry.RegisterCommand(cmd2)

	assert.NoError(t, err1)
	assert.NoError(t, err2)
	assert.Len(t, registry.commandsToRegister, 2)
	assert.Equal(t, cmd1, registry.commandsToRegister[0].cmd)
	assert.Equal(t, cmd2, registry.commandsToRegister[1].cmd)
}

func TestInitialize(t *testing.T) {
	t.Run("successful initialization", func(t *testing.T) {
		registry := NewRegistry()
		mockCron := &mockCronRegister{}
		registry.SetCronRegister(mockCron.register)

		cmd1 := &TestCommand{name: "test1"}
		cmd2 := &CLIOnlyCommand{name: "cli-only"}
		cmd3 := &CronOnlyCommand{name: "cron-only"}

		require.NoError(t, registry.RegisterCommand(cmd1))
		require.NoError(t, registry.RegisterCommand(cmd2))
		require.NoError(t, registry.RegisterCommand(cmd3))

		err := registry.Initialize()

		assert.NoError(t, err)
		assert.True(t, registry.initialized)

		cliOptions, err := registry.GetCLIOptions()
		assert.NoError(t, err)
		parser, err := kong.New(&struct{}{}, append(cliOptions, kong.Name("app"))...)
		require.NoError(t, err)
		_, err = parser.Parse([]string{"test1"})
		assert.NoError(t, err)
		_, err = parser.Parse([]string{"cli-only"})
		assert.NoError(t, err)

		cronRegs := mockCron.getRegistrations()
		assert.Len(t, cronRegs, 2)
	})

	t.Run("already initialized", func(t *testing.T) {
		registry := NewRegistry()
		registry.initialized = true

		err := registry.Initialize()

		assert.Error(t, err)
		assert.Contains(t, err.Error(), "registry already initialized")
	})

	t.Run("cron registration error", func(t *testing.T) {
		registry := NewRegistry()
		mockCron := &mockCronRegister{shouldError: true}
		registry.SetCronRegister(mockCron.register)

		cmd := &TestCommand{name: "test"}
		require.NoError(t, registry.RegisterCommand(cmd))

		err := registry.Initialize()

		assert.Error(t, err)
		assert.Contains(t, err.Error(), "mock cron registration error")
		assert.True(t, registry.initialized)
	})

	t.Run("no cron register function", func(t *testing.T) {
		registry := NewRegistry()
		cmd := &CronOnlyCommand{name: "cron"}
		require.NoError(t, registry.RegisterCommand(cmd))

		err := registry.Initialize()

		assert.Error(t, err)
		assert.Contains(t, err.Error(), "cron scheduler not provided during initialization")
	})
}

func TestRegisterWithCLI(t *testing.T) {
	registry := NewRegistry()
	cmd := &CLIOnlyCommand{name: "test-cli"}

	err := registry.registerWithCLI(cmd)

	assert.NoError(t, err)
	opts, err := buildCLIOptions(registry.cliRoot)
	assert.NoError(t, err)
	assert.NotEmpty(t, opts)
}

func TestCLIHandlerPreservesInjectedPointerFields(t *testing.T) {
	registry := NewRegistry()
	cmd := &pointerCLICommand{svc: &injectedService{}}

	require.NoError(t, registry.RegisterCommand(cmd))
	require.NoError(t, registry.Initialize())

	opts, err := registry.GetCLIOptions()
	require.NoError(t, err)

	parser, err := kong.New(&struct{}{}, append(opts, kong.Name("ctx"))...)
	require.NoError(t, err)

	ctx, err := parser.Parse([]string{"new"})
	require.NoError(t, err)
	require.NoError(t, ctx.Run())

	assert.True(t, cmd.svc.called)
}

func TestRegisterWithCron(t *testing.T) {
	t.Run("successful registration", func(t *testing.T) {
		registry := NewRegistry()
		mockCron := &mockCronRegister{}
		registry.SetCronRegister(mockCron.register)

		cmd := &CronOnlyCommand{name: "test-cron"}

		err := registry.registerWithCron(cmd)

		assert.NoError(t, err)
		cronRegs := mockCron.getRegistrations()
		assert.Len(t, cronRegs, 1)
		assert.Equal(t, "0 */6 * * *", cronRegs[0].Expression)
	})

	t.Run("no cron register function", func(t *testing.T) {
		registry := NewRegistry()
		cmd := &CronOnlyCommand{name: "test-cron"}

		err := registry.registerWithCron(cmd)

		assert.Error(t, err)
		assert.Contains(t, err.Error(), "cron scheduler not provided during initialization")
	})
}

func TestRegisterWithRPC(t *testing.T) {
	t.Run("successful registration", func(t *testing.T) {
		registry := NewRegistry()
		mockRPC := &mockRPCRegister{}
		registry.SetRPCRegister(mockRPC.register)

		cmd := &RPCOnlyCommand{config: RPCConfig{
			Method:      "fsm.apply_event",
			Streaming:   true,
			Idempotent:  true,
			Permissions: []string{"fsm:write"},
			Roles:       []string{"admin"},
		}}
		meta := MessageTypeForCommand(cmd)

		err := registry.registerWithRPC(cmd, meta)

		assert.NoError(t, err)
		rpcRegs := mockRPC.getRegistrations()
		assert.Len(t, rpcRegs, 1)
		assert.Equal(t, "fsm.apply_event", rpcRegs[0].config.Method)
		assert.True(t, rpcRegs[0].config.Streaming)
		assert.True(t, rpcRegs[0].config.Idempotent)
		assert.Equal(t, []string{"fsm:write"}, rpcRegs[0].config.Permissions)
		assert.Equal(t, []string{"admin"}, rpcRegs[0].config.Roles)
		assert.Equal(t, meta, rpcRegs[0].meta)
	})

	t.Run("merges optional describer metadata", func(t *testing.T) {
		registry := NewRegistry()
		mockRPC := &mockRPCRegister{}
		registry.SetRPCRegister(mockRPC.register)

		cmd := &RPCDescribedCommand{
			config: RPCConfig{
				Method:      "fsm.snapshot",
				Summary:     "fallback summary",
				Description: "fallback description",
				Tags:        []string{"fallback"},
				Since:       "v1.0.0",
			},
			description: RPCDescription{
				Summary:     "Snapshot",
				Description: "Read current FSM snapshot",
				Tags:        []string{"fsm", "read"},
				Deprecated:  true,
				Since:       "v2.0.0",
			},
		}

		err := registry.registerWithRPC(cmd, CommandMeta{})
		assert.NoError(t, err)

		rpcRegs := mockRPC.getRegistrations()
		require.Len(t, rpcRegs, 1)
		assert.Equal(t, "fsm.snapshot", rpcRegs[0].config.Method)
		assert.Equal(t, "Snapshot", rpcRegs[0].config.Summary)
		assert.Equal(t, "Read current FSM snapshot", rpcRegs[0].config.Description)
		assert.Equal(t, []string{"fsm", "read"}, rpcRegs[0].config.Tags)
		assert.True(t, rpcRegs[0].config.Deprecated)
		assert.Equal(t, "v2.0.0", rpcRegs[0].config.Since)
	})

	t.Run("no rpc register function", func(t *testing.T) {
		registry := NewRegistry()
		cmd := &RPCOnlyCommand{config: RPCConfig{Method: "fsm.apply_event"}}

		err := registry.registerWithRPC(cmd, CommandMeta{})

		assert.Error(t, err)
		assert.Contains(t, err.Error(), "rpc transport not provided during initialization")
	})
}

func TestGetCLIOptions(t *testing.T) {
	t.Run("success", func(t *testing.T) {
		registry := NewRegistry()
		cmd := &CLIOnlyCommand{name: "cli-only"}
		require.NoError(t, registry.RegisterCommand(cmd))
		registry.SetCronRegister(NilCronRegister)
		require.NoError(t, registry.Initialize())

		options, err := registry.GetCLIOptions()

		assert.NoError(t, err)
		assert.NotEmpty(t, options)

		options = append(options, kong.Name("dummy"))
		copied, _ := registry.GetCLIOptions()
		assert.NotEqual(t, len(options), len(copied))
	})

	t.Run("not initialized", func(t *testing.T) {
		registry := NewRegistry()

		options, err := registry.GetCLIOptions()

		assert.Error(t, err)
		assert.Contains(t, err.Error(), "registry not initialized")
		assert.Nil(t, options)
	})
}

func TestRegistryConcurrency(t *testing.T) {
	registry := NewRegistry()
	mockCron := &mockCronRegister{}
	registry.SetCronRegister(mockCron.register)

	var wg sync.WaitGroup
	errors := make(chan error, 10)

	for i := 0; i < 10; i++ {
		wg.Add(1)
		go func(id int) {
			defer wg.Done()
			cmd := &TestCommand{name: fmt.Sprintf("cmd-%d", id)}
			if err := registry.RegisterCommand(cmd); err != nil {
				errors <- err
			}
		}(i)
	}

	wg.Wait()
	close(errors)

	var regErrors []error
	for err := range errors {
		regErrors = append(regErrors, err)
	}
	assert.Empty(t, regErrors)

	err := registry.Initialize()
	assert.NoError(t, err)
	assert.Len(t, registry.commandsToRegister, 10)

	wg = sync.WaitGroup{}
	for i := 0; i < 5; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			_, err := registry.GetCLIOptions()
			assert.NoError(t, err)
		}()
	}
	wg.Wait()
}

func TestRegistryMultipleInitialization(t *testing.T) {
	registry := NewRegistry()
	registry.SetCronRegister(NilCronRegister)

	cmd := &TestCommand{name: "test"}
	require.NoError(t, registry.RegisterCommand(cmd))

	err1 := registry.Initialize()
	assert.NoError(t, err1)

	err2 := registry.Initialize()
	assert.Error(t, err2)
	assert.Contains(t, err2.Error(), "registry already initialized")
}

func TestRegistryEdgeCases(t *testing.T) {
	t.Run("empty registry initialization", func(t *testing.T) {
		registry := NewRegistry()
		err := registry.Initialize()
		assert.NoError(t, err)
		assert.True(t, registry.initialized)

		options, err := registry.GetCLIOptions()
		assert.NoError(t, err)
		assert.Empty(t, options)
	})

	t.Run("command with no interfaces", func(t *testing.T) {
		registry := NewRegistry()

		type NoInterfaceCommand struct{}
		cmd := &NoInterfaceCommand{}

		err := registry.RegisterCommand(cmd)
		assert.NoError(t, err)

		err = registry.Initialize()
		assert.NoError(t, err)

		options, err := registry.GetCLIOptions()
		assert.NoError(t, err)
		assert.Empty(t, options)
	})
}

func TestNestedCLIPathsAndAliases(t *testing.T) {
	registry := NewRegistry()
	registry.SetCronRegister(NilCronRegister)

	create := &PathCommand{
		name:    "create",
		path:    []string{"prompt", "create"},
		desc:    "Create prompts",
		groups:  []CLIGroup{{Name: "prompt", Description: "Prompt commands"}},
		aliases: []string{"add"},
	}
	list := &PathCommand{
		name:    "list",
		path:    []string{"prompt", "list"},
		desc:    "List prompts",
		aliases: []string{"ls"},
	}

	require.NoError(t, registry.RegisterCommand(create))
	require.NoError(t, registry.RegisterCommand(list))
	require.NoError(t, registry.Initialize())

	opts, err := registry.GetCLIOptions()
	require.NoError(t, err)
	parser, err := kong.New(&struct{}{}, append(opts, kong.Name("ctx"))...)
	require.NoError(t, err)

	ctx, err := parser.Parse([]string{"prompt", "create"})
	require.NoError(t, err)
	require.NoError(t, ctx.Run())
	assert.Equal(t, "prompt create", ctx.Command())

	ctx, err = parser.Parse([]string{"prompt", "ls"})
	require.NoError(t, err)
	require.NoError(t, ctx.Run())
	assert.Contains(t, ctx.Command(), "prompt list")

	var promptNode *kong.Node
	for _, child := range parser.Model.Node.Children {
		if child != nil && child.Name == "prompt" {
			promptNode = child
			break
		}
	}
	require.NotNil(t, promptNode)
	assert.Equal(t, "Prompt commands", promptNode.Help)
}

func TestRegistryResolverOrder(t *testing.T) {
	registry := NewRegistry()
	var calls []string

	require.NoError(t, registry.AddResolver("first", func(cmd any, meta CommandMeta, r *Registry) error {
		calls = append(calls, "first")
		return nil
	}))
	require.NoError(t, registry.AddResolver("second", func(cmd any, meta CommandMeta, r *Registry) error {
		calls = append(calls, "second")
		return nil
	}))

	require.NoError(t, registry.RegisterCommand(&struct{}{}))
	require.NoError(t, registry.Initialize())

	assert.Equal(t, []string{"first", "second"}, calls)
}

func TestRegistryResolverValidation(t *testing.T) {
	registry := NewRegistry()

	err := registry.AddResolver("", func(cmd any, meta CommandMeta, r *Registry) error { return nil })
	assert.Error(t, err)

	err = registry.AddResolver("nil", nil)
	assert.Error(t, err)

	err = registry.AddResolver("custom", func(cmd any, meta CommandMeta, r *Registry) error { return nil })
	assert.NoError(t, err)

	err = registry.AddResolver("custom", func(cmd any, meta CommandMeta, r *Registry) error { return nil })
	assert.Error(t, err)
}

func TestRegistryResolverState(t *testing.T) {
	registry := NewRegistry()
	assert.True(t, registry.HasResolver("cli"))
	assert.True(t, registry.HasResolver("cron"))
	assert.True(t, registry.HasResolver("rpc"))
	assert.False(t, registry.HasResolver("missing"))

	require.NoError(t, registry.RegisterCommand(&struct{}{}))
	require.NoError(t, registry.Initialize())

	err := registry.AddResolver("late", func(cmd any, meta CommandMeta, r *Registry) error { return nil })
	assert.Error(t, err)
}

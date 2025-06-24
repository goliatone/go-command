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
		Name:        t.name,
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
		Name:        c.name,
		Description: fmt.Sprintf("CLI only command %s", c.name),
		Group:       "cli",
	}
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

func TestNewRegistry(t *testing.T) {
	registry := NewRegistry()

	assert.NotNil(t, registry)
	assert.Empty(t, registry.commandsToRegister)
	assert.False(t, registry.initialized)
	assert.Empty(t, registry.cliOptions)
	assert.Nil(t, registry.cronRegisterFn)
}

func TestRegistrySetCronRegister(t *testing.T) {
	registry := NewRegistry()
	mockCron := &mockCronRegister{}

	result := registry.SetCronRegister(mockCron.register)

	assert.Same(t, registry, result)
	assert.NotNil(t, registry.cronRegisterFn)
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
				assert.Equal(t, tt.cmd, registry.commandsToRegister[0])
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
	assert.Equal(t, cmd1, registry.commandsToRegister[0])
	assert.Equal(t, cmd2, registry.commandsToRegister[1])
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
		assert.Len(t, cliOptions, 2)

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
	assert.Len(t, registry.cliOptions, 1)
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

func TestGetCLIOptions(t *testing.T) {
	t.Run("success", func(t *testing.T) {
		registry := NewRegistry()
		registry.initialized = true

		// Add some options directly for testing
		registry.cliOptions = append(registry.cliOptions, kong.DynamicCommand("test", "desc", "group", nil))

		options, err := registry.GetCLIOptions()

		assert.NoError(t, err)
		assert.Len(t, options, 1)

		options = append(options, kong.DynamicCommand("test2", "desc2", "group2", nil))
		assert.Len(t, registry.cliOptions, 1)
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

package registry

import (
	"context"
	"fmt"
	"testing"
	"time"

	"github.com/alecthomas/kong"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"github.com/goliatone/go-command"
)

// Test command implementations for global registry tests
type TestMessage struct {
	Content string
}

func (t TestMessage) Type() string {
	return "test_message"
}

type TestResponse struct {
	Result string
}

type GlobalTestCommand struct {
	name string
}

func (t *GlobalTestCommand) Execute(ctx context.Context, msg TestMessage) error {
	return nil
}

func (t *GlobalTestCommand) CLIHandler() any {
	return &GlobalTestCLICommand{name: t.name}
}

func (t *GlobalTestCommand) CLIOptions() command.CLIConfig {
	return command.CLIConfig{
		Name:        t.name,
		Description: fmt.Sprintf("Global test command %s", t.name),
		Group:       "test",
	}
}

func (t *GlobalTestCommand) CronHandler() func() error {
	return func() error {
		return nil
	}
}

func (t *GlobalTestCommand) CronOptions() command.HandlerConfig {
	return command.HandlerConfig{
		Expression: "0 0 * * *",
		MaxRetries: 3,
		Timeout:    time.Hour,
	}
}

type GlobalTestCLICommand struct {
	name string
}

func (t *GlobalTestCLICommand) Run(ctx *kong.Context) error {
	return nil
}

type GlobalTestQuery struct {
	name string
}

func (q *GlobalTestQuery) Query(ctx context.Context, msg TestMessage) (TestResponse, error) {
	return TestResponse{Result: "query result"}, nil
}

func (q *GlobalTestQuery) CLIHandler() any {
	return &GlobalTestCLICommand{name: q.name}
}

func (q *GlobalTestQuery) CLIOptions() command.CLIConfig {
	return command.CLIConfig{
		Name:        q.name,
		Description: fmt.Sprintf("Global test query %s", q.name),
		Group:       "query",
	}
}

// Mock implementations for testing
type mockCronRegister struct {
	registrations []command.HandlerConfig
	shouldError   bool
}

func (m *mockCronRegister) register(opts command.HandlerConfig, handler any) error {
	if m.shouldError {
		return fmt.Errorf("mock cron registration error")
	}
	m.registrations = append(m.registrations, opts)
	return nil
}

func TestRegisterCommand(t *testing.T) {
	WithTestRegistry(func() {
		cmd := &GlobalTestCommand{name: "test-cmd"}
		SetCronRegister(command.NilCronRegister)
		sub, err := RegisterCommand(cmd)

		assert.NoError(t, err)
		assert.NotNil(t, sub)

		// Verify the command was registered in the global registry
		// Note: We can't directly access the global registry's internal state
		// but we can test the initialization process
		err = Start(context.Background())
		assert.NoError(t, err)
	})
}

func TestRegisterQuery(t *testing.T) {
	WithTestRegistry(func() {
		qry := &GlobalTestQuery{name: "test-query"}

		sub, err := RegisterQuery(qry)

		assert.NoError(t, err)
		assert.NotNil(t, sub)

		err = Start(context.Background())
		assert.NoError(t, err)
	})
}

func TestSetCronRegister(t *testing.T) {
	WithTestRegistry(func() {
		mockCron := &mockCronRegister{}

		SetCronRegister(mockCron.register)

		// Register a command that supports cron
		cmd := &GlobalTestCommand{name: "cron-cmd"}
		_, err := RegisterCommand(cmd)
		require.NoError(t, err)

		err = Start(context.Background())
		assert.NoError(t, err)

		// Verify cron registration was called
		assert.Len(t, mockCron.registrations, 1)
		assert.Equal(t, "0 0 * * *", mockCron.registrations[0].Expression)
	})
}

func TestGetCLIOptions(t *testing.T) {
	WithTestRegistry(func() {
		// Register some commands
		cmd := &GlobalTestCommand{name: "cli-cmd"}
		qry := &GlobalTestQuery{name: "cli-query"}

		SetCronRegister(command.NilCronRegister)
		_, err := RegisterCommand(cmd)
		require.NoError(t, err)

		_, err = RegisterQuery(qry)
		require.NoError(t, err)

		// Initialize the registry
		err = Start(context.Background())
		require.NoError(t, err)

		// Get CLI options
		options, err := GetCLIOptions()
		assert.NoError(t, err)
		assert.Len(t, options, 2) // Both command and query support CLI
	})
}

func TestGetCLIOptionsBeforeInitialization(t *testing.T) {
	WithTestRegistry(func() {
		// Try to get CLI options before initialization
		options, err := GetCLIOptions()

		assert.Error(t, err)
		assert.Contains(t, err.Error(), "registry not initialzied") // Note: typo in original
		assert.Nil(t, options)
	})
}

func TestStart(t *testing.T) {
	t.Run("successful start", func(t *testing.T) {
		WithTestRegistry(func() {
			cmd := &GlobalTestCommand{name: "start-test"}
			SetCronRegister(command.NilCronRegister)
			_, err := RegisterCommand(cmd)
			require.NoError(t, err)

			err = Start(context.Background())
			assert.NoError(t, err)

			// Should be able to get CLI options after start
			options, err := GetCLIOptions()
			assert.NoError(t, err)
			assert.Len(t, options, 1)
		})
	})

	t.Run("start with cron error", func(t *testing.T) {
		WithTestRegistry(func() {
			mockCron := &mockCronRegister{shouldError: true}
			SetCronRegister(mockCron.register)

			cmd := &GlobalTestCommand{name: "error-test"}
			_, err := RegisterCommand(cmd)
			require.NoError(t, err)

			err = Start(context.Background())
			assert.Error(t, err)
			assert.Contains(t, err.Error(), "mock cron registration error")
		})
	})
}

func TestStop(t *testing.T) {
	WithTestRegistry(func() {
		// Register a command
		cmd := &GlobalTestCommand{name: "stop-test"}
		SetCronRegister(command.NilCronRegister)
		_, err := RegisterCommand(cmd)
		require.NoError(t, err)

		// Start the registry
		err = Start(context.Background())
		require.NoError(t, err)

		// Verify it's working
		options, err := GetCLIOptions()
		require.NoError(t, err)
		require.Len(t, options, 1)

		// Stop the registry
		err = Stop()
		assert.NoError(t, err)

		// After stop, should not be initialized
		_, err = GetCLIOptions()
		assert.Error(t, err)
		assert.Contains(t, err.Error(), "registry not initialzied")
	})
}

func TestMultipleRegistrations(t *testing.T) {
	WithTestRegistry(func() {
		// Register multiple commands and queries
		cmd1 := &GlobalTestCommand{name: "cmd1"}
		cmd2 := &GlobalTestCommand{name: "cmd2"}
		qry1 := &GlobalTestQuery{name: "qry1"}
		qry2 := &GlobalTestQuery{name: "qry2"}

		SetCronRegister(command.NilCronRegister)

		_, err := RegisterCommand(cmd1)
		require.NoError(t, err)

		_, err = RegisterCommand(cmd2)
		require.NoError(t, err)

		_, err = RegisterQuery(qry1)
		require.NoError(t, err)

		_, err = RegisterQuery(qry2)
		require.NoError(t, err)

		err = Start(context.Background())
		require.NoError(t, err)

		options, err := GetCLIOptions()
		require.NoError(t, err)
		assert.Len(t, options, 4) // All 4 commands/queries support CLI
	})
}

func TestNilCronRegister(t *testing.T) {
	WithTestRegistry(func() {
		// Test the NilCronRegister function
		err := command.NilCronRegister(command.HandlerConfig{}, func() error { return nil })
		assert.NoError(t, err)

		// Use it with the registry
		SetCronRegister(command.NilCronRegister)

		cmd := &GlobalTestCommand{name: "nil-cron-test"}
		_, err = RegisterCommand(cmd)
		require.NoError(t, err)

		err = Start(context.Background())
		assert.NoError(t, err) // Should not error even though cron registration is a no-op
	})
}

func TestRegistryIsolation(t *testing.T) {
	// Test that multiple test registries are properly isolated
	var options1, options2 []kong.Option

	WithTestRegistry(func() {
		cmd := &GlobalTestCommand{name: "isolation-test-1"}
		SetCronRegister(command.NilCronRegister)
		_, err := RegisterCommand(cmd)
		require.NoError(t, err)

		err = Start(context.Background())
		require.NoError(t, err)

		options1, err = GetCLIOptions()
		require.NoError(t, err)
	})

	WithTestRegistry(func() {
		cmd := &GlobalTestCommand{name: "isolation-test-2"}
		SetCronRegister(command.NilCronRegister)
		_, err := RegisterCommand(cmd)
		require.NoError(t, err)

		err = Start(context.Background())
		require.NoError(t, err)

		options2, err = GetCLIOptions()
		require.NoError(t, err)
	})

	// Both should have exactly one option but they should be independent
	assert.Len(t, options1, 1)
	assert.Len(t, options2, 1)
}

func TestErrorPropagation(t *testing.T) {
	WithTestRegistry(func() {
		// Test that errors from the underlying registry are properly propagated
		SetCronRegister(command.NilCronRegister)
		// Try to register a nil command
		_, err := RegisterCommand[TestMessage](nil)
		assert.Error(t, err)
		assert.Contains(t, err.Error(), "command cannot be nil")

		// Register a valid command first
		cmd := &GlobalTestCommand{name: "error-prop-test"}
		_, err = RegisterCommand(cmd)
		require.NoError(t, err)

		// Start successfully
		err = Start(context.Background())
		require.NoError(t, err)

		// Try to register after initialization
		cmd2 := &GlobalTestCommand{name: "late-registration"}
		_, err = RegisterCommand(cmd2)
		assert.Error(t, err)
		assert.Contains(t, err.Error(), "cannot register commands after registry has been initialized")
	})
}

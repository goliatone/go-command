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

		cmd := &GlobalTestCommand{name: "cron-cmd"}
		_, err := RegisterCommand(cmd)
		require.NoError(t, err)

		err = Start(context.Background())
		assert.NoError(t, err)

		assert.Len(t, mockCron.registrations, 1)
		assert.Equal(t, "0 0 * * *", mockCron.registrations[0].Expression)
	})
}

func TestGetCLIOptions(t *testing.T) {
	WithTestRegistry(func() {
		cmd := &GlobalTestCommand{name: "cli-cmd"}
		qry := &GlobalTestQuery{name: "cli-query"}

		SetCronRegister(command.NilCronRegister)
		_, err := RegisterCommand(cmd)
		require.NoError(t, err)

		_, err = RegisterQuery(qry)
		require.NoError(t, err)

		err = Start(context.Background())
		require.NoError(t, err)

		options, err := GetCLIOptions()
		assert.NoError(t, err)
		assert.NotEmpty(t, options)

		parser, err := kong.New(&struct{}{}, append(options, kong.Name("app"))...)
		require.NoError(t, err)
		_, err = parser.Parse([]string{"cli-cmd"})
		assert.NoError(t, err)
		_, err = parser.Parse([]string{"cli-query"})
		assert.NoError(t, err)
	})
}

func TestGetCLIOptionsBeforeInitialization(t *testing.T) {
	WithTestRegistry(func() {
		options, err := GetCLIOptions()

		assert.Error(t, err)
		assert.Contains(t, err.Error(), "registry not initialized")
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

			options, err := GetCLIOptions()
			assert.NoError(t, err)
			assert.NotEmpty(t, options)
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
		cmd := &GlobalTestCommand{name: "stop-test"}
		SetCronRegister(command.NilCronRegister)
		_, err := RegisterCommand(cmd)
		require.NoError(t, err)

		err = Start(context.Background())
		require.NoError(t, err)

		options, err := GetCLIOptions()
		require.NoError(t, err)
		require.NotEmpty(t, options)

		err = Stop(context.Background())
		assert.NoError(t, err)

		_, err = GetCLIOptions()
		assert.Error(t, err)
		assert.Contains(t, err.Error(), "registry not initialized")
	})
}

func TestMultipleRegistrations(t *testing.T) {
	WithTestRegistry(func() {
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
		assert.NotEmpty(t, options)

		parser, err := kong.New(&struct{}{}, append(options, kong.Name("app"))...)
		require.NoError(t, err)
		_, err = parser.Parse([]string{"cmd1"})
		assert.NoError(t, err)
		_, err = parser.Parse([]string{"cmd2"})
		assert.NoError(t, err)
		_, err = parser.Parse([]string{"qry1"})
		assert.NoError(t, err)
		_, err = parser.Parse([]string{"qry2"})
		assert.NoError(t, err)
	})
}

func TestNilCronRegister(t *testing.T) {
	WithTestRegistry(func() {
		err := command.NilCronRegister(command.HandlerConfig{}, func() error { return nil })
		assert.NoError(t, err)

		SetCronRegister(command.NilCronRegister)

		cmd := &GlobalTestCommand{name: "nil-cron-test"}
		_, err = RegisterCommand(cmd)
		require.NoError(t, err)

		err = Start(context.Background())
		assert.NoError(t, err)
	})
}

func TestRegistryIsolation(t *testing.T) {
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

	assert.NotEmpty(t, options1)
	assert.NotEmpty(t, options2)
}

func TestErrorPropagation(t *testing.T) {
	WithTestRegistry(func() {
		SetCronRegister(command.NilCronRegister)
		_, err := RegisterCommand[TestMessage](nil)
		assert.Error(t, err)
		assert.Contains(t, err.Error(), "command cannot be nil")

		cmd := &GlobalTestCommand{name: "error-prop-test"}
		_, err = RegisterCommand(cmd)
		require.NoError(t, err)

		err = Start(context.Background())
		require.NoError(t, err)

		cmd2 := &GlobalTestCommand{name: "late-registration"}
		_, err = RegisterCommand(cmd2)
		assert.Error(t, err)
		assert.Contains(t, err.Error(), "cannot register commands after registry has been initialized")
	})
}

# Go Commands

## Universal Message Handlers

This package implements a pattern for handling messages through commands and queries with type safety and flexible execution strategies.

## Core Components

### Message Interface

Messages carry data and identify their type:

```go
type Message interface {
    Type() string
}
```

### Command Pattern

Commands handle operations with side effects:

```go
type Commander[T Message] interface {
    Execute(ctx context.Context, msg T) error
}

type CommandFunc[T Message] func(ctx context.Context, msg T) error
```

### Query Pattern

Queries retrieve data without side effects:

```go
type Querier[T Message, R any] interface {
    Query(ctx context.Context, msg T) (R, error)
}

type QueryFunc[T Message, R any] func(ctx context.Context, msg T) (R, error)
```

## Registry System

The registry system allows commands and queries to be registered once and executed through multiple interfaces (CLI, cron jobs, etc.). Commands can optionally implement additional interfaces to enable different execution modes.

### Basic Registration

Register commands and queries globally for automatic discovery:

```go
import "github.com/goliatone/go-command/registry"

// Register a command
sub, err := registry.RegisterCommand(myCommand)

// Register a query
sub, err := registry.RegisterQuery(myQuery)

// Initialize the registry
err := registry.Start(context.Background())
```

### Optional Command Interfaces

Commands can implement optional interfaces to enable additional execution modes:

#### CLI Interface

Enable command-line execution by implementing `CLICommand`:

```go
type CLICommand interface {
    CLIHandler() any
    CLIOptions() CLIConfig
}

type CLIConfig struct {
    Name        string
    Description string
    Group       string
    Aliases     []string
    Hidden      bool
}
```

Example implementation:

```go
type SyncDataCommand struct {
    service SyncService
    logger  Logger
}

func (c *SyncDataCommand) CLIHandler() any {
    return &SyncDataCLICommand{cmd: c}
}

func (c *SyncDataCommand) CLIOptions() command.CLIConfig {
    return command.CLIConfig{
        Name:        "sync",
        Description: "Synchronize data between source and target",
        Group:       "data",
        Aliases:     []string{"s"},
    }
}

// Kong CLI adapter
type SyncDataCLICommand struct {
    Source    string `kong:"help='Source directory',required"`
    Target    string `kong:"help='Target directory',required"`
    BatchSize int    `kong:"help='Batch size',default=100"`
    cmd       *SyncDataCommand
}

func (s *SyncDataCLICommand) Run(ctx *kong.Context) error {
    return s.cmd.Execute(context.Background(), &SyncDataEvent{
        Source:    s.Source,
        Target:    s.Target,
        BatchSize: s.BatchSize,
    })
}
```

#### Cron Interface

Enable scheduled execution by implementing `CronCommand`:

```go
type CronCommand interface {
    CronHandler() func() error
    CronOptions() HandlerConfig
}

type HandlerConfig struct {
    Expression string        // Cron expression
    MaxRetries int           // Maximum retry attempts
    Timeout    time.Duration // Execution timeout
    MaxRuns    int           // Maximum total runs
    RunOnce    bool          // Run only once
}
```

Example implementation:

```go
func (c *SyncDataCommand) CronHandler() func() error {
    return func() error {
        ctx := context.Background()
        event := &SyncDataEvent{
            Source:    os.Getenv("SYNC_SOURCE"),
            Target:    os.Getenv("SYNC_TARGET"),
            BatchSize: 500,
        }
        return c.Execute(ctx, event)
    }
}

func (c *SyncDataCommand) CronOptions() command.HandlerConfig {
    return command.HandlerConfig{
        Expression: "0 2 * * *", // Run daily at 2 AM
        MaxRetries: 3,
        Timeout:    time.Hour,
    }
}
```

### Registry Setup

Configure the registry with optional components:

```go
import (
    "github.com/goliatone/go-command/cron"
    "github.com/goliatone/go-command/registry"
)

// Set up cron scheduler (optional)
scheduler := cron.NewScheduler()
scheduler.Start(context.Background())

registry.SetCronRegister(func(opts command.HandlerConfig, handler any) error {
    _, err := scheduler.AddHandler(opts, handler)
    return err
})

// Register commands
registry.RegisterCommand(syncCommand)

// Initialize registry (registers commands with CLI and cron)
err := registry.Start(context.Background())

// Get CLI options for Kong
cliOptions, err := registry.GetCLIOptions()
```

### Complete Example

```go
// Message definition
type SyncDataEvent struct {
    Source    string `kong:"help='Source directory',required"`
    Target    string `kong:"help='Target directory',required"`
    BatchSize int    `kong:"help='Batch size',default=100"`
}

func (e SyncDataEvent) Type() string { return "sync_data" }

// Command implementation with multiple interfaces
type SyncDataCommand struct {
    service SyncService
    logger  Logger
}

// Core command logic
func (c *SyncDataCommand) Execute(ctx context.Context, evt *SyncDataEvent) error {
    c.logger.Info("Syncing from %s to %s", evt.Source, evt.Target)
    return c.service.Sync(ctx, evt.Source, evt.Target, evt.BatchSize)
}

// CLI interface implementation
func (c *SyncDataCommand) CLIHandler() any {
    return &SyncDataCLICommand{cmd: c}
}

func (c *SyncDataCommand) CLIOptions() command.CLIConfig {
    return command.CLIConfig{
        Name:        "sync",
        Description: "Synchronize data between directories",
        Group:       "data",
    }
}

// Cron interface implementation
func (c *SyncDataCommand) CronHandler() func() error {
    return func() error {
        ctx := context.Background()
        event := &SyncDataEvent{
            Source:    os.Getenv("SYNC_SOURCE"),
            Target:    os.Getenv("SYNC_TARGET"),
            BatchSize: 500,
        }
        return c.Execute(ctx, event)
    }
}

func (c *SyncDataCommand) CronOptions() command.HandlerConfig {
    return command.HandlerConfig{
        Expression: "0 2 * * *",
        MaxRetries: 3,
        Timeout:    time.Hour,
    }
}

// Kong CLI adapter
type SyncDataCLICommand struct {
    SyncDataEvent `kong:"embed"`
    cmd           *SyncDataCommand
}

func (s *SyncDataCLICommand) Run(ctx *kong.Context) error {
    return s.cmd.Execute(context.Background(), &s.SyncDataEvent)
}
```

## Execution Strategies

The package provides different execution strategies:

### Runner

Manages retries, timeouts, and execution control:

```go
handler := runner.NewHandler(
    runner.WithMaxRetries(3),
    runner.WithTimeout(time.Minute),
)

err := runner.RunCommand(ctx, handler, cmd, msg)
```

The handler's `Run` function will check if the command returns an error, and if so, it will check if the error implements these interfaces:

- `interface{ IsRetryable() bool }`: If the error exposes a `IsRetryable` function and returns `false` we will not retry, if returns `true`, we check the other logic to determine retries.
- `interface{ RetryDelay(int) time.Duration }`: If the error exposes a `RetryDelay` function that returns a `time.Duration`, we will use that value to known when the next attempt should be.

Look at [goliatone/go-errors](https://github.com/goliatone/go-errors) for an implementation.

### Cron

Schedules commands to run periodically:

```go
scheduler := cron.NewScheduler()

id, err := cron.AddCommand(scheduler, &MyHandler{}, cron.HandlerOptions{
    Expression: "*/5 * * * *",
    MaxRetries: 3,
    Timeout: time.Minute,
})
```

<!-- Processes commands asynchronously with River:
### Queue

```go
q, err := queue.NewQueue(driver)
err = queue.RegisterHandler(q, &MyHandler{})
err = queue.EnqueueCommand(q, cmd, &queue.JobOptions{
    ExecutionOptions: types.ExecutionOptions{
        MaxRetries: 3,
        Timeout: time.Minute,
    },
})
``` -->

## Error Handling

All strategies use a common error handler:

```go
type ErrorHandler func(error)
```

Configure error handling through options:

```go
WithErrorHandler(func(err error) {
    log.Printf("error: %v", err)
})
```

## Message Implementation

Create messages as data carriers:

```go
type CreateUserCommand struct {
    Name  string
    Email string
}

func (c CreateUserCommand) Type() string {
    return "create_user"
}
```

## Handler Implementation

Implement handlers either as structs or functions:

```go
// Struct implementation
type UserHandler struct {
    db Database
}

func (h *UserHandler) Execute(ctx context.Context, cmd CreateUserCommand) error {
    return h.db.CreateUser(ctx, cmd.Name, cmd.Email)
}
```

The same can be accomplished using a function:
```go
// Function implementation
func handleCreateUser(ctx context.Context, cmd CreateUserCommand) error {
    return h.db.CreateUser(ctx, cmd.Name, cmd.Email)
}
```

## Testing

The registry provides utilities for testing:

```go
import "github.com/goliatone/go-command/registry"

func TestMyCommand(t *testing.T) {
    registry.WithTestRegistry(func() {
        // Register and test commands in isolation
        _, err := registry.RegisterCommand(myCommand)
        require.NoError(t, err)

        err = registry.Start(context.Background())
        require.NoError(t, err)

        // Test CLI options
        options, err := registry.GetCLIOptions()
        assert.NoError(t, err)
        assert.Len(t, options, 1)
    })
}
```

## Design Benefits

- **Type-safe message handling** through generics
- **Consistent error handling** across execution strategies
- **Context propagation** for cancellation and timeouts
- **Clear separation** between commands and queries
- **Flexible execution options** (retry, timeout, scheduling)
- **Thread-safe operations**
- **Optional interfaces** for different execution modes
- **Centralized registration** with automatic discovery
- **CLI integration** with Kong framework
- **Cron scheduling** with configurable options
- **Test isolation** utilities

# Go Command

A Go package for implementing command and query patterns with support for multiple execution strategies including CLI, cron scheduling, RPC methods, message dispatching, and batch/parallel processing.

## Overview

`go-command` provides a framework for building applications inspired by the Command Query Responsibility Segregation (CQRS) pattern. It offers:

- **Type safe message handling** through Go generics
- **Multiple execution strategies** (CLI, cron, RPC, dispatcher, batch, parallel)
- **Flexible error handling** with retry support
- **Context aware operations** with cancellation and timeouts
- **Registry system** for automatic command/query discovery
- **Integration with popular frameworks** (Kong for CLI, cron for scheduling)

## Installation

```bash
go get github.com/goliatone/go-command
```

## Core Concepts

### Messages

Messages are data carriers that implement the `Message` interface:

```go
type Message interface {
    Type() string
}
```

Example:

```go
type CreateUserCommand struct {
    Email string
    Name  string
}

func (c CreateUserCommand) Type() string {
    return "user.create"
}
```

### Commands

Commands handle operations with side effects:

```go
type Commander[T any] interface {
    Execute(ctx context.Context, msg T) error
}

// Function adapter
type CommandFunc[T any] func(ctx context.Context, msg T) error
```

### Queries

Queries retrieve data without side effects:

```go
type Querier[T any, R any] interface {
    Query(ctx context.Context, msg T) (R, error)
}

// Function adapter
type QueryFunc[T any, R any] func(ctx context.Context, msg T) (R, error)
```

## Execution Strategies

### 1. Dispatcher Pattern

The dispatcher provides a centralized message routing system:

```go
import "github.com/goliatone/go-command/dispatcher"

// Subscribe a command handler
dispatcher.SubscribeCommand(&CreateUserHandler{db: db})

// Or use a function
dispatcher.SubscribeCommandFunc(func(ctx context.Context, cmd CreateUserCommand) error {
    // Handle command
    return nil
})

// Dispatch a command
err := dispatcher.Dispatch(context.Background(), CreateUserCommand{
    Email: "user@example.com",
    Name:  "John Doe",
})

// Subscribe a query handler
dispatcher.SubscribeQuery(&GetUserHandler{db: db})

// Execute a query
user, err := dispatcher.Query[GetUserMessage, *User](context.Background(), GetUserMessage{
    ID: "user-123",
})
```

### 2. Registry System with CLI, Cron, and RPC

The registry allows commands to be registered once and executed through multiple interfaces:

```go
import (
    "github.com/goliatone/go-command/registry"
    "github.com/goliatone/go-command/cron"
)

// Command that supports multiple execution modes
type SyncDataCommand struct {
    service SyncService
    logger  Logger
}

// Core business logic
func (c *SyncDataCommand) Execute(ctx context.Context, evt *SyncDataEvent) error {
    return c.service.Sync(ctx, evt.Source, evt.Target, evt.BatchSize)
}

// Enable CLI execution
func (c *SyncDataCommand) CLIHandler() any {
    return &SyncDataCLICommand{cmd: c}
}

func (c *SyncDataCommand) CLIOptions() command.CLIConfig {
    return command.CLIConfig{
        Path:        []string{"sync"},
        Description: "Synchronize data between directories",
        Group:       "data",
    }
}

// Namespaced commands (e.g., ctx prompt create)
func (c *CreatePromptCommand) CLIOptions() command.CLIConfig {
    return command.CLIConfig{
        Path:        []string{"prompt", "create"},
        Description: "Create a prompt",
        Aliases:     []string{"add"},
        Groups: []command.CLIGroup{
            {Name: "prompt", Description: "Prompt management"},
        },
    }
}

// Enable cron scheduling
func (c *SyncDataCommand) CronHandler() func() error {
    return func() error {
        return c.Execute(context.Background(), &SyncDataEvent{
            Source:    os.Getenv("SYNC_SOURCE"),
            Target:    os.Getenv("SYNC_TARGET"),
            BatchSize: 500,
        })
    }
}

func (c *SyncDataCommand) CronOptions() command.HandlerConfig {
    return command.HandlerConfig{
        Expression: "0 2 * * *", // Daily at 2 AM
        MaxRetries: 3,
        Timeout:    time.Hour,
    }
}

// Setup
scheduler := cron.NewScheduler()
scheduler.Start(context.Background())

// Call before Start/Initialize.
registry.SetCronRegister(func(opts command.HandlerConfig, handler any) error {
    _, err := scheduler.AddHandler(opts, handler)
    return err
})

registry.RegisterCommand(syncCmd)
registry.Start(context.Background())

// Get CLI options for Kong integration
cliOptions, _ := registry.GetCLIOptions()
```

#### Registry Resolvers

Resolvers run during registry initialization for each registered command. CLI, cron, and RPC are built-in resolvers (keys `"cli"`, `"cron"`, and `"rpc"`), and you can add more with `AddResolver`:

```go
cmdRegistry := command.NewRegistry()
queueRegistry := queuecmd.NewRegistry()

if err := cmdRegistry.AddResolver("queue", queuecmd.QueueResolver(queueRegistry)); err != nil {
    return err
}
```

If your command uses an interface message parameter, implement `command.MessageFactory` to provide a concrete value for metadata:

```go
type Event interface{ Type() string }

type EventCommand struct{}

func (c *EventCommand) Execute(ctx context.Context, msg Event) error { return nil }
func (c *EventCommand) MessageValue() any { return &UserCreated{} }
```

`MessageValue()` must return a value assignable to the interface parameter type; otherwise metadata is treated as empty and resolvers that rely on `MessageType` will skip it.

For the global registry helpers, use `registry.AddResolver` and `registry.HasResolver`.

Migration notes:

- If you switch to resolver based queue registration, you must attach the queue resolver or queue registration will not happen.
- When both resolver based and direct registration are used, the queue layer should treat duplicate registrations as noops to avoid conflicts.

See `docs/GUIDE_RESOLVERS.md` for a deeper guide.

### 3. Batch Executor

Process commands in batches with concurrency control:

```go
import "github.com/goliatone/go-command/flow"

// Create batch executor
executor := flow.NewBatchExecutor(
    &ItemProcessor{},
    flow.WithBatchSize[ProcessItemCommand](100),
    flow.WithConcurrency[ProcessItemCommand](5),
)

// Process messages in batches
messages := []ProcessItemCommand{
    {ItemID: "1"}, {ItemID: "2"}, // ... more items
}
err := executor.Execute(context.Background(), messages)

// Or use the functional approach
err = flow.ExecuteBatch(
    context.Background(),
    messages,
    processFunc,
    100, // batch size
    5,   // concurrency
)
```

The batch executor:

- Splits messages into batches of specified size
- Processes batches concurrently with configurable parallelism
- Supports error handling with optional "stop on error" behavior
- Provides detailed error metadata for debugging

### 4. Parallel Executor

Execute multiple handlers concurrently for the same message:

```go
import "github.com/goliatone/go-command/flow"

// Create parallel executor with multiple handlers
handlers := []command.Commander[NotificationEvent]{
    &EmailNotifier{},
    &SMSNotifier{},
    &PushNotifier{},
}

executor := flow.NewParallelExecutor(handlers)

// Execute all handlers in parallel
err := executor.Execute(context.Background(), NotificationEvent{
    UserID:  "user-123",
    Message: "Your order has been shipped",
})

// Or use the functional approach
err = flow.ParallelExecute(
    context.Background(),
    event,
    []command.CommandFunc[NotificationEvent]{
        sendEmail,
        sendSMS,
        sendPush,
    },
)
```

The parallel executor:

- Runs all handlers concurrently
- Supports context cancellation
- Can stop all handlers on first error (configurable)
- Collects and returns all errors

### 5. Runner with Retry Logic

The runner provides execution control with retries and timeouts:

```go
import "github.com/goliatone/go-command/runner"

handler := runner.NewHandler(
    runner.WithMaxRetries(3),
    runner.WithTimeout(30 * time.Second),
    runner.WithRetryDelay(time.Second),
    runner.WithStopOnError(true),
)

err := runner.RunCommand(ctx, handler, cmd, msg)
```

The runner supports custom retry logic through error interfaces:

- `IsRetryable() bool`: Control whether an error should trigger a retry
- `RetryDelay(attempt int) time.Duration`: Custom retry delay calculation

### 6. Cron Scheduler

Schedule commands to run periodically:

```go
import "github.com/goliatone/go-command/cron"

scheduler := cron.NewScheduler(
    cron.WithLocation(time.UTC),
    cron.WithLogLevel(cron.LogLevelInfo),
)

// Add a command to run every 5 minutes
id, err := scheduler.AddHandler(
    command.HandlerConfig{
        Expression: "*/5 * * * *",
        MaxRetries: 3,
        Timeout:    time.Minute,
    },
    func() error {
        return processBatch(context.Background())
    },
)

scheduler.Start(context.Background())
```

### 7. RPC Method Adapter

Expose methods as explicit typed RPC endpoints by implementing `rpc.EndpointsProvider`:

```go
type ApplyEventData struct {
    EntityID string `json:"entityId"`
    Event    string `json:"event"`
}

type ApplyEventEndpoint struct{}

func (c *ApplyEventEndpoint) RPCEndpoints() []rpc.EndpointDefinition {
    return []rpc.EndpointDefinition{
        rpc.NewEndpoint[ApplyEventData, map[string]any](
            rpc.EndpointSpec{
                Method:      "fsm.apply_event",
                Kind:        rpc.MethodKindQuery,
                Timeout:     5 * time.Second,
                Permissions: []string{"fsm:write"},
                Roles:       []string{"admin"},
            },
            func(ctx context.Context, req rpc.RequestEnvelope[ApplyEventData]) (rpc.ResponseEnvelope[map[string]any], error) {
                return rpc.ResponseEnvelope[map[string]any]{
                    Data: map[string]any{
                        "entityId": req.Data.EntityID,
                        "event":    req.Data.Event,
                        "actorId":  req.Meta.ActorID,
                    },
                }, nil
            },
        ),
    }
}
```

Wire the RPC server before registry initialization:

```go
import "github.com/goliatone/go-command/rpc"

rpcServer := rpc.NewServer(
    rpc.WithFailureMode(rpc.FailureModeRecover),
    rpc.WithFailureLogger(func(ev rpc.FailureEvent) {
        log.Printf("rpc failure stage=%s method=%s err=%v", ev.Stage, ev.Method, ev.Err)
    }),
)

_ = registry.AddResolver("rpc-explicit", rpc.Resolver(rpcServer))
_, _ = registry.RegisterCommand(&ApplyEventEndpoint{})
_ = registry.Start(context.Background())
```

Canonical RPC method payloads should use:

- Request: `rpc.RequestEnvelope[T]` (`data` + `meta`)
- Response: `rpc.ResponseEnvelope[T]`

Failure handling modes:

- `FailureModeReject` (default): registration errors return, invoke panics.
- `FailureModeRecover`: registration errors return, invoke panics become errors.
- `FailureModeLogAndContinue`: registration failures are skipped after logging, invoke panics return errors after logging.

Endpoint metadata returned by `Endpoint()` and `Endpoints()` is defensively copied, so caller mutations do not affect server state.

## Complete Example

Here's a comprehensive example showing multiple features:

```go
package main

import (
    "context"
    "log"
    "time"

    "github.com/goliatone/go-command"
    "github.com/goliatone/go-command/dispatcher"
    "github.com/goliatone/go-command/flow"
    "github.com/goliatone/go-command/registry"
)

// Define messages
type ProcessOrderCommand struct {
    OrderID string
    UserID  string
}

func (c ProcessOrderCommand) Type() string { return "order.process" }

type NotifyUserCommand struct {
    UserID  string
    Message string
}

func (c NotifyUserCommand) Type() string { return "user.notify" }

// Command handlers
type OrderProcessor struct {
    orderService OrderService
    logger       Logger
}

func (p *OrderProcessor) Execute(ctx context.Context, cmd ProcessOrderCommand) error {
    log.Printf("Processing order %s for user %s", cmd.OrderID, cmd.UserID)

    // Process the order
    if err := p.orderService.Process(cmd.OrderID); err != nil {
        return err
    }

    // Dispatch notification
    return dispatcher.Dispatch(ctx, NotifyUserCommand{
        UserID:  cmd.UserID,
        Message: "Your order has been processed",
    })
}

// Batch processing example
func processDailyOrders(ctx context.Context) error {
    orders := []ProcessOrderCommand{
        {OrderID: "1", UserID: "user1"},
        {OrderID: "2", UserID: "user2"},
        // ... more orders
    }

    return flow.ExecuteBatch(
        ctx,
        orders,
        func(ctx context.Context, cmd ProcessOrderCommand) error {
            return dispatcher.Dispatch(ctx, cmd)
        },
        50,  // batch size
        10,  // concurrency
    )
}

// Parallel notification example
func notifyAllChannels(ctx context.Context, userID, message string) error {
    cmd := NotifyUserCommand{UserID: userID, Message: message}

    return flow.ParallelExecute(
        ctx,
        cmd,
        []command.CommandFunc[NotifyUserCommand]{
            sendEmail,
            sendSMS,
            sendPushNotification,
        },
    )
}

func main() {
    // Register handlers
    dispatcher.SubscribeCommand(&OrderProcessor{
        orderService: &orderService{},
        logger:       &logger{},
    })

    dispatcher.SubscribeCommandFunc(func(ctx context.Context, cmd NotifyUserCommand) error {
        return notifyAllChannels(ctx, cmd.UserID, cmd.Message)
    })

    // Process an order
    err := dispatcher.Dispatch(context.Background(), ProcessOrderCommand{
        OrderID: "12345",
        UserID:  "user-789",
    })

    if err != nil {
        log.Fatal("Failed to process order:", err)
    }
}
```

## Error Handling

The package provides consistent error handling across all execution strategies:

```go
// Configure error handler
handler := runner.NewHandler(
    runner.WithErrorHandler(func(err error) {
        log.Printf("Command execution failed: %v", err)
    }),
)

// Custom retryable errors
type RetryableError struct {
    err   error
    delay time.Duration
}

func (e RetryableError) Error() string { return e.err.Error() }
func (e RetryableError) IsRetryable() bool { return true }
func (e RetryableError) RetryDelay(attempt int) time.Duration {
    return e.delay * time.Duration(attempt)
}
```

## FSM

`flow` exposes a canonical envelope contract:

- `ApplyEvent(ctx, ApplyEventRequest[T]) -> *ApplyEventResponse[T]`
  - apply request supports optional `MachineID`, `IdempotencyKey`, `Metadata`, `DryRun`
  - `DryRun` is evaluation-only: no state/outbox/orchestrator/lifecycle/idempotency-store writes
  - apply response includes `EventID`, `Version`, `IdempotencyHit`
- `Snapshot(ctx, SnapshotRequest[T]) -> *Snapshot`
  - snapshot request supports optional `MachineID`, `EvaluateGuards`, `IncludeBlocked`
  - `TransitionInfo` includes `Allowed` and structured `Rejections`
- `Execute(ctx, msg)` remains only as a compatibility wrapper.

Additional surfaces include:

- Authoring: `CompileDSL`, `MachineDefinition.ToDSL()`
- UI schema: `GenerateMachineSchema`, `GenerateMachineUISchema`
- Orchestration: mandatory execution policy (`lightweight` or `orchestrated`)
- RPC command methods: `fsm.apply_event`, `fsm.execution.pause`, `fsm.execution.resume`, `fsm.execution.stop`
- RPC query methods: `fsm.snapshot`, `fsm.execution.status`, `fsm.execution.list`, `fsm.execution.history`
  - query telemetry is additive under `query_*` keys and does not overwrite transition metadata keys
- Transport/runtime error mapping: `MapRuntimeError`, `RPCErrorForError`

See:

- `flow/README.md` for API examples.

## Testing

The package provides utilities for testing:

```go
import "github.com/goliatone/go-command/registry"

func TestCommand(t *testing.T) {
    registry.WithTestRegistry(func() {
        // Register test command
        registry.RegisterCommand(myCommand)

        // Start registry
        err := registry.Start(context.Background())
        require.NoError(t, err)

        // Test execution
        err = dispatcher.Dispatch(context.Background(), MyCommand{})
        assert.NoError(t, err)
    })
}
```

## Advanced Features

### Message Type Resolution

Messages can implement custom type resolution:

```go
func (m MyMessage) Type() string {
    return "custom.message.type"
}
```

Or rely on automatic type detection based on struct name.

### Context Propagation

All operations support context for:

- Cancellation
- Deadlines
- Value propagation
- Tracing integration

### Thread Safety

All components are designed to be thread safe and can be used concurrently.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License: see the LICENSE file for details.

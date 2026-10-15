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

## Package and documentation map

Use Go 1.23.4 or newer for the root module; nested examples declare their own
toolchain requirements. All packages below share the root Go module.

| Package | Responsibility | Guide |
| --- | --- | --- |
| Root `command` | Typed handlers, metadata/catalog/input/result contracts, exposure, immutable registrations, placement and provenance ports | Sections below; [catalog](catalog.go) |
| `dispatcher` | Isolated/local and optional routed command/query execution, execution modes and run observers | [Routed dispatch](docs/ROUTED_DISPATCH.md) |
| `registry` | Global helpers and explicit runtime-container composition, subscription/lifecycle ownership | [Resolvers](docs/GUIDE_RESOLVERS.md) |
| `router` | Message-type mux and optional rich route matching | [Matcher](router/route_matcher.go) |
| `runner`, `cron` | Handler retry/timeout controls and in-process cron scheduling | Sections below |
| `rpc` | Endpoint definitions, discovery, envelopes and invocation; no HTTP listener | [RPC implementation](rpc/rpc.go), [TS scaffold CLI](cmd/rpc-tsgen/README.md) |
| `flow` | Serial/parallel/batch/conditional/saga composition, FSM authoring/runtime and optional durable outbox orchestration | [Flow guide](flow/README.md), [FSM migration](docs/FSM_V2_MIGRATION.md) |
| `data` | Embedded RPC/FSM core browser assets | [Client guide](client/README.md) |
| `data/builder`, `data/client-builder` | Optional UI-builder asset composition | [Builder contract](docs/FSM_UI_BUILDER_CONTRACT_FREEZE.md) |

The TypeScript client workspace has four npm packages, separate from Go package
imports. Examples with `go.mod` are separate modules and are not covered by root
`go test ./...`. Hosts mount HTTP/WebSocket/static routes, enforce authorization
and supply remote transport/job-scheduler adapters. The optional SQLite FSM
store initializes its own configured state/outbox tables; there is no embedded
application migration bundle.

## Installation

```bash
go get github.com/goliatone/go-command
```

## Embedded Client Assets

The TypeScript runtime is split into four client libraries:

- RPC: `@goliatone/go-command-rpc`
- FSM core: `@goliatone/go-command-fsm`
- FSM RPC transport adapter: `@goliatone/go-command-fsm-rpc`
- FSM UI Builder: `@goliatone/go-command-fsm-ui-builder` (optional authoring UI package)

Build/sync embedded artifacts:

```bash
./taskfile client:build
```

Embedded output paths:

- `data/client/rpc/index.js`
- `data/client/fsm/index.js`
- `data/client/fsm-rpc/index.js`
- `data/client-builder/fsm-ui-builder/index.js` (builder-only path; produced by `client:build:builder` / `client:build:all`)

Go accessors:

- `data.ClientFS()` (rooted at `data/client`)
- `data.ClientRPCFS()` (rooted at `data/client/rpc`)
- `data.ClientFSMFS()` (rooted at `data/client/fsm`)
- `data.ClientFSMRPCFS()` (rooted at `data/client/fsm-rpc`)
- optional builder-only accessors live under `data/builder` so importing `data` remains core-only

Builder asset serving example (optional embed package):

```go
import (
    "io/fs"
    "net/http"

    builderdata "github.com/goliatone/go-command/data/builder"
)

func mountBuilderAssets(mux *http.ServeMux) error {
    builderFS := builderdata.ClientFSMUIBuilderFS()
    staticFS, err := fs.Sub(builderFS, ".")
    if err != nil {
        return err
    }
    mux.Handle("/builder/", http.StripPrefix("/builder/", http.FileServer(http.FS(staticFS))))
    return nil
}
```

Builder demo host (mount + `/rpc` adapters) is available at:

- `client/packages/fsm-ui-builder/demo/index.html`
- `client/packages/fsm-ui-builder/demo/main.ts`

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

### Instance-first local execution

Use an isolated runtime for explicit dependency injection and tests:

```go
package main

import (
    "context"
    "fmt"

    command "github.com/goliatone/go-command"
    "github.com/goliatone/go-command/dispatcher"
)

type CreateUser struct { Email string }
func (CreateUser) Type() string { return "user.create" }

func main() {
    runtime := dispatcher.NewRuntime()
    subscription := dispatcher.SubscribeCommandTo(runtime,
        command.CommandFunc[CreateUser](func(ctx context.Context, msg CreateUser) error {
            fmt.Println(msg.Email)
            return nil
        }),
    )
    defer subscription.Unsubscribe()
    if err := dispatcher.DispatchTo(context.Background(), runtime, CreateUser{Email: "user@example.com"}); err != nil {
        panic(err)
    }
}
```

A bare `command.Registry` collects metadata and runs configured resolvers;
registering there alone does not subscribe a handler to a dispatcher. Use
`registry.RuntimeContainer` with explicit typed subscription hooks for combined
assembly, or use the compatibility package-level registry helpers. Initialize
registrations before attaching providers, installing placement policies and
checking `RoutedReady()`. See [routed assembly](docs/ROUTED_DISPATCH.md#assembly-and-readiness).


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

Dispatcher routing defaults to exact message-type matching. Rich pattern matching is opt-in:

```go
// default is exact matching:
// registered pattern must equal msg.Type()/message id.

// opt in to rich routing behavior when needed:
_ = dispatcher.SetCommandRoutingMode(
    dispatcher.RoutingModeRich,
    dispatcher.WithRoutingMatcher(router.MakeRouteMatcher(router.MakeRouteMatcherOptions{
        Separator: ".",
    })),
    dispatcher.WithRoutingMatchStrategy(router.MatchStrategySpecificity),
)
```

`DispatchWith` enforces canonical command ids (`Type() string`) for queued/policy paths.
Inline compatibility remains unchanged for legacy reflection-derived message types.

#### Local, Hybrid, and Worker Dispatch

`dispatcher.Runtime` provides isolated local command/query muxes plus optional immutable registration, placement, and remote-dispatch generations. Existing package-level APIs remain local when unconfigured and can use a concurrency-safe installed default runtime for hybrid routing.

See [Routed Message Dispatch](docs/ROUTED_DISPATCH.md) for local-only assembly, hybrid policies, worker and authorized event ingress, command/query replies, readiness, forced-local loop protection, and the transport adapter contract.

#### Command Run Events and Progress

Register command run observers to receive lifecycle and cooperative progress events from dispatcher execution:

```go
sub := dispatcher.AddCommandRunObserver(command.CommandRunObserverFunc(
    func(ctx context.Context, ev command.CommandRunEvent) error {
        log.Printf("command=%s run=%s phase=%s current=%d total=%d",
            ev.CommandID, ev.RunID, ev.Phase, ev.Current, ev.Total)
        return nil
    },
))
defer sub.Unsubscribe()
```

Inline `dispatcher.Dispatch` and inline `dispatcher.DispatchWith` automatically emit `started` and one terminal event per handler run. Terminal phases are `succeeded`, `failed`, or `canceled`; observer errors and panics are ignored so command results are unchanged. Runner policy skips, such as exhausted `WithRunOnce(true)` or `WithMaxRuns(n)` handlers, do not emit false successful lifecycle events.

Handlers can report checkpoints and progress through context helpers:

```go
func (h *ImportUsers) Execute(ctx context.Context, msg ImportUsersCommand) error {
    command.Checkpoint(ctx, "loaded")
    for i, user := range msg.Users {
        if err := h.importOne(ctx, user); err != nil {
            return err
        }
        command.Progress(ctx, int64(i+1), int64(len(msg.Users)))
    }
    return nil
}
```

`command.Checkpoint` and `command.Progress` are noops when no progress reporter is present, so commands do not need host-specific branching.

Queued dispatch can opt into matching acceptance events:

```go
_ = dispatcher.RegisterObservedExecutor(command.ExecutionModeQueued, queueExecutor)
```

Observed executors emit `submitted` after an accepted queued receipt and `rejected` for acceptance failures. The executor can read `command.DispatchRunFromContext(ctx)` during `Execute` and persist the run ID with its queued job. Later, the worker can reuse that run context:

```go
run := storedRunContext
run.DispatchID = storedDispatchID

err := dispatcher.RunObservedCommand(ctx, run, func(runCtx context.Context) error {
    command.Checkpoint(runCtx, "dequeued")
    return runner.RunCommand(runCtx, runner.NewHandler(), cmd, msg)
})
```

Observer adapters are available for common host integrations:

```go
statsObserver := command.CommandRunStatsObserver(statsRecorder)
storeObserver := command.CommandRunStoreObserver(runStore)
safeObserver := command.SanitizingCommandRunObserver(storeObserver, func(metadata map[string]any) map[string]any {
    delete(metadata, "token")
    return metadata
})
```

Event metadata is defensively copied at context, reporting, and fan-out boundaries, but core does not inspect payloads or enforce a global redaction policy. Hosts should only attach safe metadata or use a sanitizing observer before storing, streaming, or rendering events.

Command catalog descriptors can optionally expose progress metadata by implementing `command.CommandProgressDescriber`. Commands that do not implement it omit the `progress` field.

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
- Choose one queue registration path per command (resolver-driven or direct), not both.
- Queued routing paths should treat duplicate command id registrations as explicit conflicts (no silent no-op shadowing).

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
                Kind:        rpc.MethodKindCommand,
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

Wire the RPC server before registry initialization. Endpoint-only providers use
the instance registry (`RegisterCommand(any)`); the global typed helper requires
a `Commander[T]`. Hosts enforce endpoint permissions in invoke middleware:

```go
import (
    command "github.com/goliatone/go-command"
    "github.com/goliatone/go-command/rpc"
)

rpcServer := rpc.NewServer(
    rpc.WithFailureMode(rpc.FailureModeRecover),
    rpc.WithFailureLogger(func(ev rpc.FailureEvent) {
        log.Printf("rpc failure stage=%s method=%s err=%v", ev.Stage, ev.Method, ev.Err)
    }),
)

commands := command.NewRegistry()
if err := commands.AddResolver("rpc-explicit", rpc.Resolver(rpcServer)); err != nil { return err }
if err := commands.RegisterCommand(&ApplyEventEndpoint{}); err != nil { return err }
if err := commands.Initialize(); err != nil { return err }
```

Canonical RPC method payloads should use:

- Request: `rpc.RequestEnvelope[T]` (`data` + `meta`)
- Response: `rpc.ResponseEnvelope[T]`

Failure handling modes:

- `FailureModeReject` (default): registration errors return, invoke panics.
- `FailureModeRecover`: registration errors return, invoke panics become errors.
- `FailureModeLogAndContinue`: registration failures are skipped after logging, invoke panics return errors after logging.

Endpoint metadata returned by `Endpoint()` and `Endpoints()` is defensively copied, so caller mutations do not affect server state.

Invoke middleware can be registered for auth/logging/metrics concerns:

```go
rpcServer := rpc.NewServer(
    rpc.WithMiddleware(
        func(next rpc.InvokeHandler) rpc.InvokeHandler {
            return func(ctx context.Context, req rpc.InvokeRequest) (any, error) {
                if req.Method == "fsm.apply_event" && req.Endpoint.HandlerKind == rpc.HandlerKindExecute {
                    // add auth checks or request-scoped instrumentation here
                }
                return next(ctx, req)
            }
        },
    ),
)
```

## Composing a Workflow

Keep domain behavior behind a service and expose the composed handler through
the same typed dispatcher. The host supplies the service and notification handlers:

```go
import (
    "context"

    command "github.com/goliatone/go-command"
    "github.com/goliatone/go-command/dispatcher"
    "github.com/goliatone/go-command/flow"
)

type ProcessOrder struct { OrderID, UserID string }
func (ProcessOrder) Type() string { return "order.process" }

type OrderService interface {
    Validate(context.Context, ProcessOrder) error
    Process(context.Context, ProcessOrder) error
}

func processOrder(ctx context.Context, service OrderService, msg ProcessOrder,
    notifications []command.Commander[ProcessOrder],
) error {
    workflow := flow.NewSerialExecutor([]command.Commander[ProcessOrder]{
        command.CommandFunc[ProcessOrder](service.Validate),
        command.CommandFunc[ProcessOrder](service.Process),
        flow.NewParallelExecutor(notifications),
    })
    runtime := dispatcher.NewRuntime()
    sub := dispatcher.SubscribeCommandTo(runtime, workflow)
    defer sub.Unsubscribe()
    return dispatcher.DispatchTo(ctx, runtime, msg)
}
```

Workflow sequencing alone does not provide a database transaction or durable
notification delivery. Put transactional behavior in the domain service and
choose a durable outbox/job adapter when delivery must survive process failure.

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

## Catalog and exposure contracts

`CommandDescriptor`, input/result schemas and option-source contracts let hosts
build discovery/UI adapters. `ExposableCommand.Exposure()` opts into admin/REPL
visibility; its zero value is hidden. Metadata does not execute commands or
authorize callers. Consumers must enforce permissions and preserve the trusted
actor/scope boundary. `MessageFactory.MessageValue()` supplies a concrete,
assignable message for interface-typed handlers and metadata extraction.

Run events are observation hooks. Stats/store observer adapters are best effort
and do not turn an observer failure into command failure. Use
`SanitizingCommandRunObserver` with a host disclosure policy before forwarding
metadata. [Observer implementation](progress_observers.go).

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

Runtime dispatch and its installed-default generation support concurrent use.
Assemble registries, resolvers, options and flow definitions before execution;
thread safety does not imply arbitrary mutation is safe. Application handlers,
shared message pointers, callbacks, stores and transport adapters own their
concurrency guarantees. Prefer isolated runtimes when tests run in parallel.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License: see the LICENSE file for details.

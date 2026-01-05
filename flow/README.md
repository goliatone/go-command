# Flow Package

The Flow package provides execution patterns for the go-command framework, offering flexible ways to run command handlers in different configurations.

## Key Features

- **Serial Execution**: Run handlers sequentially
- **Parallel Execution**: Run handlers concurrently
- **Batch Processing**: Process multiple messages in batches
- **Conditional Execution**: Execute handlers based on predicates
- **Chain Execution**: Sequential execution with message transformation

## Installation

```bash
go get github.com/goliatone/go-command/flow
```

## Usage Examples

### Serial Execution

Run handlers one after another:

```go
// Create handlers
inventoryHandler := &InventoryHandler{}
paymentHandler := &PaymentHandler{}
notificationHandler := &NotificationHandler{}

// Create serial executor with struct handlers
serialExecutor := flow.NewSerialExecutor(
    []command.Commander[ProcessOrderMessage]{
        inventoryHandler,
        paymentHandler,
        notificationHandler,
    },
    runner.WithTimeout(5*time.Second),
)

// Execute
if err := serialExecutor.Execute(ctx, order); err != nil {
    fmt.Printf("Serial execution failed: %v\n", err)
}

// Alternative using functions
err := flow.SerialExecute(
    ctx,
    order,
    []command.CommandFunc[ProcessOrderMessage]{
        logOrderHandler,
        func(ctx context.Context, msg ProcessOrderMessage) error {
            fmt.Printf("Processing order %s inline\n", msg.OrderID)
            return nil
        },
    },
)
```

### Parallel Execution

Run handlers concurrently:

```go
// Create parallel executor
parallelExecutor := flow.NewParallelExecutor(
    []command.Commander[ProcessOrderMessage]{
        inventoryHandler,
        paymentHandler,
        notificationHandler,
    },
    runner.WithTimeout(5*time.Second),
)

if err := parallelExecutor.Execute(ctx, order); err != nil {
    fmt.Printf("Parallel execution failed: %v\n", err)
}
```

### Batch Processing

Process messages in batches with a single handler:

```go
// Create multiple orders
orders := []ProcessOrderMessage{
    {OrderID: "ORD-1001", CustomerID: "C1", Items: []string{"Item1"}, TotalAmount: 10.99},
    {OrderID: "ORD-1002", CustomerID: "C2", Items: []string{"Item2"}, TotalAmount: 20.99},
    // ...more orders
}

// Create batch executor
batchExecutor := flow.NewBatchExecutor(
    logOrderHandler,
    flow.WithBatchSize[ProcessOrderMessage](2),
    flow.WithConcurrency[ProcessOrderMessage](2),
)

if err := batchExecutor.Execute(ctx, orders); err != nil {
    fmt.Printf("Batch execution failed: %v\n", err)
}
```

### Conditional Execution

Execute handlers based on conditions:

```go
// Create conditional executor
conditionalExecutor := flow.NewConditionalExecutor(
    []flow.Conditional[ProcessOrderMessage]{
        {
            Predicate: func(msg ProcessOrderMessage) bool {
                return msg.TotalAmount > 1000.0
            },
            Handler: func(ctx context.Context, msg ProcessOrderMessage) error {
                fmt.Println("High-value order, need manager approval")
                return nil
            },
        },
        {
            Predicate: func(msg ProcessOrderMessage) bool {
                return msg.TotalAmount <= 1000.0
            },
            Handler: func(ctx context.Context, msg ProcessOrderMessage) error {
                fmt.Println("Standard order processing")
                return nil
            },
        },
    },
)

conditionalExecutor.Execute(ctx, order)
```

### Chain Execution

Execute handlers sequentially with message transformation:

```go
// Create chain executor
chainExecutor := flow.NewChainExecutor(
    // Transform message after first handler
    func(msg ProcessOrderMessage) ProcessOrderMessage {
        msg.Status = "INVENTORY_CHECKED"
        return msg
    },
    // Transform message after second handler
    func(msg ProcessOrderMessage) ProcessOrderMessage {
        msg.Status = "PAYMENT_PROCESSED"
        return msg
    },
)

chainExecutor.Execute(ctx, order)
```

### Combined Execution

Combine different execution patterns:

```go
// Parallel inventory check
parallelInventory := flow.NewParallelExecutor(
    []command.Commander[ProcessOrderMessage]{
        &InventoryHandler{Name: "Inventory-US"},
        &InventoryHandler{Name: "Inventory-EU"},
    },
)

// Serial payment and notification
serialNotifyPay := flow.NewSerialExecutor(
    []command.Commander[ProcessOrderMessage]{
        paymentHandler,
        notificationHandler,
    },
)

// Combine them
combinedExecutor := flow.NewSerialExecutor(
    []command.Commander[ProcessOrderMessage]{
        parallelInventory,
        serialNotifyPay,
    },
)

combinedExecutor.Execute(ctx, order)
```

## Configuration Options

### Runner Options

All executors accept runner options for configuration:

```go
executor := flow.NewSerialExecutor(
    handlers,
    runner.WithTimeout(5*time.Second),
    runner.WithMaxRetries(3),
    runner.WithExitOnError(true),
    runner.WithLogger(customLogger),
)
```

### Batch Executor Options

Batch executors have additional configuration options:

```go
batchExecutor := flow.NewBatchExecutor(
    handler,
    flow.WithBatchSize[MyMessage](100),   // Process 100 messages per batch
    flow.WithConcurrency[MyMessage](5),   // Run 5 batches concurrently
)
```

## Error Handling

All executors provide consistent error handling:

- **Serial Executor**: Returns on first error or aggregates all errors
- **Parallel Executor**: Aggregates all errors from concurrent handlers
- **Batch Executor**: Aggregates errors from batch processing
- **Conditional Executor**: Returns error from matched handler
- **Chain Executor**: Returns error from any handler in the chain

Configure error behavior with `runner.WithExitOnError`:

```go
// Stop on first error
executor := flow.NewSerialExecutor(
    handlers,
    runner.WithExitOnError(true),
)

// Continue on error (aggregate all errors)
executor := flow.NewSerialExecutor(
    handlers,
    runner.WithExitOnError(false),
)
```

## Design Benefits

- **Composable**: Mix and match execution patterns
- **Type-safe**: Leverages Go generics for type safety
- **Flexible**: Configure timeouts, retries, and error handling
- **Consistent**: Same error handling and context propagation across patterns
- **Extensible**: Easy to add new execution patterns

## Configuration (JSON/YAML)

Flows can be defined in config files and built via `flow/config_loader.go`. Example:

```yaml
version: 1
flows:
  - id: order_pipeline
    type: serial
    serial:
      steps: ["inventory", "payment", "notify"]
    options:
      timeout: 5s
      max_retries: 2
      exit_on_error: true
```

Registries (handlers, guards, actions, metrics recorders) resolve the IDs referenced in config. Namespacing helpers avoid ID collisions (`namespace::id`).

## State Machine Usage

Define states, transitions, guards, and actions, with pluggable state stores (in-memory, sqlite, redis). You must provide either a stored state or a `CurrentState` extractor; otherwise the state machine errors to prevent silent resets (use `WithInitialFallback(true)` to allow reset-to-initial):

```go
smCfg := flow.StateMachineConfig{
  Entity: "order",
  States: []flow.StateConfig{{Name: "draft", Initial: true}, {Name: "approved"}},
  Transitions: []flow.TransitionConfig{
    {Name: "approve", From: "draft", To: "approved", Guard: "is_admin", Action: "audit"},
  },
}
guards := flow.NewGuardRegistry[OrderMsg]()
guards.Register("is_admin", func(m OrderMsg) bool { return m.Admin })
actions := flow.NewActionRegistry[OrderMsg]()
actions.Register("audit", func(ctx context.Context, m OrderMsg) error { return nil })
store := flow.NewInMemoryStateStore()
req := flow.TransitionRequest[OrderMsg]{
  StateKey:     func(m OrderMsg) string { return m.ID },
  Event:        func(m OrderMsg) string { return m.Event },
  CurrentState: func(m OrderMsg) string { return m.State }, // fallback when store has no entry
}
sm, _ := flow.NewStateMachine(smCfg, store, req, guards, actions)
```

Helper: `flow.TransitionRequestFromState(idFn, stateFn, eventFn)` builds a request using ID/current state/event to reduce boilerplate. Option `flow.WithInitialFallback(true)` re-enables the legacy behavior of falling back to the initial state when both store and CurrentState are empty.

## Metrics/Tracing Decorators

Use `MetricsDecorator` to wrap any `Flow[T]` with metrics; provide a recorder implementation and optionally register it in `MetricsRecorderRegistry` for config-driven wiring. CircuitBreaker supports half-open probes; RetryableFlow wraps any `Flow[T]` with a retry strategy.

## Hybrid Handler/Mux Usage

Flows accept explicit handlers; a mux resolver adapter is available for registry-driven dispatch. Compose nested flows by converting them to `command.Commander[T]` via `flow.AsCommander`. Use the namespacing helpers and registries to prevent ID conflicts across modules.

## Registry Resolver Notes

The mux resolver relies on go-command registry metadata. If your command uses an
interface message parameter, implement `command.MessageFactory` to provide a concrete,
non-nil message value, otherwise resolver based registration treats the command as
unsupported and skips metadata driven integrations.

## Legacy Dispatcher Helpers

`chain_dispatcher.go` and `parallel_dispatcher.go` are legacy wrappers over the global dispatcher; the recommended approach is to use the flow executors with handler/mux resolvers.

## Configuration (JSON/YAML)

Flows can be defined in config files and built via `flow/config_loader.go`. Example:

```yaml
version: 1
flows:
  - id: order_pipeline
    type: serial
    serial:
      steps: ["inventory", "payment", "notify"]
    options:
      timeout: 5s
      max_retries: 2
      exit_on_error: true
```

Registries (handlers, guards, actions, metrics recorders) are used to resolve the IDs referenced in config.

## State Machine Usage

Define states, transitions, guards, and actions, with pluggable state stores (in-memory, sqlite, redis):

```go
smCfg := flow.StateMachineConfig{
  Entity: "order",
  States: []flow.StateConfig{{Name: "draft", Initial: true}, {Name: "approved"}},
  Transitions: []flow.TransitionConfig{{Name: "approve", From: "draft", To: "approved", Guard: "is_admin"}},
}
guards := flow.NewGuardRegistry[OrderMsg]()
guards.Register("is_admin", func(m OrderMsg) bool { return m.Admin })
store := flow.NewInMemoryStateStore()
req := flow.TransitionRequest[OrderMsg]{StateKey: func(m OrderMsg) string { return m.ID }, Event: func(m OrderMsg) string { return m.Event }}
sm, _ := flow.NewStateMachine(smCfg, store, req, guards, nil)
```

## Metrics/Tracing Decorators

Use `MetricsDecorator` to wrap any `Flow[T]` with metrics, provide a recorder implementation and optionally register it in `MetricsRecorderRegistry` for config-driven wiring.

## Hybrid Handler/Mux Usage

Flows accept explicit handlers; a mux resolver adapter is available for registry driven dispatch. Compose nested flows by converting them to `command.Commander[T]` via `flow.AsCommander`. Namespacing helpers avoid ID conflicts when registering handlers/guards/actions/recorders.

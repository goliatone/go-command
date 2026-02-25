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

## FSM v2 Quickstart

The canonical FSM runtime API is envelope-based:

- `ApplyEvent(ctx, ApplyEventRequest[T]) -> *ApplyEventResponse[T]`
- `Snapshot(ctx, SnapshotRequest[T]) -> *Snapshot`
- `Execute(ctx, msg)` is retained only as a compatibility wrapper.

```go
cfg := flow.StateMachineConfig{
  Entity:          "order",
  ExecutionPolicy: flow.ExecutionPolicyLightweight, // or flow.ExecutionPolicyOrchestrated
  States: []flow.StateConfig{
    {Name: "draft", Initial: true},
    {Name: "approved"},
  },
  Transitions: []flow.TransitionConfig{
    {Name: "approve", From: "draft", To: "approved", Action: "audit"},
  },
}

req := flow.TransitionRequest[OrderMsg]{
  StateKey:     func(m OrderMsg) string { return m.ID },
  Event:        func(m OrderMsg) string { return m.Event },
}

actions := flow.NewActionRegistry[OrderMsg]()
_ = actions.Register("audit", func(ctx context.Context, m OrderMsg) error { return nil })

def := cfg.ToMachineDefinition()
store := flow.NewInMemoryStateStore()
_, _ = store.SaveIfVersion(context.Background(), &flow.StateRecord{
  EntityID:       "order-1",
  State:          "draft",
  MachineID:      def.ID,
  MachineVersion: def.Version,
}, 0)
sm, _ := flow.NewStateMachineFromDefinition(
  def,
  store,
  req,
  flow.NewResolverMap[OrderMsg](),
  actions,
  flow.WithExecutionPolicy[OrderMsg](cfg.ExecutionPolicy),
)

res, err := sm.ApplyEvent(context.Background(), flow.ApplyEventRequest[OrderMsg]{
  MachineID: "order",
  EntityID: "order-1",
  Event:    "approve",
  Msg:      OrderMsg{ID: "order-1", Event: "approve"},
  ExecCtx:  flow.ExecutionContext{ActorID: "user-1", Roles: []string{"admin"}, Tenant: "acme"},
  IdempotencyKey: "approve-order-1-v1", // optional
  Metadata: map[string]any{
    "request_id": "req-123",
  },
  DryRun: false, // optional
})
if err != nil {
  // handle runtime category: ErrInvalidTransition / ErrGuardRejected / ErrVersionConflict /
  // ErrIdempotencyConflict / ErrOrchestrationDegraded / ...
}
_ = res.EventID
_ = res.Version
_ = res.Transition
_ = res.Snapshot
_ = res.Execution // nil for lightweight; set for orchestrated policy
_ = res.IdempotencyHit
```

When `DryRun` is true, apply remains evaluation-only and skips state/outbox/orchestrator/lifecycle/idempotency-store writes.

Snapshot includes target metadata for static and dynamic transitions:

```go
snap, err := sm.Snapshot(context.Background(), flow.SnapshotRequest[OrderMsg]{
  MachineID: "order",
  EntityID: "order-1",
  Msg:      OrderMsg{ID: "order-1", State: "draft"},
  ExecCtx:  flow.ExecutionContext{ActorID: "user-1"},
  EvaluateGuards: true,
  IncludeBlocked: true,
})
if err != nil {
  // handle error
}
for _, tr := range snap.AllowedTransitions {
  // tr.Allowed indicates whether guards pass for provided msg/execCtx.
  // tr.Rejections contains structured guard rejection details when blocked.
  // tr.Target.Kind => "static" | "dynamic"
  // tr.Target.To / tr.Target.Resolver / tr.Target.Resolved / tr.Target.ResolvedTo / tr.Target.Candidates
}
```

## DSL and UI Schema

```go
def, err := flow.CompileDSL(`
machine onboarding version v2 {
    initial draft
    state draft
    state approved

    transition approve {
        from draft
        to approved
        step order.audit
    }
}`)
if err != nil {
  // dsl validation diagnostics
}

catalog := &flow.EditorCatalog{
  Steps: []flow.CatalogItem{{ID: "order.audit", Label: "order.audit"}},
}
schema, diags := flow.GenerateMachineSchema(def, catalog, nil)
ui := flow.GenerateMachineUISchema(schema)
_ = diags
_ = ui
```

## Orchestrator and RPC Surface

- Execution policy is mandatory: `lightweight` or `orchestrated`.
- Orchestrated mode exposes execution control:
  - `ExecutionStatus(ctx, executionID)`
  - `PauseExecution(ctx, executionID)`
  - `ResumeExecution(ctx, executionID)`
  - `StopExecution(ctx, executionID)`
- Durable orchestrator owns outbox-to-scheduler progression and exposes dispatcher runtime controls:
  - `Run(ctx)` for continuous claim/enqueue/ack processing
  - `RunOnce(ctx)` for one managed dispatch cycle
  - `StopDispatcher(ctx)` for graceful runner shutdown
  - `DispatcherStatus()` and `DispatcherHealth(ctx)` for runtime visibility
  - dead-letter inspection via `DeadLetters(ctx, DeadLetterScope{...})`
  - dispatch outcomes: `completed`, `retry_scheduled`, `dead_lettered`
- RPC command methods:
  - `fsm.apply_event`
  - `fsm.execution.pause`
  - `fsm.execution.resume`
  - `fsm.execution.stop`
- RPC query methods:
  - `fsm.snapshot`
  - `fsm.execution.status`
  - `fsm.execution.list`
  - `fsm.execution.history`
- Execution query responses add request telemetry using `query_*` keys (for example, `query_request_id`) and keep transition metadata keys immutable.
- Execution control/status requests support scope fields: `machineId`, `entityId`, `executionId`, `tenant`.

```go
registry := command.NewRegistry()
server := rpc.NewServer(rpc.WithFailureMode(rpc.FailureModeRecover))
_ = registry.AddResolver("rpc-explicit", rpc.Resolver(server))
_ = flow.RegisterFSMRPCCommands(registry, sm)
_ = registry.Initialize()
```

Transport helpers map runtime categories to protocol status surfaces:

```go
mapped := flow.MapRuntimeError(err) // HTTP/gRPC/RPC mapping
rpcErr := flow.RPCErrorForError(err)
_ = mapped
_ = rpcErr
```

See migration guidance: `docs/FSM_V2_MIGRATION.md`.

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

Define states, transitions, guards, and actions, with pluggable state stores (in-memory, sqlite, redis). State must be explicitly persisted before transition application.

```go
smCfg := flow.StateMachineConfig{
  Entity:          "order",
  ExecutionPolicy: flow.ExecutionPolicyLightweight,
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
}
def := smCfg.ToMachineDefinition()
resolvers := flow.NewResolverMap[OrderMsg]()
guard, _ := guards.Lookup("is_admin")
resolvers.RegisterGuard("is_admin", guard)
sm, _ := flow.NewStateMachineFromDefinition(
  def,
  store,
  req,
  resolvers,
  actions,
  flow.WithExecutionPolicy[OrderMsg](smCfg.ExecutionPolicy),
)
_, _ = store.SaveIfVersion(ctx, &flow.StateRecord{
  EntityID:       order.ID,
  State:          "draft",
  MachineID:      def.ID,
  MachineVersion: def.Version,
}, 0)
result, err := sm.ApplyEvent(ctx, flow.ApplyEventRequest[OrderMsg]{
  EntityID: order.ID,
  Event:    "approve",
  Msg:      order,
})
if err != nil {
  // handle transition error
}
_ = result
```
`StateMachine` also implements `Execute(ctx, msg) error` for `command.Commander[T]` compatibility.

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
  Entity:          "order",
  ExecutionPolicy: flow.ExecutionPolicyLightweight,
  States: []flow.StateConfig{{Name: "draft", Initial: true}, {Name: "approved"}},
  Transitions: []flow.TransitionConfig{{Name: "approve", From: "draft", To: "approved", Guard: "is_admin"}},
}
guards := flow.NewGuardRegistry[OrderMsg]()
guards.Register("is_admin", func(m OrderMsg) bool { return m.Admin })
store := flow.NewInMemoryStateStore()
req := flow.TransitionRequest[OrderMsg]{StateKey: func(m OrderMsg) string { return m.ID }, Event: func(m OrderMsg) string { return m.Event }}
def := smCfg.ToMachineDefinition()
resolvers := flow.NewResolverMap[OrderMsg]()
guard, _ := guards.Lookup("is_admin")
resolvers.RegisterGuard("is_admin", guard)
sm, _ := flow.NewStateMachineFromDefinition(def, store, req, resolvers, nil, flow.WithExecutionPolicy[OrderMsg](smCfg.ExecutionPolicy))
_, _ = store.SaveIfVersion(ctx, &flow.StateRecord{
  EntityID:       order.ID,
  State:          "draft",
  MachineID:      def.ID,
  MachineVersion: def.Version,
}, 0)
result, err := sm.ApplyEvent(ctx, flow.ApplyEventRequest[OrderMsg]{
  EntityID: order.ID,
  Event:    "approve",
  Msg:      order,
})
if err != nil {
  // handle transition error
}
_ = result
```

## Metrics/Tracing Decorators

Use `MetricsDecorator` to wrap any `Flow[T]` with metrics, provide a recorder implementation and optionally register it in `MetricsRecorderRegistry` for config-driven wiring.

## Hybrid Handler/Mux Usage

Flows accept explicit handlers; a mux resolver adapter is available for registry driven dispatch. Compose nested flows by converting them to `command.Commander[T]` via `flow.AsCommander`. Namespacing helpers avoid ID conflicts when registering handlers/guards/actions/recorders.

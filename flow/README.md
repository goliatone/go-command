# Flow Package

The Flow package provides execution patterns for the go-command framework, offering flexible ways to run command handlers in different configurations.

## Key Features

- **Serial Execution**: Run handlers sequentially
- **Parallel Execution**: Run handlers concurrently
- **Batch Processing**: Process multiple messages in batches
- **Conditional Execution**: Execute handlers based on predicates
- **Composition**: Combine flows or wrap a typed command to transform messages
- **FSM and authoring**: Versioned transitions, guard/action registries and schemas
- **Durable orchestration**: Explicit state/outbox stores and host scheduler ports

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
package main

import (
    "context"
    "fmt"

    "github.com/goliatone/go-command/flow"
)

type OrderMsg struct { ID, Event, State string; Admin bool }
func (OrderMsg) Type() string { return "order.event" }

func approveOrder(ctx context.Context) (*flow.ApplyEventResponse[OrderMsg], error) {
    cfg := flow.StateMachineConfig{
        Entity: "order",
        ExecutionPolicy: flow.ExecutionPolicyLightweight,
        States: []flow.StateConfig{{Name: "draft", Initial: true}, {Name: "approved"}},
        Transitions: []flow.TransitionConfig{{Name: "approve", From: "draft", To: "approved", Action: "audit"}},
    }
    req := flow.TransitionRequest[OrderMsg]{
        StateKey: func(m OrderMsg) string { return m.ID },
        Event: func(m OrderMsg) string { return m.Event },
    }
    actions := flow.NewActionRegistry[OrderMsg]()
    if err := actions.Register("audit", func(ctx context.Context, m OrderMsg) error { return nil }); err != nil {
        return nil, err
    }
    def := cfg.ToMachineDefinition()
    store := flow.NewInMemoryStateStore()
    if _, err := store.SaveIfVersion(ctx, &flow.StateRecord{
        EntityID: "order-1", State: "draft", MachineID: def.ID, MachineVersion: def.Version,
    }, 0); err != nil { return nil, err }
    machine, err := flow.NewStateMachineFromDefinition(def, store, req,
        flow.NewResolverMap[OrderMsg](), actions,
        flow.WithExecutionPolicy[OrderMsg](cfg.ExecutionPolicy),
    )
    if err != nil { return nil, err }
    return machine.ApplyEvent(ctx, flow.ApplyEventRequest[OrderMsg]{
        MachineID: def.ID, EntityID: "order-1", Event: "approve",
        Msg: OrderMsg{ID: "order-1", Event: "approve"},
        ExecCtx: flow.ExecutionContext{ActorID: "user-1", Roles: []string{"admin"}, Tenant: "acme"},
        IdempotencyKey: "approve-order-1-v1",
    })
}

func main() {
    result, err := approveOrder(context.Background())
    if err != nil { panic(err) }
    fmt.Println(result.EventID, result.Version)
}
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
commands := command.NewRegistry()
server := rpc.NewServer(rpc.WithFailureMode(rpc.FailureModeRecover))
_ = commands.AddResolver("rpc-explicit", rpc.Resolver(server))
_ = flow.RegisterFSMRPCCommands(commands, sm)
_ = commands.Initialize()
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

### Message transformation

There is no `NewChainExecutor`. Wrap the transformation in a typed command and
then invoke the downstream handler or composed flow:

```go
transformed := command.CommandFunc[ProcessOrderMessage](func(ctx context.Context, msg ProcessOrderMessage) error {
    msg.Status = "INVENTORY_CHECKED"
    return paymentHandler.Execute(ctx, msg)
})
err := transformed.Execute(ctx, order)
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

Serial and parallel executors accept runner options directly. Batch executors
use `flow.WithRunnerOptions[T](...)`; conditional executors use their own
`ConditionalOption[T]` values:

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
- **Transformation wrapper**: Propagates the downstream handler error

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

## State stores and execution policy

The [quick start](#fsm-v2-quickstart) persists the initial state explicitly before
applying an event. In-memory, SQLite and Redis store implementations are in
[state_store.go](state_store.go). SQLite initializes its configured state/outbox
tables; hosts own database connections and broader schema migrations.

`lightweight` creates an inline orchestrator when none is supplied. `orchestrated`
requires an explicit orchestrator; selecting the policy alone does not install
workers or a durable scheduler. Supply compatible transactional state/outbox and
idempotency stores for the deployment's durability requirements. The default
idempotency store is in memory. A successful scheduler enqueue is not proof that
a downstream business action completed. See [outbox dispatch](outbox_dispatcher.go)
and the [migration guide](../docs/FSM_V2_MIGRATION.md).

## Transaction and receipt contract

`ApplyEvent` uses the following native order: load/replay receipt, load and
evaluate state, emit `attempted`, persist state and any native outbox entries in
`StateStore.RunInTransaction`, build snapshot, start orchestration, save the
receipt, emit `committed`, return. An idempotent replay returns before state
evaluation, orchestration and lifecycle emission.

The stock SQLite store commits its own state/outbox transaction before receipt
insertion. Host payload and authoritative event/provenance writes are outside
that boundary. A real SQL receipt failure can leave accepted state at revision 2,
zero receipts, and a nil error with `Execution.Status == "degraded"` and
`Execution.Metadata["idempotency_degraded"] == true`. The error code is in
`idempotency_error_code` (`FSM_IDEMPOTENCY_DEGRADED`). This legacy behavior remains
compatible; a nil error does not establish durable replay or effect completion.

| Outcome after a lost response | Same-key retry |
| --- | --- |
| Receipt persisted with the same payload fingerprint | Returns the saved event/version with `IdempotencyHit`; skips orchestration and hooks |
| Receipt persisted with a different fingerprint | `FSM_IDEMPOTENCY_CONFLICT` |
| State advanced, receipt insertion failed | Re-evaluates current state; may return `FSM_INVALID_TRANSITION`, fail an expected-version precondition, or perform another valid transition |
| Default in-memory receipt store lost on restart | No durable replay guarantee; state persistence does not restore the receipt |

The fingerprint covers message, execution context, expected state/version and
metadata, as well as machine/entity/event. Preserve those fields on retry.
Receipts capture the orchestration handle at insertion time; replay does not
refresh execution status or retry failed effects. A degraded orchestration
response can itself have a durable receipt. Committed hook errors are logged
after the receipt attempt and do not undo state or the returned response, even
with fail-closed hook configuration. Authorize each request before receipt lookup;
an idempotency key does not replace authorization. Key scope, retention and
mandatory version preconditions remain host policy.

### Bounded caller-owned transaction

Existing public interfaces suffice for an opt-in host adapter. No new strict
runtime option or Bun dependency is installed by selecting an execution policy.

1. Begin one caller-owned SQL transaction. Bind both `StateStore`/`TxStore` and
   `IdempotencyStore[T]` to that exact transaction. Every state load, CAS update,
   receipt read/insert and host write must use it. `RunInTransaction` invokes its
   callback using the same transaction; it must not commit or open another DB
   transaction. Propagate callback errors to the owner and abandon the transaction.
2. Perform host payload writes and call `ApplyEvent`. Use a non-empty idempotency
   key and explicit host preconditions. On replay, skip duplicate host writes;
   enforce receipt uniqueness and compare-and-set through SQL constraints, not
   only the runtime's per-machine in-process key lock.
3. Treat the response as provisional. Reject errors, missing responses and
   degraded/unacceptable execution outcomes before committing. Native receipt
   failures can return nil error, so checking only `err` is insufficient. The
   bounded fixture requires completed execution and zero effects.
4. Persist authoritative host event/provenance using the same transaction, once
   per accepted event. Commit once. Roll back on SQL error, callback error, panic,
   receipt failure or commit failure, and discard any provisional response. A
   connection loss during commit can leave an unknown outcome: recover through
   an authoritative receipt lookup in a fresh transaction, preserving the same
   request and key.
5. Buffer lifecycle projections locally until the outer commit succeeds. The
   native `committed` hook, logs and snapshot can occur before that commit and
   must not publish authoritative success. A postcommit best-effort projection
   can still be lost; reliable delivery needs a separately designed transactional
   intent/outbox mechanism.

This bounded contract excludes workflow actions, external effects, scheduler
enqueues, external hook writes and outbox dispatch. Guards and target resolvers
must avoid external writes. The fixture definition has no workflow nodes and
its `AppendOutbox` explicitly returns an error. Native orchestration can run
effects before the outer commit; rolling SQL back cannot undo them. Any future
outbox support must insert intents through the same transaction and dispatch
only committed rows, with separately verified retry/delivery semantics.

A reusable Bun adapter belongs in an optional `go-persistence-bun` flow adapter
subpackage, where SQL dialect, transaction ownership, schema and serialization
can be maintained together. Core flow remains storage-neutral. Host payload,
event and provenance schemas stay host-owned. The test adapter is a bounded
example, not a supported general store or a completed persistence-package change.

The independent [SQL contract fixture](transactiontest/contract_test.go) uses
disposable SQLite files and caller-owned Bun transactions. Its nested module
keeps SQL-driver/Bun dependencies out of the root module. Run both suites:

```sh
go test ./...
cd flow/transactiontest
go test -mod=readonly -count=1 ./...
go test -mod=readonly -race -count=1 ./...
# Optional audit probe: expected FAIL, preserves the unmet native guarantee.
go test -mod=readonly -tags=native_atomicity_probe -run '^TestG4NativeReceiptFailureAtomicity$' ./...
```

SQLite immediate-transaction contention and normal fresh-process restart are
covered. This does not establish PostgreSQL behavior, abrupt crash/power-loss
recovery, unknown network-commit outcomes or external effect delivery.

## Metrics/Tracing Decorators

Use `MetricsDecorator` to wrap any `Flow[T]` with metrics; provide a recorder implementation and optionally register it in `MetricsRecorderRegistry` for config-driven wiring. CircuitBreaker supports half-open probes; RetryableFlow wraps any `Flow[T]` with a retry strategy.

## Hybrid Handler/Mux Usage

Flows accept explicit handlers; a mux resolver adapter is available for registry-driven dispatch. Compose nested flows by converting them to `command.Commander[T]` via `flow.AsCommander`. Use the namespacing helpers and registries to prevent ID conflicts across modules.

## Registry Resolver Notes

The mux resolver relies on go-command registry metadata. If your command uses an
interface message parameter, implement `command.MessageFactory` to provide a concrete,
non-nil message value, otherwise resolver based registration treats the command as
unsupported and skips metadata driven integrations.

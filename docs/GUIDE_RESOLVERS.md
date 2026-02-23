# Registry Resolver Guide

This guide explains how to wire custom registry resolvers, how metadata is computed, and
what to do when your command message is an interface type.

## Resolver Lifecycle

Resolvers run during `Registry.Initialize()` for every registered command.

- Built in resolvers: `cli`, `cron`, and `rpc`
- Order: insertion order (`cli`, `cron`, `rpc`, then your custom resolvers)
- Mutations: you cannot call `AddResolver`, `RegisterCommand`, `SetCronRegister`, or `SetRPCRegister` after initialization

## Wiring a Custom Resolver (Local Registry)

```go
cmdRegistry := command.NewRegistry()
queueRegistry := queuecmd.NewRegistry()

if err := cmdRegistry.AddResolver("queue", queuecmd.QueueResolver(queueRegistry)); err != nil {
    return err
}

if err := cmdRegistry.RegisterCommand(&SyncDataCommand{}); err != nil {
    return err
}

if err := cmdRegistry.Initialize(); err != nil {
    return err
}
```

## Wiring a Custom Resolver (Global Registry)

```go
queueRegistry := queuecmd.NewRegistry()

if err := registry.AddResolver("queue", queuecmd.QueueResolver(queueRegistry)); err != nil {
    return err
}

if _, err := registry.RegisterCommand(&SyncDataCommand{}); err != nil {
    return err
}

if err := registry.Start(context.Background()); err != nil {
    return err
}
```

## REPL Exposure Metadata (go-admin)

Commands can opt in to REPL exposure by implementing `command.ExposableCommand`
and returning `ExposeInAdmin=true`. This metadata is collected via a resolver
during `Registry.Initialize()` and does not change command registration.

```go
type CacheWarmCommand struct{}

func (c *CacheWarmCommand) Execute(ctx context.Context, msg *CacheWarmMessage) error {
    return nil
}

func (c *CacheWarmCommand) CLIHandler() any { return c }
func (c *CacheWarmCommand) CLIOptions() command.CLIConfig {
    return command.CLIConfig{
        Path:        []string{"cache", "warm"},
        Description: "Warm cache entries",
    }
}

func (c *CacheWarmCommand) Exposure() command.CommandExposure {
    return command.CommandExposure{
        ExposeInAdmin: true,
        Tags:          []string{"ops", "cache"},
        Mutates:       true,
        Permissions:   []string{"admin.exec"},
    }
}
```

Resolver example for discovery:

```go
exposureStore := newExposureStore()

if err := registry.AddResolver("exposure", func(cmd any, meta command.CommandMeta, r *command.Registry) error {
    if _, ok := cmd.(command.CLICommand); !ok {
        return nil
    }
    exposure, ok := command.ExposureOf(cmd)
    if !ok || !exposure.ExposeInAdmin {
        return nil
    }
    exposureStore.Add(meta, exposure)
    return nil
}); err != nil {
    return err
}
```

Exposure defaults:

- `Mutates=false` means read-only.
- If `Permissions` is empty, consumers should derive permissions from `Mutates`
  (read-only vs execute). If `Permissions` is set, enforce them explicitly.

## RPC Resolver and Transport Hook

RPC registration is built in and runs through `SetRPCRegister(...)`.
Commands opt in by implementing `command.RPCCommand`.

```go
rpcServer := rpc.NewServer(
    rpc.WithFailureMode(rpc.FailureModeRecover),
    rpc.WithFailureLogger(func(ev rpc.FailureEvent) {
        log.Printf("rpc failure stage=%s method=%s err=%v", ev.Stage, ev.Method, ev.Err)
    }),
)

cmdRegistry := command.NewRegistry()
cmdRegistry.SetRPCRegister(rpcServer.Register)
```

Required handler signatures are strict:

- Execute-style: `Execute(ctx, msg) error`
- Query-style: `Query(ctx, msg) (result, error)`
- Function handlers must use the same signatures.

If signatures are invalid, registration fails (or is handled by your configured
failure mode).

Failure mode summary:

- `FailureModeReject` (default): return registration errors; invoke panic re-panics.
- `FailureModeRecover`: return registration errors; convert invoke panic to error.
- `FailureModeLogAndContinue`: skip registration failure after logging; invoke panic returns `(nil, nil)` after logging.

## Message Metadata and MessageFactory

`MessageTypeForCommand` uses the command signature to produce `CommandMeta`. For value
and pointer messages, it reflects the type and builds a not nil sample value.

Interface message parameters cannot be instantiated via reflection. Implement
`command.MessageFactory` to provide a concrete value:

```go
type Event interface {
    Type() string
}

type UserCreated struct {
    ID string
}

func (u UserCreated) Type() string { return "user.created" }

type EventCommand struct{}

func (c *EventCommand) Execute(ctx context.Context, msg Event) error {
    return nil
}

func (c *EventCommand) MessageValue() any {
    return UserCreated{}
}
```

If `MessageValue()` returns `nil` or produces `"unknown_type"`, metadata is treated as
empty and resolvers that depend on `MessageType` should skip registration. The returned
value must also implement the interface parameter type; otherwise metadata is treated as
empty.

`command.GetMessageType` prefers `Type()` when available. For nil pointers, it creates
a zero-value instance and calls `Type()` on that. `Type()` must be stable and not depend
on runtime fields; otherwise pointer registrations may not match runtime messages.

## Migration Notes

- Existing CLI/Cron behavior stays the same.
- If you adopt a queue resolver, you must attach it to the registry, otherwise queue
  registration will not happen.
- When both resolver based registration and direct registration are used, the queue
  layer should treat duplicates as noops to avoid registration conflicts.

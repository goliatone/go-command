# Registry Resolver Guide

This guide explains how to wire custom registry resolvers, how metadata is computed, and
what to do when your command message is an interface type.

## Resolver Lifecycle

Resolvers run during `Registry.Initialize()` for every registered command.

- Built in resolvers: `cli` and `cron`
- Order: insertion order (`cli`, `cron`, then your custom resolvers)
- Mutations: you cannot call `AddResolver`, `RegisterCommand`, or `SetCronRegister` after initialization

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

## Migration Notes

- Existing CLI/Cron behavior stays the same.
- If you adopt a queue resolver, you must attach it to the registry, otherwise queue
  registration will not happen.
- When both resolver based registration and direct registration are used, the queue
  layer should treat duplicates as noops to avoid registration conflicts.

# Go Commands

## Universal Message Handlers

This package implements a pattern for handling messages through commands and queries with type safety and flexible execution strategies.

## Core Components

### Message Interface

Messages carry data and identify their type:

```go
type Message interface {
    Type() string
    Validate() error
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

## Design Benefits

- Type-safe message handling through generics
- Consistent error handling across execution strategies
- Context propagation for cancellation and timeouts
- Clear separation between commands and queries
- Flexible execution options (retry, timeout, scheduling)
- Thread-safe operations

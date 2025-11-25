package flow

import (
	"context"

	"github.com/goliatone/go-command"
)

// FlowCommander wraps a Flow so it can be registered as a command.Commander.
type FlowCommander[T any] struct {
	flow Flow[T]
}

// Execute delegates to the underlying flow.
func (f *FlowCommander[T]) Execute(ctx context.Context, msg T) error {
	return f.flow.Execute(ctx, msg)
}

// AsCommander converts a Flow to a command.Commander.
func AsCommander[T any](flow Flow[T]) command.Commander[T] {
	return &FlowCommander[T]{flow: flow}
}

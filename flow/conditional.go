package flow

import (
	"context"
	"fmt"

	"github.com/goliatone/go-command"
)

// ConditionalExecutor enables conditional command execution based on predicates or guards.
type ConditionalExecutor[T command.Message] struct {
	branches       []Conditional[T]
	defaultHandler func(context.Context, T) error
	guards         *GuardRegistry[T]
}

type Conditional[T command.Message] struct {
	// Predicate is evaluated when provided.
	Predicate func(T) bool
	// Guard references a named guard in the registry when Predicate is nil.
	Guard   string
	Handler func(context.Context, T) error
}

// ConditionalOption customizes conditional executors.
type ConditionalOption[T command.Message] func(*ConditionalExecutor[T])

// WithGuardRegistry wires a guard registry for guard-based branches.
func WithGuardRegistry[T command.Message](registry *GuardRegistry[T]) ConditionalOption[T] {
	return func(c *ConditionalExecutor[T]) {
		c.guards = registry
	}
}

// WithDefaultHandler sets the handler executed when no branch matches.
func WithDefaultHandler[T command.Message](handler func(context.Context, T) error) ConditionalOption[T] {
	return func(c *ConditionalExecutor[T]) {
		c.defaultHandler = handler
	}
}

func NewConditionalExecutor[T command.Message](branches []Conditional[T], opts ...ConditionalOption[T]) *ConditionalExecutor[T] {
	exec := &ConditionalExecutor[T]{branches: branches}
	for _, opt := range opts {
		if opt != nil {
			opt(exec)
		}
	}
	return exec
}

func (b *ConditionalExecutor[T]) Execute(ctx context.Context, msg T) error {
	for _, branch := range b.branches {
		switch {
		case branch.Predicate != nil && branch.Predicate(msg):
			return branch.Handler(ctx, msg)
		case branch.Predicate == nil && branch.Guard != "":
			if b.guards == nil {
				return fmt.Errorf("conditional: guard registry not configured for guard %q", branch.Guard)
			}
			guardFn, ok := b.guards.Lookup(branch.Guard)
			if !ok {
				return fmt.Errorf("conditional: guard %q not found", branch.Guard)
			}
			err := guardFn(ctx, msg, ExecutionContext{})
			if err == nil {
				return branch.Handler(ctx, msg)
			}
			if !isGuardRejected(err) {
				return fmt.Errorf("conditional: guard %q failed: %w", branch.Guard, err)
			}
		}
	}
	if b.defaultHandler != nil {
		return b.defaultHandler(ctx, msg)
	}
	return nil
}

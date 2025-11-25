package flow

import (
	"context"
	"fmt"

	"github.com/goliatone/go-command"
	"github.com/goliatone/go-command/router"
)

// Flow is the common contract for all flow executors.
type Flow[T any] interface {
	Execute(ctx context.Context, msg T) error
}

// Resolver returns the handlers that should run for a given message.
type Resolver[T any] interface {
	Resolve(ctx context.Context, msg T) ([]command.Commander[T], error)
}

// HandlerResolver resolves a static list of handlers.
type HandlerResolver[T any] struct {
	handlers []command.Commander[T]
}

// NewHandlerResolver constructs a resolver backed by explicit handlers.
func NewHandlerResolver[T any](handlers ...command.Commander[T]) *HandlerResolver[T] {
	return &HandlerResolver[T]{handlers: handlers}
}

// Resolve returns the configured handlers or an error if none exist.
func (r *HandlerResolver[T]) Resolve(_ context.Context, msg T) ([]command.Commander[T], error) {
	if len(r.handlers) == 0 {
		return nil, fmt.Errorf("flow: no handlers registered for %s", command.GetMessageType(msg))
	}
	return r.handlers, nil
}

// MuxResolver resolves handlers from a router mux using the message type.
type MuxResolver[T any] struct {
	mux *router.Mux
}

// NewMuxResolver builds a resolver using the provided mux (or a new one when nil).
func NewMuxResolver[T any](mux *router.Mux) *MuxResolver[T] {
	if mux == nil {
		mux = router.NewMux()
	}
	return &MuxResolver[T]{mux: mux}
}

// Resolve looks up handlers by message type and converts them to Commanders.
func (r *MuxResolver[T]) Resolve(_ context.Context, msg T) ([]command.Commander[T], error) {
	entries := r.mux.Get(command.GetMessageType(msg))
	if len(entries) == 0 {
		return nil, fmt.Errorf("flow: no handlers registered for %s", command.GetMessageType(msg))
	}

	commanders := make([]command.Commander[T], 0, len(entries))
	for _, entry := range entries {
		if commander, ok := entry.Handler.(command.Commander[T]); ok {
			commanders = append(commanders, commander)
			continue
		}
		return nil, fmt.Errorf("flow: handler does not implement Commander for %s", command.GetMessageType(msg))
	}

	return commanders, nil
}

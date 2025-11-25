package flow

import (
	"fmt"

	"github.com/goliatone/go-command"
)

// HandlerRegistry stores named commanders.
type HandlerRegistry[T any] struct {
	handlers   map[string]command.Commander[T]
	namespacer func(string, string) string
}

// NewHandlerRegistry creates an empty registry.
func NewHandlerRegistry[T any]() *HandlerRegistry[T] {
	return &HandlerRegistry[T]{
		handlers:   make(map[string]command.Commander[T]),
		namespacer: defaultNamespace,
	}
}

// SetNamespacer customizes how IDs are namespaced.
func (r *HandlerRegistry[T]) SetNamespacer(fn func(string, string) string) {
	if fn != nil {
		r.namespacer = fn
	}
}

// Register stores a commander by id.
func (r *HandlerRegistry[T]) Register(id string, h command.Commander[T]) error {
	return r.RegisterNamespaced("", id, h)
}

// RegisterNamespaced stores a commander using a namespace + id.
func (r *HandlerRegistry[T]) RegisterNamespaced(namespace, id string, h command.Commander[T]) error {
	if id == "" || h == nil {
		return nil
	}
	if r.handlers == nil {
		r.handlers = make(map[string]command.Commander[T])
	}
	key := id
	if r.namespacer != nil {
		key = r.namespacer(namespace, id)
	}
	if _, exists := r.handlers[key]; exists {
		return fmt.Errorf("handler %s already registered", key)
	}
	r.handlers[key] = h
	return nil
}

// Lookup returns a commander by id.
func (r *HandlerRegistry[T]) Lookup(id string) (command.Commander[T], bool) {
	if r == nil {
		return nil, false
	}
	h, ok := r.handlers[id]
	return h, ok
}

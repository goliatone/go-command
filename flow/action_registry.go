package flow

import (
	"context"
	"fmt"
	"sort"
)

// ActionRegistry stores named actions executed during transitions.
type ActionRegistry[T any] struct {
	actions    map[string]func(context.Context, T) error
	namespacer func(string, string) string
}

// NewActionRegistry creates an empty registry.
func NewActionRegistry[T any]() *ActionRegistry[T] {
	return &ActionRegistry[T]{
		actions:    make(map[string]func(context.Context, T) error),
		namespacer: defaultNamespace,
	}
}

// SetNamespacer customizes how action IDs are namespaced.
func (r *ActionRegistry[T]) SetNamespacer(fn func(string, string) string) {
	if fn != nil {
		r.namespacer = fn
	}
}

// Register adds an action by name.
func (r *ActionRegistry[T]) Register(name string, action func(context.Context, T) error) error {
	return r.RegisterNamespaced("", name, action)
}

// RegisterNamespaced adds an action under namespace+name.
func (r *ActionRegistry[T]) RegisterNamespaced(namespace, name string, action func(context.Context, T) error) error {
	if name == "" || action == nil {
		return nil
	}
	if r.actions == nil {
		r.actions = make(map[string]func(context.Context, T) error)
	}
	key := name
	if r.namespacer != nil {
		key = r.namespacer(namespace, name)
	}
	if _, exists := r.actions[key]; exists {
		return fmt.Errorf("action %s already registered", key)
	}
	r.actions[key] = action
	return nil
}

// Lookup retrieves an action by name.
func (r *ActionRegistry[T]) Lookup(name string) (func(context.Context, T) error, bool) {
	if r == nil {
		return nil, false
	}
	act, ok := r.actions[name]
	return act, ok
}

// IDs returns sorted action IDs for deterministic catalog generation.
func (r *ActionRegistry[T]) IDs() []string {
	if r == nil || len(r.actions) == 0 {
		return nil
	}
	ids := make([]string, 0, len(r.actions))
	for id := range r.actions {
		ids = append(ids, id)
	}
	sort.Strings(ids)
	return ids
}

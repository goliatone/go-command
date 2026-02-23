package flow

import (
	"context"
	"fmt"
	"sort"
)

// GuardRegistry stores named guard functions.
type GuardRegistry[T any] struct {
	guards     map[string]Guard[T]
	namespacer func(string, string) string
}

// NewGuardRegistry creates an empty registry.
func NewGuardRegistry[T any]() *GuardRegistry[T] {
	return &GuardRegistry[T]{
		guards:     make(map[string]Guard[T]),
		namespacer: defaultNamespace,
	}
}

// SetNamespacer customizes how guard IDs are namespaced.
func (g *GuardRegistry[T]) SetNamespacer(fn func(string, string) string) {
	if fn != nil {
		g.namespacer = fn
	}
}

// Register stores a guard by name.
func (g *GuardRegistry[T]) Register(name string, guard func(T) bool) error {
	if guard == nil {
		return nil
	}
	return g.RegisterWithContext(name, func(_ context.Context, msg T, _ ExecutionContext) error {
		if guard(msg) {
			return nil
		}
		return cloneRuntimeError(ErrGuardRejected, "guard rejected", nil, nil)
	})
}

// RegisterWithContext stores a context-aware guard by name.
func (g *GuardRegistry[T]) RegisterWithContext(name string, guard Guard[T]) error {
	return g.RegisterWithContextNamespaced("", name, guard)
}

// RegisterNamespaced stores a guard using namespace+name.
func (g *GuardRegistry[T]) RegisterNamespaced(namespace, name string, guard func(T) bool) error {
	if guard == nil {
		return nil
	}
	return g.RegisterWithContextNamespaced(namespace, name, func(_ context.Context, msg T, _ ExecutionContext) error {
		if guard(msg) {
			return nil
		}
		return cloneRuntimeError(ErrGuardRejected, "guard rejected", nil, nil)
	})
}

// RegisterWithContextNamespaced stores a context-aware guard using namespace+name.
func (g *GuardRegistry[T]) RegisterWithContextNamespaced(namespace, name string, guard Guard[T]) error {
	if name == "" || guard == nil {
		return nil
	}
	if g.guards == nil {
		g.guards = make(map[string]Guard[T])
	}
	key := name
	if g.namespacer != nil {
		key = g.namespacer(namespace, name)
	}
	if _, exists := g.guards[key]; exists {
		return fmt.Errorf("guard %s already registered", key)
	}
	g.guards[key] = guard
	return nil
}

// Lookup retrieves a guard by name.
func (g *GuardRegistry[T]) Lookup(name string) (Guard[T], bool) {
	if g == nil {
		return nil, false
	}
	fn, ok := g.guards[name]
	return fn, ok
}

// IDs returns sorted guard IDs for deterministic catalog generation.
func (g *GuardRegistry[T]) IDs() []string {
	if g == nil || len(g.guards) == 0 {
		return nil
	}
	ids := make([]string, 0, len(g.guards))
	for id := range g.guards {
		ids = append(ids, id)
	}
	sort.Strings(ids)
	return ids
}

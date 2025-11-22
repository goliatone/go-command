package flow

import "fmt"

// GuardRegistry stores named guard functions.
type GuardRegistry[T any] struct {
	guards     map[string]func(T) bool
	namespacer func(string, string) string
}

// NewGuardRegistry creates an empty registry.
func NewGuardRegistry[T any]() *GuardRegistry[T] {
	return &GuardRegistry[T]{
		guards:     make(map[string]func(T) bool),
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
	return g.RegisterNamespaced("", name, guard)
}

// RegisterNamespaced stores a guard using namespace+name.
func (g *GuardRegistry[T]) RegisterNamespaced(namespace, name string, guard func(T) bool) error {
	if name == "" || guard == nil {
		return nil
	}
	if g.guards == nil {
		g.guards = make(map[string]func(T) bool)
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
func (g *GuardRegistry[T]) Lookup(name string) (func(T) bool, bool) {
	if g == nil {
		return nil, false
	}
	fn, ok := g.guards[name]
	return fn, ok
}

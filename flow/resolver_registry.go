package flow

import "sort"

// ResolverMap is a simple in-memory resolver registry implementation.
type ResolverMap[T any] struct {
	guards  map[string]Guard[T]
	dynamic map[string]DynamicTargetResolver[T]
}

// NewResolverMap creates an empty resolver registry.
func NewResolverMap[T any]() *ResolverMap[T] {
	return &ResolverMap[T]{
		guards:  make(map[string]Guard[T]),
		dynamic: make(map[string]DynamicTargetResolver[T]),
	}
}

// RegisterGuard stores a guard resolver.
func (r *ResolverMap[T]) RegisterGuard(ref string, guard Guard[T]) {
	if r == nil || ref == "" || guard == nil {
		return
	}
	if r.guards == nil {
		r.guards = make(map[string]Guard[T])
	}
	r.guards[ref] = guard
}

// RegisterDynamicTarget stores a dynamic target resolver.
func (r *ResolverMap[T]) RegisterDynamicTarget(ref string, resolver DynamicTargetResolver[T]) {
	if r == nil || ref == "" || resolver == nil {
		return
	}
	if r.dynamic == nil {
		r.dynamic = make(map[string]DynamicTargetResolver[T])
	}
	r.dynamic[ref] = resolver
}

// Guard resolves a guard by reference.
func (r *ResolverMap[T]) Guard(ref string) (Guard[T], bool) {
	if r == nil {
		return nil, false
	}
	g, ok := r.guards[ref]
	return g, ok
}

// DynamicTarget resolves a dynamic target resolver by reference.
func (r *ResolverMap[T]) DynamicTarget(ref string) (DynamicTargetResolver[T], bool) {
	if r == nil {
		return nil, false
	}
	fn, ok := r.dynamic[ref]
	return fn, ok
}

// GuardIDs returns sorted guard resolver identifiers.
func (r *ResolverMap[T]) GuardIDs() []string {
	if r == nil || len(r.guards) == 0 {
		return nil
	}
	ids := make([]string, 0, len(r.guards))
	for id := range r.guards {
		ids = append(ids, id)
	}
	sort.Strings(ids)
	return ids
}

// DynamicTargetIDs returns sorted dynamic target resolver identifiers.
func (r *ResolverMap[T]) DynamicTargetIDs() []string {
	if r == nil || len(r.dynamic) == 0 {
		return nil
	}
	ids := make([]string, 0, len(r.dynamic))
	for id := range r.dynamic {
		ids = append(ids, id)
	}
	sort.Strings(ids)
	return ids
}

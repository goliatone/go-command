package command

import (
	"context"
	"sync"
)

type ResultKey[T any] struct{}

// Result collector implementation from before
type Result[T any] struct {
	mu       sync.RWMutex
	value    T
	err      error
	stored   bool
	metadata map[string]any
}

func NewResult[T any]() *Result[T] {
	return &Result[T]{
		metadata: make(map[string]any),
	}
}

func (r *Result[T]) Store(value T) {
	r.mu.Lock()
	defer r.mu.Unlock()
	r.value = value
	r.stored = true
	r.err = nil
}

func (r *Result[T]) StoreError(err error) {
	r.mu.Lock()
	defer r.mu.Unlock()
	r.err = err
	r.stored = true
}

func (r *Result[T]) StoreWithMeta(value T, meta map[string]any) {
	r.mu.Lock()
	defer r.mu.Unlock()
	r.value = value
	r.stored = true
	r.err = nil
	for k, v := range meta {
		r.metadata[k] = v
	}
}

func (r *Result[T]) Load() (T, bool) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	return r.value, r.stored
}

func (r *Result[T]) Error() error {
	r.mu.RLock()
	defer r.mu.RUnlock()
	return r.err
}

func (r *Result[T]) GetMetadata(key string) (any, bool) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	val, ok := r.metadata[key]
	return val, ok
}

// Context helpers
func ContextWithResult[T any](ctx context.Context, result *Result[T]) context.Context {
	return context.WithValue(ctx, ResultKey[T]{}, result)
}

func ResultFromContext[T any](ctx context.Context) *Result[T] {
	if result, ok := ctx.Value(ResultKey[T]{}).(*Result[T]); ok {
		return result
	}
	return nil
}

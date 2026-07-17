package command

import (
	"context"
	"maps"
	"reflect"
	"sync"
)

type ResultKey[T any] struct{}

type dynamicResultKey struct{}

// DynamicResultSink is the type-reporting bridge used when a runtime receives
// a result without compile-time access to T.
type DynamicResultSink interface {
	ResultType() reflect.Type
	StoreDynamic(any) error
}

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

// ResultType reports the exact collector type, including pointer and interface
// result types.
func (r *Result[T]) ResultType() reflect.Type {
	return reflect.TypeFor[T]()
}

// StoreDynamic validates and stores an untyped value. An untyped nil is a
// present result only when T can represent nil.
func (r *Result[T]) StoreDynamic(value any) error {
	targetType := reflect.TypeFor[T]()
	if value == nil {
		if !isNilableResultType(targetType) {
			return newDynamicResultSinkTypeMismatchError(targetType, nil)
		}
		var zero T
		r.Store(zero)
		return nil
	}

	typed, ok := value.(T)
	if !ok {
		return newDynamicResultSinkTypeMismatchError(targetType, value)
	}
	r.Store(typed)
	return nil
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
	maps.Copy(r.metadata, meta)
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
	if ctx == nil {
		ctx = context.Background()
	}
	ctx = context.WithValue(ctx, dynamicResultKey{}, DynamicResultSink(result))
	return context.WithValue(ctx, ResultKey[T]{}, result)
}

func ResultFromContext[T any](ctx context.Context) *Result[T] {
	if ctx == nil {
		return nil
	}
	if result, ok := ctx.Value(ResultKey[T]{}).(*Result[T]); ok {
		return result
	}
	return nil
}

// DynamicResultSinkFromContext returns the untyped view installed by
// ContextWithResult. Typed callers should continue using ResultFromContext.
func DynamicResultSinkFromContext(ctx context.Context) (DynamicResultSink, bool) {
	if ctx == nil {
		return nil, false
	}
	sink, ok := ctx.Value(dynamicResultKey{}).(DynamicResultSink)
	if !ok || sink == nil {
		return nil, false
	}
	v := reflect.ValueOf(sink)
	if v.Kind() == reflect.Pointer && v.IsNil() {
		return nil, false
	}
	return sink, true
}

func isNilableResultType(t reflect.Type) bool {
	if t == nil {
		return false
	}
	switch t.Kind() {
	case reflect.Chan, reflect.Func, reflect.Interface, reflect.Map, reflect.Pointer, reflect.Slice:
		return true
	default:
		return false
	}
}

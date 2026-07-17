package command

import (
	"context"
	"reflect"
	"testing"

	gerrors "github.com/goliatone/go-errors"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

type dynamicResultValue struct {
	Value string
}

func TestDynamicResultSinkStoresPresentZeroValue(t *testing.T) {
	result := NewResult[int]()
	ctx := ContextWithResult(context.Background(), result)

	sink, ok := DynamicResultSinkFromContext(ctx)
	require.True(t, ok)
	assert.Equal(t, reflect.TypeFor[int](), sink.ResultType())
	require.NoError(t, sink.StoreDynamic(0))

	value, stored := result.Load()
	assert.True(t, stored)
	assert.Zero(t, value)
	assert.Same(t, result, ResultFromContext[int](ctx))
}

func TestDynamicResultSinkStoresPresentNilForNilableType(t *testing.T) {
	result := NewResult[*dynamicResultValue]()
	ctx := ContextWithResult(context.Background(), result)

	sink, ok := DynamicResultSinkFromContext(ctx)
	require.True(t, ok)
	require.NoError(t, sink.StoreDynamic(nil))

	value, stored := result.Load()
	assert.True(t, stored)
	assert.Nil(t, value)
}

func TestDynamicResultSinkRejectsIncompatibleTypeWithoutStoring(t *testing.T) {
	result := NewResult[dynamicResultValue]()
	ctx := ContextWithResult(context.Background(), result)
	sink, ok := DynamicResultSinkFromContext(ctx)
	require.True(t, ok)

	err := sink.StoreDynamic("wrong")
	var structured *gerrors.Error
	require.True(t, gerrors.As(err, &structured))
	assert.Equal(t, TextCodeDynamicResultTypeMismatch, structured.TextCode)
	_, stored := result.Load()
	assert.False(t, stored)
}

func TestDynamicResultSinkDistinguishesMissingFromPresentNil(t *testing.T) {
	result := NewResult[*dynamicResultValue]()
	ctx := ContextWithResult(context.Background(), result)
	_, stored := result.Load()
	assert.False(t, stored)

	sink, ok := DynamicResultSinkFromContext(ctx)
	require.True(t, ok)
	require.NoError(t, sink.StoreDynamic(nil))
	_, stored = result.Load()
	assert.True(t, stored)
}

func TestContextWithResultPreservesTypedCollectorBehavior(t *testing.T) {
	result := NewResult[string]()
	ctx := ContextWithResult[string](nil, result)
	typed := ResultFromContext[string](ctx)
	require.Same(t, result, typed)
	typed.Store("ok")
	value, stored := result.Load()
	assert.True(t, stored)
	assert.Equal(t, "ok", value)
	assert.Nil(t, ResultFromContext[int](ctx))
}

func TestDynamicResultSinkAbsentForNilContextAndNilCollector(t *testing.T) {
	_, ok := DynamicResultSinkFromContext(nil)
	assert.False(t, ok)

	ctx := ContextWithResult[int](context.Background(), nil)
	_, ok = DynamicResultSinkFromContext(ctx)
	assert.False(t, ok)
}

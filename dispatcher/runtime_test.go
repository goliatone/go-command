package dispatcher

import (
	"context"
	"sync/atomic"
	"testing"

	"github.com/goliatone/go-command"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

type isolatedRuntimeMessage struct{ Value string }

func (isolatedRuntimeMessage) Type() string { return "runtime.isolated" }

func TestRuntimeCommandMuxesAreIsolated(t *testing.T) {
	runtimeA := NewRuntime()
	runtimeB := NewRuntime()
	var callsA atomic.Int32
	var callsB atomic.Int32
	SubscribeCommandTo(runtimeA, command.CommandFunc[isolatedRuntimeMessage](func(context.Context, isolatedRuntimeMessage) error {
		callsA.Add(1)
		return nil
	}))
	SubscribeCommandTo(runtimeB, command.CommandFunc[isolatedRuntimeMessage](func(context.Context, isolatedRuntimeMessage) error {
		callsB.Add(1)
		return nil
	}))

	require.NoError(t, DispatchTo(context.Background(), runtimeA, isolatedRuntimeMessage{}))
	assert.Equal(t, int32(1), callsA.Load())
	assert.Equal(t, int32(0), callsB.Load())
	require.NoError(t, DispatchTo(context.Background(), runtimeB, isolatedRuntimeMessage{}))
	assert.Equal(t, int32(1), callsA.Load())
	assert.Equal(t, int32(1), callsB.Load())
}

func TestRuntimeQueryMuxesAreIsolatedAndSingleHandler(t *testing.T) {
	runtimeA := NewRuntime()
	runtimeB := NewRuntime()
	SubscribeQueryTo(runtimeA, command.QueryFunc[isolatedRuntimeMessage, string](func(context.Context, isolatedRuntimeMessage) (string, error) {
		return "a", nil
	}))
	SubscribeQueryTo(runtimeB, command.QueryFunc[isolatedRuntimeMessage, string](func(context.Context, isolatedRuntimeMessage) (string, error) {
		return "b", nil
	}))

	resultA, err := QueryTo[isolatedRuntimeMessage, string](context.Background(), runtimeA, isolatedRuntimeMessage{})
	require.NoError(t, err)
	resultB, err := QueryTo[isolatedRuntimeMessage, string](context.Background(), runtimeB, isolatedRuntimeMessage{})
	require.NoError(t, err)
	assert.Equal(t, "a", resultA)
	assert.Equal(t, "b", resultB)

	SubscribeQueryTo(runtimeA, command.QueryFunc[isolatedRuntimeMessage, string](func(context.Context, isolatedRuntimeMessage) (string, error) {
		return "second", nil
	}))
	_, err = QueryTo[isolatedRuntimeMessage, string](context.Background(), runtimeA, isolatedRuntimeMessage{})
	assert.Error(t, err)
}

func TestRuntimeUnsubscribeDoesNotAffectOtherRuntime(t *testing.T) {
	runtimeA := NewRuntime()
	runtimeB := NewRuntime()
	subA := SubscribeCommandTo(runtimeA, command.CommandFunc[isolatedRuntimeMessage](func(context.Context, isolatedRuntimeMessage) error { return nil }))
	SubscribeCommandTo(runtimeB, command.CommandFunc[isolatedRuntimeMessage](func(context.Context, isolatedRuntimeMessage) error { return nil }))
	require.NotNil(t, subA)
	subA.Unsubscribe()
	subA.Unsubscribe()

	assert.Error(t, DispatchTo(context.Background(), runtimeA, isolatedRuntimeMessage{}))
	assert.NoError(t, DispatchTo(context.Background(), runtimeB, isolatedRuntimeMessage{}))
}

func TestRuntimeTypedDispatchAcceptsNilContext(t *testing.T) {
	runtime := NewRuntime()
	SubscribeCommandTo(runtime, command.CommandFunc[isolatedRuntimeMessage](func(context.Context, isolatedRuntimeMessage) error { return nil }))
	SubscribeQueryTo(runtime, command.QueryFunc[isolatedRuntimeMessage, string](func(context.Context, isolatedRuntimeMessage) (string, error) { return "ok", nil }))
	require.NoError(t, DispatchTo(nil, runtime, isolatedRuntimeMessage{}))
	result, err := QueryTo[isolatedRuntimeMessage, string](nil, runtime, isolatedRuntimeMessage{})
	require.NoError(t, err)
	assert.Equal(t, "ok", result)
}

func TestRuntimeRejectsTypedNilRegistrationProvider(t *testing.T) {
	runtime := NewRuntime()
	var provider *command.MessageRegistrationIndex
	assert.Error(t, runtime.AttachRegistrationProvider(provider))
}

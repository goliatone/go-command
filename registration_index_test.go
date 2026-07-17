package command

import (
	"fmt"
	"reflect"
	"sync"
	"testing"

	gerrors "github.com/goliatone/go-errors"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

type testRegistration struct {
	id          string
	messageType string
	kind        HandlerKind
	requestType reflect.Type
	resultType  reflect.Type
	message     any
}

type factoryBackedRegistration struct {
	calls int
}

func (r *factoryBackedRegistration) ID() string          { return "factory-backed" }
func (r *factoryBackedRegistration) MessageType() string { return "factory.backed" }
func (r *factoryBackedRegistration) Kind() HandlerKind   { return HandlerKindCommand }
func (r *factoryBackedRegistration) RequestType() reflect.Type {
	return reflect.TypeFor[valueMessage]()
}
func (r *factoryBackedRegistration) ResultType() reflect.Type { return nil }
func (r *factoryBackedRegistration) NewMessage() any {
	r.calls++
	return &valueMessage{ID: fmt.Sprintf("factory-%d", r.calls)}
}

func (r testRegistration) ID() string                { return r.id }
func (r testRegistration) MessageType() string       { return r.messageType }
func (r testRegistration) Kind() HandlerKind         { return r.kind }
func (r testRegistration) NewMessage() any           { return r.message }
func (r testRegistration) RequestType() reflect.Type { return r.requestType }
func (r testRegistration) ResultType() reflect.Type  { return r.resultType }

func validCommandRegistration(id, messageType string) MessageRegistration {
	return testRegistration{
		id: id, messageType: messageType, kind: HandlerKindCommand,
		requestType: reflect.TypeFor[valueMessage](), message: &valueMessage{},
	}
}

func TestMessageRegistrationIndexBuildsKindQualifiedIndexes(t *testing.T) {
	commandReg := validCommandRegistration("shared", "message.command")
	queryReg := testRegistration{
		id: "shared", messageType: "message.query", kind: HandlerKindQuery,
		requestType: reflect.TypeFor[queryMessage](), resultType: reflect.TypeFor[string](), message: &queryMessage{},
	}
	index, err := NewMessageRegistrationIndex(commandReg, queryReg)
	require.NoError(t, err)

	gotCommand, ok := index.RegistrationByID(HandlerKindCommand, "shared")
	require.True(t, ok)
	assert.Equal(t, "message.command", gotCommand.MessageType())
	gotQuery, ok := index.RegistrationByID(HandlerKindQuery, "shared")
	require.True(t, ok)
	assert.Equal(t, "message.query", gotQuery.MessageType())
	_, ok = index.RegistrationByMessageType(HandlerKindCommand, "message.query")
	assert.False(t, ok)
}

func TestMessageRegistrationIndexRejectsStableIDAndMessageTypeConflicts(t *testing.T) {
	tests := []struct {
		name string
		regs []MessageRegistration
	}{
		{"stable id", []MessageRegistration{validCommandRegistration("same", "a"), validCommandRegistration("same", "b")}},
		{"message type", []MessageRegistration{validCommandRegistration("a", "same"), validCommandRegistration("b", "same")}},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			_, err := NewMessageRegistrationIndex(tt.regs...)
			var structured *gerrors.Error
			require.True(t, gerrors.As(err, &structured))
			assert.Equal(t, TextCodeRegistrationConflict, structured.TextCode)
		})
	}
}

func TestMessageRegistrationIndexCoalescesEquivalentFanoutMetadata(t *testing.T) {
	reg := validCommandRegistration("same", "same")
	index, err := NewMessageRegistrationIndex(reg, reg)
	require.NoError(t, err)
	assert.Len(t, index.Registrations(), 1)
}

func TestMessageRegistrationIndexRejectsInvalidResultAndFactoryTypes(t *testing.T) {
	tests := []MessageRegistration{
		testRegistration{id: "query", messageType: "query", kind: HandlerKindQuery, requestType: reflect.TypeFor[queryMessage](), message: &queryMessage{}},
		testRegistration{id: "factory", messageType: "factory", kind: HandlerKindCommand, requestType: reflect.TypeFor[valueMessage](), message: "wrong"},
	}
	for _, registration := range tests {
		_, err := NewMessageRegistrationIndex(registration)
		var structured *gerrors.Error
		require.True(t, gerrors.As(err, &structured))
		assert.Equal(t, TextCodeRegistrationInvalid, structured.TextCode)
	}
}

func TestMessageRegistrationIndexFailedReplacementPreservesPriorSnapshot(t *testing.T) {
	index, err := NewMessageRegistrationIndex(validCommandRegistration("original", "original"))
	require.NoError(t, err)
	err = index.Replace([]MessageRegistration{
		validCommandRegistration("conflict", "a"),
		validCommandRegistration("conflict", "b"),
	})
	require.Error(t, err)
	_, ok := index.RegistrationByID(HandlerKindCommand, "original")
	assert.True(t, ok)
	_, ok = index.RegistrationByID(HandlerKindCommand, "conflict")
	assert.False(t, ok)
}

func TestMessageRegistrationIndexReturnsCopiedSlicesAndSupportsConcurrentReads(t *testing.T) {
	index, err := NewMessageRegistrationIndex(validCommandRegistration("one", "one"))
	require.NoError(t, err)
	first := index.Registrations()
	first[0] = nil
	assert.NotNil(t, index.Registrations()[0])

	var wg sync.WaitGroup
	for n := 0; n < 32; n++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			for iteration := 0; iteration < 100; iteration++ {
				registration, ok := index.RegistrationByID(HandlerKindCommand, "one")
				assert.True(t, ok)
				assert.Equal(t, "one", registration.MessageType())
			}
		}()
	}
	wg.Wait()
}

func TestMessageRegistrationIndexPreservesValidatedFactoryBehavior(t *testing.T) {
	source := &factoryBackedRegistration{}
	index, err := NewMessageRegistrationIndex(source)
	require.NoError(t, err)
	registration, ok := index.RegistrationByID(HandlerKindCommand, source.ID())
	require.True(t, ok)

	first := registration.NewMessage().(*valueMessage)
	second := registration.NewMessage().(*valueMessage)
	assert.Equal(t, "factory-2", first.ID)
	assert.Equal(t, "factory-3", second.ID)
	assert.NotSame(t, first, second)

	var wg sync.WaitGroup
	for range 32 {
		wg.Add(1)
		go func() {
			defer wg.Done()
			assert.NotNil(t, registration.NewMessage())
		}()
	}
	wg.Wait()
}

func TestRegistryPublishesDualCapabilityRegistrationSnapshot(t *testing.T) {
	registry := NewRegistry()
	require.NoError(t, registry.RegisterCommand(&dualCommand{}))
	require.NoError(t, registry.Initialize())
	assert.Len(t, registry.Registrations(), 2)
	_, commandOK := registry.RegistrationByMessageType(HandlerKindCommand, GetMessageType(executeMessage{}))
	_, queryOK := registry.RegistrationByMessageType(HandlerKindQuery, GetMessageType(queryMessage{}))
	assert.True(t, commandOK)
	assert.True(t, queryOK)
}

func TestRegistryDoesNotPublishRegistrationsWhenInitializationFails(t *testing.T) {
	registry := NewRegistry()
	require.NoError(t, registry.RegisterCommand(describedValueCommand{}))
	require.NoError(t, registry.AddResolver("failing", func(any, CommandMeta, *Registry) error {
		return assert.AnError
	}))
	require.Error(t, registry.Initialize())
	assert.Empty(t, registry.Registrations())
	_, ok := registry.RegistrationByID(HandlerKindCommand, "stable.value")
	assert.False(t, ok)
}

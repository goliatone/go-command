package command

import (
	"context"
	"reflect"
	"sync"
	"sync/atomic"
	"testing"
	"time"

	gerrors "github.com/goliatone/go-errors"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

type valueMessage struct {
	ID string
}

type pointerMessage struct {
	ID string
}

type queryMessage struct {
	ID string
}

type executeMessage struct {
	ID string
}

type interfaceMessage interface {
	Marker()
}

type interfaceMessageImpl struct{}

func (interfaceMessageImpl) Marker() {}

type nestedInterfaceMessage struct {
	Labels map[string][]string
	Child  *nestedMessageChild
	Value  any
}

type nestedMessageChild struct {
	Values []int
}

func (*nestedInterfaceMessage) Marker() {}

type reusableFactoryCommand struct {
	template *nestedInterfaceMessage
	active   atomic.Int32
	overlaps atomic.Int32
}

func (c *reusableFactoryCommand) MessageValue() any {
	if c.active.Add(1) != 1 {
		c.overlaps.Add(1)
	}
	defer c.active.Add(-1)
	time.Sleep(time.Millisecond)
	return c.template
}

func (*reusableFactoryCommand) Execute(context.Context, interfaceMessage) error { return nil }
func (*reusableFactoryCommand) Query(context.Context, interfaceMessage) (string, error) {
	return "", nil
}

type valueCommand struct{}

func (c *valueCommand) Execute(ctx context.Context, msg valueMessage) error {
	return nil
}

type pointerCommand struct{}

func (c *pointerCommand) Execute(ctx context.Context, msg *pointerMessage) error {
	return nil
}

type dualCommand struct{}

func (c *dualCommand) Execute(ctx context.Context, msg executeMessage) error {
	return nil
}

func (c *dualCommand) Query(ctx context.Context, msg queryMessage) (string, error) {
	return "", nil
}

type interfaceCommand struct{}

func (c *interfaceCommand) Execute(ctx context.Context, msg interfaceMessage) error {
	return nil
}

func (c *interfaceCommand) MessageValue() any {
	return interfaceMessageImpl{}
}

type interfaceNoFactoryCommand struct{}

func (c *interfaceNoFactoryCommand) Execute(ctx context.Context, msg interfaceMessage) error {
	return nil
}

type interfaceBadFactoryCommand struct{}

func (c *interfaceBadFactoryCommand) Execute(ctx context.Context, msg interfaceMessage) error {
	return nil
}

func (c *interfaceBadFactoryCommand) MessageValue() any {
	return struct{}{}
}

type describedValueCommand struct{}

func (describedValueCommand) Execute(context.Context, valueMessage) error { return nil }
func (describedValueCommand) CommandDescriptor() CommandDescriptor {
	return CommandDescriptor{ID: "stable.value"}
}

func TestMessageTypeForCommandValue(t *testing.T) {
	meta := MessageTypeForCommand(&valueCommand{})

	assert.Equal(t, reflect.TypeFor[valueMessage](), meta.MessageTypeValue)
	assert.Equal(t, reflect.TypeFor[valueMessage](), reflect.TypeOf(meta.MessageValue))
	assert.Equal(t, GetMessageType(valueMessage{}), meta.MessageType)
}

func TestMessageTypeForCommandPointer(t *testing.T) {
	meta := MessageTypeForCommand(&pointerCommand{})

	assert.Equal(t, reflect.TypeFor[*pointerMessage](), meta.MessageTypeValue)
	assert.Equal(t, reflect.TypeFor[*pointerMessage](), reflect.TypeOf(meta.MessageValue))
	assert.Equal(t, GetMessageType(&pointerMessage{}), meta.MessageType)
}

func TestMessageTypeForCommandQueryPreference(t *testing.T) {
	meta := MessageTypeForCommand(&dualCommand{})

	assert.Equal(t, reflect.TypeFor[queryMessage](), meta.MessageTypeValue)
	assert.Equal(t, reflect.TypeFor[queryMessage](), reflect.TypeOf(meta.MessageValue))
	assert.Equal(t, GetMessageType(queryMessage{}), meta.MessageType)
}

func TestMessageTypeForCommandInterfaceWithFactory(t *testing.T) {
	meta := MessageTypeForCommand(&interfaceCommand{})

	assert.Equal(t, reflect.TypeFor[interfaceMessageImpl](), meta.MessageTypeValue)
	assert.Equal(t, reflect.TypeFor[interfaceMessageImpl](), reflect.TypeOf(meta.MessageValue))
	assert.Equal(t, GetMessageType(interfaceMessageImpl{}), meta.MessageType)
}

func TestMessageTypeForCommandInterfaceWithoutFactory(t *testing.T) {
	meta := MessageTypeForCommand(&interfaceNoFactoryCommand{})

	assert.Equal(t, CommandMeta{}, meta)
}

func TestMessageTypeForCommandInterfaceFactoryMismatch(t *testing.T) {
	meta := MessageTypeForCommand(&interfaceBadFactoryCommand{})

	assert.Equal(t, CommandMeta{}, meta)
}

func TestMessageRegistrationsForCommandDiscoversDualCapabilities(t *testing.T) {
	registrations, err := MessageRegistrationsForCommand(&dualCommand{})
	require.NoError(t, err)
	require.Len(t, registrations, 2)

	assert.Equal(t, HandlerKindCommand, registrations[0].Kind())
	assert.Equal(t, GetMessageType(executeMessage{}), registrations[0].ID())
	assert.Equal(t, reflect.TypeFor[executeMessage](), registrations[0].RequestType())
	assert.Nil(t, registrations[0].ResultType())
	assert.IsType(t, &executeMessage{}, registrations[0].NewMessage())

	assert.Equal(t, HandlerKindQuery, registrations[1].Kind())
	assert.Equal(t, GetMessageType(queryMessage{}), registrations[1].ID())
	assert.Equal(t, reflect.TypeFor[queryMessage](), registrations[1].RequestType())
	assert.Equal(t, reflect.TypeFor[string](), registrations[1].ResultType())
	assert.IsType(t, &queryMessage{}, registrations[1].NewMessage())
}

func TestMessageRegistrationsForCommandUsesExplicitStableID(t *testing.T) {
	registrations, err := MessageRegistrationsForCommand(describedValueCommand{})
	require.NoError(t, err)
	require.Len(t, registrations, 1)
	assert.Equal(t, "stable.value", registrations[0].ID())
	assert.Equal(t, GetMessageType(valueMessage{}), registrations[0].MessageType())
}

func TestMessageRegistrationsForCommandSupportsPointerAndInterfaceFactories(t *testing.T) {
	pointerRegs, err := MessageRegistrationsForCommand(&pointerCommand{})
	require.NoError(t, err)
	require.Len(t, pointerRegs, 1)
	assert.Equal(t, reflect.TypeFor[*pointerMessage](), pointerRegs[0].RequestType())
	assert.IsType(t, &pointerMessage{}, pointerRegs[0].NewMessage())

	interfaceRegs, err := MessageRegistrationsForCommand(&interfaceCommand{})
	require.NoError(t, err)
	require.Len(t, interfaceRegs, 1)
	assert.Equal(t, reflect.TypeFor[interfaceMessage](), interfaceRegs[0].RequestType())
	assert.IsType(t, &interfaceMessageImpl{}, interfaceRegs[0].NewMessage())
}

func TestMessageRegistrationsForCommandRejectsInvalidInterfaceFactories(t *testing.T) {
	for _, cmd := range []any{&interfaceNoFactoryCommand{}, &interfaceBadFactoryCommand{}} {
		registrations, err := MessageRegistrationsForCommand(cmd)
		assert.Nil(t, registrations)
		var structured *gerrors.Error
		require.True(t, gerrors.As(err, &structured))
		assert.Equal(t, TextCodeRegistrationInvalid, structured.TextCode)
	}
}

func TestMessageRegistrationsForCommandReturnsFreshMessages(t *testing.T) {
	registrations, err := MessageRegistrationsForCommand(&pointerCommand{})
	require.NoError(t, err)
	require.Len(t, registrations, 1)
	first := registrations[0].NewMessage().(*pointerMessage)
	second := registrations[0].NewMessage().(*pointerMessage)
	assert.NotSame(t, first, second)
}

func TestInterfaceFactoryDecodeTargetsAreDeeplyIsolated(t *testing.T) {
	template := &nestedInterfaceMessage{
		Labels: map[string][]string{"role": {"admin"}},
		Child:  &nestedMessageChild{Values: []int{1, 2}},
		Value:  map[string]any{"nested": []string{"original"}},
	}
	factory := &reusableFactoryCommand{template: template}
	registrations, err := MessageRegistrationsForCommand(factory)
	require.NoError(t, err)
	require.Len(t, registrations, 2)

	first := registrations[0].NewMessage().(*nestedInterfaceMessage)
	second := registrations[0].NewMessage().(*nestedInterfaceMessage)
	first.Labels["role"][0] = "mutated"
	first.Child.Values[0] = 99
	first.Value.(map[string]any)["nested"].([]string)[0] = "mutated"

	assert.Equal(t, "admin", second.Labels["role"][0])
	assert.Equal(t, 1, second.Child.Values[0])
	assert.Equal(t, "original", second.Value.(map[string]any)["nested"].([]string)[0])
	assert.Equal(t, "admin", template.Labels["role"][0])
	assert.Equal(t, 1, template.Child.Values[0])
	assert.Equal(t, "original", template.Value.(map[string]any)["nested"].([]string)[0])
}

func TestDualCapabilityRegistrationsSerializeSharedFactory(t *testing.T) {
	factory := &reusableFactoryCommand{template: &nestedInterfaceMessage{}}
	registrations, err := MessageRegistrationsForCommand(factory)
	require.NoError(t, err)
	require.Len(t, registrations, 2)

	var wg sync.WaitGroup
	for index := 0; index < 20; index++ {
		for _, registration := range registrations {
			wg.Add(1)
			go func(reg MessageRegistration) {
				defer wg.Done()
				require.NotNil(t, reg.NewMessage())
			}(registration)
		}
	}
	wg.Wait()
	assert.Zero(t, factory.overlaps.Load())
}

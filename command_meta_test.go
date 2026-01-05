package command

import (
	"context"
	"reflect"
	"testing"

	"github.com/stretchr/testify/assert"
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

func TestMessageTypeForCommandValue(t *testing.T) {
	meta := MessageTypeForCommand(&valueCommand{})

	assert.Equal(t, reflect.TypeOf(valueMessage{}), meta.MessageTypeValue)
	assert.Equal(t, reflect.TypeOf(valueMessage{}), reflect.TypeOf(meta.MessageValue))
	assert.Equal(t, GetMessageType(valueMessage{}), meta.MessageType)
}

func TestMessageTypeForCommandPointer(t *testing.T) {
	meta := MessageTypeForCommand(&pointerCommand{})

	assert.Equal(t, reflect.TypeOf((*pointerMessage)(nil)), meta.MessageTypeValue)
	assert.Equal(t, reflect.TypeOf((*pointerMessage)(nil)), reflect.TypeOf(meta.MessageValue))
	assert.Equal(t, GetMessageType(&pointerMessage{}), meta.MessageType)
}

func TestMessageTypeForCommandQueryPreference(t *testing.T) {
	meta := MessageTypeForCommand(&dualCommand{})

	assert.Equal(t, reflect.TypeOf(queryMessage{}), meta.MessageTypeValue)
	assert.Equal(t, reflect.TypeOf(queryMessage{}), reflect.TypeOf(meta.MessageValue))
	assert.Equal(t, GetMessageType(queryMessage{}), meta.MessageType)
}

func TestMessageTypeForCommandInterfaceWithFactory(t *testing.T) {
	meta := MessageTypeForCommand(&interfaceCommand{})

	assert.Equal(t, reflect.TypeOf(interfaceMessageImpl{}), meta.MessageTypeValue)
	assert.Equal(t, reflect.TypeOf(interfaceMessageImpl{}), reflect.TypeOf(meta.MessageValue))
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

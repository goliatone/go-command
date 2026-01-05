package command

import (
	"context"
	"reflect"
)

type CommandMeta struct {
	MessageType      string
	MessageValue     any
	MessageTypeValue reflect.Type
}

// MessageFactory provides a concrete message value for interface-based commands.
type MessageFactory interface {
	MessageValue() any
}

var (
	contextType = reflect.TypeOf((*context.Context)(nil)).Elem()
	errorType   = reflect.TypeOf((*error)(nil)).Elem()
)

func MessageTypeForCommand(cmd any) CommandMeta {
	if cmd == nil {
		return CommandMeta{}
	}

	cmdType := reflect.TypeOf(cmd)
	if cmdType == nil {
		return CommandMeta{}
	}

	if meta, ok := metaForMethod(cmd, cmdType, "Query"); ok {
		return meta
	}

	if meta, ok := metaForMethod(cmd, cmdType, "Execute"); ok {
		return meta
	}

	return CommandMeta{}
}

func metaForMethod(cmd any, cmdType reflect.Type, name string) (CommandMeta, bool) {
	method, ok := cmdType.MethodByName(name)
	if !ok {
		return CommandMeta{}, false
	}

	methodType := method.Type
	if methodType.NumIn() != 3 {
		return CommandMeta{}, false
	}

	if !methodType.In(1).Implements(contextType) {
		return CommandMeta{}, false
	}

	switch name {
	case "Execute":
		if methodType.NumOut() != 1 || !methodType.Out(0).Implements(errorType) {
			return CommandMeta{}, false
		}
	case "Query":
		if methodType.NumOut() != 2 || !methodType.Out(1).Implements(errorType) {
			return CommandMeta{}, false
		}
	}

	msgType := methodType.In(2)
	return messageMetaFromType(cmd, msgType)
}

func messageMetaFromType(cmd any, msgType reflect.Type) (CommandMeta, bool) {
	if msgType == nil {
		return CommandMeta{}, false
	}

	if isInterfaceType(msgType) {
		return messageMetaFromFactory(cmd)
	}

	msgValue := messageValueForType(msgType)
	if msgValue == nil {
		return CommandMeta{}, false
	}

	msgTypeValue := msgType
	msgTypeName := GetMessageType(msgValue)
	if msgTypeName == "" || msgTypeName == "unknown_type" {
		return CommandMeta{}, false
	}

	return CommandMeta{
		MessageType:      msgTypeName,
		MessageValue:     msgValue,
		MessageTypeValue: msgTypeValue,
	}, true
}

func messageMetaFromFactory(cmd any) (CommandMeta, bool) {
	factory, ok := cmd.(MessageFactory)
	if !ok {
		return CommandMeta{}, false
	}

	msgValue := factory.MessageValue()
	if msgValue == nil {
		return CommandMeta{}, false
	}

	msgTypeValue := reflect.TypeOf(msgValue)
	msgTypeName := GetMessageType(msgValue)
	if msgTypeName == "" || msgTypeName == "unknown_type" {
		return CommandMeta{}, false
	}

	return CommandMeta{
		MessageType:      msgTypeName,
		MessageValue:     msgValue,
		MessageTypeValue: msgTypeValue,
	}, true
}

func messageValueForType(msgType reflect.Type) any {
	if msgType == nil {
		return nil
	}

	if msgType.Kind() == reflect.Ptr {
		return reflect.New(msgType.Elem()).Interface()
	}

	return reflect.New(msgType).Elem().Interface()
}

func isInterfaceType(msgType reflect.Type) bool {
	if msgType.Kind() == reflect.Interface {
		return true
	}
	return msgType.Kind() == reflect.Ptr && msgType.Elem().Kind() == reflect.Interface
}

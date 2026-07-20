package command

import (
	"context"
	"reflect"
	"strings"
	"sync"
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
	contextType = reflect.TypeFor[context.Context]()
	errorType   = reflect.TypeFor[error]()

	// Fixed stripes avoid retaining handler instances forever while ensuring all
	// discovery and decode calls for one MessageFactory share a synchronization
	// boundary. Unrelated factories may contend on a stripe, but factory calls
	// are intentionally short and correctness takes precedence over fan-out.
	messageFactoryLocks [64]sync.Mutex
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
		return messageMetaFromFactory(cmd, msgType)
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

func messageMetaFromFactory(cmd any, msgType reflect.Type) (CommandMeta, bool) {
	factory, ok := cmd.(MessageFactory)
	if !ok {
		return CommandMeta{}, false
	}

	msgValue := messageFactoryValue(factory, false)
	if msgValue == nil {
		return CommandMeta{}, false
	}

	msgTypeValue := reflect.TypeOf(msgValue)
	if msgType != nil && !msgTypeValue.AssignableTo(msgType) {
		return CommandMeta{}, false
	}
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

	if msgType.Kind() == reflect.Pointer {
		return reflect.New(msgType.Elem()).Interface()
	}

	return reflect.New(msgType).Elem().Interface()
}

func isInterfaceType(msgType reflect.Type) bool {
	if msgType.Kind() == reflect.Interface {
		return true
	}
	return msgType.Kind() == reflect.Pointer && msgType.Elem().Kind() == reflect.Interface
}

type discoveredMessageRegistration struct {
	id             string
	messageType    string
	kind           HandlerKind
	requestType    reflect.Type
	resultType     reflect.Type
	newMessageType reflect.Type
	newMessage     func() any
	factoryMu      sync.Mutex
}

func (r *discoveredMessageRegistration) ID() string {
	if r == nil {
		return ""
	}
	return r.id
}

func (r *discoveredMessageRegistration) MessageType() string {
	if r == nil {
		return ""
	}
	return r.messageType
}

func (r *discoveredMessageRegistration) Kind() HandlerKind {
	if r == nil {
		return ""
	}
	return r.kind
}

func (r *discoveredMessageRegistration) NewMessage() any {
	if r == nil || r.newMessageType == nil || r.newMessage == nil {
		return nil
	}
	r.factoryMu.Lock()
	defer r.factoryMu.Unlock()
	message := r.newMessage()
	if message == nil || reflect.TypeOf(message) != r.newMessageType {
		return nil
	}
	return message
}

func (r *discoveredMessageRegistration) RequestType() reflect.Type {
	if r == nil {
		return nil
	}
	return r.requestType
}

func (r *discoveredMessageRegistration) ResultType() reflect.Type {
	if r == nil {
		return nil
	}
	return r.resultType
}

// MessageRegistrationsForCommand discovers command and query capabilities
// independently. The legacy MessageTypeForCommand helper intentionally remains
// query-first for source compatibility.
func MessageRegistrationsForCommand(cmd any) ([]MessageRegistration, error) {
	if cmd == nil {
		return nil, NewRegistrationInvalidError("command cannot be nil", nil)
	}
	cmdType := reflect.TypeOf(cmd)
	if cmdType == nil {
		return nil, NewRegistrationInvalidError("command type cannot be nil", nil)
	}

	registrations := make([]MessageRegistration, 0, 2)
	for _, capability := range []struct {
		method string
		kind   HandlerKind
	}{
		{method: "Execute", kind: HandlerKindCommand},
		{method: "Query", kind: HandlerKindQuery},
	} {
		registration, found, err := registrationForMethod(cmd, cmdType, capability.method, capability.kind)
		if err != nil {
			return nil, err
		}
		if found {
			registrations = append(registrations, registration)
		}
	}
	return registrations, nil
}

func registrationForMethod(cmd any, cmdType reflect.Type, methodName string, kind HandlerKind) (MessageRegistration, bool, error) {
	method, ok := cmdType.MethodByName(methodName)
	if !ok {
		return nil, false, nil
	}
	methodType := method.Type
	if methodType.NumIn() != 3 || !methodType.In(1).Implements(contextType) {
		return nil, false, nil
	}

	var resultType reflect.Type
	switch kind {
	case HandlerKindCommand:
		if methodType.NumOut() != 1 || !methodType.Out(0).Implements(errorType) {
			return nil, false, nil
		}
	case HandlerKindQuery:
		if methodType.NumOut() != 2 || !methodType.Out(1).Implements(errorType) {
			return nil, false, nil
		}
		resultType = methodType.Out(0)
	default:
		return nil, false, NewRegistrationInvalidError("unsupported handler kind", map[string]any{"handler_kind": kind})
	}

	declaredType := methodType.In(2)
	meta, ok := messageMetaFromType(cmd, declaredType)
	if !ok {
		return nil, false, NewRegistrationInvalidError("message request type or factory is invalid", map[string]any{
			"handler_kind": kind,
			"method":       methodName,
			"request_type": typeString(declaredType),
		})
	}

	stableID := stableRegistrationID(cmd, meta.MessageType)
	if stableID == "" {
		return nil, false, NewRegistrationInvalidError("registration id is required", map[string]any{
			"handler_kind": kind,
			"message_type": meta.MessageType,
		})
	}

	newMessage := registrationMessageFactory(cmd, declaredType)
	message := newMessage()
	if message == nil || !registrationMessageCompatible(declaredType, reflect.TypeOf(message)) {
		return nil, false, NewRegistrationInvalidError("message factory could not create a compatible decode target", map[string]any{
			"handler_kind": kind,
			"method":       methodName,
			"request_type": typeString(declaredType),
		})
	}

	return &discoveredMessageRegistration{
		id:             stableID,
		messageType:    meta.MessageType,
		kind:           kind,
		requestType:    declaredType,
		resultType:     resultType,
		newMessageType: reflect.TypeOf(message),
		newMessage:     newMessage,
	}, true, nil
}

func registrationMessageFactory(cmd any, declaredType reflect.Type) func() any {
	if isInterfaceType(declaredType) {
		factory, _ := cmd.(MessageFactory)
		return func() any {
			return messageFactoryValue(factory, true)
		}
	}
	return func() any {
		if declaredType == nil {
			return nil
		}
		if declaredType.Kind() == reflect.Pointer {
			return reflect.New(declaredType.Elem()).Interface()
		}
		// Dynamic decoders need an addressable value even when a handler accepts T.
		return reflect.New(declaredType).Interface()
	}
}

func cloneMessageDecodeTarget(message any) any {
	if message == nil {
		return nil
	}
	value := reflect.ValueOf(message)
	if isNilReflectValue(value) {
		return nil
	}
	clone := cloneMessageValue(value, make(map[messageCloneVisit]reflect.Value))
	if value.Kind() == reflect.Pointer {
		return clone.Interface()
	}
	// Dynamic decoders require an addressable target even when the factory
	// returns a value implementing the declared interface.
	target := reflect.New(value.Type())
	target.Elem().Set(clone)
	return target.Interface()
}

type messageCloneVisit struct {
	typeValue reflect.Type
	pointer   uintptr
	length    int
}

func cloneMessageValue(value reflect.Value, visited map[messageCloneVisit]reflect.Value) reflect.Value {
	if !value.IsValid() {
		return reflect.Value{}
	}
	switch value.Kind() {
	case reflect.Interface:
		if value.IsNil() {
			return reflect.Zero(value.Type())
		}
		clone := cloneMessageValue(value.Elem(), visited)
		out := reflect.New(value.Type()).Elem()
		if clone.IsValid() && clone.Type().AssignableTo(value.Type()) {
			out.Set(clone)
		} else if clone.IsValid() && clone.Type().Implements(value.Type()) {
			out.Set(clone)
		}
		return out
	case reflect.Pointer:
		if value.IsNil() {
			return reflect.Zero(value.Type())
		}
		visit := messageCloneVisit{typeValue: value.Type(), pointer: value.Pointer()}
		if clone, ok := visited[visit]; ok {
			return clone
		}
		out := reflect.New(value.Type().Elem())
		visited[visit] = out
		out.Elem().Set(cloneMessageValue(value.Elem(), visited))
		return out
	case reflect.Map:
		if value.IsNil() {
			return reflect.Zero(value.Type())
		}
		visit := messageCloneVisit{typeValue: value.Type(), pointer: value.Pointer()}
		if clone, ok := visited[visit]; ok {
			return clone
		}
		out := reflect.MakeMapWithSize(value.Type(), value.Len())
		visited[visit] = out
		iterator := value.MapRange()
		for iterator.Next() {
			out.SetMapIndex(
				cloneMessageValue(iterator.Key(), visited),
				cloneMessageValue(iterator.Value(), visited),
			)
		}
		return out
	case reflect.Slice:
		if value.IsNil() {
			return reflect.Zero(value.Type())
		}
		visit := messageCloneVisit{typeValue: value.Type(), pointer: value.Pointer(), length: value.Len()}
		if clone, ok := visited[visit]; ok {
			return clone
		}
		out := reflect.MakeSlice(value.Type(), value.Len(), value.Len())
		visited[visit] = out
		for index := 0; index < value.Len(); index++ {
			out.Index(index).Set(cloneMessageValue(value.Index(index), visited))
		}
		return out
	case reflect.Array:
		out := reflect.New(value.Type()).Elem()
		for index := 0; index < value.Len(); index++ {
			out.Index(index).Set(cloneMessageValue(value.Index(index), visited))
		}
		return out
	case reflect.Struct:
		// Copy the complete value first so opaque standard-library fields retain
		// their valid representation, then recursively isolate settable fields.
		out := reflect.New(value.Type()).Elem()
		out.Set(value)
		for index := 0; index < value.NumField(); index++ {
			if !out.Field(index).CanSet() || !value.Field(index).CanInterface() {
				continue
			}
			out.Field(index).Set(cloneMessageValue(value.Field(index), visited))
		}
		return out
	default:
		return value
	}
}

func messageFactoryValue(factory MessageFactory, clone bool) any {
	if factory == nil {
		return nil
	}
	value := reflect.ValueOf(factory)
	if isNilReflectValue(value) {
		return nil
	}
	gate := messageFactoryLock(factory)
	gate.Lock()
	defer gate.Unlock()
	message := factory.MessageValue()
	if !clone {
		return message
	}
	return cloneMessageDecodeTarget(message)
}

func messageFactoryLock(factory MessageFactory) *sync.Mutex {
	value := reflect.ValueOf(factory)
	for value.IsValid() && value.Kind() == reflect.Interface {
		value = value.Elem()
	}
	hash := uint64(1469598103934665603)
	if value.IsValid() {
		for _, character := range value.Type().String() {
			hash ^= uint64(character)
			hash *= 1099511628211
		}
		switch value.Kind() {
		case reflect.Chan, reflect.Func, reflect.Map, reflect.Pointer, reflect.Slice:
			hash ^= uint64(value.Pointer())
			hash *= 1099511628211
		}
	}
	return &messageFactoryLocks[hash%uint64(len(messageFactoryLocks))]
}

func isNilReflectValue(value reflect.Value) bool {
	if !value.IsValid() {
		return true
	}
	switch value.Kind() {
	case reflect.Chan, reflect.Func, reflect.Interface, reflect.Map, reflect.Pointer, reflect.Slice:
		return value.IsNil()
	default:
		return false
	}
}

func stableRegistrationID(cmd any, fallback string) string {
	if describer, ok := cmd.(CatalogDescriber); ok {
		if id := strings.TrimSpace(describer.CommandDescriptor().ID); id != "" {
			return id
		}
	}
	return strings.TrimSpace(fallback)
}

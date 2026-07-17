package command

import (
	"reflect"
	"sort"
	"strings"
	"sync"
	"sync/atomic"
)

type registrationLookupKey struct {
	kind HandlerKind
	key  string
}

type registrationSnapshot struct {
	byID          map[registrationLookupKey]*immutableMessageRegistration
	byMessageType map[registrationLookupKey]*immutableMessageRegistration
	registrations []*immutableMessageRegistration
}

type immutableMessageRegistration struct {
	id             string
	messageType    string
	kind           HandlerKind
	requestType    reflect.Type
	resultType     reflect.Type
	newMessageType reflect.Type
	newMessage     func() any
	factoryMu      sync.Mutex
}

func (r *immutableMessageRegistration) ID() string {
	if r == nil {
		return ""
	}
	return r.id
}

func (r *immutableMessageRegistration) MessageType() string {
	if r == nil {
		return ""
	}
	return r.messageType
}

func (r *immutableMessageRegistration) Kind() HandlerKind {
	if r == nil {
		return ""
	}
	return r.kind
}

func (r *immutableMessageRegistration) NewMessage() any {
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

func (r *immutableMessageRegistration) RequestType() reflect.Type {
	if r == nil {
		return nil
	}
	return r.requestType
}

func (r *immutableMessageRegistration) ResultType() reflect.Type {
	if r == nil {
		return nil
	}
	return r.resultType
}

// MessageRegistrationIndex atomically publishes complete immutable
// registration generations.
type MessageRegistrationIndex struct {
	snapshot atomic.Pointer[registrationSnapshot]
}

func NewMessageRegistrationIndex(registrations ...MessageRegistration) (*MessageRegistrationIndex, error) {
	index := &MessageRegistrationIndex{}
	if err := index.Replace(registrations); err != nil {
		return nil, err
	}
	return index, nil
}

// Replace validates a complete generation before publishing it. A failed
// replacement leaves the previous snapshot active.
func (i *MessageRegistrationIndex) Replace(registrations []MessageRegistration) error {
	if i == nil {
		return NewRegistrationInvalidError("registration index cannot be nil", nil)
	}
	snapshot, err := buildRegistrationSnapshot(registrations)
	if err != nil {
		return err
	}
	i.snapshot.Store(snapshot)
	return nil
}

func (i *MessageRegistrationIndex) RegistrationByID(kind HandlerKind, stableID string) (MessageRegistration, bool) {
	if i == nil {
		return nil, false
	}
	snapshot := i.snapshot.Load()
	if snapshot == nil {
		return nil, false
	}
	registration, ok := snapshot.byID[registrationLookupKey{kind: kind, key: strings.TrimSpace(stableID)}]
	return registration, ok
}

func (i *MessageRegistrationIndex) RegistrationByMessageType(kind HandlerKind, messageType string) (MessageRegistration, bool) {
	if i == nil {
		return nil, false
	}
	snapshot := i.snapshot.Load()
	if snapshot == nil {
		return nil, false
	}
	registration, ok := snapshot.byMessageType[registrationLookupKey{kind: kind, key: strings.TrimSpace(messageType)}]
	return registration, ok
}

func (i *MessageRegistrationIndex) Registrations() []MessageRegistration {
	if i == nil {
		return nil
	}
	snapshot := i.snapshot.Load()
	if snapshot == nil || len(snapshot.registrations) == 0 {
		return nil
	}
	out := make([]MessageRegistration, len(snapshot.registrations))
	for idx, registration := range snapshot.registrations {
		out[idx] = registration
	}
	return out
}

func buildRegistrationSnapshot(registrations []MessageRegistration) (*registrationSnapshot, error) {
	validated := make([]*immutableMessageRegistration, 0, len(registrations))
	for _, registration := range registrations {
		cloned, err := snapshotRegistration(registration)
		if err != nil {
			return nil, err
		}
		validated = append(validated, cloned)
	}

	sort.Slice(validated, func(a, b int) bool {
		left, right := validated[a], validated[b]
		if left.kind != right.kind {
			return left.kind < right.kind
		}
		if left.id != right.id {
			return left.id < right.id
		}
		if left.messageType != right.messageType {
			return left.messageType < right.messageType
		}
		if typeString(left.requestType) != typeString(right.requestType) {
			return typeString(left.requestType) < typeString(right.requestType)
		}
		return typeString(left.resultType) < typeString(right.resultType)
	})

	snapshot := &registrationSnapshot{
		byID:          make(map[registrationLookupKey]*immutableMessageRegistration, len(validated)),
		byMessageType: make(map[registrationLookupKey]*immutableMessageRegistration, len(validated)),
		registrations: make([]*immutableMessageRegistration, 0, len(validated)),
	}
	for _, registration := range validated {
		idKey := registrationLookupKey{kind: registration.kind, key: registration.id}
		messageKey := registrationLookupKey{kind: registration.kind, key: registration.messageType}
		if existing, ok := snapshot.byID[idKey]; ok {
			if !equivalentRegistration(existing, registration) {
				return nil, NewRegistrationConflictError(registration.kind, registration.id).
					WithMetadata(map[string]any{"conflict_axis": "stable_id"})
			}
			continue
		}
		if existing, ok := snapshot.byMessageType[messageKey]; ok {
			if !equivalentRegistration(existing, registration) {
				return nil, NewRegistrationConflictError(registration.kind, registration.messageType).
					WithMetadata(map[string]any{"conflict_axis": "message_type"})
			}
			continue
		}
		snapshot.byID[idKey] = registration
		snapshot.byMessageType[messageKey] = registration
		snapshot.registrations = append(snapshot.registrations, registration)
	}
	return snapshot, nil
}

func snapshotRegistration(registration MessageRegistration) (*immutableMessageRegistration, error) {
	if isNilRegistration(registration) {
		return nil, NewRegistrationInvalidError("registration cannot be nil", nil)
	}
	kind := registration.Kind()
	if kind != HandlerKindCommand && kind != HandlerKindQuery {
		return nil, NewRegistrationInvalidError("registration handler kind is invalid", map[string]any{"handler_kind": kind})
	}
	id := strings.TrimSpace(registration.ID())
	messageType := strings.TrimSpace(registration.MessageType())
	requestType := registration.RequestType()
	resultType := registration.ResultType()
	if id == "" || messageType == "" || requestType == nil {
		return nil, NewRegistrationInvalidError("registration identity and request type are required", map[string]any{
			"handler_kind":    kind,
			"registration_id": id,
			"message_type":    messageType,
			"request_type":    typeString(requestType),
		})
	}
	if kind == HandlerKindQuery && resultType == nil {
		return nil, NewRegistrationInvalidError("query registration result type is required", map[string]any{"registration_id": id})
	}
	if kind == HandlerKindCommand && resultType != nil {
		return nil, NewRegistrationInvalidError("command registration must not declare a query result type", map[string]any{"registration_id": id})
	}

	message := registration.NewMessage()
	if message == nil {
		return nil, NewRegistrationInvalidError("registration message factory returned nil", map[string]any{"registration_id": id})
	}
	messageTypeValue := reflect.TypeOf(message)
	if !registrationMessageCompatible(requestType, messageTypeValue) {
		return nil, NewRegistrationInvalidError("registration message factory returned an incompatible type", map[string]any{
			"registration_id": id,
			"request_type":    typeString(requestType),
			"factory_type":    typeString(messageTypeValue),
		})
	}

	return &immutableMessageRegistration{
		id:             id,
		messageType:    messageType,
		kind:           kind,
		requestType:    requestType,
		resultType:     resultType,
		newMessageType: messageTypeValue,
		newMessage:     registration.NewMessage,
	}, nil
}

func registrationMessageCompatible(requestType reflect.Type, messageType reflect.Type) bool {
	if requestType == nil || messageType == nil {
		return false
	}
	if messageType.AssignableTo(requestType) {
		return true
	}
	if requestType.Kind() == reflect.Interface && messageType.Implements(requestType) {
		return true
	}
	return messageType.Kind() == reflect.Pointer && messageType.Elem().AssignableTo(requestType)
}

func equivalentRegistration(left, right *immutableMessageRegistration) bool {
	return left != nil && right != nil &&
		left.kind == right.kind &&
		left.id == right.id &&
		left.messageType == right.messageType &&
		left.requestType == right.requestType &&
		left.resultType == right.resultType &&
		left.newMessageType == right.newMessageType
}

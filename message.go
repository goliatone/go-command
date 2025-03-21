package command

import "reflect"

// Message is the interface command and queries messages must implement
type Message interface {
	Type() string
	Validate() error
}

type BaseMessage struct{}

func (b BaseMessage) Validate() error {
	return nil
}

func IsNilMessage(msg any) bool {
	if msg == nil {
		return true
	}

	v := reflect.ValueOf(msg)
	if v.Kind() != reflect.Ptr {
		return false
	}

	return v.IsNil()
}

// MessageHandler provides base validation for any message type
type MessageHandler[T any] struct{}

func (h *MessageHandler[T]) ValidateMessage(msg T) error {
	if IsNilMessage(msg) {
		return WrapError("InvalidMessage", "nil message pointer", nil)
	}

	if m, ok := any(msg).(Message); ok {
		if err := m.Validate(); err != nil {
			return WrapError("InvalidMessage", "message validation failed", err)
		}
	}

	return nil
}

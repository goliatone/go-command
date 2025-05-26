package command

import (
	"reflect"

	"github.com/goliatone/go-errors"
)

// Message is the interface command and queries messages must implement
type Message interface {
	Type() string
	Validate() error
}

// @deprecated
type BaseMessage struct{}

// @deprecated
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
		return errors.New("nil message pointer", errors.CategoryValidation).
			WithTextCode("INVALID_MESSAGE")
	}

	if m, ok := any(msg).(Message); ok {
		if err := m.Validate(); err != nil {
			return errors.Wrap(err, errors.CategoryValidation, "message validation failed").
				WithTextCode("VALIDATION_FAILED")
		}
	}

	return nil
}

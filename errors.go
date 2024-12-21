package command

import (
	"fmt"
)

// MessageError is a custom error type wrapping context around dispatch failures
type MessageError struct {
	Type    string
	Message string
	Err     error
}

func (e *MessageError) Error() string {
	if e.Err != nil {
		return fmt.Sprintf("%s: %s: %v", e.Type, e.Message, e.Err)
	}
	return fmt.Sprintf("%s: %s", e.Type, e.Message)
}

func (e *MessageError) Unwrap() error {
	return e.Err
}

// WrapMessageError is a helper to create wrapped errors using MessageError
func WrapMessageError(errType, msg string, err error) *MessageError {
	return &MessageError{
		Type:    errType,
		Message: msg,
		Err:     err,
	}
}

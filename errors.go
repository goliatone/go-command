package command

import (
	"fmt"
)

// Error is a custom error type wrapping context around dispatch failures
type Error struct {
	Type    string
	Message string
	Err     error
}

func (e *Error) Error() string {
	if e.Err != nil {
		return fmt.Sprintf("%s: %s: %v", e.Type, e.Message, e.Err)
	}
	return fmt.Sprintf("%s: %s", e.Type, e.Message)
}

func (e *Error) Unwrap() error {
	return e.Err
}

// WrapError is a helper to create wrapped errors using MessageError
func WrapError(errType, msg string, err error) *Error {
	return &Error{
		Type:    errType,
		Message: msg,
		Err:     err,
	}
}

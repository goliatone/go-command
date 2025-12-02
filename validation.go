package command

import "github.com/goliatone/go-errors"

// ErrValidation is a sentinel error used to mark validation failures.
// Wrappers can compare errors with errors.Is(err, ErrValidation) to
// propagate validation intent through additional layers.
var ErrValidation = errors.New("validation error", errors.CategoryValidation).
	WithTextCode("VALIDATION_FAILED")

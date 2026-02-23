package flow

import (
	stderrors "errors"
	"strings"

	apperrors "github.com/goliatone/go-errors"
)

const (
	ErrCodeInvalidTransition  = "FSM_INVALID_TRANSITION"
	ErrCodeGuardRejected      = "FSM_GUARD_REJECTED"
	ErrCodeStateNotFound      = "FSM_STATE_NOT_FOUND"
	ErrCodeVersionConflict    = "FSM_VERSION_CONFLICT"
	ErrCodePreconditionFailed = "FSM_PRECONDITION_FAILED"
)

var (
	ErrInvalidTransition = apperrors.New("invalid transition", apperrors.CategoryBadInput).
				WithTextCode(ErrCodeInvalidTransition)
	ErrGuardRejected = apperrors.New("guard rejected", apperrors.CategoryBadInput).
				WithTextCode(ErrCodeGuardRejected)
	ErrStateNotFound = apperrors.New("state not found", apperrors.CategoryBadInput).
				WithTextCode(ErrCodeStateNotFound)
	ErrVersionConflict = apperrors.New("version conflict", apperrors.CategoryConflict).
				WithTextCode(ErrCodeVersionConflict)
	ErrPreconditionFailed = apperrors.New("precondition failed", apperrors.CategoryBadInput).
				WithTextCode(ErrCodePreconditionFailed)
)

func cloneRuntimeError(base *apperrors.Error, message string, source error, metadata map[string]any) *apperrors.Error {
	if base == nil {
		base = ErrPreconditionFailed
	}
	err := base.Clone()
	if text := strings.TrimSpace(message); text != "" {
		err.Message = text
	}
	if source != nil {
		err.Source = source
	}
	if len(metadata) > 0 {
		err = err.WithMetadata(metadata)
	}
	return err
}

func runtimeErrorCode(err error) string {
	var ge *apperrors.Error
	if stderrors.As(err, &ge) {
		return ge.TextCode
	}
	return ""
}

func isGuardRejected(err error) bool {
	return runtimeErrorCode(err) == ErrCodeGuardRejected
}

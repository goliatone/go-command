package flow

import (
	"context"
	"strings"
	"time"
)

// TransitionPhase identifies lifecycle event emission points.
type TransitionPhase string

const (
	TransitionPhaseAttempted TransitionPhase = "attempted"
	TransitionPhaseCommitted TransitionPhase = "committed"
	TransitionPhaseRejected  TransitionPhase = "rejected"
)

// HookFailureMode controls lifecycle-hook error behavior.
type HookFailureMode string

const (
	HookFailureModeFailOpen   HookFailureMode = "fail_open"
	HookFailureModeFailClosed HookFailureMode = "fail_closed"
)

// TransitionLifecycleEvent captures auditable transition metadata.
type TransitionLifecycleEvent[T any] struct {
	Phase           TransitionPhase
	MachineID       string
	MachineVersion  string
	EntityID        string
	ExecutionID     string
	Event           string
	TransitionID    string
	PreviousState   string
	CurrentState    string
	ExpectedState   string
	ExpectedVersion int
	ErrorCode       string
	ErrorMessage    string
	ExecCtx         ExecutionContext
	Metadata        map[string]any
	OccurredAt      time.Time
	Msg             T
}

// TransitionLifecycleHook receives transition lifecycle events.
type TransitionLifecycleHook[T any] interface {
	Notify(ctx context.Context, evt TransitionLifecycleEvent[T]) error
}

// TransitionLifecycleHooks fan-out collection for lifecycle hooks.
type TransitionLifecycleHooks[T any] []TransitionLifecycleHook[T]

// LifecycleEventHandler allows orchestrators to own lifecycle handling behavior.
type LifecycleEventHandler[T any] interface {
	OnTransitionLifecycleEvent(ctx context.Context, evt TransitionLifecycleEvent[T]) error
}

func normalizeHookFailureMode(mode HookFailureMode) HookFailureMode {
	switch HookFailureMode(strings.ToLower(strings.TrimSpace(string(mode)))) {
	case HookFailureModeFailClosed:
		return HookFailureModeFailClosed
	case HookFailureModeFailOpen:
		return HookFailureModeFailOpen
	default:
		return HookFailureModeFailOpen
	}
}

func isValidHookFailureMode(mode HookFailureMode) bool {
	switch HookFailureMode(strings.ToLower(strings.TrimSpace(string(mode)))) {
	case HookFailureModeFailOpen, HookFailureModeFailClosed:
		return true
	default:
		return false
	}
}

func fanoutLifecycleHooks[T any](
	ctx context.Context,
	hooks TransitionLifecycleHooks[T],
	evt TransitionLifecycleEvent[T],
	mode HookFailureMode,
	logger Logger,
) error {
	if len(hooks) == 0 {
		return nil
	}
	mode = normalizeHookFailureMode(mode)
	logger = normalizeLogger(logger).WithContext(ctx)
	fields := map[string]any{
		"machine_id":      strings.TrimSpace(evt.MachineID),
		"machine_version": strings.TrimSpace(evt.MachineVersion),
		"entity_id":       strings.TrimSpace(evt.EntityID),
		"event":           normalizeEvent(evt.Event),
		"transition_id":   strings.TrimSpace(evt.TransitionID),
		"execution_id":    strings.TrimSpace(evt.ExecutionID),
		"phase":           string(evt.Phase),
	}
	logger = withLoggerFields(logger, fields)

	for idx, hook := range hooks {
		if hook == nil {
			continue
		}
		if err := hook.Notify(ctx, cloneLifecycleEvent(evt)); err != nil {
			if mode == HookFailureModeFailClosed {
				return cloneRuntimeError(
					ErrPreconditionFailed,
					"lifecycle hook failed",
					err,
					fields,
				)
			}
			logger.Warn("lifecycle hook failed at index=%d: %v", idx, err)
		}
	}
	return nil
}

func cloneLifecycleEvent[T any](evt TransitionLifecycleEvent[T]) TransitionLifecycleEvent[T] {
	evt.Metadata = copyMap(evt.Metadata)
	return evt
}

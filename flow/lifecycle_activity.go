package flow

import (
	"context"
	"strings"
	"time"
)

const (
	// LifecycleActivityChannelFSM is the canonical channel for FSM lifecycle activity.
	LifecycleActivityChannelFSM = "fsm"
	// LifecycleActivityObjectTypeMachine is the canonical object type for FSM lifecycle activity.
	LifecycleActivityObjectTypeMachine = "fsm.machine"
	// LifecycleActivityVerbPrefix is the canonical lifecycle verb prefix.
	LifecycleActivityVerbPrefix = "fsm.transition."
)

// LifecycleActivityEnvelope is a transport-neutral activity payload projected from lifecycle events.
type LifecycleActivityEnvelope struct {
	Channel    string
	Verb       string
	ObjectType string
	ObjectID   string
	ActorID    string
	TenantID   string
	OccurredAt time.Time
	Metadata   map[string]any
}

func (e LifecycleActivityEnvelope) ActivityChannel() string          { return e.Channel }
func (e LifecycleActivityEnvelope) ActivityVerb() string             { return e.Verb }
func (e LifecycleActivityEnvelope) ActivityObjectType() string       { return e.ObjectType }
func (e LifecycleActivityEnvelope) ActivityObjectID() string         { return e.ObjectID }
func (e LifecycleActivityEnvelope) ActivityActorID() string          { return e.ActorID }
func (e LifecycleActivityEnvelope) ActivityTenantID() string         { return e.TenantID }
func (e LifecycleActivityEnvelope) ActivityOccurredAt() time.Time    { return e.OccurredAt }
func (e LifecycleActivityEnvelope) ActivityMetadata() map[string]any { return copyMap(e.Metadata) }

// LifecycleActivitySink receives lifecycle activity envelopes.
type LifecycleActivitySink interface {
	LogLifecycleActivity(ctx context.Context, envelope LifecycleActivityEnvelope) error
}

// LifecycleActivitySinkFunc adapts a function into LifecycleActivitySink.
type LifecycleActivitySinkFunc func(ctx context.Context, envelope LifecycleActivityEnvelope) error

// LogLifecycleActivity satisfies LifecycleActivitySink.
func (f LifecycleActivitySinkFunc) LogLifecycleActivity(ctx context.Context, envelope LifecycleActivityEnvelope) error {
	return f(ctx, envelope)
}

// LifecycleActivityHook projects lifecycle events into canonical activity envelopes.
type LifecycleActivityHook[T any] struct {
	Sink LifecycleActivitySink
}

var _ TransitionLifecycleHook[any] = (*LifecycleActivityHook[any])(nil)

// Notify satisfies TransitionLifecycleHook and forwards projected envelopes to the sink.
func (h *LifecycleActivityHook[T]) Notify(ctx context.Context, evt TransitionLifecycleEvent[T]) error {
	if h == nil || h.Sink == nil {
		return nil
	}
	return h.Sink.LogLifecycleActivity(ctx, BuildLifecycleActivityEnvelope(evt))
}

// BuildLifecycleActivityEnvelope maps a transition lifecycle event into the canonical activity envelope.
func BuildLifecycleActivityEnvelope[T any](evt TransitionLifecycleEvent[T]) LifecycleActivityEnvelope {
	phase := normalizeLifecycleActivityPhase(evt.Phase)

	metadata := copyMap(evt.Metadata)
	if metadata == nil {
		metadata = map[string]any{}
	}
	putLifecycleActivityString(metadata, "machine_id", evt.MachineID)
	putLifecycleActivityString(metadata, "machine_version", evt.MachineVersion)
	putLifecycleActivityString(metadata, "entity_id", evt.EntityID)
	putLifecycleActivityString(metadata, "execution_id", evt.ExecutionID)
	putLifecycleActivityString(metadata, "event", evt.Event)
	putLifecycleActivityString(metadata, "transition_id", evt.TransitionID)
	putLifecycleActivityString(metadata, "from_state", evt.PreviousState)
	putLifecycleActivityString(metadata, "to_state", evt.CurrentState)
	putLifecycleActivityString(metadata, "expected_state", evt.ExpectedState)
	if evt.ExpectedVersion != 0 {
		metadata["expected_version"] = evt.ExpectedVersion
	}
	putLifecycleActivityString(metadata, "error_code", evt.ErrorCode)
	putLifecycleActivityString(metadata, "error_message", evt.ErrorMessage)
	putLifecycleActivityString(metadata, "phase", phase)
	putLifecycleActivityString(metadata, "actor_id", evt.ExecCtx.ActorID)
	putLifecycleActivityString(metadata, "tenant", evt.ExecCtx.Tenant)
	if len(evt.ExecCtx.Roles) > 0 {
		roles := make([]string, 0, len(evt.ExecCtx.Roles))
		for _, role := range evt.ExecCtx.Roles {
			trimmed := strings.TrimSpace(role)
			if trimmed != "" {
				roles = append(roles, trimmed)
			}
		}
		if len(roles) > 0 {
			metadata["roles"] = roles
		}
	}

	return LifecycleActivityEnvelope{
		Channel:    LifecycleActivityChannelFSM,
		Verb:       LifecycleActivityVerbPrefix + phase,
		ObjectType: LifecycleActivityObjectTypeMachine,
		ObjectID:   strings.TrimSpace(evt.EntityID),
		ActorID:    strings.TrimSpace(evt.ExecCtx.ActorID),
		TenantID:   strings.TrimSpace(evt.ExecCtx.Tenant),
		OccurredAt: evt.OccurredAt,
		Metadata:   metadata,
	}
}

func normalizeLifecycleActivityPhase(phase TransitionPhase) string {
	value := strings.ToLower(strings.TrimSpace(string(phase)))
	switch value {
	case string(TransitionPhaseAttempted), string(TransitionPhaseCommitted), string(TransitionPhaseRejected):
		return value
	default:
		return "unknown"
	}
}

func putLifecycleActivityString(dst map[string]any, key, value string) {
	trimmed := strings.TrimSpace(value)
	if trimmed == "" {
		return
	}
	dst[key] = trimmed
}

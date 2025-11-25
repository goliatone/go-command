package flow

import (
	"context"
	"fmt"
	"strings"

	"github.com/goliatone/go-command"
	"github.com/goliatone/go-errors"
)

// TransitionRequest extracts state machine metadata from a message.
type TransitionRequest[T any] struct {
	StateKey     func(T) string
	Event        func(T) string
	CurrentState func(T) string
}

// StateMachine executes transitions with optional guards/actions and persistence.
type StateMachine[T command.Message] struct {
	entity               string
	initial              string
	states               map[string]StateConfig
	transitions          map[string]TransitionConfig
	store                StateStore
	guards               *GuardRegistry[T]
	actions              *ActionRegistry[T]
	req                  TransitionRequest[T]
	allowInitialFallback bool
}

// StateMachineOption customizes state machine behavior.
type StateMachineOption[T command.Message] func(*StateMachine[T])

// WithInitialFallback allows falling back to the initial state when both store and CurrentState are empty.
func WithInitialFallback[T command.Message](enable bool) StateMachineOption[T] {
	return func(sm *StateMachine[T]) {
		sm.allowInitialFallback = enable
	}
}

// NewStateMachine constructs a state machine flow.
func NewStateMachine[T command.Message](
	cfg StateMachineConfig,
	store StateStore,
	req TransitionRequest[T],
	guards *GuardRegistry[T],
	actions *ActionRegistry[T],
	opts ...StateMachineOption[T],
) (*StateMachine[T], error) {
	if err := cfg.Validate(); err != nil {
		return nil, err
	}

	states := make(map[string]StateConfig, len(cfg.States))
	var initial string
	for _, st := range cfg.States {
		key := normalizeState(st.Name)
		states[key] = st
		if st.Initial && initial == "" {
			initial = key
		}
	}
	if initial == "" && len(cfg.States) > 0 {
		initial = normalizeState(cfg.States[0].Name)
	}

	transitions := make(map[string]TransitionConfig, len(cfg.Transitions))
	for _, tr := range cfg.Transitions {
		key := transitionKey(normalizeState(tr.From), normalizeEvent(tr.Name))
		tr.From = normalizeState(tr.From)
		tr.To = normalizeState(tr.To)
		tr.Guard = strings.TrimSpace(tr.Guard)
		tr.Action = strings.TrimSpace(tr.Action)
		transitions[key] = tr
	}

	if store == nil {
		store = NewInMemoryStateStore()
	}

	sm := &StateMachine[T]{
		entity:      cfg.Entity,
		initial:     initial,
		states:      states,
		transitions: transitions,
		store:       store,
		guards:      guards,
		actions:     actions,
		req:         req,
	}

	for _, opt := range opts {
		if opt != nil {
			opt(sm)
		}
	}

	return sm, nil
}

// Execute applies a transition based on the incoming message.
func (s *StateMachine[T]) Execute(ctx context.Context, msg T) error {
	key := strings.TrimSpace(s.req.StateKey(msg))
	if key == "" {
		return errors.New("state machine key required", errors.CategoryBadInput).
			WithTextCode("STATE_MACHINE_KEY_REQUIRED").
			WithMetadata(map[string]any{"entity": s.entity})
	}

	event := normalizeEvent(s.req.Event(msg))
	if event == "" {
		return errors.New("event required", errors.CategoryBadInput).
			WithTextCode("STATE_MACHINE_EVENT_REQUIRED").
			WithMetadata(map[string]any{"entity": s.entity, "key": key})
	}

	current, err := s.store.Load(ctx, key)
	if err != nil {
		return errors.Wrap(err, errors.CategoryExternal, "failed to load state").
			WithTextCode("STATE_MACHINE_LOAD_ERROR").
			WithMetadata(map[string]any{"entity": s.entity, "key": key})
	}
	if strings.TrimSpace(current) == "" && s.req.CurrentState != nil {
		current = s.req.CurrentState(msg)
	}
	if strings.TrimSpace(current) == "" {
		if s.allowInitialFallback {
			current = s.initial
		} else {
			return errors.New("current state missing (store empty and no CurrentState provided)", errors.CategoryBadInput).
				WithTextCode("STATE_MACHINE_STATE_MISSING").
				WithMetadata(map[string]any{"entity": s.entity, "key": key})
		}
	}
	current = normalizeState(current)

	tr, ok := s.transitions[transitionKey(current, event)]
	if !ok {
		return errors.New(
			fmt.Sprintf("no transition for state=%s event=%s", current, event),
			errors.CategoryBadInput).
			WithTextCode("STATE_MACHINE_TRANSITION_MISSING").
			WithMetadata(map[string]any{"entity": s.entity, "state": current, "event": event})
	}

	if tr.Guard != "" {
		if s.guards == nil {
			return errors.New(fmt.Sprintf("guard %s not configured", tr.Guard), errors.CategoryBadInput).
				WithTextCode("STATE_MACHINE_GUARD_MISSING").
				WithMetadata(map[string]any{"entity": s.entity, "guard": tr.Guard})
		}
		fn, ok := s.guards.Lookup(tr.Guard)
		if !ok || fn == nil {
			return errors.New(fmt.Sprintf("guard %s not found", tr.Guard), errors.CategoryBadInput).
				WithTextCode("STATE_MACHINE_GUARD_MISSING").
				WithMetadata(map[string]any{"entity": s.entity, "guard": tr.Guard})
		}
		if !fn(msg) {
			return errors.New(fmt.Sprintf("guard %s blocked transition", tr.Guard), errors.CategoryBadInput).
				WithTextCode("STATE_MACHINE_GUARD_BLOCKED").
				WithMetadata(map[string]any{"entity": s.entity, "guard": tr.Guard, "state": current, "event": event})
		}
	}

	if tr.Action != "" && s.actions != nil {
		if action, ok := s.actions.Lookup(tr.Action); ok && action != nil {
			if err := action(ctx, msg); err != nil {
				return errors.Wrap(err, errors.CategoryHandler, fmt.Sprintf("action %s failed", tr.Action)).
					WithTextCode("STATE_MACHINE_ACTION_FAILED").
					WithMetadata(map[string]any{"entity": s.entity, "action": tr.Action, "state": current, "event": event})
			}
		}
	}

	next := normalizeState(tr.To)
	if err := s.store.Save(ctx, key, next); err != nil {
		return errors.Wrap(err, errors.CategoryExternal, "failed to persist state").
			WithTextCode("STATE_MACHINE_SAVE_ERROR").
			WithMetadata(map[string]any{"entity": s.entity, "key": key, "state": next})
	}

	return nil
}

func transitionKey(state, event string) string {
	return state + "::" + event
}

func normalizeState(s string) string {
	return strings.ToLower(strings.TrimSpace(s))
}

func normalizeEvent(s string) string {
	return strings.ToLower(strings.TrimSpace(s))
}

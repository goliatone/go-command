package flow

// TransitionRequestFromState creates a TransitionRequest using ID and current state fields.
func TransitionRequestFromState[T any](idFn func(T) string, stateFn func(T) string, eventFn func(T) string) TransitionRequest[T] {
	return TransitionRequest[T]{
		StateKey:     idFn,
		Event:        eventFn,
		CurrentState: stateFn,
	}
}

package command

import "context"

// CommandRunStatsRecorder is a small adapter target for counters and metrics.
type CommandRunStatsRecorder interface {
	RecordCommandRunEvent(context.Context, CommandRunEvent) error
}

// CommandRunStatsRecorderFunc adapts a function into a stats recorder.
type CommandRunStatsRecorderFunc func(context.Context, CommandRunEvent) error

func (f CommandRunStatsRecorderFunc) RecordCommandRunEvent(ctx context.Context, event CommandRunEvent) error {
	if f == nil {
		return nil
	}
	return f(ctx, event.Clone())
}

// CommandRunStatsObserver adapts a stats recorder into a fail-open observer.
func CommandRunStatsObserver(recorder CommandRunStatsRecorder) CommandRunObserver {
	return CommandRunObserverFunc(func(ctx context.Context, event CommandRunEvent) error {
		if recorder == nil {
			return nil
		}
		_ = recorder.RecordCommandRunEvent(ctx, event.Clone())
		return nil
	})
}

// CommandRunStore is a small adapter target for durable or in-memory run stores.
type CommandRunStore interface {
	StoreCommandRunEvent(context.Context, CommandRunEvent) error
}

// CommandRunStoreFunc adapts a function into a run store.
type CommandRunStoreFunc func(context.Context, CommandRunEvent) error

func (f CommandRunStoreFunc) StoreCommandRunEvent(ctx context.Context, event CommandRunEvent) error {
	if f == nil {
		return nil
	}
	return f(ctx, event.Clone())
}

// CommandRunStoreObserver adapts a run store into a fail-open observer.
func CommandRunStoreObserver(store CommandRunStore) CommandRunObserver {
	return CommandRunObserverFunc(func(ctx context.Context, event CommandRunEvent) error {
		if store == nil {
			return nil
		}
		_ = store.StoreCommandRunEvent(ctx, event.Clone())
		return nil
	})
}

// CommandRunMetadataSanitizer transforms safe metadata before forwarding.
type CommandRunMetadataSanitizer func(map[string]any) map[string]any

// SanitizingCommandRunObserver clones and sanitizes metadata before forwarding
// an event to another observer.
func SanitizingCommandRunObserver(inner CommandRunObserver, sanitizer CommandRunMetadataSanitizer) CommandRunObserver {
	return CommandRunObserverFunc(func(ctx context.Context, event CommandRunEvent) error {
		if inner == nil {
			return nil
		}
		sanitized := event.Clone()
		if sanitizer != nil {
			sanitized.Metadata = CloneCommandRunMetadata(sanitizer(CloneCommandRunMetadata(event.Metadata)))
		}
		_ = inner.OnCommandRunEvent(ctx, sanitized)
		return nil
	})
}

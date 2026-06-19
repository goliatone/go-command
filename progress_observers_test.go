package command

import (
	"context"
	"errors"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestCommandRunStatsObserverReceivesPhasesFailOpen(t *testing.T) {
	var phases []CommandRunPhase
	observer := CommandRunStatsObserver(CommandRunStatsRecorderFunc(func(_ context.Context, event CommandRunEvent) error {
		phases = append(phases, event.Phase)
		return errors.New("metrics backend down")
	}))

	for _, phase := range []CommandRunPhase{
		CommandRunPhaseStarted,
		CommandRunPhaseSucceeded,
		CommandRunPhaseFailed,
		CommandRunPhaseCanceled,
		CommandRunPhaseRejected,
	} {
		require.NoError(t, observer.OnCommandRunEvent(context.Background(), CommandRunEvent{Phase: phase}))
	}

	assert.Equal(t, []CommandRunPhase{
		CommandRunPhaseStarted,
		CommandRunPhaseSucceeded,
		CommandRunPhaseFailed,
		CommandRunPhaseCanceled,
		CommandRunPhaseRejected,
	}, phases)
}

func TestCommandRunStoreObserverReceivesAllPhasesFailOpen(t *testing.T) {
	var stored []CommandRunEvent
	observer := CommandRunStoreObserver(CommandRunStoreFunc(func(_ context.Context, event CommandRunEvent) error {
		stored = append(stored, event)
		return errors.New("store unavailable")
	}))

	events := []CommandRunEvent{
		{RunID: "run-1", Phase: CommandRunPhaseSubmitted},
		{RunID: "run-1", Phase: CommandRunPhaseStarted},
		{RunID: "run-1", Phase: CommandRunPhaseProgress},
		{RunID: "run-1", Phase: CommandRunPhaseSucceeded},
	}
	for _, event := range events {
		require.NoError(t, observer.OnCommandRunEvent(context.Background(), event))
	}

	require.Len(t, stored, len(events))
	assert.Equal(t, CommandRunPhaseSubmitted, stored[0].Phase)
	assert.Equal(t, CommandRunPhaseSucceeded, stored[len(stored)-1].Phase)
}

func TestSanitizingCommandRunObserverDoesNotMutateSourceEvent(t *testing.T) {
	var got CommandRunEvent
	observer := SanitizingCommandRunObserver(
		CommandRunObserverFunc(func(_ context.Context, event CommandRunEvent) error {
			got = event
			got.Metadata["observer"] = "mutated"
			return errors.New("ignored")
		}),
		func(metadata map[string]any) map[string]any {
			metadata["secret"] = "[redacted]"
			metadata["safe"] = "changed"
			return metadata
		},
	)

	source := CommandRunEvent{
		Metadata: map[string]any{
			"secret": "token",
			"safe":   "original",
		},
	}
	require.NoError(t, observer.OnCommandRunEvent(context.Background(), source))

	assert.Equal(t, "[redacted]", got.Metadata["secret"])
	assert.Equal(t, "changed", got.Metadata["safe"])
	assert.Equal(t, "token", source.Metadata["secret"])
	assert.Equal(t, "original", source.Metadata["safe"])
	assert.NotContains(t, source.Metadata, "observer")
}

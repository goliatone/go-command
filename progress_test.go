package command

import (
	"context"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestCheckpointAndProgressNoopWithoutReporter(t *testing.T) {
	require.NotPanics(t, func() {
		Checkpoint(context.Background(), "stage")
		Progress(context.Background(), 1, 2)
	})
}

func TestProgressHelpersReportUpdatesAndCloneMetadata(t *testing.T) {
	var got []ProgressUpdate
	reporter := CommandProgressReporterFunc(func(_ context.Context, update ProgressUpdate) {
		got = append(got, update)
		update.Metadata["observer"] = "mutated"
	})
	ctx := ContextWithCommandProgressReporter(context.Background(), reporter)

	metadata := map[string]any{"stage": "load"}
	Checkpoint(ctx, "loaded", WithProgressMessage("Loaded input"), WithProgressMetadata(metadata))
	metadata["stage"] = "mutated"
	Progress(ctx, 2, 5, WithProgressMetadata(metadata))

	require.Len(t, got, 2)
	assert.Equal(t, "loaded", got[0].Checkpoint)
	assert.Equal(t, "Loaded input", got[0].Message)
	assert.Equal(t, "load", got[0].Metadata["stage"])
	assert.Equal(t, "mutated", metadata["stage"])
	assert.NotContains(t, metadata, "observer")
	assert.Equal(t, int64(2), got[1].Current)
	assert.Equal(t, int64(5), got[1].Total)
	assert.Equal(t, "mutated", got[1].Metadata["stage"])
}

func TestCommandProgressReporterFuncClonesUpdateMetadata(t *testing.T) {
	var captured ProgressUpdate
	reporter := CommandProgressReporterFunc(func(_ context.Context, update ProgressUpdate) {
		captured = update
	})

	update := ProgressUpdate{Metadata: map[string]any{"key": "original"}}
	reporter.ReportProgress(context.Background(), update)
	update.Metadata["key"] = "mutated"

	require.NotNil(t, captured.Metadata)
	assert.Equal(t, "original", captured.Metadata["key"])
}

func TestDispatchRunContextRoundTripAndIsolation(t *testing.T) {
	startedAt := time.Now().UTC()
	run := DispatchRunContext{
		RunID:          "run-1",
		Revision:       7,
		DispatchID:     "dispatch-1",
		CommandID:      "command.create",
		Handler:        "*handler",
		ExecutionMode:  ExecutionModeQueued,
		CorrelationID:  "corr-1",
		IdempotencyKey: "idem-1",
		Attempt:        2,
		MaxAttempts:    3,
		StartedAt:      startedAt,
		Metadata:       map[string]any{"source": "api"},
	}

	ctx := ContextWithDispatchRun(context.Background(), run)
	run.Metadata["source"] = "mutated-source"

	got, ok := DispatchRunFromContext(ctx)
	require.True(t, ok)
	assert.Equal(t, "run-1", got.RunID)
	assert.Equal(t, uint64(7), got.Revision)
	assert.Equal(t, "api", got.Metadata["source"])

	got.Metadata["source"] = "mutated-read"
	got2, ok := DispatchRunFromContext(ctx)
	require.True(t, ok)
	assert.Equal(t, "api", got2.Metadata["source"])
	assert.Equal(t, startedAt, got2.StartedAt)

	_, ok = DispatchRunFromContext(context.Background())
	assert.False(t, ok)
}

func TestDispatchRunContextReportsCurrentRevisionSequence(t *testing.T) {
	ctx := ContextWithCommandRunRevision(context.Background(), 4)
	ctx = ContextWithDispatchRun(ctx, DispatchRunContext{RunID: "run-sequenced", Revision: 4})
	assert.Equal(t, uint64(5), NextCommandRunRevision(ctx))
	assert.Equal(t, uint64(6), NextCommandRunRevision(ctx))

	run, ok := DispatchRunFromContext(ctx)
	require.True(t, ok)
	assert.Equal(t, uint64(6), run.Revision)
}

func TestCommandRunEventCloneIsolatesMetadata(t *testing.T) {
	event := CommandRunEvent{Metadata: map[string]any{"key": "original"}}
	cloned := event.Clone()

	event.Metadata["key"] = "source-mutated"
	cloned.Metadata["copy"] = "copy-mutated"

	assert.Equal(t, "original", cloned.Metadata["key"])
	assert.NotContains(t, event.Metadata, "copy")
}

func TestCommandRunAttemptContextAndTracker(t *testing.T) {
	ctx := ContextWithCommandRunAttemptTracker(context.Background())
	_, ok := CommandRunAttemptFromContext(ctx)
	assert.False(t, ok)

	RecordCommandRunAttempt(ctx, CommandRunAttempt{Attempt: 2, MaxAttempts: 3})
	got, ok := CommandRunAttemptFromContext(ctx)
	require.True(t, ok)
	assert.Equal(t, 2, got.Attempt)
	assert.Equal(t, 3, got.MaxAttempts)

	attemptCtx := ContextWithCommandRunAttempt(ctx, CommandRunAttempt{Attempt: 1, MaxAttempts: 3})
	got, ok = CommandRunAttemptFromContext(attemptCtx)
	require.True(t, ok)
	assert.Equal(t, 1, got.Attempt)
	assert.Equal(t, 3, got.MaxAttempts)
}

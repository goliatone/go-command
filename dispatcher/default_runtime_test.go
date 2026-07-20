package dispatcher

import (
	"context"
	"testing"
	"time"

	"github.com/goliatone/go-command"
	gerrors "github.com/goliatone/go-errors"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

type blockingModeResolver struct {
	entered chan struct{}
	release chan struct{}
}

func (r *blockingModeResolver) ResolveMode(context.Context, string) (command.ExecutionMode, bool, error) {
	close(r.entered)
	<-r.release
	return command.ExecutionModeQueued, true, nil
}

func TestLegacyAPIsUseConfiguredDefaultRuntime(t *testing.T) {
	runtime, provider := buildDynamicRuntime(t)
	commandRegistration, ok := provider.RegistrationByMessageType(command.HandlerKindCommand, "dynamic.command")
	require.True(t, ok)
	queryRegistration, ok := provider.RegistrationByMessageType(command.HandlerKindQuery, "dynamic.query")
	require.True(t, ok)
	require.NoError(t, runtime.ReplacePlacementPolicies(
		command.PlacementPolicy{Kind: command.HandlerKindCommand, RegistrationID: commandRegistration.ID(), Route: command.DispatchRoute{Target: command.DispatchTargetRemote, Name: "worker"}},
		command.PlacementPolicy{Kind: command.HandlerKindQuery, RegistrationID: queryRegistration.ID(), Route: command.DispatchRoute{Target: command.DispatchTargetRemote, Name: "worker"}},
	))
	remote := &fakeRemoteDispatcher{dispatch: func(_ context.Context, _ command.DispatchRoute, registration command.MessageRegistration, _ any, _ command.DispatchOptions) (command.DispatchOutcome, error) {
		outcome := command.DispatchOutcome{Receipt: command.DispatchReceipt{Accepted: true, Mode: command.ExecutionModeInline, CommandID: registration.ID()}}
		if registration.Kind() == command.HandlerKindCommand {
			outcome.Result = "remote-command-result"
			outcome.ResultPresent = true
		} else {
			outcome.Result = &dynamicQueryResult{Value: "remote-query-result"}
			outcome.ResultPresent = true
		}
		return outcome, nil
	}}
	require.NoError(t, runtime.ConfigureRemoteDispatcher(remote))
	restore, err := InstallDefaultRuntime(runtime)
	require.NoError(t, err)
	t.Cleanup(restore)

	result, err := DispatchWithResult[dynamicCommandMessage, string](context.Background(), dynamicCommandMessage{})
	require.NoError(t, err)
	assert.Equal(t, "remote-command-result", result)
	queryResult, err := Query[dynamicQueryMessage, *dynamicQueryResult](context.Background(), dynamicQueryMessage{})
	require.NoError(t, err)
	assert.Equal(t, "remote-query-result", queryResult.Value)
	require.NoError(t, Dispatch(context.Background(), dynamicCommandMessage{}))
	assert.Equal(t, int32(3), remote.calls.Load())
}

func TestDefaultRuntimeRestoreIsConditionalAndReusableAfterNestedRestore(t *testing.T) {
	original := DefaultRuntime()
	runtimeA := NewRuntime()
	runtimeB := NewRuntime()
	restoreA, err := InstallDefaultRuntime(runtimeA)
	require.NoError(t, err)
	restoreB, err := InstallDefaultRuntime(runtimeB)
	require.NoError(t, err)

	restoreA()
	assert.Same(t, runtimeB, DefaultRuntime())
	restoreB()
	assert.Same(t, runtimeA, DefaultRuntime())
	restoreA()
	assert.Same(t, original, DefaultRuntime())
	restoreA()
	assert.Same(t, original, DefaultRuntime())
}

func TestInstallDefaultRuntimeRejectsNil(t *testing.T) {
	restore, err := InstallDefaultRuntime(nil)
	assert.Error(t, err)
	assert.Nil(t, restore)
}

func TestInstallDefaultRuntimeAtomicallySynchronizesRoutingAndExecutors(t *testing.T) {
	Reset()
	t.Cleanup(Reset)
	require.NoError(t, SetCommandRoutingMode(RoutingModeRich))

	runtime := NewRuntime()
	executor := &captureExecutor{}
	require.NoError(t, runtime.RegisterExecutor(command.ExecutionModeQueued, executor))
	restore, err := InstallDefaultRuntime(runtime)
	require.NoError(t, err)

	assert.Equal(t, RoutingModeExact, CommandRoutingMode())
	installed, ok := ExecutorForMode(command.ExecutionModeQueued)
	require.True(t, ok)
	assert.Same(t, executor, installed)

	restore()
	assert.Equal(t, RoutingModeRich, CommandRoutingMode())
	_, ok = ExecutorForMode(command.ExecutionModeQueued)
	assert.False(t, ok)
}

func TestDispatchWithUsesOneDefaultRuntimeConfigurationGeneration(t *testing.T) {
	Reset()
	t.Cleanup(Reset)
	now := time.Now().UTC()
	oldExecutor := &captureExecutor{receipt: command.DispatchReceipt{Accepted: true, DispatchID: "old", EnqueuedAt: &now}}
	require.NoError(t, RegisterExecutor(command.ExecutionModeQueued, oldExecutor))
	resolver := &blockingModeResolver{entered: make(chan struct{}), release: make(chan struct{})}
	SetModeResolver(resolver)

	dispatchDone := make(chan error, 1)
	go func() {
		_, err := DispatchWith(context.Background(), routingDispatchMessage{}, command.DispatchOptions{})
		dispatchDone <- err
	}()
	<-resolver.entered

	newRuntime := NewRuntime()
	newExecutor := &captureExecutor{receipt: command.DispatchReceipt{Accepted: true, DispatchID: "new", EnqueuedAt: &now}}
	require.NoError(t, newRuntime.RegisterExecutor(command.ExecutionModeQueued, newExecutor))
	restore, err := InstallDefaultRuntime(newRuntime)
	require.NoError(t, err)
	t.Cleanup(restore)
	close(resolver.release)

	require.NoError(t, <-dispatchDone)
	assert.True(t, oldExecutor.called)
	assert.False(t, newExecutor.called)
}

func TestLegacyDispatchPreservesRemoteRejectionClassification(t *testing.T) {
	runtime, provider := buildDynamicRuntime(t)
	registration, ok := provider.RegistrationByMessageType(command.HandlerKindCommand, "dynamic.command")
	require.True(t, ok)
	require.NoError(t, runtime.ReplacePlacementPolicies(command.PlacementPolicy{
		Kind: command.HandlerKindCommand, RegistrationID: registration.ID(),
		Route: command.DispatchRoute{Target: command.DispatchTargetRemote, Name: "worker"},
	}))
	require.NoError(t, runtime.ConfigureRemoteDispatcher(&fakeRemoteDispatcher{dispatch: func(_ context.Context, _ command.DispatchRoute, registration command.MessageRegistration, _ any, _ command.DispatchOptions) (command.DispatchOutcome, error) {
		return command.DispatchOutcome{Receipt: command.DispatchReceipt{
			Accepted: false, Mode: command.ExecutionModeInline, CommandID: registration.ID(),
		}}, nil
	}}))
	restore, err := InstallDefaultRuntime(runtime)
	require.NoError(t, err)
	t.Cleanup(restore)

	receipt, err := DispatchWith(context.Background(), dynamicCommandMessage{}, command.DispatchOptions{})
	assertStructuredTextCode(t, err, command.TextCodeDispatchRejected)
	assert.False(t, receipt.Accepted)
	_, err = DispatchWithResult[dynamicCommandMessage, string](context.Background(), dynamicCommandMessage{})
	var structured *gerrors.Error
	require.True(t, gerrors.As(err, &structured))
	assert.Equal(t, command.TextCodeDispatchRejected, structured.TextCode)
	assert.NotEqual(t, "DISPATCHER_ERROR", structured.TextCode)
	assertStructuredTextCode(t, Dispatch(context.Background(), dynamicCommandMessage{}), command.TextCodeDispatchRejected)
}

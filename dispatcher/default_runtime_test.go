package dispatcher

import (
	"context"
	"testing"

	"github.com/goliatone/go-command"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

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

package command

import (
	"context"
	"reflect"
	"testing"

	gerrors "github.com/goliatone/go-errors"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestPlacementPolicySnapshotValidatesAndResolvesKindQualifiedRoutes(t *testing.T) {
	provider, err := NewMessageRegistrationIndex(
		validCommandRegistration("shared", "command.shared"),
		testRegistration{id: "shared", messageType: "query.shared", kind: HandlerKindQuery, requestType: queryType(), resultType: stringType(), message: &queryMessage{}},
	)
	require.NoError(t, err)
	snapshot, err := NewPlacementPolicySnapshot(provider,
		PlacementPolicy{Kind: HandlerKindCommand, RegistrationID: "shared", Route: DispatchRoute{Target: DispatchTargetRemote, Name: "worker"}},
		PlacementPolicy{Kind: HandlerKindQuery, RegistrationID: "shared", Route: DispatchRoute{Target: DispatchTargetLocal}},
	)
	require.NoError(t, err)

	commandRegistration, _ := provider.RegistrationByID(HandlerKindCommand, "shared")
	route, found, err := snapshot.ResolvePlacement(context.Background(), commandRegistration, DispatchOptions{})
	require.NoError(t, err)
	assert.True(t, found)
	assert.Equal(t, DispatchTargetRemote, route.Target)
	assert.Equal(t, "worker", route.Name)
	assert.Len(t, snapshot.PlacementPolicies(), 2)
}

func TestPlacementPolicySnapshotRejectsUnknownDuplicateAndInvalidRoutes(t *testing.T) {
	provider, err := NewMessageRegistrationIndex(validCommandRegistration("known", "known"))
	require.NoError(t, err)
	_, err = NewPlacementPolicySnapshot(provider, PlacementPolicy{Kind: HandlerKindCommand, RegistrationID: "missing", Route: DispatchRoute{Target: DispatchTargetLocal}})
	assertStructuredRootCode(t, err, TextCodeRegistrationNotFound)
	_, err = NewPlacementPolicySnapshot(provider,
		PlacementPolicy{Kind: HandlerKindCommand, RegistrationID: "known", Route: DispatchRoute{Target: DispatchTargetLocal}},
		PlacementPolicy{Kind: HandlerKindCommand, RegistrationID: "known", Route: DispatchRoute{Target: DispatchTargetLocal}},
	)
	assertStructuredRootCode(t, err, TextCodeRegistrationConflict)
	_, err = NewPlacementPolicySnapshot(provider, PlacementPolicy{Kind: HandlerKindCommand, RegistrationID: "known", Route: DispatchRoute{Target: DispatchTargetRemote}})
	assertStructuredRootCode(t, err, TextCodeInvalidDispatchRoute)
}

func TestPlacementPolicySnapshotRejectsTypedNilProvider(t *testing.T) {
	var provider *MessageRegistrationIndex
	_, err := NewPlacementPolicySnapshot(provider)
	assertStructuredRootCode(t, err, TextCodeRegistrationProviderNotConfigured)
}

func queryType() reflect.Type  { return reflect.TypeFor[queryMessage]() }
func stringType() reflect.Type { return reflect.TypeFor[string]() }

func assertStructuredRootCode(t *testing.T, err error, code string) {
	t.Helper()
	var structured *gerrors.Error
	require.True(t, gerrors.As(err, &structured))
	assert.Equal(t, code, structured.TextCode)
}

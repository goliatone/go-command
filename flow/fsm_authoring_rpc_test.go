package flow

import (
	"context"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"github.com/goliatone/go-command"
	"github.com/goliatone/go-command/rpc"
)

func TestFSMAuthoringRPCMethodFamilyRegistration(t *testing.T) {
	service := newAuthoringRPCService(t, time.Date(2026, time.March, 10, 0, 0, 0, 0, time.UTC))
	server := rpc.NewServer(rpc.WithFailureMode(rpc.FailureModeRecover))
	registry := command.NewRegistry()
	require.NoError(t, registry.AddResolver("rpc-explicit", rpc.Resolver(server)))

	require.NoError(t, RegisterFSMAuthoringRPCCommands(registry, service))
	require.NoError(t, registry.Initialize())

	endpoints := server.Endpoints()
	require.Len(t, endpoints, 7)
	assert.Equal(t, []string{
		FSMRPCMethodAuthoringDeleteMachine,
		FSMRPCMethodAuthoringExport,
		FSMRPCMethodAuthoringGetMachine,
		FSMRPCMethodAuthoringListMachines,
		FSMRPCMethodAuthoringPublish,
		FSMRPCMethodAuthoringSaveDraft,
		FSMRPCMethodAuthoringValidate,
	}, []string{
		endpoints[0].Method,
		endpoints[1].Method,
		endpoints[2].Method,
		endpoints[3].Method,
		endpoints[4].Method,
		endpoints[5].Method,
		endpoints[6].Method,
	})

	list, ok := server.Endpoint(FSMRPCMethodAuthoringListMachines)
	require.True(t, ok)
	assert.Equal(t, rpc.HandlerKindQuery, list.HandlerKind)
	require.NotNil(t, list.RequestType)
	assert.Contains(t, list.RequestType.GoType, "RequestEnvelope")

	getMachine, ok := server.Endpoint(FSMRPCMethodAuthoringGetMachine)
	require.True(t, ok)
	assert.Equal(t, rpc.HandlerKindQuery, getMachine.HandlerKind)

	save, ok := server.Endpoint(FSMRPCMethodAuthoringSaveDraft)
	require.True(t, ok)
	assert.Equal(t, rpc.HandlerKindExecute, save.HandlerKind)

	validate, ok := server.Endpoint(FSMRPCMethodAuthoringValidate)
	require.True(t, ok)
	assert.Equal(t, rpc.HandlerKindQuery, validate.HandlerKind)

	publish, ok := server.Endpoint(FSMRPCMethodAuthoringPublish)
	require.True(t, ok)
	assert.Equal(t, rpc.HandlerKindExecute, publish.HandlerKind)

	deleteMachine, ok := server.Endpoint(FSMRPCMethodAuthoringDeleteMachine)
	require.True(t, ok)
	assert.Equal(t, rpc.HandlerKindExecute, deleteMachine.HandlerKind)

	export, ok := server.Endpoint(FSMRPCMethodAuthoringExport)
	require.True(t, ok)
	assert.Equal(t, rpc.HandlerKindQuery, export.HandlerKind)
}

func TestFSMAuthoringRPCEndpointsLifecycleAndEnvelopeShape(t *testing.T) {
	now := time.Date(2026, time.March, 10, 0, 0, 0, 0, time.UTC)
	service := newAuthoringRPCService(t, now)
	server := registerAuthoringRPCServer(t, service)

	validate := true
	saveOut, err := server.Invoke(context.Background(), FSMRPCMethodAuthoringSaveDraft, rpc.RequestEnvelope[FSMAuthoringSaveDraftRequest]{
		Data: FSMAuthoringSaveDraftRequest{
			MachineID: "orders",
			Draft:     testAuthoringDraft("orders", "v12", "publishAudit"),
			Validate:  &validate,
		},
		Meta: rpc.RequestMeta{ActorID: "dev-1", Tenant: "acme", RequestID: "save-1"},
	})
	require.NoError(t, err)

	saveEnvelope, ok := saveOut.(rpc.ResponseEnvelope[FSMAuthoringSaveDraftResponse])
	require.True(t, ok)
	assert.Equal(t, "orders", saveEnvelope.Data.MachineID)
	assert.Equal(t, "v12", saveEnvelope.Data.Version)
	assert.Equal(t, "orders-v12", saveEnvelope.Data.ETag)
	assert.True(t, saveEnvelope.Data.DraftState.IsDraft)
	require.Len(t, saveEnvelope.Data.Diagnostics, 0)

	listOut, err := server.Invoke(context.Background(), FSMRPCMethodAuthoringListMachines, rpc.RequestEnvelope[FSMAuthoringListMachinesRequest]{
		Data: FSMAuthoringListMachinesRequest{},
		Meta: rpc.RequestMeta{Tenant: "acme", RequestID: "list-1"},
	})
	require.NoError(t, err)
	listEnvelope, ok := listOut.(rpc.ResponseEnvelope[FSMAuthoringListMachinesResponse])
	require.True(t, ok)
	require.Len(t, listEnvelope.Data.Items, 1)
	assert.Equal(t, "orders", listEnvelope.Data.Items[0].MachineID)
	assert.True(t, listEnvelope.Data.Items[0].IsDraft)

	getOut, err := server.Invoke(context.Background(), FSMRPCMethodAuthoringGetMachine, rpc.RequestEnvelope[FSMAuthoringGetMachineRequest]{
		Data: FSMAuthoringGetMachineRequest{MachineID: "orders", PreferDraft: boolPtr(true)},
		Meta: rpc.RequestMeta{Tenant: "acme", RequestID: "get-1"},
	})
	require.NoError(t, err)
	getEnvelope, ok := getOut.(rpc.ResponseEnvelope[FSMAuthoringGetMachineResponse])
	require.True(t, ok)
	assert.Equal(t, "orders", getEnvelope.Data.MachineID)
	assert.Equal(t, "v12", getEnvelope.Data.Version)
	assert.Equal(t, "orders-v12", getEnvelope.Data.ETag)

	validateOut, err := server.Invoke(context.Background(), FSMRPCMethodAuthoringValidate, rpc.RequestEnvelope[FSMAuthoringValidateRequest]{
		Data: FSMAuthoringValidateRequest{MachineID: "orders"},
		Meta: rpc.RequestMeta{Tenant: "acme", RequestID: "validate-1"},
	})
	require.NoError(t, err)
	validateEnvelope, ok := validateOut.(rpc.ResponseEnvelope[FSMAuthoringValidateResponse])
	require.True(t, ok)
	assert.True(t, validateEnvelope.Data.Valid)

	publishOut, err := server.Invoke(context.Background(), FSMRPCMethodAuthoringPublish, rpc.RequestEnvelope[FSMAuthoringPublishRequest]{
		Data: FSMAuthoringPublishRequest{MachineID: "orders", ExpectedVersion: saveEnvelope.Data.Version},
		Meta: rpc.RequestMeta{Tenant: "acme", RequestID: "publish-1"},
	})
	require.NoError(t, err)
	publishEnvelope, ok := publishOut.(rpc.ResponseEnvelope[FSMAuthoringPublishResponse])
	require.True(t, ok)
	assert.Equal(t, "orders", publishEnvelope.Data.MachineID)
	assert.Equal(t, "v13", publishEnvelope.Data.Version)
	require.Len(t, publishEnvelope.Data.Diagnostics, 0)

	deleteOut, err := server.Invoke(context.Background(), FSMRPCMethodAuthoringDeleteMachine, rpc.RequestEnvelope[FSMAuthoringDeleteMachineRequest]{
		Data: FSMAuthoringDeleteMachineRequest{MachineID: "orders", ExpectedVersion: publishEnvelope.Data.Version},
		Meta: rpc.RequestMeta{Tenant: "acme", RequestID: "delete-1"},
	})
	require.NoError(t, err)
	deleteEnvelope, ok := deleteOut.(rpc.ResponseEnvelope[FSMAuthoringDeleteMachineResponse])
	require.True(t, ok)
	assert.Equal(t, "orders", deleteEnvelope.Data.MachineID)
	assert.True(t, deleteEnvelope.Data.Deleted)
}

func TestFSMAuthoringRPCEndpointsPayloadValidationAndErrorMapping(t *testing.T) {
	now := time.Date(2026, time.March, 10, 0, 0, 0, 0, time.UTC)
	service := newAuthoringRPCService(t, now)
	server := registerAuthoringRPCServer(t, service)

	_, err := server.Invoke(context.Background(), FSMRPCMethodAuthoringGetMachine, struct{}{})
	require.Error(t, err)
	assert.Contains(t, err.Error(), "invalid payload type")

	_, err = server.Invoke(context.Background(), FSMRPCMethodAuthoringGetMachine, rpc.RequestEnvelope[FSMAuthoringGetMachineRequest]{
		Data: FSMAuthoringGetMachineRequest{MachineID: "missing"},
	})
	require.Error(t, err)
	notFoundRPC := RPCErrorForError(err)
	require.NotNil(t, notFoundRPC)
	assert.Equal(t, ErrCodeAuthoringNotFound, notFoundRPC.Code)
	assert.Equal(t, "bad_input", notFoundRPC.Category)

	validate := false
	saveOut, err := server.Invoke(context.Background(), FSMRPCMethodAuthoringSaveDraft, rpc.RequestEnvelope[FSMAuthoringSaveDraftRequest]{
		Data: FSMAuthoringSaveDraftRequest{
			MachineID: "orders",
			Draft:     testAuthoringDraft("orders", "v1", "unknown_action"),
			Validate:  &validate,
		},
	})
	require.NoError(t, err)
	saved := saveOut.(rpc.ResponseEnvelope[FSMAuthoringSaveDraftResponse]).Data

	_, err = server.Invoke(context.Background(), FSMRPCMethodAuthoringPublish, rpc.RequestEnvelope[FSMAuthoringPublishRequest]{
		Data: FSMAuthoringPublishRequest{MachineID: "orders", ExpectedVersion: saved.Version},
	})
	require.Error(t, err)
	validationRPC := RPCErrorForError(err)
	require.NotNil(t, validationRPC)
	assert.Equal(t, ErrCodeAuthoringValidationFailed, validationRPC.Code)
	require.NotNil(t, validationRPC.Details)
	assert.Equal(t, ErrCodeAuthoringValidationFailed, validationRPC.Details["runtime_code"])
	assert.Contains(t, validationRPC.Details, "diagnostics")

	_, err = server.Invoke(context.Background(), FSMRPCMethodAuthoringExport, rpc.RequestEnvelope[FSMAuthoringExportRequest]{
		Data: FSMAuthoringExportRequest{MachineID: "orders", Format: "json"},
	})
	require.Error(t, err)
	exportRPC := RPCErrorForError(err)
	require.NotNil(t, exportRPC)
	assert.Equal(t, ErrCodePreconditionFailed, exportRPC.Code)
	assert.Contains(t, exportRPC.Message, "authoring export capability unavailable")
}

func registerAuthoringRPCServer(t *testing.T, service *AuthoringService) *rpc.Server {
	t.Helper()
	server := rpc.NewServer(rpc.WithFailureMode(rpc.FailureModeRecover))
	registry := command.NewRegistry()
	require.NoError(t, registry.AddResolver("rpc-explicit", rpc.Resolver(server)))
	require.NoError(t, RegisterFSMAuthoringRPCCommands(registry, service))
	require.NoError(t, registry.Initialize())
	return server
}

func newAuthoringRPCService(t *testing.T, now time.Time) *AuthoringService {
	t.Helper()
	store := NewInMemoryAuthoringStore()
	catalog := &EditorCatalog{Steps: []CatalogItem{{ID: "publishAudit", Label: "publishAudit"}}}
	return NewAuthoringService(store, catalog).WithClock(func() time.Time { return now })
}

func boolPtr(value bool) *bool {
	return &value
}

package flow

import (
	"encoding/json"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"github.com/goliatone/go-command/rpc"
)

func TestFSMAuthoringMethodConstants(t *testing.T) {
	assert.Equal(t, "fsm.authoring.list_machines", FSMRPCMethodAuthoringListMachines)
	assert.Equal(t, "fsm.authoring.get_machine", FSMRPCMethodAuthoringGetMachine)
	assert.Equal(t, "fsm.authoring.save_draft", FSMRPCMethodAuthoringSaveDraft)
	assert.Equal(t, "fsm.authoring.validate", FSMRPCMethodAuthoringValidate)
	assert.Equal(t, "fsm.authoring.publish", FSMRPCMethodAuthoringPublish)
	assert.Equal(t, "fsm.authoring.delete_machine", FSMRPCMethodAuthoringDeleteMachine)
}

func TestFSMAuthoringListMachinesEnvelopeJSONShape(t *testing.T) {
	includeDrafts := true
	limit := 50

	req := rpc.RequestEnvelope[FSMAuthoringListMachinesRequest]{
		Data: FSMAuthoringListMachinesRequest{
			Query:         "orders",
			IncludeDrafts: &includeDrafts,
			Limit:         &limit,
			Cursor:        "cursor-1",
		},
		Meta: rpc.RequestMeta{ActorID: "dev-1", Tenant: "acme"},
	}
	encoded := decodeJSONMap(t, mustJSONMarshal(t, req))
	data := requireMap(t, encoded, "data")
	meta := requireMap(t, encoded, "meta")

	assert.Equal(t, "orders", data["query"])
	assert.Equal(t, true, data["includeDrafts"])
	assert.Equal(t, float64(50), data["limit"])
	assert.Equal(t, "cursor-1", data["cursor"])
	assert.Equal(t, "dev-1", meta["actorId"])
	assert.Equal(t, "acme", meta["tenant"])

	res := rpc.ResponseEnvelope[FSMAuthoringListMachinesResponse]{
		Data: FSMAuthoringListMachinesResponse{
			Items: []FSMMachineSummary{
				{
					MachineID: "orders",
					Name:      "Orders",
					Version:   "v12",
					IsDraft:   true,
					UpdatedAt: "2026-03-10T00:00:00Z",
				},
			},
			NextCursor: "cursor-2",
		},
	}
	response := decodeJSONMap(t, mustJSONMarshal(t, res))
	out := requireMap(t, response, "data")
	items, ok := out["items"].([]any)
	require.True(t, ok)
	require.Len(t, items, 1)
	item, ok := items[0].(map[string]any)
	require.True(t, ok)
	assert.Equal(t, "orders", item["machineId"])
	assert.Equal(t, true, item["isDraft"])
	assert.Equal(t, "cursor-2", out["nextCursor"])
}

func TestFSMAuthoringSaveDraftAndPublishEnvelopeJSONShape(t *testing.T) {
	validate := true
	now := time.Date(2026, time.March, 10, 0, 0, 0, 0, time.UTC)
	draft := DraftMachineDocument{
		Definition: &MachineDefinition{ID: "orders", Version: "v12"},
		UISchema:   &MachineUISchema{Layout: "flow"},
		DraftState: DraftState{
			IsDraft:     true,
			LastSavedAt: now,
		},
	}

	saveReq := rpc.RequestEnvelope[FSMAuthoringSaveDraftRequest]{
		Data: FSMAuthoringSaveDraftRequest{
			MachineID:   "orders",
			BaseVersion: "v11",
			Draft:       draft,
			Validate:    &validate,
		},
	}

	saveReqDecoded := decodeJSONMap(t, mustJSONMarshal(t, saveReq))
	saveReqData := requireMap(t, saveReqDecoded, "data")
	assert.Equal(t, "orders", saveReqData["machineId"])
	assert.Equal(t, "v11", saveReqData["baseVersion"])
	assert.Equal(t, true, saveReqData["validate"])

	saveRes := rpc.ResponseEnvelope[FSMAuthoringSaveDraftResponse]{
		Data: FSMAuthoringSaveDraftResponse{
			MachineID:   "orders",
			Version:     "v12",
			DraftState:  draft.DraftState,
			Diagnostics: []ValidationDiagnostic{},
			ETag:        "etag-v12",
		},
	}
	saveResDecoded := decodeJSONMap(t, mustJSONMarshal(t, saveRes))
	saveResData := requireMap(t, saveResDecoded, "data")
	draftState := requireMap(t, saveResData, "draftState")
	assert.Equal(t, true, draftState["is_draft"])
	assert.Equal(t, "etag-v12", saveResData["etag"])

	publishReq := rpc.RequestEnvelope[FSMAuthoringPublishRequest]{
		Data: FSMAuthoringPublishRequest{
			MachineID:       "orders",
			ExpectedVersion: "v12",
			Draft:           &draft,
		},
	}
	publishReqDecoded := decodeJSONMap(t, mustJSONMarshal(t, publishReq))
	publishReqData := requireMap(t, publishReqDecoded, "data")
	assert.Equal(t, "orders", publishReqData["machineId"])
	assert.Equal(t, "v12", publishReqData["expectedVersion"])

	publishRes := rpc.ResponseEnvelope[FSMAuthoringPublishResponse]{
		Data: FSMAuthoringPublishResponse{
			MachineID:   "orders",
			Version:     "v13",
			PublishedAt: "2026-03-10T00:05:00Z",
			Diagnostics: []ValidationDiagnostic{},
		},
	}
	publishResDecoded := decodeJSONMap(t, mustJSONMarshal(t, publishRes))
	publishResData := requireMap(t, publishResDecoded, "data")
	assert.Equal(t, "v13", publishResData["version"])
	assert.Equal(t, "2026-03-10T00:05:00Z", publishResData["publishedAt"])
}

func TestFSMAuthoringValidateAndDeleteEnvelopeJSONShape(t *testing.T) {
	req := rpc.RequestEnvelope[FSMAuthoringValidateRequest]{
		Data: FSMAuthoringValidateRequest{
			MachineID: "orders",
			Scope: &FSMAuthoringValidationScope{
				NodeIDs: []string{"n-1", "n-2"},
			},
		},
	}
	reqDecoded := decodeJSONMap(t, mustJSONMarshal(t, req))
	reqData := requireMap(t, reqDecoded, "data")
	scope := requireMap(t, reqData, "scope")
	nodeIDs, ok := scope["nodeIds"].([]any)
	require.True(t, ok)
	require.Len(t, nodeIDs, 2)
	assert.Equal(t, "n-1", nodeIDs[0])

	res := rpc.ResponseEnvelope[FSMAuthoringValidateResponse]{
		Data: FSMAuthoringValidateResponse{
			Valid: true,
			Diagnostics: []ValidationDiagnostic{
				{Code: "FSM001_UNRESOLVED_ACTION", Path: "/transitions/0/workflow/nodes/0"},
			},
		},
	}
	resDecoded := decodeJSONMap(t, mustJSONMarshal(t, res))
	resData := requireMap(t, resDecoded, "data")
	assert.Equal(t, true, resData["valid"])

	deleteReq := rpc.RequestEnvelope[FSMAuthoringDeleteMachineRequest]{
		Data: FSMAuthoringDeleteMachineRequest{
			MachineID:       "orders",
			ExpectedVersion: "v13",
			HardDelete:      true,
		},
	}
	deleteReqDecoded := decodeJSONMap(t, mustJSONMarshal(t, deleteReq))
	deleteReqData := requireMap(t, deleteReqDecoded, "data")
	assert.Equal(t, true, deleteReqData["hardDelete"])

	deleteRes := rpc.ResponseEnvelope[FSMAuthoringDeleteMachineResponse]{
		Data: FSMAuthoringDeleteMachineResponse{
			MachineID: "orders",
			Deleted:   true,
		},
	}
	deleteResDecoded := decodeJSONMap(t, mustJSONMarshal(t, deleteRes))
	deleteResData := requireMap(t, deleteResDecoded, "data")
	assert.Equal(t, "orders", deleteResData["machineId"])
	assert.Equal(t, true, deleteResData["deleted"])
}

func mustJSONMarshal(t *testing.T, v any) []byte {
	t.Helper()
	raw, err := json.Marshal(v)
	require.NoError(t, err)
	return raw
}

func decodeJSONMap(t *testing.T, raw []byte) map[string]any {
	t.Helper()
	var out map[string]any
	require.NoError(t, json.Unmarshal(raw, &out))
	return out
}

func requireMap(t *testing.T, source map[string]any, key string) map[string]any {
	t.Helper()
	value, ok := source[key]
	require.True(t, ok)
	out, ok := value.(map[string]any)
	require.True(t, ok)
	return out
}

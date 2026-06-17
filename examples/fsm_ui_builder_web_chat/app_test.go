package main

import (
	"bytes"
	"context"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/gofiber/fiber/v2"
)

type rpcEnvelope struct {
	Data  json.RawMessage `json:"data"`
	Error map[string]any  `json:"error"`
	Extra map[string]any  `json:"-"`
}

func TestRPCIntegrationAndEndpoints(t *testing.T) {
	_, app := newTestHTTPApp(t)

	getMachine := rpcCall(t, app, BotMethodChatSend, map[string]any{
		"message": "/help",
	})
	if getMachine.Error != nil {
		t.Fatalf("unexpected bot.chat.send error: %#v", getMachine.Error)
	}

	authoring := rpcCall(t, app, flowMethodAuthoringGetMachine, map[string]any{
		"machineId":   defaultMachineID,
		"preferDraft": true,
	})
	if authoring.Error != nil {
		t.Fatalf("unexpected fsm.authoring.get_machine error: %#v", authoring.Error)
	}

	var machineData struct {
		MachineID string `json:"machineId"`
		Version   string `json:"version"`
	}
	decodeJSON(t, authoring.Data, &machineData)
	if machineData.MachineID != defaultMachineID {
		t.Fatalf("machine id mismatch: got %q", machineData.MachineID)
	}
	if machineData.Version == "" {
		t.Fatal("expected non-empty machine version")
	}

	validated := rpcCall(t, app, flowMethodAuthoringValidate, map[string]any{
		"machineId": defaultMachineID,
	})
	if validated.Error != nil {
		t.Fatalf("unexpected validate error: %#v", validated.Error)
	}

	published := rpcCall(t, app, flowMethodAuthoringPublish, map[string]any{
		"machineId":       defaultMachineID,
		"expectedVersion": machineData.Version,
	})
	if published.Error != nil {
		t.Fatalf("unexpected publish error: %#v", published.Error)
	}

	apply := rpcCall(t, app, flowMethodApplyEvent, map[string]any{
		"machineId": defaultMachineID,
		"entityId":  "order-1",
		"event":     "approve",
		"msg": map[string]any{
			"entityId": "order-1",
			"event":    "approve",
			"amount":   120,
		},
		"dryRun": true,
	})
	if apply.Error != nil {
		t.Fatalf("unexpected apply_event error: %#v", apply.Error)
	}

	var applyData map[string]any
	decodeJSON(t, apply.Data, &applyData)
	if applyData["EventID"] == nil {
		t.Fatal("expected EventID field in apply_event response")
	}

	snapshot := rpcCall(t, app, flowMethodSnapshot, map[string]any{
		"machineId":      defaultMachineID,
		"entityId":       "order-approved",
		"msg":            map[string]any{"amount": 120},
		"evaluateGuards": true,
		"includeBlocked": true,
	})
	if snapshot.Error != nil {
		t.Fatalf("unexpected snapshot error: %#v", snapshot.Error)
	}

	var snapshotData map[string]any
	decodeJSON(t, snapshot.Data, &snapshotData)
	transitions, _ := snapshotData["AllowedTransitions"].([]any)
	if len(transitions) == 0 {
		t.Fatal("expected transitions in snapshot response")
	}

	blockedFound := false
	for _, item := range transitions {
		transition, _ := item.(map[string]any)
		if allowed, ok := transition["Allowed"].(bool); ok && !allowed {
			blockedFound = true
		}
	}
	if !blockedFound {
		t.Fatal("expected at least one blocked transition in snapshot")
	}

	endpointsResp := httpRequest(t, app, http.MethodGet, "/api/rpc/endpoints", nil)
	if endpointsResp.StatusCode != http.StatusOK {
		t.Fatalf("endpoints status mismatch: got %d", endpointsResp.StatusCode)
	}

	var endpointsPayload map[string]any
	decodeJSON(t, readBody(t, endpointsResp.Body), &endpointsPayload)
	items, _ := endpointsPayload["endpoints"].([]any)
	if len(items) == 0 {
		t.Fatal("expected non-empty endpoints list")
	}
	assertEndpointExists(t, items, flowMethodAuthoringGetMachine)
	assertEndpointExists(t, items, BotMethodChatSend)
	assertEndpointExists(t, items, BotMethodChatHistory)
	assertEndpointExists(t, items, BotMethodChatClear)
}

func TestHostSmokeAndScriptedChatFlow(t *testing.T) {
	_, app := newTestHTTPApp(t)

	bootstrapResp := httpRequest(t, app, http.MethodGet, "/api/bootstrap", nil)
	if bootstrapResp.StatusCode != http.StatusOK {
		t.Fatalf("bootstrap status mismatch: got %d", bootstrapResp.StatusCode)
	}
	var bootstrapPayload map[string]any
	decodeJSON(t, readBody(t, bootstrapResp.Body), &bootstrapPayload)
	initialDocument, _ := bootstrapPayload["initialDocument"].(map[string]any)
	definition, _ := initialDocument["definition"].(map[string]any)
	if definition == nil {
		t.Fatal("bootstrap payload missing initialDocument.definition")
	}
	if _, ok := definition["states"]; !ok {
		t.Fatal("bootstrap definition missing lowercase states")
	}
	if _, ok := definition["transitions"]; !ok {
		t.Fatal("bootstrap definition missing lowercase transitions")
	}
	if _, hasPascal := definition["States"]; hasPascal {
		t.Fatal("bootstrap definition contains unexpected PascalCase States field")
	}

	indexResp := httpRequest(t, app, http.MethodGet, "/", nil)
	if indexResp.StatusCode != http.StatusOK {
		t.Fatalf("index status mismatch: got %d", indexResp.StatusCode)
	}
	indexBody := string(readBody(t, indexResp.Body))
	if !strings.Contains(indexBody, "FSM UI Builder") {
		t.Fatal("expected host title in index response")
	}

	jsResp := httpRequest(t, app, http.MethodGet, "/builder/index.js", nil)
	if jsResp.StatusCode != http.StatusOK {
		t.Fatalf("builder js status mismatch: got %d", jsResp.StatusCode)
	}
	if len(readBody(t, jsResp.Body)) == 0 {
		t.Fatal("expected non-empty /builder/index.js")
	}

	cssResp := httpRequest(t, app, http.MethodGet, "/builder/index.css", nil)
	if cssResp.StatusCode != http.StatusOK {
		t.Fatalf("builder css status mismatch: got %d", cssResp.StatusCode)
	}
	if len(readBody(t, cssResp.Body)) == 0 {
		t.Fatal("expected non-empty /builder/index.css")
	}

	fsmClientResp := httpRequest(t, app, http.MethodGet, "/client/fsm/index.js", nil)
	if fsmClientResp.StatusCode != http.StatusOK {
		t.Fatalf("fsm client js status mismatch: got %d", fsmClientResp.StatusCode)
	}
	if len(readBody(t, fsmClientResp.Body)) == 0 {
		t.Fatal("expected non-empty /client/fsm/index.js")
	}

	clientResp := httpRequest(t, app, http.MethodGet, "/public/app.mjs", nil)
	if clientResp.StatusCode != http.StatusOK {
		t.Fatalf("client app status mismatch: got %d", clientResp.StatusCode)
	}
	clientBody := string(readBody(t, clientResp.Body))
	if !strings.Contains(clientBody, "/api/rpc") {
		t.Fatal("expected /api/rpc endpoint override in app.mjs")
	}

	validateReply := rpcCall(t, app, BotMethodChatSend, map[string]any{
		"machineId": defaultMachineID,
		"message":   "/validate",
	})
	if validateReply.Error != nil {
		t.Fatalf("unexpected validate chat error: %#v", validateReply.Error)
	}

	var validateData BotChatSendResponse
	decodeJSON(t, validateReply.Data, &validateData)
	if !strings.Contains(strings.ToLower(validateData.Reply), "validation") {
		t.Fatalf("expected validation reply, got %q", validateData.Reply)
	}

	simulateReply := rpcCall(t, app, BotMethodChatSend, map[string]any{
		"sessionId": validateData.SessionID,
		"machineId": defaultMachineID,
		"message":   "/simulate approve order-1",
	})
	if simulateReply.Error != nil {
		t.Fatalf("unexpected simulate chat error: %#v", simulateReply.Error)
	}

	var simulateData BotChatSendResponse
	decodeJSON(t, simulateReply.Data, &simulateData)
	if !strings.Contains(strings.ToLower(simulateData.Reply), "blocked") {
		t.Fatalf("expected simulate reply mentioning blocked transitions, got %q", simulateData.Reply)
	}
}

func newTestHTTPApp(t *testing.T) (*App, *fiber.App) {
	t.Helper()

	application, err := NewApp(context.Background())
	if err != nil {
		t.Fatalf("new app: %v", err)
	}
	server := buildServer()
	if err := application.SetupRoutes(server.Router()); err != nil {
		t.Fatalf("setup routes: %v", err)
	}
	return application, server.WrappedRouter()
}

func rpcCall(t *testing.T, app *fiber.App, method string, data map[string]any) rpcEnvelope {
	t.Helper()

	payload := map[string]any{
		"jsonrpc": "2.0",
		"id":      "req-1",
		"method":  method,
		"params": map[string]any{
			"data": data,
		},
	}
	body, err := json.Marshal(payload)
	if err != nil {
		t.Fatalf("marshal payload: %v", err)
	}

	resp := httpRequest(t, app, http.MethodPost, "/api/rpc", bytes.NewReader(body))
	if resp.StatusCode != http.StatusOK {
		t.Fatalf("rpc status mismatch for %s: got %d", method, resp.StatusCode)
	}

	var envelope rpcEnvelope
	decodeJSON(t, readBody(t, resp.Body), &envelope)
	return envelope
}

func httpRequest(t *testing.T, app *fiber.App, method, target string, body io.Reader) *http.Response {
	t.Helper()

	req := httptest.NewRequest(method, target, body)
	if body != nil {
		req.Header.Set("Content-Type", "application/json")
	}
	resp, err := app.Test(req)
	if err != nil {
		t.Fatalf("request %s %s failed: %v", method, target, err)
	}
	return resp
}

func readBody(t *testing.T, body io.ReadCloser) []byte {
	t.Helper()
	defer body.Close()
	content, err := io.ReadAll(body)
	if err != nil {
		t.Fatalf("read body: %v", err)
	}
	return content
}

func decodeJSON(t *testing.T, payload []byte, target any) {
	t.Helper()
	if err := json.Unmarshal(payload, target); err != nil {
		t.Fatalf("decode json: %v\npayload: %s", err, string(payload))
	}
}

func assertEndpointExists(t *testing.T, endpoints []any, method string) {
	t.Helper()
	for _, item := range endpoints {
		entry, ok := item.(map[string]any)
		if !ok {
			continue
		}
		if entry["method"] == method {
			return
		}
	}
	t.Fatalf("endpoint %s not found", method)
}

const (
	flowMethodApplyEvent          = "fsm.apply_event"
	flowMethodSnapshot            = "fsm.snapshot"
	flowMethodAuthoringGetMachine = "fsm.authoring.get_machine"
	flowMethodAuthoringValidate   = "fsm.authoring.validate"
	flowMethodAuthoringPublish    = "fsm.authoring.publish"
)

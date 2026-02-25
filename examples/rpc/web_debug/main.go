package main

import (
	"context"
	"embed"
	"encoding/json"
	"errors"
	"fmt"
	"io/fs"
	"log"
	"net/http"
	"reflect"
	"strings"
	"sync"
	"time"

	"github.com/goliatone/go-command"
	cmdrpc "github.com/goliatone/go-command/rpc"
)

//go:embed public/*
var publicFiles embed.FS

type CounterState struct {
	Value         int       `json:"value"`
	LastActorID   string    `json:"lastActorId,omitempty"`
	LastRequestID string    `json:"lastRequestId,omitempty"`
	UpdatedAt     time.Time `json:"updatedAt"`
}

type CounterStore struct {
	mu    sync.RWMutex
	state CounterState
}

func NewCounterStore() *CounterStore {
	return &CounterStore{state: CounterState{UpdatedAt: time.Now().UTC()}}
}

func (s *CounterStore) Increment(amount int, actorID, requestID string) {
	s.mu.Lock()
	defer s.mu.Unlock()

	if amount == 0 {
		amount = 1
	}
	s.state.Value += amount
	s.state.LastActorID = actorID
	s.state.LastRequestID = requestID
	s.state.UpdatedAt = time.Now().UTC()
}

func (s *CounterStore) Reset(actorID, requestID string) {
	s.mu.Lock()
	defer s.mu.Unlock()

	s.state.Value = 0
	s.state.LastActorID = actorID
	s.state.LastRequestID = requestID
	s.state.UpdatedAt = time.Now().UTC()
}

func (s *CounterStore) Snapshot() CounterState {
	s.mu.RLock()
	defer s.mu.RUnlock()
	return s.state
}

type IncrementCounterData struct {
	Amount int `json:"amount"`
}

type ResetCounterData struct{}

type SnapshotCounterData struct{}

type IncrementCounterRPCCommand struct {
	store *CounterStore
}

func (c *IncrementCounterRPCCommand) apply(_ context.Context, req cmdrpc.RequestEnvelope[IncrementCounterData]) (cmdrpc.ResponseEnvelope[struct{}], error) {
	if c == nil || c.store == nil {
		return cmdrpc.ResponseEnvelope[struct{}]{}, errors.New("increment command not configured")
	}
	c.store.Increment(req.Data.Amount, req.Meta.ActorID, req.Meta.RequestID)
	return cmdrpc.ResponseEnvelope[struct{}]{}, nil
}

func (c *IncrementCounterRPCCommand) RPCEndpoints() []cmdrpc.EndpointDefinition {
	return []cmdrpc.EndpointDefinition{
		cmdrpc.NewEndpoint[IncrementCounterData, struct{}](
			cmdrpc.EndpointSpec{
				Method:      "counter.increment",
				Kind:        cmdrpc.MethodKindCommand,
				Summary:     "Increment counter",
				Description: "Increase counter value by the provided amount (defaults to 1).",
				Tags:        []string{"counter", "write"},
				Permissions: []string{"counter:write"},
				Roles:       []string{"editor", "admin"},
				Since:       "v1.0.0",
			},
			c.apply,
		),
	}
}

type ResetCounterRPCCommand struct {
	store *CounterStore
}

func (c *ResetCounterRPCCommand) apply(_ context.Context, req cmdrpc.RequestEnvelope[ResetCounterData]) (cmdrpc.ResponseEnvelope[struct{}], error) {
	if c == nil || c.store == nil {
		return cmdrpc.ResponseEnvelope[struct{}]{}, errors.New("reset command not configured")
	}
	c.store.Reset(req.Meta.ActorID, req.Meta.RequestID)
	return cmdrpc.ResponseEnvelope[struct{}]{}, nil
}

func (c *ResetCounterRPCCommand) RPCEndpoints() []cmdrpc.EndpointDefinition {
	return []cmdrpc.EndpointDefinition{
		cmdrpc.NewEndpoint[ResetCounterData, struct{}](
			cmdrpc.EndpointSpec{
				Method:      "counter.reset",
				Kind:        cmdrpc.MethodKindCommand,
				Summary:     "Reset counter",
				Description: "Set counter value back to zero.",
				Tags:        []string{"counter", "write"},
				Permissions: []string{"counter:write"},
				Roles:       []string{"admin"},
				Since:       "v1.0.0",
			},
			c.apply,
		),
	}
}

type CounterSnapshotRPCQuery struct {
	store *CounterStore
}

func (q *CounterSnapshotRPCQuery) Query(_ context.Context, req cmdrpc.RequestEnvelope[SnapshotCounterData]) (cmdrpc.ResponseEnvelope[CounterState], error) {
	if q == nil || q.store == nil {
		return cmdrpc.ResponseEnvelope[CounterState]{}, errors.New("snapshot query not configured")
	}
	state := q.store.Snapshot()
	if req.Meta.ActorID != "" {
		state.LastActorID = req.Meta.ActorID
	}
	if req.Meta.RequestID != "" {
		state.LastRequestID = req.Meta.RequestID
	}
	return cmdrpc.ResponseEnvelope[CounterState]{Data: state}, nil
}

func (q *CounterSnapshotRPCQuery) RPCEndpoints() []cmdrpc.EndpointDefinition {
	return []cmdrpc.EndpointDefinition{
		cmdrpc.NewEndpoint[SnapshotCounterData, CounterState](
			cmdrpc.EndpointSpec{
				Method:      "counter.snapshot",
				Kind:        cmdrpc.MethodKindQuery,
				Summary:     "Counter snapshot",
				Description: "Read the current counter state.",
				Tags:        []string{"counter", "read"},
				Permissions: []string{"counter:read"},
				Roles:       []string{"viewer", "editor", "admin"},
				Idempotent:  true,
				Since:       "v1.0.0",
			},
			q.Query,
		),
	}
}

type App struct {
	rpc   *cmdrpc.Server
	store *CounterStore
}

func NewApp() (*App, error) {
	rpcServer := cmdrpc.NewServer(cmdrpc.WithFailureMode(cmdrpc.FailureModeRecover))
	reg := command.NewRegistry()
	if err := reg.AddResolver("rpc-endpoints", cmdrpc.Resolver(rpcServer)); err != nil {
		return nil, fmt.Errorf("add rpc resolver: %w", err)
	}
	store := NewCounterStore()

	commands := []any{
		&IncrementCounterRPCCommand{store: store},
		&ResetCounterRPCCommand{store: store},
		&CounterSnapshotRPCQuery{store: store},
	}
	for _, cmd := range commands {
		if err := reg.RegisterCommand(cmd); err != nil {
			return nil, fmt.Errorf("register rpc endpoint provider: %w", err)
		}
	}
	if err := reg.Initialize(); err != nil {
		return nil, fmt.Errorf("initialize registry: %w", err)
	}

	return &App{rpc: rpcServer, store: store}, nil
}

func (a *App) Routes() http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("/", a.handleIndex)
	mux.Handle("/public/", http.StripPrefix("/public/", a.staticFiles()))
	mux.HandleFunc("/api/endpoints", a.handleEndpoints)
	mux.HandleFunc("/api/state", a.handleState)
	mux.HandleFunc("/api/rpc", a.handleRPC)
	return mux
}

func (a *App) staticFiles() http.Handler {
	sub, err := fs.Sub(publicFiles, "public")
	if err != nil {
		panic(err)
	}
	return http.FileServer(http.FS(sub))
}

func (a *App) handleIndex(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.NotFound(w, r)
		return
	}
	content, err := publicFiles.ReadFile("public/index.html")
	if err != nil {
		http.Error(w, "failed to load index", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	_, _ = w.Write(content)
}

func (a *App) handleEndpoints(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		a.writeRPCError(w, http.StatusMethodNotAllowed, "method not allowed")
		return
	}
	a.writeJSON(w, http.StatusOK, map[string]any{"endpoints": a.rpc.EndpointsMeta()})
}

func (a *App) handleState(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		a.writeRPCError(w, http.StatusMethodNotAllowed, "method not allowed")
		return
	}
	a.writeJSON(w, http.StatusOK, map[string]any{"state": a.store.Snapshot()})
}

type jsonRPCRequest struct {
	JSONRPC string          `json:"jsonrpc,omitempty"`
	ID      any             `json:"id,omitempty"`
	Method  string          `json:"method"`
	Params  json.RawMessage `json:"params,omitempty"`
}

type jsonRPCResponse struct {
	JSONRPC string        `json:"jsonrpc"`
	ID      any           `json:"id,omitempty"`
	Result  any           `json:"result,omitempty"`
	Error   *jsonRPCError `json:"error,omitempty"`
}

type jsonRPCError struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
	Data    any    `json:"data,omitempty"`
}

func (a *App) handleRPC(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		a.writeJSON(w, http.StatusMethodNotAllowed, jsonRPCResponse{
			JSONRPC: "2.0",
			Error:   &jsonRPCError{Code: -32600, Message: "method not allowed"},
		})
		return
	}

	var req jsonRPCRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		a.writeJSON(w, http.StatusBadRequest, jsonRPCResponse{
			JSONRPC: "2.0",
			Error:   &jsonRPCError{Code: -32700, Message: "invalid JSON payload", Data: err.Error()},
		})
		return
	}
	if req.Method == "" {
		a.writeJSON(w, http.StatusBadRequest, jsonRPCResponse{
			JSONRPC: "2.0",
			ID:      req.ID,
			Error:   &jsonRPCError{Code: -32600, Message: "method is required"},
		})
		return
	}

	prototype, err := a.rpc.NewRequestForMethod(req.Method)
	if err != nil {
		a.writeJSON(w, http.StatusOK, jsonRPCResponse{
			JSONRPC: "2.0",
			ID:      req.ID,
			Error: &jsonRPCError{
				Code:    -32601,
				Message: "method not found",
				Data:    err.Error(),
			},
		})
		return
	}

	payload, err := decodeRPCPayload(req.Params, prototype)
	if err != nil {
		a.writeJSON(w, http.StatusOK, jsonRPCResponse{
			JSONRPC: "2.0",
			ID:      req.ID,
			Error: &jsonRPCError{
				Code:    -32602,
				Message: "invalid method params",
				Data:    err.Error(),
			},
		})
		return
	}

	result, err := a.rpc.Invoke(r.Context(), req.Method, payload)
	if err != nil {
		a.writeJSON(w, http.StatusOK, jsonRPCResponse{
			JSONRPC: "2.0",
			ID:      req.ID,
			Error: &jsonRPCError{
				Code:    -32000,
				Message: "rpc invocation failed",
				Data:    err.Error(),
			},
		})
		return
	}

	a.writeJSON(w, http.StatusOK, jsonRPCResponse{
		JSONRPC: "2.0",
		ID:      req.ID,
		Result:  result,
	})
}

func decodeRPCPayload(raw json.RawMessage, prototype any) (any, error) {
	if prototype == nil {
		if hasPayload(raw) {
			return nil, errors.New("method does not accept params")
		}
		return nil, nil
	}
	if !hasPayload(raw) {
		return prototype, nil
	}

	value := reflect.ValueOf(prototype)
	if !value.IsValid() {
		return nil, errors.New("invalid method request type")
	}

	if value.Kind() == reflect.Ptr {
		if err := json.Unmarshal(raw, prototype); err != nil {
			return nil, err
		}
		return prototype, nil
	}

	target := reflect.New(value.Type())
	if err := json.Unmarshal(raw, target.Interface()); err != nil {
		return nil, err
	}
	return target.Elem().Interface(), nil
}

func hasPayload(raw json.RawMessage) bool {
	trimmed := strings.TrimSpace(string(raw))
	return trimmed != "" && trimmed != "null"
}

func (a *App) writeRPCError(w http.ResponseWriter, status int, msg string) {
	a.writeJSON(w, status, map[string]any{"error": msg})
}

func (a *App) writeJSON(w http.ResponseWriter, status int, payload any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(payload)
}

func main() {
	app, err := NewApp()
	if err != nil {
		log.Fatalf("failed to create app: %v", err)
	}

	addr := ":8091"
	log.Printf("RPC web debug demo listening on http://localhost%s", addr)
	log.Printf("Try method calls from the UI debug panel")

	if err := http.ListenAndServe(addr, app.Routes()); err != nil {
		log.Fatalf("server stopped: %v", err)
	}
}

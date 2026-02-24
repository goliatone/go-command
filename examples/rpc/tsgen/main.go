package main

import (
	"context"
	"encoding/json"
	"flag"
	"fmt"
	"os"
	"path/filepath"
	"time"

	"github.com/goliatone/go-command"
	cmdrpc "github.com/goliatone/go-command/rpc"
)

//go:generate go run . -manifest .tmp/rpc-endpoints.json
//go:generate go run ../../../cmd/rpc-tsgen -manifest .tmp/rpc-endpoints.json -out .tmp/rpc-contract.ts -export exampleRPCMeta

type CreateTaskData struct {
	Title    string   `json:"title"`
	Priority int      `json:"priority"`
	Labels   []string `json:"labels,omitempty"`
}

type Task struct {
	ID        string   `json:"id"`
	Title     string   `json:"title"`
	Status    string   `json:"status"`
	Priority  int      `json:"priority"`
	Labels    []string `json:"labels,omitempty"`
	CreatedBy string   `json:"createdBy,omitempty"`
}

type ListTasksData struct {
	Status string `json:"status,omitempty"`
	Limit  int    `json:"limit,omitempty"`
}

type ListTasksResult struct {
	Items     []Task `json:"items"`
	Count     int    `json:"count"`
	ActorID   string `json:"actorId,omitempty"`
	RequestID string `json:"requestId,omitempty"`
}

type RebuildSearchIndexMessage struct {
	Scope string `json:"scope"`
	Force bool   `json:"force,omitempty"`
}

func (RebuildSearchIndexMessage) Type() string {
	return "search.rebuild_index"
}

type RebuildSearchIndexCommand struct{}

func (c *RebuildSearchIndexCommand) Execute(_ context.Context, _ RebuildSearchIndexMessage) error {
	return nil
}

func (c *RebuildSearchIndexCommand) RPCHandler() any {
	return c
}

func (c *RebuildSearchIndexCommand) RPCOptions() command.RPCConfig {
	return command.RPCConfig{
		Method:      "search.rebuild_index",
		Summary:     "Rebuild search index",
		Description: "Execute a full or scoped search index rebuild.",
		Tags:        []string{"search", "maintenance"},
		Permissions: []string{"search:write"},
		Roles:       []string{"admin"},
		Idempotent:  true,
		Since:       "v1.2.0",
	}
}

type TaskEndpoints struct{}

func (e *TaskEndpoints) RPCEndpoints() []cmdrpc.EndpointDefinition {
	return []cmdrpc.EndpointDefinition{
		cmdrpc.NewEndpoint[CreateTaskData, Task](
			cmdrpc.EndpointSpec{
				Method:      "tasks.create",
				MessageType: "task.create",
				Kind:        cmdrpc.MethodKindCommand,
				Summary:     "Create task",
				Description: "Create a task and return the created record.",
				Tags:        []string{"tasks", "write"},
				Permissions: []string{"tasks:write"},
				Roles:       []string{"editor", "admin"},
				Since:       "v1.0.0",
			},
			func(_ context.Context, req cmdrpc.RequestEnvelope[CreateTaskData]) (cmdrpc.ResponseEnvelope[Task], error) {
				actor := req.Meta.ActorID
				if actor == "" {
					actor = "system"
				}
				return cmdrpc.ResponseEnvelope[Task]{
					Data: Task{
						ID:        fmt.Sprintf("tsk-%d", time.Now().UnixNano()),
						Title:     req.Data.Title,
						Status:    "open",
						Priority:  req.Data.Priority,
						Labels:    req.Data.Labels,
						CreatedBy: actor,
					},
				}, nil
			},
		),
		cmdrpc.NewEndpoint[ListTasksData, ListTasksResult](
			cmdrpc.EndpointSpec{
				Method:      "tasks.list",
				MessageType: "task.list",
				Kind:        cmdrpc.MethodKindQuery,
				Summary:     "List tasks",
				Description: "Return a filtered task list with request metadata echo.",
				Tags:        []string{"tasks", "read"},
				Permissions: []string{"tasks:read"},
				Roles:       []string{"viewer", "editor", "admin"},
				Idempotent:  true,
				Since:       "v1.0.0",
			},
			func(_ context.Context, req cmdrpc.RequestEnvelope[ListTasksData]) (cmdrpc.ResponseEnvelope[ListTasksResult], error) {
				status := req.Data.Status
				if status == "" {
					status = "open"
				}
				return cmdrpc.ResponseEnvelope[ListTasksResult]{
					Data: ListTasksResult{
						Items:     []Task{{ID: "tsk-1", Title: "Ship RPC docs", Status: status, Priority: 1}},
						Count:     1,
						ActorID:   req.Meta.ActorID,
						RequestID: req.Meta.RequestID,
					},
				}, nil
			},
		),
	}
}

type endpointManifest struct {
	Name        string            `json:"name"`
	GeneratedAt string            `json:"generatedAt"`
	Endpoints   []cmdrpc.Endpoint `json:"endpoints"`
}

func main() {
	var manifestPath string
	flag.StringVar(&manifestPath, "manifest", ".tmp/rpc-endpoints.json", "path for generated endpoint manifest JSON")
	flag.Parse()

	server := cmdrpc.NewServer(cmdrpc.WithFailureMode(cmdrpc.FailureModeRecover))

	taskEndpoints := &TaskEndpoints{}
	if err := server.RegisterEndpoints(taskEndpoints.RPCEndpoints()...); err != nil {
		die(fmt.Errorf("register explicit endpoints: %w", err))
	}

	rebuild := &RebuildSearchIndexCommand{}
	if err := server.Register(rebuild.RPCOptions(), rebuild.RPCHandler(), command.MessageTypeForCommand(rebuild)); err != nil {
		die(fmt.Errorf("register RPC method adapter endpoint: %w", err))
	}

	if err := writeManifest(manifestPath, endpointManifest{
		Name:        "rpc-tsgen-example",
		GeneratedAt: time.Now().UTC().Format(time.RFC3339),
		Endpoints:   server.EndpointsMeta(),
	}); err != nil {
		die(err)
	}

	fmt.Printf("wrote manifest: %s\n", manifestPath)
	fmt.Println("registered methods:")
	for _, endpoint := range server.EndpointsMeta() {
		fmt.Printf("- %-24s kind=%s request=%s response=%s\n",
			endpoint.Method,
			endpoint.HandlerKind,
			typeRefString(endpoint.RequestType),
			typeRefString(endpoint.ResponseType),
		)
	}

	outPath := filepath.Join(filepath.Dir(manifestPath), "rpc-contract.ts")
	fmt.Printf("next: go run ./cmd/rpc-tsgen -manifest %s -out %s\n", manifestPath, outPath)
}

func writeManifest(path string, manifest endpointManifest) error {
	if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
		return fmt.Errorf("create manifest directory: %w", err)
	}

	raw, err := json.MarshalIndent(manifest, "", "  ")
	if err != nil {
		return fmt.Errorf("marshal manifest: %w", err)
	}

	if err := os.WriteFile(path, raw, 0o644); err != nil {
		return fmt.Errorf("write manifest: %w", err)
	}
	return nil
}

func typeRefString(ref *cmdrpc.TypeRef) string {
	if ref == nil {
		return "none"
	}
	if ref.GoType != "" {
		return ref.GoType
	}
	return "unknown"
}

func die(err error) {
	fmt.Fprintf(os.Stderr, "rpc-tsgen example: %v\n", err)
	os.Exit(1)
}

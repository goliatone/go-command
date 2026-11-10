// Command export produces contract and wire fixtures without handlers or services.
package fixture

import (
	"encoding/json"
	"os"
	"path/filepath"
	"reflect"
	"time"

	command "github.com/goliatone/go-command"
	"github.com/goliatone/go-command/rpc"
)

type WireEdges struct {
	Dash    int32       `json:"-,omitempty"`
	Number  json.Number `json:"number,string"`
	Ignored string      `json:"-"`
}

type NotifyInput struct {
	Message string `json:"message"`
}

type State string
type Shared struct {
	Name string  `json:"name"`
	Next *Shared `json:"next,omitempty"`
}
type Input struct {
	Shared   *Shared        `json:"shared"`
	Optional *string        `json:"optional,omitempty"`
	Count    int64          `json:"count"`
	Wide     uint64         `json:"wide,string"`
	State    State          `json:"state"`
	Labels   []string       `json:"labels"`
	Lookup   map[int]Shared `json:"lookup"`
	Bytes    []byte         `json:"bytes"`
	At       time.Time      `json:"at"`
	Pair     [2]uint16      `json:"pair"`
}
type Result struct {
	OK     bool   `json:"ok"`
	Value  bool   `json:"value"`
	Count  int32  `json:"count"`
	Text   string `json:"text"`
	Data   string `json:"data"`
	Result string `json:"result"`
	Shared Shared `json:"shared"`
}

func Options() rpc.ExportOptions {
	return rpc.ExportOptions{
		Endpoints: []rpc.EndpointDefinition{
			rpc.NewEndpoint[WireEdges, WireEdges](rpc.EndpointSpec{Method: "example.wire_edges"}, nil),
			rpc.NewEndpoint[Input, *bool](rpc.EndpointSpec{Method: "example.boolean"}, nil),
			rpc.NewEndpoint[Input, *int32](rpc.EndpointSpec{Method: "example.number"}, nil),
			rpc.NewEndpoint[Input, *string](rpc.EndpointSpec{Method: "example.string"}, nil),
			rpc.NewEndpoint[Input, *[]string](rpc.EndpointSpec{Method: "example.slice"}, nil),
			rpc.NewEndpoint[Input, *map[string]string](rpc.EndpointSpec{Method: "example.map"}, nil), rpc.NewEndpoint[Input, Result](rpc.EndpointSpec{Method: "example.echo"}, nil), rpc.NewEndpoint[Input, *Result](rpc.EndpointSpec{Method: "example.nullable"}, nil)},
		Commands:  []rpc.CommandContract{rpc.CommandContractFor[WireEdges, WireEdges]("example.wire_edges"), rpc.CommandContractFor[Input, Result]("example.echo"), {ID: "example.notify", Input: reflect.TypeFor[NotifyInput]()}},
		Bounds:    map[reflect.Type]rpc.IntegerBounds{reflect.TypeFor[int64](): {-rpc.MaxSafeInteger, rpc.MaxSafeInteger}, reflect.TypeFor[time.Duration](): {0, rpc.MaxSafeInteger}},
		Enums:     map[reflect.Type][]string{reflect.TypeFor[State](): {"ready", "done"}, reflect.TypeFor[command.ExecutionMode](): {"", "inline", "queued"}, reflect.TypeFor[command.DedupPolicy](): {"", "ignore", "drop", "merge", "replace"}},
		Overrides: map[reflect.Type]rpc.WireSchema{reflect.TypeFor[any](): {Kind: "json"}},
	}
}
func Fixtures() map[string]any {
	at := time.Date(2026, 1, 2, 3, 4, 5, 0, time.UTC)
	input := Input{Shared: &Shared{Name: "shared", Next: &Shared{Name: "nested"}}, Count: rpc.MaxSafeInteger, Wide: ^uint64(0), State: "ready", Labels: []string{}, Lookup: map[int]Shared{7: {Name: "seven"}}, Bytes: []byte{0, 1, 255}, At: at, Pair: [2]uint16{0, 65535}}
	raw, _ := json.Marshal(input)
	var payload map[string]any
	_ = json.Unmarshal(raw, &payload)
	result := Result{OK: true, Data: "application data", Result: "application result", Shared: Shared{Name: "shared"}}
	receipt := command.DispatchReceipt{Accepted: true, Mode: command.ExecutionModeInline, CommandID: "example.echo", CorrelationID: "corr"}
	request := rpc.RequestEnvelope[command.CommandDispatchRequest]{Data: command.CommandDispatchRequest{CommandID: "example.echo", Name: "legacy.ignored", Payload: payload, IDs: []string{"target-1", "target-2"}, Options: command.DispatchOptions{Mode: command.ExecutionModeQueued, IdempotencyKey: "idempotent", DedupPolicy: command.DedupPolicyDrop, Delay: time.Second, CorrelationID: "corr", Metadata: map[string]any{"source": "fixture"}}}, Meta: rpc.RequestMeta{ActorID: "actor", CorrelationID: "corr", RequestID: "request", Roles: []string{"operator"}, Scope: map[string]any{"scope": "fixture"}, Headers: map[string]string{"x-fixture": "yes"}, Params: map[string]string{"id": "one"}, Query: map[string][]string{"q": {"one", "two"}}}}
	queued := receipt
	queued.Mode = command.ExecutionModeQueued
	queued.DispatchID = "dispatch-1"
	queued.EnqueuedAt = &at
	min := input
	min.Count = -rpc.MaxSafeInteger
	min.Shared = nil
	min.Labels = nil
	min.Bytes = nil
	min.Lookup = nil
	empty := ""
	min.Optional = &empty
	edges := WireEdges{Dash: 7, Number: json.Number("9007199254740993"), Ignored: "not-on-wire"}
	return map[string]any{
		"wireEdgesInput": edges, "wireEdgesRequest": rpc.RequestEnvelope[WireEdges]{Data: edges}, "wireEdgesResponse": rpc.ResponseEnvelope[WireEdges]{Data: edges},
		"input": input, "inputMin": min, "request": rpc.RequestEnvelope[Input]{Data: input}, "dispatchRequest": request,
		"dispatchInline":  rpc.ResponseEnvelope[command.CommandDispatchResponse]{Data: command.CommandDispatchResponse{Receipt: receipt, Result: result}},
		"dispatchQueued":  rpc.ResponseEnvelope[command.CommandDispatchResponse]{Data: command.CommandDispatchResponse{Receipt: queued, StatusReference: "/status/dispatch-1"}},
		"dispatchFailure": rpc.ResponseEnvelope[command.CommandDispatchResponse]{Data: command.CommandDispatchResponse{Receipt: command.DispatchReceipt{CommandID: "example.echo"}, Result: Result{OK: false, Text: "failed", Data: "failure data", Result: "failure result"}, ValidationErrors: []command.CommandDispatchValidationError{{Path: "count", Code: "INVALID", Message: "invalid count"}}}},
		"object":          rpc.ResponseEnvelope[Result]{Data: result},
		"omittedFalse":    rpc.ResponseEnvelope[bool]{}, "omittedZero": rpc.ResponseEnvelope[int32]{}, "omittedEmpty": rpc.ResponseEnvelope[string]{}, "omittedNil": rpc.ResponseEnvelope[[]string]{}, "omittedSlice": rpc.ResponseEnvelope[[]string]{Data: []string{}}, "omittedMap": rpc.ResponseEnvelope[map[string]string]{Data: map[string]string{}},
		"presentNull": rpc.ResponseEnvelope[any]{Data: (*Result)(nil)}, "presentFalse": rpc.ResponseEnvelope[any]{Data: false}, "presentZero": rpc.ResponseEnvelope[any]{Data: 0}, "presentEmpty": rpc.ResponseEnvelope[any]{Data: ""}, "presentSlice": rpc.ResponseEnvelope[any]{Data: []string{}}, "presentMap": rpc.ResponseEnvelope[any]{Data: map[string]string{}},
		"error": rpc.ResponseEnvelope[Result]{Error: &rpc.Error{Code: "DENIED", Message: "denied", Category: "authorization", Retryable: false, Details: map[string]any{"reason": "fixture"}}},
	}
}
func Export(out string) error {
	manifest, err := rpc.ExportContracts(Options())
	if err != nil {
		return err
	}
	checks, err := RegressionChecks()
	if err != nil {
		return err
	}
	wire := Fixtures()
	input := manifest.Commands["example.echo"].Input
	for _, name := range []string{"input", "inputMin"} {
		b, _ := json.Marshal(wire[name])
		if _, err := rpc.DecodeContractJSON[Input](manifest, input, b); err != nil {
			return err
		}
	}
	for _, item := range []struct {
		name  string
		value any
	}{{"manifest.json", manifest}, {"wire.json", wire}, {"checks.json", checks}} {
		b, err := json.MarshalIndent(item.value, "", "  ")
		if err != nil {
			return err
		}
		if err := os.WriteFile(filepath.Join(out, item.name), append(b, '\n'), 0644); err != nil {
			return err
		}
	}
	return nil
}

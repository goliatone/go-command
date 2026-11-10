package main

import (
	"encoding/json"
	command "github.com/goliatone/go-command"
	"github.com/goliatone/go-command/examples/rpc/tsgen/fixture"
	"github.com/goliatone/go-command/rpc"
	"os"
	"path/filepath"
	"testing"
)

func TestRealWireFixtures(t *testing.T) {
	a, b := t.TempDir(), t.TempDir()
	if err := run(a); err != nil {
		t.Fatal(err)
	}
	if err := run(b); err != nil {
		t.Fatal(err)
	}
	for _, name := range []string{"manifest.json", "wire.json", "checks.json"} {
		golden, err := os.ReadFile(filepath.Join("testdata", name))
		if err != nil {
			t.Fatal(err)
		}
		actual, err := os.ReadFile(filepath.Join(a, name))
		if err != nil {
			t.Fatal(err)
		}
		if string(golden) != string(actual) {
			t.Fatalf("stale actual-Go fixture: %s", name)
		}
		x, _ := os.ReadFile(filepath.Join(a, name))
		y, _ := os.ReadFile(filepath.Join(b, name))
		if string(x) != string(y) {
			t.Fatal("nonrepeatable", name)
		}
	}
	raw, _ := os.ReadFile(filepath.Join(a, "wire.json"))
	var wire map[string]json.RawMessage
	if err := json.Unmarshal(raw, &wire); err != nil {
		t.Fatal(err)
	}
	for _, key := range []string{"omittedFalse", "omittedZero", "omittedEmpty", "omittedNil", "omittedSlice", "omittedMap"} {
		if string(wire[key]) != "{}" {
			t.Fatalf("%s: %s", key, wire[key])
		}
	}
	for _, key := range []string{"presentNull", "presentFalse", "presentZero", "presentEmpty", "presentSlice", "presentMap"} {
		var value map[string]any
		_ = json.Unmarshal(wire[key], &value)
		if _, ok := value["data"]; !ok {
			t.Fatal(key)
		}
	}
	var request rpc.RequestEnvelope[command.CommandDispatchRequest]
	if err := json.Unmarshal(wire["dispatchRequest"], &request); err != nil {
		t.Fatal(err)
	}
	if request.Data.ResolvedCommandID() != "example.echo" || len(request.Data.IDs) != 2 || request.Data.Options.CorrelationID != "corr" {
		t.Fatal(request)
	}
	m, err := rpc.ExportContracts(fixture.Options())
	if err != nil {
		t.Fatal(err)
	}
	for name, ref := range map[string]rpc.WireSchema{"dispatchRequest": m.Canonical["CommandDispatchRequest"], "dispatchInline": m.Canonical["CommandDispatchResponse"], "dispatchQueued": m.Canonical["CommandDispatchResponse"], "dispatchFailure": m.Canonical["CommandDispatchResponse"]} {
		var env map[string]json.RawMessage
		_ = json.Unmarshal(wire[name], &env)
		if err := rpc.ValidateContractJSON(m, ref, env["data"]); err != nil {
			t.Fatal(name, err)
		}
	}
	var result rpc.ResponseEnvelope[fixture.Result]
	if err := json.Unmarshal(wire["object"], &result); err != nil {
		t.Fatal(err)
	}
	if result.Data.Value || result.Data.Count != 0 || result.Data.Data != "application data" || result.Data.Result != "application result" {
		t.Fatal(result)
	}
}

func TestProducerRegressionsExecute(t *testing.T) {
	checks, err := fixture.RegressionChecks()
	if err != nil {
		t.Fatal(err)
	}
	if len(checks) != 10 {
		t.Fatal(checks)
	}
	for name, passed := range checks {
		if !passed {
			t.Fatal(name)
		}
	}
}

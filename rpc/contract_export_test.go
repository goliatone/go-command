package rpc

import (
	"encoding/json"
	command "github.com/goliatone/go-command"
	"reflect"
	"strings"
	"testing"
	"time"
)

func exportOptions() ExportOptions {
	return ExportOptions{Bounds: map[reflect.Type]IntegerBounds{reflect.TypeFor[time.Duration](): {0, MaxSafeInteger}}, Overrides: map[reflect.Type]WireSchema{reflect.TypeFor[any](): {Kind: "json"}}}
}
func exportType(t *testing.T, typ reflect.Type) *ContractManifest {
	t.Helper()
	o := exportOptions()
	o.Commands = []CommandContract{{ID: "test", Input: typ}}
	m, err := ExportContracts(o)
	if err != nil {
		t.Fatal(err)
	}
	return m
}
func resolve(m *ContractManifest, s WireSchema) WireSchema {
	for s.Kind == "ref" {
		s = m.Definitions[s.Ref]
	}
	return s
}

type EmbeddedA struct {
	Name  string
	Clash string
}
type EmbeddedB struct {
	Clash  string
	Hidden string `json:"-"`
}
type embeddedFields struct {
	*EmbeddedA
	EmbeddedB
	Renamed string   `json:"named"`
	Maybe   *bool    `json:"maybe,omitempty"`
	Nil     *bool    `json:"nil"`
	Wide    uint64   `json:"wide,string"`
	Quoted  string   `json:"quoted,string"`
	Empty   []string `json:"empty"`
}

func TestExportMatchesJSONEmbeddingPresence(t *testing.T) {
	m := exportType(t, reflect.TypeFor[embeddedFields]())
	s := resolve(m, m.Commands["test"].Input)
	for _, key := range []string{"Hidden", "Clash", "Renamed"} {
		if _, ok := s.Properties[key]; ok {
			t.Fatalf("unexpected field %s", key)
		}
	}
	if s.Properties["Name"].Required || s.Properties["maybe"].Required || !s.Properties["nil"].Required || !s.Properties["nil"].Schema.Nullable {
		t.Fatal("presence/nullability")
	}
	for _, v := range []embeddedFields{{}, {EmbeddedA: &EmbeddedA{Name: "one"}, Wide: ^uint64(0), Quoted: "hello", Empty: []string{}}} {
		b, err := json.Marshal(v)
		if err != nil {
			t.Fatal(err)
		}
		if err = ValidateContractJSON(m, m.Commands["test"].Input, b); err != nil {
			t.Fatalf("%s: %v", b, err)
		}
	}
}

type recursive struct {
	Child  *recursive        `json:"child,omitempty"`
	Items  []recursive       `json:"items"`
	Values map[int]recursive `json:"values"`
	At     time.Time
	Bytes  []byte
	Pair   [2]uint8
}

func TestExportDeterminismAndRecursiveWire(t *testing.T) {
	o := exportOptions()
	o.Commands = []CommandContract{CommandContractFor[recursive, recursive]("recursive"), CommandContractFor[struct{ A bool }, struct{ B string }]("anonymous")}
	a, err := ExportContracts(o)
	if err != nil {
		t.Fatal(err)
	}
	o.Commands[0], o.Commands[1] = o.Commands[1], o.Commands[0]
	b, err := ExportContracts(o)
	if err != nil {
		t.Fatal(err)
	}
	x, _ := json.Marshal(a)
	y, _ := json.Marshal(b)
	if string(x) != string(y) {
		t.Fatal("nondeterministic")
	}
	raw, _ := json.Marshal(recursive{Child: &recursive{}, Items: []recursive{}, Values: map[int]recursive{1: {}}, At: time.Unix(0, 0).UTC(), Bytes: []byte{255}})
	if err := ValidateContractJSON(a, a.Commands["recursive"].Input, raw); err != nil {
		t.Fatal(err)
	}
}

type customValue string

func (customValue) MarshalJSON() ([]byte, error) { return []byte(`{"custom":true}`), nil }
func TestExportDiagnostics(t *testing.T) {
	for _, tc := range []struct {
		name string
		typ  reflect.Type
		want string
	}{
		{"wide", reflect.TypeFor[struct{ Wide int64 }](), "commands.test.input.Wide"},
		{"channel", reflect.TypeFor[struct{ Bad chan int }](), "commands.test.input.Bad"},
		{"custom", reflect.TypeFor[struct{ Custom customValue }](), "requires explicit"},
		{"key", reflect.TypeFor[map[bool]string](), "unsupported map key"},
	} {
		t.Run(tc.name, func(t *testing.T) {
			o := exportOptions()
			o.Commands = []CommandContract{{ID: "test", Input: tc.typ}}
			_, err := ExportContracts(o)
			if err == nil || !strings.Contains(err.Error(), tc.want) {
				t.Fatalf("got %v", err)
			}
		})
	}
	o := exportOptions()
	c := CommandContractFor[struct{}, struct{}]("same")
	o.Commands = []CommandContract{c, c}
	if _, err := ExportContracts(o); err == nil || !strings.Contains(err.Error(), "duplicate") {
		t.Fatal(err)
	}
	o = exportOptions()
	o.Overrides[reflect.TypeFor[int64]()] = WireSchema{Kind: "string"}
	o.Commands = []CommandContract{CommandContractFor[struct{ N int64 }, struct{}]("test")}
	if _, err := ExportContracts(o); err == nil {
		t.Fatal("numeric override accepted")
	}
}
func TestExactSafeIntegerValidation(t *testing.T) {
	o := exportOptions()
	o.Bounds[reflect.TypeFor[int64]()] = IntegerBounds{-MaxSafeInteger, MaxSafeInteger}
	o.Commands = []CommandContract{CommandContractFor[struct{ N int64 }, struct{}]("test")}
	m, err := ExportContracts(o)
	if err != nil {
		t.Fatal(err)
	}
	for _, raw := range []string{`{"N":9007199254740991}`, `{"N":-9007199254740991}`, `{"N":1e3}`} {
		if err := ValidateContractJSON(m, m.Commands["test"].Input, []byte(raw)); err != nil {
			t.Fatal(err)
		}
	}
	for _, raw := range []string{`{"N":9007199254740992}`, `{"N":-9007199254740992}`, `{"N":0.5}`, `{"N":null}`, `{}`} {
		if err := ValidateContractJSON(m, m.Commands["test"].Input, []byte(raw)); err == nil {
			t.Fatal(raw)
		}
	}
}

type declared struct{ id, method string }

func (d declared) RPCCommandContract() CommandContract {
	c := CommandContractFor[struct{}, struct{}](d.id)
	c.Summary = "explicit"
	return c
}
func (d declared) RPCOptions() command.RPCConfig {
	return command.RPCConfig{Method: d.method, Summary: "option", Description: "option"}
}
func (d declared) RPCDescription() command.RPCDescription {
	return command.RPCDescription{Summary: "description", Description: "description"}
}
func TestOptionalDeclarationMetadata(t *testing.T) {
	c, err := DescribeCommandContract(declared{method: "test"})
	if err != nil || c.ID != "test" || c.Summary != "explicit" || c.Description != "option" {
		t.Fatalf("%+v %v", c, err)
	}
	if _, err := DescribeCommandContract(declared{id: "a", method: "b"}); err == nil {
		t.Fatal("conflict accepted")
	}
}

func TestValidationRejectsExtremeNumbersAndMalformedOverride(t *testing.T) {
	o := exportOptions()
	o.Bounds[reflect.TypeFor[int64]()] = IntegerBounds{-MaxSafeInteger, MaxSafeInteger}
	o.Commands = []CommandContract{CommandContractFor[struct{ N int64 }, struct{}]("test")}
	m, err := ExportContracts(o)
	if err != nil {
		t.Fatal(err)
	}
	for _, raw := range []string{`{"N":1e100000000}`, `{"N":1e-100000000}`} {
		if err := ValidateContractJSON(m, m.Commands["test"].Input, []byte(raw)); err == nil {
			t.Fatal(raw)
		}
	}
	o = exportOptions()
	o.Overrides[reflect.TypeFor[any]()] = WireSchema{Kind: "boolean", Ref: "ignored"}
	if _, err := ExportContracts(o); err == nil || !strings.Contains(err.Error(), "invalid for boolean") {
		t.Fatal(err)
	}
}

package rpc

import (
	"encoding/json"
	"reflect"
	"strings"
	"testing"
)

type boundedInput struct {
	N int64 `json:"n,omitempty"`
}
type nestedBoundedInput struct {
	Child boundedInput `json:"child"`
}

func boundedManifest(t *testing.T, typ reflect.Type) *ContractManifest {
	t.Helper()
	o := exportOptions()
	o.Bounds[reflect.TypeFor[int64]()] = IntegerBounds{-MaxSafeInteger, MaxSafeInteger}
	o.Commands = []CommandContract{{ID: "test", Input: typ}}
	m, err := ExportContracts(o)
	if err != nil {
		t.Fatal(err)
	}
	return m
}
func TestDecodeContractJSONChecksEffectiveTypedNumbers(t *testing.T) {
	m := boundedManifest(t, reflect.TypeFor[boundedInput]())
	schema := m.Commands["test"].Input
	for _, raw := range []string{`{"n":0,"N":9007199254740992}`, `{"N":9007199254740992}`, `{"n":9007199254740992}`, `{"n":-9007199254740992}`, `{"n":1.5}`, `{"n":9223372036854775808}`, `{"n":1} {"n":2}`} {
		t.Run(raw, func(t *testing.T) {
			value, err := DecodeContractJSON[boundedInput](m, schema, []byte(raw))
			if err == nil || value != (boundedInput{}) {
				t.Fatalf("invalid decoded value escaped: %+v, %v", value, err)
			}
		})
	}
	for _, raw := range []string{`{"N":1}`, `{"n":9007199254740991}`, `{"n":-9007199254740991}`, `{"n":9007199254740992,"N":0}`, `{"n":1,"ignored":{"N":9007199254740992}}`, `{"ignored":1,"ignored":2}`, `{}`} {
		want := boundedInput{}
		if err := json.Unmarshal([]byte(raw), &want); err != nil {
			t.Fatal(err)
		}
		got, err := DecodeContractJSON[boundedInput](m, schema, []byte(raw))
		if err != nil || got != want {
			t.Fatalf("ordinary Go semantics changed for %s: %+v %v", raw, got, err)
		}
	}
	if err := ValidateContractValue(m, schema, boundedInput{N: MaxSafeInteger + 1}); err == nil {
		t.Fatal("unsafe egress accepted")
	}
}
func TestDecodeContractJSONPreservesDuplicateObjectMerging(t *testing.T) {
	m := boundedManifest(t, reflect.TypeFor[nestedBoundedInput]())
	schema := m.Commands["test"].Input
	raw := []byte(`{"child":{"n":9007199254740992},"child":{}}`)
	var native nestedBoundedInput
	if err := json.Unmarshal(raw, &native); err != nil || native.Child.N != MaxSafeInteger+1 {
		t.Fatalf("bad reproduction: %+v %v", native, err)
	}
	if got, err := DecodeContractJSON[nestedBoundedInput](m, schema, raw); err == nil || got != (nestedBoundedInput{}) {
		t.Fatalf("merge bypass: %+v %v", got, err)
	}
	for _, raw := range []string{`{"child":{"n":1},"child":{}}`, `{"child":{"n":9007199254740992},"child":{"n":2}}`, `{"CHILD":{"N":2},"unknown":{"n":9007199254740992}}`} {
		var want nestedBoundedInput
		_ = json.Unmarshal([]byte(raw), &want)
		got, err := DecodeContractJSON[nestedBoundedInput](m, schema, []byte(raw))
		if err != nil || got != want {
			t.Fatalf("merge semantics: %s %+v %v", raw, got, err)
		}
	}
}
func TestCanonicalJSONRejectsAmbiguity(t *testing.T) {
	m := boundedManifest(t, reflect.TypeFor[nestedBoundedInput]())
	s := m.Commands["test"].Input
	for _, raw := range []string{`{"child":{"n":0,"N":9007199254740992}}`, `{"child":{"n":9007199254740992},"child":{}}`, `{"child":{"n":1,"n":2}}`} {
		if err := ValidateContractJSON(m, s, []byte(raw)); err == nil {
			t.Fatal("ambiguous canonical JSON passed", raw)
		}
	}
	if err := ValidateContractJSON(m, s, []byte(`{"child":{"n":1},"unknown":42}`)); err != nil {
		t.Fatal("unrelated unknown fields should remain allowed", err)
	}
}

type HiddenInteger int64

func (HiddenInteger) IsZero() bool { return true }

type PublicNumbers struct {
	Hidden   HiddenInteger `json:"hidden,omitzero"`
	Optional int64         `json:"optional,omitempty"`
}
type embeddedNumbers struct {
	*PublicNumbers
	Items []PublicNumbers          `json:"items"`
	Map   map[string]PublicNumbers `json:"map"`
}

func TestTypedBoundsIncludeOmittedAndEmbeddedValues(t *testing.T) {
	o := exportOptions()
	o.Bounds[reflect.TypeFor[int64]()] = IntegerBounds{1, MaxSafeInteger}
	o.Bounds[reflect.TypeFor[HiddenInteger]()] = IntegerBounds{-MaxSafeInteger, MaxSafeInteger}
	o.Commands = []CommandContract{CommandContractFor[embeddedNumbers, embeddedNumbers]("test")}
	m, err := ExportContracts(o)
	if err != nil {
		t.Fatal(err)
	}
	s := m.Commands["test"].Input
	for _, v := range []embeddedNumbers{
		{PublicNumbers: &PublicNumbers{Hidden: HiddenInteger(MaxSafeInteger + 1), Optional: 1}},
		{PublicNumbers: &PublicNumbers{Optional: 0}},
		{Items: []PublicNumbers{{Hidden: HiddenInteger(MaxSafeInteger + 1), Optional: 1}}},
		{Map: map[string]PublicNumbers{"one": {Hidden: HiddenInteger(MaxSafeInteger + 1), Optional: 1}}},
	} {
		if err := ValidateContractValue(m, s, v); err == nil {
			t.Fatalf("hidden out-of-range number passed: %+v", v)
		}
	}
	valid := embeddedNumbers{PublicNumbers: &PublicNumbers{Optional: 1}}
	if err := ValidateContractValue(m, s, valid); err != nil {
		t.Fatal(err)
	}
	// A nil embedded pointer has no public numeric value to check.
	if err := ValidateContractValue(m, s, embeddedNumbers{}); err != nil {
		t.Fatal(err)
	}
}
func TestTypedDecodeHandlesPointersAndWireEncodings(t *testing.T) {
	type Input struct {
		N    int64  `json:"n,string"`
		Next *Input `json:"next,omitempty"`
	}
	m := exportType(t, reflect.TypeFor[Input]())
	s := m.Commands["test"].Input
	got, err := DecodeContractJSON[Input](m, s, []byte(`{"n":"9223372036854775807","next":{"n":"-9223372036854775808"}}`))
	if err != nil || got.N != 9223372036854775807 || got.Next.N != (-9223372036854775807-1) {
		t.Fatalf("lossless quoted number: %+v %v", got, err)
	}
	bad := []byte(`{"n":"not-an-integer"}`)
	if _, err := DecodeContractJSON[Input](m, s, bad); err == nil {
		t.Fatal("invalid quoted integer accepted")
	}
	ptr, err := DecodeContractJSON[*Input](m, s, []byte(`{"n":"1"}`))
	if err != nil || ptr == nil || ptr.N != 1 {
		t.Fatal(ptr, err)
	}
	if _, err := DecodeContractJSON[Input](nil, s, []byte(`{}`)); err == nil {
		t.Fatal("nil manifest accepted")
	}
}
func TestDecodeContractCustomWireOverride(t *testing.T) {
	o := exportOptions()
	o.Overrides[reflect.TypeFor[customValue]()] = WireSchema{Kind: "object", Properties: map[string]WireProperty{"custom": {Schema: WireSchema{Kind: "boolean"}, Required: true}}}
	o.Commands = []CommandContract{CommandContractFor[customValue, customValue]("test")}
	m, err := ExportContracts(o)
	if err != nil {
		t.Fatal(err)
	}
	if err := ValidateContractValue(m, m.Commands["test"].Input, customValue("opaque")); err != nil {
		t.Fatal(err)
	}
}
func TestJSONNumberRequiresLosslessWireDeclaration(t *testing.T) {
	for _, typ := range []reflect.Type{reflect.TypeFor[json.Number](), reflect.TypeFor[struct{ N json.Number }](), reflect.TypeFor[[]json.Number](), reflect.TypeFor[map[string]*json.Number]()} {
		o := exportOptions()
		o.Commands = []CommandContract{{ID: "test", Input: typ}}
		if _, err := ExportContracts(o); err == nil || !strings.Contains(err.Error(), "json.Number") {
			t.Fatalf("%v: %v", typ, err)
		}
	}
	type Quoted struct {
		N json.Number `json:"n,string"`
	}
	m := exportType(t, reflect.TypeFor[Quoted]())
	wire, err := json.Marshal(Quoted{N: json.Number("9007199254740993")})
	if err != nil {
		t.Fatal(err)
	}
	if string(wire) != `{"n":"9007199254740993"}` {
		t.Fatal(string(wire))
	}
	got, err := DecodeContractJSON[Quoted](m, m.Commands["test"].Input, wire)
	if err != nil || got.N != "9007199254740993" {
		t.Fatalf("%+v %v", got, err)
	}
}
func TestLiteralDashFieldIsNotIgnored(t *testing.T) {
	type Dash struct {
		Value   int32 `json:"-,omitempty"`
		Ignored int64 `json:"-"`
	}
	m := exportType(t, reflect.TypeFor[Dash]())
	schema := m.Commands["test"].Input
	node := resolve(m, schema)
	if _, ok := node.Properties["-"]; !ok {
		t.Fatal("literal dash field missing")
	}
	if len(node.Properties) != 1 {
		t.Fatal(node.Properties)
	}
	for _, raw := range []string{`{"-":7}`, `{}`} {
		got, err := DecodeContractJSON[Dash](m, schema, []byte(raw))
		if err != nil {
			t.Fatal(err)
		}
		wire, _ := json.Marshal(got)
		if string(wire) != raw {
			t.Fatalf("round trip %s -> %s", raw, wire)
		}
	}
}
func TestCommandIDsMustAlreadyBeCanonical(t *testing.T) {
	for _, id := range []string{" test", "test ", "\ttest\n", "\u00a0test\u2003", " "} {
		o := exportOptions()
		o.Commands = []CommandContract{CommandContractFor[struct{}, struct{}]("test"), CommandContractFor[struct{}, struct{}](id)}
		if _, err := ExportContracts(o); err == nil {
			t.Fatal("noncanonical ID accepted", id)
		}
		if _, err := DescribeCommandContract(declared{id: id}); err == nil {
			t.Fatal("noncanonical provider ID accepted", id)
		}
		if _, err := DescribeCommandContract(declared{method: id}); err == nil {
			t.Fatal("noncanonical fallback ID accepted", id)
		}
	}
	o := exportOptions()
	o.Commands = []CommandContract{CommandContractFor[struct{}, struct{}]("command.with space")}
	if _, err := ExportContracts(o); err != nil {
		t.Fatal("interior whitespace must retain existing dispatch identity", err)
	}
}

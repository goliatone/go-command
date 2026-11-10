package fixture

import (
	"encoding/json"
	"fmt"
	"reflect"

	"github.com/goliatone/go-command/rpc"
)

type NumericInput struct {
	N int64 `json:"n,omitempty"`
}
type NestedNumericInput struct {
	Child NumericInput `json:"child"`
}

// RegressionChecks executes the reviewed failure cases whenever the real Go
// exporter runs. The consumer proof therefore cannot pass using stale goldens.
func RegressionChecks() (map[string]bool, error) {
	opts := Options()
	opts.Endpoints = nil
	opts.Commands = []rpc.CommandContract{rpc.CommandContractFor[NumericInput, NumericInput]("numeric"), rpc.CommandContractFor[NestedNumericInput, NestedNumericInput]("nested")}
	m, err := rpc.ExportContracts(opts)
	if err != nil {
		return nil, err
	}
	n, s := m.Commands["numeric"].Input, m.Commands["nested"].Input
	checks := map[string]bool{}
	alias := []byte(`{"n":0,"N":9007199254740992}`)
	merged := []byte(`{"child":{"n":9007199254740992},"child":{}}`)
	_, err = rpc.DecodeContractJSON[NumericInput](m, n, alias)
	checks["reject_alias_bounds_bypass"] = err != nil
	_, err = rpc.DecodeContractJSON[NestedNumericInput](m, s, merged)
	checks["reject_duplicate_merge_bounds_bypass"] = err != nil
	checks["reject_ambiguous_canonical_alias"] = rpc.ValidateContractJSON(m, n, alias) != nil
	checks["reject_ambiguous_canonical_duplicate"] = rpc.ValidateContractJSON(m, s, merged) != nil
	safe, err := rpc.DecodeContractJSON[NumericInput](m, n, []byte(`{"N":1,"unrelated":{"n":9007199254740992}}`))
	checks["preserve_safe_alias_and_unknown_fields"] = err == nil && safe.N == 1
	nested, err := rpc.DecodeContractJSON[NestedNumericInput](m, s, []byte(`{"child":{"n":7},"child":{}}`))
	checks["preserve_safe_duplicate_merge"] = err == nil && nested.Child.N == 7
	checks["reject_unsafe_egress"] = rpc.ValidateContractValue(m, n, NumericInput{N: rpc.MaxSafeInteger + 1}) != nil
	opts.Commands = []rpc.CommandContract{{ID: "number", Input: reflect.TypeFor[struct{ N json.Number }]()}}
	_, err = rpc.ExportContracts(opts)
	checks["reject_unquoted_json_number"] = err != nil
	for _, bad := range []string{" test ", "\u00a0test\u2003"} {
		opts.Commands = []rpc.CommandContract{rpc.CommandContractFor[NumericInput, NumericInput]("test"), rpc.CommandContractFor[NumericInput, NumericInput](bad)}
		_, err = rpc.ExportContracts(opts)
		if err == nil {
			return nil, fmt.Errorf("noncanonical command ID exported: %q", bad)
		}
	}
	checks["reject_normalized_command_id_collision"] = true
	opts.Commands = []rpc.CommandContract{rpc.CommandContractFor[WireEdges, WireEdges]("edges")}
	m, err = rpc.ExportContracts(opts)
	if err != nil {
		return nil, err
	}
	edge, err := rpc.DecodeContractJSON[WireEdges](m, m.Commands["edges"].Input, []byte(`{"-":7,"number":"9007199254740993"}`))
	checks["preserve_dash_and_quoted_number"] = err == nil && edge.Dash == 7 && edge.Number == "9007199254740993"
	for name, passed := range checks {
		if !passed {
			return nil, fmt.Errorf("producer regression failed: %s", name)
		}
	}
	return checks, nil
}

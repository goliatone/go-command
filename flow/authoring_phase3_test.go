package flow

import (
	"context"
	"encoding/json"
	"reflect"
	"strings"
	"testing"
)

func TestCompileDSLEnforcesPhase3ValidationRules(t *testing.T) {
	SetDSLCompileKnownActions([]string{"known_action"})
	defer SetDSLCompileKnownActions(nil)

	bad := `
machine orders version v2 {
    initial draft
    state draft
    state approved

    transition approve {
        from draft
        to approved
        dynamic pick_target
        step known_action
        workflow {
            step known_action
        }
    }
}
`
	_, err := CompileDSL(bad)
	if err == nil {
		t.Fatalf("expected compile error")
	}
	verr, ok := err.(*DSLValidationError)
	if !ok {
		t.Fatalf("expected DSLValidationError, got %T", err)
	}
	codes := diagCodes(verr.Diagnostics)
	if !codes[DiagCodeInvalidTarget] {
		t.Fatalf("expected invalid target diagnostic")
	}
	if !codes[DiagCodeInvalidWorkflowNode] {
		t.Fatalf("expected step/workflow xor diagnostic")
	}

	unresolved := `
machine orders version v2 {
    initial draft
    state draft
    state approved

    transition approve {
        from draft
        to approved
        step unknown_action
    }
}
`
	_, err = CompileDSL(unresolved)
	if err == nil {
		t.Fatalf("expected unresolved action compile error")
	}
	verr, ok = err.(*DSLValidationError)
	if !ok {
		t.Fatalf("expected DSLValidationError, got %T", err)
	}
	codes = diagCodes(verr.Diagnostics)
	if !codes[DiagCodeUnresolvedAction] {
		t.Fatalf("expected unresolved action diagnostic")
	}
}

func TestMachineDefinitionDSLUISchemaRoundTripConformance(t *testing.T) {
	SetDSLCompileKnownActions([]string{"validateRisk", "escalateToManager", "notifyAutoApproval", "publishAudit"})
	defer SetDSLCompileKnownActions(nil)

	src := `
machine onboarding version v2 {
    initial review

    state review
    state approved terminal

    transition approve {
        from review
        to approved
        guard risk.score > 80 || vip
        workflow {
            step validateRisk
            when risk.score > 80 {
                step escalateToManager
            } else {
                step notifyAutoApproval
            }
            step publishAudit
        }
    }
}
`
	def1, err := CompileDSL(src)
	if err != nil {
		t.Fatalf("compile source dsl: %v", err)
	}
	dsl, err := def1.ToDSL()
	if err != nil {
		t.Fatalf("to dsl failed: %v", err)
	}
	def2, err := CompileDSL(dsl)
	if err != nil {
		t.Fatalf("compile round-trip dsl: %v", err)
	}

	catalog := &EditorCatalog{}
	for _, id := range []string{"validateRisk", "escalateToManager", "notifyAutoApproval", "publishAudit"} {
		catalog.Steps = append(catalog.Steps, CatalogItem{ID: id, Label: id})
	}
	ui, diags := MachineDefinitionToUISchema(def2, catalog, nil)
	for _, d := range diags {
		if d.Severity == SeverityError {
			t.Fatalf("unexpected schema diagnostic: %+v", d)
		}
	}
	def3 := MachineDefinitionFromUISchema(ui, def2.ID, def2.Version)

	if !reflect.DeepEqual(comparableDefinition(def1), comparableDefinition(def2)) {
		b1, _ := json.MarshalIndent(comparableDefinition(def1), "", "  ")
		b2, _ := json.MarshalIndent(comparableDefinition(def2), "", "  ")
		t.Fatalf("dsl round-trip mismatch\n%s\n!=\n%s", string(b1), string(b2))
	}
	if !reflect.DeepEqual(comparableDefinition(def2), comparableDefinition(def3)) {
		b2, _ := json.MarshalIndent(comparableDefinition(def2), "", "  ")
		b3, _ := json.MarshalIndent(comparableDefinition(def3), "", "  ")
		t.Fatalf("ui schema round-trip mismatch\n%s\n!=\n%s", string(b2), string(b3))
	}
}

func TestGraphLayoutUnknownFieldPreservation(t *testing.T) {
	raw := `{"viewport":{"x":0,"y":0,"zoom":1},"nodes":{},"edges":{},"future_field":{"hello":"world"}}`
	var layout GraphLayout
	if err := json.Unmarshal([]byte(raw), &layout); err != nil {
		t.Fatalf("unmarshal layout: %v", err)
	}
	if _, ok := layout.Unknown["future_field"]; !ok {
		t.Fatalf("expected unknown field to be preserved")
	}
	encoded, err := json.Marshal(layout)
	if err != nil {
		t.Fatalf("marshal layout: %v", err)
	}
	if !strings.Contains(string(encoded), "future_field") {
		t.Fatalf("expected unknown field in marshaled output: %s", string(encoded))
	}
}

func TestDraftPublishGating(t *testing.T) {
	draft := &DraftMachineDocument{
		Definition: &MachineDefinition{
			ID:      "orders",
			Version: "v2",
			States:  []StateDefinition{{Name: "draft", Initial: true}, {Name: "approved"}},
			Transitions: []TransitionDefinition{{
				ID:    "approve",
				Event: "approve",
				From:  "draft",
				To:    "approved",
				Workflow: TransitionWorkflowDefinition{Nodes: []WorkflowNodeDefinition{{
					ID:   "step_1",
					Kind: "step",
					Step: &StepDefinition{ActionID: "unknown_action"},
				}}},
			}},
		},
		DraftState: DraftState{IsDraft: true},
	}
	catalog := &EditorCatalog{Steps: []CatalogItem{{ID: "known_action", Label: "known_action"}}}
	if err := draft.Publish(catalog); err == nil {
		t.Fatalf("expected publish to fail for unresolved action")
	}

	draft.Definition.Transitions[0].Workflow.Nodes[0].Step.ActionID = "known_action"
	if err := draft.Publish(catalog); err != nil {
		t.Fatalf("expected publish success, got %v", err)
	}
	if draft.DraftState.IsDraft {
		t.Fatalf("expected draft to be marked published")
	}
}

func TestScopedValidationSupport(t *testing.T) {
	def := &MachineDefinition{
		ID:      "orders",
		Version: "v2",
		States:  []StateDefinition{{Name: "draft", Initial: true}, {Name: "approved"}},
		Transitions: []TransitionDefinition{
			{
				ID:    "good",
				Event: "approve",
				From:  "draft",
				To:    "approved",
				Workflow: TransitionWorkflowDefinition{Nodes: []WorkflowNodeDefinition{{
					ID: "good_step", Kind: "step", Step: &StepDefinition{ActionID: "known"},
				}}},
			},
			{
				ID:    "bad",
				Event: "reject",
				From:  "draft",
				To:    "approved",
				Workflow: TransitionWorkflowDefinition{Nodes: []WorkflowNodeDefinition{{
					ID: "bad_step", Kind: "step", Step: &StepDefinition{ActionID: "unknown"},
				}}},
			},
		},
	}
	catalog := &EditorCatalog{Steps: []CatalogItem{{ID: "known", Label: "known"}}}

	diags := ValidateMachineDefinitionScoped(def, catalog, &ValidationScope{NodeIDs: []string{"good"}})
	for _, d := range diags {
		if d.Severity == SeverityError {
			t.Fatalf("expected scoped validation to ignore other nodes, got %+v", d)
		}
	}

	full := ValidateMachineDefinition(def, catalog)
	if !diagCodes(full)[DiagCodeUnresolvedAction] {
		t.Fatalf("expected unresolved action in full validation")
	}
}

func TestScopedValidationDetectsDuplicateTransitionAgainstUnscopedNodes(t *testing.T) {
	def := &MachineDefinition{
		ID:      "orders",
		Version: "v2",
		States:  []StateDefinition{{Name: "draft", Initial: true}, {Name: "approved"}},
		Transitions: []TransitionDefinition{
			{
				ID:    "approve_primary",
				Event: "approve",
				From:  "draft",
				To:    "approved",
				Workflow: TransitionWorkflowDefinition{Nodes: []WorkflowNodeDefinition{
					{ID: "n1", Kind: "step", Step: &StepDefinition{ActionID: "known"}},
				}},
			},
			{
				ID:    "approve_duplicate",
				Event: "approve",
				From:  "draft",
				To:    "approved",
				Workflow: TransitionWorkflowDefinition{Nodes: []WorkflowNodeDefinition{
					{ID: "n2", Kind: "step", Step: &StepDefinition{ActionID: "known"}},
				}},
			},
		},
	}
	catalog := &EditorCatalog{Steps: []CatalogItem{{ID: "known", Label: "known"}}}

	diags := ValidateMachineDefinitionScoped(def, catalog, &ValidationScope{NodeIDs: []string{"approve_duplicate"}})
	if !diagCodes(diags)[DiagCodeDuplicateTransition] {
		t.Fatalf("expected duplicate transition diagnostic in scoped validation")
	}
}

func TestNodeBuilderCompatibilityGeneratedDefinitionsRunUnchanged(t *testing.T) {
	def := &MachineDefinition{
		ID:      "orders",
		Version: "v2",
		States:  []StateDefinition{{Name: "draft", Initial: true}, {Name: "approved"}},
		Transitions: []TransitionDefinition{{
			ID:    "approve",
			Event: "approve",
			From:  "draft",
			To:    "approved",
			Workflow: TransitionWorkflowDefinition{Nodes: []WorkflowNodeDefinition{
				{ID: "n1", Kind: "step", Step: &StepDefinition{ActionID: "publishAudit"}},
			}},
		}},
	}

	before, _ := json.Marshal(def)
	req := TransitionRequest[smMsg]{StateKey: func(m smMsg) string { return m.ID }, Event: func(m smMsg) string { return m.Event }}
	actions := NewActionRegistry[smMsg]()
	_ = actions.Register("publishAudit", func(context.Context, smMsg) error { return nil })
	sm, err := NewStateMachineFromDefinition(
		def,
		NewInMemoryStateStore(),
		req,
		NewResolverMap[smMsg](),
		actions,
		WithExecutionPolicy[smMsg](ExecutionPolicyLightweight),
		WithInitialFallback[smMsg](true),
	)
	if err != nil {
		t.Fatalf("build state machine: %v", err)
	}
	res, err := sm.ApplyEvent(context.Background(), ApplyEventRequest[smMsg]{
		EntityID: "1",
		Event:    "approve",
		Msg:      smMsg{ID: "1", Event: "approve"},
	})
	if err != nil {
		t.Fatalf("apply event: %v", err)
	}
	if res.Transition.CurrentState != "approved" {
		t.Fatalf("expected approved, got %s", res.Transition.CurrentState)
	}
	if len(res.Transition.Effects) != 1 {
		t.Fatalf("expected one effect")
	}

	after, _ := json.Marshal(def)
	if string(before) != string(after) {
		t.Fatalf("expected node-builder definition to remain unchanged")
	}
}

func TestBuildEditorCatalogFromRegistries(t *testing.T) {
	guards := NewGuardRegistry[smMsg]()
	_ = guards.Register("g.two", func(smMsg) bool { return true })
	_ = guards.Register("g.one", func(smMsg) bool { return true })

	actions := NewActionRegistry[smMsg]()
	_ = actions.Register("a.two", func(context.Context, smMsg) error { return nil })
	_ = actions.Register("a.one", func(context.Context, smMsg) error { return nil })

	resolvers := NewResolverMap[smMsg]()
	resolvers.RegisterDynamicTarget("r.two", func(context.Context, smMsg, ExecutionContext) (string, error) { return "approved", nil })
	resolvers.RegisterDynamicTarget("r.one", func(context.Context, smMsg, ExecutionContext) (string, error) { return "approved", nil })

	catalog := BuildEditorCatalog(guards, actions, resolvers)
	if len(catalog.Guards) != 2 || len(catalog.Steps) != 2 || len(catalog.Resolvers) != 2 {
		t.Fatalf("unexpected catalog sizes")
	}
	if catalog.Guards[0].ID != "g.one" || catalog.Steps[0].ID != "a.one" || catalog.Resolvers[0].ID != "r.one" {
		t.Fatalf("expected sorted canonical IDs")
	}
}

func comparableDefinition(def *MachineDefinition) *MachineDefinition {
	norm := NormalizeMachineDefinition(def)
	if norm == nil {
		return nil
	}
	for i := range norm.Transitions {
		norm.Transitions[i].Metadata = nil
		for j := range norm.Transitions[i].Workflow.Nodes {
			norm.Transitions[i].Workflow.Nodes[j].Metadata = nil
			if norm.Transitions[i].Workflow.Nodes[j].Step != nil {
				norm.Transitions[i].Workflow.Nodes[j].Step.Metadata = nil
			}
		}
	}
	for i := range norm.States {
		norm.States[i].Metadata = nil
	}
	return norm
}

func diagCodes(diags []ValidationDiagnostic) map[string]bool {
	out := make(map[string]bool, len(diags))
	for _, d := range diags {
		out[d.Code] = true
	}
	return out
}

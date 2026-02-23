package flow

import (
	"context"
	"testing"
)

func TestCompileMachineBuildsCompiledRuntimeModel(t *testing.T) {
	def := &MachineDefinition{
		ID:      "orders",
		Version: "v2",
		States: []StateDefinition{
			{Name: "draft", Initial: true},
			{Name: "approved"},
		},
		Transitions: []TransitionDefinition{
			{
				ID:    "approve",
				Event: "approve",
				From:  "draft",
				To:    "approved",
				Workflow: TransitionWorkflowDefinition{Nodes: []WorkflowNodeDefinition{
					{
						ID:   "send_approval",
						Kind: "step",
						Step: &StepDefinition{ActionID: "send_approval", Async: true, Delay: "5s", Timeout: "10s"},
					},
				}},
			},
		},
	}

	compiled, err := CompileMachine(def, NewResolverMap[smMsg]())
	if err != nil {
		t.Fatalf("compile failed: %v", err)
	}
	if compiled.ID != "orders" || compiled.Version != "v2" {
		t.Fatalf("unexpected machine metadata: id=%q version=%q", compiled.ID, compiled.Version)
	}
	if len(compiled.Transitions) != 1 {
		t.Fatalf("expected one transition")
	}
	tr := compiled.Transitions[0]
	if tr.To != "approved" {
		t.Fatalf("expected static target approved, got %s", tr.To)
	}
	if len(tr.Plan.Nodes) != 1 || tr.Plan.Nodes[0].Step == nil {
		t.Fatalf("expected compiled step node")
	}
	if tr.Plan.Nodes[0].Step.Delay.String() != "5s" {
		t.Fatalf("unexpected step delay: %s", tr.Plan.Nodes[0].Step.Delay)
	}
}

func TestCompileMachineTargetInvariants(t *testing.T) {
	reg := NewResolverMap[smMsg]()
	reg.RegisterDynamicTarget("resolver", func(context.Context, smMsg, ExecutionContext) (string, error) {
		return "approved", nil
	})

	cases := []struct {
		name string
		tr   TransitionDefinition
	}{
		{
			name: "to xor dynamic both set",
			tr: TransitionDefinition{
				Event: "approve", From: "draft", To: "approved",
				DynamicTo: &DynamicTargetDefinition{Resolver: "resolver"},
			},
		},
		{
			name: "to xor dynamic none set",
			tr:   TransitionDefinition{Event: "approve", From: "draft"},
		},
		{
			name: "dynamic resolver required",
			tr:   TransitionDefinition{Event: "approve", From: "draft", DynamicTo: &DynamicTargetDefinition{Resolver: "missing"}},
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			def := &MachineDefinition{
				ID:          "orders",
				Version:     "v2",
				States:      []StateDefinition{{Name: "draft", Initial: true}, {Name: "approved"}},
				Transitions: []TransitionDefinition{tc.tr},
			}
			if _, err := CompileMachine(def, reg); err == nil {
				t.Fatalf("expected compile failure")
			}
		})
	}
}

func TestCompileMachineExpressionGuardResolvesThroughRegistry(t *testing.T) {
	reg := NewResolverMap[smMsg]()
	called := false
	reg.RegisterGuard("risk > 10 || vip", func(context.Context, smMsg, ExecutionContext) error {
		called = true
		return nil
	})

	def := &MachineDefinition{
		ID:      "orders",
		Version: "v2",
		States:  []StateDefinition{{Name: "draft", Initial: true}, {Name: "approved"}},
		Transitions: []TransitionDefinition{
			{
				Event: "approve",
				From:  "draft",
				To:    "approved",
				Guards: []GuardDefinition{
					{Type: "expression", Expr: "risk > 10 || vip"},
				},
			},
		},
	}

	compiled, err := CompileMachine(def, reg)
	if err != nil {
		t.Fatalf("compile failed: %v", err)
	}
	if len(compiled.Transitions[0].Guards) != 1 {
		t.Fatalf("expected compiled guard")
	}
	if err := compiled.Transitions[0].Guards[0](context.Background(), smMsg{}, ExecutionContext{}); err != nil {
		t.Fatalf("guard execution failed: %v", err)
	}
	if !called {
		t.Fatalf("expected expression guard resolver to be called")
	}
}

func TestCompileMachineRejectsDuplicateNormalizedTransitionSelection(t *testing.T) {
	def := &MachineDefinition{
		ID:      "orders",
		Version: "v2",
		States: []StateDefinition{
			{Name: "Draft", Initial: true},
			{Name: "Approved"},
		},
		Transitions: []TransitionDefinition{
			{ID: "a", Event: "Approve", From: "Draft", To: "Approved"},
			{ID: "b", Event: " approve ", From: " draft ", To: "Approved"},
		},
	}
	if _, err := CompileMachine(def, NewResolverMap[smMsg]()); err == nil {
		t.Fatalf("expected duplicate normalized transition compilation failure")
	}
}

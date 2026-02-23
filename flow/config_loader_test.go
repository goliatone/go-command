package flow

import (
	"context"
	"testing"

	"github.com/goliatone/go-command"
)

type cfgMsg struct {
	ID string
}

func (cfgMsg) Type() string { return "cfgMsg" }

func TestBuildFlowsSerial(t *testing.T) {
	handler := command.CommandFunc[cfgMsg](func(context.Context, cfgMsg) error { return nil })
	reg := NewHandlerRegistry[cfgMsg]()
	reg.Register("h1", handler)

	cfg := FlowSet{
		Version: 1,
		Flows: []FlowDefinition{
			{
				ID:   "serial1",
				Type: "serial",
				Serial: &SerialConfig{
					Steps: []string{"h1"},
				},
			},
		},
	}

	flows, err := BuildFlows(context.Background(), cfg, BuildContext[cfgMsg]{Handlers: reg})
	if err != nil {
		t.Fatalf("expected build success: %v", err)
	}
	if len(flows) != 1 {
		t.Fatalf("expected 1 flow, got %d", len(flows))
	}
}

func TestBuildFlowsStateMachineValidation(t *testing.T) {
	cfg := FlowSet{
		Version: 1,
		Flows: []FlowDefinition{
			{
				ID:   "sm1",
				Type: "state_machine",
				StateMachine: &StateMachineConfig{
					Entity:          "order",
					ExecutionPolicy: ExecutionPolicyLightweight,
					States:          []StateConfig{{Name: "draft", Initial: true}, {Name: "approved"}},
					Transitions: []TransitionConfig{
						{Name: "approve", From: "draft", To: "approved"},
					},
				},
			},
		},
	}
	req := TransitionRequest[sagaMsg]{StateKey: func(m sagaMsg) string { return m.Name }, Event: func(m sagaMsg) string { return "approve" }}
	_, err := BuildFlows(context.Background(), cfg, BuildContext[sagaMsg]{Request: req})
	if err != nil {
		t.Fatalf("expected state machine build success: %v", err)
	}
}

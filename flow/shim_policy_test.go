package flow

import (
	"reflect"
	"testing"
)

type shimAuditMsg struct {
	ID    string
	Event string
	State string
}

func (shimAuditMsg) Type() string { return "shim.audit" }

func TestStateMachineShimPolicyExecuteOnlyCompatibilityBridge(t *testing.T) {
	stateMachineType := reflect.TypeOf((*StateMachine[shimAuditMsg])(nil))

	if _, ok := stateMachineType.MethodByName("Execute"); !ok {
		t.Fatal("expected Execute compatibility wrapper")
	}

	disallowed := []string{
		"Dispatch",
		"DispatchEvent",
		"Transition",
	}
	for _, method := range disallowed {
		if _, ok := stateMachineType.MethodByName(method); ok {
			t.Fatalf("unexpected legacy shim method %s on StateMachine", method)
		}
	}
}

package flow

import "strings"

// ExecutionPolicy controls how transition effects and lifecycle events are handled.
type ExecutionPolicy string

const (
	ExecutionPolicyLightweight  ExecutionPolicy = "lightweight"
	ExecutionPolicyOrchestrated ExecutionPolicy = "orchestrated"
)

func normalizeExecutionPolicy(policy ExecutionPolicy) ExecutionPolicy {
	switch ExecutionPolicy(strings.ToLower(strings.TrimSpace(string(policy)))) {
	case ExecutionPolicyLightweight:
		return ExecutionPolicyLightweight
	case ExecutionPolicyOrchestrated:
		return ExecutionPolicyOrchestrated
	default:
		return ""
	}
}

func isValidExecutionPolicy(policy ExecutionPolicy) bool {
	return normalizeExecutionPolicy(policy) != ""
}

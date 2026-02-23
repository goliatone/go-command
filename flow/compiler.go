package flow

import (
	"fmt"
	"strings"
	"time"
)

// CompileMachine compiles canonical authoring definitions into runtime contracts.
func CompileMachine[T any](def *MachineDefinition, reg ResolverRegistry[T]) (*CompiledMachine[T], error) {
	if def == nil {
		return nil, fmt.Errorf("machine definition required")
	}
	if len(def.States) == 0 {
		return nil, fmt.Errorf("machine %q must define at least one state", def.ID)
	}

	states := make([]State, 0, len(def.States))
	stateSet := make(map[string]struct{}, len(def.States))
	for _, st := range def.States {
		name := normalizeState(st.Name)
		if name == "" {
			return nil, fmt.Errorf("machine %q has empty state name", def.ID)
		}
		if _, exists := stateSet[name]; exists {
			return nil, fmt.Errorf("machine %q has duplicate state %q", def.ID, st.Name)
		}
		stateSet[name] = struct{}{}
		states = append(states, State{
			Name:     name,
			Initial:  st.Initial,
			Metadata: copyMap(st.Metadata),
		})
	}

	transitions := make([]CompiledTransition[T], 0, len(def.Transitions))
	transitionSet := make(map[string]struct{}, len(def.Transitions))
	for idx, tr := range def.Transitions {
		compiled, err := compileTransition(def.ID, tr, stateSet, reg)
		if err != nil {
			name := tr.ID
			if strings.TrimSpace(name) == "" {
				name = fmt.Sprintf("%d", idx)
			}
			return nil, fmt.Errorf("transition %s: %w", name, err)
		}
		key := transitionKey(compiled.From, compiled.Event)
		if _, exists := transitionSet[key]; exists {
			return nil, fmt.Errorf("transition %s: duplicate normalized transition for from=%s event=%s", compiled.ID, compiled.From, compiled.Event)
		}
		transitionSet[key] = struct{}{}
		transitions = append(transitions, compiled)
	}

	return &CompiledMachine[T]{
		ID:          strings.TrimSpace(def.ID),
		Version:     strings.TrimSpace(def.Version),
		States:      states,
		Transitions: transitions,
	}, nil
}

func compileTransition[T any](
	machineID string,
	tr TransitionDefinition,
	stateSet map[string]struct{},
	reg ResolverRegistry[T],
) (CompiledTransition[T], error) {
	event := normalizeEvent(tr.Event)
	from := normalizeState(tr.From)
	to := normalizeState(tr.To)

	if event == "" {
		return CompiledTransition[T]{}, fmt.Errorf("event is required")
	}
	if from == "" {
		return CompiledTransition[T]{}, fmt.Errorf("from state is required")
	}
	if _, ok := stateSet[from]; !ok {
		return CompiledTransition[T]{}, fmt.Errorf("unknown from state %q", tr.From)
	}

	hasStatic := to != ""
	dynamicResolver := ""
	if tr.DynamicTo != nil {
		dynamicResolver = strings.TrimSpace(tr.DynamicTo.Resolver)
	}
	hasDynamic := dynamicResolver != ""

	switch {
	case hasStatic && hasDynamic:
		return CompiledTransition[T]{}, fmt.Errorf("invalid target: set either To or DynamicTo resolver")
	case !hasStatic && !hasDynamic:
		return CompiledTransition[T]{}, fmt.Errorf("invalid target: either To or DynamicTo resolver is required")
	}

	if hasStatic {
		if _, ok := stateSet[to]; !ok {
			return CompiledTransition[T]{}, fmt.Errorf("unknown target state %q", tr.To)
		}
	}

	guards, err := compileGuards(tr.Guards, reg)
	if err != nil {
		return CompiledTransition[T]{}, err
	}
	plan, err := compileWorkflowPlan(machineID, tr)
	if err != nil {
		return CompiledTransition[T]{}, err
	}

	var dynamic DynamicTargetResolver[T]
	if hasDynamic {
		if reg == nil {
			return CompiledTransition[T]{}, fmt.Errorf("dynamic target resolver registry not configured for %q", dynamicResolver)
		}
		fn, ok := reg.DynamicTarget(dynamicResolver)
		if !ok || fn == nil {
			return CompiledTransition[T]{}, fmt.Errorf("dynamic target resolver %q not found", dynamicResolver)
		}
		dynamic = fn
	}

	id := strings.TrimSpace(tr.ID)
	if id == "" {
		id = fmt.Sprintf("%s::%s", from, event)
	}

	return CompiledTransition[T]{
		ID:              id,
		Event:           event,
		From:            from,
		To:              to,
		DynamicTo:       dynamic,
		DynamicResolver: dynamicResolver,
		Guards:          guards,
		Plan:            plan,
		Metadata:        copyMap(tr.Metadata),
	}, nil
}

func compileGuards[T any](defs []GuardDefinition, reg ResolverRegistry[T]) ([]Guard[T], error) {
	if len(defs) == 0 {
		return nil, nil
	}
	if reg == nil {
		return nil, fmt.Errorf("guard resolver registry not configured")
	}
	guards := make([]Guard[T], 0, len(defs))
	for idx, gd := range defs {
		kind := strings.ToLower(strings.TrimSpace(gd.Type))
		switch kind {
		case "", "resolver":
			ref := strings.TrimSpace(gd.Ref)
			if ref == "" {
				return nil, fmt.Errorf("guard[%d]: resolver ref is required", idx)
			}
			g, ok := reg.Guard(ref)
			if !ok || g == nil {
				return nil, fmt.Errorf("guard[%d]: resolver %q not found", idx, ref)
			}
			guards = append(guards, g)
		case "expression":
			// Expression guards resolve through the guard registry so OR logic stays
			// encapsulated in expression evaluators while runtime guard composition
			// remains ordered AND + short-circuit.
			expr := strings.TrimSpace(gd.Expr)
			if expr == "" {
				return nil, fmt.Errorf("guard[%d]: expression cannot be empty", idx)
			}
			g, ok := reg.Guard(expr)
			if !ok || g == nil {
				return nil, fmt.Errorf("guard[%d]: expression resolver %q not found", idx, expr)
			}
			guards = append(guards, g)
		default:
			return nil, fmt.Errorf("guard[%d]: unsupported type %q", idx, gd.Type)
		}
	}
	return guards, nil
}

func compileWorkflowPlan(_ string, tr TransitionDefinition) (CompiledWorkflowPlan, error) {
	if len(tr.Workflow.Nodes) == 0 {
		return CompiledWorkflowPlan{}, nil
	}
	nodes := make([]CompiledWorkflowNode, 0, len(tr.Workflow.Nodes))
	for idx, node := range tr.Workflow.Nodes {
		kind := strings.ToLower(strings.TrimSpace(node.Kind))
		if kind == "" && node.Step != nil {
			kind = "step"
		}
		switch kind {
		case "step", "when":
		default:
			return CompiledWorkflowPlan{}, fmt.Errorf("workflow node[%d] has unsupported kind %q", idx, node.Kind)
		}

		compiled := CompiledWorkflowNode{
			ID:            strings.TrimSpace(node.ID),
			Kind:          kind,
			ConditionExpr: strings.TrimSpace(node.Expr),
			Next:          copySlice(node.Next),
			Metadata:      copyMap(node.Metadata),
		}
		if kind == "step" {
			if node.Step == nil {
				return CompiledWorkflowPlan{}, fmt.Errorf("workflow node[%d] step kind requires step definition", idx)
			}
			step, err := compileStep(*node.Step)
			if err != nil {
				return CompiledWorkflowPlan{}, fmt.Errorf("workflow node[%d]: %w", idx, err)
			}
			compiled.Step = step
		}
		nodes = append(nodes, compiled)
	}
	return CompiledWorkflowPlan{Nodes: nodes}, nil
}

func compileStep(step StepDefinition) (*Step, error) {
	actionID := strings.TrimSpace(step.ActionID)
	if actionID == "" {
		return nil, fmt.Errorf("step action_id is required")
	}
	delay, err := parseStepDuration(step.Delay)
	if err != nil {
		return nil, fmt.Errorf("invalid delay: %w", err)
	}
	timeout, err := parseStepDuration(step.Timeout)
	if err != nil {
		return nil, fmt.Errorf("invalid timeout: %w", err)
	}
	return &Step{
		ActionID: actionID,
		Async:    step.Async,
		Delay:    delay,
		Timeout:  timeout,
		Metadata: copyMap(step.Metadata),
	}, nil
}

func parseStepDuration(value string) (time.Duration, error) {
	value = strings.TrimSpace(value)
	if value == "" {
		return 0, nil
	}
	return time.ParseDuration(value)
}

func copyMap(in map[string]any) map[string]any {
	if len(in) == 0 {
		return nil
	}
	out := make(map[string]any, len(in))
	for k, v := range in {
		out[k] = v
	}
	return out
}

func copySlice(in []string) []string {
	if len(in) == 0 {
		return nil
	}
	out := make([]string, len(in))
	copy(out, in)
	return out
}

package flow

import (
	"fmt"
	"sort"
	"strings"
)

const dslWorkflowMetadataKey = "_dsl_workflow"

// DSLValidationError wraps deterministic diagnostics emitted by DSL compilation/validation.
type DSLValidationError struct {
	Diagnostics []ValidationDiagnostic
}

func (e *DSLValidationError) Error() string {
	if e == nil || len(e.Diagnostics) == 0 {
		return "dsl validation failed"
	}
	first := e.Diagnostics[0]
	return fmt.Sprintf("dsl validation failed: %s (%s)", first.Message, first.Code)
}

// DSLCompileOptions configures compile-time validation behavior.
type DSLCompileOptions struct {
	KnownActions map[string]struct{}
}

var defaultDSLCompileOptions = DSLCompileOptions{}

// SetDSLCompileKnownActions configures known action IDs used for unresolved-action validation.
func SetDSLCompileKnownActions(actionIDs []string) {
	set := make(map[string]struct{}, len(actionIDs))
	for _, id := range actionIDs {
		id = strings.TrimSpace(id)
		if id != "" {
			set[id] = struct{}{}
		}
	}
	defaultDSLCompileOptions = DSLCompileOptions{KnownActions: set}
}

// CompileDSL parses and validates DSL into canonical MachineDefinition.
func CompileDSL(input string) (*MachineDefinition, error) {
	return CompileDSLWithOptions(input, defaultDSLCompileOptions)
}

// CompileDSLWithOptions parses DSL into canonical MachineDefinition with explicit compile options.
func CompileDSLWithOptions(input string, opts DSLCompileOptions) (*MachineDefinition, error) {
	parser := newDSLParser(input)
	machineAST, diags := parser.parse()
	if hasErrorDiagnostics(diags) {
		sortDiagnostics(diags)
		return nil, &DSLValidationError{Diagnostics: diags}
	}

	def := &MachineDefinition{
		ID:      machineAST.Name,
		Name:    machineAST.Name,
		Version: machineAST.Version,
	}
	for _, st := range machineAST.States {
		state := StateDefinition{Name: st.Name, Terminal: st.Terminal}
		if normalizeState(st.Name) == normalizeState(machineAST.Initial) {
			state.Initial = true
		}
		def.States = append(def.States, state)
	}

	for tIdx, tr := range machineAST.Transitions {
		td := TransitionDefinition{
			ID:    fmt.Sprintf("%s::%s", normalizeState(tr.From), normalizeEvent(tr.Event)),
			Event: tr.Event,
			From:  tr.From,
		}

		if strings.TrimSpace(tr.To) != "" && strings.TrimSpace(tr.DynamicResolver) != "" {
			diags = append(diags, ValidationDiagnostic{
				Code:     DiagCodeInvalidTarget,
				Severity: SeverityError,
				Message:  "transition target must set exactly one of to or dynamic resolver",
				Path:     fmt.Sprintf("$.transitions[%d].target", tIdx),
				NodeID:   td.ID,
				Field:    "target",
			})
		}
		if strings.TrimSpace(tr.To) == "" && strings.TrimSpace(tr.DynamicResolver) == "" {
			diags = append(diags, ValidationDiagnostic{
				Code:     DiagCodeInvalidTarget,
				Severity: SeverityError,
				Message:  "transition target must define to or dynamic resolver",
				Path:     fmt.Sprintf("$.transitions[%d].target", tIdx),
				NodeID:   td.ID,
				Field:    "target",
			})
		}
		if strings.TrimSpace(tr.To) != "" {
			td.To = tr.To
		}
		if strings.TrimSpace(tr.DynamicResolver) != "" {
			td.DynamicTo = &DynamicTargetDefinition{Resolver: tr.DynamicResolver}
		}

		for _, guardExpr := range tr.Guards {
			td.Guards = append(td.Guards, GuardDefinition{
				Type: "expression",
				Expr: guardExpr,
			})
		}

		if len(tr.Steps) > 0 && len(tr.Workflow) > 0 {
			diags = append(diags, ValidationDiagnostic{
				Code:     DiagCodeInvalidWorkflowNode,
				Severity: SeverityError,
				Message:  "transition cannot define both step shorthand and workflow block",
				Path:     fmt.Sprintf("$.transitions[%d].workflow", tIdx),
				NodeID:   td.ID,
				Field:    "workflow",
			})
		}
		if len(tr.Steps) == 0 && len(tr.Workflow) == 0 {
			diags = append(diags, ValidationDiagnostic{
				Code:     DiagCodeMissingWorkflow,
				Severity: SeverityError,
				Message:  "transition must define step shorthand or workflow block",
				Path:     fmt.Sprintf("$.transitions[%d].workflow", tIdx),
				NodeID:   td.ID,
				Field:    "workflow",
			})
		}

		workflowAST := tr.Workflow
		if len(tr.Steps) > 0 {
			workflowAST = shorthandToWorkflowAST(tr.Steps)
		}
		workflow, stepIDs := compileWorkflowAST(workflowAST, td.ID)
		td.Workflow = workflow
		if td.Metadata == nil {
			td.Metadata = map[string]any{}
		}
		td.Metadata[dslWorkflowMetadataKey] = workflowASTToAny(workflowAST)

		for sIdx, actionID := range stepIDs {
			if strings.TrimSpace(actionID) == "" {
				diags = append(diags, ValidationDiagnostic{
					Code:     DiagCodeUnresolvedAction,
					Severity: SeverityError,
					Message:  "step action_id is required",
					Path:     fmt.Sprintf("$.transitions[%d].workflow.nodes[%d].step.action_id", tIdx, sIdx),
					NodeID:   td.ID,
					Field:    "action_id",
				})
				continue
			}
			if len(opts.KnownActions) > 0 {
				if _, ok := opts.KnownActions[actionID]; !ok {
					diags = append(diags, ValidationDiagnostic{
						Code:     DiagCodeUnresolvedAction,
						Severity: SeverityError,
						Message:  fmt.Sprintf("unresolved action %q", actionID),
						Path:     fmt.Sprintf("$.transitions[%d].workflow.nodes[%d].step.action_id", tIdx, sIdx),
						NodeID:   td.ID,
						Field:    "action_id",
					})
				}
			}
		}

		def.Transitions = append(def.Transitions, td)
	}

	catalog := &EditorCatalog{}
	if len(opts.KnownActions) > 0 {
		actions := make([]string, 0, len(opts.KnownActions))
		for id := range opts.KnownActions {
			actions = append(actions, id)
		}
		sort.Strings(actions)
		for _, id := range actions {
			catalog.Steps = append(catalog.Steps, CatalogItem{ID: id, Label: id})
		}
	}
	diags = append(diags, ValidateMachineDefinition(def, catalog)...)
	sortDiagnostics(diags)
	if hasErrorDiagnostics(diags) {
		return nil, &DSLValidationError{Diagnostics: diags}
	}
	return NormalizeMachineDefinition(def), nil
}

// ToDSL renders canonical machine definitions to deterministic DSL.
func (m *MachineDefinition) ToDSL() (string, error) {
	if m == nil {
		return "", fmt.Errorf("machine definition required")
	}
	norm := NormalizeMachineDefinition(m)
	if norm == nil {
		return "", fmt.Errorf("machine definition required")
	}
	machineName := strings.TrimSpace(norm.Name)
	if machineName == "" {
		machineName = strings.TrimSpace(norm.ID)
	}
	if machineName == "" {
		machineName = "machine"
	}
	version := strings.TrimSpace(norm.Version)
	if version == "" {
		version = "v1"
	}

	initial := ""
	for _, st := range norm.States {
		if st.Initial {
			initial = st.Name
			break
		}
	}
	if initial == "" && len(norm.States) > 0 {
		initial = norm.States[0].Name
	}

	var b strings.Builder
	b.WriteString(fmt.Sprintf("machine %s version %s {\n", machineName, version))
	if initial != "" {
		b.WriteString(fmt.Sprintf("    initial %s\n\n", initial))
	}

	for _, st := range norm.States {
		line := fmt.Sprintf("    state %s", st.Name)
		if st.Terminal {
			line += " terminal"
		}
		b.WriteString(line + "\n")
	}
	if len(norm.States) > 0 {
		b.WriteString("\n")
	}

	for _, tr := range norm.Transitions {
		b.WriteString(fmt.Sprintf("    transition %s {\n", tr.Event))
		b.WriteString(fmt.Sprintf("        from %s\n", tr.From))
		if tr.DynamicTo != nil && strings.TrimSpace(tr.DynamicTo.Resolver) != "" {
			b.WriteString(fmt.Sprintf("        dynamic %s\n", tr.DynamicTo.Resolver))
		} else {
			b.WriteString(fmt.Sprintf("        to %s\n", tr.To))
		}
		for _, g := range tr.Guards {
			expr := strings.TrimSpace(g.Expr)
			if strings.EqualFold(g.Type, "resolver") {
				expr = strings.TrimSpace(g.Ref)
			}
			if expr == "" {
				continue
			}
			b.WriteString(fmt.Sprintf("        guard %s\n", expr))
		}

		if workflowAST, ok := decodeWorkflowASTFromMetadata(tr.Metadata); ok && len(workflowAST) > 0 {
			b.WriteString("        workflow {\n")
			renderWorkflowAST(&b, workflowAST, 3)
			b.WriteString("        }\n")
		} else if steps, ok := linearWorkflowSteps(tr.Workflow.Nodes); ok && len(steps) > 0 {
			for _, actionID := range steps {
				b.WriteString(fmt.Sprintf("        step %s\n", actionID))
			}
		} else {
			b.WriteString("        workflow {\n")
			renderWorkflowNodesFlat(&b, tr.Workflow.Nodes, 3)
			b.WriteString("        }\n")
		}
		b.WriteString("    }\n\n")
	}
	b.WriteString("}\n")
	return b.String(), nil
}

func linearWorkflowSteps(nodes []WorkflowNodeDefinition) ([]string, bool) {
	if len(nodes) == 0 {
		return nil, false
	}
	steps := make([]string, 0, len(nodes))
	for _, node := range nodes {
		if strings.ToLower(strings.TrimSpace(node.Kind)) != "step" || node.Step == nil {
			return nil, false
		}
		steps = append(steps, node.Step.ActionID)
	}
	return steps, true
}

func renderWorkflowNodesFlat(b *strings.Builder, nodes []WorkflowNodeDefinition, indent int) {
	pad := strings.Repeat("    ", indent)
	for _, node := range nodes {
		switch strings.ToLower(strings.TrimSpace(node.Kind)) {
		case "step":
			if node.Step != nil {
				b.WriteString(fmt.Sprintf("%sstep %s\n", pad, node.Step.ActionID))
			}
		case "when":
			b.WriteString(fmt.Sprintf("%swhen %s {\n", pad, strings.TrimSpace(node.Expr)))
			b.WriteString(fmt.Sprintf("%s}\n", pad))
		}
	}
}

func renderWorkflowAST(b *strings.Builder, nodes []dslWorkflowNode, indent int) {
	pad := strings.Repeat("    ", indent)
	for _, node := range nodes {
		switch node.Kind {
		case "step":
			b.WriteString(fmt.Sprintf("%sstep %s\n", pad, node.StepAction))
		case "when":
			b.WriteString(fmt.Sprintf("%swhen %s {\n", pad, node.Expr))
			renderWorkflowAST(b, node.Then, indent+1)
			b.WriteString(fmt.Sprintf("%s}", pad))
			if len(node.Else) > 0 {
				b.WriteString(" else {\n")
				renderWorkflowAST(b, node.Else, indent+1)
				b.WriteString(fmt.Sprintf("%s}\n", pad))
			} else {
				b.WriteString("\n")
			}
		}
	}
}

func hasErrorDiagnostics(diags []ValidationDiagnostic) bool {
	for _, diag := range diags {
		if diag.Severity == SeverityError {
			return true
		}
	}
	return false
}

func shorthandToWorkflowAST(steps []string) []dslWorkflowNode {
	nodes := make([]dslWorkflowNode, 0, len(steps))
	for _, step := range steps {
		nodes = append(nodes, dslWorkflowNode{Kind: "step", StepAction: strings.TrimSpace(step)})
	}
	return nodes
}

func workflowASTToAny(nodes []dslWorkflowNode) []map[string]any {
	out := make([]map[string]any, 0, len(nodes))
	for _, node := range nodes {
		entry := map[string]any{"kind": node.Kind}
		if node.Kind == "step" {
			entry["step"] = node.StepAction
		} else {
			entry["expr"] = node.Expr
			entry["then"] = workflowASTToAny(node.Then)
			if len(node.Else) > 0 {
				entry["else"] = workflowASTToAny(node.Else)
			}
		}
		out = append(out, entry)
	}
	return out
}

func decodeWorkflowASTFromMetadata(metadata map[string]any) ([]dslWorkflowNode, bool) {
	if len(metadata) == 0 {
		return nil, false
	}
	raw, ok := metadata[dslWorkflowMetadataKey]
	if !ok {
		return nil, false
	}
	nodes, ok := raw.([]map[string]any)
	if ok {
		return decodeWorkflowAST(nodes), true
	}
	generic, ok := raw.([]any)
	if !ok {
		return nil, false
	}
	norm := make([]map[string]any, 0, len(generic))
	for _, item := range generic {
		m, ok := item.(map[string]any)
		if !ok {
			continue
		}
		norm = append(norm, m)
	}
	if len(norm) == 0 {
		return nil, false
	}
	return decodeWorkflowAST(norm), true
}

func decodeWorkflowAST(raw []map[string]any) []dslWorkflowNode {
	nodes := make([]dslWorkflowNode, 0, len(raw))
	for _, item := range raw {
		kind, _ := item["kind"].(string)
		switch kind {
		case "step":
			step, _ := item["step"].(string)
			nodes = append(nodes, dslWorkflowNode{Kind: "step", StepAction: step})
		case "when":
			expr, _ := item["expr"].(string)
			thenRaw := toMapSlice(item["then"])
			elseRaw := toMapSlice(item["else"])
			nodes = append(nodes, dslWorkflowNode{
				Kind: "when",
				Expr: expr,
				Then: decodeWorkflowAST(thenRaw),
				Else: decodeWorkflowAST(elseRaw),
			})
		}
	}
	return nodes
}

func toMapSlice(value any) []map[string]any {
	if value == nil {
		return nil
	}
	if typed, ok := value.([]map[string]any); ok {
		return typed
	}
	if typed, ok := value.([]any); ok {
		out := make([]map[string]any, 0, len(typed))
		for _, item := range typed {
			if m, ok := item.(map[string]any); ok {
				out = append(out, m)
			}
		}
		return out
	}
	return nil
}

type dslMachine struct {
	Name        string
	Version     string
	Initial     string
	States      []dslState
	Transitions []dslTransition
}

type dslState struct {
	Name     string
	Terminal bool
}

type dslTransition struct {
	Event           string
	From            string
	To              string
	DynamicResolver string
	Guards          []string
	Steps           []string
	Workflow        []dslWorkflowNode
}

type dslWorkflowNode struct {
	Kind       string
	StepAction string
	Expr       string
	Then       []dslWorkflowNode
	Else       []dslWorkflowNode
}

type dslParser struct {
	lines []string
	idx   int
	diags []ValidationDiagnostic
}

func newDSLParser(input string) *dslParser {
	input = strings.ReplaceAll(input, "\r\n", "\n")
	input = strings.ReplaceAll(input, "} else {", "}\nelse {")
	lines := strings.Split(input, "\n")
	return &dslParser{lines: lines}
}

func (p *dslParser) parse() (*dslMachine, []ValidationDiagnostic) {
	machine := &dslMachine{}
	line, ok := p.nextMeaningfulLine()
	if !ok {
		p.emitDiag(DiagCodeParseError, SeverityError, "machine declaration required", "$.machine", "", "")
		return machine, p.diags
	}
	if !strings.HasPrefix(line, "machine ") {
		p.emitDiag(DiagCodeParseError, SeverityError, "machine declaration required", "$.machine", "", "")
		return machine, p.diags
	}
	header := strings.TrimSpace(strings.TrimSuffix(line, "{"))
	parts := strings.Fields(header)
	if len(parts) != 4 || parts[0] != "machine" || parts[2] != "version" || !strings.HasSuffix(line, "{") {
		p.emitDiag(DiagCodeParseError, SeverityError, "invalid machine declaration", "$.machine", "", "")
		return machine, p.diags
	}
	machine.Name = parts[1]
	machine.Version = parts[3]

	for {
		line, ok := p.nextMeaningfulLine()
		if !ok {
			p.emitDiag(DiagCodeParseError, SeverityError, "unterminated machine block", "$.machine", "", "")
			break
		}
		if line == "}" {
			break
		}
		switch {
		case strings.HasPrefix(line, "initial "):
			machine.Initial = strings.TrimSpace(strings.TrimPrefix(line, "initial "))
		case strings.HasPrefix(line, "state "):
			stateFields := strings.Fields(strings.TrimSpace(strings.TrimPrefix(line, "state ")))
			if len(stateFields) == 0 {
				p.emitDiag(DiagCodeParseError, SeverityError, "state name required", "$.states", "", "name")
				continue
			}
			st := dslState{Name: stateFields[0]}
			if len(stateFields) > 1 && stateFields[1] == "terminal" {
				st.Terminal = true
			}
			machine.States = append(machine.States, st)
		case strings.HasPrefix(line, "transition "):
			tr, ok := p.parseTransition(line, len(machine.Transitions))
			if ok {
				machine.Transitions = append(machine.Transitions, tr)
			}
		default:
			p.emitDiag(DiagCodeParseError, SeverityError, fmt.Sprintf("unexpected token %q", line), "$.machine", "", "")
		}
	}

	if machine.Initial == "" && len(machine.States) > 0 {
		machine.Initial = machine.States[0].Name
	}
	return machine, p.diags
}

func (p *dslParser) parseTransition(headerLine string, index int) (dslTransition, bool) {
	tr := dslTransition{}
	header := strings.TrimSpace(strings.TrimSuffix(headerLine, "{"))
	parts := strings.Fields(header)
	if len(parts) != 2 || parts[0] != "transition" || !strings.HasSuffix(headerLine, "{") {
		p.emitDiag(DiagCodeParseError, SeverityError, "invalid transition header", fmt.Sprintf("$.transitions[%d]", index), "", "")
		return tr, false
	}
	tr.Event = parts[1]

	for {
		line, ok := p.nextMeaningfulLine()
		if !ok {
			p.emitDiag(DiagCodeParseError, SeverityError, "unterminated transition block", fmt.Sprintf("$.transitions[%d]", index), "", "")
			return tr, false
		}
		if line == "}" {
			return tr, true
		}
		switch {
		case strings.HasPrefix(line, "from "):
			tr.From = strings.TrimSpace(strings.TrimPrefix(line, "from "))
		case strings.HasPrefix(line, "to "):
			tr.To = strings.TrimSpace(strings.TrimPrefix(line, "to "))
		case strings.HasPrefix(line, "dynamic "):
			tr.DynamicResolver = strings.TrimSpace(strings.TrimPrefix(line, "dynamic "))
		case strings.HasPrefix(line, "guard "):
			expr := strings.TrimSpace(strings.TrimPrefix(line, "guard "))
			if expr != "" {
				tr.Guards = append(tr.Guards, expr)
			}
		case strings.HasPrefix(line, "step "):
			step := strings.TrimSpace(strings.TrimPrefix(line, "step "))
			tr.Steps = append(tr.Steps, step)
		case line == "workflow {":
			workflow, ok := p.parseWorkflowBlock(fmt.Sprintf("$.transitions[%d].workflow", index))
			if ok {
				tr.Workflow = workflow
			}
		default:
			p.emitDiag(DiagCodeParseError, SeverityError, fmt.Sprintf("unexpected transition token %q", line), fmt.Sprintf("$.transitions[%d]", index), "", "")
		}
	}
}

func (p *dslParser) parseWorkflowBlock(path string) ([]dslWorkflowNode, bool) {
	nodes := make([]dslWorkflowNode, 0)
	for {
		line, ok := p.nextMeaningfulLine()
		if !ok {
			p.emitDiag(DiagCodeParseError, SeverityError, "unterminated workflow block", path, "", "")
			return nodes, false
		}
		if line == "}" {
			return nodes, true
		}
		switch {
		case strings.HasPrefix(line, "step "):
			nodes = append(nodes, dslWorkflowNode{
				Kind:       "step",
				StepAction: strings.TrimSpace(strings.TrimPrefix(line, "step ")),
			})
		case strings.HasPrefix(line, "when ") && strings.HasSuffix(line, "{"):
			expr := strings.TrimSpace(strings.TrimSuffix(strings.TrimPrefix(line, "when "), "{"))
			thenNodes, ok := p.parseWorkflowBlock(path + ".when")
			if !ok {
				return nodes, false
			}
			var elseNodes []dslWorkflowNode
			peek, has := p.peekMeaningfulLine()
			if has && (peek == "else {" || peek == "else") {
				_, _ = p.nextMeaningfulLine()
				if peek == "else" {
					braceLine, ok := p.nextMeaningfulLine()
					if !ok || braceLine != "{" {
						p.emitDiag(DiagCodeParseError, SeverityError, "else block requires opening brace", path+".else", "", "")
						return nodes, false
					}
				}
				parsedElse, ok := p.parseWorkflowBlock(path + ".else")
				if !ok {
					return nodes, false
				}
				elseNodes = parsedElse
			}
			nodes = append(nodes, dslWorkflowNode{
				Kind: "when",
				Expr: expr,
				Then: thenNodes,
				Else: elseNodes,
			})
		default:
			p.emitDiag(DiagCodeParseError, SeverityError, fmt.Sprintf("unexpected workflow token %q", line), path, "", "")
		}
	}
}

func (p *dslParser) emitDiag(code, severity, message, path, nodeID, field string) {
	p.diags = append(p.diags, ValidationDiagnostic{
		Code:     code,
		Severity: severity,
		Message:  message,
		Path:     path,
		NodeID:   nodeID,
		Field:    field,
	})
}

func (p *dslParser) nextMeaningfulLine() (string, bool) {
	for p.idx < len(p.lines) {
		line := strings.TrimSpace(p.lines[p.idx])
		p.idx++
		if line == "" || strings.HasPrefix(line, "//") || strings.HasPrefix(line, "#") {
			continue
		}
		return line, true
	}
	return "", false
}

func (p *dslParser) peekMeaningfulLine() (string, bool) {
	idx := p.idx
	for idx < len(p.lines) {
		line := strings.TrimSpace(p.lines[idx])
		if line == "" || strings.HasPrefix(line, "//") || strings.HasPrefix(line, "#") {
			idx++
			continue
		}
		return line, true
	}
	return "", false
}

type workflowIDGenerator struct {
	next int
}

func (g *workflowIDGenerator) nextID(prefix string) string {
	g.next++
	return fmt.Sprintf("%s_%03d", prefix, g.next)
}

func compileWorkflowAST(ast []dslWorkflowNode, transitionID string) (TransitionWorkflowDefinition, []string) {
	gen := &workflowIDGenerator{}
	nodes, _, _ := compileWorkflowSequence(ast, transitionID, gen)
	out := make([]WorkflowNodeDefinition, 0, len(nodes))
	stepIDs := make([]string, 0)
	for _, node := range nodes {
		out = append(out, *node)
		if node.Kind == "step" && node.Step != nil {
			stepIDs = append(stepIDs, node.Step.ActionID)
		}
	}
	return TransitionWorkflowDefinition{Nodes: out}, stepIDs
}

func compileWorkflowSequence(ast []dslWorkflowNode, transitionID string, gen *workflowIDGenerator) ([]*WorkflowNodeDefinition, string, []string) {
	nodes := make([]*WorkflowNodeDefinition, 0)
	nodeIndex := make(map[string]*WorkflowNodeDefinition)
	head := ""
	prevTails := make([]string, 0)

	for _, astNode := range ast {
		nodeDefs, nodeHead, nodeTails := compileWorkflowNode(astNode, transitionID, gen)
		if nodeHead == "" {
			continue
		}
		if head == "" {
			head = nodeHead
		}
		for _, tailID := range prevTails {
			if tail, ok := nodeIndex[tailID]; ok {
				tail.Next = appendUniqueString(tail.Next, nodeHead)
			}
		}
		for _, n := range nodeDefs {
			nodes = append(nodes, n)
			nodeIndex[n.ID] = n
		}
		prevTails = nodeTails
	}
	return nodes, head, prevTails
}

func compileWorkflowNode(ast dslWorkflowNode, transitionID string, gen *workflowIDGenerator) ([]*WorkflowNodeDefinition, string, []string) {
	switch ast.Kind {
	case "step":
		id := gen.nextID(sanitizeID(transitionID) + "_step")
		node := &WorkflowNodeDefinition{
			ID:   id,
			Kind: "step",
			Step: &StepDefinition{ActionID: strings.TrimSpace(ast.StepAction)},
		}
		return []*WorkflowNodeDefinition{node}, id, []string{id}
	case "when":
		whenID := gen.nextID(sanitizeID(transitionID) + "_when")
		thenNodes, thenHead, thenTails := compileWorkflowSequence(ast.Then, transitionID+"_then", gen)
		elseNodes, elseHead, elseTails := compileWorkflowSequence(ast.Else, transitionID+"_else", gen)

		next := make([]string, 0, 2)
		if thenHead != "" {
			next = append(next, thenHead)
		}
		if elseHead != "" {
			next = append(next, elseHead)
		}
		whenNode := &WorkflowNodeDefinition{
			ID:   whenID,
			Kind: "when",
			Expr: strings.TrimSpace(ast.Expr),
			Next: next,
		}

		tails := make([]string, 0)
		tails = append(tails, thenTails...)
		if len(ast.Else) == 0 {
			tails = append(tails, whenID)
		} else {
			tails = append(tails, elseTails...)
		}
		defs := []*WorkflowNodeDefinition{whenNode}
		defs = append(defs, thenNodes...)
		defs = append(defs, elseNodes...)
		return defs, whenID, tails
	default:
		return nil, "", nil
	}
}

func appendUniqueString(in []string, value string) []string {
	if value == "" {
		return in
	}
	for _, existing := range in {
		if existing == value {
			return in
		}
	}
	return append(in, value)
}

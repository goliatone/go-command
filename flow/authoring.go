package flow

import (
	"encoding/json"
	"fmt"
	"sort"
	"strings"
	"time"
)

const (
	SeverityError   = "error"
	SeverityWarning = "warning"
	SeverityInfo    = "info"
)

const (
	DiagCodeParseError           = "FSM000_PARSE_ERROR"
	DiagCodeInvalidTarget        = "FSM001_INVALID_TARGET"
	DiagCodeUnresolvedAction     = "FSM001_UNRESOLVED_ACTION"
	DiagCodeInvalidWorkflowNode  = "FSM002_INVALID_WORKFLOW_NODE"
	DiagCodeUnknownState         = "FSM003_UNKNOWN_STATE"
	DiagCodeDuplicateTransition  = "FSM004_DUPLICATE_TRANSITION"
	DiagCodeMissingWorkflow      = "FSM005_MISSING_WORKFLOW"
	DiagCodeInvalidGuard         = "FSM006_INVALID_GUARD"
	DiagCodeInvalidDuration      = "FSM007_INVALID_DURATION"
	DiagCodeUnresolvedResolver   = "FSM008_UNRESOLVED_RESOLVER"
	DiagCodeUnresolvedGuard      = "FSM009_UNRESOLVED_GUARD"
	DiagCodeDraftPublishRejected = "FSM010_DRAFT_PUBLISH_REJECTED"
)

// ValidationDiagnostic is a deterministic validation message for editor/runtime tooling.
type ValidationDiagnostic struct {
	Code     string `json:"code"`
	Severity string `json:"severity"`
	Message  string `json:"message"`
	Path     string `json:"path"`
	NodeID   string `json:"node_id,omitempty"`
	Field    string `json:"field,omitempty"`
}

// ValidationScope limits validation emissions to changed editor nodes.
type ValidationScope struct {
	NodeIDs []string
}

func (s *ValidationScope) containsNode(nodeID string) bool {
	if s == nil || len(s.NodeIDs) == 0 {
		return true
	}
	if strings.TrimSpace(nodeID) == "" {
		return true
	}
	for _, candidate := range s.NodeIDs {
		if candidate == nodeID {
			return true
		}
	}
	return false
}

func sortDiagnostics(diags []ValidationDiagnostic) {
	sort.Slice(diags, func(i, j int) bool {
		a, b := diags[i], diags[j]
		if a.Path != b.Path {
			return a.Path < b.Path
		}
		if a.NodeID != b.NodeID {
			return a.NodeID < b.NodeID
		}
		if a.Field != b.Field {
			return a.Field < b.Field
		}
		if a.Code != b.Code {
			return a.Code < b.Code
		}
		if a.Severity != b.Severity {
			return a.Severity < b.Severity
		}
		return a.Message < b.Message
	})
}

// EditorCatalog represents palette/introspection data for authoring surfaces.
type EditorCatalog struct {
	Guards    []CatalogItem `json:"guards"`
	Steps     []CatalogItem `json:"steps"`
	Resolvers []CatalogItem `json:"resolvers"`
}

// CatalogItem is one palette entry backed by runtime metadata.
type CatalogItem struct {
	ID          string                 `json:"id"`
	Label       string                 `json:"label"`
	Category    string                 `json:"category"`
	Schema      map[string]any         `json:"schema,omitempty"`
	UI          UIComponent            `json:"ui"`
	Description string                 `json:"description,omitempty"`
	Metadata    map[string]interface{} `json:"metadata,omitempty"`
}

// BuildEditorCatalog derives palette entries from runtime registries.
func BuildEditorCatalog[T any](guards *GuardRegistry[T], actions *ActionRegistry[T], resolvers *ResolverMap[T]) EditorCatalog {
	catalog := EditorCatalog{}
	for _, id := range guards.IDs() {
		catalog.Guards = append(catalog.Guards, CatalogItem{
			ID:       id,
			Label:    id,
			Category: "guard",
			UI: UIComponent{
				Component: "guard.expression",
				Layout:    "inline",
			},
		})
	}
	for _, id := range actions.IDs() {
		catalog.Steps = append(catalog.Steps, CatalogItem{
			ID:       id,
			Label:    id,
			Category: "step",
			UI: UIComponent{
				Component: "workflow.step",
				Layout:    "node",
			},
		})
	}
	for _, id := range resolvers.DynamicTargetIDs() {
		catalog.Resolvers = append(catalog.Resolvers, CatalogItem{
			ID:       id,
			Label:    id,
			Category: "resolver",
			UI: UIComponent{
				Component: "transition.dynamic_target",
				Layout:    "inline",
			},
		})
	}
	return catalog
}

func (c EditorCatalog) stepSet() map[string]struct{} {
	set := make(map[string]struct{}, len(c.Steps))
	for _, item := range c.Steps {
		if item.ID != "" {
			set[item.ID] = struct{}{}
		}
	}
	return set
}

func (c EditorCatalog) guardSet() map[string]struct{} {
	set := make(map[string]struct{}, len(c.Guards))
	for _, item := range c.Guards {
		if item.ID != "" {
			set[item.ID] = struct{}{}
		}
	}
	return set
}

func (c EditorCatalog) resolverSet() map[string]struct{} {
	set := make(map[string]struct{}, len(c.Resolvers))
	for _, item := range c.Resolvers {
		if item.ID != "" {
			set[item.ID] = struct{}{}
		}
	}
	return set
}

// MachineSchema is the canonical intermediate schema used before UI projection.
type MachineSchema struct {
	ID          string                 `json:"id"`
	Name        string                 `json:"name"`
	Version     string                 `json:"version"`
	States      []StateDefinition      `json:"states"`
	Transitions []TransitionDefinition `json:"transitions"`
	Catalog     EditorCatalog          `json:"catalog,omitempty"`
	Diagnostics []ValidationDiagnostic `json:"diagnostics,omitempty"`
}

// MachineUISchema contains editor-facing graph and inspector representations.
type MachineUISchema struct {
	Layout    string             `json:"layout"`
	Nodes     []StateNodeSchema  `json:"nodes"`
	Edges     []TransitionSchema `json:"edges"`
	Inspector InspectorSchema    `json:"inspector"`
	Graph     GraphLayout        `json:"graph_layout,omitempty"`
}

type StateNodeSchema struct {
	ID       string      `json:"id"`
	Label    string      `json:"label"`
	Terminal bool        `json:"terminal"`
	Initial  bool        `json:"initial,omitempty"`
	UI       UIComponent `json:"ui"`
}

type TransitionSchema struct {
	ID       string           `json:"id"`
	Event    string           `json:"event"`
	From     string           `json:"from"`
	Target   TargetUISchema   `json:"target"`
	Guards   []GuardUISchema  `json:"guards,omitempty"`
	Workflow WorkflowUISchema `json:"workflow"`
	Metadata map[string]any   `json:"metadata,omitempty"`
}

type TargetUISchema struct {
	Kind       string   `json:"kind"`
	To         string   `json:"to,omitempty"`
	Resolver   string   `json:"resolver,omitempty"`
	Candidates []string `json:"candidates,omitempty"`
}

type GuardUISchema struct {
	Type       string         `json:"type"`
	Properties map[string]any `json:"properties,omitempty"`
	UI         UIComponent    `json:"ui"`
}

type StepUISchema struct {
	Type       string         `json:"type"`
	Properties map[string]any `json:"properties,omitempty"`
	UI         UIComponent    `json:"ui"`
}

type WorkflowUISchema struct {
	Nodes []WorkflowNodeUISchema `json:"nodes"`
}

type WorkflowNodeUISchema struct {
	ID        string        `json:"id"`
	Kind      string        `json:"kind"`
	Step      *StepUISchema `json:"step,omitempty"`
	Condition string        `json:"condition,omitempty"`
	Next      []string      `json:"next,omitempty"`
	UI        UIComponent   `json:"ui"`
}

type UIComponent struct {
	Component string         `json:"component"`
	Layout    string         `json:"layout,omitempty"`
	Config    map[string]any `json:"config,omitempty"`
}

type InspectorSchema struct {
	Sections []InspectorSection `json:"sections,omitempty"`
}

type InspectorSection struct {
	ID     string   `json:"id"`
	Label  string   `json:"label"`
	Fields []string `json:"fields,omitempty"`
}

// GraphLayout persists visual editor geometry and unknown fields for forward compatibility.
type GraphLayout struct {
	Viewport Viewport                   `json:"viewport"`
	Nodes    map[string]NodeLayout      `json:"nodes"`
	Edges    map[string]EdgeLayout      `json:"edges"`
	Groups   []GroupLayout              `json:"groups,omitempty"`
	Unknown  map[string]json.RawMessage `json:"-"`
}

type Viewport struct {
	X    float64 `json:"x"`
	Y    float64 `json:"y"`
	Zoom float64 `json:"zoom"`
}

type NodeLayout struct {
	X      float64 `json:"x"`
	Y      float64 `json:"y"`
	Width  float64 `json:"width"`
	Height float64 `json:"height"`
	ZIndex int     `json:"z_index,omitempty"`
}

type EdgeLayout struct {
	SourcePort string  `json:"source_port,omitempty"`
	TargetPort string  `json:"target_port,omitempty"`
	Points     []Point `json:"points,omitempty"`
}

type GroupLayout struct {
	ID      string   `json:"id"`
	Label   string   `json:"label,omitempty"`
	NodeIDs []string `json:"node_ids,omitempty"`
}

type Point struct {
	X float64 `json:"x"`
	Y float64 `json:"y"`
}

func (g *GraphLayout) UnmarshalJSON(data []byte) error {
	type alias GraphLayout
	aux := map[string]json.RawMessage{}
	if err := json.Unmarshal(data, &aux); err != nil {
		return err
	}
	var out alias
	if raw, ok := aux["viewport"]; ok {
		_ = json.Unmarshal(raw, &out.Viewport)
		delete(aux, "viewport")
	}
	if raw, ok := aux["nodes"]; ok {
		_ = json.Unmarshal(raw, &out.Nodes)
		delete(aux, "nodes")
	}
	if raw, ok := aux["edges"]; ok {
		_ = json.Unmarshal(raw, &out.Edges)
		delete(aux, "edges")
	}
	if raw, ok := aux["groups"]; ok {
		_ = json.Unmarshal(raw, &out.Groups)
		delete(aux, "groups")
	}
	*g = GraphLayout(out)
	if len(aux) > 0 {
		g.Unknown = aux
	}
	return nil
}

func (g GraphLayout) MarshalJSON() ([]byte, error) {
	obj := map[string]any{
		"viewport": g.Viewport,
		"nodes":    g.Nodes,
		"edges":    g.Edges,
	}
	if len(g.Groups) > 0 {
		obj["groups"] = g.Groups
	}
	for k, raw := range g.Unknown {
		if _, exists := obj[k]; !exists {
			obj[k] = json.RawMessage(raw)
		}
	}
	return json.Marshal(obj)
}

// DraftMachineDocument persists editor drafts that may be incomplete/invalid.
type DraftMachineDocument struct {
	Definition *MachineDefinition `json:"definition"`
	UISchema   *MachineUISchema   `json:"ui_schema"`
	DraftState DraftState         `json:"draft_state"`
}

type DraftState struct {
	IsDraft     bool      `json:"is_draft"`
	LastSavedAt time.Time `json:"last_saved_at"`
}

// Validate returns draft diagnostics for current definition.
func (d *DraftMachineDocument) Validate(catalog *EditorCatalog, scope *ValidationScope) []ValidationDiagnostic {
	if d == nil {
		return []ValidationDiagnostic{{
			Code:     DiagCodeDraftPublishRejected,
			Severity: SeverityError,
			Message:  "draft document is required",
			Path:     "$.draft",
		}}
	}
	return ValidateMachineDefinitionScoped(d.Definition, catalog, scope)
}

// CanPublish validates and reports whether draft can be published.
func (d *DraftMachineDocument) CanPublish(catalog *EditorCatalog) (bool, []ValidationDiagnostic) {
	diags := d.Validate(catalog, nil)
	for _, diag := range diags {
		if diag.Severity == SeverityError {
			return false, diags
		}
	}
	return true, diags
}

// Publish marks the draft as publishable only when no error diagnostics remain.
func (d *DraftMachineDocument) Publish(catalog *EditorCatalog) error {
	ok, diags := d.CanPublish(catalog)
	if !ok {
		return &DSLValidationError{Diagnostics: diags}
	}
	d.DraftState.IsDraft = false
	d.DraftState.LastSavedAt = time.Now().UTC()
	return nil
}

// ValidateMachineDefinition validates canonical definitions deterministically.
func ValidateMachineDefinition(def *MachineDefinition, catalog *EditorCatalog) []ValidationDiagnostic {
	return ValidateMachineDefinitionScoped(def, catalog, nil)
}

// ValidateMachineDefinitionScoped validates full machine or changed-node scope only.
func ValidateMachineDefinitionScoped(def *MachineDefinition, catalog *EditorCatalog, scope *ValidationScope) []ValidationDiagnostic {
	diags := make([]ValidationDiagnostic, 0)
	if def == nil {
		diags = append(diags, ValidationDiagnostic{
			Code:     DiagCodeParseError,
			Severity: SeverityError,
			Message:  "machine definition is required",
			Path:     "$.machine",
		})
		sortDiagnostics(diags)
		return diags
	}

	stateSet := make(map[string]struct{}, len(def.States))
	for i, st := range def.States {
		name := normalizeState(st.Name)
		if name == "" {
			diags = append(diags, ValidationDiagnostic{
				Code:     DiagCodeUnknownState,
				Severity: SeverityError,
				Message:  "state name is required",
				Path:     fmt.Sprintf("$.states[%d].name", i),
				Field:    "name",
			})
			continue
		}
		stateSet[name] = struct{}{}
	}

	stepSet := map[string]struct{}{}
	guardSet := map[string]struct{}{}
	resolverSet := map[string]struct{}{}
	if catalog != nil {
		stepSet = catalog.stepSet()
		guardSet = catalog.guardSet()
		resolverSet = catalog.resolverSet()
	}

	transitionKeyCounts := make(map[string]int, len(def.Transitions))
	for _, tr := range def.Transitions {
		key := transitionKey(normalizeState(tr.From), normalizeEvent(tr.Event))
		transitionKeyCounts[key]++
	}

	for i, tr := range def.Transitions {
		nodeID := strings.TrimSpace(tr.ID)
		if !scope.containsNode(nodeID) {
			continue
		}
		from := normalizeState(tr.From)
		event := normalizeEvent(tr.Event)
		to := normalizeState(tr.To)
		dynamic := ""
		if tr.DynamicTo != nil {
			dynamic = strings.TrimSpace(tr.DynamicTo.Resolver)
		}

		if _, ok := stateSet[from]; !ok {
			diags = append(diags, ValidationDiagnostic{
				Code:     DiagCodeUnknownState,
				Severity: SeverityError,
				Message:  fmt.Sprintf("unknown from state %q", tr.From),
				Path:     fmt.Sprintf("$.transitions[%d].from", i),
				NodeID:   nodeID,
				Field:    "from",
			})
		}
		if to != "" {
			if _, ok := stateSet[to]; !ok {
				diags = append(diags, ValidationDiagnostic{
					Code:     DiagCodeUnknownState,
					Severity: SeverityError,
					Message:  fmt.Sprintf("unknown target state %q", tr.To),
					Path:     fmt.Sprintf("$.transitions[%d].to", i),
					NodeID:   nodeID,
					Field:    "to",
				})
			}
		}

		hasStatic := to != ""
		hasDynamic := dynamic != ""
		if hasStatic == hasDynamic {
			diags = append(diags, ValidationDiagnostic{
				Code:     DiagCodeInvalidTarget,
				Severity: SeverityError,
				Message:  "transition target must set exactly one of to or dynamic resolver",
				Path:     fmt.Sprintf("$.transitions[%d]", i),
				NodeID:   nodeID,
				Field:    "target",
			})
		}
		if hasDynamic && len(resolverSet) > 0 {
			if _, ok := resolverSet[dynamic]; !ok {
				diags = append(diags, ValidationDiagnostic{
					Code:     DiagCodeUnresolvedResolver,
					Severity: SeverityError,
					Message:  fmt.Sprintf("unresolved dynamic resolver %q", dynamic),
					Path:     fmt.Sprintf("$.transitions[%d].dynamic_to.resolver", i),
					NodeID:   nodeID,
					Field:    "dynamic_to",
				})
			}
		}

		key := transitionKey(from, event)
		if transitionKeyCounts[key] > 1 {
			diags = append(diags, ValidationDiagnostic{
				Code:     DiagCodeDuplicateTransition,
				Severity: SeverityError,
				Message:  fmt.Sprintf("duplicate transition for from=%s event=%s", from, event),
				Path:     fmt.Sprintf("$.transitions[%d]", i),
				NodeID:   nodeID,
			})
		}

		for gIdx, guard := range tr.Guards {
			if strings.TrimSpace(guard.Type) == "" {
				diags = append(diags, ValidationDiagnostic{
					Code:     DiagCodeInvalidGuard,
					Severity: SeverityError,
					Message:  "guard type is required",
					Path:     fmt.Sprintf("$.transitions[%d].guards[%d].type", i, gIdx),
					NodeID:   nodeID,
					Field:    "type",
				})
			}
			if strings.EqualFold(guard.Type, "resolver") {
				if strings.TrimSpace(guard.Ref) == "" {
					diags = append(diags, ValidationDiagnostic{
						Code:     DiagCodeInvalidGuard,
						Severity: SeverityError,
						Message:  "resolver guard ref is required",
						Path:     fmt.Sprintf("$.transitions[%d].guards[%d].ref", i, gIdx),
						NodeID:   nodeID,
						Field:    "ref",
					})
				} else if len(guardSet) > 0 {
					if _, ok := guardSet[guard.Ref]; !ok {
						diags = append(diags, ValidationDiagnostic{
							Code:     DiagCodeUnresolvedGuard,
							Severity: SeverityError,
							Message:  fmt.Sprintf("unresolved guard %q", guard.Ref),
							Path:     fmt.Sprintf("$.transitions[%d].guards[%d].ref", i, gIdx),
							NodeID:   nodeID,
							Field:    "ref",
						})
					}
				}
			}
		}

		if len(tr.Workflow.Nodes) == 0 {
			diags = append(diags, ValidationDiagnostic{
				Code:     DiagCodeMissingWorkflow,
				Severity: SeverityError,
				Message:  "transition workflow requires at least one node",
				Path:     fmt.Sprintf("$.transitions[%d].workflow", i),
				NodeID:   nodeID,
				Field:    "workflow",
			})
			continue
		}

		nodeSet := make(map[string]struct{}, len(tr.Workflow.Nodes))
		for nIdx, node := range tr.Workflow.Nodes {
			wid := strings.TrimSpace(node.ID)
			if wid == "" {
				diags = append(diags, ValidationDiagnostic{
					Code:     DiagCodeInvalidWorkflowNode,
					Severity: SeverityError,
					Message:  "workflow node id is required",
					Path:     fmt.Sprintf("$.transitions[%d].workflow.nodes[%d].id", i, nIdx),
					NodeID:   nodeID,
					Field:    "id",
				})
				continue
			}
			nodeSet[wid] = struct{}{}
			kind := strings.ToLower(strings.TrimSpace(node.Kind))
			switch kind {
			case "step":
				if node.Step == nil {
					diags = append(diags, ValidationDiagnostic{
						Code:     DiagCodeInvalidWorkflowNode,
						Severity: SeverityError,
						Message:  "step node requires step definition",
						Path:     fmt.Sprintf("$.transitions[%d].workflow.nodes[%d].step", i, nIdx),
						NodeID:   wid,
						Field:    "step",
					})
					break
				}
				actionID := strings.TrimSpace(node.Step.ActionID)
				if actionID == "" {
					diags = append(diags, ValidationDiagnostic{
						Code:     DiagCodeUnresolvedAction,
						Severity: SeverityError,
						Message:  "step action_id is required",
						Path:     fmt.Sprintf("$.transitions[%d].workflow.nodes[%d].step.action_id", i, nIdx),
						NodeID:   wid,
						Field:    "action_id",
					})
				} else if len(stepSet) > 0 {
					if _, ok := stepSet[actionID]; !ok {
						diags = append(diags, ValidationDiagnostic{
							Code:     DiagCodeUnresolvedAction,
							Severity: SeverityError,
							Message:  fmt.Sprintf("unresolved action %q", actionID),
							Path:     fmt.Sprintf("$.transitions[%d].workflow.nodes[%d].step.action_id", i, nIdx),
							NodeID:   wid,
							Field:    "action_id",
						})
					}
				}
				if node.Step != nil {
					if strings.TrimSpace(node.Step.Delay) != "" {
						if _, err := time.ParseDuration(strings.TrimSpace(node.Step.Delay)); err != nil {
							diags = append(diags, ValidationDiagnostic{
								Code:     DiagCodeInvalidDuration,
								Severity: SeverityError,
								Message:  fmt.Sprintf("invalid delay duration %q", node.Step.Delay),
								Path:     fmt.Sprintf("$.transitions[%d].workflow.nodes[%d].step.delay", i, nIdx),
								NodeID:   wid,
								Field:    "delay",
							})
						}
					}
					if strings.TrimSpace(node.Step.Timeout) != "" {
						if _, err := time.ParseDuration(strings.TrimSpace(node.Step.Timeout)); err != nil {
							diags = append(diags, ValidationDiagnostic{
								Code:     DiagCodeInvalidDuration,
								Severity: SeverityError,
								Message:  fmt.Sprintf("invalid timeout duration %q", node.Step.Timeout),
								Path:     fmt.Sprintf("$.transitions[%d].workflow.nodes[%d].step.timeout", i, nIdx),
								NodeID:   wid,
								Field:    "timeout",
							})
						}
					}
				}
			case "when":
				if strings.TrimSpace(node.Expr) == "" {
					diags = append(diags, ValidationDiagnostic{
						Code:     DiagCodeInvalidWorkflowNode,
						Severity: SeverityError,
						Message:  "when node requires expression",
						Path:     fmt.Sprintf("$.transitions[%d].workflow.nodes[%d].expr", i, nIdx),
						NodeID:   wid,
						Field:    "expr",
					})
				}
			default:
				diags = append(diags, ValidationDiagnostic{
					Code:     DiagCodeInvalidWorkflowNode,
					Severity: SeverityError,
					Message:  fmt.Sprintf("unsupported workflow node kind %q", node.Kind),
					Path:     fmt.Sprintf("$.transitions[%d].workflow.nodes[%d].kind", i, nIdx),
					NodeID:   wid,
					Field:    "kind",
				})
			}
		}
		for nIdx, node := range tr.Workflow.Nodes {
			for _, nextID := range node.Next {
				if _, ok := nodeSet[nextID]; !ok {
					diags = append(diags, ValidationDiagnostic{
						Code:     DiagCodeInvalidWorkflowNode,
						Severity: SeverityError,
						Message:  fmt.Sprintf("workflow next edge references unknown node %q", nextID),
						Path:     fmt.Sprintf("$.transitions[%d].workflow.nodes[%d].next", i, nIdx),
						NodeID:   node.ID,
						Field:    "next",
					})
				}
			}
		}
	}

	sortDiagnostics(diags)
	return diags
}

// GenerateMachineSchema performs MachineDefinition -> MachineSchema conversion.
func GenerateMachineSchema(def *MachineDefinition, catalog *EditorCatalog, scope *ValidationScope) (*MachineSchema, []ValidationDiagnostic) {
	norm := NormalizeMachineDefinition(def)
	if norm == nil {
		norm = &MachineDefinition{}
	}
	diags := ValidateMachineDefinitionScoped(norm, catalog, scope)
	schema := &MachineSchema{
		ID:          norm.ID,
		Name:        norm.Name,
		Version:     norm.Version,
		States:      append([]StateDefinition(nil), norm.States...),
		Transitions: append([]TransitionDefinition(nil), norm.Transitions...),
		Diagnostics: append([]ValidationDiagnostic(nil), diags...),
	}
	if catalog != nil {
		schema.Catalog = *catalog
	}
	return schema, diags
}

// GenerateMachineUISchema performs MachineSchema -> MachineUISchema conversion.
func GenerateMachineUISchema(schema *MachineSchema) *MachineUISchema {
	if schema == nil {
		return &MachineUISchema{}
	}
	ui := &MachineUISchema{
		Layout: "graph",
		Nodes:  make([]StateNodeSchema, 0, len(schema.States)),
		Edges:  make([]TransitionSchema, 0, len(schema.Transitions)),
		Inspector: InspectorSchema{Sections: []InspectorSection{
			{ID: "machine", Label: "Machine", Fields: []string{"id", "name", "version"}},
			{ID: "transition", Label: "Transition", Fields: []string{"event", "target", "guards", "workflow"}},
		}},
		Graph: GraphLayout{
			Viewport: Viewport{X: 0, Y: 0, Zoom: 1},
			Nodes:    make(map[string]NodeLayout),
			Edges:    make(map[string]EdgeLayout),
		},
	}

	for i, st := range schema.States {
		node := StateNodeSchema{
			ID:       normalizeState(st.Name),
			Label:    st.Name,
			Terminal: st.Terminal,
			Initial:  st.Initial,
			UI: UIComponent{
				Component: "state.node",
				Layout:    "graph-node",
			},
		}
		ui.Nodes = append(ui.Nodes, node)
		ui.Graph.Nodes[node.ID] = NodeLayout{X: float64(i * 220), Y: 80, Width: 180, Height: 96}
	}

	for i, tr := range schema.Transitions {
		target := TargetUISchema{}
		if strings.TrimSpace(tr.To) != "" {
			target.Kind = "static"
			target.To = normalizeState(tr.To)
		} else {
			target.Kind = "dynamic"
			if tr.DynamicTo != nil {
				target.Resolver = strings.TrimSpace(tr.DynamicTo.Resolver)
			}
		}

		guards := make([]GuardUISchema, 0, len(tr.Guards))
		for _, g := range tr.Guards {
			props := map[string]any{}
			if strings.TrimSpace(g.Expr) != "" {
				props["expr"] = g.Expr
			}
			if strings.TrimSpace(g.Ref) != "" {
				props["ref"] = g.Ref
			}
			guards = append(guards, GuardUISchema{
				Type:       g.Type,
				Properties: props,
				UI:         UIComponent{Component: "guard.editor", Layout: "inline"},
			})
		}

		wfNodes := make([]WorkflowNodeUISchema, 0, len(tr.Workflow.Nodes))
		for _, node := range tr.Workflow.Nodes {
			uiNode := WorkflowNodeUISchema{
				ID:        node.ID,
				Kind:      node.Kind,
				Condition: node.Expr,
				Next:      append([]string(nil), node.Next...),
				UI:        UIComponent{Component: "workflow.node", Layout: "graph-node"},
			}
			if node.Step != nil {
				uiNode.Step = &StepUISchema{
					Type: "command",
					Properties: map[string]any{
						"action_id": node.Step.ActionID,
						"async":     node.Step.Async,
						"delay":     node.Step.Delay,
						"timeout":   node.Step.Timeout,
						"metadata":  copyMap(node.Step.Metadata),
					},
					UI: UIComponent{Component: "workflow.step", Layout: "node"},
				}
			}
			wfNodes = append(wfNodes, uiNode)
		}

		edge := TransitionSchema{
			ID:       tr.ID,
			Event:    tr.Event,
			From:     normalizeState(tr.From),
			Target:   target,
			Guards:   guards,
			Workflow: WorkflowUISchema{Nodes: wfNodes},
			Metadata: copyMap(tr.Metadata),
		}
		ui.Edges = append(ui.Edges, edge)
		edgeID := edge.ID
		if edgeID == "" {
			edgeID = fmt.Sprintf("%s::%s", edge.From, normalizeEvent(edge.Event))
		}
		ui.Graph.Edges[edgeID] = EdgeLayout{}
		_ = i
	}

	return ui
}

// MachineDefinitionToUISchema is the full MachineDefinition -> MachineSchema -> MachineUISchema pipeline.
func MachineDefinitionToUISchema(def *MachineDefinition, catalog *EditorCatalog, scope *ValidationScope) (*MachineUISchema, []ValidationDiagnostic) {
	schema, diags := GenerateMachineSchema(def, catalog, scope)
	return GenerateMachineUISchema(schema), diags
}

// MachineDefinitionFromUISchema projects editor graph data back into canonical machine definitions.
func MachineDefinitionFromUISchema(ui *MachineUISchema, id, version string) *MachineDefinition {
	if ui == nil {
		return &MachineDefinition{ID: id, Name: id, Version: version}
	}
	def := &MachineDefinition{
		ID:      strings.TrimSpace(id),
		Name:    strings.TrimSpace(id),
		Version: strings.TrimSpace(version),
	}
	for _, node := range ui.Nodes {
		def.States = append(def.States, StateDefinition{
			Name:     normalizeState(node.ID),
			Initial:  node.Initial,
			Terminal: node.Terminal,
		})
	}
	for _, edge := range ui.Edges {
		tr := TransitionDefinition{
			ID:       edge.ID,
			Event:    edge.Event,
			From:     edge.From,
			Metadata: copyMap(edge.Metadata),
		}
		switch strings.ToLower(strings.TrimSpace(edge.Target.Kind)) {
		case "dynamic":
			tr.DynamicTo = &DynamicTargetDefinition{Resolver: edge.Target.Resolver}
		default:
			tr.To = edge.Target.To
		}
		for _, guard := range edge.Guards {
			gd := GuardDefinition{Type: guard.Type}
			if expr, ok := guard.Properties["expr"].(string); ok {
				gd.Expr = expr
			}
			if ref, ok := guard.Properties["ref"].(string); ok {
				gd.Ref = ref
			}
			tr.Guards = append(tr.Guards, gd)
		}
		for _, wfNode := range edge.Workflow.Nodes {
			node := WorkflowNodeDefinition{
				ID:       wfNode.ID,
				Kind:     wfNode.Kind,
				Expr:     wfNode.Condition,
				Next:     append([]string(nil), wfNode.Next...),
				Metadata: nil,
			}
			if wfNode.Step != nil {
				step := &StepDefinition{}
				if actionID, ok := wfNode.Step.Properties["action_id"].(string); ok {
					step.ActionID = actionID
				}
				if delay, ok := wfNode.Step.Properties["delay"].(string); ok {
					step.Delay = delay
				}
				if timeout, ok := wfNode.Step.Properties["timeout"].(string); ok {
					step.Timeout = timeout
				}
				if async, ok := wfNode.Step.Properties["async"].(bool); ok {
					step.Async = async
				}
				node.Step = step
			}
			tr.Workflow.Nodes = append(tr.Workflow.Nodes, node)
		}
		def.Transitions = append(def.Transitions, tr)
	}
	return NormalizeMachineDefinition(def)
}

// NormalizeMachineDefinition canonicalizes ordering, IDs, and duration fields for stable import/export.
func NormalizeMachineDefinition(def *MachineDefinition) *MachineDefinition {
	if def == nil {
		return nil
	}
	norm := &MachineDefinition{
		ID:      strings.TrimSpace(def.ID),
		Name:    strings.TrimSpace(def.Name),
		Version: strings.TrimSpace(def.Version),
	}
	if norm.Name == "" {
		norm.Name = norm.ID
	}

	for _, st := range def.States {
		norm.States = append(norm.States, StateDefinition{
			Name:     normalizeState(st.Name),
			Initial:  st.Initial,
			Terminal: st.Terminal,
			Metadata: copyMap(st.Metadata),
		})
	}
	sort.Slice(norm.States, func(i, j int) bool {
		if norm.States[i].Initial != norm.States[j].Initial {
			return norm.States[i].Initial
		}
		return norm.States[i].Name < norm.States[j].Name
	})
	if len(norm.States) > 0 {
		hasInitial := false
		for _, st := range norm.States {
			if st.Initial {
				hasInitial = true
				break
			}
		}
		if !hasInitial {
			norm.States[0].Initial = true
		}
	}

	for idx, tr := range def.Transitions {
		nt := TransitionDefinition{
			ID:       strings.TrimSpace(tr.ID),
			Event:    normalizeEvent(tr.Event),
			From:     normalizeState(tr.From),
			To:       normalizeState(tr.To),
			Metadata: copyMap(tr.Metadata),
		}
		if nt.ID == "" {
			nt.ID = fmt.Sprintf("%s::%s", nt.From, nt.Event)
		}
		if tr.DynamicTo != nil {
			nt.DynamicTo = &DynamicTargetDefinition{Resolver: strings.TrimSpace(tr.DynamicTo.Resolver)}
		}
		nt.Guards = append(nt.Guards, tr.Guards...)

		nodes := make([]WorkflowNodeDefinition, 0, len(tr.Workflow.Nodes))
		for nIdx, node := range tr.Workflow.Nodes {
			nn := WorkflowNodeDefinition{
				ID:       strings.TrimSpace(node.ID),
				Kind:     strings.ToLower(strings.TrimSpace(node.Kind)),
				Expr:     strings.TrimSpace(node.Expr),
				Next:     append([]string(nil), node.Next...),
				Metadata: copyMap(node.Metadata),
			}
			if nn.ID == "" {
				nn.ID = fmt.Sprintf("%s_node_%03d", sanitizeID(nt.ID), nIdx+1)
			}
			if node.Step != nil {
				step := *node.Step
				step.ActionID = strings.TrimSpace(step.ActionID)
				if delay, ok := canonicalDuration(step.Delay); ok {
					step.Delay = delay
				}
				if timeout, ok := canonicalDuration(step.Timeout); ok {
					step.Timeout = timeout
				}
				step.Metadata = copyMap(step.Metadata)
				nn.Step = &step
			}
			sort.Strings(nn.Next)
			nodes = append(nodes, nn)
		}
		sort.Slice(nodes, func(i, j int) bool { return nodes[i].ID < nodes[j].ID })
		nt.Workflow = TransitionWorkflowDefinition{Nodes: nodes}

		if nt.Metadata == nil {
			nt.Metadata = map[string]any{}
		}
		nt.Metadata["normalized_index"] = idx
		norm.Transitions = append(norm.Transitions, nt)
	}
	if len(norm.Transitions) > 0 {
		sort.Slice(norm.Transitions, func(i, j int) bool {
			a, b := norm.Transitions[i], norm.Transitions[j]
			if a.From != b.From {
				return a.From < b.From
			}
			if a.Event != b.Event {
				return a.Event < b.Event
			}
			return a.ID < b.ID
		})
	}

	return norm
}

func canonicalDuration(value string) (string, bool) {
	value = strings.TrimSpace(value)
	if value == "" {
		return "", false
	}
	d, err := time.ParseDuration(value)
	if err != nil {
		return value, false
	}
	return d.String(), true
}

func sanitizeID(value string) string {
	value = strings.ToLower(strings.TrimSpace(value))
	if value == "" {
		return "node"
	}
	repl := strings.NewReplacer(" ", "_", ":", "_", "/", "_", "-", "_")
	value = repl.Replace(value)
	builder := strings.Builder{}
	for _, r := range value {
		if (r >= 'a' && r <= 'z') || (r >= '0' && r <= '9') || r == '_' {
			builder.WriteRune(r)
		}
	}
	out := builder.String()
	if out == "" {
		return "node"
	}
	return out
}

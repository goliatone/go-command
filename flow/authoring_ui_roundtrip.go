package flow

import "encoding/json"

func (m *MachineUISchema) UnmarshalJSON(data []byte) error {
	obj, err := decodeAuthoringJSONObject(data)
	if err != nil {
		return err
	}
	var out MachineUISchema
	if raw, ok := obj["layout"]; ok {
		if err := json.Unmarshal(raw, &out.Layout); err != nil {
			return err
		}
		delete(obj, "layout")
	}
	if raw, ok := obj["nodes"]; ok {
		if err := json.Unmarshal(raw, &out.Nodes); err != nil {
			return err
		}
		delete(obj, "nodes")
	}
	if raw, ok := obj["edges"]; ok {
		if err := json.Unmarshal(raw, &out.Edges); err != nil {
			return err
		}
		delete(obj, "edges")
	}
	if raw, ok := obj["inspector"]; ok {
		if err := json.Unmarshal(raw, &out.Inspector); err != nil {
			return err
		}
		delete(obj, "inspector")
	}
	if raw, ok := obj["graph_layout"]; ok {
		if err := json.Unmarshal(raw, &out.Graph); err != nil {
			return err
		}
		delete(obj, "graph_layout")
	}
	*m = out
	m.Unknown = copyAuthoringUnknown(obj)
	return nil
}

func (m MachineUISchema) MarshalJSON() ([]byte, error) {
	obj := map[string]any{
		"layout":    m.Layout,
		"nodes":     m.Nodes,
		"edges":     m.Edges,
		"inspector": m.Inspector,
	}
	if !isEmptyGraphLayout(m.Graph) {
		obj["graph_layout"] = m.Graph
	}
	mergeAuthoringUnknown(obj, m.Unknown)
	return json.Marshal(obj)
}

func (s *StateNodeSchema) UnmarshalJSON(data []byte) error {
	obj, err := decodeAuthoringJSONObject(data)
	if err != nil {
		return err
	}
	var out StateNodeSchema
	if raw, ok := obj["id"]; ok {
		if err := json.Unmarshal(raw, &out.ID); err != nil {
			return err
		}
		delete(obj, "id")
	}
	if raw, ok := obj["label"]; ok {
		if err := json.Unmarshal(raw, &out.Label); err != nil {
			return err
		}
		delete(obj, "label")
	}
	if raw, ok := obj["terminal"]; ok {
		if err := json.Unmarshal(raw, &out.Terminal); err != nil {
			return err
		}
		delete(obj, "terminal")
	}
	if raw, ok := obj["initial"]; ok {
		if err := json.Unmarshal(raw, &out.Initial); err != nil {
			return err
		}
		delete(obj, "initial")
	}
	if raw, ok := obj["ui"]; ok {
		if err := json.Unmarshal(raw, &out.UI); err != nil {
			return err
		}
		delete(obj, "ui")
	}
	*s = out
	s.Unknown = copyAuthoringUnknown(obj)
	return nil
}

func (s StateNodeSchema) MarshalJSON() ([]byte, error) {
	obj := map[string]any{
		"id":       s.ID,
		"label":    s.Label,
		"terminal": s.Terminal,
		"ui":       s.UI,
	}
	if s.Initial {
		obj["initial"] = true
	}
	mergeAuthoringUnknown(obj, s.Unknown)
	return json.Marshal(obj)
}

func (t *TransitionSchema) UnmarshalJSON(data []byte) error {
	obj, err := decodeAuthoringJSONObject(data)
	if err != nil {
		return err
	}
	var out TransitionSchema
	if raw, ok := obj["id"]; ok {
		if err := json.Unmarshal(raw, &out.ID); err != nil {
			return err
		}
		delete(obj, "id")
	}
	if raw, ok := obj["event"]; ok {
		if err := json.Unmarshal(raw, &out.Event); err != nil {
			return err
		}
		delete(obj, "event")
	}
	if raw, ok := obj["from"]; ok {
		if err := json.Unmarshal(raw, &out.From); err != nil {
			return err
		}
		delete(obj, "from")
	}
	if raw, ok := obj["target"]; ok {
		if err := json.Unmarshal(raw, &out.Target); err != nil {
			return err
		}
		delete(obj, "target")
	}
	if raw, ok := obj["guards"]; ok {
		if err := json.Unmarshal(raw, &out.Guards); err != nil {
			return err
		}
		delete(obj, "guards")
	}
	if raw, ok := obj["workflow"]; ok {
		if err := json.Unmarshal(raw, &out.Workflow); err != nil {
			return err
		}
		delete(obj, "workflow")
	}
	if raw, ok := obj["metadata"]; ok {
		if err := json.Unmarshal(raw, &out.Metadata); err != nil {
			return err
		}
		delete(obj, "metadata")
	}
	*t = out
	t.Unknown = copyAuthoringUnknown(obj)
	return nil
}

func (t TransitionSchema) MarshalJSON() ([]byte, error) {
	obj := map[string]any{
		"id":       t.ID,
		"event":    t.Event,
		"from":     t.From,
		"target":   t.Target,
		"workflow": t.Workflow,
	}
	if len(t.Guards) > 0 {
		obj["guards"] = t.Guards
	}
	if len(t.Metadata) > 0 {
		obj["metadata"] = t.Metadata
	}
	mergeAuthoringUnknown(obj, t.Unknown)
	return json.Marshal(obj)
}

func (t *TargetUISchema) UnmarshalJSON(data []byte) error {
	obj, err := decodeAuthoringJSONObject(data)
	if err != nil {
		return err
	}
	var out TargetUISchema
	if raw, ok := obj["kind"]; ok {
		if err := json.Unmarshal(raw, &out.Kind); err != nil {
			return err
		}
		delete(obj, "kind")
	}
	if raw, ok := obj["to"]; ok {
		if err := json.Unmarshal(raw, &out.To); err != nil {
			return err
		}
		delete(obj, "to")
	}
	if raw, ok := obj["resolver"]; ok {
		if err := json.Unmarshal(raw, &out.Resolver); err != nil {
			return err
		}
		delete(obj, "resolver")
	}
	if raw, ok := obj["candidates"]; ok {
		if err := json.Unmarshal(raw, &out.Candidates); err != nil {
			return err
		}
		delete(obj, "candidates")
	}
	*t = out
	t.Unknown = copyAuthoringUnknown(obj)
	return nil
}

func (t TargetUISchema) MarshalJSON() ([]byte, error) {
	obj := map[string]any{
		"kind": t.Kind,
	}
	if t.To != "" {
		obj["to"] = t.To
	}
	if t.Resolver != "" {
		obj["resolver"] = t.Resolver
	}
	if len(t.Candidates) > 0 {
		obj["candidates"] = t.Candidates
	}
	mergeAuthoringUnknown(obj, t.Unknown)
	return json.Marshal(obj)
}

func (g *GuardUISchema) UnmarshalJSON(data []byte) error {
	obj, err := decodeAuthoringJSONObject(data)
	if err != nil {
		return err
	}
	var out GuardUISchema
	if raw, ok := obj["type"]; ok {
		if err := json.Unmarshal(raw, &out.Type); err != nil {
			return err
		}
		delete(obj, "type")
	}
	if raw, ok := obj["properties"]; ok {
		if err := json.Unmarshal(raw, &out.Properties); err != nil {
			return err
		}
		delete(obj, "properties")
	}
	if raw, ok := obj["ui"]; ok {
		if err := json.Unmarshal(raw, &out.UI); err != nil {
			return err
		}
		delete(obj, "ui")
	}
	*g = out
	g.Unknown = copyAuthoringUnknown(obj)
	return nil
}

func (g GuardUISchema) MarshalJSON() ([]byte, error) {
	obj := map[string]any{
		"type": g.Type,
		"ui":   g.UI,
	}
	if len(g.Properties) > 0 {
		obj["properties"] = g.Properties
	}
	mergeAuthoringUnknown(obj, g.Unknown)
	return json.Marshal(obj)
}

func (s *StepUISchema) UnmarshalJSON(data []byte) error {
	obj, err := decodeAuthoringJSONObject(data)
	if err != nil {
		return err
	}
	var out StepUISchema
	if raw, ok := obj["type"]; ok {
		if err := json.Unmarshal(raw, &out.Type); err != nil {
			return err
		}
		delete(obj, "type")
	}
	if raw, ok := obj["properties"]; ok {
		if err := json.Unmarshal(raw, &out.Properties); err != nil {
			return err
		}
		delete(obj, "properties")
	}
	if raw, ok := obj["ui"]; ok {
		if err := json.Unmarshal(raw, &out.UI); err != nil {
			return err
		}
		delete(obj, "ui")
	}
	*s = out
	s.Unknown = copyAuthoringUnknown(obj)
	return nil
}

func (s StepUISchema) MarshalJSON() ([]byte, error) {
	obj := map[string]any{
		"type": s.Type,
		"ui":   s.UI,
	}
	if len(s.Properties) > 0 {
		obj["properties"] = s.Properties
	}
	mergeAuthoringUnknown(obj, s.Unknown)
	return json.Marshal(obj)
}

func (w *WorkflowUISchema) UnmarshalJSON(data []byte) error {
	obj, err := decodeAuthoringJSONObject(data)
	if err != nil {
		return err
	}
	var out WorkflowUISchema
	if raw, ok := obj["nodes"]; ok {
		if err := json.Unmarshal(raw, &out.Nodes); err != nil {
			return err
		}
		delete(obj, "nodes")
	}
	*w = out
	w.Unknown = copyAuthoringUnknown(obj)
	return nil
}

func (w WorkflowUISchema) MarshalJSON() ([]byte, error) {
	obj := map[string]any{
		"nodes": w.Nodes,
	}
	mergeAuthoringUnknown(obj, w.Unknown)
	return json.Marshal(obj)
}

func (w *WorkflowNodeUISchema) UnmarshalJSON(data []byte) error {
	obj, err := decodeAuthoringJSONObject(data)
	if err != nil {
		return err
	}
	var out WorkflowNodeUISchema
	if raw, ok := obj["id"]; ok {
		if err := json.Unmarshal(raw, &out.ID); err != nil {
			return err
		}
		delete(obj, "id")
	}
	if raw, ok := obj["kind"]; ok {
		if err := json.Unmarshal(raw, &out.Kind); err != nil {
			return err
		}
		delete(obj, "kind")
	}
	if raw, ok := obj["step"]; ok {
		if err := json.Unmarshal(raw, &out.Step); err != nil {
			return err
		}
		delete(obj, "step")
	}
	if raw, ok := obj["condition"]; ok {
		if err := json.Unmarshal(raw, &out.Condition); err != nil {
			return err
		}
		delete(obj, "condition")
	}
	if raw, ok := obj["next"]; ok {
		if err := json.Unmarshal(raw, &out.Next); err != nil {
			return err
		}
		delete(obj, "next")
	}
	if raw, ok := obj["ui"]; ok {
		if err := json.Unmarshal(raw, &out.UI); err != nil {
			return err
		}
		delete(obj, "ui")
	}
	*w = out
	w.Unknown = copyAuthoringUnknown(obj)
	return nil
}

func (w WorkflowNodeUISchema) MarshalJSON() ([]byte, error) {
	obj := map[string]any{
		"id":   w.ID,
		"kind": w.Kind,
		"ui":   w.UI,
	}
	if w.Step != nil {
		obj["step"] = w.Step
	}
	if w.Condition != "" {
		obj["condition"] = w.Condition
	}
	if len(w.Next) > 0 {
		obj["next"] = w.Next
	}
	mergeAuthoringUnknown(obj, w.Unknown)
	return json.Marshal(obj)
}

func (c *UIComponent) UnmarshalJSON(data []byte) error {
	obj, err := decodeAuthoringJSONObject(data)
	if err != nil {
		return err
	}
	var out UIComponent
	if raw, ok := obj["component"]; ok {
		if err := json.Unmarshal(raw, &out.Component); err != nil {
			return err
		}
		delete(obj, "component")
	}
	if raw, ok := obj["layout"]; ok {
		if err := json.Unmarshal(raw, &out.Layout); err != nil {
			return err
		}
		delete(obj, "layout")
	}
	if raw, ok := obj["config"]; ok {
		if err := json.Unmarshal(raw, &out.Config); err != nil {
			return err
		}
		delete(obj, "config")
	}
	*c = out
	c.Unknown = copyAuthoringUnknown(obj)
	return nil
}

func (c UIComponent) MarshalJSON() ([]byte, error) {
	obj := map[string]any{
		"component": c.Component,
	}
	if c.Layout != "" {
		obj["layout"] = c.Layout
	}
	if len(c.Config) > 0 {
		obj["config"] = c.Config
	}
	mergeAuthoringUnknown(obj, c.Unknown)
	return json.Marshal(obj)
}

func (i *InspectorSchema) UnmarshalJSON(data []byte) error {
	obj, err := decodeAuthoringJSONObject(data)
	if err != nil {
		return err
	}
	var out InspectorSchema
	if raw, ok := obj["sections"]; ok {
		if err := json.Unmarshal(raw, &out.Sections); err != nil {
			return err
		}
		delete(obj, "sections")
	}
	*i = out
	i.Unknown = copyAuthoringUnknown(obj)
	return nil
}

func (i InspectorSchema) MarshalJSON() ([]byte, error) {
	obj := map[string]any{}
	if len(i.Sections) > 0 {
		obj["sections"] = i.Sections
	}
	mergeAuthoringUnknown(obj, i.Unknown)
	return json.Marshal(obj)
}

func (s *InspectorSection) UnmarshalJSON(data []byte) error {
	obj, err := decodeAuthoringJSONObject(data)
	if err != nil {
		return err
	}
	var out InspectorSection
	if raw, ok := obj["id"]; ok {
		if err := json.Unmarshal(raw, &out.ID); err != nil {
			return err
		}
		delete(obj, "id")
	}
	if raw, ok := obj["label"]; ok {
		if err := json.Unmarshal(raw, &out.Label); err != nil {
			return err
		}
		delete(obj, "label")
	}
	if raw, ok := obj["fields"]; ok {
		if err := json.Unmarshal(raw, &out.Fields); err != nil {
			return err
		}
		delete(obj, "fields")
	}
	*s = out
	s.Unknown = copyAuthoringUnknown(obj)
	return nil
}

func (s InspectorSection) MarshalJSON() ([]byte, error) {
	obj := map[string]any{
		"id":    s.ID,
		"label": s.Label,
	}
	if len(s.Fields) > 0 {
		obj["fields"] = s.Fields
	}
	mergeAuthoringUnknown(obj, s.Unknown)
	return json.Marshal(obj)
}

func decodeAuthoringJSONObject(data []byte) (map[string]json.RawMessage, error) {
	obj := map[string]json.RawMessage{}
	if err := json.Unmarshal(data, &obj); err != nil {
		return nil, err
	}
	return obj, nil
}

func copyAuthoringUnknown(in map[string]json.RawMessage) map[string]json.RawMessage {
	if len(in) == 0 {
		return nil
	}
	out := make(map[string]json.RawMessage, len(in))
	for key, raw := range in {
		out[key] = append(json.RawMessage(nil), raw...)
	}
	return out
}

func mergeAuthoringUnknown(target map[string]any, unknown map[string]json.RawMessage) {
	if len(unknown) == 0 {
		return
	}
	for key, raw := range unknown {
		if _, exists := target[key]; exists {
			continue
		}
		target[key] = json.RawMessage(append(json.RawMessage(nil), raw...))
	}
}

func isEmptyGraphLayout(g GraphLayout) bool {
	return g.Viewport.X == 0 &&
		g.Viewport.Y == 0 &&
		g.Viewport.Zoom == 0 &&
		len(g.Nodes) == 0 &&
		len(g.Edges) == 0 &&
		len(g.Groups) == 0 &&
		len(g.Unknown) == 0
}

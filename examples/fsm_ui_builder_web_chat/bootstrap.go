package main

import (
	"encoding/json"
	"strings"
	"time"

	"github.com/goliatone/go-command/flow"
)

type bootstrapDraftDocument struct {
	Definition bootstrapMachineDefinition `json:"definition"`
	UISchema   map[string]any             `json:"ui_schema"`
	DraftState bootstrapDraftState        `json:"draft_state"`
}

type bootstrapDraftState struct {
	IsDraft     bool   `json:"is_draft"`
	LastSavedAt string `json:"last_saved_at"`
}

type bootstrapMachineDefinition struct {
	ID          string                     `json:"id"`
	Name        string                     `json:"name"`
	Version     string                     `json:"version"`
	States      []bootstrapStateDefinition `json:"states"`
	Transitions []bootstrapTransition      `json:"transitions"`
}

type bootstrapStateDefinition struct {
	Name     string         `json:"name"`
	Initial  bool           `json:"initial,omitempty"`
	Terminal bool           `json:"terminal,omitempty"`
	Metadata map[string]any `json:"metadata,omitempty"`
}

type bootstrapTransition struct {
	ID        string                     `json:"id"`
	Event     string                     `json:"event"`
	From      string                     `json:"from"`
	To        string                     `json:"to,omitempty"`
	DynamicTo *bootstrapDynamicTarget    `json:"dynamic_to,omitempty"`
	Guards    []bootstrapGuardDefinition `json:"guards,omitempty"`
	Workflow  bootstrapWorkflow          `json:"workflow"`
	Metadata  map[string]any             `json:"metadata,omitempty"`
}

type bootstrapDynamicTarget struct {
	Resolver string `json:"resolver"`
}

type bootstrapGuardDefinition struct {
	Type     string         `json:"type,omitempty"`
	Expr     string         `json:"expr,omitempty"`
	Ref      string         `json:"ref,omitempty"`
	Metadata map[string]any `json:"metadata,omitempty"`
}

type bootstrapWorkflow struct {
	Nodes []bootstrapWorkflowNode `json:"nodes"`
}

type bootstrapWorkflowNode struct {
	ID       string         `json:"id"`
	Kind     string         `json:"kind"`
	Step     *bootstrapStep `json:"step,omitempty"`
	Expr     string         `json:"expr,omitempty"`
	Next     []string       `json:"next,omitempty"`
	Metadata map[string]any `json:"metadata,omitempty"`
}

type bootstrapStep struct {
	ActionID string         `json:"action_id"`
	Async    bool           `json:"async,omitempty"`
	Delay    string         `json:"delay,omitempty"`
	Timeout  string         `json:"timeout,omitempty"`
	Metadata map[string]any `json:"metadata,omitempty"`
}

func toBootstrapDraft(document flow.DraftMachineDocument) (bootstrapDraftDocument, error) {
	uiSchema, err := marshalToMap(document.UISchema)
	if err != nil {
		return bootstrapDraftDocument{}, err
	}

	definition := bootstrapMachineDefinition{
		States:      []bootstrapStateDefinition{},
		Transitions: []bootstrapTransition{},
	}
	if document.Definition != nil {
		definition.ID = strings.TrimSpace(document.Definition.ID)
		definition.Name = strings.TrimSpace(document.Definition.Name)
		definition.Version = strings.TrimSpace(document.Definition.Version)
		for _, state := range document.Definition.States {
			definition.States = append(definition.States, bootstrapStateDefinition{
				Name:     strings.TrimSpace(state.Name),
				Initial:  state.Initial,
				Terminal: state.Terminal,
				Metadata: cloneMap(state.Metadata),
			})
		}

		for _, transition := range document.Definition.Transitions {
			mapped := bootstrapTransition{
				ID:       strings.TrimSpace(transition.ID),
				Event:    strings.TrimSpace(transition.Event),
				From:     strings.TrimSpace(transition.From),
				To:       strings.TrimSpace(transition.To),
				Workflow: bootstrapWorkflow{Nodes: []bootstrapWorkflowNode{}},
				Metadata: cloneMap(transition.Metadata),
			}

			if transition.DynamicTo != nil {
				mapped.DynamicTo = &bootstrapDynamicTarget{Resolver: strings.TrimSpace(transition.DynamicTo.Resolver)}
			}
			if len(transition.Guards) > 0 {
				mapped.Guards = make([]bootstrapGuardDefinition, 0, len(transition.Guards))
				for _, guard := range transition.Guards {
					mapped.Guards = append(mapped.Guards, bootstrapGuardDefinition{
						Type:     strings.TrimSpace(guard.Type),
						Expr:     strings.TrimSpace(guard.Expr),
						Ref:      strings.TrimSpace(guard.Ref),
						Metadata: cloneMap(guard.Metadata),
					})
				}
			}

			for _, node := range transition.Workflow.Nodes {
				item := bootstrapWorkflowNode{
					ID:       strings.TrimSpace(node.ID),
					Kind:     strings.TrimSpace(node.Kind),
					Expr:     strings.TrimSpace(node.Expr),
					Metadata: cloneMap(node.Metadata),
				}
				if len(node.Next) > 0 {
					item.Next = append([]string(nil), node.Next...)
				}
				if node.Step != nil {
					item.Step = &bootstrapStep{
						ActionID: strings.TrimSpace(node.Step.ActionID),
						Async:    node.Step.Async,
						Delay:    strings.TrimSpace(node.Step.Delay),
						Timeout:  strings.TrimSpace(node.Step.Timeout),
						Metadata: cloneMap(node.Step.Metadata),
					}
				}
				mapped.Workflow.Nodes = append(mapped.Workflow.Nodes, item)
			}

			definition.Transitions = append(definition.Transitions, mapped)
		}
	}

	lastSavedAt := document.DraftState.LastSavedAt.UTC()
	if lastSavedAt.IsZero() {
		lastSavedAt = time.Now().UTC()
	}

	return bootstrapDraftDocument{
		Definition: definition,
		UISchema:   uiSchema,
		DraftState: bootstrapDraftState{
			IsDraft:     document.DraftState.IsDraft,
			LastSavedAt: lastSavedAt.Format(time.RFC3339Nano),
		},
	}, nil
}

func marshalToMap(input any) (map[string]any, error) {
	if input == nil {
		return map[string]any{}, nil
	}
	raw, err := json.Marshal(input)
	if err != nil {
		return nil, err
	}
	var out map[string]any
	if err := json.Unmarshal(raw, &out); err != nil {
		return nil, err
	}
	if out == nil {
		return map[string]any{}, nil
	}
	return out, nil
}

func cloneMap(input map[string]any) map[string]any {
	if len(input) == 0 {
		return nil
	}
	out := make(map[string]any, len(input))
	for key, value := range input {
		out[key] = value
	}
	return out
}

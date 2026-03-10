package flow

import (
	"context"
	stderrors "errors"
	"testing"
	"time"

	apperrors "github.com/goliatone/go-errors"
)

func TestAuthoringServiceSaveDraftLifecycleAndVersionConflicts(t *testing.T) {
	store := NewInMemoryAuthoringStore()
	catalog := &EditorCatalog{Steps: []CatalogItem{{ID: "publishAudit", Label: "publishAudit"}}}
	now := time.Date(2026, time.March, 10, 0, 0, 0, 0, time.UTC)
	service := NewAuthoringService(store, catalog).WithClock(func() time.Time { return now })

	validate := true
	first, err := service.SaveDraft(context.Background(), FSMAuthoringSaveDraftRequest{
		MachineID: "orders",
		Draft:     testAuthoringDraft("orders", "v12", "publishAudit"),
		Validate:  &validate,
	})
	if err != nil {
		t.Fatalf("save first draft: %v", err)
	}
	if first.Version != "v12" {
		t.Fatalf("expected v12 seed version, got %q", first.Version)
	}
	if first.ETag != "orders-v12" {
		t.Fatalf("expected etag orders-v12, got %q", first.ETag)
	}
	if !first.DraftState.IsDraft {
		t.Fatalf("expected saved draft state to be draft")
	}
	if !first.DraftState.LastSavedAt.Equal(now) {
		t.Fatalf("expected last_saved_at %s, got %s", now, first.DraftState.LastSavedAt)
	}
	if len(first.Diagnostics) != 0 {
		t.Fatalf("expected no diagnostics, got %#v", first.Diagnostics)
	}

	now = now.Add(3 * time.Minute)
	second, err := service.SaveDraft(context.Background(), FSMAuthoringSaveDraftRequest{
		MachineID:   "orders",
		BaseVersion: first.Version,
		Draft:       testAuthoringDraft("orders", "v12", "publishAudit"),
		Validate:    &validate,
	})
	if err != nil {
		t.Fatalf("save second draft: %v", err)
	}
	if second.Version != "v13" {
		t.Fatalf("expected incremented version v13, got %q", second.Version)
	}
	if second.ETag != "orders-v13" {
		t.Fatalf("expected etag orders-v13, got %q", second.ETag)
	}

	_, err = service.SaveDraft(context.Background(), FSMAuthoringSaveDraftRequest{
		MachineID:   "orders",
		BaseVersion: "v1",
		Draft:       testAuthoringDraft("orders", "v12", "publishAudit"),
	})
	if authoringErrorCode(err) != ErrCodeVersionConflict {
		t.Fatalf("expected version conflict error code, got %q (%v)", authoringErrorCode(err), err)
	}
}

func TestAuthoringServicePublishGatingDiagnosticsAndListDeleteSemantics(t *testing.T) {
	store := NewInMemoryAuthoringStore()
	catalog := &EditorCatalog{Steps: []CatalogItem{{ID: "publishAudit", Label: "publishAudit"}}}
	now := time.Date(2026, time.March, 10, 1, 0, 0, 0, time.UTC)
	service := NewAuthoringService(store, catalog).WithClock(func() time.Time { return now })

	validate := false
	saved, err := service.SaveDraft(context.Background(), FSMAuthoringSaveDraftRequest{
		MachineID: "orders",
		Draft:     testAuthoringDraft("orders", "v3", "unknown_action"),
		Validate:  &validate,
	})
	if err != nil {
		t.Fatalf("save invalid draft: %v", err)
	}

	_, err = service.Publish(context.Background(), FSMAuthoringPublishRequest{
		MachineID:       "orders",
		ExpectedVersion: saved.Version,
	})
	if authoringErrorCode(err) != ErrCodeAuthoringValidationFailed {
		t.Fatalf("expected validation failed code, got %q (%v)", authoringErrorCode(err), err)
	}
	if !containsDiagnosticCode(err, DiagCodeUnresolvedAction) {
		t.Fatalf("expected unresolved action diagnostic metadata")
	}

	now = now.Add(2 * time.Minute)
	validate = true
	updated, err := service.SaveDraft(context.Background(), FSMAuthoringSaveDraftRequest{
		MachineID:   "orders",
		BaseVersion: saved.Version,
		Draft:       testAuthoringDraft("orders", saved.Version, "publishAudit"),
		Validate:    &validate,
	})
	if err != nil {
		t.Fatalf("save corrected draft: %v", err)
	}

	now = now.Add(1 * time.Minute)
	pub, err := service.Publish(context.Background(), FSMAuthoringPublishRequest{
		MachineID:       "orders",
		ExpectedVersion: updated.Version,
	})
	if err != nil {
		t.Fatalf("publish draft: %v", err)
	}
	if pub.Version != "v5" {
		t.Fatalf("expected publish to increment to v5, got %q", pub.Version)
	}
	if pub.PublishedAt != now.Format(time.RFC3339) {
		t.Fatalf("expected publishedAt %q, got %q", now.Format(time.RFC3339), pub.PublishedAt)
	}

	limit := 1
	list, err := service.ListMachines(context.Background(), FSMAuthoringListMachinesRequest{
		Limit: &limit,
	})
	if err != nil {
		t.Fatalf("list machines: %v", err)
	}
	if len(list.Items) != 1 || list.Items[0].MachineID != "orders" {
		t.Fatalf("unexpected list result: %#v", list.Items)
	}
	if list.Items[0].IsDraft {
		t.Fatalf("expected published machine to report non-draft state")
	}

	includeDrafts := false
	listPublishedOnly, err := service.ListMachines(context.Background(), FSMAuthoringListMachinesRequest{
		IncludeDrafts: &includeDrafts,
	})
	if err != nil {
		t.Fatalf("list published only: %v", err)
	}
	if len(listPublishedOnly.Items) != 1 {
		t.Fatalf("expected published machine in non-draft list")
	}

	del, err := service.DeleteMachine(context.Background(), FSMAuthoringDeleteMachineRequest{
		MachineID:       "orders",
		ExpectedVersion: pub.Version,
	})
	if err != nil {
		t.Fatalf("delete machine: %v", err)
	}
	if !del.Deleted {
		t.Fatalf("expected deleted=true")
	}

	_, err = service.GetMachine(context.Background(), FSMAuthoringGetMachineRequest{
		MachineID: "orders",
	})
	if authoringErrorCode(err) != ErrCodeAuthoringNotFound {
		t.Fatalf("expected authoring not found, got %q (%v)", authoringErrorCode(err), err)
	}
}

func testAuthoringDraft(machineID, version, actionID string) DraftMachineDocument {
	return DraftMachineDocument{
		Definition: &MachineDefinition{
			ID:      machineID,
			Name:    "Orders",
			Version: version,
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
					Workflow: TransitionWorkflowDefinition{
						Nodes: []WorkflowNodeDefinition{
							{
								ID:   "step_1",
								Kind: "step",
								Step: &StepDefinition{
									ActionID: actionID,
									Metadata: map[string]any{
										"source": "test",
									},
								},
							},
						},
					},
				},
			},
		},
		UISchema: &MachineUISchema{
			Layout: "graph",
			Nodes: []StateNodeSchema{
				{ID: "draft", Label: "Draft", Initial: true, UI: UIComponent{Component: "state.node"}},
				{ID: "approved", Label: "Approved", UI: UIComponent{Component: "state.node"}},
			},
			Edges: []TransitionSchema{
				{
					ID:    "approve",
					Event: "approve",
					From:  "draft",
					Target: TargetUISchema{
						Kind: "static",
						To:   "approved",
					},
					Workflow: WorkflowUISchema{
						Nodes: []WorkflowNodeUISchema{
							{
								ID:   "step_1",
								Kind: "step",
								Step: &StepUISchema{
									Type: "command",
									Properties: map[string]any{
										"action_id": actionID,
										"metadata": map[string]any{
											"source": "test",
										},
									},
									UI: UIComponent{Component: "workflow.step"},
								},
								UI: UIComponent{Component: "workflow.node"},
							},
						},
					},
				},
			},
			Inspector: InspectorSchema{},
		},
		DraftState: DraftState{IsDraft: true},
	}
}

func authoringErrorCode(err error) string {
	if err == nil {
		return ""
	}
	var ge *apperrors.Error
	if stderrors.As(err, &ge) {
		return ge.TextCode
	}
	return ""
}

func containsDiagnosticCode(err error, code string) bool {
	var ge *apperrors.Error
	if !stderrors.As(err, &ge) || ge == nil {
		return false
	}
	raw, ok := ge.Metadata["diagnostics"]
	if !ok {
		return false
	}
	diags, ok := raw.([]ValidationDiagnostic)
	if !ok {
		return false
	}
	for _, diag := range diags {
		if diag.Code == code {
			return true
		}
	}
	return false
}

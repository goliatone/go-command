package main

import (
	"context"
	"fmt"
	"strings"
	"time"

	"github.com/goliatone/go-command"
	"github.com/goliatone/go-command/flow"
	cmdrpc "github.com/goliatone/go-command/rpc"
)

const defaultMachineID = "orders"
const manualReviewThreshold = 1000.0

type RuntimeMsg struct {
	EntityID string  `json:"entityId,omitempty"`
	Event    string  `json:"event,omitempty"`
	Amount   float64 `json:"amount,omitempty"`
}

func (RuntimeMsg) Type() string {
	return "fsm_ui_builder_web_chat.runtime_msg"
}

type App struct {
	rpcServer    *cmdrpc.Server
	registry     *command.Registry
	runtime      *flow.StateMachine[RuntimeMsg]
	runtimeStore *flow.InMemoryStateStore
	authoring    *flow.AuthoringService
	bot          *BotService

	machineID    string
	initialDraft flow.DraftMachineDocument
}

func NewApp(ctx context.Context) (*App, error) {
	if ctx == nil {
		ctx = context.Background()
	}

	machineDef := seedMachineDefinition()
	catalog := seedEditorCatalog()
	uiSchema, diagnostics := flow.MachineDefinitionToUISchema(machineDef, catalog, nil)
	if hasErrorDiagnostics(diagnostics) {
		return nil, fmt.Errorf("seed ui schema contains blocking diagnostics")
	}

	authoring := flow.NewAuthoringService(flow.NewInMemoryAuthoringStore(), catalog)
	seedDraft := flow.DraftMachineDocument{
		Definition: machineDef,
		UISchema:   uiSchema,
		DraftState: flow.DraftState{
			IsDraft:     true,
			LastSavedAt: time.Now().UTC(),
		},
	}
	validate := true
	if _, err := authoring.SaveDraft(ctx, flow.FSMAuthoringSaveDraftRequest{
		MachineID: defaultMachineID,
		Draft:     seedDraft,
		Validate:  &validate,
	}); err != nil {
		return nil, fmt.Errorf("seed authoring draft: %w", err)
	}
	seeded, err := authoring.GetMachine(ctx, flow.FSMAuthoringGetMachineRequest{
		MachineID:   defaultMachineID,
		PreferDraft: boolPtr(true),
	})
	if err != nil {
		return nil, fmt.Errorf("load seeded draft: %w", err)
	}

	runtimeMachine, runtimeStore, err := newRuntimeMachine(machineDef)
	if err != nil {
		return nil, fmt.Errorf("build runtime machine: %w", err)
	}
	if err := seedRuntimeEntities(ctx, runtimeStore, machineDef); err != nil {
		return nil, fmt.Errorf("seed runtime state: %w", err)
	}

	rpcServer := cmdrpc.NewServer(cmdrpc.WithFailureMode(cmdrpc.FailureModeRecover))
	registry := command.NewRegistry()
	if err := registry.AddResolver("rpc-endpoints", cmdrpc.Resolver(rpcServer)); err != nil {
		return nil, fmt.Errorf("add rpc resolver: %w", err)
	}

	if err := flow.RegisterFSMRPCCommands(registry, runtimeMachine); err != nil {
		return nil, fmt.Errorf("register runtime rpc commands: %w", err)
	}
	if err := flow.RegisterFSMAuthoringRPCCommands(registry, authoring); err != nil {
		return nil, fmt.Errorf("register authoring rpc commands: %w", err)
	}

	botService := NewBotService(authoring, runtimeMachine, catalog, defaultMachineID)
	if err := RegisterBotRPCCommands(registry, botService); err != nil {
		return nil, fmt.Errorf("register bot rpc commands: %w", err)
	}

	if err := registry.Initialize(); err != nil {
		return nil, fmt.Errorf("initialize registry: %w", err)
	}

	return &App{
		rpcServer:    rpcServer,
		registry:     registry,
		runtime:      runtimeMachine,
		runtimeStore: runtimeStore,
		authoring:    authoring,
		bot:          botService,
		machineID:    defaultMachineID,
		initialDraft: seeded.Draft,
	}, nil
}

func seedMachineDefinition() *flow.MachineDefinition {
	return &flow.MachineDefinition{
		ID:      defaultMachineID,
		Name:    "Orders",
		Version: "v13",
		States: []flow.StateDefinition{
			{Name: "draft", Initial: true},
			{Name: "approved"},
			{Name: "review"},
			{Name: "fulfilled", Terminal: true},
			{Name: "rejected", Terminal: true},
		},
		Transitions: []flow.TransitionDefinition{
			{
				ID:    "approve",
				Event: "approve",
				From:  "draft",
				To:    "approved",
				Workflow: flow.TransitionWorkflowDefinition{
					Nodes: []flow.WorkflowNodeDefinition{
						{
							ID:   "step-approve-audit",
							Kind: "step",
							Step: &flow.StepDefinition{
								ActionID: "audit.log",
								Async:    false,
								Timeout:  "5s",
								Metadata: map[string]any{"channel": "audit"},
							},
							Next: []string{"step-risk-score"},
						},
						{
							ID:   "step-risk-score",
							Kind: "step",
							Step: &flow.StepDefinition{
								ActionID: "risk.score",
								Async:    false,
								Timeout:  "4s",
								Metadata: map[string]any{"channel": "risk"},
							},
							Next: []string{"when-approval"},
						},
						{
							ID:   "when-approval",
							Kind: "when",
							Expr: "amount > 0",
							Next: []string{"step-inventory-reserve"},
						},
						{
							ID:   "step-inventory-reserve",
							Kind: "step",
							Step: &flow.StepDefinition{
								ActionID: "inventory.reserve",
								Async:    false,
								Timeout:  "4s",
								Metadata: map[string]any{"channel": "inventory"},
							},
						},
					},
				},
			},
			{
				ID:    "reject",
				Event: "reject",
				From:  "draft",
				To:    "rejected",
				Workflow: flow.TransitionWorkflowDefinition{
					Nodes: []flow.WorkflowNodeDefinition{
						{
							ID:   "step-reject-notify",
							Kind: "step",
							Step: &flow.StepDefinition{
								ActionID: "notify.ops",
								Timeout:  "2s",
								Metadata: map[string]any{"channel": "ops"},
							},
							Next: []string{"step-reject-refund"},
						},
						{
							ID:   "step-reject-refund",
							Kind: "step",
							Step: &flow.StepDefinition{
								ActionID: "payment.refund",
								Timeout:  "4s",
								Metadata: map[string]any{"channel": "payments"},
							},
						},
					},
				},
			},
			{
				ID:    "fulfill",
				Event: "fulfill",
				From:  "approved",
				To:    "fulfilled",
				Workflow: flow.TransitionWorkflowDefinition{
					Nodes: []flow.WorkflowNodeDefinition{
						{
							ID:   "step-fulfill-capture",
							Kind: "step",
							Step: &flow.StepDefinition{
								ActionID: "payment.capture",
								Async:    false,
								Timeout:  "5s",
								Metadata: map[string]any{"channel": "payments"},
							},
							Next: []string{"step-fulfill-notify"},
						},
						{
							ID:   "step-fulfill-notify",
							Kind: "step",
							Step: &flow.StepDefinition{
								ActionID: "notify.ops",
								Async:    false,
								Timeout:  "2s",
								Metadata: map[string]any{"channel": "ops"},
							},
						},
					},
				},
			},
			{
				ID:    "reroute",
				Event: "reroute",
				From:  "approved",
				To:    "review",
				Guards: []flow.GuardDefinition{
					{Type: "resolver", Ref: "requires_manual_review"},
				},
				Workflow: flow.TransitionWorkflowDefinition{
					Nodes: []flow.WorkflowNodeDefinition{
						{
							ID:   "step-reroute-notify",
							Kind: "step",
							Step: &flow.StepDefinition{
								ActionID: "notify.ops",
								Timeout:  "2s",
								Metadata: map[string]any{"channel": "ops"},
							},
						},
					},
				},
			},
			{
				ID:    "approve_after_review",
				Event: "approve",
				From:  "review",
				To:    "approved",
				Workflow: flow.TransitionWorkflowDefinition{
					Nodes: []flow.WorkflowNodeDefinition{
						{
							ID:   "step-review-approve-audit",
							Kind: "step",
							Step: &flow.StepDefinition{
								ActionID: "audit.log",
								Timeout:  "3s",
								Metadata: map[string]any{"channel": "audit"},
							},
						},
					},
				},
			},
			{
				ID:    "reject_after_review",
				Event: "reject",
				From:  "review",
				To:    "rejected",
				Workflow: flow.TransitionWorkflowDefinition{
					Nodes: []flow.WorkflowNodeDefinition{
						{
							ID:   "step-review-reject-notify",
							Kind: "step",
							Step: &flow.StepDefinition{
								ActionID: "notify.ops",
								Timeout:  "2s",
								Metadata: map[string]any{"channel": "ops"},
							},
						},
					},
				},
			},
			{
				ID:    "request_changes",
				Event: "request_changes",
				From:  "review",
				To:    "draft",
				Workflow: flow.TransitionWorkflowDefinition{
					Nodes: []flow.WorkflowNodeDefinition{
						{
							ID:   "step-request-changes-notify",
							Kind: "step",
							Step: &flow.StepDefinition{
								ActionID: "notify.ops",
								Timeout:  "2s",
								Metadata: map[string]any{"channel": "ops"},
							},
						},
					},
				},
			},
		},
	}
}

func seedEditorCatalog() *flow.EditorCatalog {
	return &flow.EditorCatalog{
		Guards: []flow.CatalogItem{
			{ID: "requires_manual_review", Label: "requires_manual_review", Category: "guard"},
		},
		Steps: []flow.CatalogItem{
			{ID: "audit.log", Label: "audit.log", Category: "step"},
			{ID: "risk.score", Label: "risk.score", Category: "step"},
			{ID: "inventory.reserve", Label: "inventory.reserve", Category: "step"},
			{ID: "payment.capture", Label: "payment.capture", Category: "step"},
			{ID: "payment.refund", Label: "payment.refund", Category: "step"},
			{ID: "notify.ops", Label: "notify.ops", Category: "step"},
		},
	}
}

func newRuntimeMachine(def *flow.MachineDefinition) (*flow.StateMachine[RuntimeMsg], *flow.InMemoryStateStore, error) {
	store := flow.NewInMemoryStateStore()
	resolvers := flow.NewResolverMap[RuntimeMsg]()
	resolvers.RegisterGuard("requires_manual_review", func(_ context.Context, msg RuntimeMsg, _ flow.ExecutionContext) error {
		if msg.Amount >= manualReviewThreshold {
			return nil
		}
		return &flow.GuardRejection{
			Code:            flow.ErrCodeGuardRejected,
			Category:        flow.GuardClassificationDomainReject,
			Retryable:       false,
			RequiresAction:  true,
			Message:         fmt.Sprintf("manual review only required for amount >= %.2f", manualReviewThreshold),
			RemediationHint: "increase amount for review scenario or choose another transition",
			Metadata: map[string]any{
				"guard":     "requires_manual_review",
				"threshold": manualReviewThreshold,
				"amount":    msg.Amount,
			},
		}
	})

	actions := flow.NewActionRegistry[RuntimeMsg]()
	if err := actions.Register("audit.log", func(ctx context.Context, msg RuntimeMsg) error {
		if err := simulateRuntimeLatency(ctx, 20*time.Millisecond); err != nil {
			return err
		}
		if msg.Amount < 0 {
			return fmt.Errorf("audit rejected negative amount")
		}
		return nil
	}); err != nil {
		return nil, nil, fmt.Errorf("register action audit.log: %w", err)
	}
	if err := actions.Register("risk.score", func(ctx context.Context, msg RuntimeMsg) error {
		if err := simulateRuntimeLatency(ctx, 30*time.Millisecond); err != nil {
			return err
		}
		if msg.Amount > 50000 {
			return fmt.Errorf("risk engine timeout for amount %.2f", msg.Amount)
		}
		return nil
	}); err != nil {
		return nil, nil, fmt.Errorf("register action risk.score: %w", err)
	}
	if err := actions.Register("inventory.reserve", func(ctx context.Context, msg RuntimeMsg) error {
		if err := simulateRuntimeLatency(ctx, 25*time.Millisecond); err != nil {
			return err
		}
		if msg.Amount > 7500 {
			return fmt.Errorf("inventory reservation requires supervisor approval")
		}
		return nil
	}); err != nil {
		return nil, nil, fmt.Errorf("register action inventory.reserve: %w", err)
	}
	if err := actions.Register("payment.capture", func(ctx context.Context, msg RuntimeMsg) error {
		if err := simulateRuntimeLatency(ctx, 40*time.Millisecond); err != nil {
			return err
		}
		if msg.Amount <= 0 {
			return fmt.Errorf("payment capture requires amount > 0")
		}
		return nil
	}); err != nil {
		return nil, nil, fmt.Errorf("register action payment.capture: %w", err)
	}
	if err := actions.Register("payment.refund", func(ctx context.Context, _ RuntimeMsg) error {
		return simulateRuntimeLatency(ctx, 25*time.Millisecond)
	}); err != nil {
		return nil, nil, fmt.Errorf("register action payment.refund: %w", err)
	}
	if err := actions.Register("notify.ops", func(ctx context.Context, _ RuntimeMsg) error {
		return simulateRuntimeLatency(ctx, 15*time.Millisecond)
	}); err != nil {
		return nil, nil, fmt.Errorf("register action notify.ops: %w", err)
	}

	req := flow.TransitionRequest[RuntimeMsg]{
		StateKey: func(msg RuntimeMsg) string { return strings.TrimSpace(msg.EntityID) },
		Event:    func(msg RuntimeMsg) string { return strings.TrimSpace(msg.Event) },
	}

	machine, err := flow.NewStateMachineFromDefinition(
		def,
		store,
		req,
		resolvers,
		actions,
		flow.WithExecutionPolicy[RuntimeMsg](flow.ExecutionPolicyLightweight),
	)
	if err != nil {
		return nil, nil, err
	}
	return machine, store, nil
}

func seedRuntimeEntities(ctx context.Context, store flow.StateStore, def *flow.MachineDefinition) error {
	if store == nil || def == nil {
		return fmt.Errorf("runtime seed requires store and machine definition")
	}
	seed := []struct {
		entityID string
		state    string
	}{
		{entityID: "order-1", state: "draft"},
		{entityID: "orders-preview", state: "draft"},
		{entityID: "order-approved", state: "approved"},
		{entityID: "order-review", state: "review"},
	}
	for _, item := range seed {
		_, err := store.SaveIfVersion(ctx, &flow.StateRecord{
			EntityID:       item.entityID,
			State:          item.state,
			MachineID:      def.ID,
			MachineVersion: def.Version,
		}, 0)
		if err != nil {
			return fmt.Errorf("seed state %s: %w", item.entityID, err)
		}
	}
	return nil
}

func hasErrorDiagnostics(diags []flow.ValidationDiagnostic) bool {
	for _, diag := range diags {
		if strings.EqualFold(diag.Severity, flow.SeverityError) {
			return true
		}
	}
	return false
}

func boolPtr(value bool) *bool {
	return &value
}

func simulateRuntimeLatency(ctx context.Context, delay time.Duration) error {
	if delay <= 0 {
		return nil
	}
	timer := time.NewTimer(delay)
	defer timer.Stop()
	select {
	case <-ctx.Done():
		return ctx.Err()
	case <-timer.C:
		return nil
	}
}

package main

import (
	"context"
	"fmt"
	"sort"
	"sync"

	"github.com/goliatone/go-command/flow"
)

// OrderMsg demonstrates a message that drives state transitions.
type OrderMsg struct {
	ID     string
	Event  string
	Admin  bool
	Target string
}

func (OrderMsg) Type() string { return "order_msg" }

type Order struct {
	ID        string `json:"id"`
	State     string `json:"state"`
	CreatedBy string `json:"created_by,omitempty"`
	AdminOnly bool   `json:"admin_only,omitempty"`
}

type App struct {
	StateMachine *flow.StateMachine[OrderMsg]
	Config       flow.StateMachineConfig
	StateStore   flow.StateStore
	Guards       *flow.GuardRegistry[OrderMsg]
	Actions      *flow.ActionRegistry[OrderMsg]
	Orders       map[string]*Order
	mu           sync.RWMutex
	AuditLog     []string
}

func NewApp(ctx context.Context) (*App, error) {
	// Define a simple workflow: draft -> approved -> fulfilled
	cfg := flow.StateMachineConfig{
		Entity:          "order",
		ExecutionPolicy: flow.ExecutionPolicyLightweight,
		States: []flow.StateConfig{
			{Name: "draft", Initial: true},
			{Name: "approved"},
			{Name: "fulfilled", Terminal: true},
			{Name: "cancelled", Terminal: true},
		},
		Transitions: []flow.TransitionConfig{
			{Name: "approve", From: "draft", To: "approved", Guard: "is_admin", Action: "audit"},
			{Name: "fulfill", From: "approved", To: "fulfilled", Action: "log_fulfillment"},
			{Name: "cancel", From: "draft", To: "cancelled"},
			{Name: "cancel", From: "approved", To: "cancelled", Guard: "is_admin"},
		},
	}

	app := &App{
		Orders:   make(map[string]*Order),
		AuditLog: make([]string, 0),
	}

	guards := flow.NewGuardRegistry[OrderMsg]()
	guards.Register("is_admin", func(m OrderMsg) bool { return m.Admin })

	actions := flow.NewActionRegistry[OrderMsg]()
	actions.Register("audit", func(ctx context.Context, m OrderMsg) error {
		msg := fmt.Sprintf("Order %s approved by admin", m.ID)
		app.addAuditLog(msg)
		return nil
	})
	actions.Register("log_fulfillment", func(ctx context.Context, m OrderMsg) error {
		msg := fmt.Sprintf("Order %s fulfilled", m.ID)
		app.addAuditLog(msg)
		return nil
	})

	store := flow.NewInMemoryStateStore()
	req := flow.TransitionRequest[OrderMsg]{
		StateKey: func(m OrderMsg) string { return m.ID },
		Event:    func(m OrderMsg) string { return m.Event },
		CurrentState: func(m OrderMsg) string {
			return m.Target
		},
	}

	sm, err := flow.NewStateMachine(cfg, store, req, guards, actions)
	if err != nil {
		return nil, err
	}

	app.StateMachine = sm
	app.Config = cfg
	app.StateStore = store
	app.Guards = guards
	app.Actions = actions

	return app, nil
}

func (a *App) addAuditLog(msg string) {
	a.mu.Lock()
	defer a.mu.Unlock()
	a.AuditLog = append(a.AuditLog, msg)
	if len(a.AuditLog) > 100 {
		a.AuditLog = a.AuditLog[1:]
	}
}

func (a *App) GetAuditLog() []string {
	a.mu.RLock()
	defer a.mu.RUnlock()
	result := make([]string, len(a.AuditLog))
	copy(result, a.AuditLog)
	return result
}

func (a *App) GetOrder(id string) *Order {
	a.mu.RLock()
	defer a.mu.RUnlock()
	return a.Orders[id]
}

func (a *App) GetOrders() []*Order {
	a.mu.RLock()
	defer a.mu.RUnlock()
	orders := make([]*Order, 0, len(a.Orders))
	for _, order := range a.Orders {
		orders = append(orders, order)
	}
	sort.Slice(orders, func(i, j int) bool {
		return orders[i].ID < orders[j].ID
	})
	return orders
}

func (a *App) CreateOrder(id string) (*Order, error) {
	a.mu.Lock()
	if _, exists := a.Orders[id]; exists {
		a.mu.Unlock()
		return nil, fmt.Errorf("order %s already exists", id)
	}

	order := &Order{
		ID:    id,
		State: "draft",
	}
	a.Orders[id] = order
	a.mu.Unlock()

	ctx := context.Background()
	_, err := a.StateStore.SaveIfVersion(ctx, &flow.StateRecord{
		EntityID: id,
		State:    "draft",
	}, 0)
	if err != nil {
		a.mu.Lock()
		delete(a.Orders, id)
		a.mu.Unlock()
		return nil, err
	}

	a.addAuditLog(fmt.Sprintf("Order %s created in state draft", id))
	return order, nil
}

func (a *App) Transition(id, event string, admin bool) error {
	a.mu.Lock()
	order, exists := a.Orders[id]
	if !exists {
		a.mu.Unlock()
		return fmt.Errorf("order %s not found", id)
	}
	currentState := order.State
	a.mu.Unlock()

	fmt.Printf("[DEBUG] Transition start: id=%s event=%s admin=%v currentOrderState=%s\n", id, event, admin, currentState)
	fmt.Printf("[DEBUG] StateMachine ptr=%p Store ptr=%p\n", a.StateMachine, a.StateStore)

	msg := OrderMsg{
		ID:     id,
		Event:  event,
		Admin:  admin,
		Target: currentState, // provide current state as fallback for the state machine
	}

	ctx := context.Background()

	// Check store state before
	storeBeforeRec, _ := a.StateStore.Load(ctx, id)
	storeBefore := ""
	if storeBeforeRec != nil {
		storeBefore = storeBeforeRec.State
	}
	fmt.Printf("[DEBUG] Store state before Execute: %s (store ptr=%p)\n", storeBefore, a.StateStore)

	if err := a.StateMachine.Execute(ctx, msg); err != nil {
		fmt.Printf("[DEBUG] Execute failed: %v\n", err)
		return err
	}

	rec, err := a.StateStore.Load(ctx, id)
	if err != nil {
		fmt.Printf("[DEBUG] Load failed: %v\n", err)
		return err
	}
	if rec == nil {
		return fmt.Errorf("state record missing for %s", id)
	}
	state := rec.State

	fmt.Printf("[DEBUG] Store state after Execute: %s\n", state)

	a.mu.Lock()
	order.State = state
	a.mu.Unlock()

	fmt.Printf("[DEBUG] Updated order.State to: %s\n", state)

	return nil
}

func (a *App) GetAvailableTransitions(orderID string, admin bool) []string {
	a.mu.RLock()
	order := a.Orders[orderID]
	a.mu.RUnlock()

	if order == nil {
		return []string{}
	}

	transitions := []string{}
	// Normalize state for comparison (state machine normalizes to lowercase)
	currentState := normalizeStateName(order.State)

	for _, t := range a.Config.Transitions {
		normalizedFrom := normalizeStateName(t.From)
		if normalizedFrom == currentState {
			// Check if guard is satisfied
			if t.Guard != "" {
				msg := OrderMsg{ID: orderID, Admin: admin}
				guard, ok := a.Guards.Lookup(t.Guard)
				if !ok || guard == nil || guard(context.Background(), msg, flow.ExecutionContext{}) != nil {
					continue
				}
			}
			transitions = append(transitions, t.Name)
		}
	}

	return transitions
}

func normalizeStateName(s string) string {
	return s // States are already lowercase in our config
}

package main

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/goliatone/go-command/flow"
	_ "github.com/mattn/go-sqlite3"
)

type OrderMsg struct {
	ID    string
	Event string
}

func (OrderMsg) Type() string { return "order_msg" }

func main() {
	// SQLite-backed state store
	db, err := sql.Open("sqlite3", ":memory:")
	if err != nil {
		panic(err)
	}
	defer db.Close()

	store := flow.NewSQLiteStateStore(db, "states")

	cfg := flow.StateMachineConfig{
		Entity:          "order",
		ExecutionPolicy: flow.ExecutionPolicyLightweight,
		States:          []flow.StateConfig{{Name: "draft", Initial: true}, {Name: "approved"}},
		Transitions: []flow.TransitionConfig{
			{Name: "approve", From: "draft", To: "approved"},
		},
	}

	req := flow.TransitionRequest[OrderMsg]{
		StateKey: func(m OrderMsg) string { return m.ID },
		Event:    func(m OrderMsg) string { return m.Event },
	}

	def := cfg.ToMachineDefinition()
	sm, err := flow.NewStateMachineFromDefinition(
		def,
		store,
		req,
		flow.NewResolverMap[OrderMsg](),
		nil,
		flow.WithExecutionPolicy[OrderMsg](cfg.ExecutionPolicy),
	)
	if err != nil {
		panic(err)
	}

	ctx := context.Background()
	msg := OrderMsg{ID: "ORD-1", Event: "approve"}
	if _, err := store.SaveIfVersion(ctx, &flow.StateRecord{
		EntityID:       msg.ID,
		State:          "draft",
		MachineID:      def.ID,
		MachineVersion: def.Version,
	}, 0); err != nil {
		panic(err)
	}
	if err := sm.Execute(ctx, msg); err != nil {
		panic(err)
	}

	rec, err := store.Load(ctx, msg.ID)
	if err != nil {
		panic(err)
	}
	if rec == nil {
		panic("expected persisted state record")
	}
	fmt.Printf("persisted state in sqlite: %s (version=%d)\n", rec.State, rec.Version)
}

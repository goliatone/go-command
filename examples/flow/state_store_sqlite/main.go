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

	if _, err := db.Exec(`CREATE TABLE IF NOT EXISTS states (k TEXT PRIMARY KEY, v TEXT)`); err != nil {
		panic(err)
	}
	store := flow.NewSQLiteStateStore(db, "states")

	cfg := flow.StateMachineConfig{
		Entity: "order",
		States: []flow.StateConfig{{Name: "draft", Initial: true}, {Name: "approved"}},
		Transitions: []flow.TransitionConfig{
			{Name: "approve", From: "draft", To: "approved"},
		},
	}

	req := flow.TransitionRequest[OrderMsg]{
		StateKey: func(m OrderMsg) string { return m.ID },
		Event:    func(m OrderMsg) string { return m.Event },
	}

	sm, err := flow.NewStateMachine(cfg, store, req, nil, nil)
	if err != nil {
		panic(err)
	}

	ctx := context.Background()
	msg := OrderMsg{ID: "ORD-1", Event: "approve"}
	if err := sm.Execute(ctx, msg); err != nil {
		panic(err)
	}

	state, err := store.Load(ctx, msg.ID)
	if err != nil {
		panic(err)
	}
	fmt.Printf("persisted state in sqlite: %s\n", state)
}

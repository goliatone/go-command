package main

import (
	"context"
	"fmt"
	"log"

	"github.com/goliatone/go-command"
	"github.com/goliatone/go-command/flow"
)

// OrderMsg is a simple command.Message used in the example.
type OrderMsg struct {
	ID string
}

func (OrderMsg) Type() string { return "order_msg" }

var flowYAML = []byte(`
version: 1
flows:
  - id: order_pipeline
    type: serial
    serial:
      steps: ["inventory", "payment", "notify"]
    options:
      timeout: 5s
      exit_on_error: false
`)

func main() {
	ctx := context.Background()

	// Parse configuration
	cfg, err := flow.ParseFlowSet(flowYAML)
	if err != nil {
		log.Fatalf("failed to parse flow config: %v", err)
	}

	// Register handlers
	handlers := flow.NewHandlerRegistry[OrderMsg]()
	must(handlers.Register("inventory", command.CommandFunc[OrderMsg](inventory)))
	must(handlers.Register("payment", command.CommandFunc[OrderMsg](payment)))
	must(handlers.Register("notify", command.CommandFunc[OrderMsg](notify)))

	// Build flows from config
	built, err := flow.BuildFlows(ctx, cfg, flow.BuildContext[OrderMsg]{Handlers: handlers})
	if err != nil {
		log.Fatalf("failed to build flows: %v", err)
	}

	pipeline := built["order_pipeline"]
	if pipeline == nil {
		log.Fatalf("order_pipeline not found")
	}

	// Execute the flow
	msg := OrderMsg{ID: "ORD-1234"}
	if err := pipeline.Execute(ctx, msg); err != nil {
		log.Fatalf("flow execution failed: %v", err)
	}
	fmt.Println("flow completed successfully")
}

func inventory(ctx context.Context, msg OrderMsg) error {
	fmt.Printf("checking inventory for %s\n", msg.ID)
	return nil
}

func payment(ctx context.Context, msg OrderMsg) error {
	fmt.Printf("processing payment for %s\n", msg.ID)
	return nil
}

func notify(ctx context.Context, msg OrderMsg) error {
	fmt.Printf("sending notification for %s\n", msg.ID)
	return nil
}

func must(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

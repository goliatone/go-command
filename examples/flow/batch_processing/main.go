package main

import (
	"context"
	"fmt"

	"github.com/goliatone/go-command"
	"github.com/goliatone/go-command/flow"
)

type EmailMsg struct {
	To string
}

func (EmailMsg) Type() string { return "email_msg" }

func main() {
	ctx := context.Background()

	handler := command.CommandFunc[EmailMsg](func(ctx context.Context, m EmailMsg) error {
		fmt.Printf("sending email to %s\n", m.To)
		return nil
	})

	exec := flow.NewBatchExecutor(handler,
		flow.WithBatchSize[EmailMsg](2),
		flow.WithConcurrency[EmailMsg](2),
	)

	messages := []EmailMsg{
		{To: "a@example.com"},
		{To: "b@example.com"},
		{To: "c@example.com"},
	}

	if err := exec.Execute(ctx, messages); err != nil {
		fmt.Printf("batch execution failed: %v\n", err)
	} else {
		fmt.Println("batch execution completed")
	}
}

package main

import (
	"context"
	"fmt"

	"github.com/goliatone/go-command"
	"github.com/goliatone/go-command/dispatcher"
	"github.com/goliatone/go-command/flow"
)

type NotifyMsg struct {
	Channel string
}

func (NotifyMsg) Type() string { return "notify_msg" }

func main() {
	// Subscribe two handlers to the mux/dispatcher.
	dispatcher.SubscribeCommand(command.CommandFunc[NotifyMsg](func(ctx context.Context, m NotifyMsg) error {
		fmt.Printf("email notification via %s\n", m.Channel)
		return nil
	}))
	dispatcher.SubscribeCommand(command.CommandFunc[NotifyMsg](func(ctx context.Context, m NotifyMsg) error {
		fmt.Printf("sms notification via %s\n", m.Channel)
		return nil
	}))

	// Commander that dispatches a single message.
	dispatchCmd := command.CommandFunc[NotifyMsg](func(ctx context.Context, m NotifyMsg) error {
		return dispatcher.Dispatch(ctx, m)
	})

	// Parallel executor over a slice of messages.
	exec := flow.NewParallelExecutor([]command.Commander[NotifyMsg]{dispatchCmd})

	msgs := []NotifyMsg{
		{Channel: "alpha"},
		{Channel: "beta"},
	}

	for _, msg := range msgs {
		if err := exec.Execute(context.Background(), msg); err != nil {
			fmt.Printf("dispatch failed: %v\n", err)
		}
	}
}

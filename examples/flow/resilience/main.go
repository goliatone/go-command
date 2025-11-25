package main

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/goliatone/go-command"
	"github.com/goliatone/go-command/flow"
	"github.com/goliatone/go-command/runner"
)

type PingMsg struct {
	ID string
}

func (PingMsg) Type() string { return "ping_msg" }

func main() {
	ctx := context.Background()
	attempts := 0

	// Flaky handler: fails twice then succeeds.
	flaky := command.CommandFunc[PingMsg](func(context.Context, PingMsg) error {
		attempts++
		if attempts < 3 {
			fmt.Printf("attempt %d failed\n", attempts)
			return errors.New("temporary failure")
		}
		fmt.Printf("attempt %d succeeded\n", attempts)
		return nil
	})

	retry := flow.NewRetryableFlow(flaky, runner.NoDelayStrategy{}, 2)
	breaker := flow.NewCircuitBreaker(retry, 2, 2*time.Second)

	msg := PingMsg{ID: "p1"}
	if err := breaker.Execute(ctx, msg); err != nil {
		fmt.Printf("execution failed: %v\n", err)
	} else {
		fmt.Println("execution succeeded")
	}

	// Trip the circuit
	attempts = 0
	_ = breaker.Execute(ctx, msg) // fails
	_ = breaker.Execute(ctx, msg) // fails and opens
	if err := breaker.Execute(ctx, msg); err != nil {
		fmt.Printf("circuit open: %v\n", err)
	}
}

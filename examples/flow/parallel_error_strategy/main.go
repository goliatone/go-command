package main

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/goliatone/go-command"
	"github.com/goliatone/go-command/flow"
)

type WorkMsg struct {
	ID string
}

func (WorkMsg) Type() string { return "work_msg" }

func main() {
	ctx := context.Background()

	// Handlers: one fails, one succeeds.
	fail := command.CommandFunc[WorkMsg](func(context.Context, WorkMsg) error {
		time.Sleep(50 * time.Millisecond)
		return errors.New("upstream failed")
	})
	ok := command.CommandFunc[WorkMsg](func(context.Context, WorkMsg) error {
		time.Sleep(20 * time.Millisecond)
		fmt.Println("ok handler finished")
		return nil
	})

	// Aggregate strategy (default)
	agg := flow.NewParallelExecutor([]command.Commander[WorkMsg]{fail, ok})
	if err := agg.Execute(ctx, WorkMsg{ID: "job-1"}); err != nil {
		fmt.Printf("aggregate strategy error: %v\n", err)
	}

	// Fail-fast strategy: cancel others on first error
	failFast := flow.NewParallelExecutor([]command.Commander[WorkMsg]{fail, ok}).WithErrorStrategy(flow.FailFastStrategy{})
	if err := failFast.Execute(ctx, WorkMsg{ID: "job-2"}); err != nil {
		fmt.Printf("fail-fast strategy error: %v\n", err)
	}
}

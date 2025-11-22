package main

import (
	"context"
	"fmt"
	"time"

	"github.com/goliatone/go-command"
	"github.com/goliatone/go-command/flow"
)

type Work struct {
	ID string
}

func (Work) Type() string { return "work_msg" }

type consoleRecorder struct{}

func (consoleRecorder) RecordDuration(name string, d time.Duration) {
	fmt.Printf("[metrics] %s duration=%s\n", name, d)
}
func (consoleRecorder) RecordError(name string) {
	fmt.Printf("[metrics] %s error\n", name)
}
func (consoleRecorder) RecordSuccess(name string) {
	fmt.Printf("[metrics] %s success\n", name)
}

func main() {
	handler := command.CommandFunc[Work](func(ctx context.Context, w Work) error {
		fmt.Printf("processing %s\n", w.ID)
		return nil
	})

	recorder := consoleRecorder{}
	decorated := flow.NewMetricsDecorator[Work](handler, recorder)

	if err := decorated.Execute(context.Background(), Work{ID: "w1"}); err != nil {
		fmt.Printf("execution failed: %v\n", err)
	}
}

package flow

import (
	"context"
	stderrors "errors"
	"testing"

	"github.com/goliatone/go-command"
	goerrors "github.com/goliatone/go-errors"
)

func TestParallelExecutorErrorStrategyAggregate(t *testing.T) {
	handlerErr := command.CommandFunc[int](func(context.Context, int) error { return stderrors.New("fail") })
	handlerOK := command.CommandFunc[int](func(context.Context, int) error { return nil })

	exec := NewParallelExecutor[int]([]command.Commander[int]{handlerErr, handlerOK})
	err := exec.Execute(context.Background(), 1)
	if err == nil {
		t.Fatalf("expected error")
	}
	var e *goerrors.Error
	if !stderrors.As(err, &e) {
		t.Fatalf("expected go-errors error")
	}
}

func TestParallelExecutorErrorStrategyFailFast(t *testing.T) {
	handlerErr := command.CommandFunc[int](func(context.Context, int) error { return stderrors.New("fail") })
	exec := NewParallelExecutor[int]([]command.Commander[int]{handlerErr}).WithErrorStrategy(FailFastStrategy{})
	err := exec.Execute(context.Background(), 1)
	if err == nil {
		t.Fatalf("expected error")
	}
}

package flow

import (
	"context"
	"errors"
	"testing"

	goerrors "github.com/goliatone/go-errors"
)

type sagaMsg struct {
	Name string
}

func (sagaMsg) Type() string { return "sagaMsg" }

func TestSagaSuccess(t *testing.T) {
	step1 := SagaStep[sagaMsg]{Name: "one", Execute: func(context.Context, sagaMsg) error { return nil }}
	step2 := SagaStep[sagaMsg]{Name: "two", Execute: func(context.Context, sagaMsg) error { return nil }}

	saga := NewSaga([]SagaStep[sagaMsg]{step1, step2}, true)
	if err := saga.Execute(context.Background(), sagaMsg{Name: "ok"}); err != nil {
		t.Fatalf("expected success, got %v", err)
	}
}

func TestSagaCompensationErrors(t *testing.T) {
	step1 := SagaStep[sagaMsg]{Name: "one", Execute: func(context.Context, sagaMsg) error { return nil }, Compensate: func(context.Context, sagaMsg) error {
		return errors.New("comp-fail")
	}}
	step2 := SagaStep[sagaMsg]{Name: "two", Execute: func(context.Context, sagaMsg) error { return errors.New("boom") }}

	saga := NewSaga([]SagaStep[sagaMsg]{step1, step2}, true)
	err := saga.Execute(context.Background(), sagaMsg{Name: "fail"})
	if err == nil {
		t.Fatalf("expected error")
	}
	var ge *goerrors.Error
	if !errors.As(err, &ge) {
		t.Fatalf("expected go-errors payload, got %v", err)
	}
	if ge.Metadata["compensation_error"] == nil {
		t.Fatalf("expected compensation_error metadata, got %v", ge.Metadata)
	}
}

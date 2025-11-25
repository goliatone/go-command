package flow

import (
	"context"
	"fmt"

	"github.com/goliatone/go-command"
	"github.com/goliatone/go-errors"
)

// Saga implements the saga pattern for distributed transactions
// a compensating transaction must be idempotent and retryable
type Saga[T command.Message] struct {
	steps      []SagaStep[T]
	compensate bool
}

type SagaStep[T command.Message] struct {
	Name       string
	Execute    func(context.Context, T) error
	Compensate func(context.Context, T) error
}

func NewSaga[T command.Message](steps []SagaStep[T], compensate bool) *Saga[T] {
	return &Saga[T]{
		steps:      steps,
		compensate: compensate,
	}
}

func (s *Saga[T]) Execute(ctx context.Context, msg T) error {
	var executedSteps []int
	var compensationErrs error

	for i, step := range s.steps {
		if err := step.Execute(ctx, msg); err != nil {
			if s.compensate {
				compensationErrs = s.rollback(ctx, msg, executedSteps)
			}
			if compensationErrs != nil {
				return errors.Wrap(err, errors.CategoryHandler, fmt.Sprintf("saga failed at step %d (%s)", i, step.Name)).
					WithTextCode("SAGA_STEP_FAILED").
					WithMetadata(map[string]any{
						"step_index":         i,
						"step_name":          step.Name,
						"compensation_error": compensationErrs.Error(),
					})
			}
			return errors.Wrap(err, errors.CategoryHandler, fmt.Sprintf("saga failed at step %d (%s)", i, step.Name)).
				WithTextCode("SAGA_STEP_FAILED").
				WithMetadata(map[string]any{
					"step_index": i,
					"step_name":  step.Name,
				})
		}
		executedSteps = append(executedSteps, i)
	}

	return nil
}

func (s *Saga[T]) rollback(ctx context.Context, msg T, executedSteps []int) error {
	var errs error
	for i := len(executedSteps) - 1; i >= 0; i-- {
		step := s.steps[executedSteps[i]]
		if step.Compensate != nil {
			if err := step.Compensate(ctx, msg); err != nil {
				errs = errors.Join(errs, errors.Wrap(err, errors.CategoryHandler, fmt.Sprintf("compensation failed at step %d (%s)", i, step.Name)).
					WithTextCode("SAGA_COMPENSATION_FAILED").
					WithMetadata(map[string]any{
						"step_index": i,
						"step_name":  step.Name,
					}))
			}
		}
	}
	return errs
}

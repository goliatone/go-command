package dispatcher

import (
	"context"
	"reflect"

	"github.com/goliatone/go-command"
)

func storePresentDynamicResult(ctx context.Context, outcome command.DispatchOutcome) error {
	if !outcome.ResultPresent {
		return nil
	}
	sink, ok := command.DynamicResultSinkFromContext(ctx)
	if !ok {
		return nil
	}
	return sink.StoreDynamic(outcome.Result)
}

func dynamicOutcomeResultAs[R any](outcome command.DispatchOutcome) (R, error) {
	var zero R
	if !outcome.ResultPresent {
		return zero, command.NewDynamicResultMissingError(nil)
	}
	if outcome.Result == nil {
		resultType := reflect.TypeFor[R]()
		if resultTypeCanBeNil(resultType) {
			return zero, nil
		}
		return zero, command.NewDynamicResultTypeMismatchError(nil, nil)
	}
	typed, ok := outcome.Result.(R)
	if !ok {
		return zero, command.NewDynamicResultTypeMismatchError(nil, outcome.Result)
	}
	return typed, nil
}

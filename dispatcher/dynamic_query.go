package dispatcher

import (
	"context"
	"fmt"

	"github.com/goliatone/go-command"
	"github.com/goliatone/go-command/router"
	"github.com/goliatone/go-errors"
)

func invokeDynamicQuery(mux *router.Mux, ctx context.Context, registration command.MessageRegistration, message any) (any, error) {
	if mux == nil {
		return nil, errors.New("query mux is not configured", errors.CategoryConflict).
			WithTextCode("QUERY_MUX_NOT_CONFIGURED")
	}
	handlers := mux.Get(registration.MessageType())
	if len(handlers) == 0 {
		return nil, errors.New("no query handler for message registration", errors.CategoryNotFound).
			WithTextCode("QUERY_HANDLER_LOOKUP_ERROR").
			WithMetadata(map[string]any{"registration_id": registration.ID(), "message_type": registration.MessageType()})
	}
	if len(handlers) > 1 {
		return nil, errors.New("multiple query handlers found, ambiguous query", errors.CategoryBadInput).
			WithTextCode("QUERY_HANDLER_LOOKUP_ERROR")
	}
	runnable, ok := handlers[0].Handler.(dynamicQueryRunnable)
	if !ok {
		return nil, errors.New("query handler does not support dynamic invocation", errors.CategoryHandler).
			WithTextCode("QUERY_HANDLER_LOOKUP_ERROR")
	}
	if err := ctx.Err(); err != nil {
		return nil, errors.Wrap(err, errors.CategoryExternal, "context canceled or deadline exceeded").
			WithTextCode("CONTEXT_ERROR")
	}
	result, err := runnable.runQuery(ctx, message)
	if err != nil {
		return nil, errors.Wrap(err, errors.CategoryHandler, fmt.Sprintf("query handler failed for type %s", registration.MessageType())).
			WithTextCode("QUERY_EXECUTION_FAILED").
			WithMetadata(map[string]any{
				"registration_id": registration.ID(),
				"message_type":    registration.MessageType(),
				"result_type":     fmt.Sprint(registration.ResultType()),
				"handler":         fmt.Sprintf("%T", runnable.handler()),
			})
	}
	return result, nil
}

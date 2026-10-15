package rpc

import "slices"

import "context"

// InvokeRequest carries method metadata and payload through middleware.
type InvokeRequest struct {
	Method   string
	Endpoint Endpoint
	Payload  any
}

// InvokeHandler executes one RPC invoke step in a middleware chain.
type InvokeHandler func(context.Context, InvokeRequest) (any, error)

// Middleware wraps invoke execution with cross-cutting behavior.
type Middleware func(next InvokeHandler) InvokeHandler

func applyMiddleware(middleware []Middleware, invoke func(context.Context, any) (any, error)) InvokeHandler {
	handler := func(ctx context.Context, req InvokeRequest) (any, error) {
		return invoke(ctx, req.Payload)
	}

	for _, current := range slices.Backward(middleware) {

		if current == nil {
			continue
		}
		handler = current(handler)
	}
	return handler
}

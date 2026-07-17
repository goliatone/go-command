package command

import "context"

type forcedLocalDispatchKey struct{}

// ContextWithForcedLocalDispatch marks a trusted ingress call so nested
// compatibility APIs execute locally instead of resolving placement again.
func ContextWithForcedLocalDispatch(ctx context.Context) context.Context {
	if ctx == nil {
		ctx = context.Background()
	}
	return context.WithValue(ctx, forcedLocalDispatchKey{}, true)
}

// ForcedLocalDispatchFromContext reports the transport-neutral ingress guard.
// Payload fields and dispatch metadata cannot create this marker.
func ForcedLocalDispatchFromContext(ctx context.Context) bool {
	if ctx == nil {
		return false
	}
	forced, _ := ctx.Value(forcedLocalDispatchKey{}).(bool)
	return forced
}

package command

import "time"

// RPCConfig declares optional transport level metadata for RPC exposure.
// The zero value is safe and keeps behavior minimally configured.
type RPCConfig struct {
	// Method is the RPC method name, e.g. "fsm.apply_event".
	Method string
	// Timeout is an optional transport timeout hint.
	Timeout time.Duration
	// Streaming declares whether this endpoint is stream oriented.
	Streaming bool
	// Idempotent declares whether retries are generally safe.
	Idempotent bool
	// Permissions required to invoke this method.
	Permissions []string
	// Roles allowed to invoke this method.
	Roles []string
}

// RPCCommand allows commands/queries to opt into RPC registration.
type RPCCommand interface {
	RPCHandler() any
	RPCOptions() RPCConfig
}

// NilRPCRegister is a noop RPC registration function.
func NilRPCRegister(opts RPCConfig, handler any, meta CommandMeta) error {
	return nil
}

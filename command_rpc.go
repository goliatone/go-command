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
	// Summary is a short endpoint description for docs/discovery.
	Summary string
	// Description is a longer endpoint description for docs/discovery.
	Description string
	// Tags groups endpoint in generated clients/docs.
	Tags []string
	// Deprecated marks endpoint for phased removal.
	Deprecated bool
	// Since captures the version this endpoint was introduced.
	Since string
}

// RPCCommand allows commands/queries to opt into RPC registration.
type RPCCommand interface {
	RPCHandler() any
	RPCOptions() RPCConfig
}

// RPCDescription carries optional endpoint documentation metadata.
type RPCDescription struct {
	Summary     string
	Description string
	Tags        []string
	Deprecated  bool
	Since       string
}

// RPCDescriber allows commands to expose richer endpoint metadata for docs/codegen.
// This is optional and only used by RPC resolver paths.
type RPCDescriber interface {
	RPCDescription() RPCDescription
}

// NilRPCRegister is a noop RPC registration function.
func NilRPCRegister(opts RPCConfig, handler any, meta CommandMeta) error {
	return nil
}

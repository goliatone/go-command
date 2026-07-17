package command

import (
	"context"
	"reflect"
)

// HandlerKind identifies which handler capability a registration represents.
// A concrete handler may expose both command and query registrations.
type HandlerKind string

const (
	HandlerKindCommand HandlerKind = "command"
	HandlerKindQuery   HandlerKind = "query"
)

// MessageRegistration is immutable metadata for one kind-qualified message.
// Implementations must return a fresh message from NewMessage.
type MessageRegistration interface {
	ID() string
	MessageType() string
	Kind() HandlerKind
	NewMessage() any
	RequestType() reflect.Type
	ResultType() reflect.Type
}

// RegistrationProvider exposes an immutable registration snapshot.
type RegistrationProvider interface {
	RegistrationByID(kind HandlerKind, stableID string) (MessageRegistration, bool)
	RegistrationByMessageType(kind HandlerKind, messageType string) (MessageRegistration, bool)
	Registrations() []MessageRegistration
}

// DispatchTarget identifies whether a registration executes in this process or
// through an installed remote dispatcher.
type DispatchTarget string

const (
	DispatchTargetLocal  DispatchTarget = "local"
	DispatchTargetRemote DispatchTarget = "remote"
)

// DispatchRoute is a logical placement decision. Name is adapter-owned and is
// intentionally not a broker destination or transport URL.
type DispatchRoute struct {
	Target DispatchTarget
	Name   string
}

// PlacementResolver selects a logical route for a registration. found=false
// selects the local default.
type PlacementResolver interface {
	ResolvePlacement(context.Context, MessageRegistration, DispatchOptions) (route DispatchRoute, found bool, err error)
}

// DispatchOutcome is the transport-neutral result of local or remote
// execution. ResultPresent distinguishes a valid zero/nil result from no
// result.
type DispatchOutcome struct {
	Receipt         DispatchReceipt
	Target          DispatchTarget
	Route           string
	Result          any
	ResultPresent   bool
	StatusReference string
}

// LocalInvoker executes an already-resolved registration in this process.
type LocalInvoker interface {
	InvokeLocal(context.Context, MessageRegistration, any, DispatchOptions) (DispatchOutcome, error)
}

// RemoteDispatcher is implemented by an optional transport adapter. The port
// deliberately excludes envelopes, acknowledgements, and broker concepts.
type RemoteDispatcher interface {
	DispatchRemote(context.Context, DispatchRoute, MessageRegistration, any, DispatchOptions) (DispatchOutcome, error)
}

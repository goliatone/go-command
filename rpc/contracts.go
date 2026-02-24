package rpc

import (
	"context"
	"fmt"
	"reflect"
	"time"
)

// RequestMeta carries method-agnostic execution metadata.
type RequestMeta struct {
	ActorID       string              `json:"actorId,omitempty"`
	Roles         []string            `json:"roles,omitempty"`
	Tenant        string              `json:"tenant,omitempty"`
	RequestID     string              `json:"requestId,omitempty"`
	CorrelationID string              `json:"correlationId,omitempty"`
	Permissions   []string            `json:"permissions,omitempty"`
	Scope         map[string]any      `json:"scope,omitempty"`
	Headers       map[string]string   `json:"headers,omitempty"`
	Params        map[string]string   `json:"params,omitempty"`
	Query         map[string][]string `json:"query,omitempty"`
}

// RequestEnvelope is the canonical method request shape for transport adapters.
type RequestEnvelope[T any] struct {
	Data T           `json:"data"`
	Meta RequestMeta `json:"meta,omitempty"`
}

// Error is a transport-friendly error envelope.
type Error struct {
	Code      string         `json:"code"`
	Message   string         `json:"message"`
	Category  string         `json:"category,omitempty"`
	Retryable bool           `json:"retryable,omitempty"`
	Details   map[string]any `json:"details,omitempty"`
}

// ResponseEnvelope is the canonical method response shape for transport adapters.
type ResponseEnvelope[T any] struct {
	Data  T      `json:"data,omitempty"`
	Error *Error `json:"error,omitempty"`
}

// MethodKind describes endpoint invocation shape.
type MethodKind string

const (
	MethodKindCommand MethodKind = HandlerKindExecute
	MethodKindQuery   MethodKind = HandlerKindQuery
)

// EndpointSpec declares endpoint metadata independent from handler implementation details.
type EndpointSpec struct {
	Method      string
	MessageType string
	Kind        MethodKind
	Timeout     time.Duration
	Streaming   bool
	Idempotent  bool
	Permissions []string
	Roles       []string
	Summary     string
	Description string
	Tags        []string
	Deprecated  bool
	Since       string
}

// EndpointDefinition is the explicit endpoint contract registered in the RPC server.
type EndpointDefinition interface {
	Spec() EndpointSpec
	NewRequest() any
	RequestType() reflect.Type
	ResponseType() reflect.Type
	Invoke(context.Context, any) (any, error)
}

// EndpointsProvider can expose one or more endpoint definitions for resolver registration.
type EndpointsProvider interface {
	RPCEndpoints() []EndpointDefinition
}

type endpointDefinition struct {
	spec    EndpointSpec
	reqType reflect.Type
	resType reflect.Type
	invoke  func(context.Context, any) (any, error)
}

func (d *endpointDefinition) Spec() EndpointSpec {
	if d == nil {
		return EndpointSpec{}
	}
	spec := d.spec
	spec.Permissions = cloneStrings(spec.Permissions)
	spec.Roles = cloneStrings(spec.Roles)
	spec.Tags = cloneStrings(spec.Tags)
	return spec
}

func (d *endpointDefinition) NewRequest() any {
	if d == nil || d.reqType == nil {
		return nil
	}
	if d.reqType.Kind() == reflect.Ptr {
		return reflect.New(d.reqType.Elem()).Interface()
	}
	return reflect.New(d.reqType).Interface()
}

func (d *endpointDefinition) RequestType() reflect.Type {
	if d == nil {
		return nil
	}
	return d.reqType
}

func (d *endpointDefinition) ResponseType() reflect.Type {
	if d == nil {
		return nil
	}
	return d.resType
}

func (d *endpointDefinition) Invoke(ctx context.Context, req any) (any, error) {
	if d == nil || d.invoke == nil {
		return nil, fmt.Errorf("rpc endpoint invoke function not configured")
	}
	return d.invoke(ctx, req)
}

// NewEndpoint builds an explicit typed endpoint definition.
func NewEndpoint[Req any, Res any](
	spec EndpointSpec,
	handler func(context.Context, RequestEnvelope[Req]) (ResponseEnvelope[Res], error),
) EndpointDefinition {
	reqEnvelopeType := reflect.TypeFor[RequestEnvelope[Req]]()
	reqPtrType := reflect.PointerTo(reqEnvelopeType)
	resEnvelopeType := reflect.TypeFor[ResponseEnvelope[Res]]()

	return &endpointDefinition{
		spec:    spec,
		reqType: reqPtrType,
		resType: resEnvelopeType,
		invoke: func(ctx context.Context, payload any) (any, error) {
			reqValue, err := payloadValue(reqPtrType, payload)
			if err != nil {
				return nil, err
			}
			typedReq, ok := reqValue.Interface().(*RequestEnvelope[Req])
			if !ok || typedReq == nil {
				return nil, fmt.Errorf("invalid request payload for method %q", spec.Method)
			}
			return handler(ctx, *typedReq)
		},
	}
}

package rpc

import (
	"context"
	"errors"
	"testing"
	"time"

	"github.com/goliatone/go-command"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

type explicitRequest struct {
	Name string `json:"name"`
}

type explicitProvider struct{}

func (p *explicitProvider) RPCEndpoints() []EndpointDefinition {
	return []EndpointDefinition{
		NewEndpoint[explicitRequest, string](
			EndpointSpec{
				Method:      "explicit.echo",
				Kind:        MethodKindQuery,
				Summary:     "Echo",
				Description: "Echoes the request name",
				Tags:        []string{"explicit"},
				Idempotent:  true,
			},
			func(_ context.Context, req RequestEnvelope[explicitRequest]) (ResponseEnvelope[string], error) {
				return ResponseEnvelope[string]{
					Data: "echo:" + req.Data.Name,
				}, nil
			},
		),
	}
}

func newApplyEventEndpoint() EndpointDefinition {
	return NewEndpoint[explicitRequest, string](
		EndpointSpec{
			Method:      "fsm.apply_event",
			Kind:        MethodKindCommand,
			Timeout:     time.Second,
			Idempotent:  true,
			Permissions: []string{"fsm:write"},
			Roles:       []string{"admin"},
			Summary:     "Apply event",
			Description: "Apply FSM event to entity",
			Tags:        []string{"fsm", "write"},
			Since:       "v2.0.0",
		},
		func(_ context.Context, req RequestEnvelope[explicitRequest]) (ResponseEnvelope[string], error) {
			return ResponseEnvelope[string]{Data: "applied:" + req.Data.Name}, nil
		},
	)
}

func TestServerRegisterEndpointAndInvoke(t *testing.T) {
	s := NewServer()

	err := s.RegisterEndpoint(newApplyEventEndpoint())
	require.NoError(t, err)

	out, err := s.Invoke(context.Background(), "fsm.apply_event", RequestEnvelope[explicitRequest]{
		Data: explicitRequest{Name: "alice"},
	})
	require.NoError(t, err)
	res, ok := out.(ResponseEnvelope[string])
	require.True(t, ok)
	assert.Equal(t, "applied:alice", res.Data)

	endpoint, ok := s.Endpoint("fsm.apply_event")
	require.True(t, ok)
	assert.Equal(t, "fsm.apply_event", endpoint.Method)
	assert.Equal(t, HandlerKindExecute, endpoint.HandlerKind)
	require.NotNil(t, endpoint.RequestType)
	assert.Contains(t, endpoint.RequestType.GoType, "RequestEnvelope")
	require.NotNil(t, endpoint.ResponseType)
	assert.Contains(t, endpoint.ResponseType.GoType, "ResponseEnvelope")
	assert.Equal(t, time.Second, endpoint.Timeout)
	assert.True(t, endpoint.Idempotent)
	assert.Equal(t, []string{"fsm:write"}, endpoint.Permissions)
	assert.Equal(t, []string{"admin"}, endpoint.Roles)
	assert.Equal(t, "Apply event", endpoint.Summary)
	assert.Equal(t, "Apply FSM event to entity", endpoint.Description)
	assert.Equal(t, []string{"fsm", "write"}, endpoint.Tags)
	assert.Equal(t, "v2.0.0", endpoint.Since)
}

func TestServerRegisterEndpointsBatch(t *testing.T) {
	s := NewServer()
	provider := &explicitProvider{}

	err := s.RegisterEndpoints(provider.RPCEndpoints()...)
	require.NoError(t, err)

	out, err := s.Invoke(context.Background(), "explicit.echo", RequestEnvelope[explicitRequest]{
		Data: explicitRequest{Name: "world"},
	})
	require.NoError(t, err)
	res, ok := out.(ResponseEnvelope[string])
	require.True(t, ok)
	assert.Equal(t, "echo:world", res.Data)
}

func TestServerInvokeErrors(t *testing.T) {
	s := NewServer()

	_, err := s.Invoke(context.Background(), "", nil)
	require.Error(t, err)

	_, err = s.Invoke(context.Background(), "missing.method", nil)
	require.Error(t, err)
	assert.Contains(t, err.Error(), "not found")
}

func TestServerRegisterValidation(t *testing.T) {
	s := NewServer()

	err := s.RegisterEndpoint(nil)
	require.Error(t, err)
	assert.Contains(t, err.Error(), "endpoint definition required")

	err = s.RegisterEndpoint(NewEndpoint[explicitRequest, string](
		EndpointSpec{},
		func(_ context.Context, _ RequestEnvelope[explicitRequest]) (ResponseEnvelope[string], error) {
			return ResponseEnvelope[string]{}, nil
		},
	))
	require.Error(t, err)
	assert.Contains(t, err.Error(), "rpc method required")
}

func TestServerRegisterDuplicateMethod(t *testing.T) {
	s := NewServer()
	require.NoError(t, s.RegisterEndpoint(newApplyEventEndpoint()))

	err := s.RegisterEndpoint(newApplyEventEndpoint())
	require.Error(t, err)
	assert.Contains(t, err.Error(), "already registered")
}

func TestServerPayloadTypeMismatch(t *testing.T) {
	s := NewServer()
	require.NoError(t, s.RegisterEndpoint(newApplyEventEndpoint()))

	_, err := s.Invoke(context.Background(), "fsm.apply_event", "wrong-type")
	require.Error(t, err)
	assert.Contains(t, err.Error(), "invalid payload type")
}

func TestServerNewRequestForMethod(t *testing.T) {
	s := NewServer()
	require.NoError(t, s.RegisterEndpoint(newApplyEventEndpoint()))

	msg, err := s.NewRequestForMethod("fsm.apply_event")
	require.NoError(t, err)
	_, ok := msg.(*RequestEnvelope[explicitRequest])
	assert.True(t, ok)
}

func TestServerEndpointsSorted(t *testing.T) {
	s := NewServer()

	require.NoError(t, s.RegisterEndpoint(NewEndpoint[explicitRequest, string](
		EndpointSpec{Method: "zeta", Kind: MethodKindQuery},
		func(_ context.Context, req RequestEnvelope[explicitRequest]) (ResponseEnvelope[string], error) {
			return ResponseEnvelope[string]{Data: req.Data.Name}, nil
		},
	)))
	require.NoError(t, s.RegisterEndpoint(NewEndpoint[explicitRequest, string](
		EndpointSpec{Method: "alpha", Kind: MethodKindQuery},
		func(_ context.Context, req RequestEnvelope[explicitRequest]) (ResponseEnvelope[string], error) {
			return ResponseEnvelope[string]{Data: req.Data.Name}, nil
		},
	)))

	endpoints := s.Endpoints()
	require.Len(t, endpoints, 2)
	assert.Equal(t, "alpha", endpoints[0].Method)
	assert.Equal(t, "zeta", endpoints[1].Method)
}

func TestEndpointReturnsDefensiveCopy(t *testing.T) {
	s := NewServer()
	require.NoError(t, s.RegisterEndpoint(NewEndpoint[explicitRequest, string](
		EndpointSpec{
			Method:      "copy.single",
			Kind:        MethodKindQuery,
			Permissions: []string{"fsm:write"},
			Roles:       []string{"admin"},
			Tags:        []string{"fsm"},
		},
		func(_ context.Context, req RequestEnvelope[explicitRequest]) (ResponseEnvelope[string], error) {
			return ResponseEnvelope[string]{Data: req.Data.Name}, nil
		},
	)))

	endpoint, ok := s.Endpoint("copy.single")
	require.True(t, ok)
	endpoint.Permissions[0] = "mutated"
	endpoint.Roles[0] = "guest"
	endpoint.Tags[0] = "mutated"
	if endpoint.RequestType != nil {
		endpoint.RequestType.Name = "changed"
	}

	current, ok := s.Endpoint("copy.single")
	require.True(t, ok)
	assert.Equal(t, []string{"fsm:write"}, current.Permissions)
	assert.Equal(t, []string{"admin"}, current.Roles)
	assert.Equal(t, []string{"fsm"}, current.Tags)
	require.NotNil(t, current.RequestType)
	assert.NotEqual(t, "changed", current.RequestType.Name)
}

func TestEndpointsReturnsDefensiveCopies(t *testing.T) {
	s := NewServer()
	require.NoError(t, s.RegisterEndpoint(NewEndpoint[explicitRequest, string](
		EndpointSpec{
			Method:      "copy.list",
			Kind:        MethodKindQuery,
			Permissions: []string{"fsm:write"},
			Roles:       []string{"admin"},
			Tags:        []string{"fsm"},
		},
		func(_ context.Context, req RequestEnvelope[explicitRequest]) (ResponseEnvelope[string], error) {
			return ResponseEnvelope[string]{Data: req.Data.Name}, nil
		},
	)))

	endpoints := s.Endpoints()
	require.Len(t, endpoints, 1)
	endpoints[0].Permissions[0] = "mutated"
	endpoints[0].Roles[0] = "guest"
	endpoints[0].Tags[0] = "mutated"
	if endpoints[0].RequestType != nil {
		endpoints[0].RequestType.Name = "changed"
	}

	current, ok := s.Endpoint("copy.list")
	require.True(t, ok)
	assert.Equal(t, []string{"fsm:write"}, current.Permissions)
	assert.Equal(t, []string{"admin"}, current.Roles)
	assert.Equal(t, []string{"fsm"}, current.Tags)
	require.NotNil(t, current.RequestType)
	assert.NotEqual(t, "changed", current.RequestType.Name)
}

func TestEndpointMetaAliases(t *testing.T) {
	s := NewServer()
	require.NoError(t, s.RegisterEndpoint(NewEndpoint[explicitRequest, string](
		EndpointSpec{Method: "meta.alias", Kind: MethodKindQuery},
		func(_ context.Context, req RequestEnvelope[explicitRequest]) (ResponseEnvelope[string], error) {
			return ResponseEnvelope[string]{Data: req.Data.Name}, nil
		},
	)))

	ep1, ok1 := s.Endpoint("meta.alias")
	ep2, ok2 := s.EndpointMeta("meta.alias")
	require.True(t, ok1)
	require.True(t, ok2)
	assert.Equal(t, ep1, ep2)

	all1 := s.Endpoints()
	all2 := s.EndpointsMeta()
	assert.Equal(t, all1, all2)
}

func TestResolver(t *testing.T) {
	s := NewServer()
	resolver := Resolver(s)
	provider := &explicitProvider{}

	err := resolver(provider, command.CommandMeta{}, nil)
	require.NoError(t, err)

	out, invokeErr := s.Invoke(context.Background(), "explicit.echo", RequestEnvelope[explicitRequest]{
		Data: explicitRequest{Name: "bob"},
	})
	require.NoError(t, invokeErr)
	res, ok := out.(ResponseEnvelope[string])
	require.True(t, ok)
	assert.Equal(t, "echo:bob", res.Data)
}

func TestResolverIgnoresNonProvider(t *testing.T) {
	s := NewServer()
	resolver := Resolver(s)

	err := resolver(struct{}{}, command.CommandMeta{}, nil)
	require.NoError(t, err)
	assert.Empty(t, s.Endpoints())
}

func TestResolverMissingServer(t *testing.T) {
	resolver := Resolver(nil)
	provider := &explicitProvider{}

	err := resolver(provider, command.CommandMeta{}, nil)
	require.Error(t, err)
	assert.Contains(t, err.Error(), "rpc server not configured")
}

func TestEndpointErrorsBubbleUp(t *testing.T) {
	t.Run("handler error", func(t *testing.T) {
		s := NewServer()
		require.NoError(t, s.RegisterEndpoint(NewEndpoint[explicitRequest, string](
			EndpointSpec{Method: "explicit.error", Kind: MethodKindQuery},
			func(_ context.Context, _ RequestEnvelope[explicitRequest]) (ResponseEnvelope[string], error) {
				return ResponseEnvelope[string]{}, errors.New("boom")
			},
		)))

		_, err := s.Invoke(context.Background(), "explicit.error", RequestEnvelope[explicitRequest]{})
		require.Error(t, err)
		assert.Contains(t, err.Error(), "boom")
	})
}

func TestServerFailureModeRecoverConvertsPanicToError(t *testing.T) {
	s := NewServer(WithFailureMode(FailureModeRecover))
	require.NoError(t, s.RegisterEndpoint(NewEndpoint[explicitRequest, string](
		EndpointSpec{Method: "panic.recover", Kind: MethodKindQuery},
		func(_ context.Context, _ RequestEnvelope[explicitRequest]) (ResponseEnvelope[string], error) {
			panic("boom")
		},
	)))

	out, err := s.Invoke(context.Background(), "panic.recover", RequestEnvelope[explicitRequest]{})
	require.Error(t, err)
	assert.Nil(t, out)
	assert.Contains(t, err.Error(), "panic")
}

func TestServerFailureModeLogAndContinueSkipsInvalidRegistration(t *testing.T) {
	var events []FailureEvent
	s := NewServer(
		WithFailureMode(FailureModeLogAndContinue),
		WithFailureLogger(func(event FailureEvent) {
			events = append(events, event)
		}),
	)

	err := s.RegisterEndpoint(NewEndpoint[explicitRequest, string](
		EndpointSpec{},
		func(_ context.Context, _ RequestEnvelope[explicitRequest]) (ResponseEnvelope[string], error) {
			return ResponseEnvelope[string]{}, nil
		},
	))
	require.NoError(t, err)

	_, ok := s.Endpoint("")
	assert.False(t, ok)
	require.Len(t, events, 1)
	assert.Equal(t, FailureStageRegister, events[0].Stage)
	assert.Equal(t, "", events[0].Method)
	assert.Error(t, events[0].Err)
}

func TestServerFailureModeLogAndContinueSuppressesDuplicateRegistration(t *testing.T) {
	var events []FailureEvent
	s := NewServer(
		WithFailureMode(FailureModeLogAndContinue),
		WithFailureLogger(func(event FailureEvent) {
			events = append(events, event)
		}),
	)

	require.NoError(t, s.RegisterEndpoint(newApplyEventEndpoint()))
	err := s.RegisterEndpoint(newApplyEventEndpoint())
	require.NoError(t, err)

	require.Len(t, events, 1)
	assert.Equal(t, FailureStageRegister, events[0].Stage)
	assert.Equal(t, "fsm.apply_event", events[0].Method)
	assert.Error(t, events[0].Err)
}

func TestServerFailureModeLogAndContinueReturnsInvokePanicError(t *testing.T) {
	var events []FailureEvent
	s := NewServer(
		WithFailureMode(FailureModeLogAndContinue),
		WithFailureLogger(func(event FailureEvent) {
			events = append(events, event)
		}),
	)
	require.NoError(t, s.RegisterEndpoint(NewEndpoint[explicitRequest, string](
		EndpointSpec{Method: "panic.log", Kind: MethodKindQuery},
		func(_ context.Context, _ RequestEnvelope[explicitRequest]) (ResponseEnvelope[string], error) {
			panic("boom")
		},
	)))

	out, err := s.Invoke(context.Background(), "panic.log", RequestEnvelope[explicitRequest]{})
	require.Error(t, err)
	assert.Nil(t, out)
	assert.Contains(t, err.Error(), "panic")
	require.Len(t, events, 1)
	assert.Equal(t, FailureStageInvoke, events[0].Stage)
	assert.Equal(t, "panic.log", events[0].Method)
	assert.Error(t, events[0].Err)
	assert.Equal(t, "boom", events[0].Panic)
}

func TestServerMiddlewareOrderAndPayloadMutation(t *testing.T) {
	order := make([]string, 0, 4)
	var captured InvokeRequest

	s := NewServer(
		WithMiddleware(
			func(next InvokeHandler) InvokeHandler {
				return func(ctx context.Context, req InvokeRequest) (any, error) {
					order = append(order, "mw1.before")
					captured = req
					out, err := next(ctx, req)
					order = append(order, "mw1.after")
					return out, err
				}
			},
			func(next InvokeHandler) InvokeHandler {
				return func(ctx context.Context, req InvokeRequest) (any, error) {
					order = append(order, "mw2.before")
					req.Payload = RequestEnvelope[explicitRequest]{
						Data: explicitRequest{Name: "middleware"},
					}
					out, err := next(ctx, req)
					order = append(order, "mw2.after")
					return out, err
				}
			},
		),
	)
	require.NoError(t, s.RegisterEndpoint(newApplyEventEndpoint()))

	out, err := s.Invoke(context.Background(), "fsm.apply_event", RequestEnvelope[explicitRequest]{
		Data: explicitRequest{Name: "alice"},
	})
	require.NoError(t, err)
	res, ok := out.(ResponseEnvelope[string])
	require.True(t, ok)
	assert.Equal(t, "applied:middleware", res.Data)
	assert.Equal(t, []string{"mw1.before", "mw2.before", "mw2.after", "mw1.after"}, order)

	assert.Equal(t, "fsm.apply_event", captured.Method)
	assert.Equal(t, "fsm.apply_event", captured.Endpoint.Method)
	assert.Equal(t, []string{"fsm:write"}, captured.Endpoint.Permissions)
	assert.Equal(t, []string{"admin"}, captured.Endpoint.Roles)
}

func TestServerMiddlewareCanShortCircuitInvoke(t *testing.T) {
	invoked := false
	s := NewServer(
		WithMiddleware(func(next InvokeHandler) InvokeHandler {
			return func(ctx context.Context, req InvokeRequest) (any, error) {
				if req.Method == "guarded.method" {
					return nil, errors.New("forbidden")
				}
				return next(ctx, req)
			}
		}),
	)

	require.NoError(t, s.RegisterEndpoint(NewEndpoint[explicitRequest, string](
		EndpointSpec{
			Method: "guarded.method",
			Kind:   MethodKindQuery,
		},
		func(_ context.Context, req RequestEnvelope[explicitRequest]) (ResponseEnvelope[string], error) {
			invoked = true
			return ResponseEnvelope[string]{Data: req.Data.Name}, nil
		},
	)))

	out, err := s.Invoke(context.Background(), "guarded.method", RequestEnvelope[explicitRequest]{
		Data: explicitRequest{Name: "blocked"},
	})
	require.Error(t, err)
	assert.Nil(t, out)
	assert.Contains(t, err.Error(), "forbidden")
	assert.False(t, invoked)
}

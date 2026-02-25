package rpc

import (
	"context"
	"fmt"
	"reflect"
	"slices"
	"sort"
	"sync"
	"time"

	"github.com/goliatone/go-command"
)

// Endpoint describes a registered RPC method.
type Endpoint struct {
	Method       string        `json:"method"`
	MessageType  string        `json:"messageType"`
	HandlerKind  string        `json:"handlerKind"`
	RequestType  *TypeRef      `json:"requestType,omitempty"`
	ResponseType *TypeRef      `json:"responseType,omitempty"`
	Timeout      time.Duration `json:"timeout"`
	Streaming    bool          `json:"streaming"`
	Idempotent   bool          `json:"idempotent"`
	Permissions  []string      `json:"permissions,omitempty"`
	Roles        []string      `json:"roles,omitempty"`
	Summary      string        `json:"summary,omitempty"`
	Description  string        `json:"description,omitempty"`
	Tags         []string      `json:"tags,omitempty"`
	Deprecated   bool          `json:"deprecated,omitempty"`
	Since        string        `json:"since,omitempty"`
}

type endpointEntry struct {
	endpoint Endpoint
	msgType  reflect.Type
	resType  reflect.Type
	newReq   func() any
	invoke   func(context.Context, any) (any, error)
}

// TypeRef describes a Go type in endpoint metadata for codegen/doc discovery.
type TypeRef struct {
	GoType  string `json:"goType"`
	PkgPath string `json:"pkgPath,omitempty"`
	Name    string `json:"name,omitempty"`
	Kind    string `json:"kind,omitempty"`
	Pointer bool   `json:"pointer,omitempty"`
}

const (
	HandlerKindExecute = "execute"
	HandlerKindQuery   = "query"
)

// FailureStage identifies where a failure happened.
type FailureStage string

const (
	FailureStageRegister FailureStage = "register"
	FailureStageInvoke   FailureStage = "invoke"
)

// FailureMode controls how the server reacts to registration/invocation failures.
type FailureMode int

const (
	// FailureModeReject returns registration errors and re-panics invoke panics.
	FailureModeReject FailureMode = iota
	// FailureModeRecover returns registration errors and converts invoke panics to errors.
	FailureModeRecover
	// FailureModeLogAndContinue suppresses failures after logging them.
	// For register, the endpoint is skipped. For invoke panic, call returns an error.
	FailureModeLogAndContinue
)

// FailureEvent carries context for strategy/logging decisions.
type FailureEvent struct {
	Stage  FailureStage
	Method string
	Err    error
	Panic  any
}

// FailureStrategy decides how to handle a failure event.
type FailureStrategy func(FailureEvent) FailureMode

// FailureLogger receives failure events when configured.
type FailureLogger func(FailureEvent)

// Option customizes server behavior.
type Option func(*Server)

// WithFailureStrategy sets a custom failure strategy function.
func WithFailureStrategy(strategy FailureStrategy) Option {
	return func(s *Server) {
		if strategy != nil {
			s.failureStrategy = strategy
		}
	}
}

// WithFailureMode sets a fixed strategy mode.
func WithFailureMode(mode FailureMode) Option {
	return WithFailureStrategy(func(FailureEvent) FailureMode {
		return mode
	})
}

// WithFailureLogger sets an optional callback for failure events.
func WithFailureLogger(logger FailureLogger) Option {
	return func(s *Server) {
		s.failureLogger = logger
	}
}

// WithMiddleware appends invoke middleware in registration order.
func WithMiddleware(mw ...Middleware) Option {
	return func(s *Server) {
		if s == nil {
			return
		}
		for _, m := range mw {
			if m != nil {
				s.middleware = append(s.middleware, m)
			}
		}
	}
}

// Server provides a lightweight in memory RPC method registry and invoker.
// Transport adapters can use this server to register and invoke command/query handlers.
type Server struct {
	mu              sync.RWMutex
	endpoints       map[string]endpointEntry
	middleware      []Middleware
	failureStrategy FailureStrategy
	failureLogger   FailureLogger
}

// Resolver returns a command.Resolver that registers endpoint providers into this server.
func Resolver(server *Server) command.Resolver {
	return func(cmd any, _ command.CommandMeta, _ *command.Registry) error {
		if server == nil {
			return fmt.Errorf("rpc server not configured")
		}
		if provider, ok := cmd.(EndpointsProvider); ok {
			return server.RegisterEndpoints(provider.RPCEndpoints()...)
		}
		return nil
	}
}

// NewServer creates an empty RPC server registry.
func NewServer(opts ...Option) *Server {
	server := &Server{
		endpoints: make(map[string]endpointEntry),
		failureStrategy: func(FailureEvent) FailureMode {
			return FailureModeReject
		},
	}
	for _, opt := range opts {
		if opt != nil {
			opt(server)
		}
	}
	return server
}

// RegisterEndpoint stores an explicit endpoint definition.
func (s *Server) RegisterEndpoint(def EndpointDefinition) error {
	if s == nil {
		return fmt.Errorf("rpc server not configured")
	}
	if def == nil {
		return s.handleRegisterFailure("", fmt.Errorf("rpc endpoint definition required"))
	}

	spec := def.Spec()
	if spec.Method == "" {
		return s.handleRegisterFailure(spec.Method, fmt.Errorf("rpc method required"))
	}

	reqType := def.RequestType()
	resType := def.ResponseType()
	handlerKind := string(spec.Kind)
	if handlerKind == "" {
		handlerKind = HandlerKindQuery
	}

	msgName := spec.MessageType
	if msgName == "" {
		msgName = messageTypeName(reqType)
	}

	entry := endpointEntry{
		endpoint: Endpoint{
			Method:       spec.Method,
			MessageType:  msgName,
			HandlerKind:  handlerKind,
			RequestType:  typeRef(reqType),
			ResponseType: typeRef(resType),
			Timeout:      spec.Timeout,
			Streaming:    spec.Streaming,
			Idempotent:   spec.Idempotent,
			Permissions:  cloneStrings(spec.Permissions),
			Roles:        cloneStrings(spec.Roles),
			Summary:      spec.Summary,
			Description:  spec.Description,
			Tags:         cloneStrings(spec.Tags),
			Deprecated:   spec.Deprecated,
			Since:        spec.Since,
		},
		msgType: reqType,
		resType: resType,
		newReq: func() any {
			return def.NewRequest()
		},
		invoke: def.Invoke,
	}

	if err := s.registerEndpointEntry(spec.Method, entry); err != nil {
		return s.handleRegisterFailure(spec.Method, err)
	}
	return nil
}

// RegisterEndpoints stores explicit endpoint definitions in registration order.
func (s *Server) RegisterEndpoints(defs ...EndpointDefinition) error {
	for _, def := range defs {
		if err := s.RegisterEndpoint(def); err != nil {
			return err
		}
	}
	return nil
}

// Invoke executes a registered RPC method using the provided payload.
// payload should already be transport-decoded into the expected message type.
func (s *Server) Invoke(ctx context.Context, method string, payload any) (any, error) {
	if s == nil {
		return nil, fmt.Errorf("rpc server not configured")
	}
	if method == "" {
		return nil, fmt.Errorf("rpc method required")
	}
	if ctx == nil {
		ctx = context.Background()
	}

	s.mu.RLock()
	entry, ok := s.endpoints[method]
	middleware := cloneMiddleware(s.middleware)
	s.mu.RUnlock()
	if !ok {
		return nil, fmt.Errorf("rpc method %q not found", method)
	}

	var (
		out    any
		err    error
		panErr error
	)
	func() {
		defer func() {
			if p := recover(); p != nil {
				panErr = fmt.Errorf("rpc invoke panic for method %q: %v", method, p)
				event := FailureEvent{
					Stage:  FailureStageInvoke,
					Method: method,
					Err:    panErr,
					Panic:  p,
				}
				mode := s.failureMode(event)
				switch mode {
				case FailureModeLogAndContinue:
					s.logFailure(event)
					out = nil
					err = panErr
				case FailureModeRecover:
					s.logFailure(event)
					out = nil
					err = panErr
				default:
					panic(p)
				}
			}
		}()
		req := InvokeRequest{
			Method:   method,
			Endpoint: cloneEndpoint(entry.endpoint),
			Payload:  payload,
		}
		out, err = applyMiddleware(middleware, entry.invoke)(ctx, req)
	}()
	if panErr != nil {
		return out, err
	}
	return out, err
}

// Endpoint returns endpoint metadata for the method.
func (s *Server) Endpoint(method string) (Endpoint, bool) {
	if s == nil {
		return Endpoint{}, false
	}
	s.mu.RLock()
	defer s.mu.RUnlock()
	entry, ok := s.endpoints[method]
	if !ok {
		return Endpoint{}, false
	}
	return cloneEndpoint(entry.endpoint), true
}

// EndpointMeta returns enriched endpoint metadata for the method.
func (s *Server) EndpointMeta(method string) (Endpoint, bool) {
	return s.Endpoint(method)
}

// Endpoints returns all endpoint metadata sorted by method.
func (s *Server) Endpoints() []Endpoint {
	if s == nil {
		return nil
	}
	s.mu.RLock()
	defer s.mu.RUnlock()
	out := make([]Endpoint, 0, len(s.endpoints))
	for _, entry := range s.endpoints {
		out = append(out, cloneEndpoint(entry.endpoint))
	}
	sort.Slice(out, func(i, j int) bool {
		return out[i].Method < out[j].Method
	})
	return out
}

// EndpointsMeta returns enriched metadata for all endpoints sorted by method.
func (s *Server) EndpointsMeta() []Endpoint {
	return s.Endpoints()
}

// NewMessageForMethod creates a zero-value message instance for transport decoding.
func (s *Server) NewMessageForMethod(method string) (any, error) {
	if s == nil {
		return nil, fmt.Errorf("rpc server not configured")
	}
	if method == "" {
		return nil, fmt.Errorf("rpc method required")
	}

	s.mu.RLock()
	entry, ok := s.endpoints[method]
	s.mu.RUnlock()
	if !ok {
		return nil, fmt.Errorf("rpc method %q not found", method)
	}
	if entry.newReq != nil {
		return entry.newReq(), nil
	}
	return messageValue(entry.msgType), nil
}

// NewRequestForMethod creates a zero-value request envelope instance for transport decoding.
func (s *Server) NewRequestForMethod(method string) (any, error) {
	return s.NewMessageForMethod(method)
}

func payloadValue(msgType reflect.Type, payload any) (reflect.Value, error) {
	if msgType == nil {
		return reflect.Value{}, fmt.Errorf("rpc message type not configured")
	}
	if payload == nil {
		return reflect.Zero(msgType), nil
	}

	value := reflect.ValueOf(payload)
	if value.Type().AssignableTo(msgType) {
		return value, nil
	}
	if value.Type().ConvertibleTo(msgType) {
		return value.Convert(msgType), nil
	}

	// Common convenience conversion: value -> pointer target.
	if msgType.Kind() == reflect.Ptr && value.Type().AssignableTo(msgType.Elem()) {
		ptr := reflect.New(msgType.Elem())
		ptr.Elem().Set(value)
		return ptr, nil
	}

	return reflect.Value{}, fmt.Errorf("invalid payload type: expected %s got %s", msgType.String(), value.Type().String())
}

func messageValue(msgType reflect.Type) any {
	if msgType == nil {
		return nil
	}
	if msgType.Kind() == reflect.Ptr {
		return reflect.New(msgType.Elem()).Interface()
	}
	return reflect.New(msgType).Elem().Interface()
}

func messageTypeName(msgType reflect.Type) string {
	if msgType == nil {
		return ""
	}
	return command.GetMessageType(messageValue(msgType))
}

func typeRef(t reflect.Type) *TypeRef {
	if t == nil {
		return nil
	}
	base := t
	pointer := false
	if base.Kind() == reflect.Ptr {
		base = base.Elem()
		pointer = true
	}
	return &TypeRef{
		GoType:  t.String(),
		PkgPath: base.PkgPath(),
		Name:    base.Name(),
		Kind:    t.Kind().String(),
		Pointer: pointer,
	}
}

func cloneStrings(values []string) []string {
	if len(values) == 0 {
		return nil
	}
	return slices.Clone(values)
}

func cloneMiddleware(values []Middleware) []Middleware {
	if len(values) == 0 {
		return nil
	}
	return slices.Clone(values)
}

func cloneEndpoint(endpoint Endpoint) Endpoint {
	endpoint.Permissions = cloneStrings(endpoint.Permissions)
	endpoint.Roles = cloneStrings(endpoint.Roles)
	endpoint.Tags = cloneStrings(endpoint.Tags)
	endpoint.RequestType = cloneTypeRef(endpoint.RequestType)
	endpoint.ResponseType = cloneTypeRef(endpoint.ResponseType)
	return endpoint
}

func cloneTypeRef(ref *TypeRef) *TypeRef {
	if ref == nil {
		return nil
	}
	copyRef := *ref
	return &copyRef
}

func (s *Server) handleRegisterFailure(method string, err error) error {
	event := FailureEvent{
		Stage:  FailureStageRegister,
		Method: method,
		Err:    err,
	}
	switch s.failureMode(event) {
	case FailureModeLogAndContinue:
		s.logFailure(event)
		return nil
	default:
		return err
	}
}

func (s *Server) failureMode(event FailureEvent) FailureMode {
	if s == nil || s.failureStrategy == nil {
		return FailureModeReject
	}
	return s.failureStrategy(event)
}

func (s *Server) logFailure(event FailureEvent) {
	if s == nil || s.failureLogger == nil {
		return
	}
	s.failureLogger(event)
}

func (s *Server) registerEndpointEntry(method string, entry endpointEntry) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	if _, exists := s.endpoints[method]; exists {
		return fmt.Errorf("rpc method %q already registered", method)
	}
	s.endpoints[method] = entry
	return nil
}

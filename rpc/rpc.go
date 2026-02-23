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
	Method      string
	MessageType string
	Timeout     time.Duration
	Streaming   bool
	Idempotent  bool
	Permissions []string
	Roles       []string
}

type endpointEntry struct {
	endpoint Endpoint
	msgType  reflect.Type
	invoke   func(context.Context, any) (any, error)
}

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

// Server provides a lightweight in memory RPC method registry and invoker.
// Transport adapters can use this server to register and invoke command/query handlers.
type Server struct {
	mu              sync.RWMutex
	endpoints       map[string]endpointEntry
	failureStrategy FailureStrategy
	failureLogger   FailureLogger
}

// Resolver returns a command.Resolver that registers commands implementing
// command.RPCCommand into this server.
func Resolver(server *Server) command.Resolver {
	return func(cmd any, meta command.CommandMeta, _ *command.Registry) error {
		if server == nil {
			return fmt.Errorf("rpc server not configured")
		}
		rpcCmd, ok := cmd.(command.RPCCommand)
		if !ok {
			return nil
		}
		return server.Register(rpcCmd.RPCOptions(), rpcCmd.RPCHandler(), meta)
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

// Register stores an RPC endpoint and binds it to an invoker generated from handler.
// The expected registration path is Registry.Initialize() + command.RPCCommand.
func (s *Server) Register(opts command.RPCConfig, handler any, meta command.CommandMeta) error {
	if s == nil {
		return fmt.Errorf("rpc server not configured")
	}
	if opts.Method == "" {
		return fmt.Errorf("rpc method required")
	}
	if handler == nil {
		return fmt.Errorf("rpc handler cannot be nil")
	}
	if isTypedNil(handler) {
		return fmt.Errorf("rpc handler cannot be nil")
	}

	msgType, invoker, err := buildInvoker(handler, meta)
	if err != nil {
		return s.handleRegisterFailure(opts.Method, err)
	}

	msgName := meta.MessageType
	if msgName == "" {
		msgName = messageTypeName(msgType)
	}

	entry := endpointEntry{
		endpoint: Endpoint{
			Method:      opts.Method,
			MessageType: msgName,
			Timeout:     opts.Timeout,
			Streaming:   opts.Streaming,
			Idempotent:  opts.Idempotent,
			Permissions: cloneStrings(opts.Permissions),
			Roles:       cloneStrings(opts.Roles),
		},
		msgType: msgType,
		invoke:  invoker,
	}

	s.mu.Lock()
	defer s.mu.Unlock()
	if _, exists := s.endpoints[opts.Method]; exists {
		return fmt.Errorf("rpc method %q already registered", opts.Method)
	}
	s.endpoints[opts.Method] = entry
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
		out, err = entry.invoke(ctx, payload)
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
	return messageValue(entry.msgType), nil
}

func buildInvoker(handler any, meta command.CommandMeta) (reflect.Type, func(context.Context, any) (any, error), error) {
	value := reflect.ValueOf(handler)
	if !value.IsValid() {
		return nil, nil, fmt.Errorf("invalid rpc handler")
	}

	if value.Kind() == reflect.Func {
		return buildFuncInvoker(value, meta)
	}

	if method := value.MethodByName("Query"); method.IsValid() {
		return buildMethodInvoker(method, meta, true)
	}
	if method := value.MethodByName("Execute"); method.IsValid() {
		return buildMethodInvoker(method, meta, false)
	}

	return nil, nil, fmt.Errorf("rpc handler must expose Query or Execute")
}

func buildMethodInvoker(method reflect.Value, meta command.CommandMeta, query bool) (reflect.Type, func(context.Context, any) (any, error), error) {
	mt := method.Type()
	if mt.NumIn() != 2 {
		if query {
			return nil, nil, fmt.Errorf("Query signature must be Query(ctx, msg)")
		}
		return nil, nil, fmt.Errorf("Execute signature must be Execute(ctx, msg)")
	}

	ctxType := reflect.TypeOf((*context.Context)(nil)).Elem()
	errType := reflect.TypeOf((*error)(nil)).Elem()
	if !ctxType.AssignableTo(mt.In(0)) {
		return nil, nil, fmt.Errorf("handler must accept context.Context")
	}

	msgType := mt.In(1)
	if meta.MessageTypeValue != nil {
		if !meta.MessageTypeValue.AssignableTo(msgType) {
			return nil, nil, fmt.Errorf("rpc message type mismatch")
		}
		msgType = meta.MessageTypeValue
	}

	if query {
		if mt.NumOut() != 2 || mt.Out(1) != errType {
			return nil, nil, fmt.Errorf("Query signature must return (result, error)")
		}
		return msgType, makeQueryInvoker(method, msgType), nil
	}

	if mt.NumOut() != 1 || mt.Out(0) != errType {
		return nil, nil, fmt.Errorf("Execute signature must return error")
	}
	return msgType, makeExecuteInvoker(method, msgType), nil
}

func buildFuncInvoker(fn reflect.Value, meta command.CommandMeta) (reflect.Type, func(context.Context, any) (any, error), error) {
	ft := fn.Type()
	ctxType := reflect.TypeOf((*context.Context)(nil)).Elem()
	errType := reflect.TypeOf((*error)(nil)).Elem()

	if ft.NumIn() != 2 {
		return nil, nil, fmt.Errorf("rpc function must accept (ctx, msg)")
	}
	if !ctxType.AssignableTo(ft.In(0)) {
		return nil, nil, fmt.Errorf("rpc function must accept context.Context")
	}

	msgType := ft.In(1)
	if meta.MessageTypeValue != nil {
		if !meta.MessageTypeValue.AssignableTo(msgType) {
			return nil, nil, fmt.Errorf("rpc message type mismatch")
		}
		msgType = meta.MessageTypeValue
	}

	switch ft.NumOut() {
	case 1:
		if ft.Out(0) != errType {
			return nil, nil, fmt.Errorf("rpc function Execute-style signature must return error")
		}
		return msgType, makeExecuteInvoker(fn, msgType), nil
	case 2:
		if ft.Out(1) != errType {
			return nil, nil, fmt.Errorf("rpc function Query-style signature must return (result, error)")
		}
		return msgType, makeQueryInvoker(fn, msgType), nil
	default:
		return nil, nil, fmt.Errorf("rpc function must be Execute-style or Query-style")
	}
}

func makeExecuteInvoker(fn reflect.Value, msgType reflect.Type) func(context.Context, any) (any, error) {
	return func(ctx context.Context, payload any) (any, error) {
		msgValue, err := payloadValue(msgType, payload)
		if err != nil {
			return nil, err
		}

		results := fn.Call([]reflect.Value{reflect.ValueOf(ctx), msgValue})
		if len(results) == 0 || results[0].IsNil() {
			return nil, nil
		}
		err, ok := results[0].Interface().(error)
		if !ok {
			return nil, fmt.Errorf("Execute returned non-error")
		}
		return nil, err
	}
}

func makeQueryInvoker(fn reflect.Value, msgType reflect.Type) func(context.Context, any) (any, error) {
	return func(ctx context.Context, payload any) (any, error) {
		msgValue, err := payloadValue(msgType, payload)
		if err != nil {
			return nil, err
		}

		results := fn.Call([]reflect.Value{reflect.ValueOf(ctx), msgValue})
		if len(results) != 2 {
			return nil, fmt.Errorf("Query returned invalid result arity")
		}
		if !results[1].IsNil() {
			err, ok := results[1].Interface().(error)
			if !ok {
				return nil, fmt.Errorf("Query returned non-error as second value")
			}
			return nil, err
		}
		return results[0].Interface(), nil
	}
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

func cloneStrings(values []string) []string {
	if len(values) == 0 {
		return nil
	}
	return slices.Clone(values)
}

func cloneEndpoint(endpoint Endpoint) Endpoint {
	endpoint.Permissions = cloneStrings(endpoint.Permissions)
	endpoint.Roles = cloneStrings(endpoint.Roles)
	return endpoint
}

func isTypedNil(value any) bool {
	v := reflect.ValueOf(value)
	if !v.IsValid() {
		return true
	}
	switch v.Kind() {
	case reflect.Chan, reflect.Func, reflect.Interface, reflect.Map, reflect.Ptr, reflect.Slice:
		return v.IsNil()
	default:
		return false
	}
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

package dispatcher

import (
	"context"
	"fmt"
	"reflect"
	"sync"
	"sync/atomic"

	"github.com/goliatone/go-command"
	"github.com/goliatone/go-command/router"
	"github.com/goliatone/go-command/runner"
	"github.com/goliatone/go-errors"
)

// Runtime owns isolated command and query subscription state.
type Runtime struct {
	muxMu      sync.RWMutex
	commandMux *router.Mux
	queryMux   *router.Mux

	commandSubscriptions atomic.Int64
	querySubscriptions   atomic.Int64
	subscriptionEpoch    atomic.Uint64

	generationMu sync.Mutex
	generation   atomic.Pointer[runtimeGeneration]

	executorMu sync.RWMutex
	executors  map[command.ExecutionMode]CommandExecutor
}

type runtimeGeneration struct {
	provider  command.RegistrationProvider
	placement command.PlacementResolver
	remote    command.RemoteDispatcher
}

type RuntimeOption func(*Runtime)

func NewRuntime(options ...RuntimeOption) *Runtime {
	runtime := &Runtime{
		commandMux: newMuxForRouting(routingConfig{mode: RoutingModeExact}),
		queryMux:   newMuxForRouting(routingConfig{mode: RoutingModeExact}),
		executors:  make(map[command.ExecutionMode]CommandExecutor),
	}
	runtime.generation.Store(&runtimeGeneration{})
	for _, option := range options {
		if option != nil {
			option(runtime)
		}
	}
	return runtime
}

func (r *Runtime) RegisterExecutor(mode command.ExecutionMode, executor CommandExecutor) error {
	if r == nil {
		return errors.New("dispatcher runtime cannot be nil", errors.CategoryBadInput).
			WithTextCode("DISPATCH_RUNTIME_NIL")
	}
	mode = command.NormalizeExecutionMode(mode)
	if mode == "" {
		return errors.New("execution mode is required", errors.CategoryValidation).
			WithTextCode(command.TextCodeInvalidExecutionMode)
	}
	if err := command.ValidateExecutionMode(mode); err != nil {
		return err
	}
	if mode == command.ExecutionModeInline {
		return errors.New("inline execution is owned by the runtime local mux", errors.CategoryConflict).
			WithTextCode("INLINE_EXECUTOR_RUNTIME_OWNED")
	}
	if isNilCommandExecutor(executor) {
		return errors.New("executor cannot be nil", errors.CategoryBadInput).
			WithTextCode("DISPATCH_EXECUTOR_NIL")
	}
	r.executorMu.Lock()
	r.executors[mode] = executor
	r.executorMu.Unlock()
	return nil
}

func (r *Runtime) executor(mode command.ExecutionMode) (CommandExecutor, bool) {
	if r == nil {
		return nil, false
	}
	r.executorMu.RLock()
	defer r.executorMu.RUnlock()
	executor, ok := r.executors[command.NormalizeExecutionMode(mode)]
	return executor, ok
}

func (r *Runtime) UnregisterExecutor(mode command.ExecutionMode) {
	if r == nil {
		return
	}
	mode = command.NormalizeExecutionMode(mode)
	if mode == "" || mode == command.ExecutionModeInline {
		return
	}
	r.executorMu.Lock()
	delete(r.executors, mode)
	r.executorMu.Unlock()
}

func (r *Runtime) commandMuxSnapshot() *router.Mux {
	if r == nil {
		return nil
	}
	r.muxMu.RLock()
	defer r.muxMu.RUnlock()
	return r.commandMux
}

func (r *Runtime) queryMuxSnapshot() *router.Mux {
	if r == nil {
		return nil
	}
	r.muxMu.RLock()
	defer r.muxMu.RUnlock()
	return r.queryMux
}

func (r *Runtime) replaceMuxes(commandMux, queryMux *router.Mux) {
	if r == nil {
		return
	}
	if commandMux == nil {
		commandMux = newMuxForRouting(routingConfig{mode: RoutingModeExact})
	}
	if queryMux == nil {
		queryMux = newMuxForRouting(routingConfig{mode: RoutingModeExact})
	}
	r.muxMu.Lock()
	r.commandMux = commandMux
	r.queryMux = queryMux
	r.subscriptionEpoch.Add(1)
	r.commandSubscriptions.Store(0)
	r.querySubscriptions.Store(0)
	r.muxMu.Unlock()
}

// replaceMuxesIfUnsubscribed atomically verifies subscription ownership and
// replaces both muxes. Subscription helpers hold muxMu for the complete add,
// so a successful replacement cannot orphan a concurrently added handler.
func (r *Runtime) replaceMuxesIfUnsubscribed(commandMux, queryMux *router.Mux) bool {
	if r == nil {
		return false
	}
	if commandMux == nil {
		commandMux = newMuxForRouting(routingConfig{mode: RoutingModeExact})
	}
	if queryMux == nil {
		queryMux = newMuxForRouting(routingConfig{mode: RoutingModeExact})
	}
	r.muxMu.Lock()
	defer r.muxMu.Unlock()
	if r.commandSubscriptions.Load() > 0 || r.querySubscriptions.Load() > 0 {
		return false
	}
	r.commandMux = commandMux
	r.queryMux = queryMux
	r.subscriptionEpoch.Add(1)
	return true
}

// Reset clears subscriptions, executors, and routed configuration owned by one
// runtime. Existing subscription handles remain safe and idempotent.
func (r *Runtime) Reset() {
	if r == nil {
		return
	}
	r.replaceMuxes(
		newMuxForRouting(routingConfig{mode: RoutingModeExact}),
		newMuxForRouting(routingConfig{mode: RoutingModeExact}),
	)
	r.executorMu.Lock()
	r.executors = make(map[command.ExecutionMode]CommandExecutor)
	r.executorMu.Unlock()
	r.generationMu.Lock()
	r.generation.Store(&runtimeGeneration{})
	r.generationMu.Unlock()
}

func (r *Runtime) hasSubscriptions() bool {
	return r != nil && (r.commandSubscriptions.Load() > 0 || r.querySubscriptions.Load() > 0)
}

func subscribeCommandToMux[T any](runtime *Runtime, mux *router.Mux, cmd command.Commander[T], runnerOpts ...runner.Option) (Subscription, error) {
	if runtime == nil || mux == nil || cmd == nil {
		return nil, nil
	}
	messageType, err := subscriptionMessageType(cmd, command.HandlerKindCommand)
	if err != nil {
		return nil, err
	}
	epoch := runtime.subscriptionEpoch.Load()
	wrapper := &commandWrapper[T]{runner: runner.NewHandler(runnerOpts...), cmd: cmd}
	sub := mux.Add(messageType, wrapper)
	runtime.commandSubscriptions.Add(1)
	return &trackedSubscription{
		inner: sub,
		onUnsubscribe: func() {
			if runtime.subscriptionEpoch.Load() != epoch {
				return
			}
			decrementRuntimeCounter(&runtime.commandSubscriptions)
		},
	}, nil
}

func subscribeQueryToMux[T any, R any](runtime *Runtime, mux *router.Mux, qry command.Querier[T, R], runnerOpts ...runner.Option) (Subscription, error) {
	if runtime == nil || mux == nil || qry == nil {
		return nil, nil
	}
	messageType, err := subscriptionMessageType(qry, command.HandlerKindQuery)
	if err != nil {
		return nil, err
	}
	epoch := runtime.subscriptionEpoch.Load()
	wrapper := &queryWrapper[T, R]{runner: runner.NewHandler(runnerOpts...), qry: qry}
	sub := mux.Add(messageType, wrapper)
	runtime.querySubscriptions.Add(1)
	return &trackedSubscription{
		inner: sub,
		onUnsubscribe: func() {
			if runtime.subscriptionEpoch.Load() != epoch {
				return
			}
			decrementRuntimeCounter(&runtime.querySubscriptions)
		},
	}, nil
}

func subscriptionMessageType(handler any, kind command.HandlerKind) (string, error) {
	registrations, err := command.MessageRegistrationsForCommand(handler)
	if err != nil {
		return "", err
	}
	for _, registration := range registrations {
		if registration != nil && registration.Kind() == kind {
			return registration.MessageType(), nil
		}
	}
	return "", command.NewRegistrationInvalidError("handler does not expose the requested subscription capability", map[string]any{
		"handler_kind": kind,
		"handler":      fmt.Sprintf("%T", handler),
	})
}

func decrementRuntimeCounter(counter *atomic.Int64) {
	if counter == nil {
		return
	}
	for {
		current := counter.Load()
		if current <= 0 {
			return
		}
		if counter.CompareAndSwap(current, current-1) {
			return
		}
	}
}

func SubscribeCommandTo[T any](runtime *Runtime, cmd command.Commander[T], runnerOpts ...runner.Option) Subscription {
	if runtime == nil {
		return nil
	}
	runtime.muxMu.RLock()
	defer runtime.muxMu.RUnlock()
	subscription, _ := subscribeCommandToMux(runtime, runtime.commandMux, cmd, runnerOpts...)
	return subscription
}

func SubscribeQueryTo[T any, R any](runtime *Runtime, qry command.Querier[T, R], runnerOpts ...runner.Option) Subscription {
	if runtime == nil {
		return nil
	}
	runtime.muxMu.RLock()
	defer runtime.muxMu.RUnlock()
	subscription, _ := subscribeQueryToMux(runtime, runtime.queryMux, qry, runnerOpts...)
	return subscription
}

// CommandSubscriptionHook adapts RuntimeContainer's untyped composition hook
// to a typed runtime subscription.
func CommandSubscriptionHook[T any](runtime *Runtime) func(any, ...runner.Option) (Subscription, error) {
	return func(handler any, options ...runner.Option) (Subscription, error) {
		typed, ok := handler.(command.Commander[T])
		if !ok {
			return nil, errors.New("command subscription handler type mismatch", errors.CategoryValidation).
				WithTextCode(command.TextCodeDynamicMessageTypeMismatch).
				WithMetadata(map[string]any{"handler": fmt.Sprintf("%T", handler)})
		}
		if runtime == nil {
			return nil, errors.New("dispatcher runtime cannot be nil", errors.CategoryBadInput).
				WithTextCode("DISPATCH_RUNTIME_NIL")
		}
		runtime.muxMu.RLock()
		defer runtime.muxMu.RUnlock()
		return subscribeCommandToMux(runtime, runtime.commandMux, typed, options...)
	}
}

// QuerySubscriptionHook adapts RuntimeContainer's untyped composition hook to
// a typed runtime query subscription.
func QuerySubscriptionHook[T any, R any](runtime *Runtime) func(any, ...runner.Option) (Subscription, error) {
	return func(handler any, options ...runner.Option) (Subscription, error) {
		typed, ok := handler.(command.Querier[T, R])
		if !ok {
			return nil, errors.New("query subscription handler type mismatch", errors.CategoryValidation).
				WithTextCode(command.TextCodeDynamicMessageTypeMismatch).
				WithMetadata(map[string]any{"handler": fmt.Sprintf("%T", handler)})
		}
		if runtime == nil {
			return nil, errors.New("dispatcher runtime cannot be nil", errors.CategoryBadInput).
				WithTextCode("DISPATCH_RUNTIME_NIL")
		}
		runtime.muxMu.RLock()
		defer runtime.muxMu.RUnlock()
		return subscribeQueryToMux(runtime, runtime.queryMux, typed, options...)
	}
}

// AttachRegistrationProvider validates and snapshots a complete provider
// generation before making it visible to dynamic dispatch.
func (r *Runtime) AttachRegistrationProvider(provider command.RegistrationProvider) error {
	if r == nil {
		return errors.New("dispatcher runtime cannot be nil", errors.CategoryBadInput).
			WithTextCode("DISPATCH_RUNTIME_NIL")
	}
	if provider == nil || isNilRegistrationProvider(provider) {
		return command.NewRegistrationProviderNotConfiguredError()
	}
	index, err := command.NewMessageRegistrationIndex(provider.Registrations()...)
	if err != nil {
		return err
	}
	r.generationMu.Lock()
	defer r.generationMu.Unlock()
	current := r.generationSnapshotLocked()
	placement := current.placement
	if policies, ok := placement.(command.PlacementPoliciesProvider); ok {
		placement, err = command.NewPlacementPolicySnapshot(index, policies.PlacementPolicies()...)
		if err != nil {
			return err
		}
	}
	r.generation.Store(&runtimeGeneration{provider: index, placement: placement, remote: current.remote})
	return nil
}

func (r *Runtime) RegistrationProvider() command.RegistrationProvider {
	if r == nil {
		return nil
	}
	return r.generationSnapshot().provider
}

// RoutedReady reports whether stable-ID and dynamic operations have a complete
// registration generation. Typed local dispatch does not require readiness.
func (r *Runtime) RoutedReady() error {
	if r == nil {
		return command.NewRegistrationProviderNotConfiguredError()
	}
	generation := r.generationSnapshot()
	if generation.provider == nil {
		return command.NewRegistrationProviderNotConfiguredError()
	}
	if policies, ok := generation.placement.(command.PlacementPoliciesProvider); ok && generation.remote == nil {
		for _, policy := range policies.PlacementPolicies() {
			if policy.Route.Target != command.DispatchTargetRemote {
				continue
			}
			registration, _ := generation.provider.RegistrationByID(policy.Kind, policy.RegistrationID)
			return command.NewRemoteDispatcherNotConfiguredError(registration, policy.Route)
		}
	}
	return nil
}

// ConfigurePlacementResolver installs an application-owned resolver as part of
// one atomic provider/placement generation.
func (r *Runtime) ConfigurePlacementResolver(resolver command.PlacementResolver) error {
	if r == nil {
		return errors.New("dispatcher runtime cannot be nil", errors.CategoryBadInput).
			WithTextCode("DISPATCH_RUNTIME_NIL")
	}
	if isNilPlacementResolver(resolver) {
		resolver = nil
	}
	r.generationMu.Lock()
	defer r.generationMu.Unlock()
	current := r.generationSnapshotLocked()
	if resolver != nil && current.provider == nil {
		return command.NewRegistrationProviderNotConfiguredError()
	}
	r.generation.Store(&runtimeGeneration{provider: current.provider, placement: resolver, remote: current.remote})
	return nil
}

func isNilPlacementResolver(resolver command.PlacementResolver) bool {
	if resolver == nil {
		return true
	}
	value := reflect.ValueOf(resolver)
	switch value.Kind() {
	case reflect.Chan, reflect.Func, reflect.Interface, reflect.Map, reflect.Pointer, reflect.Slice:
		return value.IsNil()
	default:
		return false
	}
}

// ReplacePlacementPolicies validates all kind-qualified IDs and routes before
// atomically publishing the new resolver snapshot.
func (r *Runtime) ReplacePlacementPolicies(policies ...command.PlacementPolicy) error {
	if r == nil {
		return errors.New("dispatcher runtime cannot be nil", errors.CategoryBadInput).
			WithTextCode("DISPATCH_RUNTIME_NIL")
	}
	r.generationMu.Lock()
	defer r.generationMu.Unlock()
	current := r.generationSnapshotLocked()
	if current.provider == nil {
		return command.NewRegistrationProviderNotConfiguredError()
	}
	resolver, err := command.NewPlacementPolicySnapshot(current.provider, policies...)
	if err != nil {
		return err
	}
	r.generation.Store(&runtimeGeneration{provider: current.provider, placement: resolver, remote: current.remote})
	return nil
}

func (r *Runtime) generationSnapshot() *runtimeGeneration {
	if r == nil {
		return &runtimeGeneration{}
	}
	if generation := r.generation.Load(); generation != nil {
		return generation
	}
	r.generationMu.Lock()
	defer r.generationMu.Unlock()
	return r.generationSnapshotLocked()
}

func (r *Runtime) generationSnapshotLocked() *runtimeGeneration {
	if generation := r.generation.Load(); generation != nil {
		return generation
	}
	generation := &runtimeGeneration{}
	r.generation.Store(generation)
	return generation
}

// DispatchTo executes a typed command against one isolated runtime.
func DispatchTo[T any](ctx context.Context, runtime *Runtime, msg T) error {
	if runtime == nil {
		return errors.New("dispatcher runtime cannot be nil", errors.CategoryBadInput).
			WithTextCode("DISPATCH_RUNTIME_NIL")
	}
	if err := command.ValidateMessage(msg); err != nil {
		return err
	}
	if ctx == nil {
		ctx = context.Background()
	}
	return dispatchInlineWithRunContextOn(runtime.commandMuxSnapshot(), ctx, msg, command.DispatchRunContext{
		CommandID:     command.GetMessageType(msg),
		ExecutionMode: command.ExecutionModeInline,
	})
}

// QueryTo executes a typed query against one isolated runtime.
func QueryTo[T any, R any](ctx context.Context, runtime *Runtime, msg T) (R, error) {
	if runtime == nil {
		var zero R
		return zero, errors.New("dispatcher runtime cannot be nil", errors.CategoryBadInput).
			WithTextCode("DISPATCH_RUNTIME_NIL")
	}
	return queryWithMux[T, R](ctx, runtime.queryMuxSnapshot(), msg)
}

func queryWithMux[T any, R any](ctx context.Context, mux *router.Mux, msg T) (R, error) {
	var zero R
	if err := command.ValidateMessage(msg); err != nil {
		return zero, err
	}
	if ctx == nil {
		ctx = context.Background()
	}
	if mux == nil {
		return zero, errors.New("query mux is not configured", errors.CategoryConflict).
			WithTextCode("QUERY_MUX_NOT_CONFIGURED")
	}

	handlers := mux.Get(command.GetMessageType(msg))
	if len(handlers) == 0 {
		return zero, errors.Wrap(
			fmt.Errorf("no query handlers for message type %s", command.GetMessageType(msg)),
			errors.CategoryHandler,
			"failed to get query handler",
		).WithTextCode("QUERY_HANDLER_LOOKUP_ERROR")
	}
	if len(handlers) > 1 {
		return zero, errors.New("multiple query handlers found, ambiguous query", errors.CategoryBadInput).
			WithTextCode("QUERY_HANDLER_LOOKUP_ERROR")
	}
	queryHandler, ok := handlers[0].Handler.(*queryWrapper[T, R])
	if !ok {
		return zero, errors.New("query handler type does not match requested result", errors.CategoryHandler).
			WithTextCode("QUERY_HANDLER_LOOKUP_ERROR").
			WithMetadata(map[string]any{
				"message_type": command.GetMessageType(msg),
				"result_type":  fmt.Sprintf("%T", zero),
			})
	}
	if ctx.Err() != nil {
		return zero, errors.Wrap(ctx.Err(), errors.CategoryExternal, "context canceled or deadline exceeded").
			WithTextCode("CONTEXT_ERROR")
	}
	result, err := runner.RunQuery(ctx, queryHandler.runner, queryHandler.qry, msg)
	if err != nil {
		return zero, errors.Wrap(err, errors.CategoryHandler, fmt.Sprintf("query handler failed for type %s", command.GetMessageType(msg))).
			WithTextCode("QUERY_EXECUTION_FAILED").
			WithMetadata(map[string]any{
				"message_type": command.GetMessageType(msg),
				"result_type":  fmt.Sprintf("%T", zero),
				"handler":      fmt.Sprintf("%T", queryHandler.qry),
			})
	}
	return result, nil
}

var processRuntime struct {
	mu      sync.RWMutex
	runtime *Runtime
}

func defaultRuntimeInstance() *Runtime {
	processRuntime.mu.RLock()
	runtime := processRuntime.runtime
	processRuntime.mu.RUnlock()
	if runtime != nil {
		return runtime
	}

	processRuntime.mu.Lock()
	defer processRuntime.mu.Unlock()
	if processRuntime.runtime == nil {
		processRuntime.runtime = NewRuntime()
	}
	return processRuntime.runtime
}

// DefaultRuntime returns the concurrency-safe process default.
func DefaultRuntime() *Runtime {
	return defaultRuntimeInstance()
}

// InstallDefaultRuntime replaces the process default and returns an idempotent
// restore closure. Restoration is conditional so an older closure cannot
// overwrite a newer installation.
func InstallDefaultRuntime(runtime *Runtime) (func(), error) {
	if runtime == nil {
		return nil, errors.New("dispatcher runtime cannot be nil", errors.CategoryBadInput).
			WithTextCode("DISPATCH_RUNTIME_NIL")
	}
	processRuntime.mu.Lock()
	previous := processRuntime.runtime
	if previous == nil {
		previous = NewRuntime()
	}
	processRuntime.runtime = runtime
	processRuntime.mu.Unlock()

	var restoreMu sync.Mutex
	restored := false
	return func() {
		restoreMu.Lock()
		defer restoreMu.Unlock()
		if restored {
			return
		}
		processRuntime.mu.Lock()
		if processRuntime.runtime == runtime {
			processRuntime.runtime = previous
			restored = true
		}
		processRuntime.mu.Unlock()
	}, nil
}

func isNilRegistrationProvider(provider command.RegistrationProvider) bool {
	if provider == nil {
		return true
	}
	value := reflect.ValueOf(provider)
	switch value.Kind() {
	case reflect.Chan, reflect.Func, reflect.Interface, reflect.Map, reflect.Pointer, reflect.Slice:
		return value.IsNil()
	default:
		return false
	}
}

func isNilCommandExecutor(executor CommandExecutor) bool {
	if executor == nil {
		return true
	}
	value := reflect.ValueOf(executor)
	switch value.Kind() {
	case reflect.Chan, reflect.Func, reflect.Interface, reflect.Map, reflect.Pointer, reflect.Slice:
		return value.IsNil()
	default:
		return false
	}
}

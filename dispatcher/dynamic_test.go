package dispatcher

import (
	"context"
	stderrors "errors"
	"reflect"
	"testing"
	"time"

	"github.com/goliatone/go-command"
	gerrors "github.com/goliatone/go-errors"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

type dynamicCommandMessage struct{ Value string }

func (dynamicCommandMessage) Type() string { return "dynamic.command" }

type dynamicQueryMessage struct{ Nil bool }

func (dynamicQueryMessage) Type() string { return "dynamic.query" }

type dynamicZeroQueryMessage struct{}

func (dynamicZeroQueryMessage) Type() string { return "dynamic.query.zero" }

type dynamicQueryResult struct{ Value string }

type dynamicInterfaceMessage interface {
	Type() string
	dynamicInterfaceMarker()
}

type dynamicInterfaceMessageImpl struct{ Seed string }

func (*dynamicInterfaceMessageImpl) Type() string            { return "dynamic.interface" }
func (*dynamicInterfaceMessageImpl) dynamicInterfaceMarker() {}

type dynamicInterfaceHandler struct {
	commandCalls int
	queryCalls   int
}

func (h *dynamicInterfaceHandler) MessageValue() any {
	return &dynamicInterfaceMessageImpl{Seed: "factory-default"}
}

func (h *dynamicInterfaceHandler) Execute(_ context.Context, message dynamicInterfaceMessage) error {
	h.commandCalls++
	if message.(*dynamicInterfaceMessageImpl).Seed == "" {
		return stderrors.New("factory default was lost")
	}
	return nil
}

func (h *dynamicInterfaceHandler) Query(_ context.Context, message dynamicInterfaceMessage) (string, error) {
	h.queryCalls++
	return message.(*dynamicInterfaceMessageImpl).Seed, nil
}

func buildDynamicRuntime(t *testing.T) (*Runtime, command.RegistrationProvider) {
	t.Helper()
	runtime := NewRuntime()
	SubscribeCommandTo(runtime, command.CommandFunc[dynamicCommandMessage](func(_ context.Context, message dynamicCommandMessage) error {
		if message.Value == "fail" {
			return stderrors.New("command failed")
		}
		return nil
	}))
	SubscribeQueryTo(runtime, command.QueryFunc[dynamicQueryMessage, *dynamicQueryResult](func(_ context.Context, message dynamicQueryMessage) (*dynamicQueryResult, error) {
		if message.Nil {
			return nil, nil
		}
		return &dynamicQueryResult{Value: "ok"}, nil
	}))
	SubscribeQueryTo(runtime, command.QueryFunc[dynamicZeroQueryMessage, int](func(context.Context, dynamicZeroQueryMessage) (int, error) {
		return 0, nil
	}))

	registry := command.NewRegistry()
	require.NoError(t, registry.RegisterCommand(command.CommandFunc[dynamicCommandMessage](func(context.Context, dynamicCommandMessage) error { return nil })))
	require.NoError(t, registry.RegisterCommand(command.QueryFunc[dynamicQueryMessage, *dynamicQueryResult](func(context.Context, dynamicQueryMessage) (*dynamicQueryResult, error) { return nil, nil })))
	require.NoError(t, registry.RegisterCommand(command.QueryFunc[dynamicZeroQueryMessage, int](func(context.Context, dynamicZeroQueryMessage) (int, error) { return 0, nil })))
	require.NoError(t, registry.Initialize())
	require.NoError(t, runtime.AttachRegistrationProvider(registry))
	return runtime, registry
}

func TestRuntimeDynamicCommandInvocationByMessageTypeAndID(t *testing.T) {
	runtime, provider := buildDynamicRuntime(t)
	outcome, err := runtime.Dispatch(context.Background(), command.HandlerKindCommand, dynamicCommandMessage{Value: "ok"}, command.DispatchOptions{})
	require.NoError(t, err)
	assert.True(t, outcome.Receipt.Accepted)
	assert.Equal(t, command.DispatchTargetLocal, outcome.Target)

	registration, ok := provider.RegistrationByMessageType(command.HandlerKindCommand, "dynamic.command")
	require.True(t, ok)
	decoded := registration.NewMessage().(*dynamicCommandMessage)
	decoded.Value = "ok"
	outcome, err = runtime.InvokeLocalByID(context.Background(), command.HandlerKindCommand, registration.ID(), decoded, command.DispatchOptions{})
	require.NoError(t, err)
	assert.Equal(t, registration.ID(), outcome.Receipt.CommandID)
}

func TestRuntimeDynamicInterfaceFactoryCommandAndQueryInvocation(t *testing.T) {
	runtime := NewRuntime()
	handler := &dynamicInterfaceHandler{}
	require.NotNil(t, SubscribeCommandTo[dynamicInterfaceMessage](runtime, handler))
	require.NotNil(t, SubscribeQueryTo[dynamicInterfaceMessage, string](runtime, handler))

	registry := command.NewRegistry()
	require.NoError(t, registry.RegisterCommand(handler))
	require.NoError(t, registry.Initialize())
	require.NoError(t, runtime.AttachRegistrationProvider(registry))

	registration, ok := registry.RegistrationByMessageType(command.HandlerKindCommand, "dynamic.interface")
	require.True(t, ok)
	first := registration.NewMessage().(*dynamicInterfaceMessageImpl)
	second := registration.NewMessage().(*dynamicInterfaceMessageImpl)
	assert.Equal(t, "factory-default", first.Seed)
	assert.Equal(t, "factory-default", second.Seed)
	assert.NotSame(t, first, second)

	_, err := runtime.Dispatch(context.Background(), command.HandlerKindCommand, first, command.DispatchOptions{})
	require.NoError(t, err)
	outcome, err := runtime.Dispatch(context.Background(), command.HandlerKindQuery, second, command.DispatchOptions{})
	require.NoError(t, err)
	assert.Equal(t, "factory-default", outcome.Result)
	assert.Equal(t, 1, handler.commandCalls)
	assert.Equal(t, 1, handler.queryCalls)
}

func TestRuntimeDynamicQueryPreservesZeroAndNilResults(t *testing.T) {
	runtime, _ := buildDynamicRuntime(t)
	nilOutcome, err := runtime.Dispatch(context.Background(), command.HandlerKindQuery, dynamicQueryMessage{Nil: true}, command.DispatchOptions{})
	require.NoError(t, err)
	assert.True(t, nilOutcome.ResultPresent)
	assert.Nil(t, nilOutcome.Result)

	zeroOutcome, err := runtime.Dispatch(context.Background(), command.HandlerKindQuery, dynamicZeroQueryMessage{}, command.DispatchOptions{})
	require.NoError(t, err)
	assert.True(t, zeroOutcome.ResultPresent)
	assert.Equal(t, 0, zeroOutcome.Result)
}

func TestRuntimeDynamicInvocationClassifiesLookupTypeAndHandlerErrors(t *testing.T) {
	runtime, provider := buildDynamicRuntime(t)
	_, err := runtime.InvokeLocalByID(context.Background(), command.HandlerKindCommand, "missing", dynamicCommandMessage{}, command.DispatchOptions{})
	assertStructuredTextCode(t, err, command.TextCodeRegistrationNotFound)

	registration, ok := provider.RegistrationByMessageType(command.HandlerKindCommand, "dynamic.command")
	require.True(t, ok)
	_, err = runtime.InvokeLocal(context.Background(), registration, dynamicQueryMessage{}, command.DispatchOptions{})
	assertStructuredTextCode(t, err, command.TextCodeDynamicMessageTypeMismatch)

	_, err = runtime.Dispatch(context.Background(), command.HandlerKindCommand, dynamicCommandMessage{Value: "fail"}, command.DispatchOptions{})
	assertStructuredTextCode(t, err, "HANDLER_EXECUTION_FAILED")
}

func TestRuntimeDynamicInvocationRequiresProviderButTypedDispatchDoesNot(t *testing.T) {
	runtime := NewRuntime()
	SubscribeCommandTo(runtime, command.CommandFunc[dynamicCommandMessage](func(context.Context, dynamicCommandMessage) error { return nil }))
	require.NoError(t, DispatchTo(context.Background(), runtime, dynamicCommandMessage{}))
	_, err := runtime.Dispatch(context.Background(), command.HandlerKindCommand, dynamicCommandMessage{}, command.DispatchOptions{})
	assertStructuredTextCode(t, err, command.TextCodeRegistrationProviderNotConfigured)
}

func TestRuntimeDynamicQueuedCommandUsesRuntimeExecutor(t *testing.T) {
	runtime, provider := buildDynamicRuntime(t)
	now := time.Now().UTC()
	executor := &captureExecutor{receipt: command.DispatchReceipt{Accepted: true, DispatchID: "queued-1", EnqueuedAt: &now}}
	require.NoError(t, runtime.RegisterExecutor(command.ExecutionModeQueued, executor))
	registration, ok := provider.RegistrationByMessageType(command.HandlerKindCommand, "dynamic.command")
	require.True(t, ok)
	outcome, err := runtime.InvokeLocal(context.Background(), registration, dynamicCommandMessage{}, command.DispatchOptions{Mode: command.ExecutionModeQueued})
	require.NoError(t, err)
	assert.Equal(t, command.ExecutionModeQueued, outcome.Receipt.Mode)
	assert.Equal(t, "queued-1", outcome.Receipt.DispatchID)
}

func TestRuntimeDynamicQueuedCommandEmitsCompleteLifecycleOnce(t *testing.T) {
	SetCommandRunObservers()
	t.Cleanup(func() { SetCommandRunObservers() })
	var events []command.CommandRunEvent
	AddCommandRunObserver(command.CommandRunObserverFunc(func(_ context.Context, event command.CommandRunEvent) error {
		events = append(events, event)
		return nil
	}))

	runtime, provider := buildDynamicRuntime(t)
	now := time.Now().UTC()
	executor := &captureExecutor{receipt: command.DispatchReceipt{Accepted: true, DispatchID: "queued-observed", EnqueuedAt: &now}}
	require.NoError(t, runtime.RegisterExecutor(command.ExecutionModeQueued, ObserveExecutor(executor)))
	registration, ok := provider.RegistrationByMessageType(command.HandlerKindCommand, "dynamic.command")
	require.True(t, ok)
	ctx := command.ContextWithDispatchProvenance(context.Background(), command.DispatchProvenance{IngressKind: "worker", DeliveryID: "delivery-queued"})
	outcome, err := runtime.InvokeLocal(ctx, registration, dynamicCommandMessage{}, command.DispatchOptions{Mode: command.ExecutionModeQueued, CorrelationID: "corr-queued"})
	require.NoError(t, err)
	require.Len(t, events, 1)
	event := events[0]
	assert.Equal(t, command.CommandRunPhaseSubmitted, event.Phase)
	assert.Equal(t, command.HandlerKindCommand, event.HandlerKind)
	assert.Equal(t, command.DispatchTargetLocal, event.DispatchTarget)
	assert.Equal(t, command.ExecutionModeQueued, event.ExecutionMode)
	assert.Equal(t, "delivery-queued", event.Provenance.DeliveryID)
	assert.Equal(t, outcome.Receipt, event.Receipt)
	assert.Equal(t, "corr-queued", event.CorrelationID)
	assert.False(t, event.StartedAt.IsZero())
	assert.GreaterOrEqual(t, event.Duration, time.Duration(0))
}

type typedNilExecutor struct{}

func (*typedNilExecutor) Execute(context.Context, any, string, command.DispatchOptions) (command.DispatchReceipt, error) {
	panic("typed-nil executor must never be invoked")
}

func TestExecutorRegistrationRejectsTypedNilImplementations(t *testing.T) {
	var executor *typedNilExecutor
	runtime := NewRuntime()
	assertStructuredTextCode(t, runtime.RegisterExecutor(command.ExecutionModeQueued, executor), "DISPATCH_EXECUTOR_NIL")
	assert.Nil(t, ObserveExecutor(executor))

	setupDispatchRoutingTest(t)
	assertStructuredTextCode(t, RegisterExecutor(command.ExecutionModeQueued, executor), "DISPATCH_EXECUTOR_NIL")
	assertStructuredTextCode(t, RegisterObservedExecutor(command.ExecutionModeQueued, executor), "DISPATCH_EXECUTOR_NIL")
}

type mismatchedResultRegistration struct{}

func (mismatchedResultRegistration) ID() string                { return "dynamic.query.mismatch" }
func (mismatchedResultRegistration) MessageType() string       { return "dynamic.query" }
func (mismatchedResultRegistration) Kind() command.HandlerKind { return command.HandlerKindQuery }
func (mismatchedResultRegistration) NewMessage() any           { return &dynamicQueryMessage{} }
func (mismatchedResultRegistration) RequestType() reflect.Type {
	return reflect.TypeFor[dynamicQueryMessage]()
}
func (mismatchedResultRegistration) ResultType() reflect.Type { return reflect.TypeFor[string]() }

func TestRuntimeDynamicQueryRejectsRegistrationResultMismatch(t *testing.T) {
	runtime := NewRuntime()
	SubscribeQueryTo(runtime, command.QueryFunc[dynamicQueryMessage, int](func(context.Context, dynamicQueryMessage) (int, error) { return 42, nil }))
	provider, err := command.NewMessageRegistrationIndex(mismatchedResultRegistration{})
	require.NoError(t, err)
	require.NoError(t, runtime.AttachRegistrationProvider(provider))

	_, err = runtime.Dispatch(context.Background(), command.HandlerKindQuery, dynamicQueryMessage{}, command.DispatchOptions{})
	assertStructuredTextCode(t, err, command.TextCodeDynamicResultTypeMismatch)
}

func assertStructuredTextCode(t *testing.T, err error, code string) {
	t.Helper()
	var structured *gerrors.Error
	require.True(t, gerrors.As(err, &structured), "expected structured error, got %T: %v", err, err)
	assert.Equal(t, code, structured.TextCode)
}

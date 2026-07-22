package dispatcher

import (
	"context"
	"fmt"
	"reflect"
	"strings"
	"time"

	"github.com/goliatone/go-command"
	"github.com/goliatone/go-errors"
)

// Dispatch resolves a dynamic value by kind and message type, then invokes it
// locally. Placement is layered onto this method by routed runtime generation
// configuration.
func (r *Runtime) Dispatch(ctx context.Context, kind command.HandlerKind, message any, options command.DispatchOptions) (command.DispatchOutcome, error) {
	if r == nil {
		return command.DispatchOutcome{}, errors.New("dispatcher runtime cannot be nil", errors.CategoryBadInput).
			WithTextCode("DISPATCH_RUNTIME_NIL")
	}
	if ctx == nil {
		ctx = context.Background()
	}
	generation := r.generationSnapshot()
	if generation.provider == nil {
		return command.DispatchOutcome{}, command.NewRegistrationProviderNotConfiguredError()
	}
	messageType := command.GetMessageType(message)
	registration, ok := generation.provider.RegistrationByMessageType(kind, messageType)
	if !ok {
		return command.DispatchOutcome{}, command.NewRegistrationNotFoundError(kind, messageType)
	}
	if err := command.ValidateMessage(message); err != nil {
		return command.DispatchOutcome{}, err
	}
	normalized, err := normalizeDynamicMessage(registration, message)
	if err != nil {
		return command.DispatchOutcome{}, err
	}
	contextOptions, _ := command.DispatchOptionsFromContext(ctx)
	merged := mergeDispatchOptions(contextOptions, options)
	mode := command.NormalizeExecutionMode(merged.Mode)
	if mode == "" {
		mode = command.ExecutionModeInline
	}
	if err := command.ValidateDispatchOptions(mode, merged); err != nil {
		return command.DispatchOutcome{}, err
	}
	merged.Mode = mode

	if command.ForcedLocalDispatchFromContext(ctx) {
		return r.InvokeLocal(ctx, registration, normalized, merged)
	}
	if generation.placement == nil {
		return r.InvokeLocal(ctx, registration, normalized, merged)
	}
	route, found, err := generation.placement.ResolvePlacement(ctx, registration, merged)
	if err != nil {
		return command.DispatchOutcome{}, command.NewPlacementResolutionError(registration, err)
	}
	if !found {
		return r.InvokeLocal(ctx, registration, normalized, merged)
	}
	if err := command.ValidateDispatchRoute(route); err != nil {
		return command.DispatchOutcome{}, err
	}
	route = command.NormalizeDispatchRoute(route)
	switch route.Target {
	case command.DispatchTargetLocal:
		return r.InvokeLocal(ctx, registration, normalized, merged)
	case command.DispatchTargetRemote:
		return r.invokeRemote(ctx, generation, route, registration, normalized, merged)
	default:
		return command.DispatchOutcome{}, command.NewInvalidDispatchRouteError(route)
	}
}

func (r *Runtime) InvokeLocalByID(ctx context.Context, kind command.HandlerKind, stableID string, message any, options command.DispatchOptions) (command.DispatchOutcome, error) {
	provider, err := r.requireRegistrationProvider()
	if err != nil {
		return command.DispatchOutcome{}, err
	}
	registration, ok := provider.RegistrationByID(kind, stableID)
	if !ok {
		return command.DispatchOutcome{}, command.NewRegistrationNotFoundError(kind, stableID)
	}
	return r.InvokeLocal(ctx, registration, message, options)
}

func (r *Runtime) InvokeLocalByMessageType(ctx context.Context, kind command.HandlerKind, messageType string, message any, options command.DispatchOptions) (command.DispatchOutcome, error) {
	provider, err := r.requireRegistrationProvider()
	if err != nil {
		return command.DispatchOutcome{}, err
	}
	registration, ok := provider.RegistrationByMessageType(kind, messageType)
	if !ok {
		return command.DispatchOutcome{}, command.NewRegistrationNotFoundError(kind, messageType)
	}
	return r.InvokeLocal(ctx, registration, message, options)
}

// InvokeLocal is the trusted, already-resolved local invocation boundary.
func (r *Runtime) InvokeLocal(ctx context.Context, registration command.MessageRegistration, message any, options command.DispatchOptions) (command.DispatchOutcome, error) {
	if r == nil {
		return command.DispatchOutcome{}, errors.New("dispatcher runtime cannot be nil", errors.CategoryBadInput).
			WithTextCode("DISPATCH_RUNTIME_NIL")
	}
	if registration == nil || isNilMessageRegistration(registration) {
		return command.DispatchOutcome{}, command.NewRegistrationNotFoundError("", "")
	}
	if ctx == nil {
		ctx = context.Background()
	}
	ctx = command.ContextWithForcedLocalDispatch(ctx)
	if err := command.ValidateMessage(message); err != nil {
		return command.DispatchOutcome{}, err
	}
	normalized, err := normalizeDynamicMessage(registration, message)
	if err != nil {
		return command.DispatchOutcome{}, err
	}
	contextOptions, _ := command.DispatchOptionsFromContext(ctx)
	merged := mergeDispatchOptions(contextOptions, options)
	mode := command.NormalizeExecutionMode(merged.Mode)
	if mode == "" {
		mode = command.ExecutionModeInline
	}
	if err := command.ValidateDispatchOptions(mode, merged); err != nil {
		return command.DispatchOutcome{}, err
	}
	merged.Mode = mode

	switch registration.Kind() {
	case command.HandlerKindCommand:
		return r.invokeLocalCommand(ctx, registration, normalized, merged)
	case command.HandlerKindQuery:
		return r.invokeLocalQuery(ctx, registration, normalized, merged)
	default:
		return command.DispatchOutcome{}, command.NewRegistrationInvalidError("unsupported handler kind", map[string]any{"handler_kind": registration.Kind()})
	}
}

func isNilMessageRegistration(registration command.MessageRegistration) bool {
	if registration == nil {
		return true
	}
	value := reflect.ValueOf(registration)
	switch value.Kind() {
	case reflect.Chan, reflect.Func, reflect.Interface, reflect.Map, reflect.Pointer, reflect.Slice:
		return value.IsNil()
	default:
		return false
	}
}

func (r *Runtime) invokeLocalCommand(ctx context.Context, registration command.MessageRegistration, message any, options command.DispatchOptions) (command.DispatchOutcome, error) {
	mode := command.NormalizeExecutionMode(options.Mode)
	if mode == command.ExecutionModeQueued {
		if count := len(r.commandMuxSnapshot().Get(registration.MessageType())); count > 1 {
			return command.DispatchOutcome{}, command.NewQueueMultiHandlerUnsupportedError(registration.ID(), count)
		}
		executor, ok := r.executor(mode)
		if !ok {
			return command.DispatchOutcome{}, newDispatchExecutorNotConfiguredError(mode, registration.ID())
		}
		run := command.DispatchRunContext{
			RunID:          newCommandRunID(),
			CommandID:      registration.ID(),
			HandlerKind:    command.HandlerKindCommand,
			DispatchTarget: command.DispatchTargetLocal,
			ExecutionMode:  command.ExecutionModeQueued,
			CorrelationID:  strings.TrimSpace(options.CorrelationID),
			IdempotencyKey: strings.TrimSpace(options.IdempotencyKey),
			StartedAt:      time.Now(),
			Provenance:     dispatchProvenance(ctx),
			Metadata:       command.CloneCommandRunMetadata(options.Metadata),
		}
		execCtx := command.ContextWithDispatchRun(ctx, run)
		receipt, err := ObserveExecutor(executor).Execute(execCtx, message, registration.ID(), options)
		if err != nil {
			return command.DispatchOutcome{Receipt: receipt, Target: command.DispatchTargetLocal}, err
		}
		receipt = normalizeDispatchReceipt(receipt, mode, registration.ID(), options.CorrelationID)
		if err := command.ValidateDispatchReceipt(receipt); err != nil {
			return command.DispatchOutcome{Receipt: receipt, Target: command.DispatchTargetLocal}, err
		}
		if !receipt.Accepted {
			return command.DispatchOutcome{Receipt: receipt, Target: command.DispatchTargetLocal}, command.NewDispatchRejectedError(registration.ID(), receipt)
		}
		return command.DispatchOutcome{Receipt: receipt, Target: command.DispatchTargetLocal}, nil
	}

	err := dispatchInlineWithRunContextOnType(r.commandMuxSnapshot(), ctx, message, registration.MessageType(), command.DispatchRunContext{
		CommandID:      registration.ID(),
		HandlerKind:    command.HandlerKindCommand,
		DispatchTarget: command.DispatchTargetLocal,
		ExecutionMode:  command.ExecutionModeInline,
		CorrelationID:  strings.TrimSpace(options.CorrelationID),
		IdempotencyKey: strings.TrimSpace(options.IdempotencyKey),
		Metadata:       mergeDispatchMetadata(options.Metadata, nil),
		Provenance:     dispatchProvenance(ctx),
	})
	if err != nil {
		return command.DispatchOutcome{}, err
	}
	receipt := command.DispatchReceipt{
		Accepted:      true,
		Mode:          command.ExecutionModeInline,
		CommandID:     registration.ID(),
		CorrelationID: strings.TrimSpace(options.CorrelationID),
	}
	return command.DispatchOutcome{Receipt: receipt, Target: command.DispatchTargetLocal}, nil
}

func (r *Runtime) invokeLocalQuery(ctx context.Context, registration command.MessageRegistration, message any, options command.DispatchOptions) (command.DispatchOutcome, error) {
	if command.NormalizeExecutionMode(options.Mode) != command.ExecutionModeInline {
		return command.DispatchOutcome{}, errors.New("queued query execution is not supported", errors.CategoryValidation).
			WithTextCode("QUEUED_QUERY_UNSUPPORTED").
			WithMetadata(map[string]any{"registration_id": registration.ID()})
	}
	startedAt := time.Now()
	run := command.DispatchRunContext{
		RunID:          newCommandRunID(),
		CommandID:      registration.ID(),
		HandlerKind:    command.HandlerKindQuery,
		DispatchTarget: command.DispatchTargetLocal,
		ExecutionMode:  command.ExecutionModeInline,
		CorrelationID:  strings.TrimSpace(options.CorrelationID),
		IdempotencyKey: strings.TrimSpace(options.IdempotencyKey),
		StartedAt:      startedAt,
		Provenance:     dispatchProvenance(ctx),
		Metadata:       command.CloneCommandRunMetadata(options.Metadata),
	}
	queryMux := r.queryMuxSnapshot()
	if queryMux != nil {
		if handlers := queryMux.Get(registration.MessageType()); len(handlers) == 1 {
			if runnable, ok := handlers[0].Handler.(dynamicQueryRunnable); ok {
				run.Handler = fmt.Sprintf("%T", runnable.handler())
			}
		}
	}
	runCtx := command.ContextWithCommandRunRevision(ctx, run.Revision)
	emitCommandRunEvent(ctx, commandRunEventWithRevision(runCtx, run, command.CommandRunPhaseStarted, startedAt, command.CommandRunEvent{}))
	runCtx = command.ContextWithDispatchRun(runCtx, run)
	result, err := invokeDynamicQuery(queryMux, runCtx, registration, message)
	if err != nil {
		emitCommandRunEvent(ctx, commandRunEventWithRevision(runCtx, run, terminalCommandRunPhase(err), time.Now(), command.CommandRunEvent{Duration: time.Since(startedAt), Error: err}))
		return command.DispatchOutcome{}, err
	}
	if err := validateDynamicResult(registration, result, true); err != nil {
		emitCommandRunEvent(ctx, commandRunEventWithRevision(runCtx, run, command.CommandRunPhaseFailed, time.Now(), command.CommandRunEvent{Duration: time.Since(startedAt), Error: err}))
		return command.DispatchOutcome{}, err
	}
	receipt := command.DispatchReceipt{
		Accepted:      true,
		Mode:          command.ExecutionModeInline,
		CommandID:     registration.ID(),
		CorrelationID: strings.TrimSpace(options.CorrelationID),
	}
	run.Receipt = receipt
	emitCommandRunEvent(ctx, commandRunEventWithRevision(runCtx, run, command.CommandRunPhaseSucceeded, time.Now(), command.CommandRunEvent{Duration: time.Since(startedAt)}))
	return command.DispatchOutcome{
		Receipt:       receipt,
		Target:        command.DispatchTargetLocal,
		Result:        result,
		ResultPresent: true,
	}, nil
}

func (r *Runtime) requireRegistrationProvider() (command.RegistrationProvider, error) {
	if r == nil {
		return nil, errors.New("dispatcher runtime cannot be nil", errors.CategoryBadInput).
			WithTextCode("DISPATCH_RUNTIME_NIL")
	}
	provider := r.RegistrationProvider()
	if provider == nil {
		return nil, command.NewRegistrationProviderNotConfiguredError()
	}
	return provider, nil
}

func normalizeDynamicMessage(registration command.MessageRegistration, message any) (any, error) {
	expected := registration.RequestType()
	actual := reflect.TypeOf(message)
	if expected == nil || actual == nil {
		return nil, command.NewDynamicMessageTypeMismatchError(registration, message)
	}
	if actual.AssignableTo(expected) || (expected.Kind() == reflect.Interface && actual.Implements(expected)) {
		return message, nil
	}
	value := reflect.ValueOf(message)
	if actual.Kind() == reflect.Pointer && !value.IsNil() && actual.Elem().AssignableTo(expected) {
		return value.Elem().Interface(), nil
	}
	if expected.Kind() == reflect.Pointer && actual.AssignableTo(expected.Elem()) {
		pointer := reflect.New(actual)
		pointer.Elem().Set(value)
		return pointer.Interface(), nil
	}
	return nil, command.NewDynamicMessageTypeMismatchError(registration, message)
}

func validateDynamicResult(registration command.MessageRegistration, result any, present bool) error {
	if !present {
		return command.NewDynamicResultMissingError(registration)
	}
	expected := registration.ResultType()
	actual := reflect.TypeOf(result)
	if actual == nil {
		if resultTypeCanBeNil(expected) {
			return nil
		}
		return command.NewDynamicResultTypeMismatchError(registration, result)
	}
	if expected != nil && (actual.AssignableTo(expected) || (expected.Kind() == reflect.Interface && actual.Implements(expected))) {
		return nil
	}
	return command.NewDynamicResultTypeMismatchError(registration, result)
}

func resultTypeCanBeNil(resultType reflect.Type) bool {
	if resultType == nil {
		return false
	}
	switch resultType.Kind() {
	case reflect.Chan, reflect.Func, reflect.Interface, reflect.Map, reflect.Pointer, reflect.Slice:
		return true
	default:
		return false
	}
}

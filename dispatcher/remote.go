package dispatcher

import (
	"context"
	"reflect"
	"strings"
	"time"

	"github.com/goliatone/go-command"
	"github.com/goliatone/go-errors"
)

// ConfigureRemoteDispatcher installs or clears the transport-neutral remote
// port as part of one atomic runtime generation.
func (r *Runtime) ConfigureRemoteDispatcher(remote command.RemoteDispatcher) error {
	if r == nil {
		return errors.New("dispatcher runtime cannot be nil", errors.CategoryBadInput).
			WithTextCode("DISPATCH_RUNTIME_NIL")
	}
	if isNilRemoteDispatcher(remote) {
		remote = nil
	}
	r.generationMu.Lock()
	defer r.generationMu.Unlock()
	current := r.generationSnapshotLocked()
	if remote != nil && current.provider == nil {
		return command.NewRegistrationProviderNotConfiguredError()
	}
	r.generation.Store(&runtimeGeneration{provider: current.provider, placement: current.placement, remote: remote})
	return nil
}

func (r *Runtime) invokeRemote(
	ctx context.Context,
	generation *runtimeGeneration,
	route command.DispatchRoute,
	registration command.MessageRegistration,
	message any,
	options command.DispatchOptions,
) (command.DispatchOutcome, error) {
	if generation == nil || generation.remote == nil {
		return command.DispatchOutcome{}, command.NewRemoteDispatcherNotConfiguredError(registration, route)
	}
	startedAt := time.Now()
	run := command.DispatchRunContext{
		RunID:          newCommandRunID(),
		CommandID:      registration.ID(),
		HandlerKind:    registration.Kind(),
		DispatchTarget: command.DispatchTargetRemote,
		Route:          strings.TrimSpace(route.Name),
		ExecutionMode:  command.NormalizeExecutionMode(options.Mode),
		CorrelationID:  strings.TrimSpace(options.CorrelationID),
		IdempotencyKey: strings.TrimSpace(options.IdempotencyKey),
		StartedAt:      startedAt,
		Provenance:     dispatchProvenance(ctx),
		Metadata:       command.CloneCommandRunMetadata(options.Metadata),
	}
	outcome, err := generation.remote.DispatchRemote(ctx, route, registration, message, options)
	if err != nil {
		// Remote errors, including retry metadata and ambiguous outcomes, are
		// returned unchanged. The runtime never retries or falls back locally.
		emitCommandRunEvent(ctx, commandRunEventFromContext(run, command.CommandRunPhaseRejected, time.Now(), command.CommandRunEvent{Duration: time.Since(startedAt), Error: err}))
		return command.DispatchOutcome{}, err
	}
	if err := validateRemoteOutcome(registration, route, options, outcome); err != nil {
		emitCommandRunEvent(ctx, commandRunEventFromContext(run, command.CommandRunPhaseRejected, time.Now(), command.CommandRunEvent{Duration: time.Since(startedAt), Error: err}))
		return command.DispatchOutcome{}, err
	}
	outcome.Target = command.DispatchTargetRemote
	outcome.Route = strings.TrimSpace(route.Name)
	run.Receipt = outcome.Receipt
	run.DispatchID = outcome.Receipt.DispatchID
	phase := command.CommandRunPhaseSucceeded
	if command.NormalizeExecutionMode(options.Mode) == command.ExecutionModeQueued {
		phase = command.CommandRunPhaseSubmitted
	}
	emitCommandRunEvent(ctx, commandRunEventFromContext(run, phase, time.Now(), command.CommandRunEvent{Duration: time.Since(startedAt)}))
	return outcome, nil
}

func dispatchProvenance(ctx context.Context) command.DispatchProvenance {
	provenance, _ := command.DispatchProvenanceFromContext(ctx)
	return provenance
}

func validateRemoteOutcome(
	registration command.MessageRegistration,
	route command.DispatchRoute,
	options command.DispatchOptions,
	outcome command.DispatchOutcome,
) error {
	if err := command.ValidateDispatchReceipt(outcome.Receipt); err != nil {
		return err
	}
	if strings.TrimSpace(outcome.Receipt.CommandID) != strings.TrimSpace(registration.ID()) {
		return errors.New("remote receipt registration id mismatch", errors.CategoryValidation).
			WithTextCode(command.TextCodeDispatchReceiptInvalid).
			WithMetadata(map[string]any{
				"expected_registration_id": registration.ID(),
				"receipt_command_id":       outcome.Receipt.CommandID,
				"route":                    strings.TrimSpace(route.Name),
			})
	}
	expectedMode := command.NormalizeExecutionMode(options.Mode)
	if expectedMode == "" {
		expectedMode = command.ExecutionModeInline
	}
	if command.NormalizeExecutionMode(outcome.Receipt.Mode) != expectedMode {
		return errors.New("remote receipt execution mode mismatch", errors.CategoryValidation).
			WithTextCode(command.TextCodeDispatchReceiptInvalid).
			WithMetadata(map[string]any{
				"expected_mode": expectedMode,
				"receipt_mode":  outcome.Receipt.Mode,
				"route":         strings.TrimSpace(route.Name),
			})
	}
	if expectedCorrelation := strings.TrimSpace(options.CorrelationID); expectedCorrelation != "" &&
		strings.TrimSpace(outcome.Receipt.CorrelationID) != expectedCorrelation {
		return errors.New("remote receipt correlation id mismatch", errors.CategoryValidation).
			WithTextCode(command.TextCodeDispatchReceiptInvalid).
			WithMetadata(map[string]any{
				"expected_correlation_id": expectedCorrelation,
				"receipt_correlation_id":  outcome.Receipt.CorrelationID,
				"route":                   strings.TrimSpace(route.Name),
			})
	}
	if registration.Kind() == command.HandlerKindQuery {
		return validateDynamicResult(registration, outcome.Result, outcome.ResultPresent)
	}
	return nil
}

func isNilRemoteDispatcher(remote command.RemoteDispatcher) bool {
	if remote == nil {
		return true
	}
	value := reflect.ValueOf(remote)
	switch value.Kind() {
	case reflect.Chan, reflect.Func, reflect.Interface, reflect.Map, reflect.Pointer, reflect.Slice:
		return value.IsNil()
	default:
		return false
	}
}

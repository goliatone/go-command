package flow

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"sort"
	"strings"
	"time"

	"github.com/goliatone/go-command"
)

// TransitionRequest extracts state machine metadata from a message.
type TransitionRequest[T any] struct {
	StateKey     func(T) string
	Event        func(T) string
	CurrentState func(T) string
}

// StateMachine executes transitions using compiled contracts and versioned persistence.
type StateMachine[T command.Message] struct {
	entity               string
	initial              string
	machine              *CompiledMachine[T]
	transitions          map[string]CompiledTransition[T]
	store                StateStore
	actions              *ActionRegistry[T] // reserved for orchestrator/policy layers
	req                  TransitionRequest[T]
	allowInitialFallback bool
	logger               Logger
	policy               ExecutionPolicy
	orchestrator         Orchestrator[T]
	lifecycleHooks       TransitionLifecycleHooks[T]
	hookFailureMode      HookFailureMode
}

// StateMachineOption customizes state machine behavior.
type StateMachineOption[T command.Message] func(*StateMachine[T])

// WithInitialFallback allows falling back to initial state when persistence has no record.
func WithInitialFallback[T command.Message](enable bool) StateMachineOption[T] {
	return func(sm *StateMachine[T]) {
		sm.allowInitialFallback = enable
	}
}

// WithLogger sets the state-machine logger.
func WithLogger[T command.Message](logger Logger) StateMachineOption[T] {
	return func(sm *StateMachine[T]) {
		sm.logger = normalizeLogger(logger)
	}
}

// WithExecutionPolicy selects the runtime orchestration policy.
func WithExecutionPolicy[T command.Message](policy ExecutionPolicy) StateMachineOption[T] {
	return func(sm *StateMachine[T]) {
		sm.policy = normalizeExecutionPolicy(policy)
	}
}

// WithOrchestrator sets an explicit orchestrator implementation.
func WithOrchestrator[T command.Message](orchestrator Orchestrator[T]) StateMachineOption[T] {
	return func(sm *StateMachine[T]) {
		sm.orchestrator = orchestrator
	}
}

// WithLifecycleHooks configures transition lifecycle hooks.
func WithLifecycleHooks[T command.Message](hooks ...TransitionLifecycleHook[T]) StateMachineOption[T] {
	return func(sm *StateMachine[T]) {
		sm.lifecycleHooks = append(sm.lifecycleHooks[:0], hooks...)
	}
}

// WithHookFailureMode configures lifecycle hook error behavior.
func WithHookFailureMode[T command.Message](mode HookFailureMode) StateMachineOption[T] {
	return func(sm *StateMachine[T]) {
		sm.hookFailureMode = normalizeHookFailureMode(mode)
	}
}

// NewStateMachine constructs a state machine flow from legacy config.
func NewStateMachine[T command.Message](
	cfg StateMachineConfig,
	store StateStore,
	req TransitionRequest[T],
	guards *GuardRegistry[T],
	actions *ActionRegistry[T],
	opts ...StateMachineOption[T],
) (*StateMachine[T], error) {
	if err := cfg.Validate(); err != nil {
		return nil, err
	}

	def := machineDefinitionFromConfig(cfg)
	compiled, err := CompileMachine[T](def, guardResolverAdapter[T]{guards: guards})
	if err != nil {
		return nil, err
	}
	baseOpts := []StateMachineOption[T]{WithExecutionPolicy[T](cfg.ExecutionPolicy)}
	if mode := strings.TrimSpace(string(cfg.HookFailureMode)); mode != "" {
		baseOpts = append(baseOpts, WithHookFailureMode[T](cfg.HookFailureMode))
	}
	baseOpts = append(baseOpts, opts...)
	return newStateMachineFromCompiled(cfg.Entity, compiled, store, req, actions, baseOpts...)
}

// NewStateMachineFromDefinition constructs a state machine from canonical definition.
func NewStateMachineFromDefinition[T command.Message](
	def *MachineDefinition,
	store StateStore,
	req TransitionRequest[T],
	resolvers ResolverRegistry[T],
	actions *ActionRegistry[T],
	opts ...StateMachineOption[T],
) (*StateMachine[T], error) {
	compiled, err := CompileMachine(def, resolvers)
	if err != nil {
		return nil, err
	}
	entity := ""
	if def != nil {
		entity = def.ID
	}
	return newStateMachineFromCompiled(entity, compiled, store, req, actions, opts...)
}

func newStateMachineFromCompiled[T command.Message](
	entity string,
	compiled *CompiledMachine[T],
	store StateStore,
	req TransitionRequest[T],
	actions *ActionRegistry[T],
	opts ...StateMachineOption[T],
) (*StateMachine[T], error) {
	if compiled == nil {
		return nil, fmt.Errorf("compiled machine required")
	}
	if store == nil {
		store = NewInMemoryStateStore()
	}

	transitions := make(map[string]CompiledTransition[T], len(compiled.Transitions))
	for _, tr := range compiled.Transitions {
		key := transitionKey(normalizeState(tr.From), normalizeEvent(tr.Event))
		if _, exists := transitions[key]; exists {
			return nil, fmt.Errorf("duplicate normalized transition key %q", key)
		}
		transitions[key] = tr
	}

	sm := &StateMachine[T]{
		entity:          entity,
		initial:         resolveInitialState(compiled.States),
		machine:         compiled,
		transitions:     transitions,
		store:           store,
		actions:         actions,
		req:             req,
		logger:          normalizeLogger(nil),
		hookFailureMode: HookFailureModeFailOpen,
	}

	for _, opt := range opts {
		if opt != nil {
			opt(sm)
		}
	}
	sm.logger = normalizeLogger(sm.logger)
	sm.hookFailureMode = normalizeHookFailureMode(sm.hookFailureMode)

	if !isValidExecutionPolicy(sm.policy) {
		return nil, fmt.Errorf("execution policy selection required: %q or %q",
			ExecutionPolicyLightweight,
			ExecutionPolicyOrchestrated,
		)
	}
	if sm.orchestrator == nil {
		switch sm.policy {
		case ExecutionPolicyLightweight:
			sm.orchestrator = NewLightweightOrchestrator(
				sm.actions,
				WithLightweightHooks[T](sm.lifecycleHooks...),
				WithLightweightHookFailureMode[T](sm.hookFailureMode),
				WithLightweightLogger[T](sm.logger),
			)
		case ExecutionPolicyOrchestrated:
			return nil, fmt.Errorf("orchestrated execution policy requires explicit orchestrator")
		default:
			return nil, fmt.Errorf("unsupported execution policy %q", sm.policy)
		}
	}

	return sm, nil
}

// Execute is the compatibility wrapper for command.Commander[T].
func (s *StateMachine[T]) Execute(ctx context.Context, msg T) error {
	if s.req.StateKey == nil {
		return cloneRuntimeError(
			ErrPreconditionFailed,
			"state machine identity extractor not configured",
			nil,
			map[string]any{"machine_id": s.machineID()},
		)
	}
	entityID := strings.TrimSpace(s.req.StateKey(msg))
	if entityID == "" {
		return cloneRuntimeError(
			ErrPreconditionFailed,
			"state machine key required",
			nil,
			map[string]any{"machine_id": s.machineID()},
		)
	}

	event := ""
	if s.req.Event != nil {
		event = s.req.Event(msg)
	}

	_, err := s.ApplyEvent(ctx, ApplyEventRequest[T]{
		EntityID: entityID,
		Event:    event,
		Msg:      msg,
	})
	return err
}

// ApplyEvent applies the provided event to current state and returns transition envelope.
func (s *StateMachine[T]) ApplyEvent(ctx context.Context, req ApplyEventRequest[T]) (*ApplyEventResponse[T], error) {
	entityID := strings.TrimSpace(req.EntityID)
	event := normalizeEvent(req.Event)
	if entityID == "" {
		return nil, cloneRuntimeError(
			ErrPreconditionFailed,
			"entity id is required",
			nil,
			map[string]any{"machine_id": s.machineID()},
		)
	}
	if event == "" {
		return nil, cloneRuntimeError(
			ErrPreconditionFailed,
			"event is required",
			nil,
			map[string]any{"machine_id": s.machineID(), "entity_id": entityID},
		)
	}
	executionID := newExecutionID()

	fields := map[string]any{
		"machine_id":      s.machineID(),
		"machine_version": s.machineVersion(),
		"entity_id":       entityID,
		"event":           event,
		"execution_id":    executionID,
	}
	logger := withLoggerFields(s.logger.WithContext(ctx), fields)
	logger.Debug("apply event requested")

	rec, current, currentVersion, err := s.loadCurrentRecord(ctx, entityID, req.Msg)
	if err != nil {
		logger.Error("apply event load state failed: %v", err)
		if lifecycleErr := s.emitLifecycleEvent(ctx, s.newLifecycleEvent(req, fields, "", current, current, executionID, TransitionPhaseRejected, err)); lifecycleErr != nil {
			return nil, lifecycleErr
		}
		return nil, err
	}
	if err := s.validateMachinePin(rec, fields); err != nil {
		if lifecycleErr := s.emitLifecycleEvent(ctx, s.newLifecycleEvent(req, fields, "", current, current, executionID, TransitionPhaseRejected, err)); lifecycleErr != nil {
			return nil, lifecycleErr
		}
		return nil, err
	}

	if expected := normalizeState(req.ExpectedState); expected != "" && current != expected {
		err := cloneRuntimeError(
			ErrPreconditionFailed,
			fmt.Sprintf("expected state %q, got %q", expected, current),
			nil,
			fields,
		)
		if lifecycleErr := s.emitLifecycleEvent(ctx, s.newLifecycleEvent(req, fields, "", current, current, executionID, TransitionPhaseRejected, err)); lifecycleErr != nil {
			return nil, lifecycleErr
		}
		return nil, err
	}
	if req.ExpectedVersion > 0 && currentVersion != req.ExpectedVersion {
		err := cloneRuntimeError(
			ErrPreconditionFailed,
			fmt.Sprintf("expected version %d, got %d", req.ExpectedVersion, currentVersion),
			nil,
			fields,
		)
		if lifecycleErr := s.emitLifecycleEvent(ctx, s.newLifecycleEvent(req, fields, "", current, current, executionID, TransitionPhaseRejected, err)); lifecycleErr != nil {
			return nil, lifecycleErr
		}
		return nil, err
	}

	tr, ok := s.transitions[transitionKey(current, event)]
	if !ok {
		err := cloneRuntimeError(
			ErrInvalidTransition,
			fmt.Sprintf("no transition for state=%s event=%s", current, event),
			nil,
			fields,
		)
		if lifecycleErr := s.emitLifecycleEvent(ctx, s.newLifecycleEvent(req, fields, "", current, current, executionID, TransitionPhaseRejected, err)); lifecycleErr != nil {
			return nil, lifecycleErr
		}
		return nil, err
	}
	fields["transition_id"] = tr.ID
	logger = withLoggerFields(logger, map[string]any{"transition_id": tr.ID})

	if err := s.emitLifecycleEvent(ctx, s.newLifecycleEvent(req, fields, tr.ID, current, current, executionID, TransitionPhaseAttempted, nil)); err != nil {
		return nil, err
	}

	if err := evaluateGuards(ctx, tr.Guards, req.Msg, req.ExecCtx, fields); err != nil {
		logger.Warn("apply event guard rejected: %v", err)
		if lifecycleErr := s.emitLifecycleEvent(ctx, s.newLifecycleEvent(req, fields, tr.ID, current, current, executionID, TransitionPhaseRejected, err)); lifecycleErr != nil {
			return nil, lifecycleErr
		}
		return nil, err
	}

	next, err := resolveTarget(ctx, tr, req.Msg, req.ExecCtx, fields)
	if err != nil {
		logger.Warn("apply event target resolution failed: %v", err)
		if lifecycleErr := s.emitLifecycleEvent(ctx, s.newLifecycleEvent(req, fields, tr.ID, current, current, executionID, TransitionPhaseRejected, err)); lifecycleErr != nil {
			return nil, lifecycleErr
		}
		return nil, err
	}

	var effects []Effect

	nextVersion := currentVersion
	txErr := s.store.RunInTransaction(ctx, func(tx TxStore) error {
		txRec, err := tx.Load(ctx, entityID)
		if err != nil {
			return err
		}
		if err := s.validateMachinePin(txRec, fields); err != nil {
			return err
		}
		txVersion := 0
		if txRec != nil {
			txVersion = txRec.Version
		}
		if txVersion != currentVersion {
			return ErrStateVersionConflict
		}

		save := &StateRecord{
			EntityID:       entityID,
			State:          next,
			MachineID:      s.machineID(),
			MachineVersion: s.machineVersion(),
			Metadata: mergeRecordMetadata(map[string]any{
				"last_event":     event,
				"transition_id":  tr.ID,
				"actor_id":       req.ExecCtx.ActorID,
				"tenant":         req.ExecCtx.Tenant,
				"previous_state": current,
			}, txRec),
		}
		newVersion, err := tx.SaveIfVersion(ctx, save, txVersion)
		if err != nil {
			return err
		}
		nextVersion = newVersion

		effects = s.compileEffects(req.Msg, tr)
		if s.shouldPersistOutboxEffects() {
			entries := effectsToOutbox(entityID, tr.ID, event, effects, fields)
			for _, entry := range entries {
				if err := tx.AppendOutbox(ctx, entry); err != nil {
					return err
				}
			}
		}
		return nil
	})
	if txErr != nil {
		var outErr error
		if errors.Is(txErr, ErrStateVersionConflict) {
			outErr = cloneRuntimeError(ErrVersionConflict, "failed to persist state", txErr, fields)
		} else if runtimeErrorCode(txErr) == ErrCodePreconditionFailed {
			outErr = txErr
		} else {
			outErr = cloneRuntimeError(ErrPreconditionFailed, "failed to persist state", txErr, fields)
		}
		if lifecycleErr := s.emitLifecycleEvent(ctx, s.newLifecycleEvent(req, fields, tr.ID, current, current, executionID, TransitionPhaseRejected, outErr)); lifecycleErr != nil {
			return nil, lifecycleErr
		}
		return nil, outErr
	}
	logger.Info("apply event committed state=%s version=%d", next, nextVersion)

	snapshot, snapErr := s.snapshotForState(ctx, SnapshotRequest[T]{
		EntityID: req.EntityID,
		Msg:      req.Msg,
		ExecCtx:  req.ExecCtx,
	}, next, nextVersion)
	if snapErr != nil {
		logger.Warn("snapshot generation failed: %v", snapErr)
	}

	result := &TransitionResult[T]{
		PreviousState: current,
		CurrentState:  next,
		Effects:       effects,
	}
	startReq := StartRequest[T]{
		ExecutionID:     executionID,
		MachineID:       s.machineID(),
		MachineVersion:  s.machineVersion(),
		EntityID:        entityID,
		Event:           event,
		TransitionID:    tr.ID,
		PreviousState:   current,
		CurrentState:    next,
		ExpectedState:   req.ExpectedState,
		ExpectedVersion: req.ExpectedVersion,
		ExecCtx:         req.ExecCtx,
		Result:          result,
		Snapshot:        snapshot,
		Msg:             req.Msg,
		Metadata:        copyMap(fields),
	}
	handle, orchestrationErr := s.orchestrator.Start(ctx, startReq)
	if orchestrationErr != nil {
		logger.Warn("orchestrator start failed after commit: %v", orchestrationErr)
		fields["orchestration_start_error"] = orchestrationErr.Error()
		fields["orchestration_degraded"] = true
		handle = s.newDegradedExecutionHandle(executionID, fields)
	}
	if handle != nil && strings.TrimSpace(handle.ExecutionID) != "" {
		executionID = strings.TrimSpace(handle.ExecutionID)
		fields["execution_id"] = executionID
		logger = withLoggerFields(logger, map[string]any{"execution_id": executionID})
	}
	if err := s.emitLifecycleEvent(ctx, s.newLifecycleEvent(req, fields, tr.ID, current, next, executionID, TransitionPhaseCommitted, nil)); err != nil {
		logger.Warn("committed lifecycle dispatch failed post-commit: %v", err)
	}

	return &ApplyEventResponse[T]{
		Transition: result,
		Snapshot:   snapshot,
		Execution:  handle,
	}, nil
}

// ExecutionStatus returns current orchestration status for an execution.
func (s *StateMachine[T]) ExecutionStatus(ctx context.Context, executionID string) (*ExecutionStatus, error) {
	executionID = strings.TrimSpace(executionID)
	if executionID == "" {
		return nil, cloneRuntimeError(
			ErrPreconditionFailed,
			"execution id is required",
			nil,
			s.executionControlMetadata(""),
		)
	}
	if s == nil || s.orchestrator == nil {
		return nil, cloneRuntimeError(
			ErrPreconditionFailed,
			"orchestrator not configured",
			nil,
			s.executionControlMetadata(executionID),
		)
	}
	status, err := s.orchestrator.Status(ctx, executionID)
	if err != nil {
		return nil, cloneRuntimeError(
			ErrPreconditionFailed,
			"failed to get execution status",
			err,
			s.executionControlMetadata(executionID),
		)
	}
	return status, nil
}

// PauseExecution pauses one orchestrated execution by identifier.
func (s *StateMachine[T]) PauseExecution(ctx context.Context, executionID string) error {
	return s.controlExecution(ctx, executionID, "pause", func(orc Orchestrator[T], id string) error {
		return orc.Pause(ctx, id)
	})
}

// ResumeExecution resumes one orchestrated execution by identifier.
func (s *StateMachine[T]) ResumeExecution(ctx context.Context, executionID string) error {
	return s.controlExecution(ctx, executionID, "resume", func(orc Orchestrator[T], id string) error {
		return orc.Resume(ctx, id)
	})
}

// StopExecution stops one orchestrated execution by identifier.
func (s *StateMachine[T]) StopExecution(ctx context.Context, executionID string) error {
	return s.controlExecution(ctx, executionID, "stop", func(orc Orchestrator[T], id string) error {
		return orc.Stop(ctx, id)
	})
}

// Snapshot returns transition metadata for the current entity state.
func (s *StateMachine[T]) Snapshot(ctx context.Context, req SnapshotRequest[T]) (*Snapshot, error) {
	entityID := strings.TrimSpace(req.EntityID)
	if entityID == "" {
		return nil, cloneRuntimeError(
			ErrPreconditionFailed,
			"entity id is required",
			nil,
			map[string]any{"machine_id": s.machineID()},
		)
	}

	rec, current, version, err := s.loadCurrentRecord(ctx, entityID, req.Msg)
	if err != nil {
		return nil, err
	}
	if err := s.validateMachinePin(rec, map[string]any{"machine_id": s.machineID(), "entity_id": entityID}); err != nil {
		return nil, err
	}
	return s.snapshotForState(ctx, req, current, version)
}

func (s *StateMachine[T]) snapshotForState(ctx context.Context, req SnapshotRequest[T], current string, version int) (*Snapshot, error) {
	current = normalizeState(current)
	allowed := make([]TransitionInfo, 0)
	for _, tr := range s.machine.Transitions {
		if normalizeState(tr.From) != current {
			continue
		}
		allowed = append(allowed, TransitionInfo{
			ID:       tr.ID,
			Event:    tr.Event,
			Target:   buildTargetInfo(ctx, tr, req.Msg, req.ExecCtx, s.machine),
			Metadata: copyMap(tr.Metadata),
		})
	}
	sort.Slice(allowed, func(i, j int) bool {
		if allowed[i].Event == allowed[j].Event {
			return allowed[i].ID < allowed[j].ID
		}
		return allowed[i].Event < allowed[j].Event
	})

	return &Snapshot{
		EntityID:           strings.TrimSpace(req.EntityID),
		CurrentState:       current,
		AllowedTransitions: allowed,
		Metadata: map[string]any{
			"machine_id":      s.machineID(),
			"machine_version": s.machineVersion(),
			"version":         version,
		},
	}, nil
}

func (s *StateMachine[T]) newLifecycleEvent(
	req ApplyEventRequest[T],
	fields map[string]any,
	transitionID string,
	previousState string,
	currentState string,
	executionID string,
	phase TransitionPhase,
	cause error,
) TransitionLifecycleEvent[T] {
	evt := TransitionLifecycleEvent[T]{
		Phase:           phase,
		MachineID:       s.machineID(),
		MachineVersion:  s.machineVersion(),
		EntityID:        strings.TrimSpace(req.EntityID),
		ExecutionID:     strings.TrimSpace(executionID),
		Event:           normalizeEvent(req.Event),
		TransitionID:    strings.TrimSpace(transitionID),
		PreviousState:   normalizeState(previousState),
		CurrentState:    normalizeState(currentState),
		ExpectedState:   normalizeState(req.ExpectedState),
		ExpectedVersion: req.ExpectedVersion,
		ExecCtx:         req.ExecCtx,
		Metadata:        copyMap(fields),
		OccurredAt:      time.Now().UTC(),
		Msg:             req.Msg,
	}
	if cause != nil {
		evt.ErrorCode = runtimeErrorCode(cause)
		evt.ErrorMessage = cause.Error()
		if evt.Metadata == nil {
			evt.Metadata = map[string]any{}
		}
		evt.Metadata["error_code"] = evt.ErrorCode
		evt.Metadata["error_message"] = evt.ErrorMessage
	}
	return evt
}

func (s *StateMachine[T]) emitLifecycleEvent(ctx context.Context, evt TransitionLifecycleEvent[T]) error {
	fields := map[string]any{
		"machine_id":      strings.TrimSpace(evt.MachineID),
		"machine_version": strings.TrimSpace(evt.MachineVersion),
		"entity_id":       strings.TrimSpace(evt.EntityID),
		"event":           normalizeEvent(evt.Event),
		"transition_id":   strings.TrimSpace(evt.TransitionID),
		"execution_id":    strings.TrimSpace(evt.ExecutionID),
		"phase":           string(evt.Phase),
	}
	logger := withLoggerFields(s.logger.WithContext(ctx), fields)
	if handler, ok := s.orchestrator.(LifecycleEventHandler[T]); ok {
		if err := handler.OnTransitionLifecycleEvent(ctx, cloneLifecycleEvent(evt)); err != nil {
			logger.Warn("lifecycle event dispatch failed: %v", err)
			return err
		}
		return nil
	}
	return fanoutLifecycleHooks(ctx, s.lifecycleHooks, evt, s.hookFailureMode, logger)
}

func (s *StateMachine[T]) loadCurrentRecord(ctx context.Context, entityID string, msg T) (*StateRecord, string, int, error) {
	rec, err := s.store.Load(ctx, entityID)
	if err != nil {
		return nil, "", 0, cloneRuntimeError(
			ErrPreconditionFailed,
			"failed to load state",
			err,
			map[string]any{"entity_id": entityID, "machine_id": s.machineID()},
		)
	}

	current := ""
	version := 0
	if rec != nil {
		current = rec.State
		version = rec.Version
	}
	if strings.TrimSpace(current) == "" && s.req.CurrentState != nil {
		current = s.req.CurrentState(msg)
	}
	if strings.TrimSpace(current) == "" && s.allowInitialFallback {
		current = s.initial
	}
	current = normalizeState(current)
	if current == "" {
		return rec, "", version, cloneRuntimeError(
			ErrStateNotFound,
			"current state missing",
			nil,
			map[string]any{"entity_id": entityID, "machine_id": s.machineID()},
		)
	}
	return rec, current, version, nil
}

func (s *StateMachine[T]) validateMachinePin(rec *StateRecord, fields map[string]any) error {
	if rec == nil {
		return nil
	}
	machineID := s.machineID()
	if rec.MachineID != "" && machineID != "" && rec.MachineID != machineID {
		meta := copyMap(fields)
		meta["record_machine_id"] = rec.MachineID
		meta["runtime_machine_id"] = machineID
		return cloneRuntimeError(ErrPreconditionFailed, "machine id mismatch", nil, meta)
	}
	machineVersion := s.machineVersion()
	if rec.MachineVersion != "" && machineVersion != "" && rec.MachineVersion != machineVersion {
		meta := copyMap(fields)
		meta["record_machine_version"] = rec.MachineVersion
		meta["runtime_machine_version"] = machineVersion
		return cloneRuntimeError(ErrPreconditionFailed, "machine version mismatch", nil, meta)
	}
	return nil
}

func (s *StateMachine[T]) compileEffects(msg T, tr CompiledTransition[T]) []Effect {
	if len(tr.Plan.Nodes) == 0 {
		return nil
	}
	payload := payloadFromMessage(msg)
	effects := make([]Effect, 0, len(tr.Plan.Nodes))
	for _, node := range tr.Plan.Nodes {
		if node.Kind != "step" || node.Step == nil {
			continue
		}
		effects = append(effects, CommandEffect{
			ActionID: node.Step.ActionID,
			Payload:  copyMap(payload),
			Async:    node.Step.Async,
			Delay:    node.Step.Delay,
			Timeout:  node.Step.Timeout,
			Metadata: copyMap(node.Step.Metadata),
		})
	}
	return effects
}

func effectsToOutbox(entityID, transitionID, event string, effects []Effect, fields map[string]any) []OutboxEntry {
	if len(effects) == 0 {
		return nil
	}
	executionID, _ := fields["execution_id"].(string)
	entries := make([]OutboxEntry, 0, len(effects))
	for _, effect := range effects {
		entries = append(entries, OutboxEntry{
			EntityID:     entityID,
			TransitionID: transitionID,
			ExecutionID:  strings.TrimSpace(executionID),
			Event:        event,
			Topic:        inferOutboxTopic(effect),
			Effect:       effect,
			Status:       "pending",
			Metadata:     copyMap(fields),
		})
	}
	return entries
}

func evaluateGuards[T any](
	ctx context.Context,
	guards []Guard[T],
	msg T,
	execCtx ExecutionContext,
	metadata map[string]any,
) error {
	for idx, guard := range guards {
		if guard == nil {
			continue
		}
		if err := guard(ctx, msg, execCtx); err != nil {
			message := fmt.Sprintf("guard[%d] rejected transition", idx)
			if !isGuardRejected(err) {
				message = fmt.Sprintf("guard[%d] failed", idx)
			}
			return cloneRuntimeError(ErrGuardRejected, message, err, metadata)
		}
	}
	return nil
}

func resolveTarget[T any](
	ctx context.Context,
	tr CompiledTransition[T],
	msg T,
	execCtx ExecutionContext,
	metadata map[string]any,
) (string, error) {
	if to := normalizeState(tr.To); to != "" {
		return to, nil
	}
	if tr.DynamicTo == nil {
		return "", cloneRuntimeError(ErrInvalidTransition, "dynamic target resolver not configured", nil, metadata)
	}
	to, err := tr.DynamicTo(ctx, msg, execCtx)
	if err != nil {
		return "", cloneRuntimeError(ErrInvalidTransition, "dynamic target resolution failed", err, metadata)
	}
	to = normalizeState(to)
	if to == "" {
		return "", cloneRuntimeError(ErrInvalidTransition, "dynamic target resolved to empty state", nil, metadata)
	}
	return to, nil
}

func buildTargetInfo[T any](
	ctx context.Context,
	tr CompiledTransition[T],
	msg T,
	execCtx ExecutionContext,
	machine *CompiledMachine[T],
) TargetInfo {
	if to := normalizeState(tr.To); to != "" {
		return TargetInfo{Kind: "static", To: to}
	}
	info := TargetInfo{
		Kind:       "dynamic",
		Resolver:   tr.DynamicResolver,
		Candidates: machineStateNames(machine),
	}
	if tr.DynamicTo == nil {
		return info
	}
	resolved, err := tr.DynamicTo(ctx, msg, execCtx)
	if err != nil {
		return info
	}
	resolved = normalizeState(resolved)
	if resolved == "" {
		return info
	}
	info.Resolved = true
	info.ResolvedTo = resolved
	return info
}

func machineStateNames[T any](machine *CompiledMachine[T]) []string {
	if machine == nil || len(machine.States) == 0 {
		return nil
	}
	states := make([]string, 0, len(machine.States))
	for _, st := range machine.States {
		if name := normalizeState(st.Name); name != "" {
			states = append(states, name)
		}
	}
	sort.Strings(states)
	return states
}

func payloadFromMessage[T any](msg T) map[string]any {
	raw, err := json.Marshal(msg)
	if err != nil {
		return map[string]any{"value": msg}
	}
	payload := map[string]any{}
	if err := json.Unmarshal(raw, &payload); err != nil || payload == nil {
		return map[string]any{"value": msg}
	}
	return payload
}

func resolveInitialState(states []State) string {
	for _, st := range states {
		if st.Initial {
			return normalizeState(st.Name)
		}
	}
	if len(states) == 0 {
		return ""
	}
	return normalizeState(states[0].Name)
}

func mergeRecordMetadata(base map[string]any, rec *StateRecord) map[string]any {
	out := copyMap(base)
	if out == nil {
		out = map[string]any{}
	}
	if rec == nil || len(rec.Metadata) == 0 {
		return out
	}
	for k, v := range rec.Metadata {
		if _, exists := out[k]; exists {
			continue
		}
		out[k] = v
	}
	return out
}

func (s *StateMachine[T]) machineID() string {
	if s.machine == nil {
		return s.entity
	}
	if id := strings.TrimSpace(s.machine.ID); id != "" {
		return id
	}
	return s.entity
}

func (s *StateMachine[T]) machineVersion() string {
	if s.machine == nil {
		return ""
	}
	return strings.TrimSpace(s.machine.Version)
}

func (s *StateMachine[T]) shouldPersistOutboxEffects() bool {
	return normalizeExecutionPolicy(s.policy) == ExecutionPolicyOrchestrated
}

func (s *StateMachine[T]) newDegradedExecutionHandle(executionID string, metadata map[string]any) *ExecutionHandle {
	policy := strings.TrimSpace(string(normalizeExecutionPolicy(s.policy)))
	if policy == "" {
		policy = strings.TrimSpace(string(s.policy))
	}
	return &ExecutionHandle{
		ExecutionID: strings.TrimSpace(executionID),
		Policy:      policy,
		Status:      ExecutionStateDegraded,
		Metadata:    copyMap(metadata),
	}
}

func (s *StateMachine[T]) controlExecution(
	ctx context.Context,
	executionID string,
	action string,
	exec func(Orchestrator[T], string) error,
) error {
	executionID = strings.TrimSpace(executionID)
	if executionID == "" {
		return cloneRuntimeError(
			ErrPreconditionFailed,
			"execution id is required",
			nil,
			s.executionControlMetadata(""),
		)
	}
	if s == nil || s.orchestrator == nil {
		return cloneRuntimeError(
			ErrPreconditionFailed,
			"orchestrator not configured",
			nil,
			s.executionControlMetadata(executionID),
		)
	}
	if err := exec(s.orchestrator, executionID); err != nil {
		return cloneRuntimeError(
			ErrPreconditionFailed,
			fmt.Sprintf("failed to %s execution", strings.TrimSpace(action)),
			err,
			s.executionControlMetadata(executionID),
		)
	}
	return nil
}

func (s *StateMachine[T]) executionControlMetadata(executionID string) map[string]any {
	metadata := map[string]any{
		"execution_id": strings.TrimSpace(executionID),
	}
	if s == nil {
		return metadata
	}
	metadata["machine_id"] = s.machineID()
	metadata["machine_version"] = s.machineVersion()
	return metadata
}

func transitionKey(state, event string) string {
	return state + "::" + event
}

func normalizeState(s string) string {
	return strings.ToLower(strings.TrimSpace(s))
}

func normalizeEvent(s string) string {
	return strings.ToLower(strings.TrimSpace(s))
}

func machineDefinitionFromConfig(cfg StateMachineConfig) *MachineDefinition {
	def := &MachineDefinition{
		ID:      strings.TrimSpace(cfg.Entity),
		Name:    strings.TrimSpace(cfg.Entity),
		Version: "v1",
	}
	for _, st := range cfg.States {
		def.States = append(def.States, StateDefinition{
			Name:     st.Name,
			Initial:  st.Initial,
			Terminal: st.Terminal,
		})
	}
	for _, tr := range cfg.Transitions {
		td := TransitionDefinition{
			ID:    fmt.Sprintf("%s::%s", normalizeState(tr.From), normalizeEvent(tr.Name)),
			Event: tr.Name,
			From:  tr.From,
			To:    tr.To,
		}
		if guard := strings.TrimSpace(tr.Guard); guard != "" {
			td.Guards = append(td.Guards, GuardDefinition{Type: "resolver", Ref: guard})
		}
		if action := strings.TrimSpace(tr.Action); action != "" {
			td.Workflow.Nodes = []WorkflowNodeDefinition{
				{
					ID:   action,
					Kind: "step",
					Step: &StepDefinition{ActionID: action},
				},
			}
		}
		def.Transitions = append(def.Transitions, td)
	}
	return def
}

type guardResolverAdapter[T any] struct {
	guards *GuardRegistry[T]
}

func (a guardResolverAdapter[T]) Guard(ref string) (Guard[T], bool) {
	if a.guards == nil {
		return nil, false
	}
	return a.guards.Lookup(ref)
}

func (a guardResolverAdapter[T]) DynamicTarget(string) (DynamicTargetResolver[T], bool) {
	return nil, false
}

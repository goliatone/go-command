package flow

import (
	"context"
	"fmt"
	"strings"

	"github.com/goliatone/go-command"
	cmdrpc "github.com/goliatone/go-command/rpc"
)

const (
	FSMRPCMethodApplyEvent       = "fsm.apply_event"
	FSMRPCMethodSnapshot         = "fsm.snapshot"
	FSMRPCMethodExecutionStatus  = "fsm.execution.status"
	FSMRPCMethodExecutionPause   = "fsm.execution.pause"
	FSMRPCMethodExecutionResume  = "fsm.execution.resume"
	FSMRPCMethodExecutionStop    = "fsm.execution.stop"
	FSMRPCMethodExecutionList    = "fsm.execution.list"
	FSMRPCMethodExecutionHistory = "fsm.execution.history"
)

// FSMApplyEventRequest is the RPC request data for fsm.apply_event.
type FSMApplyEventRequest[T command.Message] struct {
	MachineID       string         `json:"machineId,omitempty"`
	EntityID        string         `json:"entityId"`
	Event           string         `json:"event"`
	Msg             T              `json:"msg"`
	ExpectedState   string         `json:"expectedState,omitempty"`
	ExpectedVersion int            `json:"expectedVersion,omitempty"`
	IdempotencyKey  string         `json:"idempotencyKey,omitempty"`
	Metadata        map[string]any `json:"metadata,omitempty"`
	DryRun          bool           `json:"dryRun,omitempty"`
}

// FSMSnapshotRequest is the RPC request data for fsm.snapshot.
type FSMSnapshotRequest[T command.Message] struct {
	MachineID      string `json:"machineId,omitempty"`
	EntityID       string `json:"entityId"`
	Msg            T      `json:"msg"`
	EvaluateGuards bool   `json:"evaluateGuards,omitempty"`
	IncludeBlocked bool   `json:"includeBlocked,omitempty"`
}

// FSMExecutionScope constrains execution query/control handlers.
type FSMExecutionScope struct {
	MachineID   string `json:"machineId,omitempty"`
	EntityID    string `json:"entityId,omitempty"`
	ExecutionID string `json:"executionId,omitempty"`
	Tenant      string `json:"tenant,omitempty"`
}

// FSMExecutionControlRequest is the RPC request data for execution control/status methods.
type FSMExecutionControlRequest struct {
	MachineID   string `json:"machineId,omitempty"`
	EntityID    string `json:"entityId,omitempty"`
	ExecutionID string `json:"executionId"`
	Tenant      string `json:"tenant,omitempty"`
}

// FSMExecutionListRequest is the RPC request data for execution list queries.
type FSMExecutionListRequest struct {
	MachineID   string `json:"machineId,omitempty"`
	EntityID    string `json:"entityId,omitempty"`
	ExecutionID string `json:"executionId,omitempty"`
	Tenant      string `json:"tenant,omitempty"`
}

// FSMExecutionListResponse is the response payload for fsm.execution.list.
type FSMExecutionListResponse struct {
	Items []ExecutionStatus `json:"items"`
}

// FSMExecutionHistoryRequest is the RPC request data for execution history queries.
type FSMExecutionHistoryRequest struct {
	MachineID   string `json:"machineId,omitempty"`
	EntityID    string `json:"entityId,omitempty"`
	ExecutionID string `json:"executionId,omitempty"`
	Tenant      string `json:"tenant,omitempty"`
}

// FSMExecutionHistoryResponse is the response payload for fsm.execution.history.
type FSMExecutionHistoryResponse[T command.Message] struct {
	Items []TransitionLifecycleEvent[T] `json:"items"`
}

// FSMApplyEventRPCCommand provides the fsm.apply_event method.
type FSMApplyEventRPCCommand[T command.Message] struct {
	Machine *StateMachine[T]
	Spec    cmdrpc.EndpointSpec
}

func NewFSMApplyEventRPCCommand[T command.Message](machine *StateMachine[T]) *FSMApplyEventRPCCommand[T] {
	return &FSMApplyEventRPCCommand[T]{
		Machine: machine,
		Spec: cmdrpc.EndpointSpec{
			Method: FSMRPCMethodApplyEvent,
		},
	}
}

func (c *FSMApplyEventRPCCommand[T]) Query(
	ctx context.Context,
	req cmdrpc.RequestEnvelope[FSMApplyEventRequest[T]],
) (cmdrpc.ResponseEnvelope[*ApplyEventResponse[T]], error) {
	machine, err := c.stateMachine()
	if err != nil {
		return cmdrpc.ResponseEnvelope[*ApplyEventResponse[T]]{}, err
	}
	applyReq := ApplyEventRequest[T]{
		MachineID:       strings.TrimSpace(req.Data.MachineID),
		EntityID:        strings.TrimSpace(req.Data.EntityID),
		Event:           req.Data.Event,
		Msg:             req.Data.Msg,
		ExecCtx:         executionContextFromRPCMeta(req.Meta),
		ExpectedState:   req.Data.ExpectedState,
		ExpectedVersion: req.Data.ExpectedVersion,
		IdempotencyKey:  strings.TrimSpace(req.Data.IdempotencyKey),
		Metadata:        mergeFields(copyMap(req.Data.Metadata), metadataFromRPCMeta(req.Meta)),
		DryRun:          req.Data.DryRun,
	}
	result, err := machine.ApplyEvent(ctx, applyReq)
	if err != nil {
		return cmdrpc.ResponseEnvelope[*ApplyEventResponse[T]]{}, err
	}
	return cmdrpc.ResponseEnvelope[*ApplyEventResponse[T]]{Data: result}, nil
}

func (c *FSMApplyEventRPCCommand[T]) RPCEndpoints() []cmdrpc.EndpointDefinition {
	return []cmdrpc.EndpointDefinition{
		cmdrpc.NewEndpoint[FSMApplyEventRequest[T], *ApplyEventResponse[T]](
			normalizeFSMEndpointSpec(c.Spec, FSMRPCMethodApplyEvent, cmdrpc.MethodKindCommand),
			c.Query,
		),
	}
}

// FSMSnapshotRPCCommand provides the fsm.snapshot method.
type FSMSnapshotRPCCommand[T command.Message] struct {
	Machine *StateMachine[T]
	Spec    cmdrpc.EndpointSpec
}

func NewFSMSnapshotRPCCommand[T command.Message](machine *StateMachine[T]) *FSMSnapshotRPCCommand[T] {
	return &FSMSnapshotRPCCommand[T]{
		Machine: machine,
		Spec: cmdrpc.EndpointSpec{
			Method:     FSMRPCMethodSnapshot,
			Idempotent: true,
		},
	}
}

func (c *FSMSnapshotRPCCommand[T]) Query(
	ctx context.Context,
	req cmdrpc.RequestEnvelope[FSMSnapshotRequest[T]],
) (cmdrpc.ResponseEnvelope[*Snapshot], error) {
	machine, err := c.stateMachine()
	if err != nil {
		return cmdrpc.ResponseEnvelope[*Snapshot]{}, err
	}
	out, err := machine.Snapshot(ctx, SnapshotRequest[T]{
		MachineID:      strings.TrimSpace(req.Data.MachineID),
		EntityID:       strings.TrimSpace(req.Data.EntityID),
		Msg:            req.Data.Msg,
		ExecCtx:        executionContextFromRPCMeta(req.Meta),
		EvaluateGuards: req.Data.EvaluateGuards,
		IncludeBlocked: req.Data.IncludeBlocked,
	})
	if err != nil {
		return cmdrpc.ResponseEnvelope[*Snapshot]{}, err
	}
	return cmdrpc.ResponseEnvelope[*Snapshot]{Data: out}, nil
}

func (c *FSMSnapshotRPCCommand[T]) RPCEndpoints() []cmdrpc.EndpointDefinition {
	return []cmdrpc.EndpointDefinition{
		cmdrpc.NewEndpoint[FSMSnapshotRequest[T], *Snapshot](
			normalizeFSMEndpointSpec(c.Spec, FSMRPCMethodSnapshot, cmdrpc.MethodKindQuery),
			c.Query,
		),
	}
}

// FSMExecutionStatusRPCCommand provides the fsm.execution.status method.
type FSMExecutionStatusRPCCommand[T command.Message] struct {
	Machine *StateMachine[T]
	Spec    cmdrpc.EndpointSpec
}

func NewFSMExecutionStatusRPCCommand[T command.Message](machine *StateMachine[T]) *FSMExecutionStatusRPCCommand[T] {
	return &FSMExecutionStatusRPCCommand[T]{
		Machine: machine,
		Spec: cmdrpc.EndpointSpec{
			Method:     FSMRPCMethodExecutionStatus,
			Idempotent: true,
		},
	}
}

func (c *FSMExecutionStatusRPCCommand[T]) Query(
	ctx context.Context,
	req cmdrpc.RequestEnvelope[FSMExecutionControlRequest],
) (cmdrpc.ResponseEnvelope[*ExecutionStatus], error) {
	machine, err := c.stateMachine()
	if err != nil {
		return cmdrpc.ResponseEnvelope[*ExecutionStatus]{}, err
	}
	scope := executionScopeFromRPCScope(controlRequestScope(req.Data), req.Meta)
	out, err := loadScopedExecutionStatus(ctx, machine, scope, "status")
	if err != nil {
		return cmdrpc.ResponseEnvelope[*ExecutionStatus]{}, err
	}
	return cmdrpc.ResponseEnvelope[*ExecutionStatus]{
		Data: decorateExecutionStatusForRPC(out, scope, req.Meta),
	}, nil
}

func (c *FSMExecutionStatusRPCCommand[T]) RPCEndpoints() []cmdrpc.EndpointDefinition {
	return []cmdrpc.EndpointDefinition{
		cmdrpc.NewEndpoint[FSMExecutionControlRequest, *ExecutionStatus](
			normalizeFSMEndpointSpec(c.Spec, FSMRPCMethodExecutionStatus, cmdrpc.MethodKindQuery),
			c.Query,
		),
	}
}

// FSMExecutionPauseRPCCommand provides the fsm.execution.pause method.
type FSMExecutionPauseRPCCommand[T command.Message] struct {
	Machine *StateMachine[T]
	Spec    cmdrpc.EndpointSpec
}

func NewFSMExecutionPauseRPCCommand[T command.Message](machine *StateMachine[T]) *FSMExecutionPauseRPCCommand[T] {
	return &FSMExecutionPauseRPCCommand[T]{
		Machine: machine,
		Spec: cmdrpc.EndpointSpec{
			Method: FSMRPCMethodExecutionPause,
		},
	}
}

func (c *FSMExecutionPauseRPCCommand[T]) Query(
	ctx context.Context,
	req cmdrpc.RequestEnvelope[FSMExecutionControlRequest],
) (cmdrpc.ResponseEnvelope[*ExecutionStatus], error) {
	machine, err := c.stateMachine()
	if err != nil {
		return cmdrpc.ResponseEnvelope[*ExecutionStatus]{}, err
	}
	scope := executionScopeFromRPCScope(controlRequestScope(req.Data), req.Meta)
	if _, err := loadScopedExecutionStatus(ctx, machine, scope, "pause"); err != nil {
		return cmdrpc.ResponseEnvelope[*ExecutionStatus]{}, err
	}
	if err := machine.PauseExecution(ctx, scope.ExecutionID); err != nil {
		return cmdrpc.ResponseEnvelope[*ExecutionStatus]{}, err
	}
	out, err := loadScopedExecutionStatus(ctx, machine, scope, "pause")
	if err != nil {
		return cmdrpc.ResponseEnvelope[*ExecutionStatus]{}, err
	}
	return cmdrpc.ResponseEnvelope[*ExecutionStatus]{
		Data: decorateExecutionStatusForRPC(out, scope, req.Meta),
	}, nil
}

func (c *FSMExecutionPauseRPCCommand[T]) RPCEndpoints() []cmdrpc.EndpointDefinition {
	return []cmdrpc.EndpointDefinition{
		cmdrpc.NewEndpoint[FSMExecutionControlRequest, *ExecutionStatus](
			normalizeFSMEndpointSpec(c.Spec, FSMRPCMethodExecutionPause, cmdrpc.MethodKindCommand),
			c.Query,
		),
	}
}

// FSMExecutionResumeRPCCommand provides the fsm.execution.resume method.
type FSMExecutionResumeRPCCommand[T command.Message] struct {
	Machine *StateMachine[T]
	Spec    cmdrpc.EndpointSpec
}

func NewFSMExecutionResumeRPCCommand[T command.Message](machine *StateMachine[T]) *FSMExecutionResumeRPCCommand[T] {
	return &FSMExecutionResumeRPCCommand[T]{
		Machine: machine,
		Spec: cmdrpc.EndpointSpec{
			Method: FSMRPCMethodExecutionResume,
		},
	}
}

func (c *FSMExecutionResumeRPCCommand[T]) Query(
	ctx context.Context,
	req cmdrpc.RequestEnvelope[FSMExecutionControlRequest],
) (cmdrpc.ResponseEnvelope[*ExecutionStatus], error) {
	machine, err := c.stateMachine()
	if err != nil {
		return cmdrpc.ResponseEnvelope[*ExecutionStatus]{}, err
	}
	scope := executionScopeFromRPCScope(controlRequestScope(req.Data), req.Meta)
	if _, err := loadScopedExecutionStatus(ctx, machine, scope, "resume"); err != nil {
		return cmdrpc.ResponseEnvelope[*ExecutionStatus]{}, err
	}
	if err := machine.ResumeExecution(ctx, scope.ExecutionID); err != nil {
		return cmdrpc.ResponseEnvelope[*ExecutionStatus]{}, err
	}
	out, err := loadScopedExecutionStatus(ctx, machine, scope, "resume")
	if err != nil {
		return cmdrpc.ResponseEnvelope[*ExecutionStatus]{}, err
	}
	return cmdrpc.ResponseEnvelope[*ExecutionStatus]{
		Data: decorateExecutionStatusForRPC(out, scope, req.Meta),
	}, nil
}

func (c *FSMExecutionResumeRPCCommand[T]) RPCEndpoints() []cmdrpc.EndpointDefinition {
	return []cmdrpc.EndpointDefinition{
		cmdrpc.NewEndpoint[FSMExecutionControlRequest, *ExecutionStatus](
			normalizeFSMEndpointSpec(c.Spec, FSMRPCMethodExecutionResume, cmdrpc.MethodKindCommand),
			c.Query,
		),
	}
}

// FSMExecutionStopRPCCommand provides the fsm.execution.stop method.
type FSMExecutionStopRPCCommand[T command.Message] struct {
	Machine *StateMachine[T]
	Spec    cmdrpc.EndpointSpec
}

func NewFSMExecutionStopRPCCommand[T command.Message](machine *StateMachine[T]) *FSMExecutionStopRPCCommand[T] {
	return &FSMExecutionStopRPCCommand[T]{
		Machine: machine,
		Spec: cmdrpc.EndpointSpec{
			Method: FSMRPCMethodExecutionStop,
		},
	}
}

func (c *FSMExecutionStopRPCCommand[T]) Query(
	ctx context.Context,
	req cmdrpc.RequestEnvelope[FSMExecutionControlRequest],
) (cmdrpc.ResponseEnvelope[*ExecutionStatus], error) {
	machine, err := c.stateMachine()
	if err != nil {
		return cmdrpc.ResponseEnvelope[*ExecutionStatus]{}, err
	}
	scope := executionScopeFromRPCScope(controlRequestScope(req.Data), req.Meta)
	if _, err := loadScopedExecutionStatus(ctx, machine, scope, "stop"); err != nil {
		return cmdrpc.ResponseEnvelope[*ExecutionStatus]{}, err
	}
	if err := machine.StopExecution(ctx, scope.ExecutionID); err != nil {
		return cmdrpc.ResponseEnvelope[*ExecutionStatus]{}, err
	}
	out, err := loadScopedExecutionStatus(ctx, machine, scope, "stop")
	if err != nil {
		return cmdrpc.ResponseEnvelope[*ExecutionStatus]{}, err
	}
	return cmdrpc.ResponseEnvelope[*ExecutionStatus]{
		Data: decorateExecutionStatusForRPC(out, scope, req.Meta),
	}, nil
}

func (c *FSMExecutionStopRPCCommand[T]) RPCEndpoints() []cmdrpc.EndpointDefinition {
	return []cmdrpc.EndpointDefinition{
		cmdrpc.NewEndpoint[FSMExecutionControlRequest, *ExecutionStatus](
			normalizeFSMEndpointSpec(c.Spec, FSMRPCMethodExecutionStop, cmdrpc.MethodKindCommand),
			c.Query,
		),
	}
}

// FSMExecutionListRPCCommand provides the fsm.execution.list method.
type FSMExecutionListRPCCommand[T command.Message] struct {
	Machine *StateMachine[T]
	Spec    cmdrpc.EndpointSpec
}

func NewFSMExecutionListRPCCommand[T command.Message](machine *StateMachine[T]) *FSMExecutionListRPCCommand[T] {
	return &FSMExecutionListRPCCommand[T]{
		Machine: machine,
		Spec: cmdrpc.EndpointSpec{
			Method:     FSMRPCMethodExecutionList,
			Idempotent: true,
		},
	}
}

func (c *FSMExecutionListRPCCommand[T]) Query(
	ctx context.Context,
	req cmdrpc.RequestEnvelope[FSMExecutionListRequest],
) (cmdrpc.ResponseEnvelope[FSMExecutionListResponse], error) {
	machine, err := c.stateMachine()
	if err != nil {
		return cmdrpc.ResponseEnvelope[FSMExecutionListResponse]{}, err
	}
	scope := executionScopeFromRPCScope(listRequestScope(req.Data), req.Meta)
	statuses, err := machine.ExecutionList(ctx, scope.toExecutionScope())
	if err != nil {
		return cmdrpc.ResponseEnvelope[FSMExecutionListResponse]{}, err
	}
	items := make([]ExecutionStatus, 0, len(statuses))
	for _, status := range statuses {
		cp := status
		decorated := decorateExecutionStatusForRPC(&cp, scope, req.Meta)
		if decorated == nil {
			continue
		}
		items = append(items, *decorated)
	}
	return cmdrpc.ResponseEnvelope[FSMExecutionListResponse]{
		Data: FSMExecutionListResponse{Items: items},
	}, nil
}

func (c *FSMExecutionListRPCCommand[T]) RPCEndpoints() []cmdrpc.EndpointDefinition {
	return []cmdrpc.EndpointDefinition{
		cmdrpc.NewEndpoint[FSMExecutionListRequest, FSMExecutionListResponse](
			normalizeFSMEndpointSpec(c.Spec, FSMRPCMethodExecutionList, cmdrpc.MethodKindQuery),
			c.Query,
		),
	}
}

// FSMExecutionHistoryRPCCommand provides the fsm.execution.history method.
type FSMExecutionHistoryRPCCommand[T command.Message] struct {
	Machine *StateMachine[T]
	Spec    cmdrpc.EndpointSpec
}

func NewFSMExecutionHistoryRPCCommand[T command.Message](machine *StateMachine[T]) *FSMExecutionHistoryRPCCommand[T] {
	return &FSMExecutionHistoryRPCCommand[T]{
		Machine: machine,
		Spec: cmdrpc.EndpointSpec{
			Method:     FSMRPCMethodExecutionHistory,
			Idempotent: true,
		},
	}
}

func (c *FSMExecutionHistoryRPCCommand[T]) Query(
	ctx context.Context,
	req cmdrpc.RequestEnvelope[FSMExecutionHistoryRequest],
) (cmdrpc.ResponseEnvelope[FSMExecutionHistoryResponse[T]], error) {
	machine, err := c.stateMachine()
	if err != nil {
		return cmdrpc.ResponseEnvelope[FSMExecutionHistoryResponse[T]]{}, err
	}
	scope := executionScopeFromRPCScope(historyRequestScope(req.Data), req.Meta)
	events, err := machine.ExecutionHistory(ctx, scope.toExecutionScope())
	if err != nil {
		return cmdrpc.ResponseEnvelope[FSMExecutionHistoryResponse[T]]{}, err
	}
	out := make([]TransitionLifecycleEvent[T], 0, len(events))
	for _, evt := range events {
		evt.Metadata = mergeFields(copyMap(evt.Metadata), controlRequestTelemetry(scope, req.Meta))
		out = append(out, evt)
	}
	return cmdrpc.ResponseEnvelope[FSMExecutionHistoryResponse[T]]{
		Data: FSMExecutionHistoryResponse[T]{Items: out},
	}, nil
}

func (c *FSMExecutionHistoryRPCCommand[T]) RPCEndpoints() []cmdrpc.EndpointDefinition {
	return []cmdrpc.EndpointDefinition{
		cmdrpc.NewEndpoint[FSMExecutionHistoryRequest, FSMExecutionHistoryResponse[T]](
			normalizeFSMEndpointSpec(c.Spec, FSMRPCMethodExecutionHistory, cmdrpc.MethodKindQuery),
			c.Query,
		),
	}
}

// NewFSMRPCCommands returns the full FSM RPC method family as registry commands.
func NewFSMRPCCommands[T command.Message](machine *StateMachine[T]) []any {
	return []any{
		NewFSMApplyEventRPCCommand(machine),
		NewFSMSnapshotRPCCommand(machine),
		NewFSMExecutionStatusRPCCommand(machine),
		NewFSMExecutionPauseRPCCommand(machine),
		NewFSMExecutionResumeRPCCommand(machine),
		NewFSMExecutionStopRPCCommand(machine),
		NewFSMExecutionListRPCCommand(machine),
		NewFSMExecutionHistoryRPCCommand(machine),
	}
}

// RegisterFSMRPCCommands registers the full FSM method family into a command registry.
func RegisterFSMRPCCommands[T command.Message](registry *command.Registry, machine *StateMachine[T]) error {
	if registry == nil {
		return fmt.Errorf("registry is required")
	}
	for _, cmd := range NewFSMRPCCommands(machine) {
		if err := registry.RegisterCommand(cmd); err != nil {
			return err
		}
	}
	return nil
}

func normalizeFSMEndpointSpec(spec cmdrpc.EndpointSpec, method string, kind cmdrpc.MethodKind) cmdrpc.EndpointSpec {
	spec.Method = strings.TrimSpace(spec.Method)
	if spec.Method == "" {
		spec.Method = method
	}
	if spec.Kind == "" {
		spec.Kind = kind
	}
	spec.Permissions = append([]string(nil), spec.Permissions...)
	spec.Roles = append([]string(nil), spec.Roles...)
	spec.Tags = append([]string(nil), spec.Tags...)
	return spec
}

func executionContextFromRPCMeta(meta cmdrpc.RequestMeta) ExecutionContext {
	return ExecutionContext{
		ActorID: strings.TrimSpace(meta.ActorID),
		Roles:   append([]string(nil), meta.Roles...),
		Tenant:  strings.TrimSpace(meta.Tenant),
	}
}

func metadataFromRPCMeta(meta cmdrpc.RequestMeta) map[string]any {
	metadata := map[string]any{}
	if actorID := strings.TrimSpace(meta.ActorID); actorID != "" {
		metadata["actor_id"] = actorID
	}
	if tenant := strings.TrimSpace(meta.Tenant); tenant != "" {
		metadata["tenant"] = tenant
	}
	if requestID := strings.TrimSpace(meta.RequestID); requestID != "" {
		metadata["request_id"] = requestID
	}
	if correlationID := strings.TrimSpace(meta.CorrelationID); correlationID != "" {
		metadata["correlation_id"] = correlationID
	}
	if len(metadata) == 0 {
		return nil
	}
	return metadata
}

func controlRequestScope(req FSMExecutionControlRequest) FSMExecutionScope {
	return FSMExecutionScope{
		MachineID:   req.MachineID,
		EntityID:    req.EntityID,
		ExecutionID: req.ExecutionID,
		Tenant:      req.Tenant,
	}
}

func listRequestScope(req FSMExecutionListRequest) FSMExecutionScope {
	return FSMExecutionScope{
		MachineID:   req.MachineID,
		EntityID:    req.EntityID,
		ExecutionID: req.ExecutionID,
		Tenant:      req.Tenant,
	}
}

func historyRequestScope(req FSMExecutionHistoryRequest) FSMExecutionScope {
	return FSMExecutionScope{
		MachineID:   req.MachineID,
		EntityID:    req.EntityID,
		ExecutionID: req.ExecutionID,
		Tenant:      req.Tenant,
	}
}

func executionScopeFromRPCScope(scope FSMExecutionScope, meta cmdrpc.RequestMeta) FSMExecutionScope {
	scope.MachineID = strings.TrimSpace(scope.MachineID)
	scope.EntityID = strings.TrimSpace(scope.EntityID)
	scope.ExecutionID = strings.TrimSpace(scope.ExecutionID)
	scope.Tenant = strings.TrimSpace(scope.Tenant)
	if scope.Tenant == "" {
		scope.Tenant = strings.TrimSpace(meta.Tenant)
	}
	return scope
}

func (scope FSMExecutionScope) toExecutionScope() ExecutionScope {
	scope = executionScopeFromRPCScope(scope, cmdrpc.RequestMeta{})
	return ExecutionScope{
		MachineID:   scope.MachineID,
		EntityID:    scope.EntityID,
		ExecutionID: scope.ExecutionID,
		Tenant:      scope.Tenant,
	}
}

func (scope FSMExecutionScope) metadata() map[string]any {
	scope = executionScopeFromRPCScope(scope, cmdrpc.RequestMeta{})
	return map[string]any{
		"scope_machine_id":   scope.MachineID,
		"scope_entity_id":    scope.EntityID,
		"scope_execution_id": scope.ExecutionID,
		"scope_tenant":       scope.Tenant,
	}
}

func controlRequestTelemetry(scope FSMExecutionScope, meta cmdrpc.RequestMeta) map[string]any {
	telemetry := copyMap(scope.metadata())
	if telemetry == nil {
		telemetry = map[string]any{}
	}
	if actorID := strings.TrimSpace(meta.ActorID); actorID != "" {
		telemetry["query_actor_id"] = actorID
	}
	if tenant := strings.TrimSpace(meta.Tenant); tenant != "" {
		telemetry["query_tenant"] = tenant
	}
	if requestID := strings.TrimSpace(meta.RequestID); requestID != "" {
		telemetry["query_request_id"] = requestID
	}
	if correlationID := strings.TrimSpace(meta.CorrelationID); correlationID != "" {
		telemetry["query_correlation_id"] = correlationID
	}
	return telemetry
}

func decorateExecutionStatusForRPC(status *ExecutionStatus, scope FSMExecutionScope, meta cmdrpc.RequestMeta) *ExecutionStatus {
	if status == nil {
		return nil
	}
	out := *status
	out.Metadata = mergeFields(copyMap(status.Metadata), controlRequestTelemetry(scope, meta))
	return &out
}

func loadScopedExecutionStatus[T command.Message](
	ctx context.Context,
	machine *StateMachine[T],
	scope FSMExecutionScope,
	action string,
) (*ExecutionStatus, error) {
	scope = executionScopeFromRPCScope(scope, cmdrpc.RequestMeta{})
	status, err := machine.ExecutionStatus(ctx, scope.ExecutionID)
	if err != nil {
		return nil, err
	}
	if err := validateExecutionStatusScope(scope, status, machine.machineID(), action); err != nil {
		return nil, err
	}
	return status, nil
}

func validateExecutionStatusScope(
	scope FSMExecutionScope,
	status *ExecutionStatus,
	runtimeMachineID string,
	action string,
) error {
	scope = executionScopeFromRPCScope(scope, cmdrpc.RequestMeta{})
	if status == nil {
		return cloneRuntimeError(
			ErrPreconditionFailed,
			fmt.Sprintf("cannot %s execution: status not found", strings.TrimSpace(action)),
			nil,
			scope.metadata(),
		)
	}
	if scope.ExecutionID != "" && strings.TrimSpace(status.ExecutionID) != scope.ExecutionID {
		metadata := mergeFields(scope.metadata(), map[string]any{
			"actual_execution_id": strings.TrimSpace(status.ExecutionID),
		})
		return cloneRuntimeError(
			ErrPreconditionFailed,
			fmt.Sprintf("cannot %s execution: execution scope mismatch", strings.TrimSpace(action)),
			nil,
			metadata,
		)
	}
	metadata := copyMap(status.Metadata)

	if expected := strings.TrimSpace(scope.MachineID); expected != "" {
		actual := strings.TrimSpace(readStringFromMetadata(metadata, "machine_id"))
		if actual == "" {
			actual = strings.TrimSpace(runtimeMachineID)
		}
		if expected != actual {
			return cloneRuntimeError(
				ErrPreconditionFailed,
				fmt.Sprintf("cannot %s execution: machine scope mismatch", strings.TrimSpace(action)),
				nil,
				mergeFields(scope.metadata(), map[string]any{"actual_machine_id": actual}),
			)
		}
	}
	if expected := strings.TrimSpace(scope.EntityID); expected != "" {
		actual := strings.TrimSpace(readStringFromMetadata(metadata, "entity_id"))
		if expected != actual {
			return cloneRuntimeError(
				ErrPreconditionFailed,
				fmt.Sprintf("cannot %s execution: entity scope mismatch", strings.TrimSpace(action)),
				nil,
				mergeFields(scope.metadata(), map[string]any{"actual_entity_id": actual}),
			)
		}
	}
	if expected := strings.TrimSpace(scope.Tenant); expected != "" {
		actual := strings.TrimSpace(readStringFromMetadata(metadata, "tenant"))
		if expected != actual {
			return cloneRuntimeError(
				ErrPreconditionFailed,
				fmt.Sprintf("cannot %s execution: tenant scope mismatch", strings.TrimSpace(action)),
				nil,
				mergeFields(scope.metadata(), map[string]any{"actual_tenant": actual}),
			)
		}
	}
	return nil
}

func (c *FSMApplyEventRPCCommand[T]) stateMachine() (*StateMachine[T], error) {
	if c == nil || c.Machine == nil {
		return nil, cloneRuntimeError(ErrPreconditionFailed, "state machine not configured", nil, nil)
	}
	return c.Machine, nil
}

func (c *FSMSnapshotRPCCommand[T]) stateMachine() (*StateMachine[T], error) {
	if c == nil || c.Machine == nil {
		return nil, cloneRuntimeError(ErrPreconditionFailed, "state machine not configured", nil, nil)
	}
	return c.Machine, nil
}

func (c *FSMExecutionStatusRPCCommand[T]) stateMachine() (*StateMachine[T], error) {
	if c == nil || c.Machine == nil {
		return nil, cloneRuntimeError(ErrPreconditionFailed, "state machine not configured", nil, nil)
	}
	return c.Machine, nil
}

func (c *FSMExecutionPauseRPCCommand[T]) stateMachine() (*StateMachine[T], error) {
	if c == nil || c.Machine == nil {
		return nil, cloneRuntimeError(ErrPreconditionFailed, "state machine not configured", nil, nil)
	}
	return c.Machine, nil
}

func (c *FSMExecutionResumeRPCCommand[T]) stateMachine() (*StateMachine[T], error) {
	if c == nil || c.Machine == nil {
		return nil, cloneRuntimeError(ErrPreconditionFailed, "state machine not configured", nil, nil)
	}
	return c.Machine, nil
}

func (c *FSMExecutionStopRPCCommand[T]) stateMachine() (*StateMachine[T], error) {
	if c == nil || c.Machine == nil {
		return nil, cloneRuntimeError(ErrPreconditionFailed, "state machine not configured", nil, nil)
	}
	return c.Machine, nil
}

func (c *FSMExecutionListRPCCommand[T]) stateMachine() (*StateMachine[T], error) {
	if c == nil || c.Machine == nil {
		return nil, cloneRuntimeError(ErrPreconditionFailed, "state machine not configured", nil, nil)
	}
	return c.Machine, nil
}

func (c *FSMExecutionHistoryRPCCommand[T]) stateMachine() (*StateMachine[T], error) {
	if c == nil || c.Machine == nil {
		return nil, cloneRuntimeError(ErrPreconditionFailed, "state machine not configured", nil, nil)
	}
	return c.Machine, nil
}

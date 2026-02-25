package flow

import (
	"context"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"github.com/goliatone/go-command"
	"github.com/goliatone/go-command/rpc"
)

func TestFSMRPCMethodFamilyRegistration(t *testing.T) {
	sm := buildFSMRPCStateMachine(t, nil)
	server := rpc.NewServer(rpc.WithFailureMode(rpc.FailureModeRecover))
	registry := command.NewRegistry()
	require.NoError(t, registry.AddResolver("rpc-explicit", rpc.Resolver(server)))

	require.NoError(t, RegisterFSMRPCCommands(registry, sm))
	require.NoError(t, registry.Initialize())

	endpoints := server.Endpoints()
	require.Len(t, endpoints, 8)
	assert.Equal(t, []string{
		FSMRPCMethodApplyEvent,
		FSMRPCMethodExecutionHistory,
		FSMRPCMethodExecutionList,
		FSMRPCMethodExecutionPause,
		FSMRPCMethodExecutionResume,
		FSMRPCMethodExecutionStatus,
		FSMRPCMethodExecutionStop,
		FSMRPCMethodSnapshot,
	}, []string{
		endpoints[0].Method,
		endpoints[1].Method,
		endpoints[2].Method,
		endpoints[3].Method,
		endpoints[4].Method,
		endpoints[5].Method,
		endpoints[6].Method,
		endpoints[7].Method,
	})

	apply, ok := server.Endpoint(FSMRPCMethodApplyEvent)
	require.True(t, ok)
	assert.Equal(t, rpc.HandlerKindExecute, apply.HandlerKind)
	require.NotNil(t, apply.RequestType)
	assert.Contains(t, apply.RequestType.GoType, "RequestEnvelope")

	pause, ok := server.Endpoint(FSMRPCMethodExecutionPause)
	require.True(t, ok)
	assert.Equal(t, rpc.HandlerKindExecute, pause.HandlerKind)

	resume, ok := server.Endpoint(FSMRPCMethodExecutionResume)
	require.True(t, ok)
	assert.Equal(t, rpc.HandlerKindExecute, resume.HandlerKind)

	stop, ok := server.Endpoint(FSMRPCMethodExecutionStop)
	require.True(t, ok)
	assert.Equal(t, rpc.HandlerKindExecute, stop.HandlerKind)

	status, ok := server.Endpoint(FSMRPCMethodExecutionStatus)
	require.True(t, ok)
	assert.Equal(t, rpc.HandlerKindQuery, status.HandlerKind)

	list, ok := server.Endpoint(FSMRPCMethodExecutionList)
	require.True(t, ok)
	assert.Equal(t, rpc.HandlerKindQuery, list.HandlerKind)

	history, ok := server.Endpoint(FSMRPCMethodExecutionHistory)
	require.True(t, ok)
	assert.Equal(t, rpc.HandlerKindQuery, history.HandlerKind)

	snapshot, ok := server.Endpoint(FSMRPCMethodSnapshot)
	require.True(t, ok)
	require.NotNil(t, snapshot.RequestType)
	assert.Contains(t, snapshot.RequestType.GoType, "RequestEnvelope")
	assert.Equal(t, rpc.HandlerKindQuery, snapshot.HandlerKind)
	assert.True(t, snapshot.Idempotent)
}

func TestFSMRPCMethodFamilyRegistrationWithExplicitResolver(t *testing.T) {
	sm := buildFSMRPCStateMachine(t, nil)
	server := rpc.NewServer(rpc.WithFailureMode(rpc.FailureModeRecover))
	registry := command.NewRegistry()
	require.NoError(t, registry.AddResolver("rpc-explicit", rpc.Resolver(server)))

	require.NoError(t, RegisterFSMRPCCommands(registry, sm))
	require.NoError(t, registry.Initialize())

	endpoints := server.Endpoints()
	require.Len(t, endpoints, 8)
}

func TestFSMRPCApplyEventEnvelopeExecutionControlsAndQuerySurfaces(t *testing.T) {
	sm := buildFSMRPCStateMachine(t, nil)
	server := rpc.NewServer(rpc.WithFailureMode(rpc.FailureModeRecover))
	registry := command.NewRegistry()
	require.NoError(t, registry.AddResolver("rpc-explicit", rpc.Resolver(server)))
	require.NoError(t, RegisterFSMRPCCommands(registry, sm))
	require.NoError(t, registry.Initialize())

	out, err := server.Invoke(context.Background(), FSMRPCMethodApplyEvent, rpc.RequestEnvelope[FSMApplyEventRequest[smMsg]]{
		Data: FSMApplyEventRequest[smMsg]{
			MachineID: "order",
			EntityID:  "entity-1",
			Event:     "approve",
			Msg: smMsg{
				ID:    "entity-1",
				State: "draft",
				Event: "approve",
			},
		},
		Meta: rpc.RequestMeta{
			ActorID:       "user-1",
			Roles:         []string{"admin"},
			Tenant:        "acme",
			RequestID:     "req-1",
			CorrelationID: "corr-1",
		},
	})
	require.NoError(t, err)

	resEnvelope, ok := out.(rpc.ResponseEnvelope[*ApplyEventResponse[smMsg]])
	require.True(t, ok)
	res := resEnvelope.Data
	require.NotNil(t, res)
	assert.NotEmpty(t, res.EventID)
	assert.Equal(t, 1, res.Version)
	assert.False(t, res.IdempotencyHit)
	require.NotNil(t, res.Transition)
	require.NotNil(t, res.Snapshot)
	require.NotNil(t, res.Execution)
	assert.Equal(t, "draft", res.Transition.PreviousState)
	assert.Equal(t, "approved", res.Transition.CurrentState)
	assert.Equal(t, "approved", res.Snapshot.CurrentState)
	assert.Equal(t, string(ExecutionPolicyOrchestrated), res.Execution.Policy)
	assert.Equal(t, ExecutionStateRunning, res.Execution.Status)
	require.NotEmpty(t, res.Execution.ExecutionID)

	scope := FSMExecutionControlRequest{
		MachineID:   "order",
		EntityID:    "entity-1",
		ExecutionID: res.Execution.ExecutionID,
		Tenant:      "acme",
	}

	statusOut, err := server.Invoke(context.Background(), FSMRPCMethodExecutionStatus, rpc.RequestEnvelope[FSMExecutionControlRequest]{
		Data: scope,
		Meta: rpc.RequestMeta{
			ActorID:       "ops-1",
			Tenant:        "acme",
			RequestID:     "req-status",
			CorrelationID: "corr-status",
		},
	})
	require.NoError(t, err)
	statusEnvelope, ok := statusOut.(rpc.ResponseEnvelope[*ExecutionStatus])
	require.True(t, ok)
	status := statusEnvelope.Data
	require.NotNil(t, status)
	assert.Equal(t, ExecutionStateRunning, status.Status)
	require.NotNil(t, status.Metadata)
	assert.Equal(t, "req-1", status.Metadata["request_id"])
	assert.Equal(t, "corr-1", status.Metadata["correlation_id"])
	assert.Equal(t, "req-status", status.Metadata["query_request_id"])
	assert.Equal(t, "corr-status", status.Metadata["query_correlation_id"])
	assert.Equal(t, "order", status.Metadata["scope_machine_id"])
	assert.Equal(t, "entity-1", status.Metadata["scope_entity_id"])
	assert.Equal(t, "acme", status.Metadata["scope_tenant"])

	pausedOut, err := server.Invoke(context.Background(), FSMRPCMethodExecutionPause, rpc.RequestEnvelope[FSMExecutionControlRequest]{
		Data: scope,
		Meta: rpc.RequestMeta{
			ActorID:       "ops-2",
			Tenant:        "acme",
			RequestID:     "req-pause",
			CorrelationID: "corr-pause",
		},
	})
	require.NoError(t, err)
	pausedEnvelope, ok := pausedOut.(rpc.ResponseEnvelope[*ExecutionStatus])
	require.True(t, ok)
	paused := pausedEnvelope.Data
	require.NotNil(t, paused)
	assert.Equal(t, ExecutionStatePaused, paused.Status)
	assert.Equal(t, "req-1", paused.Metadata["request_id"])
	assert.Equal(t, "req-pause", paused.Metadata["query_request_id"])

	resumedOut, err := server.Invoke(context.Background(), FSMRPCMethodExecutionResume, rpc.RequestEnvelope[FSMExecutionControlRequest]{
		Data: scope,
		Meta: rpc.RequestMeta{Tenant: "acme", RequestID: "req-resume"},
	})
	require.NoError(t, err)
	resumedEnvelope, ok := resumedOut.(rpc.ResponseEnvelope[*ExecutionStatus])
	require.True(t, ok)
	resumed := resumedEnvelope.Data
	require.NotNil(t, resumed)
	assert.Equal(t, ExecutionStateRunning, resumed.Status)
	assert.Equal(t, "req-1", resumed.Metadata["request_id"])
	assert.Equal(t, "req-resume", resumed.Metadata["query_request_id"])

	stoppedOut, err := server.Invoke(context.Background(), FSMRPCMethodExecutionStop, rpc.RequestEnvelope[FSMExecutionControlRequest]{
		Data: scope,
		Meta: rpc.RequestMeta{Tenant: "acme", RequestID: "req-stop"},
	})
	require.NoError(t, err)
	stoppedEnvelope, ok := stoppedOut.(rpc.ResponseEnvelope[*ExecutionStatus])
	require.True(t, ok)
	stopped := stoppedEnvelope.Data
	require.NotNil(t, stopped)
	assert.Equal(t, ExecutionStateStopped, stopped.Status)

	listOut, err := server.Invoke(context.Background(), FSMRPCMethodExecutionList, rpc.RequestEnvelope[FSMExecutionListRequest]{
		Data: FSMExecutionListRequest{
			MachineID: "order",
			EntityID:  "entity-1",
			Tenant:    "acme",
		},
		Meta: rpc.RequestMeta{
			ActorID:   "ops-3",
			Tenant:    "acme",
			RequestID: "req-list",
		},
	})
	require.NoError(t, err)
	listEnvelope, ok := listOut.(rpc.ResponseEnvelope[FSMExecutionListResponse])
	require.True(t, ok)
	require.NotEmpty(t, listEnvelope.Data.Items)
	found := false
	for _, item := range listEnvelope.Data.Items {
		if item.ExecutionID != res.Execution.ExecutionID {
			continue
		}
		found = true
		assert.Equal(t, ExecutionStateStopped, item.Status)
		assert.Equal(t, "req-1", item.Metadata["request_id"])
		assert.Equal(t, "req-list", item.Metadata["query_request_id"])
		break
	}
	assert.True(t, found)

	historyOut, err := server.Invoke(context.Background(), FSMRPCMethodExecutionHistory, rpc.RequestEnvelope[FSMExecutionHistoryRequest]{
		Data: FSMExecutionHistoryRequest{
			ExecutionID: res.Execution.ExecutionID,
			Tenant:      "acme",
		},
		Meta: rpc.RequestMeta{
			ActorID:   "ops-4",
			Tenant:    "acme",
			RequestID: "req-history",
		},
	})
	require.NoError(t, err)
	historyEnvelope, ok := historyOut.(rpc.ResponseEnvelope[FSMExecutionHistoryResponse[smMsg]])
	require.True(t, ok)
	require.GreaterOrEqual(t, len(historyEnvelope.Data.Items), 2)
	assert.Equal(t, TransitionPhaseAttempted, historyEnvelope.Data.Items[0].Phase)
	assert.Equal(t, TransitionPhaseCommitted, historyEnvelope.Data.Items[1].Phase)
	assert.Equal(t, "req-1", historyEnvelope.Data.Items[0].Metadata["request_id"])
	assert.Equal(t, "req-history", historyEnvelope.Data.Items[0].Metadata["query_request_id"])
}

func TestFSMRPCApplyEventPropagatesRequestMetaIntoLifecycleMetadata(t *testing.T) {
	sm := buildFSMRPCStateMachine(t, nil)
	server := rpc.NewServer(rpc.WithFailureMode(rpc.FailureModeRecover))
	registry := command.NewRegistry()
	require.NoError(t, registry.AddResolver("rpc-explicit", rpc.Resolver(server)))
	require.NoError(t, RegisterFSMRPCCommands(registry, sm))
	require.NoError(t, registry.Initialize())

	out, err := server.Invoke(context.Background(), FSMRPCMethodApplyEvent, rpc.RequestEnvelope[FSMApplyEventRequest[smMsg]]{
		Data: FSMApplyEventRequest[smMsg]{
			EntityID: "entity-2",
			Event:    "approve",
			Msg:      smMsg{ID: "entity-2", State: "draft", Event: "approve"},
		},
		Meta: rpc.RequestMeta{
			ActorID:       "actor-2",
			Tenant:        "tenant-2",
			RequestID:     "req-2",
			CorrelationID: "corr-2",
		},
	})
	require.NoError(t, err)
	res := out.(rpc.ResponseEnvelope[*ApplyEventResponse[smMsg]]).Data
	require.NotNil(t, res)
	require.NotNil(t, res.Execution)

	historyOut, err := server.Invoke(context.Background(), FSMRPCMethodExecutionHistory, rpc.RequestEnvelope[FSMExecutionHistoryRequest]{
		Data: FSMExecutionHistoryRequest{
			ExecutionID: res.Execution.ExecutionID,
			Tenant:      "tenant-2",
		},
		Meta: rpc.RequestMeta{Tenant: "tenant-2"},
	})
	require.NoError(t, err)
	history := historyOut.(rpc.ResponseEnvelope[FSMExecutionHistoryResponse[smMsg]]).Data.Items
	require.NotEmpty(t, history)
	for _, evt := range history {
		require.NotNil(t, evt.Metadata)
		assert.Equal(t, "actor-2", evt.Metadata["actor_id"])
		assert.Equal(t, "tenant-2", evt.Metadata["tenant"])
		assert.Equal(t, "req-2", evt.Metadata["request_id"])
		assert.Equal(t, "corr-2", evt.Metadata["correlation_id"])
	}
}

func TestFSMRPCApplyEventBuildsCanonicalRequestWithEntityAndExecutionContext(t *testing.T) {
	var gotExecCtx ExecutionContext
	sm := buildFSMRPCStateMachine(t, func(ctx context.Context, msg smMsg, execCtx ExecutionContext) error {
		gotExecCtx = execCtx
		if execCtx.ActorID == "" {
			return cloneRuntimeError(ErrGuardRejected, "missing actor", nil, nil)
		}
		return nil
	})
	server := rpc.NewServer(rpc.WithFailureMode(rpc.FailureModeRecover))
	registry := command.NewRegistry()
	require.NoError(t, registry.AddResolver("rpc-explicit", rpc.Resolver(server)))
	require.NoError(t, RegisterFSMRPCCommands(registry, sm))
	require.NoError(t, registry.Initialize())

	_, err := server.Invoke(context.Background(), FSMRPCMethodApplyEvent, rpc.RequestEnvelope[FSMApplyEventRequest[smMsg]]{
		Data: FSMApplyEventRequest[smMsg]{
			EntityID: " entity-3 ",
			Event:    "approve",
			Msg: smMsg{
				ID:    "entity-3",
				State: "draft",
				Event: "approve",
			},
		},
		Meta: rpc.RequestMeta{
			ActorID: "actor-3",
			Roles:   []string{"reviewer"},
			Tenant:  "tenant-3",
		},
	})
	require.NoError(t, err)
	assert.Equal(t, "actor-3", gotExecCtx.ActorID)
	assert.Equal(t, []string{"reviewer"}, gotExecCtx.Roles)
	assert.Equal(t, "tenant-3", gotExecCtx.Tenant)
}

func TestFSMRPCExecutionControlScopeValidation(t *testing.T) {
	sm := buildFSMRPCStateMachine(t, nil)
	server := rpc.NewServer(rpc.WithFailureMode(rpc.FailureModeRecover))
	registry := command.NewRegistry()
	require.NoError(t, registry.AddResolver("rpc-explicit", rpc.Resolver(server)))
	require.NoError(t, RegisterFSMRPCCommands(registry, sm))
	require.NoError(t, registry.Initialize())

	out, err := server.Invoke(context.Background(), FSMRPCMethodApplyEvent, rpc.RequestEnvelope[FSMApplyEventRequest[smMsg]]{
		Data: FSMApplyEventRequest[smMsg]{
			EntityID: "entity-4",
			Event:    "approve",
			Msg:      smMsg{ID: "entity-4", State: "draft", Event: "approve"},
		},
		Meta: rpc.RequestMeta{Tenant: "tenant-4"},
	})
	require.NoError(t, err)
	res := out.(rpc.ResponseEnvelope[*ApplyEventResponse[smMsg]]).Data
	require.NotNil(t, res)
	require.NotNil(t, res.Execution)

	_, err = server.Invoke(context.Background(), FSMRPCMethodExecutionStatus, rpc.RequestEnvelope[FSMExecutionControlRequest]{
		Data: FSMExecutionControlRequest{
			MachineID:   "wrong-machine",
			EntityID:    "entity-4",
			ExecutionID: res.Execution.ExecutionID,
			Tenant:      "tenant-4",
		},
		Meta: rpc.RequestMeta{Tenant: "tenant-4"},
	})
	require.Error(t, err)
	assert.Equal(t, ErrCodePreconditionFailed, runtimeErrorCode(err))

	_, err = server.Invoke(context.Background(), FSMRPCMethodExecutionStatus, rpc.RequestEnvelope[FSMExecutionControlRequest]{
		Data: FSMExecutionControlRequest{
			MachineID:   "order",
			EntityID:    "wrong-entity",
			ExecutionID: res.Execution.ExecutionID,
			Tenant:      "tenant-4",
		},
		Meta: rpc.RequestMeta{Tenant: "tenant-4"},
	})
	require.Error(t, err)
	assert.Equal(t, ErrCodePreconditionFailed, runtimeErrorCode(err))

	_, err = server.Invoke(context.Background(), FSMRPCMethodExecutionStatus, rpc.RequestEnvelope[FSMExecutionControlRequest]{
		Data: FSMExecutionControlRequest{
			MachineID:   "order",
			EntityID:    "entity-4",
			ExecutionID: res.Execution.ExecutionID,
			Tenant:      "other-tenant",
		},
		Meta: rpc.RequestMeta{Tenant: "other-tenant"},
	})
	require.Error(t, err)
	assert.Equal(t, ErrCodePreconditionFailed, runtimeErrorCode(err))
}

func TestFSMRPCErrorMappingParityAndStructuredDetails(t *testing.T) {
	sm := buildFSMRPCStateMachine(t, func(_ context.Context, _ smMsg, _ ExecutionContext) error {
		return &GuardRejection{
			Code:            "POLICY_BLOCK",
			Category:        GuardClassificationDomainReject,
			Retryable:       false,
			RequiresAction:  true,
			Message:         "policy denied",
			RemediationHint: "contact admin",
			Metadata: map[string]any{
				"policy": "restricted",
			},
		}
	})
	server := rpc.NewServer(rpc.WithFailureMode(rpc.FailureModeRecover))
	registry := command.NewRegistry()
	require.NoError(t, registry.AddResolver("rpc-explicit", rpc.Resolver(server)))
	require.NoError(t, RegisterFSMRPCCommands(registry, sm))
	require.NoError(t, registry.Initialize())

	_, err := server.Invoke(context.Background(), FSMRPCMethodApplyEvent, rpc.RequestEnvelope[FSMApplyEventRequest[smMsg]]{
		Data: FSMApplyEventRequest[smMsg]{
			EntityID: "entity-5",
			Event:    "approve",
			Msg:      smMsg{ID: "entity-5", State: "draft", Event: "approve"},
		},
		Meta: rpc.RequestMeta{
			ActorID:       "actor-5",
			Tenant:        "tenant-5",
			RequestID:     "req-5",
			CorrelationID: "corr-5",
		},
	})
	require.Error(t, err)
	assert.Equal(t, ErrCodeGuardRejected, runtimeErrorCode(err))

	mapping := MapRuntimeError(err)
	assert.Equal(t, 403, mapping.HTTPStatus)
	assert.Equal(t, GRPCCodePermissionDenied, mapping.GRPCCode)
	assert.Equal(t, ErrCodeGuardRejected, mapping.RPCCode)

	rpcEnvelope := RPCErrorForError(err)
	require.NotNil(t, rpcEnvelope)
	assert.Equal(t, ErrCodeGuardRejected, rpcEnvelope.Code)
	assert.Equal(t, "bad_input", rpcEnvelope.Category)
	assert.NotEmpty(t, rpcEnvelope.Message)
	require.NotNil(t, rpcEnvelope.Details)
	assert.Equal(t, ErrCodeGuardRejected, rpcEnvelope.Details["runtime_code"])
	assert.Equal(t, "tenant-5", rpcEnvelope.Details["tenant"])
	assert.Equal(t, "req-5", rpcEnvelope.Details["request_id"])
	assert.Equal(t, "corr-5", rpcEnvelope.Details["correlation_id"])
	assert.Contains(t, rpcEnvelope.Details, "guard_rejection")
	assert.Contains(t, rpcEnvelope.Details, "guard_rejections")
}

func buildFSMRPCStateMachine(t *testing.T, guard Guard[smMsg]) *StateMachine[smMsg] {
	t.Helper()

	cfg := StateMachineConfig{
		Entity:          "order",
		ExecutionPolicy: ExecutionPolicyOrchestrated,
		States:          []StateConfig{{Name: "draft", Initial: true}, {Name: "approved"}},
		Transitions: []TransitionConfig{
			{Name: "approve", From: "draft", To: "approved", Guard: "rpc_guard"},
		},
	}
	if guard == nil {
		cfg.Transitions[0].Guard = ""
	}

	store := NewInMemoryStateStore()
	guards := NewGuardRegistry[smMsg]()
	if guard != nil {
		require.NoError(t, guards.RegisterWithContext("rpc_guard", guard))
	}
	actions := NewActionRegistry[smMsg]()
	req := TransitionRequest[smMsg]{
		StateKey: func(m smMsg) string { return m.ID },
		Event:    func(m smMsg) string { return m.Event },
	}

	durable, err := NewDurableOrchestrator[smMsg](NewInMemoryExecutionRecordStore[smMsg](), nil, nil)
	require.NoError(t, err)

	sm, err := newStateMachineFromConfig(cfg, store, req, guards, actions, WithOrchestrator[smMsg](durable))
	require.NoError(t, err)
	for _, entityID := range []string{"entity-1", "entity-2", "entity-3", "entity-4", "entity-5"} {
		mustSeedStateRecord(t, sm, entityID, "draft")
	}
	return sm
}

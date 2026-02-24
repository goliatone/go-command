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
	registry.SetRPCRegister(server.Register)

	require.NoError(t, RegisterFSMRPCCommands(registry, sm))
	require.NoError(t, registry.Initialize())

	endpoints := server.Endpoints()
	require.Len(t, endpoints, 6)
	assert.Equal(t, []string{
		FSMRPCMethodApplyEvent,
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
	})

	apply, ok := server.Endpoint(FSMRPCMethodApplyEvent)
	require.True(t, ok)
	require.NotNil(t, apply.RequestType)
	assert.Contains(t, apply.RequestType.GoType, "RequestEnvelope")

	snapshot, ok := server.Endpoint(FSMRPCMethodSnapshot)
	require.True(t, ok)
	require.NotNil(t, snapshot.RequestType)
	assert.Contains(t, snapshot.RequestType.GoType, "RequestEnvelope")
	assert.True(t, snapshot.Idempotent)
}

func TestFSMRPCMethodFamilyRegistrationWithExplicitResolver(t *testing.T) {
	sm := buildFSMRPCStateMachine(t, nil)
	server := rpc.NewServer(rpc.WithFailureMode(rpc.FailureModeRecover))
	registry := command.NewRegistry()
	registry.SetRPCRegister(command.NilRPCRegister)
	require.NoError(t, registry.AddResolver("rpc-explicit", rpc.Resolver(server)))

	require.NoError(t, RegisterFSMRPCCommands(registry, sm))
	require.NoError(t, registry.Initialize())

	endpoints := server.Endpoints()
	require.Len(t, endpoints, 6)
}

func TestFSMRPCApplyEventEnvelopeAndExecutionControls(t *testing.T) {
	sm := buildFSMRPCStateMachine(t, nil)
	server := rpc.NewServer(rpc.WithFailureMode(rpc.FailureModeRecover))
	registry := command.NewRegistry()
	registry.SetRPCRegister(server.Register)
	require.NoError(t, RegisterFSMRPCCommands(registry, sm))
	require.NoError(t, registry.Initialize())

	out, err := server.Invoke(context.Background(), FSMRPCMethodApplyEvent, rpc.RequestEnvelope[FSMApplyEventRequest[smMsg]]{
		Data: FSMApplyEventRequest[smMsg]{
			EntityID: "entity-1",
			Event:    "approve",
			Msg: smMsg{
				ID:    "entity-1",
				State: "draft",
				Event: "approve",
			},
		},
		Meta: rpc.RequestMeta{
			ActorID: "user-1",
			Roles:   []string{"admin"},
			Tenant:  "acme",
		},
	})
	require.NoError(t, err)

	resEnvelope, ok := out.(rpc.ResponseEnvelope[*ApplyEventResponse[smMsg]])
	require.True(t, ok)
	res := resEnvelope.Data
	require.NotNil(t, res)
	require.NotNil(t, res.Transition)
	require.NotNil(t, res.Snapshot)
	require.NotNil(t, res.Execution)
	assert.Equal(t, "draft", res.Transition.PreviousState)
	assert.Equal(t, "approved", res.Transition.CurrentState)
	assert.Equal(t, "approved", res.Snapshot.CurrentState)
	assert.Equal(t, "orchestrated", res.Execution.Policy)
	assert.Equal(t, ExecutionStateRunning, res.Execution.Status)
	require.NotEmpty(t, res.Execution.ExecutionID)

	statusOut, err := server.Invoke(context.Background(), FSMRPCMethodExecutionStatus, rpc.RequestEnvelope[FSMExecutionControlRequest]{
		Data: FSMExecutionControlRequest{
			ExecutionID: res.Execution.ExecutionID,
		},
	})
	require.NoError(t, err)
	statusEnvelope, ok := statusOut.(rpc.ResponseEnvelope[*ExecutionStatus])
	require.True(t, ok)
	status := statusEnvelope.Data
	assert.Equal(t, ExecutionStateRunning, status.Status)

	pausedOut, err := server.Invoke(context.Background(), FSMRPCMethodExecutionPause, rpc.RequestEnvelope[FSMExecutionControlRequest]{
		Data: FSMExecutionControlRequest{
			ExecutionID: res.Execution.ExecutionID,
		},
	})
	require.NoError(t, err)
	pausedEnvelope, ok := pausedOut.(rpc.ResponseEnvelope[*ExecutionStatus])
	require.True(t, ok)
	paused := pausedEnvelope.Data
	assert.Equal(t, ExecutionStatePaused, paused.Status)

	resumedOut, err := server.Invoke(context.Background(), FSMRPCMethodExecutionResume, rpc.RequestEnvelope[FSMExecutionControlRequest]{
		Data: FSMExecutionControlRequest{
			ExecutionID: res.Execution.ExecutionID,
		},
	})
	require.NoError(t, err)
	resumedEnvelope, ok := resumedOut.(rpc.ResponseEnvelope[*ExecutionStatus])
	require.True(t, ok)
	resumed := resumedEnvelope.Data
	assert.Equal(t, ExecutionStateRunning, resumed.Status)

	stoppedOut, err := server.Invoke(context.Background(), FSMRPCMethodExecutionStop, rpc.RequestEnvelope[FSMExecutionControlRequest]{
		Data: FSMExecutionControlRequest{
			ExecutionID: res.Execution.ExecutionID,
		},
	})
	require.NoError(t, err)
	stoppedEnvelope, ok := stoppedOut.(rpc.ResponseEnvelope[*ExecutionStatus])
	require.True(t, ok)
	stopped := stoppedEnvelope.Data
	assert.Equal(t, ExecutionStateStopped, stopped.Status)
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
	registry.SetRPCRegister(server.Register)
	require.NoError(t, RegisterFSMRPCCommands(registry, sm))
	require.NoError(t, registry.Initialize())

	_, err := server.Invoke(context.Background(), FSMRPCMethodApplyEvent, rpc.RequestEnvelope[FSMApplyEventRequest[smMsg]]{
		Data: FSMApplyEventRequest[smMsg]{
			EntityID: " entity-2 ",
			Event:    "approve",
			Msg: smMsg{
				ID:    "entity-2",
				State: "draft",
				Event: "approve",
			},
		},
		Meta: rpc.RequestMeta{
			ActorID: "actor-1",
			Roles:   []string{"reviewer"},
			Tenant:  "tenant-1",
		},
	})
	require.NoError(t, err)
	assert.Equal(t, "actor-1", gotExecCtx.ActorID)
	assert.Equal(t, []string{"reviewer"}, gotExecCtx.Roles)
	assert.Equal(t, "tenant-1", gotExecCtx.Tenant)
}

func TestFSMRPCErrorMappingParity(t *testing.T) {
	sm := buildFSMRPCStateMachine(t, nil)
	server := rpc.NewServer(rpc.WithFailureMode(rpc.FailureModeRecover))
	registry := command.NewRegistry()
	registry.SetRPCRegister(server.Register)
	require.NoError(t, RegisterFSMRPCCommands(registry, sm))
	require.NoError(t, registry.Initialize())

	_, err := server.Invoke(context.Background(), FSMRPCMethodApplyEvent, rpc.RequestEnvelope[FSMApplyEventRequest[smMsg]]{
		Data: FSMApplyEventRequest[smMsg]{
			EntityID: "entity-3",
			Event:    "missing-transition",
			Msg: smMsg{
				ID:    "entity-3",
				State: "draft",
				Event: "missing-transition",
			},
		},
	})
	require.Error(t, err)
	assert.Equal(t, ErrCodeInvalidTransition, runtimeErrorCode(err))

	mapping := MapRuntimeError(err)
	assert.Equal(t, 409, mapping.HTTPStatus)
	assert.Equal(t, GRPCCodeFailedPrecondition, mapping.GRPCCode)
	assert.Equal(t, ErrCodeInvalidTransition, mapping.RPCCode)

	rpcEnvelope := RPCErrorForError(err)
	require.NotNil(t, rpcEnvelope)
	assert.Equal(t, ErrCodeInvalidTransition, rpcEnvelope.Code)
	assert.NotEmpty(t, rpcEnvelope.Message)
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
		StateKey:     func(m smMsg) string { return m.ID },
		Event:        func(m smMsg) string { return m.Event },
		CurrentState: func(m smMsg) string { return m.State },
	}

	durable, err := NewDurableOrchestrator[smMsg](NewInMemoryExecutionRecordStore[smMsg](), nil, nil)
	require.NoError(t, err)

	sm, err := NewStateMachine(cfg, store, req, guards, actions, WithOrchestrator[smMsg](durable))
	require.NoError(t, err)
	return sm
}

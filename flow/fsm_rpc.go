package flow

import (
	"context"
	"fmt"
	"strings"

	"github.com/goliatone/go-command"
)

const (
	FSMRPCMethodApplyEvent      = "fsm.apply_event"
	FSMRPCMethodSnapshot        = "fsm.snapshot"
	FSMRPCMethodExecutionStatus = "fsm.execution_status"
	FSMRPCMethodExecutionPause  = "fsm.execution_pause"
	FSMRPCMethodExecutionResume = "fsm.execution_resume"
	FSMRPCMethodExecutionStop   = "fsm.execution_stop"
)

// FSMApplyEventRequest is the RPC transport request for fsm.apply_event.
type FSMApplyEventRequest[T command.Message] struct {
	EntityID        string
	Event           string
	Msg             T
	ExecCtx         ExecutionContext
	ExpectedState   string
	ExpectedVersion int
}

func (FSMApplyEventRequest[T]) Type() string { return "fsm.apply_event.request" }

// FSMSnapshotRequest is the RPC transport request for fsm.snapshot.
type FSMSnapshotRequest[T command.Message] struct {
	EntityID string
	Msg      T
	ExecCtx  ExecutionContext
}

func (FSMSnapshotRequest[T]) Type() string { return "fsm.snapshot.request" }

// FSMExecutionControlRequest is the RPC request for execution control/status methods.
type FSMExecutionControlRequest struct {
	ExecutionID string
}

func (FSMExecutionControlRequest) Type() string { return "fsm.execution.request" }

// FSMApplyEventRPCCommand provides the fsm.apply_event method over command.RPCCommand.
type FSMApplyEventRPCCommand[T command.Message] struct {
	Machine *StateMachine[T]
	Config  command.RPCConfig
}

func NewFSMApplyEventRPCCommand[T command.Message](machine *StateMachine[T]) *FSMApplyEventRPCCommand[T] {
	return &FSMApplyEventRPCCommand[T]{
		Machine: machine,
		Config: command.RPCConfig{
			Method: FSMRPCMethodApplyEvent,
		},
	}
}

func (c *FSMApplyEventRPCCommand[T]) Query(ctx context.Context, req FSMApplyEventRequest[T]) (*ApplyEventResponse[T], error) {
	machine, err := c.stateMachine()
	if err != nil {
		return nil, err
	}
	applyReq := ApplyEventRequest[T]{
		EntityID:        strings.TrimSpace(req.EntityID),
		Event:           req.Event,
		Msg:             req.Msg,
		ExecCtx:         req.ExecCtx,
		ExpectedState:   req.ExpectedState,
		ExpectedVersion: req.ExpectedVersion,
	}
	return machine.ApplyEvent(ctx, applyReq)
}

func (c *FSMApplyEventRPCCommand[T]) RPCHandler() any {
	return c
}

func (c *FSMApplyEventRPCCommand[T]) RPCOptions() command.RPCConfig {
	return normalizeFSMRPCConfig(c.Config, FSMRPCMethodApplyEvent)
}

// FSMSnapshotRPCCommand provides the fsm.snapshot method over command.RPCCommand.
type FSMSnapshotRPCCommand[T command.Message] struct {
	Machine *StateMachine[T]
	Config  command.RPCConfig
}

func NewFSMSnapshotRPCCommand[T command.Message](machine *StateMachine[T]) *FSMSnapshotRPCCommand[T] {
	return &FSMSnapshotRPCCommand[T]{
		Machine: machine,
		Config: command.RPCConfig{
			Method:     FSMRPCMethodSnapshot,
			Idempotent: true,
		},
	}
}

func (c *FSMSnapshotRPCCommand[T]) Query(ctx context.Context, req FSMSnapshotRequest[T]) (*Snapshot, error) {
	machine, err := c.stateMachine()
	if err != nil {
		return nil, err
	}
	return machine.Snapshot(ctx, SnapshotRequest[T]{
		EntityID: strings.TrimSpace(req.EntityID),
		Msg:      req.Msg,
		ExecCtx:  req.ExecCtx,
	})
}

func (c *FSMSnapshotRPCCommand[T]) RPCHandler() any {
	return c
}

func (c *FSMSnapshotRPCCommand[T]) RPCOptions() command.RPCConfig {
	return normalizeFSMRPCConfig(c.Config, FSMRPCMethodSnapshot)
}

// FSMExecutionStatusRPCCommand provides the fsm.execution_status method.
type FSMExecutionStatusRPCCommand[T command.Message] struct {
	Machine *StateMachine[T]
	Config  command.RPCConfig
}

func NewFSMExecutionStatusRPCCommand[T command.Message](machine *StateMachine[T]) *FSMExecutionStatusRPCCommand[T] {
	return &FSMExecutionStatusRPCCommand[T]{
		Machine: machine,
		Config: command.RPCConfig{
			Method:     FSMRPCMethodExecutionStatus,
			Idempotent: true,
		},
	}
}

func (c *FSMExecutionStatusRPCCommand[T]) Query(ctx context.Context, req FSMExecutionControlRequest) (*ExecutionStatus, error) {
	machine, err := c.stateMachine()
	if err != nil {
		return nil, err
	}
	return machine.ExecutionStatus(ctx, strings.TrimSpace(req.ExecutionID))
}

func (c *FSMExecutionStatusRPCCommand[T]) RPCHandler() any {
	return c
}

func (c *FSMExecutionStatusRPCCommand[T]) RPCOptions() command.RPCConfig {
	return normalizeFSMRPCConfig(c.Config, FSMRPCMethodExecutionStatus)
}

// FSMExecutionPauseRPCCommand provides the fsm.execution_pause method.
type FSMExecutionPauseRPCCommand[T command.Message] struct {
	Machine *StateMachine[T]
	Config  command.RPCConfig
}

func NewFSMExecutionPauseRPCCommand[T command.Message](machine *StateMachine[T]) *FSMExecutionPauseRPCCommand[T] {
	return &FSMExecutionPauseRPCCommand[T]{
		Machine: machine,
		Config: command.RPCConfig{
			Method: FSMRPCMethodExecutionPause,
		},
	}
}

func (c *FSMExecutionPauseRPCCommand[T]) Query(ctx context.Context, req FSMExecutionControlRequest) (*ExecutionStatus, error) {
	machine, err := c.stateMachine()
	if err != nil {
		return nil, err
	}
	executionID := strings.TrimSpace(req.ExecutionID)
	if err := machine.PauseExecution(ctx, executionID); err != nil {
		return nil, err
	}
	return machine.ExecutionStatus(ctx, executionID)
}

func (c *FSMExecutionPauseRPCCommand[T]) RPCHandler() any {
	return c
}

func (c *FSMExecutionPauseRPCCommand[T]) RPCOptions() command.RPCConfig {
	return normalizeFSMRPCConfig(c.Config, FSMRPCMethodExecutionPause)
}

// FSMExecutionResumeRPCCommand provides the fsm.execution_resume method.
type FSMExecutionResumeRPCCommand[T command.Message] struct {
	Machine *StateMachine[T]
	Config  command.RPCConfig
}

func NewFSMExecutionResumeRPCCommand[T command.Message](machine *StateMachine[T]) *FSMExecutionResumeRPCCommand[T] {
	return &FSMExecutionResumeRPCCommand[T]{
		Machine: machine,
		Config: command.RPCConfig{
			Method: FSMRPCMethodExecutionResume,
		},
	}
}

func (c *FSMExecutionResumeRPCCommand[T]) Query(ctx context.Context, req FSMExecutionControlRequest) (*ExecutionStatus, error) {
	machine, err := c.stateMachine()
	if err != nil {
		return nil, err
	}
	executionID := strings.TrimSpace(req.ExecutionID)
	if err := machine.ResumeExecution(ctx, executionID); err != nil {
		return nil, err
	}
	return machine.ExecutionStatus(ctx, executionID)
}

func (c *FSMExecutionResumeRPCCommand[T]) RPCHandler() any {
	return c
}

func (c *FSMExecutionResumeRPCCommand[T]) RPCOptions() command.RPCConfig {
	return normalizeFSMRPCConfig(c.Config, FSMRPCMethodExecutionResume)
}

// FSMExecutionStopRPCCommand provides the fsm.execution_stop method.
type FSMExecutionStopRPCCommand[T command.Message] struct {
	Machine *StateMachine[T]
	Config  command.RPCConfig
}

func NewFSMExecutionStopRPCCommand[T command.Message](machine *StateMachine[T]) *FSMExecutionStopRPCCommand[T] {
	return &FSMExecutionStopRPCCommand[T]{
		Machine: machine,
		Config: command.RPCConfig{
			Method: FSMRPCMethodExecutionStop,
		},
	}
}

func (c *FSMExecutionStopRPCCommand[T]) Query(ctx context.Context, req FSMExecutionControlRequest) (*ExecutionStatus, error) {
	machine, err := c.stateMachine()
	if err != nil {
		return nil, err
	}
	executionID := strings.TrimSpace(req.ExecutionID)
	if err := machine.StopExecution(ctx, executionID); err != nil {
		return nil, err
	}
	return machine.ExecutionStatus(ctx, executionID)
}

func (c *FSMExecutionStopRPCCommand[T]) RPCHandler() any {
	return c
}

func (c *FSMExecutionStopRPCCommand[T]) RPCOptions() command.RPCConfig {
	return normalizeFSMRPCConfig(c.Config, FSMRPCMethodExecutionStop)
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

func normalizeFSMRPCConfig(cfg command.RPCConfig, method string) command.RPCConfig {
	cfg.Method = strings.TrimSpace(cfg.Method)
	if cfg.Method == "" {
		cfg.Method = method
	}
	return cfg
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

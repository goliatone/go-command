package rpc

import (
	"context"
	"errors"
	"testing"
	"time"

	"github.com/goliatone/go-command"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

type testMessage struct {
	Name string
}

func (testMessage) Type() string { return "rpc::test_message" }

type concreteError struct{}

func (concreteError) Error() string { return "concrete" }

type executeCommand struct {
	got testMessage
	err error
}

func (c *executeCommand) Execute(_ context.Context, msg testMessage) error {
	c.got = msg
	return c.err
}

type queryCommand struct {
	prefix string
	err    error
}

func (c *queryCommand) Query(_ context.Context, msg testMessage) (string, error) {
	if c.err != nil {
		return "", c.err
	}
	return c.prefix + msg.Name, nil
}

type exposedExecuteCommand struct {
	executeCommand
	method string
}

func (c *exposedExecuteCommand) RPCHandler() any {
	return &c.executeCommand
}

func (c *exposedExecuteCommand) RPCOptions() command.RPCConfig {
	return command.RPCConfig{Method: c.method}
}

func TestServerRegisterAndInvokeExecute(t *testing.T) {
	s := NewServer()
	cmd := &executeCommand{}
	meta := command.MessageTypeForCommand(cmd)

	err := s.Register(command.RPCConfig{
		Method:      "fsm.apply_event",
		Timeout:     time.Second,
		Idempotent:  true,
		Permissions: []string{"fsm:write"},
		Roles:       []string{"admin"},
	}, cmd, meta)
	require.NoError(t, err)

	out, err := s.Invoke(context.Background(), "fsm.apply_event", testMessage{Name: "alice"})
	require.NoError(t, err)
	assert.Nil(t, out)
	assert.Equal(t, "alice", cmd.got.Name)

	endpoint, ok := s.Endpoint("fsm.apply_event")
	require.True(t, ok)
	assert.Equal(t, "fsm.apply_event", endpoint.Method)
	assert.Equal(t, "rpc::test_message", endpoint.MessageType)
	assert.Equal(t, time.Second, endpoint.Timeout)
	assert.True(t, endpoint.Idempotent)
	assert.Equal(t, []string{"fsm:write"}, endpoint.Permissions)
	assert.Equal(t, []string{"admin"}, endpoint.Roles)
}

func TestServerRegisterAndInvokeQuery(t *testing.T) {
	s := NewServer()
	cmd := &queryCommand{prefix: "hello "}
	meta := command.MessageTypeForCommand(cmd)

	require.NoError(t, s.Register(command.RPCConfig{
		Method: "fsm.snapshot",
	}, cmd, meta))

	out, err := s.Invoke(context.Background(), "fsm.snapshot", testMessage{Name: "world"})
	require.NoError(t, err)
	assert.Equal(t, "hello world", out)
}

func TestServerInvokeErrors(t *testing.T) {
	s := NewServer()

	_, err := s.Invoke(context.Background(), "", nil)
	require.Error(t, err)

	_, err = s.Invoke(context.Background(), "missing.method", nil)
	require.Error(t, err)
	assert.Contains(t, err.Error(), "not found")
}

func TestServerRegisterValidation(t *testing.T) {
	s := NewServer()
	cmd := &executeCommand{}
	meta := command.MessageTypeForCommand(cmd)

	err := s.Register(command.RPCConfig{}, cmd, meta)
	require.Error(t, err)
	assert.Contains(t, err.Error(), "rpc method required")

	err = s.Register(command.RPCConfig{Method: "m"}, nil, meta)
	require.Error(t, err)
	assert.Contains(t, err.Error(), "handler cannot be nil")
}

func TestServerRegisterDuplicateMethod(t *testing.T) {
	s := NewServer()
	cmd := &executeCommand{}
	meta := command.MessageTypeForCommand(cmd)

	require.NoError(t, s.Register(command.RPCConfig{Method: "fsm.apply_event"}, cmd, meta))
	err := s.Register(command.RPCConfig{Method: "fsm.apply_event"}, cmd, meta)
	require.Error(t, err)
	assert.Contains(t, err.Error(), "already registered")
}

func TestServerPayloadTypeMismatch(t *testing.T) {
	s := NewServer()
	cmd := &executeCommand{}
	meta := command.MessageTypeForCommand(cmd)

	require.NoError(t, s.Register(command.RPCConfig{Method: "fsm.apply_event"}, cmd, meta))
	_, err := s.Invoke(context.Background(), "fsm.apply_event", "wrong-type")
	require.Error(t, err)
	assert.Contains(t, err.Error(), "invalid payload type")
}

func TestServerNewMessageForMethod(t *testing.T) {
	s := NewServer()
	cmd := &executeCommand{}
	meta := command.MessageTypeForCommand(cmd)
	require.NoError(t, s.Register(command.RPCConfig{Method: "fsm.apply_event"}, cmd, meta))

	msg, err := s.NewMessageForMethod("fsm.apply_event")
	require.NoError(t, err)
	_, ok := msg.(testMessage)
	assert.True(t, ok)
}

func TestServerEndpointsSorted(t *testing.T) {
	s := NewServer()
	cmd := &executeCommand{}
	meta := command.MessageTypeForCommand(cmd)

	require.NoError(t, s.Register(command.RPCConfig{Method: "zeta"}, cmd, meta))
	require.NoError(t, s.Register(command.RPCConfig{Method: "alpha"}, cmd, meta))

	endpoints := s.Endpoints()
	require.Len(t, endpoints, 2)
	assert.Equal(t, "alpha", endpoints[0].Method)
	assert.Equal(t, "zeta", endpoints[1].Method)
}

func TestEndpointReturnsDefensiveCopy(t *testing.T) {
	s := NewServer()
	cmd := &executeCommand{}
	meta := command.MessageTypeForCommand(cmd)
	require.NoError(t, s.Register(command.RPCConfig{
		Method:      "copy.single",
		Permissions: []string{"fsm:write"},
		Roles:       []string{"admin"},
	}, cmd, meta))

	endpoint, ok := s.Endpoint("copy.single")
	require.True(t, ok)
	endpoint.Permissions[0] = "mutated"
	endpoint.Roles[0] = "guest"

	current, ok := s.Endpoint("copy.single")
	require.True(t, ok)
	assert.Equal(t, []string{"fsm:write"}, current.Permissions)
	assert.Equal(t, []string{"admin"}, current.Roles)
}

func TestEndpointsReturnsDefensiveCopies(t *testing.T) {
	s := NewServer()
	cmd := &executeCommand{}
	meta := command.MessageTypeForCommand(cmd)
	require.NoError(t, s.Register(command.RPCConfig{
		Method:      "copy.list",
		Permissions: []string{"fsm:write"},
		Roles:       []string{"admin"},
	}, cmd, meta))

	endpoints := s.Endpoints()
	require.Len(t, endpoints, 1)
	endpoints[0].Permissions[0] = "mutated"
	endpoints[0].Roles[0] = "guest"

	current, ok := s.Endpoint("copy.list")
	require.True(t, ok)
	assert.Equal(t, []string{"fsm:write"}, current.Permissions)
	assert.Equal(t, []string{"admin"}, current.Roles)
}

func TestResolver(t *testing.T) {
	s := NewServer()
	resolver := Resolver(s)
	cmd := &exposedExecuteCommand{method: "fsm.apply_event"}
	meta := command.MessageTypeForCommand(&cmd.executeCommand)

	err := resolver(cmd, meta, nil)
	require.NoError(t, err)

	_, invokeErr := s.Invoke(context.Background(), "fsm.apply_event", testMessage{Name: "bob"})
	require.NoError(t, invokeErr)
	assert.Equal(t, "bob", cmd.got.Name)
}

func TestResolverMissingServer(t *testing.T) {
	resolver := Resolver(nil)
	cmd := &exposedExecuteCommand{method: "fsm.apply_event"}

	err := resolver(cmd, command.CommandMeta{}, nil)
	require.Error(t, err)
	assert.Contains(t, err.Error(), "rpc server not configured")
}

func TestExecuteAndQueryErrorsBubbleUp(t *testing.T) {
	t.Run("execute error", func(t *testing.T) {
		s := NewServer()
		cmd := &executeCommand{err: errors.New("boom")}
		meta := command.MessageTypeForCommand(cmd)
		require.NoError(t, s.Register(command.RPCConfig{Method: "exec"}, cmd, meta))

		_, err := s.Invoke(context.Background(), "exec", testMessage{})
		require.Error(t, err)
		assert.Contains(t, err.Error(), "boom")
	})

	t.Run("query error", func(t *testing.T) {
		s := NewServer()
		cmd := &queryCommand{err: errors.New("boom")}
		meta := command.MessageTypeForCommand(cmd)
		require.NoError(t, s.Register(command.RPCConfig{Method: "qry"}, cmd, meta))

		_, err := s.Invoke(context.Background(), "qry", testMessage{})
		require.Error(t, err)
		assert.Contains(t, err.Error(), "boom")
	})
}

func TestServerRegisterRejectsTypedNilHandler(t *testing.T) {
	s := NewServer()
	var cmd *executeCommand
	err := s.Register(command.RPCConfig{Method: "nil.handler"}, cmd, command.CommandMeta{})
	require.Error(t, err)
	assert.Contains(t, err.Error(), "handler cannot be nil")
}

func TestServerRegisterEnforcesStrictErrorType(t *testing.T) {
	s := NewServer()

	execFn := func(_ context.Context, _ testMessage) concreteError {
		return concreteError{}
	}
	err := s.Register(command.RPCConfig{Method: "exec.strict"}, execFn, command.CommandMeta{})
	require.Error(t, err)
	assert.Contains(t, err.Error(), "must return error")

	queryFn := func(_ context.Context, _ testMessage) (string, concreteError) {
		return "", concreteError{}
	}
	err = s.Register(command.RPCConfig{Method: "query.strict"}, queryFn, command.CommandMeta{})
	require.Error(t, err)
	assert.Contains(t, err.Error(), "must return (result, error)")
}

func TestServerFailureModeRecoverConvertsPanicToError(t *testing.T) {
	s := NewServer(WithFailureMode(FailureModeRecover))
	handler := func(_ context.Context, _ testMessage) error {
		panic("boom")
	}
	require.NoError(t, s.Register(command.RPCConfig{Method: "panic.recover"}, handler, command.CommandMeta{}))

	out, err := s.Invoke(context.Background(), "panic.recover", testMessage{})
	require.Error(t, err)
	assert.Nil(t, out)
	assert.Contains(t, err.Error(), "panic")
}

func TestServerFailureModeLogAndContinueSkipsInvalidRegistration(t *testing.T) {
	var events []FailureEvent
	s := NewServer(
		WithFailureMode(FailureModeLogAndContinue),
		WithFailureLogger(func(event FailureEvent) {
			events = append(events, event)
		}),
	)
	invalidHandler := func(_ context.Context) error { return nil } // wrong arity

	err := s.Register(command.RPCConfig{Method: "bad.signature"}, invalidHandler, command.CommandMeta{})
	require.NoError(t, err)

	_, ok := s.Endpoint("bad.signature")
	assert.False(t, ok)
	require.Len(t, events, 1)
	assert.Equal(t, FailureStageRegister, events[0].Stage)
	assert.Equal(t, "bad.signature", events[0].Method)
	assert.Error(t, events[0].Err)
}

func TestServerFailureModeLogAndContinueSuppressesInvokePanic(t *testing.T) {
	var events []FailureEvent
	s := NewServer(
		WithFailureMode(FailureModeLogAndContinue),
		WithFailureLogger(func(event FailureEvent) {
			events = append(events, event)
		}),
	)
	handler := func(_ context.Context, _ testMessage) error {
		panic("boom")
	}
	require.NoError(t, s.Register(command.RPCConfig{Method: "panic.log"}, handler, command.CommandMeta{}))

	out, err := s.Invoke(context.Background(), "panic.log", testMessage{})
	require.NoError(t, err)
	assert.Nil(t, out)
	require.Len(t, events, 1)
	assert.Equal(t, FailureStageInvoke, events[0].Stage)
	assert.Equal(t, "panic.log", events[0].Method)
	assert.Error(t, events[0].Err)
	assert.Equal(t, "boom", events[0].Panic)
}

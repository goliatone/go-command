package flow

import (
	"context"
	"sync/atomic"
	"testing"
	"time"

	"github.com/goliatone/go-command"
	"github.com/goliatone/go-command/cron"
	"github.com/goliatone/go-command/dispatcher"
	commandregistry "github.com/goliatone/go-command/registry"
	"github.com/goliatone/go-command/runner"
)

type integrationAdapterMsg struct {
	ID    string
	Event string
}

func (integrationAdapterMsg) Type() string { return "integration.adapter.msg" }

func TestDispatcherCompositionSupportsFSMAndRegularCommanders(t *testing.T) {
	dispatcher.Reset()
	defer dispatcher.Reset()

	sm, store := buildAdapterIntegrationStateMachine(t)
	var regularCalls atomic.Int32

	subFSM := dispatcher.SubscribeCommand[integrationAdapterMsg](sm)
	defer subFSM.Unsubscribe()
	subRegular := dispatcher.SubscribeCommandFunc(func(context.Context, integrationAdapterMsg) error {
		regularCalls.Add(1)
		return nil
	})
	defer subRegular.Unsubscribe()

	if err := dispatcher.Dispatch(context.Background(), integrationAdapterMsg{ID: "entity-1", Event: "approve"}); err != nil {
		t.Fatalf("dispatch failed: %v", err)
	}
	if regularCalls.Load() != 1 {
		t.Fatalf("expected regular commander to run once, got %d", regularCalls.Load())
	}

	rec, err := store.Load(context.Background(), "entity-1")
	if err != nil {
		t.Fatalf("load state failed: %v", err)
	}
	if rec == nil || rec.State != "approved" {
		t.Fatalf("expected transitioned approved state")
	}
}

func TestRunnerRegistryAndCronIntegrationsRemainCompatible(t *testing.T) {
	t.Run("runner", func(t *testing.T) {
		sm, store := buildAdapterIntegrationStateMachine(t)
		if err := runner.RunCommand(context.Background(), runner.NewHandler(), sm, integrationAdapterMsg{ID: "entity-1", Event: "approve"}); err != nil {
			t.Fatalf("runner execute failed: %v", err)
		}
		rec, err := store.Load(context.Background(), "entity-1")
		if err != nil {
			t.Fatalf("load state failed: %v", err)
		}
		if rec == nil || rec.State != "approved" {
			t.Fatalf("expected runner path to transition state")
		}
	})

	t.Run("registry", func(t *testing.T) {
		dispatcher.Reset()
		defer dispatcher.Reset()

		sm, store := buildAdapterIntegrationStateMachine(t)
		var regularCalls atomic.Int32

		commandregistry.WithTestRegistry(func() {
			_, err := commandregistry.RegisterCommand[integrationAdapterMsg](sm)
			if err != nil {
				t.Fatalf("register fsm command: %v", err)
			}
			_, err = commandregistry.RegisterCommand(command.CommandFunc[integrationAdapterMsg](func(context.Context, integrationAdapterMsg) error {
				regularCalls.Add(1)
				return nil
			}))
			if err != nil {
				t.Fatalf("register regular command: %v", err)
			}
			if err := commandregistry.Start(context.Background()); err != nil {
				t.Fatalf("start registry: %v", err)
			}
			if err := dispatcher.Dispatch(context.Background(), integrationAdapterMsg{ID: "entity-1", Event: "approve"}); err != nil {
				t.Fatalf("dispatch through registry wiring failed: %v", err)
			}
		})

		if regularCalls.Load() != 1 {
			t.Fatalf("expected regular registry commander execution, got %d", regularCalls.Load())
		}
		rec, err := store.Load(context.Background(), "entity-1")
		if err != nil {
			t.Fatalf("load state failed: %v", err)
		}
		if rec == nil || rec.State != "approved" {
			t.Fatalf("expected registry-dispatched FSM transition")
		}
	})

	t.Run("cron", func(t *testing.T) {
		sm, store := buildAdapterIntegrationStateMachine(t)
		scheduler := cron.NewScheduler()
		defer func() {
			_ = scheduler.Stop(context.Background())
		}()

		handle, err := scheduler.ScheduleAfter(
			15*time.Millisecond,
			command.HandlerConfig{},
			command.CommandFunc[integrationAdapterMsg](func(ctx context.Context, _ integrationAdapterMsg) error {
				return sm.Execute(ctx, integrationAdapterMsg{ID: "entity-1", Event: "approve"})
			}),
		)
		if err != nil {
			t.Fatalf("schedule after failed: %v", err)
		}

		select {
		case <-handle.Done():
		case <-time.After(2 * time.Second):
			t.Fatalf("timed out waiting for scheduled execution")
		}
		if handle.Err() != nil {
			t.Fatalf("scheduled execution returned error: %v", handle.Err())
		}

		rec, err := store.Load(context.Background(), "entity-1")
		if err != nil {
			t.Fatalf("load state failed: %v", err)
		}
		if rec == nil || rec.State != "approved" {
			t.Fatalf("expected cron path to transition state")
		}
	})
}

func buildAdapterIntegrationStateMachine(t *testing.T) (*StateMachine[integrationAdapterMsg], *InMemoryStateStore) {
	t.Helper()

	cfg := StateMachineConfig{
		Entity:          "order",
		ExecutionPolicy: ExecutionPolicyLightweight,
		States:          []StateConfig{{Name: "draft", Initial: true}, {Name: "approved"}},
		Transitions:     []TransitionConfig{{Name: "approve", From: "draft", To: "approved"}},
	}
	req := TransitionRequest[integrationAdapterMsg]{
		StateKey: func(m integrationAdapterMsg) string { return m.ID },
		Event:    func(m integrationAdapterMsg) string { return m.Event },
	}
	store := NewInMemoryStateStore()
	sm, err := NewStateMachineFromDefinition(
		cfg.ToMachineDefinition(),
		store,
		req,
		NewResolverMap[integrationAdapterMsg](),
		nil,
		WithExecutionPolicy[integrationAdapterMsg](cfg.ExecutionPolicy),
	)
	if err != nil {
		t.Fatalf("build state machine: %v", err)
	}
	mustSeedStateRecord(t, sm, "entity-1", "draft")
	return sm, store
}

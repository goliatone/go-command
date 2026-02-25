package flow

import (
	"context"
	"strings"
	"testing"
	"time"

	"github.com/goliatone/go-command"
)

func newStateMachineFromConfig[T command.Message](
	cfg StateMachineConfig,
	store StateStore,
	req TransitionRequest[T],
	guards *GuardRegistry[T],
	actions *ActionRegistry[T],
	opts ...StateMachineOption[T],
) (*StateMachine[T], error) {
	def := cfg.ToMachineDefinition()
	baseOpts := []StateMachineOption[T]{WithExecutionPolicy[T](cfg.ExecutionPolicy)}
	if mode := strings.TrimSpace(string(cfg.HookFailureMode)); mode != "" {
		baseOpts = append(baseOpts, WithHookFailureMode[T](cfg.HookFailureMode))
	}
	baseOpts = append(baseOpts, opts...)
	return NewStateMachineFromDefinition(def, store, req, guardResolverAdapter[T]{guards: guards}, actions, baseOpts...)
}

func mustSeedStateRecord[T command.Message](t testing.TB, sm *StateMachine[T], entityID, state string) {
	t.Helper()
	if sm == nil || sm.store == nil {
		t.Fatalf("state machine store not configured")
	}
	if mem, ok := sm.store.(*InMemoryStateStore); ok {
		mem.mu.Lock()
		if mem.state == nil {
			mem.state = map[string]*StateRecord{}
		}
		mem.state[strings.TrimSpace(entityID)] = &StateRecord{
			EntityID:       strings.TrimSpace(entityID),
			State:          strings.TrimSpace(state),
			Version:        0,
			MachineID:      sm.machineID(),
			MachineVersion: sm.machineVersion(),
			UpdatedAt:      time.Now().UTC(),
		}
		mem.mu.Unlock()
		return
	}
	_, err := sm.store.SaveIfVersion(context.Background(), &StateRecord{
		EntityID:       entityID,
		State:          state,
		MachineID:      sm.machineID(),
		MachineVersion: sm.machineVersion(),
	}, 0)
	if err != nil {
		t.Fatalf("seed state for %s: %v", entityID, err)
	}
}

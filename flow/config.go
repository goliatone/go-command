package flow

import (
	"fmt"
	"strings"
	"time"
)

// FlowSet represents a collection of flows loaded from config.
type FlowSet struct {
	Version int              `json:"version" yaml:"version"`
	Flows   []FlowDefinition `json:"flows" yaml:"flows"`
	Options FlowOptions      `json:"options,omitempty" yaml:"options,omitempty"`
	Meta    map[string]any   `json:"meta,omitempty" yaml:"meta,omitempty"`
}

// Validate performs basic structural validation.
func (c FlowSet) Validate() error {
	for idx, def := range c.Flows {
		if err := def.Validate(); err != nil {
			return fmt.Errorf("flow[%d]: %w", idx, err)
		}
	}
	return nil
}

// FlowDefinition describes a single flow instance.
type FlowDefinition struct {
	ID           string              `json:"id" yaml:"id"`
	Type         string              `json:"type" yaml:"type"`
	Options      FlowOptions         `json:"options,omitempty" yaml:"options,omitempty"`
	Serial       *SerialConfig       `json:"serial,omitempty" yaml:"serial,omitempty"`
	Parallel     *ParallelConfig     `json:"parallel,omitempty" yaml:"parallel,omitempty"`
	Batch        *BatchConfig        `json:"batch,omitempty" yaml:"batch,omitempty"`
	Conditional  *ConditionalConfig  `json:"conditional,omitempty" yaml:"conditional,omitempty"`
	Saga         *SagaConfig         `json:"saga,omitempty" yaml:"saga,omitempty"`
	StateMachine *StateMachineConfig `json:"state_machine,omitempty" yaml:"state_machine,omitempty"`
	Decorators   []DecoratorConfig   `json:"decorators,omitempty" yaml:"decorators,omitempty"`
}

// Validate checks required fields for the flow definition.
func (d FlowDefinition) Validate() error {
	if d.ID == "" {
		return fmt.Errorf("id is required")
	}
	if d.Type == "" {
		return fmt.Errorf("type is required for flow %s", d.ID)
	}
	switch d.Type {
	case "serial":
		if d.Serial == nil || len(d.Serial.Steps) == 0 {
			return fmt.Errorf("serial flow %s requires steps", d.ID)
		}
	case "parallel":
		if d.Parallel == nil || len(d.Parallel.Steps) == 0 {
			return fmt.Errorf("parallel flow %s requires steps", d.ID)
		}
	case "batch":
		if d.Batch == nil || d.Batch.Handler == "" {
			return fmt.Errorf("batch flow %s requires handler", d.ID)
		}
	case "conditional":
		if d.Conditional == nil || len(d.Conditional.Branches) == 0 {
			return fmt.Errorf("conditional flow %s requires branches", d.ID)
		}
	case "saga":
		if d.Saga == nil || len(d.Saga.Steps) == 0 {
			return fmt.Errorf("saga flow %s requires steps", d.ID)
		}
	case "state_machine":
		if d.StateMachine == nil {
			return fmt.Errorf("state_machine flow %s requires definition", d.ID)
		}
		if err := d.StateMachine.Validate(); err != nil {
			return fmt.Errorf("state_machine %s invalid: %w", d.ID, err)
		}
	}
	return nil
}

// FlowOptions captures common runner options.
type FlowOptions struct {
	Timeout     time.Duration `json:"timeout,omitempty" yaml:"timeout,omitempty"`
	NoTimeout   bool          `json:"no_timeout,omitempty" yaml:"no_timeout,omitempty"`
	MaxRetries  int           `json:"max_retries,omitempty" yaml:"max_retries,omitempty"`
	MaxRuns     int           `json:"max_runs,omitempty" yaml:"max_runs,omitempty"`
	RunOnce     bool          `json:"run_once,omitempty" yaml:"run_once,omitempty"`
	ExitOnError bool          `json:"exit_on_error,omitempty" yaml:"exit_on_error,omitempty"`
	Deadline    time.Time     `json:"deadline,omitempty" yaml:"deadline,omitempty"`
}

type SerialConfig struct {
	Steps []string    `json:"steps" yaml:"steps"`
	Opts  FlowOptions `json:"options,omitempty" yaml:"options,omitempty"`
}

type ParallelConfig struct {
	Steps         []string    `json:"steps" yaml:"steps"`
	ErrorStrategy string      `json:"error_strategy,omitempty" yaml:"error_strategy,omitempty"`
	Opts          FlowOptions `json:"options,omitempty" yaml:"options,omitempty"`
}

type BatchConfig struct {
	Handler     string      `json:"handler" yaml:"handler"`
	BatchSize   int         `json:"batch_size,omitempty" yaml:"batch_size,omitempty"`
	Concurrency int         `json:"concurrency,omitempty" yaml:"concurrency,omitempty"`
	Opts        FlowOptions `json:"options,omitempty" yaml:"options,omitempty"`
}

type ConditionalBranch struct {
	Guard   string `json:"guard" yaml:"guard"`
	Handler string `json:"handler" yaml:"handler"`
}

type ConditionalConfig struct {
	Branches       []ConditionalBranch `json:"branches" yaml:"branches"`
	DefaultHandler string              `json:"default_handler,omitempty" yaml:"default_handler,omitempty"`
}

type SagaStepConfig struct {
	Do         string `json:"do" yaml:"do"`
	Compensate string `json:"compensate,omitempty" yaml:"compensate,omitempty"`
}

type SagaConfig struct {
	Steps             []SagaStepConfig `json:"steps" yaml:"steps"`
	CompensateOnError bool             `json:"compensate_on_error,omitempty" yaml:"compensate_on_error,omitempty"`
}

type TransitionConfig struct {
	Name   string `json:"name" yaml:"name"`
	From   string `json:"from" yaml:"from"`
	To     string `json:"to" yaml:"to"`
	Guard  string `json:"guard,omitempty" yaml:"guard,omitempty"`
	Action string `json:"action,omitempty" yaml:"action,omitempty"`
}

type StateConfig struct {
	Name        string `json:"name" yaml:"name"`
	Description string `json:"description,omitempty" yaml:"description,omitempty"`
	Terminal    bool   `json:"terminal,omitempty" yaml:"terminal,omitempty"`
	Initial     bool   `json:"initial,omitempty" yaml:"initial,omitempty"`
}

type StateMachineConfig struct {
	Entity          string             `json:"entity" yaml:"entity"`
	ExecutionPolicy ExecutionPolicy    `json:"execution_policy" yaml:"execution_policy"`
	HookFailureMode HookFailureMode    `json:"hook_failure_mode,omitempty" yaml:"hook_failure_mode,omitempty"`
	States          []StateConfig      `json:"states" yaml:"states"`
	Transitions     []TransitionConfig `json:"transitions" yaml:"transitions"`
	PersistWith     string             `json:"persist_with,omitempty" yaml:"persist_with,omitempty"`
}

// Validate ensures the state machine definition is well formed.
func (s StateMachineConfig) Validate() error {
	if s.Entity == "" {
		return fmt.Errorf("state machine entity required")
	}
	if !isValidExecutionPolicy(s.ExecutionPolicy) {
		return fmt.Errorf("state machine %s requires execution_policy (%s|%s)", s.Entity, ExecutionPolicyLightweight, ExecutionPolicyOrchestrated)
	}
	if mode := strings.TrimSpace(string(s.HookFailureMode)); mode != "" {
		if !isValidHookFailureMode(s.HookFailureMode) {
			return fmt.Errorf("state machine %s invalid hook_failure_mode %q", s.Entity, s.HookFailureMode)
		}
	}
	if len(s.States) == 0 {
		return fmt.Errorf("state machine %s requires at least one state", s.Entity)
	}
	stateSet := make(map[string]StateConfig, len(s.States))
	initialCount := 0
	for _, st := range s.States {
		name := strings.TrimSpace(st.Name)
		if name == "" {
			return fmt.Errorf("state machine %s has empty state name", s.Entity)
		}
		key := strings.ToLower(name)
		if _, exists := stateSet[key]; exists {
			return fmt.Errorf("state machine %s duplicate state %s", s.Entity, name)
		}
		stateSet[key] = st
		if st.Initial {
			initialCount++
		}
	}
	if initialCount > 1 {
		return fmt.Errorf("state machine %s has multiple initial states", s.Entity)
	}
	transitionSet := make(map[string]struct{}, len(s.Transitions))
	for _, tr := range s.Transitions {
		event := strings.ToLower(strings.TrimSpace(tr.Name))
		if event == "" {
			return fmt.Errorf("state machine %s transition missing name", s.Entity)
		}
		from := strings.ToLower(strings.TrimSpace(tr.From))
		to := strings.ToLower(strings.TrimSpace(tr.To))
		if from == "" || to == "" {
			return fmt.Errorf("state machine %s transition %s missing from/to", s.Entity, tr.Name)
		}
		key := from + "::" + event
		if _, exists := transitionSet[key]; exists {
			return fmt.Errorf("state machine %s duplicate transition for from=%s event=%s", s.Entity, tr.From, tr.Name)
		}
		transitionSet[key] = struct{}{}
		if _, ok := stateSet[from]; !ok {
			return fmt.Errorf("state machine %s transition %s references unknown from state %s", s.Entity, tr.Name, tr.From)
		}
		if _, ok := stateSet[to]; !ok {
			return fmt.Errorf("state machine %s transition %s references unknown to state %s", s.Entity, tr.Name, tr.To)
		}
	}
	return nil
}

// ToMachineDefinition emits a canonical machine definition for runtime assembly.
func (s StateMachineConfig) ToMachineDefinition() *MachineDefinition {
	def := &MachineDefinition{
		ID:      strings.TrimSpace(s.Entity),
		Name:    strings.TrimSpace(s.Entity),
		Version: "v1",
	}
	for _, st := range s.States {
		def.States = append(def.States, StateDefinition{
			Name:     st.Name,
			Initial:  st.Initial,
			Terminal: st.Terminal,
		})
	}
	for _, tr := range s.Transitions {
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

type DecoratorConfig struct {
	Type   string         `json:"type" yaml:"type"`
	Config map[string]any `json:"config,omitempty" yaml:"config,omitempty"`
}

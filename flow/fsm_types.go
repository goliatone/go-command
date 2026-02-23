package flow

import (
	"context"
	"time"
)

// ExecutionContext carries caller identity and tenancy information.
type ExecutionContext struct {
	ActorID string
	Roles   []string
	Tenant  string
}

// ApplyEventRequest is the canonical runtime envelope for transitions.
type ApplyEventRequest[T any] struct {
	EntityID        string
	Event           string
	Msg             T
	ExecCtx         ExecutionContext
	ExpectedState   string
	ExpectedVersion int
}

// ApplyEventResponse is the canonical transport-agnostic transition envelope.
type ApplyEventResponse[T any] struct {
	Transition *TransitionResult[T]
	Snapshot   *Snapshot
	Execution  *ExecutionHandle
}

// ExecutionHandle describes external orchestration execution state.
type ExecutionHandle struct {
	ExecutionID string
	Policy      string
	Status      string
	Metadata    map[string]any
}

// SnapshotRequest is the canonical request envelope for snapshot reads.
type SnapshotRequest[T any] struct {
	EntityID string
	Msg      T
	ExecCtx  ExecutionContext
}

// Snapshot captures current state and transition metadata.
type Snapshot struct {
	EntityID           string
	CurrentState       string
	AllowedTransitions []TransitionInfo
	Metadata           map[string]any
}

// TransitionInfo describes one transition available from snapshot state.
type TransitionInfo struct {
	ID       string
	Event    string
	Target   TargetInfo
	Metadata map[string]any
}

// TargetInfo captures static/dynamic target metadata.
type TargetInfo struct {
	Kind       string
	To         string
	Resolver   string
	Resolved   bool
	ResolvedTo string
	Candidates []string
}

// Effect models an orchestration side effect emitted by transitions.
type Effect interface{}

// CommandEffect models command-backed side effects.
type CommandEffect struct {
	ActionID string
	Payload  map[string]any
	Async    bool
	Delay    time.Duration
	Timeout  time.Duration
	Metadata map[string]any
}

// EmitEvent models runtime-emitted follow-up events.
type EmitEvent struct {
	Event    string
	Msg      any
	Metadata map[string]any
}

// TransitionResult captures transition execution outcome.
type TransitionResult[T any] struct {
	PreviousState string
	CurrentState  string
	Effects       []Effect
}

// State is a compiled runtime state.
type State struct {
	Name     string
	Initial  bool
	Metadata map[string]any
}

// Guard is a runtime guard predicate.
type Guard[T any] func(ctx context.Context, msg T, execCtx ExecutionContext) error

// DynamicTargetResolver resolves transition targets at runtime.
type DynamicTargetResolver[T any] func(ctx context.Context, msg T, execCtx ExecutionContext) (string, error)

// Step is a compiled workflow step descriptor.
type Step struct {
	ActionID string
	Async    bool
	Delay    time.Duration
	Timeout  time.Duration
	Metadata map[string]any
}

// CompiledWorkflowNode is a compiled workflow graph node.
type CompiledWorkflowNode struct {
	ID            string
	Kind          string
	Step          *Step
	ConditionExpr string
	Next          []string
	Metadata      map[string]any
}

// CompiledWorkflowPlan is the compiled transition workflow graph.
type CompiledWorkflowPlan struct {
	Nodes []CompiledWorkflowNode
}

// CompiledTransition is the executable transition contract.
type CompiledTransition[T any] struct {
	ID              string
	Event           string
	From            string
	To              string
	DynamicTo       DynamicTargetResolver[T]
	DynamicResolver string
	Guards          []Guard[T]
	Plan            CompiledWorkflowPlan
	Metadata        map[string]any
}

// CompiledMachine is the executable machine contract.
type CompiledMachine[T any] struct {
	ID          string
	Version     string
	States      []State
	Transitions []CompiledTransition[T]
}

// MachineDefinition is the canonical authoring/interchange contract.
type MachineDefinition struct {
	ID          string
	Name        string
	Version     string
	States      []StateDefinition
	Transitions []TransitionDefinition
}

// StateDefinition is a canonical authoring state.
type StateDefinition struct {
	Name     string
	Initial  bool
	Terminal bool
	Metadata map[string]any
}

// TransitionDefinition is a canonical authoring transition.
type TransitionDefinition struct {
	ID        string
	Event     string
	From      string
	To        string
	DynamicTo *DynamicTargetDefinition
	Guards    []GuardDefinition
	Workflow  TransitionWorkflowDefinition
	Metadata  map[string]any
}

// GuardDefinition describes declarative guard references.
type GuardDefinition struct {
	Type     string
	Expr     string
	Ref      string
	Metadata map[string]any
}

// DynamicTargetDefinition declares a target resolver reference.
type DynamicTargetDefinition struct {
	Resolver string
}

// StepDefinition is a canonical authoring workflow step.
type StepDefinition struct {
	ActionID string
	Async    bool
	Delay    string
	Timeout  string
	Metadata map[string]any
}

// WorkflowNodeDefinition describes a declarative workflow graph node.
type WorkflowNodeDefinition struct {
	ID       string
	Kind     string
	Step     *StepDefinition
	Expr     string
	Next     []string
	Metadata map[string]any
}

// TransitionWorkflowDefinition is a declarative transition workflow.
type TransitionWorkflowDefinition struct {
	Nodes []WorkflowNodeDefinition
}

// ResolverRegistry resolves runtime guard and dynamic target references.
type ResolverRegistry[T any] interface {
	Guard(ref string) (Guard[T], bool)
	DynamicTarget(ref string) (DynamicTargetResolver[T], bool)
}

package flow

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/goliatone/go-command"
	"github.com/goliatone/go-command/runner"
	"gopkg.in/yaml.v3"
)

// BuildContext bundles registries and stores needed to construct flows from config.
type BuildContext[T command.Message] struct {
	Handlers *HandlerRegistry[T]
	Guards   *GuardRegistry[T]
	Actions  *ActionRegistry[T]
	Store    StateStore
	Request  TransitionRequest[T]
}

// ParseFlowSet attempts to parse JSON or YAML into a FlowSet.
func ParseFlowSet(data []byte) (FlowSet, error) {
	var cfg FlowSet
	if err := yaml.Unmarshal(data, &cfg); err != nil {
		// yaml can handle JSON too, so a single attempt is fine
		return cfg, err
	}
	return cfg, cfg.Validate()
}

// BuildFlows constructs flows from config using provided registries.
func BuildFlows[T command.Message](ctx context.Context, cfg FlowSet, bctx BuildContext[T]) (map[string]Flow[T], error) {
	if err := cfg.Validate(); err != nil {
		return nil, err
	}
	flows := make(map[string]Flow[T], len(cfg.Flows))
	for _, def := range cfg.Flows {
		flow, err := buildFlow(ctx, cfg.Options, def, bctx)
		if err != nil {
			return nil, fmt.Errorf("build flow %s: %w", def.ID, err)
		}
		flows[def.ID] = flow
	}
	return flows, nil
}

func buildFlow[T command.Message](ctx context.Context, defaults FlowOptions, def FlowDefinition, bctx BuildContext[T]) (Flow[T], error) {
	baseOpts := mergeFlowOptions(FlowOptions{}, defaults, def.Options)

	switch def.Type {
	case "serial":
		opts := buildRunnerOptions(mergeFlowOptions(baseOpts, def.Serial.Opts))
		cmds, err := handlersFromIDs(def.Serial.Steps, bctx.Handlers)
		if err != nil {
			return nil, err
		}
		return NewSerialExecutor(cmds, opts...), nil
	case "parallel":
		opts := buildRunnerOptions(mergeFlowOptions(baseOpts, def.Parallel.Opts))
		cmds, err := handlersFromIDs(def.Parallel.Steps, bctx.Handlers)
		if err != nil {
			return nil, err
		}
		exec := NewParallelExecutor(cmds, opts...)
		if strings.EqualFold(def.Parallel.ErrorStrategy, "fail_fast") {
			exec.WithErrorStrategy(FailFastStrategy{})
		}
		return exec, nil
	case "batch":
		return nil, fmt.Errorf("batch flows require slice message types and are not built by BuildFlows")
	case "conditional":
		branches, err := conditionalBranches(def.Conditional.Branches, bctx.Handlers)
		if err != nil {
			return nil, err
		}
		var optFns []ConditionalOption[T]
		if bctx.Guards != nil {
			optFns = append(optFns, WithGuardRegistry(bctx.Guards))
		}
		if def.Conditional.DefaultHandler != "" {
			h, err := handlerFromID(def.Conditional.DefaultHandler, bctx.Handlers)
			if err != nil {
				return nil, err
			}
			optFns = append(optFns, WithDefaultHandler(func(c context.Context, m T) error { return h.Execute(c, m) }))
		}
		return NewConditionalExecutor(branches, optFns...), nil
	case "saga":
		steps, err := sagaSteps(def.Saga.Steps, bctx.Handlers)
		if err != nil {
			return nil, err
		}
		return NewSaga(steps, def.Saga.CompensateOnError), nil
	case "state_machine":
		req := bctx.Request
		if req.StateKey == nil || req.Event == nil {
			return nil, fmt.Errorf("state_machine requires StateKey and Event extractors")
		}
		definition := def.StateMachine.ToMachineDefinition()
		smOpts := []StateMachineOption[T]{
			WithExecutionPolicy[T](def.StateMachine.ExecutionPolicy),
		}
		if mode := strings.TrimSpace(string(def.StateMachine.HookFailureMode)); mode != "" {
			smOpts = append(smOpts, WithHookFailureMode[T](def.StateMachine.HookFailureMode))
		}
		sm, err := NewStateMachineFromDefinition(
			definition,
			bctx.Store,
			req,
			guardResolverAdapter[T]{guards: bctx.Guards},
			bctx.Actions,
			smOpts...,
		)
		if err != nil {
			return nil, err
		}
		return sm, nil
	default:
		return nil, fmt.Errorf("unsupported flow type %s", def.Type)
	}
}

func buildRunnerOptions(opts FlowOptions) []runner.Option {
	var res []runner.Option
	if opts.NoTimeout {
		res = append(res, runner.WithNoTimeout())
	} else if opts.Timeout > 0 {
		res = append(res, runner.WithTimeout(opts.Timeout))
	}
	if !opts.Deadline.IsZero() {
		res = append(res, runner.WithDeadline(opts.Deadline))
	}
	if opts.MaxRetries > 0 {
		res = append(res, runner.WithMaxRetries(opts.MaxRetries))
	}
	if opts.MaxRuns > 0 {
		res = append(res, runner.WithMaxRuns(opts.MaxRuns))
	}
	if opts.RunOnce {
		res = append(res, runner.WithRunOnce(true))
	}
	if opts.ExitOnError {
		res = append(res, runner.WithExitOnError(true))
	}
	return res
}

func handlersFromIDs[T command.Message](ids []string, reg *HandlerRegistry[T]) ([]command.Commander[T], error) {
	var result []command.Commander[T]
	for _, id := range ids {
		h, err := handlerFromID(id, reg)
		if err != nil {
			return nil, err
		}
		result = append(result, h)
	}
	return result, nil
}

func handlerFromID[T command.Message](id string, reg *HandlerRegistry[T]) (command.Commander[T], error) {
	if reg == nil {
		return nil, fmt.Errorf("handler registry not configured for %s", id)
	}
	h, ok := reg.Lookup(id)
	if !ok {
		return nil, fmt.Errorf("handler %s not found", id)
	}
	return h, nil
}

func conditionalBranches[T command.Message](branches []ConditionalBranch, reg *HandlerRegistry[T]) ([]Conditional[T], error) {
	var out []Conditional[T]
	for _, b := range branches {
		h, err := handlerFromID(b.Handler, reg)
		if err != nil {
			return nil, err
		}
		handler := h
		out = append(out, Conditional[T]{
			Guard: b.Guard,
			Handler: func(ctx context.Context, msg T) error {
				return handler.Execute(ctx, msg)
			},
		})
	}
	return out, nil
}

func sagaSteps[T command.Message](cfg []SagaStepConfig, reg *HandlerRegistry[T]) ([]SagaStep[T], error) {
	var steps []SagaStep[T]
	for _, stepCfg := range cfg {
		do, err := handlerFromID(stepCfg.Do, reg)
		if err != nil {
			return nil, err
		}
		doHandler := do
		var comp command.Commander[T]
		if stepCfg.Compensate != "" {
			comp, err = handlerFromID(stepCfg.Compensate, reg)
			if err != nil {
				return nil, err
			}
		}
		compHandler := comp
		steps = append(steps, SagaStep[T]{
			Name: stepCfg.Do,
			Execute: func(ctx context.Context, msg T) error {
				return doHandler.Execute(ctx, msg)
			},
			Compensate: func(ctx context.Context, msg T) error {
				if compHandler == nil {
					return nil
				}
				return compHandler.Execute(ctx, msg)
			},
		})
	}
	return steps, nil
}

func mergeFlowOptions(base FlowOptions, overrides ...FlowOptions) FlowOptions {
	out := base
	for _, opt := range overrides {
		if opt.Timeout > 0 {
			out.Timeout = opt.Timeout
		}
		if opt.NoTimeout {
			out.NoTimeout = true
		}
		if opt.MaxRetries > 0 {
			out.MaxRetries = opt.MaxRetries
		}
		if opt.MaxRuns > 0 {
			out.MaxRuns = opt.MaxRuns
		}
		if opt.RunOnce {
			out.RunOnce = true
		}
		if opt.ExitOnError {
			out.ExitOnError = true
		}
		if !opt.Deadline.IsZero() {
			out.Deadline = opt.Deadline
		}
	}
	return out
}

// MarshalFlowSet renders FlowSet as JSON (useful for fixtures).
func MarshalFlowSet(cfg FlowSet) ([]byte, error) {
	return json.Marshal(cfg)
}

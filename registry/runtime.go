package registry

import (
	"context"
	"sync"

	"github.com/goliatone/go-command"
	"github.com/goliatone/go-command/cron"
	"github.com/goliatone/go-command/dispatcher"
	"github.com/goliatone/go-command/router"
	"github.com/goliatone/go-command/runner"
)

// CronScheduler is the minimum cron dependency needed for runtime composition.
type CronScheduler interface {
	AddHandler(opts command.HandlerConfig, handler any) (cron.Subscription, error)
}

// RuntimeDependencies captures explicit runtime wiring dependencies.
type RuntimeDependencies struct {
	Registry *command.Registry

	Dispatcher   any
	Router       *router.Mux
	Scheduler    CronScheduler
	Orchestrator any

	RunnerDefaults []runner.Option

	CronRegister func(opts command.HandlerConfig, handler any) error
	RPCRegister  func(opts command.RPCConfig, handler any, meta command.CommandMeta) error

	SubscribeCommand func(cmd any, opts ...runner.Option) (dispatcher.Subscription, error)
	SubscribeQuery   func(qry any, opts ...runner.Option) (dispatcher.Subscription, error)
}

// RuntimeContainer is an instance-first registry composition container.
type RuntimeContainer struct {
	mu   sync.Mutex
	deps RuntimeDependencies
	reg  *command.Registry
	subs []dispatcher.Subscription
}

// NewRuntimeContainer builds a runtime with explicit dependencies.
func NewRuntimeContainer(deps RuntimeDependencies) *RuntimeContainer {
	reg := deps.Registry
	if reg == nil {
		reg = command.NewRegistry()
	}

	rt := &RuntimeContainer{
		deps: deps,
		reg:  reg,
	}

	switch {
	case deps.CronRegister != nil:
		rt.reg.SetCronRegister(deps.CronRegister)
	case deps.Scheduler != nil:
		rt.reg.SetCronRegister(func(opts command.HandlerConfig, handler any) error {
			_, err := deps.Scheduler.AddHandler(opts, handler)
			return err
		})
	}

	if deps.RPCRegister != nil {
		rt.reg.SetRPCRegister(deps.RPCRegister)
	}

	return rt
}

// Dependencies returns a copy of runtime dependencies.
func (r *RuntimeContainer) Dependencies() RuntimeDependencies {
	if r == nil {
		return RuntimeDependencies{}
	}
	r.mu.Lock()
	defer r.mu.Unlock()
	copyDeps := r.deps
	if len(copyDeps.RunnerDefaults) > 0 {
		copyDeps.RunnerDefaults = append([]runner.Option(nil), copyDeps.RunnerDefaults...)
	}
	return copyDeps
}

// Registry returns the backing command registry instance.
func (r *RuntimeContainer) Registry() *command.Registry {
	if r == nil {
		return nil
	}
	return r.reg
}

// RegisterCommand registers command in injected dispatcher hooks (optional) and registry.
func (r *RuntimeContainer) RegisterCommand(cmd any) error {
	if r == nil || r.reg == nil {
		return nil
	}
	if r.deps.SubscribeCommand != nil {
		sub, err := r.deps.SubscribeCommand(cmd, r.deps.RunnerDefaults...)
		if err != nil {
			return err
		}
		if sub != nil {
			r.mu.Lock()
			r.subs = append(r.subs, sub)
			r.mu.Unlock()
		}
	}
	return r.reg.RegisterCommand(cmd)
}

// RegisterQuery registers query in injected dispatcher hooks (optional) and registry.
func (r *RuntimeContainer) RegisterQuery(qry any) error {
	if r == nil || r.reg == nil {
		return nil
	}
	if r.deps.SubscribeQuery != nil {
		sub, err := r.deps.SubscribeQuery(qry, r.deps.RunnerDefaults...)
		if err != nil {
			return err
		}
		if sub != nil {
			r.mu.Lock()
			r.subs = append(r.subs, sub)
			r.mu.Unlock()
		}
	}
	return r.reg.RegisterCommand(qry)
}

// AddResolver adds a resolver to the backing registry.
func (r *RuntimeContainer) AddResolver(key string, res command.Resolver) error {
	if r == nil || r.reg == nil {
		return nil
	}
	return r.reg.AddResolver(key, res)
}

// HasResolver reports resolver registration state.
func (r *RuntimeContainer) HasResolver(key string) bool {
	if r == nil || r.reg == nil {
		return false
	}
	return r.reg.HasResolver(key)
}

// Start initializes the backing registry.
func (r *RuntimeContainer) Start(_ context.Context) error {
	if r == nil || r.reg == nil {
		return nil
	}
	return r.reg.Initialize()
}

// Stop unsubscribes runtime subscriptions and clears local state.
func (r *RuntimeContainer) Stop(_ context.Context) error {
	if r == nil {
		return nil
	}
	r.mu.Lock()
	subs := r.subs
	r.subs = nil
	r.mu.Unlock()
	for _, sub := range subs {
		if sub != nil {
			sub.Unsubscribe()
		}
	}
	return nil
}

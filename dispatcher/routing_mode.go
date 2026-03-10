package dispatcher

import (
	"fmt"

	"github.com/goliatone/go-command/router"
	"github.com/goliatone/go-errors"
)

type RoutingMode string

const (
	RoutingModeExact RoutingMode = "exact"
	RoutingModeRich  RoutingMode = "rich"
)

const (
	TextCodeInvalidRoutingMode    = "INVALID_ROUTING_MODE"
	TextCodeDispatchRoutingLocked = "DISPATCH_ROUTING_MODE_LOCKED"
)

type RoutingOption func(*routingConfig)

type routingConfig struct {
	mode            RoutingMode
	richMatcher     func(pattern, topic string) bool
	richStrategy    router.MatchStrategy
	richStrategySet bool
}

var commandRoutingConfig = routingConfig{
	mode: RoutingModeExact,
}

func WithRoutingMatcher(matcher func(pattern, topic string) bool) RoutingOption {
	return func(cfg *routingConfig) {
		if cfg == nil {
			return
		}
		cfg.richMatcher = matcher
	}
}

func WithRoutingMatchStrategy(strategy router.MatchStrategy) RoutingOption {
	return func(cfg *routingConfig) {
		if cfg == nil {
			return
		}
		cfg.richStrategy = strategy
		cfg.richStrategySet = true
	}
}

func SetCommandRoutingMode(mode RoutingMode, opts ...RoutingOption) error {
	if err := validateRoutingMode(mode); err != nil {
		return err
	}

	cfg := routingConfig{mode: mode}
	for _, opt := range opts {
		if opt != nil {
			opt(&cfg)
		}
	}

	testMuxMu.Lock()
	defer testMuxMu.Unlock()

	if hasTrackedSubscriptions() {
		return errors.New("cannot change routing mode after subscriptions are registered", errors.CategoryConflict).
			WithCode(errors.CodeConflict).
			WithTextCode(TextCodeDispatchRoutingLocked)
	}

	commandRoutingConfig = cfg
	defaultCommandMux = newMuxForRouting(commandRoutingConfig)
	defaultQueryMux = newMuxForRouting(commandRoutingConfig)

	return nil
}

func CommandRoutingMode() RoutingMode {
	testMuxMu.RLock()
	defer testMuxMu.RUnlock()
	return commandRoutingConfig.mode
}

func validateRoutingMode(mode RoutingMode) error {
	switch mode {
	case RoutingModeExact, RoutingModeRich:
		return nil
	default:
		return errors.New("invalid routing mode", errors.CategoryValidation).
			WithTextCode(TextCodeInvalidRoutingMode).
			WithMetadata(map[string]any{
				"mode": fmt.Sprint(mode),
			})
	}
}

func resetRoutingConfigLocked() {
	commandRoutingConfig = routingConfig{
		mode: RoutingModeExact,
	}
	defaultCommandMux = newMuxForRouting(commandRoutingConfig)
	defaultQueryMux = newMuxForRouting(commandRoutingConfig)
}

func newMuxForRouting(cfg routingConfig) *router.Mux {
	switch cfg.mode {
	case RoutingModeRich:
		options := make([]router.Option, 0, 2)
		if cfg.richMatcher != nil {
			options = append(options, router.WithMatcher(cfg.richMatcher))
		}
		if cfg.richStrategySet {
			options = append(options, router.WithMatchStrategy(cfg.richStrategy))
		}
		return router.NewMux(options...)
	default:
		return router.NewMux(
			router.WithMatcher(exactRouteMatcher),
			router.WithMatchStrategy(router.MatchStrategyFirst),
		)
	}
}

func exactRouteMatcher(pattern, topic string) bool {
	return pattern == topic
}

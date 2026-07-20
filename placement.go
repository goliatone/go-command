package command

import (
	"context"
	"reflect"
	"sort"
	"strings"
)

// PlacementPolicy binds one kind-qualified registration ID to a logical route.
type PlacementPolicy struct {
	Kind           HandlerKind
	RegistrationID string
	Route          DispatchRoute
}

// PlacementPoliciesProvider exposes copied policies so a runtime can validate
// them against a replacement registration generation.
type PlacementPoliciesProvider interface {
	PlacementResolver
	PlacementPolicies() []PlacementPolicy
}

type placementPolicyKey struct {
	kind HandlerKind
	id   string
}

type placementPolicySnapshot struct {
	policies map[placementPolicyKey]DispatchRoute
	ordered  []PlacementPolicy
}

func NewPlacementPolicySnapshot(provider RegistrationProvider, policies ...PlacementPolicy) (PlacementPoliciesProvider, error) {
	if isNilRegistrationProviderValue(provider) {
		return nil, NewRegistrationProviderNotConfiguredError()
	}
	ordered := append([]PlacementPolicy(nil), policies...)
	for index := range ordered {
		ordered[index].RegistrationID = strings.TrimSpace(ordered[index].RegistrationID)
		ordered[index].Route = NormalizeDispatchRoute(ordered[index].Route)
	}
	sort.Slice(ordered, func(i, j int) bool {
		if ordered[i].Kind != ordered[j].Kind {
			return ordered[i].Kind < ordered[j].Kind
		}
		return ordered[i].RegistrationID < ordered[j].RegistrationID
	})

	snapshot := &placementPolicySnapshot{
		policies: make(map[placementPolicyKey]DispatchRoute, len(ordered)),
		ordered:  make([]PlacementPolicy, 0, len(ordered)),
	}
	for _, policy := range ordered {
		if policy.Kind != HandlerKindCommand && policy.Kind != HandlerKindQuery {
			return nil, NewInvalidDispatchRouteError(policy.Route).
				WithMetadata(map[string]any{"handler_kind": policy.Kind})
		}
		if policy.RegistrationID == "" {
			return nil, NewRegistrationNotFoundError(policy.Kind, policy.RegistrationID)
		}
		if _, ok := provider.RegistrationByID(policy.Kind, policy.RegistrationID); !ok {
			return nil, NewRegistrationNotFoundError(policy.Kind, policy.RegistrationID)
		}
		if err := ValidateDispatchRoute(policy.Route); err != nil {
			return nil, err
		}
		key := placementPolicyKey{kind: policy.Kind, id: policy.RegistrationID}
		if _, exists := snapshot.policies[key]; exists {
			return nil, NewRegistrationConflictError(policy.Kind, policy.RegistrationID).
				WithMetadata(map[string]any{"conflict_axis": "placement_policy"})
		}
		snapshot.policies[key] = policy.Route
		snapshot.ordered = append(snapshot.ordered, policy)
	}
	return snapshot, nil
}

func isNilRegistrationProviderValue(provider RegistrationProvider) bool {
	if provider == nil {
		return true
	}
	value := reflect.ValueOf(provider)
	switch value.Kind() {
	case reflect.Chan, reflect.Func, reflect.Interface, reflect.Map, reflect.Pointer, reflect.Slice:
		return value.IsNil()
	default:
		return false
	}
}

func (s *placementPolicySnapshot) ResolvePlacement(_ context.Context, registration MessageRegistration, _ DispatchOptions) (DispatchRoute, bool, error) {
	if s == nil || isNilRegistration(registration) {
		return DispatchRoute{}, false, nil
	}
	route, ok := s.policies[placementPolicyKey{kind: registration.Kind(), id: strings.TrimSpace(registration.ID())}]
	return route, ok, nil
}

func (s *placementPolicySnapshot) PlacementPolicies() []PlacementPolicy {
	if s == nil || len(s.ordered) == 0 {
		return nil
	}
	return append([]PlacementPolicy(nil), s.ordered...)
}

func ValidateDispatchRoute(route DispatchRoute) error {
	route = NormalizeDispatchRoute(route)
	switch route.Target {
	case DispatchTargetLocal:
		return nil
	case DispatchTargetRemote:
		if route.Name != "" {
			return nil
		}
	}
	return NewInvalidDispatchRouteError(route)
}

// NormalizeDispatchRoute returns the canonical logical route representation
// used for validation, adapter invocation, outcomes, and lifecycle events.
func NormalizeDispatchRoute(route DispatchRoute) DispatchRoute {
	route.Name = strings.TrimSpace(route.Name)
	return route
}

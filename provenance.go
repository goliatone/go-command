package command

import (
	"context"
	"strings"
)

// DispatchProvenance carries transport-neutral ingress identity without
// exposing broker envelopes or payloads.
type DispatchProvenance struct {
	IngressKind   string
	Route         string
	DeliveryID    string
	Attempt       int
	CorrelationID string
	CausationID   string
}

type dispatchProvenanceKey struct{}

func ContextWithDispatchProvenance(ctx context.Context, provenance DispatchProvenance) context.Context {
	if ctx == nil {
		ctx = context.Background()
	}
	provenance.IngressKind = strings.TrimSpace(provenance.IngressKind)
	provenance.Route = strings.TrimSpace(provenance.Route)
	provenance.DeliveryID = strings.TrimSpace(provenance.DeliveryID)
	provenance.CorrelationID = strings.TrimSpace(provenance.CorrelationID)
	provenance.CausationID = strings.TrimSpace(provenance.CausationID)
	return context.WithValue(ctx, dispatchProvenanceKey{}, provenance)
}

func DispatchProvenanceFromContext(ctx context.Context) (DispatchProvenance, bool) {
	if ctx == nil {
		return DispatchProvenance{}, false
	}
	provenance, ok := ctx.Value(dispatchProvenanceKey{}).(DispatchProvenance)
	return provenance, ok
}

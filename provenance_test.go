package command

import (
	"context"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestDispatchProvenanceContextIsNilSafeAndValueBased(t *testing.T) {
	provenance := DispatchProvenance{
		IngressKind: " event ", Route: " worker ", DeliveryID: " delivery ", Attempt: 2,
		CorrelationID: " corr ", CausationID: " cause ",
	}
	ctx := ContextWithDispatchProvenance(nil, provenance)
	got, ok := DispatchProvenanceFromContext(ctx)
	require.True(t, ok)
	assert.Equal(t, "event", got.IngressKind)
	assert.Equal(t, "worker", got.Route)
	assert.Equal(t, 2, got.Attempt)
	_, ok = DispatchProvenanceFromContext(context.Background())
	assert.False(t, ok)
}

package command

import (
	"context"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestForcedLocalDispatchContextMarkerIsPrivateAndNilSafe(t *testing.T) {
	assert.False(t, ForcedLocalDispatchFromContext(nil))
	ctx := ContextWithForcedLocalDispatch(nil)
	assert.True(t, ForcedLocalDispatchFromContext(ctx))
	assert.False(t, ForcedLocalDispatchFromContext(context.WithValue(context.Background(), "forced_local", true)))
}

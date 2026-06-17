package rpc_test

import (
	"encoding/json"
	"testing"
	"time"

	command "github.com/goliatone/go-command"
	cmdrpc "github.com/goliatone/go-command/rpc"
	"github.com/stretchr/testify/require"
)

func TestCommandDispatchRequestEnvelopeRoundTrip(t *testing.T) {
	req := cmdrpc.RequestEnvelope[command.CommandDispatchRequest]{
		Data: command.CommandDispatchRequest{
			CommandID: "catalog.inspect",
			Payload:   map[string]any{"entity_id": "event-1"},
			IDs:       []string{"event-1"},
			Options: command.DispatchOptions{
				Mode:          command.ExecutionModeInline,
				CorrelationID: "corr-1",
			},
		},
		Meta: cmdrpc.RequestMeta{ActorID: "actor-1"},
	}

	raw, err := json.Marshal(req)
	require.NoError(t, err)
	var decoded cmdrpc.RequestEnvelope[command.CommandDispatchRequest]
	require.NoError(t, json.Unmarshal(raw, &decoded))
	require.Equal(t, "catalog.inspect", decoded.Data.ResolvedCommandID())
	require.Equal(t, "event-1", decoded.Data.Payload["entity_id"])
	require.Equal(t, "corr-1", decoded.Data.Options.CorrelationID)
	require.Equal(t, "actor-1", decoded.Meta.ActorID)
	require.NoError(t, command.ValidateCommandDispatchRequest(decoded.Data))
}

func TestCommandDispatchResponseEnvelopeRoundTrip(t *testing.T) {
	now := time.Now().UTC()
	resp := cmdrpc.ResponseEnvelope[command.CommandDispatchResponse]{
		Data: command.CommandDispatchResponse{
			Receipt: command.DispatchReceipt{
				Accepted:      true,
				Mode:          command.ExecutionModeQueued,
				CommandID:     "catalog.reindex",
				DispatchID:    "dispatch-1",
				EnqueuedAt:    &now,
				CorrelationID: "corr-1",
			},
			Result:          map[string]any{"accepted": true},
			StatusReference: "/admin/commands/runs/dispatch-1",
		},
	}

	raw, err := json.Marshal(resp)
	require.NoError(t, err)
	var decoded cmdrpc.ResponseEnvelope[command.CommandDispatchResponse]
	require.NoError(t, json.Unmarshal(raw, &decoded))
	require.Equal(t, "dispatch-1", decoded.Data.Receipt.DispatchID)
	require.Equal(t, "/admin/commands/runs/dispatch-1", decoded.Data.StatusReference)
	require.NoError(t, command.ValidateCommandDispatchResponse(decoded.Data))
}

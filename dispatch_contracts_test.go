package command

import (
	"context"
	"testing"
	"time"

	gerrors "github.com/goliatone/go-errors"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestExecutionModeValidationAndParsing(t *testing.T) {
	require.NoError(t, ValidateExecutionMode(""))
	require.NoError(t, ValidateExecutionMode(ExecutionModeInline))
	require.NoError(t, ValidateExecutionMode(ExecutionModeQueued))

	mode, err := ParseExecutionMode(" INLINE ")
	require.NoError(t, err)
	require.Equal(t, ExecutionModeInline, mode)

	mode, err = ParseExecutionMode("")
	require.NoError(t, err)
	require.Equal(t, ExecutionMode(""), mode)

	err = ValidateExecutionMode("bad-mode")
	gerr := mustGoError(t, err)
	assert.Equal(t, TextCodeInvalidExecutionMode, gerr.TextCode)
}

func TestDedupPolicyValidationAndParsing(t *testing.T) {
	require.NoError(t, ValidateDedupPolicy(""))
	require.NoError(t, ValidateDedupPolicy(DedupPolicyIgnore))
	require.NoError(t, ValidateDedupPolicy(DedupPolicyDrop))
	require.NoError(t, ValidateDedupPolicy(DedupPolicyMerge))
	require.NoError(t, ValidateDedupPolicy(DedupPolicyReplace))

	policy, err := ParseDedupPolicy(" MERGE ")
	require.NoError(t, err)
	require.Equal(t, DedupPolicyMerge, policy)

	policy, err = ParseDedupPolicy("")
	require.NoError(t, err)
	require.Equal(t, DedupPolicy(""), policy)

	err = ValidateDedupPolicy("bad-policy")
	gerr := mustGoError(t, err)
	assert.Equal(t, TextCodeInvalidDedupPolicy, gerr.TextCode)
}

func TestValidateDispatchOptionsMatrix(t *testing.T) {
	future := time.Now().Add(2 * time.Minute)
	past := time.Now().Add(-2 * time.Minute)

	tests := []struct {
		name      string
		mode      ExecutionMode
		opts      DispatchOptions
		wantError string
	}{
		{
			name:      "inline with delay invalid",
			mode:      ExecutionModeInline,
			opts:      DispatchOptions{Delay: time.Second},
			wantError: TextCodeDispatchOptionsInvalid,
		},
		{
			name:      "queued with delay and run_at invalid",
			mode:      ExecutionModeQueued,
			opts:      DispatchOptions{Delay: time.Second, RunAt: &future},
			wantError: TextCodeDispatchOptionsInvalid,
		},
		{
			name:      "queued with negative delay invalid",
			mode:      ExecutionModeQueued,
			opts:      DispatchOptions{Delay: -time.Second},
			wantError: TextCodeDispatchOptionsInvalid,
		},
		{
			name:      "queued with past run_at invalid",
			mode:      ExecutionModeQueued,
			opts:      DispatchOptions{RunAt: &past},
			wantError: TextCodeDispatchOptionsInvalid,
		},
		{
			name:      "drop policy requires idempotency key",
			mode:      ExecutionModeQueued,
			opts:      DispatchOptions{DedupPolicy: DedupPolicyDrop},
			wantError: TextCodeDispatchOptionsInvalid,
		},
		{
			name:      "invalid dedup policy",
			mode:      ExecutionModeQueued,
			opts:      DispatchOptions{DedupPolicy: "bad"},
			wantError: TextCodeInvalidDedupPolicy,
		},
		{
			name:      "invalid execution mode",
			mode:      "bad",
			opts:      DispatchOptions{},
			wantError: TextCodeInvalidExecutionMode,
		},
		{
			name: "valid queued with delay and dedup key",
			mode: ExecutionModeQueued,
			opts: DispatchOptions{
				Delay:          2 * time.Second,
				DedupPolicy:    DedupPolicyMerge,
				IdempotencyKey: "idem-1",
			},
		},
		{
			name: "valid queued with future run_at and dedup key",
			mode: ExecutionModeQueued,
			opts: DispatchOptions{
				RunAt:          &future,
				DedupPolicy:    DedupPolicyReplace,
				IdempotencyKey: "idem-2",
			},
		},
		{
			name: "empty mode defaults to inline for validation",
			mode: "",
			opts: DispatchOptions{},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := ValidateDispatchOptions(tt.mode, tt.opts)
			if tt.wantError == "" {
				require.NoError(t, err)
				return
			}
			gerr := mustGoError(t, err)
			assert.Equal(t, tt.wantError, gerr.TextCode)
		})
	}
}

func TestValidateDispatchReceiptInvariants(t *testing.T) {
	now := time.Now().UTC()

	tests := []struct {
		name      string
		receipt   DispatchReceipt
		wantError string
	}{
		{
			name: "inline accepted valid",
			receipt: DispatchReceipt{
				Accepted:  true,
				Mode:      ExecutionModeInline,
				CommandID: "esign.pdf.remediate",
			},
		},
		{
			name: "queued accepted valid",
			receipt: DispatchReceipt{
				Accepted:   true,
				Mode:       ExecutionModeQueued,
				CommandID:  "esign.pdf.remediate",
				DispatchID: "dispatch-1",
				EnqueuedAt: &now,
			},
		},
		{
			name: "rejected receipt valid with empty queued fields",
			receipt: DispatchReceipt{
				Accepted:  false,
				Mode:      ExecutionModeQueued,
				CommandID: "esign.pdf.remediate",
			},
		},
		{
			name: "inline accepted must not include dispatch_id",
			receipt: DispatchReceipt{
				Accepted:   true,
				Mode:       ExecutionModeInline,
				CommandID:  "esign.pdf.remediate",
				DispatchID: "dispatch-1",
			},
			wantError: TextCodeDispatchReceiptInvalid,
		},
		{
			name: "queued accepted requires dispatch_id",
			receipt: DispatchReceipt{
				Accepted:   true,
				Mode:       ExecutionModeQueued,
				CommandID:  "esign.pdf.remediate",
				EnqueuedAt: &now,
			},
			wantError: TextCodeDispatchReceiptInvalid,
		},
		{
			name: "rejected must not include dispatch_id",
			receipt: DispatchReceipt{
				Accepted:   false,
				Mode:       ExecutionModeQueued,
				CommandID:  "esign.pdf.remediate",
				DispatchID: "dispatch-1",
			},
			wantError: TextCodeDispatchReceiptInvalid,
		},
		{
			name: "accepted requires mode",
			receipt: DispatchReceipt{
				Accepted:  true,
				CommandID: "esign.pdf.remediate",
			},
			wantError: TextCodeDispatchReceiptInvalid,
		},
		{
			name: "accepted requires command_id",
			receipt: DispatchReceipt{
				Accepted: true,
				Mode:     ExecutionModeInline,
			},
			wantError: TextCodeDispatchReceiptInvalid,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := ValidateDispatchReceipt(tt.receipt)
			if tt.wantError == "" {
				require.NoError(t, err)
				return
			}
			gerr := mustGoError(t, err)
			assert.Equal(t, tt.wantError, gerr.TextCode)
		})
	}
}

func TestDispatchOptionsContextRoundTripAndIsolation(t *testing.T) {
	opts := DispatchOptions{
		Mode:          ExecutionModeQueued,
		CorrelationID: "corr-1",
		Metadata: map[string]any{
			"source": "api",
		},
	}

	ctx := ContextWithDispatchOptions(context.Background(), opts)

	// Mutate source after storing; context copy should remain unchanged.
	opts.Metadata["source"] = "mutated-source"

	got, ok := DispatchOptionsFromContext(ctx)
	require.True(t, ok)
	require.Equal(t, "api", got.Metadata["source"])

	// Mutate retrieved map; context copy should remain unchanged.
	got.Metadata["source"] = "mutated-read"

	got2, ok := DispatchOptionsFromContext(ctx)
	require.True(t, ok)
	require.Equal(t, "api", got2.Metadata["source"])

	ctx = ContextWithDispatchOptions(ctx, DispatchOptions{CorrelationID: "corr-2"})
	got3, ok := DispatchOptionsFromContext(ctx)
	require.True(t, ok)
	require.Equal(t, "corr-2", got3.CorrelationID)

	_, ok = DispatchOptionsFromContext(context.Background())
	require.False(t, ok)
}

func TestCanonicalCommandID(t *testing.T) {
	id, err := CanonicalCommandID(contractTypedMessage{})
	require.NoError(t, err)
	require.Equal(t, "contract.typed", id)

	id, err = CanonicalCommandID(contractPointerTypedMessage{})
	require.NoError(t, err)
	require.Equal(t, "contract.pointer.typed", id)

	var nilTyped *contractPointerTypedMessage
	id, err = CanonicalCommandID(nilTyped)
	require.NoError(t, err)
	require.Equal(t, "contract.pointer.typed", id)

	_, err = CanonicalCommandID(contractUntypedMessage{})
	gerr := mustGoError(t, err)
	assert.Equal(t, TextCodeInvalidCommandID, gerr.TextCode)

	_, err = CanonicalCommandID(nil)
	gerr = mustGoError(t, err)
	assert.Equal(t, TextCodeInvalidCommandID, gerr.TextCode)
}

func TestValidatePolicyCommandIDs(t *testing.T) {
	require.NoError(t, ValidatePolicyCommandIDs(
		[]string{"a.cmd", "b.cmd"},
		[]string{"a.cmd"},
	))

	err := ValidatePolicyCommandIDs(
		[]string{"a.cmd", "b.cmd"},
		[]string{"a.cmd", "missing.cmd", ""},
	)
	gerr := mustGoError(t, err)
	assert.Equal(t, TextCodeUnknownCommandPolicyKey, gerr.TextCode)
	assert.Equal(t, gerrors.CategoryValidation, gerr.Category)

	unknown, ok := gerr.Metadata["unknown_command_ids"].([]string)
	require.True(t, ok)
	assert.Contains(t, unknown, "missing.cmd")
	assert.Contains(t, unknown, "<empty>")
}

func TestQueueMultiHandlerUnsupportedErrorContract(t *testing.T) {
	err := NewQueueMultiHandlerUnsupportedError("esign.pdf.remediate", 2)
	gerr := mustGoError(t, err)
	assert.Equal(t, TextCodeQueueMultiHandlerUnsupported, gerr.TextCode)
	assert.Equal(t, gerrors.CategoryConflict, gerr.Category)
	assert.Equal(t, "esign.pdf.remediate", gerr.Metadata["command_id"])
	assert.Equal(t, 2, gerr.Metadata["handler_count"])
}

func mustGoError(t *testing.T, err error) *gerrors.Error {
	t.Helper()
	require.Error(t, err)
	var gerr *gerrors.Error
	require.True(t, gerrors.As(err, &gerr), "expected go-errors.Error, got %T", err)
	return gerr
}

type contractTypedMessage struct{}

func (contractTypedMessage) Type() string { return "contract.typed" }

type contractPointerTypedMessage struct{}

func (*contractPointerTypedMessage) Type() string { return "contract.pointer.typed" }

type contractUntypedMessage struct{}

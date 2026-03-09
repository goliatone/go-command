package command

import (
	"context"
	"reflect"
	"sort"
	"strings"
	"time"

	"github.com/goliatone/go-errors"
)

type ExecutionMode string

const (
	ExecutionModeInline ExecutionMode = "inline"
	ExecutionModeQueued ExecutionMode = "queued"
)

type DedupPolicy string

const (
	DedupPolicyIgnore  DedupPolicy = "ignore"
	DedupPolicyDrop    DedupPolicy = "drop"
	DedupPolicyMerge   DedupPolicy = "merge"
	DedupPolicyReplace DedupPolicy = "replace"
)

const (
	TextCodeInvalidExecutionMode         = "INVALID_EXECUTION_MODE"
	TextCodeInvalidDedupPolicy           = "INVALID_DEDUP_POLICY"
	TextCodeDispatchOptionsInvalid       = "DISPATCH_OPTIONS_INVALID"
	TextCodeDispatchReceiptInvalid       = "DISPATCH_RECEIPT_INVALID"
	TextCodeUnknownCommandPolicyKey      = "UNKNOWN_COMMAND_POLICY_KEY"
	TextCodeInvalidCommandID             = "INVALID_COMMAND_ID"
	TextCodeQueueMultiHandlerUnsupported = "QUEUE_MULTI_HANDLER_UNSUPPORTED"
)

type DispatchOptions struct {
	Mode           ExecutionMode
	IdempotencyKey string
	DedupPolicy    DedupPolicy
	Delay          time.Duration
	RunAt          *time.Time
	CorrelationID  string
	Metadata       map[string]any
}

type DispatchReceipt struct {
	Accepted      bool
	Mode          ExecutionMode
	CommandID     string
	DispatchID    string
	EnqueuedAt    *time.Time
	CorrelationID string
}

func NormalizeExecutionMode(mode ExecutionMode) ExecutionMode {
	return ExecutionMode(strings.ToLower(strings.TrimSpace(string(mode))))
}

func ParseExecutionMode(raw string) (ExecutionMode, error) {
	mode := NormalizeExecutionMode(ExecutionMode(raw))
	if mode == "" {
		return "", nil
	}
	if err := ValidateExecutionMode(mode); err != nil {
		return "", err
	}
	return mode, nil
}

func ValidateExecutionMode(mode ExecutionMode) error {
	switch NormalizeExecutionMode(mode) {
	case "", ExecutionModeInline, ExecutionModeQueued:
		return nil
	default:
		return errors.New("invalid execution mode", errors.CategoryValidation).
			WithTextCode(TextCodeInvalidExecutionMode).
			WithMetadata(map[string]any{
				"mode": strings.TrimSpace(string(mode)),
			})
	}
}

func NormalizeDedupPolicy(policy DedupPolicy) DedupPolicy {
	return DedupPolicy(strings.ToLower(strings.TrimSpace(string(policy))))
}

func ParseDedupPolicy(raw string) (DedupPolicy, error) {
	policy := NormalizeDedupPolicy(DedupPolicy(raw))
	if policy == "" {
		return "", nil
	}
	if err := ValidateDedupPolicy(policy); err != nil {
		return "", err
	}
	return policy, nil
}

func ValidateDedupPolicy(policy DedupPolicy) error {
	switch NormalizeDedupPolicy(policy) {
	case "", DedupPolicyIgnore, DedupPolicyDrop, DedupPolicyMerge, DedupPolicyReplace:
		return nil
	default:
		return errors.New("invalid dedup policy", errors.CategoryValidation).
			WithTextCode(TextCodeInvalidDedupPolicy).
			WithMetadata(map[string]any{
				"dedup_policy": strings.TrimSpace(string(policy)),
			})
	}
}

func ValidateDispatchOptions(effectiveMode ExecutionMode, opts DispatchOptions) error {
	mode := NormalizeExecutionMode(effectiveMode)
	if mode == "" {
		mode = ExecutionModeInline
	}
	if err := ValidateExecutionMode(mode); err != nil {
		return err
	}

	policy := NormalizeDedupPolicy(opts.DedupPolicy)
	if err := ValidateDedupPolicy(policy); err != nil {
		return err
	}

	reasons := make([]string, 0, 4)

	if opts.Delay != 0 && opts.RunAt != nil {
		reasons = append(reasons, "delay and run_at are mutually exclusive")
	}
	if opts.Delay < 0 {
		reasons = append(reasons, "delay must be >= 0")
	}
	if opts.RunAt != nil && !opts.RunAt.After(time.Now()) {
		reasons = append(reasons, "run_at must be in the future")
	}
	if mode == ExecutionModeInline && (opts.Delay != 0 || opts.RunAt != nil) {
		reasons = append(reasons, "scheduling options are invalid for inline mode")
	}
	if requiresIdempotencyKey(policy) && strings.TrimSpace(opts.IdempotencyKey) == "" {
		reasons = append(reasons, "idempotency_key is required for dedup policy")
	}

	if len(reasons) > 0 {
		return errors.New("dispatch options validation failed", errors.CategoryValidation).
			WithTextCode(TextCodeDispatchOptionsInvalid).
			WithMetadata(map[string]any{
				"mode":         mode,
				"dedup_policy": policy,
				"reasons":      reasons,
			})
	}

	return nil
}

func ValidateDispatchReceipt(receipt DispatchReceipt) error {
	mode := NormalizeExecutionMode(receipt.Mode)
	if err := ValidateExecutionMode(mode); err != nil {
		return err
	}

	reasons := make([]string, 0, 4)
	if receipt.Accepted {
		if strings.TrimSpace(receipt.CommandID) == "" {
			reasons = append(reasons, "command_id is required when accepted")
		}
		if mode == "" {
			reasons = append(reasons, "mode is required when accepted")
		}
		switch mode {
		case ExecutionModeInline:
			if strings.TrimSpace(receipt.DispatchID) != "" {
				reasons = append(reasons, "inline receipt must not include dispatch_id")
			}
			if receipt.EnqueuedAt != nil {
				reasons = append(reasons, "inline receipt must not include enqueued_at")
			}
		case ExecutionModeQueued:
			if strings.TrimSpace(receipt.DispatchID) == "" {
				reasons = append(reasons, "queued receipt requires dispatch_id")
			}
			if receipt.EnqueuedAt == nil {
				reasons = append(reasons, "queued receipt requires enqueued_at")
			}
		}
	} else {
		if strings.TrimSpace(receipt.DispatchID) != "" {
			reasons = append(reasons, "rejected receipt must not include dispatch_id")
		}
		if receipt.EnqueuedAt != nil {
			reasons = append(reasons, "rejected receipt must not include enqueued_at")
		}
	}

	if len(reasons) > 0 {
		return errors.New("dispatch receipt validation failed", errors.CategoryValidation).
			WithTextCode(TextCodeDispatchReceiptInvalid).
			WithMetadata(map[string]any{
				"reasons": reasons,
			})
	}

	return nil
}

type dispatchOptionsContextKey struct{}

func ContextWithDispatchOptions(ctx context.Context, opts DispatchOptions) context.Context {
	if ctx == nil {
		ctx = context.Background()
	}
	cp := opts
	cp.Metadata = cloneDispatchMetadata(opts.Metadata)
	return context.WithValue(ctx, dispatchOptionsContextKey{}, cp)
}

func DispatchOptionsFromContext(ctx context.Context) (DispatchOptions, bool) {
	if ctx == nil {
		return DispatchOptions{}, false
	}
	opts, ok := ctx.Value(dispatchOptionsContextKey{}).(DispatchOptions)
	if !ok {
		return DispatchOptions{}, false
	}
	opts.Metadata = cloneDispatchMetadata(opts.Metadata)
	return opts, true
}

// CanonicalCommandID resolves a stable command id for policy/dedup paths.
// It requires an explicit Type() implementation and does not allow reflection-only fallback ids.
func CanonicalCommandID(msg any) (string, error) {
	if msg == nil {
		return "", invalidCommandIDError("message cannot be nil", nil)
	}

	msgType := reflect.TypeOf(msg)
	if msgType == nil {
		return "", invalidCommandIDError("message type cannot be nil", nil)
	}

	var id string
	switch {
	case msgType.Implements(messageTyperType):
		id = strings.TrimSpace(GetMessageType(msg))
	case msgType.Kind() != reflect.Ptr && reflect.PointerTo(msgType).Implements(messageTyperType):
		id = strings.TrimSpace(GetMessageType(reflect.New(msgType).Interface()))
	default:
		return "", invalidCommandIDError("message must implement Type() string", map[string]any{
			"message_type": msgType.String(),
		})
	}

	if id == "" || id == "unknown_type" {
		return "", invalidCommandIDError("message Type() must return a non-empty id", map[string]any{
			"message_type": msgType.String(),
			"resolved_id":  id,
		})
	}

	return id, nil
}

func ValidatePolicyCommandIDs(knownIDs []string, configuredIDs []string) error {
	known := make(map[string]struct{}, len(knownIDs))
	for _, id := range knownIDs {
		if key := strings.TrimSpace(id); key != "" {
			known[key] = struct{}{}
		}
	}

	unknown := make(map[string]struct{})
	for _, id := range configuredIDs {
		key := strings.TrimSpace(id)
		if key == "" {
			unknown["<empty>"] = struct{}{}
			continue
		}
		if _, exists := known[key]; !exists {
			unknown[key] = struct{}{}
		}
	}

	if len(unknown) == 0 {
		return nil
	}

	unknownList := make([]string, 0, len(unknown))
	for id := range unknown {
		unknownList = append(unknownList, id)
	}
	sort.Strings(unknownList)

	return errors.New("unknown command policy keys", errors.CategoryValidation).
		WithTextCode(TextCodeUnknownCommandPolicyKey).
		WithMetadata(map[string]any{
			"unknown_command_ids": unknownList,
		})
}

// TODO(BKG_CMD phase 2): enforce this via DispatchWith in queued routing paths.
func NewQueueMultiHandlerUnsupportedError(commandID string, handlerCount int) *errors.Error {
	return errors.New("queued dispatch requires exactly one handler for command id", errors.CategoryConflict).
		WithCode(errors.CodeConflict).
		WithTextCode(TextCodeQueueMultiHandlerUnsupported).
		WithMetadata(map[string]any{
			"command_id":    strings.TrimSpace(commandID),
			"handler_count": handlerCount,
		})
}

func requiresIdempotencyKey(policy DedupPolicy) bool {
	switch NormalizeDedupPolicy(policy) {
	case DedupPolicyDrop, DedupPolicyMerge, DedupPolicyReplace:
		return true
	default:
		return false
	}
}

func invalidCommandIDError(message string, metadata map[string]any) *errors.Error {
	err := errors.New(message, errors.CategoryValidation).
		WithTextCode(TextCodeInvalidCommandID)
	if len(metadata) > 0 {
		err.WithMetadata(metadata)
	}
	return err
}

func cloneDispatchMetadata(src map[string]any) map[string]any {
	if len(src) == 0 {
		return nil
	}
	dst := make(map[string]any, len(src))
	for key, value := range src {
		dst[key] = value
	}
	return dst
}

package dispatcher

import (
	"context"
	"fmt"
	"strings"
	"sync"
	"time"

	"github.com/goliatone/go-command"
	"github.com/goliatone/go-errors"
)

const (
	TextCodeDispatchExecutorNotConfigured = "DISPATCH_EXECUTOR_NOT_CONFIGURED"
	TextCodeDispatchModeResolverFailed    = "DISPATCH_MODE_RESOLVER_FAILED"
)

type CommandExecutor interface {
	Execute(ctx context.Context, msg any, commandID string, opts command.DispatchOptions) (command.DispatchReceipt, error)
}

type ModeResolver interface {
	ResolveMode(ctx context.Context, commandID string) (mode command.ExecutionMode, found bool, err error)
}

type inlineCommandExecutor struct{}

func (e inlineCommandExecutor) Execute(ctx context.Context, msg any, commandID string, opts command.DispatchOptions) (command.DispatchReceipt, error) {
	if err := dispatchInline(ctx, msg, commandID); err != nil {
		return command.DispatchReceipt{}, err
	}
	return command.DispatchReceipt{
		Accepted:      true,
		Mode:          command.ExecutionModeInline,
		CommandID:     commandID,
		CorrelationID: strings.TrimSpace(opts.CorrelationID),
	}, nil
}

var defaultInlineExecutor CommandExecutor = inlineCommandExecutor{}

var (
	dispatchRoutingMu sync.RWMutex
	dispatchExecutors = map[command.ExecutionMode]CommandExecutor{
		command.ExecutionModeInline: defaultInlineExecutor,
	}
	dispatchModeResolver ModeResolver
)

func DispatchWith[T any](ctx context.Context, msg T, opts command.DispatchOptions) (command.DispatchReceipt, error) {
	if err := command.ValidateMessage(msg); err != nil {
		return command.DispatchReceipt{}, err
	}

	commandID := command.GetMessageType(msg)
	ctxOpts, _ := command.DispatchOptionsFromContext(ctx)
	mergedOpts := mergeDispatchOptions(ctxOpts, opts)

	resolver := getModeResolver()
	requiresCanonicalForResolution, err := shouldUseCanonicalForResolution(opts.Mode, ctxOpts.Mode, resolver != nil)
	if err != nil {
		return command.DispatchReceipt{}, err
	}

	canonicalID := ""
	resolveCommandID := commandID
	if requiresCanonicalForResolution {
		canonicalID, err = command.CanonicalCommandID(msg)
		if err != nil {
			return command.DispatchReceipt{}, err
		}
		resolveCommandID = canonicalID
	}

	effectiveMode, err := resolveDispatchMode(ctx, resolveCommandID, opts.Mode, ctxOpts.Mode)
	if err != nil {
		return command.DispatchReceipt{}, err
	}

	if effectiveMode == command.ExecutionModeQueued {
		if canonicalID == "" {
			canonicalID, err = command.CanonicalCommandID(msg)
			if err != nil {
				return command.DispatchReceipt{}, err
			}
		}
		commandID = canonicalID
	}

	if err := command.ValidateDispatchOptions(effectiveMode, mergedOpts); err != nil {
		return command.DispatchReceipt{}, err
	}

	mergedOpts.Mode = effectiveMode

	if effectiveMode == command.ExecutionModeQueued {
		if count := commandHandlerCount(commandID); count > 1 {
			return command.DispatchReceipt{}, command.NewQueueMultiHandlerUnsupportedError(commandID, count)
		}
	}

	executor, ok := getDispatchExecutor(effectiveMode)
	if !ok {
		return command.DispatchReceipt{}, newDispatchExecutorNotConfiguredError(effectiveMode, commandID)
	}

	receipt, err := executor.Execute(ctx, msg, commandID, mergedOpts)
	if err != nil {
		return command.DispatchReceipt{}, err
	}

	receipt = normalizeDispatchReceipt(receipt, effectiveMode, commandID, mergedOpts.CorrelationID)
	if err := command.ValidateDispatchReceipt(receipt); err != nil {
		return command.DispatchReceipt{}, err
	}

	return receipt, nil
}

func RegisterExecutor(mode command.ExecutionMode, exec CommandExecutor) error {
	mode = command.NormalizeExecutionMode(mode)
	if mode == "" {
		return errors.New("execution mode is required", errors.CategoryValidation).
			WithTextCode(command.TextCodeInvalidExecutionMode)
	}
	if err := command.ValidateExecutionMode(mode); err != nil {
		return err
	}
	if exec == nil {
		return errors.New("executor cannot be nil", errors.CategoryBadInput).
			WithTextCode("DISPATCH_EXECUTOR_NIL")
	}

	dispatchRoutingMu.Lock()
	defer dispatchRoutingMu.Unlock()
	dispatchExecutors[mode] = exec
	return nil
}

func UnregisterExecutor(mode command.ExecutionMode) {
	mode = command.NormalizeExecutionMode(mode)
	if mode == "" || mode == command.ExecutionModeInline {
		return
	}

	dispatchRoutingMu.Lock()
	defer dispatchRoutingMu.Unlock()
	delete(dispatchExecutors, mode)
}

func SetModeResolver(resolver ModeResolver) {
	dispatchRoutingMu.Lock()
	defer dispatchRoutingMu.Unlock()
	dispatchModeResolver = resolver
}

func ClearModeResolver() {
	dispatchRoutingMu.Lock()
	defer dispatchRoutingMu.Unlock()
	dispatchModeResolver = nil
}

func getDispatchExecutor(mode command.ExecutionMode) (CommandExecutor, bool) {
	dispatchRoutingMu.RLock()
	defer dispatchRoutingMu.RUnlock()
	exec, ok := dispatchExecutors[mode]
	return exec, ok
}

func getModeResolver() ModeResolver {
	dispatchRoutingMu.RLock()
	defer dispatchRoutingMu.RUnlock()
	return dispatchModeResolver
}

func resetDispatchRoutingState() {
	dispatchRoutingMu.Lock()
	defer dispatchRoutingMu.Unlock()
	dispatchExecutors = map[command.ExecutionMode]CommandExecutor{
		command.ExecutionModeInline: defaultInlineExecutor,
	}
	dispatchModeResolver = nil
}

func resolveDispatchMode(
	ctx context.Context,
	commandID string,
	explicitMode command.ExecutionMode,
	contextMode command.ExecutionMode,
) (command.ExecutionMode, error) {
	if mode, ok, err := parseModeCandidate(explicitMode); err != nil {
		return "", err
	} else if ok {
		return mode, nil
	}

	if mode, ok, err := parseModeCandidate(contextMode); err != nil {
		return "", err
	} else if ok {
		return mode, nil
	}

	if resolver := getModeResolver(); resolver != nil {
		mode, found, err := resolver.ResolveMode(ctx, commandID)
		if err != nil {
			return "", errors.Wrap(err, errors.CategoryInternal, "failed to resolve dispatch mode").
				WithTextCode(TextCodeDispatchModeResolverFailed).
				WithMetadata(map[string]any{
					"command_id": commandID,
				})
		}

		if !found {
			return command.ExecutionModeInline, nil
		}

		if mode, ok, err := parseModeCandidate(mode); err != nil {
			return "", err
		} else if ok {
			return mode, nil
		} else {
			return "", errors.New("invalid execution mode", errors.CategoryValidation).
				WithTextCode(command.TextCodeInvalidExecutionMode).
				WithMetadata(map[string]any{
					"command_id": commandID,
					"mode":       "",
					"source":     "resolver",
				})
		}
	}

	return command.ExecutionModeInline, nil
}

func shouldUseCanonicalForResolution(
	explicitMode command.ExecutionMode,
	contextMode command.ExecutionMode,
	hasResolver bool,
) (bool, error) {
	if mode, ok, err := parseModeCandidate(explicitMode); err != nil {
		return false, err
	} else if ok {
		return mode == command.ExecutionModeQueued, nil
	}

	if mode, ok, err := parseModeCandidate(contextMode); err != nil {
		return false, err
	} else if ok {
		return mode == command.ExecutionModeQueued, nil
	}

	return hasResolver, nil
}

func parseModeCandidate(mode command.ExecutionMode) (command.ExecutionMode, bool, error) {
	mode = command.NormalizeExecutionMode(mode)
	if mode == "" {
		return "", false, nil
	}
	if err := command.ValidateExecutionMode(mode); err != nil {
		return "", false, err
	}
	return mode, true, nil
}

func normalizeDispatchReceipt(
	receipt command.DispatchReceipt,
	mode command.ExecutionMode,
	commandID string,
	correlationID string,
) command.DispatchReceipt {
	receipt.Mode = command.NormalizeExecutionMode(mode)
	receipt.CommandID = commandID

	correlationID = strings.TrimSpace(correlationID)
	if correlationID != "" {
		receipt.CorrelationID = correlationID
	} else {
		receipt.CorrelationID = strings.TrimSpace(receipt.CorrelationID)
	}

	return receipt
}

func mergeDispatchOptions(ctxOpts command.DispatchOptions, explicit command.DispatchOptions) command.DispatchOptions {
	merged := ctxOpts
	merged.RunAt = cloneTimePtr(ctxOpts.RunAt)
	merged.Metadata = mergeDispatchMetadata(ctxOpts.Metadata, nil)

	if strings.TrimSpace(string(explicit.Mode)) != "" {
		merged.Mode = explicit.Mode
	}
	if strings.TrimSpace(explicit.IdempotencyKey) != "" {
		merged.IdempotencyKey = explicit.IdempotencyKey
	}
	if strings.TrimSpace(string(explicit.DedupPolicy)) != "" {
		merged.DedupPolicy = explicit.DedupPolicy
	}
	if explicit.Delay != 0 {
		merged.Delay = explicit.Delay
		merged.RunAt = nil
	}
	if explicit.RunAt != nil {
		merged.RunAt = cloneTimePtr(explicit.RunAt)
		merged.Delay = 0
	}
	if strings.TrimSpace(explicit.CorrelationID) != "" {
		merged.CorrelationID = explicit.CorrelationID
	}

	merged.Metadata = mergeDispatchMetadata(merged.Metadata, explicit.Metadata)
	return merged
}

func mergeDispatchMetadata(base map[string]any, override map[string]any) map[string]any {
	if len(base) == 0 && len(override) == 0 {
		return nil
	}

	out := make(map[string]any, len(base)+len(override))
	for key, value := range base {
		out[key] = value
	}
	for key, value := range override {
		out[key] = value
	}
	return out
}

func cloneTimePtr(src *time.Time) *time.Time {
	if src == nil {
		return nil
	}
	dst := *src
	return &dst
}

func newDispatchExecutorNotConfiguredError(mode command.ExecutionMode, commandID string) *errors.Error {
	return errors.New("dispatch executor not configured for execution mode", errors.CategoryConflict).
		WithCode(errors.CodeConflict).
		WithTextCode(TextCodeDispatchExecutorNotConfigured).
		WithMetadata(map[string]any{
			"mode":       fmt.Sprint(mode),
			"command_id": strings.TrimSpace(commandID),
		})
}

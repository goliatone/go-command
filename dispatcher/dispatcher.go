package dispatcher

import (
	"context"
	stderrors "errors"
	"fmt"
	"strings"
	"sync"
	"sync/atomic"
	"time"

	"github.com/goliatone/go-command"
	"github.com/goliatone/go-command/router"
	"github.com/goliatone/go-command/runner"
	"github.com/goliatone/go-errors"
)

type Subscription interface {
	Unsubscribe()
}

var ExitOnErr = false

var (
	testCommandMux *router.Mux // Only set during tests for isolation
	testQueryMux   *router.Mux // Only set during tests for isolation
	testMuxMu      sync.RWMutex

	commandSubscriptionCount int64
	querySubscriptionCount   int64
	legacySubscriptionEpoch  atomic.Uint64
)

type trackedSubscription struct {
	inner         Subscription
	onUnsubscribe func()
	once          sync.Once
}

func (s *trackedSubscription) Unsubscribe() {
	if s == nil {
		return
	}
	s.once.Do(func() {
		if s.inner != nil {
			s.inner.Unsubscribe()
		}
		if s.onUnsubscribe != nil {
			s.onUnsubscribe()
		}
	})
}

// getCommandMux returns the active command mux (test override or default)
func getCommandMux() *router.Mux {
	testMuxMu.RLock()
	defer testMuxMu.RUnlock()
	if testCommandMux != nil {
		return testCommandMux
	}
	return defaultRuntimeInstance().commandMuxSnapshot()
}

// getQueryMux returns the active query mux (test override or default)
func getQueryMux() *router.Mux {
	testMuxMu.RLock()
	defer testMuxMu.RUnlock()
	if testQueryMux != nil {
		return testQueryMux
	}
	return defaultRuntimeInstance().queryMuxSnapshot()
}

// setTestMuxes overrides muxes for testing (package-private, test-only)
func setTestMuxes(commandMux, queryMux *router.Mux) {
	testMuxMu.Lock()
	defer testMuxMu.Unlock()
	testCommandMux = commandMux
	testQueryMux = queryMux
}

// Reset clears all command/query subscriptions.
func Reset() {
	testMuxMu.Lock()
	defer testMuxMu.Unlock()
	resetRoutingConfigLocked()
	testCommandMux = nil
	testQueryMux = nil
	resetSubscriptionCounters()
	resetDispatchRoutingState()
	resetCommandRunObservers()
	defaultRuntimeInstance().Reset()
}

// Subscribe a CommandHandler for a particular message type T.
// TODO: should this return an error?!
func SubscribeCommand[T any](cmd command.Commander[T], runnerOpts ...runner.Option) Subscription {
	runtime := defaultRuntimeInstance()
	testMuxMu.RLock()
	mux := testCommandMux
	if mux == nil {
		mux = runtime.commandMuxSnapshot()
	}
	sub, err := subscribeCommandToMux(runtime, mux, cmd, runnerOpts...)
	if err != nil || sub == nil {
		testMuxMu.RUnlock()
		return nil
	}
	epoch := legacySubscriptionEpoch.Load()
	atomic.AddInt64(&commandSubscriptionCount, 1)
	testMuxMu.RUnlock()
	return &trackedSubscription{
		inner: sub,
		onUnsubscribe: func() {
			if legacySubscriptionEpoch.Load() != epoch {
				return
			}
			decrementLegacyCounter(&commandSubscriptionCount)
		},
	}
}

func SubscribeCommandFunc[T any](handler command.CommandFunc[T], runnerOpts ...runner.Option) Subscription {
	return SubscribeCommand(handler, runnerOpts...)
}

// Subscribe a QueryHandler for a particular message type T, R.
func SubscribeQuery[T any, R any](qry command.Querier[T, R], runnerOpts ...runner.Option) Subscription {
	runtime := defaultRuntimeInstance()
	testMuxMu.RLock()
	mux := testQueryMux
	if mux == nil {
		mux = runtime.queryMuxSnapshot()
	}
	sub, err := subscribeQueryToMux(runtime, mux, qry, runnerOpts...)
	if err != nil || sub == nil {
		testMuxMu.RUnlock()
		return nil
	}
	epoch := legacySubscriptionEpoch.Load()
	atomic.AddInt64(&querySubscriptionCount, 1)
	testMuxMu.RUnlock()
	return &trackedSubscription{
		inner: sub,
		onUnsubscribe: func() {
			if legacySubscriptionEpoch.Load() != epoch {
				return
			}
			decrementLegacyCounter(&querySubscriptionCount)
		},
	}
}

func SubscribeQueryFunc[T any, R any](qry command.QueryFunc[T, R], runnerOpts ...runner.Option) Subscription {
	return SubscribeQuery(qry, runnerOpts...)
}

func DispatchWithResult[T any, R any](ctx context.Context, msg T) (R, error) {
	result := command.NewResult[R]()
	ctx = command.ContextWithResult(ctx, result)

	if _, err := DispatchWith(ctx, msg, command.DispatchOptions{}); err != nil {
		var zero R
		return zero, err
	}

	value, stored := result.Load()
	if !stored {
		var zero R
		return zero, errors.New("command did not store a result", errors.CategoryCommand).
			WithTextCode("RESULT_ERROR")
	}

	return value, result.Error()
}

// Dispatch executes all registered CommandHandlers for T.
func Dispatch[T any](ctx context.Context, msg T) error {
	if err := command.ValidateMessage(msg); err != nil {
		return err
	}

	runtime := defaultRuntimeInstance()
	if runtime.RegistrationProvider() != nil {
		_, err := runtime.Dispatch(ctx, command.HandlerKindCommand, msg, command.DispatchOptions{})
		return err
	}
	return dispatchInline(ctx, msg, command.GetMessageType(msg))
}

func getQueryHandler[T any, R any]() (*queryWrapper[T, R], error) {
	var msg T
	handlers := getQueryMux().Get(command.GetMessageType(msg))

	if len(handlers) == 0 {
		return nil, fmt.Errorf("no query handlers for message type %s", command.GetMessageType(msg))
	}

	if len(handlers) > 1 {
		return nil, errors.New(
			"multiple query handlers found, ambiguous query",
			errors.CategoryBadInput)
	}

	qh, ok := handlers[0].Handler.(*queryWrapper[T, R])
	if !ok {
		return nil, fmt.Errorf("handler does not implement QueryHandler for type %s", command.GetMessageType(msg))
	}
	return qh, nil
}

// Query executes the single registered QueryHandler for T, returning R.
func Query[T any, R any](ctx context.Context, msg T) (R, error) {
	runtime := defaultRuntimeInstance()
	if runtime.RegistrationProvider() != nil {
		outcome, err := runtime.Dispatch(ctx, command.HandlerKindQuery, msg, command.DispatchOptions{})
		if err != nil {
			var zero R
			return zero, err
		}
		return dynamicOutcomeResultAs[R](outcome)
	}
	return queryWithMux[T, R](ctx, getQueryMux(), msg)
}

type commandWrapper[T any] struct {
	runner *runner.Handler
	cmd    command.Commander[T]
}

type dispatchRunnable interface {
	handler() any
}

type dispatchRunnableWithOutcome interface {
	run(ctx context.Context, msg any, execOpts ...runner.RunExecutionOption) (runner.RunOutcome, error)
}

type legacyDispatchRunnable interface {
	run(ctx context.Context, msg any) error
}

func (w *commandWrapper[T]) run(ctx context.Context, msg any, execOpts ...runner.RunExecutionOption) (runner.RunOutcome, error) {
	typedMsg, ok := msg.(T)
	if !ok {
		return runner.RunOutcome{}, fmt.Errorf("dispatcher message type mismatch for handler %T", w.cmd)
	}
	return runner.RunCommandWithOutcome(ctx, w.runner, w.cmd, typedMsg, execOpts...)
}

func (w *commandWrapper[T]) handler() any {
	return w.cmd
}

type queryWrapper[T any, R any] struct {
	runner *runner.Handler
	qry    command.Querier[T, R]
}

type dynamicQueryRunnable interface {
	runQuery(context.Context, any) (any, error)
	handler() any
}

func (w *queryWrapper[T, R]) runQuery(ctx context.Context, msg any) (any, error) {
	typedMsg, ok := msg.(T)
	if !ok {
		return nil, fmt.Errorf("dispatcher query message type mismatch for handler %T", w.qry)
	}
	return runner.RunQuery(ctx, w.runner, w.qry, typedMsg)
}

func (w *queryWrapper[T, R]) handler() any {
	return w.qry
}

func wrapHandlerError[T any](err error, msg T, handler any) *errors.Error {
	baseMessage := fmt.Sprintf("handler failed for type %s", command.GetMessageType(msg))
	metadata := map[string]any{
		"message_type": command.GetMessageType(msg),
		"handler":      fmt.Sprintf("%T", handler),
	}

	if isValidationError(err) {
		wrapped := errors.Wrap(err, errors.CategoryValidation, baseMessage).
			WithTextCode("VALIDATION_FAILED").
			WithMetadata(metadata)

		if wrapped.Code == 0 {
			wrapped.WithCode(errors.CodeBadRequest)
		}

		return wrapped
	}

	return errors.Wrap(err, errors.CategoryHandler, baseMessage).
		WithTextCode("HANDLER_EXECUTION_FAILED").
		WithMetadata(metadata)
}

func isValidationError(err error) bool {
	if err == nil {
		return false
	}

	var validationErr interface{ Validation() bool }
	if errors.As(err, &validationErr) && validationErr.Validation() {
		return true
	}

	if errors.IsValidation(err) {
		return true
	}

	return errors.Is(err, command.ErrValidation)
}

func commandHandlerCount(commandID string) int {
	return len(getCommandMux().Get(commandID))
}

func dispatchInline(ctx context.Context, msg any, messageType string) error {
	if ctx == nil {
		ctx = context.Background()
	}
	opts, _ := command.DispatchOptionsFromContext(ctx)
	return dispatchInlineWithRunContext(ctx, msg, command.DispatchRunContext{
		CommandID:      messageType,
		HandlerKind:    command.HandlerKindCommand,
		DispatchTarget: command.DispatchTargetLocal,
		ExecutionMode:  command.ExecutionModeInline,
		CorrelationID:  strings.TrimSpace(opts.CorrelationID),
		IdempotencyKey: strings.TrimSpace(opts.IdempotencyKey),
		Metadata:       mergeDispatchMetadata(opts.Metadata, nil),
		Provenance:     dispatchProvenance(ctx),
	})
}

func dispatchInlineWithRunContext(ctx context.Context, msg any, runtime command.DispatchRunContext) error {
	return dispatchInlineWithRunContextOn(getCommandMux(), ctx, msg, runtime)
}

func dispatchInlineWithRunContextOn(mux *router.Mux, ctx context.Context, msg any, runtime command.DispatchRunContext) error {
	return dispatchInlineWithRunContextOnType(mux, ctx, msg, runtime.CommandID, runtime)
}

func dispatchInlineWithRunContextOnType(mux *router.Mux, ctx context.Context, msg any, messageType string, runtime command.DispatchRunContext) error {
	if ctx == nil {
		ctx = context.Background()
	}
	if runtime.HandlerKind == "" {
		runtime.HandlerKind = command.HandlerKindCommand
	}
	if runtime.DispatchTarget == "" {
		runtime.DispatchTarget = command.DispatchTargetLocal
	}
	if runtime.Provenance == (command.DispatchProvenance{}) {
		runtime.Provenance = dispatchProvenance(ctx)
	}
	handlers, err := getDispatchHandlersFrom(mux, messageType)
	if err != nil {
		return errors.Wrap(err, errors.CategoryHandler, "failed to get command handlers").
			WithTextCode("HANDLER_LOOKUP_ERROR").
			WithMetadata(map[string]any{
				"message_type": messageType,
			})
	}

	if ctx.Err() != nil {
		return errors.Wrap(ctx.Err(), errors.CategoryExternal, "context canceled or deadline exceeded").
			WithTextCode("CONTEXT_ERROR")
	}

	var errs error
	for _, h := range handlers {
		run := runtime
		run.RunID = newCommandRunID()
		run.Handler = fmt.Sprintf("%T", h.handler())
		run.ExecutionMode = command.NormalizeExecutionMode(run.ExecutionMode)
		if run.ExecutionMode == "" {
			run.ExecutionMode = command.ExecutionModeInline
		}
		run.Metadata = command.CloneCommandRunMetadata(runtime.Metadata)

		handlerCtx := command.ContextWithCommandRunAttemptTracker(ctx)
		startedAt := time.Time{}
		outcome, err := runDispatchRunnable(
			h,
			handlerCtx,
			msg,
			runner.WithRunStartHook(func(startCtx context.Context) context.Context {
				startedAt = time.Now()
				run.StartedAt = startedAt
				if attempt, ok := command.CommandRunAttemptFromContext(startCtx); ok {
					run.Attempt = attempt.Attempt
					run.MaxAttempts = attempt.MaxAttempts
				}
				startCtx = command.ContextWithDispatchRun(startCtx, run)
				startCtx = command.ContextWithCommandProgressReporter(startCtx, commandRunProgressReporter{run: run})
				emitCommandRunEvent(ctx, commandRunEventFromContext(run, command.CommandRunPhaseStarted, startedAt, command.CommandRunEvent{}))
				return startCtx
			}),
		)
		if !outcome.Executed {
			if err != nil {
				wrappedErr := wrapHandlerError(err, msg, h.handler())
				if ExitOnErr {
					return wrappedErr
				}
				errs = errors.Join(errs, wrappedErr)
			}
			continue
		}
		if err != nil {
			if attempt, ok := command.CommandRunAttemptFromContext(handlerCtx); ok {
				run.Attempt = attempt.Attempt
				run.MaxAttempts = attempt.MaxAttempts
			}
			emitCommandRunEvent(ctx, commandRunEventFromContext(run, terminalCommandRunPhase(err), time.Now(), command.CommandRunEvent{
				Duration: time.Since(startedAt),
				Error:    err,
			}))
			wrappedErr := wrapHandlerError(err, msg, h.handler())
			if ExitOnErr {
				return wrappedErr
			}
			errs = errors.Join(errs, wrappedErr)
			continue
		}
		if attempt, ok := command.CommandRunAttemptFromContext(handlerCtx); ok {
			run.Attempt = attempt.Attempt
			run.MaxAttempts = attempt.MaxAttempts
		}
		run.Receipt = command.DispatchReceipt{
			Accepted:      true,
			Mode:          run.ExecutionMode,
			CommandID:     run.CommandID,
			CorrelationID: run.CorrelationID,
		}
		emitCommandRunEvent(ctx, commandRunEventFromContext(run, command.CommandRunPhaseSucceeded, time.Now(), command.CommandRunEvent{
			Duration: time.Since(startedAt),
		}))
	}

	return errs
}

func terminalCommandRunPhase(err error) command.CommandRunPhase {
	if err != nil && (stderrors.Is(err, context.Canceled) || stderrors.Is(err, context.DeadlineExceeded)) {
		return command.CommandRunPhaseCanceled
	}
	return command.CommandRunPhaseFailed
}

func runDispatchRunnable(
	h dispatchRunnable,
	ctx context.Context,
	msg any,
	execOpts ...runner.RunExecutionOption,
) (runner.RunOutcome, error) {
	if h == nil {
		return runner.RunOutcome{}, fmt.Errorf("handler cannot be nil")
	}
	if withOutcome, ok := h.(dispatchRunnableWithOutcome); ok {
		return withOutcome.run(ctx, msg, execOpts...)
	}
	legacy, ok := h.(legacyDispatchRunnable)
	if !ok {
		return runner.RunOutcome{}, fmt.Errorf("handler does not implement runnable command handler")
	}
	hooks := runner.RunExecutionHooks{}
	for _, opt := range execOpts {
		if opt != nil {
			opt(&hooks)
		}
	}
	if hooks.OnStart != nil {
		if startedCtx := hooks.OnStart(ctx); startedCtx != nil {
			ctx = startedCtx
		}
	}
	return runner.RunOutcome{Executed: true}, legacy.run(ctx, msg)
}

func getDispatchHandlers(messageType string) ([]dispatchRunnable, error) {
	return getDispatchHandlersFrom(getCommandMux(), messageType)
}

func getDispatchHandlersFrom(mux *router.Mux, messageType string) ([]dispatchRunnable, error) {
	if mux == nil {
		return nil, fmt.Errorf("command mux is not configured")
	}
	handlers := mux.Get(messageType)
	if len(handlers) == 0 {
		return nil, fmt.Errorf("no command handlers for message type %s", messageType)
	}

	typedHandlers := make([]dispatchRunnable, 0, len(handlers))
	for _, h := range handlers {
		cmdHandler, ok := h.Handler.(dispatchRunnable)
		if !ok {
			return nil, fmt.Errorf("handler does not implement CommandHandler for type %s", messageType)
		}
		typedHandlers = append(typedHandlers, cmdHandler)
	}

	if len(typedHandlers) == 0 {
		return nil, fmt.Errorf("no command handlers for message type %s", messageType)
	}

	return typedHandlers, nil
}

func hasTrackedSubscriptions() bool {
	return atomic.LoadInt64(&commandSubscriptionCount) > 0 ||
		atomic.LoadInt64(&querySubscriptionCount) > 0
}

func resetSubscriptionCounters() {
	legacySubscriptionEpoch.Add(1)
	atomic.StoreInt64(&commandSubscriptionCount, 0)
	atomic.StoreInt64(&querySubscriptionCount, 0)
}

func decrementLegacyCounter(counter *int64) {
	if counter == nil {
		return
	}
	for {
		current := atomic.LoadInt64(counter)
		if current <= 0 {
			return
		}
		if atomic.CompareAndSwapInt64(counter, current, current-1) {
			return
		}
	}
}

package main

import (
	"context"
	"fmt"
	"strconv"
	"strings"
	"sync"
	"sync/atomic"
	"time"

	"github.com/goliatone/go-command"
	"github.com/goliatone/go-command/flow"
	cmdrpc "github.com/goliatone/go-command/rpc"
)

const (
	BotMethodChatSend    = "bot.chat.send"
	BotMethodChatHistory = "bot.chat.history"
	BotMethodChatClear   = "bot.chat.clear"
)

const defaultTransitionAmount = 120.0

type BotSuggestion struct {
	ID      string `json:"id"`
	Label   string `json:"label"`
	Command string `json:"command"`
}

type BotChatEntry struct {
	Role    string `json:"role"`
	Message string `json:"message"`
	At      string `json:"at"`
}

type BotChatSendRequest struct {
	SessionID string `json:"sessionId,omitempty"`
	MachineID string `json:"machineId,omitempty"`
	Message   string `json:"message"`
}

type BotChatSendResponse struct {
	SessionID   string          `json:"sessionId"`
	Reply       string          `json:"reply"`
	Suggestions []BotSuggestion `json:"suggestions,omitempty"`
	Result      map[string]any  `json:"result,omitempty"`
}

type BotChatHistoryRequest struct {
	SessionID string `json:"sessionId"`
}

type BotChatHistoryResponse struct {
	SessionID string         `json:"sessionId"`
	Entries   []BotChatEntry `json:"entries"`
}

type BotChatClearRequest struct {
	SessionID string `json:"sessionId"`
}

type BotChatClearResponse struct {
	SessionID string `json:"sessionId"`
	Cleared   bool   `json:"cleared"`
}

type BotService struct {
	mu               sync.RWMutex
	sessions         map[string][]BotChatEntry
	authoring        *flow.AuthoringService
	machine          *flow.StateMachine[RuntimeMsg]
	catalog          *flow.EditorCatalog
	defaultMachineID string
	clock            func() time.Time
	nextSession      atomic.Uint64
}

func NewBotService(
	authoring *flow.AuthoringService,
	machine *flow.StateMachine[RuntimeMsg],
	catalog *flow.EditorCatalog,
	defaultMachine string,
) *BotService {
	service := &BotService{
		sessions:         make(map[string][]BotChatEntry),
		authoring:        authoring,
		machine:          machine,
		catalog:          catalog,
		defaultMachineID: strings.TrimSpace(defaultMachine),
		clock: func() time.Time {
			return time.Now().UTC()
		},
	}
	if service.defaultMachineID == "" {
		service.defaultMachineID = defaultMachineID
	}
	return service
}

func (s *BotService) Send(ctx context.Context, req BotChatSendRequest) (BotChatSendResponse, error) {
	if s == nil || s.authoring == nil || s.machine == nil {
		return BotChatSendResponse{}, fmt.Errorf("bot service not configured")
	}

	sessionID := strings.TrimSpace(req.SessionID)
	if sessionID == "" {
		sessionID = s.newSessionID()
	}

	machineID := strings.TrimSpace(req.MachineID)
	if machineID == "" {
		machineID = s.defaultMachineID
	}

	message := strings.TrimSpace(req.Message)
	if message == "" {
		reply := "Message is required. Try /help for available automation commands."
		s.appendEntry(sessionID, "assistant", reply)
		return BotChatSendResponse{SessionID: sessionID, Reply: reply, Suggestions: defaultBotSuggestions()}, nil
	}

	s.appendEntry(sessionID, "user", message)

	result := s.routeCommand(ctx, machineID, message)
	s.appendEntry(sessionID, "assistant", result.reply)

	return BotChatSendResponse{
		SessionID:   sessionID,
		Reply:       result.reply,
		Suggestions: result.suggestions,
		Result:      result.result,
	}, nil
}

func (s *BotService) History(_ context.Context, req BotChatHistoryRequest) (BotChatHistoryResponse, error) {
	if s == nil {
		return BotChatHistoryResponse{}, fmt.Errorf("bot service not configured")
	}
	sessionID := strings.TrimSpace(req.SessionID)
	if sessionID == "" {
		return BotChatHistoryResponse{}, fmt.Errorf("sessionId is required")
	}

	s.mu.RLock()
	entries := cloneChatEntries(s.sessions[sessionID])
	s.mu.RUnlock()

	return BotChatHistoryResponse{
		SessionID: sessionID,
		Entries:   entries,
	}, nil
}

func (s *BotService) Clear(_ context.Context, req BotChatClearRequest) (BotChatClearResponse, error) {
	if s == nil {
		return BotChatClearResponse{}, fmt.Errorf("bot service not configured")
	}
	sessionID := strings.TrimSpace(req.SessionID)
	if sessionID == "" {
		return BotChatClearResponse{}, fmt.Errorf("sessionId is required")
	}

	s.mu.Lock()
	_, existed := s.sessions[sessionID]
	delete(s.sessions, sessionID)
	s.mu.Unlock()

	return BotChatClearResponse{SessionID: sessionID, Cleared: existed}, nil
}

type botRouteResult struct {
	reply       string
	suggestions []BotSuggestion
	result      map[string]any
}

func (s *BotService) routeCommand(ctx context.Context, machineID, message string) botRouteResult {
	cmd, args, ok := parseChatCommand(message)
	if !ok {
		return botRouteResult{
			reply:       "Commands must start with '/'. Try /help.",
			suggestions: defaultBotSuggestions(),
		}
	}

	switch cmd {
	case "/help":
		return botRouteResult{
			reply: "Available commands: /help, /validate, /publish, /status <entityId> [amount=120], " +
				"/simulate <event> <entityId> [amount=120] [dryRun=true], /apply <event> <entityId> [amount=120], " +
				"/add-transition <from> <event> <to>, /list-machines, /playbook <name>",
			suggestions: defaultBotSuggestions(),
		}
	case "/validate":
		return s.handleValidate(ctx, machineID)
	case "/publish":
		return s.handlePublish(ctx, machineID)
	case "/status":
		return s.handleStatus(ctx, machineID, args)
	case "/simulate":
		return s.handleTransition(ctx, machineID, args, true, "simulate")
	case "/apply":
		return s.handleTransition(ctx, machineID, args, false, "apply")
	case "/add-transition":
		return s.handleAddTransition(ctx, machineID, args)
	case "/list-machines":
		return s.handleListMachines(ctx)
	case "/playbook":
		return s.handlePlaybook(args)
	default:
		return botRouteResult{
			reply:       fmt.Sprintf("Unknown command '%s'. Try /help.", cmd),
			suggestions: defaultBotSuggestions(),
		}
	}
}

func (s *BotService) handleValidate(ctx context.Context, machineID string) botRouteResult {
	validated, err := s.authoring.Validate(ctx, flow.FSMAuthoringValidateRequest{MachineID: machineID})
	if err != nil {
		return formatBotError("validate", err)
	}

	reply := "Validation passed with no blocking diagnostics."
	if !validated.Valid {
		reply = fmt.Sprintf("Validation reported %d diagnostics.", len(validated.Diagnostics))
	}

	return botRouteResult{
		reply: reply,
		result: map[string]any{
			"valid":       validated.Valid,
			"diagnostics": validated.Diagnostics,
		},
		suggestions: []BotSuggestion{
			{ID: "publish", Label: "Publish", Command: "/publish"},
			{ID: "simulate", Label: "Simulate Approve", Command: "/simulate approve order-1 amount=120"},
		},
	}
}

func (s *BotService) handlePublish(ctx context.Context, machineID string) botRouteResult {
	current, err := s.authoring.GetMachine(ctx, flow.FSMAuthoringGetMachineRequest{
		MachineID:   machineID,
		PreferDraft: boolPtr(true),
	})
	if err != nil {
		return formatBotError("publish", err)
	}

	published, err := s.authoring.Publish(ctx, flow.FSMAuthoringPublishRequest{
		MachineID:       machineID,
		ExpectedVersion: current.Version,
	})
	if err != nil {
		return formatBotError("publish", err)
	}

	return botRouteResult{
		reply: fmt.Sprintf("Published machine '%s' as version %s.", published.MachineID, published.Version),
		result: map[string]any{
			"machineId":   published.MachineID,
			"version":     published.Version,
			"publishedAt": published.PublishedAt,
		},
		suggestions: []BotSuggestion{
			{ID: "validate", Label: "Validate", Command: "/validate"},
			{ID: "status", Label: "Status", Command: "/status order-1 amount=120"},
		},
	}
}

func (s *BotService) handleStatus(ctx context.Context, machineID string, args []string) botRouteResult {
	entityID := "order-1"
	amount := defaultTransitionAmount
	if len(args) > 0 {
		entityID = strings.TrimSpace(args[0])
	}
	if entityID == "" {
		entityID = "order-1"
	}
	optionTokens := []string{}
	if len(args) > 1 {
		optionTokens = args[1:]
	}
	options, err := parseCommandOptions(optionTokens)
	if err != nil {
		return botRouteResult{
			reply:       fmt.Sprintf("status parse failed: %v", err),
			suggestions: []BotSuggestion{{ID: "status-example", Label: "Try status", Command: "/status order-1 amount=120"}},
		}
	}
	if raw, ok := options["amount"]; ok {
		amount, err = strconv.ParseFloat(raw, 64)
		if err != nil {
			return botRouteResult{
				reply:       fmt.Sprintf("status parse failed: invalid amount %q", raw),
				suggestions: []BotSuggestion{{ID: "status-example", Label: "Try status", Command: "/status order-1 amount=120"}},
			}
		}
	}

	msg := RuntimeMsg{EntityID: entityID, Amount: amount}
	snapshot, err := s.machine.Snapshot(ctx, flow.SnapshotRequest[RuntimeMsg]{
		MachineID:      machineID,
		EntityID:       entityID,
		Msg:            msg,
		EvaluateGuards: true,
		IncludeBlocked: true,
	})
	if err != nil {
		return formatBotError("status", err)
	}

	allowed := allowedTransitionCount(snapshot)
	blocked := blockedTransitionCount(snapshot)
	reply := fmt.Sprintf(
		"Status for '%s': current state '%s' with %d allowed and %d blocked transition(s).",
		entityID,
		snapshot.CurrentState,
		allowed,
		blocked,
	)
	return botRouteResult{
		reply: reply,
		result: map[string]any{
			"snapshot": snapshot,
			"inputs": map[string]any{
				"machineId": machineID,
				"entityId":  entityID,
				"amount":    amount,
			},
		},
		suggestions: []BotSuggestion{
			{ID: "simulate", Label: "Simulate Approve", Command: "/simulate approve order-1 amount=120"},
			{ID: "high-risk", Label: "High Risk Reroute", Command: "/simulate reroute order-approved amount=1500"},
		},
	}
}

func (s *BotService) handleTransition(
	ctx context.Context,
	machineID string,
	args []string,
	defaultDryRun bool,
	action string,
) botRouteResult {
	input, err := parseTransitionCommandArgs(args, defaultDryRun)
	if err != nil {
		usage := fmt.Sprintf("Usage: /%s <event> <entityId> [amount=120] [dryRun=%t] [expectedState=<state>] [expectedVersion=<int>] [idempotency=<key>]", action, defaultDryRun)
		return botRouteResult{
			reply: usage,
			suggestions: []BotSuggestion{
				{ID: "simulate-example", Label: "Try simulate", Command: "/simulate approve order-1 amount=120"},
				{ID: "apply-example", Label: "Try apply", Command: "/apply approve order-1 amount=120"},
			},
			result: map[string]any{
				"error": err.Error(),
			},
		}
	}

	msg := RuntimeMsg{
		EntityID: input.EntityID,
		Event:    input.Event,
		Amount:   input.Amount,
	}

	applyResult, applyErr := s.machine.ApplyEvent(ctx, flow.ApplyEventRequest[RuntimeMsg]{
		MachineID:       machineID,
		EntityID:        input.EntityID,
		Event:           input.Event,
		Msg:             msg,
		ExpectedState:   input.ExpectedState,
		ExpectedVersion: input.ExpectedVersion,
		IdempotencyKey:  input.IdempotencyKey,
		DryRun:          input.DryRun,
	})
	if applyErr != nil {
		formatted := formatBotError(action, applyErr)
		if formatted.result == nil {
			formatted.result = map[string]any{}
		}
		formatted.result["inputs"] = map[string]any{
			"machineId":       machineID,
			"event":           input.Event,
			"entityId":        input.EntityID,
			"amount":          input.Amount,
			"dryRun":          input.DryRun,
			"expectedState":   input.ExpectedState,
			"expectedVersion": input.ExpectedVersion,
			"idempotencyKey":  input.IdempotencyKey,
		}
		return formatted
	}

	snapshot, err := s.machine.Snapshot(ctx, flow.SnapshotRequest[RuntimeMsg]{
		MachineID:      machineID,
		EntityID:       input.EntityID,
		Msg:            msg,
		EvaluateGuards: true,
		IncludeBlocked: true,
	})
	if err != nil {
		return formatBotError("snapshot", err)
	}

	blocked := blockedTransitionCount(snapshot)
	if applyResult.Snapshot != nil {
		if projectedBlocked := blockedTransitionCount(applyResult.Snapshot); projectedBlocked > blocked {
			blocked = projectedBlocked
		}
	}

	replyVerb := "Dry-run"
	if !input.DryRun {
		replyVerb = "Applied"
	}
	projectedState := ""
	if applyResult.Transition != nil {
		projectedState = applyResult.Transition.CurrentState
	}
	reply := fmt.Sprintf(
		"%s '%s' for '%s' at amount %.2f projected state '%s'; snapshot has %d blocked transition(s).",
		replyVerb,
		input.Event,
		input.EntityID,
		input.Amount,
		projectedState,
		blocked,
	)

	return botRouteResult{
		reply: reply,
		result: map[string]any{
			"applyEvent": applyResult,
			"snapshot":   snapshot,
			"inputs": map[string]any{
				"machineId":       machineID,
				"event":           input.Event,
				"entityId":        input.EntityID,
				"amount":          input.Amount,
				"dryRun":          input.DryRun,
				"expectedState":   input.ExpectedState,
				"expectedVersion": input.ExpectedVersion,
				"idempotencyKey":  input.IdempotencyKey,
			},
		},
		suggestions: []BotSuggestion{
			{ID: "status", Label: "Status", Command: fmt.Sprintf("/status %s amount=%.0f", input.EntityID, input.Amount)},
			{ID: "validate", Label: "Validate", Command: "/validate"},
		},
	}
}

func (s *BotService) handleListMachines(ctx context.Context) botRouteResult {
	includeDrafts := true
	limit := 20
	out, err := s.authoring.ListMachines(ctx, flow.FSMAuthoringListMachinesRequest{
		IncludeDrafts: &includeDrafts,
		Limit:         &limit,
	})
	if err != nil {
		return formatBotError("list-machines", err)
	}
	if len(out.Items) == 0 {
		return botRouteResult{
			reply:       "No machines found.",
			result:      map[string]any{"items": []any{}},
			suggestions: []BotSuggestion{{ID: "validate", Label: "Validate", Command: "/validate"}},
		}
	}
	parts := make([]string, 0, len(out.Items))
	for _, item := range out.Items {
		parts = append(parts, fmt.Sprintf("%s(%s)", item.MachineID, item.Version))
	}
	return botRouteResult{
		reply: fmt.Sprintf("Available machines: %s", strings.Join(parts, ", ")),
		result: map[string]any{
			"items": out.Items,
		},
		suggestions: []BotSuggestion{
			{ID: "status", Label: "Status Order-1", Command: "/status order-1 amount=120"},
			{ID: "playbook", Label: "Show Playbooks", Command: "/playbook"},
		},
	}
}

func (s *BotService) handlePlaybook(args []string) botRouteResult {
	if len(args) == 0 {
		return botRouteResult{
			reply: "Playbooks: quickstart, manual-review, conflict-check. " +
				"Use /playbook <name> to get the command sequence.",
			result: map[string]any{
				"playbooks": []string{"quickstart", "manual-review", "conflict-check"},
			},
			suggestions: []BotSuggestion{
				{ID: "playbook-quickstart", Label: "Quickstart", Command: "/playbook quickstart"},
				{ID: "playbook-manual", Label: "Manual Review", Command: "/playbook manual-review"},
			},
		}
	}

	switch strings.ToLower(strings.TrimSpace(args[0])) {
	case "quickstart":
		return botRouteResult{
			reply: "Quickstart: /status order-1 amount=120 -> /simulate approve order-1 amount=120 -> /validate -> /publish",
			result: map[string]any{
				"commands": []string{
					"/status order-1 amount=120",
					"/simulate approve order-1 amount=120",
					"/validate",
					"/publish",
				},
			},
			suggestions: []BotSuggestion{
				{ID: "quick-1", Label: "Run Status", Command: "/status order-1 amount=120"},
				{ID: "quick-2", Label: "Run Simulate", Command: "/simulate approve order-1 amount=120"},
			},
		}
	case "manual-review":
		return botRouteResult{
			reply: "Manual-review: /simulate reroute order-approved amount=120 (blocked) then /simulate reroute order-approved amount=1500 (allowed).",
			result: map[string]any{
				"commands": []string{
					"/simulate reroute order-approved amount=120",
					"/simulate reroute order-approved amount=1500",
					"/apply reroute order-approved amount=1500",
				},
			},
			suggestions: []BotSuggestion{
				{ID: "manual-1", Label: "Blocked Case", Command: "/simulate reroute order-approved amount=120"},
				{ID: "manual-2", Label: "Allowed Case", Command: "/simulate reroute order-approved amount=1500"},
			},
		}
	case "conflict-check":
		return botRouteResult{
			reply: "Conflict-check: open two tabs, run /add-transition in both, then validate/publish to inspect version conflict handling.",
			result: map[string]any{
				"commands": []string{
					"/add-transition approved escalate escalated",
					"/validate",
					"/publish",
				},
			},
			suggestions: []BotSuggestion{
				{ID: "conflict-1", Label: "Add Transition", Command: "/add-transition approved escalate escalated"},
				{ID: "conflict-2", Label: "Validate", Command: "/validate"},
			},
		}
	default:
		return botRouteResult{
			reply:       fmt.Sprintf("Unknown playbook '%s'. Available: quickstart, manual-review, conflict-check.", args[0]),
			suggestions: []BotSuggestion{{ID: "playbook-list", Label: "List Playbooks", Command: "/playbook"}},
		}
	}
}

type transitionCommandInput struct {
	Event           string
	EntityID        string
	Amount          float64
	DryRun          bool
	ExpectedState   string
	ExpectedVersion int
	IdempotencyKey  string
}

func parseTransitionCommandArgs(args []string, defaultDryRun bool) (transitionCommandInput, error) {
	if len(args) < 2 {
		return transitionCommandInput{}, fmt.Errorf("missing event/entityId")
	}
	event := strings.TrimSpace(args[0])
	entityID := strings.TrimSpace(args[1])
	if event == "" || entityID == "" {
		return transitionCommandInput{}, fmt.Errorf("event and entityId are required")
	}
	options, err := parseCommandOptions(args[2:])
	if err != nil {
		return transitionCommandInput{}, err
	}
	out := transitionCommandInput{
		Event:    event,
		EntityID: entityID,
		Amount:   defaultTransitionAmount,
		DryRun:   defaultDryRun,
	}
	if raw, ok := options["amount"]; ok {
		amount, parseErr := strconv.ParseFloat(raw, 64)
		if parseErr != nil {
			return transitionCommandInput{}, fmt.Errorf("invalid amount %q", raw)
		}
		out.Amount = amount
	}
	if raw, ok := options["dryrun"]; ok {
		dryRun, parseErr := strconv.ParseBool(raw)
		if parseErr != nil {
			return transitionCommandInput{}, fmt.Errorf("invalid dryRun %q", raw)
		}
		out.DryRun = dryRun
	}
	if raw, ok := options["expectedstate"]; ok {
		out.ExpectedState = strings.TrimSpace(raw)
	}
	if raw, ok := options["expectedversion"]; ok {
		version, parseErr := strconv.Atoi(raw)
		if parseErr != nil {
			return transitionCommandInput{}, fmt.Errorf("invalid expectedVersion %q", raw)
		}
		out.ExpectedVersion = version
	}
	if raw, ok := options["idempotency"]; ok {
		out.IdempotencyKey = strings.TrimSpace(raw)
	}
	if out.IdempotencyKey == "" {
		if raw, ok := options["idempotencykey"]; ok {
			out.IdempotencyKey = strings.TrimSpace(raw)
		}
	}
	for key := range options {
		switch key {
		case "amount", "dryrun", "expectedstate", "expectedversion", "idempotency", "idempotencykey":
		default:
			return transitionCommandInput{}, fmt.Errorf("unsupported option %q", key)
		}
	}
	return out, nil
}

func (s *BotService) handleAddTransition(ctx context.Context, machineID string, args []string) botRouteResult {
	if len(args) < 3 {
		return botRouteResult{
			reply:       "Usage: /add-transition <from> <event> <to>",
			suggestions: []BotSuggestion{{ID: "add-transition-example", Label: "Try add transition", Command: "/add-transition approved escalate escalated"}},
		}
	}

	from := normalizeName(args[0])
	event := normalizeName(args[1])
	to := normalizeName(args[2])
	if from == "" || event == "" || to == "" {
		return botRouteResult{reply: "from, event, and to must be non-empty values."}
	}

	loaded, err := s.authoring.GetMachine(ctx, flow.FSMAuthoringGetMachineRequest{
		MachineID:   machineID,
		PreferDraft: boolPtr(true),
	})
	if err != nil {
		return formatBotError("add-transition", err)
	}

	draft := loaded.Draft
	if draft.Definition == nil {
		draft.Definition = flow.MachineDefinitionFromUISchema(draft.UISchema, machineID, loaded.Version)
	}
	if draft.Definition == nil {
		return botRouteResult{reply: "machine definition is unavailable for editing."}
	}

	if hasTransition(draft.Definition, from, event, to) {
		return botRouteResult{
			reply: fmt.Sprintf("Transition %s --%s--> %s already exists.", from, event, to),
			result: map[string]any{
				"machineId": machineID,
				"version":   loaded.Version,
			},
			suggestions: []BotSuggestion{{ID: "validate", Label: "Validate", Command: "/validate"}},
		}
	}

	ensureState(draft.Definition, to)
	transitionID := nextTransitionID(draft.Definition, from, event, to)
	draft.Definition.Transitions = append(draft.Definition.Transitions, flow.TransitionDefinition{
		ID:    transitionID,
		Event: event,
		From:  from,
		To:    to,
		Workflow: flow.TransitionWorkflowDefinition{
			Nodes: []flow.WorkflowNodeDefinition{
				{
					ID:   "step-" + transitionID,
					Kind: "step",
					Step: &flow.StepDefinition{
						ActionID: "notify.ops",
						Metadata: map[string]any{"source": "bot"},
					},
				},
			},
		},
	})

	uiSchema, _ := flow.MachineDefinitionToUISchema(draft.Definition, s.catalog, nil)
	draft.UISchema = uiSchema

	validate := true
	saved, err := s.authoring.SaveDraft(ctx, flow.FSMAuthoringSaveDraftRequest{
		MachineID:   machineID,
		BaseVersion: loaded.Version,
		Draft:       draft,
		Validate:    &validate,
	})
	if err != nil {
		return formatBotError("add-transition", err)
	}

	return botRouteResult{
		reply: fmt.Sprintf("Added transition %s --%s--> %s (version %s).", from, event, to, saved.Version),
		result: map[string]any{
			"machineId":    machineID,
			"version":      saved.Version,
			"transitionId": transitionID,
			"diagnostics":  saved.Diagnostics,
		},
		suggestions: []BotSuggestion{
			{ID: "validate", Label: "Validate", Command: "/validate"},
			{ID: "simulate", Label: "Simulate Approve", Command: "/simulate approve order-1 amount=120"},
		},
	}
}

func parseChatCommand(message string) (string, []string, bool) {
	trimmed := strings.TrimSpace(message)
	if trimmed == "" {
		return "", nil, false
	}
	parts := strings.Fields(trimmed)
	if len(parts) == 0 {
		return "", nil, false
	}
	command := strings.ToLower(parts[0])
	if !strings.HasPrefix(command, "/") {
		return "", nil, false
	}
	return command, parts[1:], true
}

func parseCommandOptions(tokens []string) (map[string]string, error) {
	options := make(map[string]string, len(tokens))
	for _, token := range tokens {
		pair := strings.TrimSpace(token)
		if pair == "" {
			continue
		}
		parts := strings.SplitN(pair, "=", 2)
		if len(parts) != 2 {
			return nil, fmt.Errorf("invalid option %q: expected key=value", token)
		}
		key := strings.ToLower(strings.TrimSpace(parts[0]))
		value := strings.TrimSpace(parts[1])
		if key == "" {
			return nil, fmt.Errorf("invalid option %q: key is required", token)
		}
		options[key] = value
	}
	return options, nil
}

func (s *BotService) appendEntry(sessionID, role, message string) {
	if strings.TrimSpace(sessionID) == "" || strings.TrimSpace(message) == "" {
		return
	}
	entry := BotChatEntry{
		Role:    strings.TrimSpace(role),
		Message: strings.TrimSpace(message),
		At:      s.clock().Format(time.RFC3339),
	}
	s.mu.Lock()
	s.sessions[sessionID] = append(s.sessions[sessionID], entry)
	s.mu.Unlock()
}

func (s *BotService) newSessionID() string {
	id := s.nextSession.Add(1)
	return fmt.Sprintf("session-%d", id)
}

func cloneChatEntries(entries []BotChatEntry) []BotChatEntry {
	if len(entries) == 0 {
		return []BotChatEntry{}
	}
	out := make([]BotChatEntry, len(entries))
	copy(out, entries)
	return out
}

func blockedTransitionCount(snapshot *flow.Snapshot) int {
	if snapshot == nil {
		return 0
	}
	count := 0
	for _, transition := range snapshot.AllowedTransitions {
		if !transition.Allowed {
			count++
		}
	}
	return count
}

func allowedTransitionCount(snapshot *flow.Snapshot) int {
	if snapshot == nil {
		return 0
	}
	count := 0
	for _, transition := range snapshot.AllowedTransitions {
		if transition.Allowed {
			count++
		}
	}
	return count
}

func normalizeName(value string) string {
	return strings.ToLower(strings.TrimSpace(value))
}

func hasTransition(def *flow.MachineDefinition, from, event, to string) bool {
	if def == nil {
		return false
	}
	for _, transition := range def.Transitions {
		if normalizeName(transition.From) == from && normalizeName(transition.Event) == event && normalizeName(transition.To) == to {
			return true
		}
	}
	return false
}

func ensureState(def *flow.MachineDefinition, state string) {
	if def == nil || state == "" {
		return
	}
	for _, current := range def.States {
		if normalizeName(current.Name) == state {
			return
		}
	}
	def.States = append(def.States, flow.StateDefinition{Name: state})
}

func nextTransitionID(def *flow.MachineDefinition, from, event, to string) string {
	if def == nil {
		return fmt.Sprintf("%s_%s_%s", from, event, to)
	}
	base := fmt.Sprintf("%s_%s_%s", from, event, to)
	candidate := base
	index := 1
	for transitionIDExists(def, candidate) {
		index++
		candidate = fmt.Sprintf("%s_%d", base, index)
	}
	return candidate
}

func transitionIDExists(def *flow.MachineDefinition, candidate string) bool {
	for _, transition := range def.Transitions {
		if transition.ID == candidate {
			return true
		}
	}
	return false
}

func defaultBotSuggestions() []BotSuggestion {
	return []BotSuggestion{
		{ID: "validate", Label: "Validate", Command: "/validate"},
		{ID: "publish", Label: "Publish", Command: "/publish"},
		{ID: "status", Label: "Status", Command: "/status order-1 amount=120"},
		{ID: "simulate", Label: "Simulate Approve", Command: "/simulate approve order-1 amount=120"},
		{ID: "add", Label: "Add Transition", Command: "/add-transition approved escalate escalated"},
		{ID: "playbook", Label: "Playbook", Command: "/playbook"},
	}
}

func formatBotError(action string, err error) botRouteResult {
	rpcErr := flow.RPCErrorForError(err)
	if rpcErr == nil {
		return botRouteResult{reply: fmt.Sprintf("%s failed: %v", action, err)}
	}
	return botRouteResult{
		reply: fmt.Sprintf("%s failed: %s (%s)", action, rpcErr.Message, rpcErr.Code),
		result: map[string]any{
			"error": rpcErr,
		},
		suggestions: defaultBotSuggestions(),
	}
}

type BotChatSendRPCCommand struct {
	Service *BotService
}

func (c *BotChatSendRPCCommand) Query(
	ctx context.Context,
	req cmdrpc.RequestEnvelope[BotChatSendRequest],
) (cmdrpc.ResponseEnvelope[BotChatSendResponse], error) {
	if c == nil || c.Service == nil {
		return cmdrpc.ResponseEnvelope[BotChatSendResponse]{}, fmt.Errorf("bot chat send service not configured")
	}
	out, err := c.Service.Send(ctx, req.Data)
	if err != nil {
		return cmdrpc.ResponseEnvelope[BotChatSendResponse]{}, err
	}
	return cmdrpc.ResponseEnvelope[BotChatSendResponse]{Data: out}, nil
}

func (c *BotChatSendRPCCommand) RPCEndpoints() []cmdrpc.EndpointDefinition {
	return []cmdrpc.EndpointDefinition{
		cmdrpc.NewEndpoint[BotChatSendRequest, BotChatSendResponse](
			cmdrpc.EndpointSpec{Method: BotMethodChatSend, Kind: cmdrpc.MethodKindCommand},
			c.Query,
		),
	}
}

type BotChatHistoryRPCCommand struct {
	Service *BotService
}

func (c *BotChatHistoryRPCCommand) Query(
	ctx context.Context,
	req cmdrpc.RequestEnvelope[BotChatHistoryRequest],
) (cmdrpc.ResponseEnvelope[BotChatHistoryResponse], error) {
	if c == nil || c.Service == nil {
		return cmdrpc.ResponseEnvelope[BotChatHistoryResponse]{}, fmt.Errorf("bot chat history service not configured")
	}
	out, err := c.Service.History(ctx, req.Data)
	if err != nil {
		return cmdrpc.ResponseEnvelope[BotChatHistoryResponse]{}, err
	}
	return cmdrpc.ResponseEnvelope[BotChatHistoryResponse]{Data: out}, nil
}

func (c *BotChatHistoryRPCCommand) RPCEndpoints() []cmdrpc.EndpointDefinition {
	return []cmdrpc.EndpointDefinition{
		cmdrpc.NewEndpoint[BotChatHistoryRequest, BotChatHistoryResponse](
			cmdrpc.EndpointSpec{Method: BotMethodChatHistory, Kind: cmdrpc.MethodKindQuery, Idempotent: true},
			c.Query,
		),
	}
}

type BotChatClearRPCCommand struct {
	Service *BotService
}

func (c *BotChatClearRPCCommand) Query(
	ctx context.Context,
	req cmdrpc.RequestEnvelope[BotChatClearRequest],
) (cmdrpc.ResponseEnvelope[BotChatClearResponse], error) {
	if c == nil || c.Service == nil {
		return cmdrpc.ResponseEnvelope[BotChatClearResponse]{}, fmt.Errorf("bot chat clear service not configured")
	}
	out, err := c.Service.Clear(ctx, req.Data)
	if err != nil {
		return cmdrpc.ResponseEnvelope[BotChatClearResponse]{}, err
	}
	return cmdrpc.ResponseEnvelope[BotChatClearResponse]{Data: out}, nil
}

func (c *BotChatClearRPCCommand) RPCEndpoints() []cmdrpc.EndpointDefinition {
	return []cmdrpc.EndpointDefinition{
		cmdrpc.NewEndpoint[BotChatClearRequest, BotChatClearResponse](
			cmdrpc.EndpointSpec{Method: BotMethodChatClear, Kind: cmdrpc.MethodKindCommand},
			c.Query,
		),
	}
}

func RegisterBotRPCCommands(registry *command.Registry, service *BotService) error {
	if registry == nil {
		return fmt.Errorf("registry is required")
	}
	for _, cmd := range []any{
		&BotChatSendRPCCommand{Service: service},
		&BotChatHistoryRPCCommand{Service: service},
		&BotChatClearRPCCommand{Service: service},
	} {
		if err := registry.RegisterCommand(cmd); err != nil {
			return err
		}
	}
	return nil
}

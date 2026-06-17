package main

import (
	"context"
	"strings"
	"testing"

	"github.com/goliatone/go-command/flow"
)

func TestParseChatCommand(t *testing.T) {
	tests := []struct {
		name      string
		input     string
		wantCmd   string
		wantArgs  int
		wantValid bool
	}{
		{name: "help", input: "/help", wantCmd: "/help", wantArgs: 0, wantValid: true},
		{name: "simulate", input: "/simulate approve order-1", wantCmd: "/simulate", wantArgs: 2, wantValid: true},
		{name: "plain text", input: "hello", wantValid: false},
		{name: "empty", input: "  ", wantValid: false},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			cmd, args, ok := parseChatCommand(tt.input)
			if ok != tt.wantValid {
				t.Fatalf("valid mismatch: got %v want %v", ok, tt.wantValid)
			}
			if cmd != tt.wantCmd {
				t.Fatalf("command mismatch: got %q want %q", cmd, tt.wantCmd)
			}
			if len(args) != tt.wantArgs {
				t.Fatalf("args mismatch: got %d want %d", len(args), tt.wantArgs)
			}
		})
	}
}

func TestParseTransitionCommandArgs(t *testing.T) {
	got, err := parseTransitionCommandArgs([]string{
		"approve",
		"order-1",
		"amount=1250.5",
		"dryRun=false",
		"expectedState=draft",
		"expectedVersion=2",
		"idempotency=idem-1",
	}, true)
	if err != nil {
		t.Fatalf("parseTransitionCommandArgs error: %v", err)
	}
	if got.Event != "approve" || got.EntityID != "order-1" {
		t.Fatalf("unexpected event/entity parsed: %#v", got)
	}
	if got.Amount != 1250.5 {
		t.Fatalf("amount mismatch: got %v", got.Amount)
	}
	if got.DryRun {
		t.Fatal("expected dryRun=false from options")
	}
	if got.ExpectedState != "draft" || got.ExpectedVersion != 2 {
		t.Fatalf("expected state/version mismatch: %#v", got)
	}
	if got.IdempotencyKey != "idem-1" {
		t.Fatalf("idempotency mismatch: %#v", got)
	}

	_, err = parseTransitionCommandArgs([]string{"approve", "order-1", "unsupported=true"}, true)
	if err == nil {
		t.Fatal("expected unsupported option error")
	}
}

func TestBotAddTransitionMutatesDraftAndVersion(t *testing.T) {
	app, err := NewApp(context.Background())
	if err != nil {
		t.Fatalf("new app: %v", err)
	}

	before, err := app.authoring.GetMachine(context.Background(), flowGetMachineReq())
	if err != nil {
		t.Fatalf("get before machine: %v", err)
	}

	response, err := app.bot.Send(context.Background(), BotChatSendRequest{
		MachineID: app.machineID,
		Message:   "/add-transition approved escalate escalated",
	})
	if err != nil {
		t.Fatalf("bot add transition: %v", err)
	}
	if response.SessionID == "" {
		t.Fatal("expected session id")
	}

	after, err := app.authoring.GetMachine(context.Background(), flowGetMachineReq())
	if err != nil {
		t.Fatalf("get after machine: %v", err)
	}
	if before.Version == after.Version {
		t.Fatalf("expected version bump after add-transition, still %s", after.Version)
	}

	if !hasTransition(after.Draft.Definition, "approved", "escalate", "escalated") {
		t.Fatal("expected transition approved --escalate--> escalated")
	}
}

func TestBotChatHistoryAndClearLifecycle(t *testing.T) {
	app, err := NewApp(context.Background())
	if err != nil {
		t.Fatalf("new app: %v", err)
	}

	sent, err := app.bot.Send(context.Background(), BotChatSendRequest{Message: "/help"})
	if err != nil {
		t.Fatalf("bot send: %v", err)
	}
	if sent.SessionID == "" {
		t.Fatal("expected session id")
	}

	history, err := app.bot.History(context.Background(), BotChatHistoryRequest{SessionID: sent.SessionID})
	if err != nil {
		t.Fatalf("history: %v", err)
	}
	if len(history.Entries) < 2 {
		t.Fatalf("expected at least 2 chat entries, got %d", len(history.Entries))
	}
	if history.Entries[0].Role != "user" {
		t.Fatalf("expected first history role user, got %q", history.Entries[0].Role)
	}

	cleared, err := app.bot.Clear(context.Background(), BotChatClearRequest{SessionID: sent.SessionID})
	if err != nil {
		t.Fatalf("clear: %v", err)
	}
	if !cleared.Cleared {
		t.Fatal("expected clear to report true")
	}

	historyAfter, err := app.bot.History(context.Background(), BotChatHistoryRequest{SessionID: sent.SessionID})
	if err != nil {
		t.Fatalf("history after clear: %v", err)
	}
	if len(historyAfter.Entries) != 0 {
		t.Fatalf("expected empty history after clear, got %d", len(historyAfter.Entries))
	}
}

func TestBotTransitionFlowAndManualReview(t *testing.T) {
	app, err := NewApp(context.Background())
	if err != nil {
		t.Fatalf("new app: %v", err)
	}

	blocked, err := app.bot.Send(context.Background(), BotChatSendRequest{
		MachineID: app.machineID,
		Message:   "/simulate reroute order-approved amount=120",
	})
	if err != nil {
		t.Fatalf("blocked simulate: %v", err)
	}
	if !strings.Contains(blocked.Reply, flow.ErrCodeGuardRejected) {
		t.Fatalf("expected guard rejection code in blocked response, got %q", blocked.Reply)
	}

	allowed, err := app.bot.Send(context.Background(), BotChatSendRequest{
		MachineID: app.machineID,
		Message:   "/simulate reroute order-approved amount=1500",
	})
	if err != nil {
		t.Fatalf("allowed simulate: %v", err)
	}
	if !strings.Contains(strings.ToLower(allowed.Reply), "projected state 'review'") {
		t.Fatalf("expected projected review state, got %q", allowed.Reply)
	}

	applied, err := app.bot.Send(context.Background(), BotChatSendRequest{
		MachineID: app.machineID,
		Message:   "/apply approve order-1 amount=120",
	})
	if err != nil {
		t.Fatalf("apply transition: %v", err)
	}
	if !strings.HasPrefix(applied.Reply, "Applied") {
		t.Fatalf("expected applied reply, got %q", applied.Reply)
	}

	status, err := app.bot.Send(context.Background(), BotChatSendRequest{
		MachineID: app.machineID,
		Message:   "/status order-1 amount=120",
	})
	if err != nil {
		t.Fatalf("status transition: %v", err)
	}
	if !strings.Contains(strings.ToLower(status.Reply), "approved") {
		t.Fatalf("expected status to include approved state, got %q", status.Reply)
	}
}

func TestBotListMachinesAndPlaybook(t *testing.T) {
	app, err := NewApp(context.Background())
	if err != nil {
		t.Fatalf("new app: %v", err)
	}

	listed, err := app.bot.Send(context.Background(), BotChatSendRequest{
		MachineID: app.machineID,
		Message:   "/list-machines",
	})
	if err != nil {
		t.Fatalf("list machines: %v", err)
	}
	if !strings.Contains(strings.ToLower(listed.Reply), "orders") {
		t.Fatalf("expected orders machine in list reply, got %q", listed.Reply)
	}

	playbook, err := app.bot.Send(context.Background(), BotChatSendRequest{
		MachineID: app.machineID,
		Message:   "/playbook quickstart",
	})
	if err != nil {
		t.Fatalf("playbook command: %v", err)
	}
	if !strings.Contains(strings.ToLower(playbook.Reply), "quickstart") {
		t.Fatalf("expected quickstart reply, got %q", playbook.Reply)
	}
}

func flowGetMachineReq() flow.FSMAuthoringGetMachineRequest {
	return flow.FSMAuthoringGetMachineRequest{
		MachineID:   defaultMachineID,
		PreferDraft: boolPtr(true),
	}
}

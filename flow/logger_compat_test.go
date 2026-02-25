package flow

import (
	"bytes"
	"context"
	"strings"
	"testing"

	"github.com/goliatone/go-logger/glog"
)

type loggerCompatMsg struct {
	ID    string
	Event string
	State string
}

func (loggerCompatMsg) Type() string { return "logger.compat.msg" }

type glogCompatLogger struct {
	logger glog.Logger
}

func (l glogCompatLogger) Trace(msg string, args ...any) { l.logger.Trace(msg, args...) }
func (l glogCompatLogger) Debug(msg string, args ...any) { l.logger.Debug(msg, args...) }
func (l glogCompatLogger) Info(msg string, args ...any)  { l.logger.Info(msg, args...) }
func (l glogCompatLogger) Warn(msg string, args ...any)  { l.logger.Warn(msg, args...) }
func (l glogCompatLogger) Error(msg string, args ...any) { l.logger.Error(msg, args...) }
func (l glogCompatLogger) Fatal(msg string, args ...any) { l.logger.Fatal(msg, args...) }

func (l glogCompatLogger) WithContext(ctx context.Context) Logger {
	if l.logger == nil {
		return NewFmtLogger(nil).WithContext(ctx)
	}
	return glogCompatLogger{logger: l.logger.WithContext(ctx)}
}

func (l glogCompatLogger) WithFields(fields map[string]any) Logger {
	if l.logger == nil {
		return NewFmtLogger(nil).WithFields(fields)
	}
	if fl, ok := l.logger.(glog.FieldsLogger); ok {
		return glogCompatLogger{logger: fl.WithFields(fields)}
	}
	return l
}

func TestLoggerCompatibility_BaseLoggerAndFmtFallback(t *testing.T) {
	cfg := StateMachineConfig{
		Entity:          "order",
		ExecutionPolicy: ExecutionPolicyLightweight,
		States:          []StateConfig{{Name: "draft", Initial: true}, {Name: "approved"}},
		Transitions:     []TransitionConfig{{Name: "approve", From: "draft", To: "approved"}},
	}
	req := TransitionRequest[loggerCompatMsg]{
		StateKey: func(m loggerCompatMsg) string { return m.ID },
		Event:    func(m loggerCompatMsg) string { return m.Event },
	}

	buf := &bytes.Buffer{}
	base := glog.NewLogger(
		glog.WithWriter(buf),
		glog.WithLoggerTypeJSON(),
		glog.WithLevel("trace"),
	)
	logger := glogCompatLogger{logger: base}

	smBase, err := newStateMachineFromConfig(cfg, NewInMemoryStateStore(), req, nil, nil, WithLogger[loggerCompatMsg](logger))
	if err != nil {
		t.Fatalf("new state machine with base logger: %v", err)
	}
	mustSeedStateRecord(t, smBase, "entity-base", "draft")
	_, err = smBase.ApplyEvent(context.Background(), ApplyEventRequest[loggerCompatMsg]{
		EntityID: "entity-base",
		Event:    "approve",
		Msg:      loggerCompatMsg{ID: "entity-base", Event: "approve", State: "draft"},
	})
	if err != nil {
		t.Fatalf("apply event with base logger: %v", err)
	}
	logged := buf.String()
	if strings.TrimSpace(logged) == "" {
		t.Fatalf("expected go-logger BaseLogger output")
	}
	if !strings.Contains(logged, "entity_id") {
		t.Fatalf("expected structured correlation fields in BaseLogger output")
	}

	smFallback, err := newStateMachineFromConfig(cfg, NewInMemoryStateStore(), req, nil, nil, WithLogger[loggerCompatMsg](nil))
	if err != nil {
		t.Fatalf("new state machine with nil logger: %v", err)
	}
	if _, ok := smFallback.logger.(*FmtLogger); !ok {
		t.Fatalf("expected nil logger to normalize to FmtLogger fallback")
	}
	mustSeedStateRecord(t, smFallback, "entity-fallback", "draft")
	_, err = smFallback.ApplyEvent(context.Background(), ApplyEventRequest[loggerCompatMsg]{
		EntityID: "entity-fallback",
		Event:    "approve",
		Msg:      loggerCompatMsg{ID: "entity-fallback", Event: "approve", State: "draft"},
	})
	if err != nil {
		t.Fatalf("apply event with fallback logger: %v", err)
	}
}

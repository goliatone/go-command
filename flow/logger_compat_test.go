package flow

import (
	"bytes"
	"context"
	"strings"
	"testing"

	"github.com/goliatone/go-logger/glog"
)

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

func TestPhase7LoggerCompatibility_BaseLoggerAndFmtFallback(t *testing.T) {
	cfg := StateMachineConfig{
		Entity:          "order",
		ExecutionPolicy: ExecutionPolicyLightweight,
		States:          []StateConfig{{Name: "draft", Initial: true}, {Name: "approved"}},
		Transitions:     []TransitionConfig{{Name: "approve", From: "draft", To: "approved"}},
	}
	req := TransitionRequest[phase7Msg]{
		StateKey:     func(m phase7Msg) string { return m.ID },
		Event:        func(m phase7Msg) string { return m.Event },
		CurrentState: func(m phase7Msg) string { return m.State },
	}

	buf := &bytes.Buffer{}
	base := glog.NewLogger(
		glog.WithWriter(buf),
		glog.WithLoggerTypeJSON(),
		glog.WithLevel("trace"),
	)
	logger := glogCompatLogger{logger: base}

	smBase, err := NewStateMachine(cfg, NewInMemoryStateStore(), req, nil, nil, WithLogger[phase7Msg](logger))
	if err != nil {
		t.Fatalf("new state machine with base logger: %v", err)
	}
	_, err = smBase.ApplyEvent(context.Background(), ApplyEventRequest[phase7Msg]{
		EntityID: "entity-base",
		Event:    "approve",
		Msg:      phase7Msg{ID: "entity-base", Event: "approve", State: "draft"},
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

	smFallback, err := NewStateMachine(cfg, NewInMemoryStateStore(), req, nil, nil, WithLogger[phase7Msg](nil))
	if err != nil {
		t.Fatalf("new state machine with nil logger: %v", err)
	}
	if _, ok := smFallback.logger.(*FmtLogger); !ok {
		t.Fatalf("expected nil logger to normalize to FmtLogger fallback")
	}
	_, err = smFallback.ApplyEvent(context.Background(), ApplyEventRequest[phase7Msg]{
		EntityID: "entity-fallback",
		Event:    "approve",
		Msg:      phase7Msg{ID: "entity-fallback", Event: "approve", State: "draft"},
	})
	if err != nil {
		t.Fatalf("apply event with fallback logger: %v", err)
	}
}

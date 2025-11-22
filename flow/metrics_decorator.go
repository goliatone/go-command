package flow

import (
	"context"
	"time"

	"github.com/goliatone/go-command"
)

// MetricsDecorator adds metrics to any flow
type MetricsDecorator[T command.Message] struct {
	flow interface {
		Execute(context.Context, T) error
	}
	recorder MetricsRecorder
}

type MetricsRecorder interface {
	RecordDuration(name string, duration time.Duration)
	RecordError(name string)
	RecordSuccess(name string)
}

func NewMetricsDecorator[T command.Message](
	flow interface {
		Execute(context.Context, T) error
	},
	recorder MetricsRecorder,
) *MetricsDecorator[T] {
	return &MetricsDecorator[T]{
		flow:     flow,
		recorder: recorder,
	}
}

func (m *MetricsDecorator[T]) Execute(ctx context.Context, msg T) error {
	start := time.Now()
	err := m.flow.Execute(ctx, msg)

	if m.recorder != nil {
		m.recorder.RecordDuration("execution_time", time.Since(start))
		if err != nil {
			m.recorder.RecordError("execution_error")
		} else {
			m.recorder.RecordSuccess("execution_success")
		}
	}

	return err
}

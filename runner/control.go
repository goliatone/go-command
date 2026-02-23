package runner

import (
	"context"
	"errors"
	"sync"
)

// ExecutionControl provides cooperative execution control for handlers.
type ExecutionControl interface {
	WaitIfPaused(ctx context.Context) error
	Done() <-chan struct{}
	CancelCause() error
}

// ControlAwareCommander extends command execution with execution-control support.
type ControlAwareCommander[T any] interface {
	ExecuteWithControl(ctx context.Context, msg T, ctl ExecutionControl) error
}

type noopExecutionControl struct{}

func (noopExecutionControl) WaitIfPaused(ctx context.Context) error {
	return ctx.Err()
}

func (noopExecutionControl) Done() <-chan struct{} {
	return nil
}

func (noopExecutionControl) CancelCause() error {
	return nil
}

// ManualExecutionControl is a cooperative control implementation useful for orchestration and tests.
type ManualExecutionControl struct {
	mu sync.RWMutex

	paused   bool
	resumeCh chan struct{}
	doneCh   chan struct{}
	cause    error
}

// NewManualExecutionControl creates a control that can be paused/resumed/canceled manually.
func NewManualExecutionControl() *ManualExecutionControl {
	return &ManualExecutionControl{
		resumeCh: make(chan struct{}),
		doneCh:   make(chan struct{}),
	}
}

func (c *ManualExecutionControl) WaitIfPaused(ctx context.Context) error {
	if c == nil {
		return ctx.Err()
	}
	for {
		c.mu.RLock()
		paused := c.paused
		resume := c.resumeCh
		done := c.doneCh
		cause := c.cause
		c.mu.RUnlock()

		if !paused {
			select {
			case <-done:
				if cause != nil {
					return cause
				}
				return context.Canceled
			default:
				return ctx.Err()
			}
		}

		select {
		case <-ctx.Done():
			return ctx.Err()
		case <-done:
			if cause != nil {
				return cause
			}
			return context.Canceled
		case <-resume:
		}
	}
}

func (c *ManualExecutionControl) Done() <-chan struct{} {
	if c == nil {
		return nil
	}
	c.mu.RLock()
	defer c.mu.RUnlock()
	return c.doneCh
}

func (c *ManualExecutionControl) CancelCause() error {
	if c == nil {
		return nil
	}
	c.mu.RLock()
	defer c.mu.RUnlock()
	return c.cause
}

// Pause blocks future WaitIfPaused calls until Resume is called.
func (c *ManualExecutionControl) Pause() {
	if c == nil {
		return
	}
	c.mu.Lock()
	defer c.mu.Unlock()
	if c.paused {
		return
	}
	c.paused = true
	c.resumeCh = make(chan struct{})
}

// Resume unblocks waiters created by Pause.
func (c *ManualExecutionControl) Resume() {
	if c == nil {
		return
	}
	c.mu.Lock()
	defer c.mu.Unlock()
	if !c.paused {
		return
	}
	c.paused = false
	close(c.resumeCh)
}

// Cancel marks control as done and optionally records a cause.
func (c *ManualExecutionControl) Cancel(cause error) {
	if c == nil {
		return
	}
	c.mu.Lock()
	defer c.mu.Unlock()
	select {
	case <-c.doneCh:
		return
	default:
	}
	if cause == nil {
		cause = errors.New("execution canceled")
	}
	c.cause = cause
	c.paused = false
	close(c.resumeCh)
	close(c.doneCh)
}

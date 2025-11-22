package flow

import (
	"context"
	"fmt"
	"sync"
	"time"

	"github.com/goliatone/go-command"
)

var ErrCircuitOpen = fmt.Errorf("circuit open")

// CircuitBreaker implements the circuit breaker pattern
type CircuitBreaker[T command.Message] struct {
	mu sync.RWMutex

	flow Flow[T]

	failureThreshold int
	resetTimeout     time.Duration

	failures      int
	lastFailure   time.Time
	isOpen        bool
	halfOpenProbe Flow[T]
}

func NewCircuitBreaker[T command.Message](
	flow Flow[T],
	failureThreshold int,
	resetTimeout time.Duration,
	opts ...CircuitBreakerOption[T],
) *CircuitBreaker[T] {
	return &CircuitBreaker[T]{
		flow:             flow,
		failureThreshold: failureThreshold,
		resetTimeout:     resetTimeout,
		halfOpenProbe:    flow,
	}
}

// CircuitBreakerOption allows customizing breaker behavior.
type CircuitBreakerOption[T command.Message] func(*CircuitBreaker[T])

// WithHalfOpenProbe sets the flow executed when probing a half-open circuit.
func WithHalfOpenProbe[T command.Message](probe Flow[T]) CircuitBreakerOption[T] {
	return func(cb *CircuitBreaker[T]) {
		if probe != nil {
			cb.halfOpenProbe = probe
		}
	}
}

func (c *CircuitBreaker[T]) Execute(ctx context.Context, msg T) error {
	if !c.canExecute() {
		return ErrCircuitOpen
	}

	target := c.flow
	if c.isOpen {
		target = c.halfOpenProbe
	}

	err := target.Execute(ctx, msg)
	c.recordResult(err)
	return err
}

func (c *CircuitBreaker[T]) canExecute() bool {
	c.mu.RLock()
	defer c.mu.RUnlock()

	return !c.isOpen || time.Since(c.lastFailure) > c.resetTimeout
}

func (c *CircuitBreaker[T]) recordResult(err error) {
	if err == nil {
		c.mu.Lock()
		c.failures = 0
		c.isOpen = false
		c.mu.Unlock()
		return
	}

	c.mu.Lock()
	c.failures++
	if c.failures >= c.failureThreshold {
		c.isOpen = true
		c.lastFailure = time.Now()
	}
	c.mu.Unlock()
}

package runner

import (
	"math"
	"time"
)

// RetryStrategy encapsulates the decision and delay between retries.
type RetryStrategy interface {
	// SleepDuration returns how long to wait before the next retry attempt.
	// The attempt index starts at 0, incrementing after each failure.
	SleepDuration(attempt int, err error) time.Duration
}

// NoDelayStrategy is a simple retry strategy that performs all retries
// immediately without waiting.
type NoDelayStrategy struct{}

// SleepDuration always returns zero, causing immediate retries.
func (n NoDelayStrategy) SleepDuration(_ int, _ error) time.Duration {
	return 0
}

// ExponentialBackoffStrategy implements a backoff strategy.
// Usage example:
//
//	WithRetryStrategy(ExponentialBackoffStrategy{
//	    Base:   100 * time.Millisecond,
//	    Factor: 2,
//	    Max:    5 * time.Second,
//	})
type ExponentialBackoffStrategy struct {
	// Base is the starting delay (e.g., 100ms)
	Base time.Duration
	// Factor is multiplied each iteration (e.g., 2 => 100ms, 200ms, 400ms, ...)
	Factor float64
	// Max is the maximum delay allowed (caps the exponential growth)
	Max time.Duration
}

// SleepDuration implements an exponential backoff with a cap at Max.
func (e ExponentialBackoffStrategy) SleepDuration(attempt int, _ error) time.Duration {
	if attempt < 0 {
		attempt = 0
	}
	delay := float64(e.Base) * math.Pow(e.Factor, float64(attempt))
	if time.Duration(delay) > e.Max && e.Max > 0 {
		return e.Max
	}
	return time.Duration(delay)
}

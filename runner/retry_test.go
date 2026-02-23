package runner

import (
	"fmt"
	"testing"
	"time"
)

func TestDecideRetryUsesDeciderWhenAvailable(t *testing.T) {
	strategy := fixedDecisionStrategy{
		decision: RetryDecision{
			ShouldRetry: false,
			Delay:       25 * time.Millisecond,
			Metadata: map[string]any{
				"source": "test",
			},
		},
	}

	decision := DecideRetry(strategy, 1, fmt.Errorf("boom"))
	if decision.ShouldRetry {
		t.Fatal("expected strategy decision to disable retry")
	}
	if decision.Delay != 25*time.Millisecond {
		t.Fatalf("unexpected delay: %s", decision.Delay)
	}
	if decision.Metadata["source"] != "test" {
		t.Fatal("expected metadata propagation")
	}
}

func TestDecideRetryFallsBackToSleepDuration(t *testing.T) {
	strategy := ExponentialBackoffStrategy{
		Base:   10 * time.Millisecond,
		Factor: 2,
		Max:    100 * time.Millisecond,
	}
	decision := DecideRetry(strategy, 2, nil)
	if !decision.ShouldRetry {
		t.Fatal("expected fallback strategy to retry")
	}
	if decision.Delay != 40*time.Millisecond {
		t.Fatalf("unexpected fallback delay: %s", decision.Delay)
	}
}

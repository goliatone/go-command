package router_test

import (
	"testing"

	"github.com/goliatone/go-command/router"
)

func TestMakeRouteMatcher_MQTTStyle(t *testing.T) {
	mqttMatcher := router.MakeRouteMatcher(router.MakeRouteMatcherOptions{
		Separator:        "/",
		OnlyFinalSegment: true,
	})

	testCases := []struct {
		name    string
		pattern string
		topic   string
		want    bool
	}{
		{"Exact match", "a/b/c", "a/b/c", true},
		{"Exact mismatch", "a/b/c", "a/b/d", false},
		{"Exact match with empty segments", "a//c", "a//c", true},

		// single level wildcard "+"
		{"Single wildcard middle", "a/+/c", "a/b/c", true},
		{"Single wildcard start", "+/b/c", "a/b/c", true},
		{"Single wildcard end", "a/b/+", "a/b/c", true},
		{"Multiple single wildcards", "+/+/+", "a/b/c", true},
		{"Single wildcard no match", "a/+/c", "a/c", false},
		{"Single wildcard too many topic segments", "a/+/c", "a/b/c/d", false},
		{"Single wildcard too few topic segments", "a/+/c/d", "a/b/c", false},

		// single level wildcard "*" aliased to +
		{"Single wildcard (*) middle", "a/*/c", "a/b/c", true},
		{"Single wildcard (*) no match", "a/*/c", "a/c", false},

		// multi level wildcard #
		{"Multi wildcard matches everything", "#", "a/b/c", true},
		{"Multi wildcard at end", "a/#", "a/b/c", true},
		{"Multi wildcard matches parent", "a/b/#", "a/b", true},
		{"Multi wildcard matches one level", "a/#", "a/b", true},
		{"Multi wildcard matches zero levels", "a/#", "a", true},
		{"Multi wildcard must be at the end", "a/#/c", "a/b/c", false}, // nnvalid MQTT pattern
		{"Multi wildcard must be at the end 2", "a/#/c", "a/c", false},
		{"Topic longer than multi wildcard", "a/b", "a/b/#", false},

		{"Empty pattern and topic", "", "", true},
		{"Empty topic", "a/b", "", false},
		{"Empty pattern", "", "a/b", false},
		{"Pattern is just wildcard", "#", "a/b/c", true},
		{"Pattern is just single wildcard", "+", "a", true},
		{"Pattern is just single wildcard no match", "+", "a/b", false},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			got := mqttMatcher(tc.pattern, tc.topic)
			if got != tc.want {
				t.Errorf("mqttMatcher(pattern: %q, topic: %q) = %v; want %v", tc.pattern, tc.topic, got, tc.want)
			}
		})
	}
}

func TestMakeRouteMatcher_AMQPStyle(t *testing.T) {
	amqpMatcher := router.MakeRouteMatcher(router.MakeRouteMatcherOptions{
		Separator: ".",
	})

	testCases := []struct {
		name    string
		pattern string
		topic   string
		want    bool
	}{
		{"Exact match", "a.b.c", "a.b.c", true},
		{"Exact mismatch", "a.b.c", "a.b.d", false},

		// single level wildcard "*"
		{"Single wildcard (*) middle", "a.*.c", "a.b.c", true},
		{"Single wildcard (*) does not match zero", "a.*.c", "a.c", false},
		{"Single wildcard (*) does not match multiple", "a.*.c", "a.b.d.c", false},
		{"Single wildcard start", "*.b.c", "a.b.c", true},
		{"Single wildcard end", "a.b.*", "a.b.c", true},

		// single level wildcard "+" aliased to *
		{"Single wildcard (+) middle", "a.+.c", "a.b.c", true},

		// multi level wildcard #
		{"Multi wildcard matches everything", "#", "a.b.c", true},
		{"Multi wildcard at end", "a.#", "a.b.c", true},
		{"Multi wildcard matches parent", "a.b.#", "a.b", true},
		{"Multi wildcard matches zero levels at end", "a.#", "a", true},

		// AMQP: # can be anywhere
		{"Multi wildcard middle", "a.#.c", "a.b.c", true},
		{"Multi wildcard middle multiple segments", "a.#.d", "a.b.c.d", true},
		{"Multi wildcard middle mismatch", "a.#.d", "a.b.c.e", false},
		{"Multi wildcard start", "#.c", "a.b.c", true},
		{"Multi wildcard start single segment", "#.c", "a.c", true},

		// AMQP: # can match zero segments
		{"Multi wildcard middle zero segments", "a.#.c", "a.c", true},
		{"Multi wildcard start zero segments", "#.c", "c", true},

		{"Complex combo 1", "a.*.#.d", "a.b.c.d", true},
		{"Complex combo 2", "a.*.#.d", "a.b.d", true},
		{"Complex combo 3", "a.*.#.d", "a.z.x.y.d", true},
		{"Complex combo mismatch", "a.*.#.d", "a.z.x.y.e", false},
		{"Complex start with star", "*.#", "a.b.c", true},
		{"Complex start with star 2", "*.#", "a", true},

		{"Empty pattern and topic", "", "", true},
		{"Empty topic", "a.b", "", false},
		{"Empty pattern", "", "a.b", false},
		{"Topic with leading dot", "a.#", ".a.b", false},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			got := amqpMatcher(tc.pattern, tc.topic)
			if got != tc.want {
				t.Errorf("amqpMatcher(pattern: %q, topic: %q) = %v; want %v", tc.pattern, tc.topic, got, tc.want)
			}
		})
	}
}

func TestMux_WithCustomMatcher(t *testing.T) {
	// Create a new Mux configured with the AMQP style matcher
	mux := router.NewMux(router.WithMatcher(router.MakeRouteMatcher(
		router.MakeRouteMatcherOptions{
			Separator:        ".",
			OnlyFinalSegment: false,
		},
	)))

	handlerFunc := func() {}
	mux.Add("orders.*.processed", handlerFunc)
	mux.Add("alerts.#.critical", handlerFunc)
	mux.Add("logs.local", handlerFunc)

	entries := mux.Get("orders.123.processed")
	if len(entries) != 1 {
		t.Fatalf("Expected 1 handler for 'orders.123.processed', got %d", len(entries))
	}
	if entries[0].Pattern() != "orders.*.processed" {
		t.Errorf("Expected pattern 'orders.*.processed', got %q", entries[0].Pattern())
	}

	entries = mux.Get("alerts.payment.gateway.critical")
	if len(entries) != 1 {
		t.Fatalf("Expected 1 handler for 'alerts.payment.gateway.critical', got %d", len(entries))
	}

	entries = mux.Get("alerts.critical")
	if len(entries) != 1 {
		t.Fatalf("Expected 1 handler for 'alerts.critical', got %d", len(entries))
	}

	entries = mux.Get("orders.123.failed")
	if len(entries) != 0 {
		t.Fatalf("Expected 0 handlers for 'orders.123.failed', got %d", len(entries))
	}

	entries = mux.Get("logs.local")
	if len(entries) != 1 {
		t.Fatalf("Expected 1 handler for 'logs.local', got %d", len(entries))
	}
}

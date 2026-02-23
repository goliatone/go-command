package router

import (
	"strings"
	"sync"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestMux_AddAndMatchExact(t *testing.T) {
	mux := NewMux()

	handler1 := "handler1"
	handler2 := "handler2"
	mux.Add("/users/:id", handler1)
	mux.Add("/users", handler2)

	matched := mux.Get("/users/:id")
	assert.Len(t, matched, 1)
	assert.Equal(t, handler1, matched[0].Handler)

	matched = mux.Get("/users")
	assert.Len(t, matched, 1)
	assert.Equal(t, handler2, matched[0].Handler)

	matched = mux.Get("/nonexistent")
	assert.Len(t, matched, 0)
}

func TestMux_AddAndMatchPrefix(t *testing.T) {
	mux := NewMux()

	handler1 := "handler1"
	handler2 := "handler2"
	mux.Add("/users", handler1)
	mux.Add("/users/profile", handler2)

	matched := mux.Get("/users/profile")
	assert.Len(t, matched, 1)
	assert.Equal(t, handler2, matched[0].Handler)

	matched = mux.Get("/users/unknown")
	assert.Len(t, matched, 0)
}

func TestMux_Unsubscribe(t *testing.T) {
	mux := NewMux()

	handler1 := "handler1"
	handler2 := "handler2"
	handler3 := "handler3"
	handler4 := "handler4"

	mux.Add("/users/:id", handler1)
	entry2 := mux.Add("/users/:id", handler2)
	mux.Add("/users/:id", handler3)
	mux.Add("/users/:id", handler4)

	matched := mux.Get("/users/:id")
	assert.Len(t, matched, 4)

	entry2.Unsubscribe()

	matched = mux.Get("/users/:id")
	assert.Len(t, matched, 3)
	assert.Equal(t, handler1, matched[0].Handler)
}

func TestMux_WithCustomMatcher(t *testing.T) {
	customMatcher := func(route, path string) bool {
		return strings.HasPrefix(route, path)
	}

	mux := NewMux(WithRouteMatcher(customMatcher))

	handler := "handler"
	mux.Add("/custom/path", handler)

	matched := mux.Get("/custom")
	assert.Len(t, matched, 1)
	assert.Equal(t, handler, matched[0].Handler)

	matched = mux.Get("/different")
	assert.Len(t, matched, 0)
}

func TestMux_ConcurrentAccess(t *testing.T) {
	mux := NewMux()
	handler := "handler"

	var wg sync.WaitGroup

	for range 100 {
		wg.Add(1)
		go func() {
			defer wg.Done()
			mux.Add("/route/:id", handler)
		}()
	}

	wg.Wait()

	matched := mux.Get("/route/:id")
	assert.Len(t, matched, 100)
	assert.Equal(t, handler, matched[0].Handler)
}

func TestMux_GetAllMatches(t *testing.T) {
	mux := NewMux(WithMatcher(func(pattern, topic string) bool {
		return strings.HasPrefix(topic, pattern)
	}))

	h1 := "h1"
	h2 := "h2"
	h3 := "h3"
	mux.Add("orders", h1)
	mux.Add("orders.created", h2)
	mux.Add("orders.created.eu", h3)

	matched := mux.GetAllMatches("orders.created.eu")
	assert.Len(t, matched, 3)
	assert.Equal(t, "orders.created.eu", matched[0].Pattern())
	assert.Equal(t, "orders", matched[1].Pattern())
	assert.Equal(t, "orders.created", matched[2].Pattern())
}

func TestMux_GetWithMatchStrategyAll(t *testing.T) {
	mux := NewMux(
		WithMatcher(func(pattern, topic string) bool { return strings.HasPrefix(topic, pattern) }),
		WithMatchStrategy(MatchStrategyAll),
	)

	mux.Add("orders", "h1")
	mux.Add("orders.created", "h2")

	matched := mux.Get("orders.created")
	assert.Len(t, matched, 2)
	assert.Equal(t, "orders.created", matched[0].Pattern())
	assert.Equal(t, "orders", matched[1].Pattern())
}

func TestMux_GetWithMatchStrategySpecificity(t *testing.T) {
	mux := NewMux(
		WithMatcher(MakeRouteMatcher(MakeRouteMatcherOptions{
			Separator: ".",
		})),
		WithMatchStrategy(MatchStrategySpecificity),
	)

	mux.Add("orders.#", "broad")
	mux.Add("orders.*.created", "specific")
	mux.Add("orders.us.created", "exact")

	matched := mux.Get("orders.us.created")
	assert.Len(t, matched, 3)
	assert.Equal(t, "orders.us.created", matched[0].Pattern())
	assert.Equal(t, "orders.*.created", matched[1].Pattern())
	assert.Equal(t, "orders.#", matched[2].Pattern())
}

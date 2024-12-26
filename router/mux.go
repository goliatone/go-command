package router

import (
	"sort"
	"strings"
	"sync"
)

type Subscription interface {
	Unsubscribe()
}

type Mux struct {
	mu         sync.RWMutex
	sorted     []string
	handlers   map[string][]Entry
	routeMatch func(etype, pattern string) bool
}

type Entry struct {
	hmap    *Mux
	pattern string
	Handler any
}

func (i *Entry) Unsubscribe() {
	h := i.hmap
	h.mu.Lock()
	defer h.mu.Unlock()

	hs := h.handlers[i.pattern]
	ns := make([]Entry, 0, len(hs))

	for _, x := range hs {
		if x != i.Handler {
			ns = append(ns, x)
		}
	}
	h.handlers[i.pattern] = hs
}

type Option func(m *Mux)

func WithRouteMatcher(matcher func(t, p string) bool) Option {
	return func(m *Mux) {
		m.routeMatch = matcher
	}
}

func NewMux(opts ...Option) *Mux {
	m := &Mux{
		handlers:   make(map[string][]Entry),
		routeMatch: strings.HasPrefix,
	}

	return m
}

func (m *Mux) Add(pattern string, handler any) *Entry {
	m.mu.Lock()
	defer m.mu.Unlock()

	if m.handlers == nil {
		m.handlers = make(map[string][]Entry)
	}

	e := Entry{
		hmap:    m,
		pattern: pattern,
		Handler: handler,
	}

	m.handlers[pattern] = append(m.handlers[pattern], e)

	keys := make([]string, 0, len(m.handlers))
	for k := range m.handlers {
		keys = append(keys, k)
	}
	sort.Strings(keys)
	m.sorted = keys

	return &e
}

func (m *Mux) Get(etype string) []Entry {
	m.mu.RLock()
	defer m.mu.RUnlock()
	return m.match(etype)
}

func (m *Mux) match(pattern string) []Entry {
	if o, ok := m.handlers[pattern]; ok {
		return o
	}

	for _, p := range m.sorted {
		if m.routeMatch(p, pattern) {
			return m.handlers[p]
		}
	}

	return nil
}

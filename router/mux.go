package router

import (
	"fmt"
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
	entryComp  func(a, b any) bool
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

	old := h.handlers[i.pattern]
	new := make([]Entry, 0, len(old))

	for _, x := range old {
		if !i.hmap.entryComp(x.Handler, i.Handler) {
			fmt.Printf("other '%s' remove '%s'\n", x.Handler, i.Handler)
			new = append(new, x)
		}
	}
	h.handlers[i.pattern] = new
}

func NewMux(opts ...Option) *Mux {
	m := &Mux{
		handlers:   make(map[string][]Entry),
		routeMatch: strings.HasPrefix,
		entryComp:  compareHandlers,
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

func compareHandlers(a, b any) bool {
	if a == nil && b == nil {
		return true
	}

	if a == nil || b == nil {
		return false
	}
	// could use reflect.DeepEqual
	return a == b
}

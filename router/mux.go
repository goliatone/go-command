package router

import (
	"sort"
	"strings"
	"sync"
)

// MatchStrategy controls how route matches are returned.
type MatchStrategy int

const (
	// MatchStrategyFirst returns the first matching pattern.
	MatchStrategyFirst MatchStrategy = iota
	// MatchStrategyAll returns all matching patterns in deterministic order.
	MatchStrategyAll
	// MatchStrategySpecificity returns all matches ordered by specificity.
	MatchStrategySpecificity
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
	strategy   MatchStrategy
}

type Entry struct {
	hmap    *Mux
	pattern string
	Handler any
}

func (i *Entry) Pattern() string {
	return i.pattern
}

func (i *Entry) Unsubscribe() {
	h := i.hmap
	h.mu.Lock()
	defer h.mu.Unlock()

	old := h.handlers[i.pattern]
	new := make([]Entry, 0, len(old))

	for _, x := range old {
		if !i.hmap.entryComp(x.Handler, i.Handler) {
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
		strategy:   MatchStrategyFirst,
	}

	for _, opt := range opts {
		opt(m)
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
	return m.match(etype, m.strategy)
}

// GetAllMatches returns all matching handlers regardless of configured strategy.
func (m *Mux) GetAllMatches(etype string) []Entry {
	m.mu.RLock()
	defer m.mu.RUnlock()
	return m.match(etype, MatchStrategyAll)
}

func (m *Mux) match(pattern string, strategy MatchStrategy) []Entry {
	matches := make([]patternMatch, 0, len(m.handlers))
	if exact, ok := m.handlers[pattern]; ok {
		matches = append(matches, patternMatch{
			pattern: pattern,
			entries: cloneEntries(exact),
		})
	}

	for _, p := range m.sorted {
		if p == pattern {
			continue
		}
		if m.routeMatch(p, pattern) {
			matches = append(matches, patternMatch{
				pattern: p,
				entries: cloneEntries(m.handlers[p]),
			})
		}
	}

	if len(matches) == 0 {
		return nil
	}

	switch strategy {
	case MatchStrategySpecificity:
		sort.SliceStable(matches, func(i, j int) bool {
			si := patternSpecificity(matches[i].pattern)
			sj := patternSpecificity(matches[j].pattern)
			if si == sj {
				return matches[i].pattern < matches[j].pattern
			}
			return si > sj
		})
		return flattenMatches(matches)
	case MatchStrategyAll:
		return flattenMatches(matches)
	default:
		return cloneEntries(matches[0].entries)
	}
}

type patternMatch struct {
	pattern string
	entries []Entry
}

func flattenMatches(matches []patternMatch) []Entry {
	out := make([]Entry, 0)
	for _, match := range matches {
		out = append(out, match.entries...)
	}
	return out
}

func cloneEntries(entries []Entry) []Entry {
	if len(entries) == 0 {
		return nil
	}
	out := make([]Entry, len(entries))
	copy(out, entries)
	return out
}

func patternSpecificity(pattern string) int {
	if pattern == "" {
		return 0
	}
	segments := strings.FieldsFunc(pattern, func(r rune) bool {
		return r == '/' || r == '.'
	})
	score := 0
	for _, segment := range segments {
		switch segment {
		case "#":
			score += 0
		case "*", "+":
			score += 1
		default:
			score += 3 + len(segment)
		}
	}
	if strings.Contains(pattern, "#") {
		score -= 1
	}
	return score
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

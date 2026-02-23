package router

type Option func(m *Mux)

func WithRouteMatcher(matcher func(t, p string) bool) Option {
	return func(m *Mux) {
		m.routeMatch = matcher
	}
}

func WithEntryComparator(comp func(a, b any) bool) Option {
	return func(m *Mux) {
		m.entryComp = comp
	}
}

func WithMatcher(matcher func(pattern, topic string) bool) Option {
	return func(m *Mux) {
		m.routeMatch = matcher
	}
}

func WithMatchStrategy(strategy MatchStrategy) Option {
	return func(m *Mux) {
		m.strategy = strategy
	}
}

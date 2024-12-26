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

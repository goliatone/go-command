package flow

import "fmt"

// MetricsRecorderRegistry stores named metrics recorders.
type MetricsRecorderRegistry struct {
	recorders  map[string]MetricsRecorder
	namespacer func(string, string) string
}

// NewMetricsRecorderRegistry constructs an empty registry.
func NewMetricsRecorderRegistry() *MetricsRecorderRegistry {
	return &MetricsRecorderRegistry{
		recorders:  make(map[string]MetricsRecorder),
		namespacer: defaultNamespace,
	}
}

// SetNamespacer customizes namespacing.
func (r *MetricsRecorderRegistry) SetNamespacer(fn func(string, string) string) {
	if fn != nil {
		r.namespacer = fn
	}
}

// Register stores a recorder by name.
func (r *MetricsRecorderRegistry) Register(name string, mr MetricsRecorder) error {
	return r.RegisterNamespaced("", name, mr)
}

// RegisterNamespaced stores a recorder by namespace+name.
func (r *MetricsRecorderRegistry) RegisterNamespaced(namespace, name string, mr MetricsRecorder) error {
	if name == "" || mr == nil {
		return nil
	}
	if r.recorders == nil {
		r.recorders = make(map[string]MetricsRecorder)
	}
	key := name
	if r.namespacer != nil {
		key = r.namespacer(namespace, name)
	}
	if _, exists := r.recorders[key]; exists {
		return fmt.Errorf("metrics recorder %s already registered", key)
	}
	r.recorders[key] = mr
	return nil
}

// Lookup retrieves a recorder by name.
func (r *MetricsRecorderRegistry) Lookup(name string) (MetricsRecorder, bool) {
	if r == nil {
		return nil, false
	}
	m, ok := r.recorders[name]
	return m, ok
}

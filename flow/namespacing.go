package flow

import "strings"

// defaultNamespace concatenates namespace and id using ::, trimming whitespace.
func defaultNamespace(namespace, id string) string {
	ns := strings.TrimSpace(namespace)
	ident := strings.TrimSpace(id)
	if ns == "" {
		return ident
	}
	return ns + "::" + ident
}

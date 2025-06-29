package command

import (
	"context"
	"reflect"
	"regexp"
	"strings"
	"time"
)

// CommandFunc is an adapter that lets you use a function as a CommandHandler[T]
type CommandFunc[T any] func(ctx context.Context, msg T) error

// Execute calls the underlying function
func (f CommandFunc[T]) Execute(ctx context.Context, msg T) error {
	return f(ctx, msg)
}

// Commander is responsible for executing side effects
type Commander[T any] interface {
	Execute(ctx context.Context, msg T) error
}

// QueryFunc is an adapter that lets you use a function as a QueryHandler[T, R]
type QueryFunc[T any, R any] func(ctx context.Context, msg T) (R, error)

// Query calls the underlying function
func (f QueryFunc[T, R]) Query(ctx context.Context, msg T) (R, error) {
	return f(ctx, msg)
}

// Querier is responsible for returning data, with no side effects
type Querier[T any, R any] interface {
	Query(ctx context.Context, msg T) (R, error)
}

type HandlerConfig struct {
	Timeout    time.Duration `json:"timeout"`
	Deadline   time.Time     `json:"deadline"`
	MaxRetries int           `json:"max_retries"`
	MaxRuns    int           `json:"max_runs"`
	RunOnce    bool          `json:"run_once"`
	Expression string        `json:"expression"`
	NoTimeout  bool          `json:"no_timeout"`
}

func GetMessageType(msg any) string {
	if msg == nil {
		return "unknown_type"
	}

	v := reflect.ValueOf(msg)
	if v.Kind() == reflect.Ptr && v.IsNil() {
		return "unknown_type"
	}

	// if msg implements Type() then we use that:
	if msgTyper, ok := msg.(interface{ Type() string }); ok {
		return msgTyper.Type()
	}

	t := reflect.TypeOf(msg)
	if t == nil {
		return "unknown_type"
	}

	typeName := t.String()

	if t.Kind() == reflect.Ptr {
		typeName = typeName[1:] // remove the "*" prefix
		t = t.Elem()            // get the type that the pointer points to
	}

	pkgPath := t.PkgPath()
	if pkgPath != "" {
		parts := strings.Split(pkgPath, "/")
		pkgPath = parts[len(parts)-1]
	}

	txName := toSnakeCase(typeName)

	if pkgPath == "" {
		return txName
	}
	return pkgPath + "::" + txName
}

func toSnakeCase(s string) string {
	//TODO: use tocase package
	snake := regexp.MustCompile("([a-z0-9])([A-Z])").ReplaceAllString(s, "${1}_${2}")
	return strings.ToLower(snake)
}

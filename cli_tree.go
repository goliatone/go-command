package command

import (
	"fmt"
	"reflect"
	"sort"
	"strings"
	"unicode"

	"github.com/alecthomas/kong"
	"github.com/goliatone/go-errors"
)

type cliNode struct {
	name     string
	help     string
	group    string
	aliases  []string
	hidden   bool
	handler  any
	children map[string]*cliNode
}

func newCLINode(name string) *cliNode {
	return &cliNode{
		name:     name,
		children: make(map[string]*cliNode),
	}
}

func (n *cliNode) insert(path []string, opts CLIConfig, handler any) error {
	if len(path) == 0 {
		return errors.New("cli path cannot be empty", errors.CategoryBadInput).
			WithTextCode("CLI_PATH_EMPTY")
	}

	curr := n
	for idx, segment := range path {
		child, ok := curr.children[segment]
		if !ok {
			child = newCLINode(segment)
			curr.children[segment] = child
		}

		if idx == len(path)-1 {
			if child.handler != nil {
				return errors.New("cli command already registered for path", errors.CategoryConflict).
					WithTextCode("CLI_PATH_CONFLICT").
					WithMetadata(map[string]any{"path": strings.Join(path, " ")})
			}
			child.handler = handler
			child.help = opts.Description
			child.aliases = opts.Aliases
			child.hidden = opts.Hidden
			child.group = opts.Group
			return nil
		}

		if desc := opts.groupDescription(segment, idx); desc != "" && child.help == "" {
			child.help = desc
		}
		curr = child
	}
	return nil
}

func (opts CLIConfig) groupDescription(name string, idx int) string {
	for _, g := range opts.Groups {
		if g.Name == "" && idx < len(opts.Groups) {
			if opts.Groups[idx].Description != "" {
				return opts.Groups[idx].Description
			}
		}
		if strings.EqualFold(g.Name, name) {
			return g.Description
		}
	}
	// Legacy single-group description support.
	if idx == 0 && opts.Group != "" {
		return opts.Group
	}
	return ""
}

func (opts CLIConfig) normalizedPath() []string {
	if len(opts.Path) == 0 {
		return nil
	}
	return append([]string{}, opts.Path...)
}

func (n *cliNode) buildKongModel() (any, error) {
	if len(n.children) == 0 {
		return nil, nil
	}

	rootVal, err := buildStructForNode(n)
	if err != nil {
		return nil, err
	}
	return rootVal.Addr().Interface(), nil
}

func buildStructForNode(node *cliNode) (reflect.Value, error) {
	childNames := make([]string, 0, len(node.children))
	for name := range node.children {
		childNames = append(childNames, name)
	}
	sort.Strings(childNames)

	fields := make([]reflect.StructField, 0, len(childNames))
	values := make([]reflect.Value, 0, len(childNames))
	usedNames := make(map[string]struct{})

	for _, name := range childNames {
		child := node.children[name]

		fieldName := exportFieldName(name)
		if _, exists := usedNames[fieldName]; exists {
			return reflect.Value{}, fmt.Errorf("duplicate CLI command field name after normalization: %s", fieldName)
		}
		usedNames[fieldName] = struct{}{}

		var fieldType reflect.Type
		var fieldValue reflect.Value

		if len(child.children) == 0 {
			if child.handler == nil {
				return reflect.Value{}, fmt.Errorf("cli command %q missing handler", child.name)
			}
			fieldType = reflect.TypeOf(child.handler)
			fieldValue = reflect.ValueOf(child.handler)
		} else {
			val, err := buildStructForNode(child)
			if err != nil {
				return reflect.Value{}, err
			}
			fieldType = val.Type()
			fieldValue = val
		}

		fields = append(fields, reflect.StructField{
			Name: fieldName,
			Type: fieldType,
			Tag:  buildStructTag(child),
		})
		values = append(values, fieldValue)
	}

	structType := reflect.StructOf(fields)
	structVal := reflect.New(structType).Elem()
	for idx, val := range values {
		if !val.IsValid() {
			continue
		}
		field := structVal.Field(idx)
		if val.Type().AssignableTo(field.Type()) {
			field.Set(val)
		} else if val.Type().ConvertibleTo(field.Type()) {
			field.Set(val.Convert(field.Type()))
		}
	}

	return structVal, nil
}

func buildStructTag(node *cliNode) reflect.StructTag {
	tags := []string{
		fmt.Sprintf(`name:"%s"`, escapeTag(node.name)),
		`cmd:""`,
	}
	if node.help != "" {
		tags = append(tags, fmt.Sprintf(`help:"%s"`, escapeTag(node.help)))
	}
	if node.group != "" {
		tags = append(tags, fmt.Sprintf(`group:"%s"`, escapeTag(node.group)))
	}
	if len(node.aliases) > 0 {
		tags = append(tags, fmt.Sprintf(`aliases:"%s"`, escapeTag(strings.Join(node.aliases, ","))))
	}
	if node.hidden {
		tags = append(tags, `hidden:""`)
	}

	return reflect.StructTag(strings.Join(tags, " "))
}

func exportFieldName(name string) string {
	var parts []string
	for _, part := range strings.FieldsFunc(name, func(r rune) bool {
		return !unicode.IsLetter(r) && !unicode.IsDigit(r)
	}) {
		if part == "" {
			continue
		}
		parts = append(parts, strings.Title(part))
	}
	out := strings.Join(parts, "")
	if out == "" {
		out = "Cmd"
	}
	if first := rune(out[0]); !unicode.IsLetter(first) {
		out = "Cmd" + out
	}
	return out
}

func escapeTag(val string) string {
	val = strings.ReplaceAll(val, `\`, `\\`)
	val = strings.ReplaceAll(val, `"`, `\"`)
	return val
}

func buildCLIOptions(root *cliNode) ([]kong.Option, error) {
	model, err := root.buildKongModel()
	if err != nil {
		return nil, err
	}
	if model == nil {
		return nil, nil
	}
	return []kong.Option{kong.Embed(model)}, nil
}

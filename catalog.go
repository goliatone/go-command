package command

import (
	"context"
	"reflect"
	"sort"
	"strings"
)

// CommandDescriptor is the reusable command catalog contract. It describes an
// intentionally exposed command without importing an admin UI or transport.
type CommandDescriptor struct {
	ID             string                     `json:"id"`
	MessageType    string                     `json:"message_type,omitempty"`
	Label          string                     `json:"label,omitempty"`
	Summary        string                     `json:"summary,omitempty"`
	Description    string                     `json:"description,omitempty"`
	Domain         string                     `json:"domain,omitempty"`
	Group          string                     `json:"group,omitempty"`
	Tags           []string                   `json:"tags,omitempty"`
	ExposeInAdmin  bool                       `json:"expose_in_admin,omitempty"`
	Mutating       bool                       `json:"mutating,omitempty"`
	ExecutionMode  ExecutionMode              `json:"execution_mode,omitempty"`
	Permissions    []string                   `json:"permissions,omitempty"`
	Roles          []string                   `json:"roles,omitempty"`
	Exposure       CommandExposure            `json:"exposure,omitempty"`
	RPC            RPCConfig                  `json:"rpc,omitempty"`
	Input          CommandInputSchema         `json:"input,omitempty"`
	Result         CommandResultDescriptor    `json:"result,omitempty"`
	Progress       *CommandProgressDescriptor `json:"progress,omitempty"`
	DisplayHints   map[string]any             `json:"display_hints,omitempty"`
	RedactionHints []string                   `json:"redaction_hints,omitempty"`
}

// CommandInputSchema is a renderer-neutral, JSON Schema/OpenAPI-compatible
// payload description. Consumers can translate it to go-formgen or another UI.
type CommandInputSchema struct {
	Type       string              `json:"type,omitempty"`
	Fields     []CommandInputField `json:"fields,omitempty"`
	Required   []string            `json:"required,omitempty"`
	JSONSchema map[string]any      `json:"json_schema,omitempty"`
	Extensions map[string]any      `json:"extensions,omitempty"`
	NoInput    bool                `json:"no_input,omitempty"`
}

// CommandInputField describes one stable payload target.
type CommandInputField struct {
	ID            string                  `json:"id,omitempty"`
	Name          string                  `json:"name,omitempty"`
	Path          string                  `json:"path"`
	Label         string                  `json:"label,omitempty"`
	Kind          string                  `json:"kind,omitempty"`
	Type          string                  `json:"type,omitempty"`
	Format        string                  `json:"format,omitempty"`
	Required      bool                    `json:"required,omitempty"`
	Default       any                     `json:"default,omitempty"`
	Placeholder   string                  `json:"placeholder,omitempty"`
	Description   string                  `json:"description,omitempty"`
	Help          string                  `json:"help,omitempty"`
	Sensitive     bool                    `json:"sensitive,omitempty"`
	StaticOptions []CommandOption         `json:"static_options,omitempty"`
	OptionSource  *CommandOptionSourceRef `json:"option_source,omitempty"`
	Validation    map[string]any          `json:"validation,omitempty"`
	DisplayHints  map[string]any          `json:"display_hints,omitempty"`
}

// CommandOption is a safe static option value.
type CommandOption struct {
	Value       string         `json:"value"`
	Label       string         `json:"label,omitempty"`
	Description string         `json:"description,omitempty"`
	Disabled    bool           `json:"disabled,omitempty"`
	Metadata    map[string]any `json:"metadata,omitempty"`
}

// CommandOptionSourceRef references request-scoped dynamic options without
// serializing the option values in the descriptor.
type CommandOptionSourceRef struct {
	ID            string         `json:"id"`
	Label         string         `json:"label,omitempty"`
	Dynamic       bool           `json:"dynamic,omitempty"`
	CacheScope    string         `json:"cache_scope,omitempty"`
	RedactionHint string         `json:"redaction_hint,omitempty"`
	Params        map[string]any `json:"params,omitempty"`
}

// CommandOptionRequest identifies one request-scoped option lookup. Consumers
// authorize discovery before invoking a provider.
type CommandOptionRequest struct {
	CommandID string                 `json:"command_id"`
	FieldID   string                 `json:"field_id,omitempty"`
	FieldName string                 `json:"field_name,omitempty"`
	FieldPath string                 `json:"field_path,omitempty"`
	Source    CommandOptionSourceRef `json:"source"`
	Payload   map[string]any         `json:"payload,omitempty"`
}

// CommandOptionProvider resolves request-scoped option values without coupling
// go-command descriptors to an admin UI or transport.
type CommandOptionProvider interface {
	CommandOptions(context.Context, CommandOptionRequest) ([]CommandOption, error)
}

// CommandResultDescriptor declares the safe result/receipt expectations.
type CommandResultDescriptor struct {
	Inline          bool           `json:"inline,omitempty"`
	Queued          bool           `json:"queued,omitempty"`
	StatusReference string         `json:"status_reference,omitempty"`
	ReceiptExpected bool           `json:"receipt_expected,omitempty"`
	ResultSchema    map[string]any `json:"result_schema,omitempty"`
	RedactionHints  []string       `json:"redaction_hints,omitempty"`
	DisplayHints    map[string]any `json:"display_hints,omitempty"`
}

// CatalogDescriber lets a command provide its own descriptor.
type CatalogDescriber interface {
	CommandDescriptor() CommandDescriptor
}

// CatalogProvider lets hosts provide descriptors externally.
type CatalogProvider interface {
	CommandDescriptors() []CommandDescriptor
}

// CommandInputSchemaProvider lets a command provide late-bound schema metadata
// without coupling to a renderer.
type CommandInputSchemaProvider interface {
	CommandInputSchema() CommandInputSchema
}

// DescriptorForCommand returns the merged descriptor for an exposed command.
func DescriptorForCommand(cmd any, meta CommandMeta) (CommandDescriptor, bool) {
	if cmd == nil {
		return CommandDescriptor{}, false
	}

	explicit := CommandDescriptor{}
	hasExplicit := false
	if describer, ok := cmd.(CatalogDescriber); ok {
		explicit = describer.CommandDescriptor()
		hasExplicit = true
	}

	exposure, hasExposure := ExposureOf(cmd)
	if !hasExplicit && (!hasExposure || !exposure.ExposeInAdmin) {
		return CommandDescriptor{}, false
	}

	rpcConfig := RPCConfig{}
	if rpcCmd, ok := cmd.(RPCCommand); ok {
		rpcConfig = rpcCmd.RPCOptions()
		if describer, ok := rpcCmd.(RPCDescriber); ok {
			rpcConfig = mergeRPCDescription(rpcConfig, describer.RPCDescription())
		}
	}

	descriptor := MergeCommandDescriptor(meta, exposure, rpcConfig, explicit)
	if provider, ok := cmd.(CommandInputSchemaProvider); ok && len(descriptor.Input.Fields) == 0 && len(descriptor.Input.JSONSchema) == 0 && !descriptor.Input.NoInput {
		descriptor.Input = provider.CommandInputSchema()
	}
	if provider, ok := cmd.(CommandProgressDescriber); ok && descriptor.Progress == nil {
		progress := provider.CommandProgressDescriptor()
		descriptor.Progress = cloneCommandProgressDescriptorPtr(&progress)
	}
	if !descriptor.ExposeInAdmin && !descriptor.Exposure.ExposeInAdmin {
		return CommandDescriptor{}, false
	}
	if descriptor.ID == "" {
		return CommandDescriptor{}, false
	}
	return descriptor, true
}

// MergeCommandDescriptor composes message, exposure, RPC, and explicit
// descriptor metadata. Explicit descriptor fields take precedence.
func MergeCommandDescriptor(meta CommandMeta, exposure CommandExposure, rpcConfig RPCConfig, explicit CommandDescriptor) CommandDescriptor {
	out := explicit
	if out.ID == "" {
		out.ID = firstCatalogString(explicit.MessageType, meta.MessageType, rpcConfig.Method)
	}
	if out.MessageType == "" {
		out.MessageType = meta.MessageType
	}
	if out.Summary == "" {
		out.Summary = rpcConfig.Summary
	}
	if out.Description == "" {
		out.Description = rpcConfig.Description
	}
	out.Tags = append(append(cloneCatalogStrings(out.Tags), rpcConfig.Tags...), exposure.Tags...)
	out.Permissions = append(append(cloneCatalogStrings(out.Permissions), rpcConfig.Permissions...), exposure.Permissions...)
	out.Roles = append(append(cloneCatalogStrings(out.Roles), rpcConfig.Roles...), exposure.Roles...)
	if commandExposureIsZero(out.Exposure) {
		out.Exposure = exposure
	}
	if rpcConfigIsZero(out.RPC) {
		out.RPC = rpcConfig
	}
	if !out.ExposeInAdmin {
		out.ExposeInAdmin = explicit.ExposeInAdmin || exposure.ExposeInAdmin
	}
	if !out.Mutating {
		out.Mutating = explicit.Mutating || exposure.Mutates
	}
	if out.ExecutionMode == "" {
		out.ExecutionMode = ExecutionModeInline
	}
	out.Progress = cloneCommandProgressDescriptorPtr(out.Progress)
	out.Tags = uniqueCatalogStrings(out.Tags)
	out.Permissions = uniqueCatalogStrings(out.Permissions)
	out.Roles = uniqueCatalogStrings(out.Roles)
	out.RedactionHints = uniqueCatalogStrings(out.RedactionHints)
	out.Input.Required = uniqueCatalogStrings(out.Input.Required)
	return out
}

// CommandInputSchemaFromMessage derives a minimal payload schema from exported
// struct fields. Sensitive fields marked with catalog:"sensitive" or
// command:"sensitive" are intentionally skipped.
func CommandInputSchemaFromMessage(msg any) CommandInputSchema {
	t := reflect.TypeOf(msg)
	if t == nil {
		return CommandInputSchema{Type: "object", NoInput: true}
	}
	if t.Kind() == reflect.Pointer {
		t = t.Elem()
	}
	if t.Kind() != reflect.Struct {
		return CommandInputSchema{Type: "object", NoInput: true}
	}

	schema := CommandInputSchema{Type: "object"}
	properties := map[string]any{}
	for i := 0; i < t.NumField(); i++ {
		field := t.Field(i)
		if field.PkgPath != "" || catalogTagHas(field, "sensitive") {
			continue
		}
		name := jsonFieldName(field)
		if name == "" {
			continue
		}
		input := CommandInputField{
			ID:       name,
			Name:     name,
			Path:     name,
			Label:    titleFromIdentifier(name),
			Kind:     catalogKindForType(field.Type),
			Type:     jsonSchemaTypeForType(field.Type),
			Required: catalogTagHas(field, "required"),
		}
		if description := strings.TrimSpace(field.Tag.Get("description")); description != "" {
			input.Description = description
		}
		schema.Fields = append(schema.Fields, input)
		properties[name] = map[string]any{"type": input.Type}
		if input.Required {
			schema.Required = append(schema.Required, name)
		}
	}
	if len(schema.Fields) == 0 {
		schema.NoInput = true
	}
	sort.Slice(schema.Fields, func(i, j int) bool {
		return schema.Fields[i].Path < schema.Fields[j].Path
	})
	sort.Strings(schema.Required)
	schema.JSONSchema = map[string]any{
		"type":       "object",
		"properties": properties,
	}
	if len(schema.Required) > 0 {
		schema.JSONSchema["required"] = cloneCatalogStrings(schema.Required)
	}
	return schema
}

func jsonFieldName(field reflect.StructField) string {
	tag := strings.TrimSpace(field.Tag.Get("json"))
	if tag == "-" {
		return ""
	}
	if tag != "" {
		name, _, _ := strings.Cut(tag, ",")
		if name = strings.TrimSpace(name); name != "" {
			return name
		}
	}
	return field.Name
}

func catalogTagHas(field reflect.StructField, want string) bool {
	want = strings.TrimSpace(strings.ToLower(want))
	for _, key := range []string{"catalog", "command"} {
		for _, part := range strings.Split(field.Tag.Get(key), ",") {
			if strings.TrimSpace(strings.ToLower(part)) == want {
				return true
			}
		}
	}
	return false
}

func catalogKindForType(t reflect.Type) string {
	if t.Kind() == reflect.Pointer {
		t = t.Elem()
	}
	switch t.Kind() {
	case reflect.Bool:
		return "boolean"
	case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64, reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64, reflect.Float32, reflect.Float64:
		return "number"
	case reflect.Slice, reflect.Array:
		return "array"
	default:
		return "string"
	}
}

func jsonSchemaTypeForType(t reflect.Type) string {
	if t.Kind() == reflect.Pointer {
		t = t.Elem()
	}
	switch t.Kind() {
	case reflect.Bool:
		return "boolean"
	case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64, reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64:
		return "integer"
	case reflect.Float32, reflect.Float64:
		return "number"
	case reflect.Slice, reflect.Array:
		return "array"
	case reflect.Map, reflect.Struct:
		return "object"
	default:
		return "string"
	}
}

func titleFromIdentifier(value string) string {
	value = strings.TrimSpace(strings.ReplaceAll(value, "_", " "))
	if value == "" {
		return ""
	}
	parts := strings.Fields(value)
	for i, part := range parts {
		if part == "" {
			continue
		}
		parts[i] = strings.ToUpper(part[:1]) + part[1:]
	}
	return strings.Join(parts, " ")
}

func firstCatalogString(values ...string) string {
	for _, value := range values {
		if trimmed := strings.TrimSpace(value); trimmed != "" {
			return trimmed
		}
	}
	return ""
}

func cloneCatalogStrings(values []string) []string {
	if len(values) == 0 {
		return nil
	}
	out := make([]string, 0, len(values))
	for _, value := range values {
		if trimmed := strings.TrimSpace(value); trimmed != "" {
			out = append(out, trimmed)
		}
	}
	return out
}

func uniqueCatalogStrings(values []string) []string {
	if len(values) == 0 {
		return nil
	}
	seen := map[string]bool{}
	out := make([]string, 0, len(values))
	for _, value := range values {
		trimmed := strings.TrimSpace(value)
		key := strings.ToLower(trimmed)
		if trimmed == "" || seen[key] {
			continue
		}
		seen[key] = true
		out = append(out, trimmed)
	}
	return out
}

func commandExposureIsZero(exposure CommandExposure) bool {
	return !exposure.ExposeInAdmin &&
		len(exposure.Tags) == 0 &&
		len(exposure.Permissions) == 0 &&
		len(exposure.Roles) == 0 &&
		!exposure.Mutates
}

func rpcConfigIsZero(config RPCConfig) bool {
	return strings.TrimSpace(config.Method) == "" &&
		config.Timeout == 0 &&
		!config.Streaming &&
		!config.Idempotent &&
		len(config.Permissions) == 0 &&
		len(config.Roles) == 0 &&
		strings.TrimSpace(config.Summary) == "" &&
		strings.TrimSpace(config.Description) == "" &&
		len(config.Tags) == 0 &&
		!config.Deprecated &&
		strings.TrimSpace(config.Since) == ""
}

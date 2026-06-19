package command

import (
	"context"
	"testing"

	"github.com/stretchr/testify/require"
)

type catalogMessage struct {
	EntityID string `json:"entity_id" catalog:"required" description:"Entity to inspect."`
	Limit    int    `json:"limit,omitempty"`
	Token    string `json:"token,omitempty" catalog:"sensitive"`
	ignored  string
}

func (catalogMessage) Type() string { return "catalog.inspect" }

type catalogCommand struct{}

func (catalogCommand) Execute(context.Context, catalogMessage) error { return nil }

func (catalogCommand) Exposure() CommandExposure {
	return CommandExposure{
		ExposeInAdmin: true,
		Tags:          []string{"ops", "catalog"},
		Permissions:   []string{"admin.catalog.inspect"},
		Roles:         []string{"operator"},
		Mutates:       false,
	}
}

func (catalogCommand) RPCHandler() any { return catalogCommand{} }

func (catalogCommand) RPCOptions() RPCConfig {
	return RPCConfig{
		Method:      "admin.catalog.inspect",
		Summary:     "Inspect catalog",
		Description: "Returns catalog diagnostics.",
		Tags:        []string{"rpc"},
		Permissions: []string{"admin.catalog.rpc"},
	}
}

func (catalogCommand) CommandDescriptor() CommandDescriptor {
	return CommandDescriptor{
		Label:         "Inspect catalog",
		Group:         "Operations",
		ExecutionMode: ExecutionModeInline,
		Input: CommandInputSchema{
			Type: "object",
			Fields: []CommandInputField{
				{
					ID:       "entity_id",
					Name:     "entity_id",
					Path:     "entity_id",
					Kind:     "string",
					Type:     "string",
					Required: true,
					OptionSource: &CommandOptionSourceRef{
						ID:         "catalog.entities",
						Dynamic:    true,
						CacheScope: "request",
					},
				},
			},
			Required: []string{"entity_id"},
		},
		Result: CommandResultDescriptor{
			Inline:          true,
			ReceiptExpected: true,
		},
	}
}

func (catalogCommand) CommandProgressDescriptor() CommandProgressDescriptor {
	return CommandProgressDescriptor{
		Units: "records",
		Total: 100,
		Checkpoints: []CommandProgressCheckpoint{
			{
				ID:       "load",
				Label:    "Load",
				Order:    1,
				Metadata: map[string]any{"phase": "input"},
			},
		},
		Metadata: map[string]any{"safe": "yes"},
	}
}

type hiddenCatalogCommand struct{}

func (hiddenCatalogCommand) Execute(context.Context, catalogMessage) error { return nil }

func (hiddenCatalogCommand) Exposure() CommandExposure {
	return CommandExposure{ExposeInAdmin: false}
}

type noProgressCatalogCommand struct{}

func (noProgressCatalogCommand) Execute(context.Context, catalogMessage) error { return nil }

func (noProgressCatalogCommand) Exposure() CommandExposure {
	return CommandExposure{ExposeInAdmin: true}
}

func TestDescriptorForCommandMergesExposureRPCAndExplicitDescriptor(t *testing.T) {
	meta := MessageTypeForCommand(catalogCommand{})
	descriptor, ok := DescriptorForCommand(catalogCommand{}, meta)
	require.True(t, ok)

	require.Equal(t, "catalog.inspect", descriptor.ID)
	require.Equal(t, "catalog.inspect", descriptor.MessageType)
	require.Equal(t, "Inspect catalog", descriptor.Label)
	require.Equal(t, "Inspect catalog", descriptor.Summary)
	require.Equal(t, "Returns catalog diagnostics.", descriptor.Description)
	require.True(t, descriptor.ExposeInAdmin)
	require.False(t, descriptor.Mutating)
	require.Equal(t, ExecutionModeInline, descriptor.ExecutionMode)
	require.Equal(t, []string{"rpc", "ops", "catalog"}, descriptor.Tags)
	require.Equal(t, []string{"admin.catalog.rpc", "admin.catalog.inspect"}, descriptor.Permissions)
	require.Equal(t, []string{"operator"}, descriptor.Roles)
	require.Len(t, descriptor.Input.Fields, 1)
	require.Equal(t, "catalog.entities", descriptor.Input.Fields[0].OptionSource.ID)
	require.True(t, descriptor.Result.Inline)
	require.NotNil(t, descriptor.Progress)
	require.Equal(t, "records", descriptor.Progress.Units)
	require.Equal(t, int64(100), descriptor.Progress.Total)
	require.Equal(t, "load", descriptor.Progress.Checkpoints[0].ID)
}

func TestDescriptorForCommandOmitsProgressWhenCommandDoesNotDescribeProgress(t *testing.T) {
	meta := MessageTypeForCommand(noProgressCatalogCommand{})
	descriptor, ok := DescriptorForCommand(noProgressCatalogCommand{}, meta)
	require.True(t, ok)
	require.Nil(t, descriptor.Progress)
}

func TestDescriptorForCommandClonesProgressDescriptor(t *testing.T) {
	meta := MessageTypeForCommand(catalogCommand{})
	descriptor, ok := DescriptorForCommand(catalogCommand{}, meta)
	require.True(t, ok)
	require.NotNil(t, descriptor.Progress)

	descriptor.Progress.Metadata["safe"] = "mutated"
	descriptor.Progress.Checkpoints[0].Metadata["phase"] = "mutated"

	descriptor, ok = DescriptorForCommand(catalogCommand{}, meta)
	require.True(t, ok)
	require.Equal(t, "yes", descriptor.Progress.Metadata["safe"])
	require.Equal(t, "input", descriptor.Progress.Checkpoints[0].Metadata["phase"])
}

func TestRegistryCollectsCatalogDescriptorsFromExposedCommands(t *testing.T) {
	registry := NewRegistry()
	registry.SetRPCRegister(NilRPCRegister)
	require.NoError(t, registry.RegisterCommand(catalogCommand{}))
	require.NoError(t, registry.RegisterCommand(hiddenCatalogCommand{}))
	require.NoError(t, registry.Initialize())

	descriptors := registry.CatalogDescriptors()
	require.Len(t, descriptors, 1)
	require.Equal(t, "catalog.inspect", descriptors[0].ID)

	byTag := registry.CatalogDescriptorsByTag("rpc")
	require.Len(t, byTag, 1)
	require.Equal(t, "catalog.inspect", byTag[0].ID)

	exposed := registry.CatalogDescriptorsByExposure(true)
	require.Len(t, exposed, 1)
	require.Equal(t, "catalog.inspect", exposed[0].ID)
}

func TestRegistryCatalogDescriptorOverridesAreDuplicateTolerant(t *testing.T) {
	registry := NewRegistry()
	require.NoError(t, registry.RegisterCatalogDescriptor(CommandDescriptor{
		ID:            "external.command",
		Label:         "First",
		ExposeInAdmin: true,
		Tags:          []string{"ops"},
	}))
	require.NoError(t, registry.RegisterCatalogDescriptor(CommandDescriptor{
		ID:            "external.command",
		Label:         "Second",
		ExposeInAdmin: true,
		Tags:          []string{"ops", "updated"},
	}))
	require.NoError(t, registry.RegisterCatalogDescriptor(CommandDescriptor{
		ID:            "another.command",
		Label:         "Another",
		ExposeInAdmin: true,
	}))

	descriptors := registry.CatalogDescriptors()
	require.Len(t, descriptors, 2)
	require.Equal(t, "external.command", descriptors[0].ID)
	require.Equal(t, "Second", descriptors[0].Label)
	require.Equal(t, []string{"ops", "updated"}, descriptors[0].Tags)

	descriptor, ok := registry.CatalogDescriptor("external.command")
	require.True(t, ok)
	descriptor.Label = "mutated"

	descriptor, ok = registry.CatalogDescriptor("external.command")
	require.True(t, ok)
	require.Equal(t, "Second", descriptor.Label)
}

func TestRegistryCatalogDescriptorClonesNestedMetadata(t *testing.T) {
	registry := NewRegistry()
	require.NoError(t, registry.RegisterCatalogDescriptor(CommandDescriptor{
		ID:            "external.command",
		Label:         "External",
		ExposeInAdmin: true,
		DisplayHints: map[string]any{
			"resource": "catalog",
			"nested": map[string]any{
				"class": "safe",
			},
		},
		Input: CommandInputSchema{
			JSONSchema: map[string]any{
				"type": "object",
				"properties": map[string]any{
					"entity_id": map[string]any{"type": "string"},
				},
			},
			Fields: []CommandInputField{{
				Name: "entity_id",
				Path: "entity_id",
				OptionSource: &CommandOptionSourceRef{
					ID: "catalog.entities",
					Params: map[string]any{
						"filters": map[string]any{"status": "active"},
					},
				},
			}},
		},
		Result: CommandResultDescriptor{
			ResultSchema: map[string]any{
				"properties": map[string]any{
					"count": map[string]any{"type": "integer"},
				},
			},
		},
		Progress: &CommandProgressDescriptor{
			Metadata: map[string]any{
				"nested": map[string]any{"safe": true},
			},
			Checkpoints: []CommandProgressCheckpoint{{
				ID:       "queued",
				Metadata: map[string]any{"phase": "accept"},
			}},
		},
	}))

	descriptor, ok := registry.CatalogDescriptor("external.command")
	require.True(t, ok)
	descriptor.DisplayHints["nested"].(map[string]any)["class"] = "mutated"
	descriptor.Input.JSONSchema["properties"].(map[string]any)["entity_id"].(map[string]any)["type"] = "integer"
	descriptor.Input.Fields[0].OptionSource.Params["filters"].(map[string]any)["status"] = "mutated"
	descriptor.Result.ResultSchema["properties"].(map[string]any)["count"].(map[string]any)["type"] = "string"
	descriptor.Progress.Metadata["nested"].(map[string]any)["safe"] = false
	descriptor.Progress.Checkpoints[0].Metadata["phase"] = "mutated"

	descriptor, ok = registry.CatalogDescriptor("external.command")
	require.True(t, ok)
	require.Equal(t, "safe", descriptor.DisplayHints["nested"].(map[string]any)["class"])
	require.Equal(t, "string", descriptor.Input.JSONSchema["properties"].(map[string]any)["entity_id"].(map[string]any)["type"])
	require.Equal(t, "active", descriptor.Input.Fields[0].OptionSource.Params["filters"].(map[string]any)["status"])
	require.Equal(t, "integer", descriptor.Result.ResultSchema["properties"].(map[string]any)["count"].(map[string]any)["type"])
	require.Equal(t, true, descriptor.Progress.Metadata["nested"].(map[string]any)["safe"])
	require.Equal(t, "accept", descriptor.Progress.Checkpoints[0].Metadata["phase"])
}

func TestCommandInputSchemaFromMessageUsesStablePayloadPaths(t *testing.T) {
	schema := CommandInputSchemaFromMessage(catalogMessage{})
	require.Equal(t, "object", schema.Type)
	require.False(t, schema.NoInput)
	require.Equal(t, []string{"entity_id"}, schema.Required)
	require.Len(t, schema.Fields, 2)

	fields := map[string]CommandInputField{}
	for _, field := range schema.Fields {
		fields[field.Path] = field
	}
	require.Equal(t, "string", fields["entity_id"].Type)
	require.Equal(t, "Entity to inspect.", fields["entity_id"].Description)
	require.Equal(t, "integer", fields["limit"].Type)
	require.NotContains(t, fields, "token")
	require.NotContains(t, fields, "ignored")

	jsonSchema, ok := schema.JSONSchema["properties"].(map[string]any)
	require.True(t, ok)
	require.Contains(t, jsonSchema, "entity_id")
	require.NotContains(t, jsonSchema, "token")
}

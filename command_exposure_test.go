package command

import (
	"context"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

type exposureMessage struct {
	ID string
}

func (exposureMessage) Type() string {
	return "exposure.message"
}

type exposureCLIHandler struct{}

type exposureCLICommand struct {
	path   []string
	expose bool
}

func (c *exposureCLICommand) Execute(ctx context.Context, msg exposureMessage) error {
	return nil
}

func (c *exposureCLICommand) CLIHandler() any {
	return &exposureCLIHandler{}
}

func (c *exposureCLICommand) CLIOptions() CLIConfig {
	return CLIConfig{
		Path:        c.path,
		Description: "exposure test command",
	}
}

func (c *exposureCLICommand) Exposure() CommandExposure {
	return CommandExposure{
		ExposeInAdmin: c.expose,
	}
}

type nonExposableCLICommand struct {
	path []string
}

func (c *nonExposableCLICommand) Execute(ctx context.Context, msg exposureMessage) error {
	return nil
}

func (c *nonExposableCLICommand) CLIHandler() any {
	return &exposureCLIHandler{}
}

func (c *nonExposableCLICommand) CLIOptions() CLIConfig {
	return CLIConfig{
		Path:        c.path,
		Description: "non exposable test command",
	}
}

type nonCLIExposableCommand struct {
	expose bool
}

func (c *nonCLIExposableCommand) Execute(ctx context.Context, msg exposureMessage) error {
	return nil
}

func (c *nonCLIExposableCommand) Exposure() CommandExposure {
	return CommandExposure{
		ExposeInAdmin: c.expose,
	}
}

type exposableCommand struct{}

func (exposableCommand) Exposure() CommandExposure {
	return CommandExposure{
		ExposeInAdmin: true,
		Mutates:       true,
	}
}

type readOnlyExposureCommand struct{}

func (readOnlyExposureCommand) Exposure() CommandExposure {
	return CommandExposure{
		ExposeInAdmin: true,
	}
}

type nonExposableCommand struct{}

func TestExposureOfExposableCommand(t *testing.T) {
	exposure, ok := ExposureOf(exposableCommand{})

	require.True(t, ok)
	assert.True(t, exposure.ExposeInAdmin)
	assert.True(t, exposure.Mutates)
}

func TestExposureOfNonExposableCommand(t *testing.T) {
	exposure, ok := ExposureOf(nonExposableCommand{})

	assert.False(t, ok)
	assert.Equal(t, CommandExposure{}, exposure)
}

func TestExposureDefaultMutatesFalse(t *testing.T) {
	exposure, ok := ExposureOf(readOnlyExposureCommand{})

	require.True(t, ok)
	assert.False(t, exposure.Mutates)
}

func TestRegistryExposureResolverCollectsCLICommands(t *testing.T) {
	registry := NewRegistry()

	var exposures []CommandExposure
	var metas []CommandMeta

	err := registry.AddResolver("exposure", func(cmd any, meta CommandMeta, _ *Registry) error {
		if _, ok := cmd.(CLICommand); !ok {
			return nil
		}
		exposure, ok := ExposureOf(cmd)
		if !ok || !exposure.ExposeInAdmin {
			return nil
		}
		exposures = append(exposures, exposure)
		metas = append(metas, meta)
		return nil
	})
	require.NoError(t, err)

	require.NoError(t, registry.RegisterCommand(&exposureCLICommand{
		path:   []string{"exposure", "visible"},
		expose: true,
	}))
	require.NoError(t, registry.RegisterCommand(&exposureCLICommand{
		path:   []string{"exposure", "hidden"},
		expose: false,
	}))
	require.NoError(t, registry.RegisterCommand(&nonExposableCLICommand{
		path: []string{"exposure", "plain"},
	}))
	require.NoError(t, registry.RegisterCommand(&nonCLIExposableCommand{
		expose: true,
	}))

	require.NoError(t, registry.Initialize())

	require.Len(t, exposures, 1)
	assert.True(t, exposures[0].ExposeInAdmin)
	assert.False(t, exposures[0].Mutates)
	require.Len(t, metas, 1)
	assert.Equal(t, GetMessageType(exposureMessage{}), metas[0].MessageType)
}

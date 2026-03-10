package flow

import (
	"context"
	"fmt"
	"strings"

	"github.com/goliatone/go-command"
	cmdrpc "github.com/goliatone/go-command/rpc"
)

// FSMAuthoringListMachinesRPCCommand provides the fsm.authoring.list_machines method.
type FSMAuthoringListMachinesRPCCommand struct {
	Service *AuthoringService
	Spec    cmdrpc.EndpointSpec
}

func NewFSMAuthoringListMachinesRPCCommand(service *AuthoringService) *FSMAuthoringListMachinesRPCCommand {
	return &FSMAuthoringListMachinesRPCCommand{
		Service: service,
		Spec: cmdrpc.EndpointSpec{
			Method:     FSMRPCMethodAuthoringListMachines,
			Idempotent: true,
		},
	}
}

func (c *FSMAuthoringListMachinesRPCCommand) Query(
	ctx context.Context,
	req cmdrpc.RequestEnvelope[FSMAuthoringListMachinesRequest],
) (cmdrpc.ResponseEnvelope[FSMAuthoringListMachinesResponse], error) {
	service, err := requireAuthoringService(c.Service)
	if err != nil {
		return cmdrpc.ResponseEnvelope[FSMAuthoringListMachinesResponse]{}, err
	}
	out, err := service.ListMachines(ctx, req.Data)
	if err != nil {
		return cmdrpc.ResponseEnvelope[FSMAuthoringListMachinesResponse]{}, err
	}
	return cmdrpc.ResponseEnvelope[FSMAuthoringListMachinesResponse]{Data: out}, nil
}

func (c *FSMAuthoringListMachinesRPCCommand) RPCEndpoints() []cmdrpc.EndpointDefinition {
	return []cmdrpc.EndpointDefinition{
		cmdrpc.NewEndpoint[FSMAuthoringListMachinesRequest, FSMAuthoringListMachinesResponse](
			normalizeFSMEndpointSpec(c.Spec, FSMRPCMethodAuthoringListMachines, cmdrpc.MethodKindQuery),
			c.Query,
		),
	}
}

// FSMAuthoringGetMachineRPCCommand provides the fsm.authoring.get_machine method.
type FSMAuthoringGetMachineRPCCommand struct {
	Service *AuthoringService
	Spec    cmdrpc.EndpointSpec
}

func NewFSMAuthoringGetMachineRPCCommand(service *AuthoringService) *FSMAuthoringGetMachineRPCCommand {
	return &FSMAuthoringGetMachineRPCCommand{
		Service: service,
		Spec: cmdrpc.EndpointSpec{
			Method:     FSMRPCMethodAuthoringGetMachine,
			Idempotent: true,
		},
	}
}

func (c *FSMAuthoringGetMachineRPCCommand) Query(
	ctx context.Context,
	req cmdrpc.RequestEnvelope[FSMAuthoringGetMachineRequest],
) (cmdrpc.ResponseEnvelope[FSMAuthoringGetMachineResponse], error) {
	service, err := requireAuthoringService(c.Service)
	if err != nil {
		return cmdrpc.ResponseEnvelope[FSMAuthoringGetMachineResponse]{}, err
	}
	out, err := service.GetMachine(ctx, req.Data)
	if err != nil {
		return cmdrpc.ResponseEnvelope[FSMAuthoringGetMachineResponse]{}, err
	}
	return cmdrpc.ResponseEnvelope[FSMAuthoringGetMachineResponse]{Data: out}, nil
}

func (c *FSMAuthoringGetMachineRPCCommand) RPCEndpoints() []cmdrpc.EndpointDefinition {
	return []cmdrpc.EndpointDefinition{
		cmdrpc.NewEndpoint[FSMAuthoringGetMachineRequest, FSMAuthoringGetMachineResponse](
			normalizeFSMEndpointSpec(c.Spec, FSMRPCMethodAuthoringGetMachine, cmdrpc.MethodKindQuery),
			c.Query,
		),
	}
}

// FSMAuthoringSaveDraftRPCCommand provides the fsm.authoring.save_draft method.
type FSMAuthoringSaveDraftRPCCommand struct {
	Service *AuthoringService
	Spec    cmdrpc.EndpointSpec
}

func NewFSMAuthoringSaveDraftRPCCommand(service *AuthoringService) *FSMAuthoringSaveDraftRPCCommand {
	return &FSMAuthoringSaveDraftRPCCommand{
		Service: service,
		Spec: cmdrpc.EndpointSpec{
			Method: FSMRPCMethodAuthoringSaveDraft,
		},
	}
}

func (c *FSMAuthoringSaveDraftRPCCommand) Query(
	ctx context.Context,
	req cmdrpc.RequestEnvelope[FSMAuthoringSaveDraftRequest],
) (cmdrpc.ResponseEnvelope[FSMAuthoringSaveDraftResponse], error) {
	service, err := requireAuthoringService(c.Service)
	if err != nil {
		return cmdrpc.ResponseEnvelope[FSMAuthoringSaveDraftResponse]{}, err
	}
	out, err := service.SaveDraft(ctx, req.Data)
	if err != nil {
		return cmdrpc.ResponseEnvelope[FSMAuthoringSaveDraftResponse]{}, err
	}
	return cmdrpc.ResponseEnvelope[FSMAuthoringSaveDraftResponse]{Data: out}, nil
}

func (c *FSMAuthoringSaveDraftRPCCommand) RPCEndpoints() []cmdrpc.EndpointDefinition {
	return []cmdrpc.EndpointDefinition{
		cmdrpc.NewEndpoint[FSMAuthoringSaveDraftRequest, FSMAuthoringSaveDraftResponse](
			normalizeFSMEndpointSpec(c.Spec, FSMRPCMethodAuthoringSaveDraft, cmdrpc.MethodKindCommand),
			c.Query,
		),
	}
}

// FSMAuthoringValidateRPCCommand provides the fsm.authoring.validate method.
type FSMAuthoringValidateRPCCommand struct {
	Service *AuthoringService
	Spec    cmdrpc.EndpointSpec
}

func NewFSMAuthoringValidateRPCCommand(service *AuthoringService) *FSMAuthoringValidateRPCCommand {
	return &FSMAuthoringValidateRPCCommand{
		Service: service,
		Spec: cmdrpc.EndpointSpec{
			Method:     FSMRPCMethodAuthoringValidate,
			Idempotent: true,
		},
	}
}

func (c *FSMAuthoringValidateRPCCommand) Query(
	ctx context.Context,
	req cmdrpc.RequestEnvelope[FSMAuthoringValidateRequest],
) (cmdrpc.ResponseEnvelope[FSMAuthoringValidateResponse], error) {
	service, err := requireAuthoringService(c.Service)
	if err != nil {
		return cmdrpc.ResponseEnvelope[FSMAuthoringValidateResponse]{}, err
	}
	out, err := service.Validate(ctx, req.Data)
	if err != nil {
		return cmdrpc.ResponseEnvelope[FSMAuthoringValidateResponse]{}, err
	}
	return cmdrpc.ResponseEnvelope[FSMAuthoringValidateResponse]{Data: out}, nil
}

func (c *FSMAuthoringValidateRPCCommand) RPCEndpoints() []cmdrpc.EndpointDefinition {
	return []cmdrpc.EndpointDefinition{
		cmdrpc.NewEndpoint[FSMAuthoringValidateRequest, FSMAuthoringValidateResponse](
			normalizeFSMEndpointSpec(c.Spec, FSMRPCMethodAuthoringValidate, cmdrpc.MethodKindQuery),
			c.Query,
		),
	}
}

// FSMAuthoringPublishRPCCommand provides the fsm.authoring.publish method.
type FSMAuthoringPublishRPCCommand struct {
	Service *AuthoringService
	Spec    cmdrpc.EndpointSpec
}

func NewFSMAuthoringPublishRPCCommand(service *AuthoringService) *FSMAuthoringPublishRPCCommand {
	return &FSMAuthoringPublishRPCCommand{
		Service: service,
		Spec: cmdrpc.EndpointSpec{
			Method: FSMRPCMethodAuthoringPublish,
		},
	}
}

func (c *FSMAuthoringPublishRPCCommand) Query(
	ctx context.Context,
	req cmdrpc.RequestEnvelope[FSMAuthoringPublishRequest],
) (cmdrpc.ResponseEnvelope[FSMAuthoringPublishResponse], error) {
	service, err := requireAuthoringService(c.Service)
	if err != nil {
		return cmdrpc.ResponseEnvelope[FSMAuthoringPublishResponse]{}, err
	}
	out, err := service.Publish(ctx, req.Data)
	if err != nil {
		return cmdrpc.ResponseEnvelope[FSMAuthoringPublishResponse]{}, err
	}
	return cmdrpc.ResponseEnvelope[FSMAuthoringPublishResponse]{Data: out}, nil
}

func (c *FSMAuthoringPublishRPCCommand) RPCEndpoints() []cmdrpc.EndpointDefinition {
	return []cmdrpc.EndpointDefinition{
		cmdrpc.NewEndpoint[FSMAuthoringPublishRequest, FSMAuthoringPublishResponse](
			normalizeFSMEndpointSpec(c.Spec, FSMRPCMethodAuthoringPublish, cmdrpc.MethodKindCommand),
			c.Query,
		),
	}
}

// FSMAuthoringDeleteMachineRPCCommand provides the fsm.authoring.delete_machine method.
type FSMAuthoringDeleteMachineRPCCommand struct {
	Service *AuthoringService
	Spec    cmdrpc.EndpointSpec
}

func NewFSMAuthoringDeleteMachineRPCCommand(service *AuthoringService) *FSMAuthoringDeleteMachineRPCCommand {
	return &FSMAuthoringDeleteMachineRPCCommand{
		Service: service,
		Spec: cmdrpc.EndpointSpec{
			Method: FSMRPCMethodAuthoringDeleteMachine,
		},
	}
}

func (c *FSMAuthoringDeleteMachineRPCCommand) Query(
	ctx context.Context,
	req cmdrpc.RequestEnvelope[FSMAuthoringDeleteMachineRequest],
) (cmdrpc.ResponseEnvelope[FSMAuthoringDeleteMachineResponse], error) {
	service, err := requireAuthoringService(c.Service)
	if err != nil {
		return cmdrpc.ResponseEnvelope[FSMAuthoringDeleteMachineResponse]{}, err
	}
	out, err := service.DeleteMachine(ctx, req.Data)
	if err != nil {
		return cmdrpc.ResponseEnvelope[FSMAuthoringDeleteMachineResponse]{}, err
	}
	return cmdrpc.ResponseEnvelope[FSMAuthoringDeleteMachineResponse]{Data: out}, nil
}

func (c *FSMAuthoringDeleteMachineRPCCommand) RPCEndpoints() []cmdrpc.EndpointDefinition {
	return []cmdrpc.EndpointDefinition{
		cmdrpc.NewEndpoint[FSMAuthoringDeleteMachineRequest, FSMAuthoringDeleteMachineResponse](
			normalizeFSMEndpointSpec(c.Spec, FSMRPCMethodAuthoringDeleteMachine, cmdrpc.MethodKindCommand),
			c.Query,
		),
	}
}

// FSMAuthoringExportUnavailableRPCCommand provides an explicit
// adapter-compatible unavailable response for optional export capability.
type FSMAuthoringExportUnavailableRPCCommand struct {
	Spec cmdrpc.EndpointSpec
}

func NewFSMAuthoringExportUnavailableRPCCommand() *FSMAuthoringExportUnavailableRPCCommand {
	return &FSMAuthoringExportUnavailableRPCCommand{
		Spec: cmdrpc.EndpointSpec{
			Method:     FSMRPCMethodAuthoringExport,
			Idempotent: true,
		},
	}
}

func (c *FSMAuthoringExportUnavailableRPCCommand) Query(
	_ context.Context,
	req cmdrpc.RequestEnvelope[FSMAuthoringExportRequest],
) (cmdrpc.ResponseEnvelope[FSMAuthoringExportResponse], error) {
	metadata := map[string]any{
		"method": FSMRPCMethodAuthoringExport,
	}
	if machineID := strings.TrimSpace(req.Data.MachineID); machineID != "" {
		metadata["machineId"] = machineID
	}
	if format := strings.TrimSpace(req.Data.Format); format != "" {
		metadata["format"] = format
	}
	return cmdrpc.ResponseEnvelope[FSMAuthoringExportResponse]{}, cloneRuntimeError(
		ErrPreconditionFailed,
		"authoring export capability unavailable",
		nil,
		metadata,
	)
}

func (c *FSMAuthoringExportUnavailableRPCCommand) RPCEndpoints() []cmdrpc.EndpointDefinition {
	return []cmdrpc.EndpointDefinition{
		cmdrpc.NewEndpoint[FSMAuthoringExportRequest, FSMAuthoringExportResponse](
			normalizeFSMEndpointSpec(c.Spec, FSMRPCMethodAuthoringExport, cmdrpc.MethodKindQuery),
			c.Query,
		),
	}
}

// NewFSMAuthoringRPCCommands returns the authoring method family as registry commands.
func NewFSMAuthoringRPCCommands(service *AuthoringService) []any {
	return []any{
		NewFSMAuthoringListMachinesRPCCommand(service),
		NewFSMAuthoringGetMachineRPCCommand(service),
		NewFSMAuthoringSaveDraftRPCCommand(service),
		NewFSMAuthoringValidateRPCCommand(service),
		NewFSMAuthoringPublishRPCCommand(service),
		NewFSMAuthoringDeleteMachineRPCCommand(service),
		NewFSMAuthoringExportUnavailableRPCCommand(),
	}
}

// RegisterFSMAuthoringRPCCommands registers the authoring method family into a command registry.
func RegisterFSMAuthoringRPCCommands(registry *command.Registry, service *AuthoringService) error {
	if registry == nil {
		return fmt.Errorf("registry is required")
	}
	for _, cmd := range NewFSMAuthoringRPCCommands(service) {
		if err := registry.RegisterCommand(cmd); err != nil {
			return err
		}
	}
	return nil
}

func requireAuthoringService(service *AuthoringService) (*AuthoringService, error) {
	if service == nil || service.store == nil {
		return nil, cloneRuntimeError(ErrPreconditionFailed, "authoring service not configured", nil, nil)
	}
	return service, nil
}

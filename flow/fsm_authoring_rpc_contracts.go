package flow

const (
	FSMRPCMethodAuthoringListMachines  = "fsm.authoring.list_machines"
	FSMRPCMethodAuthoringGetMachine    = "fsm.authoring.get_machine"
	FSMRPCMethodAuthoringSaveDraft     = "fsm.authoring.save_draft"
	FSMRPCMethodAuthoringValidate      = "fsm.authoring.validate"
	FSMRPCMethodAuthoringPublish       = "fsm.authoring.publish"
	FSMRPCMethodAuthoringDeleteMachine = "fsm.authoring.delete_machine"
	FSMRPCMethodAuthoringExport        = "fsm.authoring.export"
)

const (
	ErrCodeAuthoringNotFound         = "FSM_AUTHORING_NOT_FOUND"
	ErrCodeAuthoringValidationFailed = "FSM_AUTHORING_VALIDATION_FAILED"
)

// FSMMachineSummary is the canonical list row for fsm.authoring.list_machines.
type FSMMachineSummary struct {
	MachineID string `json:"machineId"`
	Name      string `json:"name"`
	Version   string `json:"version"`
	IsDraft   bool   `json:"isDraft"`
	UpdatedAt string `json:"updatedAt"`
}

type FSMAuthoringListMachinesRequest struct {
	Query         string `json:"query,omitempty"`
	IncludeDrafts *bool  `json:"includeDrafts,omitempty"`
	Limit         *int   `json:"limit,omitempty"`
	Cursor        string `json:"cursor,omitempty"`
}

type FSMAuthoringListMachinesResponse struct {
	Items      []FSMMachineSummary `json:"items"`
	NextCursor string              `json:"nextCursor,omitempty"`
}

type FSMAuthoringGetMachineRequest struct {
	MachineID   string `json:"machineId"`
	Version     string `json:"version,omitempty"`
	PreferDraft *bool  `json:"preferDraft,omitempty"`
}

type FSMAuthoringGetMachineResponse struct {
	MachineID   string                 `json:"machineId"`
	Version     string                 `json:"version"`
	Draft       DraftMachineDocument   `json:"draft"`
	Diagnostics []ValidationDiagnostic `json:"diagnostics"`
	ETag        string                 `json:"etag,omitempty"`
}

type FSMAuthoringSaveDraftRequest struct {
	MachineID   string               `json:"machineId"`
	BaseVersion string               `json:"baseVersion,omitempty"`
	Draft       DraftMachineDocument `json:"draft"`
	Validate    *bool                `json:"validate,omitempty"`
}

type FSMAuthoringSaveDraftResponse struct {
	MachineID   string                 `json:"machineId"`
	Version     string                 `json:"version"`
	DraftState  DraftState             `json:"draftState"`
	Diagnostics []ValidationDiagnostic `json:"diagnostics"`
	ETag        string                 `json:"etag"`
}

type FSMAuthoringValidationScope struct {
	NodeIDs []string `json:"nodeIds,omitempty"`
}

type FSMAuthoringValidateRequest struct {
	MachineID string                       `json:"machineId,omitempty"`
	Draft     *DraftMachineDocument        `json:"draft,omitempty"`
	Scope     *FSMAuthoringValidationScope `json:"scope,omitempty"`
}

type FSMAuthoringValidateResponse struct {
	Valid       bool                   `json:"valid"`
	Diagnostics []ValidationDiagnostic `json:"diagnostics"`
}

type FSMAuthoringPublishRequest struct {
	MachineID       string                `json:"machineId"`
	ExpectedVersion string                `json:"expectedVersion,omitempty"`
	Draft           *DraftMachineDocument `json:"draft,omitempty"`
}

type FSMAuthoringPublishResponse struct {
	MachineID   string                 `json:"machineId"`
	Version     string                 `json:"version"`
	PublishedAt string                 `json:"publishedAt"`
	Diagnostics []ValidationDiagnostic `json:"diagnostics"`
}

type FSMAuthoringDeleteMachineRequest struct {
	MachineID       string `json:"machineId"`
	ExpectedVersion string `json:"expectedVersion,omitempty"`
	HardDelete      bool   `json:"hardDelete,omitempty"`
}

type FSMAuthoringDeleteMachineResponse struct {
	MachineID string `json:"machineId"`
	Deleted   bool   `json:"deleted"`
}

// FSMAuthoringExportRequest is an optional RPC capability contract.
// The endpoint may intentionally return an unavailable error when not configured.
type FSMAuthoringExportRequest struct {
	MachineID    string                `json:"machineId,omitempty"`
	Format       string                `json:"format,omitempty"`
	IncludeDraft bool                  `json:"includeDraft,omitempty"`
	Draft        *DraftMachineDocument `json:"draft,omitempty"`
}

type FSMAuthoringExportResponse struct {
	MachineID   string `json:"machineId"`
	Format      string `json:"format"`
	ContentType string `json:"contentType,omitempty"`
	Content     string `json:"content"`
}

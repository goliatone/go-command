export const BUILDER_RPC_PATH = "/rpc"
export const BUILDER_JSON_RPC_VERSION = "2.0" as const

export const FSM_RUNTIME_METHODS = {
  applyEvent: "fsm.apply_event",
  snapshot: "fsm.snapshot"
} as const

export const FSM_AUTHORING_METHODS = {
  listMachines: "fsm.authoring.list_machines",
  getMachine: "fsm.authoring.get_machine",
  saveDraft: "fsm.authoring.save_draft",
  validate: "fsm.authoring.validate",
  publish: "fsm.authoring.publish",
  deleteMachine: "fsm.authoring.delete_machine"
} as const

export const FSM_AUTHORING_OPTIONAL_METHODS = {
  export: "fsm.authoring.export",
  listVersions: "fsm.authoring.list_versions",
  getVersion: "fsm.authoring.get_version",
  diffVersions: "fsm.authoring.diff_versions"
} as const

export type RuntimeMethodName = (typeof FSM_RUNTIME_METHODS)[keyof typeof FSM_RUNTIME_METHODS]
export type AuthoringMethodName = (typeof FSM_AUTHORING_METHODS)[keyof typeof FSM_AUTHORING_METHODS]
export type OptionalAuthoringMethodName = (typeof FSM_AUTHORING_OPTIONAL_METHODS)[keyof typeof FSM_AUTHORING_OPTIONAL_METHODS]

export interface BuilderRequestMeta {
  actorId?: string
  roles?: string[]
  tenant?: string
  requestId?: string
  correlationId?: string
  permissions?: string[]
  scope?: Record<string, unknown>
  headers?: Record<string, string>
  params?: Record<string, string>
  query?: Record<string, string[]>
}

export interface BuilderRequestEnvelope<TData> {
  data: TData
  meta?: BuilderRequestMeta
}

export interface BuilderErrorEnvelope {
  code: string
  message: string
  category?: string
  retryable?: boolean
  details?: Record<string, unknown>
}

export interface BuilderResponseEnvelope<TData> {
  data?: TData
  error?: BuilderErrorEnvelope
}

export interface JSONRPCRequest<TParams> {
  jsonrpc: typeof BUILDER_JSON_RPC_VERSION
  id: string
  method: string
  params: TParams
}

export interface JSONRPCResponse<TResult> {
  jsonrpc: typeof BUILDER_JSON_RPC_VERSION
  id: string
  result?: TResult
  error?: {
    code: string | number
    message: string
    data?: unknown
  }
}

export interface ValidationDiagnostic {
  code: string
  severity: string
  message: string
  path: string
  node_id?: string
  field?: string
}

export interface DraftState {
  is_draft: boolean
  last_saved_at: string
}

export interface MachineStateDefinition {
  name: string
  initial?: boolean
  terminal?: boolean
  metadata?: Record<string, unknown>
  [key: string]: unknown
}

export interface DynamicTransitionTarget {
  resolver: string
  candidates?: string[]
  [key: string]: unknown
}

export interface StepDefinition {
  action_id: string
  async?: boolean
  delay?: string
  timeout?: string
  metadata?: Record<string, unknown>
  [key: string]: unknown
}

export interface WorkflowNodeDefinition {
  id: string
  kind: string
  step?: StepDefinition
  expr?: string
  next?: string[]
  metadata?: Record<string, unknown>
  [key: string]: unknown
}

export interface TransitionDefinition {
  id: string
  event: string
  from: string
  to?: string
  dynamic_to?: DynamicTransitionTarget
  guards?: Array<Record<string, unknown>>
  workflow: {
    nodes: WorkflowNodeDefinition[]
    [key: string]: unknown
  }
  metadata?: Record<string, unknown>
  [key: string]: unknown
}

export interface MachineDefinition {
  id: string
  name: string
  version: string
  states: MachineStateDefinition[]
  transitions: TransitionDefinition[]
  metadata?: Record<string, unknown>
  [key: string]: unknown
}

export interface MachineUISchema {
  layout?: string
  nodes?: Array<Record<string, unknown>>
  edges?: Array<Record<string, unknown>>
  inspector?: Record<string, unknown>
  graph_layout?: Record<string, unknown>
  [key: string]: unknown
}

export interface DraftMachineDocument {
  definition: MachineDefinition
  ui_schema: MachineUISchema
  draft_state: DraftState
  [key: string]: unknown
}

export interface MachineSummary {
  machineId: string
  name: string
  version: string
  isDraft: boolean
  updatedAt: string
}

export interface RuntimeApplyEventRequest {
  machineId?: string
  entityId: string
  event: string
  msg: unknown
  expectedState?: string
  expectedVersion?: number
  idempotencyKey?: string
  metadata?: Record<string, unknown>
  dryRun?: boolean
}

export interface RuntimeGuardRejection {
  code: string
  category: string
  retryable: boolean
  requiresAction: boolean
  message: string
  remediationHint?: string
  metadata?: Record<string, unknown>
}

export interface RuntimeTransitionTarget {
  kind: string
  to?: string
  resolver?: string
  resolved?: boolean
  resolvedTo?: string
  candidates?: string[]
}

export interface RuntimeTransitionInfo {
  id: string
  event: string
  target: RuntimeTransitionTarget
  allowed: boolean
  rejections?: RuntimeGuardRejection[]
  metadata?: Record<string, unknown>
}

export interface RuntimeSnapshotPayload {
  entityID: string
  currentState: string
  allowedTransitions: RuntimeTransitionInfo[]
  metadata?: Record<string, unknown>
}

export interface RuntimeApplyEventResponse {
  eventID: string
  version: number
  transition: {
    previousState: string
    currentState: string
    effects: unknown[]
  }
  snapshot: RuntimeSnapshotPayload
  execution?: {
    executionID: string
    policy?: string
    status: string
    metadata?: Record<string, unknown>
  }
  idempotencyHit?: boolean
}

export interface RuntimeSnapshotRequest {
  machineId?: string
  entityId: string
  msg: unknown
  evaluateGuards?: boolean
  includeBlocked?: boolean
}

export interface AuthoringListMachinesRequest {
  query?: string
  includeDrafts?: boolean
  limit?: number
  cursor?: string
}

export interface AuthoringListMachinesResponse {
  items: MachineSummary[]
  nextCursor?: string
}

export interface AuthoringGetMachineRequest {
  machineId: string
  version?: string
  preferDraft?: boolean
}

export interface AuthoringGetMachineResponse {
  machineId: string
  version: string
  draft: DraftMachineDocument
  diagnostics: ValidationDiagnostic[]
  etag?: string
}

export interface AuthoringSaveDraftRequest {
  machineId: string
  baseVersion?: string
  draft: DraftMachineDocument
  validate?: boolean
}

export interface AuthoringSaveDraftResponse {
  machineId: string
  version: string
  draftState: DraftState
  diagnostics: ValidationDiagnostic[]
  etag: string
}

export interface AuthoringValidateRequest {
  machineId?: string
  draft?: DraftMachineDocument
  scope?: {
    nodeIds?: string[]
  }
}

export interface AuthoringValidateResponse {
  valid: boolean
  diagnostics: ValidationDiagnostic[]
}

export interface AuthoringPublishRequest {
  machineId: string
  expectedVersion?: string
  draft?: DraftMachineDocument
}

export interface AuthoringPublishResponse {
  machineId: string
  version: string
  publishedAt: string
  diagnostics: ValidationDiagnostic[]
}

export interface AuthoringDeleteMachineRequest {
  machineId: string
  expectedVersion?: string
  hardDelete?: boolean
}

export interface AuthoringDeleteMachineResponse {
  machineId: string
  deleted: boolean
}

export interface AuthoringVersionSummary {
  version: string
  etag?: string
  updatedAt: string
  publishedAt?: string
  isDraft: boolean
}

export interface AuthoringListVersionsRequest {
  machineId: string
  limit?: number
  cursor?: string
}

export interface AuthoringListVersionsResponse {
  machineId: string
  items: AuthoringVersionSummary[]
  nextCursor?: string
}

export interface AuthoringGetVersionRequest {
  machineId: string
  version: string
}

export interface AuthoringGetVersionResponse {
  machineId: string
  version: string
  draft: DraftMachineDocument
  diagnostics: ValidationDiagnostic[]
  etag?: string
}

export interface AuthoringDiffChange {
  path: string
  changeType: string
}

export interface AuthoringDiffVersionsRequest {
  machineId: string
  baseVersion: string
  targetVersion: string
}

export interface AuthoringDiffVersionsResponse {
  machineId: string
  baseVersion: string
  targetVersion: string
  hasConflicts: boolean
  changes: AuthoringDiffChange[]
  conflictPaths?: string[]
}

export const HANDLED_ERROR_CODES = {
  versionConflict: "FSM_VERSION_CONFLICT",
  idempotencyConflict: "FSM_IDEMPOTENCY_CONFLICT",
  guardRejected: "FSM_GUARD_REJECTED",
  invalidTransition: "FSM_INVALID_TRANSITION",
  stateNotFound: "FSM_STATE_NOT_FOUND",
  authoringNotFound: "FSM_AUTHORING_NOT_FOUND",
  authoringValidationFailed: "FSM_AUTHORING_VALIDATION_FAILED",
  internal: "FSM_INTERNAL"
} as const

export type HandledErrorCode = (typeof HANDLED_ERROR_CODES)[keyof typeof HANDLED_ERROR_CODES]

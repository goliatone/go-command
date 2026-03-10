import type {
  DraftMachineDocument,
  DraftState,
  MachineDefinition,
  TransitionDefinition,
  ValidationDiagnostic,
  WorkflowNodeDefinition
} from "./contracts"

export const SUPPORTED_WORKFLOW_NODE_KINDS = ["step", "when"] as const
export const UNSUPPORTED_WORKFLOW_NODE_KINDS = ["parallel", "join", "batch", "compensation"] as const

type SupportedWorkflowNodeKind = (typeof SUPPORTED_WORKFLOW_NODE_KINDS)[number]

export function isSupportedWorkflowNodeKind(kind: string): kind is SupportedWorkflowNodeKind {
  return (SUPPORTED_WORKFLOW_NODE_KINDS as readonly string[]).includes(kind)
}

export function isExplicitlyUnsupportedWorkflowNodeKind(kind: string): boolean {
  return (UNSUPPORTED_WORKFLOW_NODE_KINDS as readonly string[]).includes(kind)
}

export function collectUnsupportedWorkflowKinds(definition: MachineDefinition): string[] {
  const found = new Set<string>()
  for (const transition of definition.transitions) {
    for (const node of transition.workflow?.nodes ?? []) {
      if (isExplicitlyUnsupportedWorkflowNodeKind(node.kind)) {
        found.add(node.kind)
      }
    }
  }
  return [...found]
}

export function defaultDraftMachineDocument(): DraftMachineDocument {
  const definition: MachineDefinition = {
    id: "machine",
    name: "Machine",
    version: "v1",
    states: [{ name: "draft", initial: true }],
    transitions: []
  }

  return {
    definition,
    ui_schema: {
      layout: "flow",
      nodes: [],
      edges: [],
      inspector: {},
      graph_layout: {}
    },
    draft_state: {
      is_draft: true,
      last_saved_at: new Date(0).toISOString()
    }
  }
}

export function deepClone<T>(value: T): T {
  if (typeof structuredClone === "function") {
    return structuredClone(value)
  }
  return JSON.parse(JSON.stringify(value)) as T
}

export function serializeDraftDocument(document: DraftMachineDocument): string {
  return JSON.stringify(document)
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>
  }
  return null
}

function isMachineDefinitionLike(value: unknown): value is MachineDefinition {
  const record = asRecord(value)
  if (!record) {
    return false
  }
  return Array.isArray(record.states) && Array.isArray(record.transitions)
}

function normalizeDraftState(input: unknown, fallback: DraftState): DraftState {
  const record = asRecord(input)
  if (!record) {
    return deepClone(fallback)
  }
  return {
    is_draft: typeof record.is_draft === "boolean" ? record.is_draft : fallback.is_draft,
    last_saved_at:
      typeof record.last_saved_at === "string" && record.last_saved_at.trim() !== ""
        ? record.last_saved_at
        : fallback.last_saved_at
  }
}

function normalizeDraftDocumentLike(input: DraftMachineDocument): DraftMachineDocument {
  const fallback = defaultDraftMachineDocument()
  const clone = deepClone(input)
  const normalized: DraftMachineDocument = {
    ...fallback,
    ...clone,
    definition: deepClone(clone.definition),
    ui_schema: asRecord(clone.ui_schema) ? deepClone(clone.ui_schema) : deepClone(fallback.ui_schema),
    draft_state: normalizeDraftState(clone.draft_state, fallback.draft_state)
  }
  return normalized
}

function wrapMachineDefinition(definition: MachineDefinition): DraftMachineDocument {
  const fallback = defaultDraftMachineDocument()
  return {
    ...fallback,
    definition: deepClone(definition)
  }
}

function extractDraftCandidate(input: unknown): unknown {
  const record = asRecord(input)
  if (!record) {
    return input
  }
  if ("draft" in record) {
    return record.draft
  }
  return input
}

export function normalizeInitialDocumentInput(input: unknown): DraftMachineDocument {
  const candidate = extractDraftCandidate(input)
  const candidateRecord = asRecord(candidate)
  if (!candidateRecord) {
    return defaultDraftMachineDocument()
  }

  if (isMachineDefinitionLike(candidateRecord.definition)) {
    return normalizeDraftDocumentLike(candidateRecord as DraftMachineDocument)
  }

  if (isMachineDefinitionLike(candidate)) {
    return wrapMachineDefinition(candidate)
  }

  return defaultDraftMachineDocument()
}

export function transitionLabel(transition: TransitionDefinition): string {
  const event = transition.event || "(event)"
  const target = transition.to || transition.dynamic_to?.resolver || "(target)"
  return `${event} -> ${target}`
}

export type Selection =
  | { kind: "machine" }
  | { kind: "state"; stateIndex: number }
  | { kind: "transition"; transitionIndex: number }
  | { kind: "workflow-node"; transitionIndex: number; nodeIndex: number }

export function selectionEquals(a: Selection, b: Selection): boolean {
  if (a.kind !== b.kind) {
    return false
  }
  if (a.kind === "machine") {
    return true
  }
  if (a.kind === "state" && b.kind === "state") {
    return a.stateIndex === b.stateIndex
  }
  if (a.kind === "transition" && b.kind === "transition") {
    return a.transitionIndex === b.transitionIndex
  }
  if (a.kind === "workflow-node" && b.kind === "workflow-node") {
    return a.transitionIndex === b.transitionIndex && a.nodeIndex === b.nodeIndex
  }
  return false
}

export function diagnosticsForSelection(diagnostics: ValidationDiagnostic[], selection: Selection): ValidationDiagnostic[] {
  return diagnostics.filter((diagnostic) => diagnosticMatchesSelection(diagnostic, selection))
}

export function diagnosticsForSelectionField(
  diagnostics: ValidationDiagnostic[],
  selection: Selection,
  field: string
): ValidationDiagnostic[] {
  return diagnostics.filter((diagnostic) => {
    if (!diagnosticMatchesSelection(diagnostic, selection)) {
      return false
    }
    return diagnostic.field === field || diagnostic.path.endsWith(`.${field}`)
  })
}

function diagnosticMatchesSelection(diagnostic: ValidationDiagnostic, selection: Selection): boolean {
  const path = diagnostic.path
  switch (selection.kind) {
    case "machine":
      return true
    case "state": {
      const index = selection.stateIndex
      return path.includes(`states[${index}]`)
    }
    case "transition": {
      const index = selection.transitionIndex
      return path.includes(`transitions[${index}]`)
    }
    case "workflow-node": {
      const { transitionIndex, nodeIndex } = selection
      return path.includes(`transitions[${transitionIndex}]`) && path.includes(`workflow.nodes[${nodeIndex}]`)
    }
  }
}

function parseFirstInt(path: string, pattern: RegExp): number | null {
  const match = path.match(pattern)
  if (!match?.[1]) {
    return null
  }
  const value = Number.parseInt(match[1], 10)
  return Number.isNaN(value) ? null : value
}

function findWorkflowNodeSelectionByID(definition: MachineDefinition, nodeID: string): Selection | null {
  for (let transitionIndex = 0; transitionIndex < definition.transitions.length; transitionIndex += 1) {
    const nodes = definition.transitions[transitionIndex]?.workflow?.nodes ?? []
    for (let nodeIndex = 0; nodeIndex < nodes.length; nodeIndex += 1) {
      if (nodes[nodeIndex]?.id === nodeID) {
        return { kind: "workflow-node", transitionIndex, nodeIndex }
      }
    }
  }
  return null
}

function findTransitionSelectionByID(definition: MachineDefinition, transitionID: string): Selection | null {
  const transitionIndex = definition.transitions.findIndex((transition) => transition.id === transitionID)
  if (transitionIndex === -1) {
    return null
  }
  return { kind: "transition", transitionIndex }
}

function findStateSelectionByID(definition: MachineDefinition, stateID: string): Selection | null {
  const stateIndex = definition.states.findIndex((state) => state.name === stateID)
  if (stateIndex === -1) {
    return null
  }
  return { kind: "state", stateIndex }
}

export function mapDiagnosticToSelection(definition: MachineDefinition, diagnostic: ValidationDiagnostic): Selection | null {
  if (diagnostic.node_id) {
    return (
      findWorkflowNodeSelectionByID(definition, diagnostic.node_id) ||
      findTransitionSelectionByID(definition, diagnostic.node_id) ||
      findStateSelectionByID(definition, diagnostic.node_id)
    )
  }

  const workflowTransitionIndex = parseFirstInt(diagnostic.path, /transitions\[(\d+)\]/)
  const workflowNodeIndex = parseFirstInt(diagnostic.path, /workflow\.nodes\[(\d+)\]/)
  if (workflowTransitionIndex !== null && workflowNodeIndex !== null) {
    return {
      kind: "workflow-node",
      transitionIndex: workflowTransitionIndex,
      nodeIndex: workflowNodeIndex
    }
  }

  const transitionIndex = parseFirstInt(diagnostic.path, /transitions\[(\d+)\]/)
  if (transitionIndex !== null) {
    return { kind: "transition", transitionIndex }
  }

  const stateIndex = parseFirstInt(diagnostic.path, /states\[(\d+)\]/)
  if (stateIndex !== null) {
    return { kind: "state", stateIndex }
  }

  return null
}

function makeDiagnostic(input: {
  code: string
  message: string
  path: string
  nodeID?: string
  field?: string
}): ValidationDiagnostic {
  return {
    code: input.code,
    severity: "error",
    message: input.message,
    path: input.path,
    node_id: input.nodeID,
    field: input.field
  }
}

function validateWorkflowNode(
  transition: TransitionDefinition,
  transitionIndex: number,
  node: WorkflowNodeDefinition,
  nodeIndex: number,
  out: ValidationDiagnostic[]
): void {
  const basePath = `$.transitions[${transitionIndex}].workflow.nodes[${nodeIndex}]`

  if (!isSupportedWorkflowNodeKind(node.kind)) {
    const unsupported = isExplicitlyUnsupportedWorkflowNodeKind(node.kind)
      ? `${node.kind} is unsupported in builder v1`
      : `unsupported workflow node kind ${node.kind}`
    out.push(
      makeDiagnostic({
        code: "FSM002_INVALID_WORKFLOW_NODE",
        message: unsupported,
        path: `${basePath}.kind`,
        nodeID: node.id,
        field: "kind"
      })
    )
    return
  }

  if (node.kind === "step") {
    const actionID = node.step?.action_id?.trim() ?? ""
    if (actionID === "") {
      out.push(
        makeDiagnostic({
          code: "FSM001_UNRESOLVED_ACTION",
          message: "step action_id is required",
          path: `${basePath}.step.action_id`,
          nodeID: node.id,
          field: "action_id"
        })
      )
    }
  }

  if (node.kind === "when") {
    const expr = node.expr?.trim() ?? ""
    if (expr === "") {
      out.push(
        makeDiagnostic({
          code: "FSM002_INVALID_WORKFLOW_NODE",
          message: "when node requires expression",
          path: `${basePath}.expr`,
          nodeID: node.id,
          field: "expr"
        })
      )
    }
  }

  if (Array.isArray(node.next)) {
    for (const target of node.next) {
      const found = transition.workflow.nodes.some((candidate) => candidate.id === target)
      if (!found) {
        out.push(
          makeDiagnostic({
            code: "FSM002_INVALID_WORKFLOW_NODE",
            message: `workflow next references unknown node ${target}`,
            path: `${basePath}.next`,
            nodeID: node.id,
            field: "next"
          })
        )
      }
    }
  }
}

export function validateDefinition(definition: MachineDefinition): ValidationDiagnostic[] {
  const diagnostics: ValidationDiagnostic[] = []

  definition.states.forEach((state, stateIndex) => {
    if (!state.name || state.name.trim() === "") {
      diagnostics.push(
        makeDiagnostic({
          code: "FSM003_UNKNOWN_STATE",
          message: "state name is required",
          path: `$.states[${stateIndex}].name`,
          field: "name"
        })
      )
    }
  })

  definition.transitions.forEach((transition, transitionIndex) => {
    const basePath = `$.transitions[${transitionIndex}]`
    if (!transition.event || transition.event.trim() === "") {
      diagnostics.push(
        makeDiagnostic({
          code: "FSM004_DUPLICATE_TRANSITION",
          message: "transition event is required",
          path: `${basePath}.event`,
          nodeID: transition.id,
          field: "event"
        })
      )
    }

    if (!transition.from || transition.from.trim() === "") {
      diagnostics.push(
        makeDiagnostic({
          code: "FSM003_UNKNOWN_STATE",
          message: "transition from is required",
          path: `${basePath}.from`,
          nodeID: transition.id,
          field: "from"
        })
      )
    }

    const hasStaticTarget = Boolean(transition.to && transition.to.trim() !== "")
    const hasDynamicTarget = Boolean(transition.dynamic_to?.resolver && transition.dynamic_to.resolver.trim() !== "")
    if (hasStaticTarget === hasDynamicTarget) {
      diagnostics.push(
        makeDiagnostic({
          code: "FSM001_INVALID_TARGET",
          message: "transition target must define exactly one of to or dynamic resolver",
          path: `${basePath}.target`,
          nodeID: transition.id,
          field: "target"
        })
      )
    }

    if (!transition.workflow || transition.workflow.nodes.length === 0) {
      diagnostics.push(
        makeDiagnostic({
          code: "FSM005_MISSING_WORKFLOW",
          message: "transition workflow requires at least one node",
          path: `${basePath}.workflow`,
          nodeID: transition.id,
          field: "workflow"
        })
      )
      return
    }

    transition.workflow.nodes.forEach((node, nodeIndex) => {
      validateWorkflowNode(transition, transitionIndex, node, nodeIndex, diagnostics)
    })
  })

  return diagnostics
}

import { createStore, type StoreApi } from "zustand/vanilla"
import { produce } from "immer"

import type {
  DraftState,
  DraftMachineDocument,
  MachineDefinition,
  TransitionDefinition,
  ValidationDiagnostic,
  WorkflowNodeDefinition
} from "../contracts"
import {
  isSupportedWorkflowNodeKind,
  deepClone,
  defaultDraftMachineDocument,
  mapDiagnosticToSelection,
  serializeDraftDocument,
  type Selection,
  validateDefinition
} from "../document"
import {
  readGraphNodePositions,
  reindexGraphNodePositionsAfterStateMove,
  reindexGraphNodePositionsAfterStateRemoval,
  stableStateNodeID,
  withGraphNodePositions,
  type GraphNodePosition
} from "../utils/graphLayout"

interface HistoryEntry {
  document: DraftMachineDocument
  selection: Selection
  diagnostics: ValidationDiagnostic[]
  targetCache: TargetCache
  transaction: string
}

interface CommitTransactionOptions {
  diagnosticsResolver?: (document: DraftMachineDocument, state: MachineStoreState) => ValidationDiagnostic[]
  resetValidationScope?: boolean
}

interface TransitionTargetCacheEntry {
  staticTo?: string
  dynamicTarget?: TransitionDefinition["dynamic_to"]
}

type TargetCache = Record<string, TransitionTargetCacheEntry>

export interface MachineStoreState {
  document: DraftMachineDocument
  selection: Selection
  diagnostics: ValidationDiagnostic[]
  pendingValidationNodeIDs: string[]
  targetCache: TargetCache
  history: HistoryEntry[]
  historyIndex: number
  baselineHash: string
  isDirty: boolean
  setSelection(selection: Selection): void
  replaceDocument(document: DraftMachineDocument, diagnostics?: ValidationDiagnostic[]): void
  setDiagnostics(diagnostics: ValidationDiagnostic[]): void
  consumeValidationScopeNodeIDs(): string[]
  focusDiagnostic(diagnostic: ValidationDiagnostic): void
  setMachineName(name: string): void
  addState(): void
  addStateFromPalette(input: {
    namePrefix: string
    initial?: boolean
    terminal?: boolean
    position?: GraphNodePosition
  }): void
  removeState(stateIndex: number): void
  moveState(fromIndex: number, toIndex: number): void
  updateStateName(stateIndex: number, name: string): void
  updateStateFlag(stateIndex: number, field: "initial" | "terminal", value: boolean): void
  addTransition(): void
  removeTransition(transitionIndex: number): void
  moveTransition(fromIndex: number, toIndex: number): void
  updateTransition(
    transitionIndex: number,
    field: "event" | "from" | "to" | "dynamic_to.resolver",
    value: string
  ): void
  updateTransitionTargetKind(transitionIndex: number, kind: "static" | "dynamic"): void
  addWorkflowNode(transitionIndex: number, kind: "step" | "when"): void
  removeWorkflowNode(transitionIndex: number, nodeIndex: number): void
  selectWorkflowNode(transitionIndex: number, nodeIndex: number): void
  updateWorkflowNodeField(
    transitionIndex: number,
    nodeIndex: number,
    field: "action_id" | "async" | "delay" | "timeout" | "expr",
    value: string | boolean
  ): void
  updateWorkflowNodeMetadata(transitionIndex: number, nodeIndex: number, metadata: Record<string, unknown>): void
  setGraphNodePosition(stateIndex: number, position: GraphNodePosition): void
  setGraphNodePositions(positions: Record<string, GraphNodePosition>): void
  restoreDocument(document: DraftMachineDocument, diagnostics?: ValidationDiagnostic[]): void
  undo(): void
  redo(): void
  markSaved(): void
  applyRemoteSave(version: string, draftState: DraftState, diagnostics: ValidationDiagnostic[]): void
}

export type MachineStore = StoreApi<MachineStoreState>

export interface CreateMachineStoreInput {
  document?: DraftMachineDocument
  diagnostics?: ValidationDiagnostic[]
}

function clampIndex(value: number, max: number): number {
  if (max <= 0) {
    return 0
  }
  return Math.min(Math.max(0, value), max - 1)
}

function moveArrayItem<T>(items: T[], fromIndex: number, toIndex: number): void {
  if (fromIndex === toIndex) {
    return
  }
  const [moved] = items.splice(fromIndex, 1)
  if (moved === undefined) {
    return
  }
  items.splice(toIndex, 0, moved)
}

function movedSelectionIndex(index: number, fromIndex: number, toIndex: number): number {
  if (index === fromIndex) {
    return toIndex
  }
  if (fromIndex < toIndex && index > fromIndex && index <= toIndex) {
    return index - 1
  }
  if (fromIndex > toIndex && index >= toIndex && index < fromIndex) {
    return index + 1
  }
  return index
}

function normalizeDiagnostics(document: DraftMachineDocument, external: ValidationDiagnostic[] = []): ValidationDiagnostic[] {
  const validated = validateDefinition(document.definition)
  if (external.length === 0) {
    return validated
  }
  return [...external, ...validated]
}

function transitionCacheKey(_transition: TransitionDefinition, transitionIndex: number): string {
  return `index:${transitionIndex}`
}

function sanitizeStateNamePrefix(prefix: string): string {
  const normalized = prefix.trim().replace(/\s+/g, "_")
  if (normalized === "") {
    return "state"
  }
  return normalized
}

function nextUniqueStateName(definition: MachineDefinition, prefix: string, seed: number): string {
  const normalizedPrefix = sanitizeStateNamePrefix(prefix)
  const existingNames = new Set(definition.states.map((state) => state.name))
  let suffix = Math.max(1, seed)
  let candidate = `${normalizedPrefix}_${suffix}`
  while (existingNames.has(candidate)) {
    suffix += 1
    candidate = `${normalizedPrefix}_${suffix}`
  }
  return candidate
}

function uniqueNodeIDs(nodeIDs: string[]): string[] {
  const unique = new Set<string>()
  for (const nodeID of nodeIDs) {
    const normalized = nodeID.trim()
    if (normalized === "") {
      continue
    }
    unique.add(normalized)
  }
  return [...unique]
}

function collectTransitionScopedNodeIDs(transition: TransitionDefinition | undefined): string[] {
  if (!transition) {
    return []
  }
  const nodeIDs: string[] = [transition.id]
  for (const node of transition.workflow?.nodes ?? []) {
    nodeIDs.push(node.id)
  }
  return uniqueNodeIDs(nodeIDs)
}

function diagnosticsRulesAffected(previous: DraftMachineDocument, next: DraftMachineDocument): boolean {
  return previous.definition.states !== next.definition.states || previous.definition.transitions !== next.definition.transitions
}

function collectChangedValidationNodeIDs(previousDocument: DraftMachineDocument, nextDocument: DraftMachineDocument): string[] {
  if (previousDocument.definition.states !== nextDocument.definition.states) {
    // State-level edits can invalidate global diagnostics in ways scoped node IDs cannot fully represent.
    return []
  }

  if (previousDocument.definition.transitions === nextDocument.definition.transitions) {
    return []
  }

  const previousTransitions = previousDocument.definition.transitions
  const nextTransitions = nextDocument.definition.transitions
  const changedNodeIDs: string[] = []
  const transitionCount = Math.max(previousTransitions.length, nextTransitions.length)

  for (let transitionIndex = 0; transitionIndex < transitionCount; transitionIndex += 1) {
    const previousTransition = previousTransitions[transitionIndex]
    const nextTransition = nextTransitions[transitionIndex]
    if (previousTransition === nextTransition) {
      continue
    }
    changedNodeIDs.push(...collectTransitionScopedNodeIDs(previousTransition))
    changedNodeIDs.push(...collectTransitionScopedNodeIDs(nextTransition))
  }

  return uniqueNodeIDs(changedNodeIDs)
}

function buildTargetCache(document: DraftMachineDocument): TargetCache {
  const cache: TargetCache = {}
  document.definition.transitions.forEach((transition, transitionIndex) => {
    cache[transitionCacheKey(transition, transitionIndex)] = {
      staticTo: transition.to,
      dynamicTarget: transition.dynamic_to ? deepClone(transition.dynamic_to) : undefined
    }
  })
  return cache
}

function ensureTargetCacheEntry(
  cache: TargetCache,
  transition: TransitionDefinition,
  transitionIndex: number
): TransitionTargetCacheEntry {
  const key = transitionCacheKey(transition, transitionIndex)
  const entry = cache[key]
  if (entry) {
    return entry
  }
  const created: TransitionTargetCacheEntry = {
    staticTo: transition.to,
    dynamicTarget: transition.dynamic_to ? deepClone(transition.dynamic_to) : undefined
  }
  cache[key] = created
  return created
}

function reindexTargetCacheAfterRemoval(cache: TargetCache, removedIndex: number): TargetCache {
  const next: TargetCache = {}
  for (const [key, entry] of Object.entries(cache)) {
    if (!key.startsWith("index:")) {
      next[key] = entry
      continue
    }
    const rawIndex = Number.parseInt(key.slice("index:".length), 10)
    if (Number.isNaN(rawIndex)) {
      next[key] = entry
      continue
    }
    if (rawIndex === removedIndex) {
      continue
    }
    if (rawIndex > removedIndex) {
      next[`index:${rawIndex - 1}`] = entry
      continue
    }
    next[key] = entry
  }
  return next
}

function nextStateFromHistory(
  history: HistoryEntry[],
  historyIndex: number,
  baselineHash: string,
  pendingValidationNodeIDs: string[] = []
): Pick<
  MachineStoreState,
  | "document"
  | "selection"
  | "diagnostics"
  | "pendingValidationNodeIDs"
  | "targetCache"
  | "history"
  | "historyIndex"
  | "baselineHash"
  | "isDirty"
> {
  const safeIndex = clampIndex(historyIndex, history.length)
  const current = history[safeIndex]
  const hash = serializeDraftDocument(current.document)
  return {
    document: current.document,
    selection: current.selection,
    diagnostics: current.diagnostics,
    pendingValidationNodeIDs,
    targetCache: current.targetCache,
    history,
    historyIndex: safeIndex,
    baselineHash,
    isDirty: hash !== baselineHash
  }
}

function ensureTransitionWorkflow(transition: TransitionDefinition): TransitionDefinition {
  if (!transition.workflow) {
    transition.workflow = { nodes: [] }
  }
  if (!Array.isArray(transition.workflow.nodes)) {
    transition.workflow.nodes = []
  }
  return transition
}

function commitTransaction(
  store: MachineStore,
  transaction: string,
  produceDocument: (document: DraftMachineDocument, state: MachineStoreState, targetCache: TargetCache) => void,
  nextSelectionResolver?: (document: DraftMachineDocument, state: MachineStoreState) => Selection,
  options: CommitTransactionOptions = {}
): void {
  store.setState((state) => {
    const nextTransactionState = produce(
      {
        document: state.document,
        targetCache: state.targetCache
      },
      (draft) => {
        produceDocument(draft.document, state, draft.targetCache)
      }
    )

    const document = nextTransactionState.document
    const targetCache = nextTransactionState.targetCache
    const diagnosticsAffected = diagnosticsRulesAffected(state.document, document)
    const diagnostics = options.diagnosticsResolver
      ? options.diagnosticsResolver(document, state)
      : diagnosticsAffected
        ? normalizeDiagnostics(document)
        : state.diagnostics
    const selection = nextSelectionResolver ? nextSelectionResolver(document, state) : state.selection

    let pendingValidationNodeIDs = state.pendingValidationNodeIDs
    if (options.resetValidationScope) {
      pendingValidationNodeIDs = []
    } else if (diagnosticsAffected) {
      const statesChanged = state.document.definition.states !== document.definition.states
      const transitionsChanged = state.document.definition.transitions !== document.definition.transitions
      const changedNodeIDs = collectChangedValidationNodeIDs(state.document, document)
      if (statesChanged || (transitionsChanged && changedNodeIDs.length === 0)) {
        pendingValidationNodeIDs = []
      } else if (changedNodeIDs.length > 0) {
        pendingValidationNodeIDs = uniqueNodeIDs([...state.pendingValidationNodeIDs, ...changedNodeIDs])
      }
    }

    const nextHistory = state.history.slice(0, state.historyIndex + 1)
    nextHistory.push({
      document,
      selection,
      diagnostics,
      targetCache,
      transaction
    })

    return nextStateFromHistory(nextHistory, nextHistory.length - 1, state.baselineHash, pendingValidationNodeIDs)
  })
}

function findDefaultStateName(definition: MachineDefinition): string {
  if (definition.states.length === 0) {
    return ""
  }
  return definition.states[0]?.name ?? ""
}

function buildDefaultWorkflowNode(kind: "step" | "when", index: number): WorkflowNodeDefinition {
  if (kind === "step") {
    return {
      id: `step-${index + 1}`,
      kind,
      step: {
        action_id: "",
        async: false,
        delay: "",
        timeout: "",
        metadata: {}
      },
      next: []
    }
  }

  return {
    id: `when-${index + 1}`,
    kind,
    expr: "",
    next: []
  }
}

function setGraphNodePositionForState(
  document: DraftMachineDocument,
  stateIndex: number,
  position: GraphNodePosition
): void {
  const positions = readGraphNodePositions(document.ui_schema)
  positions[stableStateNodeID(stateIndex)] = {
    x: position.x,
    y: position.y
  }
  document.ui_schema = withGraphNodePositions(document.ui_schema, positions)
}

function setGraphNodePositions(
  document: DraftMachineDocument,
  positions: Record<string, GraphNodePosition>
): void {
  document.ui_schema = withGraphNodePositions(document.ui_schema, positions)
}

export function createMachineStore(input: CreateMachineStoreInput = {}): MachineStore {
  const initialDocument = deepClone(input.document ?? defaultDraftMachineDocument())
  const initialSelection: Selection = { kind: "machine" }
  const initialDiagnostics = normalizeDiagnostics(initialDocument, input.diagnostics)
  const initialTargetCache = buildTargetCache(initialDocument)
  const baselineHash = serializeDraftDocument(initialDocument)

  const initialHistory: HistoryEntry[] = [
    {
      document: initialDocument,
      selection: initialSelection,
      diagnostics: initialDiagnostics,
      targetCache: initialTargetCache,
      transaction: "init"
    }
  ]

  const store = createStore<MachineStoreState>((set, get) => ({
    document: initialDocument,
    selection: initialSelection,
    diagnostics: initialDiagnostics,
    pendingValidationNodeIDs: [],
    targetCache: initialTargetCache,
    history: initialHistory,
    historyIndex: 0,
    baselineHash,
    isDirty: false,
    setSelection(selection) {
      set({ selection })
    },
    replaceDocument(document, diagnostics) {
      set(() => {
        const nextDocument = deepClone(document)
        const normalized = normalizeDiagnostics(nextDocument, diagnostics)
        const targetCache = buildTargetCache(nextDocument)
        const nextSelection: Selection = { kind: "machine" }
        const nextHistory: HistoryEntry[] = [
          {
            document: nextDocument,
            selection: nextSelection,
            diagnostics: normalized,
            targetCache,
            transaction: "replace-document"
          }
        ]
        const nextBaseline = serializeDraftDocument(nextDocument)

        return {
          document: nextDocument,
          selection: nextSelection,
          diagnostics: normalized,
          pendingValidationNodeIDs: [],
          targetCache,
          history: nextHistory,
          historyIndex: 0,
          baselineHash: nextBaseline,
          isDirty: false
        }
      })
    },
    restoreDocument(document, diagnostics) {
      commitTransaction(
        store,
        "restore-document",
        (draft) => {
          const nextDocument = deepClone(document)
          draft.definition = nextDocument.definition
          draft.ui_schema = nextDocument.ui_schema
          draft.draft_state = nextDocument.draft_state
          for (const [key, value] of Object.entries(nextDocument)) {
            if (key === "definition" || key === "ui_schema" || key === "draft_state") {
              continue
            }
            draft[key] = value
          }
          for (const key of Object.keys(draft)) {
            if (key in nextDocument) {
              continue
            }
            if (key === "definition" || key === "ui_schema" || key === "draft_state") {
              continue
            }
            delete draft[key]
          }
        },
        () => ({ kind: "machine" }),
        {
          diagnosticsResolver: diagnostics
            ? (nextDocument) => normalizeDiagnostics(nextDocument, diagnostics)
            : undefined,
          resetValidationScope: true
        }
      )
    },
    setDiagnostics(diagnostics) {
      set((state) => {
        const merged = normalizeDiagnostics(state.document, diagnostics)
        return { diagnostics: merged, pendingValidationNodeIDs: [] }
      })
    },
    consumeValidationScopeNodeIDs() {
      const state = get()
      const nodeIDs = state.pendingValidationNodeIDs
      if (nodeIDs.length > 0) {
        set({ pendingValidationNodeIDs: [] })
      }
      return nodeIDs
    },
    focusDiagnostic(diagnostic) {
      set((state) => {
        const selection = mapDiagnosticToSelection(state.document.definition, diagnostic)
        if (!selection) {
          return state
        }
        return { selection }
      })
    },
    setMachineName(name) {
      commitTransaction(store, "set-machine-name", (document) => {
        document.definition.name = name
      })
    },
    addState() {
      commitTransaction(
        store,
        "add-state",
        (document) => {
          const stateName = nextUniqueStateName(document.definition, "state", document.definition.states.length + 1)
          document.definition.states.push({ name: stateName })
        },
        (document) => ({ kind: "state", stateIndex: Math.max(0, document.definition.states.length - 1) })
      )
    },
    addStateFromPalette(input) {
      commitTransaction(
        store,
        "add-state-from-palette",
        (document) => {
          const stateIndex = document.definition.states.length
          const stateName = nextUniqueStateName(document.definition, input.namePrefix, stateIndex + 1)
          const state: MachineDefinition["states"][number] = {
            name: stateName
          }
          if (input.initial) {
            document.definition.states.forEach((candidate) => {
              candidate.initial = false
            })
            state.initial = true
          }
          if (input.terminal) {
            state.terminal = true
          }
          document.definition.states.push(state)
          if (input.position) {
            setGraphNodePositionForState(document, stateIndex, input.position)
          }
        },
        (document) => ({ kind: "state", stateIndex: Math.max(0, document.definition.states.length - 1) })
      )
    },
    removeState(stateIndex) {
      commitTransaction(
        store,
        "remove-state",
        (document) => {
          if (stateIndex < 0 || stateIndex >= document.definition.states.length) {
            return
          }
          const removed = document.definition.states[stateIndex]?.name
          document.definition.states.splice(stateIndex, 1)
          if (removed) {
            document.definition.transitions.forEach((transition) => {
              if (transition.from === removed) {
                transition.from = findDefaultStateName(document.definition)
              }
              if (transition.to === removed) {
                transition.to = findDefaultStateName(document.definition)
              }
            })
          }
          const positions = readGraphNodePositions(document.ui_schema)
          const reindexedPositions = reindexGraphNodePositionsAfterStateRemoval(positions, stateIndex)
          document.ui_schema = withGraphNodePositions(document.ui_schema, reindexedPositions)
        },
        (document, state) => {
          if (document.definition.states.length === 0) {
            return { kind: "machine" }
          }
          const nextIndex =
            state.selection.kind === "state"
              ? clampIndex(Math.min(state.selection.stateIndex, stateIndex), document.definition.states.length)
              : clampIndex(stateIndex, document.definition.states.length)
          return { kind: "state", stateIndex: nextIndex }
        }
      )
    },
    moveState(fromIndex, toIndex) {
      commitTransaction(
        store,
        "move-state",
        (document) => {
          const count = document.definition.states.length
          if (count < 2) {
            return
          }
          if (fromIndex < 0 || fromIndex >= count || toIndex < 0 || toIndex >= count) {
            return
          }
          if (fromIndex === toIndex) {
            return
          }

          moveArrayItem(document.definition.states, fromIndex, toIndex)

          const positions = readGraphNodePositions(document.ui_schema)
          const reindexedPositions = reindexGraphNodePositionsAfterStateMove(positions, fromIndex, toIndex)
          setGraphNodePositions(document, reindexedPositions)
        },
        (_document, state) => {
          if (state.selection.kind === "state") {
            return {
              kind: "state",
              stateIndex: movedSelectionIndex(state.selection.stateIndex, fromIndex, toIndex)
            }
          }
          return state.selection
        }
      )
    },
    updateStateName(stateIndex, name) {
      commitTransaction(store, "update-state-name", (document) => {
        const state = document.definition.states[stateIndex]
        if (!state) {
          return
        }
        const previous = state.name
        state.name = name
        document.definition.transitions.forEach((transition) => {
          if (transition.from === previous) {
            transition.from = name
          }
          if (transition.to === previous) {
            transition.to = name
          }
        })
      })
    },
    updateStateFlag(stateIndex, field, value) {
      commitTransaction(store, `update-state-${field}`, (document) => {
        const state = document.definition.states[stateIndex]
        if (!state) {
          return
        }
        if (field === "initial" && value) {
          document.definition.states.forEach((candidate) => {
            candidate.initial = false
          })
        }
        state[field] = value
      })
    },
    addTransition() {
      commitTransaction(
        store,
        "add-transition",
        (document, _state, targetCache) => {
          const from = findDefaultStateName(document.definition)
          const to = document.definition.states[1]?.name ?? from
          const transitionIndex = document.definition.transitions.length + 1
          const transition: TransitionDefinition = {
            id: `transition_${transitionIndex}`,
            event: `event_${transitionIndex}`,
            from,
            to,
            workflow: {
              nodes: [buildDefaultWorkflowNode("step", 0)]
            },
            metadata: {}
          }
          document.definition.transitions.push(transition)
          targetCache[transitionCacheKey(transition, document.definition.transitions.length - 1)] = {
            staticTo: transition.to
          }
        },
        (document) => ({ kind: "transition", transitionIndex: Math.max(0, document.definition.transitions.length - 1) })
      )
    },
    removeTransition(transitionIndex) {
      commitTransaction(
        store,
        "remove-transition",
        (document, _state, targetCache) => {
          if (transitionIndex < 0 || transitionIndex >= document.definition.transitions.length) {
            return
          }
          const removedTransition = document.definition.transitions[transitionIndex]
          if (removedTransition) {
            delete targetCache[transitionCacheKey(removedTransition, transitionIndex)]
          }
          document.definition.transitions.splice(transitionIndex, 1)
          const reindexedCache = reindexTargetCacheAfterRemoval(targetCache, transitionIndex)
          Object.keys(targetCache).forEach((key) => {
            delete targetCache[key]
          })
          Object.assign(targetCache, reindexedCache)
        },
        (document) => {
          if (document.definition.transitions.length === 0) {
            return { kind: "machine" }
          }
          return {
            kind: "transition",
            transitionIndex: clampIndex(transitionIndex, document.definition.transitions.length)
          }
        }
      )
    },
    moveTransition(fromIndex, toIndex) {
      commitTransaction(
        store,
        "move-transition",
        (document, _state, targetCache) => {
          const count = document.definition.transitions.length
          if (count < 2) {
            return
          }
          if (fromIndex < 0 || fromIndex >= count || toIndex < 0 || toIndex >= count) {
            return
          }
          if (fromIndex === toIndex) {
            return
          }

          moveArrayItem(document.definition.transitions, fromIndex, toIndex)

          const rebuiltCache = buildTargetCache(document)
          Object.keys(targetCache).forEach((key) => {
            delete targetCache[key]
          })
          Object.assign(targetCache, rebuiltCache)
        },
        (_document, state) => {
          if (state.selection.kind === "transition") {
            return {
              kind: "transition",
              transitionIndex: movedSelectionIndex(state.selection.transitionIndex, fromIndex, toIndex)
            }
          }
          if (state.selection.kind === "workflow-node") {
            return {
              kind: "workflow-node",
              transitionIndex: movedSelectionIndex(state.selection.transitionIndex, fromIndex, toIndex),
              nodeIndex: state.selection.nodeIndex
            }
          }
          return state.selection
        }
      )
    },
    updateTransition(transitionIndex, field, value) {
      commitTransaction(store, `update-transition-${field}`, (document, _state, targetCache) => {
        const transition = document.definition.transitions[transitionIndex]
        if (!transition) {
          return
        }
        const targetEntry = ensureTargetCacheEntry(targetCache, transition, transitionIndex)

        if (field === "event") {
          transition.event = value
          return
        }
        if (field === "from") {
          transition.from = value
          return
        }
        if (field === "to") {
          transition.to = value
          targetEntry.staticTo = value
          return
        }
        if (field === "dynamic_to.resolver") {
          const dynamicTarget = {
            ...(transition.dynamic_to ?? targetEntry.dynamicTarget ?? { resolver: "" }),
            resolver: value
          }
          transition.dynamic_to = dynamicTarget
          targetEntry.dynamicTarget = deepClone(dynamicTarget)
        }
      })
    },
    updateTransitionTargetKind(transitionIndex, kind) {
      commitTransaction(store, "update-transition-target-kind", (document, _state, targetCache) => {
        const transition = document.definition.transitions[transitionIndex]
        if (!transition) {
          return
        }
        const targetEntry = ensureTargetCacheEntry(targetCache, transition, transitionIndex)
        if (transition.to && transition.to.trim() !== "") {
          targetEntry.staticTo = transition.to
        }
        if (transition.dynamic_to?.resolver && transition.dynamic_to.resolver.trim() !== "") {
          targetEntry.dynamicTarget = deepClone(transition.dynamic_to)
        }
        if (kind === "static") {
          transition.dynamic_to = undefined
          const cachedTo = targetEntry.staticTo?.trim() ?? ""
          transition.to = cachedTo || findDefaultStateName(document.definition)
          return
        }
        transition.to = undefined
        transition.dynamic_to = deepClone(targetEntry.dynamicTarget ?? { resolver: "" })
      })
    },
    addWorkflowNode(transitionIndex, kind) {
      commitTransaction(
        store,
        `add-${kind}-workflow-node`,
        (document) => {
          const transition = document.definition.transitions[transitionIndex]
          if (!transition) {
            return
          }
          ensureTransitionWorkflow(transition)
          const nodeIndex = transition.workflow.nodes.length
          transition.workflow.nodes.push(buildDefaultWorkflowNode(kind, nodeIndex))
        },
        (document) => {
          const transition = document.definition.transitions[transitionIndex]
          if (!transition) {
            return { kind: "machine" }
          }
          const nodeIndex = Math.max(0, transition.workflow.nodes.length - 1)
          return { kind: "workflow-node", transitionIndex, nodeIndex }
        }
      )
    },
    removeWorkflowNode(transitionIndex, nodeIndex) {
      commitTransaction(
        store,
        "remove-workflow-node",
        (document) => {
          const transition = document.definition.transitions[transitionIndex]
          if (!transition) {
            return
          }
          ensureTransitionWorkflow(transition)
          if (nodeIndex < 0 || nodeIndex >= transition.workflow.nodes.length) {
            return
          }
          transition.workflow.nodes.splice(nodeIndex, 1)
          transition.workflow.nodes.forEach((node) => {
            if (!Array.isArray(node.next)) {
              return
            }
            node.next = node.next.filter((nextNodeID) =>
              transition.workflow.nodes.some((candidate) => candidate.id === nextNodeID)
            )
          })
        },
        (document) => {
          const transition = document.definition.transitions[transitionIndex]
          if (!transition || transition.workflow.nodes.length === 0) {
            return { kind: "transition", transitionIndex }
          }
          return {
            kind: "workflow-node",
            transitionIndex,
            nodeIndex: clampIndex(nodeIndex, transition.workflow.nodes.length)
          }
        }
      )
    },
    selectWorkflowNode(transitionIndex, nodeIndex) {
      set({ selection: { kind: "workflow-node", transitionIndex, nodeIndex } })
    },
    updateWorkflowNodeField(transitionIndex, nodeIndex, field, value) {
      commitTransaction(store, `update-workflow-node-${field}`, (document) => {
        const transition = document.definition.transitions[transitionIndex]
        if (!transition) {
          return
        }
        ensureTransitionWorkflow(transition)
        const node = transition.workflow.nodes[nodeIndex]
        if (!node) {
          return
        }
        if (!isSupportedWorkflowNodeKind(node.kind)) {
          return
        }

        if (field === "expr") {
          node.expr = String(value)
          return
        }

        node.step = node.step ?? {
          action_id: "",
          async: false,
          delay: "",
          timeout: "",
          metadata: {}
        }

        if (field === "action_id") {
          node.step.action_id = String(value)
          return
        }
        if (field === "async") {
          node.step.async = Boolean(value)
          return
        }
        if (field === "delay") {
          node.step.delay = String(value)
          return
        }
        if (field === "timeout") {
          node.step.timeout = String(value)
        }
      })
    },
    updateWorkflowNodeMetadata(transitionIndex, nodeIndex, metadata) {
      commitTransaction(store, "update-workflow-node-metadata", (document) => {
        const transition = document.definition.transitions[transitionIndex]
        if (!transition) {
          return
        }
        ensureTransitionWorkflow(transition)
        const node = transition.workflow.nodes[nodeIndex]
        if (!node) {
          return
        }
        if (node.kind !== "step") {
          return
        }
        node.step = node.step ?? {
          action_id: "",
          async: false,
          delay: "",
          timeout: "",
          metadata: {}
        }
        node.step.metadata = deepClone(metadata)
      })
    },
    setGraphNodePosition(stateIndex, position) {
      commitTransaction(store, "set-graph-node-position", (document) => {
        const state = document.definition.states[stateIndex]
        if (!state) {
          return
        }
        setGraphNodePositionForState(document, stateIndex, position)
      })
    },
    setGraphNodePositions(positions) {
      commitTransaction(store, "set-graph-node-positions", (document) => {
        setGraphNodePositions(document, positions)
      })
    },
    undo() {
      const state = get()
      if (state.historyIndex === 0) {
        return
      }
      const nextIndex = state.historyIndex - 1
      set(nextStateFromHistory(state.history, nextIndex, state.baselineHash, []))
    },
    redo() {
      const state = get()
      if (state.historyIndex >= state.history.length - 1) {
        return
      }
      const nextIndex = state.historyIndex + 1
      set(nextStateFromHistory(state.history, nextIndex, state.baselineHash, []))
    },
    markSaved() {
      set((state) => {
        const baseline = serializeDraftDocument(state.document)
        return {
          baselineHash: baseline,
          isDirty: false,
          pendingValidationNodeIDs: []
        }
      })
    },
    applyRemoteSave(version, draftState, diagnostics) {
      set((state) => {
        const document = produce(state.document, (draft) => {
          draft.definition.version = version
          draft.draft_state = deepClone(draftState)
        })

        const mergedDiagnostics = normalizeDiagnostics(document, diagnostics)
        const targetCache = buildTargetCache(document)
        const entry: HistoryEntry = {
          document,
          selection: state.selection,
          diagnostics: mergedDiagnostics,
          targetCache,
          transaction: "apply-remote-save"
        }
        const history = state.history.slice(0, state.historyIndex + 1)
        history.push(entry)
        const baseline = serializeDraftDocument(document)
        return nextStateFromHistory(history, history.length - 1, baseline, [])
      })
    }
  }))

  return store
}

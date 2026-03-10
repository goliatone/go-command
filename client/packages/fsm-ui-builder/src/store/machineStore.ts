import { createStore, type StoreApi } from "zustand/vanilla"

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

interface TransitionTargetCacheEntry {
  staticTo?: string
  dynamicTarget?: TransitionDefinition["dynamic_to"]
}

type TargetCache = Record<string, TransitionTargetCacheEntry>

export interface MachineStoreState {
  document: DraftMachineDocument
  selection: Selection
  diagnostics: ValidationDiagnostic[]
  targetCache: TargetCache
  history: HistoryEntry[]
  historyIndex: number
  baselineHash: string
  isDirty: boolean
  setSelection(selection: Selection): void
  replaceDocument(document: DraftMachineDocument, diagnostics?: ValidationDiagnostic[]): void
  setDiagnostics(diagnostics: ValidationDiagnostic[]): void
  focusDiagnostic(diagnostic: ValidationDiagnostic): void
  setMachineName(name: string): void
  addState(): void
  removeState(stateIndex: number): void
  updateStateName(stateIndex: number, name: string): void
  updateStateFlag(stateIndex: number, field: "initial" | "terminal", value: boolean): void
  addTransition(): void
  removeTransition(transitionIndex: number): void
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

function normalizeDiagnostics(document: DraftMachineDocument, external: ValidationDiagnostic[] = []): ValidationDiagnostic[] {
  const validated = validateDefinition(document.definition)
  if (external.length === 0) {
    return validated
  }
  return [...external, ...validated]
}

function transitionCacheKey(transition: TransitionDefinition, transitionIndex: number): string {
  const id = transition.id.trim()
  if (id !== "") {
    return `id:${id}`
  }
  return `index:${transitionIndex}`
}

function cloneTargetCache(input: TargetCache): TargetCache {
  const output: TargetCache = {}
  for (const [key, entry] of Object.entries(input)) {
    output[key] = {
      staticTo: entry.staticTo,
      dynamicTarget: entry.dynamicTarget ? deepClone(entry.dynamicTarget) : undefined
    }
  }
  return output
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

function nextStateFromHistory(history: HistoryEntry[], historyIndex: number, baselineHash: string): Pick<
  MachineStoreState,
  "document" | "selection" | "diagnostics" | "targetCache" | "history" | "historyIndex" | "baselineHash" | "isDirty"
> {
  const safeIndex = clampIndex(historyIndex, history.length)
  const current = history[safeIndex]
  const hash = serializeDraftDocument(current.document)
  return {
    document: deepClone(current.document),
    selection: current.selection,
    diagnostics: [...current.diagnostics],
    targetCache: cloneTargetCache(current.targetCache),
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
  nextSelectionResolver?: (document: DraftMachineDocument, state: MachineStoreState) => Selection
): void {
  store.setState((state) => {
    const document = deepClone(state.document)
    const targetCache = cloneTargetCache(state.targetCache)
    produceDocument(document, state, targetCache)

    const diagnostics = normalizeDiagnostics(document)
    const selection = nextSelectionResolver ? nextSelectionResolver(document, state) : state.selection

    const nextHistory = state.history.slice(0, state.historyIndex + 1)
    nextHistory.push({
      document,
      selection,
      diagnostics,
      targetCache,
      transaction
    })

    return nextStateFromHistory(nextHistory, nextHistory.length - 1, state.baselineHash)
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
      targetCache: cloneTargetCache(initialTargetCache),
      transaction: "init"
    }
  ]

  const store = createStore<MachineStoreState>((set, get) => ({
    document: deepClone(initialDocument),
    selection: initialSelection,
    diagnostics: [...initialDiagnostics],
    targetCache: cloneTargetCache(initialTargetCache),
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
            targetCache: cloneTargetCache(targetCache),
            transaction: "replace-document"
          }
        ]
        const nextBaseline = serializeDraftDocument(nextDocument)

        return {
          document: deepClone(nextDocument),
          selection: nextSelection,
          diagnostics: normalized,
          targetCache: cloneTargetCache(targetCache),
          history: nextHistory,
          historyIndex: 0,
          baselineHash: nextBaseline,
          isDirty: false
        }
      })
    },
    setDiagnostics(diagnostics) {
      set((state) => {
        const merged = normalizeDiagnostics(state.document, diagnostics)
        return { diagnostics: merged }
      })
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
          const stateIndex = document.definition.states.length + 1
          document.definition.states.push({ name: `state_${stateIndex}` })
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
    undo() {
      const state = get()
      if (state.historyIndex === 0) {
        return
      }
      const nextIndex = state.historyIndex - 1
      set(nextStateFromHistory(state.history, nextIndex, state.baselineHash))
    },
    redo() {
      const state = get()
      if (state.historyIndex >= state.history.length - 1) {
        return
      }
      const nextIndex = state.historyIndex + 1
      set(nextStateFromHistory(state.history, nextIndex, state.baselineHash))
    },
    markSaved() {
      set((state) => {
        const baseline = serializeDraftDocument(state.document)
        return {
          baselineHash: baseline,
          isDirty: false
        }
      })
    },
    applyRemoteSave(version, draftState, diagnostics) {
      set((state) => {
        const document = deepClone(state.document)
        document.definition.version = version
        document.draft_state = deepClone(draftState)

        const mergedDiagnostics = normalizeDiagnostics(document, diagnostics)
        const targetCache = buildTargetCache(document)
        const entry: HistoryEntry = {
          document,
          selection: state.selection,
          diagnostics: mergedDiagnostics,
          targetCache: cloneTargetCache(targetCache),
          transaction: "apply-remote-save"
        }
        const history = state.history.slice(0, state.historyIndex + 1)
        history.push(entry)
        const baseline = serializeDraftDocument(document)
        return nextStateFromHistory(history, history.length - 1, baseline)
      })
    }
  }))

  return store
}

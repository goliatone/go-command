import { createStore, type StoreApi } from "zustand/vanilla"

import type {
  DraftMachineDocument,
  MachineDefinition,
  TransitionDefinition,
  ValidationDiagnostic,
  WorkflowNodeDefinition
} from "../contracts"
import {
  deepClone,
  defaultDraftMachineDocument,
  mapDiagnosticToSelection,
  serializeDraftDocument,
  type Selection,
  validateDefinition
} from "../document"

interface HistoryEntry {
  document: DraftMachineDocument
  selection: Selection
  diagnostics: ValidationDiagnostic[]
  transaction: string
}

export interface MachineStoreState {
  document: DraftMachineDocument
  selection: Selection
  diagnostics: ValidationDiagnostic[]
  history: HistoryEntry[]
  historyIndex: number
  baselineHash: string
  isDirty: boolean
  setSelection(selection: Selection): void
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
  undo(): void
  redo(): void
  markSaved(): void
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

function nextStateFromHistory(history: HistoryEntry[], historyIndex: number, baselineHash: string): Pick<
  MachineStoreState,
  "document" | "selection" | "diagnostics" | "history" | "historyIndex" | "baselineHash" | "isDirty"
> {
  const safeIndex = clampIndex(historyIndex, history.length)
  const current = history[safeIndex]
  const hash = serializeDraftDocument(current.document)
  return {
    document: deepClone(current.document),
    selection: current.selection,
    diagnostics: [...current.diagnostics],
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
  produceDocument: (document: DraftMachineDocument, state: MachineStoreState) => void,
  nextSelectionResolver?: (document: DraftMachineDocument, state: MachineStoreState) => Selection
): void {
  store.setState((state) => {
    const document = deepClone(state.document)
    produceDocument(document, state)

    const diagnostics = normalizeDiagnostics(document)
    const selection = nextSelectionResolver ? nextSelectionResolver(document, state) : state.selection

    const nextHistory = state.history.slice(0, state.historyIndex + 1)
    nextHistory.push({
      document,
      selection,
      diagnostics,
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

export function createMachineStore(input: CreateMachineStoreInput = {}): MachineStore {
  const initialDocument = deepClone(input.document ?? defaultDraftMachineDocument())
  const initialSelection: Selection = { kind: "machine" }
  const initialDiagnostics = normalizeDiagnostics(initialDocument, input.diagnostics)
  const baselineHash = serializeDraftDocument(initialDocument)

  const initialHistory: HistoryEntry[] = [
    {
      document: initialDocument,
      selection: initialSelection,
      diagnostics: initialDiagnostics,
      transaction: "init"
    }
  ]

  const store = createStore<MachineStoreState>((set, get) => ({
    document: deepClone(initialDocument),
    selection: initialSelection,
    diagnostics: [...initialDiagnostics],
    history: initialHistory,
    historyIndex: 0,
    baselineHash,
    isDirty: false,
    setSelection(selection) {
      set({ selection })
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
        (document) => {
          const from = findDefaultStateName(document.definition)
          const to = document.definition.states[1]?.name ?? from
          const transitionIndex = document.definition.transitions.length + 1
          document.definition.transitions.push({
            id: `transition_${transitionIndex}`,
            event: `event_${transitionIndex}`,
            from,
            to,
            workflow: {
              nodes: [buildDefaultWorkflowNode("step", 0)]
            },
            metadata: {}
          })
        },
        (document) => ({ kind: "transition", transitionIndex: Math.max(0, document.definition.transitions.length - 1) })
      )
    },
    removeTransition(transitionIndex) {
      commitTransaction(
        store,
        "remove-transition",
        (document) => {
          if (transitionIndex < 0 || transitionIndex >= document.definition.transitions.length) {
            return
          }
          document.definition.transitions.splice(transitionIndex, 1)
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
      commitTransaction(store, `update-transition-${field}`, (document) => {
        const transition = document.definition.transitions[transitionIndex]
        if (!transition) {
          return
        }

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
          return
        }
        if (field === "dynamic_to.resolver") {
          transition.dynamic_to = {
            ...(transition.dynamic_to ?? { resolver: "" }),
            resolver: value
          }
        }
      })
    },
    updateTransitionTargetKind(transitionIndex, kind) {
      commitTransaction(store, "update-transition-target-kind", (document) => {
        const transition = document.definition.transitions[transitionIndex]
        if (!transition) {
          return
        }
        if (kind === "static") {
          transition.dynamic_to = undefined
          if (!transition.to) {
            transition.to = findDefaultStateName(document.definition)
          }
          return
        }
        transition.to = undefined
        transition.dynamic_to = transition.dynamic_to ?? { resolver: "" }
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
    }
  }))

  return store
}

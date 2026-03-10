import { describe, expect, it } from "vitest"

import type { DraftMachineDocument } from "../src"
import { buildAutoLayoutPositions } from "../src/utils/layout"
import { createMachineStore } from "../src/store/machineStore"
import { readGraphNodePositions, stableStateNodeID } from "../src/utils/graphLayout"

function makeDocument(): DraftMachineDocument {
  return {
    definition: {
      id: "orders",
      name: "Orders",
      version: "v1",
      states: [{ name: "draft", initial: true }, { name: "review" }, { name: "approved", terminal: true }],
      transitions: [
        {
          id: "t-approve",
          event: "approve",
          from: "draft",
          to: "approved",
          workflow: {
            nodes: [{ id: "step-1", kind: "step", step: { action_id: "audit.log" }, next: [] }]
          }
        },
        {
          id: "t-escalate",
          event: "escalate",
          from: "review",
          to: "approved",
          workflow: {
            nodes: [{ id: "step-2", kind: "step", step: { action_id: "notify.ops" }, next: [] }]
          }
        },
        {
          id: "t-reset",
          event: "reset",
          from: "approved",
          to: "draft",
          workflow: {
            nodes: [{ id: "step-3", kind: "step", step: { action_id: "reset.audit" }, next: [] }]
          }
        }
      ]
    },
    ui_schema: {
      layout: "flow",
      nodes: [],
      edges: [],
      inspector: {}
    },
    draft_state: {
      is_draft: true,
      last_saved_at: "2026-03-10T00:00:00Z"
    }
  }
}

describe("phase 7 layout and reorder behavior", () => {
  it("produces deterministic auto-layout using stable internal node IDs even with duplicate/blank state names", () => {
    const states = [{ name: "" }, { name: "dup" }, { name: "dup" }]
    const transitions = [
      { from: "", to: "dup" },
      { from: "dup", to: "dup" }
    ]

    const first = buildAutoLayoutPositions({
      states,
      transitions,
      direction: "TB"
    })
    const second = buildAutoLayoutPositions({
      states,
      transitions,
      direction: "TB"
    })

    expect(second).toEqual(first)
    expect(Object.keys(first).sort()).toEqual([stableStateNodeID(0), stableStateNodeID(1), stableStateNodeID(2)])
    for (const position of Object.values(first)) {
      expect(Number.isFinite(position.x)).toBe(true)
      expect(Number.isFinite(position.y)).toBe(true)
    }
  })

  it("reorders states and preserves/reindexes persisted canvas positions with undo/redo", () => {
    const store = createMachineStore({ document: makeDocument() })

    store.getState().setSelection({ kind: "state", stateIndex: 0 })
    store.getState().setGraphNodePosition(0, { x: 10, y: 20 })
    store.getState().setGraphNodePosition(1, { x: 110, y: 120 })
    store.getState().setGraphNodePosition(2, { x: 210, y: 220 })

    store.getState().moveState(0, 2)
    const moved = store.getState()
    expect(moved.document.definition.states.map((state) => state.name)).toEqual(["review", "approved", "draft"])
    expect(moved.selection).toEqual({ kind: "state", stateIndex: 2 })

    const movedPositions = readGraphNodePositions(moved.document.ui_schema)
    expect(movedPositions[stableStateNodeID(2)]).toEqual({ x: 10, y: 20 })
    expect(movedPositions[stableStateNodeID(0)]).toEqual({ x: 110, y: 120 })
    expect(movedPositions[stableStateNodeID(1)]).toEqual({ x: 210, y: 220 })

    store.getState().undo()
    const undone = store.getState()
    expect(undone.document.definition.states.map((state) => state.name)).toEqual(["draft", "review", "approved"])
    expect(undone.selection).toEqual({ kind: "state", stateIndex: 0 })
    expect(readGraphNodePositions(undone.document.ui_schema)[stableStateNodeID(0)]).toEqual({ x: 10, y: 20 })

    store.getState().redo()
    const redone = store.getState()
    expect(redone.document.definition.states.map((state) => state.name)).toEqual(["review", "approved", "draft"])
    expect(redone.selection).toEqual({ kind: "state", stateIndex: 2 })
  })

  it("reorders transitions and keeps workflow selection aligned across undo/redo", () => {
    const store = createMachineStore({ document: makeDocument() })

    store.getState().setSelection({ kind: "workflow-node", transitionIndex: 0, nodeIndex: 0 })

    store.getState().moveTransition(0, 2)
    expect(store.getState().document.definition.transitions.map((transition) => transition.id)).toEqual([
      "t-escalate",
      "t-reset",
      "t-approve"
    ])
    expect(store.getState().selection).toEqual({ kind: "workflow-node", transitionIndex: 2, nodeIndex: 0 })

    store.getState().undo()
    expect(store.getState().document.definition.transitions.map((transition) => transition.id)).toEqual([
      "t-approve",
      "t-escalate",
      "t-reset"
    ])
    expect(store.getState().selection).toEqual({ kind: "machine" })

    store.getState().redo()
    expect(store.getState().document.definition.transitions.map((transition) => transition.id)).toEqual([
      "t-escalate",
      "t-reset",
      "t-approve"
    ])
    expect(store.getState().selection).toEqual({ kind: "workflow-node", transitionIndex: 2, nodeIndex: 0 })
  })
})

import { describe, expect, it } from "vitest"

import type { DraftMachineDocument } from "../src"
import { createMachineStore } from "../src/store/machineStore"
import { readGraphNodePositions, stableStateNodeID } from "../src/utils/graphLayout"

function makeDocument(): DraftMachineDocument {
  return {
    definition: {
      id: "orders",
      name: "Orders",
      version: "v1",
      states: [
        { name: "draft", initial: true },
        { name: "approved" }
      ],
      transitions: [
        {
          id: "approve",
          event: "approve",
          from: "draft",
          to: "approved",
          workflow: {
            nodes: []
          }
        }
      ]
    },
    ui_schema: {
      layout: "flow",
      nodes: [],
      edges: [],
      inspector: {},
      graph_layout: {
        strategy: "dagre"
      }
    },
    draft_state: {
      is_draft: true,
      last_saved_at: "2026-03-10T00:00:00Z"
    }
  }
}

describe("fsm-ui-builder graph layout persistence", () => {
  it("stores node positions with deterministic state-index keys and survives state rename", () => {
    const store = createMachineStore({ document: makeDocument() })

    store.getState().setGraphNodePosition(0, { x: 120, y: 220 })
    const persistedBeforeRename = readGraphNodePositions(store.getState().document.ui_schema)
    expect(persistedBeforeRename[stableStateNodeID(0)]).toEqual({ x: 120, y: 220 })

    store.getState().updateStateName(0, "pending")
    const persistedAfterRename = readGraphNodePositions(store.getState().document.ui_schema)
    expect(persistedAfterRename[stableStateNodeID(0)]).toEqual({ x: 120, y: 220 })
  })

  it("reindexes persisted positions when a state is removed", () => {
    const store = createMachineStore({ document: makeDocument() })

    store.getState().setGraphNodePosition(0, { x: 20, y: 30 })
    store.getState().setGraphNodePosition(1, { x: 220, y: 330 })

    store.getState().removeState(0)

    const persisted = readGraphNodePositions(store.getState().document.ui_schema)
    expect(persisted[stableStateNodeID(0)]).toEqual({ x: 220, y: 330 })
    expect(persisted[stableStateNodeID(1)]).toBeUndefined()
  })
})

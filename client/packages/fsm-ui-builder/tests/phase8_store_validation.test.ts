import { describe, expect, it } from "vitest"

import type { DraftMachineDocument, ValidationDiagnostic } from "../src"
import { diagnosticsParityEqual, mergeScopedValidationDiagnostics } from "../src/document"
import { createMachineStore } from "../src/store/machineStore"
import { loadContractFixture } from "./fixtures"

function makeScopedValidationDocument(): DraftMachineDocument {
  return {
    definition: {
      id: "orders",
      name: "Orders",
      version: "v1",
      states: [{ name: "draft", initial: true }, { name: "approved" }],
      transitions: [
        {
          id: "node-approve",
          event: "approve",
          from: "draft",
          to: "approved",
          workflow: {
            nodes: [{ id: "step-1", kind: "step", step: { action_id: "audit.log" }, next: [] }]
          }
        },
        {
          id: "approve_duplicate",
          event: "approve",
          from: "draft",
          to: "approved",
          workflow: {
            nodes: [{ id: "step-2", kind: "step", step: { action_id: "audit.log" }, next: [] }]
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

describe("phase 8 store structural sharing and scoped diagnostics", () => {
  it("uses structural sharing on large documents while preserving history, diagnostics, and dirty invariants", () => {
    const fixture = loadContractFixture("41_large_machine_perf_document.json") as {
      draft: DraftMachineDocument
    }

    const store = createMachineStore({ document: fixture.draft })
    const before = store.getState()

    const untouchedState = before.document.definition.states[150]
    const untouchedTransition = before.document.definition.transitions[200]

    store.getState().updateTransition(0, "event", "evt_000_updated")
    const afterTransitionUpdate = store.getState()

    expect(afterTransitionUpdate.document.definition.transitions[0]).not.toBe(before.document.definition.transitions[0])
    expect(afterTransitionUpdate.document.definition.transitions[200]).toBe(untouchedTransition)
    expect(afterTransitionUpdate.document.definition.states[150]).toBe(untouchedState)
    expect(afterTransitionUpdate.history.length).toBe(before.history.length + 1)
    expect(afterTransitionUpdate.historyIndex).toBe(before.historyIndex + 1)
    expect(afterTransitionUpdate.isDirty).toBe(true)

    const diagnosticsAfterTransitionUpdate = afterTransitionUpdate.diagnostics
    store.getState().setGraphNodePosition(0, { x: 240, y: 120 })
    const afterLayoutOnlyUpdate = store.getState()

    expect(afterLayoutOnlyUpdate.diagnostics).toBe(diagnosticsAfterTransitionUpdate)

    store.getState().undo()
    expect(store.getState().document.definition.transitions[0]?.event).toBe("evt_000_updated")

    store.getState().undo()
    expect(store.getState().document.definition.transitions[0]?.event).not.toBe("evt_000_updated")

    store.getState().redo()
    store.getState().redo()
    expect(store.getState().document.definition.transitions[0]?.event).toBe("evt_000_updated")
  })

  it("tracks incremental validation scope by changed node IDs and clears scope when full validation is required", () => {
    const store = createMachineStore({ document: makeScopedValidationDocument() })

    store.getState().updateTransition(0, "event", "approve_fast")
    const scopedNodeIDs = store.getState().consumeValidationScopeNodeIDs()

    expect(scopedNodeIDs).toContain("node-approve")
    expect(scopedNodeIDs).toContain("step-1")
    expect(store.getState().pendingValidationNodeIDs).toEqual([])

    store.getState().updateTransition(1, "event", "approve_duplicate_retry")
    store.getState().updateStateName(0, "pending")

    // State-level edits force full validation semantics, so scoped IDs should be cleared.
    expect(store.getState().consumeValidationScopeNodeIDs()).toEqual([])
  })

  it("keeps restore diagnostics stable across undo/redo history navigation", () => {
    const store = createMachineStore({ document: makeScopedValidationDocument() })
    const restored = makeScopedValidationDocument()
    restored.definition.version = "v2"

    const externalDiagnostics: ValidationDiagnostic[] = [
      {
        code: "FSM002_INVALID_WORKFLOW_NODE",
        severity: "error",
        message: "external restore diagnostic",
        path: "$.transitions[0].workflow.nodes[0].expr",
        node_id: "step-1",
        field: "expr"
      }
    ]

    store.getState().restoreDocument(restored, externalDiagnostics)
    expect(store.getState().diagnostics.some((diagnostic) => diagnostic.message === "external restore diagnostic")).toBe(true)

    store.getState().undo()
    store.getState().redo()

    expect(store.getState().diagnostics.some((diagnostic) => diagnostic.message === "external restore diagnostic")).toBe(true)
  })

  it("merges scoped diagnostics with cached diagnostics and parity-checks against full validation fixtures", () => {
    const document = makeScopedValidationDocument()

    const fixture23Request = loadContractFixture("23_authoring_validate.request.json") as {
      params: {
        data: {
          scope: {
            nodeIds: string[]
          }
        }
      }
    }
    const fixture23Response = loadContractFixture("23_authoring_validate.response.json") as {
      result: {
        data: {
          diagnostics: ValidationDiagnostic[]
        }
      }
    }

    const cachedFromOtherNodes: ValidationDiagnostic[] = [
      {
        code: "FSM002_INVALID_WORKFLOW_NODE",
        severity: "error",
        message: "when node requires expression",
        path: "$.transitions[1].workflow.nodes[0].expr",
        node_id: "step-2",
        field: "expr"
      }
    ]

    const merged23 = mergeScopedValidationDiagnostics({
      definition: document.definition,
      cachedDiagnostics: cachedFromOtherNodes,
      scopedDiagnostics: fixture23Response.result.data.diagnostics,
      scopeNodeIDs: fixture23Request.params.data.scope.nodeIds
    })

    expect(merged23).toEqual(cachedFromOtherNodes)
    expect(diagnosticsParityEqual(merged23, cachedFromOtherNodes)).toBe(true)

    const fixture28Request = loadContractFixture("28_authoring_validate_scoped_duplicate.request.json") as {
      params: {
        data: {
          scope: {
            nodeIds: string[]
          }
        }
      }
    }
    const fixture28Response = loadContractFixture("28_authoring_validate_scoped_duplicate.response.json") as {
      result: {
        data: {
          diagnostics: ValidationDiagnostic[]
        }
      }
    }

    const cachedWithScopedStale: ValidationDiagnostic[] = [
      {
        code: "FSM003_DUPLICATE_TRANSITION",
        severity: "error",
        message: "stale duplicate diagnostic",
        path: "$.transitions[1]",
        node_id: "approve_duplicate"
      },
      {
        code: "FSM002_INVALID_WORKFLOW_NODE",
        severity: "error",
        message: "unrelated retained diagnostic",
        path: "$.transitions[0].workflow.nodes[0].kind",
        node_id: "step-1"
      }
    ]

    const merged28 = mergeScopedValidationDiagnostics({
      definition: document.definition,
      cachedDiagnostics: cachedWithScopedStale,
      scopedDiagnostics: fixture28Response.result.data.diagnostics,
      scopeNodeIDs: fixture28Request.params.data.scope.nodeIds
    })

    const expectedFullDiagnostics = [cachedWithScopedStale[1], ...fixture28Response.result.data.diagnostics]

    expect(merged28.some((diagnostic) => diagnostic.message.includes("duplicate transition definition"))).toBe(true)
    expect(merged28.some((diagnostic) => diagnostic.message.includes("unrelated retained diagnostic"))).toBe(true)
    expect(diagnosticsParityEqual(merged28, expectedFullDiagnostics)).toBe(true)
  })
})

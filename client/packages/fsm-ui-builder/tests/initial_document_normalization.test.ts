import { describe, expect, it } from "vitest"

import { normalizeInitialDocumentInput } from "../src"
import type { DraftMachineDocument, MachineDefinition } from "../src"

function machineDefinition(): MachineDefinition {
  return {
    id: "orders",
    name: "Orders",
    version: "v1",
    states: [{ name: "draft", initial: true }, { name: "approved" }],
    transitions: [
      {
        id: "approve",
        event: "approve",
        from: "draft",
        to: "approved",
        workflow: {
          nodes: [
            {
              id: "step-1",
              kind: "step",
              step: { action_id: "audit.log" }
            }
          ]
        }
      }
    ]
  }
}

describe("fsm-ui-builder initial document normalization", () => {
  it("accepts raw machine definitions and wraps into draft documents", () => {
    const normalized = normalizeInitialDocumentInput(machineDefinition())
    expect(normalized.definition.id).toBe("orders")
    expect(normalized.definition.states).toHaveLength(2)
    expect(normalized.ui_schema).toBeTruthy()
    expect(normalized.draft_state.is_draft).toBe(true)
  })

  it("accepts `{ draft: ... }` wrapper payloads", () => {
    const draft: DraftMachineDocument = {
      definition: machineDefinition(),
      ui_schema: {
        layout: "flow"
      },
      draft_state: {
        is_draft: false,
        last_saved_at: "2026-03-10T00:00:00Z"
      }
    }
    const normalized = normalizeInitialDocumentInput({ draft })
    expect(normalized.definition.id).toBe("orders")
    expect(normalized.draft_state.is_draft).toBe(false)
  })

  it("falls back to default document for unsupported payloads", () => {
    const normalized = normalizeInitialDocumentInput({ nope: true })
    expect(normalized.definition.id).toBe("machine")
    expect(normalized.definition.states).toHaveLength(1)
  })
})

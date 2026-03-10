import { describe, expect, it } from "vitest"

import { loadDraftDocumentForEditing, prepareDraftDocumentForSave, type DraftMachineDocument } from "../src"

function makeBaseDocument(): DraftMachineDocument {
  return {
    definition: {
      id: "orders",
      name: "Orders",
      version: "v12",
      states: [
        { name: "draft", initial: true, ui_tag: "left" },
        { name: "approved", ui_tag: "right" }
      ],
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
                step: {
                  action_id: "audit.log",
                  metadata: {
                    team: "ops"
                  }
                },
                next: [],
                ui_hint: {
                  collapsed: false
                }
              }
            ],
            graph_hints: {
              rankdir: "TB"
            }
          },
          edge_style: {
            stroke: "#0af"
          }
        }
      ],
      ext_definition: {
        color: "cyan"
      }
    },
    ui_schema: {
      layout: "flow",
      nodes: [
        {
          id: "draft",
          position: {
            x: 120,
            y: 240
          },
          tags: ["sticky"]
        }
      ],
      edges: [],
      inspector: {
        pinned: ["approve"]
      },
      graph_layout: {
        viewport: {
          x: 1,
          y: 2,
          zoom: 1.2
        }
      },
      unknown_schema_field: {
        preserve: true
      }
    },
    draft_state: {
      is_draft: true,
      last_saved_at: "2026-03-10T00:00:00Z"
    },
    top_level_unknown: {
      keep: true
    }
  }
}

describe("fsm-ui-builder round-trip transforms", () => {
  it("preserves unknown/non-canonical fields while applying edited canonical fields", () => {
    const base = makeBaseDocument()
    const editable = loadDraftDocumentForEditing(base)

    editable.definition.name = "Orders v13"
    editable.definition.transitions[0].event = "review"
    editable.ui_schema.inspector = {
      pinned: ["review"]
    }

    // Simulate a canonical rewrite that dropped unknown fields before save.
    const rewritten: DraftMachineDocument = {
      definition: {
        id: editable.definition.id,
        name: editable.definition.name,
        version: editable.definition.version,
        states: editable.definition.states.map((state) => ({
          name: state.name,
          initial: state.initial,
          terminal: state.terminal
        })),
        transitions: editable.definition.transitions.map((transition) => ({
          id: transition.id,
          event: transition.event,
          from: transition.from,
          to: transition.to,
          workflow: {
            nodes: transition.workflow.nodes.map((node) => ({
              id: node.id,
              kind: node.kind,
              step: node.step,
              expr: node.expr,
              next: node.next
            }))
          }
        }))
      },
      ui_schema: {
        layout: editable.ui_schema.layout,
        nodes: editable.ui_schema.nodes,
        edges: editable.ui_schema.edges,
        inspector: editable.ui_schema.inspector,
        graph_layout: editable.ui_schema.graph_layout
      },
      draft_state: editable.draft_state
    }

    const saved = prepareDraftDocumentForSave({
      baseDocument: base,
      editedDocument: rewritten
    })

    expect(saved.definition.name).toBe("Orders v13")
    expect(saved.definition.transitions[0]?.event).toBe("review")

    expect(saved.definition.ext_definition).toEqual({ color: "cyan" })
    expect(saved.definition.transitions[0]?.edge_style).toEqual({ stroke: "#0af" })
    expect(saved.definition.transitions[0]?.workflow.graph_hints).toEqual({ rankdir: "TB" })
    expect(saved.definition.transitions[0]?.workflow.nodes[0]?.ui_hint).toEqual({ collapsed: false })
    expect(saved.ui_schema.unknown_schema_field).toEqual({ preserve: true })
    expect(saved.top_level_unknown).toEqual({ keep: true })
  })
})

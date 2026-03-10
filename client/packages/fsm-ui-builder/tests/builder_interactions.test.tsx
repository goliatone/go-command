import { afterEach, describe, expect, it, vi } from "vitest"
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { FSMUIBuilder, createStaticActionCatalogProvider, mountFSMUIBuilder, type DraftMachineDocument } from "../src"

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
            nodes: [
              {
                id: "step-1",
                kind: "step",
                step: {
                  action_id: "audit.log",
                  async: false,
                  delay: "",
                  timeout: "",
                  metadata: {}
                },
                next: ["when-1"]
              },
              {
                id: "when-1",
                kind: "when",
                expr: "amount > 0",
                next: []
              }
            ]
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

function makeEmptyDocument(): DraftMachineDocument {
  return {
    definition: {
      id: "empty",
      name: "Empty Machine",
      version: "v1",
      states: [],
      transitions: []
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

describe("fsm-ui-builder shell and interactions", () => {
  afterEach(() => {
    cleanup()
  })

  it("mounts and unmounts through mount entrypoint", async () => {
    const container = document.createElement("div")
    document.body.appendChild(container)

    const mounted = mountFSMUIBuilder(container, {
      initialDocument: makeDocument()
    })

    await new Promise((resolve) => {
      setTimeout(resolve, 0)
    })

    expect(container.textContent).toContain("FSM Builder")
    mounted.unmount()
    expect(container.textContent).toBe("")
    container.remove()
  })

  it("renders baseline shell panels", () => {
    render(<FSMUIBuilder initialDocument={makeDocument()} />)

    expect(screen.getByLabelText("Builder header")).toBeTruthy()
    expect(screen.getByLabelText("Explorer panel")).toBeTruthy()
    expect(screen.getByLabelText("Canvas panel")).toBeTruthy()
    expect(screen.getByLabelText("Inspector panel")).toBeTruthy()
    expect(screen.getByLabelText("Console panel")).toBeTruthy()
  })

  it("supports selection and editing for state, transition, step, and when flows", async () => {
    const user = userEvent.setup()
    render(<FSMUIBuilder initialDocument={makeDocument()} />)

    const explorer = screen.getByLabelText("Explorer panel")
    await user.click(within(explorer).getByRole("button", { name: /draft/i }))
    const stateName = screen.getByLabelText("State name") as HTMLInputElement
    await user.clear(stateName)
    await user.type(stateName, "pending")

    expect(within(explorer).getByRole("button", { name: /pending/i })).toBeTruthy()

    await user.click(within(explorer).getByRole("button", { name: /approve -> approved/i }))
    const eventInput = screen.getByLabelText("Transition event") as HTMLInputElement
    await user.clear(eventInput)
    await user.type(eventInput, "review")
    expect(eventInput.value).toBe("review")

    await user.click(screen.getByRole("button", { name: /step:audit.log/i }))
    const actionID = screen.getByLabelText("Workflow action id") as HTMLInputElement
    await user.clear(actionID)
    await user.type(actionID, "audit.transition")
    expect(actionID.value).toBe("audit.transition")

    const metadataInput = screen.getByLabelText("Workflow metadata") as HTMLTextAreaElement
    await user.clear(metadataInput)
    fireEvent.change(metadataInput, { target: { value: "{\"team\":\"ops\"}" } })
    fireEvent.blur(metadataInput)
    expect(metadataInput.value).toContain("\"team\": \"ops\"")

    await user.click(within(explorer).getByRole("button", { name: /review -> approved/i }))
    const whenNodeButton = await screen.findByRole("button", { name: /when:amount > 0/i })
    await user.click(whenNodeButton)
    const whenExpr = screen.getByLabelText("Workflow when expression") as HTMLInputElement
    await user.clear(whenExpr)
    await user.type(whenExpr, "amount > 10")
    expect(whenExpr.value).toBe("amount > 10")
  })

  it("uses searchable keyboard-accessible action catalog dropdown", async () => {
    const user = userEvent.setup()
    const actionCatalogProvider = createStaticActionCatalogProvider([
      {
        id: "audit.log",
        label: "Audit Log",
        description: "Persist machine audit entry",
        metadata: {
          tags: ["audit", "ops"]
        }
      },
      {
        id: "notify.slack",
        label: "Slack Notify",
        description: "Send Slack notification",
        metadata: {
          tags: ["notify", "chatops"]
        }
      }
    ])

    render(<FSMUIBuilder initialDocument={makeDocument()} actionCatalogProvider={actionCatalogProvider} />)

    const explorer = screen.getByLabelText("Explorer panel")
    await user.click(within(explorer).getByRole("button", { name: /approve -> approved/i }))
    await user.click(screen.getByRole("button", { name: /step:audit.log/i }))

    const actionInput = screen.getByRole("combobox", { name: "Workflow action id" }) as HTMLInputElement
    await user.clear(actionInput)
    await user.type(actionInput, "notify")

    const listbox = await screen.findByRole("listbox")
    expect(within(listbox).getByText("Send Slack notification")).toBeTruthy()
    expect(within(listbox).getByText("notify, chatops")).toBeTruthy()

    fireEvent.keyDown(actionInput, { key: "ArrowDown" })
    fireEvent.keyDown(actionInput, { key: "Enter" })

    expect((screen.getByRole("combobox", { name: "Workflow action id" }) as HTMLInputElement).value).toBe(
      "notify.slack"
    )
  })

  it("maps diagnostics from console to inspector selection", async () => {
    const user = userEvent.setup()
    render(
      <FSMUIBuilder
        initialDocument={makeDocument()}
        initialDiagnostics={[
          {
            code: "FSM001_UNRESOLVED_ACTION",
            severity: "error",
            message: "step action_id is required",
            path: "$.transitions[0].workflow.nodes[0].step.action_id",
            node_id: "step-1",
            field: "action_id"
          }
        ]}
      />
    )

    const console = screen.getByLabelText("Console panel")
    const problemButton = within(console).getByRole("button", { name: /FSM001_UNRESOLVED_ACTION/i })
    await user.click(problemButton)

    expect(screen.getByLabelText("Workflow action id")).toBeTruthy()
    expect(screen.getAllByText("step action_id is required").length).toBeGreaterThan(0)
  })

  it("preserves static and dynamic transition targets when toggling kind", async () => {
    const user = userEvent.setup()

    render(<FSMUIBuilder initialDocument={makeDocument()} />)

    const explorer = screen.getByLabelText("Explorer panel")
    await user.click(within(explorer).getByRole("button", { name: /approve -> approved/i }))

    await user.click(screen.getByRole("radio", { name: "Dynamic" }))
    const resolverInput = screen.getByLabelText("Dynamic resolver") as HTMLInputElement
    await user.clear(resolverInput)
    await user.type(resolverInput, "pick_target")
    expect(resolverInput.value).toBe("pick_target")

    await user.click(screen.getByRole("radio", { name: "Static" }))
    const staticTarget = screen.getByLabelText("Transition target") as HTMLSelectElement
    expect(staticTarget.value).toBe("approved")

    await user.click(screen.getByRole("radio", { name: "Dynamic" }))
    expect((screen.getByLabelText("Dynamic resolver") as HTMLInputElement).value).toBe("pick_target")
  })

  it("commits step metadata edits into the draft document", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<FSMUIBuilder initialDocument={makeDocument()} onChange={onChange} />)

    const explorer = screen.getByLabelText("Explorer panel")
    await user.click(within(explorer).getByRole("button", { name: /approve -> approved/i }))
    await user.click(screen.getByRole("button", { name: /step:audit.log/i }))

    const metadataInput = screen.getByLabelText("Workflow metadata") as HTMLTextAreaElement
    await user.clear(metadataInput)
    fireEvent.change(metadataInput, { target: { value: "{\"team\":\"ops\",\"risk\":\"high\"}" } })
    fireEvent.blur(metadataInput)

    await waitFor(() => {
      const call = onChange.mock.calls.at(-1)?.[0] as
        | {
            document: DraftMachineDocument
          }
        | undefined
      const metadata =
        call?.document.definition.transitions[0]?.workflow.nodes[0]?.step?.metadata as Record<string, unknown> | undefined
      expect(metadata).toEqual({ team: "ops", risk: "high" })
    })
  })

  it("supports undo/redo and dirty-state tracking", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<FSMUIBuilder initialDocument={makeDocument()} onChange={onChange} />)

    const explorer = screen.getByLabelText("Explorer panel")
    await user.click(within(explorer).getByRole("button", { name: /draft/i }))
    const stateName = screen.getByLabelText("State name") as HTMLInputElement
    await user.clear(stateName)
    await user.type(stateName, "pending")

    expect(screen.getByLabelText("Unsaved changes")).toBeTruthy()

    const beforeUndo = stateName.value
    await user.click(screen.getByRole("button", { name: "Undo" }))
    expect(stateName.value).not.toBe(beforeUndo)

    await user.click(screen.getByRole("button", { name: "Redo" }))
    expect(stateName.value).toBe(beforeUndo)
    expect(screen.getByLabelText("Unsaved changes")).toBeTruthy()

    await user.click(screen.getByRole("button", { name: "Save" }))
    expect(screen.queryByLabelText("Unsaved changes")).toBeNull()

    expect(onChange).toHaveBeenCalled()
  })

  it("shows autosave status feedback in the header while preserving dirty state", async () => {
    const user = userEvent.setup()

    render(<FSMUIBuilder initialDocument={makeDocument()} autosaveDebounceMs={5} />)

    const explorer = screen.getByLabelText("Explorer panel")
    await user.click(within(explorer).getByRole("button", { name: /draft/i }))

    const stateName = screen.getByLabelText("State name") as HTMLInputElement
    await user.clear(stateName)
    await user.type(stateName, "pending")

    await waitFor(() => {
      expect(screen.getByText(/Unsaved changes \(autosaved/i)).toBeTruthy()
    })
    expect(screen.getByLabelText("Unsaved changes")).toBeTruthy()
  })

  it("renders empty-state guidance and creates first state from canvas action", async () => {
    const user = userEvent.setup()

    render(<FSMUIBuilder initialDocument={makeEmptyDocument()} />)

    expect(screen.getByText("No states yet")).toBeTruthy()
    await user.click(screen.getByRole("button", { name: /Create first state/i }))
    expect(screen.queryByText("No states yet")).toBeNull()
    expect(screen.getAllByRole("button", { name: /state_1/i }).length).toBeGreaterThan(0)
  })

  it("clears console output with the clear action", async () => {
    const user = userEvent.setup()

    render(<FSMUIBuilder initialDocument={makeDocument()} />)

    await user.click(screen.getByRole("button", { name: "Validate" }))
    await waitFor(() => {
      expect(screen.getAllByText(/Authoring RPC unavailable/i).length).toBeGreaterThan(0)
    })

    await user.click(screen.getByRole("button", { name: "Clear console output" }))
    expect(screen.getByText("No simulation runs yet.")).toBeTruthy()
    expect(screen.getByText("No dry-run projected outcome yet.")).toBeTruthy()
    expect(screen.getByText("No runtime/authoring errors.")).toBeTruthy()
  })
})

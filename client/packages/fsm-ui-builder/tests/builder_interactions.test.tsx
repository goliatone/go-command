import { afterEach, describe, expect, it, vi } from "vitest"
import { cleanup, render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { FSMUIBuilder, mountFSMUIBuilder, type DraftMachineDocument } from "../src"

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
                  timeout: ""
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

    await user.click(within(explorer).getByRole("button", { name: /review -> approved/i }))
    const whenNodeButton = await screen.findByRole("button", { name: /when:amount > 0/i })
    await user.click(whenNodeButton)
    const whenExpr = screen.getByLabelText("Workflow when expression") as HTMLInputElement
    await user.clear(whenExpr)
    await user.type(whenExpr, "amount > 10")
    expect(whenExpr.value).toBe("amount > 10")
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
})

import { afterEach, describe, expect, it, vi } from "vitest"
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { FSMUIBuilder, normalizeRuntimeApplyEvent, normalizeRuntimeSnapshot, type BuilderRuntimeRPC, type DraftMachineDocument } from "../src"
import { loadContractFixture } from "./fixtures"

function setViewport(width: number): void {
  Object.defineProperty(window, "innerWidth", {
    configurable: true,
    writable: true,
    value: width
  })
  window.dispatchEvent(new Event("resize"))
}

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

describe("fsm-ui-builder keyboard, accessibility, and responsive behavior", () => {
  afterEach(() => {
    cleanup()
    setViewport(1366)
  })

  it("supports keyboard save/validate/undo/redo/navigation and canvas helpers", async () => {
    const user = userEvent.setup()

    render(<FSMUIBuilder initialDocument={makeDocument()} />)

    fireEvent.keyDown(window, { key: "ArrowDown" })
    expect(screen.getByText("State")).toBeTruthy()

    const stateName = screen.getByLabelText("State name") as HTMLInputElement
    await user.clear(stateName)
    await user.type(stateName, "pending")
    expect(screen.getByLabelText("Unsaved changes")).toBeTruthy()

    fireEvent.keyDown(stateName, { key: "z", ctrlKey: true })
    expect((screen.getByLabelText("State name") as HTMLInputElement).value).toBe("pending")

    fireEvent.keyDown(window, { key: "z", ctrlKey: true })
    expect((screen.getByLabelText("State name") as HTMLInputElement).value).not.toBe("pending")

    fireEvent.keyDown(window, { key: "z", ctrlKey: true, shiftKey: true })
    expect((screen.getByLabelText("State name") as HTMLInputElement).value).toBe("pending")

    fireEvent.keyDown(window, { key: "s", ctrlKey: true })
    await waitFor(() => {
      expect(screen.queryByLabelText("Unsaved changes")).toBeNull()
    })

    fireEvent.keyDown(window, { key: "Enter", ctrlKey: true })
    await waitFor(() => {
      expect(screen.getAllByText(/Authoring RPC unavailable/i).length).toBeGreaterThan(0)
    })

    fireEvent.keyDown(window, { key: "1", ctrlKey: true })
    await waitFor(() => {
      expect(document.activeElement?.id).toBe("fub-panel-explorer")
    })

    fireEvent.keyDown(window, { key: "2", ctrlKey: true })
    await waitFor(() => {
      expect(document.activeElement?.id).toBe("fub-panel-canvas")
    })

    fireEvent.keyDown(window, { key: "?" })
    expect(screen.getByRole("dialog", { name: "Keyboard Shortcuts" })).toBeTruthy()
    fireEvent.keyDown(window, { key: "Escape" })
    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "Keyboard Shortcuts" })).toBeNull()
    })

    expect(screen.getByText("Zoom: 100%")).toBeTruthy()
    fireEvent.keyDown(window, { key: "=", ctrlKey: true })
    expect(screen.getByText("Zoom: 110%")).toBeTruthy()
    fireEvent.keyDown(window, { key: "0", ctrlKey: true })
    expect(screen.getByText("Zoom: 100%")).toBeTruthy()

    fireEvent.keyDown(window, { key: "Escape" })
    expect(screen.getByText(/Select a state, transition, or workflow node/i)).toBeTruthy()
  })

  it("exposes focus/aria semantics and live-region updates for diagnostics and simulation", async () => {
    const user = userEvent.setup()

    const dryRunFixture = loadContractFixture("10_runtime_apply_event_dry_run.response.json") as {
      result: {
        data: unknown
      }
    }
    const snapshotFixture = loadContractFixture("11_runtime_snapshot.response.json") as {
      result: {
        data: unknown
      }
    }

    const runtimeRPC: BuilderRuntimeRPC = {
      applyEventDryRun: vi.fn(async () => normalizeRuntimeApplyEvent(dryRunFixture.result.data)),
      snapshot: vi.fn(async () => normalizeRuntimeSnapshot(snapshotFixture.result.data))
    }

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
        runtimeRPC={runtimeRPC}
      />
    )

    expect(screen.getByRole("button", { name: "Save" }).getAttribute("aria-keyshortcuts")).toContain("Control+S")
    expect(screen.getByRole("button", { name: "Validate" }).getAttribute("aria-keyshortcuts")).toContain("Control+Enter")

    const statuses = screen.getAllByRole("status", { hidden: true })
    expect(statuses.some((entry) => (entry.textContent ?? "").includes("1 diagnostic"))).toBe(true)

    const problem = screen.getByRole("button", { name: /FSM001_UNRESOLVED_ACTION/i })
    await user.click(problem)
    await waitFor(() => {
      expect(document.activeElement?.id).toBe("fub-panel-inspector")
    })

    await user.click(screen.getByRole("button", { name: "Simulate" }))
    await waitFor(() => {
      const announcements = screen.getAllByRole("status", { hidden: true }).map((item) => item.textContent ?? "")
      expect(announcements.some((value) => value.includes("Projected approve"))).toBe(true)
    })
  })

  it("uses reduced-capability read-only mode on narrow/mobile viewports", async () => {
    const user = userEvent.setup()
    setViewport(840)

    render(<FSMUIBuilder initialDocument={makeDocument()} />)

    expect(screen.getByText(/reduced-capability and read-only/i)).toBeTruthy()
    expect((screen.getByRole("button", { name: "Save" }) as HTMLButtonElement).disabled).toBe(true)
    expect(screen.getByRole("tablist", { name: "Builder panels" })).toBeTruthy()
    expect(screen.getByRole("tabpanel")).toBeTruthy()

    const explorerTab = screen.getByRole("tab", { name: "explorer" })
    expect(explorerTab.getAttribute("aria-controls")).toBe("fub-mobile-tabpanel-explorer")
    await user.click(explorerTab)
    const explorer = screen.getByLabelText("Explorer panel")
    const tabPanel = screen.getByRole("tabpanel")
    expect(tabPanel.getAttribute("id")).toBe("fub-mobile-tabpanel-explorer")
    expect(tabPanel.getAttribute("aria-labelledby")).toBe("fub-mobile-tab-explorer")
    expect(within(explorer).getByRole("button", { name: /\+ State/i }).getAttribute("disabled")).not.toBeNull()

    await user.click(within(explorer).getByRole("button", { name: /draft/i }))
    await user.click(screen.getByRole("tab", { name: "inspector" }))
    const stateName = screen.getByLabelText("State name") as HTMLInputElement
    expect(stateName.readOnly).toBe(true)
  })

  it("collapses explorer by default in compact layout", async () => {
    const user = userEvent.setup()
    setViewport(1000)

    render(<FSMUIBuilder initialDocument={makeDocument()} />)

    expect(screen.queryByLabelText("Explorer panel")).toBeNull()
    await user.click(screen.getByRole("button", { name: "Explorer" }))
    expect(screen.getByLabelText("Explorer panel")).toBeTruthy()
  })
})

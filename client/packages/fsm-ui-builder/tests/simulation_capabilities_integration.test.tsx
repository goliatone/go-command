import { afterEach, describe, expect, it, vi } from "vitest"
import { cleanup, render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import {
  FSMUIBuilder,
  normalizeRuntimeApplyEvent,
  normalizeRuntimeSnapshot,
  type BuilderRuntimeRPC,
  type DraftMachineDocument,
  type PersistedMachineDraft,
  type PersistenceStore
} from "../src"
import { loadContractFixture } from "./fixtures"

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

describe("fsm-ui-builder simulation and capability integrations", () => {
  afterEach(() => {
    cleanup()
  })

  it("maps runtime dry-run + snapshot responses into simulation UX", async () => {
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

    render(<FSMUIBuilder initialDocument={makeDocument()} runtimeRPC={runtimeRPC} />)
    expect(screen.getByLabelText("Canvas panel").className).not.toContain("fub-canvas--simulation")

    await user.click(screen.getByRole("button", { name: "Simulate" }))

    await waitFor(() => {
      expect(screen.getByLabelText("Projected outcome")).toBeTruthy()
    })

    expect(screen.getByText(/Event:/i).textContent).toContain("approve")
    expect(screen.getByText(/State:/i).textContent).toContain("draft")
    expect(screen.getByText(/Status:/i).textContent).toContain("running")
    expect(screen.getByLabelText("Canvas panel").className).toContain("fub-canvas--simulation")
    expect(document.querySelector(".fub-root")?.className).toContain("fub-shell--simulation")

    const blocked = screen.getByLabelText("Blocked transitions")
    expect(within(blocked).getAllByText(/reroute/i).length).toBeGreaterThan(0)
    expect(within(blocked).getByText(/approval threshold exceeded/i)).toBeTruthy()

    expect(runtimeRPC.applyEventDryRun).toHaveBeenCalledWith(
      expect.objectContaining({
        machineId: "orders",
        entityId: "orders-preview",
        event: "approve",
        dryRun: true
      }),
      undefined
    )

    expect(runtimeRPC.snapshot).toHaveBeenCalledWith(
      expect.objectContaining({
        machineId: "orders",
        entityId: "orders-preview",
        includeBlocked: true,
        evaluateGuards: true
      }),
      undefined
    )
  })

  it("gracefully degrades when optional capabilities are absent", async () => {
    const user = userEvent.setup()

    render(<FSMUIBuilder initialDocument={makeDocument()} />)

    expect((screen.getByRole("button", { name: "Simulate" }) as HTMLButtonElement).disabled).toBe(true)

    const explorer = screen.getByLabelText("Explorer panel")
    await user.click(within(explorer).getByRole("button", { name: /approve -> approved/i }))
    await user.click(screen.getByRole("button", { name: /step:audit.log/i }))

    expect(screen.getByText("Action catalog unavailable.")).toBeTruthy()

    // Open the "More" dropdown menu and verify Export RPC is disabled
    await user.click(screen.getByRole("button", { name: /More/i }))
    const exportRPCItem = screen.getByRole("menuitem", { name: "Export RPC" }) as HTMLButtonElement
    expect(exportRPCItem.disabled).toBe(true)
  })

  it("enforces unsupported workflow-node guardrails with explicit messaging", async () => {
    const user = userEvent.setup()

    const unsupported = makeDocument()
    unsupported.definition.transitions[0].workflow.nodes = [
      {
        id: "parallel-1",
        kind: "parallel",
        next: []
      }
    ]

    render(<FSMUIBuilder initialDocument={unsupported} />)

    expect(screen.getByText(/Unsupported workflow nodes are read-only/i)).toBeTruthy()

    const explorer = screen.getByLabelText("Explorer panel")
    await user.click(within(explorer).getByRole("button", { name: /approve -> approved/i }))
    await user.click(screen.getByRole("button", { name: /parallel: unsupported/i }))

    expect(screen.getByText(/is unsupported in builder v1 and is read-only/i)).toBeTruthy()
    expect(screen.queryByLabelText("Workflow when expression")).toBeNull()
  })

  it("supports autosave and recovery via persistence adapter", async () => {
    const user = userEvent.setup()
    const saveCalls: PersistedMachineDraft[] = []

    const recoveredDocument = makeDocument()
    recoveredDocument.definition.name = "Recovered Orders"

    const persistenceStore: PersistenceStore = {
      async list() {
        return []
      },
      async load() {
        return {
          machineId: "orders",
          updatedAt: "2026-03-10T00:01:00Z",
          document: recoveredDocument
        }
      },
      async save(draft) {
        saveCalls.push(draft)
      },
      async delete() {
        // not used in this test
      }
    }

    render(
      <FSMUIBuilder
        initialDocument={makeDocument()}
        persistenceStore={persistenceStore}
        autosaveDebounceMs={10}
      />
    )

    // Open the "More" dropdown menu
    await user.click(screen.getByRole("button", { name: /More/i }))

    // Find and click the Recover Draft menu item
    const recover = await screen.findByRole("menuitem", { name: "Recover Draft" })
    await waitFor(() => {
      expect(recover.getAttribute("aria-disabled")).not.toBe("true")
    })

    await user.click(recover)

    expect((screen.getByLabelText("Machine name") as HTMLInputElement).value).toBe("Recovered Orders")

    const explorer = screen.getByLabelText("Explorer panel")
    await user.click(within(explorer).getByRole("button", { name: /draft/i }))
    const stateName = screen.getByLabelText("State name") as HTMLInputElement
    await user.clear(stateName)
    await user.type(stateName, "pending")

    await waitFor(() => {
      expect(saveCalls.some((entry) => entry.machineId === "orders")).toBe(true)
      expect(
        saveCalls.some((entry) => entry.document.definition.states[0]?.name === "pending")
      ).toBe(true)
    })
  })

  it("keeps dirty state when local save fails", async () => {
    const user = userEvent.setup()
    const persistenceStore: PersistenceStore = {
      async list() {
        return []
      },
      async load() {
        return null
      },
      async save() {
        throw new Error("disk full")
      },
      async delete() {
        // not used in this test
      }
    }

    render(
      <FSMUIBuilder
        initialDocument={makeDocument()}
        persistenceStore={persistenceStore}
        autosaveDebounceMs={60_000}
      />
    )

    const explorer = screen.getByLabelText("Explorer panel")
    await user.click(within(explorer).getByRole("button", { name: /draft/i }))
    const stateName = screen.getByLabelText("State name") as HTMLInputElement
    await user.clear(stateName)
    await user.type(stateName, "pending")

    expect(screen.getByLabelText("Unsaved changes")).toBeTruthy()

    await user.click(screen.getByRole("button", { name: "Save" }))

    await waitFor(() => {
      expect(screen.getAllByText(/disk full/i).length).toBeGreaterThan(0)
    })
    expect(screen.getByLabelText("Unsaved changes")).toBeTruthy()
  })
})

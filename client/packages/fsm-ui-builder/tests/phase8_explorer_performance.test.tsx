import { afterEach, describe, expect, it, vi } from "vitest"
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { FSMUIBuilder, type BuilderAuthoringRPC, type DraftMachineDocument, type ValidationDiagnostic } from "../src"
import { __getExplorerRenderCount, __resetExplorerRenderCounts } from "../src/components/Explorer"
import { loadContractFixture } from "./fixtures"

function makeValidationDocument(): DraftMachineDocument {
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
          event: "approve_duplicate",
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

function makeDuplicateTransitionIDDocument(): DraftMachineDocument {
  const base = makeValidationDocument()
  base.definition.transitions = [
    {
      id: "dup-transition",
      event: "approve",
      from: "draft",
      to: "approved",
      workflow: {
        nodes: [{ id: "step-1", kind: "step", step: { action_id: "audit.log" }, next: [] }]
      }
    },
    {
      id: "dup-transition",
      event: "approve_again",
      from: "draft",
      to: "approved",
      workflow: {
        nodes: [{ id: "step-2", kind: "step", step: { action_id: "audit.log" }, next: [] }]
      }
    }
  ]
  return base
}

function makeLargeDocument(): DraftMachineDocument {
  const fixture = loadContractFixture("40_authoring_get_machine_large.response.json") as {
    result: {
      data: {
        draft: DraftMachineDocument
      }
    }
  }
  return fixture.result.data.draft
}

function buildValidateOnlyAuthoringRPC(
  validateImpl: (data: {
    machineId?: string
    draft?: DraftMachineDocument
    scope?: {
      nodeIds?: string[]
    }
  }) => Promise<{ valid: boolean; diagnostics: ValidationDiagnostic[] }>
): BuilderAuthoringRPC {
  return {
    listMachines: async () => ({ items: [] }),
    getMachine: async () => ({
      machineId: "orders",
      version: "v1",
      draft: makeValidationDocument(),
      diagnostics: []
    }),
    saveDraft: async () => ({
      machineId: "orders",
      version: "v1",
      draftState: {
        is_draft: true,
        last_saved_at: "2026-03-10T00:00:00Z"
      },
      diagnostics: [],
      etag: "etag-v1"
    }),
    validate: validateImpl,
    publish: async () => ({
      machineId: "orders",
      version: "v1",
      publishedAt: "2026-03-10T00:00:00Z",
      diagnostics: []
    }),
    deleteMachine: async () => ({
      machineId: "orders",
      deleted: true
    })
  }
}

describe("phase 8 explorer performance and incremental validation", () => {
  afterEach(() => {
    cleanup()
    __resetExplorerRenderCounts()
  })

  it("runs scoped validation first, then parity-checks against full validation output", async () => {
    const user = userEvent.setup()

    const scopedFixture = loadContractFixture("28_authoring_validate_scoped_duplicate.response.json") as {
      result: {
        data: {
          valid: boolean
          diagnostics: ValidationDiagnostic[]
        }
      }
    }

    const validateCalls: Array<{
      machineId?: string
      draft?: DraftMachineDocument
      scope?: {
        nodeIds?: string[]
      }
    }> = []

    const validateMock = vi.fn(async (data: { machineId?: string; draft?: DraftMachineDocument; scope?: { nodeIds?: string[] } }) => {
      validateCalls.push(data)
      return {
        valid: scopedFixture.result.data.valid,
        diagnostics: scopedFixture.result.data.diagnostics
      }
    })

    render(
      <FSMUIBuilder
        initialDocument={makeValidationDocument()}
        authoringRPC={buildValidateOnlyAuthoringRPC(validateMock)}
      />
    )

    await user.click(screen.getByTitle("Tree View"))

    const transitionsScroll = screen.getByTestId("fub-explorer-transitions-scroll")
    await user.click(within(transitionsScroll).getByRole("button", { name: /approve_duplicate -> approved/i }))

    const eventInput = screen.getByLabelText("Transition event") as HTMLInputElement
    await user.clear(eventInput)
    await user.type(eventInput, "approve_duplicate_v2")

    await user.click(screen.getByRole("button", { name: "Validate" }))

    await waitFor(() => {
      expect(validateMock).toHaveBeenCalledTimes(2)
    })

    expect(validateCalls[0]?.scope?.nodeIds).toContain("approve_duplicate")
    expect(validateCalls[1]?.scope).toBeUndefined()
    expect(screen.getAllByText(/duplicate transition definition for event\/from pair/i).length).toBeGreaterThan(0)
  })

  it("virtualizes large explorer lists and keeps keyboard navigation working for offscreen rows", async () => {
    const user = userEvent.setup()

    render(<FSMUIBuilder initialDocument={makeLargeDocument()} />)

    await user.click(screen.getByTitle("Tree View"))

    const statesScroll = screen.getByTestId("fub-explorer-states-scroll")
    const transitionsScroll = screen.getByTestId("fub-explorer-transitions-scroll")

    expect(statesScroll.getAttribute("data-virtualized")).toBe("true")
    expect(transitionsScroll.getAttribute("data-virtualized")).toBe("true")

    const initiallyRenderedRows = within(statesScroll).getAllByRole("button")
    expect(initiallyRenderedRows.length).toBeLessThan(80)

    const firstState = within(statesScroll).getByRole("button", { name: "s_000" })
    await user.click(firstState)
    firstState.focus()
    fireEvent.keyDown(firstState, { key: "End" })

    await waitFor(() => {
      expect((screen.getByLabelText("State name") as HTMLInputElement).value).toBe("s_219")
    })
  })

  it("memoizes explorer rows so unrelated visible rows do not rerender on single-state edits", async () => {
    const user = userEvent.setup()

    render(<FSMUIBuilder initialDocument={makeLargeDocument()} />)

    await user.click(screen.getByTitle("Tree View"))

    const statesScroll = screen.getByTestId("fub-explorer-states-scroll")
    await user.click(within(statesScroll).getByRole("button", { name: "s_000" }))

    await waitFor(() => {
      expect(screen.getByLabelText("State name")).toBeTruthy()
    })

    __resetExplorerRenderCounts()

    const stateName = screen.getByLabelText("State name") as HTMLInputElement
    fireEvent.change(stateName, { target: { value: "s_000_edited" } })

    await waitFor(() => {
      expect(__getExplorerRenderCount("state", 0)).toBeGreaterThan(0)
    })

    expect(__getExplorerRenderCount("state", 1)).toBe(0)
  }, 10000)

  it("renders transition rows without duplicate-key warnings when transition IDs are duplicated", async () => {
    const user = userEvent.setup()
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {})

    render(<FSMUIBuilder initialDocument={makeDuplicateTransitionIDDocument()} />)
    await user.click(screen.getByTitle("Tree View"))

    expect(within(screen.getByTestId("fub-explorer-transitions-scroll")).getAllByRole("button").length).toBe(2)
    const duplicateKeyWarning = consoleError.mock.calls.some((call) =>
      call.some((entry) => String(entry).includes("Encountered two children with the same key"))
    )
    expect(duplicateKeyWarning).toBe(false)
    consoleError.mockRestore()
  })
})

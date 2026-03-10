import { afterEach, describe, expect, it, vi } from "vitest"
import { cleanup, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { FSMUIBuilder, type BuilderAuthoringRPC, type DraftMachineDocument, BuilderResultError, HANDLED_ERROR_CODES } from "../src"
import { WorkflowGraphEditor } from "../src/components/inspector_parts/WorkflowGraphEditor"

function makeDocument(version = "v1"): DraftMachineDocument {
  return {
    definition: {
      id: "orders",
      name: "Orders",
      version,
      states: [
        { name: "draft", initial: true },
        { name: "approved", terminal: true }
      ],
      transitions: [
        {
          id: "t-approve",
          event: "approve",
          from: "draft",
          to: "approved",
          workflow: {
            nodes: [
              { id: "step-1", kind: "step", step: { action_id: "audit.log" }, next: ["when-1"] },
              { id: "when-1", kind: "when", expr: "amount > 0", next: [] }
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

function makeAuthoringRPC(input: Partial<BuilderAuthoringRPC>): BuilderAuthoringRPC {
  return {
    listMachines: vi.fn(async () => ({ items: [] })),
    getMachine: vi.fn(async () => ({
      machineId: "orders",
      version: "v1",
      draft: makeDocument("v1"),
      diagnostics: []
    })),
    saveDraft: vi.fn(async () => ({
      machineId: "orders",
      version: "v2",
      draftState: {
        is_draft: true,
        last_saved_at: "2026-03-10T00:00:00Z"
      },
      diagnostics: [],
      etag: "orders-v2"
    })),
    validate: vi.fn(async () => ({ valid: true, diagnostics: [] })),
    publish: vi.fn(async () => ({
      machineId: "orders",
      version: "v2",
      publishedAt: "2026-03-10T00:00:00Z",
      diagnostics: []
    })),
    deleteMachine: vi.fn(async () => ({ machineId: "orders", deleted: true })),
    ...input
  }
}

describe("phase 7 workflow/version/conflict features", () => {
  afterEach(() => {
    cleanup()
  })

  it("syncs workflow visual editor node selection and marks unsupported nodes as read-only", async () => {
    const user = userEvent.setup()
    const onSelectNode = vi.fn()
    render(
      <WorkflowGraphEditor
        nodes={[
          { id: "step-1", kind: "step", step: { action_id: "audit.log" }, next: ["parallel-1"] },
          { id: "parallel-1", kind: "parallel", next: [] }
        ]}
        onSelectNode={onSelectNode}
      />
    )

    await user.click(screen.getByRole("button", { name: "Select workflow node step-1" }))
    expect(onSelectNode).toHaveBeenCalledWith(0)
    expect(screen.getByText("read-only")).toBeTruthy()
    expect(screen.getByText(/parallel-1/i)).toBeTruthy()
  })

  it("opens version history with graceful local fallback when optional capabilities are unavailable", async () => {
    const user = userEvent.setup()
    render(<FSMUIBuilder initialDocument={makeDocument("v5")} />)

    await user.click(screen.getByRole("button", { name: "More" }))
    await user.click(screen.getByRole("menuitem", { name: "Version History" }))

    expect(await screen.findByRole("dialog", { name: "Version History" })).toBeTruthy()
    expect(screen.getByText("Authoring RPC unavailable; showing local version only.")).toBeTruthy()
    expect((screen.getByRole("button", { name: "Restore Selected" }) as HTMLButtonElement).disabled).toBe(true)
  })

  it("loads version history entries, diffs, and restores an older version through optional capabilities", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const authoringRPC = makeAuthoringRPC({
      listVersions: vi.fn(async () => ({
        machineId: "orders",
        items: [
          { version: "v2", updatedAt: "2026-03-10T03:00:00Z", isDraft: true, etag: "orders-v2" },
          { version: "v1", updatedAt: "2026-03-10T02:00:00Z", isDraft: false, etag: "orders-v1" }
        ]
      })),
      diffVersions: vi.fn(async () => ({
        machineId: "orders",
        baseVersion: "v1",
        targetVersion: "v2",
        hasConflicts: false,
        changes: [{ path: "$.definition.name", changeType: "updated" }]
      })),
      getVersion: vi.fn(async () => ({
        machineId: "orders",
        version: "v1",
        draft: makeDocument("v1"),
        diagnostics: [],
        etag: "orders-v1"
      }))
    })

    render(<FSMUIBuilder initialDocument={makeDocument("v2")} authoringRPC={authoringRPC} onChange={onChange} />)

    await user.click(screen.getByRole("button", { name: "More" }))
    await user.click(screen.getByRole("menuitem", { name: "Version History" }))
    expect(await screen.findByRole("dialog", { name: "Version History" })).toBeTruthy()

    await user.click(screen.getByRole("button", { name: /v1/i }))
    expect(await screen.findByText("$.definition.name")).toBeTruthy()

    await user.click(screen.getByRole("button", { name: "Restore Selected" }))
    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "Version History" })).toBeNull()
    })

    await waitFor(() => {
      const latest = onChange.mock.calls.at(-1)?.[0] as { document: DraftMachineDocument } | undefined
      expect(latest?.document.definition.version).toBe("v1")
    })
  })

  it("handles FSM_VERSION_CONFLICT with Keep Mine retry using the latest baseVersion", async () => {
    const user = userEvent.setup()
    const saveDraft = vi
      .fn()
      .mockImplementationOnce(async () => {
        throw new BuilderResultError("fsm.authoring.save_draft", {
          code: HANDLED_ERROR_CODES.versionConflict,
          message: "version conflict",
          details: {
            expectedVersion: "v1",
            actualVersion: "v2",
            conflictPaths: ["$.definition.transitions[0].event"]
          }
        })
      })
      .mockImplementationOnce(async () => ({
        machineId: "orders",
        version: "v3",
        draftState: {
          is_draft: true,
          last_saved_at: "2026-03-10T04:00:00Z"
        },
        diagnostics: [],
        etag: "orders-v3"
      }))

    const getMachine = vi.fn(async () => ({
      machineId: "orders",
      version: "v2",
      draft: makeDocument("v2"),
      diagnostics: [],
      etag: "orders-v2"
    }))

    const authoringRPC = makeAuthoringRPC({
      saveDraft,
      getMachine
    })

    render(<FSMUIBuilder initialDocument={makeDocument("v1")} authoringRPC={authoringRPC} />)

    await user.click(screen.getByRole("button", { name: "Save Draft" }))
    expect(await screen.findByRole("dialog", { name: "Version Conflict" })).toBeTruthy()

    await user.click(screen.getByRole("button", { name: "Keep Mine" }))

    await waitFor(() => {
      expect(saveDraft).toHaveBeenCalledTimes(2)
    })

    const secondCall = saveDraft.mock.calls[1]?.[0] as { baseVersion?: string } | undefined
    expect(secondCall?.baseVersion).toBe("v2")
    expect(screen.queryByRole("dialog", { name: "Version Conflict" })).toBeNull()
  })
})

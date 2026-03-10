import { describe, expect, it } from "vitest"

import {
  FSM_AUTHORING_METHODS,
  FSM_RUNTIME_METHODS,
  createBuilderAuthoringRPC,
  createBuilderRuntimeRPC,
  loadDraftDocumentForEditing,
  prepareDraftDocumentForSave,
  type BuilderResponseEnvelope
} from "../src"
import type { RPCClient } from "../../../src"
import { loadContractFixture } from "./fixtures"

interface CallRecord {
  method: string
  params: unknown
}

function fixtureResult(name: string): BuilderResponseEnvelope<unknown> {
  const fixture = loadContractFixture(name) as {
    result?: BuilderResponseEnvelope<unknown>
  }
  if (!fixture.result) {
    throw new Error(`fixture ${name} is missing result envelope`)
  }
  return fixture.result
}

describe("fsm-ui-builder end-to-end flow", () => {
  it("validates load -> edit -> validate -> publish -> simulate against frozen rpc contracts", async () => {
    const calls: CallRecord[] = []

    const client: RPCClient = {
      async call<TResult = unknown, TParams = unknown>(method: string, params?: TParams) {
        calls.push({ method, params })
        switch (method) {
          case FSM_AUTHORING_METHODS.getMachine:
            return fixtureResult("21_authoring_get_machine.response.json") as TResult
          case FSM_AUTHORING_METHODS.saveDraft:
            return fixtureResult("22_authoring_save_draft.response.json") as TResult
          case FSM_AUTHORING_METHODS.validate:
            return fixtureResult("23_authoring_validate.response.json") as TResult
          case FSM_AUTHORING_METHODS.publish:
            return fixtureResult("24_authoring_publish.response.json") as TResult
          case FSM_RUNTIME_METHODS.applyEvent:
            return fixtureResult("10_runtime_apply_event_dry_run.response.json") as TResult
          case FSM_RUNTIME_METHODS.snapshot:
            return fixtureResult("11_runtime_snapshot.response.json") as TResult
          default:
            throw new Error(`unexpected method: ${method}`)
        }
      }
    }

    const authoring = createBuilderAuthoringRPC(client)
    const runtime = createBuilderRuntimeRPC(client)

    const getReq = loadContractFixture("21_authoring_get_machine.request.json") as {
      params: {
        data: {
          machineId: string
          version?: string
          preferDraft?: boolean
        }
      }
    }
    const saveReq = loadContractFixture("22_authoring_save_draft.request.json") as {
      params: {
        data: {
          machineId: string
          validate: boolean
        }
      }
    }
    const validateReq = loadContractFixture("23_authoring_validate.request.json") as {
      params: {
        data: {
          machineId?: string
        }
      }
    }
    const publishReq = loadContractFixture("24_authoring_publish.request.json") as {
      params: {
        data: {
          machineId: string
        }
      }
    }
    const applyReq = loadContractFixture("10_runtime_apply_event_dry_run.request.json") as {
      params: {
        data: {
          machineId?: string
          entityId: string
          event: string
          msg: unknown
          expectedState?: string
          expectedVersion?: number
          idempotencyKey?: string
          metadata?: Record<string, unknown>
          dryRun?: boolean
        }
        meta?: Record<string, unknown>
      }
    }
    const snapshotReq = loadContractFixture("11_runtime_snapshot.request.json") as {
      params: {
        data: {
          machineId?: string
          entityId: string
          msg: unknown
          evaluateGuards?: boolean
          includeBlocked?: boolean
        }
        meta?: Record<string, unknown>
      }
    }

    const loaded = await authoring.getMachine(getReq.params.data)

    const editable = loadDraftDocumentForEditing(loaded.draft)
    editable.definition.name = "Orders Phase 4"
    editable.definition.transitions.push({
      id: "approve",
      event: "approve",
      from: "draft",
      to: "approved",
      workflow: {
        nodes: []
      },
      feature_future: {
        preserve: true
      }
    })
    editable.ui_schema.feature_ui_layout = {
      grid: true
    }

    const roundTrippedDraft = prepareDraftDocumentForSave({
      baseDocument: loaded.draft,
      editedDocument: editable
    })

    const saved = await authoring.saveDraft({
      machineId: saveReq.params.data.machineId,
      baseVersion: loaded.version,
      draft: roundTrippedDraft,
      validate: saveReq.params.data.validate
    })

    const validated = await authoring.validate({
      machineId: validateReq.params.data.machineId ?? loaded.machineId,
      draft: roundTrippedDraft
    })

    const published = await authoring.publish({
      machineId: publishReq.params.data.machineId,
      expectedVersion: saved.version
    })

    const dryRun = await runtime.applyEventDryRun(applyReq.params.data, applyReq.params.meta)
    const snapshot = await runtime.snapshot(snapshotReq.params.data, snapshotReq.params.meta)

    expect(roundTrippedDraft.definition.name).toBe("Orders Phase 4")
    expect(roundTrippedDraft.definition.transitions[0]?.feature_future).toEqual({ preserve: true })
    expect(roundTrippedDraft.ui_schema.feature_ui_layout).toEqual({ grid: true })

    expect(validated.valid).toBe(true)
    expect(published.version).toBe("v14")

    expect(dryRun.eventId).toBe("evt-100")
    expect(dryRun.snapshot.entityId).toBe("order-1")
    expect(snapshot.allowedTransitions[1]?.rejections?.[0]?.code).toBe("FSM_GUARD_REJECTED")

    expect(calls.map((entry) => entry.method)).toEqual([
      FSM_AUTHORING_METHODS.getMachine,
      FSM_AUTHORING_METHODS.saveDraft,
      FSM_AUTHORING_METHODS.validate,
      FSM_AUTHORING_METHODS.publish,
      FSM_RUNTIME_METHODS.applyEvent,
      FSM_RUNTIME_METHODS.snapshot
    ])

    expect(calls[0]?.params).toEqual({ data: getReq.params.data, meta: undefined })
    expect(calls[1]?.params).toEqual({
      data: {
        machineId: "orders",
        baseVersion: "v12",
        draft: roundTrippedDraft,
        validate: true
      },
      meta: undefined
    })
    expect(calls[2]?.params).toEqual({
      data: {
        machineId: "orders",
        draft: roundTrippedDraft
      },
      meta: undefined
    })
    expect(calls[3]?.params).toEqual({
      data: {
        machineId: "orders",
        expectedVersion: "v13"
      },
      meta: undefined
    })
    expect(calls[4]?.params).toEqual({ data: applyReq.params.data, meta: applyReq.params.meta })
    expect(calls[5]?.params).toEqual({ data: snapshotReq.params.data, meta: snapshotReq.params.meta })
  })
})

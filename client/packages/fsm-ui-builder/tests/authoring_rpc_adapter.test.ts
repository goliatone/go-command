import { describe, expect, it } from "vitest"

import {
  FSM_AUTHORING_METHODS,
  createBuilderAuthoringRPC,
  type DraftMachineDocument,
  type BuilderResponseEnvelope,
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

describe("fsm-ui-builder authoring rpc adapter", () => {
  it("calls frozen fsm.authoring.* methods with canonical payload envelopes", async () => {
    const calls: CallRecord[] = []

    const client: RPCClient = {
      async call<TResult = unknown, TParams = unknown>(method: string, params?: TParams) {
        calls.push({ method, params })
        switch (method) {
          case FSM_AUTHORING_METHODS.listMachines:
            return fixtureResult("20_authoring_list_machines.response.json") as TResult
          case FSM_AUTHORING_METHODS.getMachine:
            return fixtureResult("21_authoring_get_machine.response.json") as TResult
          case FSM_AUTHORING_METHODS.saveDraft:
            return fixtureResult("22_authoring_save_draft.response.json") as TResult
          case FSM_AUTHORING_METHODS.validate:
            return fixtureResult("23_authoring_validate.response.json") as TResult
          case FSM_AUTHORING_METHODS.publish:
            return fixtureResult("24_authoring_publish.response.json") as TResult
          case FSM_AUTHORING_METHODS.deleteMachine:
            return fixtureResult("25_authoring_delete_machine.response.json") as TResult
          default:
            throw new Error(`unexpected method: ${method}`)
        }
      }
    }

    const adapter = createBuilderAuthoringRPC(client)

    const listReq = loadContractFixture("20_authoring_list_machines.request.json") as {
      params: { data: { query: string; includeDrafts: boolean; limit: number; cursor: string } }
    }
    const getReq = loadContractFixture("21_authoring_get_machine.request.json") as {
      params: { data: { machineId: string; version: string; preferDraft: boolean } }
    }
    const saveReq = loadContractFixture("22_authoring_save_draft.request.json") as {
      params: {
        data: {
          machineId: string
          baseVersion: string
          draft: DraftMachineDocument
          validate: boolean
        }
      }
    }
    const validateReq = loadContractFixture("23_authoring_validate.request.json") as {
      params: {
        data: {
          machineId: string
          scope: {
            nodeIds: string[]
          }
        }
      }
    }
    const publishReq = loadContractFixture("24_authoring_publish.request.json") as {
      params: {
        data: {
          machineId: string
          expectedVersion: string
        }
      }
    }
    const deleteReq = loadContractFixture("25_authoring_delete_machine.request.json") as {
      params: {
        data: {
          machineId: string
          expectedVersion: string
          hardDelete: boolean
        }
      }
    }

    const list = await adapter.listMachines(listReq.params.data)
    const machine = await adapter.getMachine(getReq.params.data)
    const saved = await adapter.saveDraft(saveReq.params.data)
    const validated = await adapter.validate(validateReq.params.data)
    const published = await adapter.publish(publishReq.params.data)
    const deleted = await adapter.deleteMachine(deleteReq.params.data)

    expect(list.items[0]?.machineId).toBe("orders")
    expect(machine.machineId).toBe("orders")
    expect(saved.version).toBe("v13")
    expect(validated.valid).toBe(true)
    expect(published.version).toBe("v14")
    expect(deleted.deleted).toBe(true)

    expect(calls.map((entry) => entry.method)).toEqual([
      FSM_AUTHORING_METHODS.listMachines,
      FSM_AUTHORING_METHODS.getMachine,
      FSM_AUTHORING_METHODS.saveDraft,
      FSM_AUTHORING_METHODS.validate,
      FSM_AUTHORING_METHODS.publish,
      FSM_AUTHORING_METHODS.deleteMachine
    ])

    expect(calls[0]?.params).toEqual({ data: listReq.params.data, meta: undefined })
    expect(calls[1]?.params).toEqual({ data: getReq.params.data, meta: undefined })
    expect(calls[2]?.params).toEqual({ data: saveReq.params.data, meta: undefined })
    expect(calls[3]?.params).toEqual({ data: validateReq.params.data, meta: undefined })
    expect(calls[4]?.params).toEqual({ data: publishReq.params.data, meta: undefined })
    expect(calls[5]?.params).toEqual({ data: deleteReq.params.data, meta: undefined })
  })
})

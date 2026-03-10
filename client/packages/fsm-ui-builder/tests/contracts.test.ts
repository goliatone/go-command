import { describe, expect, it } from "vitest"

import {
  BUILDER_JSON_RPC_VERSION,
  BUILDER_RPC_PATH,
  FSM_AUTHORING_METHODS,
  FSM_RUNTIME_METHODS,
  HANDLED_ERROR_CODES,
  buildRPCEndpoint,
  createBuilderRPCClient
} from "../src"
import { loadContractFixture } from "./fixtures"

describe("fsm-ui-builder contracts", () => {
  it("pins transport defaults to POST /rpc with JSON-RPC 2.0", async () => {
    const request = loadContractFixture("00_transport_post_rpc.request.json") as {
      jsonrpc: string
      method: string
    }

    expect(BUILDER_RPC_PATH).toBe("/rpc")
    expect(BUILDER_JSON_RPC_VERSION).toBe("2.0")
    expect(request.jsonrpc).toBe("2.0")
    expect(request.method).toBe(FSM_AUTHORING_METHODS.getMachine)

    const fetchSpy = async (_input: string | URL | Request, init?: RequestInit) => {
      const body = JSON.parse(String(init?.body)) as { jsonrpc?: string }
      expect(body.jsonrpc).toBe("2.0")
      return {
        ok: true,
        status: 200,
        json: async () => ({
          jsonrpc: "2.0",
          id: "req-1",
          result: {
            data: {
              ok: true
            }
          }
        })
      } as Response
    }

    const client = createBuilderRPCClient({ fetchImpl: fetchSpy as unknown as typeof fetch })
    const result = await client.call<{ data: { ok: boolean } }>("fsm.authoring.get_machine", {
      data: { machineId: "orders" }
    })

    expect(result.data.ok).toBe(true)
  })

  it("resolves endpoint against origin and never derives per-method REST paths", () => {
    expect(buildRPCEndpoint({ origin: "https://api.example.com" })).toBe("https://api.example.com/rpc")
    expect(buildRPCEndpoint({ origin: "https://api.example.com/" })).toBe("https://api.example.com/rpc")
    expect(buildRPCEndpoint({ endpoint: "https://example.org/custom-rpc" })).toBe("https://example.org/custom-rpc")
  })

  it("matches frozen runtime and authoring method names", () => {
    expect(FSM_RUNTIME_METHODS.applyEvent).toBe("fsm.apply_event")
    expect(FSM_RUNTIME_METHODS.snapshot).toBe("fsm.snapshot")

    expect(FSM_AUTHORING_METHODS.listMachines).toBe("fsm.authoring.list_machines")
    expect(FSM_AUTHORING_METHODS.getMachine).toBe("fsm.authoring.get_machine")
    expect(FSM_AUTHORING_METHODS.saveDraft).toBe("fsm.authoring.save_draft")
    expect(FSM_AUTHORING_METHODS.validate).toBe("fsm.authoring.validate")
    expect(FSM_AUTHORING_METHODS.publish).toBe("fsm.authoring.publish")
    expect(FSM_AUTHORING_METHODS.deleteMachine).toBe("fsm.authoring.delete_machine")
  })

  it("pins prescribed FE error branches", () => {
    expect(HANDLED_ERROR_CODES.versionConflict).toBe("FSM_VERSION_CONFLICT")
    expect(HANDLED_ERROR_CODES.idempotencyConflict).toBe("FSM_IDEMPOTENCY_CONFLICT")
    expect(HANDLED_ERROR_CODES.guardRejected).toBe("FSM_GUARD_REJECTED")
    expect(HANDLED_ERROR_CODES.invalidTransition).toBe("FSM_INVALID_TRANSITION")
    expect(HANDLED_ERROR_CODES.stateNotFound).toBe("FSM_STATE_NOT_FOUND")
    expect(HANDLED_ERROR_CODES.authoringNotFound).toBe("FSM_AUTHORING_NOT_FOUND")
    expect(HANDLED_ERROR_CODES.authoringValidationFailed).toBe("FSM_AUTHORING_VALIDATION_FAILED")
    expect(HANDLED_ERROR_CODES.internal).toBe("FSM_INTERNAL")
  })
})

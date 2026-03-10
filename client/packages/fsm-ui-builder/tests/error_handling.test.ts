import { describe, expect, it } from "vitest"

import { BuilderResultError, HANDLED_ERROR_CODES, toHandledBuilderError } from "../src"
import { RPCClientError } from "../../../src/rpc_client"

describe("fsm-ui-builder error handling", () => {
  it("maps frozen branch error codes from builder result errors", () => {
    const handled = toHandledBuilderError(
      new BuilderResultError("fsm.apply_event", {
        code: HANDLED_ERROR_CODES.guardRejected,
        message: "guard rejected",
        category: "bad_input",
        retryable: false
      })
    )

    expect(handled.code).toBe(HANDLED_ERROR_CODES.guardRejected)
    expect(handled.method).toBe("fsm.apply_event")
    expect(handled.message).toBe("guard rejected")
  })

  it("falls back to FSM_INTERNAL for unknown error shapes", () => {
    const handled = toHandledBuilderError({ code: "SOME_UNKNOWN", message: "boom" })

    expect(handled.code).toBe(HANDLED_ERROR_CODES.internal)
    expect(handled.message).toBe("boom")
  })

  it("adds endpoint guidance for method-not-found rpc errors", () => {
    const handled = toHandledBuilderError(
      new RPCClientError({
        method: "fsm.authoring.get_machine",
        message: "method not found",
        code: -32601
      })
    )

    expect(handled.code).toBe(HANDLED_ERROR_CODES.internal)
    expect(handled.message).toContain("/api/rpc")
    expect(handled.method).toBe("fsm.authoring.get_machine")
  })
})

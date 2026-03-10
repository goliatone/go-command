import { describe, expect, it } from "vitest"

import { normalizeRuntimeApplyEvent, normalizeRuntimeSnapshot } from "../src"
import { loadServerFixture } from "./fixtures"

describe("fsm-ui-builder runtime normalization", () => {
  it("normalizes apply_event payloads with mixed wire casing", () => {
    const fixture = loadServerFixture("apply_event_rpc_result_data_mixed_case.json")

    const normalized = normalizeRuntimeApplyEvent(fixture)

    expect(normalized.eventId).toBe("evt-201")
    expect(normalized.snapshot.entityId).toBe("ord-9")
    expect(normalized.transition.currentState).toBe("approved")
    expect(normalized.idempotencyHit).toBe(true)
  })

  it("normalizes snapshot payloads wrapped in json-rpc result.data", () => {
    const fixture = loadServerFixture("snapshot_rpc_result_data_mixed_case.json")

    const normalized = normalizeRuntimeSnapshot(fixture)

    expect(normalized.entityId).toBe("ord-9")
    expect(normalized.allowedTransitions[0].allowed).toBe(true)
    expect(normalized.allowedTransitions[1].allowed).toBe(false)
    expect(normalized.allowedTransitions[1].rejections?.[0].code).toBe("FSM_GUARD_REJECTED")
  })
})

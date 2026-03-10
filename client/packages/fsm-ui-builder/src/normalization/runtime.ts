import {
  normalizeApplyEventResponse,
  normalizeSnapshot,
  type ApplyEventResponse,
  type Snapshot
} from "../../../../src"

function asRecord(value: unknown): Record<string, unknown> | null {
  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>
  }
  return null
}

function unwrapResultData(payload: unknown): unknown {
  const outer = asRecord(payload)
  if (!outer) {
    return payload
  }

  const result = asRecord(outer.result ?? outer.Result)
  if (result) {
    return result.data ?? result.Data ?? result
  }

  return outer.data ?? outer.Data ?? outer
}

export function normalizeRuntimeApplyEvent(payload: unknown): ApplyEventResponse {
  return normalizeApplyEventResponse(payload)
}

export function normalizeRuntimeSnapshot(payload: unknown): Snapshot {
  return normalizeSnapshot(unwrapResultData(payload))
}

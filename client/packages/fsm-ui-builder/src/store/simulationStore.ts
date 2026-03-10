import { createStore, type StoreApi } from "zustand/vanilla"

import type { ApplyEventResponse, Snapshot, TransitionInfo } from "../../../../src"
import type { HandledErrorCode } from "../contracts"
import { normalizeRuntimeApplyEvent, normalizeRuntimeSnapshot } from "../normalization/runtime"

export interface SimulationProjection {
  selectedTransitionID?: string
  event: string
  previousState: string
  currentState: string
  status: string
  idempotencyHit?: boolean
}

export interface SimulationErrorEntry {
  id: string
  code: HandledErrorCode
  message: string
  method?: string
  timestamp: string
}

export interface SimulationLogEntry {
  id: string
  level: "info" | "error"
  message: string
  timestamp: string
}

export interface SimulationStoreState {
  applyEventResult: ApplyEventResponse | null
  snapshotResult: Snapshot | null
  projectedOutcome: SimulationProjection | null
  blockedTransitions: TransitionInfo[]
  errors: SimulationErrorEntry[]
  log: SimulationLogEntry[]
  setApplyEventWirePayload(payload: unknown, context?: { event?: string; transitionId?: string }): void
  setSnapshotWirePayload(payload: unknown): void
  pushError(input: { code: HandledErrorCode; message: string; method?: string }): void
  pushInfo(message: string): void
  clear(): void
}

export type SimulationStore = StoreApi<SimulationStoreState>

function makeLogEntry(level: "info" | "error", message: string): SimulationLogEntry {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    level,
    message,
    timestamp: new Date().toISOString()
  }
}

function makeErrorEntry(input: { code: HandledErrorCode; message: string; method?: string }): SimulationErrorEntry {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    code: input.code,
    message: input.message,
    method: input.method,
    timestamp: new Date().toISOString()
  }
}

function setApplyEventResult(
  payload: unknown,
  context?: {
    event?: string
    transitionId?: string
  }
): Pick<SimulationStoreState, "applyEventResult" | "projectedOutcome" | "log"> {
  const normalized = normalizeRuntimeApplyEvent(payload)
  const status = normalized.execution?.status ?? "dry_run"

  const projectedOutcome: SimulationProjection = {
    selectedTransitionID: context?.transitionId,
    event: context?.event ?? "(event)",
    previousState: normalized.transition.previousState,
    currentState: normalized.transition.currentState,
    status,
    idempotencyHit: normalized.idempotencyHit
  }

  return {
    applyEventResult: normalized,
    projectedOutcome,
    log: [
      makeLogEntry(
        "info",
        `Projected ${projectedOutcome.event}: ${projectedOutcome.previousState} -> ${projectedOutcome.currentState} (${projectedOutcome.status})`
      )
    ]
  }
}

function setSnapshotResult(payload: unknown): Pick<SimulationStoreState, "snapshotResult" | "blockedTransitions" | "log"> {
  const normalized = normalizeRuntimeSnapshot(payload)
  const blockedTransitions = normalized.allowedTransitions.filter((transition) => !transition.allowed)

  return {
    snapshotResult: normalized,
    blockedTransitions,
    log: [
      makeLogEntry(
        "info",
        `Snapshot state ${normalized.currentState}, blocked transitions: ${blockedTransitions.length}`
      )
    ]
  }
}

export function createSimulationStore(): SimulationStore {
  return createStore<SimulationStoreState>((set) => ({
    applyEventResult: null,
    snapshotResult: null,
    projectedOutcome: null,
    blockedTransitions: [],
    errors: [],
    log: [],
    setApplyEventWirePayload(payload, context) {
      const next = setApplyEventResult(payload, context)
      set((state) => ({
        applyEventResult: next.applyEventResult,
        projectedOutcome: next.projectedOutcome,
        log: [...state.log, ...next.log]
      }))
    },
    setSnapshotWirePayload(payload) {
      const next = setSnapshotResult(payload)
      set((state) => ({
        snapshotResult: next.snapshotResult,
        blockedTransitions: next.blockedTransitions,
        log: [...state.log, ...next.log]
      }))
    },
    pushError(input) {
      set((state) => ({
        errors: [...state.errors, makeErrorEntry(input)],
        log: [...state.log, makeLogEntry("error", `[${input.code}] ${input.message}`)]
      }))
    },
    pushInfo(message) {
      set((state) => ({
        log: [...state.log, makeLogEntry("info", message)]
      }))
    },
    clear() {
      set({
        applyEventResult: null,
        snapshotResult: null,
        projectedOutcome: null,
        blockedTransitions: [],
        errors: [],
        log: []
      })
    }
  }))
}

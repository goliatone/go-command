import { createStore, type StoreApi } from "zustand/vanilla"

import type { ApplyEventResponse, Snapshot } from "../../../../src"
import { normalizeRuntimeApplyEvent, normalizeRuntimeSnapshot } from "../normalization/runtime"

export interface SimulationLogEntry {
  id: string
  level: "info" | "error"
  message: string
  timestamp: string
}

export interface SimulationStoreState {
  applyEventResult: ApplyEventResponse | null
  snapshotResult: Snapshot | null
  log: SimulationLogEntry[]
  setApplyEventWirePayload(payload: unknown): void
  setSnapshotWirePayload(payload: unknown): void
  pushError(message: string): void
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

export function createSimulationStore(): SimulationStore {
  return createStore<SimulationStoreState>((set) => ({
    applyEventResult: null,
    snapshotResult: null,
    log: [],
    setApplyEventWirePayload(payload) {
      const normalized = normalizeRuntimeApplyEvent(payload)
      set((state) => ({
        applyEventResult: normalized,
        log: [
          ...state.log,
          makeLogEntry(
            "info",
            `Dry-run projected ${normalized.transition.previousState} -> ${normalized.transition.currentState}`
          )
        ]
      }))
    },
    setSnapshotWirePayload(payload) {
      const normalized = normalizeRuntimeSnapshot(payload)
      const blocked = normalized.allowedTransitions.filter((transition) => !transition.allowed).length
      set((state) => ({
        snapshotResult: normalized,
        log: [
          ...state.log,
          makeLogEntry(
            "info",
            `Snapshot state ${normalized.currentState}, blocked transitions: ${blocked}`
          )
        ]
      }))
    },
    pushError(message) {
      set((state) => ({
        log: [...state.log, makeLogEntry("error", message)]
      }))
    },
    clear() {
      set({
        applyEventResult: null,
        snapshotResult: null,
        log: []
      })
    }
  }))
}

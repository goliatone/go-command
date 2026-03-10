import type { DraftMachineDocument } from "../contracts"
import { deepClone } from "../document"

const DEFAULT_STORAGE_NAMESPACE = "fsm-ui-builder.autosave"

export interface MachineDraftSummary {
  machineId: string
  updatedAt: string
}

export interface PersistedMachineDraft {
  machineId: string
  updatedAt: string
  document: DraftMachineDocument
}

export interface PersistenceStore {
  list(): Promise<MachineDraftSummary[]>
  load(machineId: string): Promise<PersistedMachineDraft | null>
  save(draft: PersistedMachineDraft): Promise<void>
  delete(machineId: string): Promise<void>
}

function canUseStorage(): boolean {
  if (typeof window === "undefined" || typeof window.localStorage === "undefined") {
    return false
  }
  return (
    typeof window.localStorage.getItem === "function" &&
    typeof window.localStorage.setItem === "function" &&
    typeof window.localStorage.removeItem === "function"
  )
}

function normalizeMachineID(machineId: string): string {
  return machineId.trim()
}

function readPersistedRecord(raw: string | null): PersistedMachineDraft | null {
  if (!raw) {
    return null
  }
  try {
    const parsed = JSON.parse(raw) as PersistedMachineDraft
    if (!parsed || typeof parsed !== "object") {
      return null
    }
    if (typeof parsed.machineId !== "string" || !parsed.document || typeof parsed.updatedAt !== "string") {
      return null
    }
    return {
      machineId: parsed.machineId,
      updatedAt: parsed.updatedAt,
      document: deepClone(parsed.document)
    }
  } catch {
    return null
  }
}

function isNamespaceKey(key: string, namespace: string): boolean {
  return key.startsWith(`${namespace}:`)
}

function keyFor(namespace: string, machineId: string): string {
  return `${namespace}:${machineId}`
}

export function createLocalStoragePersistenceStore(namespace = DEFAULT_STORAGE_NAMESPACE): PersistenceStore {
  return {
    async list() {
      if (!canUseStorage()) {
        return []
      }
      const output: MachineDraftSummary[] = []
      for (let index = 0; index < window.localStorage.length; index += 1) {
        const key = window.localStorage.key(index)
        if (!key || !isNamespaceKey(key, namespace)) {
          continue
        }
        const record = readPersistedRecord(window.localStorage.getItem(key))
        if (!record) {
          continue
        }
        output.push({ machineId: record.machineId, updatedAt: record.updatedAt })
      }
      output.sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
      return output
    },
    async load(machineId) {
      const normalizedMachineID = normalizeMachineID(machineId)
      if (normalizedMachineID === "" || !canUseStorage()) {
        return null
      }
      const key = keyFor(namespace, normalizedMachineID)
      const persisted = readPersistedRecord(window.localStorage.getItem(key))
      if (!persisted) {
        return null
      }
      return {
        machineId: persisted.machineId,
        updatedAt: persisted.updatedAt,
        document: deepClone(persisted.document)
      }
    },
    async save(draft) {
      const machineId = normalizeMachineID(draft.machineId)
      if (machineId === "" || !canUseStorage()) {
        return
      }
      const key = keyFor(namespace, machineId)
      const payload: PersistedMachineDraft = {
        machineId,
        updatedAt: draft.updatedAt,
        document: deepClone(draft.document)
      }
      window.localStorage.setItem(key, JSON.stringify(payload))
    },
    async delete(machineId) {
      const normalizedMachineID = normalizeMachineID(machineId)
      if (normalizedMachineID === "" || !canUseStorage()) {
        return
      }
      window.localStorage.removeItem(keyFor(namespace, normalizedMachineID))
    }
  }
}

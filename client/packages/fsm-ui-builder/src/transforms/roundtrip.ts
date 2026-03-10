import type { DraftMachineDocument } from "../contracts"
import { deepClone } from "../document"

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value)
}

function resolveArrayMatch(
  base: unknown[],
  editedItem: unknown,
  editedIndex: number,
  consumed: Set<number>
): unknown {
  if (isRecord(editedItem)) {
    const candidateKeys = ["id", "name", "machineId", "event"]
    for (const key of candidateKeys) {
      const expected = editedItem[key]
      if (typeof expected !== "string" || expected.trim() === "") {
        continue
      }
      for (let index = 0; index < base.length; index += 1) {
        if (consumed.has(index)) {
          continue
        }
        const current = base[index]
        if (!isRecord(current)) {
          continue
        }
        if (current[key] === expected) {
          consumed.add(index)
          return current
        }
      }
    }
  }

  if (editedIndex < base.length) {
    consumed.add(editedIndex)
    return base[editedIndex]
  }
  return undefined
}

function mergeUnknownPreserving(base: unknown, edited: unknown): unknown {
  if (Array.isArray(edited)) {
    const baseArray = Array.isArray(base) ? base : []
    const consumed = new Set<number>()
    return edited.map((item, index) => mergeUnknownPreserving(resolveArrayMatch(baseArray, item, index, consumed), item))
  }

  if (isRecord(edited)) {
    const baseRecord = isRecord(base) ? base : {}
    const output: Record<string, unknown> = {}

    for (const [key, value] of Object.entries(baseRecord)) {
      output[key] = deepClone(value)
    }

    for (const [key, value] of Object.entries(edited)) {
      output[key] = mergeUnknownPreserving(baseRecord[key], value)
    }

    return output
  }

  return deepClone(edited)
}

export function loadDraftDocumentForEditing(document: DraftMachineDocument): DraftMachineDocument {
  return deepClone(document)
}

export function prepareDraftDocumentForSave(input: {
  baseDocument: DraftMachineDocument
  editedDocument: DraftMachineDocument
}): DraftMachineDocument {
  return mergeUnknownPreserving(input.baseDocument, input.editedDocument) as DraftMachineDocument
}

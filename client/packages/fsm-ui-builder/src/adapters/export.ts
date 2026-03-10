import type { DraftMachineDocument, MachineDefinition } from "../contracts"

export interface ExportRPCResult {
  reference?: string
}

export interface ExportAdapter {
  exportJSON(input: { machineId: string; draft: DraftMachineDocument }): Promise<void>
  exportRPC?(input: { machineId: string; draft: DraftMachineDocument }): Promise<ExportRPCResult>
}

function toFileName(machineId: string): string {
  const safe = machineId.trim().replace(/[^a-zA-Z0-9_-]+/g, "-")
  return `${safe || "machine"}.json`
}

export function definitionFromDraft(draft: DraftMachineDocument): MachineDefinition {
  return draft.definition
}

function triggerBrowserDownload(fileName: string, content: string): void {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return
  }
  const blob = new Blob([content], { type: "application/json;charset=utf-8" })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = fileName
  link.style.display = "none"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

export function createDefaultExportAdapter(input: {
  exportRPC?: ExportAdapter["exportRPC"]
} = {}): ExportAdapter {
  return {
    async exportJSON({ machineId, draft }) {
      triggerBrowserDownload(toFileName(machineId), JSON.stringify(definitionFromDraft(draft), null, 2))
    },
    exportRPC: input.exportRPC
  }
}

export function isRPCExportAvailable(adapter: ExportAdapter | null): boolean {
  return Boolean(adapter?.exportRPC)
}

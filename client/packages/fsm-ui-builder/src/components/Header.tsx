import { useState } from "react"

import { useMachineStore, useUIStore } from "../store/provider"

export type SaveStatusState = "idle" | "saving" | "saved" | "error"
export type SaveStatusSource = "manual" | "autosave"

export interface SaveStatus {
  state: SaveStatusState
  source?: SaveStatusSource
  updatedAt?: string
  message?: string
}

export interface HeaderProps {
  onSave?: () => Promise<void> | void
  onValidate?: () => Promise<void> | void
  onSimulate?: () => Promise<void> | void
  onRecoverDraft?: () => Promise<void> | void
  onExportJSON?: () => Promise<void> | void
  onExportRPC?: () => Promise<void> | void
  runtimeAvailable?: boolean
  authoringAvailable?: boolean
  recoveryAvailable?: boolean
  rpcExportAvailable?: boolean
  readOnly?: boolean
  onPanelToggle?: (panel: "explorer" | "inspector" | "console") => void
  saveStatus?: SaveStatus
}

type HeaderAction = (() => Promise<void> | void) | undefined
const TIME_FORMATTER = new Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
})

function formatSaveStatus(status: SaveStatus | undefined, isDirty: boolean): string {
  const updatedAtLabel =
    status?.updatedAt && !Number.isNaN(Date.parse(status.updatedAt))
      ? TIME_FORMATTER.format(new Date(status.updatedAt))
      : undefined
  if (isDirty) {
    if (status?.state === "saving" && status.source === "autosave") {
      return "Unsaved changes (autosaving...)"
    }
    if (status?.state === "saved" && status.source === "autosave" && updatedAtLabel) {
      return `Unsaved changes (autosaved ${updatedAtLabel})`
    }
    if (status?.state === "error" && status.source === "autosave") {
      return `Unsaved changes (autosave failed: ${status.message ?? "internal error"})`
    }
    return "Unsaved changes"
  }
  if (status?.state === "saving") {
    return "Saving..."
  }
  if (status?.state === "saved" && updatedAtLabel) {
    return `Saved ${updatedAtLabel}`
  }
  if (status?.state === "error") {
    return `Save failed: ${status.message ?? "internal error"}`
  }
  return ""
}

export function Header(props: HeaderProps) {
  const machineName = useMachineStore((state) => state.document.definition.name)
  const isDirty = useMachineStore((state) => state.isDirty)
  const diagnosticsCount = useMachineStore((state) => state.diagnostics.length)
  const setMachineName = useMachineStore((state) => state.setMachineName)
  const undo = useMachineStore((state) => state.undo)
  const redo = useMachineStore((state) => state.redo)
  const historyIndex = useMachineStore((state) => state.historyIndex)
  const historyLength = useMachineStore((state) => state.history.length)

  const togglePanel = useUIStore((state) => state.togglePanel)

  const [busyAction, setBusyAction] = useState<string | null>(null)
  const saveStatusText = formatSaveStatus(props.saveStatus, isDirty)
  const saveStatusClass =
    props.saveStatus?.state === "error"
      ? " fub-save-status-error"
      : props.saveStatus?.state === "saving"
        ? " fub-save-status-saving"
        : ""

  const runAction = (name: string, action: HeaderAction) => {
    if (!action || typeof action !== "function") {
      return
    }
    try {
      const maybePromise = action()
      if (maybePromise instanceof Promise) {
        setBusyAction(name)
        maybePromise.finally(() => {
          setBusyAction((current) => (current === name ? null : current))
        })
      }
    } catch {
      setBusyAction((current) => (current === name ? null : current))
    }
  }

  const saveLabel = props.authoringAvailable ? "Save Draft" : "Save"
  const readOnly = Boolean(props.readOnly)

  return (
    <header className="fub-header" aria-label="Builder header">
      <div className="fub-header-left">
        <strong className="fub-brand">FSM Builder</strong>
        <label className="fub-machine-name-label">
          <span className="fub-label">Machine</span>
          <input
            aria-label="Machine name"
            className="fub-input"
            value={machineName}
            readOnly={readOnly}
            onChange={(event) => setMachineName(event.target.value)}
          />
          {isDirty ? <span aria-label="Unsaved changes" className="fub-dirty-dot" /> : null}
        </label>
        <span className={`fub-save-status${saveStatusClass}`} role="status" aria-live="polite">
          {saveStatusText}
        </span>
      </div>

      <div className="fub-header-actions" role="group" aria-label="Builder actions">
        <button
          type="button"
          className="fub-btn"
          onClick={undo}
          disabled={readOnly || historyIndex === 0 || Boolean(busyAction)}
          aria-keyshortcuts="Control+Z Meta+Z"
        >
          Undo
        </button>
        <button
          type="button"
          className="fub-btn"
          onClick={redo}
          disabled={readOnly || historyIndex >= historyLength - 1 || Boolean(busyAction)}
          aria-keyshortcuts="Control+Shift+Z Meta+Shift+Z"
        >
          Redo
        </button>
        <button
          type="button"
          className="fub-btn"
          onClick={() => runAction("save", props.onSave)}
          disabled={readOnly || Boolean(busyAction)}
          aria-keyshortcuts="Control+S Meta+S"
        >
          {busyAction === "save" ? "Saving..." : saveLabel}
        </button>
        <button
          type="button"
          className="fub-btn"
          onClick={() => runAction("validate", props.onValidate)}
          disabled={readOnly || Boolean(busyAction)}
          aria-keyshortcuts="Control+Enter Meta+Enter"
        >
          {busyAction === "validate" ? "Validating..." : "Validate"}
        </button>
        <button
          type="button"
          className="fub-btn"
          onClick={() => runAction("simulate", props.onSimulate)}
          disabled={!props.runtimeAvailable || Boolean(busyAction)}
          title={props.runtimeAvailable ? "Run dry-run + snapshot" : "Runtime RPC unavailable"}
        >
          {busyAction === "simulate" ? "Simulating..." : "Simulate"}
        </button>
        <button
          type="button"
          className="fub-btn"
          onClick={() => runAction("recover", props.onRecoverDraft)}
          disabled={readOnly || !props.recoveryAvailable || Boolean(busyAction)}
          title={props.recoveryAvailable ? "Recover autosaved draft" : "No autosaved draft"}
        >
          Recover Draft
        </button>
        <button
          type="button"
          className="fub-btn"
          onClick={() => runAction("export-json", props.onExportJSON)}
          disabled={Boolean(busyAction)}
        >
          Export JSON
        </button>
        <button
          type="button"
          className="fub-btn"
          onClick={() => runAction("export-rpc", props.onExportRPC)}
          disabled={Boolean(busyAction)}
          title={props.rpcExportAvailable ? "Export via RPC adapter" : "RPC export unavailable"}
        >
          Export RPC
        </button>
        <button
          type="button"
          className="fub-btn"
          onClick={() => (props.onPanelToggle ? props.onPanelToggle("explorer") : togglePanel("explorer"))}
        >
          Explorer
        </button>
        <button
          type="button"
          className="fub-btn"
          onClick={() => (props.onPanelToggle ? props.onPanelToggle("inspector") : togglePanel("inspector"))}
        >
          Inspector
        </button>
        <button
          type="button"
          className="fub-btn"
          onClick={() => (props.onPanelToggle ? props.onPanelToggle("console") : togglePanel("console"))}
          aria-keyshortcuts="Control+` Meta+`"
        >
          Console
        </button>
        <span className="fub-badge" aria-live="polite">
          Problems: {diagnosticsCount}
        </span>
      </div>
    </header>
  )
}

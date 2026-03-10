import { useState } from "react"

import { useMachineStore, useUIStore } from "../store/provider"

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

  const runAction = (name: string, action: HeaderProps[keyof HeaderProps]) => {
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
            onChange={(event) => setMachineName(event.target.value)}
          />
          {isDirty ? <span aria-label="Unsaved changes" className="fub-dirty-dot" /> : null}
        </label>
      </div>

      <div className="fub-header-actions" role="group" aria-label="Builder actions">
        <button type="button" className="fub-btn" onClick={undo} disabled={historyIndex === 0 || Boolean(busyAction)}>
          Undo
        </button>
        <button
          type="button"
          className="fub-btn"
          onClick={redo}
          disabled={historyIndex >= historyLength - 1 || Boolean(busyAction)}
        >
          Redo
        </button>
        <button type="button" className="fub-btn" onClick={() => runAction("save", props.onSave)} disabled={Boolean(busyAction)}>
          {busyAction === "save" ? "Saving..." : saveLabel}
        </button>
        <button
          type="button"
          className="fub-btn"
          onClick={() => runAction("validate", props.onValidate)}
          disabled={Boolean(busyAction)}
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
          disabled={!props.recoveryAvailable || Boolean(busyAction)}
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
        <button type="button" className="fub-btn" onClick={() => togglePanel("explorer")}>
          Explorer
        </button>
        <button type="button" className="fub-btn" onClick={() => togglePanel("inspector")}>
          Inspector
        </button>
        <button type="button" className="fub-btn" onClick={() => togglePanel("console")}>
          Console
        </button>
        <span className="fub-badge" aria-live="polite">
          Problems: {diagnosticsCount}
        </span>
      </div>
    </header>
  )
}

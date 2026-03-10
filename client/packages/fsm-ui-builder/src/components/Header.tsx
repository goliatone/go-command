import { useState } from "react"

import { useMachineStore, useUIStore } from "../store/provider"
import {
  ChevronDownIcon,
  DownloadIcon,
  IconButton,
  MoonIcon,
  PanelRightIcon,
  PlayIcon,
  RedoIcon,
  RefreshIcon,
  SidebarIcon,
  SunIcon,
  TerminalIcon,
  UndoIcon,
  DropdownMenu,
  type DropdownMenuItem
} from "./DropdownMenu"

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
  const theme = useUIStore((state) => state.theme)
  const toggleTheme = useUIStore((state) => state.toggleTheme)
  const explorerCollapsed = useUIStore((state) => state.explorerCollapsed)
  const inspectorCollapsed = useUIStore((state) => state.inspectorCollapsed)
  const consoleCollapsed = useUIStore((state) => state.consoleCollapsed)

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

  // More dropdown menu items
  const moreMenuItems: DropdownMenuItem[] = [
    {
      label: "Recover Draft",
      onClick: () => runAction("recover", props.onRecoverDraft),
      disabled: readOnly || !props.recoveryAvailable || Boolean(busyAction),
      icon: <RefreshIcon />
    },
    {
      label: "Export JSON",
      onClick: () => runAction("export-json", props.onExportJSON),
      disabled: Boolean(busyAction),
      icon: <DownloadIcon />
    },
    {
      label: "Export RPC",
      onClick: () => runAction("export-rpc", props.onExportRPC),
      disabled: Boolean(busyAction) || !props.rpcExportAvailable,
      icon: <DownloadIcon />
    }
  ]

  const handlePanelToggle = (panel: "explorer" | "inspector" | "console") => {
    if (props.onPanelToggle) {
      props.onPanelToggle(panel)
    } else {
      togglePanel(panel)
    }
  }

  return (
    <header className="fub-header" aria-label="Builder header">
      {/* Left section: Logo and machine name */}
      <div className="fub-header-left">
        <strong className="fub-brand">FSM Builder</strong>
        <div className="fub-header-separator" aria-hidden="true" />
        <label className="fub-machine-name-label">
          <span className="fub-label">Machine:</span>
          <input
            aria-label="Machine name"
            className="fub-input fub-machine-input"
            value={machineName}
            readOnly={readOnly}
            onChange={(event) => setMachineName(event.target.value)}
          />
          {isDirty ? <span aria-label="Unsaved changes" className="fub-dirty-dot" /> : null}
        </label>
        <span className="fub-badge fub-problems-badge" aria-live="polite">
          Problems: {diagnosticsCount}
        </span>
      </div>

      {/* Center section: Main actions */}
      <div className="fub-header-center" role="group" aria-label="Builder actions">
        {/* Undo/Redo group */}
        <div className="fub-btn-group">
          <IconButton
            icon={<UndoIcon />}
            onClick={undo}
            disabled={readOnly || historyIndex === 0 || Boolean(busyAction)}
            ariaLabel="Undo"
            title="Undo (Ctrl+Z)"
          />
          <IconButton
            icon={<RedoIcon />}
            onClick={redo}
            disabled={readOnly || historyIndex >= historyLength - 1 || Boolean(busyAction)}
            ariaLabel="Redo"
            title="Redo (Ctrl+Shift+Z)"
          />
        </div>

        <div className="fub-header-separator" aria-hidden="true" />

        {/* Save/Validate group */}
        <div className="fub-btn-group">
          <button
            type="button"
            className="fub-btn fub-btn-secondary"
            onClick={() => runAction("save", props.onSave)}
            disabled={readOnly || Boolean(busyAction)}
            aria-keyshortcuts="Control+S Meta+S"
          >
            {busyAction === "save" ? "Saving..." : saveLabel}
          </button>
          <button
            type="button"
            className="fub-btn fub-btn-secondary"
            onClick={() => runAction("validate", props.onValidate)}
            disabled={readOnly || Boolean(busyAction)}
            aria-keyshortcuts="Control+Enter Meta+Enter"
          >
            {busyAction === "validate" ? "Validating..." : "Validate"}
          </button>
        </div>

        <div className="fub-header-separator" aria-hidden="true" />

        {/* More dropdown */}
        <DropdownMenu
          trigger={
            <>
              More <ChevronDownIcon />
            </>
          }
          items={moreMenuItems}
          disabled={Boolean(busyAction)}
        />

        <div className="fub-header-separator" aria-hidden="true" />

        {/* Primary action: Run/Simulate */}
        <button
          type="button"
          className="fub-btn fub-btn-primary"
          onClick={() => runAction("simulate", props.onSimulate)}
          disabled={!props.runtimeAvailable || Boolean(busyAction)}
          title={props.runtimeAvailable ? "Run dry-run + snapshot" : "Runtime RPC unavailable"}
        >
          <PlayIcon />
          {busyAction === "simulate" ? "Running..." : "Run"}
        </button>
      </div>

      {/* Right section: Panel toggles and theme */}
      <div className="fub-header-right" role="group" aria-label="View controls">
        {/* Panel toggles */}
        <div className="fub-btn-group">
          <IconButton
            icon={<SidebarIcon />}
            onClick={() => handlePanelToggle("explorer")}
            ariaLabel={explorerCollapsed ? "Show Explorer" : "Hide Explorer"}
            title={explorerCollapsed ? "Show Explorer" : "Hide Explorer"}
            className={explorerCollapsed ? "" : "fub-icon-btn--active"}
          />
          <IconButton
            icon={<PanelRightIcon />}
            onClick={() => handlePanelToggle("inspector")}
            ariaLabel={inspectorCollapsed ? "Show Inspector" : "Hide Inspector"}
            title={inspectorCollapsed ? "Show Inspector" : "Hide Inspector"}
            className={inspectorCollapsed ? "" : "fub-icon-btn--active"}
          />
          <IconButton
            icon={<TerminalIcon />}
            onClick={() => handlePanelToggle("console")}
            ariaLabel={consoleCollapsed ? "Show Console" : "Hide Console"}
            title={consoleCollapsed ? "Show Console" : "Hide Console"}
            className={consoleCollapsed ? "" : "fub-icon-btn--active"}
          />
        </div>

        <div className="fub-header-separator" aria-hidden="true" />

        {/* Theme toggle */}
        <IconButton
          icon={theme === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleTheme}
          ariaLabel={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
          title={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
        />

        {/* Save status */}
        {saveStatusText && (
          <span className={`fub-save-status${saveStatusClass}`} role="status" aria-live="polite">
            {saveStatusText}
          </span>
        )}
      </div>
    </header>
  )
}

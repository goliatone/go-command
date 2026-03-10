import { useCallback, useEffect, useMemo } from "react"

import type { ActionCatalogProvider } from "../adapters/actionCatalog"
import { collectUnsupportedWorkflowKinds } from "../document"
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts"
import { usePanelResize } from "../hooks/usePanelResize"
import { useViewportMode } from "../hooks/useViewportMode"
import type { MobilePanel } from "../store/uiStore"
import { useMachineStore, useSimulationStore, useUIStore } from "../store/provider"
import { Canvas } from "./Canvas"
import { ConsolePanel } from "./ConsolePanel"
import { Explorer } from "./Explorer"
import { Header, type HeaderProps } from "./Header"
import { Inspector } from "./Inspector"
import { KeyboardHelpModal } from "./KeyboardHelpModal"

export interface BuilderShellProps extends HeaderProps {
  actionCatalogProvider?: ActionCatalogProvider | null
}

function panelElementID(panel: MobilePanel): string {
  if (panel === "explorer") {
    return "fub-panel-explorer"
  }
  if (panel === "canvas") {
    return "fub-panel-canvas"
  }
  if (panel === "inspector") {
    return "fub-panel-inspector"
  }
  return "fub-panel-console"
}

function mobileTabElementID(panel: MobilePanel): string {
  return `fub-mobile-tab-${panel}`
}

function mobileTabPanelID(panel: MobilePanel): string {
  return `fub-mobile-tabpanel-${panel}`
}

export function BuilderShell(props: BuilderShellProps) {
  const explorerWidth = useUIStore((state) => state.explorerWidth)
  const inspectorWidth = useUIStore((state) => state.inspectorWidth)
  const consoleHeight = useUIStore((state) => state.consoleHeight)
  const explorerCollapsed = useUIStore((state) => state.explorerCollapsed)
  const inspectorCollapsed = useUIStore((state) => state.inspectorCollapsed)
  const consoleCollapsed = useUIStore((state) => state.consoleCollapsed)
  const mobilePanel = useUIStore((state) => state.mobilePanel)
  const keyboardHelpOpen = useUIStore((state) => state.keyboardHelpOpen)
  const togglePanel = useUIStore((state) => state.togglePanel)
  const setPanelCollapsed = useUIStore((state) => state.setPanelCollapsed)
  const setMobilePanel = useUIStore((state) => state.setMobilePanel)
  const setKeyboardHelpOpen = useUIStore((state) => state.setKeyboardHelpOpen)
  const toggleKeyboardHelp = useUIStore((state) => state.toggleKeyboardHelp)
  const theme = useUIStore((state) => state.theme)
  const definition = useMachineStore((state) => state.document.definition)
  const diagnostics = useMachineStore((state) => state.diagnostics)
  const simulationLog = useSimulationStore((state) => state.log)
  const simulationErrors = useSimulationStore((state) => state.errors)
  const projectedOutcome = useSimulationStore((state) => state.projectedOutcome)
  const unsupportedKinds = useMemo(() => collectUnsupportedWorkflowKinds(definition), [definition])
  const viewportMode = useViewportMode()
  const readOnly = viewportMode === "mobile-readonly"

  const resizeExplorer = usePanelResize("explorer")
  const resizeInspector = usePanelResize("inspector")
  const resizeConsole = usePanelResize("console")

  const invoke = useCallback((action?: (() => Promise<void>) | (() => void)) => {
    if (!action) {
      return
    }
    void action()
  }, [])

  const queuePanelFocus = useCallback((panel: MobilePanel) => {
    const run = () => {
      document.getElementById(panelElementID(panel))?.focus()
    }
    if (typeof window.requestAnimationFrame === "function") {
      window.requestAnimationFrame(run)
      return
    }
    window.setTimeout(run, 0)
  }, [])

  const focusPanel = useCallback(
    (panel: MobilePanel) => {
      if (viewportMode === "mobile-readonly") {
        setMobilePanel(panel)
      } else {
        if (panel === "explorer") {
          setPanelCollapsed("explorer", false)
        }
        if (panel === "inspector") {
          setPanelCollapsed("inspector", false)
        }
        if (panel === "console") {
          setPanelCollapsed("console", false)
        }
      }
      queuePanelFocus(panel)
    },
    [queuePanelFocus, setMobilePanel, setPanelCollapsed, viewportMode]
  )

  const onPanelToggle = useCallback(
    (panel: "explorer" | "inspector" | "console") => {
      if (viewportMode === "mobile-readonly") {
        setMobilePanel(panel)
      } else {
        togglePanel(panel)
      }
      queuePanelFocus(panel)
    },
    [queuePanelFocus, setMobilePanel, togglePanel, viewportMode]
  )

  const onToggleConsole = useCallback(() => {
    if (viewportMode === "mobile-readonly") {
      setMobilePanel("console")
      return
    }
    togglePanel("console")
  }, [setMobilePanel, togglePanel, viewportMode])

  const onCloseKeyboardHelp = useCallback(() => {
    setKeyboardHelpOpen(false)
  }, [setKeyboardHelpOpen])

  useKeyboardShortcuts({
    onSave: () => invoke(props.onSave),
    onValidate: () => invoke(props.onValidate),
    onFocusPanel: focusPanel,
    onToggleConsole,
    keyboardHelpOpen,
    onToggleKeyboardHelp: toggleKeyboardHelp,
    onCloseKeyboardHelp,
    readOnly
  })

  useEffect(() => {
    if (viewportMode === "compact") {
      setPanelCollapsed("explorer", true)
    }
  }, [setPanelCollapsed, viewportMode])

  const columns = useMemo(() => {
    const left = explorerCollapsed ? "0px" : `${explorerWidth}px`
    const right = inspectorCollapsed ? "0px" : `${inspectorWidth}px`
    const leftHandle = explorerCollapsed ? "0px" : "6px"
    const rightHandle = inspectorCollapsed ? "0px" : "6px"
    return `${left} ${leftHandle} minmax(420px,1fr) ${rightHandle} ${right}`
  }, [explorerCollapsed, explorerWidth, inspectorCollapsed, inspectorWidth])

  const rows = useMemo(() => {
    const unsupportedRow = unsupportedKinds.length > 0 ? "32px" : "0px"
    const consoleRow = consoleCollapsed ? "0px" : `${consoleHeight}px`
    const handle = consoleCollapsed ? "0px" : "6px"
    return `48px ${unsupportedRow} minmax(360px,1fr) ${handle} ${consoleRow}`
  }, [consoleCollapsed, consoleHeight, unsupportedKinds.length])

  const diagnosticsAnnouncement = useMemo(() => {
    if (diagnostics.length === 0) {
      return "No diagnostics."
    }
    if (diagnostics.length === 1) {
      return "1 diagnostic in problems panel."
    }
    return `${diagnostics.length} diagnostics in problems panel.`
  }, [diagnostics.length])

  const simulationAnnouncement = useMemo(() => {
    const latestError = simulationErrors.at(-1)
    if (latestError) {
      return `Simulation error ${latestError.code}: ${latestError.message}`
    }
    if (projectedOutcome) {
      return `Projected ${projectedOutcome.event}: ${projectedOutcome.previousState} to ${projectedOutcome.currentState}.`
    }
    const latestLog = simulationLog.at(-1)
    return latestLog?.message ?? "Simulation idle."
  }, [projectedOutcome, simulationErrors, simulationLog])

  if (viewportMode === "mobile-readonly") {
    return (
      <>
        <div className="fub-root fub-root-mobile" data-theme={theme}>
          <div className="fub-slot-header">
            <Header {...props} readOnly onPanelToggle={onPanelToggle} />
          </div>

          {unsupportedKinds.length > 0 ? (
            <div className="fub-guardrail-banner" role="status" aria-live="polite">
              Unsupported workflow nodes are read-only: {unsupportedKinds.join(", ")}
            </div>
          ) : null}

          <div className="fub-mobile-warning" role="status" aria-live="polite">
            Narrow/mobile mode is reduced-capability and read-only. Use desktop width for full authoring.
          </div>

          <nav className="fub-mobile-tabs" role="tablist" aria-label="Builder panels">
            {(["explorer", "canvas", "inspector", "console"] as const).map((panel) => (
              <button
                key={panel}
                type="button"
                role="tab"
                id={mobileTabElementID(panel)}
                aria-controls={mobileTabPanelID(panel)}
                aria-selected={mobilePanel === panel}
                tabIndex={mobilePanel === panel ? 0 : -1}
                className={`fub-mobile-tab${mobilePanel === panel ? " is-active" : ""}`}
                onClick={() => setMobilePanel(panel)}
              >
                {panel}
              </button>
            ))}
          </nav>

          <div
            className="fub-mobile-panel"
            role="tabpanel"
            id={mobileTabPanelID(mobilePanel)}
            aria-labelledby={mobileTabElementID(mobilePanel)}
          >
            {mobilePanel === "explorer" ? <Explorer readOnly /> : null}
            {mobilePanel === "canvas" ? <Canvas readOnly /> : null}
            {mobilePanel === "inspector" ? <Inspector actionCatalogProvider={props.actionCatalogProvider} readOnly /> : null}
            {mobilePanel === "console" ? <ConsolePanel /> : null}
          </div>

          <div className="fub-sr-only" role="status" aria-live="polite" aria-atomic="true">
            {diagnosticsAnnouncement}
          </div>
          <div className="fub-sr-only" role="status" aria-live="polite" aria-atomic="true">
            {simulationAnnouncement}
          </div>
        </div>
        <KeyboardHelpModal open={keyboardHelpOpen} onClose={onCloseKeyboardHelp} />
      </>
    )
  }

  return (
    <>
      <div className="fub-root" data-theme={theme} style={{ gridTemplateColumns: columns, gridTemplateRows: rows }}>
        <div className="fub-slot-header" style={{ gridColumn: "1 / -1" }}>
          <Header {...props} readOnly={false} onPanelToggle={onPanelToggle} />
        </div>

        {unsupportedKinds.length > 0 ? (
          <div className="fub-guardrail-banner" style={{ gridColumn: "1 / -1" }} role="status" aria-live="polite">
            Unsupported workflow nodes are read-only: {unsupportedKinds.join(", ")}
          </div>
        ) : null}

        {!explorerCollapsed ? <Explorer readOnly={false} /> : null}
        {!explorerCollapsed ? (
          <div
            className="fub-resizer fub-resizer-vertical"
            role="separator"
            aria-label="Resize explorer"
            onPointerDown={resizeExplorer}
          />
        ) : null}

        <Canvas readOnly={false} />

        {!inspectorCollapsed ? (
          <div
            className="fub-resizer fub-resizer-vertical"
            role="separator"
            aria-label="Resize inspector"
            onPointerDown={resizeInspector}
          />
        ) : null}
        {!inspectorCollapsed ? <Inspector actionCatalogProvider={props.actionCatalogProvider} readOnly={false} /> : null}

        {!consoleCollapsed ? (
          <div
            className="fub-resizer fub-resizer-horizontal"
            role="separator"
            aria-label="Resize console"
            onPointerDown={resizeConsole}
            style={{ gridColumn: "1 / -1" }}
          />
        ) : null}
        {!consoleCollapsed ? (
          <div className="fub-slot-console" style={{ gridColumn: "1 / -1" }}>
            <ConsolePanel />
          </div>
        ) : null}
        <div className="fub-sr-only" role="status" aria-live="polite" aria-atomic="true">
          {diagnosticsAnnouncement}
        </div>
        <div className="fub-sr-only" role="status" aria-live="polite" aria-atomic="true">
          {simulationAnnouncement}
        </div>
      </div>
      <KeyboardHelpModal open={keyboardHelpOpen} onClose={onCloseKeyboardHelp} />
    </>
  )
}

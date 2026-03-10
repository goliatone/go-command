import { useMemo } from "react"

import type { ActionCatalogProvider } from "../adapters/actionCatalog"
import { collectUnsupportedWorkflowKinds } from "../document"
import { usePanelResize } from "../hooks/usePanelResize"
import { useMachineStore, useUIStore } from "../store/provider"
import { Canvas } from "./Canvas"
import { ConsolePanel } from "./ConsolePanel"
import { Explorer } from "./Explorer"
import { Header, type HeaderProps } from "./Header"
import { Inspector } from "./Inspector"

export interface BuilderShellProps extends HeaderProps {
  actionCatalogProvider?: ActionCatalogProvider | null
}

export function BuilderShell(props: BuilderShellProps) {
  const explorerWidth = useUIStore((state) => state.explorerWidth)
  const inspectorWidth = useUIStore((state) => state.inspectorWidth)
  const consoleHeight = useUIStore((state) => state.consoleHeight)
  const explorerCollapsed = useUIStore((state) => state.explorerCollapsed)
  const inspectorCollapsed = useUIStore((state) => state.inspectorCollapsed)
  const consoleCollapsed = useUIStore((state) => state.consoleCollapsed)
  const definition = useMachineStore((state) => state.document.definition)
  const unsupportedKinds = useMemo(() => collectUnsupportedWorkflowKinds(definition), [definition])

  const resizeExplorer = usePanelResize("explorer")
  const resizeInspector = usePanelResize("inspector")
  const resizeConsole = usePanelResize("console")

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

  return (
    <div className="fub-root" style={{ gridTemplateColumns: columns, gridTemplateRows: rows }}>
      <div className="fub-slot-header" style={{ gridColumn: "1 / -1" }}>
        <Header {...props} />
      </div>

      {unsupportedKinds.length > 0 ? (
        <div className="fub-guardrail-banner" style={{ gridColumn: "1 / -1" }} role="status" aria-live="polite">
          Unsupported workflow nodes are read-only: {unsupportedKinds.join(", ")}
        </div>
      ) : null}

      {!explorerCollapsed ? <Explorer /> : null}
      {!explorerCollapsed ? (
        <div
          className="fub-resizer fub-resizer-vertical"
          role="separator"
          aria-label="Resize explorer"
          onPointerDown={resizeExplorer}
        />
      ) : null}

      <Canvas />

      {!inspectorCollapsed ? (
        <div
          className="fub-resizer fub-resizer-vertical"
          role="separator"
          aria-label="Resize inspector"
          onPointerDown={resizeInspector}
        />
      ) : null}
      {!inspectorCollapsed ? <Inspector actionCatalogProvider={props.actionCatalogProvider} /> : null}

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
    </div>
  )
}

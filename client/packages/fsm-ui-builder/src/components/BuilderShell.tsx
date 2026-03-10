import { useMemo } from "react"

import { usePanelResize } from "../hooks/usePanelResize"
import { useUIStore } from "../store/provider"
import { Canvas } from "./Canvas"
import { ConsolePanel } from "./ConsolePanel"
import { Explorer } from "./Explorer"
import { Header } from "./Header"
import { Inspector } from "./Inspector"

export function BuilderShell() {
  const explorerWidth = useUIStore((state) => state.explorerWidth)
  const inspectorWidth = useUIStore((state) => state.inspectorWidth)
  const consoleHeight = useUIStore((state) => state.consoleHeight)
  const explorerCollapsed = useUIStore((state) => state.explorerCollapsed)
  const inspectorCollapsed = useUIStore((state) => state.inspectorCollapsed)
  const consoleCollapsed = useUIStore((state) => state.consoleCollapsed)

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
    const consoleRow = consoleCollapsed ? "0px" : `${consoleHeight}px`
    const handle = consoleCollapsed ? "0px" : "6px"
    return `48px minmax(360px,1fr) ${handle} ${consoleRow}`
  }, [consoleCollapsed, consoleHeight])

  return (
    <div className="fub-root" style={{ gridTemplateColumns: columns, gridTemplateRows: rows }}>
      <div className="fub-slot-header" style={{ gridColumn: "1 / -1" }}>
        <Header />
      </div>

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
      {!inspectorCollapsed ? <Inspector /> : null}

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

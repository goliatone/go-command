import { useCallback, type PointerEvent as ReactPointerEvent } from "react"

import { useUIStore } from "../store/provider"

type PanelResizeKind = "explorer" | "inspector" | "console"

interface DragStart {
  pointerX: number
  pointerY: number
  width: number
  height: number
}

export function usePanelResize(kind: PanelResizeKind): (event: ReactPointerEvent<HTMLElement>) => void {
  const explorerWidth = useUIStore((state) => state.explorerWidth)
  const inspectorWidth = useUIStore((state) => state.inspectorWidth)
  const consoleHeight = useUIStore((state) => state.consoleHeight)
  const setPanelWidth = useUIStore((state) => state.setPanelWidth)
  const setConsoleHeight = useUIStore((state) => state.setConsoleHeight)

  return useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      event.preventDefault()
      const start: DragStart = {
        pointerX: event.clientX,
        pointerY: event.clientY,
        width: kind === "explorer" ? explorerWidth : inspectorWidth,
        height: consoleHeight
      }

      const onMove = (moveEvent: PointerEvent) => {
        if (kind === "console") {
          const deltaY = start.pointerY - moveEvent.clientY
          setConsoleHeight(start.height + deltaY)
          return
        }
        const deltaX = moveEvent.clientX - start.pointerX
        if (kind === "explorer") {
          setPanelWidth("explorer", start.width + deltaX)
          return
        }
        setPanelWidth("inspector", start.width - deltaX)
      }

      const onUp = () => {
        window.removeEventListener("pointermove", onMove)
        window.removeEventListener("pointerup", onUp)
      }

      window.addEventListener("pointermove", onMove)
      window.addEventListener("pointerup", onUp)
    },
    [consoleHeight, explorerWidth, inspectorWidth, kind, setConsoleHeight, setPanelWidth]
  )
}

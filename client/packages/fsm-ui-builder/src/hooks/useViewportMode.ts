import { useEffect } from "react"

import type { ViewportMode } from "../store/uiStore"
import { useUIStore } from "../store/provider"

function modeForWidth(width: number): ViewportMode {
  if (width < 900) {
    return "mobile-readonly"
  }
  if (width <= 1200) {
    return "compact"
  }
  return "desktop"
}

export function useViewportMode(): ViewportMode {
  const viewportMode = useUIStore((state) => state.viewportMode)
  const setViewportMode = useUIStore((state) => state.setViewportMode)

  useEffect(() => {
    const updateMode = () => {
      setViewportMode(modeForWidth(window.innerWidth))
    }
    updateMode()
    window.addEventListener("resize", updateMode)
    return () => {
      window.removeEventListener("resize", updateMode)
    }
  }, [setViewportMode])

  return viewportMode
}


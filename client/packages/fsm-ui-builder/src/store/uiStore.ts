import { createStore, type StoreApi } from "zustand/vanilla"

const PERSIST_KEY = "fsm-ui-builder.panel-layout"

export type ViewportMode = "desktop" | "compact" | "mobile-readonly"
export type MobilePanel = "explorer" | "canvas" | "inspector" | "console"

export interface PanelLayoutState {
  explorerWidth: number
  inspectorWidth: number
  consoleHeight: number
  explorerCollapsed: boolean
  inspectorCollapsed: boolean
  consoleCollapsed: boolean
  canvasZoom: number
  canvasOffsetX: number
  canvasOffsetY: number
}

export interface UIStoreState extends PanelLayoutState {
  viewportMode: ViewportMode
  mobilePanel: MobilePanel
  setPanelWidth(panel: "explorer" | "inspector", width: number): void
  setConsoleHeight(height: number): void
  setPanelCollapsed(panel: "explorer" | "inspector" | "console", collapsed: boolean): void
  togglePanel(panel: "explorer" | "inspector" | "console"): void
  zoomCanvas(delta: number): void
  panCanvas(deltaX: number, deltaY: number): void
  resetCanvasView(): void
  setViewportMode(mode: ViewportMode): void
  setMobilePanel(panel: MobilePanel): void
}

export type UIStore = StoreApi<UIStoreState>

function clamp(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) {
    return min
  }
  return Math.min(Math.max(value, min), max)
}

function defaultLayout(): PanelLayoutState {
  return {
    explorerWidth: 240,
    inspectorWidth: 320,
    consoleHeight: 140,
    explorerCollapsed: false,
    inspectorCollapsed: false,
    consoleCollapsed: false,
    canvasZoom: 1,
    canvasOffsetX: 0,
    canvasOffsetY: 0
  }
}

function canUseStorage(): boolean {
  if (typeof window === "undefined" || typeof window.localStorage === "undefined") {
    return false
  }
  return (
    typeof window.localStorage.getItem === "function" &&
    typeof window.localStorage.setItem === "function"
  )
}

function readPersistedLayout(): PanelLayoutState {
  if (!canUseStorage()) {
    return defaultLayout()
  }
  const raw = window.localStorage.getItem(PERSIST_KEY)
  if (!raw) {
    return defaultLayout()
  }
  try {
    const parsed = JSON.parse(raw) as Partial<PanelLayoutState>
    return {
      explorerWidth: clamp(parsed.explorerWidth ?? 240, 180, 400),
      inspectorWidth: clamp(parsed.inspectorWidth ?? 320, 240, 500),
      consoleHeight: clamp(parsed.consoleHeight ?? 140, 80, 300),
      explorerCollapsed: Boolean(parsed.explorerCollapsed),
      inspectorCollapsed: Boolean(parsed.inspectorCollapsed),
      consoleCollapsed: Boolean(parsed.consoleCollapsed),
      canvasZoom: clamp(parsed.canvasZoom ?? 1, 0.25, 2),
      canvasOffsetX: Number.isFinite(parsed.canvasOffsetX) ? Number(parsed.canvasOffsetX) : 0,
      canvasOffsetY: Number.isFinite(parsed.canvasOffsetY) ? Number(parsed.canvasOffsetY) : 0
    }
  } catch {
    return defaultLayout()
  }
}

function persistLayout(state: PanelLayoutState): void {
  if (!canUseStorage()) {
    return
  }
  window.localStorage.setItem(PERSIST_KEY, JSON.stringify(state))
}

export function createUIStore(): UIStore {
  const initial = readPersistedLayout()

  return createStore<UIStoreState>((set) => ({
    ...initial,
    viewportMode: "desktop",
    mobilePanel: "canvas",
    setPanelWidth(panel, width) {
      set((state) => {
        const next = {
          ...state,
          explorerWidth:
            panel === "explorer" ? clamp(width, 180, 400) : state.explorerWidth,
          inspectorWidth:
            panel === "inspector" ? clamp(width, 240, 500) : state.inspectorWidth
        }
        persistLayout(next)
        return next
      })
    },
    setConsoleHeight(height) {
      set((state) => {
        const next = {
          ...state,
          consoleHeight: clamp(height, 80, 300)
        }
        persistLayout(next)
        return next
      })
    },
    setPanelCollapsed(panel, collapsed) {
      set((state) => {
        const next = {
          ...state,
          explorerCollapsed: panel === "explorer" ? collapsed : state.explorerCollapsed,
          inspectorCollapsed: panel === "inspector" ? collapsed : state.inspectorCollapsed,
          consoleCollapsed: panel === "console" ? collapsed : state.consoleCollapsed
        }
        persistLayout(next)
        return next
      })
    },
    togglePanel(panel) {
      set((state) => {
        const next = {
          ...state,
          explorerCollapsed: panel === "explorer" ? !state.explorerCollapsed : state.explorerCollapsed,
          inspectorCollapsed: panel === "inspector" ? !state.inspectorCollapsed : state.inspectorCollapsed,
          consoleCollapsed: panel === "console" ? !state.consoleCollapsed : state.consoleCollapsed
        }
        persistLayout(next)
        return next
      })
    },
    zoomCanvas(delta) {
      set((state) => {
        const next = {
          ...state,
          canvasZoom: clamp(state.canvasZoom + delta, 0.25, 2)
        }
        persistLayout(next)
        return next
      })
    },
    panCanvas(deltaX, deltaY) {
      set((state) => {
        const next = {
          ...state,
          canvasOffsetX: state.canvasOffsetX + deltaX,
          canvasOffsetY: state.canvasOffsetY + deltaY
        }
        persistLayout(next)
        return next
      })
    },
    resetCanvasView() {
      set((state) => {
        const next = {
          ...state,
          canvasZoom: 1,
          canvasOffsetX: 0,
          canvasOffsetY: 0
        }
        persistLayout(next)
        return next
      })
    },
    setViewportMode(mode) {
      set({ viewportMode: mode })
    },
    setMobilePanel(panel) {
      set({ mobilePanel: panel })
    }
  }))
}

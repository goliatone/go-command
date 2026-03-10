Object.defineProperty(window, "innerWidth", {
  configurable: true,
  writable: true,
  value: 1366
})

Object.defineProperty(window, "innerHeight", {
  configurable: true,
  writable: true,
  value: 900
})

// Mock ResizeObserver for ReactFlow tests
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (typeof window !== "undefined" && !window.ResizeObserver) {
  window.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver
}

// Mock requestAnimationFrame if not present
if (typeof window !== "undefined" && !window.requestAnimationFrame) {
  window.requestAnimationFrame = (callback: FrameRequestCallback): number => {
    return window.setTimeout(() => callback(Date.now()), 0)
  }
}

if (typeof window !== "undefined" && !window.cancelAnimationFrame) {
  window.cancelAnimationFrame = (id: number): void => {
    window.clearTimeout(id)
  }
}


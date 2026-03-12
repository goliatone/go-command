import * as React from "react"
import "@testing-library/react"

// Extend globalThis type for React act environment
declare global {
  // eslint-disable-next-line no-var
  var IS_REACT_ACT_ENVIRONMENT: boolean | undefined
}

// Configure React 19 act for testing-library
// This is required because React 19 deprecated act from react-dom/test-utils
globalThis.IS_REACT_ACT_ENVIRONMENT = true

// Ensure React.act is available globally for testing-library
if (typeof (globalThis as { React?: typeof React }).React === "undefined") {
  ;(globalThis as { React?: typeof React }).React = React
}

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


import { useEffect, useState } from "react"

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"

function canUseMatchMedia(): boolean {
  return typeof window !== "undefined" && typeof window.matchMedia === "function"
}

function readReducedMotionPreference(): boolean {
  if (!canUseMatchMedia()) {
    return false
  }
  return window.matchMedia(REDUCED_MOTION_QUERY).matches
}

export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(readReducedMotionPreference)

  useEffect(() => {
    if (!canUseMatchMedia()) {
      return
    }
    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY)
    const onChange = () => {
      setPrefersReducedMotion(mediaQuery.matches)
    }

    onChange()

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", onChange)
      return () => {
        mediaQuery.removeEventListener("change", onChange)
      }
    }

    mediaQuery.addListener(onChange)
    return () => {
      mediaQuery.removeListener(onChange)
    }
  }, [])

  return prefersReducedMotion
}

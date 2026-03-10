import { useEffect } from "react"

import type { Selection } from "../document"
import { useMachineStore, useUIStore } from "../store/provider"

export interface KeyboardShortcutHandlers {
  onSave?: () => void
  onValidate?: () => void
  onFocusPanel?: (panel: "explorer" | "canvas" | "inspector" | "console") => void
  onToggleConsole?: () => void
  readOnly?: boolean
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false
  }
  if (target.isContentEditable) {
    return true
  }
  return target.matches("input, textarea, select")
}

function selectionID(selection: Selection): string {
  if (selection.kind === "machine") {
    return "machine"
  }
  if (selection.kind === "state") {
    return `state:${selection.stateIndex}`
  }
  if (selection.kind === "transition") {
    return `transition:${selection.transitionIndex}`
  }
  return `workflow:${selection.transitionIndex}:${selection.nodeIndex}`
}

function moveSelection(
  selection: Selection,
  definition: {
    states: Array<unknown>
    transitions: Array<{ workflow?: { nodes?: Array<unknown> } }>
  },
  direction: -1 | 1
): Selection {
  const ordered: Selection[] = [{ kind: "machine" }]

  definition.states.forEach((_, stateIndex) => {
    ordered.push({ kind: "state", stateIndex })
  })
  definition.transitions.forEach((transition, transitionIndex) => {
    ordered.push({ kind: "transition", transitionIndex })
    transition.workflow?.nodes?.forEach((_, nodeIndex) => {
      ordered.push({ kind: "workflow-node", transitionIndex, nodeIndex })
    })
  })

  const currentIndex = ordered.findIndex((candidate) => selectionID(candidate) === selectionID(selection))
  const fromIndex = currentIndex >= 0 ? currentIndex : 0
  const nextIndex = Math.min(Math.max(0, fromIndex + direction), ordered.length - 1)
  return ordered[nextIndex] ?? { kind: "machine" }
}

export function useKeyboardShortcuts(handlers: KeyboardShortcutHandlers): void {
  const selection = useMachineStore((state) => state.selection)
  const definition = useMachineStore((state) => state.document.definition)
  const setSelection = useMachineStore((state) => state.setSelection)
  const undo = useMachineStore((state) => state.undo)
  const redo = useMachineStore((state) => state.redo)
  const addState = useMachineStore((state) => state.addState)
  const addTransition = useMachineStore((state) => state.addTransition)

  const zoomCanvas = useUIStore((state) => state.zoomCanvas)
  const resetCanvasView = useUIStore((state) => state.resetCanvasView)
  const panCanvas = useUIStore((state) => state.panCanvas)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const modifier = event.metaKey || event.ctrlKey
      const editable = isEditableTarget(event.target)
      const readOnly = Boolean(handlers.readOnly)
      const key = event.key
      const keyLower = key.toLowerCase()

      if (modifier && keyLower === "s") {
        event.preventDefault()
        if (!readOnly) {
          handlers.onSave?.()
        }
        return
      }

      if (modifier && key === "Enter") {
        event.preventDefault()
        if (!readOnly) {
          handlers.onValidate?.()
        }
        return
      }

      if (modifier && keyLower === "z") {
        if (editable) {
          return
        }
        event.preventDefault()
        if (!readOnly) {
          if (event.shiftKey) {
            redo()
          } else {
            undo()
          }
        }
        return
      }

      if (modifier && keyLower === "y") {
        if (editable) {
          return
        }
        event.preventDefault()
        if (!readOnly) {
          redo()
        }
        return
      }

      if (modifier && key === "1") {
        event.preventDefault()
        handlers.onFocusPanel?.("explorer")
        return
      }

      if (modifier && key === "2") {
        event.preventDefault()
        handlers.onFocusPanel?.("canvas")
        return
      }

      if (modifier && key === "3") {
        event.preventDefault()
        handlers.onFocusPanel?.("inspector")
        return
      }

      if (modifier && key === "`") {
        event.preventDefault()
        if (handlers.onToggleConsole) {
          handlers.onToggleConsole()
        } else {
          handlers.onFocusPanel?.("console")
        }
        return
      }

      if (modifier && (key === "+" || key === "=")) {
        event.preventDefault()
        zoomCanvas(0.1)
        return
      }

      if (modifier && key === "-") {
        event.preventDefault()
        zoomCanvas(-0.1)
        return
      }

      if (modifier && key === "0") {
        event.preventDefault()
        resetCanvasView()
        return
      }

      if (event.altKey && !modifier && key.startsWith("Arrow")) {
        event.preventDefault()
        if (key === "ArrowLeft") {
          panCanvas(-24, 0)
          return
        }
        if (key === "ArrowRight") {
          panCanvas(24, 0)
          return
        }
        if (key === "ArrowUp") {
          panCanvas(0, -24)
          return
        }
        if (key === "ArrowDown") {
          panCanvas(0, 24)
        }
        return
      }

      if (!modifier && !editable && key === "Escape") {
        event.preventDefault()
        setSelection({ kind: "machine" })
        return
      }

      if (!modifier && !editable && key === "ArrowDown") {
        event.preventDefault()
        setSelection(moveSelection(selection, definition, 1))
        return
      }

      if (!modifier && !editable && key === "ArrowUp") {
        event.preventDefault()
        setSelection(moveSelection(selection, definition, -1))
        return
      }

      if (!modifier && !editable && !readOnly && keyLower === "n") {
        event.preventDefault()
        addState()
        return
      }

      if (!modifier && !editable && !readOnly && keyLower === "t") {
        event.preventDefault()
        addTransition()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [
    addState,
    addTransition,
    definition,
    handlers,
    panCanvas,
    redo,
    resetCanvasView,
    selection,
    setSelection,
    undo,
    zoomCanvas
  ])
}

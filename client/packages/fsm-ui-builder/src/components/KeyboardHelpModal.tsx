import { useEffect, useMemo, useRef } from "react"

interface ShortcutRow {
  category: string
  shortcut: string
  action: string
}

const SHORTCUTS: ShortcutRow[] = [
  { category: "File", shortcut: "Ctrl/Cmd + S", action: "Save draft" },
  { category: "File", shortcut: "Ctrl/Cmd + Enter", action: "Validate" },
  { category: "Edit", shortcut: "Ctrl/Cmd + Z", action: "Undo" },
  { category: "Edit", shortcut: "Ctrl/Cmd + Shift + Z", action: "Redo" },
  { category: "Edit", shortcut: "Ctrl/Cmd + Y", action: "Redo (alternate)" },
  { category: "Navigation", shortcut: "Ctrl/Cmd + 1/2/3", action: "Focus explorer/canvas/inspector" },
  { category: "Navigation", shortcut: "Ctrl/Cmd + `", action: "Toggle/focus console" },
  { category: "Navigation", shortcut: "Arrow Up/Down", action: "Move selection" },
  { category: "Navigation", shortcut: "Escape", action: "Deselect current item" },
  { category: "Canvas", shortcut: "Ctrl/Cmd + +/-", action: "Zoom in/out" },
  { category: "Canvas", shortcut: "Ctrl/Cmd + 0", action: "Reset zoom and pan" },
  { category: "Canvas", shortcut: "Alt + Arrows", action: "Pan canvas" },
  { category: "Create", shortcut: "N", action: "Add state" },
  { category: "Create", shortcut: "T", action: "Add transition" },
  { category: "Help", shortcut: "?", action: "Toggle this help modal" }
]

function trapFocus(event: KeyboardEvent, root: HTMLElement): void {
  if (event.key !== "Tab") {
    return
  }
  const focusables = Array.from(
    root.querySelectorAll<HTMLElement>(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
    )
  ).filter((element) => !element.hasAttribute("disabled"))
  if (focusables.length === 0) {
    return
  }
  const first = focusables[0]
  const last = focusables[focusables.length - 1]
  const active = document.activeElement as HTMLElement | null
  if (!event.shiftKey && active === last) {
    event.preventDefault()
    first.focus()
    return
  }
  if (event.shiftKey && active === first) {
    event.preventDefault()
    last.focus()
  }
}

export interface KeyboardHelpModalProps {
  open: boolean
  onClose: () => void
}

export function KeyboardHelpModal(props: KeyboardHelpModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)
  const rows = useMemo(() => SHORTCUTS, [])

  useEffect(() => {
    if (!props.open) {
      return
    }
    closeRef.current?.focus()
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!dialogRef.current) {
        return
      }
      if (event.key === "Escape") {
        event.preventDefault()
        props.onClose()
        return
      }
      trapFocus(event, dialogRef.current)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [props.onClose, props.open])

  if (!props.open) {
    return null
  }

  return (
    <div className="fub-modal-overlay" role="presentation" onClick={props.onClose}>
      <div
        ref={dialogRef}
        className="fub-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="fub-keyboard-help-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="fub-modal-header">
          <h2 id="fub-keyboard-help-title">Keyboard Shortcuts</h2>
          <button
            ref={closeRef}
            type="button"
            className="fub-mini-btn"
            onClick={props.onClose}
            aria-label="Close keyboard shortcuts"
          >
            Close
          </button>
        </header>
        <div className="fub-modal-body">
          <table className="fub-shortcuts-table">
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Shortcut</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={`${row.category}-${row.shortcut}`}>
                  <td>{row.category}</td>
                  <td>
                    <code>{row.shortcut}</code>
                  </td>
                  <td>{row.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

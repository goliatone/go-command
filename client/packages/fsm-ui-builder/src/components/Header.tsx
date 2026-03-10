import { useMachineStore, useUIStore } from "../store/provider"

export function Header() {
  const machineName = useMachineStore((state) => state.document.definition.name)
  const isDirty = useMachineStore((state) => state.isDirty)
  const diagnosticsCount = useMachineStore((state) => state.diagnostics.length)
  const setMachineName = useMachineStore((state) => state.setMachineName)
  const markSaved = useMachineStore((state) => state.markSaved)
  const undo = useMachineStore((state) => state.undo)
  const redo = useMachineStore((state) => state.redo)
  const historyIndex = useMachineStore((state) => state.historyIndex)
  const historyLength = useMachineStore((state) => state.history.length)

  const togglePanel = useUIStore((state) => state.togglePanel)

  return (
    <header className="fub-header" aria-label="Builder header">
      <div className="fub-header-left">
        <strong className="fub-brand">FSM Builder</strong>
        <label className="fub-machine-name-label">
          <span className="fub-label">Machine</span>
          <input
            aria-label="Machine name"
            className="fub-input"
            value={machineName}
            onChange={(event) => setMachineName(event.target.value)}
          />
          {isDirty ? <span aria-label="Unsaved changes" className="fub-dirty-dot" /> : null}
        </label>
      </div>

      <div className="fub-header-actions" role="group" aria-label="Builder actions">
        <button type="button" className="fub-btn" onClick={undo} disabled={historyIndex === 0}>
          Undo
        </button>
        <button type="button" className="fub-btn" onClick={redo} disabled={historyIndex >= historyLength - 1}>
          Redo
        </button>
        <button type="button" className="fub-btn" onClick={markSaved}>
          Save
        </button>
        <button type="button" className="fub-btn" onClick={() => togglePanel("explorer")}>
          Explorer
        </button>
        <button type="button" className="fub-btn" onClick={() => togglePanel("inspector")}>
          Inspector
        </button>
        <button type="button" className="fub-btn" onClick={() => togglePanel("console")}>
          Console
        </button>
        <span className="fub-badge" aria-live="polite">
          Problems: {diagnosticsCount}
        </span>
      </div>
    </header>
  )
}

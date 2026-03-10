export type ConflictResolutionChoice = "keep-mine" | "keep-server" | "merge"

export interface ConflictResolutionModalProps {
  open: boolean
  machineId: string
  expectedVersion?: string
  actualVersion?: string
  conflictPaths?: string[]
  busy?: boolean
  onResolve(choice: ConflictResolutionChoice): void
  onClose(): void
}

export function ConflictResolutionModal(props: ConflictResolutionModalProps) {
  if (!props.open) {
    return null
  }

  return (
    <div className="fub-modal-overlay" role="presentation" onClick={props.onClose}>
      <div
        className="fub-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="fub-conflict-resolution-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="fub-modal-header">
          <h2 id="fub-conflict-resolution-title">Version Conflict</h2>
          <button type="button" className="fub-mini-btn" onClick={props.onClose} disabled={props.busy}>
            Close
          </button>
        </header>
        <div className="fub-modal-body">
          <p className="fub-log-error">
            Save failed with <code>FSM_VERSION_CONFLICT</code> for <code>{props.machineId}</code>.
          </p>
          <p>
            <strong>Your base version:</strong> <code>{props.expectedVersion ?? "unknown"}</code>
          </p>
          <p>
            <strong>Server version:</strong> <code>{props.actualVersion ?? "unknown"}</code>
          </p>
          {props.conflictPaths && props.conflictPaths.length > 0 ? (
            <>
              <strong>Conflict paths</strong>
              <ul>
                {props.conflictPaths.map((path) => (
                  <li key={path}>
                    <code>{path}</code>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          <div className="fub-inline-actions">
            <button type="button" className="fub-btn" onClick={() => props.onResolve("keep-mine")} disabled={props.busy}>
              Keep Mine
            </button>
            <button type="button" className="fub-btn" onClick={() => props.onResolve("keep-server")} disabled={props.busy}>
              Keep Server
            </button>
            <button type="button" className="fub-btn fub-btn-primary" onClick={() => props.onResolve("merge")} disabled={props.busy}>
              Merge
            </button>
          </div>
          <p className="fub-muted">Retry loop: fetch latest {"->"} resolve choice {"->"} save_draft with latest baseVersion.</p>
        </div>
      </div>
    </div>
  )
}

import type { AuthoringDiffVersionsResponse, AuthoringVersionSummary } from "../contracts"

export interface VersionHistoryModalProps {
  open: boolean
  loading: boolean
  currentVersion: string
  items: AuthoringVersionSummary[]
  selectedVersion?: string
  errorMessage?: string
  diff?: AuthoringDiffVersionsResponse | null
  diffUnavailableReason?: string | null
  onSelectVersion(version: string): void
  onRestoreSelected(): void
  onClose(): void
}

export function VersionHistoryModal(props: VersionHistoryModalProps) {
  if (!props.open) {
    return null
  }

  const selectedItem = props.items.find((item) => item.version === props.selectedVersion)
  const canRestore = Boolean(selectedItem && selectedItem.version !== props.currentVersion)

  return (
    <div className="fub-modal-overlay" role="presentation" onClick={props.onClose}>
      <div
        className="fub-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="fub-version-history-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="fub-modal-header">
          <h2 id="fub-version-history-title">Version History</h2>
          <button type="button" className="fub-mini-btn" onClick={props.onClose}>
            Close
          </button>
        </header>
        <div className="fub-modal-body">
          {props.errorMessage ? <p className="fub-log-error">{props.errorMessage}</p> : null}
          {props.loading ? <p className="fub-muted">Loading version history...</p> : null}
          {props.items.length === 0 && !props.loading ? <p className="fub-muted">No history entries available.</p> : null}

          {props.items.length > 0 ? (
            <div className="fub-version-history-grid">
              <div>
                <h3>Versions</h3>
                <ul>
                  {props.items.map((item) => (
                    <li key={item.version}>
                      <button
                        type="button"
                        className={`fub-list-item${item.version === props.selectedVersion ? " is-selected" : ""}`}
                        onClick={() => props.onSelectVersion(item.version)}
                      >
                        <span className="fub-item-main">{item.version}</span>
                        <span className="fub-item-meta">{item.isDraft ? "draft" : "published"}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3>Details</h3>
                {selectedItem ? (
                  <div className="fub-console-card">
                    <p>
                      <strong>Version:</strong> <code>{selectedItem.version}</code>
                    </p>
                    <p>
                      <strong>Updated:</strong> <code>{selectedItem.updatedAt}</code>
                    </p>
                    {selectedItem.publishedAt ? (
                      <p>
                        <strong>Published:</strong> <code>{selectedItem.publishedAt}</code>
                      </p>
                    ) : null}
                    {selectedItem.etag ? (
                      <p>
                        <strong>ETag:</strong> <code>{selectedItem.etag}</code>
                      </p>
                    ) : null}
                    <div className="fub-inline-actions">
                      <button type="button" className="fub-btn" disabled={!canRestore} onClick={props.onRestoreSelected}>
                        Restore Selected
                      </button>
                      {!canRestore ? <span className="fub-muted">Current version selected.</span> : null}
                    </div>
                  </div>
                ) : (
                  <p className="fub-muted">Select a version to inspect details and restore.</p>
                )}

                <h3>Diff</h3>
                {props.diff ? (
                  <div className="fub-console-card">
                    <p>
                      <strong>Compared:</strong> <code>{props.diff.baseVersion}</code> {"->"} <code>{props.diff.targetVersion}</code>
                    </p>
                    <p>
                      <strong>Conflicts:</strong> {props.diff.hasConflicts ? "yes" : "no"}
                    </p>
                    {props.diff.changes.length > 0 ? (
                      <ul>
                        {props.diff.changes.map((change) => (
                          <li key={`${change.path}-${change.changeType}`}>
                            <code>{change.path}</code> ({change.changeType})
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="fub-muted">No changes reported.</p>
                    )}
                    {props.diff.conflictPaths && props.diff.conflictPaths.length > 0 ? (
                      <>
                        <strong>Conflict Paths</strong>
                        <ul>
                          {props.diff.conflictPaths.map((path) => (
                            <li key={path}>
                              <code>{path}</code>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : null}
                  </div>
                ) : (
                  <p className="fub-muted">{props.diffUnavailableReason ?? "No diff selected."}</p>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

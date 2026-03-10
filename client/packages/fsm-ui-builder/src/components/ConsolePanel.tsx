import { useMachineStore, useSimulationStore } from "../store/provider"

export function ConsolePanel() {
  const diagnostics = useMachineStore((state) => state.diagnostics)
  const focusDiagnostic = useMachineStore((state) => state.focusDiagnostic)

  const simulationLog = useSimulationStore((state) => state.log)
  const projectedOutcome = useSimulationStore((state) => state.projectedOutcome)
  const blockedTransitions = useSimulationStore((state) => state.blockedTransitions)
  const errors = useSimulationStore((state) => state.errors)

  return (
    <section className="fub-panel fub-console" aria-label="Console panel">
      <div className="fub-panel-header">
        <strong>Console</strong>
        <span className="fub-muted">Problems + simulation output</span>
      </div>

      <div className="fub-console-grid">
        <section>
          <h3>Problems</h3>
          <ul>
            {diagnostics.length === 0 ? <li className="fub-muted">No diagnostics.</li> : null}
            {diagnostics.map((diagnostic, index) => (
              <li key={`${diagnostic.code}-${diagnostic.path}-${index}`}>
                <button type="button" className="fub-list-item" onClick={() => focusDiagnostic(diagnostic)}>
                  <strong>{diagnostic.code}</strong> {diagnostic.message}
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3>Simulation</h3>

          {projectedOutcome ? (
            <div className="fub-console-card" aria-label="Projected outcome">
              <strong>Projected outcome</strong>
              <div>
                Event: <code>{projectedOutcome.event}</code>
              </div>
              {projectedOutcome.selectedTransitionID ? (
                <div>
                  Transition: <code>{projectedOutcome.selectedTransitionID}</code>
                </div>
              ) : null}
              <div>
                State: <code>{projectedOutcome.previousState}</code> -&gt; <code>{projectedOutcome.currentState}</code>
              </div>
              <div>
                Status: <code>{projectedOutcome.status}</code>
              </div>
            </div>
          ) : (
            <p className="fub-muted">No dry-run projected outcome yet.</p>
          )}

          <div className="fub-console-card" aria-label="Blocked transitions">
            <strong>Blocked transitions</strong>
            {blockedTransitions.length === 0 ? <p className="fub-muted">No blocked transitions in latest snapshot.</p> : null}
            <ul>
              {blockedTransitions.map((transition) => (
                <li key={transition.id || transition.event}>
                  <div>
                    <code>{transition.id || "(transition)"}</code> event <code>{transition.event}</code>
                  </div>
                  <ul>
                    {(transition.rejections ?? []).map((rejection, rejectionIndex) => (
                      <li key={`${transition.id}-rejection-${rejectionIndex}`}>
                        <strong>{rejection.code}</strong>: {rejection.message}
                        {rejection.remediationHint ? ` (${rejection.remediationHint})` : ""}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          <div className="fub-console-card" aria-label="Runtime and authoring errors">
            <strong>Runtime/authoring errors</strong>
            {errors.length === 0 ? <p className="fub-muted">No runtime/authoring errors.</p> : null}
            <ul>
              {errors.map((entry) => (
                <li key={entry.id} className="fub-log-error">
                  [{entry.code}] {entry.method ? `${entry.method}: ` : ""}
                  {entry.message}
                </li>
              ))}
            </ul>
          </div>

          <ul>
            {simulationLog.length === 0 ? <li className="fub-muted">No simulation runs yet.</li> : null}
            {simulationLog.map((entry) => (
              <li key={entry.id} className={`fub-log-${entry.level}`}>
                [{entry.timestamp}] {entry.message}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  )
}

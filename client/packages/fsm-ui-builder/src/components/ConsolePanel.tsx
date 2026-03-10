import { useMachineStore, useSimulationStore } from "../store/provider"

export function ConsolePanel() {
  const diagnostics = useMachineStore((state) => state.diagnostics)
  const focusDiagnostic = useMachineStore((state) => state.focusDiagnostic)
  const simulationLog = useSimulationStore((state) => state.log)

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

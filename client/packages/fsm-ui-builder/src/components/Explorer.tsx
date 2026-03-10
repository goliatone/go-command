import { transitionLabel, type Selection } from "../document"
import { useMachineStore } from "../store/provider"

function selectedClass(selected: boolean): string {
  return selected ? " is-selected" : ""
}

function isStateSelected(selection: Selection, stateIndex: number): boolean {
  return selection.kind === "state" && selection.stateIndex === stateIndex
}

function isTransitionSelected(selection: Selection, transitionIndex: number): boolean {
  if (selection.kind === "transition") {
    return selection.transitionIndex === transitionIndex
  }
  if (selection.kind === "workflow-node") {
    return selection.transitionIndex === transitionIndex
  }
  return false
}

export function Explorer() {
  const states = useMachineStore((state) => state.document.definition.states)
  const transitions = useMachineStore((state) => state.document.definition.transitions)
  const selection = useMachineStore((state) => state.selection)

  const setSelection = useMachineStore((state) => state.setSelection)
  const addState = useMachineStore((state) => state.addState)
  const addTransition = useMachineStore((state) => state.addTransition)

  return (
    <section className="fub-panel fub-explorer" aria-label="Explorer panel">
      <div className="fub-panel-header">
        <strong>Explorer</strong>
        <div className="fub-inline-actions">
          <button type="button" className="fub-mini-btn" onClick={addState}>
            + State
          </button>
          <button type="button" className="fub-mini-btn" onClick={addTransition}>
            + Transition
          </button>
        </div>
      </div>

      <div className="fub-panel-body">
        <section className="fub-section">
          <h3>States</h3>
          <ul>
            {states.map((state, stateIndex) => (
              <li key={`state-${stateIndex}`}>
                <button
                  type="button"
                  className={`fub-list-item${selectedClass(isStateSelected(selection, stateIndex))}`}
                  onClick={() => setSelection({ kind: "state", stateIndex })}
                >
                  <span className="fub-item-main">{state.name || "(unnamed)"}</span>
                  <span className="fub-item-meta">
                    {state.initial ? "initial" : ""}
                    {state.terminal ? " final" : ""}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="fub-section">
          <h3>Transitions</h3>
          <ul>
            {transitions.map((transition, transitionIndex) => (
              <li key={transition.id || `transition-${transitionIndex}`}>
                <button
                  type="button"
                  className={`fub-list-item${selectedClass(isTransitionSelected(selection, transitionIndex))}`}
                  onClick={() => setSelection({ kind: "transition", transitionIndex })}
                >
                  <span className="fub-item-main">{transition.id || `transition-${transitionIndex + 1}`}</span>
                  <span className="fub-item-meta">{transitionLabel(transition)}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  )
}

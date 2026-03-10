import { useMachineStore } from "../store/provider"

export function Canvas() {
  const definition = useMachineStore((state) => state.document.definition)
  const selection = useMachineStore((state) => state.selection)
  const setSelection = useMachineStore((state) => state.setSelection)

  return (
    <section className="fub-panel fub-canvas" aria-label="Canvas panel">
      <div className="fub-panel-header">
        <strong>Canvas</strong>
        <span className="fub-muted">Graph + workflow overview</span>
      </div>

      <div className="fub-panel-body fub-canvas-grid">
        {definition.states.map((state, stateIndex) => {
          const selected = selection.kind === "state" && selection.stateIndex === stateIndex
          return (
            <article
              key={`canvas-state-${stateIndex}`}
              className={`fub-state-card${selected ? " is-selected" : ""}`}
              onClick={() => setSelection({ kind: "state", stateIndex })}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  setSelection({ kind: "state", stateIndex })
                }
              }}
            >
              <header>
                <strong>{state.name || "(unnamed)"}</strong>
                <span>{state.initial ? "initial" : state.terminal ? "final" : "state"}</span>
              </header>

              <ul>
                {definition.transitions
                  .map((transition, transitionIndex) => ({ transition, transitionIndex }))
                  .filter(({ transition }) => transition.from === state.name)
                  .map(({ transition, transitionIndex }) => {
                    const transitionSelected =
                      (selection.kind === "transition" && selection.transitionIndex === transitionIndex) ||
                      (selection.kind === "workflow-node" && selection.transitionIndex === transitionIndex)
                    return (
                      <li key={transition.id || `canvas-transition-${transitionIndex}`}>
                        <button
                          type="button"
                          className={`fub-mini-pill${transitionSelected ? " is-selected" : ""}`}
                          onClick={(event) => {
                            event.stopPropagation()
                            setSelection({ kind: "transition", transitionIndex })
                          }}
                        >
                          {transition.event || "(event)"}{" -> "}{transition.to || transition.dynamic_to?.resolver || "(target)"}
                        </button>
                      </li>
                    )
                  })}
              </ul>
            </article>
          )
        })}
      </div>
    </section>
  )
}

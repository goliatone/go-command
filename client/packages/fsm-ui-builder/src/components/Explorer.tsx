import { useState, useCallback } from "react"
import { transitionLabel, type Selection } from "../document"
import { useMachineStore } from "../store/provider"
import { NodePalette } from "./NodePalette"

function selectedClass(selected: boolean): string {
  return selected ? " is-selected" : ""
}

type ExplorerView = "palette" | "tree"

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

export interface ExplorerProps {
  readOnly?: boolean
}

// SVG Icons for view toggle
function PaletteIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}

function TreeIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 6h18" />
      <path d="M3 12h18" />
      <path d="M3 18h18" />
    </svg>
  )
}

export function Explorer(props: ExplorerProps) {
  const [activeView, setActiveView] = useState<ExplorerView>("palette")
  const states = useMachineStore((state) => state.document.definition.states)
  const transitions = useMachineStore((state) => state.document.definition.transitions)
  const selection = useMachineStore((state) => state.selection)

  const setSelection = useMachineStore((state) => state.setSelection)
  const addState = useMachineStore((state) => state.addState)
  const addTransition = useMachineStore((state) => state.addTransition)

  const readOnly = Boolean(props.readOnly)

  const handleViewChange = useCallback((view: ExplorerView) => {
    setActiveView(view)
  }, [])

  return (
    <section
      className="fub-panel fub-explorer"
      aria-label="Explorer panel"
      role="region"
      aria-labelledby="fub-panel-explorer-heading"
      id="fub-panel-explorer"
      tabIndex={-1}
    >
      <div className="fub-panel-header" id="fub-panel-explorer-heading">
        <strong>Explorer</strong>
        <div className="fub-inline-actions">
          <div className="fub-view-toggle" role="tablist" aria-label="Explorer view">
            <button
              type="button"
              role="tab"
              className={`fub-view-toggle-btn${activeView === "palette" ? " is-active" : ""}`}
              onClick={() => handleViewChange("palette")}
              aria-selected={activeView === "palette"}
              aria-controls="fub-explorer-palette"
              title="Node Palette"
            >
              <PaletteIcon />
            </button>
            <button
              type="button"
              role="tab"
              className={`fub-view-toggle-btn${activeView === "tree" ? " is-active" : ""}`}
              onClick={() => handleViewChange("tree")}
              aria-selected={activeView === "tree"}
              aria-controls="fub-explorer-tree"
              title="Tree View"
            >
              <TreeIcon />
            </button>
          </div>
        </div>
      </div>

      <div className="fub-panel-body">
        {activeView === "palette" ? (
          <div id="fub-explorer-palette" role="tabpanel">
            <NodePalette readOnly={readOnly} />
          </div>
        ) : (
          <div id="fub-explorer-tree" role="tabpanel">
            <div className="fub-tree-actions">
              <button type="button" className="fub-mini-btn" onClick={addState} disabled={readOnly}>
                + State
              </button>
              <button type="button" className="fub-mini-btn" onClick={addTransition} disabled={readOnly}>
                + Transition
              </button>
            </div>

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
        )}
      </div>
    </section>
  )
}

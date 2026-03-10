import type { MachineDefinition, TransitionDefinition, ValidationDiagnostic, WorkflowNodeDefinition } from "../../contracts"
import { diagnosticsForSelectionField, isSupportedWorkflowNodeKind, type Selection } from "../../document"
import { InlineDiagnostics, InspectorPanel, ReadOnlyNote, renderWorkflowNodeSummary, toMessages, transitionTargetKind } from "./shared"
import { WorkflowGraphEditor } from "./WorkflowGraphEditor"

export interface TransitionInspectorProps {
  definition: MachineDefinition
  transition: TransitionDefinition | undefined
  transitionIndex: number
  diagnostics: ValidationDiagnostic[]
  selectionDiagnostics: ValidationDiagnostic[]
  readOnly: boolean
  removeTransition(transitionIndex: number): void
  updateTransition(
    transitionIndex: number,
    field: "event" | "from" | "to" | "dynamic_to.resolver",
    value: string
  ): void
  updateTransitionTargetKind(transitionIndex: number, kind: "static" | "dynamic"): void
  addWorkflowNode(transitionIndex: number, kind: "step" | "when"): void
  selectWorkflowNode(transitionIndex: number, nodeIndex: number): void
}

function workflowNodeKey(node: WorkflowNodeDefinition, nodeIndex: number): string {
  return node.id || `${node.kind}-${nodeIndex}`
}

export function TransitionInspector(props: TransitionInspectorProps) {
  if (!props.transition) {
    return (
      <InspectorPanel title="Inspector">
        <div>Transition not found.</div>
      </InspectorPanel>
    )
  }

  const selection: Selection = { kind: "transition", transitionIndex: props.transitionIndex }
  const targetKind = transitionTargetKind(props.transition)

  return (
    <InspectorPanel
      title="Transition"
      actions={
        <button
          type="button"
          className="fub-mini-btn danger"
          onClick={() => props.removeTransition(props.transitionIndex)}
          disabled={props.readOnly}
        >
          Delete
        </button>
      }
    >
      <ReadOnlyNote readOnly={props.readOnly} />
      <label className="fub-field">
        <span>Event</span>
        <input
          aria-label="Transition event"
          className="fub-input"
          value={props.transition.event}
          readOnly={props.readOnly}
          onChange={(event) => props.updateTransition(props.transitionIndex, "event", event.target.value)}
        />
        <InlineDiagnostics messages={toMessages(diagnosticsForSelectionField(props.diagnostics, selection, "event"))} />
      </label>

      <label className="fub-field">
        <span>From</span>
        <select
          aria-label="Transition from"
          className="fub-input"
          value={props.transition.from}
          disabled={props.readOnly}
          onChange={(event) => props.updateTransition(props.transitionIndex, "from", event.target.value)}
        >
          {props.definition.states.map((state, stateIndex) => (
            <option key={`${state.name}-${stateIndex}`} value={state.name}>
              {state.name}
            </option>
          ))}
        </select>
      </label>

      <fieldset className="fub-fieldset">
        <legend>Target type</legend>
        <label className="fub-checkbox-row">
          <input
            type="radio"
            name={`target-kind-${props.transitionIndex}`}
            checked={targetKind === "static"}
            disabled={props.readOnly}
            onChange={() => props.updateTransitionTargetKind(props.transitionIndex, "static")}
          />
          Static
        </label>
        <label className="fub-checkbox-row">
          <input
            type="radio"
            name={`target-kind-${props.transitionIndex}`}
            checked={targetKind === "dynamic"}
            disabled={props.readOnly}
            onChange={() => props.updateTransitionTargetKind(props.transitionIndex, "dynamic")}
          />
          Dynamic
        </label>
      </fieldset>

      {targetKind === "static" ? (
        <label className="fub-field">
          <span>To</span>
          <select
            aria-label="Transition target"
            className="fub-input"
            value={props.transition.to ?? ""}
            disabled={props.readOnly}
            onChange={(event) => props.updateTransition(props.transitionIndex, "to", event.target.value)}
          >
            {props.definition.states.map((state, stateIndex) => (
              <option key={`${state.name}-target-${stateIndex}`} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </label>
      ) : (
        <label className="fub-field">
          <span>Resolver</span>
          <input
            aria-label="Dynamic resolver"
            className="fub-input"
            value={props.transition.dynamic_to?.resolver ?? ""}
            readOnly={props.readOnly}
            onChange={(event) =>
              props.updateTransition(props.transitionIndex, "dynamic_to.resolver", event.target.value)
            }
          />
        </label>
      )}

      <section className="fub-section">
        <div className="fub-subheader">
          <strong>Workflow</strong>
          <div className="fub-inline-actions">
            <button
              type="button"
              className="fub-mini-btn"
              onClick={() => props.addWorkflowNode(props.transitionIndex, "step")}
              disabled={props.readOnly}
            >
              + Step
            </button>
            <button
              type="button"
              className="fub-mini-btn"
              onClick={() => props.addWorkflowNode(props.transitionIndex, "when")}
              disabled={props.readOnly}
            >
              + When
            </button>
          </div>
        </div>
        <WorkflowGraphEditor
          nodes={props.transition.workflow.nodes}
          onSelectNode={(nodeIndex) => props.selectWorkflowNode(props.transitionIndex, nodeIndex)}
        />
        <ul>
          {props.transition.workflow.nodes.map((node, nodeIndex) => (
            <li key={workflowNodeKey(node, nodeIndex)}>
              <button
                type="button"
                className="fub-list-item"
                onClick={() => props.selectWorkflowNode(props.transitionIndex, nodeIndex)}
              >
                <span>{renderWorkflowNodeSummary(node)}</span>
                {!isSupportedWorkflowNodeKind(node.kind) ? <span className="fub-item-meta">unsupported</span> : null}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <InlineDiagnostics messages={toMessages(props.selectionDiagnostics)} />
    </InspectorPanel>
  )
}

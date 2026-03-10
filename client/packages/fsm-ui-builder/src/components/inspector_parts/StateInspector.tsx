import type { MachineStateDefinition, ValidationDiagnostic } from "../../contracts"
import { diagnosticsForSelectionField, type Selection } from "../../document"
import { InlineDiagnostics, InspectorPanel, ReadOnlyNote, toMessages } from "./shared"

export interface StateInspectorProps {
  state: MachineStateDefinition | undefined
  stateIndex: number
  diagnostics: ValidationDiagnostic[]
  selectionDiagnostics: ValidationDiagnostic[]
  readOnly: boolean
  removeState(stateIndex: number): void
  updateStateName(stateIndex: number, name: string): void
  updateStateFlag(stateIndex: number, field: "initial" | "terminal", value: boolean): void
}

export function StateInspector(props: StateInspectorProps) {
  if (!props.state) {
    return (
      <InspectorPanel title="Inspector">
        <div>State not found.</div>
      </InspectorPanel>
    )
  }

  const selection: Selection = { kind: "state", stateIndex: props.stateIndex }

  return (
    <InspectorPanel
      title="State"
      actions={
        <button
          type="button"
          className="fub-mini-btn danger"
          onClick={() => props.removeState(props.stateIndex)}
          disabled={props.readOnly}
        >
          Delete
        </button>
      }
    >
      <ReadOnlyNote readOnly={props.readOnly} />
      <label className="fub-field">
        <span>Name</span>
        <input
          aria-label="State name"
          className="fub-input"
          value={props.state.name}
          readOnly={props.readOnly}
          onChange={(event) => props.updateStateName(props.stateIndex, event.target.value)}
        />
        <InlineDiagnostics
          messages={toMessages(diagnosticsForSelectionField(props.diagnostics, selection, "name"))}
        />
      </label>

      <label className="fub-checkbox-row">
        <input
          type="checkbox"
          checked={Boolean(props.state.initial)}
          disabled={props.readOnly}
          onChange={(event) => props.updateStateFlag(props.stateIndex, "initial", event.target.checked)}
        />
        Initial
      </label>

      <label className="fub-checkbox-row">
        <input
          type="checkbox"
          checked={Boolean(props.state.terminal)}
          disabled={props.readOnly}
          onChange={(event) => props.updateStateFlag(props.stateIndex, "terminal", event.target.checked)}
        />
        Final
      </label>

      <InlineDiagnostics messages={toMessages(props.selectionDiagnostics)} />
    </InspectorPanel>
  )
}

import { useEffect, useMemo, useState } from "react"

import type { ActionCatalogItem, ActionCatalogProvider } from "../adapters/actionCatalog"
import type { TransitionDefinition, WorkflowNodeDefinition } from "../contracts"
import {
  UNSUPPORTED_WORKFLOW_NODE_KINDS,
  diagnosticsForSelection,
  diagnosticsForSelectionField,
  isSupportedWorkflowNodeKind
} from "../document"
import { useMachineStore } from "../store/provider"

function InlineDiagnostics(props: { messages: string[] }) {
  if (props.messages.length === 0) {
    return null
  }
  return (
    <ul className="fub-inline-diags" role="alert">
      {props.messages.map((message, index) => (
        <li key={`${message}-${index}`}>{message}</li>
      ))}
    </ul>
  )
}

function toMessages(list: Array<{ message: string }>): string[] {
  return list.map((item) => item.message)
}

function transitionTargetKind(transition: TransitionDefinition): "static" | "dynamic" {
  if (transition.dynamic_to) {
    return "dynamic"
  }
  return "static"
}

function renderWorkflowNodeSummary(node: WorkflowNodeDefinition): string {
  if (node.kind === "step") {
    return `step:${node.step?.action_id || "(action_id)"}`
  }
  if (node.kind === "when") {
    return `when:${node.expr || "(expr)"}`
  }
  return `${node.kind}: unsupported`
}

function metadataToText(metadata: Record<string, unknown> | undefined): string {
  return JSON.stringify(metadata ?? {}, null, 2)
}

function parseMetadataText(raw: string): { value?: Record<string, unknown>; error?: string } {
  if (raw.trim() === "") {
    return { value: {} }
  }
  try {
    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return { error: "metadata must be a JSON object" }
    }
    return { value: parsed as Record<string, unknown> }
  } catch {
    return { error: "metadata must be valid JSON" }
  }
}

function StepMetadataEditor(props: {
  metadata: Record<string, unknown> | undefined
  onCommit: (metadata: Record<string, unknown>) => void
}) {
  const serializedMetadata = useMemo(() => metadataToText(props.metadata), [props.metadata])
  const [text, setText] = useState(serializedMetadata)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setText(serializedMetadata)
    setError(null)
  }, [serializedMetadata])

  const commit = () => {
    const result = parseMetadataText(text)
    if (result.error) {
      setError(result.error)
      return
    }
    setError(null)
    props.onCommit(result.value ?? {})
  }

  return (
    <label className="fub-field">
      <span>Metadata (JSON object)</span>
      <textarea
        aria-label="Workflow metadata"
        className="fub-input fub-textarea"
        value={text}
        onChange={(event) => setText(event.target.value)}
        onBlur={commit}
      />
      {error ? <InlineDiagnostics messages={[error]} /> : null}
    </label>
  )
}

function useActionCatalog(provider: ActionCatalogProvider | null | undefined): {
  actions: ActionCatalogItem[]
  unavailableReason: string | null
} {
  const [actions, setActions] = useState<ActionCatalogItem[]>([])
  const [unavailableReason, setUnavailableReason] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    if (!provider) {
      setActions([])
      setUnavailableReason("Action catalog unavailable.")
      return
    }

    provider
      .listActions()
      .then((items) => {
        if (cancelled) {
          return
        }
        setActions(items)
        setUnavailableReason(items.length === 0 ? "Action catalog is empty." : null)
      })
      .catch(() => {
        if (cancelled) {
          return
        }
        setActions([])
        setUnavailableReason("Action catalog unavailable.")
      })

    return () => {
      cancelled = true
    }
  }, [provider])

  return { actions, unavailableReason }
}

export interface InspectorProps {
  actionCatalogProvider?: ActionCatalogProvider | null
}

export function Inspector(props: InspectorProps) {
  const definition = useMachineStore((state) => state.document.definition)
  const selection = useMachineStore((state) => state.selection)
  const diagnostics = useMachineStore((state) => state.diagnostics)

  const removeState = useMachineStore((state) => state.removeState)
  const updateStateName = useMachineStore((state) => state.updateStateName)
  const updateStateFlag = useMachineStore((state) => state.updateStateFlag)

  const removeTransition = useMachineStore((state) => state.removeTransition)
  const updateTransition = useMachineStore((state) => state.updateTransition)
  const updateTransitionTargetKind = useMachineStore((state) => state.updateTransitionTargetKind)
  const addWorkflowNode = useMachineStore((state) => state.addWorkflowNode)
  const removeWorkflowNode = useMachineStore((state) => state.removeWorkflowNode)
  const selectWorkflowNode = useMachineStore((state) => state.selectWorkflowNode)
  const updateWorkflowNodeField = useMachineStore((state) => state.updateWorkflowNodeField)
  const updateWorkflowNodeMetadata = useMachineStore((state) => state.updateWorkflowNodeMetadata)

  const selectionDiagnostics = diagnosticsForSelection(diagnostics, selection)
  const catalog = useActionCatalog(props.actionCatalogProvider)

  if (selection.kind === "state") {
    const state = definition.states[selection.stateIndex]
    if (!state) {
      return (
        <section className="fub-panel fub-inspector" aria-label="Inspector panel">
          <div className="fub-panel-header">
            <strong>Inspector</strong>
          </div>
          <div className="fub-panel-body">State not found.</div>
        </section>
      )
    }

    return (
      <section className="fub-panel fub-inspector" aria-label="Inspector panel">
        <div className="fub-panel-header">
          <strong>State</strong>
          <button type="button" className="fub-mini-btn danger" onClick={() => removeState(selection.stateIndex)}>
            Delete
          </button>
        </div>

        <div className="fub-panel-body">
          <label className="fub-field">
            <span>Name</span>
            <input
              aria-label="State name"
              className="fub-input"
              value={state.name}
              onChange={(event) => updateStateName(selection.stateIndex, event.target.value)}
            />
            <InlineDiagnostics
              messages={toMessages(
                diagnosticsForSelectionField(diagnostics, selection, "name")
              )}
            />
          </label>

          <label className="fub-checkbox-row">
            <input
              type="checkbox"
              checked={Boolean(state.initial)}
              onChange={(event) => updateStateFlag(selection.stateIndex, "initial", event.target.checked)}
            />
            Initial
          </label>

          <label className="fub-checkbox-row">
            <input
              type="checkbox"
              checked={Boolean(state.terminal)}
              onChange={(event) => updateStateFlag(selection.stateIndex, "terminal", event.target.checked)}
            />
            Final
          </label>

          <InlineDiagnostics messages={toMessages(selectionDiagnostics)} />
        </div>
      </section>
    )
  }

  if (selection.kind === "transition") {
    const transition = definition.transitions[selection.transitionIndex]
    if (!transition) {
      return (
        <section className="fub-panel fub-inspector" aria-label="Inspector panel">
          <div className="fub-panel-header">
            <strong>Inspector</strong>
          </div>
          <div className="fub-panel-body">Transition not found.</div>
        </section>
      )
    }

    const targetKind = transitionTargetKind(transition)

    return (
      <section className="fub-panel fub-inspector" aria-label="Inspector panel">
        <div className="fub-panel-header">
          <strong>Transition</strong>
          <button
            type="button"
            className="fub-mini-btn danger"
            onClick={() => removeTransition(selection.transitionIndex)}
          >
            Delete
          </button>
        </div>

        <div className="fub-panel-body">
          <label className="fub-field">
            <span>Event</span>
            <input
              aria-label="Transition event"
              className="fub-input"
              value={transition.event}
              onChange={(event) => updateTransition(selection.transitionIndex, "event", event.target.value)}
            />
            <InlineDiagnostics
              messages={toMessages(
                diagnosticsForSelectionField(diagnostics, selection, "event")
              )}
            />
          </label>

          <label className="fub-field">
            <span>From</span>
            <select
              aria-label="Transition from"
              className="fub-input"
              value={transition.from}
              onChange={(event) => updateTransition(selection.transitionIndex, "from", event.target.value)}
            >
              {definition.states.map((state, stateIndex) => (
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
                name={`target-kind-${selection.transitionIndex}`}
                checked={targetKind === "static"}
                onChange={() => updateTransitionTargetKind(selection.transitionIndex, "static")}
              />
              Static
            </label>
            <label className="fub-checkbox-row">
              <input
                type="radio"
                name={`target-kind-${selection.transitionIndex}`}
                checked={targetKind === "dynamic"}
                onChange={() => updateTransitionTargetKind(selection.transitionIndex, "dynamic")}
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
                value={transition.to ?? ""}
                onChange={(event) => updateTransition(selection.transitionIndex, "to", event.target.value)}
              >
                {definition.states.map((state, stateIndex) => (
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
                value={transition.dynamic_to?.resolver ?? ""}
                onChange={(event) =>
                  updateTransition(selection.transitionIndex, "dynamic_to.resolver", event.target.value)
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
                  onClick={() => addWorkflowNode(selection.transitionIndex, "step")}
                >
                  + Step
                </button>
                <button
                  type="button"
                  className="fub-mini-btn"
                  onClick={() => addWorkflowNode(selection.transitionIndex, "when")}
                >
                  + When
                </button>
              </div>
            </div>
            <ul>
              {transition.workflow.nodes.map((node, nodeIndex) => {
                return (
                  <li key={node.id || `${node.kind}-${nodeIndex}`}>
                    <button
                      type="button"
                      className="fub-list-item"
                      onClick={() => selectWorkflowNode(selection.transitionIndex, nodeIndex)}
                    >
                      <span>{renderWorkflowNodeSummary(node)}</span>
                      {!isSupportedWorkflowNodeKind(node.kind) ? <span className="fub-item-meta">unsupported</span> : null}
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>

          <InlineDiagnostics messages={toMessages(selectionDiagnostics)} />
        </div>
      </section>
    )
  }

  if (selection.kind === "workflow-node") {
    const transition = definition.transitions[selection.transitionIndex]
    const node = transition?.workflow.nodes?.[selection.nodeIndex]

    if (!transition || !node) {
      return (
        <section className="fub-panel fub-inspector" aria-label="Inspector panel">
          <div className="fub-panel-header">
            <strong>Inspector</strong>
          </div>
          <div className="fub-panel-body">Workflow node not found.</div>
        </section>
      )
    }

    if (!isSupportedWorkflowNodeKind(node.kind)) {
      return (
        <section className="fub-panel fub-inspector" aria-label="Inspector panel">
          <div className="fub-panel-header">
            <strong>Workflow Node</strong>
          </div>
          <div className="fub-panel-body">
            <p className="fub-guardrail">
              Node kind <code>{node.kind}</code> is unsupported in builder v1 and is read-only.
            </p>
            <p className="fub-muted">
              Unsupported kinds: {UNSUPPORTED_WORKFLOW_NODE_KINDS.join(", ")}
            </p>
            <InlineDiagnostics messages={toMessages(selectionDiagnostics)} />
          </div>
        </section>
      )
    }

    const actionListID = `fub-action-catalog-${selection.transitionIndex}-${selection.nodeIndex}`

    return (
      <section className="fub-panel fub-inspector" aria-label="Inspector panel">
        <div className="fub-panel-header">
          <strong>Workflow Node</strong>
          <button
            type="button"
            className="fub-mini-btn danger"
            onClick={() => removeWorkflowNode(selection.transitionIndex, selection.nodeIndex)}
          >
            Delete
          </button>
        </div>

        <div className="fub-panel-body">
          <div className="fub-muted">Kind: {node.kind}</div>

          {node.kind === "step" ? (
            <>
              <label className="fub-field">
                <span>Action ID</span>
                <input
                  aria-label="Workflow action id"
                  className="fub-input"
                  list={catalog.actions.length > 0 ? actionListID : undefined}
                  value={node.step?.action_id ?? ""}
                  onChange={(event) =>
                    updateWorkflowNodeField(selection.transitionIndex, selection.nodeIndex, "action_id", event.target.value)
                  }
                />
                {catalog.actions.length > 0 ? (
                  <datalist id={actionListID}>
                    {catalog.actions.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.label ?? item.id}
                      </option>
                    ))}
                  </datalist>
                ) : null}
                {catalog.unavailableReason ? <p className="fub-muted">{catalog.unavailableReason}</p> : null}
                <InlineDiagnostics
                  messages={toMessages(
                    diagnosticsForSelectionField(diagnostics, selection, "action_id")
                  )}
                />
              </label>

              <label className="fub-checkbox-row">
                <input
                  type="checkbox"
                  checked={Boolean(node.step?.async)}
                  onChange={(event) =>
                    updateWorkflowNodeField(selection.transitionIndex, selection.nodeIndex, "async", event.target.checked)
                  }
                />
                Async
              </label>

              <label className="fub-field">
                <span>Delay</span>
                <input
                  aria-label="Workflow delay"
                  className="fub-input"
                  value={node.step?.delay ?? ""}
                  onChange={(event) =>
                    updateWorkflowNodeField(selection.transitionIndex, selection.nodeIndex, "delay", event.target.value)
                  }
                />
              </label>

              <label className="fub-field">
                <span>Timeout</span>
                <input
                  aria-label="Workflow timeout"
                  className="fub-input"
                  value={node.step?.timeout ?? ""}
                  onChange={(event) =>
                    updateWorkflowNodeField(selection.transitionIndex, selection.nodeIndex, "timeout", event.target.value)
                  }
                />
              </label>

              <StepMetadataEditor
                metadata={node.step?.metadata}
                onCommit={(metadata) =>
                  updateWorkflowNodeMetadata(selection.transitionIndex, selection.nodeIndex, metadata)
                }
              />
            </>
          ) : (
            <label className="fub-field">
              <span>When expression</span>
              <input
                aria-label="Workflow when expression"
                className="fub-input"
                value={node.expr ?? ""}
                onChange={(event) =>
                  updateWorkflowNodeField(selection.transitionIndex, selection.nodeIndex, "expr", event.target.value)
                }
              />
              <InlineDiagnostics
                messages={toMessages(
                  diagnosticsForSelectionField(diagnostics, selection, "expr")
                )}
              />
            </label>
          )}

          <InlineDiagnostics messages={toMessages(selectionDiagnostics)} />
        </div>
      </section>
    )
  }

  return (
    <section className="fub-panel fub-inspector" aria-label="Inspector panel">
      <div className="fub-panel-header">
        <strong>Inspector</strong>
      </div>
      <div className="fub-panel-body">
        <p>Select a state, transition, or workflow node to edit properties.</p>
        <InlineDiagnostics messages={toMessages(selectionDiagnostics)} />
      </div>
    </section>
  )
}

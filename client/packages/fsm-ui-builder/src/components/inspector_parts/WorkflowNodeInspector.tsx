import type { ActionCatalogState } from "./useActionCatalog"
import { ActionCatalogDropdown } from "../ActionCatalogDropdown"
import { UNSUPPORTED_WORKFLOW_NODE_KINDS, diagnosticsForSelectionField, isSupportedWorkflowNodeKind, type Selection } from "../../document"
import type { TransitionDefinition, ValidationDiagnostic, WorkflowNodeDefinition } from "../../contracts"
import { MetadataEditor } from "./MetadataEditor"
import { InlineDiagnostics, InspectorPanel, ReadOnlyNote, toMessages } from "./shared"

function actionCatalogInputID(transitionIndex: number, nodeIndex: number): string {
  return `fub-action-catalog-${transitionIndex}-${nodeIndex}`
}

interface BaseWorkflowNodeInspectorProps {
  transition: TransitionDefinition | undefined
  node: WorkflowNodeDefinition | undefined
  transitionIndex: number
  nodeIndex: number
  diagnostics: ValidationDiagnostic[]
  selectionDiagnostics: ValidationDiagnostic[]
  readOnly: boolean
  removeWorkflowNode(transitionIndex: number, nodeIndex: number): void
  updateWorkflowNodeField(
    transitionIndex: number,
    nodeIndex: number,
    field: "action_id" | "async" | "delay" | "timeout" | "expr",
    value: string | boolean
  ): void
  updateWorkflowNodeMetadata(transitionIndex: number, nodeIndex: number, metadata: Record<string, unknown>): void
}

export interface WorkflowNodeInspectorProps extends BaseWorkflowNodeInspectorProps {
  actionCatalog: ActionCatalogState
}

export function WorkflowNodeInspector(props: WorkflowNodeInspectorProps) {
  if (!props.transition || !props.node) {
    return (
      <InspectorPanel title="Inspector">
        <div>Workflow node not found.</div>
      </InspectorPanel>
    )
  }

  if (!isSupportedWorkflowNodeKind(props.node.kind)) {
    return (
      <InspectorPanel title="Workflow Node">
        <p className="fub-guardrail">
          Node kind <code>{props.node.kind}</code> is unsupported in builder v1 and is read-only.
        </p>
        <p className="fub-muted">Unsupported kinds: {UNSUPPORTED_WORKFLOW_NODE_KINDS.join(", ")}</p>
        <InlineDiagnostics messages={toMessages(props.selectionDiagnostics)} />
      </InspectorPanel>
    )
  }

  const selection: Selection = {
    kind: "workflow-node",
    transitionIndex: props.transitionIndex,
    nodeIndex: props.nodeIndex
  }

  return (
    <InspectorPanel
      title="Workflow Node"
      actions={
        <button
          type="button"
          className="fub-mini-btn danger"
          onClick={() => props.removeWorkflowNode(props.transitionIndex, props.nodeIndex)}
          disabled={props.readOnly}
        >
          Delete
        </button>
      }
    >
      <ReadOnlyNote readOnly={props.readOnly} />
      <div className="fub-muted">Kind: {props.node.kind}</div>

      {props.node.kind === "step" ? (
        <>
          <label className="fub-field">
            <span>Action ID</span>
            <ActionCatalogDropdown
              inputID={actionCatalogInputID(props.transitionIndex, props.nodeIndex)}
              value={props.node.step?.action_id ?? ""}
              actions={props.actionCatalog.actions}
              loading={props.actionCatalog.loading}
              unavailableReason={props.actionCatalog.unavailableReason}
              readOnly={props.readOnly}
              onChange={(value) => {
                props.updateWorkflowNodeField(props.transitionIndex, props.nodeIndex, "action_id", value)
              }}
            />
            <InlineDiagnostics
              messages={toMessages(diagnosticsForSelectionField(props.diagnostics, selection, "action_id"))}
            />
          </label>

          <label className="fub-checkbox-row">
            <input
              type="checkbox"
              checked={Boolean(props.node.step?.async)}
              disabled={props.readOnly}
              onChange={(event) =>
                props.updateWorkflowNodeField(props.transitionIndex, props.nodeIndex, "async", event.target.checked)
              }
            />
            Async
          </label>

          <label className="fub-field">
            <span>Delay</span>
            <input
              aria-label="Workflow delay"
              className="fub-input"
              value={props.node.step?.delay ?? ""}
              readOnly={props.readOnly}
              onChange={(event) =>
                props.updateWorkflowNodeField(props.transitionIndex, props.nodeIndex, "delay", event.target.value)
              }
            />
          </label>

          <label className="fub-field">
            <span>Timeout</span>
            <input
              aria-label="Workflow timeout"
              className="fub-input"
              value={props.node.step?.timeout ?? ""}
              readOnly={props.readOnly}
              onChange={(event) =>
                props.updateWorkflowNodeField(props.transitionIndex, props.nodeIndex, "timeout", event.target.value)
              }
            />
          </label>

          <MetadataEditor
            metadata={props.node.step?.metadata}
            readOnly={props.readOnly}
            onCommit={(metadata) =>
              props.updateWorkflowNodeMetadata(props.transitionIndex, props.nodeIndex, metadata)
            }
          />
        </>
      ) : (
        <label className="fub-field">
          <span>When expression</span>
          <input
            aria-label="Workflow when expression"
            className="fub-input"
            value={props.node.expr ?? ""}
            readOnly={props.readOnly}
            onChange={(event) =>
              props.updateWorkflowNodeField(props.transitionIndex, props.nodeIndex, "expr", event.target.value)
            }
          />
          <InlineDiagnostics messages={toMessages(diagnosticsForSelectionField(props.diagnostics, selection, "expr"))} />
        </label>
      )}

      <InlineDiagnostics messages={toMessages(props.selectionDiagnostics)} />
    </InspectorPanel>
  )
}

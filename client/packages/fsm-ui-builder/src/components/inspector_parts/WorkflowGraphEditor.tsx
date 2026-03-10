import { isSupportedWorkflowNodeKind } from "../../document"
import type { WorkflowNodeDefinition } from "../../contracts"
import { renderWorkflowNodeSummary } from "./shared"

function nodeKey(node: WorkflowNodeDefinition, nodeIndex: number): string {
  return node.id || `${node.kind}-${nodeIndex}`
}

interface WorkflowGraphEditorProps {
  nodes: WorkflowNodeDefinition[]
  onSelectNode(nodeIndex: number): void
}

export function WorkflowGraphEditor(props: WorkflowGraphEditorProps) {
  if (props.nodes.length === 0) {
    return <p className="fub-muted">No workflow nodes. Add a Step or When node to begin.</p>
  }

  return (
    <div className="fub-workflow-graph" aria-label="Workflow visual editor">
      {props.nodes.map((node, nodeIndex) => (
        <div key={nodeKey(node, nodeIndex)} className="fub-workflow-graph-node">
          <button
            type="button"
            className="fub-list-item"
            onClick={() => props.onSelectNode(nodeIndex)}
            aria-label={`Select workflow node ${node.id || node.kind}`}
          >
            <span className="fub-item-main">{renderWorkflowNodeSummary(node)}</span>
            {!isSupportedWorkflowNodeKind(node.kind) ? <span className="fub-item-meta">read-only</span> : null}
          </button>
          <div className="fub-workflow-graph-next">
            {Array.isArray(node.next) && node.next.length > 0 ? (
              node.next.map((nextNodeID) => (
                <span key={`${nodeKey(node, nodeIndex)}-${nextNodeID}`} className="fub-workflow-graph-edge">
                  {"->"} {nextNodeID}
                </span>
              ))
            ) : (
              <span className="fub-muted">No next links</span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

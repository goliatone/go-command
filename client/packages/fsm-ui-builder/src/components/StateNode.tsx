import { memo } from "react"
import { Handle, Position, type NodeProps } from "@xyflow/react"

export interface StateNodeData extends Record<string, unknown> {
  name: string
  initial?: boolean
  terminal?: boolean
  stateIndex: number
  transitionCount?: number
}

// SVG Icons for node types
function PlayIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function StopIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <rect x="6" y="6" width="12" height="12" rx="1" />
    </svg>
  )
}

function CircleIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="6" />
    </svg>
  )
}

function StateNodeComponent({ data, selected }: NodeProps) {
  const nodeData = data as StateNodeData
  const { name, initial, terminal, transitionCount } = nodeData

  const getNodeType = (): "initial" | "terminal" | "regular" => {
    if (initial) return "initial"
    if (terminal) return "terminal"
    return "regular"
  }

  const nodeType = getNodeType()

  const getBadgeText = (): string => {
    if (initial) return "Initial"
    if (terminal) return "Final"
    return "State"
  }

  const getIcon = () => {
    if (initial) return <PlayIcon />
    if (terminal) return <StopIcon />
    return <CircleIcon />
  }

  return (
    <div
      className={`fub-node fub-node--${nodeType}${selected ? " fub-node--selected" : ""}`}
      data-node-type={nodeType}
    >
      {/* Target handle (input) - top */}
      <Handle
        type="target"
        position={Position.Top}
        className="fub-node-handle fub-node-handle--target"
        id="target"
      />

      {/* Node header with colored accent */}
      <div className="fub-node-header">
        <div className="fub-node-icon">{getIcon()}</div>
        <span className="fub-node-title">{name || "(unnamed)"}</span>
        <span className="fub-node-badge">{getBadgeText()}</span>
      </div>

      {/* Node body with metadata */}
      <div className="fub-node-body">
        {transitionCount !== undefined && transitionCount > 0 ? (
          <div className="fub-node-meta">
            <span className="fub-node-meta-item">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
              {transitionCount} transition{transitionCount !== 1 ? "s" : ""}
            </span>
          </div>
        ) : (
          <div className="fub-node-meta fub-node-meta--empty">
            <span className="fub-node-meta-item">No outgoing transitions</span>
          </div>
        )}
      </div>

      {/* Source handle (output) - bottom */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="fub-node-handle fub-node-handle--source"
        id="source"
      />
    </div>
  )
}

export const StateNode = memo(StateNodeComponent)

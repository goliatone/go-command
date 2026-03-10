import { useCallback, useEffect, useMemo, useRef, useState, type DragEvent } from "react"
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  type NodeTypes,
  type EdgeTypes,
  BackgroundVariant,
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  type EdgeProps
} from "@xyflow/react"
import dagre from "@dagrejs/dagre"

import { useMachineStore, useUIStore } from "../store/provider"
import { StateNode, type StateNodeData } from "./StateNode"

import "@xyflow/react/dist/style.css"

interface DroppedNodeData {
  id: string
  type: string
  nodeKind: string
  label: string
  defaults?: {
    initial?: boolean
    terminal?: boolean
  }
}

export interface CanvasProps {
  readOnly?: boolean
}

const nodeTypes: NodeTypes = {
  stateNode: StateNode
}

// Custom edge component with styled label
function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  label,
  selected
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  })

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        className={`fub-edge-path${selected ? " fub-edge-path--selected" : ""}`}
        markerEnd={`url(#fub-arrow${selected ? "-selected" : ""})`}
      />
      {label && (
        <EdgeLabelRenderer>
          <div
            className={`fub-edge-label${selected ? " fub-edge-label--selected" : ""}`}
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: "all"
            }}
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  )
}

const edgeTypes: EdgeTypes = {
  custom: CustomEdge
}

const NODE_WIDTH = 200
const NODE_HEIGHT = 80

interface EdgeData extends Record<string, unknown> {
  transitionIndex: number
}

function getLayoutedElements(
  nodes: Node[],
  edges: Edge[],
  direction: "TB" | "LR" = "TB"
): { nodes: Node[]; edges: Edge[] } {
  const dagreGraph = new dagre.graphlib.Graph()
  dagreGraph.setDefaultEdgeLabel(() => ({}))
  dagreGraph.setGraph({ rankdir: direction, nodesep: 80, ranksep: 100 })

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT })
  })

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target)
  })

  dagre.layout(dagreGraph)

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id)
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - NODE_WIDTH / 2,
        y: nodeWithPosition.y - NODE_HEIGHT / 2
      }
    }
  })

  return { nodes: layoutedNodes, edges }
}

function buildNodesAndEdges(
  states: Array<{ name: string; initial?: boolean; terminal?: boolean }>,
  transitions: Array<{ from: string; to?: string; event: string; dynamic_to?: { resolver?: string } }>
): { nodes: Node[]; edges: Edge[] } {
  // Count outgoing transitions per state
  const transitionCounts: Record<string, number> = {}
  transitions.forEach((t) => {
    if (t.from) {
      transitionCounts[t.from] = (transitionCounts[t.from] || 0) + 1
    }
  })

  const nodes: Node[] = states.map((state, stateIndex) => ({
    id: state.name || `state-${stateIndex}`,
    type: "stateNode",
    position: { x: 0, y: 0 },
    data: {
      name: state.name,
      initial: state.initial,
      terminal: state.terminal,
      stateIndex,
      transitionCount: transitionCounts[state.name] || 0
    } satisfies StateNodeData
  }))

  const stateNames = new Set(states.map((s) => s.name))

  const edges: Edge[] = []

  transitions.forEach((transition, transitionIndex) => {
    const targetState = transition.to || transition.dynamic_to?.resolver
    const sourceExists = stateNames.has(transition.from)
    const targetExists = targetState && stateNames.has(targetState)

    if (!sourceExists || !targetExists) {
      return
    }

    edges.push({
      id: `edge-${transitionIndex}`,
      source: transition.from,
      target: targetState,
      label: transition.event || "(event)",
      type: "custom",
      data: {
        transitionIndex
      } satisfies EdgeData
    })
  })

  return getLayoutedElements(nodes, edges)
}

function CanvasInner(props: CanvasProps) {
  const definition = useMachineStore((state) => state.document.definition)
  const selection = useMachineStore((state) => state.selection)
  const setSelection = useMachineStore((state) => state.setSelection)
  const addState = useMachineStore((state) => state.addState)
  const updateStateName = useMachineStore((state) => state.updateStateName)
  const updateStateFlag = useMachineStore((state) => state.updateStateFlag)
  const canvasZoom = useUIStore((state) => state.canvasZoom)
  const zoomCanvas = useUIStore((state) => state.zoomCanvas)
  const readOnly = Boolean(props.readOnly)
  const states = definition.states
  const transitions = definition.transitions

  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const reactFlowInstance = useReactFlow()
  const [isDragOver, setIsDragOver] = useState(false)

  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => buildNodesAndEdges(states, transitions),
    [states, transitions]
  )

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  useEffect(() => {
    const { nodes: newNodes, edges: newEdges } = buildNodesAndEdges(states, transitions)
    setNodes(newNodes)
    setEdges(newEdges)
  }, [states, transitions, setNodes, setEdges])

  useEffect(() => {
    if (selection.kind === "state") {
      const selectedState = states[selection.stateIndex]
      if (selectedState) {
        setNodes((nds) =>
          nds.map((node) => ({
            ...node,
            selected: node.id === selectedState.name
          }))
        )
        setEdges((eds) =>
          eds.map((edge) => ({
            ...edge,
            selected: false
          }))
        )
      }
    } else if (selection.kind === "transition" || selection.kind === "workflow-node") {
      const transitionIndex = selection.transitionIndex
      setNodes((nds) =>
        nds.map((node) => ({
          ...node,
          selected: false
        }))
      )
      setEdges((eds) =>
        eds.map((edge) => {
          const edgeData = edge.data as EdgeData | undefined
          return {
            ...edge,
            selected: edgeData?.transitionIndex === transitionIndex
          }
        })
      )
    } else {
      setNodes((nds) =>
        nds.map((node) => ({
          ...node,
          selected: false
        }))
      )
      setEdges((eds) =>
        eds.map((edge) => ({
          ...edge,
          selected: false
        }))
      )
    }
  }, [selection, states, setNodes, setEdges])

  const handleNodesChange: OnNodesChange = useCallback(
    (changes) => {
      onNodesChange(changes)

      for (const change of changes) {
        if (change.type === "select" && change.selected) {
          const node = nodes.find((n) => n.id === change.id)
          const nodeData = node?.data as StateNodeData | undefined
          if (nodeData?.stateIndex !== undefined) {
            setSelection({ kind: "state", stateIndex: nodeData.stateIndex })
          }
        }
      }
    },
    [nodes, onNodesChange, setSelection]
  )

  const handleEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      onEdgesChange(changes)

      for (const change of changes) {
        if (change.type === "select" && change.selected) {
          const edge = edges.find((e) => e.id === change.id)
          const edgeData = edge?.data as EdgeData | undefined
          if (edgeData?.transitionIndex !== undefined) {
            setSelection({ kind: "transition", transitionIndex: edgeData.transitionIndex })
          }
        }
      }
    },
    [edges, onEdgesChange, setSelection]
  )

  const handleMoveEnd = useCallback(
    (_event: unknown, viewport: { zoom: number }) => {
      // Calculate the delta from current zoom to new zoom
      const delta = viewport.zoom - canvasZoom
      if (Math.abs(delta) > 0.01) {
        zoomCanvas(delta)
      }
    },
    [canvasZoom, zoomCanvas]
  )

  // Drag and drop handlers for palette
  const handleDragOver = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      if (readOnly) return

      event.preventDefault()
      event.dataTransfer.dropEffect = "move"
      setIsDragOver(true)
    },
    [readOnly]
  )

  const handleDragLeave = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      // Only set to false if we're leaving the container entirely
      const relatedTarget = event.relatedTarget as HTMLElement | null
      if (!relatedTarget || !event.currentTarget.contains(relatedTarget)) {
        setIsDragOver(false)
      }
    },
    []
  )

  const handleDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      if (readOnly) return

      event.preventDefault()
      setIsDragOver(false)

      const dataStr = event.dataTransfer.getData("application/reactflow")
      if (!dataStr) return

      let droppedData: DroppedNodeData
      try {
        droppedData = JSON.parse(dataStr) as DroppedNodeData
      } catch {
        return
      }

      // Only handle state nodes for now
      if (droppedData.type !== "state") {
        // For action/logic types, we could add workflow nodes in the future
        return
      }

      // Calculate drop position in flow coordinates (for future use with positioning)
      // Note: Currently the layout is auto-calculated by dagre, but position could be used
      // for manual positioning in the future
      void reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY
      })

      // Add a new state
      addState()

      // The new state will be at the end of the states array
      // After the state is added, update its properties if needed
      const newStateIndex = states.length // This is the index of the newly added state

      // Use setTimeout to ensure the state is added before we try to update it
      setTimeout(() => {
        // Generate a unique name based on the dropped item type
        const baseName = droppedData.defaults?.initial
          ? "initial"
          : droppedData.defaults?.terminal
            ? "final"
            : "state"
        const stateName = `${baseName}_${newStateIndex + 1}`

        updateStateName(newStateIndex, stateName)

        // Set initial/terminal flags if specified
        if (droppedData.defaults?.initial) {
          updateStateFlag(newStateIndex, "initial", true)
        }
        if (droppedData.defaults?.terminal) {
          updateStateFlag(newStateIndex, "terminal", true)
        }

        // Select the new state
        setSelection({ kind: "state", stateIndex: newStateIndex })
      }, 0)
    },
    [readOnly, reactFlowInstance, addState, states.length, updateStateName, updateStateFlag, setSelection]
  )

  return (
    <section
      className="fub-panel fub-canvas"
      aria-label="Canvas panel"
      role="region"
      aria-labelledby="fub-panel-canvas-heading"
      id="fub-panel-canvas"
      tabIndex={-1}
    >
      <div className="fub-panel-header" id="fub-panel-canvas-heading">
        <strong>Canvas</strong>
        <div className="fub-inline-actions">
          <span className="fub-muted">Graph + workflow overview</span>
          <span className="fub-badge fub-canvas-zoom" aria-live="polite">
            Zoom: {Math.round(canvasZoom * 100)}%
          </span>
          {readOnly ? <span className="fub-badge">Read-only</span> : null}
        </div>
      </div>

      <div
        ref={reactFlowWrapper}
        className={`fub-panel-body fub-canvas-flow-container${isDragOver ? " fub-canvas-drop-target" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isDragOver && (
          <div className="fub-canvas-drop-indicator">
            <div className="fub-canvas-drop-indicator-content">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>
              <span>Drop to add state</span>
            </div>
          </div>
        )}
        {states.length === 0 ? (
          <div className="fub-empty-state" role="status" aria-live="polite">
            <div className="fub-empty-icon" aria-hidden="true">
              {"< >"}
            </div>
            <h3>No states yet</h3>
            <p>Create your first state to start building your machine.</p>
            <button
              type="button"
              className="fub-btn"
              onClick={addState}
              disabled={readOnly}
            >
              Create first state
            </button>
            <p className="fub-muted">
              Hint: press <kbd>N</kbd> to add a state, or drag from the palette.
            </p>
          </div>
        ) : (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={handleNodesChange}
            onEdgesChange={handleEdgesChange}
            onMoveEnd={handleMoveEnd}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            defaultViewport={{ x: 50, y: 50, zoom: canvasZoom }}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            proOptions={{ hideAttribution: true }}
            nodesDraggable={!readOnly}
            nodesConnectable={false}
            elementsSelectable={true}
            selectNodesOnDrag={false}
            panOnDrag={true}
            zoomOnScroll={true}
            minZoom={0.1}
            maxZoom={2}
            className="fub-flow-canvas"
          >
            {/* Custom arrow markers for edges */}
            <svg style={{ position: "absolute", width: 0, height: 0 }}>
              <defs>
                <marker
                  id="fub-arrow"
                  viewBox="0 0 10 10"
                  refX="10"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path
                    d="M 0 0 L 10 5 L 0 10 z"
                    fill="var(--fub-edge-color, #4b5563)"
                    className="fub-arrow-path"
                  />
                </marker>
                <marker
                  id="fub-arrow-selected"
                  viewBox="0 0 10 10"
                  refX="10"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path
                    d="M 0 0 L 10 5 L 0 10 z"
                    fill="var(--fub-accent)"
                    className="fub-arrow-path--selected"
                  />
                </marker>
              </defs>
            </svg>
            <Background
              variant={BackgroundVariant.Dots}
              gap={20}
              size={1}
              color="var(--fub-border)"
            />
            <Controls
              showZoom={true}
              showFitView={true}
              showInteractive={false}
              className="fub-flow-controls"
            />
            <MiniMap
              nodeStrokeColor="var(--fub-border)"
              nodeColor={(node) => {
                const nodeData = node.data as StateNodeData | undefined
                if (node.selected) return "var(--fub-accent)"
                if (nodeData?.initial) return "var(--fub-accent-muted)"
                if (nodeData?.terminal) return "var(--fub-warn)"
                return "var(--fub-bg-2)"
              }}
              maskColor="rgba(15, 20, 24, 0.7)"
              className="fub-flow-minimap"
            />
          </ReactFlow>
        )}
      </div>
    </section>
  )
}

// Wrapper component that provides the ReactFlowProvider context
export function Canvas(props: CanvasProps) {
  return (
    <ReactFlowProvider>
      <CanvasInner {...props} />
    </ReactFlowProvider>
  )
}

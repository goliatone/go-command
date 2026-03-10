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

import { useMachineStore, useSimulationStore, useUIStore } from "../store/provider"
import { readGraphNodePositions, stableStateNodeID } from "../utils/graphLayout"
import { buildAutoLayoutPositions, type GraphLayoutDirection } from "../utils/layout"
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

interface EdgeData extends Record<string, unknown> {
  transitionIndex: number
}

interface SimulationNodeContext {
  currentStateName?: string
  projectedStateName?: string
}

function buildNodesAndEdges(
  states: Array<{ name: string; initial?: boolean; terminal?: boolean }> | undefined | null,
  transitions: Array<{ from: string; to?: string; event: string; dynamic_to?: { resolver?: string } }> | undefined | null,
  persistedPositions: Record<string, { x: number; y: number }>,
  simulationContext: SimulationNodeContext,
  layoutDirection: GraphLayoutDirection
): { nodes: Node[]; edges: Edge[] } {
  // Guard against undefined/null states or transitions
  const safeStates = Array.isArray(states) ? states : []
  const safeTransitions = Array.isArray(transitions) ? transitions : []

  if (safeStates.length === 0) {
    return { nodes: [], edges: [] }
  }

  // Count outgoing transitions per state
  const transitionCounts: Record<string, number> = {}
  safeTransitions.forEach((t) => {
    if (t.from) {
      transitionCounts[t.from] = (transitionCounts[t.from] || 0) + 1
    }
  })

  const nodeIDByStateName = new Map<string, string>()
  const autoLayoutPositions = buildAutoLayoutPositions({
    states: safeStates,
    transitions: safeTransitions,
    direction: layoutDirection
  })
  const nodes: Node[] = safeStates.map((state, stateIndex) => {
    const stateID = stableStateNodeID(stateIndex)
    if (!nodeIDByStateName.has(state.name)) {
      nodeIDByStateName.set(state.name, stateID)
    }

    const isCurrent = simulationContext.currentStateName === state.name
    const isProjected = simulationContext.projectedStateName === state.name
    const simulationRole = isCurrent && isProjected ? "current-projected" : isCurrent ? "current" : isProjected ? "projected" : undefined

    return {
      id: stateID,
      type: "stateNode",
      position: persistedPositions[stateID] ?? autoLayoutPositions[stateID] ?? { x: 0, y: 0 },
      data: {
        name: state.name,
        initial: state.initial,
        terminal: state.terminal,
        stateIndex,
        transitionCount: transitionCounts[state.name] || 0,
        simulationRole
      } satisfies StateNodeData
    }
  })

  const edges: Edge[] = []

  safeTransitions.forEach((transition, transitionIndex) => {
    const targetState = transition.to || transition.dynamic_to?.resolver
    const sourceNodeID = nodeIDByStateName.get(transition.from)
    const targetNodeID = targetState ? nodeIDByStateName.get(targetState) : undefined

    if (!sourceNodeID || !targetNodeID) {
      return
    }

    edges.push({
      id: `edge-${transitionIndex}`,
      source: sourceNodeID,
      target: targetNodeID,
      label: transition.event || "(event)",
      type: "custom",
      data: {
        transitionIndex
      } satisfies EdgeData
    })
  })

  return { nodes, edges }
}

function CanvasInner(props: CanvasProps) {
  const document = useMachineStore((state) => state.document)
  const definition = document.definition
  const selection = useMachineStore((state) => state.selection)
  const setSelection = useMachineStore((state) => state.setSelection)
  const addState = useMachineStore((state) => state.addState)
  const setGraphNodePosition = useMachineStore((state) => state.setGraphNodePosition)
  const setGraphNodePositions = useMachineStore((state) => state.setGraphNodePositions)
  const updateStateName = useMachineStore((state) => state.updateStateName)
  const updateStateFlag = useMachineStore((state) => state.updateStateFlag)
  const projectedOutcome = useSimulationStore((state) => state.projectedOutcome)
  const snapshotResult = useSimulationStore((state) => state.snapshotResult)
  const canvasZoom = useUIStore((state) => state.canvasZoom)
  const zoomCanvas = useUIStore((state) => state.zoomCanvas)
  const readOnly = Boolean(props.readOnly)
  const states = definition.states
  const transitions = definition.transitions

  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const reactFlowInstance = useReactFlow()
  const [isDragOver, setIsDragOver] = useState(false)
  const [layoutDirection, setLayoutDirection] = useState<GraphLayoutDirection>("TB")
  const simulationContext = useMemo<SimulationNodeContext>(() => {
    return {
      currentStateName: projectedOutcome?.previousState || snapshotResult?.currentState,
      projectedStateName: projectedOutcome?.currentState
    }
  }, [projectedOutcome, snapshotResult])
  const simulationModeActive = Boolean(projectedOutcome || snapshotResult)
  const persistedPositions = useMemo(() => readGraphNodePositions(document.ui_schema), [document.ui_schema])

  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => buildNodesAndEdges(states, transitions, persistedPositions, simulationContext, layoutDirection),
    [states, transitions, persistedPositions, simulationContext, layoutDirection]
  )

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  useEffect(() => {
    const { nodes: newNodes, edges: newEdges } = buildNodesAndEdges(
      states,
      transitions,
      persistedPositions,
      simulationContext,
      layoutDirection
    )
    setNodes(newNodes)
    setEdges(newEdges)
  }, [states, transitions, persistedPositions, simulationContext, layoutDirection, setNodes, setEdges])

  useEffect(() => {
    if (selection.kind === "state") {
      const selectedNodeID = stableStateNodeID(selection.stateIndex)
      setNodes((nds) =>
        nds.map((node) => ({
          ...node,
          selected: node.id === selectedNodeID
        }))
      )
      setEdges((eds) =>
        eds.map((edge) => ({
          ...edge,
          selected: false
        }))
      )
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
  }, [selection, setNodes, setEdges])

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

  const handleNodeDragStop = useCallback(
    (_event: unknown, node: Node) => {
      if (readOnly) {
        return
      }
      const nodeData = node.data as StateNodeData | undefined
      if (typeof nodeData?.stateIndex !== "number") {
        return
      }
      setGraphNodePosition(nodeData.stateIndex, node.position)
    },
    [readOnly, setGraphNodePosition]
  )

  const handleAutoLayout = useCallback(() => {
    if (readOnly || states.length === 0) {
      return
    }
    const positions = buildAutoLayoutPositions({
      states,
      transitions,
      direction: layoutDirection
    })
    setGraphNodePositions(positions)
  }, [layoutDirection, readOnly, setGraphNodePositions, states, transitions])

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

      const dropPosition = reactFlowInstance.screenToFlowPosition({
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
        setGraphNodePosition(newStateIndex, dropPosition)

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
    [
      readOnly,
      reactFlowInstance,
      addState,
      states.length,
      updateStateName,
      updateStateFlag,
      setSelection,
      setGraphNodePosition
    ]
  )

  return (
    <section
      className={`fub-panel fub-canvas${simulationModeActive ? " fub-canvas--simulation" : ""}`}
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
          <select
            aria-label="Auto layout direction"
            className="fub-input fub-canvas-layout-direction"
            value={layoutDirection}
            disabled={readOnly}
            onChange={(event) => {
              const value = event.target.value
              setLayoutDirection(value === "LR" ? "LR" : "TB")
            }}
          >
            <option value="TB">Top-Bottom</option>
            <option value="LR">Left-Right</option>
          </select>
          <button type="button" className="fub-mini-btn" onClick={handleAutoLayout} disabled={readOnly || states.length < 2}>
            Auto layout
          </button>
          {simulationModeActive ? <span className="fub-badge fub-badge-simulation">Simulation mode</span> : null}
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
            onNodeDragStop={handleNodeDragStop}
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

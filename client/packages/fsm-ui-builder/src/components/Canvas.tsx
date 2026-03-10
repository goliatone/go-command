import { useCallback, useEffect, useMemo } from "react"
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  type NodeTypes,
  MarkerType,
  BackgroundVariant
} from "@xyflow/react"
import dagre from "@dagrejs/dagre"

import { useMachineStore, useUIStore } from "../store/provider"
import { StateNode, type StateNodeData } from "./StateNode"

import "@xyflow/react/dist/style.css"

export interface CanvasProps {
  readOnly?: boolean
}

const nodeTypes: NodeTypes = {
  stateNode: StateNode
}

const NODE_WIDTH = 180
const NODE_HEIGHT = 60

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
  const nodes: Node[] = states.map((state, stateIndex) => ({
    id: state.name || `state-${stateIndex}`,
    type: "stateNode",
    position: { x: 0, y: 0 },
    data: {
      name: state.name,
      initial: state.initial,
      terminal: state.terminal,
      stateIndex
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
      type: "default",
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20
      },
      data: {
        transitionIndex
      } satisfies EdgeData,
      style: {
        strokeWidth: 2
      },
      labelStyle: {
        fontSize: 12,
        fontWeight: 500
      },
      labelBgStyle: {
        fill: "var(--fub-bg-2)",
        fillOpacity: 0.9
      },
      labelBgPadding: [6, 4] as [number, number],
      labelBgBorderRadius: 4
    })
  })

  return getLayoutedElements(nodes, edges)
}

export function Canvas(props: CanvasProps) {
  const definition = useMachineStore((state) => state.document.definition)
  const selection = useMachineStore((state) => state.selection)
  const setSelection = useMachineStore((state) => state.setSelection)
  const addState = useMachineStore((state) => state.addState)
  const canvasZoom = useUIStore((state) => state.canvasZoom)
  const zoomCanvas = useUIStore((state) => state.zoomCanvas)
  const readOnly = Boolean(props.readOnly)
  const states = definition.states
  const transitions = definition.transitions

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

      <div className="fub-panel-body fub-canvas-flow-container">
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
              Hint: press <kbd>N</kbd> to add a state.
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

import dagre from "@dagrejs/dagre"

import { stableStateNodeID, type GraphNodePosition } from "./graphLayout"

export type GraphLayoutDirection = "TB" | "LR"

const NODE_WIDTH = 200
const NODE_HEIGHT = 80

function defaultNodePosition(index: number): GraphNodePosition {
  const col = index % 3
  const row = Math.floor(index / 3)
  return {
    x: col * (NODE_WIDTH + 80) + 50,
    y: row * (NODE_HEIGHT + 80) + 50
  }
}

function resolveNodeIDByName(states: Array<{ name: string }>): Map<string, string> {
  const byName = new Map<string, string>()
  states.forEach((state, stateIndex) => {
    const name = state.name ?? ""
    if (!byName.has(name)) {
      byName.set(name, stableStateNodeID(stateIndex))
    }
  })
  return byName
}

export function buildAutoLayoutPositions(input: {
  states: Array<{ name: string }>
  transitions: Array<{ from: string; to?: string; dynamic_to?: { resolver?: string } }>
  direction?: GraphLayoutDirection
}): Record<string, GraphNodePosition> {
  const direction = input.direction ?? "TB"
  const states = Array.isArray(input.states) ? input.states : []
  const transitions = Array.isArray(input.transitions) ? input.transitions : []

  if (states.length === 0) {
    return {}
  }

  const positions: Record<string, GraphNodePosition> = {}

  try {
    const dagreGraph = new dagre.graphlib.Graph()
    dagreGraph.setDefaultEdgeLabel(() => ({}))
    dagreGraph.setGraph({
      rankdir: direction,
      nodesep: 80,
      ranksep: 100
    })

    states.forEach((_state, stateIndex) => {
      dagreGraph.setNode(stableStateNodeID(stateIndex), {
        width: NODE_WIDTH,
        height: NODE_HEIGHT
      })
    })

    const nodeIDByName = resolveNodeIDByName(states)
    transitions.forEach((transition) => {
      const sourceNodeID = nodeIDByName.get(transition.from)
      const targetName = transition.to || transition.dynamic_to?.resolver
      const targetNodeID = targetName ? nodeIDByName.get(targetName) : undefined
      if (!sourceNodeID || !targetNodeID) {
        return
      }
      dagreGraph.setEdge(sourceNodeID, targetNodeID)
    })

    dagre.layout(dagreGraph)

    states.forEach((_state, stateIndex) => {
      const nodeID = stableStateNodeID(stateIndex)
      const layoutNode = dagreGraph.node(nodeID)
      if (!layoutNode || typeof layoutNode.x !== "number" || typeof layoutNode.y !== "number") {
        positions[nodeID] = defaultNodePosition(stateIndex)
        return
      }
      positions[nodeID] = {
        x: layoutNode.x - NODE_WIDTH / 2,
        y: layoutNode.y - NODE_HEIGHT / 2
      }
    })
  } catch {
    states.forEach((_state, stateIndex) => {
      positions[stableStateNodeID(stateIndex)] = defaultNodePosition(stateIndex)
    })
  }

  return positions
}

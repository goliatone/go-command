import type { MachineUISchema } from "../contracts"

export interface GraphNodePosition {
  x: number
  y: number
}

export const GRAPH_LAYOUT_KEY_STRATEGY = "state-index-v1"
const GRAPH_LAYOUT_POSITIONS_KEY = "positions"
const GRAPH_LAYOUT_KEY_STRATEGY_FIELD = "key_strategy"

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value)
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value)
}

function toGraphNodePosition(value: unknown): GraphNodePosition | null {
  if (!isRecord(value)) {
    return null
  }
  if (!isFiniteNumber(value.x) || !isFiniteNumber(value.y)) {
    return null
  }
  return {
    x: value.x,
    y: value.y
  }
}

export function stableStateNodeID(stateIndex: number): string {
  return `state:${stateIndex}`
}

export function readGraphLayoutRecord(uiSchema: MachineUISchema | undefined | null): Record<string, unknown> {
  if (!uiSchema || !isRecord(uiSchema.graph_layout)) {
    return {}
  }
  return uiSchema.graph_layout
}

export function readGraphNodePositions(uiSchema: MachineUISchema | undefined | null): Record<string, GraphNodePosition> {
  const graphLayout = readGraphLayoutRecord(uiSchema)
  const rawPositions = graphLayout[GRAPH_LAYOUT_POSITIONS_KEY]
  if (!isRecord(rawPositions)) {
    return {}
  }

  const positions: Record<string, GraphNodePosition> = {}
  for (const [key, value] of Object.entries(rawPositions)) {
    const parsed = toGraphNodePosition(value)
    if (!parsed) {
      continue
    }
    positions[key] = parsed
  }
  return positions
}

export function withGraphNodePositions(
  uiSchema: MachineUISchema | undefined | null,
  positions: Record<string, GraphNodePosition>
): MachineUISchema {
  const base: MachineUISchema = isRecord(uiSchema) ? { ...uiSchema } : {}
  const graphLayout = { ...readGraphLayoutRecord(uiSchema) }
  graphLayout[GRAPH_LAYOUT_KEY_STRATEGY_FIELD] = GRAPH_LAYOUT_KEY_STRATEGY
  graphLayout[GRAPH_LAYOUT_POSITIONS_KEY] = positions
  base.graph_layout = graphLayout
  return base
}

export function reindexGraphNodePositionsAfterStateRemoval(
  positions: Record<string, GraphNodePosition>,
  removedIndex: number
): Record<string, GraphNodePosition> {
  const reindexed: Record<string, GraphNodePosition> = {}

  for (const [key, value] of Object.entries(positions)) {
    if (!key.startsWith("state:")) {
      reindexed[key] = value
      continue
    }
    const rawIndex = Number.parseInt(key.slice("state:".length), 10)
    if (Number.isNaN(rawIndex)) {
      reindexed[key] = value
      continue
    }
    if (rawIndex === removedIndex) {
      continue
    }
    if (rawIndex > removedIndex) {
      reindexed[stableStateNodeID(rawIndex - 1)] = value
      continue
    }
    reindexed[key] = value
  }

  return reindexed
}

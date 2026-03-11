import { memo, useCallback, useRef, useState, type CSSProperties, type MutableRefObject } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"

import type { TransitionDefinition } from "../contracts"
import { transitionLabel, type Selection } from "../document"
import { useMachineStore } from "../store/provider"
import { NodePalette } from "./NodePalette"

const EXPLORER_VIRTUALIZATION_THRESHOLD = 80
const EXPLORER_ROW_HEIGHT = 52
const EXPLORER_OVERSCAN = 8
const EXPLORER_FALLBACK_VISIBLE_ROWS = 12

type ExplorerRowKind = "state" | "transition"

const explorerRenderCounts: Record<ExplorerRowKind, Map<number, number>> = {
  state: new Map(),
  transition: new Map()
}

function trackExplorerRowRender(kind: ExplorerRowKind, index: number): void {
  const map = explorerRenderCounts[kind]
  map.set(index, (map.get(index) ?? 0) + 1)
}

export function __resetExplorerRenderCounts(): void {
  for (const map of Object.values(explorerRenderCounts)) {
    map.clear()
  }
}

export function __getExplorerRenderCount(kind: ExplorerRowKind, index: number): number {
  return explorerRenderCounts[kind].get(index) ?? 0
}

function selectedClass(selected: boolean): string {
  return selected ? " is-selected" : ""
}

type ExplorerView = "palette" | "tree"

function isStateSelected(selection: Selection, stateIndex: number): boolean {
  return selection.kind === "state" && selection.stateIndex === stateIndex
}

function isTransitionSelected(selection: Selection, transitionIndex: number): boolean {
  if (selection.kind === "transition") {
    return selection.transitionIndex === transitionIndex
  }
  if (selection.kind === "workflow-node") {
    return selection.transitionIndex === transitionIndex
  }
  return false
}

interface StateListRowProps {
  stateIndex: number
  state: {
    name: string
    initial?: boolean
    terminal?: boolean
  }
  selected: boolean
  dropTarget: boolean
  setButtonRef: (index: number, element: HTMLButtonElement | null) => void
  onSelect: (stateIndex: number) => void
  onNavigate: (stateIndex: number, key: string) => void
}

const StateListRow = memo(function StateListRow(props: StateListRowProps) {
  trackExplorerRowRender("state", props.stateIndex)

  return (
    <button
      type="button"
      ref={(element) => props.setButtonRef(props.stateIndex, element)}
      className={`fub-list-item${selectedClass(props.selected)}${props.dropTarget ? " fub-list-item--drop-target" : ""}`}
      onClick={() => props.onSelect(props.stateIndex)}
      onKeyDown={(event) => {
        if (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "Home" || event.key === "End") {
          event.preventDefault()
        }
        props.onNavigate(props.stateIndex, event.key)
      }}
      aria-label={props.state.name || "(unnamed)"}
    >
      <span className="fub-item-main">{props.state.name || "(unnamed)"}</span>
      <span className="fub-item-meta">
        {props.state.initial ? "initial" : ""}
        {props.state.terminal ? " final" : ""}
      </span>
    </button>
  )
})

interface TransitionListRowProps {
  transitionIndex: number
  transition: TransitionDefinition
  selected: boolean
  dropTarget: boolean
  setButtonRef: (index: number, element: HTMLButtonElement | null) => void
  onSelect: (transitionIndex: number) => void
  onNavigate: (transitionIndex: number, key: string) => void
}

const TransitionListRow = memo(function TransitionListRow(props: TransitionListRowProps) {
  trackExplorerRowRender("transition", props.transitionIndex)

  return (
    <button
      type="button"
      ref={(element) => props.setButtonRef(props.transitionIndex, element)}
      className={`fub-list-item${selectedClass(props.selected)}${props.dropTarget ? " fub-list-item--drop-target" : ""}`}
      onClick={() => props.onSelect(props.transitionIndex)}
      onKeyDown={(event) => {
        if (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "Home" || event.key === "End") {
          event.preventDefault()
        }
        props.onNavigate(props.transitionIndex, event.key)
      }}
      aria-label={transitionLabel(props.transition)}
    >
      <span className="fub-item-main">{props.transition.id || `transition-${props.transitionIndex + 1}`}</span>
      <span className="fub-item-meta">{transitionLabel(props.transition)}</span>
    </button>
  )
})

export interface ExplorerProps {
  readOnly?: boolean
}

function PaletteIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}

function TreeIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 6h18" />
      <path d="M3 12h18" />
      <path d="M3 18h18" />
    </svg>
  )
}

function focusButtonRef(buttonRefMap: MutableRefObject<Map<number, HTMLButtonElement>>, index: number): void {
  const focus = () => {
    buttonRefMap.current.get(index)?.focus()
  }
  if (typeof window.requestAnimationFrame === "function") {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(focus)
    })
    return
  }
  window.setTimeout(focus, 0)
}

export function Explorer(props: ExplorerProps) {
  const [activeView, setActiveView] = useState<ExplorerView>("tree")
  const [dragStateIndex, setDragStateIndex] = useState<number | null>(null)
  const [dropStateIndex, setDropStateIndex] = useState<number | null>(null)
  const [dragTransitionIndex, setDragTransitionIndex] = useState<number | null>(null)
  const [dropTransitionIndex, setDropTransitionIndex] = useState<number | null>(null)

  const states = useMachineStore((state) => state.document.definition.states)
  const transitions = useMachineStore((state) => state.document.definition.transitions)
  const selection = useMachineStore((state) => state.selection)

  const setSelection = useMachineStore((state) => state.setSelection)
  const addState = useMachineStore((state) => state.addState)
  const addTransition = useMachineStore((state) => state.addTransition)
  const moveState = useMachineStore((state) => state.moveState)
  const moveTransition = useMachineStore((state) => state.moveTransition)

  const readOnly = Boolean(props.readOnly)

  const stateButtonRefs = useRef(new Map<number, HTMLButtonElement>())
  const transitionButtonRefs = useRef(new Map<number, HTMLButtonElement>())

  const stateScrollRef = useRef<HTMLDivElement | null>(null)
  const transitionScrollRef = useRef<HTMLDivElement | null>(null)

  const stateVirtualized = states.length >= EXPLORER_VIRTUALIZATION_THRESHOLD
  const transitionVirtualized = transitions.length >= EXPLORER_VIRTUALIZATION_THRESHOLD

  const stateVirtualizer = useVirtualizer({
    count: states.length,
    getScrollElement: () => stateScrollRef.current,
    estimateSize: () => EXPLORER_ROW_HEIGHT,
    overscan: EXPLORER_OVERSCAN,
    initialRect: { width: 320, height: 320 },
    getItemKey: (index) => `state-${index}`
  })

  const transitionVirtualizer = useVirtualizer({
    count: transitions.length,
    getScrollElement: () => transitionScrollRef.current,
    estimateSize: () => EXPLORER_ROW_HEIGHT,
    overscan: EXPLORER_OVERSCAN,
    initialRect: { width: 320, height: 320 },
    getItemKey: (index) => `transition-${index}`
  })

  const handleViewChange = useCallback((view: ExplorerView) => {
    setActiveView(view)
  }, [])

  const selectState = useCallback(
    (stateIndex: number) => {
      setSelection({ kind: "state", stateIndex })
    },
    [setSelection]
  )

  const selectTransition = useCallback(
    (transitionIndex: number) => {
      setSelection({ kind: "transition", transitionIndex })
    },
    [setSelection]
  )

  const registerStateButtonRef = useCallback((index: number, element: HTMLButtonElement | null) => {
    if (element) {
      stateButtonRefs.current.set(index, element)
      return
    }
    stateButtonRefs.current.delete(index)
  }, [])

  const registerTransitionButtonRef = useCallback((index: number, element: HTMLButtonElement | null) => {
    if (element) {
      transitionButtonRefs.current.set(index, element)
      return
    }
    transitionButtonRefs.current.delete(index)
  }, [])

  const focusStateIndex = useCallback(
    (nextIndex: number) => {
      if (nextIndex < 0 || nextIndex >= states.length) {
        return
      }
      setSelection({ kind: "state", stateIndex: nextIndex })
      if (stateVirtualized) {
        stateVirtualizer.scrollToIndex(nextIndex, { align: "auto" })
      }
      focusButtonRef(stateButtonRefs, nextIndex)
    },
    [setSelection, stateVirtualized, stateVirtualizer, states.length]
  )

  const focusTransitionIndex = useCallback(
    (nextIndex: number) => {
      if (nextIndex < 0 || nextIndex >= transitions.length) {
        return
      }
      setSelection({ kind: "transition", transitionIndex: nextIndex })
      if (transitionVirtualized) {
        transitionVirtualizer.scrollToIndex(nextIndex, { align: "auto" })
      }
      focusButtonRef(transitionButtonRefs, nextIndex)
    },
    [setSelection, transitionVirtualized, transitionVirtualizer, transitions.length]
  )

  const onStateRowNavigate = useCallback(
    (stateIndex: number, key: string) => {
      if (key === "ArrowDown") {
        focusStateIndex(Math.min(states.length - 1, stateIndex + 1))
        return
      }
      if (key === "ArrowUp") {
        focusStateIndex(Math.max(0, stateIndex - 1))
        return
      }
      if (key === "Home") {
        focusStateIndex(0)
        return
      }
      if (key === "End") {
        focusStateIndex(Math.max(0, states.length - 1))
      }
    },
    [focusStateIndex, states.length]
  )

  const onTransitionRowNavigate = useCallback(
    (transitionIndex: number, key: string) => {
      if (key === "ArrowDown") {
        focusTransitionIndex(Math.min(transitions.length - 1, transitionIndex + 1))
        return
      }
      if (key === "ArrowUp") {
        focusTransitionIndex(Math.max(0, transitionIndex - 1))
        return
      }
      if (key === "Home") {
        focusTransitionIndex(0)
        return
      }
      if (key === "End") {
        focusTransitionIndex(Math.max(0, transitions.length - 1))
      }
    },
    [focusTransitionIndex, transitions.length]
  )

  const handleStateDrop = useCallback(
    (targetIndex: number) => {
      if (dragStateIndex === null || dragStateIndex === targetIndex) {
        setDragStateIndex(null)
        setDropStateIndex(null)
        return
      }
      moveState(dragStateIndex, targetIndex)
      setDragStateIndex(null)
      setDropStateIndex(null)
    },
    [dragStateIndex, moveState]
  )

  const handleTransitionDrop = useCallback(
    (targetIndex: number) => {
      if (dragTransitionIndex === null || dragTransitionIndex === targetIndex) {
        setDragTransitionIndex(null)
        setDropTransitionIndex(null)
        return
      }
      moveTransition(dragTransitionIndex, targetIndex)
      setDragTransitionIndex(null)
      setDropTransitionIndex(null)
    },
    [dragTransitionIndex, moveTransition]
  )

  const stateVirtualRows = stateVirtualizer.getVirtualItems()
  const transitionVirtualRows = transitionVirtualizer.getVirtualItems()
  const stateRowsToRender = stateVirtualized
    ? stateVirtualRows.length > 0
      ? stateVirtualRows
      : Array.from({ length: Math.min(EXPLORER_FALLBACK_VISIBLE_ROWS, states.length) }, (_, index) => ({
          index,
          start: index * EXPLORER_ROW_HEIGHT,
          key: `state-fallback-${index}`
        }))
    : []
  const transitionRowsToRender = transitionVirtualized
    ? transitionVirtualRows.length > 0
      ? transitionVirtualRows
      : Array.from({ length: Math.min(EXPLORER_FALLBACK_VISIBLE_ROWS, transitions.length) }, (_, index) => ({
          index,
          start: index * EXPLORER_ROW_HEIGHT,
          key: `transition-fallback-${index}`
        }))
    : []

  const renderStateRow = useCallback(
    (stateIndex: number, style?: CSSProperties) => (
      <li
        key={`state-${stateIndex}`}
        style={style}
        draggable={!readOnly}
        onDragStart={() => {
          if (readOnly) {
            return
          }
          setDragStateIndex(stateIndex)
        }}
        onDragOver={(event) => {
          if (readOnly || dragStateIndex === null) {
            return
          }
          event.preventDefault()
          setDropStateIndex(stateIndex)
        }}
        onDragLeave={() => {
          if (dropStateIndex === stateIndex) {
            setDropStateIndex(null)
          }
        }}
        onDrop={(event) => {
          if (readOnly) {
            return
          }
          event.preventDefault()
          handleStateDrop(stateIndex)
        }}
        onDragEnd={() => {
          setDragStateIndex(null)
          setDropStateIndex(null)
        }}
      >
        <StateListRow
          stateIndex={stateIndex}
          state={states[stateIndex] ?? { name: "" }}
          selected={isStateSelected(selection, stateIndex)}
          dropTarget={dropStateIndex === stateIndex}
          setButtonRef={registerStateButtonRef}
          onSelect={selectState}
          onNavigate={onStateRowNavigate}
        />
      </li>
    ),
    [
      dragStateIndex,
      dropStateIndex,
      handleStateDrop,
      onStateRowNavigate,
      readOnly,
      registerStateButtonRef,
      selectState,
      selection,
      states
    ]
  )

  const renderTransitionRow = useCallback(
    (transitionIndex: number, style?: CSSProperties) => {
      const transition = transitions[transitionIndex]
      if (!transition) {
        return null
      }
      return (
        <li
          key={`transition-${transitionIndex}`}
          style={style}
          draggable={!readOnly}
          onDragStart={() => {
            if (readOnly) {
              return
            }
            setDragTransitionIndex(transitionIndex)
          }}
          onDragOver={(event) => {
            if (readOnly || dragTransitionIndex === null) {
              return
            }
            event.preventDefault()
            setDropTransitionIndex(transitionIndex)
          }}
          onDragLeave={() => {
            if (dropTransitionIndex === transitionIndex) {
              setDropTransitionIndex(null)
            }
          }}
          onDrop={(event) => {
            if (readOnly) {
              return
            }
            event.preventDefault()
            handleTransitionDrop(transitionIndex)
          }}
          onDragEnd={() => {
            setDragTransitionIndex(null)
            setDropTransitionIndex(null)
          }}
        >
          <TransitionListRow
            transitionIndex={transitionIndex}
            transition={transition}
            selected={isTransitionSelected(selection, transitionIndex)}
            dropTarget={dropTransitionIndex === transitionIndex}
            setButtonRef={registerTransitionButtonRef}
            onSelect={selectTransition}
            onNavigate={onTransitionRowNavigate}
          />
        </li>
      )
    },
    [
      dragTransitionIndex,
      dropTransitionIndex,
      handleTransitionDrop,
      onTransitionRowNavigate,
      readOnly,
      registerTransitionButtonRef,
      selectTransition,
      selection,
      transitions
    ]
  )

  return (
    <section
      className="fub-panel fub-explorer"
      aria-label="Explorer panel"
      role="region"
      aria-labelledby="fub-panel-explorer-heading"
      id="fub-panel-explorer"
      tabIndex={-1}
    >
      <div className="fub-panel-header" id="fub-panel-explorer-heading">
        <strong>Explorer</strong>
        <div className="fub-inline-actions">
          <div className="fub-view-toggle" role="tablist" aria-label="Explorer view">
            <button
              type="button"
              role="tab"
              className={`fub-view-toggle-btn${activeView === "palette" ? " is-active" : ""}`}
              onClick={() => handleViewChange("palette")}
              aria-selected={activeView === "palette"}
              aria-controls="fub-explorer-palette"
              title="Node Palette"
            >
              <PaletteIcon />
            </button>
            <button
              type="button"
              role="tab"
              className={`fub-view-toggle-btn${activeView === "tree" ? " is-active" : ""}`}
              onClick={() => handleViewChange("tree")}
              aria-selected={activeView === "tree"}
              aria-controls="fub-explorer-tree"
              title="Tree View"
            >
              <TreeIcon />
            </button>
          </div>
        </div>
      </div>

      <div className="fub-panel-body">
        {activeView === "palette" ? (
          <div id="fub-explorer-palette">
            <NodePalette readOnly={readOnly} />
          </div>
        ) : (
          <div id="fub-explorer-tree">
            <div className="fub-tree-actions">
              <button type="button" className="fub-mini-btn" onClick={addState} disabled={readOnly}>
                + State
              </button>
              <button type="button" className="fub-mini-btn" onClick={addTransition} disabled={readOnly}>
                + Transition
              </button>
            </div>

            <section className="fub-section">
              <h3>States</h3>
              <div
                className="fub-explorer-list-scroll"
                ref={stateScrollRef}
                aria-label="States list"
                data-virtualized={stateVirtualized ? "true" : "false"}
                data-testid="fub-explorer-states-scroll"
              >
                <ul
                  className="fub-explorer-list"
                  style={
                    stateVirtualized
                      ? {
                          height: `${stateVirtualizer.getTotalSize()}px`,
                          position: "relative"
                        }
                      : undefined
                  }
                >
                  {stateVirtualized
                    ? stateRowsToRender.map((virtualRow) =>
                        renderStateRow(virtualRow.index, {
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          transform: `translateY(${virtualRow.start}px)`
                        })
                      )
                    : states.map((_state, stateIndex) => renderStateRow(stateIndex))}
                </ul>
              </div>
            </section>

            <section className="fub-section">
              <h3>Transitions</h3>
              <div
                className="fub-explorer-list-scroll"
                ref={transitionScrollRef}
                aria-label="Transitions list"
                data-virtualized={transitionVirtualized ? "true" : "false"}
                data-testid="fub-explorer-transitions-scroll"
              >
                <ul
                  className="fub-explorer-list"
                  style={
                    transitionVirtualized
                      ? {
                          height: `${transitionVirtualizer.getTotalSize()}px`,
                          position: "relative"
                        }
                      : undefined
                  }
                >
                  {transitionVirtualized
                    ? transitionRowsToRender.map((virtualRow) =>
                        renderTransitionRow(virtualRow.index, {
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          transform: `translateY(${virtualRow.start}px)`
                        })
                      )
                    : transitions.map((_transition, transitionIndex) => renderTransitionRow(transitionIndex))}
                </ul>
              </div>
            </section>
          </div>
        )}
      </div>
    </section>
  )
}

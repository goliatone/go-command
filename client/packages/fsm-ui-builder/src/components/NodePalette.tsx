import { useState, useMemo, useCallback, type DragEvent } from "react"

export interface NodePaletteItem {
  id: string
  type: "state" | "action" | "logic"
  nodeKind: string
  label: string
  description: string
  icon: React.ReactNode
  defaults?: {
    initial?: boolean
    terminal?: boolean
  }
}

// SVG Icons for palette items
function PlayIcon() {
  return (
    <svg
      width="20"
      height="20"
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
      width="20"
      height="20"
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
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="6" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function EventIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  )
}

function ApiIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}

function DelayIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function ConditionIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 3h5v5" />
      <path d="M8 3H3v5" />
      <path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3" />
      <path d="m15 9 6-6" />
    </svg>
  )
}

function SearchIcon() {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

// Define available palette items
const PALETTE_ITEMS: NodePaletteItem[] = [
  // States
  {
    id: "initial-state",
    type: "state",
    nodeKind: "stateNode",
    label: "Start",
    description: "Initial state - entry point of the machine",
    icon: <PlayIcon />,
    defaults: { initial: true }
  },
  {
    id: "regular-state",
    type: "state",
    nodeKind: "stateNode",
    label: "State",
    description: "Regular state - intermediate step",
    icon: <CircleIcon />
  },
  {
    id: "terminal-state",
    type: "state",
    nodeKind: "stateNode",
    label: "End",
    description: "Terminal state - final state of the machine",
    icon: <StopIcon />,
    defaults: { terminal: true }
  },
  // Actions (for workflow nodes)
  {
    id: "email-action",
    type: "action",
    nodeKind: "step",
    label: "Email",
    description: "Send an email notification",
    icon: <EmailIcon />
  },
  {
    id: "event-action",
    type: "action",
    nodeKind: "step",
    label: "Event",
    description: "Emit or handle an event",
    icon: <EventIcon />
  },
  {
    id: "api-action",
    type: "action",
    nodeKind: "step",
    label: "API",
    description: "Make an API call",
    icon: <ApiIcon />
  },
  // Logic
  {
    id: "delay-logic",
    type: "logic",
    nodeKind: "step",
    label: "Delay",
    description: "Wait for a specified duration",
    icon: <DelayIcon />
  },
  {
    id: "condition-logic",
    type: "logic",
    nodeKind: "when",
    label: "If/Else",
    description: "Conditional branching logic",
    icon: <ConditionIcon />
  }
]

const CATEGORY_LABELS: Record<string, string> = {
  state: "States",
  action: "Actions",
  logic: "Logic"
}

export interface NodePaletteProps {
  readOnly?: boolean
  onDragStart?: (item: NodePaletteItem) => void
}

function PaletteItem({
  item,
  readOnly,
  onDragStart
}: {
  item: NodePaletteItem
  readOnly?: boolean
  onDragStart?: (item: NodePaletteItem) => void
}) {
  const [isDragging, setIsDragging] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  const handleDragStart = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      if (readOnly) {
        event.preventDefault()
        return
      }

      // Set the drag data
      const dragData = JSON.stringify({
        id: item.id,
        type: item.type,
        nodeKind: item.nodeKind,
        label: item.label,
        defaults: item.defaults
      })
      event.dataTransfer.setData("application/reactflow", dragData)
      event.dataTransfer.setData("text/plain", item.label)
      event.dataTransfer.effectAllowed = "move"

      setIsDragging(true)
      onDragStart?.(item)
    },
    [item, readOnly, onDragStart]
  )

  const handleDragEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  const getTypeClass = (): string => {
    if (item.defaults?.initial) return "fub-palette-item--initial"
    if (item.defaults?.terminal) return "fub-palette-item--terminal"
    if (item.type === "state") return "fub-palette-item--state"
    if (item.type === "action") return "fub-palette-item--action"
    if (item.type === "logic") return "fub-palette-item--logic"
    return ""
  }

  return (
    <div
      className={`fub-palette-item ${getTypeClass()}${isDragging ? " fub-palette-item--dragging" : ""}${readOnly ? " fub-palette-item--disabled" : ""}`}
      draggable={!readOnly}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
      tabIndex={readOnly ? -1 : 0}
      role="button"
      aria-label={`Drag to add ${item.label}`}
      aria-disabled={readOnly}
    >
      <div className="fub-palette-item-icon">{item.icon}</div>
      <span className="fub-palette-item-label">{item.label}</span>
      {showTooltip && (
        <div className="fub-palette-tooltip" role="tooltip">
          {item.description}
        </div>
      )}
    </div>
  )
}

export function NodePalette(props: NodePaletteProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set())
  const readOnly = Boolean(props.readOnly)

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return PALETTE_ITEMS
    }
    const query = searchQuery.toLowerCase()
    return PALETTE_ITEMS.filter(
      (item) =>
        item.label.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    )
  }, [searchQuery])

  // Group items by category
  const groupedItems = useMemo(() => {
    const groups: Record<string, NodePaletteItem[]> = {}
    for (const item of filteredItems) {
      if (!groups[item.type]) {
        groups[item.type] = []
      }
      groups[item.type].push(item)
    }
    return groups
  }, [filteredItems])

  const toggleCategory = useCallback((category: string) => {
    setCollapsedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(category)) {
        next.delete(category)
      } else {
        next.add(category)
      }
      return next
    })
  }, [])

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }, [])

  const handleSearchClear = useCallback(() => {
    setSearchQuery("")
  }, [])

  const categories = Object.keys(groupedItems)

  return (
    <section
      className="fub-palette"
      aria-label="Node palette"
      role="region"
    >
      {/* Search input */}
      <div className="fub-palette-search">
        <div className="fub-palette-search-icon">
          <SearchIcon />
        </div>
        <input
          type="text"
          className="fub-palette-search-input"
          placeholder="Search nodes..."
          value={searchQuery}
          onChange={handleSearchChange}
          aria-label="Search nodes"
          disabled={readOnly}
        />
        {searchQuery && (
          <button
            type="button"
            className="fub-palette-search-clear"
            onClick={handleSearchClear}
            aria-label="Clear search"
          >
            &times;
          </button>
        )}
      </div>

      {/* Palette categories */}
      <div className="fub-palette-categories">
        {categories.length === 0 && (
          <div className="fub-palette-empty">
            <p>No nodes match your search.</p>
          </div>
        )}

        {categories.map((category) => {
          const items = groupedItems[category]
          const isCollapsed = collapsedCategories.has(category)
          const categoryLabel = CATEGORY_LABELS[category] || category

          return (
            <div key={category} className="fub-palette-category">
              <button
                type="button"
                className="fub-palette-category-header"
                onClick={() => toggleCategory(category)}
                aria-expanded={!isCollapsed}
                aria-controls={`fub-palette-category-${category}`}
              >
                <span className={`fub-palette-chevron${isCollapsed ? " fub-palette-chevron--collapsed" : ""}`}>
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
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
                <span className="fub-palette-category-label">{categoryLabel}</span>
                <span className="fub-palette-category-count">{items.length}</span>
              </button>

              {!isCollapsed && (
                <div
                  id={`fub-palette-category-${category}`}
                  className="fub-palette-items"
                  role="group"
                  aria-label={categoryLabel}
                >
                  {items.map((item) => (
                    <PaletteItem
                      key={item.id}
                      item={item}
                      readOnly={readOnly}
                      onDragStart={props.onDragStart}
                    />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Help text */}
      {!readOnly && (
        <div className="fub-palette-help">
          <p>Drag items onto the canvas to add them.</p>
        </div>
      )}
    </section>
  )
}

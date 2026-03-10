import { useMemo, useState, type KeyboardEvent } from "react"

import type { ActionCatalogItem } from "../adapters/actionCatalog"

export interface ActionCatalogDropdownProps {
  inputID?: string
  value: string
  actions: ActionCatalogItem[]
  loading?: boolean
  unavailableReason?: string | null
  readOnly?: boolean
  onChange(value: string): void
}

interface NormalizedAction {
  id: string
  label: string
  description: string
  tags: string[]
  searchText: string
}

function normalizeAction(item: ActionCatalogItem): NormalizedAction {
  const label = item.label?.trim() || item.id
  const description = item.description?.trim() || ""
  const tags = Array.isArray(item.metadata?.tags)
    ? item.metadata.tags.filter((tag): tag is string => typeof tag === "string" && tag.trim() !== "")
    : []
  return {
    id: item.id,
    label,
    description,
    tags,
    searchText: `${item.id} ${label} ${description} ${tags.join(" ")}`.toLowerCase()
  }
}

function hasSearchQuery(value: string): boolean {
  return value.trim() !== ""
}

export function ActionCatalogDropdown(props: ActionCatalogDropdownProps) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const readOnly = Boolean(props.readOnly)

  const normalizedActions = useMemo(() => props.actions.map(normalizeAction), [props.actions])
  const normalizedQuery = props.value.trim().toLowerCase()
  const filteredActions = useMemo(() => {
    if (!hasSearchQuery(normalizedQuery)) {
      return normalizedActions
    }
    return normalizedActions.filter((item) => item.searchText.includes(normalizedQuery))
  }, [normalizedActions, normalizedQuery])

  const listboxID = props.inputID ? `${props.inputID}-listbox` : "fub-action-catalog-listbox"
  const activeAction = filteredActions[activeIndex]
  const activeDescendantID = activeAction ? `${listboxID}-${activeAction.id}` : undefined

  const commitSelection = (actionID: string) => {
    props.onChange(actionID)
    setOpen(false)
    setActiveIndex(0)
  }

  const openList = () => {
    if (readOnly || props.loading || filteredActions.length === 0) {
      return
    }
    setOpen(true)
  }

  const closeList = () => {
    setOpen(false)
    setActiveIndex(0)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (readOnly) {
      return
    }

    if (event.key === "ArrowDown") {
      event.preventDefault()
      if (!open) {
        openList()
        return
      }
      if (filteredActions.length === 0) {
        return
      }
      setActiveIndex((index) => (index + 1) % filteredActions.length)
      return
    }

    if (event.key === "ArrowUp") {
      event.preventDefault()
      if (!open) {
        openList()
        return
      }
      if (filteredActions.length === 0) {
        return
      }
      setActiveIndex((index) => (index - 1 + filteredActions.length) % filteredActions.length)
      return
    }

    if (event.key === "Enter" && open && activeAction) {
      event.preventDefault()
      commitSelection(activeAction.id)
      return
    }

    if (event.key === "Escape") {
      closeList()
    }
  }

  const helperText = props.loading
    ? "Loading action catalog..."
    : props.unavailableReason || (open && hasSearchQuery(props.value) && filteredActions.length === 0 ? "No matching actions." : null)

  return (
    <div className="fub-action-catalog">
      <input
        id={props.inputID}
        role="combobox"
        aria-label="Workflow action id"
        aria-expanded={open}
        aria-controls={listboxID}
        aria-autocomplete="list"
        aria-activedescendant={open ? activeDescendantID : undefined}
        className="fub-input"
        value={props.value}
        readOnly={readOnly}
        onChange={(event) => {
          props.onChange(event.target.value)
          setActiveIndex(0)
          openList()
        }}
        onFocus={openList}
        onBlur={() => {
          window.setTimeout(() => {
            closeList()
          }, 0)
        }}
        onKeyDown={handleKeyDown}
      />
      {open ? (
        <ul id={listboxID} role="listbox" className="fub-action-catalog-listbox">
          {filteredActions.map((action, index) => (
            <li key={action.id} role="presentation">
              <button
                type="button"
                role="option"
                id={`${listboxID}-${action.id}`}
                aria-selected={index === activeIndex}
                className={`fub-action-catalog-option${index === activeIndex ? " is-active" : ""}`}
                onMouseDown={(event) => {
                  event.preventDefault()
                }}
                onClick={() => commitSelection(action.id)}
              >
                <span className="fub-action-catalog-option-title">
                  <code>{action.id}</code>
                  {action.label !== action.id ? <span>{action.label}</span> : null}
                </span>
                {action.description ? <span className="fub-muted">{action.description}</span> : null}
                {action.tags.length > 0 ? (
                  <span className="fub-action-catalog-option-tags">{action.tags.join(", ")}</span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {helperText ? (
        <p className="fub-muted" role={props.loading ? "status" : undefined}>
          {helperText}
        </p>
      ) : null}
    </div>
  )
}

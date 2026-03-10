import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"

export interface DropdownMenuItem {
  label: string
  onClick: () => void
  disabled?: boolean
  icon?: ReactNode
}

export interface DropdownMenuProps {
  trigger: ReactNode
  items: DropdownMenuItem[]
  align?: "left" | "right"
  disabled?: boolean
}

export function DropdownMenu(props: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [focusedIndex, setFocusedIndex] = useState(-1)

  const closeMenu = useCallback(() => {
    setIsOpen(false)
    setFocusedIndex(-1)
  }, [])

  const openMenu = useCallback(() => {
    if (props.disabled) {
      return
    }
    setIsOpen(true)
    setFocusedIndex(0)
  }, [props.disabled])

  const toggleMenu = useCallback(() => {
    if (isOpen) {
      closeMenu()
    } else {
      openMenu()
    }
  }, [closeMenu, isOpen, openMenu])

  // Handle click outside
  useEffect(() => {
    if (!isOpen) {
      return
    }

    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        closeMenu()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [closeMenu, isOpen])

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (!isOpen) {
        if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
          event.preventDefault()
          openMenu()
        }
        return
      }

      const enabledItems = props.items.filter((item) => !item.disabled)
      const enabledIndices = props.items
        .map((item, index) => ({ item, index }))
        .filter(({ item }) => !item.disabled)
        .map(({ index }) => index)

      switch (event.key) {
        case "Escape":
          event.preventDefault()
          closeMenu()
          triggerRef.current?.focus()
          break
        case "ArrowDown":
          event.preventDefault()
          if (enabledItems.length > 0) {
            const currentEnabledIndex = enabledIndices.indexOf(focusedIndex)
            const nextIndex = (currentEnabledIndex + 1) % enabledIndices.length
            setFocusedIndex(enabledIndices[nextIndex])
          }
          break
        case "ArrowUp":
          event.preventDefault()
          if (enabledItems.length > 0) {
            const currentEnabledIndex = enabledIndices.indexOf(focusedIndex)
            const prevIndex =
              currentEnabledIndex <= 0
                ? enabledIndices.length - 1
                : currentEnabledIndex - 1
            setFocusedIndex(enabledIndices[prevIndex])
          }
          break
        case "Enter":
        case " ":
          event.preventDefault()
          if (focusedIndex >= 0 && !props.items[focusedIndex]?.disabled) {
            props.items[focusedIndex]?.onClick()
            closeMenu()
            triggerRef.current?.focus()
          }
          break
        case "Tab":
          closeMenu()
          break
        case "Home":
          event.preventDefault()
          if (enabledIndices.length > 0) {
            setFocusedIndex(enabledIndices[0])
          }
          break
        case "End":
          event.preventDefault()
          if (enabledIndices.length > 0) {
            setFocusedIndex(enabledIndices[enabledIndices.length - 1])
          }
          break
      }
    },
    [closeMenu, focusedIndex, isOpen, openMenu, props.items]
  )

  const handleItemClick = useCallback(
    (item: DropdownMenuItem) => {
      if (item.disabled) {
        return
      }
      item.onClick()
      closeMenu()
      triggerRef.current?.focus()
    },
    [closeMenu]
  )

  return (
    <div className="fub-dropdown" ref={containerRef}>
      <button
        ref={triggerRef}
        type="button"
        className="fub-dropdown-trigger"
        onClick={toggleMenu}
        onKeyDown={handleKeyDown}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        disabled={props.disabled}
      >
        {props.trigger}
      </button>
      {isOpen && (
        <div
          ref={menuRef}
          className={`fub-dropdown-menu ${props.align === "right" ? "fub-dropdown-menu--right" : ""}`}
          role="menu"
          aria-orientation="vertical"
          onKeyDown={handleKeyDown}
        >
          {props.items.map((item, index) => (
            <button
              key={index}
              type="button"
              className={`fub-dropdown-item ${focusedIndex === index ? "fub-dropdown-item--focused" : ""} ${item.disabled ? "fub-dropdown-item--disabled" : ""}`}
              role="menuitem"
              tabIndex={focusedIndex === index ? 0 : -1}
              disabled={item.disabled}
              onClick={() => handleItemClick(item)}
              onMouseEnter={() => !item.disabled && setFocusedIndex(index)}
            >
              {item.icon && <span className="fub-dropdown-item-icon">{item.icon}</span>}
              <span className="fub-dropdown-item-label">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// Chevron down icon component
export function ChevronDownIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 4.5L6 7.5L9 4.5" />
    </svg>
  )
}

// Icon button component for header
export interface IconButtonProps {
  icon: ReactNode
  onClick: () => void
  disabled?: boolean
  title?: string
  ariaLabel: string
  className?: string
}

export function IconButton(props: IconButtonProps) {
  return (
    <button
      type="button"
      className={`fub-icon-btn ${props.className ?? ""}`}
      onClick={props.onClick}
      disabled={props.disabled}
      title={props.title}
      aria-label={props.ariaLabel}
    >
      {props.icon}
    </button>
  )
}

// Common icons
export function UndoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7h6a4 4 0 0 1 0 8H7" />
      <path d="M5 4L2 7l3 3" />
    </svg>
  )
}

export function RedoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 7H7a4 4 0 0 0 0 8h2" />
      <path d="M11 4l3 3-3 3" />
    </svg>
  )
}

export function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
      <path d="M3 2.5v9l8-4.5-8-4.5z" />
    </svg>
  )
}

export function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 2v7M4 6l3 3 3-3M2 11h10" />
    </svg>
  )
}

export function RefreshIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 7a5 5 0 0 1 9-3M12 7a5 5 0 0 1-9 3" />
      <path d="M2 3v4h4M12 11V7H8" />
    </svg>
  )
}

export function SidebarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="12" height="10" rx="1" />
      <path d="M6 3v10" />
    </svg>
  )
}

export function PanelRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="12" height="10" rx="1" />
      <path d="M10 3v10" />
    </svg>
  )
}

export function TerminalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="12" height="10" rx="1" />
      <path d="M5 7l2 2-2 2" />
      <path d="M9 11h2" />
    </svg>
  )
}

export function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="3" />
      <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.4 1.4M11.55 11.55l1.4 1.4M3.05 12.95l1.4-1.4M11.55 4.45l1.4-1.4" />
    </svg>
  )
}

export function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13.5 8.5a6 6 0 1 1-6-6c.3 0 .5.2.4.5-.3.8-.4 1.7-.4 2.5a5 5 0 0 0 5 5c.8 0 1.7-.1 2.5-.4.3-.1.5.1.5.4z" />
    </svg>
  )
}

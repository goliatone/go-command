import { useEffect, useState } from "react"

import type { ActionCatalogItem, ActionCatalogProvider } from "../../adapters/actionCatalog"

export interface ActionCatalogState {
  actions: ActionCatalogItem[]
  loading: boolean
  unavailableReason: string | null
}

export function useActionCatalog(provider: ActionCatalogProvider | null | undefined): ActionCatalogState {
  const [actions, setActions] = useState<ActionCatalogItem[]>([])
  const [unavailableReason, setUnavailableReason] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let cancelled = false

    if (!provider) {
      setLoading(false)
      setActions([])
      setUnavailableReason("Action catalog unavailable.")
      return
    }

    setLoading(true)
    setUnavailableReason(null)

    provider
      .listActions()
      .then((items) => {
        if (cancelled) {
          return
        }
        setActions(items)
        setUnavailableReason(items.length === 0 ? "Action catalog is empty." : null)
      })
      .catch(() => {
        if (cancelled) {
          return
        }
        setActions([])
        setUnavailableReason("Action catalog unavailable.")
      })
      .finally(() => {
        if (cancelled) {
          return
        }
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [provider])

  return { actions, loading, unavailableReason }
}

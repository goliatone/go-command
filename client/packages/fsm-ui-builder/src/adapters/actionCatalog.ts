export interface ActionCatalogItem {
  id: string
  label?: string
  description?: string
  metadata?: {
    tags?: string[]
    [key: string]: unknown
  }
}

export interface ActionCatalogProvider {
  listActions(): Promise<ActionCatalogItem[]>
}

export function createStaticActionCatalogProvider(items: ActionCatalogItem[]): ActionCatalogProvider {
  return {
    async listActions() {
      return items.map((item) => ({ ...item }))
    }
  }
}

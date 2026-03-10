export interface ActionCatalogItem {
  id: string
  label?: string
  description?: string
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

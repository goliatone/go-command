import { createRoot, type Root } from "react-dom/client"

import { FSMUIBuilder, type FSMUIBuilderProps } from "./FSMUIBuilder"

export interface MountedFSMUIBuilder {
  root: Root
  unmount(): void
}

export function mountFSMUIBuilder(
  element: HTMLElement,
  props: FSMUIBuilderProps = {}
): MountedFSMUIBuilder {
  const root = createRoot(element)
  root.render(<FSMUIBuilder {...props} />)
  return {
    root,
    unmount() {
      root.unmount()
    }
  }
}

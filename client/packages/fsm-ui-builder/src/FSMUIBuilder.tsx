import { useEffect } from "react"

import type { DraftMachineDocument, ValidationDiagnostic } from "./contracts"
import { BuilderStoresProvider, useMachineStore } from "./store/provider"
import { BuilderShell } from "./components/BuilderShell"
import "./styles.css"

export interface FSMUIBuilderProps {
  initialDocument?: DraftMachineDocument
  initialDiagnostics?: ValidationDiagnostic[]
  onChange?: (input: {
    document: DraftMachineDocument
    diagnostics: ValidationDiagnostic[]
    isDirty: boolean
  }) => void
}

function BuilderShellWithLifecycle(props: Pick<FSMUIBuilderProps, "onChange">) {
  const document = useMachineStore((state) => state.document)
  const diagnostics = useMachineStore((state) => state.diagnostics)
  const isDirty = useMachineStore((state) => state.isDirty)

  useEffect(() => {
    if (!props.onChange) {
      return
    }
    props.onChange({
      document,
      diagnostics,
      isDirty
    })
  }, [diagnostics, document, isDirty, props])

  return <BuilderShell />
}

export function FSMUIBuilder(props: FSMUIBuilderProps) {
  return (
    <BuilderStoresProvider
      initialDocument={props.initialDocument}
      initialDiagnostics={props.initialDiagnostics}
    >
      <BuilderShellWithLifecycle onChange={props.onChange} />
    </BuilderStoresProvider>
  )
}

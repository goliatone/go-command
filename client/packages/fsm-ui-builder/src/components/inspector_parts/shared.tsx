import type { ReactNode } from "react"

import type { TransitionDefinition, ValidationDiagnostic, WorkflowNodeDefinition } from "../../contracts"

export function InlineDiagnostics(props: { messages: string[] }) {
  if (props.messages.length === 0) {
    return null
  }
  return (
    <ul className="fub-inline-diags" role="alert">
      {props.messages.map((message, index) => (
        <li key={`${message}-${index}`}>{message}</li>
      ))}
    </ul>
  )
}

export function toMessages(list: Array<{ message: string }>): string[] {
  return list.map((item) => item.message)
}

export function transitionTargetKind(transition: TransitionDefinition): "static" | "dynamic" {
  if (transition.dynamic_to) {
    return "dynamic"
  }
  return "static"
}

export function renderWorkflowNodeSummary(node: WorkflowNodeDefinition): string {
  if (node.kind === "step") {
    return `step:${node.step?.action_id || "(action_id)"}`
  }
  if (node.kind === "when") {
    return `when:${node.expr || "(expr)"}`
  }
  return `${node.kind}: unsupported`
}

export function inspectorFieldDiagnostics(
  diagnostics: ValidationDiagnostic[],
  field: string
): ValidationDiagnostic[] {
  return diagnostics.filter((diagnostic) => diagnostic.field === field || diagnostic.path.endsWith(`.${field}`))
}

interface InspectorPanelProps {
  title: string
  actions?: ReactNode
  children: ReactNode
}

export function InspectorPanel(props: InspectorPanelProps) {
  return (
    <section
      className="fub-panel fub-inspector"
      aria-label="Inspector panel"
      role="region"
      aria-labelledby="fub-panel-inspector-heading"
      id="fub-panel-inspector"
      tabIndex={-1}
    >
      <div className="fub-panel-header" id="fub-panel-inspector-heading">
        <strong>{props.title}</strong>
        {props.actions ?? null}
      </div>
      <div className="fub-panel-body">{props.children}</div>
    </section>
  )
}

export function ReadOnlyNote(props: { readOnly: boolean }) {
  if (!props.readOnly) {
    return null
  }
  return <p className="fub-readonly-note">Read-only mode: editing is disabled in narrow/mobile layout.</p>
}

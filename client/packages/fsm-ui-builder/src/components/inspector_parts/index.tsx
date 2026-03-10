import type { ActionCatalogProvider } from "../../adapters/actionCatalog"
import { diagnosticsForSelection } from "../../document"
import { useMachineStore } from "../../store/provider"
import { StateInspector } from "./StateInspector"
import { TransitionInspector } from "./TransitionInspector"
import { WorkflowNodeInspector } from "./WorkflowNodeInspector"
import { InlineDiagnostics, InspectorPanel, toMessages } from "./shared"
import { useActionCatalog } from "./useActionCatalog"

export interface InspectorProps {
  actionCatalogProvider?: ActionCatalogProvider | null
  readOnly?: boolean
}

export function Inspector(props: InspectorProps) {
  const definition = useMachineStore((state) => state.document.definition)
  const selection = useMachineStore((state) => state.selection)
  const diagnostics = useMachineStore((state) => state.diagnostics)

  const removeState = useMachineStore((state) => state.removeState)
  const updateStateName = useMachineStore((state) => state.updateStateName)
  const updateStateFlag = useMachineStore((state) => state.updateStateFlag)

  const removeTransition = useMachineStore((state) => state.removeTransition)
  const updateTransition = useMachineStore((state) => state.updateTransition)
  const updateTransitionTargetKind = useMachineStore((state) => state.updateTransitionTargetKind)
  const addWorkflowNode = useMachineStore((state) => state.addWorkflowNode)
  const removeWorkflowNode = useMachineStore((state) => state.removeWorkflowNode)
  const selectWorkflowNode = useMachineStore((state) => state.selectWorkflowNode)
  const updateWorkflowNodeField = useMachineStore((state) => state.updateWorkflowNodeField)
  const updateWorkflowNodeMetadata = useMachineStore((state) => state.updateWorkflowNodeMetadata)

  const selectionDiagnostics = diagnosticsForSelection(diagnostics, selection)
  const actionCatalog = useActionCatalog(props.actionCatalogProvider)
  const readOnly = Boolean(props.readOnly)

  if (selection.kind === "state") {
    return (
      <StateInspector
        state={definition.states[selection.stateIndex]}
        stateIndex={selection.stateIndex}
        diagnostics={diagnostics}
        selectionDiagnostics={selectionDiagnostics}
        readOnly={readOnly}
        removeState={removeState}
        updateStateName={updateStateName}
        updateStateFlag={updateStateFlag}
      />
    )
  }

  if (selection.kind === "transition") {
    return (
      <TransitionInspector
        definition={definition}
        transition={definition.transitions[selection.transitionIndex]}
        transitionIndex={selection.transitionIndex}
        diagnostics={diagnostics}
        selectionDiagnostics={selectionDiagnostics}
        readOnly={readOnly}
        removeTransition={removeTransition}
        updateTransition={updateTransition}
        updateTransitionTargetKind={updateTransitionTargetKind}
        addWorkflowNode={addWorkflowNode}
        selectWorkflowNode={selectWorkflowNode}
      />
    )
  }

  if (selection.kind === "workflow-node") {
    const transition = definition.transitions[selection.transitionIndex]
    const node = transition?.workflow.nodes?.[selection.nodeIndex]

    return (
      <WorkflowNodeInspector
        transition={transition}
        node={node}
        transitionIndex={selection.transitionIndex}
        nodeIndex={selection.nodeIndex}
        diagnostics={diagnostics}
        selectionDiagnostics={selectionDiagnostics}
        actionCatalog={actionCatalog}
        readOnly={readOnly}
        removeWorkflowNode={removeWorkflowNode}
        updateWorkflowNodeField={updateWorkflowNodeField}
        updateWorkflowNodeMetadata={updateWorkflowNodeMetadata}
      />
    )
  }

  return (
    <InspectorPanel title="Inspector">
      <p>Select a state, transition, or workflow node to edit properties.</p>
      <InlineDiagnostics messages={toMessages(selectionDiagnostics)} />
    </InspectorPanel>
  )
}

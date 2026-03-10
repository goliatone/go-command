import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { RPCClient } from "../../../src"

import type { ActionCatalogProvider } from "./adapters/actionCatalog"
import type { BuilderAuthoringRPC } from "./adapters/authoring"
import { useAuthoringRPC } from "./adapters/authoring"
import type { ExportAdapter } from "./adapters/export"
import { createDefaultExportAdapter, isRPCExportAvailable } from "./adapters/export"
import type { PersistenceStore, PersistedMachineDraft } from "./adapters/persistence"
import { createLocalStoragePersistenceStore } from "./adapters/persistence"
import type { BuilderRequestMeta, DraftMachineDocument, ValidationDiagnostic } from "./contracts"
import { BuilderShell } from "./components/BuilderShell"
import type { SaveStatus } from "./components/Header"
import { defaultDraftMachineDocument, deepClone, validateDefinition, type Selection } from "./document"
import { toHandledBuilderError } from "./errorHandling"
import type { BuilderRuntimeRPC } from "./hooks/useRPC"
import { useRuntimeRPC } from "./hooks/useRPC"
import { FSM_RUNTIME_METHODS, HANDLED_ERROR_CODES } from "./contracts"
import { BuilderStoresProvider, useMachineStore, useSimulationStore } from "./store/provider"
import { loadDraftDocumentForEditing, prepareDraftDocumentForSave } from "./transforms/roundtrip"
import "./styles.css"

export interface SimulationDefaults {
  entityId?: string
  msg?: unknown
  meta?: BuilderRequestMeta
}

export interface FSMUIBuilderProps {
  initialDocument?: DraftMachineDocument
  initialDiagnostics?: ValidationDiagnostic[]
  machineId?: string
  rpcClient?: RPCClient | null
  runtimeRPC?: BuilderRuntimeRPC | null
  authoringRPC?: BuilderAuthoringRPC | null
  persistenceStore?: PersistenceStore
  exportAdapter?: ExportAdapter | null
  actionCatalogProvider?: ActionCatalogProvider | null
  simulationDefaults?: SimulationDefaults
  autosaveDebounceMs?: number
  onChange?: (input: {
    document: DraftMachineDocument
    diagnostics: ValidationDiagnostic[]
    isDirty: boolean
  }) => void
}

function defaultSimulationEntityID(machineID: string): string {
  return `${machineID}-preview`
}

function selectTransitionForSimulation(input: {
  selection: Selection
  transitions: DraftMachineDocument["definition"]["transitions"]
}): { id?: string; event: string; from?: string } | null {
  if (input.transitions.length === 0) {
    return null
  }

  if (input.selection.kind === "transition") {
    const transition = input.transitions[input.selection.transitionIndex]
    if (transition) {
      return {
        id: transition.id,
        event: transition.event,
        from: transition.from
      }
    }
  }

  if (input.selection.kind === "workflow-node") {
    const transition = input.transitions[input.selection.transitionIndex]
    if (transition) {
      return {
        id: transition.id,
        event: transition.event,
        from: transition.from
      }
    }
  }

  const transition = input.transitions[0]
  return {
    id: transition.id,
    event: transition.event,
    from: transition.from
  }
}

function BuilderShellWithLifecycle(props: FSMUIBuilderProps) {
  const document = useMachineStore((state) => state.document)
  const diagnostics = useMachineStore((state) => state.diagnostics)
  const isDirty = useMachineStore((state) => state.isDirty)
  const selection = useMachineStore((state) => state.selection)

  const replaceDocument = useMachineStore((state) => state.replaceDocument)
  const setDiagnostics = useMachineStore((state) => state.setDiagnostics)
  const markSaved = useMachineStore((state) => state.markSaved)
  const applyRemoteSave = useMachineStore((state) => state.applyRemoteSave)

  const setApplyEventWirePayload = useSimulationStore((state) => state.setApplyEventWirePayload)
  const setSnapshotWirePayload = useSimulationStore((state) => state.setSnapshotWirePayload)
  const pushSimulationError = useSimulationStore((state) => state.pushError)
  const pushSimulationInfo = useSimulationStore((state) => state.pushInfo)

  const runtimeFromClient = useRuntimeRPC(props.rpcClient ?? null)
  const authoringFromClient = useAuthoringRPC(props.rpcClient ?? null)
  const runtimeRPC = props.runtimeRPC ?? runtimeFromClient
  const authoringRPC = props.authoringRPC ?? authoringFromClient

  const persistenceStore = useMemo(
    () => props.persistenceStore ?? createLocalStoragePersistenceStore(),
    [props.persistenceStore]
  )
  const exportAdapter = useMemo(
    () => props.exportAdapter ?? createDefaultExportAdapter(),
    [props.exportAdapter]
  )

  const machineID = (props.machineId?.trim() || document.definition.id || "machine").trim()
  const simulationEntityID = props.simulationDefaults?.entityId ?? defaultSimulationEntityID(machineID)
  const simulationMessage = props.simulationDefaults?.msg ?? {}
  const simulationMeta = props.simulationDefaults?.meta
  const autosaveDebounceMs = props.autosaveDebounceMs ?? 400

  const initialSerializedRef = useRef<string | null>(null)
  if (initialSerializedRef.current === null) {
    initialSerializedRef.current = JSON.stringify(document)
  }

  const baseRoundTripDocumentRef = useRef<DraftMachineDocument>(loadDraftDocumentForEditing(document))
  const [recoveryDraft, setRecoveryDraft] = useState<PersistedMachineDraft | null>(null)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>({ state: "idle" })

  const buildRoundTripDraft = useCallback((): DraftMachineDocument => {
    return prepareDraftDocumentForSave({
      baseDocument: baseRoundTripDocumentRef.current,
      editedDocument: document
    })
  }, [document])

  const handleOperationError = useCallback(
    (error: unknown) => {
      const handled = toHandledBuilderError(error)
      pushSimulationError({
        code: handled.code,
        message: handled.message,
        method: handled.method
      })
    },
    [pushSimulationError]
  )

  const markSaveError = useCallback((source: SaveStatus["source"], error: unknown) => {
    const handled = toHandledBuilderError(error)
    setSaveStatus({
      state: "error",
      source,
      message: handled.message,
      updatedAt: new Date().toISOString()
    })
  }, [])

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

  useEffect(() => {
    let cancelled = false

    persistenceStore
      .load(machineID)
      .then((persisted) => {
        if (cancelled) {
          return
        }
        if (!persisted) {
          setRecoveryDraft(null)
          return
        }
        const initialSerialized = initialSerializedRef.current ?? ""
        const persistedSerialized = JSON.stringify(persisted.document)
        setRecoveryDraft(persistedSerialized === initialSerialized ? null : persisted)
      })
      .catch((error) => {
        if (cancelled) {
          return
        }
        const handled = toHandledBuilderError(error)
        pushSimulationError({
          code: handled.code,
          message: `autosave recovery failed: ${handled.message}`,
          method: handled.method
        })
      })

    return () => {
      cancelled = true
    }
  }, [machineID, persistenceStore, pushSimulationError])

  useEffect(() => {
    if (!isDirty) {
      return
    }

    const timer = window.setTimeout(() => {
      setSaveStatus({
        state: "saving",
        source: "autosave",
        updatedAt: new Date().toISOString()
      })
      const draft = buildRoundTripDraft()
      void persistenceStore
        .save({
          machineId: machineID,
          updatedAt: new Date().toISOString(),
          document: draft
        })
        .then(() => {
          setSaveStatus({
            state: "saved",
            source: "autosave",
            updatedAt: new Date().toISOString()
          })
          pushSimulationInfo("Autosaved draft to persistence store.")
        })
        .catch((error) => {
          markSaveError("autosave", error)
          const handled = toHandledBuilderError(error)
          pushSimulationError({
            code: handled.code,
            message: `autosave failed: ${handled.message}`,
            method: handled.method
          })
        })
    }, autosaveDebounceMs)

    return () => {
      window.clearTimeout(timer)
    }
  }, [
    autosaveDebounceMs,
    buildRoundTripDraft,
    isDirty,
    machineID,
    markSaveError,
    persistenceStore,
    pushSimulationError,
    pushSimulationInfo
  ])

  const onSimulate = useCallback(async () => {
    if (!runtimeRPC) {
      pushSimulationError({
        code: HANDLED_ERROR_CODES.internal,
        method: FSM_RUNTIME_METHODS.applyEvent,
        message: "runtime adapter unavailable"
      })
      return
    }

    const selected = selectTransitionForSimulation({
      selection,
      transitions: document.definition.transitions
    })

    if (!selected) {
      pushSimulationError({
        code: HANDLED_ERROR_CODES.invalidTransition,
        method: FSM_RUNTIME_METHODS.applyEvent,
        message: "no transition available for simulation"
      })
      return
    }

    if (selected.event.trim() === "") {
      pushSimulationError({
        code: HANDLED_ERROR_CODES.invalidTransition,
        method: FSM_RUNTIME_METHODS.applyEvent,
        message: "selected transition must define an event"
      })
      return
    }

    try {
      const applyResult = await runtimeRPC.applyEventDryRun(
        {
          machineId: machineID,
          entityId: simulationEntityID,
          event: selected.event,
          msg: simulationMessage,
          expectedState: selected.from,
          dryRun: true
        },
        simulationMeta
      )

      setApplyEventWirePayload(applyResult, {
        event: selected.event,
        transitionId: selected.id
      })

      const snapshotResult = await runtimeRPC.snapshot(
        {
          machineId: machineID,
          entityId: simulationEntityID,
          msg: simulationMessage,
          evaluateGuards: true,
          includeBlocked: true
        },
        simulationMeta
      )

      setSnapshotWirePayload(snapshotResult)
    } catch (error) {
      handleOperationError(error)
    }
  }, [
    document.definition.transitions,
    handleOperationError,
    machineID,
    pushSimulationError,
    runtimeRPC,
    selection,
    setApplyEventWirePayload,
    setSnapshotWirePayload,
    simulationEntityID,
    simulationMessage,
    simulationMeta
  ])

  const onValidate = useCallback(async () => {
    const roundTripDraft = buildRoundTripDraft()

    if (!authoringRPC) {
      const localDiagnostics = validateDefinition(roundTripDraft.definition)
      setDiagnostics(localDiagnostics)
      pushSimulationInfo("Authoring RPC unavailable. Used local validation only.")
      return
    }

    try {
      const validation = await authoringRPC.validate({
        machineId: machineID,
        draft: roundTripDraft
      })
      setDiagnostics(validation.diagnostics)
      pushSimulationInfo(`Validation completed. valid=${validation.valid}`)
    } catch (error) {
      handleOperationError(error)
    }
  }, [authoringRPC, buildRoundTripDraft, handleOperationError, machineID, pushSimulationInfo, setDiagnostics])

  const onSave = useCallback(async () => {
    setSaveStatus({
      state: "saving",
      source: "manual",
      updatedAt: new Date().toISOString()
    })
    const roundTripDraft = buildRoundTripDraft()

    if (!authoringRPC) {
      try {
        await persistenceStore.save({
          machineId: machineID,
          updatedAt: new Date().toISOString(),
          document: deepClone(roundTripDraft)
        })
        markSaved()
        baseRoundTripDocumentRef.current = deepClone(roundTripDraft)
        setRecoveryDraft(null)
        setSaveStatus({
          state: "saved",
          source: "manual",
          updatedAt: new Date().toISOString()
        })
        pushSimulationInfo("Saved locally (authoring RPC unavailable).")
      } catch (error) {
        markSaveError("manual", error)
        handleOperationError(error)
      }
      return
    }

    try {
      const saved = await authoringRPC.saveDraft({
        machineId: machineID,
        baseVersion: roundTripDraft.definition.version,
        draft: roundTripDraft,
        validate: true
      })

      applyRemoteSave(saved.version, saved.draftState, saved.diagnostics)

      const persistedDocument: DraftMachineDocument = {
        ...deepClone(roundTripDraft),
        definition: {
          ...deepClone(roundTripDraft.definition),
          version: saved.version
        },
        draft_state: deepClone(saved.draftState)
      }

      baseRoundTripDocumentRef.current = deepClone(persistedDocument)

      await persistenceStore.save({
        machineId: machineID,
        updatedAt: new Date().toISOString(),
        document: persistedDocument
      })

      setRecoveryDraft(null)
      setSaveStatus({
        state: "saved",
        source: "manual",
        updatedAt: new Date().toISOString()
      })
      pushSimulationInfo("Draft saved through authoring RPC.")
    } catch (error) {
      markSaveError("manual", error)
      handleOperationError(error)
    }
  }, [
    applyRemoteSave,
    authoringRPC,
    buildRoundTripDraft,
    handleOperationError,
    markSaveError,
    machineID,
    markSaved,
    persistenceStore,
    pushSimulationInfo
  ])

  const onRecoverDraft = useCallback(async () => {
    if (!recoveryDraft) {
      pushSimulationInfo("No autosaved draft to recover.")
      return
    }
    const loaded = loadDraftDocumentForEditing(recoveryDraft.document)
    replaceDocument(loaded)
    baseRoundTripDocumentRef.current = deepClone(loaded)
    setRecoveryDraft(null)
    pushSimulationInfo("Recovered autosaved draft.")
  }, [pushSimulationInfo, recoveryDraft, replaceDocument])

  const onExportJSON = useCallback(async () => {
    try {
      await exportAdapter.exportJSON({
        machineId: machineID,
        draft: buildRoundTripDraft()
      })
      pushSimulationInfo("Exported machine definition as JSON.")
    } catch (error) {
      handleOperationError(error)
    }
  }, [buildRoundTripDraft, exportAdapter, handleOperationError, machineID, pushSimulationInfo])

  const onExportRPC = useCallback(async () => {
    if (!exportAdapter.exportRPC) {
      pushSimulationInfo("RPC export unavailable. Configure ExportAdapter.exportRPC to enable this capability.")
      return
    }

    try {
      await exportAdapter.exportRPC({
        machineId: machineID,
        draft: buildRoundTripDraft()
      })
      pushSimulationInfo("Exported machine definition through RPC adapter.")
    } catch (error) {
      handleOperationError(error)
    }
  }, [buildRoundTripDraft, exportAdapter, handleOperationError, machineID, pushSimulationInfo])

  return (
    <BuilderShell
      onSave={onSave}
      onValidate={onValidate}
      onSimulate={onSimulate}
      onRecoverDraft={onRecoverDraft}
      onExportJSON={onExportJSON}
      onExportRPC={onExportRPC}
      runtimeAvailable={Boolean(runtimeRPC)}
      authoringAvailable={Boolean(authoringRPC)}
      recoveryAvailable={Boolean(recoveryDraft)}
      rpcExportAvailable={isRPCExportAvailable(exportAdapter)}
      actionCatalogProvider={props.actionCatalogProvider}
      saveStatus={saveStatus}
    />
  )
}

export function FSMUIBuilder(props: FSMUIBuilderProps) {
  const initialDocument = useMemo(
    () => loadDraftDocumentForEditing(props.initialDocument ?? defaultDraftMachineDocument()),
    [props.initialDocument]
  )

  return (
    <BuilderStoresProvider
      initialDocument={initialDocument}
      initialDiagnostics={props.initialDiagnostics}
    >
      <BuilderShellWithLifecycle {...props} />
    </BuilderStoresProvider>
  )
}

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { RPCClient } from "../../../src"

import type { ActionCatalogProvider } from "./adapters/actionCatalog"
import type { BuilderAuthoringRPC } from "./adapters/authoring"
import { useAuthoringRPC } from "./adapters/authoring"
import type { ExportAdapter } from "./adapters/export"
import { createDefaultExportAdapter, isRPCExportAvailable } from "./adapters/export"
import type { PersistenceStore, PersistedMachineDraft } from "./adapters/persistence"
import { createLocalStoragePersistenceStore } from "./adapters/persistence"
import type {
  AuthoringDiffVersionsResponse,
  AuthoringVersionSummary,
  BuilderRequestMeta,
  DraftMachineDocument,
  MachineDefinition,
  ValidationDiagnostic
} from "./contracts"
import { BuilderShell } from "./components/BuilderShell"
import { ConflictResolutionModal, type ConflictResolutionChoice } from "./components/ConflictResolutionModal"
import type { SaveStatus } from "./components/Header"
import { VersionHistoryModal } from "./components/VersionHistoryModal"
import {
  deepClone,
  diagnosticsParityEqual,
  mergeScopedValidationDiagnostics,
  normalizeInitialDocumentInput,
  validateDefinition,
  type Selection
} from "./document"
import { toHandledBuilderError } from "./errorHandling"
import type { BuilderRuntimeRPC } from "./hooks/useRPC"
import { useRuntimeRPC } from "./hooks/useRPC"
import { FSM_RUNTIME_METHODS, HANDLED_ERROR_CODES } from "./contracts"
import { BuilderStoresProvider, useMachineStore, useSimulationStore } from "./store/provider"
import { BuilderResultError, createBuilderRPCClient } from "./rpc"
import { loadDraftDocumentForEditing, prepareDraftDocumentForSave } from "./transforms/roundtrip"
import "./styles.css"

export interface SimulationDefaults {
  entityId?: string
  msg?: unknown
  meta?: BuilderRequestMeta
}

export interface FSMUIBuilderProps {
  initialDocument?: DraftMachineDocument | MachineDefinition | { draft?: DraftMachineDocument | MachineDefinition }
  initialDiagnostics?: ValidationDiagnostic[]
  machineId?: string
  rpcEndpoint?: string
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

interface VersionSnapshot {
  draft: DraftMachineDocument
  diagnostics: ValidationDiagnostic[]
}

interface PendingConflictState {
  machineId: string
  localDraft: DraftMachineDocument
  latestVersion: string
  latestDraft: DraftMachineDocument
  latestDiagnostics: ValidationDiagnostic[]
  expectedVersion?: string
  actualVersion?: string
  conflictPaths?: string[]
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>
  }
  return null
}

function BuilderShellWithLifecycle(props: FSMUIBuilderProps) {
  const document = useMachineStore((state) => state.document)
  const diagnostics = useMachineStore((state) => state.diagnostics)
  const isDirty = useMachineStore((state) => state.isDirty)
  const selection = useMachineStore((state) => state.selection)

  const replaceDocument = useMachineStore((state) => state.replaceDocument)
  const restoreDocument = useMachineStore((state) => state.restoreDocument)
  const setDiagnostics = useMachineStore((state) => state.setDiagnostics)
  const consumeValidationScopeNodeIDs = useMachineStore((state) => state.consumeValidationScopeNodeIDs)
  const markSaved = useMachineStore((state) => state.markSaved)
  const applyRemoteSave = useMachineStore((state) => state.applyRemoteSave)

  const setApplyEventWirePayload = useSimulationStore((state) => state.setApplyEventWirePayload)
  const setSnapshotWirePayload = useSimulationStore((state) => state.setSnapshotWirePayload)
  const pushSimulationError = useSimulationStore((state) => state.pushError)
  const pushSimulationInfo = useSimulationStore((state) => state.pushInfo)

  const fallbackRPCClient = useMemo(() => {
    if (props.rpcClient || !props.rpcEndpoint || props.rpcEndpoint.trim() === "") {
      return null
    }
    return createBuilderRPCClient({ endpoint: props.rpcEndpoint })
  }, [props.rpcClient, props.rpcEndpoint])

  const resolvedRPCClient = props.rpcClient ?? fallbackRPCClient
  const runtimeFromClient = useRuntimeRPC(resolvedRPCClient ?? null)
  const authoringFromClient = useAuthoringRPC(resolvedRPCClient ?? null)
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
  const [versionHistoryOpen, setVersionHistoryOpen] = useState(false)
  const [versionHistoryLoading, setVersionHistoryLoading] = useState(false)
  const [versionHistoryItems, setVersionHistoryItems] = useState<AuthoringVersionSummary[]>([])
  const [versionHistorySelectedVersion, setVersionHistorySelectedVersion] = useState<string | undefined>(undefined)
  const [versionHistoryErrorMessage, setVersionHistoryErrorMessage] = useState<string | undefined>(undefined)
  const [versionHistoryDiff, setVersionHistoryDiff] = useState<AuthoringDiffVersionsResponse | null>(null)
  const [versionHistoryDiffUnavailableReason, setVersionHistoryDiffUnavailableReason] = useState<string | null>(null)
  const [pendingConflict, setPendingConflict] = useState<PendingConflictState | null>(null)
  const [resolvingConflict, setResolvingConflict] = useState(false)
  const versionSnapshotCacheRef = useRef<Record<string, VersionSnapshot>>({})

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

  const persistBaselineDraft = useCallback(
    async (draft: DraftMachineDocument) => {
      await persistenceStore.save({
        machineId: machineID,
        updatedAt: new Date().toISOString(),
        document: deepClone(draft)
      })
      setRecoveryDraft(null)
    },
    [machineID, persistenceStore]
  )

  const commitSavedAuthoringDraft = useCallback(
    async (input: {
      draft: DraftMachineDocument
      version: string
      draftState: DraftMachineDocument["draft_state"]
      diagnostics: ValidationDiagnostic[]
    }) => {
      applyRemoteSave(input.version, input.draftState, input.diagnostics)

      const persistedDocument: DraftMachineDocument = {
        ...deepClone(input.draft),
        definition: {
          ...deepClone(input.draft.definition),
          version: input.version
        },
        draft_state: deepClone(input.draftState)
      }

      baseRoundTripDocumentRef.current = deepClone(persistedDocument)
      await persistBaselineDraft(persistedDocument)
      setSaveStatus({
        state: "saved",
        source: "manual",
        updatedAt: new Date().toISOString()
      })
    },
    [applyRemoteSave, persistBaselineDraft]
  )

  const openVersionConflict = useCallback(
    async (error: BuilderResultError, localDraft: DraftMachineDocument): Promise<boolean> => {
      if (error.envelope.code !== HANDLED_ERROR_CODES.versionConflict || !authoringRPC) {
        return false
      }

      try {
        const latest = await authoringRPC.getMachine({
          machineId: machineID,
          preferDraft: true
        })
        const details = asRecord(error.envelope.details)
        const conflictPathsRaw = details?.conflictPaths
        const conflictPaths =
          Array.isArray(conflictPathsRaw) && conflictPathsRaw.every((item) => typeof item === "string")
            ? (conflictPathsRaw as string[])
            : undefined

        setPendingConflict({
          machineId: machineID,
          localDraft,
          latestVersion: latest.version,
          latestDraft: deepClone(latest.draft),
          latestDiagnostics: [...latest.diagnostics],
          expectedVersion: typeof details?.expectedVersion === "string" ? details.expectedVersion : localDraft.definition.version,
          actualVersion: typeof details?.actualVersion === "string" ? details.actualVersion : latest.version,
          conflictPaths
        })
        setSaveStatus({
          state: "error",
          source: "manual",
          message: "version conflict: choose resolution",
          updatedAt: new Date().toISOString()
        })
        pushSimulationError({
          code: HANDLED_ERROR_CODES.versionConflict,
          method: error.method,
          message: "Version conflict detected. Choose Keep Mine, Keep Server, or Merge."
        })
        return true
      } catch (lookupError) {
        handleOperationError(lookupError)
        return false
      }
    },
    [authoringRPC, handleOperationError, machineID, pushSimulationError]
  )

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
    const version = document.definition.version
    if (!version || version.trim() === "") {
      return
    }
    versionSnapshotCacheRef.current[version] = {
      draft: deepClone(document),
      diagnostics: [...diagnostics]
    }
  }, [diagnostics, document])

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
      const scopeNodeIDs = consumeValidationScopeNodeIDs()
      if (scopeNodeIDs.length === 0) {
        const validation = await authoringRPC.validate({
          machineId: machineID,
          draft: roundTripDraft
        })
        setDiagnostics(validation.diagnostics)
        pushSimulationInfo(`Validation completed. valid=${validation.valid}`)
        return
      }

      const scopedValidation = await authoringRPC.validate({
        machineId: machineID,
        draft: roundTripDraft,
        scope: {
          nodeIds: scopeNodeIDs
        }
      })

      const mergedDiagnostics = mergeScopedValidationDiagnostics({
        definition: roundTripDraft.definition,
        cachedDiagnostics: diagnostics,
        scopedDiagnostics: scopedValidation.diagnostics,
        scopeNodeIDs
      })
      setDiagnostics(mergedDiagnostics)

      const fullValidation = await authoringRPC.validate({
        machineId: machineID,
        draft: roundTripDraft
      })

      if (!diagnosticsParityEqual(mergedDiagnostics, fullValidation.diagnostics)) {
        setDiagnostics(fullValidation.diagnostics)
        pushSimulationInfo("Scoped validation parity mismatch detected; fell back to full validation output.")
        return
      }

      pushSimulationInfo(`Validation completed. valid=${fullValidation.valid} (scoped + parity checked)`)
    } catch (error) {
      handleOperationError(error)
    }
  }, [
    authoringRPC,
    buildRoundTripDraft,
    consumeValidationScopeNodeIDs,
    diagnostics,
    handleOperationError,
    machineID,
    pushSimulationInfo,
    setDiagnostics
  ])

  const onSave = useCallback(async () => {
    setSaveStatus({
      state: "saving",
      source: "manual",
      updatedAt: new Date().toISOString()
    })
    const roundTripDraft = buildRoundTripDraft()

    if (!authoringRPC) {
      try {
        await persistBaselineDraft(roundTripDraft)
        markSaved()
        baseRoundTripDocumentRef.current = deepClone(roundTripDraft)
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
      await commitSavedAuthoringDraft({
        draft: roundTripDraft,
        version: saved.version,
        draftState: saved.draftState,
        diagnostics: saved.diagnostics
      })
      setPendingConflict(null)
      pushSimulationInfo("Draft saved through authoring RPC.")
    } catch (error) {
      if (error instanceof BuilderResultError) {
        const conflictHandled = await openVersionConflict(error, roundTripDraft)
        if (conflictHandled) {
          return
        }
      }
      markSaveError("manual", error)
      handleOperationError(error)
    }
  }, [
    authoringRPC,
    buildRoundTripDraft,
    commitSavedAuthoringDraft,
    handleOperationError,
    markSaveError,
    machineID,
    markSaved,
    openVersionConflict,
    persistBaselineDraft,
    pushSimulationInfo
  ])

  const onResolveConflict = useCallback(
    async (choice: ConflictResolutionChoice) => {
      if (!pendingConflict || !authoringRPC) {
        return
      }
      setResolvingConflict(true)
      try {
        if (choice === "keep-server") {
          const serverDraft = loadDraftDocumentForEditing(pendingConflict.latestDraft)
          restoreDocument(serverDraft, pendingConflict.latestDiagnostics)
          baseRoundTripDocumentRef.current = deepClone(serverDraft)
          markSaved()
          await persistBaselineDraft(serverDraft)
          setPendingConflict(null)
          setSaveStatus({
            state: "saved",
            source: "manual",
            updatedAt: new Date().toISOString()
          })
          pushSimulationInfo("Loaded latest server draft after conflict.")
          return
        }

        const draftToSave =
          choice === "merge"
            ? prepareDraftDocumentForSave({
                baseDocument: pendingConflict.latestDraft,
                editedDocument: pendingConflict.localDraft
              })
            : deepClone(pendingConflict.localDraft)

        setSaveStatus({
          state: "saving",
          source: "manual",
          updatedAt: new Date().toISOString()
        })

        const saved = await authoringRPC.saveDraft({
          machineId: pendingConflict.machineId,
          baseVersion: pendingConflict.latestVersion,
          draft: draftToSave,
          validate: true
        })

        await commitSavedAuthoringDraft({
          draft: draftToSave,
          version: saved.version,
          draftState: saved.draftState,
          diagnostics: saved.diagnostics
        })

        setPendingConflict(null)
        pushSimulationInfo(choice === "merge" ? "Merged with latest server draft and saved." : "Retried save with latest server version.")
      } catch (error) {
        if (error instanceof BuilderResultError) {
          const conflictHandled = await openVersionConflict(error, pendingConflict.localDraft)
          if (conflictHandled) {
            return
          }
        }
        markSaveError("manual", error)
        handleOperationError(error)
      } finally {
        setResolvingConflict(false)
      }
    },
    [
      authoringRPC,
      commitSavedAuthoringDraft,
      handleOperationError,
      markSaveError,
      markSaved,
      openVersionConflict,
      pendingConflict,
      persistBaselineDraft,
      pushSimulationInfo,
      restoreDocument
    ]
  )

  const onOpenVersionHistory = useCallback(async () => {
    setVersionHistoryOpen(true)
    setVersionHistoryLoading(true)
    setVersionHistoryErrorMessage(undefined)
    setVersionHistoryDiff(null)
    setVersionHistoryDiffUnavailableReason(null)

    const fallbackItem: AuthoringVersionSummary = {
      version: document.definition.version,
      updatedAt: document.draft_state.last_saved_at,
      isDraft: document.draft_state.is_draft
    }

    versionSnapshotCacheRef.current[fallbackItem.version] = {
      draft: deepClone(document),
      diagnostics: [...diagnostics]
    }

    if (!authoringRPC) {
      setVersionHistoryItems([fallbackItem])
      setVersionHistorySelectedVersion(fallbackItem.version)
      setVersionHistoryDiffUnavailableReason("Authoring RPC unavailable; showing local version only.")
      setVersionHistoryLoading(false)
      return
    }

    try {
      const listVersions = authoringRPC.listVersions
      if (!listVersions) {
        setVersionHistoryItems([fallbackItem])
        setVersionHistorySelectedVersion(fallbackItem.version)
        setVersionHistoryDiffUnavailableReason("Version history capability unavailable.")
        return
      }

      const response = await listVersions({
        machineId: machineID,
        limit: 25
      })
      const items = response.items.length > 0 ? response.items : [fallbackItem]
      setVersionHistoryItems(items)
      const selected = items.some((item) => item.version === fallbackItem.version) ? fallbackItem.version : items[0]?.version
      setVersionHistorySelectedVersion(selected)
    } catch (error) {
      const handled = toHandledBuilderError(error)
      setVersionHistoryErrorMessage(handled.message)
      setVersionHistoryItems([fallbackItem])
      setVersionHistorySelectedVersion(fallbackItem.version)
      setVersionHistoryDiffUnavailableReason("Version history capability unavailable.")
    } finally {
      setVersionHistoryLoading(false)
    }
  }, [authoringRPC, diagnostics, document, machineID])

  const onSelectVersionHistoryVersion = useCallback(
    async (version: string) => {
      setVersionHistorySelectedVersion(version)
      setVersionHistoryDiff(null)
      setVersionHistoryDiffUnavailableReason(null)

      if (!authoringRPC) {
        setVersionHistoryDiffUnavailableReason("Authoring RPC unavailable; diff disabled.")
        return
      }

      if (version === document.definition.version) {
        setVersionHistoryDiffUnavailableReason("Selected version matches current draft.")
        return
      }

      if (authoringRPC.diffVersions) {
        try {
          const diff = await authoringRPC.diffVersions({
            machineId: machineID,
            baseVersion: version,
            targetVersion: document.definition.version
          })
          setVersionHistoryDiff(diff)
        } catch (error) {
          const handled = toHandledBuilderError(error)
          setVersionHistoryDiffUnavailableReason(`Diff unavailable: ${handled.message}`)
        }
      } else {
        setVersionHistoryDiffUnavailableReason("Version diff capability unavailable.")
      }
    },
    [authoringRPC, document.definition.version, machineID]
  )

  const onRestoreSelectedVersion = useCallback(async () => {
    const selectedVersion = versionHistorySelectedVersion
    if (!selectedVersion) {
      return
    }
    if (selectedVersion === document.definition.version) {
      return
    }

    try {
      let snapshot = versionSnapshotCacheRef.current[selectedVersion]
      if (!snapshot) {
        if (!authoringRPC?.getVersion) {
          setVersionHistoryDiffUnavailableReason("Version restore unavailable without get_version capability.")
          return
        }
        const response = await authoringRPC.getVersion({
          machineId: machineID,
          version: selectedVersion
        })
        snapshot = {
          draft: deepClone(response.draft),
          diagnostics: [...response.diagnostics]
        }
        versionSnapshotCacheRef.current[selectedVersion] = snapshot
      }

      const restoredDraft = loadDraftDocumentForEditing(snapshot.draft)
      restoreDocument(restoredDraft, snapshot.diagnostics)
      baseRoundTripDocumentRef.current = deepClone(restoredDraft)
      markSaved()
      await persistBaselineDraft(restoredDraft)
      setVersionHistoryOpen(false)
      setSaveStatus({
        state: "saved",
        source: "manual",
        updatedAt: new Date().toISOString()
      })
      pushSimulationInfo(`Restored version ${selectedVersion}. Use Undo to return.`)
    } catch (error) {
      const handled = toHandledBuilderError(error)
      setVersionHistoryErrorMessage(handled.message)
      handleOperationError(error)
    }
  }, [
    authoringRPC,
    document.definition.version,
    handleOperationError,
    markSaved,
    machineID,
    persistBaselineDraft,
    pushSimulationInfo,
    restoreDocument,
    versionHistorySelectedVersion
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
    <>
      <BuilderShell
        onSave={onSave}
        onValidate={onValidate}
        onSimulate={onSimulate}
        onRecoverDraft={onRecoverDraft}
        onOpenVersionHistory={onOpenVersionHistory}
        onExportJSON={onExportJSON}
        onExportRPC={onExportRPC}
        runtimeAvailable={Boolean(runtimeRPC)}
        authoringAvailable={Boolean(authoringRPC)}
        recoveryAvailable={Boolean(recoveryDraft)}
        rpcExportAvailable={isRPCExportAvailable(exportAdapter)}
        versionHistoryEnabled
        actionCatalogProvider={props.actionCatalogProvider}
        saveStatus={saveStatus}
      />
      <VersionHistoryModal
        open={versionHistoryOpen}
        loading={versionHistoryLoading}
        currentVersion={document.definition.version}
        items={versionHistoryItems}
        selectedVersion={versionHistorySelectedVersion}
        errorMessage={versionHistoryErrorMessage}
        diff={versionHistoryDiff}
        diffUnavailableReason={versionHistoryDiffUnavailableReason}
        onSelectVersion={(version) => {
          void onSelectVersionHistoryVersion(version)
        }}
        onRestoreSelected={() => {
          void onRestoreSelectedVersion()
        }}
        onClose={() => setVersionHistoryOpen(false)}
      />
      <ConflictResolutionModal
        open={Boolean(pendingConflict)}
        machineId={pendingConflict?.machineId ?? machineID}
        expectedVersion={pendingConflict?.expectedVersion}
        actualVersion={pendingConflict?.actualVersion}
        conflictPaths={pendingConflict?.conflictPaths}
        busy={resolvingConflict}
        onResolve={(choice) => {
          void onResolveConflict(choice)
        }}
        onClose={() => {
          if (resolvingConflict) {
            return
          }
          setPendingConflict(null)
        }}
      />
    </>
  )
}

export function FSMUIBuilder(props: FSMUIBuilderProps) {
  const initialDocument = useMemo(
    () => loadDraftDocumentForEditing(normalizeInitialDocumentInput(props.initialDocument)),
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

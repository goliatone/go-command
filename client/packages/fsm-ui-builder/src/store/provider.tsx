import { createContext, useContext, useRef, type PropsWithChildren } from "react"
import { useStore } from "zustand"

import type { DraftMachineDocument, ValidationDiagnostic } from "../contracts"
import { createMachineStore, type MachineStore, type MachineStoreState } from "./machineStore"
import { createSimulationStore, type SimulationStore, type SimulationStoreState } from "./simulationStore"
import { createUIStore, type UIStore, type UIStoreState } from "./uiStore"

const MachineStoreContext = createContext<MachineStore | null>(null)
const UIStoreContext = createContext<UIStore | null>(null)
const SimulationStoreContext = createContext<SimulationStore | null>(null)

export interface BuilderStoresProviderProps {
  initialDocument?: DraftMachineDocument
  initialDiagnostics?: ValidationDiagnostic[]
}

export function BuilderStoresProvider(
  props: PropsWithChildren<BuilderStoresProviderProps>
) {
  const machineStoreRef = useRef<MachineStore | null>(null)
  const uiStoreRef = useRef<UIStore | null>(null)
  const simulationStoreRef = useRef<SimulationStore | null>(null)

  if (!machineStoreRef.current) {
    machineStoreRef.current = createMachineStore({
      document: props.initialDocument,
      diagnostics: props.initialDiagnostics
    })
  }
  if (!uiStoreRef.current) {
    uiStoreRef.current = createUIStore()
  }
  if (!simulationStoreRef.current) {
    simulationStoreRef.current = createSimulationStore()
  }

  return (
    <MachineStoreContext.Provider value={machineStoreRef.current}>
      <UIStoreContext.Provider value={uiStoreRef.current}>
        <SimulationStoreContext.Provider value={simulationStoreRef.current}>
          {props.children}
        </SimulationStoreContext.Provider>
      </UIStoreContext.Provider>
    </MachineStoreContext.Provider>
  )
}

function useRequiredContext<T>(contextValue: T | null, message: string): T {
  if (!contextValue) {
    throw new Error(message)
  }
  return contextValue
}

export function useMachineStore<T>(selector: (state: MachineStoreState) => T): T {
  const store = useRequiredContext(
    useContext(MachineStoreContext),
    "Machine store context is missing. Wrap with BuilderStoresProvider."
  )
  return useStore(store, selector)
}

export function useUIStore<T>(selector: (state: UIStoreState) => T): T {
  const store = useRequiredContext(
    useContext(UIStoreContext),
    "UI store context is missing. Wrap with BuilderStoresProvider."
  )
  return useStore(store, selector)
}

export function useSimulationStore<T>(selector: (state: SimulationStoreState) => T): T {
  const store = useRequiredContext(
    useContext(SimulationStoreContext),
    "Simulation store context is missing. Wrap with BuilderStoresProvider."
  )
  return useStore(store, selector)
}

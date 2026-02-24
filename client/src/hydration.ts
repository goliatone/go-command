import { ClientFSM } from "./client_fsm";
import { normalizeSnapshot } from "./normalize";
import type { ExecutionContext, Snapshot, Transport } from "./types";

export const FSM_HYDRATION_KEY = "__FSM__";

type GlobalWithWindow = {
  window?: Record<string, unknown>;
} & Record<string, unknown>;

function resolveGlobalContainer(scope: unknown): Record<string, unknown> | null {
  if (!scope || typeof scope !== "object") {
    return null;
  }
  const root = scope as GlobalWithWindow;
  if (root.window && typeof root.window === "object") {
    return root.window;
  }
  return root;
}

function isHydrationSnapshotPayload(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const payload = value as Record<string, unknown>;
  const hasEntityID = typeof payload.entityId === "string" || typeof payload.EntityID === "string";
  const hasCurrentState =
    typeof payload.currentState === "string" || typeof payload.CurrentState === "string";
  const transitions = payload.allowedTransitions ?? payload.AllowedTransitions;

  return hasEntityID && hasCurrentState && Array.isArray(transitions);
}

export function readHydratedSnapshot(scope: unknown = globalThis): Snapshot | null {
  const container = resolveGlobalContainer(scope);
  if (!container || !(FSM_HYDRATION_KEY in container)) {
    return null;
  }

  const rawSnapshot = container[FSM_HYDRATION_KEY];
  if (!isHydrationSnapshotPayload(rawSnapshot)) {
    return null;
  }

  try {
    return normalizeSnapshot(rawSnapshot);
  } catch {
    return null;
  }
}

export interface BootstrapClientFSMOptions {
  machine: string;
  transport: Transport;
  defaultExecCtx?: ExecutionContext;
  scope?: unknown;
}

export function bootstrapClientFSM(options: BootstrapClientFSMOptions): ClientFSM | null {
  const snapshot = readHydratedSnapshot(options.scope ?? globalThis);
  if (!snapshot) {
    return null;
  }

  return new ClientFSM({
    machine: options.machine,
    snapshot,
    transport: options.transport,
    defaultExecCtx: options.defaultExecCtx
  });
}

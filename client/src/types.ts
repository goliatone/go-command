export type Metadata = Record<string, unknown>;

export interface ExecutionContext {
  actorId: string;
  roles: string[];
  tenant: string;
}

export interface TargetInfo {
  kind: string;
  to?: string;
  resolver?: string;
  resolved: boolean;
  resolvedTo?: string;
  candidates?: string[];
}

export interface TransitionInfo {
  id: string;
  event: string;
  target: TargetInfo;
  metadata?: Metadata;
}

export interface Snapshot {
  entityId: string;
  currentState: string;
  allowedTransitions: TransitionInfo[];
  metadata?: Metadata;
}

export interface CommandEffect {
  kind: "command";
  actionId: string;
  payload: Metadata;
  async: boolean;
  delayMs?: number;
  timeoutMs?: number;
  metadata?: Metadata;
}

export interface EmitEventEffect {
  kind: "emit_event";
  event: string;
  msg: unknown;
  metadata?: Metadata;
}

export type Effect = CommandEffect | EmitEventEffect;

export interface TransitionResult {
  previousState: string;
  currentState: string;
  effects: Effect[];
}

export interface ExecutionHandle {
  executionId: string;
  policy?: string;
  status: string;
  metadata?: Metadata;
}

export interface ApplyEventResponse {
  transition: TransitionResult;
  snapshot: Snapshot;
  execution?: ExecutionHandle;
}

export interface ApplyEventOptions {
  expectedState?: string;
  expectedVersion?: number;
}

export interface Transport {
  applyEvent(
    machine: string,
    entityId: string,
    event: string,
    payload: unknown,
    execCtx: ExecutionContext,
    options?: ApplyEventOptions,
  ): Promise<ApplyEventResponse>;
}

export interface WireExecutionContext {
  ActorID: string;
  Roles: string[];
  Tenant: string;
}

export interface WireApplyEventRequest {
  EntityID: string;
  Event: string;
  Msg: unknown;
  ExecCtx: WireExecutionContext;
  ExpectedState?: string;
  ExpectedVersion?: number;
}

export const DEFAULT_EXECUTION_CONTEXT: ExecutionContext = {
  actorId: "anonymous",
  roles: [],
  tenant: "default"
};

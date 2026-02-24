import type {
  ApplyEventResponse,
  CommandEffect,
  Effect,
  EmitEventEffect,
  ExecutionContext,
  ExecutionHandle,
  Metadata,
  Snapshot,
  TargetInfo,
  TransitionInfo,
  TransitionResult,
  WireApplyEventRequest,
  WireRPCApplyEventData,
  WireRPCRequestEnvelope,
  WireRPCRequestMeta,
  WireExecutionContext
} from "./types";

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function readString(record: Record<string, unknown>, keys: string[], fallback = ""): string {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string") {
      return value;
    }
  }
  return fallback;
}

function readNumber(record: Record<string, unknown>, keys: string[]): number | undefined {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }
  }
  return undefined;
}

function readBool(record: Record<string, unknown>, keys: string[], fallback = false): boolean {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "boolean") {
      return value;
    }
  }
  return fallback;
}

function readStringArray(record: Record<string, unknown>, keys: string[]): string[] | undefined {
  for (const key of keys) {
    const value = record[key];
    if (Array.isArray(value)) {
      return value.filter((entry): entry is string => typeof entry === "string");
    }
  }
  return undefined;
}

function readObject(record: Record<string, unknown>, keys: string[]): Metadata | undefined {
  for (const key of keys) {
    const value = record[key];
    const maybe = asRecord(value);
    if (maybe) {
      return { ...maybe };
    }
  }
  return undefined;
}

function toMilliseconds(duration: number | undefined): number | undefined {
  if (typeof duration !== "number") {
    return undefined;
  }
  return duration / 1_000_000;
}

export function toWireExecutionContext(execCtx: ExecutionContext): WireExecutionContext {
  return {
    ActorID: execCtx.actorId,
    Roles: [...execCtx.roles],
    Tenant: execCtx.tenant
  };
}

export function toWireRPCRequestMeta(execCtx: ExecutionContext): WireRPCRequestMeta {
  return {
    actorId: execCtx.actorId,
    roles: [...execCtx.roles],
    tenant: execCtx.tenant
  };
}

export function toWireApplyEventRequest(input: {
  entityId: string;
  event: string;
  payload: unknown;
  execCtx: ExecutionContext;
  expectedState?: string;
  expectedVersion?: number;
}): WireApplyEventRequest {
  const request: WireApplyEventRequest = {
    EntityID: input.entityId,
    Event: input.event,
    Msg: input.payload,
    ExecCtx: toWireExecutionContext(input.execCtx)
  };

  if (input.expectedState !== undefined) {
    request.ExpectedState = input.expectedState;
  }
  if (input.expectedVersion !== undefined) {
    request.ExpectedVersion = input.expectedVersion;
  }

  return request;
}

export function toWireRPCApplyEventRequest(input: {
  entityId: string;
  event: string;
  payload: unknown;
  execCtx: ExecutionContext;
  expectedState?: string;
  expectedVersion?: number;
}): WireRPCRequestEnvelope<WireRPCApplyEventData> {
  const data: WireRPCApplyEventData = {
    entityId: input.entityId,
    event: input.event,
    msg: input.payload
  };

  if (input.expectedState !== undefined) {
    data.expectedState = input.expectedState;
  }
  if (input.expectedVersion !== undefined) {
    data.expectedVersion = input.expectedVersion;
  }

  return {
    data,
    meta: toWireRPCRequestMeta(input.execCtx)
  };
}

export function normalizeExecutionContext(raw: unknown): ExecutionContext {
  const record = asRecord(raw) ?? {};
  const roles = readStringArray(record, ["roles", "Roles"]) ?? [];

  return {
    actorId: readString(record, ["actorId", "ActorID"]),
    roles,
    tenant: readString(record, ["tenant", "Tenant"])
  };
}

export function normalizeTargetInfo(raw: unknown): TargetInfo {
  const record = asRecord(raw) ?? {};
  return {
    kind: readString(record, ["kind", "Kind"]),
    to: readString(record, ["to", "To"]) || undefined,
    resolver: readString(record, ["resolver", "Resolver"]) || undefined,
    resolved: readBool(record, ["resolved", "Resolved"]),
    resolvedTo: readString(record, ["resolvedTo", "ResolvedTo"]) || undefined,
    candidates: readStringArray(record, ["candidates", "Candidates"])
  };
}

export function normalizeTransitionInfo(raw: unknown): TransitionInfo {
  const record = asRecord(raw) ?? {};
  return {
    id: readString(record, ["id", "ID"]),
    event: readString(record, ["event", "Event"]),
    target: normalizeTargetInfo(record.target ?? record.Target),
    metadata: readObject(record, ["metadata", "Metadata"])
  };
}

function normalizeEffect(raw: unknown): Effect {
  const record = asRecord(raw) ?? {};

  const explicitKind = readString(record, ["kind", "Kind"]);
  const actionID = readString(record, ["actionId", "ActionID"]);
  if (explicitKind === "command" || actionID !== "") {
    const delayMs = readNumber(record, ["delayMs", "DelayMs"]);
    const timeoutMs = readNumber(record, ["timeoutMs", "TimeoutMs"]);
    const delay = delayMs ?? toMilliseconds(readNumber(record, ["Delay", "delay"]));
    const timeout = timeoutMs ?? toMilliseconds(readNumber(record, ["Timeout", "timeout"]));

    const commandEffect: CommandEffect = {
      kind: "command",
      actionId: actionID,
      payload: readObject(record, ["payload", "Payload"]) ?? {},
      async: readBool(record, ["async", "Async"]),
      metadata: readObject(record, ["metadata", "Metadata"])
    };

    if (delay !== undefined) {
      commandEffect.delayMs = delay;
    }
    if (timeout !== undefined) {
      commandEffect.timeoutMs = timeout;
    }
    return commandEffect;
  }

  const emitEvent: EmitEventEffect = {
    kind: "emit_event",
    event: readString(record, ["event", "Event"]),
    msg: record.msg ?? record.Msg,
    metadata: readObject(record, ["metadata", "Metadata"])
  };
  return emitEvent;
}

export function normalizeTransitionResult(raw: unknown): TransitionResult {
  const record = asRecord(raw) ?? {};
  const effectsRaw = record.effects ?? record.Effects;
  const effects = Array.isArray(effectsRaw) ? effectsRaw.map((effect) => normalizeEffect(effect)) : [];

  return {
    previousState: readString(record, ["previousState", "PreviousState"]),
    currentState: readString(record, ["currentState", "CurrentState"]),
    effects
  };
}

export function normalizeSnapshot(raw: unknown): Snapshot {
  const record = asRecord(raw) ?? {};
  const transitionsRaw = record.allowedTransitions ?? record.AllowedTransitions;
  const transitions = Array.isArray(transitionsRaw)
    ? transitionsRaw.map((transition) => normalizeTransitionInfo(transition))
    : [];

  return {
    entityId: readString(record, ["entityId", "EntityID"]),
    currentState: readString(record, ["currentState", "CurrentState"]),
    allowedTransitions: transitions,
    metadata: readObject(record, ["metadata", "Metadata"])
  };
}

export function normalizeExecutionHandle(raw: unknown): ExecutionHandle {
  const record = asRecord(raw) ?? {};
  return {
    executionId: readString(record, ["executionId", "ExecutionID"]),
    policy: readString(record, ["policy", "Policy"]) || undefined,
    status: readString(record, ["status", "Status"]),
    metadata: readObject(record, ["metadata", "Metadata"])
  };
}

export function normalizeApplyEventResponse(raw: unknown): ApplyEventResponse {
  const outerRecord = asRecord(raw);
  if (outerRecord && (outerRecord.error ?? outerRecord.Error)) {
    throw new Error("rpc apply event response contains error envelope");
  }
  const maybeDataEnvelope = outerRecord
    ? asRecord(outerRecord.data ?? outerRecord.Data)
    : null;
  const record = maybeDataEnvelope ?? outerRecord;
  if (!record) {
    throw new Error("invalid apply event response: expected object envelope");
  }

  const transitionRaw = record.transition ?? record.Transition;
  const snapshotRaw = record.snapshot ?? record.Snapshot;
  if (!transitionRaw || !snapshotRaw) {
    throw new Error("invalid apply event response: transition and snapshot are required");
  }

  const executionRaw = record.execution ?? record.Execution;
  return {
    transition: normalizeTransitionResult(transitionRaw),
    snapshot: normalizeSnapshot(snapshotRaw),
    execution: executionRaw ? normalizeExecutionHandle(executionRaw) : undefined
  };
}

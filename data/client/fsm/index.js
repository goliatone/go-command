function i(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e) ? e : null;
}
function a(e, t, n = "") {
  for (const o of t) {
    const r = e[o];
    if (typeof r == "string")
      return r;
  }
  return n;
}
function y(e, t) {
  for (const n of t) {
    const o = e[n];
    if (typeof o == "number" && Number.isFinite(o))
      return o;
  }
}
function m(e, t, n = !1) {
  for (const o of t) {
    const r = e[o];
    if (typeof r == "boolean")
      return r;
  }
  return n;
}
function w(e, t) {
  for (const n of t) {
    const o = e[n];
    if (typeof o == "boolean")
      return o;
  }
}
function S(e, t) {
  for (const n of t) {
    const o = e[n];
    if (Array.isArray(o))
      return o.filter((r) => typeof r == "string");
  }
}
function u(e, t) {
  for (const n of t) {
    const o = e[n], r = i(o);
    if (r)
      return { ...r };
  }
}
function v(e) {
  if (typeof e == "number")
    return e / 1e6;
}
function R(e) {
  return {
    ActorID: e.actorId,
    Roles: [...e.roles],
    Tenant: e.tenant
  };
}
function T(e) {
  return {
    actorId: e.actorId,
    roles: [...e.roles],
    tenant: e.tenant
  };
}
function g(e) {
  const t = {
    EntityID: e.entityId,
    Event: e.event,
    Msg: e.payload,
    ExecCtx: R(e.execCtx)
  };
  return e.expectedState !== void 0 && (t.ExpectedState = e.expectedState), e.expectedVersion !== void 0 && (t.ExpectedVersion = e.expectedVersion), t;
}
function P(e) {
  const t = {
    entityId: e.entityId,
    event: e.event,
    msg: e.payload
  };
  return e.expectedState !== void 0 && (t.expectedState = e.expectedState), e.expectedVersion !== void 0 && (t.expectedVersion = e.expectedVersion), {
    data: t,
    meta: T(e.execCtx)
  };
}
function F(e) {
  const t = i(e) ?? {}, n = S(t, ["roles", "Roles"]) ?? [];
  return {
    actorId: a(t, ["actorId", "ActorID"]),
    roles: n,
    tenant: a(t, ["tenant", "Tenant"])
  };
}
function A(e) {
  const t = i(e) ?? {};
  return {
    kind: a(t, ["kind", "Kind"]),
    to: a(t, ["to", "To"]) || void 0,
    resolver: a(t, ["resolver", "Resolver"]) || void 0,
    resolved: m(t, ["resolved", "Resolved"]),
    resolvedTo: a(t, ["resolvedTo", "ResolvedTo"]) || void 0,
    candidates: S(t, ["candidates", "Candidates"])
  };
}
function b(e) {
  const t = i(e) ?? {}, n = t.rejections ?? t.Rejections, o = Array.isArray(n) ? n.map((r) => M(r)) : void 0;
  return {
    id: a(t, ["id", "ID"]),
    event: a(t, ["event", "Event"]),
    target: A(t.target ?? t.Target),
    allowed: m(t, ["allowed", "Allowed"], !0),
    rejections: o,
    metadata: u(t, ["metadata", "Metadata"])
  };
}
function M(e) {
  const t = i(e) ?? {};
  return {
    code: a(t, ["code", "Code"]),
    category: a(t, ["category", "Category"]),
    retryable: m(t, ["retryable", "Retryable"]),
    requiresAction: m(t, ["requiresAction", "RequiresAction"]),
    message: a(t, ["message", "Message"]),
    remediationHint: a(t, ["remediationHint", "RemediationHint"]) || void 0,
    metadata: u(t, ["metadata", "Metadata"])
  };
}
function C(e) {
  const t = i(e) ?? {}, n = a(t, ["kind", "Kind"]), o = a(t, ["actionId", "ActionID"]);
  if (n === "command" || o !== "") {
    const s = y(t, ["delayMs", "DelayMs"]), d = y(t, ["timeoutMs", "TimeoutMs"]), c = s ?? v(y(t, ["Delay", "delay"])), l = d ?? v(y(t, ["Timeout", "timeout"])), f = {
      kind: "command",
      actionId: o,
      payload: u(t, ["payload", "Payload"]) ?? {},
      async: m(t, ["async", "Async"]),
      metadata: u(t, ["metadata", "Metadata"])
    };
    return c !== void 0 && (f.delayMs = c), l !== void 0 && (f.timeoutMs = l), f;
  }
  return {
    kind: "emit_event",
    event: a(t, ["event", "Event"]),
    msg: t.msg ?? t.Msg,
    metadata: u(t, ["metadata", "Metadata"])
  };
}
function D(e) {
  const t = i(e) ?? {}, n = t.effects ?? t.Effects, o = Array.isArray(n) ? n.map((r) => C(r)) : [];
  return {
    previousState: a(t, ["previousState", "PreviousState"]),
    currentState: a(t, ["currentState", "CurrentState"]),
    effects: o
  };
}
function p(e) {
  const t = i(e) ?? {}, n = t.allowedTransitions ?? t.AllowedTransitions, o = Array.isArray(n) ? n.map((r) => b(r)) : [];
  return {
    entityId: a(t, ["entityId", "EntityID"]),
    currentState: a(t, ["currentState", "CurrentState"]),
    allowedTransitions: o,
    metadata: u(t, ["metadata", "Metadata"])
  };
}
function j(e) {
  const t = i(e) ?? {};
  return {
    executionId: a(t, ["executionId", "ExecutionID"]),
    policy: a(t, ["policy", "Policy"]) || void 0,
    status: a(t, ["status", "Status"]),
    metadata: u(t, ["metadata", "Metadata"])
  };
}
function k(e) {
  const t = i(e);
  if (t && (t.error ?? t.Error))
    throw new Error("rpc apply event response contains error envelope");
  const n = t ? i(t.result ?? t.Result) : null;
  if (n && (n.error ?? n.Error))
    throw new Error("rpc apply event response contains result error envelope");
  const o = t ? i(t.data ?? t.Data) : null, r = n ? i(n.data ?? n.Data) : null, s = o ?? r ?? n ?? t;
  if (!s)
    throw new Error("invalid apply event response: expected object envelope");
  const d = s.transition ?? s.Transition, c = s.snapshot ?? s.Snapshot;
  if (!d || !c)
    throw new Error("invalid apply event response: transition and snapshot are required");
  const l = s.execution ?? s.Execution;
  return {
    eventId: a(s, ["eventId", "EventID"]),
    version: y(s, ["version", "Version"]) ?? 0,
    transition: D(d),
    snapshot: p(c),
    execution: l ? j(l) : void 0,
    idempotencyHit: w(s, ["idempotencyHit", "IdempotencyHit"])
  };
}
const H = {
  actorId: "anonymous",
  roles: [],
  tenant: "default"
};
class z {
  constructor(t) {
    this.options = t, this.snapshotState = p(t.snapshot), this.defaultExecCtx = t.defaultExecCtx ?? H;
  }
  snapshotState;
  defaultExecCtx;
  async dispatch(t, n = {}, o = this.defaultExecCtx, r = {}) {
    const s = await this.options.transport.applyEvent(
      this.options.machine,
      this.snapshotState.entityId,
      t,
      n,
      o,
      r
    );
    return this.snapshotState = p(s.snapshot), s;
  }
  get state() {
    return this.snapshotState.currentState;
  }
  get allowedTransitions() {
    return this.snapshotState.allowedTransitions;
  }
  get snapshot() {
    return p(this.snapshotState);
  }
  replaceSnapshot(t) {
    this.snapshotState = p(t);
  }
}
const E = "__FSM__";
function V(e) {
  if (!e || typeof e != "object")
    return null;
  const t = e;
  return t.window && typeof t.window == "object" ? t.window : t;
}
function _(e) {
  if (!e || typeof e != "object" || Array.isArray(e))
    return !1;
  const t = e, n = typeof t.entityId == "string" || typeof t.EntityID == "string", o = typeof t.currentState == "string" || typeof t.CurrentState == "string", r = t.allowedTransitions ?? t.AllowedTransitions;
  return n && o && Array.isArray(r);
}
function q(e = globalThis) {
  const t = V(e);
  if (!t || !(E in t))
    return null;
  const n = t[E];
  if (!_(n))
    return null;
  try {
    return p(n);
  } catch {
    return null;
  }
}
function N(e) {
  const t = q(e.scope ?? globalThis);
  return t ? new z({
    machine: e.machine,
    snapshot: t,
    transport: e.transport,
    defaultExecCtx: e.defaultExecCtx
  }) : null;
}
class O {
  constructor(t = {}) {
    this.options = t, this.fetchImpl = t.fetchImpl ?? fetch, this.endpoint = t.endpoint ?? ((n) => `/fsm/${encodeURIComponent(n)}/apply-event`);
  }
  fetchImpl;
  endpoint;
  async applyEvent(t, n, o, r, s, d = {}) {
    const c = typeof this.endpoint == "function" ? this.endpoint(t) : this.endpoint, l = this.options.baseUrl ? new URL(c, this.options.baseUrl).toString() : c, f = g({
      entityId: n,
      event: o,
      payload: r,
      execCtx: s,
      expectedState: d.expectedState,
      expectedVersion: d.expectedVersion
    }), h = await this.fetchImpl(l, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...this.options.headers ?? {}
      },
      body: JSON.stringify(f)
    });
    if (!h.ok) {
      const I = await h.text().catch(() => "");
      throw new Error(`rest applyEvent failed (${h.status}): ${I}`);
    }
    const x = await h.json();
    return k(x);
  }
}
export {
  z as ClientFSM,
  H as DEFAULT_EXECUTION_CONTEXT,
  E as FSM_HYDRATION_KEY,
  O as RESTTransport,
  N as bootstrapClientFSM,
  k as normalizeApplyEventResponse,
  F as normalizeExecutionContext,
  j as normalizeExecutionHandle,
  p as normalizeSnapshot,
  A as normalizeTargetInfo,
  b as normalizeTransitionInfo,
  D as normalizeTransitionResult,
  q as readHydratedSnapshot,
  g as toWireApplyEventRequest,
  R as toWireExecutionContext,
  P as toWireRPCApplyEventRequest,
  T as toWireRPCRequestMeta
};

function s(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e) ? e : null;
}
function a(e, t, o = "") {
  for (const n of t) {
    const r = e[n];
    if (typeof r == "string")
      return r;
  }
  return o;
}
function h(e, t) {
  for (const o of t) {
    const n = e[o];
    if (typeof n == "number" && Number.isFinite(n))
      return n;
  }
}
function S(e, t, o = !1) {
  for (const n of t) {
    const r = e[n];
    if (typeof r == "boolean")
      return r;
  }
  return o;
}
function E(e, t) {
  for (const o of t) {
    const n = e[o];
    if (Array.isArray(n))
      return n.filter((r) => typeof r == "string");
  }
}
function l(e, t) {
  for (const o of t) {
    const n = e[o], r = s(n);
    if (r)
      return { ...r };
  }
}
function m(e) {
  if (typeof e == "number")
    return e / 1e6;
}
function w(e) {
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
    ExecCtx: w(e.execCtx)
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
  const t = s(e) ?? {}, o = E(t, ["roles", "Roles"]) ?? [];
  return {
    actorId: a(t, ["actorId", "ActorID"]),
    roles: o,
    tenant: a(t, ["tenant", "Tenant"])
  };
}
function A(e) {
  const t = s(e) ?? {};
  return {
    kind: a(t, ["kind", "Kind"]),
    to: a(t, ["to", "To"]) || void 0,
    resolver: a(t, ["resolver", "Resolver"]) || void 0,
    resolved: S(t, ["resolved", "Resolved"]),
    resolvedTo: a(t, ["resolvedTo", "ResolvedTo"]) || void 0,
    candidates: E(t, ["candidates", "Candidates"])
  };
}
function b(e) {
  const t = s(e) ?? {};
  return {
    id: a(t, ["id", "ID"]),
    event: a(t, ["event", "Event"]),
    target: A(t.target ?? t.Target),
    metadata: l(t, ["metadata", "Metadata"])
  };
}
function R(e) {
  const t = s(e) ?? {}, o = a(t, ["kind", "Kind"]), n = a(t, ["actionId", "ActionID"]);
  if (o === "command" || n !== "") {
    const i = h(t, ["delayMs", "DelayMs"]), c = h(t, ["timeoutMs", "TimeoutMs"]), u = i ?? m(h(t, ["Delay", "delay"])), p = c ?? m(h(t, ["Timeout", "timeout"])), f = {
      kind: "command",
      actionId: n,
      payload: l(t, ["payload", "Payload"]) ?? {},
      async: S(t, ["async", "Async"]),
      metadata: l(t, ["metadata", "Metadata"])
    };
    return u !== void 0 && (f.delayMs = u), p !== void 0 && (f.timeoutMs = p), f;
  }
  return {
    kind: "emit_event",
    event: a(t, ["event", "Event"]),
    msg: t.msg ?? t.Msg,
    metadata: l(t, ["metadata", "Metadata"])
  };
}
function M(e) {
  const t = s(e) ?? {}, o = t.effects ?? t.Effects, n = Array.isArray(o) ? o.map((r) => R(r)) : [];
  return {
    previousState: a(t, ["previousState", "PreviousState"]),
    currentState: a(t, ["currentState", "CurrentState"]),
    effects: n
  };
}
function d(e) {
  const t = s(e) ?? {}, o = t.allowedTransitions ?? t.AllowedTransitions, n = Array.isArray(o) ? o.map((r) => b(r)) : [];
  return {
    entityId: a(t, ["entityId", "EntityID"]),
    currentState: a(t, ["currentState", "CurrentState"]),
    allowedTransitions: n,
    metadata: l(t, ["metadata", "Metadata"])
  };
}
function C(e) {
  const t = s(e) ?? {};
  return {
    executionId: a(t, ["executionId", "ExecutionID"]),
    policy: a(t, ["policy", "Policy"]) || void 0,
    status: a(t, ["status", "Status"]),
    metadata: l(t, ["metadata", "Metadata"])
  };
}
function D(e) {
  const t = s(e);
  if (t && (t.error ?? t.Error))
    throw new Error("rpc apply event response contains error envelope");
  const n = (t ? s(t.data ?? t.Data) : null) ?? t;
  if (!n)
    throw new Error("invalid apply event response: expected object envelope");
  const r = n.transition ?? n.Transition, i = n.snapshot ?? n.Snapshot;
  if (!r || !i)
    throw new Error("invalid apply event response: transition and snapshot are required");
  const c = n.execution ?? n.Execution;
  return {
    transition: M(r),
    snapshot: d(i),
    execution: c ? C(c) : void 0
  };
}
const k = {
  actorId: "anonymous",
  roles: [],
  tenant: "default"
};
class j {
  constructor(t) {
    this.options = t, this.snapshotState = d(t.snapshot), this.defaultExecCtx = t.defaultExecCtx ?? k;
  }
  snapshotState;
  defaultExecCtx;
  async dispatch(t, o = {}, n = this.defaultExecCtx, r = {}) {
    const i = await this.options.transport.applyEvent(
      this.options.machine,
      this.snapshotState.entityId,
      t,
      o,
      n,
      r
    );
    return this.snapshotState = d(i.snapshot), i;
  }
  get state() {
    return this.snapshotState.currentState;
  }
  get allowedTransitions() {
    return this.snapshotState.allowedTransitions;
  }
  get snapshot() {
    return d(this.snapshotState);
  }
  replaceSnapshot(t) {
    this.snapshotState = d(t);
  }
}
const v = "__FSM__";
function _(e) {
  if (!e || typeof e != "object")
    return null;
  const t = e;
  return t.window && typeof t.window == "object" ? t.window : t;
}
function z(e) {
  if (!e || typeof e != "object" || Array.isArray(e))
    return !1;
  const t = e, o = typeof t.entityId == "string" || typeof t.EntityID == "string", n = typeof t.currentState == "string" || typeof t.CurrentState == "string", r = t.allowedTransitions ?? t.AllowedTransitions;
  return o && n && Array.isArray(r);
}
function V(e = globalThis) {
  const t = _(e);
  if (!t || !(v in t))
    return null;
  const o = t[v];
  if (!z(o))
    return null;
  try {
    return d(o);
  } catch {
    return null;
  }
}
function N(e) {
  const t = V(e.scope ?? globalThis);
  return t ? new j({
    machine: e.machine,
    snapshot: t,
    transport: e.transport,
    defaultExecCtx: e.defaultExecCtx
  }) : null;
}
class U {
  constructor(t = {}) {
    this.options = t, this.fetchImpl = t.fetchImpl ?? fetch, this.endpoint = t.endpoint ?? ((o) => `/fsm/${encodeURIComponent(o)}/apply-event`);
  }
  fetchImpl;
  endpoint;
  async applyEvent(t, o, n, r, i, c = {}) {
    const u = typeof this.endpoint == "function" ? this.endpoint(t) : this.endpoint, p = this.options.baseUrl ? new URL(u, this.options.baseUrl).toString() : u, f = g({
      entityId: o,
      event: n,
      payload: r,
      execCtx: i,
      expectedState: c.expectedState,
      expectedVersion: c.expectedVersion
    }), y = await this.fetchImpl(p, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...this.options.headers ?? {}
      },
      body: JSON.stringify(f)
    });
    if (!y.ok) {
      const I = await y.text().catch(() => "");
      throw new Error(`rest applyEvent failed (${y.status}): ${I}`);
    }
    const x = await y.json();
    return D(x);
  }
}
export {
  j as ClientFSM,
  k as DEFAULT_EXECUTION_CONTEXT,
  v as FSM_HYDRATION_KEY,
  U as RESTTransport,
  N as bootstrapClientFSM,
  D as normalizeApplyEventResponse,
  F as normalizeExecutionContext,
  C as normalizeExecutionHandle,
  d as normalizeSnapshot,
  A as normalizeTargetInfo,
  b as normalizeTransitionInfo,
  M as normalizeTransitionResult,
  V as readHydratedSnapshot,
  g as toWireApplyEventRequest,
  w as toWireExecutionContext,
  P as toWireRPCApplyEventRequest,
  T as toWireRPCRequestMeta
};

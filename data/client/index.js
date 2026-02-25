function c(e) {
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
function S(e, t, n = !1) {
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
    if (Array.isArray(o))
      return o.filter((r) => typeof r == "string");
  }
}
function h(e, t) {
  for (const n of t) {
    const o = e[n], r = c(o);
    if (r)
      return { ...r };
  }
}
function E(e) {
  if (typeof e == "number")
    return e / 1e6;
}
function k(e) {
  return {
    ActorID: e.actorId,
    Roles: [...e.roles],
    Tenant: e.tenant
  };
}
function b(e) {
  return {
    actorId: e.actorId,
    roles: [...e.roles],
    tenant: e.tenant
  };
}
function M(e) {
  const t = {
    EntityID: e.entityId,
    Event: e.event,
    Msg: e.payload,
    ExecCtx: k(e.execCtx)
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
    meta: b(e.execCtx)
  };
}
function U(e) {
  const t = c(e) ?? {}, n = w(t, ["roles", "Roles"]) ?? [];
  return {
    actorId: a(t, ["actorId", "ActorID"]),
    roles: n,
    tenant: a(t, ["tenant", "Tenant"])
  };
}
function A(e) {
  const t = c(e) ?? {};
  return {
    kind: a(t, ["kind", "Kind"]),
    to: a(t, ["to", "To"]) || void 0,
    resolver: a(t, ["resolver", "Resolver"]) || void 0,
    resolved: S(t, ["resolved", "Resolved"]),
    resolvedTo: a(t, ["resolvedTo", "ResolvedTo"]) || void 0,
    candidates: w(t, ["candidates", "Candidates"])
  };
}
function D(e) {
  const t = c(e) ?? {};
  return {
    id: a(t, ["id", "ID"]),
    event: a(t, ["event", "Event"]),
    target: A(t.target ?? t.Target),
    metadata: h(t, ["metadata", "Metadata"])
  };
}
function j(e) {
  const t = c(e) ?? {}, n = a(t, ["kind", "Kind"]), o = a(t, ["actionId", "ActionID"]);
  if (n === "command" || o !== "") {
    const s = y(t, ["delayMs", "DelayMs"]), i = y(t, ["timeoutMs", "TimeoutMs"]), d = s ?? E(y(t, ["Delay", "delay"])), u = i ?? E(y(t, ["Timeout", "timeout"])), l = {
      kind: "command",
      actionId: o,
      payload: h(t, ["payload", "Payload"]) ?? {},
      async: S(t, ["async", "Async"]),
      metadata: h(t, ["metadata", "Metadata"])
    };
    return d !== void 0 && (l.delayMs = d), u !== void 0 && (l.timeoutMs = u), l;
  }
  return {
    kind: "emit_event",
    event: a(t, ["event", "Event"]),
    msg: t.msg ?? t.Msg,
    metadata: h(t, ["metadata", "Metadata"])
  };
}
function q(e) {
  const t = c(e) ?? {}, n = t.effects ?? t.Effects, o = Array.isArray(n) ? n.map((r) => j(r)) : [];
  return {
    previousState: a(t, ["previousState", "PreviousState"]),
    currentState: a(t, ["currentState", "CurrentState"]),
    effects: o
  };
}
function p(e) {
  const t = c(e) ?? {}, n = t.allowedTransitions ?? t.AllowedTransitions, o = Array.isArray(n) ? n.map((r) => D(r)) : [];
  return {
    entityId: a(t, ["entityId", "EntityID"]),
    currentState: a(t, ["currentState", "CurrentState"]),
    allowedTransitions: o,
    metadata: h(t, ["metadata", "Metadata"])
  };
}
function F(e) {
  const t = c(e) ?? {};
  return {
    executionId: a(t, ["executionId", "ExecutionID"]),
    policy: a(t, ["policy", "Policy"]) || void 0,
    status: a(t, ["status", "Status"]),
    metadata: h(t, ["metadata", "Metadata"])
  };
}
function x(e) {
  const t = c(e);
  if (t && (t.error ?? t.Error))
    throw new Error("rpc apply event response contains error envelope");
  const o = (t ? c(t.data ?? t.Data) : null) ?? t;
  if (!o)
    throw new Error("invalid apply event response: expected object envelope");
  const r = o.transition ?? o.Transition, s = o.snapshot ?? o.Snapshot;
  if (!r || !s)
    throw new Error("invalid apply event response: transition and snapshot are required");
  const i = o.execution ?? o.Execution;
  return {
    transition: q(r),
    snapshot: p(s),
    execution: i ? F(i) : void 0
  };
}
const O = {
  actorId: "anonymous",
  roles: [],
  tenant: "default"
};
class V {
  constructor(t) {
    this.options = t, this.snapshotState = p(t.snapshot), this.defaultExecCtx = t.defaultExecCtx ?? O;
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
const v = "__FSM__";
function _(e) {
  if (!e || typeof e != "object")
    return null;
  const t = e;
  return t.window && typeof t.window == "object" ? t.window : t;
}
function L(e) {
  if (!e || typeof e != "object" || Array.isArray(e))
    return !1;
  const t = e, n = typeof t.entityId == "string" || typeof t.EntityID == "string", o = typeof t.currentState == "string" || typeof t.CurrentState == "string", r = t.allowedTransitions ?? t.AllowedTransitions;
  return n && o && Array.isArray(r);
}
function N(e = globalThis) {
  const t = _(e);
  if (!t || !(v in t))
    return null;
  const n = t[v];
  if (!L(n))
    return null;
  try {
    return p(n);
  } catch {
    return null;
  }
}
function W(e) {
  const t = N(e.scope ?? globalThis);
  return t ? new V({
    machine: e.machine,
    snapshot: t,
    transport: e.transport,
    defaultExecCtx: e.defaultExecCtx
  }) : null;
}
class H {
  constructor(t = {}) {
    this.options = t, this.fetchImpl = t.fetchImpl ?? fetch, this.endpoint = t.endpoint ?? ((n) => `/fsm/${encodeURIComponent(n)}/apply-event`);
  }
  fetchImpl;
  endpoint;
  async applyEvent(t, n, o, r, s, i = {}) {
    const d = typeof this.endpoint == "function" ? this.endpoint(t) : this.endpoint, u = this.options.baseUrl ? new URL(d, this.options.baseUrl).toString() : d, l = M({
      entityId: n,
      event: o,
      payload: r,
      execCtx: s,
      expectedState: i.expectedState,
      expectedVersion: i.expectedVersion
    }), f = await this.fetchImpl(u, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...this.options.headers ?? {}
      },
      body: JSON.stringify(l)
    });
    if (!f.ok) {
      const R = await f.text().catch(() => "");
      throw new Error(`rest applyEvent failed (${f.status}): ${R}`);
    }
    const C = await f.json();
    return x(C);
  }
}
class J {
  constructor(t, n = {}) {
    this.client = t, this.method = n.method ?? "fsm.apply_event";
  }
  method;
  async applyEvent(t, n, o, r, s, i = {}) {
    const d = typeof this.method == "function" ? this.method(t) : this.method, u = P({
      entityId: n,
      event: o,
      payload: r,
      execCtx: s,
      expectedState: i.expectedState,
      expectedVersion: i.expectedVersion
    }), l = await this.client.call(d, u);
    return x(l);
  }
}
class K {
  constructor(t) {
    this.invoke = t;
  }
  call(t, n) {
    return this.invoke(t, n);
  }
}
class m extends Error {
  method;
  code;
  data;
  status;
  constructor(t) {
    super(t.message), this.name = "RPCClientError", this.method = t.method, this.code = t.code, this.data = t.data, this.status = t.status;
  }
}
function z() {
  return Math.random().toString(36).slice(2);
}
function g(e, t, n) {
  const o = {
    id: (n.idGenerator ?? z)(),
    method: e
  };
  return t !== void 0 && (o.params = t), n.rpcVersion === "2.0" && (o.jsonrpc = "2.0"), o;
}
function I(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}
function T(e, t) {
  if (!I(t))
    return t;
  if (t.error)
    throw new m({
      method: e,
      message: t.error.message || `rpc call failed: ${e}`,
      code: t.error.code,
      data: t.error.data
    });
  return "result" in t ? t.result : t;
}
class G {
  constructor(t) {
    this.options = t, this.fetchImpl = t.fetchImpl ?? fetch;
  }
  fetchImpl;
  async call(t, n) {
    const o = JSON.stringify(g(t, n, this.options)), r = await this.fetchImpl(this.options.endpoint, {
      ...this.options.requestInit,
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...this.options.headers ?? {}
      },
      body: o
    }), s = await r.json().catch(() => null);
    if (!r.ok)
      throw I(s) && s.error ? new m({
        method: t,
        message: s.error.message || `rpc call failed (${r.status})`,
        code: s.error.code,
        data: s.error.data,
        status: r.status
      }) : new m({
        method: t,
        message: `rpc call failed (${r.status})`,
        status: r.status,
        data: s
      });
    return T(t, s);
  }
}
const $ = 1;
class X {
  constructor(t, n = {}) {
    this.url = t, this.options = n, this.timeoutMs = n.requestTimeoutMs ?? 1e4, this.socketFactory = n.socketFactory ?? ((o, r) => new WebSocket(o, r));
  }
  socket = null;
  connectPromise = null;
  pending = /* @__PURE__ */ new Map();
  timeoutMs;
  socketFactory;
  async call(t, n) {
    if (await this.ensureConnected(), !this.socket)
      throw new Error("websocket rpc client is not connected");
    const o = g(t, n, this.options), r = new Promise((s, i) => {
      const d = setTimeout(() => {
        this.pending.delete(o.id), i(new Error(`websocket rpc request timed out (${this.timeoutMs}ms)`));
      }, this.timeoutMs);
      this.pending.set(o.id, { method: t, resolve: s, reject: i, timeout: d });
    });
    return this.socket.send(JSON.stringify(o)), r;
  }
  close(t, n) {
    this.socket?.close(t, n), this.socket = null, this.connectPromise = null;
  }
  async ensureConnected() {
    if (!(this.socket && this.socket.readyState === $))
      return this.connectPromise ? this.connectPromise : (this.connectPromise = new Promise((t, n) => {
        const o = this.socketFactory(this.url, this.options.protocols);
        this.socket = o;
        const r = () => {
          o.removeEventListener("open", r), o.removeEventListener("error", s), this.connectPromise = null, t();
        }, s = (i) => {
          o.removeEventListener("open", r), o.removeEventListener("error", s), this.connectPromise = null, n(i instanceof Error ? i : new Error("websocket rpc connection failed"));
        };
        o.addEventListener("open", r), o.addEventListener("error", s), o.addEventListener("message", (i) => this.onMessage(i)), o.addEventListener("close", () => this.onClose());
      }), this.connectPromise);
  }
  onClose() {
    for (const [t, n] of this.pending.entries())
      clearTimeout(n.timeout), n.reject(new Error(`websocket closed before response for request ${t}`));
    this.pending.clear();
  }
  onMessage(t) {
    if (typeof t.data != "string")
      return;
    let n;
    try {
      n = JSON.parse(t.data);
    } catch {
      return;
    }
    if (!n.id || !this.pending.has(n.id))
      return;
    const o = this.pending.get(n.id);
    this.pending.delete(n.id), clearTimeout(o.timeout);
    try {
      o.resolve(T(o.method, n));
    } catch (r) {
      o.reject(r);
    }
  }
}
export {
  V as ClientFSM,
  O as DEFAULT_EXECUTION_CONTEXT,
  v as FSM_HYDRATION_KEY,
  K as FunctionRPCClient,
  G as HTTPRPCClient,
  H as RESTTransport,
  m as RPCClientError,
  J as RPCTransport,
  X as WebSocketRPCClient,
  W as bootstrapClientFSM,
  z as defaultRPCID,
  T as extractRPCResult,
  x as normalizeApplyEventResponse,
  U as normalizeExecutionContext,
  F as normalizeExecutionHandle,
  p as normalizeSnapshot,
  A as normalizeTargetInfo,
  D as normalizeTransitionInfo,
  q as normalizeTransitionResult,
  N as readHydratedSnapshot,
  g as toRPCRequestEnvelope,
  M as toWireApplyEventRequest,
  k as toWireExecutionContext,
  P as toWireRPCApplyEventRequest,
  b as toWireRPCRequestMeta
};

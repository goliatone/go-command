function s(t) {
  return t !== null && typeof t == "object" && !Array.isArray(t) ? t : null;
}
function a(t, e, n = "") {
  for (const o of e) {
    const r = t[o];
    if (typeof r == "string")
      return r;
  }
  return n;
}
function y(t, e) {
  for (const n of e) {
    const o = t[n];
    if (typeof o == "number" && Number.isFinite(o))
      return o;
  }
}
function m(t, e, n = !1) {
  for (const o of e) {
    const r = t[o];
    if (typeof r == "boolean")
      return r;
  }
  return n;
}
function v(t, e) {
  for (const n of e) {
    const o = t[n];
    if (typeof o == "boolean")
      return o;
  }
}
function R(t, e) {
  for (const n of e) {
    const o = t[n];
    if (Array.isArray(o))
      return o.filter((r) => typeof r == "string");
  }
}
function u(t, e) {
  for (const n of e) {
    const o = t[n], r = s(o);
    if (r)
      return { ...r };
  }
}
function p(t) {
  if (typeof t == "number")
    return t / 1e6;
}
function E(t) {
  return {
    actorId: t.actorId,
    roles: [...t.roles],
    tenant: t.tenant
  };
}
function h(t) {
  const e = {
    entityId: t.entityId,
    event: t.event,
    msg: t.payload
  };
  return t.expectedState !== void 0 && (e.expectedState = t.expectedState), t.expectedVersion !== void 0 && (e.expectedVersion = t.expectedVersion), {
    data: e,
    meta: E(t.execCtx)
  };
}
function w(t) {
  const e = s(t) ?? {};
  return {
    kind: a(e, ["kind", "Kind"]),
    to: a(e, ["to", "To"]) || void 0,
    resolver: a(e, ["resolver", "Resolver"]) || void 0,
    resolved: m(e, ["resolved", "Resolved"]),
    resolvedTo: a(e, ["resolvedTo", "ResolvedTo"]) || void 0,
    candidates: R(e, ["candidates", "Candidates"])
  };
}
function I(t) {
  const e = s(t) ?? {}, n = e.rejections ?? e.Rejections, o = Array.isArray(n) ? n.map((r) => A(r)) : void 0;
  return {
    id: a(e, ["id", "ID"]),
    event: a(e, ["event", "Event"]),
    target: w(e.target ?? e.Target),
    allowed: m(e, ["allowed", "Allowed"], !0),
    rejections: o,
    metadata: u(e, ["metadata", "Metadata"])
  };
}
function A(t) {
  const e = s(t) ?? {};
  return {
    code: a(e, ["code", "Code"]),
    category: a(e, ["category", "Category"]),
    retryable: m(e, ["retryable", "Retryable"]),
    requiresAction: m(e, ["requiresAction", "RequiresAction"]),
    message: a(e, ["message", "Message"]),
    remediationHint: a(e, ["remediationHint", "RemediationHint"]) || void 0,
    metadata: u(e, ["metadata", "Metadata"])
  };
}
function x(t) {
  const e = s(t) ?? {}, n = a(e, ["kind", "Kind"]), o = a(e, ["actionId", "ActionID"]);
  if (n === "command" || o !== "") {
    const i = y(e, ["delayMs", "DelayMs"]), c = y(e, ["timeoutMs", "TimeoutMs"]), d = i ?? p(y(e, ["Delay", "delay"])), l = c ?? p(y(e, ["Timeout", "timeout"])), f = {
      kind: "command",
      actionId: o,
      payload: u(e, ["payload", "Payload"]) ?? {},
      async: m(e, ["async", "Async"]),
      metadata: u(e, ["metadata", "Metadata"])
    };
    return d !== void 0 && (f.delayMs = d), l !== void 0 && (f.timeoutMs = l), f;
  }
  return {
    kind: "emit_event",
    event: a(e, ["event", "Event"]),
    msg: e.msg ?? e.Msg,
    metadata: u(e, ["metadata", "Metadata"])
  };
}
function S(t) {
  const e = s(t) ?? {}, n = e.effects ?? e.Effects, o = Array.isArray(n) ? n.map((r) => x(r)) : [];
  return {
    previousState: a(e, ["previousState", "PreviousState"]),
    currentState: a(e, ["currentState", "CurrentState"]),
    effects: o
  };
}
function g(t) {
  const e = s(t) ?? {}, n = e.allowedTransitions ?? e.AllowedTransitions, o = Array.isArray(n) ? n.map((r) => I(r)) : [];
  return {
    entityId: a(e, ["entityId", "EntityID"]),
    currentState: a(e, ["currentState", "CurrentState"]),
    allowedTransitions: o,
    metadata: u(e, ["metadata", "Metadata"])
  };
}
function M(t) {
  const e = s(t) ?? {};
  return {
    executionId: a(e, ["executionId", "ExecutionID"]),
    policy: a(e, ["policy", "Policy"]) || void 0,
    status: a(e, ["status", "Status"]),
    metadata: u(e, ["metadata", "Metadata"])
  };
}
function b(t) {
  const e = s(t);
  if (e && (e.error ?? e.Error))
    throw new Error("rpc apply event response contains error envelope");
  const n = e ? s(e.result ?? e.Result) : null;
  if (n && (n.error ?? n.Error))
    throw new Error("rpc apply event response contains result error envelope");
  const o = e ? s(e.data ?? e.Data) : null, r = n ? s(n.data ?? n.Data) : null, i = o ?? r ?? n ?? e;
  if (!i)
    throw new Error("invalid apply event response: expected object envelope");
  const c = i.transition ?? i.Transition, d = i.snapshot ?? i.Snapshot;
  if (!c || !d)
    throw new Error("invalid apply event response: transition and snapshot are required");
  const l = i.execution ?? i.Execution;
  return {
    eventId: a(i, ["eventId", "EventID"]),
    version: y(i, ["version", "Version"]) ?? 0,
    transition: S(c),
    snapshot: g(d),
    execution: l ? M(l) : void 0,
    idempotencyHit: v(i, ["idempotencyHit", "IdempotencyHit"])
  };
}
class T {
  constructor(e, n = {}) {
    this.client = e, this.method = n.method ?? "fsm.apply_event";
  }
  method;
  async applyEvent(e, n, o, r, i, c = {}) {
    const d = typeof this.method == "function" ? this.method(e) : this.method, l = h({
      entityId: n,
      event: o,
      payload: r,
      execCtx: i,
      expectedState: c.expectedState,
      expectedVersion: c.expectedVersion
    }), f = await this.client.call(d, l);
    return b(f);
  }
}
export {
  T as RPCTransport
};

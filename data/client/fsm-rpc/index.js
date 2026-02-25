function i(e) {
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
function m(e, t) {
  for (const o of t) {
    const n = e[o];
    if (typeof n == "number" && Number.isFinite(n))
      return n;
  }
}
function p(e, t, o = !1) {
  for (const n of t) {
    const r = e[n];
    if (typeof r == "boolean")
      return r;
  }
  return o;
}
function v(e, t) {
  for (const o of t) {
    const n = e[o];
    if (Array.isArray(n))
      return n.filter((r) => typeof r == "string");
  }
}
function d(e, t) {
  for (const o of t) {
    const n = e[o], r = i(n);
    if (r)
      return { ...r };
  }
}
function y(e) {
  if (typeof e == "number")
    return e / 1e6;
}
function h(e) {
  return {
    actorId: e.actorId,
    roles: [...e.roles],
    tenant: e.tenant
  };
}
function E(e) {
  const t = {
    entityId: e.entityId,
    event: e.event,
    msg: e.payload
  };
  return e.expectedState !== void 0 && (t.expectedState = e.expectedState), e.expectedVersion !== void 0 && (t.expectedVersion = e.expectedVersion), {
    data: t,
    meta: h(e.execCtx)
  };
}
function x(e) {
  const t = i(e) ?? {};
  return {
    kind: a(t, ["kind", "Kind"]),
    to: a(t, ["to", "To"]) || void 0,
    resolver: a(t, ["resolver", "Resolver"]) || void 0,
    resolved: p(t, ["resolved", "Resolved"]),
    resolvedTo: a(t, ["resolvedTo", "ResolvedTo"]) || void 0,
    candidates: v(t, ["candidates", "Candidates"])
  };
}
function S(e) {
  const t = i(e) ?? {};
  return {
    id: a(t, ["id", "ID"]),
    event: a(t, ["event", "Event"]),
    target: x(t.target ?? t.Target),
    metadata: d(t, ["metadata", "Metadata"])
  };
}
function I(e) {
  const t = i(e) ?? {}, o = a(t, ["kind", "Kind"]), n = a(t, ["actionId", "ActionID"]);
  if (o === "command" || n !== "") {
    const c = m(t, ["delayMs", "DelayMs"]), s = m(t, ["timeoutMs", "TimeoutMs"]), l = c ?? y(m(t, ["Delay", "delay"])), f = s ?? y(m(t, ["Timeout", "timeout"])), u = {
      kind: "command",
      actionId: n,
      payload: d(t, ["payload", "Payload"]) ?? {},
      async: p(t, ["async", "Async"]),
      metadata: d(t, ["metadata", "Metadata"])
    };
    return l !== void 0 && (u.delayMs = l), f !== void 0 && (u.timeoutMs = f), u;
  }
  return {
    kind: "emit_event",
    event: a(t, ["event", "Event"]),
    msg: t.msg ?? t.Msg,
    metadata: d(t, ["metadata", "Metadata"])
  };
}
function R(e) {
  const t = i(e) ?? {}, o = t.effects ?? t.Effects, n = Array.isArray(o) ? o.map((r) => I(r)) : [];
  return {
    previousState: a(t, ["previousState", "PreviousState"]),
    currentState: a(t, ["currentState", "CurrentState"]),
    effects: n
  };
}
function M(e) {
  const t = i(e) ?? {}, o = t.allowedTransitions ?? t.AllowedTransitions, n = Array.isArray(o) ? o.map((r) => S(r)) : [];
  return {
    entityId: a(t, ["entityId", "EntityID"]),
    currentState: a(t, ["currentState", "CurrentState"]),
    allowedTransitions: n,
    metadata: d(t, ["metadata", "Metadata"])
  };
}
function w(e) {
  const t = i(e) ?? {};
  return {
    executionId: a(t, ["executionId", "ExecutionID"]),
    policy: a(t, ["policy", "Policy"]) || void 0,
    status: a(t, ["status", "Status"]),
    metadata: d(t, ["metadata", "Metadata"])
  };
}
function T(e) {
  const t = i(e);
  if (t && (t.error ?? t.Error))
    throw new Error("rpc apply event response contains error envelope");
  const n = (t ? i(t.data ?? t.Data) : null) ?? t;
  if (!n)
    throw new Error("invalid apply event response: expected object envelope");
  const r = n.transition ?? n.Transition, c = n.snapshot ?? n.Snapshot;
  if (!r || !c)
    throw new Error("invalid apply event response: transition and snapshot are required");
  const s = n.execution ?? n.Execution;
  return {
    transition: R(r),
    snapshot: M(c),
    execution: s ? w(s) : void 0
  };
}
class A {
  constructor(t, o = {}) {
    this.client = t, this.method = o.method ?? "fsm.apply_event";
  }
  method;
  async applyEvent(t, o, n, r, c, s = {}) {
    const l = typeof this.method == "function" ? this.method(t) : this.method, f = E({
      entityId: o,
      event: n,
      payload: r,
      execCtx: c,
      expectedState: s.expectedState,
      expectedVersion: s.expectedVersion
    }), u = await this.client.call(l, f);
    return T(u);
  }
}
export {
  A as RPCTransport
};

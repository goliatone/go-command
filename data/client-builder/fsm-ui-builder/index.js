function Av(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var ud = { exports: {} }, zr = {};
var py;
function nw() {
  if (py) return zr;
  py = 1;
  var t = /* @__PURE__ */ Symbol.for("react.transitional.element"), i = /* @__PURE__ */ Symbol.for("react.fragment");
  function o(r, s, u) {
    var c = null;
    if (u !== void 0 && (c = "" + u), s.key !== void 0 && (c = "" + s.key), "key" in s) {
      u = {};
      for (var d in s)
        d !== "key" && (u[d] = s[d]);
    } else u = s;
    return s = u.ref, {
      $$typeof: t,
      type: r,
      key: c,
      ref: s !== void 0 ? s : null,
      props: u
    };
  }
  return zr.Fragment = i, zr.jsx = o, zr.jsxs = o, zr;
}
var yy;
function iw() {
  return yy || (yy = 1, ud.exports = nw()), ud.exports;
}
var x = iw(), cd = { exports: {} }, Me = {};
var vy;
function aw() {
  if (vy) return Me;
  vy = 1;
  var t = /* @__PURE__ */ Symbol.for("react.transitional.element"), i = /* @__PURE__ */ Symbol.for("react.portal"), o = /* @__PURE__ */ Symbol.for("react.fragment"), r = /* @__PURE__ */ Symbol.for("react.strict_mode"), s = /* @__PURE__ */ Symbol.for("react.profiler"), u = /* @__PURE__ */ Symbol.for("react.consumer"), c = /* @__PURE__ */ Symbol.for("react.context"), d = /* @__PURE__ */ Symbol.for("react.forward_ref"), m = /* @__PURE__ */ Symbol.for("react.suspense"), y = /* @__PURE__ */ Symbol.for("react.memo"), g = /* @__PURE__ */ Symbol.for("react.lazy"), p = /* @__PURE__ */ Symbol.for("react.activity"), v = Symbol.iterator;
  function b(D) {
    return D === null || typeof D != "object" ? null : (D = v && D[v] || D["@@iterator"], typeof D == "function" ? D : null);
  }
  var S = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, N = Object.assign, M = {};
  function T(D, V, ne) {
    this.props = D, this.context = V, this.refs = M, this.updater = ne || S;
  }
  T.prototype.isReactComponent = {}, T.prototype.setState = function(D, V) {
    if (typeof D != "object" && typeof D != "function" && D != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, D, V, "setState");
  }, T.prototype.forceUpdate = function(D) {
    this.updater.enqueueForceUpdate(this, D, "forceUpdate");
  };
  function O() {
  }
  O.prototype = T.prototype;
  function _(D, V, ne) {
    this.props = D, this.context = V, this.refs = M, this.updater = ne || S;
  }
  var C = _.prototype = new O();
  C.constructor = _, N(C, T.prototype), C.isPureReactComponent = !0;
  var k = Array.isArray;
  function L() {
  }
  var H = { H: null, A: null, T: null, S: null }, I = Object.prototype.hasOwnProperty;
  function ee(D, V, ne) {
    var B = ne.ref;
    return {
      $$typeof: t,
      type: D,
      key: V,
      ref: B !== void 0 ? B : null,
      props: ne
    };
  }
  function Q(D, V) {
    return ee(D.type, V, D.props);
  }
  function X(D) {
    return typeof D == "object" && D !== null && D.$$typeof === t;
  }
  function J(D) {
    var V = { "=": "=0", ":": "=2" };
    return "$" + D.replace(/[=:]/g, function(ne) {
      return V[ne];
    });
  }
  var G = /\/+/g;
  function j(D, V) {
    return typeof D == "object" && D !== null && D.key != null ? J("" + D.key) : V.toString(36);
  }
  function Y(D) {
    switch (D.status) {
      case "fulfilled":
        return D.value;
      case "rejected":
        throw D.reason;
      default:
        switch (typeof D.status == "string" ? D.then(L, L) : (D.status = "pending", D.then(
          function(V) {
            D.status === "pending" && (D.status = "fulfilled", D.value = V);
          },
          function(V) {
            D.status === "pending" && (D.status = "rejected", D.reason = V);
          }
        )), D.status) {
          case "fulfilled":
            return D.value;
          case "rejected":
            throw D.reason;
        }
    }
    throw D;
  }
  function A(D, V, ne, B, E) {
    var U = typeof D;
    (U === "undefined" || U === "boolean") && (D = null);
    var F = !1;
    if (D === null) F = !0;
    else
      switch (U) {
        case "bigint":
        case "string":
        case "number":
          F = !0;
          break;
        case "object":
          switch (D.$$typeof) {
            case t:
            case i:
              F = !0;
              break;
            case g:
              return F = D._init, A(
                F(D._payload),
                V,
                ne,
                B,
                E
              );
          }
      }
    if (F)
      return E = E(D), F = B === "" ? "." + j(D, 0) : B, k(E) ? (ne = "", F != null && (ne = F.replace(G, "$&/") + "/"), A(E, V, ne, "", function(se) {
        return se;
      })) : E != null && (X(E) && (E = Q(
        E,
        ne + (E.key == null || D && D.key === E.key ? "" : ("" + E.key).replace(
          G,
          "$&/"
        ) + "/") + F
      )), V.push(E)), 1;
    F = 0;
    var K = B === "" ? "." : B + ":";
    if (k(D))
      for (var Z = 0; Z < D.length; Z++)
        B = D[Z], U = K + j(B, Z), F += A(
          B,
          V,
          ne,
          U,
          E
        );
    else if (Z = b(D), typeof Z == "function")
      for (D = Z.call(D), Z = 0; !(B = D.next()).done; )
        B = B.value, U = K + j(B, Z++), F += A(
          B,
          V,
          ne,
          U,
          E
        );
    else if (U === "object") {
      if (typeof D.then == "function")
        return A(
          Y(D),
          V,
          ne,
          B,
          E
        );
      throw V = String(D), Error(
        "Objects are not valid as a React child (found: " + (V === "[object Object]" ? "object with keys {" + Object.keys(D).join(", ") + "}" : V) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return F;
  }
  function z(D, V, ne) {
    if (D == null) return D;
    var B = [], E = 0;
    return A(D, B, "", "", function(U) {
      return V.call(ne, U, E++);
    }), B;
  }
  function q(D) {
    if (D._status === -1) {
      var V = D._result;
      V = V(), V.then(
        function(ne) {
          (D._status === 0 || D._status === -1) && (D._status = 1, D._result = ne);
        },
        function(ne) {
          (D._status === 0 || D._status === -1) && (D._status = 2, D._result = ne);
        }
      ), D._status === -1 && (D._status = 0, D._result = V);
    }
    if (D._status === 1) return D._result.default;
    throw D._result;
  }
  var W = typeof reportError == "function" ? reportError : function(D) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var V = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof D == "object" && D !== null && typeof D.message == "string" ? String(D.message) : String(D),
        error: D
      });
      if (!window.dispatchEvent(V)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", D);
      return;
    }
    console.error(D);
  }, te = {
    map: z,
    forEach: function(D, V, ne) {
      z(
        D,
        function() {
          V.apply(this, arguments);
        },
        ne
      );
    },
    count: function(D) {
      var V = 0;
      return z(D, function() {
        V++;
      }), V;
    },
    toArray: function(D) {
      return z(D, function(V) {
        return V;
      }) || [];
    },
    only: function(D) {
      if (!X(D))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return D;
    }
  };
  return Me.Activity = p, Me.Children = te, Me.Component = T, Me.Fragment = o, Me.Profiler = s, Me.PureComponent = _, Me.StrictMode = r, Me.Suspense = m, Me.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = H, Me.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(D) {
      return H.H.useMemoCache(D);
    }
  }, Me.cache = function(D) {
    return function() {
      return D.apply(null, arguments);
    };
  }, Me.cacheSignal = function() {
    return null;
  }, Me.cloneElement = function(D, V, ne) {
    if (D == null)
      throw Error(
        "The argument must be a React element, but you passed " + D + "."
      );
    var B = N({}, D.props), E = D.key;
    if (V != null)
      for (U in V.key !== void 0 && (E = "" + V.key), V)
        !I.call(V, U) || U === "key" || U === "__self" || U === "__source" || U === "ref" && V.ref === void 0 || (B[U] = V[U]);
    var U = arguments.length - 2;
    if (U === 1) B.children = ne;
    else if (1 < U) {
      for (var F = Array(U), K = 0; K < U; K++)
        F[K] = arguments[K + 2];
      B.children = F;
    }
    return ee(D.type, E, B);
  }, Me.createContext = function(D) {
    return D = {
      $$typeof: c,
      _currentValue: D,
      _currentValue2: D,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, D.Provider = D, D.Consumer = {
      $$typeof: u,
      _context: D
    }, D;
  }, Me.createElement = function(D, V, ne) {
    var B, E = {}, U = null;
    if (V != null)
      for (B in V.key !== void 0 && (U = "" + V.key), V)
        I.call(V, B) && B !== "key" && B !== "__self" && B !== "__source" && (E[B] = V[B]);
    var F = arguments.length - 2;
    if (F === 1) E.children = ne;
    else if (1 < F) {
      for (var K = Array(F), Z = 0; Z < F; Z++)
        K[Z] = arguments[Z + 2];
      E.children = K;
    }
    if (D && D.defaultProps)
      for (B in F = D.defaultProps, F)
        E[B] === void 0 && (E[B] = F[B]);
    return ee(D, U, E);
  }, Me.createRef = function() {
    return { current: null };
  }, Me.forwardRef = function(D) {
    return { $$typeof: d, render: D };
  }, Me.isValidElement = X, Me.lazy = function(D) {
    return {
      $$typeof: g,
      _payload: { _status: -1, _result: D },
      _init: q
    };
  }, Me.memo = function(D, V) {
    return {
      $$typeof: y,
      type: D,
      compare: V === void 0 ? null : V
    };
  }, Me.startTransition = function(D) {
    var V = H.T, ne = {};
    H.T = ne;
    try {
      var B = D(), E = H.S;
      E !== null && E(ne, B), typeof B == "object" && B !== null && typeof B.then == "function" && B.then(L, W);
    } catch (U) {
      W(U);
    } finally {
      V !== null && ne.types !== null && (V.types = ne.types), H.T = V;
    }
  }, Me.unstable_useCacheRefresh = function() {
    return H.H.useCacheRefresh();
  }, Me.use = function(D) {
    return H.H.use(D);
  }, Me.useActionState = function(D, V, ne) {
    return H.H.useActionState(D, V, ne);
  }, Me.useCallback = function(D, V) {
    return H.H.useCallback(D, V);
  }, Me.useContext = function(D) {
    return H.H.useContext(D);
  }, Me.useDebugValue = function() {
  }, Me.useDeferredValue = function(D, V) {
    return H.H.useDeferredValue(D, V);
  }, Me.useEffect = function(D, V) {
    return H.H.useEffect(D, V);
  }, Me.useEffectEvent = function(D) {
    return H.H.useEffectEvent(D);
  }, Me.useId = function() {
    return H.H.useId();
  }, Me.useImperativeHandle = function(D, V, ne) {
    return H.H.useImperativeHandle(D, V, ne);
  }, Me.useInsertionEffect = function(D, V) {
    return H.H.useInsertionEffect(D, V);
  }, Me.useLayoutEffect = function(D, V) {
    return H.H.useLayoutEffect(D, V);
  }, Me.useMemo = function(D, V) {
    return H.H.useMemo(D, V);
  }, Me.useOptimistic = function(D, V) {
    return H.H.useOptimistic(D, V);
  }, Me.useReducer = function(D, V, ne) {
    return H.H.useReducer(D, V, ne);
  }, Me.useRef = function(D) {
    return H.H.useRef(D);
  }, Me.useState = function(D) {
    return H.H.useState(D);
  }, Me.useSyncExternalStore = function(D, V, ne) {
    return H.H.useSyncExternalStore(
      D,
      V,
      ne
    );
  }, Me.useTransition = function() {
    return H.H.useTransition();
  }, Me.version = "19.2.8", Me;
}
var by;
function cl() {
  return by || (by = 1, cd.exports = aw()), cd.exports;
}
var $ = cl();
const Ir = /* @__PURE__ */ Av($), xy = "/rpc", ow = "2.0", Gr = {
  applyEvent: "fsm.apply_event",
  snapshot: "fsm.snapshot"
}, po = {
  listMachines: "fsm.authoring.list_machines",
  getMachine: "fsm.authoring.get_machine",
  saveDraft: "fsm.authoring.save_draft",
  validate: "fsm.authoring.validate",
  publish: "fsm.authoring.publish",
  deleteMachine: "fsm.authoring.delete_machine"
}, fd = {
  export: "fsm.authoring.export",
  listVersions: "fsm.authoring.list_versions",
  getVersion: "fsm.authoring.get_version",
  diffVersions: "fsm.authoring.diff_versions"
}, Rn = {
  versionConflict: "FSM_VERSION_CONFLICT",
  idempotencyConflict: "FSM_IDEMPOTENCY_CONFLICT",
  guardRejected: "FSM_GUARD_REJECTED",
  invalidTransition: "FSM_INVALID_TRANSITION",
  stateNotFound: "FSM_STATE_NOT_FOUND",
  authoringNotFound: "FSM_AUTHORING_NOT_FOUND",
  authoringValidationFailed: "FSM_AUTHORING_VALIDATION_FAILED",
  internal: "FSM_INTERNAL"
};
class cu extends Error {
  method;
  code;
  data;
  status;
  constructor(i) {
    super(i.message), this.name = "RPCClientError", this.method = i.method, this.code = i.code, this.data = i.data, this.status = i.status;
  }
}
function rw() {
  return Math.random().toString(36).slice(2);
}
function lw(t, i, o) {
  const r = {
    id: (o.idGenerator ?? rw)(),
    method: t
  };
  return i !== void 0 && (r.params = i), o.rpcVersion === "2.0" && (r.jsonrpc = "2.0"), r;
}
function jv(t) {
  return !!t && typeof t == "object" && !Array.isArray(t);
}
function sw(t, i) {
  if (!jv(i))
    return i;
  if (i.error)
    throw new cu({
      method: t,
      message: i.error.message || `rpc call failed: ${t}`,
      code: i.error.code,
      data: i.error.data
    });
  return "result" in i ? i.result : i;
}
function uw() {
  if (typeof globalThis.fetch != "function")
    throw new Error("global fetch is unavailable; provide fetchImpl explicitly");
  return globalThis.fetch.bind(globalThis);
}
class cw {
  constructor(i) {
    this.options = i, this.fetchImpl = i.fetchImpl ?? uw();
  }
  options;
  fetchImpl;
  async call(i, o) {
    const r = JSON.stringify(lw(i, o, this.options)), s = await this.fetchImpl(this.options.endpoint, {
      ...this.options.requestInit,
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...this.options.headers ?? {}
      },
      body: r
    }), u = await s.json().catch(() => null);
    if (!s.ok)
      throw jv(u) && u.error ? new cu({
        method: i,
        message: u.error.message || `rpc call failed (${s.status})`,
        code: u.error.code,
        data: u.error.data,
        status: s.status
      }) : new cu({
        method: i,
        message: `rpc call failed (${s.status})`,
        status: s.status,
        data: u
      });
    return sw(i, u);
  }
}
class fu extends Error {
  method;
  envelope;
  constructor(i, o) {
    super(o.message), this.name = "BuilderResultError", this.method = i, this.envelope = o;
  }
}
function fw(t) {
  return t.replace(/\/+$/, "");
}
function dw(t) {
  return t.endpoint && t.endpoint.trim() !== "" ? t.endpoint : !t.origin || t.origin.trim() === "" ? xy : `${fw(t.origin)}${xy}`;
}
function hw(t = {}) {
  return new cw({
    endpoint: dw(t),
    rpcVersion: ow,
    headers: t.headers,
    fetchImpl: t.fetchImpl,
    requestInit: t.requestInit
  });
}
async function yn(t) {
  const i = {
    data: t.data,
    meta: t.meta
  }, o = await t.client.call(
    t.method,
    i
  );
  return mw(t.method, o);
}
function mw(t, i) {
  if (i.error)
    throw new fu(t, i.error);
  if (i.data === void 0)
    throw new Error(`rpc result missing data envelope for method ${t}`);
  return i.data;
}
function gw(t) {
  return {
    async listMachines(i, o) {
      return yn({
        client: t,
        method: po.listMachines,
        data: i,
        meta: o
      });
    },
    async getMachine(i, o) {
      return yn({
        client: t,
        method: po.getMachine,
        data: i,
        meta: o
      });
    },
    async saveDraft(i, o) {
      return yn({
        client: t,
        method: po.saveDraft,
        data: i,
        meta: o
      });
    },
    async validate(i, o) {
      return yn({
        client: t,
        method: po.validate,
        data: i,
        meta: o
      });
    },
    async publish(i, o) {
      return yn({
        client: t,
        method: po.publish,
        data: i,
        meta: o
      });
    },
    async deleteMachine(i, o) {
      return yn({
        client: t,
        method: po.deleteMachine,
        data: i,
        meta: o
      });
    },
    async listVersions(i, o) {
      return yn({
        client: t,
        method: fd.listVersions,
        data: i,
        meta: o
      });
    },
    async getVersion(i, o) {
      return yn({
        client: t,
        method: fd.getVersion,
        data: i,
        meta: o
      });
    },
    async diffVersions(i, o) {
      return yn({
        client: t,
        method: fd.diffVersions,
        data: i,
        meta: o
      });
    }
  };
}
function pw(t) {
  return $.useMemo(() => t ? gw(t) : null, [t]);
}
function yw(t) {
  return `${t.trim().replace(/[^a-zA-Z0-9_-]+/g, "-") || "machine"}.json`;
}
function vw(t) {
  return t.definition;
}
function bw(t, i) {
  if (typeof window > "u" || typeof document > "u")
    return;
  const o = new Blob([i], { type: "application/json;charset=utf-8" }), r = window.URL.createObjectURL(o), s = document.createElement("a");
  s.href = r, s.download = t, s.style.display = "none", document.body.appendChild(s), s.click(), document.body.removeChild(s), window.URL.revokeObjectURL(r);
}
function xw(t = {}) {
  return {
    async exportJSON({ machineId: i, draft: o }) {
      bw(yw(i), JSON.stringify(vw(o), null, 2));
    },
    exportRPC: t.exportRPC
  };
}
function Sw(t) {
  return !!t?.exportRPC;
}
const ww = ["step", "when"], Dv = ["parallel", "join", "batch", "compensation"];
function fl(t) {
  return ww.includes(t);
}
function Ov(t) {
  return Dv.includes(t);
}
function Ew(t) {
  const i = /* @__PURE__ */ new Set();
  for (const o of t.transitions)
    for (const r of o.workflow?.nodes ?? [])
      Ov(r.kind) && i.add(r.kind);
  return [...i];
}
function Qr() {
  return {
    definition: {
      id: "machine",
      name: "Machine",
      version: "v1",
      states: [{ name: "draft", initial: !0 }],
      transitions: []
    },
    ui_schema: {
      layout: "flow",
      nodes: [],
      edges: [],
      inspector: {},
      graph_layout: {}
    },
    draft_state: {
      is_draft: !0,
      last_saved_at: (/* @__PURE__ */ new Date(0)).toISOString()
    }
  };
}
function He(t) {
  if (typeof structuredClone == "function")
    try {
      return structuredClone(t);
    } catch {
    }
  return JSON.parse(JSON.stringify(t));
}
function Vr(t) {
  return JSON.stringify(t);
}
function dl(t) {
  return t !== null && typeof t == "object" && !Array.isArray(t) ? t : null;
}
function Sy(t) {
  const i = dl(t);
  return i ? Array.isArray(i.states) && Array.isArray(i.transitions) : !1;
}
function _w(t, i) {
  const o = dl(t);
  return o ? {
    is_draft: typeof o.is_draft == "boolean" ? o.is_draft : i.is_draft,
    last_saved_at: typeof o.last_saved_at == "string" && o.last_saved_at.trim() !== "" ? o.last_saved_at : i.last_saved_at
  } : He(i);
}
function Nw(t) {
  const i = Qr(), o = He(t);
  return {
    ...i,
    ...o,
    definition: He(o.definition),
    ui_schema: dl(o.ui_schema) ? He(o.ui_schema) : He(i.ui_schema),
    draft_state: _w(o.draft_state, i.draft_state)
  };
}
function Cw(t) {
  return {
    ...Qr(),
    definition: He(t)
  };
}
function Mw(t) {
  const i = dl(t);
  return i && "draft" in i ? i.draft : t;
}
function Tw(t) {
  const i = Mw(t), o = dl(i);
  return o ? Sy(o.definition) ? Nw(o) : Sy(i) ? Cw(i) : Qr() : Qr();
}
function wy(t) {
  const i = t.event || "(event)", o = t.to || t.dynamic_to?.resolver || "(target)";
  return `${i} -> ${o}`;
}
function Aw(t, i) {
  return t.filter((o) => zv(o, i));
}
function du(t, i, o) {
  return t.filter((r) => zv(r, i) ? r.field === o || r.path.endsWith(`.${o}`) : !1);
}
function zv(t, i) {
  const o = t.path;
  switch (i.kind) {
    case "machine":
      return !0;
    case "state": {
      const r = i.stateIndex;
      return o.includes(`states[${r}]`);
    }
    case "transition": {
      const r = i.transitionIndex;
      return o.includes(`transitions[${r}]`);
    }
    case "workflow-node": {
      const { transitionIndex: r, nodeIndex: s } = i;
      return o.includes(`transitions[${r}]`) && o.includes(`workflow.nodes[${s}]`);
    }
  }
}
function pa(t, i) {
  const o = t.match(i);
  if (!o?.[1])
    return null;
  const r = Number.parseInt(o[1], 10);
  return Number.isNaN(r) ? null : r;
}
function jw(t, i) {
  for (let o = 0; o < t.transitions.length; o += 1) {
    const r = t.transitions[o]?.workflow?.nodes ?? [];
    for (let s = 0; s < r.length; s += 1)
      if (r[s]?.id === i)
        return { kind: "workflow-node", transitionIndex: o, nodeIndex: s };
  }
  return null;
}
function Dw(t, i) {
  const o = t.transitions.findIndex((r) => r.id === i);
  return o === -1 ? null : { kind: "transition", transitionIndex: o };
}
function Ow(t, i) {
  const o = t.states.findIndex((r) => r.name === i);
  return o === -1 ? null : { kind: "state", stateIndex: o };
}
function zw(t, i) {
  if (i.node_id)
    return jw(t, i.node_id) || Dw(t, i.node_id) || Ow(t, i.node_id);
  const o = pa(i.path, /transitions\[(\d+)\]/), r = pa(i.path, /workflow\.nodes\[(\d+)\]/);
  if (o !== null && r !== null)
    return {
      kind: "workflow-node",
      transitionIndex: o,
      nodeIndex: r
    };
  const s = pa(i.path, /transitions\[(\d+)\]/);
  if (s !== null)
    return { kind: "transition", transitionIndex: s };
  const u = pa(i.path, /states\[(\d+)\]/);
  return u !== null ? { kind: "state", stateIndex: u } : null;
}
function Fr(t) {
  return [
    t.code,
    t.severity,
    t.message,
    t.path,
    t.node_id ?? "",
    t.field ?? ""
  ].join("|");
}
function hu(t) {
  const i = /* @__PURE__ */ new Map();
  for (const o of t)
    i.set(Fr(o), o);
  return [...i.values()];
}
function mu(t, i) {
  const o = Fr(t), r = Fr(i);
  return o === r ? 0 : o > r ? 1 : -1;
}
function Rw(t, i, o) {
  const r = i.node_id?.trim();
  if (r && o.has(r))
    return !0;
  const s = pa(i.path, /transitions\[(\d+)\]/);
  if (s !== null) {
    const c = t.transitions[s], d = c?.id?.trim();
    if (d && o.has(d))
      return !0;
    const m = pa(i.path, /workflow\.nodes\[(\d+)\]/);
    if (m !== null) {
      const y = c?.workflow?.nodes?.[m]?.id?.trim();
      if (y && o.has(y))
        return !0;
    }
  }
  const u = pa(i.path, /states\[(\d+)\]/);
  if (u !== null) {
    const c = t.states[u]?.name?.trim();
    if (c && o.has(c))
      return !0;
  }
  return !1;
}
function kw(t) {
  const i = new Set(t.scopeNodeIDs.map((r) => r.trim()).filter((r) => r !== ""));
  if (i.size === 0)
    return hu(t.scopedDiagnostics).sort(mu);
  const o = t.cachedDiagnostics.filter(
    (r) => !Rw(t.definition, r, i)
  );
  return hu([...o, ...t.scopedDiagnostics]).sort(mu);
}
function Hw(t, i) {
  const o = hu(t).sort(mu), r = hu(i).sort(mu);
  if (o.length !== r.length)
    return !1;
  for (let s = 0; s < o.length; s += 1)
    if (Fr(o[s]) !== Fr(r[s]))
      return !1;
  return !0;
}
function ri(t) {
  return {
    code: t.code,
    severity: "error",
    message: t.message,
    path: t.path,
    node_id: t.nodeID,
    field: t.field
  };
}
function Lw(t, i, o, r, s) {
  const u = `$.transitions[${i}].workflow.nodes[${r}]`;
  if (!fl(o.kind)) {
    const c = Ov(o.kind) ? `${o.kind} is unsupported in builder v1` : `unsupported workflow node kind ${o.kind}`;
    s.push(
      ri({
        code: "FSM002_INVALID_WORKFLOW_NODE",
        message: c,
        path: `${u}.kind`,
        nodeID: o.id,
        field: "kind"
      })
    );
    return;
  }
  if (o.kind === "step" && (o.step?.action_id?.trim() ?? "") === "" && s.push(
    ri({
      code: "FSM001_UNRESOLVED_ACTION",
      message: "step action_id is required",
      path: `${u}.step.action_id`,
      nodeID: o.id,
      field: "action_id"
    })
  ), o.kind === "when" && (o.expr?.trim() ?? "") === "" && s.push(
    ri({
      code: "FSM002_INVALID_WORKFLOW_NODE",
      message: "when node requires expression",
      path: `${u}.expr`,
      nodeID: o.id,
      field: "expr"
    })
  ), Array.isArray(o.next))
    for (const c of o.next)
      t.workflow.nodes.some((m) => m.id === c) || s.push(
        ri({
          code: "FSM002_INVALID_WORKFLOW_NODE",
          message: `workflow next references unknown node ${c}`,
          path: `${u}.next`,
          nodeID: o.id,
          field: "next"
        })
      );
}
function Rv(t) {
  const i = [];
  return t.states.forEach((o, r) => {
    (!o.name || o.name.trim() === "") && i.push(
      ri({
        code: "FSM003_UNKNOWN_STATE",
        message: "state name is required",
        path: `$.states[${r}].name`,
        field: "name"
      })
    );
  }), t.transitions.forEach((o, r) => {
    const s = `$.transitions[${r}]`;
    (!o.event || o.event.trim() === "") && i.push(
      ri({
        code: "FSM004_DUPLICATE_TRANSITION",
        message: "transition event is required",
        path: `${s}.event`,
        nodeID: o.id,
        field: "event"
      })
    ), (!o.from || o.from.trim() === "") && i.push(
      ri({
        code: "FSM003_UNKNOWN_STATE",
        message: "transition from is required",
        path: `${s}.from`,
        nodeID: o.id,
        field: "from"
      })
    );
    const u = !!(o.to && o.to.trim() !== ""), c = !!(o.dynamic_to?.resolver && o.dynamic_to.resolver.trim() !== "");
    if (u === c && i.push(
      ri({
        code: "FSM001_INVALID_TARGET",
        message: "transition target must define exactly one of to or dynamic resolver",
        path: `${s}.target`,
        nodeID: o.id,
        field: "target"
      })
    ), !o.workflow || o.workflow.nodes.length === 0) {
      i.push(
        ri({
          code: "FSM005_MISSING_WORKFLOW",
          message: "transition workflow requires at least one node",
          path: `${s}.workflow`,
          nodeID: o.id,
          field: "workflow"
        })
      );
      return;
    }
    o.workflow.nodes.forEach((d, m) => {
      Lw(o, r, d, m, i);
    });
  }), i;
}
const Bw = "fsm-ui-builder.autosave";
function qs() {
  return typeof window > "u" || typeof window.localStorage > "u" ? !1 : typeof window.localStorage.getItem == "function" && typeof window.localStorage.setItem == "function" && typeof window.localStorage.removeItem == "function";
}
function dd(t) {
  return t.trim();
}
function Ey(t) {
  if (!t)
    return null;
  try {
    const i = JSON.parse(t);
    return !i || typeof i != "object" || typeof i.machineId != "string" || !i.document || typeof i.updatedAt != "string" ? null : {
      machineId: i.machineId,
      updatedAt: i.updatedAt,
      document: He(i.document)
    };
  } catch {
    return null;
  }
}
function Iw(t, i) {
  return t.startsWith(`${i}:`);
}
function hd(t, i) {
  return `${t}:${i}`;
}
function Vw(t = Bw) {
  return {
    async list() {
      if (!qs())
        return [];
      const i = [];
      for (let o = 0; o < window.localStorage.length; o += 1) {
        const r = window.localStorage.key(o);
        if (!r || !Iw(r, t))
          continue;
        const s = Ey(window.localStorage.getItem(r));
        s && i.push({ machineId: s.machineId, updatedAt: s.updatedAt });
      }
      return i.sort((o, r) => r.updatedAt.localeCompare(o.updatedAt)), i;
    },
    async load(i) {
      const o = dd(i);
      if (o === "" || !qs())
        return null;
      const r = hd(t, o), s = Ey(window.localStorage.getItem(r));
      return s ? {
        machineId: s.machineId,
        updatedAt: s.updatedAt,
        document: He(s.document)
      } : null;
    },
    async save(i) {
      const o = dd(i.machineId);
      if (o === "" || !qs())
        return;
      const r = hd(t, o), s = {
        machineId: o,
        updatedAt: i.updatedAt,
        document: He(i.document)
      };
      window.localStorage.setItem(r, JSON.stringify(s));
    },
    async delete(i) {
      const o = dd(i);
      o === "" || !qs() || window.localStorage.removeItem(hd(t, o));
    }
  };
}
const _y = (t) => {
  let i;
  const o = /* @__PURE__ */ new Set(), r = (y, g) => {
    const p = typeof y == "function" ? y(i) : y;
    if (!Object.is(p, i)) {
      const v = i;
      i = g ?? (typeof p != "object" || p === null) ? p : Object.assign({}, i, p), o.forEach((b) => b(i, v));
    }
  }, s = () => i, d = { setState: r, getState: s, getInitialState: () => m, subscribe: (y) => (o.add(y), () => o.delete(y)) }, m = i = t(r, s, d);
  return d;
}, sh = ((t) => t ? _y(t) : _y), Uw = (t) => t;
function uh(t, i = Uw) {
  const o = Ir.useSyncExternalStore(
    t.subscribe,
    Ir.useCallback(() => i(t.getState()), [t, i]),
    Ir.useCallback(() => i(t.getInitialState()), [t, i])
  );
  return Ir.useDebugValue(o), o;
}
var kv = /* @__PURE__ */ Symbol.for("immer-nothing"), Ny = /* @__PURE__ */ Symbol.for("immer-draftable"), Pt = /* @__PURE__ */ Symbol.for("immer-state");
function bn(t, ...i) {
  throw new Error(
    `[Immer] minified error nr: ${t}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var Wr = Object.getPrototypeOf;
function No(t) {
  return !!t && !!t[Pt];
}
function Sa(t) {
  return t ? Hv(t) || Array.isArray(t) || !!t[Ny] || !!t.constructor?.[Ny] || hl(t) || Hu(t) : !1;
}
var Yw = Object.prototype.constructor.toString(), Cy = /* @__PURE__ */ new WeakMap();
function Hv(t) {
  if (!t || typeof t != "object")
    return !1;
  const i = Object.getPrototypeOf(t);
  if (i === null || i === Object.prototype)
    return !0;
  const o = Object.hasOwnProperty.call(i, "constructor") && i.constructor;
  if (o === Object)
    return !0;
  if (typeof o != "function")
    return !1;
  let r = Cy.get(o);
  return r === void 0 && (r = Function.toString.call(o), Cy.set(o, r)), r === Yw;
}
function gu(t, i, o = !0) {
  ku(t) === 0 ? (o ? Reflect.ownKeys(t) : Object.keys(t)).forEach((s) => {
    i(s, t[s], t);
  }) : t.forEach((r, s) => i(s, r, t));
}
function ku(t) {
  const i = t[Pt];
  return i ? i.type_ : Array.isArray(t) ? 1 : hl(t) ? 2 : Hu(t) ? 3 : 0;
}
function Id(t, i) {
  return ku(t) === 2 ? t.has(i) : Object.prototype.hasOwnProperty.call(t, i);
}
function Lv(t, i, o) {
  const r = ku(t);
  r === 2 ? t.set(i, o) : r === 3 ? t.add(o) : t[i] = o;
}
function qw(t, i) {
  return t === i ? t !== 0 || 1 / t === 1 / i : t !== t && i !== i;
}
function hl(t) {
  return t instanceof Map;
}
function Hu(t) {
  return t instanceof Set;
}
function ma(t) {
  return t.copy_ || t.base_;
}
function Vd(t, i) {
  if (hl(t))
    return new Map(t);
  if (Hu(t))
    return new Set(t);
  if (Array.isArray(t))
    return Array.prototype.slice.call(t);
  const o = Hv(t);
  if (i === !0 || i === "class_only" && !o) {
    const r = Object.getOwnPropertyDescriptors(t);
    delete r[Pt];
    let s = Reflect.ownKeys(r);
    for (let u = 0; u < s.length; u++) {
      const c = s[u], d = r[c];
      d.writable === !1 && (d.writable = !0, d.configurable = !0), (d.get || d.set) && (r[c] = {
        configurable: !0,
        writable: !0,
        // could live with !!desc.set as well here...
        enumerable: d.enumerable,
        value: t[c]
      });
    }
    return Object.create(Wr(t), r);
  } else {
    const r = Wr(t);
    if (r !== null && o)
      return { ...t };
    const s = Object.create(r);
    return Object.assign(s, t);
  }
}
function ch(t, i = !1) {
  return Lu(t) || No(t) || !Sa(t) || (ku(t) > 1 && Object.defineProperties(t, {
    set: $s,
    add: $s,
    clear: $s,
    delete: $s
  }), Object.freeze(t), i && Object.values(t).forEach((o) => ch(o, !0))), t;
}
function $w() {
  bn(2);
}
var $s = {
  value: $w
};
function Lu(t) {
  return t === null || typeof t != "object" ? !0 : Object.isFrozen(t);
}
var Xw = {};
function wa(t) {
  const i = Xw[t];
  return i || bn(0, t), i;
}
var Jr;
function Bv() {
  return Jr;
}
function Gw(t, i) {
  return {
    drafts_: [],
    parent_: t,
    immer_: i,
    // Whenever the modified draft contains a draft from another scope, we
    // need to prevent auto-freezing so the unowned draft can be finalized.
    canAutoFreeze_: !0,
    unfinalizedDrafts_: 0
  };
}
function My(t, i) {
  i && (wa("Patches"), t.patches_ = [], t.inversePatches_ = [], t.patchListener_ = i);
}
function Ud(t) {
  Yd(t), t.drafts_.forEach(Zw), t.drafts_ = null;
}
function Yd(t) {
  t === Jr && (Jr = t.parent_);
}
function Ty(t) {
  return Jr = Gw(Jr, t);
}
function Zw(t) {
  const i = t[Pt];
  i.type_ === 0 || i.type_ === 1 ? i.revoke_() : i.revoked_ = !0;
}
function Ay(t, i) {
  i.unfinalizedDrafts_ = i.drafts_.length;
  const o = i.drafts_[0];
  return t !== void 0 && t !== o ? (o[Pt].modified_ && (Ud(i), bn(4)), Sa(t) && (t = pu(i, t), i.parent_ || yu(i, t)), i.patches_ && wa("Patches").generateReplacementPatches_(
    o[Pt].base_,
    t,
    i.patches_,
    i.inversePatches_
  )) : t = pu(i, o, []), Ud(i), i.patches_ && i.patchListener_(i.patches_, i.inversePatches_), t !== kv ? t : void 0;
}
function pu(t, i, o) {
  if (Lu(i))
    return i;
  const r = t.immer_.shouldUseStrictIteration(), s = i[Pt];
  if (!s)
    return gu(
      i,
      (u, c) => jy(t, s, i, u, c, o),
      r
    ), i;
  if (s.scope_ !== t)
    return i;
  if (!s.modified_)
    return yu(t, s.base_, !0), s.base_;
  if (!s.finalized_) {
    s.finalized_ = !0, s.scope_.unfinalizedDrafts_--;
    const u = s.copy_;
    let c = u, d = !1;
    s.type_ === 3 && (c = new Set(u), u.clear(), d = !0), gu(
      c,
      (m, y) => jy(
        t,
        s,
        u,
        m,
        y,
        o,
        d
      ),
      r
    ), yu(t, u, !1), o && t.patches_ && wa("Patches").generatePatches_(
      s,
      o,
      t.patches_,
      t.inversePatches_
    );
  }
  return s.copy_;
}
function jy(t, i, o, r, s, u, c) {
  if (s == null || typeof s != "object" && !c)
    return;
  const d = Lu(s);
  if (!(d && !c)) {
    if (No(s)) {
      const m = u && i && i.type_ !== 3 && // Set objects are atomic since they have no keys.
      !Id(i.assigned_, r) ? u.concat(r) : void 0, y = pu(t, s, m);
      if (Lv(o, r, y), No(y))
        t.canAutoFreeze_ = !1;
      else
        return;
    } else c && o.add(s);
    if (Sa(s) && !d) {
      if (!t.immer_.autoFreeze_ && t.unfinalizedDrafts_ < 1 || i && i.base_ && i.base_[r] === s && d)
        return;
      pu(t, s), (!i || !i.scope_.parent_) && typeof r != "symbol" && (hl(o) ? o.has(r) : Object.prototype.propertyIsEnumerable.call(o, r)) && yu(t, s);
    }
  }
}
function yu(t, i, o = !1) {
  !t.parent_ && t.immer_.autoFreeze_ && t.canAutoFreeze_ && ch(i, o);
}
function Kw(t, i) {
  const o = Array.isArray(t), r = {
    type_: o ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: i ? i.scope_ : Bv(),
    // True for both shallow and deep changes.
    modified_: !1,
    // Used during finalization.
    finalized_: !1,
    // Track which properties have been assigned (true) or deleted (false).
    assigned_: {},
    // The parent draft state.
    parent_: i,
    // The base state.
    base_: t,
    // The base proxy.
    draft_: null,
    // set below
    // The base copy with any updated values.
    copy_: null,
    // Called by the `produce` function.
    revoke_: null,
    isManual_: !1
  };
  let s = r, u = fh;
  o && (s = [r], u = Pr);
  const { revoke: c, proxy: d } = Proxy.revocable(s, u);
  return r.draft_ = d, r.revoke_ = c, d;
}
var fh = {
  get(t, i) {
    if (i === Pt)
      return t;
    const o = ma(t);
    if (!Id(o, i))
      return Qw(t, o, i);
    const r = o[i];
    return t.finalized_ || !Sa(r) ? r : r === md(t.base_, i) ? (gd(t), t.copy_[i] = $d(r, t)) : r;
  },
  has(t, i) {
    return i in ma(t);
  },
  ownKeys(t) {
    return Reflect.ownKeys(ma(t));
  },
  set(t, i, o) {
    const r = Iv(ma(t), i);
    if (r?.set)
      return r.set.call(t.draft_, o), !0;
    if (!t.modified_) {
      const s = md(ma(t), i), u = s?.[Pt];
      if (u && u.base_ === o)
        return t.copy_[i] = o, t.assigned_[i] = !1, !0;
      if (qw(o, s) && (o !== void 0 || Id(t.base_, i)))
        return !0;
      gd(t), qd(t);
    }
    return t.copy_[i] === o && // special case: handle new props with value 'undefined'
    (o !== void 0 || i in t.copy_) || // special case: NaN
    Number.isNaN(o) && Number.isNaN(t.copy_[i]) || (t.copy_[i] = o, t.assigned_[i] = !0), !0;
  },
  deleteProperty(t, i) {
    return md(t.base_, i) !== void 0 || i in t.base_ ? (t.assigned_[i] = !1, gd(t), qd(t)) : delete t.assigned_[i], t.copy_ && delete t.copy_[i], !0;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(t, i) {
    const o = ma(t), r = Reflect.getOwnPropertyDescriptor(o, i);
    return r && {
      writable: !0,
      configurable: t.type_ !== 1 || i !== "length",
      enumerable: r.enumerable,
      value: o[i]
    };
  },
  defineProperty() {
    bn(11);
  },
  getPrototypeOf(t) {
    return Wr(t.base_);
  },
  setPrototypeOf() {
    bn(12);
  }
}, Pr = {};
gu(fh, (t, i) => {
  Pr[t] = function() {
    return arguments[0] = arguments[0][0], i.apply(this, arguments);
  };
});
Pr.deleteProperty = function(t, i) {
  return Pr.set.call(this, t, i, void 0);
};
Pr.set = function(t, i, o) {
  return fh.set.call(this, t[0], i, o, t[0]);
};
function md(t, i) {
  const o = t[Pt];
  return (o ? ma(o) : t)[i];
}
function Qw(t, i, o) {
  const r = Iv(i, o);
  return r ? "value" in r ? r.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    r.get?.call(t.draft_)
  ) : void 0;
}
function Iv(t, i) {
  if (!(i in t))
    return;
  let o = Wr(t);
  for (; o; ) {
    const r = Object.getOwnPropertyDescriptor(o, i);
    if (r)
      return r;
    o = Wr(o);
  }
}
function qd(t) {
  t.modified_ || (t.modified_ = !0, t.parent_ && qd(t.parent_));
}
function gd(t) {
  t.copy_ || (t.copy_ = Vd(
    t.base_,
    t.scope_.immer_.useStrictShallowCopy_
  ));
}
var Fw = class {
  constructor(t) {
    this.autoFreeze_ = !0, this.useStrictShallowCopy_ = !1, this.useStrictIteration_ = !0, this.produce = (i, o, r) => {
      if (typeof i == "function" && typeof o != "function") {
        const u = o;
        o = i;
        const c = this;
        return function(m = u, ...y) {
          return c.produce(m, (g) => o.call(this, g, ...y));
        };
      }
      typeof o != "function" && bn(6), r !== void 0 && typeof r != "function" && bn(7);
      let s;
      if (Sa(i)) {
        const u = Ty(this), c = $d(i, void 0);
        let d = !0;
        try {
          s = o(c), d = !1;
        } finally {
          d ? Ud(u) : Yd(u);
        }
        return My(u, r), Ay(s, u);
      } else if (!i || typeof i != "object") {
        if (s = o(i), s === void 0 && (s = i), s === kv && (s = void 0), this.autoFreeze_ && ch(s, !0), r) {
          const u = [], c = [];
          wa("Patches").generateReplacementPatches_(i, s, u, c), r(u, c);
        }
        return s;
      } else
        bn(1, i);
    }, this.produceWithPatches = (i, o) => {
      if (typeof i == "function")
        return (c, ...d) => this.produceWithPatches(c, (m) => i(m, ...d));
      let r, s;
      return [this.produce(i, o, (c, d) => {
        r = c, s = d;
      }), r, s];
    }, typeof t?.autoFreeze == "boolean" && this.setAutoFreeze(t.autoFreeze), typeof t?.useStrictShallowCopy == "boolean" && this.setUseStrictShallowCopy(t.useStrictShallowCopy), typeof t?.useStrictIteration == "boolean" && this.setUseStrictIteration(t.useStrictIteration);
  }
  createDraft(t) {
    Sa(t) || bn(8), No(t) && (t = Ww(t));
    const i = Ty(this), o = $d(t, void 0);
    return o[Pt].isManual_ = !0, Yd(i), o;
  }
  finishDraft(t, i) {
    const o = t && t[Pt];
    (!o || !o.isManual_) && bn(9);
    const { scope_: r } = o;
    return My(r, i), Ay(void 0, r);
  }
  /**
   * Pass true to automatically freeze all copies created by Immer.
   *
   * By default, auto-freezing is enabled.
   */
  setAutoFreeze(t) {
    this.autoFreeze_ = t;
  }
  /**
   * Pass true to enable strict shallow copy.
   *
   * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
   */
  setUseStrictShallowCopy(t) {
    this.useStrictShallowCopy_ = t;
  }
  /**
   * Pass false to use faster iteration that skips non-enumerable properties
   * but still handles symbols for compatibility.
   *
   * By default, strict iteration is enabled (includes all own properties).
   */
  setUseStrictIteration(t) {
    this.useStrictIteration_ = t;
  }
  shouldUseStrictIteration() {
    return this.useStrictIteration_;
  }
  applyPatches(t, i) {
    let o;
    for (o = i.length - 1; o >= 0; o--) {
      const s = i[o];
      if (s.path.length === 0 && s.op === "replace") {
        t = s.value;
        break;
      }
    }
    o > -1 && (i = i.slice(o + 1));
    const r = wa("Patches").applyPatches_;
    return No(t) ? r(t, i) : this.produce(
      t,
      (s) => r(s, i)
    );
  }
};
function $d(t, i) {
  const o = hl(t) ? wa("MapSet").proxyMap_(t, i) : Hu(t) ? wa("MapSet").proxySet_(t, i) : Kw(t, i);
  return (i ? i.scope_ : Bv()).drafts_.push(o), o;
}
function Ww(t) {
  return No(t) || bn(10, t), Vv(t);
}
function Vv(t) {
  if (!Sa(t) || Lu(t))
    return t;
  const i = t[Pt];
  let o, r = !0;
  if (i) {
    if (!i.modified_)
      return i.base_;
    i.finalized_ = !0, o = Vd(t, i.scope_.immer_.useStrictShallowCopy_), r = i.scope_.immer_.shouldUseStrictIteration();
  } else
    o = Vd(t, !0);
  return gu(
    o,
    (s, u) => {
      Lv(o, s, Vv(u));
    },
    r
  ), i && (i.finalized_ = !1), o;
}
var Jw = new Fw(), Uv = Jw.produce;
const Pw = "state-index-v1", Yv = "positions", eE = "key_strategy";
function Bu(t) {
  return t !== null && typeof t == "object" && !Array.isArray(t);
}
function Dy(t) {
  return typeof t == "number" && Number.isFinite(t);
}
function tE(t) {
  return !Bu(t) || !Dy(t.x) || !Dy(t.y) ? null : {
    x: t.x,
    y: t.y
  };
}
function En(t) {
  return `state:${t}`;
}
function qv(t) {
  return !t || !Bu(t.graph_layout) ? {} : t.graph_layout;
}
function vu(t) {
  const o = qv(t)[Yv];
  if (!Bu(o))
    return {};
  const r = {};
  for (const [s, u] of Object.entries(o)) {
    const c = tE(u);
    c && (r[s] = c);
  }
  return r;
}
function dh(t, i) {
  const o = Bu(t) ? { ...t } : {}, r = { ...qv(t) };
  return r[eE] = Pw, r[Yv] = i, o.graph_layout = r, o;
}
function nE(t, i) {
  const o = {};
  for (const [r, s] of Object.entries(t)) {
    if (!r.startsWith("state:")) {
      o[r] = s;
      continue;
    }
    const u = Number.parseInt(r.slice(6), 10);
    if (Number.isNaN(u)) {
      o[r] = s;
      continue;
    }
    if (u !== i) {
      if (u > i) {
        o[En(u - 1)] = s;
        continue;
      }
      o[r] = s;
    }
  }
  return o;
}
function iE(t, i, o) {
  if (i === o)
    return { ...t };
  const r = {};
  for (const [s, u] of Object.entries(t)) {
    if (!s.startsWith("state:")) {
      r[s] = u;
      continue;
    }
    const c = Number.parseInt(s.slice(6), 10);
    if (Number.isNaN(c)) {
      r[s] = u;
      continue;
    }
    if (c === i) {
      r[En(o)] = u;
      continue;
    }
    if (i < o && c > i && c <= o) {
      r[En(c - 1)] = u;
      continue;
    }
    if (i > o && c >= o && c < i) {
      r[En(c + 1)] = u;
      continue;
    }
    r[s] = u;
  }
  return r;
}
function Ur(t, i) {
  return i <= 0 ? 0 : Math.min(Math.max(0, t), i - 1);
}
function Oy(t, i, o) {
  if (i === o)
    return;
  const [r] = t.splice(i, 1);
  r !== void 0 && t.splice(o, 0, r);
}
function pd(t, i, o) {
  return t === i ? o : i < o && t > i && t <= o ? t - 1 : i > o && t >= o && t < i ? t + 1 : t;
}
function xo(t, i = []) {
  const o = Rv(t.definition);
  return i.length === 0 ? o : [...i, ...o];
}
function bu(t, i) {
  return `index:${i}`;
}
function aE(t) {
  const i = t.trim().replace(/\s+/g, "_");
  return i === "" ? "state" : i;
}
function zy(t, i, o) {
  const r = aE(i), s = new Set(t.states.map((d) => d.name));
  let u = Math.max(1, o), c = `${r}_${u}`;
  for (; s.has(c); )
    u += 1, c = `${r}_${u}`;
  return c;
}
function hh(t) {
  const i = /* @__PURE__ */ new Set();
  for (const o of t) {
    const r = o.trim();
    r !== "" && i.add(r);
  }
  return [...i];
}
function Ry(t) {
  if (!t)
    return [];
  const i = [t.id];
  for (const o of t.workflow?.nodes ?? [])
    i.push(o.id);
  return hh(i);
}
function oE(t, i) {
  return t.definition.states !== i.definition.states || t.definition.transitions !== i.definition.transitions;
}
function rE(t, i) {
  if (t.definition.states !== i.definition.states)
    return [];
  if (t.definition.transitions === i.definition.transitions)
    return [];
  const o = t.definition.transitions, r = i.definition.transitions, s = [], u = Math.max(o.length, r.length);
  for (let c = 0; c < u; c += 1) {
    const d = o[c], m = r[c];
    d !== m && (s.push(...Ry(d)), s.push(...Ry(m)));
  }
  return hh(s);
}
function Xs(t) {
  const i = {};
  return t.definition.transitions.forEach((o, r) => {
    i[bu(o, r)] = {
      staticTo: o.to,
      dynamicTarget: o.dynamic_to ? He(o.dynamic_to) : void 0
    };
  }), i;
}
function ky(t, i, o) {
  const r = bu(i, o), s = t[r];
  if (s)
    return s;
  const u = {
    staticTo: i.to,
    dynamicTarget: i.dynamic_to ? He(i.dynamic_to) : void 0
  };
  return t[r] = u, u;
}
function lE(t, i) {
  const o = {};
  for (const [r, s] of Object.entries(t)) {
    if (!r.startsWith("index:")) {
      o[r] = s;
      continue;
    }
    const u = Number.parseInt(r.slice(6), 10);
    if (Number.isNaN(u)) {
      o[r] = s;
      continue;
    }
    if (u !== i) {
      if (u > i) {
        o[`index:${u - 1}`] = s;
        continue;
      }
      o[r] = s;
    }
  }
  return o;
}
function au(t, i, o, r = []) {
  const s = Ur(i, t.length), u = t[s], c = Vr(u.document);
  return {
    document: u.document,
    selection: u.selection,
    diagnostics: u.diagnostics,
    pendingValidationNodeIDs: r,
    targetCache: u.targetCache,
    history: t,
    historyIndex: s,
    baselineHash: o,
    isDirty: c !== o
  };
}
function Gs(t) {
  return t.workflow || (t.workflow = { nodes: [] }), Array.isArray(t.workflow.nodes) || (t.workflow.nodes = []), t;
}
function xt(t, i, o, r, s = {}) {
  t.setState((u) => {
    const c = Uv(
      {
        document: u.document,
        targetCache: u.targetCache
      },
      (S) => {
        o(S.document, u, S.targetCache);
      }
    ), d = c.document, m = c.targetCache, y = oE(u.document, d), g = s.diagnosticsResolver ? s.diagnosticsResolver(d, u) : y ? xo(d) : u.diagnostics, p = r ? r(d, u) : u.selection;
    let v = u.pendingValidationNodeIDs;
    if (s.resetValidationScope)
      v = [];
    else if (y) {
      const S = u.document.definition.states !== d.definition.states, N = u.document.definition.transitions !== d.definition.transitions, M = rE(u.document, d);
      S || N && M.length === 0 ? v = [] : M.length > 0 && (v = hh([...u.pendingValidationNodeIDs, ...M]));
    }
    const b = u.history.slice(0, u.historyIndex + 1);
    return b.push({
      document: d,
      selection: p,
      diagnostics: g,
      targetCache: m,
      transaction: i
    }), au(b, b.length - 1, u.baselineHash, v);
  });
}
function Zs(t) {
  return t.states.length === 0 ? "" : t.states[0]?.name ?? "";
}
function Hy(t, i) {
  return t === "step" ? {
    id: `step-${i + 1}`,
    kind: t,
    step: {
      action_id: "",
      async: !1,
      delay: "",
      timeout: "",
      metadata: {}
    },
    next: []
  } : {
    id: `when-${i + 1}`,
    kind: t,
    expr: "",
    next: []
  };
}
function Ly(t, i, o) {
  const r = vu(t.ui_schema);
  r[En(i)] = {
    x: o.x,
    y: o.y
  }, t.ui_schema = dh(t.ui_schema, r);
}
function By(t, i) {
  t.ui_schema = dh(t.ui_schema, i);
}
function sE(t = {}) {
  const i = He(t.document ?? Qr()), o = { kind: "machine" }, r = xo(i, t.diagnostics), s = Xs(i), u = Vr(i), c = [
    {
      document: i,
      selection: o,
      diagnostics: r,
      targetCache: s,
      transaction: "init"
    }
  ], d = sh((m, y) => ({
    document: i,
    selection: o,
    diagnostics: r,
    pendingValidationNodeIDs: [],
    targetCache: s,
    history: c,
    historyIndex: 0,
    baselineHash: u,
    isDirty: !1,
    setSelection(g) {
      m({ selection: g });
    },
    replaceDocument(g, p) {
      m(() => {
        const v = He(g), b = xo(v, p), S = Xs(v), N = { kind: "machine" }, M = [
          {
            document: v,
            selection: N,
            diagnostics: b,
            targetCache: S,
            transaction: "replace-document"
          }
        ], T = Vr(v);
        return {
          document: v,
          selection: N,
          diagnostics: b,
          pendingValidationNodeIDs: [],
          targetCache: S,
          history: M,
          historyIndex: 0,
          baselineHash: T,
          isDirty: !1
        };
      });
    },
    restoreDocument(g, p) {
      xt(
        d,
        "restore-document",
        (v) => {
          const b = He(g);
          v.definition = b.definition, v.ui_schema = b.ui_schema, v.draft_state = b.draft_state;
          for (const [S, N] of Object.entries(b))
            S === "definition" || S === "ui_schema" || S === "draft_state" || (v[S] = N);
          for (const S of Object.keys(v))
            S in b || S === "definition" || S === "ui_schema" || S === "draft_state" || delete v[S];
        },
        () => ({ kind: "machine" }),
        {
          diagnosticsResolver: p ? (v) => xo(v, p) : void 0,
          resetValidationScope: !0
        }
      );
    },
    setDiagnostics(g) {
      m((p) => ({ diagnostics: xo(p.document, g), pendingValidationNodeIDs: [] }));
    },
    consumeValidationScopeNodeIDs() {
      const p = y().pendingValidationNodeIDs;
      return p.length > 0 && m({ pendingValidationNodeIDs: [] }), p;
    },
    focusDiagnostic(g) {
      m((p) => {
        const v = zw(p.document.definition, g);
        return v ? { selection: v } : p;
      });
    },
    setMachineName(g) {
      xt(d, "set-machine-name", (p) => {
        p.definition.name = g;
      });
    },
    addState() {
      xt(
        d,
        "add-state",
        (g) => {
          const p = zy(g.definition, "state", g.definition.states.length + 1);
          g.definition.states.push({ name: p });
        },
        (g) => ({ kind: "state", stateIndex: Math.max(0, g.definition.states.length - 1) })
      );
    },
    addStateFromPalette(g) {
      xt(
        d,
        "add-state-from-palette",
        (p) => {
          const v = p.definition.states.length, S = {
            name: zy(p.definition, g.namePrefix, v + 1)
          };
          g.initial && (p.definition.states.forEach((N) => {
            N.initial = !1;
          }), S.initial = !0), g.terminal && (S.terminal = !0), p.definition.states.push(S), g.position && Ly(p, v, g.position);
        },
        (p) => ({ kind: "state", stateIndex: Math.max(0, p.definition.states.length - 1) })
      );
    },
    removeState(g) {
      xt(
        d,
        "remove-state",
        (p) => {
          if (g < 0 || g >= p.definition.states.length)
            return;
          const v = p.definition.states[g]?.name;
          p.definition.states.splice(g, 1), v && p.definition.transitions.forEach((N) => {
            N.from === v && (N.from = Zs(p.definition)), N.to === v && (N.to = Zs(p.definition));
          });
          const b = vu(p.ui_schema), S = nE(b, g);
          p.ui_schema = dh(p.ui_schema, S);
        },
        (p, v) => p.definition.states.length === 0 ? { kind: "machine" } : { kind: "state", stateIndex: v.selection.kind === "state" ? Ur(Math.min(v.selection.stateIndex, g), p.definition.states.length) : Ur(g, p.definition.states.length) }
      );
    },
    moveState(g, p) {
      xt(
        d,
        "move-state",
        (v) => {
          const b = v.definition.states.length;
          if (b < 2 || g < 0 || g >= b || p < 0 || p >= b || g === p)
            return;
          Oy(v.definition.states, g, p);
          const S = vu(v.ui_schema), N = iE(S, g, p);
          By(v, N);
        },
        (v, b) => b.selection.kind === "state" ? {
          kind: "state",
          stateIndex: pd(b.selection.stateIndex, g, p)
        } : b.selection
      );
    },
    updateStateName(g, p) {
      xt(d, "update-state-name", (v) => {
        const b = v.definition.states[g];
        if (!b)
          return;
        const S = b.name;
        b.name = p, v.definition.transitions.forEach((N) => {
          N.from === S && (N.from = p), N.to === S && (N.to = p);
        });
      });
    },
    updateStateFlag(g, p, v) {
      xt(d, `update-state-${p}`, (b) => {
        const S = b.definition.states[g];
        S && (p === "initial" && v && b.definition.states.forEach((N) => {
          N.initial = !1;
        }), S[p] = v);
      });
    },
    addTransition() {
      xt(
        d,
        "add-transition",
        (g, p, v) => {
          const b = Zs(g.definition), S = g.definition.states[1]?.name ?? b, N = g.definition.transitions.length + 1, M = {
            id: `transition_${N}`,
            event: `event_${N}`,
            from: b,
            to: S,
            workflow: {
              nodes: [Hy("step", 0)]
            },
            metadata: {}
          };
          g.definition.transitions.push(M), v[bu(M, g.definition.transitions.length - 1)] = {
            staticTo: M.to
          };
        },
        (g) => ({ kind: "transition", transitionIndex: Math.max(0, g.definition.transitions.length - 1) })
      );
    },
    removeTransition(g) {
      xt(
        d,
        "remove-transition",
        (p, v, b) => {
          if (g < 0 || g >= p.definition.transitions.length)
            return;
          const S = p.definition.transitions[g];
          S && delete b[bu(S, g)], p.definition.transitions.splice(g, 1);
          const N = lE(b, g);
          Object.keys(b).forEach((M) => {
            delete b[M];
          }), Object.assign(b, N);
        },
        (p) => p.definition.transitions.length === 0 ? { kind: "machine" } : {
          kind: "transition",
          transitionIndex: Ur(g, p.definition.transitions.length)
        }
      );
    },
    moveTransition(g, p) {
      xt(
        d,
        "move-transition",
        (v, b, S) => {
          const N = v.definition.transitions.length;
          if (N < 2 || g < 0 || g >= N || p < 0 || p >= N || g === p)
            return;
          Oy(v.definition.transitions, g, p);
          const M = Xs(v);
          Object.keys(S).forEach((T) => {
            delete S[T];
          }), Object.assign(S, M);
        },
        (v, b) => b.selection.kind === "transition" ? {
          kind: "transition",
          transitionIndex: pd(b.selection.transitionIndex, g, p)
        } : b.selection.kind === "workflow-node" ? {
          kind: "workflow-node",
          transitionIndex: pd(b.selection.transitionIndex, g, p),
          nodeIndex: b.selection.nodeIndex
        } : b.selection
      );
    },
    updateTransition(g, p, v) {
      xt(d, `update-transition-${p}`, (b, S, N) => {
        const M = b.definition.transitions[g];
        if (!M)
          return;
        const T = ky(N, M, g);
        if (p === "event") {
          M.event = v;
          return;
        }
        if (p === "from") {
          M.from = v;
          return;
        }
        if (p === "to") {
          M.to = v, T.staticTo = v;
          return;
        }
        if (p === "dynamic_to.resolver") {
          const O = {
            ...M.dynamic_to ?? T.dynamicTarget ?? { resolver: "" },
            resolver: v
          };
          M.dynamic_to = O, T.dynamicTarget = He(O);
        }
      });
    },
    updateTransitionTargetKind(g, p) {
      xt(d, "update-transition-target-kind", (v, b, S) => {
        const N = v.definition.transitions[g];
        if (!N)
          return;
        const M = ky(S, N, g);
        if (N.to && N.to.trim() !== "" && (M.staticTo = N.to), N.dynamic_to?.resolver && N.dynamic_to.resolver.trim() !== "" && (M.dynamicTarget = He(N.dynamic_to)), p === "static") {
          N.dynamic_to = void 0;
          const T = M.staticTo?.trim() ?? "";
          N.to = T || Zs(v.definition);
          return;
        }
        N.to = void 0, N.dynamic_to = He(M.dynamicTarget ?? { resolver: "" });
      });
    },
    addWorkflowNode(g, p) {
      xt(
        d,
        `add-${p}-workflow-node`,
        (v) => {
          const b = v.definition.transitions[g];
          if (!b)
            return;
          Gs(b);
          const S = b.workflow.nodes.length;
          b.workflow.nodes.push(Hy(p, S));
        },
        (v) => {
          const b = v.definition.transitions[g];
          if (!b)
            return { kind: "machine" };
          const S = Math.max(0, b.workflow.nodes.length - 1);
          return { kind: "workflow-node", transitionIndex: g, nodeIndex: S };
        }
      );
    },
    removeWorkflowNode(g, p) {
      xt(
        d,
        "remove-workflow-node",
        (v) => {
          const b = v.definition.transitions[g];
          b && (Gs(b), !(p < 0 || p >= b.workflow.nodes.length) && (b.workflow.nodes.splice(p, 1), b.workflow.nodes.forEach((S) => {
            Array.isArray(S.next) && (S.next = S.next.filter(
              (N) => b.workflow.nodes.some((M) => M.id === N)
            ));
          })));
        },
        (v) => {
          const b = v.definition.transitions[g];
          return !b || b.workflow.nodes.length === 0 ? { kind: "transition", transitionIndex: g } : {
            kind: "workflow-node",
            transitionIndex: g,
            nodeIndex: Ur(p, b.workflow.nodes.length)
          };
        }
      );
    },
    selectWorkflowNode(g, p) {
      m({ selection: { kind: "workflow-node", transitionIndex: g, nodeIndex: p } });
    },
    updateWorkflowNodeField(g, p, v, b) {
      xt(d, `update-workflow-node-${v}`, (S) => {
        const N = S.definition.transitions[g];
        if (!N)
          return;
        Gs(N);
        const M = N.workflow.nodes[p];
        if (M && fl(M.kind)) {
          if (v === "expr") {
            M.expr = String(b);
            return;
          }
          if (M.step = M.step ?? {
            action_id: "",
            async: !1,
            delay: "",
            timeout: "",
            metadata: {}
          }, v === "action_id") {
            M.step.action_id = String(b);
            return;
          }
          if (v === "async") {
            M.step.async = !!b;
            return;
          }
          if (v === "delay") {
            M.step.delay = String(b);
            return;
          }
          v === "timeout" && (M.step.timeout = String(b));
        }
      });
    },
    updateWorkflowNodeMetadata(g, p, v) {
      xt(d, "update-workflow-node-metadata", (b) => {
        const S = b.definition.transitions[g];
        if (!S)
          return;
        Gs(S);
        const N = S.workflow.nodes[p];
        N && N.kind === "step" && (N.step = N.step ?? {
          action_id: "",
          async: !1,
          delay: "",
          timeout: "",
          metadata: {}
        }, N.step.metadata = He(v));
      });
    },
    setGraphNodePosition(g, p) {
      xt(d, "set-graph-node-position", (v) => {
        v.definition.states[g] && Ly(v, g, p);
      });
    },
    setGraphNodePositions(g) {
      xt(d, "set-graph-node-positions", (p) => {
        By(p, g);
      });
    },
    undo() {
      const g = y();
      if (g.historyIndex === 0)
        return;
      const p = g.historyIndex - 1;
      m(au(g.history, p, g.baselineHash, []));
    },
    redo() {
      const g = y();
      if (g.historyIndex >= g.history.length - 1)
        return;
      const p = g.historyIndex + 1;
      m(au(g.history, p, g.baselineHash, []));
    },
    markSaved() {
      m((g) => ({
        baselineHash: Vr(g.document),
        isDirty: !1,
        pendingValidationNodeIDs: []
      }));
    },
    applyRemoteSave(g, p, v) {
      m((b) => {
        const S = Uv(b.document, (C) => {
          C.definition.version = g, C.draft_state = He(p);
        }), N = xo(S, v), M = Xs(S), T = {
          document: S,
          selection: b.selection,
          diagnostics: N,
          targetCache: M,
          transaction: "apply-remote-save"
        }, O = b.history.slice(0, b.historyIndex + 1);
        O.push(T);
        const _ = Vr(S);
        return au(O, O.length - 1, _, []);
      });
    }
  }));
  return d;
}
function fn(t) {
  return t !== null && typeof t == "object" && !Array.isArray(t) ? t : null;
}
function ct(t, i, o = "") {
  for (const r of i) {
    const s = t[r];
    if (typeof s == "string")
      return s;
  }
  return o;
}
function Yr(t, i) {
  for (const o of i) {
    const r = t[o];
    if (typeof r == "number" && Number.isFinite(r))
      return r;
  }
}
function el(t, i, o = !1) {
  for (const r of i) {
    const s = t[r];
    if (typeof s == "boolean")
      return s;
  }
  return o;
}
function uE(t, i) {
  for (const o of i) {
    const r = t[o];
    if (typeof r == "boolean")
      return r;
  }
}
function cE(t, i) {
  for (const o of i) {
    const r = t[o];
    if (Array.isArray(r))
      return r.filter((s) => typeof s == "string");
  }
}
function va(t, i) {
  for (const o of i) {
    const r = t[o], s = fn(r);
    if (s)
      return { ...s };
  }
}
function Iy(t) {
  if (typeof t == "number")
    return t / 1e6;
}
function fE(t) {
  const i = fn(t) ?? {};
  return {
    kind: ct(i, ["kind", "Kind"]),
    to: ct(i, ["to", "To"]) || void 0,
    resolver: ct(i, ["resolver", "Resolver"]) || void 0,
    resolved: el(i, ["resolved", "Resolved"]),
    resolvedTo: ct(i, ["resolvedTo", "ResolvedTo"]) || void 0,
    candidates: cE(i, ["candidates", "Candidates"])
  };
}
function dE(t) {
  const i = fn(t) ?? {}, o = i.rejections ?? i.Rejections, r = Array.isArray(o) ? o.map((s) => hE(s)) : void 0;
  return {
    id: ct(i, ["id", "ID"]),
    event: ct(i, ["event", "Event"]),
    target: fE(i.target ?? i.Target),
    allowed: el(i, ["allowed", "Allowed"], !0),
    rejections: r,
    metadata: va(i, ["metadata", "Metadata"])
  };
}
function hE(t) {
  const i = fn(t) ?? {};
  return {
    code: ct(i, ["code", "Code"]),
    category: ct(i, ["category", "Category"]),
    retryable: el(i, ["retryable", "Retryable"]),
    requiresAction: el(i, ["requiresAction", "RequiresAction"]),
    message: ct(i, ["message", "Message"]),
    remediationHint: ct(i, ["remediationHint", "RemediationHint"]) || void 0,
    metadata: va(i, ["metadata", "Metadata"])
  };
}
function mE(t) {
  const i = fn(t) ?? {}, o = ct(i, ["kind", "Kind"]), r = ct(i, ["actionId", "ActionID"]);
  if (o === "command" || r !== "") {
    const u = Yr(i, ["delayMs", "DelayMs"]), c = Yr(i, ["timeoutMs", "TimeoutMs"]), d = u ?? Iy(Yr(i, ["Delay", "delay"])), m = c ?? Iy(Yr(i, ["Timeout", "timeout"])), y = {
      kind: "command",
      actionId: r,
      payload: va(i, ["payload", "Payload"]) ?? {},
      async: el(i, ["async", "Async"]),
      metadata: va(i, ["metadata", "Metadata"])
    };
    return d !== void 0 && (y.delayMs = d), m !== void 0 && (y.timeoutMs = m), y;
  }
  return {
    kind: "emit_event",
    event: ct(i, ["event", "Event"]),
    msg: i.msg ?? i.Msg,
    metadata: va(i, ["metadata", "Metadata"])
  };
}
function gE(t) {
  const i = fn(t) ?? {}, o = i.effects ?? i.Effects, r = Array.isArray(o) ? o.map((s) => mE(s)) : [];
  return {
    previousState: ct(i, ["previousState", "PreviousState"]),
    currentState: ct(i, ["currentState", "CurrentState"]),
    effects: r
  };
}
function $v(t) {
  const i = fn(t) ?? {}, o = i.allowedTransitions ?? i.AllowedTransitions, r = Array.isArray(o) ? o.map((s) => dE(s)) : [];
  return {
    entityId: ct(i, ["entityId", "EntityID"]),
    currentState: ct(i, ["currentState", "CurrentState"]),
    allowedTransitions: r,
    metadata: va(i, ["metadata", "Metadata"])
  };
}
function pE(t) {
  const i = fn(t) ?? {};
  return {
    executionId: ct(i, ["executionId", "ExecutionID"]),
    policy: ct(i, ["policy", "Policy"]) || void 0,
    status: ct(i, ["status", "Status"]),
    metadata: va(i, ["metadata", "Metadata"])
  };
}
function yE(t) {
  const i = fn(t);
  if (i && (i.error ?? i.Error))
    throw new Error("rpc apply event response contains error envelope");
  const o = i ? fn(i.result ?? i.Result) : null;
  if (o && (o.error ?? o.Error))
    throw new Error("rpc apply event response contains result error envelope");
  const r = i ? fn(i.data ?? i.Data) : null, s = o ? fn(o.data ?? o.Data) : null, u = r ?? s ?? o ?? i;
  if (!u)
    throw new Error("invalid apply event response: expected object envelope");
  const c = u.transition ?? u.Transition, d = u.snapshot ?? u.Snapshot;
  if (!c || !d)
    throw new Error("invalid apply event response: transition and snapshot are required");
  const m = u.execution ?? u.Execution;
  return {
    eventId: ct(u, ["eventId", "EventID"]),
    version: Yr(u, ["version", "Version"]) ?? 0,
    transition: gE(c),
    snapshot: $v(d),
    execution: m ? pE(m) : void 0,
    idempotencyHit: uE(u, ["idempotencyHit", "IdempotencyHit"])
  };
}
function Vy(t) {
  return t !== null && typeof t == "object" && !Array.isArray(t) ? t : null;
}
function vE(t) {
  const i = Vy(t);
  if (!i)
    return t;
  const o = Vy(i.result ?? i.Result);
  return o ? o.data ?? o.Data ?? o : i.data ?? i.Data ?? i;
}
function Xv(t) {
  return yE(t);
}
function Gv(t) {
  return $v(vE(t));
}
function xu(t, i) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    level: t,
    message: i,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function bE(t) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    code: t.code,
    message: t.message,
    method: t.method,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function xE(t, i) {
  const o = Xv(t), r = o.execution?.status ?? "dry_run", s = {
    selectedTransitionID: i?.transitionId,
    event: i?.event ?? "(event)",
    previousState: o.transition.previousState,
    currentState: o.transition.currentState,
    status: r,
    idempotencyHit: o.idempotencyHit
  };
  return {
    applyEventResult: o,
    projectedOutcome: s,
    log: [
      xu(
        "info",
        `Projected ${s.event}: ${s.previousState} -> ${s.currentState} (${s.status})`
      )
    ]
  };
}
function SE(t) {
  const i = Gv(t), o = i.allowedTransitions.filter((r) => !r.allowed);
  return {
    snapshotResult: i,
    blockedTransitions: o,
    log: [
      xu(
        "info",
        `Snapshot state ${i.currentState}, blocked transitions: ${o.length}`
      )
    ]
  };
}
function wE() {
  return sh((t) => ({
    applyEventResult: null,
    snapshotResult: null,
    projectedOutcome: null,
    blockedTransitions: [],
    errors: [],
    log: [],
    setApplyEventWirePayload(i, o) {
      const r = xE(i, o);
      t((s) => ({
        applyEventResult: r.applyEventResult,
        projectedOutcome: r.projectedOutcome,
        log: [...s.log, ...r.log]
      }));
    },
    setSnapshotWirePayload(i) {
      const o = SE(i);
      t((r) => ({
        snapshotResult: o.snapshotResult,
        blockedTransitions: o.blockedTransitions,
        log: [...r.log, ...o.log]
      }));
    },
    pushError(i) {
      t((o) => ({
        errors: [...o.errors, bE(i)],
        log: [...o.log, xu("error", `[${i.code}] ${i.message}`)]
      }));
    },
    pushInfo(i) {
      t((o) => ({
        log: [...o.log, xu("info", i)]
      }));
    },
    clear() {
      t({
        applyEventResult: null,
        snapshotResult: null,
        projectedOutcome: null,
        blockedTransitions: [],
        errors: [],
        log: []
      });
    }
  }));
}
const Zv = "fsm-ui-builder.panel-layout", Kv = "fsm-ui-builder.theme";
function $i(t, i, o) {
  return Number.isNaN(t) ? i : Math.min(Math.max(t, i), o);
}
function yd() {
  return {
    explorerWidth: 240,
    inspectorWidth: 320,
    consoleHeight: 140,
    explorerCollapsed: !1,
    inspectorCollapsed: !1,
    consoleCollapsed: !1,
    canvasZoom: 1,
    canvasOffsetX: 0,
    canvasOffsetY: 0
  };
}
function Iu() {
  return typeof window > "u" || typeof window.localStorage > "u" ? !1 : typeof window.localStorage.getItem == "function" && typeof window.localStorage.setItem == "function";
}
function EE() {
  if (!Iu())
    return yd();
  const t = window.localStorage.getItem(Zv);
  if (!t)
    return yd();
  try {
    const i = JSON.parse(t);
    return {
      explorerWidth: $i(i.explorerWidth ?? 240, 180, 400),
      inspectorWidth: $i(i.inspectorWidth ?? 320, 240, 500),
      consoleHeight: $i(i.consoleHeight ?? 140, 80, 300),
      explorerCollapsed: !!i.explorerCollapsed,
      inspectorCollapsed: !!i.inspectorCollapsed,
      consoleCollapsed: !!i.consoleCollapsed,
      canvasZoom: $i(i.canvasZoom ?? 1, 0.25, 2),
      canvasOffsetX: Number.isFinite(i.canvasOffsetX) ? Number(i.canvasOffsetX) : 0,
      canvasOffsetY: Number.isFinite(i.canvasOffsetY) ? Number(i.canvasOffsetY) : 0
    };
  } catch {
    return yd();
  }
}
function da(t) {
  Iu() && window.localStorage.setItem(Zv, JSON.stringify(t));
}
function _E() {
  return Iu() && window.localStorage.getItem(Kv) === "dark" ? "dark" : "light";
}
function Uy(t) {
  Iu() && window.localStorage.setItem(Kv, t);
}
function NE() {
  const t = EE(), i = _E();
  return sh((o) => ({
    ...t,
    viewportMode: "desktop",
    mobilePanel: "canvas",
    keyboardHelpOpen: !1,
    theme: i,
    setPanelWidth(r, s) {
      o((u) => {
        const c = {
          ...u,
          explorerWidth: r === "explorer" ? $i(s, 180, 400) : u.explorerWidth,
          inspectorWidth: r === "inspector" ? $i(s, 240, 500) : u.inspectorWidth
        };
        return da(c), c;
      });
    },
    setConsoleHeight(r) {
      o((s) => {
        const u = {
          ...s,
          consoleHeight: $i(r, 80, 300)
        };
        return da(u), u;
      });
    },
    setPanelCollapsed(r, s) {
      o((u) => {
        const c = {
          ...u,
          explorerCollapsed: r === "explorer" ? s : u.explorerCollapsed,
          inspectorCollapsed: r === "inspector" ? s : u.inspectorCollapsed,
          consoleCollapsed: r === "console" ? s : u.consoleCollapsed
        };
        return da(c), c;
      });
    },
    togglePanel(r) {
      o((s) => {
        const u = {
          ...s,
          explorerCollapsed: r === "explorer" ? !s.explorerCollapsed : s.explorerCollapsed,
          inspectorCollapsed: r === "inspector" ? !s.inspectorCollapsed : s.inspectorCollapsed,
          consoleCollapsed: r === "console" ? !s.consoleCollapsed : s.consoleCollapsed
        };
        return da(u), u;
      });
    },
    setKeyboardHelpOpen(r) {
      o({ keyboardHelpOpen: r });
    },
    toggleKeyboardHelp() {
      o((r) => ({
        keyboardHelpOpen: !r.keyboardHelpOpen
      }));
    },
    zoomCanvas(r) {
      o((s) => {
        const u = {
          ...s,
          canvasZoom: $i(s.canvasZoom + r, 0.25, 2)
        };
        return da(u), u;
      });
    },
    panCanvas(r, s) {
      o((u) => {
        const c = {
          ...u,
          canvasOffsetX: u.canvasOffsetX + r,
          canvasOffsetY: u.canvasOffsetY + s
        };
        return da(c), c;
      });
    },
    resetCanvasView() {
      o((r) => {
        const s = {
          ...r,
          canvasZoom: 1,
          canvasOffsetX: 0,
          canvasOffsetY: 0
        };
        return da(s), s;
      });
    },
    setViewportMode(r) {
      o({ viewportMode: r });
    },
    setMobilePanel(r) {
      o({ mobilePanel: r });
    },
    setTheme(r) {
      Uy(r), o({ theme: r });
    },
    toggleTheme() {
      o((r) => {
        const s = r.theme === "light" ? "dark" : "light";
        return Uy(s), { theme: s };
      });
    }
  }));
}
const Qv = $.createContext(null), Fv = $.createContext(null), Wv = $.createContext(null);
function CE(t) {
  const i = $.useRef(null), o = $.useRef(null), r = $.useRef(null);
  return i.current || (i.current = sE({
    document: t.initialDocument,
    diagnostics: t.initialDiagnostics
  })), o.current || (o.current = NE()), r.current || (r.current = wE()), /* @__PURE__ */ x.jsx(Qv.Provider, { value: i.current, children: /* @__PURE__ */ x.jsx(Fv.Provider, { value: o.current, children: /* @__PURE__ */ x.jsx(Wv.Provider, { value: r.current, children: t.children }) }) });
}
function mh(t, i) {
  if (!t)
    throw new Error(i);
  return t;
}
function Se(t) {
  const i = mh(
    $.useContext(Qv),
    "Machine store context is missing. Wrap with BuilderStoresProvider."
  );
  return uh(i, t);
}
function Ye(t) {
  const i = mh(
    $.useContext(Fv),
    "UI store context is missing. Wrap with BuilderStoresProvider."
  );
  return uh(i, t);
}
function Dt(t) {
  const i = mh(
    $.useContext(Wv),
    "Simulation store context is missing. Wrap with BuilderStoresProvider."
  );
  return uh(i, t);
}
function ME(t) {
  return t instanceof HTMLElement ? t.isContentEditable ? !0 : t.matches("input, textarea, select") : !1;
}
function Yy(t) {
  return t.kind === "machine" ? "machine" : t.kind === "state" ? `state:${t.stateIndex}` : t.kind === "transition" ? `transition:${t.transitionIndex}` : `workflow:${t.transitionIndex}:${t.nodeIndex}`;
}
function qy(t, i, o) {
  const r = [{ kind: "machine" }];
  i.states.forEach((d, m) => {
    r.push({ kind: "state", stateIndex: m });
  }), i.transitions.forEach((d, m) => {
    r.push({ kind: "transition", transitionIndex: m }), d.workflow?.nodes?.forEach((y, g) => {
      r.push({ kind: "workflow-node", transitionIndex: m, nodeIndex: g });
    });
  });
  const s = r.findIndex((d) => Yy(d) === Yy(t)), u = s >= 0 ? s : 0, c = Math.min(Math.max(0, u + o), r.length - 1);
  return r[c] ?? { kind: "machine" };
}
function TE(t) {
  const i = Se((p) => p.selection), o = Se((p) => p.document.definition), r = Se((p) => p.setSelection), s = Se((p) => p.undo), u = Se((p) => p.redo), c = Se((p) => p.addState), d = Se((p) => p.addTransition), m = Ye((p) => p.zoomCanvas), y = Ye((p) => p.resetCanvasView), g = Ye((p) => p.panCanvas);
  $.useEffect(() => {
    const p = (v) => {
      const b = v.metaKey || v.ctrlKey, S = ME(v.target), N = !!t.readOnly, M = v.key, T = M.toLowerCase();
      if (!!t.keyboardHelpOpen) {
        M === "Escape" && (v.preventDefault(), t.onCloseKeyboardHelp?.());
        return;
      }
      if (b && T === "s") {
        v.preventDefault(), N || t.onSave?.();
        return;
      }
      if (b && M === "Enter") {
        v.preventDefault(), N || t.onValidate?.();
        return;
      }
      if (b && T === "z") {
        if (S)
          return;
        v.preventDefault(), N || (v.shiftKey ? u() : s());
        return;
      }
      if (b && T === "y") {
        if (S)
          return;
        v.preventDefault(), N || u();
        return;
      }
      if (b && M === "1") {
        v.preventDefault(), t.onFocusPanel?.("explorer");
        return;
      }
      if (b && M === "2") {
        v.preventDefault(), t.onFocusPanel?.("canvas");
        return;
      }
      if (b && M === "3") {
        v.preventDefault(), t.onFocusPanel?.("inspector");
        return;
      }
      if (b && M === "`") {
        v.preventDefault(), t.onToggleConsole ? t.onToggleConsole() : t.onFocusPanel?.("console");
        return;
      }
      if (!b && !S && M === "?") {
        v.preventDefault(), t.onToggleKeyboardHelp?.();
        return;
      }
      if (b && (M === "+" || M === "=")) {
        v.preventDefault(), m(0.1);
        return;
      }
      if (b && M === "-") {
        v.preventDefault(), m(-0.1);
        return;
      }
      if (b && M === "0") {
        v.preventDefault(), y();
        return;
      }
      if (v.altKey && !b && M.startsWith("Arrow")) {
        if (v.preventDefault(), M === "ArrowLeft") {
          g(-24, 0);
          return;
        }
        if (M === "ArrowRight") {
          g(24, 0);
          return;
        }
        if (M === "ArrowUp") {
          g(0, -24);
          return;
        }
        M === "ArrowDown" && g(0, 24);
        return;
      }
      if (!b && !S && M === "Escape") {
        v.preventDefault(), r({ kind: "machine" });
        return;
      }
      if (!b && !S && M === "ArrowDown") {
        v.preventDefault(), r(qy(i, o, 1));
        return;
      }
      if (!b && !S && M === "ArrowUp") {
        v.preventDefault(), r(qy(i, o, -1));
        return;
      }
      if (!b && !S && !N && T === "n") {
        v.preventDefault(), c();
        return;
      }
      !b && !S && !N && T === "t" && (v.preventDefault(), d());
    };
    return window.addEventListener("keydown", p), () => {
      window.removeEventListener("keydown", p);
    };
  }, [
    c,
    d,
    o,
    t,
    g,
    u,
    y,
    i,
    r,
    s,
    m
  ]);
}
function vd(t) {
  const i = Ye((c) => c.explorerWidth), o = Ye((c) => c.inspectorWidth), r = Ye((c) => c.consoleHeight), s = Ye((c) => c.setPanelWidth), u = Ye((c) => c.setConsoleHeight);
  return $.useCallback(
    (c) => {
      c.preventDefault();
      const d = {
        pointerX: c.clientX,
        pointerY: c.clientY,
        width: t === "explorer" ? i : o,
        height: r
      }, m = (g) => {
        if (t === "console") {
          const v = d.pointerY - g.clientY;
          u(d.height + v);
          return;
        }
        const p = g.clientX - d.pointerX;
        if (t === "explorer") {
          s("explorer", d.width + p);
          return;
        }
        s("inspector", d.width - p);
      }, y = () => {
        window.removeEventListener("pointermove", m), window.removeEventListener("pointerup", y);
      };
      window.addEventListener("pointermove", m), window.addEventListener("pointerup", y);
    },
    [r, i, o, t, u, s]
  );
}
function AE(t) {
  return t < 900 ? "mobile-readonly" : t <= 1200 ? "compact" : "desktop";
}
function jE() {
  const t = Ye((o) => o.viewportMode), i = Ye((o) => o.setViewportMode);
  return $.useEffect(() => {
    const o = () => {
      i(AE(window.innerWidth));
    };
    return o(), window.addEventListener("resize", o), () => {
      window.removeEventListener("resize", o);
    };
  }, [i]), t;
}
function yt(t) {
  if (typeof t == "string" || typeof t == "number") return "" + t;
  let i = "";
  if (Array.isArray(t))
    for (let o = 0, r; o < t.length; o++)
      (r = yt(t[o])) !== "" && (i += (i && " ") + r);
  else
    for (let o in t)
      t[o] && (i += (i && " ") + o);
  return i;
}
var DE = { value: () => {
} };
function Vu() {
  for (var t = 0, i = arguments.length, o = {}, r; t < i; ++t) {
    if (!(r = arguments[t] + "") || r in o || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    o[r] = [];
  }
  return new ou(o);
}
function ou(t) {
  this._ = t;
}
function OE(t, i) {
  return t.trim().split(/^|\s+/).map(function(o) {
    var r = "", s = o.indexOf(".");
    if (s >= 0 && (r = o.slice(s + 1), o = o.slice(0, s)), o && !i.hasOwnProperty(o)) throw new Error("unknown type: " + o);
    return { type: o, name: r };
  });
}
ou.prototype = Vu.prototype = {
  constructor: ou,
  on: function(t, i) {
    var o = this._, r = OE(t + "", o), s, u = -1, c = r.length;
    if (arguments.length < 2) {
      for (; ++u < c; ) if ((s = (t = r[u]).type) && (s = zE(o[s], t.name))) return s;
      return;
    }
    if (i != null && typeof i != "function") throw new Error("invalid callback: " + i);
    for (; ++u < c; )
      if (s = (t = r[u]).type) o[s] = $y(o[s], t.name, i);
      else if (i == null) for (s in o) o[s] = $y(o[s], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, i = this._;
    for (var o in i) t[o] = i[o].slice();
    return new ou(t);
  },
  call: function(t, i) {
    if ((s = arguments.length - 2) > 0) for (var o = new Array(s), r = 0, s, u; r < s; ++r) o[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (u = this._[t], r = 0, s = u.length; r < s; ++r) u[r].value.apply(i, o);
  },
  apply: function(t, i, o) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var r = this._[t], s = 0, u = r.length; s < u; ++s) r[s].value.apply(i, o);
  }
};
function zE(t, i) {
  for (var o = 0, r = t.length, s; o < r; ++o)
    if ((s = t[o]).name === i)
      return s.value;
}
function $y(t, i, o) {
  for (var r = 0, s = t.length; r < s; ++r)
    if (t[r].name === i) {
      t[r] = DE, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return o != null && t.push({ name: i, value: o }), t;
}
var Xd = "http://www.w3.org/1999/xhtml";
const Xy = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Xd,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Uu(t) {
  var i = t += "", o = i.indexOf(":");
  return o >= 0 && (i = t.slice(0, o)) !== "xmlns" && (t = t.slice(o + 1)), Xy.hasOwnProperty(i) ? { space: Xy[i], local: t } : t;
}
function RE(t) {
  return function() {
    var i = this.ownerDocument, o = this.namespaceURI;
    return o === Xd && i.documentElement.namespaceURI === Xd ? i.createElement(t) : i.createElementNS(o, t);
  };
}
function kE(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Jv(t) {
  var i = Uu(t);
  return (i.local ? kE : RE)(i);
}
function HE() {
}
function gh(t) {
  return t == null ? HE : function() {
    return this.querySelector(t);
  };
}
function LE(t) {
  typeof t != "function" && (t = gh(t));
  for (var i = this._groups, o = i.length, r = new Array(o), s = 0; s < o; ++s)
    for (var u = i[s], c = u.length, d = r[s] = new Array(c), m, y, g = 0; g < c; ++g)
      (m = u[g]) && (y = t.call(m, m.__data__, g, u)) && ("__data__" in m && (y.__data__ = m.__data__), d[g] = y);
  return new en(r, this._parents);
}
function BE(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function IE() {
  return [];
}
function Pv(t) {
  return t == null ? IE : function() {
    return this.querySelectorAll(t);
  };
}
function VE(t) {
  return function() {
    return BE(t.apply(this, arguments));
  };
}
function UE(t) {
  typeof t == "function" ? t = VE(t) : t = Pv(t);
  for (var i = this._groups, o = i.length, r = [], s = [], u = 0; u < o; ++u)
    for (var c = i[u], d = c.length, m, y = 0; y < d; ++y)
      (m = c[y]) && (r.push(t.call(m, m.__data__, y, c)), s.push(m));
  return new en(r, s);
}
function eb(t) {
  return function() {
    return this.matches(t);
  };
}
function tb(t) {
  return function(i) {
    return i.matches(t);
  };
}
var YE = Array.prototype.find;
function qE(t) {
  return function() {
    return YE.call(this.children, t);
  };
}
function $E() {
  return this.firstElementChild;
}
function XE(t) {
  return this.select(t == null ? $E : qE(typeof t == "function" ? t : tb(t)));
}
var GE = Array.prototype.filter;
function ZE() {
  return Array.from(this.children);
}
function KE(t) {
  return function() {
    return GE.call(this.children, t);
  };
}
function QE(t) {
  return this.selectAll(t == null ? ZE : KE(typeof t == "function" ? t : tb(t)));
}
function FE(t) {
  typeof t != "function" && (t = eb(t));
  for (var i = this._groups, o = i.length, r = new Array(o), s = 0; s < o; ++s)
    for (var u = i[s], c = u.length, d = r[s] = [], m, y = 0; y < c; ++y)
      (m = u[y]) && t.call(m, m.__data__, y, u) && d.push(m);
  return new en(r, this._parents);
}
function nb(t) {
  return new Array(t.length);
}
function WE() {
  return new en(this._enter || this._groups.map(nb), this._parents);
}
function Su(t, i) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = i;
}
Su.prototype = {
  constructor: Su,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, i) {
    return this._parent.insertBefore(t, i);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function JE(t) {
  return function() {
    return t;
  };
}
function PE(t, i, o, r, s, u) {
  for (var c = 0, d, m = i.length, y = u.length; c < y; ++c)
    (d = i[c]) ? (d.__data__ = u[c], r[c] = d) : o[c] = new Su(t, u[c]);
  for (; c < m; ++c)
    (d = i[c]) && (s[c] = d);
}
function e_(t, i, o, r, s, u, c) {
  var d, m, y = /* @__PURE__ */ new Map(), g = i.length, p = u.length, v = new Array(g), b;
  for (d = 0; d < g; ++d)
    (m = i[d]) && (v[d] = b = c.call(m, m.__data__, d, i) + "", y.has(b) ? s[d] = m : y.set(b, m));
  for (d = 0; d < p; ++d)
    b = c.call(t, u[d], d, u) + "", (m = y.get(b)) ? (r[d] = m, m.__data__ = u[d], y.delete(b)) : o[d] = new Su(t, u[d]);
  for (d = 0; d < g; ++d)
    (m = i[d]) && y.get(v[d]) === m && (s[d] = m);
}
function t_(t) {
  return t.__data__;
}
function n_(t, i) {
  if (!arguments.length) return Array.from(this, t_);
  var o = i ? e_ : PE, r = this._parents, s = this._groups;
  typeof t != "function" && (t = JE(t));
  for (var u = s.length, c = new Array(u), d = new Array(u), m = new Array(u), y = 0; y < u; ++y) {
    var g = r[y], p = s[y], v = p.length, b = i_(t.call(g, g && g.__data__, y, r)), S = b.length, N = d[y] = new Array(S), M = c[y] = new Array(S), T = m[y] = new Array(v);
    o(g, p, N, M, T, b, i);
    for (var O = 0, _ = 0, C, k; O < S; ++O)
      if (C = N[O]) {
        for (O >= _ && (_ = O + 1); !(k = M[_]) && ++_ < S; ) ;
        C._next = k || null;
      }
  }
  return c = new en(c, r), c._enter = d, c._exit = m, c;
}
function i_(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function a_() {
  return new en(this._exit || this._groups.map(nb), this._parents);
}
function o_(t, i, o) {
  var r = this.enter(), s = this, u = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), i != null && (s = i(s), s && (s = s.selection())), o == null ? u.remove() : o(u), r && s ? r.merge(s).order() : s;
}
function r_(t) {
  for (var i = t.selection ? t.selection() : t, o = this._groups, r = i._groups, s = o.length, u = r.length, c = Math.min(s, u), d = new Array(s), m = 0; m < c; ++m)
    for (var y = o[m], g = r[m], p = y.length, v = d[m] = new Array(p), b, S = 0; S < p; ++S)
      (b = y[S] || g[S]) && (v[S] = b);
  for (; m < s; ++m)
    d[m] = o[m];
  return new en(d, this._parents);
}
function l_() {
  for (var t = this._groups, i = -1, o = t.length; ++i < o; )
    for (var r = t[i], s = r.length - 1, u = r[s], c; --s >= 0; )
      (c = r[s]) && (u && c.compareDocumentPosition(u) ^ 4 && u.parentNode.insertBefore(c, u), u = c);
  return this;
}
function s_(t) {
  t || (t = u_);
  function i(p, v) {
    return p && v ? t(p.__data__, v.__data__) : !p - !v;
  }
  for (var o = this._groups, r = o.length, s = new Array(r), u = 0; u < r; ++u) {
    for (var c = o[u], d = c.length, m = s[u] = new Array(d), y, g = 0; g < d; ++g)
      (y = c[g]) && (m[g] = y);
    m.sort(i);
  }
  return new en(s, this._parents).order();
}
function u_(t, i) {
  return t < i ? -1 : t > i ? 1 : t >= i ? 0 : NaN;
}
function c_() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function f_() {
  return Array.from(this);
}
function d_() {
  for (var t = this._groups, i = 0, o = t.length; i < o; ++i)
    for (var r = t[i], s = 0, u = r.length; s < u; ++s) {
      var c = r[s];
      if (c) return c;
    }
  return null;
}
function h_() {
  let t = 0;
  for (const i of this) ++t;
  return t;
}
function m_() {
  return !this.node();
}
function g_(t) {
  for (var i = this._groups, o = 0, r = i.length; o < r; ++o)
    for (var s = i[o], u = 0, c = s.length, d; u < c; ++u)
      (d = s[u]) && t.call(d, d.__data__, u, s);
  return this;
}
function p_(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function y_(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function v_(t, i) {
  return function() {
    this.setAttribute(t, i);
  };
}
function b_(t, i) {
  return function() {
    this.setAttributeNS(t.space, t.local, i);
  };
}
function x_(t, i) {
  return function() {
    var o = i.apply(this, arguments);
    o == null ? this.removeAttribute(t) : this.setAttribute(t, o);
  };
}
function S_(t, i) {
  return function() {
    var o = i.apply(this, arguments);
    o == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, o);
  };
}
function w_(t, i) {
  var o = Uu(t);
  if (arguments.length < 2) {
    var r = this.node();
    return o.local ? r.getAttributeNS(o.space, o.local) : r.getAttribute(o);
  }
  return this.each((i == null ? o.local ? y_ : p_ : typeof i == "function" ? o.local ? S_ : x_ : o.local ? b_ : v_)(o, i));
}
function ib(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function E_(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function __(t, i, o) {
  return function() {
    this.style.setProperty(t, i, o);
  };
}
function N_(t, i, o) {
  return function() {
    var r = i.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, o);
  };
}
function C_(t, i, o) {
  return arguments.length > 1 ? this.each((i == null ? E_ : typeof i == "function" ? N_ : __)(t, i, o ?? "")) : Co(this.node(), t);
}
function Co(t, i) {
  return t.style.getPropertyValue(i) || ib(t).getComputedStyle(t, null).getPropertyValue(i);
}
function M_(t) {
  return function() {
    delete this[t];
  };
}
function T_(t, i) {
  return function() {
    this[t] = i;
  };
}
function A_(t, i) {
  return function() {
    var o = i.apply(this, arguments);
    o == null ? delete this[t] : this[t] = o;
  };
}
function j_(t, i) {
  return arguments.length > 1 ? this.each((i == null ? M_ : typeof i == "function" ? A_ : T_)(t, i)) : this.node()[t];
}
function ab(t) {
  return t.trim().split(/^|\s+/);
}
function ph(t) {
  return t.classList || new ob(t);
}
function ob(t) {
  this._node = t, this._names = ab(t.getAttribute("class") || "");
}
ob.prototype = {
  add: function(t) {
    var i = this._names.indexOf(t);
    i < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var i = this._names.indexOf(t);
    i >= 0 && (this._names.splice(i, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function rb(t, i) {
  for (var o = ph(t), r = -1, s = i.length; ++r < s; ) o.add(i[r]);
}
function lb(t, i) {
  for (var o = ph(t), r = -1, s = i.length; ++r < s; ) o.remove(i[r]);
}
function D_(t) {
  return function() {
    rb(this, t);
  };
}
function O_(t) {
  return function() {
    lb(this, t);
  };
}
function z_(t, i) {
  return function() {
    (i.apply(this, arguments) ? rb : lb)(this, t);
  };
}
function R_(t, i) {
  var o = ab(t + "");
  if (arguments.length < 2) {
    for (var r = ph(this.node()), s = -1, u = o.length; ++s < u; ) if (!r.contains(o[s])) return !1;
    return !0;
  }
  return this.each((typeof i == "function" ? z_ : i ? D_ : O_)(o, i));
}
function k_() {
  this.textContent = "";
}
function H_(t) {
  return function() {
    this.textContent = t;
  };
}
function L_(t) {
  return function() {
    var i = t.apply(this, arguments);
    this.textContent = i ?? "";
  };
}
function B_(t) {
  return arguments.length ? this.each(t == null ? k_ : (typeof t == "function" ? L_ : H_)(t)) : this.node().textContent;
}
function I_() {
  this.innerHTML = "";
}
function V_(t) {
  return function() {
    this.innerHTML = t;
  };
}
function U_(t) {
  return function() {
    var i = t.apply(this, arguments);
    this.innerHTML = i ?? "";
  };
}
function Y_(t) {
  return arguments.length ? this.each(t == null ? I_ : (typeof t == "function" ? U_ : V_)(t)) : this.node().innerHTML;
}
function q_() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function $_() {
  return this.each(q_);
}
function X_() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function G_() {
  return this.each(X_);
}
function Z_(t) {
  var i = typeof t == "function" ? t : Jv(t);
  return this.select(function() {
    return this.appendChild(i.apply(this, arguments));
  });
}
function K_() {
  return null;
}
function Q_(t, i) {
  var o = typeof t == "function" ? t : Jv(t), r = i == null ? K_ : typeof i == "function" ? i : gh(i);
  return this.select(function() {
    return this.insertBefore(o.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function F_() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function W_() {
  return this.each(F_);
}
function J_() {
  var t = this.cloneNode(!1), i = this.parentNode;
  return i ? i.insertBefore(t, this.nextSibling) : t;
}
function P_() {
  var t = this.cloneNode(!0), i = this.parentNode;
  return i ? i.insertBefore(t, this.nextSibling) : t;
}
function eN(t) {
  return this.select(t ? P_ : J_);
}
function tN(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function nN(t) {
  return function(i) {
    t.call(this, i, this.__data__);
  };
}
function iN(t) {
  return t.trim().split(/^|\s+/).map(function(i) {
    var o = "", r = i.indexOf(".");
    return r >= 0 && (o = i.slice(r + 1), i = i.slice(0, r)), { type: i, name: o };
  });
}
function aN(t) {
  return function() {
    var i = this.__on;
    if (i) {
      for (var o = 0, r = -1, s = i.length, u; o < s; ++o)
        u = i[o], (!t.type || u.type === t.type) && u.name === t.name ? this.removeEventListener(u.type, u.listener, u.options) : i[++r] = u;
      ++r ? i.length = r : delete this.__on;
    }
  };
}
function oN(t, i, o) {
  return function() {
    var r = this.__on, s, u = nN(i);
    if (r) {
      for (var c = 0, d = r.length; c < d; ++c)
        if ((s = r[c]).type === t.type && s.name === t.name) {
          this.removeEventListener(s.type, s.listener, s.options), this.addEventListener(s.type, s.listener = u, s.options = o), s.value = i;
          return;
        }
    }
    this.addEventListener(t.type, u, o), s = { type: t.type, name: t.name, value: i, listener: u, options: o }, r ? r.push(s) : this.__on = [s];
  };
}
function rN(t, i, o) {
  var r = iN(t + ""), s, u = r.length, c;
  if (arguments.length < 2) {
    var d = this.node().__on;
    if (d) {
      for (var m = 0, y = d.length, g; m < y; ++m)
        for (s = 0, g = d[m]; s < u; ++s)
          if ((c = r[s]).type === g.type && c.name === g.name)
            return g.value;
    }
    return;
  }
  for (d = i ? oN : aN, s = 0; s < u; ++s) this.each(d(r[s], i, o));
  return this;
}
function sb(t, i, o) {
  var r = ib(t), s = r.CustomEvent;
  typeof s == "function" ? s = new s(i, o) : (s = r.document.createEvent("Event"), o ? (s.initEvent(i, o.bubbles, o.cancelable), s.detail = o.detail) : s.initEvent(i, !1, !1)), t.dispatchEvent(s);
}
function lN(t, i) {
  return function() {
    return sb(this, t, i);
  };
}
function sN(t, i) {
  return function() {
    return sb(this, t, i.apply(this, arguments));
  };
}
function uN(t, i) {
  return this.each((typeof i == "function" ? sN : lN)(t, i));
}
function* cN() {
  for (var t = this._groups, i = 0, o = t.length; i < o; ++i)
    for (var r = t[i], s = 0, u = r.length, c; s < u; ++s)
      (c = r[s]) && (yield c);
}
var ub = [null];
function en(t, i) {
  this._groups = t, this._parents = i;
}
function ml() {
  return new en([[document.documentElement]], ub);
}
function fN() {
  return this;
}
en.prototype = ml.prototype = {
  constructor: en,
  select: LE,
  selectAll: UE,
  selectChild: XE,
  selectChildren: QE,
  filter: FE,
  data: n_,
  enter: WE,
  exit: a_,
  join: o_,
  merge: r_,
  selection: fN,
  order: l_,
  sort: s_,
  call: c_,
  nodes: f_,
  node: d_,
  size: h_,
  empty: m_,
  each: g_,
  attr: w_,
  style: C_,
  property: j_,
  classed: R_,
  text: B_,
  html: Y_,
  raise: $_,
  lower: G_,
  append: Z_,
  insert: Q_,
  remove: W_,
  clone: eN,
  datum: tN,
  on: rN,
  dispatch: uN,
  [Symbol.iterator]: cN
};
function Jt(t) {
  return typeof t == "string" ? new en([[document.querySelector(t)]], [document.documentElement]) : new en([[t]], ub);
}
function dN(t) {
  let i;
  for (; i = t.sourceEvent; ) t = i;
  return t;
}
function vn(t, i) {
  if (t = dN(t), i === void 0 && (i = t.currentTarget), i) {
    var o = i.ownerSVGElement || i;
    if (o.createSVGPoint) {
      var r = o.createSVGPoint();
      return r.x = t.clientX, r.y = t.clientY, r = r.matrixTransform(i.getScreenCTM().inverse()), [r.x, r.y];
    }
    if (i.getBoundingClientRect) {
      var s = i.getBoundingClientRect();
      return [t.clientX - s.left - i.clientLeft, t.clientY - s.top - i.clientTop];
    }
  }
  return [t.pageX, t.pageY];
}
const hN = { passive: !1 }, tl = { capture: !0, passive: !1 };
function bd(t) {
  t.stopImmediatePropagation();
}
function Eo(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function cb(t) {
  var i = t.document.documentElement, o = Jt(t).on("dragstart.drag", Eo, tl);
  "onselectstart" in i ? o.on("selectstart.drag", Eo, tl) : (i.__noselect = i.style.MozUserSelect, i.style.MozUserSelect = "none");
}
function fb(t, i) {
  var o = t.document.documentElement, r = Jt(t).on("dragstart.drag", null);
  i && (r.on("click.drag", Eo, tl), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in o ? r.on("selectstart.drag", null) : (o.style.MozUserSelect = o.__noselect, delete o.__noselect);
}
const Ks = (t) => () => t;
function Gd(t, {
  sourceEvent: i,
  subject: o,
  target: r,
  identifier: s,
  active: u,
  x: c,
  y: d,
  dx: m,
  dy: y,
  dispatch: g
}) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: i, enumerable: !0, configurable: !0 },
    subject: { value: o, enumerable: !0, configurable: !0 },
    target: { value: r, enumerable: !0, configurable: !0 },
    identifier: { value: s, enumerable: !0, configurable: !0 },
    active: { value: u, enumerable: !0, configurable: !0 },
    x: { value: c, enumerable: !0, configurable: !0 },
    y: { value: d, enumerable: !0, configurable: !0 },
    dx: { value: m, enumerable: !0, configurable: !0 },
    dy: { value: y, enumerable: !0, configurable: !0 },
    _: { value: g }
  });
}
Gd.prototype.on = function() {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function mN(t) {
  return !t.ctrlKey && !t.button;
}
function gN() {
  return this.parentNode;
}
function pN(t, i) {
  return i ?? { x: t.x, y: t.y };
}
function yN() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function db() {
  var t = mN, i = gN, o = pN, r = yN, s = {}, u = Vu("start", "drag", "end"), c = 0, d, m, y, g, p = 0;
  function v(C) {
    C.on("mousedown.drag", b).filter(r).on("touchstart.drag", M).on("touchmove.drag", T, hN).on("touchend.drag touchcancel.drag", O).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function b(C, k) {
    if (!(g || !t.call(this, C, k))) {
      var L = _(this, i.call(this, C, k), C, k, "mouse");
      L && (Jt(C.view).on("mousemove.drag", S, tl).on("mouseup.drag", N, tl), cb(C.view), bd(C), y = !1, d = C.clientX, m = C.clientY, L("start", C));
    }
  }
  function S(C) {
    if (Eo(C), !y) {
      var k = C.clientX - d, L = C.clientY - m;
      y = k * k + L * L > p;
    }
    s.mouse("drag", C);
  }
  function N(C) {
    Jt(C.view).on("mousemove.drag mouseup.drag", null), fb(C.view, y), Eo(C), s.mouse("end", C);
  }
  function M(C, k) {
    if (t.call(this, C, k)) {
      var L = C.changedTouches, H = i.call(this, C, k), I = L.length, ee, Q;
      for (ee = 0; ee < I; ++ee)
        (Q = _(this, H, C, k, L[ee].identifier, L[ee])) && (bd(C), Q("start", C, L[ee]));
    }
  }
  function T(C) {
    var k = C.changedTouches, L = k.length, H, I;
    for (H = 0; H < L; ++H)
      (I = s[k[H].identifier]) && (Eo(C), I("drag", C, k[H]));
  }
  function O(C) {
    var k = C.changedTouches, L = k.length, H, I;
    for (g && clearTimeout(g), g = setTimeout(function() {
      g = null;
    }, 500), H = 0; H < L; ++H)
      (I = s[k[H].identifier]) && (bd(C), I("end", C, k[H]));
  }
  function _(C, k, L, H, I, ee) {
    var Q = u.copy(), X = vn(ee || L, k), J, G, j;
    if ((j = o.call(C, new Gd("beforestart", {
      sourceEvent: L,
      target: v,
      identifier: I,
      active: c,
      x: X[0],
      y: X[1],
      dx: 0,
      dy: 0,
      dispatch: Q
    }), H)) != null)
      return J = j.x - X[0] || 0, G = j.y - X[1] || 0, function Y(A, z, q) {
        var W = X, te;
        switch (A) {
          case "start":
            s[I] = Y, te = c++;
            break;
          case "end":
            delete s[I], --c;
          // falls through
          case "drag":
            X = vn(q || z, k), te = c;
            break;
        }
        Q.call(
          A,
          C,
          new Gd(A, {
            sourceEvent: z,
            subject: j,
            target: v,
            identifier: I,
            active: te,
            x: X[0] + J,
            y: X[1] + G,
            dx: X[0] - W[0],
            dy: X[1] - W[1],
            dispatch: Q
          }),
          H
        );
      };
  }
  return v.filter = function(C) {
    return arguments.length ? (t = typeof C == "function" ? C : Ks(!!C), v) : t;
  }, v.container = function(C) {
    return arguments.length ? (i = typeof C == "function" ? C : Ks(C), v) : i;
  }, v.subject = function(C) {
    return arguments.length ? (o = typeof C == "function" ? C : Ks(C), v) : o;
  }, v.touchable = function(C) {
    return arguments.length ? (r = typeof C == "function" ? C : Ks(!!C), v) : r;
  }, v.on = function() {
    var C = u.on.apply(u, arguments);
    return C === u ? v : C;
  }, v.clickDistance = function(C) {
    return arguments.length ? (p = (C = +C) * C, v) : Math.sqrt(p);
  }, v;
}
function yh(t, i, o) {
  t.prototype = i.prototype = o, o.constructor = t;
}
function hb(t, i) {
  var o = Object.create(t.prototype);
  for (var r in i) o[r] = i[r];
  return o;
}
function gl() {
}
var nl = 0.7, wu = 1 / nl, _o = "\\s*([+-]?\\d+)\\s*", il = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Hn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", vN = /^#([0-9a-f]{3,8})$/, bN = new RegExp(`^rgb\\(${_o},${_o},${_o}\\)$`), xN = new RegExp(`^rgb\\(${Hn},${Hn},${Hn}\\)$`), SN = new RegExp(`^rgba\\(${_o},${_o},${_o},${il}\\)$`), wN = new RegExp(`^rgba\\(${Hn},${Hn},${Hn},${il}\\)$`), EN = new RegExp(`^hsl\\(${il},${Hn},${Hn}\\)$`), _N = new RegExp(`^hsla\\(${il},${Hn},${Hn},${il}\\)$`), Gy = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
yh(gl, Ea, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Zy,
  // Deprecated! Use color.formatHex.
  formatHex: Zy,
  formatHex8: NN,
  formatHsl: CN,
  formatRgb: Ky,
  toString: Ky
});
function Zy() {
  return this.rgb().formatHex();
}
function NN() {
  return this.rgb().formatHex8();
}
function CN() {
  return mb(this).formatHsl();
}
function Ky() {
  return this.rgb().formatRgb();
}
function Ea(t) {
  var i, o;
  return t = (t + "").trim().toLowerCase(), (i = vN.exec(t)) ? (o = i[1].length, i = parseInt(i[1], 16), o === 6 ? Qy(i) : o === 3 ? new qt(i >> 8 & 15 | i >> 4 & 240, i >> 4 & 15 | i & 240, (i & 15) << 4 | i & 15, 1) : o === 8 ? Qs(i >> 24 & 255, i >> 16 & 255, i >> 8 & 255, (i & 255) / 255) : o === 4 ? Qs(i >> 12 & 15 | i >> 8 & 240, i >> 8 & 15 | i >> 4 & 240, i >> 4 & 15 | i & 240, ((i & 15) << 4 | i & 15) / 255) : null) : (i = bN.exec(t)) ? new qt(i[1], i[2], i[3], 1) : (i = xN.exec(t)) ? new qt(i[1] * 255 / 100, i[2] * 255 / 100, i[3] * 255 / 100, 1) : (i = SN.exec(t)) ? Qs(i[1], i[2], i[3], i[4]) : (i = wN.exec(t)) ? Qs(i[1] * 255 / 100, i[2] * 255 / 100, i[3] * 255 / 100, i[4]) : (i = EN.exec(t)) ? Jy(i[1], i[2] / 100, i[3] / 100, 1) : (i = _N.exec(t)) ? Jy(i[1], i[2] / 100, i[3] / 100, i[4]) : Gy.hasOwnProperty(t) ? Qy(Gy[t]) : t === "transparent" ? new qt(NaN, NaN, NaN, 0) : null;
}
function Qy(t) {
  return new qt(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function Qs(t, i, o, r) {
  return r <= 0 && (t = i = o = NaN), new qt(t, i, o, r);
}
function MN(t) {
  return t instanceof gl || (t = Ea(t)), t ? (t = t.rgb(), new qt(t.r, t.g, t.b, t.opacity)) : new qt();
}
function Zd(t, i, o, r) {
  return arguments.length === 1 ? MN(t) : new qt(t, i, o, r ?? 1);
}
function qt(t, i, o, r) {
  this.r = +t, this.g = +i, this.b = +o, this.opacity = +r;
}
yh(qt, Zd, hb(gl, {
  brighter(t) {
    return t = t == null ? wu : Math.pow(wu, t), new qt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? nl : Math.pow(nl, t), new qt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new qt(ba(this.r), ba(this.g), ba(this.b), Eu(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Fy,
  // Deprecated! Use color.formatHex.
  formatHex: Fy,
  formatHex8: TN,
  formatRgb: Wy,
  toString: Wy
}));
function Fy() {
  return `#${ya(this.r)}${ya(this.g)}${ya(this.b)}`;
}
function TN() {
  return `#${ya(this.r)}${ya(this.g)}${ya(this.b)}${ya((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Wy() {
  const t = Eu(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${ba(this.r)}, ${ba(this.g)}, ${ba(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Eu(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function ba(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function ya(t) {
  return t = ba(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Jy(t, i, o, r) {
  return r <= 0 ? t = i = o = NaN : o <= 0 || o >= 1 ? t = i = NaN : i <= 0 && (t = NaN), new xn(t, i, o, r);
}
function mb(t) {
  if (t instanceof xn) return new xn(t.h, t.s, t.l, t.opacity);
  if (t instanceof gl || (t = Ea(t)), !t) return new xn();
  if (t instanceof xn) return t;
  t = t.rgb();
  var i = t.r / 255, o = t.g / 255, r = t.b / 255, s = Math.min(i, o, r), u = Math.max(i, o, r), c = NaN, d = u - s, m = (u + s) / 2;
  return d ? (i === u ? c = (o - r) / d + (o < r) * 6 : o === u ? c = (r - i) / d + 2 : c = (i - o) / d + 4, d /= m < 0.5 ? u + s : 2 - u - s, c *= 60) : d = m > 0 && m < 1 ? 0 : c, new xn(c, d, m, t.opacity);
}
function AN(t, i, o, r) {
  return arguments.length === 1 ? mb(t) : new xn(t, i, o, r ?? 1);
}
function xn(t, i, o, r) {
  this.h = +t, this.s = +i, this.l = +o, this.opacity = +r;
}
yh(xn, AN, hb(gl, {
  brighter(t) {
    return t = t == null ? wu : Math.pow(wu, t), new xn(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? nl : Math.pow(nl, t), new xn(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, i = isNaN(t) || isNaN(this.s) ? 0 : this.s, o = this.l, r = o + (o < 0.5 ? o : 1 - o) * i, s = 2 * o - r;
    return new qt(
      xd(t >= 240 ? t - 240 : t + 120, s, r),
      xd(t, s, r),
      xd(t < 120 ? t + 240 : t - 120, s, r),
      this.opacity
    );
  },
  clamp() {
    return new xn(Py(this.h), Fs(this.s), Fs(this.l), Eu(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Eu(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Py(this.h)}, ${Fs(this.s) * 100}%, ${Fs(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Py(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function Fs(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function xd(t, i, o) {
  return (t < 60 ? i + (o - i) * t / 60 : t < 180 ? o : t < 240 ? i + (o - i) * (240 - t) / 60 : i) * 255;
}
const vh = (t) => () => t;
function jN(t, i) {
  return function(o) {
    return t + o * i;
  };
}
function DN(t, i, o) {
  return t = Math.pow(t, o), i = Math.pow(i, o) - t, o = 1 / o, function(r) {
    return Math.pow(t + r * i, o);
  };
}
function ON(t) {
  return (t = +t) == 1 ? gb : function(i, o) {
    return o - i ? DN(i, o, t) : vh(isNaN(i) ? o : i);
  };
}
function gb(t, i) {
  var o = i - t;
  return o ? jN(t, o) : vh(isNaN(t) ? i : t);
}
const _u = (function t(i) {
  var o = ON(i);
  function r(s, u) {
    var c = o((s = Zd(s)).r, (u = Zd(u)).r), d = o(s.g, u.g), m = o(s.b, u.b), y = gb(s.opacity, u.opacity);
    return function(g) {
      return s.r = c(g), s.g = d(g), s.b = m(g), s.opacity = y(g), s + "";
    };
  }
  return r.gamma = t, r;
})(1);
function zN(t, i) {
  i || (i = []);
  var o = t ? Math.min(i.length, t.length) : 0, r = i.slice(), s;
  return function(u) {
    for (s = 0; s < o; ++s) r[s] = t[s] * (1 - u) + i[s] * u;
    return r;
  };
}
function RN(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function kN(t, i) {
  var o = i ? i.length : 0, r = t ? Math.min(o, t.length) : 0, s = new Array(r), u = new Array(o), c;
  for (c = 0; c < r; ++c) s[c] = Zr(t[c], i[c]);
  for (; c < o; ++c) u[c] = i[c];
  return function(d) {
    for (c = 0; c < r; ++c) u[c] = s[c](d);
    return u;
  };
}
function HN(t, i) {
  var o = /* @__PURE__ */ new Date();
  return t = +t, i = +i, function(r) {
    return o.setTime(t * (1 - r) + i * r), o;
  };
}
function zn(t, i) {
  return t = +t, i = +i, function(o) {
    return t * (1 - o) + i * o;
  };
}
function LN(t, i) {
  var o = {}, r = {}, s;
  (t === null || typeof t != "object") && (t = {}), (i === null || typeof i != "object") && (i = {});
  for (s in i)
    s in t ? o[s] = Zr(t[s], i[s]) : r[s] = i[s];
  return function(u) {
    for (s in o) r[s] = o[s](u);
    return r;
  };
}
var Kd = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Sd = new RegExp(Kd.source, "g");
function BN(t) {
  return function() {
    return t;
  };
}
function IN(t) {
  return function(i) {
    return t(i) + "";
  };
}
function pb(t, i) {
  var o = Kd.lastIndex = Sd.lastIndex = 0, r, s, u, c = -1, d = [], m = [];
  for (t = t + "", i = i + ""; (r = Kd.exec(t)) && (s = Sd.exec(i)); )
    (u = s.index) > o && (u = i.slice(o, u), d[c] ? d[c] += u : d[++c] = u), (r = r[0]) === (s = s[0]) ? d[c] ? d[c] += s : d[++c] = s : (d[++c] = null, m.push({ i: c, x: zn(r, s) })), o = Sd.lastIndex;
  return o < i.length && (u = i.slice(o), d[c] ? d[c] += u : d[++c] = u), d.length < 2 ? m[0] ? IN(m[0].x) : BN(i) : (i = m.length, function(y) {
    for (var g = 0, p; g < i; ++g) d[(p = m[g]).i] = p.x(y);
    return d.join("");
  });
}
function Zr(t, i) {
  var o = typeof i, r;
  return i == null || o === "boolean" ? vh(i) : (o === "number" ? zn : o === "string" ? (r = Ea(i)) ? (i = r, _u) : pb : i instanceof Ea ? _u : i instanceof Date ? HN : RN(i) ? zN : Array.isArray(i) ? kN : typeof i.valueOf != "function" && typeof i.toString != "function" || isNaN(i) ? LN : zn)(t, i);
}
var e0 = 180 / Math.PI, Qd = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function yb(t, i, o, r, s, u) {
  var c, d, m;
  return (c = Math.sqrt(t * t + i * i)) && (t /= c, i /= c), (m = t * o + i * r) && (o -= t * m, r -= i * m), (d = Math.sqrt(o * o + r * r)) && (o /= d, r /= d, m /= d), t * r < i * o && (t = -t, i = -i, m = -m, c = -c), {
    translateX: s,
    translateY: u,
    rotate: Math.atan2(i, t) * e0,
    skewX: Math.atan(m) * e0,
    scaleX: c,
    scaleY: d
  };
}
var Ws;
function VN(t) {
  const i = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return i.isIdentity ? Qd : yb(i.a, i.b, i.c, i.d, i.e, i.f);
}
function UN(t) {
  return t == null || (Ws || (Ws = document.createElementNS("http://www.w3.org/2000/svg", "g")), Ws.setAttribute("transform", t), !(t = Ws.transform.baseVal.consolidate())) ? Qd : (t = t.matrix, yb(t.a, t.b, t.c, t.d, t.e, t.f));
}
function vb(t, i, o, r) {
  function s(y) {
    return y.length ? y.pop() + " " : "";
  }
  function u(y, g, p, v, b, S) {
    if (y !== p || g !== v) {
      var N = b.push("translate(", null, i, null, o);
      S.push({ i: N - 4, x: zn(y, p) }, { i: N - 2, x: zn(g, v) });
    } else (p || v) && b.push("translate(" + p + i + v + o);
  }
  function c(y, g, p, v) {
    y !== g ? (y - g > 180 ? g += 360 : g - y > 180 && (y += 360), v.push({ i: p.push(s(p) + "rotate(", null, r) - 2, x: zn(y, g) })) : g && p.push(s(p) + "rotate(" + g + r);
  }
  function d(y, g, p, v) {
    y !== g ? v.push({ i: p.push(s(p) + "skewX(", null, r) - 2, x: zn(y, g) }) : g && p.push(s(p) + "skewX(" + g + r);
  }
  function m(y, g, p, v, b, S) {
    if (y !== p || g !== v) {
      var N = b.push(s(b) + "scale(", null, ",", null, ")");
      S.push({ i: N - 4, x: zn(y, p) }, { i: N - 2, x: zn(g, v) });
    } else (p !== 1 || v !== 1) && b.push(s(b) + "scale(" + p + "," + v + ")");
  }
  return function(y, g) {
    var p = [], v = [];
    return y = t(y), g = t(g), u(y.translateX, y.translateY, g.translateX, g.translateY, p, v), c(y.rotate, g.rotate, p, v), d(y.skewX, g.skewX, p, v), m(y.scaleX, y.scaleY, g.scaleX, g.scaleY, p, v), y = g = null, function(b) {
      for (var S = -1, N = v.length, M; ++S < N; ) p[(M = v[S]).i] = M.x(b);
      return p.join("");
    };
  };
}
var YN = vb(VN, "px, ", "px)", "deg)"), qN = vb(UN, ", ", ")", ")"), $N = 1e-12;
function t0(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function XN(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function GN(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const ru = (function t(i, o, r) {
  function s(u, c) {
    var d = u[0], m = u[1], y = u[2], g = c[0], p = c[1], v = c[2], b = g - d, S = p - m, N = b * b + S * S, M, T;
    if (N < $N)
      T = Math.log(v / y) / i, M = function(H) {
        return [
          d + H * b,
          m + H * S,
          y * Math.exp(i * H * T)
        ];
      };
    else {
      var O = Math.sqrt(N), _ = (v * v - y * y + r * N) / (2 * y * o * O), C = (v * v - y * y - r * N) / (2 * v * o * O), k = Math.log(Math.sqrt(_ * _ + 1) - _), L = Math.log(Math.sqrt(C * C + 1) - C);
      T = (L - k) / i, M = function(H) {
        var I = H * T, ee = t0(k), Q = y / (o * O) * (ee * GN(i * I + k) - XN(k));
        return [
          d + Q * b,
          m + Q * S,
          y * ee / t0(i * I + k)
        ];
      };
    }
    return M.duration = T * 1e3 * i / Math.SQRT2, M;
  }
  return s.rho = function(u) {
    var c = Math.max(1e-3, +u), d = c * c, m = d * d;
    return t(c, d, m);
  }, s;
})(Math.SQRT2, 2, 4);
var Mo = 0, qr = 0, Rr = 0, bb = 1e3, Nu, $r, Cu = 0, _a = 0, Yu = 0, al = typeof performance == "object" && performance.now ? performance : Date, xb = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function bh() {
  return _a || (xb(ZN), _a = al.now() + Yu);
}
function ZN() {
  _a = 0;
}
function Mu() {
  this._call = this._time = this._next = null;
}
Mu.prototype = Sb.prototype = {
  constructor: Mu,
  restart: function(t, i, o) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    o = (o == null ? bh() : +o) + (i == null ? 0 : +i), !this._next && $r !== this && ($r ? $r._next = this : Nu = this, $r = this), this._call = t, this._time = o, Fd();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Fd());
  }
};
function Sb(t, i, o) {
  var r = new Mu();
  return r.restart(t, i, o), r;
}
function KN() {
  bh(), ++Mo;
  for (var t = Nu, i; t; )
    (i = _a - t._time) >= 0 && t._call.call(void 0, i), t = t._next;
  --Mo;
}
function n0() {
  _a = (Cu = al.now()) + Yu, Mo = qr = 0;
  try {
    KN();
  } finally {
    Mo = 0, FN(), _a = 0;
  }
}
function QN() {
  var t = al.now(), i = t - Cu;
  i > bb && (Yu -= i, Cu = t);
}
function FN() {
  for (var t, i = Nu, o, r = 1 / 0; i; )
    i._call ? (r > i._time && (r = i._time), t = i, i = i._next) : (o = i._next, i._next = null, i = t ? t._next = o : Nu = o);
  $r = t, Fd(r);
}
function Fd(t) {
  if (!Mo) {
    qr && (qr = clearTimeout(qr));
    var i = t - _a;
    i > 24 ? (t < 1 / 0 && (qr = setTimeout(n0, t - al.now() - Yu)), Rr && (Rr = clearInterval(Rr))) : (Rr || (Cu = al.now(), Rr = setInterval(QN, bb)), Mo = 1, xb(n0));
  }
}
function i0(t, i, o) {
  var r = new Mu();
  return i = i == null ? 0 : +i, r.restart((s) => {
    r.stop(), t(s + i);
  }, i, o), r;
}
var WN = Vu("start", "end", "cancel", "interrupt"), JN = [], wb = 0, a0 = 1, Wd = 2, lu = 3, o0 = 4, Jd = 5, su = 6;
function qu(t, i, o, r, s, u) {
  var c = t.__transition;
  if (!c) t.__transition = {};
  else if (o in c) return;
  PN(t, o, {
    name: i,
    index: r,
    // For context during callback.
    group: s,
    // For context during callback.
    on: WN,
    tween: JN,
    time: u.time,
    delay: u.delay,
    duration: u.duration,
    ease: u.ease,
    timer: null,
    state: wb
  });
}
function xh(t, i) {
  var o = Cn(t, i);
  if (o.state > wb) throw new Error("too late; already scheduled");
  return o;
}
function Ln(t, i) {
  var o = Cn(t, i);
  if (o.state > lu) throw new Error("too late; already running");
  return o;
}
function Cn(t, i) {
  var o = t.__transition;
  if (!o || !(o = o[i])) throw new Error("transition not found");
  return o;
}
function PN(t, i, o) {
  var r = t.__transition, s;
  r[i] = o, o.timer = Sb(u, 0, o.time);
  function u(y) {
    o.state = a0, o.timer.restart(c, o.delay, o.time), o.delay <= y && c(y - o.delay);
  }
  function c(y) {
    var g, p, v, b;
    if (o.state !== a0) return m();
    for (g in r)
      if (b = r[g], b.name === o.name) {
        if (b.state === lu) return i0(c);
        b.state === o0 ? (b.state = su, b.timer.stop(), b.on.call("interrupt", t, t.__data__, b.index, b.group), delete r[g]) : +g < i && (b.state = su, b.timer.stop(), b.on.call("cancel", t, t.__data__, b.index, b.group), delete r[g]);
      }
    if (i0(function() {
      o.state === lu && (o.state = o0, o.timer.restart(d, o.delay, o.time), d(y));
    }), o.state = Wd, o.on.call("start", t, t.__data__, o.index, o.group), o.state === Wd) {
      for (o.state = lu, s = new Array(v = o.tween.length), g = 0, p = -1; g < v; ++g)
        (b = o.tween[g].value.call(t, t.__data__, o.index, o.group)) && (s[++p] = b);
      s.length = p + 1;
    }
  }
  function d(y) {
    for (var g = y < o.duration ? o.ease.call(null, y / o.duration) : (o.timer.restart(m), o.state = Jd, 1), p = -1, v = s.length; ++p < v; )
      s[p].call(t, g);
    o.state === Jd && (o.on.call("end", t, t.__data__, o.index, o.group), m());
  }
  function m() {
    o.state = su, o.timer.stop(), delete r[i];
    for (var y in r) return;
    delete t.__transition;
  }
}
function uu(t, i) {
  var o = t.__transition, r, s, u = !0, c;
  if (o) {
    i = i == null ? null : i + "";
    for (c in o) {
      if ((r = o[c]).name !== i) {
        u = !1;
        continue;
      }
      s = r.state > Wd && r.state < Jd, r.state = su, r.timer.stop(), r.on.call(s ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete o[c];
    }
    u && delete t.__transition;
  }
}
function e2(t) {
  return this.each(function() {
    uu(this, t);
  });
}
function t2(t, i) {
  var o, r;
  return function() {
    var s = Ln(this, t), u = s.tween;
    if (u !== o) {
      r = o = u;
      for (var c = 0, d = r.length; c < d; ++c)
        if (r[c].name === i) {
          r = r.slice(), r.splice(c, 1);
          break;
        }
    }
    s.tween = r;
  };
}
function n2(t, i, o) {
  var r, s;
  if (typeof o != "function") throw new Error();
  return function() {
    var u = Ln(this, t), c = u.tween;
    if (c !== r) {
      s = (r = c).slice();
      for (var d = { name: i, value: o }, m = 0, y = s.length; m < y; ++m)
        if (s[m].name === i) {
          s[m] = d;
          break;
        }
      m === y && s.push(d);
    }
    u.tween = s;
  };
}
function i2(t, i) {
  var o = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = Cn(this.node(), o).tween, s = 0, u = r.length, c; s < u; ++s)
      if ((c = r[s]).name === t)
        return c.value;
    return null;
  }
  return this.each((i == null ? t2 : n2)(o, t, i));
}
function Sh(t, i, o) {
  var r = t._id;
  return t.each(function() {
    var s = Ln(this, r);
    (s.value || (s.value = {}))[i] = o.apply(this, arguments);
  }), function(s) {
    return Cn(s, r).value[i];
  };
}
function Eb(t, i) {
  var o;
  return (typeof i == "number" ? zn : i instanceof Ea ? _u : (o = Ea(i)) ? (i = o, _u) : pb)(t, i);
}
function a2(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function o2(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function r2(t, i, o) {
  var r, s = o + "", u;
  return function() {
    var c = this.getAttribute(t);
    return c === s ? null : c === r ? u : u = i(r = c, o);
  };
}
function l2(t, i, o) {
  var r, s = o + "", u;
  return function() {
    var c = this.getAttributeNS(t.space, t.local);
    return c === s ? null : c === r ? u : u = i(r = c, o);
  };
}
function s2(t, i, o) {
  var r, s, u;
  return function() {
    var c, d = o(this), m;
    return d == null ? void this.removeAttribute(t) : (c = this.getAttribute(t), m = d + "", c === m ? null : c === r && m === s ? u : (s = m, u = i(r = c, d)));
  };
}
function u2(t, i, o) {
  var r, s, u;
  return function() {
    var c, d = o(this), m;
    return d == null ? void this.removeAttributeNS(t.space, t.local) : (c = this.getAttributeNS(t.space, t.local), m = d + "", c === m ? null : c === r && m === s ? u : (s = m, u = i(r = c, d)));
  };
}
function c2(t, i) {
  var o = Uu(t), r = o === "transform" ? qN : Eb;
  return this.attrTween(t, typeof i == "function" ? (o.local ? u2 : s2)(o, r, Sh(this, "attr." + t, i)) : i == null ? (o.local ? o2 : a2)(o) : (o.local ? l2 : r2)(o, r, i));
}
function f2(t, i) {
  return function(o) {
    this.setAttribute(t, i.call(this, o));
  };
}
function d2(t, i) {
  return function(o) {
    this.setAttributeNS(t.space, t.local, i.call(this, o));
  };
}
function h2(t, i) {
  var o, r;
  function s() {
    var u = i.apply(this, arguments);
    return u !== r && (o = (r = u) && d2(t, u)), o;
  }
  return s._value = i, s;
}
function m2(t, i) {
  var o, r;
  function s() {
    var u = i.apply(this, arguments);
    return u !== r && (o = (r = u) && f2(t, u)), o;
  }
  return s._value = i, s;
}
function g2(t, i) {
  var o = "attr." + t;
  if (arguments.length < 2) return (o = this.tween(o)) && o._value;
  if (i == null) return this.tween(o, null);
  if (typeof i != "function") throw new Error();
  var r = Uu(t);
  return this.tween(o, (r.local ? h2 : m2)(r, i));
}
function p2(t, i) {
  return function() {
    xh(this, t).delay = +i.apply(this, arguments);
  };
}
function y2(t, i) {
  return i = +i, function() {
    xh(this, t).delay = i;
  };
}
function v2(t) {
  var i = this._id;
  return arguments.length ? this.each((typeof t == "function" ? p2 : y2)(i, t)) : Cn(this.node(), i).delay;
}
function b2(t, i) {
  return function() {
    Ln(this, t).duration = +i.apply(this, arguments);
  };
}
function x2(t, i) {
  return i = +i, function() {
    Ln(this, t).duration = i;
  };
}
function S2(t) {
  var i = this._id;
  return arguments.length ? this.each((typeof t == "function" ? b2 : x2)(i, t)) : Cn(this.node(), i).duration;
}
function w2(t, i) {
  if (typeof i != "function") throw new Error();
  return function() {
    Ln(this, t).ease = i;
  };
}
function E2(t) {
  var i = this._id;
  return arguments.length ? this.each(w2(i, t)) : Cn(this.node(), i).ease;
}
function _2(t, i) {
  return function() {
    var o = i.apply(this, arguments);
    if (typeof o != "function") throw new Error();
    Ln(this, t).ease = o;
  };
}
function N2(t) {
  if (typeof t != "function") throw new Error();
  return this.each(_2(this._id, t));
}
function C2(t) {
  typeof t != "function" && (t = eb(t));
  for (var i = this._groups, o = i.length, r = new Array(o), s = 0; s < o; ++s)
    for (var u = i[s], c = u.length, d = r[s] = [], m, y = 0; y < c; ++y)
      (m = u[y]) && t.call(m, m.__data__, y, u) && d.push(m);
  return new ci(r, this._parents, this._name, this._id);
}
function M2(t) {
  if (t._id !== this._id) throw new Error();
  for (var i = this._groups, o = t._groups, r = i.length, s = o.length, u = Math.min(r, s), c = new Array(r), d = 0; d < u; ++d)
    for (var m = i[d], y = o[d], g = m.length, p = c[d] = new Array(g), v, b = 0; b < g; ++b)
      (v = m[b] || y[b]) && (p[b] = v);
  for (; d < r; ++d)
    c[d] = i[d];
  return new ci(c, this._parents, this._name, this._id);
}
function T2(t) {
  return (t + "").trim().split(/^|\s+/).every(function(i) {
    var o = i.indexOf(".");
    return o >= 0 && (i = i.slice(0, o)), !i || i === "start";
  });
}
function A2(t, i, o) {
  var r, s, u = T2(i) ? xh : Ln;
  return function() {
    var c = u(this, t), d = c.on;
    d !== r && (s = (r = d).copy()).on(i, o), c.on = s;
  };
}
function j2(t, i) {
  var o = this._id;
  return arguments.length < 2 ? Cn(this.node(), o).on.on(t) : this.each(A2(o, t, i));
}
function D2(t) {
  return function() {
    var i = this.parentNode;
    for (var o in this.__transition) if (+o !== t) return;
    i && i.removeChild(this);
  };
}
function O2() {
  return this.on("end.remove", D2(this._id));
}
function z2(t) {
  var i = this._name, o = this._id;
  typeof t != "function" && (t = gh(t));
  for (var r = this._groups, s = r.length, u = new Array(s), c = 0; c < s; ++c)
    for (var d = r[c], m = d.length, y = u[c] = new Array(m), g, p, v = 0; v < m; ++v)
      (g = d[v]) && (p = t.call(g, g.__data__, v, d)) && ("__data__" in g && (p.__data__ = g.__data__), y[v] = p, qu(y[v], i, o, v, y, Cn(g, o)));
  return new ci(u, this._parents, i, o);
}
function R2(t) {
  var i = this._name, o = this._id;
  typeof t != "function" && (t = Pv(t));
  for (var r = this._groups, s = r.length, u = [], c = [], d = 0; d < s; ++d)
    for (var m = r[d], y = m.length, g, p = 0; p < y; ++p)
      if (g = m[p]) {
        for (var v = t.call(g, g.__data__, p, m), b, S = Cn(g, o), N = 0, M = v.length; N < M; ++N)
          (b = v[N]) && qu(b, i, o, N, v, S);
        u.push(v), c.push(g);
      }
  return new ci(u, c, i, o);
}
var k2 = ml.prototype.constructor;
function H2() {
  return new k2(this._groups, this._parents);
}
function L2(t, i) {
  var o, r, s;
  return function() {
    var u = Co(this, t), c = (this.style.removeProperty(t), Co(this, t));
    return u === c ? null : u === o && c === r ? s : s = i(o = u, r = c);
  };
}
function _b(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function B2(t, i, o) {
  var r, s = o + "", u;
  return function() {
    var c = Co(this, t);
    return c === s ? null : c === r ? u : u = i(r = c, o);
  };
}
function I2(t, i, o) {
  var r, s, u;
  return function() {
    var c = Co(this, t), d = o(this), m = d + "";
    return d == null && (m = d = (this.style.removeProperty(t), Co(this, t))), c === m ? null : c === r && m === s ? u : (s = m, u = i(r = c, d));
  };
}
function V2(t, i) {
  var o, r, s, u = "style." + i, c = "end." + u, d;
  return function() {
    var m = Ln(this, t), y = m.on, g = m.value[u] == null ? d || (d = _b(i)) : void 0;
    (y !== o || s !== g) && (r = (o = y).copy()).on(c, s = g), m.on = r;
  };
}
function U2(t, i, o) {
  var r = (t += "") == "transform" ? YN : Eb;
  return i == null ? this.styleTween(t, L2(t, r)).on("end.style." + t, _b(t)) : typeof i == "function" ? this.styleTween(t, I2(t, r, Sh(this, "style." + t, i))).each(V2(this._id, t)) : this.styleTween(t, B2(t, r, i), o).on("end.style." + t, null);
}
function Y2(t, i, o) {
  return function(r) {
    this.style.setProperty(t, i.call(this, r), o);
  };
}
function q2(t, i, o) {
  var r, s;
  function u() {
    var c = i.apply(this, arguments);
    return c !== s && (r = (s = c) && Y2(t, c, o)), r;
  }
  return u._value = i, u;
}
function $2(t, i, o) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (i == null) return this.tween(r, null);
  if (typeof i != "function") throw new Error();
  return this.tween(r, q2(t, i, o ?? ""));
}
function X2(t) {
  return function() {
    this.textContent = t;
  };
}
function G2(t) {
  return function() {
    var i = t(this);
    this.textContent = i ?? "";
  };
}
function Z2(t) {
  return this.tween("text", typeof t == "function" ? G2(Sh(this, "text", t)) : X2(t == null ? "" : t + ""));
}
function K2(t) {
  return function(i) {
    this.textContent = t.call(this, i);
  };
}
function Q2(t) {
  var i, o;
  function r() {
    var s = t.apply(this, arguments);
    return s !== o && (i = (o = s) && K2(s)), i;
  }
  return r._value = t, r;
}
function F2(t) {
  var i = "text";
  if (arguments.length < 1) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  return this.tween(i, Q2(t));
}
function W2() {
  for (var t = this._name, i = this._id, o = Nb(), r = this._groups, s = r.length, u = 0; u < s; ++u)
    for (var c = r[u], d = c.length, m, y = 0; y < d; ++y)
      if (m = c[y]) {
        var g = Cn(m, i);
        qu(m, t, o, y, c, {
          time: g.time + g.delay + g.duration,
          delay: 0,
          duration: g.duration,
          ease: g.ease
        });
      }
  return new ci(r, this._parents, t, o);
}
function J2() {
  var t, i, o = this, r = o._id, s = o.size();
  return new Promise(function(u, c) {
    var d = { value: c }, m = { value: function() {
      --s === 0 && u();
    } };
    o.each(function() {
      var y = Ln(this, r), g = y.on;
      g !== t && (i = (t = g).copy(), i._.cancel.push(d), i._.interrupt.push(d), i._.end.push(m)), y.on = i;
    }), s === 0 && u();
  });
}
var P2 = 0;
function ci(t, i, o, r) {
  this._groups = t, this._parents = i, this._name = o, this._id = r;
}
function Nb() {
  return ++P2;
}
var oi = ml.prototype;
ci.prototype = {
  constructor: ci,
  select: z2,
  selectAll: R2,
  selectChild: oi.selectChild,
  selectChildren: oi.selectChildren,
  filter: C2,
  merge: M2,
  selection: H2,
  transition: W2,
  call: oi.call,
  nodes: oi.nodes,
  node: oi.node,
  size: oi.size,
  empty: oi.empty,
  each: oi.each,
  on: j2,
  attr: c2,
  attrTween: g2,
  style: U2,
  styleTween: $2,
  text: Z2,
  textTween: F2,
  remove: O2,
  tween: i2,
  delay: v2,
  duration: S2,
  ease: E2,
  easeVarying: N2,
  end: J2,
  [Symbol.iterator]: oi[Symbol.iterator]
};
function eC(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var tC = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: eC
};
function nC(t, i) {
  for (var o; !(o = t.__transition) || !(o = o[i]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${i} not found`);
  return o;
}
function iC(t) {
  var i, o;
  t instanceof ci ? (i = t._id, t = t._name) : (i = Nb(), (o = tC).time = bh(), t = t == null ? null : t + "");
  for (var r = this._groups, s = r.length, u = 0; u < s; ++u)
    for (var c = r[u], d = c.length, m, y = 0; y < d; ++y)
      (m = c[y]) && qu(m, t, i, y, c, o || nC(m, i));
  return new ci(r, this._parents, t, i);
}
ml.prototype.interrupt = e2;
ml.prototype.transition = iC;
const Js = (t) => () => t;
function aC(t, {
  sourceEvent: i,
  target: o,
  transform: r,
  dispatch: s
}) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: i, enumerable: !0, configurable: !0 },
    target: { value: o, enumerable: !0, configurable: !0 },
    transform: { value: r, enumerable: !0, configurable: !0 },
    _: { value: s }
  });
}
function li(t, i, o) {
  this.k = t, this.x = i, this.y = o;
}
li.prototype = {
  constructor: li,
  scale: function(t) {
    return t === 1 ? this : new li(this.k * t, this.x, this.y);
  },
  translate: function(t, i) {
    return t === 0 & i === 0 ? this : new li(this.k, this.x + this.k * t, this.y + this.k * i);
  },
  apply: function(t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y];
  },
  applyX: function(t) {
    return t * this.k + this.x;
  },
  applyY: function(t) {
    return t * this.k + this.y;
  },
  invert: function(t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
  },
  invertX: function(t) {
    return (t - this.x) / this.k;
  },
  invertY: function(t) {
    return (t - this.y) / this.k;
  },
  rescaleX: function(t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
  },
  rescaleY: function(t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var $u = new li(1, 0, 0);
Cb.prototype = li.prototype;
function Cb(t) {
  for (; !t.__zoom; ) if (!(t = t.parentNode)) return $u;
  return t.__zoom;
}
function wd(t) {
  t.stopImmediatePropagation();
}
function kr(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function oC(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function rC() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function r0() {
  return this.__zoom || $u;
}
function lC(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function sC() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function uC(t, i, o) {
  var r = t.invertX(i[0][0]) - o[0][0], s = t.invertX(i[1][0]) - o[1][0], u = t.invertY(i[0][1]) - o[0][1], c = t.invertY(i[1][1]) - o[1][1];
  return t.translate(
    s > r ? (r + s) / 2 : Math.min(0, r) || Math.max(0, s),
    c > u ? (u + c) / 2 : Math.min(0, u) || Math.max(0, c)
  );
}
function Mb() {
  var t = oC, i = rC, o = uC, r = lC, s = sC, u = [0, 1 / 0], c = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], d = 250, m = ru, y = Vu("start", "zoom", "end"), g, p, v, b = 500, S = 150, N = 0, M = 10;
  function T(j) {
    j.property("__zoom", r0).on("wheel.zoom", I, { passive: !1 }).on("mousedown.zoom", ee).on("dblclick.zoom", Q).filter(s).on("touchstart.zoom", X).on("touchmove.zoom", J).on("touchend.zoom touchcancel.zoom", G).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  T.transform = function(j, Y, A, z) {
    var q = j.selection ? j.selection() : j;
    q.property("__zoom", r0), j !== q ? k(j, Y, A, z) : q.interrupt().each(function() {
      L(this, arguments).event(z).start().zoom(null, typeof Y == "function" ? Y.apply(this, arguments) : Y).end();
    });
  }, T.scaleBy = function(j, Y, A, z) {
    T.scaleTo(j, function() {
      var q = this.__zoom.k, W = typeof Y == "function" ? Y.apply(this, arguments) : Y;
      return q * W;
    }, A, z);
  }, T.scaleTo = function(j, Y, A, z) {
    T.transform(j, function() {
      var q = i.apply(this, arguments), W = this.__zoom, te = A == null ? C(q) : typeof A == "function" ? A.apply(this, arguments) : A, D = W.invert(te), V = typeof Y == "function" ? Y.apply(this, arguments) : Y;
      return o(_(O(W, V), te, D), q, c);
    }, A, z);
  }, T.translateBy = function(j, Y, A, z) {
    T.transform(j, function() {
      return o(this.__zoom.translate(
        typeof Y == "function" ? Y.apply(this, arguments) : Y,
        typeof A == "function" ? A.apply(this, arguments) : A
      ), i.apply(this, arguments), c);
    }, null, z);
  }, T.translateTo = function(j, Y, A, z, q) {
    T.transform(j, function() {
      var W = i.apply(this, arguments), te = this.__zoom, D = z == null ? C(W) : typeof z == "function" ? z.apply(this, arguments) : z;
      return o($u.translate(D[0], D[1]).scale(te.k).translate(
        typeof Y == "function" ? -Y.apply(this, arguments) : -Y,
        typeof A == "function" ? -A.apply(this, arguments) : -A
      ), W, c);
    }, z, q);
  };
  function O(j, Y) {
    return Y = Math.max(u[0], Math.min(u[1], Y)), Y === j.k ? j : new li(Y, j.x, j.y);
  }
  function _(j, Y, A) {
    var z = Y[0] - A[0] * j.k, q = Y[1] - A[1] * j.k;
    return z === j.x && q === j.y ? j : new li(j.k, z, q);
  }
  function C(j) {
    return [(+j[0][0] + +j[1][0]) / 2, (+j[0][1] + +j[1][1]) / 2];
  }
  function k(j, Y, A, z) {
    j.on("start.zoom", function() {
      L(this, arguments).event(z).start();
    }).on("interrupt.zoom end.zoom", function() {
      L(this, arguments).event(z).end();
    }).tween("zoom", function() {
      var q = this, W = arguments, te = L(q, W).event(z), D = i.apply(q, W), V = A == null ? C(D) : typeof A == "function" ? A.apply(q, W) : A, ne = Math.max(D[1][0] - D[0][0], D[1][1] - D[0][1]), B = q.__zoom, E = typeof Y == "function" ? Y.apply(q, W) : Y, U = m(B.invert(V).concat(ne / B.k), E.invert(V).concat(ne / E.k));
      return function(F) {
        if (F === 1) F = E;
        else {
          var K = U(F), Z = ne / K[2];
          F = new li(Z, V[0] - K[0] * Z, V[1] - K[1] * Z);
        }
        te.zoom(null, F);
      };
    });
  }
  function L(j, Y, A) {
    return !A && j.__zooming || new H(j, Y);
  }
  function H(j, Y) {
    this.that = j, this.args = Y, this.active = 0, this.sourceEvent = null, this.extent = i.apply(j, Y), this.taps = 0;
  }
  H.prototype = {
    event: function(j) {
      return j && (this.sourceEvent = j), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(j, Y) {
      return this.mouse && j !== "mouse" && (this.mouse[1] = Y.invert(this.mouse[0])), this.touch0 && j !== "touch" && (this.touch0[1] = Y.invert(this.touch0[0])), this.touch1 && j !== "touch" && (this.touch1[1] = Y.invert(this.touch1[0])), this.that.__zoom = Y, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(j) {
      var Y = Jt(this.that).datum();
      y.call(
        j,
        this.that,
        new aC(j, {
          sourceEvent: this.sourceEvent,
          target: T,
          transform: this.that.__zoom,
          dispatch: y
        }),
        Y
      );
    }
  };
  function I(j, ...Y) {
    if (!t.apply(this, arguments)) return;
    var A = L(this, Y).event(j), z = this.__zoom, q = Math.max(u[0], Math.min(u[1], z.k * Math.pow(2, r.apply(this, arguments)))), W = vn(j);
    if (A.wheel)
      (A.mouse[0][0] !== W[0] || A.mouse[0][1] !== W[1]) && (A.mouse[1] = z.invert(A.mouse[0] = W)), clearTimeout(A.wheel);
    else {
      if (z.k === q) return;
      A.mouse = [W, z.invert(W)], uu(this), A.start();
    }
    kr(j), A.wheel = setTimeout(te, S), A.zoom("mouse", o(_(O(z, q), A.mouse[0], A.mouse[1]), A.extent, c));
    function te() {
      A.wheel = null, A.end();
    }
  }
  function ee(j, ...Y) {
    if (v || !t.apply(this, arguments)) return;
    var A = j.currentTarget, z = L(this, Y, !0).event(j), q = Jt(j.view).on("mousemove.zoom", V, !0).on("mouseup.zoom", ne, !0), W = vn(j, A), te = j.clientX, D = j.clientY;
    cb(j.view), wd(j), z.mouse = [W, this.__zoom.invert(W)], uu(this), z.start();
    function V(B) {
      if (kr(B), !z.moved) {
        var E = B.clientX - te, U = B.clientY - D;
        z.moved = E * E + U * U > N;
      }
      z.event(B).zoom("mouse", o(_(z.that.__zoom, z.mouse[0] = vn(B, A), z.mouse[1]), z.extent, c));
    }
    function ne(B) {
      q.on("mousemove.zoom mouseup.zoom", null), fb(B.view, z.moved), kr(B), z.event(B).end();
    }
  }
  function Q(j, ...Y) {
    if (t.apply(this, arguments)) {
      var A = this.__zoom, z = vn(j.changedTouches ? j.changedTouches[0] : j, this), q = A.invert(z), W = A.k * (j.shiftKey ? 0.5 : 2), te = o(_(O(A, W), z, q), i.apply(this, Y), c);
      kr(j), d > 0 ? Jt(this).transition().duration(d).call(k, te, z, j) : Jt(this).call(T.transform, te, z, j);
    }
  }
  function X(j, ...Y) {
    if (t.apply(this, arguments)) {
      var A = j.touches, z = A.length, q = L(this, Y, j.changedTouches.length === z).event(j), W, te, D, V;
      for (wd(j), te = 0; te < z; ++te)
        D = A[te], V = vn(D, this), V = [V, this.__zoom.invert(V), D.identifier], q.touch0 ? !q.touch1 && q.touch0[2] !== V[2] && (q.touch1 = V, q.taps = 0) : (q.touch0 = V, W = !0, q.taps = 1 + !!g);
      g && (g = clearTimeout(g)), W && (q.taps < 2 && (p = V[0], g = setTimeout(function() {
        g = null;
      }, b)), uu(this), q.start());
    }
  }
  function J(j, ...Y) {
    if (this.__zooming) {
      var A = L(this, Y).event(j), z = j.changedTouches, q = z.length, W, te, D, V;
      for (kr(j), W = 0; W < q; ++W)
        te = z[W], D = vn(te, this), A.touch0 && A.touch0[2] === te.identifier ? A.touch0[0] = D : A.touch1 && A.touch1[2] === te.identifier && (A.touch1[0] = D);
      if (te = A.that.__zoom, A.touch1) {
        var ne = A.touch0[0], B = A.touch0[1], E = A.touch1[0], U = A.touch1[1], F = (F = E[0] - ne[0]) * F + (F = E[1] - ne[1]) * F, K = (K = U[0] - B[0]) * K + (K = U[1] - B[1]) * K;
        te = O(te, Math.sqrt(F / K)), D = [(ne[0] + E[0]) / 2, (ne[1] + E[1]) / 2], V = [(B[0] + U[0]) / 2, (B[1] + U[1]) / 2];
      } else if (A.touch0) D = A.touch0[0], V = A.touch0[1];
      else return;
      A.zoom("touch", o(_(te, D, V), A.extent, c));
    }
  }
  function G(j, ...Y) {
    if (this.__zooming) {
      var A = L(this, Y).event(j), z = j.changedTouches, q = z.length, W, te;
      for (wd(j), v && clearTimeout(v), v = setTimeout(function() {
        v = null;
      }, b), W = 0; W < q; ++W)
        te = z[W], A.touch0 && A.touch0[2] === te.identifier ? delete A.touch0 : A.touch1 && A.touch1[2] === te.identifier && delete A.touch1;
      if (A.touch1 && !A.touch0 && (A.touch0 = A.touch1, delete A.touch1), A.touch0) A.touch0[1] = this.__zoom.invert(A.touch0[0]);
      else if (A.end(), A.taps === 2 && (te = vn(te, this), Math.hypot(p[0] - te[0], p[1] - te[1]) < M)) {
        var D = Jt(this).on("dblclick.zoom");
        D && D.apply(this, arguments);
      }
    }
  }
  return T.wheelDelta = function(j) {
    return arguments.length ? (r = typeof j == "function" ? j : Js(+j), T) : r;
  }, T.filter = function(j) {
    return arguments.length ? (t = typeof j == "function" ? j : Js(!!j), T) : t;
  }, T.touchable = function(j) {
    return arguments.length ? (s = typeof j == "function" ? j : Js(!!j), T) : s;
  }, T.extent = function(j) {
    return arguments.length ? (i = typeof j == "function" ? j : Js([[+j[0][0], +j[0][1]], [+j[1][0], +j[1][1]]]), T) : i;
  }, T.scaleExtent = function(j) {
    return arguments.length ? (u[0] = +j[0], u[1] = +j[1], T) : [u[0], u[1]];
  }, T.translateExtent = function(j) {
    return arguments.length ? (c[0][0] = +j[0][0], c[1][0] = +j[1][0], c[0][1] = +j[0][1], c[1][1] = +j[1][1], T) : [[c[0][0], c[0][1]], [c[1][0], c[1][1]]];
  }, T.constrain = function(j) {
    return arguments.length ? (o = j, T) : o;
  }, T.duration = function(j) {
    return arguments.length ? (d = +j, T) : d;
  }, T.interpolate = function(j) {
    return arguments.length ? (m = j, T) : m;
  }, T.on = function() {
    var j = y.on.apply(y, arguments);
    return j === y ? T : j;
  }, T.clickDistance = function(j) {
    return arguments.length ? (N = (j = +j) * j, T) : Math.sqrt(N);
  }, T.tapDistance = function(j) {
    return arguments.length ? (M = +j, T) : M;
  }, T;
}
const _n = {
  error001: (t = "react") => `Seems like you have not used ${t === "svelte" ? "SvelteFlowProvider" : "ReactFlowProvider"} as an ancestor. Help: https://${t}flow.dev/error#001`,
  error002: () => "It looks like you've created a new nodeTypes or edgeTypes object. If this wasn't on purpose please define the nodeTypes/edgeTypes outside of the component or memoize them.",
  error003: (t) => `Node type "${t}" not found. Using fallback type "default".`,
  error004: () => "The parent container needs a width and a height to render the graph.",
  error005: () => "Only child nodes can use a parent extent.",
  error006: () => "Can't create edge. An edge needs a source and a target.",
  error007: (t) => `The old edge with id=${t} does not exist.`,
  error009: (t) => `Marker type "${t}" doesn't exist.`,
  error008: (t, { id: i, sourceHandle: o, targetHandle: r }) => `Couldn't create edge for ${t} handle id: "${t === "source" ? o : r}", edge id: ${i}.`,
  error010: () => "Handle: No node id found. Make sure to only use a Handle inside a custom Node.",
  error011: (t) => `Edge type "${t}" not found. Using fallback type "default".`,
  error012: (t) => `Node with id "${t}" does not exist, it may have been removed. This can happen when a node is deleted before the "onNodeClick" handler is called.`,
  error013: (t = "react") => `It seems that you haven't loaded the styles. Please import '@xyflow/${t}/dist/style.css' or base.css to make sure everything is working properly.`,
  error014: () => "useNodeConnections: No node ID found. Call useNodeConnections inside a custom Node or provide a node ID.",
  error015: () => "It seems that you are trying to drag a node that is not initialized. Please use onNodesChange as explained in the docs.",
  error016: (t) => `Edge with id "${t}" does not exist, it may have been removed. This can happen when an edge is deleted before the "onEdgeClick" handler is called.`
}, ol = [
  [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
], Tb = ["Enter", " ", "Escape"], Ab = {
  "node.a11yDescription.default": "Press enter or space to select a node. Press delete to remove it and escape to cancel.",
  "node.a11yDescription.keyboardDisabled": "Press enter or space to select a node. You can then use the arrow keys to move the node around. Press delete to remove it and escape to cancel.",
  "node.a11yDescription.ariaLiveMessage": ({ direction: t, x: i, y: o }) => `Moved selected node ${t}. New position, x: ${i}, y: ${o}`,
  "edge.a11yDescription.default": "Press enter or space to select an edge. You can then press delete to remove it or escape to cancel.",
  // Control elements
  "controls.ariaLabel": "Control Panel",
  "controls.zoomIn.ariaLabel": "Zoom In",
  "controls.zoomOut.ariaLabel": "Zoom Out",
  "controls.fitView.ariaLabel": "Fit View",
  "controls.interactive.ariaLabel": "Toggle Interactivity",
  // Mini map
  "minimap.ariaLabel": "Mini Map",
  // Handle
  "handle.ariaLabel": "Handle"
};
var To;
(function(t) {
  t.Strict = "strict", t.Loose = "loose";
})(To || (To = {}));
var xa;
(function(t) {
  t.Free = "free", t.Vertical = "vertical", t.Horizontal = "horizontal";
})(xa || (xa = {}));
var rl;
(function(t) {
  t.Partial = "partial", t.Full = "full";
})(rl || (rl = {}));
const jb = {
  inProgress: !1,
  isValid: null,
  from: null,
  fromHandle: null,
  fromPosition: null,
  fromNode: null,
  to: null,
  toHandle: null,
  toPosition: null,
  toNode: null,
  pointer: null
};
var qi;
(function(t) {
  t.Bezier = "default", t.Straight = "straight", t.Step = "step", t.SmoothStep = "smoothstep", t.SimpleBezier = "simplebezier";
})(qi || (qi = {}));
var Tu;
(function(t) {
  t.Arrow = "arrow", t.ArrowClosed = "arrowclosed";
})(Tu || (Tu = {}));
var we;
(function(t) {
  t.Left = "left", t.Top = "top", t.Right = "right", t.Bottom = "bottom";
})(we || (we = {}));
const l0 = {
  [we.Left]: we.Right,
  [we.Right]: we.Left,
  [we.Top]: we.Bottom,
  [we.Bottom]: we.Top
};
function Db(t) {
  return t === null ? null : t ? "valid" : "invalid";
}
const Ob = (t) => !!t && typeof t == "object" && "id" in t && "source" in t && "target" in t, cC = (t) => !!t && typeof t == "object" && "id" in t && "position" in t && !("source" in t) && !("target" in t), wh = (t) => !!t && typeof t == "object" && "id" in t && "internals" in t && !("source" in t) && !("target" in t), pl = (t, i = [0, 0]) => {
  const { width: o, height: r } = Bn(t), s = t.origin ?? i, u = o * s[0], c = r * s[1];
  return {
    x: t.position.x - u,
    y: t.position.y - c
  };
}, fC = (t, i = { nodeOrigin: [0, 0] }) => {
  if (t.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  const o = t.reduce((r, s) => {
    const u = typeof s == "string";
    let c = !i.nodeLookup && !u ? s : void 0;
    i.nodeLookup && (c = u ? i.nodeLookup.get(s) : wh(s) ? s : i.nodeLookup.get(s.id));
    const d = c ? Au(c, i.nodeOrigin) : { x: 0, y: 0, x2: 0, y2: 0 };
    return Xu(r, d);
  }, { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 });
  return Gu(o);
}, yl = (t, i = {}) => {
  let o = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 }, r = !1;
  return t.forEach((s) => {
    (i.filter === void 0 || i.filter(s)) && (o = Xu(o, Au(s)), r = !0);
  }), r ? Gu(o) : { x: 0, y: 0, width: 0, height: 0 };
}, Eh = (t, i, [o, r, s] = [0, 0, 1], u = !1, c = !1) => {
  const d = (i.x - o) / s, m = (i.y - r) / s, y = i.width / s, g = i.height / s, p = [];
  for (const v of t.values()) {
    const { measured: b, selectable: S = !0, hidden: N = !1 } = v;
    if (c && !S || N)
      continue;
    const M = b.width ?? v.width ?? v.initialWidth ?? 0, T = b.height ?? v.height ?? v.initialHeight ?? 0, { x: O, y: _ } = v.internals.positionAbsolute, C = Hb(d, m, y, g, O, _, M, T), k = M * T, L = u && C > 0;
    (!v.internals.handleBounds || L || C >= k || v.dragging) && p.push(v);
  }
  return p;
}, dC = (t, i) => {
  const o = /* @__PURE__ */ new Set();
  return t.forEach((r) => {
    o.add(r.id);
  }), i.filter((r) => o.has(r.source) || o.has(r.target));
};
function hC(t, i) {
  const o = /* @__PURE__ */ new Map(), r = i?.nodes ? new Set(i.nodes.map((s) => s.id)) : null;
  return t.forEach((s) => {
    let u;
    if (i?.includeHiddenNodes) {
      const { width: c, height: d } = Bn(s);
      u = c > 0 && d > 0;
    } else
      u = !!(s.measured.width && s.measured.height && !s.hidden);
    u && (!r || r.has(s.id)) && o.set(s.id, s);
  }), o;
}
async function mC({ nodes: t, width: i, height: o, panZoom: r, minZoom: s, maxZoom: u }, c) {
  if (t.size === 0)
    return !0;
  const d = hC(t, c), m = yl(d), y = Nh(m, i, o, c?.minZoom ?? s, c?.maxZoom ?? u, c?.padding ?? 0.1);
  return await r.setViewport(y, {
    duration: c?.duration,
    ease: c?.ease,
    interpolate: c?.interpolate
  }), !0;
}
function zb({ nodeId: t, nextPosition: i, nodeLookup: o, nodeOrigin: r = [0, 0], nodeExtent: s, onError: u }) {
  const c = o.get(t), d = c.parentId ? o.get(c.parentId) : void 0, { x: m, y } = d ? d.internals.positionAbsolute : { x: 0, y: 0 }, g = c.origin ?? r;
  let p = c.extent || s;
  if (c.extent === "parent" && !c.expandParent)
    if (!d)
      u?.("005", _n.error005());
    else {
      const b = d.measured.width, S = d.measured.height;
      b && S && (p = [
        [m, y],
        [m + b, y + S]
      ]);
    }
  else d && Ca(c.extent) && (p = [
    [c.extent[0][0] + m, c.extent[0][1] + y],
    [c.extent[1][0] + m, c.extent[1][1] + y]
  ]);
  const v = Ca(p) ? Na(i, p, c.measured) : i;
  return (c.measured.width === void 0 || c.measured.height === void 0) && u?.("015", _n.error015()), {
    position: {
      x: v.x - m + (c.measured.width ?? 0) * g[0],
      y: v.y - y + (c.measured.height ?? 0) * g[1]
    },
    positionAbsolute: v
  };
}
async function gC({ nodesToRemove: t = [], edgesToRemove: i = [], nodes: o, edges: r, onBeforeDelete: s }) {
  const u = new Set(t.map((v) => v.id)), c = [];
  for (const v of o) {
    if (v.deletable === !1)
      continue;
    const b = u.has(v.id), S = !b && v.parentId && c.find((N) => N.id === v.parentId);
    (b || S) && c.push(v);
  }
  const d = new Set(i.map((v) => v.id)), m = r.filter((v) => v.deletable !== !1), g = dC(c, m);
  for (const v of m)
    d.has(v.id) && !g.find((S) => S.id === v.id) && g.push(v);
  if (!s)
    return {
      edges: g,
      nodes: c
    };
  const p = await s({
    nodes: c,
    edges: g
  });
  return typeof p == "boolean" ? p ? { edges: g, nodes: c } : { edges: [], nodes: [] } : p;
}
const Ao = (t, i = 0, o = 1) => Math.min(Math.max(t, i), o), Na = (t = { x: 0, y: 0 }, i, o) => ({
  x: Ao(t.x, i[0][0], i[1][0] - (o?.width ?? 0)),
  y: Ao(t.y, i[0][1], i[1][1] - (o?.height ?? 0))
});
function Rb(t, i, o) {
  const { width: r, height: s } = Bn(o), { x: u, y: c } = o.internals.positionAbsolute;
  return Na(t, [
    [u, c],
    [u + r, c + s]
  ], i);
}
const s0 = (t, i, o) => t < i ? Ao(Math.abs(t - i), 1, i) / i : t > o ? -Ao(Math.abs(t - o), 1, i) / i : 0, _h = (t, i, o = 15, r = 40) => {
  const s = s0(t.x, r, i.width - r) * o, u = s0(t.y, r, i.height - r) * o;
  return [s, u];
}, Xu = (t, i) => ({
  x: Math.min(t.x, i.x),
  y: Math.min(t.y, i.y),
  x2: Math.max(t.x2, i.x2),
  y2: Math.max(t.y2, i.y2)
}), Pd = ({ x: t, y: i, width: o, height: r }) => ({
  x: t,
  y: i,
  x2: t + o,
  y2: i + r
}), Gu = ({ x: t, y: i, x2: o, y2: r }) => ({
  x: t,
  y: i,
  width: o - t,
  height: r - i
}), ll = (t, i = [0, 0]) => {
  const { x: o, y: r } = wh(t) ? t.internals.positionAbsolute : pl(t, i);
  return {
    x: o,
    y: r,
    width: t.measured?.width ?? t.width ?? t.initialWidth ?? 0,
    height: t.measured?.height ?? t.height ?? t.initialHeight ?? 0
  };
}, Au = (t, i = [0, 0]) => {
  const { x: o, y: r } = wh(t) ? t.internals.positionAbsolute : pl(t, i);
  return {
    x: o,
    y: r,
    x2: o + (t.measured?.width ?? t.width ?? t.initialWidth ?? 0),
    y2: r + (t.measured?.height ?? t.height ?? t.initialHeight ?? 0)
  };
}, kb = (t, i) => Gu(Xu(Pd(t), Pd(i))), Hb = (t, i, o, r, s, u, c, d) => {
  const m = Math.max(0, Math.min(t + o, s + c) - Math.max(t, s)), y = Math.max(0, Math.min(i + r, u + d) - Math.max(i, u));
  return Math.ceil(m * y);
}, ju = (t, i) => Hb(t.x, t.y, t.width, t.height, i.x, i.y, i.width, i.height), u0 = (t) => Sn(t.width) && Sn(t.height) && Sn(t.x) && Sn(t.y), Sn = (t) => !isNaN(t) && isFinite(t), Lb = (t, i) => (o, r) => {
}, vl = (t, i = [1, 1]) => ({
  x: i[0] * Math.round(t.x / i[0]),
  y: i[1] * Math.round(t.y / i[1])
}), bl = ({ x: t, y: i }, [o, r, s], u = !1, c = [1, 1]) => {
  const d = {
    x: (t - o) / s,
    y: (i - r) / s
  };
  return u ? vl(d, c) : d;
}, jo = ({ x: t, y: i }, [o, r, s]) => ({
  x: t * s + o,
  y: i * s + r
});
function yo(t, i) {
  if (typeof t == "number")
    return Math.floor((i - i / (1 + t)) * 0.5);
  if (typeof t == "string" && t.endsWith("px")) {
    const o = parseFloat(t);
    if (!Number.isNaN(o))
      return Math.floor(o);
  }
  if (typeof t == "string" && t.endsWith("%")) {
    const o = parseFloat(t);
    if (!Number.isNaN(o))
      return Math.floor(i * o * 0.01);
  }
  return console.error(`The padding value "${t}" is invalid. Please provide a number or a string with a valid unit (px or %).`), 0;
}
function pC(t, i, o) {
  if (typeof t == "string" || typeof t == "number") {
    const r = yo(t, o), s = yo(t, i);
    return {
      top: r,
      right: s,
      bottom: r,
      left: s,
      x: s * 2,
      y: r * 2
    };
  }
  if (typeof t == "object") {
    const r = yo(t.top ?? t.y ?? 0, o), s = yo(t.bottom ?? t.y ?? 0, o), u = yo(t.left ?? t.x ?? 0, i), c = yo(t.right ?? t.x ?? 0, i);
    return { top: r, right: c, bottom: s, left: u, x: u + c, y: r + s };
  }
  return { top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0 };
}
function yC(t, i, o, r, s, u) {
  const { x: c, y: d } = jo(t, [i, o, r]), { x: m, y } = jo({ x: t.x + t.width, y: t.y + t.height }, [i, o, r]), g = s - m, p = u - y;
  return {
    left: Math.floor(c),
    top: Math.floor(d),
    right: Math.floor(g),
    bottom: Math.floor(p)
  };
}
const Nh = (t, i, o, r, s, u) => {
  const c = pC(u, i, o), d = (i - c.x) / t.width, m = (o - c.y) / t.height, y = Math.min(d, m), g = Ao(y, r, s), p = t.x + t.width / 2, v = t.y + t.height / 2, b = i / 2 - p * g, S = o / 2 - v * g, N = yC(t, b, S, g, i, o), M = {
    left: Math.min(N.left - c.left, 0),
    top: Math.min(N.top - c.top, 0),
    right: Math.min(N.right - c.right, 0),
    bottom: Math.min(N.bottom - c.bottom, 0)
  };
  return {
    x: b - M.left + M.right,
    y: S - M.top + M.bottom,
    zoom: g
  };
}, sl = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function Ca(t) {
  return t != null && t !== "parent";
}
function Bn(t) {
  return {
    width: t.measured?.width ?? t.width ?? t.initialWidth ?? 0,
    height: t.measured?.height ?? t.height ?? t.initialHeight ?? 0
  };
}
function Bb(t) {
  return (t.measured?.width ?? t.width ?? t.initialWidth) !== void 0 && (t.measured?.height ?? t.height ?? t.initialHeight) !== void 0;
}
function Ib(t, i = { width: 0, height: 0 }, o, r, s) {
  const u = { ...t }, c = r.get(o);
  if (c) {
    const d = c.origin || s;
    u.x += c.internals.positionAbsolute.x - (i.width ?? 0) * d[0], u.y += c.internals.positionAbsolute.y - (i.height ?? 0) * d[1];
  }
  return u;
}
function c0(t, i) {
  if (t.size !== i.size)
    return !1;
  for (const o of t)
    if (!i.has(o))
      return !1;
  return !0;
}
function vC() {
  let t, i;
  return { promise: new Promise((r, s) => {
    t = r, i = s;
  }), resolve: t, reject: i };
}
function bC(t) {
  return { ...Ab, ...t || {} };
}
function Kr(t, { snapGrid: i = [0, 0], snapToGrid: o = !1, transform: r, containerBounds: s }) {
  const { x: u, y: c } = wn(t), d = bl({ x: u - (s?.left ?? 0), y: c - (s?.top ?? 0) }, r), { x: m, y } = o ? vl(d, i) : d;
  return {
    xSnapped: m,
    ySnapped: y,
    ...d
  };
}
const Ch = (t) => ({
  width: t.offsetWidth,
  height: t.offsetHeight
}), Vb = (t) => t?.getRootNode?.() || window?.document, xC = ["INPUT", "SELECT", "TEXTAREA"];
function Ub(t) {
  const i = t.composedPath?.()?.[0] || t.target;
  return i?.nodeType !== 1 ? !1 : xC.includes(i.nodeName) || i.hasAttribute("contenteditable") || !!i.closest(".nokey");
}
const Yb = (t) => "clientX" in t, wn = (t, i) => {
  const o = Yb(t), r = o ? t.clientX : t.touches?.[0].clientX, s = o ? t.clientY : t.touches?.[0].clientY;
  return {
    x: r - (i?.left ?? 0),
    y: s - (i?.top ?? 0)
  };
}, f0 = (t, i, o, r, s) => {
  const u = i.querySelectorAll(`.${t}`);
  return !u || !u.length ? null : Array.from(u).map((c) => {
    const d = c.getBoundingClientRect();
    return {
      id: c.getAttribute("data-handleid"),
      type: t,
      nodeId: s,
      position: c.getAttribute("data-handlepos"),
      x: (d.left - o.left) / r,
      y: (d.top - o.top) / r,
      ...Ch(c)
    };
  });
};
function qb({ sourceX: t, sourceY: i, targetX: o, targetY: r, sourceControlX: s, sourceControlY: u, targetControlX: c, targetControlY: d }) {
  const m = t * 0.125 + s * 0.375 + c * 0.375 + o * 0.125, y = i * 0.125 + u * 0.375 + d * 0.375 + r * 0.125, g = Math.abs(m - t), p = Math.abs(y - i);
  return [m, y, g, p];
}
function Ps(t, i) {
  return t >= 0 ? 0.5 * t : i * 25 * Math.sqrt(-t);
}
function d0({ pos: t, x1: i, y1: o, x2: r, y2: s, c: u }) {
  switch (t) {
    case we.Left:
      return [i - Ps(i - r, u), o];
    case we.Right:
      return [i + Ps(r - i, u), o];
    case we.Top:
      return [i, o - Ps(o - s, u)];
    case we.Bottom:
      return [i, o + Ps(s - o, u)];
  }
}
function Mh({ sourceX: t, sourceY: i, sourcePosition: o = we.Bottom, targetX: r, targetY: s, targetPosition: u = we.Top, curvature: c = 0.25 }) {
  const [d, m] = d0({
    pos: o,
    x1: t,
    y1: i,
    x2: r,
    y2: s,
    c
  }), [y, g] = d0({
    pos: u,
    x1: r,
    y1: s,
    x2: t,
    y2: i,
    c
  }), [p, v, b, S] = qb({
    sourceX: t,
    sourceY: i,
    targetX: r,
    targetY: s,
    sourceControlX: d,
    sourceControlY: m,
    targetControlX: y,
    targetControlY: g
  });
  return [
    `M${t},${i} C${d},${m} ${y},${g} ${r},${s}`,
    p,
    v,
    b,
    S
  ];
}
function $b({ sourceX: t, sourceY: i, targetX: o, targetY: r }) {
  const s = Math.abs(o - t) / 2, u = o < t ? o + s : o - s, c = Math.abs(r - i) / 2, d = r < i ? r + c : r - c;
  return [u, d, s, c];
}
function SC({ sourceNode: t, targetNode: i, selected: o = !1, zIndex: r = 0, elevateOnSelect: s = !1, zIndexMode: u = "basic" }) {
  if (u === "manual")
    return r;
  const c = s && o ? r + 1e3 : r, d = Math.max(t.parentId || s && t.selected ? t.internals.z : 0, i.parentId || s && i.selected ? i.internals.z : 0);
  return c + d;
}
function wC({ sourceNode: t, targetNode: i, width: o, height: r, transform: s }) {
  const u = Xu(Au(t), Au(i));
  u.x === u.x2 && (u.x2 += 1), u.y === u.y2 && (u.y2 += 1);
  const c = {
    x: -s[0] / s[2],
    y: -s[1] / s[2],
    width: o / s[2],
    height: r / s[2]
  };
  return ju(c, Gu(u)) > 0;
}
const EC = ({ source: t, sourceHandle: i, target: o, targetHandle: r }) => `xy-edge__${t}${i || ""}-${o}${r || ""}`, _C = (t, i) => i.some((o) => o.source === t.source && o.target === t.target && (o.sourceHandle === t.sourceHandle || !o.sourceHandle && !t.sourceHandle) && (o.targetHandle === t.targetHandle || !o.targetHandle && !t.targetHandle)), NC = (t, i, o = {}) => {
  if (!t.source || !t.target)
    return o.onError?.("006", _n.error006()), i;
  const r = o.getEdgeId || EC;
  let s;
  return Ob(t) ? s = { ...t } : s = {
    ...t,
    id: r(t)
  }, _C(s, i) ? i : (s.sourceHandle === null && delete s.sourceHandle, s.targetHandle === null && delete s.targetHandle, i.concat(s));
};
function Xb({ sourceX: t, sourceY: i, targetX: o, targetY: r }) {
  const [s, u, c, d] = $b({
    sourceX: t,
    sourceY: i,
    targetX: o,
    targetY: r
  });
  return [`M ${t},${i}L ${o},${r}`, s, u, c, d];
}
const h0 = {
  [we.Left]: { x: -1, y: 0 },
  [we.Right]: { x: 1, y: 0 },
  [we.Top]: { x: 0, y: -1 },
  [we.Bottom]: { x: 0, y: 1 }
}, CC = ({ source: t, sourcePosition: i = we.Bottom, target: o }) => i === we.Left || i === we.Right ? t.x < o.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : t.y < o.y ? { x: 0, y: 1 } : { x: 0, y: -1 }, m0 = (t, i) => Math.sqrt(Math.pow(i.x - t.x, 2) + Math.pow(i.y - t.y, 2));
function MC({ source: t, sourcePosition: i = we.Bottom, target: o, targetPosition: r = we.Top, center: s, offset: u, stepPosition: c }) {
  const d = h0[i], m = h0[r], y = { x: t.x + d.x * u, y: t.y + d.y * u }, g = { x: o.x + m.x * u, y: o.y + m.y * u }, p = CC({
    source: y,
    sourcePosition: i,
    target: g
  }), v = p.x !== 0 ? "x" : "y", b = p[v];
  let S = [], N, M;
  const T = { x: 0, y: 0 }, O = { x: 0, y: 0 }, [, , _, C] = $b({
    sourceX: t.x,
    sourceY: t.y,
    targetX: o.x,
    targetY: o.y
  });
  if (d[v] * m[v] === -1) {
    v === "x" ? (N = s.x ?? y.x + (g.x - y.x) * c, M = s.y ?? (y.y + g.y) / 2) : (N = s.x ?? (y.x + g.x) / 2, M = s.y ?? y.y + (g.y - y.y) * c);
    const I = [
      { x: N, y: y.y },
      { x: N, y: g.y }
    ], ee = [
      { x: y.x, y: M },
      { x: g.x, y: M }
    ];
    d[v] === b ? S = v === "x" ? I : ee : S = v === "x" ? ee : I;
  } else {
    const I = [{ x: y.x, y: g.y }], ee = [{ x: g.x, y: y.y }];
    if (v === "x" ? S = d.x === b ? ee : I : S = d.y === b ? I : ee, i === r) {
      const j = Math.abs(t[v] - o[v]);
      if (j <= u) {
        const Y = Math.min(u - 1, u - j);
        d[v] === b ? T[v] = (y[v] > t[v] ? -1 : 1) * Y : O[v] = (g[v] > o[v] ? -1 : 1) * Y;
      }
    }
    if (i !== r) {
      const j = v === "x" ? "y" : "x", Y = d[v] === m[j], A = y[j] > g[j], z = y[j] < g[j];
      (d[v] === 1 && (!Y && A || Y && z) || d[v] !== 1 && (!Y && z || Y && A)) && (S = v === "x" ? I : ee);
    }
    const Q = { x: y.x + T.x, y: y.y + T.y }, X = { x: g.x + O.x, y: g.y + O.y }, J = Math.max(Math.abs(Q.x - S[0].x), Math.abs(X.x - S[0].x)), G = Math.max(Math.abs(Q.y - S[0].y), Math.abs(X.y - S[0].y));
    J >= G ? (N = (Q.x + X.x) / 2, M = S[0].y) : (N = S[0].x, M = (Q.y + X.y) / 2);
  }
  const k = { x: y.x + T.x, y: y.y + T.y }, L = { x: g.x + O.x, y: g.y + O.y };
  return [[
    t,
    // we only want to add the gapped source/target if they are different from the first/last point to avoid duplicates which can cause issues with the bends
    ...k.x !== S[0].x || k.y !== S[0].y ? [k] : [],
    ...S,
    ...L.x !== S[S.length - 1].x || L.y !== S[S.length - 1].y ? [L] : [],
    o
  ], N, M, _, C];
}
function TC(t, i, o, r) {
  const s = Math.min(m0(t, i) / 2, m0(i, o) / 2, r), { x: u, y: c } = i;
  if (t.x === u && u === o.x || t.y === c && c === o.y)
    return `L${u} ${c}`;
  if (t.y === c) {
    const y = t.x < o.x ? -1 : 1, g = t.y < o.y ? 1 : -1;
    return `L ${u + s * y},${c}Q ${u},${c} ${u},${c + s * g}`;
  }
  const d = t.x < o.x ? 1 : -1, m = t.y < o.y ? -1 : 1;
  return `L ${u},${c + s * m}Q ${u},${c} ${u + s * d},${c}`;
}
function eh({ sourceX: t, sourceY: i, sourcePosition: o = we.Bottom, targetX: r, targetY: s, targetPosition: u = we.Top, borderRadius: c = 5, centerX: d, centerY: m, offset: y = 20, stepPosition: g = 0.5 }) {
  const [p, v, b, S, N] = MC({
    source: { x: t, y: i },
    sourcePosition: o,
    target: { x: r, y: s },
    targetPosition: u,
    center: { x: d, y: m },
    offset: y,
    stepPosition: g
  });
  let M = `M${p[0].x} ${p[0].y}`;
  for (let T = 1; T < p.length - 1; T++)
    M += TC(p[T - 1], p[T], p[T + 1], c);
  return M += `L${p[p.length - 1].x} ${p[p.length - 1].y}`, [M, v, b, S, N];
}
function g0(t) {
  return t && !!(t.internals.handleBounds || t.handles?.length) && !!(t.measured.width || t.width || t.initialWidth);
}
function AC(t) {
  const { sourceNode: i, targetNode: o } = t;
  if (!g0(i) || !g0(o))
    return null;
  const r = i.internals.handleBounds || p0(i.handles), s = o.internals.handleBounds || p0(o.handles), u = y0(r?.source ?? [], t.sourceHandle), c = y0(
    // when connection type is loose we can define all handles as sources and connect source -> source
    t.connectionMode === To.Strict ? s?.target ?? [] : (s?.target ?? []).concat(s?.source ?? []),
    t.targetHandle
  );
  if (!u || !c)
    return t.onError?.("008", _n.error008(u ? "target" : "source", {
      id: t.id,
      sourceHandle: t.sourceHandle,
      targetHandle: t.targetHandle
    })), null;
  const d = u?.position || we.Bottom, m = c?.position || we.Top, y = Ma(i, u, d), g = Ma(o, c, m);
  return {
    sourceX: y.x,
    sourceY: y.y,
    targetX: g.x,
    targetY: g.y,
    sourcePosition: d,
    targetPosition: m
  };
}
function p0(t) {
  if (!t)
    return null;
  const i = [], o = [];
  for (const r of t)
    r.width = r.width ?? 1, r.height = r.height ?? 1, r.type === "source" ? i.push(r) : r.type === "target" && o.push(r);
  return {
    source: i,
    target: o
  };
}
function Ma(t, i, o = we.Left, r = !1) {
  const s = (i?.x ?? 0) + t.internals.positionAbsolute.x, u = (i?.y ?? 0) + t.internals.positionAbsolute.y, { width: c, height: d } = i ?? Bn(t);
  if (r)
    return { x: s + c / 2, y: u + d / 2 };
  switch (i?.position ?? o) {
    case we.Top:
      return { x: s + c / 2, y: u };
    case we.Right:
      return { x: s + c, y: u + d / 2 };
    case we.Bottom:
      return { x: s + c / 2, y: u + d };
    case we.Left:
      return { x: s, y: u + d / 2 };
  }
}
function y0(t, i) {
  return t && (i ? t.find((o) => o.id === i) : t[0]) || null;
}
function th(t, i) {
  return t ? typeof t == "string" ? t : `${i ? `${i}__` : ""}${Object.keys(t).sort().map((r) => `${r}=${t[r]}`).join("&")}` : "";
}
function jC(t, { id: i, defaultColor: o, defaultMarkerStart: r, defaultMarkerEnd: s }) {
  const u = /* @__PURE__ */ new Set();
  return t.reduce((c, d) => ([d.markerStart || r, d.markerEnd || s].forEach((m) => {
    if (m && typeof m == "object") {
      const y = th(m, i);
      u.has(y) || (c.push({ id: y, color: m.color || o, ...m }), u.add(y));
    }
  }), c), []).sort((c, d) => c.id.localeCompare(d.id));
}
const Gb = 1e3, DC = 10, Th = {
  nodeOrigin: [0, 0],
  nodeExtent: ol,
  elevateNodesOnSelect: !0,
  zIndexMode: "basic",
  defaults: {}
}, OC = {
  ...Th,
  checkEquality: !0
};
function Ah(t, i) {
  const o = { ...t };
  for (const r in i)
    i[r] !== void 0 && (o[r] = i[r]);
  return o;
}
function zC(t, i, o) {
  const r = Ah(Th, o);
  for (const s of t.values())
    if (s.parentId)
      Dh(s, t, i, r);
    else {
      const u = pl(s, r.nodeOrigin), c = Ca(s.extent) ? s.extent : r.nodeExtent, d = Na(u, c, Bn(s));
      s.internals.positionAbsolute = d;
    }
}
function RC(t, i) {
  if (!t.handles)
    return t.measured ? i?.internals.handleBounds : void 0;
  const o = [], r = [];
  for (const s of t.handles) {
    const u = {
      id: s.id,
      width: s.width ?? 1,
      height: s.height ?? 1,
      nodeId: t.id,
      x: s.x,
      y: s.y,
      position: s.position,
      type: s.type
    };
    s.type === "source" ? o.push(u) : s.type === "target" && r.push(u);
  }
  return {
    source: o,
    target: r
  };
}
function jh(t) {
  return t === "manual";
}
function nh(t, i, o, r = {}) {
  const s = Ah(OC, r), u = { i: 0 }, c = new Map(i), d = s?.elevateNodesOnSelect && !jh(s.zIndexMode) ? Gb : 0;
  let m = t.length > 0, y = !1;
  i.clear(), o.clear();
  for (const g of t) {
    let p = c.get(g.id);
    if (s.checkEquality && g === p?.internals.userNode)
      i.set(g.id, p);
    else {
      const v = pl(g, s.nodeOrigin), b = Ca(g.extent) ? g.extent : s.nodeExtent, S = Na(v, b, Bn(g));
      p = {
        ...s.defaults,
        ...g,
        measured: {
          width: g.measured?.width,
          height: g.measured?.height
        },
        internals: {
          positionAbsolute: S,
          // if user re-initializes the node or removes `measured` for whatever reason, we reset the handleBounds so that the node gets re-measured
          handleBounds: RC(g, p),
          z: Zb(g, d, s.zIndexMode),
          userNode: g
        }
      }, i.set(g.id, p);
    }
    (p.measured === void 0 || p.measured.width === void 0 || p.measured.height === void 0) && !p.hidden && (m = !1), g.parentId && Dh(p, i, o, r, u), y ||= g.selected ?? !1;
  }
  return { nodesInitialized: m, hasSelectedNodes: y };
}
function kC(t, i) {
  if (!t.parentId)
    return;
  const o = i.get(t.parentId);
  o ? o.set(t.id, t) : i.set(t.parentId, /* @__PURE__ */ new Map([[t.id, t]]));
}
function Dh(t, i, o, r, s) {
  const { elevateNodesOnSelect: u, nodeOrigin: c, nodeExtent: d, zIndexMode: m } = Ah(Th, r), y = t.parentId, g = i.get(y);
  if (!g) {
    console.warn(`Parent node ${y} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
    return;
  }
  kC(t, o), s && !g.parentId && g.internals.rootParentIndex === void 0 && m === "auto" && (g.internals.rootParentIndex = ++s.i, g.internals.z = g.internals.z + s.i * DC), s && g.internals.rootParentIndex !== void 0 && (s.i = g.internals.rootParentIndex);
  const p = u && !jh(m) ? Gb : 0, { x: v, y: b, z: S } = HC(t, g, c, d, p, m), { positionAbsolute: N } = t.internals, M = v !== N.x || b !== N.y;
  (M || S !== t.internals.z) && i.set(t.id, {
    ...t,
    internals: {
      ...t.internals,
      positionAbsolute: M ? { x: v, y: b } : N,
      z: S
    }
  });
}
function Zb(t, i, o) {
  const r = Sn(t.zIndex) ? t.zIndex : 0;
  return jh(o) ? r : r + (t.selected ? i : 0);
}
function HC(t, i, o, r, s, u) {
  const { x: c, y: d } = i.internals.positionAbsolute, m = Bn(t), y = pl(t, o), g = Ca(t.extent) ? Na(y, t.extent, m) : y;
  let p = Na({ x: c + g.x, y: d + g.y }, r, m);
  t.extent === "parent" && (p = Rb(p, m, i));
  const v = Zb(t, s, u), b = i.internals.z ?? 0;
  return {
    x: p.x,
    y: p.y,
    z: b >= v ? b + 1 : v
  };
}
function Oh(t, i, o, r = [0, 0]) {
  const s = [], u = /* @__PURE__ */ new Map();
  for (const c of t) {
    const d = i.get(c.parentId);
    if (!d)
      continue;
    const m = u.get(c.parentId)?.expandedRect ?? ll(d), y = kb(m, c.rect);
    u.set(c.parentId, { expandedRect: y, parent: d });
  }
  return u.size > 0 && u.forEach(({ expandedRect: c, parent: d }, m) => {
    const y = d.internals.positionAbsolute, g = Bn(d), p = d.origin ?? r, v = c.x < y.x ? Math.round(Math.abs(y.x - c.x)) : 0, b = c.y < y.y ? Math.round(Math.abs(y.y - c.y)) : 0, S = Math.max(g.width, Math.round(c.width)), N = Math.max(g.height, Math.round(c.height)), M = (S - g.width) * p[0], T = (N - g.height) * p[1];
    (v > 0 || b > 0 || M || T) && (s.push({
      id: m,
      type: "position",
      position: {
        x: d.position.x - v + M,
        y: d.position.y - b + T
      }
    }), o.get(m)?.forEach((O) => {
      t.some((_) => _.id === O.id) || s.push({
        id: O.id,
        type: "position",
        position: {
          x: O.position.x + v,
          y: O.position.y + b
        }
      });
    })), (g.width < c.width || g.height < c.height || v || b) && s.push({
      id: m,
      type: "dimensions",
      setAttributes: !0,
      dimensions: {
        width: S + (v ? p[0] * v - M : 0),
        height: N + (b ? p[1] * b - T : 0)
      }
    });
  }), s;
}
function LC(t, i, o, r, s, u, c) {
  const d = r?.querySelector(".xyflow__viewport");
  let m = !1;
  if (!d)
    return { changes: [], updatedInternals: m };
  const y = [], g = window.getComputedStyle(d), { m22: p } = new window.DOMMatrixReadOnly(g.transform), v = [];
  for (const b of t.values()) {
    const S = i.get(b.id);
    if (!S)
      continue;
    if (S.hidden) {
      i.set(S.id, {
        ...S,
        internals: {
          ...S.internals,
          handleBounds: void 0
        }
      }), m = !0;
      continue;
    }
    const N = Ch(b.nodeElement), M = S.measured.width !== N.width || S.measured.height !== N.height;
    if (!!(N.width && N.height && (M || !S.internals.handleBounds || b.force))) {
      const O = b.nodeElement.getBoundingClientRect(), _ = Ca(S.extent) ? S.extent : u;
      let { positionAbsolute: C } = S.internals;
      if (S.parentId && S.extent === "parent") {
        const L = i.get(S.parentId);
        L && (C = Rb(C, N, L));
      } else _ && (C = Na(C, _, N));
      const k = {
        ...S,
        measured: N,
        internals: {
          ...S.internals,
          positionAbsolute: C,
          handleBounds: {
            source: f0("source", b.nodeElement, O, p, S.id),
            target: f0("target", b.nodeElement, O, p, S.id)
          }
        }
      };
      i.set(S.id, k), S.parentId && Dh(k, i, o, { nodeOrigin: s, zIndexMode: c }), m = !0, M && (y.push({
        id: S.id,
        type: "dimensions",
        dimensions: N
      }), S.expandParent && S.parentId && v.push({
        id: S.id,
        parentId: S.parentId,
        rect: ll(k, s)
      }));
    }
  }
  if (v.length > 0) {
    const b = Oh(v, i, o, s);
    y.push(...b);
  }
  return { changes: y, updatedInternals: m };
}
async function BC({ delta: t, panZoom: i, transform: o, translateExtent: r, width: s, height: u }) {
  if (!i || !t.x && !t.y)
    return !1;
  const c = await i.setViewportConstrained({
    x: o[0] + t.x,
    y: o[1] + t.y,
    zoom: o[2]
  }, [
    [0, 0],
    [s, u]
  ], r);
  return !!c && (c.x !== o[0] || c.y !== o[1] || c.k !== o[2]);
}
function v0(t, i, o, r, s, u) {
  let c = s;
  const d = r.get(c) || /* @__PURE__ */ new Map();
  r.set(c, d.set(o, i)), c = `${s}-${t}`;
  const m = r.get(c) || /* @__PURE__ */ new Map();
  if (r.set(c, m.set(o, i)), u) {
    c = `${s}-${t}-${u}`;
    const y = r.get(c) || /* @__PURE__ */ new Map();
    r.set(c, y.set(o, i));
  }
}
function Kb(t, i, o) {
  t.clear(), i.clear();
  for (const r of o) {
    const { source: s, target: u, sourceHandle: c = null, targetHandle: d = null } = r, m = { edgeId: r.id, source: s, target: u, sourceHandle: c, targetHandle: d }, y = `${s}-${c}--${u}-${d}`, g = `${u}-${d}--${s}-${c}`;
    v0("source", m, g, t, s, c), v0("target", m, y, t, u, d), i.set(r.id, r);
  }
}
function Qb(t, i) {
  if (!t.parentId)
    return !1;
  const o = i.get(t.parentId);
  return o ? o.selected ? !0 : Qb(o, i) : !1;
}
function b0(t, i, o) {
  let r = t;
  do {
    if (r?.matches?.(i))
      return !0;
    if (r === o)
      return !1;
    r = r?.parentElement;
  } while (r);
  return !1;
}
function IC(t, i, o, r) {
  const s = /* @__PURE__ */ new Map();
  for (const [u, c] of t)
    if ((c.selected || c.id === r) && (!c.parentId || !Qb(c, t)) && (c.draggable || i && typeof c.draggable > "u")) {
      const d = t.get(u);
      d && s.set(u, {
        id: u,
        position: d.position || { x: 0, y: 0 },
        distance: {
          x: o.x - d.internals.positionAbsolute.x,
          y: o.y - d.internals.positionAbsolute.y
        },
        extent: d.extent,
        parentId: d.parentId,
        origin: d.origin,
        expandParent: d.expandParent,
        internals: {
          positionAbsolute: d.internals.positionAbsolute || { x: 0, y: 0 }
        },
        measured: {
          width: d.measured.width ?? 0,
          height: d.measured.height ?? 0
        }
      });
    }
  return s;
}
function Ed({ nodeId: t, dragItems: i, nodeLookup: o, dragging: r = !0 }) {
  const s = [];
  for (const [c, d] of i) {
    const m = o.get(c)?.internals.userNode;
    m && s.push({
      ...m,
      position: d.position,
      dragging: r
    });
  }
  if (!t)
    return [s[0], s];
  const u = o.get(t)?.internals.userNode;
  return [
    u ? {
      ...u,
      position: i.get(t)?.position || u.position,
      dragging: r
    } : s[0],
    s
  ];
}
function VC({ dragItems: t, snapGrid: i, x: o, y: r }) {
  const s = t.values().next().value;
  if (!s)
    return null;
  const u = {
    x: o - s.distance.x,
    y: r - s.distance.y
  }, c = vl(u, i);
  return {
    x: c.x - u.x,
    y: c.y - u.y
  };
}
function UC({ onNodeMouseDown: t, getStoreItems: i, onDragStart: o, onDrag: r, onDragStop: s }) {
  let u = { x: null, y: null }, c = 0, d = /* @__PURE__ */ new Map(), m = !1, y = { x: 0, y: 0 }, g = null, p = !1, v = null, b = !1, S = !1, N = null;
  function M({ noDragClassName: O, handleSelector: _, domNode: C, isSelectable: k, nodeId: L, nodeClickDistance: H = 0 }) {
    v = Jt(C);
    function I({ x: J, y: G }) {
      const { nodeLookup: j, nodeExtent: Y, snapGrid: A, snapToGrid: z, nodeOrigin: q, onNodeDrag: W, onSelectionDrag: te, onError: D, updateNodePositions: V } = i();
      u = { x: J, y: G };
      let ne = !1;
      const B = d.size > 1, E = B && Y ? Pd(yl(d)) : null, U = B && z ? VC({
        dragItems: d,
        snapGrid: A,
        x: J,
        y: G
      }) : null;
      for (const [F, K] of d) {
        if (!j.has(F))
          continue;
        let Z = { x: J - K.distance.x, y: G - K.distance.y };
        z && (Z = U ? {
          x: Math.round(Z.x + U.x),
          y: Math.round(Z.y + U.y)
        } : vl(Z, A));
        let se = null;
        if (B && Y && !K.extent && E) {
          const { positionAbsolute: ve } = K.internals, xe = ve.x - E.x + Y[0][0], _e = ve.x + K.measured.width - E.x2 + Y[1][0], De = ve.y - E.y + Y[0][1], qe = ve.y + K.measured.height - E.y2 + Y[1][1];
          se = [
            [xe, De],
            [_e, qe]
          ];
        }
        const { position: he, positionAbsolute: ge } = zb({
          nodeId: F,
          nextPosition: Z,
          nodeLookup: j,
          nodeExtent: se || Y,
          nodeOrigin: q,
          onError: D
        });
        ne = ne || K.position.x !== he.x || K.position.y !== he.y, K.position = he, K.internals.positionAbsolute = ge;
      }
      if (S = S || ne, !!ne && (V(d, !0), N && (r || W || !L && te))) {
        const [F, K] = Ed({
          nodeId: L,
          dragItems: d,
          nodeLookup: j
        });
        r?.(N, d, F, K), W?.(N, F, K), L || te?.(N, K);
      }
    }
    async function ee() {
      if (!g)
        return;
      const { transform: J, panBy: G, autoPanSpeed: j, autoPanOnNodeDrag: Y } = i();
      if (!Y) {
        m = !1, cancelAnimationFrame(c);
        return;
      }
      const [A, z] = _h(y, g, j);
      (A !== 0 || z !== 0) && (u.x = (u.x ?? 0) - A / J[2], u.y = (u.y ?? 0) - z / J[2], await G({ x: A, y: z }) && I(u)), c = requestAnimationFrame(ee);
    }
    function Q(J) {
      const { nodeLookup: G, multiSelectionActive: j, nodesDraggable: Y, transform: A, snapGrid: z, snapToGrid: q, selectNodesOnDrag: W, onNodeDragStart: te, onSelectionDragStart: D, unselectNodesAndEdges: V } = i();
      p = !0, (!W || !k) && !j && L && (G.get(L)?.selected || V()), k && W && L && t?.(L);
      const ne = Kr(J.sourceEvent, { transform: A, snapGrid: z, snapToGrid: q, containerBounds: g });
      if (u = ne, d = IC(G, Y, ne, L), d.size > 0 && (o || te || !L && D)) {
        const [B, E] = Ed({
          nodeId: L,
          dragItems: d,
          nodeLookup: G
        });
        o?.(J.sourceEvent, d, B, E), te?.(J.sourceEvent, B, E), L || D?.(J.sourceEvent, E);
      }
    }
    const X = db().clickDistance(H).on("start", (J) => {
      const { domNode: G, nodeDragThreshold: j, transform: Y, snapGrid: A, snapToGrid: z } = i();
      g = G?.getBoundingClientRect() || null, b = !1, S = !1, N = J.sourceEvent, j === 0 && Q(J), u = Kr(J.sourceEvent, { transform: Y, snapGrid: A, snapToGrid: z, containerBounds: g }), y = wn(J.sourceEvent, g);
    }).on("drag", (J) => {
      const { autoPanOnNodeDrag: G, transform: j, snapGrid: Y, snapToGrid: A, nodeDragThreshold: z, nodeLookup: q } = i(), W = Kr(J.sourceEvent, { transform: j, snapGrid: Y, snapToGrid: A, containerBounds: g });
      if (N = J.sourceEvent, (J.sourceEvent.type === "touchmove" && J.sourceEvent.touches.length > 1 || // if user deletes a node while dragging, we need to abort the drag to prevent errors
      L && !q.has(L)) && (b = !0), !b) {
        if (!m && G && p && (m = !0, ee()), !p) {
          const te = wn(J.sourceEvent, g), D = te.x - y.x, V = te.y - y.y;
          Math.sqrt(D * D + V * V) > z && Q(J);
        }
        (u.x !== W.xSnapped || u.y !== W.ySnapped) && d && p && (y = wn(J.sourceEvent, g), I(W));
      }
    }).on("end", (J) => {
      if (!p || b) {
        b && d.size > 0 && i().updateNodePositions(d, !1);
        return;
      }
      if (m = !1, p = !1, cancelAnimationFrame(c), d.size > 0) {
        const { nodeLookup: G, updateNodePositions: j, onNodeDragStop: Y, onSelectionDragStop: A } = i();
        if (S && (j(d, !1), S = !1), s || Y || !L && A) {
          const [z, q] = Ed({
            nodeId: L,
            dragItems: d,
            nodeLookup: G,
            dragging: !1
          });
          s?.(J.sourceEvent, d, z, q), Y?.(J.sourceEvent, z, q), L || A?.(J.sourceEvent, q);
        }
      }
    }).filter((J) => {
      const G = J.target;
      return !J.button && (!O || !b0(G, `.${O}`, C)) && (!_ || b0(G, _, C));
    });
    v.call(X);
  }
  function T() {
    v?.on(".drag", null);
  }
  return {
    update: M,
    destroy: T
  };
}
function YC(t, i, o) {
  const r = [], s = {
    x: t.x - o,
    y: t.y - o,
    width: o * 2,
    height: o * 2
  };
  for (const u of i.values())
    ju(s, ll(u)) > 0 && r.push(u);
  return r;
}
const qC = 250;
function $C(t, i, o, r) {
  let s = [], u = 1 / 0;
  const c = YC(t, o, i + qC);
  for (const d of c) {
    const m = [...d.internals.handleBounds?.source ?? [], ...d.internals.handleBounds?.target ?? []];
    for (const y of m) {
      if (r.nodeId === y.nodeId && r.type === y.type && r.id === y.id)
        continue;
      const { x: g, y: p } = Ma(d, y, y.position, !0), v = Math.sqrt(Math.pow(g - t.x, 2) + Math.pow(p - t.y, 2));
      v > i || (v < u ? (s = [{ ...y, x: g, y: p }], u = v) : v === u && s.push({ ...y, x: g, y: p }));
    }
  }
  if (!s.length)
    return null;
  if (s.length > 1) {
    const d = r.type === "source" ? "target" : "source";
    return s.find((m) => m.type === d) ?? s[0];
  }
  return s[0];
}
function Fb(t, i, o, r, s, u = !1) {
  const c = r.get(t);
  if (!c)
    return null;
  const d = s === "strict" ? c.internals.handleBounds?.[i] : [...c.internals.handleBounds?.source ?? [], ...c.internals.handleBounds?.target ?? []], m = (o ? d?.find((y) => y.id === o) : d?.[0]) ?? null;
  return m && u ? { ...m, ...Ma(c, m, m.position, !0) } : m;
}
function Wb(t, i) {
  return t || (i?.classList.contains("target") ? "target" : i?.classList.contains("source") ? "source" : null);
}
function XC(t, i) {
  let o = null;
  return i ? o = !0 : t && !i && (o = !1), o;
}
const Jb = () => !0;
function GC(t, { connectionMode: i, connectionRadius: o, handleId: r, nodeId: s, edgeUpdaterType: u, isTarget: c, domNode: d, nodeLookup: m, lib: y, autoPanOnConnect: g, flowId: p, panBy: v, cancelConnection: b, onConnectStart: S, onConnect: N, onConnectEnd: M, isValidConnection: T = Jb, onReconnectEnd: O, updateConnection: _, getTransform: C, getFromHandle: k, autoPanSpeed: L, dragThreshold: H = 1, handleDomNode: I }) {
  const ee = Vb(t.target);
  let Q = 0, X;
  const { x: J, y: G } = wn(t), j = Wb(u, I), Y = d?.getBoundingClientRect();
  let A = !1;
  if (!Y || !j)
    return;
  const z = Fb(s, j, r, m, i);
  if (!z)
    return;
  let q = wn(t, Y), W = !1, te = null, D = !1, V = null;
  function ne() {
    if (!g || !Y)
      return;
    const [he, ge] = _h(q, Y, L);
    v({ x: he, y: ge }), Q = requestAnimationFrame(ne);
  }
  const B = {
    ...z,
    nodeId: s,
    type: j,
    position: z.position
  }, E = m.get(s);
  let F = {
    inProgress: !0,
    isValid: null,
    from: Ma(E, B, we.Left, !0),
    fromHandle: B,
    fromPosition: B.position,
    fromNode: E,
    to: q,
    toHandle: null,
    toPosition: l0[B.position],
    toNode: null,
    pointer: q
  };
  function K() {
    A = !0, _(F), S?.(t, { nodeId: s, handleId: r, handleType: j });
  }
  H === 0 && K();
  function Z(he) {
    if (!A) {
      const { x: qe, y: Ie } = wn(he), ot = qe - J, nt = Ie - G;
      if (!(ot * ot + nt * nt > H * H))
        return;
      K();
    }
    if (!k() || !B) {
      se(he);
      return;
    }
    const ge = C();
    q = wn(he, Y), X = $C(bl(q, ge, !1, [1, 1]), o, m, B), W || (ne(), W = !0);
    const ve = Pb(he, {
      handle: X,
      connectionMode: i,
      fromNodeId: s,
      fromHandleId: r,
      fromType: c ? "target" : "source",
      isValidConnection: T,
      doc: ee,
      lib: y,
      flowId: p,
      nodeLookup: m
    });
    V = ve.handleDomNode, te = ve.connection, D = XC(!!X, ve.isValid);
    const xe = m.get(s), _e = xe ? Ma(xe, B, we.Left, !0) : F.from, De = {
      ...F,
      from: _e,
      isValid: D,
      to: ve.toHandle && D ? jo({ x: ve.toHandle.x, y: ve.toHandle.y }, ge) : q,
      toHandle: ve.toHandle,
      toPosition: D && ve.toHandle ? ve.toHandle.position : l0[B.position],
      toNode: ve.toHandle ? m.get(ve.toHandle.nodeId) : null,
      pointer: q
    };
    _(De), F = De;
  }
  function se(he) {
    if (!("touches" in he && he.touches.length > 0)) {
      if (A) {
        (X || V) && te && D && N?.(te);
        const { inProgress: ge, ...ve } = F, xe = {
          ...ve,
          toPosition: F.toHandle ? F.toPosition : null
        };
        M?.(he, xe), u && O?.(he, xe);
      }
      b(), cancelAnimationFrame(Q), W = !1, D = !1, te = null, V = null, ee.removeEventListener("mousemove", Z), ee.removeEventListener("mouseup", se), ee.removeEventListener("touchmove", Z), ee.removeEventListener("touchend", se);
    }
  }
  ee.addEventListener("mousemove", Z), ee.addEventListener("mouseup", se), ee.addEventListener("touchmove", Z), ee.addEventListener("touchend", se);
}
function Pb(t, { handle: i, connectionMode: o, fromNodeId: r, fromHandleId: s, fromType: u, doc: c, lib: d, flowId: m, isValidConnection: y = Jb, nodeLookup: g }) {
  const p = u === "target", v = i ? c.querySelector(`.${d}-flow__handle[data-id="${m}-${i?.nodeId}-${i?.id}-${i?.type}"]`) : null, { x: b, y: S } = wn(t), N = c.elementFromPoint(b, S), M = N?.classList.contains(`${d}-flow__handle`) ? N : v, T = {
    handleDomNode: M,
    isValid: !1,
    connection: null,
    toHandle: null
  };
  if (M) {
    const O = Wb(void 0, M), _ = M.getAttribute("data-nodeid"), C = M.getAttribute("data-handleid"), k = M.classList.contains("connectable"), L = M.classList.contains("connectableend");
    if (!_ || !O)
      return T;
    const H = {
      source: p ? _ : r,
      sourceHandle: p ? C : s,
      target: p ? r : _,
      targetHandle: p ? s : C
    };
    T.connection = H;
    const ee = k && L && (o === To.Strict ? p && O === "source" || !p && O === "target" : _ !== r || C !== s);
    T.isValid = ee && y(H), T.toHandle = Fb(_, O, C, g, o, !0);
  }
  return T;
}
const ih = {
  onPointerDown: GC,
  isValid: Pb
};
function ZC({ domNode: t, panZoom: i, getTransform: o, getViewScale: r }) {
  const s = Jt(t);
  function u({ translateExtent: d, width: m, height: y, zoomStep: g = 1, pannable: p = !0, zoomable: v = !0, inversePan: b = !1 }) {
    const S = (_) => {
      if (_.sourceEvent.type !== "wheel" || !i)
        return;
      const C = o(), k = _.sourceEvent.ctrlKey && sl() ? 10 : 1, L = -_.sourceEvent.deltaY * (_.sourceEvent.deltaMode === 1 ? 0.05 : _.sourceEvent.deltaMode ? 1 : 2e-3) * g, H = C[2] * Math.pow(2, L * k);
      i.scaleTo(H);
    };
    let N = [0, 0];
    const M = (_) => {
      (_.sourceEvent.type === "mousedown" || _.sourceEvent.type === "touchstart") && (N = [
        _.sourceEvent.clientX ?? _.sourceEvent.touches[0].clientX,
        _.sourceEvent.clientY ?? _.sourceEvent.touches[0].clientY
      ]);
    }, T = (_) => {
      const C = o();
      if (_.sourceEvent.type !== "mousemove" && _.sourceEvent.type !== "touchmove" || !i)
        return;
      const k = [
        _.sourceEvent.clientX ?? _.sourceEvent.touches[0].clientX,
        _.sourceEvent.clientY ?? _.sourceEvent.touches[0].clientY
      ], L = [k[0] - N[0], k[1] - N[1]];
      N = k;
      const H = r() * Math.max(C[2], Math.log(C[2])) * (b ? -1 : 1), I = {
        x: C[0] - L[0] * H,
        y: C[1] - L[1] * H
      }, ee = [
        [0, 0],
        [m, y]
      ];
      i.setViewportConstrained({
        x: I.x,
        y: I.y,
        zoom: C[2]
      }, ee, d);
    }, O = Mb().on("start", M).on("zoom", p ? T : null).on("zoom.wheel", v ? S : null);
    s.call(O, {});
  }
  function c() {
    s.on("zoom", null);
  }
  return {
    update: u,
    destroy: c,
    pointer: vn
  };
}
const Zu = (t) => ({
  x: t.x,
  y: t.y,
  zoom: t.k
}), _d = ({ x: t, y: i, zoom: o }) => $u.translate(t, i).scale(o), So = (t, i) => t.target.closest(`.${i}`), ex = (t, i) => i === 2 && Array.isArray(t) && t.includes(2), KC = (t) => ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2, Nd = (t, i = 0, o = KC, r = () => {
}) => {
  const s = typeof i == "number" && i > 0;
  return s || r(), s ? t.transition().duration(i).ease(o).on("end", r) : t;
}, tx = (t) => {
  const i = t.ctrlKey && sl() ? 10 : 1;
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * i;
};
function QC({ zoomPanValues: t, noWheelClassName: i, d3Selection: o, d3Zoom: r, panOnScrollMode: s, panOnScrollSpeed: u, zoomOnPinch: c, onPanZoomStart: d, onPanZoom: m, onPanZoomEnd: y }) {
  return (g) => {
    if (So(g, i))
      return g.ctrlKey && g.preventDefault(), !1;
    g.preventDefault(), g.stopImmediatePropagation();
    const p = o.property("__zoom").k || 1;
    if (g.ctrlKey && c) {
      const M = vn(g), T = tx(g), O = p * Math.pow(2, T);
      r.scaleTo(o, O, M, g);
      return;
    }
    const v = g.deltaMode === 1 ? 20 : 1;
    let b = s === xa.Vertical ? 0 : g.deltaX * v, S = s === xa.Horizontal ? 0 : g.deltaY * v;
    !sl() && g.shiftKey && s !== xa.Vertical && (b = g.deltaY * v, S = 0), r.translateBy(
      o,
      -(b / p) * u,
      -(S / p) * u,
      // @ts-ignore
      { internal: !0 }
    );
    const N = Zu(o.property("__zoom"));
    clearTimeout(t.panScrollTimeout), t.isPanScrolling ? m?.(g, N) : (t.isPanScrolling = !0, d?.(g, N)), t.panScrollTimeout = setTimeout(() => {
      y?.(g, N), t.isPanScrolling = !1;
    }, 150);
  };
}
function FC({ noWheelClassName: t, preventScrolling: i, d3ZoomHandler: o }) {
  return function(r, s) {
    const u = r.type === "wheel", c = !i && u && !r.ctrlKey, d = So(r, t);
    if (r.ctrlKey && u && d && r.preventDefault(), c || d)
      return null;
    r.preventDefault(), o.call(this, r, s);
  };
}
function WC({ zoomPanValues: t, onDraggingChange: i, onPanZoomStart: o }) {
  return (r) => {
    if (r.sourceEvent?.internal)
      return;
    const s = Zu(r.transform);
    t.mouseButton = r.sourceEvent?.button || 0, t.isZoomingOrPanning = !0, t.prevViewport = s, r.sourceEvent?.type === "mousedown" && i(!0), o && o?.(r.sourceEvent, s);
  };
}
function JC({ zoomPanValues: t, panOnDrag: i, onPaneContextMenu: o, onTransformChange: r, onPanZoom: s }) {
  return (u) => {
    t.usedRightMouseButton = !!(o && ex(i, t.mouseButton ?? 0)), u.sourceEvent?.sync || r([u.transform.x, u.transform.y, u.transform.k]), s && !u.sourceEvent?.internal && s?.(u.sourceEvent, Zu(u.transform));
  };
}
function PC({ zoomPanValues: t, panOnDrag: i, panOnScroll: o, onDraggingChange: r, onPanZoomEnd: s, onPaneContextMenu: u }) {
  return (c) => {
    if (!c.sourceEvent?.internal && (t.isZoomingOrPanning = !1, u && ex(i, t.mouseButton ?? 0) && !t.usedRightMouseButton && c.sourceEvent && u(c.sourceEvent), t.usedRightMouseButton = !1, r(!1), s)) {
      const d = Zu(c.transform);
      t.prevViewport = d, clearTimeout(t.timerId), t.timerId = setTimeout(
        () => {
          s?.(c.sourceEvent, d);
        },
        // we need a setTimeout for panOnScroll to suppress multiple end events fired during scroll
        o ? 150 : 0
      );
    }
  };
}
function eM({ zoomActivationKeyPressed: t, zoomOnScroll: i, zoomOnPinch: o, panOnDrag: r, panOnScroll: s, zoomOnDoubleClick: u, userSelectionActive: c, noWheelClassName: d, noPanClassName: m, lib: y, connectionInProgress: g }) {
  return (p) => {
    const v = t || i, b = o && p.ctrlKey, S = p.type === "wheel";
    if (p.button === 1 && p.type === "mousedown" && (So(p, `${y}-flow__node`) || So(p, `${y}-flow__edge`)))
      return !0;
    if (!r && !v && !s && !u && !o || c || g && !S || So(p, d) && S || So(p, m) && (!S || s && S && !t) || !o && p.ctrlKey && S)
      return !1;
    if (!o && p.type === "touchstart" && p.touches?.length > 1)
      return p.preventDefault(), !1;
    if (!v && !s && !b && S || !r && (p.type === "mousedown" || p.type === "touchstart") || Array.isArray(r) && !r.includes(p.button) && p.type === "mousedown")
      return !1;
    const N = Array.isArray(r) && r.includes(p.button) || !p.button || p.button <= 1;
    return (!p.ctrlKey || S) && N;
  };
}
function tM({ domNode: t, minZoom: i, maxZoom: o, translateExtent: r, viewport: s, onPanZoom: u, onPanZoomStart: c, onPanZoomEnd: d, onDraggingChange: m }) {
  const y = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: {},
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, g = t.getBoundingClientRect();
  let p = [
    [0, 0],
    [g.width, g.height]
  ];
  (typeof ResizeObserver < "u" ? new ResizeObserver((G) => {
    const j = G[0];
    j && (p = [
      [0, 0],
      [j.contentRect.width, j.contentRect.height]
    ]);
  }) : null)?.observe(t);
  const b = Mb().extent(() => p).scaleExtent([i, o]).translateExtent(r), S = Jt(t).call(b);
  C({
    x: s.x,
    y: s.y,
    zoom: Ao(s.zoom, i, o)
  }, [
    [0, 0],
    [g.width, g.height]
  ], r);
  const N = S.on("wheel.zoom"), M = S.on("dblclick.zoom");
  b.wheelDelta(tx);
  async function T(G, j) {
    return S ? new Promise((Y) => {
      b?.interpolate(j?.interpolate === "linear" ? Zr : ru).transform(Nd(S, j?.duration, j?.ease, () => Y(!0)), G);
    }) : !1;
  }
  function O({ noWheelClassName: G, noPanClassName: j, onPaneContextMenu: Y, userSelectionActive: A, panOnScroll: z, panOnDrag: q, panOnScrollMode: W, panOnScrollSpeed: te, preventScrolling: D, zoomOnPinch: V, zoomOnScroll: ne, zoomOnDoubleClick: B, zoomActivationKeyPressed: E, lib: U, onTransformChange: F, connectionInProgress: K, paneClickDistance: Z, selectionOnDrag: se }) {
    A && !y.isZoomingOrPanning && _();
    const he = z && !E && !A;
    b.clickDistance(se ? 1 / 0 : !Sn(Z) || Z < 0 ? 0 : Z);
    const ge = he ? QC({
      zoomPanValues: y,
      noWheelClassName: G,
      d3Selection: S,
      d3Zoom: b,
      panOnScrollMode: W,
      panOnScrollSpeed: te,
      zoomOnPinch: V,
      onPanZoomStart: c,
      onPanZoom: u,
      onPanZoomEnd: d
    }) : FC({
      noWheelClassName: G,
      preventScrolling: D,
      d3ZoomHandler: N
    });
    S.on("wheel.zoom", ge, { passive: !1 });
    const ve = WC({
      zoomPanValues: y,
      onDraggingChange: m,
      onPanZoomStart: c
    });
    b.on("start", ve);
    const xe = JC({
      zoomPanValues: y,
      panOnDrag: q,
      onPaneContextMenu: !!Y,
      onPanZoom: u,
      onTransformChange: F
    });
    b.on("zoom", xe);
    const _e = PC({
      zoomPanValues: y,
      panOnDrag: q,
      panOnScroll: z,
      onPaneContextMenu: Y,
      onPanZoomEnd: d,
      onDraggingChange: m
    });
    b.on("end", _e);
    const De = eM({
      zoomActivationKeyPressed: E,
      panOnDrag: q,
      zoomOnScroll: ne,
      panOnScroll: z,
      zoomOnDoubleClick: B,
      zoomOnPinch: V,
      userSelectionActive: A,
      noPanClassName: j,
      noWheelClassName: G,
      lib: U,
      connectionInProgress: K
    });
    b.filter(De), B ? S.on("dblclick.zoom", M) : S.on("dblclick.zoom", null);
  }
  function _() {
    b.on("zoom", null);
  }
  async function C(G, j, Y) {
    const A = _d(G), z = b?.constrain()(A, j, Y);
    return z && await T(z), z;
  }
  async function k(G, j) {
    const Y = _d(G);
    return await T(Y, j), Y;
  }
  function L(G) {
    if (S) {
      const j = _d(G), Y = S.property("__zoom");
      (Y.k !== G.zoom || Y.x !== G.x || Y.y !== G.y) && b?.transform(S, j, null, { sync: !0 });
    }
  }
  function H() {
    const G = S ? Cb(S.node()) : { x: 0, y: 0, k: 1 };
    return { x: G.x, y: G.y, zoom: G.k };
  }
  async function I(G, j) {
    return S ? new Promise((Y) => {
      b?.interpolate(j?.interpolate === "linear" ? Zr : ru).scaleTo(Nd(S, j?.duration, j?.ease, () => Y(!0)), G);
    }) : !1;
  }
  async function ee(G, j) {
    return S ? new Promise((Y) => {
      b?.interpolate(j?.interpolate === "linear" ? Zr : ru).scaleBy(Nd(S, j?.duration, j?.ease, () => Y(!0)), G);
    }) : !1;
  }
  function Q(G) {
    b?.scaleExtent(G);
  }
  function X(G) {
    b?.translateExtent(G);
  }
  function J(G) {
    const j = !Sn(G) || G < 0 ? 0 : G;
    b?.clickDistance(j);
  }
  return {
    update: O,
    destroy: _,
    setViewport: k,
    setViewportConstrained: C,
    getViewport: H,
    scaleTo: I,
    scaleBy: ee,
    setScaleExtent: Q,
    setTranslateExtent: X,
    syncViewport: L,
    setClickDistance: J
  };
}
var Do;
(function(t) {
  t.Line = "line", t.Handle = "handle";
})(Do || (Do = {}));
function nM({ width: t, prevWidth: i, height: o, prevHeight: r, affectsX: s, affectsY: u }) {
  const c = t - i, d = o - r, m = [c > 0 ? 1 : c < 0 ? -1 : 0, d > 0 ? 1 : d < 0 ? -1 : 0];
  return c && s && (m[0] = m[0] * -1), d && u && (m[1] = m[1] * -1), m;
}
function x0(t) {
  const i = t.includes("right") || t.includes("left"), o = t.includes("bottom") || t.includes("top"), r = t.includes("left"), s = t.includes("top");
  return {
    isHorizontal: i,
    isVertical: o,
    affectsX: r,
    affectsY: s
  };
}
function Ui(t, i) {
  return Math.max(0, i - t);
}
function Yi(t, i) {
  return Math.max(0, t - i);
}
function eu(t, i, o) {
  return Math.max(0, i - t, t - o);
}
function S0(t, i) {
  return t ? !i : i;
}
function iM(t, i, o, r, s, u, c, d) {
  let { affectsX: m, affectsY: y } = i;
  const { isHorizontal: g, isVertical: p } = i, v = g && p, { xSnapped: b, ySnapped: S } = o, { minWidth: N, maxWidth: M, minHeight: T, maxHeight: O } = r, { x: _, y: C, width: k, height: L, aspectRatio: H } = t;
  let I = Math.floor(g ? b - t.pointerX : 0), ee = Math.floor(p ? S - t.pointerY : 0);
  const Q = k + (m ? -I : I), X = L + (y ? -ee : ee), J = -u[0] * k, G = -u[1] * L;
  let j = eu(Q, N, M), Y = eu(X, T, O);
  if (c) {
    let q = 0, W = 0;
    m && I < 0 ? q = Ui(_ + I + J, c[0][0]) : !m && I > 0 && (q = Yi(_ + Q + J, c[1][0])), y && ee < 0 ? W = Ui(C + ee + G, c[0][1]) : !y && ee > 0 && (W = Yi(C + X + G, c[1][1])), j = Math.max(j, q), Y = Math.max(Y, W);
  }
  if (d) {
    let q = 0, W = 0;
    m && I > 0 ? q = Yi(_ + I, d[0][0]) : !m && I < 0 && (q = Ui(_ + Q, d[1][0])), y && ee > 0 ? W = Yi(C + ee, d[0][1]) : !y && ee < 0 && (W = Ui(C + X, d[1][1])), j = Math.max(j, q), Y = Math.max(Y, W);
  }
  if (s) {
    if (g) {
      const q = eu(Q / H, T, O) * H;
      if (j = Math.max(j, q), c) {
        let W = 0;
        !m && !y || m && !y && v ? W = Yi(C + G + Q / H, c[1][1]) * H : W = Ui(C + G + (m ? I : -I) / H, c[0][1]) * H, j = Math.max(j, W);
      }
      if (d) {
        let W = 0;
        !m && !y || m && !y && v ? W = Ui(C + Q / H, d[1][1]) * H : W = Yi(C + (m ? I : -I) / H, d[0][1]) * H, j = Math.max(j, W);
      }
    }
    if (p) {
      const q = eu(X * H, N, M) / H;
      if (Y = Math.max(Y, q), c) {
        let W = 0;
        !m && !y || y && !m && v ? W = Yi(_ + X * H + J, c[1][0]) / H : W = Ui(_ + (y ? ee : -ee) * H + J, c[0][0]) / H, Y = Math.max(Y, W);
      }
      if (d) {
        let W = 0;
        !m && !y || y && !m && v ? W = Ui(_ + X * H, d[1][0]) / H : W = Yi(_ + (y ? ee : -ee) * H, d[0][0]) / H, Y = Math.max(Y, W);
      }
    }
  }
  ee = ee + (ee < 0 ? Y : -Y), I = I + (I < 0 ? j : -j), s && (v ? Q > X * H ? ee = (S0(m, y) ? -I : I) / H : I = (S0(m, y) ? -ee : ee) * H : g ? (ee = I / H, y = m) : (I = ee * H, m = y));
  const A = m ? _ + I : _, z = y ? C + ee : C;
  return {
    width: k + (m ? -I : I),
    height: L + (y ? -ee : ee),
    x: u[0] * I * (m ? -1 : 1) + A,
    y: u[1] * ee * (y ? -1 : 1) + z
  };
}
const nx = { width: 0, height: 0, x: 0, y: 0 }, aM = {
  ...nx,
  pointerX: 0,
  pointerY: 0,
  aspectRatio: 1
};
function oM(t, i, o) {
  const r = i.position.x + t.position.x, s = i.position.y + t.position.y, u = t.measured.width ?? 0, c = t.measured.height ?? 0, d = o[0] * u, m = o[1] * c;
  return [
    [r - d, s - m],
    [r + u - d, s + c - m]
  ];
}
function rM({ domNode: t, nodeId: i, getStoreItems: o, onChange: r, onEnd: s }) {
  const u = Jt(t);
  let c = {
    controlDirection: x0("bottom-right"),
    boundaries: {
      minWidth: 0,
      minHeight: 0,
      maxWidth: Number.MAX_VALUE,
      maxHeight: Number.MAX_VALUE
    },
    resizeDirection: void 0,
    keepAspectRatio: !1
  };
  function d({ controlPosition: y, boundaries: g, keepAspectRatio: p, resizeDirection: v, onResizeStart: b, onResize: S, onResizeEnd: N, shouldResize: M }) {
    let T = { ...nx }, O = { ...aM };
    c = {
      boundaries: g,
      resizeDirection: v,
      keepAspectRatio: p,
      controlDirection: x0(y)
    };
    let _, C = null, k = [], L, H, I, ee = !1;
    const Q = db().on("start", (X) => {
      const { nodeLookup: J, transform: G, snapGrid: j, snapToGrid: Y, nodeOrigin: A, paneDomNode: z } = o();
      if (_ = J.get(i), !_)
        return;
      C = z?.getBoundingClientRect() ?? null;
      const { xSnapped: q, ySnapped: W } = Kr(X.sourceEvent, {
        transform: G,
        snapGrid: j,
        snapToGrid: Y,
        containerBounds: C
      });
      T = {
        width: _.measured.width ?? 0,
        height: _.measured.height ?? 0,
        x: _.position.x ?? 0,
        y: _.position.y ?? 0
      }, O = {
        ...T,
        pointerX: q,
        pointerY: W,
        aspectRatio: T.width / T.height
      }, L = void 0, H = Ca(_.extent) ? _.extent : void 0, _.parentId && (_.extent === "parent" || _.expandParent) && (L = J.get(_.parentId)), L && _.extent === "parent" && (H = [
        [0, 0],
        [L.measured.width, L.measured.height]
      ]), k = [], I = void 0;
      for (const [te, D] of J)
        if (D.parentId === i && (k.push({
          id: te,
          position: { ...D.position },
          extent: D.extent
        }), D.extent === "parent" || D.expandParent)) {
          const V = oM(D, _, D.origin ?? A);
          I ? I = [
            [Math.min(V[0][0], I[0][0]), Math.min(V[0][1], I[0][1])],
            [Math.max(V[1][0], I[1][0]), Math.max(V[1][1], I[1][1])]
          ] : I = V;
        }
      b?.(X, { ...T });
    }).on("drag", (X) => {
      const { transform: J, snapGrid: G, snapToGrid: j, nodeOrigin: Y } = o(), A = Kr(X.sourceEvent, {
        transform: J,
        snapGrid: G,
        snapToGrid: j,
        containerBounds: C
      }), z = [];
      if (!_)
        return;
      const { x: q, y: W, width: te, height: D } = T, V = {}, ne = _.origin ?? Y, { width: B, height: E, x: U, y: F } = iM(O, c.controlDirection, A, c.boundaries, c.keepAspectRatio, ne, H, I), K = B !== te, Z = E !== D, se = U !== q && K, he = F !== W && Z;
      if (!se && !he && !K && !Z)
        return;
      if ((se || he || ne[0] === 1 || ne[1] === 1) && (V.x = se ? U : T.x, V.y = he ? F : T.y, T.x = V.x, T.y = V.y, k.length > 0)) {
        const _e = U - q, De = F - W;
        for (const qe of k)
          qe.position = {
            x: qe.position.x - _e + ne[0] * (B - te),
            y: qe.position.y - De + ne[1] * (E - D)
          }, z.push(qe);
      }
      if ((K || Z) && (V.width = K && (!c.resizeDirection || c.resizeDirection === "horizontal") ? B : T.width, V.height = Z && (!c.resizeDirection || c.resizeDirection === "vertical") ? E : T.height, T.width = V.width, T.height = V.height), L && _.expandParent) {
        const _e = ne[0] * (V.width ?? 0);
        V.x && V.x < _e && (T.x = _e, O.x = O.x - (V.x - _e));
        const De = ne[1] * (V.height ?? 0);
        V.y && V.y < De && (T.y = De, O.y = O.y - (V.y - De));
      }
      const ge = nM({
        width: T.width,
        prevWidth: te,
        height: T.height,
        prevHeight: D,
        affectsX: c.controlDirection.affectsX,
        affectsY: c.controlDirection.affectsY
      }), ve = { ...T, direction: ge };
      M?.(X, ve) !== !1 && (ee = !0, S?.(X, ve), r(V, z));
    }).on("end", (X) => {
      ee && (N?.(X, { ...T }), s?.({ ...T }), ee = !1);
    });
    u.call(Q);
  }
  function m() {
    u.on(".drag", null);
  }
  return {
    update: d,
    destroy: m
  };
}
var Cd = { exports: {} }, Md = {}, Td = { exports: {} }, Ad = {};
var w0;
function lM() {
  if (w0) return Ad;
  w0 = 1;
  var t = cl();
  function i(p, v) {
    return p === v && (p !== 0 || 1 / p === 1 / v) || p !== p && v !== v;
  }
  var o = typeof Object.is == "function" ? Object.is : i, r = t.useState, s = t.useEffect, u = t.useLayoutEffect, c = t.useDebugValue;
  function d(p, v) {
    var b = v(), S = r({ inst: { value: b, getSnapshot: v } }), N = S[0].inst, M = S[1];
    return u(
      function() {
        N.value = b, N.getSnapshot = v, m(N) && M({ inst: N });
      },
      [p, b, v]
    ), s(
      function() {
        return m(N) && M({ inst: N }), p(function() {
          m(N) && M({ inst: N });
        });
      },
      [p]
    ), c(b), b;
  }
  function m(p) {
    var v = p.getSnapshot;
    p = p.value;
    try {
      var b = v();
      return !o(p, b);
    } catch {
      return !0;
    }
  }
  function y(p, v) {
    return v();
  }
  var g = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? y : d;
  return Ad.useSyncExternalStore = t.useSyncExternalStore !== void 0 ? t.useSyncExternalStore : g, Ad;
}
var E0;
function sM() {
  return E0 || (E0 = 1, Td.exports = lM()), Td.exports;
}
var _0;
function uM() {
  if (_0) return Md;
  _0 = 1;
  var t = cl(), i = sM();
  function o(y, g) {
    return y === g && (y !== 0 || 1 / y === 1 / g) || y !== y && g !== g;
  }
  var r = typeof Object.is == "function" ? Object.is : o, s = i.useSyncExternalStore, u = t.useRef, c = t.useEffect, d = t.useMemo, m = t.useDebugValue;
  return Md.useSyncExternalStoreWithSelector = function(y, g, p, v, b) {
    var S = u(null);
    if (S.current === null) {
      var N = { hasValue: !1, value: null };
      S.current = N;
    } else N = S.current;
    S = d(
      function() {
        function T(L) {
          if (!O) {
            if (O = !0, _ = L, L = v(L), b !== void 0 && N.hasValue) {
              var H = N.value;
              if (b(H, L))
                return C = H;
            }
            return C = L;
          }
          if (H = C, r(_, L)) return H;
          var I = v(L);
          return b !== void 0 && b(H, I) ? (_ = L, H) : (_ = L, C = I);
        }
        var O = !1, _, C, k = p === void 0 ? null : p;
        return [
          function() {
            return T(g());
          },
          k === null ? void 0 : function() {
            return T(k());
          }
        ];
      },
      [g, p, v, b]
    );
    var M = s(y, S[0], S[1]);
    return c(
      function() {
        N.hasValue = !0, N.value = M;
      },
      [M]
    ), m(M), M;
  }, Md;
}
var N0;
function cM() {
  return N0 || (N0 = 1, Cd.exports = uM()), Cd.exports;
}
var fM = cM();
const dM = /* @__PURE__ */ Av(fM), hM = {}, C0 = (t) => {
  let i;
  const o = /* @__PURE__ */ new Set(), r = (g, p) => {
    const v = typeof g == "function" ? g(i) : g;
    if (!Object.is(v, i)) {
      const b = i;
      i = p ?? (typeof v != "object" || v === null) ? v : Object.assign({}, i, v), o.forEach((S) => S(i, b));
    }
  }, s = () => i, m = { setState: r, getState: s, getInitialState: () => y, subscribe: (g) => (o.add(g), () => o.delete(g)), destroy: () => {
    (hM ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), o.clear();
  } }, y = i = t(r, s, m);
  return m;
}, mM = (t) => t ? C0(t) : C0, { useDebugValue: gM } = Ir, { useSyncExternalStoreWithSelector: pM } = dM, yM = (t) => t;
function ix(t, i = yM, o) {
  const r = pM(
    t.subscribe,
    t.getState,
    t.getServerState || t.getInitialState,
    i,
    o
  );
  return gM(r), r;
}
const M0 = (t, i) => {
  const o = mM(t), r = (s, u = i) => ix(o, s, u);
  return Object.assign(r, o), r;
}, vM = (t, i) => t ? M0(t, i) : M0;
function at(t, i) {
  if (Object.is(t, i))
    return !0;
  if (typeof t != "object" || t === null || typeof i != "object" || i === null)
    return !1;
  if (t instanceof Map && i instanceof Map) {
    if (t.size !== i.size) return !1;
    for (const [r, s] of t)
      if (!Object.is(s, i.get(r)))
        return !1;
    return !0;
  }
  if (t instanceof Set && i instanceof Set) {
    if (t.size !== i.size) return !1;
    for (const r of t)
      if (!i.has(r))
        return !1;
    return !0;
  }
  const o = Object.keys(t);
  if (o.length !== Object.keys(i).length)
    return !1;
  for (const r of o)
    if (!Object.prototype.hasOwnProperty.call(i, r) || !Object.is(t[r], i[r]))
      return !1;
  return !0;
}
var jd = { exports: {} }, Tt = {};
var T0;
function bM() {
  if (T0) return Tt;
  T0 = 1;
  var t = cl();
  function i(m) {
    var y = "https://react.dev/errors/" + m;
    if (1 < arguments.length) {
      y += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var g = 2; g < arguments.length; g++)
        y += "&args[]=" + encodeURIComponent(arguments[g]);
    }
    return "Minified React error #" + m + "; visit " + y + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function o() {
  }
  var r = {
    d: {
      f: o,
      r: function() {
        throw Error(i(522));
      },
      D: o,
      C: o,
      L: o,
      m: o,
      X: o,
      S: o,
      M: o
    },
    p: 0,
    findDOMNode: null
  }, s = /* @__PURE__ */ Symbol.for("react.portal");
  function u(m, y, g) {
    var p = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: s,
      key: p == null ? null : "" + p,
      children: m,
      containerInfo: y,
      implementation: g
    };
  }
  var c = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function d(m, y) {
    if (m === "font") return "";
    if (typeof y == "string")
      return y === "use-credentials" ? y : "";
  }
  return Tt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r, Tt.createPortal = function(m, y) {
    var g = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!y || y.nodeType !== 1 && y.nodeType !== 9 && y.nodeType !== 11)
      throw Error(i(299));
    return u(m, y, null, g);
  }, Tt.flushSync = function(m) {
    var y = c.T, g = r.p;
    try {
      if (c.T = null, r.p = 2, m) return m();
    } finally {
      c.T = y, r.p = g, r.d.f();
    }
  }, Tt.preconnect = function(m, y) {
    typeof m == "string" && (y ? (y = y.crossOrigin, y = typeof y == "string" ? y === "use-credentials" ? y : "" : void 0) : y = null, r.d.C(m, y));
  }, Tt.prefetchDNS = function(m) {
    typeof m == "string" && r.d.D(m);
  }, Tt.preinit = function(m, y) {
    if (typeof m == "string" && y && typeof y.as == "string") {
      var g = y.as, p = d(g, y.crossOrigin), v = typeof y.integrity == "string" ? y.integrity : void 0, b = typeof y.fetchPriority == "string" ? y.fetchPriority : void 0;
      g === "style" ? r.d.S(
        m,
        typeof y.precedence == "string" ? y.precedence : void 0,
        {
          crossOrigin: p,
          integrity: v,
          fetchPriority: b
        }
      ) : g === "script" && r.d.X(m, {
        crossOrigin: p,
        integrity: v,
        fetchPriority: b,
        nonce: typeof y.nonce == "string" ? y.nonce : void 0
      });
    }
  }, Tt.preinitModule = function(m, y) {
    if (typeof m == "string")
      if (typeof y == "object" && y !== null) {
        if (y.as == null || y.as === "script") {
          var g = d(
            y.as,
            y.crossOrigin
          );
          r.d.M(m, {
            crossOrigin: g,
            integrity: typeof y.integrity == "string" ? y.integrity : void 0,
            nonce: typeof y.nonce == "string" ? y.nonce : void 0
          });
        }
      } else y == null && r.d.M(m);
  }, Tt.preload = function(m, y) {
    if (typeof m == "string" && typeof y == "object" && y !== null && typeof y.as == "string") {
      var g = y.as, p = d(g, y.crossOrigin);
      r.d.L(m, g, {
        crossOrigin: p,
        integrity: typeof y.integrity == "string" ? y.integrity : void 0,
        nonce: typeof y.nonce == "string" ? y.nonce : void 0,
        type: typeof y.type == "string" ? y.type : void 0,
        fetchPriority: typeof y.fetchPriority == "string" ? y.fetchPriority : void 0,
        referrerPolicy: typeof y.referrerPolicy == "string" ? y.referrerPolicy : void 0,
        imageSrcSet: typeof y.imageSrcSet == "string" ? y.imageSrcSet : void 0,
        imageSizes: typeof y.imageSizes == "string" ? y.imageSizes : void 0,
        media: typeof y.media == "string" ? y.media : void 0
      });
    }
  }, Tt.preloadModule = function(m, y) {
    if (typeof m == "string")
      if (y) {
        var g = d(y.as, y.crossOrigin);
        r.d.m(m, {
          as: typeof y.as == "string" && y.as !== "script" ? y.as : void 0,
          crossOrigin: g,
          integrity: typeof y.integrity == "string" ? y.integrity : void 0
        });
      } else r.d.m(m);
  }, Tt.requestFormReset = function(m) {
    r.d.r(m);
  }, Tt.unstable_batchedUpdates = function(m, y) {
    return m(y);
  }, Tt.useFormState = function(m, y, g) {
    return c.H.useFormState(m, y, g);
  }, Tt.useFormStatus = function() {
    return c.H.useHostTransitionStatus();
  }, Tt.version = "19.2.8", Tt;
}
var A0;
function ax() {
  if (A0) return jd.exports;
  A0 = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (i) {
        console.error(i);
      }
  }
  return t(), jd.exports = bM(), jd.exports;
}
var ox = ax();
const Ku = $.createContext(null), xM = Ku.Provider, rx = _n.error001("react");
function Be(t, i) {
  const o = $.useContext(Ku);
  if (o === null)
    throw new Error(rx);
  return ix(o, t, i);
}
function et() {
  const t = $.useContext(Ku);
  if (t === null)
    throw new Error(rx);
  return $.useMemo(() => ({
    getState: t.getState,
    setState: t.setState,
    subscribe: t.subscribe
  }), [t]);
}
const j0 = { display: "none" }, SM = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  border: 0,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0px, 0px, 0px, 0px)",
  clipPath: "inset(100%)"
}, lx = "react-flow__node-desc", sx = "react-flow__edge-desc", wM = "react-flow__aria-live", EM = (t) => t.ariaLiveMessage, _M = (t) => t.ariaLabelConfig;
function NM({ rfId: t }) {
  const i = Be(EM);
  return x.jsx("div", { id: `${wM}-${t}`, "aria-live": "assertive", "aria-atomic": "true", style: SM, children: i });
}
function CM({ rfId: t, disableKeyboardA11y: i }) {
  const o = Be(_M);
  return x.jsxs(x.Fragment, { children: [x.jsx("div", { id: `${lx}-${t}`, style: j0, children: i ? o["node.a11yDescription.default"] : o["node.a11yDescription.keyboardDisabled"] }), x.jsx("div", { id: `${sx}-${t}`, style: j0, children: o["edge.a11yDescription.default"] }), !i && x.jsx(NM, { rfId: t })] });
}
const Qu = $.forwardRef(({ position: t = "top-left", children: i, className: o, style: r, ...s }, u) => {
  const c = `${t}`.split("-");
  return x.jsx("div", { className: yt(["react-flow__panel", o, ...c]), style: r, ref: u, ...s, children: i });
});
Qu.displayName = "Panel";
const D0 = "https://reactflow.dev?utm_source=attribution";
function MM({ proOptions: t, position: i = "bottom-right" }) {
  return t?.hideAttribution ? null : x.jsx(Qu, { position: i, className: "react-flow__attribution", "data-message": `Please only hide this attribution when you are subscribed to React Flow Pro: ${D0}`, children: x.jsx("a", { href: D0, target: "_blank", rel: "noopener noreferrer", "aria-label": "React Flow attribution", children: "React Flow" }) });
}
const TM = (t) => {
  const i = [], o = [];
  for (const [, r] of t.nodeLookup)
    r.selected && i.push(r.internals.userNode);
  for (const [, r] of t.edgeLookup)
    r.selected && o.push(r);
  return { selectedNodes: i, selectedEdges: o };
}, tu = (t) => t.id;
function AM(t, i) {
  return at(t.selectedNodes.map(tu), i.selectedNodes.map(tu)) && at(t.selectedEdges.map(tu), i.selectedEdges.map(tu));
}
function jM({ onSelectionChange: t }) {
  const i = et(), { selectedNodes: o, selectedEdges: r } = Be(TM, AM);
  return $.useEffect(() => {
    const s = { nodes: o, edges: r };
    t?.(s), i.getState().onSelectionChangeHandlers.forEach((u) => u(s));
  }, [o, r, t]), null;
}
const DM = (t) => !!t.onSelectionChangeHandlers;
function OM({ onSelectionChange: t }) {
  const i = Be(DM);
  return t || i ? x.jsx(jM, { onSelectionChange: t }) : null;
}
const ux = [0, 0], zM = { x: 0, y: 0, zoom: 1 }, RM = [
  "nodes",
  "edges",
  "defaultNodes",
  "defaultEdges",
  "onConnect",
  "onConnectStart",
  "onConnectEnd",
  "onClickConnectStart",
  "onClickConnectEnd",
  "nodesDraggable",
  "autoPanOnNodeFocus",
  "nodesConnectable",
  "nodesFocusable",
  "edgesFocusable",
  "edgesReconnectable",
  "elevateNodesOnSelect",
  "elevateEdgesOnSelect",
  "minZoom",
  "maxZoom",
  "nodeExtent",
  "onNodesChange",
  "onEdgesChange",
  "elementsSelectable",
  "connectionMode",
  "snapGrid",
  "snapToGrid",
  "translateExtent",
  "connectOnClick",
  "defaultEdgeOptions",
  "fitView",
  "fitViewOptions",
  "onNodesDelete",
  "onEdgesDelete",
  "onDelete",
  "onNodeDrag",
  "onNodeDragStart",
  "onNodeDragStop",
  "onSelectionDrag",
  "onSelectionDragStart",
  "onSelectionDragStop",
  "onMoveStart",
  "onMove",
  "onMoveEnd",
  "noPanClassName",
  "nodeOrigin",
  "autoPanOnConnect",
  "autoPanOnNodeDrag",
  "onError",
  "connectionRadius",
  "isValidConnection",
  "selectNodesOnDrag",
  "nodeDragThreshold",
  "connectionDragThreshold",
  "onBeforeDelete",
  "debug",
  "autoPanSpeed",
  "ariaLabelConfig",
  "zIndexMode"
], O0 = [...RM, "rfId"], kM = (t) => ({
  setNodes: t.setNodes,
  setEdges: t.setEdges,
  setMinZoom: t.setMinZoom,
  setMaxZoom: t.setMaxZoom,
  setTranslateExtent: t.setTranslateExtent,
  setNodeExtent: t.setNodeExtent,
  reset: t.reset,
  setDefaultNodesAndEdges: t.setDefaultNodesAndEdges
}), z0 = {
  /*
   * these are values that are also passed directly to other components
   * than the StoreUpdater. We can reduce the number of setStore calls
   * by setting the same values here as prev fields.
   */
  translateExtent: ol,
  nodeOrigin: ux,
  minZoom: 0.5,
  maxZoom: 2,
  elementsSelectable: !0,
  noPanClassName: "nopan",
  rfId: "1"
};
function HM(t) {
  const { setNodes: i, setEdges: o, setMinZoom: r, setMaxZoom: s, setTranslateExtent: u, setNodeExtent: c, reset: d, setDefaultNodesAndEdges: m } = Be(kM, at), y = et();
  $.useEffect(() => (m(t.defaultNodes, t.defaultEdges), () => {
    g.current = z0, d();
  }), []);
  const g = $.useRef(z0);
  return $.useEffect(
    () => {
      for (const p of O0) {
        const v = t[p], b = g.current[p];
        v !== b && (typeof t[p] > "u" || (p === "nodes" ? i(v) : p === "edges" ? o(v) : p === "minZoom" ? r(v) : p === "maxZoom" ? s(v) : p === "translateExtent" ? u(v) : p === "nodeExtent" ? c(v) : p === "ariaLabelConfig" ? y.setState({ ariaLabelConfig: bC(v) }) : p === "fitView" ? y.setState({ fitViewQueued: v }) : p === "fitViewOptions" ? y.setState({ fitViewOptions: v }) : y.setState({ [p]: v })));
      }
      g.current = t;
    },
    // Only re-run the effect if one of the fields we track changes
    O0.map((p) => t[p])
  ), null;
}
function R0() {
  return typeof window > "u" || !window.matchMedia ? null : window.matchMedia("(prefers-color-scheme: dark)");
}
function LM(t) {
  const [i, o] = $.useState(t === "system" ? null : t);
  return $.useEffect(() => {
    if (t !== "system") {
      o(t);
      return;
    }
    const r = R0(), s = () => o(r?.matches ? "dark" : "light");
    return s(), r?.addEventListener("change", s), () => {
      r?.removeEventListener("change", s);
    };
  }, [t]), i !== null ? i : R0()?.matches ? "dark" : "light";
}
const k0 = typeof document < "u" ? document : null;
function ul(t = null, i = { target: k0, actInsideInputWithModifier: !0 }) {
  const [o, r] = $.useState(!1), s = $.useRef(!1), u = $.useRef(/* @__PURE__ */ new Set([])), [c, d] = $.useMemo(() => {
    if (t !== null) {
      const y = (Array.isArray(t) ? t : [t]).filter((p) => typeof p == "string").map((p) => p.replace("+", `
`).replace(`

`, `
+`).split(`
`)), g = y.reduce((p, v) => p.concat(...v), []);
      return [y, g];
    }
    return [[], []];
  }, [t]);
  return $.useEffect(() => {
    const m = i?.target ?? k0, y = i?.actInsideInputWithModifier ?? !0;
    if (t !== null) {
      const g = (b) => {
        if (s.current = b.ctrlKey || b.metaKey || b.shiftKey || b.altKey, (!s.current || s.current && !y) && Ub(b))
          return !1;
        const N = L0(b.code, d);
        if (u.current.add(b[N]), H0(c, u.current, !1)) {
          const M = b.composedPath?.()?.[0] || b.target, T = M?.nodeName === "BUTTON" || M?.nodeName === "A";
          i.preventDefault !== !1 && (s.current || !T) && b.preventDefault(), r(!0);
        }
      }, p = (b) => {
        const S = L0(b.code, d);
        H0(c, u.current, !0) ? (r(!1), u.current.clear()) : u.current.delete(b[S]), b.key === "Meta" && u.current.clear(), s.current = !1;
      }, v = () => {
        u.current.clear(), r(!1);
      };
      return m?.addEventListener("keydown", g), m?.addEventListener("keyup", p), window.addEventListener("blur", v), window.addEventListener("contextmenu", v), () => {
        m?.removeEventListener("keydown", g), m?.removeEventListener("keyup", p), window.removeEventListener("blur", v), window.removeEventListener("contextmenu", v);
      };
    }
  }, [t, r]), o;
}
function H0(t, i, o) {
  return t.filter((r) => o || r.length === i.size).some((r) => r.every((s) => i.has(s)));
}
function L0(t, i) {
  return i.includes(t) ? "code" : "key";
}
const BM = () => {
  const t = et();
  return $.useMemo(() => ({
    zoomIn: async (i) => {
      const { panZoom: o } = t.getState();
      return o ? o.scaleBy(1.2, i) : !1;
    },
    zoomOut: async (i) => {
      const { panZoom: o } = t.getState();
      return o ? o.scaleBy(1 / 1.2, i) : !1;
    },
    zoomTo: async (i, o) => {
      const { panZoom: r } = t.getState();
      return r ? r.scaleTo(i, o) : !1;
    },
    getZoom: () => t.getState().transform[2],
    setViewport: async (i, o) => {
      const { transform: [r, s, u], panZoom: c } = t.getState();
      return c ? (await c.setViewport({
        x: i.x ?? r,
        y: i.y ?? s,
        zoom: i.zoom ?? u
      }, o), !0) : !1;
    },
    getViewport: () => {
      const [i, o, r] = t.getState().transform;
      return { x: i, y: o, zoom: r };
    },
    setCenter: async (i, o, r) => t.getState().setCenter(i, o, r),
    fitBounds: async (i, o) => {
      const { width: r, height: s, minZoom: u, maxZoom: c, panZoom: d } = t.getState(), m = Nh(i, r, s, u, c, o?.padding ?? 0.1);
      return d ? (await d.setViewport(m, {
        duration: o?.duration,
        ease: o?.ease,
        interpolate: o?.interpolate
      }), !0) : !1;
    },
    screenToFlowPosition: (i, o = {}) => {
      const { transform: r, snapGrid: s, snapToGrid: u, domNode: c } = t.getState();
      if (!c)
        return i;
      const { x: d, y: m } = c.getBoundingClientRect(), y = {
        x: i.x - d,
        y: i.y - m
      }, g = o.snapGrid ?? s, p = o.snapToGrid ?? u;
      return bl(y, r, p, g);
    },
    flowToScreenPosition: (i) => {
      const { transform: o, domNode: r } = t.getState();
      if (!r)
        return i;
      const { x: s, y: u } = r.getBoundingClientRect(), c = jo(i, o);
      return {
        x: c.x + s,
        y: c.y + u
      };
    }
  }), []);
};
function cx(t, i) {
  const o = [], r = /* @__PURE__ */ new Map(), s = [];
  for (const u of t)
    if (u.type === "add") {
      s.push(u);
      continue;
    } else if (u.type === "remove" || u.type === "replace")
      r.set(u.id, [u]);
    else {
      const c = r.get(u.id);
      c ? c.push(u) : r.set(u.id, [u]);
    }
  for (const u of i) {
    const c = r.get(u.id);
    if (!c) {
      o.push(u);
      continue;
    }
    if (c[0].type === "remove")
      continue;
    if (c[0].type === "replace") {
      o.push({ ...c[0].item });
      continue;
    }
    const d = { ...u };
    for (const m of c)
      IM(m, d);
    o.push(d);
  }
  return s.length && s.forEach((u) => {
    u.index !== void 0 ? o.splice(u.index, 0, { ...u.item }) : o.push({ ...u.item });
  }), o;
}
function IM(t, i) {
  switch (t.type) {
    case "select": {
      i.selected = t.selected;
      break;
    }
    case "position": {
      typeof t.position < "u" && (i.position = t.position), typeof t.dragging < "u" && (i.dragging = t.dragging);
      break;
    }
    case "dimensions": {
      typeof t.dimensions < "u" && (i.measured = {
        ...t.dimensions
      }, t.setAttributes && ((t.setAttributes === !0 || t.setAttributes === "width") && (i.width = t.dimensions.width), (t.setAttributes === !0 || t.setAttributes === "height") && (i.height = t.dimensions.height))), typeof t.resizing == "boolean" && (i.resizing = t.resizing);
      break;
    }
  }
}
function fx(t, i) {
  return cx(t, i);
}
function dx(t, i) {
  return cx(t, i);
}
function ga(t, i) {
  return {
    id: t,
    type: "select",
    selected: i
  };
}
function wo(t, i = /* @__PURE__ */ new Set(), o = !1) {
  const r = [];
  for (const [s, u] of t) {
    const c = i.has(s);
    !(u.selected === void 0 && !c) && u.selected !== c && (o && (u.selected = c), r.push(ga(u.id, c)));
  }
  return r;
}
function B0({ items: t = [], lookup: i }) {
  const o = [], r = new Map(t.map((s) => [s.id, s]));
  for (const [s, u] of t.entries()) {
    const c = i.get(u.id), d = c?.internals?.userNode ?? c;
    d !== void 0 && d !== u && o.push({ id: u.id, item: u, type: "replace" }), d === void 0 && o.push({ item: u, type: "add", index: s });
  }
  for (const [s] of i)
    r.get(s) === void 0 && o.push({ id: s, type: "remove" });
  return o;
}
function I0(t) {
  return {
    id: t.id,
    type: "remove"
  };
}
const VM = Lb();
function UM(t, i, o = {}) {
  return NC(t, i, {
    ...o,
    onError: o.onError ?? VM
  });
}
const V0 = (t) => cC(t), YM = (t) => Ob(t);
function hx(t) {
  return $.forwardRef(t);
}
const mx = typeof window < "u" ? $.useLayoutEffect : $.useEffect;
function U0(t) {
  const [i, o] = $.useState(BigInt(0)), [r] = $.useState(() => qM(() => o((s) => s + BigInt(1))));
  return mx(() => {
    const s = r.get();
    s.length && (t(s), r.reset());
  }, [i]), r;
}
function qM(t) {
  let i = [];
  return {
    get: () => i,
    reset: () => {
      i = [];
    },
    push: (o) => {
      i.push(o), t();
    }
  };
}
const gx = $.createContext(null);
function $M({ children: t }) {
  const i = et(), o = $.useCallback((d) => {
    const { nodes: m = [], setNodes: y, hasDefaultNodes: g, onNodesChange: p, nodeLookup: v, fitViewQueued: b, onNodesChangeMiddlewareMap: S } = i.getState();
    let N = m;
    for (const T of d)
      N = typeof T == "function" ? T(N) : T;
    let M = B0({
      items: N,
      lookup: v
    });
    for (const T of S.values())
      M = T(M);
    g && y(N), M.length > 0 ? p?.(M) : b && window.requestAnimationFrame(() => {
      const { fitViewQueued: T, nodes: O, setNodes: _ } = i.getState();
      T && _(O);
    });
  }, []), r = U0(o), s = $.useCallback((d) => {
    const { edges: m = [], setEdges: y, hasDefaultEdges: g, onEdgesChange: p, edgeLookup: v } = i.getState();
    let b = m;
    for (const S of d)
      b = typeof S == "function" ? S(b) : S;
    g ? y(b) : p && p(B0({
      items: b,
      lookup: v
    }));
  }, []), u = U0(s), c = $.useMemo(() => ({ nodeQueue: r, edgeQueue: u }), []);
  return x.jsx(gx.Provider, { value: c, children: t });
}
function XM() {
  const t = $.useContext(gx);
  if (!t)
    throw new Error("useBatchContext must be used within a BatchProvider");
  return t;
}
const GM = (t) => !!t.panZoom;
function Fu() {
  const t = BM(), i = et(), o = XM(), r = Be(GM), s = $.useMemo(() => {
    const u = (p) => i.getState().nodeLookup.get(p), c = (p) => {
      o.nodeQueue.push(p);
    }, d = (p) => {
      o.edgeQueue.push(p);
    }, m = (p) => {
      const { nodeLookup: v, nodeOrigin: b } = i.getState(), S = V0(p) ? p : v.get(p.id), N = S.parentId ? Ib(S.position, S.measured, S.parentId, v, b) : S.position, M = {
        ...S,
        position: N,
        width: S.measured?.width ?? S.width,
        height: S.measured?.height ?? S.height
      };
      return ll(M);
    }, y = (p, v, b = { replace: !1 }) => {
      c((S) => S.map((N) => {
        if (N.id === p) {
          const M = typeof v == "function" ? v(N) : v;
          return b.replace && V0(M) ? M : { ...N, ...M };
        }
        return N;
      }));
    }, g = (p, v, b = { replace: !1 }) => {
      d((S) => S.map((N) => {
        if (N.id === p) {
          const M = typeof v == "function" ? v(N) : v;
          return b.replace && YM(M) ? M : { ...N, ...M };
        }
        return N;
      }));
    };
    return {
      getNodes: () => i.getState().nodes.map((p) => ({ ...p })),
      getNode: (p) => u(p)?.internals.userNode,
      getInternalNode: u,
      getEdges: () => {
        const { edges: p = [] } = i.getState();
        return p.map((v) => ({ ...v }));
      },
      getEdge: (p) => i.getState().edgeLookup.get(p),
      setNodes: c,
      setEdges: d,
      addNodes: (p) => {
        const v = Array.isArray(p) ? p : [p];
        o.nodeQueue.push((b) => [...b, ...v]);
      },
      addEdges: (p) => {
        const v = Array.isArray(p) ? p : [p];
        o.edgeQueue.push((b) => [...b, ...v]);
      },
      toObject: () => {
        const { nodes: p = [], edges: v = [], transform: b } = i.getState(), [S, N, M] = b;
        return {
          nodes: p.map((T) => ({ ...T })),
          edges: v.map((T) => ({ ...T })),
          viewport: {
            x: S,
            y: N,
            zoom: M
          }
        };
      },
      deleteElements: async ({ nodes: p = [], edges: v = [] }) => {
        const { nodes: b, edges: S, onNodesDelete: N, onEdgesDelete: M, triggerNodeChanges: T, triggerEdgeChanges: O, onDelete: _, onBeforeDelete: C } = i.getState(), { nodes: k, edges: L } = await gC({
          nodesToRemove: p,
          edgesToRemove: v,
          nodes: b,
          edges: S,
          onBeforeDelete: C
        }), H = L.length > 0, I = k.length > 0;
        if (H) {
          const ee = L.map(I0);
          M?.(L), O(ee);
        }
        if (I) {
          const ee = k.map(I0);
          N?.(k), T(ee);
        }
        return (I || H) && _?.({ nodes: k, edges: L }), { deletedNodes: k, deletedEdges: L };
      },
      /**
       * Partial is defined as "the 2 nodes/areas are intersecting partially".
       * If a is contained in b or b is contained in a, they are both
       * considered fully intersecting.
       */
      getIntersectingNodes: (p, v = !0, b) => {
        const S = u0(p), N = S ? p : m(p), M = b !== void 0;
        return N ? (b || i.getState().nodes).filter((T) => {
          const O = i.getState().nodeLookup.get(T.id);
          if (O && !S && (T.id === p.id || !O.internals.positionAbsolute))
            return !1;
          const _ = ll(M ? T : O), C = ju(_, N);
          return v && C > 0 || C >= _.width * _.height || C >= N.width * N.height;
        }) : [];
      },
      isNodeIntersecting: (p, v, b = !0) => {
        const N = u0(p) ? p : m(p);
        if (!N)
          return !1;
        const M = ju(N, v);
        return b && M > 0 || M >= v.width * v.height || M >= N.width * N.height;
      },
      updateNode: y,
      updateNodeData: (p, v, b = { replace: !1 }) => {
        y(p, (S) => {
          const N = typeof v == "function" ? v(S) : v;
          return b.replace ? { ...S, data: N } : { ...S, data: { ...S.data, ...N } };
        }, b);
      },
      updateEdge: g,
      updateEdgeData: (p, v, b = { replace: !1 }) => {
        g(p, (S) => {
          const N = typeof v == "function" ? v(S) : v;
          return b.replace ? { ...S, data: N } : { ...S, data: { ...S.data, ...N } };
        }, b);
      },
      getNodesBounds: (p) => {
        const { nodeLookup: v, nodeOrigin: b } = i.getState();
        return fC(p, { nodeLookup: v, nodeOrigin: b });
      },
      getHandleConnections: ({ type: p, id: v, nodeId: b }) => Array.from(i.getState().connectionLookup.get(`${b}-${p}${v ? `-${v}` : ""}`)?.values() ?? []),
      getNodeConnections: ({ type: p, handleId: v, nodeId: b }) => Array.from(i.getState().connectionLookup.get(`${b}${p ? v ? `-${p}-${v}` : `-${p}` : ""}`)?.values() ?? []),
      fitView: async (p) => {
        const v = i.getState().fitViewResolver ?? vC();
        return i.setState({ fitViewQueued: !0, fitViewOptions: p, fitViewResolver: v }), o.nodeQueue.push((b) => [...b]), v.promise;
      }
    };
  }, []);
  return $.useMemo(() => ({
    ...s,
    ...t,
    viewportInitialized: r
  }), [r]);
}
const Y0 = (t) => t.selected, ZM = typeof window < "u" ? window : void 0;
function KM({ deleteKeyCode: t, multiSelectionKeyCode: i }) {
  const o = et(), { deleteElements: r } = Fu(), s = ul(t, { actInsideInputWithModifier: !1 }), u = ul(i, { target: ZM });
  $.useEffect(() => {
    if (s) {
      const { edges: c, nodes: d } = o.getState();
      r({ nodes: d.filter(Y0), edges: c.filter(Y0) }), o.setState({ nodesSelectionActive: !1 });
    }
  }, [s]), $.useEffect(() => {
    o.setState({ multiSelectionActive: u });
  }, [u]);
}
function QM(t) {
  const i = et();
  $.useEffect(() => {
    const o = () => {
      if (!t.current || !(t.current.checkVisibility?.() ?? !0))
        return !1;
      const r = Ch(t.current);
      (r.height === 0 || r.width === 0) && i.getState().onError?.("004", _n.error004()), i.setState({ width: r.width || 500, height: r.height || 500 });
    };
    if (t.current) {
      o(), window.addEventListener("resize", o);
      const r = new ResizeObserver(() => o());
      return r.observe(t.current), () => {
        window.removeEventListener("resize", o), r && t.current && r.unobserve(t.current);
      };
    }
  }, []);
}
const Wu = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
}, FM = (t) => ({
  userSelectionActive: t.userSelectionActive,
  lib: t.lib,
  connectionInProgress: t.connection.inProgress
});
function WM({ onPaneContextMenu: t, zoomOnScroll: i = !0, zoomOnPinch: o = !0, panOnScroll: r = !1, panOnScrollSpeed: s = 0.5, panOnScrollMode: u = xa.Free, zoomOnDoubleClick: c = !0, panOnDrag: d = !0, defaultViewport: m, translateExtent: y, minZoom: g, maxZoom: p, zoomActivationKeyCode: v, preventScrolling: b = !0, children: S, noWheelClassName: N, noPanClassName: M, onViewportChange: T, isControlledViewport: O, paneClickDistance: _, selectionOnDrag: C }) {
  const k = et(), L = $.useRef(null), { userSelectionActive: H, lib: I, connectionInProgress: ee } = Be(FM, at), Q = ul(v), X = $.useRef();
  QM(L);
  const J = $.useCallback((G) => {
    T?.({ x: G[0], y: G[1], zoom: G[2] }), O || k.setState({ transform: G });
  }, [T, O]);
  return $.useEffect(() => {
    if (L.current) {
      X.current = tM({
        domNode: L.current,
        minZoom: g,
        maxZoom: p,
        translateExtent: y,
        viewport: m,
        onDraggingChange: (A) => k.setState((z) => z.paneDragging === A ? z : { paneDragging: A }),
        onPanZoomStart: (A, z) => {
          const { onViewportChangeStart: q, onMoveStart: W } = k.getState();
          W?.(A, z), q?.(z);
        },
        onPanZoom: (A, z) => {
          const { onViewportChange: q, onMove: W } = k.getState();
          W?.(A, z), q?.(z);
        },
        onPanZoomEnd: (A, z) => {
          const { onViewportChangeEnd: q, onMoveEnd: W } = k.getState();
          W?.(A, z), q?.(z);
        }
      });
      const { x: G, y: j, zoom: Y } = X.current.getViewport();
      return k.setState({
        panZoom: X.current,
        transform: [G, j, Y],
        domNode: L.current.closest(".react-flow")
      }), () => {
        X.current?.destroy();
      };
    }
  }, []), $.useEffect(() => {
    X.current?.update({
      onPaneContextMenu: t,
      zoomOnScroll: i,
      zoomOnPinch: o,
      panOnScroll: r,
      panOnScrollSpeed: s,
      panOnScrollMode: u,
      zoomOnDoubleClick: c,
      panOnDrag: d,
      zoomActivationKeyPressed: Q,
      preventScrolling: b,
      noPanClassName: M,
      userSelectionActive: H,
      noWheelClassName: N,
      lib: I,
      onTransformChange: J,
      connectionInProgress: ee,
      selectionOnDrag: C,
      paneClickDistance: _
    });
  }, [
    t,
    i,
    o,
    r,
    s,
    u,
    c,
    d,
    Q,
    b,
    M,
    H,
    N,
    I,
    J,
    ee,
    C,
    _
  ]), x.jsx("div", { className: "react-flow__renderer", ref: L, style: Wu, children: S });
}
const JM = (t) => ({
  userSelectionActive: t.userSelectionActive,
  userSelectionRect: t.userSelectionRect
});
function PM() {
  const { userSelectionActive: t, userSelectionRect: i } = Be(JM, at);
  return t && i ? x.jsx("div", { className: "react-flow__selection react-flow__container", style: {
    width: i.width,
    height: i.height,
    transform: `translate(${i.x}px, ${i.y}px)`
  } }) : null;
}
const Dd = (t, i) => (o) => {
  o.target === i.current && t?.(o);
}, eT = (t) => ({
  userSelectionActive: t.userSelectionActive,
  elementsSelectable: t.elementsSelectable,
  dragging: t.paneDragging,
  panBy: t.panBy,
  autoPanSpeed: t.autoPanSpeed
});
function tT({ isSelecting: t, selectionKeyPressed: i, selectionMode: o = rl.Full, panOnDrag: r, autoPanOnSelection: s, paneClickDistance: u, selectionOnDrag: c, onSelectionStart: d, onSelectionEnd: m, onPaneClick: y, onPaneContextMenu: g, onPaneScroll: p, onPaneMouseEnter: v, onPaneMouseMove: b, onPaneMouseLeave: S, children: N }) {
  const M = $.useRef(0), T = et(), { userSelectionActive: O, elementsSelectable: _, dragging: C, panBy: k, autoPanSpeed: L } = Be(eT, at), H = _ && (t || O), I = $.useRef(null), ee = $.useRef(), Q = $.useRef(/* @__PURE__ */ new Set()), X = $.useRef(/* @__PURE__ */ new Set()), J = $.useRef(!1), G = $.useRef(!1), j = $.useRef({ x: 0, y: 0 }), Y = $.useRef(!1), A = (K) => {
    if (G.current || J.current || T.getState().connection.inProgress) {
      G.current = !1, J.current = !1;
      return;
    }
    y?.(K), T.getState().resetSelectedElements(), T.setState({ nodesSelectionActive: !1 });
  }, z = (K) => {
    if (Array.isArray(r) && r?.includes(2)) {
      K.preventDefault();
      return;
    }
    g?.(K);
  }, q = p ? (K) => p(K) : void 0, W = (K) => {
    G.current && (K.stopPropagation(), G.current = !1);
  }, te = (K) => {
    const { domNode: Z, transform: se } = T.getState();
    if (ee.current = Z?.getBoundingClientRect(), !ee.current)
      return;
    const he = K.target === I.current;
    if (!he && !!K.target.closest(".nokey") || !t || !(c && he || i) || K.button !== 0 || !K.isPrimary)
      return;
    K.target?.setPointerCapture?.(K.pointerId), G.current = !1;
    const { x: xe, y: _e } = wn(K.nativeEvent, ee.current), De = bl({ x: xe, y: _e }, se);
    T.setState({
      userSelectionRect: {
        width: 0,
        height: 0,
        startX: De.x,
        startY: De.y,
        x: xe,
        y: _e
      }
    }), he || (K.stopPropagation(), K.preventDefault());
  };
  function D(K, Z) {
    const { userSelectionRect: se } = T.getState();
    if (!se)
      return;
    const { transform: he, nodeLookup: ge, edgeLookup: ve, connectionLookup: xe, triggerNodeChanges: _e, triggerEdgeChanges: De, defaultEdgeOptions: qe } = T.getState(), Ie = { x: se.startX, y: se.startY }, { x: ot, y: nt } = jo(Ie, he), St = {
      startX: Ie.x,
      startY: Ie.y,
      x: K < ot ? K : ot,
      y: Z < nt ? Z : nt,
      width: Math.abs(K - ot),
      height: Math.abs(Z - nt)
    }, tn = Q.current, dn = X.current;
    Q.current = new Set(Eh(ge, St, he, o === rl.Partial, !0).map((At) => At.id)), X.current = /* @__PURE__ */ new Set();
    const it = qe?.selectable ?? !0;
    for (const At of Q.current) {
      const Ot = xe.get(At);
      if (Ot)
        for (const { edgeId: zt } of Ot.values()) {
          const Rt = ve.get(zt);
          Rt && (Rt.selectable ?? it) && X.current.add(zt);
        }
    }
    if (!c0(tn, Q.current)) {
      const At = wo(ge, Q.current, !0);
      _e(At);
    }
    if (!c0(dn, X.current)) {
      const At = wo(ve, X.current);
      De(At);
    }
    T.setState({
      userSelectionRect: St,
      userSelectionActive: !0,
      nodesSelectionActive: !1
    });
  }
  function V() {
    if (!s || !ee.current)
      return;
    const [K, Z] = _h(j.current, ee.current, L);
    k({ x: K, y: Z }).then((se) => {
      if (!G.current || !se) {
        M.current = requestAnimationFrame(V);
        return;
      }
      const { x: he, y: ge } = j.current;
      D(he, ge), M.current = requestAnimationFrame(V);
    });
  }
  const ne = () => {
    cancelAnimationFrame(M.current), M.current = 0, Y.current = !1;
  };
  $.useEffect(() => () => ne(), []);
  const B = (K) => {
    const { userSelectionRect: Z, transform: se, resetSelectedElements: he } = T.getState();
    if (!ee.current || !Z)
      return;
    const { x: ge, y: ve } = wn(K.nativeEvent, ee.current);
    j.current = { x: ge, y: ve };
    const xe = jo({ x: Z.startX, y: Z.startY }, se);
    if (!G.current) {
      const _e = i ? 0 : u;
      if (Math.hypot(ge - xe.x, ve - xe.y) <= _e)
        return;
      he(), d?.(K);
    }
    G.current = !0, Y.current || (V(), Y.current = !0), D(ge, ve);
  }, E = (K) => {
    if (!H) {
      K.target === I.current && T.getState().connection.inProgress && (J.current = !0);
      return;
    }
    K.button === 0 && (K.target?.releasePointerCapture?.(K.pointerId), !O && K.target === I.current && T.getState().userSelectionRect && A?.(K), T.setState({
      userSelectionActive: !1,
      userSelectionRect: null
    }), G.current && (m?.(K), T.setState({
      nodesSelectionActive: Q.current.size > 0
    })), ne());
  }, U = (K) => {
    K.target?.releasePointerCapture?.(K.pointerId), ne();
  }, F = r === !0 || Array.isArray(r) && r.includes(0);
  return x.jsxs("div", { className: yt(["react-flow__pane", { draggable: F, dragging: C, selection: t }]), onClick: H ? void 0 : Dd(A, I), onContextMenu: Dd(z, I), onWheel: Dd(q, I), onPointerEnter: H ? void 0 : v, onPointerMove: H ? B : b, onPointerUp: E, onPointerCancel: H ? U : void 0, onPointerDownCapture: H ? te : void 0, onClickCapture: H ? W : void 0, onPointerLeave: S, ref: I, style: Wu, children: [N, x.jsx(PM, {})] });
}
function ah({ id: t, store: i, unselect: o = !1, nodeRef: r }) {
  const { addSelectedNodes: s, unselectNodesAndEdges: u, multiSelectionActive: c, nodeLookup: d, onError: m } = i.getState(), y = d.get(t);
  if (!y) {
    m?.("012", _n.error012(t));
    return;
  }
  i.setState({ nodesSelectionActive: !1 }), y.selected ? (o || y.selected && c) && (u({ nodes: [y], edges: [] }), requestAnimationFrame(() => r?.current?.blur())) : s([t]);
}
function px({ nodeRef: t, disabled: i = !1, noDragClassName: o, handleSelector: r, nodeId: s, isSelectable: u, nodeClickDistance: c }) {
  const d = et(), [m, y] = $.useState(!1), g = $.useRef();
  return $.useEffect(() => {
    if (!i)
      return g.current = UC({
        getStoreItems: () => d.getState(),
        onNodeMouseDown: (p) => {
          ah({
            id: p,
            store: d,
            nodeRef: t
          });
        },
        onDragStart: () => {
          y(!0);
        },
        onDragStop: () => {
          y(!1);
        }
      }), () => {
        g.current?.destroy(), g.current = void 0;
      };
  }, [i, d, t]), $.useEffect(() => {
    i || !t.current || !g.current || g.current.update({
      noDragClassName: o,
      handleSelector: r,
      domNode: t.current,
      isSelectable: u,
      nodeId: s,
      nodeClickDistance: c
    });
  }, [o, r, i, u, t, s, c]), m;
}
const nT = (t) => (i) => i.selected && (i.draggable || t && typeof i.draggable > "u");
function yx() {
  const t = et();
  return $.useCallback((o) => {
    const { nodeExtent: r, snapToGrid: s, snapGrid: u, nodesDraggable: c, onError: d, updateNodePositions: m, nodeLookup: y, nodeOrigin: g } = t.getState(), p = /* @__PURE__ */ new Map(), v = nT(c), b = s ? u[0] : 5, S = s ? u[1] : 5, N = o.direction.x * b * o.factor, M = o.direction.y * S * o.factor;
    for (const [, T] of y) {
      if (!v(T))
        continue;
      let O = {
        x: T.internals.positionAbsolute.x + N,
        y: T.internals.positionAbsolute.y + M
      };
      s && (O = vl(O, u));
      const { position: _, positionAbsolute: C } = zb({
        nodeId: T.id,
        nextPosition: O,
        nodeLookup: y,
        nodeExtent: r,
        nodeOrigin: g,
        onError: d
      });
      T.position = _, T.internals.positionAbsolute = C, p.set(T.id, T);
    }
    m(p);
  }, []);
}
const zh = $.createContext(null), iT = zh.Provider;
zh.Consumer;
const vx = () => $.useContext(zh), aT = (t) => ({
  connectOnClick: t.connectOnClick,
  noPanClassName: t.noPanClassName,
  rfId: t.rfId
}), bx = $.createContext(null);
function oT({ children: t }) {
  const i = Be(aT, at);
  return x.jsx(bx.Provider, { value: i, children: t });
}
function rT() {
  const t = $.useContext(bx);
  if (!t)
    throw new Error("useHandleConfig must be used within a HandleConfigProvider");
  return t;
}
const lT = {
  connectingFrom: !1,
  connectingTo: !1,
  clickConnecting: !1,
  isPossibleEndHandle: !0,
  connectionInProcess: !1,
  clickConnectionInProcess: !1,
  valid: !1
}, sT = (t, i, o) => (r) => {
  const { connectionClickStartHandle: s, connectionMode: u, connection: c } = r, { fromHandle: d, toHandle: m, isValid: y } = c;
  if (!d && !s)
    return lT;
  const g = m?.nodeId === t && m?.id === i && m?.type === o;
  return {
    connectingFrom: d?.nodeId === t && d?.id === i && d?.type === o,
    connectingTo: g,
    clickConnecting: s?.nodeId === t && s?.id === i && s?.type === o,
    isPossibleEndHandle: u === To.Strict ? d?.type !== o : t !== d?.nodeId || i !== d?.id,
    connectionInProcess: !!d,
    clickConnectionInProcess: !!s,
    valid: g && y
  };
};
function uT({ type: t = "source", position: i = we.Top, isValidConnection: o, isConnectable: r = !0, isConnectableStart: s = !0, isConnectableEnd: u = !0, id: c, onConnect: d, children: m, className: y, onMouseDown: g, onTouchStart: p, ...v }, b) {
  const S = c || null, N = t === "target", M = et(), T = vx(), { connectOnClick: O, noPanClassName: _, rfId: C } = rT(), { connectingFrom: k, connectingTo: L, clickConnecting: H, isPossibleEndHandle: I, connectionInProcess: ee, clickConnectionInProcess: Q, valid: X } = Be(sT(T, S, t), at);
  T || M.getState().onError?.("010", _n.error010());
  const J = (Y) => {
    const { defaultEdgeOptions: A, onConnect: z, hasDefaultEdges: q } = M.getState(), W = {
      ...A,
      ...Y
    };
    if (q) {
      const { edges: te, setEdges: D, onError: V } = M.getState();
      D(UM(W, te, { onError: V }));
    }
    z?.(W), d?.(W);
  }, G = (Y) => {
    if (!T)
      return;
    const A = Yb(Y.nativeEvent);
    if (s && (A && Y.button === 0 || !A)) {
      const z = M.getState();
      ih.onPointerDown(Y.nativeEvent, {
        handleDomNode: Y.currentTarget,
        autoPanOnConnect: z.autoPanOnConnect,
        connectionMode: z.connectionMode,
        connectionRadius: z.connectionRadius,
        domNode: z.domNode,
        nodeLookup: z.nodeLookup,
        lib: z.lib,
        isTarget: N,
        handleId: S,
        nodeId: T,
        flowId: z.rfId,
        panBy: z.panBy,
        cancelConnection: z.cancelConnection,
        onConnectStart: z.onConnectStart,
        onConnectEnd: (...q) => M.getState().onConnectEnd?.(...q),
        updateConnection: z.updateConnection,
        onConnect: J,
        isValidConnection: o || ((...q) => M.getState().isValidConnection?.(...q) ?? !0),
        getTransform: () => M.getState().transform,
        getFromHandle: () => M.getState().connection.fromHandle,
        autoPanSpeed: z.autoPanSpeed,
        dragThreshold: z.connectionDragThreshold
      });
    }
    A ? g?.(Y) : p?.(Y);
  }, j = (Y) => {
    const { onClickConnectStart: A, onClickConnectEnd: z, connectionClickStartHandle: q, connectionMode: W, isValidConnection: te, lib: D, rfId: V, nodeLookup: ne, connection: B } = M.getState();
    if (!T || !q && !s)
      return;
    if (!q) {
      A?.(Y.nativeEvent, { nodeId: T, handleId: S, handleType: t }), M.setState({ connectionClickStartHandle: { nodeId: T, type: t, id: S } });
      return;
    }
    const E = Vb(Y.target), U = o || te, { connection: F, isValid: K } = ih.isValid(Y.nativeEvent, {
      handle: {
        nodeId: T,
        id: S,
        type: t
      },
      connectionMode: W,
      fromNodeId: q.nodeId,
      fromHandleId: q.id || null,
      fromType: q.type,
      isValidConnection: U,
      flowId: V,
      doc: E,
      lib: D,
      nodeLookup: ne
    });
    K && F && J(F);
    const Z = structuredClone(B);
    delete Z.inProgress, Z.toPosition = Z.toHandle ? Z.toHandle.position : null, z?.(Y, Z), M.setState({ connectionClickStartHandle: null });
  };
  return x.jsx("div", { "data-handleid": S, "data-nodeid": T, "data-handlepos": i, "data-id": `${C}-${T}-${S}-${t}`, className: yt([
    "react-flow__handle",
    `react-flow__handle-${i}`,
    "nodrag",
    _,
    y,
    {
      source: !N,
      target: N,
      connectable: r,
      connectablestart: s,
      connectableend: u,
      clickconnecting: H,
      connectingfrom: k,
      connectingto: L,
      valid: X,
      /*
       * shows where you can start a connection from
       * and where you can end it while connecting
       */
      connectionindicator: r && (!ee || I) && (ee || Q ? u : s)
    }
  ]), onMouseDown: G, onTouchStart: G, onClick: O ? j : void 0, ref: b, ...v, children: m });
}
const Oo = $.memo(hx(uT));
function cT({ data: t, isConnectable: i, sourcePosition: o = we.Bottom }) {
  return x.jsxs(x.Fragment, { children: [t?.label, x.jsx(Oo, { type: "source", position: o, isConnectable: i })] });
}
function fT({ data: t, isConnectable: i, targetPosition: o = we.Top, sourcePosition: r = we.Bottom }) {
  return x.jsxs(x.Fragment, { children: [x.jsx(Oo, { type: "target", position: o, isConnectable: i }), t?.label, x.jsx(Oo, { type: "source", position: r, isConnectable: i })] });
}
function dT() {
  return null;
}
function hT({ data: t, isConnectable: i, targetPosition: o = we.Top }) {
  return x.jsxs(x.Fragment, { children: [x.jsx(Oo, { type: "target", position: o, isConnectable: i }), t?.label] });
}
const Du = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
}, q0 = {
  input: cT,
  default: fT,
  output: hT,
  group: dT
};
function mT(t) {
  return t.internals.handleBounds === void 0 ? {
    width: t.width ?? t.initialWidth ?? t.style?.width,
    height: t.height ?? t.initialHeight ?? t.style?.height
  } : {
    width: t.width ?? t.style?.width,
    height: t.height ?? t.style?.height
  };
}
const gT = (t) => {
  const { width: i, height: o, x: r, y: s } = yl(t.nodeLookup, {
    filter: (u) => !!u.selected
  });
  return {
    width: Sn(i) ? i : null,
    height: Sn(o) ? o : null,
    userSelectionActive: t.userSelectionActive,
    transformString: `translate(${t.transform[0]}px,${t.transform[1]}px) scale(${t.transform[2]}) translate(${r}px,${s}px)`
  };
};
function pT({ onSelectionContextMenu: t, noPanClassName: i, disableKeyboardA11y: o }) {
  const r = et(), { width: s, height: u, transformString: c, userSelectionActive: d } = Be(gT, at), m = yx(), y = $.useRef(null);
  $.useEffect(() => {
    o || y.current?.focus({
      preventScroll: !0
    });
  }, [o]);
  const g = !d && s !== null && u !== null;
  if (px({
    nodeRef: y,
    disabled: !g
  }), !g)
    return null;
  const p = t ? (b) => {
    const S = r.getState().nodes.filter((N) => N.selected);
    t(b, S);
  } : void 0, v = (b) => {
    Object.prototype.hasOwnProperty.call(Du, b.key) && (b.preventDefault(), m({
      direction: Du[b.key],
      factor: b.shiftKey ? 4 : 1
    }));
  };
  return x.jsx("div", { className: yt(["react-flow__nodesselection", "react-flow__container", i]), style: {
    transform: c
  }, children: x.jsx("div", { ref: y, className: "react-flow__nodesselection-rect", onContextMenu: p, tabIndex: o ? void 0 : -1, onKeyDown: o ? void 0 : v, style: {
    width: s,
    height: u
  } }) });
}
const $0 = typeof window < "u" ? window : void 0, yT = (t) => ({ nodesSelectionActive: t.nodesSelectionActive, userSelectionActive: t.userSelectionActive });
function xx({ children: t, onPaneClick: i, onPaneMouseEnter: o, onPaneMouseMove: r, onPaneMouseLeave: s, onPaneContextMenu: u, onPaneScroll: c, paneClickDistance: d, deleteKeyCode: m, selectionKeyCode: y, selectionOnDrag: g, selectionMode: p, onSelectionStart: v, onSelectionEnd: b, multiSelectionKeyCode: S, panActivationKeyCode: N, zoomActivationKeyCode: M, elementsSelectable: T, zoomOnScroll: O, zoomOnPinch: _, panOnScroll: C, panOnScrollSpeed: k, panOnScrollMode: L, zoomOnDoubleClick: H, panOnDrag: I, autoPanOnSelection: ee, defaultViewport: Q, translateExtent: X, minZoom: J, maxZoom: G, preventScrolling: j, onSelectionContextMenu: Y, noWheelClassName: A, noPanClassName: z, disableKeyboardA11y: q, onViewportChange: W, isControlledViewport: te }) {
  const { nodesSelectionActive: D, userSelectionActive: V } = Be(yT, at), ne = ul(y, { target: $0 }), B = ul(N, { target: $0 }), E = B || I, U = B || C, F = g && E !== !0, K = ne || V || F;
  return KM({ deleteKeyCode: m, multiSelectionKeyCode: S }), x.jsx(WM, { onPaneContextMenu: u, elementsSelectable: T, zoomOnScroll: O, zoomOnPinch: _, panOnScroll: U, panOnScrollSpeed: k, panOnScrollMode: L, zoomOnDoubleClick: H, panOnDrag: !ne && E, defaultViewport: Q, translateExtent: X, minZoom: J, maxZoom: G, zoomActivationKeyCode: M, preventScrolling: j, noWheelClassName: A, noPanClassName: z, onViewportChange: W, isControlledViewport: te, paneClickDistance: d, selectionOnDrag: F, children: x.jsxs(tT, { onSelectionStart: v, onSelectionEnd: b, onPaneClick: i, onPaneMouseEnter: o, onPaneMouseMove: r, onPaneMouseLeave: s, onPaneContextMenu: u, onPaneScroll: c, panOnDrag: E, autoPanOnSelection: ee, isSelecting: !!K, selectionMode: p, selectionKeyPressed: ne, paneClickDistance: d, selectionOnDrag: F, children: [t, D && x.jsx(pT, { onSelectionContextMenu: Y, noPanClassName: z, disableKeyboardA11y: q })] }) });
}
xx.displayName = "FlowRenderer";
const vT = $.memo(xx), bT = (t) => (i) => t ? Eh(i.nodeLookup, { x: 0, y: 0, width: i.width, height: i.height }, i.transform, !0).map((o) => o.id) : Array.from(i.nodeLookup.keys());
function xT(t) {
  return Be($.useCallback(bT(t), [t]), at);
}
const ST = (t) => t.updateNodeInternals;
function wT() {
  const t = Be(ST), [i] = $.useState(() => typeof ResizeObserver > "u" ? null : new ResizeObserver((o) => {
    const r = /* @__PURE__ */ new Map();
    o.forEach((s) => {
      const u = s.target.getAttribute("data-id");
      r.set(u, {
        id: u,
        nodeElement: s.target,
        force: !0
      });
    }), t(r);
  }));
  return $.useEffect(() => () => {
    i?.disconnect();
  }, [i]), i;
}
function ET({ node: t, nodeType: i, hasDimensions: o, resizeObserver: r }) {
  const s = et(), u = $.useRef(null), c = $.useRef(null), d = $.useRef(t.sourcePosition), m = $.useRef(t.targetPosition), y = $.useRef(i), g = o && !!t.internals.handleBounds;
  return $.useEffect(() => {
    u.current && !t.hidden && (!g || c.current !== u.current) && (c.current && r?.unobserve(c.current), r?.observe(u.current), c.current = u.current);
  }, [g, t.hidden]), $.useEffect(() => () => {
    c.current && (r?.unobserve(c.current), c.current = null);
  }, []), $.useEffect(() => {
    if (u.current) {
      const p = y.current !== i, v = d.current !== t.sourcePosition, b = m.current !== t.targetPosition;
      (p || v || b) && (y.current = i, d.current = t.sourcePosition, m.current = t.targetPosition, s.getState().updateNodeInternals(/* @__PURE__ */ new Map([[t.id, { id: t.id, nodeElement: u.current, force: !0 }]])));
    }
  }, [t.id, i, t.sourcePosition, t.targetPosition]), u;
}
function _T({ id: t, onClick: i, onMouseEnter: o, onMouseMove: r, onMouseLeave: s, onContextMenu: u, onDoubleClick: c, nodesDraggable: d, elementsSelectable: m, nodesConnectable: y, nodesFocusable: g, resizeObserver: p, noDragClassName: v, noPanClassName: b, disableKeyboardA11y: S, rfId: N, nodeTypes: M, nodeClickDistance: T, onError: O }) {
  const { node: _, internals: C, isParent: k } = Be((K) => {
    const Z = K.nodeLookup.get(t), se = K.parentLookup.has(t);
    return {
      node: Z,
      internals: Z.internals,
      isParent: se
    };
  }, at);
  let L = _.type || "default", H = M?.[L] || q0[L];
  H === void 0 && (O?.("003", _n.error003(L)), L = "default", H = M?.default || q0.default);
  const I = !!(_.draggable || d && typeof _.draggable > "u"), ee = !!(_.selectable || m && typeof _.selectable > "u"), Q = !!(_.connectable || y && typeof _.connectable > "u"), X = !!(_.focusable || g && typeof _.focusable > "u"), J = et(), G = Bb(_), j = ET({ node: _, nodeType: L, hasDimensions: G, resizeObserver: p }), Y = px({
    nodeRef: j,
    disabled: _.hidden || !I,
    noDragClassName: v,
    handleSelector: _.dragHandle,
    nodeId: t,
    isSelectable: ee,
    nodeClickDistance: T
  }), A = yx();
  if (_.hidden)
    return null;
  const z = Bn(_), q = mT(_), W = ee || I || i || o || r || s, te = o ? (K) => o(K, { ...C.userNode }) : void 0, D = r ? (K) => r(K, { ...C.userNode }) : void 0, V = s ? (K) => s(K, { ...C.userNode }) : void 0, ne = u ? (K) => u(K, { ...C.userNode }) : void 0, B = c ? (K) => c(K, { ...C.userNode }) : void 0, E = (K) => {
    const { selectNodesOnDrag: Z, nodeDragThreshold: se } = J.getState();
    ee && (!Z || !I || se > 0) && ah({
      id: t,
      store: J,
      nodeRef: j
    }), i && i(K, { ...C.userNode });
  }, U = (K) => {
    if (!(Ub(K.nativeEvent) || S)) {
      if (Tb.includes(K.key) && ee) {
        const Z = K.key === "Escape";
        ah({
          id: t,
          store: J,
          unselect: Z,
          nodeRef: j
        });
      } else if (I && _.selected && Object.prototype.hasOwnProperty.call(Du, K.key)) {
        K.preventDefault();
        const { ariaLabelConfig: Z } = J.getState();
        J.setState({
          ariaLiveMessage: Z["node.a11yDescription.ariaLiveMessage"]({
            direction: K.key.replace("Arrow", "").toLowerCase(),
            x: ~~C.positionAbsolute.x,
            y: ~~C.positionAbsolute.y
          })
        }), A({
          direction: Du[K.key],
          factor: K.shiftKey ? 4 : 1
        });
      }
    }
  }, F = () => {
    if (S || !j.current?.matches(":focus-visible"))
      return;
    const { transform: K, width: Z, height: se, autoPanOnNodeFocus: he, setCenter: ge } = J.getState();
    if (!he)
      return;
    Eh(/* @__PURE__ */ new Map([[t, _]]), { x: 0, y: 0, width: Z, height: se }, K, !0).length > 0 || ge(_.position.x + z.width / 2, _.position.y + z.height / 2, {
      zoom: K[2]
    });
  };
  return x.jsx("div", { className: yt([
    "react-flow__node",
    `react-flow__node-${L}`,
    {
      // this is overwritable by passing `nopan` as a class name
      [b]: I
    },
    _.className,
    {
      selected: _.selected,
      selectable: ee,
      parent: k,
      draggable: I,
      dragging: Y
    }
  ]), ref: j, style: {
    zIndex: C.z,
    transform: `translate(${C.positionAbsolute.x}px,${C.positionAbsolute.y}px)`,
    pointerEvents: W ? "all" : "none",
    visibility: G ? "visible" : "hidden",
    ..._.style,
    ...q
  }, "data-id": t, "data-testid": `rf__node-${t}`, onMouseEnter: te, onMouseMove: D, onMouseLeave: V, onContextMenu: ne, onClick: E, onDoubleClick: B, onKeyDown: X ? U : void 0, tabIndex: X ? 0 : void 0, onFocus: X ? F : void 0, role: _.ariaRole ?? (X ? "group" : void 0), "aria-roledescription": "node", "aria-describedby": S ? void 0 : `${lx}-${N}`, "aria-label": _.ariaLabel, ..._.domAttributes, children: x.jsx(iT, { value: t, children: x.jsx(H, { id: t, data: _.data, type: L, positionAbsoluteX: C.positionAbsolute.x, positionAbsoluteY: C.positionAbsolute.y, selected: _.selected ?? !1, selectable: ee, draggable: I, deletable: _.deletable ?? !0, isConnectable: Q, sourcePosition: _.sourcePosition, targetPosition: _.targetPosition, dragging: Y, dragHandle: _.dragHandle, zIndex: C.z, parentId: _.parentId, ...z }) }) });
}
var NT = $.memo(_T);
const CT = (t) => ({
  nodesConnectable: t.nodesConnectable,
  nodesFocusable: t.nodesFocusable,
  elementsSelectable: t.elementsSelectable,
  onError: t.onError
});
function Sx(t) {
  const { nodesConnectable: i, nodesFocusable: o, elementsSelectable: r, onError: s } = Be(CT, at), u = xT(t.onlyRenderVisibleElements), c = wT();
  return x.jsx("div", { className: "react-flow__nodes", style: Wu, children: u.map((d) => (
    /*
     * The split of responsibilities between NodeRenderer and
     * NodeComponentWrapper may appear weird. However, it’s designed to
     * minimize the cost of updates when individual nodes change.
     *
     * For example, when you’re dragging a single node, that node gets
     * updated multiple times per second. If `NodeRenderer` were to update
     * every time, it would have to re-run the `nodes.map()` loop every
     * time. This gets pricey with hundreds of nodes, especially if every
     * loop cycle does more than just rendering a JSX element!
     *
     * As a result of this choice, we took the following implementation
     * decisions:
     * - NodeRenderer subscribes *only* to node IDs – and therefore
     *   rerender *only* when visible nodes are added or removed.
     * - NodeRenderer performs all operations the result of which can be
     *   shared between nodes (such as creating the `ResizeObserver`
     *   instance, or subscribing to `selector`). This means extra prop
     *   drilling into `NodeComponentWrapper`, but it means we need to run
     *   these operations only once – instead of once per node.
     * - Any operations that you’d normally write inside `nodes.map` are
     *   moved into `NodeComponentWrapper`. This ensures they are
     *   memorized – so if `NodeRenderer` *has* to rerender, it only
     *   needs to regenerate the list of nodes, nothing else.
     */
    x.jsx(NT, { id: d, nodeTypes: t.nodeTypes, nodeExtent: t.nodeExtent, onClick: t.onNodeClick, onMouseEnter: t.onNodeMouseEnter, onMouseMove: t.onNodeMouseMove, onMouseLeave: t.onNodeMouseLeave, onContextMenu: t.onNodeContextMenu, onDoubleClick: t.onNodeDoubleClick, noDragClassName: t.noDragClassName, noPanClassName: t.noPanClassName, rfId: t.rfId, disableKeyboardA11y: t.disableKeyboardA11y, resizeObserver: c, nodesDraggable: t.nodesDraggable ?? !0, nodesConnectable: i, nodesFocusable: o, elementsSelectable: r, nodeClickDistance: t.nodeClickDistance, onError: s }, d)
  )) });
}
Sx.displayName = "NodeRenderer";
const MT = $.memo(Sx);
function TT(t) {
  return Be($.useCallback((o) => {
    if (!t)
      return o.edges.map((s) => s.id);
    const r = [];
    if (o.width && o.height)
      for (const s of o.edges) {
        const u = o.nodeLookup.get(s.source), c = o.nodeLookup.get(s.target);
        u && c && wC({
          sourceNode: u,
          targetNode: c,
          width: o.width,
          height: o.height,
          transform: o.transform
        }) && r.push(s.id);
      }
    return r;
  }, [t]), at);
}
const AT = ({ color: t = "none", strokeWidth: i = 1 }) => {
  const o = {
    strokeWidth: i,
    ...t && { stroke: t }
  };
  return x.jsx("polyline", { className: "arrow", style: o, strokeLinecap: "round", fill: "none", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4" });
}, jT = ({ color: t = "none", strokeWidth: i = 1 }) => {
  const o = {
    strokeWidth: i,
    ...t && { stroke: t, fill: t }
  };
  return x.jsx("polyline", { className: "arrowclosed", style: o, strokeLinecap: "round", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4 -5,-4" });
}, X0 = {
  [Tu.Arrow]: AT,
  [Tu.ArrowClosed]: jT
};
function DT(t) {
  const i = et();
  return $.useMemo(() => Object.prototype.hasOwnProperty.call(X0, t) ? X0[t] : (i.getState().onError?.("009", _n.error009(t)), null), [t]);
}
const OT = ({ id: t, type: i, color: o, width: r = 12.5, height: s = 12.5, markerUnits: u = "strokeWidth", strokeWidth: c, orient: d = "auto-start-reverse" }) => {
  const m = DT(i);
  return m ? x.jsx("marker", { className: "react-flow__arrowhead", id: t, markerWidth: `${r}`, markerHeight: `${s}`, viewBox: "-10 -10 20 20", markerUnits: u, orient: d, refX: "0", refY: "0", children: x.jsx(m, { color: o, strokeWidth: c }) }) : null;
}, wx = ({ defaultColor: t, rfId: i }) => {
  const o = Be((u) => u.edges), r = Be((u) => u.defaultEdgeOptions), s = $.useMemo(() => jC(o, {
    id: i,
    defaultColor: t,
    defaultMarkerStart: r?.markerStart,
    defaultMarkerEnd: r?.markerEnd
  }), [o, r, i, t]);
  return s.length ? x.jsx("svg", { className: "react-flow__marker", "aria-hidden": "true", children: x.jsx("defs", { children: s.map((u) => x.jsx(OT, { id: u.id, type: u.type, color: u.color, width: u.width, height: u.height, markerUnits: u.markerUnits, strokeWidth: u.strokeWidth, orient: u.orient }, u.id)) }) }) : null;
};
wx.displayName = "MarkerDefinitions";
var zT = $.memo(wx);
function Ex({ x: t, y: i, label: o, labelStyle: r, labelShowBg: s = !0, labelBgStyle: u, labelBgPadding: c = [2, 4], labelBgBorderRadius: d = 2, children: m, className: y, ...g }) {
  const [p, v] = $.useState({ x: 1, y: 0, width: 0, height: 0 }), b = yt(["react-flow__edge-textwrapper", y]), S = $.useRef(null);
  return $.useEffect(() => {
    if (S.current) {
      const N = S.current.getBBox();
      v({
        x: N.x,
        y: N.y,
        width: N.width,
        height: N.height
      });
    }
  }, [o]), o ? x.jsxs("g", { transform: `translate(${t - p.width / 2} ${i - p.height / 2})`, className: b, visibility: p.width ? "visible" : "hidden", ...g, children: [s && x.jsx("rect", { width: p.width + 2 * c[0], x: -c[0], y: -c[1], height: p.height + 2 * c[1], className: "react-flow__edge-textbg", style: u, rx: d, ry: d }), x.jsx("text", { className: "react-flow__edge-text", y: p.height / 2, dy: "0.3em", ref: S, style: r, children: o }), m] }) : null;
}
Ex.displayName = "EdgeText";
const RT = $.memo(Ex);
function xl({ path: t, labelX: i, labelY: o, label: r, labelStyle: s, labelShowBg: u, labelBgStyle: c, labelBgPadding: d, labelBgBorderRadius: m, interactionWidth: y = 20, ...g }) {
  return x.jsxs(x.Fragment, { children: [x.jsx("path", { ...g, d: t, fill: "none", className: yt(["react-flow__edge-path", g.className]) }), y ? x.jsx("path", { d: t, fill: "none", strokeOpacity: 0, strokeWidth: y, className: "react-flow__edge-interaction" }) : null, r && Sn(i) && Sn(o) ? x.jsx(RT, { x: i, y: o, label: r, labelStyle: s, labelShowBg: u, labelBgStyle: c, labelBgPadding: d, labelBgBorderRadius: m }) : null] });
}
function G0({ pos: t, x1: i, y1: o, x2: r, y2: s }) {
  return t === we.Left || t === we.Right ? [0.5 * (i + r), o] : [i, 0.5 * (o + s)];
}
function _x({ sourceX: t, sourceY: i, sourcePosition: o = we.Bottom, targetX: r, targetY: s, targetPosition: u = we.Top }) {
  const [c, d] = G0({
    pos: o,
    x1: t,
    y1: i,
    x2: r,
    y2: s
  }), [m, y] = G0({
    pos: u,
    x1: r,
    y1: s,
    x2: t,
    y2: i
  }), [g, p, v, b] = qb({
    sourceX: t,
    sourceY: i,
    targetX: r,
    targetY: s,
    sourceControlX: c,
    sourceControlY: d,
    targetControlX: m,
    targetControlY: y
  });
  return [
    `M${t},${i} C${c},${d} ${m},${y} ${r},${s}`,
    g,
    p,
    v,
    b
  ];
}
function Nx(t) {
  return $.memo(({ id: i, sourceX: o, sourceY: r, targetX: s, targetY: u, sourcePosition: c, targetPosition: d, label: m, labelStyle: y, labelShowBg: g, labelBgStyle: p, labelBgPadding: v, labelBgBorderRadius: b, style: S, markerEnd: N, markerStart: M, interactionWidth: T }) => {
    const [O, _, C] = _x({
      sourceX: o,
      sourceY: r,
      sourcePosition: c,
      targetX: s,
      targetY: u,
      targetPosition: d
    }), k = t.isInternal ? void 0 : i;
    return x.jsx(xl, { id: k, path: O, labelX: _, labelY: C, label: m, labelStyle: y, labelShowBg: g, labelBgStyle: p, labelBgPadding: v, labelBgBorderRadius: b, style: S, markerEnd: N, markerStart: M, interactionWidth: T });
  });
}
const kT = Nx({ isInternal: !1 }), Cx = Nx({ isInternal: !0 });
kT.displayName = "SimpleBezierEdge";
Cx.displayName = "SimpleBezierEdgeInternal";
function Mx(t) {
  return $.memo(({ id: i, sourceX: o, sourceY: r, targetX: s, targetY: u, label: c, labelStyle: d, labelShowBg: m, labelBgStyle: y, labelBgPadding: g, labelBgBorderRadius: p, style: v, sourcePosition: b = we.Bottom, targetPosition: S = we.Top, markerEnd: N, markerStart: M, pathOptions: T, interactionWidth: O }) => {
    const [_, C, k] = eh({
      sourceX: o,
      sourceY: r,
      sourcePosition: b,
      targetX: s,
      targetY: u,
      targetPosition: S,
      borderRadius: T?.borderRadius,
      offset: T?.offset,
      stepPosition: T?.stepPosition
    }), L = t.isInternal ? void 0 : i;
    return x.jsx(xl, { id: L, path: _, labelX: C, labelY: k, label: c, labelStyle: d, labelShowBg: m, labelBgStyle: y, labelBgPadding: g, labelBgBorderRadius: p, style: v, markerEnd: N, markerStart: M, interactionWidth: O });
  });
}
const Tx = Mx({ isInternal: !1 }), Ax = Mx({ isInternal: !0 });
Tx.displayName = "SmoothStepEdge";
Ax.displayName = "SmoothStepEdgeInternal";
function jx(t) {
  return $.memo(({ id: i, ...o }) => {
    const r = t.isInternal ? void 0 : i;
    return x.jsx(Tx, { ...o, id: r, pathOptions: $.useMemo(() => ({ borderRadius: 0, offset: o.pathOptions?.offset }), [o.pathOptions?.offset]) });
  });
}
const HT = jx({ isInternal: !1 }), Dx = jx({ isInternal: !0 });
HT.displayName = "StepEdge";
Dx.displayName = "StepEdgeInternal";
function Ox(t) {
  return $.memo(({ id: i, sourceX: o, sourceY: r, targetX: s, targetY: u, label: c, labelStyle: d, labelShowBg: m, labelBgStyle: y, labelBgPadding: g, labelBgBorderRadius: p, style: v, markerEnd: b, markerStart: S, interactionWidth: N }) => {
    const [M, T, O] = Xb({ sourceX: o, sourceY: r, targetX: s, targetY: u }), _ = t.isInternal ? void 0 : i;
    return x.jsx(xl, { id: _, path: M, labelX: T, labelY: O, label: c, labelStyle: d, labelShowBg: m, labelBgStyle: y, labelBgPadding: g, labelBgBorderRadius: p, style: v, markerEnd: b, markerStart: S, interactionWidth: N });
  });
}
const LT = Ox({ isInternal: !1 }), zx = Ox({ isInternal: !0 });
LT.displayName = "StraightEdge";
zx.displayName = "StraightEdgeInternal";
function Rx(t) {
  return $.memo(({ id: i, sourceX: o, sourceY: r, targetX: s, targetY: u, sourcePosition: c = we.Bottom, targetPosition: d = we.Top, label: m, labelStyle: y, labelShowBg: g, labelBgStyle: p, labelBgPadding: v, labelBgBorderRadius: b, style: S, markerEnd: N, markerStart: M, pathOptions: T, interactionWidth: O }) => {
    const [_, C, k] = Mh({
      sourceX: o,
      sourceY: r,
      sourcePosition: c,
      targetX: s,
      targetY: u,
      targetPosition: d,
      curvature: T?.curvature
    }), L = t.isInternal ? void 0 : i;
    return x.jsx(xl, { id: L, path: _, labelX: C, labelY: k, label: m, labelStyle: y, labelShowBg: g, labelBgStyle: p, labelBgPadding: v, labelBgBorderRadius: b, style: S, markerEnd: N, markerStart: M, interactionWidth: O });
  });
}
const BT = Rx({ isInternal: !1 }), kx = Rx({ isInternal: !0 });
BT.displayName = "BezierEdge";
kx.displayName = "BezierEdgeInternal";
const Z0 = {
  default: kx,
  straight: zx,
  step: Dx,
  smoothstep: Ax,
  simplebezier: Cx
}, K0 = {
  sourceX: null,
  sourceY: null,
  targetX: null,
  targetY: null,
  sourcePosition: null,
  targetPosition: null,
  zIndex: void 0
}, IT = (t, i, o) => o === we.Left ? t - i : o === we.Right ? t + i : t, VT = (t, i, o) => o === we.Top ? t - i : o === we.Bottom ? t + i : t, Q0 = "react-flow__edgeupdater";
function F0({ position: t, centerX: i, centerY: o, radius: r = 10, onMouseDown: s, onMouseEnter: u, onMouseOut: c, type: d }) {
  return x.jsx("circle", { onMouseDown: s, onMouseEnter: u, onMouseOut: c, className: yt([Q0, `${Q0}-${d}`]), cx: IT(i, r, t), cy: VT(o, r, t), r, stroke: "transparent", fill: "transparent" });
}
function UT({ isReconnectable: t, reconnectRadius: i, edge: o, sourceX: r, sourceY: s, targetX: u, targetY: c, sourcePosition: d, targetPosition: m, onReconnect: y, onReconnectStart: g, onReconnectEnd: p, setReconnecting: v, setUpdateHover: b }) {
  const S = et(), N = (C, k) => {
    if (C.button !== 0)
      return;
    const { autoPanOnConnect: L, domNode: H, connectionMode: I, connectionRadius: ee, lib: Q, onConnectStart: X, cancelConnection: J, nodeLookup: G, rfId: j, panBy: Y, updateConnection: A } = S.getState(), z = k.type === "target", q = (D, V) => {
      v(!1), p?.(D, o, k.type, V);
    }, W = (D) => y?.(o, D), te = (D, V) => {
      v(!0), g?.(C, o, k.type), X?.(D, V);
    };
    ih.onPointerDown(C.nativeEvent, {
      autoPanOnConnect: L,
      connectionMode: I,
      connectionRadius: ee,
      domNode: H,
      handleId: k.id,
      nodeId: k.nodeId,
      nodeLookup: G,
      isTarget: z,
      edgeUpdaterType: k.type,
      lib: Q,
      flowId: j,
      cancelConnection: J,
      panBy: Y,
      isValidConnection: (...D) => S.getState().isValidConnection?.(...D) ?? !0,
      onConnect: W,
      onConnectStart: te,
      onConnectEnd: (...D) => S.getState().onConnectEnd?.(...D),
      onReconnectEnd: q,
      updateConnection: A,
      getTransform: () => S.getState().transform,
      getFromHandle: () => S.getState().connection.fromHandle,
      dragThreshold: S.getState().connectionDragThreshold,
      handleDomNode: C.currentTarget
    });
  }, M = (C) => N(C, { nodeId: o.target, id: o.targetHandle ?? null, type: "target" }), T = (C) => N(C, { nodeId: o.source, id: o.sourceHandle ?? null, type: "source" }), O = () => b(!0), _ = () => b(!1);
  return x.jsxs(x.Fragment, { children: [(t === !0 || t === "source") && x.jsx(F0, { position: d, centerX: r, centerY: s, radius: i, onMouseDown: M, onMouseEnter: O, onMouseOut: _, type: "source" }), (t === !0 || t === "target") && x.jsx(F0, { position: m, centerX: u, centerY: c, radius: i, onMouseDown: T, onMouseEnter: O, onMouseOut: _, type: "target" })] });
}
function YT({ id: t, edgesFocusable: i, edgesReconnectable: o, elementsSelectable: r, onClick: s, onDoubleClick: u, onContextMenu: c, onMouseEnter: d, onMouseMove: m, onMouseLeave: y, reconnectRadius: g, onReconnect: p, onReconnectStart: v, onReconnectEnd: b, rfId: S, edgeTypes: N, noPanClassName: M, onError: T, disableKeyboardA11y: O }) {
  let _ = Be((ge) => ge.edgeLookup.get(t));
  const C = Be((ge) => ge.defaultEdgeOptions);
  _ = C ? { ...C, ..._ } : _;
  let k = _.type || "default", L = N?.[k] || Z0[k];
  L === void 0 && (T?.("011", _n.error011(k)), k = "default", L = N?.default || Z0.default);
  const H = !!(_.focusable || i && typeof _.focusable > "u"), I = typeof p < "u" && (_.reconnectable || o && typeof _.reconnectable > "u"), ee = !!(_.selectable || r && typeof _.selectable > "u"), Q = $.useRef(null), [X, J] = $.useState(!1), [G, j] = $.useState(!1), Y = et(), { zIndex: A = _.zIndex, sourceX: z, sourceY: q, targetX: W, targetY: te, sourcePosition: D, targetPosition: V } = Be($.useCallback((ge) => {
    const ve = ge.nodeLookup.get(_.source), xe = ge.nodeLookup.get(_.target);
    if (!ve || !xe)
      return K0;
    const _e = AC({
      id: t,
      sourceNode: ve,
      targetNode: xe,
      sourceHandle: _.sourceHandle || null,
      targetHandle: _.targetHandle || null,
      connectionMode: ge.connectionMode,
      onError: T
    }), De = SC({
      selected: _.selected,
      zIndex: _.zIndex,
      sourceNode: ve,
      targetNode: xe,
      elevateOnSelect: ge.elevateEdgesOnSelect,
      zIndexMode: ge.zIndexMode
    });
    return {
      ..._e || K0,
      zIndex: De
    };
  }, [_.source, _.target, _.sourceHandle, _.targetHandle, _.selected, _.zIndex]), at), ne = $.useMemo(() => _.markerStart ? `url('#${th(_.markerStart, S)}')` : void 0, [_.markerStart, S]), B = $.useMemo(() => _.markerEnd ? `url('#${th(_.markerEnd, S)}')` : void 0, [_.markerEnd, S]);
  if (_.hidden || z === null || q === null || W === null || te === null)
    return null;
  const E = (ge) => {
    const { addSelectedEdges: ve, unselectNodesAndEdges: xe, multiSelectionActive: _e } = Y.getState();
    ee && (Y.setState({ nodesSelectionActive: !1 }), _.selected && _e ? (xe({ nodes: [], edges: [_] }), Q.current?.blur()) : ve([t])), s && s(ge, _);
  }, U = u ? (ge) => {
    u(ge, { ..._ });
  } : void 0, F = c ? (ge) => {
    c(ge, { ..._ });
  } : void 0, K = d ? (ge) => {
    d(ge, { ..._ });
  } : void 0, Z = m ? (ge) => {
    m(ge, { ..._ });
  } : void 0, se = y ? (ge) => {
    y(ge, { ..._ });
  } : void 0, he = (ge) => {
    if (!O && Tb.includes(ge.key) && ee) {
      const { unselectNodesAndEdges: ve, addSelectedEdges: xe } = Y.getState();
      ge.key === "Escape" ? (Q.current?.blur(), ve({ edges: [_] })) : xe([t]);
    }
  };
  return x.jsx("svg", { style: { zIndex: A }, children: x.jsxs("g", { className: yt([
    "react-flow__edge",
    `react-flow__edge-${k}`,
    _.className,
    M,
    {
      selected: _.selected,
      animated: _.animated,
      inactive: !ee && !s,
      updating: X,
      selectable: ee
    }
  ]), onClick: E, onDoubleClick: U, onContextMenu: F, onMouseEnter: K, onMouseMove: Z, onMouseLeave: se, onKeyDown: H ? he : void 0, tabIndex: H ? 0 : void 0, role: _.ariaRole ?? (H ? "group" : "img"), "aria-roledescription": "edge", "data-id": t, "data-testid": `rf__edge-${t}`, "aria-label": _.ariaLabel === null ? void 0 : _.ariaLabel || `Edge from ${_.source} to ${_.target}`, "aria-describedby": H ? `${sx}-${S}` : void 0, ref: Q, ..._.domAttributes, children: [!G && x.jsx(L, { id: t, source: _.source, target: _.target, type: _.type, selected: _.selected, animated: _.animated, selectable: ee, deletable: _.deletable ?? !0, label: _.label, labelStyle: _.labelStyle, labelShowBg: _.labelShowBg, labelBgStyle: _.labelBgStyle, labelBgPadding: _.labelBgPadding, labelBgBorderRadius: _.labelBgBorderRadius, sourceX: z, sourceY: q, targetX: W, targetY: te, sourcePosition: D, targetPosition: V, data: _.data, style: _.style, sourceHandleId: _.sourceHandle, targetHandleId: _.targetHandle, markerStart: ne, markerEnd: B, pathOptions: "pathOptions" in _ ? _.pathOptions : void 0, interactionWidth: _.interactionWidth }), I && x.jsx(UT, { edge: _, isReconnectable: I, reconnectRadius: g, onReconnect: p, onReconnectStart: v, onReconnectEnd: b, sourceX: z, sourceY: q, targetX: W, targetY: te, sourcePosition: D, targetPosition: V, setUpdateHover: J, setReconnecting: j })] }) });
}
var qT = $.memo(YT);
const $T = (t) => ({
  edgesFocusable: t.edgesFocusable,
  edgesReconnectable: t.edgesReconnectable,
  elementsSelectable: t.elementsSelectable,
  connectionMode: t.connectionMode,
  onError: t.onError
});
function Hx({ defaultMarkerColor: t, onlyRenderVisibleElements: i, rfId: o, edgeTypes: r, noPanClassName: s, onReconnect: u, onEdgeContextMenu: c, onEdgeMouseEnter: d, onEdgeMouseMove: m, onEdgeMouseLeave: y, onEdgeClick: g, reconnectRadius: p, onEdgeDoubleClick: v, onReconnectStart: b, onReconnectEnd: S, disableKeyboardA11y: N }) {
  const { edgesFocusable: M, edgesReconnectable: T, elementsSelectable: O, onError: _ } = Be($T, at), C = TT(i);
  return x.jsxs("div", { className: "react-flow__edges", children: [x.jsx(zT, { defaultColor: t, rfId: o }), C.map((k) => x.jsx(qT, { id: k, edgesFocusable: M, edgesReconnectable: T, elementsSelectable: O, noPanClassName: s, onReconnect: u, onContextMenu: c, onMouseEnter: d, onMouseMove: m, onMouseLeave: y, onClick: g, reconnectRadius: p, onDoubleClick: v, onReconnectStart: b, onReconnectEnd: S, rfId: o, onError: _, edgeTypes: r, disableKeyboardA11y: N }, k))] });
}
Hx.displayName = "EdgeRenderer";
const XT = $.memo(Hx), W0 = (t) => `translate(${t[0]}px,${t[1]}px) scale(${t[2]})`;
function GT({ children: t }) {
  const i = et(), o = $.useRef(null), [r] = $.useState(() => i.getState().transform);
  return mx(() => {
    let s = null;
    const u = () => {
      const c = i.getState().transform;
      s && c[0] === s[0] && c[1] === s[1] && c[2] === s[2] || (s = c, o.current && (o.current.style.transform = W0(c)));
    };
    return u(), i.subscribe(u);
  }, [i]), x.jsx("div", { ref: o, className: "react-flow__viewport xyflow__viewport react-flow__container", style: { transform: W0(r) }, children: t });
}
function ZT(t) {
  const i = Fu(), o = $.useRef(!1);
  $.useEffect(() => {
    !o.current && i.viewportInitialized && t && (setTimeout(() => t(i), 1), o.current = !0);
  }, [t, i.viewportInitialized]);
}
const KT = (t) => t.panZoom?.syncViewport;
function QT(t) {
  const i = Be(KT), o = et();
  return $.useEffect(() => {
    t && (i?.(t), o.setState({ transform: [t.x, t.y, t.zoom] }));
  }, [t, i]), null;
}
function FT(t) {
  return t.connection.inProgress ? { ...t.connection, to: bl(t.connection.to, t.transform) } : { ...t.connection };
}
function WT(t) {
  return FT;
}
function JT(t) {
  const i = WT();
  return Be(i, at);
}
const PT = (t) => ({
  nodesConnectable: t.nodesConnectable,
  isValid: t.connection.isValid,
  inProgress: t.connection.inProgress,
  width: t.width,
  height: t.height
});
function eA({ containerStyle: t, style: i, type: o, component: r }) {
  const { nodesConnectable: s, width: u, height: c, isValid: d, inProgress: m } = Be(PT, at);
  return !(u && s && m) ? null : x.jsx("svg", { style: t, width: u, height: c, className: "react-flow__connectionline react-flow__container", children: x.jsx("g", { className: yt(["react-flow__connection", Db(d)]), children: x.jsx(Lx, { style: i, type: o, CustomComponent: r, isValid: d }) }) });
}
const Lx = ({ style: t, type: i = qi.Bezier, CustomComponent: o, isValid: r }) => {
  const { inProgress: s, from: u, fromNode: c, fromHandle: d, fromPosition: m, to: y, toNode: g, toHandle: p, toPosition: v, pointer: b } = JT();
  if (!s)
    return;
  if (o)
    return x.jsx(o, { connectionLineType: i, connectionLineStyle: t, fromNode: c, fromHandle: d, fromX: u.x, fromY: u.y, toX: y.x, toY: y.y, fromPosition: m, toPosition: v, connectionStatus: Db(r), toNode: g, toHandle: p, pointer: b });
  let S = "";
  const N = {
    sourceX: u.x,
    sourceY: u.y,
    sourcePosition: m,
    targetX: y.x,
    targetY: y.y,
    targetPosition: v
  };
  switch (i) {
    case qi.Bezier:
      [S] = Mh(N);
      break;
    case qi.SimpleBezier:
      [S] = _x(N);
      break;
    case qi.Step:
      [S] = eh({
        ...N,
        borderRadius: 0
      });
      break;
    case qi.SmoothStep:
      [S] = eh(N);
      break;
    default:
      [S] = Xb(N);
  }
  return x.jsx("path", { d: S, fill: "none", className: "react-flow__connection-path", style: t });
};
Lx.displayName = "ConnectionLine";
const tA = {};
function J0(t = tA) {
  $.useRef(t), et(), $.useEffect(() => {
  }, [t]);
}
function nA() {
  et(), $.useRef(!1), $.useEffect(() => {
  }, []);
}
function Bx({ nodeTypes: t, edgeTypes: i, onInit: o, onNodeClick: r, onEdgeClick: s, onNodeDoubleClick: u, onEdgeDoubleClick: c, onNodeMouseEnter: d, onNodeMouseMove: m, onNodeMouseLeave: y, onNodeContextMenu: g, onSelectionContextMenu: p, onSelectionStart: v, onSelectionEnd: b, connectionLineType: S, connectionLineStyle: N, connectionLineComponent: M, connectionLineContainerStyle: T, selectionKeyCode: O, selectionOnDrag: _, selectionMode: C, multiSelectionKeyCode: k, panActivationKeyCode: L, zoomActivationKeyCode: H, deleteKeyCode: I, onlyRenderVisibleElements: ee, elementsSelectable: Q, defaultViewport: X, translateExtent: J, minZoom: G, maxZoom: j, preventScrolling: Y, defaultMarkerColor: A, zoomOnScroll: z, zoomOnPinch: q, panOnScroll: W, panOnScrollSpeed: te, panOnScrollMode: D, zoomOnDoubleClick: V, panOnDrag: ne, autoPanOnSelection: B, onPaneClick: E, onPaneMouseEnter: U, onPaneMouseMove: F, onPaneMouseLeave: K, onPaneScroll: Z, onPaneContextMenu: se, paneClickDistance: he, nodeClickDistance: ge, onEdgeContextMenu: ve, onEdgeMouseEnter: xe, onEdgeMouseMove: _e, onEdgeMouseLeave: De, reconnectRadius: qe, onReconnect: Ie, onReconnectStart: ot, onReconnectEnd: nt, noDragClassName: St, noWheelClassName: tn, noPanClassName: dn, disableKeyboardA11y: it, nodeExtent: At, rfId: Ot, viewport: zt, onViewportChange: Rt, nodesDraggable: Gi }) {
  return J0(t), J0(i), nA(), ZT(o), QT(zt), x.jsx(vT, { onPaneClick: E, onPaneMouseEnter: U, onPaneMouseMove: F, onPaneMouseLeave: K, onPaneContextMenu: se, onPaneScroll: Z, paneClickDistance: he, deleteKeyCode: I, selectionKeyCode: O, selectionOnDrag: _, selectionMode: C, onSelectionStart: v, onSelectionEnd: b, multiSelectionKeyCode: k, panActivationKeyCode: L, zoomActivationKeyCode: H, elementsSelectable: Q, zoomOnScroll: z, zoomOnPinch: q, zoomOnDoubleClick: V, panOnScroll: W, panOnScrollSpeed: te, panOnScrollMode: D, panOnDrag: ne, autoPanOnSelection: B, defaultViewport: X, translateExtent: J, minZoom: G, maxZoom: j, onSelectionContextMenu: p, preventScrolling: Y, noDragClassName: St, noWheelClassName: tn, noPanClassName: dn, disableKeyboardA11y: it, onViewportChange: Rt, isControlledViewport: !!zt, children: x.jsxs(GT, { children: [x.jsx(XT, { edgeTypes: i, onEdgeClick: s, onEdgeDoubleClick: c, onReconnect: Ie, onReconnectStart: ot, onReconnectEnd: nt, onlyRenderVisibleElements: ee, onEdgeContextMenu: ve, onEdgeMouseEnter: xe, onEdgeMouseMove: _e, onEdgeMouseLeave: De, reconnectRadius: qe, defaultMarkerColor: A, noPanClassName: dn, disableKeyboardA11y: it, rfId: Ot }), x.jsx(eA, { style: N, type: S, component: M, containerStyle: T }), x.jsx("div", { className: "react-flow__edgelabel-renderer" }), x.jsx(MT, { nodeTypes: t, onNodeClick: r, onNodeDoubleClick: u, onNodeMouseEnter: d, onNodeMouseMove: m, onNodeMouseLeave: y, onNodeContextMenu: g, nodeClickDistance: ge, onlyRenderVisibleElements: ee, noPanClassName: dn, noDragClassName: St, disableKeyboardA11y: it, nodeExtent: At, rfId: Ot, nodesDraggable: Gi }), x.jsx("div", { className: "react-flow__viewport-portal" })] }) });
}
Bx.displayName = "GraphView";
const iA = $.memo(Bx), aA = Lb(), P0 = ({ nodes: t, edges: i, defaultNodes: o, defaultEdges: r, width: s, height: u, fitView: c, fitViewOptions: d, minZoom: m = 0.5, maxZoom: y = 2, nodeOrigin: g, nodeExtent: p, zIndexMode: v = "basic" } = {}) => {
  const b = /* @__PURE__ */ new Map(), S = /* @__PURE__ */ new Map(), N = /* @__PURE__ */ new Map(), M = /* @__PURE__ */ new Map(), T = r ?? i ?? [], O = o ?? t ?? [], _ = g ?? [0, 0], C = p ?? ol;
  Kb(N, M, T);
  const { nodesInitialized: k } = nh(O, b, S, {
    nodeOrigin: _,
    nodeExtent: C,
    zIndexMode: v
  });
  let L = [0, 0, 1];
  if (c && s && u) {
    const H = yl(b, {
      filter: (X) => !!((X.width || X.initialWidth) && (X.height || X.initialHeight))
    }), { x: I, y: ee, zoom: Q } = Nh(H, s, u, m, y, d?.padding ?? 0.1);
    L = [I, ee, Q];
  }
  return {
    rfId: "1",
    width: s ?? 0,
    height: u ?? 0,
    transform: L,
    nodes: O,
    nodesInitialized: k,
    nodeLookup: b,
    parentLookup: S,
    edges: T,
    edgeLookup: M,
    connectionLookup: N,
    onNodesChange: null,
    onEdgesChange: null,
    hasDefaultNodes: o !== void 0,
    hasDefaultEdges: r !== void 0,
    panZoom: null,
    minZoom: m,
    maxZoom: y,
    translateExtent: ol,
    nodeExtent: C,
    nodesSelectionActive: !1,
    userSelectionActive: !1,
    userSelectionRect: null,
    connectionMode: To.Strict,
    domNode: null,
    paneDragging: !1,
    noPanClassName: "nopan",
    nodeOrigin: _,
    nodeDragThreshold: 1,
    connectionDragThreshold: 1,
    snapGrid: [15, 15],
    snapToGrid: !1,
    nodesDraggable: !0,
    nodesConnectable: !0,
    nodesFocusable: !0,
    edgesFocusable: !0,
    edgesReconnectable: !0,
    elementsSelectable: !0,
    elevateNodesOnSelect: !0,
    elevateEdgesOnSelect: !0,
    selectNodesOnDrag: !0,
    multiSelectionActive: !1,
    fitViewQueued: c ?? !1,
    fitViewOptions: d,
    fitViewResolver: null,
    connection: { ...jb },
    connectionClickStartHandle: null,
    connectOnClick: !0,
    ariaLiveMessage: "",
    autoPanOnConnect: !0,
    autoPanOnNodeDrag: !0,
    autoPanOnNodeFocus: !0,
    autoPanSpeed: 15,
    connectionRadius: 20,
    onError: aA,
    isValidConnection: void 0,
    onSelectionChangeHandlers: [],
    lib: "react",
    debug: !1,
    ariaLabelConfig: Ab,
    zIndexMode: v,
    onNodesChangeMiddlewareMap: /* @__PURE__ */ new Map(),
    onEdgesChangeMiddlewareMap: /* @__PURE__ */ new Map()
  };
}, oA = ({ nodes: t, edges: i, defaultNodes: o, defaultEdges: r, width: s, height: u, fitView: c, fitViewOptions: d, minZoom: m, maxZoom: y, nodeOrigin: g, nodeExtent: p, zIndexMode: v }) => vM((b, S) => {
  async function N() {
    const { nodeLookup: M, panZoom: T, fitViewOptions: O, fitViewResolver: _, width: C, height: k, minZoom: L, maxZoom: H } = S();
    T && (await mC({
      nodes: M,
      width: C,
      height: k,
      panZoom: T,
      minZoom: L,
      maxZoom: H
    }, O), _?.resolve(!0), b({ fitViewResolver: null }));
  }
  return {
    ...P0({
      nodes: t,
      edges: i,
      width: s,
      height: u,
      fitView: c,
      fitViewOptions: d,
      minZoom: m,
      maxZoom: y,
      nodeOrigin: g,
      nodeExtent: p,
      defaultNodes: o,
      defaultEdges: r,
      zIndexMode: v
    }),
    setNodes: (M) => {
      const { nodeLookup: T, parentLookup: O, nodeOrigin: _, elevateNodesOnSelect: C, fitViewQueued: k, zIndexMode: L, nodesSelectionActive: H } = S(), { nodesInitialized: I, hasSelectedNodes: ee } = nh(M, T, O, {
        nodeOrigin: _,
        nodeExtent: p,
        elevateNodesOnSelect: C,
        checkEquality: !0,
        zIndexMode: L
      }), Q = H && ee;
      k && I ? (N(), b({
        nodes: M,
        nodesInitialized: I,
        fitViewQueued: !1,
        fitViewOptions: void 0,
        nodesSelectionActive: Q
      })) : b({ nodes: M, nodesInitialized: I, nodesSelectionActive: Q });
    },
    setEdges: (M) => {
      const { connectionLookup: T, edgeLookup: O } = S();
      Kb(T, O, M), b({ edges: M });
    },
    setDefaultNodesAndEdges: (M, T) => {
      if (M) {
        const { setNodes: O } = S();
        O(M), b({ hasDefaultNodes: !0 });
      }
      if (T) {
        const { setEdges: O } = S();
        O(T), b({ hasDefaultEdges: !0 });
      }
    },
    /*
     * Every node gets registered at a ResizeObserver. Whenever a node
     * changes its dimensions, this function is called to measure the
     * new dimensions and update the nodes.
     */
    updateNodeInternals: (M) => {
      const { triggerNodeChanges: T, nodeLookup: O, parentLookup: _, domNode: C, nodeOrigin: k, nodeExtent: L, debug: H, fitViewQueued: I, zIndexMode: ee } = S(), { changes: Q, updatedInternals: X } = LC(M, O, _, C, k, L, ee);
      X && (zC(O, _, { nodeOrigin: k, nodeExtent: L, zIndexMode: ee }), I ? (N(), b({ fitViewQueued: !1, fitViewOptions: void 0 })) : b({}), Q?.length > 0 && (H && console.log("React Flow: trigger node changes", Q), T?.(Q)));
    },
    updateNodePositions: (M, T = !1) => {
      const O = [];
      let _ = [];
      const { nodeLookup: C, triggerNodeChanges: k, connection: L, updateConnection: H, onNodesChangeMiddlewareMap: I } = S();
      for (const [ee, Q] of M) {
        const X = C.get(ee), J = !!(X?.expandParent && X?.parentId && Q?.position), G = {
          id: ee,
          type: "position",
          position: J ? {
            x: Math.max(0, Q.position.x),
            y: Math.max(0, Q.position.y)
          } : Q.position,
          dragging: T
        };
        if (X && L.inProgress && L.fromNode.id === X.id) {
          const j = Ma(X, L.fromHandle, we.Left, !0);
          H({ ...L, from: j });
        }
        J && X.parentId && O.push({
          id: ee,
          parentId: X.parentId,
          rect: {
            ...Q.internals.positionAbsolute,
            width: Q.measured.width ?? 0,
            height: Q.measured.height ?? 0
          }
        }), _.push(G);
      }
      if (O.length > 0) {
        const { parentLookup: ee, nodeOrigin: Q } = S(), X = Oh(O, C, ee, Q);
        _.push(...X);
      }
      for (const ee of I.values())
        _ = ee(_);
      k(_);
    },
    triggerNodeChanges: (M) => {
      const { onNodesChange: T, setNodes: O, nodes: _, hasDefaultNodes: C, debug: k } = S();
      if (M?.length) {
        if (C) {
          const L = fx(M, _);
          O(L);
        }
        k && console.log("React Flow: trigger node changes", M), T?.(M);
      }
    },
    triggerEdgeChanges: (M) => {
      const { onEdgesChange: T, setEdges: O, edges: _, hasDefaultEdges: C, debug: k } = S();
      if (M?.length) {
        if (C) {
          const L = dx(M, _);
          O(L);
        }
        k && console.log("React Flow: trigger edge changes", M), T?.(M);
      }
    },
    addSelectedNodes: (M) => {
      const { multiSelectionActive: T, edgeLookup: O, nodeLookup: _, triggerNodeChanges: C, triggerEdgeChanges: k } = S();
      if (T) {
        const L = M.map((H) => ga(H, !0));
        C(L);
        return;
      }
      C(wo(_, /* @__PURE__ */ new Set([...M]), !0)), k(wo(O));
    },
    addSelectedEdges: (M) => {
      const { multiSelectionActive: T, edgeLookup: O, nodeLookup: _, triggerNodeChanges: C, triggerEdgeChanges: k } = S();
      if (T) {
        const L = M.map((H) => ga(H, !0));
        k(L);
        return;
      }
      k(wo(O, /* @__PURE__ */ new Set([...M]))), C(wo(_, /* @__PURE__ */ new Set(), !0));
    },
    unselectNodesAndEdges: ({ nodes: M, edges: T } = {}) => {
      const { edges: O, nodes: _, nodeLookup: C, triggerNodeChanges: k, triggerEdgeChanges: L } = S(), H = M || _, I = T || O, ee = [];
      for (const X of H) {
        if (!X.selected)
          continue;
        const J = C.get(X.id);
        J && (J.selected = !1), ee.push(ga(X.id, !1));
      }
      const Q = [];
      for (const X of I)
        X.selected && Q.push(ga(X.id, !1));
      k(ee), L(Q);
    },
    setMinZoom: (M) => {
      const { panZoom: T, maxZoom: O } = S();
      T?.setScaleExtent([M, O]), b({ minZoom: M });
    },
    setMaxZoom: (M) => {
      const { panZoom: T, minZoom: O } = S();
      T?.setScaleExtent([O, M]), b({ maxZoom: M });
    },
    setTranslateExtent: (M) => {
      S().panZoom?.setTranslateExtent(M), b({ translateExtent: M });
    },
    resetSelectedElements: () => {
      const { edges: M, nodes: T, triggerNodeChanges: O, triggerEdgeChanges: _, elementsSelectable: C } = S();
      if (!C)
        return;
      const k = T.reduce((H, I) => I.selected ? [...H, ga(I.id, !1)] : H, []), L = M.reduce((H, I) => I.selected ? [...H, ga(I.id, !1)] : H, []);
      O(k), _(L);
    },
    setNodeExtent: (M) => {
      const { nodes: T, nodeLookup: O, parentLookup: _, nodeOrigin: C, elevateNodesOnSelect: k, nodeExtent: L, zIndexMode: H } = S();
      M[0][0] === L[0][0] && M[0][1] === L[0][1] && M[1][0] === L[1][0] && M[1][1] === L[1][1] || (nh(T, O, _, {
        nodeOrigin: C,
        nodeExtent: M,
        elevateNodesOnSelect: k,
        checkEquality: !1,
        zIndexMode: H
      }), b({ nodeExtent: M }));
    },
    panBy: (M) => {
      const { transform: T, width: O, height: _, panZoom: C, translateExtent: k } = S();
      return BC({ delta: M, panZoom: C, transform: T, translateExtent: k, width: O, height: _ });
    },
    setCenter: async (M, T, O) => {
      const { width: _, height: C, maxZoom: k, panZoom: L } = S();
      if (!L)
        return !1;
      const H = typeof O?.zoom < "u" ? O.zoom : k;
      return await L.setViewport({
        x: _ / 2 - M * H,
        y: C / 2 - T * H,
        zoom: H
      }, { duration: O?.duration, ease: O?.ease, interpolate: O?.interpolate }), !0;
    },
    cancelConnection: () => {
      b({
        connection: { ...jb }
      });
    },
    updateConnection: (M) => {
      b({ connection: M });
    },
    reset: () => b({ ...P0() })
  };
}, Object.is);
function Ix({ initialNodes: t, initialEdges: i, defaultNodes: o, defaultEdges: r, initialWidth: s, initialHeight: u, initialMinZoom: c, initialMaxZoom: d, initialFitViewOptions: m, fitView: y, nodeOrigin: g, nodeExtent: p, zIndexMode: v, children: b }) {
  const [S] = $.useState(() => oA({
    nodes: t,
    edges: i,
    defaultNodes: o,
    defaultEdges: r,
    width: s,
    height: u,
    fitView: y,
    minZoom: c,
    maxZoom: d,
    fitViewOptions: m,
    nodeOrigin: g,
    nodeExtent: p,
    zIndexMode: v
  }));
  return x.jsx(xM, { value: S, children: x.jsx($M, { children: x.jsx(oT, { children: b }) }) });
}
function rA({ children: t, nodes: i, edges: o, defaultNodes: r, defaultEdges: s, width: u, height: c, fitView: d, fitViewOptions: m, minZoom: y, maxZoom: g, nodeOrigin: p, nodeExtent: v, zIndexMode: b }) {
  return $.useContext(Ku) ? x.jsx(x.Fragment, { children: t }) : x.jsx(Ix, { initialNodes: i, initialEdges: o, defaultNodes: r, defaultEdges: s, initialWidth: u, initialHeight: c, fitView: d, initialFitViewOptions: m, initialMinZoom: y, initialMaxZoom: g, nodeOrigin: p, nodeExtent: v, zIndexMode: b, children: t });
}
const lA = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  zIndex: 0
};
function sA({ nodes: t, edges: i, defaultNodes: o, defaultEdges: r, className: s, nodeTypes: u, edgeTypes: c, onNodeClick: d, onEdgeClick: m, onInit: y, onMove: g, onMoveStart: p, onMoveEnd: v, onConnect: b, onConnectStart: S, onConnectEnd: N, onClickConnectStart: M, onClickConnectEnd: T, onNodeMouseEnter: O, onNodeMouseMove: _, onNodeMouseLeave: C, onNodeContextMenu: k, onNodeDoubleClick: L, onNodeDragStart: H, onNodeDrag: I, onNodeDragStop: ee, onNodesDelete: Q, onEdgesDelete: X, onDelete: J, onSelectionChange: G, onSelectionDragStart: j, onSelectionDrag: Y, onSelectionDragStop: A, onSelectionContextMenu: z, onSelectionStart: q, onSelectionEnd: W, onBeforeDelete: te, connectionMode: D, connectionLineType: V = qi.Bezier, connectionLineStyle: ne, connectionLineComponent: B, connectionLineContainerStyle: E, deleteKeyCode: U = "Backspace", selectionKeyCode: F = "Shift", selectionOnDrag: K = !1, selectionMode: Z = rl.Full, panActivationKeyCode: se = "Space", multiSelectionKeyCode: he = sl() ? "Meta" : "Control", zoomActivationKeyCode: ge = sl() ? "Meta" : "Control", snapToGrid: ve, snapGrid: xe, onlyRenderVisibleElements: _e = !1, selectNodesOnDrag: De, nodesDraggable: qe, autoPanOnNodeFocus: Ie, nodesConnectable: ot, nodesFocusable: nt, nodeOrigin: St = ux, edgesFocusable: tn, edgesReconnectable: dn, elementsSelectable: it = !0, defaultViewport: At = zM, minZoom: Ot = 0.5, maxZoom: zt = 2, translateExtent: Rt = ol, preventScrolling: Gi = !0, nodeExtent: fi, defaultMarkerColor: zo = "#b1b1b7", zoomOnScroll: Ro = !0, zoomOnPinch: fe = !0, panOnScroll: pe = !1, panOnScrollSpeed: Ne = 0.5, panOnScrollMode: Ae = xa.Free, zoomOnDoubleClick: $t = !0, panOnDrag: Mn = !0, onPaneClick: ko, onPaneMouseEnter: Ta, onPaneMouseMove: Aa, onPaneMouseLeave: ja, onPaneScroll: In, onPaneContextMenu: Da, paneClickDistance: Zi = 1, nodeClickDistance: Ju = 0, children: Sl, onReconnect: Ho, onReconnectStart: Ki, onReconnectEnd: Pu, onEdgeContextMenu: wl, onEdgeDoubleClick: El, onEdgeMouseEnter: _l, onEdgeMouseMove: Lo, onEdgeMouseLeave: Bo, reconnectRadius: Nl = 10, onNodesChange: Cl, onEdgesChange: Tn, noDragClassName: vt = "nodrag", noWheelClassName: Mt = "nowheel", noPanClassName: Vn = "nopan", fitView: Oa, fitViewOptions: Ml, connectOnClick: ec, attributionPosition: Tl, proOptions: Qi, defaultEdgeOptions: Io, elevateNodesOnSelect: di = !0, elevateEdgesOnSelect: hi = !1, disableKeyboardA11y: mi = !1, autoPanOnConnect: gi, autoPanOnNodeDrag: ft, autoPanOnSelection: Al = !0, autoPanSpeed: jl, connectionRadius: Un, isValidConnection: pi, onError: tc, style: Dl, id: Vo, nodeDragThreshold: nc, connectionDragThreshold: za, viewport: Ra, onViewportChange: hn, width: kt, height: Ol, colorMode: ic = "light", debug: Uo, onScroll: Yo, ariaLabelConfig: ka, zIndexMode: zl = "basic", ...Ht }, qo) {
  const Ha = Vo || "1", $o = LM(ic), yi = $.useCallback((Xo) => {
    Xo.currentTarget.scrollTo({ top: 0, left: 0, behavior: "instant" }), Yo?.(Xo);
  }, [Yo]);
  return x.jsx("div", { "data-testid": "rf__wrapper", ...Ht, onScroll: yi, style: { ...Dl, ...lA }, ref: qo, className: yt(["react-flow", s, $o]), id: Vo, role: "application", children: x.jsxs(rA, { nodes: t, edges: i, width: kt, height: Ol, fitView: Oa, fitViewOptions: Ml, minZoom: Ot, maxZoom: zt, nodeOrigin: St, nodeExtent: fi, zIndexMode: zl, children: [x.jsx(HM, { nodes: t, edges: i, defaultNodes: o, defaultEdges: r, onConnect: b, onConnectStart: S, onConnectEnd: N, onClickConnectStart: M, onClickConnectEnd: T, nodesDraggable: qe, autoPanOnNodeFocus: Ie, nodesConnectable: ot, nodesFocusable: nt, edgesFocusable: tn, edgesReconnectable: dn, elementsSelectable: it, elevateNodesOnSelect: di, elevateEdgesOnSelect: hi, minZoom: Ot, maxZoom: zt, nodeExtent: fi, onNodesChange: Cl, onEdgesChange: Tn, snapToGrid: ve, snapGrid: xe, connectionMode: D, translateExtent: Rt, connectOnClick: ec, defaultEdgeOptions: Io, fitView: Oa, fitViewOptions: Ml, onNodesDelete: Q, onEdgesDelete: X, onDelete: J, onNodeDragStart: H, onNodeDrag: I, onNodeDragStop: ee, onSelectionDrag: Y, onSelectionDragStart: j, onSelectionDragStop: A, onMove: g, onMoveStart: p, onMoveEnd: v, noPanClassName: Vn, nodeOrigin: St, rfId: Ha, autoPanOnConnect: gi, autoPanOnNodeDrag: ft, autoPanSpeed: jl, onError: tc, connectionRadius: Un, isValidConnection: pi, selectNodesOnDrag: De, nodeDragThreshold: nc, connectionDragThreshold: za, onBeforeDelete: te, debug: Uo, ariaLabelConfig: ka, zIndexMode: zl }), x.jsx(iA, { onInit: y, onNodeClick: d, onEdgeClick: m, onNodeMouseEnter: O, onNodeMouseMove: _, onNodeMouseLeave: C, onNodeContextMenu: k, onNodeDoubleClick: L, nodeTypes: u, edgeTypes: c, connectionLineType: V, connectionLineStyle: ne, connectionLineComponent: B, connectionLineContainerStyle: E, selectionKeyCode: F, selectionOnDrag: K, selectionMode: Z, deleteKeyCode: U, multiSelectionKeyCode: he, panActivationKeyCode: se, zoomActivationKeyCode: ge, onlyRenderVisibleElements: _e, defaultViewport: At, translateExtent: Rt, minZoom: Ot, maxZoom: zt, preventScrolling: Gi, zoomOnScroll: Ro, zoomOnPinch: fe, zoomOnDoubleClick: $t, panOnScroll: pe, panOnScrollSpeed: Ne, panOnScrollMode: Ae, panOnDrag: Mn, autoPanOnSelection: Al, onPaneClick: ko, onPaneMouseEnter: Ta, onPaneMouseMove: Aa, onPaneMouseLeave: ja, onPaneScroll: In, onPaneContextMenu: Da, paneClickDistance: Zi, nodeClickDistance: Ju, onSelectionContextMenu: z, onSelectionStart: q, onSelectionEnd: W, onReconnect: Ho, onReconnectStart: Ki, onReconnectEnd: Pu, onEdgeContextMenu: wl, onEdgeDoubleClick: El, onEdgeMouseEnter: _l, onEdgeMouseMove: Lo, onEdgeMouseLeave: Bo, reconnectRadius: Nl, defaultMarkerColor: zo, noDragClassName: vt, noWheelClassName: Mt, noPanClassName: Vn, rfId: Ha, disableKeyboardA11y: mi, nodeExtent: fi, viewport: Ra, onViewportChange: hn, nodesDraggable: qe }), x.jsx(OM, { onSelectionChange: G }), Sl, x.jsx(MM, { proOptions: Qi, position: Tl }), x.jsx(CM, { rfId: Ha, disableKeyboardA11y: mi })] }) });
}
var uA = hx(sA);
const cA = (t) => t.domNode?.querySelector(".react-flow__edgelabel-renderer");
function fA({ children: t }) {
  const i = Be(cA);
  return i ? ox.createPortal(t, i) : null;
}
function dA(t) {
  const [i, o] = $.useState(t), r = $.useCallback((s) => o((u) => fx(s, u)), []);
  return [i, o, r];
}
function hA(t) {
  const [i, o] = $.useState(t), r = $.useCallback((s) => o((u) => dx(s, u)), []);
  return [i, o, r];
}
function mA({ dimensions: t, lineWidth: i, variant: o, className: r }) {
  return x.jsx("path", { strokeWidth: i, d: `M${t[0] / 2} 0 V${t[1]} M0 ${t[1] / 2} H${t[0]}`, className: yt(["react-flow__background-pattern", o, r]) });
}
function gA({ radius: t, className: i }) {
  return x.jsx("circle", { cx: t, cy: t, r: t, className: yt(["react-flow__background-pattern", "dots", i]) });
}
var ui;
(function(t) {
  t.Lines = "lines", t.Dots = "dots", t.Cross = "cross";
})(ui || (ui = {}));
const pA = {
  [ui.Dots]: 1,
  [ui.Lines]: 1,
  [ui.Cross]: 6
}, yA = (t) => ({ transform: t.transform, patternId: `pattern-${t.rfId}` });
function Vx({
  id: t,
  variant: i = ui.Dots,
  // only used for dots and cross
  gap: o = 20,
  // only used for lines and cross
  size: r,
  lineWidth: s = 1,
  offset: u = 0,
  color: c,
  bgColor: d,
  style: m,
  className: y,
  patternClassName: g
}) {
  const p = $.useRef(null), { transform: v, patternId: b } = Be(yA, at), S = r || pA[i], N = i === ui.Dots, M = i === ui.Cross, T = Array.isArray(o) ? o : [o, o], O = [T[0] * v[2] || 1, T[1] * v[2] || 1], _ = S * v[2], C = Array.isArray(u) ? u : [u, u], k = M ? [_, _] : O, L = [
    C[0] * v[2] || 1 + k[0] / 2,
    C[1] * v[2] || 1 + k[1] / 2
  ], H = `${b}${t || ""}`;
  return x.jsxs("svg", { className: yt(["react-flow__background", y]), style: {
    ...m,
    ...Wu,
    "--xy-background-color-props": d,
    "--xy-background-pattern-color-props": c
  }, ref: p, "data-testid": "rf__background", children: [x.jsx("pattern", { id: H, x: v[0] % O[0], y: v[1] % O[1], width: O[0], height: O[1], patternUnits: "userSpaceOnUse", patternTransform: `translate(-${L[0]},-${L[1]})`, children: N ? x.jsx(gA, { radius: _ / 2, className: g }) : x.jsx(mA, { dimensions: k, lineWidth: s, variant: i, className: g }) }), x.jsx("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: `url(#${H})` })] });
}
Vx.displayName = "Background";
const vA = $.memo(Vx);
function bA() {
  return x.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", children: x.jsx("path", { d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" }) });
}
function xA() {
  return x.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 5", children: x.jsx("path", { d: "M0 0h32v4.2H0z" }) });
}
function SA() {
  return x.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 30", children: x.jsx("path", { d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" }) });
}
function wA() {
  return x.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: x.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z" }) });
}
function EA() {
  return x.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: x.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z" }) });
}
function nu({ children: t, className: i, ...o }) {
  return x.jsx("button", { type: "button", className: yt(["react-flow__controls-button", i]), ...o, children: t });
}
const _A = (t) => ({
  isInteractive: t.nodesDraggable || t.nodesConnectable || t.elementsSelectable,
  minZoomReached: t.transform[2] <= t.minZoom,
  maxZoomReached: t.transform[2] >= t.maxZoom,
  ariaLabelConfig: t.ariaLabelConfig
});
function Ux({ style: t, showZoom: i = !0, showFitView: o = !0, showInteractive: r = !0, fitViewOptions: s, onZoomIn: u, onZoomOut: c, onFitView: d, onInteractiveChange: m, className: y, children: g, position: p = "bottom-left", orientation: v = "vertical", "aria-label": b }) {
  const S = et(), { isInteractive: N, minZoomReached: M, maxZoomReached: T, ariaLabelConfig: O } = Be(_A, at), { zoomIn: _, zoomOut: C, fitView: k } = Fu(), L = () => {
    _(), u?.();
  }, H = () => {
    C(), c?.();
  }, I = () => {
    k(s), d?.();
  }, ee = () => {
    S.setState({
      nodesDraggable: !N,
      nodesConnectable: !N,
      elementsSelectable: !N
    }), m?.(!N);
  }, Q = v === "horizontal" ? "horizontal" : "vertical";
  return x.jsxs(Qu, { className: yt(["react-flow__controls", Q, y]), position: p, style: t, "data-testid": "rf__controls", "aria-label": b ?? O["controls.ariaLabel"], children: [i && x.jsxs(x.Fragment, { children: [x.jsx(nu, { onClick: L, className: "react-flow__controls-zoomin", title: O["controls.zoomIn.ariaLabel"], "aria-label": O["controls.zoomIn.ariaLabel"], disabled: T, children: x.jsx(bA, {}) }), x.jsx(nu, { onClick: H, className: "react-flow__controls-zoomout", title: O["controls.zoomOut.ariaLabel"], "aria-label": O["controls.zoomOut.ariaLabel"], disabled: M, children: x.jsx(xA, {}) })] }), o && x.jsx(nu, { className: "react-flow__controls-fitview", onClick: I, title: O["controls.fitView.ariaLabel"], "aria-label": O["controls.fitView.ariaLabel"], children: x.jsx(SA, {}) }), r && x.jsx(nu, { className: "react-flow__controls-interactive", onClick: ee, title: O["controls.interactive.ariaLabel"], "aria-label": O["controls.interactive.ariaLabel"], children: N ? x.jsx(EA, {}) : x.jsx(wA, {}) }), g] });
}
Ux.displayName = "Controls";
const NA = $.memo(Ux);
function CA({ id: t, x: i, y: o, width: r, height: s, style: u, color: c, strokeColor: d, strokeWidth: m, className: y, borderRadius: g, shapeRendering: p, selected: v, onClick: b }) {
  const { background: S, backgroundColor: N } = u || {}, M = c || S || N;
  return x.jsx("rect", { className: yt(["react-flow__minimap-node", { selected: v }, y]), x: i, y: o, rx: g, ry: g, width: r, height: s, style: {
    fill: M,
    stroke: d,
    strokeWidth: m
  }, shapeRendering: p, onClick: b ? (T) => b(T, t) : void 0 });
}
const MA = $.memo(CA), TA = (t) => t.nodes.map((i) => i.id), Od = (t) => t instanceof Function ? t : () => t;
function AA({
  nodeStrokeColor: t,
  nodeColor: i,
  nodeClassName: o = "",
  nodeBorderRadius: r = 5,
  nodeStrokeWidth: s,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: u = MA,
  onClick: c
}) {
  const d = Be(TA, at), m = Od(i), y = Od(t), g = Od(o), p = typeof window > "u" || window.chrome ? "crispEdges" : "geometricPrecision";
  return x.jsx(x.Fragment, { children: d.map((v) => (
    /*
     * The split of responsibilities between MiniMapNodes and
     * NodeComponentWrapper may appear weird. However, it’s designed to
     * minimize the cost of updates when individual nodes change.
     *
     * For more details, see a similar commit in `NodeRenderer/index.tsx`.
     */
    x.jsx(DA, { id: v, nodeColorFunc: m, nodeStrokeColorFunc: y, nodeClassNameFunc: g, nodeBorderRadius: r, nodeStrokeWidth: s, NodeComponent: u, onClick: c, shapeRendering: p }, v)
  )) });
}
function jA({ id: t, nodeColorFunc: i, nodeStrokeColorFunc: o, nodeClassNameFunc: r, nodeBorderRadius: s, nodeStrokeWidth: u, shapeRendering: c, NodeComponent: d, onClick: m }) {
  const { node: y, x: g, y: p, width: v, height: b } = Be((S) => {
    const N = S.nodeLookup.get(t);
    if (!N)
      return { node: void 0, x: 0, y: 0, width: 0, height: 0 };
    const M = N.internals.userNode, { x: T, y: O } = N.internals.positionAbsolute, { width: _, height: C } = Bn(M);
    return {
      node: M,
      x: T,
      y: O,
      width: _,
      height: C
    };
  }, at);
  return !y || y.hidden || !Bb(y) ? null : x.jsx(d, { x: g, y: p, width: v, height: b, style: y.style, selected: !!y.selected, className: r(y), color: i(y), borderRadius: s, strokeColor: o(y), strokeWidth: u, shapeRendering: c, onClick: m, id: y.id });
}
const DA = $.memo(jA);
var OA = $.memo(AA);
const zA = 200, RA = 150, kA = (t) => !t.hidden, HA = (t) => {
  const i = {
    x: -t.transform[0] / t.transform[2],
    y: -t.transform[1] / t.transform[2],
    width: t.width / t.transform[2],
    height: t.height / t.transform[2]
  };
  return {
    viewBB: i,
    boundingRect: t.nodeLookup.size > 0 ? kb(yl(t.nodeLookup, { filter: kA }), i) : i,
    rfId: t.rfId,
    panZoom: t.panZoom,
    translateExtent: t.translateExtent,
    flowWidth: t.width,
    flowHeight: t.height,
    ariaLabelConfig: t.ariaLabelConfig
  };
}, ev = (t, i) => t.x === i.x && t.y === i.y && t.width === i.width && t.height === i.height, LA = (t, i) => ev(t.viewBB, i.viewBB) && ev(t.boundingRect, i.boundingRect) && t.rfId === i.rfId && t.panZoom === i.panZoom && t.translateExtent === i.translateExtent && t.flowWidth === i.flowWidth && t.flowHeight === i.flowHeight && t.ariaLabelConfig === i.ariaLabelConfig, BA = "react-flow__minimap-desc";
function Yx({
  style: t,
  className: i,
  nodeStrokeColor: o,
  nodeColor: r,
  nodeClassName: s = "",
  nodeBorderRadius: u = 5,
  nodeStrokeWidth: c,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: d,
  bgColor: m,
  maskColor: y,
  maskStrokeColor: g,
  maskStrokeWidth: p,
  position: v = "bottom-right",
  onClick: b,
  onNodeClick: S,
  pannable: N = !1,
  zoomable: M = !1,
  ariaLabel: T,
  inversePan: O,
  zoomStep: _ = 1,
  offsetScale: C = 5
}) {
  const k = et(), L = $.useRef(null), { boundingRect: H, viewBB: I, rfId: ee, panZoom: Q, translateExtent: X, flowWidth: J, flowHeight: G, ariaLabelConfig: j } = Be(HA, LA), Y = t?.width ?? zA, A = t?.height ?? RA, z = H.width / Y, q = H.height / A, W = Math.max(z, q), te = W * Y, D = W * A, V = C * W, ne = H.x - (te - H.width) / 2 - V, B = H.y - (D - H.height) / 2 - V, E = te + V * 2, U = D + V * 2, F = `${BA}-${ee}`, K = $.useRef(0), Z = $.useRef();
  K.current = W, $.useEffect(() => {
    if (L.current && Q)
      return Z.current = ZC({
        domNode: L.current,
        panZoom: Q,
        getTransform: () => k.getState().transform,
        getViewScale: () => K.current
      }), () => {
        Z.current?.destroy();
      };
  }, [Q]), $.useEffect(() => {
    Z.current?.update({
      translateExtent: X,
      width: J,
      height: G,
      inversePan: O,
      pannable: N,
      zoomStep: _,
      zoomable: M
    });
  }, [N, M, O, _, X, J, G]);
  const se = b ? (ve) => {
    const [xe, _e] = Z.current?.pointer(ve) || [0, 0];
    b(ve, { x: xe, y: _e });
  } : void 0, he = S ? $.useCallback((ve, xe) => {
    const _e = k.getState().nodeLookup.get(xe).internals.userNode;
    S(ve, _e);
  }, []) : void 0, ge = T ?? j["minimap.ariaLabel"];
  return x.jsx(Qu, { position: v, style: {
    ...t,
    "--xy-minimap-background-color-props": typeof m == "string" ? m : void 0,
    "--xy-minimap-mask-background-color-props": typeof y == "string" ? y : void 0,
    "--xy-minimap-mask-stroke-color-props": typeof g == "string" ? g : void 0,
    "--xy-minimap-mask-stroke-width-props": typeof p == "number" ? p * W : void 0,
    "--xy-minimap-node-background-color-props": typeof r == "string" ? r : void 0,
    "--xy-minimap-node-stroke-color-props": typeof o == "string" ? o : void 0,
    "--xy-minimap-node-stroke-width-props": typeof c == "number" ? c : void 0
  }, className: yt(["react-flow__minimap", i]), "data-testid": "rf__minimap", children: x.jsxs("svg", { width: Y, height: A, viewBox: `${ne} ${B} ${E} ${U}`, className: "react-flow__minimap-svg", role: "img", "aria-labelledby": F, ref: L, onClick: se, children: [ge && x.jsx("title", { id: F, children: ge }), x.jsx(OA, { onClick: he, nodeColor: r, nodeStrokeColor: o, nodeBorderRadius: u, nodeClassName: s, nodeStrokeWidth: c, nodeComponent: d }), x.jsx("path", { className: "react-flow__minimap-mask", d: `M${ne - V},${B - V}h${E + V * 2}v${U + V * 2}h${-E - V * 2}z
        M${I.x},${I.y}h${I.width}v${I.height}h${-I.width}z`, fillRule: "evenodd", pointerEvents: "none" })] }) });
}
Yx.displayName = "MiniMap";
const IA = $.memo(Yx), VA = (t) => (i) => t ? `${Math.max(1 / i.transform[2], 1)}` : void 0, UA = {
  [Do.Line]: "right",
  [Do.Handle]: "bottom-right"
};
function YA({ nodeId: t, position: i, variant: o = Do.Handle, className: r, style: s = void 0, children: u, color: c, minWidth: d = 10, minHeight: m = 10, maxWidth: y = Number.MAX_VALUE, maxHeight: g = Number.MAX_VALUE, keepAspectRatio: p = !1, resizeDirection: v, autoScale: b = !0, shouldResize: S, onResizeStart: N, onResize: M, onResizeEnd: T }) {
  const O = vx(), _ = typeof t == "string" ? t : O, C = et(), k = $.useRef(null), L = o === Do.Handle, H = Be($.useCallback(VA(L && b), [L, b]), at), I = $.useRef(null), ee = i ?? UA[o];
  $.useEffect(() => {
    if (!(!k.current || !_))
      return I.current || (I.current = rM({
        domNode: k.current,
        nodeId: _,
        getStoreItems: () => {
          const { nodeLookup: X, transform: J, snapGrid: G, snapToGrid: j, nodeOrigin: Y, domNode: A } = C.getState();
          return {
            nodeLookup: X,
            transform: J,
            snapGrid: G,
            snapToGrid: j,
            nodeOrigin: Y,
            paneDomNode: A
          };
        },
        onChange: (X, J) => {
          const { triggerNodeChanges: G, nodeLookup: j, parentLookup: Y, nodeOrigin: A } = C.getState(), z = [], q = { x: X.x, y: X.y }, W = j.get(_);
          if (W && W.expandParent && W.parentId) {
            const te = W.origin ?? A, D = X.width ?? W.measured.width ?? 0, V = X.height ?? W.measured.height ?? 0, ne = {
              id: W.id,
              parentId: W.parentId,
              rect: {
                width: D,
                height: V,
                ...Ib({
                  x: X.x ?? W.position.x,
                  y: X.y ?? W.position.y
                }, { width: D, height: V }, W.parentId, j, te)
              }
            }, B = Oh([ne], j, Y, A);
            z.push(...B), q.x = X.x ? Math.max(te[0] * D, X.x) : void 0, q.y = X.y ? Math.max(te[1] * V, X.y) : void 0;
          }
          if (q.x !== void 0 && q.y !== void 0) {
            const te = {
              id: _,
              type: "position",
              position: { ...q }
            };
            z.push(te);
          }
          if (X.width !== void 0 && X.height !== void 0) {
            const D = {
              id: _,
              type: "dimensions",
              resizing: !0,
              setAttributes: v ? v === "horizontal" ? "width" : "height" : !0,
              dimensions: {
                width: X.width,
                height: X.height
              }
            };
            z.push(D);
          }
          for (const te of J) {
            const D = {
              ...te,
              type: "position"
            };
            z.push(D);
          }
          G(z);
        },
        onEnd: ({ width: X, height: J }) => {
          const G = {
            id: _,
            type: "dimensions",
            resizing: !1,
            dimensions: {
              width: X,
              height: J
            }
          };
          C.getState().triggerNodeChanges([G]);
        }
      })), I.current.update({
        controlPosition: ee,
        boundaries: {
          minWidth: d,
          minHeight: m,
          maxWidth: y,
          maxHeight: g
        },
        keepAspectRatio: p,
        resizeDirection: v,
        onResizeStart: N,
        onResize: M,
        onResizeEnd: T,
        shouldResize: S
      }), () => {
        I.current?.destroy();
      };
  }, [
    ee,
    d,
    m,
    y,
    g,
    p,
    N,
    M,
    T,
    S
  ]);
  const Q = ee.split("-");
  return x.jsx("div", { className: yt(["react-flow__resize-control", "nodrag", ...Q, o, r]), ref: k, style: {
    ...s,
    scale: H,
    ...c && { [L ? "backgroundColor" : "borderColor"]: c }
  }, children: u });
}
$.memo(YA);
var Ze = (t, i) => () => (i || t((i = { exports: {} }).exports, i), i.exports), Nn = Ze((t, i) => {
  var o = Object.defineProperty, r = (G, j, Y) => j in G ? o(G, j, { enumerable: !0, configurable: !0, writable: !0, value: Y }) : G[j] = Y, s = (G, j) => () => (j || G((j = { exports: {} }).exports, j), j.exports), u = (G, j, Y) => r(G, typeof j != "symbol" ? j + "" : j, Y), c = s((G, j) => {
    var Y = "\0", A = "\0", z = "", q = class {
      constructor(B) {
        u(this, "_isDirected", !0), u(this, "_isMultigraph", !1), u(this, "_isCompound", !1), u(this, "_label"), u(this, "_defaultNodeLabelFn", () => {
        }), u(this, "_defaultEdgeLabelFn", () => {
        }), u(this, "_nodes", {}), u(this, "_in", {}), u(this, "_preds", {}), u(this, "_out", {}), u(this, "_sucs", {}), u(this, "_edgeObjs", {}), u(this, "_edgeLabels", {}), u(this, "_nodeCount", 0), u(this, "_edgeCount", 0), u(this, "_parent"), u(this, "_children"), B && (this._isDirected = Object.hasOwn(B, "directed") ? B.directed : !0, this._isMultigraph = Object.hasOwn(B, "multigraph") ? B.multigraph : !1, this._isCompound = Object.hasOwn(B, "compound") ? B.compound : !1), this._isCompound && (this._parent = {}, this._children = {}, this._children[A] = {});
      }
      isDirected() {
        return this._isDirected;
      }
      isMultigraph() {
        return this._isMultigraph;
      }
      isCompound() {
        return this._isCompound;
      }
      setGraph(B) {
        return this._label = B, this;
      }
      graph() {
        return this._label;
      }
      setDefaultNodeLabel(B) {
        return this._defaultNodeLabelFn = B, typeof B != "function" && (this._defaultNodeLabelFn = () => B), this;
      }
      nodeCount() {
        return this._nodeCount;
      }
      nodes() {
        return Object.keys(this._nodes);
      }
      sources() {
        var B = this;
        return this.nodes().filter((E) => Object.keys(B._in[E]).length === 0);
      }
      sinks() {
        var B = this;
        return this.nodes().filter((E) => Object.keys(B._out[E]).length === 0);
      }
      setNodes(B, E) {
        var U = arguments, F = this;
        return B.forEach(function(K) {
          U.length > 1 ? F.setNode(K, E) : F.setNode(K);
        }), this;
      }
      setNode(B, E) {
        return Object.hasOwn(this._nodes, B) ? (arguments.length > 1 && (this._nodes[B] = E), this) : (this._nodes[B] = arguments.length > 1 ? E : this._defaultNodeLabelFn(B), this._isCompound && (this._parent[B] = A, this._children[B] = {}, this._children[A][B] = !0), this._in[B] = {}, this._preds[B] = {}, this._out[B] = {}, this._sucs[B] = {}, ++this._nodeCount, this);
      }
      node(B) {
        return this._nodes[B];
      }
      hasNode(B) {
        return Object.hasOwn(this._nodes, B);
      }
      removeNode(B) {
        var E = this;
        if (Object.hasOwn(this._nodes, B)) {
          var U = (F) => E.removeEdge(E._edgeObjs[F]);
          delete this._nodes[B], this._isCompound && (this._removeFromParentsChildList(B), delete this._parent[B], this.children(B).forEach(function(F) {
            E.setParent(F);
          }), delete this._children[B]), Object.keys(this._in[B]).forEach(U), delete this._in[B], delete this._preds[B], Object.keys(this._out[B]).forEach(U), delete this._out[B], delete this._sucs[B], --this._nodeCount;
        }
        return this;
      }
      setParent(B, E) {
        if (!this._isCompound) throw new Error("Cannot set parent in a non-compound graph");
        if (E === void 0) E = A;
        else {
          E += "";
          for (var U = E; U !== void 0; U = this.parent(U)) if (U === B) throw new Error("Setting " + E + " as parent of " + B + " would create a cycle");
          this.setNode(E);
        }
        return this.setNode(B), this._removeFromParentsChildList(B), this._parent[B] = E, this._children[E][B] = !0, this;
      }
      _removeFromParentsChildList(B) {
        delete this._children[this._parent[B]][B];
      }
      parent(B) {
        if (this._isCompound) {
          var E = this._parent[B];
          if (E !== A) return E;
        }
      }
      children(B = A) {
        if (this._isCompound) {
          var E = this._children[B];
          if (E) return Object.keys(E);
        } else {
          if (B === A) return this.nodes();
          if (this.hasNode(B)) return [];
        }
      }
      predecessors(B) {
        var E = this._preds[B];
        if (E) return Object.keys(E);
      }
      successors(B) {
        var E = this._sucs[B];
        if (E) return Object.keys(E);
      }
      neighbors(B) {
        var E = this.predecessors(B);
        if (E) {
          let F = new Set(E);
          for (var U of this.successors(B)) F.add(U);
          return Array.from(F.values());
        }
      }
      isLeaf(B) {
        var E;
        return this.isDirected() ? E = this.successors(B) : E = this.neighbors(B), E.length === 0;
      }
      filterNodes(B) {
        var E = new this.constructor({ directed: this._isDirected, multigraph: this._isMultigraph, compound: this._isCompound });
        E.setGraph(this.graph());
        var U = this;
        Object.entries(this._nodes).forEach(function([Z, se]) {
          B(Z) && E.setNode(Z, se);
        }), Object.values(this._edgeObjs).forEach(function(Z) {
          E.hasNode(Z.v) && E.hasNode(Z.w) && E.setEdge(Z, U.edge(Z));
        });
        var F = {};
        function K(Z) {
          var se = U.parent(Z);
          return se === void 0 || E.hasNode(se) ? (F[Z] = se, se) : se in F ? F[se] : K(se);
        }
        return this._isCompound && E.nodes().forEach((Z) => E.setParent(Z, K(Z))), E;
      }
      setDefaultEdgeLabel(B) {
        return this._defaultEdgeLabelFn = B, typeof B != "function" && (this._defaultEdgeLabelFn = () => B), this;
      }
      edgeCount() {
        return this._edgeCount;
      }
      edges() {
        return Object.values(this._edgeObjs);
      }
      setPath(B, E) {
        var U = this, F = arguments;
        return B.reduce(function(K, Z) {
          return F.length > 1 ? U.setEdge(K, Z, E) : U.setEdge(K, Z), Z;
        }), this;
      }
      setEdge() {
        var B, E, U, F, K = !1, Z = arguments[0];
        typeof Z == "object" && Z !== null && "v" in Z ? (B = Z.v, E = Z.w, U = Z.name, arguments.length === 2 && (F = arguments[1], K = !0)) : (B = Z, E = arguments[1], U = arguments[3], arguments.length > 2 && (F = arguments[2], K = !0)), B = "" + B, E = "" + E, U !== void 0 && (U = "" + U);
        var se = D(this._isDirected, B, E, U);
        if (Object.hasOwn(this._edgeLabels, se)) return K && (this._edgeLabels[se] = F), this;
        if (U !== void 0 && !this._isMultigraph) throw new Error("Cannot set a named edge when isMultigraph = false");
        this.setNode(B), this.setNode(E), this._edgeLabels[se] = K ? F : this._defaultEdgeLabelFn(B, E, U);
        var he = V(this._isDirected, B, E, U);
        return B = he.v, E = he.w, Object.freeze(he), this._edgeObjs[se] = he, W(this._preds[E], B), W(this._sucs[B], E), this._in[E][se] = he, this._out[B][se] = he, this._edgeCount++, this;
      }
      edge(B, E, U) {
        var F = arguments.length === 1 ? ne(this._isDirected, arguments[0]) : D(this._isDirected, B, E, U);
        return this._edgeLabels[F];
      }
      edgeAsObj() {
        let B = this.edge(...arguments);
        return typeof B != "object" ? { label: B } : B;
      }
      hasEdge(B, E, U) {
        var F = arguments.length === 1 ? ne(this._isDirected, arguments[0]) : D(this._isDirected, B, E, U);
        return Object.hasOwn(this._edgeLabels, F);
      }
      removeEdge(B, E, U) {
        var F = arguments.length === 1 ? ne(this._isDirected, arguments[0]) : D(this._isDirected, B, E, U), K = this._edgeObjs[F];
        return K && (B = K.v, E = K.w, delete this._edgeLabels[F], delete this._edgeObjs[F], te(this._preds[E], B), te(this._sucs[B], E), delete this._in[E][F], delete this._out[B][F], this._edgeCount--), this;
      }
      inEdges(B, E) {
        return this.isDirected() ? this.filterEdges(this._in[B], B, E) : this.nodeEdges(B, E);
      }
      outEdges(B, E) {
        return this.isDirected() ? this.filterEdges(this._out[B], B, E) : this.nodeEdges(B, E);
      }
      nodeEdges(B, E) {
        if (B in this._nodes) return this.filterEdges({ ...this._in[B], ...this._out[B] }, B, E);
      }
      filterEdges(B, E, U) {
        if (B) {
          var F = Object.values(B);
          return U ? F.filter(function(K) {
            return K.v === E && K.w === U || K.v === U && K.w === E;
          }) : F;
        }
      }
    };
    function W(B, E) {
      B[E] ? B[E]++ : B[E] = 1;
    }
    function te(B, E) {
      --B[E] || delete B[E];
    }
    function D(B, E, U, F) {
      var K = "" + E, Z = "" + U;
      if (!B && K > Z) {
        var se = K;
        K = Z, Z = se;
      }
      return K + z + Z + z + (F === void 0 ? Y : F);
    }
    function V(B, E, U, F) {
      var K = "" + E, Z = "" + U;
      if (!B && K > Z) {
        var se = K;
        K = Z, Z = se;
      }
      var he = { v: K, w: Z };
      return F && (he.name = F), he;
    }
    function ne(B, E) {
      return D(B, E.v, E.w, E.name);
    }
    j.exports = q;
  }), d = s((G, j) => {
    j.exports = "3.0.2";
  }), m = s((G, j) => {
    j.exports = { Graph: c(), version: d() };
  }), y = s((G, j) => {
    var Y = c();
    j.exports = { write: A, read: W };
    function A(te) {
      var D = { options: { directed: te.isDirected(), multigraph: te.isMultigraph(), compound: te.isCompound() }, nodes: z(te), edges: q(te) };
      return te.graph() !== void 0 && (D.value = structuredClone(te.graph())), D;
    }
    function z(te) {
      return te.nodes().map(function(D) {
        var V = te.node(D), ne = te.parent(D), B = { v: D };
        return V !== void 0 && (B.value = V), ne !== void 0 && (B.parent = ne), B;
      });
    }
    function q(te) {
      return te.edges().map(function(D) {
        var V = te.edge(D), ne = { v: D.v, w: D.w };
        return D.name !== void 0 && (ne.name = D.name), V !== void 0 && (ne.value = V), ne;
      });
    }
    function W(te) {
      var D = new Y(te.options).setGraph(te.value);
      return te.nodes.forEach(function(V) {
        D.setNode(V.v, V.value), V.parent && D.setParent(V.v, V.parent);
      }), te.edges.forEach(function(V) {
        D.setEdge({ v: V.v, w: V.w, name: V.name }, V.value);
      }), D;
    }
  }), g = s((G, j) => {
    j.exports = A;
    var Y = () => 1;
    function A(q, W, te, D) {
      return z(q, String(W), te || Y, D || function(V) {
        return q.outEdges(V);
      });
    }
    function z(q, W, te, D) {
      var V = {}, ne = !0, B = 0, E = q.nodes(), U = function(se) {
        var he = te(se);
        V[se.v].distance + he < V[se.w].distance && (V[se.w] = { distance: V[se.v].distance + he, predecessor: se.v }, ne = !0);
      }, F = function() {
        E.forEach(function(se) {
          D(se).forEach(function(he) {
            var ge = he.v === se ? he.v : he.w, ve = ge === he.v ? he.w : he.v;
            U({ v: ge, w: ve });
          });
        });
      };
      E.forEach(function(se) {
        var he = se === W ? 0 : Number.POSITIVE_INFINITY;
        V[se] = { distance: he };
      });
      for (var K = E.length, Z = 1; Z < K && (ne = !1, B++, F(), !!ne); Z++) ;
      if (B === K - 1 && (ne = !1, F(), ne)) throw new Error("The graph contains a negative weight cycle");
      return V;
    }
  }), p = s((G, j) => {
    j.exports = Y;
    function Y(A) {
      var z = {}, q = [], W;
      function te(D) {
        Object.hasOwn(z, D) || (z[D] = !0, W.push(D), A.successors(D).forEach(te), A.predecessors(D).forEach(te));
      }
      return A.nodes().forEach(function(D) {
        W = [], te(D), W.length && q.push(W);
      }), q;
    }
  }), v = s((G, j) => {
    var Y = class {
      constructor() {
        u(this, "_arr", []), u(this, "_keyIndices", {});
      }
      size() {
        return this._arr.length;
      }
      keys() {
        return this._arr.map(function(A) {
          return A.key;
        });
      }
      has(A) {
        return Object.hasOwn(this._keyIndices, A);
      }
      priority(A) {
        var z = this._keyIndices[A];
        if (z !== void 0) return this._arr[z].priority;
      }
      min() {
        if (this.size() === 0) throw new Error("Queue underflow");
        return this._arr[0].key;
      }
      add(A, z) {
        var q = this._keyIndices;
        if (A = String(A), !Object.hasOwn(q, A)) {
          var W = this._arr, te = W.length;
          return q[A] = te, W.push({ key: A, priority: z }), this._decrease(te), !0;
        }
        return !1;
      }
      removeMin() {
        this._swap(0, this._arr.length - 1);
        var A = this._arr.pop();
        return delete this._keyIndices[A.key], this._heapify(0), A.key;
      }
      decrease(A, z) {
        var q = this._keyIndices[A];
        if (z > this._arr[q].priority) throw new Error("New priority is greater than current priority. Key: " + A + " Old: " + this._arr[q].priority + " New: " + z);
        this._arr[q].priority = z, this._decrease(q);
      }
      _heapify(A) {
        var z = this._arr, q = 2 * A, W = q + 1, te = A;
        q < z.length && (te = z[q].priority < z[te].priority ? q : te, W < z.length && (te = z[W].priority < z[te].priority ? W : te), te !== A && (this._swap(A, te), this._heapify(te)));
      }
      _decrease(A) {
        for (var z = this._arr, q = z[A].priority, W; A !== 0 && (W = A >> 1, !(z[W].priority < q)); ) this._swap(A, W), A = W;
      }
      _swap(A, z) {
        var q = this._arr, W = this._keyIndices, te = q[A], D = q[z];
        q[A] = D, q[z] = te, W[D.key] = A, W[te.key] = z;
      }
    };
    j.exports = Y;
  }), b = s((G, j) => {
    var Y = v();
    j.exports = z;
    var A = () => 1;
    function z(W, te, D, V) {
      var ne = function(B) {
        return W.outEdges(B);
      };
      return q(W, String(te), D || A, V || ne);
    }
    function q(W, te, D, V) {
      var ne = {}, B = new Y(), E, U, F = function(K) {
        var Z = K.v !== E ? K.v : K.w, se = ne[Z], he = D(K), ge = U.distance + he;
        if (he < 0) throw new Error("dijkstra does not allow negative edge weights. Bad edge: " + K + " Weight: " + he);
        ge < se.distance && (se.distance = ge, se.predecessor = E, B.decrease(Z, ge));
      };
      for (W.nodes().forEach(function(K) {
        var Z = K === te ? 0 : Number.POSITIVE_INFINITY;
        ne[K] = { distance: Z }, B.add(K, Z);
      }); B.size() > 0 && (E = B.removeMin(), U = ne[E], U.distance !== Number.POSITIVE_INFINITY); ) V(E).forEach(F);
      return ne;
    }
  }), S = s((G, j) => {
    var Y = b();
    j.exports = A;
    function A(z, q, W) {
      return z.nodes().reduce(function(te, D) {
        return te[D] = Y(z, D, q, W), te;
      }, {});
    }
  }), N = s((G, j) => {
    j.exports = Y;
    function Y(z, q, W) {
      if (z[q].predecessor !== void 0) throw new Error("Invalid source vertex");
      if (z[W].predecessor === void 0 && W !== q) throw new Error("Invalid destination vertex");
      return { weight: z[W].distance, path: A(z, q, W) };
    }
    function A(z, q, W) {
      for (var te = [], D = W; D !== q; ) te.push(D), D = z[D].predecessor;
      return te.push(q), te.reverse();
    }
  }), M = s((G, j) => {
    j.exports = Y;
    function Y(A) {
      var z = 0, q = [], W = {}, te = [];
      function D(V) {
        var ne = W[V] = { onStack: !0, lowlink: z, index: z++ };
        if (q.push(V), A.successors(V).forEach(function(U) {
          Object.hasOwn(W, U) ? W[U].onStack && (ne.lowlink = Math.min(ne.lowlink, W[U].index)) : (D(U), ne.lowlink = Math.min(ne.lowlink, W[U].lowlink));
        }), ne.lowlink === ne.index) {
          var B = [], E;
          do
            E = q.pop(), W[E].onStack = !1, B.push(E);
          while (V !== E);
          te.push(B);
        }
      }
      return A.nodes().forEach(function(V) {
        Object.hasOwn(W, V) || D(V);
      }), te;
    }
  }), T = s((G, j) => {
    var Y = M();
    j.exports = A;
    function A(z) {
      return Y(z).filter(function(q) {
        return q.length > 1 || q.length === 1 && z.hasEdge(q[0], q[0]);
      });
    }
  }), O = s((G, j) => {
    j.exports = A;
    var Y = () => 1;
    function A(q, W, te) {
      return z(q, W || Y, te || function(D) {
        return q.outEdges(D);
      });
    }
    function z(q, W, te) {
      var D = {}, V = q.nodes();
      return V.forEach(function(ne) {
        D[ne] = {}, D[ne][ne] = { distance: 0 }, V.forEach(function(B) {
          ne !== B && (D[ne][B] = { distance: Number.POSITIVE_INFINITY });
        }), te(ne).forEach(function(B) {
          var E = B.v === ne ? B.w : B.v, U = W(B);
          D[ne][E] = { distance: U, predecessor: ne };
        });
      }), V.forEach(function(ne) {
        var B = D[ne];
        V.forEach(function(E) {
          var U = D[E];
          V.forEach(function(F) {
            var K = U[ne], Z = B[F], se = U[F], he = K.distance + Z.distance;
            he < se.distance && (se.distance = he, se.predecessor = Z.predecessor);
          });
        });
      }), D;
    }
  }), _ = s((G, j) => {
    function Y(z) {
      var q = {}, W = {}, te = [];
      function D(V) {
        if (Object.hasOwn(W, V)) throw new A();
        Object.hasOwn(q, V) || (W[V] = !0, q[V] = !0, z.predecessors(V).forEach(D), delete W[V], te.push(V));
      }
      if (z.sinks().forEach(D), Object.keys(q).length !== z.nodeCount()) throw new A();
      return te;
    }
    var A = class extends Error {
      constructor() {
        super(...arguments);
      }
    };
    j.exports = Y, Y.CycleException = A;
  }), C = s((G, j) => {
    var Y = _();
    j.exports = A;
    function A(z) {
      try {
        Y(z);
      } catch (q) {
        if (q instanceof Y.CycleException) return !1;
        throw q;
      }
      return !0;
    }
  }), k = s((G, j) => {
    j.exports = Y;
    function Y(z, q, W, te, D) {
      Array.isArray(q) || (q = [q]);
      var V = (z.isDirected() ? z.successors : z.neighbors).bind(z), ne = {};
      return q.forEach(function(B) {
        if (!z.hasNode(B)) throw new Error("Graph does not have node: " + B);
        D = A(z, B, W === "post", ne, V, te, D);
      }), D;
    }
    function A(z, q, W, te, D, V, ne) {
      return Object.hasOwn(te, q) || (te[q] = !0, W || (ne = V(ne, q)), D(q).forEach(function(B) {
        ne = A(z, B, W, te, D, V, ne);
      }), W && (ne = V(ne, q))), ne;
    }
  }), L = s((G, j) => {
    var Y = k();
    j.exports = A;
    function A(z, q, W) {
      return Y(z, q, W, function(te, D) {
        return te.push(D), te;
      }, []);
    }
  }), H = s((G, j) => {
    var Y = L();
    j.exports = A;
    function A(z, q) {
      return Y(z, q, "post");
    }
  }), I = s((G, j) => {
    var Y = L();
    j.exports = A;
    function A(z, q) {
      return Y(z, q, "pre");
    }
  }), ee = s((G, j) => {
    var Y = c(), A = v();
    j.exports = z;
    function z(q, W) {
      var te = new Y(), D = {}, V = new A(), ne;
      function B(U) {
        var F = U.v === ne ? U.w : U.v, K = V.priority(F);
        if (K !== void 0) {
          var Z = W(U);
          Z < K && (D[F] = ne, V.decrease(F, Z));
        }
      }
      if (q.nodeCount() === 0) return te;
      q.nodes().forEach(function(U) {
        V.add(U, Number.POSITIVE_INFINITY), te.setNode(U);
      }), V.decrease(q.nodes()[0], 0);
      for (var E = !1; V.size() > 0; ) {
        if (ne = V.removeMin(), Object.hasOwn(D, ne)) te.setEdge(ne, D[ne]);
        else {
          if (E) throw new Error("Input graph is not connected: " + q);
          E = !0;
        }
        q.nodeEdges(ne).forEach(B);
      }
      return te;
    }
  }), Q = s((G, j) => {
    var Y = b(), A = g();
    j.exports = z;
    function z(W, te, D, V) {
      return q(W, te, D, V || function(ne) {
        return W.outEdges(ne);
      });
    }
    function q(W, te, D, V) {
      if (D === void 0) return Y(W, te, D, V);
      for (var ne = !1, B = W.nodes(), E = 0; E < B.length; E++) {
        for (var U = V(B[E]), F = 0; F < U.length; F++) {
          var K = U[F], Z = K.v === B[E] ? K.v : K.w, se = Z === K.v ? K.w : K.v;
          D({ v: Z, w: se }) < 0 && (ne = !0);
        }
        if (ne) return A(W, te, D, V);
      }
      return Y(W, te, D, V);
    }
  }), X = s((G, j) => {
    j.exports = { bellmanFord: g(), components: p(), dijkstra: b(), dijkstraAll: S(), extractPath: N(), findCycles: T(), floydWarshall: O(), isAcyclic: C(), postorder: H(), preorder: I(), prim: ee(), shortestPaths: Q(), reduce: k(), tarjan: M(), topsort: _() };
  }), J = m();
  i.exports = { Graph: J.Graph, json: y(), alg: X(), version: J.version };
}), qA = Ze((t, i) => {
  var o = class {
    constructor() {
      let u = {};
      u._next = u._prev = u, this._sentinel = u;
    }
    dequeue() {
      let u = this._sentinel, c = u._prev;
      if (c !== u) return r(c), c;
    }
    enqueue(u) {
      let c = this._sentinel;
      u._prev && u._next && r(u), u._next = c._next, c._next._prev = u, c._next = u, u._prev = c;
    }
    toString() {
      let u = [], c = this._sentinel, d = c._prev;
      for (; d !== c; ) u.push(JSON.stringify(d, s)), d = d._prev;
      return "[" + u.join(", ") + "]";
    }
  };
  function r(u) {
    u._prev._next = u._next, u._next._prev = u._prev, delete u._next, delete u._prev;
  }
  function s(u, c) {
    if (u !== "_next" && u !== "_prev") return c;
  }
  i.exports = o;
}), $A = Ze((t, i) => {
  var o = Nn().Graph, r = qA();
  i.exports = u;
  var s = () => 1;
  function u(p, v) {
    if (p.nodeCount() <= 1) return [];
    let b = m(p, v || s);
    return c(b.graph, b.buckets, b.zeroIdx).flatMap((S) => p.outEdges(S.v, S.w));
  }
  function c(p, v, b) {
    let S = [], N = v[v.length - 1], M = v[0], T;
    for (; p.nodeCount(); ) {
      for (; T = M.dequeue(); ) d(p, v, b, T);
      for (; T = N.dequeue(); ) d(p, v, b, T);
      if (p.nodeCount()) {
        for (let O = v.length - 2; O > 0; --O) if (T = v[O].dequeue(), T) {
          S = S.concat(d(p, v, b, T, !0));
          break;
        }
      }
    }
    return S;
  }
  function d(p, v, b, S, N) {
    let M = N ? [] : void 0;
    return p.inEdges(S.v).forEach((T) => {
      let O = p.edge(T), _ = p.node(T.v);
      N && M.push({ v: T.v, w: T.w }), _.out -= O, y(v, b, _);
    }), p.outEdges(S.v).forEach((T) => {
      let O = p.edge(T), _ = T.w, C = p.node(_);
      C.in -= O, y(v, b, C);
    }), p.removeNode(S.v), M;
  }
  function m(p, v) {
    let b = new o(), S = 0, N = 0;
    p.nodes().forEach((O) => {
      b.setNode(O, { v: O, in: 0, out: 0 });
    }), p.edges().forEach((O) => {
      let _ = b.edge(O.v, O.w) || 0, C = v(O), k = _ + C;
      b.setEdge(O.v, O.w, k), N = Math.max(N, b.node(O.v).out += C), S = Math.max(S, b.node(O.w).in += C);
    });
    let M = g(N + S + 3).map(() => new r()), T = S + 1;
    return b.nodes().forEach((O) => {
      y(M, T, b.node(O));
    }), { graph: b, buckets: M, zeroIdx: T };
  }
  function y(p, v, b) {
    b.out ? b.in ? p[b.out - b.in + v].enqueue(b) : p[p.length - 1].enqueue(b) : p[0].enqueue(b);
  }
  function g(p) {
    let v = [];
    for (let b = 0; b < p; b++) v.push(b);
    return v;
  }
}), pt = Ze((t, i) => {
  var o = Nn().Graph;
  i.exports = { addBorderNode: v, addDummyNode: r, applyWithChunking: N, asNonCompoundGraph: u, buildLayerMatrix: y, intersectRect: m, mapValues: I, maxRank: M, normalizeRanks: g, notime: _, partition: T, pick: H, predecessorWeights: d, range: L, removeEmptyRanks: p, simplify: s, successorWeights: c, time: O, uniqueId: k, zipObject: ee };
  function r(Q, X, J, G) {
    for (var j = G; Q.hasNode(j); ) j = k(G);
    return J.dummy = X, Q.setNode(j, J), j;
  }
  function s(Q) {
    let X = new o().setGraph(Q.graph());
    return Q.nodes().forEach((J) => X.setNode(J, Q.node(J))), Q.edges().forEach((J) => {
      let G = X.edge(J.v, J.w) || { weight: 0, minlen: 1 }, j = Q.edge(J);
      X.setEdge(J.v, J.w, { weight: G.weight + j.weight, minlen: Math.max(G.minlen, j.minlen) });
    }), X;
  }
  function u(Q) {
    let X = new o({ multigraph: Q.isMultigraph() }).setGraph(Q.graph());
    return Q.nodes().forEach((J) => {
      Q.children(J).length || X.setNode(J, Q.node(J));
    }), Q.edges().forEach((J) => {
      X.setEdge(J, Q.edge(J));
    }), X;
  }
  function c(Q) {
    let X = Q.nodes().map((J) => {
      let G = {};
      return Q.outEdges(J).forEach((j) => {
        G[j.w] = (G[j.w] || 0) + Q.edge(j).weight;
      }), G;
    });
    return ee(Q.nodes(), X);
  }
  function d(Q) {
    let X = Q.nodes().map((J) => {
      let G = {};
      return Q.inEdges(J).forEach((j) => {
        G[j.v] = (G[j.v] || 0) + Q.edge(j).weight;
      }), G;
    });
    return ee(Q.nodes(), X);
  }
  function m(Q, X) {
    let J = Q.x, G = Q.y, j = X.x - J, Y = X.y - G, A = Q.width / 2, z = Q.height / 2;
    if (!j && !Y) throw new Error("Not possible to find intersection inside of the rectangle");
    let q, W;
    return Math.abs(Y) * A > Math.abs(j) * z ? (Y < 0 && (z = -z), q = z * j / Y, W = z) : (j < 0 && (A = -A), q = A, W = A * Y / j), { x: J + q, y: G + W };
  }
  function y(Q) {
    let X = L(M(Q) + 1).map(() => []);
    return Q.nodes().forEach((J) => {
      let G = Q.node(J), j = G.rank;
      j !== void 0 && (X[j][G.order] = J);
    }), X;
  }
  function g(Q) {
    let X = Q.nodes().map((G) => {
      let j = Q.node(G).rank;
      return j === void 0 ? Number.MAX_VALUE : j;
    }), J = N(Math.min, X);
    Q.nodes().forEach((G) => {
      let j = Q.node(G);
      Object.hasOwn(j, "rank") && (j.rank -= J);
    });
  }
  function p(Q) {
    let X = Q.nodes().map((A) => Q.node(A).rank).filter((A) => A !== void 0), J = N(Math.min, X), G = [];
    Q.nodes().forEach((A) => {
      let z = Q.node(A).rank - J;
      G[z] || (G[z] = []), G[z].push(A);
    });
    let j = 0, Y = Q.graph().nodeRankFactor;
    Array.from(G).forEach((A, z) => {
      A === void 0 && z % Y !== 0 ? --j : A !== void 0 && j && A.forEach((q) => Q.node(q).rank += j);
    });
  }
  function v(Q, X, J, G) {
    let j = { width: 0, height: 0 };
    return arguments.length >= 4 && (j.rank = J, j.order = G), r(Q, "border", j, X);
  }
  function b(Q, X = S) {
    let J = [];
    for (let G = 0; G < Q.length; G += X) {
      let j = Q.slice(G, G + X);
      J.push(j);
    }
    return J;
  }
  var S = 65535;
  function N(Q, X) {
    if (X.length > S) {
      let J = b(X);
      return Q.apply(null, J.map((G) => Q.apply(null, G)));
    } else return Q.apply(null, X);
  }
  function M(Q) {
    let X = Q.nodes().map((J) => {
      let G = Q.node(J).rank;
      return G === void 0 ? Number.MIN_VALUE : G;
    });
    return N(Math.max, X);
  }
  function T(Q, X) {
    let J = { lhs: [], rhs: [] };
    return Q.forEach((G) => {
      X(G) ? J.lhs.push(G) : J.rhs.push(G);
    }), J;
  }
  function O(Q, X) {
    let J = Date.now();
    try {
      return X();
    } finally {
      console.log(Q + " time: " + (Date.now() - J) + "ms");
    }
  }
  function _(Q, X) {
    return X();
  }
  var C = 0;
  function k(Q) {
    var X = ++C;
    return Q + ("" + X);
  }
  function L(Q, X, J = 1) {
    X == null && (X = Q, Q = 0);
    let G = (Y) => Y < X;
    J < 0 && (G = (Y) => X < Y);
    let j = [];
    for (let Y = Q; G(Y); Y += J) j.push(Y);
    return j;
  }
  function H(Q, X) {
    let J = {};
    for (let G of X) Q[G] !== void 0 && (J[G] = Q[G]);
    return J;
  }
  function I(Q, X) {
    let J = X;
    return typeof X == "string" && (J = (G) => G[X]), Object.entries(Q).reduce((G, [j, Y]) => (G[j] = J(Y, j), G), {});
  }
  function ee(Q, X) {
    return Q.reduce((J, G, j) => (J[G] = X[j], J), {});
  }
}), XA = Ze((t, i) => {
  var o = $A(), r = pt().uniqueId;
  i.exports = { run: s, undo: c };
  function s(d) {
    (d.graph().acyclicer === "greedy" ? o(d, m(d)) : u(d)).forEach((y) => {
      let g = d.edge(y);
      d.removeEdge(y), g.forwardName = y.name, g.reversed = !0, d.setEdge(y.w, y.v, g, r("rev"));
    });
    function m(y) {
      return (g) => y.edge(g).weight;
    }
  }
  function u(d) {
    let m = [], y = {}, g = {};
    function p(v) {
      Object.hasOwn(g, v) || (g[v] = !0, y[v] = !0, d.outEdges(v).forEach((b) => {
        Object.hasOwn(y, b.w) ? m.push(b) : p(b.w);
      }), delete y[v]);
    }
    return d.nodes().forEach(p), m;
  }
  function c(d) {
    d.edges().forEach((m) => {
      let y = d.edge(m);
      if (y.reversed) {
        d.removeEdge(m);
        let g = y.forwardName;
        delete y.reversed, delete y.forwardName, d.setEdge(m.w, m.v, y, g);
      }
    });
  }
}), GA = Ze((t, i) => {
  var o = pt();
  i.exports = { run: r, undo: u };
  function r(c) {
    c.graph().dummyChains = [], c.edges().forEach((d) => s(c, d));
  }
  function s(c, d) {
    let m = d.v, y = c.node(m).rank, g = d.w, p = c.node(g).rank, v = d.name, b = c.edge(d), S = b.labelRank;
    if (p === y + 1) return;
    c.removeEdge(d);
    let N, M, T;
    for (T = 0, ++y; y < p; ++T, ++y) b.points = [], M = { width: 0, height: 0, edgeLabel: b, edgeObj: d, rank: y }, N = o.addDummyNode(c, "edge", M, "_d"), y === S && (M.width = b.width, M.height = b.height, M.dummy = "edge-label", M.labelpos = b.labelpos), c.setEdge(m, N, { weight: b.weight }, v), T === 0 && c.graph().dummyChains.push(N), m = N;
    c.setEdge(m, g, { weight: b.weight }, v);
  }
  function u(c) {
    c.graph().dummyChains.forEach((d) => {
      let m = c.node(d), y = m.edgeLabel, g;
      for (c.setEdge(m.edgeObj, y); m.dummy; ) g = c.successors(d)[0], c.removeNode(d), y.points.push({ x: m.x, y: m.y }), m.dummy === "edge-label" && (y.x = m.x, y.y = m.y, y.width = m.width, y.height = m.height), d = g, m = c.node(d);
    });
  }
}), Ou = Ze((t, i) => {
  var { applyWithChunking: o } = pt();
  i.exports = { longestPath: r, slack: s };
  function r(u) {
    var c = {};
    function d(m) {
      var y = u.node(m);
      if (Object.hasOwn(c, m)) return y.rank;
      c[m] = !0;
      let g = u.outEdges(m).map((v) => v == null ? Number.POSITIVE_INFINITY : d(v.w) - u.edge(v).minlen);
      var p = o(Math.min, g);
      return p === Number.POSITIVE_INFINITY && (p = 0), y.rank = p;
    }
    u.sources().forEach(d);
  }
  function s(u, c) {
    return u.node(c.w).rank - u.node(c.v).rank - u.edge(c).minlen;
  }
}), qx = Ze((t, i) => {
  var o = Nn().Graph, r = Ou().slack;
  i.exports = s;
  function s(m) {
    var y = new o({ directed: !1 }), g = m.nodes()[0], p = m.nodeCount();
    y.setNode(g, {});
    for (var v, b; u(y, m) < p; ) v = c(y, m), b = y.hasNode(v.v) ? r(m, v) : -r(m, v), d(y, m, b);
    return y;
  }
  function u(m, y) {
    function g(p) {
      y.nodeEdges(p).forEach((v) => {
        var b = v.v, S = p === b ? v.w : b;
        !m.hasNode(S) && !r(y, v) && (m.setNode(S, {}), m.setEdge(p, S, {}), g(S));
      });
    }
    return m.nodes().forEach(g), m.nodeCount();
  }
  function c(m, y) {
    return y.edges().reduce((g, p) => {
      let v = Number.POSITIVE_INFINITY;
      return m.hasNode(p.v) !== m.hasNode(p.w) && (v = r(y, p)), v < g[0] ? [v, p] : g;
    }, [Number.POSITIVE_INFINITY, null])[1];
  }
  function d(m, y, g) {
    m.nodes().forEach((p) => y.node(p).rank += g);
  }
}), ZA = Ze((t, i) => {
  var o = qx(), r = Ou().slack, s = Ou().longestPath, u = Nn().alg.preorder, c = Nn().alg.postorder, d = pt().simplify;
  i.exports = m, m.initLowLimValues = v, m.initCutValues = y, m.calcCutValue = p, m.leaveEdge = S, m.enterEdge = N, m.exchangeEdges = M;
  function m(C) {
    C = d(C), s(C);
    var k = o(C);
    v(k), y(k, C);
    for (var L, H; L = S(k); ) H = N(k, C, L), M(k, C, L, H);
  }
  function y(C, k) {
    var L = c(C, C.nodes());
    L = L.slice(0, L.length - 1), L.forEach((H) => g(C, k, H));
  }
  function g(C, k, L) {
    var H = C.node(L), I = H.parent;
    C.edge(L, I).cutvalue = p(C, k, L);
  }
  function p(C, k, L) {
    var H = C.node(L), I = H.parent, ee = !0, Q = k.edge(L, I), X = 0;
    return Q || (ee = !1, Q = k.edge(I, L)), X = Q.weight, k.nodeEdges(L).forEach((J) => {
      var G = J.v === L, j = G ? J.w : J.v;
      if (j !== I) {
        var Y = G === ee, A = k.edge(J).weight;
        if (X += Y ? A : -A, O(C, L, j)) {
          var z = C.edge(L, j).cutvalue;
          X += Y ? -z : z;
        }
      }
    }), X;
  }
  function v(C, k) {
    arguments.length < 2 && (k = C.nodes()[0]), b(C, {}, 1, k);
  }
  function b(C, k, L, H, I) {
    var ee = L, Q = C.node(H);
    return k[H] = !0, C.neighbors(H).forEach((X) => {
      Object.hasOwn(k, X) || (L = b(C, k, L, X, H));
    }), Q.low = ee, Q.lim = L++, I ? Q.parent = I : delete Q.parent, L;
  }
  function S(C) {
    return C.edges().find((k) => C.edge(k).cutvalue < 0);
  }
  function N(C, k, L) {
    var H = L.v, I = L.w;
    k.hasEdge(H, I) || (H = L.w, I = L.v);
    var ee = C.node(H), Q = C.node(I), X = ee, J = !1;
    ee.lim > Q.lim && (X = Q, J = !0);
    var G = k.edges().filter((j) => J === _(C, C.node(j.v), X) && J !== _(C, C.node(j.w), X));
    return G.reduce((j, Y) => r(k, Y) < r(k, j) ? Y : j);
  }
  function M(C, k, L, H) {
    var I = L.v, ee = L.w;
    C.removeEdge(I, ee), C.setEdge(H.v, H.w, {}), v(C), y(C, k), T(C, k);
  }
  function T(C, k) {
    var L = C.nodes().find((I) => !k.node(I).parent), H = u(C, L);
    H = H.slice(1), H.forEach((I) => {
      var ee = C.node(I).parent, Q = k.edge(I, ee), X = !1;
      Q || (Q = k.edge(ee, I), X = !0), k.node(I).rank = k.node(ee).rank + (X ? Q.minlen : -Q.minlen);
    });
  }
  function O(C, k, L) {
    return C.hasEdge(k, L);
  }
  function _(C, k, L) {
    return L.low <= k.lim && k.lim <= L.lim;
  }
}), KA = Ze((t, i) => {
  var o = Ou(), r = o.longestPath, s = qx(), u = ZA();
  i.exports = c;
  function c(g) {
    var p = g.graph().ranker;
    if (p instanceof Function) return p(g);
    switch (g.graph().ranker) {
      case "network-simplex":
        y(g);
        break;
      case "tight-tree":
        m(g);
        break;
      case "longest-path":
        d(g);
        break;
      case "none":
        break;
      default:
        y(g);
    }
  }
  var d = r;
  function m(g) {
    r(g), s(g);
  }
  function y(g) {
    u(g);
  }
}), QA = Ze((t, i) => {
  i.exports = o;
  function o(u) {
    let c = s(u);
    u.graph().dummyChains.forEach((d) => {
      let m = u.node(d), y = m.edgeObj, g = r(u, c, y.v, y.w), p = g.path, v = g.lca, b = 0, S = p[b], N = !0;
      for (; d !== y.w; ) {
        if (m = u.node(d), N) {
          for (; (S = p[b]) !== v && u.node(S).maxRank < m.rank; ) b++;
          S === v && (N = !1);
        }
        if (!N) {
          for (; b < p.length - 1 && u.node(S = p[b + 1]).minRank <= m.rank; ) b++;
          S = p[b];
        }
        u.setParent(d, S), d = u.successors(d)[0];
      }
    });
  }
  function r(u, c, d, m) {
    let y = [], g = [], p = Math.min(c[d].low, c[m].low), v = Math.max(c[d].lim, c[m].lim), b, S;
    b = d;
    do
      b = u.parent(b), y.push(b);
    while (b && (c[b].low > p || v > c[b].lim));
    for (S = b, b = m; (b = u.parent(b)) !== S; ) g.push(b);
    return { path: y.concat(g.reverse()), lca: S };
  }
  function s(u) {
    let c = {}, d = 0;
    function m(y) {
      let g = d;
      u.children(y).forEach(m), c[y] = { low: g, lim: d++ };
    }
    return u.children().forEach(m), c;
  }
}), FA = Ze((t, i) => {
  var o = pt();
  i.exports = { run: r, cleanup: d };
  function r(m) {
    let y = o.addDummyNode(m, "root", {}, "_root"), g = u(m), p = Object.values(g), v = o.applyWithChunking(Math.max, p) - 1, b = 2 * v + 1;
    m.graph().nestingRoot = y, m.edges().forEach((N) => m.edge(N).minlen *= b);
    let S = c(m) + 1;
    m.children().forEach((N) => s(m, y, b, S, v, g, N)), m.graph().nodeRankFactor = b;
  }
  function s(m, y, g, p, v, b, S) {
    let N = m.children(S);
    if (!N.length) {
      S !== y && m.setEdge(y, S, { weight: 0, minlen: g });
      return;
    }
    let M = o.addBorderNode(m, "_bt"), T = o.addBorderNode(m, "_bb"), O = m.node(S);
    m.setParent(M, S), O.borderTop = M, m.setParent(T, S), O.borderBottom = T, N.forEach((_) => {
      s(m, y, g, p, v, b, _);
      let C = m.node(_), k = C.borderTop ? C.borderTop : _, L = C.borderBottom ? C.borderBottom : _, H = C.borderTop ? p : 2 * p, I = k !== L ? 1 : v - b[S] + 1;
      m.setEdge(M, k, { weight: H, minlen: I, nestingEdge: !0 }), m.setEdge(L, T, { weight: H, minlen: I, nestingEdge: !0 });
    }), m.parent(S) || m.setEdge(y, M, { weight: 0, minlen: v + b[S] });
  }
  function u(m) {
    var y = {};
    function g(p, v) {
      var b = m.children(p);
      b && b.length && b.forEach((S) => g(S, v + 1)), y[p] = v;
    }
    return m.children().forEach((p) => g(p, 1)), y;
  }
  function c(m) {
    return m.edges().reduce((y, g) => y + m.edge(g).weight, 0);
  }
  function d(m) {
    var y = m.graph();
    m.removeNode(y.nestingRoot), delete y.nestingRoot, m.edges().forEach((g) => {
      var p = m.edge(g);
      p.nestingEdge && m.removeEdge(g);
    });
  }
}), WA = Ze((t, i) => {
  var o = pt();
  i.exports = r;
  function r(u) {
    function c(d) {
      let m = u.children(d), y = u.node(d);
      if (m.length && m.forEach(c), Object.hasOwn(y, "minRank")) {
        y.borderLeft = [], y.borderRight = [];
        for (let g = y.minRank, p = y.maxRank + 1; g < p; ++g) s(u, "borderLeft", "_bl", d, y, g), s(u, "borderRight", "_br", d, y, g);
      }
    }
    u.children().forEach(c);
  }
  function s(u, c, d, m, y, g) {
    let p = { width: 0, height: 0, rank: g, borderType: c }, v = y[c][g - 1], b = o.addDummyNode(u, "border", p, d);
    y[c][g] = b, u.setParent(b, m), v && u.setEdge(v, b, { weight: 1 });
  }
}), JA = Ze((t, i) => {
  i.exports = { adjust: o, undo: r };
  function o(g) {
    let p = g.graph().rankdir.toLowerCase();
    (p === "lr" || p === "rl") && s(g);
  }
  function r(g) {
    let p = g.graph().rankdir.toLowerCase();
    (p === "bt" || p === "rl") && c(g), (p === "lr" || p === "rl") && (m(g), s(g));
  }
  function s(g) {
    g.nodes().forEach((p) => u(g.node(p))), g.edges().forEach((p) => u(g.edge(p)));
  }
  function u(g) {
    let p = g.width;
    g.width = g.height, g.height = p;
  }
  function c(g) {
    g.nodes().forEach((p) => d(g.node(p))), g.edges().forEach((p) => {
      let v = g.edge(p);
      v.points.forEach(d), Object.hasOwn(v, "y") && d(v);
    });
  }
  function d(g) {
    g.y = -g.y;
  }
  function m(g) {
    g.nodes().forEach((p) => y(g.node(p))), g.edges().forEach((p) => {
      let v = g.edge(p);
      v.points.forEach(y), Object.hasOwn(v, "x") && y(v);
    });
  }
  function y(g) {
    let p = g.x;
    g.x = g.y, g.y = p;
  }
}), PA = Ze((t, i) => {
  var o = pt();
  i.exports = r;
  function r(s) {
    let u = {}, c = s.nodes().filter((p) => !s.children(p).length), d = c.map((p) => s.node(p).rank), m = o.applyWithChunking(Math.max, d), y = o.range(m + 1).map(() => []);
    function g(p) {
      if (u[p]) return;
      u[p] = !0;
      let v = s.node(p);
      y[v.rank].push(p), s.successors(p).forEach(g);
    }
    return c.sort((p, v) => s.node(p).rank - s.node(v).rank).forEach(g), y;
  }
}), ej = Ze((t, i) => {
  var o = pt().zipObject;
  i.exports = r;
  function r(u, c) {
    let d = 0;
    for (let m = 1; m < c.length; ++m) d += s(u, c[m - 1], c[m]);
    return d;
  }
  function s(u, c, d) {
    let m = o(d, d.map((S, N) => N)), y = c.flatMap((S) => u.outEdges(S).map((N) => ({ pos: m[N.w], weight: u.edge(N).weight })).sort((N, M) => N.pos - M.pos)), g = 1;
    for (; g < d.length; ) g <<= 1;
    let p = 2 * g - 1;
    g -= 1;
    let v = new Array(p).fill(0), b = 0;
    return y.forEach((S) => {
      let N = S.pos + g;
      v[N] += S.weight;
      let M = 0;
      for (; N > 0; ) N % 2 && (M += v[N + 1]), N = N - 1 >> 1, v[N] += S.weight;
      b += S.weight * M;
    }), b;
  }
}), tj = Ze((t, i) => {
  i.exports = o;
  function o(r, s = []) {
    return s.map((u) => {
      let c = r.inEdges(u);
      if (c.length) {
        let d = c.reduce((m, y) => {
          let g = r.edge(y), p = r.node(y.v);
          return { sum: m.sum + g.weight * p.order, weight: m.weight + g.weight };
        }, { sum: 0, weight: 0 });
        return { v: u, barycenter: d.sum / d.weight, weight: d.weight };
      } else return { v: u };
    });
  }
}), nj = Ze((t, i) => {
  var o = pt();
  i.exports = r;
  function r(c, d) {
    let m = {};
    c.forEach((g, p) => {
      let v = m[g.v] = { indegree: 0, in: [], out: [], vs: [g.v], i: p };
      g.barycenter !== void 0 && (v.barycenter = g.barycenter, v.weight = g.weight);
    }), d.edges().forEach((g) => {
      let p = m[g.v], v = m[g.w];
      p !== void 0 && v !== void 0 && (v.indegree++, p.out.push(m[g.w]));
    });
    let y = Object.values(m).filter((g) => !g.indegree);
    return s(y);
  }
  function s(c) {
    let d = [];
    function m(g) {
      return (p) => {
        p.merged || (p.barycenter === void 0 || g.barycenter === void 0 || p.barycenter >= g.barycenter) && u(g, p);
      };
    }
    function y(g) {
      return (p) => {
        p.in.push(g), --p.indegree === 0 && c.push(p);
      };
    }
    for (; c.length; ) {
      let g = c.pop();
      d.push(g), g.in.reverse().forEach(m(g)), g.out.forEach(y(g));
    }
    return d.filter((g) => !g.merged).map((g) => o.pick(g, ["vs", "i", "barycenter", "weight"]));
  }
  function u(c, d) {
    let m = 0, y = 0;
    c.weight && (m += c.barycenter * c.weight, y += c.weight), d.weight && (m += d.barycenter * d.weight, y += d.weight), c.vs = d.vs.concat(c.vs), c.barycenter = m / y, c.weight = y, c.i = Math.min(d.i, c.i), d.merged = !0;
  }
}), ij = Ze((t, i) => {
  var o = pt();
  i.exports = r;
  function r(c, d) {
    let m = o.partition(c, (M) => Object.hasOwn(M, "barycenter")), y = m.lhs, g = m.rhs.sort((M, T) => T.i - M.i), p = [], v = 0, b = 0, S = 0;
    y.sort(u(!!d)), S = s(p, g, S), y.forEach((M) => {
      S += M.vs.length, p.push(M.vs), v += M.barycenter * M.weight, b += M.weight, S = s(p, g, S);
    });
    let N = { vs: p.flat(!0) };
    return b && (N.barycenter = v / b, N.weight = b), N;
  }
  function s(c, d, m) {
    let y;
    for (; d.length && (y = d[d.length - 1]).i <= m; ) d.pop(), c.push(y.vs), m++;
    return m;
  }
  function u(c) {
    return (d, m) => d.barycenter < m.barycenter ? -1 : d.barycenter > m.barycenter ? 1 : c ? m.i - d.i : d.i - m.i;
  }
}), aj = Ze((t, i) => {
  var o = tj(), r = nj(), s = ij();
  i.exports = u;
  function u(m, y, g, p) {
    let v = m.children(y), b = m.node(y), S = b ? b.borderLeft : void 0, N = b ? b.borderRight : void 0, M = {};
    S && (v = v.filter((C) => C !== S && C !== N));
    let T = o(m, v);
    T.forEach((C) => {
      if (m.children(C.v).length) {
        let k = u(m, C.v, g, p);
        M[C.v] = k, Object.hasOwn(k, "barycenter") && d(C, k);
      }
    });
    let O = r(T, g);
    c(O, M);
    let _ = s(O, p);
    if (S && (_.vs = [S, _.vs, N].flat(!0), m.predecessors(S).length)) {
      let C = m.node(m.predecessors(S)[0]), k = m.node(m.predecessors(N)[0]);
      Object.hasOwn(_, "barycenter") || (_.barycenter = 0, _.weight = 0), _.barycenter = (_.barycenter * _.weight + C.order + k.order) / (_.weight + 2), _.weight += 2;
    }
    return _;
  }
  function c(m, y) {
    m.forEach((g) => {
      g.vs = g.vs.flatMap((p) => y[p] ? y[p].vs : p);
    });
  }
  function d(m, y) {
    m.barycenter !== void 0 ? (m.barycenter = (m.barycenter * m.weight + y.barycenter * y.weight) / (m.weight + y.weight), m.weight += y.weight) : (m.barycenter = y.barycenter, m.weight = y.weight);
  }
}), oj = Ze((t, i) => {
  var o = Nn().Graph, r = pt();
  i.exports = s;
  function s(c, d, m, y) {
    y || (y = c.nodes());
    let g = u(c), p = new o({ compound: !0 }).setGraph({ root: g }).setDefaultNodeLabel((v) => c.node(v));
    return y.forEach((v) => {
      let b = c.node(v), S = c.parent(v);
      (b.rank === d || b.minRank <= d && d <= b.maxRank) && (p.setNode(v), p.setParent(v, S || g), c[m](v).forEach((N) => {
        let M = N.v === v ? N.w : N.v, T = p.edge(M, v), O = T !== void 0 ? T.weight : 0;
        p.setEdge(M, v, { weight: c.edge(N).weight + O });
      }), Object.hasOwn(b, "minRank") && p.setNode(v, { borderLeft: b.borderLeft[d], borderRight: b.borderRight[d] }));
    }), p;
  }
  function u(c) {
    for (var d; c.hasNode(d = r.uniqueId("_root")); ) ;
    return d;
  }
}), rj = Ze((t, i) => {
  i.exports = o;
  function o(r, s, u) {
    let c = {}, d;
    u.forEach((m) => {
      let y = r.parent(m), g, p;
      for (; y; ) {
        if (g = r.parent(y), g ? (p = c[g], c[g] = y) : (p = d, d = y), p && p !== y) {
          s.setEdge(p, y);
          return;
        }
        y = g;
      }
    });
  }
}), lj = Ze((t, i) => {
  var o = PA(), r = ej(), s = aj(), u = oj(), c = rj(), d = Nn().Graph, m = pt();
  i.exports = y;
  function y(b, S = {}) {
    if (typeof S.customOrder == "function") {
      S.customOrder(b, y);
      return;
    }
    let N = m.maxRank(b), M = g(b, m.range(1, N + 1), "inEdges"), T = g(b, m.range(N - 1, -1, -1), "outEdges"), O = o(b);
    if (v(b, O), S.disableOptimalOrderHeuristic) return;
    let _ = Number.POSITIVE_INFINITY, C, k = S.constraints || [];
    for (let L = 0, H = 0; H < 4; ++L, ++H) {
      p(L % 2 ? M : T, L % 4 >= 2, k), O = m.buildLayerMatrix(b);
      let I = r(b, O);
      I < _ ? (H = 0, C = Object.assign({}, O), _ = I) : I === _ && (C = structuredClone(O));
    }
    v(b, C);
  }
  function g(b, S, N) {
    let M = /* @__PURE__ */ new Map(), T = (O, _) => {
      M.has(O) || M.set(O, []), M.get(O).push(_);
    };
    for (let O of b.nodes()) {
      let _ = b.node(O);
      if (typeof _.rank == "number" && T(_.rank, O), typeof _.minRank == "number" && typeof _.maxRank == "number") for (let C = _.minRank; C <= _.maxRank; C++) C !== _.rank && T(C, O);
    }
    return S.map(function(O) {
      return u(b, O, N, M.get(O) || []);
    });
  }
  function p(b, S, N) {
    let M = new d();
    b.forEach(function(T) {
      N.forEach((C) => M.setEdge(C.left, C.right));
      let O = T.graph().root, _ = s(T, O, M, S);
      _.vs.forEach((C, k) => T.node(C).order = k), c(T, M, _.vs);
    });
  }
  function v(b, S) {
    Object.values(S).forEach((N) => N.forEach((M, T) => b.node(M).order = T));
  }
}), sj = Ze((t, i) => {
  var o = Nn().Graph, r = pt();
  i.exports = { positionX: N, findType1Conflicts: s, findType2Conflicts: u, addConflict: d, hasConflict: m, verticalAlignment: y, horizontalCompaction: g, alignCoordinates: b, findSmallestWidthAlignment: v, balance: S };
  function s(O, _) {
    let C = {};
    function k(L, H) {
      let I = 0, ee = 0, Q = L.length, X = H[H.length - 1];
      return H.forEach((J, G) => {
        let j = c(O, J), Y = j ? O.node(j).order : Q;
        (j || J === X) && (H.slice(ee, G + 1).forEach((A) => {
          O.predecessors(A).forEach((z) => {
            let q = O.node(z), W = q.order;
            (W < I || Y < W) && !(q.dummy && O.node(A).dummy) && d(C, z, A);
          });
        }), ee = G + 1, I = Y);
      }), H;
    }
    return _.length && _.reduce(k), C;
  }
  function u(O, _) {
    let C = {};
    function k(H, I, ee, Q, X) {
      let J;
      r.range(I, ee).forEach((G) => {
        J = H[G], O.node(J).dummy && O.predecessors(J).forEach((j) => {
          let Y = O.node(j);
          Y.dummy && (Y.order < Q || Y.order > X) && d(C, j, J);
        });
      });
    }
    function L(H, I) {
      let ee = -1, Q, X = 0;
      return I.forEach((J, G) => {
        if (O.node(J).dummy === "border") {
          let j = O.predecessors(J);
          j.length && (Q = O.node(j[0]).order, k(I, X, G, ee, Q), X = G, ee = Q);
        }
        k(I, X, I.length, Q, H.length);
      }), I;
    }
    return _.length && _.reduce(L), C;
  }
  function c(O, _) {
    if (O.node(_).dummy) return O.predecessors(_).find((C) => O.node(C).dummy);
  }
  function d(O, _, C) {
    if (_ > C) {
      let L = _;
      _ = C, C = L;
    }
    let k = O[_];
    k || (O[_] = k = {}), k[C] = !0;
  }
  function m(O, _, C) {
    if (_ > C) {
      let k = _;
      _ = C, C = k;
    }
    return !!O[_] && Object.hasOwn(O[_], C);
  }
  function y(O, _, C, k) {
    let L = {}, H = {}, I = {};
    return _.forEach((ee) => {
      ee.forEach((Q, X) => {
        L[Q] = Q, H[Q] = Q, I[Q] = X;
      });
    }), _.forEach((ee) => {
      let Q = -1;
      ee.forEach((X) => {
        let J = k(X);
        if (J.length) {
          J = J.sort((j, Y) => I[j] - I[Y]);
          let G = (J.length - 1) / 2;
          for (let j = Math.floor(G), Y = Math.ceil(G); j <= Y; ++j) {
            let A = J[j];
            H[X] === X && Q < I[A] && !m(C, X, A) && (H[A] = X, H[X] = L[X] = L[A], Q = I[A]);
          }
        }
      });
    }), { root: L, align: H };
  }
  function g(O, _, C, k, L) {
    let H = {}, I = p(O, _, C, L), ee = L ? "borderLeft" : "borderRight";
    function Q(G, j) {
      let Y = I.nodes().slice(), A = {}, z = Y.pop();
      for (; z; ) {
        if (A[z]) G(z);
        else {
          A[z] = !0, Y.push(z);
          for (let q of j(z)) Y.push(q);
        }
        z = Y.pop();
      }
    }
    function X(G) {
      H[G] = I.inEdges(G).reduce((j, Y) => Math.max(j, H[Y.v] + I.edge(Y)), 0);
    }
    function J(G) {
      let j = I.outEdges(G).reduce((A, z) => Math.min(A, H[z.w] - I.edge(z)), Number.POSITIVE_INFINITY), Y = O.node(G);
      j !== Number.POSITIVE_INFINITY && Y.borderType !== ee && (H[G] = Math.max(H[G], j));
    }
    return Q(X, I.predecessors.bind(I)), Q(J, I.successors.bind(I)), Object.keys(k).forEach((G) => H[G] = H[C[G]]), H;
  }
  function p(O, _, C, k) {
    let L = new o(), H = O.graph(), I = M(H.nodesep, H.edgesep, k);
    return _.forEach((ee) => {
      let Q;
      ee.forEach((X) => {
        let J = C[X];
        if (L.setNode(J), Q) {
          var G = C[Q], j = L.edge(G, J);
          L.setEdge(G, J, Math.max(I(O, X, Q), j || 0));
        }
        Q = X;
      });
    }), L;
  }
  function v(O, _) {
    return Object.values(_).reduce((C, k) => {
      let L = Number.NEGATIVE_INFINITY, H = Number.POSITIVE_INFINITY;
      Object.entries(k).forEach(([ee, Q]) => {
        let X = T(O, ee) / 2;
        L = Math.max(Q + X, L), H = Math.min(Q - X, H);
      });
      let I = L - H;
      return I < C[0] && (C = [I, k]), C;
    }, [Number.POSITIVE_INFINITY, null])[1];
  }
  function b(O, _) {
    let C = Object.values(_), k = r.applyWithChunking(Math.min, C), L = r.applyWithChunking(Math.max, C);
    ["u", "d"].forEach((H) => {
      ["l", "r"].forEach((I) => {
        let ee = H + I, Q = O[ee];
        if (Q === _) return;
        let X = Object.values(Q), J = k - r.applyWithChunking(Math.min, X);
        I !== "l" && (J = L - r.applyWithChunking(Math.max, X)), J && (O[ee] = r.mapValues(Q, (G) => G + J));
      });
    });
  }
  function S(O, _) {
    return r.mapValues(O.ul, (C, k) => {
      if (_) return O[_.toLowerCase()][k];
      {
        let L = Object.values(O).map((H) => H[k]).sort((H, I) => H - I);
        return (L[1] + L[2]) / 2;
      }
    });
  }
  function N(O) {
    let _ = r.buildLayerMatrix(O), C = Object.assign(s(O, _), u(O, _)), k = {}, L;
    ["u", "d"].forEach((I) => {
      L = I === "u" ? _ : Object.values(_).reverse(), ["l", "r"].forEach((ee) => {
        ee === "r" && (L = L.map((G) => Object.values(G).reverse()));
        let Q = (I === "u" ? O.predecessors : O.successors).bind(O), X = y(O, L, C, Q), J = g(O, L, X.root, X.align, ee === "r");
        ee === "r" && (J = r.mapValues(J, (G) => -G)), k[I + ee] = J;
      });
    });
    let H = v(O, k);
    return b(k, H), S(k, O.graph().align);
  }
  function M(O, _, C) {
    return (k, L, H) => {
      let I = k.node(L), ee = k.node(H), Q = 0, X;
      if (Q += I.width / 2, Object.hasOwn(I, "labelpos")) switch (I.labelpos.toLowerCase()) {
        case "l":
          X = -I.width / 2;
          break;
        case "r":
          X = I.width / 2;
          break;
      }
      if (X && (Q += C ? X : -X), X = 0, Q += (I.dummy ? _ : O) / 2, Q += (ee.dummy ? _ : O) / 2, Q += ee.width / 2, Object.hasOwn(ee, "labelpos")) switch (ee.labelpos.toLowerCase()) {
        case "l":
          X = ee.width / 2;
          break;
        case "r":
          X = -ee.width / 2;
          break;
      }
      return X && (Q += C ? X : -X), X = 0, Q;
    };
  }
  function T(O, _) {
    return O.node(_).width;
  }
}), uj = Ze((t, i) => {
  var o = pt(), r = sj().positionX;
  i.exports = s;
  function s(c) {
    c = o.asNonCompoundGraph(c), u(c), Object.entries(r(c)).forEach(([d, m]) => c.node(d).x = m);
  }
  function u(c) {
    let d = o.buildLayerMatrix(c), m = c.graph().ranksep, y = c.graph().rankalign, g = 0;
    d.forEach((p) => {
      let v = p.reduce((b, S) => {
        let N = c.node(S).height;
        return b > N ? b : N;
      }, 0);
      p.forEach((b) => {
        let S = c.node(b);
        y === "top" ? S.y = g + S.height / 2 : y === "bottom" ? S.y = g + v - S.height / 2 : S.y = g + v / 2;
      }), g += v + m;
    });
  }
}), cj = Ze((t, i) => {
  var o = XA(), r = GA(), s = KA(), u = pt().normalizeRanks, c = QA(), d = pt().removeEmptyRanks, m = FA(), y = WA(), g = JA(), p = lj(), v = uj(), b = pt(), S = Nn().Graph;
  i.exports = N;
  function N(E, U = {}) {
    let F = U.debugTiming ? b.time : b.notime;
    return F("layout", () => {
      let K = F("  buildLayoutGraph", () => Q(E));
      return F("  runLayout", () => M(K, F, U)), F("  updateInputGraph", () => T(E, K)), K;
    });
  }
  function M(E, U, F) {
    U("    makeSpaceForEdgeLabels", () => X(E)), U("    removeSelfEdges", () => te(E)), U("    acyclic", () => o.run(E)), U("    nestingGraph.run", () => m.run(E)), U("    rank", () => s(b.asNonCompoundGraph(E))), U("    injectEdgeLabelProxies", () => J(E)), U("    removeEmptyRanks", () => d(E)), U("    nestingGraph.cleanup", () => m.cleanup(E)), U("    normalizeRanks", () => u(E)), U("    assignRankMinMax", () => G(E)), U("    removeEdgeLabelProxies", () => j(E)), U("    normalize.run", () => r.run(E)), U("    parentDummyChains", () => c(E)), U("    addBorderSegments", () => y(E)), U("    order", () => p(E, F)), U("    insertSelfEdges", () => D(E)), U("    adjustCoordinateSystem", () => g.adjust(E)), U("    position", () => v(E)), U("    positionSelfEdges", () => V(E)), U("    removeBorderNodes", () => W(E)), U("    normalize.undo", () => r.undo(E)), U("    fixupEdgeLabelCoords", () => z(E)), U("    undoCoordinateSystem", () => g.undo(E)), U("    translateGraph", () => Y(E)), U("    assignNodeIntersects", () => A(E)), U("    reversePoints", () => q(E)), U("    acyclic.undo", () => o.undo(E));
  }
  function T(E, U) {
    E.nodes().forEach((F) => {
      let K = E.node(F), Z = U.node(F);
      K && (K.x = Z.x, K.y = Z.y, K.order = Z.order, K.rank = Z.rank, U.children(F).length && (K.width = Z.width, K.height = Z.height));
    }), E.edges().forEach((F) => {
      let K = E.edge(F), Z = U.edge(F);
      K.points = Z.points, Object.hasOwn(Z, "x") && (K.x = Z.x, K.y = Z.y);
    }), E.graph().width = U.graph().width, E.graph().height = U.graph().height;
  }
  var O = ["nodesep", "edgesep", "ranksep", "marginx", "marginy"], _ = { ranksep: 50, edgesep: 20, nodesep: 50, rankdir: "tb", rankalign: "center" }, C = ["acyclicer", "ranker", "rankdir", "align", "rankalign"], k = ["width", "height", "rank"], L = { width: 0, height: 0 }, H = ["minlen", "weight", "width", "height", "labeloffset"], I = { minlen: 1, weight: 1, width: 0, height: 0, labeloffset: 10, labelpos: "r" }, ee = ["labelpos"];
  function Q(E) {
    let U = new S({ multigraph: !0, compound: !0 }), F = B(E.graph());
    return U.setGraph(Object.assign({}, _, ne(F, O), b.pick(F, C))), E.nodes().forEach((K) => {
      let Z = B(E.node(K)), se = ne(Z, k);
      Object.keys(L).forEach((he) => {
        se[he] === void 0 && (se[he] = L[he]);
      }), U.setNode(K, se), U.setParent(K, E.parent(K));
    }), E.edges().forEach((K) => {
      let Z = B(E.edge(K));
      U.setEdge(K, Object.assign({}, I, ne(Z, H), b.pick(Z, ee)));
    }), U;
  }
  function X(E) {
    let U = E.graph();
    U.ranksep /= 2, E.edges().forEach((F) => {
      let K = E.edge(F);
      K.minlen *= 2, K.labelpos.toLowerCase() !== "c" && (U.rankdir === "TB" || U.rankdir === "BT" ? K.width += K.labeloffset : K.height += K.labeloffset);
    });
  }
  function J(E) {
    E.edges().forEach((U) => {
      let F = E.edge(U);
      if (F.width && F.height) {
        let K = E.node(U.v), Z = { rank: (E.node(U.w).rank - K.rank) / 2 + K.rank, e: U };
        b.addDummyNode(E, "edge-proxy", Z, "_ep");
      }
    });
  }
  function G(E) {
    let U = 0;
    E.nodes().forEach((F) => {
      let K = E.node(F);
      K.borderTop && (K.minRank = E.node(K.borderTop).rank, K.maxRank = E.node(K.borderBottom).rank, U = Math.max(U, K.maxRank));
    }), E.graph().maxRank = U;
  }
  function j(E) {
    E.nodes().forEach((U) => {
      let F = E.node(U);
      F.dummy === "edge-proxy" && (E.edge(F.e).labelRank = F.rank, E.removeNode(U));
    });
  }
  function Y(E) {
    let U = Number.POSITIVE_INFINITY, F = 0, K = Number.POSITIVE_INFINITY, Z = 0, se = E.graph(), he = se.marginx || 0, ge = se.marginy || 0;
    function ve(xe) {
      let _e = xe.x, De = xe.y, qe = xe.width, Ie = xe.height;
      U = Math.min(U, _e - qe / 2), F = Math.max(F, _e + qe / 2), K = Math.min(K, De - Ie / 2), Z = Math.max(Z, De + Ie / 2);
    }
    E.nodes().forEach((xe) => ve(E.node(xe))), E.edges().forEach((xe) => {
      let _e = E.edge(xe);
      Object.hasOwn(_e, "x") && ve(_e);
    }), U -= he, K -= ge, E.nodes().forEach((xe) => {
      let _e = E.node(xe);
      _e.x -= U, _e.y -= K;
    }), E.edges().forEach((xe) => {
      let _e = E.edge(xe);
      _e.points.forEach((De) => {
        De.x -= U, De.y -= K;
      }), Object.hasOwn(_e, "x") && (_e.x -= U), Object.hasOwn(_e, "y") && (_e.y -= K);
    }), se.width = F - U + he, se.height = Z - K + ge;
  }
  function A(E) {
    E.edges().forEach((U) => {
      let F = E.edge(U), K = E.node(U.v), Z = E.node(U.w), se, he;
      F.points ? (se = F.points[0], he = F.points[F.points.length - 1]) : (F.points = [], se = Z, he = K), F.points.unshift(b.intersectRect(K, se)), F.points.push(b.intersectRect(Z, he));
    });
  }
  function z(E) {
    E.edges().forEach((U) => {
      let F = E.edge(U);
      if (Object.hasOwn(F, "x")) switch ((F.labelpos === "l" || F.labelpos === "r") && (F.width -= F.labeloffset), F.labelpos) {
        case "l":
          F.x -= F.width / 2 + F.labeloffset;
          break;
        case "r":
          F.x += F.width / 2 + F.labeloffset;
          break;
      }
    });
  }
  function q(E) {
    E.edges().forEach((U) => {
      let F = E.edge(U);
      F.reversed && F.points.reverse();
    });
  }
  function W(E) {
    E.nodes().forEach((U) => {
      if (E.children(U).length) {
        let F = E.node(U), K = E.node(F.borderTop), Z = E.node(F.borderBottom), se = E.node(F.borderLeft[F.borderLeft.length - 1]), he = E.node(F.borderRight[F.borderRight.length - 1]);
        F.width = Math.abs(he.x - se.x), F.height = Math.abs(Z.y - K.y), F.x = se.x + F.width / 2, F.y = K.y + F.height / 2;
      }
    }), E.nodes().forEach((U) => {
      E.node(U).dummy === "border" && E.removeNode(U);
    });
  }
  function te(E) {
    E.edges().forEach((U) => {
      if (U.v === U.w) {
        var F = E.node(U.v);
        F.selfEdges || (F.selfEdges = []), F.selfEdges.push({ e: U, label: E.edge(U) }), E.removeEdge(U);
      }
    });
  }
  function D(E) {
    var U = b.buildLayerMatrix(E);
    U.forEach((F) => {
      var K = 0;
      F.forEach((Z, se) => {
        var he = E.node(Z);
        he.order = se + K, (he.selfEdges || []).forEach((ge) => {
          b.addDummyNode(E, "selfedge", { width: ge.label.width, height: ge.label.height, rank: he.rank, order: se + ++K, e: ge.e, label: ge.label }, "_se");
        }), delete he.selfEdges;
      });
    });
  }
  function V(E) {
    E.nodes().forEach((U) => {
      var F = E.node(U);
      if (F.dummy === "selfedge") {
        var K = E.node(F.e.v), Z = K.x + K.width / 2, se = K.y, he = F.x - Z, ge = K.height / 2;
        E.setEdge(F.e, F.label), E.removeNode(U), F.label.points = [{ x: Z + 2 * he / 3, y: se - ge }, { x: Z + 5 * he / 6, y: se - ge }, { x: Z + he, y: se }, { x: Z + 5 * he / 6, y: se + ge }, { x: Z + 2 * he / 3, y: se + ge }], F.label.x = F.x, F.label.y = F.y;
      }
    });
  }
  function ne(E, U) {
    return b.mapValues(b.pick(E, U), Number);
  }
  function B(E) {
    var U = {};
    return E && Object.entries(E).forEach(([F, K]) => {
      typeof F == "string" && (F = F.toLowerCase()), U[F] = K;
    }), U;
  }
}), fj = Ze((t, i) => {
  var o = pt(), r = Nn().Graph;
  i.exports = { debugOrdering: s };
  function s(u) {
    let c = o.buildLayerMatrix(u), d = new r({ compound: !0, multigraph: !0 }).setGraph({});
    return u.nodes().forEach((m) => {
      d.setNode(m, { label: m }), d.setParent(m, "layer" + u.node(m).rank);
    }), u.edges().forEach((m) => d.setEdge(m.v, m.w, {}, m.name)), c.forEach((m, y) => {
      let g = "layer" + y;
      d.setNode(g, { rank: "same" }), m.reduce((p, v) => (d.setEdge(p, v, { style: "invis" }), v));
    }), d;
  }
}), dj = Ze((t, i) => {
  i.exports = "2.0.4";
}), hj = Ze((t, i) => {
  i.exports = { graphlib: Nn(), layout: cj(), debug: fj(), util: { time: pt().time, notime: pt().notime }, version: dj() };
});
const tv = hj();
const oh = 200, rh = 80;
function nv(t) {
  const i = t % 3, o = Math.floor(t / 3);
  return {
    x: i * (oh + 80) + 50,
    y: o * (rh + 80) + 50
  };
}
function mj(t) {
  const i = /* @__PURE__ */ new Map();
  return t.forEach((o, r) => {
    const s = o.name ?? "";
    i.has(s) || i.set(s, En(r));
  }), i;
}
function $x(t) {
  const i = t.direction ?? "TB", o = Array.isArray(t.states) ? t.states : [], r = Array.isArray(t.transitions) ? t.transitions : [];
  if (o.length === 0)
    return {};
  const s = {};
  try {
    const u = new tv.graphlib.Graph();
    u.setDefaultEdgeLabel(() => ({})), u.setGraph({
      rankdir: i,
      nodesep: 80,
      ranksep: 100
    }), o.forEach((d, m) => {
      u.setNode(En(m), {
        width: oh,
        height: rh
      });
    });
    const c = mj(o);
    r.forEach((d) => {
      const m = c.get(d.from), y = d.to || d.dynamic_to?.resolver, g = y ? c.get(y) : void 0;
      !m || !g || u.setEdge(m, g);
    }), tv.layout(u), o.forEach((d, m) => {
      const y = En(m), g = u.node(y);
      if (!g || typeof g.x != "number" || typeof g.y != "number") {
        s[y] = nv(m);
        return;
      }
      s[y] = {
        x: g.x - oh / 2,
        y: g.y - rh / 2
      };
    });
  } catch {
    o.forEach((u, c) => {
      s[En(c)] = nv(c);
    });
  }
  return s;
}
const Xx = "(prefers-reduced-motion: reduce)";
function Gx() {
  return typeof window < "u" && typeof window.matchMedia == "function";
}
function gj() {
  return Gx() ? window.matchMedia(Xx).matches : !1;
}
function pj() {
  const [t, i] = $.useState(gj);
  return $.useEffect(() => {
    if (!Gx())
      return;
    const o = window.matchMedia(Xx), r = () => {
      i(o.matches);
    };
    return r(), typeof o.addEventListener == "function" ? (o.addEventListener("change", r), () => {
      o.removeEventListener("change", r);
    }) : (o.addListener(r), () => {
      o.removeListener(r);
    });
  }, []), t;
}
function yj() {
  return /* @__PURE__ */ x.jsx(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      "aria-hidden": "true",
      children: /* @__PURE__ */ x.jsx("path", { d: "M8 5v14l11-7z" })
    }
  );
}
function vj() {
  return /* @__PURE__ */ x.jsx(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      "aria-hidden": "true",
      children: /* @__PURE__ */ x.jsx("rect", { x: "6", y: "6", width: "12", height: "12", rx: "1" })
    }
  );
}
function bj() {
  return /* @__PURE__ */ x.jsx(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      "aria-hidden": "true",
      children: /* @__PURE__ */ x.jsx("circle", { cx: "12", cy: "12", r: "6" })
    }
  );
}
function xj({ data: t, selected: i }) {
  const o = t, { name: r, initial: s, terminal: u, transitionCount: c, simulationRole: d } = o, m = pj(), g = s ? "initial" : u ? "terminal" : "regular", p = () => s ? "Initial" : u ? "Final" : "Regular", v = () => s ? /* @__PURE__ */ x.jsx(yj, {}) : u ? /* @__PURE__ */ x.jsx(vj, {}) : /* @__PURE__ */ x.jsx(bj, {}), b = d === "current-projected" ? "Current + Projected" : d === "current" ? "Current" : d === "projected" ? "Projected" : null, S = i && !m ? " fub-node--selected-animated" : "", N = d ? ` fub-node--simulation-${d}` : "";
  return /* @__PURE__ */ x.jsxs(
    "div",
    {
      className: `fub-node fub-node--${g}${i ? " fub-node--selected" : ""}${S}${N}`,
      "data-node-type": g,
      children: [
        /* @__PURE__ */ x.jsx(
          Oo,
          {
            type: "target",
            position: we.Top,
            className: "fub-node-handle fub-node-handle--target",
            id: "target"
          }
        ),
        /* @__PURE__ */ x.jsxs("div", { className: "fub-node-header", children: [
          /* @__PURE__ */ x.jsx("div", { className: "fub-node-icon", children: v() }),
          /* @__PURE__ */ x.jsx("span", { className: "fub-node-title", children: r || "(unnamed)" }),
          /* @__PURE__ */ x.jsx("span", { className: "fub-node-badge", children: p() })
        ] }),
        /* @__PURE__ */ x.jsxs("div", { className: "fub-node-body", children: [
          b ? /* @__PURE__ */ x.jsx("div", { className: "fub-node-sim-pill", children: b }) : null,
          c !== void 0 && c > 0 ? /* @__PURE__ */ x.jsx("div", { className: "fub-node-meta", children: /* @__PURE__ */ x.jsxs("span", { className: "fub-node-meta-item", children: [
            /* @__PURE__ */ x.jsxs(
              "svg",
              {
                width: "12",
                height: "12",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                "aria-hidden": "true",
                children: [
                  /* @__PURE__ */ x.jsx("path", { d: "M5 12h14" }),
                  /* @__PURE__ */ x.jsx("path", { d: "m12 5 7 7-7 7" })
                ]
              }
            ),
            c,
            " transition",
            c !== 1 ? "s" : ""
          ] }) }) : /* @__PURE__ */ x.jsx("div", { className: "fub-node-meta fub-node-meta--empty", children: /* @__PURE__ */ x.jsx("span", { className: "fub-node-meta-item", children: "No outgoing transitions" }) })
        ] }),
        /* @__PURE__ */ x.jsx(
          Oo,
          {
            type: "source",
            position: we.Bottom,
            className: "fub-node-handle fub-node-handle--source",
            id: "source"
          }
        )
      ]
    }
  );
}
const Sj = $.memo(xj), wj = {
  stateNode: Sj
};
function Ej({
  id: t,
  sourceX: i,
  sourceY: o,
  targetX: r,
  targetY: s,
  sourcePosition: u,
  targetPosition: c,
  label: d,
  selected: m
}) {
  const [y, g, p] = Mh({
    sourceX: i,
    sourceY: o,
    sourcePosition: u,
    targetX: r,
    targetY: s,
    targetPosition: c
  });
  return /* @__PURE__ */ x.jsxs(x.Fragment, { children: [
    /* @__PURE__ */ x.jsx(
      xl,
      {
        id: t,
        path: y,
        className: `fub-edge-path${m ? " fub-edge-path--selected" : ""}`,
        markerEnd: `url(#fub-arrow${m ? "-selected" : ""})`
      }
    ),
    d && /* @__PURE__ */ x.jsx(fA, { children: /* @__PURE__ */ x.jsx(
      "div",
      {
        className: `fub-edge-label${m ? " fub-edge-label--selected" : ""}`,
        style: {
          position: "absolute",
          transform: `translate(-50%, -50%) translate(${g}px,${p}px)`,
          pointerEvents: "all"
        },
        children: d
      }
    ) })
  ] });
}
const _j = {
  custom: Ej
};
function iv(t, i, o, r, s) {
  const u = Array.isArray(t) ? t : [], c = Array.isArray(i) ? i : [];
  if (u.length === 0)
    return { nodes: [], edges: [] };
  const d = {};
  c.forEach((v) => {
    v.from && (d[v.from] = (d[v.from] || 0) + 1);
  });
  const m = /* @__PURE__ */ new Map(), y = $x({
    states: u,
    transitions: c,
    direction: s
  }), g = u.map((v, b) => {
    const S = En(b);
    m.has(v.name) || m.set(v.name, S);
    const N = r.currentStateName === v.name, M = r.projectedStateName === v.name, T = N && M ? "current-projected" : N ? "current" : M ? "projected" : void 0;
    return {
      id: S,
      type: "stateNode",
      position: o[S] ?? y[S] ?? { x: 0, y: 0 },
      data: {
        name: v.name,
        initial: v.initial,
        terminal: v.terminal,
        stateIndex: b,
        transitionCount: d[v.name] || 0,
        simulationRole: T
      }
    };
  }), p = [];
  return c.forEach((v, b) => {
    const S = v.to || v.dynamic_to?.resolver, N = m.get(v.from), M = S ? m.get(S) : void 0;
    !N || !M || p.push({
      id: `edge-${b}`,
      source: N,
      target: M,
      label: v.event || "(event)",
      type: "custom",
      data: {
        transitionIndex: b
      }
    });
  }), { nodes: g, edges: p };
}
function Nj(t) {
  const i = Se((E) => E.document), o = i.definition, r = Se((E) => E.selection), s = Se((E) => E.setSelection), u = Se((E) => E.addState), c = Se((E) => E.addStateFromPalette), d = Se((E) => E.setGraphNodePosition), m = Se((E) => E.setGraphNodePositions), y = Dt((E) => E.projectedOutcome), g = Dt((E) => E.snapshotResult), p = Ye((E) => E.canvasZoom), v = Ye((E) => E.zoomCanvas), b = !!t.readOnly, S = o.states, N = o.transitions, M = $.useRef(null), T = Fu(), [O, _] = $.useState(!1), [C, k] = $.useState("TB"), L = $.useMemo(() => ({
    currentStateName: y?.previousState || g?.currentState,
    projectedStateName: y?.currentState
  }), [y, g]), H = !!(y || g), I = $.useMemo(() => vu(i.ui_schema), [i.ui_schema]), { nodes: ee, edges: Q } = $.useMemo(
    () => iv(S, N, I, L, C),
    [S, N, I, L, C]
  ), [X, J, G] = dA(ee), [j, Y, A] = hA(Q);
  $.useEffect(() => {
    const { nodes: E, edges: U } = iv(
      S,
      N,
      I,
      L,
      C
    );
    J(E), Y(U);
  }, [S, N, I, L, C, J, Y]), $.useEffect(() => {
    if (r.kind === "state") {
      const E = En(r.stateIndex);
      J(
        (U) => U.map((F) => ({
          ...F,
          selected: F.id === E
        }))
      ), Y(
        (U) => U.map((F) => ({
          ...F,
          selected: !1
        }))
      );
    } else if (r.kind === "transition" || r.kind === "workflow-node") {
      const E = r.transitionIndex;
      J(
        (U) => U.map((F) => ({
          ...F,
          selected: !1
        }))
      ), Y(
        (U) => U.map((F) => {
          const K = F.data;
          return {
            ...F,
            selected: K?.transitionIndex === E
          };
        })
      );
    } else
      J(
        (E) => E.map((U) => ({
          ...U,
          selected: !1
        }))
      ), Y(
        (E) => E.map((U) => ({
          ...U,
          selected: !1
        }))
      );
  }, [r, J, Y]);
  const z = $.useCallback(
    (E) => {
      G(E);
      for (const U of E)
        if (U.type === "select" && U.selected) {
          const K = X.find((Z) => Z.id === U.id)?.data;
          K?.stateIndex !== void 0 && s({ kind: "state", stateIndex: K.stateIndex });
        }
    },
    [X, G, s]
  ), q = $.useCallback(
    (E) => {
      A(E);
      for (const U of E)
        if (U.type === "select" && U.selected) {
          const K = j.find((Z) => Z.id === U.id)?.data;
          K?.transitionIndex !== void 0 && s({ kind: "transition", transitionIndex: K.transitionIndex });
        }
    },
    [j, A, s]
  ), W = $.useCallback(
    (E, U) => {
      if (b)
        return;
      const F = U.data;
      typeof F?.stateIndex == "number" && d(F.stateIndex, U.position);
    },
    [b, d]
  ), te = $.useCallback(() => {
    if (b || S.length === 0)
      return;
    const E = $x({
      states: S,
      transitions: N,
      direction: C
    });
    m(E);
  }, [C, b, m, S, N]), D = $.useCallback(
    (E, U) => {
      const F = U.zoom - p;
      Math.abs(F) > 0.01 && v(F);
    },
    [p, v]
  ), V = $.useCallback(
    (E) => {
      b || (E.preventDefault(), E.dataTransfer.dropEffect = "move", _(!0));
    },
    [b]
  ), ne = $.useCallback(
    (E) => {
      const U = E.relatedTarget;
      (!U || !E.currentTarget.contains(U)) && _(!1);
    },
    []
  ), B = $.useCallback(
    (E) => {
      if (b) return;
      E.preventDefault(), _(!1);
      const U = E.dataTransfer.getData("application/reactflow");
      if (!U) return;
      let F;
      try {
        F = JSON.parse(U);
      } catch {
        return;
      }
      if (F.type !== "state")
        return;
      const K = T.screenToFlowPosition({
        x: E.clientX,
        y: E.clientY
      }), Z = F.defaults?.initial ? "initial" : F.defaults?.terminal ? "final" : "state";
      c({
        namePrefix: Z,
        initial: F.defaults?.initial,
        terminal: F.defaults?.terminal,
        position: K
      });
    },
    [
      b,
      T,
      c
    ]
  );
  return /* @__PURE__ */ x.jsxs(
    "section",
    {
      className: `fub-panel fub-canvas${H ? " fub-canvas--simulation" : ""}`,
      "aria-label": "Canvas panel",
      role: "region",
      "aria-labelledby": "fub-panel-canvas-heading",
      id: "fub-panel-canvas",
      tabIndex: -1,
      children: [
        /* @__PURE__ */ x.jsxs("div", { className: "fub-panel-header", id: "fub-panel-canvas-heading", children: [
          /* @__PURE__ */ x.jsx("strong", { children: "Canvas" }),
          /* @__PURE__ */ x.jsxs("div", { className: "fub-inline-actions", children: [
            /* @__PURE__ */ x.jsx("span", { className: "fub-muted", children: "Graph + workflow overview" }),
            /* @__PURE__ */ x.jsxs("span", { className: "fub-badge fub-canvas-zoom", "aria-live": "polite", children: [
              "Zoom: ",
              Math.round(p * 100),
              "%"
            ] }),
            /* @__PURE__ */ x.jsxs(
              "select",
              {
                "aria-label": "Auto layout direction",
                className: "fub-input fub-canvas-layout-direction",
                value: C,
                disabled: b,
                onChange: (E) => {
                  const U = E.target.value;
                  k(U === "LR" ? "LR" : "TB");
                },
                children: [
                  /* @__PURE__ */ x.jsx("option", { value: "TB", children: "Top-Bottom" }),
                  /* @__PURE__ */ x.jsx("option", { value: "LR", children: "Left-Right" })
                ]
              }
            ),
            /* @__PURE__ */ x.jsx("button", { type: "button", className: "fub-mini-btn", onClick: te, disabled: b || S.length < 2, children: "Auto layout" }),
            H ? /* @__PURE__ */ x.jsx("span", { className: "fub-badge fub-badge-simulation", children: "Simulation mode" }) : null,
            b ? /* @__PURE__ */ x.jsx("span", { className: "fub-badge", children: "Read-only" }) : null
          ] })
        ] }),
        /* @__PURE__ */ x.jsxs(
          "div",
          {
            ref: M,
            className: `fub-panel-body fub-canvas-flow-container${O ? " fub-canvas-drop-target" : ""}`,
            onDragOver: V,
            onDragLeave: ne,
            onDrop: B,
            children: [
              O && /* @__PURE__ */ x.jsx("div", { className: "fub-canvas-drop-indicator", children: /* @__PURE__ */ x.jsxs("div", { className: "fub-canvas-drop-indicator-content", children: [
                /* @__PURE__ */ x.jsxs(
                  "svg",
                  {
                    width: "24",
                    height: "24",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    "aria-hidden": "true",
                    children: [
                      /* @__PURE__ */ x.jsx("path", { d: "M12 5v14" }),
                      /* @__PURE__ */ x.jsx("path", { d: "M5 12h14" })
                    ]
                  }
                ),
                /* @__PURE__ */ x.jsx("span", { children: "Drop to add state" })
              ] }) }),
              S.length === 0 ? /* @__PURE__ */ x.jsxs("div", { className: "fub-empty-state", role: "status", "aria-live": "polite", children: [
                /* @__PURE__ */ x.jsx("div", { className: "fub-empty-icon", "aria-hidden": "true", children: "< >" }),
                /* @__PURE__ */ x.jsx("h3", { children: "No states yet" }),
                /* @__PURE__ */ x.jsx("p", { children: "Create your first state to start building your machine." }),
                /* @__PURE__ */ x.jsx(
                  "button",
                  {
                    type: "button",
                    className: "fub-btn",
                    onClick: u,
                    disabled: b,
                    children: "Create first state"
                  }
                ),
                /* @__PURE__ */ x.jsxs("p", { className: "fub-muted", children: [
                  "Hint: press ",
                  /* @__PURE__ */ x.jsx("kbd", { children: "N" }),
                  " to add a state, or drag from the palette."
                ] })
              ] }) : /* @__PURE__ */ x.jsxs(
                uA,
                {
                  nodes: X,
                  edges: j,
                  onNodesChange: z,
                  onEdgesChange: q,
                  onNodeDragStop: W,
                  onMoveEnd: D,
                  nodeTypes: wj,
                  edgeTypes: _j,
                  defaultViewport: { x: 50, y: 50, zoom: p },
                  fitView: !0,
                  fitViewOptions: { padding: 0.2 },
                  proOptions: { hideAttribution: !0 },
                  nodesDraggable: !b,
                  nodesConnectable: !1,
                  elementsSelectable: !0,
                  selectNodesOnDrag: !1,
                  panOnDrag: !0,
                  zoomOnScroll: !0,
                  minZoom: 0.1,
                  maxZoom: 2,
                  className: "fub-flow-canvas",
                  children: [
                    /* @__PURE__ */ x.jsx("svg", { style: { position: "absolute", width: 0, height: 0 }, children: /* @__PURE__ */ x.jsxs("defs", { children: [
                      /* @__PURE__ */ x.jsx(
                        "marker",
                        {
                          id: "fub-arrow",
                          viewBox: "0 0 10 10",
                          refX: "10",
                          refY: "5",
                          markerWidth: "6",
                          markerHeight: "6",
                          orient: "auto-start-reverse",
                          children: /* @__PURE__ */ x.jsx(
                            "path",
                            {
                              d: "M 0 0 L 10 5 L 0 10 z",
                              fill: "var(--fub-edge-color, #4b5563)",
                              className: "fub-arrow-path"
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ x.jsx(
                        "marker",
                        {
                          id: "fub-arrow-selected",
                          viewBox: "0 0 10 10",
                          refX: "10",
                          refY: "5",
                          markerWidth: "6",
                          markerHeight: "6",
                          orient: "auto-start-reverse",
                          children: /* @__PURE__ */ x.jsx(
                            "path",
                            {
                              d: "M 0 0 L 10 5 L 0 10 z",
                              fill: "var(--fub-accent)",
                              className: "fub-arrow-path--selected"
                            }
                          )
                        }
                      )
                    ] }) }),
                    /* @__PURE__ */ x.jsx(
                      vA,
                      {
                        variant: ui.Dots,
                        gap: 20,
                        size: 1,
                        color: "var(--fub-border)"
                      }
                    ),
                    /* @__PURE__ */ x.jsx(
                      NA,
                      {
                        showZoom: !0,
                        showFitView: !0,
                        showInteractive: !1,
                        className: "fub-flow-controls"
                      }
                    ),
                    /* @__PURE__ */ x.jsx(
                      IA,
                      {
                        nodeStrokeColor: "var(--fub-border)",
                        nodeColor: (E) => {
                          const U = E.data;
                          return E.selected ? "var(--fub-accent)" : U?.initial ? "var(--fub-accent-muted)" : U?.terminal ? "var(--fub-warn)" : "var(--fub-bg-2)";
                        },
                        maskColor: "rgba(15, 20, 24, 0.7)",
                        className: "fub-flow-minimap"
                      }
                    )
                  ]
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function av(t) {
  return /* @__PURE__ */ x.jsx(Ix, { children: /* @__PURE__ */ x.jsx(Nj, { ...t }) });
}
function ov() {
  const t = Se((d) => d.diagnostics), i = Se((d) => d.focusDiagnostic), o = Dt((d) => d.log), r = Dt((d) => d.projectedOutcome), s = Dt((d) => d.blockedTransitions), u = Dt((d) => d.errors), c = Dt((d) => d.clear);
  return /* @__PURE__ */ x.jsxs(
    "section",
    {
      className: "fub-panel fub-console",
      "aria-label": "Console panel",
      role: "region",
      "aria-labelledby": "fub-panel-console-heading",
      id: "fub-panel-console",
      tabIndex: -1,
      children: [
        /* @__PURE__ */ x.jsxs("div", { className: "fub-panel-header", id: "fub-panel-console-heading", children: [
          /* @__PURE__ */ x.jsx("strong", { children: "Console" }),
          /* @__PURE__ */ x.jsxs("div", { className: "fub-inline-actions", children: [
            /* @__PURE__ */ x.jsx("span", { className: "fub-muted", children: "Problems + simulation output" }),
            /* @__PURE__ */ x.jsx(
              "button",
              {
                type: "button",
                className: "fub-mini-btn",
                onClick: c,
                "aria-label": "Clear console output",
                children: "Clear"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ x.jsxs("div", { className: "fub-console-grid", children: [
          /* @__PURE__ */ x.jsxs("section", { children: [
            /* @__PURE__ */ x.jsx("h3", { children: "Problems" }),
            /* @__PURE__ */ x.jsxs("ul", { children: [
              t.length === 0 ? /* @__PURE__ */ x.jsx("li", { className: "fub-muted", children: "No diagnostics." }) : null,
              t.map((d, m) => /* @__PURE__ */ x.jsx("li", { children: /* @__PURE__ */ x.jsxs(
                "button",
                {
                  type: "button",
                  className: "fub-list-item",
                  onClick: () => {
                    i(d), (typeof window.requestAnimationFrame == "function" ? window.requestAnimationFrame.bind(window) : (g) => window.setTimeout(g, 0))(() => {
                      document.getElementById("fub-panel-inspector")?.focus();
                    });
                  },
                  children: [
                    /* @__PURE__ */ x.jsx("strong", { children: d.code }),
                    " ",
                    d.message
                  ]
                }
              ) }, `${d.code}-${d.path}-${m}`))
            ] })
          ] }),
          /* @__PURE__ */ x.jsxs("section", { children: [
            /* @__PURE__ */ x.jsx("h3", { children: "Simulation" }),
            r ? /* @__PURE__ */ x.jsxs("div", { className: "fub-console-card", "aria-label": "Projected outcome", children: [
              /* @__PURE__ */ x.jsx("strong", { children: "Projected outcome" }),
              /* @__PURE__ */ x.jsxs("div", { children: [
                "Event: ",
                /* @__PURE__ */ x.jsx("code", { children: r.event })
              ] }),
              r.selectedTransitionID ? /* @__PURE__ */ x.jsxs("div", { children: [
                "Transition: ",
                /* @__PURE__ */ x.jsx("code", { children: r.selectedTransitionID })
              ] }) : null,
              /* @__PURE__ */ x.jsxs("div", { children: [
                "State: ",
                /* @__PURE__ */ x.jsx("code", { children: r.previousState }),
                " -> ",
                /* @__PURE__ */ x.jsx("code", { children: r.currentState })
              ] }),
              /* @__PURE__ */ x.jsxs("div", { children: [
                "Status: ",
                /* @__PURE__ */ x.jsx("code", { children: r.status })
              ] })
            ] }) : /* @__PURE__ */ x.jsx("p", { className: "fub-muted", children: "No dry-run projected outcome yet." }),
            /* @__PURE__ */ x.jsxs("div", { className: "fub-console-card", "aria-label": "Blocked transitions", children: [
              /* @__PURE__ */ x.jsx("strong", { children: "Blocked transitions" }),
              s.length === 0 ? /* @__PURE__ */ x.jsx("p", { className: "fub-muted", children: "No blocked transitions in latest snapshot." }) : null,
              /* @__PURE__ */ x.jsx("ul", { children: s.map((d) => /* @__PURE__ */ x.jsxs("li", { children: [
                /* @__PURE__ */ x.jsxs("div", { children: [
                  /* @__PURE__ */ x.jsx("code", { children: d.id || "(transition)" }),
                  " event ",
                  /* @__PURE__ */ x.jsx("code", { children: d.event })
                ] }),
                /* @__PURE__ */ x.jsx("ul", { children: (d.rejections ?? []).map((m, y) => /* @__PURE__ */ x.jsxs("li", { children: [
                  /* @__PURE__ */ x.jsx("strong", { children: m.code }),
                  ": ",
                  m.message,
                  m.remediationHint ? ` (${m.remediationHint})` : ""
                ] }, `${d.id}-rejection-${y}`)) })
              ] }, d.id || d.event)) })
            ] }),
            /* @__PURE__ */ x.jsxs("div", { className: "fub-console-card", "aria-label": "Runtime and authoring errors", children: [
              /* @__PURE__ */ x.jsx("strong", { children: "Runtime/authoring errors" }),
              u.length === 0 ? /* @__PURE__ */ x.jsx("p", { className: "fub-muted", children: "No runtime/authoring errors." }) : null,
              /* @__PURE__ */ x.jsx("ul", { children: u.map((d) => /* @__PURE__ */ x.jsxs("li", { className: "fub-log-error", children: [
                "[",
                d.code,
                "] ",
                d.method ? `${d.method}: ` : "",
                d.message
              ] }, d.id)) })
            ] }),
            /* @__PURE__ */ x.jsxs("ul", { role: "log", "aria-live": "polite", "aria-label": "Simulation log", children: [
              o.length === 0 ? /* @__PURE__ */ x.jsx("li", { className: "fub-muted", children: "No simulation runs yet." }) : null,
              o.map((d) => /* @__PURE__ */ x.jsxs("li", { className: `fub-log-${d.level}`, children: [
                "[",
                d.timestamp,
                "] ",
                d.message
              ] }, d.id))
            ] })
          ] })
        ] })
      ]
    }
  );
}
function Cj(t, i, o) {
  const r = new Array(t);
  return new Proxy(r, {
    get(s, u, c) {
      if (typeof u == "string") {
        const d = u.charCodeAt(0);
        if (d >= 48 && d <= 57) {
          const m = +u;
          if (Number.isInteger(m) && m >= 0 && m < t) {
            let y = s[m];
            if (!y) {
              const g = i[m * 2];
              y = s[m] = {
                index: m,
                key: o(m),
                start: g,
                size: i[m * 2 + 1],
                end: g + i[m * 2 + 1],
                lane: 0
              };
            }
            return y;
          }
        }
        if (u === "length") return t;
      }
      return Reflect.get(s, u, c);
    }
  });
}
function vo(t, i, o) {
  let r = o.initialDeps ?? [], s, u = !0;
  function c() {
    const d = t();
    return (d.length !== r.length || d.some((y, g) => r[g] !== y)) && (r = d, s = i(...d), o?.onChange && !(u && o.skipInitialOnChange) && o.onChange(s), u = !1), s;
  }
  return c.updateDeps = (d) => {
    r = d;
  }, c;
}
function rv(t, i) {
  if (t === void 0)
    throw new Error("Unexpected undefined");
  return t;
}
const Mj = (t, i) => Math.abs(t - i) < 1.01, Tj = (t, i, o) => {
  let r;
  return function(...s) {
    t.clearTimeout(r), r = t.setTimeout(() => i.apply(this, s), o);
  };
};
let Hr;
const zd = () => {
  if (Hr !== void 0) return Hr;
  if (typeof navigator > "u") return Hr = !1;
  if (/iP(hone|od|ad)/.test(navigator.userAgent)) return Hr = !0;
  const t = navigator.maxTouchPoints;
  return Hr = navigator.platform === "MacIntel" && t !== void 0 && t > 0;
}, lv = (t) => {
  const { offsetWidth: i, offsetHeight: o } = t;
  return { width: i, height: o };
}, Aj = (t) => t, jj = (t) => {
  const i = Math.max(t.startIndex - t.overscan, 0), r = Math.min(t.endIndex + t.overscan, t.count - 1) - i + 1, s = new Array(r);
  for (let u = 0; u < r; u++)
    s[u] = i + u;
  return s;
}, Dj = (t, i) => {
  const o = t.scrollElement;
  if (!o)
    return;
  const r = t.targetWindow;
  if (!r)
    return;
  const s = (c) => {
    const { width: d, height: m } = c;
    i({ width: Math.round(d), height: Math.round(m) });
  };
  if (s(lv(o)), !r.ResizeObserver)
    return () => {
    };
  const u = new r.ResizeObserver((c) => {
    const d = () => {
      const m = c[0];
      if (m?.borderBoxSize) {
        const y = m.borderBoxSize[0];
        if (y) {
          s({ width: y.inlineSize, height: y.blockSize });
          return;
        }
      }
      s(lv(o));
    };
    t.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(d) : d();
  });
  return u.observe(o, { box: "border-box" }), () => {
    u.unobserve(o);
  };
}, zu = {
  passive: !0
}, Oj = typeof window > "u" ? !0 : "onscrollend" in window, zj = (t, i, o) => {
  const r = t.scrollElement;
  if (!r)
    return;
  const s = t.targetWindow;
  if (!s)
    return;
  const u = t.options.useScrollendEvent && Oj;
  let c = 0;
  const d = u ? null : Tj(
    s,
    () => i(c, !1),
    t.options.isScrollingResetDelay
  ), m = (p) => () => {
    c = o(r), d?.(), i(c, p);
  }, y = m(!0), g = m(!1);
  return r.addEventListener("scroll", y, zu), u && r.addEventListener("scrollend", g, zu), () => {
    r.removeEventListener("scroll", y), u && r.removeEventListener("scrollend", g);
  };
}, Rj = (t, i) => zj(t, i, (o) => {
  const { horizontal: r, isRtl: s } = t.options;
  return r ? o.scrollLeft * (s && -1 || 1) : o.scrollTop;
}), kj = (t, i, o) => {
  if (o.options.useCachedMeasurements) {
    const r = o.indexFromElement(t), s = o.options.getItemKey(r);
    return o.itemSizeCache.get(s) ?? o.options.estimateSize(r);
  }
  if (i?.borderBoxSize) {
    const r = i.borderBoxSize[0];
    if (r)
      return Math.round(
        r[o.options.horizontal ? "inlineSize" : "blockSize"]
      );
  }
  if (!i) {
    const r = o.indexFromElement(t), s = o.options.getItemKey(r), u = o.itemSizeCache.get(s);
    if (u !== void 0)
      return u;
  }
  return t[o.options.horizontal ? "offsetWidth" : "offsetHeight"];
}, Hj = (t, {
  adjustments: i = 0,
  behavior: o
}, r) => {
  var s, u;
  (u = (s = r.scrollElement) == null ? void 0 : s.scrollTo) == null || u.call(s, {
    [r.options.horizontal ? "left" : "top"]: t + i,
    behavior: o
  });
}, Lj = Hj;
class Bj {
  constructor(i) {
    this.unsubs = [], this.scrollElement = null, this.targetWindow = null, this.isScrolling = !1, this.scrollState = null, this.measurementsCache = [], this._flatMeasurements = null, this.itemSizeCache = /* @__PURE__ */ new Map(), this.itemSizeCacheVersion = 0, this.laneAssignments = /* @__PURE__ */ new Map(), this.pendingMin = null, this.prevLanes = void 0, this.lanesChangedFlag = !1, this.lanesSettling = !1, this.pendingScrollAnchor = null, this.scrollRect = null, this.scrollOffset = null, this.scrollDirection = null, this.scrollAdjustments = 0, this._iosDeferredAdjustment = 0, this._iosTouching = !1, this._iosJustTouchEnded = !1, this._iosTouchEndTimerId = null, this._intendedScrollOffset = null, this.elementsCache = /* @__PURE__ */ new Map(), this.now = () => {
      var o, r, s;
      return ((s = (r = (o = this.targetWindow) == null ? void 0 : o.performance) == null ? void 0 : r.now) == null ? void 0 : s.call(r)) ?? Date.now();
    }, this.observer = /* @__PURE__ */ (() => {
      let o = null;
      const r = () => o || (!this.targetWindow || !this.targetWindow.ResizeObserver ? null : o = new this.targetWindow.ResizeObserver((s) => {
        s.forEach((u) => {
          const c = () => {
            const d = u.target, m = this.indexFromElement(d);
            if (!d.isConnected) {
              this.observer.unobserve(d);
              for (const [y, g] of this.elementsCache)
                if (g === d) {
                  this.elementsCache.delete(y);
                  break;
                }
              return;
            }
            this.shouldMeasureDuringScroll(m) && this.resizeItem(
              m,
              this.options.measureElement(d, u, this)
            );
          };
          this.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(c) : c();
        });
      }));
      return {
        disconnect: () => {
          var s;
          (s = r()) == null || s.disconnect(), o = null;
        },
        observe: (s) => {
          var u;
          return (u = r()) == null ? void 0 : u.observe(s, { box: "border-box" });
        },
        unobserve: (s) => {
          var u;
          return (u = r()) == null ? void 0 : u.unobserve(s);
        }
      };
    })(), this.range = null, this.setOptions = (o) => {
      var r, s;
      const u = {
        debug: !1,
        initialOffset: 0,
        overscan: 1,
        paddingStart: 0,
        paddingEnd: 0,
        scrollPaddingStart: 0,
        scrollPaddingEnd: 0,
        horizontal: !1,
        getItemKey: Aj,
        rangeExtractor: jj,
        onChange: () => {
        },
        measureElement: kj,
        initialRect: { width: 0, height: 0 },
        scrollMargin: 0,
        gap: 0,
        indexAttribute: "data-index",
        initialMeasurementsCache: [],
        lanes: 1,
        anchorTo: "start",
        followOnAppend: !1,
        scrollEndThreshold: 1,
        isScrollingResetDelay: 150,
        enabled: !0,
        isRtl: !1,
        useScrollendEvent: !1,
        useAnimationFrameWithResizeObserver: !1,
        laneAssignmentMode: "estimate",
        useCachedMeasurements: !1
      };
      for (const v in o) {
        const b = o[v];
        b !== void 0 && (u[v] = b);
      }
      const c = this.options;
      let d = null, m = null, y = !1;
      if (c !== void 0 && c.enabled && u.enabled && u.anchorTo === "end" && this.scrollElement !== null) {
        const v = c.count, b = u.count, S = this.getMeasurements(), N = v > 0 ? ((r = S[0]) == null ? void 0 : r.key) ?? c.getItemKey(0) : null, M = v > 0 ? ((s = S[v - 1]) == null ? void 0 : s.key) ?? c.getItemKey(v - 1) : null;
        if (b !== v || v > 0 && b > 0 && (u.getItemKey(0) !== N || u.getItemKey(b - 1) !== M)) {
          y = !0;
          const _ = v > 0 ? this.getVirtualItemForOffset(this.getScrollOffset()) ?? S[0] : null;
          _ && (d = [_.key, this.getScrollOffset() - _.start]);
          const C = u.followOnAppend === !0 ? "auto" : u.followOnAppend || null;
          C && b > v && this.isAtEnd(c.scrollEndThreshold) && (v === 0 || u.getItemKey(b - 1) !== M) && (m = C);
        }
      }
      this.options = u, y && (this.pendingMin = 0, this.itemSizeCacheVersion++);
      let g = !1, p = 0;
      if (d && this.scrollOffset !== null) {
        const [v, b] = d, S = this.getMeasurements(), { count: N, getItemKey: M } = this.options;
        let T = 0;
        for (; T < N && M(T) !== v; )
          T++;
        if (T < N) {
          const O = S[T];
          if (O) {
            const _ = Math.max(0, O.start + b);
            _ !== this.scrollOffset && (p = _ - this.scrollOffset, this.scrollOffset = _, g = !0);
          }
        }
      }
      (g || m) && (this.pendingScrollAnchor = [
        g ? d[0] : null,
        g ? d[1] : 0,
        m,
        p
      ]);
    }, this.notify = (o) => {
      var r, s;
      (s = (r = this.options).onChange) == null || s.call(r, this, o);
    }, this.maybeNotify = vo(
      () => (this.calculateRange(), [
        this.isScrolling,
        this.range ? this.range.startIndex : null,
        this.range ? this.range.endIndex : null
      ]),
      (o) => {
        this.notify(o);
      },
      {
        key: !1,
        debug: () => this.options.debug,
        initialDeps: [
          this.isScrolling,
          this.range ? this.range.startIndex : null,
          this.range ? this.range.endIndex : null
        ]
      }
    ), this.cleanup = () => {
      this.unsubs.filter(Boolean).forEach((o) => o()), this.unsubs = [], this.observer.disconnect(), this.rafId != null && this.targetWindow && (this.targetWindow.cancelAnimationFrame(this.rafId), this.rafId = null), this.scrollState = null, this._iosDeferredAdjustment = 0, this._iosTouching = !1, this._iosJustTouchEnded = !1, this.scrollElement = null, this.targetWindow = null;
    }, this._didMount = () => () => {
      this.cleanup();
    }, this._willUpdate = () => {
      var o;
      const r = this.options.enabled ? this.options.getScrollElement() : null;
      if (this.scrollElement !== r) {
        if (this.cleanup(), !r) {
          this.maybeNotify();
          return;
        }
        if (this.scrollElement = r, this.scrollElement && "ownerDocument" in this.scrollElement ? this.targetWindow = this.scrollElement.ownerDocument.defaultView : this.targetWindow = ((o = this.scrollElement) == null ? void 0 : o.window) ?? null, this.elementsCache.forEach((u) => {
          this.observer.observe(u);
        }), this.unsubs.push(
          this.options.observeElementRect(this, (u) => {
            this.scrollRect = u, this.maybeNotify();
          })
        ), this.unsubs.push(
          this.options.observeElementOffset(this, (u, c) => {
            if (c && this._intendedScrollOffset === null && u === this.scrollOffset)
              return;
            this._intendedScrollOffset !== null && Math.abs(u - this._intendedScrollOffset) < 1.5 && (u = this._intendedScrollOffset), this._intendedScrollOffset = null, this.scrollAdjustments = 0;
            const d = this.getScrollOffset();
            this.scrollDirection = c ? d === u ? this.scrollDirection : d < u ? "forward" : "backward" : null, this.scrollOffset = u, this.isScrolling = c, this._flushIosDeferredIfReady(), this.scrollState && this.scheduleScrollReconcile(), this.maybeNotify();
          })
        ), "addEventListener" in this.scrollElement) {
          const u = this.scrollElement, c = () => {
            this._iosTouching = !0, this._iosJustTouchEnded = !1, this._iosTouchEndTimerId !== null && this.targetWindow != null && (this.targetWindow.clearTimeout(this._iosTouchEndTimerId), this._iosTouchEndTimerId = null);
          }, d = () => {
            this._iosTouching = !1, !(!zd() || this.targetWindow == null) && (this._iosJustTouchEnded = !0, this._iosTouchEndTimerId = this.targetWindow.setTimeout(() => {
              this._iosJustTouchEnded = !1, this._iosTouchEndTimerId = null, this._flushIosDeferredIfReady();
            }, 150));
          };
          u.addEventListener(
            "touchstart",
            c,
            zu
          ), u.addEventListener(
            "touchend",
            d,
            zu
          ), this.unsubs.push(() => {
            u.removeEventListener("touchstart", c), u.removeEventListener("touchend", d), this._iosTouchEndTimerId !== null && this.targetWindow != null && (this.targetWindow.clearTimeout(this._iosTouchEndTimerId), this._iosTouchEndTimerId = null);
          });
        }
        this._scrollToOffset(this.getScrollOffset(), {
          adjustments: void 0,
          behavior: void 0
        });
      }
      const s = this.pendingScrollAnchor;
      if (this.pendingScrollAnchor = null, s && this.scrollElement && this.options.enabled) {
        const [u, c, d, m] = s;
        u !== null && !d && (zd() && (this.isScrolling || this._iosTouching || this._iosJustTouchEnded) ? m !== 0 && (this._iosDeferredAdjustment += m) : this._scrollToOffset(this.getScrollOffset(), {
          adjustments: void 0,
          behavior: void 0
        })), d && this.scrollToEnd({ behavior: d });
      }
    }, this._flushIosDeferredIfReady = () => {
      if (this._iosDeferredAdjustment === 0 || this.isScrolling || this._iosTouching || this._iosJustTouchEnded) return;
      const o = this.getScrollOffset(), r = this.getMaxScrollOffset();
      if (o < 0 || o > r) return;
      if (this._iosDeferredAdjustment < 0 && o >= r - 1) {
        this._iosDeferredAdjustment = 0;
        return;
      }
      const s = this._iosDeferredAdjustment;
      this._iosDeferredAdjustment = 0, this._scrollToOffset(o, {
        adjustments: this.scrollAdjustments += s,
        behavior: void 0
      });
    }, this.rafId = null, this.getSize = () => this.options.enabled ? (this.scrollRect = this.scrollRect ?? this.options.initialRect, this.scrollRect[this.options.horizontal ? "width" : "height"]) : (this.scrollRect = null, 0), this.getScrollOffset = () => this.options.enabled ? (this.scrollOffset = this.scrollOffset ?? (typeof this.options.initialOffset == "function" ? this.options.initialOffset() : this.options.initialOffset), this.scrollOffset) : (this.scrollOffset = null, 0), this.getMeasurementOptions = vo(
      () => [
        this.options.count,
        this.options.paddingStart,
        this.options.scrollMargin,
        this.options.getItemKey,
        this.options.enabled,
        this.options.lanes,
        this.options.laneAssignmentMode,
        this.options.gap
      ],
      (o, r, s, u, c, d, m, y) => (this.prevLanes !== void 0 && this.prevLanes !== d && (this.lanesChangedFlag = !0), this.prevLanes = d, this.pendingMin = null, {
        count: o,
        paddingStart: r,
        scrollMargin: s,
        getItemKey: u,
        enabled: c,
        lanes: d,
        laneAssignmentMode: m,
        gap: y
      }),
      {
        key: !1
      }
    ), this.getMeasurements = vo(
      () => [this.getMeasurementOptions(), this.itemSizeCacheVersion],
      ({
        count: o,
        paddingStart: r,
        scrollMargin: s,
        getItemKey: u,
        enabled: c,
        lanes: d,
        laneAssignmentMode: m,
        gap: y
      }, g) => {
        const p = this.itemSizeCache;
        if (!c)
          return this.measurementsCache = [], this.itemSizeCache.clear(), this.laneAssignments.clear(), [];
        if (this.laneAssignments.size > o)
          for (const T of this.laneAssignments.keys())
            T >= o && this.laneAssignments.delete(T);
        this.lanesChangedFlag && (this.lanesChangedFlag = !1, this.lanesSettling = !0, this.measurementsCache = [], this.itemSizeCache.clear(), this.laneAssignments.clear(), this.pendingMin = null), this.measurementsCache.length === 0 && !this.lanesSettling && (this.measurementsCache = this.options.initialMeasurementsCache, this.measurementsCache.forEach((T) => {
          this.itemSizeCache.set(T.key, T.size);
        }));
        const v = this.lanesSettling ? 0 : this.pendingMin ?? 0;
        if (this.pendingMin = null, this.lanesSettling && this.measurementsCache.length === o && (this.lanesSettling = !1), d === 1) {
          const T = o * 2;
          let O = this._flatMeasurements;
          if (!O || O.length < T) {
            const k = new Float64Array(T);
            O && v > 0 && k.set(O.subarray(0, v * 2)), O = k, this._flatMeasurements = O;
          }
          let _;
          if (v === 0)
            _ = r + s;
          else {
            const k = v - 1;
            _ = O[k * 2] + O[k * 2 + 1] + y;
          }
          for (let k = v; k < o; k++) {
            const L = u(k), H = p.get(L), I = typeof H == "number" ? H : this.options.estimateSize(k);
            O[k * 2] = _, O[k * 2 + 1] = I, _ += I + y;
          }
          const C = Cj(o, O, u);
          return this.measurementsCache = C, C;
        }
        const b = this.measurementsCache.slice(0, v), S = new Array(d).fill(
          void 0
        ), N = new Float64Array(d);
        let M = 0;
        for (let T = 0; T < v; T++) {
          const O = b[T];
          O && (S[O.lane] === void 0 && M++, S[O.lane] = T, N[O.lane] = O.end);
        }
        for (let T = v; T < o; T++) {
          const O = u(T), _ = this.laneAssignments.get(T);
          let C, k;
          const L = m === "estimate" || p.has(O);
          if (_ !== void 0 && this.options.lanes > 1) {
            C = _;
            const Q = S[C], X = Q !== void 0 ? b[Q] : void 0;
            k = X ? X.end + y : r + s;
          } else if (M === d) {
            let Q = 0, X = N[0], J = S[0];
            for (let G = 1; G < d; G++) {
              const j = N[G];
              (j < X || j === X && S[G] < J) && (Q = G, X = j, J = S[G]);
            }
            C = Q, k = X + y, L && this.laneAssignments.set(T, C);
          } else
            C = T % this.options.lanes, k = r + s, L && this.laneAssignments.set(T, C);
          const H = p.get(O), I = typeof H == "number" ? H : this.options.estimateSize(T), ee = k + I;
          b[T] = {
            index: T,
            start: k,
            size: I,
            end: ee,
            key: O,
            lane: C
          }, S[C] === void 0 && M++, S[C] = T, N[C] = ee;
        }
        return this.measurementsCache = b, b;
      },
      {
        key: !1,
        debug: () => this.options.debug
      }
    ), this.calculateRange = vo(
      () => [
        this.getMeasurements(),
        this.getSize(),
        this.getScrollOffset(),
        this.options.lanes
      ],
      (o, r, s, u) => o.length === 0 || r === 0 ? (this.range = null, null) : (this.range = Vj(
        o,
        r,
        s,
        u,
        // Pass the typed array so binary search + forward-walk can read
        // start/end directly from Float64Array, skipping the Proxy traps.
        u === 1 && this._flatMeasurements != null ? this._flatMeasurements : null
      ), this.range),
      {
        key: !1,
        debug: () => this.options.debug
      }
    ), this.getVirtualIndexes = vo(
      () => {
        let o = null, r = null;
        const s = this.calculateRange();
        return s && (o = s.startIndex, r = s.endIndex), this.maybeNotify.updateDeps([this.isScrolling, o, r]), [
          this.options.rangeExtractor,
          this.options.overscan,
          this.options.count,
          o,
          r
        ];
      },
      (o, r, s, u, c) => u === null || c === null ? [] : o({
        startIndex: u,
        endIndex: c,
        overscan: r,
        count: s
      }),
      {
        key: !1,
        debug: () => this.options.debug
      }
    ), this.indexFromElement = (o) => {
      const r = this.options.indexAttribute, s = o.getAttribute(r);
      return s ? parseInt(s, 10) : (console.warn(
        `Missing attribute name '${r}={index}' on measured element.`
      ), -1);
    }, this.shouldMeasureDuringScroll = (o) => {
      var r;
      if (!this.scrollState || this.scrollState.behavior !== "smooth")
        return !0;
      const s = this.scrollState.index ?? ((r = this.getVirtualItemForOffset(this.scrollState.lastTargetOffset)) == null ? void 0 : r.index);
      if (s !== void 0 && this.range) {
        const u = Math.max(
          this.options.overscan,
          Math.ceil((this.range.endIndex - this.range.startIndex) / 2)
        ), c = Math.max(0, s - u), d = Math.min(
          this.options.count - 1,
          s + u
        );
        return o >= c && o <= d;
      }
      return !0;
    }, this.measureElement = (o) => {
      if (!o) {
        this.elementsCache.forEach((c, d) => {
          c.isConnected || (this.observer.unobserve(c), this.elementsCache.delete(d));
        });
        return;
      }
      const r = this.indexFromElement(o), s = this.options.getItemKey(r), u = this.elementsCache.get(s);
      u !== o && (u && this.observer.unobserve(u), this.observer.observe(o), this.elementsCache.set(s, o)), (!this.isScrolling || this.scrollState) && this.shouldMeasureDuringScroll(r) && this.resizeItem(r, this.options.measureElement(o, void 0, this));
    }, this.resizeItem = (o, r) => {
      var s, u;
      if (o < 0 || o >= this.options.count) return;
      let c, d, m;
      const y = this._flatMeasurements;
      if (this.options.lanes === 1 && y !== null)
        m = this.options.getItemKey(o), d = y[o * 2], c = y[o * 2 + 1];
      else {
        const v = this.measurementsCache[o];
        if (!v) return;
        m = v.key, d = v.start, c = v.size;
      }
      const g = this.itemSizeCache.get(m) ?? c, p = r - g;
      if (p !== 0) {
        const v = this.options.anchorTo === "end" && ((s = this.scrollState) == null ? void 0 : s.behavior) !== "smooth" && this.getVirtualDistanceFromEnd() <= this.options.scrollEndThreshold, b = v ? this.getTotalSize() : 0, S = this.getScrollOffset() + this.scrollAdjustments, M = !this.itemSizeCache.has(m) ? (
          // First measurement: compensate any item whose top sits above the
          // fold — the estimate→actual delta must be corrected regardless of
          // scroll direction, since the whole estimated block was above it.
          d < S
        ) : (
          // Re-measurement: only compensate an item that is ENTIRELY above the
          // fold. An item that merely *spans* the fold (top above, bottom
          // below — e.g. a streaming chat message growing at its bottom)
          // changes size *below* the anchor point, so shifting scrollTop by the
          // delta would drag the viewport downward on every growth (#1218).
          // Also skip during backward scroll to avoid the "items jump while
          // scrolling up" cascade.
          d + g <= S && this.scrollDirection !== "backward"
        ), T = ((u = this.scrollState) == null ? void 0 : u.behavior) !== "smooth" && (this.shouldAdjustScrollPositionOnItemSizeChange !== void 0 ? this.shouldAdjustScrollPositionOnItemSizeChange(
          // The callback expects a VirtualItem; build one lazily only
          // when the consumer actually supplied a custom predicate.
          this.measurementsCache[o] ?? {
            index: o,
            key: m,
            start: d,
            size: c,
            end: d + c,
            lane: 0
          },
          p,
          this
        ) : M);
        (this.pendingMin === null || o < this.pendingMin) && (this.pendingMin = o), this.itemSizeCache.set(m, r), this.itemSizeCacheVersion++, v ? this.applyScrollAdjustment(this.getTotalSize() - b) : T && this.applyScrollAdjustment(p), this.notify(!1);
      }
    }, this.getVirtualItems = vo(
      () => [this.getVirtualIndexes(), this.getMeasurements()],
      (o, r) => {
        const s = [];
        for (let u = 0, c = o.length; u < c; u++) {
          const d = o[u], m = r[d];
          s.push(m);
        }
        return s;
      },
      {
        key: !1,
        debug: () => this.options.debug
      }
    ), this.getVirtualItemForOffset = (o) => {
      const r = this.getMeasurements();
      if (r.length === 0)
        return;
      const s = this._flatMeasurements, u = this.options.lanes === 1 && s != null, c = Zx(
        0,
        r.length - 1,
        u ? (d) => s[d * 2] : (d) => rv(r[d]).start,
        o
      );
      return rv(r[c]);
    }, this.getMaxScrollOffset = () => {
      if (!this.scrollElement) return 0;
      if ("scrollHeight" in this.scrollElement)
        return this.options.horizontal ? this.scrollElement.scrollWidth - this.scrollElement.clientWidth : this.scrollElement.scrollHeight - this.scrollElement.clientHeight;
      {
        const o = this.scrollElement.document.documentElement;
        return this.options.horizontal ? o.scrollWidth - this.scrollElement.innerWidth : o.scrollHeight - this.scrollElement.innerHeight;
      }
    }, this.getVirtualDistanceFromEnd = () => Math.max(
      this.getTotalSize() - this.getSize() - this.getScrollOffset(),
      0
    ), this.getDistanceFromEnd = () => Math.max(this.getMaxScrollOffset() - this.getScrollOffset(), 0), this.isAtEnd = (o = this.options.scrollEndThreshold) => this.getDistanceFromEnd() <= o, this.getOffsetForAlignment = (o, r, s = 0) => {
      if (!this.scrollElement) return 0;
      const u = this.getSize(), c = this.getScrollOffset();
      r === "auto" && (r = o >= c + u ? "end" : "start"), r === "center" ? o += (s - u) / 2 : r === "end" && (o -= u);
      const d = this.getMaxScrollOffset();
      return Math.max(Math.min(d, o), 0);
    }, this.getOffsetForIndex = (o, r = "auto") => {
      o = Math.max(0, Math.min(o, this.options.count - 1));
      const s = this.getSize(), u = this.getScrollOffset(), c = this.measurementsCache[o];
      if (!c) return;
      if (r === "auto")
        if (c.end >= u + s - this.options.scrollPaddingEnd)
          r = "end";
        else if (c.start <= u + this.options.scrollPaddingStart)
          r = "start";
        else
          return [u, r];
      if (r === "end" && o === this.options.count - 1)
        return [this.getMaxScrollOffset(), r];
      const d = r === "end" ? c.end + this.options.scrollPaddingEnd : c.start - this.options.scrollPaddingStart;
      return [
        this.getOffsetForAlignment(d, r, c.size),
        r
      ];
    }, this.scrollToOffset = (o, { align: r = "start", behavior: s = "auto" } = {}) => {
      this._iosDeferredAdjustment = 0;
      const u = this.getOffsetForAlignment(o, r), c = this.now();
      this.scrollState = {
        index: null,
        align: r,
        behavior: s,
        startedAt: c,
        lastTargetOffset: u,
        stableFrames: 0
      }, this._scrollToOffset(u, { adjustments: void 0, behavior: s }), this.scheduleScrollReconcile();
    }, this.scrollToIndex = (o, {
      align: r = "auto",
      behavior: s = "auto"
    } = {}) => {
      this._iosDeferredAdjustment = 0, o = Math.max(0, Math.min(o, this.options.count - 1));
      const u = this.getOffsetForIndex(o, r);
      if (!u)
        return;
      const [c, d] = u, m = this.now();
      this.scrollState = {
        index: o,
        align: d,
        behavior: s,
        startedAt: m,
        lastTargetOffset: c,
        stableFrames: 0
      }, this._scrollToOffset(c, { adjustments: void 0, behavior: s }), this.scheduleScrollReconcile();
    }, this.scrollBy = (o, { behavior: r = "auto" } = {}) => {
      const s = this.getScrollOffset() + o, u = this.now();
      this.scrollState = {
        index: null,
        align: "start",
        behavior: r,
        startedAt: u,
        lastTargetOffset: s,
        stableFrames: 0
      }, this._scrollToOffset(s, { adjustments: void 0, behavior: r }), this.scheduleScrollReconcile();
    }, this.scrollToEnd = ({ behavior: o = "auto" } = {}) => {
      if (this.options.count > 0) {
        this.scrollToIndex(this.options.count - 1, {
          align: "end",
          behavior: o
        });
        return;
      }
      this.scrollToOffset(Math.max(this.getTotalSize() - this.getSize(), 0), {
        behavior: o
      });
    }, this.getTotalSize = () => {
      var o;
      const r = this.getMeasurements();
      let s;
      if (r.length === 0)
        s = this.options.paddingStart;
      else if (this.options.lanes === 1) {
        const u = r.length - 1, c = this._flatMeasurements;
        c != null ? s = c[u * 2] + c[u * 2 + 1] : s = ((o = r[u]) == null ? void 0 : o.end) ?? 0;
      } else {
        const u = Array(this.options.lanes).fill(null);
        let c = r.length - 1;
        for (; c >= 0 && u.some((d) => d === null); ) {
          const d = r[c];
          u[d.lane] === null && (u[d.lane] = d.end), c--;
        }
        s = Math.max(...u.filter((d) => d !== null));
      }
      return Math.max(
        s - this.options.scrollMargin + this.options.paddingEnd,
        0
      );
    }, this.takeSnapshot = () => {
      const o = [];
      if (this.itemSizeCache.size === 0) return o;
      const r = this.getMeasurements();
      for (const s of r)
        s && this.itemSizeCache.has(s.key) && o.push({
          index: s.index,
          key: s.key,
          start: s.start,
          size: s.size,
          end: s.end,
          lane: s.lane
        });
      return o;
    }, this._scrollToOffset = (o, {
      adjustments: r,
      behavior: s
    }) => {
      this._intendedScrollOffset = o + (r ?? 0), this.options.scrollToFn(o, { behavior: s, adjustments: r }, this);
    }, this.measure = () => {
      this.pendingMin = null, this.itemSizeCache.clear(), this.laneAssignments.clear(), this.itemSizeCacheVersion++, this.notify(!1);
    }, this.setOptions(i);
  }
  applyScrollAdjustment(i, o) {
    i !== 0 && (zd() && (this.isScrolling || this._iosTouching || this._iosJustTouchEnded) ? this._iosDeferredAdjustment += i : (this._scrollToOffset(this.getScrollOffset(), {
      adjustments: this.scrollAdjustments += i,
      behavior: o
    }), this.scrollOffset !== null && (this.scrollOffset += this.scrollAdjustments, this.scrollOffset < 0 && (this.scrollOffset = 0), this.scrollAdjustments = 0)));
  }
  scheduleScrollReconcile() {
    if (!this.targetWindow) {
      this.scrollState = null;
      return;
    }
    this.rafId == null && (this.rafId = this.targetWindow.requestAnimationFrame(() => {
      this.rafId = null, this.reconcileScroll();
    }));
  }
  reconcileScroll() {
    if (!this.scrollState || !this.scrollElement) return;
    if (this.now() - this.scrollState.startedAt > 5e3) {
      this.scrollState = null;
      return;
    }
    const r = this.scrollState.index != null ? this.getOffsetForIndex(this.scrollState.index, this.scrollState.align) : void 0, s = r ? r[0] : this.scrollState.lastTargetOffset, u = 1, c = s !== this.scrollState.lastTargetOffset;
    if (!c && Mj(s, this.getScrollOffset())) {
      if (this.scrollState.stableFrames++, this.scrollState.stableFrames >= u) {
        this.getScrollOffset() !== s && this._scrollToOffset(s, {
          adjustments: void 0,
          behavior: "auto"
        }), this.scrollState = null;
        return;
      }
    } else if (this.scrollState.stableFrames = 0, c) {
      const d = this.getSize() || 600, m = Math.abs(s - this.getScrollOffset()), y = this.scrollState.behavior === "smooth" && m > d;
      this.scrollState.lastTargetOffset = s, y || (this.scrollState.behavior = "auto"), this._scrollToOffset(s, {
        adjustments: void 0,
        behavior: y ? "smooth" : "auto"
      });
    }
    this.scheduleScrollReconcile();
  }
}
const Zx = (t, i, o, r) => {
  for (; t <= i; ) {
    const s = (t + i) / 2 | 0, u = o(s);
    if (u < r)
      t = s + 1;
    else if (u > r)
      i = s - 1;
    else
      return s;
  }
  return t > 0 ? t - 1 : 0;
};
function Ij(t, i, o) {
  let r = 0;
  for (; r <= i; ) {
    const s = (r + i) / 2 | 0, u = t[s * 2];
    if (u < o)
      r = s + 1;
    else if (u > o)
      i = s - 1;
    else
      return s;
  }
  return r > 0 ? r - 1 : 0;
}
function Vj(t, i, o, r, s) {
  const u = t.length - 1;
  if (t.length <= r)
    return { startIndex: 0, endIndex: u };
  if (r === 1 && s !== null) {
    const y = Ij(
      s,
      u,
      o
    );
    let g = y;
    const p = o + i;
    for (; g < u && s[g * 2] + s[g * 2 + 1] < p; )
      g++;
    return { startIndex: y, endIndex: g };
  }
  let d = Zx(0, u, (y) => t[y].start, o), m = d;
  if (r === 1)
    for (; m < u && t[m].end < o + i; )
      m++;
  else if (r > 1) {
    const y = Array(r).fill(0);
    for (; m < u && y.some((p) => p < o + i); ) {
      const p = t[m];
      y[p.lane] = p.end, m++;
    }
    const g = Array(r).fill(o + i);
    for (; d >= 0 && g.some((p) => p >= o); ) {
      const p = t[d];
      g[p.lane] = p.start, d--;
    }
    d = Math.max(0, d - d % r), m = Math.min(u, m + (r - 1 - m % r));
  }
  return { startIndex: d, endIndex: m };
}
const Rd = typeof document < "u" ? $.useLayoutEffect : $.useEffect;
function Uj({
  useFlushSync: t = !0,
  directDomUpdates: i = !1,
  directDomUpdatesMode: o = "transform",
  ...r
}) {
  const s = $.useReducer((g) => g + 1, 0)[1], u = $.useRef({
    enabled: i,
    mode: o,
    container: null,
    lastSize: null,
    // Keyed by the element itself so a remounted node (same key, new DOM
    // node — e.g. when `enabled` is toggled off then on) is treated as fresh
    // and gets its style written.
    lastPositions: /* @__PURE__ */ new WeakMap(),
    prevRange: null
  });
  u.current.enabled = i, u.current.mode = o;
  const c = (g) => {
    const p = u.current;
    if (!p.enabled || !p.container) return;
    const v = g.getTotalSize();
    if (v !== p.lastSize) {
      p.lastSize = v;
      const b = g.options.horizontal ? "width" : "height";
      p.container.style[b] = `${v}px`;
    }
  }, d = (g) => {
    const p = u.current;
    if (!p.enabled || !p.container) return;
    c(g);
    const v = !!g.options.horizontal, b = p.mode === "transform", S = v ? "left" : "top", N = g.options.scrollMargin, M = g.getVirtualItems();
    for (const T of M) {
      const O = T.start - N, _ = g.elementsCache.get(T.key);
      _ && p.lastPositions.get(_) !== O && (p.lastPositions.set(_, O), b ? _.style.transform = v ? `translate3d(${O}px, 0, 0)` : `translate3d(0, ${O}px, 0)` : _.style[S] = `${O}px`);
    }
  }, m = {
    ...r,
    onChange: (g, p) => {
      var v;
      const b = u.current;
      let S = !0;
      if (b.enabled) {
        d(g);
        const N = g.range, M = b.prevRange;
        S = !M || M.isScrolling !== g.isScrolling || M.startIndex !== N?.startIndex || M.endIndex !== N?.endIndex, S && (b.prevRange = N ? {
          startIndex: N.startIndex,
          endIndex: N.endIndex,
          isScrolling: g.isScrolling
        } : null);
      }
      S && (t && p ? ox.flushSync(s) : s()), (v = r.onChange) == null || v.call(r, g, p);
    }
  }, [y] = $.useState(() => {
    const g = new Bj(m);
    return Object.assign(g, {
      containerRef: (p) => {
        const v = u.current;
        if (v.container = p, v.lastSize = null, p && v.enabled) {
          const b = g.getTotalSize();
          v.lastSize = b;
          const S = g.options.horizontal ? "width" : "height";
          p.style[S] = `${b}px`;
        }
      }
    });
  });
  return y.setOptions(m), Rd(() => y._didMount(), []), Rd(() => (c(y), y._willUpdate())), Rd(() => {
    d(y);
  }), y;
}
function sv(t) {
  return Uj({
    observeElementRect: Dj,
    observeElementOffset: Rj,
    scrollToFn: Lj,
    ...t
  });
}
function Yj() {
  return /* @__PURE__ */ x.jsx(
    "svg",
    {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      "aria-hidden": "true",
      children: /* @__PURE__ */ x.jsx("path", { d: "M8 5v14l11-7z" })
    }
  );
}
function qj() {
  return /* @__PURE__ */ x.jsx(
    "svg",
    {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      "aria-hidden": "true",
      children: /* @__PURE__ */ x.jsx("rect", { x: "6", y: "6", width: "12", height: "12", rx: "1" })
    }
  );
}
function $j() {
  return /* @__PURE__ */ x.jsx(
    "svg",
    {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      "aria-hidden": "true",
      children: /* @__PURE__ */ x.jsx("circle", { cx: "12", cy: "12", r: "6" })
    }
  );
}
function Xj() {
  return /* @__PURE__ */ x.jsxs(
    "svg",
    {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ x.jsx("rect", { x: "2", y: "4", width: "20", height: "16", rx: "2" }),
        /* @__PURE__ */ x.jsx("path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" })
      ]
    }
  );
}
function Gj() {
  return /* @__PURE__ */ x.jsx(
    "svg",
    {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: /* @__PURE__ */ x.jsx("path", { d: "M13 2 3 14h9l-1 8 10-12h-9l1-8z" })
    }
  );
}
function Zj() {
  return /* @__PURE__ */ x.jsxs(
    "svg",
    {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ x.jsx("path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" }),
        /* @__PURE__ */ x.jsx("path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" })
      ]
    }
  );
}
function Kj() {
  return /* @__PURE__ */ x.jsxs(
    "svg",
    {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ x.jsx("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ x.jsx("polyline", { points: "12 6 12 12 16 14" })
      ]
    }
  );
}
function Qj() {
  return /* @__PURE__ */ x.jsxs(
    "svg",
    {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ x.jsx("path", { d: "M16 3h5v5" }),
        /* @__PURE__ */ x.jsx("path", { d: "M8 3H3v5" }),
        /* @__PURE__ */ x.jsx("path", { d: "M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3" }),
        /* @__PURE__ */ x.jsx("path", { d: "m15 9 6-6" })
      ]
    }
  );
}
function Fj() {
  return /* @__PURE__ */ x.jsxs(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ x.jsx("circle", { cx: "11", cy: "11", r: "8" }),
        /* @__PURE__ */ x.jsx("path", { d: "m21 21-4.3-4.3" })
      ]
    }
  );
}
const uv = [
  // States
  {
    id: "initial-state",
    type: "state",
    nodeKind: "stateNode",
    label: "Start",
    description: "Initial state - entry point of the machine",
    icon: /* @__PURE__ */ x.jsx(Yj, {}),
    defaults: { initial: !0 }
  },
  {
    id: "regular-state",
    type: "state",
    nodeKind: "stateNode",
    label: "State",
    description: "Regular state - intermediate step",
    icon: /* @__PURE__ */ x.jsx($j, {})
  },
  {
    id: "terminal-state",
    type: "state",
    nodeKind: "stateNode",
    label: "End",
    description: "Terminal state - final state of the machine",
    icon: /* @__PURE__ */ x.jsx(qj, {}),
    defaults: { terminal: !0 }
  },
  // Actions (for workflow nodes)
  {
    id: "email-action",
    type: "action",
    nodeKind: "step",
    label: "Email",
    description: "Send an email notification",
    icon: /* @__PURE__ */ x.jsx(Xj, {})
  },
  {
    id: "event-action",
    type: "action",
    nodeKind: "step",
    label: "Event",
    description: "Emit or handle an event",
    icon: /* @__PURE__ */ x.jsx(Gj, {})
  },
  {
    id: "api-action",
    type: "action",
    nodeKind: "step",
    label: "API",
    description: "Make an API call",
    icon: /* @__PURE__ */ x.jsx(Zj, {})
  },
  // Logic
  {
    id: "delay-logic",
    type: "logic",
    nodeKind: "step",
    label: "Delay",
    description: "Wait for a specified duration",
    icon: /* @__PURE__ */ x.jsx(Kj, {})
  },
  {
    id: "condition-logic",
    type: "logic",
    nodeKind: "when",
    label: "If/Else",
    description: "Conditional branching logic",
    icon: /* @__PURE__ */ x.jsx(Qj, {})
  }
], Wj = {
  state: "States",
  action: "Actions",
  logic: "Logic"
};
function Jj({
  item: t,
  readOnly: i,
  onDragStart: o
}) {
  const [r, s] = $.useState(!1), [u, c] = $.useState(!1), d = $.useCallback(
    (g) => {
      if (i) {
        g.preventDefault();
        return;
      }
      const p = JSON.stringify({
        id: t.id,
        type: t.type,
        nodeKind: t.nodeKind,
        label: t.label,
        defaults: t.defaults
      });
      g.dataTransfer.setData("application/reactflow", p), g.dataTransfer.setData("text/plain", t.label), g.dataTransfer.effectAllowed = "move", s(!0), o?.(t);
    },
    [t, i, o]
  ), m = $.useCallback(() => {
    s(!1);
  }, []), y = () => t.defaults?.initial ? "fub-palette-item--initial" : t.defaults?.terminal ? "fub-palette-item--terminal" : t.type === "state" ? "fub-palette-item--state" : t.type === "action" ? "fub-palette-item--action" : t.type === "logic" ? "fub-palette-item--logic" : "";
  return /* @__PURE__ */ x.jsxs(
    "div",
    {
      className: `fub-palette-item ${y()}${r ? " fub-palette-item--dragging" : ""}${i ? " fub-palette-item--disabled" : ""}`,
      draggable: !i,
      onDragStart: d,
      onDragEnd: m,
      onMouseEnter: () => c(!0),
      onMouseLeave: () => c(!1),
      onFocus: () => c(!0),
      onBlur: () => c(!1),
      tabIndex: i ? -1 : 0,
      role: "button",
      "aria-label": `Drag to add ${t.label}`,
      "aria-disabled": i,
      children: [
        /* @__PURE__ */ x.jsx("div", { className: "fub-palette-item-icon", children: t.icon }),
        /* @__PURE__ */ x.jsx("span", { className: "fub-palette-item-label", children: t.label }),
        u && /* @__PURE__ */ x.jsx("div", { className: "fub-palette-tooltip", role: "tooltip", children: t.description })
      ]
    }
  );
}
function Pj(t) {
  const [i, o] = $.useState(""), [r, s] = $.useState(/* @__PURE__ */ new Set()), u = !!t.readOnly, c = $.useMemo(() => {
    if (!i.trim())
      return uv;
    const v = i.toLowerCase();
    return uv.filter(
      (b) => b.label.toLowerCase().includes(v) || b.description.toLowerCase().includes(v)
    );
  }, [i]), d = $.useMemo(() => {
    const v = {};
    for (const b of c)
      v[b.type] || (v[b.type] = []), v[b.type].push(b);
    return v;
  }, [c]), m = $.useCallback((v) => {
    s((b) => {
      const S = new Set(b);
      return S.has(v) ? S.delete(v) : S.add(v), S;
    });
  }, []), y = $.useCallback((v) => {
    o(v.target.value);
  }, []), g = $.useCallback(() => {
    o("");
  }, []), p = Object.keys(d);
  return /* @__PURE__ */ x.jsxs(
    "section",
    {
      className: "fub-palette",
      "aria-label": "Node palette",
      role: "region",
      children: [
        /* @__PURE__ */ x.jsxs("div", { className: "fub-palette-search", children: [
          /* @__PURE__ */ x.jsx("div", { className: "fub-palette-search-icon", children: /* @__PURE__ */ x.jsx(Fj, {}) }),
          /* @__PURE__ */ x.jsx(
            "input",
            {
              type: "text",
              className: "fub-palette-search-input",
              placeholder: "Search nodes...",
              value: i,
              onChange: y,
              "aria-label": "Search nodes",
              disabled: u
            }
          ),
          i && /* @__PURE__ */ x.jsx(
            "button",
            {
              type: "button",
              className: "fub-palette-search-clear",
              onClick: g,
              "aria-label": "Clear search",
              children: "×"
            }
          )
        ] }),
        /* @__PURE__ */ x.jsxs("div", { className: "fub-palette-categories", children: [
          p.length === 0 && /* @__PURE__ */ x.jsx("div", { className: "fub-palette-empty", children: /* @__PURE__ */ x.jsx("p", { children: "No nodes match your search." }) }),
          p.map((v) => {
            const b = d[v], S = r.has(v), N = Wj[v] || v;
            return /* @__PURE__ */ x.jsxs("div", { className: "fub-palette-category", children: [
              /* @__PURE__ */ x.jsxs(
                "button",
                {
                  type: "button",
                  className: "fub-palette-category-header",
                  onClick: () => m(v),
                  "aria-expanded": !S,
                  "aria-controls": `fub-palette-category-${v}`,
                  children: [
                    /* @__PURE__ */ x.jsx("span", { className: `fub-palette-chevron${S ? " fub-palette-chevron--collapsed" : ""}`, children: /* @__PURE__ */ x.jsx(
                      "svg",
                      {
                        width: "12",
                        height: "12",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        "aria-hidden": "true",
                        children: /* @__PURE__ */ x.jsx("path", { d: "m6 9 6 6 6-6" })
                      }
                    ) }),
                    /* @__PURE__ */ x.jsx("span", { className: "fub-palette-category-label", children: N }),
                    /* @__PURE__ */ x.jsx("span", { className: "fub-palette-category-count", children: b.length })
                  ]
                }
              ),
              !S && /* @__PURE__ */ x.jsx(
                "div",
                {
                  id: `fub-palette-category-${v}`,
                  className: "fub-palette-items",
                  role: "group",
                  "aria-label": N,
                  children: b.map((M) => /* @__PURE__ */ x.jsx(
                    Jj,
                    {
                      item: M,
                      readOnly: u,
                      onDragStart: t.onDragStart
                    },
                    M.id
                  ))
                }
              )
            ] }, v);
          })
        ] }),
        !u && /* @__PURE__ */ x.jsx("div", { className: "fub-palette-help", children: /* @__PURE__ */ x.jsx("p", { children: "Drag items onto the canvas to add them." }) })
      ]
    }
  );
}
const cv = 80, iu = 52, fv = 8, dv = 12, eD = {
  state: /* @__PURE__ */ new Map(),
  transition: /* @__PURE__ */ new Map()
};
function Kx(t, i) {
  const o = eD[t];
  o.set(i, (o.get(i) ?? 0) + 1);
}
function Qx(t) {
  return t ? " is-selected" : "";
}
function tD(t, i) {
  return t.kind === "state" && t.stateIndex === i;
}
function nD(t, i) {
  return t.kind === "transition" || t.kind === "workflow-node" ? t.transitionIndex === i : !1;
}
const iD = $.memo(function(i) {
  return Kx("state", i.stateIndex), /* @__PURE__ */ x.jsxs(
    "button",
    {
      type: "button",
      ref: (o) => i.setButtonRef(i.stateIndex, o),
      className: `fub-list-item${Qx(i.selected)}${i.dropTarget ? " fub-list-item--drop-target" : ""}`,
      onClick: () => i.onSelect(i.stateIndex),
      onKeyDown: (o) => {
        (o.key === "ArrowDown" || o.key === "ArrowUp" || o.key === "Home" || o.key === "End") && o.preventDefault(), i.onNavigate(i.stateIndex, o.key);
      },
      "aria-label": i.state.name || "(unnamed)",
      children: [
        /* @__PURE__ */ x.jsx("span", { className: "fub-item-main", children: i.state.name || "(unnamed)" }),
        /* @__PURE__ */ x.jsxs("span", { className: "fub-item-meta", children: [
          i.state.initial ? "initial" : "",
          i.state.terminal ? " final" : ""
        ] })
      ]
    }
  );
}), aD = $.memo(function(i) {
  return Kx("transition", i.transitionIndex), /* @__PURE__ */ x.jsxs(
    "button",
    {
      type: "button",
      ref: (o) => i.setButtonRef(i.transitionIndex, o),
      className: `fub-list-item${Qx(i.selected)}${i.dropTarget ? " fub-list-item--drop-target" : ""}`,
      onClick: () => i.onSelect(i.transitionIndex),
      onKeyDown: (o) => {
        (o.key === "ArrowDown" || o.key === "ArrowUp" || o.key === "Home" || o.key === "End") && o.preventDefault(), i.onNavigate(i.transitionIndex, o.key);
      },
      "aria-label": wy(i.transition),
      children: [
        /* @__PURE__ */ x.jsx("span", { className: "fub-item-main", children: i.transition.id || `transition-${i.transitionIndex + 1}` }),
        /* @__PURE__ */ x.jsx("span", { className: "fub-item-meta", children: wy(i.transition) })
      ]
    }
  );
});
function oD() {
  return /* @__PURE__ */ x.jsxs(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ x.jsx("rect", { x: "3", y: "3", width: "7", height: "7", rx: "1" }),
        /* @__PURE__ */ x.jsx("rect", { x: "14", y: "3", width: "7", height: "7", rx: "1" }),
        /* @__PURE__ */ x.jsx("rect", { x: "3", y: "14", width: "7", height: "7", rx: "1" }),
        /* @__PURE__ */ x.jsx("rect", { x: "14", y: "14", width: "7", height: "7", rx: "1" })
      ]
    }
  );
}
function rD() {
  return /* @__PURE__ */ x.jsxs(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ x.jsx("path", { d: "M3 6h18" }),
        /* @__PURE__ */ x.jsx("path", { d: "M3 12h18" }),
        /* @__PURE__ */ x.jsx("path", { d: "M3 18h18" })
      ]
    }
  );
}
function hv(t, i) {
  const o = () => {
    t.current.get(i)?.focus();
  };
  if (typeof window.requestAnimationFrame == "function") {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(o);
    });
    return;
  }
  window.setTimeout(o, 0);
}
function mv(t) {
  const [i, o] = $.useState("tree"), [r, s] = $.useState(null), [u, c] = $.useState(null), [d, m] = $.useState(null), [y, g] = $.useState(null), p = Se((Z) => Z.document.definition.states), v = Se((Z) => Z.document.definition.transitions), b = Se((Z) => Z.selection), S = Se((Z) => Z.setSelection), N = Se((Z) => Z.addState), M = Se((Z) => Z.addTransition), T = Se((Z) => Z.moveState), O = Se((Z) => Z.moveTransition), _ = !!t.readOnly, C = $.useRef(/* @__PURE__ */ new Map()), k = $.useRef(/* @__PURE__ */ new Map()), L = $.useRef(null), H = $.useRef(null), I = p.length >= cv, ee = v.length >= cv, Q = sv({
    count: p.length,
    getScrollElement: () => L.current,
    estimateSize: () => iu,
    overscan: fv,
    initialRect: { width: 320, height: 320 },
    getItemKey: (Z) => `state-${Z}`
  }), X = sv({
    count: v.length,
    getScrollElement: () => H.current,
    estimateSize: () => iu,
    overscan: fv,
    initialRect: { width: 320, height: 320 },
    getItemKey: (Z) => `transition-${Z}`
  }), J = $.useCallback((Z) => {
    o(Z);
  }, []), G = $.useCallback(
    (Z) => {
      S({ kind: "state", stateIndex: Z });
    },
    [S]
  ), j = $.useCallback(
    (Z) => {
      S({ kind: "transition", transitionIndex: Z });
    },
    [S]
  ), Y = $.useCallback((Z, se) => {
    if (se) {
      C.current.set(Z, se);
      return;
    }
    C.current.delete(Z);
  }, []), A = $.useCallback((Z, se) => {
    if (se) {
      k.current.set(Z, se);
      return;
    }
    k.current.delete(Z);
  }, []), z = $.useCallback(
    (Z) => {
      Z < 0 || Z >= p.length || (S({ kind: "state", stateIndex: Z }), I && Q.scrollToIndex(Z, { align: "auto" }), hv(C, Z));
    },
    [S, I, Q, p.length]
  ), q = $.useCallback(
    (Z) => {
      Z < 0 || Z >= v.length || (S({ kind: "transition", transitionIndex: Z }), ee && X.scrollToIndex(Z, { align: "auto" }), hv(k, Z));
    },
    [S, ee, X, v.length]
  ), W = $.useCallback(
    (Z, se) => {
      if (se === "ArrowDown") {
        z(Math.min(p.length - 1, Z + 1));
        return;
      }
      if (se === "ArrowUp") {
        z(Math.max(0, Z - 1));
        return;
      }
      if (se === "Home") {
        z(0);
        return;
      }
      se === "End" && z(Math.max(0, p.length - 1));
    },
    [z, p.length]
  ), te = $.useCallback(
    (Z, se) => {
      if (se === "ArrowDown") {
        q(Math.min(v.length - 1, Z + 1));
        return;
      }
      if (se === "ArrowUp") {
        q(Math.max(0, Z - 1));
        return;
      }
      if (se === "Home") {
        q(0);
        return;
      }
      se === "End" && q(Math.max(0, v.length - 1));
    },
    [q, v.length]
  ), D = $.useCallback(
    (Z) => {
      if (r === null || r === Z) {
        s(null), c(null);
        return;
      }
      T(r, Z), s(null), c(null);
    },
    [r, T]
  ), V = $.useCallback(
    (Z) => {
      if (d === null || d === Z) {
        m(null), g(null);
        return;
      }
      O(d, Z), m(null), g(null);
    },
    [d, O]
  ), ne = Q.getVirtualItems(), B = X.getVirtualItems(), E = I ? ne.length > 0 ? ne : Array.from({ length: Math.min(dv, p.length) }, (Z, se) => ({
    index: se,
    start: se * iu,
    key: `state-fallback-${se}`
  })) : [], U = ee ? B.length > 0 ? B : Array.from({ length: Math.min(dv, v.length) }, (Z, se) => ({
    index: se,
    start: se * iu,
    key: `transition-fallback-${se}`
  })) : [], F = $.useCallback(
    (Z, se) => /* @__PURE__ */ x.jsx(
      "li",
      {
        style: se,
        draggable: !_,
        onDragStart: () => {
          _ || s(Z);
        },
        onDragOver: (he) => {
          _ || r === null || (he.preventDefault(), c(Z));
        },
        onDragLeave: () => {
          u === Z && c(null);
        },
        onDrop: (he) => {
          _ || (he.preventDefault(), D(Z));
        },
        onDragEnd: () => {
          s(null), c(null);
        },
        children: /* @__PURE__ */ x.jsx(
          iD,
          {
            stateIndex: Z,
            state: p[Z] ?? { name: "" },
            selected: tD(b, Z),
            dropTarget: u === Z,
            setButtonRef: Y,
            onSelect: G,
            onNavigate: W
          }
        )
      },
      `state-${Z}`
    ),
    [
      r,
      u,
      D,
      W,
      _,
      Y,
      G,
      b,
      p
    ]
  ), K = $.useCallback(
    (Z, se) => {
      const he = v[Z];
      return he ? /* @__PURE__ */ x.jsx(
        "li",
        {
          style: se,
          draggable: !_,
          onDragStart: () => {
            _ || m(Z);
          },
          onDragOver: (ge) => {
            _ || d === null || (ge.preventDefault(), g(Z));
          },
          onDragLeave: () => {
            y === Z && g(null);
          },
          onDrop: (ge) => {
            _ || (ge.preventDefault(), V(Z));
          },
          onDragEnd: () => {
            m(null), g(null);
          },
          children: /* @__PURE__ */ x.jsx(
            aD,
            {
              transitionIndex: Z,
              transition: he,
              selected: nD(b, Z),
              dropTarget: y === Z,
              setButtonRef: A,
              onSelect: j,
              onNavigate: te
            }
          )
        },
        `transition-${Z}`
      ) : null;
    },
    [
      d,
      y,
      V,
      te,
      _,
      A,
      j,
      b,
      v
    ]
  );
  return /* @__PURE__ */ x.jsxs(
    "section",
    {
      className: "fub-panel fub-explorer",
      "aria-label": "Explorer panel",
      role: "region",
      "aria-labelledby": "fub-panel-explorer-heading",
      id: "fub-panel-explorer",
      tabIndex: -1,
      children: [
        /* @__PURE__ */ x.jsxs("div", { className: "fub-panel-header", id: "fub-panel-explorer-heading", children: [
          /* @__PURE__ */ x.jsx("strong", { children: "Explorer" }),
          /* @__PURE__ */ x.jsx("div", { className: "fub-inline-actions", children: /* @__PURE__ */ x.jsxs("div", { className: "fub-view-toggle", role: "tablist", "aria-label": "Explorer view", children: [
            /* @__PURE__ */ x.jsx(
              "button",
              {
                type: "button",
                role: "tab",
                className: `fub-view-toggle-btn${i === "palette" ? " is-active" : ""}`,
                onClick: () => J("palette"),
                "aria-selected": i === "palette",
                "aria-controls": "fub-explorer-palette",
                title: "Node Palette",
                children: /* @__PURE__ */ x.jsx(oD, {})
              }
            ),
            /* @__PURE__ */ x.jsx(
              "button",
              {
                type: "button",
                role: "tab",
                className: `fub-view-toggle-btn${i === "tree" ? " is-active" : ""}`,
                onClick: () => J("tree"),
                "aria-selected": i === "tree",
                "aria-controls": "fub-explorer-tree",
                title: "Tree View",
                children: /* @__PURE__ */ x.jsx(rD, {})
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ x.jsx("div", { className: "fub-panel-body", children: i === "palette" ? /* @__PURE__ */ x.jsx("div", { id: "fub-explorer-palette", children: /* @__PURE__ */ x.jsx(Pj, { readOnly: _ }) }) : /* @__PURE__ */ x.jsxs("div", { id: "fub-explorer-tree", children: [
          /* @__PURE__ */ x.jsxs("div", { className: "fub-tree-actions", children: [
            /* @__PURE__ */ x.jsx("button", { type: "button", className: "fub-mini-btn", onClick: N, disabled: _, children: "+ State" }),
            /* @__PURE__ */ x.jsx("button", { type: "button", className: "fub-mini-btn", onClick: M, disabled: _, children: "+ Transition" })
          ] }),
          /* @__PURE__ */ x.jsxs("section", { className: "fub-section", children: [
            /* @__PURE__ */ x.jsx("h3", { children: "States" }),
            /* @__PURE__ */ x.jsx(
              "div",
              {
                className: "fub-explorer-list-scroll",
                ref: L,
                "aria-label": "States list",
                "data-virtualized": I ? "true" : "false",
                "data-testid": "fub-explorer-states-scroll",
                children: /* @__PURE__ */ x.jsx(
                  "ul",
                  {
                    className: "fub-explorer-list",
                    style: I ? {
                      height: `${Q.getTotalSize()}px`,
                      position: "relative"
                    } : void 0,
                    children: I ? E.map(
                      (Z) => F(Z.index, {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        transform: `translateY(${Z.start}px)`
                      })
                    ) : p.map((Z, se) => F(se))
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ x.jsxs("section", { className: "fub-section", children: [
            /* @__PURE__ */ x.jsx("h3", { children: "Transitions" }),
            /* @__PURE__ */ x.jsx(
              "div",
              {
                className: "fub-explorer-list-scroll",
                ref: H,
                "aria-label": "Transitions list",
                "data-virtualized": ee ? "true" : "false",
                "data-testid": "fub-explorer-transitions-scroll",
                children: /* @__PURE__ */ x.jsx(
                  "ul",
                  {
                    className: "fub-explorer-list",
                    style: ee ? {
                      height: `${X.getTotalSize()}px`,
                      position: "relative"
                    } : void 0,
                    children: ee ? U.map(
                      (Z) => K(Z.index, {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        transform: `translateY(${Z.start}px)`
                      })
                    ) : v.map((Z, se) => K(se))
                  }
                )
              }
            )
          ] })
        ] }) })
      ]
    }
  );
}
function lD(t) {
  const [i, o] = $.useState(!1), r = $.useRef(null), s = $.useRef(null), u = $.useRef(null), [c, d] = $.useState(-1), m = $.useCallback(() => {
    o(!1), d(-1);
  }, []), y = $.useCallback(() => {
    t.disabled || (o(!0), d(0));
  }, [t.disabled]), g = $.useCallback(() => {
    i ? m() : y();
  }, [m, i, y]);
  $.useEffect(() => {
    if (!i)
      return;
    function b(S) {
      r.current && !r.current.contains(S.target) && m();
    }
    return document.addEventListener("mousedown", b), () => {
      document.removeEventListener("mousedown", b);
    };
  }, [m, i]);
  const p = $.useCallback(
    (b) => {
      if (!i) {
        (b.key === "Enter" || b.key === " " || b.key === "ArrowDown") && (b.preventDefault(), y());
        return;
      }
      const S = t.items.filter((M) => !M.disabled), N = t.items.map((M, T) => ({ item: M, index: T })).filter(({ item: M }) => !M.disabled).map(({ index: M }) => M);
      switch (b.key) {
        case "Escape":
          b.preventDefault(), m(), u.current?.focus();
          break;
        case "ArrowDown":
          if (b.preventDefault(), S.length > 0) {
            const T = (N.indexOf(c) + 1) % N.length;
            d(N[T]);
          }
          break;
        case "ArrowUp":
          if (b.preventDefault(), S.length > 0) {
            const M = N.indexOf(c), T = M <= 0 ? N.length - 1 : M - 1;
            d(N[T]);
          }
          break;
        case "Enter":
        case " ":
          b.preventDefault(), c >= 0 && !t.items[c]?.disabled && (t.items[c]?.onClick(), m(), u.current?.focus());
          break;
        case "Tab":
          m();
          break;
        case "Home":
          b.preventDefault(), N.length > 0 && d(N[0]);
          break;
        case "End":
          b.preventDefault(), N.length > 0 && d(N[N.length - 1]);
          break;
      }
    },
    [m, c, i, y, t.items]
  ), v = $.useCallback(
    (b) => {
      b.disabled || (b.onClick(), m(), u.current?.focus());
    },
    [m]
  );
  return /* @__PURE__ */ x.jsxs("div", { className: "fub-dropdown", ref: r, children: [
    /* @__PURE__ */ x.jsx(
      "button",
      {
        ref: u,
        type: "button",
        className: "fub-dropdown-trigger",
        onClick: g,
        onKeyDown: p,
        "aria-haspopup": "menu",
        "aria-expanded": i,
        disabled: t.disabled,
        children: t.trigger
      }
    ),
    i && /* @__PURE__ */ x.jsx(
      "div",
      {
        ref: s,
        className: `fub-dropdown-menu ${t.align === "right" ? "fub-dropdown-menu--right" : ""}`,
        role: "menu",
        "aria-orientation": "vertical",
        onKeyDown: p,
        children: t.items.map((b, S) => /* @__PURE__ */ x.jsxs(
          "button",
          {
            type: "button",
            className: `fub-dropdown-item ${c === S ? "fub-dropdown-item--focused" : ""} ${b.disabled ? "fub-dropdown-item--disabled" : ""}`,
            role: "menuitem",
            tabIndex: c === S ? 0 : -1,
            disabled: b.disabled,
            onClick: () => v(b),
            onMouseEnter: () => !b.disabled && d(S),
            children: [
              b.icon && /* @__PURE__ */ x.jsx("span", { className: "fub-dropdown-item-icon", children: b.icon }),
              /* @__PURE__ */ x.jsx("span", { className: "fub-dropdown-item-label", children: b.label })
            ]
          },
          S
        ))
      }
    )
  ] });
}
function sD() {
  return /* @__PURE__ */ x.jsx(
    "svg",
    {
      width: "12",
      height: "12",
      viewBox: "0 0 12 12",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: /* @__PURE__ */ x.jsx("path", { d: "M3 4.5L6 7.5L9 4.5" })
    }
  );
}
function bo(t) {
  return /* @__PURE__ */ x.jsx(
    "button",
    {
      type: "button",
      className: `fub-icon-btn ${t.className ?? ""}`,
      onClick: t.onClick,
      disabled: t.disabled,
      title: t.title,
      "aria-label": t.ariaLabel,
      children: t.icon
    }
  );
}
function uD() {
  return /* @__PURE__ */ x.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ x.jsx("path", { d: "M3 7h6a4 4 0 0 1 0 8H7" }),
    /* @__PURE__ */ x.jsx("path", { d: "M5 4L2 7l3 3" })
  ] });
}
function cD() {
  return /* @__PURE__ */ x.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ x.jsx("path", { d: "M13 7H7a4 4 0 0 0 0 8h2" }),
    /* @__PURE__ */ x.jsx("path", { d: "M11 4l3 3-3 3" })
  ] });
}
function fD() {
  return /* @__PURE__ */ x.jsx("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "currentColor", children: /* @__PURE__ */ x.jsx("path", { d: "M3 2.5v9l8-4.5-8-4.5z" }) });
}
function gv() {
  return /* @__PURE__ */ x.jsx("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ x.jsx("path", { d: "M7 2v7M4 6l3 3 3-3M2 11h10" }) });
}
function pv() {
  return /* @__PURE__ */ x.jsxs("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ x.jsx("path", { d: "M2 7a5 5 0 0 1 9-3M12 7a5 5 0 0 1-9 3" }),
    /* @__PURE__ */ x.jsx("path", { d: "M2 3v4h4M12 11V7H8" })
  ] });
}
function dD() {
  return /* @__PURE__ */ x.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ x.jsx("rect", { x: "2", y: "3", width: "12", height: "10", rx: "1" }),
    /* @__PURE__ */ x.jsx("path", { d: "M6 3v10" })
  ] });
}
function hD() {
  return /* @__PURE__ */ x.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ x.jsx("rect", { x: "2", y: "3", width: "12", height: "10", rx: "1" }),
    /* @__PURE__ */ x.jsx("path", { d: "M10 3v10" })
  ] });
}
function mD() {
  return /* @__PURE__ */ x.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ x.jsx("rect", { x: "2", y: "3", width: "12", height: "10", rx: "1" }),
    /* @__PURE__ */ x.jsx("path", { d: "M5 7l2 2-2 2" }),
    /* @__PURE__ */ x.jsx("path", { d: "M9 11h2" })
  ] });
}
function gD() {
  return /* @__PURE__ */ x.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ x.jsx("circle", { cx: "8", cy: "8", r: "3" }),
    /* @__PURE__ */ x.jsx("path", { d: "M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.4 1.4M11.55 11.55l1.4 1.4M3.05 12.95l1.4-1.4M11.55 4.45l1.4-1.4" })
  ] });
}
function pD() {
  return /* @__PURE__ */ x.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ x.jsx("path", { d: "M13.5 8.5a6 6 0 1 1-6-6c.3 0 .5.2.4.5-.3.8-.4 1.7-.4 2.5a5 5 0 0 0 5 5c.8 0 1.7-.1 2.5-.4.3-.1.5.1.5.4z" }) });
}
const yD = new Intl.DateTimeFormat(void 0, {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
});
function vD(t, i) {
  const o = t?.updatedAt && !Number.isNaN(Date.parse(t.updatedAt)) ? yD.format(new Date(t.updatedAt)) : void 0;
  return i ? t?.state === "saving" && t.source === "autosave" ? "Unsaved changes (autosaving...)" : t?.state === "saved" && t.source === "autosave" && o ? `Unsaved changes (autosaved ${o})` : t?.state === "error" && t.source === "autosave" ? `Unsaved changes (autosave failed: ${t.message ?? "internal error"})` : "Unsaved changes" : t?.state === "saving" ? "Saving..." : t?.state === "saved" && o ? `Saved ${o}` : t?.state === "error" ? `Save failed: ${t.message ?? "internal error"}` : "";
}
function yv(t) {
  const i = Se((I) => I.document.definition.name), o = Se((I) => I.isDirty), r = Se((I) => I.diagnostics.length), s = Se((I) => I.setMachineName), u = Se((I) => I.undo), c = Se((I) => I.redo), d = Se((I) => I.historyIndex), m = Se((I) => I.history.length), y = Ye((I) => I.togglePanel), g = Ye((I) => I.theme), p = Ye((I) => I.toggleTheme), v = Ye((I) => I.explorerCollapsed), b = Ye((I) => I.inspectorCollapsed), S = Ye((I) => I.consoleCollapsed), [N, M] = $.useState(null), T = vD(t.saveStatus, o), O = t.saveStatus?.state === "error" ? " fub-save-status-error" : t.saveStatus?.state === "saving" ? " fub-save-status-saving" : "", _ = (I, ee) => {
    if (!(!ee || typeof ee != "function"))
      try {
        const Q = ee();
        Q instanceof Promise && (M(I), Q.finally(() => {
          M((X) => X === I ? null : X);
        }));
      } catch {
        M((Q) => Q === I ? null : Q);
      }
  }, C = t.authoringAvailable ? "Save Draft" : "Save", k = !!t.readOnly, L = [
    {
      label: "Recover Draft",
      onClick: () => _("recover", t.onRecoverDraft),
      disabled: k || !t.recoveryAvailable || !!N,
      icon: /* @__PURE__ */ x.jsx(pv, {})
    },
    {
      label: "Version History",
      onClick: () => _("version-history", t.onOpenVersionHistory),
      disabled: !!N || !t.versionHistoryEnabled,
      icon: /* @__PURE__ */ x.jsx(pv, {})
    },
    {
      label: "Export JSON",
      onClick: () => _("export-json", t.onExportJSON),
      disabled: !!N,
      icon: /* @__PURE__ */ x.jsx(gv, {})
    },
    {
      label: "Export RPC",
      onClick: () => _("export-rpc", t.onExportRPC),
      disabled: !!N || !t.rpcExportAvailable,
      icon: /* @__PURE__ */ x.jsx(gv, {})
    }
  ], H = (I) => {
    t.onPanelToggle ? t.onPanelToggle(I) : y(I);
  };
  return /* @__PURE__ */ x.jsxs("header", { className: "fub-header", "aria-label": "Builder header", children: [
    /* @__PURE__ */ x.jsxs("div", { className: "fub-header-left", children: [
      /* @__PURE__ */ x.jsx("strong", { className: "fub-brand", children: "FSM Builder" }),
      /* @__PURE__ */ x.jsx("div", { className: "fub-header-separator", "aria-hidden": "true" }),
      /* @__PURE__ */ x.jsxs("label", { className: "fub-machine-name-label", children: [
        /* @__PURE__ */ x.jsx("span", { className: "fub-label", children: "Machine:" }),
        /* @__PURE__ */ x.jsx(
          "input",
          {
            "aria-label": "Machine name",
            className: "fub-input fub-machine-input",
            value: i,
            readOnly: k,
            onChange: (I) => s(I.target.value)
          }
        ),
        o ? /* @__PURE__ */ x.jsx("span", { "aria-label": "Unsaved changes", className: "fub-dirty-dot" }) : null
      ] }),
      /* @__PURE__ */ x.jsxs("span", { className: "fub-badge fub-problems-badge", "aria-live": "polite", children: [
        "Problems: ",
        r
      ] })
    ] }),
    /* @__PURE__ */ x.jsxs("div", { className: "fub-header-center", role: "group", "aria-label": "Builder actions", children: [
      /* @__PURE__ */ x.jsxs("div", { className: "fub-btn-group", children: [
        /* @__PURE__ */ x.jsx(
          bo,
          {
            icon: /* @__PURE__ */ x.jsx(uD, {}),
            onClick: u,
            disabled: k || d === 0 || !!N,
            ariaLabel: "Undo",
            title: "Undo (Ctrl+Z)"
          }
        ),
        /* @__PURE__ */ x.jsx(
          bo,
          {
            icon: /* @__PURE__ */ x.jsx(cD, {}),
            onClick: c,
            disabled: k || d >= m - 1 || !!N,
            ariaLabel: "Redo",
            title: "Redo (Ctrl+Shift+Z)"
          }
        )
      ] }),
      /* @__PURE__ */ x.jsx("div", { className: "fub-header-separator", "aria-hidden": "true" }),
      /* @__PURE__ */ x.jsxs("div", { className: "fub-btn-group", children: [
        /* @__PURE__ */ x.jsx(
          "button",
          {
            type: "button",
            className: "fub-btn fub-btn-secondary",
            onClick: () => _("save", t.onSave),
            disabled: k || !!N,
            "aria-keyshortcuts": "Control+S Meta+S",
            children: N === "save" ? "Saving..." : C
          }
        ),
        /* @__PURE__ */ x.jsx(
          "button",
          {
            type: "button",
            className: "fub-btn fub-btn-secondary",
            onClick: () => _("validate", t.onValidate),
            disabled: k || !!N,
            "aria-keyshortcuts": "Control+Enter Meta+Enter",
            children: N === "validate" ? "Validating..." : "Validate"
          }
        )
      ] }),
      /* @__PURE__ */ x.jsx("div", { className: "fub-header-separator", "aria-hidden": "true" }),
      /* @__PURE__ */ x.jsx(
        lD,
        {
          trigger: /* @__PURE__ */ x.jsxs(x.Fragment, { children: [
            "More ",
            /* @__PURE__ */ x.jsx(sD, {})
          ] }),
          items: L,
          disabled: !!N
        }
      ),
      /* @__PURE__ */ x.jsx("div", { className: "fub-header-separator", "aria-hidden": "true" }),
      /* @__PURE__ */ x.jsxs(
        "button",
        {
          type: "button",
          className: "fub-btn fub-btn-primary",
          onClick: () => _("simulate", t.onSimulate),
          disabled: !t.runtimeAvailable || !!N,
          title: t.runtimeAvailable ? "Run dry-run + snapshot" : "Runtime RPC unavailable",
          children: [
            /* @__PURE__ */ x.jsx(fD, {}),
            N === "simulate" ? "Running..." : "Simulate"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ x.jsxs("div", { className: "fub-header-right", role: "group", "aria-label": "View controls", children: [
      /* @__PURE__ */ x.jsxs("div", { className: "fub-btn-group", children: [
        /* @__PURE__ */ x.jsx(
          bo,
          {
            icon: /* @__PURE__ */ x.jsx(dD, {}),
            onClick: () => H("explorer"),
            ariaLabel: v ? "Show Explorer" : "Hide Explorer",
            title: v ? "Show Explorer" : "Hide Explorer",
            className: v ? "" : "fub-icon-btn--active"
          }
        ),
        /* @__PURE__ */ x.jsx(
          bo,
          {
            icon: /* @__PURE__ */ x.jsx(hD, {}),
            onClick: () => H("inspector"),
            ariaLabel: b ? "Show Inspector" : "Hide Inspector",
            title: b ? "Show Inspector" : "Hide Inspector",
            className: b ? "" : "fub-icon-btn--active"
          }
        ),
        /* @__PURE__ */ x.jsx(
          bo,
          {
            icon: /* @__PURE__ */ x.jsx(mD, {}),
            onClick: () => H("console"),
            ariaLabel: S ? "Show Console" : "Hide Console",
            title: S ? "Show Console" : "Hide Console",
            className: S ? "" : "fub-icon-btn--active"
          }
        )
      ] }),
      /* @__PURE__ */ x.jsx("div", { className: "fub-header-separator", "aria-hidden": "true" }),
      /* @__PURE__ */ x.jsx(
        bo,
        {
          icon: g === "light" ? /* @__PURE__ */ x.jsx(pD, {}) : /* @__PURE__ */ x.jsx(gD, {}),
          onClick: p,
          ariaLabel: g === "light" ? "Switch to dark theme" : "Switch to light theme",
          title: g === "light" ? "Switch to dark theme" : "Switch to light theme"
        }
      ),
      T && /* @__PURE__ */ x.jsx("span", { className: `fub-save-status${O}`, role: "status", "aria-live": "polite", children: T })
    ] })
  ] });
}
function kn(t) {
  return t.messages.length === 0 ? null : /* @__PURE__ */ x.jsx("ul", { className: "fub-inline-diags", role: "alert", children: t.messages.map((i, o) => /* @__PURE__ */ x.jsx("li", { children: i }, `${i}-${o}`)) });
}
function si(t) {
  return t.map((i) => i.message);
}
function bD(t) {
  return t.dynamic_to ? "dynamic" : "static";
}
function Fx(t) {
  return t.kind === "step" ? `step:${t.step?.action_id || "(action_id)"}` : t.kind === "when" ? `when:${t.expr || "(expr)"}` : `${t.kind}: unsupported`;
}
function Xi(t) {
  return /* @__PURE__ */ x.jsxs(
    "section",
    {
      className: "fub-panel fub-inspector",
      "aria-label": "Inspector panel",
      role: "region",
      "aria-labelledby": "fub-panel-inspector-heading",
      id: "fub-panel-inspector",
      tabIndex: -1,
      children: [
        /* @__PURE__ */ x.jsxs("div", { className: "fub-panel-header", id: "fub-panel-inspector-heading", children: [
          /* @__PURE__ */ x.jsx("strong", { children: t.title }),
          t.actions ?? null
        ] }),
        /* @__PURE__ */ x.jsx("div", { className: "fub-panel-body", children: t.children })
      ]
    }
  );
}
function Rh(t) {
  return t.readOnly ? /* @__PURE__ */ x.jsx("p", { className: "fub-readonly-note", children: "Read-only mode: editing is disabled in narrow/mobile layout." }) : null;
}
function xD(t) {
  if (!t.state)
    return /* @__PURE__ */ x.jsx(Xi, { title: "Inspector", children: /* @__PURE__ */ x.jsx("div", { children: "State not found." }) });
  const i = { kind: "state", stateIndex: t.stateIndex };
  return /* @__PURE__ */ x.jsxs(
    Xi,
    {
      title: "State",
      actions: /* @__PURE__ */ x.jsx(
        "button",
        {
          type: "button",
          className: "fub-mini-btn danger",
          onClick: () => t.removeState(t.stateIndex),
          disabled: t.readOnly,
          children: "Delete"
        }
      ),
      children: [
        /* @__PURE__ */ x.jsx(Rh, { readOnly: t.readOnly }),
        /* @__PURE__ */ x.jsxs("label", { className: "fub-field", children: [
          /* @__PURE__ */ x.jsx("span", { children: "Name" }),
          /* @__PURE__ */ x.jsx(
            "input",
            {
              "aria-label": "State name",
              className: "fub-input",
              value: t.state.name,
              readOnly: t.readOnly,
              onChange: (o) => t.updateStateName(t.stateIndex, o.target.value)
            }
          ),
          /* @__PURE__ */ x.jsx(
            kn,
            {
              messages: si(du(t.diagnostics, i, "name"))
            }
          )
        ] }),
        /* @__PURE__ */ x.jsxs("label", { className: "fub-checkbox-row", children: [
          /* @__PURE__ */ x.jsx(
            "input",
            {
              type: "checkbox",
              checked: !!t.state.initial,
              disabled: t.readOnly,
              onChange: (o) => t.updateStateFlag(t.stateIndex, "initial", o.target.checked)
            }
          ),
          "Initial"
        ] }),
        /* @__PURE__ */ x.jsxs("label", { className: "fub-checkbox-row", children: [
          /* @__PURE__ */ x.jsx(
            "input",
            {
              type: "checkbox",
              checked: !!t.state.terminal,
              disabled: t.readOnly,
              onChange: (o) => t.updateStateFlag(t.stateIndex, "terminal", o.target.checked)
            }
          ),
          "Final"
        ] }),
        /* @__PURE__ */ x.jsx(kn, { messages: si(t.selectionDiagnostics) })
      ]
    }
  );
}
function vv(t, i) {
  return t.id || `${t.kind}-${i}`;
}
function SD(t) {
  return t.nodes.length === 0 ? /* @__PURE__ */ x.jsx("p", { className: "fub-muted", children: "No workflow nodes. Add a Step or When node to begin." }) : /* @__PURE__ */ x.jsx("div", { className: "fub-workflow-graph", "aria-label": "Workflow visual editor", children: t.nodes.map((i, o) => /* @__PURE__ */ x.jsxs("div", { className: "fub-workflow-graph-node", children: [
    /* @__PURE__ */ x.jsxs(
      "button",
      {
        type: "button",
        className: "fub-list-item",
        onClick: () => t.onSelectNode(o),
        "aria-label": `Select workflow node ${i.id || i.kind}`,
        children: [
          /* @__PURE__ */ x.jsx("span", { className: "fub-item-main", children: Fx(i) }),
          fl(i.kind) ? null : /* @__PURE__ */ x.jsx("span", { className: "fub-item-meta", children: "read-only" })
        ]
      }
    ),
    /* @__PURE__ */ x.jsx("div", { className: "fub-workflow-graph-next", children: Array.isArray(i.next) && i.next.length > 0 ? i.next.map((r) => /* @__PURE__ */ x.jsxs("span", { className: "fub-workflow-graph-edge", children: [
      "->",
      " ",
      r
    ] }, `${vv(i, o)}-${r}`)) : /* @__PURE__ */ x.jsx("span", { className: "fub-muted", children: "No next links" }) })
  ] }, vv(i, o))) });
}
function wD(t, i) {
  return t.id || `${t.kind}-${i}`;
}
function ED(t) {
  if (!t.transition)
    return /* @__PURE__ */ x.jsx(Xi, { title: "Inspector", children: /* @__PURE__ */ x.jsx("div", { children: "Transition not found." }) });
  const i = { kind: "transition", transitionIndex: t.transitionIndex }, o = bD(t.transition);
  return /* @__PURE__ */ x.jsxs(
    Xi,
    {
      title: "Transition",
      actions: /* @__PURE__ */ x.jsx(
        "button",
        {
          type: "button",
          className: "fub-mini-btn danger",
          onClick: () => t.removeTransition(t.transitionIndex),
          disabled: t.readOnly,
          children: "Delete"
        }
      ),
      children: [
        /* @__PURE__ */ x.jsx(Rh, { readOnly: t.readOnly }),
        /* @__PURE__ */ x.jsxs("label", { className: "fub-field", children: [
          /* @__PURE__ */ x.jsx("span", { children: "Event" }),
          /* @__PURE__ */ x.jsx(
            "input",
            {
              "aria-label": "Transition event",
              className: "fub-input",
              value: t.transition.event,
              readOnly: t.readOnly,
              onChange: (r) => t.updateTransition(t.transitionIndex, "event", r.target.value)
            }
          ),
          /* @__PURE__ */ x.jsx(kn, { messages: si(du(t.diagnostics, i, "event")) })
        ] }),
        /* @__PURE__ */ x.jsxs("label", { className: "fub-field", children: [
          /* @__PURE__ */ x.jsx("span", { children: "From" }),
          /* @__PURE__ */ x.jsx(
            "select",
            {
              "aria-label": "Transition from",
              className: "fub-input",
              value: t.transition.from,
              disabled: t.readOnly,
              onChange: (r) => t.updateTransition(t.transitionIndex, "from", r.target.value),
              children: t.definition.states.map((r, s) => /* @__PURE__ */ x.jsx("option", { value: r.name, children: r.name }, `${r.name}-${s}`))
            }
          )
        ] }),
        /* @__PURE__ */ x.jsxs("fieldset", { className: "fub-fieldset", children: [
          /* @__PURE__ */ x.jsx("legend", { children: "Target type" }),
          /* @__PURE__ */ x.jsxs("label", { className: "fub-checkbox-row", children: [
            /* @__PURE__ */ x.jsx(
              "input",
              {
                type: "radio",
                name: `target-kind-${t.transitionIndex}`,
                checked: o === "static",
                disabled: t.readOnly,
                onChange: () => t.updateTransitionTargetKind(t.transitionIndex, "static")
              }
            ),
            "Static"
          ] }),
          /* @__PURE__ */ x.jsxs("label", { className: "fub-checkbox-row", children: [
            /* @__PURE__ */ x.jsx(
              "input",
              {
                type: "radio",
                name: `target-kind-${t.transitionIndex}`,
                checked: o === "dynamic",
                disabled: t.readOnly,
                onChange: () => t.updateTransitionTargetKind(t.transitionIndex, "dynamic")
              }
            ),
            "Dynamic"
          ] })
        ] }),
        o === "static" ? /* @__PURE__ */ x.jsxs("label", { className: "fub-field", children: [
          /* @__PURE__ */ x.jsx("span", { children: "To" }),
          /* @__PURE__ */ x.jsx(
            "select",
            {
              "aria-label": "Transition target",
              className: "fub-input",
              value: t.transition.to ?? "",
              disabled: t.readOnly,
              onChange: (r) => t.updateTransition(t.transitionIndex, "to", r.target.value),
              children: t.definition.states.map((r, s) => /* @__PURE__ */ x.jsx("option", { value: r.name, children: r.name }, `${r.name}-target-${s}`))
            }
          )
        ] }) : /* @__PURE__ */ x.jsxs("label", { className: "fub-field", children: [
          /* @__PURE__ */ x.jsx("span", { children: "Resolver" }),
          /* @__PURE__ */ x.jsx(
            "input",
            {
              "aria-label": "Dynamic resolver",
              className: "fub-input",
              value: t.transition.dynamic_to?.resolver ?? "",
              readOnly: t.readOnly,
              onChange: (r) => t.updateTransition(t.transitionIndex, "dynamic_to.resolver", r.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ x.jsxs("section", { className: "fub-section", children: [
          /* @__PURE__ */ x.jsxs("div", { className: "fub-subheader", children: [
            /* @__PURE__ */ x.jsx("strong", { children: "Workflow" }),
            /* @__PURE__ */ x.jsxs("div", { className: "fub-inline-actions", children: [
              /* @__PURE__ */ x.jsx(
                "button",
                {
                  type: "button",
                  className: "fub-mini-btn",
                  onClick: () => t.addWorkflowNode(t.transitionIndex, "step"),
                  disabled: t.readOnly,
                  children: "+ Step"
                }
              ),
              /* @__PURE__ */ x.jsx(
                "button",
                {
                  type: "button",
                  className: "fub-mini-btn",
                  onClick: () => t.addWorkflowNode(t.transitionIndex, "when"),
                  disabled: t.readOnly,
                  children: "+ When"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ x.jsx(
            SD,
            {
              nodes: t.transition.workflow.nodes,
              onSelectNode: (r) => t.selectWorkflowNode(t.transitionIndex, r)
            }
          ),
          /* @__PURE__ */ x.jsx("ul", { children: t.transition.workflow.nodes.map((r, s) => /* @__PURE__ */ x.jsx("li", { children: /* @__PURE__ */ x.jsxs(
            "button",
            {
              type: "button",
              className: "fub-list-item",
              onClick: () => t.selectWorkflowNode(t.transitionIndex, s),
              children: [
                /* @__PURE__ */ x.jsx("span", { children: Fx(r) }),
                fl(r.kind) ? null : /* @__PURE__ */ x.jsx("span", { className: "fub-item-meta", children: "unsupported" })
              ]
            }
          ) }, wD(r, s))) })
        ] }),
        /* @__PURE__ */ x.jsx(kn, { messages: si(t.selectionDiagnostics) })
      ]
    }
  );
}
function _D(t) {
  const i = t.label?.trim() || t.id, o = t.description?.trim() || "", r = Array.isArray(t.metadata?.tags) ? t.metadata.tags.filter((s) => typeof s == "string" && s.trim() !== "") : [];
  return {
    id: t.id,
    label: i,
    description: o,
    tags: r,
    searchText: `${t.id} ${i} ${o} ${r.join(" ")}`.toLowerCase()
  };
}
function bv(t) {
  return t.trim() !== "";
}
function ND(t) {
  const [i, o] = $.useState(!1), [r, s] = $.useState(0), u = !!t.readOnly, c = $.useMemo(() => t.actions.map(_D), [t.actions]), d = t.value.trim().toLowerCase(), m = $.useMemo(() => bv(d) ? c.filter((T) => T.searchText.includes(d)) : c, [c, d]), y = t.inputID ? `${t.inputID}-listbox` : "fub-action-catalog-listbox", g = m[r], p = g ? `${y}-${g.id}` : void 0, v = (T) => {
    t.onChange(T), o(!1), s(0);
  }, b = () => {
    u || t.loading || m.length === 0 || o(!0);
  }, S = () => {
    o(!1), s(0);
  }, N = (T) => {
    if (!u) {
      if (T.key === "ArrowDown") {
        if (T.preventDefault(), !i) {
          b();
          return;
        }
        if (m.length === 0)
          return;
        s((O) => (O + 1) % m.length);
        return;
      }
      if (T.key === "ArrowUp") {
        if (T.preventDefault(), !i) {
          b();
          return;
        }
        if (m.length === 0)
          return;
        s((O) => (O - 1 + m.length) % m.length);
        return;
      }
      if (T.key === "Enter" && i && g) {
        T.preventDefault(), v(g.id);
        return;
      }
      T.key === "Escape" && S();
    }
  }, M = t.loading ? "Loading action catalog..." : t.unavailableReason || (i && bv(t.value) && m.length === 0 ? "No matching actions." : null);
  return /* @__PURE__ */ x.jsxs("div", { className: "fub-action-catalog", children: [
    /* @__PURE__ */ x.jsx(
      "input",
      {
        id: t.inputID,
        role: "combobox",
        "aria-label": "Workflow action id",
        "aria-expanded": i,
        "aria-controls": y,
        "aria-autocomplete": "list",
        "aria-activedescendant": i ? p : void 0,
        className: "fub-input",
        value: t.value,
        readOnly: u,
        onChange: (T) => {
          t.onChange(T.target.value), s(0), b();
        },
        onFocus: b,
        onBlur: () => {
          window.setTimeout(() => {
            S();
          }, 0);
        },
        onKeyDown: N
      }
    ),
    i ? /* @__PURE__ */ x.jsx("ul", { id: y, role: "listbox", className: "fub-action-catalog-listbox", children: m.map((T, O) => /* @__PURE__ */ x.jsx("li", { role: "presentation", children: /* @__PURE__ */ x.jsxs(
      "button",
      {
        type: "button",
        role: "option",
        id: `${y}-${T.id}`,
        "aria-selected": O === r,
        className: `fub-action-catalog-option${O === r ? " is-active" : ""}`,
        onMouseDown: (_) => {
          _.preventDefault();
        },
        onClick: () => v(T.id),
        children: [
          /* @__PURE__ */ x.jsxs("span", { className: "fub-action-catalog-option-title", children: [
            /* @__PURE__ */ x.jsx("code", { children: T.id }),
            T.label !== T.id ? /* @__PURE__ */ x.jsx("span", { children: T.label }) : null
          ] }),
          T.description ? /* @__PURE__ */ x.jsx("span", { className: "fub-muted", children: T.description }) : null,
          T.tags.length > 0 ? /* @__PURE__ */ x.jsx("span", { className: "fub-action-catalog-option-tags", children: T.tags.join(", ") }) : null
        ]
      }
    ) }, T.id)) }) : null,
    M ? /* @__PURE__ */ x.jsx("p", { className: "fub-muted", role: t.loading ? "status" : void 0, children: M }) : null
  ] });
}
function CD(t) {
  return JSON.stringify(t ?? {}, null, 2);
}
function MD(t) {
  if (t.trim() === "")
    return { value: {} };
  try {
    const i = JSON.parse(t);
    return !i || typeof i != "object" || Array.isArray(i) ? { error: "metadata must be a JSON object" } : { value: i };
  } catch (i) {
    return i instanceof SyntaxError && i.message.trim() !== "" ? { error: `metadata must be valid JSON: ${i.message}` } : { error: "metadata must be valid JSON" };
  }
}
function TD(t) {
  const i = $.useMemo(() => CD(t.metadata), [t.metadata]), [o, r] = $.useState(i), [s, u] = $.useState(null);
  $.useEffect(() => {
    r(i), u(null);
  }, [i]);
  const c = () => {
    if (t.readOnly)
      return;
    const d = MD(o);
    if (d.error) {
      u(d.error);
      return;
    }
    u(null), t.onCommit(d.value ?? {});
  };
  return /* @__PURE__ */ x.jsxs("label", { className: "fub-field", children: [
    /* @__PURE__ */ x.jsx("span", { children: "Metadata (JSON object)" }),
    /* @__PURE__ */ x.jsx(
      "textarea",
      {
        "aria-label": "Workflow metadata",
        className: "fub-input fub-textarea",
        value: o,
        readOnly: !!t.readOnly,
        onChange: (d) => r(d.target.value),
        onBlur: c
      }
    ),
    s ? /* @__PURE__ */ x.jsx(kn, { messages: [s] }) : null
  ] });
}
function AD(t, i) {
  return `fub-action-catalog-${t}-${i}`;
}
function jD(t) {
  if (!t.transition || !t.node)
    return /* @__PURE__ */ x.jsx(Xi, { title: "Inspector", children: /* @__PURE__ */ x.jsx("div", { children: "Workflow node not found." }) });
  if (!fl(t.node.kind))
    return /* @__PURE__ */ x.jsxs(Xi, { title: "Workflow Node", children: [
      /* @__PURE__ */ x.jsxs("p", { className: "fub-guardrail", children: [
        "Node kind ",
        /* @__PURE__ */ x.jsx("code", { children: t.node.kind }),
        " is unsupported in builder v1 and is read-only."
      ] }),
      /* @__PURE__ */ x.jsxs("p", { className: "fub-muted", children: [
        "Unsupported kinds: ",
        Dv.join(", ")
      ] }),
      /* @__PURE__ */ x.jsx(kn, { messages: si(t.selectionDiagnostics) })
    ] });
  const i = {
    kind: "workflow-node",
    transitionIndex: t.transitionIndex,
    nodeIndex: t.nodeIndex
  };
  return /* @__PURE__ */ x.jsxs(
    Xi,
    {
      title: "Workflow Node",
      actions: /* @__PURE__ */ x.jsx(
        "button",
        {
          type: "button",
          className: "fub-mini-btn danger",
          onClick: () => t.removeWorkflowNode(t.transitionIndex, t.nodeIndex),
          disabled: t.readOnly,
          children: "Delete"
        }
      ),
      children: [
        /* @__PURE__ */ x.jsx(Rh, { readOnly: t.readOnly }),
        /* @__PURE__ */ x.jsxs("div", { className: "fub-muted", children: [
          "Kind: ",
          t.node.kind
        ] }),
        t.node.kind === "step" ? /* @__PURE__ */ x.jsxs(x.Fragment, { children: [
          /* @__PURE__ */ x.jsxs("label", { className: "fub-field", children: [
            /* @__PURE__ */ x.jsx("span", { children: "Action ID" }),
            /* @__PURE__ */ x.jsx(
              ND,
              {
                inputID: AD(t.transitionIndex, t.nodeIndex),
                value: t.node.step?.action_id ?? "",
                actions: t.actionCatalog.actions,
                loading: t.actionCatalog.loading,
                unavailableReason: t.actionCatalog.unavailableReason,
                readOnly: t.readOnly,
                onChange: (o) => {
                  t.updateWorkflowNodeField(t.transitionIndex, t.nodeIndex, "action_id", o);
                }
              }
            ),
            /* @__PURE__ */ x.jsx(
              kn,
              {
                messages: si(du(t.diagnostics, i, "action_id"))
              }
            )
          ] }),
          /* @__PURE__ */ x.jsxs("label", { className: "fub-checkbox-row", children: [
            /* @__PURE__ */ x.jsx(
              "input",
              {
                type: "checkbox",
                checked: !!t.node.step?.async,
                disabled: t.readOnly,
                onChange: (o) => t.updateWorkflowNodeField(t.transitionIndex, t.nodeIndex, "async", o.target.checked)
              }
            ),
            "Async"
          ] }),
          /* @__PURE__ */ x.jsxs("label", { className: "fub-field", children: [
            /* @__PURE__ */ x.jsx("span", { children: "Delay" }),
            /* @__PURE__ */ x.jsx(
              "input",
              {
                "aria-label": "Workflow delay",
                className: "fub-input",
                value: t.node.step?.delay ?? "",
                readOnly: t.readOnly,
                onChange: (o) => t.updateWorkflowNodeField(t.transitionIndex, t.nodeIndex, "delay", o.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ x.jsxs("label", { className: "fub-field", children: [
            /* @__PURE__ */ x.jsx("span", { children: "Timeout" }),
            /* @__PURE__ */ x.jsx(
              "input",
              {
                "aria-label": "Workflow timeout",
                className: "fub-input",
                value: t.node.step?.timeout ?? "",
                readOnly: t.readOnly,
                onChange: (o) => t.updateWorkflowNodeField(t.transitionIndex, t.nodeIndex, "timeout", o.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ x.jsx(
            TD,
            {
              metadata: t.node.step?.metadata,
              readOnly: t.readOnly,
              onCommit: (o) => t.updateWorkflowNodeMetadata(t.transitionIndex, t.nodeIndex, o)
            }
          )
        ] }) : /* @__PURE__ */ x.jsxs("label", { className: "fub-field", children: [
          /* @__PURE__ */ x.jsx("span", { children: "When expression" }),
          /* @__PURE__ */ x.jsx(
            "input",
            {
              "aria-label": "Workflow when expression",
              className: "fub-input",
              value: t.node.expr ?? "",
              readOnly: t.readOnly,
              onChange: (o) => t.updateWorkflowNodeField(t.transitionIndex, t.nodeIndex, "expr", o.target.value)
            }
          ),
          /* @__PURE__ */ x.jsx(kn, { messages: si(du(t.diagnostics, i, "expr")) })
        ] }),
        /* @__PURE__ */ x.jsx(kn, { messages: si(t.selectionDiagnostics) })
      ]
    }
  );
}
function DD(t) {
  const [i, o] = $.useState([]), [r, s] = $.useState(null), [u, c] = $.useState(!1);
  return $.useEffect(() => {
    let d = !1;
    if (!t) {
      c(!1), o([]), s("Action catalog unavailable.");
      return;
    }
    return c(!0), s(null), t.listActions().then((m) => {
      d || (o(m), s(m.length === 0 ? "Action catalog is empty." : null));
    }).catch(() => {
      d || (o([]), s("Action catalog unavailable."));
    }).finally(() => {
      d || c(!1);
    }), () => {
      d = !0;
    };
  }, [t]), { actions: i, loading: u, unavailableReason: r };
}
function xv(t) {
  const i = Se((O) => O.document.definition), o = Se((O) => O.selection), r = Se((O) => O.diagnostics), s = Se((O) => O.removeState), u = Se((O) => O.updateStateName), c = Se((O) => O.updateStateFlag), d = Se((O) => O.removeTransition), m = Se((O) => O.updateTransition), y = Se((O) => O.updateTransitionTargetKind), g = Se((O) => O.addWorkflowNode), p = Se((O) => O.removeWorkflowNode), v = Se((O) => O.selectWorkflowNode), b = Se((O) => O.updateWorkflowNodeField), S = Se((O) => O.updateWorkflowNodeMetadata), N = Aw(r, o), M = DD(t.actionCatalogProvider), T = !!t.readOnly;
  if (o.kind === "state")
    return /* @__PURE__ */ x.jsx(
      xD,
      {
        state: i.states[o.stateIndex],
        stateIndex: o.stateIndex,
        diagnostics: r,
        selectionDiagnostics: N,
        readOnly: T,
        removeState: s,
        updateStateName: u,
        updateStateFlag: c
      }
    );
  if (o.kind === "transition")
    return /* @__PURE__ */ x.jsx(
      ED,
      {
        definition: i,
        transition: i.transitions[o.transitionIndex],
        transitionIndex: o.transitionIndex,
        diagnostics: r,
        selectionDiagnostics: N,
        readOnly: T,
        removeTransition: d,
        updateTransition: m,
        updateTransitionTargetKind: y,
        addWorkflowNode: g,
        selectWorkflowNode: v
      }
    );
  if (o.kind === "workflow-node") {
    const O = i.transitions[o.transitionIndex], _ = O?.workflow.nodes?.[o.nodeIndex];
    return /* @__PURE__ */ x.jsx(
      jD,
      {
        transition: O,
        node: _,
        transitionIndex: o.transitionIndex,
        nodeIndex: o.nodeIndex,
        diagnostics: r,
        selectionDiagnostics: N,
        actionCatalog: M,
        readOnly: T,
        removeWorkflowNode: p,
        updateWorkflowNodeField: b,
        updateWorkflowNodeMetadata: S
      }
    );
  }
  return /* @__PURE__ */ x.jsxs(Xi, { title: "Inspector", children: [
    /* @__PURE__ */ x.jsx("p", { children: "Select a state, transition, or workflow node to edit properties." }),
    /* @__PURE__ */ x.jsx(kn, { messages: si(N) })
  ] });
}
const OD = [
  { category: "File", shortcut: "Ctrl/Cmd + S", action: "Save draft" },
  { category: "File", shortcut: "Ctrl/Cmd + Enter", action: "Validate" },
  { category: "Edit", shortcut: "Ctrl/Cmd + Z", action: "Undo" },
  { category: "Edit", shortcut: "Ctrl/Cmd + Shift + Z", action: "Redo" },
  { category: "Edit", shortcut: "Ctrl/Cmd + Y", action: "Redo (alternate)" },
  { category: "Navigation", shortcut: "Ctrl/Cmd + 1/2/3", action: "Focus explorer/canvas/inspector" },
  { category: "Navigation", shortcut: "Ctrl/Cmd + `", action: "Toggle/focus console" },
  { category: "Navigation", shortcut: "Arrow Up/Down", action: "Move selection" },
  { category: "Navigation", shortcut: "Escape", action: "Deselect current item" },
  { category: "Canvas", shortcut: "Ctrl/Cmd + +/-", action: "Zoom in/out" },
  { category: "Canvas", shortcut: "Ctrl/Cmd + 0", action: "Reset zoom and pan" },
  { category: "Canvas", shortcut: "Alt + Arrows", action: "Pan canvas" },
  { category: "Create", shortcut: "N", action: "Add state" },
  { category: "Create", shortcut: "T", action: "Add transition" },
  { category: "Help", shortcut: "?", action: "Toggle this help modal" }
];
function zD(t, i) {
  if (t.key !== "Tab")
    return;
  const o = Array.from(
    i.querySelectorAll(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
    )
  ).filter((c) => !c.hasAttribute("disabled"));
  if (o.length === 0)
    return;
  const r = o[0], s = o[o.length - 1], u = document.activeElement;
  if (!t.shiftKey && u === s) {
    t.preventDefault(), r.focus();
    return;
  }
  t.shiftKey && u === r && (t.preventDefault(), s.focus());
}
function Sv(t) {
  const i = $.useRef(null), o = $.useRef(null), r = $.useMemo(() => OD, []);
  return $.useEffect(() => {
    if (!t.open)
      return;
    o.current?.focus();
    const s = (u) => {
      if (i.current) {
        if (u.key === "Escape") {
          u.preventDefault(), t.onClose();
          return;
        }
        zD(u, i.current);
      }
    };
    return window.addEventListener("keydown", s), () => {
      window.removeEventListener("keydown", s);
    };
  }, [t.onClose, t.open]), t.open ? /* @__PURE__ */ x.jsx("div", { className: "fub-modal-overlay", role: "presentation", onClick: t.onClose, children: /* @__PURE__ */ x.jsxs(
    "div",
    {
      ref: i,
      className: "fub-modal",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "fub-keyboard-help-title",
      onClick: (s) => s.stopPropagation(),
      children: [
        /* @__PURE__ */ x.jsxs("header", { className: "fub-modal-header", children: [
          /* @__PURE__ */ x.jsx("h2", { id: "fub-keyboard-help-title", children: "Keyboard Shortcuts" }),
          /* @__PURE__ */ x.jsx(
            "button",
            {
              ref: o,
              type: "button",
              className: "fub-mini-btn",
              onClick: t.onClose,
              "aria-label": "Close keyboard shortcuts",
              children: "Close"
            }
          )
        ] }),
        /* @__PURE__ */ x.jsx("div", { className: "fub-modal-body", children: /* @__PURE__ */ x.jsxs("table", { className: "fub-shortcuts-table", children: [
          /* @__PURE__ */ x.jsx("thead", { children: /* @__PURE__ */ x.jsxs("tr", { children: [
            /* @__PURE__ */ x.jsx("th", { scope: "col", children: "Category" }),
            /* @__PURE__ */ x.jsx("th", { scope: "col", children: "Shortcut" }),
            /* @__PURE__ */ x.jsx("th", { scope: "col", children: "Action" })
          ] }) }),
          /* @__PURE__ */ x.jsx("tbody", { children: r.map((s) => /* @__PURE__ */ x.jsxs("tr", { children: [
            /* @__PURE__ */ x.jsx("td", { children: s.category }),
            /* @__PURE__ */ x.jsx("td", { children: /* @__PURE__ */ x.jsx("code", { children: s.shortcut }) }),
            /* @__PURE__ */ x.jsx("td", { children: s.action })
          ] }, `${s.category}-${s.shortcut}`)) })
        ] }) })
      ]
    }
  ) }) : null;
}
function RD(t) {
  return t === "explorer" ? "fub-panel-explorer" : t === "canvas" ? "fub-panel-canvas" : t === "inspector" ? "fub-panel-inspector" : "fub-panel-console";
}
function wv(t) {
  return `fub-mobile-tab-${t}`;
}
function Ev(t) {
  return `fub-mobile-tabpanel-${t}`;
}
function kD(t) {
  const i = Ye((E) => E.explorerWidth), o = Ye((E) => E.inspectorWidth), r = Ye((E) => E.consoleHeight), s = Ye((E) => E.explorerCollapsed), u = Ye((E) => E.inspectorCollapsed), c = Ye((E) => E.consoleCollapsed), d = Ye((E) => E.mobilePanel), m = Ye((E) => E.keyboardHelpOpen), y = Ye((E) => E.togglePanel), g = Ye((E) => E.setPanelCollapsed), p = Ye((E) => E.setMobilePanel), v = Ye((E) => E.setKeyboardHelpOpen), b = Ye((E) => E.toggleKeyboardHelp), S = Ye((E) => E.theme), N = Se((E) => E.document.definition), M = Se((E) => E.diagnostics), T = Dt((E) => E.log), O = Dt((E) => E.errors), _ = Dt((E) => E.projectedOutcome), C = Dt((E) => E.snapshotResult), k = $.useMemo(() => Ew(N), [N]), L = jE(), H = L === "mobile-readonly", I = vd("explorer"), ee = vd("inspector"), Q = vd("console"), X = $.useCallback((E) => {
    E && E();
  }, []), J = $.useCallback((E) => {
    const U = () => {
      document.getElementById(RD(E))?.focus();
    };
    if (typeof window.requestAnimationFrame == "function") {
      window.requestAnimationFrame(U);
      return;
    }
    window.setTimeout(U, 0);
  }, []), G = $.useCallback(
    (E) => {
      L === "mobile-readonly" ? p(E) : (E === "explorer" && g("explorer", !1), E === "inspector" && g("inspector", !1), E === "console" && g("console", !1)), J(E);
    },
    [J, p, g, L]
  ), j = $.useCallback(
    (E) => {
      L === "mobile-readonly" ? p(E) : y(E), J(E);
    },
    [J, p, y, L]
  ), Y = $.useCallback(() => {
    if (L === "mobile-readonly") {
      p("console");
      return;
    }
    y("console");
  }, [p, y, L]), A = $.useCallback(() => {
    v(!1);
  }, [v]);
  TE({
    onSave: () => X(t.onSave),
    onValidate: () => X(t.onValidate),
    onFocusPanel: G,
    onToggleConsole: Y,
    keyboardHelpOpen: m,
    onToggleKeyboardHelp: b,
    onCloseKeyboardHelp: A,
    readOnly: H
  }), $.useEffect(() => {
    L === "compact" && g("explorer", !0);
  }, [g, L]);
  const z = $.useMemo(() => {
    const E = s ? "0px" : `${i}px`, U = u ? "0px" : `${o}px`;
    return `${E} ${s ? "0px" : "6px"} minmax(420px,1fr) ${u ? "0px" : "6px"} ${U}`;
  }, [s, i, u, o]), q = $.useMemo(() => {
    const E = k.length > 0 ? "32px" : "0px", U = c ? "0px" : `min(${r}px, 40vh)`;
    return `48px ${E} minmax(280px,1fr) ${c ? "0px" : "6px"} ${U}`;
  }, [c, r, k.length]), W = $.useMemo(() => M.length === 0 ? "No diagnostics." : M.length === 1 ? "1 diagnostic in problems panel." : `${M.length} diagnostics in problems panel.`, [M.length]), te = $.useMemo(() => {
    const E = O.at(-1);
    return E ? `Simulation error ${E.code}: ${E.message}` : _ ? `Projected ${_.event}: ${_.previousState} to ${_.currentState}.` : T.at(-1)?.message ?? "Simulation idle.";
  }, [_, O, T]), D = !!(_ || C);
  if (L === "mobile-readonly")
    return /* @__PURE__ */ x.jsxs(x.Fragment, { children: [
      /* @__PURE__ */ x.jsxs("div", { className: `fub-root fub-root-mobile${D ? " fub-shell--simulation" : ""}`, "data-theme": S, children: [
        /* @__PURE__ */ x.jsx("div", { className: "fub-slot-header", children: /* @__PURE__ */ x.jsx(yv, { ...t, readOnly: !0, onPanelToggle: j }) }),
        k.length > 0 ? /* @__PURE__ */ x.jsxs("div", { className: "fub-guardrail-banner", role: "status", "aria-live": "polite", children: [
          "Unsupported workflow nodes are read-only: ",
          k.join(", ")
        ] }) : null,
        /* @__PURE__ */ x.jsx("div", { className: "fub-mobile-warning", role: "status", "aria-live": "polite", children: "Narrow/mobile mode is reduced-capability and read-only. Use desktop width for full authoring." }),
        /* @__PURE__ */ x.jsx("nav", { className: "fub-mobile-tabs", role: "tablist", "aria-label": "Builder panels", children: ["explorer", "canvas", "inspector", "console"].map((E) => /* @__PURE__ */ x.jsx(
          "button",
          {
            type: "button",
            role: "tab",
            id: wv(E),
            "aria-controls": Ev(E),
            "aria-selected": d === E,
            tabIndex: d === E ? 0 : -1,
            className: `fub-mobile-tab${d === E ? " is-active" : ""}`,
            onClick: () => p(E),
            children: E
          },
          E
        )) }),
        /* @__PURE__ */ x.jsxs(
          "div",
          {
            className: "fub-mobile-panel",
            role: "tabpanel",
            id: Ev(d),
            "aria-labelledby": wv(d),
            children: [
              d === "explorer" ? /* @__PURE__ */ x.jsx(mv, { readOnly: !0 }) : null,
              d === "canvas" ? /* @__PURE__ */ x.jsx(av, { readOnly: !0 }) : null,
              d === "inspector" ? /* @__PURE__ */ x.jsx(xv, { actionCatalogProvider: t.actionCatalogProvider, readOnly: !0 }) : null,
              d === "console" ? /* @__PURE__ */ x.jsx(ov, {}) : null
            ]
          }
        ),
        /* @__PURE__ */ x.jsx("div", { className: "fub-sr-only", role: "status", "aria-live": "polite", "aria-atomic": "true", children: W }),
        /* @__PURE__ */ x.jsx("div", { className: "fub-sr-only", role: "status", "aria-live": "polite", "aria-atomic": "true", children: te })
      ] }),
      /* @__PURE__ */ x.jsx(Sv, { open: m, onClose: A })
    ] });
  const V = (k.length > 0, 3), ne = (k.length > 0, 4), B = (k.length > 0, 5);
  return /* @__PURE__ */ x.jsxs(x.Fragment, { children: [
    /* @__PURE__ */ x.jsxs(
      "div",
      {
        className: `fub-root${D ? " fub-shell--simulation" : ""}`,
        "data-theme": S,
        style: { gridTemplateColumns: z, gridTemplateRows: q },
        children: [
          /* @__PURE__ */ x.jsx("div", { className: "fub-slot-header", style: { gridColumn: "1 / -1", gridRow: 1 }, children: /* @__PURE__ */ x.jsx(yv, { ...t, readOnly: !1, onPanelToggle: j }) }),
          k.length > 0 ? /* @__PURE__ */ x.jsxs("div", { className: "fub-guardrail-banner", style: { gridColumn: "1 / -1", gridRow: 2 }, role: "status", "aria-live": "polite", children: [
            "Unsupported workflow nodes are read-only: ",
            k.join(", ")
          ] }) : null,
          s ? null : /* @__PURE__ */ x.jsx("div", { style: { gridColumn: 1, gridRow: V, display: "flex", flexDirection: "column", overflow: "hidden" }, children: /* @__PURE__ */ x.jsx(mv, { readOnly: !1 }) }),
          s ? null : /* @__PURE__ */ x.jsx(
            "div",
            {
              className: "fub-resizer fub-resizer-vertical",
              role: "separator",
              "aria-label": "Resize explorer",
              onPointerDown: I,
              style: { gridColumn: 2, gridRow: V }
            }
          ),
          /* @__PURE__ */ x.jsx("div", { style: { gridColumn: 3, gridRow: V, display: "flex", flexDirection: "column", minWidth: 0, minHeight: 0, overflow: "hidden" }, children: /* @__PURE__ */ x.jsx(av, { readOnly: !1 }) }),
          u ? null : /* @__PURE__ */ x.jsx(
            "div",
            {
              className: "fub-resizer fub-resizer-vertical",
              role: "separator",
              "aria-label": "Resize inspector",
              onPointerDown: ee,
              style: { gridColumn: 4, gridRow: V }
            }
          ),
          u ? null : /* @__PURE__ */ x.jsx("div", { style: { gridColumn: 5, gridRow: V, display: "flex", flexDirection: "column", overflow: "hidden" }, children: /* @__PURE__ */ x.jsx(xv, { actionCatalogProvider: t.actionCatalogProvider, readOnly: !1 }) }),
          c ? null : /* @__PURE__ */ x.jsx(
            "div",
            {
              className: "fub-resizer fub-resizer-horizontal",
              role: "separator",
              "aria-label": "Resize console",
              onPointerDown: Q,
              style: { gridColumn: "1 / -1", gridRow: ne }
            }
          ),
          c ? null : /* @__PURE__ */ x.jsx("div", { className: "fub-slot-console", style: { gridColumn: "1 / -1", gridRow: B }, children: /* @__PURE__ */ x.jsx(ov, {}) }),
          /* @__PURE__ */ x.jsx("div", { className: "fub-sr-only", role: "status", "aria-live": "polite", "aria-atomic": "true", children: W }),
          /* @__PURE__ */ x.jsx("div", { className: "fub-sr-only", role: "status", "aria-live": "polite", "aria-atomic": "true", children: te })
        ]
      }
    ),
    /* @__PURE__ */ x.jsx(Sv, { open: m, onClose: A })
  ] });
}
function HD(t) {
  return t.open ? /* @__PURE__ */ x.jsx("div", { className: "fub-modal-overlay", role: "presentation", onClick: t.onClose, children: /* @__PURE__ */ x.jsxs(
    "div",
    {
      className: "fub-modal",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "fub-conflict-resolution-title",
      onClick: (i) => i.stopPropagation(),
      children: [
        /* @__PURE__ */ x.jsxs("header", { className: "fub-modal-header", children: [
          /* @__PURE__ */ x.jsx("h2", { id: "fub-conflict-resolution-title", children: "Version Conflict" }),
          /* @__PURE__ */ x.jsx("button", { type: "button", className: "fub-mini-btn", onClick: t.onClose, disabled: t.busy, children: "Close" })
        ] }),
        /* @__PURE__ */ x.jsxs("div", { className: "fub-modal-body", children: [
          /* @__PURE__ */ x.jsxs("p", { className: "fub-log-error", children: [
            "Save failed with ",
            /* @__PURE__ */ x.jsx("code", { children: "FSM_VERSION_CONFLICT" }),
            " for ",
            /* @__PURE__ */ x.jsx("code", { children: t.machineId }),
            "."
          ] }),
          /* @__PURE__ */ x.jsxs("p", { children: [
            /* @__PURE__ */ x.jsx("strong", { children: "Your base version:" }),
            " ",
            /* @__PURE__ */ x.jsx("code", { children: t.expectedVersion ?? "unknown" })
          ] }),
          /* @__PURE__ */ x.jsxs("p", { children: [
            /* @__PURE__ */ x.jsx("strong", { children: "Server version:" }),
            " ",
            /* @__PURE__ */ x.jsx("code", { children: t.actualVersion ?? "unknown" })
          ] }),
          t.conflictPaths && t.conflictPaths.length > 0 ? /* @__PURE__ */ x.jsxs(x.Fragment, { children: [
            /* @__PURE__ */ x.jsx("strong", { children: "Conflict paths" }),
            /* @__PURE__ */ x.jsx("ul", { children: t.conflictPaths.map((i) => /* @__PURE__ */ x.jsx("li", { children: /* @__PURE__ */ x.jsx("code", { children: i }) }, i)) })
          ] }) : null,
          /* @__PURE__ */ x.jsxs("div", { className: "fub-inline-actions", children: [
            /* @__PURE__ */ x.jsx("button", { type: "button", className: "fub-btn", onClick: () => t.onResolve("keep-mine"), disabled: t.busy, children: "Keep Mine" }),
            /* @__PURE__ */ x.jsx("button", { type: "button", className: "fub-btn", onClick: () => t.onResolve("keep-server"), disabled: t.busy, children: "Keep Server" }),
            /* @__PURE__ */ x.jsx("button", { type: "button", className: "fub-btn fub-btn-primary", onClick: () => t.onResolve("merge"), disabled: t.busy, children: "Merge" })
          ] }),
          /* @__PURE__ */ x.jsxs("p", { className: "fub-muted", children: [
            "Retry loop: fetch latest ",
            "->",
            " resolve choice ",
            "->",
            " save_draft with latest baseVersion."
          ] })
        ] })
      ]
    }
  ) }) : null;
}
function LD(t) {
  if (!t.open)
    return null;
  const i = t.items.find((r) => r.version === t.selectedVersion), o = !!(i && i.version !== t.currentVersion);
  return /* @__PURE__ */ x.jsx("div", { className: "fub-modal-overlay", role: "presentation", onClick: t.onClose, children: /* @__PURE__ */ x.jsxs(
    "div",
    {
      className: "fub-modal",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "fub-version-history-title",
      onClick: (r) => r.stopPropagation(),
      children: [
        /* @__PURE__ */ x.jsxs("header", { className: "fub-modal-header", children: [
          /* @__PURE__ */ x.jsx("h2", { id: "fub-version-history-title", children: "Version History" }),
          /* @__PURE__ */ x.jsx("button", { type: "button", className: "fub-mini-btn", onClick: t.onClose, children: "Close" })
        ] }),
        /* @__PURE__ */ x.jsxs("div", { className: "fub-modal-body", children: [
          t.errorMessage ? /* @__PURE__ */ x.jsx("p", { className: "fub-log-error", children: t.errorMessage }) : null,
          t.loading ? /* @__PURE__ */ x.jsx("p", { className: "fub-muted", children: "Loading version history..." }) : null,
          t.items.length === 0 && !t.loading ? /* @__PURE__ */ x.jsx("p", { className: "fub-muted", children: "No history entries available." }) : null,
          t.items.length > 0 ? /* @__PURE__ */ x.jsxs("div", { className: "fub-version-history-grid", children: [
            /* @__PURE__ */ x.jsxs("div", { children: [
              /* @__PURE__ */ x.jsx("h3", { children: "Versions" }),
              /* @__PURE__ */ x.jsx("ul", { children: t.items.map((r) => /* @__PURE__ */ x.jsx("li", { children: /* @__PURE__ */ x.jsxs(
                "button",
                {
                  type: "button",
                  className: `fub-list-item${r.version === t.selectedVersion ? " is-selected" : ""}`,
                  onClick: () => t.onSelectVersion(r.version),
                  children: [
                    /* @__PURE__ */ x.jsx("span", { className: "fub-item-main", children: r.version }),
                    /* @__PURE__ */ x.jsx("span", { className: "fub-item-meta", children: r.isDraft ? "draft" : "published" })
                  ]
                }
              ) }, r.version)) })
            ] }),
            /* @__PURE__ */ x.jsxs("div", { children: [
              /* @__PURE__ */ x.jsx("h3", { children: "Details" }),
              i ? /* @__PURE__ */ x.jsxs("div", { className: "fub-console-card", children: [
                /* @__PURE__ */ x.jsxs("p", { children: [
                  /* @__PURE__ */ x.jsx("strong", { children: "Version:" }),
                  " ",
                  /* @__PURE__ */ x.jsx("code", { children: i.version })
                ] }),
                /* @__PURE__ */ x.jsxs("p", { children: [
                  /* @__PURE__ */ x.jsx("strong", { children: "Updated:" }),
                  " ",
                  /* @__PURE__ */ x.jsx("code", { children: i.updatedAt })
                ] }),
                i.publishedAt ? /* @__PURE__ */ x.jsxs("p", { children: [
                  /* @__PURE__ */ x.jsx("strong", { children: "Published:" }),
                  " ",
                  /* @__PURE__ */ x.jsx("code", { children: i.publishedAt })
                ] }) : null,
                i.etag ? /* @__PURE__ */ x.jsxs("p", { children: [
                  /* @__PURE__ */ x.jsx("strong", { children: "ETag:" }),
                  " ",
                  /* @__PURE__ */ x.jsx("code", { children: i.etag })
                ] }) : null,
                /* @__PURE__ */ x.jsxs("div", { className: "fub-inline-actions", children: [
                  /* @__PURE__ */ x.jsx("button", { type: "button", className: "fub-btn", disabled: !o, onClick: t.onRestoreSelected, children: "Restore Selected" }),
                  o ? null : /* @__PURE__ */ x.jsx("span", { className: "fub-muted", children: "Current version selected." })
                ] })
              ] }) : /* @__PURE__ */ x.jsx("p", { className: "fub-muted", children: "Select a version to inspect details and restore." }),
              /* @__PURE__ */ x.jsx("h3", { children: "Diff" }),
              t.diff ? /* @__PURE__ */ x.jsxs("div", { className: "fub-console-card", children: [
                /* @__PURE__ */ x.jsxs("p", { children: [
                  /* @__PURE__ */ x.jsx("strong", { children: "Compared:" }),
                  " ",
                  /* @__PURE__ */ x.jsx("code", { children: t.diff.baseVersion }),
                  " ",
                  "->",
                  " ",
                  /* @__PURE__ */ x.jsx("code", { children: t.diff.targetVersion })
                ] }),
                /* @__PURE__ */ x.jsxs("p", { children: [
                  /* @__PURE__ */ x.jsx("strong", { children: "Conflicts:" }),
                  " ",
                  t.diff.hasConflicts ? "yes" : "no"
                ] }),
                t.diff.changes.length > 0 ? /* @__PURE__ */ x.jsx("ul", { children: t.diff.changes.map((r) => /* @__PURE__ */ x.jsxs("li", { children: [
                  /* @__PURE__ */ x.jsx("code", { children: r.path }),
                  " (",
                  r.changeType,
                  ")"
                ] }, `${r.path}-${r.changeType}`)) }) : /* @__PURE__ */ x.jsx("p", { className: "fub-muted", children: "No changes reported." }),
                t.diff.conflictPaths && t.diff.conflictPaths.length > 0 ? /* @__PURE__ */ x.jsxs(x.Fragment, { children: [
                  /* @__PURE__ */ x.jsx("strong", { children: "Conflict Paths" }),
                  /* @__PURE__ */ x.jsx("ul", { children: t.diff.conflictPaths.map((r) => /* @__PURE__ */ x.jsx("li", { children: /* @__PURE__ */ x.jsx("code", { children: r }) }, r)) })
                ] }) : null
              ] }) : /* @__PURE__ */ x.jsx("p", { className: "fub-muted", children: t.diffUnavailableReason ?? "No diff selected." })
            ] })
          ] }) : null
        ] })
      ]
    }
  ) });
}
const BD = new Set(Object.values(Rn));
function kd(t) {
  return typeof t == "string" && BD.has(t) ? t : Rn.internal;
}
function Lr(t) {
  return typeof t == "string" && t.trim() !== "" ? t : "internal error";
}
function ID(t) {
  return t && typeof t == "object" && !Array.isArray(t) ? t : null;
}
function VD(t) {
  return t instanceof Error ? t : null;
}
function UD(t) {
  return t.code === -32601 ? !0 : t.message.toLowerCase().includes("method not found");
}
function YD(t) {
  return t.status === 404 || t.status === 405;
}
function qD(t) {
  const i = " Verify RPC endpoint and FSM method registration (for example `/api/rpc` with `fsm.*` methods).";
  return t.endsWith(i) ? t : `${t}${i}`;
}
function ha(t) {
  if (t instanceof fu)
    return {
      code: kd(t.envelope.code),
      message: Lr(t.envelope.message),
      method: t.method
    };
  if (t instanceof cu)
    return UD(t) || YD(t) ? {
      code: Rn.internal,
      message: qD(Lr(t.message)),
      method: t.method
    } : {
      code: kd(t.code),
      message: Lr(t.message),
      method: t.method
    };
  const i = ID(t);
  if (i)
    return {
      code: kd(i.code),
      message: Lr(i.message),
      method: typeof i.method == "string" ? i.method : void 0
    };
  const o = VD(t);
  return o ? {
    code: Rn.internal,
    message: Lr(o.message)
  } : {
    code: Rn.internal,
    message: "internal error"
  };
}
function iO(t) {
  return `${t.method ? `${t.method}: ` : ""}[${t.code}] ${t.message}`;
}
function $D(t) {
  return {
    async applyEventDryRun(i, o) {
      const r = await yn({
        client: t,
        method: Gr.applyEvent,
        data: i,
        meta: o
      });
      return Xv(r);
    },
    async snapshot(i, o) {
      const r = await yn({
        client: t,
        method: Gr.snapshot,
        data: i,
        meta: o
      });
      return Gv(r);
    }
  };
}
function XD(t) {
  return $.useMemo(() => t ? $D(t) : null, [t]);
}
function Ru(t) {
  return t !== null && typeof t == "object" && !Array.isArray(t);
}
function GD(t, i, o, r) {
  if (Ru(i)) {
    const s = ["id", "name", "machineId", "event"];
    for (const u of s) {
      const c = i[u];
      if (!(typeof c != "string" || c.trim() === ""))
        for (let d = 0; d < t.length; d += 1) {
          if (r.has(d))
            continue;
          const m = t[d];
          if (Ru(m) && m[u] === c)
            return r.add(d), m;
        }
    }
  }
  if (o < t.length)
    return r.add(o), t[o];
}
function lh(t, i) {
  if (Array.isArray(i)) {
    const o = Array.isArray(t) ? t : [], r = /* @__PURE__ */ new Set();
    return i.map((s, u) => lh(GD(o, s, u, r), s));
  }
  if (Ru(i)) {
    const o = Ru(t) ? t : {}, r = {};
    for (const [s, u] of Object.entries(o))
      r[s] = He(u);
    for (const [s, u] of Object.entries(i))
      r[s] = lh(o[s], u);
    return r;
  }
  return He(i);
}
function Xr(t) {
  return He(t);
}
function _v(t) {
  return lh(t.baseDocument, t.editedDocument);
}
function ZD(t) {
  return `${t}-preview`;
}
function KD(t) {
  if (t.transitions.length === 0)
    return null;
  if (t.selection.kind === "transition") {
    const o = t.transitions[t.selection.transitionIndex];
    if (o)
      return {
        id: o.id,
        event: o.event,
        from: o.from
      };
  }
  if (t.selection.kind === "workflow-node") {
    const o = t.transitions[t.selection.transitionIndex];
    if (o)
      return {
        id: o.id,
        event: o.event,
        from: o.from
      };
  }
  const i = t.transitions[0];
  return {
    id: i.id,
    event: i.event,
    from: i.from
  };
}
function QD(t) {
  return t !== null && typeof t == "object" && !Array.isArray(t) ? t : null;
}
function FD(t) {
  const i = Se((fe) => fe.document), o = Se((fe) => fe.diagnostics), r = Se((fe) => fe.isDirty), s = Se((fe) => fe.selection), u = Se((fe) => fe.replaceDocument), c = Se((fe) => fe.restoreDocument), d = Se((fe) => fe.setDiagnostics), m = Se((fe) => fe.consumeValidationScopeNodeIDs), y = Se((fe) => fe.markSaved), g = Se((fe) => fe.applyRemoteSave), p = Dt((fe) => fe.setApplyEventWirePayload), v = Dt((fe) => fe.setSnapshotWirePayload), b = Dt((fe) => fe.pushError), S = Dt((fe) => fe.pushInfo), N = $.useMemo(() => t.rpcClient || !t.rpcEndpoint || t.rpcEndpoint.trim() === "" ? null : hw({ endpoint: t.rpcEndpoint }), [t.rpcClient, t.rpcEndpoint]), M = t.rpcClient ?? N, T = XD(M ?? null), O = pw(M ?? null), _ = t.runtimeRPC ?? T, C = t.authoringRPC ?? O, k = $.useMemo(
    () => t.persistenceStore ?? Vw(),
    [t.persistenceStore]
  ), L = $.useMemo(
    () => t.exportAdapter ?? xw(),
    [t.exportAdapter]
  ), H = (t.machineId?.trim() || i.definition.id || "machine").trim(), I = t.simulationDefaults?.entityId ?? ZD(H), ee = t.simulationDefaults?.msg ?? {}, Q = t.simulationDefaults?.meta, X = t.autosaveDebounceMs ?? 400, J = $.useRef(null);
  J.current === null && (J.current = JSON.stringify(i));
  const G = $.useRef(Xr(i)), [j, Y] = $.useState(null), [A, z] = $.useState({ state: "idle" }), [q, W] = $.useState(!1), [te, D] = $.useState(!1), [V, ne] = $.useState([]), [B, E] = $.useState(void 0), [U, F] = $.useState(void 0), [K, Z] = $.useState(null), [se, he] = $.useState(null), [ge, ve] = $.useState(null), [xe, _e] = $.useState(!1), De = $.useRef({}), qe = $.useCallback(() => _v({
    baseDocument: G.current,
    editedDocument: i
  }), [i]), Ie = $.useCallback(
    (fe) => {
      const pe = ha(fe);
      b({
        code: pe.code,
        message: pe.message,
        method: pe.method
      });
    },
    [b]
  ), ot = $.useCallback((fe, pe) => {
    const Ne = ha(pe);
    z({
      state: "error",
      source: fe,
      message: Ne.message,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
  }, []), nt = $.useCallback(
    async (fe) => {
      await k.save({
        machineId: H,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
        document: He(fe)
      }), Y(null);
    },
    [H, k]
  ), St = $.useCallback(
    async (fe) => {
      g(fe.version, fe.draftState, fe.diagnostics);
      const pe = {
        ...He(fe.draft),
        definition: {
          ...He(fe.draft.definition),
          version: fe.version
        },
        draft_state: He(fe.draftState)
      };
      G.current = He(pe), await nt(pe), z({
        state: "saved",
        source: "manual",
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      });
    },
    [g, nt]
  ), tn = $.useCallback(
    async (fe, pe) => {
      if (fe.envelope.code !== Rn.versionConflict || !C)
        return !1;
      try {
        const Ne = await C.getMachine({
          machineId: H,
          preferDraft: !0
        }), Ae = QD(fe.envelope.details), $t = Ae?.conflictPaths, Mn = Array.isArray($t) && $t.every((ko) => typeof ko == "string") ? $t : void 0;
        return ve({
          machineId: H,
          localDraft: pe,
          latestVersion: Ne.version,
          latestDraft: He(Ne.draft),
          latestDiagnostics: [...Ne.diagnostics],
          expectedVersion: typeof Ae?.expectedVersion == "string" ? Ae.expectedVersion : pe.definition.version,
          actualVersion: typeof Ae?.actualVersion == "string" ? Ae.actualVersion : Ne.version,
          conflictPaths: Mn
        }), z({
          state: "error",
          source: "manual",
          message: "version conflict: choose resolution",
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        }), b({
          code: Rn.versionConflict,
          method: fe.method,
          message: "Version conflict detected. Choose Keep Mine, Keep Server, or Merge."
        }), !0;
      } catch (Ne) {
        return Ie(Ne), !1;
      }
    },
    [C, Ie, H, b]
  );
  $.useEffect(() => {
    t.onChange && t.onChange({
      document: i,
      diagnostics: o,
      isDirty: r
    });
  }, [o, i, r, t]), $.useEffect(() => {
    const fe = i.definition.version;
    !fe || fe.trim() === "" || (De.current[fe] = {
      draft: He(i),
      diagnostics: [...o]
    });
  }, [o, i]), $.useEffect(() => {
    let fe = !1;
    return k.load(H).then((pe) => {
      if (fe)
        return;
      if (!pe) {
        Y(null);
        return;
      }
      const Ne = J.current ?? "", Ae = JSON.stringify(pe.document);
      Y(Ae === Ne ? null : pe);
    }).catch((pe) => {
      if (fe)
        return;
      const Ne = ha(pe);
      b({
        code: Ne.code,
        message: `autosave recovery failed: ${Ne.message}`,
        method: Ne.method
      });
    }), () => {
      fe = !0;
    };
  }, [H, k, b]), $.useEffect(() => {
    if (!r)
      return;
    const fe = window.setTimeout(() => {
      z({
        state: "saving",
        source: "autosave",
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      });
      const pe = qe();
      k.save({
        machineId: H,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
        document: pe
      }).then(() => {
        z({
          state: "saved",
          source: "autosave",
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        }), S("Autosaved draft to persistence store.");
      }).catch((Ne) => {
        ot("autosave", Ne);
        const Ae = ha(Ne);
        b({
          code: Ae.code,
          message: `autosave failed: ${Ae.message}`,
          method: Ae.method
        });
      });
    }, X);
    return () => {
      window.clearTimeout(fe);
    };
  }, [
    X,
    qe,
    r,
    H,
    ot,
    k,
    b,
    S
  ]);
  const dn = $.useCallback(async () => {
    if (!_) {
      b({
        code: Rn.internal,
        method: Gr.applyEvent,
        message: "runtime adapter unavailable"
      });
      return;
    }
    const fe = KD({
      selection: s,
      transitions: i.definition.transitions
    });
    if (!fe) {
      b({
        code: Rn.invalidTransition,
        method: Gr.applyEvent,
        message: "no transition available for simulation"
      });
      return;
    }
    if (fe.event.trim() === "") {
      b({
        code: Rn.invalidTransition,
        method: Gr.applyEvent,
        message: "selected transition must define an event"
      });
      return;
    }
    try {
      const pe = await _.applyEventDryRun(
        {
          machineId: H,
          entityId: I,
          event: fe.event,
          msg: ee,
          expectedState: fe.from,
          dryRun: !0
        },
        Q
      );
      p(pe, {
        event: fe.event,
        transitionId: fe.id
      });
      const Ne = await _.snapshot(
        {
          machineId: H,
          entityId: I,
          msg: ee,
          evaluateGuards: !0,
          includeBlocked: !0
        },
        Q
      );
      v(Ne);
    } catch (pe) {
      Ie(pe);
    }
  }, [
    i.definition.transitions,
    Ie,
    H,
    b,
    _,
    s,
    p,
    v,
    I,
    ee,
    Q
  ]), it = $.useCallback(async () => {
    const fe = qe();
    if (!C) {
      const pe = Rv(fe.definition);
      d(pe), S("Authoring RPC unavailable. Used local validation only.");
      return;
    }
    try {
      const pe = m();
      if (pe.length === 0) {
        const Mn = await C.validate({
          machineId: H,
          draft: fe
        });
        d(Mn.diagnostics), S(`Validation completed. valid=${Mn.valid}`);
        return;
      }
      const Ne = await C.validate({
        machineId: H,
        draft: fe,
        scope: {
          nodeIds: pe
        }
      }), Ae = kw({
        definition: fe.definition,
        cachedDiagnostics: o,
        scopedDiagnostics: Ne.diagnostics,
        scopeNodeIDs: pe
      });
      d(Ae);
      const $t = await C.validate({
        machineId: H,
        draft: fe
      });
      if (!Hw(Ae, $t.diagnostics)) {
        d($t.diagnostics), S("Scoped validation parity mismatch detected; fell back to full validation output.");
        return;
      }
      S(`Validation completed. valid=${$t.valid} (scoped + parity checked)`);
    } catch (pe) {
      Ie(pe);
    }
  }, [
    C,
    qe,
    m,
    o,
    Ie,
    H,
    S,
    d
  ]), At = $.useCallback(async () => {
    z({
      state: "saving",
      source: "manual",
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
    const fe = qe();
    if (!C) {
      try {
        await nt(fe), y(), G.current = He(fe), z({
          state: "saved",
          source: "manual",
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        }), S("Saved locally (authoring RPC unavailable).");
      } catch (pe) {
        ot("manual", pe), Ie(pe);
      }
      return;
    }
    try {
      const pe = await C.saveDraft({
        machineId: H,
        baseVersion: fe.definition.version,
        draft: fe,
        validate: !0
      });
      await St({
        draft: fe,
        version: pe.version,
        draftState: pe.draftState,
        diagnostics: pe.diagnostics
      }), ve(null), S("Draft saved through authoring RPC.");
    } catch (pe) {
      if (pe instanceof fu && await tn(pe, fe))
        return;
      ot("manual", pe), Ie(pe);
    }
  }, [
    C,
    qe,
    St,
    Ie,
    ot,
    H,
    y,
    tn,
    nt,
    S
  ]), Ot = $.useCallback(
    async (fe) => {
      if (!(!ge || !C)) {
        _e(!0);
        try {
          if (fe === "keep-server") {
            const Ae = Xr(ge.latestDraft);
            c(Ae, ge.latestDiagnostics), G.current = He(Ae), y(), await nt(Ae), ve(null), z({
              state: "saved",
              source: "manual",
              updatedAt: (/* @__PURE__ */ new Date()).toISOString()
            }), S("Loaded latest server draft after conflict.");
            return;
          }
          const pe = fe === "merge" ? _v({
            baseDocument: ge.latestDraft,
            editedDocument: ge.localDraft
          }) : He(ge.localDraft);
          z({
            state: "saving",
            source: "manual",
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          });
          const Ne = await C.saveDraft({
            machineId: ge.machineId,
            baseVersion: ge.latestVersion,
            draft: pe,
            validate: !0
          });
          await St({
            draft: pe,
            version: Ne.version,
            draftState: Ne.draftState,
            diagnostics: Ne.diagnostics
          }), ve(null), S(fe === "merge" ? "Merged with latest server draft and saved." : "Retried save with latest server version.");
        } catch (pe) {
          if (pe instanceof fu && await tn(pe, ge.localDraft))
            return;
          ot("manual", pe), Ie(pe);
        } finally {
          _e(!1);
        }
      }
    },
    [
      C,
      St,
      Ie,
      ot,
      y,
      tn,
      ge,
      nt,
      S,
      c
    ]
  ), zt = $.useCallback(async () => {
    W(!0), D(!0), F(void 0), Z(null), he(null);
    const fe = {
      version: i.definition.version,
      updatedAt: i.draft_state.last_saved_at,
      isDraft: i.draft_state.is_draft
    };
    if (De.current[fe.version] = {
      draft: He(i),
      diagnostics: [...o]
    }, !C) {
      ne([fe]), E(fe.version), he("Authoring RPC unavailable; showing local version only."), D(!1);
      return;
    }
    try {
      const pe = C.listVersions;
      if (!pe) {
        ne([fe]), E(fe.version), he("Version history capability unavailable.");
        return;
      }
      const Ne = await pe({
        machineId: H,
        limit: 25
      }), Ae = Ne.items.length > 0 ? Ne.items : [fe];
      ne(Ae);
      const $t = Ae.some((Mn) => Mn.version === fe.version) ? fe.version : Ae[0]?.version;
      E($t);
    } catch (pe) {
      const Ne = ha(pe);
      F(Ne.message), ne([fe]), E(fe.version), he("Version history capability unavailable.");
    } finally {
      D(!1);
    }
  }, [C, o, i, H]), Rt = $.useCallback(
    async (fe) => {
      if (E(fe), Z(null), he(null), !C) {
        he("Authoring RPC unavailable; diff disabled.");
        return;
      }
      if (fe === i.definition.version) {
        he("Selected version matches current draft.");
        return;
      }
      if (C.diffVersions)
        try {
          const pe = await C.diffVersions({
            machineId: H,
            baseVersion: fe,
            targetVersion: i.definition.version
          });
          Z(pe);
        } catch (pe) {
          const Ne = ha(pe);
          he(`Diff unavailable: ${Ne.message}`);
        }
      else
        he("Version diff capability unavailable.");
    },
    [C, i.definition.version, H]
  ), Gi = $.useCallback(async () => {
    const fe = B;
    if (fe && fe !== i.definition.version)
      try {
        let pe = De.current[fe];
        if (!pe) {
          if (!C?.getVersion) {
            he("Version restore unavailable without get_version capability.");
            return;
          }
          const Ae = await C.getVersion({
            machineId: H,
            version: fe
          });
          pe = {
            draft: He(Ae.draft),
            diagnostics: [...Ae.diagnostics]
          }, De.current[fe] = pe;
        }
        const Ne = Xr(pe.draft);
        c(Ne, pe.diagnostics), G.current = He(Ne), y(), await nt(Ne), W(!1), z({
          state: "saved",
          source: "manual",
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        }), S(`Restored version ${fe}. Use Undo to return.`);
      } catch (pe) {
        const Ne = ha(pe);
        F(Ne.message), Ie(pe);
      }
  }, [
    C,
    i.definition.version,
    Ie,
    y,
    H,
    nt,
    S,
    c,
    B
  ]), fi = $.useCallback(async () => {
    if (!j) {
      S("No autosaved draft to recover.");
      return;
    }
    const fe = Xr(j.document);
    u(fe), G.current = He(fe), Y(null), S("Recovered autosaved draft.");
  }, [S, j, u]), zo = $.useCallback(async () => {
    try {
      await L.exportJSON({
        machineId: H,
        draft: qe()
      }), S("Exported machine definition as JSON.");
    } catch (fe) {
      Ie(fe);
    }
  }, [qe, L, Ie, H, S]), Ro = $.useCallback(async () => {
    if (!L.exportRPC) {
      S("RPC export unavailable. Configure ExportAdapter.exportRPC to enable this capability.");
      return;
    }
    try {
      await L.exportRPC({
        machineId: H,
        draft: qe()
      }), S("Exported machine definition through RPC adapter.");
    } catch (fe) {
      Ie(fe);
    }
  }, [qe, L, Ie, H, S]);
  return /* @__PURE__ */ x.jsxs(x.Fragment, { children: [
    /* @__PURE__ */ x.jsx(
      kD,
      {
        onSave: At,
        onValidate: it,
        onSimulate: dn,
        onRecoverDraft: fi,
        onOpenVersionHistory: zt,
        onExportJSON: zo,
        onExportRPC: Ro,
        runtimeAvailable: !!_,
        authoringAvailable: !!C,
        recoveryAvailable: !!j,
        rpcExportAvailable: Sw(L),
        versionHistoryEnabled: !0,
        actionCatalogProvider: t.actionCatalogProvider,
        saveStatus: A
      }
    ),
    /* @__PURE__ */ x.jsx(
      LD,
      {
        open: q,
        loading: te,
        currentVersion: i.definition.version,
        items: V,
        selectedVersion: B,
        errorMessage: U,
        diff: K,
        diffUnavailableReason: se,
        onSelectVersion: (fe) => {
          Rt(fe);
        },
        onRestoreSelected: () => {
          Gi();
        },
        onClose: () => W(!1)
      }
    ),
    /* @__PURE__ */ x.jsx(
      HD,
      {
        open: !!ge,
        machineId: ge?.machineId ?? H,
        expectedVersion: ge?.expectedVersion,
        actualVersion: ge?.actualVersion,
        conflictPaths: ge?.conflictPaths,
        busy: xe,
        onResolve: (fe) => {
          Ot(fe);
        },
        onClose: () => {
          xe || ve(null);
        }
      }
    )
  ] });
}
function WD(t) {
  const i = $.useMemo(
    () => Xr(Tw(t.initialDocument)),
    [t.initialDocument]
  );
  return /* @__PURE__ */ x.jsx(
    CE,
    {
      initialDocument: i,
      initialDiagnostics: t.initialDiagnostics,
      children: /* @__PURE__ */ x.jsx(FD, { ...t })
    }
  );
}
var Hd = { exports: {} }, Br = {}, Ld = { exports: {} }, Bd = {};
var Nv;
function JD() {
  return Nv || (Nv = 1, (function(t) {
    function i(A, z) {
      var q = A.length;
      A.push(z);
      e: for (; 0 < q; ) {
        var W = q - 1 >>> 1, te = A[W];
        if (0 < s(te, z))
          A[W] = z, A[q] = te, q = W;
        else break e;
      }
    }
    function o(A) {
      return A.length === 0 ? null : A[0];
    }
    function r(A) {
      if (A.length === 0) return null;
      var z = A[0], q = A.pop();
      if (q !== z) {
        A[0] = q;
        e: for (var W = 0, te = A.length, D = te >>> 1; W < D; ) {
          var V = 2 * (W + 1) - 1, ne = A[V], B = V + 1, E = A[B];
          if (0 > s(ne, q))
            B < te && 0 > s(E, ne) ? (A[W] = E, A[B] = q, W = B) : (A[W] = ne, A[V] = q, W = V);
          else if (B < te && 0 > s(E, q))
            A[W] = E, A[B] = q, W = B;
          else break e;
        }
      }
      return z;
    }
    function s(A, z) {
      var q = A.sortIndex - z.sortIndex;
      return q !== 0 ? q : A.id - z.id;
    }
    if (t.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var u = performance;
      t.unstable_now = function() {
        return u.now();
      };
    } else {
      var c = Date, d = c.now();
      t.unstable_now = function() {
        return c.now() - d;
      };
    }
    var m = [], y = [], g = 1, p = null, v = 3, b = !1, S = !1, N = !1, M = !1, T = typeof setTimeout == "function" ? setTimeout : null, O = typeof clearTimeout == "function" ? clearTimeout : null, _ = typeof setImmediate < "u" ? setImmediate : null;
    function C(A) {
      for (var z = o(y); z !== null; ) {
        if (z.callback === null) r(y);
        else if (z.startTime <= A)
          r(y), z.sortIndex = z.expirationTime, i(m, z);
        else break;
        z = o(y);
      }
    }
    function k(A) {
      if (N = !1, C(A), !S)
        if (o(m) !== null)
          S = !0, L || (L = !0, J());
        else {
          var z = o(y);
          z !== null && Y(k, z.startTime - A);
        }
    }
    var L = !1, H = -1, I = 5, ee = -1;
    function Q() {
      return M ? !0 : !(t.unstable_now() - ee < I);
    }
    function X() {
      if (M = !1, L) {
        var A = t.unstable_now();
        ee = A;
        var z = !0;
        try {
          e: {
            S = !1, N && (N = !1, O(H), H = -1), b = !0;
            var q = v;
            try {
              t: {
                for (C(A), p = o(m); p !== null && !(p.expirationTime > A && Q()); ) {
                  var W = p.callback;
                  if (typeof W == "function") {
                    p.callback = null, v = p.priorityLevel;
                    var te = W(
                      p.expirationTime <= A
                    );
                    if (A = t.unstable_now(), typeof te == "function") {
                      p.callback = te, C(A), z = !0;
                      break t;
                    }
                    p === o(m) && r(m), C(A);
                  } else r(m);
                  p = o(m);
                }
                if (p !== null) z = !0;
                else {
                  var D = o(y);
                  D !== null && Y(
                    k,
                    D.startTime - A
                  ), z = !1;
                }
              }
              break e;
            } finally {
              p = null, v = q, b = !1;
            }
            z = void 0;
          }
        } finally {
          z ? J() : L = !1;
        }
      }
    }
    var J;
    if (typeof _ == "function")
      J = function() {
        _(X);
      };
    else if (typeof MessageChannel < "u") {
      var G = new MessageChannel(), j = G.port2;
      G.port1.onmessage = X, J = function() {
        j.postMessage(null);
      };
    } else
      J = function() {
        T(X, 0);
      };
    function Y(A, z) {
      H = T(function() {
        A(t.unstable_now());
      }, z);
    }
    t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(A) {
      A.callback = null;
    }, t.unstable_forceFrameRate = function(A) {
      0 > A || 125 < A ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : I = 0 < A ? Math.floor(1e3 / A) : 5;
    }, t.unstable_getCurrentPriorityLevel = function() {
      return v;
    }, t.unstable_next = function(A) {
      switch (v) {
        case 1:
        case 2:
        case 3:
          var z = 3;
          break;
        default:
          z = v;
      }
      var q = v;
      v = z;
      try {
        return A();
      } finally {
        v = q;
      }
    }, t.unstable_requestPaint = function() {
      M = !0;
    }, t.unstable_runWithPriority = function(A, z) {
      switch (A) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          A = 3;
      }
      var q = v;
      v = A;
      try {
        return z();
      } finally {
        v = q;
      }
    }, t.unstable_scheduleCallback = function(A, z, q) {
      var W = t.unstable_now();
      switch (typeof q == "object" && q !== null ? (q = q.delay, q = typeof q == "number" && 0 < q ? W + q : W) : q = W, A) {
        case 1:
          var te = -1;
          break;
        case 2:
          te = 250;
          break;
        case 5:
          te = 1073741823;
          break;
        case 4:
          te = 1e4;
          break;
        default:
          te = 5e3;
      }
      return te = q + te, A = {
        id: g++,
        callback: z,
        priorityLevel: A,
        startTime: q,
        expirationTime: te,
        sortIndex: -1
      }, q > W ? (A.sortIndex = q, i(y, A), o(m) === null && A === o(y) && (N ? (O(H), H = -1) : N = !0, Y(k, q - W))) : (A.sortIndex = te, i(m, A), S || b || (S = !0, L || (L = !0, J()))), A;
    }, t.unstable_shouldYield = Q, t.unstable_wrapCallback = function(A) {
      var z = v;
      return function() {
        var q = v;
        v = z;
        try {
          return A.apply(this, arguments);
        } finally {
          v = q;
        }
      };
    };
  })(Bd)), Bd;
}
var Cv;
function PD() {
  return Cv || (Cv = 1, Ld.exports = JD()), Ld.exports;
}
var Mv;
function eO() {
  if (Mv) return Br;
  Mv = 1;
  var t = PD(), i = cl(), o = ax();
  function r(e) {
    var n = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      n += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++)
        n += "&args[]=" + encodeURIComponent(arguments[a]);
    }
    return "Minified React error #" + e + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function s(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function u(e) {
    var n = e, a = e;
    if (e.alternate) for (; n.return; ) n = n.return;
    else {
      e = n;
      do
        n = e, (n.flags & 4098) !== 0 && (a = n.return), e = n.return;
      while (e);
    }
    return n.tag === 3 ? a : null;
  }
  function c(e) {
    if (e.tag === 13) {
      var n = e.memoizedState;
      if (n === null && (e = e.alternate, e !== null && (n = e.memoizedState)), n !== null) return n.dehydrated;
    }
    return null;
  }
  function d(e) {
    if (e.tag === 31) {
      var n = e.memoizedState;
      if (n === null && (e = e.alternate, e !== null && (n = e.memoizedState)), n !== null) return n.dehydrated;
    }
    return null;
  }
  function m(e) {
    if (u(e) !== e)
      throw Error(r(188));
  }
  function y(e) {
    var n = e.alternate;
    if (!n) {
      if (n = u(e), n === null) throw Error(r(188));
      return n !== e ? null : e;
    }
    for (var a = e, l = n; ; ) {
      var f = a.return;
      if (f === null) break;
      var h = f.alternate;
      if (h === null) {
        if (l = f.return, l !== null) {
          a = l;
          continue;
        }
        break;
      }
      if (f.child === h.child) {
        for (h = f.child; h; ) {
          if (h === a) return m(f), e;
          if (h === l) return m(f), n;
          h = h.sibling;
        }
        throw Error(r(188));
      }
      if (a.return !== l.return) a = f, l = h;
      else {
        for (var w = !1, R = f.child; R; ) {
          if (R === a) {
            w = !0, a = f, l = h;
            break;
          }
          if (R === l) {
            w = !0, l = f, a = h;
            break;
          }
          R = R.sibling;
        }
        if (!w) {
          for (R = h.child; R; ) {
            if (R === a) {
              w = !0, a = h, l = f;
              break;
            }
            if (R === l) {
              w = !0, l = h, a = f;
              break;
            }
            R = R.sibling;
          }
          if (!w) throw Error(r(189));
        }
      }
      if (a.alternate !== l) throw Error(r(190));
    }
    if (a.tag !== 3) throw Error(r(188));
    return a.stateNode.current === a ? e : n;
  }
  function g(e) {
    var n = e.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return e;
    for (e = e.child; e !== null; ) {
      if (n = g(e), n !== null) return n;
      e = e.sibling;
    }
    return null;
  }
  var p = Object.assign, v = /* @__PURE__ */ Symbol.for("react.element"), b = /* @__PURE__ */ Symbol.for("react.transitional.element"), S = /* @__PURE__ */ Symbol.for("react.portal"), N = /* @__PURE__ */ Symbol.for("react.fragment"), M = /* @__PURE__ */ Symbol.for("react.strict_mode"), T = /* @__PURE__ */ Symbol.for("react.profiler"), O = /* @__PURE__ */ Symbol.for("react.consumer"), _ = /* @__PURE__ */ Symbol.for("react.context"), C = /* @__PURE__ */ Symbol.for("react.forward_ref"), k = /* @__PURE__ */ Symbol.for("react.suspense"), L = /* @__PURE__ */ Symbol.for("react.suspense_list"), H = /* @__PURE__ */ Symbol.for("react.memo"), I = /* @__PURE__ */ Symbol.for("react.lazy"), ee = /* @__PURE__ */ Symbol.for("react.activity"), Q = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), X = Symbol.iterator;
  function J(e) {
    return e === null || typeof e != "object" ? null : (e = X && e[X] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var G = /* @__PURE__ */ Symbol.for("react.client.reference");
  function j(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === G ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case N:
        return "Fragment";
      case T:
        return "Profiler";
      case M:
        return "StrictMode";
      case k:
        return "Suspense";
      case L:
        return "SuspenseList";
      case ee:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case S:
          return "Portal";
        case _:
          return e.displayName || "Context";
        case O:
          return (e._context.displayName || "Context") + ".Consumer";
        case C:
          var n = e.render;
          return e = e.displayName, e || (e = n.displayName || n.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case H:
          return n = e.displayName || null, n !== null ? n : j(e.type) || "Memo";
        case I:
          n = e._payload, e = e._init;
          try {
            return j(e(n));
          } catch {
          }
      }
    return null;
  }
  var Y = Array.isArray, A = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, z = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, q = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, W = [], te = -1;
  function D(e) {
    return { current: e };
  }
  function V(e) {
    0 > te || (e.current = W[te], W[te] = null, te--);
  }
  function ne(e, n) {
    te++, W[te] = e.current, e.current = n;
  }
  var B = D(null), E = D(null), U = D(null), F = D(null);
  function K(e, n) {
    switch (ne(U, n), ne(E, e), ne(B, null), n.nodeType) {
      case 9:
      case 11:
        e = (e = n.documentElement) && (e = e.namespaceURI) ? Ip(e) : 0;
        break;
      default:
        if (e = n.tagName, n = n.namespaceURI)
          n = Ip(n), e = Vp(n, e);
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    V(B), ne(B, e);
  }
  function Z() {
    V(B), V(E), V(U);
  }
  function se(e) {
    e.memoizedState !== null && ne(F, e);
    var n = B.current, a = Vp(n, e.type);
    n !== a && (ne(E, e), ne(B, a));
  }
  function he(e) {
    E.current === e && (V(B), V(E)), F.current === e && (V(F), Ar._currentValue = q);
  }
  var ge, ve;
  function xe(e) {
    if (ge === void 0)
      try {
        throw Error();
      } catch (a) {
        var n = a.stack.trim().match(/\n( *(at )?)/);
        ge = n && n[1] || "", ve = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + ge + e + ve;
  }
  var _e = !1;
  function De(e, n) {
    if (!e || _e) return "";
    _e = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function() {
          try {
            if (n) {
              var me = function() {
                throw Error();
              };
              if (Object.defineProperty(me.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(me, []);
                } catch (ue) {
                  var le = ue;
                }
                Reflect.construct(e, [], me);
              } else {
                try {
                  me.call();
                } catch (ue) {
                  le = ue;
                }
                e.call(me.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (ue) {
                le = ue;
              }
              (me = e()) && typeof me.catch == "function" && me.catch(function() {
              });
            }
          } catch (ue) {
            if (ue && le && typeof ue.stack == "string")
              return [ue.stack, le.stack];
          }
          return [null, null];
        }
      };
      l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var f = Object.getOwnPropertyDescriptor(
        l.DetermineComponentFrameRoot,
        "name"
      );
      f && f.configurable && Object.defineProperty(
        l.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var h = l.DetermineComponentFrameRoot(), w = h[0], R = h[1];
      if (w && R) {
        var P = w.split(`
`), re = R.split(`
`);
        for (f = l = 0; l < P.length && !P[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; f < re.length && !re[f].includes(
          "DetermineComponentFrameRoot"
        ); )
          f++;
        if (l === P.length || f === re.length)
          for (l = P.length - 1, f = re.length - 1; 1 <= l && 0 <= f && P[l] !== re[f]; )
            f--;
        for (; 1 <= l && 0 <= f; l--, f--)
          if (P[l] !== re[f]) {
            if (l !== 1 || f !== 1)
              do
                if (l--, f--, 0 > f || P[l] !== re[f]) {
                  var ce = `
` + P[l].replace(" at new ", " at ");
                  return e.displayName && ce.includes("<anonymous>") && (ce = ce.replace("<anonymous>", e.displayName)), ce;
                }
              while (1 <= l && 0 <= f);
            break;
          }
      }
    } finally {
      _e = !1, Error.prepareStackTrace = a;
    }
    return (a = e ? e.displayName || e.name : "") ? xe(a) : "";
  }
  function qe(e, n) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return xe(e.type);
      case 16:
        return xe("Lazy");
      case 13:
        return e.child !== n && n !== null ? xe("Suspense Fallback") : xe("Suspense");
      case 19:
        return xe("SuspenseList");
      case 0:
      case 15:
        return De(e.type, !1);
      case 11:
        return De(e.type.render, !1);
      case 1:
        return De(e.type, !0);
      case 31:
        return xe("Activity");
      default:
        return "";
    }
  }
  function Ie(e) {
    try {
      var n = "", a = null;
      do
        n += qe(e, a), a = e, e = e.return;
      while (e);
      return n;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var ot = Object.prototype.hasOwnProperty, nt = t.unstable_scheduleCallback, St = t.unstable_cancelCallback, tn = t.unstable_shouldYield, dn = t.unstable_requestPaint, it = t.unstable_now, At = t.unstable_getCurrentPriorityLevel, Ot = t.unstable_ImmediatePriority, zt = t.unstable_UserBlockingPriority, Rt = t.unstable_NormalPriority, Gi = t.unstable_LowPriority, fi = t.unstable_IdlePriority, zo = t.log, Ro = t.unstable_setDisableYieldValue, fe = null, pe = null;
  function Ne(e) {
    if (typeof zo == "function" && Ro(e), pe && typeof pe.setStrictMode == "function")
      try {
        pe.setStrictMode(fe, e);
      } catch {
      }
  }
  var Ae = Math.clz32 ? Math.clz32 : ko, $t = Math.log, Mn = Math.LN2;
  function ko(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - ($t(e) / Mn | 0) | 0;
  }
  var Ta = 256, Aa = 262144, ja = 4194304;
  function In(e) {
    var n = e & 42;
    if (n !== 0) return n;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return e & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function Da(e, n, a) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var f = 0, h = e.suspendedLanes, w = e.pingedLanes;
    e = e.warmLanes;
    var R = l & 134217727;
    return R !== 0 ? (l = R & ~h, l !== 0 ? f = In(l) : (w &= R, w !== 0 ? f = In(w) : a || (a = R & ~e, a !== 0 && (f = In(a))))) : (R = l & ~h, R !== 0 ? f = In(R) : w !== 0 ? f = In(w) : a || (a = l & ~e, a !== 0 && (f = In(a)))), f === 0 ? 0 : n !== 0 && n !== f && (n & h) === 0 && (h = f & -f, a = n & -n, h >= a || h === 32 && (a & 4194048) !== 0) ? n : f;
  }
  function Zi(e, n) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & n) === 0;
  }
  function Ju(e, n) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return n + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Sl() {
    var e = ja;
    return ja <<= 1, (ja & 62914560) === 0 && (ja = 4194304), e;
  }
  function Ho(e) {
    for (var n = [], a = 0; 31 > a; a++) n.push(e);
    return n;
  }
  function Ki(e, n) {
    e.pendingLanes |= n, n !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Pu(e, n, a, l, f, h) {
    var w = e.pendingLanes;
    e.pendingLanes = a, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= a, e.entangledLanes &= a, e.errorRecoveryDisabledLanes &= a, e.shellSuspendCounter = 0;
    var R = e.entanglements, P = e.expirationTimes, re = e.hiddenUpdates;
    for (a = w & ~a; 0 < a; ) {
      var ce = 31 - Ae(a), me = 1 << ce;
      R[ce] = 0, P[ce] = -1;
      var le = re[ce];
      if (le !== null)
        for (re[ce] = null, ce = 0; ce < le.length; ce++) {
          var ue = le[ce];
          ue !== null && (ue.lane &= -536870913);
        }
      a &= ~me;
    }
    l !== 0 && wl(e, l, 0), h !== 0 && f === 0 && e.tag !== 0 && (e.suspendedLanes |= h & ~(w & ~n));
  }
  function wl(e, n, a) {
    e.pendingLanes |= n, e.suspendedLanes &= ~n;
    var l = 31 - Ae(n);
    e.entangledLanes |= n, e.entanglements[l] = e.entanglements[l] | 1073741824 | a & 261930;
  }
  function El(e, n) {
    var a = e.entangledLanes |= n;
    for (e = e.entanglements; a; ) {
      var l = 31 - Ae(a), f = 1 << l;
      f & n | e[l] & n && (e[l] |= n), a &= ~f;
    }
  }
  function _l(e, n) {
    var a = n & -n;
    return a = (a & 42) !== 0 ? 1 : Lo(a), (a & (e.suspendedLanes | n)) !== 0 ? 0 : a;
  }
  function Lo(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function Bo(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Nl() {
    var e = z.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : uy(e.type));
  }
  function Cl(e, n) {
    var a = z.p;
    try {
      return z.p = e, n();
    } finally {
      z.p = a;
    }
  }
  var Tn = Math.random().toString(36).slice(2), vt = "__reactFiber$" + Tn, Mt = "__reactProps$" + Tn, Vn = "__reactContainer$" + Tn, Oa = "__reactEvents$" + Tn, Ml = "__reactListeners$" + Tn, ec = "__reactHandles$" + Tn, Tl = "__reactResources$" + Tn, Qi = "__reactMarker$" + Tn;
  function Io(e) {
    delete e[vt], delete e[Mt], delete e[Oa], delete e[Ml], delete e[ec];
  }
  function di(e) {
    var n = e[vt];
    if (n) return n;
    for (var a = e.parentNode; a; ) {
      if (n = a[Vn] || a[vt]) {
        if (a = n.alternate, n.child !== null || a !== null && a.child !== null)
          for (e = Zp(e); e !== null; ) {
            if (a = e[vt]) return a;
            e = Zp(e);
          }
        return n;
      }
      e = a, a = e.parentNode;
    }
    return null;
  }
  function hi(e) {
    if (e = e[vt] || e[Vn]) {
      var n = e.tag;
      if (n === 5 || n === 6 || n === 13 || n === 31 || n === 26 || n === 27 || n === 3)
        return e;
    }
    return null;
  }
  function mi(e) {
    var n = e.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return e.stateNode;
    throw Error(r(33));
  }
  function gi(e) {
    var n = e[Tl];
    return n || (n = e[Tl] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function ft(e) {
    e[Qi] = !0;
  }
  var Al = /* @__PURE__ */ new Set(), jl = {};
  function Un(e, n) {
    pi(e, n), pi(e + "Capture", n);
  }
  function pi(e, n) {
    for (jl[e] = n, e = 0; e < n.length; e++)
      Al.add(n[e]);
  }
  var tc = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Dl = {}, Vo = {};
  function nc(e) {
    return ot.call(Vo, e) ? !0 : ot.call(Dl, e) ? !1 : tc.test(e) ? Vo[e] = !0 : (Dl[e] = !0, !1);
  }
  function za(e, n, a) {
    if (nc(n))
      if (a === null) e.removeAttribute(n);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(n);
            return;
          case "boolean":
            var l = n.toLowerCase().slice(0, 5);
            if (l !== "data-" && l !== "aria-") {
              e.removeAttribute(n);
              return;
            }
        }
        e.setAttribute(n, "" + a);
      }
  }
  function Ra(e, n, a) {
    if (a === null) e.removeAttribute(n);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(n);
          return;
      }
      e.setAttribute(n, "" + a);
    }
  }
  function hn(e, n, a, l) {
    if (l === null) e.removeAttribute(a);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(a);
          return;
      }
      e.setAttributeNS(n, a, "" + l);
    }
  }
  function kt(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function Ol(e) {
    var n = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function ic(e, n, a) {
    var l = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      n
    );
    if (!e.hasOwnProperty(n) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var f = l.get, h = l.set;
      return Object.defineProperty(e, n, {
        configurable: !0,
        get: function() {
          return f.call(this);
        },
        set: function(w) {
          a = "" + w, h.call(this, w);
        }
      }), Object.defineProperty(e, n, {
        enumerable: l.enumerable
      }), {
        getValue: function() {
          return a;
        },
        setValue: function(w) {
          a = "" + w;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[n];
        }
      };
    }
  }
  function Uo(e) {
    if (!e._valueTracker) {
      var n = Ol(e) ? "checked" : "value";
      e._valueTracker = ic(
        e,
        n,
        "" + e[n]
      );
    }
  }
  function Yo(e) {
    if (!e) return !1;
    var n = e._valueTracker;
    if (!n) return !0;
    var a = n.getValue(), l = "";
    return e && (l = Ol(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== a ? (n.setValue(e), !0) : !1;
  }
  function ka(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var zl = /[\n"\\]/g;
  function Ht(e) {
    return e.replace(
      zl,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function qo(e, n, a, l, f, h, w, R) {
    e.name = "", w != null && typeof w != "function" && typeof w != "symbol" && typeof w != "boolean" ? e.type = w : e.removeAttribute("type"), n != null ? w === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + kt(n)) : e.value !== "" + kt(n) && (e.value = "" + kt(n)) : w !== "submit" && w !== "reset" || e.removeAttribute("value"), n != null ? $o(e, w, kt(n)) : a != null ? $o(e, w, kt(a)) : l != null && e.removeAttribute("value"), f == null && h != null && (e.defaultChecked = !!h), f != null && (e.checked = f && typeof f != "function" && typeof f != "symbol"), R != null && typeof R != "function" && typeof R != "symbol" && typeof R != "boolean" ? e.name = "" + kt(R) : e.removeAttribute("name");
  }
  function Ha(e, n, a, l, f, h, w, R) {
    if (h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" && (e.type = h), n != null || a != null) {
      if (!(h !== "submit" && h !== "reset" || n != null)) {
        Uo(e);
        return;
      }
      a = a != null ? "" + kt(a) : "", n = n != null ? "" + kt(n) : a, R || n === e.value || (e.value = n), e.defaultValue = n;
    }
    l = l ?? f, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = R ? e.checked : !!l, e.defaultChecked = !!l, w != null && typeof w != "function" && typeof w != "symbol" && typeof w != "boolean" && (e.name = w), Uo(e);
  }
  function $o(e, n, a) {
    n === "number" && ka(e.ownerDocument) === e || e.defaultValue === "" + a || (e.defaultValue = "" + a);
  }
  function yi(e, n, a, l) {
    if (e = e.options, n) {
      n = {};
      for (var f = 0; f < a.length; f++)
        n["$" + a[f]] = !0;
      for (a = 0; a < e.length; a++)
        f = n.hasOwnProperty("$" + e[a].value), e[a].selected !== f && (e[a].selected = f), f && l && (e[a].defaultSelected = !0);
    } else {
      for (a = "" + kt(a), n = null, f = 0; f < e.length; f++) {
        if (e[f].value === a) {
          e[f].selected = !0, l && (e[f].defaultSelected = !0);
          return;
        }
        n !== null || e[f].disabled || (n = e[f]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function Xo(e, n, a) {
    if (n != null && (n = "" + kt(n), n !== e.value && (e.value = n), a == null)) {
      e.defaultValue !== n && (e.defaultValue = n);
      return;
    }
    e.defaultValue = a != null ? "" + kt(a) : "";
  }
  function kh(e, n, a, l) {
    if (n == null) {
      if (l != null) {
        if (a != null) throw Error(r(92));
        if (Y(l)) {
          if (1 < l.length) throw Error(r(93));
          l = l[0];
        }
        a = l;
      }
      a == null && (a = ""), n = a;
    }
    a = kt(n), e.defaultValue = a, l = e.textContent, l === a && l !== "" && l !== null && (e.value = l), Uo(e);
  }
  function La(e, n) {
    if (n) {
      var a = e.firstChild;
      if (a && a === e.lastChild && a.nodeType === 3) {
        a.nodeValue = n;
        return;
      }
    }
    e.textContent = n;
  }
  var Wx = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Hh(e, n, a) {
    var l = n.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === "" ? l ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "" : l ? e.setProperty(n, a) : typeof a != "number" || a === 0 || Wx.has(n) ? n === "float" ? e.cssFloat = a : e[n] = ("" + a).trim() : e[n] = a + "px";
  }
  function Lh(e, n, a) {
    if (n != null && typeof n != "object")
      throw Error(r(62));
    if (e = e.style, a != null) {
      for (var l in a)
        !a.hasOwnProperty(l) || n != null && n.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "");
      for (var f in n)
        l = n[f], n.hasOwnProperty(f) && a[f] !== l && Hh(e, f, l);
    } else
      for (var h in n)
        n.hasOwnProperty(h) && Hh(e, h, n[h]);
  }
  function ac(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Jx = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), Px = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Rl(e) {
    return Px.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function Yn() {
  }
  var oc = null;
  function rc(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Ba = null, Ia = null;
  function Bh(e) {
    var n = hi(e);
    if (n && (e = n.stateNode)) {
      var a = e[Mt] || null;
      e: switch (e = n.stateNode, n.type) {
        case "input":
          if (qo(
            e,
            a.value,
            a.defaultValue,
            a.defaultValue,
            a.checked,
            a.defaultChecked,
            a.type,
            a.name
          ), n = a.name, a.type === "radio" && n != null) {
            for (a = e; a.parentNode; ) a = a.parentNode;
            for (a = a.querySelectorAll(
              'input[name="' + Ht(
                "" + n
              ) + '"][type="radio"]'
            ), n = 0; n < a.length; n++) {
              var l = a[n];
              if (l !== e && l.form === e.form) {
                var f = l[Mt] || null;
                if (!f) throw Error(r(90));
                qo(
                  l,
                  f.value,
                  f.defaultValue,
                  f.defaultValue,
                  f.checked,
                  f.defaultChecked,
                  f.type,
                  f.name
                );
              }
            }
            for (n = 0; n < a.length; n++)
              l = a[n], l.form === e.form && Yo(l);
          }
          break e;
        case "textarea":
          Xo(e, a.value, a.defaultValue);
          break e;
        case "select":
          n = a.value, n != null && yi(e, !!a.multiple, n, !1);
      }
    }
  }
  var lc = !1;
  function Ih(e, n, a) {
    if (lc) return e(n, a);
    lc = !0;
    try {
      var l = e(n);
      return l;
    } finally {
      if (lc = !1, (Ba !== null || Ia !== null) && (Ss(), Ba && (n = Ba, e = Ia, Ia = Ba = null, Bh(n), e)))
        for (n = 0; n < e.length; n++) Bh(e[n]);
    }
  }
  function Go(e, n) {
    var a = e.stateNode;
    if (a === null) return null;
    var l = a[Mt] || null;
    if (l === null) return null;
    a = l[n];
    e: switch (n) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (l = !l.disabled) || (e = e.type, l = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !l;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (a && typeof a != "function")
      throw Error(
        r(231, n, typeof a)
      );
    return a;
  }
  var qn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), sc = !1;
  if (qn)
    try {
      var Zo = {};
      Object.defineProperty(Zo, "passive", {
        get: function() {
          sc = !0;
        }
      }), window.addEventListener("test", Zo, Zo), window.removeEventListener("test", Zo, Zo);
    } catch {
      sc = !1;
    }
  var vi = null, uc = null, kl = null;
  function Vh() {
    if (kl) return kl;
    var e, n = uc, a = n.length, l, f = "value" in vi ? vi.value : vi.textContent, h = f.length;
    for (e = 0; e < a && n[e] === f[e]; e++) ;
    var w = a - e;
    for (l = 1; l <= w && n[a - l] === f[h - l]; l++) ;
    return kl = f.slice(e, 1 < l ? 1 - l : void 0);
  }
  function Hl(e) {
    var n = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && n === 13 && (e = 13)) : e = n, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Ll() {
    return !0;
  }
  function Uh() {
    return !1;
  }
  function Lt(e) {
    function n(a, l, f, h, w) {
      this._reactName = a, this._targetInst = f, this.type = l, this.nativeEvent = h, this.target = w, this.currentTarget = null;
      for (var R in e)
        e.hasOwnProperty(R) && (a = e[R], this[R] = a ? a(h) : h[R]);
      return this.isDefaultPrevented = (h.defaultPrevented != null ? h.defaultPrevented : h.returnValue === !1) ? Ll : Uh, this.isPropagationStopped = Uh, this;
    }
    return p(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var a = this.nativeEvent;
        a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = Ll);
      },
      stopPropagation: function() {
        var a = this.nativeEvent;
        a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = Ll);
      },
      persist: function() {
      },
      isPersistent: Ll
    }), n;
  }
  var Fi = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Bl = Lt(Fi), Ko = p({}, Fi, { view: 0, detail: 0 }), e1 = Lt(Ko), cc, fc, Qo, Il = p({}, Ko, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: hc,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Qo && (Qo && e.type === "mousemove" ? (cc = e.screenX - Qo.screenX, fc = e.screenY - Qo.screenY) : fc = cc = 0, Qo = e), cc);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : fc;
    }
  }), Yh = Lt(Il), t1 = p({}, Il, { dataTransfer: 0 }), n1 = Lt(t1), i1 = p({}, Ko, { relatedTarget: 0 }), dc = Lt(i1), a1 = p({}, Fi, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), o1 = Lt(a1), r1 = p({}, Fi, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), l1 = Lt(r1), s1 = p({}, Fi, { data: 0 }), qh = Lt(s1), u1 = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, c1 = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, f1 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function d1(e) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(e) : (e = f1[e]) ? !!n[e] : !1;
  }
  function hc() {
    return d1;
  }
  var h1 = p({}, Ko, {
    key: function(e) {
      if (e.key) {
        var n = u1[e.key] || e.key;
        if (n !== "Unidentified") return n;
      }
      return e.type === "keypress" ? (e = Hl(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? c1[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: hc,
    charCode: function(e) {
      return e.type === "keypress" ? Hl(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Hl(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), m1 = Lt(h1), g1 = p({}, Il, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), $h = Lt(g1), p1 = p({}, Ko, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: hc
  }), y1 = Lt(p1), v1 = p({}, Fi, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), b1 = Lt(v1), x1 = p({}, Il, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), S1 = Lt(x1), w1 = p({}, Fi, {
    newState: 0,
    oldState: 0
  }), E1 = Lt(w1), _1 = [9, 13, 27, 32], mc = qn && "CompositionEvent" in window, Fo = null;
  qn && "documentMode" in document && (Fo = document.documentMode);
  var N1 = qn && "TextEvent" in window && !Fo, Xh = qn && (!mc || Fo && 8 < Fo && 11 >= Fo), Gh = " ", Zh = !1;
  function Kh(e, n) {
    switch (e) {
      case "keyup":
        return _1.indexOf(n.keyCode) !== -1;
      case "keydown":
        return n.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Qh(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Va = !1;
  function C1(e, n) {
    switch (e) {
      case "compositionend":
        return Qh(n);
      case "keypress":
        return n.which !== 32 ? null : (Zh = !0, Gh);
      case "textInput":
        return e = n.data, e === Gh && Zh ? null : e;
      default:
        return null;
    }
  }
  function M1(e, n) {
    if (Va)
      return e === "compositionend" || !mc && Kh(e, n) ? (e = Vh(), kl = uc = vi = null, Va = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(n.ctrlKey || n.altKey || n.metaKey) || n.ctrlKey && n.altKey) {
          if (n.char && 1 < n.char.length)
            return n.char;
          if (n.which) return String.fromCharCode(n.which);
        }
        return null;
      case "compositionend":
        return Xh && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var T1 = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function Fh(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n === "input" ? !!T1[e.type] : n === "textarea";
  }
  function Wh(e, n, a, l) {
    Ba ? Ia ? Ia.push(l) : Ia = [l] : Ba = l, n = Ts(n, "onChange"), 0 < n.length && (a = new Bl(
      "onChange",
      "change",
      null,
      a,
      l
    ), e.push({ event: a, listeners: n }));
  }
  var Wo = null, Jo = null;
  function A1(e) {
    zp(e, 0);
  }
  function Vl(e) {
    var n = mi(e);
    if (Yo(n)) return e;
  }
  function Jh(e, n) {
    if (e === "change") return n;
  }
  var Ph = !1;
  if (qn) {
    var gc;
    if (qn) {
      var pc = "oninput" in document;
      if (!pc) {
        var em = document.createElement("div");
        em.setAttribute("oninput", "return;"), pc = typeof em.oninput == "function";
      }
      gc = pc;
    } else gc = !1;
    Ph = gc && (!document.documentMode || 9 < document.documentMode);
  }
  function tm() {
    Wo && (Wo.detachEvent("onpropertychange", nm), Jo = Wo = null);
  }
  function nm(e) {
    if (e.propertyName === "value" && Vl(Jo)) {
      var n = [];
      Wh(
        n,
        Jo,
        e,
        rc(e)
      ), Ih(A1, n);
    }
  }
  function j1(e, n, a) {
    e === "focusin" ? (tm(), Wo = n, Jo = a, Wo.attachEvent("onpropertychange", nm)) : e === "focusout" && tm();
  }
  function D1(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Vl(Jo);
  }
  function O1(e, n) {
    if (e === "click") return Vl(n);
  }
  function z1(e, n) {
    if (e === "input" || e === "change")
      return Vl(n);
  }
  function R1(e, n) {
    return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
  }
  var Xt = typeof Object.is == "function" ? Object.is : R1;
  function Po(e, n) {
    if (Xt(e, n)) return !0;
    if (typeof e != "object" || e === null || typeof n != "object" || n === null)
      return !1;
    var a = Object.keys(e), l = Object.keys(n);
    if (a.length !== l.length) return !1;
    for (l = 0; l < a.length; l++) {
      var f = a[l];
      if (!ot.call(n, f) || !Xt(e[f], n[f]))
        return !1;
    }
    return !0;
  }
  function im(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function am(e, n) {
    var a = im(e);
    e = 0;
    for (var l; a; ) {
      if (a.nodeType === 3) {
        if (l = e + a.textContent.length, e <= n && l >= n)
          return { node: a, offset: n - e };
        e = l;
      }
      e: {
        for (; a; ) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break e;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = im(a);
    }
  }
  function om(e, n) {
    return e && n ? e === n ? !0 : e && e.nodeType === 3 ? !1 : n && n.nodeType === 3 ? om(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function rm(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var n = ka(e.document); n instanceof e.HTMLIFrameElement; ) {
      try {
        var a = typeof n.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) e = n.contentWindow;
      else break;
      n = ka(e.document);
    }
    return n;
  }
  function yc(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n && (n === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || n === "textarea" || e.contentEditable === "true");
  }
  var k1 = qn && "documentMode" in document && 11 >= document.documentMode, Ua = null, vc = null, er = null, bc = !1;
  function lm(e, n, a) {
    var l = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    bc || Ua == null || Ua !== ka(l) || (l = Ua, "selectionStart" in l && yc(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), er && Po(er, l) || (er = l, l = Ts(vc, "onSelect"), 0 < l.length && (n = new Bl(
      "onSelect",
      "select",
      null,
      n,
      a
    ), e.push({ event: n, listeners: l }), n.target = Ua)));
  }
  function Wi(e, n) {
    var a = {};
    return a[e.toLowerCase()] = n.toLowerCase(), a["Webkit" + e] = "webkit" + n, a["Moz" + e] = "moz" + n, a;
  }
  var Ya = {
    animationend: Wi("Animation", "AnimationEnd"),
    animationiteration: Wi("Animation", "AnimationIteration"),
    animationstart: Wi("Animation", "AnimationStart"),
    transitionrun: Wi("Transition", "TransitionRun"),
    transitionstart: Wi("Transition", "TransitionStart"),
    transitioncancel: Wi("Transition", "TransitionCancel"),
    transitionend: Wi("Transition", "TransitionEnd")
  }, xc = {}, sm = {};
  qn && (sm = document.createElement("div").style, "AnimationEvent" in window || (delete Ya.animationend.animation, delete Ya.animationiteration.animation, delete Ya.animationstart.animation), "TransitionEvent" in window || delete Ya.transitionend.transition);
  function Ji(e) {
    if (xc[e]) return xc[e];
    if (!Ya[e]) return e;
    var n = Ya[e], a;
    for (a in n)
      if (n.hasOwnProperty(a) && a in sm)
        return xc[e] = n[a];
    return e;
  }
  var um = Ji("animationend"), cm = Ji("animationiteration"), fm = Ji("animationstart"), H1 = Ji("transitionrun"), L1 = Ji("transitionstart"), B1 = Ji("transitioncancel"), dm = Ji("transitionend"), hm = /* @__PURE__ */ new Map(), Sc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Sc.push("scrollEnd");
  function mn(e, n) {
    hm.set(e, n), Un(n, [e]);
  }
  var Ul = typeof reportError == "function" ? reportError : function(e) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var n = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
        error: e
      });
      if (!window.dispatchEvent(n)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", e);
      return;
    }
    console.error(e);
  }, nn = [], qa = 0, wc = 0;
  function Yl() {
    for (var e = qa, n = wc = qa = 0; n < e; ) {
      var a = nn[n];
      nn[n++] = null;
      var l = nn[n];
      nn[n++] = null;
      var f = nn[n];
      nn[n++] = null;
      var h = nn[n];
      if (nn[n++] = null, l !== null && f !== null) {
        var w = l.pending;
        w === null ? f.next = f : (f.next = w.next, w.next = f), l.pending = f;
      }
      h !== 0 && mm(a, f, h);
    }
  }
  function ql(e, n, a, l) {
    nn[qa++] = e, nn[qa++] = n, nn[qa++] = a, nn[qa++] = l, wc |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function Ec(e, n, a, l) {
    return ql(e, n, a, l), $l(e);
  }
  function Pi(e, n) {
    return ql(e, null, null, n), $l(e);
  }
  function mm(e, n, a) {
    e.lanes |= a;
    var l = e.alternate;
    l !== null && (l.lanes |= a);
    for (var f = !1, h = e.return; h !== null; )
      h.childLanes |= a, l = h.alternate, l !== null && (l.childLanes |= a), h.tag === 22 && (e = h.stateNode, e === null || e._visibility & 1 || (f = !0)), e = h, h = h.return;
    return e.tag === 3 ? (h = e.stateNode, f && n !== null && (f = 31 - Ae(a), e = h.hiddenUpdates, l = e[f], l === null ? e[f] = [n] : l.push(n), n.lane = a | 536870912), h) : null;
  }
  function $l(e) {
    if (50 < wr)
      throw wr = 0, zf = null, Error(r(185));
    for (var n = e.return; n !== null; )
      e = n, n = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var $a = {};
  function I1(e, n, a, l) {
    this.tag = e, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Gt(e, n, a, l) {
    return new I1(e, n, a, l);
  }
  function _c(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function $n(e, n) {
    var a = e.alternate;
    return a === null ? (a = Gt(
      e.tag,
      n,
      e.key,
      e.mode
    ), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a.alternate = e, e.alternate = a) : (a.pendingProps = n, a.type = e.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null), a.flags = e.flags & 65011712, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue, n = e.dependencies, a.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.refCleanup = e.refCleanup, a;
  }
  function gm(e, n) {
    e.flags &= 65011714;
    var a = e.alternate;
    return a === null ? (e.childLanes = 0, e.lanes = n, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type, n = a.dependencies, e.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), e;
  }
  function Xl(e, n, a, l, f, h) {
    var w = 0;
    if (l = e, typeof e == "function") _c(e) && (w = 1);
    else if (typeof e == "string")
      w = $S(
        e,
        a,
        B.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case ee:
          return e = Gt(31, a, n, f), e.elementType = ee, e.lanes = h, e;
        case N:
          return ea(a.children, f, h, n);
        case M:
          w = 8, f |= 24;
          break;
        case T:
          return e = Gt(12, a, n, f | 2), e.elementType = T, e.lanes = h, e;
        case k:
          return e = Gt(13, a, n, f), e.elementType = k, e.lanes = h, e;
        case L:
          return e = Gt(19, a, n, f), e.elementType = L, e.lanes = h, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case _:
                w = 10;
                break e;
              case O:
                w = 9;
                break e;
              case C:
                w = 11;
                break e;
              case H:
                w = 14;
                break e;
              case I:
                w = 16, l = null;
                break e;
            }
          w = 29, a = Error(
            r(130, e === null ? "null" : typeof e, "")
          ), l = null;
      }
    return n = Gt(w, a, n, f), n.elementType = e, n.type = l, n.lanes = h, n;
  }
  function ea(e, n, a, l) {
    return e = Gt(7, e, l, n), e.lanes = a, e;
  }
  function Nc(e, n, a) {
    return e = Gt(6, e, null, n), e.lanes = a, e;
  }
  function pm(e) {
    var n = Gt(18, null, null, 0);
    return n.stateNode = e, n;
  }
  function Cc(e, n, a) {
    return n = Gt(
      4,
      e.children !== null ? e.children : [],
      e.key,
      n
    ), n.lanes = a, n.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, n;
  }
  var ym = /* @__PURE__ */ new WeakMap();
  function an(e, n) {
    if (typeof e == "object" && e !== null) {
      var a = ym.get(e);
      return a !== void 0 ? a : (n = {
        value: e,
        source: n,
        stack: Ie(n)
      }, ym.set(e, n), n);
    }
    return {
      value: e,
      source: n,
      stack: Ie(n)
    };
  }
  var Xa = [], Ga = 0, Gl = null, tr = 0, on = [], rn = 0, bi = null, An = 1, jn = "";
  function Xn(e, n) {
    Xa[Ga++] = tr, Xa[Ga++] = Gl, Gl = e, tr = n;
  }
  function vm(e, n, a) {
    on[rn++] = An, on[rn++] = jn, on[rn++] = bi, bi = e;
    var l = An;
    e = jn;
    var f = 32 - Ae(l) - 1;
    l &= ~(1 << f), a += 1;
    var h = 32 - Ae(n) + f;
    if (30 < h) {
      var w = f - f % 5;
      h = (l & (1 << w) - 1).toString(32), l >>= w, f -= w, An = 1 << 32 - Ae(n) + f | a << f | l, jn = h + e;
    } else
      An = 1 << h | a << f | l, jn = e;
  }
  function Mc(e) {
    e.return !== null && (Xn(e, 1), vm(e, 1, 0));
  }
  function Tc(e) {
    for (; e === Gl; )
      Gl = Xa[--Ga], Xa[Ga] = null, tr = Xa[--Ga], Xa[Ga] = null;
    for (; e === bi; )
      bi = on[--rn], on[rn] = null, jn = on[--rn], on[rn] = null, An = on[--rn], on[rn] = null;
  }
  function bm(e, n) {
    on[rn++] = An, on[rn++] = jn, on[rn++] = bi, An = n.id, jn = n.overflow, bi = e;
  }
  var Et = null, Je = null, Le = !1, xi = null, ln = !1, Ac = Error(r(519));
  function Si(e) {
    var n = Error(
      r(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw nr(an(n, e)), Ac;
  }
  function xm(e) {
    var n = e.stateNode, a = e.type, l = e.memoizedProps;
    switch (n[vt] = e, n[Mt] = l, a) {
      case "dialog":
        ze("cancel", n), ze("close", n);
        break;
      case "iframe":
      case "object":
      case "embed":
        ze("load", n);
        break;
      case "video":
      case "audio":
        for (a = 0; a < _r.length; a++)
          ze(_r[a], n);
        break;
      case "source":
        ze("error", n);
        break;
      case "img":
      case "image":
      case "link":
        ze("error", n), ze("load", n);
        break;
      case "details":
        ze("toggle", n);
        break;
      case "input":
        ze("invalid", n), Ha(
          n,
          l.value,
          l.defaultValue,
          l.checked,
          l.defaultChecked,
          l.type,
          l.name,
          !0
        );
        break;
      case "select":
        ze("invalid", n);
        break;
      case "textarea":
        ze("invalid", n), kh(n, l.value, l.defaultValue, l.children);
    }
    a = l.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || n.textContent === "" + a || l.suppressHydrationWarning === !0 || Lp(n.textContent, a) ? (l.popover != null && (ze("beforetoggle", n), ze("toggle", n)), l.onScroll != null && ze("scroll", n), l.onScrollEnd != null && ze("scrollend", n), l.onClick != null && (n.onclick = Yn), n = !0) : n = !1, n || Si(e, !0);
  }
  function Sm(e) {
    for (Et = e.return; Et; )
      switch (Et.tag) {
        case 5:
        case 31:
        case 13:
          ln = !1;
          return;
        case 27:
        case 3:
          ln = !0;
          return;
        default:
          Et = Et.return;
      }
  }
  function Za(e) {
    if (e !== Et) return !1;
    if (!Le) return Sm(e), Le = !0, !1;
    var n = e.tag, a;
    if ((a = n !== 3 && n !== 27) && ((a = n === 5) && (a = e.type, a = !(a !== "form" && a !== "button") || Kf(e.type, e.memoizedProps)), a = !a), a && Je && Si(e), Sm(e), n === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(r(317));
      Je = Gp(e);
    } else if (n === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(r(317));
      Je = Gp(e);
    } else
      n === 27 ? (n = Je, ki(e.type) ? (e = Pf, Pf = null, Je = e) : Je = n) : Je = Et ? un(e.stateNode.nextSibling) : null;
    return !0;
  }
  function ta() {
    Je = Et = null, Le = !1;
  }
  function jc() {
    var e = xi;
    return e !== null && (Ut === null ? Ut = e : Ut.push.apply(
      Ut,
      e
    ), xi = null), e;
  }
  function nr(e) {
    xi === null ? xi = [e] : xi.push(e);
  }
  var Dc = D(null), na = null, Gn = null;
  function wi(e, n, a) {
    ne(Dc, n._currentValue), n._currentValue = a;
  }
  function Zn(e) {
    e._currentValue = Dc.current, V(Dc);
  }
  function Oc(e, n, a) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & n) !== n ? (e.childLanes |= n, l !== null && (l.childLanes |= n)) : l !== null && (l.childLanes & n) !== n && (l.childLanes |= n), e === a) break;
      e = e.return;
    }
  }
  function zc(e, n, a, l) {
    var f = e.child;
    for (f !== null && (f.return = e); f !== null; ) {
      var h = f.dependencies;
      if (h !== null) {
        var w = f.child;
        h = h.firstContext;
        e: for (; h !== null; ) {
          var R = h;
          h = f;
          for (var P = 0; P < n.length; P++)
            if (R.context === n[P]) {
              h.lanes |= a, R = h.alternate, R !== null && (R.lanes |= a), Oc(
                h.return,
                a,
                e
              ), l || (w = null);
              break e;
            }
          h = R.next;
        }
      } else if (f.tag === 18) {
        if (w = f.return, w === null) throw Error(r(341));
        w.lanes |= a, h = w.alternate, h !== null && (h.lanes |= a), Oc(w, a, e), w = null;
      } else w = f.child;
      if (w !== null) w.return = f;
      else
        for (w = f; w !== null; ) {
          if (w === e) {
            w = null;
            break;
          }
          if (f = w.sibling, f !== null) {
            f.return = w.return, w = f;
            break;
          }
          w = w.return;
        }
      f = w;
    }
  }
  function Ka(e, n, a, l) {
    e = null;
    for (var f = n, h = !1; f !== null; ) {
      if (!h) {
        if ((f.flags & 524288) !== 0) h = !0;
        else if ((f.flags & 262144) !== 0) break;
      }
      if (f.tag === 10) {
        var w = f.alternate;
        if (w === null) throw Error(r(387));
        if (w = w.memoizedProps, w !== null) {
          var R = f.type;
          Xt(f.pendingProps.value, w.value) || (e !== null ? e.push(R) : e = [R]);
        }
      } else if (f === F.current) {
        if (w = f.alternate, w === null) throw Error(r(387));
        w.memoizedState.memoizedState !== f.memoizedState.memoizedState && (e !== null ? e.push(Ar) : e = [Ar]);
      }
      f = f.return;
    }
    e !== null && zc(
      n,
      e,
      a,
      l
    ), n.flags |= 262144;
  }
  function Zl(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Xt(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function ia(e) {
    na = e, Gn = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function _t(e) {
    return wm(na, e);
  }
  function Kl(e, n) {
    return na === null && ia(e), wm(e, n);
  }
  function wm(e, n) {
    var a = n._currentValue;
    if (n = { context: n, memoizedValue: a, next: null }, Gn === null) {
      if (e === null) throw Error(r(308));
      Gn = n, e.dependencies = { lanes: 0, firstContext: n }, e.flags |= 524288;
    } else Gn = Gn.next = n;
    return a;
  }
  var V1 = typeof AbortController < "u" ? AbortController : function() {
    var e = [], n = this.signal = {
      aborted: !1,
      addEventListener: function(a, l) {
        e.push(l);
      }
    };
    this.abort = function() {
      n.aborted = !0, e.forEach(function(a) {
        return a();
      });
    };
  }, U1 = t.unstable_scheduleCallback, Y1 = t.unstable_NormalPriority, dt = {
    $$typeof: _,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Rc() {
    return {
      controller: new V1(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function ir(e) {
    e.refCount--, e.refCount === 0 && U1(Y1, function() {
      e.controller.abort();
    });
  }
  var ar = null, kc = 0, Qa = 0, Fa = null;
  function q1(e, n) {
    if (ar === null) {
      var a = ar = [];
      kc = 0, Qa = If(), Fa = {
        status: "pending",
        value: void 0,
        then: function(l) {
          a.push(l);
        }
      };
    }
    return kc++, n.then(Em, Em), n;
  }
  function Em() {
    if (--kc === 0 && ar !== null) {
      Fa !== null && (Fa.status = "fulfilled");
      var e = ar;
      ar = null, Qa = 0, Fa = null;
      for (var n = 0; n < e.length; n++) (0, e[n])();
    }
  }
  function $1(e, n) {
    var a = [], l = {
      status: "pending",
      value: null,
      reason: null,
      then: function(f) {
        a.push(f);
      }
    };
    return e.then(
      function() {
        l.status = "fulfilled", l.value = n;
        for (var f = 0; f < a.length; f++) (0, a[f])(n);
      },
      function(f) {
        for (l.status = "rejected", l.reason = f, f = 0; f < a.length; f++)
          (0, a[f])(void 0);
      }
    ), l;
  }
  var _m = A.S;
  A.S = function(e, n) {
    lp = it(), typeof n == "object" && n !== null && typeof n.then == "function" && q1(e, n), _m !== null && _m(e, n);
  };
  var aa = D(null);
  function Hc() {
    var e = aa.current;
    return e !== null ? e : We.pooledCache;
  }
  function Ql(e, n) {
    n === null ? ne(aa, aa.current) : ne(aa, n.pool);
  }
  function Nm() {
    var e = Hc();
    return e === null ? null : { parent: dt._currentValue, pool: e };
  }
  var Wa = Error(r(460)), Lc = Error(r(474)), Fl = Error(r(542)), Wl = { then: function() {
  } };
  function Cm(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Mm(e, n, a) {
    switch (a = e[a], a === void 0 ? e.push(n) : a !== n && (n.then(Yn, Yn), n = a), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw e = n.reason, Am(e), e;
      default:
        if (typeof n.status == "string") n.then(Yn, Yn);
        else {
          if (e = We, e !== null && 100 < e.shellSuspendCounter)
            throw Error(r(482));
          e = n, e.status = "pending", e.then(
            function(l) {
              if (n.status === "pending") {
                var f = n;
                f.status = "fulfilled", f.value = l;
              }
            },
            function(l) {
              if (n.status === "pending") {
                var f = n;
                f.status = "rejected", f.reason = l;
              }
            }
          );
        }
        switch (n.status) {
          case "fulfilled":
            return n.value;
          case "rejected":
            throw e = n.reason, Am(e), e;
        }
        throw ra = n, Wa;
    }
  }
  function oa(e) {
    try {
      var n = e._init;
      return n(e._payload);
    } catch (a) {
      throw a !== null && typeof a == "object" && typeof a.then == "function" ? (ra = a, Wa) : a;
    }
  }
  var ra = null;
  function Tm() {
    if (ra === null) throw Error(r(459));
    var e = ra;
    return ra = null, e;
  }
  function Am(e) {
    if (e === Wa || e === Fl)
      throw Error(r(483));
  }
  var Ja = null, or = 0;
  function Jl(e) {
    var n = or;
    return or += 1, Ja === null && (Ja = []), Mm(Ja, e, n);
  }
  function rr(e, n) {
    n = n.props.ref, e.ref = n !== void 0 ? n : null;
  }
  function Pl(e, n) {
    throw n.$$typeof === v ? Error(r(525)) : (e = Object.prototype.toString.call(n), Error(
      r(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : e
      )
    ));
  }
  function jm(e) {
    function n(ae, ie) {
      if (e) {
        var oe = ae.deletions;
        oe === null ? (ae.deletions = [ie], ae.flags |= 16) : oe.push(ie);
      }
    }
    function a(ae, ie) {
      if (!e) return null;
      for (; ie !== null; )
        n(ae, ie), ie = ie.sibling;
      return null;
    }
    function l(ae) {
      for (var ie = /* @__PURE__ */ new Map(); ae !== null; )
        ae.key !== null ? ie.set(ae.key, ae) : ie.set(ae.index, ae), ae = ae.sibling;
      return ie;
    }
    function f(ae, ie) {
      return ae = $n(ae, ie), ae.index = 0, ae.sibling = null, ae;
    }
    function h(ae, ie, oe) {
      return ae.index = oe, e ? (oe = ae.alternate, oe !== null ? (oe = oe.index, oe < ie ? (ae.flags |= 67108866, ie) : oe) : (ae.flags |= 67108866, ie)) : (ae.flags |= 1048576, ie);
    }
    function w(ae) {
      return e && ae.alternate === null && (ae.flags |= 67108866), ae;
    }
    function R(ae, ie, oe, de) {
      return ie === null || ie.tag !== 6 ? (ie = Nc(oe, ae.mode, de), ie.return = ae, ie) : (ie = f(ie, oe), ie.return = ae, ie);
    }
    function P(ae, ie, oe, de) {
      var Ee = oe.type;
      return Ee === N ? ce(
        ae,
        ie,
        oe.props.children,
        de,
        oe.key
      ) : ie !== null && (ie.elementType === Ee || typeof Ee == "object" && Ee !== null && Ee.$$typeof === I && oa(Ee) === ie.type) ? (ie = f(ie, oe.props), rr(ie, oe), ie.return = ae, ie) : (ie = Xl(
        oe.type,
        oe.key,
        oe.props,
        null,
        ae.mode,
        de
      ), rr(ie, oe), ie.return = ae, ie);
    }
    function re(ae, ie, oe, de) {
      return ie === null || ie.tag !== 4 || ie.stateNode.containerInfo !== oe.containerInfo || ie.stateNode.implementation !== oe.implementation ? (ie = Cc(oe, ae.mode, de), ie.return = ae, ie) : (ie = f(ie, oe.children || []), ie.return = ae, ie);
    }
    function ce(ae, ie, oe, de, Ee) {
      return ie === null || ie.tag !== 7 ? (ie = ea(
        oe,
        ae.mode,
        de,
        Ee
      ), ie.return = ae, ie) : (ie = f(ie, oe), ie.return = ae, ie);
    }
    function me(ae, ie, oe) {
      if (typeof ie == "string" && ie !== "" || typeof ie == "number" || typeof ie == "bigint")
        return ie = Nc(
          "" + ie,
          ae.mode,
          oe
        ), ie.return = ae, ie;
      if (typeof ie == "object" && ie !== null) {
        switch (ie.$$typeof) {
          case b:
            return oe = Xl(
              ie.type,
              ie.key,
              ie.props,
              null,
              ae.mode,
              oe
            ), rr(oe, ie), oe.return = ae, oe;
          case S:
            return ie = Cc(
              ie,
              ae.mode,
              oe
            ), ie.return = ae, ie;
          case I:
            return ie = oa(ie), me(ae, ie, oe);
        }
        if (Y(ie) || J(ie))
          return ie = ea(
            ie,
            ae.mode,
            oe,
            null
          ), ie.return = ae, ie;
        if (typeof ie.then == "function")
          return me(ae, Jl(ie), oe);
        if (ie.$$typeof === _)
          return me(
            ae,
            Kl(ae, ie),
            oe
          );
        Pl(ae, ie);
      }
      return null;
    }
    function le(ae, ie, oe, de) {
      var Ee = ie !== null ? ie.key : null;
      if (typeof oe == "string" && oe !== "" || typeof oe == "number" || typeof oe == "bigint")
        return Ee !== null ? null : R(ae, ie, "" + oe, de);
      if (typeof oe == "object" && oe !== null) {
        switch (oe.$$typeof) {
          case b:
            return oe.key === Ee ? P(ae, ie, oe, de) : null;
          case S:
            return oe.key === Ee ? re(ae, ie, oe, de) : null;
          case I:
            return oe = oa(oe), le(ae, ie, oe, de);
        }
        if (Y(oe) || J(oe))
          return Ee !== null ? null : ce(ae, ie, oe, de, null);
        if (typeof oe.then == "function")
          return le(
            ae,
            ie,
            Jl(oe),
            de
          );
        if (oe.$$typeof === _)
          return le(
            ae,
            ie,
            Kl(ae, oe),
            de
          );
        Pl(ae, oe);
      }
      return null;
    }
    function ue(ae, ie, oe, de, Ee) {
      if (typeof de == "string" && de !== "" || typeof de == "number" || typeof de == "bigint")
        return ae = ae.get(oe) || null, R(ie, ae, "" + de, Ee);
      if (typeof de == "object" && de !== null) {
        switch (de.$$typeof) {
          case b:
            return ae = ae.get(
              de.key === null ? oe : de.key
            ) || null, P(ie, ae, de, Ee);
          case S:
            return ae = ae.get(
              de.key === null ? oe : de.key
            ) || null, re(ie, ae, de, Ee);
          case I:
            return de = oa(de), ue(
              ae,
              ie,
              oe,
              de,
              Ee
            );
        }
        if (Y(de) || J(de))
          return ae = ae.get(oe) || null, ce(ie, ae, de, Ee, null);
        if (typeof de.then == "function")
          return ue(
            ae,
            ie,
            oe,
            Jl(de),
            Ee
          );
        if (de.$$typeof === _)
          return ue(
            ae,
            ie,
            oe,
            Kl(ie, de),
            Ee
          );
        Pl(ie, de);
      }
      return null;
    }
    function ye(ae, ie, oe, de) {
      for (var Ee = null, Ve = null, be = ie, je = ie = 0, ke = null; be !== null && je < oe.length; je++) {
        be.index > je ? (ke = be, be = null) : ke = be.sibling;
        var Ue = le(
          ae,
          be,
          oe[je],
          de
        );
        if (Ue === null) {
          be === null && (be = ke);
          break;
        }
        e && be && Ue.alternate === null && n(ae, be), ie = h(Ue, ie, je), Ve === null ? Ee = Ue : Ve.sibling = Ue, Ve = Ue, be = ke;
      }
      if (je === oe.length)
        return a(ae, be), Le && Xn(ae, je), Ee;
      if (be === null) {
        for (; je < oe.length; je++)
          be = me(ae, oe[je], de), be !== null && (ie = h(
            be,
            ie,
            je
          ), Ve === null ? Ee = be : Ve.sibling = be, Ve = be);
        return Le && Xn(ae, je), Ee;
      }
      for (be = l(be); je < oe.length; je++)
        ke = ue(
          be,
          ae,
          je,
          oe[je],
          de
        ), ke !== null && (e && ke.alternate !== null && be.delete(
          ke.key === null ? je : ke.key
        ), ie = h(
          ke,
          ie,
          je
        ), Ve === null ? Ee = ke : Ve.sibling = ke, Ve = ke);
      return e && be.forEach(function(Vi) {
        return n(ae, Vi);
      }), Le && Xn(ae, je), Ee;
    }
    function Ce(ae, ie, oe, de) {
      if (oe == null) throw Error(r(151));
      for (var Ee = null, Ve = null, be = ie, je = ie = 0, ke = null, Ue = oe.next(); be !== null && !Ue.done; je++, Ue = oe.next()) {
        be.index > je ? (ke = be, be = null) : ke = be.sibling;
        var Vi = le(ae, be, Ue.value, de);
        if (Vi === null) {
          be === null && (be = ke);
          break;
        }
        e && be && Vi.alternate === null && n(ae, be), ie = h(Vi, ie, je), Ve === null ? Ee = Vi : Ve.sibling = Vi, Ve = Vi, be = ke;
      }
      if (Ue.done)
        return a(ae, be), Le && Xn(ae, je), Ee;
      if (be === null) {
        for (; !Ue.done; je++, Ue = oe.next())
          Ue = me(ae, Ue.value, de), Ue !== null && (ie = h(Ue, ie, je), Ve === null ? Ee = Ue : Ve.sibling = Ue, Ve = Ue);
        return Le && Xn(ae, je), Ee;
      }
      for (be = l(be); !Ue.done; je++, Ue = oe.next())
        Ue = ue(be, ae, je, Ue.value, de), Ue !== null && (e && Ue.alternate !== null && be.delete(Ue.key === null ? je : Ue.key), ie = h(Ue, ie, je), Ve === null ? Ee = Ue : Ve.sibling = Ue, Ve = Ue);
      return e && be.forEach(function(tw) {
        return n(ae, tw);
      }), Le && Xn(ae, je), Ee;
    }
    function Fe(ae, ie, oe, de) {
      if (typeof oe == "object" && oe !== null && oe.type === N && oe.key === null && (oe = oe.props.children), typeof oe == "object" && oe !== null) {
        switch (oe.$$typeof) {
          case b:
            e: {
              for (var Ee = oe.key; ie !== null; ) {
                if (ie.key === Ee) {
                  if (Ee = oe.type, Ee === N) {
                    if (ie.tag === 7) {
                      a(
                        ae,
                        ie.sibling
                      ), de = f(
                        ie,
                        oe.props.children
                      ), de.return = ae, ae = de;
                      break e;
                    }
                  } else if (ie.elementType === Ee || typeof Ee == "object" && Ee !== null && Ee.$$typeof === I && oa(Ee) === ie.type) {
                    a(
                      ae,
                      ie.sibling
                    ), de = f(ie, oe.props), rr(de, oe), de.return = ae, ae = de;
                    break e;
                  }
                  a(ae, ie);
                  break;
                } else n(ae, ie);
                ie = ie.sibling;
              }
              oe.type === N ? (de = ea(
                oe.props.children,
                ae.mode,
                de,
                oe.key
              ), de.return = ae, ae = de) : (de = Xl(
                oe.type,
                oe.key,
                oe.props,
                null,
                ae.mode,
                de
              ), rr(de, oe), de.return = ae, ae = de);
            }
            return w(ae);
          case S:
            e: {
              for (Ee = oe.key; ie !== null; ) {
                if (ie.key === Ee)
                  if (ie.tag === 4 && ie.stateNode.containerInfo === oe.containerInfo && ie.stateNode.implementation === oe.implementation) {
                    a(
                      ae,
                      ie.sibling
                    ), de = f(ie, oe.children || []), de.return = ae, ae = de;
                    break e;
                  } else {
                    a(ae, ie);
                    break;
                  }
                else n(ae, ie);
                ie = ie.sibling;
              }
              de = Cc(oe, ae.mode, de), de.return = ae, ae = de;
            }
            return w(ae);
          case I:
            return oe = oa(oe), Fe(
              ae,
              ie,
              oe,
              de
            );
        }
        if (Y(oe))
          return ye(
            ae,
            ie,
            oe,
            de
          );
        if (J(oe)) {
          if (Ee = J(oe), typeof Ee != "function") throw Error(r(150));
          return oe = Ee.call(oe), Ce(
            ae,
            ie,
            oe,
            de
          );
        }
        if (typeof oe.then == "function")
          return Fe(
            ae,
            ie,
            Jl(oe),
            de
          );
        if (oe.$$typeof === _)
          return Fe(
            ae,
            ie,
            Kl(ae, oe),
            de
          );
        Pl(ae, oe);
      }
      return typeof oe == "string" && oe !== "" || typeof oe == "number" || typeof oe == "bigint" ? (oe = "" + oe, ie !== null && ie.tag === 6 ? (a(ae, ie.sibling), de = f(ie, oe), de.return = ae, ae = de) : (a(ae, ie), de = Nc(oe, ae.mode, de), de.return = ae, ae = de), w(ae)) : a(ae, ie);
    }
    return function(ae, ie, oe, de) {
      try {
        or = 0;
        var Ee = Fe(
          ae,
          ie,
          oe,
          de
        );
        return Ja = null, Ee;
      } catch (be) {
        if (be === Wa || be === Fl) throw be;
        var Ve = Gt(29, be, null, ae.mode);
        return Ve.lanes = de, Ve.return = ae, Ve;
      }
    };
  }
  var la = jm(!0), Dm = jm(!1), Ei = !1;
  function Bc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Ic(e, n) {
    e = e.updateQueue, n.updateQueue === e && (n.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function _i(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Ni(e, n, a) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (l = l.shared, ($e & 2) !== 0) {
      var f = l.pending;
      return f === null ? n.next = n : (n.next = f.next, f.next = n), l.pending = n, n = $l(e), mm(e, null, a), n;
    }
    return ql(e, l, n, a), $l(e);
  }
  function lr(e, n, a) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (a & 4194048) !== 0)) {
      var l = n.lanes;
      l &= e.pendingLanes, a |= l, n.lanes = a, El(e, a);
    }
  }
  function Vc(e, n) {
    var a = e.updateQueue, l = e.alternate;
    if (l !== null && (l = l.updateQueue, a === l)) {
      var f = null, h = null;
      if (a = a.firstBaseUpdate, a !== null) {
        do {
          var w = {
            lane: a.lane,
            tag: a.tag,
            payload: a.payload,
            callback: null,
            next: null
          };
          h === null ? f = h = w : h = h.next = w, a = a.next;
        } while (a !== null);
        h === null ? f = h = n : h = h.next = n;
      } else f = h = n;
      a = {
        baseState: l.baseState,
        firstBaseUpdate: f,
        lastBaseUpdate: h,
        shared: l.shared,
        callbacks: l.callbacks
      }, e.updateQueue = a;
      return;
    }
    e = a.lastBaseUpdate, e === null ? a.firstBaseUpdate = n : e.next = n, a.lastBaseUpdate = n;
  }
  var Uc = !1;
  function sr() {
    if (Uc) {
      var e = Fa;
      if (e !== null) throw e;
    }
  }
  function ur(e, n, a, l) {
    Uc = !1;
    var f = e.updateQueue;
    Ei = !1;
    var h = f.firstBaseUpdate, w = f.lastBaseUpdate, R = f.shared.pending;
    if (R !== null) {
      f.shared.pending = null;
      var P = R, re = P.next;
      P.next = null, w === null ? h = re : w.next = re, w = P;
      var ce = e.alternate;
      ce !== null && (ce = ce.updateQueue, R = ce.lastBaseUpdate, R !== w && (R === null ? ce.firstBaseUpdate = re : R.next = re, ce.lastBaseUpdate = P));
    }
    if (h !== null) {
      var me = f.baseState;
      w = 0, ce = re = P = null, R = h;
      do {
        var le = R.lane & -536870913, ue = le !== R.lane;
        if (ue ? (Re & le) === le : (l & le) === le) {
          le !== 0 && le === Qa && (Uc = !0), ce !== null && (ce = ce.next = {
            lane: 0,
            tag: R.tag,
            payload: R.payload,
            callback: null,
            next: null
          });
          e: {
            var ye = e, Ce = R;
            le = n;
            var Fe = a;
            switch (Ce.tag) {
              case 1:
                if (ye = Ce.payload, typeof ye == "function") {
                  me = ye.call(Fe, me, le);
                  break e;
                }
                me = ye;
                break e;
              case 3:
                ye.flags = ye.flags & -65537 | 128;
              case 0:
                if (ye = Ce.payload, le = typeof ye == "function" ? ye.call(Fe, me, le) : ye, le == null) break e;
                me = p({}, me, le);
                break e;
              case 2:
                Ei = !0;
            }
          }
          le = R.callback, le !== null && (e.flags |= 64, ue && (e.flags |= 8192), ue = f.callbacks, ue === null ? f.callbacks = [le] : ue.push(le));
        } else
          ue = {
            lane: le,
            tag: R.tag,
            payload: R.payload,
            callback: R.callback,
            next: null
          }, ce === null ? (re = ce = ue, P = me) : ce = ce.next = ue, w |= le;
        if (R = R.next, R === null) {
          if (R = f.shared.pending, R === null)
            break;
          ue = R, R = ue.next, ue.next = null, f.lastBaseUpdate = ue, f.shared.pending = null;
        }
      } while (!0);
      ce === null && (P = me), f.baseState = P, f.firstBaseUpdate = re, f.lastBaseUpdate = ce, h === null && (f.shared.lanes = 0), ji |= w, e.lanes = w, e.memoizedState = me;
    }
  }
  function Om(e, n) {
    if (typeof e != "function")
      throw Error(r(191, e));
    e.call(n);
  }
  function zm(e, n) {
    var a = e.callbacks;
    if (a !== null)
      for (e.callbacks = null, e = 0; e < a.length; e++)
        Om(a[e], n);
  }
  var Pa = D(null), es = D(0);
  function Rm(e, n) {
    e = ni, ne(es, e), ne(Pa, n), ni = e | n.baseLanes;
  }
  function Yc() {
    ne(es, ni), ne(Pa, Pa.current);
  }
  function qc() {
    ni = es.current, V(Pa), V(es);
  }
  var Zt = D(null), sn = null;
  function Ci(e) {
    var n = e.alternate;
    ne(st, st.current & 1), ne(Zt, e), sn === null && (n === null || Pa.current !== null || n.memoizedState !== null) && (sn = e);
  }
  function $c(e) {
    ne(st, st.current), ne(Zt, e), sn === null && (sn = e);
  }
  function km(e) {
    e.tag === 22 ? (ne(st, st.current), ne(Zt, e), sn === null && (sn = e)) : Mi();
  }
  function Mi() {
    ne(st, st.current), ne(Zt, Zt.current);
  }
  function Kt(e) {
    V(Zt), sn === e && (sn = null), V(st);
  }
  var st = D(0);
  function ts(e) {
    for (var n = e; n !== null; ) {
      if (n.tag === 13) {
        var a = n.memoizedState;
        if (a !== null && (a = a.dehydrated, a === null || Wf(a) || Jf(a)))
          return n;
      } else if (n.tag === 19 && (n.memoizedProps.revealOrder === "forwards" || n.memoizedProps.revealOrder === "backwards" || n.memoizedProps.revealOrder === "unstable_legacy-backwards" || n.memoizedProps.revealOrder === "together")) {
        if ((n.flags & 128) !== 0) return n;
      } else if (n.child !== null) {
        n.child.return = n, n = n.child;
        continue;
      }
      if (n === e) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === e) return null;
        n = n.return;
      }
      n.sibling.return = n.return, n = n.sibling;
    }
    return null;
  }
  var Kn = 0, Te = null, Ke = null, ht = null, ns = !1, eo = !1, sa = !1, is = 0, cr = 0, to = null, X1 = 0;
  function rt() {
    throw Error(r(321));
  }
  function Xc(e, n) {
    if (n === null) return !1;
    for (var a = 0; a < n.length && a < e.length; a++)
      if (!Xt(e[a], n[a])) return !1;
    return !0;
  }
  function Gc(e, n, a, l, f, h) {
    return Kn = h, Te = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, A.H = e === null || e.memoizedState === null ? vg : sf, sa = !1, h = a(l, f), sa = !1, eo && (h = Lm(
      n,
      a,
      l,
      f
    )), Hm(e), h;
  }
  function Hm(e) {
    A.H = hr;
    var n = Ke !== null && Ke.next !== null;
    if (Kn = 0, ht = Ke = Te = null, ns = !1, cr = 0, to = null, n) throw Error(r(300));
    e === null || mt || (e = e.dependencies, e !== null && Zl(e) && (mt = !0));
  }
  function Lm(e, n, a, l) {
    Te = e;
    var f = 0;
    do {
      if (eo && (to = null), cr = 0, eo = !1, 25 <= f) throw Error(r(301));
      if (f += 1, ht = Ke = null, e.updateQueue != null) {
        var h = e.updateQueue;
        h.lastEffect = null, h.events = null, h.stores = null, h.memoCache != null && (h.memoCache.index = 0);
      }
      A.H = bg, h = n(a, l);
    } while (eo);
    return h;
  }
  function G1() {
    var e = A.H, n = e.useState()[0];
    return n = typeof n.then == "function" ? fr(n) : n, e = e.useState()[0], (Ke !== null ? Ke.memoizedState : null) !== e && (Te.flags |= 1024), n;
  }
  function Zc() {
    var e = is !== 0;
    return is = 0, e;
  }
  function Kc(e, n, a) {
    n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~a;
  }
  function Qc(e) {
    if (ns) {
      for (e = e.memoizedState; e !== null; ) {
        var n = e.queue;
        n !== null && (n.pending = null), e = e.next;
      }
      ns = !1;
    }
    Kn = 0, ht = Ke = Te = null, eo = !1, cr = is = 0, to = null;
  }
  function jt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return ht === null ? Te.memoizedState = ht = e : ht = ht.next = e, ht;
  }
  function ut() {
    if (Ke === null) {
      var e = Te.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ke.next;
    var n = ht === null ? Te.memoizedState : ht.next;
    if (n !== null)
      ht = n, Ke = e;
    else {
      if (e === null)
        throw Te.alternate === null ? Error(r(467)) : Error(r(310));
      Ke = e, e = {
        memoizedState: Ke.memoizedState,
        baseState: Ke.baseState,
        baseQueue: Ke.baseQueue,
        queue: Ke.queue,
        next: null
      }, ht === null ? Te.memoizedState = ht = e : ht = ht.next = e;
    }
    return ht;
  }
  function as() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function fr(e) {
    var n = cr;
    return cr += 1, to === null && (to = []), e = Mm(to, e, n), n = Te, (ht === null ? n.memoizedState : ht.next) === null && (n = n.alternate, A.H = n === null || n.memoizedState === null ? vg : sf), e;
  }
  function os(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return fr(e);
      if (e.$$typeof === _) return _t(e);
    }
    throw Error(r(438, String(e)));
  }
  function Fc(e) {
    var n = null, a = Te.updateQueue;
    if (a !== null && (n = a.memoCache), n == null) {
      var l = Te.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (n = {
        data: l.data.map(function(f) {
          return f.slice();
        }),
        index: 0
      })));
    }
    if (n == null && (n = { data: [], index: 0 }), a === null && (a = as(), Te.updateQueue = a), a.memoCache = n, a = n.data[n.index], a === void 0)
      for (a = n.data[n.index] = Array(e), l = 0; l < e; l++)
        a[l] = Q;
    return n.index++, a;
  }
  function Qn(e, n) {
    return typeof n == "function" ? n(e) : n;
  }
  function rs(e) {
    var n = ut();
    return Wc(n, Ke, e);
  }
  function Wc(e, n, a) {
    var l = e.queue;
    if (l === null) throw Error(r(311));
    l.lastRenderedReducer = a;
    var f = e.baseQueue, h = l.pending;
    if (h !== null) {
      if (f !== null) {
        var w = f.next;
        f.next = h.next, h.next = w;
      }
      n.baseQueue = f = h, l.pending = null;
    }
    if (h = e.baseState, f === null) e.memoizedState = h;
    else {
      n = f.next;
      var R = w = null, P = null, re = n, ce = !1;
      do {
        var me = re.lane & -536870913;
        if (me !== re.lane ? (Re & me) === me : (Kn & me) === me) {
          var le = re.revertLane;
          if (le === 0)
            P !== null && (P = P.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: re.action,
              hasEagerState: re.hasEagerState,
              eagerState: re.eagerState,
              next: null
            }), me === Qa && (ce = !0);
          else if ((Kn & le) === le) {
            re = re.next, le === Qa && (ce = !0);
            continue;
          } else
            me = {
              lane: 0,
              revertLane: re.revertLane,
              gesture: null,
              action: re.action,
              hasEagerState: re.hasEagerState,
              eagerState: re.eagerState,
              next: null
            }, P === null ? (R = P = me, w = h) : P = P.next = me, Te.lanes |= le, ji |= le;
          me = re.action, sa && a(h, me), h = re.hasEagerState ? re.eagerState : a(h, me);
        } else
          le = {
            lane: me,
            revertLane: re.revertLane,
            gesture: re.gesture,
            action: re.action,
            hasEagerState: re.hasEagerState,
            eagerState: re.eagerState,
            next: null
          }, P === null ? (R = P = le, w = h) : P = P.next = le, Te.lanes |= me, ji |= me;
        re = re.next;
      } while (re !== null && re !== n);
      if (P === null ? w = h : P.next = R, !Xt(h, e.memoizedState) && (mt = !0, ce && (a = Fa, a !== null)))
        throw a;
      e.memoizedState = h, e.baseState = w, e.baseQueue = P, l.lastRenderedState = h;
    }
    return f === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function Jc(e) {
    var n = ut(), a = n.queue;
    if (a === null) throw Error(r(311));
    a.lastRenderedReducer = e;
    var l = a.dispatch, f = a.pending, h = n.memoizedState;
    if (f !== null) {
      a.pending = null;
      var w = f = f.next;
      do
        h = e(h, w.action), w = w.next;
      while (w !== f);
      Xt(h, n.memoizedState) || (mt = !0), n.memoizedState = h, n.baseQueue === null && (n.baseState = h), a.lastRenderedState = h;
    }
    return [h, l];
  }
  function Bm(e, n, a) {
    var l = Te, f = ut(), h = Le;
    if (h) {
      if (a === void 0) throw Error(r(407));
      a = a();
    } else a = n();
    var w = !Xt(
      (Ke || f).memoizedState,
      a
    );
    if (w && (f.memoizedState = a, mt = !0), f = f.queue, tf(Um.bind(null, l, f, e), [
      e
    ]), f.getSnapshot !== n || w || ht !== null && ht.memoizedState.tag & 1) {
      if (l.flags |= 2048, no(
        9,
        { destroy: void 0 },
        Vm.bind(
          null,
          l,
          f,
          a,
          n
        ),
        null
      ), We === null) throw Error(r(349));
      h || (Kn & 127) !== 0 || Im(l, n, a);
    }
    return a;
  }
  function Im(e, n, a) {
    e.flags |= 16384, e = { getSnapshot: n, value: a }, n = Te.updateQueue, n === null ? (n = as(), Te.updateQueue = n, n.stores = [e]) : (a = n.stores, a === null ? n.stores = [e] : a.push(e));
  }
  function Vm(e, n, a, l) {
    n.value = a, n.getSnapshot = l, Ym(n) && qm(e);
  }
  function Um(e, n, a) {
    return a(function() {
      Ym(n) && qm(e);
    });
  }
  function Ym(e) {
    var n = e.getSnapshot;
    e = e.value;
    try {
      var a = n();
      return !Xt(e, a);
    } catch {
      return !0;
    }
  }
  function qm(e) {
    var n = Pi(e, 2);
    n !== null && Yt(n, e, 2);
  }
  function Pc(e) {
    var n = jt();
    if (typeof e == "function") {
      var a = e;
      if (e = a(), sa) {
        Ne(!0);
        try {
          a();
        } finally {
          Ne(!1);
        }
      }
    }
    return n.memoizedState = n.baseState = e, n.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Qn,
      lastRenderedState: e
    }, n;
  }
  function $m(e, n, a, l) {
    return e.baseState = a, Wc(
      e,
      Ke,
      typeof l == "function" ? l : Qn
    );
  }
  function Z1(e, n, a, l, f) {
    if (us(e)) throw Error(r(485));
    if (e = n.action, e !== null) {
      var h = {
        payload: f,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(w) {
          h.listeners.push(w);
        }
      };
      A.T !== null ? a(!0) : h.isTransition = !1, l(h), a = n.pending, a === null ? (h.next = n.pending = h, Xm(n, h)) : (h.next = a.next, n.pending = a.next = h);
    }
  }
  function Xm(e, n) {
    var a = n.action, l = n.payload, f = e.state;
    if (n.isTransition) {
      var h = A.T, w = {};
      A.T = w;
      try {
        var R = a(f, l), P = A.S;
        P !== null && P(w, R), Gm(e, n, R);
      } catch (re) {
        ef(e, n, re);
      } finally {
        h !== null && w.types !== null && (h.types = w.types), A.T = h;
      }
    } else
      try {
        h = a(f, l), Gm(e, n, h);
      } catch (re) {
        ef(e, n, re);
      }
  }
  function Gm(e, n, a) {
    a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(
      function(l) {
        Zm(e, n, l);
      },
      function(l) {
        return ef(e, n, l);
      }
    ) : Zm(e, n, a);
  }
  function Zm(e, n, a) {
    n.status = "fulfilled", n.value = a, Km(n), e.state = a, n = e.pending, n !== null && (a = n.next, a === n ? e.pending = null : (a = a.next, n.next = a, Xm(e, a)));
  }
  function ef(e, n, a) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        n.status = "rejected", n.reason = a, Km(n), n = n.next;
      while (n !== l);
    }
    e.action = null;
  }
  function Km(e) {
    e = e.listeners;
    for (var n = 0; n < e.length; n++) (0, e[n])();
  }
  function Qm(e, n) {
    return n;
  }
  function Fm(e, n) {
    if (Le) {
      var a = We.formState;
      if (a !== null) {
        e: {
          var l = Te;
          if (Le) {
            if (Je) {
              t: {
                for (var f = Je, h = ln; f.nodeType !== 8; ) {
                  if (!h) {
                    f = null;
                    break t;
                  }
                  if (f = un(
                    f.nextSibling
                  ), f === null) {
                    f = null;
                    break t;
                  }
                }
                h = f.data, f = h === "F!" || h === "F" ? f : null;
              }
              if (f) {
                Je = un(
                  f.nextSibling
                ), l = f.data === "F!";
                break e;
              }
            }
            Si(l);
          }
          l = !1;
        }
        l && (n = a[0]);
      }
    }
    return a = jt(), a.memoizedState = a.baseState = n, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Qm,
      lastRenderedState: n
    }, a.queue = l, a = gg.bind(
      null,
      Te,
      l
    ), l.dispatch = a, l = Pc(!1), h = lf.bind(
      null,
      Te,
      !1,
      l.queue
    ), l = jt(), f = {
      state: n,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = f, a = Z1.bind(
      null,
      Te,
      f,
      h,
      a
    ), f.dispatch = a, l.memoizedState = e, [n, a, !1];
  }
  function Wm(e) {
    var n = ut();
    return Jm(n, Ke, e);
  }
  function Jm(e, n, a) {
    if (n = Wc(
      e,
      n,
      Qm
    )[0], e = rs(Qn)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var l = fr(n);
      } catch (w) {
        throw w === Wa ? Fl : w;
      }
    else l = n;
    n = ut();
    var f = n.queue, h = f.dispatch;
    return a !== n.memoizedState && (Te.flags |= 2048, no(
      9,
      { destroy: void 0 },
      K1.bind(null, f, a),
      null
    )), [l, h, e];
  }
  function K1(e, n) {
    e.action = n;
  }
  function Pm(e) {
    var n = ut(), a = Ke;
    if (a !== null)
      return Jm(n, a, e);
    ut(), n = n.memoizedState, a = ut();
    var l = a.queue.dispatch;
    return a.memoizedState = e, [n, l, !1];
  }
  function no(e, n, a, l) {
    return e = { tag: e, create: a, deps: l, inst: n, next: null }, n = Te.updateQueue, n === null && (n = as(), Te.updateQueue = n), a = n.lastEffect, a === null ? n.lastEffect = e.next = e : (l = a.next, a.next = e, e.next = l, n.lastEffect = e), e;
  }
  function eg() {
    return ut().memoizedState;
  }
  function ls(e, n, a, l) {
    var f = jt();
    Te.flags |= e, f.memoizedState = no(
      1 | n,
      { destroy: void 0 },
      a,
      l === void 0 ? null : l
    );
  }
  function ss(e, n, a, l) {
    var f = ut();
    l = l === void 0 ? null : l;
    var h = f.memoizedState.inst;
    Ke !== null && l !== null && Xc(l, Ke.memoizedState.deps) ? f.memoizedState = no(n, h, a, l) : (Te.flags |= e, f.memoizedState = no(
      1 | n,
      h,
      a,
      l
    ));
  }
  function tg(e, n) {
    ls(8390656, 8, e, n);
  }
  function tf(e, n) {
    ss(2048, 8, e, n);
  }
  function Q1(e) {
    Te.flags |= 4;
    var n = Te.updateQueue;
    if (n === null)
      n = as(), Te.updateQueue = n, n.events = [e];
    else {
      var a = n.events;
      a === null ? n.events = [e] : a.push(e);
    }
  }
  function ng(e) {
    var n = ut().memoizedState;
    return Q1({ ref: n, nextImpl: e }), function() {
      if (($e & 2) !== 0) throw Error(r(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function ig(e, n) {
    return ss(4, 2, e, n);
  }
  function ag(e, n) {
    return ss(4, 4, e, n);
  }
  function og(e, n) {
    if (typeof n == "function") {
      e = e();
      var a = n(e);
      return function() {
        typeof a == "function" ? a() : n(null);
      };
    }
    if (n != null)
      return e = e(), n.current = e, function() {
        n.current = null;
      };
  }
  function rg(e, n, a) {
    a = a != null ? a.concat([e]) : null, ss(4, 4, og.bind(null, n, e), a);
  }
  function nf() {
  }
  function lg(e, n) {
    var a = ut();
    n = n === void 0 ? null : n;
    var l = a.memoizedState;
    return n !== null && Xc(n, l[1]) ? l[0] : (a.memoizedState = [e, n], e);
  }
  function sg(e, n) {
    var a = ut();
    n = n === void 0 ? null : n;
    var l = a.memoizedState;
    if (n !== null && Xc(n, l[1]))
      return l[0];
    if (l = e(), sa) {
      Ne(!0);
      try {
        e();
      } finally {
        Ne(!1);
      }
    }
    return a.memoizedState = [l, n], l;
  }
  function af(e, n, a) {
    return a === void 0 || (Kn & 1073741824) !== 0 && (Re & 261930) === 0 ? e.memoizedState = n : (e.memoizedState = a, e = up(), Te.lanes |= e, ji |= e, a);
  }
  function ug(e, n, a, l) {
    return Xt(a, n) ? a : Pa.current !== null ? (e = af(e, a, l), Xt(e, n) || (mt = !0), e) : (Kn & 42) === 0 || (Kn & 1073741824) !== 0 && (Re & 261930) === 0 ? (mt = !0, e.memoizedState = a) : (e = up(), Te.lanes |= e, ji |= e, n);
  }
  function cg(e, n, a, l, f) {
    var h = z.p;
    z.p = h !== 0 && 8 > h ? h : 8;
    var w = A.T, R = {};
    A.T = R, lf(e, !1, n, a);
    try {
      var P = f(), re = A.S;
      if (re !== null && re(R, P), P !== null && typeof P == "object" && typeof P.then == "function") {
        var ce = $1(
          P,
          l
        );
        dr(
          e,
          n,
          ce,
          Wt(e)
        );
      } else
        dr(
          e,
          n,
          l,
          Wt(e)
        );
    } catch (me) {
      dr(
        e,
        n,
        { then: function() {
        }, status: "rejected", reason: me },
        Wt()
      );
    } finally {
      z.p = h, w !== null && R.types !== null && (w.types = R.types), A.T = w;
    }
  }
  function F1() {
  }
  function of(e, n, a, l) {
    if (e.tag !== 5) throw Error(r(476));
    var f = fg(e).queue;
    cg(
      e,
      f,
      n,
      q,
      a === null ? F1 : function() {
        return dg(e), a(l);
      }
    );
  }
  function fg(e) {
    var n = e.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: q,
      baseState: q,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Qn,
        lastRenderedState: q
      },
      next: null
    };
    var a = {};
    return n.next = {
      memoizedState: a,
      baseState: a,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Qn,
        lastRenderedState: a
      },
      next: null
    }, e.memoizedState = n, e = e.alternate, e !== null && (e.memoizedState = n), n;
  }
  function dg(e) {
    var n = fg(e);
    n.next === null && (n = e.alternate.memoizedState), dr(
      e,
      n.next.queue,
      {},
      Wt()
    );
  }
  function rf() {
    return _t(Ar);
  }
  function hg() {
    return ut().memoizedState;
  }
  function mg() {
    return ut().memoizedState;
  }
  function W1(e) {
    for (var n = e.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var a = Wt();
          e = _i(a);
          var l = Ni(n, e, a);
          l !== null && (Yt(l, n, a), lr(l, n, a)), n = { cache: Rc() }, e.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function J1(e, n, a) {
    var l = Wt();
    a = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, us(e) ? pg(n, a) : (a = Ec(e, n, a, l), a !== null && (Yt(a, e, l), yg(a, n, l)));
  }
  function gg(e, n, a) {
    var l = Wt();
    dr(e, n, a, l);
  }
  function dr(e, n, a, l) {
    var f = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (us(e)) pg(n, f);
    else {
      var h = e.alternate;
      if (e.lanes === 0 && (h === null || h.lanes === 0) && (h = n.lastRenderedReducer, h !== null))
        try {
          var w = n.lastRenderedState, R = h(w, a);
          if (f.hasEagerState = !0, f.eagerState = R, Xt(R, w))
            return ql(e, n, f, 0), We === null && Yl(), !1;
        } catch {
        }
      if (a = Ec(e, n, f, l), a !== null)
        return Yt(a, e, l), yg(a, n, l), !0;
    }
    return !1;
  }
  function lf(e, n, a, l) {
    if (l = {
      lane: 2,
      revertLane: If(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, us(e)) {
      if (n) throw Error(r(479));
    } else
      n = Ec(
        e,
        a,
        l,
        2
      ), n !== null && Yt(n, e, 2);
  }
  function us(e) {
    var n = e.alternate;
    return e === Te || n !== null && n === Te;
  }
  function pg(e, n) {
    eo = ns = !0;
    var a = e.pending;
    a === null ? n.next = n : (n.next = a.next, a.next = n), e.pending = n;
  }
  function yg(e, n, a) {
    if ((a & 4194048) !== 0) {
      var l = n.lanes;
      l &= e.pendingLanes, a |= l, n.lanes = a, El(e, a);
    }
  }
  var hr = {
    readContext: _t,
    use: os,
    useCallback: rt,
    useContext: rt,
    useEffect: rt,
    useImperativeHandle: rt,
    useLayoutEffect: rt,
    useInsertionEffect: rt,
    useMemo: rt,
    useReducer: rt,
    useRef: rt,
    useState: rt,
    useDebugValue: rt,
    useDeferredValue: rt,
    useTransition: rt,
    useSyncExternalStore: rt,
    useId: rt,
    useHostTransitionStatus: rt,
    useFormState: rt,
    useActionState: rt,
    useOptimistic: rt,
    useMemoCache: rt,
    useCacheRefresh: rt
  };
  hr.useEffectEvent = rt;
  var vg = {
    readContext: _t,
    use: os,
    useCallback: function(e, n) {
      return jt().memoizedState = [
        e,
        n === void 0 ? null : n
      ], e;
    },
    useContext: _t,
    useEffect: tg,
    useImperativeHandle: function(e, n, a) {
      a = a != null ? a.concat([e]) : null, ls(
        4194308,
        4,
        og.bind(null, n, e),
        a
      );
    },
    useLayoutEffect: function(e, n) {
      return ls(4194308, 4, e, n);
    },
    useInsertionEffect: function(e, n) {
      ls(4, 2, e, n);
    },
    useMemo: function(e, n) {
      var a = jt();
      n = n === void 0 ? null : n;
      var l = e();
      if (sa) {
        Ne(!0);
        try {
          e();
        } finally {
          Ne(!1);
        }
      }
      return a.memoizedState = [l, n], l;
    },
    useReducer: function(e, n, a) {
      var l = jt();
      if (a !== void 0) {
        var f = a(n);
        if (sa) {
          Ne(!0);
          try {
            a(n);
          } finally {
            Ne(!1);
          }
        }
      } else f = n;
      return l.memoizedState = l.baseState = f, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: f
      }, l.queue = e, e = e.dispatch = J1.bind(
        null,
        Te,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var n = jt();
      return e = { current: e }, n.memoizedState = e;
    },
    useState: function(e) {
      e = Pc(e);
      var n = e.queue, a = gg.bind(null, Te, n);
      return n.dispatch = a, [e.memoizedState, a];
    },
    useDebugValue: nf,
    useDeferredValue: function(e, n) {
      var a = jt();
      return af(a, e, n);
    },
    useTransition: function() {
      var e = Pc(!1);
      return e = cg.bind(
        null,
        Te,
        e.queue,
        !0,
        !1
      ), jt().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, n, a) {
      var l = Te, f = jt();
      if (Le) {
        if (a === void 0)
          throw Error(r(407));
        a = a();
      } else {
        if (a = n(), We === null)
          throw Error(r(349));
        (Re & 127) !== 0 || Im(l, n, a);
      }
      f.memoizedState = a;
      var h = { value: a, getSnapshot: n };
      return f.queue = h, tg(Um.bind(null, l, h, e), [
        e
      ]), l.flags |= 2048, no(
        9,
        { destroy: void 0 },
        Vm.bind(
          null,
          l,
          h,
          a,
          n
        ),
        null
      ), a;
    },
    useId: function() {
      var e = jt(), n = We.identifierPrefix;
      if (Le) {
        var a = jn, l = An;
        a = (l & ~(1 << 32 - Ae(l) - 1)).toString(32) + a, n = "_" + n + "R_" + a, a = is++, 0 < a && (n += "H" + a.toString(32)), n += "_";
      } else
        a = X1++, n = "_" + n + "r_" + a.toString(32) + "_";
      return e.memoizedState = n;
    },
    useHostTransitionStatus: rf,
    useFormState: Fm,
    useActionState: Fm,
    useOptimistic: function(e) {
      var n = jt();
      n.memoizedState = n.baseState = e;
      var a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return n.queue = a, n = lf.bind(
        null,
        Te,
        !0,
        a
      ), a.dispatch = n, [e, n];
    },
    useMemoCache: Fc,
    useCacheRefresh: function() {
      return jt().memoizedState = W1.bind(
        null,
        Te
      );
    },
    useEffectEvent: function(e) {
      var n = jt(), a = { impl: e };
      return n.memoizedState = a, function() {
        if (($e & 2) !== 0)
          throw Error(r(440));
        return a.impl.apply(void 0, arguments);
      };
    }
  }, sf = {
    readContext: _t,
    use: os,
    useCallback: lg,
    useContext: _t,
    useEffect: tf,
    useImperativeHandle: rg,
    useInsertionEffect: ig,
    useLayoutEffect: ag,
    useMemo: sg,
    useReducer: rs,
    useRef: eg,
    useState: function() {
      return rs(Qn);
    },
    useDebugValue: nf,
    useDeferredValue: function(e, n) {
      var a = ut();
      return ug(
        a,
        Ke.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = rs(Qn)[0], n = ut().memoizedState;
      return [
        typeof e == "boolean" ? e : fr(e),
        n
      ];
    },
    useSyncExternalStore: Bm,
    useId: hg,
    useHostTransitionStatus: rf,
    useFormState: Wm,
    useActionState: Wm,
    useOptimistic: function(e, n) {
      var a = ut();
      return $m(a, Ke, e, n);
    },
    useMemoCache: Fc,
    useCacheRefresh: mg
  };
  sf.useEffectEvent = ng;
  var bg = {
    readContext: _t,
    use: os,
    useCallback: lg,
    useContext: _t,
    useEffect: tf,
    useImperativeHandle: rg,
    useInsertionEffect: ig,
    useLayoutEffect: ag,
    useMemo: sg,
    useReducer: Jc,
    useRef: eg,
    useState: function() {
      return Jc(Qn);
    },
    useDebugValue: nf,
    useDeferredValue: function(e, n) {
      var a = ut();
      return Ke === null ? af(a, e, n) : ug(
        a,
        Ke.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = Jc(Qn)[0], n = ut().memoizedState;
      return [
        typeof e == "boolean" ? e : fr(e),
        n
      ];
    },
    useSyncExternalStore: Bm,
    useId: hg,
    useHostTransitionStatus: rf,
    useFormState: Pm,
    useActionState: Pm,
    useOptimistic: function(e, n) {
      var a = ut();
      return Ke !== null ? $m(a, Ke, e, n) : (a.baseState = e, [e, a.queue.dispatch]);
    },
    useMemoCache: Fc,
    useCacheRefresh: mg
  };
  bg.useEffectEvent = ng;
  function uf(e, n, a, l) {
    n = e.memoizedState, a = a(l, n), a = a == null ? n : p({}, n, a), e.memoizedState = a, e.lanes === 0 && (e.updateQueue.baseState = a);
  }
  var cf = {
    enqueueSetState: function(e, n, a) {
      e = e._reactInternals;
      var l = Wt(), f = _i(l);
      f.payload = n, a != null && (f.callback = a), n = Ni(e, f, l), n !== null && (Yt(n, e, l), lr(n, e, l));
    },
    enqueueReplaceState: function(e, n, a) {
      e = e._reactInternals;
      var l = Wt(), f = _i(l);
      f.tag = 1, f.payload = n, a != null && (f.callback = a), n = Ni(e, f, l), n !== null && (Yt(n, e, l), lr(n, e, l));
    },
    enqueueForceUpdate: function(e, n) {
      e = e._reactInternals;
      var a = Wt(), l = _i(a);
      l.tag = 2, n != null && (l.callback = n), n = Ni(e, l, a), n !== null && (Yt(n, e, a), lr(n, e, a));
    }
  };
  function xg(e, n, a, l, f, h, w) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, h, w) : n.prototype && n.prototype.isPureReactComponent ? !Po(a, l) || !Po(f, h) : !0;
  }
  function Sg(e, n, a, l) {
    e = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(a, l), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(a, l), n.state !== e && cf.enqueueReplaceState(n, n.state, null);
  }
  function ua(e, n) {
    var a = n;
    if ("ref" in n) {
      a = {};
      for (var l in n)
        l !== "ref" && (a[l] = n[l]);
    }
    if (e = e.defaultProps) {
      a === n && (a = p({}, a));
      for (var f in e)
        a[f] === void 0 && (a[f] = e[f]);
    }
    return a;
  }
  function wg(e) {
    Ul(e);
  }
  function Eg(e) {
    console.error(e);
  }
  function _g(e) {
    Ul(e);
  }
  function cs(e, n) {
    try {
      var a = e.onUncaughtError;
      a(n.value, { componentStack: n.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function Ng(e, n, a) {
    try {
      var l = e.onCaughtError;
      l(a.value, {
        componentStack: a.stack,
        errorBoundary: n.tag === 1 ? n.stateNode : null
      });
    } catch (f) {
      setTimeout(function() {
        throw f;
      });
    }
  }
  function ff(e, n, a) {
    return a = _i(a), a.tag = 3, a.payload = { element: null }, a.callback = function() {
      cs(e, n);
    }, a;
  }
  function Cg(e) {
    return e = _i(e), e.tag = 3, e;
  }
  function Mg(e, n, a, l) {
    var f = a.type.getDerivedStateFromError;
    if (typeof f == "function") {
      var h = l.value;
      e.payload = function() {
        return f(h);
      }, e.callback = function() {
        Ng(n, a, l);
      };
    }
    var w = a.stateNode;
    w !== null && typeof w.componentDidCatch == "function" && (e.callback = function() {
      Ng(n, a, l), typeof f != "function" && (Di === null ? Di = /* @__PURE__ */ new Set([this]) : Di.add(this));
      var R = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: R !== null ? R : ""
      });
    });
  }
  function P1(e, n, a, l, f) {
    if (a.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (n = a.alternate, n !== null && Ka(
        n,
        a,
        f,
        !0
      ), a = Zt.current, a !== null) {
        switch (a.tag) {
          case 31:
          case 13:
            return sn === null ? ws() : a.alternate === null && lt === 0 && (lt = 3), a.flags &= -257, a.flags |= 65536, a.lanes = f, l === Wl ? a.flags |= 16384 : (n = a.updateQueue, n === null ? a.updateQueue = /* @__PURE__ */ new Set([l]) : n.add(l), Hf(e, l, f)), !1;
          case 22:
            return a.flags |= 65536, l === Wl ? a.flags |= 16384 : (n = a.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, a.updateQueue = n) : (a = n.retryQueue, a === null ? n.retryQueue = /* @__PURE__ */ new Set([l]) : a.add(l)), Hf(e, l, f)), !1;
        }
        throw Error(r(435, a.tag));
      }
      return Hf(e, l, f), ws(), !1;
    }
    if (Le)
      return n = Zt.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = f, l !== Ac && (e = Error(r(422), { cause: l }), nr(an(e, a)))) : (l !== Ac && (n = Error(r(423), {
        cause: l
      }), nr(
        an(n, a)
      )), e = e.current.alternate, e.flags |= 65536, f &= -f, e.lanes |= f, l = an(l, a), f = ff(
        e.stateNode,
        l,
        f
      ), Vc(e, f), lt !== 4 && (lt = 2)), !1;
    var h = Error(r(520), { cause: l });
    if (h = an(h, a), Sr === null ? Sr = [h] : Sr.push(h), lt !== 4 && (lt = 2), n === null) return !0;
    l = an(l, a), a = n;
    do {
      switch (a.tag) {
        case 3:
          return a.flags |= 65536, e = f & -f, a.lanes |= e, e = ff(a.stateNode, l, e), Vc(a, e), !1;
        case 1:
          if (n = a.type, h = a.stateNode, (a.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || h !== null && typeof h.componentDidCatch == "function" && (Di === null || !Di.has(h))))
            return a.flags |= 65536, f &= -f, a.lanes |= f, f = Cg(f), Mg(
              f,
              e,
              a,
              l
            ), Vc(a, f), !1;
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var df = Error(r(461)), mt = !1;
  function Nt(e, n, a, l) {
    n.child = e === null ? Dm(n, null, a, l) : la(
      n,
      e.child,
      a,
      l
    );
  }
  function Tg(e, n, a, l, f) {
    a = a.render;
    var h = n.ref;
    if ("ref" in l) {
      var w = {};
      for (var R in l)
        R !== "ref" && (w[R] = l[R]);
    } else w = l;
    return ia(n), l = Gc(
      e,
      n,
      a,
      w,
      h,
      f
    ), R = Zc(), e !== null && !mt ? (Kc(e, n, f), Fn(e, n, f)) : (Le && R && Mc(n), n.flags |= 1, Nt(e, n, l, f), n.child);
  }
  function Ag(e, n, a, l, f) {
    if (e === null) {
      var h = a.type;
      return typeof h == "function" && !_c(h) && h.defaultProps === void 0 && a.compare === null ? (n.tag = 15, n.type = h, jg(
        e,
        n,
        h,
        l,
        f
      )) : (e = Xl(
        a.type,
        null,
        l,
        n,
        n.mode,
        f
      ), e.ref = n.ref, e.return = n, n.child = e);
    }
    if (h = e.child, !xf(e, f)) {
      var w = h.memoizedProps;
      if (a = a.compare, a = a !== null ? a : Po, a(w, l) && e.ref === n.ref)
        return Fn(e, n, f);
    }
    return n.flags |= 1, e = $n(h, l), e.ref = n.ref, e.return = n, n.child = e;
  }
  function jg(e, n, a, l, f) {
    if (e !== null) {
      var h = e.memoizedProps;
      if (Po(h, l) && e.ref === n.ref)
        if (mt = !1, n.pendingProps = l = h, xf(e, f))
          (e.flags & 131072) !== 0 && (mt = !0);
        else
          return n.lanes = e.lanes, Fn(e, n, f);
    }
    return hf(
      e,
      n,
      a,
      l,
      f
    );
  }
  function Dg(e, n, a, l) {
    var f = l.children, h = e !== null ? e.memoizedState : null;
    if (e === null && n.stateNode === null && (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.mode === "hidden") {
      if ((n.flags & 128) !== 0) {
        if (h = h !== null ? h.baseLanes | a : a, e !== null) {
          for (l = n.child = e.child, f = 0; l !== null; )
            f = f | l.lanes | l.childLanes, l = l.sibling;
          l = f & ~h;
        } else l = 0, n.child = null;
        return Og(
          e,
          n,
          h,
          a,
          l
        );
      }
      if ((a & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Ql(
          n,
          h !== null ? h.cachePool : null
        ), h !== null ? Rm(n, h) : Yc(), km(n);
      else
        return l = n.lanes = 536870912, Og(
          e,
          n,
          h !== null ? h.baseLanes | a : a,
          a,
          l
        );
    } else
      h !== null ? (Ql(n, h.cachePool), Rm(n, h), Mi(), n.memoizedState = null) : (e !== null && Ql(n, null), Yc(), Mi());
    return Nt(e, n, f, a), n.child;
  }
  function mr(e, n) {
    return e !== null && e.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function Og(e, n, a, l, f) {
    var h = Hc();
    return h = h === null ? null : { parent: dt._currentValue, pool: h }, n.memoizedState = {
      baseLanes: a,
      cachePool: h
    }, e !== null && Ql(n, null), Yc(), km(n), e !== null && Ka(e, n, l, !0), n.childLanes = f, null;
  }
  function fs(e, n) {
    return n = hs(
      { mode: n.mode, children: n.children },
      e.mode
    ), n.ref = e.ref, e.child = n, n.return = e, n;
  }
  function zg(e, n, a) {
    return la(n, e.child, null, a), e = fs(n, n.pendingProps), e.flags |= 2, Kt(n), n.memoizedState = null, e;
  }
  function eS(e, n, a) {
    var l = n.pendingProps, f = (n.flags & 128) !== 0;
    if (n.flags &= -129, e === null) {
      if (Le) {
        if (l.mode === "hidden")
          return e = fs(n, l), n.lanes = 536870912, mr(null, e);
        if ($c(n), (e = Je) ? (e = Xp(
          e,
          ln
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: bi !== null ? { id: An, overflow: jn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = pm(e), a.return = n, n.child = a, Et = n, Je = null)) : e = null, e === null) throw Si(n);
        return n.lanes = 536870912, null;
      }
      return fs(n, l);
    }
    var h = e.memoizedState;
    if (h !== null) {
      var w = h.dehydrated;
      if ($c(n), f)
        if (n.flags & 256)
          n.flags &= -257, n = zg(
            e,
            n,
            a
          );
        else if (n.memoizedState !== null)
          n.child = e.child, n.flags |= 128, n = null;
        else throw Error(r(558));
      else if (mt || Ka(e, n, a, !1), f = (a & e.childLanes) !== 0, mt || f) {
        if (l = We, l !== null && (w = _l(l, a), w !== 0 && w !== h.retryLane))
          throw h.retryLane = w, Pi(e, w), Yt(l, e, w), df;
        ws(), n = zg(
          e,
          n,
          a
        );
      } else
        e = h.treeContext, Je = un(w.nextSibling), Et = n, Le = !0, xi = null, ln = !1, e !== null && bm(n, e), n = fs(n, l), n.flags |= 4096;
      return n;
    }
    return e = $n(e.child, {
      mode: l.mode,
      children: l.children
    }), e.ref = n.ref, n.child = e, e.return = n, e;
  }
  function ds(e, n) {
    var a = n.ref;
    if (a === null)
      e !== null && e.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof a != "function" && typeof a != "object")
        throw Error(r(284));
      (e === null || e.ref !== a) && (n.flags |= 4194816);
    }
  }
  function hf(e, n, a, l, f) {
    return ia(n), a = Gc(
      e,
      n,
      a,
      l,
      void 0,
      f
    ), l = Zc(), e !== null && !mt ? (Kc(e, n, f), Fn(e, n, f)) : (Le && l && Mc(n), n.flags |= 1, Nt(e, n, a, f), n.child);
  }
  function Rg(e, n, a, l, f, h) {
    return ia(n), n.updateQueue = null, a = Lm(
      n,
      l,
      a,
      f
    ), Hm(e), l = Zc(), e !== null && !mt ? (Kc(e, n, h), Fn(e, n, h)) : (Le && l && Mc(n), n.flags |= 1, Nt(e, n, a, h), n.child);
  }
  function kg(e, n, a, l, f) {
    if (ia(n), n.stateNode === null) {
      var h = $a, w = a.contextType;
      typeof w == "object" && w !== null && (h = _t(w)), h = new a(l, h), n.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null, h.updater = cf, n.stateNode = h, h._reactInternals = n, h = n.stateNode, h.props = l, h.state = n.memoizedState, h.refs = {}, Bc(n), w = a.contextType, h.context = typeof w == "object" && w !== null ? _t(w) : $a, h.state = n.memoizedState, w = a.getDerivedStateFromProps, typeof w == "function" && (uf(
        n,
        a,
        w,
        l
      ), h.state = n.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof h.getSnapshotBeforeUpdate == "function" || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (w = h.state, typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount(), w !== h.state && cf.enqueueReplaceState(h, h.state, null), ur(n, l, h, f), sr(), h.state = n.memoizedState), typeof h.componentDidMount == "function" && (n.flags |= 4194308), l = !0;
    } else if (e === null) {
      h = n.stateNode;
      var R = n.memoizedProps, P = ua(a, R);
      h.props = P;
      var re = h.context, ce = a.contextType;
      w = $a, typeof ce == "object" && ce !== null && (w = _t(ce));
      var me = a.getDerivedStateFromProps;
      ce = typeof me == "function" || typeof h.getSnapshotBeforeUpdate == "function", R = n.pendingProps !== R, ce || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (R || re !== w) && Sg(
        n,
        h,
        l,
        w
      ), Ei = !1;
      var le = n.memoizedState;
      h.state = le, ur(n, l, h, f), sr(), re = n.memoizedState, R || le !== re || Ei ? (typeof me == "function" && (uf(
        n,
        a,
        me,
        l
      ), re = n.memoizedState), (P = Ei || xg(
        n,
        a,
        P,
        l,
        le,
        re,
        w
      )) ? (ce || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount()), typeof h.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = l, n.memoizedState = re), h.props = l, h.state = re, h.context = w, l = P) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), l = !1);
    } else {
      h = n.stateNode, Ic(e, n), w = n.memoizedProps, ce = ua(a, w), h.props = ce, me = n.pendingProps, le = h.context, re = a.contextType, P = $a, typeof re == "object" && re !== null && (P = _t(re)), R = a.getDerivedStateFromProps, (re = typeof R == "function" || typeof h.getSnapshotBeforeUpdate == "function") || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (w !== me || le !== P) && Sg(
        n,
        h,
        l,
        P
      ), Ei = !1, le = n.memoizedState, h.state = le, ur(n, l, h, f), sr();
      var ue = n.memoizedState;
      w !== me || le !== ue || Ei || e !== null && e.dependencies !== null && Zl(e.dependencies) ? (typeof R == "function" && (uf(
        n,
        a,
        R,
        l
      ), ue = n.memoizedState), (ce = Ei || xg(
        n,
        a,
        ce,
        l,
        le,
        ue,
        P
      ) || e !== null && e.dependencies !== null && Zl(e.dependencies)) ? (re || typeof h.UNSAFE_componentWillUpdate != "function" && typeof h.componentWillUpdate != "function" || (typeof h.componentWillUpdate == "function" && h.componentWillUpdate(l, ue, P), typeof h.UNSAFE_componentWillUpdate == "function" && h.UNSAFE_componentWillUpdate(
        l,
        ue,
        P
      )), typeof h.componentDidUpdate == "function" && (n.flags |= 4), typeof h.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof h.componentDidUpdate != "function" || w === e.memoizedProps && le === e.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || w === e.memoizedProps && le === e.memoizedState || (n.flags |= 1024), n.memoizedProps = l, n.memoizedState = ue), h.props = l, h.state = ue, h.context = P, l = ce) : (typeof h.componentDidUpdate != "function" || w === e.memoizedProps && le === e.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || w === e.memoizedProps && le === e.memoizedState || (n.flags |= 1024), l = !1);
    }
    return h = l, ds(e, n), l = (n.flags & 128) !== 0, h || l ? (h = n.stateNode, a = l && typeof a.getDerivedStateFromError != "function" ? null : h.render(), n.flags |= 1, e !== null && l ? (n.child = la(
      n,
      e.child,
      null,
      f
    ), n.child = la(
      n,
      null,
      a,
      f
    )) : Nt(e, n, a, f), n.memoizedState = h.state, e = n.child) : e = Fn(
      e,
      n,
      f
    ), e;
  }
  function Hg(e, n, a, l) {
    return ta(), n.flags |= 256, Nt(e, n, a, l), n.child;
  }
  var mf = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function gf(e) {
    return { baseLanes: e, cachePool: Nm() };
  }
  function pf(e, n, a) {
    return e = e !== null ? e.childLanes & ~a : 0, n && (e |= Ft), e;
  }
  function Lg(e, n, a) {
    var l = n.pendingProps, f = !1, h = (n.flags & 128) !== 0, w;
    if ((w = h) || (w = e !== null && e.memoizedState === null ? !1 : (st.current & 2) !== 0), w && (f = !0, n.flags &= -129), w = (n.flags & 32) !== 0, n.flags &= -33, e === null) {
      if (Le) {
        if (f ? Ci(n) : Mi(), (e = Je) ? (e = Xp(
          e,
          ln
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: bi !== null ? { id: An, overflow: jn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = pm(e), a.return = n, n.child = a, Et = n, Je = null)) : e = null, e === null) throw Si(n);
        return Jf(e) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var R = l.children;
      return l = l.fallback, f ? (Mi(), f = n.mode, R = hs(
        { mode: "hidden", children: R },
        f
      ), l = ea(
        l,
        f,
        a,
        null
      ), R.return = n, l.return = n, R.sibling = l, n.child = R, l = n.child, l.memoizedState = gf(a), l.childLanes = pf(
        e,
        w,
        a
      ), n.memoizedState = mf, mr(null, l)) : (Ci(n), yf(n, R));
    }
    var P = e.memoizedState;
    if (P !== null && (R = P.dehydrated, R !== null)) {
      if (h)
        n.flags & 256 ? (Ci(n), n.flags &= -257, n = vf(
          e,
          n,
          a
        )) : n.memoizedState !== null ? (Mi(), n.child = e.child, n.flags |= 128, n = null) : (Mi(), R = l.fallback, f = n.mode, l = hs(
          { mode: "visible", children: l.children },
          f
        ), R = ea(
          R,
          f,
          a,
          null
        ), R.flags |= 2, l.return = n, R.return = n, l.sibling = R, n.child = l, la(
          n,
          e.child,
          null,
          a
        ), l = n.child, l.memoizedState = gf(a), l.childLanes = pf(
          e,
          w,
          a
        ), n.memoizedState = mf, n = mr(null, l));
      else if (Ci(n), Jf(R)) {
        if (w = R.nextSibling && R.nextSibling.dataset, w) var re = w.dgst;
        w = re, l = Error(r(419)), l.stack = "", l.digest = w, nr({ value: l, source: null, stack: null }), n = vf(
          e,
          n,
          a
        );
      } else if (mt || Ka(e, n, a, !1), w = (a & e.childLanes) !== 0, mt || w) {
        if (w = We, w !== null && (l = _l(w, a), l !== 0 && l !== P.retryLane))
          throw P.retryLane = l, Pi(e, l), Yt(w, e, l), df;
        Wf(R) || ws(), n = vf(
          e,
          n,
          a
        );
      } else
        Wf(R) ? (n.flags |= 192, n.child = e.child, n = null) : (e = P.treeContext, Je = un(
          R.nextSibling
        ), Et = n, Le = !0, xi = null, ln = !1, e !== null && bm(n, e), n = yf(
          n,
          l.children
        ), n.flags |= 4096);
      return n;
    }
    return f ? (Mi(), R = l.fallback, f = n.mode, P = e.child, re = P.sibling, l = $n(P, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = P.subtreeFlags & 65011712, re !== null ? R = $n(
      re,
      R
    ) : (R = ea(
      R,
      f,
      a,
      null
    ), R.flags |= 2), R.return = n, l.return = n, l.sibling = R, n.child = l, mr(null, l), l = n.child, R = e.child.memoizedState, R === null ? R = gf(a) : (f = R.cachePool, f !== null ? (P = dt._currentValue, f = f.parent !== P ? { parent: P, pool: P } : f) : f = Nm(), R = {
      baseLanes: R.baseLanes | a,
      cachePool: f
    }), l.memoizedState = R, l.childLanes = pf(
      e,
      w,
      a
    ), n.memoizedState = mf, mr(e.child, l)) : (Ci(n), a = e.child, e = a.sibling, a = $n(a, {
      mode: "visible",
      children: l.children
    }), a.return = n, a.sibling = null, e !== null && (w = n.deletions, w === null ? (n.deletions = [e], n.flags |= 16) : w.push(e)), n.child = a, n.memoizedState = null, a);
  }
  function yf(e, n) {
    return n = hs(
      { mode: "visible", children: n },
      e.mode
    ), n.return = e, e.child = n;
  }
  function hs(e, n) {
    return e = Gt(22, e, null, n), e.lanes = 0, e;
  }
  function vf(e, n, a) {
    return la(n, e.child, null, a), e = yf(
      n,
      n.pendingProps.children
    ), e.flags |= 2, n.memoizedState = null, e;
  }
  function Bg(e, n, a) {
    e.lanes |= n;
    var l = e.alternate;
    l !== null && (l.lanes |= n), Oc(e.return, n, a);
  }
  function bf(e, n, a, l, f, h) {
    var w = e.memoizedState;
    w === null ? e.memoizedState = {
      isBackwards: n,
      rendering: null,
      renderingStartTime: 0,
      last: l,
      tail: a,
      tailMode: f,
      treeForkCount: h
    } : (w.isBackwards = n, w.rendering = null, w.renderingStartTime = 0, w.last = l, w.tail = a, w.tailMode = f, w.treeForkCount = h);
  }
  function Ig(e, n, a) {
    var l = n.pendingProps, f = l.revealOrder, h = l.tail;
    l = l.children;
    var w = st.current, R = (w & 2) !== 0;
    if (R ? (w = w & 1 | 2, n.flags |= 128) : w &= 1, ne(st, w), Nt(e, n, l, a), l = Le ? tr : 0, !R && e !== null && (e.flags & 128) !== 0)
      e: for (e = n.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Bg(e, a, n);
        else if (e.tag === 19)
          Bg(e, a, n);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === n) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === n)
            break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    switch (f) {
      case "forwards":
        for (a = n.child, f = null; a !== null; )
          e = a.alternate, e !== null && ts(e) === null && (f = a), a = a.sibling;
        a = f, a === null ? (f = n.child, n.child = null) : (f = a.sibling, a.sibling = null), bf(
          n,
          !1,
          f,
          a,
          h,
          l
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (a = null, f = n.child, n.child = null; f !== null; ) {
          if (e = f.alternate, e !== null && ts(e) === null) {
            n.child = f;
            break;
          }
          e = f.sibling, f.sibling = a, a = f, f = e;
        }
        bf(
          n,
          !0,
          a,
          null,
          h,
          l
        );
        break;
      case "together":
        bf(
          n,
          !1,
          null,
          null,
          void 0,
          l
        );
        break;
      default:
        n.memoizedState = null;
    }
    return n.child;
  }
  function Fn(e, n, a) {
    if (e !== null && (n.dependencies = e.dependencies), ji |= n.lanes, (a & n.childLanes) === 0)
      if (e !== null) {
        if (Ka(
          e,
          n,
          a,
          !1
        ), (a & n.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && n.child !== e.child)
      throw Error(r(153));
    if (n.child !== null) {
      for (e = n.child, a = $n(e, e.pendingProps), n.child = a, a.return = n; e.sibling !== null; )
        e = e.sibling, a = a.sibling = $n(e, e.pendingProps), a.return = n;
      a.sibling = null;
    }
    return n.child;
  }
  function xf(e, n) {
    return (e.lanes & n) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Zl(e)));
  }
  function tS(e, n, a) {
    switch (n.tag) {
      case 3:
        K(n, n.stateNode.containerInfo), wi(n, dt, e.memoizedState.cache), ta();
        break;
      case 27:
      case 5:
        se(n);
        break;
      case 4:
        K(n, n.stateNode.containerInfo);
        break;
      case 10:
        wi(
          n,
          n.type,
          n.memoizedProps.value
        );
        break;
      case 31:
        if (n.memoizedState !== null)
          return n.flags |= 128, $c(n), null;
        break;
      case 13:
        var l = n.memoizedState;
        if (l !== null)
          return l.dehydrated !== null ? (Ci(n), n.flags |= 128, null) : (a & n.child.childLanes) !== 0 ? Lg(e, n, a) : (Ci(n), e = Fn(
            e,
            n,
            a
          ), e !== null ? e.sibling : null);
        Ci(n);
        break;
      case 19:
        var f = (e.flags & 128) !== 0;
        if (l = (a & n.childLanes) !== 0, l || (Ka(
          e,
          n,
          a,
          !1
        ), l = (a & n.childLanes) !== 0), f) {
          if (l)
            return Ig(
              e,
              n,
              a
            );
          n.flags |= 128;
        }
        if (f = n.memoizedState, f !== null && (f.rendering = null, f.tail = null, f.lastEffect = null), ne(st, st.current), l) break;
        return null;
      case 22:
        return n.lanes = 0, Dg(
          e,
          n,
          a,
          n.pendingProps
        );
      case 24:
        wi(n, dt, e.memoizedState.cache);
    }
    return Fn(e, n, a);
  }
  function Vg(e, n, a) {
    if (e !== null)
      if (e.memoizedProps !== n.pendingProps)
        mt = !0;
      else {
        if (!xf(e, a) && (n.flags & 128) === 0)
          return mt = !1, tS(
            e,
            n,
            a
          );
        mt = (e.flags & 131072) !== 0;
      }
    else
      mt = !1, Le && (n.flags & 1048576) !== 0 && vm(n, tr, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          var l = n.pendingProps;
          if (e = oa(n.elementType), n.type = e, typeof e == "function")
            _c(e) ? (l = ua(e, l), n.tag = 1, n = kg(
              null,
              n,
              e,
              l,
              a
            )) : (n.tag = 0, n = hf(
              null,
              n,
              e,
              l,
              a
            ));
          else {
            if (e != null) {
              var f = e.$$typeof;
              if (f === C) {
                n.tag = 11, n = Tg(
                  null,
                  n,
                  e,
                  l,
                  a
                );
                break e;
              } else if (f === H) {
                n.tag = 14, n = Ag(
                  null,
                  n,
                  e,
                  l,
                  a
                );
                break e;
              }
            }
            throw n = j(e) || e, Error(r(306, n, ""));
          }
        }
        return n;
      case 0:
        return hf(
          e,
          n,
          n.type,
          n.pendingProps,
          a
        );
      case 1:
        return l = n.type, f = ua(
          l,
          n.pendingProps
        ), kg(
          e,
          n,
          l,
          f,
          a
        );
      case 3:
        e: {
          if (K(
            n,
            n.stateNode.containerInfo
          ), e === null) throw Error(r(387));
          l = n.pendingProps;
          var h = n.memoizedState;
          f = h.element, Ic(e, n), ur(n, l, null, a);
          var w = n.memoizedState;
          if (l = w.cache, wi(n, dt, l), l !== h.cache && zc(
            n,
            [dt],
            a,
            !0
          ), sr(), l = w.element, h.isDehydrated)
            if (h = {
              element: l,
              isDehydrated: !1,
              cache: w.cache
            }, n.updateQueue.baseState = h, n.memoizedState = h, n.flags & 256) {
              n = Hg(
                e,
                n,
                l,
                a
              );
              break e;
            } else if (l !== f) {
              f = an(
                Error(r(424)),
                n
              ), nr(f), n = Hg(
                e,
                n,
                l,
                a
              );
              break e;
            } else
              for (e = n.stateNode.containerInfo, e.nodeType === 9 ? e = e.body : e = e.nodeName === "HTML" ? e.ownerDocument.body : e, Je = un(e.firstChild), Et = n, Le = !0, xi = null, ln = !0, a = Dm(
                n,
                null,
                l,
                a
              ), n.child = a; a; )
                a.flags = a.flags & -3 | 4096, a = a.sibling;
          else {
            if (ta(), l === f) {
              n = Fn(
                e,
                n,
                a
              );
              break e;
            }
            Nt(e, n, l, a);
          }
          n = n.child;
        }
        return n;
      case 26:
        return ds(e, n), e === null ? (a = Wp(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = a : Le || (a = n.type, e = n.pendingProps, l = As(
          U.current
        ).createElement(a), l[vt] = n, l[Mt] = e, Ct(l, a, e), ft(l), n.stateNode = l) : n.memoizedState = Wp(
          n.type,
          e.memoizedProps,
          n.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return se(n), e === null && Le && (l = n.stateNode = Kp(
          n.type,
          n.pendingProps,
          U.current
        ), Et = n, ln = !0, f = Je, ki(n.type) ? (Pf = f, Je = un(l.firstChild)) : Je = f), Nt(
          e,
          n,
          n.pendingProps.children,
          a
        ), ds(e, n), e === null && (n.flags |= 4194304), n.child;
      case 5:
        return e === null && Le && ((f = l = Je) && (l = DS(
          l,
          n.type,
          n.pendingProps,
          ln
        ), l !== null ? (n.stateNode = l, Et = n, Je = un(l.firstChild), ln = !1, f = !0) : f = !1), f || Si(n)), se(n), f = n.type, h = n.pendingProps, w = e !== null ? e.memoizedProps : null, l = h.children, Kf(f, h) ? l = null : w !== null && Kf(f, w) && (n.flags |= 32), n.memoizedState !== null && (f = Gc(
          e,
          n,
          G1,
          null,
          null,
          a
        ), Ar._currentValue = f), ds(e, n), Nt(e, n, l, a), n.child;
      case 6:
        return e === null && Le && ((e = a = Je) && (a = OS(
          a,
          n.pendingProps,
          ln
        ), a !== null ? (n.stateNode = a, Et = n, Je = null, e = !0) : e = !1), e || Si(n)), null;
      case 13:
        return Lg(e, n, a);
      case 4:
        return K(
          n,
          n.stateNode.containerInfo
        ), l = n.pendingProps, e === null ? n.child = la(
          n,
          null,
          l,
          a
        ) : Nt(e, n, l, a), n.child;
      case 11:
        return Tg(
          e,
          n,
          n.type,
          n.pendingProps,
          a
        );
      case 7:
        return Nt(
          e,
          n,
          n.pendingProps,
          a
        ), n.child;
      case 8:
        return Nt(
          e,
          n,
          n.pendingProps.children,
          a
        ), n.child;
      case 12:
        return Nt(
          e,
          n,
          n.pendingProps.children,
          a
        ), n.child;
      case 10:
        return l = n.pendingProps, wi(n, n.type, l.value), Nt(e, n, l.children, a), n.child;
      case 9:
        return f = n.type._context, l = n.pendingProps.children, ia(n), f = _t(f), l = l(f), n.flags |= 1, Nt(e, n, l, a), n.child;
      case 14:
        return Ag(
          e,
          n,
          n.type,
          n.pendingProps,
          a
        );
      case 15:
        return jg(
          e,
          n,
          n.type,
          n.pendingProps,
          a
        );
      case 19:
        return Ig(e, n, a);
      case 31:
        return eS(e, n, a);
      case 22:
        return Dg(
          e,
          n,
          a,
          n.pendingProps
        );
      case 24:
        return ia(n), l = _t(dt), e === null ? (f = Hc(), f === null && (f = We, h = Rc(), f.pooledCache = h, h.refCount++, h !== null && (f.pooledCacheLanes |= a), f = h), n.memoizedState = { parent: l, cache: f }, Bc(n), wi(n, dt, f)) : ((e.lanes & a) !== 0 && (Ic(e, n), ur(n, null, null, a), sr()), f = e.memoizedState, h = n.memoizedState, f.parent !== l ? (f = { parent: l, cache: l }, n.memoizedState = f, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = f), wi(n, dt, l)) : (l = h.cache, wi(n, dt, l), l !== f.cache && zc(
          n,
          [dt],
          a,
          !0
        ))), Nt(
          e,
          n,
          n.pendingProps.children,
          a
        ), n.child;
      case 29:
        throw n.pendingProps;
    }
    throw Error(r(156, n.tag));
  }
  function Wn(e) {
    e.flags |= 4;
  }
  function Sf(e, n, a, l, f) {
    if ((n = (e.mode & 32) !== 0) && (n = !1), n) {
      if (e.flags |= 16777216, (f & 335544128) === f)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (hp()) e.flags |= 8192;
        else
          throw ra = Wl, Lc;
    } else e.flags &= -16777217;
  }
  function Ug(e, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !ny(n))
      if (hp()) e.flags |= 8192;
      else
        throw ra = Wl, Lc;
  }
  function ms(e, n) {
    n !== null && (e.flags |= 4), e.flags & 16384 && (n = e.tag !== 22 ? Sl() : 536870912, e.lanes |= n, ro |= n);
  }
  function gr(e, n) {
    if (!Le)
      switch (e.tailMode) {
        case "hidden":
          n = e.tail;
          for (var a = null; n !== null; )
            n.alternate !== null && (a = n), n = n.sibling;
          a === null ? e.tail = null : a.sibling = null;
          break;
        case "collapsed":
          a = e.tail;
          for (var l = null; a !== null; )
            a.alternate !== null && (l = a), a = a.sibling;
          l === null ? n || e.tail === null ? e.tail = null : e.tail.sibling = null : l.sibling = null;
      }
  }
  function Pe(e) {
    var n = e.alternate !== null && e.alternate.child === e.child, a = 0, l = 0;
    if (n)
      for (var f = e.child; f !== null; )
        a |= f.lanes | f.childLanes, l |= f.subtreeFlags & 65011712, l |= f.flags & 65011712, f.return = e, f = f.sibling;
    else
      for (f = e.child; f !== null; )
        a |= f.lanes | f.childLanes, l |= f.subtreeFlags, l |= f.flags, f.return = e, f = f.sibling;
    return e.subtreeFlags |= l, e.childLanes = a, n;
  }
  function nS(e, n, a) {
    var l = n.pendingProps;
    switch (Tc(n), n.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Pe(n), null;
      case 1:
        return Pe(n), null;
      case 3:
        return a = n.stateNode, l = null, e !== null && (l = e.memoizedState.cache), n.memoizedState.cache !== l && (n.flags |= 2048), Zn(dt), Z(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (e === null || e.child === null) && (Za(n) ? Wn(n) : e === null || e.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, jc())), Pe(n), null;
      case 26:
        var f = n.type, h = n.memoizedState;
        return e === null ? (Wn(n), h !== null ? (Pe(n), Ug(n, h)) : (Pe(n), Sf(
          n,
          f,
          null,
          l,
          a
        ))) : h ? h !== e.memoizedState ? (Wn(n), Pe(n), Ug(n, h)) : (Pe(n), n.flags &= -16777217) : (e = e.memoizedProps, e !== l && Wn(n), Pe(n), Sf(
          n,
          f,
          e,
          l,
          a
        )), null;
      case 27:
        if (he(n), a = U.current, f = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== l && Wn(n);
        else {
          if (!l) {
            if (n.stateNode === null)
              throw Error(r(166));
            return Pe(n), null;
          }
          e = B.current, Za(n) ? xm(n) : (e = Kp(f, l, a), n.stateNode = e, Wn(n));
        }
        return Pe(n), null;
      case 5:
        if (he(n), f = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== l && Wn(n);
        else {
          if (!l) {
            if (n.stateNode === null)
              throw Error(r(166));
            return Pe(n), null;
          }
          if (h = B.current, Za(n))
            xm(n);
          else {
            var w = As(
              U.current
            );
            switch (h) {
              case 1:
                h = w.createElementNS(
                  "http://www.w3.org/2000/svg",
                  f
                );
                break;
              case 2:
                h = w.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  f
                );
                break;
              default:
                switch (f) {
                  case "svg":
                    h = w.createElementNS(
                      "http://www.w3.org/2000/svg",
                      f
                    );
                    break;
                  case "math":
                    h = w.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      f
                    );
                    break;
                  case "script":
                    h = w.createElement("div"), h.innerHTML = "<script><\/script>", h = h.removeChild(
                      h.firstChild
                    );
                    break;
                  case "select":
                    h = typeof l.is == "string" ? w.createElement("select", {
                      is: l.is
                    }) : w.createElement("select"), l.multiple ? h.multiple = !0 : l.size && (h.size = l.size);
                    break;
                  default:
                    h = typeof l.is == "string" ? w.createElement(f, { is: l.is }) : w.createElement(f);
                }
            }
            h[vt] = n, h[Mt] = l;
            e: for (w = n.child; w !== null; ) {
              if (w.tag === 5 || w.tag === 6)
                h.appendChild(w.stateNode);
              else if (w.tag !== 4 && w.tag !== 27 && w.child !== null) {
                w.child.return = w, w = w.child;
                continue;
              }
              if (w === n) break e;
              for (; w.sibling === null; ) {
                if (w.return === null || w.return === n)
                  break e;
                w = w.return;
              }
              w.sibling.return = w.return, w = w.sibling;
            }
            n.stateNode = h;
            e: switch (Ct(h, f, l), f) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                l = !!l.autoFocus;
                break e;
              case "img":
                l = !0;
                break e;
              default:
                l = !1;
            }
            l && Wn(n);
          }
        }
        return Pe(n), Sf(
          n,
          n.type,
          e === null ? null : e.memoizedProps,
          n.pendingProps,
          a
        ), null;
      case 6:
        if (e && n.stateNode != null)
          e.memoizedProps !== l && Wn(n);
        else {
          if (typeof l != "string" && n.stateNode === null)
            throw Error(r(166));
          if (e = U.current, Za(n)) {
            if (e = n.stateNode, a = n.memoizedProps, l = null, f = Et, f !== null)
              switch (f.tag) {
                case 27:
                case 5:
                  l = f.memoizedProps;
              }
            e[vt] = n, e = !!(e.nodeValue === a || l !== null && l.suppressHydrationWarning === !0 || Lp(e.nodeValue, a)), e || Si(n, !0);
          } else
            e = As(e).createTextNode(
              l
            ), e[vt] = n, n.stateNode = e;
        }
        return Pe(n), null;
      case 31:
        if (a = n.memoizedState, e === null || e.memoizedState !== null) {
          if (l = Za(n), a !== null) {
            if (e === null) {
              if (!l) throw Error(r(318));
              if (e = n.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(r(557));
              e[vt] = n;
            } else
              ta(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Pe(n), e = !1;
          } else
            a = jc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), e = !0;
          if (!e)
            return n.flags & 256 ? (Kt(n), n) : (Kt(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(r(558));
        }
        return Pe(n), null;
      case 13:
        if (l = n.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (f = Za(n), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!f) throw Error(r(318));
              if (f = n.memoizedState, f = f !== null ? f.dehydrated : null, !f) throw Error(r(317));
              f[vt] = n;
            } else
              ta(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Pe(n), f = !1;
          } else
            f = jc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = f), f = !0;
          if (!f)
            return n.flags & 256 ? (Kt(n), n) : (Kt(n), null);
        }
        return Kt(n), (n.flags & 128) !== 0 ? (n.lanes = a, n) : (a = l !== null, e = e !== null && e.memoizedState !== null, a && (l = n.child, f = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (f = l.alternate.memoizedState.cachePool.pool), h = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (h = l.memoizedState.cachePool.pool), h !== f && (l.flags |= 2048)), a !== e && a && (n.child.flags |= 8192), ms(n, n.updateQueue), Pe(n), null);
      case 4:
        return Z(), e === null && qf(n.stateNode.containerInfo), Pe(n), null;
      case 10:
        return Zn(n.type), Pe(n), null;
      case 19:
        if (V(st), l = n.memoizedState, l === null) return Pe(n), null;
        if (f = (n.flags & 128) !== 0, h = l.rendering, h === null)
          if (f) gr(l, !1);
          else {
            if (lt !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = n.child; e !== null; ) {
                if (h = ts(e), h !== null) {
                  for (n.flags |= 128, gr(l, !1), e = h.updateQueue, n.updateQueue = e, ms(n, e), n.subtreeFlags = 0, e = a, a = n.child; a !== null; )
                    gm(a, e), a = a.sibling;
                  return ne(
                    st,
                    st.current & 1 | 2
                  ), Le && Xn(n, l.treeForkCount), n.child;
                }
                e = e.sibling;
              }
            l.tail !== null && it() > bs && (n.flags |= 128, f = !0, gr(l, !1), n.lanes = 4194304);
          }
        else {
          if (!f)
            if (e = ts(h), e !== null) {
              if (n.flags |= 128, f = !0, e = e.updateQueue, n.updateQueue = e, ms(n, e), gr(l, !0), l.tail === null && l.tailMode === "hidden" && !h.alternate && !Le)
                return Pe(n), null;
            } else
              2 * it() - l.renderingStartTime > bs && a !== 536870912 && (n.flags |= 128, f = !0, gr(l, !1), n.lanes = 4194304);
          l.isBackwards ? (h.sibling = n.child, n.child = h) : (e = l.last, e !== null ? e.sibling = h : n.child = h, l.last = h);
        }
        return l.tail !== null ? (e = l.tail, l.rendering = e, l.tail = e.sibling, l.renderingStartTime = it(), e.sibling = null, a = st.current, ne(
          st,
          f ? a & 1 | 2 : a & 1
        ), Le && Xn(n, l.treeForkCount), e) : (Pe(n), null);
      case 22:
      case 23:
        return Kt(n), qc(), l = n.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (n.flags |= 8192) : l && (n.flags |= 8192), l ? (a & 536870912) !== 0 && (n.flags & 128) === 0 && (Pe(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : Pe(n), a = n.updateQueue, a !== null && ms(n, a.retryQueue), a = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), l = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (l = n.memoizedState.cachePool.pool), l !== a && (n.flags |= 2048), e !== null && V(aa), null;
      case 24:
        return a = null, e !== null && (a = e.memoizedState.cache), n.memoizedState.cache !== a && (n.flags |= 2048), Zn(dt), Pe(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(r(156, n.tag));
  }
  function iS(e, n) {
    switch (Tc(n), n.tag) {
      case 1:
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 3:
        return Zn(dt), Z(), e = n.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (n.flags = e & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return he(n), null;
      case 31:
        if (n.memoizedState !== null) {
          if (Kt(n), n.alternate === null)
            throw Error(r(340));
          ta();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 13:
        if (Kt(n), e = n.memoizedState, e !== null && e.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(r(340));
          ta();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 19:
        return V(st), null;
      case 4:
        return Z(), null;
      case 10:
        return Zn(n.type), null;
      case 22:
      case 23:
        return Kt(n), qc(), e !== null && V(aa), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 24:
        return Zn(dt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Yg(e, n) {
    switch (Tc(n), n.tag) {
      case 3:
        Zn(dt), Z();
        break;
      case 26:
      case 27:
      case 5:
        he(n);
        break;
      case 4:
        Z();
        break;
      case 31:
        n.memoizedState !== null && Kt(n);
        break;
      case 13:
        Kt(n);
        break;
      case 19:
        V(st);
        break;
      case 10:
        Zn(n.type);
        break;
      case 22:
      case 23:
        Kt(n), qc(), e !== null && V(aa);
        break;
      case 24:
        Zn(dt);
    }
  }
  function pr(e, n) {
    try {
      var a = n.updateQueue, l = a !== null ? a.lastEffect : null;
      if (l !== null) {
        var f = l.next;
        a = f;
        do {
          if ((a.tag & e) === e) {
            l = void 0;
            var h = a.create, w = a.inst;
            l = h(), w.destroy = l;
          }
          a = a.next;
        } while (a !== f);
      }
    } catch (R) {
      Ge(n, n.return, R);
    }
  }
  function Ti(e, n, a) {
    try {
      var l = n.updateQueue, f = l !== null ? l.lastEffect : null;
      if (f !== null) {
        var h = f.next;
        l = h;
        do {
          if ((l.tag & e) === e) {
            var w = l.inst, R = w.destroy;
            if (R !== void 0) {
              w.destroy = void 0, f = n;
              var P = a, re = R;
              try {
                re();
              } catch (ce) {
                Ge(
                  f,
                  P,
                  ce
                );
              }
            }
          }
          l = l.next;
        } while (l !== h);
      }
    } catch (ce) {
      Ge(n, n.return, ce);
    }
  }
  function qg(e) {
    var n = e.updateQueue;
    if (n !== null) {
      var a = e.stateNode;
      try {
        zm(n, a);
      } catch (l) {
        Ge(e, e.return, l);
      }
    }
  }
  function $g(e, n, a) {
    a.props = ua(
      e.type,
      e.memoizedProps
    ), a.state = e.memoizedState;
    try {
      a.componentWillUnmount();
    } catch (l) {
      Ge(e, n, l);
    }
  }
  function yr(e, n) {
    try {
      var a = e.ref;
      if (a !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var l = e.stateNode;
            break;
          case 30:
            l = e.stateNode;
            break;
          default:
            l = e.stateNode;
        }
        typeof a == "function" ? e.refCleanup = a(l) : a.current = l;
      }
    } catch (f) {
      Ge(e, n, f);
    }
  }
  function Dn(e, n) {
    var a = e.ref, l = e.refCleanup;
    if (a !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (f) {
          Ge(e, n, f);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof a == "function")
        try {
          a(null);
        } catch (f) {
          Ge(e, n, f);
        }
      else a.current = null;
  }
  function Xg(e) {
    var n = e.type, a = e.memoizedProps, l = e.stateNode;
    try {
      e: switch (n) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && l.focus();
          break e;
        case "img":
          a.src ? l.src = a.src : a.srcSet && (l.srcset = a.srcSet);
      }
    } catch (f) {
      Ge(e, e.return, f);
    }
  }
  function wf(e, n, a) {
    try {
      var l = e.stateNode;
      NS(l, e.type, a, n), l[Mt] = n;
    } catch (f) {
      Ge(e, e.return, f);
    }
  }
  function Gg(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && ki(e.type) || e.tag === 4;
  }
  function Ef(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Gg(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && ki(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function _f(e, n, a) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, n ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(e, n) : (n = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, n.appendChild(e), a = a._reactRootContainer, a != null || n.onclick !== null || (n.onclick = Yn));
    else if (l !== 4 && (l === 27 && ki(e.type) && (a = e.stateNode, n = null), e = e.child, e !== null))
      for (_f(e, n, a), e = e.sibling; e !== null; )
        _f(e, n, a), e = e.sibling;
  }
  function gs(e, n, a) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, n ? a.insertBefore(e, n) : a.appendChild(e);
    else if (l !== 4 && (l === 27 && ki(e.type) && (a = e.stateNode), e = e.child, e !== null))
      for (gs(e, n, a), e = e.sibling; e !== null; )
        gs(e, n, a), e = e.sibling;
  }
  function Zg(e) {
    var n = e.stateNode, a = e.memoizedProps;
    try {
      for (var l = e.type, f = n.attributes; f.length; )
        n.removeAttributeNode(f[0]);
      Ct(n, l, a), n[vt] = e, n[Mt] = a;
    } catch (h) {
      Ge(e, e.return, h);
    }
  }
  var Jn = !1, gt = !1, Nf = !1, Kg = typeof WeakSet == "function" ? WeakSet : Set, wt = null;
  function aS(e, n) {
    if (e = e.containerInfo, Gf = Hs, e = rm(e), yc(e)) {
      if ("selectionStart" in e)
        var a = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          a = (a = e.ownerDocument) && a.defaultView || window;
          var l = a.getSelection && a.getSelection();
          if (l && l.rangeCount !== 0) {
            a = l.anchorNode;
            var f = l.anchorOffset, h = l.focusNode;
            l = l.focusOffset;
            try {
              a.nodeType, h.nodeType;
            } catch {
              a = null;
              break e;
            }
            var w = 0, R = -1, P = -1, re = 0, ce = 0, me = e, le = null;
            t: for (; ; ) {
              for (var ue; me !== a || f !== 0 && me.nodeType !== 3 || (R = w + f), me !== h || l !== 0 && me.nodeType !== 3 || (P = w + l), me.nodeType === 3 && (w += me.nodeValue.length), (ue = me.firstChild) !== null; )
                le = me, me = ue;
              for (; ; ) {
                if (me === e) break t;
                if (le === a && ++re === f && (R = w), le === h && ++ce === l && (P = w), (ue = me.nextSibling) !== null) break;
                me = le, le = me.parentNode;
              }
              me = ue;
            }
            a = R === -1 || P === -1 ? null : { start: R, end: P };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (Zf = { focusedElem: e, selectionRange: a }, Hs = !1, wt = n; wt !== null; )
      if (n = wt, e = n.child, (n.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = n, wt = e;
      else
        for (; wt !== null; ) {
          switch (n = wt, h = n.alternate, e = n.flags, n.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = n.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (a = 0; a < e.length; a++)
                  f = e[a], f.ref.impl = f.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && h !== null) {
                e = void 0, a = n, f = h.memoizedProps, h = h.memoizedState, l = a.stateNode;
                try {
                  var ye = ua(
                    a.type,
                    f
                  );
                  e = l.getSnapshotBeforeUpdate(
                    ye,
                    h
                  ), l.__reactInternalSnapshotBeforeUpdate = e;
                } catch (Ce) {
                  Ge(
                    a,
                    a.return,
                    Ce
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = n.stateNode.containerInfo, a = e.nodeType, a === 9)
                  Ff(e);
                else if (a === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Ff(e);
                      break;
                    default:
                      e.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((e & 1024) !== 0) throw Error(r(163));
          }
          if (e = n.sibling, e !== null) {
            e.return = n.return, wt = e;
            break;
          }
          wt = n.return;
        }
  }
  function Qg(e, n, a) {
    var l = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        ei(e, a), l & 4 && pr(5, a);
        break;
      case 1:
        if (ei(e, a), l & 4)
          if (e = a.stateNode, n === null)
            try {
              e.componentDidMount();
            } catch (w) {
              Ge(a, a.return, w);
            }
          else {
            var f = ua(
              a.type,
              n.memoizedProps
            );
            n = n.memoizedState;
            try {
              e.componentDidUpdate(
                f,
                n,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (w) {
              Ge(
                a,
                a.return,
                w
              );
            }
          }
        l & 64 && qg(a), l & 512 && yr(a, a.return);
        break;
      case 3:
        if (ei(e, a), l & 64 && (e = a.updateQueue, e !== null)) {
          if (n = null, a.child !== null)
            switch (a.child.tag) {
              case 27:
              case 5:
                n = a.child.stateNode;
                break;
              case 1:
                n = a.child.stateNode;
            }
          try {
            zm(e, n);
          } catch (w) {
            Ge(a, a.return, w);
          }
        }
        break;
      case 27:
        n === null && l & 4 && Zg(a);
      case 26:
      case 5:
        ei(e, a), n === null && l & 4 && Xg(a), l & 512 && yr(a, a.return);
        break;
      case 12:
        ei(e, a);
        break;
      case 31:
        ei(e, a), l & 4 && Jg(e, a);
        break;
      case 13:
        ei(e, a), l & 4 && Pg(e, a), l & 64 && (e = a.memoizedState, e !== null && (e = e.dehydrated, e !== null && (a = hS.bind(
          null,
          a
        ), zS(e, a))));
        break;
      case 22:
        if (l = a.memoizedState !== null || Jn, !l) {
          n = n !== null && n.memoizedState !== null || gt, f = Jn;
          var h = gt;
          Jn = l, (gt = n) && !h ? ti(
            e,
            a,
            (a.subtreeFlags & 8772) !== 0
          ) : ei(e, a), Jn = f, gt = h;
        }
        break;
      case 30:
        break;
      default:
        ei(e, a);
    }
  }
  function Fg(e) {
    var n = e.alternate;
    n !== null && (e.alternate = null, Fg(n)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (n = e.stateNode, n !== null && Io(n)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var tt = null, Bt = !1;
  function Pn(e, n, a) {
    for (a = a.child; a !== null; )
      Wg(e, n, a), a = a.sibling;
  }
  function Wg(e, n, a) {
    if (pe && typeof pe.onCommitFiberUnmount == "function")
      try {
        pe.onCommitFiberUnmount(fe, a);
      } catch {
      }
    switch (a.tag) {
      case 26:
        gt || Dn(a, n), Pn(
          e,
          n,
          a
        ), a.memoizedState ? a.memoizedState.count-- : a.stateNode && (a = a.stateNode, a.parentNode.removeChild(a));
        break;
      case 27:
        gt || Dn(a, n);
        var l = tt, f = Bt;
        ki(a.type) && (tt = a.stateNode, Bt = !1), Pn(
          e,
          n,
          a
        ), Cr(a.stateNode), tt = l, Bt = f;
        break;
      case 5:
        gt || Dn(a, n);
      case 6:
        if (l = tt, f = Bt, tt = null, Pn(
          e,
          n,
          a
        ), tt = l, Bt = f, tt !== null)
          if (Bt)
            try {
              (tt.nodeType === 9 ? tt.body : tt.nodeName === "HTML" ? tt.ownerDocument.body : tt).removeChild(a.stateNode);
            } catch (h) {
              Ge(
                a,
                n,
                h
              );
            }
          else
            try {
              tt.removeChild(a.stateNode);
            } catch (h) {
              Ge(
                a,
                n,
                h
              );
            }
        break;
      case 18:
        tt !== null && (Bt ? (e = tt, qp(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          a.stateNode
        ), go(e)) : qp(tt, a.stateNode));
        break;
      case 4:
        l = tt, f = Bt, tt = a.stateNode.containerInfo, Bt = !0, Pn(
          e,
          n,
          a
        ), tt = l, Bt = f;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Ti(2, a, n), gt || Ti(4, a, n), Pn(
          e,
          n,
          a
        );
        break;
      case 1:
        gt || (Dn(a, n), l = a.stateNode, typeof l.componentWillUnmount == "function" && $g(
          a,
          n,
          l
        )), Pn(
          e,
          n,
          a
        );
        break;
      case 21:
        Pn(
          e,
          n,
          a
        );
        break;
      case 22:
        gt = (l = gt) || a.memoizedState !== null, Pn(
          e,
          n,
          a
        ), gt = l;
        break;
      default:
        Pn(
          e,
          n,
          a
        );
    }
  }
  function Jg(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        go(e);
      } catch (a) {
        Ge(n, n.return, a);
      }
    }
  }
  function Pg(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        go(e);
      } catch (a) {
        Ge(n, n.return, a);
      }
  }
  function oS(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var n = e.stateNode;
        return n === null && (n = e.stateNode = new Kg()), n;
      case 22:
        return e = e.stateNode, n = e._retryCache, n === null && (n = e._retryCache = new Kg()), n;
      default:
        throw Error(r(435, e.tag));
    }
  }
  function ps(e, n) {
    var a = oS(e);
    n.forEach(function(l) {
      if (!a.has(l)) {
        a.add(l);
        var f = mS.bind(null, e, l);
        l.then(f, f);
      }
    });
  }
  function It(e, n) {
    var a = n.deletions;
    if (a !== null)
      for (var l = 0; l < a.length; l++) {
        var f = a[l], h = e, w = n, R = w;
        e: for (; R !== null; ) {
          switch (R.tag) {
            case 27:
              if (ki(R.type)) {
                tt = R.stateNode, Bt = !1;
                break e;
              }
              break;
            case 5:
              tt = R.stateNode, Bt = !1;
              break e;
            case 3:
            case 4:
              tt = R.stateNode.containerInfo, Bt = !0;
              break e;
          }
          R = R.return;
        }
        if (tt === null) throw Error(r(160));
        Wg(h, w, f), tt = null, Bt = !1, h = f.alternate, h !== null && (h.return = null), f.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        ep(n, e), n = n.sibling;
  }
  var gn = null;
  function ep(e, n) {
    var a = e.alternate, l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        It(n, e), Vt(e), l & 4 && (Ti(3, e, e.return), pr(3, e), Ti(5, e, e.return));
        break;
      case 1:
        It(n, e), Vt(e), l & 512 && (gt || a === null || Dn(a, a.return)), l & 64 && Jn && (e = e.updateQueue, e !== null && (l = e.callbacks, l !== null && (a = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = a === null ? l : a.concat(l))));
        break;
      case 26:
        var f = gn;
        if (It(n, e), Vt(e), l & 512 && (gt || a === null || Dn(a, a.return)), l & 4) {
          var h = a !== null ? a.memoizedState : null;
          if (l = e.memoizedState, a === null)
            if (l === null)
              if (e.stateNode === null) {
                e: {
                  l = e.type, a = e.memoizedProps, f = f.ownerDocument || f;
                  t: switch (l) {
                    case "title":
                      h = f.getElementsByTagName("title")[0], (!h || h[Qi] || h[vt] || h.namespaceURI === "http://www.w3.org/2000/svg" || h.hasAttribute("itemprop")) && (h = f.createElement(l), f.head.insertBefore(
                        h,
                        f.querySelector("head > title")
                      )), Ct(h, l, a), h[vt] = e, ft(h), l = h;
                      break e;
                    case "link":
                      var w = ey(
                        "link",
                        "href",
                        f
                      ).get(l + (a.href || ""));
                      if (w) {
                        for (var R = 0; R < w.length; R++)
                          if (h = w[R], h.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) && h.getAttribute("rel") === (a.rel == null ? null : a.rel) && h.getAttribute("title") === (a.title == null ? null : a.title) && h.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin)) {
                            w.splice(R, 1);
                            break t;
                          }
                      }
                      h = f.createElement(l), Ct(h, l, a), f.head.appendChild(h);
                      break;
                    case "meta":
                      if (w = ey(
                        "meta",
                        "content",
                        f
                      ).get(l + (a.content || ""))) {
                        for (R = 0; R < w.length; R++)
                          if (h = w[R], h.getAttribute("content") === (a.content == null ? null : "" + a.content) && h.getAttribute("name") === (a.name == null ? null : a.name) && h.getAttribute("property") === (a.property == null ? null : a.property) && h.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) && h.getAttribute("charset") === (a.charSet == null ? null : a.charSet)) {
                            w.splice(R, 1);
                            break t;
                          }
                      }
                      h = f.createElement(l), Ct(h, l, a), f.head.appendChild(h);
                      break;
                    default:
                      throw Error(r(468, l));
                  }
                  h[vt] = e, ft(h), l = h;
                }
                e.stateNode = l;
              } else
                ty(
                  f,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = Pp(
                f,
                l,
                e.memoizedProps
              );
          else
            h !== l ? (h === null ? a.stateNode !== null && (a = a.stateNode, a.parentNode.removeChild(a)) : h.count--, l === null ? ty(
              f,
              e.type,
              e.stateNode
            ) : Pp(
              f,
              l,
              e.memoizedProps
            )) : l === null && e.stateNode !== null && wf(
              e,
              e.memoizedProps,
              a.memoizedProps
            );
        }
        break;
      case 27:
        It(n, e), Vt(e), l & 512 && (gt || a === null || Dn(a, a.return)), a !== null && l & 4 && wf(
          e,
          e.memoizedProps,
          a.memoizedProps
        );
        break;
      case 5:
        if (It(n, e), Vt(e), l & 512 && (gt || a === null || Dn(a, a.return)), e.flags & 32) {
          f = e.stateNode;
          try {
            La(f, "");
          } catch (ye) {
            Ge(e, e.return, ye);
          }
        }
        l & 4 && e.stateNode != null && (f = e.memoizedProps, wf(
          e,
          f,
          a !== null ? a.memoizedProps : f
        )), l & 1024 && (Nf = !0);
        break;
      case 6:
        if (It(n, e), Vt(e), l & 4) {
          if (e.stateNode === null)
            throw Error(r(162));
          l = e.memoizedProps, a = e.stateNode;
          try {
            a.nodeValue = l;
          } catch (ye) {
            Ge(e, e.return, ye);
          }
        }
        break;
      case 3:
        if (Os = null, f = gn, gn = js(n.containerInfo), It(n, e), gn = f, Vt(e), l & 4 && a !== null && a.memoizedState.isDehydrated)
          try {
            go(n.containerInfo);
          } catch (ye) {
            Ge(e, e.return, ye);
          }
        Nf && (Nf = !1, tp(e));
        break;
      case 4:
        l = gn, gn = js(
          e.stateNode.containerInfo
        ), It(n, e), Vt(e), gn = l;
        break;
      case 12:
        It(n, e), Vt(e);
        break;
      case 31:
        It(n, e), Vt(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, ps(e, l)));
        break;
      case 13:
        It(n, e), Vt(e), e.child.flags & 8192 && e.memoizedState !== null != (a !== null && a.memoizedState !== null) && (vs = it()), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, ps(e, l)));
        break;
      case 22:
        f = e.memoizedState !== null;
        var P = a !== null && a.memoizedState !== null, re = Jn, ce = gt;
        if (Jn = re || f, gt = ce || P, It(n, e), gt = ce, Jn = re, Vt(e), l & 8192)
          e: for (n = e.stateNode, n._visibility = f ? n._visibility & -2 : n._visibility | 1, f && (a === null || P || Jn || gt || ca(e)), a = null, n = e; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (a === null) {
                P = a = n;
                try {
                  if (h = P.stateNode, f)
                    w = h.style, typeof w.setProperty == "function" ? w.setProperty("display", "none", "important") : w.display = "none";
                  else {
                    R = P.stateNode;
                    var me = P.memoizedProps.style, le = me != null && me.hasOwnProperty("display") ? me.display : null;
                    R.style.display = le == null || typeof le == "boolean" ? "" : ("" + le).trim();
                  }
                } catch (ye) {
                  Ge(P, P.return, ye);
                }
              }
            } else if (n.tag === 6) {
              if (a === null) {
                P = n;
                try {
                  P.stateNode.nodeValue = f ? "" : P.memoizedProps;
                } catch (ye) {
                  Ge(P, P.return, ye);
                }
              }
            } else if (n.tag === 18) {
              if (a === null) {
                P = n;
                try {
                  var ue = P.stateNode;
                  f ? $p(ue, !0) : $p(P.stateNode, !1);
                } catch (ye) {
                  Ge(P, P.return, ye);
                }
              }
            } else if ((n.tag !== 22 && n.tag !== 23 || n.memoizedState === null || n === e) && n.child !== null) {
              n.child.return = n, n = n.child;
              continue;
            }
            if (n === e) break e;
            for (; n.sibling === null; ) {
              if (n.return === null || n.return === e) break e;
              a === n && (a = null), n = n.return;
            }
            a === n && (a = null), n.sibling.return = n.return, n = n.sibling;
          }
        l & 4 && (l = e.updateQueue, l !== null && (a = l.retryQueue, a !== null && (l.retryQueue = null, ps(e, a))));
        break;
      case 19:
        It(n, e), Vt(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, ps(e, l)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        It(n, e), Vt(e);
    }
  }
  function Vt(e) {
    var n = e.flags;
    if (n & 2) {
      try {
        for (var a, l = e.return; l !== null; ) {
          if (Gg(l)) {
            a = l;
            break;
          }
          l = l.return;
        }
        if (a == null) throw Error(r(160));
        switch (a.tag) {
          case 27:
            var f = a.stateNode, h = Ef(e);
            gs(e, h, f);
            break;
          case 5:
            var w = a.stateNode;
            a.flags & 32 && (La(w, ""), a.flags &= -33);
            var R = Ef(e);
            gs(e, R, w);
            break;
          case 3:
          case 4:
            var P = a.stateNode.containerInfo, re = Ef(e);
            _f(
              e,
              re,
              P
            );
            break;
          default:
            throw Error(r(161));
        }
      } catch (ce) {
        Ge(e, e.return, ce);
      }
      e.flags &= -3;
    }
    n & 4096 && (e.flags &= -4097);
  }
  function tp(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var n = e;
        tp(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), e = e.sibling;
      }
  }
  function ei(e, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        Qg(e, n.alternate, n), n = n.sibling;
  }
  function ca(e) {
    for (e = e.child; e !== null; ) {
      var n = e;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Ti(4, n, n.return), ca(n);
          break;
        case 1:
          Dn(n, n.return);
          var a = n.stateNode;
          typeof a.componentWillUnmount == "function" && $g(
            n,
            n.return,
            a
          ), ca(n);
          break;
        case 27:
          Cr(n.stateNode);
        case 26:
        case 5:
          Dn(n, n.return), ca(n);
          break;
        case 22:
          n.memoizedState === null && ca(n);
          break;
        case 30:
          ca(n);
          break;
        default:
          ca(n);
      }
      e = e.sibling;
    }
  }
  function ti(e, n, a) {
    for (a = a && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var l = n.alternate, f = e, h = n, w = h.flags;
      switch (h.tag) {
        case 0:
        case 11:
        case 15:
          ti(
            f,
            h,
            a
          ), pr(4, h);
          break;
        case 1:
          if (ti(
            f,
            h,
            a
          ), l = h, f = l.stateNode, typeof f.componentDidMount == "function")
            try {
              f.componentDidMount();
            } catch (re) {
              Ge(l, l.return, re);
            }
          if (l = h, f = l.updateQueue, f !== null) {
            var R = l.stateNode;
            try {
              var P = f.shared.hiddenCallbacks;
              if (P !== null)
                for (f.shared.hiddenCallbacks = null, f = 0; f < P.length; f++)
                  Om(P[f], R);
            } catch (re) {
              Ge(l, l.return, re);
            }
          }
          a && w & 64 && qg(h), yr(h, h.return);
          break;
        case 27:
          Zg(h);
        case 26:
        case 5:
          ti(
            f,
            h,
            a
          ), a && l === null && w & 4 && Xg(h), yr(h, h.return);
          break;
        case 12:
          ti(
            f,
            h,
            a
          );
          break;
        case 31:
          ti(
            f,
            h,
            a
          ), a && w & 4 && Jg(f, h);
          break;
        case 13:
          ti(
            f,
            h,
            a
          ), a && w & 4 && Pg(f, h);
          break;
        case 22:
          h.memoizedState === null && ti(
            f,
            h,
            a
          ), yr(h, h.return);
          break;
        case 30:
          break;
        default:
          ti(
            f,
            h,
            a
          );
      }
      n = n.sibling;
    }
  }
  function Cf(e, n) {
    var a = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), e = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (e = n.memoizedState.cachePool.pool), e !== a && (e != null && e.refCount++, a != null && ir(a));
  }
  function Mf(e, n) {
    e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && ir(e));
  }
  function pn(e, n, a, l) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        np(
          e,
          n,
          a,
          l
        ), n = n.sibling;
  }
  function np(e, n, a, l) {
    var f = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        pn(
          e,
          n,
          a,
          l
        ), f & 2048 && pr(9, n);
        break;
      case 1:
        pn(
          e,
          n,
          a,
          l
        );
        break;
      case 3:
        pn(
          e,
          n,
          a,
          l
        ), f & 2048 && (e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && ir(e)));
        break;
      case 12:
        if (f & 2048) {
          pn(
            e,
            n,
            a,
            l
          ), e = n.stateNode;
          try {
            var h = n.memoizedProps, w = h.id, R = h.onPostCommit;
            typeof R == "function" && R(
              w,
              n.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (P) {
            Ge(n, n.return, P);
          }
        } else
          pn(
            e,
            n,
            a,
            l
          );
        break;
      case 31:
        pn(
          e,
          n,
          a,
          l
        );
        break;
      case 13:
        pn(
          e,
          n,
          a,
          l
        );
        break;
      case 23:
        break;
      case 22:
        h = n.stateNode, w = n.alternate, n.memoizedState !== null ? h._visibility & 2 ? pn(
          e,
          n,
          a,
          l
        ) : vr(e, n) : h._visibility & 2 ? pn(
          e,
          n,
          a,
          l
        ) : (h._visibility |= 2, io(
          e,
          n,
          a,
          l,
          (n.subtreeFlags & 10256) !== 0 || !1
        )), f & 2048 && Cf(w, n);
        break;
      case 24:
        pn(
          e,
          n,
          a,
          l
        ), f & 2048 && Mf(n.alternate, n);
        break;
      default:
        pn(
          e,
          n,
          a,
          l
        );
    }
  }
  function io(e, n, a, l, f) {
    for (f = f && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var h = e, w = n, R = a, P = l, re = w.flags;
      switch (w.tag) {
        case 0:
        case 11:
        case 15:
          io(
            h,
            w,
            R,
            P,
            f
          ), pr(8, w);
          break;
        case 23:
          break;
        case 22:
          var ce = w.stateNode;
          w.memoizedState !== null ? ce._visibility & 2 ? io(
            h,
            w,
            R,
            P,
            f
          ) : vr(
            h,
            w
          ) : (ce._visibility |= 2, io(
            h,
            w,
            R,
            P,
            f
          )), f && re & 2048 && Cf(
            w.alternate,
            w
          );
          break;
        case 24:
          io(
            h,
            w,
            R,
            P,
            f
          ), f && re & 2048 && Mf(w.alternate, w);
          break;
        default:
          io(
            h,
            w,
            R,
            P,
            f
          );
      }
      n = n.sibling;
    }
  }
  function vr(e, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var a = e, l = n, f = l.flags;
        switch (l.tag) {
          case 22:
            vr(a, l), f & 2048 && Cf(
              l.alternate,
              l
            );
            break;
          case 24:
            vr(a, l), f & 2048 && Mf(l.alternate, l);
            break;
          default:
            vr(a, l);
        }
        n = n.sibling;
      }
  }
  var br = 8192;
  function ao(e, n, a) {
    if (e.subtreeFlags & br)
      for (e = e.child; e !== null; )
        ip(
          e,
          n,
          a
        ), e = e.sibling;
  }
  function ip(e, n, a) {
    switch (e.tag) {
      case 26:
        ao(
          e,
          n,
          a
        ), e.flags & br && e.memoizedState !== null && XS(
          a,
          gn,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        ao(
          e,
          n,
          a
        );
        break;
      case 3:
      case 4:
        var l = gn;
        gn = js(e.stateNode.containerInfo), ao(
          e,
          n,
          a
        ), gn = l;
        break;
      case 22:
        e.memoizedState === null && (l = e.alternate, l !== null && l.memoizedState !== null ? (l = br, br = 16777216, ao(
          e,
          n,
          a
        ), br = l) : ao(
          e,
          n,
          a
        ));
        break;
      default:
        ao(
          e,
          n,
          a
        );
    }
  }
  function ap(e) {
    var n = e.alternate;
    if (n !== null && (e = n.child, e !== null)) {
      n.child = null;
      do
        n = e.sibling, e.sibling = null, e = n;
      while (e !== null);
    }
  }
  function xr(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var a = 0; a < n.length; a++) {
          var l = n[a];
          wt = l, rp(
            l,
            e
          );
        }
      ap(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        op(e), e = e.sibling;
  }
  function op(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        xr(e), e.flags & 2048 && Ti(9, e, e.return);
        break;
      case 3:
        xr(e);
        break;
      case 12:
        xr(e);
        break;
      case 22:
        var n = e.stateNode;
        e.memoizedState !== null && n._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (n._visibility &= -3, ys(e)) : xr(e);
        break;
      default:
        xr(e);
    }
  }
  function ys(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var a = 0; a < n.length; a++) {
          var l = n[a];
          wt = l, rp(
            l,
            e
          );
        }
      ap(e);
    }
    for (e = e.child; e !== null; ) {
      switch (n = e, n.tag) {
        case 0:
        case 11:
        case 15:
          Ti(8, n, n.return), ys(n);
          break;
        case 22:
          a = n.stateNode, a._visibility & 2 && (a._visibility &= -3, ys(n));
          break;
        default:
          ys(n);
      }
      e = e.sibling;
    }
  }
  function rp(e, n) {
    for (; wt !== null; ) {
      var a = wt;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          Ti(8, a, n);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var l = a.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          ir(a.memoizedState.cache);
      }
      if (l = a.child, l !== null) l.return = a, wt = l;
      else
        e: for (a = e; wt !== null; ) {
          l = wt;
          var f = l.sibling, h = l.return;
          if (Fg(l), l === a) {
            wt = null;
            break e;
          }
          if (f !== null) {
            f.return = h, wt = f;
            break e;
          }
          wt = h;
        }
    }
  }
  var rS = {
    getCacheForType: function(e) {
      var n = _t(dt), a = n.data.get(e);
      return a === void 0 && (a = e(), n.data.set(e, a)), a;
    },
    cacheSignal: function() {
      return _t(dt).controller.signal;
    }
  }, lS = typeof WeakMap == "function" ? WeakMap : Map, $e = 0, We = null, Oe = null, Re = 0, Xe = 0, Qt = null, Ai = !1, oo = !1, Tf = !1, ni = 0, lt = 0, ji = 0, fa = 0, Af = 0, Ft = 0, ro = 0, Sr = null, Ut = null, jf = !1, vs = 0, lp = 0, bs = 1 / 0, xs = null, Di = null, bt = 0, Oi = null, lo = null, ii = 0, Df = 0, Of = null, sp = null, wr = 0, zf = null;
  function Wt() {
    return ($e & 2) !== 0 && Re !== 0 ? Re & -Re : A.T !== null ? If() : Nl();
  }
  function up() {
    if (Ft === 0)
      if ((Re & 536870912) === 0 || Le) {
        var e = Aa;
        Aa <<= 1, (Aa & 3932160) === 0 && (Aa = 262144), Ft = e;
      } else Ft = 536870912;
    return e = Zt.current, e !== null && (e.flags |= 32), Ft;
  }
  function Yt(e, n, a) {
    (e === We && (Xe === 2 || Xe === 9) || e.cancelPendingCommit !== null) && (so(e, 0), zi(
      e,
      Re,
      Ft,
      !1
    )), Ki(e, a), (($e & 2) === 0 || e !== We) && (e === We && (($e & 2) === 0 && (fa |= a), lt === 4 && zi(
      e,
      Re,
      Ft,
      !1
    )), On(e));
  }
  function cp(e, n, a) {
    if (($e & 6) !== 0) throw Error(r(327));
    var l = !a && (n & 127) === 0 && (n & e.expiredLanes) === 0 || Zi(e, n), f = l ? cS(e, n) : kf(e, n, !0), h = l;
    do {
      if (f === 0) {
        oo && !l && zi(e, n, 0, !1);
        break;
      } else {
        if (a = e.current.alternate, h && !sS(a)) {
          f = kf(e, n, !1), h = !1;
          continue;
        }
        if (f === 2) {
          if (h = n, e.errorRecoveryDisabledLanes & h)
            var w = 0;
          else
            w = e.pendingLanes & -536870913, w = w !== 0 ? w : w & 536870912 ? 536870912 : 0;
          if (w !== 0) {
            n = w;
            e: {
              var R = e;
              f = Sr;
              var P = R.current.memoizedState.isDehydrated;
              if (P && (so(R, w).flags |= 256), w = kf(
                R,
                w,
                !1
              ), w !== 2) {
                if (Tf && !P) {
                  R.errorRecoveryDisabledLanes |= h, fa |= h, f = 4;
                  break e;
                }
                h = Ut, Ut = f, h !== null && (Ut === null ? Ut = h : Ut.push.apply(
                  Ut,
                  h
                ));
              }
              f = w;
            }
            if (h = !1, f !== 2) continue;
          }
        }
        if (f === 1) {
          so(e, 0), zi(e, n, 0, !0);
          break;
        }
        e: {
          switch (l = e, h = f, h) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((n & 4194048) !== n) break;
            case 6:
              zi(
                l,
                n,
                Ft,
                !Ai
              );
              break e;
            case 2:
              Ut = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((n & 62914560) === n && (f = vs + 300 - it(), 10 < f)) {
            if (zi(
              l,
              n,
              Ft,
              !Ai
            ), Da(l, 0, !0) !== 0) break e;
            ii = n, l.timeoutHandle = Up(
              fp.bind(
                null,
                l,
                a,
                Ut,
                xs,
                jf,
                n,
                Ft,
                fa,
                ro,
                Ai,
                h,
                "Throttled",
                -0,
                0
              ),
              f
            );
            break e;
          }
          fp(
            l,
            a,
            Ut,
            xs,
            jf,
            n,
            Ft,
            fa,
            ro,
            Ai,
            h,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    On(e);
  }
  function fp(e, n, a, l, f, h, w, R, P, re, ce, me, le, ue) {
    if (e.timeoutHandle = -1, me = n.subtreeFlags, me & 8192 || (me & 16785408) === 16785408) {
      me = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Yn
      }, ip(
        n,
        h,
        me
      );
      var ye = (h & 62914560) === h ? vs - it() : (h & 4194048) === h ? lp - it() : 0;
      if (ye = GS(
        me,
        ye
      ), ye !== null) {
        ii = h, e.cancelPendingCommit = ye(
          bp.bind(
            null,
            e,
            n,
            h,
            a,
            l,
            f,
            w,
            R,
            P,
            ce,
            me,
            null,
            le,
            ue
          )
        ), zi(e, h, w, !re);
        return;
      }
    }
    bp(
      e,
      n,
      h,
      a,
      l,
      f,
      w,
      R,
      P
    );
  }
  function sS(e) {
    for (var n = e; ; ) {
      var a = n.tag;
      if ((a === 0 || a === 11 || a === 15) && n.flags & 16384 && (a = n.updateQueue, a !== null && (a = a.stores, a !== null)))
        for (var l = 0; l < a.length; l++) {
          var f = a[l], h = f.getSnapshot;
          f = f.value;
          try {
            if (!Xt(h(), f)) return !1;
          } catch {
            return !1;
          }
        }
      if (a = n.child, n.subtreeFlags & 16384 && a !== null)
        a.return = n, n = a;
      else {
        if (n === e) break;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === e) return !0;
          n = n.return;
        }
        n.sibling.return = n.return, n = n.sibling;
      }
    }
    return !0;
  }
  function zi(e, n, a, l) {
    n &= ~Af, n &= ~fa, e.suspendedLanes |= n, e.pingedLanes &= ~n, l && (e.warmLanes |= n), l = e.expirationTimes;
    for (var f = n; 0 < f; ) {
      var h = 31 - Ae(f), w = 1 << h;
      l[h] = -1, f &= ~w;
    }
    a !== 0 && wl(e, a, n);
  }
  function Ss() {
    return ($e & 6) === 0 ? (Er(0), !1) : !0;
  }
  function Rf() {
    if (Oe !== null) {
      if (Xe === 0)
        var e = Oe.return;
      else
        e = Oe, Gn = na = null, Qc(e), Ja = null, or = 0, e = Oe;
      for (; e !== null; )
        Yg(e.alternate, e), e = e.return;
      Oe = null;
    }
  }
  function so(e, n) {
    var a = e.timeoutHandle;
    a !== -1 && (e.timeoutHandle = -1, TS(a)), a = e.cancelPendingCommit, a !== null && (e.cancelPendingCommit = null, a()), ii = 0, Rf(), We = e, Oe = a = $n(e.current, null), Re = n, Xe = 0, Qt = null, Ai = !1, oo = Zi(e, n), Tf = !1, ro = Ft = Af = fa = ji = lt = 0, Ut = Sr = null, jf = !1, (n & 8) !== 0 && (n |= n & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= n; 0 < l; ) {
        var f = 31 - Ae(l), h = 1 << f;
        n |= e[f], l &= ~h;
      }
    return ni = n, Yl(), a;
  }
  function dp(e, n) {
    Te = null, A.H = hr, n === Wa || n === Fl ? (n = Tm(), Xe = 3) : n === Lc ? (n = Tm(), Xe = 4) : Xe = n === df ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, Qt = n, Oe === null && (lt = 1, cs(
      e,
      an(n, e.current)
    ));
  }
  function hp() {
    var e = Zt.current;
    return e === null ? !0 : (Re & 4194048) === Re ? sn === null : (Re & 62914560) === Re || (Re & 536870912) !== 0 ? e === sn : !1;
  }
  function mp() {
    var e = A.H;
    return A.H = hr, e === null ? hr : e;
  }
  function gp() {
    var e = A.A;
    return A.A = rS, e;
  }
  function ws() {
    lt = 4, Ai || (Re & 4194048) !== Re && Zt.current !== null || (oo = !0), (ji & 134217727) === 0 && (fa & 134217727) === 0 || We === null || zi(
      We,
      Re,
      Ft,
      !1
    );
  }
  function kf(e, n, a) {
    var l = $e;
    $e |= 2;
    var f = mp(), h = gp();
    (We !== e || Re !== n) && (xs = null, so(e, n)), n = !1;
    var w = lt;
    e: do
      try {
        if (Xe !== 0 && Oe !== null) {
          var R = Oe, P = Qt;
          switch (Xe) {
            case 8:
              Rf(), w = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Zt.current === null && (n = !0);
              var re = Xe;
              if (Xe = 0, Qt = null, uo(e, R, P, re), a && oo) {
                w = 0;
                break e;
              }
              break;
            default:
              re = Xe, Xe = 0, Qt = null, uo(e, R, P, re);
          }
        }
        uS(), w = lt;
        break;
      } catch (ce) {
        dp(e, ce);
      }
    while (!0);
    return n && e.shellSuspendCounter++, Gn = na = null, $e = l, A.H = f, A.A = h, Oe === null && (We = null, Re = 0, Yl()), w;
  }
  function uS() {
    for (; Oe !== null; ) pp(Oe);
  }
  function cS(e, n) {
    var a = $e;
    $e |= 2;
    var l = mp(), f = gp();
    We !== e || Re !== n ? (xs = null, bs = it() + 500, so(e, n)) : oo = Zi(
      e,
      n
    );
    e: do
      try {
        if (Xe !== 0 && Oe !== null) {
          n = Oe;
          var h = Qt;
          t: switch (Xe) {
            case 1:
              Xe = 0, Qt = null, uo(e, n, h, 1);
              break;
            case 2:
            case 9:
              if (Cm(h)) {
                Xe = 0, Qt = null, yp(n);
                break;
              }
              n = function() {
                Xe !== 2 && Xe !== 9 || We !== e || (Xe = 7), On(e);
              }, h.then(n, n);
              break e;
            case 3:
              Xe = 7;
              break e;
            case 4:
              Xe = 5;
              break e;
            case 7:
              Cm(h) ? (Xe = 0, Qt = null, yp(n)) : (Xe = 0, Qt = null, uo(e, n, h, 7));
              break;
            case 5:
              var w = null;
              switch (Oe.tag) {
                case 26:
                  w = Oe.memoizedState;
                case 5:
                case 27:
                  var R = Oe;
                  if (w ? ny(w) : R.stateNode.complete) {
                    Xe = 0, Qt = null;
                    var P = R.sibling;
                    if (P !== null) Oe = P;
                    else {
                      var re = R.return;
                      re !== null ? (Oe = re, Es(re)) : Oe = null;
                    }
                    break t;
                  }
              }
              Xe = 0, Qt = null, uo(e, n, h, 5);
              break;
            case 6:
              Xe = 0, Qt = null, uo(e, n, h, 6);
              break;
            case 8:
              Rf(), lt = 6;
              break e;
            default:
              throw Error(r(462));
          }
        }
        fS();
        break;
      } catch (ce) {
        dp(e, ce);
      }
    while (!0);
    return Gn = na = null, A.H = l, A.A = f, $e = a, Oe !== null ? 0 : (We = null, Re = 0, Yl(), lt);
  }
  function fS() {
    for (; Oe !== null && !tn(); )
      pp(Oe);
  }
  function pp(e) {
    var n = Vg(e.alternate, e, ni);
    e.memoizedProps = e.pendingProps, n === null ? Es(e) : Oe = n;
  }
  function yp(e) {
    var n = e, a = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = Rg(
          a,
          n,
          n.pendingProps,
          n.type,
          void 0,
          Re
        );
        break;
      case 11:
        n = Rg(
          a,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          Re
        );
        break;
      case 5:
        Qc(n);
      default:
        Yg(a, n), n = Oe = gm(n, ni), n = Vg(a, n, ni);
    }
    e.memoizedProps = e.pendingProps, n === null ? Es(e) : Oe = n;
  }
  function uo(e, n, a, l) {
    Gn = na = null, Qc(n), Ja = null, or = 0;
    var f = n.return;
    try {
      if (P1(
        e,
        f,
        n,
        a,
        Re
      )) {
        lt = 1, cs(
          e,
          an(a, e.current)
        ), Oe = null;
        return;
      }
    } catch (h) {
      if (f !== null) throw Oe = f, h;
      lt = 1, cs(
        e,
        an(a, e.current)
      ), Oe = null;
      return;
    }
    n.flags & 32768 ? (Le || l === 1 ? e = !0 : oo || (Re & 536870912) !== 0 ? e = !1 : (Ai = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = Zt.current, l !== null && l.tag === 13 && (l.flags |= 16384))), vp(n, e)) : Es(n);
  }
  function Es(e) {
    var n = e;
    do {
      if ((n.flags & 32768) !== 0) {
        vp(
          n,
          Ai
        );
        return;
      }
      e = n.return;
      var a = nS(
        n.alternate,
        n,
        ni
      );
      if (a !== null) {
        Oe = a;
        return;
      }
      if (n = n.sibling, n !== null) {
        Oe = n;
        return;
      }
      Oe = n = e;
    } while (n !== null);
    lt === 0 && (lt = 5);
  }
  function vp(e, n) {
    do {
      var a = iS(e.alternate, e);
      if (a !== null) {
        a.flags &= 32767, Oe = a;
        return;
      }
      if (a = e.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null), !n && (e = e.sibling, e !== null)) {
        Oe = e;
        return;
      }
      Oe = e = a;
    } while (e !== null);
    lt = 6, Oe = null;
  }
  function bp(e, n, a, l, f, h, w, R, P) {
    e.cancelPendingCommit = null;
    do
      _s();
    while (bt !== 0);
    if (($e & 6) !== 0) throw Error(r(327));
    if (n !== null) {
      if (n === e.current) throw Error(r(177));
      if (h = n.lanes | n.childLanes, h |= wc, Pu(
        e,
        a,
        h,
        w,
        R,
        P
      ), e === We && (Oe = We = null, Re = 0), lo = n, Oi = e, ii = a, Df = h, Of = f, sp = l, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, gS(Rt, function() {
        return _p(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), l = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || l) {
        l = A.T, A.T = null, f = z.p, z.p = 2, w = $e, $e |= 4;
        try {
          aS(e, n, a);
        } finally {
          $e = w, z.p = f, A.T = l;
        }
      }
      bt = 1, xp(), Sp(), wp();
    }
  }
  function xp() {
    if (bt === 1) {
      bt = 0;
      var e = Oi, n = lo, a = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || a) {
        a = A.T, A.T = null;
        var l = z.p;
        z.p = 2;
        var f = $e;
        $e |= 4;
        try {
          ep(n, e);
          var h = Zf, w = rm(e.containerInfo), R = h.focusedElem, P = h.selectionRange;
          if (w !== R && R && R.ownerDocument && om(
            R.ownerDocument.documentElement,
            R
          )) {
            if (P !== null && yc(R)) {
              var re = P.start, ce = P.end;
              if (ce === void 0 && (ce = re), "selectionStart" in R)
                R.selectionStart = re, R.selectionEnd = Math.min(
                  ce,
                  R.value.length
                );
              else {
                var me = R.ownerDocument || document, le = me && me.defaultView || window;
                if (le.getSelection) {
                  var ue = le.getSelection(), ye = R.textContent.length, Ce = Math.min(P.start, ye), Fe = P.end === void 0 ? Ce : Math.min(P.end, ye);
                  !ue.extend && Ce > Fe && (w = Fe, Fe = Ce, Ce = w);
                  var ae = am(
                    R,
                    Ce
                  ), ie = am(
                    R,
                    Fe
                  );
                  if (ae && ie && (ue.rangeCount !== 1 || ue.anchorNode !== ae.node || ue.anchorOffset !== ae.offset || ue.focusNode !== ie.node || ue.focusOffset !== ie.offset)) {
                    var oe = me.createRange();
                    oe.setStart(ae.node, ae.offset), ue.removeAllRanges(), Ce > Fe ? (ue.addRange(oe), ue.extend(ie.node, ie.offset)) : (oe.setEnd(ie.node, ie.offset), ue.addRange(oe));
                  }
                }
              }
            }
            for (me = [], ue = R; ue = ue.parentNode; )
              ue.nodeType === 1 && me.push({
                element: ue,
                left: ue.scrollLeft,
                top: ue.scrollTop
              });
            for (typeof R.focus == "function" && R.focus(), R = 0; R < me.length; R++) {
              var de = me[R];
              de.element.scrollLeft = de.left, de.element.scrollTop = de.top;
            }
          }
          Hs = !!Gf, Zf = Gf = null;
        } finally {
          $e = f, z.p = l, A.T = a;
        }
      }
      e.current = n, bt = 2;
    }
  }
  function Sp() {
    if (bt === 2) {
      bt = 0;
      var e = Oi, n = lo, a = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || a) {
        a = A.T, A.T = null;
        var l = z.p;
        z.p = 2;
        var f = $e;
        $e |= 4;
        try {
          Qg(e, n.alternate, n);
        } finally {
          $e = f, z.p = l, A.T = a;
        }
      }
      bt = 3;
    }
  }
  function wp() {
    if (bt === 4 || bt === 3) {
      bt = 0, dn();
      var e = Oi, n = lo, a = ii, l = sp;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? bt = 5 : (bt = 0, lo = Oi = null, Ep(e, e.pendingLanes));
      var f = e.pendingLanes;
      if (f === 0 && (Di = null), Bo(a), n = n.stateNode, pe && typeof pe.onCommitFiberRoot == "function")
        try {
          pe.onCommitFiberRoot(
            fe,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (l !== null) {
        n = A.T, f = z.p, z.p = 2, A.T = null;
        try {
          for (var h = e.onRecoverableError, w = 0; w < l.length; w++) {
            var R = l[w];
            h(R.value, {
              componentStack: R.stack
            });
          }
        } finally {
          A.T = n, z.p = f;
        }
      }
      (ii & 3) !== 0 && _s(), On(e), f = e.pendingLanes, (a & 261930) !== 0 && (f & 42) !== 0 ? e === zf ? wr++ : (wr = 0, zf = e) : wr = 0, Er(0);
    }
  }
  function Ep(e, n) {
    (e.pooledCacheLanes &= n) === 0 && (n = e.pooledCache, n != null && (e.pooledCache = null, ir(n)));
  }
  function _s() {
    return xp(), Sp(), wp(), _p();
  }
  function _p() {
    if (bt !== 5) return !1;
    var e = Oi, n = Df;
    Df = 0;
    var a = Bo(ii), l = A.T, f = z.p;
    try {
      z.p = 32 > a ? 32 : a, A.T = null, a = Of, Of = null;
      var h = Oi, w = ii;
      if (bt = 0, lo = Oi = null, ii = 0, ($e & 6) !== 0) throw Error(r(331));
      var R = $e;
      if ($e |= 4, op(h.current), np(
        h,
        h.current,
        w,
        a
      ), $e = R, Er(0, !1), pe && typeof pe.onPostCommitFiberRoot == "function")
        try {
          pe.onPostCommitFiberRoot(fe, h);
        } catch {
        }
      return !0;
    } finally {
      z.p = f, A.T = l, Ep(e, n);
    }
  }
  function Np(e, n, a) {
    n = an(a, n), n = ff(e.stateNode, n, 2), e = Ni(e, n, 2), e !== null && (Ki(e, 2), On(e));
  }
  function Ge(e, n, a) {
    if (e.tag === 3)
      Np(e, e, a);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          Np(
            n,
            e,
            a
          );
          break;
        } else if (n.tag === 1) {
          var l = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (Di === null || !Di.has(l))) {
            e = an(a, e), a = Cg(2), l = Ni(n, a, 2), l !== null && (Mg(
              a,
              l,
              n,
              e
            ), Ki(l, 2), On(l));
            break;
          }
        }
        n = n.return;
      }
  }
  function Hf(e, n, a) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new lS();
      var f = /* @__PURE__ */ new Set();
      l.set(n, f);
    } else
      f = l.get(n), f === void 0 && (f = /* @__PURE__ */ new Set(), l.set(n, f));
    f.has(a) || (Tf = !0, f.add(a), e = dS.bind(null, e, n, a), n.then(e, e));
  }
  function dS(e, n, a) {
    var l = e.pingCache;
    l !== null && l.delete(n), e.pingedLanes |= e.suspendedLanes & a, e.warmLanes &= ~a, We === e && (Re & a) === a && (lt === 4 || lt === 3 && (Re & 62914560) === Re && 300 > it() - vs ? ($e & 2) === 0 && so(e, 0) : Af |= a, ro === Re && (ro = 0)), On(e);
  }
  function Cp(e, n) {
    n === 0 && (n = Sl()), e = Pi(e, n), e !== null && (Ki(e, n), On(e));
  }
  function hS(e) {
    var n = e.memoizedState, a = 0;
    n !== null && (a = n.retryLane), Cp(e, a);
  }
  function mS(e, n) {
    var a = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var l = e.stateNode, f = e.memoizedState;
        f !== null && (a = f.retryLane);
        break;
      case 19:
        l = e.stateNode;
        break;
      case 22:
        l = e.stateNode._retryCache;
        break;
      default:
        throw Error(r(314));
    }
    l !== null && l.delete(n), Cp(e, a);
  }
  function gS(e, n) {
    return nt(e, n);
  }
  var Ns = null, co = null, Lf = !1, Cs = !1, Bf = !1, Ri = 0;
  function On(e) {
    e !== co && e.next === null && (co === null ? Ns = co = e : co = co.next = e), Cs = !0, Lf || (Lf = !0, yS());
  }
  function Er(e, n) {
    if (!Bf && Cs) {
      Bf = !0;
      do
        for (var a = !1, l = Ns; l !== null; ) {
          if (e !== 0) {
            var f = l.pendingLanes;
            if (f === 0) var h = 0;
            else {
              var w = l.suspendedLanes, R = l.pingedLanes;
              h = (1 << 31 - Ae(42 | e) + 1) - 1, h &= f & ~(w & ~R), h = h & 201326741 ? h & 201326741 | 1 : h ? h | 2 : 0;
            }
            h !== 0 && (a = !0, jp(l, h));
          } else
            h = Re, h = Da(
              l,
              l === We ? h : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (h & 3) === 0 || Zi(l, h) || (a = !0, jp(l, h));
          l = l.next;
        }
      while (a);
      Bf = !1;
    }
  }
  function pS() {
    Mp();
  }
  function Mp() {
    Cs = Lf = !1;
    var e = 0;
    Ri !== 0 && MS() && (e = Ri);
    for (var n = it(), a = null, l = Ns; l !== null; ) {
      var f = l.next, h = Tp(l, n);
      h === 0 ? (l.next = null, a === null ? Ns = f : a.next = f, f === null && (co = a)) : (a = l, (e !== 0 || (h & 3) !== 0) && (Cs = !0)), l = f;
    }
    bt !== 0 && bt !== 5 || Er(e), Ri !== 0 && (Ri = 0);
  }
  function Tp(e, n) {
    for (var a = e.suspendedLanes, l = e.pingedLanes, f = e.expirationTimes, h = e.pendingLanes & -62914561; 0 < h; ) {
      var w = 31 - Ae(h), R = 1 << w, P = f[w];
      P === -1 ? ((R & a) === 0 || (R & l) !== 0) && (f[w] = Ju(R, n)) : P <= n && (e.expiredLanes |= R), h &= ~R;
    }
    if (n = We, a = Re, a = Da(
      e,
      e === n ? a : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, a === 0 || e === n && (Xe === 2 || Xe === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && St(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((a & 3) === 0 || Zi(e, a)) {
      if (n = a & -a, n === e.callbackPriority) return n;
      switch (l !== null && St(l), Bo(a)) {
        case 2:
        case 8:
          a = zt;
          break;
        case 32:
          a = Rt;
          break;
        case 268435456:
          a = fi;
          break;
        default:
          a = Rt;
      }
      return l = Ap.bind(null, e), a = nt(a, l), e.callbackPriority = n, e.callbackNode = a, n;
    }
    return l !== null && l !== null && St(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Ap(e, n) {
    if (bt !== 0 && bt !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var a = e.callbackNode;
    if (_s() && e.callbackNode !== a)
      return null;
    var l = Re;
    return l = Da(
      e,
      e === We ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (cp(e, l, n), Tp(e, it()), e.callbackNode != null && e.callbackNode === a ? Ap.bind(null, e) : null);
  }
  function jp(e, n) {
    if (_s()) return null;
    cp(e, n, !0);
  }
  function yS() {
    AS(function() {
      ($e & 6) !== 0 ? nt(
        Ot,
        pS
      ) : Mp();
    });
  }
  function If() {
    if (Ri === 0) {
      var e = Qa;
      e === 0 && (e = Ta, Ta <<= 1, (Ta & 261888) === 0 && (Ta = 256)), Ri = e;
    }
    return Ri;
  }
  function Dp(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Rl("" + e);
  }
  function Op(e, n) {
    var a = n.ownerDocument.createElement("input");
    return a.name = n.name, a.value = n.value, e.id && a.setAttribute("form", e.id), n.parentNode.insertBefore(a, n), e = new FormData(e), a.parentNode.removeChild(a), e;
  }
  function vS(e, n, a, l, f) {
    if (n === "submit" && a && a.stateNode === f) {
      var h = Dp(
        (f[Mt] || null).action
      ), w = l.submitter;
      w && (n = (n = w[Mt] || null) ? Dp(n.formAction) : w.getAttribute("formAction"), n !== null && (h = n, w = null));
      var R = new Bl(
        "action",
        "action",
        null,
        l,
        f
      );
      e.push({
        event: R,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (l.defaultPrevented) {
                if (Ri !== 0) {
                  var P = w ? Op(f, w) : new FormData(f);
                  of(
                    a,
                    {
                      pending: !0,
                      data: P,
                      method: f.method,
                      action: h
                    },
                    null,
                    P
                  );
                }
              } else
                typeof h == "function" && (R.preventDefault(), P = w ? Op(f, w) : new FormData(f), of(
                  a,
                  {
                    pending: !0,
                    data: P,
                    method: f.method,
                    action: h
                  },
                  h,
                  P
                ));
            },
            currentTarget: f
          }
        ]
      });
    }
  }
  for (var Vf = 0; Vf < Sc.length; Vf++) {
    var Uf = Sc[Vf], bS = Uf.toLowerCase(), xS = Uf[0].toUpperCase() + Uf.slice(1);
    mn(
      bS,
      "on" + xS
    );
  }
  mn(um, "onAnimationEnd"), mn(cm, "onAnimationIteration"), mn(fm, "onAnimationStart"), mn("dblclick", "onDoubleClick"), mn("focusin", "onFocus"), mn("focusout", "onBlur"), mn(H1, "onTransitionRun"), mn(L1, "onTransitionStart"), mn(B1, "onTransitionCancel"), mn(dm, "onTransitionEnd"), pi("onMouseEnter", ["mouseout", "mouseover"]), pi("onMouseLeave", ["mouseout", "mouseover"]), pi("onPointerEnter", ["pointerout", "pointerover"]), pi("onPointerLeave", ["pointerout", "pointerover"]), Un(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Un(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Un("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Un(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Un(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Un(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var _r = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), SS = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(_r)
  );
  function zp(e, n) {
    n = (n & 4) !== 0;
    for (var a = 0; a < e.length; a++) {
      var l = e[a], f = l.event;
      l = l.listeners;
      e: {
        var h = void 0;
        if (n)
          for (var w = l.length - 1; 0 <= w; w--) {
            var R = l[w], P = R.instance, re = R.currentTarget;
            if (R = R.listener, P !== h && f.isPropagationStopped())
              break e;
            h = R, f.currentTarget = re;
            try {
              h(f);
            } catch (ce) {
              Ul(ce);
            }
            f.currentTarget = null, h = P;
          }
        else
          for (w = 0; w < l.length; w++) {
            if (R = l[w], P = R.instance, re = R.currentTarget, R = R.listener, P !== h && f.isPropagationStopped())
              break e;
            h = R, f.currentTarget = re;
            try {
              h(f);
            } catch (ce) {
              Ul(ce);
            }
            f.currentTarget = null, h = P;
          }
      }
    }
  }
  function ze(e, n) {
    var a = n[Oa];
    a === void 0 && (a = n[Oa] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    a.has(l) || (Rp(n, e, 2, !1), a.add(l));
  }
  function Yf(e, n, a) {
    var l = 0;
    n && (l |= 4), Rp(
      a,
      e,
      l,
      n
    );
  }
  var Ms = "_reactListening" + Math.random().toString(36).slice(2);
  function qf(e) {
    if (!e[Ms]) {
      e[Ms] = !0, Al.forEach(function(a) {
        a !== "selectionchange" && (SS.has(a) || Yf(a, !1, e), Yf(a, !0, e));
      });
      var n = e.nodeType === 9 ? e : e.ownerDocument;
      n === null || n[Ms] || (n[Ms] = !0, Yf("selectionchange", !1, n));
    }
  }
  function Rp(e, n, a, l) {
    switch (uy(n)) {
      case 2:
        var f = QS;
        break;
      case 8:
        f = FS;
        break;
      default:
        f = ad;
    }
    a = f.bind(
      null,
      n,
      a,
      e
    ), f = void 0, !sc || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (f = !0), l ? f !== void 0 ? e.addEventListener(n, a, {
      capture: !0,
      passive: f
    }) : e.addEventListener(n, a, !0) : f !== void 0 ? e.addEventListener(n, a, {
      passive: f
    }) : e.addEventListener(n, a, !1);
  }
  function $f(e, n, a, l, f) {
    var h = l;
    if ((n & 1) === 0 && (n & 2) === 0 && l !== null)
      e: for (; ; ) {
        if (l === null) return;
        var w = l.tag;
        if (w === 3 || w === 4) {
          var R = l.stateNode.containerInfo;
          if (R === f) break;
          if (w === 4)
            for (w = l.return; w !== null; ) {
              var P = w.tag;
              if ((P === 3 || P === 4) && w.stateNode.containerInfo === f)
                return;
              w = w.return;
            }
          for (; R !== null; ) {
            if (w = di(R), w === null) return;
            if (P = w.tag, P === 5 || P === 6 || P === 26 || P === 27) {
              l = h = w;
              continue e;
            }
            R = R.parentNode;
          }
        }
        l = l.return;
      }
    Ih(function() {
      var re = h, ce = rc(a), me = [];
      e: {
        var le = hm.get(e);
        if (le !== void 0) {
          var ue = Bl, ye = e;
          switch (e) {
            case "keypress":
              if (Hl(a) === 0) break e;
            case "keydown":
            case "keyup":
              ue = m1;
              break;
            case "focusin":
              ye = "focus", ue = dc;
              break;
            case "focusout":
              ye = "blur", ue = dc;
              break;
            case "beforeblur":
            case "afterblur":
              ue = dc;
              break;
            case "click":
              if (a.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              ue = Yh;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              ue = n1;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              ue = y1;
              break;
            case um:
            case cm:
            case fm:
              ue = o1;
              break;
            case dm:
              ue = b1;
              break;
            case "scroll":
            case "scrollend":
              ue = e1;
              break;
            case "wheel":
              ue = S1;
              break;
            case "copy":
            case "cut":
            case "paste":
              ue = l1;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              ue = $h;
              break;
            case "toggle":
            case "beforetoggle":
              ue = E1;
          }
          var Ce = (n & 4) !== 0, Fe = !Ce && (e === "scroll" || e === "scrollend"), ae = Ce ? le !== null ? le + "Capture" : null : le;
          Ce = [];
          for (var ie = re, oe; ie !== null; ) {
            var de = ie;
            if (oe = de.stateNode, de = de.tag, de !== 5 && de !== 26 && de !== 27 || oe === null || ae === null || (de = Go(ie, ae), de != null && Ce.push(
              Nr(ie, de, oe)
            )), Fe) break;
            ie = ie.return;
          }
          0 < Ce.length && (le = new ue(
            le,
            ye,
            null,
            a,
            ce
          ), me.push({ event: le, listeners: Ce }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (le = e === "mouseover" || e === "pointerover", ue = e === "mouseout" || e === "pointerout", le && a !== oc && (ye = a.relatedTarget || a.fromElement) && (di(ye) || ye[Vn]))
            break e;
          if ((ue || le) && (le = ce.window === ce ? ce : (le = ce.ownerDocument) ? le.defaultView || le.parentWindow : window, ue ? (ye = a.relatedTarget || a.toElement, ue = re, ye = ye ? di(ye) : null, ye !== null && (Fe = u(ye), Ce = ye.tag, ye !== Fe || Ce !== 5 && Ce !== 27 && Ce !== 6) && (ye = null)) : (ue = null, ye = re), ue !== ye)) {
            if (Ce = Yh, de = "onMouseLeave", ae = "onMouseEnter", ie = "mouse", (e === "pointerout" || e === "pointerover") && (Ce = $h, de = "onPointerLeave", ae = "onPointerEnter", ie = "pointer"), Fe = ue == null ? le : mi(ue), oe = ye == null ? le : mi(ye), le = new Ce(
              de,
              ie + "leave",
              ue,
              a,
              ce
            ), le.target = Fe, le.relatedTarget = oe, de = null, di(ce) === re && (Ce = new Ce(
              ae,
              ie + "enter",
              ye,
              a,
              ce
            ), Ce.target = oe, Ce.relatedTarget = Fe, de = Ce), Fe = de, ue && ye)
              t: {
                for (Ce = wS, ae = ue, ie = ye, oe = 0, de = ae; de; de = Ce(de))
                  oe++;
                de = 0;
                for (var Ee = ie; Ee; Ee = Ce(Ee))
                  de++;
                for (; 0 < oe - de; )
                  ae = Ce(ae), oe--;
                for (; 0 < de - oe; )
                  ie = Ce(ie), de--;
                for (; oe--; ) {
                  if (ae === ie || ie !== null && ae === ie.alternate) {
                    Ce = ae;
                    break t;
                  }
                  ae = Ce(ae), ie = Ce(ie);
                }
                Ce = null;
              }
            else Ce = null;
            ue !== null && kp(
              me,
              le,
              ue,
              Ce,
              !1
            ), ye !== null && Fe !== null && kp(
              me,
              Fe,
              ye,
              Ce,
              !0
            );
          }
        }
        e: {
          if (le = re ? mi(re) : window, ue = le.nodeName && le.nodeName.toLowerCase(), ue === "select" || ue === "input" && le.type === "file")
            var Ve = Jh;
          else if (Fh(le))
            if (Ph)
              Ve = z1;
            else {
              Ve = D1;
              var be = j1;
            }
          else
            ue = le.nodeName, !ue || ue.toLowerCase() !== "input" || le.type !== "checkbox" && le.type !== "radio" ? re && ac(re.elementType) && (Ve = Jh) : Ve = O1;
          if (Ve && (Ve = Ve(e, re))) {
            Wh(
              me,
              Ve,
              a,
              ce
            );
            break e;
          }
          be && be(e, le, re), e === "focusout" && re && le.type === "number" && re.memoizedProps.value != null && $o(le, "number", le.value);
        }
        switch (be = re ? mi(re) : window, e) {
          case "focusin":
            (Fh(be) || be.contentEditable === "true") && (Ua = be, vc = re, er = null);
            break;
          case "focusout":
            er = vc = Ua = null;
            break;
          case "mousedown":
            bc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            bc = !1, lm(me, a, ce);
            break;
          case "selectionchange":
            if (k1) break;
          case "keydown":
          case "keyup":
            lm(me, a, ce);
        }
        var je;
        if (mc)
          e: {
            switch (e) {
              case "compositionstart":
                var ke = "onCompositionStart";
                break e;
              case "compositionend":
                ke = "onCompositionEnd";
                break e;
              case "compositionupdate":
                ke = "onCompositionUpdate";
                break e;
            }
            ke = void 0;
          }
        else
          Va ? Kh(e, a) && (ke = "onCompositionEnd") : e === "keydown" && a.keyCode === 229 && (ke = "onCompositionStart");
        ke && (Xh && a.locale !== "ko" && (Va || ke !== "onCompositionStart" ? ke === "onCompositionEnd" && Va && (je = Vh()) : (vi = ce, uc = "value" in vi ? vi.value : vi.textContent, Va = !0)), be = Ts(re, ke), 0 < be.length && (ke = new qh(
          ke,
          e,
          null,
          a,
          ce
        ), me.push({ event: ke, listeners: be }), je ? ke.data = je : (je = Qh(a), je !== null && (ke.data = je)))), (je = N1 ? C1(e, a) : M1(e, a)) && (ke = Ts(re, "onBeforeInput"), 0 < ke.length && (be = new qh(
          "onBeforeInput",
          "beforeinput",
          null,
          a,
          ce
        ), me.push({
          event: be,
          listeners: ke
        }), be.data = je)), vS(
          me,
          e,
          re,
          a,
          ce
        );
      }
      zp(me, n);
    });
  }
  function Nr(e, n, a) {
    return {
      instance: e,
      listener: n,
      currentTarget: a
    };
  }
  function Ts(e, n) {
    for (var a = n + "Capture", l = []; e !== null; ) {
      var f = e, h = f.stateNode;
      if (f = f.tag, f !== 5 && f !== 26 && f !== 27 || h === null || (f = Go(e, a), f != null && l.unshift(
        Nr(e, f, h)
      ), f = Go(e, n), f != null && l.push(
        Nr(e, f, h)
      )), e.tag === 3) return l;
      e = e.return;
    }
    return [];
  }
  function wS(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function kp(e, n, a, l, f) {
    for (var h = n._reactName, w = []; a !== null && a !== l; ) {
      var R = a, P = R.alternate, re = R.stateNode;
      if (R = R.tag, P !== null && P === l) break;
      R !== 5 && R !== 26 && R !== 27 || re === null || (P = re, f ? (re = Go(a, h), re != null && w.unshift(
        Nr(a, re, P)
      )) : f || (re = Go(a, h), re != null && w.push(
        Nr(a, re, P)
      ))), a = a.return;
    }
    w.length !== 0 && e.push({ event: n, listeners: w });
  }
  var ES = /\r\n?/g, _S = /\u0000|\uFFFD/g;
  function Hp(e) {
    return (typeof e == "string" ? e : "" + e).replace(ES, `
`).replace(_S, "");
  }
  function Lp(e, n) {
    return n = Hp(n), Hp(e) === n;
  }
  function Qe(e, n, a, l, f, h) {
    switch (a) {
      case "children":
        typeof l == "string" ? n === "body" || n === "textarea" && l === "" || La(e, l) : (typeof l == "number" || typeof l == "bigint") && n !== "body" && La(e, "" + l);
        break;
      case "className":
        Ra(e, "class", l);
        break;
      case "tabIndex":
        Ra(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ra(e, a, l);
        break;
      case "style":
        Lh(e, l, h);
        break;
      case "data":
        if (n !== "object") {
          Ra(e, "data", l);
          break;
        }
      case "src":
      case "href":
        if (l === "" && (n !== "a" || a !== "href")) {
          e.removeAttribute(a);
          break;
        }
        if (l == null || typeof l == "function" || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(a);
          break;
        }
        l = Rl("" + l), e.setAttribute(a, l);
        break;
      case "action":
      case "formAction":
        if (typeof l == "function") {
          e.setAttribute(
            a,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof h == "function" && (a === "formAction" ? (n !== "input" && Qe(e, n, "name", f.name, f, null), Qe(
            e,
            n,
            "formEncType",
            f.formEncType,
            f,
            null
          ), Qe(
            e,
            n,
            "formMethod",
            f.formMethod,
            f,
            null
          ), Qe(
            e,
            n,
            "formTarget",
            f.formTarget,
            f,
            null
          )) : (Qe(e, n, "encType", f.encType, f, null), Qe(e, n, "method", f.method, f, null), Qe(e, n, "target", f.target, f, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(a);
          break;
        }
        l = Rl("" + l), e.setAttribute(a, l);
        break;
      case "onClick":
        l != null && (e.onclick = Yn);
        break;
      case "onScroll":
        l != null && ze("scroll", e);
        break;
      case "onScrollEnd":
        l != null && ze("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(r(61));
          if (a = l.__html, a != null) {
            if (f.children != null) throw Error(r(60));
            e.innerHTML = a;
          }
        }
        break;
      case "multiple":
        e.multiple = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "muted":
        e.muted = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (l == null || typeof l == "function" || typeof l == "boolean" || typeof l == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        a = Rl("" + l), e.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          a
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        l != null && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(a, "" + l) : e.removeAttribute(a);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        l && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(a, "") : e.removeAttribute(a);
        break;
      case "capture":
      case "download":
        l === !0 ? e.setAttribute(a, "") : l !== !1 && l != null && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(a, l) : e.removeAttribute(a);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        l != null && typeof l != "function" && typeof l != "symbol" && !isNaN(l) && 1 <= l ? e.setAttribute(a, l) : e.removeAttribute(a);
        break;
      case "rowSpan":
      case "start":
        l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l) ? e.removeAttribute(a) : e.setAttribute(a, l);
        break;
      case "popover":
        ze("beforetoggle", e), ze("toggle", e), za(e, "popover", l);
        break;
      case "xlinkActuate":
        hn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        hn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        hn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        hn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        hn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        hn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        hn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        hn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        hn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          l
        );
        break;
      case "is":
        za(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N") && (a = Jx.get(a) || a, za(e, a, l));
    }
  }
  function Xf(e, n, a, l, f, h) {
    switch (a) {
      case "style":
        Lh(e, l, h);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(r(61));
          if (a = l.__html, a != null) {
            if (f.children != null) throw Error(r(60));
            e.innerHTML = a;
          }
        }
        break;
      case "children":
        typeof l == "string" ? La(e, l) : (typeof l == "number" || typeof l == "bigint") && La(e, "" + l);
        break;
      case "onScroll":
        l != null && ze("scroll", e);
        break;
      case "onScrollEnd":
        l != null && ze("scrollend", e);
        break;
      case "onClick":
        l != null && (e.onclick = Yn);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!jl.hasOwnProperty(a))
          e: {
            if (a[0] === "o" && a[1] === "n" && (f = a.endsWith("Capture"), n = a.slice(2, f ? a.length - 7 : void 0), h = e[Mt] || null, h = h != null ? h[a] : null, typeof h == "function" && e.removeEventListener(n, h, f), typeof l == "function")) {
              typeof h != "function" && h !== null && (a in e ? e[a] = null : e.hasAttribute(a) && e.removeAttribute(a)), e.addEventListener(n, l, f);
              break e;
            }
            a in e ? e[a] = l : l === !0 ? e.setAttribute(a, "") : za(e, a, l);
          }
    }
  }
  function Ct(e, n, a) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        ze("error", e), ze("load", e);
        var l = !1, f = !1, h;
        for (h in a)
          if (a.hasOwnProperty(h)) {
            var w = a[h];
            if (w != null)
              switch (h) {
                case "src":
                  l = !0;
                  break;
                case "srcSet":
                  f = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(r(137, n));
                default:
                  Qe(e, n, h, w, a, null);
              }
          }
        f && Qe(e, n, "srcSet", a.srcSet, a, null), l && Qe(e, n, "src", a.src, a, null);
        return;
      case "input":
        ze("invalid", e);
        var R = h = w = f = null, P = null, re = null;
        for (l in a)
          if (a.hasOwnProperty(l)) {
            var ce = a[l];
            if (ce != null)
              switch (l) {
                case "name":
                  f = ce;
                  break;
                case "type":
                  w = ce;
                  break;
                case "checked":
                  P = ce;
                  break;
                case "defaultChecked":
                  re = ce;
                  break;
                case "value":
                  h = ce;
                  break;
                case "defaultValue":
                  R = ce;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (ce != null)
                    throw Error(r(137, n));
                  break;
                default:
                  Qe(e, n, l, ce, a, null);
              }
          }
        Ha(
          e,
          h,
          R,
          P,
          re,
          w,
          f,
          !1
        );
        return;
      case "select":
        ze("invalid", e), l = w = h = null;
        for (f in a)
          if (a.hasOwnProperty(f) && (R = a[f], R != null))
            switch (f) {
              case "value":
                h = R;
                break;
              case "defaultValue":
                w = R;
                break;
              case "multiple":
                l = R;
              default:
                Qe(e, n, f, R, a, null);
            }
        n = h, a = w, e.multiple = !!l, n != null ? yi(e, !!l, n, !1) : a != null && yi(e, !!l, a, !0);
        return;
      case "textarea":
        ze("invalid", e), h = f = l = null;
        for (w in a)
          if (a.hasOwnProperty(w) && (R = a[w], R != null))
            switch (w) {
              case "value":
                l = R;
                break;
              case "defaultValue":
                f = R;
                break;
              case "children":
                h = R;
                break;
              case "dangerouslySetInnerHTML":
                if (R != null) throw Error(r(91));
                break;
              default:
                Qe(e, n, w, R, a, null);
            }
        kh(e, l, f, h);
        return;
      case "option":
        for (P in a)
          a.hasOwnProperty(P) && (l = a[P], l != null) && (P === "selected" ? e.selected = l && typeof l != "function" && typeof l != "symbol" : Qe(e, n, P, l, a, null));
        return;
      case "dialog":
        ze("beforetoggle", e), ze("toggle", e), ze("cancel", e), ze("close", e);
        break;
      case "iframe":
      case "object":
        ze("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < _r.length; l++)
          ze(_r[l], e);
        break;
      case "image":
        ze("error", e), ze("load", e);
        break;
      case "details":
        ze("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        ze("error", e), ze("load", e);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (re in a)
          if (a.hasOwnProperty(re) && (l = a[re], l != null))
            switch (re) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(137, n));
              default:
                Qe(e, n, re, l, a, null);
            }
        return;
      default:
        if (ac(n)) {
          for (ce in a)
            a.hasOwnProperty(ce) && (l = a[ce], l !== void 0 && Xf(
              e,
              n,
              ce,
              l,
              a,
              void 0
            ));
          return;
        }
    }
    for (R in a)
      a.hasOwnProperty(R) && (l = a[R], l != null && Qe(e, n, R, l, a, null));
  }
  function NS(e, n, a, l) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var f = null, h = null, w = null, R = null, P = null, re = null, ce = null;
        for (ue in a) {
          var me = a[ue];
          if (a.hasOwnProperty(ue) && me != null)
            switch (ue) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                P = me;
              default:
                l.hasOwnProperty(ue) || Qe(e, n, ue, null, l, me);
            }
        }
        for (var le in l) {
          var ue = l[le];
          if (me = a[le], l.hasOwnProperty(le) && (ue != null || me != null))
            switch (le) {
              case "type":
                h = ue;
                break;
              case "name":
                f = ue;
                break;
              case "checked":
                re = ue;
                break;
              case "defaultChecked":
                ce = ue;
                break;
              case "value":
                w = ue;
                break;
              case "defaultValue":
                R = ue;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (ue != null)
                  throw Error(r(137, n));
                break;
              default:
                ue !== me && Qe(
                  e,
                  n,
                  le,
                  ue,
                  l,
                  me
                );
            }
        }
        qo(
          e,
          w,
          R,
          P,
          re,
          ce,
          h,
          f
        );
        return;
      case "select":
        ue = w = R = le = null;
        for (h in a)
          if (P = a[h], a.hasOwnProperty(h) && P != null)
            switch (h) {
              case "value":
                break;
              case "multiple":
                ue = P;
              default:
                l.hasOwnProperty(h) || Qe(
                  e,
                  n,
                  h,
                  null,
                  l,
                  P
                );
            }
        for (f in l)
          if (h = l[f], P = a[f], l.hasOwnProperty(f) && (h != null || P != null))
            switch (f) {
              case "value":
                le = h;
                break;
              case "defaultValue":
                R = h;
                break;
              case "multiple":
                w = h;
              default:
                h !== P && Qe(
                  e,
                  n,
                  f,
                  h,
                  l,
                  P
                );
            }
        n = R, a = w, l = ue, le != null ? yi(e, !!a, le, !1) : !!l != !!a && (n != null ? yi(e, !!a, n, !0) : yi(e, !!a, a ? [] : "", !1));
        return;
      case "textarea":
        ue = le = null;
        for (R in a)
          if (f = a[R], a.hasOwnProperty(R) && f != null && !l.hasOwnProperty(R))
            switch (R) {
              case "value":
                break;
              case "children":
                break;
              default:
                Qe(e, n, R, null, l, f);
            }
        for (w in l)
          if (f = l[w], h = a[w], l.hasOwnProperty(w) && (f != null || h != null))
            switch (w) {
              case "value":
                le = f;
                break;
              case "defaultValue":
                ue = f;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (f != null) throw Error(r(91));
                break;
              default:
                f !== h && Qe(e, n, w, f, l, h);
            }
        Xo(e, le, ue);
        return;
      case "option":
        for (var ye in a)
          le = a[ye], a.hasOwnProperty(ye) && le != null && !l.hasOwnProperty(ye) && (ye === "selected" ? e.selected = !1 : Qe(
            e,
            n,
            ye,
            null,
            l,
            le
          ));
        for (P in l)
          le = l[P], ue = a[P], l.hasOwnProperty(P) && le !== ue && (le != null || ue != null) && (P === "selected" ? e.selected = le && typeof le != "function" && typeof le != "symbol" : Qe(
            e,
            n,
            P,
            le,
            l,
            ue
          ));
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var Ce in a)
          le = a[Ce], a.hasOwnProperty(Ce) && le != null && !l.hasOwnProperty(Ce) && Qe(e, n, Ce, null, l, le);
        for (re in l)
          if (le = l[re], ue = a[re], l.hasOwnProperty(re) && le !== ue && (le != null || ue != null))
            switch (re) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (le != null)
                  throw Error(r(137, n));
                break;
              default:
                Qe(
                  e,
                  n,
                  re,
                  le,
                  l,
                  ue
                );
            }
        return;
      default:
        if (ac(n)) {
          for (var Fe in a)
            le = a[Fe], a.hasOwnProperty(Fe) && le !== void 0 && !l.hasOwnProperty(Fe) && Xf(
              e,
              n,
              Fe,
              void 0,
              l,
              le
            );
          for (ce in l)
            le = l[ce], ue = a[ce], !l.hasOwnProperty(ce) || le === ue || le === void 0 && ue === void 0 || Xf(
              e,
              n,
              ce,
              le,
              l,
              ue
            );
          return;
        }
    }
    for (var ae in a)
      le = a[ae], a.hasOwnProperty(ae) && le != null && !l.hasOwnProperty(ae) && Qe(e, n, ae, null, l, le);
    for (me in l)
      le = l[me], ue = a[me], !l.hasOwnProperty(me) || le === ue || le == null && ue == null || Qe(e, n, me, le, l, ue);
  }
  function Bp(e) {
    switch (e) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function CS() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, n = 0, a = performance.getEntriesByType("resource"), l = 0; l < a.length; l++) {
        var f = a[l], h = f.transferSize, w = f.initiatorType, R = f.duration;
        if (h && R && Bp(w)) {
          for (w = 0, R = f.responseEnd, l += 1; l < a.length; l++) {
            var P = a[l], re = P.startTime;
            if (re > R) break;
            var ce = P.transferSize, me = P.initiatorType;
            ce && Bp(me) && (P = P.responseEnd, w += ce * (P < R ? 1 : (R - re) / (P - re)));
          }
          if (--l, n += 8 * (h + w) / (f.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return n / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Gf = null, Zf = null;
  function As(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Ip(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Vp(e, n) {
    if (e === 0)
      switch (n) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && n === "foreignObject" ? 0 : e;
  }
  function Kf(e, n) {
    return e === "textarea" || e === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var Qf = null;
  function MS() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Qf ? !1 : (Qf = e, !0) : (Qf = null, !1);
  }
  var Up = typeof setTimeout == "function" ? setTimeout : void 0, TS = typeof clearTimeout == "function" ? clearTimeout : void 0, Yp = typeof Promise == "function" ? Promise : void 0, AS = typeof queueMicrotask == "function" ? queueMicrotask : typeof Yp < "u" ? function(e) {
    return Yp.resolve(null).then(e).catch(jS);
  } : Up;
  function jS(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function ki(e) {
    return e === "head";
  }
  function qp(e, n) {
    var a = n, l = 0;
    do {
      var f = a.nextSibling;
      if (e.removeChild(a), f && f.nodeType === 8)
        if (a = f.data, a === "/$" || a === "/&") {
          if (l === 0) {
            e.removeChild(f), go(n);
            return;
          }
          l--;
        } else if (a === "$" || a === "$?" || a === "$~" || a === "$!" || a === "&")
          l++;
        else if (a === "html")
          Cr(e.ownerDocument.documentElement);
        else if (a === "head") {
          a = e.ownerDocument.head, Cr(a);
          for (var h = a.firstChild; h; ) {
            var w = h.nextSibling, R = h.nodeName;
            h[Qi] || R === "SCRIPT" || R === "STYLE" || R === "LINK" && h.rel.toLowerCase() === "stylesheet" || a.removeChild(h), h = w;
          }
        } else
          a === "body" && Cr(e.ownerDocument.body);
      a = f;
    } while (a);
    go(n);
  }
  function $p(e, n) {
    var a = e;
    e = 0;
    do {
      var l = a.nextSibling;
      if (a.nodeType === 1 ? n ? (a._stashedDisplay = a.style.display, a.style.display = "none") : (a.style.display = a._stashedDisplay || "", a.getAttribute("style") === "" && a.removeAttribute("style")) : a.nodeType === 3 && (n ? (a._stashedText = a.nodeValue, a.nodeValue = "") : a.nodeValue = a._stashedText || ""), l && l.nodeType === 8)
        if (a = l.data, a === "/$") {
          if (e === 0) break;
          e--;
        } else
          a !== "$" && a !== "$?" && a !== "$~" && a !== "$!" || e++;
      a = l;
    } while (a);
  }
  function Ff(e) {
    var n = e.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var a = n;
      switch (n = n.nextSibling, a.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Ff(a), Io(a);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (a.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(a);
    }
  }
  function DS(e, n, a, l) {
    for (; e.nodeType === 1; ) {
      var f = a;
      if (e.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (l) {
        if (!e[Qi])
          switch (n) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (h = e.getAttribute("rel"), h === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (h !== f.rel || e.getAttribute("href") !== (f.href == null || f.href === "" ? null : f.href) || e.getAttribute("crossorigin") !== (f.crossOrigin == null ? null : f.crossOrigin) || e.getAttribute("title") !== (f.title == null ? null : f.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (h = e.getAttribute("src"), (h !== (f.src == null ? null : f.src) || e.getAttribute("type") !== (f.type == null ? null : f.type) || e.getAttribute("crossorigin") !== (f.crossOrigin == null ? null : f.crossOrigin)) && h && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (n === "input" && e.type === "hidden") {
        var h = f.name == null ? null : "" + f.name;
        if (f.type === "hidden" && e.getAttribute("name") === h)
          return e;
      } else return e;
      if (e = un(e.nextSibling), e === null) break;
    }
    return null;
  }
  function OS(e, n, a) {
    if (n === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !a || (e = un(e.nextSibling), e === null)) return null;
    return e;
  }
  function Xp(e, n) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = un(e.nextSibling), e === null)) return null;
    return e;
  }
  function Wf(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Jf(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function zS(e, n) {
    var a = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = n;
    else if (e.data !== "$?" || a.readyState !== "loading")
      n();
    else {
      var l = function() {
        n(), a.removeEventListener("DOMContentLoaded", l);
      };
      a.addEventListener("DOMContentLoaded", l), e._reactRetry = l;
    }
  }
  function un(e) {
    for (; e != null; e = e.nextSibling) {
      var n = e.nodeType;
      if (n === 1 || n === 3) break;
      if (n === 8) {
        if (n = e.data, n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&" || n === "F!" || n === "F")
          break;
        if (n === "/$" || n === "/&") return null;
      }
    }
    return e;
  }
  var Pf = null;
  function Gp(e) {
    e = e.nextSibling;
    for (var n = 0; e; ) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === "/$" || a === "/&") {
          if (n === 0)
            return un(e.nextSibling);
          n--;
        } else
          a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&" || n++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Zp(e) {
    e = e.previousSibling;
    for (var n = 0; e; ) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === "$" || a === "$!" || a === "$?" || a === "$~" || a === "&") {
          if (n === 0) return e;
          n--;
        } else a !== "/$" && a !== "/&" || n++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function Kp(e, n, a) {
    switch (n = As(a), e) {
      case "html":
        if (e = n.documentElement, !e) throw Error(r(452));
        return e;
      case "head":
        if (e = n.head, !e) throw Error(r(453));
        return e;
      case "body":
        if (e = n.body, !e) throw Error(r(454));
        return e;
      default:
        throw Error(r(451));
    }
  }
  function Cr(e) {
    for (var n = e.attributes; n.length; )
      e.removeAttributeNode(n[0]);
    Io(e);
  }
  var cn = /* @__PURE__ */ new Map(), Qp = /* @__PURE__ */ new Set();
  function js(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var ai = z.d;
  z.d = {
    f: RS,
    r: kS,
    D: HS,
    C: LS,
    L: BS,
    m: IS,
    X: US,
    S: VS,
    M: YS
  };
  function RS() {
    var e = ai.f(), n = Ss();
    return e || n;
  }
  function kS(e) {
    var n = hi(e);
    n !== null && n.tag === 5 && n.type === "form" ? dg(n) : ai.r(e);
  }
  var fo = typeof document > "u" ? null : document;
  function Fp(e, n, a) {
    var l = fo;
    if (l && typeof n == "string" && n) {
      var f = Ht(n);
      f = 'link[rel="' + e + '"][href="' + f + '"]', typeof a == "string" && (f += '[crossorigin="' + a + '"]'), Qp.has(f) || (Qp.add(f), e = { rel: e, crossOrigin: a, href: n }, l.querySelector(f) === null && (n = l.createElement("link"), Ct(n, "link", e), ft(n), l.head.appendChild(n)));
    }
  }
  function HS(e) {
    ai.D(e), Fp("dns-prefetch", e, null);
  }
  function LS(e, n) {
    ai.C(e, n), Fp("preconnect", e, n);
  }
  function BS(e, n, a) {
    ai.L(e, n, a);
    var l = fo;
    if (l && e && n) {
      var f = 'link[rel="preload"][as="' + Ht(n) + '"]';
      n === "image" && a && a.imageSrcSet ? (f += '[imagesrcset="' + Ht(
        a.imageSrcSet
      ) + '"]', typeof a.imageSizes == "string" && (f += '[imagesizes="' + Ht(
        a.imageSizes
      ) + '"]')) : f += '[href="' + Ht(e) + '"]';
      var h = f;
      switch (n) {
        case "style":
          h = ho(e);
          break;
        case "script":
          h = mo(e);
      }
      cn.has(h) || (e = p(
        {
          rel: "preload",
          href: n === "image" && a && a.imageSrcSet ? void 0 : e,
          as: n
        },
        a
      ), cn.set(h, e), l.querySelector(f) !== null || n === "style" && l.querySelector(Mr(h)) || n === "script" && l.querySelector(Tr(h)) || (n = l.createElement("link"), Ct(n, "link", e), ft(n), l.head.appendChild(n)));
    }
  }
  function IS(e, n) {
    ai.m(e, n);
    var a = fo;
    if (a && e) {
      var l = n && typeof n.as == "string" ? n.as : "script", f = 'link[rel="modulepreload"][as="' + Ht(l) + '"][href="' + Ht(e) + '"]', h = f;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          h = mo(e);
      }
      if (!cn.has(h) && (e = p({ rel: "modulepreload", href: e }, n), cn.set(h, e), a.querySelector(f) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (a.querySelector(Tr(h)))
              return;
        }
        l = a.createElement("link"), Ct(l, "link", e), ft(l), a.head.appendChild(l);
      }
    }
  }
  function VS(e, n, a) {
    ai.S(e, n, a);
    var l = fo;
    if (l && e) {
      var f = gi(l).hoistableStyles, h = ho(e);
      n = n || "default";
      var w = f.get(h);
      if (!w) {
        var R = { loading: 0, preload: null };
        if (w = l.querySelector(
          Mr(h)
        ))
          R.loading = 5;
        else {
          e = p(
            { rel: "stylesheet", href: e, "data-precedence": n },
            a
          ), (a = cn.get(h)) && ed(e, a);
          var P = w = l.createElement("link");
          ft(P), Ct(P, "link", e), P._p = new Promise(function(re, ce) {
            P.onload = re, P.onerror = ce;
          }), P.addEventListener("load", function() {
            R.loading |= 1;
          }), P.addEventListener("error", function() {
            R.loading |= 2;
          }), R.loading |= 4, Ds(w, n, l);
        }
        w = {
          type: "stylesheet",
          instance: w,
          count: 1,
          state: R
        }, f.set(h, w);
      }
    }
  }
  function US(e, n) {
    ai.X(e, n);
    var a = fo;
    if (a && e) {
      var l = gi(a).hoistableScripts, f = mo(e), h = l.get(f);
      h || (h = a.querySelector(Tr(f)), h || (e = p({ src: e, async: !0 }, n), (n = cn.get(f)) && td(e, n), h = a.createElement("script"), ft(h), Ct(h, "link", e), a.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, l.set(f, h));
    }
  }
  function YS(e, n) {
    ai.M(e, n);
    var a = fo;
    if (a && e) {
      var l = gi(a).hoistableScripts, f = mo(e), h = l.get(f);
      h || (h = a.querySelector(Tr(f)), h || (e = p({ src: e, async: !0, type: "module" }, n), (n = cn.get(f)) && td(e, n), h = a.createElement("script"), ft(h), Ct(h, "link", e), a.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, l.set(f, h));
    }
  }
  function Wp(e, n, a, l) {
    var f = (f = U.current) ? js(f) : null;
    if (!f) throw Error(r(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof a.precedence == "string" && typeof a.href == "string" ? (n = ho(a.href), a = gi(
          f
        ).hoistableStyles, l = a.get(n), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, a.set(n, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
          e = ho(a.href);
          var h = gi(
            f
          ).hoistableStyles, w = h.get(e);
          if (w || (f = f.ownerDocument || f, w = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, h.set(e, w), (h = f.querySelector(
            Mr(e)
          )) && !h._p && (w.instance = h, w.state.loading = 5), cn.has(e) || (a = {
            rel: "preload",
            as: "style",
            href: a.href,
            crossOrigin: a.crossOrigin,
            integrity: a.integrity,
            media: a.media,
            hrefLang: a.hrefLang,
            referrerPolicy: a.referrerPolicy
          }, cn.set(e, a), h || qS(
            f,
            e,
            a,
            w.state
          ))), n && l === null)
            throw Error(r(528, ""));
          return w;
        }
        if (n && l !== null)
          throw Error(r(529, ""));
        return null;
      case "script":
        return n = a.async, a = a.src, typeof a == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = mo(a), a = gi(
          f
        ).hoistableScripts, l = a.get(n), l || (l = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, a.set(n, l)), l) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(r(444, e));
    }
  }
  function ho(e) {
    return 'href="' + Ht(e) + '"';
  }
  function Mr(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Jp(e) {
    return p({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function qS(e, n, a, l) {
    e.querySelector('link[rel="preload"][as="style"][' + n + "]") ? l.loading = 1 : (n = e.createElement("link"), l.preload = n, n.addEventListener("load", function() {
      return l.loading |= 1;
    }), n.addEventListener("error", function() {
      return l.loading |= 2;
    }), Ct(n, "link", a), ft(n), e.head.appendChild(n));
  }
  function mo(e) {
    return '[src="' + Ht(e) + '"]';
  }
  function Tr(e) {
    return "script[async]" + e;
  }
  function Pp(e, n, a) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var l = e.querySelector(
            'style[data-href~="' + Ht(a.href) + '"]'
          );
          if (l)
            return n.instance = l, ft(l), l;
          var f = p({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null
          });
          return l = (e.ownerDocument || e).createElement(
            "style"
          ), ft(l), Ct(l, "style", f), Ds(l, a.precedence, e), n.instance = l;
        case "stylesheet":
          f = ho(a.href);
          var h = e.querySelector(
            Mr(f)
          );
          if (h)
            return n.state.loading |= 4, n.instance = h, ft(h), h;
          l = Jp(a), (f = cn.get(f)) && ed(l, f), h = (e.ownerDocument || e).createElement("link"), ft(h);
          var w = h;
          return w._p = new Promise(function(R, P) {
            w.onload = R, w.onerror = P;
          }), Ct(h, "link", l), n.state.loading |= 4, Ds(h, a.precedence, e), n.instance = h;
        case "script":
          return h = mo(a.src), (f = e.querySelector(
            Tr(h)
          )) ? (n.instance = f, ft(f), f) : (l = a, (f = cn.get(h)) && (l = p({}, a), td(l, f)), e = e.ownerDocument || e, f = e.createElement("script"), ft(f), Ct(f, "link", l), e.head.appendChild(f), n.instance = f);
        case "void":
          return null;
        default:
          throw Error(r(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (l = n.instance, n.state.loading |= 4, Ds(l, a.precedence, e));
    return n.instance;
  }
  function Ds(e, n, a) {
    for (var l = a.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), f = l.length ? l[l.length - 1] : null, h = f, w = 0; w < l.length; w++) {
      var R = l[w];
      if (R.dataset.precedence === n) h = R;
      else if (h !== f) break;
    }
    h ? h.parentNode.insertBefore(e, h.nextSibling) : (n = a.nodeType === 9 ? a.head : a, n.insertBefore(e, n.firstChild));
  }
  function ed(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.title == null && (e.title = n.title);
  }
  function td(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.integrity == null && (e.integrity = n.integrity);
  }
  var Os = null;
  function ey(e, n, a) {
    if (Os === null) {
      var l = /* @__PURE__ */ new Map(), f = Os = /* @__PURE__ */ new Map();
      f.set(a, l);
    } else
      f = Os, l = f.get(a), l || (l = /* @__PURE__ */ new Map(), f.set(a, l));
    if (l.has(e)) return l;
    for (l.set(e, null), a = a.getElementsByTagName(e), f = 0; f < a.length; f++) {
      var h = a[f];
      if (!(h[Qi] || h[vt] || e === "link" && h.getAttribute("rel") === "stylesheet") && h.namespaceURI !== "http://www.w3.org/2000/svg") {
        var w = h.getAttribute(n) || "";
        w = e + w;
        var R = l.get(w);
        R ? R.push(h) : l.set(w, [h]);
      }
    }
    return l;
  }
  function ty(e, n, a) {
    e = e.ownerDocument || e, e.head.insertBefore(
      a,
      n === "title" ? e.querySelector("head > title") : null
    );
  }
  function $S(e, n, a) {
    if (a === 1 || n.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof n.precedence != "string" || typeof n.href != "string" || n.href === "")
          break;
        return !0;
      case "link":
        if (typeof n.rel != "string" || typeof n.href != "string" || n.href === "" || n.onLoad || n.onError)
          break;
        return n.rel === "stylesheet" ? (e = n.disabled, typeof n.precedence == "string" && e == null) : !0;
      case "script":
        if (n.async && typeof n.async != "function" && typeof n.async != "symbol" && !n.onLoad && !n.onError && n.src && typeof n.src == "string")
          return !0;
    }
    return !1;
  }
  function ny(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function XS(e, n, a, l) {
    if (a.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (a.state.loading & 4) === 0) {
      if (a.instance === null) {
        var f = ho(l.href), h = n.querySelector(
          Mr(f)
        );
        if (h) {
          n = h._p, n !== null && typeof n == "object" && typeof n.then == "function" && (e.count++, e = zs.bind(e), n.then(e, e)), a.state.loading |= 4, a.instance = h, ft(h);
          return;
        }
        h = n.ownerDocument || n, l = Jp(l), (f = cn.get(f)) && ed(l, f), h = h.createElement("link"), ft(h);
        var w = h;
        w._p = new Promise(function(R, P) {
          w.onload = R, w.onerror = P;
        }), Ct(h, "link", l), a.instance = h;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(a, n), (n = a.state.preload) && (a.state.loading & 3) === 0 && (e.count++, a = zs.bind(e), n.addEventListener("load", a), n.addEventListener("error", a));
    }
  }
  var nd = 0;
  function GS(e, n) {
    return e.stylesheets && e.count === 0 && ks(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(a) {
      var l = setTimeout(function() {
        if (e.stylesheets && ks(e, e.stylesheets), e.unsuspend) {
          var h = e.unsuspend;
          e.unsuspend = null, h();
        }
      }, 6e4 + n);
      0 < e.imgBytes && nd === 0 && (nd = 62500 * CS());
      var f = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && ks(e, e.stylesheets), e.unsuspend)) {
            var h = e.unsuspend;
            e.unsuspend = null, h();
          }
        },
        (e.imgBytes > nd ? 50 : 800) + n
      );
      return e.unsuspend = a, function() {
        e.unsuspend = null, clearTimeout(l), clearTimeout(f);
      };
    } : null;
  }
  function zs() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) ks(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var Rs = null;
  function ks(e, n) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Rs = /* @__PURE__ */ new Map(), n.forEach(ZS, e), Rs = null, zs.call(e));
  }
  function ZS(e, n) {
    if (!(n.state.loading & 4)) {
      var a = Rs.get(e);
      if (a) var l = a.get(null);
      else {
        a = /* @__PURE__ */ new Map(), Rs.set(e, a);
        for (var f = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), h = 0; h < f.length; h++) {
          var w = f[h];
          (w.nodeName === "LINK" || w.getAttribute("media") !== "not all") && (a.set(w.dataset.precedence, w), l = w);
        }
        l && a.set(null, l);
      }
      f = n.instance, w = f.getAttribute("data-precedence"), h = a.get(w) || l, h === l && a.set(null, f), a.set(w, f), this.count++, l = zs.bind(this), f.addEventListener("load", l), f.addEventListener("error", l), h ? h.parentNode.insertBefore(f, h.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(f, e.firstChild)), n.state.loading |= 4;
    }
  }
  var Ar = {
    $$typeof: _,
    Provider: null,
    Consumer: null,
    _currentValue: q,
    _currentValue2: q,
    _threadCount: 0
  };
  function KS(e, n, a, l, f, h, w, R, P) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ho(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ho(0), this.hiddenUpdates = Ho(null), this.identifierPrefix = l, this.onUncaughtError = f, this.onCaughtError = h, this.onRecoverableError = w, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = P, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function iy(e, n, a, l, f, h, w, R, P, re, ce, me) {
    return e = new KS(
      e,
      n,
      a,
      w,
      P,
      re,
      ce,
      me,
      R
    ), n = 1, h === !0 && (n |= 24), h = Gt(3, null, null, n), e.current = h, h.stateNode = e, n = Rc(), n.refCount++, e.pooledCache = n, n.refCount++, h.memoizedState = {
      element: l,
      isDehydrated: a,
      cache: n
    }, Bc(h), e;
  }
  function ay(e) {
    return e ? (e = $a, e) : $a;
  }
  function oy(e, n, a, l, f, h) {
    f = ay(f), l.context === null ? l.context = f : l.pendingContext = f, l = _i(n), l.payload = { element: a }, h = h === void 0 ? null : h, h !== null && (l.callback = h), a = Ni(e, l, n), a !== null && (Yt(a, e, n), lr(a, e, n));
  }
  function ry(e, n) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var a = e.retryLane;
      e.retryLane = a !== 0 && a < n ? a : n;
    }
  }
  function id(e, n) {
    ry(e, n), (e = e.alternate) && ry(e, n);
  }
  function ly(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Pi(e, 67108864);
      n !== null && Yt(n, e, 67108864), id(e, 67108864);
    }
  }
  function sy(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Wt();
      n = Lo(n);
      var a = Pi(e, n);
      a !== null && Yt(a, e, n), id(e, n);
    }
  }
  var Hs = !0;
  function QS(e, n, a, l) {
    var f = A.T;
    A.T = null;
    var h = z.p;
    try {
      z.p = 2, ad(e, n, a, l);
    } finally {
      z.p = h, A.T = f;
    }
  }
  function FS(e, n, a, l) {
    var f = A.T;
    A.T = null;
    var h = z.p;
    try {
      z.p = 8, ad(e, n, a, l);
    } finally {
      z.p = h, A.T = f;
    }
  }
  function ad(e, n, a, l) {
    if (Hs) {
      var f = od(l);
      if (f === null)
        $f(
          e,
          n,
          l,
          Ls,
          a
        ), cy(e, l);
      else if (JS(
        f,
        e,
        n,
        a,
        l
      ))
        l.stopPropagation();
      else if (cy(e, l), n & 4 && -1 < WS.indexOf(e)) {
        for (; f !== null; ) {
          var h = hi(f);
          if (h !== null)
            switch (h.tag) {
              case 3:
                if (h = h.stateNode, h.current.memoizedState.isDehydrated) {
                  var w = In(h.pendingLanes);
                  if (w !== 0) {
                    var R = h;
                    for (R.pendingLanes |= 2, R.entangledLanes |= 2; w; ) {
                      var P = 1 << 31 - Ae(w);
                      R.entanglements[1] |= P, w &= ~P;
                    }
                    On(h), ($e & 6) === 0 && (bs = it() + 500, Er(0));
                  }
                }
                break;
              case 31:
              case 13:
                R = Pi(h, 2), R !== null && Yt(R, h, 2), Ss(), id(h, 2);
            }
          if (h = od(l), h === null && $f(
            e,
            n,
            l,
            Ls,
            a
          ), h === f) break;
          f = h;
        }
        f !== null && l.stopPropagation();
      } else
        $f(
          e,
          n,
          l,
          null,
          a
        );
    }
  }
  function od(e) {
    return e = rc(e), rd(e);
  }
  var Ls = null;
  function rd(e) {
    if (Ls = null, e = di(e), e !== null) {
      var n = u(e);
      if (n === null) e = null;
      else {
        var a = n.tag;
        if (a === 13) {
          if (e = c(n), e !== null) return e;
          e = null;
        } else if (a === 31) {
          if (e = d(n), e !== null) return e;
          e = null;
        } else if (a === 3) {
          if (n.stateNode.current.memoizedState.isDehydrated)
            return n.tag === 3 ? n.stateNode.containerInfo : null;
          e = null;
        } else n !== e && (e = null);
      }
    }
    return Ls = e, null;
  }
  function uy(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (At()) {
          case Ot:
            return 2;
          case zt:
            return 8;
          case Rt:
          case Gi:
            return 32;
          case fi:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var ld = !1, Hi = null, Li = null, Bi = null, jr = /* @__PURE__ */ new Map(), Dr = /* @__PURE__ */ new Map(), Ii = [], WS = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function cy(e, n) {
    switch (e) {
      case "focusin":
      case "focusout":
        Hi = null;
        break;
      case "dragenter":
      case "dragleave":
        Li = null;
        break;
      case "mouseover":
      case "mouseout":
        Bi = null;
        break;
      case "pointerover":
      case "pointerout":
        jr.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Dr.delete(n.pointerId);
    }
  }
  function Or(e, n, a, l, f, h) {
    return e === null || e.nativeEvent !== h ? (e = {
      blockedOn: n,
      domEventName: a,
      eventSystemFlags: l,
      nativeEvent: h,
      targetContainers: [f]
    }, n !== null && (n = hi(n), n !== null && ly(n)), e) : (e.eventSystemFlags |= l, n = e.targetContainers, f !== null && n.indexOf(f) === -1 && n.push(f), e);
  }
  function JS(e, n, a, l, f) {
    switch (n) {
      case "focusin":
        return Hi = Or(
          Hi,
          e,
          n,
          a,
          l,
          f
        ), !0;
      case "dragenter":
        return Li = Or(
          Li,
          e,
          n,
          a,
          l,
          f
        ), !0;
      case "mouseover":
        return Bi = Or(
          Bi,
          e,
          n,
          a,
          l,
          f
        ), !0;
      case "pointerover":
        var h = f.pointerId;
        return jr.set(
          h,
          Or(
            jr.get(h) || null,
            e,
            n,
            a,
            l,
            f
          )
        ), !0;
      case "gotpointercapture":
        return h = f.pointerId, Dr.set(
          h,
          Or(
            Dr.get(h) || null,
            e,
            n,
            a,
            l,
            f
          )
        ), !0;
    }
    return !1;
  }
  function fy(e) {
    var n = di(e.target);
    if (n !== null) {
      var a = u(n);
      if (a !== null) {
        if (n = a.tag, n === 13) {
          if (n = c(a), n !== null) {
            e.blockedOn = n, Cl(e.priority, function() {
              sy(a);
            });
            return;
          }
        } else if (n === 31) {
          if (n = d(a), n !== null) {
            e.blockedOn = n, Cl(e.priority, function() {
              sy(a);
            });
            return;
          }
        } else if (n === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Bs(e) {
    if (e.blockedOn !== null) return !1;
    for (var n = e.targetContainers; 0 < n.length; ) {
      var a = od(e.nativeEvent);
      if (a === null) {
        a = e.nativeEvent;
        var l = new a.constructor(
          a.type,
          a
        );
        oc = l, a.target.dispatchEvent(l), oc = null;
      } else
        return n = hi(a), n !== null && ly(n), e.blockedOn = a, !1;
      n.shift();
    }
    return !0;
  }
  function dy(e, n, a) {
    Bs(e) && a.delete(n);
  }
  function PS() {
    ld = !1, Hi !== null && Bs(Hi) && (Hi = null), Li !== null && Bs(Li) && (Li = null), Bi !== null && Bs(Bi) && (Bi = null), jr.forEach(dy), Dr.forEach(dy);
  }
  function Is(e, n) {
    e.blockedOn === n && (e.blockedOn = null, ld || (ld = !0, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      PS
    )));
  }
  var Vs = null;
  function hy(e) {
    Vs !== e && (Vs = e, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      function() {
        Vs === e && (Vs = null);
        for (var n = 0; n < e.length; n += 3) {
          var a = e[n], l = e[n + 1], f = e[n + 2];
          if (typeof l != "function") {
            if (rd(l || a) === null)
              continue;
            break;
          }
          var h = hi(a);
          h !== null && (e.splice(n, 3), n -= 3, of(
            h,
            {
              pending: !0,
              data: f,
              method: a.method,
              action: l
            },
            l,
            f
          ));
        }
      }
    ));
  }
  function go(e) {
    function n(P) {
      return Is(P, e);
    }
    Hi !== null && Is(Hi, e), Li !== null && Is(Li, e), Bi !== null && Is(Bi, e), jr.forEach(n), Dr.forEach(n);
    for (var a = 0; a < Ii.length; a++) {
      var l = Ii[a];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < Ii.length && (a = Ii[0], a.blockedOn === null); )
      fy(a), a.blockedOn === null && Ii.shift();
    if (a = (e.ownerDocument || e).$$reactFormReplay, a != null)
      for (l = 0; l < a.length; l += 3) {
        var f = a[l], h = a[l + 1], w = f[Mt] || null;
        if (typeof h == "function")
          w || hy(a);
        else if (w) {
          var R = null;
          if (h && h.hasAttribute("formAction")) {
            if (f = h, w = h[Mt] || null)
              R = w.formAction;
            else if (rd(f) !== null) continue;
          } else R = w.action;
          typeof R == "function" ? a[l + 1] = R : (a.splice(l, 3), l -= 3), hy(a);
        }
      }
  }
  function my() {
    function e(h) {
      h.canIntercept && h.info === "react-transition" && h.intercept({
        handler: function() {
          return new Promise(function(w) {
            return f = w;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function n() {
      f !== null && (f(), f = null), l || setTimeout(a, 20);
    }
    function a() {
      if (!l && !navigation.transition) {
        var h = navigation.currentEntry;
        h && h.url != null && navigation.navigate(h.url, {
          state: h.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var l = !1, f = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", n), navigation.addEventListener("navigateerror", n), setTimeout(a, 100), function() {
        l = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", n), navigation.removeEventListener("navigateerror", n), f !== null && (f(), f = null);
      };
    }
  }
  function sd(e) {
    this._internalRoot = e;
  }
  Us.prototype.render = sd.prototype.render = function(e) {
    var n = this._internalRoot;
    if (n === null) throw Error(r(409));
    var a = n.current, l = Wt();
    oy(a, l, e, n, null, null);
  }, Us.prototype.unmount = sd.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var n = e.containerInfo;
      oy(e.current, 2, null, e, null, null), Ss(), n[Vn] = null;
    }
  };
  function Us(e) {
    this._internalRoot = e;
  }
  Us.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var n = Nl();
      e = { blockedOn: null, target: e, priority: n };
      for (var a = 0; a < Ii.length && n !== 0 && n < Ii[a].priority; a++) ;
      Ii.splice(a, 0, e), a === 0 && fy(e);
    }
  };
  var gy = i.version;
  if (gy !== "19.2.8")
    throw Error(
      r(
        527,
        gy,
        "19.2.8"
      )
    );
  z.findDOMNode = function(e) {
    var n = e._reactInternals;
    if (n === void 0)
      throw typeof e.render == "function" ? Error(r(188)) : (e = Object.keys(e).join(","), Error(r(268, e)));
    return e = y(n), e = e !== null ? g(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var ew = {
    bundleType: 0,
    version: "19.2.8",
    rendererPackageName: "react-dom",
    currentDispatcherRef: A,
    reconcilerVersion: "19.2.8"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ys = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ys.isDisabled && Ys.supportsFiber)
      try {
        fe = Ys.inject(
          ew
        ), pe = Ys;
      } catch {
      }
  }
  return Br.createRoot = function(e, n) {
    if (!s(e)) throw Error(r(299));
    var a = !1, l = "", f = wg, h = Eg, w = _g;
    return n != null && (n.unstable_strictMode === !0 && (a = !0), n.identifierPrefix !== void 0 && (l = n.identifierPrefix), n.onUncaughtError !== void 0 && (f = n.onUncaughtError), n.onCaughtError !== void 0 && (h = n.onCaughtError), n.onRecoverableError !== void 0 && (w = n.onRecoverableError)), n = iy(
      e,
      1,
      !1,
      null,
      null,
      a,
      l,
      null,
      f,
      h,
      w,
      my
    ), e[Vn] = n.current, qf(e), new sd(n);
  }, Br.hydrateRoot = function(e, n, a) {
    if (!s(e)) throw Error(r(299));
    var l = !1, f = "", h = wg, w = Eg, R = _g, P = null;
    return a != null && (a.unstable_strictMode === !0 && (l = !0), a.identifierPrefix !== void 0 && (f = a.identifierPrefix), a.onUncaughtError !== void 0 && (h = a.onUncaughtError), a.onCaughtError !== void 0 && (w = a.onCaughtError), a.onRecoverableError !== void 0 && (R = a.onRecoverableError), a.formState !== void 0 && (P = a.formState)), n = iy(
      e,
      1,
      !0,
      n,
      a ?? null,
      l,
      f,
      P,
      h,
      w,
      R,
      my
    ), n.context = ay(null), a = n.current, l = Wt(), l = Lo(l), f = _i(l), f.callback = null, Ni(a, f, l), a = l, n.current.lanes = a, Ki(n, a), On(n), e[Vn] = n.current, qf(e), new Us(n);
  }, Br.version = "19.2.8", Br;
}
var Tv;
function tO() {
  if (Tv) return Hd.exports;
  Tv = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (i) {
        console.error(i);
      }
  }
  return t(), Hd.exports = eO(), Hd.exports;
}
var nO = tO();
function aO(t, i = {}) {
  const o = nO.createRoot(t);
  return o.render(/* @__PURE__ */ x.jsx(WD, { ...i })), {
    root: o,
    unmount() {
      o.unmount();
    }
  };
}
function oO(t) {
  return {
    async listActions() {
      return t.map((i) => ({ ...i }));
    }
  };
}
export {
  ow as BUILDER_JSON_RPC_VERSION,
  xy as BUILDER_RPC_PATH,
  fu as BuilderResultError,
  WD as FSMUIBuilder,
  po as FSM_AUTHORING_METHODS,
  fd as FSM_AUTHORING_OPTIONAL_METHODS,
  Gr as FSM_RUNTIME_METHODS,
  Rn as HANDLED_ERROR_CODES,
  dw as buildRPCEndpoint,
  yn as callBuilderMethod,
  gw as createBuilderAuthoringRPC,
  hw as createBuilderRPCClient,
  $D as createBuilderRuntimeRPC,
  xw as createDefaultExportAdapter,
  Vw as createLocalStoragePersistenceStore,
  oO as createStaticActionCatalogProvider,
  vw as definitionFromDraft,
  iO as formatHandledBuilderError,
  Sw as isRPCExportAvailable,
  Xr as loadDraftDocumentForEditing,
  aO as mountFSMUIBuilder,
  Tw as normalizeInitialDocumentInput,
  Xv as normalizeRuntimeApplyEvent,
  Gv as normalizeRuntimeSnapshot,
  _v as prepareDraftDocumentForSave,
  ha as toHandledBuilderError,
  mw as unwrapBuilderResponse,
  pw as useAuthoringRPC,
  XD as useRuntimeRPC
};

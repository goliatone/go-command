function _v(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var rd = { exports: {} }, jr = {};
var fy;
function Kw() {
  if (fy) return jr;
  fy = 1;
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
  return jr.Fragment = i, jr.jsx = o, jr.jsxs = o, jr;
}
var dy;
function Qw() {
  return dy || (dy = 1, rd.exports = Kw()), rd.exports;
}
var b = Qw(), ld = { exports: {} }, Me = {};
var hy;
function Fw() {
  if (hy) return Me;
  hy = 1;
  var t = /* @__PURE__ */ Symbol.for("react.transitional.element"), i = /* @__PURE__ */ Symbol.for("react.portal"), o = /* @__PURE__ */ Symbol.for("react.fragment"), r = /* @__PURE__ */ Symbol.for("react.strict_mode"), s = /* @__PURE__ */ Symbol.for("react.profiler"), u = /* @__PURE__ */ Symbol.for("react.consumer"), c = /* @__PURE__ */ Symbol.for("react.context"), d = /* @__PURE__ */ Symbol.for("react.forward_ref"), m = /* @__PURE__ */ Symbol.for("react.suspense"), p = /* @__PURE__ */ Symbol.for("react.memo"), g = /* @__PURE__ */ Symbol.for("react.lazy"), y = /* @__PURE__ */ Symbol.for("react.activity"), v = Symbol.iterator;
  function x(D) {
    return D === null || typeof D != "object" ? null : (D = v && D[v] || D["@@iterator"], typeof D == "function" ? D : null);
  }
  var w = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, _ = Object.assign, T = {};
  function A(D, V, ne) {
    this.props = D, this.context = V, this.refs = T, this.updater = ne || w;
  }
  A.prototype.isReactComponent = {}, A.prototype.setState = function(D, V) {
    if (typeof D != "object" && typeof D != "function" && D != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, D, V, "setState");
  }, A.prototype.forceUpdate = function(D) {
    this.updater.enqueueForceUpdate(this, D, "forceUpdate");
  };
  function O() {
  }
  O.prototype = A.prototype;
  function N(D, V, ne) {
    this.props = D, this.context = V, this.refs = T, this.updater = ne || w;
  }
  var C = N.prototype = new O();
  C.constructor = N, _(C, A.prototype), C.isPureReactComponent = !0;
  var I = Array.isArray;
  function L() {
  }
  var k = { H: null, A: null, T: null, S: null }, q = Object.prototype.hasOwnProperty;
  function te(D, V, ne) {
    var H = ne.ref;
    return {
      $$typeof: t,
      type: D,
      key: V,
      ref: H !== void 0 ? H : null,
      props: ne
    };
  }
  function F(D, V) {
    return te(D.type, V, D.props);
  }
  function Y(D) {
    return typeof D == "object" && D !== null && D.$$typeof === t;
  }
  function Q(D) {
    var V = { "=": "=0", ":": "=2" };
    return "$" + D.replace(/[=:]/g, function(ne) {
      return V[ne];
    });
  }
  var W = /\/+/g;
  function j(D, V) {
    return typeof D == "object" && D !== null && D.key != null ? Q("" + D.key) : V.toString(36);
  }
  function $(D) {
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
  function M(D, V, ne, H, E) {
    var U = typeof D;
    (U === "undefined" || U === "boolean") && (D = null);
    var G = !1;
    if (D === null) G = !0;
    else
      switch (U) {
        case "bigint":
        case "string":
        case "number":
          G = !0;
          break;
        case "object":
          switch (D.$$typeof) {
            case t:
            case i:
              G = !0;
              break;
            case g:
              return G = D._init, M(
                G(D._payload),
                V,
                ne,
                H,
                E
              );
          }
      }
    if (G)
      return E = E(D), G = H === "" ? "." + j(D, 0) : H, I(E) ? (ne = "", G != null && (ne = G.replace(W, "$&/") + "/"), M(E, V, ne, "", function(se) {
        return se;
      })) : E != null && (Y(E) && (E = F(
        E,
        ne + (E.key == null || D && D.key === E.key ? "" : ("" + E.key).replace(
          W,
          "$&/"
        ) + "/") + G
      )), V.push(E)), 1;
    G = 0;
    var J = H === "" ? "." : H + ":";
    if (I(D))
      for (var Z = 0; Z < D.length; Z++)
        H = D[Z], U = J + j(H, Z), G += M(
          H,
          V,
          ne,
          U,
          E
        );
    else if (Z = x(D), typeof Z == "function")
      for (D = Z.call(D), Z = 0; !(H = D.next()).done; )
        H = H.value, U = J + j(H, Z++), G += M(
          H,
          V,
          ne,
          U,
          E
        );
    else if (U === "object") {
      if (typeof D.then == "function")
        return M(
          $(D),
          V,
          ne,
          H,
          E
        );
      throw V = String(D), Error(
        "Objects are not valid as a React child (found: " + (V === "[object Object]" ? "object with keys {" + Object.keys(D).join(", ") + "}" : V) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return G;
  }
  function R(D, V, ne) {
    if (D == null) return D;
    var H = [], E = 0;
    return M(D, H, "", "", function(U) {
      return V.call(ne, U, E++);
    }), H;
  }
  function B(D) {
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
  var K = typeof reportError == "function" ? reportError : function(D) {
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
  }, ee = {
    map: R,
    forEach: function(D, V, ne) {
      R(
        D,
        function() {
          V.apply(this, arguments);
        },
        ne
      );
    },
    count: function(D) {
      var V = 0;
      return R(D, function() {
        V++;
      }), V;
    },
    toArray: function(D) {
      return R(D, function(V) {
        return V;
      }) || [];
    },
    only: function(D) {
      if (!Y(D))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return D;
    }
  };
  return Me.Activity = y, Me.Children = ee, Me.Component = A, Me.Fragment = o, Me.Profiler = s, Me.PureComponent = N, Me.StrictMode = r, Me.Suspense = m, Me.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = k, Me.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(D) {
      return k.H.useMemoCache(D);
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
    var H = _({}, D.props), E = D.key;
    if (V != null)
      for (U in V.key !== void 0 && (E = "" + V.key), V)
        !q.call(V, U) || U === "key" || U === "__self" || U === "__source" || U === "ref" && V.ref === void 0 || (H[U] = V[U]);
    var U = arguments.length - 2;
    if (U === 1) H.children = ne;
    else if (1 < U) {
      for (var G = Array(U), J = 0; J < U; J++)
        G[J] = arguments[J + 2];
      H.children = G;
    }
    return te(D.type, E, H);
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
    var H, E = {}, U = null;
    if (V != null)
      for (H in V.key !== void 0 && (U = "" + V.key), V)
        q.call(V, H) && H !== "key" && H !== "__self" && H !== "__source" && (E[H] = V[H]);
    var G = arguments.length - 2;
    if (G === 1) E.children = ne;
    else if (1 < G) {
      for (var J = Array(G), Z = 0; Z < G; Z++)
        J[Z] = arguments[Z + 2];
      E.children = J;
    }
    if (D && D.defaultProps)
      for (H in G = D.defaultProps, G)
        E[H] === void 0 && (E[H] = G[H]);
    return te(D, U, E);
  }, Me.createRef = function() {
    return { current: null };
  }, Me.forwardRef = function(D) {
    return { $$typeof: d, render: D };
  }, Me.isValidElement = Y, Me.lazy = function(D) {
    return {
      $$typeof: g,
      _payload: { _status: -1, _result: D },
      _init: B
    };
  }, Me.memo = function(D, V) {
    return {
      $$typeof: p,
      type: D,
      compare: V === void 0 ? null : V
    };
  }, Me.startTransition = function(D) {
    var V = k.T, ne = {};
    k.T = ne;
    try {
      var H = D(), E = k.S;
      E !== null && E(ne, H), typeof H == "object" && H !== null && typeof H.then == "function" && H.then(L, K);
    } catch (U) {
      K(U);
    } finally {
      V !== null && ne.types !== null && (V.types = ne.types), k.T = V;
    }
  }, Me.unstable_useCacheRefresh = function() {
    return k.H.useCacheRefresh();
  }, Me.use = function(D) {
    return k.H.use(D);
  }, Me.useActionState = function(D, V, ne) {
    return k.H.useActionState(D, V, ne);
  }, Me.useCallback = function(D, V) {
    return k.H.useCallback(D, V);
  }, Me.useContext = function(D) {
    return k.H.useContext(D);
  }, Me.useDebugValue = function() {
  }, Me.useDeferredValue = function(D, V) {
    return k.H.useDeferredValue(D, V);
  }, Me.useEffect = function(D, V) {
    return k.H.useEffect(D, V);
  }, Me.useEffectEvent = function(D) {
    return k.H.useEffectEvent(D);
  }, Me.useId = function() {
    return k.H.useId();
  }, Me.useImperativeHandle = function(D, V, ne) {
    return k.H.useImperativeHandle(D, V, ne);
  }, Me.useInsertionEffect = function(D, V) {
    return k.H.useInsertionEffect(D, V);
  }, Me.useLayoutEffect = function(D, V) {
    return k.H.useLayoutEffect(D, V);
  }, Me.useMemo = function(D, V) {
    return k.H.useMemo(D, V);
  }, Me.useOptimistic = function(D, V) {
    return k.H.useOptimistic(D, V);
  }, Me.useReducer = function(D, V, ne) {
    return k.H.useReducer(D, V, ne);
  }, Me.useRef = function(D) {
    return k.H.useRef(D);
  }, Me.useState = function(D) {
    return k.H.useState(D);
  }, Me.useSyncExternalStore = function(D, V, ne) {
    return k.H.useSyncExternalStore(
      D,
      V,
      ne
    );
  }, Me.useTransition = function() {
    return k.H.useTransition();
  }, Me.version = "19.2.4", Me;
}
var my;
function rl() {
  return my || (my = 1, ld.exports = Fw()), ld.exports;
}
var X = rl();
const kr = /* @__PURE__ */ _v(X), gy = "/rpc", Ww = "2.0", Yr = {
  applyEvent: "fsm.apply_event",
  snapshot: "fsm.snapshot"
}, go = {
  listMachines: "fsm.authoring.list_machines",
  getMachine: "fsm.authoring.get_machine",
  saveDraft: "fsm.authoring.save_draft",
  validate: "fsm.authoring.validate",
  publish: "fsm.authoring.publish",
  deleteMachine: "fsm.authoring.delete_machine"
}, sd = {
  export: "fsm.authoring.export",
  listVersions: "fsm.authoring.list_versions",
  getVersion: "fsm.authoring.get_version",
  diffVersions: "fsm.authoring.diff_versions"
}, jn = {
  versionConflict: "FSM_VERSION_CONFLICT",
  idempotencyConflict: "FSM_IDEMPOTENCY_CONFLICT",
  guardRejected: "FSM_GUARD_REJECTED",
  invalidTransition: "FSM_INVALID_TRANSITION",
  stateNotFound: "FSM_STATE_NOT_FOUND",
  authoringNotFound: "FSM_AUTHORING_NOT_FOUND",
  authoringValidationFailed: "FSM_AUTHORING_VALIDATION_FAILED",
  internal: "FSM_INTERNAL"
};
class lu extends Error {
  method;
  code;
  data;
  status;
  constructor(i) {
    super(i.message), this.name = "RPCClientError", this.method = i.method, this.code = i.code, this.data = i.data, this.status = i.status;
  }
}
function Jw() {
  return Math.random().toString(36).slice(2);
}
function Pw(t, i, o) {
  const r = {
    id: (o.idGenerator ?? Jw)(),
    method: t
  };
  return i !== void 0 && (r.params = i), o.rpcVersion === "2.0" && (r.jsonrpc = "2.0"), r;
}
function Nv(t) {
  return !!t && typeof t == "object" && !Array.isArray(t);
}
function eS(t, i) {
  if (!Nv(i))
    return i;
  if (i.error)
    throw new lu({
      method: t,
      message: i.error.message || `rpc call failed: ${t}`,
      code: i.error.code,
      data: i.error.data
    });
  return "result" in i ? i.result : i;
}
function tS() {
  if (typeof globalThis.fetch != "function")
    throw new Error("global fetch is unavailable; provide fetchImpl explicitly");
  return globalThis.fetch.bind(globalThis);
}
class nS {
  constructor(i) {
    this.options = i, this.fetchImpl = i.fetchImpl ?? tS();
  }
  fetchImpl;
  async call(i, o) {
    const r = JSON.stringify(Pw(i, o, this.options)), s = await this.fetchImpl(this.options.endpoint, {
      ...this.options.requestInit,
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...this.options.headers ?? {}
      },
      body: r
    }), u = await s.json().catch(() => null);
    if (!s.ok)
      throw Nv(u) && u.error ? new lu({
        method: i,
        message: u.error.message || `rpc call failed (${s.status})`,
        code: u.error.code,
        data: u.error.data,
        status: s.status
      }) : new lu({
        method: i,
        message: `rpc call failed (${s.status})`,
        status: s.status,
        data: u
      });
    return eS(i, u);
  }
}
class su extends Error {
  method;
  envelope;
  constructor(i, o) {
    super(o.message), this.name = "BuilderResultError", this.method = i, this.envelope = o;
  }
}
function iS(t) {
  return t.replace(/\/+$/, "");
}
function aS(t) {
  return t.endpoint && t.endpoint.trim() !== "" ? t.endpoint : !t.origin || t.origin.trim() === "" ? gy : `${iS(t.origin)}${gy}`;
}
function oS(t = {}) {
  return new nS({
    endpoint: aS(t),
    rpcVersion: Ww,
    headers: t.headers,
    fetchImpl: t.fetchImpl,
    requestInit: t.requestInit
  });
}
async function hn(t) {
  const i = {
    data: t.data,
    meta: t.meta
  }, o = await t.client.call(
    t.method,
    i
  );
  return rS(t.method, o);
}
function rS(t, i) {
  if (i.error)
    throw new su(t, i.error);
  if (i.data === void 0)
    throw new Error(`rpc result missing data envelope for method ${t}`);
  return i.data;
}
function lS(t) {
  return {
    async listMachines(i, o) {
      return hn({
        client: t,
        method: go.listMachines,
        data: i,
        meta: o
      });
    },
    async getMachine(i, o) {
      return hn({
        client: t,
        method: go.getMachine,
        data: i,
        meta: o
      });
    },
    async saveDraft(i, o) {
      return hn({
        client: t,
        method: go.saveDraft,
        data: i,
        meta: o
      });
    },
    async validate(i, o) {
      return hn({
        client: t,
        method: go.validate,
        data: i,
        meta: o
      });
    },
    async publish(i, o) {
      return hn({
        client: t,
        method: go.publish,
        data: i,
        meta: o
      });
    },
    async deleteMachine(i, o) {
      return hn({
        client: t,
        method: go.deleteMachine,
        data: i,
        meta: o
      });
    },
    async listVersions(i, o) {
      return hn({
        client: t,
        method: sd.listVersions,
        data: i,
        meta: o
      });
    },
    async getVersion(i, o) {
      return hn({
        client: t,
        method: sd.getVersion,
        data: i,
        meta: o
      });
    },
    async diffVersions(i, o) {
      return hn({
        client: t,
        method: sd.diffVersions,
        data: i,
        meta: o
      });
    }
  };
}
function sS(t) {
  return X.useMemo(() => t ? lS(t) : null, [t]);
}
function uS(t) {
  return `${t.trim().replace(/[^a-zA-Z0-9_-]+/g, "-") || "machine"}.json`;
}
function cS(t) {
  return t.definition;
}
function fS(t, i) {
  if (typeof window > "u" || typeof document > "u")
    return;
  const o = new Blob([i], { type: "application/json;charset=utf-8" }), r = window.URL.createObjectURL(o), s = document.createElement("a");
  s.href = r, s.download = t, s.style.display = "none", document.body.appendChild(s), s.click(), document.body.removeChild(s), window.URL.revokeObjectURL(r);
}
function dS(t = {}) {
  return {
    async exportJSON({ machineId: i, draft: o }) {
      fS(uS(i), JSON.stringify(cS(o), null, 2));
    },
    exportRPC: t.exportRPC
  };
}
function hS(t) {
  return !!t?.exportRPC;
}
const mS = ["step", "when"], Cv = ["parallel", "join", "batch", "compensation"];
function ll(t) {
  return mS.includes(t);
}
function Mv(t) {
  return Cv.includes(t);
}
function gS(t) {
  const i = /* @__PURE__ */ new Set();
  for (const o of t.transitions)
    for (const r of o.workflow?.nodes ?? [])
      Mv(r.kind) && i.add(r.kind);
  return [...i];
}
function Xr() {
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
function Hr(t) {
  return JSON.stringify(t);
}
function sl(t) {
  return t !== null && typeof t == "object" && !Array.isArray(t) ? t : null;
}
function py(t) {
  const i = sl(t);
  return i ? Array.isArray(i.states) && Array.isArray(i.transitions) : !1;
}
function pS(t, i) {
  const o = sl(t);
  return o ? {
    is_draft: typeof o.is_draft == "boolean" ? o.is_draft : i.is_draft,
    last_saved_at: typeof o.last_saved_at == "string" && o.last_saved_at.trim() !== "" ? o.last_saved_at : i.last_saved_at
  } : He(i);
}
function yS(t) {
  const i = Xr(), o = He(t);
  return {
    ...i,
    ...o,
    definition: He(o.definition),
    ui_schema: sl(o.ui_schema) ? He(o.ui_schema) : He(i.ui_schema),
    draft_state: pS(o.draft_state, i.draft_state)
  };
}
function vS(t) {
  return {
    ...Xr(),
    definition: He(t)
  };
}
function bS(t) {
  const i = sl(t);
  return i && "draft" in i ? i.draft : t;
}
function xS(t) {
  const i = bS(t), o = sl(i);
  return o ? py(o.definition) ? yS(o) : py(i) ? vS(i) : Xr() : Xr();
}
function yy(t) {
  const i = t.event || "(event)", o = t.to || t.dynamic_to?.resolver || "(target)";
  return `${i} -> ${o}`;
}
function wS(t, i) {
  return t.filter((o) => Tv(o, i));
}
function uu(t, i, o) {
  return t.filter((r) => Tv(r, i) ? r.field === o || r.path.endsWith(`.${o}`) : !1);
}
function Tv(t, i) {
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
function ya(t, i) {
  const o = t.match(i);
  if (!o?.[1])
    return null;
  const r = Number.parseInt(o[1], 10);
  return Number.isNaN(r) ? null : r;
}
function SS(t, i) {
  for (let o = 0; o < t.transitions.length; o += 1) {
    const r = t.transitions[o]?.workflow?.nodes ?? [];
    for (let s = 0; s < r.length; s += 1)
      if (r[s]?.id === i)
        return { kind: "workflow-node", transitionIndex: o, nodeIndex: s };
  }
  return null;
}
function ES(t, i) {
  const o = t.transitions.findIndex((r) => r.id === i);
  return o === -1 ? null : { kind: "transition", transitionIndex: o };
}
function _S(t, i) {
  const o = t.states.findIndex((r) => r.name === i);
  return o === -1 ? null : { kind: "state", stateIndex: o };
}
function NS(t, i) {
  if (i.node_id)
    return SS(t, i.node_id) || ES(t, i.node_id) || _S(t, i.node_id);
  const o = ya(i.path, /transitions\[(\d+)\]/), r = ya(i.path, /workflow\.nodes\[(\d+)\]/);
  if (o !== null && r !== null)
    return {
      kind: "workflow-node",
      transitionIndex: o,
      nodeIndex: r
    };
  const s = ya(i.path, /transitions\[(\d+)\]/);
  if (s !== null)
    return { kind: "transition", transitionIndex: s };
  const u = ya(i.path, /states\[(\d+)\]/);
  return u !== null ? { kind: "state", stateIndex: u } : null;
}
function Gr(t) {
  return [
    t.code,
    t.severity,
    t.message,
    t.path,
    t.node_id ?? "",
    t.field ?? ""
  ].join("|");
}
function cu(t) {
  const i = /* @__PURE__ */ new Map();
  for (const o of t)
    i.set(Gr(o), o);
  return [...i.values()];
}
function fu(t, i) {
  const o = Gr(t), r = Gr(i);
  return o === r ? 0 : o > r ? 1 : -1;
}
function CS(t, i, o) {
  const r = i.node_id?.trim();
  if (r && o.has(r))
    return !0;
  const s = ya(i.path, /transitions\[(\d+)\]/);
  if (s !== null) {
    const c = t.transitions[s], d = c?.id?.trim();
    if (d && o.has(d))
      return !0;
    const m = ya(i.path, /workflow\.nodes\[(\d+)\]/);
    if (m !== null) {
      const p = c?.workflow?.nodes?.[m]?.id?.trim();
      if (p && o.has(p))
        return !0;
    }
  }
  const u = ya(i.path, /states\[(\d+)\]/);
  if (u !== null) {
    const c = t.states[u]?.name?.trim();
    if (c && o.has(c))
      return !0;
  }
  return !1;
}
function MS(t) {
  const i = new Set(t.scopeNodeIDs.map((r) => r.trim()).filter((r) => r !== ""));
  if (i.size === 0)
    return cu(t.scopedDiagnostics).sort(fu);
  const o = t.cachedDiagnostics.filter(
    (r) => !CS(t.definition, r, i)
  );
  return cu([...o, ...t.scopedDiagnostics]).sort(fu);
}
function TS(t, i) {
  const o = cu(t).sort(fu), r = cu(i).sort(fu);
  if (o.length !== r.length)
    return !1;
  for (let s = 0; s < o.length; s += 1)
    if (Gr(o[s]) !== Gr(r[s]))
      return !1;
  return !0;
}
function oi(t) {
  return {
    code: t.code,
    severity: "error",
    message: t.message,
    path: t.path,
    node_id: t.nodeID,
    field: t.field
  };
}
function DS(t, i, o, r, s) {
  const u = `$.transitions[${i}].workflow.nodes[${r}]`;
  if (!ll(o.kind)) {
    const c = Mv(o.kind) ? `${o.kind} is unsupported in builder v1` : `unsupported workflow node kind ${o.kind}`;
    s.push(
      oi({
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
    oi({
      code: "FSM001_UNRESOLVED_ACTION",
      message: "step action_id is required",
      path: `${u}.step.action_id`,
      nodeID: o.id,
      field: "action_id"
    })
  ), o.kind === "when" && (o.expr?.trim() ?? "") === "" && s.push(
    oi({
      code: "FSM002_INVALID_WORKFLOW_NODE",
      message: "when node requires expression",
      path: `${u}.expr`,
      nodeID: o.id,
      field: "expr"
    })
  ), Array.isArray(o.next))
    for (const c of o.next)
      t.workflow.nodes.some((m) => m.id === c) || s.push(
        oi({
          code: "FSM002_INVALID_WORKFLOW_NODE",
          message: `workflow next references unknown node ${c}`,
          path: `${u}.next`,
          nodeID: o.id,
          field: "next"
        })
      );
}
function Dv(t) {
  const i = [];
  return t.states.forEach((o, r) => {
    (!o.name || o.name.trim() === "") && i.push(
      oi({
        code: "FSM003_UNKNOWN_STATE",
        message: "state name is required",
        path: `$.states[${r}].name`,
        field: "name"
      })
    );
  }), t.transitions.forEach((o, r) => {
    const s = `$.transitions[${r}]`;
    (!o.event || o.event.trim() === "") && i.push(
      oi({
        code: "FSM004_DUPLICATE_TRANSITION",
        message: "transition event is required",
        path: `${s}.event`,
        nodeID: o.id,
        field: "event"
      })
    ), (!o.from || o.from.trim() === "") && i.push(
      oi({
        code: "FSM003_UNKNOWN_STATE",
        message: "transition from is required",
        path: `${s}.from`,
        nodeID: o.id,
        field: "from"
      })
    );
    const u = !!(o.to && o.to.trim() !== ""), c = !!(o.dynamic_to?.resolver && o.dynamic_to.resolver.trim() !== "");
    if (u === c && i.push(
      oi({
        code: "FSM001_INVALID_TARGET",
        message: "transition target must define exactly one of to or dynamic resolver",
        path: `${s}.target`,
        nodeID: o.id,
        field: "target"
      })
    ), !o.workflow || o.workflow.nodes.length === 0) {
      i.push(
        oi({
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
      DS(o, r, d, m, i);
    });
  }), i;
}
const jS = "fsm-ui-builder.autosave";
function Vs() {
  return typeof window > "u" || typeof window.localStorage > "u" ? !1 : typeof window.localStorage.getItem == "function" && typeof window.localStorage.setItem == "function" && typeof window.localStorage.removeItem == "function";
}
function ud(t) {
  return t.trim();
}
function vy(t) {
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
function AS(t, i) {
  return t.startsWith(`${i}:`);
}
function cd(t, i) {
  return `${t}:${i}`;
}
function OS(t = jS) {
  return {
    async list() {
      if (!Vs())
        return [];
      const i = [];
      for (let o = 0; o < window.localStorage.length; o += 1) {
        const r = window.localStorage.key(o);
        if (!r || !AS(r, t))
          continue;
        const s = vy(window.localStorage.getItem(r));
        s && i.push({ machineId: s.machineId, updatedAt: s.updatedAt });
      }
      return i.sort((o, r) => r.updatedAt.localeCompare(o.updatedAt)), i;
    },
    async load(i) {
      const o = ud(i);
      if (o === "" || !Vs())
        return null;
      const r = cd(t, o), s = vy(window.localStorage.getItem(r));
      return s ? {
        machineId: s.machineId,
        updatedAt: s.updatedAt,
        document: He(s.document)
      } : null;
    },
    async save(i) {
      const o = ud(i.machineId);
      if (o === "" || !Vs())
        return;
      const r = cd(t, o), s = {
        machineId: o,
        updatedAt: i.updatedAt,
        document: He(i.document)
      };
      window.localStorage.setItem(r, JSON.stringify(s));
    },
    async delete(i) {
      const o = ud(i);
      o === "" || !Vs() || window.localStorage.removeItem(cd(t, o));
    }
  };
}
const by = (t) => {
  let i;
  const o = /* @__PURE__ */ new Set(), r = (p, g) => {
    const y = typeof p == "function" ? p(i) : p;
    if (!Object.is(y, i)) {
      const v = i;
      i = g ?? (typeof y != "object" || y === null) ? y : Object.assign({}, i, y), o.forEach((x) => x(i, v));
    }
  }, s = () => i, d = { setState: r, getState: s, getInitialState: () => m, subscribe: (p) => (o.add(p), () => o.delete(p)) }, m = i = t(r, s, d);
  return d;
}, ih = ((t) => t ? by(t) : by), zS = (t) => t;
function ah(t, i = zS) {
  const o = kr.useSyncExternalStore(
    t.subscribe,
    kr.useCallback(() => i(t.getState()), [t, i]),
    kr.useCallback(() => i(t.getInitialState()), [t, i])
  );
  return kr.useDebugValue(o), o;
}
var jv = /* @__PURE__ */ Symbol.for("immer-nothing"), xy = /* @__PURE__ */ Symbol.for("immer-draftable"), Qt = /* @__PURE__ */ Symbol.for("immer-state");
function gn(t, ...i) {
  throw new Error(
    `[Immer] minified error nr: ${t}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var Zr = Object.getPrototypeOf;
function _o(t) {
  return !!t && !!t[Qt];
}
function Sa(t) {
  return t ? Av(t) || Array.isArray(t) || !!t[xy] || !!t.constructor?.[xy] || ul(t) || Ou(t) : !1;
}
var RS = Object.prototype.constructor.toString(), wy = /* @__PURE__ */ new WeakMap();
function Av(t) {
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
  let r = wy.get(o);
  return r === void 0 && (r = Function.toString.call(o), wy.set(o, r)), r === RS;
}
function du(t, i, o = !0) {
  Au(t) === 0 ? (o ? Reflect.ownKeys(t) : Object.keys(t)).forEach((s) => {
    i(s, t[s], t);
  }) : t.forEach((r, s) => i(s, r, t));
}
function Au(t) {
  const i = t[Qt];
  return i ? i.type_ : Array.isArray(t) ? 1 : ul(t) ? 2 : Ou(t) ? 3 : 0;
}
function Rd(t, i) {
  return Au(t) === 2 ? t.has(i) : Object.prototype.hasOwnProperty.call(t, i);
}
function Ov(t, i, o) {
  const r = Au(t);
  r === 2 ? t.set(i, o) : r === 3 ? t.add(o) : t[i] = o;
}
function kS(t, i) {
  return t === i ? t !== 0 || 1 / t === 1 / i : t !== t && i !== i;
}
function ul(t) {
  return t instanceof Map;
}
function Ou(t) {
  return t instanceof Set;
}
function ga(t) {
  return t.copy_ || t.base_;
}
function kd(t, i) {
  if (ul(t))
    return new Map(t);
  if (Ou(t))
    return new Set(t);
  if (Array.isArray(t))
    return Array.prototype.slice.call(t);
  const o = Av(t);
  if (i === !0 || i === "class_only" && !o) {
    const r = Object.getOwnPropertyDescriptors(t);
    delete r[Qt];
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
    return Object.create(Zr(t), r);
  } else {
    const r = Zr(t);
    if (r !== null && o)
      return { ...t };
    const s = Object.create(r);
    return Object.assign(s, t);
  }
}
function oh(t, i = !1) {
  return zu(t) || _o(t) || !Sa(t) || (Au(t) > 1 && Object.defineProperties(t, {
    set: Us,
    add: Us,
    clear: Us,
    delete: Us
  }), Object.freeze(t), i && Object.values(t).forEach((o) => oh(o, !0))), t;
}
function HS() {
  gn(2);
}
var Us = {
  value: HS
};
function zu(t) {
  return t === null || typeof t != "object" ? !0 : Object.isFrozen(t);
}
var LS = {};
function Ea(t) {
  const i = LS[t];
  return i || gn(0, t), i;
}
var Kr;
function zv() {
  return Kr;
}
function BS(t, i) {
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
function Sy(t, i) {
  i && (Ea("Patches"), t.patches_ = [], t.inversePatches_ = [], t.patchListener_ = i);
}
function Hd(t) {
  Ld(t), t.drafts_.forEach(IS), t.drafts_ = null;
}
function Ld(t) {
  t === Kr && (Kr = t.parent_);
}
function Ey(t) {
  return Kr = BS(Kr, t);
}
function IS(t) {
  const i = t[Qt];
  i.type_ === 0 || i.type_ === 1 ? i.revoke_() : i.revoked_ = !0;
}
function _y(t, i) {
  i.unfinalizedDrafts_ = i.drafts_.length;
  const o = i.drafts_[0];
  return t !== void 0 && t !== o ? (o[Qt].modified_ && (Hd(i), gn(4)), Sa(t) && (t = hu(i, t), i.parent_ || mu(i, t)), i.patches_ && Ea("Patches").generateReplacementPatches_(
    o[Qt].base_,
    t,
    i.patches_,
    i.inversePatches_
  )) : t = hu(i, o, []), Hd(i), i.patches_ && i.patchListener_(i.patches_, i.inversePatches_), t !== jv ? t : void 0;
}
function hu(t, i, o) {
  if (zu(i))
    return i;
  const r = t.immer_.shouldUseStrictIteration(), s = i[Qt];
  if (!s)
    return du(
      i,
      (u, c) => Ny(t, s, i, u, c, o),
      r
    ), i;
  if (s.scope_ !== t)
    return i;
  if (!s.modified_)
    return mu(t, s.base_, !0), s.base_;
  if (!s.finalized_) {
    s.finalized_ = !0, s.scope_.unfinalizedDrafts_--;
    const u = s.copy_;
    let c = u, d = !1;
    s.type_ === 3 && (c = new Set(u), u.clear(), d = !0), du(
      c,
      (m, p) => Ny(
        t,
        s,
        u,
        m,
        p,
        o,
        d
      ),
      r
    ), mu(t, u, !1), o && t.patches_ && Ea("Patches").generatePatches_(
      s,
      o,
      t.patches_,
      t.inversePatches_
    );
  }
  return s.copy_;
}
function Ny(t, i, o, r, s, u, c) {
  if (s == null || typeof s != "object" && !c)
    return;
  const d = zu(s);
  if (!(d && !c)) {
    if (_o(s)) {
      const m = u && i && i.type_ !== 3 && // Set objects are atomic since they have no keys.
      !Rd(i.assigned_, r) ? u.concat(r) : void 0, p = hu(t, s, m);
      if (Ov(o, r, p), _o(p))
        t.canAutoFreeze_ = !1;
      else
        return;
    } else c && o.add(s);
    if (Sa(s) && !d) {
      if (!t.immer_.autoFreeze_ && t.unfinalizedDrafts_ < 1 || i && i.base_ && i.base_[r] === s && d)
        return;
      hu(t, s), (!i || !i.scope_.parent_) && typeof r != "symbol" && (ul(o) ? o.has(r) : Object.prototype.propertyIsEnumerable.call(o, r)) && mu(t, s);
    }
  }
}
function mu(t, i, o = !1) {
  !t.parent_ && t.immer_.autoFreeze_ && t.canAutoFreeze_ && oh(i, o);
}
function VS(t, i) {
  const o = Array.isArray(t), r = {
    type_: o ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: i ? i.scope_ : zv(),
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
  let s = r, u = rh;
  o && (s = [r], u = Qr);
  const { revoke: c, proxy: d } = Proxy.revocable(s, u);
  return r.draft_ = d, r.revoke_ = c, d;
}
var rh = {
  get(t, i) {
    if (i === Qt)
      return t;
    const o = ga(t);
    if (!Rd(o, i))
      return US(t, o, i);
    const r = o[i];
    return t.finalized_ || !Sa(r) ? r : r === fd(t.base_, i) ? (dd(t), t.copy_[i] = Id(r, t)) : r;
  },
  has(t, i) {
    return i in ga(t);
  },
  ownKeys(t) {
    return Reflect.ownKeys(ga(t));
  },
  set(t, i, o) {
    const r = Rv(ga(t), i);
    if (r?.set)
      return r.set.call(t.draft_, o), !0;
    if (!t.modified_) {
      const s = fd(ga(t), i), u = s?.[Qt];
      if (u && u.base_ === o)
        return t.copy_[i] = o, t.assigned_[i] = !1, !0;
      if (kS(o, s) && (o !== void 0 || Rd(t.base_, i)))
        return !0;
      dd(t), Bd(t);
    }
    return t.copy_[i] === o && // special case: handle new props with value 'undefined'
    (o !== void 0 || i in t.copy_) || // special case: NaN
    Number.isNaN(o) && Number.isNaN(t.copy_[i]) || (t.copy_[i] = o, t.assigned_[i] = !0), !0;
  },
  deleteProperty(t, i) {
    return fd(t.base_, i) !== void 0 || i in t.base_ ? (t.assigned_[i] = !1, dd(t), Bd(t)) : delete t.assigned_[i], t.copy_ && delete t.copy_[i], !0;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(t, i) {
    const o = ga(t), r = Reflect.getOwnPropertyDescriptor(o, i);
    return r && {
      writable: !0,
      configurable: t.type_ !== 1 || i !== "length",
      enumerable: r.enumerable,
      value: o[i]
    };
  },
  defineProperty() {
    gn(11);
  },
  getPrototypeOf(t) {
    return Zr(t.base_);
  },
  setPrototypeOf() {
    gn(12);
  }
}, Qr = {};
du(rh, (t, i) => {
  Qr[t] = function() {
    return arguments[0] = arguments[0][0], i.apply(this, arguments);
  };
});
Qr.deleteProperty = function(t, i) {
  return Qr.set.call(this, t, i, void 0);
};
Qr.set = function(t, i, o) {
  return rh.set.call(this, t[0], i, o, t[0]);
};
function fd(t, i) {
  const o = t[Qt];
  return (o ? ga(o) : t)[i];
}
function US(t, i, o) {
  const r = Rv(i, o);
  return r ? "value" in r ? r.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    r.get?.call(t.draft_)
  ) : void 0;
}
function Rv(t, i) {
  if (!(i in t))
    return;
  let o = Zr(t);
  for (; o; ) {
    const r = Object.getOwnPropertyDescriptor(o, i);
    if (r)
      return r;
    o = Zr(o);
  }
}
function Bd(t) {
  t.modified_ || (t.modified_ = !0, t.parent_ && Bd(t.parent_));
}
function dd(t) {
  t.copy_ || (t.copy_ = kd(
    t.base_,
    t.scope_.immer_.useStrictShallowCopy_
  ));
}
var YS = class {
  constructor(t) {
    this.autoFreeze_ = !0, this.useStrictShallowCopy_ = !1, this.useStrictIteration_ = !0, this.produce = (i, o, r) => {
      if (typeof i == "function" && typeof o != "function") {
        const u = o;
        o = i;
        const c = this;
        return function(m = u, ...p) {
          return c.produce(m, (g) => o.call(this, g, ...p));
        };
      }
      typeof o != "function" && gn(6), r !== void 0 && typeof r != "function" && gn(7);
      let s;
      if (Sa(i)) {
        const u = Ey(this), c = Id(i, void 0);
        let d = !0;
        try {
          s = o(c), d = !1;
        } finally {
          d ? Hd(u) : Ld(u);
        }
        return Sy(u, r), _y(s, u);
      } else if (!i || typeof i != "object") {
        if (s = o(i), s === void 0 && (s = i), s === jv && (s = void 0), this.autoFreeze_ && oh(s, !0), r) {
          const u = [], c = [];
          Ea("Patches").generateReplacementPatches_(i, s, u, c), r(u, c);
        }
        return s;
      } else
        gn(1, i);
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
    Sa(t) || gn(8), _o(t) && (t = qS(t));
    const i = Ey(this), o = Id(t, void 0);
    return o[Qt].isManual_ = !0, Ld(i), o;
  }
  finishDraft(t, i) {
    const o = t && t[Qt];
    (!o || !o.isManual_) && gn(9);
    const { scope_: r } = o;
    return Sy(r, i), _y(void 0, r);
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
    const r = Ea("Patches").applyPatches_;
    return _o(t) ? r(t, i) : this.produce(
      t,
      (s) => r(s, i)
    );
  }
};
function Id(t, i) {
  const o = ul(t) ? Ea("MapSet").proxyMap_(t, i) : Ou(t) ? Ea("MapSet").proxySet_(t, i) : VS(t, i);
  return (i ? i.scope_ : zv()).drafts_.push(o), o;
}
function qS(t) {
  return _o(t) || gn(10, t), kv(t);
}
function kv(t) {
  if (!Sa(t) || zu(t))
    return t;
  const i = t[Qt];
  let o, r = !0;
  if (i) {
    if (!i.modified_)
      return i.base_;
    i.finalized_ = !0, o = kd(t, i.scope_.immer_.useStrictShallowCopy_), r = i.scope_.immer_.shouldUseStrictIteration();
  } else
    o = kd(t, !0);
  return du(
    o,
    (s, u) => {
      Ov(o, s, kv(u));
    },
    r
  ), i && (i.finalized_ = !1), o;
}
var $S = new YS(), Hv = $S.produce;
const XS = "state-index-v1", Lv = "positions", GS = "key_strategy";
function Ru(t) {
  return t !== null && typeof t == "object" && !Array.isArray(t);
}
function Cy(t) {
  return typeof t == "number" && Number.isFinite(t);
}
function ZS(t) {
  return !Ru(t) || !Cy(t.x) || !Cy(t.y) ? null : {
    x: t.x,
    y: t.y
  };
}
function bn(t) {
  return `state:${t}`;
}
function Bv(t) {
  return !t || !Ru(t.graph_layout) ? {} : t.graph_layout;
}
function gu(t) {
  const o = Bv(t)[Lv];
  if (!Ru(o))
    return {};
  const r = {};
  for (const [s, u] of Object.entries(o)) {
    const c = ZS(u);
    c && (r[s] = c);
  }
  return r;
}
function lh(t, i) {
  const o = Ru(t) ? { ...t } : {}, r = { ...Bv(t) };
  return r[GS] = XS, r[Lv] = i, o.graph_layout = r, o;
}
function KS(t, i) {
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
        o[bn(u - 1)] = s;
        continue;
      }
      o[r] = s;
    }
  }
  return o;
}
function QS(t, i, o) {
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
      r[bn(o)] = u;
      continue;
    }
    if (i < o && c > i && c <= o) {
      r[bn(c - 1)] = u;
      continue;
    }
    if (i > o && c >= o && c < i) {
      r[bn(c + 1)] = u;
      continue;
    }
    r[s] = u;
  }
  return r;
}
function Lr(t, i) {
  return i <= 0 ? 0 : Math.min(Math.max(0, t), i - 1);
}
function My(t, i, o) {
  if (i === o)
    return;
  const [r] = t.splice(i, 1);
  r !== void 0 && t.splice(o, 0, r);
}
function hd(t, i, o) {
  return t === i ? o : i < o && t > i && t <= o ? t - 1 : i > o && t >= o && t < i ? t + 1 : t;
}
function bo(t, i = []) {
  const o = Dv(t.definition);
  return i.length === 0 ? o : [...i, ...o];
}
function pu(t, i) {
  return `index:${i}`;
}
function FS(t) {
  const i = t.trim().replace(/\s+/g, "_");
  return i === "" ? "state" : i;
}
function Ty(t, i, o) {
  const r = FS(i), s = new Set(t.states.map((d) => d.name));
  let u = Math.max(1, o), c = `${r}_${u}`;
  for (; s.has(c); )
    u += 1, c = `${r}_${u}`;
  return c;
}
function sh(t) {
  const i = /* @__PURE__ */ new Set();
  for (const o of t) {
    const r = o.trim();
    r !== "" && i.add(r);
  }
  return [...i];
}
function Dy(t) {
  if (!t)
    return [];
  const i = [t.id];
  for (const o of t.workflow?.nodes ?? [])
    i.push(o.id);
  return sh(i);
}
function WS(t, i) {
  return t.definition.states !== i.definition.states || t.definition.transitions !== i.definition.transitions;
}
function JS(t, i) {
  if (t.definition.states !== i.definition.states)
    return [];
  if (t.definition.transitions === i.definition.transitions)
    return [];
  const o = t.definition.transitions, r = i.definition.transitions, s = [], u = Math.max(o.length, r.length);
  for (let c = 0; c < u; c += 1) {
    const d = o[c], m = r[c];
    d !== m && (s.push(...Dy(d)), s.push(...Dy(m)));
  }
  return sh(s);
}
function Ys(t) {
  const i = {};
  return t.definition.transitions.forEach((o, r) => {
    i[pu(o, r)] = {
      staticTo: o.to,
      dynamicTarget: o.dynamic_to ? He(o.dynamic_to) : void 0
    };
  }), i;
}
function jy(t, i, o) {
  const r = pu(i, o), s = t[r];
  if (s)
    return s;
  const u = {
    staticTo: i.to,
    dynamicTarget: i.dynamic_to ? He(i.dynamic_to) : void 0
  };
  return t[r] = u, u;
}
function PS(t, i) {
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
function tu(t, i, o, r = []) {
  const s = Lr(i, t.length), u = t[s], c = Hr(u.document);
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
function qs(t) {
  return t.workflow || (t.workflow = { nodes: [] }), Array.isArray(t.workflow.nodes) || (t.workflow.nodes = []), t;
}
function xt(t, i, o, r, s = {}) {
  t.setState((u) => {
    const c = Hv(
      {
        document: u.document,
        targetCache: u.targetCache
      },
      (w) => {
        o(w.document, u, w.targetCache);
      }
    ), d = c.document, m = c.targetCache, p = WS(u.document, d), g = s.diagnosticsResolver ? s.diagnosticsResolver(d, u) : p ? bo(d) : u.diagnostics, y = r ? r(d, u) : u.selection;
    let v = u.pendingValidationNodeIDs;
    if (s.resetValidationScope)
      v = [];
    else if (p) {
      const w = u.document.definition.states !== d.definition.states, _ = u.document.definition.transitions !== d.definition.transitions, T = JS(u.document, d);
      w || _ && T.length === 0 ? v = [] : T.length > 0 && (v = sh([...u.pendingValidationNodeIDs, ...T]));
    }
    const x = u.history.slice(0, u.historyIndex + 1);
    return x.push({
      document: d,
      selection: y,
      diagnostics: g,
      targetCache: m,
      transaction: i
    }), tu(x, x.length - 1, u.baselineHash, v);
  });
}
function $s(t) {
  return t.states.length === 0 ? "" : t.states[0]?.name ?? "";
}
function Ay(t, i) {
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
function Oy(t, i, o) {
  const r = gu(t.ui_schema);
  r[bn(i)] = {
    x: o.x,
    y: o.y
  }, t.ui_schema = lh(t.ui_schema, r);
}
function zy(t, i) {
  t.ui_schema = lh(t.ui_schema, i);
}
function eE(t = {}) {
  const i = He(t.document ?? Xr()), o = { kind: "machine" }, r = bo(i, t.diagnostics), s = Ys(i), u = Hr(i), c = [
    {
      document: i,
      selection: o,
      diagnostics: r,
      targetCache: s,
      transaction: "init"
    }
  ], d = ih((m, p) => ({
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
    replaceDocument(g, y) {
      m(() => {
        const v = He(g), x = bo(v, y), w = Ys(v), _ = { kind: "machine" }, T = [
          {
            document: v,
            selection: _,
            diagnostics: x,
            targetCache: w,
            transaction: "replace-document"
          }
        ], A = Hr(v);
        return {
          document: v,
          selection: _,
          diagnostics: x,
          pendingValidationNodeIDs: [],
          targetCache: w,
          history: T,
          historyIndex: 0,
          baselineHash: A,
          isDirty: !1
        };
      });
    },
    restoreDocument(g, y) {
      xt(
        d,
        "restore-document",
        (v) => {
          const x = He(g);
          v.definition = x.definition, v.ui_schema = x.ui_schema, v.draft_state = x.draft_state;
          for (const [w, _] of Object.entries(x))
            w === "definition" || w === "ui_schema" || w === "draft_state" || (v[w] = _);
          for (const w of Object.keys(v))
            w in x || w === "definition" || w === "ui_schema" || w === "draft_state" || delete v[w];
        },
        () => ({ kind: "machine" }),
        {
          diagnosticsResolver: y ? (v) => bo(v, y) : void 0,
          resetValidationScope: !0
        }
      );
    },
    setDiagnostics(g) {
      m((y) => ({ diagnostics: bo(y.document, g), pendingValidationNodeIDs: [] }));
    },
    consumeValidationScopeNodeIDs() {
      const y = p().pendingValidationNodeIDs;
      return y.length > 0 && m({ pendingValidationNodeIDs: [] }), y;
    },
    focusDiagnostic(g) {
      m((y) => {
        const v = NS(y.document.definition, g);
        return v ? { selection: v } : y;
      });
    },
    setMachineName(g) {
      xt(d, "set-machine-name", (y) => {
        y.definition.name = g;
      });
    },
    addState() {
      xt(
        d,
        "add-state",
        (g) => {
          const y = Ty(g.definition, "state", g.definition.states.length + 1);
          g.definition.states.push({ name: y });
        },
        (g) => ({ kind: "state", stateIndex: Math.max(0, g.definition.states.length - 1) })
      );
    },
    addStateFromPalette(g) {
      xt(
        d,
        "add-state-from-palette",
        (y) => {
          const v = y.definition.states.length, w = {
            name: Ty(y.definition, g.namePrefix, v + 1)
          };
          g.initial && (y.definition.states.forEach((_) => {
            _.initial = !1;
          }), w.initial = !0), g.terminal && (w.terminal = !0), y.definition.states.push(w), g.position && Oy(y, v, g.position);
        },
        (y) => ({ kind: "state", stateIndex: Math.max(0, y.definition.states.length - 1) })
      );
    },
    removeState(g) {
      xt(
        d,
        "remove-state",
        (y) => {
          if (g < 0 || g >= y.definition.states.length)
            return;
          const v = y.definition.states[g]?.name;
          y.definition.states.splice(g, 1), v && y.definition.transitions.forEach((_) => {
            _.from === v && (_.from = $s(y.definition)), _.to === v && (_.to = $s(y.definition));
          });
          const x = gu(y.ui_schema), w = KS(x, g);
          y.ui_schema = lh(y.ui_schema, w);
        },
        (y, v) => y.definition.states.length === 0 ? { kind: "machine" } : { kind: "state", stateIndex: v.selection.kind === "state" ? Lr(Math.min(v.selection.stateIndex, g), y.definition.states.length) : Lr(g, y.definition.states.length) }
      );
    },
    moveState(g, y) {
      xt(
        d,
        "move-state",
        (v) => {
          const x = v.definition.states.length;
          if (x < 2 || g < 0 || g >= x || y < 0 || y >= x || g === y)
            return;
          My(v.definition.states, g, y);
          const w = gu(v.ui_schema), _ = QS(w, g, y);
          zy(v, _);
        },
        (v, x) => x.selection.kind === "state" ? {
          kind: "state",
          stateIndex: hd(x.selection.stateIndex, g, y)
        } : x.selection
      );
    },
    updateStateName(g, y) {
      xt(d, "update-state-name", (v) => {
        const x = v.definition.states[g];
        if (!x)
          return;
        const w = x.name;
        x.name = y, v.definition.transitions.forEach((_) => {
          _.from === w && (_.from = y), _.to === w && (_.to = y);
        });
      });
    },
    updateStateFlag(g, y, v) {
      xt(d, `update-state-${y}`, (x) => {
        const w = x.definition.states[g];
        w && (y === "initial" && v && x.definition.states.forEach((_) => {
          _.initial = !1;
        }), w[y] = v);
      });
    },
    addTransition() {
      xt(
        d,
        "add-transition",
        (g, y, v) => {
          const x = $s(g.definition), w = g.definition.states[1]?.name ?? x, _ = g.definition.transitions.length + 1, T = {
            id: `transition_${_}`,
            event: `event_${_}`,
            from: x,
            to: w,
            workflow: {
              nodes: [Ay("step", 0)]
            },
            metadata: {}
          };
          g.definition.transitions.push(T), v[pu(T, g.definition.transitions.length - 1)] = {
            staticTo: T.to
          };
        },
        (g) => ({ kind: "transition", transitionIndex: Math.max(0, g.definition.transitions.length - 1) })
      );
    },
    removeTransition(g) {
      xt(
        d,
        "remove-transition",
        (y, v, x) => {
          if (g < 0 || g >= y.definition.transitions.length)
            return;
          const w = y.definition.transitions[g];
          w && delete x[pu(w, g)], y.definition.transitions.splice(g, 1);
          const _ = PS(x, g);
          Object.keys(x).forEach((T) => {
            delete x[T];
          }), Object.assign(x, _);
        },
        (y) => y.definition.transitions.length === 0 ? { kind: "machine" } : {
          kind: "transition",
          transitionIndex: Lr(g, y.definition.transitions.length)
        }
      );
    },
    moveTransition(g, y) {
      xt(
        d,
        "move-transition",
        (v, x, w) => {
          const _ = v.definition.transitions.length;
          if (_ < 2 || g < 0 || g >= _ || y < 0 || y >= _ || g === y)
            return;
          My(v.definition.transitions, g, y);
          const T = Ys(v);
          Object.keys(w).forEach((A) => {
            delete w[A];
          }), Object.assign(w, T);
        },
        (v, x) => x.selection.kind === "transition" ? {
          kind: "transition",
          transitionIndex: hd(x.selection.transitionIndex, g, y)
        } : x.selection.kind === "workflow-node" ? {
          kind: "workflow-node",
          transitionIndex: hd(x.selection.transitionIndex, g, y),
          nodeIndex: x.selection.nodeIndex
        } : x.selection
      );
    },
    updateTransition(g, y, v) {
      xt(d, `update-transition-${y}`, (x, w, _) => {
        const T = x.definition.transitions[g];
        if (!T)
          return;
        const A = jy(_, T, g);
        if (y === "event") {
          T.event = v;
          return;
        }
        if (y === "from") {
          T.from = v;
          return;
        }
        if (y === "to") {
          T.to = v, A.staticTo = v;
          return;
        }
        if (y === "dynamic_to.resolver") {
          const O = {
            ...T.dynamic_to ?? A.dynamicTarget ?? { resolver: "" },
            resolver: v
          };
          T.dynamic_to = O, A.dynamicTarget = He(O);
        }
      });
    },
    updateTransitionTargetKind(g, y) {
      xt(d, "update-transition-target-kind", (v, x, w) => {
        const _ = v.definition.transitions[g];
        if (!_)
          return;
        const T = jy(w, _, g);
        if (_.to && _.to.trim() !== "" && (T.staticTo = _.to), _.dynamic_to?.resolver && _.dynamic_to.resolver.trim() !== "" && (T.dynamicTarget = He(_.dynamic_to)), y === "static") {
          _.dynamic_to = void 0;
          const A = T.staticTo?.trim() ?? "";
          _.to = A || $s(v.definition);
          return;
        }
        _.to = void 0, _.dynamic_to = He(T.dynamicTarget ?? { resolver: "" });
      });
    },
    addWorkflowNode(g, y) {
      xt(
        d,
        `add-${y}-workflow-node`,
        (v) => {
          const x = v.definition.transitions[g];
          if (!x)
            return;
          qs(x);
          const w = x.workflow.nodes.length;
          x.workflow.nodes.push(Ay(y, w));
        },
        (v) => {
          const x = v.definition.transitions[g];
          if (!x)
            return { kind: "machine" };
          const w = Math.max(0, x.workflow.nodes.length - 1);
          return { kind: "workflow-node", transitionIndex: g, nodeIndex: w };
        }
      );
    },
    removeWorkflowNode(g, y) {
      xt(
        d,
        "remove-workflow-node",
        (v) => {
          const x = v.definition.transitions[g];
          x && (qs(x), !(y < 0 || y >= x.workflow.nodes.length) && (x.workflow.nodes.splice(y, 1), x.workflow.nodes.forEach((w) => {
            Array.isArray(w.next) && (w.next = w.next.filter(
              (_) => x.workflow.nodes.some((T) => T.id === _)
            ));
          })));
        },
        (v) => {
          const x = v.definition.transitions[g];
          return !x || x.workflow.nodes.length === 0 ? { kind: "transition", transitionIndex: g } : {
            kind: "workflow-node",
            transitionIndex: g,
            nodeIndex: Lr(y, x.workflow.nodes.length)
          };
        }
      );
    },
    selectWorkflowNode(g, y) {
      m({ selection: { kind: "workflow-node", transitionIndex: g, nodeIndex: y } });
    },
    updateWorkflowNodeField(g, y, v, x) {
      xt(d, `update-workflow-node-${v}`, (w) => {
        const _ = w.definition.transitions[g];
        if (!_)
          return;
        qs(_);
        const T = _.workflow.nodes[y];
        if (T && ll(T.kind)) {
          if (v === "expr") {
            T.expr = String(x);
            return;
          }
          if (T.step = T.step ?? {
            action_id: "",
            async: !1,
            delay: "",
            timeout: "",
            metadata: {}
          }, v === "action_id") {
            T.step.action_id = String(x);
            return;
          }
          if (v === "async") {
            T.step.async = !!x;
            return;
          }
          if (v === "delay") {
            T.step.delay = String(x);
            return;
          }
          v === "timeout" && (T.step.timeout = String(x));
        }
      });
    },
    updateWorkflowNodeMetadata(g, y, v) {
      xt(d, "update-workflow-node-metadata", (x) => {
        const w = x.definition.transitions[g];
        if (!w)
          return;
        qs(w);
        const _ = w.workflow.nodes[y];
        _ && _.kind === "step" && (_.step = _.step ?? {
          action_id: "",
          async: !1,
          delay: "",
          timeout: "",
          metadata: {}
        }, _.step.metadata = He(v));
      });
    },
    setGraphNodePosition(g, y) {
      xt(d, "set-graph-node-position", (v) => {
        v.definition.states[g] && Oy(v, g, y);
      });
    },
    setGraphNodePositions(g) {
      xt(d, "set-graph-node-positions", (y) => {
        zy(y, g);
      });
    },
    undo() {
      const g = p();
      if (g.historyIndex === 0)
        return;
      const y = g.historyIndex - 1;
      m(tu(g.history, y, g.baselineHash, []));
    },
    redo() {
      const g = p();
      if (g.historyIndex >= g.history.length - 1)
        return;
      const y = g.historyIndex + 1;
      m(tu(g.history, y, g.baselineHash, []));
    },
    markSaved() {
      m((g) => ({
        baselineHash: Hr(g.document),
        isDirty: !1,
        pendingValidationNodeIDs: []
      }));
    },
    applyRemoteSave(g, y, v) {
      m((x) => {
        const w = Hv(x.document, (C) => {
          C.definition.version = g, C.draft_state = He(y);
        }), _ = bo(w, v), T = Ys(w), A = {
          document: w,
          selection: x.selection,
          diagnostics: _,
          targetCache: T,
          transaction: "apply-remote-save"
        }, O = x.history.slice(0, x.historyIndex + 1);
        O.push(A);
        const N = Hr(w);
        return tu(O, O.length - 1, N, []);
      });
    }
  }));
  return d;
}
function ln(t) {
  return t !== null && typeof t == "object" && !Array.isArray(t) ? t : null;
}
function st(t, i, o = "") {
  for (const r of i) {
    const s = t[r];
    if (typeof s == "string")
      return s;
  }
  return o;
}
function Br(t, i) {
  for (const o of i) {
    const r = t[o];
    if (typeof r == "number" && Number.isFinite(r))
      return r;
  }
}
function Fr(t, i, o = !1) {
  for (const r of i) {
    const s = t[r];
    if (typeof s == "boolean")
      return s;
  }
  return o;
}
function tE(t, i) {
  for (const o of i) {
    const r = t[o];
    if (typeof r == "boolean")
      return r;
  }
}
function nE(t, i) {
  for (const o of i) {
    const r = t[o];
    if (Array.isArray(r))
      return r.filter((s) => typeof s == "string");
  }
}
function ba(t, i) {
  for (const o of i) {
    const r = t[o], s = ln(r);
    if (s)
      return { ...s };
  }
}
function Ry(t) {
  if (typeof t == "number")
    return t / 1e6;
}
function iE(t) {
  const i = ln(t) ?? {};
  return {
    kind: st(i, ["kind", "Kind"]),
    to: st(i, ["to", "To"]) || void 0,
    resolver: st(i, ["resolver", "Resolver"]) || void 0,
    resolved: Fr(i, ["resolved", "Resolved"]),
    resolvedTo: st(i, ["resolvedTo", "ResolvedTo"]) || void 0,
    candidates: nE(i, ["candidates", "Candidates"])
  };
}
function aE(t) {
  const i = ln(t) ?? {}, o = i.rejections ?? i.Rejections, r = Array.isArray(o) ? o.map((s) => oE(s)) : void 0;
  return {
    id: st(i, ["id", "ID"]),
    event: st(i, ["event", "Event"]),
    target: iE(i.target ?? i.Target),
    allowed: Fr(i, ["allowed", "Allowed"], !0),
    rejections: r,
    metadata: ba(i, ["metadata", "Metadata"])
  };
}
function oE(t) {
  const i = ln(t) ?? {};
  return {
    code: st(i, ["code", "Code"]),
    category: st(i, ["category", "Category"]),
    retryable: Fr(i, ["retryable", "Retryable"]),
    requiresAction: Fr(i, ["requiresAction", "RequiresAction"]),
    message: st(i, ["message", "Message"]),
    remediationHint: st(i, ["remediationHint", "RemediationHint"]) || void 0,
    metadata: ba(i, ["metadata", "Metadata"])
  };
}
function rE(t) {
  const i = ln(t) ?? {}, o = st(i, ["kind", "Kind"]), r = st(i, ["actionId", "ActionID"]);
  if (o === "command" || r !== "") {
    const u = Br(i, ["delayMs", "DelayMs"]), c = Br(i, ["timeoutMs", "TimeoutMs"]), d = u ?? Ry(Br(i, ["Delay", "delay"])), m = c ?? Ry(Br(i, ["Timeout", "timeout"])), p = {
      kind: "command",
      actionId: r,
      payload: ba(i, ["payload", "Payload"]) ?? {},
      async: Fr(i, ["async", "Async"]),
      metadata: ba(i, ["metadata", "Metadata"])
    };
    return d !== void 0 && (p.delayMs = d), m !== void 0 && (p.timeoutMs = m), p;
  }
  return {
    kind: "emit_event",
    event: st(i, ["event", "Event"]),
    msg: i.msg ?? i.Msg,
    metadata: ba(i, ["metadata", "Metadata"])
  };
}
function lE(t) {
  const i = ln(t) ?? {}, o = i.effects ?? i.Effects, r = Array.isArray(o) ? o.map((s) => rE(s)) : [];
  return {
    previousState: st(i, ["previousState", "PreviousState"]),
    currentState: st(i, ["currentState", "CurrentState"]),
    effects: r
  };
}
function Iv(t) {
  const i = ln(t) ?? {}, o = i.allowedTransitions ?? i.AllowedTransitions, r = Array.isArray(o) ? o.map((s) => aE(s)) : [];
  return {
    entityId: st(i, ["entityId", "EntityID"]),
    currentState: st(i, ["currentState", "CurrentState"]),
    allowedTransitions: r,
    metadata: ba(i, ["metadata", "Metadata"])
  };
}
function sE(t) {
  const i = ln(t) ?? {};
  return {
    executionId: st(i, ["executionId", "ExecutionID"]),
    policy: st(i, ["policy", "Policy"]) || void 0,
    status: st(i, ["status", "Status"]),
    metadata: ba(i, ["metadata", "Metadata"])
  };
}
function uE(t) {
  const i = ln(t);
  if (i && (i.error ?? i.Error))
    throw new Error("rpc apply event response contains error envelope");
  const o = i ? ln(i.result ?? i.Result) : null;
  if (o && (o.error ?? o.Error))
    throw new Error("rpc apply event response contains result error envelope");
  const r = i ? ln(i.data ?? i.Data) : null, s = o ? ln(o.data ?? o.Data) : null, u = r ?? s ?? o ?? i;
  if (!u)
    throw new Error("invalid apply event response: expected object envelope");
  const c = u.transition ?? u.Transition, d = u.snapshot ?? u.Snapshot;
  if (!c || !d)
    throw new Error("invalid apply event response: transition and snapshot are required");
  const m = u.execution ?? u.Execution;
  return {
    eventId: st(u, ["eventId", "EventID"]),
    version: Br(u, ["version", "Version"]) ?? 0,
    transition: lE(c),
    snapshot: Iv(d),
    execution: m ? sE(m) : void 0,
    idempotencyHit: tE(u, ["idempotencyHit", "IdempotencyHit"])
  };
}
function ky(t) {
  return t !== null && typeof t == "object" && !Array.isArray(t) ? t : null;
}
function cE(t) {
  const i = ky(t);
  if (!i)
    return t;
  const o = ky(i.result ?? i.Result);
  return o ? o.data ?? o.Data ?? o : i.data ?? i.Data ?? i;
}
function Vv(t) {
  return uE(t);
}
function Uv(t) {
  return Iv(cE(t));
}
function yu(t, i) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    level: t,
    message: i,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function fE(t) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    code: t.code,
    message: t.message,
    method: t.method,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function dE(t, i) {
  const o = Vv(t), r = o.execution?.status ?? "dry_run", s = {
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
      yu(
        "info",
        `Projected ${s.event}: ${s.previousState} -> ${s.currentState} (${s.status})`
      )
    ]
  };
}
function hE(t) {
  const i = Uv(t), o = i.allowedTransitions.filter((r) => !r.allowed);
  return {
    snapshotResult: i,
    blockedTransitions: o,
    log: [
      yu(
        "info",
        `Snapshot state ${i.currentState}, blocked transitions: ${o.length}`
      )
    ]
  };
}
function mE() {
  return ih((t) => ({
    applyEventResult: null,
    snapshotResult: null,
    projectedOutcome: null,
    blockedTransitions: [],
    errors: [],
    log: [],
    setApplyEventWirePayload(i, o) {
      const r = dE(i, o);
      t((s) => ({
        applyEventResult: r.applyEventResult,
        projectedOutcome: r.projectedOutcome,
        log: [...s.log, ...r.log]
      }));
    },
    setSnapshotWirePayload(i) {
      const o = hE(i);
      t((r) => ({
        snapshotResult: o.snapshotResult,
        blockedTransitions: o.blockedTransitions,
        log: [...r.log, ...o.log]
      }));
    },
    pushError(i) {
      t((o) => ({
        errors: [...o.errors, fE(i)],
        log: [...o.log, yu("error", `[${i.code}] ${i.message}`)]
      }));
    },
    pushInfo(i) {
      t((o) => ({
        log: [...o.log, yu("info", i)]
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
const Yv = "fsm-ui-builder.panel-layout", qv = "fsm-ui-builder.theme";
function $i(t, i, o) {
  return Number.isNaN(t) ? i : Math.min(Math.max(t, i), o);
}
function md() {
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
function ku() {
  return typeof window > "u" || typeof window.localStorage > "u" ? !1 : typeof window.localStorage.getItem == "function" && typeof window.localStorage.setItem == "function";
}
function gE() {
  if (!ku())
    return md();
  const t = window.localStorage.getItem(Yv);
  if (!t)
    return md();
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
    return md();
  }
}
function ha(t) {
  ku() && window.localStorage.setItem(Yv, JSON.stringify(t));
}
function pE() {
  return ku() && window.localStorage.getItem(qv) === "dark" ? "dark" : "light";
}
function Hy(t) {
  ku() && window.localStorage.setItem(qv, t);
}
function yE() {
  const t = gE(), i = pE();
  return ih((o) => ({
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
        return ha(c), c;
      });
    },
    setConsoleHeight(r) {
      o((s) => {
        const u = {
          ...s,
          consoleHeight: $i(r, 80, 300)
        };
        return ha(u), u;
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
        return ha(c), c;
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
        return ha(u), u;
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
        return ha(u), u;
      });
    },
    panCanvas(r, s) {
      o((u) => {
        const c = {
          ...u,
          canvasOffsetX: u.canvasOffsetX + r,
          canvasOffsetY: u.canvasOffsetY + s
        };
        return ha(c), c;
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
        return ha(s), s;
      });
    },
    setViewportMode(r) {
      o({ viewportMode: r });
    },
    setMobilePanel(r) {
      o({ mobilePanel: r });
    },
    setTheme(r) {
      Hy(r), o({ theme: r });
    },
    toggleTheme() {
      o((r) => {
        const s = r.theme === "light" ? "dark" : "light";
        return Hy(s), { theme: s };
      });
    }
  }));
}
const $v = X.createContext(null), Xv = X.createContext(null), Gv = X.createContext(null);
function vE(t) {
  const i = X.useRef(null), o = X.useRef(null), r = X.useRef(null);
  return i.current || (i.current = eE({
    document: t.initialDocument,
    diagnostics: t.initialDiagnostics
  })), o.current || (o.current = yE()), r.current || (r.current = mE()), /* @__PURE__ */ b.jsx($v.Provider, { value: i.current, children: /* @__PURE__ */ b.jsx(Xv.Provider, { value: o.current, children: /* @__PURE__ */ b.jsx(Gv.Provider, { value: r.current, children: t.children }) }) });
}
function uh(t, i) {
  if (!t)
    throw new Error(i);
  return t;
}
function be(t) {
  const i = uh(
    X.useContext($v),
    "Machine store context is missing. Wrap with BuilderStoresProvider."
  );
  return ah(i, t);
}
function qe(t) {
  const i = uh(
    X.useContext(Xv),
    "UI store context is missing. Wrap with BuilderStoresProvider."
  );
  return ah(i, t);
}
function Dt(t) {
  const i = uh(
    X.useContext(Gv),
    "Simulation store context is missing. Wrap with BuilderStoresProvider."
  );
  return ah(i, t);
}
function bE(t) {
  return t instanceof HTMLElement ? t.isContentEditable ? !0 : t.matches("input, textarea, select") : !1;
}
function Ly(t) {
  return t.kind === "machine" ? "machine" : t.kind === "state" ? `state:${t.stateIndex}` : t.kind === "transition" ? `transition:${t.transitionIndex}` : `workflow:${t.transitionIndex}:${t.nodeIndex}`;
}
function By(t, i, o) {
  const r = [{ kind: "machine" }];
  i.states.forEach((d, m) => {
    r.push({ kind: "state", stateIndex: m });
  }), i.transitions.forEach((d, m) => {
    r.push({ kind: "transition", transitionIndex: m }), d.workflow?.nodes?.forEach((p, g) => {
      r.push({ kind: "workflow-node", transitionIndex: m, nodeIndex: g });
    });
  });
  const s = r.findIndex((d) => Ly(d) === Ly(t)), u = s >= 0 ? s : 0, c = Math.min(Math.max(0, u + o), r.length - 1);
  return r[c] ?? { kind: "machine" };
}
function xE(t) {
  const i = be((y) => y.selection), o = be((y) => y.document.definition), r = be((y) => y.setSelection), s = be((y) => y.undo), u = be((y) => y.redo), c = be((y) => y.addState), d = be((y) => y.addTransition), m = qe((y) => y.zoomCanvas), p = qe((y) => y.resetCanvasView), g = qe((y) => y.panCanvas);
  X.useEffect(() => {
    const y = (v) => {
      const x = v.metaKey || v.ctrlKey, w = bE(v.target), _ = !!t.readOnly, T = v.key, A = T.toLowerCase();
      if (!!t.keyboardHelpOpen) {
        T === "Escape" && (v.preventDefault(), t.onCloseKeyboardHelp?.());
        return;
      }
      if (x && A === "s") {
        v.preventDefault(), _ || t.onSave?.();
        return;
      }
      if (x && T === "Enter") {
        v.preventDefault(), _ || t.onValidate?.();
        return;
      }
      if (x && A === "z") {
        if (w)
          return;
        v.preventDefault(), _ || (v.shiftKey ? u() : s());
        return;
      }
      if (x && A === "y") {
        if (w)
          return;
        v.preventDefault(), _ || u();
        return;
      }
      if (x && T === "1") {
        v.preventDefault(), t.onFocusPanel?.("explorer");
        return;
      }
      if (x && T === "2") {
        v.preventDefault(), t.onFocusPanel?.("canvas");
        return;
      }
      if (x && T === "3") {
        v.preventDefault(), t.onFocusPanel?.("inspector");
        return;
      }
      if (x && T === "`") {
        v.preventDefault(), t.onToggleConsole ? t.onToggleConsole() : t.onFocusPanel?.("console");
        return;
      }
      if (!x && !w && T === "?") {
        v.preventDefault(), t.onToggleKeyboardHelp?.();
        return;
      }
      if (x && (T === "+" || T === "=")) {
        v.preventDefault(), m(0.1);
        return;
      }
      if (x && T === "-") {
        v.preventDefault(), m(-0.1);
        return;
      }
      if (x && T === "0") {
        v.preventDefault(), p();
        return;
      }
      if (v.altKey && !x && T.startsWith("Arrow")) {
        if (v.preventDefault(), T === "ArrowLeft") {
          g(-24, 0);
          return;
        }
        if (T === "ArrowRight") {
          g(24, 0);
          return;
        }
        if (T === "ArrowUp") {
          g(0, -24);
          return;
        }
        T === "ArrowDown" && g(0, 24);
        return;
      }
      if (!x && !w && T === "Escape") {
        v.preventDefault(), r({ kind: "machine" });
        return;
      }
      if (!x && !w && T === "ArrowDown") {
        v.preventDefault(), r(By(i, o, 1));
        return;
      }
      if (!x && !w && T === "ArrowUp") {
        v.preventDefault(), r(By(i, o, -1));
        return;
      }
      if (!x && !w && !_ && A === "n") {
        v.preventDefault(), c();
        return;
      }
      !x && !w && !_ && A === "t" && (v.preventDefault(), d());
    };
    return window.addEventListener("keydown", y), () => {
      window.removeEventListener("keydown", y);
    };
  }, [
    c,
    d,
    o,
    t,
    g,
    u,
    p,
    i,
    r,
    s,
    m
  ]);
}
function gd(t) {
  const i = qe((c) => c.explorerWidth), o = qe((c) => c.inspectorWidth), r = qe((c) => c.consoleHeight), s = qe((c) => c.setPanelWidth), u = qe((c) => c.setConsoleHeight);
  return X.useCallback(
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
        const y = g.clientX - d.pointerX;
        if (t === "explorer") {
          s("explorer", d.width + y);
          return;
        }
        s("inspector", d.width - y);
      }, p = () => {
        window.removeEventListener("pointermove", m), window.removeEventListener("pointerup", p);
      };
      window.addEventListener("pointermove", m), window.addEventListener("pointerup", p);
    },
    [r, i, o, t, u, s]
  );
}
function wE(t) {
  return t < 900 ? "mobile-readonly" : t <= 1200 ? "compact" : "desktop";
}
function SE() {
  const t = qe((o) => o.viewportMode), i = qe((o) => o.setViewportMode);
  return X.useEffect(() => {
    const o = () => {
      i(wE(window.innerWidth));
    };
    return o(), window.addEventListener("resize", o), () => {
      window.removeEventListener("resize", o);
    };
  }, [i]), t;
}
function pt(t) {
  if (typeof t == "string" || typeof t == "number") return "" + t;
  let i = "";
  if (Array.isArray(t))
    for (let o = 0, r; o < t.length; o++)
      (r = pt(t[o])) !== "" && (i += (i && " ") + r);
  else
    for (let o in t)
      t[o] && (i += (i && " ") + o);
  return i;
}
var EE = { value: () => {
} };
function Hu() {
  for (var t = 0, i = arguments.length, o = {}, r; t < i; ++t) {
    if (!(r = arguments[t] + "") || r in o || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    o[r] = [];
  }
  return new nu(o);
}
function nu(t) {
  this._ = t;
}
function _E(t, i) {
  return t.trim().split(/^|\s+/).map(function(o) {
    var r = "", s = o.indexOf(".");
    if (s >= 0 && (r = o.slice(s + 1), o = o.slice(0, s)), o && !i.hasOwnProperty(o)) throw new Error("unknown type: " + o);
    return { type: o, name: r };
  });
}
nu.prototype = Hu.prototype = {
  constructor: nu,
  on: function(t, i) {
    var o = this._, r = _E(t + "", o), s, u = -1, c = r.length;
    if (arguments.length < 2) {
      for (; ++u < c; ) if ((s = (t = r[u]).type) && (s = NE(o[s], t.name))) return s;
      return;
    }
    if (i != null && typeof i != "function") throw new Error("invalid callback: " + i);
    for (; ++u < c; )
      if (s = (t = r[u]).type) o[s] = Iy(o[s], t.name, i);
      else if (i == null) for (s in o) o[s] = Iy(o[s], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, i = this._;
    for (var o in i) t[o] = i[o].slice();
    return new nu(t);
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
function NE(t, i) {
  for (var o = 0, r = t.length, s; o < r; ++o)
    if ((s = t[o]).name === i)
      return s.value;
}
function Iy(t, i, o) {
  for (var r = 0, s = t.length; r < s; ++r)
    if (t[r].name === i) {
      t[r] = EE, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return o != null && t.push({ name: i, value: o }), t;
}
var Vd = "http://www.w3.org/1999/xhtml";
const Vy = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Vd,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Lu(t) {
  var i = t += "", o = i.indexOf(":");
  return o >= 0 && (i = t.slice(0, o)) !== "xmlns" && (t = t.slice(o + 1)), Vy.hasOwnProperty(i) ? { space: Vy[i], local: t } : t;
}
function CE(t) {
  return function() {
    var i = this.ownerDocument, o = this.namespaceURI;
    return o === Vd && i.documentElement.namespaceURI === Vd ? i.createElement(t) : i.createElementNS(o, t);
  };
}
function ME(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Zv(t) {
  var i = Lu(t);
  return (i.local ? ME : CE)(i);
}
function TE() {
}
function ch(t) {
  return t == null ? TE : function() {
    return this.querySelector(t);
  };
}
function DE(t) {
  typeof t != "function" && (t = ch(t));
  for (var i = this._groups, o = i.length, r = new Array(o), s = 0; s < o; ++s)
    for (var u = i[s], c = u.length, d = r[s] = new Array(c), m, p, g = 0; g < c; ++g)
      (m = u[g]) && (p = t.call(m, m.__data__, g, u)) && ("__data__" in m && (p.__data__ = m.__data__), d[g] = p);
  return new Ft(r, this._parents);
}
function jE(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function AE() {
  return [];
}
function Kv(t) {
  return t == null ? AE : function() {
    return this.querySelectorAll(t);
  };
}
function OE(t) {
  return function() {
    return jE(t.apply(this, arguments));
  };
}
function zE(t) {
  typeof t == "function" ? t = OE(t) : t = Kv(t);
  for (var i = this._groups, o = i.length, r = [], s = [], u = 0; u < o; ++u)
    for (var c = i[u], d = c.length, m, p = 0; p < d; ++p)
      (m = c[p]) && (r.push(t.call(m, m.__data__, p, c)), s.push(m));
  return new Ft(r, s);
}
function Qv(t) {
  return function() {
    return this.matches(t);
  };
}
function Fv(t) {
  return function(i) {
    return i.matches(t);
  };
}
var RE = Array.prototype.find;
function kE(t) {
  return function() {
    return RE.call(this.children, t);
  };
}
function HE() {
  return this.firstElementChild;
}
function LE(t) {
  return this.select(t == null ? HE : kE(typeof t == "function" ? t : Fv(t)));
}
var BE = Array.prototype.filter;
function IE() {
  return Array.from(this.children);
}
function VE(t) {
  return function() {
    return BE.call(this.children, t);
  };
}
function UE(t) {
  return this.selectAll(t == null ? IE : VE(typeof t == "function" ? t : Fv(t)));
}
function YE(t) {
  typeof t != "function" && (t = Qv(t));
  for (var i = this._groups, o = i.length, r = new Array(o), s = 0; s < o; ++s)
    for (var u = i[s], c = u.length, d = r[s] = [], m, p = 0; p < c; ++p)
      (m = u[p]) && t.call(m, m.__data__, p, u) && d.push(m);
  return new Ft(r, this._parents);
}
function Wv(t) {
  return new Array(t.length);
}
function qE() {
  return new Ft(this._enter || this._groups.map(Wv), this._parents);
}
function vu(t, i) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = i;
}
vu.prototype = {
  constructor: vu,
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
function $E(t) {
  return function() {
    return t;
  };
}
function XE(t, i, o, r, s, u) {
  for (var c = 0, d, m = i.length, p = u.length; c < p; ++c)
    (d = i[c]) ? (d.__data__ = u[c], r[c] = d) : o[c] = new vu(t, u[c]);
  for (; c < m; ++c)
    (d = i[c]) && (s[c] = d);
}
function GE(t, i, o, r, s, u, c) {
  var d, m, p = /* @__PURE__ */ new Map(), g = i.length, y = u.length, v = new Array(g), x;
  for (d = 0; d < g; ++d)
    (m = i[d]) && (v[d] = x = c.call(m, m.__data__, d, i) + "", p.has(x) ? s[d] = m : p.set(x, m));
  for (d = 0; d < y; ++d)
    x = c.call(t, u[d], d, u) + "", (m = p.get(x)) ? (r[d] = m, m.__data__ = u[d], p.delete(x)) : o[d] = new vu(t, u[d]);
  for (d = 0; d < g; ++d)
    (m = i[d]) && p.get(v[d]) === m && (s[d] = m);
}
function ZE(t) {
  return t.__data__;
}
function KE(t, i) {
  if (!arguments.length) return Array.from(this, ZE);
  var o = i ? GE : XE, r = this._parents, s = this._groups;
  typeof t != "function" && (t = $E(t));
  for (var u = s.length, c = new Array(u), d = new Array(u), m = new Array(u), p = 0; p < u; ++p) {
    var g = r[p], y = s[p], v = y.length, x = QE(t.call(g, g && g.__data__, p, r)), w = x.length, _ = d[p] = new Array(w), T = c[p] = new Array(w), A = m[p] = new Array(v);
    o(g, y, _, T, A, x, i);
    for (var O = 0, N = 0, C, I; O < w; ++O)
      if (C = _[O]) {
        for (O >= N && (N = O + 1); !(I = T[N]) && ++N < w; ) ;
        C._next = I || null;
      }
  }
  return c = new Ft(c, r), c._enter = d, c._exit = m, c;
}
function QE(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function FE() {
  return new Ft(this._exit || this._groups.map(Wv), this._parents);
}
function WE(t, i, o) {
  var r = this.enter(), s = this, u = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), i != null && (s = i(s), s && (s = s.selection())), o == null ? u.remove() : o(u), r && s ? r.merge(s).order() : s;
}
function JE(t) {
  for (var i = t.selection ? t.selection() : t, o = this._groups, r = i._groups, s = o.length, u = r.length, c = Math.min(s, u), d = new Array(s), m = 0; m < c; ++m)
    for (var p = o[m], g = r[m], y = p.length, v = d[m] = new Array(y), x, w = 0; w < y; ++w)
      (x = p[w] || g[w]) && (v[w] = x);
  for (; m < s; ++m)
    d[m] = o[m];
  return new Ft(d, this._parents);
}
function PE() {
  for (var t = this._groups, i = -1, o = t.length; ++i < o; )
    for (var r = t[i], s = r.length - 1, u = r[s], c; --s >= 0; )
      (c = r[s]) && (u && c.compareDocumentPosition(u) ^ 4 && u.parentNode.insertBefore(c, u), u = c);
  return this;
}
function e_(t) {
  t || (t = t_);
  function i(y, v) {
    return y && v ? t(y.__data__, v.__data__) : !y - !v;
  }
  for (var o = this._groups, r = o.length, s = new Array(r), u = 0; u < r; ++u) {
    for (var c = o[u], d = c.length, m = s[u] = new Array(d), p, g = 0; g < d; ++g)
      (p = c[g]) && (m[g] = p);
    m.sort(i);
  }
  return new Ft(s, this._parents).order();
}
function t_(t, i) {
  return t < i ? -1 : t > i ? 1 : t >= i ? 0 : NaN;
}
function n_() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function i_() {
  return Array.from(this);
}
function a_() {
  for (var t = this._groups, i = 0, o = t.length; i < o; ++i)
    for (var r = t[i], s = 0, u = r.length; s < u; ++s) {
      var c = r[s];
      if (c) return c;
    }
  return null;
}
function o_() {
  let t = 0;
  for (const i of this) ++t;
  return t;
}
function r_() {
  return !this.node();
}
function l_(t) {
  for (var i = this._groups, o = 0, r = i.length; o < r; ++o)
    for (var s = i[o], u = 0, c = s.length, d; u < c; ++u)
      (d = s[u]) && t.call(d, d.__data__, u, s);
  return this;
}
function s_(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function u_(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function c_(t, i) {
  return function() {
    this.setAttribute(t, i);
  };
}
function f_(t, i) {
  return function() {
    this.setAttributeNS(t.space, t.local, i);
  };
}
function d_(t, i) {
  return function() {
    var o = i.apply(this, arguments);
    o == null ? this.removeAttribute(t) : this.setAttribute(t, o);
  };
}
function h_(t, i) {
  return function() {
    var o = i.apply(this, arguments);
    o == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, o);
  };
}
function m_(t, i) {
  var o = Lu(t);
  if (arguments.length < 2) {
    var r = this.node();
    return o.local ? r.getAttributeNS(o.space, o.local) : r.getAttribute(o);
  }
  return this.each((i == null ? o.local ? u_ : s_ : typeof i == "function" ? o.local ? h_ : d_ : o.local ? f_ : c_)(o, i));
}
function Jv(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function g_(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function p_(t, i, o) {
  return function() {
    this.style.setProperty(t, i, o);
  };
}
function y_(t, i, o) {
  return function() {
    var r = i.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, o);
  };
}
function v_(t, i, o) {
  return arguments.length > 1 ? this.each((i == null ? g_ : typeof i == "function" ? y_ : p_)(t, i, o ?? "")) : No(this.node(), t);
}
function No(t, i) {
  return t.style.getPropertyValue(i) || Jv(t).getComputedStyle(t, null).getPropertyValue(i);
}
function b_(t) {
  return function() {
    delete this[t];
  };
}
function x_(t, i) {
  return function() {
    this[t] = i;
  };
}
function w_(t, i) {
  return function() {
    var o = i.apply(this, arguments);
    o == null ? delete this[t] : this[t] = o;
  };
}
function S_(t, i) {
  return arguments.length > 1 ? this.each((i == null ? b_ : typeof i == "function" ? w_ : x_)(t, i)) : this.node()[t];
}
function Pv(t) {
  return t.trim().split(/^|\s+/);
}
function fh(t) {
  return t.classList || new eb(t);
}
function eb(t) {
  this._node = t, this._names = Pv(t.getAttribute("class") || "");
}
eb.prototype = {
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
function tb(t, i) {
  for (var o = fh(t), r = -1, s = i.length; ++r < s; ) o.add(i[r]);
}
function nb(t, i) {
  for (var o = fh(t), r = -1, s = i.length; ++r < s; ) o.remove(i[r]);
}
function E_(t) {
  return function() {
    tb(this, t);
  };
}
function __(t) {
  return function() {
    nb(this, t);
  };
}
function N_(t, i) {
  return function() {
    (i.apply(this, arguments) ? tb : nb)(this, t);
  };
}
function C_(t, i) {
  var o = Pv(t + "");
  if (arguments.length < 2) {
    for (var r = fh(this.node()), s = -1, u = o.length; ++s < u; ) if (!r.contains(o[s])) return !1;
    return !0;
  }
  return this.each((typeof i == "function" ? N_ : i ? E_ : __)(o, i));
}
function M_() {
  this.textContent = "";
}
function T_(t) {
  return function() {
    this.textContent = t;
  };
}
function D_(t) {
  return function() {
    var i = t.apply(this, arguments);
    this.textContent = i ?? "";
  };
}
function j_(t) {
  return arguments.length ? this.each(t == null ? M_ : (typeof t == "function" ? D_ : T_)(t)) : this.node().textContent;
}
function A_() {
  this.innerHTML = "";
}
function O_(t) {
  return function() {
    this.innerHTML = t;
  };
}
function z_(t) {
  return function() {
    var i = t.apply(this, arguments);
    this.innerHTML = i ?? "";
  };
}
function R_(t) {
  return arguments.length ? this.each(t == null ? A_ : (typeof t == "function" ? z_ : O_)(t)) : this.node().innerHTML;
}
function k_() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function H_() {
  return this.each(k_);
}
function L_() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function B_() {
  return this.each(L_);
}
function I_(t) {
  var i = typeof t == "function" ? t : Zv(t);
  return this.select(function() {
    return this.appendChild(i.apply(this, arguments));
  });
}
function V_() {
  return null;
}
function U_(t, i) {
  var o = typeof t == "function" ? t : Zv(t), r = i == null ? V_ : typeof i == "function" ? i : ch(i);
  return this.select(function() {
    return this.insertBefore(o.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function Y_() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function q_() {
  return this.each(Y_);
}
function $_() {
  var t = this.cloneNode(!1), i = this.parentNode;
  return i ? i.insertBefore(t, this.nextSibling) : t;
}
function X_() {
  var t = this.cloneNode(!0), i = this.parentNode;
  return i ? i.insertBefore(t, this.nextSibling) : t;
}
function G_(t) {
  return this.select(t ? X_ : $_);
}
function Z_(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function K_(t) {
  return function(i) {
    t.call(this, i, this.__data__);
  };
}
function Q_(t) {
  return t.trim().split(/^|\s+/).map(function(i) {
    var o = "", r = i.indexOf(".");
    return r >= 0 && (o = i.slice(r + 1), i = i.slice(0, r)), { type: i, name: o };
  });
}
function F_(t) {
  return function() {
    var i = this.__on;
    if (i) {
      for (var o = 0, r = -1, s = i.length, u; o < s; ++o)
        u = i[o], (!t.type || u.type === t.type) && u.name === t.name ? this.removeEventListener(u.type, u.listener, u.options) : i[++r] = u;
      ++r ? i.length = r : delete this.__on;
    }
  };
}
function W_(t, i, o) {
  return function() {
    var r = this.__on, s, u = K_(i);
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
function J_(t, i, o) {
  var r = Q_(t + ""), s, u = r.length, c;
  if (arguments.length < 2) {
    var d = this.node().__on;
    if (d) {
      for (var m = 0, p = d.length, g; m < p; ++m)
        for (s = 0, g = d[m]; s < u; ++s)
          if ((c = r[s]).type === g.type && c.name === g.name)
            return g.value;
    }
    return;
  }
  for (d = i ? W_ : F_, s = 0; s < u; ++s) this.each(d(r[s], i, o));
  return this;
}
function ib(t, i, o) {
  var r = Jv(t), s = r.CustomEvent;
  typeof s == "function" ? s = new s(i, o) : (s = r.document.createEvent("Event"), o ? (s.initEvent(i, o.bubbles, o.cancelable), s.detail = o.detail) : s.initEvent(i, !1, !1)), t.dispatchEvent(s);
}
function P_(t, i) {
  return function() {
    return ib(this, t, i);
  };
}
function eN(t, i) {
  return function() {
    return ib(this, t, i.apply(this, arguments));
  };
}
function tN(t, i) {
  return this.each((typeof i == "function" ? eN : P_)(t, i));
}
function* nN() {
  for (var t = this._groups, i = 0, o = t.length; i < o; ++i)
    for (var r = t[i], s = 0, u = r.length, c; s < u; ++s)
      (c = r[s]) && (yield c);
}
var ab = [null];
function Ft(t, i) {
  this._groups = t, this._parents = i;
}
function cl() {
  return new Ft([[document.documentElement]], ab);
}
function iN() {
  return this;
}
Ft.prototype = cl.prototype = {
  constructor: Ft,
  select: DE,
  selectAll: zE,
  selectChild: LE,
  selectChildren: UE,
  filter: YE,
  data: KE,
  enter: qE,
  exit: FE,
  join: WE,
  merge: JE,
  selection: iN,
  order: PE,
  sort: e_,
  call: n_,
  nodes: i_,
  node: a_,
  size: o_,
  empty: r_,
  each: l_,
  attr: m_,
  style: v_,
  property: S_,
  classed: C_,
  text: j_,
  html: R_,
  raise: H_,
  lower: B_,
  append: I_,
  insert: U_,
  remove: q_,
  clone: G_,
  datum: Z_,
  on: J_,
  dispatch: tN,
  [Symbol.iterator]: nN
};
function Kt(t) {
  return typeof t == "string" ? new Ft([[document.querySelector(t)]], [document.documentElement]) : new Ft([[t]], ab);
}
function aN(t) {
  let i;
  for (; i = t.sourceEvent; ) t = i;
  return t;
}
function mn(t, i) {
  if (t = aN(t), i === void 0 && (i = t.currentTarget), i) {
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
const oN = { passive: !1 }, Wr = { capture: !0, passive: !1 };
function pd(t) {
  t.stopImmediatePropagation();
}
function So(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function ob(t) {
  var i = t.document.documentElement, o = Kt(t).on("dragstart.drag", So, Wr);
  "onselectstart" in i ? o.on("selectstart.drag", So, Wr) : (i.__noselect = i.style.MozUserSelect, i.style.MozUserSelect = "none");
}
function rb(t, i) {
  var o = t.document.documentElement, r = Kt(t).on("dragstart.drag", null);
  i && (r.on("click.drag", So, Wr), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in o ? r.on("selectstart.drag", null) : (o.style.MozUserSelect = o.__noselect, delete o.__noselect);
}
const Xs = (t) => () => t;
function Ud(t, {
  sourceEvent: i,
  subject: o,
  target: r,
  identifier: s,
  active: u,
  x: c,
  y: d,
  dx: m,
  dy: p,
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
    dy: { value: p, enumerable: !0, configurable: !0 },
    _: { value: g }
  });
}
Ud.prototype.on = function() {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function rN(t) {
  return !t.ctrlKey && !t.button;
}
function lN() {
  return this.parentNode;
}
function sN(t, i) {
  return i ?? { x: t.x, y: t.y };
}
function uN() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function lb() {
  var t = rN, i = lN, o = sN, r = uN, s = {}, u = Hu("start", "drag", "end"), c = 0, d, m, p, g, y = 0;
  function v(C) {
    C.on("mousedown.drag", x).filter(r).on("touchstart.drag", T).on("touchmove.drag", A, oN).on("touchend.drag touchcancel.drag", O).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function x(C, I) {
    if (!(g || !t.call(this, C, I))) {
      var L = N(this, i.call(this, C, I), C, I, "mouse");
      L && (Kt(C.view).on("mousemove.drag", w, Wr).on("mouseup.drag", _, Wr), ob(C.view), pd(C), p = !1, d = C.clientX, m = C.clientY, L("start", C));
    }
  }
  function w(C) {
    if (So(C), !p) {
      var I = C.clientX - d, L = C.clientY - m;
      p = I * I + L * L > y;
    }
    s.mouse("drag", C);
  }
  function _(C) {
    Kt(C.view).on("mousemove.drag mouseup.drag", null), rb(C.view, p), So(C), s.mouse("end", C);
  }
  function T(C, I) {
    if (t.call(this, C, I)) {
      var L = C.changedTouches, k = i.call(this, C, I), q = L.length, te, F;
      for (te = 0; te < q; ++te)
        (F = N(this, k, C, I, L[te].identifier, L[te])) && (pd(C), F("start", C, L[te]));
    }
  }
  function A(C) {
    var I = C.changedTouches, L = I.length, k, q;
    for (k = 0; k < L; ++k)
      (q = s[I[k].identifier]) && (So(C), q("drag", C, I[k]));
  }
  function O(C) {
    var I = C.changedTouches, L = I.length, k, q;
    for (g && clearTimeout(g), g = setTimeout(function() {
      g = null;
    }, 500), k = 0; k < L; ++k)
      (q = s[I[k].identifier]) && (pd(C), q("end", C, I[k]));
  }
  function N(C, I, L, k, q, te) {
    var F = u.copy(), Y = mn(te || L, I), Q, W, j;
    if ((j = o.call(C, new Ud("beforestart", {
      sourceEvent: L,
      target: v,
      identifier: q,
      active: c,
      x: Y[0],
      y: Y[1],
      dx: 0,
      dy: 0,
      dispatch: F
    }), k)) != null)
      return Q = j.x - Y[0] || 0, W = j.y - Y[1] || 0, function $(M, R, B) {
        var K = Y, ee;
        switch (M) {
          case "start":
            s[q] = $, ee = c++;
            break;
          case "end":
            delete s[q], --c;
          // falls through
          case "drag":
            Y = mn(B || R, I), ee = c;
            break;
        }
        F.call(
          M,
          C,
          new Ud(M, {
            sourceEvent: R,
            subject: j,
            target: v,
            identifier: q,
            active: ee,
            x: Y[0] + Q,
            y: Y[1] + W,
            dx: Y[0] - K[0],
            dy: Y[1] - K[1],
            dispatch: F
          }),
          k
        );
      };
  }
  return v.filter = function(C) {
    return arguments.length ? (t = typeof C == "function" ? C : Xs(!!C), v) : t;
  }, v.container = function(C) {
    return arguments.length ? (i = typeof C == "function" ? C : Xs(C), v) : i;
  }, v.subject = function(C) {
    return arguments.length ? (o = typeof C == "function" ? C : Xs(C), v) : o;
  }, v.touchable = function(C) {
    return arguments.length ? (r = typeof C == "function" ? C : Xs(!!C), v) : r;
  }, v.on = function() {
    var C = u.on.apply(u, arguments);
    return C === u ? v : C;
  }, v.clickDistance = function(C) {
    return arguments.length ? (y = (C = +C) * C, v) : Math.sqrt(y);
  }, v;
}
function dh(t, i, o) {
  t.prototype = i.prototype = o, o.constructor = t;
}
function sb(t, i) {
  var o = Object.create(t.prototype);
  for (var r in i) o[r] = i[r];
  return o;
}
function fl() {
}
var Jr = 0.7, bu = 1 / Jr, Eo = "\\s*([+-]?\\d+)\\s*", Pr = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", On = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", cN = /^#([0-9a-f]{3,8})$/, fN = new RegExp(`^rgb\\(${Eo},${Eo},${Eo}\\)$`), dN = new RegExp(`^rgb\\(${On},${On},${On}\\)$`), hN = new RegExp(`^rgba\\(${Eo},${Eo},${Eo},${Pr}\\)$`), mN = new RegExp(`^rgba\\(${On},${On},${On},${Pr}\\)$`), gN = new RegExp(`^hsl\\(${Pr},${On},${On}\\)$`), pN = new RegExp(`^hsla\\(${Pr},${On},${On},${Pr}\\)$`), Uy = {
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
dh(fl, _a, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Yy,
  // Deprecated! Use color.formatHex.
  formatHex: Yy,
  formatHex8: yN,
  formatHsl: vN,
  formatRgb: qy,
  toString: qy
});
function Yy() {
  return this.rgb().formatHex();
}
function yN() {
  return this.rgb().formatHex8();
}
function vN() {
  return ub(this).formatHsl();
}
function qy() {
  return this.rgb().formatRgb();
}
function _a(t) {
  var i, o;
  return t = (t + "").trim().toLowerCase(), (i = cN.exec(t)) ? (o = i[1].length, i = parseInt(i[1], 16), o === 6 ? $y(i) : o === 3 ? new It(i >> 8 & 15 | i >> 4 & 240, i >> 4 & 15 | i & 240, (i & 15) << 4 | i & 15, 1) : o === 8 ? Gs(i >> 24 & 255, i >> 16 & 255, i >> 8 & 255, (i & 255) / 255) : o === 4 ? Gs(i >> 12 & 15 | i >> 8 & 240, i >> 8 & 15 | i >> 4 & 240, i >> 4 & 15 | i & 240, ((i & 15) << 4 | i & 15) / 255) : null) : (i = fN.exec(t)) ? new It(i[1], i[2], i[3], 1) : (i = dN.exec(t)) ? new It(i[1] * 255 / 100, i[2] * 255 / 100, i[3] * 255 / 100, 1) : (i = hN.exec(t)) ? Gs(i[1], i[2], i[3], i[4]) : (i = mN.exec(t)) ? Gs(i[1] * 255 / 100, i[2] * 255 / 100, i[3] * 255 / 100, i[4]) : (i = gN.exec(t)) ? Zy(i[1], i[2] / 100, i[3] / 100, 1) : (i = pN.exec(t)) ? Zy(i[1], i[2] / 100, i[3] / 100, i[4]) : Uy.hasOwnProperty(t) ? $y(Uy[t]) : t === "transparent" ? new It(NaN, NaN, NaN, 0) : null;
}
function $y(t) {
  return new It(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function Gs(t, i, o, r) {
  return r <= 0 && (t = i = o = NaN), new It(t, i, o, r);
}
function bN(t) {
  return t instanceof fl || (t = _a(t)), t ? (t = t.rgb(), new It(t.r, t.g, t.b, t.opacity)) : new It();
}
function Yd(t, i, o, r) {
  return arguments.length === 1 ? bN(t) : new It(t, i, o, r ?? 1);
}
function It(t, i, o, r) {
  this.r = +t, this.g = +i, this.b = +o, this.opacity = +r;
}
dh(It, Yd, sb(fl, {
  brighter(t) {
    return t = t == null ? bu : Math.pow(bu, t), new It(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Jr : Math.pow(Jr, t), new It(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new It(xa(this.r), xa(this.g), xa(this.b), xu(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Xy,
  // Deprecated! Use color.formatHex.
  formatHex: Xy,
  formatHex8: xN,
  formatRgb: Gy,
  toString: Gy
}));
function Xy() {
  return `#${va(this.r)}${va(this.g)}${va(this.b)}`;
}
function xN() {
  return `#${va(this.r)}${va(this.g)}${va(this.b)}${va((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Gy() {
  const t = xu(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${xa(this.r)}, ${xa(this.g)}, ${xa(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function xu(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function xa(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function va(t) {
  return t = xa(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Zy(t, i, o, r) {
  return r <= 0 ? t = i = o = NaN : o <= 0 || o >= 1 ? t = i = NaN : i <= 0 && (t = NaN), new pn(t, i, o, r);
}
function ub(t) {
  if (t instanceof pn) return new pn(t.h, t.s, t.l, t.opacity);
  if (t instanceof fl || (t = _a(t)), !t) return new pn();
  if (t instanceof pn) return t;
  t = t.rgb();
  var i = t.r / 255, o = t.g / 255, r = t.b / 255, s = Math.min(i, o, r), u = Math.max(i, o, r), c = NaN, d = u - s, m = (u + s) / 2;
  return d ? (i === u ? c = (o - r) / d + (o < r) * 6 : o === u ? c = (r - i) / d + 2 : c = (i - o) / d + 4, d /= m < 0.5 ? u + s : 2 - u - s, c *= 60) : d = m > 0 && m < 1 ? 0 : c, new pn(c, d, m, t.opacity);
}
function wN(t, i, o, r) {
  return arguments.length === 1 ? ub(t) : new pn(t, i, o, r ?? 1);
}
function pn(t, i, o, r) {
  this.h = +t, this.s = +i, this.l = +o, this.opacity = +r;
}
dh(pn, wN, sb(fl, {
  brighter(t) {
    return t = t == null ? bu : Math.pow(bu, t), new pn(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Jr : Math.pow(Jr, t), new pn(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, i = isNaN(t) || isNaN(this.s) ? 0 : this.s, o = this.l, r = o + (o < 0.5 ? o : 1 - o) * i, s = 2 * o - r;
    return new It(
      yd(t >= 240 ? t - 240 : t + 120, s, r),
      yd(t, s, r),
      yd(t < 120 ? t + 240 : t - 120, s, r),
      this.opacity
    );
  },
  clamp() {
    return new pn(Ky(this.h), Zs(this.s), Zs(this.l), xu(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = xu(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Ky(this.h)}, ${Zs(this.s) * 100}%, ${Zs(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Ky(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function Zs(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function yd(t, i, o) {
  return (t < 60 ? i + (o - i) * t / 60 : t < 180 ? o : t < 240 ? i + (o - i) * (240 - t) / 60 : i) * 255;
}
const hh = (t) => () => t;
function SN(t, i) {
  return function(o) {
    return t + o * i;
  };
}
function EN(t, i, o) {
  return t = Math.pow(t, o), i = Math.pow(i, o) - t, o = 1 / o, function(r) {
    return Math.pow(t + r * i, o);
  };
}
function _N(t) {
  return (t = +t) == 1 ? cb : function(i, o) {
    return o - i ? EN(i, o, t) : hh(isNaN(i) ? o : i);
  };
}
function cb(t, i) {
  var o = i - t;
  return o ? SN(t, o) : hh(isNaN(t) ? i : t);
}
const wu = (function t(i) {
  var o = _N(i);
  function r(s, u) {
    var c = o((s = Yd(s)).r, (u = Yd(u)).r), d = o(s.g, u.g), m = o(s.b, u.b), p = cb(s.opacity, u.opacity);
    return function(g) {
      return s.r = c(g), s.g = d(g), s.b = m(g), s.opacity = p(g), s + "";
    };
  }
  return r.gamma = t, r;
})(1);
function NN(t, i) {
  i || (i = []);
  var o = t ? Math.min(i.length, t.length) : 0, r = i.slice(), s;
  return function(u) {
    for (s = 0; s < o; ++s) r[s] = t[s] * (1 - u) + i[s] * u;
    return r;
  };
}
function CN(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function MN(t, i) {
  var o = i ? i.length : 0, r = t ? Math.min(o, t.length) : 0, s = new Array(r), u = new Array(o), c;
  for (c = 0; c < r; ++c) s[c] = qr(t[c], i[c]);
  for (; c < o; ++c) u[c] = i[c];
  return function(d) {
    for (c = 0; c < r; ++c) u[c] = s[c](d);
    return u;
  };
}
function TN(t, i) {
  var o = /* @__PURE__ */ new Date();
  return t = +t, i = +i, function(r) {
    return o.setTime(t * (1 - r) + i * r), o;
  };
}
function Dn(t, i) {
  return t = +t, i = +i, function(o) {
    return t * (1 - o) + i * o;
  };
}
function DN(t, i) {
  var o = {}, r = {}, s;
  (t === null || typeof t != "object") && (t = {}), (i === null || typeof i != "object") && (i = {});
  for (s in i)
    s in t ? o[s] = qr(t[s], i[s]) : r[s] = i[s];
  return function(u) {
    for (s in o) r[s] = o[s](u);
    return r;
  };
}
var qd = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, vd = new RegExp(qd.source, "g");
function jN(t) {
  return function() {
    return t;
  };
}
function AN(t) {
  return function(i) {
    return t(i) + "";
  };
}
function fb(t, i) {
  var o = qd.lastIndex = vd.lastIndex = 0, r, s, u, c = -1, d = [], m = [];
  for (t = t + "", i = i + ""; (r = qd.exec(t)) && (s = vd.exec(i)); )
    (u = s.index) > o && (u = i.slice(o, u), d[c] ? d[c] += u : d[++c] = u), (r = r[0]) === (s = s[0]) ? d[c] ? d[c] += s : d[++c] = s : (d[++c] = null, m.push({ i: c, x: Dn(r, s) })), o = vd.lastIndex;
  return o < i.length && (u = i.slice(o), d[c] ? d[c] += u : d[++c] = u), d.length < 2 ? m[0] ? AN(m[0].x) : jN(i) : (i = m.length, function(p) {
    for (var g = 0, y; g < i; ++g) d[(y = m[g]).i] = y.x(p);
    return d.join("");
  });
}
function qr(t, i) {
  var o = typeof i, r;
  return i == null || o === "boolean" ? hh(i) : (o === "number" ? Dn : o === "string" ? (r = _a(i)) ? (i = r, wu) : fb : i instanceof _a ? wu : i instanceof Date ? TN : CN(i) ? NN : Array.isArray(i) ? MN : typeof i.valueOf != "function" && typeof i.toString != "function" || isNaN(i) ? DN : Dn)(t, i);
}
var Qy = 180 / Math.PI, $d = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function db(t, i, o, r, s, u) {
  var c, d, m;
  return (c = Math.sqrt(t * t + i * i)) && (t /= c, i /= c), (m = t * o + i * r) && (o -= t * m, r -= i * m), (d = Math.sqrt(o * o + r * r)) && (o /= d, r /= d, m /= d), t * r < i * o && (t = -t, i = -i, m = -m, c = -c), {
    translateX: s,
    translateY: u,
    rotate: Math.atan2(i, t) * Qy,
    skewX: Math.atan(m) * Qy,
    scaleX: c,
    scaleY: d
  };
}
var Ks;
function ON(t) {
  const i = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return i.isIdentity ? $d : db(i.a, i.b, i.c, i.d, i.e, i.f);
}
function zN(t) {
  return t == null || (Ks || (Ks = document.createElementNS("http://www.w3.org/2000/svg", "g")), Ks.setAttribute("transform", t), !(t = Ks.transform.baseVal.consolidate())) ? $d : (t = t.matrix, db(t.a, t.b, t.c, t.d, t.e, t.f));
}
function hb(t, i, o, r) {
  function s(p) {
    return p.length ? p.pop() + " " : "";
  }
  function u(p, g, y, v, x, w) {
    if (p !== y || g !== v) {
      var _ = x.push("translate(", null, i, null, o);
      w.push({ i: _ - 4, x: Dn(p, y) }, { i: _ - 2, x: Dn(g, v) });
    } else (y || v) && x.push("translate(" + y + i + v + o);
  }
  function c(p, g, y, v) {
    p !== g ? (p - g > 180 ? g += 360 : g - p > 180 && (p += 360), v.push({ i: y.push(s(y) + "rotate(", null, r) - 2, x: Dn(p, g) })) : g && y.push(s(y) + "rotate(" + g + r);
  }
  function d(p, g, y, v) {
    p !== g ? v.push({ i: y.push(s(y) + "skewX(", null, r) - 2, x: Dn(p, g) }) : g && y.push(s(y) + "skewX(" + g + r);
  }
  function m(p, g, y, v, x, w) {
    if (p !== y || g !== v) {
      var _ = x.push(s(x) + "scale(", null, ",", null, ")");
      w.push({ i: _ - 4, x: Dn(p, y) }, { i: _ - 2, x: Dn(g, v) });
    } else (y !== 1 || v !== 1) && x.push(s(x) + "scale(" + y + "," + v + ")");
  }
  return function(p, g) {
    var y = [], v = [];
    return p = t(p), g = t(g), u(p.translateX, p.translateY, g.translateX, g.translateY, y, v), c(p.rotate, g.rotate, y, v), d(p.skewX, g.skewX, y, v), m(p.scaleX, p.scaleY, g.scaleX, g.scaleY, y, v), p = g = null, function(x) {
      for (var w = -1, _ = v.length, T; ++w < _; ) y[(T = v[w]).i] = T.x(x);
      return y.join("");
    };
  };
}
var RN = hb(ON, "px, ", "px)", "deg)"), kN = hb(zN, ", ", ")", ")"), HN = 1e-12;
function Fy(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function LN(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function BN(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const iu = (function t(i, o, r) {
  function s(u, c) {
    var d = u[0], m = u[1], p = u[2], g = c[0], y = c[1], v = c[2], x = g - d, w = y - m, _ = x * x + w * w, T, A;
    if (_ < HN)
      A = Math.log(v / p) / i, T = function(k) {
        return [
          d + k * x,
          m + k * w,
          p * Math.exp(i * k * A)
        ];
      };
    else {
      var O = Math.sqrt(_), N = (v * v - p * p + r * _) / (2 * p * o * O), C = (v * v - p * p - r * _) / (2 * v * o * O), I = Math.log(Math.sqrt(N * N + 1) - N), L = Math.log(Math.sqrt(C * C + 1) - C);
      A = (L - I) / i, T = function(k) {
        var q = k * A, te = Fy(I), F = p / (o * O) * (te * BN(i * q + I) - LN(I));
        return [
          d + F * x,
          m + F * w,
          p * te / Fy(i * q + I)
        ];
      };
    }
    return T.duration = A * 1e3 * i / Math.SQRT2, T;
  }
  return s.rho = function(u) {
    var c = Math.max(1e-3, +u), d = c * c, m = d * d;
    return t(c, d, m);
  }, s;
})(Math.SQRT2, 2, 4);
var Co = 0, Ir = 0, Ar = 0, mb = 1e3, Su, Vr, Eu = 0, Na = 0, Bu = 0, el = typeof performance == "object" && performance.now ? performance : Date, gb = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function mh() {
  return Na || (gb(IN), Na = el.now() + Bu);
}
function IN() {
  Na = 0;
}
function _u() {
  this._call = this._time = this._next = null;
}
_u.prototype = pb.prototype = {
  constructor: _u,
  restart: function(t, i, o) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    o = (o == null ? mh() : +o) + (i == null ? 0 : +i), !this._next && Vr !== this && (Vr ? Vr._next = this : Su = this, Vr = this), this._call = t, this._time = o, Xd();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Xd());
  }
};
function pb(t, i, o) {
  var r = new _u();
  return r.restart(t, i, o), r;
}
function VN() {
  mh(), ++Co;
  for (var t = Su, i; t; )
    (i = Na - t._time) >= 0 && t._call.call(void 0, i), t = t._next;
  --Co;
}
function Wy() {
  Na = (Eu = el.now()) + Bu, Co = Ir = 0;
  try {
    VN();
  } finally {
    Co = 0, YN(), Na = 0;
  }
}
function UN() {
  var t = el.now(), i = t - Eu;
  i > mb && (Bu -= i, Eu = t);
}
function YN() {
  for (var t, i = Su, o, r = 1 / 0; i; )
    i._call ? (r > i._time && (r = i._time), t = i, i = i._next) : (o = i._next, i._next = null, i = t ? t._next = o : Su = o);
  Vr = t, Xd(r);
}
function Xd(t) {
  if (!Co) {
    Ir && (Ir = clearTimeout(Ir));
    var i = t - Na;
    i > 24 ? (t < 1 / 0 && (Ir = setTimeout(Wy, t - el.now() - Bu)), Ar && (Ar = clearInterval(Ar))) : (Ar || (Eu = el.now(), Ar = setInterval(UN, mb)), Co = 1, gb(Wy));
  }
}
function Jy(t, i, o) {
  var r = new _u();
  return i = i == null ? 0 : +i, r.restart((s) => {
    r.stop(), t(s + i);
  }, i, o), r;
}
var qN = Hu("start", "end", "cancel", "interrupt"), $N = [], yb = 0, Py = 1, Gd = 2, au = 3, e0 = 4, Zd = 5, ou = 6;
function Iu(t, i, o, r, s, u) {
  var c = t.__transition;
  if (!c) t.__transition = {};
  else if (o in c) return;
  XN(t, o, {
    name: i,
    index: r,
    // For context during callback.
    group: s,
    // For context during callback.
    on: qN,
    tween: $N,
    time: u.time,
    delay: u.delay,
    duration: u.duration,
    ease: u.ease,
    timer: null,
    state: yb
  });
}
function gh(t, i) {
  var o = wn(t, i);
  if (o.state > yb) throw new Error("too late; already scheduled");
  return o;
}
function Rn(t, i) {
  var o = wn(t, i);
  if (o.state > au) throw new Error("too late; already running");
  return o;
}
function wn(t, i) {
  var o = t.__transition;
  if (!o || !(o = o[i])) throw new Error("transition not found");
  return o;
}
function XN(t, i, o) {
  var r = t.__transition, s;
  r[i] = o, o.timer = pb(u, 0, o.time);
  function u(p) {
    o.state = Py, o.timer.restart(c, o.delay, o.time), o.delay <= p && c(p - o.delay);
  }
  function c(p) {
    var g, y, v, x;
    if (o.state !== Py) return m();
    for (g in r)
      if (x = r[g], x.name === o.name) {
        if (x.state === au) return Jy(c);
        x.state === e0 ? (x.state = ou, x.timer.stop(), x.on.call("interrupt", t, t.__data__, x.index, x.group), delete r[g]) : +g < i && (x.state = ou, x.timer.stop(), x.on.call("cancel", t, t.__data__, x.index, x.group), delete r[g]);
      }
    if (Jy(function() {
      o.state === au && (o.state = e0, o.timer.restart(d, o.delay, o.time), d(p));
    }), o.state = Gd, o.on.call("start", t, t.__data__, o.index, o.group), o.state === Gd) {
      for (o.state = au, s = new Array(v = o.tween.length), g = 0, y = -1; g < v; ++g)
        (x = o.tween[g].value.call(t, t.__data__, o.index, o.group)) && (s[++y] = x);
      s.length = y + 1;
    }
  }
  function d(p) {
    for (var g = p < o.duration ? o.ease.call(null, p / o.duration) : (o.timer.restart(m), o.state = Zd, 1), y = -1, v = s.length; ++y < v; )
      s[y].call(t, g);
    o.state === Zd && (o.on.call("end", t, t.__data__, o.index, o.group), m());
  }
  function m() {
    o.state = ou, o.timer.stop(), delete r[i];
    for (var p in r) return;
    delete t.__transition;
  }
}
function ru(t, i) {
  var o = t.__transition, r, s, u = !0, c;
  if (o) {
    i = i == null ? null : i + "";
    for (c in o) {
      if ((r = o[c]).name !== i) {
        u = !1;
        continue;
      }
      s = r.state > Gd && r.state < Zd, r.state = ou, r.timer.stop(), r.on.call(s ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete o[c];
    }
    u && delete t.__transition;
  }
}
function GN(t) {
  return this.each(function() {
    ru(this, t);
  });
}
function ZN(t, i) {
  var o, r;
  return function() {
    var s = Rn(this, t), u = s.tween;
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
function KN(t, i, o) {
  var r, s;
  if (typeof o != "function") throw new Error();
  return function() {
    var u = Rn(this, t), c = u.tween;
    if (c !== r) {
      s = (r = c).slice();
      for (var d = { name: i, value: o }, m = 0, p = s.length; m < p; ++m)
        if (s[m].name === i) {
          s[m] = d;
          break;
        }
      m === p && s.push(d);
    }
    u.tween = s;
  };
}
function QN(t, i) {
  var o = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = wn(this.node(), o).tween, s = 0, u = r.length, c; s < u; ++s)
      if ((c = r[s]).name === t)
        return c.value;
    return null;
  }
  return this.each((i == null ? ZN : KN)(o, t, i));
}
function ph(t, i, o) {
  var r = t._id;
  return t.each(function() {
    var s = Rn(this, r);
    (s.value || (s.value = {}))[i] = o.apply(this, arguments);
  }), function(s) {
    return wn(s, r).value[i];
  };
}
function vb(t, i) {
  var o;
  return (typeof i == "number" ? Dn : i instanceof _a ? wu : (o = _a(i)) ? (i = o, wu) : fb)(t, i);
}
function FN(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function WN(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function JN(t, i, o) {
  var r, s = o + "", u;
  return function() {
    var c = this.getAttribute(t);
    return c === s ? null : c === r ? u : u = i(r = c, o);
  };
}
function PN(t, i, o) {
  var r, s = o + "", u;
  return function() {
    var c = this.getAttributeNS(t.space, t.local);
    return c === s ? null : c === r ? u : u = i(r = c, o);
  };
}
function e2(t, i, o) {
  var r, s, u;
  return function() {
    var c, d = o(this), m;
    return d == null ? void this.removeAttribute(t) : (c = this.getAttribute(t), m = d + "", c === m ? null : c === r && m === s ? u : (s = m, u = i(r = c, d)));
  };
}
function t2(t, i, o) {
  var r, s, u;
  return function() {
    var c, d = o(this), m;
    return d == null ? void this.removeAttributeNS(t.space, t.local) : (c = this.getAttributeNS(t.space, t.local), m = d + "", c === m ? null : c === r && m === s ? u : (s = m, u = i(r = c, d)));
  };
}
function n2(t, i) {
  var o = Lu(t), r = o === "transform" ? kN : vb;
  return this.attrTween(t, typeof i == "function" ? (o.local ? t2 : e2)(o, r, ph(this, "attr." + t, i)) : i == null ? (o.local ? WN : FN)(o) : (o.local ? PN : JN)(o, r, i));
}
function i2(t, i) {
  return function(o) {
    this.setAttribute(t, i.call(this, o));
  };
}
function a2(t, i) {
  return function(o) {
    this.setAttributeNS(t.space, t.local, i.call(this, o));
  };
}
function o2(t, i) {
  var o, r;
  function s() {
    var u = i.apply(this, arguments);
    return u !== r && (o = (r = u) && a2(t, u)), o;
  }
  return s._value = i, s;
}
function r2(t, i) {
  var o, r;
  function s() {
    var u = i.apply(this, arguments);
    return u !== r && (o = (r = u) && i2(t, u)), o;
  }
  return s._value = i, s;
}
function l2(t, i) {
  var o = "attr." + t;
  if (arguments.length < 2) return (o = this.tween(o)) && o._value;
  if (i == null) return this.tween(o, null);
  if (typeof i != "function") throw new Error();
  var r = Lu(t);
  return this.tween(o, (r.local ? o2 : r2)(r, i));
}
function s2(t, i) {
  return function() {
    gh(this, t).delay = +i.apply(this, arguments);
  };
}
function u2(t, i) {
  return i = +i, function() {
    gh(this, t).delay = i;
  };
}
function c2(t) {
  var i = this._id;
  return arguments.length ? this.each((typeof t == "function" ? s2 : u2)(i, t)) : wn(this.node(), i).delay;
}
function f2(t, i) {
  return function() {
    Rn(this, t).duration = +i.apply(this, arguments);
  };
}
function d2(t, i) {
  return i = +i, function() {
    Rn(this, t).duration = i;
  };
}
function h2(t) {
  var i = this._id;
  return arguments.length ? this.each((typeof t == "function" ? f2 : d2)(i, t)) : wn(this.node(), i).duration;
}
function m2(t, i) {
  if (typeof i != "function") throw new Error();
  return function() {
    Rn(this, t).ease = i;
  };
}
function g2(t) {
  var i = this._id;
  return arguments.length ? this.each(m2(i, t)) : wn(this.node(), i).ease;
}
function p2(t, i) {
  return function() {
    var o = i.apply(this, arguments);
    if (typeof o != "function") throw new Error();
    Rn(this, t).ease = o;
  };
}
function y2(t) {
  if (typeof t != "function") throw new Error();
  return this.each(p2(this._id, t));
}
function v2(t) {
  typeof t != "function" && (t = Qv(t));
  for (var i = this._groups, o = i.length, r = new Array(o), s = 0; s < o; ++s)
    for (var u = i[s], c = u.length, d = r[s] = [], m, p = 0; p < c; ++p)
      (m = u[p]) && t.call(m, m.__data__, p, u) && d.push(m);
  return new ui(r, this._parents, this._name, this._id);
}
function b2(t) {
  if (t._id !== this._id) throw new Error();
  for (var i = this._groups, o = t._groups, r = i.length, s = o.length, u = Math.min(r, s), c = new Array(r), d = 0; d < u; ++d)
    for (var m = i[d], p = o[d], g = m.length, y = c[d] = new Array(g), v, x = 0; x < g; ++x)
      (v = m[x] || p[x]) && (y[x] = v);
  for (; d < r; ++d)
    c[d] = i[d];
  return new ui(c, this._parents, this._name, this._id);
}
function x2(t) {
  return (t + "").trim().split(/^|\s+/).every(function(i) {
    var o = i.indexOf(".");
    return o >= 0 && (i = i.slice(0, o)), !i || i === "start";
  });
}
function w2(t, i, o) {
  var r, s, u = x2(i) ? gh : Rn;
  return function() {
    var c = u(this, t), d = c.on;
    d !== r && (s = (r = d).copy()).on(i, o), c.on = s;
  };
}
function S2(t, i) {
  var o = this._id;
  return arguments.length < 2 ? wn(this.node(), o).on.on(t) : this.each(w2(o, t, i));
}
function E2(t) {
  return function() {
    var i = this.parentNode;
    for (var o in this.__transition) if (+o !== t) return;
    i && i.removeChild(this);
  };
}
function _2() {
  return this.on("end.remove", E2(this._id));
}
function N2(t) {
  var i = this._name, o = this._id;
  typeof t != "function" && (t = ch(t));
  for (var r = this._groups, s = r.length, u = new Array(s), c = 0; c < s; ++c)
    for (var d = r[c], m = d.length, p = u[c] = new Array(m), g, y, v = 0; v < m; ++v)
      (g = d[v]) && (y = t.call(g, g.__data__, v, d)) && ("__data__" in g && (y.__data__ = g.__data__), p[v] = y, Iu(p[v], i, o, v, p, wn(g, o)));
  return new ui(u, this._parents, i, o);
}
function C2(t) {
  var i = this._name, o = this._id;
  typeof t != "function" && (t = Kv(t));
  for (var r = this._groups, s = r.length, u = [], c = [], d = 0; d < s; ++d)
    for (var m = r[d], p = m.length, g, y = 0; y < p; ++y)
      if (g = m[y]) {
        for (var v = t.call(g, g.__data__, y, m), x, w = wn(g, o), _ = 0, T = v.length; _ < T; ++_)
          (x = v[_]) && Iu(x, i, o, _, v, w);
        u.push(v), c.push(g);
      }
  return new ui(u, c, i, o);
}
var M2 = cl.prototype.constructor;
function T2() {
  return new M2(this._groups, this._parents);
}
function D2(t, i) {
  var o, r, s;
  return function() {
    var u = No(this, t), c = (this.style.removeProperty(t), No(this, t));
    return u === c ? null : u === o && c === r ? s : s = i(o = u, r = c);
  };
}
function bb(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function j2(t, i, o) {
  var r, s = o + "", u;
  return function() {
    var c = No(this, t);
    return c === s ? null : c === r ? u : u = i(r = c, o);
  };
}
function A2(t, i, o) {
  var r, s, u;
  return function() {
    var c = No(this, t), d = o(this), m = d + "";
    return d == null && (m = d = (this.style.removeProperty(t), No(this, t))), c === m ? null : c === r && m === s ? u : (s = m, u = i(r = c, d));
  };
}
function O2(t, i) {
  var o, r, s, u = "style." + i, c = "end." + u, d;
  return function() {
    var m = Rn(this, t), p = m.on, g = m.value[u] == null ? d || (d = bb(i)) : void 0;
    (p !== o || s !== g) && (r = (o = p).copy()).on(c, s = g), m.on = r;
  };
}
function z2(t, i, o) {
  var r = (t += "") == "transform" ? RN : vb;
  return i == null ? this.styleTween(t, D2(t, r)).on("end.style." + t, bb(t)) : typeof i == "function" ? this.styleTween(t, A2(t, r, ph(this, "style." + t, i))).each(O2(this._id, t)) : this.styleTween(t, j2(t, r, i), o).on("end.style." + t, null);
}
function R2(t, i, o) {
  return function(r) {
    this.style.setProperty(t, i.call(this, r), o);
  };
}
function k2(t, i, o) {
  var r, s;
  function u() {
    var c = i.apply(this, arguments);
    return c !== s && (r = (s = c) && R2(t, c, o)), r;
  }
  return u._value = i, u;
}
function H2(t, i, o) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (i == null) return this.tween(r, null);
  if (typeof i != "function") throw new Error();
  return this.tween(r, k2(t, i, o ?? ""));
}
function L2(t) {
  return function() {
    this.textContent = t;
  };
}
function B2(t) {
  return function() {
    var i = t(this);
    this.textContent = i ?? "";
  };
}
function I2(t) {
  return this.tween("text", typeof t == "function" ? B2(ph(this, "text", t)) : L2(t == null ? "" : t + ""));
}
function V2(t) {
  return function(i) {
    this.textContent = t.call(this, i);
  };
}
function U2(t) {
  var i, o;
  function r() {
    var s = t.apply(this, arguments);
    return s !== o && (i = (o = s) && V2(s)), i;
  }
  return r._value = t, r;
}
function Y2(t) {
  var i = "text";
  if (arguments.length < 1) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  return this.tween(i, U2(t));
}
function q2() {
  for (var t = this._name, i = this._id, o = xb(), r = this._groups, s = r.length, u = 0; u < s; ++u)
    for (var c = r[u], d = c.length, m, p = 0; p < d; ++p)
      if (m = c[p]) {
        var g = wn(m, i);
        Iu(m, t, o, p, c, {
          time: g.time + g.delay + g.duration,
          delay: 0,
          duration: g.duration,
          ease: g.ease
        });
      }
  return new ui(r, this._parents, t, o);
}
function $2() {
  var t, i, o = this, r = o._id, s = o.size();
  return new Promise(function(u, c) {
    var d = { value: c }, m = { value: function() {
      --s === 0 && u();
    } };
    o.each(function() {
      var p = Rn(this, r), g = p.on;
      g !== t && (i = (t = g).copy(), i._.cancel.push(d), i._.interrupt.push(d), i._.end.push(m)), p.on = i;
    }), s === 0 && u();
  });
}
var X2 = 0;
function ui(t, i, o, r) {
  this._groups = t, this._parents = i, this._name = o, this._id = r;
}
function xb() {
  return ++X2;
}
var ai = cl.prototype;
ui.prototype = {
  constructor: ui,
  select: N2,
  selectAll: C2,
  selectChild: ai.selectChild,
  selectChildren: ai.selectChildren,
  filter: v2,
  merge: b2,
  selection: T2,
  transition: q2,
  call: ai.call,
  nodes: ai.nodes,
  node: ai.node,
  size: ai.size,
  empty: ai.empty,
  each: ai.each,
  on: S2,
  attr: n2,
  attrTween: l2,
  style: z2,
  styleTween: H2,
  text: I2,
  textTween: Y2,
  remove: _2,
  tween: QN,
  delay: c2,
  duration: h2,
  ease: g2,
  easeVarying: y2,
  end: $2,
  [Symbol.iterator]: ai[Symbol.iterator]
};
function G2(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Z2 = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: G2
};
function K2(t, i) {
  for (var o; !(o = t.__transition) || !(o = o[i]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${i} not found`);
  return o;
}
function Q2(t) {
  var i, o;
  t instanceof ui ? (i = t._id, t = t._name) : (i = xb(), (o = Z2).time = mh(), t = t == null ? null : t + "");
  for (var r = this._groups, s = r.length, u = 0; u < s; ++u)
    for (var c = r[u], d = c.length, m, p = 0; p < d; ++p)
      (m = c[p]) && Iu(m, t, i, p, c, o || K2(m, i));
  return new ui(r, this._parents, t, i);
}
cl.prototype.interrupt = GN;
cl.prototype.transition = Q2;
const Qs = (t) => () => t;
function F2(t, {
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
function ri(t, i, o) {
  this.k = t, this.x = i, this.y = o;
}
ri.prototype = {
  constructor: ri,
  scale: function(t) {
    return t === 1 ? this : new ri(this.k * t, this.x, this.y);
  },
  translate: function(t, i) {
    return t === 0 & i === 0 ? this : new ri(this.k, this.x + this.k * t, this.y + this.k * i);
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
var Vu = new ri(1, 0, 0);
wb.prototype = ri.prototype;
function wb(t) {
  for (; !t.__zoom; ) if (!(t = t.parentNode)) return Vu;
  return t.__zoom;
}
function bd(t) {
  t.stopImmediatePropagation();
}
function Or(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function W2(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function J2() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function t0() {
  return this.__zoom || Vu;
}
function P2(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function eC() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function tC(t, i, o) {
  var r = t.invertX(i[0][0]) - o[0][0], s = t.invertX(i[1][0]) - o[1][0], u = t.invertY(i[0][1]) - o[0][1], c = t.invertY(i[1][1]) - o[1][1];
  return t.translate(
    s > r ? (r + s) / 2 : Math.min(0, r) || Math.max(0, s),
    c > u ? (u + c) / 2 : Math.min(0, u) || Math.max(0, c)
  );
}
function Sb() {
  var t = W2, i = J2, o = tC, r = P2, s = eC, u = [0, 1 / 0], c = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], d = 250, m = iu, p = Hu("start", "zoom", "end"), g, y, v, x = 500, w = 150, _ = 0, T = 10;
  function A(j) {
    j.property("__zoom", t0).on("wheel.zoom", q, { passive: !1 }).on("mousedown.zoom", te).on("dblclick.zoom", F).filter(s).on("touchstart.zoom", Y).on("touchmove.zoom", Q).on("touchend.zoom touchcancel.zoom", W).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  A.transform = function(j, $, M, R) {
    var B = j.selection ? j.selection() : j;
    B.property("__zoom", t0), j !== B ? I(j, $, M, R) : B.interrupt().each(function() {
      L(this, arguments).event(R).start().zoom(null, typeof $ == "function" ? $.apply(this, arguments) : $).end();
    });
  }, A.scaleBy = function(j, $, M, R) {
    A.scaleTo(j, function() {
      var B = this.__zoom.k, K = typeof $ == "function" ? $.apply(this, arguments) : $;
      return B * K;
    }, M, R);
  }, A.scaleTo = function(j, $, M, R) {
    A.transform(j, function() {
      var B = i.apply(this, arguments), K = this.__zoom, ee = M == null ? C(B) : typeof M == "function" ? M.apply(this, arguments) : M, D = K.invert(ee), V = typeof $ == "function" ? $.apply(this, arguments) : $;
      return o(N(O(K, V), ee, D), B, c);
    }, M, R);
  }, A.translateBy = function(j, $, M, R) {
    A.transform(j, function() {
      return o(this.__zoom.translate(
        typeof $ == "function" ? $.apply(this, arguments) : $,
        typeof M == "function" ? M.apply(this, arguments) : M
      ), i.apply(this, arguments), c);
    }, null, R);
  }, A.translateTo = function(j, $, M, R, B) {
    A.transform(j, function() {
      var K = i.apply(this, arguments), ee = this.__zoom, D = R == null ? C(K) : typeof R == "function" ? R.apply(this, arguments) : R;
      return o(Vu.translate(D[0], D[1]).scale(ee.k).translate(
        typeof $ == "function" ? -$.apply(this, arguments) : -$,
        typeof M == "function" ? -M.apply(this, arguments) : -M
      ), K, c);
    }, R, B);
  };
  function O(j, $) {
    return $ = Math.max(u[0], Math.min(u[1], $)), $ === j.k ? j : new ri($, j.x, j.y);
  }
  function N(j, $, M) {
    var R = $[0] - M[0] * j.k, B = $[1] - M[1] * j.k;
    return R === j.x && B === j.y ? j : new ri(j.k, R, B);
  }
  function C(j) {
    return [(+j[0][0] + +j[1][0]) / 2, (+j[0][1] + +j[1][1]) / 2];
  }
  function I(j, $, M, R) {
    j.on("start.zoom", function() {
      L(this, arguments).event(R).start();
    }).on("interrupt.zoom end.zoom", function() {
      L(this, arguments).event(R).end();
    }).tween("zoom", function() {
      var B = this, K = arguments, ee = L(B, K).event(R), D = i.apply(B, K), V = M == null ? C(D) : typeof M == "function" ? M.apply(B, K) : M, ne = Math.max(D[1][0] - D[0][0], D[1][1] - D[0][1]), H = B.__zoom, E = typeof $ == "function" ? $.apply(B, K) : $, U = m(H.invert(V).concat(ne / H.k), E.invert(V).concat(ne / E.k));
      return function(G) {
        if (G === 1) G = E;
        else {
          var J = U(G), Z = ne / J[2];
          G = new ri(Z, V[0] - J[0] * Z, V[1] - J[1] * Z);
        }
        ee.zoom(null, G);
      };
    });
  }
  function L(j, $, M) {
    return !M && j.__zooming || new k(j, $);
  }
  function k(j, $) {
    this.that = j, this.args = $, this.active = 0, this.sourceEvent = null, this.extent = i.apply(j, $), this.taps = 0;
  }
  k.prototype = {
    event: function(j) {
      return j && (this.sourceEvent = j), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(j, $) {
      return this.mouse && j !== "mouse" && (this.mouse[1] = $.invert(this.mouse[0])), this.touch0 && j !== "touch" && (this.touch0[1] = $.invert(this.touch0[0])), this.touch1 && j !== "touch" && (this.touch1[1] = $.invert(this.touch1[0])), this.that.__zoom = $, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(j) {
      var $ = Kt(this.that).datum();
      p.call(
        j,
        this.that,
        new F2(j, {
          sourceEvent: this.sourceEvent,
          target: A,
          transform: this.that.__zoom,
          dispatch: p
        }),
        $
      );
    }
  };
  function q(j, ...$) {
    if (!t.apply(this, arguments)) return;
    var M = L(this, $).event(j), R = this.__zoom, B = Math.max(u[0], Math.min(u[1], R.k * Math.pow(2, r.apply(this, arguments)))), K = mn(j);
    if (M.wheel)
      (M.mouse[0][0] !== K[0] || M.mouse[0][1] !== K[1]) && (M.mouse[1] = R.invert(M.mouse[0] = K)), clearTimeout(M.wheel);
    else {
      if (R.k === B) return;
      M.mouse = [K, R.invert(K)], ru(this), M.start();
    }
    Or(j), M.wheel = setTimeout(ee, w), M.zoom("mouse", o(N(O(R, B), M.mouse[0], M.mouse[1]), M.extent, c));
    function ee() {
      M.wheel = null, M.end();
    }
  }
  function te(j, ...$) {
    if (v || !t.apply(this, arguments)) return;
    var M = j.currentTarget, R = L(this, $, !0).event(j), B = Kt(j.view).on("mousemove.zoom", V, !0).on("mouseup.zoom", ne, !0), K = mn(j, M), ee = j.clientX, D = j.clientY;
    ob(j.view), bd(j), R.mouse = [K, this.__zoom.invert(K)], ru(this), R.start();
    function V(H) {
      if (Or(H), !R.moved) {
        var E = H.clientX - ee, U = H.clientY - D;
        R.moved = E * E + U * U > _;
      }
      R.event(H).zoom("mouse", o(N(R.that.__zoom, R.mouse[0] = mn(H, M), R.mouse[1]), R.extent, c));
    }
    function ne(H) {
      B.on("mousemove.zoom mouseup.zoom", null), rb(H.view, R.moved), Or(H), R.event(H).end();
    }
  }
  function F(j, ...$) {
    if (t.apply(this, arguments)) {
      var M = this.__zoom, R = mn(j.changedTouches ? j.changedTouches[0] : j, this), B = M.invert(R), K = M.k * (j.shiftKey ? 0.5 : 2), ee = o(N(O(M, K), R, B), i.apply(this, $), c);
      Or(j), d > 0 ? Kt(this).transition().duration(d).call(I, ee, R, j) : Kt(this).call(A.transform, ee, R, j);
    }
  }
  function Y(j, ...$) {
    if (t.apply(this, arguments)) {
      var M = j.touches, R = M.length, B = L(this, $, j.changedTouches.length === R).event(j), K, ee, D, V;
      for (bd(j), ee = 0; ee < R; ++ee)
        D = M[ee], V = mn(D, this), V = [V, this.__zoom.invert(V), D.identifier], B.touch0 ? !B.touch1 && B.touch0[2] !== V[2] && (B.touch1 = V, B.taps = 0) : (B.touch0 = V, K = !0, B.taps = 1 + !!g);
      g && (g = clearTimeout(g)), K && (B.taps < 2 && (y = V[0], g = setTimeout(function() {
        g = null;
      }, x)), ru(this), B.start());
    }
  }
  function Q(j, ...$) {
    if (this.__zooming) {
      var M = L(this, $).event(j), R = j.changedTouches, B = R.length, K, ee, D, V;
      for (Or(j), K = 0; K < B; ++K)
        ee = R[K], D = mn(ee, this), M.touch0 && M.touch0[2] === ee.identifier ? M.touch0[0] = D : M.touch1 && M.touch1[2] === ee.identifier && (M.touch1[0] = D);
      if (ee = M.that.__zoom, M.touch1) {
        var ne = M.touch0[0], H = M.touch0[1], E = M.touch1[0], U = M.touch1[1], G = (G = E[0] - ne[0]) * G + (G = E[1] - ne[1]) * G, J = (J = U[0] - H[0]) * J + (J = U[1] - H[1]) * J;
        ee = O(ee, Math.sqrt(G / J)), D = [(ne[0] + E[0]) / 2, (ne[1] + E[1]) / 2], V = [(H[0] + U[0]) / 2, (H[1] + U[1]) / 2];
      } else if (M.touch0) D = M.touch0[0], V = M.touch0[1];
      else return;
      M.zoom("touch", o(N(ee, D, V), M.extent, c));
    }
  }
  function W(j, ...$) {
    if (this.__zooming) {
      var M = L(this, $).event(j), R = j.changedTouches, B = R.length, K, ee;
      for (bd(j), v && clearTimeout(v), v = setTimeout(function() {
        v = null;
      }, x), K = 0; K < B; ++K)
        ee = R[K], M.touch0 && M.touch0[2] === ee.identifier ? delete M.touch0 : M.touch1 && M.touch1[2] === ee.identifier && delete M.touch1;
      if (M.touch1 && !M.touch0 && (M.touch0 = M.touch1, delete M.touch1), M.touch0) M.touch0[1] = this.__zoom.invert(M.touch0[0]);
      else if (M.end(), M.taps === 2 && (ee = mn(ee, this), Math.hypot(y[0] - ee[0], y[1] - ee[1]) < T)) {
        var D = Kt(this).on("dblclick.zoom");
        D && D.apply(this, arguments);
      }
    }
  }
  return A.wheelDelta = function(j) {
    return arguments.length ? (r = typeof j == "function" ? j : Qs(+j), A) : r;
  }, A.filter = function(j) {
    return arguments.length ? (t = typeof j == "function" ? j : Qs(!!j), A) : t;
  }, A.touchable = function(j) {
    return arguments.length ? (s = typeof j == "function" ? j : Qs(!!j), A) : s;
  }, A.extent = function(j) {
    return arguments.length ? (i = typeof j == "function" ? j : Qs([[+j[0][0], +j[0][1]], [+j[1][0], +j[1][1]]]), A) : i;
  }, A.scaleExtent = function(j) {
    return arguments.length ? (u[0] = +j[0], u[1] = +j[1], A) : [u[0], u[1]];
  }, A.translateExtent = function(j) {
    return arguments.length ? (c[0][0] = +j[0][0], c[1][0] = +j[1][0], c[0][1] = +j[0][1], c[1][1] = +j[1][1], A) : [[c[0][0], c[0][1]], [c[1][0], c[1][1]]];
  }, A.constrain = function(j) {
    return arguments.length ? (o = j, A) : o;
  }, A.duration = function(j) {
    return arguments.length ? (d = +j, A) : d;
  }, A.interpolate = function(j) {
    return arguments.length ? (m = j, A) : m;
  }, A.on = function() {
    var j = p.on.apply(p, arguments);
    return j === p ? A : j;
  }, A.clickDistance = function(j) {
    return arguments.length ? (_ = (j = +j) * j, A) : Math.sqrt(_);
  }, A.tapDistance = function(j) {
    return arguments.length ? (T = +j, A) : T;
  }, A;
}
const zn = {
  error001: () => "[React Flow]: Seems like you have not used zustand provider as an ancestor. Help: https://reactflow.dev/error#001",
  error002: () => "It looks like you've created a new nodeTypes or edgeTypes object. If this wasn't on purpose please define the nodeTypes/edgeTypes outside of the component or memoize them.",
  error003: (t) => `Node type "${t}" not found. Using fallback type "default".`,
  error004: () => "The React Flow parent container needs a width and a height to render the graph.",
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
  error015: () => "It seems that you are trying to drag a node that is not initialized. Please use onNodesChange as explained in the docs."
}, tl = [
  [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
], Eb = ["Enter", " ", "Escape"], _b = {
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
var Mo;
(function(t) {
  t.Strict = "strict", t.Loose = "loose";
})(Mo || (Mo = {}));
var wa;
(function(t) {
  t.Free = "free", t.Vertical = "vertical", t.Horizontal = "horizontal";
})(wa || (wa = {}));
var nl;
(function(t) {
  t.Partial = "partial", t.Full = "full";
})(nl || (nl = {}));
const Nb = {
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
var Nu;
(function(t) {
  t.Arrow = "arrow", t.ArrowClosed = "arrowclosed";
})(Nu || (Nu = {}));
var we;
(function(t) {
  t.Left = "left", t.Top = "top", t.Right = "right", t.Bottom = "bottom";
})(we || (we = {}));
const n0 = {
  [we.Left]: we.Right,
  [we.Right]: we.Left,
  [we.Top]: we.Bottom,
  [we.Bottom]: we.Top
};
function Cb(t) {
  return t === null ? null : t ? "valid" : "invalid";
}
const Mb = (t) => "id" in t && "source" in t && "target" in t, nC = (t) => "id" in t && "position" in t && !("source" in t) && !("target" in t), yh = (t) => "id" in t && "internals" in t && !("source" in t) && !("target" in t), dl = (t, i = [0, 0]) => {
  const { width: o, height: r } = ci(t), s = t.origin ?? i, u = o * s[0], c = r * s[1];
  return {
    x: t.position.x - u,
    y: t.position.y - c
  };
}, iC = (t, i = { nodeOrigin: [0, 0] }) => {
  if (t.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  const o = t.reduce((r, s) => {
    const u = typeof s == "string";
    let c = !i.nodeLookup && !u ? s : void 0;
    i.nodeLookup && (c = u ? i.nodeLookup.get(s) : yh(s) ? s : i.nodeLookup.get(s.id));
    const d = c ? Cu(c, i.nodeOrigin) : { x: 0, y: 0, x2: 0, y2: 0 };
    return Uu(r, d);
  }, { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 });
  return Yu(o);
}, hl = (t, i = {}) => {
  let o = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 }, r = !1;
  return t.forEach((s) => {
    (i.filter === void 0 || i.filter(s)) && (o = Uu(o, Cu(s)), r = !0);
  }), r ? Yu(o) : { x: 0, y: 0, width: 0, height: 0 };
}, vh = (t, i, [o, r, s] = [0, 0, 1], u = !1, c = !1) => {
  const d = {
    ...gl(i, [o, r, s]),
    width: i.width / s,
    height: i.height / s
  }, m = [];
  for (const p of t.values()) {
    const { measured: g, selectable: y = !0, hidden: v = !1 } = p;
    if (c && !y || v)
      continue;
    const x = g.width ?? p.width ?? p.initialWidth ?? null, w = g.height ?? p.height ?? p.initialHeight ?? null, _ = il(d, Do(p)), T = (x ?? 0) * (w ?? 0), A = u && _ > 0;
    (!p.internals.handleBounds || A || _ >= T || p.dragging) && m.push(p);
  }
  return m;
}, aC = (t, i) => {
  const o = /* @__PURE__ */ new Set();
  return t.forEach((r) => {
    o.add(r.id);
  }), i.filter((r) => o.has(r.source) || o.has(r.target));
};
function oC(t, i) {
  const o = /* @__PURE__ */ new Map(), r = i?.nodes ? new Set(i.nodes.map((s) => s.id)) : null;
  return t.forEach((s) => {
    s.measured.width && s.measured.height && (i?.includeHiddenNodes || !s.hidden) && (!r || r.has(s.id)) && o.set(s.id, s);
  }), o;
}
async function rC({ nodes: t, width: i, height: o, panZoom: r, minZoom: s, maxZoom: u }, c) {
  if (t.size === 0)
    return Promise.resolve(!0);
  const d = oC(t, c), m = hl(d), p = bh(m, i, o, c?.minZoom ?? s, c?.maxZoom ?? u, c?.padding ?? 0.1);
  return await r.setViewport(p, {
    duration: c?.duration,
    ease: c?.ease,
    interpolate: c?.interpolate
  }), Promise.resolve(!0);
}
function Tb({ nodeId: t, nextPosition: i, nodeLookup: o, nodeOrigin: r = [0, 0], nodeExtent: s, onError: u }) {
  const c = o.get(t), d = c.parentId ? o.get(c.parentId) : void 0, { x: m, y: p } = d ? d.internals.positionAbsolute : { x: 0, y: 0 }, g = c.origin ?? r;
  let y = c.extent || s;
  if (c.extent === "parent" && !c.expandParent)
    if (!d)
      u?.("005", zn.error005());
    else {
      const x = d.measured.width, w = d.measured.height;
      x && w && (y = [
        [m, p],
        [m + x, p + w]
      ]);
    }
  else d && jo(c.extent) && (y = [
    [c.extent[0][0] + m, c.extent[0][1] + p],
    [c.extent[1][0] + m, c.extent[1][1] + p]
  ]);
  const v = jo(y) ? Ca(i, y, c.measured) : i;
  return (c.measured.width === void 0 || c.measured.height === void 0) && u?.("015", zn.error015()), {
    position: {
      x: v.x - m + (c.measured.width ?? 0) * g[0],
      y: v.y - p + (c.measured.height ?? 0) * g[1]
    },
    positionAbsolute: v
  };
}
async function lC({ nodesToRemove: t = [], edgesToRemove: i = [], nodes: o, edges: r, onBeforeDelete: s }) {
  const u = new Set(t.map((v) => v.id)), c = [];
  for (const v of o) {
    if (v.deletable === !1)
      continue;
    const x = u.has(v.id), w = !x && v.parentId && c.find((_) => _.id === v.parentId);
    (x || w) && c.push(v);
  }
  const d = new Set(i.map((v) => v.id)), m = r.filter((v) => v.deletable !== !1), g = aC(c, m);
  for (const v of m)
    d.has(v.id) && !g.find((w) => w.id === v.id) && g.push(v);
  if (!s)
    return {
      edges: g,
      nodes: c
    };
  const y = await s({
    nodes: c,
    edges: g
  });
  return typeof y == "boolean" ? y ? { edges: g, nodes: c } : { edges: [], nodes: [] } : y;
}
const To = (t, i = 0, o = 1) => Math.min(Math.max(t, i), o), Ca = (t = { x: 0, y: 0 }, i, o) => ({
  x: To(t.x, i[0][0], i[1][0] - (o?.width ?? 0)),
  y: To(t.y, i[0][1], i[1][1] - (o?.height ?? 0))
});
function Db(t, i, o) {
  const { width: r, height: s } = ci(o), { x: u, y: c } = o.internals.positionAbsolute;
  return Ca(t, [
    [u, c],
    [u + r, c + s]
  ], i);
}
const i0 = (t, i, o) => t < i ? To(Math.abs(t - i), 1, i) / i : t > o ? -To(Math.abs(t - o), 1, i) / i : 0, jb = (t, i, o = 15, r = 40) => {
  const s = i0(t.x, r, i.width - r) * o, u = i0(t.y, r, i.height - r) * o;
  return [s, u];
}, Uu = (t, i) => ({
  x: Math.min(t.x, i.x),
  y: Math.min(t.y, i.y),
  x2: Math.max(t.x2, i.x2),
  y2: Math.max(t.y2, i.y2)
}), Kd = ({ x: t, y: i, width: o, height: r }) => ({
  x: t,
  y: i,
  x2: t + o,
  y2: i + r
}), Yu = ({ x: t, y: i, x2: o, y2: r }) => ({
  x: t,
  y: i,
  width: o - t,
  height: r - i
}), Do = (t, i = [0, 0]) => {
  const { x: o, y: r } = yh(t) ? t.internals.positionAbsolute : dl(t, i);
  return {
    x: o,
    y: r,
    width: t.measured?.width ?? t.width ?? t.initialWidth ?? 0,
    height: t.measured?.height ?? t.height ?? t.initialHeight ?? 0
  };
}, Cu = (t, i = [0, 0]) => {
  const { x: o, y: r } = yh(t) ? t.internals.positionAbsolute : dl(t, i);
  return {
    x: o,
    y: r,
    x2: o + (t.measured?.width ?? t.width ?? t.initialWidth ?? 0),
    y2: r + (t.measured?.height ?? t.height ?? t.initialHeight ?? 0)
  };
}, Ab = (t, i) => Yu(Uu(Kd(t), Kd(i))), il = (t, i) => {
  const o = Math.max(0, Math.min(t.x + t.width, i.x + i.width) - Math.max(t.x, i.x)), r = Math.max(0, Math.min(t.y + t.height, i.y + i.height) - Math.max(t.y, i.y));
  return Math.ceil(o * r);
}, a0 = (t) => yn(t.width) && yn(t.height) && yn(t.x) && yn(t.y), yn = (t) => !isNaN(t) && isFinite(t), sC = (t, i) => {
}, ml = (t, i = [1, 1]) => ({
  x: i[0] * Math.round(t.x / i[0]),
  y: i[1] * Math.round(t.y / i[1])
}), gl = ({ x: t, y: i }, [o, r, s], u = !1, c = [1, 1]) => {
  const d = {
    x: (t - o) / s,
    y: (i - r) / s
  };
  return u ? ml(d, c) : d;
}, Mu = ({ x: t, y: i }, [o, r, s]) => ({
  x: t * s + o,
  y: i * s + r
});
function po(t, i) {
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
  return console.error(`[React Flow] The padding value "${t}" is invalid. Please provide a number or a string with a valid unit (px or %).`), 0;
}
function uC(t, i, o) {
  if (typeof t == "string" || typeof t == "number") {
    const r = po(t, o), s = po(t, i);
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
    const r = po(t.top ?? t.y ?? 0, o), s = po(t.bottom ?? t.y ?? 0, o), u = po(t.left ?? t.x ?? 0, i), c = po(t.right ?? t.x ?? 0, i);
    return { top: r, right: c, bottom: s, left: u, x: u + c, y: r + s };
  }
  return { top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0 };
}
function cC(t, i, o, r, s, u) {
  const { x: c, y: d } = Mu(t, [i, o, r]), { x: m, y: p } = Mu({ x: t.x + t.width, y: t.y + t.height }, [i, o, r]), g = s - m, y = u - p;
  return {
    left: Math.floor(c),
    top: Math.floor(d),
    right: Math.floor(g),
    bottom: Math.floor(y)
  };
}
const bh = (t, i, o, r, s, u) => {
  const c = uC(u, i, o), d = (i - c.x) / t.width, m = (o - c.y) / t.height, p = Math.min(d, m), g = To(p, r, s), y = t.x + t.width / 2, v = t.y + t.height / 2, x = i / 2 - y * g, w = o / 2 - v * g, _ = cC(t, x, w, g, i, o), T = {
    left: Math.min(_.left - c.left, 0),
    top: Math.min(_.top - c.top, 0),
    right: Math.min(_.right - c.right, 0),
    bottom: Math.min(_.bottom - c.bottom, 0)
  };
  return {
    x: x - T.left + T.right,
    y: w - T.top + T.bottom,
    zoom: g
  };
}, al = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function jo(t) {
  return t != null && t !== "parent";
}
function ci(t) {
  return {
    width: t.measured?.width ?? t.width ?? t.initialWidth ?? 0,
    height: t.measured?.height ?? t.height ?? t.initialHeight ?? 0
  };
}
function Ob(t) {
  return (t.measured?.width ?? t.width ?? t.initialWidth) !== void 0 && (t.measured?.height ?? t.height ?? t.initialHeight) !== void 0;
}
function zb(t, i = { width: 0, height: 0 }, o, r, s) {
  const u = { ...t }, c = r.get(o);
  if (c) {
    const d = c.origin || s;
    u.x += c.internals.positionAbsolute.x - (i.width ?? 0) * d[0], u.y += c.internals.positionAbsolute.y - (i.height ?? 0) * d[1];
  }
  return u;
}
function o0(t, i) {
  if (t.size !== i.size)
    return !1;
  for (const o of t)
    if (!i.has(o))
      return !1;
  return !0;
}
function fC() {
  let t, i;
  return { promise: new Promise((r, s) => {
    t = r, i = s;
  }), resolve: t, reject: i };
}
function dC(t) {
  return { ..._b, ...t || {} };
}
function $r(t, { snapGrid: i = [0, 0], snapToGrid: o = !1, transform: r, containerBounds: s }) {
  const { x: u, y: c } = vn(t), d = gl({ x: u - (s?.left ?? 0), y: c - (s?.top ?? 0) }, r), { x: m, y: p } = o ? ml(d, i) : d;
  return {
    xSnapped: m,
    ySnapped: p,
    ...d
  };
}
const xh = (t) => ({
  width: t.offsetWidth,
  height: t.offsetHeight
}), Rb = (t) => t?.getRootNode?.() || window?.document, hC = ["INPUT", "SELECT", "TEXTAREA"];
function kb(t) {
  const i = t.composedPath?.()?.[0] || t.target;
  return i?.nodeType !== 1 ? !1 : hC.includes(i.nodeName) || i.hasAttribute("contenteditable") || !!i.closest(".nokey");
}
const Hb = (t) => "clientX" in t, vn = (t, i) => {
  const o = Hb(t), r = o ? t.clientX : t.touches?.[0].clientX, s = o ? t.clientY : t.touches?.[0].clientY;
  return {
    x: r - (i?.left ?? 0),
    y: s - (i?.top ?? 0)
  };
}, r0 = (t, i, o, r, s) => {
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
      ...xh(c)
    };
  });
};
function Lb({ sourceX: t, sourceY: i, targetX: o, targetY: r, sourceControlX: s, sourceControlY: u, targetControlX: c, targetControlY: d }) {
  const m = t * 0.125 + s * 0.375 + c * 0.375 + o * 0.125, p = i * 0.125 + u * 0.375 + d * 0.375 + r * 0.125, g = Math.abs(m - t), y = Math.abs(p - i);
  return [m, p, g, y];
}
function Fs(t, i) {
  return t >= 0 ? 0.5 * t : i * 25 * Math.sqrt(-t);
}
function l0({ pos: t, x1: i, y1: o, x2: r, y2: s, c: u }) {
  switch (t) {
    case we.Left:
      return [i - Fs(i - r, u), o];
    case we.Right:
      return [i + Fs(r - i, u), o];
    case we.Top:
      return [i, o - Fs(o - s, u)];
    case we.Bottom:
      return [i, o + Fs(s - o, u)];
  }
}
function wh({ sourceX: t, sourceY: i, sourcePosition: o = we.Bottom, targetX: r, targetY: s, targetPosition: u = we.Top, curvature: c = 0.25 }) {
  const [d, m] = l0({
    pos: o,
    x1: t,
    y1: i,
    x2: r,
    y2: s,
    c
  }), [p, g] = l0({
    pos: u,
    x1: r,
    y1: s,
    x2: t,
    y2: i,
    c
  }), [y, v, x, w] = Lb({
    sourceX: t,
    sourceY: i,
    targetX: r,
    targetY: s,
    sourceControlX: d,
    sourceControlY: m,
    targetControlX: p,
    targetControlY: g
  });
  return [
    `M${t},${i} C${d},${m} ${p},${g} ${r},${s}`,
    y,
    v,
    x,
    w
  ];
}
function Bb({ sourceX: t, sourceY: i, targetX: o, targetY: r }) {
  const s = Math.abs(o - t) / 2, u = o < t ? o + s : o - s, c = Math.abs(r - i) / 2, d = r < i ? r + c : r - c;
  return [u, d, s, c];
}
function mC({ sourceNode: t, targetNode: i, selected: o = !1, zIndex: r = 0, elevateOnSelect: s = !1, zIndexMode: u = "basic" }) {
  if (u === "manual")
    return r;
  const c = s && o ? r + 1e3 : r, d = Math.max(t.parentId || s && t.selected ? t.internals.z : 0, i.parentId || s && i.selected ? i.internals.z : 0);
  return c + d;
}
function gC({ sourceNode: t, targetNode: i, width: o, height: r, transform: s }) {
  const u = Uu(Cu(t), Cu(i));
  u.x === u.x2 && (u.x2 += 1), u.y === u.y2 && (u.y2 += 1);
  const c = {
    x: -s[0] / s[2],
    y: -s[1] / s[2],
    width: o / s[2],
    height: r / s[2]
  };
  return il(c, Yu(u)) > 0;
}
const pC = ({ source: t, sourceHandle: i, target: o, targetHandle: r }) => `xy-edge__${t}${i || ""}-${o}${r || ""}`, yC = (t, i) => i.some((o) => o.source === t.source && o.target === t.target && (o.sourceHandle === t.sourceHandle || !o.sourceHandle && !t.sourceHandle) && (o.targetHandle === t.targetHandle || !o.targetHandle && !t.targetHandle)), vC = (t, i, o = {}) => {
  if (!t.source || !t.target)
    return i;
  const r = o.getEdgeId || pC;
  let s;
  return Mb(t) ? s = { ...t } : s = {
    ...t,
    id: r(t)
  }, yC(s, i) ? i : (s.sourceHandle === null && delete s.sourceHandle, s.targetHandle === null && delete s.targetHandle, i.concat(s));
};
function Ib({ sourceX: t, sourceY: i, targetX: o, targetY: r }) {
  const [s, u, c, d] = Bb({
    sourceX: t,
    sourceY: i,
    targetX: o,
    targetY: r
  });
  return [`M ${t},${i}L ${o},${r}`, s, u, c, d];
}
const s0 = {
  [we.Left]: { x: -1, y: 0 },
  [we.Right]: { x: 1, y: 0 },
  [we.Top]: { x: 0, y: -1 },
  [we.Bottom]: { x: 0, y: 1 }
}, bC = ({ source: t, sourcePosition: i = we.Bottom, target: o }) => i === we.Left || i === we.Right ? t.x < o.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : t.y < o.y ? { x: 0, y: 1 } : { x: 0, y: -1 }, u0 = (t, i) => Math.sqrt(Math.pow(i.x - t.x, 2) + Math.pow(i.y - t.y, 2));
function xC({ source: t, sourcePosition: i = we.Bottom, target: o, targetPosition: r = we.Top, center: s, offset: u, stepPosition: c }) {
  const d = s0[i], m = s0[r], p = { x: t.x + d.x * u, y: t.y + d.y * u }, g = { x: o.x + m.x * u, y: o.y + m.y * u }, y = bC({
    source: p,
    sourcePosition: i,
    target: g
  }), v = y.x !== 0 ? "x" : "y", x = y[v];
  let w = [], _, T;
  const A = { x: 0, y: 0 }, O = { x: 0, y: 0 }, [, , N, C] = Bb({
    sourceX: t.x,
    sourceY: t.y,
    targetX: o.x,
    targetY: o.y
  });
  if (d[v] * m[v] === -1) {
    v === "x" ? (_ = s.x ?? p.x + (g.x - p.x) * c, T = s.y ?? (p.y + g.y) / 2) : (_ = s.x ?? (p.x + g.x) / 2, T = s.y ?? p.y + (g.y - p.y) * c);
    const L = [
      { x: _, y: p.y },
      { x: _, y: g.y }
    ], k = [
      { x: p.x, y: T },
      { x: g.x, y: T }
    ];
    d[v] === x ? w = v === "x" ? L : k : w = v === "x" ? k : L;
  } else {
    const L = [{ x: p.x, y: g.y }], k = [{ x: g.x, y: p.y }];
    if (v === "x" ? w = d.x === x ? k : L : w = d.y === x ? L : k, i === r) {
      const Q = Math.abs(t[v] - o[v]);
      if (Q <= u) {
        const W = Math.min(u - 1, u - Q);
        d[v] === x ? A[v] = (p[v] > t[v] ? -1 : 1) * W : O[v] = (g[v] > o[v] ? -1 : 1) * W;
      }
    }
    if (i !== r) {
      const Q = v === "x" ? "y" : "x", W = d[v] === m[Q], j = p[Q] > g[Q], $ = p[Q] < g[Q];
      (d[v] === 1 && (!W && j || W && $) || d[v] !== 1 && (!W && $ || W && j)) && (w = v === "x" ? L : k);
    }
    const q = { x: p.x + A.x, y: p.y + A.y }, te = { x: g.x + O.x, y: g.y + O.y }, F = Math.max(Math.abs(q.x - w[0].x), Math.abs(te.x - w[0].x)), Y = Math.max(Math.abs(q.y - w[0].y), Math.abs(te.y - w[0].y));
    F >= Y ? (_ = (q.x + te.x) / 2, T = w[0].y) : (_ = w[0].x, T = (q.y + te.y) / 2);
  }
  return [[
    t,
    { x: p.x + A.x, y: p.y + A.y },
    ...w,
    { x: g.x + O.x, y: g.y + O.y },
    o
  ], _, T, N, C];
}
function wC(t, i, o, r) {
  const s = Math.min(u0(t, i) / 2, u0(i, o) / 2, r), { x: u, y: c } = i;
  if (t.x === u && u === o.x || t.y === c && c === o.y)
    return `L${u} ${c}`;
  if (t.y === c) {
    const p = t.x < o.x ? -1 : 1, g = t.y < o.y ? 1 : -1;
    return `L ${u + s * p},${c}Q ${u},${c} ${u},${c + s * g}`;
  }
  const d = t.x < o.x ? 1 : -1, m = t.y < o.y ? -1 : 1;
  return `L ${u},${c + s * m}Q ${u},${c} ${u + s * d},${c}`;
}
function Qd({ sourceX: t, sourceY: i, sourcePosition: o = we.Bottom, targetX: r, targetY: s, targetPosition: u = we.Top, borderRadius: c = 5, centerX: d, centerY: m, offset: p = 20, stepPosition: g = 0.5 }) {
  const [y, v, x, w, _] = xC({
    source: { x: t, y: i },
    sourcePosition: o,
    target: { x: r, y: s },
    targetPosition: u,
    center: { x: d, y: m },
    offset: p,
    stepPosition: g
  });
  return [y.reduce((A, O, N) => {
    let C = "";
    return N > 0 && N < y.length - 1 ? C = wC(y[N - 1], O, y[N + 1], c) : C = `${N === 0 ? "M" : "L"}${O.x} ${O.y}`, A += C, A;
  }, ""), v, x, w, _];
}
function c0(t) {
  return t && !!(t.internals.handleBounds || t.handles?.length) && !!(t.measured.width || t.width || t.initialWidth);
}
function SC(t) {
  const { sourceNode: i, targetNode: o } = t;
  if (!c0(i) || !c0(o))
    return null;
  const r = i.internals.handleBounds || f0(i.handles), s = o.internals.handleBounds || f0(o.handles), u = d0(r?.source ?? [], t.sourceHandle), c = d0(
    // when connection type is loose we can define all handles as sources and connect source -> source
    t.connectionMode === Mo.Strict ? s?.target ?? [] : (s?.target ?? []).concat(s?.source ?? []),
    t.targetHandle
  );
  if (!u || !c)
    return t.onError?.("008", zn.error008(u ? "target" : "source", {
      id: t.id,
      sourceHandle: t.sourceHandle,
      targetHandle: t.targetHandle
    })), null;
  const d = u?.position || we.Bottom, m = c?.position || we.Top, p = Ma(i, u, d), g = Ma(o, c, m);
  return {
    sourceX: p.x,
    sourceY: p.y,
    targetX: g.x,
    targetY: g.y,
    sourcePosition: d,
    targetPosition: m
  };
}
function f0(t) {
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
  const s = (i?.x ?? 0) + t.internals.positionAbsolute.x, u = (i?.y ?? 0) + t.internals.positionAbsolute.y, { width: c, height: d } = i ?? ci(t);
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
function d0(t, i) {
  return t && (i ? t.find((o) => o.id === i) : t[0]) || null;
}
function Fd(t, i) {
  return t ? typeof t == "string" ? t : `${i ? `${i}__` : ""}${Object.keys(t).sort().map((r) => `${r}=${t[r]}`).join("&")}` : "";
}
function EC(t, { id: i, defaultColor: o, defaultMarkerStart: r, defaultMarkerEnd: s }) {
  const u = /* @__PURE__ */ new Set();
  return t.reduce((c, d) => ([d.markerStart || r, d.markerEnd || s].forEach((m) => {
    if (m && typeof m == "object") {
      const p = Fd(m, i);
      u.has(p) || (c.push({ id: p, color: m.color || o, ...m }), u.add(p));
    }
  }), c), []).sort((c, d) => c.id.localeCompare(d.id));
}
const Vb = 1e3, _C = 10, Sh = {
  nodeOrigin: [0, 0],
  nodeExtent: tl,
  elevateNodesOnSelect: !0,
  zIndexMode: "basic",
  defaults: {}
}, NC = {
  ...Sh,
  checkEquality: !0
};
function Eh(t, i) {
  const o = { ...t };
  for (const r in i)
    i[r] !== void 0 && (o[r] = i[r]);
  return o;
}
function CC(t, i, o) {
  const r = Eh(Sh, o);
  for (const s of t.values())
    if (s.parentId)
      Nh(s, t, i, r);
    else {
      const u = dl(s, r.nodeOrigin), c = jo(s.extent) ? s.extent : r.nodeExtent, d = Ca(u, c, ci(s));
      s.internals.positionAbsolute = d;
    }
}
function MC(t, i) {
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
function _h(t) {
  return t === "manual";
}
function Wd(t, i, o, r = {}) {
  const s = Eh(NC, r), u = { i: 0 }, c = new Map(i), d = s?.elevateNodesOnSelect && !_h(s.zIndexMode) ? Vb : 0;
  let m = t.length > 0;
  i.clear(), o.clear();
  for (const p of t) {
    let g = c.get(p.id);
    if (s.checkEquality && p === g?.internals.userNode)
      i.set(p.id, g);
    else {
      const y = dl(p, s.nodeOrigin), v = jo(p.extent) ? p.extent : s.nodeExtent, x = Ca(y, v, ci(p));
      g = {
        ...s.defaults,
        ...p,
        measured: {
          width: p.measured?.width,
          height: p.measured?.height
        },
        internals: {
          positionAbsolute: x,
          // if user re-initializes the node or removes `measured` for whatever reason, we reset the handleBounds so that the node gets re-measured
          handleBounds: MC(p, g),
          z: Ub(p, d, s.zIndexMode),
          userNode: p
        }
      }, i.set(p.id, g);
    }
    (g.measured === void 0 || g.measured.width === void 0 || g.measured.height === void 0) && !g.hidden && (m = !1), p.parentId && Nh(g, i, o, r, u);
  }
  return m;
}
function TC(t, i) {
  if (!t.parentId)
    return;
  const o = i.get(t.parentId);
  o ? o.set(t.id, t) : i.set(t.parentId, /* @__PURE__ */ new Map([[t.id, t]]));
}
function Nh(t, i, o, r, s) {
  const { elevateNodesOnSelect: u, nodeOrigin: c, nodeExtent: d, zIndexMode: m } = Eh(Sh, r), p = t.parentId, g = i.get(p);
  if (!g) {
    console.warn(`Parent node ${p} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
    return;
  }
  TC(t, o), s && !g.parentId && g.internals.rootParentIndex === void 0 && m === "auto" && (g.internals.rootParentIndex = ++s.i, g.internals.z = g.internals.z + s.i * _C), s && g.internals.rootParentIndex !== void 0 && (s.i = g.internals.rootParentIndex);
  const y = u && !_h(m) ? Vb : 0, { x: v, y: x, z: w } = DC(t, g, c, d, y, m), { positionAbsolute: _ } = t.internals, T = v !== _.x || x !== _.y;
  (T || w !== t.internals.z) && i.set(t.id, {
    ...t,
    internals: {
      ...t.internals,
      positionAbsolute: T ? { x: v, y: x } : _,
      z: w
    }
  });
}
function Ub(t, i, o) {
  const r = yn(t.zIndex) ? t.zIndex : 0;
  return _h(o) ? r : r + (t.selected ? i : 0);
}
function DC(t, i, o, r, s, u) {
  const { x: c, y: d } = i.internals.positionAbsolute, m = ci(t), p = dl(t, o), g = jo(t.extent) ? Ca(p, t.extent, m) : p;
  let y = Ca({ x: c + g.x, y: d + g.y }, r, m);
  t.extent === "parent" && (y = Db(y, m, i));
  const v = Ub(t, s, u), x = i.internals.z ?? 0;
  return {
    x: y.x,
    y: y.y,
    z: x >= v ? x + 1 : v
  };
}
function Ch(t, i, o, r = [0, 0]) {
  const s = [], u = /* @__PURE__ */ new Map();
  for (const c of t) {
    const d = i.get(c.parentId);
    if (!d)
      continue;
    const m = u.get(c.parentId)?.expandedRect ?? Do(d), p = Ab(m, c.rect);
    u.set(c.parentId, { expandedRect: p, parent: d });
  }
  return u.size > 0 && u.forEach(({ expandedRect: c, parent: d }, m) => {
    const p = d.internals.positionAbsolute, g = ci(d), y = d.origin ?? r, v = c.x < p.x ? Math.round(Math.abs(p.x - c.x)) : 0, x = c.y < p.y ? Math.round(Math.abs(p.y - c.y)) : 0, w = Math.max(g.width, Math.round(c.width)), _ = Math.max(g.height, Math.round(c.height)), T = (w - g.width) * y[0], A = (_ - g.height) * y[1];
    (v > 0 || x > 0 || T || A) && (s.push({
      id: m,
      type: "position",
      position: {
        x: d.position.x - v + T,
        y: d.position.y - x + A
      }
    }), o.get(m)?.forEach((O) => {
      t.some((N) => N.id === O.id) || s.push({
        id: O.id,
        type: "position",
        position: {
          x: O.position.x + v,
          y: O.position.y + x
        }
      });
    })), (g.width < c.width || g.height < c.height || v || x) && s.push({
      id: m,
      type: "dimensions",
      setAttributes: !0,
      dimensions: {
        width: w + (v ? y[0] * v - T : 0),
        height: _ + (x ? y[1] * x - A : 0)
      }
    });
  }), s;
}
function jC(t, i, o, r, s, u, c) {
  const d = r?.querySelector(".xyflow__viewport");
  let m = !1;
  if (!d)
    return { changes: [], updatedInternals: m };
  const p = [], g = window.getComputedStyle(d), { m22: y } = new window.DOMMatrixReadOnly(g.transform), v = [];
  for (const x of t.values()) {
    const w = i.get(x.id);
    if (!w)
      continue;
    if (w.hidden) {
      i.set(w.id, {
        ...w,
        internals: {
          ...w.internals,
          handleBounds: void 0
        }
      }), m = !0;
      continue;
    }
    const _ = xh(x.nodeElement), T = w.measured.width !== _.width || w.measured.height !== _.height;
    if (!!(_.width && _.height && (T || !w.internals.handleBounds || x.force))) {
      const O = x.nodeElement.getBoundingClientRect(), N = jo(w.extent) ? w.extent : u;
      let { positionAbsolute: C } = w.internals;
      w.parentId && w.extent === "parent" ? C = Db(C, _, i.get(w.parentId)) : N && (C = Ca(C, N, _));
      const I = {
        ...w,
        measured: _,
        internals: {
          ...w.internals,
          positionAbsolute: C,
          handleBounds: {
            source: r0("source", x.nodeElement, O, y, w.id),
            target: r0("target", x.nodeElement, O, y, w.id)
          }
        }
      };
      i.set(w.id, I), w.parentId && Nh(I, i, o, { nodeOrigin: s, zIndexMode: c }), m = !0, T && (p.push({
        id: w.id,
        type: "dimensions",
        dimensions: _
      }), w.expandParent && w.parentId && v.push({
        id: w.id,
        parentId: w.parentId,
        rect: Do(I, s)
      }));
    }
  }
  if (v.length > 0) {
    const x = Ch(v, i, o, s);
    p.push(...x);
  }
  return { changes: p, updatedInternals: m };
}
async function AC({ delta: t, panZoom: i, transform: o, translateExtent: r, width: s, height: u }) {
  if (!i || !t.x && !t.y)
    return Promise.resolve(!1);
  const c = await i.setViewportConstrained({
    x: o[0] + t.x,
    y: o[1] + t.y,
    zoom: o[2]
  }, [
    [0, 0],
    [s, u]
  ], r), d = !!c && (c.x !== o[0] || c.y !== o[1] || c.k !== o[2]);
  return Promise.resolve(d);
}
function h0(t, i, o, r, s, u) {
  let c = s;
  const d = r.get(c) || /* @__PURE__ */ new Map();
  r.set(c, d.set(o, i)), c = `${s}-${t}`;
  const m = r.get(c) || /* @__PURE__ */ new Map();
  if (r.set(c, m.set(o, i)), u) {
    c = `${s}-${t}-${u}`;
    const p = r.get(c) || /* @__PURE__ */ new Map();
    r.set(c, p.set(o, i));
  }
}
function Yb(t, i, o) {
  t.clear(), i.clear();
  for (const r of o) {
    const { source: s, target: u, sourceHandle: c = null, targetHandle: d = null } = r, m = { edgeId: r.id, source: s, target: u, sourceHandle: c, targetHandle: d }, p = `${s}-${c}--${u}-${d}`, g = `${u}-${d}--${s}-${c}`;
    h0("source", m, g, t, s, c), h0("target", m, p, t, u, d), i.set(r.id, r);
  }
}
function qb(t, i) {
  if (!t.parentId)
    return !1;
  const o = i.get(t.parentId);
  return o ? o.selected ? !0 : qb(o, i) : !1;
}
function m0(t, i, o) {
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
function OC(t, i, o, r) {
  const s = /* @__PURE__ */ new Map();
  for (const [u, c] of t)
    if ((c.selected || c.id === r) && (!c.parentId || !qb(c, t)) && (c.draggable || i && typeof c.draggable > "u")) {
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
function xd({ nodeId: t, dragItems: i, nodeLookup: o, dragging: r = !0 }) {
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
function zC({ dragItems: t, snapGrid: i, x: o, y: r }) {
  const s = t.values().next().value;
  if (!s)
    return null;
  const u = {
    x: o - s.distance.x,
    y: r - s.distance.y
  }, c = ml(u, i);
  return {
    x: c.x - u.x,
    y: c.y - u.y
  };
}
function RC({ onNodeMouseDown: t, getStoreItems: i, onDragStart: o, onDrag: r, onDragStop: s }) {
  let u = { x: null, y: null }, c = 0, d = /* @__PURE__ */ new Map(), m = !1, p = { x: 0, y: 0 }, g = null, y = !1, v = null, x = !1, w = !1, _ = null;
  function T({ noDragClassName: O, handleSelector: N, domNode: C, isSelectable: I, nodeId: L, nodeClickDistance: k = 0 }) {
    v = Kt(C);
    function q({ x: Q, y: W }) {
      const { nodeLookup: j, nodeExtent: $, snapGrid: M, snapToGrid: R, nodeOrigin: B, onNodeDrag: K, onSelectionDrag: ee, onError: D, updateNodePositions: V } = i();
      u = { x: Q, y: W };
      let ne = !1;
      const H = d.size > 1, E = H && $ ? Kd(hl(d)) : null, U = H && R ? zC({
        dragItems: d,
        snapGrid: M,
        x: Q,
        y: W
      }) : null;
      for (const [G, J] of d) {
        if (!j.has(G))
          continue;
        let Z = { x: Q - J.distance.x, y: W - J.distance.y };
        R && (Z = U ? {
          x: Math.round(Z.x + U.x),
          y: Math.round(Z.y + U.y)
        } : ml(Z, M));
        let se = null;
        if (H && $ && !J.extent && E) {
          const { positionAbsolute: xe } = J.internals, Ee = xe.x - E.x + $[0][0], Ce = xe.x + J.measured.width - E.x2 + $[1][0], Ae = xe.y - E.y + $[0][1], Ie = xe.y + J.measured.height - E.y2 + $[1][1];
          se = [
            [Ee, Ae],
            [Ce, Ie]
          ];
        }
        const { position: me, positionAbsolute: ge } = Tb({
          nodeId: G,
          nextPosition: Z,
          nodeLookup: j,
          nodeExtent: se || $,
          nodeOrigin: B,
          onError: D
        });
        ne = ne || J.position.x !== me.x || J.position.y !== me.y, J.position = me, J.internals.positionAbsolute = ge;
      }
      if (w = w || ne, !!ne && (V(d, !0), _ && (r || K || !L && ee))) {
        const [G, J] = xd({
          nodeId: L,
          dragItems: d,
          nodeLookup: j
        });
        r?.(_, d, G, J), K?.(_, G, J), L || ee?.(_, J);
      }
    }
    async function te() {
      if (!g)
        return;
      const { transform: Q, panBy: W, autoPanSpeed: j, autoPanOnNodeDrag: $ } = i();
      if (!$) {
        m = !1, cancelAnimationFrame(c);
        return;
      }
      const [M, R] = jb(p, g, j);
      (M !== 0 || R !== 0) && (u.x = (u.x ?? 0) - M / Q[2], u.y = (u.y ?? 0) - R / Q[2], await W({ x: M, y: R }) && q(u)), c = requestAnimationFrame(te);
    }
    function F(Q) {
      const { nodeLookup: W, multiSelectionActive: j, nodesDraggable: $, transform: M, snapGrid: R, snapToGrid: B, selectNodesOnDrag: K, onNodeDragStart: ee, onSelectionDragStart: D, unselectNodesAndEdges: V } = i();
      y = !0, (!K || !I) && !j && L && (W.get(L)?.selected || V()), I && K && L && t?.(L);
      const ne = $r(Q.sourceEvent, { transform: M, snapGrid: R, snapToGrid: B, containerBounds: g });
      if (u = ne, d = OC(W, $, ne, L), d.size > 0 && (o || ee || !L && D)) {
        const [H, E] = xd({
          nodeId: L,
          dragItems: d,
          nodeLookup: W
        });
        o?.(Q.sourceEvent, d, H, E), ee?.(Q.sourceEvent, H, E), L || D?.(Q.sourceEvent, E);
      }
    }
    const Y = lb().clickDistance(k).on("start", (Q) => {
      const { domNode: W, nodeDragThreshold: j, transform: $, snapGrid: M, snapToGrid: R } = i();
      g = W?.getBoundingClientRect() || null, x = !1, w = !1, _ = Q.sourceEvent, j === 0 && F(Q), u = $r(Q.sourceEvent, { transform: $, snapGrid: M, snapToGrid: R, containerBounds: g }), p = vn(Q.sourceEvent, g);
    }).on("drag", (Q) => {
      const { autoPanOnNodeDrag: W, transform: j, snapGrid: $, snapToGrid: M, nodeDragThreshold: R, nodeLookup: B } = i(), K = $r(Q.sourceEvent, { transform: j, snapGrid: $, snapToGrid: M, containerBounds: g });
      if (_ = Q.sourceEvent, (Q.sourceEvent.type === "touchmove" && Q.sourceEvent.touches.length > 1 || // if user deletes a node while dragging, we need to abort the drag to prevent errors
      L && !B.has(L)) && (x = !0), !x) {
        if (!m && W && y && (m = !0, te()), !y) {
          const ee = vn(Q.sourceEvent, g), D = ee.x - p.x, V = ee.y - p.y;
          Math.sqrt(D * D + V * V) > R && F(Q);
        }
        (u.x !== K.xSnapped || u.y !== K.ySnapped) && d && y && (p = vn(Q.sourceEvent, g), q(K));
      }
    }).on("end", (Q) => {
      if (!(!y || x) && (m = !1, y = !1, cancelAnimationFrame(c), d.size > 0)) {
        const { nodeLookup: W, updateNodePositions: j, onNodeDragStop: $, onSelectionDragStop: M } = i();
        if (w && (j(d, !1), w = !1), s || $ || !L && M) {
          const [R, B] = xd({
            nodeId: L,
            dragItems: d,
            nodeLookup: W,
            dragging: !1
          });
          s?.(Q.sourceEvent, d, R, B), $?.(Q.sourceEvent, R, B), L || M?.(Q.sourceEvent, B);
        }
      }
    }).filter((Q) => {
      const W = Q.target;
      return !Q.button && (!O || !m0(W, `.${O}`, C)) && (!N || m0(W, N, C));
    });
    v.call(Y);
  }
  function A() {
    v?.on(".drag", null);
  }
  return {
    update: T,
    destroy: A
  };
}
function kC(t, i, o) {
  const r = [], s = {
    x: t.x - o,
    y: t.y - o,
    width: o * 2,
    height: o * 2
  };
  for (const u of i.values())
    il(s, Do(u)) > 0 && r.push(u);
  return r;
}
const HC = 250;
function LC(t, i, o, r) {
  let s = [], u = 1 / 0;
  const c = kC(t, o, i + HC);
  for (const d of c) {
    const m = [...d.internals.handleBounds?.source ?? [], ...d.internals.handleBounds?.target ?? []];
    for (const p of m) {
      if (r.nodeId === p.nodeId && r.type === p.type && r.id === p.id)
        continue;
      const { x: g, y } = Ma(d, p, p.position, !0), v = Math.sqrt(Math.pow(g - t.x, 2) + Math.pow(y - t.y, 2));
      v > i || (v < u ? (s = [{ ...p, x: g, y }], u = v) : v === u && s.push({ ...p, x: g, y }));
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
function $b(t, i, o, r, s, u = !1) {
  const c = r.get(t);
  if (!c)
    return null;
  const d = s === "strict" ? c.internals.handleBounds?.[i] : [...c.internals.handleBounds?.source ?? [], ...c.internals.handleBounds?.target ?? []], m = (o ? d?.find((p) => p.id === o) : d?.[0]) ?? null;
  return m && u ? { ...m, ...Ma(c, m, m.position, !0) } : m;
}
function Xb(t, i) {
  return t || (i?.classList.contains("target") ? "target" : i?.classList.contains("source") ? "source" : null);
}
function BC(t, i) {
  let o = null;
  return i ? o = !0 : t && !i && (o = !1), o;
}
const Gb = () => !0;
function IC(t, { connectionMode: i, connectionRadius: o, handleId: r, nodeId: s, edgeUpdaterType: u, isTarget: c, domNode: d, nodeLookup: m, lib: p, autoPanOnConnect: g, flowId: y, panBy: v, cancelConnection: x, onConnectStart: w, onConnect: _, onConnectEnd: T, isValidConnection: A = Gb, onReconnectEnd: O, updateConnection: N, getTransform: C, getFromHandle: I, autoPanSpeed: L, dragThreshold: k = 1, handleDomNode: q }) {
  const te = Rb(t.target);
  let F = 0, Y;
  const { x: Q, y: W } = vn(t), j = Xb(u, q), $ = d?.getBoundingClientRect();
  let M = !1;
  if (!$ || !j)
    return;
  const R = $b(s, j, r, m, i);
  if (!R)
    return;
  let B = vn(t, $), K = !1, ee = null, D = !1, V = null;
  function ne() {
    if (!g || !$)
      return;
    const [me, ge] = jb(B, $, L);
    v({ x: me, y: ge }), F = requestAnimationFrame(ne);
  }
  const H = {
    ...R,
    nodeId: s,
    type: j,
    position: R.position
  }, E = m.get(s);
  let G = {
    inProgress: !0,
    isValid: null,
    from: Ma(E, H, we.Left, !0),
    fromHandle: H,
    fromPosition: H.position,
    fromNode: E,
    to: B,
    toHandle: null,
    toPosition: n0[H.position],
    toNode: null,
    pointer: B
  };
  function J() {
    M = !0, N(G), w?.(t, { nodeId: s, handleId: r, handleType: j });
  }
  k === 0 && J();
  function Z(me) {
    if (!M) {
      const { x: Ie, y: Ve } = vn(me), ot = Ie - Q, ut = Ve - W;
      if (!(ot * ot + ut * ut > k * k))
        return;
      J();
    }
    if (!I() || !H) {
      se(me);
      return;
    }
    const ge = C();
    B = vn(me, $), Y = LC(gl(B, ge, !1, [1, 1]), o, m, H), K || (ne(), K = !0);
    const xe = Zb(me, {
      handle: Y,
      connectionMode: i,
      fromNodeId: s,
      fromHandleId: r,
      fromType: c ? "target" : "source",
      isValidConnection: A,
      doc: te,
      lib: p,
      flowId: y,
      nodeLookup: m
    });
    V = xe.handleDomNode, ee = xe.connection, D = BC(!!Y, xe.isValid);
    const Ee = m.get(s), Ce = Ee ? Ma(Ee, H, we.Left, !0) : G.from, Ae = {
      ...G,
      from: Ce,
      isValid: D,
      to: xe.toHandle && D ? Mu({ x: xe.toHandle.x, y: xe.toHandle.y }, ge) : B,
      toHandle: xe.toHandle,
      toPosition: D && xe.toHandle ? xe.toHandle.position : n0[H.position],
      toNode: xe.toHandle ? m.get(xe.toHandle.nodeId) : null,
      pointer: B
    };
    N(Ae), G = Ae;
  }
  function se(me) {
    if (!("touches" in me && me.touches.length > 0)) {
      if (M) {
        (Y || V) && ee && D && _?.(ee);
        const { inProgress: ge, ...xe } = G, Ee = {
          ...xe,
          toPosition: G.toHandle ? G.toPosition : null
        };
        T?.(me, Ee), u && O?.(me, Ee);
      }
      x(), cancelAnimationFrame(F), K = !1, D = !1, ee = null, V = null, te.removeEventListener("mousemove", Z), te.removeEventListener("mouseup", se), te.removeEventListener("touchmove", Z), te.removeEventListener("touchend", se);
    }
  }
  te.addEventListener("mousemove", Z), te.addEventListener("mouseup", se), te.addEventListener("touchmove", Z), te.addEventListener("touchend", se);
}
function Zb(t, { handle: i, connectionMode: o, fromNodeId: r, fromHandleId: s, fromType: u, doc: c, lib: d, flowId: m, isValidConnection: p = Gb, nodeLookup: g }) {
  const y = u === "target", v = i ? c.querySelector(`.${d}-flow__handle[data-id="${m}-${i?.nodeId}-${i?.id}-${i?.type}"]`) : null, { x, y: w } = vn(t), _ = c.elementFromPoint(x, w), T = _?.classList.contains(`${d}-flow__handle`) ? _ : v, A = {
    handleDomNode: T,
    isValid: !1,
    connection: null,
    toHandle: null
  };
  if (T) {
    const O = Xb(void 0, T), N = T.getAttribute("data-nodeid"), C = T.getAttribute("data-handleid"), I = T.classList.contains("connectable"), L = T.classList.contains("connectableend");
    if (!N || !O)
      return A;
    const k = {
      source: y ? N : r,
      sourceHandle: y ? C : s,
      target: y ? r : N,
      targetHandle: y ? s : C
    };
    A.connection = k;
    const te = I && L && (o === Mo.Strict ? y && O === "source" || !y && O === "target" : N !== r || C !== s);
    A.isValid = te && p(k), A.toHandle = $b(N, O, C, g, o, !0);
  }
  return A;
}
const Jd = {
  onPointerDown: IC,
  isValid: Zb
};
function VC({ domNode: t, panZoom: i, getTransform: o, getViewScale: r }) {
  const s = Kt(t);
  function u({ translateExtent: d, width: m, height: p, zoomStep: g = 1, pannable: y = !0, zoomable: v = !0, inversePan: x = !1 }) {
    const w = (N) => {
      if (N.sourceEvent.type !== "wheel" || !i)
        return;
      const C = o(), I = N.sourceEvent.ctrlKey && al() ? 10 : 1, L = -N.sourceEvent.deltaY * (N.sourceEvent.deltaMode === 1 ? 0.05 : N.sourceEvent.deltaMode ? 1 : 2e-3) * g, k = C[2] * Math.pow(2, L * I);
      i.scaleTo(k);
    };
    let _ = [0, 0];
    const T = (N) => {
      (N.sourceEvent.type === "mousedown" || N.sourceEvent.type === "touchstart") && (_ = [
        N.sourceEvent.clientX ?? N.sourceEvent.touches[0].clientX,
        N.sourceEvent.clientY ?? N.sourceEvent.touches[0].clientY
      ]);
    }, A = (N) => {
      const C = o();
      if (N.sourceEvent.type !== "mousemove" && N.sourceEvent.type !== "touchmove" || !i)
        return;
      const I = [
        N.sourceEvent.clientX ?? N.sourceEvent.touches[0].clientX,
        N.sourceEvent.clientY ?? N.sourceEvent.touches[0].clientY
      ], L = [I[0] - _[0], I[1] - _[1]];
      _ = I;
      const k = r() * Math.max(C[2], Math.log(C[2])) * (x ? -1 : 1), q = {
        x: C[0] - L[0] * k,
        y: C[1] - L[1] * k
      }, te = [
        [0, 0],
        [m, p]
      ];
      i.setViewportConstrained({
        x: q.x,
        y: q.y,
        zoom: C[2]
      }, te, d);
    }, O = Sb().on("start", T).on("zoom", y ? A : null).on("zoom.wheel", v ? w : null);
    s.call(O, {});
  }
  function c() {
    s.on("zoom", null);
  }
  return {
    update: u,
    destroy: c,
    pointer: mn
  };
}
const qu = (t) => ({
  x: t.x,
  y: t.y,
  zoom: t.k
}), wd = ({ x: t, y: i, zoom: o }) => Vu.translate(t, i).scale(o), xo = (t, i) => t.target.closest(`.${i}`), Kb = (t, i) => i === 2 && Array.isArray(t) && t.includes(2), UC = (t) => ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2, Sd = (t, i = 0, o = UC, r = () => {
}) => {
  const s = typeof i == "number" && i > 0;
  return s || r(), s ? t.transition().duration(i).ease(o).on("end", r) : t;
}, Qb = (t) => {
  const i = t.ctrlKey && al() ? 10 : 1;
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * i;
};
function YC({ zoomPanValues: t, noWheelClassName: i, d3Selection: o, d3Zoom: r, panOnScrollMode: s, panOnScrollSpeed: u, zoomOnPinch: c, onPanZoomStart: d, onPanZoom: m, onPanZoomEnd: p }) {
  return (g) => {
    if (xo(g, i))
      return g.ctrlKey && g.preventDefault(), !1;
    g.preventDefault(), g.stopImmediatePropagation();
    const y = o.property("__zoom").k || 1;
    if (g.ctrlKey && c) {
      const T = mn(g), A = Qb(g), O = y * Math.pow(2, A);
      r.scaleTo(o, O, T, g);
      return;
    }
    const v = g.deltaMode === 1 ? 20 : 1;
    let x = s === wa.Vertical ? 0 : g.deltaX * v, w = s === wa.Horizontal ? 0 : g.deltaY * v;
    !al() && g.shiftKey && s !== wa.Vertical && (x = g.deltaY * v, w = 0), r.translateBy(
      o,
      -(x / y) * u,
      -(w / y) * u,
      // @ts-ignore
      { internal: !0 }
    );
    const _ = qu(o.property("__zoom"));
    clearTimeout(t.panScrollTimeout), t.isPanScrolling ? (m?.(g, _), t.panScrollTimeout = setTimeout(() => {
      p?.(g, _), t.isPanScrolling = !1;
    }, 150)) : (t.isPanScrolling = !0, d?.(g, _));
  };
}
function qC({ noWheelClassName: t, preventScrolling: i, d3ZoomHandler: o }) {
  return function(r, s) {
    const u = r.type === "wheel", c = !i && u && !r.ctrlKey, d = xo(r, t);
    if (r.ctrlKey && u && d && r.preventDefault(), c || d)
      return null;
    r.preventDefault(), o.call(this, r, s);
  };
}
function $C({ zoomPanValues: t, onDraggingChange: i, onPanZoomStart: o }) {
  return (r) => {
    if (r.sourceEvent?.internal)
      return;
    const s = qu(r.transform);
    t.mouseButton = r.sourceEvent?.button || 0, t.isZoomingOrPanning = !0, t.prevViewport = s, r.sourceEvent?.type === "mousedown" && i(!0), o && o?.(r.sourceEvent, s);
  };
}
function XC({ zoomPanValues: t, panOnDrag: i, onPaneContextMenu: o, onTransformChange: r, onPanZoom: s }) {
  return (u) => {
    t.usedRightMouseButton = !!(o && Kb(i, t.mouseButton ?? 0)), u.sourceEvent?.sync || r([u.transform.x, u.transform.y, u.transform.k]), s && !u.sourceEvent?.internal && s?.(u.sourceEvent, qu(u.transform));
  };
}
function GC({ zoomPanValues: t, panOnDrag: i, panOnScroll: o, onDraggingChange: r, onPanZoomEnd: s, onPaneContextMenu: u }) {
  return (c) => {
    if (!c.sourceEvent?.internal && (t.isZoomingOrPanning = !1, u && Kb(i, t.mouseButton ?? 0) && !t.usedRightMouseButton && c.sourceEvent && u(c.sourceEvent), t.usedRightMouseButton = !1, r(!1), s)) {
      const d = qu(c.transform);
      t.prevViewport = d, clearTimeout(t.timerId), t.timerId = setTimeout(
        () => {
          s?.(c.sourceEvent, d);
        },
        // we need a setTimeout for panOnScroll to supress multiple end events fired during scroll
        o ? 150 : 0
      );
    }
  };
}
function ZC({ zoomActivationKeyPressed: t, zoomOnScroll: i, zoomOnPinch: o, panOnDrag: r, panOnScroll: s, zoomOnDoubleClick: u, userSelectionActive: c, noWheelClassName: d, noPanClassName: m, lib: p, connectionInProgress: g }) {
  return (y) => {
    const v = t || i, x = o && y.ctrlKey, w = y.type === "wheel";
    if (y.button === 1 && y.type === "mousedown" && (xo(y, `${p}-flow__node`) || xo(y, `${p}-flow__edge`)))
      return !0;
    if (!r && !v && !s && !u && !o || c || g && !w || xo(y, d) && w || xo(y, m) && (!w || s && w && !t) || !o && y.ctrlKey && w)
      return !1;
    if (!o && y.type === "touchstart" && y.touches?.length > 1)
      return y.preventDefault(), !1;
    if (!v && !s && !x && w || !r && (y.type === "mousedown" || y.type === "touchstart") || Array.isArray(r) && !r.includes(y.button) && y.type === "mousedown")
      return !1;
    const _ = Array.isArray(r) && r.includes(y.button) || !y.button || y.button <= 1;
    return (!y.ctrlKey || w) && _;
  };
}
function KC({ domNode: t, minZoom: i, maxZoom: o, translateExtent: r, viewport: s, onPanZoom: u, onPanZoomStart: c, onPanZoomEnd: d, onDraggingChange: m }) {
  const p = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: {},
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, g = t.getBoundingClientRect(), y = Sb().scaleExtent([i, o]).translateExtent(r), v = Kt(t).call(y);
  O({
    x: s.x,
    y: s.y,
    zoom: To(s.zoom, i, o)
  }, [
    [0, 0],
    [g.width, g.height]
  ], r);
  const x = v.on("wheel.zoom"), w = v.on("dblclick.zoom");
  y.wheelDelta(Qb);
  function _(Y, Q) {
    return v ? new Promise((W) => {
      y?.interpolate(Q?.interpolate === "linear" ? qr : iu).transform(Sd(v, Q?.duration, Q?.ease, () => W(!0)), Y);
    }) : Promise.resolve(!1);
  }
  function T({ noWheelClassName: Y, noPanClassName: Q, onPaneContextMenu: W, userSelectionActive: j, panOnScroll: $, panOnDrag: M, panOnScrollMode: R, panOnScrollSpeed: B, preventScrolling: K, zoomOnPinch: ee, zoomOnScroll: D, zoomOnDoubleClick: V, zoomActivationKeyPressed: ne, lib: H, onTransformChange: E, connectionInProgress: U, paneClickDistance: G, selectionOnDrag: J }) {
    j && !p.isZoomingOrPanning && A();
    const Z = $ && !ne && !j;
    y.clickDistance(J ? 1 / 0 : !yn(G) || G < 0 ? 0 : G);
    const se = Z ? YC({
      zoomPanValues: p,
      noWheelClassName: Y,
      d3Selection: v,
      d3Zoom: y,
      panOnScrollMode: R,
      panOnScrollSpeed: B,
      zoomOnPinch: ee,
      onPanZoomStart: c,
      onPanZoom: u,
      onPanZoomEnd: d
    }) : qC({
      noWheelClassName: Y,
      preventScrolling: K,
      d3ZoomHandler: x
    });
    if (v.on("wheel.zoom", se, { passive: !1 }), !j) {
      const ge = $C({
        zoomPanValues: p,
        onDraggingChange: m,
        onPanZoomStart: c
      });
      y.on("start", ge);
      const xe = XC({
        zoomPanValues: p,
        panOnDrag: M,
        onPaneContextMenu: !!W,
        onPanZoom: u,
        onTransformChange: E
      });
      y.on("zoom", xe);
      const Ee = GC({
        zoomPanValues: p,
        panOnDrag: M,
        panOnScroll: $,
        onPaneContextMenu: W,
        onPanZoomEnd: d,
        onDraggingChange: m
      });
      y.on("end", Ee);
    }
    const me = ZC({
      zoomActivationKeyPressed: ne,
      panOnDrag: M,
      zoomOnScroll: D,
      panOnScroll: $,
      zoomOnDoubleClick: V,
      zoomOnPinch: ee,
      userSelectionActive: j,
      noPanClassName: Q,
      noWheelClassName: Y,
      lib: H,
      connectionInProgress: U
    });
    y.filter(me), V ? v.on("dblclick.zoom", w) : v.on("dblclick.zoom", null);
  }
  function A() {
    y.on("zoom", null);
  }
  async function O(Y, Q, W) {
    const j = wd(Y), $ = y?.constrain()(j, Q, W);
    return $ && await _($), new Promise((M) => M($));
  }
  async function N(Y, Q) {
    const W = wd(Y);
    return await _(W, Q), new Promise((j) => j(W));
  }
  function C(Y) {
    if (v) {
      const Q = wd(Y), W = v.property("__zoom");
      (W.k !== Y.zoom || W.x !== Y.x || W.y !== Y.y) && y?.transform(v, Q, null, { sync: !0 });
    }
  }
  function I() {
    const Y = v ? wb(v.node()) : { x: 0, y: 0, k: 1 };
    return { x: Y.x, y: Y.y, zoom: Y.k };
  }
  function L(Y, Q) {
    return v ? new Promise((W) => {
      y?.interpolate(Q?.interpolate === "linear" ? qr : iu).scaleTo(Sd(v, Q?.duration, Q?.ease, () => W(!0)), Y);
    }) : Promise.resolve(!1);
  }
  function k(Y, Q) {
    return v ? new Promise((W) => {
      y?.interpolate(Q?.interpolate === "linear" ? qr : iu).scaleBy(Sd(v, Q?.duration, Q?.ease, () => W(!0)), Y);
    }) : Promise.resolve(!1);
  }
  function q(Y) {
    y?.scaleExtent(Y);
  }
  function te(Y) {
    y?.translateExtent(Y);
  }
  function F(Y) {
    const Q = !yn(Y) || Y < 0 ? 0 : Y;
    y?.clickDistance(Q);
  }
  return {
    update: T,
    destroy: A,
    setViewport: N,
    setViewportConstrained: O,
    getViewport: I,
    scaleTo: L,
    scaleBy: k,
    setScaleExtent: q,
    setTranslateExtent: te,
    syncViewport: C,
    setClickDistance: F
  };
}
var Ao;
(function(t) {
  t.Line = "line", t.Handle = "handle";
})(Ao || (Ao = {}));
function QC({ width: t, prevWidth: i, height: o, prevHeight: r, affectsX: s, affectsY: u }) {
  const c = t - i, d = o - r, m = [c > 0 ? 1 : c < 0 ? -1 : 0, d > 0 ? 1 : d < 0 ? -1 : 0];
  return c && s && (m[0] = m[0] * -1), d && u && (m[1] = m[1] * -1), m;
}
function g0(t) {
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
function Ws(t, i, o) {
  return Math.max(0, i - t, t - o);
}
function p0(t, i) {
  return t ? !i : i;
}
function FC(t, i, o, r, s, u, c, d) {
  let { affectsX: m, affectsY: p } = i;
  const { isHorizontal: g, isVertical: y } = i, v = g && y, { xSnapped: x, ySnapped: w } = o, { minWidth: _, maxWidth: T, minHeight: A, maxHeight: O } = r, { x: N, y: C, width: I, height: L, aspectRatio: k } = t;
  let q = Math.floor(g ? x - t.pointerX : 0), te = Math.floor(y ? w - t.pointerY : 0);
  const F = I + (m ? -q : q), Y = L + (p ? -te : te), Q = -u[0] * I, W = -u[1] * L;
  let j = Ws(F, _, T), $ = Ws(Y, A, O);
  if (c) {
    let B = 0, K = 0;
    m && q < 0 ? B = Ui(N + q + Q, c[0][0]) : !m && q > 0 && (B = Yi(N + F + Q, c[1][0])), p && te < 0 ? K = Ui(C + te + W, c[0][1]) : !p && te > 0 && (K = Yi(C + Y + W, c[1][1])), j = Math.max(j, B), $ = Math.max($, K);
  }
  if (d) {
    let B = 0, K = 0;
    m && q > 0 ? B = Yi(N + q, d[0][0]) : !m && q < 0 && (B = Ui(N + F, d[1][0])), p && te > 0 ? K = Yi(C + te, d[0][1]) : !p && te < 0 && (K = Ui(C + Y, d[1][1])), j = Math.max(j, B), $ = Math.max($, K);
  }
  if (s) {
    if (g) {
      const B = Ws(F / k, A, O) * k;
      if (j = Math.max(j, B), c) {
        let K = 0;
        !m && !p || m && !p && v ? K = Yi(C + W + F / k, c[1][1]) * k : K = Ui(C + W + (m ? q : -q) / k, c[0][1]) * k, j = Math.max(j, K);
      }
      if (d) {
        let K = 0;
        !m && !p || m && !p && v ? K = Ui(C + F / k, d[1][1]) * k : K = Yi(C + (m ? q : -q) / k, d[0][1]) * k, j = Math.max(j, K);
      }
    }
    if (y) {
      const B = Ws(Y * k, _, T) / k;
      if ($ = Math.max($, B), c) {
        let K = 0;
        !m && !p || p && !m && v ? K = Yi(N + Y * k + Q, c[1][0]) / k : K = Ui(N + (p ? te : -te) * k + Q, c[0][0]) / k, $ = Math.max($, K);
      }
      if (d) {
        let K = 0;
        !m && !p || p && !m && v ? K = Ui(N + Y * k, d[1][0]) / k : K = Yi(N + (p ? te : -te) * k, d[0][0]) / k, $ = Math.max($, K);
      }
    }
  }
  te = te + (te < 0 ? $ : -$), q = q + (q < 0 ? j : -j), s && (v ? F > Y * k ? te = (p0(m, p) ? -q : q) / k : q = (p0(m, p) ? -te : te) * k : g ? (te = q / k, p = m) : (q = te * k, m = p));
  const M = m ? N + q : N, R = p ? C + te : C;
  return {
    width: I + (m ? -q : q),
    height: L + (p ? -te : te),
    x: u[0] * q * (m ? -1 : 1) + M,
    y: u[1] * te * (p ? -1 : 1) + R
  };
}
const Fb = { width: 0, height: 0, x: 0, y: 0 }, WC = {
  ...Fb,
  pointerX: 0,
  pointerY: 0,
  aspectRatio: 1
};
function JC(t) {
  return [
    [0, 0],
    [t.measured.width, t.measured.height]
  ];
}
function PC(t, i, o) {
  const r = i.position.x + t.position.x, s = i.position.y + t.position.y, u = t.measured.width ?? 0, c = t.measured.height ?? 0, d = o[0] * u, m = o[1] * c;
  return [
    [r - d, s - m],
    [r + u - d, s + c - m]
  ];
}
function eM({ domNode: t, nodeId: i, getStoreItems: o, onChange: r, onEnd: s }) {
  const u = Kt(t);
  let c = {
    controlDirection: g0("bottom-right"),
    boundaries: {
      minWidth: 0,
      minHeight: 0,
      maxWidth: Number.MAX_VALUE,
      maxHeight: Number.MAX_VALUE
    },
    resizeDirection: void 0,
    keepAspectRatio: !1
  };
  function d({ controlPosition: p, boundaries: g, keepAspectRatio: y, resizeDirection: v, onResizeStart: x, onResize: w, onResizeEnd: _, shouldResize: T }) {
    let A = { ...Fb }, O = { ...WC };
    c = {
      boundaries: g,
      resizeDirection: v,
      keepAspectRatio: y,
      controlDirection: g0(p)
    };
    let N, C = null, I = [], L, k, q, te = !1;
    const F = lb().on("start", (Y) => {
      const { nodeLookup: Q, transform: W, snapGrid: j, snapToGrid: $, nodeOrigin: M, paneDomNode: R } = o();
      if (N = Q.get(i), !N)
        return;
      C = R?.getBoundingClientRect() ?? null;
      const { xSnapped: B, ySnapped: K } = $r(Y.sourceEvent, {
        transform: W,
        snapGrid: j,
        snapToGrid: $,
        containerBounds: C
      });
      A = {
        width: N.measured.width ?? 0,
        height: N.measured.height ?? 0,
        x: N.position.x ?? 0,
        y: N.position.y ?? 0
      }, O = {
        ...A,
        pointerX: B,
        pointerY: K,
        aspectRatio: A.width / A.height
      }, L = void 0, N.parentId && (N.extent === "parent" || N.expandParent) && (L = Q.get(N.parentId), k = L && N.extent === "parent" ? JC(L) : void 0), I = [], q = void 0;
      for (const [ee, D] of Q)
        if (D.parentId === i && (I.push({
          id: ee,
          position: { ...D.position },
          extent: D.extent
        }), D.extent === "parent" || D.expandParent)) {
          const V = PC(D, N, D.origin ?? M);
          q ? q = [
            [Math.min(V[0][0], q[0][0]), Math.min(V[0][1], q[0][1])],
            [Math.max(V[1][0], q[1][0]), Math.max(V[1][1], q[1][1])]
          ] : q = V;
        }
      x?.(Y, { ...A });
    }).on("drag", (Y) => {
      const { transform: Q, snapGrid: W, snapToGrid: j, nodeOrigin: $ } = o(), M = $r(Y.sourceEvent, {
        transform: Q,
        snapGrid: W,
        snapToGrid: j,
        containerBounds: C
      }), R = [];
      if (!N)
        return;
      const { x: B, y: K, width: ee, height: D } = A, V = {}, ne = N.origin ?? $, { width: H, height: E, x: U, y: G } = FC(O, c.controlDirection, M, c.boundaries, c.keepAspectRatio, ne, k, q), J = H !== ee, Z = E !== D, se = U !== B && J, me = G !== K && Z;
      if (!se && !me && !J && !Z)
        return;
      if ((se || me || ne[0] === 1 || ne[1] === 1) && (V.x = se ? U : A.x, V.y = me ? G : A.y, A.x = V.x, A.y = V.y, I.length > 0)) {
        const Ce = U - B, Ae = G - K;
        for (const Ie of I)
          Ie.position = {
            x: Ie.position.x - Ce + ne[0] * (H - ee),
            y: Ie.position.y - Ae + ne[1] * (E - D)
          }, R.push(Ie);
      }
      if ((J || Z) && (V.width = J && (!c.resizeDirection || c.resizeDirection === "horizontal") ? H : A.width, V.height = Z && (!c.resizeDirection || c.resizeDirection === "vertical") ? E : A.height, A.width = V.width, A.height = V.height), L && N.expandParent) {
        const Ce = ne[0] * (V.width ?? 0);
        V.x && V.x < Ce && (A.x = Ce, O.x = O.x - (V.x - Ce));
        const Ae = ne[1] * (V.height ?? 0);
        V.y && V.y < Ae && (A.y = Ae, O.y = O.y - (V.y - Ae));
      }
      const ge = QC({
        width: A.width,
        prevWidth: ee,
        height: A.height,
        prevHeight: D,
        affectsX: c.controlDirection.affectsX,
        affectsY: c.controlDirection.affectsY
      }), xe = { ...A, direction: ge };
      T?.(Y, xe) !== !1 && (te = !0, w?.(Y, xe), r(V, R));
    }).on("end", (Y) => {
      te && (_?.(Y, { ...A }), s?.({ ...A }), te = !1);
    });
    u.call(F);
  }
  function m() {
    u.on(".drag", null);
  }
  return {
    update: d,
    destroy: m
  };
}
var Ed = { exports: {} }, _d = {}, Nd = { exports: {} }, Cd = {};
var y0;
function tM() {
  if (y0) return Cd;
  y0 = 1;
  var t = rl();
  function i(y, v) {
    return y === v && (y !== 0 || 1 / y === 1 / v) || y !== y && v !== v;
  }
  var o = typeof Object.is == "function" ? Object.is : i, r = t.useState, s = t.useEffect, u = t.useLayoutEffect, c = t.useDebugValue;
  function d(y, v) {
    var x = v(), w = r({ inst: { value: x, getSnapshot: v } }), _ = w[0].inst, T = w[1];
    return u(
      function() {
        _.value = x, _.getSnapshot = v, m(_) && T({ inst: _ });
      },
      [y, x, v]
    ), s(
      function() {
        return m(_) && T({ inst: _ }), y(function() {
          m(_) && T({ inst: _ });
        });
      },
      [y]
    ), c(x), x;
  }
  function m(y) {
    var v = y.getSnapshot;
    y = y.value;
    try {
      var x = v();
      return !o(y, x);
    } catch {
      return !0;
    }
  }
  function p(y, v) {
    return v();
  }
  var g = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? p : d;
  return Cd.useSyncExternalStore = t.useSyncExternalStore !== void 0 ? t.useSyncExternalStore : g, Cd;
}
var v0;
function nM() {
  return v0 || (v0 = 1, Nd.exports = tM()), Nd.exports;
}
var b0;
function iM() {
  if (b0) return _d;
  b0 = 1;
  var t = rl(), i = nM();
  function o(p, g) {
    return p === g && (p !== 0 || 1 / p === 1 / g) || p !== p && g !== g;
  }
  var r = typeof Object.is == "function" ? Object.is : o, s = i.useSyncExternalStore, u = t.useRef, c = t.useEffect, d = t.useMemo, m = t.useDebugValue;
  return _d.useSyncExternalStoreWithSelector = function(p, g, y, v, x) {
    var w = u(null);
    if (w.current === null) {
      var _ = { hasValue: !1, value: null };
      w.current = _;
    } else _ = w.current;
    w = d(
      function() {
        function A(L) {
          if (!O) {
            if (O = !0, N = L, L = v(L), x !== void 0 && _.hasValue) {
              var k = _.value;
              if (x(k, L))
                return C = k;
            }
            return C = L;
          }
          if (k = C, r(N, L)) return k;
          var q = v(L);
          return x !== void 0 && x(k, q) ? (N = L, k) : (N = L, C = q);
        }
        var O = !1, N, C, I = y === void 0 ? null : y;
        return [
          function() {
            return A(g());
          },
          I === null ? void 0 : function() {
            return A(I());
          }
        ];
      },
      [g, y, v, x]
    );
    var T = s(p, w[0], w[1]);
    return c(
      function() {
        _.hasValue = !0, _.value = T;
      },
      [T]
    ), m(T), T;
  }, _d;
}
var x0;
function aM() {
  return x0 || (x0 = 1, Ed.exports = iM()), Ed.exports;
}
var oM = aM();
const rM = /* @__PURE__ */ _v(oM), lM = {}, w0 = (t) => {
  let i;
  const o = /* @__PURE__ */ new Set(), r = (g, y) => {
    const v = typeof g == "function" ? g(i) : g;
    if (!Object.is(v, i)) {
      const x = i;
      i = y ?? (typeof v != "object" || v === null) ? v : Object.assign({}, i, v), o.forEach((w) => w(i, x));
    }
  }, s = () => i, m = { setState: r, getState: s, getInitialState: () => p, subscribe: (g) => (o.add(g), () => o.delete(g)), destroy: () => {
    (lM ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), o.clear();
  } }, p = i = t(r, s, m);
  return m;
}, sM = (t) => t ? w0(t) : w0, { useDebugValue: uM } = kr, { useSyncExternalStoreWithSelector: cM } = rM, fM = (t) => t;
function Wb(t, i = fM, o) {
  const r = cM(
    t.subscribe,
    t.getState,
    t.getServerState || t.getInitialState,
    i,
    o
  );
  return uM(r), r;
}
const S0 = (t, i) => {
  const o = sM(t), r = (s, u = i) => Wb(o, s, u);
  return Object.assign(r, o), r;
}, dM = (t, i) => t ? S0(t, i) : S0;
function tt(t, i) {
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
var Md = { exports: {} }, Mt = {};
var E0;
function hM() {
  if (E0) return Mt;
  E0 = 1;
  var t = rl();
  function i(m) {
    var p = "https://react.dev/errors/" + m;
    if (1 < arguments.length) {
      p += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var g = 2; g < arguments.length; g++)
        p += "&args[]=" + encodeURIComponent(arguments[g]);
    }
    return "Minified React error #" + m + "; visit " + p + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
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
  function u(m, p, g) {
    var y = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: s,
      key: y == null ? null : "" + y,
      children: m,
      containerInfo: p,
      implementation: g
    };
  }
  var c = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function d(m, p) {
    if (m === "font") return "";
    if (typeof p == "string")
      return p === "use-credentials" ? p : "";
  }
  return Mt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r, Mt.createPortal = function(m, p) {
    var g = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!p || p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11)
      throw Error(i(299));
    return u(m, p, null, g);
  }, Mt.flushSync = function(m) {
    var p = c.T, g = r.p;
    try {
      if (c.T = null, r.p = 2, m) return m();
    } finally {
      c.T = p, r.p = g, r.d.f();
    }
  }, Mt.preconnect = function(m, p) {
    typeof m == "string" && (p ? (p = p.crossOrigin, p = typeof p == "string" ? p === "use-credentials" ? p : "" : void 0) : p = null, r.d.C(m, p));
  }, Mt.prefetchDNS = function(m) {
    typeof m == "string" && r.d.D(m);
  }, Mt.preinit = function(m, p) {
    if (typeof m == "string" && p && typeof p.as == "string") {
      var g = p.as, y = d(g, p.crossOrigin), v = typeof p.integrity == "string" ? p.integrity : void 0, x = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
      g === "style" ? r.d.S(
        m,
        typeof p.precedence == "string" ? p.precedence : void 0,
        {
          crossOrigin: y,
          integrity: v,
          fetchPriority: x
        }
      ) : g === "script" && r.d.X(m, {
        crossOrigin: y,
        integrity: v,
        fetchPriority: x,
        nonce: typeof p.nonce == "string" ? p.nonce : void 0
      });
    }
  }, Mt.preinitModule = function(m, p) {
    if (typeof m == "string")
      if (typeof p == "object" && p !== null) {
        if (p.as == null || p.as === "script") {
          var g = d(
            p.as,
            p.crossOrigin
          );
          r.d.M(m, {
            crossOrigin: g,
            integrity: typeof p.integrity == "string" ? p.integrity : void 0,
            nonce: typeof p.nonce == "string" ? p.nonce : void 0
          });
        }
      } else p == null && r.d.M(m);
  }, Mt.preload = function(m, p) {
    if (typeof m == "string" && typeof p == "object" && p !== null && typeof p.as == "string") {
      var g = p.as, y = d(g, p.crossOrigin);
      r.d.L(m, g, {
        crossOrigin: y,
        integrity: typeof p.integrity == "string" ? p.integrity : void 0,
        nonce: typeof p.nonce == "string" ? p.nonce : void 0,
        type: typeof p.type == "string" ? p.type : void 0,
        fetchPriority: typeof p.fetchPriority == "string" ? p.fetchPriority : void 0,
        referrerPolicy: typeof p.referrerPolicy == "string" ? p.referrerPolicy : void 0,
        imageSrcSet: typeof p.imageSrcSet == "string" ? p.imageSrcSet : void 0,
        imageSizes: typeof p.imageSizes == "string" ? p.imageSizes : void 0,
        media: typeof p.media == "string" ? p.media : void 0
      });
    }
  }, Mt.preloadModule = function(m, p) {
    if (typeof m == "string")
      if (p) {
        var g = d(p.as, p.crossOrigin);
        r.d.m(m, {
          as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
          crossOrigin: g,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0
        });
      } else r.d.m(m);
  }, Mt.requestFormReset = function(m) {
    r.d.r(m);
  }, Mt.unstable_batchedUpdates = function(m, p) {
    return m(p);
  }, Mt.useFormState = function(m, p, g) {
    return c.H.useFormState(m, p, g);
  }, Mt.useFormStatus = function() {
    return c.H.useHostTransitionStatus();
  }, Mt.version = "19.2.4", Mt;
}
var _0;
function Jb() {
  if (_0) return Md.exports;
  _0 = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (i) {
        console.error(i);
      }
  }
  return t(), Md.exports = hM(), Md.exports;
}
var Pb = Jb();
const $u = X.createContext(null), mM = $u.Provider, ex = zn.error001();
function Be(t, i) {
  const o = X.useContext($u);
  if (o === null)
    throw new Error(ex);
  return Wb(o, t, i);
}
function nt() {
  const t = X.useContext($u);
  if (t === null)
    throw new Error(ex);
  return X.useMemo(() => ({
    getState: t.getState,
    setState: t.setState,
    subscribe: t.subscribe
  }), [t]);
}
const N0 = { display: "none" }, gM = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  border: 0,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0px, 0px, 0px, 0px)",
  clipPath: "inset(100%)"
}, tx = "react-flow__node-desc", nx = "react-flow__edge-desc", pM = "react-flow__aria-live", yM = (t) => t.ariaLiveMessage, vM = (t) => t.ariaLabelConfig;
function bM({ rfId: t }) {
  const i = Be(yM);
  return b.jsx("div", { id: `${pM}-${t}`, "aria-live": "assertive", "aria-atomic": "true", style: gM, children: i });
}
function xM({ rfId: t, disableKeyboardA11y: i }) {
  const o = Be(vM);
  return b.jsxs(b.Fragment, { children: [b.jsx("div", { id: `${tx}-${t}`, style: N0, children: i ? o["node.a11yDescription.default"] : o["node.a11yDescription.keyboardDisabled"] }), b.jsx("div", { id: `${nx}-${t}`, style: N0, children: o["edge.a11yDescription.default"] }), !i && b.jsx(bM, { rfId: t })] });
}
const Xu = X.forwardRef(({ position: t = "top-left", children: i, className: o, style: r, ...s }, u) => {
  const c = `${t}`.split("-");
  return b.jsx("div", { className: pt(["react-flow__panel", o, ...c]), style: r, ref: u, ...s, children: i });
});
Xu.displayName = "Panel";
function wM({ proOptions: t, position: i = "bottom-right" }) {
  return t?.hideAttribution ? null : b.jsx(Xu, { position: i, className: "react-flow__attribution", "data-message": "Please only hide this attribution when you are subscribed to React Flow Pro: https://pro.reactflow.dev", children: b.jsx("a", { href: "https://reactflow.dev", target: "_blank", rel: "noopener noreferrer", "aria-label": "React Flow attribution", children: "React Flow" }) });
}
const SM = (t) => {
  const i = [], o = [];
  for (const [, r] of t.nodeLookup)
    r.selected && i.push(r.internals.userNode);
  for (const [, r] of t.edgeLookup)
    r.selected && o.push(r);
  return { selectedNodes: i, selectedEdges: o };
}, Js = (t) => t.id;
function EM(t, i) {
  return tt(t.selectedNodes.map(Js), i.selectedNodes.map(Js)) && tt(t.selectedEdges.map(Js), i.selectedEdges.map(Js));
}
function _M({ onSelectionChange: t }) {
  const i = nt(), { selectedNodes: o, selectedEdges: r } = Be(SM, EM);
  return X.useEffect(() => {
    const s = { nodes: o, edges: r };
    t?.(s), i.getState().onSelectionChangeHandlers.forEach((u) => u(s));
  }, [o, r, t]), null;
}
const NM = (t) => !!t.onSelectionChangeHandlers;
function CM({ onSelectionChange: t }) {
  const i = Be(NM);
  return t || i ? b.jsx(_M, { onSelectionChange: t }) : null;
}
const ix = [0, 0], MM = { x: 0, y: 0, zoom: 1 }, TM = [
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
], C0 = [...TM, "rfId"], DM = (t) => ({
  setNodes: t.setNodes,
  setEdges: t.setEdges,
  setMinZoom: t.setMinZoom,
  setMaxZoom: t.setMaxZoom,
  setTranslateExtent: t.setTranslateExtent,
  setNodeExtent: t.setNodeExtent,
  reset: t.reset,
  setDefaultNodesAndEdges: t.setDefaultNodesAndEdges
}), M0 = {
  /*
   * these are values that are also passed directly to other components
   * than the StoreUpdater. We can reduce the number of setStore calls
   * by setting the same values here as prev fields.
   */
  translateExtent: tl,
  nodeOrigin: ix,
  minZoom: 0.5,
  maxZoom: 2,
  elementsSelectable: !0,
  noPanClassName: "nopan",
  rfId: "1"
};
function jM(t) {
  const { setNodes: i, setEdges: o, setMinZoom: r, setMaxZoom: s, setTranslateExtent: u, setNodeExtent: c, reset: d, setDefaultNodesAndEdges: m } = Be(DM, tt), p = nt();
  X.useEffect(() => (m(t.defaultNodes, t.defaultEdges), () => {
    g.current = M0, d();
  }), []);
  const g = X.useRef(M0);
  return X.useEffect(
    () => {
      for (const y of C0) {
        const v = t[y], x = g.current[y];
        v !== x && (typeof t[y] > "u" || (y === "nodes" ? i(v) : y === "edges" ? o(v) : y === "minZoom" ? r(v) : y === "maxZoom" ? s(v) : y === "translateExtent" ? u(v) : y === "nodeExtent" ? c(v) : y === "ariaLabelConfig" ? p.setState({ ariaLabelConfig: dC(v) }) : y === "fitView" ? p.setState({ fitViewQueued: v }) : y === "fitViewOptions" ? p.setState({ fitViewOptions: v }) : p.setState({ [y]: v })));
      }
      g.current = t;
    },
    // Only re-run the effect if one of the fields we track changes
    C0.map((y) => t[y])
  ), null;
}
function T0() {
  return typeof window > "u" || !window.matchMedia ? null : window.matchMedia("(prefers-color-scheme: dark)");
}
function AM(t) {
  const [i, o] = X.useState(t === "system" ? null : t);
  return X.useEffect(() => {
    if (t !== "system") {
      o(t);
      return;
    }
    const r = T0(), s = () => o(r?.matches ? "dark" : "light");
    return s(), r?.addEventListener("change", s), () => {
      r?.removeEventListener("change", s);
    };
  }, [t]), i !== null ? i : T0()?.matches ? "dark" : "light";
}
const D0 = typeof document < "u" ? document : null;
function ol(t = null, i = { target: D0, actInsideInputWithModifier: !0 }) {
  const [o, r] = X.useState(!1), s = X.useRef(!1), u = X.useRef(/* @__PURE__ */ new Set([])), [c, d] = X.useMemo(() => {
    if (t !== null) {
      const p = (Array.isArray(t) ? t : [t]).filter((y) => typeof y == "string").map((y) => y.replace("+", `
`).replace(`

`, `
+`).split(`
`)), g = p.reduce((y, v) => y.concat(...v), []);
      return [p, g];
    }
    return [[], []];
  }, [t]);
  return X.useEffect(() => {
    const m = i?.target ?? D0, p = i?.actInsideInputWithModifier ?? !0;
    if (t !== null) {
      const g = (x) => {
        if (s.current = x.ctrlKey || x.metaKey || x.shiftKey || x.altKey, (!s.current || s.current && !p) && kb(x))
          return !1;
        const _ = A0(x.code, d);
        if (u.current.add(x[_]), j0(c, u.current, !1)) {
          const T = x.composedPath?.()?.[0] || x.target, A = T?.nodeName === "BUTTON" || T?.nodeName === "A";
          i.preventDefault !== !1 && (s.current || !A) && x.preventDefault(), r(!0);
        }
      }, y = (x) => {
        const w = A0(x.code, d);
        j0(c, u.current, !0) ? (r(!1), u.current.clear()) : u.current.delete(x[w]), x.key === "Meta" && u.current.clear(), s.current = !1;
      }, v = () => {
        u.current.clear(), r(!1);
      };
      return m?.addEventListener("keydown", g), m?.addEventListener("keyup", y), window.addEventListener("blur", v), window.addEventListener("contextmenu", v), () => {
        m?.removeEventListener("keydown", g), m?.removeEventListener("keyup", y), window.removeEventListener("blur", v), window.removeEventListener("contextmenu", v);
      };
    }
  }, [t, r]), o;
}
function j0(t, i, o) {
  return t.filter((r) => o || r.length === i.size).some((r) => r.every((s) => i.has(s)));
}
function A0(t, i) {
  return i.includes(t) ? "code" : "key";
}
const OM = () => {
  const t = nt();
  return X.useMemo(() => ({
    zoomIn: (i) => {
      const { panZoom: o } = t.getState();
      return o ? o.scaleBy(1.2, { duration: i?.duration }) : Promise.resolve(!1);
    },
    zoomOut: (i) => {
      const { panZoom: o } = t.getState();
      return o ? o.scaleBy(1 / 1.2, { duration: i?.duration }) : Promise.resolve(!1);
    },
    zoomTo: (i, o) => {
      const { panZoom: r } = t.getState();
      return r ? r.scaleTo(i, { duration: o?.duration }) : Promise.resolve(!1);
    },
    getZoom: () => t.getState().transform[2],
    setViewport: async (i, o) => {
      const { transform: [r, s, u], panZoom: c } = t.getState();
      return c ? (await c.setViewport({
        x: i.x ?? r,
        y: i.y ?? s,
        zoom: i.zoom ?? u
      }, o), Promise.resolve(!0)) : Promise.resolve(!1);
    },
    getViewport: () => {
      const [i, o, r] = t.getState().transform;
      return { x: i, y: o, zoom: r };
    },
    setCenter: async (i, o, r) => t.getState().setCenter(i, o, r),
    fitBounds: async (i, o) => {
      const { width: r, height: s, minZoom: u, maxZoom: c, panZoom: d } = t.getState(), m = bh(i, r, s, u, c, o?.padding ?? 0.1);
      return d ? (await d.setViewport(m, {
        duration: o?.duration,
        ease: o?.ease,
        interpolate: o?.interpolate
      }), Promise.resolve(!0)) : Promise.resolve(!1);
    },
    screenToFlowPosition: (i, o = {}) => {
      const { transform: r, snapGrid: s, snapToGrid: u, domNode: c } = t.getState();
      if (!c)
        return i;
      const { x: d, y: m } = c.getBoundingClientRect(), p = {
        x: i.x - d,
        y: i.y - m
      }, g = o.snapGrid ?? s, y = o.snapToGrid ?? u;
      return gl(p, r, y, g);
    },
    flowToScreenPosition: (i) => {
      const { transform: o, domNode: r } = t.getState();
      if (!r)
        return i;
      const { x: s, y: u } = r.getBoundingClientRect(), c = Mu(i, o);
      return {
        x: c.x + s,
        y: c.y + u
      };
    }
  }), []);
};
function ax(t, i) {
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
      zM(m, d);
    o.push(d);
  }
  return s.length && s.forEach((u) => {
    u.index !== void 0 ? o.splice(u.index, 0, { ...u.item }) : o.push({ ...u.item });
  }), o;
}
function zM(t, i) {
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
function ox(t, i) {
  return ax(t, i);
}
function rx(t, i) {
  return ax(t, i);
}
function pa(t, i) {
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
    !(u.selected === void 0 && !c) && u.selected !== c && (o && (u.selected = c), r.push(pa(u.id, c)));
  }
  return r;
}
function O0({ items: t = [], lookup: i }) {
  const o = [], r = new Map(t.map((s) => [s.id, s]));
  for (const [s, u] of t.entries()) {
    const c = i.get(u.id), d = c?.internals?.userNode ?? c;
    d !== void 0 && d !== u && o.push({ id: u.id, item: u, type: "replace" }), d === void 0 && o.push({ item: u, type: "add", index: s });
  }
  for (const [s] of i)
    r.get(s) === void 0 && o.push({ id: s, type: "remove" });
  return o;
}
function z0(t) {
  return {
    id: t.id,
    type: "remove"
  };
}
const R0 = (t) => nC(t), RM = (t) => Mb(t);
function lx(t) {
  return X.forwardRef(t);
}
const kM = typeof window < "u" ? X.useLayoutEffect : X.useEffect;
function k0(t) {
  const [i, o] = X.useState(BigInt(0)), [r] = X.useState(() => HM(() => o((s) => s + BigInt(1))));
  return kM(() => {
    const s = r.get();
    s.length && (t(s), r.reset());
  }, [i]), r;
}
function HM(t) {
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
const sx = X.createContext(null);
function LM({ children: t }) {
  const i = nt(), o = X.useCallback((d) => {
    const { nodes: m = [], setNodes: p, hasDefaultNodes: g, onNodesChange: y, nodeLookup: v, fitViewQueued: x, onNodesChangeMiddlewareMap: w } = i.getState();
    let _ = m;
    for (const A of d)
      _ = typeof A == "function" ? A(_) : A;
    let T = O0({
      items: _,
      lookup: v
    });
    for (const A of w.values())
      T = A(T);
    g && p(_), T.length > 0 ? y?.(T) : x && window.requestAnimationFrame(() => {
      const { fitViewQueued: A, nodes: O, setNodes: N } = i.getState();
      A && N(O);
    });
  }, []), r = k0(o), s = X.useCallback((d) => {
    const { edges: m = [], setEdges: p, hasDefaultEdges: g, onEdgesChange: y, edgeLookup: v } = i.getState();
    let x = m;
    for (const w of d)
      x = typeof w == "function" ? w(x) : w;
    g ? p(x) : y && y(O0({
      items: x,
      lookup: v
    }));
  }, []), u = k0(s), c = X.useMemo(() => ({ nodeQueue: r, edgeQueue: u }), []);
  return b.jsx(sx.Provider, { value: c, children: t });
}
function BM() {
  const t = X.useContext(sx);
  if (!t)
    throw new Error("useBatchContext must be used within a BatchProvider");
  return t;
}
const IM = (t) => !!t.panZoom;
function Gu() {
  const t = OM(), i = nt(), o = BM(), r = Be(IM), s = X.useMemo(() => {
    const u = (y) => i.getState().nodeLookup.get(y), c = (y) => {
      o.nodeQueue.push(y);
    }, d = (y) => {
      o.edgeQueue.push(y);
    }, m = (y) => {
      const { nodeLookup: v, nodeOrigin: x } = i.getState(), w = R0(y) ? y : v.get(y.id), _ = w.parentId ? zb(w.position, w.measured, w.parentId, v, x) : w.position, T = {
        ...w,
        position: _,
        width: w.measured?.width ?? w.width,
        height: w.measured?.height ?? w.height
      };
      return Do(T);
    }, p = (y, v, x = { replace: !1 }) => {
      c((w) => w.map((_) => {
        if (_.id === y) {
          const T = typeof v == "function" ? v(_) : v;
          return x.replace && R0(T) ? T : { ..._, ...T };
        }
        return _;
      }));
    }, g = (y, v, x = { replace: !1 }) => {
      d((w) => w.map((_) => {
        if (_.id === y) {
          const T = typeof v == "function" ? v(_) : v;
          return x.replace && RM(T) ? T : { ..._, ...T };
        }
        return _;
      }));
    };
    return {
      getNodes: () => i.getState().nodes.map((y) => ({ ...y })),
      getNode: (y) => u(y)?.internals.userNode,
      getInternalNode: u,
      getEdges: () => {
        const { edges: y = [] } = i.getState();
        return y.map((v) => ({ ...v }));
      },
      getEdge: (y) => i.getState().edgeLookup.get(y),
      setNodes: c,
      setEdges: d,
      addNodes: (y) => {
        const v = Array.isArray(y) ? y : [y];
        o.nodeQueue.push((x) => [...x, ...v]);
      },
      addEdges: (y) => {
        const v = Array.isArray(y) ? y : [y];
        o.edgeQueue.push((x) => [...x, ...v]);
      },
      toObject: () => {
        const { nodes: y = [], edges: v = [], transform: x } = i.getState(), [w, _, T] = x;
        return {
          nodes: y.map((A) => ({ ...A })),
          edges: v.map((A) => ({ ...A })),
          viewport: {
            x: w,
            y: _,
            zoom: T
          }
        };
      },
      deleteElements: async ({ nodes: y = [], edges: v = [] }) => {
        const { nodes: x, edges: w, onNodesDelete: _, onEdgesDelete: T, triggerNodeChanges: A, triggerEdgeChanges: O, onDelete: N, onBeforeDelete: C } = i.getState(), { nodes: I, edges: L } = await lC({
          nodesToRemove: y,
          edgesToRemove: v,
          nodes: x,
          edges: w,
          onBeforeDelete: C
        }), k = L.length > 0, q = I.length > 0;
        if (k) {
          const te = L.map(z0);
          T?.(L), O(te);
        }
        if (q) {
          const te = I.map(z0);
          _?.(I), A(te);
        }
        return (q || k) && N?.({ nodes: I, edges: L }), { deletedNodes: I, deletedEdges: L };
      },
      /**
       * Partial is defined as "the 2 nodes/areas are intersecting partially".
       * If a is contained in b or b is contained in a, they are both
       * considered fully intersecting.
       */
      getIntersectingNodes: (y, v = !0, x) => {
        const w = a0(y), _ = w ? y : m(y), T = x !== void 0;
        return _ ? (x || i.getState().nodes).filter((A) => {
          const O = i.getState().nodeLookup.get(A.id);
          if (O && !w && (A.id === y.id || !O.internals.positionAbsolute))
            return !1;
          const N = Do(T ? A : O), C = il(N, _);
          return v && C > 0 || C >= N.width * N.height || C >= _.width * _.height;
        }) : [];
      },
      isNodeIntersecting: (y, v, x = !0) => {
        const _ = a0(y) ? y : m(y);
        if (!_)
          return !1;
        const T = il(_, v);
        return x && T > 0 || T >= v.width * v.height || T >= _.width * _.height;
      },
      updateNode: p,
      updateNodeData: (y, v, x = { replace: !1 }) => {
        p(y, (w) => {
          const _ = typeof v == "function" ? v(w) : v;
          return x.replace ? { ...w, data: _ } : { ...w, data: { ...w.data, ..._ } };
        }, x);
      },
      updateEdge: g,
      updateEdgeData: (y, v, x = { replace: !1 }) => {
        g(y, (w) => {
          const _ = typeof v == "function" ? v(w) : v;
          return x.replace ? { ...w, data: _ } : { ...w, data: { ...w.data, ..._ } };
        }, x);
      },
      getNodesBounds: (y) => {
        const { nodeLookup: v, nodeOrigin: x } = i.getState();
        return iC(y, { nodeLookup: v, nodeOrigin: x });
      },
      getHandleConnections: ({ type: y, id: v, nodeId: x }) => Array.from(i.getState().connectionLookup.get(`${x}-${y}${v ? `-${v}` : ""}`)?.values() ?? []),
      getNodeConnections: ({ type: y, handleId: v, nodeId: x }) => Array.from(i.getState().connectionLookup.get(`${x}${y ? v ? `-${y}-${v}` : `-${y}` : ""}`)?.values() ?? []),
      fitView: async (y) => {
        const v = i.getState().fitViewResolver ?? fC();
        return i.setState({ fitViewQueued: !0, fitViewOptions: y, fitViewResolver: v }), o.nodeQueue.push((x) => [...x]), v.promise;
      }
    };
  }, []);
  return X.useMemo(() => ({
    ...s,
    ...t,
    viewportInitialized: r
  }), [r]);
}
const H0 = (t) => t.selected, VM = typeof window < "u" ? window : void 0;
function UM({ deleteKeyCode: t, multiSelectionKeyCode: i }) {
  const o = nt(), { deleteElements: r } = Gu(), s = ol(t, { actInsideInputWithModifier: !1 }), u = ol(i, { target: VM });
  X.useEffect(() => {
    if (s) {
      const { edges: c, nodes: d } = o.getState();
      r({ nodes: d.filter(H0), edges: c.filter(H0) }), o.setState({ nodesSelectionActive: !1 });
    }
  }, [s]), X.useEffect(() => {
    o.setState({ multiSelectionActive: u });
  }, [u]);
}
function YM(t) {
  const i = nt();
  X.useEffect(() => {
    const o = () => {
      if (!t.current || !(t.current.checkVisibility?.() ?? !0))
        return !1;
      const r = xh(t.current);
      (r.height === 0 || r.width === 0) && i.getState().onError?.("004", zn.error004()), i.setState({ width: r.width || 500, height: r.height || 500 });
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
const Zu = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
}, qM = (t) => ({
  userSelectionActive: t.userSelectionActive,
  lib: t.lib,
  connectionInProgress: t.connection.inProgress
});
function $M({ onPaneContextMenu: t, zoomOnScroll: i = !0, zoomOnPinch: o = !0, panOnScroll: r = !1, panOnScrollSpeed: s = 0.5, panOnScrollMode: u = wa.Free, zoomOnDoubleClick: c = !0, panOnDrag: d = !0, defaultViewport: m, translateExtent: p, minZoom: g, maxZoom: y, zoomActivationKeyCode: v, preventScrolling: x = !0, children: w, noWheelClassName: _, noPanClassName: T, onViewportChange: A, isControlledViewport: O, paneClickDistance: N, selectionOnDrag: C }) {
  const I = nt(), L = X.useRef(null), { userSelectionActive: k, lib: q, connectionInProgress: te } = Be(qM, tt), F = ol(v), Y = X.useRef();
  YM(L);
  const Q = X.useCallback((W) => {
    A?.({ x: W[0], y: W[1], zoom: W[2] }), O || I.setState({ transform: W });
  }, [A, O]);
  return X.useEffect(() => {
    if (L.current) {
      Y.current = KC({
        domNode: L.current,
        minZoom: g,
        maxZoom: y,
        translateExtent: p,
        viewport: m,
        onDraggingChange: (M) => I.setState((R) => R.paneDragging === M ? R : { paneDragging: M }),
        onPanZoomStart: (M, R) => {
          const { onViewportChangeStart: B, onMoveStart: K } = I.getState();
          K?.(M, R), B?.(R);
        },
        onPanZoom: (M, R) => {
          const { onViewportChange: B, onMove: K } = I.getState();
          K?.(M, R), B?.(R);
        },
        onPanZoomEnd: (M, R) => {
          const { onViewportChangeEnd: B, onMoveEnd: K } = I.getState();
          K?.(M, R), B?.(R);
        }
      });
      const { x: W, y: j, zoom: $ } = Y.current.getViewport();
      return I.setState({
        panZoom: Y.current,
        transform: [W, j, $],
        domNode: L.current.closest(".react-flow")
      }), () => {
        Y.current?.destroy();
      };
    }
  }, []), X.useEffect(() => {
    Y.current?.update({
      onPaneContextMenu: t,
      zoomOnScroll: i,
      zoomOnPinch: o,
      panOnScroll: r,
      panOnScrollSpeed: s,
      panOnScrollMode: u,
      zoomOnDoubleClick: c,
      panOnDrag: d,
      zoomActivationKeyPressed: F,
      preventScrolling: x,
      noPanClassName: T,
      userSelectionActive: k,
      noWheelClassName: _,
      lib: q,
      onTransformChange: Q,
      connectionInProgress: te,
      selectionOnDrag: C,
      paneClickDistance: N
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
    F,
    x,
    T,
    k,
    _,
    q,
    Q,
    te,
    C,
    N
  ]), b.jsx("div", { className: "react-flow__renderer", ref: L, style: Zu, children: w });
}
const XM = (t) => ({
  userSelectionActive: t.userSelectionActive,
  userSelectionRect: t.userSelectionRect
});
function GM() {
  const { userSelectionActive: t, userSelectionRect: i } = Be(XM, tt);
  return t && i ? b.jsx("div", { className: "react-flow__selection react-flow__container", style: {
    width: i.width,
    height: i.height,
    transform: `translate(${i.x}px, ${i.y}px)`
  } }) : null;
}
const Td = (t, i) => (o) => {
  o.target === i.current && t?.(o);
}, ZM = (t) => ({
  userSelectionActive: t.userSelectionActive,
  elementsSelectable: t.elementsSelectable,
  connectionInProgress: t.connection.inProgress,
  dragging: t.paneDragging
});
function KM({ isSelecting: t, selectionKeyPressed: i, selectionMode: o = nl.Full, panOnDrag: r, paneClickDistance: s, selectionOnDrag: u, onSelectionStart: c, onSelectionEnd: d, onPaneClick: m, onPaneContextMenu: p, onPaneScroll: g, onPaneMouseEnter: y, onPaneMouseMove: v, onPaneMouseLeave: x, children: w }) {
  const _ = nt(), { userSelectionActive: T, elementsSelectable: A, dragging: O, connectionInProgress: N } = Be(ZM, tt), C = A && (t || T), I = X.useRef(null), L = X.useRef(), k = X.useRef(/* @__PURE__ */ new Set()), q = X.useRef(/* @__PURE__ */ new Set()), te = X.useRef(!1), F = (B) => {
    if (te.current || N) {
      te.current = !1;
      return;
    }
    m?.(B), _.getState().resetSelectedElements(), _.setState({ nodesSelectionActive: !1 });
  }, Y = (B) => {
    if (Array.isArray(r) && r?.includes(2)) {
      B.preventDefault();
      return;
    }
    p?.(B);
  }, Q = g ? (B) => g(B) : void 0, W = (B) => {
    te.current && (B.stopPropagation(), te.current = !1);
  }, j = (B) => {
    const { domNode: K } = _.getState();
    if (L.current = K?.getBoundingClientRect(), !L.current)
      return;
    const ee = B.target === I.current;
    if (!ee && !!B.target.closest(".nokey") || !t || !(u && ee || i) || B.button !== 0 || !B.isPrimary)
      return;
    B.target?.setPointerCapture?.(B.pointerId), te.current = !1;
    const { x: ne, y: H } = vn(B.nativeEvent, L.current);
    _.setState({
      userSelectionRect: {
        width: 0,
        height: 0,
        startX: ne,
        startY: H,
        x: ne,
        y: H
      }
    }), ee || (B.stopPropagation(), B.preventDefault());
  }, $ = (B) => {
    const { userSelectionRect: K, transform: ee, nodeLookup: D, edgeLookup: V, connectionLookup: ne, triggerNodeChanges: H, triggerEdgeChanges: E, defaultEdgeOptions: U, resetSelectedElements: G } = _.getState();
    if (!L.current || !K)
      return;
    const { x: J, y: Z } = vn(B.nativeEvent, L.current), { startX: se, startY: me } = K;
    if (!te.current) {
      const Ae = i ? 0 : s;
      if (Math.hypot(J - se, Z - me) <= Ae)
        return;
      G(), c?.(B);
    }
    te.current = !0;
    const ge = {
      startX: se,
      startY: me,
      x: J < se ? J : se,
      y: Z < me ? Z : me,
      width: Math.abs(J - se),
      height: Math.abs(Z - me)
    }, xe = k.current, Ee = q.current;
    k.current = new Set(vh(D, ge, ee, o === nl.Partial, !0).map((Ae) => Ae.id)), q.current = /* @__PURE__ */ new Set();
    const Ce = U?.selectable ?? !0;
    for (const Ae of k.current) {
      const Ie = ne.get(Ae);
      if (Ie)
        for (const { edgeId: Ve } of Ie.values()) {
          const ot = V.get(Ve);
          ot && (ot.selectable ?? Ce) && q.current.add(Ve);
        }
    }
    if (!o0(xe, k.current)) {
      const Ae = wo(D, k.current, !0);
      H(Ae);
    }
    if (!o0(Ee, q.current)) {
      const Ae = wo(V, q.current);
      E(Ae);
    }
    _.setState({
      userSelectionRect: ge,
      userSelectionActive: !0,
      nodesSelectionActive: !1
    });
  }, M = (B) => {
    B.button === 0 && (B.target?.releasePointerCapture?.(B.pointerId), !T && B.target === I.current && _.getState().userSelectionRect && F?.(B), _.setState({
      userSelectionActive: !1,
      userSelectionRect: null
    }), te.current && (d?.(B), _.setState({
      nodesSelectionActive: k.current.size > 0
    })));
  }, R = r === !0 || Array.isArray(r) && r.includes(0);
  return b.jsxs("div", { className: pt(["react-flow__pane", { draggable: R, dragging: O, selection: t }]), onClick: C ? void 0 : Td(F, I), onContextMenu: Td(Y, I), onWheel: Td(Q, I), onPointerEnter: C ? void 0 : y, onPointerMove: C ? $ : v, onPointerUp: C ? M : void 0, onPointerDownCapture: C ? j : void 0, onClickCapture: C ? W : void 0, onPointerLeave: x, ref: I, style: Zu, children: [w, b.jsx(GM, {})] });
}
function Pd({ id: t, store: i, unselect: o = !1, nodeRef: r }) {
  const { addSelectedNodes: s, unselectNodesAndEdges: u, multiSelectionActive: c, nodeLookup: d, onError: m } = i.getState(), p = d.get(t);
  if (!p) {
    m?.("012", zn.error012(t));
    return;
  }
  i.setState({ nodesSelectionActive: !1 }), p.selected ? (o || p.selected && c) && (u({ nodes: [p], edges: [] }), requestAnimationFrame(() => r?.current?.blur())) : s([t]);
}
function ux({ nodeRef: t, disabled: i = !1, noDragClassName: o, handleSelector: r, nodeId: s, isSelectable: u, nodeClickDistance: c }) {
  const d = nt(), [m, p] = X.useState(!1), g = X.useRef();
  return X.useEffect(() => {
    g.current = RC({
      getStoreItems: () => d.getState(),
      onNodeMouseDown: (y) => {
        Pd({
          id: y,
          store: d,
          nodeRef: t
        });
      },
      onDragStart: () => {
        p(!0);
      },
      onDragStop: () => {
        p(!1);
      }
    });
  }, []), X.useEffect(() => {
    if (!(i || !t.current || !g.current))
      return g.current.update({
        noDragClassName: o,
        handleSelector: r,
        domNode: t.current,
        isSelectable: u,
        nodeId: s,
        nodeClickDistance: c
      }), () => {
        g.current?.destroy();
      };
  }, [o, r, i, u, t, s, c]), m;
}
const QM = (t) => (i) => i.selected && (i.draggable || t && typeof i.draggable > "u");
function cx() {
  const t = nt();
  return X.useCallback((o) => {
    const { nodeExtent: r, snapToGrid: s, snapGrid: u, nodesDraggable: c, onError: d, updateNodePositions: m, nodeLookup: p, nodeOrigin: g } = t.getState(), y = /* @__PURE__ */ new Map(), v = QM(c), x = s ? u[0] : 5, w = s ? u[1] : 5, _ = o.direction.x * x * o.factor, T = o.direction.y * w * o.factor;
    for (const [, A] of p) {
      if (!v(A))
        continue;
      let O = {
        x: A.internals.positionAbsolute.x + _,
        y: A.internals.positionAbsolute.y + T
      };
      s && (O = ml(O, u));
      const { position: N, positionAbsolute: C } = Tb({
        nodeId: A.id,
        nextPosition: O,
        nodeLookup: p,
        nodeExtent: r,
        nodeOrigin: g,
        onError: d
      });
      A.position = N, A.internals.positionAbsolute = C, y.set(A.id, A);
    }
    m(y);
  }, []);
}
const Mh = X.createContext(null), FM = Mh.Provider;
Mh.Consumer;
const fx = () => X.useContext(Mh), WM = (t) => ({
  connectOnClick: t.connectOnClick,
  noPanClassName: t.noPanClassName,
  rfId: t.rfId
}), JM = (t, i, o) => (r) => {
  const { connectionClickStartHandle: s, connectionMode: u, connection: c } = r, { fromHandle: d, toHandle: m, isValid: p } = c, g = m?.nodeId === t && m?.id === i && m?.type === o;
  return {
    connectingFrom: d?.nodeId === t && d?.id === i && d?.type === o,
    connectingTo: g,
    clickConnecting: s?.nodeId === t && s?.id === i && s?.type === o,
    isPossibleEndHandle: u === Mo.Strict ? d?.type !== o : t !== d?.nodeId || i !== d?.id,
    connectionInProcess: !!d,
    clickConnectionInProcess: !!s,
    valid: g && p
  };
};
function PM({ type: t = "source", position: i = we.Top, isValidConnection: o, isConnectable: r = !0, isConnectableStart: s = !0, isConnectableEnd: u = !0, id: c, onConnect: d, children: m, className: p, onMouseDown: g, onTouchStart: y, ...v }, x) {
  const w = c || null, _ = t === "target", T = nt(), A = fx(), { connectOnClick: O, noPanClassName: N, rfId: C } = Be(WM, tt), { connectingFrom: I, connectingTo: L, clickConnecting: k, isPossibleEndHandle: q, connectionInProcess: te, clickConnectionInProcess: F, valid: Y } = Be(JM(A, w, t), tt);
  A || T.getState().onError?.("010", zn.error010());
  const Q = ($) => {
    const { defaultEdgeOptions: M, onConnect: R, hasDefaultEdges: B } = T.getState(), K = {
      ...M,
      ...$
    };
    if (B) {
      const { edges: ee, setEdges: D } = T.getState();
      D(vC(K, ee));
    }
    R?.(K), d?.(K);
  }, W = ($) => {
    if (!A)
      return;
    const M = Hb($.nativeEvent);
    if (s && (M && $.button === 0 || !M)) {
      const R = T.getState();
      Jd.onPointerDown($.nativeEvent, {
        handleDomNode: $.currentTarget,
        autoPanOnConnect: R.autoPanOnConnect,
        connectionMode: R.connectionMode,
        connectionRadius: R.connectionRadius,
        domNode: R.domNode,
        nodeLookup: R.nodeLookup,
        lib: R.lib,
        isTarget: _,
        handleId: w,
        nodeId: A,
        flowId: R.rfId,
        panBy: R.panBy,
        cancelConnection: R.cancelConnection,
        onConnectStart: R.onConnectStart,
        onConnectEnd: (...B) => T.getState().onConnectEnd?.(...B),
        updateConnection: R.updateConnection,
        onConnect: Q,
        isValidConnection: o || ((...B) => T.getState().isValidConnection?.(...B) ?? !0),
        getTransform: () => T.getState().transform,
        getFromHandle: () => T.getState().connection.fromHandle,
        autoPanSpeed: R.autoPanSpeed,
        dragThreshold: R.connectionDragThreshold
      });
    }
    M ? g?.($) : y?.($);
  }, j = ($) => {
    const { onClickConnectStart: M, onClickConnectEnd: R, connectionClickStartHandle: B, connectionMode: K, isValidConnection: ee, lib: D, rfId: V, nodeLookup: ne, connection: H } = T.getState();
    if (!A || !B && !s)
      return;
    if (!B) {
      M?.($.nativeEvent, { nodeId: A, handleId: w, handleType: t }), T.setState({ connectionClickStartHandle: { nodeId: A, type: t, id: w } });
      return;
    }
    const E = Rb($.target), U = o || ee, { connection: G, isValid: J } = Jd.isValid($.nativeEvent, {
      handle: {
        nodeId: A,
        id: w,
        type: t
      },
      connectionMode: K,
      fromNodeId: B.nodeId,
      fromHandleId: B.id || null,
      fromType: B.type,
      isValidConnection: U,
      flowId: V,
      doc: E,
      lib: D,
      nodeLookup: ne
    });
    J && G && Q(G);
    const Z = structuredClone(H);
    delete Z.inProgress, Z.toPosition = Z.toHandle ? Z.toHandle.position : null, R?.($, Z), T.setState({ connectionClickStartHandle: null });
  };
  return b.jsx("div", { "data-handleid": w, "data-nodeid": A, "data-handlepos": i, "data-id": `${C}-${A}-${w}-${t}`, className: pt([
    "react-flow__handle",
    `react-flow__handle-${i}`,
    "nodrag",
    N,
    p,
    {
      source: !_,
      target: _,
      connectable: r,
      connectablestart: s,
      connectableend: u,
      clickconnecting: k,
      connectingfrom: I,
      connectingto: L,
      valid: Y,
      /*
       * shows where you can start a connection from
       * and where you can end it while connecting
       */
      connectionindicator: r && (!te || q) && (te || F ? u : s)
    }
  ]), onMouseDown: W, onTouchStart: W, onClick: O ? j : void 0, ref: x, ...v, children: m });
}
const Oo = X.memo(lx(PM));
function eT({ data: t, isConnectable: i, sourcePosition: o = we.Bottom }) {
  return b.jsxs(b.Fragment, { children: [t?.label, b.jsx(Oo, { type: "source", position: o, isConnectable: i })] });
}
function tT({ data: t, isConnectable: i, targetPosition: o = we.Top, sourcePosition: r = we.Bottom }) {
  return b.jsxs(b.Fragment, { children: [b.jsx(Oo, { type: "target", position: o, isConnectable: i }), t?.label, b.jsx(Oo, { type: "source", position: r, isConnectable: i })] });
}
function nT() {
  return null;
}
function iT({ data: t, isConnectable: i, targetPosition: o = we.Top }) {
  return b.jsxs(b.Fragment, { children: [b.jsx(Oo, { type: "target", position: o, isConnectable: i }), t?.label] });
}
const Tu = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
}, L0 = {
  input: eT,
  default: tT,
  output: iT,
  group: nT
};
function aT(t) {
  return t.internals.handleBounds === void 0 ? {
    width: t.width ?? t.initialWidth ?? t.style?.width,
    height: t.height ?? t.initialHeight ?? t.style?.height
  } : {
    width: t.width ?? t.style?.width,
    height: t.height ?? t.style?.height
  };
}
const oT = (t) => {
  const { width: i, height: o, x: r, y: s } = hl(t.nodeLookup, {
    filter: (u) => !!u.selected
  });
  return {
    width: yn(i) ? i : null,
    height: yn(o) ? o : null,
    userSelectionActive: t.userSelectionActive,
    transformString: `translate(${t.transform[0]}px,${t.transform[1]}px) scale(${t.transform[2]}) translate(${r}px,${s}px)`
  };
};
function rT({ onSelectionContextMenu: t, noPanClassName: i, disableKeyboardA11y: o }) {
  const r = nt(), { width: s, height: u, transformString: c, userSelectionActive: d } = Be(oT, tt), m = cx(), p = X.useRef(null);
  X.useEffect(() => {
    o || p.current?.focus({
      preventScroll: !0
    });
  }, [o]);
  const g = !d && s !== null && u !== null;
  if (ux({
    nodeRef: p,
    disabled: !g
  }), !g)
    return null;
  const y = t ? (x) => {
    const w = r.getState().nodes.filter((_) => _.selected);
    t(x, w);
  } : void 0, v = (x) => {
    Object.prototype.hasOwnProperty.call(Tu, x.key) && (x.preventDefault(), m({
      direction: Tu[x.key],
      factor: x.shiftKey ? 4 : 1
    }));
  };
  return b.jsx("div", { className: pt(["react-flow__nodesselection", "react-flow__container", i]), style: {
    transform: c
  }, children: b.jsx("div", { ref: p, className: "react-flow__nodesselection-rect", onContextMenu: y, tabIndex: o ? void 0 : -1, onKeyDown: o ? void 0 : v, style: {
    width: s,
    height: u
  } }) });
}
const B0 = typeof window < "u" ? window : void 0, lT = (t) => ({ nodesSelectionActive: t.nodesSelectionActive, userSelectionActive: t.userSelectionActive });
function dx({ children: t, onPaneClick: i, onPaneMouseEnter: o, onPaneMouseMove: r, onPaneMouseLeave: s, onPaneContextMenu: u, onPaneScroll: c, paneClickDistance: d, deleteKeyCode: m, selectionKeyCode: p, selectionOnDrag: g, selectionMode: y, onSelectionStart: v, onSelectionEnd: x, multiSelectionKeyCode: w, panActivationKeyCode: _, zoomActivationKeyCode: T, elementsSelectable: A, zoomOnScroll: O, zoomOnPinch: N, panOnScroll: C, panOnScrollSpeed: I, panOnScrollMode: L, zoomOnDoubleClick: k, panOnDrag: q, defaultViewport: te, translateExtent: F, minZoom: Y, maxZoom: Q, preventScrolling: W, onSelectionContextMenu: j, noWheelClassName: $, noPanClassName: M, disableKeyboardA11y: R, onViewportChange: B, isControlledViewport: K }) {
  const { nodesSelectionActive: ee, userSelectionActive: D } = Be(lT, tt), V = ol(p, { target: B0 }), ne = ol(_, { target: B0 }), H = ne || q, E = ne || C, U = g && H !== !0, G = V || D || U;
  return UM({ deleteKeyCode: m, multiSelectionKeyCode: w }), b.jsx($M, { onPaneContextMenu: u, elementsSelectable: A, zoomOnScroll: O, zoomOnPinch: N, panOnScroll: E, panOnScrollSpeed: I, panOnScrollMode: L, zoomOnDoubleClick: k, panOnDrag: !V && H, defaultViewport: te, translateExtent: F, minZoom: Y, maxZoom: Q, zoomActivationKeyCode: T, preventScrolling: W, noWheelClassName: $, noPanClassName: M, onViewportChange: B, isControlledViewport: K, paneClickDistance: d, selectionOnDrag: U, children: b.jsxs(KM, { onSelectionStart: v, onSelectionEnd: x, onPaneClick: i, onPaneMouseEnter: o, onPaneMouseMove: r, onPaneMouseLeave: s, onPaneContextMenu: u, onPaneScroll: c, panOnDrag: H, isSelecting: !!G, selectionMode: y, selectionKeyPressed: V, paneClickDistance: d, selectionOnDrag: U, children: [t, ee && b.jsx(rT, { onSelectionContextMenu: j, noPanClassName: M, disableKeyboardA11y: R })] }) });
}
dx.displayName = "FlowRenderer";
const sT = X.memo(dx), uT = (t) => (i) => t ? vh(i.nodeLookup, { x: 0, y: 0, width: i.width, height: i.height }, i.transform, !0).map((o) => o.id) : Array.from(i.nodeLookup.keys());
function cT(t) {
  return Be(X.useCallback(uT(t), [t]), tt);
}
const fT = (t) => t.updateNodeInternals;
function dT() {
  const t = Be(fT), [i] = X.useState(() => typeof ResizeObserver > "u" ? null : new ResizeObserver((o) => {
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
  return X.useEffect(() => () => {
    i?.disconnect();
  }, [i]), i;
}
function hT({ node: t, nodeType: i, hasDimensions: o, resizeObserver: r }) {
  const s = nt(), u = X.useRef(null), c = X.useRef(null), d = X.useRef(t.sourcePosition), m = X.useRef(t.targetPosition), p = X.useRef(i), g = o && !!t.internals.handleBounds;
  return X.useEffect(() => {
    u.current && !t.hidden && (!g || c.current !== u.current) && (c.current && r?.unobserve(c.current), r?.observe(u.current), c.current = u.current);
  }, [g, t.hidden]), X.useEffect(() => () => {
    c.current && (r?.unobserve(c.current), c.current = null);
  }, []), X.useEffect(() => {
    if (u.current) {
      const y = p.current !== i, v = d.current !== t.sourcePosition, x = m.current !== t.targetPosition;
      (y || v || x) && (p.current = i, d.current = t.sourcePosition, m.current = t.targetPosition, s.getState().updateNodeInternals(/* @__PURE__ */ new Map([[t.id, { id: t.id, nodeElement: u.current, force: !0 }]])));
    }
  }, [t.id, i, t.sourcePosition, t.targetPosition]), u;
}
function mT({ id: t, onClick: i, onMouseEnter: o, onMouseMove: r, onMouseLeave: s, onContextMenu: u, onDoubleClick: c, nodesDraggable: d, elementsSelectable: m, nodesConnectable: p, nodesFocusable: g, resizeObserver: y, noDragClassName: v, noPanClassName: x, disableKeyboardA11y: w, rfId: _, nodeTypes: T, nodeClickDistance: A, onError: O }) {
  const { node: N, internals: C, isParent: I } = Be((J) => {
    const Z = J.nodeLookup.get(t), se = J.parentLookup.has(t);
    return {
      node: Z,
      internals: Z.internals,
      isParent: se
    };
  }, tt);
  let L = N.type || "default", k = T?.[L] || L0[L];
  k === void 0 && (O?.("003", zn.error003(L)), L = "default", k = T?.default || L0.default);
  const q = !!(N.draggable || d && typeof N.draggable > "u"), te = !!(N.selectable || m && typeof N.selectable > "u"), F = !!(N.connectable || p && typeof N.connectable > "u"), Y = !!(N.focusable || g && typeof N.focusable > "u"), Q = nt(), W = Ob(N), j = hT({ node: N, nodeType: L, hasDimensions: W, resizeObserver: y }), $ = ux({
    nodeRef: j,
    disabled: N.hidden || !q,
    noDragClassName: v,
    handleSelector: N.dragHandle,
    nodeId: t,
    isSelectable: te,
    nodeClickDistance: A
  }), M = cx();
  if (N.hidden)
    return null;
  const R = ci(N), B = aT(N), K = te || q || i || o || r || s, ee = o ? (J) => o(J, { ...C.userNode }) : void 0, D = r ? (J) => r(J, { ...C.userNode }) : void 0, V = s ? (J) => s(J, { ...C.userNode }) : void 0, ne = u ? (J) => u(J, { ...C.userNode }) : void 0, H = c ? (J) => c(J, { ...C.userNode }) : void 0, E = (J) => {
    const { selectNodesOnDrag: Z, nodeDragThreshold: se } = Q.getState();
    te && (!Z || !q || se > 0) && Pd({
      id: t,
      store: Q,
      nodeRef: j
    }), i && i(J, { ...C.userNode });
  }, U = (J) => {
    if (!(kb(J.nativeEvent) || w)) {
      if (Eb.includes(J.key) && te) {
        const Z = J.key === "Escape";
        Pd({
          id: t,
          store: Q,
          unselect: Z,
          nodeRef: j
        });
      } else if (q && N.selected && Object.prototype.hasOwnProperty.call(Tu, J.key)) {
        J.preventDefault();
        const { ariaLabelConfig: Z } = Q.getState();
        Q.setState({
          ariaLiveMessage: Z["node.a11yDescription.ariaLiveMessage"]({
            direction: J.key.replace("Arrow", "").toLowerCase(),
            x: ~~C.positionAbsolute.x,
            y: ~~C.positionAbsolute.y
          })
        }), M({
          direction: Tu[J.key],
          factor: J.shiftKey ? 4 : 1
        });
      }
    }
  }, G = () => {
    if (w || !j.current?.matches(":focus-visible"))
      return;
    const { transform: J, width: Z, height: se, autoPanOnNodeFocus: me, setCenter: ge } = Q.getState();
    if (!me)
      return;
    vh(/* @__PURE__ */ new Map([[t, N]]), { x: 0, y: 0, width: Z, height: se }, J, !0).length > 0 || ge(N.position.x + R.width / 2, N.position.y + R.height / 2, {
      zoom: J[2]
    });
  };
  return b.jsx("div", { className: pt([
    "react-flow__node",
    `react-flow__node-${L}`,
    {
      // this is overwritable by passing `nopan` as a class name
      [x]: q
    },
    N.className,
    {
      selected: N.selected,
      selectable: te,
      parent: I,
      draggable: q,
      dragging: $
    }
  ]), ref: j, style: {
    zIndex: C.z,
    transform: `translate(${C.positionAbsolute.x}px,${C.positionAbsolute.y}px)`,
    pointerEvents: K ? "all" : "none",
    visibility: W ? "visible" : "hidden",
    ...N.style,
    ...B
  }, "data-id": t, "data-testid": `rf__node-${t}`, onMouseEnter: ee, onMouseMove: D, onMouseLeave: V, onContextMenu: ne, onClick: E, onDoubleClick: H, onKeyDown: Y ? U : void 0, tabIndex: Y ? 0 : void 0, onFocus: Y ? G : void 0, role: N.ariaRole ?? (Y ? "group" : void 0), "aria-roledescription": "node", "aria-describedby": w ? void 0 : `${tx}-${_}`, "aria-label": N.ariaLabel, ...N.domAttributes, children: b.jsx(FM, { value: t, children: b.jsx(k, { id: t, data: N.data, type: L, positionAbsoluteX: C.positionAbsolute.x, positionAbsoluteY: C.positionAbsolute.y, selected: N.selected ?? !1, selectable: te, draggable: q, deletable: N.deletable ?? !0, isConnectable: F, sourcePosition: N.sourcePosition, targetPosition: N.targetPosition, dragging: $, dragHandle: N.dragHandle, zIndex: C.z, parentId: N.parentId, ...R }) }) });
}
var gT = X.memo(mT);
const pT = (t) => ({
  nodesDraggable: t.nodesDraggable,
  nodesConnectable: t.nodesConnectable,
  nodesFocusable: t.nodesFocusable,
  elementsSelectable: t.elementsSelectable,
  onError: t.onError
});
function hx(t) {
  const { nodesDraggable: i, nodesConnectable: o, nodesFocusable: r, elementsSelectable: s, onError: u } = Be(pT, tt), c = cT(t.onlyRenderVisibleElements), d = dT();
  return b.jsx("div", { className: "react-flow__nodes", style: Zu, children: c.map((m) => (
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
    b.jsx(gT, { id: m, nodeTypes: t.nodeTypes, nodeExtent: t.nodeExtent, onClick: t.onNodeClick, onMouseEnter: t.onNodeMouseEnter, onMouseMove: t.onNodeMouseMove, onMouseLeave: t.onNodeMouseLeave, onContextMenu: t.onNodeContextMenu, onDoubleClick: t.onNodeDoubleClick, noDragClassName: t.noDragClassName, noPanClassName: t.noPanClassName, rfId: t.rfId, disableKeyboardA11y: t.disableKeyboardA11y, resizeObserver: d, nodesDraggable: i, nodesConnectable: o, nodesFocusable: r, elementsSelectable: s, nodeClickDistance: t.nodeClickDistance, onError: u }, m)
  )) });
}
hx.displayName = "NodeRenderer";
const yT = X.memo(hx);
function vT(t) {
  return Be(X.useCallback((o) => {
    if (!t)
      return o.edges.map((s) => s.id);
    const r = [];
    if (o.width && o.height)
      for (const s of o.edges) {
        const u = o.nodeLookup.get(s.source), c = o.nodeLookup.get(s.target);
        u && c && gC({
          sourceNode: u,
          targetNode: c,
          width: o.width,
          height: o.height,
          transform: o.transform
        }) && r.push(s.id);
      }
    return r;
  }, [t]), tt);
}
const bT = ({ color: t = "none", strokeWidth: i = 1 }) => {
  const o = {
    strokeWidth: i,
    ...t && { stroke: t }
  };
  return b.jsx("polyline", { className: "arrow", style: o, strokeLinecap: "round", fill: "none", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4" });
}, xT = ({ color: t = "none", strokeWidth: i = 1 }) => {
  const o = {
    strokeWidth: i,
    ...t && { stroke: t, fill: t }
  };
  return b.jsx("polyline", { className: "arrowclosed", style: o, strokeLinecap: "round", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4 -5,-4" });
}, I0 = {
  [Nu.Arrow]: bT,
  [Nu.ArrowClosed]: xT
};
function wT(t) {
  const i = nt();
  return X.useMemo(() => Object.prototype.hasOwnProperty.call(I0, t) ? I0[t] : (i.getState().onError?.("009", zn.error009(t)), null), [t]);
}
const ST = ({ id: t, type: i, color: o, width: r = 12.5, height: s = 12.5, markerUnits: u = "strokeWidth", strokeWidth: c, orient: d = "auto-start-reverse" }) => {
  const m = wT(i);
  return m ? b.jsx("marker", { className: "react-flow__arrowhead", id: t, markerWidth: `${r}`, markerHeight: `${s}`, viewBox: "-10 -10 20 20", markerUnits: u, orient: d, refX: "0", refY: "0", children: b.jsx(m, { color: o, strokeWidth: c }) }) : null;
}, mx = ({ defaultColor: t, rfId: i }) => {
  const o = Be((u) => u.edges), r = Be((u) => u.defaultEdgeOptions), s = X.useMemo(() => EC(o, {
    id: i,
    defaultColor: t,
    defaultMarkerStart: r?.markerStart,
    defaultMarkerEnd: r?.markerEnd
  }), [o, r, i, t]);
  return s.length ? b.jsx("svg", { className: "react-flow__marker", "aria-hidden": "true", children: b.jsx("defs", { children: s.map((u) => b.jsx(ST, { id: u.id, type: u.type, color: u.color, width: u.width, height: u.height, markerUnits: u.markerUnits, strokeWidth: u.strokeWidth, orient: u.orient }, u.id)) }) }) : null;
};
mx.displayName = "MarkerDefinitions";
var ET = X.memo(mx);
function gx({ x: t, y: i, label: o, labelStyle: r, labelShowBg: s = !0, labelBgStyle: u, labelBgPadding: c = [2, 4], labelBgBorderRadius: d = 2, children: m, className: p, ...g }) {
  const [y, v] = X.useState({ x: 1, y: 0, width: 0, height: 0 }), x = pt(["react-flow__edge-textwrapper", p]), w = X.useRef(null);
  return X.useEffect(() => {
    if (w.current) {
      const _ = w.current.getBBox();
      v({
        x: _.x,
        y: _.y,
        width: _.width,
        height: _.height
      });
    }
  }, [o]), o ? b.jsxs("g", { transform: `translate(${t - y.width / 2} ${i - y.height / 2})`, className: x, visibility: y.width ? "visible" : "hidden", ...g, children: [s && b.jsx("rect", { width: y.width + 2 * c[0], x: -c[0], y: -c[1], height: y.height + 2 * c[1], className: "react-flow__edge-textbg", style: u, rx: d, ry: d }), b.jsx("text", { className: "react-flow__edge-text", y: y.height / 2, dy: "0.3em", ref: w, style: r, children: o }), m] }) : null;
}
gx.displayName = "EdgeText";
const _T = X.memo(gx);
function pl({ path: t, labelX: i, labelY: o, label: r, labelStyle: s, labelShowBg: u, labelBgStyle: c, labelBgPadding: d, labelBgBorderRadius: m, interactionWidth: p = 20, ...g }) {
  return b.jsxs(b.Fragment, { children: [b.jsx("path", { ...g, d: t, fill: "none", className: pt(["react-flow__edge-path", g.className]) }), p ? b.jsx("path", { d: t, fill: "none", strokeOpacity: 0, strokeWidth: p, className: "react-flow__edge-interaction" }) : null, r && yn(i) && yn(o) ? b.jsx(_T, { x: i, y: o, label: r, labelStyle: s, labelShowBg: u, labelBgStyle: c, labelBgPadding: d, labelBgBorderRadius: m }) : null] });
}
function V0({ pos: t, x1: i, y1: o, x2: r, y2: s }) {
  return t === we.Left || t === we.Right ? [0.5 * (i + r), o] : [i, 0.5 * (o + s)];
}
function px({ sourceX: t, sourceY: i, sourcePosition: o = we.Bottom, targetX: r, targetY: s, targetPosition: u = we.Top }) {
  const [c, d] = V0({
    pos: o,
    x1: t,
    y1: i,
    x2: r,
    y2: s
  }), [m, p] = V0({
    pos: u,
    x1: r,
    y1: s,
    x2: t,
    y2: i
  }), [g, y, v, x] = Lb({
    sourceX: t,
    sourceY: i,
    targetX: r,
    targetY: s,
    sourceControlX: c,
    sourceControlY: d,
    targetControlX: m,
    targetControlY: p
  });
  return [
    `M${t},${i} C${c},${d} ${m},${p} ${r},${s}`,
    g,
    y,
    v,
    x
  ];
}
function yx(t) {
  return X.memo(({ id: i, sourceX: o, sourceY: r, targetX: s, targetY: u, sourcePosition: c, targetPosition: d, label: m, labelStyle: p, labelShowBg: g, labelBgStyle: y, labelBgPadding: v, labelBgBorderRadius: x, style: w, markerEnd: _, markerStart: T, interactionWidth: A }) => {
    const [O, N, C] = px({
      sourceX: o,
      sourceY: r,
      sourcePosition: c,
      targetX: s,
      targetY: u,
      targetPosition: d
    }), I = t.isInternal ? void 0 : i;
    return b.jsx(pl, { id: I, path: O, labelX: N, labelY: C, label: m, labelStyle: p, labelShowBg: g, labelBgStyle: y, labelBgPadding: v, labelBgBorderRadius: x, style: w, markerEnd: _, markerStart: T, interactionWidth: A });
  });
}
const NT = yx({ isInternal: !1 }), vx = yx({ isInternal: !0 });
NT.displayName = "SimpleBezierEdge";
vx.displayName = "SimpleBezierEdgeInternal";
function bx(t) {
  return X.memo(({ id: i, sourceX: o, sourceY: r, targetX: s, targetY: u, label: c, labelStyle: d, labelShowBg: m, labelBgStyle: p, labelBgPadding: g, labelBgBorderRadius: y, style: v, sourcePosition: x = we.Bottom, targetPosition: w = we.Top, markerEnd: _, markerStart: T, pathOptions: A, interactionWidth: O }) => {
    const [N, C, I] = Qd({
      sourceX: o,
      sourceY: r,
      sourcePosition: x,
      targetX: s,
      targetY: u,
      targetPosition: w,
      borderRadius: A?.borderRadius,
      offset: A?.offset,
      stepPosition: A?.stepPosition
    }), L = t.isInternal ? void 0 : i;
    return b.jsx(pl, { id: L, path: N, labelX: C, labelY: I, label: c, labelStyle: d, labelShowBg: m, labelBgStyle: p, labelBgPadding: g, labelBgBorderRadius: y, style: v, markerEnd: _, markerStart: T, interactionWidth: O });
  });
}
const xx = bx({ isInternal: !1 }), wx = bx({ isInternal: !0 });
xx.displayName = "SmoothStepEdge";
wx.displayName = "SmoothStepEdgeInternal";
function Sx(t) {
  return X.memo(({ id: i, ...o }) => {
    const r = t.isInternal ? void 0 : i;
    return b.jsx(xx, { ...o, id: r, pathOptions: X.useMemo(() => ({ borderRadius: 0, offset: o.pathOptions?.offset }), [o.pathOptions?.offset]) });
  });
}
const CT = Sx({ isInternal: !1 }), Ex = Sx({ isInternal: !0 });
CT.displayName = "StepEdge";
Ex.displayName = "StepEdgeInternal";
function _x(t) {
  return X.memo(({ id: i, sourceX: o, sourceY: r, targetX: s, targetY: u, label: c, labelStyle: d, labelShowBg: m, labelBgStyle: p, labelBgPadding: g, labelBgBorderRadius: y, style: v, markerEnd: x, markerStart: w, interactionWidth: _ }) => {
    const [T, A, O] = Ib({ sourceX: o, sourceY: r, targetX: s, targetY: u }), N = t.isInternal ? void 0 : i;
    return b.jsx(pl, { id: N, path: T, labelX: A, labelY: O, label: c, labelStyle: d, labelShowBg: m, labelBgStyle: p, labelBgPadding: g, labelBgBorderRadius: y, style: v, markerEnd: x, markerStart: w, interactionWidth: _ });
  });
}
const MT = _x({ isInternal: !1 }), Nx = _x({ isInternal: !0 });
MT.displayName = "StraightEdge";
Nx.displayName = "StraightEdgeInternal";
function Cx(t) {
  return X.memo(({ id: i, sourceX: o, sourceY: r, targetX: s, targetY: u, sourcePosition: c = we.Bottom, targetPosition: d = we.Top, label: m, labelStyle: p, labelShowBg: g, labelBgStyle: y, labelBgPadding: v, labelBgBorderRadius: x, style: w, markerEnd: _, markerStart: T, pathOptions: A, interactionWidth: O }) => {
    const [N, C, I] = wh({
      sourceX: o,
      sourceY: r,
      sourcePosition: c,
      targetX: s,
      targetY: u,
      targetPosition: d,
      curvature: A?.curvature
    }), L = t.isInternal ? void 0 : i;
    return b.jsx(pl, { id: L, path: N, labelX: C, labelY: I, label: m, labelStyle: p, labelShowBg: g, labelBgStyle: y, labelBgPadding: v, labelBgBorderRadius: x, style: w, markerEnd: _, markerStart: T, interactionWidth: O });
  });
}
const TT = Cx({ isInternal: !1 }), Mx = Cx({ isInternal: !0 });
TT.displayName = "BezierEdge";
Mx.displayName = "BezierEdgeInternal";
const U0 = {
  default: Mx,
  straight: Nx,
  step: Ex,
  smoothstep: wx,
  simplebezier: vx
}, Y0 = {
  sourceX: null,
  sourceY: null,
  targetX: null,
  targetY: null,
  sourcePosition: null,
  targetPosition: null
}, DT = (t, i, o) => o === we.Left ? t - i : o === we.Right ? t + i : t, jT = (t, i, o) => o === we.Top ? t - i : o === we.Bottom ? t + i : t, q0 = "react-flow__edgeupdater";
function $0({ position: t, centerX: i, centerY: o, radius: r = 10, onMouseDown: s, onMouseEnter: u, onMouseOut: c, type: d }) {
  return b.jsx("circle", { onMouseDown: s, onMouseEnter: u, onMouseOut: c, className: pt([q0, `${q0}-${d}`]), cx: DT(i, r, t), cy: jT(o, r, t), r, stroke: "transparent", fill: "transparent" });
}
function AT({ isReconnectable: t, reconnectRadius: i, edge: o, sourceX: r, sourceY: s, targetX: u, targetY: c, sourcePosition: d, targetPosition: m, onReconnect: p, onReconnectStart: g, onReconnectEnd: y, setReconnecting: v, setUpdateHover: x }) {
  const w = nt(), _ = (C, I) => {
    if (C.button !== 0)
      return;
    const { autoPanOnConnect: L, domNode: k, connectionMode: q, connectionRadius: te, lib: F, onConnectStart: Y, cancelConnection: Q, nodeLookup: W, rfId: j, panBy: $, updateConnection: M } = w.getState(), R = I.type === "target", B = (D, V) => {
      v(!1), y?.(D, o, I.type, V);
    }, K = (D) => p?.(o, D), ee = (D, V) => {
      v(!0), g?.(C, o, I.type), Y?.(D, V);
    };
    Jd.onPointerDown(C.nativeEvent, {
      autoPanOnConnect: L,
      connectionMode: q,
      connectionRadius: te,
      domNode: k,
      handleId: I.id,
      nodeId: I.nodeId,
      nodeLookup: W,
      isTarget: R,
      edgeUpdaterType: I.type,
      lib: F,
      flowId: j,
      cancelConnection: Q,
      panBy: $,
      isValidConnection: (...D) => w.getState().isValidConnection?.(...D) ?? !0,
      onConnect: K,
      onConnectStart: ee,
      onConnectEnd: (...D) => w.getState().onConnectEnd?.(...D),
      onReconnectEnd: B,
      updateConnection: M,
      getTransform: () => w.getState().transform,
      getFromHandle: () => w.getState().connection.fromHandle,
      dragThreshold: w.getState().connectionDragThreshold,
      handleDomNode: C.currentTarget
    });
  }, T = (C) => _(C, { nodeId: o.target, id: o.targetHandle ?? null, type: "target" }), A = (C) => _(C, { nodeId: o.source, id: o.sourceHandle ?? null, type: "source" }), O = () => x(!0), N = () => x(!1);
  return b.jsxs(b.Fragment, { children: [(t === !0 || t === "source") && b.jsx($0, { position: d, centerX: r, centerY: s, radius: i, onMouseDown: T, onMouseEnter: O, onMouseOut: N, type: "source" }), (t === !0 || t === "target") && b.jsx($0, { position: m, centerX: u, centerY: c, radius: i, onMouseDown: A, onMouseEnter: O, onMouseOut: N, type: "target" })] });
}
function OT({ id: t, edgesFocusable: i, edgesReconnectable: o, elementsSelectable: r, onClick: s, onDoubleClick: u, onContextMenu: c, onMouseEnter: d, onMouseMove: m, onMouseLeave: p, reconnectRadius: g, onReconnect: y, onReconnectStart: v, onReconnectEnd: x, rfId: w, edgeTypes: _, noPanClassName: T, onError: A, disableKeyboardA11y: O }) {
  let N = Be((ge) => ge.edgeLookup.get(t));
  const C = Be((ge) => ge.defaultEdgeOptions);
  N = C ? { ...C, ...N } : N;
  let I = N.type || "default", L = _?.[I] || U0[I];
  L === void 0 && (A?.("011", zn.error011(I)), I = "default", L = _?.default || U0.default);
  const k = !!(N.focusable || i && typeof N.focusable > "u"), q = typeof y < "u" && (N.reconnectable || o && typeof N.reconnectable > "u"), te = !!(N.selectable || r && typeof N.selectable > "u"), F = X.useRef(null), [Y, Q] = X.useState(!1), [W, j] = X.useState(!1), $ = nt(), { zIndex: M, sourceX: R, sourceY: B, targetX: K, targetY: ee, sourcePosition: D, targetPosition: V } = Be(X.useCallback((ge) => {
    const xe = ge.nodeLookup.get(N.source), Ee = ge.nodeLookup.get(N.target);
    if (!xe || !Ee)
      return {
        zIndex: N.zIndex,
        ...Y0
      };
    const Ce = SC({
      id: t,
      sourceNode: xe,
      targetNode: Ee,
      sourceHandle: N.sourceHandle || null,
      targetHandle: N.targetHandle || null,
      connectionMode: ge.connectionMode,
      onError: A
    });
    return {
      zIndex: mC({
        selected: N.selected,
        zIndex: N.zIndex,
        sourceNode: xe,
        targetNode: Ee,
        elevateOnSelect: ge.elevateEdgesOnSelect,
        zIndexMode: ge.zIndexMode
      }),
      ...Ce || Y0
    };
  }, [N.source, N.target, N.sourceHandle, N.targetHandle, N.selected, N.zIndex]), tt), ne = X.useMemo(() => N.markerStart ? `url('#${Fd(N.markerStart, w)}')` : void 0, [N.markerStart, w]), H = X.useMemo(() => N.markerEnd ? `url('#${Fd(N.markerEnd, w)}')` : void 0, [N.markerEnd, w]);
  if (N.hidden || R === null || B === null || K === null || ee === null)
    return null;
  const E = (ge) => {
    const { addSelectedEdges: xe, unselectNodesAndEdges: Ee, multiSelectionActive: Ce } = $.getState();
    te && ($.setState({ nodesSelectionActive: !1 }), N.selected && Ce ? (Ee({ nodes: [], edges: [N] }), F.current?.blur()) : xe([t])), s && s(ge, N);
  }, U = u ? (ge) => {
    u(ge, { ...N });
  } : void 0, G = c ? (ge) => {
    c(ge, { ...N });
  } : void 0, J = d ? (ge) => {
    d(ge, { ...N });
  } : void 0, Z = m ? (ge) => {
    m(ge, { ...N });
  } : void 0, se = p ? (ge) => {
    p(ge, { ...N });
  } : void 0, me = (ge) => {
    if (!O && Eb.includes(ge.key) && te) {
      const { unselectNodesAndEdges: xe, addSelectedEdges: Ee } = $.getState();
      ge.key === "Escape" ? (F.current?.blur(), xe({ edges: [N] })) : Ee([t]);
    }
  };
  return b.jsx("svg", { style: { zIndex: M }, children: b.jsxs("g", { className: pt([
    "react-flow__edge",
    `react-flow__edge-${I}`,
    N.className,
    T,
    {
      selected: N.selected,
      animated: N.animated,
      inactive: !te && !s,
      updating: Y,
      selectable: te
    }
  ]), onClick: E, onDoubleClick: U, onContextMenu: G, onMouseEnter: J, onMouseMove: Z, onMouseLeave: se, onKeyDown: k ? me : void 0, tabIndex: k ? 0 : void 0, role: N.ariaRole ?? (k ? "group" : "img"), "aria-roledescription": "edge", "data-id": t, "data-testid": `rf__edge-${t}`, "aria-label": N.ariaLabel === null ? void 0 : N.ariaLabel || `Edge from ${N.source} to ${N.target}`, "aria-describedby": k ? `${nx}-${w}` : void 0, ref: F, ...N.domAttributes, children: [!W && b.jsx(L, { id: t, source: N.source, target: N.target, type: N.type, selected: N.selected, animated: N.animated, selectable: te, deletable: N.deletable ?? !0, label: N.label, labelStyle: N.labelStyle, labelShowBg: N.labelShowBg, labelBgStyle: N.labelBgStyle, labelBgPadding: N.labelBgPadding, labelBgBorderRadius: N.labelBgBorderRadius, sourceX: R, sourceY: B, targetX: K, targetY: ee, sourcePosition: D, targetPosition: V, data: N.data, style: N.style, sourceHandleId: N.sourceHandle, targetHandleId: N.targetHandle, markerStart: ne, markerEnd: H, pathOptions: "pathOptions" in N ? N.pathOptions : void 0, interactionWidth: N.interactionWidth }), q && b.jsx(AT, { edge: N, isReconnectable: q, reconnectRadius: g, onReconnect: y, onReconnectStart: v, onReconnectEnd: x, sourceX: R, sourceY: B, targetX: K, targetY: ee, sourcePosition: D, targetPosition: V, setUpdateHover: Q, setReconnecting: j })] }) });
}
var zT = X.memo(OT);
const RT = (t) => ({
  edgesFocusable: t.edgesFocusable,
  edgesReconnectable: t.edgesReconnectable,
  elementsSelectable: t.elementsSelectable,
  connectionMode: t.connectionMode,
  onError: t.onError
});
function Tx({ defaultMarkerColor: t, onlyRenderVisibleElements: i, rfId: o, edgeTypes: r, noPanClassName: s, onReconnect: u, onEdgeContextMenu: c, onEdgeMouseEnter: d, onEdgeMouseMove: m, onEdgeMouseLeave: p, onEdgeClick: g, reconnectRadius: y, onEdgeDoubleClick: v, onReconnectStart: x, onReconnectEnd: w, disableKeyboardA11y: _ }) {
  const { edgesFocusable: T, edgesReconnectable: A, elementsSelectable: O, onError: N } = Be(RT, tt), C = vT(i);
  return b.jsxs("div", { className: "react-flow__edges", children: [b.jsx(ET, { defaultColor: t, rfId: o }), C.map((I) => b.jsx(zT, { id: I, edgesFocusable: T, edgesReconnectable: A, elementsSelectable: O, noPanClassName: s, onReconnect: u, onContextMenu: c, onMouseEnter: d, onMouseMove: m, onMouseLeave: p, onClick: g, reconnectRadius: y, onDoubleClick: v, onReconnectStart: x, onReconnectEnd: w, rfId: o, onError: N, edgeTypes: r, disableKeyboardA11y: _ }, I))] });
}
Tx.displayName = "EdgeRenderer";
const kT = X.memo(Tx), HT = (t) => `translate(${t.transform[0]}px,${t.transform[1]}px) scale(${t.transform[2]})`;
function LT({ children: t }) {
  const i = Be(HT);
  return b.jsx("div", { className: "react-flow__viewport xyflow__viewport react-flow__container", style: { transform: i }, children: t });
}
function BT(t) {
  const i = Gu(), o = X.useRef(!1);
  X.useEffect(() => {
    !o.current && i.viewportInitialized && t && (setTimeout(() => t(i), 1), o.current = !0);
  }, [t, i.viewportInitialized]);
}
const IT = (t) => t.panZoom?.syncViewport;
function VT(t) {
  const i = Be(IT), o = nt();
  return X.useEffect(() => {
    t && (i?.(t), o.setState({ transform: [t.x, t.y, t.zoom] }));
  }, [t, i]), null;
}
function UT(t) {
  return t.connection.inProgress ? { ...t.connection, to: gl(t.connection.to, t.transform) } : { ...t.connection };
}
function YT(t) {
  return UT;
}
function qT(t) {
  const i = YT();
  return Be(i, tt);
}
const $T = (t) => ({
  nodesConnectable: t.nodesConnectable,
  isValid: t.connection.isValid,
  inProgress: t.connection.inProgress,
  width: t.width,
  height: t.height
});
function XT({ containerStyle: t, style: i, type: o, component: r }) {
  const { nodesConnectable: s, width: u, height: c, isValid: d, inProgress: m } = Be($T, tt);
  return !(u && s && m) ? null : b.jsx("svg", { style: t, width: u, height: c, className: "react-flow__connectionline react-flow__container", children: b.jsx("g", { className: pt(["react-flow__connection", Cb(d)]), children: b.jsx(Dx, { style: i, type: o, CustomComponent: r, isValid: d }) }) });
}
const Dx = ({ style: t, type: i = qi.Bezier, CustomComponent: o, isValid: r }) => {
  const { inProgress: s, from: u, fromNode: c, fromHandle: d, fromPosition: m, to: p, toNode: g, toHandle: y, toPosition: v, pointer: x } = qT();
  if (!s)
    return;
  if (o)
    return b.jsx(o, { connectionLineType: i, connectionLineStyle: t, fromNode: c, fromHandle: d, fromX: u.x, fromY: u.y, toX: p.x, toY: p.y, fromPosition: m, toPosition: v, connectionStatus: Cb(r), toNode: g, toHandle: y, pointer: x });
  let w = "";
  const _ = {
    sourceX: u.x,
    sourceY: u.y,
    sourcePosition: m,
    targetX: p.x,
    targetY: p.y,
    targetPosition: v
  };
  switch (i) {
    case qi.Bezier:
      [w] = wh(_);
      break;
    case qi.SimpleBezier:
      [w] = px(_);
      break;
    case qi.Step:
      [w] = Qd({
        ..._,
        borderRadius: 0
      });
      break;
    case qi.SmoothStep:
      [w] = Qd(_);
      break;
    default:
      [w] = Ib(_);
  }
  return b.jsx("path", { d: w, fill: "none", className: "react-flow__connection-path", style: t });
};
Dx.displayName = "ConnectionLine";
const GT = {};
function X0(t = GT) {
  X.useRef(t), nt(), X.useEffect(() => {
  }, [t]);
}
function ZT() {
  nt(), X.useRef(!1), X.useEffect(() => {
  }, []);
}
function jx({ nodeTypes: t, edgeTypes: i, onInit: o, onNodeClick: r, onEdgeClick: s, onNodeDoubleClick: u, onEdgeDoubleClick: c, onNodeMouseEnter: d, onNodeMouseMove: m, onNodeMouseLeave: p, onNodeContextMenu: g, onSelectionContextMenu: y, onSelectionStart: v, onSelectionEnd: x, connectionLineType: w, connectionLineStyle: _, connectionLineComponent: T, connectionLineContainerStyle: A, selectionKeyCode: O, selectionOnDrag: N, selectionMode: C, multiSelectionKeyCode: I, panActivationKeyCode: L, zoomActivationKeyCode: k, deleteKeyCode: q, onlyRenderVisibleElements: te, elementsSelectable: F, defaultViewport: Y, translateExtent: Q, minZoom: W, maxZoom: j, preventScrolling: $, defaultMarkerColor: M, zoomOnScroll: R, zoomOnPinch: B, panOnScroll: K, panOnScrollSpeed: ee, panOnScrollMode: D, zoomOnDoubleClick: V, panOnDrag: ne, onPaneClick: H, onPaneMouseEnter: E, onPaneMouseMove: U, onPaneMouseLeave: G, onPaneScroll: J, onPaneContextMenu: Z, paneClickDistance: se, nodeClickDistance: me, onEdgeContextMenu: ge, onEdgeMouseEnter: xe, onEdgeMouseMove: Ee, onEdgeMouseLeave: Ce, reconnectRadius: Ae, onReconnect: Ie, onReconnectStart: Ve, onReconnectEnd: ot, noDragClassName: ut, noWheelClassName: jt, noPanClassName: Wt, disableKeyboardA11y: kn, nodeExtent: yt, rfId: fi, viewport: sn, onViewportChange: Sn }) {
  return X0(t), X0(i), ZT(), BT(o), VT(sn), b.jsx(sT, { onPaneClick: H, onPaneMouseEnter: E, onPaneMouseMove: U, onPaneMouseLeave: G, onPaneContextMenu: Z, onPaneScroll: J, paneClickDistance: se, deleteKeyCode: q, selectionKeyCode: O, selectionOnDrag: N, selectionMode: C, onSelectionStart: v, onSelectionEnd: x, multiSelectionKeyCode: I, panActivationKeyCode: L, zoomActivationKeyCode: k, elementsSelectable: F, zoomOnScroll: R, zoomOnPinch: B, zoomOnDoubleClick: V, panOnScroll: K, panOnScrollSpeed: ee, panOnScrollMode: D, panOnDrag: ne, defaultViewport: Y, translateExtent: Q, minZoom: W, maxZoom: j, onSelectionContextMenu: y, preventScrolling: $, noDragClassName: ut, noWheelClassName: jt, noPanClassName: Wt, disableKeyboardA11y: kn, onViewportChange: Sn, isControlledViewport: !!sn, children: b.jsxs(LT, { children: [b.jsx(kT, { edgeTypes: i, onEdgeClick: s, onEdgeDoubleClick: c, onReconnect: Ie, onReconnectStart: Ve, onReconnectEnd: ot, onlyRenderVisibleElements: te, onEdgeContextMenu: ge, onEdgeMouseEnter: xe, onEdgeMouseMove: Ee, onEdgeMouseLeave: Ce, reconnectRadius: Ae, defaultMarkerColor: M, noPanClassName: Wt, disableKeyboardA11y: kn, rfId: fi }), b.jsx(XT, { style: _, type: w, component: T, containerStyle: A }), b.jsx("div", { className: "react-flow__edgelabel-renderer" }), b.jsx(yT, { nodeTypes: t, onNodeClick: r, onNodeDoubleClick: u, onNodeMouseEnter: d, onNodeMouseMove: m, onNodeMouseLeave: p, onNodeContextMenu: g, nodeClickDistance: me, onlyRenderVisibleElements: te, noPanClassName: Wt, noDragClassName: ut, disableKeyboardA11y: kn, nodeExtent: yt, rfId: fi }), b.jsx("div", { className: "react-flow__viewport-portal" })] }) });
}
jx.displayName = "GraphView";
const KT = X.memo(jx), G0 = ({ nodes: t, edges: i, defaultNodes: o, defaultEdges: r, width: s, height: u, fitView: c, fitViewOptions: d, minZoom: m = 0.5, maxZoom: p = 2, nodeOrigin: g, nodeExtent: y, zIndexMode: v = "basic" } = {}) => {
  const x = /* @__PURE__ */ new Map(), w = /* @__PURE__ */ new Map(), _ = /* @__PURE__ */ new Map(), T = /* @__PURE__ */ new Map(), A = r ?? i ?? [], O = o ?? t ?? [], N = g ?? [0, 0], C = y ?? tl;
  Yb(_, T, A);
  const I = Wd(O, x, w, {
    nodeOrigin: N,
    nodeExtent: C,
    zIndexMode: v
  });
  let L = [0, 0, 1];
  if (c && s && u) {
    const k = hl(x, {
      filter: (Y) => !!((Y.width || Y.initialWidth) && (Y.height || Y.initialHeight))
    }), { x: q, y: te, zoom: F } = bh(k, s, u, m, p, d?.padding ?? 0.1);
    L = [q, te, F];
  }
  return {
    rfId: "1",
    width: s ?? 0,
    height: u ?? 0,
    transform: L,
    nodes: O,
    nodesInitialized: I,
    nodeLookup: x,
    parentLookup: w,
    edges: A,
    edgeLookup: T,
    connectionLookup: _,
    onNodesChange: null,
    onEdgesChange: null,
    hasDefaultNodes: o !== void 0,
    hasDefaultEdges: r !== void 0,
    panZoom: null,
    minZoom: m,
    maxZoom: p,
    translateExtent: tl,
    nodeExtent: C,
    nodesSelectionActive: !1,
    userSelectionActive: !1,
    userSelectionRect: null,
    connectionMode: Mo.Strict,
    domNode: null,
    paneDragging: !1,
    noPanClassName: "nopan",
    nodeOrigin: N,
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
    connection: { ...Nb },
    connectionClickStartHandle: null,
    connectOnClick: !0,
    ariaLiveMessage: "",
    autoPanOnConnect: !0,
    autoPanOnNodeDrag: !0,
    autoPanOnNodeFocus: !0,
    autoPanSpeed: 15,
    connectionRadius: 20,
    onError: sC,
    isValidConnection: void 0,
    onSelectionChangeHandlers: [],
    lib: "react",
    debug: !1,
    ariaLabelConfig: _b,
    zIndexMode: v,
    onNodesChangeMiddlewareMap: /* @__PURE__ */ new Map(),
    onEdgesChangeMiddlewareMap: /* @__PURE__ */ new Map()
  };
}, QT = ({ nodes: t, edges: i, defaultNodes: o, defaultEdges: r, width: s, height: u, fitView: c, fitViewOptions: d, minZoom: m, maxZoom: p, nodeOrigin: g, nodeExtent: y, zIndexMode: v }) => dM((x, w) => {
  async function _() {
    const { nodeLookup: T, panZoom: A, fitViewOptions: O, fitViewResolver: N, width: C, height: I, minZoom: L, maxZoom: k } = w();
    A && (await rC({
      nodes: T,
      width: C,
      height: I,
      panZoom: A,
      minZoom: L,
      maxZoom: k
    }, O), N?.resolve(!0), x({ fitViewResolver: null }));
  }
  return {
    ...G0({
      nodes: t,
      edges: i,
      width: s,
      height: u,
      fitView: c,
      fitViewOptions: d,
      minZoom: m,
      maxZoom: p,
      nodeOrigin: g,
      nodeExtent: y,
      defaultNodes: o,
      defaultEdges: r,
      zIndexMode: v
    }),
    setNodes: (T) => {
      const { nodeLookup: A, parentLookup: O, nodeOrigin: N, elevateNodesOnSelect: C, fitViewQueued: I, zIndexMode: L } = w(), k = Wd(T, A, O, {
        nodeOrigin: N,
        nodeExtent: y,
        elevateNodesOnSelect: C,
        checkEquality: !0,
        zIndexMode: L
      });
      I && k ? (_(), x({ nodes: T, nodesInitialized: k, fitViewQueued: !1, fitViewOptions: void 0 })) : x({ nodes: T, nodesInitialized: k });
    },
    setEdges: (T) => {
      const { connectionLookup: A, edgeLookup: O } = w();
      Yb(A, O, T), x({ edges: T });
    },
    setDefaultNodesAndEdges: (T, A) => {
      if (T) {
        const { setNodes: O } = w();
        O(T), x({ hasDefaultNodes: !0 });
      }
      if (A) {
        const { setEdges: O } = w();
        O(A), x({ hasDefaultEdges: !0 });
      }
    },
    /*
     * Every node gets registerd at a ResizeObserver. Whenever a node
     * changes its dimensions, this function is called to measure the
     * new dimensions and update the nodes.
     */
    updateNodeInternals: (T) => {
      const { triggerNodeChanges: A, nodeLookup: O, parentLookup: N, domNode: C, nodeOrigin: I, nodeExtent: L, debug: k, fitViewQueued: q, zIndexMode: te } = w(), { changes: F, updatedInternals: Y } = jC(T, O, N, C, I, L, te);
      Y && (CC(O, N, { nodeOrigin: I, nodeExtent: L, zIndexMode: te }), q ? (_(), x({ fitViewQueued: !1, fitViewOptions: void 0 })) : x({}), F?.length > 0 && (k && console.log("React Flow: trigger node changes", F), A?.(F)));
    },
    updateNodePositions: (T, A = !1) => {
      const O = [];
      let N = [];
      const { nodeLookup: C, triggerNodeChanges: I, connection: L, updateConnection: k, onNodesChangeMiddlewareMap: q } = w();
      for (const [te, F] of T) {
        const Y = C.get(te), Q = !!(Y?.expandParent && Y?.parentId && F?.position), W = {
          id: te,
          type: "position",
          position: Q ? {
            x: Math.max(0, F.position.x),
            y: Math.max(0, F.position.y)
          } : F.position,
          dragging: A
        };
        if (Y && L.inProgress && L.fromNode.id === Y.id) {
          const j = Ma(Y, L.fromHandle, we.Left, !0);
          k({ ...L, from: j });
        }
        Q && Y.parentId && O.push({
          id: te,
          parentId: Y.parentId,
          rect: {
            ...F.internals.positionAbsolute,
            width: F.measured.width ?? 0,
            height: F.measured.height ?? 0
          }
        }), N.push(W);
      }
      if (O.length > 0) {
        const { parentLookup: te, nodeOrigin: F } = w(), Y = Ch(O, C, te, F);
        N.push(...Y);
      }
      for (const te of q.values())
        N = te(N);
      I(N);
    },
    triggerNodeChanges: (T) => {
      const { onNodesChange: A, setNodes: O, nodes: N, hasDefaultNodes: C, debug: I } = w();
      if (T?.length) {
        if (C) {
          const L = ox(T, N);
          O(L);
        }
        I && console.log("React Flow: trigger node changes", T), A?.(T);
      }
    },
    triggerEdgeChanges: (T) => {
      const { onEdgesChange: A, setEdges: O, edges: N, hasDefaultEdges: C, debug: I } = w();
      if (T?.length) {
        if (C) {
          const L = rx(T, N);
          O(L);
        }
        I && console.log("React Flow: trigger edge changes", T), A?.(T);
      }
    },
    addSelectedNodes: (T) => {
      const { multiSelectionActive: A, edgeLookup: O, nodeLookup: N, triggerNodeChanges: C, triggerEdgeChanges: I } = w();
      if (A) {
        const L = T.map((k) => pa(k, !0));
        C(L);
        return;
      }
      C(wo(N, /* @__PURE__ */ new Set([...T]), !0)), I(wo(O));
    },
    addSelectedEdges: (T) => {
      const { multiSelectionActive: A, edgeLookup: O, nodeLookup: N, triggerNodeChanges: C, triggerEdgeChanges: I } = w();
      if (A) {
        const L = T.map((k) => pa(k, !0));
        I(L);
        return;
      }
      I(wo(O, /* @__PURE__ */ new Set([...T]))), C(wo(N, /* @__PURE__ */ new Set(), !0));
    },
    unselectNodesAndEdges: ({ nodes: T, edges: A } = {}) => {
      const { edges: O, nodes: N, nodeLookup: C, triggerNodeChanges: I, triggerEdgeChanges: L } = w(), k = T || N, q = A || O, te = [];
      for (const Y of k) {
        if (!Y.selected)
          continue;
        const Q = C.get(Y.id);
        Q && (Q.selected = !1), te.push(pa(Y.id, !1));
      }
      const F = [];
      for (const Y of q)
        Y.selected && F.push(pa(Y.id, !1));
      I(te), L(F);
    },
    setMinZoom: (T) => {
      const { panZoom: A, maxZoom: O } = w();
      A?.setScaleExtent([T, O]), x({ minZoom: T });
    },
    setMaxZoom: (T) => {
      const { panZoom: A, minZoom: O } = w();
      A?.setScaleExtent([O, T]), x({ maxZoom: T });
    },
    setTranslateExtent: (T) => {
      w().panZoom?.setTranslateExtent(T), x({ translateExtent: T });
    },
    resetSelectedElements: () => {
      const { edges: T, nodes: A, triggerNodeChanges: O, triggerEdgeChanges: N, elementsSelectable: C } = w();
      if (!C)
        return;
      const I = A.reduce((k, q) => q.selected ? [...k, pa(q.id, !1)] : k, []), L = T.reduce((k, q) => q.selected ? [...k, pa(q.id, !1)] : k, []);
      O(I), N(L);
    },
    setNodeExtent: (T) => {
      const { nodes: A, nodeLookup: O, parentLookup: N, nodeOrigin: C, elevateNodesOnSelect: I, nodeExtent: L, zIndexMode: k } = w();
      T[0][0] === L[0][0] && T[0][1] === L[0][1] && T[1][0] === L[1][0] && T[1][1] === L[1][1] || (Wd(A, O, N, {
        nodeOrigin: C,
        nodeExtent: T,
        elevateNodesOnSelect: I,
        checkEquality: !1,
        zIndexMode: k
      }), x({ nodeExtent: T }));
    },
    panBy: (T) => {
      const { transform: A, width: O, height: N, panZoom: C, translateExtent: I } = w();
      return AC({ delta: T, panZoom: C, transform: A, translateExtent: I, width: O, height: N });
    },
    setCenter: async (T, A, O) => {
      const { width: N, height: C, maxZoom: I, panZoom: L } = w();
      if (!L)
        return Promise.resolve(!1);
      const k = typeof O?.zoom < "u" ? O.zoom : I;
      return await L.setViewport({
        x: N / 2 - T * k,
        y: C / 2 - A * k,
        zoom: k
      }, { duration: O?.duration, ease: O?.ease, interpolate: O?.interpolate }), Promise.resolve(!0);
    },
    cancelConnection: () => {
      x({
        connection: { ...Nb }
      });
    },
    updateConnection: (T) => {
      x({ connection: T });
    },
    reset: () => x({ ...G0() })
  };
}, Object.is);
function Ax({ initialNodes: t, initialEdges: i, defaultNodes: o, defaultEdges: r, initialWidth: s, initialHeight: u, initialMinZoom: c, initialMaxZoom: d, initialFitViewOptions: m, fitView: p, nodeOrigin: g, nodeExtent: y, zIndexMode: v, children: x }) {
  const [w] = X.useState(() => QT({
    nodes: t,
    edges: i,
    defaultNodes: o,
    defaultEdges: r,
    width: s,
    height: u,
    fitView: p,
    minZoom: c,
    maxZoom: d,
    fitViewOptions: m,
    nodeOrigin: g,
    nodeExtent: y,
    zIndexMode: v
  }));
  return b.jsx(mM, { value: w, children: b.jsx(LM, { children: x }) });
}
function FT({ children: t, nodes: i, edges: o, defaultNodes: r, defaultEdges: s, width: u, height: c, fitView: d, fitViewOptions: m, minZoom: p, maxZoom: g, nodeOrigin: y, nodeExtent: v, zIndexMode: x }) {
  return X.useContext($u) ? b.jsx(b.Fragment, { children: t }) : b.jsx(Ax, { initialNodes: i, initialEdges: o, defaultNodes: r, defaultEdges: s, initialWidth: u, initialHeight: c, fitView: d, initialFitViewOptions: m, initialMinZoom: p, initialMaxZoom: g, nodeOrigin: y, nodeExtent: v, zIndexMode: x, children: t });
}
const WT = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  zIndex: 0
};
function JT({ nodes: t, edges: i, defaultNodes: o, defaultEdges: r, className: s, nodeTypes: u, edgeTypes: c, onNodeClick: d, onEdgeClick: m, onInit: p, onMove: g, onMoveStart: y, onMoveEnd: v, onConnect: x, onConnectStart: w, onConnectEnd: _, onClickConnectStart: T, onClickConnectEnd: A, onNodeMouseEnter: O, onNodeMouseMove: N, onNodeMouseLeave: C, onNodeContextMenu: I, onNodeDoubleClick: L, onNodeDragStart: k, onNodeDrag: q, onNodeDragStop: te, onNodesDelete: F, onEdgesDelete: Y, onDelete: Q, onSelectionChange: W, onSelectionDragStart: j, onSelectionDrag: $, onSelectionDragStop: M, onSelectionContextMenu: R, onSelectionStart: B, onSelectionEnd: K, onBeforeDelete: ee, connectionMode: D, connectionLineType: V = qi.Bezier, connectionLineStyle: ne, connectionLineComponent: H, connectionLineContainerStyle: E, deleteKeyCode: U = "Backspace", selectionKeyCode: G = "Shift", selectionOnDrag: J = !1, selectionMode: Z = nl.Full, panActivationKeyCode: se = "Space", multiSelectionKeyCode: me = al() ? "Meta" : "Control", zoomActivationKeyCode: ge = al() ? "Meta" : "Control", snapToGrid: xe, snapGrid: Ee, onlyRenderVisibleElements: Ce = !1, selectNodesOnDrag: Ae, nodesDraggable: Ie, autoPanOnNodeFocus: Ve, nodesConnectable: ot, nodesFocusable: ut, nodeOrigin: jt = ix, edgesFocusable: Wt, edgesReconnectable: kn, elementsSelectable: yt = !0, defaultViewport: fi = MM, minZoom: sn = 0.5, maxZoom: Sn = 2, translateExtent: Hn = tl, preventScrolling: zo = !0, nodeExtent: di, defaultMarkerColor: Ro = "#b1b1b7", zoomOnScroll: ko = !0, zoomOnPinch: fe = !0, panOnScroll: pe = !1, panOnScrollSpeed: _e = 0.5, panOnScrollMode: De = wa.Free, zoomOnDoubleClick: Vt = !0, panOnDrag: En = !0, onPaneClick: Ho, onPaneMouseEnter: Ta, onPaneMouseMove: Da, onPaneMouseLeave: ja, onPaneScroll: Ln, onPaneContextMenu: Aa, paneClickDistance: Gi = 1, nodeClickDistance: Ku = 0, children: yl, onReconnect: Lo, onReconnectStart: Zi, onReconnectEnd: Qu, onEdgeContextMenu: vl, onEdgeDoubleClick: bl, onEdgeMouseEnter: xl, onEdgeMouseMove: Bo, onEdgeMouseLeave: Io, reconnectRadius: wl = 10, onNodesChange: Sl, onEdgesChange: _n, noDragClassName: vt = "nodrag", noWheelClassName: Ct = "nowheel", noPanClassName: Bn = "nopan", fitView: Oa, fitViewOptions: El, connectOnClick: Fu, attributionPosition: _l, proOptions: Ki, defaultEdgeOptions: Vo, elevateNodesOnSelect: hi = !0, elevateEdgesOnSelect: mi = !1, disableKeyboardA11y: gi = !1, autoPanOnConnect: pi, autoPanOnNodeDrag: ct, autoPanSpeed: Nl, connectionRadius: Cl, isValidConnection: In, onError: yi, style: Wu, id: Uo, nodeDragThreshold: Ml, connectionDragThreshold: Ju, viewport: za, onViewportChange: Ra, width: un, height: At, colorMode: Tl = "light", debug: Pu, onScroll: ka, ariaLabelConfig: Dl, zIndexMode: Qi = "basic", ...ec }, Ot) {
  const Fi = Uo || "1", jl = AM(Tl), Yo = X.useCallback((Vn) => {
    Vn.currentTarget.scrollTo({ top: 0, left: 0, behavior: "instant" }), ka?.(Vn);
  }, [ka]);
  return b.jsx("div", { "data-testid": "rf__wrapper", ...ec, onScroll: Yo, style: { ...Wu, ...WT }, ref: Ot, className: pt(["react-flow", s, jl]), id: Uo, role: "application", children: b.jsxs(FT, { nodes: t, edges: i, width: un, height: At, fitView: Oa, fitViewOptions: El, minZoom: sn, maxZoom: Sn, nodeOrigin: jt, nodeExtent: di, zIndexMode: Qi, children: [b.jsx(KT, { onInit: p, onNodeClick: d, onEdgeClick: m, onNodeMouseEnter: O, onNodeMouseMove: N, onNodeMouseLeave: C, onNodeContextMenu: I, onNodeDoubleClick: L, nodeTypes: u, edgeTypes: c, connectionLineType: V, connectionLineStyle: ne, connectionLineComponent: H, connectionLineContainerStyle: E, selectionKeyCode: G, selectionOnDrag: J, selectionMode: Z, deleteKeyCode: U, multiSelectionKeyCode: me, panActivationKeyCode: se, zoomActivationKeyCode: ge, onlyRenderVisibleElements: Ce, defaultViewport: fi, translateExtent: Hn, minZoom: sn, maxZoom: Sn, preventScrolling: zo, zoomOnScroll: ko, zoomOnPinch: fe, zoomOnDoubleClick: Vt, panOnScroll: pe, panOnScrollSpeed: _e, panOnScrollMode: De, panOnDrag: En, onPaneClick: Ho, onPaneMouseEnter: Ta, onPaneMouseMove: Da, onPaneMouseLeave: ja, onPaneScroll: Ln, onPaneContextMenu: Aa, paneClickDistance: Gi, nodeClickDistance: Ku, onSelectionContextMenu: R, onSelectionStart: B, onSelectionEnd: K, onReconnect: Lo, onReconnectStart: Zi, onReconnectEnd: Qu, onEdgeContextMenu: vl, onEdgeDoubleClick: bl, onEdgeMouseEnter: xl, onEdgeMouseMove: Bo, onEdgeMouseLeave: Io, reconnectRadius: wl, defaultMarkerColor: Ro, noDragClassName: vt, noWheelClassName: Ct, noPanClassName: Bn, rfId: Fi, disableKeyboardA11y: gi, nodeExtent: di, viewport: za, onViewportChange: Ra }), b.jsx(jM, { nodes: t, edges: i, defaultNodes: o, defaultEdges: r, onConnect: x, onConnectStart: w, onConnectEnd: _, onClickConnectStart: T, onClickConnectEnd: A, nodesDraggable: Ie, autoPanOnNodeFocus: Ve, nodesConnectable: ot, nodesFocusable: ut, edgesFocusable: Wt, edgesReconnectable: kn, elementsSelectable: yt, elevateNodesOnSelect: hi, elevateEdgesOnSelect: mi, minZoom: sn, maxZoom: Sn, nodeExtent: di, onNodesChange: Sl, onEdgesChange: _n, snapToGrid: xe, snapGrid: Ee, connectionMode: D, translateExtent: Hn, connectOnClick: Fu, defaultEdgeOptions: Vo, fitView: Oa, fitViewOptions: El, onNodesDelete: F, onEdgesDelete: Y, onDelete: Q, onNodeDragStart: k, onNodeDrag: q, onNodeDragStop: te, onSelectionDrag: $, onSelectionDragStart: j, onSelectionDragStop: M, onMove: g, onMoveStart: y, onMoveEnd: v, noPanClassName: Bn, nodeOrigin: jt, rfId: Fi, autoPanOnConnect: pi, autoPanOnNodeDrag: ct, autoPanSpeed: Nl, onError: yi, connectionRadius: Cl, isValidConnection: In, selectNodesOnDrag: Ae, nodeDragThreshold: Ml, connectionDragThreshold: Ju, onBeforeDelete: ee, debug: Pu, ariaLabelConfig: Dl, zIndexMode: Qi }), b.jsx(CM, { onSelectionChange: W }), yl, b.jsx(wM, { proOptions: Ki, position: _l }), b.jsx(xM, { rfId: Fi, disableKeyboardA11y: gi })] }) });
}
var PT = lx(JT);
const eD = (t) => t.domNode?.querySelector(".react-flow__edgelabel-renderer");
function tD({ children: t }) {
  const i = Be(eD);
  return i ? Pb.createPortal(t, i) : null;
}
function nD(t) {
  const [i, o] = X.useState(t), r = X.useCallback((s) => o((u) => ox(s, u)), []);
  return [i, o, r];
}
function iD(t) {
  const [i, o] = X.useState(t), r = X.useCallback((s) => o((u) => rx(s, u)), []);
  return [i, o, r];
}
function aD({ dimensions: t, lineWidth: i, variant: o, className: r }) {
  return b.jsx("path", { strokeWidth: i, d: `M${t[0] / 2} 0 V${t[1]} M0 ${t[1] / 2} H${t[0]}`, className: pt(["react-flow__background-pattern", o, r]) });
}
function oD({ radius: t, className: i }) {
  return b.jsx("circle", { cx: t, cy: t, r: t, className: pt(["react-flow__background-pattern", "dots", i]) });
}
var si;
(function(t) {
  t.Lines = "lines", t.Dots = "dots", t.Cross = "cross";
})(si || (si = {}));
const rD = {
  [si.Dots]: 1,
  [si.Lines]: 1,
  [si.Cross]: 6
}, lD = (t) => ({ transform: t.transform, patternId: `pattern-${t.rfId}` });
function Ox({
  id: t,
  variant: i = si.Dots,
  // only used for dots and cross
  gap: o = 20,
  // only used for lines and cross
  size: r,
  lineWidth: s = 1,
  offset: u = 0,
  color: c,
  bgColor: d,
  style: m,
  className: p,
  patternClassName: g
}) {
  const y = X.useRef(null), { transform: v, patternId: x } = Be(lD, tt), w = r || rD[i], _ = i === si.Dots, T = i === si.Cross, A = Array.isArray(o) ? o : [o, o], O = [A[0] * v[2] || 1, A[1] * v[2] || 1], N = w * v[2], C = Array.isArray(u) ? u : [u, u], I = T ? [N, N] : O, L = [
    C[0] * v[2] || 1 + I[0] / 2,
    C[1] * v[2] || 1 + I[1] / 2
  ], k = `${x}${t || ""}`;
  return b.jsxs("svg", { className: pt(["react-flow__background", p]), style: {
    ...m,
    ...Zu,
    "--xy-background-color-props": d,
    "--xy-background-pattern-color-props": c
  }, ref: y, "data-testid": "rf__background", children: [b.jsx("pattern", { id: k, x: v[0] % O[0], y: v[1] % O[1], width: O[0], height: O[1], patternUnits: "userSpaceOnUse", patternTransform: `translate(-${L[0]},-${L[1]})`, children: _ ? b.jsx(oD, { radius: N / 2, className: g }) : b.jsx(aD, { dimensions: I, lineWidth: s, variant: i, className: g }) }), b.jsx("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: `url(#${k})` })] });
}
Ox.displayName = "Background";
const sD = X.memo(Ox);
function uD() {
  return b.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", children: b.jsx("path", { d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" }) });
}
function cD() {
  return b.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 5", children: b.jsx("path", { d: "M0 0h32v4.2H0z" }) });
}
function fD() {
  return b.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 30", children: b.jsx("path", { d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" }) });
}
function dD() {
  return b.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: b.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z" }) });
}
function hD() {
  return b.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: b.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z" }) });
}
function Ps({ children: t, className: i, ...o }) {
  return b.jsx("button", { type: "button", className: pt(["react-flow__controls-button", i]), ...o, children: t });
}
const mD = (t) => ({
  isInteractive: t.nodesDraggable || t.nodesConnectable || t.elementsSelectable,
  minZoomReached: t.transform[2] <= t.minZoom,
  maxZoomReached: t.transform[2] >= t.maxZoom,
  ariaLabelConfig: t.ariaLabelConfig
});
function zx({ style: t, showZoom: i = !0, showFitView: o = !0, showInteractive: r = !0, fitViewOptions: s, onZoomIn: u, onZoomOut: c, onFitView: d, onInteractiveChange: m, className: p, children: g, position: y = "bottom-left", orientation: v = "vertical", "aria-label": x }) {
  const w = nt(), { isInteractive: _, minZoomReached: T, maxZoomReached: A, ariaLabelConfig: O } = Be(mD, tt), { zoomIn: N, zoomOut: C, fitView: I } = Gu(), L = () => {
    N(), u?.();
  }, k = () => {
    C(), c?.();
  }, q = () => {
    I(s), d?.();
  }, te = () => {
    w.setState({
      nodesDraggable: !_,
      nodesConnectable: !_,
      elementsSelectable: !_
    }), m?.(!_);
  }, F = v === "horizontal" ? "horizontal" : "vertical";
  return b.jsxs(Xu, { className: pt(["react-flow__controls", F, p]), position: y, style: t, "data-testid": "rf__controls", "aria-label": x ?? O["controls.ariaLabel"], children: [i && b.jsxs(b.Fragment, { children: [b.jsx(Ps, { onClick: L, className: "react-flow__controls-zoomin", title: O["controls.zoomIn.ariaLabel"], "aria-label": O["controls.zoomIn.ariaLabel"], disabled: A, children: b.jsx(uD, {}) }), b.jsx(Ps, { onClick: k, className: "react-flow__controls-zoomout", title: O["controls.zoomOut.ariaLabel"], "aria-label": O["controls.zoomOut.ariaLabel"], disabled: T, children: b.jsx(cD, {}) })] }), o && b.jsx(Ps, { className: "react-flow__controls-fitview", onClick: q, title: O["controls.fitView.ariaLabel"], "aria-label": O["controls.fitView.ariaLabel"], children: b.jsx(fD, {}) }), r && b.jsx(Ps, { className: "react-flow__controls-interactive", onClick: te, title: O["controls.interactive.ariaLabel"], "aria-label": O["controls.interactive.ariaLabel"], children: _ ? b.jsx(hD, {}) : b.jsx(dD, {}) }), g] });
}
zx.displayName = "Controls";
const gD = X.memo(zx);
function pD({ id: t, x: i, y: o, width: r, height: s, style: u, color: c, strokeColor: d, strokeWidth: m, className: p, borderRadius: g, shapeRendering: y, selected: v, onClick: x }) {
  const { background: w, backgroundColor: _ } = u || {}, T = c || w || _;
  return b.jsx("rect", { className: pt(["react-flow__minimap-node", { selected: v }, p]), x: i, y: o, rx: g, ry: g, width: r, height: s, style: {
    fill: T,
    stroke: d,
    strokeWidth: m
  }, shapeRendering: y, onClick: x ? (A) => x(A, t) : void 0 });
}
const yD = X.memo(pD), vD = (t) => t.nodes.map((i) => i.id), Dd = (t) => t instanceof Function ? t : () => t;
function bD({
  nodeStrokeColor: t,
  nodeColor: i,
  nodeClassName: o = "",
  nodeBorderRadius: r = 5,
  nodeStrokeWidth: s,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: u = yD,
  onClick: c
}) {
  const d = Be(vD, tt), m = Dd(i), p = Dd(t), g = Dd(o), y = typeof window > "u" || window.chrome ? "crispEdges" : "geometricPrecision";
  return b.jsx(b.Fragment, { children: d.map((v) => (
    /*
     * The split of responsibilities between MiniMapNodes and
     * NodeComponentWrapper may appear weird. However, it’s designed to
     * minimize the cost of updates when individual nodes change.
     *
     * For more details, see a similar commit in `NodeRenderer/index.tsx`.
     */
    b.jsx(wD, { id: v, nodeColorFunc: m, nodeStrokeColorFunc: p, nodeClassNameFunc: g, nodeBorderRadius: r, nodeStrokeWidth: s, NodeComponent: u, onClick: c, shapeRendering: y }, v)
  )) });
}
function xD({ id: t, nodeColorFunc: i, nodeStrokeColorFunc: o, nodeClassNameFunc: r, nodeBorderRadius: s, nodeStrokeWidth: u, shapeRendering: c, NodeComponent: d, onClick: m }) {
  const { node: p, x: g, y, width: v, height: x } = Be((w) => {
    const _ = w.nodeLookup.get(t);
    if (!_)
      return { node: void 0, x: 0, y: 0, width: 0, height: 0 };
    const T = _.internals.userNode, { x: A, y: O } = _.internals.positionAbsolute, { width: N, height: C } = ci(T);
    return {
      node: T,
      x: A,
      y: O,
      width: N,
      height: C
    };
  }, tt);
  return !p || p.hidden || !Ob(p) ? null : b.jsx(d, { x: g, y, width: v, height: x, style: p.style, selected: !!p.selected, className: r(p), color: i(p), borderRadius: s, strokeColor: o(p), strokeWidth: u, shapeRendering: c, onClick: m, id: p.id });
}
const wD = X.memo(xD);
var SD = X.memo(bD);
const ED = 200, _D = 150, ND = (t) => !t.hidden, CD = (t) => {
  const i = {
    x: -t.transform[0] / t.transform[2],
    y: -t.transform[1] / t.transform[2],
    width: t.width / t.transform[2],
    height: t.height / t.transform[2]
  };
  return {
    viewBB: i,
    boundingRect: t.nodeLookup.size > 0 ? Ab(hl(t.nodeLookup, { filter: ND }), i) : i,
    rfId: t.rfId,
    panZoom: t.panZoom,
    translateExtent: t.translateExtent,
    flowWidth: t.width,
    flowHeight: t.height,
    ariaLabelConfig: t.ariaLabelConfig
  };
}, MD = "react-flow__minimap-desc";
function Rx({
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
  maskColor: p,
  maskStrokeColor: g,
  maskStrokeWidth: y,
  position: v = "bottom-right",
  onClick: x,
  onNodeClick: w,
  pannable: _ = !1,
  zoomable: T = !1,
  ariaLabel: A,
  inversePan: O,
  zoomStep: N = 1,
  offsetScale: C = 5
}) {
  const I = nt(), L = X.useRef(null), { boundingRect: k, viewBB: q, rfId: te, panZoom: F, translateExtent: Y, flowWidth: Q, flowHeight: W, ariaLabelConfig: j } = Be(CD, tt), $ = t?.width ?? ED, M = t?.height ?? _D, R = k.width / $, B = k.height / M, K = Math.max(R, B), ee = K * $, D = K * M, V = C * K, ne = k.x - (ee - k.width) / 2 - V, H = k.y - (D - k.height) / 2 - V, E = ee + V * 2, U = D + V * 2, G = `${MD}-${te}`, J = X.useRef(0), Z = X.useRef();
  J.current = K, X.useEffect(() => {
    if (L.current && F)
      return Z.current = VC({
        domNode: L.current,
        panZoom: F,
        getTransform: () => I.getState().transform,
        getViewScale: () => J.current
      }), () => {
        Z.current?.destroy();
      };
  }, [F]), X.useEffect(() => {
    Z.current?.update({
      translateExtent: Y,
      width: Q,
      height: W,
      inversePan: O,
      pannable: _,
      zoomStep: N,
      zoomable: T
    });
  }, [_, T, O, N, Y, Q, W]);
  const se = x ? (xe) => {
    const [Ee, Ce] = Z.current?.pointer(xe) || [0, 0];
    x(xe, { x: Ee, y: Ce });
  } : void 0, me = w ? X.useCallback((xe, Ee) => {
    const Ce = I.getState().nodeLookup.get(Ee).internals.userNode;
    w(xe, Ce);
  }, []) : void 0, ge = A ?? j["minimap.ariaLabel"];
  return b.jsx(Xu, { position: v, style: {
    ...t,
    "--xy-minimap-background-color-props": typeof m == "string" ? m : void 0,
    "--xy-minimap-mask-background-color-props": typeof p == "string" ? p : void 0,
    "--xy-minimap-mask-stroke-color-props": typeof g == "string" ? g : void 0,
    "--xy-minimap-mask-stroke-width-props": typeof y == "number" ? y * K : void 0,
    "--xy-minimap-node-background-color-props": typeof r == "string" ? r : void 0,
    "--xy-minimap-node-stroke-color-props": typeof o == "string" ? o : void 0,
    "--xy-minimap-node-stroke-width-props": typeof c == "number" ? c : void 0
  }, className: pt(["react-flow__minimap", i]), "data-testid": "rf__minimap", children: b.jsxs("svg", { width: $, height: M, viewBox: `${ne} ${H} ${E} ${U}`, className: "react-flow__minimap-svg", role: "img", "aria-labelledby": G, ref: L, onClick: se, children: [ge && b.jsx("title", { id: G, children: ge }), b.jsx(SD, { onClick: me, nodeColor: r, nodeStrokeColor: o, nodeBorderRadius: u, nodeClassName: s, nodeStrokeWidth: c, nodeComponent: d }), b.jsx("path", { className: "react-flow__minimap-mask", d: `M${ne - V},${H - V}h${E + V * 2}v${U + V * 2}h${-E - V * 2}z
        M${q.x},${q.y}h${q.width}v${q.height}h${-q.width}z`, fillRule: "evenodd", pointerEvents: "none" })] }) });
}
Rx.displayName = "MiniMap";
const TD = X.memo(Rx), DD = (t) => (i) => t ? `${Math.max(1 / i.transform[2], 1)}` : void 0, jD = {
  [Ao.Line]: "right",
  [Ao.Handle]: "bottom-right"
};
function AD({ nodeId: t, position: i, variant: o = Ao.Handle, className: r, style: s = void 0, children: u, color: c, minWidth: d = 10, minHeight: m = 10, maxWidth: p = Number.MAX_VALUE, maxHeight: g = Number.MAX_VALUE, keepAspectRatio: y = !1, resizeDirection: v, autoScale: x = !0, shouldResize: w, onResizeStart: _, onResize: T, onResizeEnd: A }) {
  const O = fx(), N = typeof t == "string" ? t : O, C = nt(), I = X.useRef(null), L = o === Ao.Handle, k = Be(X.useCallback(DD(L && x), [L, x]), tt), q = X.useRef(null), te = i ?? jD[o];
  X.useEffect(() => {
    if (!(!I.current || !N))
      return q.current || (q.current = eM({
        domNode: I.current,
        nodeId: N,
        getStoreItems: () => {
          const { nodeLookup: Y, transform: Q, snapGrid: W, snapToGrid: j, nodeOrigin: $, domNode: M } = C.getState();
          return {
            nodeLookup: Y,
            transform: Q,
            snapGrid: W,
            snapToGrid: j,
            nodeOrigin: $,
            paneDomNode: M
          };
        },
        onChange: (Y, Q) => {
          const { triggerNodeChanges: W, nodeLookup: j, parentLookup: $, nodeOrigin: M } = C.getState(), R = [], B = { x: Y.x, y: Y.y }, K = j.get(N);
          if (K && K.expandParent && K.parentId) {
            const ee = K.origin ?? M, D = Y.width ?? K.measured.width ?? 0, V = Y.height ?? K.measured.height ?? 0, ne = {
              id: K.id,
              parentId: K.parentId,
              rect: {
                width: D,
                height: V,
                ...zb({
                  x: Y.x ?? K.position.x,
                  y: Y.y ?? K.position.y
                }, { width: D, height: V }, K.parentId, j, ee)
              }
            }, H = Ch([ne], j, $, M);
            R.push(...H), B.x = Y.x ? Math.max(ee[0] * D, Y.x) : void 0, B.y = Y.y ? Math.max(ee[1] * V, Y.y) : void 0;
          }
          if (B.x !== void 0 && B.y !== void 0) {
            const ee = {
              id: N,
              type: "position",
              position: { ...B }
            };
            R.push(ee);
          }
          if (Y.width !== void 0 && Y.height !== void 0) {
            const D = {
              id: N,
              type: "dimensions",
              resizing: !0,
              setAttributes: v ? v === "horizontal" ? "width" : "height" : !0,
              dimensions: {
                width: Y.width,
                height: Y.height
              }
            };
            R.push(D);
          }
          for (const ee of Q) {
            const D = {
              ...ee,
              type: "position"
            };
            R.push(D);
          }
          W(R);
        },
        onEnd: ({ width: Y, height: Q }) => {
          const W = {
            id: N,
            type: "dimensions",
            resizing: !1,
            dimensions: {
              width: Y,
              height: Q
            }
          };
          C.getState().triggerNodeChanges([W]);
        }
      })), q.current.update({
        controlPosition: te,
        boundaries: {
          minWidth: d,
          minHeight: m,
          maxWidth: p,
          maxHeight: g
        },
        keepAspectRatio: y,
        resizeDirection: v,
        onResizeStart: _,
        onResize: T,
        onResizeEnd: A,
        shouldResize: w
      }), () => {
        q.current?.destroy();
      };
  }, [
    te,
    d,
    m,
    p,
    g,
    y,
    _,
    T,
    A,
    w
  ]);
  const F = te.split("-");
  return b.jsx("div", { className: pt(["react-flow__resize-control", "nodrag", ...F, o, r]), ref: I, style: {
    ...s,
    scale: k,
    ...c && { [L ? "backgroundColor" : "borderColor"]: c }
  }, children: u });
}
X.memo(AD);
var Ze = (t, i) => () => (i || t((i = { exports: {} }).exports, i), i.exports), xn = Ze((t, i) => {
  var o = Object.defineProperty, r = (W, j, $) => j in W ? o(W, j, { enumerable: !0, configurable: !0, writable: !0, value: $ }) : W[j] = $, s = (W, j) => () => (j || W((j = { exports: {} }).exports, j), j.exports), u = (W, j, $) => r(W, typeof j != "symbol" ? j + "" : j, $), c = s((W, j) => {
    var $ = "\0", M = "\0", R = "", B = class {
      constructor(H) {
        u(this, "_isDirected", !0), u(this, "_isMultigraph", !1), u(this, "_isCompound", !1), u(this, "_label"), u(this, "_defaultNodeLabelFn", () => {
        }), u(this, "_defaultEdgeLabelFn", () => {
        }), u(this, "_nodes", {}), u(this, "_in", {}), u(this, "_preds", {}), u(this, "_out", {}), u(this, "_sucs", {}), u(this, "_edgeObjs", {}), u(this, "_edgeLabels", {}), u(this, "_nodeCount", 0), u(this, "_edgeCount", 0), u(this, "_parent"), u(this, "_children"), H && (this._isDirected = Object.hasOwn(H, "directed") ? H.directed : !0, this._isMultigraph = Object.hasOwn(H, "multigraph") ? H.multigraph : !1, this._isCompound = Object.hasOwn(H, "compound") ? H.compound : !1), this._isCompound && (this._parent = {}, this._children = {}, this._children[M] = {});
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
      setGraph(H) {
        return this._label = H, this;
      }
      graph() {
        return this._label;
      }
      setDefaultNodeLabel(H) {
        return this._defaultNodeLabelFn = H, typeof H != "function" && (this._defaultNodeLabelFn = () => H), this;
      }
      nodeCount() {
        return this._nodeCount;
      }
      nodes() {
        return Object.keys(this._nodes);
      }
      sources() {
        var H = this;
        return this.nodes().filter((E) => Object.keys(H._in[E]).length === 0);
      }
      sinks() {
        var H = this;
        return this.nodes().filter((E) => Object.keys(H._out[E]).length === 0);
      }
      setNodes(H, E) {
        var U = arguments, G = this;
        return H.forEach(function(J) {
          U.length > 1 ? G.setNode(J, E) : G.setNode(J);
        }), this;
      }
      setNode(H, E) {
        return Object.hasOwn(this._nodes, H) ? (arguments.length > 1 && (this._nodes[H] = E), this) : (this._nodes[H] = arguments.length > 1 ? E : this._defaultNodeLabelFn(H), this._isCompound && (this._parent[H] = M, this._children[H] = {}, this._children[M][H] = !0), this._in[H] = {}, this._preds[H] = {}, this._out[H] = {}, this._sucs[H] = {}, ++this._nodeCount, this);
      }
      node(H) {
        return this._nodes[H];
      }
      hasNode(H) {
        return Object.hasOwn(this._nodes, H);
      }
      removeNode(H) {
        var E = this;
        if (Object.hasOwn(this._nodes, H)) {
          var U = (G) => E.removeEdge(E._edgeObjs[G]);
          delete this._nodes[H], this._isCompound && (this._removeFromParentsChildList(H), delete this._parent[H], this.children(H).forEach(function(G) {
            E.setParent(G);
          }), delete this._children[H]), Object.keys(this._in[H]).forEach(U), delete this._in[H], delete this._preds[H], Object.keys(this._out[H]).forEach(U), delete this._out[H], delete this._sucs[H], --this._nodeCount;
        }
        return this;
      }
      setParent(H, E) {
        if (!this._isCompound) throw new Error("Cannot set parent in a non-compound graph");
        if (E === void 0) E = M;
        else {
          E += "";
          for (var U = E; U !== void 0; U = this.parent(U)) if (U === H) throw new Error("Setting " + E + " as parent of " + H + " would create a cycle");
          this.setNode(E);
        }
        return this.setNode(H), this._removeFromParentsChildList(H), this._parent[H] = E, this._children[E][H] = !0, this;
      }
      _removeFromParentsChildList(H) {
        delete this._children[this._parent[H]][H];
      }
      parent(H) {
        if (this._isCompound) {
          var E = this._parent[H];
          if (E !== M) return E;
        }
      }
      children(H = M) {
        if (this._isCompound) {
          var E = this._children[H];
          if (E) return Object.keys(E);
        } else {
          if (H === M) return this.nodes();
          if (this.hasNode(H)) return [];
        }
      }
      predecessors(H) {
        var E = this._preds[H];
        if (E) return Object.keys(E);
      }
      successors(H) {
        var E = this._sucs[H];
        if (E) return Object.keys(E);
      }
      neighbors(H) {
        var E = this.predecessors(H);
        if (E) {
          let G = new Set(E);
          for (var U of this.successors(H)) G.add(U);
          return Array.from(G.values());
        }
      }
      isLeaf(H) {
        var E;
        return this.isDirected() ? E = this.successors(H) : E = this.neighbors(H), E.length === 0;
      }
      filterNodes(H) {
        var E = new this.constructor({ directed: this._isDirected, multigraph: this._isMultigraph, compound: this._isCompound });
        E.setGraph(this.graph());
        var U = this;
        Object.entries(this._nodes).forEach(function([Z, se]) {
          H(Z) && E.setNode(Z, se);
        }), Object.values(this._edgeObjs).forEach(function(Z) {
          E.hasNode(Z.v) && E.hasNode(Z.w) && E.setEdge(Z, U.edge(Z));
        });
        var G = {};
        function J(Z) {
          var se = U.parent(Z);
          return se === void 0 || E.hasNode(se) ? (G[Z] = se, se) : se in G ? G[se] : J(se);
        }
        return this._isCompound && E.nodes().forEach((Z) => E.setParent(Z, J(Z))), E;
      }
      setDefaultEdgeLabel(H) {
        return this._defaultEdgeLabelFn = H, typeof H != "function" && (this._defaultEdgeLabelFn = () => H), this;
      }
      edgeCount() {
        return this._edgeCount;
      }
      edges() {
        return Object.values(this._edgeObjs);
      }
      setPath(H, E) {
        var U = this, G = arguments;
        return H.reduce(function(J, Z) {
          return G.length > 1 ? U.setEdge(J, Z, E) : U.setEdge(J, Z), Z;
        }), this;
      }
      setEdge() {
        var H, E, U, G, J = !1, Z = arguments[0];
        typeof Z == "object" && Z !== null && "v" in Z ? (H = Z.v, E = Z.w, U = Z.name, arguments.length === 2 && (G = arguments[1], J = !0)) : (H = Z, E = arguments[1], U = arguments[3], arguments.length > 2 && (G = arguments[2], J = !0)), H = "" + H, E = "" + E, U !== void 0 && (U = "" + U);
        var se = D(this._isDirected, H, E, U);
        if (Object.hasOwn(this._edgeLabels, se)) return J && (this._edgeLabels[se] = G), this;
        if (U !== void 0 && !this._isMultigraph) throw new Error("Cannot set a named edge when isMultigraph = false");
        this.setNode(H), this.setNode(E), this._edgeLabels[se] = J ? G : this._defaultEdgeLabelFn(H, E, U);
        var me = V(this._isDirected, H, E, U);
        return H = me.v, E = me.w, Object.freeze(me), this._edgeObjs[se] = me, K(this._preds[E], H), K(this._sucs[H], E), this._in[E][se] = me, this._out[H][se] = me, this._edgeCount++, this;
      }
      edge(H, E, U) {
        var G = arguments.length === 1 ? ne(this._isDirected, arguments[0]) : D(this._isDirected, H, E, U);
        return this._edgeLabels[G];
      }
      edgeAsObj() {
        let H = this.edge(...arguments);
        return typeof H != "object" ? { label: H } : H;
      }
      hasEdge(H, E, U) {
        var G = arguments.length === 1 ? ne(this._isDirected, arguments[0]) : D(this._isDirected, H, E, U);
        return Object.hasOwn(this._edgeLabels, G);
      }
      removeEdge(H, E, U) {
        var G = arguments.length === 1 ? ne(this._isDirected, arguments[0]) : D(this._isDirected, H, E, U), J = this._edgeObjs[G];
        return J && (H = J.v, E = J.w, delete this._edgeLabels[G], delete this._edgeObjs[G], ee(this._preds[E], H), ee(this._sucs[H], E), delete this._in[E][G], delete this._out[H][G], this._edgeCount--), this;
      }
      inEdges(H, E) {
        return this.isDirected() ? this.filterEdges(this._in[H], H, E) : this.nodeEdges(H, E);
      }
      outEdges(H, E) {
        return this.isDirected() ? this.filterEdges(this._out[H], H, E) : this.nodeEdges(H, E);
      }
      nodeEdges(H, E) {
        if (H in this._nodes) return this.filterEdges({ ...this._in[H], ...this._out[H] }, H, E);
      }
      filterEdges(H, E, U) {
        if (H) {
          var G = Object.values(H);
          return U ? G.filter(function(J) {
            return J.v === E && J.w === U || J.v === U && J.w === E;
          }) : G;
        }
      }
    };
    function K(H, E) {
      H[E] ? H[E]++ : H[E] = 1;
    }
    function ee(H, E) {
      --H[E] || delete H[E];
    }
    function D(H, E, U, G) {
      var J = "" + E, Z = "" + U;
      if (!H && J > Z) {
        var se = J;
        J = Z, Z = se;
      }
      return J + R + Z + R + (G === void 0 ? $ : G);
    }
    function V(H, E, U, G) {
      var J = "" + E, Z = "" + U;
      if (!H && J > Z) {
        var se = J;
        J = Z, Z = se;
      }
      var me = { v: J, w: Z };
      return G && (me.name = G), me;
    }
    function ne(H, E) {
      return D(H, E.v, E.w, E.name);
    }
    j.exports = B;
  }), d = s((W, j) => {
    j.exports = "3.0.2";
  }), m = s((W, j) => {
    j.exports = { Graph: c(), version: d() };
  }), p = s((W, j) => {
    var $ = c();
    j.exports = { write: M, read: K };
    function M(ee) {
      var D = { options: { directed: ee.isDirected(), multigraph: ee.isMultigraph(), compound: ee.isCompound() }, nodes: R(ee), edges: B(ee) };
      return ee.graph() !== void 0 && (D.value = structuredClone(ee.graph())), D;
    }
    function R(ee) {
      return ee.nodes().map(function(D) {
        var V = ee.node(D), ne = ee.parent(D), H = { v: D };
        return V !== void 0 && (H.value = V), ne !== void 0 && (H.parent = ne), H;
      });
    }
    function B(ee) {
      return ee.edges().map(function(D) {
        var V = ee.edge(D), ne = { v: D.v, w: D.w };
        return D.name !== void 0 && (ne.name = D.name), V !== void 0 && (ne.value = V), ne;
      });
    }
    function K(ee) {
      var D = new $(ee.options).setGraph(ee.value);
      return ee.nodes.forEach(function(V) {
        D.setNode(V.v, V.value), V.parent && D.setParent(V.v, V.parent);
      }), ee.edges.forEach(function(V) {
        D.setEdge({ v: V.v, w: V.w, name: V.name }, V.value);
      }), D;
    }
  }), g = s((W, j) => {
    j.exports = M;
    var $ = () => 1;
    function M(B, K, ee, D) {
      return R(B, String(K), ee || $, D || function(V) {
        return B.outEdges(V);
      });
    }
    function R(B, K, ee, D) {
      var V = {}, ne = !0, H = 0, E = B.nodes(), U = function(se) {
        var me = ee(se);
        V[se.v].distance + me < V[se.w].distance && (V[se.w] = { distance: V[se.v].distance + me, predecessor: se.v }, ne = !0);
      }, G = function() {
        E.forEach(function(se) {
          D(se).forEach(function(me) {
            var ge = me.v === se ? me.v : me.w, xe = ge === me.v ? me.w : me.v;
            U({ v: ge, w: xe });
          });
        });
      };
      E.forEach(function(se) {
        var me = se === K ? 0 : Number.POSITIVE_INFINITY;
        V[se] = { distance: me };
      });
      for (var J = E.length, Z = 1; Z < J && (ne = !1, H++, G(), !!ne); Z++) ;
      if (H === J - 1 && (ne = !1, G(), ne)) throw new Error("The graph contains a negative weight cycle");
      return V;
    }
  }), y = s((W, j) => {
    j.exports = $;
    function $(M) {
      var R = {}, B = [], K;
      function ee(D) {
        Object.hasOwn(R, D) || (R[D] = !0, K.push(D), M.successors(D).forEach(ee), M.predecessors(D).forEach(ee));
      }
      return M.nodes().forEach(function(D) {
        K = [], ee(D), K.length && B.push(K);
      }), B;
    }
  }), v = s((W, j) => {
    var $ = class {
      constructor() {
        u(this, "_arr", []), u(this, "_keyIndices", {});
      }
      size() {
        return this._arr.length;
      }
      keys() {
        return this._arr.map(function(M) {
          return M.key;
        });
      }
      has(M) {
        return Object.hasOwn(this._keyIndices, M);
      }
      priority(M) {
        var R = this._keyIndices[M];
        if (R !== void 0) return this._arr[R].priority;
      }
      min() {
        if (this.size() === 0) throw new Error("Queue underflow");
        return this._arr[0].key;
      }
      add(M, R) {
        var B = this._keyIndices;
        if (M = String(M), !Object.hasOwn(B, M)) {
          var K = this._arr, ee = K.length;
          return B[M] = ee, K.push({ key: M, priority: R }), this._decrease(ee), !0;
        }
        return !1;
      }
      removeMin() {
        this._swap(0, this._arr.length - 1);
        var M = this._arr.pop();
        return delete this._keyIndices[M.key], this._heapify(0), M.key;
      }
      decrease(M, R) {
        var B = this._keyIndices[M];
        if (R > this._arr[B].priority) throw new Error("New priority is greater than current priority. Key: " + M + " Old: " + this._arr[B].priority + " New: " + R);
        this._arr[B].priority = R, this._decrease(B);
      }
      _heapify(M) {
        var R = this._arr, B = 2 * M, K = B + 1, ee = M;
        B < R.length && (ee = R[B].priority < R[ee].priority ? B : ee, K < R.length && (ee = R[K].priority < R[ee].priority ? K : ee), ee !== M && (this._swap(M, ee), this._heapify(ee)));
      }
      _decrease(M) {
        for (var R = this._arr, B = R[M].priority, K; M !== 0 && (K = M >> 1, !(R[K].priority < B)); ) this._swap(M, K), M = K;
      }
      _swap(M, R) {
        var B = this._arr, K = this._keyIndices, ee = B[M], D = B[R];
        B[M] = D, B[R] = ee, K[D.key] = M, K[ee.key] = R;
      }
    };
    j.exports = $;
  }), x = s((W, j) => {
    var $ = v();
    j.exports = R;
    var M = () => 1;
    function R(K, ee, D, V) {
      var ne = function(H) {
        return K.outEdges(H);
      };
      return B(K, String(ee), D || M, V || ne);
    }
    function B(K, ee, D, V) {
      var ne = {}, H = new $(), E, U, G = function(J) {
        var Z = J.v !== E ? J.v : J.w, se = ne[Z], me = D(J), ge = U.distance + me;
        if (me < 0) throw new Error("dijkstra does not allow negative edge weights. Bad edge: " + J + " Weight: " + me);
        ge < se.distance && (se.distance = ge, se.predecessor = E, H.decrease(Z, ge));
      };
      for (K.nodes().forEach(function(J) {
        var Z = J === ee ? 0 : Number.POSITIVE_INFINITY;
        ne[J] = { distance: Z }, H.add(J, Z);
      }); H.size() > 0 && (E = H.removeMin(), U = ne[E], U.distance !== Number.POSITIVE_INFINITY); ) V(E).forEach(G);
      return ne;
    }
  }), w = s((W, j) => {
    var $ = x();
    j.exports = M;
    function M(R, B, K) {
      return R.nodes().reduce(function(ee, D) {
        return ee[D] = $(R, D, B, K), ee;
      }, {});
    }
  }), _ = s((W, j) => {
    j.exports = $;
    function $(R, B, K) {
      if (R[B].predecessor !== void 0) throw new Error("Invalid source vertex");
      if (R[K].predecessor === void 0 && K !== B) throw new Error("Invalid destination vertex");
      return { weight: R[K].distance, path: M(R, B, K) };
    }
    function M(R, B, K) {
      for (var ee = [], D = K; D !== B; ) ee.push(D), D = R[D].predecessor;
      return ee.push(B), ee.reverse();
    }
  }), T = s((W, j) => {
    j.exports = $;
    function $(M) {
      var R = 0, B = [], K = {}, ee = [];
      function D(V) {
        var ne = K[V] = { onStack: !0, lowlink: R, index: R++ };
        if (B.push(V), M.successors(V).forEach(function(U) {
          Object.hasOwn(K, U) ? K[U].onStack && (ne.lowlink = Math.min(ne.lowlink, K[U].index)) : (D(U), ne.lowlink = Math.min(ne.lowlink, K[U].lowlink));
        }), ne.lowlink === ne.index) {
          var H = [], E;
          do
            E = B.pop(), K[E].onStack = !1, H.push(E);
          while (V !== E);
          ee.push(H);
        }
      }
      return M.nodes().forEach(function(V) {
        Object.hasOwn(K, V) || D(V);
      }), ee;
    }
  }), A = s((W, j) => {
    var $ = T();
    j.exports = M;
    function M(R) {
      return $(R).filter(function(B) {
        return B.length > 1 || B.length === 1 && R.hasEdge(B[0], B[0]);
      });
    }
  }), O = s((W, j) => {
    j.exports = M;
    var $ = () => 1;
    function M(B, K, ee) {
      return R(B, K || $, ee || function(D) {
        return B.outEdges(D);
      });
    }
    function R(B, K, ee) {
      var D = {}, V = B.nodes();
      return V.forEach(function(ne) {
        D[ne] = {}, D[ne][ne] = { distance: 0 }, V.forEach(function(H) {
          ne !== H && (D[ne][H] = { distance: Number.POSITIVE_INFINITY });
        }), ee(ne).forEach(function(H) {
          var E = H.v === ne ? H.w : H.v, U = K(H);
          D[ne][E] = { distance: U, predecessor: ne };
        });
      }), V.forEach(function(ne) {
        var H = D[ne];
        V.forEach(function(E) {
          var U = D[E];
          V.forEach(function(G) {
            var J = U[ne], Z = H[G], se = U[G], me = J.distance + Z.distance;
            me < se.distance && (se.distance = me, se.predecessor = Z.predecessor);
          });
        });
      }), D;
    }
  }), N = s((W, j) => {
    function $(R) {
      var B = {}, K = {}, ee = [];
      function D(V) {
        if (Object.hasOwn(K, V)) throw new M();
        Object.hasOwn(B, V) || (K[V] = !0, B[V] = !0, R.predecessors(V).forEach(D), delete K[V], ee.push(V));
      }
      if (R.sinks().forEach(D), Object.keys(B).length !== R.nodeCount()) throw new M();
      return ee;
    }
    var M = class extends Error {
      constructor() {
        super(...arguments);
      }
    };
    j.exports = $, $.CycleException = M;
  }), C = s((W, j) => {
    var $ = N();
    j.exports = M;
    function M(R) {
      try {
        $(R);
      } catch (B) {
        if (B instanceof $.CycleException) return !1;
        throw B;
      }
      return !0;
    }
  }), I = s((W, j) => {
    j.exports = $;
    function $(R, B, K, ee, D) {
      Array.isArray(B) || (B = [B]);
      var V = (R.isDirected() ? R.successors : R.neighbors).bind(R), ne = {};
      return B.forEach(function(H) {
        if (!R.hasNode(H)) throw new Error("Graph does not have node: " + H);
        D = M(R, H, K === "post", ne, V, ee, D);
      }), D;
    }
    function M(R, B, K, ee, D, V, ne) {
      return Object.hasOwn(ee, B) || (ee[B] = !0, K || (ne = V(ne, B)), D(B).forEach(function(H) {
        ne = M(R, H, K, ee, D, V, ne);
      }), K && (ne = V(ne, B))), ne;
    }
  }), L = s((W, j) => {
    var $ = I();
    j.exports = M;
    function M(R, B, K) {
      return $(R, B, K, function(ee, D) {
        return ee.push(D), ee;
      }, []);
    }
  }), k = s((W, j) => {
    var $ = L();
    j.exports = M;
    function M(R, B) {
      return $(R, B, "post");
    }
  }), q = s((W, j) => {
    var $ = L();
    j.exports = M;
    function M(R, B) {
      return $(R, B, "pre");
    }
  }), te = s((W, j) => {
    var $ = c(), M = v();
    j.exports = R;
    function R(B, K) {
      var ee = new $(), D = {}, V = new M(), ne;
      function H(U) {
        var G = U.v === ne ? U.w : U.v, J = V.priority(G);
        if (J !== void 0) {
          var Z = K(U);
          Z < J && (D[G] = ne, V.decrease(G, Z));
        }
      }
      if (B.nodeCount() === 0) return ee;
      B.nodes().forEach(function(U) {
        V.add(U, Number.POSITIVE_INFINITY), ee.setNode(U);
      }), V.decrease(B.nodes()[0], 0);
      for (var E = !1; V.size() > 0; ) {
        if (ne = V.removeMin(), Object.hasOwn(D, ne)) ee.setEdge(ne, D[ne]);
        else {
          if (E) throw new Error("Input graph is not connected: " + B);
          E = !0;
        }
        B.nodeEdges(ne).forEach(H);
      }
      return ee;
    }
  }), F = s((W, j) => {
    var $ = x(), M = g();
    j.exports = R;
    function R(K, ee, D, V) {
      return B(K, ee, D, V || function(ne) {
        return K.outEdges(ne);
      });
    }
    function B(K, ee, D, V) {
      if (D === void 0) return $(K, ee, D, V);
      for (var ne = !1, H = K.nodes(), E = 0; E < H.length; E++) {
        for (var U = V(H[E]), G = 0; G < U.length; G++) {
          var J = U[G], Z = J.v === H[E] ? J.v : J.w, se = Z === J.v ? J.w : J.v;
          D({ v: Z, w: se }) < 0 && (ne = !0);
        }
        if (ne) return M(K, ee, D, V);
      }
      return $(K, ee, D, V);
    }
  }), Y = s((W, j) => {
    j.exports = { bellmanFord: g(), components: y(), dijkstra: x(), dijkstraAll: w(), extractPath: _(), findCycles: A(), floydWarshall: O(), isAcyclic: C(), postorder: k(), preorder: q(), prim: te(), shortestPaths: F(), reduce: I(), tarjan: T(), topsort: N() };
  }), Q = m();
  i.exports = { Graph: Q.Graph, json: p(), alg: Y(), version: Q.version };
}), OD = Ze((t, i) => {
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
}), zD = Ze((t, i) => {
  var o = xn().Graph, r = OD();
  i.exports = u;
  var s = () => 1;
  function u(y, v) {
    if (y.nodeCount() <= 1) return [];
    let x = m(y, v || s);
    return c(x.graph, x.buckets, x.zeroIdx).flatMap((w) => y.outEdges(w.v, w.w));
  }
  function c(y, v, x) {
    let w = [], _ = v[v.length - 1], T = v[0], A;
    for (; y.nodeCount(); ) {
      for (; A = T.dequeue(); ) d(y, v, x, A);
      for (; A = _.dequeue(); ) d(y, v, x, A);
      if (y.nodeCount()) {
        for (let O = v.length - 2; O > 0; --O) if (A = v[O].dequeue(), A) {
          w = w.concat(d(y, v, x, A, !0));
          break;
        }
      }
    }
    return w;
  }
  function d(y, v, x, w, _) {
    let T = _ ? [] : void 0;
    return y.inEdges(w.v).forEach((A) => {
      let O = y.edge(A), N = y.node(A.v);
      _ && T.push({ v: A.v, w: A.w }), N.out -= O, p(v, x, N);
    }), y.outEdges(w.v).forEach((A) => {
      let O = y.edge(A), N = A.w, C = y.node(N);
      C.in -= O, p(v, x, C);
    }), y.removeNode(w.v), T;
  }
  function m(y, v) {
    let x = new o(), w = 0, _ = 0;
    y.nodes().forEach((O) => {
      x.setNode(O, { v: O, in: 0, out: 0 });
    }), y.edges().forEach((O) => {
      let N = x.edge(O.v, O.w) || 0, C = v(O), I = N + C;
      x.setEdge(O.v, O.w, I), _ = Math.max(_, x.node(O.v).out += C), w = Math.max(w, x.node(O.w).in += C);
    });
    let T = g(_ + w + 3).map(() => new r()), A = w + 1;
    return x.nodes().forEach((O) => {
      p(T, A, x.node(O));
    }), { graph: x, buckets: T, zeroIdx: A };
  }
  function p(y, v, x) {
    x.out ? x.in ? y[x.out - x.in + v].enqueue(x) : y[y.length - 1].enqueue(x) : y[0].enqueue(x);
  }
  function g(y) {
    let v = [];
    for (let x = 0; x < y; x++) v.push(x);
    return v;
  }
}), gt = Ze((t, i) => {
  var o = xn().Graph;
  i.exports = { addBorderNode: v, addDummyNode: r, applyWithChunking: _, asNonCompoundGraph: u, buildLayerMatrix: p, intersectRect: m, mapValues: q, maxRank: T, normalizeRanks: g, notime: N, partition: A, pick: k, predecessorWeights: d, range: L, removeEmptyRanks: y, simplify: s, successorWeights: c, time: O, uniqueId: I, zipObject: te };
  function r(F, Y, Q, W) {
    for (var j = W; F.hasNode(j); ) j = I(W);
    return Q.dummy = Y, F.setNode(j, Q), j;
  }
  function s(F) {
    let Y = new o().setGraph(F.graph());
    return F.nodes().forEach((Q) => Y.setNode(Q, F.node(Q))), F.edges().forEach((Q) => {
      let W = Y.edge(Q.v, Q.w) || { weight: 0, minlen: 1 }, j = F.edge(Q);
      Y.setEdge(Q.v, Q.w, { weight: W.weight + j.weight, minlen: Math.max(W.minlen, j.minlen) });
    }), Y;
  }
  function u(F) {
    let Y = new o({ multigraph: F.isMultigraph() }).setGraph(F.graph());
    return F.nodes().forEach((Q) => {
      F.children(Q).length || Y.setNode(Q, F.node(Q));
    }), F.edges().forEach((Q) => {
      Y.setEdge(Q, F.edge(Q));
    }), Y;
  }
  function c(F) {
    let Y = F.nodes().map((Q) => {
      let W = {};
      return F.outEdges(Q).forEach((j) => {
        W[j.w] = (W[j.w] || 0) + F.edge(j).weight;
      }), W;
    });
    return te(F.nodes(), Y);
  }
  function d(F) {
    let Y = F.nodes().map((Q) => {
      let W = {};
      return F.inEdges(Q).forEach((j) => {
        W[j.v] = (W[j.v] || 0) + F.edge(j).weight;
      }), W;
    });
    return te(F.nodes(), Y);
  }
  function m(F, Y) {
    let Q = F.x, W = F.y, j = Y.x - Q, $ = Y.y - W, M = F.width / 2, R = F.height / 2;
    if (!j && !$) throw new Error("Not possible to find intersection inside of the rectangle");
    let B, K;
    return Math.abs($) * M > Math.abs(j) * R ? ($ < 0 && (R = -R), B = R * j / $, K = R) : (j < 0 && (M = -M), B = M, K = M * $ / j), { x: Q + B, y: W + K };
  }
  function p(F) {
    let Y = L(T(F) + 1).map(() => []);
    return F.nodes().forEach((Q) => {
      let W = F.node(Q), j = W.rank;
      j !== void 0 && (Y[j][W.order] = Q);
    }), Y;
  }
  function g(F) {
    let Y = F.nodes().map((W) => {
      let j = F.node(W).rank;
      return j === void 0 ? Number.MAX_VALUE : j;
    }), Q = _(Math.min, Y);
    F.nodes().forEach((W) => {
      let j = F.node(W);
      Object.hasOwn(j, "rank") && (j.rank -= Q);
    });
  }
  function y(F) {
    let Y = F.nodes().map((M) => F.node(M).rank).filter((M) => M !== void 0), Q = _(Math.min, Y), W = [];
    F.nodes().forEach((M) => {
      let R = F.node(M).rank - Q;
      W[R] || (W[R] = []), W[R].push(M);
    });
    let j = 0, $ = F.graph().nodeRankFactor;
    Array.from(W).forEach((M, R) => {
      M === void 0 && R % $ !== 0 ? --j : M !== void 0 && j && M.forEach((B) => F.node(B).rank += j);
    });
  }
  function v(F, Y, Q, W) {
    let j = { width: 0, height: 0 };
    return arguments.length >= 4 && (j.rank = Q, j.order = W), r(F, "border", j, Y);
  }
  function x(F, Y = w) {
    let Q = [];
    for (let W = 0; W < F.length; W += Y) {
      let j = F.slice(W, W + Y);
      Q.push(j);
    }
    return Q;
  }
  var w = 65535;
  function _(F, Y) {
    if (Y.length > w) {
      let Q = x(Y);
      return F.apply(null, Q.map((W) => F.apply(null, W)));
    } else return F.apply(null, Y);
  }
  function T(F) {
    let Y = F.nodes().map((Q) => {
      let W = F.node(Q).rank;
      return W === void 0 ? Number.MIN_VALUE : W;
    });
    return _(Math.max, Y);
  }
  function A(F, Y) {
    let Q = { lhs: [], rhs: [] };
    return F.forEach((W) => {
      Y(W) ? Q.lhs.push(W) : Q.rhs.push(W);
    }), Q;
  }
  function O(F, Y) {
    let Q = Date.now();
    try {
      return Y();
    } finally {
      console.log(F + " time: " + (Date.now() - Q) + "ms");
    }
  }
  function N(F, Y) {
    return Y();
  }
  var C = 0;
  function I(F) {
    var Y = ++C;
    return F + ("" + Y);
  }
  function L(F, Y, Q = 1) {
    Y == null && (Y = F, F = 0);
    let W = ($) => $ < Y;
    Q < 0 && (W = ($) => Y < $);
    let j = [];
    for (let $ = F; W($); $ += Q) j.push($);
    return j;
  }
  function k(F, Y) {
    let Q = {};
    for (let W of Y) F[W] !== void 0 && (Q[W] = F[W]);
    return Q;
  }
  function q(F, Y) {
    let Q = Y;
    return typeof Y == "string" && (Q = (W) => W[Y]), Object.entries(F).reduce((W, [j, $]) => (W[j] = Q($, j), W), {});
  }
  function te(F, Y) {
    return F.reduce((Q, W, j) => (Q[W] = Y[j], Q), {});
  }
}), RD = Ze((t, i) => {
  var o = zD(), r = gt().uniqueId;
  i.exports = { run: s, undo: c };
  function s(d) {
    (d.graph().acyclicer === "greedy" ? o(d, m(d)) : u(d)).forEach((p) => {
      let g = d.edge(p);
      d.removeEdge(p), g.forwardName = p.name, g.reversed = !0, d.setEdge(p.w, p.v, g, r("rev"));
    });
    function m(p) {
      return (g) => p.edge(g).weight;
    }
  }
  function u(d) {
    let m = [], p = {}, g = {};
    function y(v) {
      Object.hasOwn(g, v) || (g[v] = !0, p[v] = !0, d.outEdges(v).forEach((x) => {
        Object.hasOwn(p, x.w) ? m.push(x) : y(x.w);
      }), delete p[v]);
    }
    return d.nodes().forEach(y), m;
  }
  function c(d) {
    d.edges().forEach((m) => {
      let p = d.edge(m);
      if (p.reversed) {
        d.removeEdge(m);
        let g = p.forwardName;
        delete p.reversed, delete p.forwardName, d.setEdge(m.w, m.v, p, g);
      }
    });
  }
}), kD = Ze((t, i) => {
  var o = gt();
  i.exports = { run: r, undo: u };
  function r(c) {
    c.graph().dummyChains = [], c.edges().forEach((d) => s(c, d));
  }
  function s(c, d) {
    let m = d.v, p = c.node(m).rank, g = d.w, y = c.node(g).rank, v = d.name, x = c.edge(d), w = x.labelRank;
    if (y === p + 1) return;
    c.removeEdge(d);
    let _, T, A;
    for (A = 0, ++p; p < y; ++A, ++p) x.points = [], T = { width: 0, height: 0, edgeLabel: x, edgeObj: d, rank: p }, _ = o.addDummyNode(c, "edge", T, "_d"), p === w && (T.width = x.width, T.height = x.height, T.dummy = "edge-label", T.labelpos = x.labelpos), c.setEdge(m, _, { weight: x.weight }, v), A === 0 && c.graph().dummyChains.push(_), m = _;
    c.setEdge(m, g, { weight: x.weight }, v);
  }
  function u(c) {
    c.graph().dummyChains.forEach((d) => {
      let m = c.node(d), p = m.edgeLabel, g;
      for (c.setEdge(m.edgeObj, p); m.dummy; ) g = c.successors(d)[0], c.removeNode(d), p.points.push({ x: m.x, y: m.y }), m.dummy === "edge-label" && (p.x = m.x, p.y = m.y, p.width = m.width, p.height = m.height), d = g, m = c.node(d);
    });
  }
}), Du = Ze((t, i) => {
  var { applyWithChunking: o } = gt();
  i.exports = { longestPath: r, slack: s };
  function r(u) {
    var c = {};
    function d(m) {
      var p = u.node(m);
      if (Object.hasOwn(c, m)) return p.rank;
      c[m] = !0;
      let g = u.outEdges(m).map((v) => v == null ? Number.POSITIVE_INFINITY : d(v.w) - u.edge(v).minlen);
      var y = o(Math.min, g);
      return y === Number.POSITIVE_INFINITY && (y = 0), p.rank = y;
    }
    u.sources().forEach(d);
  }
  function s(u, c) {
    return u.node(c.w).rank - u.node(c.v).rank - u.edge(c).minlen;
  }
}), kx = Ze((t, i) => {
  var o = xn().Graph, r = Du().slack;
  i.exports = s;
  function s(m) {
    var p = new o({ directed: !1 }), g = m.nodes()[0], y = m.nodeCount();
    p.setNode(g, {});
    for (var v, x; u(p, m) < y; ) v = c(p, m), x = p.hasNode(v.v) ? r(m, v) : -r(m, v), d(p, m, x);
    return p;
  }
  function u(m, p) {
    function g(y) {
      p.nodeEdges(y).forEach((v) => {
        var x = v.v, w = y === x ? v.w : x;
        !m.hasNode(w) && !r(p, v) && (m.setNode(w, {}), m.setEdge(y, w, {}), g(w));
      });
    }
    return m.nodes().forEach(g), m.nodeCount();
  }
  function c(m, p) {
    return p.edges().reduce((g, y) => {
      let v = Number.POSITIVE_INFINITY;
      return m.hasNode(y.v) !== m.hasNode(y.w) && (v = r(p, y)), v < g[0] ? [v, y] : g;
    }, [Number.POSITIVE_INFINITY, null])[1];
  }
  function d(m, p, g) {
    m.nodes().forEach((y) => p.node(y).rank += g);
  }
}), HD = Ze((t, i) => {
  var o = kx(), r = Du().slack, s = Du().longestPath, u = xn().alg.preorder, c = xn().alg.postorder, d = gt().simplify;
  i.exports = m, m.initLowLimValues = v, m.initCutValues = p, m.calcCutValue = y, m.leaveEdge = w, m.enterEdge = _, m.exchangeEdges = T;
  function m(C) {
    C = d(C), s(C);
    var I = o(C);
    v(I), p(I, C);
    for (var L, k; L = w(I); ) k = _(I, C, L), T(I, C, L, k);
  }
  function p(C, I) {
    var L = c(C, C.nodes());
    L = L.slice(0, L.length - 1), L.forEach((k) => g(C, I, k));
  }
  function g(C, I, L) {
    var k = C.node(L), q = k.parent;
    C.edge(L, q).cutvalue = y(C, I, L);
  }
  function y(C, I, L) {
    var k = C.node(L), q = k.parent, te = !0, F = I.edge(L, q), Y = 0;
    return F || (te = !1, F = I.edge(q, L)), Y = F.weight, I.nodeEdges(L).forEach((Q) => {
      var W = Q.v === L, j = W ? Q.w : Q.v;
      if (j !== q) {
        var $ = W === te, M = I.edge(Q).weight;
        if (Y += $ ? M : -M, O(C, L, j)) {
          var R = C.edge(L, j).cutvalue;
          Y += $ ? -R : R;
        }
      }
    }), Y;
  }
  function v(C, I) {
    arguments.length < 2 && (I = C.nodes()[0]), x(C, {}, 1, I);
  }
  function x(C, I, L, k, q) {
    var te = L, F = C.node(k);
    return I[k] = !0, C.neighbors(k).forEach((Y) => {
      Object.hasOwn(I, Y) || (L = x(C, I, L, Y, k));
    }), F.low = te, F.lim = L++, q ? F.parent = q : delete F.parent, L;
  }
  function w(C) {
    return C.edges().find((I) => C.edge(I).cutvalue < 0);
  }
  function _(C, I, L) {
    var k = L.v, q = L.w;
    I.hasEdge(k, q) || (k = L.w, q = L.v);
    var te = C.node(k), F = C.node(q), Y = te, Q = !1;
    te.lim > F.lim && (Y = F, Q = !0);
    var W = I.edges().filter((j) => Q === N(C, C.node(j.v), Y) && Q !== N(C, C.node(j.w), Y));
    return W.reduce((j, $) => r(I, $) < r(I, j) ? $ : j);
  }
  function T(C, I, L, k) {
    var q = L.v, te = L.w;
    C.removeEdge(q, te), C.setEdge(k.v, k.w, {}), v(C), p(C, I), A(C, I);
  }
  function A(C, I) {
    var L = C.nodes().find((q) => !I.node(q).parent), k = u(C, L);
    k = k.slice(1), k.forEach((q) => {
      var te = C.node(q).parent, F = I.edge(q, te), Y = !1;
      F || (F = I.edge(te, q), Y = !0), I.node(q).rank = I.node(te).rank + (Y ? F.minlen : -F.minlen);
    });
  }
  function O(C, I, L) {
    return C.hasEdge(I, L);
  }
  function N(C, I, L) {
    return L.low <= I.lim && I.lim <= L.lim;
  }
}), LD = Ze((t, i) => {
  var o = Du(), r = o.longestPath, s = kx(), u = HD();
  i.exports = c;
  function c(g) {
    var y = g.graph().ranker;
    if (y instanceof Function) return y(g);
    switch (g.graph().ranker) {
      case "network-simplex":
        p(g);
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
        p(g);
    }
  }
  var d = r;
  function m(g) {
    r(g), s(g);
  }
  function p(g) {
    u(g);
  }
}), BD = Ze((t, i) => {
  i.exports = o;
  function o(u) {
    let c = s(u);
    u.graph().dummyChains.forEach((d) => {
      let m = u.node(d), p = m.edgeObj, g = r(u, c, p.v, p.w), y = g.path, v = g.lca, x = 0, w = y[x], _ = !0;
      for (; d !== p.w; ) {
        if (m = u.node(d), _) {
          for (; (w = y[x]) !== v && u.node(w).maxRank < m.rank; ) x++;
          w === v && (_ = !1);
        }
        if (!_) {
          for (; x < y.length - 1 && u.node(w = y[x + 1]).minRank <= m.rank; ) x++;
          w = y[x];
        }
        u.setParent(d, w), d = u.successors(d)[0];
      }
    });
  }
  function r(u, c, d, m) {
    let p = [], g = [], y = Math.min(c[d].low, c[m].low), v = Math.max(c[d].lim, c[m].lim), x, w;
    x = d;
    do
      x = u.parent(x), p.push(x);
    while (x && (c[x].low > y || v > c[x].lim));
    for (w = x, x = m; (x = u.parent(x)) !== w; ) g.push(x);
    return { path: p.concat(g.reverse()), lca: w };
  }
  function s(u) {
    let c = {}, d = 0;
    function m(p) {
      let g = d;
      u.children(p).forEach(m), c[p] = { low: g, lim: d++ };
    }
    return u.children().forEach(m), c;
  }
}), ID = Ze((t, i) => {
  var o = gt();
  i.exports = { run: r, cleanup: d };
  function r(m) {
    let p = o.addDummyNode(m, "root", {}, "_root"), g = u(m), y = Object.values(g), v = o.applyWithChunking(Math.max, y) - 1, x = 2 * v + 1;
    m.graph().nestingRoot = p, m.edges().forEach((_) => m.edge(_).minlen *= x);
    let w = c(m) + 1;
    m.children().forEach((_) => s(m, p, x, w, v, g, _)), m.graph().nodeRankFactor = x;
  }
  function s(m, p, g, y, v, x, w) {
    let _ = m.children(w);
    if (!_.length) {
      w !== p && m.setEdge(p, w, { weight: 0, minlen: g });
      return;
    }
    let T = o.addBorderNode(m, "_bt"), A = o.addBorderNode(m, "_bb"), O = m.node(w);
    m.setParent(T, w), O.borderTop = T, m.setParent(A, w), O.borderBottom = A, _.forEach((N) => {
      s(m, p, g, y, v, x, N);
      let C = m.node(N), I = C.borderTop ? C.borderTop : N, L = C.borderBottom ? C.borderBottom : N, k = C.borderTop ? y : 2 * y, q = I !== L ? 1 : v - x[w] + 1;
      m.setEdge(T, I, { weight: k, minlen: q, nestingEdge: !0 }), m.setEdge(L, A, { weight: k, minlen: q, nestingEdge: !0 });
    }), m.parent(w) || m.setEdge(p, T, { weight: 0, minlen: v + x[w] });
  }
  function u(m) {
    var p = {};
    function g(y, v) {
      var x = m.children(y);
      x && x.length && x.forEach((w) => g(w, v + 1)), p[y] = v;
    }
    return m.children().forEach((y) => g(y, 1)), p;
  }
  function c(m) {
    return m.edges().reduce((p, g) => p + m.edge(g).weight, 0);
  }
  function d(m) {
    var p = m.graph();
    m.removeNode(p.nestingRoot), delete p.nestingRoot, m.edges().forEach((g) => {
      var y = m.edge(g);
      y.nestingEdge && m.removeEdge(g);
    });
  }
}), VD = Ze((t, i) => {
  var o = gt();
  i.exports = r;
  function r(u) {
    function c(d) {
      let m = u.children(d), p = u.node(d);
      if (m.length && m.forEach(c), Object.hasOwn(p, "minRank")) {
        p.borderLeft = [], p.borderRight = [];
        for (let g = p.minRank, y = p.maxRank + 1; g < y; ++g) s(u, "borderLeft", "_bl", d, p, g), s(u, "borderRight", "_br", d, p, g);
      }
    }
    u.children().forEach(c);
  }
  function s(u, c, d, m, p, g) {
    let y = { width: 0, height: 0, rank: g, borderType: c }, v = p[c][g - 1], x = o.addDummyNode(u, "border", y, d);
    p[c][g] = x, u.setParent(x, m), v && u.setEdge(v, x, { weight: 1 });
  }
}), UD = Ze((t, i) => {
  i.exports = { adjust: o, undo: r };
  function o(g) {
    let y = g.graph().rankdir.toLowerCase();
    (y === "lr" || y === "rl") && s(g);
  }
  function r(g) {
    let y = g.graph().rankdir.toLowerCase();
    (y === "bt" || y === "rl") && c(g), (y === "lr" || y === "rl") && (m(g), s(g));
  }
  function s(g) {
    g.nodes().forEach((y) => u(g.node(y))), g.edges().forEach((y) => u(g.edge(y)));
  }
  function u(g) {
    let y = g.width;
    g.width = g.height, g.height = y;
  }
  function c(g) {
    g.nodes().forEach((y) => d(g.node(y))), g.edges().forEach((y) => {
      let v = g.edge(y);
      v.points.forEach(d), Object.hasOwn(v, "y") && d(v);
    });
  }
  function d(g) {
    g.y = -g.y;
  }
  function m(g) {
    g.nodes().forEach((y) => p(g.node(y))), g.edges().forEach((y) => {
      let v = g.edge(y);
      v.points.forEach(p), Object.hasOwn(v, "x") && p(v);
    });
  }
  function p(g) {
    let y = g.x;
    g.x = g.y, g.y = y;
  }
}), YD = Ze((t, i) => {
  var o = gt();
  i.exports = r;
  function r(s) {
    let u = {}, c = s.nodes().filter((y) => !s.children(y).length), d = c.map((y) => s.node(y).rank), m = o.applyWithChunking(Math.max, d), p = o.range(m + 1).map(() => []);
    function g(y) {
      if (u[y]) return;
      u[y] = !0;
      let v = s.node(y);
      p[v.rank].push(y), s.successors(y).forEach(g);
    }
    return c.sort((y, v) => s.node(y).rank - s.node(v).rank).forEach(g), p;
  }
}), qD = Ze((t, i) => {
  var o = gt().zipObject;
  i.exports = r;
  function r(u, c) {
    let d = 0;
    for (let m = 1; m < c.length; ++m) d += s(u, c[m - 1], c[m]);
    return d;
  }
  function s(u, c, d) {
    let m = o(d, d.map((w, _) => _)), p = c.flatMap((w) => u.outEdges(w).map((_) => ({ pos: m[_.w], weight: u.edge(_).weight })).sort((_, T) => _.pos - T.pos)), g = 1;
    for (; g < d.length; ) g <<= 1;
    let y = 2 * g - 1;
    g -= 1;
    let v = new Array(y).fill(0), x = 0;
    return p.forEach((w) => {
      let _ = w.pos + g;
      v[_] += w.weight;
      let T = 0;
      for (; _ > 0; ) _ % 2 && (T += v[_ + 1]), _ = _ - 1 >> 1, v[_] += w.weight;
      x += w.weight * T;
    }), x;
  }
}), $D = Ze((t, i) => {
  i.exports = o;
  function o(r, s = []) {
    return s.map((u) => {
      let c = r.inEdges(u);
      if (c.length) {
        let d = c.reduce((m, p) => {
          let g = r.edge(p), y = r.node(p.v);
          return { sum: m.sum + g.weight * y.order, weight: m.weight + g.weight };
        }, { sum: 0, weight: 0 });
        return { v: u, barycenter: d.sum / d.weight, weight: d.weight };
      } else return { v: u };
    });
  }
}), XD = Ze((t, i) => {
  var o = gt();
  i.exports = r;
  function r(c, d) {
    let m = {};
    c.forEach((g, y) => {
      let v = m[g.v] = { indegree: 0, in: [], out: [], vs: [g.v], i: y };
      g.barycenter !== void 0 && (v.barycenter = g.barycenter, v.weight = g.weight);
    }), d.edges().forEach((g) => {
      let y = m[g.v], v = m[g.w];
      y !== void 0 && v !== void 0 && (v.indegree++, y.out.push(m[g.w]));
    });
    let p = Object.values(m).filter((g) => !g.indegree);
    return s(p);
  }
  function s(c) {
    let d = [];
    function m(g) {
      return (y) => {
        y.merged || (y.barycenter === void 0 || g.barycenter === void 0 || y.barycenter >= g.barycenter) && u(g, y);
      };
    }
    function p(g) {
      return (y) => {
        y.in.push(g), --y.indegree === 0 && c.push(y);
      };
    }
    for (; c.length; ) {
      let g = c.pop();
      d.push(g), g.in.reverse().forEach(m(g)), g.out.forEach(p(g));
    }
    return d.filter((g) => !g.merged).map((g) => o.pick(g, ["vs", "i", "barycenter", "weight"]));
  }
  function u(c, d) {
    let m = 0, p = 0;
    c.weight && (m += c.barycenter * c.weight, p += c.weight), d.weight && (m += d.barycenter * d.weight, p += d.weight), c.vs = d.vs.concat(c.vs), c.barycenter = m / p, c.weight = p, c.i = Math.min(d.i, c.i), d.merged = !0;
  }
}), GD = Ze((t, i) => {
  var o = gt();
  i.exports = r;
  function r(c, d) {
    let m = o.partition(c, (T) => Object.hasOwn(T, "barycenter")), p = m.lhs, g = m.rhs.sort((T, A) => A.i - T.i), y = [], v = 0, x = 0, w = 0;
    p.sort(u(!!d)), w = s(y, g, w), p.forEach((T) => {
      w += T.vs.length, y.push(T.vs), v += T.barycenter * T.weight, x += T.weight, w = s(y, g, w);
    });
    let _ = { vs: y.flat(!0) };
    return x && (_.barycenter = v / x, _.weight = x), _;
  }
  function s(c, d, m) {
    let p;
    for (; d.length && (p = d[d.length - 1]).i <= m; ) d.pop(), c.push(p.vs), m++;
    return m;
  }
  function u(c) {
    return (d, m) => d.barycenter < m.barycenter ? -1 : d.barycenter > m.barycenter ? 1 : c ? m.i - d.i : d.i - m.i;
  }
}), ZD = Ze((t, i) => {
  var o = $D(), r = XD(), s = GD();
  i.exports = u;
  function u(m, p, g, y) {
    let v = m.children(p), x = m.node(p), w = x ? x.borderLeft : void 0, _ = x ? x.borderRight : void 0, T = {};
    w && (v = v.filter((C) => C !== w && C !== _));
    let A = o(m, v);
    A.forEach((C) => {
      if (m.children(C.v).length) {
        let I = u(m, C.v, g, y);
        T[C.v] = I, Object.hasOwn(I, "barycenter") && d(C, I);
      }
    });
    let O = r(A, g);
    c(O, T);
    let N = s(O, y);
    if (w && (N.vs = [w, N.vs, _].flat(!0), m.predecessors(w).length)) {
      let C = m.node(m.predecessors(w)[0]), I = m.node(m.predecessors(_)[0]);
      Object.hasOwn(N, "barycenter") || (N.barycenter = 0, N.weight = 0), N.barycenter = (N.barycenter * N.weight + C.order + I.order) / (N.weight + 2), N.weight += 2;
    }
    return N;
  }
  function c(m, p) {
    m.forEach((g) => {
      g.vs = g.vs.flatMap((y) => p[y] ? p[y].vs : y);
    });
  }
  function d(m, p) {
    m.barycenter !== void 0 ? (m.barycenter = (m.barycenter * m.weight + p.barycenter * p.weight) / (m.weight + p.weight), m.weight += p.weight) : (m.barycenter = p.barycenter, m.weight = p.weight);
  }
}), KD = Ze((t, i) => {
  var o = xn().Graph, r = gt();
  i.exports = s;
  function s(c, d, m, p) {
    p || (p = c.nodes());
    let g = u(c), y = new o({ compound: !0 }).setGraph({ root: g }).setDefaultNodeLabel((v) => c.node(v));
    return p.forEach((v) => {
      let x = c.node(v), w = c.parent(v);
      (x.rank === d || x.minRank <= d && d <= x.maxRank) && (y.setNode(v), y.setParent(v, w || g), c[m](v).forEach((_) => {
        let T = _.v === v ? _.w : _.v, A = y.edge(T, v), O = A !== void 0 ? A.weight : 0;
        y.setEdge(T, v, { weight: c.edge(_).weight + O });
      }), Object.hasOwn(x, "minRank") && y.setNode(v, { borderLeft: x.borderLeft[d], borderRight: x.borderRight[d] }));
    }), y;
  }
  function u(c) {
    for (var d; c.hasNode(d = r.uniqueId("_root")); ) ;
    return d;
  }
}), QD = Ze((t, i) => {
  i.exports = o;
  function o(r, s, u) {
    let c = {}, d;
    u.forEach((m) => {
      let p = r.parent(m), g, y;
      for (; p; ) {
        if (g = r.parent(p), g ? (y = c[g], c[g] = p) : (y = d, d = p), y && y !== p) {
          s.setEdge(y, p);
          return;
        }
        p = g;
      }
    });
  }
}), FD = Ze((t, i) => {
  var o = YD(), r = qD(), s = ZD(), u = KD(), c = QD(), d = xn().Graph, m = gt();
  i.exports = p;
  function p(x, w = {}) {
    if (typeof w.customOrder == "function") {
      w.customOrder(x, p);
      return;
    }
    let _ = m.maxRank(x), T = g(x, m.range(1, _ + 1), "inEdges"), A = g(x, m.range(_ - 1, -1, -1), "outEdges"), O = o(x);
    if (v(x, O), w.disableOptimalOrderHeuristic) return;
    let N = Number.POSITIVE_INFINITY, C, I = w.constraints || [];
    for (let L = 0, k = 0; k < 4; ++L, ++k) {
      y(L % 2 ? T : A, L % 4 >= 2, I), O = m.buildLayerMatrix(x);
      let q = r(x, O);
      q < N ? (k = 0, C = Object.assign({}, O), N = q) : q === N && (C = structuredClone(O));
    }
    v(x, C);
  }
  function g(x, w, _) {
    let T = /* @__PURE__ */ new Map(), A = (O, N) => {
      T.has(O) || T.set(O, []), T.get(O).push(N);
    };
    for (let O of x.nodes()) {
      let N = x.node(O);
      if (typeof N.rank == "number" && A(N.rank, O), typeof N.minRank == "number" && typeof N.maxRank == "number") for (let C = N.minRank; C <= N.maxRank; C++) C !== N.rank && A(C, O);
    }
    return w.map(function(O) {
      return u(x, O, _, T.get(O) || []);
    });
  }
  function y(x, w, _) {
    let T = new d();
    x.forEach(function(A) {
      _.forEach((C) => T.setEdge(C.left, C.right));
      let O = A.graph().root, N = s(A, O, T, w);
      N.vs.forEach((C, I) => A.node(C).order = I), c(A, T, N.vs);
    });
  }
  function v(x, w) {
    Object.values(w).forEach((_) => _.forEach((T, A) => x.node(T).order = A));
  }
}), WD = Ze((t, i) => {
  var o = xn().Graph, r = gt();
  i.exports = { positionX: _, findType1Conflicts: s, findType2Conflicts: u, addConflict: d, hasConflict: m, verticalAlignment: p, horizontalCompaction: g, alignCoordinates: x, findSmallestWidthAlignment: v, balance: w };
  function s(O, N) {
    let C = {};
    function I(L, k) {
      let q = 0, te = 0, F = L.length, Y = k[k.length - 1];
      return k.forEach((Q, W) => {
        let j = c(O, Q), $ = j ? O.node(j).order : F;
        (j || Q === Y) && (k.slice(te, W + 1).forEach((M) => {
          O.predecessors(M).forEach((R) => {
            let B = O.node(R), K = B.order;
            (K < q || $ < K) && !(B.dummy && O.node(M).dummy) && d(C, R, M);
          });
        }), te = W + 1, q = $);
      }), k;
    }
    return N.length && N.reduce(I), C;
  }
  function u(O, N) {
    let C = {};
    function I(k, q, te, F, Y) {
      let Q;
      r.range(q, te).forEach((W) => {
        Q = k[W], O.node(Q).dummy && O.predecessors(Q).forEach((j) => {
          let $ = O.node(j);
          $.dummy && ($.order < F || $.order > Y) && d(C, j, Q);
        });
      });
    }
    function L(k, q) {
      let te = -1, F, Y = 0;
      return q.forEach((Q, W) => {
        if (O.node(Q).dummy === "border") {
          let j = O.predecessors(Q);
          j.length && (F = O.node(j[0]).order, I(q, Y, W, te, F), Y = W, te = F);
        }
        I(q, Y, q.length, F, k.length);
      }), q;
    }
    return N.length && N.reduce(L), C;
  }
  function c(O, N) {
    if (O.node(N).dummy) return O.predecessors(N).find((C) => O.node(C).dummy);
  }
  function d(O, N, C) {
    if (N > C) {
      let L = N;
      N = C, C = L;
    }
    let I = O[N];
    I || (O[N] = I = {}), I[C] = !0;
  }
  function m(O, N, C) {
    if (N > C) {
      let I = N;
      N = C, C = I;
    }
    return !!O[N] && Object.hasOwn(O[N], C);
  }
  function p(O, N, C, I) {
    let L = {}, k = {}, q = {};
    return N.forEach((te) => {
      te.forEach((F, Y) => {
        L[F] = F, k[F] = F, q[F] = Y;
      });
    }), N.forEach((te) => {
      let F = -1;
      te.forEach((Y) => {
        let Q = I(Y);
        if (Q.length) {
          Q = Q.sort((j, $) => q[j] - q[$]);
          let W = (Q.length - 1) / 2;
          for (let j = Math.floor(W), $ = Math.ceil(W); j <= $; ++j) {
            let M = Q[j];
            k[Y] === Y && F < q[M] && !m(C, Y, M) && (k[M] = Y, k[Y] = L[Y] = L[M], F = q[M]);
          }
        }
      });
    }), { root: L, align: k };
  }
  function g(O, N, C, I, L) {
    let k = {}, q = y(O, N, C, L), te = L ? "borderLeft" : "borderRight";
    function F(W, j) {
      let $ = q.nodes().slice(), M = {}, R = $.pop();
      for (; R; ) {
        if (M[R]) W(R);
        else {
          M[R] = !0, $.push(R);
          for (let B of j(R)) $.push(B);
        }
        R = $.pop();
      }
    }
    function Y(W) {
      k[W] = q.inEdges(W).reduce((j, $) => Math.max(j, k[$.v] + q.edge($)), 0);
    }
    function Q(W) {
      let j = q.outEdges(W).reduce((M, R) => Math.min(M, k[R.w] - q.edge(R)), Number.POSITIVE_INFINITY), $ = O.node(W);
      j !== Number.POSITIVE_INFINITY && $.borderType !== te && (k[W] = Math.max(k[W], j));
    }
    return F(Y, q.predecessors.bind(q)), F(Q, q.successors.bind(q)), Object.keys(I).forEach((W) => k[W] = k[C[W]]), k;
  }
  function y(O, N, C, I) {
    let L = new o(), k = O.graph(), q = T(k.nodesep, k.edgesep, I);
    return N.forEach((te) => {
      let F;
      te.forEach((Y) => {
        let Q = C[Y];
        if (L.setNode(Q), F) {
          var W = C[F], j = L.edge(W, Q);
          L.setEdge(W, Q, Math.max(q(O, Y, F), j || 0));
        }
        F = Y;
      });
    }), L;
  }
  function v(O, N) {
    return Object.values(N).reduce((C, I) => {
      let L = Number.NEGATIVE_INFINITY, k = Number.POSITIVE_INFINITY;
      Object.entries(I).forEach(([te, F]) => {
        let Y = A(O, te) / 2;
        L = Math.max(F + Y, L), k = Math.min(F - Y, k);
      });
      let q = L - k;
      return q < C[0] && (C = [q, I]), C;
    }, [Number.POSITIVE_INFINITY, null])[1];
  }
  function x(O, N) {
    let C = Object.values(N), I = r.applyWithChunking(Math.min, C), L = r.applyWithChunking(Math.max, C);
    ["u", "d"].forEach((k) => {
      ["l", "r"].forEach((q) => {
        let te = k + q, F = O[te];
        if (F === N) return;
        let Y = Object.values(F), Q = I - r.applyWithChunking(Math.min, Y);
        q !== "l" && (Q = L - r.applyWithChunking(Math.max, Y)), Q && (O[te] = r.mapValues(F, (W) => W + Q));
      });
    });
  }
  function w(O, N) {
    return r.mapValues(O.ul, (C, I) => {
      if (N) return O[N.toLowerCase()][I];
      {
        let L = Object.values(O).map((k) => k[I]).sort((k, q) => k - q);
        return (L[1] + L[2]) / 2;
      }
    });
  }
  function _(O) {
    let N = r.buildLayerMatrix(O), C = Object.assign(s(O, N), u(O, N)), I = {}, L;
    ["u", "d"].forEach((q) => {
      L = q === "u" ? N : Object.values(N).reverse(), ["l", "r"].forEach((te) => {
        te === "r" && (L = L.map((W) => Object.values(W).reverse()));
        let F = (q === "u" ? O.predecessors : O.successors).bind(O), Y = p(O, L, C, F), Q = g(O, L, Y.root, Y.align, te === "r");
        te === "r" && (Q = r.mapValues(Q, (W) => -W)), I[q + te] = Q;
      });
    });
    let k = v(O, I);
    return x(I, k), w(I, O.graph().align);
  }
  function T(O, N, C) {
    return (I, L, k) => {
      let q = I.node(L), te = I.node(k), F = 0, Y;
      if (F += q.width / 2, Object.hasOwn(q, "labelpos")) switch (q.labelpos.toLowerCase()) {
        case "l":
          Y = -q.width / 2;
          break;
        case "r":
          Y = q.width / 2;
          break;
      }
      if (Y && (F += C ? Y : -Y), Y = 0, F += (q.dummy ? N : O) / 2, F += (te.dummy ? N : O) / 2, F += te.width / 2, Object.hasOwn(te, "labelpos")) switch (te.labelpos.toLowerCase()) {
        case "l":
          Y = te.width / 2;
          break;
        case "r":
          Y = -te.width / 2;
          break;
      }
      return Y && (F += C ? Y : -Y), Y = 0, F;
    };
  }
  function A(O, N) {
    return O.node(N).width;
  }
}), JD = Ze((t, i) => {
  var o = gt(), r = WD().positionX;
  i.exports = s;
  function s(c) {
    c = o.asNonCompoundGraph(c), u(c), Object.entries(r(c)).forEach(([d, m]) => c.node(d).x = m);
  }
  function u(c) {
    let d = o.buildLayerMatrix(c), m = c.graph().ranksep, p = c.graph().rankalign, g = 0;
    d.forEach((y) => {
      let v = y.reduce((x, w) => {
        let _ = c.node(w).height;
        return x > _ ? x : _;
      }, 0);
      y.forEach((x) => {
        let w = c.node(x);
        p === "top" ? w.y = g + w.height / 2 : p === "bottom" ? w.y = g + v - w.height / 2 : w.y = g + v / 2;
      }), g += v + m;
    });
  }
}), PD = Ze((t, i) => {
  var o = RD(), r = kD(), s = LD(), u = gt().normalizeRanks, c = BD(), d = gt().removeEmptyRanks, m = ID(), p = VD(), g = UD(), y = FD(), v = JD(), x = gt(), w = xn().Graph;
  i.exports = _;
  function _(E, U = {}) {
    let G = U.debugTiming ? x.time : x.notime;
    return G("layout", () => {
      let J = G("  buildLayoutGraph", () => F(E));
      return G("  runLayout", () => T(J, G, U)), G("  updateInputGraph", () => A(E, J)), J;
    });
  }
  function T(E, U, G) {
    U("    makeSpaceForEdgeLabels", () => Y(E)), U("    removeSelfEdges", () => ee(E)), U("    acyclic", () => o.run(E)), U("    nestingGraph.run", () => m.run(E)), U("    rank", () => s(x.asNonCompoundGraph(E))), U("    injectEdgeLabelProxies", () => Q(E)), U("    removeEmptyRanks", () => d(E)), U("    nestingGraph.cleanup", () => m.cleanup(E)), U("    normalizeRanks", () => u(E)), U("    assignRankMinMax", () => W(E)), U("    removeEdgeLabelProxies", () => j(E)), U("    normalize.run", () => r.run(E)), U("    parentDummyChains", () => c(E)), U("    addBorderSegments", () => p(E)), U("    order", () => y(E, G)), U("    insertSelfEdges", () => D(E)), U("    adjustCoordinateSystem", () => g.adjust(E)), U("    position", () => v(E)), U("    positionSelfEdges", () => V(E)), U("    removeBorderNodes", () => K(E)), U("    normalize.undo", () => r.undo(E)), U("    fixupEdgeLabelCoords", () => R(E)), U("    undoCoordinateSystem", () => g.undo(E)), U("    translateGraph", () => $(E)), U("    assignNodeIntersects", () => M(E)), U("    reversePoints", () => B(E)), U("    acyclic.undo", () => o.undo(E));
  }
  function A(E, U) {
    E.nodes().forEach((G) => {
      let J = E.node(G), Z = U.node(G);
      J && (J.x = Z.x, J.y = Z.y, J.order = Z.order, J.rank = Z.rank, U.children(G).length && (J.width = Z.width, J.height = Z.height));
    }), E.edges().forEach((G) => {
      let J = E.edge(G), Z = U.edge(G);
      J.points = Z.points, Object.hasOwn(Z, "x") && (J.x = Z.x, J.y = Z.y);
    }), E.graph().width = U.graph().width, E.graph().height = U.graph().height;
  }
  var O = ["nodesep", "edgesep", "ranksep", "marginx", "marginy"], N = { ranksep: 50, edgesep: 20, nodesep: 50, rankdir: "tb", rankalign: "center" }, C = ["acyclicer", "ranker", "rankdir", "align", "rankalign"], I = ["width", "height", "rank"], L = { width: 0, height: 0 }, k = ["minlen", "weight", "width", "height", "labeloffset"], q = { minlen: 1, weight: 1, width: 0, height: 0, labeloffset: 10, labelpos: "r" }, te = ["labelpos"];
  function F(E) {
    let U = new w({ multigraph: !0, compound: !0 }), G = H(E.graph());
    return U.setGraph(Object.assign({}, N, ne(G, O), x.pick(G, C))), E.nodes().forEach((J) => {
      let Z = H(E.node(J)), se = ne(Z, I);
      Object.keys(L).forEach((me) => {
        se[me] === void 0 && (se[me] = L[me]);
      }), U.setNode(J, se), U.setParent(J, E.parent(J));
    }), E.edges().forEach((J) => {
      let Z = H(E.edge(J));
      U.setEdge(J, Object.assign({}, q, ne(Z, k), x.pick(Z, te)));
    }), U;
  }
  function Y(E) {
    let U = E.graph();
    U.ranksep /= 2, E.edges().forEach((G) => {
      let J = E.edge(G);
      J.minlen *= 2, J.labelpos.toLowerCase() !== "c" && (U.rankdir === "TB" || U.rankdir === "BT" ? J.width += J.labeloffset : J.height += J.labeloffset);
    });
  }
  function Q(E) {
    E.edges().forEach((U) => {
      let G = E.edge(U);
      if (G.width && G.height) {
        let J = E.node(U.v), Z = { rank: (E.node(U.w).rank - J.rank) / 2 + J.rank, e: U };
        x.addDummyNode(E, "edge-proxy", Z, "_ep");
      }
    });
  }
  function W(E) {
    let U = 0;
    E.nodes().forEach((G) => {
      let J = E.node(G);
      J.borderTop && (J.minRank = E.node(J.borderTop).rank, J.maxRank = E.node(J.borderBottom).rank, U = Math.max(U, J.maxRank));
    }), E.graph().maxRank = U;
  }
  function j(E) {
    E.nodes().forEach((U) => {
      let G = E.node(U);
      G.dummy === "edge-proxy" && (E.edge(G.e).labelRank = G.rank, E.removeNode(U));
    });
  }
  function $(E) {
    let U = Number.POSITIVE_INFINITY, G = 0, J = Number.POSITIVE_INFINITY, Z = 0, se = E.graph(), me = se.marginx || 0, ge = se.marginy || 0;
    function xe(Ee) {
      let Ce = Ee.x, Ae = Ee.y, Ie = Ee.width, Ve = Ee.height;
      U = Math.min(U, Ce - Ie / 2), G = Math.max(G, Ce + Ie / 2), J = Math.min(J, Ae - Ve / 2), Z = Math.max(Z, Ae + Ve / 2);
    }
    E.nodes().forEach((Ee) => xe(E.node(Ee))), E.edges().forEach((Ee) => {
      let Ce = E.edge(Ee);
      Object.hasOwn(Ce, "x") && xe(Ce);
    }), U -= me, J -= ge, E.nodes().forEach((Ee) => {
      let Ce = E.node(Ee);
      Ce.x -= U, Ce.y -= J;
    }), E.edges().forEach((Ee) => {
      let Ce = E.edge(Ee);
      Ce.points.forEach((Ae) => {
        Ae.x -= U, Ae.y -= J;
      }), Object.hasOwn(Ce, "x") && (Ce.x -= U), Object.hasOwn(Ce, "y") && (Ce.y -= J);
    }), se.width = G - U + me, se.height = Z - J + ge;
  }
  function M(E) {
    E.edges().forEach((U) => {
      let G = E.edge(U), J = E.node(U.v), Z = E.node(U.w), se, me;
      G.points ? (se = G.points[0], me = G.points[G.points.length - 1]) : (G.points = [], se = Z, me = J), G.points.unshift(x.intersectRect(J, se)), G.points.push(x.intersectRect(Z, me));
    });
  }
  function R(E) {
    E.edges().forEach((U) => {
      let G = E.edge(U);
      if (Object.hasOwn(G, "x")) switch ((G.labelpos === "l" || G.labelpos === "r") && (G.width -= G.labeloffset), G.labelpos) {
        case "l":
          G.x -= G.width / 2 + G.labeloffset;
          break;
        case "r":
          G.x += G.width / 2 + G.labeloffset;
          break;
      }
    });
  }
  function B(E) {
    E.edges().forEach((U) => {
      let G = E.edge(U);
      G.reversed && G.points.reverse();
    });
  }
  function K(E) {
    E.nodes().forEach((U) => {
      if (E.children(U).length) {
        let G = E.node(U), J = E.node(G.borderTop), Z = E.node(G.borderBottom), se = E.node(G.borderLeft[G.borderLeft.length - 1]), me = E.node(G.borderRight[G.borderRight.length - 1]);
        G.width = Math.abs(me.x - se.x), G.height = Math.abs(Z.y - J.y), G.x = se.x + G.width / 2, G.y = J.y + G.height / 2;
      }
    }), E.nodes().forEach((U) => {
      E.node(U).dummy === "border" && E.removeNode(U);
    });
  }
  function ee(E) {
    E.edges().forEach((U) => {
      if (U.v === U.w) {
        var G = E.node(U.v);
        G.selfEdges || (G.selfEdges = []), G.selfEdges.push({ e: U, label: E.edge(U) }), E.removeEdge(U);
      }
    });
  }
  function D(E) {
    var U = x.buildLayerMatrix(E);
    U.forEach((G) => {
      var J = 0;
      G.forEach((Z, se) => {
        var me = E.node(Z);
        me.order = se + J, (me.selfEdges || []).forEach((ge) => {
          x.addDummyNode(E, "selfedge", { width: ge.label.width, height: ge.label.height, rank: me.rank, order: se + ++J, e: ge.e, label: ge.label }, "_se");
        }), delete me.selfEdges;
      });
    });
  }
  function V(E) {
    E.nodes().forEach((U) => {
      var G = E.node(U);
      if (G.dummy === "selfedge") {
        var J = E.node(G.e.v), Z = J.x + J.width / 2, se = J.y, me = G.x - Z, ge = J.height / 2;
        E.setEdge(G.e, G.label), E.removeNode(U), G.label.points = [{ x: Z + 2 * me / 3, y: se - ge }, { x: Z + 5 * me / 6, y: se - ge }, { x: Z + me, y: se }, { x: Z + 5 * me / 6, y: se + ge }, { x: Z + 2 * me / 3, y: se + ge }], G.label.x = G.x, G.label.y = G.y;
      }
    });
  }
  function ne(E, U) {
    return x.mapValues(x.pick(E, U), Number);
  }
  function H(E) {
    var U = {};
    return E && Object.entries(E).forEach(([G, J]) => {
      typeof G == "string" && (G = G.toLowerCase()), U[G] = J;
    }), U;
  }
}), ej = Ze((t, i) => {
  var o = gt(), r = xn().Graph;
  i.exports = { debugOrdering: s };
  function s(u) {
    let c = o.buildLayerMatrix(u), d = new r({ compound: !0, multigraph: !0 }).setGraph({});
    return u.nodes().forEach((m) => {
      d.setNode(m, { label: m }), d.setParent(m, "layer" + u.node(m).rank);
    }), u.edges().forEach((m) => d.setEdge(m.v, m.w, {}, m.name)), c.forEach((m, p) => {
      let g = "layer" + p;
      d.setNode(g, { rank: "same" }), m.reduce((y, v) => (d.setEdge(y, v, { style: "invis" }), v));
    }), d;
  }
}), tj = Ze((t, i) => {
  i.exports = "2.0.4";
}), nj = Ze((t, i) => {
  i.exports = { graphlib: xn(), layout: PD(), debug: ej(), util: { time: gt().time, notime: gt().notime }, version: tj() };
});
const Z0 = nj();
const eh = 200, th = 80;
function K0(t) {
  const i = t % 3, o = Math.floor(t / 3);
  return {
    x: i * (eh + 80) + 50,
    y: o * (th + 80) + 50
  };
}
function ij(t) {
  const i = /* @__PURE__ */ new Map();
  return t.forEach((o, r) => {
    const s = o.name ?? "";
    i.has(s) || i.set(s, bn(r));
  }), i;
}
function Hx(t) {
  const i = t.direction ?? "TB", o = Array.isArray(t.states) ? t.states : [], r = Array.isArray(t.transitions) ? t.transitions : [];
  if (o.length === 0)
    return {};
  const s = {};
  try {
    const u = new Z0.graphlib.Graph();
    u.setDefaultEdgeLabel(() => ({})), u.setGraph({
      rankdir: i,
      nodesep: 80,
      ranksep: 100
    }), o.forEach((d, m) => {
      u.setNode(bn(m), {
        width: eh,
        height: th
      });
    });
    const c = ij(o);
    r.forEach((d) => {
      const m = c.get(d.from), p = d.to || d.dynamic_to?.resolver, g = p ? c.get(p) : void 0;
      !m || !g || u.setEdge(m, g);
    }), Z0.layout(u), o.forEach((d, m) => {
      const p = bn(m), g = u.node(p);
      if (!g || typeof g.x != "number" || typeof g.y != "number") {
        s[p] = K0(m);
        return;
      }
      s[p] = {
        x: g.x - eh / 2,
        y: g.y - th / 2
      };
    });
  } catch {
    o.forEach((u, c) => {
      s[bn(c)] = K0(c);
    });
  }
  return s;
}
const Lx = "(prefers-reduced-motion: reduce)";
function Bx() {
  return typeof window < "u" && typeof window.matchMedia == "function";
}
function aj() {
  return Bx() ? window.matchMedia(Lx).matches : !1;
}
function oj() {
  const [t, i] = X.useState(aj);
  return X.useEffect(() => {
    if (!Bx())
      return;
    const o = window.matchMedia(Lx), r = () => {
      i(o.matches);
    };
    return r(), typeof o.addEventListener == "function" ? (o.addEventListener("change", r), () => {
      o.removeEventListener("change", r);
    }) : (o.addListener(r), () => {
      o.removeListener(r);
    });
  }, []), t;
}
function rj() {
  return /* @__PURE__ */ b.jsx(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      "aria-hidden": "true",
      children: /* @__PURE__ */ b.jsx("path", { d: "M8 5v14l11-7z" })
    }
  );
}
function lj() {
  return /* @__PURE__ */ b.jsx(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      "aria-hidden": "true",
      children: /* @__PURE__ */ b.jsx("rect", { x: "6", y: "6", width: "12", height: "12", rx: "1" })
    }
  );
}
function sj() {
  return /* @__PURE__ */ b.jsx(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      "aria-hidden": "true",
      children: /* @__PURE__ */ b.jsx("circle", { cx: "12", cy: "12", r: "6" })
    }
  );
}
function uj({ data: t, selected: i }) {
  const o = t, { name: r, initial: s, terminal: u, transitionCount: c, simulationRole: d } = o, m = oj(), g = s ? "initial" : u ? "terminal" : "regular", y = () => s ? "Initial" : u ? "Final" : "Regular", v = () => s ? /* @__PURE__ */ b.jsx(rj, {}) : u ? /* @__PURE__ */ b.jsx(lj, {}) : /* @__PURE__ */ b.jsx(sj, {}), x = d === "current-projected" ? "Current + Projected" : d === "current" ? "Current" : d === "projected" ? "Projected" : null, w = i && !m ? " fub-node--selected-animated" : "", _ = d ? ` fub-node--simulation-${d}` : "";
  return /* @__PURE__ */ b.jsxs(
    "div",
    {
      className: `fub-node fub-node--${g}${i ? " fub-node--selected" : ""}${w}${_}`,
      "data-node-type": g,
      children: [
        /* @__PURE__ */ b.jsx(
          Oo,
          {
            type: "target",
            position: we.Top,
            className: "fub-node-handle fub-node-handle--target",
            id: "target"
          }
        ),
        /* @__PURE__ */ b.jsxs("div", { className: "fub-node-header", children: [
          /* @__PURE__ */ b.jsx("div", { className: "fub-node-icon", children: v() }),
          /* @__PURE__ */ b.jsx("span", { className: "fub-node-title", children: r || "(unnamed)" }),
          /* @__PURE__ */ b.jsx("span", { className: "fub-node-badge", children: y() })
        ] }),
        /* @__PURE__ */ b.jsxs("div", { className: "fub-node-body", children: [
          x ? /* @__PURE__ */ b.jsx("div", { className: "fub-node-sim-pill", children: x }) : null,
          c !== void 0 && c > 0 ? /* @__PURE__ */ b.jsx("div", { className: "fub-node-meta", children: /* @__PURE__ */ b.jsxs("span", { className: "fub-node-meta-item", children: [
            /* @__PURE__ */ b.jsxs(
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
                  /* @__PURE__ */ b.jsx("path", { d: "M5 12h14" }),
                  /* @__PURE__ */ b.jsx("path", { d: "m12 5 7 7-7 7" })
                ]
              }
            ),
            c,
            " transition",
            c !== 1 ? "s" : ""
          ] }) }) : /* @__PURE__ */ b.jsx("div", { className: "fub-node-meta fub-node-meta--empty", children: /* @__PURE__ */ b.jsx("span", { className: "fub-node-meta-item", children: "No outgoing transitions" }) })
        ] }),
        /* @__PURE__ */ b.jsx(
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
const cj = X.memo(uj), fj = {
  stateNode: cj
};
function dj({
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
  const [p, g, y] = wh({
    sourceX: i,
    sourceY: o,
    sourcePosition: u,
    targetX: r,
    targetY: s,
    targetPosition: c
  });
  return /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
    /* @__PURE__ */ b.jsx(
      pl,
      {
        id: t,
        path: p,
        className: `fub-edge-path${m ? " fub-edge-path--selected" : ""}`,
        markerEnd: `url(#fub-arrow${m ? "-selected" : ""})`
      }
    ),
    d && /* @__PURE__ */ b.jsx(tD, { children: /* @__PURE__ */ b.jsx(
      "div",
      {
        className: `fub-edge-label${m ? " fub-edge-label--selected" : ""}`,
        style: {
          position: "absolute",
          transform: `translate(-50%, -50%) translate(${g}px,${y}px)`,
          pointerEvents: "all"
        },
        children: d
      }
    ) })
  ] });
}
const hj = {
  custom: dj
};
function Q0(t, i, o, r, s) {
  const u = Array.isArray(t) ? t : [], c = Array.isArray(i) ? i : [];
  if (u.length === 0)
    return { nodes: [], edges: [] };
  const d = {};
  c.forEach((v) => {
    v.from && (d[v.from] = (d[v.from] || 0) + 1);
  });
  const m = /* @__PURE__ */ new Map(), p = Hx({
    states: u,
    transitions: c,
    direction: s
  }), g = u.map((v, x) => {
    const w = bn(x);
    m.has(v.name) || m.set(v.name, w);
    const _ = r.currentStateName === v.name, T = r.projectedStateName === v.name, A = _ && T ? "current-projected" : _ ? "current" : T ? "projected" : void 0;
    return {
      id: w,
      type: "stateNode",
      position: o[w] ?? p[w] ?? { x: 0, y: 0 },
      data: {
        name: v.name,
        initial: v.initial,
        terminal: v.terminal,
        stateIndex: x,
        transitionCount: d[v.name] || 0,
        simulationRole: A
      }
    };
  }), y = [];
  return c.forEach((v, x) => {
    const w = v.to || v.dynamic_to?.resolver, _ = m.get(v.from), T = w ? m.get(w) : void 0;
    !_ || !T || y.push({
      id: `edge-${x}`,
      source: _,
      target: T,
      label: v.event || "(event)",
      type: "custom",
      data: {
        transitionIndex: x
      }
    });
  }), { nodes: g, edges: y };
}
function mj(t) {
  const i = be((E) => E.document), o = i.definition, r = be((E) => E.selection), s = be((E) => E.setSelection), u = be((E) => E.addState), c = be((E) => E.addStateFromPalette), d = be((E) => E.setGraphNodePosition), m = be((E) => E.setGraphNodePositions), p = Dt((E) => E.projectedOutcome), g = Dt((E) => E.snapshotResult), y = qe((E) => E.canvasZoom), v = qe((E) => E.zoomCanvas), x = !!t.readOnly, w = o.states, _ = o.transitions, T = X.useRef(null), A = Gu(), [O, N] = X.useState(!1), [C, I] = X.useState("TB"), L = X.useMemo(() => ({
    currentStateName: p?.previousState || g?.currentState,
    projectedStateName: p?.currentState
  }), [p, g]), k = !!(p || g), q = X.useMemo(() => gu(i.ui_schema), [i.ui_schema]), { nodes: te, edges: F } = X.useMemo(
    () => Q0(w, _, q, L, C),
    [w, _, q, L, C]
  ), [Y, Q, W] = nD(te), [j, $, M] = iD(F);
  X.useEffect(() => {
    const { nodes: E, edges: U } = Q0(
      w,
      _,
      q,
      L,
      C
    );
    Q(E), $(U);
  }, [w, _, q, L, C, Q, $]), X.useEffect(() => {
    if (r.kind === "state") {
      const E = bn(r.stateIndex);
      Q(
        (U) => U.map((G) => ({
          ...G,
          selected: G.id === E
        }))
      ), $(
        (U) => U.map((G) => ({
          ...G,
          selected: !1
        }))
      );
    } else if (r.kind === "transition" || r.kind === "workflow-node") {
      const E = r.transitionIndex;
      Q(
        (U) => U.map((G) => ({
          ...G,
          selected: !1
        }))
      ), $(
        (U) => U.map((G) => {
          const J = G.data;
          return {
            ...G,
            selected: J?.transitionIndex === E
          };
        })
      );
    } else
      Q(
        (E) => E.map((U) => ({
          ...U,
          selected: !1
        }))
      ), $(
        (E) => E.map((U) => ({
          ...U,
          selected: !1
        }))
      );
  }, [r, Q, $]);
  const R = X.useCallback(
    (E) => {
      W(E);
      for (const U of E)
        if (U.type === "select" && U.selected) {
          const J = Y.find((Z) => Z.id === U.id)?.data;
          J?.stateIndex !== void 0 && s({ kind: "state", stateIndex: J.stateIndex });
        }
    },
    [Y, W, s]
  ), B = X.useCallback(
    (E) => {
      M(E);
      for (const U of E)
        if (U.type === "select" && U.selected) {
          const J = j.find((Z) => Z.id === U.id)?.data;
          J?.transitionIndex !== void 0 && s({ kind: "transition", transitionIndex: J.transitionIndex });
        }
    },
    [j, M, s]
  ), K = X.useCallback(
    (E, U) => {
      if (x)
        return;
      const G = U.data;
      typeof G?.stateIndex == "number" && d(G.stateIndex, U.position);
    },
    [x, d]
  ), ee = X.useCallback(() => {
    if (x || w.length === 0)
      return;
    const E = Hx({
      states: w,
      transitions: _,
      direction: C
    });
    m(E);
  }, [C, x, m, w, _]), D = X.useCallback(
    (E, U) => {
      const G = U.zoom - y;
      Math.abs(G) > 0.01 && v(G);
    },
    [y, v]
  ), V = X.useCallback(
    (E) => {
      x || (E.preventDefault(), E.dataTransfer.dropEffect = "move", N(!0));
    },
    [x]
  ), ne = X.useCallback(
    (E) => {
      const U = E.relatedTarget;
      (!U || !E.currentTarget.contains(U)) && N(!1);
    },
    []
  ), H = X.useCallback(
    (E) => {
      if (x) return;
      E.preventDefault(), N(!1);
      const U = E.dataTransfer.getData("application/reactflow");
      if (!U) return;
      let G;
      try {
        G = JSON.parse(U);
      } catch {
        return;
      }
      if (G.type !== "state")
        return;
      const J = A.screenToFlowPosition({
        x: E.clientX,
        y: E.clientY
      }), Z = G.defaults?.initial ? "initial" : G.defaults?.terminal ? "final" : "state";
      c({
        namePrefix: Z,
        initial: G.defaults?.initial,
        terminal: G.defaults?.terminal,
        position: J
      });
    },
    [
      x,
      A,
      c
    ]
  );
  return /* @__PURE__ */ b.jsxs(
    "section",
    {
      className: `fub-panel fub-canvas${k ? " fub-canvas--simulation" : ""}`,
      "aria-label": "Canvas panel",
      role: "region",
      "aria-labelledby": "fub-panel-canvas-heading",
      id: "fub-panel-canvas",
      tabIndex: -1,
      children: [
        /* @__PURE__ */ b.jsxs("div", { className: "fub-panel-header", id: "fub-panel-canvas-heading", children: [
          /* @__PURE__ */ b.jsx("strong", { children: "Canvas" }),
          /* @__PURE__ */ b.jsxs("div", { className: "fub-inline-actions", children: [
            /* @__PURE__ */ b.jsx("span", { className: "fub-muted", children: "Graph + workflow overview" }),
            /* @__PURE__ */ b.jsxs("span", { className: "fub-badge fub-canvas-zoom", "aria-live": "polite", children: [
              "Zoom: ",
              Math.round(y * 100),
              "%"
            ] }),
            /* @__PURE__ */ b.jsxs(
              "select",
              {
                "aria-label": "Auto layout direction",
                className: "fub-input fub-canvas-layout-direction",
                value: C,
                disabled: x,
                onChange: (E) => {
                  const U = E.target.value;
                  I(U === "LR" ? "LR" : "TB");
                },
                children: [
                  /* @__PURE__ */ b.jsx("option", { value: "TB", children: "Top-Bottom" }),
                  /* @__PURE__ */ b.jsx("option", { value: "LR", children: "Left-Right" })
                ]
              }
            ),
            /* @__PURE__ */ b.jsx("button", { type: "button", className: "fub-mini-btn", onClick: ee, disabled: x || w.length < 2, children: "Auto layout" }),
            k ? /* @__PURE__ */ b.jsx("span", { className: "fub-badge fub-badge-simulation", children: "Simulation mode" }) : null,
            x ? /* @__PURE__ */ b.jsx("span", { className: "fub-badge", children: "Read-only" }) : null
          ] })
        ] }),
        /* @__PURE__ */ b.jsxs(
          "div",
          {
            ref: T,
            className: `fub-panel-body fub-canvas-flow-container${O ? " fub-canvas-drop-target" : ""}`,
            onDragOver: V,
            onDragLeave: ne,
            onDrop: H,
            children: [
              O && /* @__PURE__ */ b.jsx("div", { className: "fub-canvas-drop-indicator", children: /* @__PURE__ */ b.jsxs("div", { className: "fub-canvas-drop-indicator-content", children: [
                /* @__PURE__ */ b.jsxs(
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
                      /* @__PURE__ */ b.jsx("path", { d: "M12 5v14" }),
                      /* @__PURE__ */ b.jsx("path", { d: "M5 12h14" })
                    ]
                  }
                ),
                /* @__PURE__ */ b.jsx("span", { children: "Drop to add state" })
              ] }) }),
              w.length === 0 ? /* @__PURE__ */ b.jsxs("div", { className: "fub-empty-state", role: "status", "aria-live": "polite", children: [
                /* @__PURE__ */ b.jsx("div", { className: "fub-empty-icon", "aria-hidden": "true", children: "< >" }),
                /* @__PURE__ */ b.jsx("h3", { children: "No states yet" }),
                /* @__PURE__ */ b.jsx("p", { children: "Create your first state to start building your machine." }),
                /* @__PURE__ */ b.jsx(
                  "button",
                  {
                    type: "button",
                    className: "fub-btn",
                    onClick: u,
                    disabled: x,
                    children: "Create first state"
                  }
                ),
                /* @__PURE__ */ b.jsxs("p", { className: "fub-muted", children: [
                  "Hint: press ",
                  /* @__PURE__ */ b.jsx("kbd", { children: "N" }),
                  " to add a state, or drag from the palette."
                ] })
              ] }) : /* @__PURE__ */ b.jsxs(
                PT,
                {
                  nodes: Y,
                  edges: j,
                  onNodesChange: R,
                  onEdgesChange: B,
                  onNodeDragStop: K,
                  onMoveEnd: D,
                  nodeTypes: fj,
                  edgeTypes: hj,
                  defaultViewport: { x: 50, y: 50, zoom: y },
                  fitView: !0,
                  fitViewOptions: { padding: 0.2 },
                  proOptions: { hideAttribution: !0 },
                  nodesDraggable: !x,
                  nodesConnectable: !1,
                  elementsSelectable: !0,
                  selectNodesOnDrag: !1,
                  panOnDrag: !0,
                  zoomOnScroll: !0,
                  minZoom: 0.1,
                  maxZoom: 2,
                  className: "fub-flow-canvas",
                  children: [
                    /* @__PURE__ */ b.jsx("svg", { style: { position: "absolute", width: 0, height: 0 }, children: /* @__PURE__ */ b.jsxs("defs", { children: [
                      /* @__PURE__ */ b.jsx(
                        "marker",
                        {
                          id: "fub-arrow",
                          viewBox: "0 0 10 10",
                          refX: "10",
                          refY: "5",
                          markerWidth: "6",
                          markerHeight: "6",
                          orient: "auto-start-reverse",
                          children: /* @__PURE__ */ b.jsx(
                            "path",
                            {
                              d: "M 0 0 L 10 5 L 0 10 z",
                              fill: "var(--fub-edge-color, #4b5563)",
                              className: "fub-arrow-path"
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ b.jsx(
                        "marker",
                        {
                          id: "fub-arrow-selected",
                          viewBox: "0 0 10 10",
                          refX: "10",
                          refY: "5",
                          markerWidth: "6",
                          markerHeight: "6",
                          orient: "auto-start-reverse",
                          children: /* @__PURE__ */ b.jsx(
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
                    /* @__PURE__ */ b.jsx(
                      sD,
                      {
                        variant: si.Dots,
                        gap: 20,
                        size: 1,
                        color: "var(--fub-border)"
                      }
                    ),
                    /* @__PURE__ */ b.jsx(
                      gD,
                      {
                        showZoom: !0,
                        showFitView: !0,
                        showInteractive: !1,
                        className: "fub-flow-controls"
                      }
                    ),
                    /* @__PURE__ */ b.jsx(
                      TD,
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
function F0(t) {
  return /* @__PURE__ */ b.jsx(Ax, { children: /* @__PURE__ */ b.jsx(mj, { ...t }) });
}
function W0() {
  const t = be((d) => d.diagnostics), i = be((d) => d.focusDiagnostic), o = Dt((d) => d.log), r = Dt((d) => d.projectedOutcome), s = Dt((d) => d.blockedTransitions), u = Dt((d) => d.errors), c = Dt((d) => d.clear);
  return /* @__PURE__ */ b.jsxs(
    "section",
    {
      className: "fub-panel fub-console",
      "aria-label": "Console panel",
      role: "region",
      "aria-labelledby": "fub-panel-console-heading",
      id: "fub-panel-console",
      tabIndex: -1,
      children: [
        /* @__PURE__ */ b.jsxs("div", { className: "fub-panel-header", id: "fub-panel-console-heading", children: [
          /* @__PURE__ */ b.jsx("strong", { children: "Console" }),
          /* @__PURE__ */ b.jsxs("div", { className: "fub-inline-actions", children: [
            /* @__PURE__ */ b.jsx("span", { className: "fub-muted", children: "Problems + simulation output" }),
            /* @__PURE__ */ b.jsx(
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
        /* @__PURE__ */ b.jsxs("div", { className: "fub-console-grid", children: [
          /* @__PURE__ */ b.jsxs("section", { children: [
            /* @__PURE__ */ b.jsx("h3", { children: "Problems" }),
            /* @__PURE__ */ b.jsxs("ul", { children: [
              t.length === 0 ? /* @__PURE__ */ b.jsx("li", { className: "fub-muted", children: "No diagnostics." }) : null,
              t.map((d, m) => /* @__PURE__ */ b.jsx("li", { children: /* @__PURE__ */ b.jsxs(
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
                    /* @__PURE__ */ b.jsx("strong", { children: d.code }),
                    " ",
                    d.message
                  ]
                }
              ) }, `${d.code}-${d.path}-${m}`))
            ] })
          ] }),
          /* @__PURE__ */ b.jsxs("section", { children: [
            /* @__PURE__ */ b.jsx("h3", { children: "Simulation" }),
            r ? /* @__PURE__ */ b.jsxs("div", { className: "fub-console-card", "aria-label": "Projected outcome", children: [
              /* @__PURE__ */ b.jsx("strong", { children: "Projected outcome" }),
              /* @__PURE__ */ b.jsxs("div", { children: [
                "Event: ",
                /* @__PURE__ */ b.jsx("code", { children: r.event })
              ] }),
              r.selectedTransitionID ? /* @__PURE__ */ b.jsxs("div", { children: [
                "Transition: ",
                /* @__PURE__ */ b.jsx("code", { children: r.selectedTransitionID })
              ] }) : null,
              /* @__PURE__ */ b.jsxs("div", { children: [
                "State: ",
                /* @__PURE__ */ b.jsx("code", { children: r.previousState }),
                " -> ",
                /* @__PURE__ */ b.jsx("code", { children: r.currentState })
              ] }),
              /* @__PURE__ */ b.jsxs("div", { children: [
                "Status: ",
                /* @__PURE__ */ b.jsx("code", { children: r.status })
              ] })
            ] }) : /* @__PURE__ */ b.jsx("p", { className: "fub-muted", children: "No dry-run projected outcome yet." }),
            /* @__PURE__ */ b.jsxs("div", { className: "fub-console-card", "aria-label": "Blocked transitions", children: [
              /* @__PURE__ */ b.jsx("strong", { children: "Blocked transitions" }),
              s.length === 0 ? /* @__PURE__ */ b.jsx("p", { className: "fub-muted", children: "No blocked transitions in latest snapshot." }) : null,
              /* @__PURE__ */ b.jsx("ul", { children: s.map((d) => /* @__PURE__ */ b.jsxs("li", { children: [
                /* @__PURE__ */ b.jsxs("div", { children: [
                  /* @__PURE__ */ b.jsx("code", { children: d.id || "(transition)" }),
                  " event ",
                  /* @__PURE__ */ b.jsx("code", { children: d.event })
                ] }),
                /* @__PURE__ */ b.jsx("ul", { children: (d.rejections ?? []).map((m, p) => /* @__PURE__ */ b.jsxs("li", { children: [
                  /* @__PURE__ */ b.jsx("strong", { children: m.code }),
                  ": ",
                  m.message,
                  m.remediationHint ? ` (${m.remediationHint})` : ""
                ] }, `${d.id}-rejection-${p}`)) })
              ] }, d.id || d.event)) })
            ] }),
            /* @__PURE__ */ b.jsxs("div", { className: "fub-console-card", "aria-label": "Runtime and authoring errors", children: [
              /* @__PURE__ */ b.jsx("strong", { children: "Runtime/authoring errors" }),
              u.length === 0 ? /* @__PURE__ */ b.jsx("p", { className: "fub-muted", children: "No runtime/authoring errors." }) : null,
              /* @__PURE__ */ b.jsx("ul", { children: u.map((d) => /* @__PURE__ */ b.jsxs("li", { className: "fub-log-error", children: [
                "[",
                d.code,
                "] ",
                d.method ? `${d.method}: ` : "",
                d.message
              ] }, d.id)) })
            ] }),
            /* @__PURE__ */ b.jsxs("ul", { role: "log", "aria-live": "polite", "aria-label": "Simulation log", children: [
              o.length === 0 ? /* @__PURE__ */ b.jsx("li", { className: "fub-muted", children: "No simulation runs yet." }) : null,
              o.map((d) => /* @__PURE__ */ b.jsxs("li", { className: `fub-log-${d.level}`, children: [
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
function yo(t, i, o) {
  let r = o.initialDeps ?? [], s, u = !0;
  function c() {
    var d, m, p;
    let g;
    o.key && ((d = o.debug) != null && d.call(o)) && (g = Date.now());
    const y = t();
    if (!(y.length !== r.length || y.some((w, _) => r[_] !== w)))
      return s;
    r = y;
    let x;
    if (o.key && ((m = o.debug) != null && m.call(o)) && (x = Date.now()), s = i(...y), o.key && ((p = o.debug) != null && p.call(o))) {
      const w = Math.round((Date.now() - g) * 100) / 100, _ = Math.round((Date.now() - x) * 100) / 100, T = _ / 16, A = (O, N) => {
        for (O = String(O); O.length < N; )
          O = " " + O;
        return O;
      };
      console.info(
        `%c⏱ ${A(_, 5)} /${A(w, 5)} ms`,
        `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(
          0,
          Math.min(120 - 120 * T, 120)
        )}deg 100% 31%);`,
        o?.key
      );
    }
    return o?.onChange && !(u && o.skipInitialOnChange) && o.onChange(s), u = !1, s;
  }
  return c.updateDeps = (d) => {
    r = d;
  }, c;
}
function J0(t, i) {
  if (t === void 0)
    throw new Error("Unexpected undefined");
  return t;
}
const gj = (t, i) => Math.abs(t - i) < 1.01, pj = (t, i, o) => {
  let r;
  return function(...s) {
    t.clearTimeout(r), r = t.setTimeout(() => i.apply(this, s), o);
  };
}, P0 = (t) => {
  const { offsetWidth: i, offsetHeight: o } = t;
  return { width: i, height: o };
}, yj = (t) => t, vj = (t) => {
  const i = Math.max(t.startIndex - t.overscan, 0), o = Math.min(t.endIndex + t.overscan, t.count - 1), r = [];
  for (let s = i; s <= o; s++)
    r.push(s);
  return r;
}, bj = (t, i) => {
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
  if (s(P0(o)), !r.ResizeObserver)
    return () => {
    };
  const u = new r.ResizeObserver((c) => {
    const d = () => {
      const m = c[0];
      if (m?.borderBoxSize) {
        const p = m.borderBoxSize[0];
        if (p) {
          s({ width: p.inlineSize, height: p.blockSize });
          return;
        }
      }
      s(P0(o));
    };
    t.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(d) : d();
  });
  return u.observe(o, { box: "border-box" }), () => {
    u.unobserve(o);
  };
}, ev = {
  passive: !0
}, tv = typeof window > "u" ? !0 : "onscrollend" in window, xj = (t, i) => {
  const o = t.scrollElement;
  if (!o)
    return;
  const r = t.targetWindow;
  if (!r)
    return;
  let s = 0;
  const u = t.options.useScrollendEvent && tv ? () => {
  } : pj(
    r,
    () => {
      i(s, !1);
    },
    t.options.isScrollingResetDelay
  ), c = (g) => () => {
    const { horizontal: y, isRtl: v } = t.options;
    s = y ? o.scrollLeft * (v && -1 || 1) : o.scrollTop, u(), i(s, g);
  }, d = c(!0), m = c(!1);
  o.addEventListener("scroll", d, ev);
  const p = t.options.useScrollendEvent && tv;
  return p && o.addEventListener("scrollend", m, ev), () => {
    o.removeEventListener("scroll", d), p && o.removeEventListener("scrollend", m);
  };
}, wj = (t, i, o) => {
  if (i?.borderBoxSize) {
    const r = i.borderBoxSize[0];
    if (r)
      return Math.round(
        r[o.options.horizontal ? "inlineSize" : "blockSize"]
      );
  }
  return t[o.options.horizontal ? "offsetWidth" : "offsetHeight"];
}, Sj = (t, {
  adjustments: i = 0,
  behavior: o
}, r) => {
  var s, u;
  const c = t + i;
  (u = (s = r.scrollElement) == null ? void 0 : s.scrollTo) == null || u.call(s, {
    [r.options.horizontal ? "left" : "top"]: c,
    behavior: o
  });
};
class Ej {
  constructor(i) {
    this.unsubs = [], this.scrollElement = null, this.targetWindow = null, this.isScrolling = !1, this.scrollState = null, this.measurementsCache = [], this.itemSizeCache = /* @__PURE__ */ new Map(), this.laneAssignments = /* @__PURE__ */ new Map(), this.pendingMeasuredCacheIndexes = [], this.prevLanes = void 0, this.lanesChangedFlag = !1, this.lanesSettling = !1, this.scrollRect = null, this.scrollOffset = null, this.scrollDirection = null, this.scrollAdjustments = 0, this.elementsCache = /* @__PURE__ */ new Map(), this.now = () => {
      var o, r, s;
      return ((s = (r = (o = this.targetWindow) == null ? void 0 : o.performance) == null ? void 0 : r.now) == null ? void 0 : s.call(r)) ?? Date.now();
    }, this.observer = /* @__PURE__ */ (() => {
      let o = null;
      const r = () => o || (!this.targetWindow || !this.targetWindow.ResizeObserver ? null : o = new this.targetWindow.ResizeObserver((s) => {
        s.forEach((u) => {
          const c = () => {
            this._measureElement(u.target, u);
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
      Object.entries(o).forEach(([r, s]) => {
        typeof s > "u" && delete o[r];
      }), this.options = {
        debug: !1,
        initialOffset: 0,
        overscan: 1,
        paddingStart: 0,
        paddingEnd: 0,
        scrollPaddingStart: 0,
        scrollPaddingEnd: 0,
        horizontal: !1,
        getItemKey: yj,
        rangeExtractor: vj,
        onChange: () => {
        },
        measureElement: wj,
        initialRect: { width: 0, height: 0 },
        scrollMargin: 0,
        gap: 0,
        indexAttribute: "data-index",
        initialMeasurementsCache: [],
        lanes: 1,
        isScrollingResetDelay: 150,
        enabled: !0,
        isRtl: !1,
        useScrollendEvent: !1,
        useAnimationFrameWithResizeObserver: !1,
        ...o
      };
    }, this.notify = (o) => {
      var r, s;
      (s = (r = this.options).onChange) == null || s.call(r, this, o);
    }, this.maybeNotify = yo(
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
      this.unsubs.filter(Boolean).forEach((o) => o()), this.unsubs = [], this.observer.disconnect(), this.rafId != null && this.targetWindow && (this.targetWindow.cancelAnimationFrame(this.rafId), this.rafId = null), this.scrollState = null, this.scrollElement = null, this.targetWindow = null;
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
        this.scrollElement = r, this.scrollElement && "ownerDocument" in this.scrollElement ? this.targetWindow = this.scrollElement.ownerDocument.defaultView : this.targetWindow = ((o = this.scrollElement) == null ? void 0 : o.window) ?? null, this.elementsCache.forEach((s) => {
          this.observer.observe(s);
        }), this.unsubs.push(
          this.options.observeElementRect(this, (s) => {
            this.scrollRect = s, this.maybeNotify();
          })
        ), this.unsubs.push(
          this.options.observeElementOffset(this, (s, u) => {
            this.scrollAdjustments = 0, this.scrollDirection = u ? this.getScrollOffset() < s ? "forward" : "backward" : null, this.scrollOffset = s, this.isScrolling = u, this.scrollState && this.scheduleScrollReconcile(), this.maybeNotify();
          })
        ), this._scrollToOffset(this.getScrollOffset(), {
          adjustments: void 0,
          behavior: void 0
        });
      }
    }, this.rafId = null, this.getSize = () => this.options.enabled ? (this.scrollRect = this.scrollRect ?? this.options.initialRect, this.scrollRect[this.options.horizontal ? "width" : "height"]) : (this.scrollRect = null, 0), this.getScrollOffset = () => this.options.enabled ? (this.scrollOffset = this.scrollOffset ?? (typeof this.options.initialOffset == "function" ? this.options.initialOffset() : this.options.initialOffset), this.scrollOffset) : (this.scrollOffset = null, 0), this.getFurthestMeasurement = (o, r) => {
      const s = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map();
      for (let c = r - 1; c >= 0; c--) {
        const d = o[c];
        if (s.has(d.lane))
          continue;
        const m = u.get(
          d.lane
        );
        if (m == null || d.end > m.end ? u.set(d.lane, d) : d.end < m.end && s.set(d.lane, !0), s.size === this.options.lanes)
          break;
      }
      return u.size === this.options.lanes ? Array.from(u.values()).sort((c, d) => c.end === d.end ? c.index - d.index : c.end - d.end)[0] : void 0;
    }, this.getMeasurementOptions = yo(
      () => [
        this.options.count,
        this.options.paddingStart,
        this.options.scrollMargin,
        this.options.getItemKey,
        this.options.enabled,
        this.options.lanes
      ],
      (o, r, s, u, c, d) => (this.prevLanes !== void 0 && this.prevLanes !== d && (this.lanesChangedFlag = !0), this.prevLanes = d, this.pendingMeasuredCacheIndexes = [], {
        count: o,
        paddingStart: r,
        scrollMargin: s,
        getItemKey: u,
        enabled: c,
        lanes: d
      }),
      {
        key: !1
      }
    ), this.getMeasurements = yo(
      () => [this.getMeasurementOptions(), this.itemSizeCache],
      ({ count: o, paddingStart: r, scrollMargin: s, getItemKey: u, enabled: c, lanes: d }, m) => {
        if (!c)
          return this.measurementsCache = [], this.itemSizeCache.clear(), this.laneAssignments.clear(), [];
        if (this.laneAssignments.size > o)
          for (const v of this.laneAssignments.keys())
            v >= o && this.laneAssignments.delete(v);
        this.lanesChangedFlag && (this.lanesChangedFlag = !1, this.lanesSettling = !0, this.measurementsCache = [], this.itemSizeCache.clear(), this.laneAssignments.clear(), this.pendingMeasuredCacheIndexes = []), this.measurementsCache.length === 0 && !this.lanesSettling && (this.measurementsCache = this.options.initialMeasurementsCache, this.measurementsCache.forEach((v) => {
          this.itemSizeCache.set(v.key, v.size);
        }));
        const p = this.lanesSettling ? 0 : this.pendingMeasuredCacheIndexes.length > 0 ? Math.min(...this.pendingMeasuredCacheIndexes) : 0;
        this.pendingMeasuredCacheIndexes = [], this.lanesSettling && this.measurementsCache.length === o && (this.lanesSettling = !1);
        const g = this.measurementsCache.slice(0, p), y = new Array(d).fill(
          void 0
        );
        for (let v = 0; v < p; v++) {
          const x = g[v];
          x && (y[x.lane] = v);
        }
        for (let v = p; v < o; v++) {
          const x = u(v), w = this.laneAssignments.get(v);
          let _, T;
          if (w !== void 0 && this.options.lanes > 1) {
            _ = w;
            const C = y[_], I = C !== void 0 ? g[C] : void 0;
            T = I ? I.end + this.options.gap : r + s;
          } else {
            const C = this.options.lanes === 1 ? g[v - 1] : this.getFurthestMeasurement(g, v);
            T = C ? C.end + this.options.gap : r + s, _ = C ? C.lane : v % this.options.lanes, this.options.lanes > 1 && this.laneAssignments.set(v, _);
          }
          const A = m.get(x), O = typeof A == "number" ? A : this.options.estimateSize(v), N = T + O;
          g[v] = {
            index: v,
            start: T,
            size: O,
            end: N,
            key: x,
            lane: _
          }, y[_] = v;
        }
        return this.measurementsCache = g, g;
      },
      {
        key: !1,
        debug: () => this.options.debug
      }
    ), this.calculateRange = yo(
      () => [
        this.getMeasurements(),
        this.getSize(),
        this.getScrollOffset(),
        this.options.lanes
      ],
      (o, r, s, u) => this.range = o.length > 0 && r > 0 ? _j({
        measurements: o,
        outerSize: r,
        scrollOffset: s,
        lanes: u
      }) : null,
      {
        key: !1,
        debug: () => this.options.debug
      }
    ), this.getVirtualIndexes = yo(
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
    }, this._measureElement = (o, r) => {
      if (!o.isConnected) {
        this.observer.unobserve(o);
        return;
      }
      const s = this.indexFromElement(o), u = this.measurementsCache[s];
      if (!u)
        return;
      const c = u.key, d = this.elementsCache.get(c);
      d !== o && (d && this.observer.unobserve(d), this.observer.observe(o), this.elementsCache.set(c, o)), this.shouldMeasureDuringScroll(s) && this.resizeItem(s, this.options.measureElement(o, r, this));
    }, this.resizeItem = (o, r) => {
      var s;
      const u = this.measurementsCache[o];
      if (!u)
        return;
      const c = this.itemSizeCache.get(u.key) ?? u.size, d = r - c;
      d !== 0 && (((s = this.scrollState) == null ? void 0 : s.behavior) !== "smooth" && (this.shouldAdjustScrollPositionOnItemSizeChange !== void 0 ? this.shouldAdjustScrollPositionOnItemSizeChange(u, d, this) : u.start < this.getScrollOffset() + this.scrollAdjustments) && this._scrollToOffset(this.getScrollOffset(), {
        adjustments: this.scrollAdjustments += d,
        behavior: void 0
      }), this.pendingMeasuredCacheIndexes.push(u.index), this.itemSizeCache = new Map(this.itemSizeCache.set(u.key, r)), this.notify(!1));
    }, this.measureElement = (o) => {
      if (!o) {
        this.elementsCache.forEach((r, s) => {
          r.isConnected || (this.observer.unobserve(r), this.elementsCache.delete(s));
        });
        return;
      }
      this._measureElement(o, void 0);
    }, this.getVirtualItems = yo(
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
      if (r.length !== 0)
        return J0(
          r[Ix(
            0,
            r.length - 1,
            (s) => J0(r[s]).start,
            o
          )]
        );
    }, this.getMaxScrollOffset = () => {
      if (!this.scrollElement) return 0;
      if ("scrollHeight" in this.scrollElement)
        return this.options.horizontal ? this.scrollElement.scrollWidth - this.scrollElement.clientWidth : this.scrollElement.scrollHeight - this.scrollElement.clientHeight;
      {
        const o = this.scrollElement.document.documentElement;
        return this.options.horizontal ? o.scrollWidth - this.scrollElement.innerWidth : o.scrollHeight - this.scrollElement.innerHeight;
      }
    }, this.getOffsetForAlignment = (o, r, s = 0) => {
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
      o = Math.max(0, Math.min(o, this.options.count - 1));
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
    }, this.getTotalSize = () => {
      var o;
      const r = this.getMeasurements();
      let s;
      if (r.length === 0)
        s = this.options.paddingStart;
      else if (this.options.lanes === 1)
        s = ((o = r[r.length - 1]) == null ? void 0 : o.end) ?? 0;
      else {
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
    }, this._scrollToOffset = (o, {
      adjustments: r,
      behavior: s
    }) => {
      this.options.scrollToFn(o, { behavior: s, adjustments: r }, this);
    }, this.measure = () => {
      this.itemSizeCache = /* @__PURE__ */ new Map(), this.laneAssignments = /* @__PURE__ */ new Map(), this.notify(!1);
    }, this.setOptions(i);
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
    if (!c && gj(s, this.getScrollOffset())) {
      if (this.scrollState.stableFrames++, this.scrollState.stableFrames >= u) {
        this.scrollState = null;
        return;
      }
    } else
      this.scrollState.stableFrames = 0, c && (this.scrollState.lastTargetOffset = s, this.scrollState.behavior = "auto", this._scrollToOffset(s, {
        adjustments: void 0,
        behavior: "auto"
      }));
    this.scheduleScrollReconcile();
  }
}
const Ix = (t, i, o, r) => {
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
function _j({
  measurements: t,
  outerSize: i,
  scrollOffset: o,
  lanes: r
}) {
  const s = t.length - 1, u = (m) => t[m].start;
  if (t.length <= r)
    return {
      startIndex: 0,
      endIndex: s
    };
  let c = Ix(
    0,
    s,
    u,
    o
  ), d = c;
  if (r === 1)
    for (; d < s && t[d].end < o + i; )
      d++;
  else if (r > 1) {
    const m = Array(r).fill(0);
    for (; d < s && m.some((g) => g < o + i); ) {
      const g = t[d];
      m[g.lane] = g.end, d++;
    }
    const p = Array(r).fill(o + i);
    for (; c >= 0 && p.some((g) => g >= o); ) {
      const g = t[c];
      p[g.lane] = g.start, c--;
    }
    c = Math.max(0, c - c % r), d = Math.min(s, d + (r - 1 - d % r));
  }
  return { startIndex: c, endIndex: d };
}
const nv = typeof document < "u" ? X.useLayoutEffect : X.useEffect;
function Nj({
  useFlushSync: t = !0,
  ...i
}) {
  const o = X.useReducer(() => ({}), {})[1], r = {
    ...i,
    onChange: (u, c) => {
      var d;
      t && c ? Pb.flushSync(o) : o(), (d = i.onChange) == null || d.call(i, u, c);
    }
  }, [s] = X.useState(
    () => new Ej(r)
  );
  return s.setOptions(r), nv(() => s._didMount(), []), nv(() => s._willUpdate()), s;
}
function iv(t) {
  return Nj({
    observeElementRect: bj,
    observeElementOffset: xj,
    scrollToFn: Sj,
    ...t
  });
}
function Cj() {
  return /* @__PURE__ */ b.jsx(
    "svg",
    {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      "aria-hidden": "true",
      children: /* @__PURE__ */ b.jsx("path", { d: "M8 5v14l11-7z" })
    }
  );
}
function Mj() {
  return /* @__PURE__ */ b.jsx(
    "svg",
    {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      "aria-hidden": "true",
      children: /* @__PURE__ */ b.jsx("rect", { x: "6", y: "6", width: "12", height: "12", rx: "1" })
    }
  );
}
function Tj() {
  return /* @__PURE__ */ b.jsx(
    "svg",
    {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      "aria-hidden": "true",
      children: /* @__PURE__ */ b.jsx("circle", { cx: "12", cy: "12", r: "6" })
    }
  );
}
function Dj() {
  return /* @__PURE__ */ b.jsxs(
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
        /* @__PURE__ */ b.jsx("rect", { x: "2", y: "4", width: "20", height: "16", rx: "2" }),
        /* @__PURE__ */ b.jsx("path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" })
      ]
    }
  );
}
function jj() {
  return /* @__PURE__ */ b.jsx(
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
      children: /* @__PURE__ */ b.jsx("path", { d: "M13 2 3 14h9l-1 8 10-12h-9l1-8z" })
    }
  );
}
function Aj() {
  return /* @__PURE__ */ b.jsxs(
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
        /* @__PURE__ */ b.jsx("path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" }),
        /* @__PURE__ */ b.jsx("path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" })
      ]
    }
  );
}
function Oj() {
  return /* @__PURE__ */ b.jsxs(
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
        /* @__PURE__ */ b.jsx("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ b.jsx("polyline", { points: "12 6 12 12 16 14" })
      ]
    }
  );
}
function zj() {
  return /* @__PURE__ */ b.jsxs(
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
        /* @__PURE__ */ b.jsx("path", { d: "M16 3h5v5" }),
        /* @__PURE__ */ b.jsx("path", { d: "M8 3H3v5" }),
        /* @__PURE__ */ b.jsx("path", { d: "M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3" }),
        /* @__PURE__ */ b.jsx("path", { d: "m15 9 6-6" })
      ]
    }
  );
}
function Rj() {
  return /* @__PURE__ */ b.jsxs(
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
        /* @__PURE__ */ b.jsx("circle", { cx: "11", cy: "11", r: "8" }),
        /* @__PURE__ */ b.jsx("path", { d: "m21 21-4.3-4.3" })
      ]
    }
  );
}
const av = [
  // States
  {
    id: "initial-state",
    type: "state",
    nodeKind: "stateNode",
    label: "Start",
    description: "Initial state - entry point of the machine",
    icon: /* @__PURE__ */ b.jsx(Cj, {}),
    defaults: { initial: !0 }
  },
  {
    id: "regular-state",
    type: "state",
    nodeKind: "stateNode",
    label: "State",
    description: "Regular state - intermediate step",
    icon: /* @__PURE__ */ b.jsx(Tj, {})
  },
  {
    id: "terminal-state",
    type: "state",
    nodeKind: "stateNode",
    label: "End",
    description: "Terminal state - final state of the machine",
    icon: /* @__PURE__ */ b.jsx(Mj, {}),
    defaults: { terminal: !0 }
  },
  // Actions (for workflow nodes)
  {
    id: "email-action",
    type: "action",
    nodeKind: "step",
    label: "Email",
    description: "Send an email notification",
    icon: /* @__PURE__ */ b.jsx(Dj, {})
  },
  {
    id: "event-action",
    type: "action",
    nodeKind: "step",
    label: "Event",
    description: "Emit or handle an event",
    icon: /* @__PURE__ */ b.jsx(jj, {})
  },
  {
    id: "api-action",
    type: "action",
    nodeKind: "step",
    label: "API",
    description: "Make an API call",
    icon: /* @__PURE__ */ b.jsx(Aj, {})
  },
  // Logic
  {
    id: "delay-logic",
    type: "logic",
    nodeKind: "step",
    label: "Delay",
    description: "Wait for a specified duration",
    icon: /* @__PURE__ */ b.jsx(Oj, {})
  },
  {
    id: "condition-logic",
    type: "logic",
    nodeKind: "when",
    label: "If/Else",
    description: "Conditional branching logic",
    icon: /* @__PURE__ */ b.jsx(zj, {})
  }
], kj = {
  state: "States",
  action: "Actions",
  logic: "Logic"
};
function Hj({
  item: t,
  readOnly: i,
  onDragStart: o
}) {
  const [r, s] = X.useState(!1), [u, c] = X.useState(!1), d = X.useCallback(
    (g) => {
      if (i) {
        g.preventDefault();
        return;
      }
      const y = JSON.stringify({
        id: t.id,
        type: t.type,
        nodeKind: t.nodeKind,
        label: t.label,
        defaults: t.defaults
      });
      g.dataTransfer.setData("application/reactflow", y), g.dataTransfer.setData("text/plain", t.label), g.dataTransfer.effectAllowed = "move", s(!0), o?.(t);
    },
    [t, i, o]
  ), m = X.useCallback(() => {
    s(!1);
  }, []), p = () => t.defaults?.initial ? "fub-palette-item--initial" : t.defaults?.terminal ? "fub-palette-item--terminal" : t.type === "state" ? "fub-palette-item--state" : t.type === "action" ? "fub-palette-item--action" : t.type === "logic" ? "fub-palette-item--logic" : "";
  return /* @__PURE__ */ b.jsxs(
    "div",
    {
      className: `fub-palette-item ${p()}${r ? " fub-palette-item--dragging" : ""}${i ? " fub-palette-item--disabled" : ""}`,
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
        /* @__PURE__ */ b.jsx("div", { className: "fub-palette-item-icon", children: t.icon }),
        /* @__PURE__ */ b.jsx("span", { className: "fub-palette-item-label", children: t.label }),
        u && /* @__PURE__ */ b.jsx("div", { className: "fub-palette-tooltip", role: "tooltip", children: t.description })
      ]
    }
  );
}
function Lj(t) {
  const [i, o] = X.useState(""), [r, s] = X.useState(/* @__PURE__ */ new Set()), u = !!t.readOnly, c = X.useMemo(() => {
    if (!i.trim())
      return av;
    const v = i.toLowerCase();
    return av.filter(
      (x) => x.label.toLowerCase().includes(v) || x.description.toLowerCase().includes(v)
    );
  }, [i]), d = X.useMemo(() => {
    const v = {};
    for (const x of c)
      v[x.type] || (v[x.type] = []), v[x.type].push(x);
    return v;
  }, [c]), m = X.useCallback((v) => {
    s((x) => {
      const w = new Set(x);
      return w.has(v) ? w.delete(v) : w.add(v), w;
    });
  }, []), p = X.useCallback((v) => {
    o(v.target.value);
  }, []), g = X.useCallback(() => {
    o("");
  }, []), y = Object.keys(d);
  return /* @__PURE__ */ b.jsxs(
    "section",
    {
      className: "fub-palette",
      "aria-label": "Node palette",
      role: "region",
      children: [
        /* @__PURE__ */ b.jsxs("div", { className: "fub-palette-search", children: [
          /* @__PURE__ */ b.jsx("div", { className: "fub-palette-search-icon", children: /* @__PURE__ */ b.jsx(Rj, {}) }),
          /* @__PURE__ */ b.jsx(
            "input",
            {
              type: "text",
              className: "fub-palette-search-input",
              placeholder: "Search nodes...",
              value: i,
              onChange: p,
              "aria-label": "Search nodes",
              disabled: u
            }
          ),
          i && /* @__PURE__ */ b.jsx(
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
        /* @__PURE__ */ b.jsxs("div", { className: "fub-palette-categories", children: [
          y.length === 0 && /* @__PURE__ */ b.jsx("div", { className: "fub-palette-empty", children: /* @__PURE__ */ b.jsx("p", { children: "No nodes match your search." }) }),
          y.map((v) => {
            const x = d[v], w = r.has(v), _ = kj[v] || v;
            return /* @__PURE__ */ b.jsxs("div", { className: "fub-palette-category", children: [
              /* @__PURE__ */ b.jsxs(
                "button",
                {
                  type: "button",
                  className: "fub-palette-category-header",
                  onClick: () => m(v),
                  "aria-expanded": !w,
                  "aria-controls": `fub-palette-category-${v}`,
                  children: [
                    /* @__PURE__ */ b.jsx("span", { className: `fub-palette-chevron${w ? " fub-palette-chevron--collapsed" : ""}`, children: /* @__PURE__ */ b.jsx(
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
                        children: /* @__PURE__ */ b.jsx("path", { d: "m6 9 6 6 6-6" })
                      }
                    ) }),
                    /* @__PURE__ */ b.jsx("span", { className: "fub-palette-category-label", children: _ }),
                    /* @__PURE__ */ b.jsx("span", { className: "fub-palette-category-count", children: x.length })
                  ]
                }
              ),
              !w && /* @__PURE__ */ b.jsx(
                "div",
                {
                  id: `fub-palette-category-${v}`,
                  className: "fub-palette-items",
                  role: "group",
                  "aria-label": _,
                  children: x.map((T) => /* @__PURE__ */ b.jsx(
                    Hj,
                    {
                      item: T,
                      readOnly: u,
                      onDragStart: t.onDragStart
                    },
                    T.id
                  ))
                }
              )
            ] }, v);
          })
        ] }),
        !u && /* @__PURE__ */ b.jsx("div", { className: "fub-palette-help", children: /* @__PURE__ */ b.jsx("p", { children: "Drag items onto the canvas to add them." }) })
      ]
    }
  );
}
const ov = 80, eu = 52, rv = 8, lv = 12, Bj = {
  state: /* @__PURE__ */ new Map(),
  transition: /* @__PURE__ */ new Map()
};
function Vx(t, i) {
  const o = Bj[t];
  o.set(i, (o.get(i) ?? 0) + 1);
}
function Ux(t) {
  return t ? " is-selected" : "";
}
function Ij(t, i) {
  return t.kind === "state" && t.stateIndex === i;
}
function Vj(t, i) {
  return t.kind === "transition" || t.kind === "workflow-node" ? t.transitionIndex === i : !1;
}
const Uj = X.memo(function(i) {
  return Vx("state", i.stateIndex), /* @__PURE__ */ b.jsxs(
    "button",
    {
      type: "button",
      ref: (o) => i.setButtonRef(i.stateIndex, o),
      className: `fub-list-item${Ux(i.selected)}${i.dropTarget ? " fub-list-item--drop-target" : ""}`,
      onClick: () => i.onSelect(i.stateIndex),
      onKeyDown: (o) => {
        (o.key === "ArrowDown" || o.key === "ArrowUp" || o.key === "Home" || o.key === "End") && o.preventDefault(), i.onNavigate(i.stateIndex, o.key);
      },
      "aria-label": i.state.name || "(unnamed)",
      children: [
        /* @__PURE__ */ b.jsx("span", { className: "fub-item-main", children: i.state.name || "(unnamed)" }),
        /* @__PURE__ */ b.jsxs("span", { className: "fub-item-meta", children: [
          i.state.initial ? "initial" : "",
          i.state.terminal ? " final" : ""
        ] })
      ]
    }
  );
}), Yj = X.memo(function(i) {
  return Vx("transition", i.transitionIndex), /* @__PURE__ */ b.jsxs(
    "button",
    {
      type: "button",
      ref: (o) => i.setButtonRef(i.transitionIndex, o),
      className: `fub-list-item${Ux(i.selected)}${i.dropTarget ? " fub-list-item--drop-target" : ""}`,
      onClick: () => i.onSelect(i.transitionIndex),
      onKeyDown: (o) => {
        (o.key === "ArrowDown" || o.key === "ArrowUp" || o.key === "Home" || o.key === "End") && o.preventDefault(), i.onNavigate(i.transitionIndex, o.key);
      },
      "aria-label": yy(i.transition),
      children: [
        /* @__PURE__ */ b.jsx("span", { className: "fub-item-main", children: i.transition.id || `transition-${i.transitionIndex + 1}` }),
        /* @__PURE__ */ b.jsx("span", { className: "fub-item-meta", children: yy(i.transition) })
      ]
    }
  );
});
function qj() {
  return /* @__PURE__ */ b.jsxs(
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
        /* @__PURE__ */ b.jsx("rect", { x: "3", y: "3", width: "7", height: "7", rx: "1" }),
        /* @__PURE__ */ b.jsx("rect", { x: "14", y: "3", width: "7", height: "7", rx: "1" }),
        /* @__PURE__ */ b.jsx("rect", { x: "3", y: "14", width: "7", height: "7", rx: "1" }),
        /* @__PURE__ */ b.jsx("rect", { x: "14", y: "14", width: "7", height: "7", rx: "1" })
      ]
    }
  );
}
function $j() {
  return /* @__PURE__ */ b.jsxs(
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
        /* @__PURE__ */ b.jsx("path", { d: "M3 6h18" }),
        /* @__PURE__ */ b.jsx("path", { d: "M3 12h18" }),
        /* @__PURE__ */ b.jsx("path", { d: "M3 18h18" })
      ]
    }
  );
}
function sv(t, i) {
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
function uv(t) {
  const [i, o] = X.useState("tree"), [r, s] = X.useState(null), [u, c] = X.useState(null), [d, m] = X.useState(null), [p, g] = X.useState(null), y = be((Z) => Z.document.definition.states), v = be((Z) => Z.document.definition.transitions), x = be((Z) => Z.selection), w = be((Z) => Z.setSelection), _ = be((Z) => Z.addState), T = be((Z) => Z.addTransition), A = be((Z) => Z.moveState), O = be((Z) => Z.moveTransition), N = !!t.readOnly, C = X.useRef(/* @__PURE__ */ new Map()), I = X.useRef(/* @__PURE__ */ new Map()), L = X.useRef(null), k = X.useRef(null), q = y.length >= ov, te = v.length >= ov, F = iv({
    count: y.length,
    getScrollElement: () => L.current,
    estimateSize: () => eu,
    overscan: rv,
    initialRect: { width: 320, height: 320 },
    getItemKey: (Z) => `state-${Z}`
  }), Y = iv({
    count: v.length,
    getScrollElement: () => k.current,
    estimateSize: () => eu,
    overscan: rv,
    initialRect: { width: 320, height: 320 },
    getItemKey: (Z) => `transition-${Z}`
  }), Q = X.useCallback((Z) => {
    o(Z);
  }, []), W = X.useCallback(
    (Z) => {
      w({ kind: "state", stateIndex: Z });
    },
    [w]
  ), j = X.useCallback(
    (Z) => {
      w({ kind: "transition", transitionIndex: Z });
    },
    [w]
  ), $ = X.useCallback((Z, se) => {
    if (se) {
      C.current.set(Z, se);
      return;
    }
    C.current.delete(Z);
  }, []), M = X.useCallback((Z, se) => {
    if (se) {
      I.current.set(Z, se);
      return;
    }
    I.current.delete(Z);
  }, []), R = X.useCallback(
    (Z) => {
      Z < 0 || Z >= y.length || (w({ kind: "state", stateIndex: Z }), q && F.scrollToIndex(Z, { align: "auto" }), sv(C, Z));
    },
    [w, q, F, y.length]
  ), B = X.useCallback(
    (Z) => {
      Z < 0 || Z >= v.length || (w({ kind: "transition", transitionIndex: Z }), te && Y.scrollToIndex(Z, { align: "auto" }), sv(I, Z));
    },
    [w, te, Y, v.length]
  ), K = X.useCallback(
    (Z, se) => {
      if (se === "ArrowDown") {
        R(Math.min(y.length - 1, Z + 1));
        return;
      }
      if (se === "ArrowUp") {
        R(Math.max(0, Z - 1));
        return;
      }
      if (se === "Home") {
        R(0);
        return;
      }
      se === "End" && R(Math.max(0, y.length - 1));
    },
    [R, y.length]
  ), ee = X.useCallback(
    (Z, se) => {
      if (se === "ArrowDown") {
        B(Math.min(v.length - 1, Z + 1));
        return;
      }
      if (se === "ArrowUp") {
        B(Math.max(0, Z - 1));
        return;
      }
      if (se === "Home") {
        B(0);
        return;
      }
      se === "End" && B(Math.max(0, v.length - 1));
    },
    [B, v.length]
  ), D = X.useCallback(
    (Z) => {
      if (r === null || r === Z) {
        s(null), c(null);
        return;
      }
      A(r, Z), s(null), c(null);
    },
    [r, A]
  ), V = X.useCallback(
    (Z) => {
      if (d === null || d === Z) {
        m(null), g(null);
        return;
      }
      O(d, Z), m(null), g(null);
    },
    [d, O]
  ), ne = F.getVirtualItems(), H = Y.getVirtualItems(), E = q ? ne.length > 0 ? ne : Array.from({ length: Math.min(lv, y.length) }, (Z, se) => ({
    index: se,
    start: se * eu,
    key: `state-fallback-${se}`
  })) : [], U = te ? H.length > 0 ? H : Array.from({ length: Math.min(lv, v.length) }, (Z, se) => ({
    index: se,
    start: se * eu,
    key: `transition-fallback-${se}`
  })) : [], G = X.useCallback(
    (Z, se) => /* @__PURE__ */ b.jsx(
      "li",
      {
        style: se,
        draggable: !N,
        onDragStart: () => {
          N || s(Z);
        },
        onDragOver: (me) => {
          N || r === null || (me.preventDefault(), c(Z));
        },
        onDragLeave: () => {
          u === Z && c(null);
        },
        onDrop: (me) => {
          N || (me.preventDefault(), D(Z));
        },
        onDragEnd: () => {
          s(null), c(null);
        },
        children: /* @__PURE__ */ b.jsx(
          Uj,
          {
            stateIndex: Z,
            state: y[Z] ?? { name: "" },
            selected: Ij(x, Z),
            dropTarget: u === Z,
            setButtonRef: $,
            onSelect: W,
            onNavigate: K
          }
        )
      },
      `state-${Z}`
    ),
    [
      r,
      u,
      D,
      K,
      N,
      $,
      W,
      x,
      y
    ]
  ), J = X.useCallback(
    (Z, se) => {
      const me = v[Z];
      return me ? /* @__PURE__ */ b.jsx(
        "li",
        {
          style: se,
          draggable: !N,
          onDragStart: () => {
            N || m(Z);
          },
          onDragOver: (ge) => {
            N || d === null || (ge.preventDefault(), g(Z));
          },
          onDragLeave: () => {
            p === Z && g(null);
          },
          onDrop: (ge) => {
            N || (ge.preventDefault(), V(Z));
          },
          onDragEnd: () => {
            m(null), g(null);
          },
          children: /* @__PURE__ */ b.jsx(
            Yj,
            {
              transitionIndex: Z,
              transition: me,
              selected: Vj(x, Z),
              dropTarget: p === Z,
              setButtonRef: M,
              onSelect: j,
              onNavigate: ee
            }
          )
        },
        `transition-${Z}`
      ) : null;
    },
    [
      d,
      p,
      V,
      ee,
      N,
      M,
      j,
      x,
      v
    ]
  );
  return /* @__PURE__ */ b.jsxs(
    "section",
    {
      className: "fub-panel fub-explorer",
      "aria-label": "Explorer panel",
      role: "region",
      "aria-labelledby": "fub-panel-explorer-heading",
      id: "fub-panel-explorer",
      tabIndex: -1,
      children: [
        /* @__PURE__ */ b.jsxs("div", { className: "fub-panel-header", id: "fub-panel-explorer-heading", children: [
          /* @__PURE__ */ b.jsx("strong", { children: "Explorer" }),
          /* @__PURE__ */ b.jsx("div", { className: "fub-inline-actions", children: /* @__PURE__ */ b.jsxs("div", { className: "fub-view-toggle", role: "tablist", "aria-label": "Explorer view", children: [
            /* @__PURE__ */ b.jsx(
              "button",
              {
                type: "button",
                role: "tab",
                className: `fub-view-toggle-btn${i === "palette" ? " is-active" : ""}`,
                onClick: () => Q("palette"),
                "aria-selected": i === "palette",
                "aria-controls": "fub-explorer-palette",
                title: "Node Palette",
                children: /* @__PURE__ */ b.jsx(qj, {})
              }
            ),
            /* @__PURE__ */ b.jsx(
              "button",
              {
                type: "button",
                role: "tab",
                className: `fub-view-toggle-btn${i === "tree" ? " is-active" : ""}`,
                onClick: () => Q("tree"),
                "aria-selected": i === "tree",
                "aria-controls": "fub-explorer-tree",
                title: "Tree View",
                children: /* @__PURE__ */ b.jsx($j, {})
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ b.jsx("div", { className: "fub-panel-body", children: i === "palette" ? /* @__PURE__ */ b.jsx("div", { id: "fub-explorer-palette", children: /* @__PURE__ */ b.jsx(Lj, { readOnly: N }) }) : /* @__PURE__ */ b.jsxs("div", { id: "fub-explorer-tree", children: [
          /* @__PURE__ */ b.jsxs("div", { className: "fub-tree-actions", children: [
            /* @__PURE__ */ b.jsx("button", { type: "button", className: "fub-mini-btn", onClick: _, disabled: N, children: "+ State" }),
            /* @__PURE__ */ b.jsx("button", { type: "button", className: "fub-mini-btn", onClick: T, disabled: N, children: "+ Transition" })
          ] }),
          /* @__PURE__ */ b.jsxs("section", { className: "fub-section", children: [
            /* @__PURE__ */ b.jsx("h3", { children: "States" }),
            /* @__PURE__ */ b.jsx(
              "div",
              {
                className: "fub-explorer-list-scroll",
                ref: L,
                "aria-label": "States list",
                "data-virtualized": q ? "true" : "false",
                "data-testid": "fub-explorer-states-scroll",
                children: /* @__PURE__ */ b.jsx(
                  "ul",
                  {
                    className: "fub-explorer-list",
                    style: q ? {
                      height: `${F.getTotalSize()}px`,
                      position: "relative"
                    } : void 0,
                    children: q ? E.map(
                      (Z) => G(Z.index, {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        transform: `translateY(${Z.start}px)`
                      })
                    ) : y.map((Z, se) => G(se))
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ b.jsxs("section", { className: "fub-section", children: [
            /* @__PURE__ */ b.jsx("h3", { children: "Transitions" }),
            /* @__PURE__ */ b.jsx(
              "div",
              {
                className: "fub-explorer-list-scroll",
                ref: k,
                "aria-label": "Transitions list",
                "data-virtualized": te ? "true" : "false",
                "data-testid": "fub-explorer-transitions-scroll",
                children: /* @__PURE__ */ b.jsx(
                  "ul",
                  {
                    className: "fub-explorer-list",
                    style: te ? {
                      height: `${Y.getTotalSize()}px`,
                      position: "relative"
                    } : void 0,
                    children: te ? U.map(
                      (Z) => J(Z.index, {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        transform: `translateY(${Z.start}px)`
                      })
                    ) : v.map((Z, se) => J(se))
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
function Xj(t) {
  const [i, o] = X.useState(!1), r = X.useRef(null), s = X.useRef(null), u = X.useRef(null), [c, d] = X.useState(-1), m = X.useCallback(() => {
    o(!1), d(-1);
  }, []), p = X.useCallback(() => {
    t.disabled || (o(!0), d(0));
  }, [t.disabled]), g = X.useCallback(() => {
    i ? m() : p();
  }, [m, i, p]);
  X.useEffect(() => {
    if (!i)
      return;
    function x(w) {
      r.current && !r.current.contains(w.target) && m();
    }
    return document.addEventListener("mousedown", x), () => {
      document.removeEventListener("mousedown", x);
    };
  }, [m, i]);
  const y = X.useCallback(
    (x) => {
      if (!i) {
        (x.key === "Enter" || x.key === " " || x.key === "ArrowDown") && (x.preventDefault(), p());
        return;
      }
      const w = t.items.filter((T) => !T.disabled), _ = t.items.map((T, A) => ({ item: T, index: A })).filter(({ item: T }) => !T.disabled).map(({ index: T }) => T);
      switch (x.key) {
        case "Escape":
          x.preventDefault(), m(), u.current?.focus();
          break;
        case "ArrowDown":
          if (x.preventDefault(), w.length > 0) {
            const A = (_.indexOf(c) + 1) % _.length;
            d(_[A]);
          }
          break;
        case "ArrowUp":
          if (x.preventDefault(), w.length > 0) {
            const T = _.indexOf(c), A = T <= 0 ? _.length - 1 : T - 1;
            d(_[A]);
          }
          break;
        case "Enter":
        case " ":
          x.preventDefault(), c >= 0 && !t.items[c]?.disabled && (t.items[c]?.onClick(), m(), u.current?.focus());
          break;
        case "Tab":
          m();
          break;
        case "Home":
          x.preventDefault(), _.length > 0 && d(_[0]);
          break;
        case "End":
          x.preventDefault(), _.length > 0 && d(_[_.length - 1]);
          break;
      }
    },
    [m, c, i, p, t.items]
  ), v = X.useCallback(
    (x) => {
      x.disabled || (x.onClick(), m(), u.current?.focus());
    },
    [m]
  );
  return /* @__PURE__ */ b.jsxs("div", { className: "fub-dropdown", ref: r, children: [
    /* @__PURE__ */ b.jsx(
      "button",
      {
        ref: u,
        type: "button",
        className: "fub-dropdown-trigger",
        onClick: g,
        onKeyDown: y,
        "aria-haspopup": "menu",
        "aria-expanded": i,
        disabled: t.disabled,
        children: t.trigger
      }
    ),
    i && /* @__PURE__ */ b.jsx(
      "div",
      {
        ref: s,
        className: `fub-dropdown-menu ${t.align === "right" ? "fub-dropdown-menu--right" : ""}`,
        role: "menu",
        "aria-orientation": "vertical",
        onKeyDown: y,
        children: t.items.map((x, w) => /* @__PURE__ */ b.jsxs(
          "button",
          {
            type: "button",
            className: `fub-dropdown-item ${c === w ? "fub-dropdown-item--focused" : ""} ${x.disabled ? "fub-dropdown-item--disabled" : ""}`,
            role: "menuitem",
            tabIndex: c === w ? 0 : -1,
            disabled: x.disabled,
            onClick: () => v(x),
            onMouseEnter: () => !x.disabled && d(w),
            children: [
              x.icon && /* @__PURE__ */ b.jsx("span", { className: "fub-dropdown-item-icon", children: x.icon }),
              /* @__PURE__ */ b.jsx("span", { className: "fub-dropdown-item-label", children: x.label })
            ]
          },
          w
        ))
      }
    )
  ] });
}
function Gj() {
  return /* @__PURE__ */ b.jsx(
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
      children: /* @__PURE__ */ b.jsx("path", { d: "M3 4.5L6 7.5L9 4.5" })
    }
  );
}
function vo(t) {
  return /* @__PURE__ */ b.jsx(
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
function Zj() {
  return /* @__PURE__ */ b.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ b.jsx("path", { d: "M3 7h6a4 4 0 0 1 0 8H7" }),
    /* @__PURE__ */ b.jsx("path", { d: "M5 4L2 7l3 3" })
  ] });
}
function Kj() {
  return /* @__PURE__ */ b.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ b.jsx("path", { d: "M13 7H7a4 4 0 0 0 0 8h2" }),
    /* @__PURE__ */ b.jsx("path", { d: "M11 4l3 3-3 3" })
  ] });
}
function Qj() {
  return /* @__PURE__ */ b.jsx("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "currentColor", children: /* @__PURE__ */ b.jsx("path", { d: "M3 2.5v9l8-4.5-8-4.5z" }) });
}
function cv() {
  return /* @__PURE__ */ b.jsx("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ b.jsx("path", { d: "M7 2v7M4 6l3 3 3-3M2 11h10" }) });
}
function fv() {
  return /* @__PURE__ */ b.jsxs("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ b.jsx("path", { d: "M2 7a5 5 0 0 1 9-3M12 7a5 5 0 0 1-9 3" }),
    /* @__PURE__ */ b.jsx("path", { d: "M2 3v4h4M12 11V7H8" })
  ] });
}
function Fj() {
  return /* @__PURE__ */ b.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ b.jsx("rect", { x: "2", y: "3", width: "12", height: "10", rx: "1" }),
    /* @__PURE__ */ b.jsx("path", { d: "M6 3v10" })
  ] });
}
function Wj() {
  return /* @__PURE__ */ b.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ b.jsx("rect", { x: "2", y: "3", width: "12", height: "10", rx: "1" }),
    /* @__PURE__ */ b.jsx("path", { d: "M10 3v10" })
  ] });
}
function Jj() {
  return /* @__PURE__ */ b.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ b.jsx("rect", { x: "2", y: "3", width: "12", height: "10", rx: "1" }),
    /* @__PURE__ */ b.jsx("path", { d: "M5 7l2 2-2 2" }),
    /* @__PURE__ */ b.jsx("path", { d: "M9 11h2" })
  ] });
}
function Pj() {
  return /* @__PURE__ */ b.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ b.jsx("circle", { cx: "8", cy: "8", r: "3" }),
    /* @__PURE__ */ b.jsx("path", { d: "M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.4 1.4M11.55 11.55l1.4 1.4M3.05 12.95l1.4-1.4M11.55 4.45l1.4-1.4" })
  ] });
}
function eA() {
  return /* @__PURE__ */ b.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ b.jsx("path", { d: "M13.5 8.5a6 6 0 1 1-6-6c.3 0 .5.2.4.5-.3.8-.4 1.7-.4 2.5a5 5 0 0 0 5 5c.8 0 1.7-.1 2.5-.4.3-.1.5.1.5.4z" }) });
}
const tA = new Intl.DateTimeFormat(void 0, {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
});
function nA(t, i) {
  const o = t?.updatedAt && !Number.isNaN(Date.parse(t.updatedAt)) ? tA.format(new Date(t.updatedAt)) : void 0;
  return i ? t?.state === "saving" && t.source === "autosave" ? "Unsaved changes (autosaving...)" : t?.state === "saved" && t.source === "autosave" && o ? `Unsaved changes (autosaved ${o})` : t?.state === "error" && t.source === "autosave" ? `Unsaved changes (autosave failed: ${t.message ?? "internal error"})` : "Unsaved changes" : t?.state === "saving" ? "Saving..." : t?.state === "saved" && o ? `Saved ${o}` : t?.state === "error" ? `Save failed: ${t.message ?? "internal error"}` : "";
}
function dv(t) {
  const i = be((q) => q.document.definition.name), o = be((q) => q.isDirty), r = be((q) => q.diagnostics.length), s = be((q) => q.setMachineName), u = be((q) => q.undo), c = be((q) => q.redo), d = be((q) => q.historyIndex), m = be((q) => q.history.length), p = qe((q) => q.togglePanel), g = qe((q) => q.theme), y = qe((q) => q.toggleTheme), v = qe((q) => q.explorerCollapsed), x = qe((q) => q.inspectorCollapsed), w = qe((q) => q.consoleCollapsed), [_, T] = X.useState(null), A = nA(t.saveStatus, o), O = t.saveStatus?.state === "error" ? " fub-save-status-error" : t.saveStatus?.state === "saving" ? " fub-save-status-saving" : "", N = (q, te) => {
    if (!(!te || typeof te != "function"))
      try {
        const F = te();
        F instanceof Promise && (T(q), F.finally(() => {
          T((Y) => Y === q ? null : Y);
        }));
      } catch {
        T((F) => F === q ? null : F);
      }
  }, C = t.authoringAvailable ? "Save Draft" : "Save", I = !!t.readOnly, L = [
    {
      label: "Recover Draft",
      onClick: () => N("recover", t.onRecoverDraft),
      disabled: I || !t.recoveryAvailable || !!_,
      icon: /* @__PURE__ */ b.jsx(fv, {})
    },
    {
      label: "Version History",
      onClick: () => N("version-history", t.onOpenVersionHistory),
      disabled: !!_ || !t.versionHistoryEnabled,
      icon: /* @__PURE__ */ b.jsx(fv, {})
    },
    {
      label: "Export JSON",
      onClick: () => N("export-json", t.onExportJSON),
      disabled: !!_,
      icon: /* @__PURE__ */ b.jsx(cv, {})
    },
    {
      label: "Export RPC",
      onClick: () => N("export-rpc", t.onExportRPC),
      disabled: !!_ || !t.rpcExportAvailable,
      icon: /* @__PURE__ */ b.jsx(cv, {})
    }
  ], k = (q) => {
    t.onPanelToggle ? t.onPanelToggle(q) : p(q);
  };
  return /* @__PURE__ */ b.jsxs("header", { className: "fub-header", "aria-label": "Builder header", children: [
    /* @__PURE__ */ b.jsxs("div", { className: "fub-header-left", children: [
      /* @__PURE__ */ b.jsx("strong", { className: "fub-brand", children: "FSM Builder" }),
      /* @__PURE__ */ b.jsx("div", { className: "fub-header-separator", "aria-hidden": "true" }),
      /* @__PURE__ */ b.jsxs("label", { className: "fub-machine-name-label", children: [
        /* @__PURE__ */ b.jsx("span", { className: "fub-label", children: "Machine:" }),
        /* @__PURE__ */ b.jsx(
          "input",
          {
            "aria-label": "Machine name",
            className: "fub-input fub-machine-input",
            value: i,
            readOnly: I,
            onChange: (q) => s(q.target.value)
          }
        ),
        o ? /* @__PURE__ */ b.jsx("span", { "aria-label": "Unsaved changes", className: "fub-dirty-dot" }) : null
      ] }),
      /* @__PURE__ */ b.jsxs("span", { className: "fub-badge fub-problems-badge", "aria-live": "polite", children: [
        "Problems: ",
        r
      ] })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: "fub-header-center", role: "group", "aria-label": "Builder actions", children: [
      /* @__PURE__ */ b.jsxs("div", { className: "fub-btn-group", children: [
        /* @__PURE__ */ b.jsx(
          vo,
          {
            icon: /* @__PURE__ */ b.jsx(Zj, {}),
            onClick: u,
            disabled: I || d === 0 || !!_,
            ariaLabel: "Undo",
            title: "Undo (Ctrl+Z)"
          }
        ),
        /* @__PURE__ */ b.jsx(
          vo,
          {
            icon: /* @__PURE__ */ b.jsx(Kj, {}),
            onClick: c,
            disabled: I || d >= m - 1 || !!_,
            ariaLabel: "Redo",
            title: "Redo (Ctrl+Shift+Z)"
          }
        )
      ] }),
      /* @__PURE__ */ b.jsx("div", { className: "fub-header-separator", "aria-hidden": "true" }),
      /* @__PURE__ */ b.jsxs("div", { className: "fub-btn-group", children: [
        /* @__PURE__ */ b.jsx(
          "button",
          {
            type: "button",
            className: "fub-btn fub-btn-secondary",
            onClick: () => N("save", t.onSave),
            disabled: I || !!_,
            "aria-keyshortcuts": "Control+S Meta+S",
            children: _ === "save" ? "Saving..." : C
          }
        ),
        /* @__PURE__ */ b.jsx(
          "button",
          {
            type: "button",
            className: "fub-btn fub-btn-secondary",
            onClick: () => N("validate", t.onValidate),
            disabled: I || !!_,
            "aria-keyshortcuts": "Control+Enter Meta+Enter",
            children: _ === "validate" ? "Validating..." : "Validate"
          }
        )
      ] }),
      /* @__PURE__ */ b.jsx("div", { className: "fub-header-separator", "aria-hidden": "true" }),
      /* @__PURE__ */ b.jsx(
        Xj,
        {
          trigger: /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
            "More ",
            /* @__PURE__ */ b.jsx(Gj, {})
          ] }),
          items: L,
          disabled: !!_
        }
      ),
      /* @__PURE__ */ b.jsx("div", { className: "fub-header-separator", "aria-hidden": "true" }),
      /* @__PURE__ */ b.jsxs(
        "button",
        {
          type: "button",
          className: "fub-btn fub-btn-primary",
          onClick: () => N("simulate", t.onSimulate),
          disabled: !t.runtimeAvailable || !!_,
          title: t.runtimeAvailable ? "Run dry-run + snapshot" : "Runtime RPC unavailable",
          children: [
            /* @__PURE__ */ b.jsx(Qj, {}),
            _ === "simulate" ? "Running..." : "Simulate"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: "fub-header-right", role: "group", "aria-label": "View controls", children: [
      /* @__PURE__ */ b.jsxs("div", { className: "fub-btn-group", children: [
        /* @__PURE__ */ b.jsx(
          vo,
          {
            icon: /* @__PURE__ */ b.jsx(Fj, {}),
            onClick: () => k("explorer"),
            ariaLabel: v ? "Show Explorer" : "Hide Explorer",
            title: v ? "Show Explorer" : "Hide Explorer",
            className: v ? "" : "fub-icon-btn--active"
          }
        ),
        /* @__PURE__ */ b.jsx(
          vo,
          {
            icon: /* @__PURE__ */ b.jsx(Wj, {}),
            onClick: () => k("inspector"),
            ariaLabel: x ? "Show Inspector" : "Hide Inspector",
            title: x ? "Show Inspector" : "Hide Inspector",
            className: x ? "" : "fub-icon-btn--active"
          }
        ),
        /* @__PURE__ */ b.jsx(
          vo,
          {
            icon: /* @__PURE__ */ b.jsx(Jj, {}),
            onClick: () => k("console"),
            ariaLabel: w ? "Show Console" : "Hide Console",
            title: w ? "Show Console" : "Hide Console",
            className: w ? "" : "fub-icon-btn--active"
          }
        )
      ] }),
      /* @__PURE__ */ b.jsx("div", { className: "fub-header-separator", "aria-hidden": "true" }),
      /* @__PURE__ */ b.jsx(
        vo,
        {
          icon: g === "light" ? /* @__PURE__ */ b.jsx(eA, {}) : /* @__PURE__ */ b.jsx(Pj, {}),
          onClick: y,
          ariaLabel: g === "light" ? "Switch to dark theme" : "Switch to light theme",
          title: g === "light" ? "Switch to dark theme" : "Switch to light theme"
        }
      ),
      A && /* @__PURE__ */ b.jsx("span", { className: `fub-save-status${O}`, role: "status", "aria-live": "polite", children: A })
    ] })
  ] });
}
function An(t) {
  return t.messages.length === 0 ? null : /* @__PURE__ */ b.jsx("ul", { className: "fub-inline-diags", role: "alert", children: t.messages.map((i, o) => /* @__PURE__ */ b.jsx("li", { children: i }, `${i}-${o}`)) });
}
function li(t) {
  return t.map((i) => i.message);
}
function iA(t) {
  return t.dynamic_to ? "dynamic" : "static";
}
function Yx(t) {
  return t.kind === "step" ? `step:${t.step?.action_id || "(action_id)"}` : t.kind === "when" ? `when:${t.expr || "(expr)"}` : `${t.kind}: unsupported`;
}
function Xi(t) {
  return /* @__PURE__ */ b.jsxs(
    "section",
    {
      className: "fub-panel fub-inspector",
      "aria-label": "Inspector panel",
      role: "region",
      "aria-labelledby": "fub-panel-inspector-heading",
      id: "fub-panel-inspector",
      tabIndex: -1,
      children: [
        /* @__PURE__ */ b.jsxs("div", { className: "fub-panel-header", id: "fub-panel-inspector-heading", children: [
          /* @__PURE__ */ b.jsx("strong", { children: t.title }),
          t.actions ?? null
        ] }),
        /* @__PURE__ */ b.jsx("div", { className: "fub-panel-body", children: t.children })
      ]
    }
  );
}
function Th(t) {
  return t.readOnly ? /* @__PURE__ */ b.jsx("p", { className: "fub-readonly-note", children: "Read-only mode: editing is disabled in narrow/mobile layout." }) : null;
}
function aA(t) {
  if (!t.state)
    return /* @__PURE__ */ b.jsx(Xi, { title: "Inspector", children: /* @__PURE__ */ b.jsx("div", { children: "State not found." }) });
  const i = { kind: "state", stateIndex: t.stateIndex };
  return /* @__PURE__ */ b.jsxs(
    Xi,
    {
      title: "State",
      actions: /* @__PURE__ */ b.jsx(
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
        /* @__PURE__ */ b.jsx(Th, { readOnly: t.readOnly }),
        /* @__PURE__ */ b.jsxs("label", { className: "fub-field", children: [
          /* @__PURE__ */ b.jsx("span", { children: "Name" }),
          /* @__PURE__ */ b.jsx(
            "input",
            {
              "aria-label": "State name",
              className: "fub-input",
              value: t.state.name,
              readOnly: t.readOnly,
              onChange: (o) => t.updateStateName(t.stateIndex, o.target.value)
            }
          ),
          /* @__PURE__ */ b.jsx(
            An,
            {
              messages: li(uu(t.diagnostics, i, "name"))
            }
          )
        ] }),
        /* @__PURE__ */ b.jsxs("label", { className: "fub-checkbox-row", children: [
          /* @__PURE__ */ b.jsx(
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
        /* @__PURE__ */ b.jsxs("label", { className: "fub-checkbox-row", children: [
          /* @__PURE__ */ b.jsx(
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
        /* @__PURE__ */ b.jsx(An, { messages: li(t.selectionDiagnostics) })
      ]
    }
  );
}
function hv(t, i) {
  return t.id || `${t.kind}-${i}`;
}
function oA(t) {
  return t.nodes.length === 0 ? /* @__PURE__ */ b.jsx("p", { className: "fub-muted", children: "No workflow nodes. Add a Step or When node to begin." }) : /* @__PURE__ */ b.jsx("div", { className: "fub-workflow-graph", "aria-label": "Workflow visual editor", children: t.nodes.map((i, o) => /* @__PURE__ */ b.jsxs("div", { className: "fub-workflow-graph-node", children: [
    /* @__PURE__ */ b.jsxs(
      "button",
      {
        type: "button",
        className: "fub-list-item",
        onClick: () => t.onSelectNode(o),
        "aria-label": `Select workflow node ${i.id || i.kind}`,
        children: [
          /* @__PURE__ */ b.jsx("span", { className: "fub-item-main", children: Yx(i) }),
          ll(i.kind) ? null : /* @__PURE__ */ b.jsx("span", { className: "fub-item-meta", children: "read-only" })
        ]
      }
    ),
    /* @__PURE__ */ b.jsx("div", { className: "fub-workflow-graph-next", children: Array.isArray(i.next) && i.next.length > 0 ? i.next.map((r) => /* @__PURE__ */ b.jsxs("span", { className: "fub-workflow-graph-edge", children: [
      "->",
      " ",
      r
    ] }, `${hv(i, o)}-${r}`)) : /* @__PURE__ */ b.jsx("span", { className: "fub-muted", children: "No next links" }) })
  ] }, hv(i, o))) });
}
function rA(t, i) {
  return t.id || `${t.kind}-${i}`;
}
function lA(t) {
  if (!t.transition)
    return /* @__PURE__ */ b.jsx(Xi, { title: "Inspector", children: /* @__PURE__ */ b.jsx("div", { children: "Transition not found." }) });
  const i = { kind: "transition", transitionIndex: t.transitionIndex }, o = iA(t.transition);
  return /* @__PURE__ */ b.jsxs(
    Xi,
    {
      title: "Transition",
      actions: /* @__PURE__ */ b.jsx(
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
        /* @__PURE__ */ b.jsx(Th, { readOnly: t.readOnly }),
        /* @__PURE__ */ b.jsxs("label", { className: "fub-field", children: [
          /* @__PURE__ */ b.jsx("span", { children: "Event" }),
          /* @__PURE__ */ b.jsx(
            "input",
            {
              "aria-label": "Transition event",
              className: "fub-input",
              value: t.transition.event,
              readOnly: t.readOnly,
              onChange: (r) => t.updateTransition(t.transitionIndex, "event", r.target.value)
            }
          ),
          /* @__PURE__ */ b.jsx(An, { messages: li(uu(t.diagnostics, i, "event")) })
        ] }),
        /* @__PURE__ */ b.jsxs("label", { className: "fub-field", children: [
          /* @__PURE__ */ b.jsx("span", { children: "From" }),
          /* @__PURE__ */ b.jsx(
            "select",
            {
              "aria-label": "Transition from",
              className: "fub-input",
              value: t.transition.from,
              disabled: t.readOnly,
              onChange: (r) => t.updateTransition(t.transitionIndex, "from", r.target.value),
              children: t.definition.states.map((r, s) => /* @__PURE__ */ b.jsx("option", { value: r.name, children: r.name }, `${r.name}-${s}`))
            }
          )
        ] }),
        /* @__PURE__ */ b.jsxs("fieldset", { className: "fub-fieldset", children: [
          /* @__PURE__ */ b.jsx("legend", { children: "Target type" }),
          /* @__PURE__ */ b.jsxs("label", { className: "fub-checkbox-row", children: [
            /* @__PURE__ */ b.jsx(
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
          /* @__PURE__ */ b.jsxs("label", { className: "fub-checkbox-row", children: [
            /* @__PURE__ */ b.jsx(
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
        o === "static" ? /* @__PURE__ */ b.jsxs("label", { className: "fub-field", children: [
          /* @__PURE__ */ b.jsx("span", { children: "To" }),
          /* @__PURE__ */ b.jsx(
            "select",
            {
              "aria-label": "Transition target",
              className: "fub-input",
              value: t.transition.to ?? "",
              disabled: t.readOnly,
              onChange: (r) => t.updateTransition(t.transitionIndex, "to", r.target.value),
              children: t.definition.states.map((r, s) => /* @__PURE__ */ b.jsx("option", { value: r.name, children: r.name }, `${r.name}-target-${s}`))
            }
          )
        ] }) : /* @__PURE__ */ b.jsxs("label", { className: "fub-field", children: [
          /* @__PURE__ */ b.jsx("span", { children: "Resolver" }),
          /* @__PURE__ */ b.jsx(
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
        /* @__PURE__ */ b.jsxs("section", { className: "fub-section", children: [
          /* @__PURE__ */ b.jsxs("div", { className: "fub-subheader", children: [
            /* @__PURE__ */ b.jsx("strong", { children: "Workflow" }),
            /* @__PURE__ */ b.jsxs("div", { className: "fub-inline-actions", children: [
              /* @__PURE__ */ b.jsx(
                "button",
                {
                  type: "button",
                  className: "fub-mini-btn",
                  onClick: () => t.addWorkflowNode(t.transitionIndex, "step"),
                  disabled: t.readOnly,
                  children: "+ Step"
                }
              ),
              /* @__PURE__ */ b.jsx(
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
          /* @__PURE__ */ b.jsx(
            oA,
            {
              nodes: t.transition.workflow.nodes,
              onSelectNode: (r) => t.selectWorkflowNode(t.transitionIndex, r)
            }
          ),
          /* @__PURE__ */ b.jsx("ul", { children: t.transition.workflow.nodes.map((r, s) => /* @__PURE__ */ b.jsx("li", { children: /* @__PURE__ */ b.jsxs(
            "button",
            {
              type: "button",
              className: "fub-list-item",
              onClick: () => t.selectWorkflowNode(t.transitionIndex, s),
              children: [
                /* @__PURE__ */ b.jsx("span", { children: Yx(r) }),
                ll(r.kind) ? null : /* @__PURE__ */ b.jsx("span", { className: "fub-item-meta", children: "unsupported" })
              ]
            }
          ) }, rA(r, s))) })
        ] }),
        /* @__PURE__ */ b.jsx(An, { messages: li(t.selectionDiagnostics) })
      ]
    }
  );
}
function sA(t) {
  const i = t.label?.trim() || t.id, o = t.description?.trim() || "", r = Array.isArray(t.metadata?.tags) ? t.metadata.tags.filter((s) => typeof s == "string" && s.trim() !== "") : [];
  return {
    id: t.id,
    label: i,
    description: o,
    tags: r,
    searchText: `${t.id} ${i} ${o} ${r.join(" ")}`.toLowerCase()
  };
}
function mv(t) {
  return t.trim() !== "";
}
function uA(t) {
  const [i, o] = X.useState(!1), [r, s] = X.useState(0), u = !!t.readOnly, c = X.useMemo(() => t.actions.map(sA), [t.actions]), d = t.value.trim().toLowerCase(), m = X.useMemo(() => mv(d) ? c.filter((A) => A.searchText.includes(d)) : c, [c, d]), p = t.inputID ? `${t.inputID}-listbox` : "fub-action-catalog-listbox", g = m[r], y = g ? `${p}-${g.id}` : void 0, v = (A) => {
    t.onChange(A), o(!1), s(0);
  }, x = () => {
    u || t.loading || m.length === 0 || o(!0);
  }, w = () => {
    o(!1), s(0);
  }, _ = (A) => {
    if (!u) {
      if (A.key === "ArrowDown") {
        if (A.preventDefault(), !i) {
          x();
          return;
        }
        if (m.length === 0)
          return;
        s((O) => (O + 1) % m.length);
        return;
      }
      if (A.key === "ArrowUp") {
        if (A.preventDefault(), !i) {
          x();
          return;
        }
        if (m.length === 0)
          return;
        s((O) => (O - 1 + m.length) % m.length);
        return;
      }
      if (A.key === "Enter" && i && g) {
        A.preventDefault(), v(g.id);
        return;
      }
      A.key === "Escape" && w();
    }
  }, T = t.loading ? "Loading action catalog..." : t.unavailableReason || (i && mv(t.value) && m.length === 0 ? "No matching actions." : null);
  return /* @__PURE__ */ b.jsxs("div", { className: "fub-action-catalog", children: [
    /* @__PURE__ */ b.jsx(
      "input",
      {
        id: t.inputID,
        role: "combobox",
        "aria-label": "Workflow action id",
        "aria-expanded": i,
        "aria-controls": p,
        "aria-autocomplete": "list",
        "aria-activedescendant": i ? y : void 0,
        className: "fub-input",
        value: t.value,
        readOnly: u,
        onChange: (A) => {
          t.onChange(A.target.value), s(0), x();
        },
        onFocus: x,
        onBlur: () => {
          window.setTimeout(() => {
            w();
          }, 0);
        },
        onKeyDown: _
      }
    ),
    i ? /* @__PURE__ */ b.jsx("ul", { id: p, role: "listbox", className: "fub-action-catalog-listbox", children: m.map((A, O) => /* @__PURE__ */ b.jsx("li", { role: "presentation", children: /* @__PURE__ */ b.jsxs(
      "button",
      {
        type: "button",
        role: "option",
        id: `${p}-${A.id}`,
        "aria-selected": O === r,
        className: `fub-action-catalog-option${O === r ? " is-active" : ""}`,
        onMouseDown: (N) => {
          N.preventDefault();
        },
        onClick: () => v(A.id),
        children: [
          /* @__PURE__ */ b.jsxs("span", { className: "fub-action-catalog-option-title", children: [
            /* @__PURE__ */ b.jsx("code", { children: A.id }),
            A.label !== A.id ? /* @__PURE__ */ b.jsx("span", { children: A.label }) : null
          ] }),
          A.description ? /* @__PURE__ */ b.jsx("span", { className: "fub-muted", children: A.description }) : null,
          A.tags.length > 0 ? /* @__PURE__ */ b.jsx("span", { className: "fub-action-catalog-option-tags", children: A.tags.join(", ") }) : null
        ]
      }
    ) }, A.id)) }) : null,
    T ? /* @__PURE__ */ b.jsx("p", { className: "fub-muted", role: t.loading ? "status" : void 0, children: T }) : null
  ] });
}
function cA(t) {
  return JSON.stringify(t ?? {}, null, 2);
}
function fA(t) {
  if (t.trim() === "")
    return { value: {} };
  try {
    const i = JSON.parse(t);
    return !i || typeof i != "object" || Array.isArray(i) ? { error: "metadata must be a JSON object" } : { value: i };
  } catch (i) {
    return i instanceof SyntaxError && i.message.trim() !== "" ? { error: `metadata must be valid JSON: ${i.message}` } : { error: "metadata must be valid JSON" };
  }
}
function dA(t) {
  const i = X.useMemo(() => cA(t.metadata), [t.metadata]), [o, r] = X.useState(i), [s, u] = X.useState(null);
  X.useEffect(() => {
    r(i), u(null);
  }, [i]);
  const c = () => {
    if (t.readOnly)
      return;
    const d = fA(o);
    if (d.error) {
      u(d.error);
      return;
    }
    u(null), t.onCommit(d.value ?? {});
  };
  return /* @__PURE__ */ b.jsxs("label", { className: "fub-field", children: [
    /* @__PURE__ */ b.jsx("span", { children: "Metadata (JSON object)" }),
    /* @__PURE__ */ b.jsx(
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
    s ? /* @__PURE__ */ b.jsx(An, { messages: [s] }) : null
  ] });
}
function hA(t, i) {
  return `fub-action-catalog-${t}-${i}`;
}
function mA(t) {
  if (!t.transition || !t.node)
    return /* @__PURE__ */ b.jsx(Xi, { title: "Inspector", children: /* @__PURE__ */ b.jsx("div", { children: "Workflow node not found." }) });
  if (!ll(t.node.kind))
    return /* @__PURE__ */ b.jsxs(Xi, { title: "Workflow Node", children: [
      /* @__PURE__ */ b.jsxs("p", { className: "fub-guardrail", children: [
        "Node kind ",
        /* @__PURE__ */ b.jsx("code", { children: t.node.kind }),
        " is unsupported in builder v1 and is read-only."
      ] }),
      /* @__PURE__ */ b.jsxs("p", { className: "fub-muted", children: [
        "Unsupported kinds: ",
        Cv.join(", ")
      ] }),
      /* @__PURE__ */ b.jsx(An, { messages: li(t.selectionDiagnostics) })
    ] });
  const i = {
    kind: "workflow-node",
    transitionIndex: t.transitionIndex,
    nodeIndex: t.nodeIndex
  };
  return /* @__PURE__ */ b.jsxs(
    Xi,
    {
      title: "Workflow Node",
      actions: /* @__PURE__ */ b.jsx(
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
        /* @__PURE__ */ b.jsx(Th, { readOnly: t.readOnly }),
        /* @__PURE__ */ b.jsxs("div", { className: "fub-muted", children: [
          "Kind: ",
          t.node.kind
        ] }),
        t.node.kind === "step" ? /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
          /* @__PURE__ */ b.jsxs("label", { className: "fub-field", children: [
            /* @__PURE__ */ b.jsx("span", { children: "Action ID" }),
            /* @__PURE__ */ b.jsx(
              uA,
              {
                inputID: hA(t.transitionIndex, t.nodeIndex),
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
            /* @__PURE__ */ b.jsx(
              An,
              {
                messages: li(uu(t.diagnostics, i, "action_id"))
              }
            )
          ] }),
          /* @__PURE__ */ b.jsxs("label", { className: "fub-checkbox-row", children: [
            /* @__PURE__ */ b.jsx(
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
          /* @__PURE__ */ b.jsxs("label", { className: "fub-field", children: [
            /* @__PURE__ */ b.jsx("span", { children: "Delay" }),
            /* @__PURE__ */ b.jsx(
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
          /* @__PURE__ */ b.jsxs("label", { className: "fub-field", children: [
            /* @__PURE__ */ b.jsx("span", { children: "Timeout" }),
            /* @__PURE__ */ b.jsx(
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
          /* @__PURE__ */ b.jsx(
            dA,
            {
              metadata: t.node.step?.metadata,
              readOnly: t.readOnly,
              onCommit: (o) => t.updateWorkflowNodeMetadata(t.transitionIndex, t.nodeIndex, o)
            }
          )
        ] }) : /* @__PURE__ */ b.jsxs("label", { className: "fub-field", children: [
          /* @__PURE__ */ b.jsx("span", { children: "When expression" }),
          /* @__PURE__ */ b.jsx(
            "input",
            {
              "aria-label": "Workflow when expression",
              className: "fub-input",
              value: t.node.expr ?? "",
              readOnly: t.readOnly,
              onChange: (o) => t.updateWorkflowNodeField(t.transitionIndex, t.nodeIndex, "expr", o.target.value)
            }
          ),
          /* @__PURE__ */ b.jsx(An, { messages: li(uu(t.diagnostics, i, "expr")) })
        ] }),
        /* @__PURE__ */ b.jsx(An, { messages: li(t.selectionDiagnostics) })
      ]
    }
  );
}
function gA(t) {
  const [i, o] = X.useState([]), [r, s] = X.useState(null), [u, c] = X.useState(!1);
  return X.useEffect(() => {
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
function gv(t) {
  const i = be((O) => O.document.definition), o = be((O) => O.selection), r = be((O) => O.diagnostics), s = be((O) => O.removeState), u = be((O) => O.updateStateName), c = be((O) => O.updateStateFlag), d = be((O) => O.removeTransition), m = be((O) => O.updateTransition), p = be((O) => O.updateTransitionTargetKind), g = be((O) => O.addWorkflowNode), y = be((O) => O.removeWorkflowNode), v = be((O) => O.selectWorkflowNode), x = be((O) => O.updateWorkflowNodeField), w = be((O) => O.updateWorkflowNodeMetadata), _ = wS(r, o), T = gA(t.actionCatalogProvider), A = !!t.readOnly;
  if (o.kind === "state")
    return /* @__PURE__ */ b.jsx(
      aA,
      {
        state: i.states[o.stateIndex],
        stateIndex: o.stateIndex,
        diagnostics: r,
        selectionDiagnostics: _,
        readOnly: A,
        removeState: s,
        updateStateName: u,
        updateStateFlag: c
      }
    );
  if (o.kind === "transition")
    return /* @__PURE__ */ b.jsx(
      lA,
      {
        definition: i,
        transition: i.transitions[o.transitionIndex],
        transitionIndex: o.transitionIndex,
        diagnostics: r,
        selectionDiagnostics: _,
        readOnly: A,
        removeTransition: d,
        updateTransition: m,
        updateTransitionTargetKind: p,
        addWorkflowNode: g,
        selectWorkflowNode: v
      }
    );
  if (o.kind === "workflow-node") {
    const O = i.transitions[o.transitionIndex], N = O?.workflow.nodes?.[o.nodeIndex];
    return /* @__PURE__ */ b.jsx(
      mA,
      {
        transition: O,
        node: N,
        transitionIndex: o.transitionIndex,
        nodeIndex: o.nodeIndex,
        diagnostics: r,
        selectionDiagnostics: _,
        actionCatalog: T,
        readOnly: A,
        removeWorkflowNode: y,
        updateWorkflowNodeField: x,
        updateWorkflowNodeMetadata: w
      }
    );
  }
  return /* @__PURE__ */ b.jsxs(Xi, { title: "Inspector", children: [
    /* @__PURE__ */ b.jsx("p", { children: "Select a state, transition, or workflow node to edit properties." }),
    /* @__PURE__ */ b.jsx(An, { messages: li(_) })
  ] });
}
const pA = [
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
function yA(t, i) {
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
function pv(t) {
  const i = X.useRef(null), o = X.useRef(null), r = X.useMemo(() => pA, []);
  return X.useEffect(() => {
    if (!t.open)
      return;
    o.current?.focus();
    const s = (u) => {
      if (i.current) {
        if (u.key === "Escape") {
          u.preventDefault(), t.onClose();
          return;
        }
        yA(u, i.current);
      }
    };
    return window.addEventListener("keydown", s), () => {
      window.removeEventListener("keydown", s);
    };
  }, [t.onClose, t.open]), t.open ? /* @__PURE__ */ b.jsx("div", { className: "fub-modal-overlay", role: "presentation", onClick: t.onClose, children: /* @__PURE__ */ b.jsxs(
    "div",
    {
      ref: i,
      className: "fub-modal",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "fub-keyboard-help-title",
      onClick: (s) => s.stopPropagation(),
      children: [
        /* @__PURE__ */ b.jsxs("header", { className: "fub-modal-header", children: [
          /* @__PURE__ */ b.jsx("h2", { id: "fub-keyboard-help-title", children: "Keyboard Shortcuts" }),
          /* @__PURE__ */ b.jsx(
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
        /* @__PURE__ */ b.jsx("div", { className: "fub-modal-body", children: /* @__PURE__ */ b.jsxs("table", { className: "fub-shortcuts-table", children: [
          /* @__PURE__ */ b.jsx("thead", { children: /* @__PURE__ */ b.jsxs("tr", { children: [
            /* @__PURE__ */ b.jsx("th", { scope: "col", children: "Category" }),
            /* @__PURE__ */ b.jsx("th", { scope: "col", children: "Shortcut" }),
            /* @__PURE__ */ b.jsx("th", { scope: "col", children: "Action" })
          ] }) }),
          /* @__PURE__ */ b.jsx("tbody", { children: r.map((s) => /* @__PURE__ */ b.jsxs("tr", { children: [
            /* @__PURE__ */ b.jsx("td", { children: s.category }),
            /* @__PURE__ */ b.jsx("td", { children: /* @__PURE__ */ b.jsx("code", { children: s.shortcut }) }),
            /* @__PURE__ */ b.jsx("td", { children: s.action })
          ] }, `${s.category}-${s.shortcut}`)) })
        ] }) })
      ]
    }
  ) }) : null;
}
function vA(t) {
  return t === "explorer" ? "fub-panel-explorer" : t === "canvas" ? "fub-panel-canvas" : t === "inspector" ? "fub-panel-inspector" : "fub-panel-console";
}
function yv(t) {
  return `fub-mobile-tab-${t}`;
}
function vv(t) {
  return `fub-mobile-tabpanel-${t}`;
}
function bA(t) {
  const i = qe((E) => E.explorerWidth), o = qe((E) => E.inspectorWidth), r = qe((E) => E.consoleHeight), s = qe((E) => E.explorerCollapsed), u = qe((E) => E.inspectorCollapsed), c = qe((E) => E.consoleCollapsed), d = qe((E) => E.mobilePanel), m = qe((E) => E.keyboardHelpOpen), p = qe((E) => E.togglePanel), g = qe((E) => E.setPanelCollapsed), y = qe((E) => E.setMobilePanel), v = qe((E) => E.setKeyboardHelpOpen), x = qe((E) => E.toggleKeyboardHelp), w = qe((E) => E.theme), _ = be((E) => E.document.definition), T = be((E) => E.diagnostics), A = Dt((E) => E.log), O = Dt((E) => E.errors), N = Dt((E) => E.projectedOutcome), C = Dt((E) => E.snapshotResult), I = X.useMemo(() => gS(_), [_]), L = SE(), k = L === "mobile-readonly", q = gd("explorer"), te = gd("inspector"), F = gd("console"), Y = X.useCallback((E) => {
    E && E();
  }, []), Q = X.useCallback((E) => {
    const U = () => {
      document.getElementById(vA(E))?.focus();
    };
    if (typeof window.requestAnimationFrame == "function") {
      window.requestAnimationFrame(U);
      return;
    }
    window.setTimeout(U, 0);
  }, []), W = X.useCallback(
    (E) => {
      L === "mobile-readonly" ? y(E) : (E === "explorer" && g("explorer", !1), E === "inspector" && g("inspector", !1), E === "console" && g("console", !1)), Q(E);
    },
    [Q, y, g, L]
  ), j = X.useCallback(
    (E) => {
      L === "mobile-readonly" ? y(E) : p(E), Q(E);
    },
    [Q, y, p, L]
  ), $ = X.useCallback(() => {
    if (L === "mobile-readonly") {
      y("console");
      return;
    }
    p("console");
  }, [y, p, L]), M = X.useCallback(() => {
    v(!1);
  }, [v]);
  xE({
    onSave: () => Y(t.onSave),
    onValidate: () => Y(t.onValidate),
    onFocusPanel: W,
    onToggleConsole: $,
    keyboardHelpOpen: m,
    onToggleKeyboardHelp: x,
    onCloseKeyboardHelp: M,
    readOnly: k
  }), X.useEffect(() => {
    L === "compact" && g("explorer", !0);
  }, [g, L]);
  const R = X.useMemo(() => {
    const E = s ? "0px" : `${i}px`, U = u ? "0px" : `${o}px`;
    return `${E} ${s ? "0px" : "6px"} minmax(420px,1fr) ${u ? "0px" : "6px"} ${U}`;
  }, [s, i, u, o]), B = X.useMemo(() => {
    const E = I.length > 0 ? "32px" : "0px", U = c ? "0px" : `min(${r}px, 40vh)`;
    return `48px ${E} minmax(280px,1fr) ${c ? "0px" : "6px"} ${U}`;
  }, [c, r, I.length]), K = X.useMemo(() => T.length === 0 ? "No diagnostics." : T.length === 1 ? "1 diagnostic in problems panel." : `${T.length} diagnostics in problems panel.`, [T.length]), ee = X.useMemo(() => {
    const E = O.at(-1);
    return E ? `Simulation error ${E.code}: ${E.message}` : N ? `Projected ${N.event}: ${N.previousState} to ${N.currentState}.` : A.at(-1)?.message ?? "Simulation idle.";
  }, [N, O, A]), D = !!(N || C);
  if (L === "mobile-readonly")
    return /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
      /* @__PURE__ */ b.jsxs("div", { className: `fub-root fub-root-mobile${D ? " fub-shell--simulation" : ""}`, "data-theme": w, children: [
        /* @__PURE__ */ b.jsx("div", { className: "fub-slot-header", children: /* @__PURE__ */ b.jsx(dv, { ...t, readOnly: !0, onPanelToggle: j }) }),
        I.length > 0 ? /* @__PURE__ */ b.jsxs("div", { className: "fub-guardrail-banner", role: "status", "aria-live": "polite", children: [
          "Unsupported workflow nodes are read-only: ",
          I.join(", ")
        ] }) : null,
        /* @__PURE__ */ b.jsx("div", { className: "fub-mobile-warning", role: "status", "aria-live": "polite", children: "Narrow/mobile mode is reduced-capability and read-only. Use desktop width for full authoring." }),
        /* @__PURE__ */ b.jsx("nav", { className: "fub-mobile-tabs", role: "tablist", "aria-label": "Builder panels", children: ["explorer", "canvas", "inspector", "console"].map((E) => /* @__PURE__ */ b.jsx(
          "button",
          {
            type: "button",
            role: "tab",
            id: yv(E),
            "aria-controls": vv(E),
            "aria-selected": d === E,
            tabIndex: d === E ? 0 : -1,
            className: `fub-mobile-tab${d === E ? " is-active" : ""}`,
            onClick: () => y(E),
            children: E
          },
          E
        )) }),
        /* @__PURE__ */ b.jsxs(
          "div",
          {
            className: "fub-mobile-panel",
            role: "tabpanel",
            id: vv(d),
            "aria-labelledby": yv(d),
            children: [
              d === "explorer" ? /* @__PURE__ */ b.jsx(uv, { readOnly: !0 }) : null,
              d === "canvas" ? /* @__PURE__ */ b.jsx(F0, { readOnly: !0 }) : null,
              d === "inspector" ? /* @__PURE__ */ b.jsx(gv, { actionCatalogProvider: t.actionCatalogProvider, readOnly: !0 }) : null,
              d === "console" ? /* @__PURE__ */ b.jsx(W0, {}) : null
            ]
          }
        ),
        /* @__PURE__ */ b.jsx("div", { className: "fub-sr-only", role: "status", "aria-live": "polite", "aria-atomic": "true", children: K }),
        /* @__PURE__ */ b.jsx("div", { className: "fub-sr-only", role: "status", "aria-live": "polite", "aria-atomic": "true", children: ee })
      ] }),
      /* @__PURE__ */ b.jsx(pv, { open: m, onClose: M })
    ] });
  const V = (I.length > 0, 3), ne = (I.length > 0, 4), H = (I.length > 0, 5);
  return /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
    /* @__PURE__ */ b.jsxs(
      "div",
      {
        className: `fub-root${D ? " fub-shell--simulation" : ""}`,
        "data-theme": w,
        style: { gridTemplateColumns: R, gridTemplateRows: B },
        children: [
          /* @__PURE__ */ b.jsx("div", { className: "fub-slot-header", style: { gridColumn: "1 / -1", gridRow: 1 }, children: /* @__PURE__ */ b.jsx(dv, { ...t, readOnly: !1, onPanelToggle: j }) }),
          I.length > 0 ? /* @__PURE__ */ b.jsxs("div", { className: "fub-guardrail-banner", style: { gridColumn: "1 / -1", gridRow: 2 }, role: "status", "aria-live": "polite", children: [
            "Unsupported workflow nodes are read-only: ",
            I.join(", ")
          ] }) : null,
          s ? null : /* @__PURE__ */ b.jsx("div", { style: { gridColumn: 1, gridRow: V, display: "flex", flexDirection: "column", overflow: "hidden" }, children: /* @__PURE__ */ b.jsx(uv, { readOnly: !1 }) }),
          s ? null : /* @__PURE__ */ b.jsx(
            "div",
            {
              className: "fub-resizer fub-resizer-vertical",
              role: "separator",
              "aria-label": "Resize explorer",
              onPointerDown: q,
              style: { gridColumn: 2, gridRow: V }
            }
          ),
          /* @__PURE__ */ b.jsx("div", { style: { gridColumn: 3, gridRow: V, display: "flex", flexDirection: "column", minWidth: 0, minHeight: 0, overflow: "hidden" }, children: /* @__PURE__ */ b.jsx(F0, { readOnly: !1 }) }),
          u ? null : /* @__PURE__ */ b.jsx(
            "div",
            {
              className: "fub-resizer fub-resizer-vertical",
              role: "separator",
              "aria-label": "Resize inspector",
              onPointerDown: te,
              style: { gridColumn: 4, gridRow: V }
            }
          ),
          u ? null : /* @__PURE__ */ b.jsx("div", { style: { gridColumn: 5, gridRow: V, display: "flex", flexDirection: "column", overflow: "hidden" }, children: /* @__PURE__ */ b.jsx(gv, { actionCatalogProvider: t.actionCatalogProvider, readOnly: !1 }) }),
          c ? null : /* @__PURE__ */ b.jsx(
            "div",
            {
              className: "fub-resizer fub-resizer-horizontal",
              role: "separator",
              "aria-label": "Resize console",
              onPointerDown: F,
              style: { gridColumn: "1 / -1", gridRow: ne }
            }
          ),
          c ? null : /* @__PURE__ */ b.jsx("div", { className: "fub-slot-console", style: { gridColumn: "1 / -1", gridRow: H }, children: /* @__PURE__ */ b.jsx(W0, {}) }),
          /* @__PURE__ */ b.jsx("div", { className: "fub-sr-only", role: "status", "aria-live": "polite", "aria-atomic": "true", children: K }),
          /* @__PURE__ */ b.jsx("div", { className: "fub-sr-only", role: "status", "aria-live": "polite", "aria-atomic": "true", children: ee })
        ]
      }
    ),
    /* @__PURE__ */ b.jsx(pv, { open: m, onClose: M })
  ] });
}
function xA(t) {
  return t.open ? /* @__PURE__ */ b.jsx("div", { className: "fub-modal-overlay", role: "presentation", onClick: t.onClose, children: /* @__PURE__ */ b.jsxs(
    "div",
    {
      className: "fub-modal",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "fub-conflict-resolution-title",
      onClick: (i) => i.stopPropagation(),
      children: [
        /* @__PURE__ */ b.jsxs("header", { className: "fub-modal-header", children: [
          /* @__PURE__ */ b.jsx("h2", { id: "fub-conflict-resolution-title", children: "Version Conflict" }),
          /* @__PURE__ */ b.jsx("button", { type: "button", className: "fub-mini-btn", onClick: t.onClose, disabled: t.busy, children: "Close" })
        ] }),
        /* @__PURE__ */ b.jsxs("div", { className: "fub-modal-body", children: [
          /* @__PURE__ */ b.jsxs("p", { className: "fub-log-error", children: [
            "Save failed with ",
            /* @__PURE__ */ b.jsx("code", { children: "FSM_VERSION_CONFLICT" }),
            " for ",
            /* @__PURE__ */ b.jsx("code", { children: t.machineId }),
            "."
          ] }),
          /* @__PURE__ */ b.jsxs("p", { children: [
            /* @__PURE__ */ b.jsx("strong", { children: "Your base version:" }),
            " ",
            /* @__PURE__ */ b.jsx("code", { children: t.expectedVersion ?? "unknown" })
          ] }),
          /* @__PURE__ */ b.jsxs("p", { children: [
            /* @__PURE__ */ b.jsx("strong", { children: "Server version:" }),
            " ",
            /* @__PURE__ */ b.jsx("code", { children: t.actualVersion ?? "unknown" })
          ] }),
          t.conflictPaths && t.conflictPaths.length > 0 ? /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
            /* @__PURE__ */ b.jsx("strong", { children: "Conflict paths" }),
            /* @__PURE__ */ b.jsx("ul", { children: t.conflictPaths.map((i) => /* @__PURE__ */ b.jsx("li", { children: /* @__PURE__ */ b.jsx("code", { children: i }) }, i)) })
          ] }) : null,
          /* @__PURE__ */ b.jsxs("div", { className: "fub-inline-actions", children: [
            /* @__PURE__ */ b.jsx("button", { type: "button", className: "fub-btn", onClick: () => t.onResolve("keep-mine"), disabled: t.busy, children: "Keep Mine" }),
            /* @__PURE__ */ b.jsx("button", { type: "button", className: "fub-btn", onClick: () => t.onResolve("keep-server"), disabled: t.busy, children: "Keep Server" }),
            /* @__PURE__ */ b.jsx("button", { type: "button", className: "fub-btn fub-btn-primary", onClick: () => t.onResolve("merge"), disabled: t.busy, children: "Merge" })
          ] }),
          /* @__PURE__ */ b.jsxs("p", { className: "fub-muted", children: [
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
function wA(t) {
  if (!t.open)
    return null;
  const i = t.items.find((r) => r.version === t.selectedVersion), o = !!(i && i.version !== t.currentVersion);
  return /* @__PURE__ */ b.jsx("div", { className: "fub-modal-overlay", role: "presentation", onClick: t.onClose, children: /* @__PURE__ */ b.jsxs(
    "div",
    {
      className: "fub-modal",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "fub-version-history-title",
      onClick: (r) => r.stopPropagation(),
      children: [
        /* @__PURE__ */ b.jsxs("header", { className: "fub-modal-header", children: [
          /* @__PURE__ */ b.jsx("h2", { id: "fub-version-history-title", children: "Version History" }),
          /* @__PURE__ */ b.jsx("button", { type: "button", className: "fub-mini-btn", onClick: t.onClose, children: "Close" })
        ] }),
        /* @__PURE__ */ b.jsxs("div", { className: "fub-modal-body", children: [
          t.errorMessage ? /* @__PURE__ */ b.jsx("p", { className: "fub-log-error", children: t.errorMessage }) : null,
          t.loading ? /* @__PURE__ */ b.jsx("p", { className: "fub-muted", children: "Loading version history..." }) : null,
          t.items.length === 0 && !t.loading ? /* @__PURE__ */ b.jsx("p", { className: "fub-muted", children: "No history entries available." }) : null,
          t.items.length > 0 ? /* @__PURE__ */ b.jsxs("div", { className: "fub-version-history-grid", children: [
            /* @__PURE__ */ b.jsxs("div", { children: [
              /* @__PURE__ */ b.jsx("h3", { children: "Versions" }),
              /* @__PURE__ */ b.jsx("ul", { children: t.items.map((r) => /* @__PURE__ */ b.jsx("li", { children: /* @__PURE__ */ b.jsxs(
                "button",
                {
                  type: "button",
                  className: `fub-list-item${r.version === t.selectedVersion ? " is-selected" : ""}`,
                  onClick: () => t.onSelectVersion(r.version),
                  children: [
                    /* @__PURE__ */ b.jsx("span", { className: "fub-item-main", children: r.version }),
                    /* @__PURE__ */ b.jsx("span", { className: "fub-item-meta", children: r.isDraft ? "draft" : "published" })
                  ]
                }
              ) }, r.version)) })
            ] }),
            /* @__PURE__ */ b.jsxs("div", { children: [
              /* @__PURE__ */ b.jsx("h3", { children: "Details" }),
              i ? /* @__PURE__ */ b.jsxs("div", { className: "fub-console-card", children: [
                /* @__PURE__ */ b.jsxs("p", { children: [
                  /* @__PURE__ */ b.jsx("strong", { children: "Version:" }),
                  " ",
                  /* @__PURE__ */ b.jsx("code", { children: i.version })
                ] }),
                /* @__PURE__ */ b.jsxs("p", { children: [
                  /* @__PURE__ */ b.jsx("strong", { children: "Updated:" }),
                  " ",
                  /* @__PURE__ */ b.jsx("code", { children: i.updatedAt })
                ] }),
                i.publishedAt ? /* @__PURE__ */ b.jsxs("p", { children: [
                  /* @__PURE__ */ b.jsx("strong", { children: "Published:" }),
                  " ",
                  /* @__PURE__ */ b.jsx("code", { children: i.publishedAt })
                ] }) : null,
                i.etag ? /* @__PURE__ */ b.jsxs("p", { children: [
                  /* @__PURE__ */ b.jsx("strong", { children: "ETag:" }),
                  " ",
                  /* @__PURE__ */ b.jsx("code", { children: i.etag })
                ] }) : null,
                /* @__PURE__ */ b.jsxs("div", { className: "fub-inline-actions", children: [
                  /* @__PURE__ */ b.jsx("button", { type: "button", className: "fub-btn", disabled: !o, onClick: t.onRestoreSelected, children: "Restore Selected" }),
                  o ? null : /* @__PURE__ */ b.jsx("span", { className: "fub-muted", children: "Current version selected." })
                ] })
              ] }) : /* @__PURE__ */ b.jsx("p", { className: "fub-muted", children: "Select a version to inspect details and restore." }),
              /* @__PURE__ */ b.jsx("h3", { children: "Diff" }),
              t.diff ? /* @__PURE__ */ b.jsxs("div", { className: "fub-console-card", children: [
                /* @__PURE__ */ b.jsxs("p", { children: [
                  /* @__PURE__ */ b.jsx("strong", { children: "Compared:" }),
                  " ",
                  /* @__PURE__ */ b.jsx("code", { children: t.diff.baseVersion }),
                  " ",
                  "->",
                  " ",
                  /* @__PURE__ */ b.jsx("code", { children: t.diff.targetVersion })
                ] }),
                /* @__PURE__ */ b.jsxs("p", { children: [
                  /* @__PURE__ */ b.jsx("strong", { children: "Conflicts:" }),
                  " ",
                  t.diff.hasConflicts ? "yes" : "no"
                ] }),
                t.diff.changes.length > 0 ? /* @__PURE__ */ b.jsx("ul", { children: t.diff.changes.map((r) => /* @__PURE__ */ b.jsxs("li", { children: [
                  /* @__PURE__ */ b.jsx("code", { children: r.path }),
                  " (",
                  r.changeType,
                  ")"
                ] }, `${r.path}-${r.changeType}`)) }) : /* @__PURE__ */ b.jsx("p", { className: "fub-muted", children: "No changes reported." }),
                t.diff.conflictPaths && t.diff.conflictPaths.length > 0 ? /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
                  /* @__PURE__ */ b.jsx("strong", { children: "Conflict Paths" }),
                  /* @__PURE__ */ b.jsx("ul", { children: t.diff.conflictPaths.map((r) => /* @__PURE__ */ b.jsx("li", { children: /* @__PURE__ */ b.jsx("code", { children: r }) }, r)) })
                ] }) : null
              ] }) : /* @__PURE__ */ b.jsx("p", { className: "fub-muted", children: t.diffUnavailableReason ?? "No diff selected." })
            ] })
          ] }) : null
        ] })
      ]
    }
  ) });
}
const SA = new Set(Object.values(jn));
function jd(t) {
  return typeof t == "string" && SA.has(t) ? t : jn.internal;
}
function zr(t) {
  return typeof t == "string" && t.trim() !== "" ? t : "internal error";
}
function EA(t) {
  return t && typeof t == "object" && !Array.isArray(t) ? t : null;
}
function _A(t) {
  return t instanceof Error ? t : null;
}
function NA(t) {
  return t.code === -32601 ? !0 : t.message.toLowerCase().includes("method not found");
}
function CA(t) {
  return t.status === 404 || t.status === 405;
}
function MA(t) {
  const i = " Verify RPC endpoint and FSM method registration (for example `/api/rpc` with `fsm.*` methods).";
  return t.endsWith(i) ? t : `${t}${i}`;
}
function ma(t) {
  if (t instanceof su)
    return {
      code: jd(t.envelope.code),
      message: zr(t.envelope.message),
      method: t.method
    };
  if (t instanceof lu)
    return NA(t) || CA(t) ? {
      code: jn.internal,
      message: MA(zr(t.message)),
      method: t.method
    } : {
      code: jd(t.code),
      message: zr(t.message),
      method: t.method
    };
  const i = EA(t);
  if (i)
    return {
      code: jd(i.code),
      message: zr(i.message),
      method: typeof i.method == "string" ? i.method : void 0
    };
  const o = _A(t);
  return o ? {
    code: jn.internal,
    message: zr(o.message)
  } : {
    code: jn.internal,
    message: "internal error"
  };
}
function UA(t) {
  return `${t.method ? `${t.method}: ` : ""}[${t.code}] ${t.message}`;
}
function TA(t) {
  return {
    async applyEventDryRun(i, o) {
      const r = await hn({
        client: t,
        method: Yr.applyEvent,
        data: i,
        meta: o
      });
      return Vv(r);
    },
    async snapshot(i, o) {
      const r = await hn({
        client: t,
        method: Yr.snapshot,
        data: i,
        meta: o
      });
      return Uv(r);
    }
  };
}
function DA(t) {
  return X.useMemo(() => t ? TA(t) : null, [t]);
}
function ju(t) {
  return t !== null && typeof t == "object" && !Array.isArray(t);
}
function jA(t, i, o, r) {
  if (ju(i)) {
    const s = ["id", "name", "machineId", "event"];
    for (const u of s) {
      const c = i[u];
      if (!(typeof c != "string" || c.trim() === ""))
        for (let d = 0; d < t.length; d += 1) {
          if (r.has(d))
            continue;
          const m = t[d];
          if (ju(m) && m[u] === c)
            return r.add(d), m;
        }
    }
  }
  if (o < t.length)
    return r.add(o), t[o];
}
function nh(t, i) {
  if (Array.isArray(i)) {
    const o = Array.isArray(t) ? t : [], r = /* @__PURE__ */ new Set();
    return i.map((s, u) => nh(jA(o, s, u, r), s));
  }
  if (ju(i)) {
    const o = ju(t) ? t : {}, r = {};
    for (const [s, u] of Object.entries(o))
      r[s] = He(u);
    for (const [s, u] of Object.entries(i))
      r[s] = nh(o[s], u);
    return r;
  }
  return He(i);
}
function Ur(t) {
  return He(t);
}
function bv(t) {
  return nh(t.baseDocument, t.editedDocument);
}
function AA(t) {
  return `${t}-preview`;
}
function OA(t) {
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
function zA(t) {
  return t !== null && typeof t == "object" && !Array.isArray(t) ? t : null;
}
function RA(t) {
  const i = be((fe) => fe.document), o = be((fe) => fe.diagnostics), r = be((fe) => fe.isDirty), s = be((fe) => fe.selection), u = be((fe) => fe.replaceDocument), c = be((fe) => fe.restoreDocument), d = be((fe) => fe.setDiagnostics), m = be((fe) => fe.consumeValidationScopeNodeIDs), p = be((fe) => fe.markSaved), g = be((fe) => fe.applyRemoteSave), y = Dt((fe) => fe.setApplyEventWirePayload), v = Dt((fe) => fe.setSnapshotWirePayload), x = Dt((fe) => fe.pushError), w = Dt((fe) => fe.pushInfo), _ = X.useMemo(() => t.rpcClient || !t.rpcEndpoint || t.rpcEndpoint.trim() === "" ? null : oS({ endpoint: t.rpcEndpoint }), [t.rpcClient, t.rpcEndpoint]), T = t.rpcClient ?? _, A = DA(T ?? null), O = sS(T ?? null), N = t.runtimeRPC ?? A, C = t.authoringRPC ?? O, I = X.useMemo(
    () => t.persistenceStore ?? OS(),
    [t.persistenceStore]
  ), L = X.useMemo(
    () => t.exportAdapter ?? dS(),
    [t.exportAdapter]
  ), k = (t.machineId?.trim() || i.definition.id || "machine").trim(), q = t.simulationDefaults?.entityId ?? AA(k), te = t.simulationDefaults?.msg ?? {}, F = t.simulationDefaults?.meta, Y = t.autosaveDebounceMs ?? 400, Q = X.useRef(null);
  Q.current === null && (Q.current = JSON.stringify(i));
  const W = X.useRef(Ur(i)), [j, $] = X.useState(null), [M, R] = X.useState({ state: "idle" }), [B, K] = X.useState(!1), [ee, D] = X.useState(!1), [V, ne] = X.useState([]), [H, E] = X.useState(void 0), [U, G] = X.useState(void 0), [J, Z] = X.useState(null), [se, me] = X.useState(null), [ge, xe] = X.useState(null), [Ee, Ce] = X.useState(!1), Ae = X.useRef({}), Ie = X.useCallback(() => bv({
    baseDocument: W.current,
    editedDocument: i
  }), [i]), Ve = X.useCallback(
    (fe) => {
      const pe = ma(fe);
      x({
        code: pe.code,
        message: pe.message,
        method: pe.method
      });
    },
    [x]
  ), ot = X.useCallback((fe, pe) => {
    const _e = ma(pe);
    R({
      state: "error",
      source: fe,
      message: _e.message,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
  }, []), ut = X.useCallback(
    async (fe) => {
      await I.save({
        machineId: k,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
        document: He(fe)
      }), $(null);
    },
    [k, I]
  ), jt = X.useCallback(
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
      W.current = He(pe), await ut(pe), R({
        state: "saved",
        source: "manual",
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      });
    },
    [g, ut]
  ), Wt = X.useCallback(
    async (fe, pe) => {
      if (fe.envelope.code !== jn.versionConflict || !C)
        return !1;
      try {
        const _e = await C.getMachine({
          machineId: k,
          preferDraft: !0
        }), De = zA(fe.envelope.details), Vt = De?.conflictPaths, En = Array.isArray(Vt) && Vt.every((Ho) => typeof Ho == "string") ? Vt : void 0;
        return xe({
          machineId: k,
          localDraft: pe,
          latestVersion: _e.version,
          latestDraft: He(_e.draft),
          latestDiagnostics: [..._e.diagnostics],
          expectedVersion: typeof De?.expectedVersion == "string" ? De.expectedVersion : pe.definition.version,
          actualVersion: typeof De?.actualVersion == "string" ? De.actualVersion : _e.version,
          conflictPaths: En
        }), R({
          state: "error",
          source: "manual",
          message: "version conflict: choose resolution",
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        }), x({
          code: jn.versionConflict,
          method: fe.method,
          message: "Version conflict detected. Choose Keep Mine, Keep Server, or Merge."
        }), !0;
      } catch (_e) {
        return Ve(_e), !1;
      }
    },
    [C, Ve, k, x]
  );
  X.useEffect(() => {
    t.onChange && t.onChange({
      document: i,
      diagnostics: o,
      isDirty: r
    });
  }, [o, i, r, t]), X.useEffect(() => {
    const fe = i.definition.version;
    !fe || fe.trim() === "" || (Ae.current[fe] = {
      draft: He(i),
      diagnostics: [...o]
    });
  }, [o, i]), X.useEffect(() => {
    let fe = !1;
    return I.load(k).then((pe) => {
      if (fe)
        return;
      if (!pe) {
        $(null);
        return;
      }
      const _e = Q.current ?? "", De = JSON.stringify(pe.document);
      $(De === _e ? null : pe);
    }).catch((pe) => {
      if (fe)
        return;
      const _e = ma(pe);
      x({
        code: _e.code,
        message: `autosave recovery failed: ${_e.message}`,
        method: _e.method
      });
    }), () => {
      fe = !0;
    };
  }, [k, I, x]), X.useEffect(() => {
    if (!r)
      return;
    const fe = window.setTimeout(() => {
      R({
        state: "saving",
        source: "autosave",
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      });
      const pe = Ie();
      I.save({
        machineId: k,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
        document: pe
      }).then(() => {
        R({
          state: "saved",
          source: "autosave",
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        }), w("Autosaved draft to persistence store.");
      }).catch((_e) => {
        ot("autosave", _e);
        const De = ma(_e);
        x({
          code: De.code,
          message: `autosave failed: ${De.message}`,
          method: De.method
        });
      });
    }, Y);
    return () => {
      window.clearTimeout(fe);
    };
  }, [
    Y,
    Ie,
    r,
    k,
    ot,
    I,
    x,
    w
  ]);
  const kn = X.useCallback(async () => {
    if (!N) {
      x({
        code: jn.internal,
        method: Yr.applyEvent,
        message: "runtime adapter unavailable"
      });
      return;
    }
    const fe = OA({
      selection: s,
      transitions: i.definition.transitions
    });
    if (!fe) {
      x({
        code: jn.invalidTransition,
        method: Yr.applyEvent,
        message: "no transition available for simulation"
      });
      return;
    }
    if (fe.event.trim() === "") {
      x({
        code: jn.invalidTransition,
        method: Yr.applyEvent,
        message: "selected transition must define an event"
      });
      return;
    }
    try {
      const pe = await N.applyEventDryRun(
        {
          machineId: k,
          entityId: q,
          event: fe.event,
          msg: te,
          expectedState: fe.from,
          dryRun: !0
        },
        F
      );
      y(pe, {
        event: fe.event,
        transitionId: fe.id
      });
      const _e = await N.snapshot(
        {
          machineId: k,
          entityId: q,
          msg: te,
          evaluateGuards: !0,
          includeBlocked: !0
        },
        F
      );
      v(_e);
    } catch (pe) {
      Ve(pe);
    }
  }, [
    i.definition.transitions,
    Ve,
    k,
    x,
    N,
    s,
    y,
    v,
    q,
    te,
    F
  ]), yt = X.useCallback(async () => {
    const fe = Ie();
    if (!C) {
      const pe = Dv(fe.definition);
      d(pe), w("Authoring RPC unavailable. Used local validation only.");
      return;
    }
    try {
      const pe = m();
      if (pe.length === 0) {
        const En = await C.validate({
          machineId: k,
          draft: fe
        });
        d(En.diagnostics), w(`Validation completed. valid=${En.valid}`);
        return;
      }
      const _e = await C.validate({
        machineId: k,
        draft: fe,
        scope: {
          nodeIds: pe
        }
      }), De = MS({
        definition: fe.definition,
        cachedDiagnostics: o,
        scopedDiagnostics: _e.diagnostics,
        scopeNodeIDs: pe
      });
      d(De);
      const Vt = await C.validate({
        machineId: k,
        draft: fe
      });
      if (!TS(De, Vt.diagnostics)) {
        d(Vt.diagnostics), w("Scoped validation parity mismatch detected; fell back to full validation output.");
        return;
      }
      w(`Validation completed. valid=${Vt.valid} (scoped + parity checked)`);
    } catch (pe) {
      Ve(pe);
    }
  }, [
    C,
    Ie,
    m,
    o,
    Ve,
    k,
    w,
    d
  ]), fi = X.useCallback(async () => {
    R({
      state: "saving",
      source: "manual",
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
    const fe = Ie();
    if (!C) {
      try {
        await ut(fe), p(), W.current = He(fe), R({
          state: "saved",
          source: "manual",
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        }), w("Saved locally (authoring RPC unavailable).");
      } catch (pe) {
        ot("manual", pe), Ve(pe);
      }
      return;
    }
    try {
      const pe = await C.saveDraft({
        machineId: k,
        baseVersion: fe.definition.version,
        draft: fe,
        validate: !0
      });
      await jt({
        draft: fe,
        version: pe.version,
        draftState: pe.draftState,
        diagnostics: pe.diagnostics
      }), xe(null), w("Draft saved through authoring RPC.");
    } catch (pe) {
      if (pe instanceof su && await Wt(pe, fe))
        return;
      ot("manual", pe), Ve(pe);
    }
  }, [
    C,
    Ie,
    jt,
    Ve,
    ot,
    k,
    p,
    Wt,
    ut,
    w
  ]), sn = X.useCallback(
    async (fe) => {
      if (!(!ge || !C)) {
        Ce(!0);
        try {
          if (fe === "keep-server") {
            const De = Ur(ge.latestDraft);
            c(De, ge.latestDiagnostics), W.current = He(De), p(), await ut(De), xe(null), R({
              state: "saved",
              source: "manual",
              updatedAt: (/* @__PURE__ */ new Date()).toISOString()
            }), w("Loaded latest server draft after conflict.");
            return;
          }
          const pe = fe === "merge" ? bv({
            baseDocument: ge.latestDraft,
            editedDocument: ge.localDraft
          }) : He(ge.localDraft);
          R({
            state: "saving",
            source: "manual",
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          });
          const _e = await C.saveDraft({
            machineId: ge.machineId,
            baseVersion: ge.latestVersion,
            draft: pe,
            validate: !0
          });
          await jt({
            draft: pe,
            version: _e.version,
            draftState: _e.draftState,
            diagnostics: _e.diagnostics
          }), xe(null), w(fe === "merge" ? "Merged with latest server draft and saved." : "Retried save with latest server version.");
        } catch (pe) {
          if (pe instanceof su && await Wt(pe, ge.localDraft))
            return;
          ot("manual", pe), Ve(pe);
        } finally {
          Ce(!1);
        }
      }
    },
    [
      C,
      jt,
      Ve,
      ot,
      p,
      Wt,
      ge,
      ut,
      w,
      c
    ]
  ), Sn = X.useCallback(async () => {
    K(!0), D(!0), G(void 0), Z(null), me(null);
    const fe = {
      version: i.definition.version,
      updatedAt: i.draft_state.last_saved_at,
      isDraft: i.draft_state.is_draft
    };
    if (Ae.current[fe.version] = {
      draft: He(i),
      diagnostics: [...o]
    }, !C) {
      ne([fe]), E(fe.version), me("Authoring RPC unavailable; showing local version only."), D(!1);
      return;
    }
    try {
      const pe = C.listVersions;
      if (!pe) {
        ne([fe]), E(fe.version), me("Version history capability unavailable.");
        return;
      }
      const _e = await pe({
        machineId: k,
        limit: 25
      }), De = _e.items.length > 0 ? _e.items : [fe];
      ne(De);
      const Vt = De.some((En) => En.version === fe.version) ? fe.version : De[0]?.version;
      E(Vt);
    } catch (pe) {
      const _e = ma(pe);
      G(_e.message), ne([fe]), E(fe.version), me("Version history capability unavailable.");
    } finally {
      D(!1);
    }
  }, [C, o, i, k]), Hn = X.useCallback(
    async (fe) => {
      if (E(fe), Z(null), me(null), !C) {
        me("Authoring RPC unavailable; diff disabled.");
        return;
      }
      if (fe === i.definition.version) {
        me("Selected version matches current draft.");
        return;
      }
      if (C.diffVersions)
        try {
          const pe = await C.diffVersions({
            machineId: k,
            baseVersion: fe,
            targetVersion: i.definition.version
          });
          Z(pe);
        } catch (pe) {
          const _e = ma(pe);
          me(`Diff unavailable: ${_e.message}`);
        }
      else
        me("Version diff capability unavailable.");
    },
    [C, i.definition.version, k]
  ), zo = X.useCallback(async () => {
    const fe = H;
    if (fe && fe !== i.definition.version)
      try {
        let pe = Ae.current[fe];
        if (!pe) {
          if (!C?.getVersion) {
            me("Version restore unavailable without get_version capability.");
            return;
          }
          const De = await C.getVersion({
            machineId: k,
            version: fe
          });
          pe = {
            draft: He(De.draft),
            diagnostics: [...De.diagnostics]
          }, Ae.current[fe] = pe;
        }
        const _e = Ur(pe.draft);
        c(_e, pe.diagnostics), W.current = He(_e), p(), await ut(_e), K(!1), R({
          state: "saved",
          source: "manual",
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        }), w(`Restored version ${fe}. Use Undo to return.`);
      } catch (pe) {
        const _e = ma(pe);
        G(_e.message), Ve(pe);
      }
  }, [
    C,
    i.definition.version,
    Ve,
    p,
    k,
    ut,
    w,
    c,
    H
  ]), di = X.useCallback(async () => {
    if (!j) {
      w("No autosaved draft to recover.");
      return;
    }
    const fe = Ur(j.document);
    u(fe), W.current = He(fe), $(null), w("Recovered autosaved draft.");
  }, [w, j, u]), Ro = X.useCallback(async () => {
    try {
      await L.exportJSON({
        machineId: k,
        draft: Ie()
      }), w("Exported machine definition as JSON.");
    } catch (fe) {
      Ve(fe);
    }
  }, [Ie, L, Ve, k, w]), ko = X.useCallback(async () => {
    if (!L.exportRPC) {
      w("RPC export unavailable. Configure ExportAdapter.exportRPC to enable this capability.");
      return;
    }
    try {
      await L.exportRPC({
        machineId: k,
        draft: Ie()
      }), w("Exported machine definition through RPC adapter.");
    } catch (fe) {
      Ve(fe);
    }
  }, [Ie, L, Ve, k, w]);
  return /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
    /* @__PURE__ */ b.jsx(
      bA,
      {
        onSave: fi,
        onValidate: yt,
        onSimulate: kn,
        onRecoverDraft: di,
        onOpenVersionHistory: Sn,
        onExportJSON: Ro,
        onExportRPC: ko,
        runtimeAvailable: !!N,
        authoringAvailable: !!C,
        recoveryAvailable: !!j,
        rpcExportAvailable: hS(L),
        versionHistoryEnabled: !0,
        actionCatalogProvider: t.actionCatalogProvider,
        saveStatus: M
      }
    ),
    /* @__PURE__ */ b.jsx(
      wA,
      {
        open: B,
        loading: ee,
        currentVersion: i.definition.version,
        items: V,
        selectedVersion: H,
        errorMessage: U,
        diff: J,
        diffUnavailableReason: se,
        onSelectVersion: (fe) => {
          Hn(fe);
        },
        onRestoreSelected: () => {
          zo();
        },
        onClose: () => K(!1)
      }
    ),
    /* @__PURE__ */ b.jsx(
      xA,
      {
        open: !!ge,
        machineId: ge?.machineId ?? k,
        expectedVersion: ge?.expectedVersion,
        actualVersion: ge?.actualVersion,
        conflictPaths: ge?.conflictPaths,
        busy: Ee,
        onResolve: (fe) => {
          sn(fe);
        },
        onClose: () => {
          Ee || xe(null);
        }
      }
    )
  ] });
}
function kA(t) {
  const i = X.useMemo(
    () => Ur(xS(t.initialDocument)),
    [t.initialDocument]
  );
  return /* @__PURE__ */ b.jsx(
    vE,
    {
      initialDocument: i,
      initialDiagnostics: t.initialDiagnostics,
      children: /* @__PURE__ */ b.jsx(RA, { ...t })
    }
  );
}
var Ad = { exports: {} }, Rr = {}, Od = { exports: {} }, zd = {};
var xv;
function HA() {
  return xv || (xv = 1, (function(t) {
    function i(M, R) {
      var B = M.length;
      M.push(R);
      e: for (; 0 < B; ) {
        var K = B - 1 >>> 1, ee = M[K];
        if (0 < s(ee, R))
          M[K] = R, M[B] = ee, B = K;
        else break e;
      }
    }
    function o(M) {
      return M.length === 0 ? null : M[0];
    }
    function r(M) {
      if (M.length === 0) return null;
      var R = M[0], B = M.pop();
      if (B !== R) {
        M[0] = B;
        e: for (var K = 0, ee = M.length, D = ee >>> 1; K < D; ) {
          var V = 2 * (K + 1) - 1, ne = M[V], H = V + 1, E = M[H];
          if (0 > s(ne, B))
            H < ee && 0 > s(E, ne) ? (M[K] = E, M[H] = B, K = H) : (M[K] = ne, M[V] = B, K = V);
          else if (H < ee && 0 > s(E, B))
            M[K] = E, M[H] = B, K = H;
          else break e;
        }
      }
      return R;
    }
    function s(M, R) {
      var B = M.sortIndex - R.sortIndex;
      return B !== 0 ? B : M.id - R.id;
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
    var m = [], p = [], g = 1, y = null, v = 3, x = !1, w = !1, _ = !1, T = !1, A = typeof setTimeout == "function" ? setTimeout : null, O = typeof clearTimeout == "function" ? clearTimeout : null, N = typeof setImmediate < "u" ? setImmediate : null;
    function C(M) {
      for (var R = o(p); R !== null; ) {
        if (R.callback === null) r(p);
        else if (R.startTime <= M)
          r(p), R.sortIndex = R.expirationTime, i(m, R);
        else break;
        R = o(p);
      }
    }
    function I(M) {
      if (_ = !1, C(M), !w)
        if (o(m) !== null)
          w = !0, L || (L = !0, Q());
        else {
          var R = o(p);
          R !== null && $(I, R.startTime - M);
        }
    }
    var L = !1, k = -1, q = 5, te = -1;
    function F() {
      return T ? !0 : !(t.unstable_now() - te < q);
    }
    function Y() {
      if (T = !1, L) {
        var M = t.unstable_now();
        te = M;
        var R = !0;
        try {
          e: {
            w = !1, _ && (_ = !1, O(k), k = -1), x = !0;
            var B = v;
            try {
              t: {
                for (C(M), y = o(m); y !== null && !(y.expirationTime > M && F()); ) {
                  var K = y.callback;
                  if (typeof K == "function") {
                    y.callback = null, v = y.priorityLevel;
                    var ee = K(
                      y.expirationTime <= M
                    );
                    if (M = t.unstable_now(), typeof ee == "function") {
                      y.callback = ee, C(M), R = !0;
                      break t;
                    }
                    y === o(m) && r(m), C(M);
                  } else r(m);
                  y = o(m);
                }
                if (y !== null) R = !0;
                else {
                  var D = o(p);
                  D !== null && $(
                    I,
                    D.startTime - M
                  ), R = !1;
                }
              }
              break e;
            } finally {
              y = null, v = B, x = !1;
            }
            R = void 0;
          }
        } finally {
          R ? Q() : L = !1;
        }
      }
    }
    var Q;
    if (typeof N == "function")
      Q = function() {
        N(Y);
      };
    else if (typeof MessageChannel < "u") {
      var W = new MessageChannel(), j = W.port2;
      W.port1.onmessage = Y, Q = function() {
        j.postMessage(null);
      };
    } else
      Q = function() {
        A(Y, 0);
      };
    function $(M, R) {
      k = A(function() {
        M(t.unstable_now());
      }, R);
    }
    t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(M) {
      M.callback = null;
    }, t.unstable_forceFrameRate = function(M) {
      0 > M || 125 < M ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : q = 0 < M ? Math.floor(1e3 / M) : 5;
    }, t.unstable_getCurrentPriorityLevel = function() {
      return v;
    }, t.unstable_next = function(M) {
      switch (v) {
        case 1:
        case 2:
        case 3:
          var R = 3;
          break;
        default:
          R = v;
      }
      var B = v;
      v = R;
      try {
        return M();
      } finally {
        v = B;
      }
    }, t.unstable_requestPaint = function() {
      T = !0;
    }, t.unstable_runWithPriority = function(M, R) {
      switch (M) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          M = 3;
      }
      var B = v;
      v = M;
      try {
        return R();
      } finally {
        v = B;
      }
    }, t.unstable_scheduleCallback = function(M, R, B) {
      var K = t.unstable_now();
      switch (typeof B == "object" && B !== null ? (B = B.delay, B = typeof B == "number" && 0 < B ? K + B : K) : B = K, M) {
        case 1:
          var ee = -1;
          break;
        case 2:
          ee = 250;
          break;
        case 5:
          ee = 1073741823;
          break;
        case 4:
          ee = 1e4;
          break;
        default:
          ee = 5e3;
      }
      return ee = B + ee, M = {
        id: g++,
        callback: R,
        priorityLevel: M,
        startTime: B,
        expirationTime: ee,
        sortIndex: -1
      }, B > K ? (M.sortIndex = B, i(p, M), o(m) === null && M === o(p) && (_ ? (O(k), k = -1) : _ = !0, $(I, B - K))) : (M.sortIndex = ee, i(m, M), w || x || (w = !0, L || (L = !0, Q()))), M;
    }, t.unstable_shouldYield = F, t.unstable_wrapCallback = function(M) {
      var R = v;
      return function() {
        var B = v;
        v = R;
        try {
          return M.apply(this, arguments);
        } finally {
          v = B;
        }
      };
    };
  })(zd)), zd;
}
var wv;
function LA() {
  return wv || (wv = 1, Od.exports = HA()), Od.exports;
}
var Sv;
function BA() {
  if (Sv) return Rr;
  Sv = 1;
  var t = LA(), i = rl(), o = Jb();
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
  function p(e) {
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
        for (var S = !1, z = f.child; z; ) {
          if (z === a) {
            S = !0, a = f, l = h;
            break;
          }
          if (z === l) {
            S = !0, l = f, a = h;
            break;
          }
          z = z.sibling;
        }
        if (!S) {
          for (z = h.child; z; ) {
            if (z === a) {
              S = !0, a = h, l = f;
              break;
            }
            if (z === l) {
              S = !0, l = h, a = f;
              break;
            }
            z = z.sibling;
          }
          if (!S) throw Error(r(189));
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
  var y = Object.assign, v = /* @__PURE__ */ Symbol.for("react.element"), x = /* @__PURE__ */ Symbol.for("react.transitional.element"), w = /* @__PURE__ */ Symbol.for("react.portal"), _ = /* @__PURE__ */ Symbol.for("react.fragment"), T = /* @__PURE__ */ Symbol.for("react.strict_mode"), A = /* @__PURE__ */ Symbol.for("react.profiler"), O = /* @__PURE__ */ Symbol.for("react.consumer"), N = /* @__PURE__ */ Symbol.for("react.context"), C = /* @__PURE__ */ Symbol.for("react.forward_ref"), I = /* @__PURE__ */ Symbol.for("react.suspense"), L = /* @__PURE__ */ Symbol.for("react.suspense_list"), k = /* @__PURE__ */ Symbol.for("react.memo"), q = /* @__PURE__ */ Symbol.for("react.lazy"), te = /* @__PURE__ */ Symbol.for("react.activity"), F = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), Y = Symbol.iterator;
  function Q(e) {
    return e === null || typeof e != "object" ? null : (e = Y && e[Y] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var W = /* @__PURE__ */ Symbol.for("react.client.reference");
  function j(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === W ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case _:
        return "Fragment";
      case A:
        return "Profiler";
      case T:
        return "StrictMode";
      case I:
        return "Suspense";
      case L:
        return "SuspenseList";
      case te:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case w:
          return "Portal";
        case N:
          return e.displayName || "Context";
        case O:
          return (e._context.displayName || "Context") + ".Consumer";
        case C:
          var n = e.render;
          return e = e.displayName, e || (e = n.displayName || n.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case k:
          return n = e.displayName || null, n !== null ? n : j(e.type) || "Memo";
        case q:
          n = e._payload, e = e._init;
          try {
            return j(e(n));
          } catch {
          }
      }
    return null;
  }
  var $ = Array.isArray, M = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, R = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, B = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, K = [], ee = -1;
  function D(e) {
    return { current: e };
  }
  function V(e) {
    0 > ee || (e.current = K[ee], K[ee] = null, ee--);
  }
  function ne(e, n) {
    ee++, K[ee] = e.current, e.current = n;
  }
  var H = D(null), E = D(null), U = D(null), G = D(null);
  function J(e, n) {
    switch (ne(U, n), ne(E, e), ne(H, null), n.nodeType) {
      case 9:
      case 11:
        e = (e = n.documentElement) && (e = e.namespaceURI) ? Rp(e) : 0;
        break;
      default:
        if (e = n.tagName, n = n.namespaceURI)
          n = Rp(n), e = kp(n, e);
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
    V(H), ne(H, e);
  }
  function Z() {
    V(H), V(E), V(U);
  }
  function se(e) {
    e.memoizedState !== null && ne(G, e);
    var n = H.current, a = kp(n, e.type);
    n !== a && (ne(E, e), ne(H, a));
  }
  function me(e) {
    E.current === e && (V(H), V(E)), G.current === e && (V(G), Cr._currentValue = B);
  }
  var ge, xe;
  function Ee(e) {
    if (ge === void 0)
      try {
        throw Error();
      } catch (a) {
        var n = a.stack.trim().match(/\n( *(at )?)/);
        ge = n && n[1] || "", xe = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + ge + e + xe;
  }
  var Ce = !1;
  function Ae(e, n) {
    if (!e || Ce) return "";
    Ce = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function() {
          try {
            if (n) {
              var he = function() {
                throw Error();
              };
              if (Object.defineProperty(he.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(he, []);
                } catch (ue) {
                  var le = ue;
                }
                Reflect.construct(e, [], he);
              } else {
                try {
                  he.call();
                } catch (ue) {
                  le = ue;
                }
                e.call(he.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (ue) {
                le = ue;
              }
              (he = e()) && typeof he.catch == "function" && he.catch(function() {
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
      var h = l.DetermineComponentFrameRoot(), S = h[0], z = h[1];
      if (S && z) {
        var P = S.split(`
`), re = z.split(`
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
      Ce = !1, Error.prepareStackTrace = a;
    }
    return (a = e ? e.displayName || e.name : "") ? Ee(a) : "";
  }
  function Ie(e, n) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Ee(e.type);
      case 16:
        return Ee("Lazy");
      case 13:
        return e.child !== n && n !== null ? Ee("Suspense Fallback") : Ee("Suspense");
      case 19:
        return Ee("SuspenseList");
      case 0:
      case 15:
        return Ae(e.type, !1);
      case 11:
        return Ae(e.type.render, !1);
      case 1:
        return Ae(e.type, !0);
      case 31:
        return Ee("Activity");
      default:
        return "";
    }
  }
  function Ve(e) {
    try {
      var n = "", a = null;
      do
        n += Ie(e, a), a = e, e = e.return;
      while (e);
      return n;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var ot = Object.prototype.hasOwnProperty, ut = t.unstable_scheduleCallback, jt = t.unstable_cancelCallback, Wt = t.unstable_shouldYield, kn = t.unstable_requestPaint, yt = t.unstable_now, fi = t.unstable_getCurrentPriorityLevel, sn = t.unstable_ImmediatePriority, Sn = t.unstable_UserBlockingPriority, Hn = t.unstable_NormalPriority, zo = t.unstable_LowPriority, di = t.unstable_IdlePriority, Ro = t.log, ko = t.unstable_setDisableYieldValue, fe = null, pe = null;
  function _e(e) {
    if (typeof Ro == "function" && ko(e), pe && typeof pe.setStrictMode == "function")
      try {
        pe.setStrictMode(fe, e);
      } catch {
      }
  }
  var De = Math.clz32 ? Math.clz32 : Ho, Vt = Math.log, En = Math.LN2;
  function Ho(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Vt(e) / En | 0) | 0;
  }
  var Ta = 256, Da = 262144, ja = 4194304;
  function Ln(e) {
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
  function Aa(e, n, a) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var f = 0, h = e.suspendedLanes, S = e.pingedLanes;
    e = e.warmLanes;
    var z = l & 134217727;
    return z !== 0 ? (l = z & ~h, l !== 0 ? f = Ln(l) : (S &= z, S !== 0 ? f = Ln(S) : a || (a = z & ~e, a !== 0 && (f = Ln(a))))) : (z = l & ~h, z !== 0 ? f = Ln(z) : S !== 0 ? f = Ln(S) : a || (a = l & ~e, a !== 0 && (f = Ln(a)))), f === 0 ? 0 : n !== 0 && n !== f && (n & h) === 0 && (h = f & -f, a = n & -n, h >= a || h === 32 && (a & 4194048) !== 0) ? n : f;
  }
  function Gi(e, n) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & n) === 0;
  }
  function Ku(e, n) {
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
  function yl() {
    var e = ja;
    return ja <<= 1, (ja & 62914560) === 0 && (ja = 4194304), e;
  }
  function Lo(e) {
    for (var n = [], a = 0; 31 > a; a++) n.push(e);
    return n;
  }
  function Zi(e, n) {
    e.pendingLanes |= n, n !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Qu(e, n, a, l, f, h) {
    var S = e.pendingLanes;
    e.pendingLanes = a, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= a, e.entangledLanes &= a, e.errorRecoveryDisabledLanes &= a, e.shellSuspendCounter = 0;
    var z = e.entanglements, P = e.expirationTimes, re = e.hiddenUpdates;
    for (a = S & ~a; 0 < a; ) {
      var ce = 31 - De(a), he = 1 << ce;
      z[ce] = 0, P[ce] = -1;
      var le = re[ce];
      if (le !== null)
        for (re[ce] = null, ce = 0; ce < le.length; ce++) {
          var ue = le[ce];
          ue !== null && (ue.lane &= -536870913);
        }
      a &= ~he;
    }
    l !== 0 && vl(e, l, 0), h !== 0 && f === 0 && e.tag !== 0 && (e.suspendedLanes |= h & ~(S & ~n));
  }
  function vl(e, n, a) {
    e.pendingLanes |= n, e.suspendedLanes &= ~n;
    var l = 31 - De(n);
    e.entangledLanes |= n, e.entanglements[l] = e.entanglements[l] | 1073741824 | a & 261930;
  }
  function bl(e, n) {
    var a = e.entangledLanes |= n;
    for (e = e.entanglements; a; ) {
      var l = 31 - De(a), f = 1 << l;
      f & n | e[l] & n && (e[l] |= n), a &= ~f;
    }
  }
  function xl(e, n) {
    var a = n & -n;
    return a = (a & 42) !== 0 ? 1 : Bo(a), (a & (e.suspendedLanes | n)) !== 0 ? 0 : a;
  }
  function Bo(e) {
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
  function Io(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function wl() {
    var e = R.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : ay(e.type));
  }
  function Sl(e, n) {
    var a = R.p;
    try {
      return R.p = e, n();
    } finally {
      R.p = a;
    }
  }
  var _n = Math.random().toString(36).slice(2), vt = "__reactFiber$" + _n, Ct = "__reactProps$" + _n, Bn = "__reactContainer$" + _n, Oa = "__reactEvents$" + _n, El = "__reactListeners$" + _n, Fu = "__reactHandles$" + _n, _l = "__reactResources$" + _n, Ki = "__reactMarker$" + _n;
  function Vo(e) {
    delete e[vt], delete e[Ct], delete e[Oa], delete e[El], delete e[Fu];
  }
  function hi(e) {
    var n = e[vt];
    if (n) return n;
    for (var a = e.parentNode; a; ) {
      if (n = a[Bn] || a[vt]) {
        if (a = n.alternate, n.child !== null || a !== null && a.child !== null)
          for (e = Yp(e); e !== null; ) {
            if (a = e[vt]) return a;
            e = Yp(e);
          }
        return n;
      }
      e = a, a = e.parentNode;
    }
    return null;
  }
  function mi(e) {
    if (e = e[vt] || e[Bn]) {
      var n = e.tag;
      if (n === 5 || n === 6 || n === 13 || n === 31 || n === 26 || n === 27 || n === 3)
        return e;
    }
    return null;
  }
  function gi(e) {
    var n = e.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return e.stateNode;
    throw Error(r(33));
  }
  function pi(e) {
    var n = e[_l];
    return n || (n = e[_l] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function ct(e) {
    e[Ki] = !0;
  }
  var Nl = /* @__PURE__ */ new Set(), Cl = {};
  function In(e, n) {
    yi(e, n), yi(e + "Capture", n);
  }
  function yi(e, n) {
    for (Cl[e] = n, e = 0; e < n.length; e++)
      Nl.add(n[e]);
  }
  var Wu = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Uo = {}, Ml = {};
  function Ju(e) {
    return ot.call(Ml, e) ? !0 : ot.call(Uo, e) ? !1 : Wu.test(e) ? Ml[e] = !0 : (Uo[e] = !0, !1);
  }
  function za(e, n, a) {
    if (Ju(n))
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
  function un(e, n, a, l) {
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
  function At(e) {
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
  function Tl(e) {
    var n = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function Pu(e, n, a) {
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
        set: function(S) {
          a = "" + S, h.call(this, S);
        }
      }), Object.defineProperty(e, n, {
        enumerable: l.enumerable
      }), {
        getValue: function() {
          return a;
        },
        setValue: function(S) {
          a = "" + S;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[n];
        }
      };
    }
  }
  function ka(e) {
    if (!e._valueTracker) {
      var n = Tl(e) ? "checked" : "value";
      e._valueTracker = Pu(
        e,
        n,
        "" + e[n]
      );
    }
  }
  function Dl(e) {
    if (!e) return !1;
    var n = e._valueTracker;
    if (!n) return !0;
    var a = n.getValue(), l = "";
    return e && (l = Tl(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== a ? (n.setValue(e), !0) : !1;
  }
  function Qi(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var ec = /[\n"\\]/g;
  function Ot(e) {
    return e.replace(
      ec,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Fi(e, n, a, l, f, h, S, z) {
    e.name = "", S != null && typeof S != "function" && typeof S != "symbol" && typeof S != "boolean" ? e.type = S : e.removeAttribute("type"), n != null ? S === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + At(n)) : e.value !== "" + At(n) && (e.value = "" + At(n)) : S !== "submit" && S !== "reset" || e.removeAttribute("value"), n != null ? Yo(e, S, At(n)) : a != null ? Yo(e, S, At(a)) : l != null && e.removeAttribute("value"), f == null && h != null && (e.defaultChecked = !!h), f != null && (e.checked = f && typeof f != "function" && typeof f != "symbol"), z != null && typeof z != "function" && typeof z != "symbol" && typeof z != "boolean" ? e.name = "" + At(z) : e.removeAttribute("name");
  }
  function jl(e, n, a, l, f, h, S, z) {
    if (h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" && (e.type = h), n != null || a != null) {
      if (!(h !== "submit" && h !== "reset" || n != null)) {
        ka(e);
        return;
      }
      a = a != null ? "" + At(a) : "", n = n != null ? "" + At(n) : a, z || n === e.value || (e.value = n), e.defaultValue = n;
    }
    l = l ?? f, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = z ? e.checked : !!l, e.defaultChecked = !!l, S != null && typeof S != "function" && typeof S != "symbol" && typeof S != "boolean" && (e.name = S), ka(e);
  }
  function Yo(e, n, a) {
    n === "number" && Qi(e.ownerDocument) === e || e.defaultValue === "" + a || (e.defaultValue = "" + a);
  }
  function Vn(e, n, a, l) {
    if (e = e.options, n) {
      n = {};
      for (var f = 0; f < a.length; f++)
        n["$" + a[f]] = !0;
      for (a = 0; a < e.length; a++)
        f = n.hasOwnProperty("$" + e[a].value), e[a].selected !== f && (e[a].selected = f), f && l && (e[a].defaultSelected = !0);
    } else {
      for (a = "" + At(a), n = null, f = 0; f < e.length; f++) {
        if (e[f].value === a) {
          e[f].selected = !0, l && (e[f].defaultSelected = !0);
          return;
        }
        n !== null || e[f].disabled || (n = e[f]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function Dh(e, n, a) {
    if (n != null && (n = "" + At(n), n !== e.value && (e.value = n), a == null)) {
      e.defaultValue !== n && (e.defaultValue = n);
      return;
    }
    e.defaultValue = a != null ? "" + At(a) : "";
  }
  function jh(e, n, a, l) {
    if (n == null) {
      if (l != null) {
        if (a != null) throw Error(r(92));
        if ($(l)) {
          if (1 < l.length) throw Error(r(93));
          l = l[0];
        }
        a = l;
      }
      a == null && (a = ""), n = a;
    }
    a = At(n), e.defaultValue = a, l = e.textContent, l === a && l !== "" && l !== null && (e.value = l), ka(e);
  }
  function Ha(e, n) {
    if (n) {
      var a = e.firstChild;
      if (a && a === e.lastChild && a.nodeType === 3) {
        a.nodeValue = n;
        return;
      }
    }
    e.textContent = n;
  }
  var qx = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Ah(e, n, a) {
    var l = n.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === "" ? l ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "" : l ? e.setProperty(n, a) : typeof a != "number" || a === 0 || qx.has(n) ? n === "float" ? e.cssFloat = a : e[n] = ("" + a).trim() : e[n] = a + "px";
  }
  function Oh(e, n, a) {
    if (n != null && typeof n != "object")
      throw Error(r(62));
    if (e = e.style, a != null) {
      for (var l in a)
        !a.hasOwnProperty(l) || n != null && n.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "");
      for (var f in n)
        l = n[f], n.hasOwnProperty(f) && a[f] !== l && Ah(e, f, l);
    } else
      for (var h in n)
        n.hasOwnProperty(h) && Ah(e, h, n[h]);
  }
  function tc(e) {
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
  var $x = /* @__PURE__ */ new Map([
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
  ]), Xx = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Al(e) {
    return Xx.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function Un() {
  }
  var nc = null;
  function ic(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var La = null, Ba = null;
  function zh(e) {
    var n = mi(e);
    if (n && (e = n.stateNode)) {
      var a = e[Ct] || null;
      e: switch (e = n.stateNode, n.type) {
        case "input":
          if (Fi(
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
              'input[name="' + Ot(
                "" + n
              ) + '"][type="radio"]'
            ), n = 0; n < a.length; n++) {
              var l = a[n];
              if (l !== e && l.form === e.form) {
                var f = l[Ct] || null;
                if (!f) throw Error(r(90));
                Fi(
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
              l = a[n], l.form === e.form && Dl(l);
          }
          break e;
        case "textarea":
          Dh(e, a.value, a.defaultValue);
          break e;
        case "select":
          n = a.value, n != null && Vn(e, !!a.multiple, n, !1);
      }
    }
  }
  var ac = !1;
  function Rh(e, n, a) {
    if (ac) return e(n, a);
    ac = !0;
    try {
      var l = e(n);
      return l;
    } finally {
      if (ac = !1, (La !== null || Ba !== null) && (vs(), La && (n = La, e = Ba, Ba = La = null, zh(n), e)))
        for (n = 0; n < e.length; n++) zh(e[n]);
    }
  }
  function qo(e, n) {
    var a = e.stateNode;
    if (a === null) return null;
    var l = a[Ct] || null;
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
  var Yn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), oc = !1;
  if (Yn)
    try {
      var $o = {};
      Object.defineProperty($o, "passive", {
        get: function() {
          oc = !0;
        }
      }), window.addEventListener("test", $o, $o), window.removeEventListener("test", $o, $o);
    } catch {
      oc = !1;
    }
  var vi = null, rc = null, Ol = null;
  function kh() {
    if (Ol) return Ol;
    var e, n = rc, a = n.length, l, f = "value" in vi ? vi.value : vi.textContent, h = f.length;
    for (e = 0; e < a && n[e] === f[e]; e++) ;
    var S = a - e;
    for (l = 1; l <= S && n[a - l] === f[h - l]; l++) ;
    return Ol = f.slice(e, 1 < l ? 1 - l : void 0);
  }
  function zl(e) {
    var n = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && n === 13 && (e = 13)) : e = n, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Rl() {
    return !0;
  }
  function Hh() {
    return !1;
  }
  function zt(e) {
    function n(a, l, f, h, S) {
      this._reactName = a, this._targetInst = f, this.type = l, this.nativeEvent = h, this.target = S, this.currentTarget = null;
      for (var z in e)
        e.hasOwnProperty(z) && (a = e[z], this[z] = a ? a(h) : h[z]);
      return this.isDefaultPrevented = (h.defaultPrevented != null ? h.defaultPrevented : h.returnValue === !1) ? Rl : Hh, this.isPropagationStopped = Hh, this;
    }
    return y(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var a = this.nativeEvent;
        a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = Rl);
      },
      stopPropagation: function() {
        var a = this.nativeEvent;
        a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = Rl);
      },
      persist: function() {
      },
      isPersistent: Rl
    }), n;
  }
  var Wi = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, kl = zt(Wi), Xo = y({}, Wi, { view: 0, detail: 0 }), Gx = zt(Xo), lc, sc, Go, Hl = y({}, Xo, {
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
    getModifierState: cc,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Go && (Go && e.type === "mousemove" ? (lc = e.screenX - Go.screenX, sc = e.screenY - Go.screenY) : sc = lc = 0, Go = e), lc);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : sc;
    }
  }), Lh = zt(Hl), Zx = y({}, Hl, { dataTransfer: 0 }), Kx = zt(Zx), Qx = y({}, Xo, { relatedTarget: 0 }), uc = zt(Qx), Fx = y({}, Wi, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Wx = zt(Fx), Jx = y({}, Wi, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), Px = zt(Jx), e1 = y({}, Wi, { data: 0 }), Bh = zt(e1), t1 = {
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
  }, n1 = {
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
  }, i1 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function a1(e) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(e) : (e = i1[e]) ? !!n[e] : !1;
  }
  function cc() {
    return a1;
  }
  var o1 = y({}, Xo, {
    key: function(e) {
      if (e.key) {
        var n = t1[e.key] || e.key;
        if (n !== "Unidentified") return n;
      }
      return e.type === "keypress" ? (e = zl(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? n1[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: cc,
    charCode: function(e) {
      return e.type === "keypress" ? zl(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? zl(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), r1 = zt(o1), l1 = y({}, Hl, {
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
  }), Ih = zt(l1), s1 = y({}, Xo, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: cc
  }), u1 = zt(s1), c1 = y({}, Wi, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), f1 = zt(c1), d1 = y({}, Hl, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), h1 = zt(d1), m1 = y({}, Wi, {
    newState: 0,
    oldState: 0
  }), g1 = zt(m1), p1 = [9, 13, 27, 32], fc = Yn && "CompositionEvent" in window, Zo = null;
  Yn && "documentMode" in document && (Zo = document.documentMode);
  var y1 = Yn && "TextEvent" in window && !Zo, Vh = Yn && (!fc || Zo && 8 < Zo && 11 >= Zo), Uh = " ", Yh = !1;
  function qh(e, n) {
    switch (e) {
      case "keyup":
        return p1.indexOf(n.keyCode) !== -1;
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
  function $h(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Ia = !1;
  function v1(e, n) {
    switch (e) {
      case "compositionend":
        return $h(n);
      case "keypress":
        return n.which !== 32 ? null : (Yh = !0, Uh);
      case "textInput":
        return e = n.data, e === Uh && Yh ? null : e;
      default:
        return null;
    }
  }
  function b1(e, n) {
    if (Ia)
      return e === "compositionend" || !fc && qh(e, n) ? (e = kh(), Ol = rc = vi = null, Ia = !1, e) : null;
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
        return Vh && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var x1 = {
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
  function Xh(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n === "input" ? !!x1[e.type] : n === "textarea";
  }
  function Gh(e, n, a, l) {
    La ? Ba ? Ba.push(l) : Ba = [l] : La = l, n = Ns(n, "onChange"), 0 < n.length && (a = new kl(
      "onChange",
      "change",
      null,
      a,
      l
    ), e.push({ event: a, listeners: n }));
  }
  var Ko = null, Qo = null;
  function w1(e) {
    Tp(e, 0);
  }
  function Ll(e) {
    var n = gi(e);
    if (Dl(n)) return e;
  }
  function Zh(e, n) {
    if (e === "change") return n;
  }
  var Kh = !1;
  if (Yn) {
    var dc;
    if (Yn) {
      var hc = "oninput" in document;
      if (!hc) {
        var Qh = document.createElement("div");
        Qh.setAttribute("oninput", "return;"), hc = typeof Qh.oninput == "function";
      }
      dc = hc;
    } else dc = !1;
    Kh = dc && (!document.documentMode || 9 < document.documentMode);
  }
  function Fh() {
    Ko && (Ko.detachEvent("onpropertychange", Wh), Qo = Ko = null);
  }
  function Wh(e) {
    if (e.propertyName === "value" && Ll(Qo)) {
      var n = [];
      Gh(
        n,
        Qo,
        e,
        ic(e)
      ), Rh(w1, n);
    }
  }
  function S1(e, n, a) {
    e === "focusin" ? (Fh(), Ko = n, Qo = a, Ko.attachEvent("onpropertychange", Wh)) : e === "focusout" && Fh();
  }
  function E1(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Ll(Qo);
  }
  function _1(e, n) {
    if (e === "click") return Ll(n);
  }
  function N1(e, n) {
    if (e === "input" || e === "change")
      return Ll(n);
  }
  function C1(e, n) {
    return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
  }
  var Ut = typeof Object.is == "function" ? Object.is : C1;
  function Fo(e, n) {
    if (Ut(e, n)) return !0;
    if (typeof e != "object" || e === null || typeof n != "object" || n === null)
      return !1;
    var a = Object.keys(e), l = Object.keys(n);
    if (a.length !== l.length) return !1;
    for (l = 0; l < a.length; l++) {
      var f = a[l];
      if (!ot.call(n, f) || !Ut(e[f], n[f]))
        return !1;
    }
    return !0;
  }
  function Jh(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Ph(e, n) {
    var a = Jh(e);
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
      a = Jh(a);
    }
  }
  function em(e, n) {
    return e && n ? e === n ? !0 : e && e.nodeType === 3 ? !1 : n && n.nodeType === 3 ? em(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function tm(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var n = Qi(e.document); n instanceof e.HTMLIFrameElement; ) {
      try {
        var a = typeof n.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) e = n.contentWindow;
      else break;
      n = Qi(e.document);
    }
    return n;
  }
  function mc(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n && (n === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || n === "textarea" || e.contentEditable === "true");
  }
  var M1 = Yn && "documentMode" in document && 11 >= document.documentMode, Va = null, gc = null, Wo = null, pc = !1;
  function nm(e, n, a) {
    var l = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    pc || Va == null || Va !== Qi(l) || (l = Va, "selectionStart" in l && mc(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), Wo && Fo(Wo, l) || (Wo = l, l = Ns(gc, "onSelect"), 0 < l.length && (n = new kl(
      "onSelect",
      "select",
      null,
      n,
      a
    ), e.push({ event: n, listeners: l }), n.target = Va)));
  }
  function Ji(e, n) {
    var a = {};
    return a[e.toLowerCase()] = n.toLowerCase(), a["Webkit" + e] = "webkit" + n, a["Moz" + e] = "moz" + n, a;
  }
  var Ua = {
    animationend: Ji("Animation", "AnimationEnd"),
    animationiteration: Ji("Animation", "AnimationIteration"),
    animationstart: Ji("Animation", "AnimationStart"),
    transitionrun: Ji("Transition", "TransitionRun"),
    transitionstart: Ji("Transition", "TransitionStart"),
    transitioncancel: Ji("Transition", "TransitionCancel"),
    transitionend: Ji("Transition", "TransitionEnd")
  }, yc = {}, im = {};
  Yn && (im = document.createElement("div").style, "AnimationEvent" in window || (delete Ua.animationend.animation, delete Ua.animationiteration.animation, delete Ua.animationstart.animation), "TransitionEvent" in window || delete Ua.transitionend.transition);
  function Pi(e) {
    if (yc[e]) return yc[e];
    if (!Ua[e]) return e;
    var n = Ua[e], a;
    for (a in n)
      if (n.hasOwnProperty(a) && a in im)
        return yc[e] = n[a];
    return e;
  }
  var am = Pi("animationend"), om = Pi("animationiteration"), rm = Pi("animationstart"), T1 = Pi("transitionrun"), D1 = Pi("transitionstart"), j1 = Pi("transitioncancel"), lm = Pi("transitionend"), sm = /* @__PURE__ */ new Map(), vc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  vc.push("scrollEnd");
  function cn(e, n) {
    sm.set(e, n), In(n, [e]);
  }
  var Bl = typeof reportError == "function" ? reportError : function(e) {
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
  }, Jt = [], Ya = 0, bc = 0;
  function Il() {
    for (var e = Ya, n = bc = Ya = 0; n < e; ) {
      var a = Jt[n];
      Jt[n++] = null;
      var l = Jt[n];
      Jt[n++] = null;
      var f = Jt[n];
      Jt[n++] = null;
      var h = Jt[n];
      if (Jt[n++] = null, l !== null && f !== null) {
        var S = l.pending;
        S === null ? f.next = f : (f.next = S.next, S.next = f), l.pending = f;
      }
      h !== 0 && um(a, f, h);
    }
  }
  function Vl(e, n, a, l) {
    Jt[Ya++] = e, Jt[Ya++] = n, Jt[Ya++] = a, Jt[Ya++] = l, bc |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function xc(e, n, a, l) {
    return Vl(e, n, a, l), Ul(e);
  }
  function ea(e, n) {
    return Vl(e, null, null, n), Ul(e);
  }
  function um(e, n, a) {
    e.lanes |= a;
    var l = e.alternate;
    l !== null && (l.lanes |= a);
    for (var f = !1, h = e.return; h !== null; )
      h.childLanes |= a, l = h.alternate, l !== null && (l.childLanes |= a), h.tag === 22 && (e = h.stateNode, e === null || e._visibility & 1 || (f = !0)), e = h, h = h.return;
    return e.tag === 3 ? (h = e.stateNode, f && n !== null && (f = 31 - De(a), e = h.hiddenUpdates, l = e[f], l === null ? e[f] = [n] : l.push(n), n.lane = a | 536870912), h) : null;
  }
  function Ul(e) {
    if (50 < br)
      throw br = 0, jf = null, Error(r(185));
    for (var n = e.return; n !== null; )
      e = n, n = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var qa = {};
  function A1(e, n, a, l) {
    this.tag = e, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Yt(e, n, a, l) {
    return new A1(e, n, a, l);
  }
  function wc(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function qn(e, n) {
    var a = e.alternate;
    return a === null ? (a = Yt(
      e.tag,
      n,
      e.key,
      e.mode
    ), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a.alternate = e, e.alternate = a) : (a.pendingProps = n, a.type = e.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null), a.flags = e.flags & 65011712, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue, n = e.dependencies, a.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.refCleanup = e.refCleanup, a;
  }
  function cm(e, n) {
    e.flags &= 65011714;
    var a = e.alternate;
    return a === null ? (e.childLanes = 0, e.lanes = n, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type, n = a.dependencies, e.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), e;
  }
  function Yl(e, n, a, l, f, h) {
    var S = 0;
    if (l = e, typeof e == "function") wc(e) && (S = 1);
    else if (typeof e == "string")
      S = Hw(
        e,
        a,
        H.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case te:
          return e = Yt(31, a, n, f), e.elementType = te, e.lanes = h, e;
        case _:
          return ta(a.children, f, h, n);
        case T:
          S = 8, f |= 24;
          break;
        case A:
          return e = Yt(12, a, n, f | 2), e.elementType = A, e.lanes = h, e;
        case I:
          return e = Yt(13, a, n, f), e.elementType = I, e.lanes = h, e;
        case L:
          return e = Yt(19, a, n, f), e.elementType = L, e.lanes = h, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case N:
                S = 10;
                break e;
              case O:
                S = 9;
                break e;
              case C:
                S = 11;
                break e;
              case k:
                S = 14;
                break e;
              case q:
                S = 16, l = null;
                break e;
            }
          S = 29, a = Error(
            r(130, e === null ? "null" : typeof e, "")
          ), l = null;
      }
    return n = Yt(S, a, n, f), n.elementType = e, n.type = l, n.lanes = h, n;
  }
  function ta(e, n, a, l) {
    return e = Yt(7, e, l, n), e.lanes = a, e;
  }
  function Sc(e, n, a) {
    return e = Yt(6, e, null, n), e.lanes = a, e;
  }
  function fm(e) {
    var n = Yt(18, null, null, 0);
    return n.stateNode = e, n;
  }
  function Ec(e, n, a) {
    return n = Yt(
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
  var dm = /* @__PURE__ */ new WeakMap();
  function Pt(e, n) {
    if (typeof e == "object" && e !== null) {
      var a = dm.get(e);
      return a !== void 0 ? a : (n = {
        value: e,
        source: n,
        stack: Ve(n)
      }, dm.set(e, n), n);
    }
    return {
      value: e,
      source: n,
      stack: Ve(n)
    };
  }
  var $a = [], Xa = 0, ql = null, Jo = 0, en = [], tn = 0, bi = null, Nn = 1, Cn = "";
  function $n(e, n) {
    $a[Xa++] = Jo, $a[Xa++] = ql, ql = e, Jo = n;
  }
  function hm(e, n, a) {
    en[tn++] = Nn, en[tn++] = Cn, en[tn++] = bi, bi = e;
    var l = Nn;
    e = Cn;
    var f = 32 - De(l) - 1;
    l &= ~(1 << f), a += 1;
    var h = 32 - De(n) + f;
    if (30 < h) {
      var S = f - f % 5;
      h = (l & (1 << S) - 1).toString(32), l >>= S, f -= S, Nn = 1 << 32 - De(n) + f | a << f | l, Cn = h + e;
    } else
      Nn = 1 << h | a << f | l, Cn = e;
  }
  function _c(e) {
    e.return !== null && ($n(e, 1), hm(e, 1, 0));
  }
  function Nc(e) {
    for (; e === ql; )
      ql = $a[--Xa], $a[Xa] = null, Jo = $a[--Xa], $a[Xa] = null;
    for (; e === bi; )
      bi = en[--tn], en[tn] = null, Cn = en[--tn], en[tn] = null, Nn = en[--tn], en[tn] = null;
  }
  function mm(e, n) {
    en[tn++] = Nn, en[tn++] = Cn, en[tn++] = bi, Nn = n.id, Cn = n.overflow, bi = e;
  }
  var St = null, Je = null, Le = !1, xi = null, nn = !1, Cc = Error(r(519));
  function wi(e) {
    var n = Error(
      r(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Po(Pt(n, e)), Cc;
  }
  function gm(e) {
    var n = e.stateNode, a = e.type, l = e.memoizedProps;
    switch (n[vt] = e, n[Ct] = l, a) {
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
        for (a = 0; a < wr.length; a++)
          ze(wr[a], n);
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
        ze("invalid", n), jl(
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
        ze("invalid", n), jh(n, l.value, l.defaultValue, l.children);
    }
    a = l.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || n.textContent === "" + a || l.suppressHydrationWarning === !0 || Op(n.textContent, a) ? (l.popover != null && (ze("beforetoggle", n), ze("toggle", n)), l.onScroll != null && ze("scroll", n), l.onScrollEnd != null && ze("scrollend", n), l.onClick != null && (n.onclick = Un), n = !0) : n = !1, n || wi(e, !0);
  }
  function pm(e) {
    for (St = e.return; St; )
      switch (St.tag) {
        case 5:
        case 31:
        case 13:
          nn = !1;
          return;
        case 27:
        case 3:
          nn = !0;
          return;
        default:
          St = St.return;
      }
  }
  function Ga(e) {
    if (e !== St) return !1;
    if (!Le) return pm(e), Le = !0, !1;
    var n = e.tag, a;
    if ((a = n !== 3 && n !== 27) && ((a = n === 5) && (a = e.type, a = !(a !== "form" && a !== "button") || Xf(e.type, e.memoizedProps)), a = !a), a && Je && wi(e), pm(e), n === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(r(317));
      Je = Up(e);
    } else if (n === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(r(317));
      Je = Up(e);
    } else
      n === 27 ? (n = Je, ki(e.type) ? (e = Ff, Ff = null, Je = e) : Je = n) : Je = St ? on(e.stateNode.nextSibling) : null;
    return !0;
  }
  function na() {
    Je = St = null, Le = !1;
  }
  function Mc() {
    var e = xi;
    return e !== null && (Lt === null ? Lt = e : Lt.push.apply(
      Lt,
      e
    ), xi = null), e;
  }
  function Po(e) {
    xi === null ? xi = [e] : xi.push(e);
  }
  var Tc = D(null), ia = null, Xn = null;
  function Si(e, n, a) {
    ne(Tc, n._currentValue), n._currentValue = a;
  }
  function Gn(e) {
    e._currentValue = Tc.current, V(Tc);
  }
  function Dc(e, n, a) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & n) !== n ? (e.childLanes |= n, l !== null && (l.childLanes |= n)) : l !== null && (l.childLanes & n) !== n && (l.childLanes |= n), e === a) break;
      e = e.return;
    }
  }
  function jc(e, n, a, l) {
    var f = e.child;
    for (f !== null && (f.return = e); f !== null; ) {
      var h = f.dependencies;
      if (h !== null) {
        var S = f.child;
        h = h.firstContext;
        e: for (; h !== null; ) {
          var z = h;
          h = f;
          for (var P = 0; P < n.length; P++)
            if (z.context === n[P]) {
              h.lanes |= a, z = h.alternate, z !== null && (z.lanes |= a), Dc(
                h.return,
                a,
                e
              ), l || (S = null);
              break e;
            }
          h = z.next;
        }
      } else if (f.tag === 18) {
        if (S = f.return, S === null) throw Error(r(341));
        S.lanes |= a, h = S.alternate, h !== null && (h.lanes |= a), Dc(S, a, e), S = null;
      } else S = f.child;
      if (S !== null) S.return = f;
      else
        for (S = f; S !== null; ) {
          if (S === e) {
            S = null;
            break;
          }
          if (f = S.sibling, f !== null) {
            f.return = S.return, S = f;
            break;
          }
          S = S.return;
        }
      f = S;
    }
  }
  function Za(e, n, a, l) {
    e = null;
    for (var f = n, h = !1; f !== null; ) {
      if (!h) {
        if ((f.flags & 524288) !== 0) h = !0;
        else if ((f.flags & 262144) !== 0) break;
      }
      if (f.tag === 10) {
        var S = f.alternate;
        if (S === null) throw Error(r(387));
        if (S = S.memoizedProps, S !== null) {
          var z = f.type;
          Ut(f.pendingProps.value, S.value) || (e !== null ? e.push(z) : e = [z]);
        }
      } else if (f === G.current) {
        if (S = f.alternate, S === null) throw Error(r(387));
        S.memoizedState.memoizedState !== f.memoizedState.memoizedState && (e !== null ? e.push(Cr) : e = [Cr]);
      }
      f = f.return;
    }
    e !== null && jc(
      n,
      e,
      a,
      l
    ), n.flags |= 262144;
  }
  function $l(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Ut(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function aa(e) {
    ia = e, Xn = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function Et(e) {
    return ym(ia, e);
  }
  function Xl(e, n) {
    return ia === null && aa(e), ym(e, n);
  }
  function ym(e, n) {
    var a = n._currentValue;
    if (n = { context: n, memoizedValue: a, next: null }, Xn === null) {
      if (e === null) throw Error(r(308));
      Xn = n, e.dependencies = { lanes: 0, firstContext: n }, e.flags |= 524288;
    } else Xn = Xn.next = n;
    return a;
  }
  var O1 = typeof AbortController < "u" ? AbortController : function() {
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
  }, z1 = t.unstable_scheduleCallback, R1 = t.unstable_NormalPriority, ft = {
    $$typeof: N,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Ac() {
    return {
      controller: new O1(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function er(e) {
    e.refCount--, e.refCount === 0 && z1(R1, function() {
      e.controller.abort();
    });
  }
  var tr = null, Oc = 0, Ka = 0, Qa = null;
  function k1(e, n) {
    if (tr === null) {
      var a = tr = [];
      Oc = 0, Ka = Hf(), Qa = {
        status: "pending",
        value: void 0,
        then: function(l) {
          a.push(l);
        }
      };
    }
    return Oc++, n.then(vm, vm), n;
  }
  function vm() {
    if (--Oc === 0 && tr !== null) {
      Qa !== null && (Qa.status = "fulfilled");
      var e = tr;
      tr = null, Ka = 0, Qa = null;
      for (var n = 0; n < e.length; n++) (0, e[n])();
    }
  }
  function H1(e, n) {
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
  var bm = M.S;
  M.S = function(e, n) {
    np = yt(), typeof n == "object" && n !== null && typeof n.then == "function" && k1(e, n), bm !== null && bm(e, n);
  };
  var oa = D(null);
  function zc() {
    var e = oa.current;
    return e !== null ? e : We.pooledCache;
  }
  function Gl(e, n) {
    n === null ? ne(oa, oa.current) : ne(oa, n.pool);
  }
  function xm() {
    var e = zc();
    return e === null ? null : { parent: ft._currentValue, pool: e };
  }
  var Fa = Error(r(460)), Rc = Error(r(474)), Zl = Error(r(542)), Kl = { then: function() {
  } };
  function wm(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Sm(e, n, a) {
    switch (a = e[a], a === void 0 ? e.push(n) : a !== n && (n.then(Un, Un), n = a), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw e = n.reason, _m(e), e;
      default:
        if (typeof n.status == "string") n.then(Un, Un);
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
            throw e = n.reason, _m(e), e;
        }
        throw la = n, Fa;
    }
  }
  function ra(e) {
    try {
      var n = e._init;
      return n(e._payload);
    } catch (a) {
      throw a !== null && typeof a == "object" && typeof a.then == "function" ? (la = a, Fa) : a;
    }
  }
  var la = null;
  function Em() {
    if (la === null) throw Error(r(459));
    var e = la;
    return la = null, e;
  }
  function _m(e) {
    if (e === Fa || e === Zl)
      throw Error(r(483));
  }
  var Wa = null, nr = 0;
  function Ql(e) {
    var n = nr;
    return nr += 1, Wa === null && (Wa = []), Sm(Wa, e, n);
  }
  function ir(e, n) {
    n = n.props.ref, e.ref = n !== void 0 ? n : null;
  }
  function Fl(e, n) {
    throw n.$$typeof === v ? Error(r(525)) : (e = Object.prototype.toString.call(n), Error(
      r(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : e
      )
    ));
  }
  function Nm(e) {
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
      return ae = qn(ae, ie), ae.index = 0, ae.sibling = null, ae;
    }
    function h(ae, ie, oe) {
      return ae.index = oe, e ? (oe = ae.alternate, oe !== null ? (oe = oe.index, oe < ie ? (ae.flags |= 67108866, ie) : oe) : (ae.flags |= 67108866, ie)) : (ae.flags |= 1048576, ie);
    }
    function S(ae) {
      return e && ae.alternate === null && (ae.flags |= 67108866), ae;
    }
    function z(ae, ie, oe, de) {
      return ie === null || ie.tag !== 6 ? (ie = Sc(oe, ae.mode, de), ie.return = ae, ie) : (ie = f(ie, oe), ie.return = ae, ie);
    }
    function P(ae, ie, oe, de) {
      var Se = oe.type;
      return Se === _ ? ce(
        ae,
        ie,
        oe.props.children,
        de,
        oe.key
      ) : ie !== null && (ie.elementType === Se || typeof Se == "object" && Se !== null && Se.$$typeof === q && ra(Se) === ie.type) ? (ie = f(ie, oe.props), ir(ie, oe), ie.return = ae, ie) : (ie = Yl(
        oe.type,
        oe.key,
        oe.props,
        null,
        ae.mode,
        de
      ), ir(ie, oe), ie.return = ae, ie);
    }
    function re(ae, ie, oe, de) {
      return ie === null || ie.tag !== 4 || ie.stateNode.containerInfo !== oe.containerInfo || ie.stateNode.implementation !== oe.implementation ? (ie = Ec(oe, ae.mode, de), ie.return = ae, ie) : (ie = f(ie, oe.children || []), ie.return = ae, ie);
    }
    function ce(ae, ie, oe, de, Se) {
      return ie === null || ie.tag !== 7 ? (ie = ta(
        oe,
        ae.mode,
        de,
        Se
      ), ie.return = ae, ie) : (ie = f(ie, oe), ie.return = ae, ie);
    }
    function he(ae, ie, oe) {
      if (typeof ie == "string" && ie !== "" || typeof ie == "number" || typeof ie == "bigint")
        return ie = Sc(
          "" + ie,
          ae.mode,
          oe
        ), ie.return = ae, ie;
      if (typeof ie == "object" && ie !== null) {
        switch (ie.$$typeof) {
          case x:
            return oe = Yl(
              ie.type,
              ie.key,
              ie.props,
              null,
              ae.mode,
              oe
            ), ir(oe, ie), oe.return = ae, oe;
          case w:
            return ie = Ec(
              ie,
              ae.mode,
              oe
            ), ie.return = ae, ie;
          case q:
            return ie = ra(ie), he(ae, ie, oe);
        }
        if ($(ie) || Q(ie))
          return ie = ta(
            ie,
            ae.mode,
            oe,
            null
          ), ie.return = ae, ie;
        if (typeof ie.then == "function")
          return he(ae, Ql(ie), oe);
        if (ie.$$typeof === N)
          return he(
            ae,
            Xl(ae, ie),
            oe
          );
        Fl(ae, ie);
      }
      return null;
    }
    function le(ae, ie, oe, de) {
      var Se = ie !== null ? ie.key : null;
      if (typeof oe == "string" && oe !== "" || typeof oe == "number" || typeof oe == "bigint")
        return Se !== null ? null : z(ae, ie, "" + oe, de);
      if (typeof oe == "object" && oe !== null) {
        switch (oe.$$typeof) {
          case x:
            return oe.key === Se ? P(ae, ie, oe, de) : null;
          case w:
            return oe.key === Se ? re(ae, ie, oe, de) : null;
          case q:
            return oe = ra(oe), le(ae, ie, oe, de);
        }
        if ($(oe) || Q(oe))
          return Se !== null ? null : ce(ae, ie, oe, de, null);
        if (typeof oe.then == "function")
          return le(
            ae,
            ie,
            Ql(oe),
            de
          );
        if (oe.$$typeof === N)
          return le(
            ae,
            ie,
            Xl(ae, oe),
            de
          );
        Fl(ae, oe);
      }
      return null;
    }
    function ue(ae, ie, oe, de, Se) {
      if (typeof de == "string" && de !== "" || typeof de == "number" || typeof de == "bigint")
        return ae = ae.get(oe) || null, z(ie, ae, "" + de, Se);
      if (typeof de == "object" && de !== null) {
        switch (de.$$typeof) {
          case x:
            return ae = ae.get(
              de.key === null ? oe : de.key
            ) || null, P(ie, ae, de, Se);
          case w:
            return ae = ae.get(
              de.key === null ? oe : de.key
            ) || null, re(ie, ae, de, Se);
          case q:
            return de = ra(de), ue(
              ae,
              ie,
              oe,
              de,
              Se
            );
        }
        if ($(de) || Q(de))
          return ae = ae.get(oe) || null, ce(ie, ae, de, Se, null);
        if (typeof de.then == "function")
          return ue(
            ae,
            ie,
            oe,
            Ql(de),
            Se
          );
        if (de.$$typeof === N)
          return ue(
            ae,
            ie,
            oe,
            Xl(ie, de),
            Se
          );
        Fl(ie, de);
      }
      return null;
    }
    function ye(ae, ie, oe, de) {
      for (var Se = null, Ue = null, ve = ie, je = ie = 0, ke = null; ve !== null && je < oe.length; je++) {
        ve.index > je ? (ke = ve, ve = null) : ke = ve.sibling;
        var Ye = le(
          ae,
          ve,
          oe[je],
          de
        );
        if (Ye === null) {
          ve === null && (ve = ke);
          break;
        }
        e && ve && Ye.alternate === null && n(ae, ve), ie = h(Ye, ie, je), Ue === null ? Se = Ye : Ue.sibling = Ye, Ue = Ye, ve = ke;
      }
      if (je === oe.length)
        return a(ae, ve), Le && $n(ae, je), Se;
      if (ve === null) {
        for (; je < oe.length; je++)
          ve = he(ae, oe[je], de), ve !== null && (ie = h(
            ve,
            ie,
            je
          ), Ue === null ? Se = ve : Ue.sibling = ve, Ue = ve);
        return Le && $n(ae, je), Se;
      }
      for (ve = l(ve); je < oe.length; je++)
        ke = ue(
          ve,
          ae,
          je,
          oe[je],
          de
        ), ke !== null && (e && ke.alternate !== null && ve.delete(
          ke.key === null ? je : ke.key
        ), ie = h(
          ke,
          ie,
          je
        ), Ue === null ? Se = ke : Ue.sibling = ke, Ue = ke);
      return e && ve.forEach(function(Vi) {
        return n(ae, Vi);
      }), Le && $n(ae, je), Se;
    }
    function Ne(ae, ie, oe, de) {
      if (oe == null) throw Error(r(151));
      for (var Se = null, Ue = null, ve = ie, je = ie = 0, ke = null, Ye = oe.next(); ve !== null && !Ye.done; je++, Ye = oe.next()) {
        ve.index > je ? (ke = ve, ve = null) : ke = ve.sibling;
        var Vi = le(ae, ve, Ye.value, de);
        if (Vi === null) {
          ve === null && (ve = ke);
          break;
        }
        e && ve && Vi.alternate === null && n(ae, ve), ie = h(Vi, ie, je), Ue === null ? Se = Vi : Ue.sibling = Vi, Ue = Vi, ve = ke;
      }
      if (Ye.done)
        return a(ae, ve), Le && $n(ae, je), Se;
      if (ve === null) {
        for (; !Ye.done; je++, Ye = oe.next())
          Ye = he(ae, Ye.value, de), Ye !== null && (ie = h(Ye, ie, je), Ue === null ? Se = Ye : Ue.sibling = Ye, Ue = Ye);
        return Le && $n(ae, je), Se;
      }
      for (ve = l(ve); !Ye.done; je++, Ye = oe.next())
        Ye = ue(ve, ae, je, Ye.value, de), Ye !== null && (e && Ye.alternate !== null && ve.delete(Ye.key === null ? je : Ye.key), ie = h(Ye, ie, je), Ue === null ? Se = Ye : Ue.sibling = Ye, Ue = Ye);
      return e && ve.forEach(function(Zw) {
        return n(ae, Zw);
      }), Le && $n(ae, je), Se;
    }
    function Fe(ae, ie, oe, de) {
      if (typeof oe == "object" && oe !== null && oe.type === _ && oe.key === null && (oe = oe.props.children), typeof oe == "object" && oe !== null) {
        switch (oe.$$typeof) {
          case x:
            e: {
              for (var Se = oe.key; ie !== null; ) {
                if (ie.key === Se) {
                  if (Se = oe.type, Se === _) {
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
                  } else if (ie.elementType === Se || typeof Se == "object" && Se !== null && Se.$$typeof === q && ra(Se) === ie.type) {
                    a(
                      ae,
                      ie.sibling
                    ), de = f(ie, oe.props), ir(de, oe), de.return = ae, ae = de;
                    break e;
                  }
                  a(ae, ie);
                  break;
                } else n(ae, ie);
                ie = ie.sibling;
              }
              oe.type === _ ? (de = ta(
                oe.props.children,
                ae.mode,
                de,
                oe.key
              ), de.return = ae, ae = de) : (de = Yl(
                oe.type,
                oe.key,
                oe.props,
                null,
                ae.mode,
                de
              ), ir(de, oe), de.return = ae, ae = de);
            }
            return S(ae);
          case w:
            e: {
              for (Se = oe.key; ie !== null; ) {
                if (ie.key === Se)
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
              de = Ec(oe, ae.mode, de), de.return = ae, ae = de;
            }
            return S(ae);
          case q:
            return oe = ra(oe), Fe(
              ae,
              ie,
              oe,
              de
            );
        }
        if ($(oe))
          return ye(
            ae,
            ie,
            oe,
            de
          );
        if (Q(oe)) {
          if (Se = Q(oe), typeof Se != "function") throw Error(r(150));
          return oe = Se.call(oe), Ne(
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
            Ql(oe),
            de
          );
        if (oe.$$typeof === N)
          return Fe(
            ae,
            ie,
            Xl(ae, oe),
            de
          );
        Fl(ae, oe);
      }
      return typeof oe == "string" && oe !== "" || typeof oe == "number" || typeof oe == "bigint" ? (oe = "" + oe, ie !== null && ie.tag === 6 ? (a(ae, ie.sibling), de = f(ie, oe), de.return = ae, ae = de) : (a(ae, ie), de = Sc(oe, ae.mode, de), de.return = ae, ae = de), S(ae)) : a(ae, ie);
    }
    return function(ae, ie, oe, de) {
      try {
        nr = 0;
        var Se = Fe(
          ae,
          ie,
          oe,
          de
        );
        return Wa = null, Se;
      } catch (ve) {
        if (ve === Fa || ve === Zl) throw ve;
        var Ue = Yt(29, ve, null, ae.mode);
        return Ue.lanes = de, Ue.return = ae, Ue;
      }
    };
  }
  var sa = Nm(!0), Cm = Nm(!1), Ei = !1;
  function kc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Hc(e, n) {
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
      return f === null ? n.next = n : (n.next = f.next, f.next = n), l.pending = n, n = Ul(e), um(e, null, a), n;
    }
    return Vl(e, l, n, a), Ul(e);
  }
  function ar(e, n, a) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (a & 4194048) !== 0)) {
      var l = n.lanes;
      l &= e.pendingLanes, a |= l, n.lanes = a, bl(e, a);
    }
  }
  function Lc(e, n) {
    var a = e.updateQueue, l = e.alternate;
    if (l !== null && (l = l.updateQueue, a === l)) {
      var f = null, h = null;
      if (a = a.firstBaseUpdate, a !== null) {
        do {
          var S = {
            lane: a.lane,
            tag: a.tag,
            payload: a.payload,
            callback: null,
            next: null
          };
          h === null ? f = h = S : h = h.next = S, a = a.next;
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
  var Bc = !1;
  function or() {
    if (Bc) {
      var e = Qa;
      if (e !== null) throw e;
    }
  }
  function rr(e, n, a, l) {
    Bc = !1;
    var f = e.updateQueue;
    Ei = !1;
    var h = f.firstBaseUpdate, S = f.lastBaseUpdate, z = f.shared.pending;
    if (z !== null) {
      f.shared.pending = null;
      var P = z, re = P.next;
      P.next = null, S === null ? h = re : S.next = re, S = P;
      var ce = e.alternate;
      ce !== null && (ce = ce.updateQueue, z = ce.lastBaseUpdate, z !== S && (z === null ? ce.firstBaseUpdate = re : z.next = re, ce.lastBaseUpdate = P));
    }
    if (h !== null) {
      var he = f.baseState;
      S = 0, ce = re = P = null, z = h;
      do {
        var le = z.lane & -536870913, ue = le !== z.lane;
        if (ue ? (Re & le) === le : (l & le) === le) {
          le !== 0 && le === Ka && (Bc = !0), ce !== null && (ce = ce.next = {
            lane: 0,
            tag: z.tag,
            payload: z.payload,
            callback: null,
            next: null
          });
          e: {
            var ye = e, Ne = z;
            le = n;
            var Fe = a;
            switch (Ne.tag) {
              case 1:
                if (ye = Ne.payload, typeof ye == "function") {
                  he = ye.call(Fe, he, le);
                  break e;
                }
                he = ye;
                break e;
              case 3:
                ye.flags = ye.flags & -65537 | 128;
              case 0:
                if (ye = Ne.payload, le = typeof ye == "function" ? ye.call(Fe, he, le) : ye, le == null) break e;
                he = y({}, he, le);
                break e;
              case 2:
                Ei = !0;
            }
          }
          le = z.callback, le !== null && (e.flags |= 64, ue && (e.flags |= 8192), ue = f.callbacks, ue === null ? f.callbacks = [le] : ue.push(le));
        } else
          ue = {
            lane: le,
            tag: z.tag,
            payload: z.payload,
            callback: z.callback,
            next: null
          }, ce === null ? (re = ce = ue, P = he) : ce = ce.next = ue, S |= le;
        if (z = z.next, z === null) {
          if (z = f.shared.pending, z === null)
            break;
          ue = z, z = ue.next, ue.next = null, f.lastBaseUpdate = ue, f.shared.pending = null;
        }
      } while (!0);
      ce === null && (P = he), f.baseState = P, f.firstBaseUpdate = re, f.lastBaseUpdate = ce, h === null && (f.shared.lanes = 0), ji |= S, e.lanes = S, e.memoizedState = he;
    }
  }
  function Mm(e, n) {
    if (typeof e != "function")
      throw Error(r(191, e));
    e.call(n);
  }
  function Tm(e, n) {
    var a = e.callbacks;
    if (a !== null)
      for (e.callbacks = null, e = 0; e < a.length; e++)
        Mm(a[e], n);
  }
  var Ja = D(null), Wl = D(0);
  function Dm(e, n) {
    e = ti, ne(Wl, e), ne(Ja, n), ti = e | n.baseLanes;
  }
  function Ic() {
    ne(Wl, ti), ne(Ja, Ja.current);
  }
  function Vc() {
    ti = Wl.current, V(Ja), V(Wl);
  }
  var qt = D(null), an = null;
  function Ci(e) {
    var n = e.alternate;
    ne(rt, rt.current & 1), ne(qt, e), an === null && (n === null || Ja.current !== null || n.memoizedState !== null) && (an = e);
  }
  function Uc(e) {
    ne(rt, rt.current), ne(qt, e), an === null && (an = e);
  }
  function jm(e) {
    e.tag === 22 ? (ne(rt, rt.current), ne(qt, e), an === null && (an = e)) : Mi();
  }
  function Mi() {
    ne(rt, rt.current), ne(qt, qt.current);
  }
  function $t(e) {
    V(qt), an === e && (an = null), V(rt);
  }
  var rt = D(0);
  function Jl(e) {
    for (var n = e; n !== null; ) {
      if (n.tag === 13) {
        var a = n.memoizedState;
        if (a !== null && (a = a.dehydrated, a === null || Kf(a) || Qf(a)))
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
  var Zn = 0, Te = null, Ke = null, dt = null, Pl = !1, Pa = !1, ua = !1, es = 0, lr = 0, eo = null, L1 = 0;
  function it() {
    throw Error(r(321));
  }
  function Yc(e, n) {
    if (n === null) return !1;
    for (var a = 0; a < n.length && a < e.length; a++)
      if (!Ut(e[a], n[a])) return !1;
    return !0;
  }
  function qc(e, n, a, l, f, h) {
    return Zn = h, Te = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, M.H = e === null || e.memoizedState === null ? hg : of, ua = !1, h = a(l, f), ua = !1, Pa && (h = Om(
      n,
      a,
      l,
      f
    )), Am(e), h;
  }
  function Am(e) {
    M.H = cr;
    var n = Ke !== null && Ke.next !== null;
    if (Zn = 0, dt = Ke = Te = null, Pl = !1, lr = 0, eo = null, n) throw Error(r(300));
    e === null || ht || (e = e.dependencies, e !== null && $l(e) && (ht = !0));
  }
  function Om(e, n, a, l) {
    Te = e;
    var f = 0;
    do {
      if (Pa && (eo = null), lr = 0, Pa = !1, 25 <= f) throw Error(r(301));
      if (f += 1, dt = Ke = null, e.updateQueue != null) {
        var h = e.updateQueue;
        h.lastEffect = null, h.events = null, h.stores = null, h.memoCache != null && (h.memoCache.index = 0);
      }
      M.H = mg, h = n(a, l);
    } while (Pa);
    return h;
  }
  function B1() {
    var e = M.H, n = e.useState()[0];
    return n = typeof n.then == "function" ? sr(n) : n, e = e.useState()[0], (Ke !== null ? Ke.memoizedState : null) !== e && (Te.flags |= 1024), n;
  }
  function $c() {
    var e = es !== 0;
    return es = 0, e;
  }
  function Xc(e, n, a) {
    n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~a;
  }
  function Gc(e) {
    if (Pl) {
      for (e = e.memoizedState; e !== null; ) {
        var n = e.queue;
        n !== null && (n.pending = null), e = e.next;
      }
      Pl = !1;
    }
    Zn = 0, dt = Ke = Te = null, Pa = !1, lr = es = 0, eo = null;
  }
  function Tt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return dt === null ? Te.memoizedState = dt = e : dt = dt.next = e, dt;
  }
  function lt() {
    if (Ke === null) {
      var e = Te.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ke.next;
    var n = dt === null ? Te.memoizedState : dt.next;
    if (n !== null)
      dt = n, Ke = e;
    else {
      if (e === null)
        throw Te.alternate === null ? Error(r(467)) : Error(r(310));
      Ke = e, e = {
        memoizedState: Ke.memoizedState,
        baseState: Ke.baseState,
        baseQueue: Ke.baseQueue,
        queue: Ke.queue,
        next: null
      }, dt === null ? Te.memoizedState = dt = e : dt = dt.next = e;
    }
    return dt;
  }
  function ts() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function sr(e) {
    var n = lr;
    return lr += 1, eo === null && (eo = []), e = Sm(eo, e, n), n = Te, (dt === null ? n.memoizedState : dt.next) === null && (n = n.alternate, M.H = n === null || n.memoizedState === null ? hg : of), e;
  }
  function ns(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return sr(e);
      if (e.$$typeof === N) return Et(e);
    }
    throw Error(r(438, String(e)));
  }
  function Zc(e) {
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
    if (n == null && (n = { data: [], index: 0 }), a === null && (a = ts(), Te.updateQueue = a), a.memoCache = n, a = n.data[n.index], a === void 0)
      for (a = n.data[n.index] = Array(e), l = 0; l < e; l++)
        a[l] = F;
    return n.index++, a;
  }
  function Kn(e, n) {
    return typeof n == "function" ? n(e) : n;
  }
  function is(e) {
    var n = lt();
    return Kc(n, Ke, e);
  }
  function Kc(e, n, a) {
    var l = e.queue;
    if (l === null) throw Error(r(311));
    l.lastRenderedReducer = a;
    var f = e.baseQueue, h = l.pending;
    if (h !== null) {
      if (f !== null) {
        var S = f.next;
        f.next = h.next, h.next = S;
      }
      n.baseQueue = f = h, l.pending = null;
    }
    if (h = e.baseState, f === null) e.memoizedState = h;
    else {
      n = f.next;
      var z = S = null, P = null, re = n, ce = !1;
      do {
        var he = re.lane & -536870913;
        if (he !== re.lane ? (Re & he) === he : (Zn & he) === he) {
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
            }), he === Ka && (ce = !0);
          else if ((Zn & le) === le) {
            re = re.next, le === Ka && (ce = !0);
            continue;
          } else
            he = {
              lane: 0,
              revertLane: re.revertLane,
              gesture: null,
              action: re.action,
              hasEagerState: re.hasEagerState,
              eagerState: re.eagerState,
              next: null
            }, P === null ? (z = P = he, S = h) : P = P.next = he, Te.lanes |= le, ji |= le;
          he = re.action, ua && a(h, he), h = re.hasEagerState ? re.eagerState : a(h, he);
        } else
          le = {
            lane: he,
            revertLane: re.revertLane,
            gesture: re.gesture,
            action: re.action,
            hasEagerState: re.hasEagerState,
            eagerState: re.eagerState,
            next: null
          }, P === null ? (z = P = le, S = h) : P = P.next = le, Te.lanes |= he, ji |= he;
        re = re.next;
      } while (re !== null && re !== n);
      if (P === null ? S = h : P.next = z, !Ut(h, e.memoizedState) && (ht = !0, ce && (a = Qa, a !== null)))
        throw a;
      e.memoizedState = h, e.baseState = S, e.baseQueue = P, l.lastRenderedState = h;
    }
    return f === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function Qc(e) {
    var n = lt(), a = n.queue;
    if (a === null) throw Error(r(311));
    a.lastRenderedReducer = e;
    var l = a.dispatch, f = a.pending, h = n.memoizedState;
    if (f !== null) {
      a.pending = null;
      var S = f = f.next;
      do
        h = e(h, S.action), S = S.next;
      while (S !== f);
      Ut(h, n.memoizedState) || (ht = !0), n.memoizedState = h, n.baseQueue === null && (n.baseState = h), a.lastRenderedState = h;
    }
    return [h, l];
  }
  function zm(e, n, a) {
    var l = Te, f = lt(), h = Le;
    if (h) {
      if (a === void 0) throw Error(r(407));
      a = a();
    } else a = n();
    var S = !Ut(
      (Ke || f).memoizedState,
      a
    );
    if (S && (f.memoizedState = a, ht = !0), f = f.queue, Jc(Hm.bind(null, l, f, e), [
      e
    ]), f.getSnapshot !== n || S || dt !== null && dt.memoizedState.tag & 1) {
      if (l.flags |= 2048, to(
        9,
        { destroy: void 0 },
        km.bind(
          null,
          l,
          f,
          a,
          n
        ),
        null
      ), We === null) throw Error(r(349));
      h || (Zn & 127) !== 0 || Rm(l, n, a);
    }
    return a;
  }
  function Rm(e, n, a) {
    e.flags |= 16384, e = { getSnapshot: n, value: a }, n = Te.updateQueue, n === null ? (n = ts(), Te.updateQueue = n, n.stores = [e]) : (a = n.stores, a === null ? n.stores = [e] : a.push(e));
  }
  function km(e, n, a, l) {
    n.value = a, n.getSnapshot = l, Lm(n) && Bm(e);
  }
  function Hm(e, n, a) {
    return a(function() {
      Lm(n) && Bm(e);
    });
  }
  function Lm(e) {
    var n = e.getSnapshot;
    e = e.value;
    try {
      var a = n();
      return !Ut(e, a);
    } catch {
      return !0;
    }
  }
  function Bm(e) {
    var n = ea(e, 2);
    n !== null && Bt(n, e, 2);
  }
  function Fc(e) {
    var n = Tt();
    if (typeof e == "function") {
      var a = e;
      if (e = a(), ua) {
        _e(!0);
        try {
          a();
        } finally {
          _e(!1);
        }
      }
    }
    return n.memoizedState = n.baseState = e, n.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Kn,
      lastRenderedState: e
    }, n;
  }
  function Im(e, n, a, l) {
    return e.baseState = a, Kc(
      e,
      Ke,
      typeof l == "function" ? l : Kn
    );
  }
  function I1(e, n, a, l, f) {
    if (rs(e)) throw Error(r(485));
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
        then: function(S) {
          h.listeners.push(S);
        }
      };
      M.T !== null ? a(!0) : h.isTransition = !1, l(h), a = n.pending, a === null ? (h.next = n.pending = h, Vm(n, h)) : (h.next = a.next, n.pending = a.next = h);
    }
  }
  function Vm(e, n) {
    var a = n.action, l = n.payload, f = e.state;
    if (n.isTransition) {
      var h = M.T, S = {};
      M.T = S;
      try {
        var z = a(f, l), P = M.S;
        P !== null && P(S, z), Um(e, n, z);
      } catch (re) {
        Wc(e, n, re);
      } finally {
        h !== null && S.types !== null && (h.types = S.types), M.T = h;
      }
    } else
      try {
        h = a(f, l), Um(e, n, h);
      } catch (re) {
        Wc(e, n, re);
      }
  }
  function Um(e, n, a) {
    a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(
      function(l) {
        Ym(e, n, l);
      },
      function(l) {
        return Wc(e, n, l);
      }
    ) : Ym(e, n, a);
  }
  function Ym(e, n, a) {
    n.status = "fulfilled", n.value = a, qm(n), e.state = a, n = e.pending, n !== null && (a = n.next, a === n ? e.pending = null : (a = a.next, n.next = a, Vm(e, a)));
  }
  function Wc(e, n, a) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        n.status = "rejected", n.reason = a, qm(n), n = n.next;
      while (n !== l);
    }
    e.action = null;
  }
  function qm(e) {
    e = e.listeners;
    for (var n = 0; n < e.length; n++) (0, e[n])();
  }
  function $m(e, n) {
    return n;
  }
  function Xm(e, n) {
    if (Le) {
      var a = We.formState;
      if (a !== null) {
        e: {
          var l = Te;
          if (Le) {
            if (Je) {
              t: {
                for (var f = Je, h = nn; f.nodeType !== 8; ) {
                  if (!h) {
                    f = null;
                    break t;
                  }
                  if (f = on(
                    f.nextSibling
                  ), f === null) {
                    f = null;
                    break t;
                  }
                }
                h = f.data, f = h === "F!" || h === "F" ? f : null;
              }
              if (f) {
                Je = on(
                  f.nextSibling
                ), l = f.data === "F!";
                break e;
              }
            }
            wi(l);
          }
          l = !1;
        }
        l && (n = a[0]);
      }
    }
    return a = Tt(), a.memoizedState = a.baseState = n, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: $m,
      lastRenderedState: n
    }, a.queue = l, a = cg.bind(
      null,
      Te,
      l
    ), l.dispatch = a, l = Fc(!1), h = af.bind(
      null,
      Te,
      !1,
      l.queue
    ), l = Tt(), f = {
      state: n,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = f, a = I1.bind(
      null,
      Te,
      f,
      h,
      a
    ), f.dispatch = a, l.memoizedState = e, [n, a, !1];
  }
  function Gm(e) {
    var n = lt();
    return Zm(n, Ke, e);
  }
  function Zm(e, n, a) {
    if (n = Kc(
      e,
      n,
      $m
    )[0], e = is(Kn)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var l = sr(n);
      } catch (S) {
        throw S === Fa ? Zl : S;
      }
    else l = n;
    n = lt();
    var f = n.queue, h = f.dispatch;
    return a !== n.memoizedState && (Te.flags |= 2048, to(
      9,
      { destroy: void 0 },
      V1.bind(null, f, a),
      null
    )), [l, h, e];
  }
  function V1(e, n) {
    e.action = n;
  }
  function Km(e) {
    var n = lt(), a = Ke;
    if (a !== null)
      return Zm(n, a, e);
    lt(), n = n.memoizedState, a = lt();
    var l = a.queue.dispatch;
    return a.memoizedState = e, [n, l, !1];
  }
  function to(e, n, a, l) {
    return e = { tag: e, create: a, deps: l, inst: n, next: null }, n = Te.updateQueue, n === null && (n = ts(), Te.updateQueue = n), a = n.lastEffect, a === null ? n.lastEffect = e.next = e : (l = a.next, a.next = e, e.next = l, n.lastEffect = e), e;
  }
  function Qm() {
    return lt().memoizedState;
  }
  function as(e, n, a, l) {
    var f = Tt();
    Te.flags |= e, f.memoizedState = to(
      1 | n,
      { destroy: void 0 },
      a,
      l === void 0 ? null : l
    );
  }
  function os(e, n, a, l) {
    var f = lt();
    l = l === void 0 ? null : l;
    var h = f.memoizedState.inst;
    Ke !== null && l !== null && Yc(l, Ke.memoizedState.deps) ? f.memoizedState = to(n, h, a, l) : (Te.flags |= e, f.memoizedState = to(
      1 | n,
      h,
      a,
      l
    ));
  }
  function Fm(e, n) {
    as(8390656, 8, e, n);
  }
  function Jc(e, n) {
    os(2048, 8, e, n);
  }
  function U1(e) {
    Te.flags |= 4;
    var n = Te.updateQueue;
    if (n === null)
      n = ts(), Te.updateQueue = n, n.events = [e];
    else {
      var a = n.events;
      a === null ? n.events = [e] : a.push(e);
    }
  }
  function Wm(e) {
    var n = lt().memoizedState;
    return U1({ ref: n, nextImpl: e }), function() {
      if (($e & 2) !== 0) throw Error(r(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function Jm(e, n) {
    return os(4, 2, e, n);
  }
  function Pm(e, n) {
    return os(4, 4, e, n);
  }
  function eg(e, n) {
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
  function tg(e, n, a) {
    a = a != null ? a.concat([e]) : null, os(4, 4, eg.bind(null, n, e), a);
  }
  function Pc() {
  }
  function ng(e, n) {
    var a = lt();
    n = n === void 0 ? null : n;
    var l = a.memoizedState;
    return n !== null && Yc(n, l[1]) ? l[0] : (a.memoizedState = [e, n], e);
  }
  function ig(e, n) {
    var a = lt();
    n = n === void 0 ? null : n;
    var l = a.memoizedState;
    if (n !== null && Yc(n, l[1]))
      return l[0];
    if (l = e(), ua) {
      _e(!0);
      try {
        e();
      } finally {
        _e(!1);
      }
    }
    return a.memoizedState = [l, n], l;
  }
  function ef(e, n, a) {
    return a === void 0 || (Zn & 1073741824) !== 0 && (Re & 261930) === 0 ? e.memoizedState = n : (e.memoizedState = a, e = ap(), Te.lanes |= e, ji |= e, a);
  }
  function ag(e, n, a, l) {
    return Ut(a, n) ? a : Ja.current !== null ? (e = ef(e, a, l), Ut(e, n) || (ht = !0), e) : (Zn & 42) === 0 || (Zn & 1073741824) !== 0 && (Re & 261930) === 0 ? (ht = !0, e.memoizedState = a) : (e = ap(), Te.lanes |= e, ji |= e, n);
  }
  function og(e, n, a, l, f) {
    var h = R.p;
    R.p = h !== 0 && 8 > h ? h : 8;
    var S = M.T, z = {};
    M.T = z, af(e, !1, n, a);
    try {
      var P = f(), re = M.S;
      if (re !== null && re(z, P), P !== null && typeof P == "object" && typeof P.then == "function") {
        var ce = H1(
          P,
          l
        );
        ur(
          e,
          n,
          ce,
          Zt(e)
        );
      } else
        ur(
          e,
          n,
          l,
          Zt(e)
        );
    } catch (he) {
      ur(
        e,
        n,
        { then: function() {
        }, status: "rejected", reason: he },
        Zt()
      );
    } finally {
      R.p = h, S !== null && z.types !== null && (S.types = z.types), M.T = S;
    }
  }
  function Y1() {
  }
  function tf(e, n, a, l) {
    if (e.tag !== 5) throw Error(r(476));
    var f = rg(e).queue;
    og(
      e,
      f,
      n,
      B,
      a === null ? Y1 : function() {
        return lg(e), a(l);
      }
    );
  }
  function rg(e) {
    var n = e.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: B,
      baseState: B,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Kn,
        lastRenderedState: B
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
        lastRenderedReducer: Kn,
        lastRenderedState: a
      },
      next: null
    }, e.memoizedState = n, e = e.alternate, e !== null && (e.memoizedState = n), n;
  }
  function lg(e) {
    var n = rg(e);
    n.next === null && (n = e.alternate.memoizedState), ur(
      e,
      n.next.queue,
      {},
      Zt()
    );
  }
  function nf() {
    return Et(Cr);
  }
  function sg() {
    return lt().memoizedState;
  }
  function ug() {
    return lt().memoizedState;
  }
  function q1(e) {
    for (var n = e.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var a = Zt();
          e = _i(a);
          var l = Ni(n, e, a);
          l !== null && (Bt(l, n, a), ar(l, n, a)), n = { cache: Ac() }, e.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function $1(e, n, a) {
    var l = Zt();
    a = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, rs(e) ? fg(n, a) : (a = xc(e, n, a, l), a !== null && (Bt(a, e, l), dg(a, n, l)));
  }
  function cg(e, n, a) {
    var l = Zt();
    ur(e, n, a, l);
  }
  function ur(e, n, a, l) {
    var f = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (rs(e)) fg(n, f);
    else {
      var h = e.alternate;
      if (e.lanes === 0 && (h === null || h.lanes === 0) && (h = n.lastRenderedReducer, h !== null))
        try {
          var S = n.lastRenderedState, z = h(S, a);
          if (f.hasEagerState = !0, f.eagerState = z, Ut(z, S))
            return Vl(e, n, f, 0), We === null && Il(), !1;
        } catch {
        }
      if (a = xc(e, n, f, l), a !== null)
        return Bt(a, e, l), dg(a, n, l), !0;
    }
    return !1;
  }
  function af(e, n, a, l) {
    if (l = {
      lane: 2,
      revertLane: Hf(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, rs(e)) {
      if (n) throw Error(r(479));
    } else
      n = xc(
        e,
        a,
        l,
        2
      ), n !== null && Bt(n, e, 2);
  }
  function rs(e) {
    var n = e.alternate;
    return e === Te || n !== null && n === Te;
  }
  function fg(e, n) {
    Pa = Pl = !0;
    var a = e.pending;
    a === null ? n.next = n : (n.next = a.next, a.next = n), e.pending = n;
  }
  function dg(e, n, a) {
    if ((a & 4194048) !== 0) {
      var l = n.lanes;
      l &= e.pendingLanes, a |= l, n.lanes = a, bl(e, a);
    }
  }
  var cr = {
    readContext: Et,
    use: ns,
    useCallback: it,
    useContext: it,
    useEffect: it,
    useImperativeHandle: it,
    useLayoutEffect: it,
    useInsertionEffect: it,
    useMemo: it,
    useReducer: it,
    useRef: it,
    useState: it,
    useDebugValue: it,
    useDeferredValue: it,
    useTransition: it,
    useSyncExternalStore: it,
    useId: it,
    useHostTransitionStatus: it,
    useFormState: it,
    useActionState: it,
    useOptimistic: it,
    useMemoCache: it,
    useCacheRefresh: it
  };
  cr.useEffectEvent = it;
  var hg = {
    readContext: Et,
    use: ns,
    useCallback: function(e, n) {
      return Tt().memoizedState = [
        e,
        n === void 0 ? null : n
      ], e;
    },
    useContext: Et,
    useEffect: Fm,
    useImperativeHandle: function(e, n, a) {
      a = a != null ? a.concat([e]) : null, as(
        4194308,
        4,
        eg.bind(null, n, e),
        a
      );
    },
    useLayoutEffect: function(e, n) {
      return as(4194308, 4, e, n);
    },
    useInsertionEffect: function(e, n) {
      as(4, 2, e, n);
    },
    useMemo: function(e, n) {
      var a = Tt();
      n = n === void 0 ? null : n;
      var l = e();
      if (ua) {
        _e(!0);
        try {
          e();
        } finally {
          _e(!1);
        }
      }
      return a.memoizedState = [l, n], l;
    },
    useReducer: function(e, n, a) {
      var l = Tt();
      if (a !== void 0) {
        var f = a(n);
        if (ua) {
          _e(!0);
          try {
            a(n);
          } finally {
            _e(!1);
          }
        }
      } else f = n;
      return l.memoizedState = l.baseState = f, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: f
      }, l.queue = e, e = e.dispatch = $1.bind(
        null,
        Te,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var n = Tt();
      return e = { current: e }, n.memoizedState = e;
    },
    useState: function(e) {
      e = Fc(e);
      var n = e.queue, a = cg.bind(null, Te, n);
      return n.dispatch = a, [e.memoizedState, a];
    },
    useDebugValue: Pc,
    useDeferredValue: function(e, n) {
      var a = Tt();
      return ef(a, e, n);
    },
    useTransition: function() {
      var e = Fc(!1);
      return e = og.bind(
        null,
        Te,
        e.queue,
        !0,
        !1
      ), Tt().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, n, a) {
      var l = Te, f = Tt();
      if (Le) {
        if (a === void 0)
          throw Error(r(407));
        a = a();
      } else {
        if (a = n(), We === null)
          throw Error(r(349));
        (Re & 127) !== 0 || Rm(l, n, a);
      }
      f.memoizedState = a;
      var h = { value: a, getSnapshot: n };
      return f.queue = h, Fm(Hm.bind(null, l, h, e), [
        e
      ]), l.flags |= 2048, to(
        9,
        { destroy: void 0 },
        km.bind(
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
      var e = Tt(), n = We.identifierPrefix;
      if (Le) {
        var a = Cn, l = Nn;
        a = (l & ~(1 << 32 - De(l) - 1)).toString(32) + a, n = "_" + n + "R_" + a, a = es++, 0 < a && (n += "H" + a.toString(32)), n += "_";
      } else
        a = L1++, n = "_" + n + "r_" + a.toString(32) + "_";
      return e.memoizedState = n;
    },
    useHostTransitionStatus: nf,
    useFormState: Xm,
    useActionState: Xm,
    useOptimistic: function(e) {
      var n = Tt();
      n.memoizedState = n.baseState = e;
      var a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return n.queue = a, n = af.bind(
        null,
        Te,
        !0,
        a
      ), a.dispatch = n, [e, n];
    },
    useMemoCache: Zc,
    useCacheRefresh: function() {
      return Tt().memoizedState = q1.bind(
        null,
        Te
      );
    },
    useEffectEvent: function(e) {
      var n = Tt(), a = { impl: e };
      return n.memoizedState = a, function() {
        if (($e & 2) !== 0)
          throw Error(r(440));
        return a.impl.apply(void 0, arguments);
      };
    }
  }, of = {
    readContext: Et,
    use: ns,
    useCallback: ng,
    useContext: Et,
    useEffect: Jc,
    useImperativeHandle: tg,
    useInsertionEffect: Jm,
    useLayoutEffect: Pm,
    useMemo: ig,
    useReducer: is,
    useRef: Qm,
    useState: function() {
      return is(Kn);
    },
    useDebugValue: Pc,
    useDeferredValue: function(e, n) {
      var a = lt();
      return ag(
        a,
        Ke.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = is(Kn)[0], n = lt().memoizedState;
      return [
        typeof e == "boolean" ? e : sr(e),
        n
      ];
    },
    useSyncExternalStore: zm,
    useId: sg,
    useHostTransitionStatus: nf,
    useFormState: Gm,
    useActionState: Gm,
    useOptimistic: function(e, n) {
      var a = lt();
      return Im(a, Ke, e, n);
    },
    useMemoCache: Zc,
    useCacheRefresh: ug
  };
  of.useEffectEvent = Wm;
  var mg = {
    readContext: Et,
    use: ns,
    useCallback: ng,
    useContext: Et,
    useEffect: Jc,
    useImperativeHandle: tg,
    useInsertionEffect: Jm,
    useLayoutEffect: Pm,
    useMemo: ig,
    useReducer: Qc,
    useRef: Qm,
    useState: function() {
      return Qc(Kn);
    },
    useDebugValue: Pc,
    useDeferredValue: function(e, n) {
      var a = lt();
      return Ke === null ? ef(a, e, n) : ag(
        a,
        Ke.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = Qc(Kn)[0], n = lt().memoizedState;
      return [
        typeof e == "boolean" ? e : sr(e),
        n
      ];
    },
    useSyncExternalStore: zm,
    useId: sg,
    useHostTransitionStatus: nf,
    useFormState: Km,
    useActionState: Km,
    useOptimistic: function(e, n) {
      var a = lt();
      return Ke !== null ? Im(a, Ke, e, n) : (a.baseState = e, [e, a.queue.dispatch]);
    },
    useMemoCache: Zc,
    useCacheRefresh: ug
  };
  mg.useEffectEvent = Wm;
  function rf(e, n, a, l) {
    n = e.memoizedState, a = a(l, n), a = a == null ? n : y({}, n, a), e.memoizedState = a, e.lanes === 0 && (e.updateQueue.baseState = a);
  }
  var lf = {
    enqueueSetState: function(e, n, a) {
      e = e._reactInternals;
      var l = Zt(), f = _i(l);
      f.payload = n, a != null && (f.callback = a), n = Ni(e, f, l), n !== null && (Bt(n, e, l), ar(n, e, l));
    },
    enqueueReplaceState: function(e, n, a) {
      e = e._reactInternals;
      var l = Zt(), f = _i(l);
      f.tag = 1, f.payload = n, a != null && (f.callback = a), n = Ni(e, f, l), n !== null && (Bt(n, e, l), ar(n, e, l));
    },
    enqueueForceUpdate: function(e, n) {
      e = e._reactInternals;
      var a = Zt(), l = _i(a);
      l.tag = 2, n != null && (l.callback = n), n = Ni(e, l, a), n !== null && (Bt(n, e, a), ar(n, e, a));
    }
  };
  function gg(e, n, a, l, f, h, S) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, h, S) : n.prototype && n.prototype.isPureReactComponent ? !Fo(a, l) || !Fo(f, h) : !0;
  }
  function pg(e, n, a, l) {
    e = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(a, l), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(a, l), n.state !== e && lf.enqueueReplaceState(n, n.state, null);
  }
  function ca(e, n) {
    var a = n;
    if ("ref" in n) {
      a = {};
      for (var l in n)
        l !== "ref" && (a[l] = n[l]);
    }
    if (e = e.defaultProps) {
      a === n && (a = y({}, a));
      for (var f in e)
        a[f] === void 0 && (a[f] = e[f]);
    }
    return a;
  }
  function yg(e) {
    Bl(e);
  }
  function vg(e) {
    console.error(e);
  }
  function bg(e) {
    Bl(e);
  }
  function ls(e, n) {
    try {
      var a = e.onUncaughtError;
      a(n.value, { componentStack: n.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function xg(e, n, a) {
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
  function sf(e, n, a) {
    return a = _i(a), a.tag = 3, a.payload = { element: null }, a.callback = function() {
      ls(e, n);
    }, a;
  }
  function wg(e) {
    return e = _i(e), e.tag = 3, e;
  }
  function Sg(e, n, a, l) {
    var f = a.type.getDerivedStateFromError;
    if (typeof f == "function") {
      var h = l.value;
      e.payload = function() {
        return f(h);
      }, e.callback = function() {
        xg(n, a, l);
      };
    }
    var S = a.stateNode;
    S !== null && typeof S.componentDidCatch == "function" && (e.callback = function() {
      xg(n, a, l), typeof f != "function" && (Ai === null ? Ai = /* @__PURE__ */ new Set([this]) : Ai.add(this));
      var z = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: z !== null ? z : ""
      });
    });
  }
  function X1(e, n, a, l, f) {
    if (a.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (n = a.alternate, n !== null && Za(
        n,
        a,
        f,
        !0
      ), a = qt.current, a !== null) {
        switch (a.tag) {
          case 31:
          case 13:
            return an === null ? bs() : a.alternate === null && at === 0 && (at = 3), a.flags &= -257, a.flags |= 65536, a.lanes = f, l === Kl ? a.flags |= 16384 : (n = a.updateQueue, n === null ? a.updateQueue = /* @__PURE__ */ new Set([l]) : n.add(l), zf(e, l, f)), !1;
          case 22:
            return a.flags |= 65536, l === Kl ? a.flags |= 16384 : (n = a.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, a.updateQueue = n) : (a = n.retryQueue, a === null ? n.retryQueue = /* @__PURE__ */ new Set([l]) : a.add(l)), zf(e, l, f)), !1;
        }
        throw Error(r(435, a.tag));
      }
      return zf(e, l, f), bs(), !1;
    }
    if (Le)
      return n = qt.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = f, l !== Cc && (e = Error(r(422), { cause: l }), Po(Pt(e, a)))) : (l !== Cc && (n = Error(r(423), {
        cause: l
      }), Po(
        Pt(n, a)
      )), e = e.current.alternate, e.flags |= 65536, f &= -f, e.lanes |= f, l = Pt(l, a), f = sf(
        e.stateNode,
        l,
        f
      ), Lc(e, f), at !== 4 && (at = 2)), !1;
    var h = Error(r(520), { cause: l });
    if (h = Pt(h, a), vr === null ? vr = [h] : vr.push(h), at !== 4 && (at = 2), n === null) return !0;
    l = Pt(l, a), a = n;
    do {
      switch (a.tag) {
        case 3:
          return a.flags |= 65536, e = f & -f, a.lanes |= e, e = sf(a.stateNode, l, e), Lc(a, e), !1;
        case 1:
          if (n = a.type, h = a.stateNode, (a.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || h !== null && typeof h.componentDidCatch == "function" && (Ai === null || !Ai.has(h))))
            return a.flags |= 65536, f &= -f, a.lanes |= f, f = wg(f), Sg(
              f,
              e,
              a,
              l
            ), Lc(a, f), !1;
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var uf = Error(r(461)), ht = !1;
  function _t(e, n, a, l) {
    n.child = e === null ? Cm(n, null, a, l) : sa(
      n,
      e.child,
      a,
      l
    );
  }
  function Eg(e, n, a, l, f) {
    a = a.render;
    var h = n.ref;
    if ("ref" in l) {
      var S = {};
      for (var z in l)
        z !== "ref" && (S[z] = l[z]);
    } else S = l;
    return aa(n), l = qc(
      e,
      n,
      a,
      S,
      h,
      f
    ), z = $c(), e !== null && !ht ? (Xc(e, n, f), Qn(e, n, f)) : (Le && z && _c(n), n.flags |= 1, _t(e, n, l, f), n.child);
  }
  function _g(e, n, a, l, f) {
    if (e === null) {
      var h = a.type;
      return typeof h == "function" && !wc(h) && h.defaultProps === void 0 && a.compare === null ? (n.tag = 15, n.type = h, Ng(
        e,
        n,
        h,
        l,
        f
      )) : (e = Yl(
        a.type,
        null,
        l,
        n,
        n.mode,
        f
      ), e.ref = n.ref, e.return = n, n.child = e);
    }
    if (h = e.child, !yf(e, f)) {
      var S = h.memoizedProps;
      if (a = a.compare, a = a !== null ? a : Fo, a(S, l) && e.ref === n.ref)
        return Qn(e, n, f);
    }
    return n.flags |= 1, e = qn(h, l), e.ref = n.ref, e.return = n, n.child = e;
  }
  function Ng(e, n, a, l, f) {
    if (e !== null) {
      var h = e.memoizedProps;
      if (Fo(h, l) && e.ref === n.ref)
        if (ht = !1, n.pendingProps = l = h, yf(e, f))
          (e.flags & 131072) !== 0 && (ht = !0);
        else
          return n.lanes = e.lanes, Qn(e, n, f);
    }
    return cf(
      e,
      n,
      a,
      l,
      f
    );
  }
  function Cg(e, n, a, l) {
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
        return Mg(
          e,
          n,
          h,
          a,
          l
        );
      }
      if ((a & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Gl(
          n,
          h !== null ? h.cachePool : null
        ), h !== null ? Dm(n, h) : Ic(), jm(n);
      else
        return l = n.lanes = 536870912, Mg(
          e,
          n,
          h !== null ? h.baseLanes | a : a,
          a,
          l
        );
    } else
      h !== null ? (Gl(n, h.cachePool), Dm(n, h), Mi(), n.memoizedState = null) : (e !== null && Gl(n, null), Ic(), Mi());
    return _t(e, n, f, a), n.child;
  }
  function fr(e, n) {
    return e !== null && e.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function Mg(e, n, a, l, f) {
    var h = zc();
    return h = h === null ? null : { parent: ft._currentValue, pool: h }, n.memoizedState = {
      baseLanes: a,
      cachePool: h
    }, e !== null && Gl(n, null), Ic(), jm(n), e !== null && Za(e, n, l, !0), n.childLanes = f, null;
  }
  function ss(e, n) {
    return n = cs(
      { mode: n.mode, children: n.children },
      e.mode
    ), n.ref = e.ref, e.child = n, n.return = e, n;
  }
  function Tg(e, n, a) {
    return sa(n, e.child, null, a), e = ss(n, n.pendingProps), e.flags |= 2, $t(n), n.memoizedState = null, e;
  }
  function G1(e, n, a) {
    var l = n.pendingProps, f = (n.flags & 128) !== 0;
    if (n.flags &= -129, e === null) {
      if (Le) {
        if (l.mode === "hidden")
          return e = ss(n, l), n.lanes = 536870912, fr(null, e);
        if (Uc(n), (e = Je) ? (e = Vp(
          e,
          nn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: bi !== null ? { id: Nn, overflow: Cn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = fm(e), a.return = n, n.child = a, St = n, Je = null)) : e = null, e === null) throw wi(n);
        return n.lanes = 536870912, null;
      }
      return ss(n, l);
    }
    var h = e.memoizedState;
    if (h !== null) {
      var S = h.dehydrated;
      if (Uc(n), f)
        if (n.flags & 256)
          n.flags &= -257, n = Tg(
            e,
            n,
            a
          );
        else if (n.memoizedState !== null)
          n.child = e.child, n.flags |= 128, n = null;
        else throw Error(r(558));
      else if (ht || Za(e, n, a, !1), f = (a & e.childLanes) !== 0, ht || f) {
        if (l = We, l !== null && (S = xl(l, a), S !== 0 && S !== h.retryLane))
          throw h.retryLane = S, ea(e, S), Bt(l, e, S), uf;
        bs(), n = Tg(
          e,
          n,
          a
        );
      } else
        e = h.treeContext, Je = on(S.nextSibling), St = n, Le = !0, xi = null, nn = !1, e !== null && mm(n, e), n = ss(n, l), n.flags |= 4096;
      return n;
    }
    return e = qn(e.child, {
      mode: l.mode,
      children: l.children
    }), e.ref = n.ref, n.child = e, e.return = n, e;
  }
  function us(e, n) {
    var a = n.ref;
    if (a === null)
      e !== null && e.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof a != "function" && typeof a != "object")
        throw Error(r(284));
      (e === null || e.ref !== a) && (n.flags |= 4194816);
    }
  }
  function cf(e, n, a, l, f) {
    return aa(n), a = qc(
      e,
      n,
      a,
      l,
      void 0,
      f
    ), l = $c(), e !== null && !ht ? (Xc(e, n, f), Qn(e, n, f)) : (Le && l && _c(n), n.flags |= 1, _t(e, n, a, f), n.child);
  }
  function Dg(e, n, a, l, f, h) {
    return aa(n), n.updateQueue = null, a = Om(
      n,
      l,
      a,
      f
    ), Am(e), l = $c(), e !== null && !ht ? (Xc(e, n, h), Qn(e, n, h)) : (Le && l && _c(n), n.flags |= 1, _t(e, n, a, h), n.child);
  }
  function jg(e, n, a, l, f) {
    if (aa(n), n.stateNode === null) {
      var h = qa, S = a.contextType;
      typeof S == "object" && S !== null && (h = Et(S)), h = new a(l, h), n.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null, h.updater = lf, n.stateNode = h, h._reactInternals = n, h = n.stateNode, h.props = l, h.state = n.memoizedState, h.refs = {}, kc(n), S = a.contextType, h.context = typeof S == "object" && S !== null ? Et(S) : qa, h.state = n.memoizedState, S = a.getDerivedStateFromProps, typeof S == "function" && (rf(
        n,
        a,
        S,
        l
      ), h.state = n.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof h.getSnapshotBeforeUpdate == "function" || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (S = h.state, typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount(), S !== h.state && lf.enqueueReplaceState(h, h.state, null), rr(n, l, h, f), or(), h.state = n.memoizedState), typeof h.componentDidMount == "function" && (n.flags |= 4194308), l = !0;
    } else if (e === null) {
      h = n.stateNode;
      var z = n.memoizedProps, P = ca(a, z);
      h.props = P;
      var re = h.context, ce = a.contextType;
      S = qa, typeof ce == "object" && ce !== null && (S = Et(ce));
      var he = a.getDerivedStateFromProps;
      ce = typeof he == "function" || typeof h.getSnapshotBeforeUpdate == "function", z = n.pendingProps !== z, ce || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (z || re !== S) && pg(
        n,
        h,
        l,
        S
      ), Ei = !1;
      var le = n.memoizedState;
      h.state = le, rr(n, l, h, f), or(), re = n.memoizedState, z || le !== re || Ei ? (typeof he == "function" && (rf(
        n,
        a,
        he,
        l
      ), re = n.memoizedState), (P = Ei || gg(
        n,
        a,
        P,
        l,
        le,
        re,
        S
      )) ? (ce || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount()), typeof h.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = l, n.memoizedState = re), h.props = l, h.state = re, h.context = S, l = P) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), l = !1);
    } else {
      h = n.stateNode, Hc(e, n), S = n.memoizedProps, ce = ca(a, S), h.props = ce, he = n.pendingProps, le = h.context, re = a.contextType, P = qa, typeof re == "object" && re !== null && (P = Et(re)), z = a.getDerivedStateFromProps, (re = typeof z == "function" || typeof h.getSnapshotBeforeUpdate == "function") || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (S !== he || le !== P) && pg(
        n,
        h,
        l,
        P
      ), Ei = !1, le = n.memoizedState, h.state = le, rr(n, l, h, f), or();
      var ue = n.memoizedState;
      S !== he || le !== ue || Ei || e !== null && e.dependencies !== null && $l(e.dependencies) ? (typeof z == "function" && (rf(
        n,
        a,
        z,
        l
      ), ue = n.memoizedState), (ce = Ei || gg(
        n,
        a,
        ce,
        l,
        le,
        ue,
        P
      ) || e !== null && e.dependencies !== null && $l(e.dependencies)) ? (re || typeof h.UNSAFE_componentWillUpdate != "function" && typeof h.componentWillUpdate != "function" || (typeof h.componentWillUpdate == "function" && h.componentWillUpdate(l, ue, P), typeof h.UNSAFE_componentWillUpdate == "function" && h.UNSAFE_componentWillUpdate(
        l,
        ue,
        P
      )), typeof h.componentDidUpdate == "function" && (n.flags |= 4), typeof h.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof h.componentDidUpdate != "function" || S === e.memoizedProps && le === e.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || S === e.memoizedProps && le === e.memoizedState || (n.flags |= 1024), n.memoizedProps = l, n.memoizedState = ue), h.props = l, h.state = ue, h.context = P, l = ce) : (typeof h.componentDidUpdate != "function" || S === e.memoizedProps && le === e.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || S === e.memoizedProps && le === e.memoizedState || (n.flags |= 1024), l = !1);
    }
    return h = l, us(e, n), l = (n.flags & 128) !== 0, h || l ? (h = n.stateNode, a = l && typeof a.getDerivedStateFromError != "function" ? null : h.render(), n.flags |= 1, e !== null && l ? (n.child = sa(
      n,
      e.child,
      null,
      f
    ), n.child = sa(
      n,
      null,
      a,
      f
    )) : _t(e, n, a, f), n.memoizedState = h.state, e = n.child) : e = Qn(
      e,
      n,
      f
    ), e;
  }
  function Ag(e, n, a, l) {
    return na(), n.flags |= 256, _t(e, n, a, l), n.child;
  }
  var ff = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function df(e) {
    return { baseLanes: e, cachePool: xm() };
  }
  function hf(e, n, a) {
    return e = e !== null ? e.childLanes & ~a : 0, n && (e |= Gt), e;
  }
  function Og(e, n, a) {
    var l = n.pendingProps, f = !1, h = (n.flags & 128) !== 0, S;
    if ((S = h) || (S = e !== null && e.memoizedState === null ? !1 : (rt.current & 2) !== 0), S && (f = !0, n.flags &= -129), S = (n.flags & 32) !== 0, n.flags &= -33, e === null) {
      if (Le) {
        if (f ? Ci(n) : Mi(), (e = Je) ? (e = Vp(
          e,
          nn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: bi !== null ? { id: Nn, overflow: Cn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = fm(e), a.return = n, n.child = a, St = n, Je = null)) : e = null, e === null) throw wi(n);
        return Qf(e) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var z = l.children;
      return l = l.fallback, f ? (Mi(), f = n.mode, z = cs(
        { mode: "hidden", children: z },
        f
      ), l = ta(
        l,
        f,
        a,
        null
      ), z.return = n, l.return = n, z.sibling = l, n.child = z, l = n.child, l.memoizedState = df(a), l.childLanes = hf(
        e,
        S,
        a
      ), n.memoizedState = ff, fr(null, l)) : (Ci(n), mf(n, z));
    }
    var P = e.memoizedState;
    if (P !== null && (z = P.dehydrated, z !== null)) {
      if (h)
        n.flags & 256 ? (Ci(n), n.flags &= -257, n = gf(
          e,
          n,
          a
        )) : n.memoizedState !== null ? (Mi(), n.child = e.child, n.flags |= 128, n = null) : (Mi(), z = l.fallback, f = n.mode, l = cs(
          { mode: "visible", children: l.children },
          f
        ), z = ta(
          z,
          f,
          a,
          null
        ), z.flags |= 2, l.return = n, z.return = n, l.sibling = z, n.child = l, sa(
          n,
          e.child,
          null,
          a
        ), l = n.child, l.memoizedState = df(a), l.childLanes = hf(
          e,
          S,
          a
        ), n.memoizedState = ff, n = fr(null, l));
      else if (Ci(n), Qf(z)) {
        if (S = z.nextSibling && z.nextSibling.dataset, S) var re = S.dgst;
        S = re, l = Error(r(419)), l.stack = "", l.digest = S, Po({ value: l, source: null, stack: null }), n = gf(
          e,
          n,
          a
        );
      } else if (ht || Za(e, n, a, !1), S = (a & e.childLanes) !== 0, ht || S) {
        if (S = We, S !== null && (l = xl(S, a), l !== 0 && l !== P.retryLane))
          throw P.retryLane = l, ea(e, l), Bt(S, e, l), uf;
        Kf(z) || bs(), n = gf(
          e,
          n,
          a
        );
      } else
        Kf(z) ? (n.flags |= 192, n.child = e.child, n = null) : (e = P.treeContext, Je = on(
          z.nextSibling
        ), St = n, Le = !0, xi = null, nn = !1, e !== null && mm(n, e), n = mf(
          n,
          l.children
        ), n.flags |= 4096);
      return n;
    }
    return f ? (Mi(), z = l.fallback, f = n.mode, P = e.child, re = P.sibling, l = qn(P, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = P.subtreeFlags & 65011712, re !== null ? z = qn(
      re,
      z
    ) : (z = ta(
      z,
      f,
      a,
      null
    ), z.flags |= 2), z.return = n, l.return = n, l.sibling = z, n.child = l, fr(null, l), l = n.child, z = e.child.memoizedState, z === null ? z = df(a) : (f = z.cachePool, f !== null ? (P = ft._currentValue, f = f.parent !== P ? { parent: P, pool: P } : f) : f = xm(), z = {
      baseLanes: z.baseLanes | a,
      cachePool: f
    }), l.memoizedState = z, l.childLanes = hf(
      e,
      S,
      a
    ), n.memoizedState = ff, fr(e.child, l)) : (Ci(n), a = e.child, e = a.sibling, a = qn(a, {
      mode: "visible",
      children: l.children
    }), a.return = n, a.sibling = null, e !== null && (S = n.deletions, S === null ? (n.deletions = [e], n.flags |= 16) : S.push(e)), n.child = a, n.memoizedState = null, a);
  }
  function mf(e, n) {
    return n = cs(
      { mode: "visible", children: n },
      e.mode
    ), n.return = e, e.child = n;
  }
  function cs(e, n) {
    return e = Yt(22, e, null, n), e.lanes = 0, e;
  }
  function gf(e, n, a) {
    return sa(n, e.child, null, a), e = mf(
      n,
      n.pendingProps.children
    ), e.flags |= 2, n.memoizedState = null, e;
  }
  function zg(e, n, a) {
    e.lanes |= n;
    var l = e.alternate;
    l !== null && (l.lanes |= n), Dc(e.return, n, a);
  }
  function pf(e, n, a, l, f, h) {
    var S = e.memoizedState;
    S === null ? e.memoizedState = {
      isBackwards: n,
      rendering: null,
      renderingStartTime: 0,
      last: l,
      tail: a,
      tailMode: f,
      treeForkCount: h
    } : (S.isBackwards = n, S.rendering = null, S.renderingStartTime = 0, S.last = l, S.tail = a, S.tailMode = f, S.treeForkCount = h);
  }
  function Rg(e, n, a) {
    var l = n.pendingProps, f = l.revealOrder, h = l.tail;
    l = l.children;
    var S = rt.current, z = (S & 2) !== 0;
    if (z ? (S = S & 1 | 2, n.flags |= 128) : S &= 1, ne(rt, S), _t(e, n, l, a), l = Le ? Jo : 0, !z && e !== null && (e.flags & 128) !== 0)
      e: for (e = n.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && zg(e, a, n);
        else if (e.tag === 19)
          zg(e, a, n);
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
          e = a.alternate, e !== null && Jl(e) === null && (f = a), a = a.sibling;
        a = f, a === null ? (f = n.child, n.child = null) : (f = a.sibling, a.sibling = null), pf(
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
          if (e = f.alternate, e !== null && Jl(e) === null) {
            n.child = f;
            break;
          }
          e = f.sibling, f.sibling = a, a = f, f = e;
        }
        pf(
          n,
          !0,
          a,
          null,
          h,
          l
        );
        break;
      case "together":
        pf(
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
  function Qn(e, n, a) {
    if (e !== null && (n.dependencies = e.dependencies), ji |= n.lanes, (a & n.childLanes) === 0)
      if (e !== null) {
        if (Za(
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
      for (e = n.child, a = qn(e, e.pendingProps), n.child = a, a.return = n; e.sibling !== null; )
        e = e.sibling, a = a.sibling = qn(e, e.pendingProps), a.return = n;
      a.sibling = null;
    }
    return n.child;
  }
  function yf(e, n) {
    return (e.lanes & n) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && $l(e)));
  }
  function Z1(e, n, a) {
    switch (n.tag) {
      case 3:
        J(n, n.stateNode.containerInfo), Si(n, ft, e.memoizedState.cache), na();
        break;
      case 27:
      case 5:
        se(n);
        break;
      case 4:
        J(n, n.stateNode.containerInfo);
        break;
      case 10:
        Si(
          n,
          n.type,
          n.memoizedProps.value
        );
        break;
      case 31:
        if (n.memoizedState !== null)
          return n.flags |= 128, Uc(n), null;
        break;
      case 13:
        var l = n.memoizedState;
        if (l !== null)
          return l.dehydrated !== null ? (Ci(n), n.flags |= 128, null) : (a & n.child.childLanes) !== 0 ? Og(e, n, a) : (Ci(n), e = Qn(
            e,
            n,
            a
          ), e !== null ? e.sibling : null);
        Ci(n);
        break;
      case 19:
        var f = (e.flags & 128) !== 0;
        if (l = (a & n.childLanes) !== 0, l || (Za(
          e,
          n,
          a,
          !1
        ), l = (a & n.childLanes) !== 0), f) {
          if (l)
            return Rg(
              e,
              n,
              a
            );
          n.flags |= 128;
        }
        if (f = n.memoizedState, f !== null && (f.rendering = null, f.tail = null, f.lastEffect = null), ne(rt, rt.current), l) break;
        return null;
      case 22:
        return n.lanes = 0, Cg(
          e,
          n,
          a,
          n.pendingProps
        );
      case 24:
        Si(n, ft, e.memoizedState.cache);
    }
    return Qn(e, n, a);
  }
  function kg(e, n, a) {
    if (e !== null)
      if (e.memoizedProps !== n.pendingProps)
        ht = !0;
      else {
        if (!yf(e, a) && (n.flags & 128) === 0)
          return ht = !1, Z1(
            e,
            n,
            a
          );
        ht = (e.flags & 131072) !== 0;
      }
    else
      ht = !1, Le && (n.flags & 1048576) !== 0 && hm(n, Jo, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          var l = n.pendingProps;
          if (e = ra(n.elementType), n.type = e, typeof e == "function")
            wc(e) ? (l = ca(e, l), n.tag = 1, n = jg(
              null,
              n,
              e,
              l,
              a
            )) : (n.tag = 0, n = cf(
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
                n.tag = 11, n = Eg(
                  null,
                  n,
                  e,
                  l,
                  a
                );
                break e;
              } else if (f === k) {
                n.tag = 14, n = _g(
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
        return cf(
          e,
          n,
          n.type,
          n.pendingProps,
          a
        );
      case 1:
        return l = n.type, f = ca(
          l,
          n.pendingProps
        ), jg(
          e,
          n,
          l,
          f,
          a
        );
      case 3:
        e: {
          if (J(
            n,
            n.stateNode.containerInfo
          ), e === null) throw Error(r(387));
          l = n.pendingProps;
          var h = n.memoizedState;
          f = h.element, Hc(e, n), rr(n, l, null, a);
          var S = n.memoizedState;
          if (l = S.cache, Si(n, ft, l), l !== h.cache && jc(
            n,
            [ft],
            a,
            !0
          ), or(), l = S.element, h.isDehydrated)
            if (h = {
              element: l,
              isDehydrated: !1,
              cache: S.cache
            }, n.updateQueue.baseState = h, n.memoizedState = h, n.flags & 256) {
              n = Ag(
                e,
                n,
                l,
                a
              );
              break e;
            } else if (l !== f) {
              f = Pt(
                Error(r(424)),
                n
              ), Po(f), n = Ag(
                e,
                n,
                l,
                a
              );
              break e;
            } else
              for (e = n.stateNode.containerInfo, e.nodeType === 9 ? e = e.body : e = e.nodeName === "HTML" ? e.ownerDocument.body : e, Je = on(e.firstChild), St = n, Le = !0, xi = null, nn = !0, a = Cm(
                n,
                null,
                l,
                a
              ), n.child = a; a; )
                a.flags = a.flags & -3 | 4096, a = a.sibling;
          else {
            if (na(), l === f) {
              n = Qn(
                e,
                n,
                a
              );
              break e;
            }
            _t(e, n, l, a);
          }
          n = n.child;
        }
        return n;
      case 26:
        return us(e, n), e === null ? (a = Gp(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = a : Le || (a = n.type, e = n.pendingProps, l = Cs(
          U.current
        ).createElement(a), l[vt] = n, l[Ct] = e, Nt(l, a, e), ct(l), n.stateNode = l) : n.memoizedState = Gp(
          n.type,
          e.memoizedProps,
          n.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return se(n), e === null && Le && (l = n.stateNode = qp(
          n.type,
          n.pendingProps,
          U.current
        ), St = n, nn = !0, f = Je, ki(n.type) ? (Ff = f, Je = on(l.firstChild)) : Je = f), _t(
          e,
          n,
          n.pendingProps.children,
          a
        ), us(e, n), e === null && (n.flags |= 4194304), n.child;
      case 5:
        return e === null && Le && ((f = l = Je) && (l = Ew(
          l,
          n.type,
          n.pendingProps,
          nn
        ), l !== null ? (n.stateNode = l, St = n, Je = on(l.firstChild), nn = !1, f = !0) : f = !1), f || wi(n)), se(n), f = n.type, h = n.pendingProps, S = e !== null ? e.memoizedProps : null, l = h.children, Xf(f, h) ? l = null : S !== null && Xf(f, S) && (n.flags |= 32), n.memoizedState !== null && (f = qc(
          e,
          n,
          B1,
          null,
          null,
          a
        ), Cr._currentValue = f), us(e, n), _t(e, n, l, a), n.child;
      case 6:
        return e === null && Le && ((e = a = Je) && (a = _w(
          a,
          n.pendingProps,
          nn
        ), a !== null ? (n.stateNode = a, St = n, Je = null, e = !0) : e = !1), e || wi(n)), null;
      case 13:
        return Og(e, n, a);
      case 4:
        return J(
          n,
          n.stateNode.containerInfo
        ), l = n.pendingProps, e === null ? n.child = sa(
          n,
          null,
          l,
          a
        ) : _t(e, n, l, a), n.child;
      case 11:
        return Eg(
          e,
          n,
          n.type,
          n.pendingProps,
          a
        );
      case 7:
        return _t(
          e,
          n,
          n.pendingProps,
          a
        ), n.child;
      case 8:
        return _t(
          e,
          n,
          n.pendingProps.children,
          a
        ), n.child;
      case 12:
        return _t(
          e,
          n,
          n.pendingProps.children,
          a
        ), n.child;
      case 10:
        return l = n.pendingProps, Si(n, n.type, l.value), _t(e, n, l.children, a), n.child;
      case 9:
        return f = n.type._context, l = n.pendingProps.children, aa(n), f = Et(f), l = l(f), n.flags |= 1, _t(e, n, l, a), n.child;
      case 14:
        return _g(
          e,
          n,
          n.type,
          n.pendingProps,
          a
        );
      case 15:
        return Ng(
          e,
          n,
          n.type,
          n.pendingProps,
          a
        );
      case 19:
        return Rg(e, n, a);
      case 31:
        return G1(e, n, a);
      case 22:
        return Cg(
          e,
          n,
          a,
          n.pendingProps
        );
      case 24:
        return aa(n), l = Et(ft), e === null ? (f = zc(), f === null && (f = We, h = Ac(), f.pooledCache = h, h.refCount++, h !== null && (f.pooledCacheLanes |= a), f = h), n.memoizedState = { parent: l, cache: f }, kc(n), Si(n, ft, f)) : ((e.lanes & a) !== 0 && (Hc(e, n), rr(n, null, null, a), or()), f = e.memoizedState, h = n.memoizedState, f.parent !== l ? (f = { parent: l, cache: l }, n.memoizedState = f, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = f), Si(n, ft, l)) : (l = h.cache, Si(n, ft, l), l !== f.cache && jc(
          n,
          [ft],
          a,
          !0
        ))), _t(
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
  function Fn(e) {
    e.flags |= 4;
  }
  function vf(e, n, a, l, f) {
    if ((n = (e.mode & 32) !== 0) && (n = !1), n) {
      if (e.flags |= 16777216, (f & 335544128) === f)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (sp()) e.flags |= 8192;
        else
          throw la = Kl, Rc;
    } else e.flags &= -16777217;
  }
  function Hg(e, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Wp(n))
      if (sp()) e.flags |= 8192;
      else
        throw la = Kl, Rc;
  }
  function fs(e, n) {
    n !== null && (e.flags |= 4), e.flags & 16384 && (n = e.tag !== 22 ? yl() : 536870912, e.lanes |= n, oo |= n);
  }
  function dr(e, n) {
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
  function K1(e, n, a) {
    var l = n.pendingProps;
    switch (Nc(n), n.tag) {
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
        return a = n.stateNode, l = null, e !== null && (l = e.memoizedState.cache), n.memoizedState.cache !== l && (n.flags |= 2048), Gn(ft), Z(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (e === null || e.child === null) && (Ga(n) ? Fn(n) : e === null || e.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, Mc())), Pe(n), null;
      case 26:
        var f = n.type, h = n.memoizedState;
        return e === null ? (Fn(n), h !== null ? (Pe(n), Hg(n, h)) : (Pe(n), vf(
          n,
          f,
          null,
          l,
          a
        ))) : h ? h !== e.memoizedState ? (Fn(n), Pe(n), Hg(n, h)) : (Pe(n), n.flags &= -16777217) : (e = e.memoizedProps, e !== l && Fn(n), Pe(n), vf(
          n,
          f,
          e,
          l,
          a
        )), null;
      case 27:
        if (me(n), a = U.current, f = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== l && Fn(n);
        else {
          if (!l) {
            if (n.stateNode === null)
              throw Error(r(166));
            return Pe(n), null;
          }
          e = H.current, Ga(n) ? gm(n) : (e = qp(f, l, a), n.stateNode = e, Fn(n));
        }
        return Pe(n), null;
      case 5:
        if (me(n), f = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== l && Fn(n);
        else {
          if (!l) {
            if (n.stateNode === null)
              throw Error(r(166));
            return Pe(n), null;
          }
          if (h = H.current, Ga(n))
            gm(n);
          else {
            var S = Cs(
              U.current
            );
            switch (h) {
              case 1:
                h = S.createElementNS(
                  "http://www.w3.org/2000/svg",
                  f
                );
                break;
              case 2:
                h = S.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  f
                );
                break;
              default:
                switch (f) {
                  case "svg":
                    h = S.createElementNS(
                      "http://www.w3.org/2000/svg",
                      f
                    );
                    break;
                  case "math":
                    h = S.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      f
                    );
                    break;
                  case "script":
                    h = S.createElement("div"), h.innerHTML = "<script><\/script>", h = h.removeChild(
                      h.firstChild
                    );
                    break;
                  case "select":
                    h = typeof l.is == "string" ? S.createElement("select", {
                      is: l.is
                    }) : S.createElement("select"), l.multiple ? h.multiple = !0 : l.size && (h.size = l.size);
                    break;
                  default:
                    h = typeof l.is == "string" ? S.createElement(f, { is: l.is }) : S.createElement(f);
                }
            }
            h[vt] = n, h[Ct] = l;
            e: for (S = n.child; S !== null; ) {
              if (S.tag === 5 || S.tag === 6)
                h.appendChild(S.stateNode);
              else if (S.tag !== 4 && S.tag !== 27 && S.child !== null) {
                S.child.return = S, S = S.child;
                continue;
              }
              if (S === n) break e;
              for (; S.sibling === null; ) {
                if (S.return === null || S.return === n)
                  break e;
                S = S.return;
              }
              S.sibling.return = S.return, S = S.sibling;
            }
            n.stateNode = h;
            e: switch (Nt(h, f, l), f) {
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
            l && Fn(n);
          }
        }
        return Pe(n), vf(
          n,
          n.type,
          e === null ? null : e.memoizedProps,
          n.pendingProps,
          a
        ), null;
      case 6:
        if (e && n.stateNode != null)
          e.memoizedProps !== l && Fn(n);
        else {
          if (typeof l != "string" && n.stateNode === null)
            throw Error(r(166));
          if (e = U.current, Ga(n)) {
            if (e = n.stateNode, a = n.memoizedProps, l = null, f = St, f !== null)
              switch (f.tag) {
                case 27:
                case 5:
                  l = f.memoizedProps;
              }
            e[vt] = n, e = !!(e.nodeValue === a || l !== null && l.suppressHydrationWarning === !0 || Op(e.nodeValue, a)), e || wi(n, !0);
          } else
            e = Cs(e).createTextNode(
              l
            ), e[vt] = n, n.stateNode = e;
        }
        return Pe(n), null;
      case 31:
        if (a = n.memoizedState, e === null || e.memoizedState !== null) {
          if (l = Ga(n), a !== null) {
            if (e === null) {
              if (!l) throw Error(r(318));
              if (e = n.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(r(557));
              e[vt] = n;
            } else
              na(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Pe(n), e = !1;
          } else
            a = Mc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), e = !0;
          if (!e)
            return n.flags & 256 ? ($t(n), n) : ($t(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(r(558));
        }
        return Pe(n), null;
      case 13:
        if (l = n.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (f = Ga(n), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!f) throw Error(r(318));
              if (f = n.memoizedState, f = f !== null ? f.dehydrated : null, !f) throw Error(r(317));
              f[vt] = n;
            } else
              na(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Pe(n), f = !1;
          } else
            f = Mc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = f), f = !0;
          if (!f)
            return n.flags & 256 ? ($t(n), n) : ($t(n), null);
        }
        return $t(n), (n.flags & 128) !== 0 ? (n.lanes = a, n) : (a = l !== null, e = e !== null && e.memoizedState !== null, a && (l = n.child, f = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (f = l.alternate.memoizedState.cachePool.pool), h = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (h = l.memoizedState.cachePool.pool), h !== f && (l.flags |= 2048)), a !== e && a && (n.child.flags |= 8192), fs(n, n.updateQueue), Pe(n), null);
      case 4:
        return Z(), e === null && Vf(n.stateNode.containerInfo), Pe(n), null;
      case 10:
        return Gn(n.type), Pe(n), null;
      case 19:
        if (V(rt), l = n.memoizedState, l === null) return Pe(n), null;
        if (f = (n.flags & 128) !== 0, h = l.rendering, h === null)
          if (f) dr(l, !1);
          else {
            if (at !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = n.child; e !== null; ) {
                if (h = Jl(e), h !== null) {
                  for (n.flags |= 128, dr(l, !1), e = h.updateQueue, n.updateQueue = e, fs(n, e), n.subtreeFlags = 0, e = a, a = n.child; a !== null; )
                    cm(a, e), a = a.sibling;
                  return ne(
                    rt,
                    rt.current & 1 | 2
                  ), Le && $n(n, l.treeForkCount), n.child;
                }
                e = e.sibling;
              }
            l.tail !== null && yt() > ps && (n.flags |= 128, f = !0, dr(l, !1), n.lanes = 4194304);
          }
        else {
          if (!f)
            if (e = Jl(h), e !== null) {
              if (n.flags |= 128, f = !0, e = e.updateQueue, n.updateQueue = e, fs(n, e), dr(l, !0), l.tail === null && l.tailMode === "hidden" && !h.alternate && !Le)
                return Pe(n), null;
            } else
              2 * yt() - l.renderingStartTime > ps && a !== 536870912 && (n.flags |= 128, f = !0, dr(l, !1), n.lanes = 4194304);
          l.isBackwards ? (h.sibling = n.child, n.child = h) : (e = l.last, e !== null ? e.sibling = h : n.child = h, l.last = h);
        }
        return l.tail !== null ? (e = l.tail, l.rendering = e, l.tail = e.sibling, l.renderingStartTime = yt(), e.sibling = null, a = rt.current, ne(
          rt,
          f ? a & 1 | 2 : a & 1
        ), Le && $n(n, l.treeForkCount), e) : (Pe(n), null);
      case 22:
      case 23:
        return $t(n), Vc(), l = n.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (n.flags |= 8192) : l && (n.flags |= 8192), l ? (a & 536870912) !== 0 && (n.flags & 128) === 0 && (Pe(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : Pe(n), a = n.updateQueue, a !== null && fs(n, a.retryQueue), a = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), l = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (l = n.memoizedState.cachePool.pool), l !== a && (n.flags |= 2048), e !== null && V(oa), null;
      case 24:
        return a = null, e !== null && (a = e.memoizedState.cache), n.memoizedState.cache !== a && (n.flags |= 2048), Gn(ft), Pe(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(r(156, n.tag));
  }
  function Q1(e, n) {
    switch (Nc(n), n.tag) {
      case 1:
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 3:
        return Gn(ft), Z(), e = n.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (n.flags = e & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return me(n), null;
      case 31:
        if (n.memoizedState !== null) {
          if ($t(n), n.alternate === null)
            throw Error(r(340));
          na();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 13:
        if ($t(n), e = n.memoizedState, e !== null && e.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(r(340));
          na();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 19:
        return V(rt), null;
      case 4:
        return Z(), null;
      case 10:
        return Gn(n.type), null;
      case 22:
      case 23:
        return $t(n), Vc(), e !== null && V(oa), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 24:
        return Gn(ft), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Lg(e, n) {
    switch (Nc(n), n.tag) {
      case 3:
        Gn(ft), Z();
        break;
      case 26:
      case 27:
      case 5:
        me(n);
        break;
      case 4:
        Z();
        break;
      case 31:
        n.memoizedState !== null && $t(n);
        break;
      case 13:
        $t(n);
        break;
      case 19:
        V(rt);
        break;
      case 10:
        Gn(n.type);
        break;
      case 22:
      case 23:
        $t(n), Vc(), e !== null && V(oa);
        break;
      case 24:
        Gn(ft);
    }
  }
  function hr(e, n) {
    try {
      var a = n.updateQueue, l = a !== null ? a.lastEffect : null;
      if (l !== null) {
        var f = l.next;
        a = f;
        do {
          if ((a.tag & e) === e) {
            l = void 0;
            var h = a.create, S = a.inst;
            l = h(), S.destroy = l;
          }
          a = a.next;
        } while (a !== f);
      }
    } catch (z) {
      Ge(n, n.return, z);
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
            var S = l.inst, z = S.destroy;
            if (z !== void 0) {
              S.destroy = void 0, f = n;
              var P = a, re = z;
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
  function Bg(e) {
    var n = e.updateQueue;
    if (n !== null) {
      var a = e.stateNode;
      try {
        Tm(n, a);
      } catch (l) {
        Ge(e, e.return, l);
      }
    }
  }
  function Ig(e, n, a) {
    a.props = ca(
      e.type,
      e.memoizedProps
    ), a.state = e.memoizedState;
    try {
      a.componentWillUnmount();
    } catch (l) {
      Ge(e, n, l);
    }
  }
  function mr(e, n) {
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
  function Mn(e, n) {
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
  function Vg(e) {
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
  function bf(e, n, a) {
    try {
      var l = e.stateNode;
      yw(l, e.type, a, n), l[Ct] = n;
    } catch (f) {
      Ge(e, e.return, f);
    }
  }
  function Ug(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && ki(e.type) || e.tag === 4;
  }
  function xf(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Ug(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && ki(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function wf(e, n, a) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, n ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(e, n) : (n = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, n.appendChild(e), a = a._reactRootContainer, a != null || n.onclick !== null || (n.onclick = Un));
    else if (l !== 4 && (l === 27 && ki(e.type) && (a = e.stateNode, n = null), e = e.child, e !== null))
      for (wf(e, n, a), e = e.sibling; e !== null; )
        wf(e, n, a), e = e.sibling;
  }
  function ds(e, n, a) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, n ? a.insertBefore(e, n) : a.appendChild(e);
    else if (l !== 4 && (l === 27 && ki(e.type) && (a = e.stateNode), e = e.child, e !== null))
      for (ds(e, n, a), e = e.sibling; e !== null; )
        ds(e, n, a), e = e.sibling;
  }
  function Yg(e) {
    var n = e.stateNode, a = e.memoizedProps;
    try {
      for (var l = e.type, f = n.attributes; f.length; )
        n.removeAttributeNode(f[0]);
      Nt(n, l, a), n[vt] = e, n[Ct] = a;
    } catch (h) {
      Ge(e, e.return, h);
    }
  }
  var Wn = !1, mt = !1, Sf = !1, qg = typeof WeakSet == "function" ? WeakSet : Set, wt = null;
  function F1(e, n) {
    if (e = e.containerInfo, qf = zs, e = tm(e), mc(e)) {
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
            var S = 0, z = -1, P = -1, re = 0, ce = 0, he = e, le = null;
            t: for (; ; ) {
              for (var ue; he !== a || f !== 0 && he.nodeType !== 3 || (z = S + f), he !== h || l !== 0 && he.nodeType !== 3 || (P = S + l), he.nodeType === 3 && (S += he.nodeValue.length), (ue = he.firstChild) !== null; )
                le = he, he = ue;
              for (; ; ) {
                if (he === e) break t;
                if (le === a && ++re === f && (z = S), le === h && ++ce === l && (P = S), (ue = he.nextSibling) !== null) break;
                he = le, le = he.parentNode;
              }
              he = ue;
            }
            a = z === -1 || P === -1 ? null : { start: z, end: P };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for ($f = { focusedElem: e, selectionRange: a }, zs = !1, wt = n; wt !== null; )
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
                  var ye = ca(
                    a.type,
                    f
                  );
                  e = l.getSnapshotBeforeUpdate(
                    ye,
                    h
                  ), l.__reactInternalSnapshotBeforeUpdate = e;
                } catch (Ne) {
                  Ge(
                    a,
                    a.return,
                    Ne
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = n.stateNode.containerInfo, a = e.nodeType, a === 9)
                  Zf(e);
                else if (a === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Zf(e);
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
  function $g(e, n, a) {
    var l = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        Pn(e, a), l & 4 && hr(5, a);
        break;
      case 1:
        if (Pn(e, a), l & 4)
          if (e = a.stateNode, n === null)
            try {
              e.componentDidMount();
            } catch (S) {
              Ge(a, a.return, S);
            }
          else {
            var f = ca(
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
            } catch (S) {
              Ge(
                a,
                a.return,
                S
              );
            }
          }
        l & 64 && Bg(a), l & 512 && mr(a, a.return);
        break;
      case 3:
        if (Pn(e, a), l & 64 && (e = a.updateQueue, e !== null)) {
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
            Tm(e, n);
          } catch (S) {
            Ge(a, a.return, S);
          }
        }
        break;
      case 27:
        n === null && l & 4 && Yg(a);
      case 26:
      case 5:
        Pn(e, a), n === null && l & 4 && Vg(a), l & 512 && mr(a, a.return);
        break;
      case 12:
        Pn(e, a);
        break;
      case 31:
        Pn(e, a), l & 4 && Zg(e, a);
        break;
      case 13:
        Pn(e, a), l & 4 && Kg(e, a), l & 64 && (e = a.memoizedState, e !== null && (e = e.dehydrated, e !== null && (a = ow.bind(
          null,
          a
        ), Nw(e, a))));
        break;
      case 22:
        if (l = a.memoizedState !== null || Wn, !l) {
          n = n !== null && n.memoizedState !== null || mt, f = Wn;
          var h = mt;
          Wn = l, (mt = n) && !h ? ei(
            e,
            a,
            (a.subtreeFlags & 8772) !== 0
          ) : Pn(e, a), Wn = f, mt = h;
        }
        break;
      case 30:
        break;
      default:
        Pn(e, a);
    }
  }
  function Xg(e) {
    var n = e.alternate;
    n !== null && (e.alternate = null, Xg(n)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (n = e.stateNode, n !== null && Vo(n)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var et = null, Rt = !1;
  function Jn(e, n, a) {
    for (a = a.child; a !== null; )
      Gg(e, n, a), a = a.sibling;
  }
  function Gg(e, n, a) {
    if (pe && typeof pe.onCommitFiberUnmount == "function")
      try {
        pe.onCommitFiberUnmount(fe, a);
      } catch {
      }
    switch (a.tag) {
      case 26:
        mt || Mn(a, n), Jn(
          e,
          n,
          a
        ), a.memoizedState ? a.memoizedState.count-- : a.stateNode && (a = a.stateNode, a.parentNode.removeChild(a));
        break;
      case 27:
        mt || Mn(a, n);
        var l = et, f = Rt;
        ki(a.type) && (et = a.stateNode, Rt = !1), Jn(
          e,
          n,
          a
        ), Er(a.stateNode), et = l, Rt = f;
        break;
      case 5:
        mt || Mn(a, n);
      case 6:
        if (l = et, f = Rt, et = null, Jn(
          e,
          n,
          a
        ), et = l, Rt = f, et !== null)
          if (Rt)
            try {
              (et.nodeType === 9 ? et.body : et.nodeName === "HTML" ? et.ownerDocument.body : et).removeChild(a.stateNode);
            } catch (h) {
              Ge(
                a,
                n,
                h
              );
            }
          else
            try {
              et.removeChild(a.stateNode);
            } catch (h) {
              Ge(
                a,
                n,
                h
              );
            }
        break;
      case 18:
        et !== null && (Rt ? (e = et, Bp(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          a.stateNode
        ), mo(e)) : Bp(et, a.stateNode));
        break;
      case 4:
        l = et, f = Rt, et = a.stateNode.containerInfo, Rt = !0, Jn(
          e,
          n,
          a
        ), et = l, Rt = f;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Ti(2, a, n), mt || Ti(4, a, n), Jn(
          e,
          n,
          a
        );
        break;
      case 1:
        mt || (Mn(a, n), l = a.stateNode, typeof l.componentWillUnmount == "function" && Ig(
          a,
          n,
          l
        )), Jn(
          e,
          n,
          a
        );
        break;
      case 21:
        Jn(
          e,
          n,
          a
        );
        break;
      case 22:
        mt = (l = mt) || a.memoizedState !== null, Jn(
          e,
          n,
          a
        ), mt = l;
        break;
      default:
        Jn(
          e,
          n,
          a
        );
    }
  }
  function Zg(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        mo(e);
      } catch (a) {
        Ge(n, n.return, a);
      }
    }
  }
  function Kg(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        mo(e);
      } catch (a) {
        Ge(n, n.return, a);
      }
  }
  function W1(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var n = e.stateNode;
        return n === null && (n = e.stateNode = new qg()), n;
      case 22:
        return e = e.stateNode, n = e._retryCache, n === null && (n = e._retryCache = new qg()), n;
      default:
        throw Error(r(435, e.tag));
    }
  }
  function hs(e, n) {
    var a = W1(e);
    n.forEach(function(l) {
      if (!a.has(l)) {
        a.add(l);
        var f = rw.bind(null, e, l);
        l.then(f, f);
      }
    });
  }
  function kt(e, n) {
    var a = n.deletions;
    if (a !== null)
      for (var l = 0; l < a.length; l++) {
        var f = a[l], h = e, S = n, z = S;
        e: for (; z !== null; ) {
          switch (z.tag) {
            case 27:
              if (ki(z.type)) {
                et = z.stateNode, Rt = !1;
                break e;
              }
              break;
            case 5:
              et = z.stateNode, Rt = !1;
              break e;
            case 3:
            case 4:
              et = z.stateNode.containerInfo, Rt = !0;
              break e;
          }
          z = z.return;
        }
        if (et === null) throw Error(r(160));
        Gg(h, S, f), et = null, Rt = !1, h = f.alternate, h !== null && (h.return = null), f.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        Qg(n, e), n = n.sibling;
  }
  var fn = null;
  function Qg(e, n) {
    var a = e.alternate, l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        kt(n, e), Ht(e), l & 4 && (Ti(3, e, e.return), hr(3, e), Ti(5, e, e.return));
        break;
      case 1:
        kt(n, e), Ht(e), l & 512 && (mt || a === null || Mn(a, a.return)), l & 64 && Wn && (e = e.updateQueue, e !== null && (l = e.callbacks, l !== null && (a = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = a === null ? l : a.concat(l))));
        break;
      case 26:
        var f = fn;
        if (kt(n, e), Ht(e), l & 512 && (mt || a === null || Mn(a, a.return)), l & 4) {
          var h = a !== null ? a.memoizedState : null;
          if (l = e.memoizedState, a === null)
            if (l === null)
              if (e.stateNode === null) {
                e: {
                  l = e.type, a = e.memoizedProps, f = f.ownerDocument || f;
                  t: switch (l) {
                    case "title":
                      h = f.getElementsByTagName("title")[0], (!h || h[Ki] || h[vt] || h.namespaceURI === "http://www.w3.org/2000/svg" || h.hasAttribute("itemprop")) && (h = f.createElement(l), f.head.insertBefore(
                        h,
                        f.querySelector("head > title")
                      )), Nt(h, l, a), h[vt] = e, ct(h), l = h;
                      break e;
                    case "link":
                      var S = Qp(
                        "link",
                        "href",
                        f
                      ).get(l + (a.href || ""));
                      if (S) {
                        for (var z = 0; z < S.length; z++)
                          if (h = S[z], h.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) && h.getAttribute("rel") === (a.rel == null ? null : a.rel) && h.getAttribute("title") === (a.title == null ? null : a.title) && h.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin)) {
                            S.splice(z, 1);
                            break t;
                          }
                      }
                      h = f.createElement(l), Nt(h, l, a), f.head.appendChild(h);
                      break;
                    case "meta":
                      if (S = Qp(
                        "meta",
                        "content",
                        f
                      ).get(l + (a.content || ""))) {
                        for (z = 0; z < S.length; z++)
                          if (h = S[z], h.getAttribute("content") === (a.content == null ? null : "" + a.content) && h.getAttribute("name") === (a.name == null ? null : a.name) && h.getAttribute("property") === (a.property == null ? null : a.property) && h.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) && h.getAttribute("charset") === (a.charSet == null ? null : a.charSet)) {
                            S.splice(z, 1);
                            break t;
                          }
                      }
                      h = f.createElement(l), Nt(h, l, a), f.head.appendChild(h);
                      break;
                    default:
                      throw Error(r(468, l));
                  }
                  h[vt] = e, ct(h), l = h;
                }
                e.stateNode = l;
              } else
                Fp(
                  f,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = Kp(
                f,
                l,
                e.memoizedProps
              );
          else
            h !== l ? (h === null ? a.stateNode !== null && (a = a.stateNode, a.parentNode.removeChild(a)) : h.count--, l === null ? Fp(
              f,
              e.type,
              e.stateNode
            ) : Kp(
              f,
              l,
              e.memoizedProps
            )) : l === null && e.stateNode !== null && bf(
              e,
              e.memoizedProps,
              a.memoizedProps
            );
        }
        break;
      case 27:
        kt(n, e), Ht(e), l & 512 && (mt || a === null || Mn(a, a.return)), a !== null && l & 4 && bf(
          e,
          e.memoizedProps,
          a.memoizedProps
        );
        break;
      case 5:
        if (kt(n, e), Ht(e), l & 512 && (mt || a === null || Mn(a, a.return)), e.flags & 32) {
          f = e.stateNode;
          try {
            Ha(f, "");
          } catch (ye) {
            Ge(e, e.return, ye);
          }
        }
        l & 4 && e.stateNode != null && (f = e.memoizedProps, bf(
          e,
          f,
          a !== null ? a.memoizedProps : f
        )), l & 1024 && (Sf = !0);
        break;
      case 6:
        if (kt(n, e), Ht(e), l & 4) {
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
        if (Ds = null, f = fn, fn = Ms(n.containerInfo), kt(n, e), fn = f, Ht(e), l & 4 && a !== null && a.memoizedState.isDehydrated)
          try {
            mo(n.containerInfo);
          } catch (ye) {
            Ge(e, e.return, ye);
          }
        Sf && (Sf = !1, Fg(e));
        break;
      case 4:
        l = fn, fn = Ms(
          e.stateNode.containerInfo
        ), kt(n, e), Ht(e), fn = l;
        break;
      case 12:
        kt(n, e), Ht(e);
        break;
      case 31:
        kt(n, e), Ht(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, hs(e, l)));
        break;
      case 13:
        kt(n, e), Ht(e), e.child.flags & 8192 && e.memoizedState !== null != (a !== null && a.memoizedState !== null) && (gs = yt()), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, hs(e, l)));
        break;
      case 22:
        f = e.memoizedState !== null;
        var P = a !== null && a.memoizedState !== null, re = Wn, ce = mt;
        if (Wn = re || f, mt = ce || P, kt(n, e), mt = ce, Wn = re, Ht(e), l & 8192)
          e: for (n = e.stateNode, n._visibility = f ? n._visibility & -2 : n._visibility | 1, f && (a === null || P || Wn || mt || fa(e)), a = null, n = e; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (a === null) {
                P = a = n;
                try {
                  if (h = P.stateNode, f)
                    S = h.style, typeof S.setProperty == "function" ? S.setProperty("display", "none", "important") : S.display = "none";
                  else {
                    z = P.stateNode;
                    var he = P.memoizedProps.style, le = he != null && he.hasOwnProperty("display") ? he.display : null;
                    z.style.display = le == null || typeof le == "boolean" ? "" : ("" + le).trim();
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
                  f ? Ip(ue, !0) : Ip(P.stateNode, !1);
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
        l & 4 && (l = e.updateQueue, l !== null && (a = l.retryQueue, a !== null && (l.retryQueue = null, hs(e, a))));
        break;
      case 19:
        kt(n, e), Ht(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, hs(e, l)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        kt(n, e), Ht(e);
    }
  }
  function Ht(e) {
    var n = e.flags;
    if (n & 2) {
      try {
        for (var a, l = e.return; l !== null; ) {
          if (Ug(l)) {
            a = l;
            break;
          }
          l = l.return;
        }
        if (a == null) throw Error(r(160));
        switch (a.tag) {
          case 27:
            var f = a.stateNode, h = xf(e);
            ds(e, h, f);
            break;
          case 5:
            var S = a.stateNode;
            a.flags & 32 && (Ha(S, ""), a.flags &= -33);
            var z = xf(e);
            ds(e, z, S);
            break;
          case 3:
          case 4:
            var P = a.stateNode.containerInfo, re = xf(e);
            wf(
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
  function Fg(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var n = e;
        Fg(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), e = e.sibling;
      }
  }
  function Pn(e, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        $g(e, n.alternate, n), n = n.sibling;
  }
  function fa(e) {
    for (e = e.child; e !== null; ) {
      var n = e;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Ti(4, n, n.return), fa(n);
          break;
        case 1:
          Mn(n, n.return);
          var a = n.stateNode;
          typeof a.componentWillUnmount == "function" && Ig(
            n,
            n.return,
            a
          ), fa(n);
          break;
        case 27:
          Er(n.stateNode);
        case 26:
        case 5:
          Mn(n, n.return), fa(n);
          break;
        case 22:
          n.memoizedState === null && fa(n);
          break;
        case 30:
          fa(n);
          break;
        default:
          fa(n);
      }
      e = e.sibling;
    }
  }
  function ei(e, n, a) {
    for (a = a && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var l = n.alternate, f = e, h = n, S = h.flags;
      switch (h.tag) {
        case 0:
        case 11:
        case 15:
          ei(
            f,
            h,
            a
          ), hr(4, h);
          break;
        case 1:
          if (ei(
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
            var z = l.stateNode;
            try {
              var P = f.shared.hiddenCallbacks;
              if (P !== null)
                for (f.shared.hiddenCallbacks = null, f = 0; f < P.length; f++)
                  Mm(P[f], z);
            } catch (re) {
              Ge(l, l.return, re);
            }
          }
          a && S & 64 && Bg(h), mr(h, h.return);
          break;
        case 27:
          Yg(h);
        case 26:
        case 5:
          ei(
            f,
            h,
            a
          ), a && l === null && S & 4 && Vg(h), mr(h, h.return);
          break;
        case 12:
          ei(
            f,
            h,
            a
          );
          break;
        case 31:
          ei(
            f,
            h,
            a
          ), a && S & 4 && Zg(f, h);
          break;
        case 13:
          ei(
            f,
            h,
            a
          ), a && S & 4 && Kg(f, h);
          break;
        case 22:
          h.memoizedState === null && ei(
            f,
            h,
            a
          ), mr(h, h.return);
          break;
        case 30:
          break;
        default:
          ei(
            f,
            h,
            a
          );
      }
      n = n.sibling;
    }
  }
  function Ef(e, n) {
    var a = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), e = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (e = n.memoizedState.cachePool.pool), e !== a && (e != null && e.refCount++, a != null && er(a));
  }
  function _f(e, n) {
    e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && er(e));
  }
  function dn(e, n, a, l) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        Wg(
          e,
          n,
          a,
          l
        ), n = n.sibling;
  }
  function Wg(e, n, a, l) {
    var f = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        dn(
          e,
          n,
          a,
          l
        ), f & 2048 && hr(9, n);
        break;
      case 1:
        dn(
          e,
          n,
          a,
          l
        );
        break;
      case 3:
        dn(
          e,
          n,
          a,
          l
        ), f & 2048 && (e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && er(e)));
        break;
      case 12:
        if (f & 2048) {
          dn(
            e,
            n,
            a,
            l
          ), e = n.stateNode;
          try {
            var h = n.memoizedProps, S = h.id, z = h.onPostCommit;
            typeof z == "function" && z(
              S,
              n.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (P) {
            Ge(n, n.return, P);
          }
        } else
          dn(
            e,
            n,
            a,
            l
          );
        break;
      case 31:
        dn(
          e,
          n,
          a,
          l
        );
        break;
      case 13:
        dn(
          e,
          n,
          a,
          l
        );
        break;
      case 23:
        break;
      case 22:
        h = n.stateNode, S = n.alternate, n.memoizedState !== null ? h._visibility & 2 ? dn(
          e,
          n,
          a,
          l
        ) : gr(e, n) : h._visibility & 2 ? dn(
          e,
          n,
          a,
          l
        ) : (h._visibility |= 2, no(
          e,
          n,
          a,
          l,
          (n.subtreeFlags & 10256) !== 0 || !1
        )), f & 2048 && Ef(S, n);
        break;
      case 24:
        dn(
          e,
          n,
          a,
          l
        ), f & 2048 && _f(n.alternate, n);
        break;
      default:
        dn(
          e,
          n,
          a,
          l
        );
    }
  }
  function no(e, n, a, l, f) {
    for (f = f && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var h = e, S = n, z = a, P = l, re = S.flags;
      switch (S.tag) {
        case 0:
        case 11:
        case 15:
          no(
            h,
            S,
            z,
            P,
            f
          ), hr(8, S);
          break;
        case 23:
          break;
        case 22:
          var ce = S.stateNode;
          S.memoizedState !== null ? ce._visibility & 2 ? no(
            h,
            S,
            z,
            P,
            f
          ) : gr(
            h,
            S
          ) : (ce._visibility |= 2, no(
            h,
            S,
            z,
            P,
            f
          )), f && re & 2048 && Ef(
            S.alternate,
            S
          );
          break;
        case 24:
          no(
            h,
            S,
            z,
            P,
            f
          ), f && re & 2048 && _f(S.alternate, S);
          break;
        default:
          no(
            h,
            S,
            z,
            P,
            f
          );
      }
      n = n.sibling;
    }
  }
  function gr(e, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var a = e, l = n, f = l.flags;
        switch (l.tag) {
          case 22:
            gr(a, l), f & 2048 && Ef(
              l.alternate,
              l
            );
            break;
          case 24:
            gr(a, l), f & 2048 && _f(l.alternate, l);
            break;
          default:
            gr(a, l);
        }
        n = n.sibling;
      }
  }
  var pr = 8192;
  function io(e, n, a) {
    if (e.subtreeFlags & pr)
      for (e = e.child; e !== null; )
        Jg(
          e,
          n,
          a
        ), e = e.sibling;
  }
  function Jg(e, n, a) {
    switch (e.tag) {
      case 26:
        io(
          e,
          n,
          a
        ), e.flags & pr && e.memoizedState !== null && Lw(
          a,
          fn,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        io(
          e,
          n,
          a
        );
        break;
      case 3:
      case 4:
        var l = fn;
        fn = Ms(e.stateNode.containerInfo), io(
          e,
          n,
          a
        ), fn = l;
        break;
      case 22:
        e.memoizedState === null && (l = e.alternate, l !== null && l.memoizedState !== null ? (l = pr, pr = 16777216, io(
          e,
          n,
          a
        ), pr = l) : io(
          e,
          n,
          a
        ));
        break;
      default:
        io(
          e,
          n,
          a
        );
    }
  }
  function Pg(e) {
    var n = e.alternate;
    if (n !== null && (e = n.child, e !== null)) {
      n.child = null;
      do
        n = e.sibling, e.sibling = null, e = n;
      while (e !== null);
    }
  }
  function yr(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var a = 0; a < n.length; a++) {
          var l = n[a];
          wt = l, tp(
            l,
            e
          );
        }
      Pg(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        ep(e), e = e.sibling;
  }
  function ep(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        yr(e), e.flags & 2048 && Ti(9, e, e.return);
        break;
      case 3:
        yr(e);
        break;
      case 12:
        yr(e);
        break;
      case 22:
        var n = e.stateNode;
        e.memoizedState !== null && n._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (n._visibility &= -3, ms(e)) : yr(e);
        break;
      default:
        yr(e);
    }
  }
  function ms(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var a = 0; a < n.length; a++) {
          var l = n[a];
          wt = l, tp(
            l,
            e
          );
        }
      Pg(e);
    }
    for (e = e.child; e !== null; ) {
      switch (n = e, n.tag) {
        case 0:
        case 11:
        case 15:
          Ti(8, n, n.return), ms(n);
          break;
        case 22:
          a = n.stateNode, a._visibility & 2 && (a._visibility &= -3, ms(n));
          break;
        default:
          ms(n);
      }
      e = e.sibling;
    }
  }
  function tp(e, n) {
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
          er(a.memoizedState.cache);
      }
      if (l = a.child, l !== null) l.return = a, wt = l;
      else
        e: for (a = e; wt !== null; ) {
          l = wt;
          var f = l.sibling, h = l.return;
          if (Xg(l), l === a) {
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
  var J1 = {
    getCacheForType: function(e) {
      var n = Et(ft), a = n.data.get(e);
      return a === void 0 && (a = e(), n.data.set(e, a)), a;
    },
    cacheSignal: function() {
      return Et(ft).controller.signal;
    }
  }, P1 = typeof WeakMap == "function" ? WeakMap : Map, $e = 0, We = null, Oe = null, Re = 0, Xe = 0, Xt = null, Di = !1, ao = !1, Nf = !1, ti = 0, at = 0, ji = 0, da = 0, Cf = 0, Gt = 0, oo = 0, vr = null, Lt = null, Mf = !1, gs = 0, np = 0, ps = 1 / 0, ys = null, Ai = null, bt = 0, Oi = null, ro = null, ni = 0, Tf = 0, Df = null, ip = null, br = 0, jf = null;
  function Zt() {
    return ($e & 2) !== 0 && Re !== 0 ? Re & -Re : M.T !== null ? Hf() : wl();
  }
  function ap() {
    if (Gt === 0)
      if ((Re & 536870912) === 0 || Le) {
        var e = Da;
        Da <<= 1, (Da & 3932160) === 0 && (Da = 262144), Gt = e;
      } else Gt = 536870912;
    return e = qt.current, e !== null && (e.flags |= 32), Gt;
  }
  function Bt(e, n, a) {
    (e === We && (Xe === 2 || Xe === 9) || e.cancelPendingCommit !== null) && (lo(e, 0), zi(
      e,
      Re,
      Gt,
      !1
    )), Zi(e, a), (($e & 2) === 0 || e !== We) && (e === We && (($e & 2) === 0 && (da |= a), at === 4 && zi(
      e,
      Re,
      Gt,
      !1
    )), Tn(e));
  }
  function op(e, n, a) {
    if (($e & 6) !== 0) throw Error(r(327));
    var l = !a && (n & 127) === 0 && (n & e.expiredLanes) === 0 || Gi(e, n), f = l ? nw(e, n) : Of(e, n, !0), h = l;
    do {
      if (f === 0) {
        ao && !l && zi(e, n, 0, !1);
        break;
      } else {
        if (a = e.current.alternate, h && !ew(a)) {
          f = Of(e, n, !1), h = !1;
          continue;
        }
        if (f === 2) {
          if (h = n, e.errorRecoveryDisabledLanes & h)
            var S = 0;
          else
            S = e.pendingLanes & -536870913, S = S !== 0 ? S : S & 536870912 ? 536870912 : 0;
          if (S !== 0) {
            n = S;
            e: {
              var z = e;
              f = vr;
              var P = z.current.memoizedState.isDehydrated;
              if (P && (lo(z, S).flags |= 256), S = Of(
                z,
                S,
                !1
              ), S !== 2) {
                if (Nf && !P) {
                  z.errorRecoveryDisabledLanes |= h, da |= h, f = 4;
                  break e;
                }
                h = Lt, Lt = f, h !== null && (Lt === null ? Lt = h : Lt.push.apply(
                  Lt,
                  h
                ));
              }
              f = S;
            }
            if (h = !1, f !== 2) continue;
          }
        }
        if (f === 1) {
          lo(e, 0), zi(e, n, 0, !0);
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
                Gt,
                !Di
              );
              break e;
            case 2:
              Lt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((n & 62914560) === n && (f = gs + 300 - yt(), 10 < f)) {
            if (zi(
              l,
              n,
              Gt,
              !Di
            ), Aa(l, 0, !0) !== 0) break e;
            ni = n, l.timeoutHandle = Hp(
              rp.bind(
                null,
                l,
                a,
                Lt,
                ys,
                Mf,
                n,
                Gt,
                da,
                oo,
                Di,
                h,
                "Throttled",
                -0,
                0
              ),
              f
            );
            break e;
          }
          rp(
            l,
            a,
            Lt,
            ys,
            Mf,
            n,
            Gt,
            da,
            oo,
            Di,
            h,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Tn(e);
  }
  function rp(e, n, a, l, f, h, S, z, P, re, ce, he, le, ue) {
    if (e.timeoutHandle = -1, he = n.subtreeFlags, he & 8192 || (he & 16785408) === 16785408) {
      he = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Un
      }, Jg(
        n,
        h,
        he
      );
      var ye = (h & 62914560) === h ? gs - yt() : (h & 4194048) === h ? np - yt() : 0;
      if (ye = Bw(
        he,
        ye
      ), ye !== null) {
        ni = h, e.cancelPendingCommit = ye(
          mp.bind(
            null,
            e,
            n,
            h,
            a,
            l,
            f,
            S,
            z,
            P,
            ce,
            he,
            null,
            le,
            ue
          )
        ), zi(e, h, S, !re);
        return;
      }
    }
    mp(
      e,
      n,
      h,
      a,
      l,
      f,
      S,
      z,
      P
    );
  }
  function ew(e) {
    for (var n = e; ; ) {
      var a = n.tag;
      if ((a === 0 || a === 11 || a === 15) && n.flags & 16384 && (a = n.updateQueue, a !== null && (a = a.stores, a !== null)))
        for (var l = 0; l < a.length; l++) {
          var f = a[l], h = f.getSnapshot;
          f = f.value;
          try {
            if (!Ut(h(), f)) return !1;
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
    n &= ~Cf, n &= ~da, e.suspendedLanes |= n, e.pingedLanes &= ~n, l && (e.warmLanes |= n), l = e.expirationTimes;
    for (var f = n; 0 < f; ) {
      var h = 31 - De(f), S = 1 << h;
      l[h] = -1, f &= ~S;
    }
    a !== 0 && vl(e, a, n);
  }
  function vs() {
    return ($e & 6) === 0 ? (xr(0), !1) : !0;
  }
  function Af() {
    if (Oe !== null) {
      if (Xe === 0)
        var e = Oe.return;
      else
        e = Oe, Xn = ia = null, Gc(e), Wa = null, nr = 0, e = Oe;
      for (; e !== null; )
        Lg(e.alternate, e), e = e.return;
      Oe = null;
    }
  }
  function lo(e, n) {
    var a = e.timeoutHandle;
    a !== -1 && (e.timeoutHandle = -1, xw(a)), a = e.cancelPendingCommit, a !== null && (e.cancelPendingCommit = null, a()), ni = 0, Af(), We = e, Oe = a = qn(e.current, null), Re = n, Xe = 0, Xt = null, Di = !1, ao = Gi(e, n), Nf = !1, oo = Gt = Cf = da = ji = at = 0, Lt = vr = null, Mf = !1, (n & 8) !== 0 && (n |= n & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= n; 0 < l; ) {
        var f = 31 - De(l), h = 1 << f;
        n |= e[f], l &= ~h;
      }
    return ti = n, Il(), a;
  }
  function lp(e, n) {
    Te = null, M.H = cr, n === Fa || n === Zl ? (n = Em(), Xe = 3) : n === Rc ? (n = Em(), Xe = 4) : Xe = n === uf ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, Xt = n, Oe === null && (at = 1, ls(
      e,
      Pt(n, e.current)
    ));
  }
  function sp() {
    var e = qt.current;
    return e === null ? !0 : (Re & 4194048) === Re ? an === null : (Re & 62914560) === Re || (Re & 536870912) !== 0 ? e === an : !1;
  }
  function up() {
    var e = M.H;
    return M.H = cr, e === null ? cr : e;
  }
  function cp() {
    var e = M.A;
    return M.A = J1, e;
  }
  function bs() {
    at = 4, Di || (Re & 4194048) !== Re && qt.current !== null || (ao = !0), (ji & 134217727) === 0 && (da & 134217727) === 0 || We === null || zi(
      We,
      Re,
      Gt,
      !1
    );
  }
  function Of(e, n, a) {
    var l = $e;
    $e |= 2;
    var f = up(), h = cp();
    (We !== e || Re !== n) && (ys = null, lo(e, n)), n = !1;
    var S = at;
    e: do
      try {
        if (Xe !== 0 && Oe !== null) {
          var z = Oe, P = Xt;
          switch (Xe) {
            case 8:
              Af(), S = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              qt.current === null && (n = !0);
              var re = Xe;
              if (Xe = 0, Xt = null, so(e, z, P, re), a && ao) {
                S = 0;
                break e;
              }
              break;
            default:
              re = Xe, Xe = 0, Xt = null, so(e, z, P, re);
          }
        }
        tw(), S = at;
        break;
      } catch (ce) {
        lp(e, ce);
      }
    while (!0);
    return n && e.shellSuspendCounter++, Xn = ia = null, $e = l, M.H = f, M.A = h, Oe === null && (We = null, Re = 0, Il()), S;
  }
  function tw() {
    for (; Oe !== null; ) fp(Oe);
  }
  function nw(e, n) {
    var a = $e;
    $e |= 2;
    var l = up(), f = cp();
    We !== e || Re !== n ? (ys = null, ps = yt() + 500, lo(e, n)) : ao = Gi(
      e,
      n
    );
    e: do
      try {
        if (Xe !== 0 && Oe !== null) {
          n = Oe;
          var h = Xt;
          t: switch (Xe) {
            case 1:
              Xe = 0, Xt = null, so(e, n, h, 1);
              break;
            case 2:
            case 9:
              if (wm(h)) {
                Xe = 0, Xt = null, dp(n);
                break;
              }
              n = function() {
                Xe !== 2 && Xe !== 9 || We !== e || (Xe = 7), Tn(e);
              }, h.then(n, n);
              break e;
            case 3:
              Xe = 7;
              break e;
            case 4:
              Xe = 5;
              break e;
            case 7:
              wm(h) ? (Xe = 0, Xt = null, dp(n)) : (Xe = 0, Xt = null, so(e, n, h, 7));
              break;
            case 5:
              var S = null;
              switch (Oe.tag) {
                case 26:
                  S = Oe.memoizedState;
                case 5:
                case 27:
                  var z = Oe;
                  if (S ? Wp(S) : z.stateNode.complete) {
                    Xe = 0, Xt = null;
                    var P = z.sibling;
                    if (P !== null) Oe = P;
                    else {
                      var re = z.return;
                      re !== null ? (Oe = re, xs(re)) : Oe = null;
                    }
                    break t;
                  }
              }
              Xe = 0, Xt = null, so(e, n, h, 5);
              break;
            case 6:
              Xe = 0, Xt = null, so(e, n, h, 6);
              break;
            case 8:
              Af(), at = 6;
              break e;
            default:
              throw Error(r(462));
          }
        }
        iw();
        break;
      } catch (ce) {
        lp(e, ce);
      }
    while (!0);
    return Xn = ia = null, M.H = l, M.A = f, $e = a, Oe !== null ? 0 : (We = null, Re = 0, Il(), at);
  }
  function iw() {
    for (; Oe !== null && !Wt(); )
      fp(Oe);
  }
  function fp(e) {
    var n = kg(e.alternate, e, ti);
    e.memoizedProps = e.pendingProps, n === null ? xs(e) : Oe = n;
  }
  function dp(e) {
    var n = e, a = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = Dg(
          a,
          n,
          n.pendingProps,
          n.type,
          void 0,
          Re
        );
        break;
      case 11:
        n = Dg(
          a,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          Re
        );
        break;
      case 5:
        Gc(n);
      default:
        Lg(a, n), n = Oe = cm(n, ti), n = kg(a, n, ti);
    }
    e.memoizedProps = e.pendingProps, n === null ? xs(e) : Oe = n;
  }
  function so(e, n, a, l) {
    Xn = ia = null, Gc(n), Wa = null, nr = 0;
    var f = n.return;
    try {
      if (X1(
        e,
        f,
        n,
        a,
        Re
      )) {
        at = 1, ls(
          e,
          Pt(a, e.current)
        ), Oe = null;
        return;
      }
    } catch (h) {
      if (f !== null) throw Oe = f, h;
      at = 1, ls(
        e,
        Pt(a, e.current)
      ), Oe = null;
      return;
    }
    n.flags & 32768 ? (Le || l === 1 ? e = !0 : ao || (Re & 536870912) !== 0 ? e = !1 : (Di = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = qt.current, l !== null && l.tag === 13 && (l.flags |= 16384))), hp(n, e)) : xs(n);
  }
  function xs(e) {
    var n = e;
    do {
      if ((n.flags & 32768) !== 0) {
        hp(
          n,
          Di
        );
        return;
      }
      e = n.return;
      var a = K1(
        n.alternate,
        n,
        ti
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
    at === 0 && (at = 5);
  }
  function hp(e, n) {
    do {
      var a = Q1(e.alternate, e);
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
    at = 6, Oe = null;
  }
  function mp(e, n, a, l, f, h, S, z, P) {
    e.cancelPendingCommit = null;
    do
      ws();
    while (bt !== 0);
    if (($e & 6) !== 0) throw Error(r(327));
    if (n !== null) {
      if (n === e.current) throw Error(r(177));
      if (h = n.lanes | n.childLanes, h |= bc, Qu(
        e,
        a,
        h,
        S,
        z,
        P
      ), e === We && (Oe = We = null, Re = 0), ro = n, Oi = e, ni = a, Tf = h, Df = f, ip = l, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, lw(Hn, function() {
        return bp(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), l = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || l) {
        l = M.T, M.T = null, f = R.p, R.p = 2, S = $e, $e |= 4;
        try {
          F1(e, n, a);
        } finally {
          $e = S, R.p = f, M.T = l;
        }
      }
      bt = 1, gp(), pp(), yp();
    }
  }
  function gp() {
    if (bt === 1) {
      bt = 0;
      var e = Oi, n = ro, a = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || a) {
        a = M.T, M.T = null;
        var l = R.p;
        R.p = 2;
        var f = $e;
        $e |= 4;
        try {
          Qg(n, e);
          var h = $f, S = tm(e.containerInfo), z = h.focusedElem, P = h.selectionRange;
          if (S !== z && z && z.ownerDocument && em(
            z.ownerDocument.documentElement,
            z
          )) {
            if (P !== null && mc(z)) {
              var re = P.start, ce = P.end;
              if (ce === void 0 && (ce = re), "selectionStart" in z)
                z.selectionStart = re, z.selectionEnd = Math.min(
                  ce,
                  z.value.length
                );
              else {
                var he = z.ownerDocument || document, le = he && he.defaultView || window;
                if (le.getSelection) {
                  var ue = le.getSelection(), ye = z.textContent.length, Ne = Math.min(P.start, ye), Fe = P.end === void 0 ? Ne : Math.min(P.end, ye);
                  !ue.extend && Ne > Fe && (S = Fe, Fe = Ne, Ne = S);
                  var ae = Ph(
                    z,
                    Ne
                  ), ie = Ph(
                    z,
                    Fe
                  );
                  if (ae && ie && (ue.rangeCount !== 1 || ue.anchorNode !== ae.node || ue.anchorOffset !== ae.offset || ue.focusNode !== ie.node || ue.focusOffset !== ie.offset)) {
                    var oe = he.createRange();
                    oe.setStart(ae.node, ae.offset), ue.removeAllRanges(), Ne > Fe ? (ue.addRange(oe), ue.extend(ie.node, ie.offset)) : (oe.setEnd(ie.node, ie.offset), ue.addRange(oe));
                  }
                }
              }
            }
            for (he = [], ue = z; ue = ue.parentNode; )
              ue.nodeType === 1 && he.push({
                element: ue,
                left: ue.scrollLeft,
                top: ue.scrollTop
              });
            for (typeof z.focus == "function" && z.focus(), z = 0; z < he.length; z++) {
              var de = he[z];
              de.element.scrollLeft = de.left, de.element.scrollTop = de.top;
            }
          }
          zs = !!qf, $f = qf = null;
        } finally {
          $e = f, R.p = l, M.T = a;
        }
      }
      e.current = n, bt = 2;
    }
  }
  function pp() {
    if (bt === 2) {
      bt = 0;
      var e = Oi, n = ro, a = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || a) {
        a = M.T, M.T = null;
        var l = R.p;
        R.p = 2;
        var f = $e;
        $e |= 4;
        try {
          $g(e, n.alternate, n);
        } finally {
          $e = f, R.p = l, M.T = a;
        }
      }
      bt = 3;
    }
  }
  function yp() {
    if (bt === 4 || bt === 3) {
      bt = 0, kn();
      var e = Oi, n = ro, a = ni, l = ip;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? bt = 5 : (bt = 0, ro = Oi = null, vp(e, e.pendingLanes));
      var f = e.pendingLanes;
      if (f === 0 && (Ai = null), Io(a), n = n.stateNode, pe && typeof pe.onCommitFiberRoot == "function")
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
        n = M.T, f = R.p, R.p = 2, M.T = null;
        try {
          for (var h = e.onRecoverableError, S = 0; S < l.length; S++) {
            var z = l[S];
            h(z.value, {
              componentStack: z.stack
            });
          }
        } finally {
          M.T = n, R.p = f;
        }
      }
      (ni & 3) !== 0 && ws(), Tn(e), f = e.pendingLanes, (a & 261930) !== 0 && (f & 42) !== 0 ? e === jf ? br++ : (br = 0, jf = e) : br = 0, xr(0);
    }
  }
  function vp(e, n) {
    (e.pooledCacheLanes &= n) === 0 && (n = e.pooledCache, n != null && (e.pooledCache = null, er(n)));
  }
  function ws() {
    return gp(), pp(), yp(), bp();
  }
  function bp() {
    if (bt !== 5) return !1;
    var e = Oi, n = Tf;
    Tf = 0;
    var a = Io(ni), l = M.T, f = R.p;
    try {
      R.p = 32 > a ? 32 : a, M.T = null, a = Df, Df = null;
      var h = Oi, S = ni;
      if (bt = 0, ro = Oi = null, ni = 0, ($e & 6) !== 0) throw Error(r(331));
      var z = $e;
      if ($e |= 4, ep(h.current), Wg(
        h,
        h.current,
        S,
        a
      ), $e = z, xr(0, !1), pe && typeof pe.onPostCommitFiberRoot == "function")
        try {
          pe.onPostCommitFiberRoot(fe, h);
        } catch {
        }
      return !0;
    } finally {
      R.p = f, M.T = l, vp(e, n);
    }
  }
  function xp(e, n, a) {
    n = Pt(a, n), n = sf(e.stateNode, n, 2), e = Ni(e, n, 2), e !== null && (Zi(e, 2), Tn(e));
  }
  function Ge(e, n, a) {
    if (e.tag === 3)
      xp(e, e, a);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          xp(
            n,
            e,
            a
          );
          break;
        } else if (n.tag === 1) {
          var l = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (Ai === null || !Ai.has(l))) {
            e = Pt(a, e), a = wg(2), l = Ni(n, a, 2), l !== null && (Sg(
              a,
              l,
              n,
              e
            ), Zi(l, 2), Tn(l));
            break;
          }
        }
        n = n.return;
      }
  }
  function zf(e, n, a) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new P1();
      var f = /* @__PURE__ */ new Set();
      l.set(n, f);
    } else
      f = l.get(n), f === void 0 && (f = /* @__PURE__ */ new Set(), l.set(n, f));
    f.has(a) || (Nf = !0, f.add(a), e = aw.bind(null, e, n, a), n.then(e, e));
  }
  function aw(e, n, a) {
    var l = e.pingCache;
    l !== null && l.delete(n), e.pingedLanes |= e.suspendedLanes & a, e.warmLanes &= ~a, We === e && (Re & a) === a && (at === 4 || at === 3 && (Re & 62914560) === Re && 300 > yt() - gs ? ($e & 2) === 0 && lo(e, 0) : Cf |= a, oo === Re && (oo = 0)), Tn(e);
  }
  function wp(e, n) {
    n === 0 && (n = yl()), e = ea(e, n), e !== null && (Zi(e, n), Tn(e));
  }
  function ow(e) {
    var n = e.memoizedState, a = 0;
    n !== null && (a = n.retryLane), wp(e, a);
  }
  function rw(e, n) {
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
    l !== null && l.delete(n), wp(e, a);
  }
  function lw(e, n) {
    return ut(e, n);
  }
  var Ss = null, uo = null, Rf = !1, Es = !1, kf = !1, Ri = 0;
  function Tn(e) {
    e !== uo && e.next === null && (uo === null ? Ss = uo = e : uo = uo.next = e), Es = !0, Rf || (Rf = !0, uw());
  }
  function xr(e, n) {
    if (!kf && Es) {
      kf = !0;
      do
        for (var a = !1, l = Ss; l !== null; ) {
          if (e !== 0) {
            var f = l.pendingLanes;
            if (f === 0) var h = 0;
            else {
              var S = l.suspendedLanes, z = l.pingedLanes;
              h = (1 << 31 - De(42 | e) + 1) - 1, h &= f & ~(S & ~z), h = h & 201326741 ? h & 201326741 | 1 : h ? h | 2 : 0;
            }
            h !== 0 && (a = !0, Np(l, h));
          } else
            h = Re, h = Aa(
              l,
              l === We ? h : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (h & 3) === 0 || Gi(l, h) || (a = !0, Np(l, h));
          l = l.next;
        }
      while (a);
      kf = !1;
    }
  }
  function sw() {
    Sp();
  }
  function Sp() {
    Es = Rf = !1;
    var e = 0;
    Ri !== 0 && bw() && (e = Ri);
    for (var n = yt(), a = null, l = Ss; l !== null; ) {
      var f = l.next, h = Ep(l, n);
      h === 0 ? (l.next = null, a === null ? Ss = f : a.next = f, f === null && (uo = a)) : (a = l, (e !== 0 || (h & 3) !== 0) && (Es = !0)), l = f;
    }
    bt !== 0 && bt !== 5 || xr(e), Ri !== 0 && (Ri = 0);
  }
  function Ep(e, n) {
    for (var a = e.suspendedLanes, l = e.pingedLanes, f = e.expirationTimes, h = e.pendingLanes & -62914561; 0 < h; ) {
      var S = 31 - De(h), z = 1 << S, P = f[S];
      P === -1 ? ((z & a) === 0 || (z & l) !== 0) && (f[S] = Ku(z, n)) : P <= n && (e.expiredLanes |= z), h &= ~z;
    }
    if (n = We, a = Re, a = Aa(
      e,
      e === n ? a : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, a === 0 || e === n && (Xe === 2 || Xe === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && jt(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((a & 3) === 0 || Gi(e, a)) {
      if (n = a & -a, n === e.callbackPriority) return n;
      switch (l !== null && jt(l), Io(a)) {
        case 2:
        case 8:
          a = Sn;
          break;
        case 32:
          a = Hn;
          break;
        case 268435456:
          a = di;
          break;
        default:
          a = Hn;
      }
      return l = _p.bind(null, e), a = ut(a, l), e.callbackPriority = n, e.callbackNode = a, n;
    }
    return l !== null && l !== null && jt(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function _p(e, n) {
    if (bt !== 0 && bt !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var a = e.callbackNode;
    if (ws() && e.callbackNode !== a)
      return null;
    var l = Re;
    return l = Aa(
      e,
      e === We ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (op(e, l, n), Ep(e, yt()), e.callbackNode != null && e.callbackNode === a ? _p.bind(null, e) : null);
  }
  function Np(e, n) {
    if (ws()) return null;
    op(e, n, !0);
  }
  function uw() {
    ww(function() {
      ($e & 6) !== 0 ? ut(
        sn,
        sw
      ) : Sp();
    });
  }
  function Hf() {
    if (Ri === 0) {
      var e = Ka;
      e === 0 && (e = Ta, Ta <<= 1, (Ta & 261888) === 0 && (Ta = 256)), Ri = e;
    }
    return Ri;
  }
  function Cp(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Al("" + e);
  }
  function Mp(e, n) {
    var a = n.ownerDocument.createElement("input");
    return a.name = n.name, a.value = n.value, e.id && a.setAttribute("form", e.id), n.parentNode.insertBefore(a, n), e = new FormData(e), a.parentNode.removeChild(a), e;
  }
  function cw(e, n, a, l, f) {
    if (n === "submit" && a && a.stateNode === f) {
      var h = Cp(
        (f[Ct] || null).action
      ), S = l.submitter;
      S && (n = (n = S[Ct] || null) ? Cp(n.formAction) : S.getAttribute("formAction"), n !== null && (h = n, S = null));
      var z = new kl(
        "action",
        "action",
        null,
        l,
        f
      );
      e.push({
        event: z,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (l.defaultPrevented) {
                if (Ri !== 0) {
                  var P = S ? Mp(f, S) : new FormData(f);
                  tf(
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
                typeof h == "function" && (z.preventDefault(), P = S ? Mp(f, S) : new FormData(f), tf(
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
  for (var Lf = 0; Lf < vc.length; Lf++) {
    var Bf = vc[Lf], fw = Bf.toLowerCase(), dw = Bf[0].toUpperCase() + Bf.slice(1);
    cn(
      fw,
      "on" + dw
    );
  }
  cn(am, "onAnimationEnd"), cn(om, "onAnimationIteration"), cn(rm, "onAnimationStart"), cn("dblclick", "onDoubleClick"), cn("focusin", "onFocus"), cn("focusout", "onBlur"), cn(T1, "onTransitionRun"), cn(D1, "onTransitionStart"), cn(j1, "onTransitionCancel"), cn(lm, "onTransitionEnd"), yi("onMouseEnter", ["mouseout", "mouseover"]), yi("onMouseLeave", ["mouseout", "mouseover"]), yi("onPointerEnter", ["pointerout", "pointerover"]), yi("onPointerLeave", ["pointerout", "pointerover"]), In(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), In(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), In("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), In(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), In(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), In(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var wr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), hw = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(wr)
  );
  function Tp(e, n) {
    n = (n & 4) !== 0;
    for (var a = 0; a < e.length; a++) {
      var l = e[a], f = l.event;
      l = l.listeners;
      e: {
        var h = void 0;
        if (n)
          for (var S = l.length - 1; 0 <= S; S--) {
            var z = l[S], P = z.instance, re = z.currentTarget;
            if (z = z.listener, P !== h && f.isPropagationStopped())
              break e;
            h = z, f.currentTarget = re;
            try {
              h(f);
            } catch (ce) {
              Bl(ce);
            }
            f.currentTarget = null, h = P;
          }
        else
          for (S = 0; S < l.length; S++) {
            if (z = l[S], P = z.instance, re = z.currentTarget, z = z.listener, P !== h && f.isPropagationStopped())
              break e;
            h = z, f.currentTarget = re;
            try {
              h(f);
            } catch (ce) {
              Bl(ce);
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
    a.has(l) || (Dp(n, e, 2, !1), a.add(l));
  }
  function If(e, n, a) {
    var l = 0;
    n && (l |= 4), Dp(
      a,
      e,
      l,
      n
    );
  }
  var _s = "_reactListening" + Math.random().toString(36).slice(2);
  function Vf(e) {
    if (!e[_s]) {
      e[_s] = !0, Nl.forEach(function(a) {
        a !== "selectionchange" && (hw.has(a) || If(a, !1, e), If(a, !0, e));
      });
      var n = e.nodeType === 9 ? e : e.ownerDocument;
      n === null || n[_s] || (n[_s] = !0, If("selectionchange", !1, n));
    }
  }
  function Dp(e, n, a, l) {
    switch (ay(n)) {
      case 2:
        var f = Uw;
        break;
      case 8:
        f = Yw;
        break;
      default:
        f = td;
    }
    a = f.bind(
      null,
      n,
      a,
      e
    ), f = void 0, !oc || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (f = !0), l ? f !== void 0 ? e.addEventListener(n, a, {
      capture: !0,
      passive: f
    }) : e.addEventListener(n, a, !0) : f !== void 0 ? e.addEventListener(n, a, {
      passive: f
    }) : e.addEventListener(n, a, !1);
  }
  function Uf(e, n, a, l, f) {
    var h = l;
    if ((n & 1) === 0 && (n & 2) === 0 && l !== null)
      e: for (; ; ) {
        if (l === null) return;
        var S = l.tag;
        if (S === 3 || S === 4) {
          var z = l.stateNode.containerInfo;
          if (z === f) break;
          if (S === 4)
            for (S = l.return; S !== null; ) {
              var P = S.tag;
              if ((P === 3 || P === 4) && S.stateNode.containerInfo === f)
                return;
              S = S.return;
            }
          for (; z !== null; ) {
            if (S = hi(z), S === null) return;
            if (P = S.tag, P === 5 || P === 6 || P === 26 || P === 27) {
              l = h = S;
              continue e;
            }
            z = z.parentNode;
          }
        }
        l = l.return;
      }
    Rh(function() {
      var re = h, ce = ic(a), he = [];
      e: {
        var le = sm.get(e);
        if (le !== void 0) {
          var ue = kl, ye = e;
          switch (e) {
            case "keypress":
              if (zl(a) === 0) break e;
            case "keydown":
            case "keyup":
              ue = r1;
              break;
            case "focusin":
              ye = "focus", ue = uc;
              break;
            case "focusout":
              ye = "blur", ue = uc;
              break;
            case "beforeblur":
            case "afterblur":
              ue = uc;
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
              ue = Lh;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              ue = Kx;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              ue = u1;
              break;
            case am:
            case om:
            case rm:
              ue = Wx;
              break;
            case lm:
              ue = f1;
              break;
            case "scroll":
            case "scrollend":
              ue = Gx;
              break;
            case "wheel":
              ue = h1;
              break;
            case "copy":
            case "cut":
            case "paste":
              ue = Px;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              ue = Ih;
              break;
            case "toggle":
            case "beforetoggle":
              ue = g1;
          }
          var Ne = (n & 4) !== 0, Fe = !Ne && (e === "scroll" || e === "scrollend"), ae = Ne ? le !== null ? le + "Capture" : null : le;
          Ne = [];
          for (var ie = re, oe; ie !== null; ) {
            var de = ie;
            if (oe = de.stateNode, de = de.tag, de !== 5 && de !== 26 && de !== 27 || oe === null || ae === null || (de = qo(ie, ae), de != null && Ne.push(
              Sr(ie, de, oe)
            )), Fe) break;
            ie = ie.return;
          }
          0 < Ne.length && (le = new ue(
            le,
            ye,
            null,
            a,
            ce
          ), he.push({ event: le, listeners: Ne }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (le = e === "mouseover" || e === "pointerover", ue = e === "mouseout" || e === "pointerout", le && a !== nc && (ye = a.relatedTarget || a.fromElement) && (hi(ye) || ye[Bn]))
            break e;
          if ((ue || le) && (le = ce.window === ce ? ce : (le = ce.ownerDocument) ? le.defaultView || le.parentWindow : window, ue ? (ye = a.relatedTarget || a.toElement, ue = re, ye = ye ? hi(ye) : null, ye !== null && (Fe = u(ye), Ne = ye.tag, ye !== Fe || Ne !== 5 && Ne !== 27 && Ne !== 6) && (ye = null)) : (ue = null, ye = re), ue !== ye)) {
            if (Ne = Lh, de = "onMouseLeave", ae = "onMouseEnter", ie = "mouse", (e === "pointerout" || e === "pointerover") && (Ne = Ih, de = "onPointerLeave", ae = "onPointerEnter", ie = "pointer"), Fe = ue == null ? le : gi(ue), oe = ye == null ? le : gi(ye), le = new Ne(
              de,
              ie + "leave",
              ue,
              a,
              ce
            ), le.target = Fe, le.relatedTarget = oe, de = null, hi(ce) === re && (Ne = new Ne(
              ae,
              ie + "enter",
              ye,
              a,
              ce
            ), Ne.target = oe, Ne.relatedTarget = Fe, de = Ne), Fe = de, ue && ye)
              t: {
                for (Ne = mw, ae = ue, ie = ye, oe = 0, de = ae; de; de = Ne(de))
                  oe++;
                de = 0;
                for (var Se = ie; Se; Se = Ne(Se))
                  de++;
                for (; 0 < oe - de; )
                  ae = Ne(ae), oe--;
                for (; 0 < de - oe; )
                  ie = Ne(ie), de--;
                for (; oe--; ) {
                  if (ae === ie || ie !== null && ae === ie.alternate) {
                    Ne = ae;
                    break t;
                  }
                  ae = Ne(ae), ie = Ne(ie);
                }
                Ne = null;
              }
            else Ne = null;
            ue !== null && jp(
              he,
              le,
              ue,
              Ne,
              !1
            ), ye !== null && Fe !== null && jp(
              he,
              Fe,
              ye,
              Ne,
              !0
            );
          }
        }
        e: {
          if (le = re ? gi(re) : window, ue = le.nodeName && le.nodeName.toLowerCase(), ue === "select" || ue === "input" && le.type === "file")
            var Ue = Zh;
          else if (Xh(le))
            if (Kh)
              Ue = N1;
            else {
              Ue = E1;
              var ve = S1;
            }
          else
            ue = le.nodeName, !ue || ue.toLowerCase() !== "input" || le.type !== "checkbox" && le.type !== "radio" ? re && tc(re.elementType) && (Ue = Zh) : Ue = _1;
          if (Ue && (Ue = Ue(e, re))) {
            Gh(
              he,
              Ue,
              a,
              ce
            );
            break e;
          }
          ve && ve(e, le, re), e === "focusout" && re && le.type === "number" && re.memoizedProps.value != null && Yo(le, "number", le.value);
        }
        switch (ve = re ? gi(re) : window, e) {
          case "focusin":
            (Xh(ve) || ve.contentEditable === "true") && (Va = ve, gc = re, Wo = null);
            break;
          case "focusout":
            Wo = gc = Va = null;
            break;
          case "mousedown":
            pc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            pc = !1, nm(he, a, ce);
            break;
          case "selectionchange":
            if (M1) break;
          case "keydown":
          case "keyup":
            nm(he, a, ce);
        }
        var je;
        if (fc)
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
          Ia ? qh(e, a) && (ke = "onCompositionEnd") : e === "keydown" && a.keyCode === 229 && (ke = "onCompositionStart");
        ke && (Vh && a.locale !== "ko" && (Ia || ke !== "onCompositionStart" ? ke === "onCompositionEnd" && Ia && (je = kh()) : (vi = ce, rc = "value" in vi ? vi.value : vi.textContent, Ia = !0)), ve = Ns(re, ke), 0 < ve.length && (ke = new Bh(
          ke,
          e,
          null,
          a,
          ce
        ), he.push({ event: ke, listeners: ve }), je ? ke.data = je : (je = $h(a), je !== null && (ke.data = je)))), (je = y1 ? v1(e, a) : b1(e, a)) && (ke = Ns(re, "onBeforeInput"), 0 < ke.length && (ve = new Bh(
          "onBeforeInput",
          "beforeinput",
          null,
          a,
          ce
        ), he.push({
          event: ve,
          listeners: ke
        }), ve.data = je)), cw(
          he,
          e,
          re,
          a,
          ce
        );
      }
      Tp(he, n);
    });
  }
  function Sr(e, n, a) {
    return {
      instance: e,
      listener: n,
      currentTarget: a
    };
  }
  function Ns(e, n) {
    for (var a = n + "Capture", l = []; e !== null; ) {
      var f = e, h = f.stateNode;
      if (f = f.tag, f !== 5 && f !== 26 && f !== 27 || h === null || (f = qo(e, a), f != null && l.unshift(
        Sr(e, f, h)
      ), f = qo(e, n), f != null && l.push(
        Sr(e, f, h)
      )), e.tag === 3) return l;
      e = e.return;
    }
    return [];
  }
  function mw(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function jp(e, n, a, l, f) {
    for (var h = n._reactName, S = []; a !== null && a !== l; ) {
      var z = a, P = z.alternate, re = z.stateNode;
      if (z = z.tag, P !== null && P === l) break;
      z !== 5 && z !== 26 && z !== 27 || re === null || (P = re, f ? (re = qo(a, h), re != null && S.unshift(
        Sr(a, re, P)
      )) : f || (re = qo(a, h), re != null && S.push(
        Sr(a, re, P)
      ))), a = a.return;
    }
    S.length !== 0 && e.push({ event: n, listeners: S });
  }
  var gw = /\r\n?/g, pw = /\u0000|\uFFFD/g;
  function Ap(e) {
    return (typeof e == "string" ? e : "" + e).replace(gw, `
`).replace(pw, "");
  }
  function Op(e, n) {
    return n = Ap(n), Ap(e) === n;
  }
  function Qe(e, n, a, l, f, h) {
    switch (a) {
      case "children":
        typeof l == "string" ? n === "body" || n === "textarea" && l === "" || Ha(e, l) : (typeof l == "number" || typeof l == "bigint") && n !== "body" && Ha(e, "" + l);
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
        Oh(e, l, h);
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
        l = Al("" + l), e.setAttribute(a, l);
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
        l = Al("" + l), e.setAttribute(a, l);
        break;
      case "onClick":
        l != null && (e.onclick = Un);
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
        a = Al("" + l), e.setAttributeNS(
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
        un(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        un(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        un(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        un(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        un(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        un(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        un(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        un(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        un(
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
        (!(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N") && (a = $x.get(a) || a, za(e, a, l));
    }
  }
  function Yf(e, n, a, l, f, h) {
    switch (a) {
      case "style":
        Oh(e, l, h);
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
        typeof l == "string" ? Ha(e, l) : (typeof l == "number" || typeof l == "bigint") && Ha(e, "" + l);
        break;
      case "onScroll":
        l != null && ze("scroll", e);
        break;
      case "onScrollEnd":
        l != null && ze("scrollend", e);
        break;
      case "onClick":
        l != null && (e.onclick = Un);
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
        if (!Cl.hasOwnProperty(a))
          e: {
            if (a[0] === "o" && a[1] === "n" && (f = a.endsWith("Capture"), n = a.slice(2, f ? a.length - 7 : void 0), h = e[Ct] || null, h = h != null ? h[a] : null, typeof h == "function" && e.removeEventListener(n, h, f), typeof l == "function")) {
              typeof h != "function" && h !== null && (a in e ? e[a] = null : e.hasAttribute(a) && e.removeAttribute(a)), e.addEventListener(n, l, f);
              break e;
            }
            a in e ? e[a] = l : l === !0 ? e.setAttribute(a, "") : za(e, a, l);
          }
    }
  }
  function Nt(e, n, a) {
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
            var S = a[h];
            if (S != null)
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
                  Qe(e, n, h, S, a, null);
              }
          }
        f && Qe(e, n, "srcSet", a.srcSet, a, null), l && Qe(e, n, "src", a.src, a, null);
        return;
      case "input":
        ze("invalid", e);
        var z = h = S = f = null, P = null, re = null;
        for (l in a)
          if (a.hasOwnProperty(l)) {
            var ce = a[l];
            if (ce != null)
              switch (l) {
                case "name":
                  f = ce;
                  break;
                case "type":
                  S = ce;
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
                  z = ce;
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
        jl(
          e,
          h,
          z,
          P,
          re,
          S,
          f,
          !1
        );
        return;
      case "select":
        ze("invalid", e), l = S = h = null;
        for (f in a)
          if (a.hasOwnProperty(f) && (z = a[f], z != null))
            switch (f) {
              case "value":
                h = z;
                break;
              case "defaultValue":
                S = z;
                break;
              case "multiple":
                l = z;
              default:
                Qe(e, n, f, z, a, null);
            }
        n = h, a = S, e.multiple = !!l, n != null ? Vn(e, !!l, n, !1) : a != null && Vn(e, !!l, a, !0);
        return;
      case "textarea":
        ze("invalid", e), h = f = l = null;
        for (S in a)
          if (a.hasOwnProperty(S) && (z = a[S], z != null))
            switch (S) {
              case "value":
                l = z;
                break;
              case "defaultValue":
                f = z;
                break;
              case "children":
                h = z;
                break;
              case "dangerouslySetInnerHTML":
                if (z != null) throw Error(r(91));
                break;
              default:
                Qe(e, n, S, z, a, null);
            }
        jh(e, l, f, h);
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
        for (l = 0; l < wr.length; l++)
          ze(wr[l], e);
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
        if (tc(n)) {
          for (ce in a)
            a.hasOwnProperty(ce) && (l = a[ce], l !== void 0 && Yf(
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
    for (z in a)
      a.hasOwnProperty(z) && (l = a[z], l != null && Qe(e, n, z, l, a, null));
  }
  function yw(e, n, a, l) {
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
        var f = null, h = null, S = null, z = null, P = null, re = null, ce = null;
        for (ue in a) {
          var he = a[ue];
          if (a.hasOwnProperty(ue) && he != null)
            switch (ue) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                P = he;
              default:
                l.hasOwnProperty(ue) || Qe(e, n, ue, null, l, he);
            }
        }
        for (var le in l) {
          var ue = l[le];
          if (he = a[le], l.hasOwnProperty(le) && (ue != null || he != null))
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
                S = ue;
                break;
              case "defaultValue":
                z = ue;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (ue != null)
                  throw Error(r(137, n));
                break;
              default:
                ue !== he && Qe(
                  e,
                  n,
                  le,
                  ue,
                  l,
                  he
                );
            }
        }
        Fi(
          e,
          S,
          z,
          P,
          re,
          ce,
          h,
          f
        );
        return;
      case "select":
        ue = S = z = le = null;
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
                z = h;
                break;
              case "multiple":
                S = h;
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
        n = z, a = S, l = ue, le != null ? Vn(e, !!a, le, !1) : !!l != !!a && (n != null ? Vn(e, !!a, n, !0) : Vn(e, !!a, a ? [] : "", !1));
        return;
      case "textarea":
        ue = le = null;
        for (z in a)
          if (f = a[z], a.hasOwnProperty(z) && f != null && !l.hasOwnProperty(z))
            switch (z) {
              case "value":
                break;
              case "children":
                break;
              default:
                Qe(e, n, z, null, l, f);
            }
        for (S in l)
          if (f = l[S], h = a[S], l.hasOwnProperty(S) && (f != null || h != null))
            switch (S) {
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
                f !== h && Qe(e, n, S, f, l, h);
            }
        Dh(e, le, ue);
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
        for (var Ne in a)
          le = a[Ne], a.hasOwnProperty(Ne) && le != null && !l.hasOwnProperty(Ne) && Qe(e, n, Ne, null, l, le);
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
        if (tc(n)) {
          for (var Fe in a)
            le = a[Fe], a.hasOwnProperty(Fe) && le !== void 0 && !l.hasOwnProperty(Fe) && Yf(
              e,
              n,
              Fe,
              void 0,
              l,
              le
            );
          for (ce in l)
            le = l[ce], ue = a[ce], !l.hasOwnProperty(ce) || le === ue || le === void 0 && ue === void 0 || Yf(
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
    for (he in l)
      le = l[he], ue = a[he], !l.hasOwnProperty(he) || le === ue || le == null && ue == null || Qe(e, n, he, le, l, ue);
  }
  function zp(e) {
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
  function vw() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, n = 0, a = performance.getEntriesByType("resource"), l = 0; l < a.length; l++) {
        var f = a[l], h = f.transferSize, S = f.initiatorType, z = f.duration;
        if (h && z && zp(S)) {
          for (S = 0, z = f.responseEnd, l += 1; l < a.length; l++) {
            var P = a[l], re = P.startTime;
            if (re > z) break;
            var ce = P.transferSize, he = P.initiatorType;
            ce && zp(he) && (P = P.responseEnd, S += ce * (P < z ? 1 : (z - re) / (P - re)));
          }
          if (--l, n += 8 * (h + S) / (f.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return n / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var qf = null, $f = null;
  function Cs(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Rp(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function kp(e, n) {
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
  function Xf(e, n) {
    return e === "textarea" || e === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var Gf = null;
  function bw() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Gf ? !1 : (Gf = e, !0) : (Gf = null, !1);
  }
  var Hp = typeof setTimeout == "function" ? setTimeout : void 0, xw = typeof clearTimeout == "function" ? clearTimeout : void 0, Lp = typeof Promise == "function" ? Promise : void 0, ww = typeof queueMicrotask == "function" ? queueMicrotask : typeof Lp < "u" ? function(e) {
    return Lp.resolve(null).then(e).catch(Sw);
  } : Hp;
  function Sw(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function ki(e) {
    return e === "head";
  }
  function Bp(e, n) {
    var a = n, l = 0;
    do {
      var f = a.nextSibling;
      if (e.removeChild(a), f && f.nodeType === 8)
        if (a = f.data, a === "/$" || a === "/&") {
          if (l === 0) {
            e.removeChild(f), mo(n);
            return;
          }
          l--;
        } else if (a === "$" || a === "$?" || a === "$~" || a === "$!" || a === "&")
          l++;
        else if (a === "html")
          Er(e.ownerDocument.documentElement);
        else if (a === "head") {
          a = e.ownerDocument.head, Er(a);
          for (var h = a.firstChild; h; ) {
            var S = h.nextSibling, z = h.nodeName;
            h[Ki] || z === "SCRIPT" || z === "STYLE" || z === "LINK" && h.rel.toLowerCase() === "stylesheet" || a.removeChild(h), h = S;
          }
        } else
          a === "body" && Er(e.ownerDocument.body);
      a = f;
    } while (a);
    mo(n);
  }
  function Ip(e, n) {
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
  function Zf(e) {
    var n = e.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var a = n;
      switch (n = n.nextSibling, a.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Zf(a), Vo(a);
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
  function Ew(e, n, a, l) {
    for (; e.nodeType === 1; ) {
      var f = a;
      if (e.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (l) {
        if (!e[Ki])
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
      if (e = on(e.nextSibling), e === null) break;
    }
    return null;
  }
  function _w(e, n, a) {
    if (n === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !a || (e = on(e.nextSibling), e === null)) return null;
    return e;
  }
  function Vp(e, n) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = on(e.nextSibling), e === null)) return null;
    return e;
  }
  function Kf(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Qf(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function Nw(e, n) {
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
  function on(e) {
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
  var Ff = null;
  function Up(e) {
    e = e.nextSibling;
    for (var n = 0; e; ) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === "/$" || a === "/&") {
          if (n === 0)
            return on(e.nextSibling);
          n--;
        } else
          a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&" || n++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Yp(e) {
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
  function qp(e, n, a) {
    switch (n = Cs(a), e) {
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
  function Er(e) {
    for (var n = e.attributes; n.length; )
      e.removeAttributeNode(n[0]);
    Vo(e);
  }
  var rn = /* @__PURE__ */ new Map(), $p = /* @__PURE__ */ new Set();
  function Ms(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var ii = R.d;
  R.d = {
    f: Cw,
    r: Mw,
    D: Tw,
    C: Dw,
    L: jw,
    m: Aw,
    X: zw,
    S: Ow,
    M: Rw
  };
  function Cw() {
    var e = ii.f(), n = vs();
    return e || n;
  }
  function Mw(e) {
    var n = mi(e);
    n !== null && n.tag === 5 && n.type === "form" ? lg(n) : ii.r(e);
  }
  var co = typeof document > "u" ? null : document;
  function Xp(e, n, a) {
    var l = co;
    if (l && typeof n == "string" && n) {
      var f = Ot(n);
      f = 'link[rel="' + e + '"][href="' + f + '"]', typeof a == "string" && (f += '[crossorigin="' + a + '"]'), $p.has(f) || ($p.add(f), e = { rel: e, crossOrigin: a, href: n }, l.querySelector(f) === null && (n = l.createElement("link"), Nt(n, "link", e), ct(n), l.head.appendChild(n)));
    }
  }
  function Tw(e) {
    ii.D(e), Xp("dns-prefetch", e, null);
  }
  function Dw(e, n) {
    ii.C(e, n), Xp("preconnect", e, n);
  }
  function jw(e, n, a) {
    ii.L(e, n, a);
    var l = co;
    if (l && e && n) {
      var f = 'link[rel="preload"][as="' + Ot(n) + '"]';
      n === "image" && a && a.imageSrcSet ? (f += '[imagesrcset="' + Ot(
        a.imageSrcSet
      ) + '"]', typeof a.imageSizes == "string" && (f += '[imagesizes="' + Ot(
        a.imageSizes
      ) + '"]')) : f += '[href="' + Ot(e) + '"]';
      var h = f;
      switch (n) {
        case "style":
          h = fo(e);
          break;
        case "script":
          h = ho(e);
      }
      rn.has(h) || (e = y(
        {
          rel: "preload",
          href: n === "image" && a && a.imageSrcSet ? void 0 : e,
          as: n
        },
        a
      ), rn.set(h, e), l.querySelector(f) !== null || n === "style" && l.querySelector(_r(h)) || n === "script" && l.querySelector(Nr(h)) || (n = l.createElement("link"), Nt(n, "link", e), ct(n), l.head.appendChild(n)));
    }
  }
  function Aw(e, n) {
    ii.m(e, n);
    var a = co;
    if (a && e) {
      var l = n && typeof n.as == "string" ? n.as : "script", f = 'link[rel="modulepreload"][as="' + Ot(l) + '"][href="' + Ot(e) + '"]', h = f;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          h = ho(e);
      }
      if (!rn.has(h) && (e = y({ rel: "modulepreload", href: e }, n), rn.set(h, e), a.querySelector(f) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (a.querySelector(Nr(h)))
              return;
        }
        l = a.createElement("link"), Nt(l, "link", e), ct(l), a.head.appendChild(l);
      }
    }
  }
  function Ow(e, n, a) {
    ii.S(e, n, a);
    var l = co;
    if (l && e) {
      var f = pi(l).hoistableStyles, h = fo(e);
      n = n || "default";
      var S = f.get(h);
      if (!S) {
        var z = { loading: 0, preload: null };
        if (S = l.querySelector(
          _r(h)
        ))
          z.loading = 5;
        else {
          e = y(
            { rel: "stylesheet", href: e, "data-precedence": n },
            a
          ), (a = rn.get(h)) && Wf(e, a);
          var P = S = l.createElement("link");
          ct(P), Nt(P, "link", e), P._p = new Promise(function(re, ce) {
            P.onload = re, P.onerror = ce;
          }), P.addEventListener("load", function() {
            z.loading |= 1;
          }), P.addEventListener("error", function() {
            z.loading |= 2;
          }), z.loading |= 4, Ts(S, n, l);
        }
        S = {
          type: "stylesheet",
          instance: S,
          count: 1,
          state: z
        }, f.set(h, S);
      }
    }
  }
  function zw(e, n) {
    ii.X(e, n);
    var a = co;
    if (a && e) {
      var l = pi(a).hoistableScripts, f = ho(e), h = l.get(f);
      h || (h = a.querySelector(Nr(f)), h || (e = y({ src: e, async: !0 }, n), (n = rn.get(f)) && Jf(e, n), h = a.createElement("script"), ct(h), Nt(h, "link", e), a.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, l.set(f, h));
    }
  }
  function Rw(e, n) {
    ii.M(e, n);
    var a = co;
    if (a && e) {
      var l = pi(a).hoistableScripts, f = ho(e), h = l.get(f);
      h || (h = a.querySelector(Nr(f)), h || (e = y({ src: e, async: !0, type: "module" }, n), (n = rn.get(f)) && Jf(e, n), h = a.createElement("script"), ct(h), Nt(h, "link", e), a.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, l.set(f, h));
    }
  }
  function Gp(e, n, a, l) {
    var f = (f = U.current) ? Ms(f) : null;
    if (!f) throw Error(r(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof a.precedence == "string" && typeof a.href == "string" ? (n = fo(a.href), a = pi(
          f
        ).hoistableStyles, l = a.get(n), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, a.set(n, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
          e = fo(a.href);
          var h = pi(
            f
          ).hoistableStyles, S = h.get(e);
          if (S || (f = f.ownerDocument || f, S = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, h.set(e, S), (h = f.querySelector(
            _r(e)
          )) && !h._p && (S.instance = h, S.state.loading = 5), rn.has(e) || (a = {
            rel: "preload",
            as: "style",
            href: a.href,
            crossOrigin: a.crossOrigin,
            integrity: a.integrity,
            media: a.media,
            hrefLang: a.hrefLang,
            referrerPolicy: a.referrerPolicy
          }, rn.set(e, a), h || kw(
            f,
            e,
            a,
            S.state
          ))), n && l === null)
            throw Error(r(528, ""));
          return S;
        }
        if (n && l !== null)
          throw Error(r(529, ""));
        return null;
      case "script":
        return n = a.async, a = a.src, typeof a == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = ho(a), a = pi(
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
  function fo(e) {
    return 'href="' + Ot(e) + '"';
  }
  function _r(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Zp(e) {
    return y({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function kw(e, n, a, l) {
    e.querySelector('link[rel="preload"][as="style"][' + n + "]") ? l.loading = 1 : (n = e.createElement("link"), l.preload = n, n.addEventListener("load", function() {
      return l.loading |= 1;
    }), n.addEventListener("error", function() {
      return l.loading |= 2;
    }), Nt(n, "link", a), ct(n), e.head.appendChild(n));
  }
  function ho(e) {
    return '[src="' + Ot(e) + '"]';
  }
  function Nr(e) {
    return "script[async]" + e;
  }
  function Kp(e, n, a) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var l = e.querySelector(
            'style[data-href~="' + Ot(a.href) + '"]'
          );
          if (l)
            return n.instance = l, ct(l), l;
          var f = y({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null
          });
          return l = (e.ownerDocument || e).createElement(
            "style"
          ), ct(l), Nt(l, "style", f), Ts(l, a.precedence, e), n.instance = l;
        case "stylesheet":
          f = fo(a.href);
          var h = e.querySelector(
            _r(f)
          );
          if (h)
            return n.state.loading |= 4, n.instance = h, ct(h), h;
          l = Zp(a), (f = rn.get(f)) && Wf(l, f), h = (e.ownerDocument || e).createElement("link"), ct(h);
          var S = h;
          return S._p = new Promise(function(z, P) {
            S.onload = z, S.onerror = P;
          }), Nt(h, "link", l), n.state.loading |= 4, Ts(h, a.precedence, e), n.instance = h;
        case "script":
          return h = ho(a.src), (f = e.querySelector(
            Nr(h)
          )) ? (n.instance = f, ct(f), f) : (l = a, (f = rn.get(h)) && (l = y({}, a), Jf(l, f)), e = e.ownerDocument || e, f = e.createElement("script"), ct(f), Nt(f, "link", l), e.head.appendChild(f), n.instance = f);
        case "void":
          return null;
        default:
          throw Error(r(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (l = n.instance, n.state.loading |= 4, Ts(l, a.precedence, e));
    return n.instance;
  }
  function Ts(e, n, a) {
    for (var l = a.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), f = l.length ? l[l.length - 1] : null, h = f, S = 0; S < l.length; S++) {
      var z = l[S];
      if (z.dataset.precedence === n) h = z;
      else if (h !== f) break;
    }
    h ? h.parentNode.insertBefore(e, h.nextSibling) : (n = a.nodeType === 9 ? a.head : a, n.insertBefore(e, n.firstChild));
  }
  function Wf(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.title == null && (e.title = n.title);
  }
  function Jf(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.integrity == null && (e.integrity = n.integrity);
  }
  var Ds = null;
  function Qp(e, n, a) {
    if (Ds === null) {
      var l = /* @__PURE__ */ new Map(), f = Ds = /* @__PURE__ */ new Map();
      f.set(a, l);
    } else
      f = Ds, l = f.get(a), l || (l = /* @__PURE__ */ new Map(), f.set(a, l));
    if (l.has(e)) return l;
    for (l.set(e, null), a = a.getElementsByTagName(e), f = 0; f < a.length; f++) {
      var h = a[f];
      if (!(h[Ki] || h[vt] || e === "link" && h.getAttribute("rel") === "stylesheet") && h.namespaceURI !== "http://www.w3.org/2000/svg") {
        var S = h.getAttribute(n) || "";
        S = e + S;
        var z = l.get(S);
        z ? z.push(h) : l.set(S, [h]);
      }
    }
    return l;
  }
  function Fp(e, n, a) {
    e = e.ownerDocument || e, e.head.insertBefore(
      a,
      n === "title" ? e.querySelector("head > title") : null
    );
  }
  function Hw(e, n, a) {
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
  function Wp(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function Lw(e, n, a, l) {
    if (a.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (a.state.loading & 4) === 0) {
      if (a.instance === null) {
        var f = fo(l.href), h = n.querySelector(
          _r(f)
        );
        if (h) {
          n = h._p, n !== null && typeof n == "object" && typeof n.then == "function" && (e.count++, e = js.bind(e), n.then(e, e)), a.state.loading |= 4, a.instance = h, ct(h);
          return;
        }
        h = n.ownerDocument || n, l = Zp(l), (f = rn.get(f)) && Wf(l, f), h = h.createElement("link"), ct(h);
        var S = h;
        S._p = new Promise(function(z, P) {
          S.onload = z, S.onerror = P;
        }), Nt(h, "link", l), a.instance = h;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(a, n), (n = a.state.preload) && (a.state.loading & 3) === 0 && (e.count++, a = js.bind(e), n.addEventListener("load", a), n.addEventListener("error", a));
    }
  }
  var Pf = 0;
  function Bw(e, n) {
    return e.stylesheets && e.count === 0 && Os(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(a) {
      var l = setTimeout(function() {
        if (e.stylesheets && Os(e, e.stylesheets), e.unsuspend) {
          var h = e.unsuspend;
          e.unsuspend = null, h();
        }
      }, 6e4 + n);
      0 < e.imgBytes && Pf === 0 && (Pf = 62500 * vw());
      var f = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Os(e, e.stylesheets), e.unsuspend)) {
            var h = e.unsuspend;
            e.unsuspend = null, h();
          }
        },
        (e.imgBytes > Pf ? 50 : 800) + n
      );
      return e.unsuspend = a, function() {
        e.unsuspend = null, clearTimeout(l), clearTimeout(f);
      };
    } : null;
  }
  function js() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Os(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var As = null;
  function Os(e, n) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, As = /* @__PURE__ */ new Map(), n.forEach(Iw, e), As = null, js.call(e));
  }
  function Iw(e, n) {
    if (!(n.state.loading & 4)) {
      var a = As.get(e);
      if (a) var l = a.get(null);
      else {
        a = /* @__PURE__ */ new Map(), As.set(e, a);
        for (var f = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), h = 0; h < f.length; h++) {
          var S = f[h];
          (S.nodeName === "LINK" || S.getAttribute("media") !== "not all") && (a.set(S.dataset.precedence, S), l = S);
        }
        l && a.set(null, l);
      }
      f = n.instance, S = f.getAttribute("data-precedence"), h = a.get(S) || l, h === l && a.set(null, f), a.set(S, f), this.count++, l = js.bind(this), f.addEventListener("load", l), f.addEventListener("error", l), h ? h.parentNode.insertBefore(f, h.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(f, e.firstChild)), n.state.loading |= 4;
    }
  }
  var Cr = {
    $$typeof: N,
    Provider: null,
    Consumer: null,
    _currentValue: B,
    _currentValue2: B,
    _threadCount: 0
  };
  function Vw(e, n, a, l, f, h, S, z, P) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Lo(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Lo(0), this.hiddenUpdates = Lo(null), this.identifierPrefix = l, this.onUncaughtError = f, this.onCaughtError = h, this.onRecoverableError = S, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = P, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Jp(e, n, a, l, f, h, S, z, P, re, ce, he) {
    return e = new Vw(
      e,
      n,
      a,
      S,
      P,
      re,
      ce,
      he,
      z
    ), n = 1, h === !0 && (n |= 24), h = Yt(3, null, null, n), e.current = h, h.stateNode = e, n = Ac(), n.refCount++, e.pooledCache = n, n.refCount++, h.memoizedState = {
      element: l,
      isDehydrated: a,
      cache: n
    }, kc(h), e;
  }
  function Pp(e) {
    return e ? (e = qa, e) : qa;
  }
  function ey(e, n, a, l, f, h) {
    f = Pp(f), l.context === null ? l.context = f : l.pendingContext = f, l = _i(n), l.payload = { element: a }, h = h === void 0 ? null : h, h !== null && (l.callback = h), a = Ni(e, l, n), a !== null && (Bt(a, e, n), ar(a, e, n));
  }
  function ty(e, n) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var a = e.retryLane;
      e.retryLane = a !== 0 && a < n ? a : n;
    }
  }
  function ed(e, n) {
    ty(e, n), (e = e.alternate) && ty(e, n);
  }
  function ny(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = ea(e, 67108864);
      n !== null && Bt(n, e, 67108864), ed(e, 67108864);
    }
  }
  function iy(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Zt();
      n = Bo(n);
      var a = ea(e, n);
      a !== null && Bt(a, e, n), ed(e, n);
    }
  }
  var zs = !0;
  function Uw(e, n, a, l) {
    var f = M.T;
    M.T = null;
    var h = R.p;
    try {
      R.p = 2, td(e, n, a, l);
    } finally {
      R.p = h, M.T = f;
    }
  }
  function Yw(e, n, a, l) {
    var f = M.T;
    M.T = null;
    var h = R.p;
    try {
      R.p = 8, td(e, n, a, l);
    } finally {
      R.p = h, M.T = f;
    }
  }
  function td(e, n, a, l) {
    if (zs) {
      var f = nd(l);
      if (f === null)
        Uf(
          e,
          n,
          l,
          Rs,
          a
        ), oy(e, l);
      else if ($w(
        f,
        e,
        n,
        a,
        l
      ))
        l.stopPropagation();
      else if (oy(e, l), n & 4 && -1 < qw.indexOf(e)) {
        for (; f !== null; ) {
          var h = mi(f);
          if (h !== null)
            switch (h.tag) {
              case 3:
                if (h = h.stateNode, h.current.memoizedState.isDehydrated) {
                  var S = Ln(h.pendingLanes);
                  if (S !== 0) {
                    var z = h;
                    for (z.pendingLanes |= 2, z.entangledLanes |= 2; S; ) {
                      var P = 1 << 31 - De(S);
                      z.entanglements[1] |= P, S &= ~P;
                    }
                    Tn(h), ($e & 6) === 0 && (ps = yt() + 500, xr(0));
                  }
                }
                break;
              case 31:
              case 13:
                z = ea(h, 2), z !== null && Bt(z, h, 2), vs(), ed(h, 2);
            }
          if (h = nd(l), h === null && Uf(
            e,
            n,
            l,
            Rs,
            a
          ), h === f) break;
          f = h;
        }
        f !== null && l.stopPropagation();
      } else
        Uf(
          e,
          n,
          l,
          null,
          a
        );
    }
  }
  function nd(e) {
    return e = ic(e), id(e);
  }
  var Rs = null;
  function id(e) {
    if (Rs = null, e = hi(e), e !== null) {
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
    return Rs = e, null;
  }
  function ay(e) {
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
        switch (fi()) {
          case sn:
            return 2;
          case Sn:
            return 8;
          case Hn:
          case zo:
            return 32;
          case di:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var ad = !1, Hi = null, Li = null, Bi = null, Mr = /* @__PURE__ */ new Map(), Tr = /* @__PURE__ */ new Map(), Ii = [], qw = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function oy(e, n) {
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
        Mr.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Tr.delete(n.pointerId);
    }
  }
  function Dr(e, n, a, l, f, h) {
    return e === null || e.nativeEvent !== h ? (e = {
      blockedOn: n,
      domEventName: a,
      eventSystemFlags: l,
      nativeEvent: h,
      targetContainers: [f]
    }, n !== null && (n = mi(n), n !== null && ny(n)), e) : (e.eventSystemFlags |= l, n = e.targetContainers, f !== null && n.indexOf(f) === -1 && n.push(f), e);
  }
  function $w(e, n, a, l, f) {
    switch (n) {
      case "focusin":
        return Hi = Dr(
          Hi,
          e,
          n,
          a,
          l,
          f
        ), !0;
      case "dragenter":
        return Li = Dr(
          Li,
          e,
          n,
          a,
          l,
          f
        ), !0;
      case "mouseover":
        return Bi = Dr(
          Bi,
          e,
          n,
          a,
          l,
          f
        ), !0;
      case "pointerover":
        var h = f.pointerId;
        return Mr.set(
          h,
          Dr(
            Mr.get(h) || null,
            e,
            n,
            a,
            l,
            f
          )
        ), !0;
      case "gotpointercapture":
        return h = f.pointerId, Tr.set(
          h,
          Dr(
            Tr.get(h) || null,
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
  function ry(e) {
    var n = hi(e.target);
    if (n !== null) {
      var a = u(n);
      if (a !== null) {
        if (n = a.tag, n === 13) {
          if (n = c(a), n !== null) {
            e.blockedOn = n, Sl(e.priority, function() {
              iy(a);
            });
            return;
          }
        } else if (n === 31) {
          if (n = d(a), n !== null) {
            e.blockedOn = n, Sl(e.priority, function() {
              iy(a);
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
  function ks(e) {
    if (e.blockedOn !== null) return !1;
    for (var n = e.targetContainers; 0 < n.length; ) {
      var a = nd(e.nativeEvent);
      if (a === null) {
        a = e.nativeEvent;
        var l = new a.constructor(
          a.type,
          a
        );
        nc = l, a.target.dispatchEvent(l), nc = null;
      } else
        return n = mi(a), n !== null && ny(n), e.blockedOn = a, !1;
      n.shift();
    }
    return !0;
  }
  function ly(e, n, a) {
    ks(e) && a.delete(n);
  }
  function Xw() {
    ad = !1, Hi !== null && ks(Hi) && (Hi = null), Li !== null && ks(Li) && (Li = null), Bi !== null && ks(Bi) && (Bi = null), Mr.forEach(ly), Tr.forEach(ly);
  }
  function Hs(e, n) {
    e.blockedOn === n && (e.blockedOn = null, ad || (ad = !0, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      Xw
    )));
  }
  var Ls = null;
  function sy(e) {
    Ls !== e && (Ls = e, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      function() {
        Ls === e && (Ls = null);
        for (var n = 0; n < e.length; n += 3) {
          var a = e[n], l = e[n + 1], f = e[n + 2];
          if (typeof l != "function") {
            if (id(l || a) === null)
              continue;
            break;
          }
          var h = mi(a);
          h !== null && (e.splice(n, 3), n -= 3, tf(
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
  function mo(e) {
    function n(P) {
      return Hs(P, e);
    }
    Hi !== null && Hs(Hi, e), Li !== null && Hs(Li, e), Bi !== null && Hs(Bi, e), Mr.forEach(n), Tr.forEach(n);
    for (var a = 0; a < Ii.length; a++) {
      var l = Ii[a];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < Ii.length && (a = Ii[0], a.blockedOn === null); )
      ry(a), a.blockedOn === null && Ii.shift();
    if (a = (e.ownerDocument || e).$$reactFormReplay, a != null)
      for (l = 0; l < a.length; l += 3) {
        var f = a[l], h = a[l + 1], S = f[Ct] || null;
        if (typeof h == "function")
          S || sy(a);
        else if (S) {
          var z = null;
          if (h && h.hasAttribute("formAction")) {
            if (f = h, S = h[Ct] || null)
              z = S.formAction;
            else if (id(f) !== null) continue;
          } else z = S.action;
          typeof z == "function" ? a[l + 1] = z : (a.splice(l, 3), l -= 3), sy(a);
        }
      }
  }
  function uy() {
    function e(h) {
      h.canIntercept && h.info === "react-transition" && h.intercept({
        handler: function() {
          return new Promise(function(S) {
            return f = S;
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
  function od(e) {
    this._internalRoot = e;
  }
  Bs.prototype.render = od.prototype.render = function(e) {
    var n = this._internalRoot;
    if (n === null) throw Error(r(409));
    var a = n.current, l = Zt();
    ey(a, l, e, n, null, null);
  }, Bs.prototype.unmount = od.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var n = e.containerInfo;
      ey(e.current, 2, null, e, null, null), vs(), n[Bn] = null;
    }
  };
  function Bs(e) {
    this._internalRoot = e;
  }
  Bs.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var n = wl();
      e = { blockedOn: null, target: e, priority: n };
      for (var a = 0; a < Ii.length && n !== 0 && n < Ii[a].priority; a++) ;
      Ii.splice(a, 0, e), a === 0 && ry(e);
    }
  };
  var cy = i.version;
  if (cy !== "19.2.4")
    throw Error(
      r(
        527,
        cy,
        "19.2.4"
      )
    );
  R.findDOMNode = function(e) {
    var n = e._reactInternals;
    if (n === void 0)
      throw typeof e.render == "function" ? Error(r(188)) : (e = Object.keys(e).join(","), Error(r(268, e)));
    return e = p(n), e = e !== null ? g(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var Gw = {
    bundleType: 0,
    version: "19.2.4",
    rendererPackageName: "react-dom",
    currentDispatcherRef: M,
    reconcilerVersion: "19.2.4"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Is = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Is.isDisabled && Is.supportsFiber)
      try {
        fe = Is.inject(
          Gw
        ), pe = Is;
      } catch {
      }
  }
  return Rr.createRoot = function(e, n) {
    if (!s(e)) throw Error(r(299));
    var a = !1, l = "", f = yg, h = vg, S = bg;
    return n != null && (n.unstable_strictMode === !0 && (a = !0), n.identifierPrefix !== void 0 && (l = n.identifierPrefix), n.onUncaughtError !== void 0 && (f = n.onUncaughtError), n.onCaughtError !== void 0 && (h = n.onCaughtError), n.onRecoverableError !== void 0 && (S = n.onRecoverableError)), n = Jp(
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
      S,
      uy
    ), e[Bn] = n.current, Vf(e), new od(n);
  }, Rr.hydrateRoot = function(e, n, a) {
    if (!s(e)) throw Error(r(299));
    var l = !1, f = "", h = yg, S = vg, z = bg, P = null;
    return a != null && (a.unstable_strictMode === !0 && (l = !0), a.identifierPrefix !== void 0 && (f = a.identifierPrefix), a.onUncaughtError !== void 0 && (h = a.onUncaughtError), a.onCaughtError !== void 0 && (S = a.onCaughtError), a.onRecoverableError !== void 0 && (z = a.onRecoverableError), a.formState !== void 0 && (P = a.formState)), n = Jp(
      e,
      1,
      !0,
      n,
      a ?? null,
      l,
      f,
      P,
      h,
      S,
      z,
      uy
    ), n.context = Pp(null), a = n.current, l = Zt(), l = Bo(l), f = _i(l), f.callback = null, Ni(a, f, l), a = l, n.current.lanes = a, Zi(n, a), Tn(n), e[Bn] = n.current, Vf(e), new Bs(n);
  }, Rr.version = "19.2.4", Rr;
}
var Ev;
function IA() {
  if (Ev) return Ad.exports;
  Ev = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (i) {
        console.error(i);
      }
  }
  return t(), Ad.exports = BA(), Ad.exports;
}
var VA = IA();
function YA(t, i = {}) {
  const o = VA.createRoot(t);
  return o.render(/* @__PURE__ */ b.jsx(kA, { ...i })), {
    root: o,
    unmount() {
      o.unmount();
    }
  };
}
function qA(t) {
  return {
    async listActions() {
      return t.map((i) => ({ ...i }));
    }
  };
}
export {
  Ww as BUILDER_JSON_RPC_VERSION,
  gy as BUILDER_RPC_PATH,
  su as BuilderResultError,
  kA as FSMUIBuilder,
  go as FSM_AUTHORING_METHODS,
  sd as FSM_AUTHORING_OPTIONAL_METHODS,
  Yr as FSM_RUNTIME_METHODS,
  jn as HANDLED_ERROR_CODES,
  aS as buildRPCEndpoint,
  hn as callBuilderMethod,
  lS as createBuilderAuthoringRPC,
  oS as createBuilderRPCClient,
  TA as createBuilderRuntimeRPC,
  dS as createDefaultExportAdapter,
  OS as createLocalStoragePersistenceStore,
  qA as createStaticActionCatalogProvider,
  cS as definitionFromDraft,
  UA as formatHandledBuilderError,
  hS as isRPCExportAvailable,
  Ur as loadDraftDocumentForEditing,
  YA as mountFSMUIBuilder,
  xS as normalizeInitialDocumentInput,
  Vv as normalizeRuntimeApplyEvent,
  Uv as normalizeRuntimeSnapshot,
  bv as prepareDraftDocumentForSave,
  ma as toHandledBuilderError,
  rS as unwrapBuilderResponse,
  sS as useAuthoringRPC,
  DA as useRuntimeRPC
};

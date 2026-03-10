function cy(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Rf = { exports: {} }, hl = {};
var _p;
function v1() {
  if (_p) return hl;
  _p = 1;
  var n = /* @__PURE__ */ Symbol.for("react.transitional.element"), i = /* @__PURE__ */ Symbol.for("react.fragment");
  function l(r, s, c) {
    var f = null;
    if (c !== void 0 && (f = "" + c), s.key !== void 0 && (f = "" + s.key), "key" in s) {
      c = {};
      for (var h in s)
        h !== "key" && (c[h] = s[h]);
    } else c = s;
    return s = c.ref, {
      $$typeof: n,
      type: r,
      key: f,
      ref: s !== void 0 ? s : null,
      props: c
    };
  }
  return hl.Fragment = i, hl.jsx = l, hl.jsxs = l, hl;
}
var Np;
function b1() {
  return Np || (Np = 1, Rf.exports = v1()), Rf.exports;
}
var b = b1(), kf = { exports: {} }, Ee = {};
var Cp;
function x1() {
  if (Cp) return Ee;
  Cp = 1;
  var n = /* @__PURE__ */ Symbol.for("react.transitional.element"), i = /* @__PURE__ */ Symbol.for("react.portal"), l = /* @__PURE__ */ Symbol.for("react.fragment"), r = /* @__PURE__ */ Symbol.for("react.strict_mode"), s = /* @__PURE__ */ Symbol.for("react.profiler"), c = /* @__PURE__ */ Symbol.for("react.consumer"), f = /* @__PURE__ */ Symbol.for("react.context"), h = /* @__PURE__ */ Symbol.for("react.forward_ref"), g = /* @__PURE__ */ Symbol.for("react.suspense"), m = /* @__PURE__ */ Symbol.for("react.memo"), y = /* @__PURE__ */ Symbol.for("react.lazy"), p = /* @__PURE__ */ Symbol.for("react.activity"), v = Symbol.iterator;
  function x(A) {
    return A === null || typeof A != "object" ? null : (A = v && A[v] || A["@@iterator"], typeof A == "function" ? A : null);
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
  }, C = Object.assign, j = {};
  function O(A, I, G) {
    this.props = A, this.context = I, this.refs = j, this.updater = G || S;
  }
  O.prototype.isReactComponent = {}, O.prototype.setState = function(A, I) {
    if (typeof A != "object" && typeof A != "function" && A != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, A, I, "setState");
  }, O.prototype.forceUpdate = function(A) {
    this.updater.enqueueForceUpdate(this, A, "forceUpdate");
  };
  function D() {
  }
  D.prototype = O.prototype;
  function E(A, I, G) {
    this.props = A, this.context = I, this.refs = j, this.updater = G || S;
  }
  var N = E.prototype = new D();
  N.constructor = E, C(N, O.prototype), N.isPureReactComponent = !0;
  var k = Array.isArray;
  function U() {
  }
  var V = { H: null, A: null, T: null, S: null }, X = Object.prototype.hasOwnProperty;
  function te(A, I, G) {
    var H = G.ref;
    return {
      $$typeof: n,
      type: A,
      key: I,
      ref: H !== void 0 ? H : null,
      props: G
    };
  }
  function K(A, I) {
    return te(A.type, I, A.props);
  }
  function Y(A) {
    return typeof A == "object" && A !== null && A.$$typeof === n;
  }
  function Z(A) {
    var I = { "=": "=0", ":": "=2" };
    return "$" + A.replace(/[=:]/g, function(G) {
      return I[G];
    });
  }
  var J = /\/+/g;
  function M(A, I) {
    return typeof A == "object" && A !== null && A.key != null ? Z("" + A.key) : I.toString(36);
  }
  function L(A) {
    switch (A.status) {
      case "fulfilled":
        return A.value;
      case "rejected":
        throw A.reason;
      default:
        switch (typeof A.status == "string" ? A.then(U, U) : (A.status = "pending", A.then(
          function(I) {
            A.status === "pending" && (A.status = "fulfilled", A.value = I);
          },
          function(I) {
            A.status === "pending" && (A.status = "rejected", A.reason = I);
          }
        )), A.status) {
          case "fulfilled":
            return A.value;
          case "rejected":
            throw A.reason;
        }
    }
    throw A;
  }
  function _(A, I, G, H, T) {
    var q = typeof A;
    (q === "undefined" || q === "boolean") && (A = null);
    var Q = !1;
    if (A === null) Q = !0;
    else
      switch (q) {
        case "bigint":
        case "string":
        case "number":
          Q = !0;
          break;
        case "object":
          switch (A.$$typeof) {
            case n:
            case i:
              Q = !0;
              break;
            case y:
              return Q = A._init, _(
                Q(A._payload),
                I,
                G,
                H,
                T
              );
          }
      }
    if (Q)
      return T = T(A), Q = H === "" ? "." + M(A, 0) : H, k(T) ? (G = "", Q != null && (G = Q.replace(J, "$&/") + "/"), _(T, I, G, "", function(de) {
        return de;
      })) : T != null && (Y(T) && (T = K(
        T,
        G + (T.key == null || A && A.key === T.key ? "" : ("" + T.key).replace(
          J,
          "$&/"
        ) + "/") + Q
      )), I.push(T)), 1;
    Q = 0;
    var P = H === "" ? "." : H + ":";
    if (k(A))
      for (var ie = 0; ie < A.length; ie++)
        H = A[ie], q = P + M(H, ie), Q += _(
          H,
          I,
          G,
          q,
          T
        );
    else if (ie = x(A), typeof ie == "function")
      for (A = ie.call(A), ie = 0; !(H = A.next()).done; )
        H = H.value, q = P + M(H, ie++), Q += _(
          H,
          I,
          G,
          q,
          T
        );
    else if (q === "object") {
      if (typeof A.then == "function")
        return _(
          L(A),
          I,
          G,
          H,
          T
        );
      throw I = String(A), Error(
        "Objects are not valid as a React child (found: " + (I === "[object Object]" ? "object with keys {" + Object.keys(A).join(", ") + "}" : I) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return Q;
  }
  function z(A, I, G) {
    if (A == null) return A;
    var H = [], T = 0;
    return _(A, H, "", "", function(q) {
      return I.call(G, q, T++);
    }), H;
  }
  function B(A) {
    if (A._status === -1) {
      var I = A._result;
      I = I(), I.then(
        function(G) {
          (A._status === 0 || A._status === -1) && (A._status = 1, A._result = G);
        },
        function(G) {
          (A._status === 0 || A._status === -1) && (A._status = 2, A._result = G);
        }
      ), A._status === -1 && (A._status = 0, A._result = I);
    }
    if (A._status === 1) return A._result.default;
    throw A._result;
  }
  var $ = typeof reportError == "function" ? reportError : function(A) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var I = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof A == "object" && A !== null && typeof A.message == "string" ? String(A.message) : String(A),
        error: A
      });
      if (!window.dispatchEvent(I)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", A);
      return;
    }
    console.error(A);
  }, F = {
    map: z,
    forEach: function(A, I, G) {
      z(
        A,
        function() {
          I.apply(this, arguments);
        },
        G
      );
    },
    count: function(A) {
      var I = 0;
      return z(A, function() {
        I++;
      }), I;
    },
    toArray: function(A) {
      return z(A, function(I) {
        return I;
      }) || [];
    },
    only: function(A) {
      if (!Y(A))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return A;
    }
  };
  return Ee.Activity = p, Ee.Children = F, Ee.Component = O, Ee.Fragment = l, Ee.Profiler = s, Ee.PureComponent = E, Ee.StrictMode = r, Ee.Suspense = g, Ee.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = V, Ee.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(A) {
      return V.H.useMemoCache(A);
    }
  }, Ee.cache = function(A) {
    return function() {
      return A.apply(null, arguments);
    };
  }, Ee.cacheSignal = function() {
    return null;
  }, Ee.cloneElement = function(A, I, G) {
    if (A == null)
      throw Error(
        "The argument must be a React element, but you passed " + A + "."
      );
    var H = C({}, A.props), T = A.key;
    if (I != null)
      for (q in I.key !== void 0 && (T = "" + I.key), I)
        !X.call(I, q) || q === "key" || q === "__self" || q === "__source" || q === "ref" && I.ref === void 0 || (H[q] = I[q]);
    var q = arguments.length - 2;
    if (q === 1) H.children = G;
    else if (1 < q) {
      for (var Q = Array(q), P = 0; P < q; P++)
        Q[P] = arguments[P + 2];
      H.children = Q;
    }
    return te(A.type, T, H);
  }, Ee.createContext = function(A) {
    return A = {
      $$typeof: f,
      _currentValue: A,
      _currentValue2: A,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, A.Provider = A, A.Consumer = {
      $$typeof: c,
      _context: A
    }, A;
  }, Ee.createElement = function(A, I, G) {
    var H, T = {}, q = null;
    if (I != null)
      for (H in I.key !== void 0 && (q = "" + I.key), I)
        X.call(I, H) && H !== "key" && H !== "__self" && H !== "__source" && (T[H] = I[H]);
    var Q = arguments.length - 2;
    if (Q === 1) T.children = G;
    else if (1 < Q) {
      for (var P = Array(Q), ie = 0; ie < Q; ie++)
        P[ie] = arguments[ie + 2];
      T.children = P;
    }
    if (A && A.defaultProps)
      for (H in Q = A.defaultProps, Q)
        T[H] === void 0 && (T[H] = Q[H]);
    return te(A, q, T);
  }, Ee.createRef = function() {
    return { current: null };
  }, Ee.forwardRef = function(A) {
    return { $$typeof: h, render: A };
  }, Ee.isValidElement = Y, Ee.lazy = function(A) {
    return {
      $$typeof: y,
      _payload: { _status: -1, _result: A },
      _init: B
    };
  }, Ee.memo = function(A, I) {
    return {
      $$typeof: m,
      type: A,
      compare: I === void 0 ? null : I
    };
  }, Ee.startTransition = function(A) {
    var I = V.T, G = {};
    V.T = G;
    try {
      var H = A(), T = V.S;
      T !== null && T(G, H), typeof H == "object" && H !== null && typeof H.then == "function" && H.then(U, $);
    } catch (q) {
      $(q);
    } finally {
      I !== null && G.types !== null && (I.types = G.types), V.T = I;
    }
  }, Ee.unstable_useCacheRefresh = function() {
    return V.H.useCacheRefresh();
  }, Ee.use = function(A) {
    return V.H.use(A);
  }, Ee.useActionState = function(A, I, G) {
    return V.H.useActionState(A, I, G);
  }, Ee.useCallback = function(A, I) {
    return V.H.useCallback(A, I);
  }, Ee.useContext = function(A) {
    return V.H.useContext(A);
  }, Ee.useDebugValue = function() {
  }, Ee.useDeferredValue = function(A, I) {
    return V.H.useDeferredValue(A, I);
  }, Ee.useEffect = function(A, I) {
    return V.H.useEffect(A, I);
  }, Ee.useEffectEvent = function(A) {
    return V.H.useEffectEvent(A);
  }, Ee.useId = function() {
    return V.H.useId();
  }, Ee.useImperativeHandle = function(A, I, G) {
    return V.H.useImperativeHandle(A, I, G);
  }, Ee.useInsertionEffect = function(A, I) {
    return V.H.useInsertionEffect(A, I);
  }, Ee.useLayoutEffect = function(A, I) {
    return V.H.useLayoutEffect(A, I);
  }, Ee.useMemo = function(A, I) {
    return V.H.useMemo(A, I);
  }, Ee.useOptimistic = function(A, I) {
    return V.H.useOptimistic(A, I);
  }, Ee.useReducer = function(A, I, G) {
    return V.H.useReducer(A, I, G);
  }, Ee.useRef = function(A) {
    return V.H.useRef(A);
  }, Ee.useState = function(A) {
    return V.H.useState(A);
  }, Ee.useSyncExternalStore = function(A, I, G) {
    return V.H.useSyncExternalStore(
      A,
      I,
      G
    );
  }, Ee.useTransition = function() {
    return V.H.useTransition();
  }, Ee.version = "19.2.4", Ee;
}
var Mp;
function Ul() {
  return Mp || (Mp = 1, kf.exports = x1()), kf.exports;
}
var ee = Ul();
const vl = /* @__PURE__ */ cy(ee), Tp = "/rpc", w1 = "2.0", Nl = {
  applyEvent: "fsm.apply_event",
  snapshot: "fsm.snapshot"
}, io = {
  listMachines: "fsm.authoring.list_machines",
  getMachine: "fsm.authoring.get_machine",
  saveDraft: "fsm.authoring.save_draft",
  validate: "fsm.authoring.validate",
  publish: "fsm.authoring.publish",
  deleteMachine: "fsm.authoring.delete_machine"
}, za = {
  versionConflict: "FSM_VERSION_CONFLICT",
  idempotencyConflict: "FSM_IDEMPOTENCY_CONFLICT",
  guardRejected: "FSM_GUARD_REJECTED",
  invalidTransition: "FSM_INVALID_TRANSITION",
  stateNotFound: "FSM_STATE_NOT_FOUND",
  authoringNotFound: "FSM_AUTHORING_NOT_FOUND",
  authoringValidationFailed: "FSM_AUTHORING_VALIDATION_FAILED",
  internal: "FSM_INTERNAL"
};
class Vs extends Error {
  method;
  code;
  data;
  status;
  constructor(i) {
    super(i.message), this.name = "RPCClientError", this.method = i.method, this.code = i.code, this.data = i.data, this.status = i.status;
  }
}
function S1() {
  return Math.random().toString(36).slice(2);
}
function E1(n, i, l) {
  const r = {
    id: (l.idGenerator ?? S1)(),
    method: n
  };
  return i !== void 0 && (r.params = i), l.rpcVersion === "2.0" && (r.jsonrpc = "2.0"), r;
}
function fy(n) {
  return !!n && typeof n == "object" && !Array.isArray(n);
}
function _1(n, i) {
  if (!fy(i))
    return i;
  if (i.error)
    throw new Vs({
      method: n,
      message: i.error.message || `rpc call failed: ${n}`,
      code: i.error.code,
      data: i.error.data
    });
  return "result" in i ? i.result : i;
}
function N1() {
  if (typeof globalThis.fetch != "function")
    throw new Error("global fetch is unavailable; provide fetchImpl explicitly");
  return globalThis.fetch.bind(globalThis);
}
class C1 {
  constructor(i) {
    this.options = i, this.fetchImpl = i.fetchImpl ?? N1();
  }
  fetchImpl;
  async call(i, l) {
    const r = JSON.stringify(E1(i, l, this.options)), s = await this.fetchImpl(this.options.endpoint, {
      ...this.options.requestInit,
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...this.options.headers ?? {}
      },
      body: r
    }), c = await s.json().catch(() => null);
    if (!s.ok)
      throw fy(c) && c.error ? new Vs({
        method: i,
        message: c.error.message || `rpc call failed (${s.status})`,
        code: c.error.code,
        data: c.error.data,
        status: s.status
      }) : new Vs({
        method: i,
        message: `rpc call failed (${s.status})`,
        status: s.status,
        data: c
      });
    return _1(i, c);
  }
}
class dy extends Error {
  method;
  envelope;
  constructor(i, l) {
    super(l.message), this.name = "BuilderResultError", this.method = i, this.envelope = l;
  }
}
function M1(n) {
  return n.replace(/\/+$/, "");
}
function T1(n) {
  return n.endpoint && n.endpoint.trim() !== "" ? n.endpoint : !n.origin || n.origin.trim() === "" ? Tp : `${M1(n.origin)}${Tp}`;
}
function j1(n = {}) {
  return new C1({
    endpoint: T1(n),
    rpcVersion: w1,
    headers: n.headers,
    fetchImpl: n.fetchImpl,
    requestInit: n.requestInit
  });
}
async function Aa(n) {
  const i = {
    data: n.data,
    meta: n.meta
  }, l = await n.client.call(
    n.method,
    i
  );
  return A1(n.method, l);
}
function A1(n, i) {
  if (i.error)
    throw new dy(n, i.error);
  if (i.data === void 0)
    throw new Error(`rpc result missing data envelope for method ${n}`);
  return i.data;
}
function D1(n) {
  return {
    async listMachines(i, l) {
      return Aa({
        client: n,
        method: io.listMachines,
        data: i,
        meta: l
      });
    },
    async getMachine(i, l) {
      return Aa({
        client: n,
        method: io.getMachine,
        data: i,
        meta: l
      });
    },
    async saveDraft(i, l) {
      return Aa({
        client: n,
        method: io.saveDraft,
        data: i,
        meta: l
      });
    },
    async validate(i, l) {
      return Aa({
        client: n,
        method: io.validate,
        data: i,
        meta: l
      });
    },
    async publish(i, l) {
      return Aa({
        client: n,
        method: io.publish,
        data: i,
        meta: l
      });
    },
    async deleteMachine(i, l) {
      return Aa({
        client: n,
        method: io.deleteMachine,
        data: i,
        meta: l
      });
    }
  };
}
function O1(n) {
  return ee.useMemo(() => n ? D1(n) : null, [n]);
}
function z1(n) {
  return `${n.trim().replace(/[^a-zA-Z0-9_-]+/g, "-") || "machine"}.json`;
}
function R1(n) {
  return n.definition;
}
function k1(n, i) {
  if (typeof window > "u" || typeof document > "u")
    return;
  const l = new Blob([i], { type: "application/json;charset=utf-8" }), r = window.URL.createObjectURL(l), s = document.createElement("a");
  s.href = r, s.download = n, s.style.display = "none", document.body.appendChild(s), s.click(), document.body.removeChild(s), window.URL.revokeObjectURL(r);
}
function H1(n = {}) {
  return {
    async exportJSON({ machineId: i, draft: l }) {
      k1(z1(i), JSON.stringify(R1(l), null, 2));
    },
    exportRPC: n.exportRPC
  };
}
function B1(n) {
  return !!n?.exportRPC;
}
const L1 = ["step", "when"], hy = ["parallel", "join", "batch", "compensation"];
function Ys(n) {
  return L1.includes(n);
}
function gy(n) {
  return hy.includes(n);
}
function U1(n) {
  const i = /* @__PURE__ */ new Set();
  for (const l of n.transitions)
    for (const r of l.workflow?.nodes ?? [])
      gy(r.kind) && i.add(r.kind);
  return [...i];
}
function Tl() {
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
function Re(n) {
  return typeof structuredClone == "function" ? structuredClone(n) : JSON.parse(JSON.stringify(n));
}
function bl(n) {
  return JSON.stringify(n);
}
function Vl(n) {
  return n !== null && typeof n == "object" && !Array.isArray(n) ? n : null;
}
function jp(n) {
  const i = Vl(n);
  return i ? Array.isArray(i.states) && Array.isArray(i.transitions) : !1;
}
function V1(n, i) {
  const l = Vl(n);
  return l ? {
    is_draft: typeof l.is_draft == "boolean" ? l.is_draft : i.is_draft,
    last_saved_at: typeof l.last_saved_at == "string" && l.last_saved_at.trim() !== "" ? l.last_saved_at : i.last_saved_at
  } : Re(i);
}
function Y1(n) {
  const i = Tl(), l = Re(n);
  return {
    ...i,
    ...l,
    definition: Re(l.definition),
    ui_schema: Vl(l.ui_schema) ? Re(l.ui_schema) : Re(i.ui_schema),
    draft_state: V1(l.draft_state, i.draft_state)
  };
}
function I1(n) {
  return {
    ...Tl(),
    definition: Re(n)
  };
}
function q1(n) {
  const i = Vl(n);
  return i && "draft" in i ? i.draft : n;
}
function X1(n) {
  const i = q1(n), l = Vl(i);
  return l ? jp(l.definition) ? Y1(l) : jp(i) ? I1(i) : Tl() : Tl();
}
function G1(n) {
  const i = n.event || "(event)", l = n.to || n.dynamic_to?.resolver || "(target)";
  return `${i} -> ${l}`;
}
function $1(n, i) {
  return n.filter((l) => my(l, i));
}
function ys(n, i, l) {
  return n.filter((r) => my(r, i) ? r.field === l || r.path.endsWith(`.${l}`) : !1);
}
function my(n, i) {
  const l = n.path;
  switch (i.kind) {
    case "machine":
      return !0;
    case "state": {
      const r = i.stateIndex;
      return l.includes(`states[${r}]`);
    }
    case "transition": {
      const r = i.transitionIndex;
      return l.includes(`transitions[${r}]`);
    }
    case "workflow-node": {
      const { transitionIndex: r, nodeIndex: s } = i;
      return l.includes(`transitions[${r}]`) && l.includes(`workflow.nodes[${s}]`);
    }
  }
}
function vs(n, i) {
  const l = n.match(i);
  if (!l?.[1])
    return null;
  const r = Number.parseInt(l[1], 10);
  return Number.isNaN(r) ? null : r;
}
function Z1(n, i) {
  for (let l = 0; l < n.transitions.length; l += 1) {
    const r = n.transitions[l]?.workflow?.nodes ?? [];
    for (let s = 0; s < r.length; s += 1)
      if (r[s]?.id === i)
        return { kind: "workflow-node", transitionIndex: l, nodeIndex: s };
  }
  return null;
}
function Q1(n, i) {
  const l = n.transitions.findIndex((r) => r.id === i);
  return l === -1 ? null : { kind: "transition", transitionIndex: l };
}
function K1(n, i) {
  const l = n.states.findIndex((r) => r.name === i);
  return l === -1 ? null : { kind: "state", stateIndex: l };
}
function J1(n, i) {
  if (i.node_id)
    return Z1(n, i.node_id) || Q1(n, i.node_id) || K1(n, i.node_id);
  const l = vs(i.path, /transitions\[(\d+)\]/), r = vs(i.path, /workflow\.nodes\[(\d+)\]/);
  if (l !== null && r !== null)
    return {
      kind: "workflow-node",
      transitionIndex: l,
      nodeIndex: r
    };
  const s = vs(i.path, /transitions\[(\d+)\]/);
  if (s !== null)
    return { kind: "transition", transitionIndex: s };
  const c = vs(i.path, /states\[(\d+)\]/);
  return c !== null ? { kind: "state", stateIndex: c } : null;
}
function Qn(n) {
  return {
    code: n.code,
    severity: "error",
    message: n.message,
    path: n.path,
    node_id: n.nodeID,
    field: n.field
  };
}
function W1(n, i, l, r, s) {
  const c = `$.transitions[${i}].workflow.nodes[${r}]`;
  if (!Ys(l.kind)) {
    const f = gy(l.kind) ? `${l.kind} is unsupported in builder v1` : `unsupported workflow node kind ${l.kind}`;
    s.push(
      Qn({
        code: "FSM002_INVALID_WORKFLOW_NODE",
        message: f,
        path: `${c}.kind`,
        nodeID: l.id,
        field: "kind"
      })
    );
    return;
  }
  if (l.kind === "step" && (l.step?.action_id?.trim() ?? "") === "" && s.push(
    Qn({
      code: "FSM001_UNRESOLVED_ACTION",
      message: "step action_id is required",
      path: `${c}.step.action_id`,
      nodeID: l.id,
      field: "action_id"
    })
  ), l.kind === "when" && (l.expr?.trim() ?? "") === "" && s.push(
    Qn({
      code: "FSM002_INVALID_WORKFLOW_NODE",
      message: "when node requires expression",
      path: `${c}.expr`,
      nodeID: l.id,
      field: "expr"
    })
  ), Array.isArray(l.next))
    for (const f of l.next)
      n.workflow.nodes.some((g) => g.id === f) || s.push(
        Qn({
          code: "FSM002_INVALID_WORKFLOW_NODE",
          message: `workflow next references unknown node ${f}`,
          path: `${c}.next`,
          nodeID: l.id,
          field: "next"
        })
      );
}
function py(n) {
  const i = [];
  return n.states.forEach((l, r) => {
    (!l.name || l.name.trim() === "") && i.push(
      Qn({
        code: "FSM003_UNKNOWN_STATE",
        message: "state name is required",
        path: `$.states[${r}].name`,
        field: "name"
      })
    );
  }), n.transitions.forEach((l, r) => {
    const s = `$.transitions[${r}]`;
    (!l.event || l.event.trim() === "") && i.push(
      Qn({
        code: "FSM004_DUPLICATE_TRANSITION",
        message: "transition event is required",
        path: `${s}.event`,
        nodeID: l.id,
        field: "event"
      })
    ), (!l.from || l.from.trim() === "") && i.push(
      Qn({
        code: "FSM003_UNKNOWN_STATE",
        message: "transition from is required",
        path: `${s}.from`,
        nodeID: l.id,
        field: "from"
      })
    );
    const c = !!(l.to && l.to.trim() !== ""), f = !!(l.dynamic_to?.resolver && l.dynamic_to.resolver.trim() !== "");
    if (c === f && i.push(
      Qn({
        code: "FSM001_INVALID_TARGET",
        message: "transition target must define exactly one of to or dynamic resolver",
        path: `${s}.target`,
        nodeID: l.id,
        field: "target"
      })
    ), !l.workflow || l.workflow.nodes.length === 0) {
      i.push(
        Qn({
          code: "FSM005_MISSING_WORKFLOW",
          message: "transition workflow requires at least one node",
          path: `${s}.workflow`,
          nodeID: l.id,
          field: "workflow"
        })
      );
      return;
    }
    l.workflow.nodes.forEach((h, g) => {
      W1(l, r, h, g, i);
    });
  }), i;
}
const F1 = "fsm-ui-builder.autosave";
function bs() {
  return typeof window > "u" || typeof window.localStorage > "u" ? !1 : typeof window.localStorage.getItem == "function" && typeof window.localStorage.setItem == "function" && typeof window.localStorage.removeItem == "function";
}
function Hf(n) {
  return n.trim();
}
function Ap(n) {
  if (!n)
    return null;
  try {
    const i = JSON.parse(n);
    return !i || typeof i != "object" || typeof i.machineId != "string" || !i.document || typeof i.updatedAt != "string" ? null : {
      machineId: i.machineId,
      updatedAt: i.updatedAt,
      document: Re(i.document)
    };
  } catch {
    return null;
  }
}
function P1(n, i) {
  return n.startsWith(`${i}:`);
}
function Bf(n, i) {
  return `${n}:${i}`;
}
function ew(n = F1) {
  return {
    async list() {
      if (!bs())
        return [];
      const i = [];
      for (let l = 0; l < window.localStorage.length; l += 1) {
        const r = window.localStorage.key(l);
        if (!r || !P1(r, n))
          continue;
        const s = Ap(window.localStorage.getItem(r));
        s && i.push({ machineId: s.machineId, updatedAt: s.updatedAt });
      }
      return i.sort((l, r) => r.updatedAt.localeCompare(l.updatedAt)), i;
    },
    async load(i) {
      const l = Hf(i);
      if (l === "" || !bs())
        return null;
      const r = Bf(n, l), s = Ap(window.localStorage.getItem(r));
      return s ? {
        machineId: s.machineId,
        updatedAt: s.updatedAt,
        document: Re(s.document)
      } : null;
    },
    async save(i) {
      const l = Hf(i.machineId);
      if (l === "" || !bs())
        return;
      const r = Bf(n, l), s = {
        machineId: l,
        updatedAt: i.updatedAt,
        document: Re(i.document)
      };
      window.localStorage.setItem(r, JSON.stringify(s));
    },
    async delete(i) {
      const l = Hf(i);
      l === "" || !bs() || window.localStorage.removeItem(Bf(n, l));
    }
  };
}
const Dp = (n) => {
  let i;
  const l = /* @__PURE__ */ new Set(), r = (m, y) => {
    const p = typeof m == "function" ? m(i) : m;
    if (!Object.is(p, i)) {
      const v = i;
      i = y ?? (typeof p != "object" || p === null) ? p : Object.assign({}, i, p), l.forEach((x) => x(i, v));
    }
  }, s = () => i, h = { setState: r, getState: s, getInitialState: () => g, subscribe: (m) => (l.add(m), () => l.delete(m)) }, g = i = n(r, s, h);
  return h;
}, wd = ((n) => n ? Dp(n) : Dp), tw = (n) => n;
function Sd(n, i = tw) {
  const l = vl.useSyncExternalStore(
    n.subscribe,
    vl.useCallback(() => i(n.getState()), [n, i]),
    vl.useCallback(() => i(n.getInitialState()), [n, i])
  );
  return vl.useDebugValue(l), l;
}
function xl(n, i) {
  return i <= 0 ? 0 : Math.min(Math.max(0, n), i - 1);
}
function wl(n, i = []) {
  const l = py(n.definition);
  return i.length === 0 ? l : [...i, ...l];
}
function Is(n, i) {
  const l = n.id.trim();
  return l !== "" ? `id:${l}` : `index:${i}`;
}
function ri(n) {
  const i = {};
  for (const [l, r] of Object.entries(n))
    i[l] = {
      staticTo: r.staticTo,
      dynamicTarget: r.dynamicTarget ? Re(r.dynamicTarget) : void 0
    };
  return i;
}
function Lf(n) {
  const i = {};
  return n.definition.transitions.forEach((l, r) => {
    i[Is(l, r)] = {
      staticTo: l.to,
      dynamicTarget: l.dynamic_to ? Re(l.dynamic_to) : void 0
    };
  }), i;
}
function Op(n, i, l) {
  const r = Is(i, l), s = n[r];
  if (s)
    return s;
  const c = {
    staticTo: i.to,
    dynamicTarget: i.dynamic_to ? Re(i.dynamic_to) : void 0
  };
  return n[r] = c, c;
}
function nw(n, i) {
  const l = {};
  for (const [r, s] of Object.entries(n)) {
    if (!r.startsWith("index:")) {
      l[r] = s;
      continue;
    }
    const c = Number.parseInt(r.slice(6), 10);
    if (Number.isNaN(c)) {
      l[r] = s;
      continue;
    }
    if (c !== i) {
      if (c > i) {
        l[`index:${c - 1}`] = s;
        continue;
      }
      l[r] = s;
    }
  }
  return l;
}
function Rs(n, i, l) {
  const r = xl(i, n.length), s = n[r], c = bl(s.document);
  return {
    document: Re(s.document),
    selection: s.selection,
    diagnostics: [...s.diagnostics],
    targetCache: ri(s.targetCache),
    history: n,
    historyIndex: r,
    baselineHash: l,
    isDirty: c !== l
  };
}
function xs(n) {
  return n.workflow || (n.workflow = { nodes: [] }), Array.isArray(n.workflow.nodes) || (n.workflow.nodes = []), n;
}
function Yt(n, i, l, r) {
  n.setState((s) => {
    const c = Re(s.document), f = ri(s.targetCache);
    l(c, s, f);
    const h = wl(c), g = r ? r(c, s) : s.selection, m = s.history.slice(0, s.historyIndex + 1);
    return m.push({
      document: c,
      selection: g,
      diagnostics: h,
      targetCache: f,
      transaction: i
    }), Rs(m, m.length - 1, s.baselineHash);
  });
}
function ws(n) {
  return n.states.length === 0 ? "" : n.states[0]?.name ?? "";
}
function zp(n, i) {
  return n === "step" ? {
    id: `step-${i + 1}`,
    kind: n,
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
    kind: n,
    expr: "",
    next: []
  };
}
function aw(n = {}) {
  const i = Re(n.document ?? Tl()), l = { kind: "machine" }, r = wl(i, n.diagnostics), s = Lf(i), c = bl(i), f = [
    {
      document: i,
      selection: l,
      diagnostics: r,
      targetCache: ri(s),
      transaction: "init"
    }
  ], h = wd((g, m) => ({
    document: Re(i),
    selection: l,
    diagnostics: [...r],
    targetCache: ri(s),
    history: f,
    historyIndex: 0,
    baselineHash: c,
    isDirty: !1,
    setSelection(y) {
      g({ selection: y });
    },
    replaceDocument(y, p) {
      g(() => {
        const v = Re(y), x = wl(v, p), S = Lf(v), C = { kind: "machine" }, j = [
          {
            document: v,
            selection: C,
            diagnostics: x,
            targetCache: ri(S),
            transaction: "replace-document"
          }
        ], O = bl(v);
        return {
          document: Re(v),
          selection: C,
          diagnostics: x,
          targetCache: ri(S),
          history: j,
          historyIndex: 0,
          baselineHash: O,
          isDirty: !1
        };
      });
    },
    setDiagnostics(y) {
      g((p) => ({ diagnostics: wl(p.document, y) }));
    },
    focusDiagnostic(y) {
      g((p) => {
        const v = J1(p.document.definition, y);
        return v ? { selection: v } : p;
      });
    },
    setMachineName(y) {
      Yt(h, "set-machine-name", (p) => {
        p.definition.name = y;
      });
    },
    addState() {
      Yt(
        h,
        "add-state",
        (y) => {
          const p = y.definition.states.length + 1;
          y.definition.states.push({ name: `state_${p}` });
        },
        (y) => ({ kind: "state", stateIndex: Math.max(0, y.definition.states.length - 1) })
      );
    },
    removeState(y) {
      Yt(
        h,
        "remove-state",
        (p) => {
          if (y < 0 || y >= p.definition.states.length)
            return;
          const v = p.definition.states[y]?.name;
          p.definition.states.splice(y, 1), v && p.definition.transitions.forEach((x) => {
            x.from === v && (x.from = ws(p.definition)), x.to === v && (x.to = ws(p.definition));
          });
        },
        (p, v) => p.definition.states.length === 0 ? { kind: "machine" } : { kind: "state", stateIndex: v.selection.kind === "state" ? xl(Math.min(v.selection.stateIndex, y), p.definition.states.length) : xl(y, p.definition.states.length) }
      );
    },
    updateStateName(y, p) {
      Yt(h, "update-state-name", (v) => {
        const x = v.definition.states[y];
        if (!x)
          return;
        const S = x.name;
        x.name = p, v.definition.transitions.forEach((C) => {
          C.from === S && (C.from = p), C.to === S && (C.to = p);
        });
      });
    },
    updateStateFlag(y, p, v) {
      Yt(h, `update-state-${p}`, (x) => {
        const S = x.definition.states[y];
        S && (p === "initial" && v && x.definition.states.forEach((C) => {
          C.initial = !1;
        }), S[p] = v);
      });
    },
    addTransition() {
      Yt(
        h,
        "add-transition",
        (y, p, v) => {
          const x = ws(y.definition), S = y.definition.states[1]?.name ?? x, C = y.definition.transitions.length + 1, j = {
            id: `transition_${C}`,
            event: `event_${C}`,
            from: x,
            to: S,
            workflow: {
              nodes: [zp("step", 0)]
            },
            metadata: {}
          };
          y.definition.transitions.push(j), v[Is(j, y.definition.transitions.length - 1)] = {
            staticTo: j.to
          };
        },
        (y) => ({ kind: "transition", transitionIndex: Math.max(0, y.definition.transitions.length - 1) })
      );
    },
    removeTransition(y) {
      Yt(
        h,
        "remove-transition",
        (p, v, x) => {
          if (y < 0 || y >= p.definition.transitions.length)
            return;
          const S = p.definition.transitions[y];
          S && delete x[Is(S, y)], p.definition.transitions.splice(y, 1);
          const C = nw(x, y);
          Object.keys(x).forEach((j) => {
            delete x[j];
          }), Object.assign(x, C);
        },
        (p) => p.definition.transitions.length === 0 ? { kind: "machine" } : {
          kind: "transition",
          transitionIndex: xl(y, p.definition.transitions.length)
        }
      );
    },
    updateTransition(y, p, v) {
      Yt(h, `update-transition-${p}`, (x, S, C) => {
        const j = x.definition.transitions[y];
        if (!j)
          return;
        const O = Op(C, j, y);
        if (p === "event") {
          j.event = v;
          return;
        }
        if (p === "from") {
          j.from = v;
          return;
        }
        if (p === "to") {
          j.to = v, O.staticTo = v;
          return;
        }
        if (p === "dynamic_to.resolver") {
          const D = {
            ...j.dynamic_to ?? O.dynamicTarget ?? { resolver: "" },
            resolver: v
          };
          j.dynamic_to = D, O.dynamicTarget = Re(D);
        }
      });
    },
    updateTransitionTargetKind(y, p) {
      Yt(h, "update-transition-target-kind", (v, x, S) => {
        const C = v.definition.transitions[y];
        if (!C)
          return;
        const j = Op(S, C, y);
        if (C.to && C.to.trim() !== "" && (j.staticTo = C.to), C.dynamic_to?.resolver && C.dynamic_to.resolver.trim() !== "" && (j.dynamicTarget = Re(C.dynamic_to)), p === "static") {
          C.dynamic_to = void 0;
          const O = j.staticTo?.trim() ?? "";
          C.to = O || ws(v.definition);
          return;
        }
        C.to = void 0, C.dynamic_to = Re(j.dynamicTarget ?? { resolver: "" });
      });
    },
    addWorkflowNode(y, p) {
      Yt(
        h,
        `add-${p}-workflow-node`,
        (v) => {
          const x = v.definition.transitions[y];
          if (!x)
            return;
          xs(x);
          const S = x.workflow.nodes.length;
          x.workflow.nodes.push(zp(p, S));
        },
        (v) => {
          const x = v.definition.transitions[y];
          if (!x)
            return { kind: "machine" };
          const S = Math.max(0, x.workflow.nodes.length - 1);
          return { kind: "workflow-node", transitionIndex: y, nodeIndex: S };
        }
      );
    },
    removeWorkflowNode(y, p) {
      Yt(
        h,
        "remove-workflow-node",
        (v) => {
          const x = v.definition.transitions[y];
          x && (xs(x), !(p < 0 || p >= x.workflow.nodes.length) && (x.workflow.nodes.splice(p, 1), x.workflow.nodes.forEach((S) => {
            Array.isArray(S.next) && (S.next = S.next.filter(
              (C) => x.workflow.nodes.some((j) => j.id === C)
            ));
          })));
        },
        (v) => {
          const x = v.definition.transitions[y];
          return !x || x.workflow.nodes.length === 0 ? { kind: "transition", transitionIndex: y } : {
            kind: "workflow-node",
            transitionIndex: y,
            nodeIndex: xl(p, x.workflow.nodes.length)
          };
        }
      );
    },
    selectWorkflowNode(y, p) {
      g({ selection: { kind: "workflow-node", transitionIndex: y, nodeIndex: p } });
    },
    updateWorkflowNodeField(y, p, v, x) {
      Yt(h, `update-workflow-node-${v}`, (S) => {
        const C = S.definition.transitions[y];
        if (!C)
          return;
        xs(C);
        const j = C.workflow.nodes[p];
        if (j && Ys(j.kind)) {
          if (v === "expr") {
            j.expr = String(x);
            return;
          }
          if (j.step = j.step ?? {
            action_id: "",
            async: !1,
            delay: "",
            timeout: "",
            metadata: {}
          }, v === "action_id") {
            j.step.action_id = String(x);
            return;
          }
          if (v === "async") {
            j.step.async = !!x;
            return;
          }
          if (v === "delay") {
            j.step.delay = String(x);
            return;
          }
          v === "timeout" && (j.step.timeout = String(x));
        }
      });
    },
    updateWorkflowNodeMetadata(y, p, v) {
      Yt(h, "update-workflow-node-metadata", (x) => {
        const S = x.definition.transitions[y];
        if (!S)
          return;
        xs(S);
        const C = S.workflow.nodes[p];
        C && C.kind === "step" && (C.step = C.step ?? {
          action_id: "",
          async: !1,
          delay: "",
          timeout: "",
          metadata: {}
        }, C.step.metadata = Re(v));
      });
    },
    undo() {
      const y = m();
      if (y.historyIndex === 0)
        return;
      const p = y.historyIndex - 1;
      g(Rs(y.history, p, y.baselineHash));
    },
    redo() {
      const y = m();
      if (y.historyIndex >= y.history.length - 1)
        return;
      const p = y.historyIndex + 1;
      g(Rs(y.history, p, y.baselineHash));
    },
    markSaved() {
      g((y) => ({
        baselineHash: bl(y.document),
        isDirty: !1
      }));
    },
    applyRemoteSave(y, p, v) {
      g((x) => {
        const S = Re(x.document);
        S.definition.version = y, S.draft_state = Re(p);
        const C = wl(S, v), j = Lf(S), O = {
          document: S,
          selection: x.selection,
          diagnostics: C,
          targetCache: ri(j),
          transaction: "apply-remote-save"
        }, D = x.history.slice(0, x.historyIndex + 1);
        D.push(O);
        const E = bl(S);
        return Rs(D, D.length - 1, E);
      });
    }
  }));
  return h;
}
function Pt(n) {
  return n !== null && typeof n == "object" && !Array.isArray(n) ? n : null;
}
function nt(n, i, l = "") {
  for (const r of i) {
    const s = n[r];
    if (typeof s == "string")
      return s;
  }
  return l;
}
function Sl(n, i) {
  for (const l of i) {
    const r = n[l];
    if (typeof r == "number" && Number.isFinite(r))
      return r;
  }
}
function jl(n, i, l = !1) {
  for (const r of i) {
    const s = n[r];
    if (typeof s == "boolean")
      return s;
  }
  return l;
}
function iw(n, i) {
  for (const l of i) {
    const r = n[l];
    if (typeof r == "boolean")
      return r;
  }
}
function ow(n, i) {
  for (const l of i) {
    const r = n[l];
    if (Array.isArray(r))
      return r.filter((s) => typeof s == "string");
  }
}
function ui(n, i) {
  for (const l of i) {
    const r = n[l], s = Pt(r);
    if (s)
      return { ...s };
  }
}
function Rp(n) {
  if (typeof n == "number")
    return n / 1e6;
}
function lw(n) {
  const i = Pt(n) ?? {};
  return {
    kind: nt(i, ["kind", "Kind"]),
    to: nt(i, ["to", "To"]) || void 0,
    resolver: nt(i, ["resolver", "Resolver"]) || void 0,
    resolved: jl(i, ["resolved", "Resolved"]),
    resolvedTo: nt(i, ["resolvedTo", "ResolvedTo"]) || void 0,
    candidates: ow(i, ["candidates", "Candidates"])
  };
}
function rw(n) {
  const i = Pt(n) ?? {}, l = i.rejections ?? i.Rejections, r = Array.isArray(l) ? l.map((s) => sw(s)) : void 0;
  return {
    id: nt(i, ["id", "ID"]),
    event: nt(i, ["event", "Event"]),
    target: lw(i.target ?? i.Target),
    allowed: jl(i, ["allowed", "Allowed"], !0),
    rejections: r,
    metadata: ui(i, ["metadata", "Metadata"])
  };
}
function sw(n) {
  const i = Pt(n) ?? {};
  return {
    code: nt(i, ["code", "Code"]),
    category: nt(i, ["category", "Category"]),
    retryable: jl(i, ["retryable", "Retryable"]),
    requiresAction: jl(i, ["requiresAction", "RequiresAction"]),
    message: nt(i, ["message", "Message"]),
    remediationHint: nt(i, ["remediationHint", "RemediationHint"]) || void 0,
    metadata: ui(i, ["metadata", "Metadata"])
  };
}
function uw(n) {
  const i = Pt(n) ?? {}, l = nt(i, ["kind", "Kind"]), r = nt(i, ["actionId", "ActionID"]);
  if (l === "command" || r !== "") {
    const c = Sl(i, ["delayMs", "DelayMs"]), f = Sl(i, ["timeoutMs", "TimeoutMs"]), h = c ?? Rp(Sl(i, ["Delay", "delay"])), g = f ?? Rp(Sl(i, ["Timeout", "timeout"])), m = {
      kind: "command",
      actionId: r,
      payload: ui(i, ["payload", "Payload"]) ?? {},
      async: jl(i, ["async", "Async"]),
      metadata: ui(i, ["metadata", "Metadata"])
    };
    return h !== void 0 && (m.delayMs = h), g !== void 0 && (m.timeoutMs = g), m;
  }
  return {
    kind: "emit_event",
    event: nt(i, ["event", "Event"]),
    msg: i.msg ?? i.Msg,
    metadata: ui(i, ["metadata", "Metadata"])
  };
}
function cw(n) {
  const i = Pt(n) ?? {}, l = i.effects ?? i.Effects, r = Array.isArray(l) ? l.map((s) => uw(s)) : [];
  return {
    previousState: nt(i, ["previousState", "PreviousState"]),
    currentState: nt(i, ["currentState", "CurrentState"]),
    effects: r
  };
}
function yy(n) {
  const i = Pt(n) ?? {}, l = i.allowedTransitions ?? i.AllowedTransitions, r = Array.isArray(l) ? l.map((s) => rw(s)) : [];
  return {
    entityId: nt(i, ["entityId", "EntityID"]),
    currentState: nt(i, ["currentState", "CurrentState"]),
    allowedTransitions: r,
    metadata: ui(i, ["metadata", "Metadata"])
  };
}
function fw(n) {
  const i = Pt(n) ?? {};
  return {
    executionId: nt(i, ["executionId", "ExecutionID"]),
    policy: nt(i, ["policy", "Policy"]) || void 0,
    status: nt(i, ["status", "Status"]),
    metadata: ui(i, ["metadata", "Metadata"])
  };
}
function dw(n) {
  const i = Pt(n);
  if (i && (i.error ?? i.Error))
    throw new Error("rpc apply event response contains error envelope");
  const l = i ? Pt(i.result ?? i.Result) : null;
  if (l && (l.error ?? l.Error))
    throw new Error("rpc apply event response contains result error envelope");
  const r = i ? Pt(i.data ?? i.Data) : null, s = l ? Pt(l.data ?? l.Data) : null, c = r ?? s ?? l ?? i;
  if (!c)
    throw new Error("invalid apply event response: expected object envelope");
  const f = c.transition ?? c.Transition, h = c.snapshot ?? c.Snapshot;
  if (!f || !h)
    throw new Error("invalid apply event response: transition and snapshot are required");
  const g = c.execution ?? c.Execution;
  return {
    eventId: nt(c, ["eventId", "EventID"]),
    version: Sl(c, ["version", "Version"]) ?? 0,
    transition: cw(f),
    snapshot: yy(h),
    execution: g ? fw(g) : void 0,
    idempotencyHit: iw(c, ["idempotencyHit", "IdempotencyHit"])
  };
}
function kp(n) {
  return n !== null && typeof n == "object" && !Array.isArray(n) ? n : null;
}
function hw(n) {
  const i = kp(n);
  if (!i)
    return n;
  const l = kp(i.result ?? i.Result);
  return l ? l.data ?? l.Data ?? l : i.data ?? i.Data ?? i;
}
function vy(n) {
  return dw(n);
}
function by(n) {
  return yy(hw(n));
}
function qs(n, i) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    level: n,
    message: i,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function gw(n) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    code: n.code,
    message: n.message,
    method: n.method,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function mw(n, i) {
  const l = vy(n), r = l.execution?.status ?? "dry_run", s = {
    selectedTransitionID: i?.transitionId,
    event: i?.event ?? "(event)",
    previousState: l.transition.previousState,
    currentState: l.transition.currentState,
    status: r,
    idempotencyHit: l.idempotencyHit
  };
  return {
    applyEventResult: l,
    projectedOutcome: s,
    log: [
      qs(
        "info",
        `Projected ${s.event}: ${s.previousState} -> ${s.currentState} (${s.status})`
      )
    ]
  };
}
function pw(n) {
  const i = by(n), l = i.allowedTransitions.filter((r) => !r.allowed);
  return {
    snapshotResult: i,
    blockedTransitions: l,
    log: [
      qs(
        "info",
        `Snapshot state ${i.currentState}, blocked transitions: ${l.length}`
      )
    ]
  };
}
function yw() {
  return wd((n) => ({
    applyEventResult: null,
    snapshotResult: null,
    projectedOutcome: null,
    blockedTransitions: [],
    errors: [],
    log: [],
    setApplyEventWirePayload(i, l) {
      const r = mw(i, l);
      n((s) => ({
        applyEventResult: r.applyEventResult,
        projectedOutcome: r.projectedOutcome,
        log: [...s.log, ...r.log]
      }));
    },
    setSnapshotWirePayload(i) {
      const l = pw(i);
      n((r) => ({
        snapshotResult: l.snapshotResult,
        blockedTransitions: l.blockedTransitions,
        log: [...r.log, ...l.log]
      }));
    },
    pushError(i) {
      n((l) => ({
        errors: [...l.errors, gw(i)],
        log: [...l.log, qs("error", `[${i.code}] ${i.message}`)]
      }));
    },
    pushInfo(i) {
      n((l) => ({
        log: [...l.log, qs("info", i)]
      }));
    },
    clear() {
      n({
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
const xy = "fsm-ui-builder.panel-layout", wy = "fsm-ui-builder.theme";
function Oa(n, i, l) {
  return Number.isNaN(n) ? i : Math.min(Math.max(n, i), l);
}
function Uf() {
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
function au() {
  return typeof window > "u" || typeof window.localStorage > "u" ? !1 : typeof window.localStorage.getItem == "function" && typeof window.localStorage.setItem == "function";
}
function vw() {
  if (!au())
    return Uf();
  const n = window.localStorage.getItem(xy);
  if (!n)
    return Uf();
  try {
    const i = JSON.parse(n);
    return {
      explorerWidth: Oa(i.explorerWidth ?? 240, 180, 400),
      inspectorWidth: Oa(i.inspectorWidth ?? 320, 240, 500),
      consoleHeight: Oa(i.consoleHeight ?? 140, 80, 300),
      explorerCollapsed: !!i.explorerCollapsed,
      inspectorCollapsed: !!i.inspectorCollapsed,
      consoleCollapsed: !!i.consoleCollapsed,
      canvasZoom: Oa(i.canvasZoom ?? 1, 0.25, 2),
      canvasOffsetX: Number.isFinite(i.canvasOffsetX) ? Number(i.canvasOffsetX) : 0,
      canvasOffsetY: Number.isFinite(i.canvasOffsetY) ? Number(i.canvasOffsetY) : 0
    };
  } catch {
    return Uf();
  }
}
function oi(n) {
  au() && window.localStorage.setItem(xy, JSON.stringify(n));
}
function bw() {
  return au() && window.localStorage.getItem(wy) === "dark" ? "dark" : "light";
}
function Hp(n) {
  au() && window.localStorage.setItem(wy, n);
}
function xw() {
  const n = vw(), i = bw();
  return wd((l) => ({
    ...n,
    viewportMode: "desktop",
    mobilePanel: "canvas",
    keyboardHelpOpen: !1,
    theme: i,
    setPanelWidth(r, s) {
      l((c) => {
        const f = {
          ...c,
          explorerWidth: r === "explorer" ? Oa(s, 180, 400) : c.explorerWidth,
          inspectorWidth: r === "inspector" ? Oa(s, 240, 500) : c.inspectorWidth
        };
        return oi(f), f;
      });
    },
    setConsoleHeight(r) {
      l((s) => {
        const c = {
          ...s,
          consoleHeight: Oa(r, 80, 300)
        };
        return oi(c), c;
      });
    },
    setPanelCollapsed(r, s) {
      l((c) => {
        const f = {
          ...c,
          explorerCollapsed: r === "explorer" ? s : c.explorerCollapsed,
          inspectorCollapsed: r === "inspector" ? s : c.inspectorCollapsed,
          consoleCollapsed: r === "console" ? s : c.consoleCollapsed
        };
        return oi(f), f;
      });
    },
    togglePanel(r) {
      l((s) => {
        const c = {
          ...s,
          explorerCollapsed: r === "explorer" ? !s.explorerCollapsed : s.explorerCollapsed,
          inspectorCollapsed: r === "inspector" ? !s.inspectorCollapsed : s.inspectorCollapsed,
          consoleCollapsed: r === "console" ? !s.consoleCollapsed : s.consoleCollapsed
        };
        return oi(c), c;
      });
    },
    setKeyboardHelpOpen(r) {
      l({ keyboardHelpOpen: r });
    },
    toggleKeyboardHelp() {
      l((r) => ({
        keyboardHelpOpen: !r.keyboardHelpOpen
      }));
    },
    zoomCanvas(r) {
      l((s) => {
        const c = {
          ...s,
          canvasZoom: Oa(s.canvasZoom + r, 0.25, 2)
        };
        return oi(c), c;
      });
    },
    panCanvas(r, s) {
      l((c) => {
        const f = {
          ...c,
          canvasOffsetX: c.canvasOffsetX + r,
          canvasOffsetY: c.canvasOffsetY + s
        };
        return oi(f), f;
      });
    },
    resetCanvasView() {
      l((r) => {
        const s = {
          ...r,
          canvasZoom: 1,
          canvasOffsetX: 0,
          canvasOffsetY: 0
        };
        return oi(s), s;
      });
    },
    setViewportMode(r) {
      l({ viewportMode: r });
    },
    setMobilePanel(r) {
      l({ mobilePanel: r });
    },
    setTheme(r) {
      Hp(r), l({ theme: r });
    },
    toggleTheme() {
      l((r) => {
        const s = r.theme === "light" ? "dark" : "light";
        return Hp(s), { theme: s };
      });
    }
  }));
}
const Sy = ee.createContext(null), Ey = ee.createContext(null), _y = ee.createContext(null);
function ww(n) {
  const i = ee.useRef(null), l = ee.useRef(null), r = ee.useRef(null);
  return i.current || (i.current = aw({
    document: n.initialDocument,
    diagnostics: n.initialDiagnostics
  })), l.current || (l.current = xw()), r.current || (r.current = yw()), /* @__PURE__ */ b.jsx(Sy.Provider, { value: i.current, children: /* @__PURE__ */ b.jsx(Ey.Provider, { value: l.current, children: /* @__PURE__ */ b.jsx(_y.Provider, { value: r.current, children: n.children }) }) });
}
function Ed(n, i) {
  if (!n)
    throw new Error(i);
  return n;
}
function be(n) {
  const i = Ed(
    ee.useContext(Sy),
    "Machine store context is missing. Wrap with BuilderStoresProvider."
  );
  return Sd(i, n);
}
function Be(n) {
  const i = Ed(
    ee.useContext(Ey),
    "UI store context is missing. Wrap with BuilderStoresProvider."
  );
  return Sd(i, n);
}
function Ft(n) {
  const i = Ed(
    ee.useContext(_y),
    "Simulation store context is missing. Wrap with BuilderStoresProvider."
  );
  return Sd(i, n);
}
function Sw(n) {
  return n instanceof HTMLElement ? n.isContentEditable ? !0 : n.matches("input, textarea, select") : !1;
}
function Bp(n) {
  return n.kind === "machine" ? "machine" : n.kind === "state" ? `state:${n.stateIndex}` : n.kind === "transition" ? `transition:${n.transitionIndex}` : `workflow:${n.transitionIndex}:${n.nodeIndex}`;
}
function Lp(n, i, l) {
  const r = [{ kind: "machine" }];
  i.states.forEach((h, g) => {
    r.push({ kind: "state", stateIndex: g });
  }), i.transitions.forEach((h, g) => {
    r.push({ kind: "transition", transitionIndex: g }), h.workflow?.nodes?.forEach((m, y) => {
      r.push({ kind: "workflow-node", transitionIndex: g, nodeIndex: y });
    });
  });
  const s = r.findIndex((h) => Bp(h) === Bp(n)), c = s >= 0 ? s : 0, f = Math.min(Math.max(0, c + l), r.length - 1);
  return r[f] ?? { kind: "machine" };
}
function Ew(n) {
  const i = be((p) => p.selection), l = be((p) => p.document.definition), r = be((p) => p.setSelection), s = be((p) => p.undo), c = be((p) => p.redo), f = be((p) => p.addState), h = be((p) => p.addTransition), g = Be((p) => p.zoomCanvas), m = Be((p) => p.resetCanvasView), y = Be((p) => p.panCanvas);
  ee.useEffect(() => {
    const p = (v) => {
      const x = v.metaKey || v.ctrlKey, S = Sw(v.target), C = !!n.readOnly, j = v.key, O = j.toLowerCase();
      if (!!n.keyboardHelpOpen) {
        j === "Escape" && (v.preventDefault(), n.onCloseKeyboardHelp?.());
        return;
      }
      if (x && O === "s") {
        v.preventDefault(), C || n.onSave?.();
        return;
      }
      if (x && j === "Enter") {
        v.preventDefault(), C || n.onValidate?.();
        return;
      }
      if (x && O === "z") {
        if (S)
          return;
        v.preventDefault(), C || (v.shiftKey ? c() : s());
        return;
      }
      if (x && O === "y") {
        if (S)
          return;
        v.preventDefault(), C || c();
        return;
      }
      if (x && j === "1") {
        v.preventDefault(), n.onFocusPanel?.("explorer");
        return;
      }
      if (x && j === "2") {
        v.preventDefault(), n.onFocusPanel?.("canvas");
        return;
      }
      if (x && j === "3") {
        v.preventDefault(), n.onFocusPanel?.("inspector");
        return;
      }
      if (x && j === "`") {
        v.preventDefault(), n.onToggleConsole ? n.onToggleConsole() : n.onFocusPanel?.("console");
        return;
      }
      if (!x && !S && j === "?") {
        v.preventDefault(), n.onToggleKeyboardHelp?.();
        return;
      }
      if (x && (j === "+" || j === "=")) {
        v.preventDefault(), g(0.1);
        return;
      }
      if (x && j === "-") {
        v.preventDefault(), g(-0.1);
        return;
      }
      if (x && j === "0") {
        v.preventDefault(), m();
        return;
      }
      if (v.altKey && !x && j.startsWith("Arrow")) {
        if (v.preventDefault(), j === "ArrowLeft") {
          y(-24, 0);
          return;
        }
        if (j === "ArrowRight") {
          y(24, 0);
          return;
        }
        if (j === "ArrowUp") {
          y(0, -24);
          return;
        }
        j === "ArrowDown" && y(0, 24);
        return;
      }
      if (!x && !S && j === "Escape") {
        v.preventDefault(), r({ kind: "machine" });
        return;
      }
      if (!x && !S && j === "ArrowDown") {
        v.preventDefault(), r(Lp(i, l, 1));
        return;
      }
      if (!x && !S && j === "ArrowUp") {
        v.preventDefault(), r(Lp(i, l, -1));
        return;
      }
      if (!x && !S && !C && O === "n") {
        v.preventDefault(), f();
        return;
      }
      !x && !S && !C && O === "t" && (v.preventDefault(), h());
    };
    return window.addEventListener("keydown", p), () => {
      window.removeEventListener("keydown", p);
    };
  }, [
    f,
    h,
    l,
    n,
    y,
    c,
    m,
    i,
    r,
    s,
    g
  ]);
}
function Vf(n) {
  const i = Be((f) => f.explorerWidth), l = Be((f) => f.inspectorWidth), r = Be((f) => f.consoleHeight), s = Be((f) => f.setPanelWidth), c = Be((f) => f.setConsoleHeight);
  return ee.useCallback(
    (f) => {
      f.preventDefault();
      const h = {
        pointerX: f.clientX,
        pointerY: f.clientY,
        width: n === "explorer" ? i : l,
        height: r
      }, g = (y) => {
        if (n === "console") {
          const v = h.pointerY - y.clientY;
          c(h.height + v);
          return;
        }
        const p = y.clientX - h.pointerX;
        if (n === "explorer") {
          s("explorer", h.width + p);
          return;
        }
        s("inspector", h.width - p);
      }, m = () => {
        window.removeEventListener("pointermove", g), window.removeEventListener("pointerup", m);
      };
      window.addEventListener("pointermove", g), window.addEventListener("pointerup", m);
    },
    [r, i, l, n, c, s]
  );
}
function _w(n) {
  return n < 900 ? "mobile-readonly" : n <= 1200 ? "compact" : "desktop";
}
function Nw() {
  const n = Be((l) => l.viewportMode), i = Be((l) => l.setViewportMode);
  return ee.useEffect(() => {
    const l = () => {
      i(_w(window.innerWidth));
    };
    return l(), window.addEventListener("resize", l), () => {
      window.removeEventListener("resize", l);
    };
  }, [i]), n;
}
function ut(n) {
  if (typeof n == "string" || typeof n == "number") return "" + n;
  let i = "";
  if (Array.isArray(n))
    for (let l = 0, r; l < n.length; l++)
      (r = ut(n[l])) !== "" && (i += (i && " ") + r);
  else
    for (let l in n)
      n[l] && (i += (i && " ") + l);
  return i;
}
var Cw = { value: () => {
} };
function iu() {
  for (var n = 0, i = arguments.length, l = {}, r; n < i; ++n) {
    if (!(r = arguments[n] + "") || r in l || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    l[r] = [];
  }
  return new ks(l);
}
function ks(n) {
  this._ = n;
}
function Mw(n, i) {
  return n.trim().split(/^|\s+/).map(function(l) {
    var r = "", s = l.indexOf(".");
    if (s >= 0 && (r = l.slice(s + 1), l = l.slice(0, s)), l && !i.hasOwnProperty(l)) throw new Error("unknown type: " + l);
    return { type: l, name: r };
  });
}
ks.prototype = iu.prototype = {
  constructor: ks,
  on: function(n, i) {
    var l = this._, r = Mw(n + "", l), s, c = -1, f = r.length;
    if (arguments.length < 2) {
      for (; ++c < f; ) if ((s = (n = r[c]).type) && (s = Tw(l[s], n.name))) return s;
      return;
    }
    if (i != null && typeof i != "function") throw new Error("invalid callback: " + i);
    for (; ++c < f; )
      if (s = (n = r[c]).type) l[s] = Up(l[s], n.name, i);
      else if (i == null) for (s in l) l[s] = Up(l[s], n.name, null);
    return this;
  },
  copy: function() {
    var n = {}, i = this._;
    for (var l in i) n[l] = i[l].slice();
    return new ks(n);
  },
  call: function(n, i) {
    if ((s = arguments.length - 2) > 0) for (var l = new Array(s), r = 0, s, c; r < s; ++r) l[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    for (c = this._[n], r = 0, s = c.length; r < s; ++r) c[r].value.apply(i, l);
  },
  apply: function(n, i, l) {
    if (!this._.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    for (var r = this._[n], s = 0, c = r.length; s < c; ++s) r[s].value.apply(i, l);
  }
};
function Tw(n, i) {
  for (var l = 0, r = n.length, s; l < r; ++l)
    if ((s = n[l]).name === i)
      return s.value;
}
function Up(n, i, l) {
  for (var r = 0, s = n.length; r < s; ++r)
    if (n[r].name === i) {
      n[r] = Cw, n = n.slice(0, r).concat(n.slice(r + 1));
      break;
    }
  return l != null && n.push({ name: i, value: l }), n;
}
var od = "http://www.w3.org/1999/xhtml";
const Vp = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: od,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function ou(n) {
  var i = n += "", l = i.indexOf(":");
  return l >= 0 && (i = n.slice(0, l)) !== "xmlns" && (n = n.slice(l + 1)), Vp.hasOwnProperty(i) ? { space: Vp[i], local: n } : n;
}
function jw(n) {
  return function() {
    var i = this.ownerDocument, l = this.namespaceURI;
    return l === od && i.documentElement.namespaceURI === od ? i.createElement(n) : i.createElementNS(l, n);
  };
}
function Aw(n) {
  return function() {
    return this.ownerDocument.createElementNS(n.space, n.local);
  };
}
function Ny(n) {
  var i = ou(n);
  return (i.local ? Aw : jw)(i);
}
function Dw() {
}
function _d(n) {
  return n == null ? Dw : function() {
    return this.querySelector(n);
  };
}
function Ow(n) {
  typeof n != "function" && (n = _d(n));
  for (var i = this._groups, l = i.length, r = new Array(l), s = 0; s < l; ++s)
    for (var c = i[s], f = c.length, h = r[s] = new Array(f), g, m, y = 0; y < f; ++y)
      (g = c[y]) && (m = n.call(g, g.__data__, y, c)) && ("__data__" in g && (m.__data__ = g.__data__), h[y] = m);
  return new qt(r, this._parents);
}
function zw(n) {
  return n == null ? [] : Array.isArray(n) ? n : Array.from(n);
}
function Rw() {
  return [];
}
function Cy(n) {
  return n == null ? Rw : function() {
    return this.querySelectorAll(n);
  };
}
function kw(n) {
  return function() {
    return zw(n.apply(this, arguments));
  };
}
function Hw(n) {
  typeof n == "function" ? n = kw(n) : n = Cy(n);
  for (var i = this._groups, l = i.length, r = [], s = [], c = 0; c < l; ++c)
    for (var f = i[c], h = f.length, g, m = 0; m < h; ++m)
      (g = f[m]) && (r.push(n.call(g, g.__data__, m, f)), s.push(g));
  return new qt(r, s);
}
function My(n) {
  return function() {
    return this.matches(n);
  };
}
function Ty(n) {
  return function(i) {
    return i.matches(n);
  };
}
var Bw = Array.prototype.find;
function Lw(n) {
  return function() {
    return Bw.call(this.children, n);
  };
}
function Uw() {
  return this.firstElementChild;
}
function Vw(n) {
  return this.select(n == null ? Uw : Lw(typeof n == "function" ? n : Ty(n)));
}
var Yw = Array.prototype.filter;
function Iw() {
  return Array.from(this.children);
}
function qw(n) {
  return function() {
    return Yw.call(this.children, n);
  };
}
function Xw(n) {
  return this.selectAll(n == null ? Iw : qw(typeof n == "function" ? n : Ty(n)));
}
function Gw(n) {
  typeof n != "function" && (n = My(n));
  for (var i = this._groups, l = i.length, r = new Array(l), s = 0; s < l; ++s)
    for (var c = i[s], f = c.length, h = r[s] = [], g, m = 0; m < f; ++m)
      (g = c[m]) && n.call(g, g.__data__, m, c) && h.push(g);
  return new qt(r, this._parents);
}
function jy(n) {
  return new Array(n.length);
}
function $w() {
  return new qt(this._enter || this._groups.map(jy), this._parents);
}
function Xs(n, i) {
  this.ownerDocument = n.ownerDocument, this.namespaceURI = n.namespaceURI, this._next = null, this._parent = n, this.__data__ = i;
}
Xs.prototype = {
  constructor: Xs,
  appendChild: function(n) {
    return this._parent.insertBefore(n, this._next);
  },
  insertBefore: function(n, i) {
    return this._parent.insertBefore(n, i);
  },
  querySelector: function(n) {
    return this._parent.querySelector(n);
  },
  querySelectorAll: function(n) {
    return this._parent.querySelectorAll(n);
  }
};
function Zw(n) {
  return function() {
    return n;
  };
}
function Qw(n, i, l, r, s, c) {
  for (var f = 0, h, g = i.length, m = c.length; f < m; ++f)
    (h = i[f]) ? (h.__data__ = c[f], r[f] = h) : l[f] = new Xs(n, c[f]);
  for (; f < g; ++f)
    (h = i[f]) && (s[f] = h);
}
function Kw(n, i, l, r, s, c, f) {
  var h, g, m = /* @__PURE__ */ new Map(), y = i.length, p = c.length, v = new Array(y), x;
  for (h = 0; h < y; ++h)
    (g = i[h]) && (v[h] = x = f.call(g, g.__data__, h, i) + "", m.has(x) ? s[h] = g : m.set(x, g));
  for (h = 0; h < p; ++h)
    x = f.call(n, c[h], h, c) + "", (g = m.get(x)) ? (r[h] = g, g.__data__ = c[h], m.delete(x)) : l[h] = new Xs(n, c[h]);
  for (h = 0; h < y; ++h)
    (g = i[h]) && m.get(v[h]) === g && (s[h] = g);
}
function Jw(n) {
  return n.__data__;
}
function Ww(n, i) {
  if (!arguments.length) return Array.from(this, Jw);
  var l = i ? Kw : Qw, r = this._parents, s = this._groups;
  typeof n != "function" && (n = Zw(n));
  for (var c = s.length, f = new Array(c), h = new Array(c), g = new Array(c), m = 0; m < c; ++m) {
    var y = r[m], p = s[m], v = p.length, x = Fw(n.call(y, y && y.__data__, m, r)), S = x.length, C = h[m] = new Array(S), j = f[m] = new Array(S), O = g[m] = new Array(v);
    l(y, p, C, j, O, x, i);
    for (var D = 0, E = 0, N, k; D < S; ++D)
      if (N = C[D]) {
        for (D >= E && (E = D + 1); !(k = j[E]) && ++E < S; ) ;
        N._next = k || null;
      }
  }
  return f = new qt(f, r), f._enter = h, f._exit = g, f;
}
function Fw(n) {
  return typeof n == "object" && "length" in n ? n : Array.from(n);
}
function Pw() {
  return new qt(this._exit || this._groups.map(jy), this._parents);
}
function eS(n, i, l) {
  var r = this.enter(), s = this, c = this.exit();
  return typeof n == "function" ? (r = n(r), r && (r = r.selection())) : r = r.append(n + ""), i != null && (s = i(s), s && (s = s.selection())), l == null ? c.remove() : l(c), r && s ? r.merge(s).order() : s;
}
function tS(n) {
  for (var i = n.selection ? n.selection() : n, l = this._groups, r = i._groups, s = l.length, c = r.length, f = Math.min(s, c), h = new Array(s), g = 0; g < f; ++g)
    for (var m = l[g], y = r[g], p = m.length, v = h[g] = new Array(p), x, S = 0; S < p; ++S)
      (x = m[S] || y[S]) && (v[S] = x);
  for (; g < s; ++g)
    h[g] = l[g];
  return new qt(h, this._parents);
}
function nS() {
  for (var n = this._groups, i = -1, l = n.length; ++i < l; )
    for (var r = n[i], s = r.length - 1, c = r[s], f; --s >= 0; )
      (f = r[s]) && (c && f.compareDocumentPosition(c) ^ 4 && c.parentNode.insertBefore(f, c), c = f);
  return this;
}
function aS(n) {
  n || (n = iS);
  function i(p, v) {
    return p && v ? n(p.__data__, v.__data__) : !p - !v;
  }
  for (var l = this._groups, r = l.length, s = new Array(r), c = 0; c < r; ++c) {
    for (var f = l[c], h = f.length, g = s[c] = new Array(h), m, y = 0; y < h; ++y)
      (m = f[y]) && (g[y] = m);
    g.sort(i);
  }
  return new qt(s, this._parents).order();
}
function iS(n, i) {
  return n < i ? -1 : n > i ? 1 : n >= i ? 0 : NaN;
}
function oS() {
  var n = arguments[0];
  return arguments[0] = this, n.apply(null, arguments), this;
}
function lS() {
  return Array.from(this);
}
function rS() {
  for (var n = this._groups, i = 0, l = n.length; i < l; ++i)
    for (var r = n[i], s = 0, c = r.length; s < c; ++s) {
      var f = r[s];
      if (f) return f;
    }
  return null;
}
function sS() {
  let n = 0;
  for (const i of this) ++n;
  return n;
}
function uS() {
  return !this.node();
}
function cS(n) {
  for (var i = this._groups, l = 0, r = i.length; l < r; ++l)
    for (var s = i[l], c = 0, f = s.length, h; c < f; ++c)
      (h = s[c]) && n.call(h, h.__data__, c, s);
  return this;
}
function fS(n) {
  return function() {
    this.removeAttribute(n);
  };
}
function dS(n) {
  return function() {
    this.removeAttributeNS(n.space, n.local);
  };
}
function hS(n, i) {
  return function() {
    this.setAttribute(n, i);
  };
}
function gS(n, i) {
  return function() {
    this.setAttributeNS(n.space, n.local, i);
  };
}
function mS(n, i) {
  return function() {
    var l = i.apply(this, arguments);
    l == null ? this.removeAttribute(n) : this.setAttribute(n, l);
  };
}
function pS(n, i) {
  return function() {
    var l = i.apply(this, arguments);
    l == null ? this.removeAttributeNS(n.space, n.local) : this.setAttributeNS(n.space, n.local, l);
  };
}
function yS(n, i) {
  var l = ou(n);
  if (arguments.length < 2) {
    var r = this.node();
    return l.local ? r.getAttributeNS(l.space, l.local) : r.getAttribute(l);
  }
  return this.each((i == null ? l.local ? dS : fS : typeof i == "function" ? l.local ? pS : mS : l.local ? gS : hS)(l, i));
}
function Ay(n) {
  return n.ownerDocument && n.ownerDocument.defaultView || n.document && n || n.defaultView;
}
function vS(n) {
  return function() {
    this.style.removeProperty(n);
  };
}
function bS(n, i, l) {
  return function() {
    this.style.setProperty(n, i, l);
  };
}
function xS(n, i, l) {
  return function() {
    var r = i.apply(this, arguments);
    r == null ? this.style.removeProperty(n) : this.style.setProperty(n, r, l);
  };
}
function wS(n, i, l) {
  return arguments.length > 1 ? this.each((i == null ? vS : typeof i == "function" ? xS : bS)(n, i, l ?? "")) : fo(this.node(), n);
}
function fo(n, i) {
  return n.style.getPropertyValue(i) || Ay(n).getComputedStyle(n, null).getPropertyValue(i);
}
function SS(n) {
  return function() {
    delete this[n];
  };
}
function ES(n, i) {
  return function() {
    this[n] = i;
  };
}
function _S(n, i) {
  return function() {
    var l = i.apply(this, arguments);
    l == null ? delete this[n] : this[n] = l;
  };
}
function NS(n, i) {
  return arguments.length > 1 ? this.each((i == null ? SS : typeof i == "function" ? _S : ES)(n, i)) : this.node()[n];
}
function Dy(n) {
  return n.trim().split(/^|\s+/);
}
function Nd(n) {
  return n.classList || new Oy(n);
}
function Oy(n) {
  this._node = n, this._names = Dy(n.getAttribute("class") || "");
}
Oy.prototype = {
  add: function(n) {
    var i = this._names.indexOf(n);
    i < 0 && (this._names.push(n), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(n) {
    var i = this._names.indexOf(n);
    i >= 0 && (this._names.splice(i, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(n) {
    return this._names.indexOf(n) >= 0;
  }
};
function zy(n, i) {
  for (var l = Nd(n), r = -1, s = i.length; ++r < s; ) l.add(i[r]);
}
function Ry(n, i) {
  for (var l = Nd(n), r = -1, s = i.length; ++r < s; ) l.remove(i[r]);
}
function CS(n) {
  return function() {
    zy(this, n);
  };
}
function MS(n) {
  return function() {
    Ry(this, n);
  };
}
function TS(n, i) {
  return function() {
    (i.apply(this, arguments) ? zy : Ry)(this, n);
  };
}
function jS(n, i) {
  var l = Dy(n + "");
  if (arguments.length < 2) {
    for (var r = Nd(this.node()), s = -1, c = l.length; ++s < c; ) if (!r.contains(l[s])) return !1;
    return !0;
  }
  return this.each((typeof i == "function" ? TS : i ? CS : MS)(l, i));
}
function AS() {
  this.textContent = "";
}
function DS(n) {
  return function() {
    this.textContent = n;
  };
}
function OS(n) {
  return function() {
    var i = n.apply(this, arguments);
    this.textContent = i ?? "";
  };
}
function zS(n) {
  return arguments.length ? this.each(n == null ? AS : (typeof n == "function" ? OS : DS)(n)) : this.node().textContent;
}
function RS() {
  this.innerHTML = "";
}
function kS(n) {
  return function() {
    this.innerHTML = n;
  };
}
function HS(n) {
  return function() {
    var i = n.apply(this, arguments);
    this.innerHTML = i ?? "";
  };
}
function BS(n) {
  return arguments.length ? this.each(n == null ? RS : (typeof n == "function" ? HS : kS)(n)) : this.node().innerHTML;
}
function LS() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function US() {
  return this.each(LS);
}
function VS() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function YS() {
  return this.each(VS);
}
function IS(n) {
  var i = typeof n == "function" ? n : Ny(n);
  return this.select(function() {
    return this.appendChild(i.apply(this, arguments));
  });
}
function qS() {
  return null;
}
function XS(n, i) {
  var l = typeof n == "function" ? n : Ny(n), r = i == null ? qS : typeof i == "function" ? i : _d(i);
  return this.select(function() {
    return this.insertBefore(l.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function GS() {
  var n = this.parentNode;
  n && n.removeChild(this);
}
function $S() {
  return this.each(GS);
}
function ZS() {
  var n = this.cloneNode(!1), i = this.parentNode;
  return i ? i.insertBefore(n, this.nextSibling) : n;
}
function QS() {
  var n = this.cloneNode(!0), i = this.parentNode;
  return i ? i.insertBefore(n, this.nextSibling) : n;
}
function KS(n) {
  return this.select(n ? QS : ZS);
}
function JS(n) {
  return arguments.length ? this.property("__data__", n) : this.node().__data__;
}
function WS(n) {
  return function(i) {
    n.call(this, i, this.__data__);
  };
}
function FS(n) {
  return n.trim().split(/^|\s+/).map(function(i) {
    var l = "", r = i.indexOf(".");
    return r >= 0 && (l = i.slice(r + 1), i = i.slice(0, r)), { type: i, name: l };
  });
}
function PS(n) {
  return function() {
    var i = this.__on;
    if (i) {
      for (var l = 0, r = -1, s = i.length, c; l < s; ++l)
        c = i[l], (!n.type || c.type === n.type) && c.name === n.name ? this.removeEventListener(c.type, c.listener, c.options) : i[++r] = c;
      ++r ? i.length = r : delete this.__on;
    }
  };
}
function eE(n, i, l) {
  return function() {
    var r = this.__on, s, c = WS(i);
    if (r) {
      for (var f = 0, h = r.length; f < h; ++f)
        if ((s = r[f]).type === n.type && s.name === n.name) {
          this.removeEventListener(s.type, s.listener, s.options), this.addEventListener(s.type, s.listener = c, s.options = l), s.value = i;
          return;
        }
    }
    this.addEventListener(n.type, c, l), s = { type: n.type, name: n.name, value: i, listener: c, options: l }, r ? r.push(s) : this.__on = [s];
  };
}
function tE(n, i, l) {
  var r = FS(n + ""), s, c = r.length, f;
  if (arguments.length < 2) {
    var h = this.node().__on;
    if (h) {
      for (var g = 0, m = h.length, y; g < m; ++g)
        for (s = 0, y = h[g]; s < c; ++s)
          if ((f = r[s]).type === y.type && f.name === y.name)
            return y.value;
    }
    return;
  }
  for (h = i ? eE : PS, s = 0; s < c; ++s) this.each(h(r[s], i, l));
  return this;
}
function ky(n, i, l) {
  var r = Ay(n), s = r.CustomEvent;
  typeof s == "function" ? s = new s(i, l) : (s = r.document.createEvent("Event"), l ? (s.initEvent(i, l.bubbles, l.cancelable), s.detail = l.detail) : s.initEvent(i, !1, !1)), n.dispatchEvent(s);
}
function nE(n, i) {
  return function() {
    return ky(this, n, i);
  };
}
function aE(n, i) {
  return function() {
    return ky(this, n, i.apply(this, arguments));
  };
}
function iE(n, i) {
  return this.each((typeof i == "function" ? aE : nE)(n, i));
}
function* oE() {
  for (var n = this._groups, i = 0, l = n.length; i < l; ++i)
    for (var r = n[i], s = 0, c = r.length, f; s < c; ++s)
      (f = r[s]) && (yield f);
}
var Hy = [null];
function qt(n, i) {
  this._groups = n, this._parents = i;
}
function Yl() {
  return new qt([[document.documentElement]], Hy);
}
function lE() {
  return this;
}
qt.prototype = Yl.prototype = {
  constructor: qt,
  select: Ow,
  selectAll: Hw,
  selectChild: Vw,
  selectChildren: Xw,
  filter: Gw,
  data: Ww,
  enter: $w,
  exit: Pw,
  join: eS,
  merge: tS,
  selection: lE,
  order: nS,
  sort: aS,
  call: oS,
  nodes: lS,
  node: rS,
  size: sS,
  empty: uS,
  each: cS,
  attr: yS,
  style: wS,
  property: NS,
  classed: jS,
  text: zS,
  html: BS,
  raise: US,
  lower: YS,
  append: IS,
  insert: XS,
  remove: $S,
  clone: KS,
  datum: JS,
  on: tE,
  dispatch: iE,
  [Symbol.iterator]: oE
};
function It(n) {
  return typeof n == "string" ? new qt([[document.querySelector(n)]], [document.documentElement]) : new qt([[n]], Hy);
}
function rE(n) {
  let i;
  for (; i = n.sourceEvent; ) n = i;
  return n;
}
function ln(n, i) {
  if (n = rE(n), i === void 0 && (i = n.currentTarget), i) {
    var l = i.ownerSVGElement || i;
    if (l.createSVGPoint) {
      var r = l.createSVGPoint();
      return r.x = n.clientX, r.y = n.clientY, r = r.matrixTransform(i.getScreenCTM().inverse()), [r.x, r.y];
    }
    if (i.getBoundingClientRect) {
      var s = i.getBoundingClientRect();
      return [n.clientX - s.left - i.clientLeft, n.clientY - s.top - i.clientTop];
    }
  }
  return [n.pageX, n.pageY];
}
const sE = { passive: !1 }, Al = { capture: !0, passive: !1 };
function Yf(n) {
  n.stopImmediatePropagation();
}
function uo(n) {
  n.preventDefault(), n.stopImmediatePropagation();
}
function By(n) {
  var i = n.document.documentElement, l = It(n).on("dragstart.drag", uo, Al);
  "onselectstart" in i ? l.on("selectstart.drag", uo, Al) : (i.__noselect = i.style.MozUserSelect, i.style.MozUserSelect = "none");
}
function Ly(n, i) {
  var l = n.document.documentElement, r = It(n).on("dragstart.drag", null);
  i && (r.on("click.drag", uo, Al), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in l ? r.on("selectstart.drag", null) : (l.style.MozUserSelect = l.__noselect, delete l.__noselect);
}
const Ss = (n) => () => n;
function ld(n, {
  sourceEvent: i,
  subject: l,
  target: r,
  identifier: s,
  active: c,
  x: f,
  y: h,
  dx: g,
  dy: m,
  dispatch: y
}) {
  Object.defineProperties(this, {
    type: { value: n, enumerable: !0, configurable: !0 },
    sourceEvent: { value: i, enumerable: !0, configurable: !0 },
    subject: { value: l, enumerable: !0, configurable: !0 },
    target: { value: r, enumerable: !0, configurable: !0 },
    identifier: { value: s, enumerable: !0, configurable: !0 },
    active: { value: c, enumerable: !0, configurable: !0 },
    x: { value: f, enumerable: !0, configurable: !0 },
    y: { value: h, enumerable: !0, configurable: !0 },
    dx: { value: g, enumerable: !0, configurable: !0 },
    dy: { value: m, enumerable: !0, configurable: !0 },
    _: { value: y }
  });
}
ld.prototype.on = function() {
  var n = this._.on.apply(this._, arguments);
  return n === this._ ? this : n;
};
function uE(n) {
  return !n.ctrlKey && !n.button;
}
function cE() {
  return this.parentNode;
}
function fE(n, i) {
  return i ?? { x: n.x, y: n.y };
}
function dE() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Uy() {
  var n = uE, i = cE, l = fE, r = dE, s = {}, c = iu("start", "drag", "end"), f = 0, h, g, m, y, p = 0;
  function v(N) {
    N.on("mousedown.drag", x).filter(r).on("touchstart.drag", j).on("touchmove.drag", O, sE).on("touchend.drag touchcancel.drag", D).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function x(N, k) {
    if (!(y || !n.call(this, N, k))) {
      var U = E(this, i.call(this, N, k), N, k, "mouse");
      U && (It(N.view).on("mousemove.drag", S, Al).on("mouseup.drag", C, Al), By(N.view), Yf(N), m = !1, h = N.clientX, g = N.clientY, U("start", N));
    }
  }
  function S(N) {
    if (uo(N), !m) {
      var k = N.clientX - h, U = N.clientY - g;
      m = k * k + U * U > p;
    }
    s.mouse("drag", N);
  }
  function C(N) {
    It(N.view).on("mousemove.drag mouseup.drag", null), Ly(N.view, m), uo(N), s.mouse("end", N);
  }
  function j(N, k) {
    if (n.call(this, N, k)) {
      var U = N.changedTouches, V = i.call(this, N, k), X = U.length, te, K;
      for (te = 0; te < X; ++te)
        (K = E(this, V, N, k, U[te].identifier, U[te])) && (Yf(N), K("start", N, U[te]));
    }
  }
  function O(N) {
    var k = N.changedTouches, U = k.length, V, X;
    for (V = 0; V < U; ++V)
      (X = s[k[V].identifier]) && (uo(N), X("drag", N, k[V]));
  }
  function D(N) {
    var k = N.changedTouches, U = k.length, V, X;
    for (y && clearTimeout(y), y = setTimeout(function() {
      y = null;
    }, 500), V = 0; V < U; ++V)
      (X = s[k[V].identifier]) && (Yf(N), X("end", N, k[V]));
  }
  function E(N, k, U, V, X, te) {
    var K = c.copy(), Y = ln(te || U, k), Z, J, M;
    if ((M = l.call(N, new ld("beforestart", {
      sourceEvent: U,
      target: v,
      identifier: X,
      active: f,
      x: Y[0],
      y: Y[1],
      dx: 0,
      dy: 0,
      dispatch: K
    }), V)) != null)
      return Z = M.x - Y[0] || 0, J = M.y - Y[1] || 0, function L(_, z, B) {
        var $ = Y, F;
        switch (_) {
          case "start":
            s[X] = L, F = f++;
            break;
          case "end":
            delete s[X], --f;
          // falls through
          case "drag":
            Y = ln(B || z, k), F = f;
            break;
        }
        K.call(
          _,
          N,
          new ld(_, {
            sourceEvent: z,
            subject: M,
            target: v,
            identifier: X,
            active: F,
            x: Y[0] + Z,
            y: Y[1] + J,
            dx: Y[0] - $[0],
            dy: Y[1] - $[1],
            dispatch: K
          }),
          V
        );
      };
  }
  return v.filter = function(N) {
    return arguments.length ? (n = typeof N == "function" ? N : Ss(!!N), v) : n;
  }, v.container = function(N) {
    return arguments.length ? (i = typeof N == "function" ? N : Ss(N), v) : i;
  }, v.subject = function(N) {
    return arguments.length ? (l = typeof N == "function" ? N : Ss(N), v) : l;
  }, v.touchable = function(N) {
    return arguments.length ? (r = typeof N == "function" ? N : Ss(!!N), v) : r;
  }, v.on = function() {
    var N = c.on.apply(c, arguments);
    return N === c ? v : N;
  }, v.clickDistance = function(N) {
    return arguments.length ? (p = (N = +N) * N, v) : Math.sqrt(p);
  }, v;
}
function Cd(n, i, l) {
  n.prototype = i.prototype = l, l.constructor = n;
}
function Vy(n, i) {
  var l = Object.create(n.prototype);
  for (var r in i) l[r] = i[r];
  return l;
}
function Il() {
}
var Dl = 0.7, Gs = 1 / Dl, co = "\\s*([+-]?\\d+)\\s*", Ol = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", xn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", hE = /^#([0-9a-f]{3,8})$/, gE = new RegExp(`^rgb\\(${co},${co},${co}\\)$`), mE = new RegExp(`^rgb\\(${xn},${xn},${xn}\\)$`), pE = new RegExp(`^rgba\\(${co},${co},${co},${Ol}\\)$`), yE = new RegExp(`^rgba\\(${xn},${xn},${xn},${Ol}\\)$`), vE = new RegExp(`^hsl\\(${Ol},${xn},${xn}\\)$`), bE = new RegExp(`^hsla\\(${Ol},${xn},${xn},${Ol}\\)$`), Yp = {
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
Cd(Il, di, {
  copy(n) {
    return Object.assign(new this.constructor(), this, n);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Ip,
  // Deprecated! Use color.formatHex.
  formatHex: Ip,
  formatHex8: xE,
  formatHsl: wE,
  formatRgb: qp,
  toString: qp
});
function Ip() {
  return this.rgb().formatHex();
}
function xE() {
  return this.rgb().formatHex8();
}
function wE() {
  return Yy(this).formatHsl();
}
function qp() {
  return this.rgb().formatRgb();
}
function di(n) {
  var i, l;
  return n = (n + "").trim().toLowerCase(), (i = hE.exec(n)) ? (l = i[1].length, i = parseInt(i[1], 16), l === 6 ? Xp(i) : l === 3 ? new Ot(i >> 8 & 15 | i >> 4 & 240, i >> 4 & 15 | i & 240, (i & 15) << 4 | i & 15, 1) : l === 8 ? Es(i >> 24 & 255, i >> 16 & 255, i >> 8 & 255, (i & 255) / 255) : l === 4 ? Es(i >> 12 & 15 | i >> 8 & 240, i >> 8 & 15 | i >> 4 & 240, i >> 4 & 15 | i & 240, ((i & 15) << 4 | i & 15) / 255) : null) : (i = gE.exec(n)) ? new Ot(i[1], i[2], i[3], 1) : (i = mE.exec(n)) ? new Ot(i[1] * 255 / 100, i[2] * 255 / 100, i[3] * 255 / 100, 1) : (i = pE.exec(n)) ? Es(i[1], i[2], i[3], i[4]) : (i = yE.exec(n)) ? Es(i[1] * 255 / 100, i[2] * 255 / 100, i[3] * 255 / 100, i[4]) : (i = vE.exec(n)) ? Zp(i[1], i[2] / 100, i[3] / 100, 1) : (i = bE.exec(n)) ? Zp(i[1], i[2] / 100, i[3] / 100, i[4]) : Yp.hasOwnProperty(n) ? Xp(Yp[n]) : n === "transparent" ? new Ot(NaN, NaN, NaN, 0) : null;
}
function Xp(n) {
  return new Ot(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function Es(n, i, l, r) {
  return r <= 0 && (n = i = l = NaN), new Ot(n, i, l, r);
}
function SE(n) {
  return n instanceof Il || (n = di(n)), n ? (n = n.rgb(), new Ot(n.r, n.g, n.b, n.opacity)) : new Ot();
}
function rd(n, i, l, r) {
  return arguments.length === 1 ? SE(n) : new Ot(n, i, l, r ?? 1);
}
function Ot(n, i, l, r) {
  this.r = +n, this.g = +i, this.b = +l, this.opacity = +r;
}
Cd(Ot, rd, Vy(Il, {
  brighter(n) {
    return n = n == null ? Gs : Math.pow(Gs, n), new Ot(this.r * n, this.g * n, this.b * n, this.opacity);
  },
  darker(n) {
    return n = n == null ? Dl : Math.pow(Dl, n), new Ot(this.r * n, this.g * n, this.b * n, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Ot(ci(this.r), ci(this.g), ci(this.b), $s(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Gp,
  // Deprecated! Use color.formatHex.
  formatHex: Gp,
  formatHex8: EE,
  formatRgb: $p,
  toString: $p
}));
function Gp() {
  return `#${si(this.r)}${si(this.g)}${si(this.b)}`;
}
function EE() {
  return `#${si(this.r)}${si(this.g)}${si(this.b)}${si((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function $p() {
  const n = $s(this.opacity);
  return `${n === 1 ? "rgb(" : "rgba("}${ci(this.r)}, ${ci(this.g)}, ${ci(this.b)}${n === 1 ? ")" : `, ${n})`}`;
}
function $s(n) {
  return isNaN(n) ? 1 : Math.max(0, Math.min(1, n));
}
function ci(n) {
  return Math.max(0, Math.min(255, Math.round(n) || 0));
}
function si(n) {
  return n = ci(n), (n < 16 ? "0" : "") + n.toString(16);
}
function Zp(n, i, l, r) {
  return r <= 0 ? n = i = l = NaN : l <= 0 || l >= 1 ? n = i = NaN : i <= 0 && (n = NaN), new rn(n, i, l, r);
}
function Yy(n) {
  if (n instanceof rn) return new rn(n.h, n.s, n.l, n.opacity);
  if (n instanceof Il || (n = di(n)), !n) return new rn();
  if (n instanceof rn) return n;
  n = n.rgb();
  var i = n.r / 255, l = n.g / 255, r = n.b / 255, s = Math.min(i, l, r), c = Math.max(i, l, r), f = NaN, h = c - s, g = (c + s) / 2;
  return h ? (i === c ? f = (l - r) / h + (l < r) * 6 : l === c ? f = (r - i) / h + 2 : f = (i - l) / h + 4, h /= g < 0.5 ? c + s : 2 - c - s, f *= 60) : h = g > 0 && g < 1 ? 0 : f, new rn(f, h, g, n.opacity);
}
function _E(n, i, l, r) {
  return arguments.length === 1 ? Yy(n) : new rn(n, i, l, r ?? 1);
}
function rn(n, i, l, r) {
  this.h = +n, this.s = +i, this.l = +l, this.opacity = +r;
}
Cd(rn, _E, Vy(Il, {
  brighter(n) {
    return n = n == null ? Gs : Math.pow(Gs, n), new rn(this.h, this.s, this.l * n, this.opacity);
  },
  darker(n) {
    return n = n == null ? Dl : Math.pow(Dl, n), new rn(this.h, this.s, this.l * n, this.opacity);
  },
  rgb() {
    var n = this.h % 360 + (this.h < 0) * 360, i = isNaN(n) || isNaN(this.s) ? 0 : this.s, l = this.l, r = l + (l < 0.5 ? l : 1 - l) * i, s = 2 * l - r;
    return new Ot(
      If(n >= 240 ? n - 240 : n + 120, s, r),
      If(n, s, r),
      If(n < 120 ? n + 240 : n - 120, s, r),
      this.opacity
    );
  },
  clamp() {
    return new rn(Qp(this.h), _s(this.s), _s(this.l), $s(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const n = $s(this.opacity);
    return `${n === 1 ? "hsl(" : "hsla("}${Qp(this.h)}, ${_s(this.s) * 100}%, ${_s(this.l) * 100}%${n === 1 ? ")" : `, ${n})`}`;
  }
}));
function Qp(n) {
  return n = (n || 0) % 360, n < 0 ? n + 360 : n;
}
function _s(n) {
  return Math.max(0, Math.min(1, n || 0));
}
function If(n, i, l) {
  return (n < 60 ? i + (l - i) * n / 60 : n < 180 ? l : n < 240 ? i + (l - i) * (240 - n) / 60 : i) * 255;
}
const Md = (n) => () => n;
function NE(n, i) {
  return function(l) {
    return n + l * i;
  };
}
function CE(n, i, l) {
  return n = Math.pow(n, l), i = Math.pow(i, l) - n, l = 1 / l, function(r) {
    return Math.pow(n + r * i, l);
  };
}
function ME(n) {
  return (n = +n) == 1 ? Iy : function(i, l) {
    return l - i ? CE(i, l, n) : Md(isNaN(i) ? l : i);
  };
}
function Iy(n, i) {
  var l = i - n;
  return l ? NE(n, l) : Md(isNaN(n) ? i : n);
}
const Zs = (function n(i) {
  var l = ME(i);
  function r(s, c) {
    var f = l((s = rd(s)).r, (c = rd(c)).r), h = l(s.g, c.g), g = l(s.b, c.b), m = Iy(s.opacity, c.opacity);
    return function(y) {
      return s.r = f(y), s.g = h(y), s.b = g(y), s.opacity = m(y), s + "";
    };
  }
  return r.gamma = n, r;
})(1);
function TE(n, i) {
  i || (i = []);
  var l = n ? Math.min(i.length, n.length) : 0, r = i.slice(), s;
  return function(c) {
    for (s = 0; s < l; ++s) r[s] = n[s] * (1 - c) + i[s] * c;
    return r;
  };
}
function jE(n) {
  return ArrayBuffer.isView(n) && !(n instanceof DataView);
}
function AE(n, i) {
  var l = i ? i.length : 0, r = n ? Math.min(l, n.length) : 0, s = new Array(r), c = new Array(l), f;
  for (f = 0; f < r; ++f) s[f] = Cl(n[f], i[f]);
  for (; f < l; ++f) c[f] = i[f];
  return function(h) {
    for (f = 0; f < r; ++f) c[f] = s[f](h);
    return c;
  };
}
function DE(n, i) {
  var l = /* @__PURE__ */ new Date();
  return n = +n, i = +i, function(r) {
    return l.setTime(n * (1 - r) + i * r), l;
  };
}
function bn(n, i) {
  return n = +n, i = +i, function(l) {
    return n * (1 - l) + i * l;
  };
}
function OE(n, i) {
  var l = {}, r = {}, s;
  (n === null || typeof n != "object") && (n = {}), (i === null || typeof i != "object") && (i = {});
  for (s in i)
    s in n ? l[s] = Cl(n[s], i[s]) : r[s] = i[s];
  return function(c) {
    for (s in l) r[s] = l[s](c);
    return r;
  };
}
var sd = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, qf = new RegExp(sd.source, "g");
function zE(n) {
  return function() {
    return n;
  };
}
function RE(n) {
  return function(i) {
    return n(i) + "";
  };
}
function qy(n, i) {
  var l = sd.lastIndex = qf.lastIndex = 0, r, s, c, f = -1, h = [], g = [];
  for (n = n + "", i = i + ""; (r = sd.exec(n)) && (s = qf.exec(i)); )
    (c = s.index) > l && (c = i.slice(l, c), h[f] ? h[f] += c : h[++f] = c), (r = r[0]) === (s = s[0]) ? h[f] ? h[f] += s : h[++f] = s : (h[++f] = null, g.push({ i: f, x: bn(r, s) })), l = qf.lastIndex;
  return l < i.length && (c = i.slice(l), h[f] ? h[f] += c : h[++f] = c), h.length < 2 ? g[0] ? RE(g[0].x) : zE(i) : (i = g.length, function(m) {
    for (var y = 0, p; y < i; ++y) h[(p = g[y]).i] = p.x(m);
    return h.join("");
  });
}
function Cl(n, i) {
  var l = typeof i, r;
  return i == null || l === "boolean" ? Md(i) : (l === "number" ? bn : l === "string" ? (r = di(i)) ? (i = r, Zs) : qy : i instanceof di ? Zs : i instanceof Date ? DE : jE(i) ? TE : Array.isArray(i) ? AE : typeof i.valueOf != "function" && typeof i.toString != "function" || isNaN(i) ? OE : bn)(n, i);
}
var Kp = 180 / Math.PI, ud = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Xy(n, i, l, r, s, c) {
  var f, h, g;
  return (f = Math.sqrt(n * n + i * i)) && (n /= f, i /= f), (g = n * l + i * r) && (l -= n * g, r -= i * g), (h = Math.sqrt(l * l + r * r)) && (l /= h, r /= h, g /= h), n * r < i * l && (n = -n, i = -i, g = -g, f = -f), {
    translateX: s,
    translateY: c,
    rotate: Math.atan2(i, n) * Kp,
    skewX: Math.atan(g) * Kp,
    scaleX: f,
    scaleY: h
  };
}
var Ns;
function kE(n) {
  const i = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(n + "");
  return i.isIdentity ? ud : Xy(i.a, i.b, i.c, i.d, i.e, i.f);
}
function HE(n) {
  return n == null || (Ns || (Ns = document.createElementNS("http://www.w3.org/2000/svg", "g")), Ns.setAttribute("transform", n), !(n = Ns.transform.baseVal.consolidate())) ? ud : (n = n.matrix, Xy(n.a, n.b, n.c, n.d, n.e, n.f));
}
function Gy(n, i, l, r) {
  function s(m) {
    return m.length ? m.pop() + " " : "";
  }
  function c(m, y, p, v, x, S) {
    if (m !== p || y !== v) {
      var C = x.push("translate(", null, i, null, l);
      S.push({ i: C - 4, x: bn(m, p) }, { i: C - 2, x: bn(y, v) });
    } else (p || v) && x.push("translate(" + p + i + v + l);
  }
  function f(m, y, p, v) {
    m !== y ? (m - y > 180 ? y += 360 : y - m > 180 && (m += 360), v.push({ i: p.push(s(p) + "rotate(", null, r) - 2, x: bn(m, y) })) : y && p.push(s(p) + "rotate(" + y + r);
  }
  function h(m, y, p, v) {
    m !== y ? v.push({ i: p.push(s(p) + "skewX(", null, r) - 2, x: bn(m, y) }) : y && p.push(s(p) + "skewX(" + y + r);
  }
  function g(m, y, p, v, x, S) {
    if (m !== p || y !== v) {
      var C = x.push(s(x) + "scale(", null, ",", null, ")");
      S.push({ i: C - 4, x: bn(m, p) }, { i: C - 2, x: bn(y, v) });
    } else (p !== 1 || v !== 1) && x.push(s(x) + "scale(" + p + "," + v + ")");
  }
  return function(m, y) {
    var p = [], v = [];
    return m = n(m), y = n(y), c(m.translateX, m.translateY, y.translateX, y.translateY, p, v), f(m.rotate, y.rotate, p, v), h(m.skewX, y.skewX, p, v), g(m.scaleX, m.scaleY, y.scaleX, y.scaleY, p, v), m = y = null, function(x) {
      for (var S = -1, C = v.length, j; ++S < C; ) p[(j = v[S]).i] = j.x(x);
      return p.join("");
    };
  };
}
var BE = Gy(kE, "px, ", "px)", "deg)"), LE = Gy(HE, ", ", ")", ")"), UE = 1e-12;
function Jp(n) {
  return ((n = Math.exp(n)) + 1 / n) / 2;
}
function VE(n) {
  return ((n = Math.exp(n)) - 1 / n) / 2;
}
function YE(n) {
  return ((n = Math.exp(2 * n)) - 1) / (n + 1);
}
const Hs = (function n(i, l, r) {
  function s(c, f) {
    var h = c[0], g = c[1], m = c[2], y = f[0], p = f[1], v = f[2], x = y - h, S = p - g, C = x * x + S * S, j, O;
    if (C < UE)
      O = Math.log(v / m) / i, j = function(V) {
        return [
          h + V * x,
          g + V * S,
          m * Math.exp(i * V * O)
        ];
      };
    else {
      var D = Math.sqrt(C), E = (v * v - m * m + r * C) / (2 * m * l * D), N = (v * v - m * m - r * C) / (2 * v * l * D), k = Math.log(Math.sqrt(E * E + 1) - E), U = Math.log(Math.sqrt(N * N + 1) - N);
      O = (U - k) / i, j = function(V) {
        var X = V * O, te = Jp(k), K = m / (l * D) * (te * YE(i * X + k) - VE(k));
        return [
          h + K * x,
          g + K * S,
          m * te / Jp(i * X + k)
        ];
      };
    }
    return j.duration = O * 1e3 * i / Math.SQRT2, j;
  }
  return s.rho = function(c) {
    var f = Math.max(1e-3, +c), h = f * f, g = h * h;
    return n(f, h, g);
  }, s;
})(Math.SQRT2, 2, 4);
var ho = 0, El = 0, gl = 0, $y = 1e3, Qs, _l, Ks = 0, hi = 0, lu = 0, zl = typeof performance == "object" && performance.now ? performance : Date, Zy = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(n) {
  setTimeout(n, 17);
};
function Td() {
  return hi || (Zy(IE), hi = zl.now() + lu);
}
function IE() {
  hi = 0;
}
function Js() {
  this._call = this._time = this._next = null;
}
Js.prototype = Qy.prototype = {
  constructor: Js,
  restart: function(n, i, l) {
    if (typeof n != "function") throw new TypeError("callback is not a function");
    l = (l == null ? Td() : +l) + (i == null ? 0 : +i), !this._next && _l !== this && (_l ? _l._next = this : Qs = this, _l = this), this._call = n, this._time = l, cd();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, cd());
  }
};
function Qy(n, i, l) {
  var r = new Js();
  return r.restart(n, i, l), r;
}
function qE() {
  Td(), ++ho;
  for (var n = Qs, i; n; )
    (i = hi - n._time) >= 0 && n._call.call(void 0, i), n = n._next;
  --ho;
}
function Wp() {
  hi = (Ks = zl.now()) + lu, ho = El = 0;
  try {
    qE();
  } finally {
    ho = 0, GE(), hi = 0;
  }
}
function XE() {
  var n = zl.now(), i = n - Ks;
  i > $y && (lu -= i, Ks = n);
}
function GE() {
  for (var n, i = Qs, l, r = 1 / 0; i; )
    i._call ? (r > i._time && (r = i._time), n = i, i = i._next) : (l = i._next, i._next = null, i = n ? n._next = l : Qs = l);
  _l = n, cd(r);
}
function cd(n) {
  if (!ho) {
    El && (El = clearTimeout(El));
    var i = n - hi;
    i > 24 ? (n < 1 / 0 && (El = setTimeout(Wp, n - zl.now() - lu)), gl && (gl = clearInterval(gl))) : (gl || (Ks = zl.now(), gl = setInterval(XE, $y)), ho = 1, Zy(Wp));
  }
}
function Fp(n, i, l) {
  var r = new Js();
  return i = i == null ? 0 : +i, r.restart((s) => {
    r.stop(), n(s + i);
  }, i, l), r;
}
var $E = iu("start", "end", "cancel", "interrupt"), ZE = [], Ky = 0, Pp = 1, fd = 2, Bs = 3, e0 = 4, dd = 5, Ls = 6;
function ru(n, i, l, r, s, c) {
  var f = n.__transition;
  if (!f) n.__transition = {};
  else if (l in f) return;
  QE(n, l, {
    name: i,
    index: r,
    // For context during callback.
    group: s,
    // For context during callback.
    on: $E,
    tween: ZE,
    time: c.time,
    delay: c.delay,
    duration: c.duration,
    ease: c.ease,
    timer: null,
    state: Ky
  });
}
function jd(n, i) {
  var l = fn(n, i);
  if (l.state > Ky) throw new Error("too late; already scheduled");
  return l;
}
function Sn(n, i) {
  var l = fn(n, i);
  if (l.state > Bs) throw new Error("too late; already running");
  return l;
}
function fn(n, i) {
  var l = n.__transition;
  if (!l || !(l = l[i])) throw new Error("transition not found");
  return l;
}
function QE(n, i, l) {
  var r = n.__transition, s;
  r[i] = l, l.timer = Qy(c, 0, l.time);
  function c(m) {
    l.state = Pp, l.timer.restart(f, l.delay, l.time), l.delay <= m && f(m - l.delay);
  }
  function f(m) {
    var y, p, v, x;
    if (l.state !== Pp) return g();
    for (y in r)
      if (x = r[y], x.name === l.name) {
        if (x.state === Bs) return Fp(f);
        x.state === e0 ? (x.state = Ls, x.timer.stop(), x.on.call("interrupt", n, n.__data__, x.index, x.group), delete r[y]) : +y < i && (x.state = Ls, x.timer.stop(), x.on.call("cancel", n, n.__data__, x.index, x.group), delete r[y]);
      }
    if (Fp(function() {
      l.state === Bs && (l.state = e0, l.timer.restart(h, l.delay, l.time), h(m));
    }), l.state = fd, l.on.call("start", n, n.__data__, l.index, l.group), l.state === fd) {
      for (l.state = Bs, s = new Array(v = l.tween.length), y = 0, p = -1; y < v; ++y)
        (x = l.tween[y].value.call(n, n.__data__, l.index, l.group)) && (s[++p] = x);
      s.length = p + 1;
    }
  }
  function h(m) {
    for (var y = m < l.duration ? l.ease.call(null, m / l.duration) : (l.timer.restart(g), l.state = dd, 1), p = -1, v = s.length; ++p < v; )
      s[p].call(n, y);
    l.state === dd && (l.on.call("end", n, n.__data__, l.index, l.group), g());
  }
  function g() {
    l.state = Ls, l.timer.stop(), delete r[i];
    for (var m in r) return;
    delete n.__transition;
  }
}
function Us(n, i) {
  var l = n.__transition, r, s, c = !0, f;
  if (l) {
    i = i == null ? null : i + "";
    for (f in l) {
      if ((r = l[f]).name !== i) {
        c = !1;
        continue;
      }
      s = r.state > fd && r.state < dd, r.state = Ls, r.timer.stop(), r.on.call(s ? "interrupt" : "cancel", n, n.__data__, r.index, r.group), delete l[f];
    }
    c && delete n.__transition;
  }
}
function KE(n) {
  return this.each(function() {
    Us(this, n);
  });
}
function JE(n, i) {
  var l, r;
  return function() {
    var s = Sn(this, n), c = s.tween;
    if (c !== l) {
      r = l = c;
      for (var f = 0, h = r.length; f < h; ++f)
        if (r[f].name === i) {
          r = r.slice(), r.splice(f, 1);
          break;
        }
    }
    s.tween = r;
  };
}
function WE(n, i, l) {
  var r, s;
  if (typeof l != "function") throw new Error();
  return function() {
    var c = Sn(this, n), f = c.tween;
    if (f !== r) {
      s = (r = f).slice();
      for (var h = { name: i, value: l }, g = 0, m = s.length; g < m; ++g)
        if (s[g].name === i) {
          s[g] = h;
          break;
        }
      g === m && s.push(h);
    }
    c.tween = s;
  };
}
function FE(n, i) {
  var l = this._id;
  if (n += "", arguments.length < 2) {
    for (var r = fn(this.node(), l).tween, s = 0, c = r.length, f; s < c; ++s)
      if ((f = r[s]).name === n)
        return f.value;
    return null;
  }
  return this.each((i == null ? JE : WE)(l, n, i));
}
function Ad(n, i, l) {
  var r = n._id;
  return n.each(function() {
    var s = Sn(this, r);
    (s.value || (s.value = {}))[i] = l.apply(this, arguments);
  }), function(s) {
    return fn(s, r).value[i];
  };
}
function Jy(n, i) {
  var l;
  return (typeof i == "number" ? bn : i instanceof di ? Zs : (l = di(i)) ? (i = l, Zs) : qy)(n, i);
}
function PE(n) {
  return function() {
    this.removeAttribute(n);
  };
}
function e_(n) {
  return function() {
    this.removeAttributeNS(n.space, n.local);
  };
}
function t_(n, i, l) {
  var r, s = l + "", c;
  return function() {
    var f = this.getAttribute(n);
    return f === s ? null : f === r ? c : c = i(r = f, l);
  };
}
function n_(n, i, l) {
  var r, s = l + "", c;
  return function() {
    var f = this.getAttributeNS(n.space, n.local);
    return f === s ? null : f === r ? c : c = i(r = f, l);
  };
}
function a_(n, i, l) {
  var r, s, c;
  return function() {
    var f, h = l(this), g;
    return h == null ? void this.removeAttribute(n) : (f = this.getAttribute(n), g = h + "", f === g ? null : f === r && g === s ? c : (s = g, c = i(r = f, h)));
  };
}
function i_(n, i, l) {
  var r, s, c;
  return function() {
    var f, h = l(this), g;
    return h == null ? void this.removeAttributeNS(n.space, n.local) : (f = this.getAttributeNS(n.space, n.local), g = h + "", f === g ? null : f === r && g === s ? c : (s = g, c = i(r = f, h)));
  };
}
function o_(n, i) {
  var l = ou(n), r = l === "transform" ? LE : Jy;
  return this.attrTween(n, typeof i == "function" ? (l.local ? i_ : a_)(l, r, Ad(this, "attr." + n, i)) : i == null ? (l.local ? e_ : PE)(l) : (l.local ? n_ : t_)(l, r, i));
}
function l_(n, i) {
  return function(l) {
    this.setAttribute(n, i.call(this, l));
  };
}
function r_(n, i) {
  return function(l) {
    this.setAttributeNS(n.space, n.local, i.call(this, l));
  };
}
function s_(n, i) {
  var l, r;
  function s() {
    var c = i.apply(this, arguments);
    return c !== r && (l = (r = c) && r_(n, c)), l;
  }
  return s._value = i, s;
}
function u_(n, i) {
  var l, r;
  function s() {
    var c = i.apply(this, arguments);
    return c !== r && (l = (r = c) && l_(n, c)), l;
  }
  return s._value = i, s;
}
function c_(n, i) {
  var l = "attr." + n;
  if (arguments.length < 2) return (l = this.tween(l)) && l._value;
  if (i == null) return this.tween(l, null);
  if (typeof i != "function") throw new Error();
  var r = ou(n);
  return this.tween(l, (r.local ? s_ : u_)(r, i));
}
function f_(n, i) {
  return function() {
    jd(this, n).delay = +i.apply(this, arguments);
  };
}
function d_(n, i) {
  return i = +i, function() {
    jd(this, n).delay = i;
  };
}
function h_(n) {
  var i = this._id;
  return arguments.length ? this.each((typeof n == "function" ? f_ : d_)(i, n)) : fn(this.node(), i).delay;
}
function g_(n, i) {
  return function() {
    Sn(this, n).duration = +i.apply(this, arguments);
  };
}
function m_(n, i) {
  return i = +i, function() {
    Sn(this, n).duration = i;
  };
}
function p_(n) {
  var i = this._id;
  return arguments.length ? this.each((typeof n == "function" ? g_ : m_)(i, n)) : fn(this.node(), i).duration;
}
function y_(n, i) {
  if (typeof i != "function") throw new Error();
  return function() {
    Sn(this, n).ease = i;
  };
}
function v_(n) {
  var i = this._id;
  return arguments.length ? this.each(y_(i, n)) : fn(this.node(), i).ease;
}
function b_(n, i) {
  return function() {
    var l = i.apply(this, arguments);
    if (typeof l != "function") throw new Error();
    Sn(this, n).ease = l;
  };
}
function x_(n) {
  if (typeof n != "function") throw new Error();
  return this.each(b_(this._id, n));
}
function w_(n) {
  typeof n != "function" && (n = My(n));
  for (var i = this._groups, l = i.length, r = new Array(l), s = 0; s < l; ++s)
    for (var c = i[s], f = c.length, h = r[s] = [], g, m = 0; m < f; ++m)
      (g = c[m]) && n.call(g, g.__data__, m, c) && h.push(g);
  return new Wn(r, this._parents, this._name, this._id);
}
function S_(n) {
  if (n._id !== this._id) throw new Error();
  for (var i = this._groups, l = n._groups, r = i.length, s = l.length, c = Math.min(r, s), f = new Array(r), h = 0; h < c; ++h)
    for (var g = i[h], m = l[h], y = g.length, p = f[h] = new Array(y), v, x = 0; x < y; ++x)
      (v = g[x] || m[x]) && (p[x] = v);
  for (; h < r; ++h)
    f[h] = i[h];
  return new Wn(f, this._parents, this._name, this._id);
}
function E_(n) {
  return (n + "").trim().split(/^|\s+/).every(function(i) {
    var l = i.indexOf(".");
    return l >= 0 && (i = i.slice(0, l)), !i || i === "start";
  });
}
function __(n, i, l) {
  var r, s, c = E_(i) ? jd : Sn;
  return function() {
    var f = c(this, n), h = f.on;
    h !== r && (s = (r = h).copy()).on(i, l), f.on = s;
  };
}
function N_(n, i) {
  var l = this._id;
  return arguments.length < 2 ? fn(this.node(), l).on.on(n) : this.each(__(l, n, i));
}
function C_(n) {
  return function() {
    var i = this.parentNode;
    for (var l in this.__transition) if (+l !== n) return;
    i && i.removeChild(this);
  };
}
function M_() {
  return this.on("end.remove", C_(this._id));
}
function T_(n) {
  var i = this._name, l = this._id;
  typeof n != "function" && (n = _d(n));
  for (var r = this._groups, s = r.length, c = new Array(s), f = 0; f < s; ++f)
    for (var h = r[f], g = h.length, m = c[f] = new Array(g), y, p, v = 0; v < g; ++v)
      (y = h[v]) && (p = n.call(y, y.__data__, v, h)) && ("__data__" in y && (p.__data__ = y.__data__), m[v] = p, ru(m[v], i, l, v, m, fn(y, l)));
  return new Wn(c, this._parents, i, l);
}
function j_(n) {
  var i = this._name, l = this._id;
  typeof n != "function" && (n = Cy(n));
  for (var r = this._groups, s = r.length, c = [], f = [], h = 0; h < s; ++h)
    for (var g = r[h], m = g.length, y, p = 0; p < m; ++p)
      if (y = g[p]) {
        for (var v = n.call(y, y.__data__, p, g), x, S = fn(y, l), C = 0, j = v.length; C < j; ++C)
          (x = v[C]) && ru(x, i, l, C, v, S);
        c.push(v), f.push(y);
      }
  return new Wn(c, f, i, l);
}
var A_ = Yl.prototype.constructor;
function D_() {
  return new A_(this._groups, this._parents);
}
function O_(n, i) {
  var l, r, s;
  return function() {
    var c = fo(this, n), f = (this.style.removeProperty(n), fo(this, n));
    return c === f ? null : c === l && f === r ? s : s = i(l = c, r = f);
  };
}
function Wy(n) {
  return function() {
    this.style.removeProperty(n);
  };
}
function z_(n, i, l) {
  var r, s = l + "", c;
  return function() {
    var f = fo(this, n);
    return f === s ? null : f === r ? c : c = i(r = f, l);
  };
}
function R_(n, i, l) {
  var r, s, c;
  return function() {
    var f = fo(this, n), h = l(this), g = h + "";
    return h == null && (g = h = (this.style.removeProperty(n), fo(this, n))), f === g ? null : f === r && g === s ? c : (s = g, c = i(r = f, h));
  };
}
function k_(n, i) {
  var l, r, s, c = "style." + i, f = "end." + c, h;
  return function() {
    var g = Sn(this, n), m = g.on, y = g.value[c] == null ? h || (h = Wy(i)) : void 0;
    (m !== l || s !== y) && (r = (l = m).copy()).on(f, s = y), g.on = r;
  };
}
function H_(n, i, l) {
  var r = (n += "") == "transform" ? BE : Jy;
  return i == null ? this.styleTween(n, O_(n, r)).on("end.style." + n, Wy(n)) : typeof i == "function" ? this.styleTween(n, R_(n, r, Ad(this, "style." + n, i))).each(k_(this._id, n)) : this.styleTween(n, z_(n, r, i), l).on("end.style." + n, null);
}
function B_(n, i, l) {
  return function(r) {
    this.style.setProperty(n, i.call(this, r), l);
  };
}
function L_(n, i, l) {
  var r, s;
  function c() {
    var f = i.apply(this, arguments);
    return f !== s && (r = (s = f) && B_(n, f, l)), r;
  }
  return c._value = i, c;
}
function U_(n, i, l) {
  var r = "style." + (n += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (i == null) return this.tween(r, null);
  if (typeof i != "function") throw new Error();
  return this.tween(r, L_(n, i, l ?? ""));
}
function V_(n) {
  return function() {
    this.textContent = n;
  };
}
function Y_(n) {
  return function() {
    var i = n(this);
    this.textContent = i ?? "";
  };
}
function I_(n) {
  return this.tween("text", typeof n == "function" ? Y_(Ad(this, "text", n)) : V_(n == null ? "" : n + ""));
}
function q_(n) {
  return function(i) {
    this.textContent = n.call(this, i);
  };
}
function X_(n) {
  var i, l;
  function r() {
    var s = n.apply(this, arguments);
    return s !== l && (i = (l = s) && q_(s)), i;
  }
  return r._value = n, r;
}
function G_(n) {
  var i = "text";
  if (arguments.length < 1) return (i = this.tween(i)) && i._value;
  if (n == null) return this.tween(i, null);
  if (typeof n != "function") throw new Error();
  return this.tween(i, X_(n));
}
function $_() {
  for (var n = this._name, i = this._id, l = Fy(), r = this._groups, s = r.length, c = 0; c < s; ++c)
    for (var f = r[c], h = f.length, g, m = 0; m < h; ++m)
      if (g = f[m]) {
        var y = fn(g, i);
        ru(g, n, l, m, f, {
          time: y.time + y.delay + y.duration,
          delay: 0,
          duration: y.duration,
          ease: y.ease
        });
      }
  return new Wn(r, this._parents, n, l);
}
function Z_() {
  var n, i, l = this, r = l._id, s = l.size();
  return new Promise(function(c, f) {
    var h = { value: f }, g = { value: function() {
      --s === 0 && c();
    } };
    l.each(function() {
      var m = Sn(this, r), y = m.on;
      y !== n && (i = (n = y).copy(), i._.cancel.push(h), i._.interrupt.push(h), i._.end.push(g)), m.on = i;
    }), s === 0 && c();
  });
}
var Q_ = 0;
function Wn(n, i, l, r) {
  this._groups = n, this._parents = i, this._name = l, this._id = r;
}
function Fy() {
  return ++Q_;
}
var $n = Yl.prototype;
Wn.prototype = {
  constructor: Wn,
  select: T_,
  selectAll: j_,
  selectChild: $n.selectChild,
  selectChildren: $n.selectChildren,
  filter: w_,
  merge: S_,
  selection: D_,
  transition: $_,
  call: $n.call,
  nodes: $n.nodes,
  node: $n.node,
  size: $n.size,
  empty: $n.empty,
  each: $n.each,
  on: N_,
  attr: o_,
  attrTween: c_,
  style: H_,
  styleTween: U_,
  text: I_,
  textTween: G_,
  remove: M_,
  tween: FE,
  delay: h_,
  duration: p_,
  ease: v_,
  easeVarying: x_,
  end: Z_,
  [Symbol.iterator]: $n[Symbol.iterator]
};
function K_(n) {
  return ((n *= 2) <= 1 ? n * n * n : (n -= 2) * n * n + 2) / 2;
}
var J_ = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: K_
};
function W_(n, i) {
  for (var l; !(l = n.__transition) || !(l = l[i]); )
    if (!(n = n.parentNode))
      throw new Error(`transition ${i} not found`);
  return l;
}
function F_(n) {
  var i, l;
  n instanceof Wn ? (i = n._id, n = n._name) : (i = Fy(), (l = J_).time = Td(), n = n == null ? null : n + "");
  for (var r = this._groups, s = r.length, c = 0; c < s; ++c)
    for (var f = r[c], h = f.length, g, m = 0; m < h; ++m)
      (g = f[m]) && ru(g, n, i, m, f, l || W_(g, i));
  return new Wn(r, this._parents, n, i);
}
Yl.prototype.interrupt = KE;
Yl.prototype.transition = F_;
const Cs = (n) => () => n;
function P_(n, {
  sourceEvent: i,
  target: l,
  transform: r,
  dispatch: s
}) {
  Object.defineProperties(this, {
    type: { value: n, enumerable: !0, configurable: !0 },
    sourceEvent: { value: i, enumerable: !0, configurable: !0 },
    target: { value: l, enumerable: !0, configurable: !0 },
    transform: { value: r, enumerable: !0, configurable: !0 },
    _: { value: s }
  });
}
function Kn(n, i, l) {
  this.k = n, this.x = i, this.y = l;
}
Kn.prototype = {
  constructor: Kn,
  scale: function(n) {
    return n === 1 ? this : new Kn(this.k * n, this.x, this.y);
  },
  translate: function(n, i) {
    return n === 0 & i === 0 ? this : new Kn(this.k, this.x + this.k * n, this.y + this.k * i);
  },
  apply: function(n) {
    return [n[0] * this.k + this.x, n[1] * this.k + this.y];
  },
  applyX: function(n) {
    return n * this.k + this.x;
  },
  applyY: function(n) {
    return n * this.k + this.y;
  },
  invert: function(n) {
    return [(n[0] - this.x) / this.k, (n[1] - this.y) / this.k];
  },
  invertX: function(n) {
    return (n - this.x) / this.k;
  },
  invertY: function(n) {
    return (n - this.y) / this.k;
  },
  rescaleX: function(n) {
    return n.copy().domain(n.range().map(this.invertX, this).map(n.invert, n));
  },
  rescaleY: function(n) {
    return n.copy().domain(n.range().map(this.invertY, this).map(n.invert, n));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var su = new Kn(1, 0, 0);
Py.prototype = Kn.prototype;
function Py(n) {
  for (; !n.__zoom; ) if (!(n = n.parentNode)) return su;
  return n.__zoom;
}
function Xf(n) {
  n.stopImmediatePropagation();
}
function ml(n) {
  n.preventDefault(), n.stopImmediatePropagation();
}
function e2(n) {
  return (!n.ctrlKey || n.type === "wheel") && !n.button;
}
function t2() {
  var n = this;
  return n instanceof SVGElement ? (n = n.ownerSVGElement || n, n.hasAttribute("viewBox") ? (n = n.viewBox.baseVal, [[n.x, n.y], [n.x + n.width, n.y + n.height]]) : [[0, 0], [n.width.baseVal.value, n.height.baseVal.value]]) : [[0, 0], [n.clientWidth, n.clientHeight]];
}
function t0() {
  return this.__zoom || su;
}
function n2(n) {
  return -n.deltaY * (n.deltaMode === 1 ? 0.05 : n.deltaMode ? 1 : 2e-3) * (n.ctrlKey ? 10 : 1);
}
function a2() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function i2(n, i, l) {
  var r = n.invertX(i[0][0]) - l[0][0], s = n.invertX(i[1][0]) - l[1][0], c = n.invertY(i[0][1]) - l[0][1], f = n.invertY(i[1][1]) - l[1][1];
  return n.translate(
    s > r ? (r + s) / 2 : Math.min(0, r) || Math.max(0, s),
    f > c ? (c + f) / 2 : Math.min(0, c) || Math.max(0, f)
  );
}
function ev() {
  var n = e2, i = t2, l = i2, r = n2, s = a2, c = [0, 1 / 0], f = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], h = 250, g = Hs, m = iu("start", "zoom", "end"), y, p, v, x = 500, S = 150, C = 0, j = 10;
  function O(M) {
    M.property("__zoom", t0).on("wheel.zoom", X, { passive: !1 }).on("mousedown.zoom", te).on("dblclick.zoom", K).filter(s).on("touchstart.zoom", Y).on("touchmove.zoom", Z).on("touchend.zoom touchcancel.zoom", J).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  O.transform = function(M, L, _, z) {
    var B = M.selection ? M.selection() : M;
    B.property("__zoom", t0), M !== B ? k(M, L, _, z) : B.interrupt().each(function() {
      U(this, arguments).event(z).start().zoom(null, typeof L == "function" ? L.apply(this, arguments) : L).end();
    });
  }, O.scaleBy = function(M, L, _, z) {
    O.scaleTo(M, function() {
      var B = this.__zoom.k, $ = typeof L == "function" ? L.apply(this, arguments) : L;
      return B * $;
    }, _, z);
  }, O.scaleTo = function(M, L, _, z) {
    O.transform(M, function() {
      var B = i.apply(this, arguments), $ = this.__zoom, F = _ == null ? N(B) : typeof _ == "function" ? _.apply(this, arguments) : _, A = $.invert(F), I = typeof L == "function" ? L.apply(this, arguments) : L;
      return l(E(D($, I), F, A), B, f);
    }, _, z);
  }, O.translateBy = function(M, L, _, z) {
    O.transform(M, function() {
      return l(this.__zoom.translate(
        typeof L == "function" ? L.apply(this, arguments) : L,
        typeof _ == "function" ? _.apply(this, arguments) : _
      ), i.apply(this, arguments), f);
    }, null, z);
  }, O.translateTo = function(M, L, _, z, B) {
    O.transform(M, function() {
      var $ = i.apply(this, arguments), F = this.__zoom, A = z == null ? N($) : typeof z == "function" ? z.apply(this, arguments) : z;
      return l(su.translate(A[0], A[1]).scale(F.k).translate(
        typeof L == "function" ? -L.apply(this, arguments) : -L,
        typeof _ == "function" ? -_.apply(this, arguments) : -_
      ), $, f);
    }, z, B);
  };
  function D(M, L) {
    return L = Math.max(c[0], Math.min(c[1], L)), L === M.k ? M : new Kn(L, M.x, M.y);
  }
  function E(M, L, _) {
    var z = L[0] - _[0] * M.k, B = L[1] - _[1] * M.k;
    return z === M.x && B === M.y ? M : new Kn(M.k, z, B);
  }
  function N(M) {
    return [(+M[0][0] + +M[1][0]) / 2, (+M[0][1] + +M[1][1]) / 2];
  }
  function k(M, L, _, z) {
    M.on("start.zoom", function() {
      U(this, arguments).event(z).start();
    }).on("interrupt.zoom end.zoom", function() {
      U(this, arguments).event(z).end();
    }).tween("zoom", function() {
      var B = this, $ = arguments, F = U(B, $).event(z), A = i.apply(B, $), I = _ == null ? N(A) : typeof _ == "function" ? _.apply(B, $) : _, G = Math.max(A[1][0] - A[0][0], A[1][1] - A[0][1]), H = B.__zoom, T = typeof L == "function" ? L.apply(B, $) : L, q = g(H.invert(I).concat(G / H.k), T.invert(I).concat(G / T.k));
      return function(Q) {
        if (Q === 1) Q = T;
        else {
          var P = q(Q), ie = G / P[2];
          Q = new Kn(ie, I[0] - P[0] * ie, I[1] - P[1] * ie);
        }
        F.zoom(null, Q);
      };
    });
  }
  function U(M, L, _) {
    return !_ && M.__zooming || new V(M, L);
  }
  function V(M, L) {
    this.that = M, this.args = L, this.active = 0, this.sourceEvent = null, this.extent = i.apply(M, L), this.taps = 0;
  }
  V.prototype = {
    event: function(M) {
      return M && (this.sourceEvent = M), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(M, L) {
      return this.mouse && M !== "mouse" && (this.mouse[1] = L.invert(this.mouse[0])), this.touch0 && M !== "touch" && (this.touch0[1] = L.invert(this.touch0[0])), this.touch1 && M !== "touch" && (this.touch1[1] = L.invert(this.touch1[0])), this.that.__zoom = L, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(M) {
      var L = It(this.that).datum();
      m.call(
        M,
        this.that,
        new P_(M, {
          sourceEvent: this.sourceEvent,
          target: O,
          transform: this.that.__zoom,
          dispatch: m
        }),
        L
      );
    }
  };
  function X(M, ...L) {
    if (!n.apply(this, arguments)) return;
    var _ = U(this, L).event(M), z = this.__zoom, B = Math.max(c[0], Math.min(c[1], z.k * Math.pow(2, r.apply(this, arguments)))), $ = ln(M);
    if (_.wheel)
      (_.mouse[0][0] !== $[0] || _.mouse[0][1] !== $[1]) && (_.mouse[1] = z.invert(_.mouse[0] = $)), clearTimeout(_.wheel);
    else {
      if (z.k === B) return;
      _.mouse = [$, z.invert($)], Us(this), _.start();
    }
    ml(M), _.wheel = setTimeout(F, S), _.zoom("mouse", l(E(D(z, B), _.mouse[0], _.mouse[1]), _.extent, f));
    function F() {
      _.wheel = null, _.end();
    }
  }
  function te(M, ...L) {
    if (v || !n.apply(this, arguments)) return;
    var _ = M.currentTarget, z = U(this, L, !0).event(M), B = It(M.view).on("mousemove.zoom", I, !0).on("mouseup.zoom", G, !0), $ = ln(M, _), F = M.clientX, A = M.clientY;
    By(M.view), Xf(M), z.mouse = [$, this.__zoom.invert($)], Us(this), z.start();
    function I(H) {
      if (ml(H), !z.moved) {
        var T = H.clientX - F, q = H.clientY - A;
        z.moved = T * T + q * q > C;
      }
      z.event(H).zoom("mouse", l(E(z.that.__zoom, z.mouse[0] = ln(H, _), z.mouse[1]), z.extent, f));
    }
    function G(H) {
      B.on("mousemove.zoom mouseup.zoom", null), Ly(H.view, z.moved), ml(H), z.event(H).end();
    }
  }
  function K(M, ...L) {
    if (n.apply(this, arguments)) {
      var _ = this.__zoom, z = ln(M.changedTouches ? M.changedTouches[0] : M, this), B = _.invert(z), $ = _.k * (M.shiftKey ? 0.5 : 2), F = l(E(D(_, $), z, B), i.apply(this, L), f);
      ml(M), h > 0 ? It(this).transition().duration(h).call(k, F, z, M) : It(this).call(O.transform, F, z, M);
    }
  }
  function Y(M, ...L) {
    if (n.apply(this, arguments)) {
      var _ = M.touches, z = _.length, B = U(this, L, M.changedTouches.length === z).event(M), $, F, A, I;
      for (Xf(M), F = 0; F < z; ++F)
        A = _[F], I = ln(A, this), I = [I, this.__zoom.invert(I), A.identifier], B.touch0 ? !B.touch1 && B.touch0[2] !== I[2] && (B.touch1 = I, B.taps = 0) : (B.touch0 = I, $ = !0, B.taps = 1 + !!y);
      y && (y = clearTimeout(y)), $ && (B.taps < 2 && (p = I[0], y = setTimeout(function() {
        y = null;
      }, x)), Us(this), B.start());
    }
  }
  function Z(M, ...L) {
    if (this.__zooming) {
      var _ = U(this, L).event(M), z = M.changedTouches, B = z.length, $, F, A, I;
      for (ml(M), $ = 0; $ < B; ++$)
        F = z[$], A = ln(F, this), _.touch0 && _.touch0[2] === F.identifier ? _.touch0[0] = A : _.touch1 && _.touch1[2] === F.identifier && (_.touch1[0] = A);
      if (F = _.that.__zoom, _.touch1) {
        var G = _.touch0[0], H = _.touch0[1], T = _.touch1[0], q = _.touch1[1], Q = (Q = T[0] - G[0]) * Q + (Q = T[1] - G[1]) * Q, P = (P = q[0] - H[0]) * P + (P = q[1] - H[1]) * P;
        F = D(F, Math.sqrt(Q / P)), A = [(G[0] + T[0]) / 2, (G[1] + T[1]) / 2], I = [(H[0] + q[0]) / 2, (H[1] + q[1]) / 2];
      } else if (_.touch0) A = _.touch0[0], I = _.touch0[1];
      else return;
      _.zoom("touch", l(E(F, A, I), _.extent, f));
    }
  }
  function J(M, ...L) {
    if (this.__zooming) {
      var _ = U(this, L).event(M), z = M.changedTouches, B = z.length, $, F;
      for (Xf(M), v && clearTimeout(v), v = setTimeout(function() {
        v = null;
      }, x), $ = 0; $ < B; ++$)
        F = z[$], _.touch0 && _.touch0[2] === F.identifier ? delete _.touch0 : _.touch1 && _.touch1[2] === F.identifier && delete _.touch1;
      if (_.touch1 && !_.touch0 && (_.touch0 = _.touch1, delete _.touch1), _.touch0) _.touch0[1] = this.__zoom.invert(_.touch0[0]);
      else if (_.end(), _.taps === 2 && (F = ln(F, this), Math.hypot(p[0] - F[0], p[1] - F[1]) < j)) {
        var A = It(this).on("dblclick.zoom");
        A && A.apply(this, arguments);
      }
    }
  }
  return O.wheelDelta = function(M) {
    return arguments.length ? (r = typeof M == "function" ? M : Cs(+M), O) : r;
  }, O.filter = function(M) {
    return arguments.length ? (n = typeof M == "function" ? M : Cs(!!M), O) : n;
  }, O.touchable = function(M) {
    return arguments.length ? (s = typeof M == "function" ? M : Cs(!!M), O) : s;
  }, O.extent = function(M) {
    return arguments.length ? (i = typeof M == "function" ? M : Cs([[+M[0][0], +M[0][1]], [+M[1][0], +M[1][1]]]), O) : i;
  }, O.scaleExtent = function(M) {
    return arguments.length ? (c[0] = +M[0], c[1] = +M[1], O) : [c[0], c[1]];
  }, O.translateExtent = function(M) {
    return arguments.length ? (f[0][0] = +M[0][0], f[1][0] = +M[1][0], f[0][1] = +M[0][1], f[1][1] = +M[1][1], O) : [[f[0][0], f[0][1]], [f[1][0], f[1][1]]];
  }, O.constrain = function(M) {
    return arguments.length ? (l = M, O) : l;
  }, O.duration = function(M) {
    return arguments.length ? (h = +M, O) : h;
  }, O.interpolate = function(M) {
    return arguments.length ? (g = M, O) : g;
  }, O.on = function() {
    var M = m.on.apply(m, arguments);
    return M === m ? O : M;
  }, O.clickDistance = function(M) {
    return arguments.length ? (C = (M = +M) * M, O) : Math.sqrt(C);
  }, O.tapDistance = function(M) {
    return arguments.length ? (j = +M, O) : j;
  }, O;
}
const wn = {
  error001: () => "[React Flow]: Seems like you have not used zustand provider as an ancestor. Help: https://reactflow.dev/error#001",
  error002: () => "It looks like you've created a new nodeTypes or edgeTypes object. If this wasn't on purpose please define the nodeTypes/edgeTypes outside of the component or memoize them.",
  error003: (n) => `Node type "${n}" not found. Using fallback type "default".`,
  error004: () => "The React Flow parent container needs a width and a height to render the graph.",
  error005: () => "Only child nodes can use a parent extent.",
  error006: () => "Can't create edge. An edge needs a source and a target.",
  error007: (n) => `The old edge with id=${n} does not exist.`,
  error009: (n) => `Marker type "${n}" doesn't exist.`,
  error008: (n, { id: i, sourceHandle: l, targetHandle: r }) => `Couldn't create edge for ${n} handle id: "${n === "source" ? l : r}", edge id: ${i}.`,
  error010: () => "Handle: No node id found. Make sure to only use a Handle inside a custom Node.",
  error011: (n) => `Edge type "${n}" not found. Using fallback type "default".`,
  error012: (n) => `Node with id "${n}" does not exist, it may have been removed. This can happen when a node is deleted before the "onNodeClick" handler is called.`,
  error013: (n = "react") => `It seems that you haven't loaded the styles. Please import '@xyflow/${n}/dist/style.css' or base.css to make sure everything is working properly.`,
  error014: () => "useNodeConnections: No node ID found. Call useNodeConnections inside a custom Node or provide a node ID.",
  error015: () => "It seems that you are trying to drag a node that is not initialized. Please use onNodesChange as explained in the docs."
}, Rl = [
  [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
], tv = ["Enter", " ", "Escape"], nv = {
  "node.a11yDescription.default": "Press enter or space to select a node. Press delete to remove it and escape to cancel.",
  "node.a11yDescription.keyboardDisabled": "Press enter or space to select a node. You can then use the arrow keys to move the node around. Press delete to remove it and escape to cancel.",
  "node.a11yDescription.ariaLiveMessage": ({ direction: n, x: i, y: l }) => `Moved selected node ${n}. New position, x: ${i}, y: ${l}`,
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
var go;
(function(n) {
  n.Strict = "strict", n.Loose = "loose";
})(go || (go = {}));
var fi;
(function(n) {
  n.Free = "free", n.Vertical = "vertical", n.Horizontal = "horizontal";
})(fi || (fi = {}));
var kl;
(function(n) {
  n.Partial = "partial", n.Full = "full";
})(kl || (kl = {}));
const av = {
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
var Da;
(function(n) {
  n.Bezier = "default", n.Straight = "straight", n.Step = "step", n.SmoothStep = "smoothstep", n.SimpleBezier = "simplebezier";
})(Da || (Da = {}));
var Ws;
(function(n) {
  n.Arrow = "arrow", n.ArrowClosed = "arrowclosed";
})(Ws || (Ws = {}));
var ye;
(function(n) {
  n.Left = "left", n.Top = "top", n.Right = "right", n.Bottom = "bottom";
})(ye || (ye = {}));
const n0 = {
  [ye.Left]: ye.Right,
  [ye.Right]: ye.Left,
  [ye.Top]: ye.Bottom,
  [ye.Bottom]: ye.Top
};
function iv(n) {
  return n === null ? null : n ? "valid" : "invalid";
}
const ov = (n) => "id" in n && "source" in n && "target" in n, o2 = (n) => "id" in n && "position" in n && !("source" in n) && !("target" in n), Dd = (n) => "id" in n && "internals" in n && !("source" in n) && !("target" in n), ql = (n, i = [0, 0]) => {
  const { width: l, height: r } = Fn(n), s = n.origin ?? i, c = l * s[0], f = r * s[1];
  return {
    x: n.position.x - c,
    y: n.position.y - f
  };
}, l2 = (n, i = { nodeOrigin: [0, 0] }) => {
  if (n.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  const l = n.reduce((r, s) => {
    const c = typeof s == "string";
    let f = !i.nodeLookup && !c ? s : void 0;
    i.nodeLookup && (f = c ? i.nodeLookup.get(s) : Dd(s) ? s : i.nodeLookup.get(s.id));
    const h = f ? Fs(f, i.nodeOrigin) : { x: 0, y: 0, x2: 0, y2: 0 };
    return uu(r, h);
  }, { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 });
  return cu(l);
}, Xl = (n, i = {}) => {
  let l = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 }, r = !1;
  return n.forEach((s) => {
    (i.filter === void 0 || i.filter(s)) && (l = uu(l, Fs(s)), r = !0);
  }), r ? cu(l) : { x: 0, y: 0, width: 0, height: 0 };
}, Od = (n, i, [l, r, s] = [0, 0, 1], c = !1, f = !1) => {
  const h = {
    ...$l(i, [l, r, s]),
    width: i.width / s,
    height: i.height / s
  }, g = [];
  for (const m of n.values()) {
    const { measured: y, selectable: p = !0, hidden: v = !1 } = m;
    if (f && !p || v)
      continue;
    const x = y.width ?? m.width ?? m.initialWidth ?? null, S = y.height ?? m.height ?? m.initialHeight ?? null, C = Hl(h, po(m)), j = (x ?? 0) * (S ?? 0), O = c && C > 0;
    (!m.internals.handleBounds || O || C >= j || m.dragging) && g.push(m);
  }
  return g;
}, r2 = (n, i) => {
  const l = /* @__PURE__ */ new Set();
  return n.forEach((r) => {
    l.add(r.id);
  }), i.filter((r) => l.has(r.source) || l.has(r.target));
};
function s2(n, i) {
  const l = /* @__PURE__ */ new Map(), r = i?.nodes ? new Set(i.nodes.map((s) => s.id)) : null;
  return n.forEach((s) => {
    s.measured.width && s.measured.height && (i?.includeHiddenNodes || !s.hidden) && (!r || r.has(s.id)) && l.set(s.id, s);
  }), l;
}
async function u2({ nodes: n, width: i, height: l, panZoom: r, minZoom: s, maxZoom: c }, f) {
  if (n.size === 0)
    return Promise.resolve(!0);
  const h = s2(n, f), g = Xl(h), m = zd(g, i, l, f?.minZoom ?? s, f?.maxZoom ?? c, f?.padding ?? 0.1);
  return await r.setViewport(m, {
    duration: f?.duration,
    ease: f?.ease,
    interpolate: f?.interpolate
  }), Promise.resolve(!0);
}
function lv({ nodeId: n, nextPosition: i, nodeLookup: l, nodeOrigin: r = [0, 0], nodeExtent: s, onError: c }) {
  const f = l.get(n), h = f.parentId ? l.get(f.parentId) : void 0, { x: g, y: m } = h ? h.internals.positionAbsolute : { x: 0, y: 0 }, y = f.origin ?? r;
  let p = f.extent || s;
  if (f.extent === "parent" && !f.expandParent)
    if (!h)
      c?.("005", wn.error005());
    else {
      const x = h.measured.width, S = h.measured.height;
      x && S && (p = [
        [g, m],
        [g + x, m + S]
      ]);
    }
  else h && yo(f.extent) && (p = [
    [f.extent[0][0] + g, f.extent[0][1] + m],
    [f.extent[1][0] + g, f.extent[1][1] + m]
  ]);
  const v = yo(p) ? gi(i, p, f.measured) : i;
  return (f.measured.width === void 0 || f.measured.height === void 0) && c?.("015", wn.error015()), {
    position: {
      x: v.x - g + (f.measured.width ?? 0) * y[0],
      y: v.y - m + (f.measured.height ?? 0) * y[1]
    },
    positionAbsolute: v
  };
}
async function c2({ nodesToRemove: n = [], edgesToRemove: i = [], nodes: l, edges: r, onBeforeDelete: s }) {
  const c = new Set(n.map((v) => v.id)), f = [];
  for (const v of l) {
    if (v.deletable === !1)
      continue;
    const x = c.has(v.id), S = !x && v.parentId && f.find((C) => C.id === v.parentId);
    (x || S) && f.push(v);
  }
  const h = new Set(i.map((v) => v.id)), g = r.filter((v) => v.deletable !== !1), y = r2(f, g);
  for (const v of g)
    h.has(v.id) && !y.find((S) => S.id === v.id) && y.push(v);
  if (!s)
    return {
      edges: y,
      nodes: f
    };
  const p = await s({
    nodes: f,
    edges: y
  });
  return typeof p == "boolean" ? p ? { edges: y, nodes: f } : { edges: [], nodes: [] } : p;
}
const mo = (n, i = 0, l = 1) => Math.min(Math.max(n, i), l), gi = (n = { x: 0, y: 0 }, i, l) => ({
  x: mo(n.x, i[0][0], i[1][0] - (l?.width ?? 0)),
  y: mo(n.y, i[0][1], i[1][1] - (l?.height ?? 0))
});
function rv(n, i, l) {
  const { width: r, height: s } = Fn(l), { x: c, y: f } = l.internals.positionAbsolute;
  return gi(n, [
    [c, f],
    [c + r, f + s]
  ], i);
}
const a0 = (n, i, l) => n < i ? mo(Math.abs(n - i), 1, i) / i : n > l ? -mo(Math.abs(n - l), 1, i) / i : 0, sv = (n, i, l = 15, r = 40) => {
  const s = a0(n.x, r, i.width - r) * l, c = a0(n.y, r, i.height - r) * l;
  return [s, c];
}, uu = (n, i) => ({
  x: Math.min(n.x, i.x),
  y: Math.min(n.y, i.y),
  x2: Math.max(n.x2, i.x2),
  y2: Math.max(n.y2, i.y2)
}), hd = ({ x: n, y: i, width: l, height: r }) => ({
  x: n,
  y: i,
  x2: n + l,
  y2: i + r
}), cu = ({ x: n, y: i, x2: l, y2: r }) => ({
  x: n,
  y: i,
  width: l - n,
  height: r - i
}), po = (n, i = [0, 0]) => {
  const { x: l, y: r } = Dd(n) ? n.internals.positionAbsolute : ql(n, i);
  return {
    x: l,
    y: r,
    width: n.measured?.width ?? n.width ?? n.initialWidth ?? 0,
    height: n.measured?.height ?? n.height ?? n.initialHeight ?? 0
  };
}, Fs = (n, i = [0, 0]) => {
  const { x: l, y: r } = Dd(n) ? n.internals.positionAbsolute : ql(n, i);
  return {
    x: l,
    y: r,
    x2: l + (n.measured?.width ?? n.width ?? n.initialWidth ?? 0),
    y2: r + (n.measured?.height ?? n.height ?? n.initialHeight ?? 0)
  };
}, uv = (n, i) => cu(uu(hd(n), hd(i))), Hl = (n, i) => {
  const l = Math.max(0, Math.min(n.x + n.width, i.x + i.width) - Math.max(n.x, i.x)), r = Math.max(0, Math.min(n.y + n.height, i.y + i.height) - Math.max(n.y, i.y));
  return Math.ceil(l * r);
}, i0 = (n) => sn(n.width) && sn(n.height) && sn(n.x) && sn(n.y), sn = (n) => !isNaN(n) && isFinite(n), f2 = (n, i) => {
}, Gl = (n, i = [1, 1]) => ({
  x: i[0] * Math.round(n.x / i[0]),
  y: i[1] * Math.round(n.y / i[1])
}), $l = ({ x: n, y: i }, [l, r, s], c = !1, f = [1, 1]) => {
  const h = {
    x: (n - l) / s,
    y: (i - r) / s
  };
  return c ? Gl(h, f) : h;
}, Ps = ({ x: n, y: i }, [l, r, s]) => ({
  x: n * s + l,
  y: i * s + r
});
function oo(n, i) {
  if (typeof n == "number")
    return Math.floor((i - i / (1 + n)) * 0.5);
  if (typeof n == "string" && n.endsWith("px")) {
    const l = parseFloat(n);
    if (!Number.isNaN(l))
      return Math.floor(l);
  }
  if (typeof n == "string" && n.endsWith("%")) {
    const l = parseFloat(n);
    if (!Number.isNaN(l))
      return Math.floor(i * l * 0.01);
  }
  return console.error(`[React Flow] The padding value "${n}" is invalid. Please provide a number or a string with a valid unit (px or %).`), 0;
}
function d2(n, i, l) {
  if (typeof n == "string" || typeof n == "number") {
    const r = oo(n, l), s = oo(n, i);
    return {
      top: r,
      right: s,
      bottom: r,
      left: s,
      x: s * 2,
      y: r * 2
    };
  }
  if (typeof n == "object") {
    const r = oo(n.top ?? n.y ?? 0, l), s = oo(n.bottom ?? n.y ?? 0, l), c = oo(n.left ?? n.x ?? 0, i), f = oo(n.right ?? n.x ?? 0, i);
    return { top: r, right: f, bottom: s, left: c, x: c + f, y: r + s };
  }
  return { top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0 };
}
function h2(n, i, l, r, s, c) {
  const { x: f, y: h } = Ps(n, [i, l, r]), { x: g, y: m } = Ps({ x: n.x + n.width, y: n.y + n.height }, [i, l, r]), y = s - g, p = c - m;
  return {
    left: Math.floor(f),
    top: Math.floor(h),
    right: Math.floor(y),
    bottom: Math.floor(p)
  };
}
const zd = (n, i, l, r, s, c) => {
  const f = d2(c, i, l), h = (i - f.x) / n.width, g = (l - f.y) / n.height, m = Math.min(h, g), y = mo(m, r, s), p = n.x + n.width / 2, v = n.y + n.height / 2, x = i / 2 - p * y, S = l / 2 - v * y, C = h2(n, x, S, y, i, l), j = {
    left: Math.min(C.left - f.left, 0),
    top: Math.min(C.top - f.top, 0),
    right: Math.min(C.right - f.right, 0),
    bottom: Math.min(C.bottom - f.bottom, 0)
  };
  return {
    x: x - j.left + j.right,
    y: S - j.top + j.bottom,
    zoom: y
  };
}, Bl = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function yo(n) {
  return n != null && n !== "parent";
}
function Fn(n) {
  return {
    width: n.measured?.width ?? n.width ?? n.initialWidth ?? 0,
    height: n.measured?.height ?? n.height ?? n.initialHeight ?? 0
  };
}
function cv(n) {
  return (n.measured?.width ?? n.width ?? n.initialWidth) !== void 0 && (n.measured?.height ?? n.height ?? n.initialHeight) !== void 0;
}
function fv(n, i = { width: 0, height: 0 }, l, r, s) {
  const c = { ...n }, f = r.get(l);
  if (f) {
    const h = f.origin || s;
    c.x += f.internals.positionAbsolute.x - (i.width ?? 0) * h[0], c.y += f.internals.positionAbsolute.y - (i.height ?? 0) * h[1];
  }
  return c;
}
function o0(n, i) {
  if (n.size !== i.size)
    return !1;
  for (const l of n)
    if (!i.has(l))
      return !1;
  return !0;
}
function g2() {
  let n, i;
  return { promise: new Promise((r, s) => {
    n = r, i = s;
  }), resolve: n, reject: i };
}
function m2(n) {
  return { ...nv, ...n || {} };
}
function Ml(n, { snapGrid: i = [0, 0], snapToGrid: l = !1, transform: r, containerBounds: s }) {
  const { x: c, y: f } = un(n), h = $l({ x: c - (s?.left ?? 0), y: f - (s?.top ?? 0) }, r), { x: g, y: m } = l ? Gl(h, i) : h;
  return {
    xSnapped: g,
    ySnapped: m,
    ...h
  };
}
const Rd = (n) => ({
  width: n.offsetWidth,
  height: n.offsetHeight
}), dv = (n) => n?.getRootNode?.() || window?.document, p2 = ["INPUT", "SELECT", "TEXTAREA"];
function hv(n) {
  const i = n.composedPath?.()?.[0] || n.target;
  return i?.nodeType !== 1 ? !1 : p2.includes(i.nodeName) || i.hasAttribute("contenteditable") || !!i.closest(".nokey");
}
const gv = (n) => "clientX" in n, un = (n, i) => {
  const l = gv(n), r = l ? n.clientX : n.touches?.[0].clientX, s = l ? n.clientY : n.touches?.[0].clientY;
  return {
    x: r - (i?.left ?? 0),
    y: s - (i?.top ?? 0)
  };
}, l0 = (n, i, l, r, s) => {
  const c = i.querySelectorAll(`.${n}`);
  return !c || !c.length ? null : Array.from(c).map((f) => {
    const h = f.getBoundingClientRect();
    return {
      id: f.getAttribute("data-handleid"),
      type: n,
      nodeId: s,
      position: f.getAttribute("data-handlepos"),
      x: (h.left - l.left) / r,
      y: (h.top - l.top) / r,
      ...Rd(f)
    };
  });
};
function mv({ sourceX: n, sourceY: i, targetX: l, targetY: r, sourceControlX: s, sourceControlY: c, targetControlX: f, targetControlY: h }) {
  const g = n * 0.125 + s * 0.375 + f * 0.375 + l * 0.125, m = i * 0.125 + c * 0.375 + h * 0.375 + r * 0.125, y = Math.abs(g - n), p = Math.abs(m - i);
  return [g, m, y, p];
}
function Ms(n, i) {
  return n >= 0 ? 0.5 * n : i * 25 * Math.sqrt(-n);
}
function r0({ pos: n, x1: i, y1: l, x2: r, y2: s, c }) {
  switch (n) {
    case ye.Left:
      return [i - Ms(i - r, c), l];
    case ye.Right:
      return [i + Ms(r - i, c), l];
    case ye.Top:
      return [i, l - Ms(l - s, c)];
    case ye.Bottom:
      return [i, l + Ms(s - l, c)];
  }
}
function kd({ sourceX: n, sourceY: i, sourcePosition: l = ye.Bottom, targetX: r, targetY: s, targetPosition: c = ye.Top, curvature: f = 0.25 }) {
  const [h, g] = r0({
    pos: l,
    x1: n,
    y1: i,
    x2: r,
    y2: s,
    c: f
  }), [m, y] = r0({
    pos: c,
    x1: r,
    y1: s,
    x2: n,
    y2: i,
    c: f
  }), [p, v, x, S] = mv({
    sourceX: n,
    sourceY: i,
    targetX: r,
    targetY: s,
    sourceControlX: h,
    sourceControlY: g,
    targetControlX: m,
    targetControlY: y
  });
  return [
    `M${n},${i} C${h},${g} ${m},${y} ${r},${s}`,
    p,
    v,
    x,
    S
  ];
}
function pv({ sourceX: n, sourceY: i, targetX: l, targetY: r }) {
  const s = Math.abs(l - n) / 2, c = l < n ? l + s : l - s, f = Math.abs(r - i) / 2, h = r < i ? r + f : r - f;
  return [c, h, s, f];
}
function y2({ sourceNode: n, targetNode: i, selected: l = !1, zIndex: r = 0, elevateOnSelect: s = !1, zIndexMode: c = "basic" }) {
  if (c === "manual")
    return r;
  const f = s && l ? r + 1e3 : r, h = Math.max(n.parentId || s && n.selected ? n.internals.z : 0, i.parentId || s && i.selected ? i.internals.z : 0);
  return f + h;
}
function v2({ sourceNode: n, targetNode: i, width: l, height: r, transform: s }) {
  const c = uu(Fs(n), Fs(i));
  c.x === c.x2 && (c.x2 += 1), c.y === c.y2 && (c.y2 += 1);
  const f = {
    x: -s[0] / s[2],
    y: -s[1] / s[2],
    width: l / s[2],
    height: r / s[2]
  };
  return Hl(f, cu(c)) > 0;
}
const b2 = ({ source: n, sourceHandle: i, target: l, targetHandle: r }) => `xy-edge__${n}${i || ""}-${l}${r || ""}`, x2 = (n, i) => i.some((l) => l.source === n.source && l.target === n.target && (l.sourceHandle === n.sourceHandle || !l.sourceHandle && !n.sourceHandle) && (l.targetHandle === n.targetHandle || !l.targetHandle && !n.targetHandle)), w2 = (n, i, l = {}) => {
  if (!n.source || !n.target)
    return i;
  const r = l.getEdgeId || b2;
  let s;
  return ov(n) ? s = { ...n } : s = {
    ...n,
    id: r(n)
  }, x2(s, i) ? i : (s.sourceHandle === null && delete s.sourceHandle, s.targetHandle === null && delete s.targetHandle, i.concat(s));
};
function yv({ sourceX: n, sourceY: i, targetX: l, targetY: r }) {
  const [s, c, f, h] = pv({
    sourceX: n,
    sourceY: i,
    targetX: l,
    targetY: r
  });
  return [`M ${n},${i}L ${l},${r}`, s, c, f, h];
}
const s0 = {
  [ye.Left]: { x: -1, y: 0 },
  [ye.Right]: { x: 1, y: 0 },
  [ye.Top]: { x: 0, y: -1 },
  [ye.Bottom]: { x: 0, y: 1 }
}, S2 = ({ source: n, sourcePosition: i = ye.Bottom, target: l }) => i === ye.Left || i === ye.Right ? n.x < l.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : n.y < l.y ? { x: 0, y: 1 } : { x: 0, y: -1 }, u0 = (n, i) => Math.sqrt(Math.pow(i.x - n.x, 2) + Math.pow(i.y - n.y, 2));
function E2({ source: n, sourcePosition: i = ye.Bottom, target: l, targetPosition: r = ye.Top, center: s, offset: c, stepPosition: f }) {
  const h = s0[i], g = s0[r], m = { x: n.x + h.x * c, y: n.y + h.y * c }, y = { x: l.x + g.x * c, y: l.y + g.y * c }, p = S2({
    source: m,
    sourcePosition: i,
    target: y
  }), v = p.x !== 0 ? "x" : "y", x = p[v];
  let S = [], C, j;
  const O = { x: 0, y: 0 }, D = { x: 0, y: 0 }, [, , E, N] = pv({
    sourceX: n.x,
    sourceY: n.y,
    targetX: l.x,
    targetY: l.y
  });
  if (h[v] * g[v] === -1) {
    v === "x" ? (C = s.x ?? m.x + (y.x - m.x) * f, j = s.y ?? (m.y + y.y) / 2) : (C = s.x ?? (m.x + y.x) / 2, j = s.y ?? m.y + (y.y - m.y) * f);
    const U = [
      { x: C, y: m.y },
      { x: C, y: y.y }
    ], V = [
      { x: m.x, y: j },
      { x: y.x, y: j }
    ];
    h[v] === x ? S = v === "x" ? U : V : S = v === "x" ? V : U;
  } else {
    const U = [{ x: m.x, y: y.y }], V = [{ x: y.x, y: m.y }];
    if (v === "x" ? S = h.x === x ? V : U : S = h.y === x ? U : V, i === r) {
      const Z = Math.abs(n[v] - l[v]);
      if (Z <= c) {
        const J = Math.min(c - 1, c - Z);
        h[v] === x ? O[v] = (m[v] > n[v] ? -1 : 1) * J : D[v] = (y[v] > l[v] ? -1 : 1) * J;
      }
    }
    if (i !== r) {
      const Z = v === "x" ? "y" : "x", J = h[v] === g[Z], M = m[Z] > y[Z], L = m[Z] < y[Z];
      (h[v] === 1 && (!J && M || J && L) || h[v] !== 1 && (!J && L || J && M)) && (S = v === "x" ? U : V);
    }
    const X = { x: m.x + O.x, y: m.y + O.y }, te = { x: y.x + D.x, y: y.y + D.y }, K = Math.max(Math.abs(X.x - S[0].x), Math.abs(te.x - S[0].x)), Y = Math.max(Math.abs(X.y - S[0].y), Math.abs(te.y - S[0].y));
    K >= Y ? (C = (X.x + te.x) / 2, j = S[0].y) : (C = S[0].x, j = (X.y + te.y) / 2);
  }
  return [[
    n,
    { x: m.x + O.x, y: m.y + O.y },
    ...S,
    { x: y.x + D.x, y: y.y + D.y },
    l
  ], C, j, E, N];
}
function _2(n, i, l, r) {
  const s = Math.min(u0(n, i) / 2, u0(i, l) / 2, r), { x: c, y: f } = i;
  if (n.x === c && c === l.x || n.y === f && f === l.y)
    return `L${c} ${f}`;
  if (n.y === f) {
    const m = n.x < l.x ? -1 : 1, y = n.y < l.y ? 1 : -1;
    return `L ${c + s * m},${f}Q ${c},${f} ${c},${f + s * y}`;
  }
  const h = n.x < l.x ? 1 : -1, g = n.y < l.y ? -1 : 1;
  return `L ${c},${f + s * g}Q ${c},${f} ${c + s * h},${f}`;
}
function gd({ sourceX: n, sourceY: i, sourcePosition: l = ye.Bottom, targetX: r, targetY: s, targetPosition: c = ye.Top, borderRadius: f = 5, centerX: h, centerY: g, offset: m = 20, stepPosition: y = 0.5 }) {
  const [p, v, x, S, C] = E2({
    source: { x: n, y: i },
    sourcePosition: l,
    target: { x: r, y: s },
    targetPosition: c,
    center: { x: h, y: g },
    offset: m,
    stepPosition: y
  });
  return [p.reduce((O, D, E) => {
    let N = "";
    return E > 0 && E < p.length - 1 ? N = _2(p[E - 1], D, p[E + 1], f) : N = `${E === 0 ? "M" : "L"}${D.x} ${D.y}`, O += N, O;
  }, ""), v, x, S, C];
}
function c0(n) {
  return n && !!(n.internals.handleBounds || n.handles?.length) && !!(n.measured.width || n.width || n.initialWidth);
}
function N2(n) {
  const { sourceNode: i, targetNode: l } = n;
  if (!c0(i) || !c0(l))
    return null;
  const r = i.internals.handleBounds || f0(i.handles), s = l.internals.handleBounds || f0(l.handles), c = d0(r?.source ?? [], n.sourceHandle), f = d0(
    // when connection type is loose we can define all handles as sources and connect source -> source
    n.connectionMode === go.Strict ? s?.target ?? [] : (s?.target ?? []).concat(s?.source ?? []),
    n.targetHandle
  );
  if (!c || !f)
    return n.onError?.("008", wn.error008(c ? "target" : "source", {
      id: n.id,
      sourceHandle: n.sourceHandle,
      targetHandle: n.targetHandle
    })), null;
  const h = c?.position || ye.Bottom, g = f?.position || ye.Top, m = mi(i, c, h), y = mi(l, f, g);
  return {
    sourceX: m.x,
    sourceY: m.y,
    targetX: y.x,
    targetY: y.y,
    sourcePosition: h,
    targetPosition: g
  };
}
function f0(n) {
  if (!n)
    return null;
  const i = [], l = [];
  for (const r of n)
    r.width = r.width ?? 1, r.height = r.height ?? 1, r.type === "source" ? i.push(r) : r.type === "target" && l.push(r);
  return {
    source: i,
    target: l
  };
}
function mi(n, i, l = ye.Left, r = !1) {
  const s = (i?.x ?? 0) + n.internals.positionAbsolute.x, c = (i?.y ?? 0) + n.internals.positionAbsolute.y, { width: f, height: h } = i ?? Fn(n);
  if (r)
    return { x: s + f / 2, y: c + h / 2 };
  switch (i?.position ?? l) {
    case ye.Top:
      return { x: s + f / 2, y: c };
    case ye.Right:
      return { x: s + f, y: c + h / 2 };
    case ye.Bottom:
      return { x: s + f / 2, y: c + h };
    case ye.Left:
      return { x: s, y: c + h / 2 };
  }
}
function d0(n, i) {
  return n && (i ? n.find((l) => l.id === i) : n[0]) || null;
}
function md(n, i) {
  return n ? typeof n == "string" ? n : `${i ? `${i}__` : ""}${Object.keys(n).sort().map((r) => `${r}=${n[r]}`).join("&")}` : "";
}
function C2(n, { id: i, defaultColor: l, defaultMarkerStart: r, defaultMarkerEnd: s }) {
  const c = /* @__PURE__ */ new Set();
  return n.reduce((f, h) => ([h.markerStart || r, h.markerEnd || s].forEach((g) => {
    if (g && typeof g == "object") {
      const m = md(g, i);
      c.has(m) || (f.push({ id: m, color: g.color || l, ...g }), c.add(m));
    }
  }), f), []).sort((f, h) => f.id.localeCompare(h.id));
}
const vv = 1e3, M2 = 10, Hd = {
  nodeOrigin: [0, 0],
  nodeExtent: Rl,
  elevateNodesOnSelect: !0,
  zIndexMode: "basic",
  defaults: {}
}, T2 = {
  ...Hd,
  checkEquality: !0
};
function Bd(n, i) {
  const l = { ...n };
  for (const r in i)
    i[r] !== void 0 && (l[r] = i[r]);
  return l;
}
function j2(n, i, l) {
  const r = Bd(Hd, l);
  for (const s of n.values())
    if (s.parentId)
      Ud(s, n, i, r);
    else {
      const c = ql(s, r.nodeOrigin), f = yo(s.extent) ? s.extent : r.nodeExtent, h = gi(c, f, Fn(s));
      s.internals.positionAbsolute = h;
    }
}
function A2(n, i) {
  if (!n.handles)
    return n.measured ? i?.internals.handleBounds : void 0;
  const l = [], r = [];
  for (const s of n.handles) {
    const c = {
      id: s.id,
      width: s.width ?? 1,
      height: s.height ?? 1,
      nodeId: n.id,
      x: s.x,
      y: s.y,
      position: s.position,
      type: s.type
    };
    s.type === "source" ? l.push(c) : s.type === "target" && r.push(c);
  }
  return {
    source: l,
    target: r
  };
}
function Ld(n) {
  return n === "manual";
}
function pd(n, i, l, r = {}) {
  const s = Bd(T2, r), c = { i: 0 }, f = new Map(i), h = s?.elevateNodesOnSelect && !Ld(s.zIndexMode) ? vv : 0;
  let g = n.length > 0;
  i.clear(), l.clear();
  for (const m of n) {
    let y = f.get(m.id);
    if (s.checkEquality && m === y?.internals.userNode)
      i.set(m.id, y);
    else {
      const p = ql(m, s.nodeOrigin), v = yo(m.extent) ? m.extent : s.nodeExtent, x = gi(p, v, Fn(m));
      y = {
        ...s.defaults,
        ...m,
        measured: {
          width: m.measured?.width,
          height: m.measured?.height
        },
        internals: {
          positionAbsolute: x,
          // if user re-initializes the node or removes `measured` for whatever reason, we reset the handleBounds so that the node gets re-measured
          handleBounds: A2(m, y),
          z: bv(m, h, s.zIndexMode),
          userNode: m
        }
      }, i.set(m.id, y);
    }
    (y.measured === void 0 || y.measured.width === void 0 || y.measured.height === void 0) && !y.hidden && (g = !1), m.parentId && Ud(y, i, l, r, c);
  }
  return g;
}
function D2(n, i) {
  if (!n.parentId)
    return;
  const l = i.get(n.parentId);
  l ? l.set(n.id, n) : i.set(n.parentId, /* @__PURE__ */ new Map([[n.id, n]]));
}
function Ud(n, i, l, r, s) {
  const { elevateNodesOnSelect: c, nodeOrigin: f, nodeExtent: h, zIndexMode: g } = Bd(Hd, r), m = n.parentId, y = i.get(m);
  if (!y) {
    console.warn(`Parent node ${m} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
    return;
  }
  D2(n, l), s && !y.parentId && y.internals.rootParentIndex === void 0 && g === "auto" && (y.internals.rootParentIndex = ++s.i, y.internals.z = y.internals.z + s.i * M2), s && y.internals.rootParentIndex !== void 0 && (s.i = y.internals.rootParentIndex);
  const p = c && !Ld(g) ? vv : 0, { x: v, y: x, z: S } = O2(n, y, f, h, p, g), { positionAbsolute: C } = n.internals, j = v !== C.x || x !== C.y;
  (j || S !== n.internals.z) && i.set(n.id, {
    ...n,
    internals: {
      ...n.internals,
      positionAbsolute: j ? { x: v, y: x } : C,
      z: S
    }
  });
}
function bv(n, i, l) {
  const r = sn(n.zIndex) ? n.zIndex : 0;
  return Ld(l) ? r : r + (n.selected ? i : 0);
}
function O2(n, i, l, r, s, c) {
  const { x: f, y: h } = i.internals.positionAbsolute, g = Fn(n), m = ql(n, l), y = yo(n.extent) ? gi(m, n.extent, g) : m;
  let p = gi({ x: f + y.x, y: h + y.y }, r, g);
  n.extent === "parent" && (p = rv(p, g, i));
  const v = bv(n, s, c), x = i.internals.z ?? 0;
  return {
    x: p.x,
    y: p.y,
    z: x >= v ? x + 1 : v
  };
}
function Vd(n, i, l, r = [0, 0]) {
  const s = [], c = /* @__PURE__ */ new Map();
  for (const f of n) {
    const h = i.get(f.parentId);
    if (!h)
      continue;
    const g = c.get(f.parentId)?.expandedRect ?? po(h), m = uv(g, f.rect);
    c.set(f.parentId, { expandedRect: m, parent: h });
  }
  return c.size > 0 && c.forEach(({ expandedRect: f, parent: h }, g) => {
    const m = h.internals.positionAbsolute, y = Fn(h), p = h.origin ?? r, v = f.x < m.x ? Math.round(Math.abs(m.x - f.x)) : 0, x = f.y < m.y ? Math.round(Math.abs(m.y - f.y)) : 0, S = Math.max(y.width, Math.round(f.width)), C = Math.max(y.height, Math.round(f.height)), j = (S - y.width) * p[0], O = (C - y.height) * p[1];
    (v > 0 || x > 0 || j || O) && (s.push({
      id: g,
      type: "position",
      position: {
        x: h.position.x - v + j,
        y: h.position.y - x + O
      }
    }), l.get(g)?.forEach((D) => {
      n.some((E) => E.id === D.id) || s.push({
        id: D.id,
        type: "position",
        position: {
          x: D.position.x + v,
          y: D.position.y + x
        }
      });
    })), (y.width < f.width || y.height < f.height || v || x) && s.push({
      id: g,
      type: "dimensions",
      setAttributes: !0,
      dimensions: {
        width: S + (v ? p[0] * v - j : 0),
        height: C + (x ? p[1] * x - O : 0)
      }
    });
  }), s;
}
function z2(n, i, l, r, s, c, f) {
  const h = r?.querySelector(".xyflow__viewport");
  let g = !1;
  if (!h)
    return { changes: [], updatedInternals: g };
  const m = [], y = window.getComputedStyle(h), { m22: p } = new window.DOMMatrixReadOnly(y.transform), v = [];
  for (const x of n.values()) {
    const S = i.get(x.id);
    if (!S)
      continue;
    if (S.hidden) {
      i.set(S.id, {
        ...S,
        internals: {
          ...S.internals,
          handleBounds: void 0
        }
      }), g = !0;
      continue;
    }
    const C = Rd(x.nodeElement), j = S.measured.width !== C.width || S.measured.height !== C.height;
    if (!!(C.width && C.height && (j || !S.internals.handleBounds || x.force))) {
      const D = x.nodeElement.getBoundingClientRect(), E = yo(S.extent) ? S.extent : c;
      let { positionAbsolute: N } = S.internals;
      S.parentId && S.extent === "parent" ? N = rv(N, C, i.get(S.parentId)) : E && (N = gi(N, E, C));
      const k = {
        ...S,
        measured: C,
        internals: {
          ...S.internals,
          positionAbsolute: N,
          handleBounds: {
            source: l0("source", x.nodeElement, D, p, S.id),
            target: l0("target", x.nodeElement, D, p, S.id)
          }
        }
      };
      i.set(S.id, k), S.parentId && Ud(k, i, l, { nodeOrigin: s, zIndexMode: f }), g = !0, j && (m.push({
        id: S.id,
        type: "dimensions",
        dimensions: C
      }), S.expandParent && S.parentId && v.push({
        id: S.id,
        parentId: S.parentId,
        rect: po(k, s)
      }));
    }
  }
  if (v.length > 0) {
    const x = Vd(v, i, l, s);
    m.push(...x);
  }
  return { changes: m, updatedInternals: g };
}
async function R2({ delta: n, panZoom: i, transform: l, translateExtent: r, width: s, height: c }) {
  if (!i || !n.x && !n.y)
    return Promise.resolve(!1);
  const f = await i.setViewportConstrained({
    x: l[0] + n.x,
    y: l[1] + n.y,
    zoom: l[2]
  }, [
    [0, 0],
    [s, c]
  ], r), h = !!f && (f.x !== l[0] || f.y !== l[1] || f.k !== l[2]);
  return Promise.resolve(h);
}
function h0(n, i, l, r, s, c) {
  let f = s;
  const h = r.get(f) || /* @__PURE__ */ new Map();
  r.set(f, h.set(l, i)), f = `${s}-${n}`;
  const g = r.get(f) || /* @__PURE__ */ new Map();
  if (r.set(f, g.set(l, i)), c) {
    f = `${s}-${n}-${c}`;
    const m = r.get(f) || /* @__PURE__ */ new Map();
    r.set(f, m.set(l, i));
  }
}
function xv(n, i, l) {
  n.clear(), i.clear();
  for (const r of l) {
    const { source: s, target: c, sourceHandle: f = null, targetHandle: h = null } = r, g = { edgeId: r.id, source: s, target: c, sourceHandle: f, targetHandle: h }, m = `${s}-${f}--${c}-${h}`, y = `${c}-${h}--${s}-${f}`;
    h0("source", g, y, n, s, f), h0("target", g, m, n, c, h), i.set(r.id, r);
  }
}
function wv(n, i) {
  if (!n.parentId)
    return !1;
  const l = i.get(n.parentId);
  return l ? l.selected ? !0 : wv(l, i) : !1;
}
function g0(n, i, l) {
  let r = n;
  do {
    if (r?.matches?.(i))
      return !0;
    if (r === l)
      return !1;
    r = r?.parentElement;
  } while (r);
  return !1;
}
function k2(n, i, l, r) {
  const s = /* @__PURE__ */ new Map();
  for (const [c, f] of n)
    if ((f.selected || f.id === r) && (!f.parentId || !wv(f, n)) && (f.draggable || i && typeof f.draggable > "u")) {
      const h = n.get(c);
      h && s.set(c, {
        id: c,
        position: h.position || { x: 0, y: 0 },
        distance: {
          x: l.x - h.internals.positionAbsolute.x,
          y: l.y - h.internals.positionAbsolute.y
        },
        extent: h.extent,
        parentId: h.parentId,
        origin: h.origin,
        expandParent: h.expandParent,
        internals: {
          positionAbsolute: h.internals.positionAbsolute || { x: 0, y: 0 }
        },
        measured: {
          width: h.measured.width ?? 0,
          height: h.measured.height ?? 0
        }
      });
    }
  return s;
}
function Gf({ nodeId: n, dragItems: i, nodeLookup: l, dragging: r = !0 }) {
  const s = [];
  for (const [f, h] of i) {
    const g = l.get(f)?.internals.userNode;
    g && s.push({
      ...g,
      position: h.position,
      dragging: r
    });
  }
  if (!n)
    return [s[0], s];
  const c = l.get(n)?.internals.userNode;
  return [
    c ? {
      ...c,
      position: i.get(n)?.position || c.position,
      dragging: r
    } : s[0],
    s
  ];
}
function H2({ dragItems: n, snapGrid: i, x: l, y: r }) {
  const s = n.values().next().value;
  if (!s)
    return null;
  const c = {
    x: l - s.distance.x,
    y: r - s.distance.y
  }, f = Gl(c, i);
  return {
    x: f.x - c.x,
    y: f.y - c.y
  };
}
function B2({ onNodeMouseDown: n, getStoreItems: i, onDragStart: l, onDrag: r, onDragStop: s }) {
  let c = { x: null, y: null }, f = 0, h = /* @__PURE__ */ new Map(), g = !1, m = { x: 0, y: 0 }, y = null, p = !1, v = null, x = !1, S = !1, C = null;
  function j({ noDragClassName: D, handleSelector: E, domNode: N, isSelectable: k, nodeId: U, nodeClickDistance: V = 0 }) {
    v = It(N);
    function X({ x: Z, y: J }) {
      const { nodeLookup: M, nodeExtent: L, snapGrid: _, snapToGrid: z, nodeOrigin: B, onNodeDrag: $, onSelectionDrag: F, onError: A, updateNodePositions: I } = i();
      c = { x: Z, y: J };
      let G = !1;
      const H = h.size > 1, T = H && L ? hd(Xl(h)) : null, q = H && z ? H2({
        dragItems: h,
        snapGrid: _,
        x: Z,
        y: J
      }) : null;
      for (const [Q, P] of h) {
        if (!M.has(Q))
          continue;
        let ie = { x: Z - P.distance.x, y: J - P.distance.y };
        z && (ie = q ? {
          x: Math.round(ie.x + q.x),
          y: Math.round(ie.y + q.y)
        } : Gl(ie, _));
        let de = null;
        if (H && L && !P.extent && T) {
          const { positionAbsolute: xe } = P.internals, Se = xe.x - T.x + L[0][0], _e = xe.x + P.measured.width - T.x2 + L[1][0], De = xe.y - T.y + L[0][1], Pe = xe.y + P.measured.height - T.y2 + L[1][1];
          de = [
            [Se, De],
            [_e, Pe]
          ];
        }
        const { position: he, positionAbsolute: ge } = lv({
          nodeId: Q,
          nextPosition: ie,
          nodeLookup: M,
          nodeExtent: de || L,
          nodeOrigin: B,
          onError: A
        });
        G = G || P.position.x !== he.x || P.position.y !== he.y, P.position = he, P.internals.positionAbsolute = ge;
      }
      if (S = S || G, !!G && (I(h, !0), C && (r || $ || !U && F))) {
        const [Q, P] = Gf({
          nodeId: U,
          dragItems: h,
          nodeLookup: M
        });
        r?.(C, h, Q, P), $?.(C, Q, P), U || F?.(C, P);
      }
    }
    async function te() {
      if (!y)
        return;
      const { transform: Z, panBy: J, autoPanSpeed: M, autoPanOnNodeDrag: L } = i();
      if (!L) {
        g = !1, cancelAnimationFrame(f);
        return;
      }
      const [_, z] = sv(m, y, M);
      (_ !== 0 || z !== 0) && (c.x = (c.x ?? 0) - _ / Z[2], c.y = (c.y ?? 0) - z / Z[2], await J({ x: _, y: z }) && X(c)), f = requestAnimationFrame(te);
    }
    function K(Z) {
      const { nodeLookup: J, multiSelectionActive: M, nodesDraggable: L, transform: _, snapGrid: z, snapToGrid: B, selectNodesOnDrag: $, onNodeDragStart: F, onSelectionDragStart: A, unselectNodesAndEdges: I } = i();
      p = !0, (!$ || !k) && !M && U && (J.get(U)?.selected || I()), k && $ && U && n?.(U);
      const G = Ml(Z.sourceEvent, { transform: _, snapGrid: z, snapToGrid: B, containerBounds: y });
      if (c = G, h = k2(J, L, G, U), h.size > 0 && (l || F || !U && A)) {
        const [H, T] = Gf({
          nodeId: U,
          dragItems: h,
          nodeLookup: J
        });
        l?.(Z.sourceEvent, h, H, T), F?.(Z.sourceEvent, H, T), U || A?.(Z.sourceEvent, T);
      }
    }
    const Y = Uy().clickDistance(V).on("start", (Z) => {
      const { domNode: J, nodeDragThreshold: M, transform: L, snapGrid: _, snapToGrid: z } = i();
      y = J?.getBoundingClientRect() || null, x = !1, S = !1, C = Z.sourceEvent, M === 0 && K(Z), c = Ml(Z.sourceEvent, { transform: L, snapGrid: _, snapToGrid: z, containerBounds: y }), m = un(Z.sourceEvent, y);
    }).on("drag", (Z) => {
      const { autoPanOnNodeDrag: J, transform: M, snapGrid: L, snapToGrid: _, nodeDragThreshold: z, nodeLookup: B } = i(), $ = Ml(Z.sourceEvent, { transform: M, snapGrid: L, snapToGrid: _, containerBounds: y });
      if (C = Z.sourceEvent, (Z.sourceEvent.type === "touchmove" && Z.sourceEvent.touches.length > 1 || // if user deletes a node while dragging, we need to abort the drag to prevent errors
      U && !B.has(U)) && (x = !0), !x) {
        if (!g && J && p && (g = !0, te()), !p) {
          const F = un(Z.sourceEvent, y), A = F.x - m.x, I = F.y - m.y;
          Math.sqrt(A * A + I * I) > z && K(Z);
        }
        (c.x !== $.xSnapped || c.y !== $.ySnapped) && h && p && (m = un(Z.sourceEvent, y), X($));
      }
    }).on("end", (Z) => {
      if (!(!p || x) && (g = !1, p = !1, cancelAnimationFrame(f), h.size > 0)) {
        const { nodeLookup: J, updateNodePositions: M, onNodeDragStop: L, onSelectionDragStop: _ } = i();
        if (S && (M(h, !1), S = !1), s || L || !U && _) {
          const [z, B] = Gf({
            nodeId: U,
            dragItems: h,
            nodeLookup: J,
            dragging: !1
          });
          s?.(Z.sourceEvent, h, z, B), L?.(Z.sourceEvent, z, B), U || _?.(Z.sourceEvent, B);
        }
      }
    }).filter((Z) => {
      const J = Z.target;
      return !Z.button && (!D || !g0(J, `.${D}`, N)) && (!E || g0(J, E, N));
    });
    v.call(Y);
  }
  function O() {
    v?.on(".drag", null);
  }
  return {
    update: j,
    destroy: O
  };
}
function L2(n, i, l) {
  const r = [], s = {
    x: n.x - l,
    y: n.y - l,
    width: l * 2,
    height: l * 2
  };
  for (const c of i.values())
    Hl(s, po(c)) > 0 && r.push(c);
  return r;
}
const U2 = 250;
function V2(n, i, l, r) {
  let s = [], c = 1 / 0;
  const f = L2(n, l, i + U2);
  for (const h of f) {
    const g = [...h.internals.handleBounds?.source ?? [], ...h.internals.handleBounds?.target ?? []];
    for (const m of g) {
      if (r.nodeId === m.nodeId && r.type === m.type && r.id === m.id)
        continue;
      const { x: y, y: p } = mi(h, m, m.position, !0), v = Math.sqrt(Math.pow(y - n.x, 2) + Math.pow(p - n.y, 2));
      v > i || (v < c ? (s = [{ ...m, x: y, y: p }], c = v) : v === c && s.push({ ...m, x: y, y: p }));
    }
  }
  if (!s.length)
    return null;
  if (s.length > 1) {
    const h = r.type === "source" ? "target" : "source";
    return s.find((g) => g.type === h) ?? s[0];
  }
  return s[0];
}
function Sv(n, i, l, r, s, c = !1) {
  const f = r.get(n);
  if (!f)
    return null;
  const h = s === "strict" ? f.internals.handleBounds?.[i] : [...f.internals.handleBounds?.source ?? [], ...f.internals.handleBounds?.target ?? []], g = (l ? h?.find((m) => m.id === l) : h?.[0]) ?? null;
  return g && c ? { ...g, ...mi(f, g, g.position, !0) } : g;
}
function Ev(n, i) {
  return n || (i?.classList.contains("target") ? "target" : i?.classList.contains("source") ? "source" : null);
}
function Y2(n, i) {
  let l = null;
  return i ? l = !0 : n && !i && (l = !1), l;
}
const _v = () => !0;
function I2(n, { connectionMode: i, connectionRadius: l, handleId: r, nodeId: s, edgeUpdaterType: c, isTarget: f, domNode: h, nodeLookup: g, lib: m, autoPanOnConnect: y, flowId: p, panBy: v, cancelConnection: x, onConnectStart: S, onConnect: C, onConnectEnd: j, isValidConnection: O = _v, onReconnectEnd: D, updateConnection: E, getTransform: N, getFromHandle: k, autoPanSpeed: U, dragThreshold: V = 1, handleDomNode: X }) {
  const te = dv(n.target);
  let K = 0, Y;
  const { x: Z, y: J } = un(n), M = Ev(c, X), L = h?.getBoundingClientRect();
  let _ = !1;
  if (!L || !M)
    return;
  const z = Sv(s, M, r, g, i);
  if (!z)
    return;
  let B = un(n, L), $ = !1, F = null, A = !1, I = null;
  function G() {
    if (!y || !L)
      return;
    const [he, ge] = sv(B, L, U);
    v({ x: he, y: ge }), K = requestAnimationFrame(G);
  }
  const H = {
    ...z,
    nodeId: s,
    type: M,
    position: z.position
  }, T = g.get(s);
  let Q = {
    inProgress: !0,
    isValid: null,
    from: mi(T, H, ye.Left, !0),
    fromHandle: H,
    fromPosition: H.position,
    fromNode: T,
    to: B,
    toHandle: null,
    toPosition: n0[H.position],
    toNode: null,
    pointer: B
  };
  function P() {
    _ = !0, E(Q), S?.(n, { nodeId: s, handleId: r, handleType: M });
  }
  V === 0 && P();
  function ie(he) {
    if (!_) {
      const { x: Pe, y: Et } = un(he), zt = Pe - Z, en = Et - J;
      if (!(zt * zt + en * en > V * V))
        return;
      P();
    }
    if (!k() || !H) {
      de(he);
      return;
    }
    const ge = N();
    B = un(he, L), Y = V2($l(B, ge, !1, [1, 1]), l, g, H), $ || (G(), $ = !0);
    const xe = Nv(he, {
      handle: Y,
      connectionMode: i,
      fromNodeId: s,
      fromHandleId: r,
      fromType: f ? "target" : "source",
      isValidConnection: O,
      doc: te,
      lib: m,
      flowId: p,
      nodeLookup: g
    });
    I = xe.handleDomNode, F = xe.connection, A = Y2(!!Y, xe.isValid);
    const Se = g.get(s), _e = Se ? mi(Se, H, ye.Left, !0) : Q.from, De = {
      ...Q,
      from: _e,
      isValid: A,
      to: xe.toHandle && A ? Ps({ x: xe.toHandle.x, y: xe.toHandle.y }, ge) : B,
      toHandle: xe.toHandle,
      toPosition: A && xe.toHandle ? xe.toHandle.position : n0[H.position],
      toNode: xe.toHandle ? g.get(xe.toHandle.nodeId) : null,
      pointer: B
    };
    E(De), Q = De;
  }
  function de(he) {
    if (!("touches" in he && he.touches.length > 0)) {
      if (_) {
        (Y || I) && F && A && C?.(F);
        const { inProgress: ge, ...xe } = Q, Se = {
          ...xe,
          toPosition: Q.toHandle ? Q.toPosition : null
        };
        j?.(he, Se), c && D?.(he, Se);
      }
      x(), cancelAnimationFrame(K), $ = !1, A = !1, F = null, I = null, te.removeEventListener("mousemove", ie), te.removeEventListener("mouseup", de), te.removeEventListener("touchmove", ie), te.removeEventListener("touchend", de);
    }
  }
  te.addEventListener("mousemove", ie), te.addEventListener("mouseup", de), te.addEventListener("touchmove", ie), te.addEventListener("touchend", de);
}
function Nv(n, { handle: i, connectionMode: l, fromNodeId: r, fromHandleId: s, fromType: c, doc: f, lib: h, flowId: g, isValidConnection: m = _v, nodeLookup: y }) {
  const p = c === "target", v = i ? f.querySelector(`.${h}-flow__handle[data-id="${g}-${i?.nodeId}-${i?.id}-${i?.type}"]`) : null, { x, y: S } = un(n), C = f.elementFromPoint(x, S), j = C?.classList.contains(`${h}-flow__handle`) ? C : v, O = {
    handleDomNode: j,
    isValid: !1,
    connection: null,
    toHandle: null
  };
  if (j) {
    const D = Ev(void 0, j), E = j.getAttribute("data-nodeid"), N = j.getAttribute("data-handleid"), k = j.classList.contains("connectable"), U = j.classList.contains("connectableend");
    if (!E || !D)
      return O;
    const V = {
      source: p ? E : r,
      sourceHandle: p ? N : s,
      target: p ? r : E,
      targetHandle: p ? s : N
    };
    O.connection = V;
    const te = k && U && (l === go.Strict ? p && D === "source" || !p && D === "target" : E !== r || N !== s);
    O.isValid = te && m(V), O.toHandle = Sv(E, D, N, y, l, !0);
  }
  return O;
}
const yd = {
  onPointerDown: I2,
  isValid: Nv
};
function q2({ domNode: n, panZoom: i, getTransform: l, getViewScale: r }) {
  const s = It(n);
  function c({ translateExtent: h, width: g, height: m, zoomStep: y = 1, pannable: p = !0, zoomable: v = !0, inversePan: x = !1 }) {
    const S = (E) => {
      if (E.sourceEvent.type !== "wheel" || !i)
        return;
      const N = l(), k = E.sourceEvent.ctrlKey && Bl() ? 10 : 1, U = -E.sourceEvent.deltaY * (E.sourceEvent.deltaMode === 1 ? 0.05 : E.sourceEvent.deltaMode ? 1 : 2e-3) * y, V = N[2] * Math.pow(2, U * k);
      i.scaleTo(V);
    };
    let C = [0, 0];
    const j = (E) => {
      (E.sourceEvent.type === "mousedown" || E.sourceEvent.type === "touchstart") && (C = [
        E.sourceEvent.clientX ?? E.sourceEvent.touches[0].clientX,
        E.sourceEvent.clientY ?? E.sourceEvent.touches[0].clientY
      ]);
    }, O = (E) => {
      const N = l();
      if (E.sourceEvent.type !== "mousemove" && E.sourceEvent.type !== "touchmove" || !i)
        return;
      const k = [
        E.sourceEvent.clientX ?? E.sourceEvent.touches[0].clientX,
        E.sourceEvent.clientY ?? E.sourceEvent.touches[0].clientY
      ], U = [k[0] - C[0], k[1] - C[1]];
      C = k;
      const V = r() * Math.max(N[2], Math.log(N[2])) * (x ? -1 : 1), X = {
        x: N[0] - U[0] * V,
        y: N[1] - U[1] * V
      }, te = [
        [0, 0],
        [g, m]
      ];
      i.setViewportConstrained({
        x: X.x,
        y: X.y,
        zoom: N[2]
      }, te, h);
    }, D = ev().on("start", j).on("zoom", p ? O : null).on("zoom.wheel", v ? S : null);
    s.call(D, {});
  }
  function f() {
    s.on("zoom", null);
  }
  return {
    update: c,
    destroy: f,
    pointer: ln
  };
}
const fu = (n) => ({
  x: n.x,
  y: n.y,
  zoom: n.k
}), $f = ({ x: n, y: i, zoom: l }) => su.translate(n, i).scale(l), ro = (n, i) => n.target.closest(`.${i}`), Cv = (n, i) => i === 2 && Array.isArray(n) && n.includes(2), X2 = (n) => ((n *= 2) <= 1 ? n * n * n : (n -= 2) * n * n + 2) / 2, Zf = (n, i = 0, l = X2, r = () => {
}) => {
  const s = typeof i == "number" && i > 0;
  return s || r(), s ? n.transition().duration(i).ease(l).on("end", r) : n;
}, Mv = (n) => {
  const i = n.ctrlKey && Bl() ? 10 : 1;
  return -n.deltaY * (n.deltaMode === 1 ? 0.05 : n.deltaMode ? 1 : 2e-3) * i;
};
function G2({ zoomPanValues: n, noWheelClassName: i, d3Selection: l, d3Zoom: r, panOnScrollMode: s, panOnScrollSpeed: c, zoomOnPinch: f, onPanZoomStart: h, onPanZoom: g, onPanZoomEnd: m }) {
  return (y) => {
    if (ro(y, i))
      return y.ctrlKey && y.preventDefault(), !1;
    y.preventDefault(), y.stopImmediatePropagation();
    const p = l.property("__zoom").k || 1;
    if (y.ctrlKey && f) {
      const j = ln(y), O = Mv(y), D = p * Math.pow(2, O);
      r.scaleTo(l, D, j, y);
      return;
    }
    const v = y.deltaMode === 1 ? 20 : 1;
    let x = s === fi.Vertical ? 0 : y.deltaX * v, S = s === fi.Horizontal ? 0 : y.deltaY * v;
    !Bl() && y.shiftKey && s !== fi.Vertical && (x = y.deltaY * v, S = 0), r.translateBy(
      l,
      -(x / p) * c,
      -(S / p) * c,
      // @ts-ignore
      { internal: !0 }
    );
    const C = fu(l.property("__zoom"));
    clearTimeout(n.panScrollTimeout), n.isPanScrolling ? (g?.(y, C), n.panScrollTimeout = setTimeout(() => {
      m?.(y, C), n.isPanScrolling = !1;
    }, 150)) : (n.isPanScrolling = !0, h?.(y, C));
  };
}
function $2({ noWheelClassName: n, preventScrolling: i, d3ZoomHandler: l }) {
  return function(r, s) {
    const c = r.type === "wheel", f = !i && c && !r.ctrlKey, h = ro(r, n);
    if (r.ctrlKey && c && h && r.preventDefault(), f || h)
      return null;
    r.preventDefault(), l.call(this, r, s);
  };
}
function Z2({ zoomPanValues: n, onDraggingChange: i, onPanZoomStart: l }) {
  return (r) => {
    if (r.sourceEvent?.internal)
      return;
    const s = fu(r.transform);
    n.mouseButton = r.sourceEvent?.button || 0, n.isZoomingOrPanning = !0, n.prevViewport = s, r.sourceEvent?.type === "mousedown" && i(!0), l && l?.(r.sourceEvent, s);
  };
}
function Q2({ zoomPanValues: n, panOnDrag: i, onPaneContextMenu: l, onTransformChange: r, onPanZoom: s }) {
  return (c) => {
    n.usedRightMouseButton = !!(l && Cv(i, n.mouseButton ?? 0)), c.sourceEvent?.sync || r([c.transform.x, c.transform.y, c.transform.k]), s && !c.sourceEvent?.internal && s?.(c.sourceEvent, fu(c.transform));
  };
}
function K2({ zoomPanValues: n, panOnDrag: i, panOnScroll: l, onDraggingChange: r, onPanZoomEnd: s, onPaneContextMenu: c }) {
  return (f) => {
    if (!f.sourceEvent?.internal && (n.isZoomingOrPanning = !1, c && Cv(i, n.mouseButton ?? 0) && !n.usedRightMouseButton && f.sourceEvent && c(f.sourceEvent), n.usedRightMouseButton = !1, r(!1), s)) {
      const h = fu(f.transform);
      n.prevViewport = h, clearTimeout(n.timerId), n.timerId = setTimeout(
        () => {
          s?.(f.sourceEvent, h);
        },
        // we need a setTimeout for panOnScroll to supress multiple end events fired during scroll
        l ? 150 : 0
      );
    }
  };
}
function J2({ zoomActivationKeyPressed: n, zoomOnScroll: i, zoomOnPinch: l, panOnDrag: r, panOnScroll: s, zoomOnDoubleClick: c, userSelectionActive: f, noWheelClassName: h, noPanClassName: g, lib: m, connectionInProgress: y }) {
  return (p) => {
    const v = n || i, x = l && p.ctrlKey, S = p.type === "wheel";
    if (p.button === 1 && p.type === "mousedown" && (ro(p, `${m}-flow__node`) || ro(p, `${m}-flow__edge`)))
      return !0;
    if (!r && !v && !s && !c && !l || f || y && !S || ro(p, h) && S || ro(p, g) && (!S || s && S && !n) || !l && p.ctrlKey && S)
      return !1;
    if (!l && p.type === "touchstart" && p.touches?.length > 1)
      return p.preventDefault(), !1;
    if (!v && !s && !x && S || !r && (p.type === "mousedown" || p.type === "touchstart") || Array.isArray(r) && !r.includes(p.button) && p.type === "mousedown")
      return !1;
    const C = Array.isArray(r) && r.includes(p.button) || !p.button || p.button <= 1;
    return (!p.ctrlKey || S) && C;
  };
}
function W2({ domNode: n, minZoom: i, maxZoom: l, translateExtent: r, viewport: s, onPanZoom: c, onPanZoomStart: f, onPanZoomEnd: h, onDraggingChange: g }) {
  const m = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: {},
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, y = n.getBoundingClientRect(), p = ev().scaleExtent([i, l]).translateExtent(r), v = It(n).call(p);
  D({
    x: s.x,
    y: s.y,
    zoom: mo(s.zoom, i, l)
  }, [
    [0, 0],
    [y.width, y.height]
  ], r);
  const x = v.on("wheel.zoom"), S = v.on("dblclick.zoom");
  p.wheelDelta(Mv);
  function C(Y, Z) {
    return v ? new Promise((J) => {
      p?.interpolate(Z?.interpolate === "linear" ? Cl : Hs).transform(Zf(v, Z?.duration, Z?.ease, () => J(!0)), Y);
    }) : Promise.resolve(!1);
  }
  function j({ noWheelClassName: Y, noPanClassName: Z, onPaneContextMenu: J, userSelectionActive: M, panOnScroll: L, panOnDrag: _, panOnScrollMode: z, panOnScrollSpeed: B, preventScrolling: $, zoomOnPinch: F, zoomOnScroll: A, zoomOnDoubleClick: I, zoomActivationKeyPressed: G, lib: H, onTransformChange: T, connectionInProgress: q, paneClickDistance: Q, selectionOnDrag: P }) {
    M && !m.isZoomingOrPanning && O();
    const ie = L && !G && !M;
    p.clickDistance(P ? 1 / 0 : !sn(Q) || Q < 0 ? 0 : Q);
    const de = ie ? G2({
      zoomPanValues: m,
      noWheelClassName: Y,
      d3Selection: v,
      d3Zoom: p,
      panOnScrollMode: z,
      panOnScrollSpeed: B,
      zoomOnPinch: F,
      onPanZoomStart: f,
      onPanZoom: c,
      onPanZoomEnd: h
    }) : $2({
      noWheelClassName: Y,
      preventScrolling: $,
      d3ZoomHandler: x
    });
    if (v.on("wheel.zoom", de, { passive: !1 }), !M) {
      const ge = Z2({
        zoomPanValues: m,
        onDraggingChange: g,
        onPanZoomStart: f
      });
      p.on("start", ge);
      const xe = Q2({
        zoomPanValues: m,
        panOnDrag: _,
        onPaneContextMenu: !!J,
        onPanZoom: c,
        onTransformChange: T
      });
      p.on("zoom", xe);
      const Se = K2({
        zoomPanValues: m,
        panOnDrag: _,
        panOnScroll: L,
        onPaneContextMenu: J,
        onPanZoomEnd: h,
        onDraggingChange: g
      });
      p.on("end", Se);
    }
    const he = J2({
      zoomActivationKeyPressed: G,
      panOnDrag: _,
      zoomOnScroll: A,
      panOnScroll: L,
      zoomOnDoubleClick: I,
      zoomOnPinch: F,
      userSelectionActive: M,
      noPanClassName: Z,
      noWheelClassName: Y,
      lib: H,
      connectionInProgress: q
    });
    p.filter(he), I ? v.on("dblclick.zoom", S) : v.on("dblclick.zoom", null);
  }
  function O() {
    p.on("zoom", null);
  }
  async function D(Y, Z, J) {
    const M = $f(Y), L = p?.constrain()(M, Z, J);
    return L && await C(L), new Promise((_) => _(L));
  }
  async function E(Y, Z) {
    const J = $f(Y);
    return await C(J, Z), new Promise((M) => M(J));
  }
  function N(Y) {
    if (v) {
      const Z = $f(Y), J = v.property("__zoom");
      (J.k !== Y.zoom || J.x !== Y.x || J.y !== Y.y) && p?.transform(v, Z, null, { sync: !0 });
    }
  }
  function k() {
    const Y = v ? Py(v.node()) : { x: 0, y: 0, k: 1 };
    return { x: Y.x, y: Y.y, zoom: Y.k };
  }
  function U(Y, Z) {
    return v ? new Promise((J) => {
      p?.interpolate(Z?.interpolate === "linear" ? Cl : Hs).scaleTo(Zf(v, Z?.duration, Z?.ease, () => J(!0)), Y);
    }) : Promise.resolve(!1);
  }
  function V(Y, Z) {
    return v ? new Promise((J) => {
      p?.interpolate(Z?.interpolate === "linear" ? Cl : Hs).scaleBy(Zf(v, Z?.duration, Z?.ease, () => J(!0)), Y);
    }) : Promise.resolve(!1);
  }
  function X(Y) {
    p?.scaleExtent(Y);
  }
  function te(Y) {
    p?.translateExtent(Y);
  }
  function K(Y) {
    const Z = !sn(Y) || Y < 0 ? 0 : Y;
    p?.clickDistance(Z);
  }
  return {
    update: j,
    destroy: O,
    setViewport: E,
    setViewportConstrained: D,
    getViewport: k,
    scaleTo: U,
    scaleBy: V,
    setScaleExtent: X,
    setTranslateExtent: te,
    syncViewport: N,
    setClickDistance: K
  };
}
var vo;
(function(n) {
  n.Line = "line", n.Handle = "handle";
})(vo || (vo = {}));
function F2({ width: n, prevWidth: i, height: l, prevHeight: r, affectsX: s, affectsY: c }) {
  const f = n - i, h = l - r, g = [f > 0 ? 1 : f < 0 ? -1 : 0, h > 0 ? 1 : h < 0 ? -1 : 0];
  return f && s && (g[0] = g[0] * -1), h && c && (g[1] = g[1] * -1), g;
}
function m0(n) {
  const i = n.includes("right") || n.includes("left"), l = n.includes("bottom") || n.includes("top"), r = n.includes("left"), s = n.includes("top");
  return {
    isHorizontal: i,
    isVertical: l,
    affectsX: r,
    affectsY: s
  };
}
function Ta(n, i) {
  return Math.max(0, i - n);
}
function ja(n, i) {
  return Math.max(0, n - i);
}
function Ts(n, i, l) {
  return Math.max(0, i - n, n - l);
}
function p0(n, i) {
  return n ? !i : i;
}
function P2(n, i, l, r, s, c, f, h) {
  let { affectsX: g, affectsY: m } = i;
  const { isHorizontal: y, isVertical: p } = i, v = y && p, { xSnapped: x, ySnapped: S } = l, { minWidth: C, maxWidth: j, minHeight: O, maxHeight: D } = r, { x: E, y: N, width: k, height: U, aspectRatio: V } = n;
  let X = Math.floor(y ? x - n.pointerX : 0), te = Math.floor(p ? S - n.pointerY : 0);
  const K = k + (g ? -X : X), Y = U + (m ? -te : te), Z = -c[0] * k, J = -c[1] * U;
  let M = Ts(K, C, j), L = Ts(Y, O, D);
  if (f) {
    let B = 0, $ = 0;
    g && X < 0 ? B = Ta(E + X + Z, f[0][0]) : !g && X > 0 && (B = ja(E + K + Z, f[1][0])), m && te < 0 ? $ = Ta(N + te + J, f[0][1]) : !m && te > 0 && ($ = ja(N + Y + J, f[1][1])), M = Math.max(M, B), L = Math.max(L, $);
  }
  if (h) {
    let B = 0, $ = 0;
    g && X > 0 ? B = ja(E + X, h[0][0]) : !g && X < 0 && (B = Ta(E + K, h[1][0])), m && te > 0 ? $ = ja(N + te, h[0][1]) : !m && te < 0 && ($ = Ta(N + Y, h[1][1])), M = Math.max(M, B), L = Math.max(L, $);
  }
  if (s) {
    if (y) {
      const B = Ts(K / V, O, D) * V;
      if (M = Math.max(M, B), f) {
        let $ = 0;
        !g && !m || g && !m && v ? $ = ja(N + J + K / V, f[1][1]) * V : $ = Ta(N + J + (g ? X : -X) / V, f[0][1]) * V, M = Math.max(M, $);
      }
      if (h) {
        let $ = 0;
        !g && !m || g && !m && v ? $ = Ta(N + K / V, h[1][1]) * V : $ = ja(N + (g ? X : -X) / V, h[0][1]) * V, M = Math.max(M, $);
      }
    }
    if (p) {
      const B = Ts(Y * V, C, j) / V;
      if (L = Math.max(L, B), f) {
        let $ = 0;
        !g && !m || m && !g && v ? $ = ja(E + Y * V + Z, f[1][0]) / V : $ = Ta(E + (m ? te : -te) * V + Z, f[0][0]) / V, L = Math.max(L, $);
      }
      if (h) {
        let $ = 0;
        !g && !m || m && !g && v ? $ = Ta(E + Y * V, h[1][0]) / V : $ = ja(E + (m ? te : -te) * V, h[0][0]) / V, L = Math.max(L, $);
      }
    }
  }
  te = te + (te < 0 ? L : -L), X = X + (X < 0 ? M : -M), s && (v ? K > Y * V ? te = (p0(g, m) ? -X : X) / V : X = (p0(g, m) ? -te : te) * V : y ? (te = X / V, m = g) : (X = te * V, g = m));
  const _ = g ? E + X : E, z = m ? N + te : N;
  return {
    width: k + (g ? -X : X),
    height: U + (m ? -te : te),
    x: c[0] * X * (g ? -1 : 1) + _,
    y: c[1] * te * (m ? -1 : 1) + z
  };
}
const Tv = { width: 0, height: 0, x: 0, y: 0 }, eN = {
  ...Tv,
  pointerX: 0,
  pointerY: 0,
  aspectRatio: 1
};
function tN(n) {
  return [
    [0, 0],
    [n.measured.width, n.measured.height]
  ];
}
function nN(n, i, l) {
  const r = i.position.x + n.position.x, s = i.position.y + n.position.y, c = n.measured.width ?? 0, f = n.measured.height ?? 0, h = l[0] * c, g = l[1] * f;
  return [
    [r - h, s - g],
    [r + c - h, s + f - g]
  ];
}
function aN({ domNode: n, nodeId: i, getStoreItems: l, onChange: r, onEnd: s }) {
  const c = It(n);
  let f = {
    controlDirection: m0("bottom-right"),
    boundaries: {
      minWidth: 0,
      minHeight: 0,
      maxWidth: Number.MAX_VALUE,
      maxHeight: Number.MAX_VALUE
    },
    resizeDirection: void 0,
    keepAspectRatio: !1
  };
  function h({ controlPosition: m, boundaries: y, keepAspectRatio: p, resizeDirection: v, onResizeStart: x, onResize: S, onResizeEnd: C, shouldResize: j }) {
    let O = { ...Tv }, D = { ...eN };
    f = {
      boundaries: y,
      resizeDirection: v,
      keepAspectRatio: p,
      controlDirection: m0(m)
    };
    let E, N = null, k = [], U, V, X, te = !1;
    const K = Uy().on("start", (Y) => {
      const { nodeLookup: Z, transform: J, snapGrid: M, snapToGrid: L, nodeOrigin: _, paneDomNode: z } = l();
      if (E = Z.get(i), !E)
        return;
      N = z?.getBoundingClientRect() ?? null;
      const { xSnapped: B, ySnapped: $ } = Ml(Y.sourceEvent, {
        transform: J,
        snapGrid: M,
        snapToGrid: L,
        containerBounds: N
      });
      O = {
        width: E.measured.width ?? 0,
        height: E.measured.height ?? 0,
        x: E.position.x ?? 0,
        y: E.position.y ?? 0
      }, D = {
        ...O,
        pointerX: B,
        pointerY: $,
        aspectRatio: O.width / O.height
      }, U = void 0, E.parentId && (E.extent === "parent" || E.expandParent) && (U = Z.get(E.parentId), V = U && E.extent === "parent" ? tN(U) : void 0), k = [], X = void 0;
      for (const [F, A] of Z)
        if (A.parentId === i && (k.push({
          id: F,
          position: { ...A.position },
          extent: A.extent
        }), A.extent === "parent" || A.expandParent)) {
          const I = nN(A, E, A.origin ?? _);
          X ? X = [
            [Math.min(I[0][0], X[0][0]), Math.min(I[0][1], X[0][1])],
            [Math.max(I[1][0], X[1][0]), Math.max(I[1][1], X[1][1])]
          ] : X = I;
        }
      x?.(Y, { ...O });
    }).on("drag", (Y) => {
      const { transform: Z, snapGrid: J, snapToGrid: M, nodeOrigin: L } = l(), _ = Ml(Y.sourceEvent, {
        transform: Z,
        snapGrid: J,
        snapToGrid: M,
        containerBounds: N
      }), z = [];
      if (!E)
        return;
      const { x: B, y: $, width: F, height: A } = O, I = {}, G = E.origin ?? L, { width: H, height: T, x: q, y: Q } = P2(D, f.controlDirection, _, f.boundaries, f.keepAspectRatio, G, V, X), P = H !== F, ie = T !== A, de = q !== B && P, he = Q !== $ && ie;
      if (!de && !he && !P && !ie)
        return;
      if ((de || he || G[0] === 1 || G[1] === 1) && (I.x = de ? q : O.x, I.y = he ? Q : O.y, O.x = I.x, O.y = I.y, k.length > 0)) {
        const _e = q - B, De = Q - $;
        for (const Pe of k)
          Pe.position = {
            x: Pe.position.x - _e + G[0] * (H - F),
            y: Pe.position.y - De + G[1] * (T - A)
          }, z.push(Pe);
      }
      if ((P || ie) && (I.width = P && (!f.resizeDirection || f.resizeDirection === "horizontal") ? H : O.width, I.height = ie && (!f.resizeDirection || f.resizeDirection === "vertical") ? T : O.height, O.width = I.width, O.height = I.height), U && E.expandParent) {
        const _e = G[0] * (I.width ?? 0);
        I.x && I.x < _e && (O.x = _e, D.x = D.x - (I.x - _e));
        const De = G[1] * (I.height ?? 0);
        I.y && I.y < De && (O.y = De, D.y = D.y - (I.y - De));
      }
      const ge = F2({
        width: O.width,
        prevWidth: F,
        height: O.height,
        prevHeight: A,
        affectsX: f.controlDirection.affectsX,
        affectsY: f.controlDirection.affectsY
      }), xe = { ...O, direction: ge };
      j?.(Y, xe) !== !1 && (te = !0, S?.(Y, xe), r(I, z));
    }).on("end", (Y) => {
      te && (C?.(Y, { ...O }), s?.({ ...O }), te = !1);
    });
    c.call(K);
  }
  function g() {
    c.on(".drag", null);
  }
  return {
    update: h,
    destroy: g
  };
}
var Qf = { exports: {} }, Kf = {}, Jf = { exports: {} }, Wf = {};
var y0;
function iN() {
  if (y0) return Wf;
  y0 = 1;
  var n = Ul();
  function i(p, v) {
    return p === v && (p !== 0 || 1 / p === 1 / v) || p !== p && v !== v;
  }
  var l = typeof Object.is == "function" ? Object.is : i, r = n.useState, s = n.useEffect, c = n.useLayoutEffect, f = n.useDebugValue;
  function h(p, v) {
    var x = v(), S = r({ inst: { value: x, getSnapshot: v } }), C = S[0].inst, j = S[1];
    return c(
      function() {
        C.value = x, C.getSnapshot = v, g(C) && j({ inst: C });
      },
      [p, x, v]
    ), s(
      function() {
        return g(C) && j({ inst: C }), p(function() {
          g(C) && j({ inst: C });
        });
      },
      [p]
    ), f(x), x;
  }
  function g(p) {
    var v = p.getSnapshot;
    p = p.value;
    try {
      var x = v();
      return !l(p, x);
    } catch {
      return !0;
    }
  }
  function m(p, v) {
    return v();
  }
  var y = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? m : h;
  return Wf.useSyncExternalStore = n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : y, Wf;
}
var v0;
function oN() {
  return v0 || (v0 = 1, Jf.exports = iN()), Jf.exports;
}
var b0;
function lN() {
  if (b0) return Kf;
  b0 = 1;
  var n = Ul(), i = oN();
  function l(m, y) {
    return m === y && (m !== 0 || 1 / m === 1 / y) || m !== m && y !== y;
  }
  var r = typeof Object.is == "function" ? Object.is : l, s = i.useSyncExternalStore, c = n.useRef, f = n.useEffect, h = n.useMemo, g = n.useDebugValue;
  return Kf.useSyncExternalStoreWithSelector = function(m, y, p, v, x) {
    var S = c(null);
    if (S.current === null) {
      var C = { hasValue: !1, value: null };
      S.current = C;
    } else C = S.current;
    S = h(
      function() {
        function O(U) {
          if (!D) {
            if (D = !0, E = U, U = v(U), x !== void 0 && C.hasValue) {
              var V = C.value;
              if (x(V, U))
                return N = V;
            }
            return N = U;
          }
          if (V = N, r(E, U)) return V;
          var X = v(U);
          return x !== void 0 && x(V, X) ? (E = U, V) : (E = U, N = X);
        }
        var D = !1, E, N, k = p === void 0 ? null : p;
        return [
          function() {
            return O(y());
          },
          k === null ? void 0 : function() {
            return O(k());
          }
        ];
      },
      [y, p, v, x]
    );
    var j = s(m, S[0], S[1]);
    return f(
      function() {
        C.hasValue = !0, C.value = j;
      },
      [j]
    ), g(j), j;
  }, Kf;
}
var x0;
function rN() {
  return x0 || (x0 = 1, Qf.exports = lN()), Qf.exports;
}
var sN = rN();
const uN = /* @__PURE__ */ cy(sN), cN = {}, w0 = (n) => {
  let i;
  const l = /* @__PURE__ */ new Set(), r = (y, p) => {
    const v = typeof y == "function" ? y(i) : y;
    if (!Object.is(v, i)) {
      const x = i;
      i = p ?? (typeof v != "object" || v === null) ? v : Object.assign({}, i, v), l.forEach((S) => S(i, x));
    }
  }, s = () => i, g = { setState: r, getState: s, getInitialState: () => m, subscribe: (y) => (l.add(y), () => l.delete(y)), destroy: () => {
    (cN ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), l.clear();
  } }, m = i = n(r, s, g);
  return g;
}, fN = (n) => n ? w0(n) : w0, { useDebugValue: dN } = vl, { useSyncExternalStoreWithSelector: hN } = uN, gN = (n) => n;
function jv(n, i = gN, l) {
  const r = hN(
    n.subscribe,
    n.getState,
    n.getServerState || n.getInitialState,
    i,
    l
  );
  return dN(r), r;
}
const S0 = (n, i) => {
  const l = fN(n), r = (s, c = i) => jv(l, s, c);
  return Object.assign(r, l), r;
}, mN = (n, i) => n ? S0(n, i) : S0;
function Ke(n, i) {
  if (Object.is(n, i))
    return !0;
  if (typeof n != "object" || n === null || typeof i != "object" || i === null)
    return !1;
  if (n instanceof Map && i instanceof Map) {
    if (n.size !== i.size) return !1;
    for (const [r, s] of n)
      if (!Object.is(s, i.get(r)))
        return !1;
    return !0;
  }
  if (n instanceof Set && i instanceof Set) {
    if (n.size !== i.size) return !1;
    for (const r of n)
      if (!i.has(r))
        return !1;
    return !0;
  }
  const l = Object.keys(n);
  if (l.length !== Object.keys(i).length)
    return !1;
  for (const r of l)
    if (!Object.prototype.hasOwnProperty.call(i, r) || !Object.is(n[r], i[r]))
      return !1;
  return !0;
}
var Ff = { exports: {} }, bt = {};
var E0;
function pN() {
  if (E0) return bt;
  E0 = 1;
  var n = Ul();
  function i(g) {
    var m = "https://react.dev/errors/" + g;
    if (1 < arguments.length) {
      m += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var y = 2; y < arguments.length; y++)
        m += "&args[]=" + encodeURIComponent(arguments[y]);
    }
    return "Minified React error #" + g + "; visit " + m + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function l() {
  }
  var r = {
    d: {
      f: l,
      r: function() {
        throw Error(i(522));
      },
      D: l,
      C: l,
      L: l,
      m: l,
      X: l,
      S: l,
      M: l
    },
    p: 0,
    findDOMNode: null
  }, s = /* @__PURE__ */ Symbol.for("react.portal");
  function c(g, m, y) {
    var p = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: s,
      key: p == null ? null : "" + p,
      children: g,
      containerInfo: m,
      implementation: y
    };
  }
  var f = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function h(g, m) {
    if (g === "font") return "";
    if (typeof m == "string")
      return m === "use-credentials" ? m : "";
  }
  return bt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r, bt.createPortal = function(g, m) {
    var y = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!m || m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11)
      throw Error(i(299));
    return c(g, m, null, y);
  }, bt.flushSync = function(g) {
    var m = f.T, y = r.p;
    try {
      if (f.T = null, r.p = 2, g) return g();
    } finally {
      f.T = m, r.p = y, r.d.f();
    }
  }, bt.preconnect = function(g, m) {
    typeof g == "string" && (m ? (m = m.crossOrigin, m = typeof m == "string" ? m === "use-credentials" ? m : "" : void 0) : m = null, r.d.C(g, m));
  }, bt.prefetchDNS = function(g) {
    typeof g == "string" && r.d.D(g);
  }, bt.preinit = function(g, m) {
    if (typeof g == "string" && m && typeof m.as == "string") {
      var y = m.as, p = h(y, m.crossOrigin), v = typeof m.integrity == "string" ? m.integrity : void 0, x = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0;
      y === "style" ? r.d.S(
        g,
        typeof m.precedence == "string" ? m.precedence : void 0,
        {
          crossOrigin: p,
          integrity: v,
          fetchPriority: x
        }
      ) : y === "script" && r.d.X(g, {
        crossOrigin: p,
        integrity: v,
        fetchPriority: x,
        nonce: typeof m.nonce == "string" ? m.nonce : void 0
      });
    }
  }, bt.preinitModule = function(g, m) {
    if (typeof g == "string")
      if (typeof m == "object" && m !== null) {
        if (m.as == null || m.as === "script") {
          var y = h(
            m.as,
            m.crossOrigin
          );
          r.d.M(g, {
            crossOrigin: y,
            integrity: typeof m.integrity == "string" ? m.integrity : void 0,
            nonce: typeof m.nonce == "string" ? m.nonce : void 0
          });
        }
      } else m == null && r.d.M(g);
  }, bt.preload = function(g, m) {
    if (typeof g == "string" && typeof m == "object" && m !== null && typeof m.as == "string") {
      var y = m.as, p = h(y, m.crossOrigin);
      r.d.L(g, y, {
        crossOrigin: p,
        integrity: typeof m.integrity == "string" ? m.integrity : void 0,
        nonce: typeof m.nonce == "string" ? m.nonce : void 0,
        type: typeof m.type == "string" ? m.type : void 0,
        fetchPriority: typeof m.fetchPriority == "string" ? m.fetchPriority : void 0,
        referrerPolicy: typeof m.referrerPolicy == "string" ? m.referrerPolicy : void 0,
        imageSrcSet: typeof m.imageSrcSet == "string" ? m.imageSrcSet : void 0,
        imageSizes: typeof m.imageSizes == "string" ? m.imageSizes : void 0,
        media: typeof m.media == "string" ? m.media : void 0
      });
    }
  }, bt.preloadModule = function(g, m) {
    if (typeof g == "string")
      if (m) {
        var y = h(m.as, m.crossOrigin);
        r.d.m(g, {
          as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
          crossOrigin: y,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0
        });
      } else r.d.m(g);
  }, bt.requestFormReset = function(g) {
    r.d.r(g);
  }, bt.unstable_batchedUpdates = function(g, m) {
    return g(m);
  }, bt.useFormState = function(g, m, y) {
    return f.H.useFormState(g, m, y);
  }, bt.useFormStatus = function() {
    return f.H.useHostTransitionStatus();
  }, bt.version = "19.2.4", bt;
}
var _0;
function Av() {
  if (_0) return Ff.exports;
  _0 = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (i) {
        console.error(i);
      }
  }
  return n(), Ff.exports = pN(), Ff.exports;
}
var yN = Av();
const du = ee.createContext(null), vN = du.Provider, Dv = wn.error001();
function ze(n, i) {
  const l = ee.useContext(du);
  if (l === null)
    throw new Error(Dv);
  return jv(l, n, i);
}
function Je() {
  const n = ee.useContext(du);
  if (n === null)
    throw new Error(Dv);
  return ee.useMemo(() => ({
    getState: n.getState,
    setState: n.setState,
    subscribe: n.subscribe
  }), [n]);
}
const N0 = { display: "none" }, bN = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  border: 0,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0px, 0px, 0px, 0px)",
  clipPath: "inset(100%)"
}, Ov = "react-flow__node-desc", zv = "react-flow__edge-desc", xN = "react-flow__aria-live", wN = (n) => n.ariaLiveMessage, SN = (n) => n.ariaLabelConfig;
function EN({ rfId: n }) {
  const i = ze(wN);
  return b.jsx("div", { id: `${xN}-${n}`, "aria-live": "assertive", "aria-atomic": "true", style: bN, children: i });
}
function _N({ rfId: n, disableKeyboardA11y: i }) {
  const l = ze(SN);
  return b.jsxs(b.Fragment, { children: [b.jsx("div", { id: `${Ov}-${n}`, style: N0, children: i ? l["node.a11yDescription.default"] : l["node.a11yDescription.keyboardDisabled"] }), b.jsx("div", { id: `${zv}-${n}`, style: N0, children: l["edge.a11yDescription.default"] }), !i && b.jsx(EN, { rfId: n })] });
}
const hu = ee.forwardRef(({ position: n = "top-left", children: i, className: l, style: r, ...s }, c) => {
  const f = `${n}`.split("-");
  return b.jsx("div", { className: ut(["react-flow__panel", l, ...f]), style: r, ref: c, ...s, children: i });
});
hu.displayName = "Panel";
function NN({ proOptions: n, position: i = "bottom-right" }) {
  return n?.hideAttribution ? null : b.jsx(hu, { position: i, className: "react-flow__attribution", "data-message": "Please only hide this attribution when you are subscribed to React Flow Pro: https://pro.reactflow.dev", children: b.jsx("a", { href: "https://reactflow.dev", target: "_blank", rel: "noopener noreferrer", "aria-label": "React Flow attribution", children: "React Flow" }) });
}
const CN = (n) => {
  const i = [], l = [];
  for (const [, r] of n.nodeLookup)
    r.selected && i.push(r.internals.userNode);
  for (const [, r] of n.edgeLookup)
    r.selected && l.push(r);
  return { selectedNodes: i, selectedEdges: l };
}, js = (n) => n.id;
function MN(n, i) {
  return Ke(n.selectedNodes.map(js), i.selectedNodes.map(js)) && Ke(n.selectedEdges.map(js), i.selectedEdges.map(js));
}
function TN({ onSelectionChange: n }) {
  const i = Je(), { selectedNodes: l, selectedEdges: r } = ze(CN, MN);
  return ee.useEffect(() => {
    const s = { nodes: l, edges: r };
    n?.(s), i.getState().onSelectionChangeHandlers.forEach((c) => c(s));
  }, [l, r, n]), null;
}
const jN = (n) => !!n.onSelectionChangeHandlers;
function AN({ onSelectionChange: n }) {
  const i = ze(jN);
  return n || i ? b.jsx(TN, { onSelectionChange: n }) : null;
}
const Rv = [0, 0], DN = { x: 0, y: 0, zoom: 1 }, ON = [
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
], C0 = [...ON, "rfId"], zN = (n) => ({
  setNodes: n.setNodes,
  setEdges: n.setEdges,
  setMinZoom: n.setMinZoom,
  setMaxZoom: n.setMaxZoom,
  setTranslateExtent: n.setTranslateExtent,
  setNodeExtent: n.setNodeExtent,
  reset: n.reset,
  setDefaultNodesAndEdges: n.setDefaultNodesAndEdges
}), M0 = {
  /*
   * these are values that are also passed directly to other components
   * than the StoreUpdater. We can reduce the number of setStore calls
   * by setting the same values here as prev fields.
   */
  translateExtent: Rl,
  nodeOrigin: Rv,
  minZoom: 0.5,
  maxZoom: 2,
  elementsSelectable: !0,
  noPanClassName: "nopan",
  rfId: "1"
};
function RN(n) {
  const { setNodes: i, setEdges: l, setMinZoom: r, setMaxZoom: s, setTranslateExtent: c, setNodeExtent: f, reset: h, setDefaultNodesAndEdges: g } = ze(zN, Ke), m = Je();
  ee.useEffect(() => (g(n.defaultNodes, n.defaultEdges), () => {
    y.current = M0, h();
  }), []);
  const y = ee.useRef(M0);
  return ee.useEffect(
    () => {
      for (const p of C0) {
        const v = n[p], x = y.current[p];
        v !== x && (typeof n[p] > "u" || (p === "nodes" ? i(v) : p === "edges" ? l(v) : p === "minZoom" ? r(v) : p === "maxZoom" ? s(v) : p === "translateExtent" ? c(v) : p === "nodeExtent" ? f(v) : p === "ariaLabelConfig" ? m.setState({ ariaLabelConfig: m2(v) }) : p === "fitView" ? m.setState({ fitViewQueued: v }) : p === "fitViewOptions" ? m.setState({ fitViewOptions: v }) : m.setState({ [p]: v })));
      }
      y.current = n;
    },
    // Only re-run the effect if one of the fields we track changes
    C0.map((p) => n[p])
  ), null;
}
function T0() {
  return typeof window > "u" || !window.matchMedia ? null : window.matchMedia("(prefers-color-scheme: dark)");
}
function kN(n) {
  const [i, l] = ee.useState(n === "system" ? null : n);
  return ee.useEffect(() => {
    if (n !== "system") {
      l(n);
      return;
    }
    const r = T0(), s = () => l(r?.matches ? "dark" : "light");
    return s(), r?.addEventListener("change", s), () => {
      r?.removeEventListener("change", s);
    };
  }, [n]), i !== null ? i : T0()?.matches ? "dark" : "light";
}
const j0 = typeof document < "u" ? document : null;
function Ll(n = null, i = { target: j0, actInsideInputWithModifier: !0 }) {
  const [l, r] = ee.useState(!1), s = ee.useRef(!1), c = ee.useRef(/* @__PURE__ */ new Set([])), [f, h] = ee.useMemo(() => {
    if (n !== null) {
      const m = (Array.isArray(n) ? n : [n]).filter((p) => typeof p == "string").map((p) => p.replace("+", `
`).replace(`

`, `
+`).split(`
`)), y = m.reduce((p, v) => p.concat(...v), []);
      return [m, y];
    }
    return [[], []];
  }, [n]);
  return ee.useEffect(() => {
    const g = i?.target ?? j0, m = i?.actInsideInputWithModifier ?? !0;
    if (n !== null) {
      const y = (x) => {
        if (s.current = x.ctrlKey || x.metaKey || x.shiftKey || x.altKey, (!s.current || s.current && !m) && hv(x))
          return !1;
        const C = D0(x.code, h);
        if (c.current.add(x[C]), A0(f, c.current, !1)) {
          const j = x.composedPath?.()?.[0] || x.target, O = j?.nodeName === "BUTTON" || j?.nodeName === "A";
          i.preventDefault !== !1 && (s.current || !O) && x.preventDefault(), r(!0);
        }
      }, p = (x) => {
        const S = D0(x.code, h);
        A0(f, c.current, !0) ? (r(!1), c.current.clear()) : c.current.delete(x[S]), x.key === "Meta" && c.current.clear(), s.current = !1;
      }, v = () => {
        c.current.clear(), r(!1);
      };
      return g?.addEventListener("keydown", y), g?.addEventListener("keyup", p), window.addEventListener("blur", v), window.addEventListener("contextmenu", v), () => {
        g?.removeEventListener("keydown", y), g?.removeEventListener("keyup", p), window.removeEventListener("blur", v), window.removeEventListener("contextmenu", v);
      };
    }
  }, [n, r]), l;
}
function A0(n, i, l) {
  return n.filter((r) => l || r.length === i.size).some((r) => r.every((s) => i.has(s)));
}
function D0(n, i) {
  return i.includes(n) ? "code" : "key";
}
const HN = () => {
  const n = Je();
  return ee.useMemo(() => ({
    zoomIn: (i) => {
      const { panZoom: l } = n.getState();
      return l ? l.scaleBy(1.2, { duration: i?.duration }) : Promise.resolve(!1);
    },
    zoomOut: (i) => {
      const { panZoom: l } = n.getState();
      return l ? l.scaleBy(1 / 1.2, { duration: i?.duration }) : Promise.resolve(!1);
    },
    zoomTo: (i, l) => {
      const { panZoom: r } = n.getState();
      return r ? r.scaleTo(i, { duration: l?.duration }) : Promise.resolve(!1);
    },
    getZoom: () => n.getState().transform[2],
    setViewport: async (i, l) => {
      const { transform: [r, s, c], panZoom: f } = n.getState();
      return f ? (await f.setViewport({
        x: i.x ?? r,
        y: i.y ?? s,
        zoom: i.zoom ?? c
      }, l), Promise.resolve(!0)) : Promise.resolve(!1);
    },
    getViewport: () => {
      const [i, l, r] = n.getState().transform;
      return { x: i, y: l, zoom: r };
    },
    setCenter: async (i, l, r) => n.getState().setCenter(i, l, r),
    fitBounds: async (i, l) => {
      const { width: r, height: s, minZoom: c, maxZoom: f, panZoom: h } = n.getState(), g = zd(i, r, s, c, f, l?.padding ?? 0.1);
      return h ? (await h.setViewport(g, {
        duration: l?.duration,
        ease: l?.ease,
        interpolate: l?.interpolate
      }), Promise.resolve(!0)) : Promise.resolve(!1);
    },
    screenToFlowPosition: (i, l = {}) => {
      const { transform: r, snapGrid: s, snapToGrid: c, domNode: f } = n.getState();
      if (!f)
        return i;
      const { x: h, y: g } = f.getBoundingClientRect(), m = {
        x: i.x - h,
        y: i.y - g
      }, y = l.snapGrid ?? s, p = l.snapToGrid ?? c;
      return $l(m, r, p, y);
    },
    flowToScreenPosition: (i) => {
      const { transform: l, domNode: r } = n.getState();
      if (!r)
        return i;
      const { x: s, y: c } = r.getBoundingClientRect(), f = Ps(i, l);
      return {
        x: f.x + s,
        y: f.y + c
      };
    }
  }), []);
};
function kv(n, i) {
  const l = [], r = /* @__PURE__ */ new Map(), s = [];
  for (const c of n)
    if (c.type === "add") {
      s.push(c);
      continue;
    } else if (c.type === "remove" || c.type === "replace")
      r.set(c.id, [c]);
    else {
      const f = r.get(c.id);
      f ? f.push(c) : r.set(c.id, [c]);
    }
  for (const c of i) {
    const f = r.get(c.id);
    if (!f) {
      l.push(c);
      continue;
    }
    if (f[0].type === "remove")
      continue;
    if (f[0].type === "replace") {
      l.push({ ...f[0].item });
      continue;
    }
    const h = { ...c };
    for (const g of f)
      BN(g, h);
    l.push(h);
  }
  return s.length && s.forEach((c) => {
    c.index !== void 0 ? l.splice(c.index, 0, { ...c.item }) : l.push({ ...c.item });
  }), l;
}
function BN(n, i) {
  switch (n.type) {
    case "select": {
      i.selected = n.selected;
      break;
    }
    case "position": {
      typeof n.position < "u" && (i.position = n.position), typeof n.dragging < "u" && (i.dragging = n.dragging);
      break;
    }
    case "dimensions": {
      typeof n.dimensions < "u" && (i.measured = {
        ...n.dimensions
      }, n.setAttributes && ((n.setAttributes === !0 || n.setAttributes === "width") && (i.width = n.dimensions.width), (n.setAttributes === !0 || n.setAttributes === "height") && (i.height = n.dimensions.height))), typeof n.resizing == "boolean" && (i.resizing = n.resizing);
      break;
    }
  }
}
function Hv(n, i) {
  return kv(n, i);
}
function Bv(n, i) {
  return kv(n, i);
}
function li(n, i) {
  return {
    id: n,
    type: "select",
    selected: i
  };
}
function so(n, i = /* @__PURE__ */ new Set(), l = !1) {
  const r = [];
  for (const [s, c] of n) {
    const f = i.has(s);
    !(c.selected === void 0 && !f) && c.selected !== f && (l && (c.selected = f), r.push(li(c.id, f)));
  }
  return r;
}
function O0({ items: n = [], lookup: i }) {
  const l = [], r = new Map(n.map((s) => [s.id, s]));
  for (const [s, c] of n.entries()) {
    const f = i.get(c.id), h = f?.internals?.userNode ?? f;
    h !== void 0 && h !== c && l.push({ id: c.id, item: c, type: "replace" }), h === void 0 && l.push({ item: c, type: "add", index: s });
  }
  for (const [s] of i)
    r.get(s) === void 0 && l.push({ id: s, type: "remove" });
  return l;
}
function z0(n) {
  return {
    id: n.id,
    type: "remove"
  };
}
const R0 = (n) => o2(n), LN = (n) => ov(n);
function Lv(n) {
  return ee.forwardRef(n);
}
const UN = typeof window < "u" ? ee.useLayoutEffect : ee.useEffect;
function k0(n) {
  const [i, l] = ee.useState(BigInt(0)), [r] = ee.useState(() => VN(() => l((s) => s + BigInt(1))));
  return UN(() => {
    const s = r.get();
    s.length && (n(s), r.reset());
  }, [i]), r;
}
function VN(n) {
  let i = [];
  return {
    get: () => i,
    reset: () => {
      i = [];
    },
    push: (l) => {
      i.push(l), n();
    }
  };
}
const Uv = ee.createContext(null);
function YN({ children: n }) {
  const i = Je(), l = ee.useCallback((h) => {
    const { nodes: g = [], setNodes: m, hasDefaultNodes: y, onNodesChange: p, nodeLookup: v, fitViewQueued: x, onNodesChangeMiddlewareMap: S } = i.getState();
    let C = g;
    for (const O of h)
      C = typeof O == "function" ? O(C) : O;
    let j = O0({
      items: C,
      lookup: v
    });
    for (const O of S.values())
      j = O(j);
    y && m(C), j.length > 0 ? p?.(j) : x && window.requestAnimationFrame(() => {
      const { fitViewQueued: O, nodes: D, setNodes: E } = i.getState();
      O && E(D);
    });
  }, []), r = k0(l), s = ee.useCallback((h) => {
    const { edges: g = [], setEdges: m, hasDefaultEdges: y, onEdgesChange: p, edgeLookup: v } = i.getState();
    let x = g;
    for (const S of h)
      x = typeof S == "function" ? S(x) : S;
    y ? m(x) : p && p(O0({
      items: x,
      lookup: v
    }));
  }, []), c = k0(s), f = ee.useMemo(() => ({ nodeQueue: r, edgeQueue: c }), []);
  return b.jsx(Uv.Provider, { value: f, children: n });
}
function IN() {
  const n = ee.useContext(Uv);
  if (!n)
    throw new Error("useBatchContext must be used within a BatchProvider");
  return n;
}
const qN = (n) => !!n.panZoom;
function gu() {
  const n = HN(), i = Je(), l = IN(), r = ze(qN), s = ee.useMemo(() => {
    const c = (p) => i.getState().nodeLookup.get(p), f = (p) => {
      l.nodeQueue.push(p);
    }, h = (p) => {
      l.edgeQueue.push(p);
    }, g = (p) => {
      const { nodeLookup: v, nodeOrigin: x } = i.getState(), S = R0(p) ? p : v.get(p.id), C = S.parentId ? fv(S.position, S.measured, S.parentId, v, x) : S.position, j = {
        ...S,
        position: C,
        width: S.measured?.width ?? S.width,
        height: S.measured?.height ?? S.height
      };
      return po(j);
    }, m = (p, v, x = { replace: !1 }) => {
      f((S) => S.map((C) => {
        if (C.id === p) {
          const j = typeof v == "function" ? v(C) : v;
          return x.replace && R0(j) ? j : { ...C, ...j };
        }
        return C;
      }));
    }, y = (p, v, x = { replace: !1 }) => {
      h((S) => S.map((C) => {
        if (C.id === p) {
          const j = typeof v == "function" ? v(C) : v;
          return x.replace && LN(j) ? j : { ...C, ...j };
        }
        return C;
      }));
    };
    return {
      getNodes: () => i.getState().nodes.map((p) => ({ ...p })),
      getNode: (p) => c(p)?.internals.userNode,
      getInternalNode: c,
      getEdges: () => {
        const { edges: p = [] } = i.getState();
        return p.map((v) => ({ ...v }));
      },
      getEdge: (p) => i.getState().edgeLookup.get(p),
      setNodes: f,
      setEdges: h,
      addNodes: (p) => {
        const v = Array.isArray(p) ? p : [p];
        l.nodeQueue.push((x) => [...x, ...v]);
      },
      addEdges: (p) => {
        const v = Array.isArray(p) ? p : [p];
        l.edgeQueue.push((x) => [...x, ...v]);
      },
      toObject: () => {
        const { nodes: p = [], edges: v = [], transform: x } = i.getState(), [S, C, j] = x;
        return {
          nodes: p.map((O) => ({ ...O })),
          edges: v.map((O) => ({ ...O })),
          viewport: {
            x: S,
            y: C,
            zoom: j
          }
        };
      },
      deleteElements: async ({ nodes: p = [], edges: v = [] }) => {
        const { nodes: x, edges: S, onNodesDelete: C, onEdgesDelete: j, triggerNodeChanges: O, triggerEdgeChanges: D, onDelete: E, onBeforeDelete: N } = i.getState(), { nodes: k, edges: U } = await c2({
          nodesToRemove: p,
          edgesToRemove: v,
          nodes: x,
          edges: S,
          onBeforeDelete: N
        }), V = U.length > 0, X = k.length > 0;
        if (V) {
          const te = U.map(z0);
          j?.(U), D(te);
        }
        if (X) {
          const te = k.map(z0);
          C?.(k), O(te);
        }
        return (X || V) && E?.({ nodes: k, edges: U }), { deletedNodes: k, deletedEdges: U };
      },
      /**
       * Partial is defined as "the 2 nodes/areas are intersecting partially".
       * If a is contained in b or b is contained in a, they are both
       * considered fully intersecting.
       */
      getIntersectingNodes: (p, v = !0, x) => {
        const S = i0(p), C = S ? p : g(p), j = x !== void 0;
        return C ? (x || i.getState().nodes).filter((O) => {
          const D = i.getState().nodeLookup.get(O.id);
          if (D && !S && (O.id === p.id || !D.internals.positionAbsolute))
            return !1;
          const E = po(j ? O : D), N = Hl(E, C);
          return v && N > 0 || N >= E.width * E.height || N >= C.width * C.height;
        }) : [];
      },
      isNodeIntersecting: (p, v, x = !0) => {
        const C = i0(p) ? p : g(p);
        if (!C)
          return !1;
        const j = Hl(C, v);
        return x && j > 0 || j >= v.width * v.height || j >= C.width * C.height;
      },
      updateNode: m,
      updateNodeData: (p, v, x = { replace: !1 }) => {
        m(p, (S) => {
          const C = typeof v == "function" ? v(S) : v;
          return x.replace ? { ...S, data: C } : { ...S, data: { ...S.data, ...C } };
        }, x);
      },
      updateEdge: y,
      updateEdgeData: (p, v, x = { replace: !1 }) => {
        y(p, (S) => {
          const C = typeof v == "function" ? v(S) : v;
          return x.replace ? { ...S, data: C } : { ...S, data: { ...S.data, ...C } };
        }, x);
      },
      getNodesBounds: (p) => {
        const { nodeLookup: v, nodeOrigin: x } = i.getState();
        return l2(p, { nodeLookup: v, nodeOrigin: x });
      },
      getHandleConnections: ({ type: p, id: v, nodeId: x }) => Array.from(i.getState().connectionLookup.get(`${x}-${p}${v ? `-${v}` : ""}`)?.values() ?? []),
      getNodeConnections: ({ type: p, handleId: v, nodeId: x }) => Array.from(i.getState().connectionLookup.get(`${x}${p ? v ? `-${p}-${v}` : `-${p}` : ""}`)?.values() ?? []),
      fitView: async (p) => {
        const v = i.getState().fitViewResolver ?? g2();
        return i.setState({ fitViewQueued: !0, fitViewOptions: p, fitViewResolver: v }), l.nodeQueue.push((x) => [...x]), v.promise;
      }
    };
  }, []);
  return ee.useMemo(() => ({
    ...s,
    ...n,
    viewportInitialized: r
  }), [r]);
}
const H0 = (n) => n.selected, XN = typeof window < "u" ? window : void 0;
function GN({ deleteKeyCode: n, multiSelectionKeyCode: i }) {
  const l = Je(), { deleteElements: r } = gu(), s = Ll(n, { actInsideInputWithModifier: !1 }), c = Ll(i, { target: XN });
  ee.useEffect(() => {
    if (s) {
      const { edges: f, nodes: h } = l.getState();
      r({ nodes: h.filter(H0), edges: f.filter(H0) }), l.setState({ nodesSelectionActive: !1 });
    }
  }, [s]), ee.useEffect(() => {
    l.setState({ multiSelectionActive: c });
  }, [c]);
}
function $N(n) {
  const i = Je();
  ee.useEffect(() => {
    const l = () => {
      if (!n.current || !(n.current.checkVisibility?.() ?? !0))
        return !1;
      const r = Rd(n.current);
      (r.height === 0 || r.width === 0) && i.getState().onError?.("004", wn.error004()), i.setState({ width: r.width || 500, height: r.height || 500 });
    };
    if (n.current) {
      l(), window.addEventListener("resize", l);
      const r = new ResizeObserver(() => l());
      return r.observe(n.current), () => {
        window.removeEventListener("resize", l), r && n.current && r.unobserve(n.current);
      };
    }
  }, []);
}
const mu = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
}, ZN = (n) => ({
  userSelectionActive: n.userSelectionActive,
  lib: n.lib,
  connectionInProgress: n.connection.inProgress
});
function QN({ onPaneContextMenu: n, zoomOnScroll: i = !0, zoomOnPinch: l = !0, panOnScroll: r = !1, panOnScrollSpeed: s = 0.5, panOnScrollMode: c = fi.Free, zoomOnDoubleClick: f = !0, panOnDrag: h = !0, defaultViewport: g, translateExtent: m, minZoom: y, maxZoom: p, zoomActivationKeyCode: v, preventScrolling: x = !0, children: S, noWheelClassName: C, noPanClassName: j, onViewportChange: O, isControlledViewport: D, paneClickDistance: E, selectionOnDrag: N }) {
  const k = Je(), U = ee.useRef(null), { userSelectionActive: V, lib: X, connectionInProgress: te } = ze(ZN, Ke), K = Ll(v), Y = ee.useRef();
  $N(U);
  const Z = ee.useCallback((J) => {
    O?.({ x: J[0], y: J[1], zoom: J[2] }), D || k.setState({ transform: J });
  }, [O, D]);
  return ee.useEffect(() => {
    if (U.current) {
      Y.current = W2({
        domNode: U.current,
        minZoom: y,
        maxZoom: p,
        translateExtent: m,
        viewport: g,
        onDraggingChange: (_) => k.setState((z) => z.paneDragging === _ ? z : { paneDragging: _ }),
        onPanZoomStart: (_, z) => {
          const { onViewportChangeStart: B, onMoveStart: $ } = k.getState();
          $?.(_, z), B?.(z);
        },
        onPanZoom: (_, z) => {
          const { onViewportChange: B, onMove: $ } = k.getState();
          $?.(_, z), B?.(z);
        },
        onPanZoomEnd: (_, z) => {
          const { onViewportChangeEnd: B, onMoveEnd: $ } = k.getState();
          $?.(_, z), B?.(z);
        }
      });
      const { x: J, y: M, zoom: L } = Y.current.getViewport();
      return k.setState({
        panZoom: Y.current,
        transform: [J, M, L],
        domNode: U.current.closest(".react-flow")
      }), () => {
        Y.current?.destroy();
      };
    }
  }, []), ee.useEffect(() => {
    Y.current?.update({
      onPaneContextMenu: n,
      zoomOnScroll: i,
      zoomOnPinch: l,
      panOnScroll: r,
      panOnScrollSpeed: s,
      panOnScrollMode: c,
      zoomOnDoubleClick: f,
      panOnDrag: h,
      zoomActivationKeyPressed: K,
      preventScrolling: x,
      noPanClassName: j,
      userSelectionActive: V,
      noWheelClassName: C,
      lib: X,
      onTransformChange: Z,
      connectionInProgress: te,
      selectionOnDrag: N,
      paneClickDistance: E
    });
  }, [
    n,
    i,
    l,
    r,
    s,
    c,
    f,
    h,
    K,
    x,
    j,
    V,
    C,
    X,
    Z,
    te,
    N,
    E
  ]), b.jsx("div", { className: "react-flow__renderer", ref: U, style: mu, children: S });
}
const KN = (n) => ({
  userSelectionActive: n.userSelectionActive,
  userSelectionRect: n.userSelectionRect
});
function JN() {
  const { userSelectionActive: n, userSelectionRect: i } = ze(KN, Ke);
  return n && i ? b.jsx("div", { className: "react-flow__selection react-flow__container", style: {
    width: i.width,
    height: i.height,
    transform: `translate(${i.x}px, ${i.y}px)`
  } }) : null;
}
const Pf = (n, i) => (l) => {
  l.target === i.current && n?.(l);
}, WN = (n) => ({
  userSelectionActive: n.userSelectionActive,
  elementsSelectable: n.elementsSelectable,
  connectionInProgress: n.connection.inProgress,
  dragging: n.paneDragging
});
function FN({ isSelecting: n, selectionKeyPressed: i, selectionMode: l = kl.Full, panOnDrag: r, paneClickDistance: s, selectionOnDrag: c, onSelectionStart: f, onSelectionEnd: h, onPaneClick: g, onPaneContextMenu: m, onPaneScroll: y, onPaneMouseEnter: p, onPaneMouseMove: v, onPaneMouseLeave: x, children: S }) {
  const C = Je(), { userSelectionActive: j, elementsSelectable: O, dragging: D, connectionInProgress: E } = ze(WN, Ke), N = O && (n || j), k = ee.useRef(null), U = ee.useRef(), V = ee.useRef(/* @__PURE__ */ new Set()), X = ee.useRef(/* @__PURE__ */ new Set()), te = ee.useRef(!1), K = (B) => {
    if (te.current || E) {
      te.current = !1;
      return;
    }
    g?.(B), C.getState().resetSelectedElements(), C.setState({ nodesSelectionActive: !1 });
  }, Y = (B) => {
    if (Array.isArray(r) && r?.includes(2)) {
      B.preventDefault();
      return;
    }
    m?.(B);
  }, Z = y ? (B) => y(B) : void 0, J = (B) => {
    te.current && (B.stopPropagation(), te.current = !1);
  }, M = (B) => {
    const { domNode: $ } = C.getState();
    if (U.current = $?.getBoundingClientRect(), !U.current)
      return;
    const F = B.target === k.current;
    if (!F && !!B.target.closest(".nokey") || !n || !(c && F || i) || B.button !== 0 || !B.isPrimary)
      return;
    B.target?.setPointerCapture?.(B.pointerId), te.current = !1;
    const { x: G, y: H } = un(B.nativeEvent, U.current);
    C.setState({
      userSelectionRect: {
        width: 0,
        height: 0,
        startX: G,
        startY: H,
        x: G,
        y: H
      }
    }), F || (B.stopPropagation(), B.preventDefault());
  }, L = (B) => {
    const { userSelectionRect: $, transform: F, nodeLookup: A, edgeLookup: I, connectionLookup: G, triggerNodeChanges: H, triggerEdgeChanges: T, defaultEdgeOptions: q, resetSelectedElements: Q } = C.getState();
    if (!U.current || !$)
      return;
    const { x: P, y: ie } = un(B.nativeEvent, U.current), { startX: de, startY: he } = $;
    if (!te.current) {
      const De = i ? 0 : s;
      if (Math.hypot(P - de, ie - he) <= De)
        return;
      Q(), f?.(B);
    }
    te.current = !0;
    const ge = {
      startX: de,
      startY: he,
      x: P < de ? P : de,
      y: ie < he ? ie : he,
      width: Math.abs(P - de),
      height: Math.abs(ie - he)
    }, xe = V.current, Se = X.current;
    V.current = new Set(Od(A, ge, F, l === kl.Partial, !0).map((De) => De.id)), X.current = /* @__PURE__ */ new Set();
    const _e = q?.selectable ?? !0;
    for (const De of V.current) {
      const Pe = G.get(De);
      if (Pe)
        for (const { edgeId: Et } of Pe.values()) {
          const zt = I.get(Et);
          zt && (zt.selectable ?? _e) && X.current.add(Et);
        }
    }
    if (!o0(xe, V.current)) {
      const De = so(A, V.current, !0);
      H(De);
    }
    if (!o0(Se, X.current)) {
      const De = so(I, X.current);
      T(De);
    }
    C.setState({
      userSelectionRect: ge,
      userSelectionActive: !0,
      nodesSelectionActive: !1
    });
  }, _ = (B) => {
    B.button === 0 && (B.target?.releasePointerCapture?.(B.pointerId), !j && B.target === k.current && C.getState().userSelectionRect && K?.(B), C.setState({
      userSelectionActive: !1,
      userSelectionRect: null
    }), te.current && (h?.(B), C.setState({
      nodesSelectionActive: V.current.size > 0
    })));
  }, z = r === !0 || Array.isArray(r) && r.includes(0);
  return b.jsxs("div", { className: ut(["react-flow__pane", { draggable: z, dragging: D, selection: n }]), onClick: N ? void 0 : Pf(K, k), onContextMenu: Pf(Y, k), onWheel: Pf(Z, k), onPointerEnter: N ? void 0 : p, onPointerMove: N ? L : v, onPointerUp: N ? _ : void 0, onPointerDownCapture: N ? M : void 0, onClickCapture: N ? J : void 0, onPointerLeave: x, ref: k, style: mu, children: [S, b.jsx(JN, {})] });
}
function vd({ id: n, store: i, unselect: l = !1, nodeRef: r }) {
  const { addSelectedNodes: s, unselectNodesAndEdges: c, multiSelectionActive: f, nodeLookup: h, onError: g } = i.getState(), m = h.get(n);
  if (!m) {
    g?.("012", wn.error012(n));
    return;
  }
  i.setState({ nodesSelectionActive: !1 }), m.selected ? (l || m.selected && f) && (c({ nodes: [m], edges: [] }), requestAnimationFrame(() => r?.current?.blur())) : s([n]);
}
function Vv({ nodeRef: n, disabled: i = !1, noDragClassName: l, handleSelector: r, nodeId: s, isSelectable: c, nodeClickDistance: f }) {
  const h = Je(), [g, m] = ee.useState(!1), y = ee.useRef();
  return ee.useEffect(() => {
    y.current = B2({
      getStoreItems: () => h.getState(),
      onNodeMouseDown: (p) => {
        vd({
          id: p,
          store: h,
          nodeRef: n
        });
      },
      onDragStart: () => {
        m(!0);
      },
      onDragStop: () => {
        m(!1);
      }
    });
  }, []), ee.useEffect(() => {
    if (!(i || !n.current || !y.current))
      return y.current.update({
        noDragClassName: l,
        handleSelector: r,
        domNode: n.current,
        isSelectable: c,
        nodeId: s,
        nodeClickDistance: f
      }), () => {
        y.current?.destroy();
      };
  }, [l, r, i, c, n, s, f]), g;
}
const PN = (n) => (i) => i.selected && (i.draggable || n && typeof i.draggable > "u");
function Yv() {
  const n = Je();
  return ee.useCallback((l) => {
    const { nodeExtent: r, snapToGrid: s, snapGrid: c, nodesDraggable: f, onError: h, updateNodePositions: g, nodeLookup: m, nodeOrigin: y } = n.getState(), p = /* @__PURE__ */ new Map(), v = PN(f), x = s ? c[0] : 5, S = s ? c[1] : 5, C = l.direction.x * x * l.factor, j = l.direction.y * S * l.factor;
    for (const [, O] of m) {
      if (!v(O))
        continue;
      let D = {
        x: O.internals.positionAbsolute.x + C,
        y: O.internals.positionAbsolute.y + j
      };
      s && (D = Gl(D, c));
      const { position: E, positionAbsolute: N } = lv({
        nodeId: O.id,
        nextPosition: D,
        nodeLookup: m,
        nodeExtent: r,
        nodeOrigin: y,
        onError: h
      });
      O.position = E, O.internals.positionAbsolute = N, p.set(O.id, O);
    }
    g(p);
  }, []);
}
const Yd = ee.createContext(null), eC = Yd.Provider;
Yd.Consumer;
const Iv = () => ee.useContext(Yd), tC = (n) => ({
  connectOnClick: n.connectOnClick,
  noPanClassName: n.noPanClassName,
  rfId: n.rfId
}), nC = (n, i, l) => (r) => {
  const { connectionClickStartHandle: s, connectionMode: c, connection: f } = r, { fromHandle: h, toHandle: g, isValid: m } = f, y = g?.nodeId === n && g?.id === i && g?.type === l;
  return {
    connectingFrom: h?.nodeId === n && h?.id === i && h?.type === l,
    connectingTo: y,
    clickConnecting: s?.nodeId === n && s?.id === i && s?.type === l,
    isPossibleEndHandle: c === go.Strict ? h?.type !== l : n !== h?.nodeId || i !== h?.id,
    connectionInProcess: !!h,
    clickConnectionInProcess: !!s,
    valid: y && m
  };
};
function aC({ type: n = "source", position: i = ye.Top, isValidConnection: l, isConnectable: r = !0, isConnectableStart: s = !0, isConnectableEnd: c = !0, id: f, onConnect: h, children: g, className: m, onMouseDown: y, onTouchStart: p, ...v }, x) {
  const S = f || null, C = n === "target", j = Je(), O = Iv(), { connectOnClick: D, noPanClassName: E, rfId: N } = ze(tC, Ke), { connectingFrom: k, connectingTo: U, clickConnecting: V, isPossibleEndHandle: X, connectionInProcess: te, clickConnectionInProcess: K, valid: Y } = ze(nC(O, S, n), Ke);
  O || j.getState().onError?.("010", wn.error010());
  const Z = (L) => {
    const { defaultEdgeOptions: _, onConnect: z, hasDefaultEdges: B } = j.getState(), $ = {
      ..._,
      ...L
    };
    if (B) {
      const { edges: F, setEdges: A } = j.getState();
      A(w2($, F));
    }
    z?.($), h?.($);
  }, J = (L) => {
    if (!O)
      return;
    const _ = gv(L.nativeEvent);
    if (s && (_ && L.button === 0 || !_)) {
      const z = j.getState();
      yd.onPointerDown(L.nativeEvent, {
        handleDomNode: L.currentTarget,
        autoPanOnConnect: z.autoPanOnConnect,
        connectionMode: z.connectionMode,
        connectionRadius: z.connectionRadius,
        domNode: z.domNode,
        nodeLookup: z.nodeLookup,
        lib: z.lib,
        isTarget: C,
        handleId: S,
        nodeId: O,
        flowId: z.rfId,
        panBy: z.panBy,
        cancelConnection: z.cancelConnection,
        onConnectStart: z.onConnectStart,
        onConnectEnd: (...B) => j.getState().onConnectEnd?.(...B),
        updateConnection: z.updateConnection,
        onConnect: Z,
        isValidConnection: l || ((...B) => j.getState().isValidConnection?.(...B) ?? !0),
        getTransform: () => j.getState().transform,
        getFromHandle: () => j.getState().connection.fromHandle,
        autoPanSpeed: z.autoPanSpeed,
        dragThreshold: z.connectionDragThreshold
      });
    }
    _ ? y?.(L) : p?.(L);
  }, M = (L) => {
    const { onClickConnectStart: _, onClickConnectEnd: z, connectionClickStartHandle: B, connectionMode: $, isValidConnection: F, lib: A, rfId: I, nodeLookup: G, connection: H } = j.getState();
    if (!O || !B && !s)
      return;
    if (!B) {
      _?.(L.nativeEvent, { nodeId: O, handleId: S, handleType: n }), j.setState({ connectionClickStartHandle: { nodeId: O, type: n, id: S } });
      return;
    }
    const T = dv(L.target), q = l || F, { connection: Q, isValid: P } = yd.isValid(L.nativeEvent, {
      handle: {
        nodeId: O,
        id: S,
        type: n
      },
      connectionMode: $,
      fromNodeId: B.nodeId,
      fromHandleId: B.id || null,
      fromType: B.type,
      isValidConnection: q,
      flowId: I,
      doc: T,
      lib: A,
      nodeLookup: G
    });
    P && Q && Z(Q);
    const ie = structuredClone(H);
    delete ie.inProgress, ie.toPosition = ie.toHandle ? ie.toHandle.position : null, z?.(L, ie), j.setState({ connectionClickStartHandle: null });
  };
  return b.jsx("div", { "data-handleid": S, "data-nodeid": O, "data-handlepos": i, "data-id": `${N}-${O}-${S}-${n}`, className: ut([
    "react-flow__handle",
    `react-flow__handle-${i}`,
    "nodrag",
    E,
    m,
    {
      source: !C,
      target: C,
      connectable: r,
      connectablestart: s,
      connectableend: c,
      clickconnecting: V,
      connectingfrom: k,
      connectingto: U,
      valid: Y,
      /*
       * shows where you can start a connection from
       * and where you can end it while connecting
       */
      connectionindicator: r && (!te || X) && (te || K ? c : s)
    }
  ]), onMouseDown: J, onTouchStart: J, onClick: D ? M : void 0, ref: x, ...v, children: g });
}
const bo = ee.memo(Lv(aC));
function iC({ data: n, isConnectable: i, sourcePosition: l = ye.Bottom }) {
  return b.jsxs(b.Fragment, { children: [n?.label, b.jsx(bo, { type: "source", position: l, isConnectable: i })] });
}
function oC({ data: n, isConnectable: i, targetPosition: l = ye.Top, sourcePosition: r = ye.Bottom }) {
  return b.jsxs(b.Fragment, { children: [b.jsx(bo, { type: "target", position: l, isConnectable: i }), n?.label, b.jsx(bo, { type: "source", position: r, isConnectable: i })] });
}
function lC() {
  return null;
}
function rC({ data: n, isConnectable: i, targetPosition: l = ye.Top }) {
  return b.jsxs(b.Fragment, { children: [b.jsx(bo, { type: "target", position: l, isConnectable: i }), n?.label] });
}
const eu = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
}, B0 = {
  input: iC,
  default: oC,
  output: rC,
  group: lC
};
function sC(n) {
  return n.internals.handleBounds === void 0 ? {
    width: n.width ?? n.initialWidth ?? n.style?.width,
    height: n.height ?? n.initialHeight ?? n.style?.height
  } : {
    width: n.width ?? n.style?.width,
    height: n.height ?? n.style?.height
  };
}
const uC = (n) => {
  const { width: i, height: l, x: r, y: s } = Xl(n.nodeLookup, {
    filter: (c) => !!c.selected
  });
  return {
    width: sn(i) ? i : null,
    height: sn(l) ? l : null,
    userSelectionActive: n.userSelectionActive,
    transformString: `translate(${n.transform[0]}px,${n.transform[1]}px) scale(${n.transform[2]}) translate(${r}px,${s}px)`
  };
};
function cC({ onSelectionContextMenu: n, noPanClassName: i, disableKeyboardA11y: l }) {
  const r = Je(), { width: s, height: c, transformString: f, userSelectionActive: h } = ze(uC, Ke), g = Yv(), m = ee.useRef(null);
  ee.useEffect(() => {
    l || m.current?.focus({
      preventScroll: !0
    });
  }, [l]);
  const y = !h && s !== null && c !== null;
  if (Vv({
    nodeRef: m,
    disabled: !y
  }), !y)
    return null;
  const p = n ? (x) => {
    const S = r.getState().nodes.filter((C) => C.selected);
    n(x, S);
  } : void 0, v = (x) => {
    Object.prototype.hasOwnProperty.call(eu, x.key) && (x.preventDefault(), g({
      direction: eu[x.key],
      factor: x.shiftKey ? 4 : 1
    }));
  };
  return b.jsx("div", { className: ut(["react-flow__nodesselection", "react-flow__container", i]), style: {
    transform: f
  }, children: b.jsx("div", { ref: m, className: "react-flow__nodesselection-rect", onContextMenu: p, tabIndex: l ? void 0 : -1, onKeyDown: l ? void 0 : v, style: {
    width: s,
    height: c
  } }) });
}
const L0 = typeof window < "u" ? window : void 0, fC = (n) => ({ nodesSelectionActive: n.nodesSelectionActive, userSelectionActive: n.userSelectionActive });
function qv({ children: n, onPaneClick: i, onPaneMouseEnter: l, onPaneMouseMove: r, onPaneMouseLeave: s, onPaneContextMenu: c, onPaneScroll: f, paneClickDistance: h, deleteKeyCode: g, selectionKeyCode: m, selectionOnDrag: y, selectionMode: p, onSelectionStart: v, onSelectionEnd: x, multiSelectionKeyCode: S, panActivationKeyCode: C, zoomActivationKeyCode: j, elementsSelectable: O, zoomOnScroll: D, zoomOnPinch: E, panOnScroll: N, panOnScrollSpeed: k, panOnScrollMode: U, zoomOnDoubleClick: V, panOnDrag: X, defaultViewport: te, translateExtent: K, minZoom: Y, maxZoom: Z, preventScrolling: J, onSelectionContextMenu: M, noWheelClassName: L, noPanClassName: _, disableKeyboardA11y: z, onViewportChange: B, isControlledViewport: $ }) {
  const { nodesSelectionActive: F, userSelectionActive: A } = ze(fC, Ke), I = Ll(m, { target: L0 }), G = Ll(C, { target: L0 }), H = G || X, T = G || N, q = y && H !== !0, Q = I || A || q;
  return GN({ deleteKeyCode: g, multiSelectionKeyCode: S }), b.jsx(QN, { onPaneContextMenu: c, elementsSelectable: O, zoomOnScroll: D, zoomOnPinch: E, panOnScroll: T, panOnScrollSpeed: k, panOnScrollMode: U, zoomOnDoubleClick: V, panOnDrag: !I && H, defaultViewport: te, translateExtent: K, minZoom: Y, maxZoom: Z, zoomActivationKeyCode: j, preventScrolling: J, noWheelClassName: L, noPanClassName: _, onViewportChange: B, isControlledViewport: $, paneClickDistance: h, selectionOnDrag: q, children: b.jsxs(FN, { onSelectionStart: v, onSelectionEnd: x, onPaneClick: i, onPaneMouseEnter: l, onPaneMouseMove: r, onPaneMouseLeave: s, onPaneContextMenu: c, onPaneScroll: f, panOnDrag: H, isSelecting: !!Q, selectionMode: p, selectionKeyPressed: I, paneClickDistance: h, selectionOnDrag: q, children: [n, F && b.jsx(cC, { onSelectionContextMenu: M, noPanClassName: _, disableKeyboardA11y: z })] }) });
}
qv.displayName = "FlowRenderer";
const dC = ee.memo(qv), hC = (n) => (i) => n ? Od(i.nodeLookup, { x: 0, y: 0, width: i.width, height: i.height }, i.transform, !0).map((l) => l.id) : Array.from(i.nodeLookup.keys());
function gC(n) {
  return ze(ee.useCallback(hC(n), [n]), Ke);
}
const mC = (n) => n.updateNodeInternals;
function pC() {
  const n = ze(mC), [i] = ee.useState(() => typeof ResizeObserver > "u" ? null : new ResizeObserver((l) => {
    const r = /* @__PURE__ */ new Map();
    l.forEach((s) => {
      const c = s.target.getAttribute("data-id");
      r.set(c, {
        id: c,
        nodeElement: s.target,
        force: !0
      });
    }), n(r);
  }));
  return ee.useEffect(() => () => {
    i?.disconnect();
  }, [i]), i;
}
function yC({ node: n, nodeType: i, hasDimensions: l, resizeObserver: r }) {
  const s = Je(), c = ee.useRef(null), f = ee.useRef(null), h = ee.useRef(n.sourcePosition), g = ee.useRef(n.targetPosition), m = ee.useRef(i), y = l && !!n.internals.handleBounds;
  return ee.useEffect(() => {
    c.current && !n.hidden && (!y || f.current !== c.current) && (f.current && r?.unobserve(f.current), r?.observe(c.current), f.current = c.current);
  }, [y, n.hidden]), ee.useEffect(() => () => {
    f.current && (r?.unobserve(f.current), f.current = null);
  }, []), ee.useEffect(() => {
    if (c.current) {
      const p = m.current !== i, v = h.current !== n.sourcePosition, x = g.current !== n.targetPosition;
      (p || v || x) && (m.current = i, h.current = n.sourcePosition, g.current = n.targetPosition, s.getState().updateNodeInternals(/* @__PURE__ */ new Map([[n.id, { id: n.id, nodeElement: c.current, force: !0 }]])));
    }
  }, [n.id, i, n.sourcePosition, n.targetPosition]), c;
}
function vC({ id: n, onClick: i, onMouseEnter: l, onMouseMove: r, onMouseLeave: s, onContextMenu: c, onDoubleClick: f, nodesDraggable: h, elementsSelectable: g, nodesConnectable: m, nodesFocusable: y, resizeObserver: p, noDragClassName: v, noPanClassName: x, disableKeyboardA11y: S, rfId: C, nodeTypes: j, nodeClickDistance: O, onError: D }) {
  const { node: E, internals: N, isParent: k } = ze((P) => {
    const ie = P.nodeLookup.get(n), de = P.parentLookup.has(n);
    return {
      node: ie,
      internals: ie.internals,
      isParent: de
    };
  }, Ke);
  let U = E.type || "default", V = j?.[U] || B0[U];
  V === void 0 && (D?.("003", wn.error003(U)), U = "default", V = j?.default || B0.default);
  const X = !!(E.draggable || h && typeof E.draggable > "u"), te = !!(E.selectable || g && typeof E.selectable > "u"), K = !!(E.connectable || m && typeof E.connectable > "u"), Y = !!(E.focusable || y && typeof E.focusable > "u"), Z = Je(), J = cv(E), M = yC({ node: E, nodeType: U, hasDimensions: J, resizeObserver: p }), L = Vv({
    nodeRef: M,
    disabled: E.hidden || !X,
    noDragClassName: v,
    handleSelector: E.dragHandle,
    nodeId: n,
    isSelectable: te,
    nodeClickDistance: O
  }), _ = Yv();
  if (E.hidden)
    return null;
  const z = Fn(E), B = sC(E), $ = te || X || i || l || r || s, F = l ? (P) => l(P, { ...N.userNode }) : void 0, A = r ? (P) => r(P, { ...N.userNode }) : void 0, I = s ? (P) => s(P, { ...N.userNode }) : void 0, G = c ? (P) => c(P, { ...N.userNode }) : void 0, H = f ? (P) => f(P, { ...N.userNode }) : void 0, T = (P) => {
    const { selectNodesOnDrag: ie, nodeDragThreshold: de } = Z.getState();
    te && (!ie || !X || de > 0) && vd({
      id: n,
      store: Z,
      nodeRef: M
    }), i && i(P, { ...N.userNode });
  }, q = (P) => {
    if (!(hv(P.nativeEvent) || S)) {
      if (tv.includes(P.key) && te) {
        const ie = P.key === "Escape";
        vd({
          id: n,
          store: Z,
          unselect: ie,
          nodeRef: M
        });
      } else if (X && E.selected && Object.prototype.hasOwnProperty.call(eu, P.key)) {
        P.preventDefault();
        const { ariaLabelConfig: ie } = Z.getState();
        Z.setState({
          ariaLiveMessage: ie["node.a11yDescription.ariaLiveMessage"]({
            direction: P.key.replace("Arrow", "").toLowerCase(),
            x: ~~N.positionAbsolute.x,
            y: ~~N.positionAbsolute.y
          })
        }), _({
          direction: eu[P.key],
          factor: P.shiftKey ? 4 : 1
        });
      }
    }
  }, Q = () => {
    if (S || !M.current?.matches(":focus-visible"))
      return;
    const { transform: P, width: ie, height: de, autoPanOnNodeFocus: he, setCenter: ge } = Z.getState();
    if (!he)
      return;
    Od(/* @__PURE__ */ new Map([[n, E]]), { x: 0, y: 0, width: ie, height: de }, P, !0).length > 0 || ge(E.position.x + z.width / 2, E.position.y + z.height / 2, {
      zoom: P[2]
    });
  };
  return b.jsx("div", { className: ut([
    "react-flow__node",
    `react-flow__node-${U}`,
    {
      // this is overwritable by passing `nopan` as a class name
      [x]: X
    },
    E.className,
    {
      selected: E.selected,
      selectable: te,
      parent: k,
      draggable: X,
      dragging: L
    }
  ]), ref: M, style: {
    zIndex: N.z,
    transform: `translate(${N.positionAbsolute.x}px,${N.positionAbsolute.y}px)`,
    pointerEvents: $ ? "all" : "none",
    visibility: J ? "visible" : "hidden",
    ...E.style,
    ...B
  }, "data-id": n, "data-testid": `rf__node-${n}`, onMouseEnter: F, onMouseMove: A, onMouseLeave: I, onContextMenu: G, onClick: T, onDoubleClick: H, onKeyDown: Y ? q : void 0, tabIndex: Y ? 0 : void 0, onFocus: Y ? Q : void 0, role: E.ariaRole ?? (Y ? "group" : void 0), "aria-roledescription": "node", "aria-describedby": S ? void 0 : `${Ov}-${C}`, "aria-label": E.ariaLabel, ...E.domAttributes, children: b.jsx(eC, { value: n, children: b.jsx(V, { id: n, data: E.data, type: U, positionAbsoluteX: N.positionAbsolute.x, positionAbsoluteY: N.positionAbsolute.y, selected: E.selected ?? !1, selectable: te, draggable: X, deletable: E.deletable ?? !0, isConnectable: K, sourcePosition: E.sourcePosition, targetPosition: E.targetPosition, dragging: L, dragHandle: E.dragHandle, zIndex: N.z, parentId: E.parentId, ...z }) }) });
}
var bC = ee.memo(vC);
const xC = (n) => ({
  nodesDraggable: n.nodesDraggable,
  nodesConnectable: n.nodesConnectable,
  nodesFocusable: n.nodesFocusable,
  elementsSelectable: n.elementsSelectable,
  onError: n.onError
});
function Xv(n) {
  const { nodesDraggable: i, nodesConnectable: l, nodesFocusable: r, elementsSelectable: s, onError: c } = ze(xC, Ke), f = gC(n.onlyRenderVisibleElements), h = pC();
  return b.jsx("div", { className: "react-flow__nodes", style: mu, children: f.map((g) => (
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
    b.jsx(bC, { id: g, nodeTypes: n.nodeTypes, nodeExtent: n.nodeExtent, onClick: n.onNodeClick, onMouseEnter: n.onNodeMouseEnter, onMouseMove: n.onNodeMouseMove, onMouseLeave: n.onNodeMouseLeave, onContextMenu: n.onNodeContextMenu, onDoubleClick: n.onNodeDoubleClick, noDragClassName: n.noDragClassName, noPanClassName: n.noPanClassName, rfId: n.rfId, disableKeyboardA11y: n.disableKeyboardA11y, resizeObserver: h, nodesDraggable: i, nodesConnectable: l, nodesFocusable: r, elementsSelectable: s, nodeClickDistance: n.nodeClickDistance, onError: c }, g)
  )) });
}
Xv.displayName = "NodeRenderer";
const wC = ee.memo(Xv);
function SC(n) {
  return ze(ee.useCallback((l) => {
    if (!n)
      return l.edges.map((s) => s.id);
    const r = [];
    if (l.width && l.height)
      for (const s of l.edges) {
        const c = l.nodeLookup.get(s.source), f = l.nodeLookup.get(s.target);
        c && f && v2({
          sourceNode: c,
          targetNode: f,
          width: l.width,
          height: l.height,
          transform: l.transform
        }) && r.push(s.id);
      }
    return r;
  }, [n]), Ke);
}
const EC = ({ color: n = "none", strokeWidth: i = 1 }) => {
  const l = {
    strokeWidth: i,
    ...n && { stroke: n }
  };
  return b.jsx("polyline", { className: "arrow", style: l, strokeLinecap: "round", fill: "none", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4" });
}, _C = ({ color: n = "none", strokeWidth: i = 1 }) => {
  const l = {
    strokeWidth: i,
    ...n && { stroke: n, fill: n }
  };
  return b.jsx("polyline", { className: "arrowclosed", style: l, strokeLinecap: "round", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4 -5,-4" });
}, U0 = {
  [Ws.Arrow]: EC,
  [Ws.ArrowClosed]: _C
};
function NC(n) {
  const i = Je();
  return ee.useMemo(() => Object.prototype.hasOwnProperty.call(U0, n) ? U0[n] : (i.getState().onError?.("009", wn.error009(n)), null), [n]);
}
const CC = ({ id: n, type: i, color: l, width: r = 12.5, height: s = 12.5, markerUnits: c = "strokeWidth", strokeWidth: f, orient: h = "auto-start-reverse" }) => {
  const g = NC(i);
  return g ? b.jsx("marker", { className: "react-flow__arrowhead", id: n, markerWidth: `${r}`, markerHeight: `${s}`, viewBox: "-10 -10 20 20", markerUnits: c, orient: h, refX: "0", refY: "0", children: b.jsx(g, { color: l, strokeWidth: f }) }) : null;
}, Gv = ({ defaultColor: n, rfId: i }) => {
  const l = ze((c) => c.edges), r = ze((c) => c.defaultEdgeOptions), s = ee.useMemo(() => C2(l, {
    id: i,
    defaultColor: n,
    defaultMarkerStart: r?.markerStart,
    defaultMarkerEnd: r?.markerEnd
  }), [l, r, i, n]);
  return s.length ? b.jsx("svg", { className: "react-flow__marker", "aria-hidden": "true", children: b.jsx("defs", { children: s.map((c) => b.jsx(CC, { id: c.id, type: c.type, color: c.color, width: c.width, height: c.height, markerUnits: c.markerUnits, strokeWidth: c.strokeWidth, orient: c.orient }, c.id)) }) }) : null;
};
Gv.displayName = "MarkerDefinitions";
var MC = ee.memo(Gv);
function $v({ x: n, y: i, label: l, labelStyle: r, labelShowBg: s = !0, labelBgStyle: c, labelBgPadding: f = [2, 4], labelBgBorderRadius: h = 2, children: g, className: m, ...y }) {
  const [p, v] = ee.useState({ x: 1, y: 0, width: 0, height: 0 }), x = ut(["react-flow__edge-textwrapper", m]), S = ee.useRef(null);
  return ee.useEffect(() => {
    if (S.current) {
      const C = S.current.getBBox();
      v({
        x: C.x,
        y: C.y,
        width: C.width,
        height: C.height
      });
    }
  }, [l]), l ? b.jsxs("g", { transform: `translate(${n - p.width / 2} ${i - p.height / 2})`, className: x, visibility: p.width ? "visible" : "hidden", ...y, children: [s && b.jsx("rect", { width: p.width + 2 * f[0], x: -f[0], y: -f[1], height: p.height + 2 * f[1], className: "react-flow__edge-textbg", style: c, rx: h, ry: h }), b.jsx("text", { className: "react-flow__edge-text", y: p.height / 2, dy: "0.3em", ref: S, style: r, children: l }), g] }) : null;
}
$v.displayName = "EdgeText";
const TC = ee.memo($v);
function Zl({ path: n, labelX: i, labelY: l, label: r, labelStyle: s, labelShowBg: c, labelBgStyle: f, labelBgPadding: h, labelBgBorderRadius: g, interactionWidth: m = 20, ...y }) {
  return b.jsxs(b.Fragment, { children: [b.jsx("path", { ...y, d: n, fill: "none", className: ut(["react-flow__edge-path", y.className]) }), m ? b.jsx("path", { d: n, fill: "none", strokeOpacity: 0, strokeWidth: m, className: "react-flow__edge-interaction" }) : null, r && sn(i) && sn(l) ? b.jsx(TC, { x: i, y: l, label: r, labelStyle: s, labelShowBg: c, labelBgStyle: f, labelBgPadding: h, labelBgBorderRadius: g }) : null] });
}
function V0({ pos: n, x1: i, y1: l, x2: r, y2: s }) {
  return n === ye.Left || n === ye.Right ? [0.5 * (i + r), l] : [i, 0.5 * (l + s)];
}
function Zv({ sourceX: n, sourceY: i, sourcePosition: l = ye.Bottom, targetX: r, targetY: s, targetPosition: c = ye.Top }) {
  const [f, h] = V0({
    pos: l,
    x1: n,
    y1: i,
    x2: r,
    y2: s
  }), [g, m] = V0({
    pos: c,
    x1: r,
    y1: s,
    x2: n,
    y2: i
  }), [y, p, v, x] = mv({
    sourceX: n,
    sourceY: i,
    targetX: r,
    targetY: s,
    sourceControlX: f,
    sourceControlY: h,
    targetControlX: g,
    targetControlY: m
  });
  return [
    `M${n},${i} C${f},${h} ${g},${m} ${r},${s}`,
    y,
    p,
    v,
    x
  ];
}
function Qv(n) {
  return ee.memo(({ id: i, sourceX: l, sourceY: r, targetX: s, targetY: c, sourcePosition: f, targetPosition: h, label: g, labelStyle: m, labelShowBg: y, labelBgStyle: p, labelBgPadding: v, labelBgBorderRadius: x, style: S, markerEnd: C, markerStart: j, interactionWidth: O }) => {
    const [D, E, N] = Zv({
      sourceX: l,
      sourceY: r,
      sourcePosition: f,
      targetX: s,
      targetY: c,
      targetPosition: h
    }), k = n.isInternal ? void 0 : i;
    return b.jsx(Zl, { id: k, path: D, labelX: E, labelY: N, label: g, labelStyle: m, labelShowBg: y, labelBgStyle: p, labelBgPadding: v, labelBgBorderRadius: x, style: S, markerEnd: C, markerStart: j, interactionWidth: O });
  });
}
const jC = Qv({ isInternal: !1 }), Kv = Qv({ isInternal: !0 });
jC.displayName = "SimpleBezierEdge";
Kv.displayName = "SimpleBezierEdgeInternal";
function Jv(n) {
  return ee.memo(({ id: i, sourceX: l, sourceY: r, targetX: s, targetY: c, label: f, labelStyle: h, labelShowBg: g, labelBgStyle: m, labelBgPadding: y, labelBgBorderRadius: p, style: v, sourcePosition: x = ye.Bottom, targetPosition: S = ye.Top, markerEnd: C, markerStart: j, pathOptions: O, interactionWidth: D }) => {
    const [E, N, k] = gd({
      sourceX: l,
      sourceY: r,
      sourcePosition: x,
      targetX: s,
      targetY: c,
      targetPosition: S,
      borderRadius: O?.borderRadius,
      offset: O?.offset,
      stepPosition: O?.stepPosition
    }), U = n.isInternal ? void 0 : i;
    return b.jsx(Zl, { id: U, path: E, labelX: N, labelY: k, label: f, labelStyle: h, labelShowBg: g, labelBgStyle: m, labelBgPadding: y, labelBgBorderRadius: p, style: v, markerEnd: C, markerStart: j, interactionWidth: D });
  });
}
const Wv = Jv({ isInternal: !1 }), Fv = Jv({ isInternal: !0 });
Wv.displayName = "SmoothStepEdge";
Fv.displayName = "SmoothStepEdgeInternal";
function Pv(n) {
  return ee.memo(({ id: i, ...l }) => {
    const r = n.isInternal ? void 0 : i;
    return b.jsx(Wv, { ...l, id: r, pathOptions: ee.useMemo(() => ({ borderRadius: 0, offset: l.pathOptions?.offset }), [l.pathOptions?.offset]) });
  });
}
const AC = Pv({ isInternal: !1 }), eb = Pv({ isInternal: !0 });
AC.displayName = "StepEdge";
eb.displayName = "StepEdgeInternal";
function tb(n) {
  return ee.memo(({ id: i, sourceX: l, sourceY: r, targetX: s, targetY: c, label: f, labelStyle: h, labelShowBg: g, labelBgStyle: m, labelBgPadding: y, labelBgBorderRadius: p, style: v, markerEnd: x, markerStart: S, interactionWidth: C }) => {
    const [j, O, D] = yv({ sourceX: l, sourceY: r, targetX: s, targetY: c }), E = n.isInternal ? void 0 : i;
    return b.jsx(Zl, { id: E, path: j, labelX: O, labelY: D, label: f, labelStyle: h, labelShowBg: g, labelBgStyle: m, labelBgPadding: y, labelBgBorderRadius: p, style: v, markerEnd: x, markerStart: S, interactionWidth: C });
  });
}
const DC = tb({ isInternal: !1 }), nb = tb({ isInternal: !0 });
DC.displayName = "StraightEdge";
nb.displayName = "StraightEdgeInternal";
function ab(n) {
  return ee.memo(({ id: i, sourceX: l, sourceY: r, targetX: s, targetY: c, sourcePosition: f = ye.Bottom, targetPosition: h = ye.Top, label: g, labelStyle: m, labelShowBg: y, labelBgStyle: p, labelBgPadding: v, labelBgBorderRadius: x, style: S, markerEnd: C, markerStart: j, pathOptions: O, interactionWidth: D }) => {
    const [E, N, k] = kd({
      sourceX: l,
      sourceY: r,
      sourcePosition: f,
      targetX: s,
      targetY: c,
      targetPosition: h,
      curvature: O?.curvature
    }), U = n.isInternal ? void 0 : i;
    return b.jsx(Zl, { id: U, path: E, labelX: N, labelY: k, label: g, labelStyle: m, labelShowBg: y, labelBgStyle: p, labelBgPadding: v, labelBgBorderRadius: x, style: S, markerEnd: C, markerStart: j, interactionWidth: D });
  });
}
const OC = ab({ isInternal: !1 }), ib = ab({ isInternal: !0 });
OC.displayName = "BezierEdge";
ib.displayName = "BezierEdgeInternal";
const Y0 = {
  default: ib,
  straight: nb,
  step: eb,
  smoothstep: Fv,
  simplebezier: Kv
}, I0 = {
  sourceX: null,
  sourceY: null,
  targetX: null,
  targetY: null,
  sourcePosition: null,
  targetPosition: null
}, zC = (n, i, l) => l === ye.Left ? n - i : l === ye.Right ? n + i : n, RC = (n, i, l) => l === ye.Top ? n - i : l === ye.Bottom ? n + i : n, q0 = "react-flow__edgeupdater";
function X0({ position: n, centerX: i, centerY: l, radius: r = 10, onMouseDown: s, onMouseEnter: c, onMouseOut: f, type: h }) {
  return b.jsx("circle", { onMouseDown: s, onMouseEnter: c, onMouseOut: f, className: ut([q0, `${q0}-${h}`]), cx: zC(i, r, n), cy: RC(l, r, n), r, stroke: "transparent", fill: "transparent" });
}
function kC({ isReconnectable: n, reconnectRadius: i, edge: l, sourceX: r, sourceY: s, targetX: c, targetY: f, sourcePosition: h, targetPosition: g, onReconnect: m, onReconnectStart: y, onReconnectEnd: p, setReconnecting: v, setUpdateHover: x }) {
  const S = Je(), C = (N, k) => {
    if (N.button !== 0)
      return;
    const { autoPanOnConnect: U, domNode: V, connectionMode: X, connectionRadius: te, lib: K, onConnectStart: Y, cancelConnection: Z, nodeLookup: J, rfId: M, panBy: L, updateConnection: _ } = S.getState(), z = k.type === "target", B = (A, I) => {
      v(!1), p?.(A, l, k.type, I);
    }, $ = (A) => m?.(l, A), F = (A, I) => {
      v(!0), y?.(N, l, k.type), Y?.(A, I);
    };
    yd.onPointerDown(N.nativeEvent, {
      autoPanOnConnect: U,
      connectionMode: X,
      connectionRadius: te,
      domNode: V,
      handleId: k.id,
      nodeId: k.nodeId,
      nodeLookup: J,
      isTarget: z,
      edgeUpdaterType: k.type,
      lib: K,
      flowId: M,
      cancelConnection: Z,
      panBy: L,
      isValidConnection: (...A) => S.getState().isValidConnection?.(...A) ?? !0,
      onConnect: $,
      onConnectStart: F,
      onConnectEnd: (...A) => S.getState().onConnectEnd?.(...A),
      onReconnectEnd: B,
      updateConnection: _,
      getTransform: () => S.getState().transform,
      getFromHandle: () => S.getState().connection.fromHandle,
      dragThreshold: S.getState().connectionDragThreshold,
      handleDomNode: N.currentTarget
    });
  }, j = (N) => C(N, { nodeId: l.target, id: l.targetHandle ?? null, type: "target" }), O = (N) => C(N, { nodeId: l.source, id: l.sourceHandle ?? null, type: "source" }), D = () => x(!0), E = () => x(!1);
  return b.jsxs(b.Fragment, { children: [(n === !0 || n === "source") && b.jsx(X0, { position: h, centerX: r, centerY: s, radius: i, onMouseDown: j, onMouseEnter: D, onMouseOut: E, type: "source" }), (n === !0 || n === "target") && b.jsx(X0, { position: g, centerX: c, centerY: f, radius: i, onMouseDown: O, onMouseEnter: D, onMouseOut: E, type: "target" })] });
}
function HC({ id: n, edgesFocusable: i, edgesReconnectable: l, elementsSelectable: r, onClick: s, onDoubleClick: c, onContextMenu: f, onMouseEnter: h, onMouseMove: g, onMouseLeave: m, reconnectRadius: y, onReconnect: p, onReconnectStart: v, onReconnectEnd: x, rfId: S, edgeTypes: C, noPanClassName: j, onError: O, disableKeyboardA11y: D }) {
  let E = ze((ge) => ge.edgeLookup.get(n));
  const N = ze((ge) => ge.defaultEdgeOptions);
  E = N ? { ...N, ...E } : E;
  let k = E.type || "default", U = C?.[k] || Y0[k];
  U === void 0 && (O?.("011", wn.error011(k)), k = "default", U = C?.default || Y0.default);
  const V = !!(E.focusable || i && typeof E.focusable > "u"), X = typeof p < "u" && (E.reconnectable || l && typeof E.reconnectable > "u"), te = !!(E.selectable || r && typeof E.selectable > "u"), K = ee.useRef(null), [Y, Z] = ee.useState(!1), [J, M] = ee.useState(!1), L = Je(), { zIndex: _, sourceX: z, sourceY: B, targetX: $, targetY: F, sourcePosition: A, targetPosition: I } = ze(ee.useCallback((ge) => {
    const xe = ge.nodeLookup.get(E.source), Se = ge.nodeLookup.get(E.target);
    if (!xe || !Se)
      return {
        zIndex: E.zIndex,
        ...I0
      };
    const _e = N2({
      id: n,
      sourceNode: xe,
      targetNode: Se,
      sourceHandle: E.sourceHandle || null,
      targetHandle: E.targetHandle || null,
      connectionMode: ge.connectionMode,
      onError: O
    });
    return {
      zIndex: y2({
        selected: E.selected,
        zIndex: E.zIndex,
        sourceNode: xe,
        targetNode: Se,
        elevateOnSelect: ge.elevateEdgesOnSelect,
        zIndexMode: ge.zIndexMode
      }),
      ..._e || I0
    };
  }, [E.source, E.target, E.sourceHandle, E.targetHandle, E.selected, E.zIndex]), Ke), G = ee.useMemo(() => E.markerStart ? `url('#${md(E.markerStart, S)}')` : void 0, [E.markerStart, S]), H = ee.useMemo(() => E.markerEnd ? `url('#${md(E.markerEnd, S)}')` : void 0, [E.markerEnd, S]);
  if (E.hidden || z === null || B === null || $ === null || F === null)
    return null;
  const T = (ge) => {
    const { addSelectedEdges: xe, unselectNodesAndEdges: Se, multiSelectionActive: _e } = L.getState();
    te && (L.setState({ nodesSelectionActive: !1 }), E.selected && _e ? (Se({ nodes: [], edges: [E] }), K.current?.blur()) : xe([n])), s && s(ge, E);
  }, q = c ? (ge) => {
    c(ge, { ...E });
  } : void 0, Q = f ? (ge) => {
    f(ge, { ...E });
  } : void 0, P = h ? (ge) => {
    h(ge, { ...E });
  } : void 0, ie = g ? (ge) => {
    g(ge, { ...E });
  } : void 0, de = m ? (ge) => {
    m(ge, { ...E });
  } : void 0, he = (ge) => {
    if (!D && tv.includes(ge.key) && te) {
      const { unselectNodesAndEdges: xe, addSelectedEdges: Se } = L.getState();
      ge.key === "Escape" ? (K.current?.blur(), xe({ edges: [E] })) : Se([n]);
    }
  };
  return b.jsx("svg", { style: { zIndex: _ }, children: b.jsxs("g", { className: ut([
    "react-flow__edge",
    `react-flow__edge-${k}`,
    E.className,
    j,
    {
      selected: E.selected,
      animated: E.animated,
      inactive: !te && !s,
      updating: Y,
      selectable: te
    }
  ]), onClick: T, onDoubleClick: q, onContextMenu: Q, onMouseEnter: P, onMouseMove: ie, onMouseLeave: de, onKeyDown: V ? he : void 0, tabIndex: V ? 0 : void 0, role: E.ariaRole ?? (V ? "group" : "img"), "aria-roledescription": "edge", "data-id": n, "data-testid": `rf__edge-${n}`, "aria-label": E.ariaLabel === null ? void 0 : E.ariaLabel || `Edge from ${E.source} to ${E.target}`, "aria-describedby": V ? `${zv}-${S}` : void 0, ref: K, ...E.domAttributes, children: [!J && b.jsx(U, { id: n, source: E.source, target: E.target, type: E.type, selected: E.selected, animated: E.animated, selectable: te, deletable: E.deletable ?? !0, label: E.label, labelStyle: E.labelStyle, labelShowBg: E.labelShowBg, labelBgStyle: E.labelBgStyle, labelBgPadding: E.labelBgPadding, labelBgBorderRadius: E.labelBgBorderRadius, sourceX: z, sourceY: B, targetX: $, targetY: F, sourcePosition: A, targetPosition: I, data: E.data, style: E.style, sourceHandleId: E.sourceHandle, targetHandleId: E.targetHandle, markerStart: G, markerEnd: H, pathOptions: "pathOptions" in E ? E.pathOptions : void 0, interactionWidth: E.interactionWidth }), X && b.jsx(kC, { edge: E, isReconnectable: X, reconnectRadius: y, onReconnect: p, onReconnectStart: v, onReconnectEnd: x, sourceX: z, sourceY: B, targetX: $, targetY: F, sourcePosition: A, targetPosition: I, setUpdateHover: Z, setReconnecting: M })] }) });
}
var BC = ee.memo(HC);
const LC = (n) => ({
  edgesFocusable: n.edgesFocusable,
  edgesReconnectable: n.edgesReconnectable,
  elementsSelectable: n.elementsSelectable,
  connectionMode: n.connectionMode,
  onError: n.onError
});
function ob({ defaultMarkerColor: n, onlyRenderVisibleElements: i, rfId: l, edgeTypes: r, noPanClassName: s, onReconnect: c, onEdgeContextMenu: f, onEdgeMouseEnter: h, onEdgeMouseMove: g, onEdgeMouseLeave: m, onEdgeClick: y, reconnectRadius: p, onEdgeDoubleClick: v, onReconnectStart: x, onReconnectEnd: S, disableKeyboardA11y: C }) {
  const { edgesFocusable: j, edgesReconnectable: O, elementsSelectable: D, onError: E } = ze(LC, Ke), N = SC(i);
  return b.jsxs("div", { className: "react-flow__edges", children: [b.jsx(MC, { defaultColor: n, rfId: l }), N.map((k) => b.jsx(BC, { id: k, edgesFocusable: j, edgesReconnectable: O, elementsSelectable: D, noPanClassName: s, onReconnect: c, onContextMenu: f, onMouseEnter: h, onMouseMove: g, onMouseLeave: m, onClick: y, reconnectRadius: p, onDoubleClick: v, onReconnectStart: x, onReconnectEnd: S, rfId: l, onError: E, edgeTypes: r, disableKeyboardA11y: C }, k))] });
}
ob.displayName = "EdgeRenderer";
const UC = ee.memo(ob), VC = (n) => `translate(${n.transform[0]}px,${n.transform[1]}px) scale(${n.transform[2]})`;
function YC({ children: n }) {
  const i = ze(VC);
  return b.jsx("div", { className: "react-flow__viewport xyflow__viewport react-flow__container", style: { transform: i }, children: n });
}
function IC(n) {
  const i = gu(), l = ee.useRef(!1);
  ee.useEffect(() => {
    !l.current && i.viewportInitialized && n && (setTimeout(() => n(i), 1), l.current = !0);
  }, [n, i.viewportInitialized]);
}
const qC = (n) => n.panZoom?.syncViewport;
function XC(n) {
  const i = ze(qC), l = Je();
  return ee.useEffect(() => {
    n && (i?.(n), l.setState({ transform: [n.x, n.y, n.zoom] }));
  }, [n, i]), null;
}
function GC(n) {
  return n.connection.inProgress ? { ...n.connection, to: $l(n.connection.to, n.transform) } : { ...n.connection };
}
function $C(n) {
  return GC;
}
function ZC(n) {
  const i = $C();
  return ze(i, Ke);
}
const QC = (n) => ({
  nodesConnectable: n.nodesConnectable,
  isValid: n.connection.isValid,
  inProgress: n.connection.inProgress,
  width: n.width,
  height: n.height
});
function KC({ containerStyle: n, style: i, type: l, component: r }) {
  const { nodesConnectable: s, width: c, height: f, isValid: h, inProgress: g } = ze(QC, Ke);
  return !(c && s && g) ? null : b.jsx("svg", { style: n, width: c, height: f, className: "react-flow__connectionline react-flow__container", children: b.jsx("g", { className: ut(["react-flow__connection", iv(h)]), children: b.jsx(lb, { style: i, type: l, CustomComponent: r, isValid: h }) }) });
}
const lb = ({ style: n, type: i = Da.Bezier, CustomComponent: l, isValid: r }) => {
  const { inProgress: s, from: c, fromNode: f, fromHandle: h, fromPosition: g, to: m, toNode: y, toHandle: p, toPosition: v, pointer: x } = ZC();
  if (!s)
    return;
  if (l)
    return b.jsx(l, { connectionLineType: i, connectionLineStyle: n, fromNode: f, fromHandle: h, fromX: c.x, fromY: c.y, toX: m.x, toY: m.y, fromPosition: g, toPosition: v, connectionStatus: iv(r), toNode: y, toHandle: p, pointer: x });
  let S = "";
  const C = {
    sourceX: c.x,
    sourceY: c.y,
    sourcePosition: g,
    targetX: m.x,
    targetY: m.y,
    targetPosition: v
  };
  switch (i) {
    case Da.Bezier:
      [S] = kd(C);
      break;
    case Da.SimpleBezier:
      [S] = Zv(C);
      break;
    case Da.Step:
      [S] = gd({
        ...C,
        borderRadius: 0
      });
      break;
    case Da.SmoothStep:
      [S] = gd(C);
      break;
    default:
      [S] = yv(C);
  }
  return b.jsx("path", { d: S, fill: "none", className: "react-flow__connection-path", style: n });
};
lb.displayName = "ConnectionLine";
const JC = {};
function G0(n = JC) {
  ee.useRef(n), Je(), ee.useEffect(() => {
  }, [n]);
}
function WC() {
  Je(), ee.useRef(!1), ee.useEffect(() => {
  }, []);
}
function rb({ nodeTypes: n, edgeTypes: i, onInit: l, onNodeClick: r, onEdgeClick: s, onNodeDoubleClick: c, onEdgeDoubleClick: f, onNodeMouseEnter: h, onNodeMouseMove: g, onNodeMouseLeave: m, onNodeContextMenu: y, onSelectionContextMenu: p, onSelectionStart: v, onSelectionEnd: x, connectionLineType: S, connectionLineStyle: C, connectionLineComponent: j, connectionLineContainerStyle: O, selectionKeyCode: D, selectionOnDrag: E, selectionMode: N, multiSelectionKeyCode: k, panActivationKeyCode: U, zoomActivationKeyCode: V, deleteKeyCode: X, onlyRenderVisibleElements: te, elementsSelectable: K, defaultViewport: Y, translateExtent: Z, minZoom: J, maxZoom: M, preventScrolling: L, defaultMarkerColor: _, zoomOnScroll: z, zoomOnPinch: B, panOnScroll: $, panOnScrollSpeed: F, panOnScrollMode: A, zoomOnDoubleClick: I, panOnDrag: G, onPaneClick: H, onPaneMouseEnter: T, onPaneMouseMove: q, onPaneMouseLeave: Q, onPaneScroll: P, onPaneContextMenu: ie, paneClickDistance: de, nodeClickDistance: he, onEdgeContextMenu: ge, onEdgeMouseEnter: xe, onEdgeMouseMove: Se, onEdgeMouseLeave: _e, reconnectRadius: De, onReconnect: Pe, onReconnectStart: Et, onReconnectEnd: zt, noDragClassName: en, noWheelClassName: En, noPanClassName: Ra, disableKeyboardA11y: ka, nodeExtent: ht, rfId: pi, viewport: _n, onViewportChange: Pn }) {
  return G0(n), G0(i), WC(), IC(l), XC(_n), b.jsx(dC, { onPaneClick: H, onPaneMouseEnter: T, onPaneMouseMove: q, onPaneMouseLeave: Q, onPaneContextMenu: ie, onPaneScroll: P, paneClickDistance: de, deleteKeyCode: X, selectionKeyCode: D, selectionOnDrag: E, selectionMode: N, onSelectionStart: v, onSelectionEnd: x, multiSelectionKeyCode: k, panActivationKeyCode: U, zoomActivationKeyCode: V, elementsSelectable: K, zoomOnScroll: z, zoomOnPinch: B, zoomOnDoubleClick: I, panOnScroll: $, panOnScrollSpeed: F, panOnScrollMode: A, panOnDrag: G, defaultViewport: Y, translateExtent: Z, minZoom: J, maxZoom: M, onSelectionContextMenu: p, preventScrolling: L, noDragClassName: en, noWheelClassName: En, noPanClassName: Ra, disableKeyboardA11y: ka, onViewportChange: Pn, isControlledViewport: !!_n, children: b.jsxs(YC, { children: [b.jsx(UC, { edgeTypes: i, onEdgeClick: s, onEdgeDoubleClick: f, onReconnect: Pe, onReconnectStart: Et, onReconnectEnd: zt, onlyRenderVisibleElements: te, onEdgeContextMenu: ge, onEdgeMouseEnter: xe, onEdgeMouseMove: Se, onEdgeMouseLeave: _e, reconnectRadius: De, defaultMarkerColor: _, noPanClassName: Ra, disableKeyboardA11y: ka, rfId: pi }), b.jsx(KC, { style: C, type: S, component: j, containerStyle: O }), b.jsx("div", { className: "react-flow__edgelabel-renderer" }), b.jsx(wC, { nodeTypes: n, onNodeClick: r, onNodeDoubleClick: c, onNodeMouseEnter: h, onNodeMouseMove: g, onNodeMouseLeave: m, onNodeContextMenu: y, nodeClickDistance: he, onlyRenderVisibleElements: te, noPanClassName: Ra, noDragClassName: en, disableKeyboardA11y: ka, nodeExtent: ht, rfId: pi }), b.jsx("div", { className: "react-flow__viewport-portal" })] }) });
}
rb.displayName = "GraphView";
const FC = ee.memo(rb), $0 = ({ nodes: n, edges: i, defaultNodes: l, defaultEdges: r, width: s, height: c, fitView: f, fitViewOptions: h, minZoom: g = 0.5, maxZoom: m = 2, nodeOrigin: y, nodeExtent: p, zIndexMode: v = "basic" } = {}) => {
  const x = /* @__PURE__ */ new Map(), S = /* @__PURE__ */ new Map(), C = /* @__PURE__ */ new Map(), j = /* @__PURE__ */ new Map(), O = r ?? i ?? [], D = l ?? n ?? [], E = y ?? [0, 0], N = p ?? Rl;
  xv(C, j, O);
  const k = pd(D, x, S, {
    nodeOrigin: E,
    nodeExtent: N,
    zIndexMode: v
  });
  let U = [0, 0, 1];
  if (f && s && c) {
    const V = Xl(x, {
      filter: (Y) => !!((Y.width || Y.initialWidth) && (Y.height || Y.initialHeight))
    }), { x: X, y: te, zoom: K } = zd(V, s, c, g, m, h?.padding ?? 0.1);
    U = [X, te, K];
  }
  return {
    rfId: "1",
    width: s ?? 0,
    height: c ?? 0,
    transform: U,
    nodes: D,
    nodesInitialized: k,
    nodeLookup: x,
    parentLookup: S,
    edges: O,
    edgeLookup: j,
    connectionLookup: C,
    onNodesChange: null,
    onEdgesChange: null,
    hasDefaultNodes: l !== void 0,
    hasDefaultEdges: r !== void 0,
    panZoom: null,
    minZoom: g,
    maxZoom: m,
    translateExtent: Rl,
    nodeExtent: N,
    nodesSelectionActive: !1,
    userSelectionActive: !1,
    userSelectionRect: null,
    connectionMode: go.Strict,
    domNode: null,
    paneDragging: !1,
    noPanClassName: "nopan",
    nodeOrigin: E,
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
    fitViewQueued: f ?? !1,
    fitViewOptions: h,
    fitViewResolver: null,
    connection: { ...av },
    connectionClickStartHandle: null,
    connectOnClick: !0,
    ariaLiveMessage: "",
    autoPanOnConnect: !0,
    autoPanOnNodeDrag: !0,
    autoPanOnNodeFocus: !0,
    autoPanSpeed: 15,
    connectionRadius: 20,
    onError: f2,
    isValidConnection: void 0,
    onSelectionChangeHandlers: [],
    lib: "react",
    debug: !1,
    ariaLabelConfig: nv,
    zIndexMode: v,
    onNodesChangeMiddlewareMap: /* @__PURE__ */ new Map(),
    onEdgesChangeMiddlewareMap: /* @__PURE__ */ new Map()
  };
}, PC = ({ nodes: n, edges: i, defaultNodes: l, defaultEdges: r, width: s, height: c, fitView: f, fitViewOptions: h, minZoom: g, maxZoom: m, nodeOrigin: y, nodeExtent: p, zIndexMode: v }) => mN((x, S) => {
  async function C() {
    const { nodeLookup: j, panZoom: O, fitViewOptions: D, fitViewResolver: E, width: N, height: k, minZoom: U, maxZoom: V } = S();
    O && (await u2({
      nodes: j,
      width: N,
      height: k,
      panZoom: O,
      minZoom: U,
      maxZoom: V
    }, D), E?.resolve(!0), x({ fitViewResolver: null }));
  }
  return {
    ...$0({
      nodes: n,
      edges: i,
      width: s,
      height: c,
      fitView: f,
      fitViewOptions: h,
      minZoom: g,
      maxZoom: m,
      nodeOrigin: y,
      nodeExtent: p,
      defaultNodes: l,
      defaultEdges: r,
      zIndexMode: v
    }),
    setNodes: (j) => {
      const { nodeLookup: O, parentLookup: D, nodeOrigin: E, elevateNodesOnSelect: N, fitViewQueued: k, zIndexMode: U } = S(), V = pd(j, O, D, {
        nodeOrigin: E,
        nodeExtent: p,
        elevateNodesOnSelect: N,
        checkEquality: !0,
        zIndexMode: U
      });
      k && V ? (C(), x({ nodes: j, nodesInitialized: V, fitViewQueued: !1, fitViewOptions: void 0 })) : x({ nodes: j, nodesInitialized: V });
    },
    setEdges: (j) => {
      const { connectionLookup: O, edgeLookup: D } = S();
      xv(O, D, j), x({ edges: j });
    },
    setDefaultNodesAndEdges: (j, O) => {
      if (j) {
        const { setNodes: D } = S();
        D(j), x({ hasDefaultNodes: !0 });
      }
      if (O) {
        const { setEdges: D } = S();
        D(O), x({ hasDefaultEdges: !0 });
      }
    },
    /*
     * Every node gets registerd at a ResizeObserver. Whenever a node
     * changes its dimensions, this function is called to measure the
     * new dimensions and update the nodes.
     */
    updateNodeInternals: (j) => {
      const { triggerNodeChanges: O, nodeLookup: D, parentLookup: E, domNode: N, nodeOrigin: k, nodeExtent: U, debug: V, fitViewQueued: X, zIndexMode: te } = S(), { changes: K, updatedInternals: Y } = z2(j, D, E, N, k, U, te);
      Y && (j2(D, E, { nodeOrigin: k, nodeExtent: U, zIndexMode: te }), X ? (C(), x({ fitViewQueued: !1, fitViewOptions: void 0 })) : x({}), K?.length > 0 && (V && console.log("React Flow: trigger node changes", K), O?.(K)));
    },
    updateNodePositions: (j, O = !1) => {
      const D = [];
      let E = [];
      const { nodeLookup: N, triggerNodeChanges: k, connection: U, updateConnection: V, onNodesChangeMiddlewareMap: X } = S();
      for (const [te, K] of j) {
        const Y = N.get(te), Z = !!(Y?.expandParent && Y?.parentId && K?.position), J = {
          id: te,
          type: "position",
          position: Z ? {
            x: Math.max(0, K.position.x),
            y: Math.max(0, K.position.y)
          } : K.position,
          dragging: O
        };
        if (Y && U.inProgress && U.fromNode.id === Y.id) {
          const M = mi(Y, U.fromHandle, ye.Left, !0);
          V({ ...U, from: M });
        }
        Z && Y.parentId && D.push({
          id: te,
          parentId: Y.parentId,
          rect: {
            ...K.internals.positionAbsolute,
            width: K.measured.width ?? 0,
            height: K.measured.height ?? 0
          }
        }), E.push(J);
      }
      if (D.length > 0) {
        const { parentLookup: te, nodeOrigin: K } = S(), Y = Vd(D, N, te, K);
        E.push(...Y);
      }
      for (const te of X.values())
        E = te(E);
      k(E);
    },
    triggerNodeChanges: (j) => {
      const { onNodesChange: O, setNodes: D, nodes: E, hasDefaultNodes: N, debug: k } = S();
      if (j?.length) {
        if (N) {
          const U = Hv(j, E);
          D(U);
        }
        k && console.log("React Flow: trigger node changes", j), O?.(j);
      }
    },
    triggerEdgeChanges: (j) => {
      const { onEdgesChange: O, setEdges: D, edges: E, hasDefaultEdges: N, debug: k } = S();
      if (j?.length) {
        if (N) {
          const U = Bv(j, E);
          D(U);
        }
        k && console.log("React Flow: trigger edge changes", j), O?.(j);
      }
    },
    addSelectedNodes: (j) => {
      const { multiSelectionActive: O, edgeLookup: D, nodeLookup: E, triggerNodeChanges: N, triggerEdgeChanges: k } = S();
      if (O) {
        const U = j.map((V) => li(V, !0));
        N(U);
        return;
      }
      N(so(E, /* @__PURE__ */ new Set([...j]), !0)), k(so(D));
    },
    addSelectedEdges: (j) => {
      const { multiSelectionActive: O, edgeLookup: D, nodeLookup: E, triggerNodeChanges: N, triggerEdgeChanges: k } = S();
      if (O) {
        const U = j.map((V) => li(V, !0));
        k(U);
        return;
      }
      k(so(D, /* @__PURE__ */ new Set([...j]))), N(so(E, /* @__PURE__ */ new Set(), !0));
    },
    unselectNodesAndEdges: ({ nodes: j, edges: O } = {}) => {
      const { edges: D, nodes: E, nodeLookup: N, triggerNodeChanges: k, triggerEdgeChanges: U } = S(), V = j || E, X = O || D, te = [];
      for (const Y of V) {
        if (!Y.selected)
          continue;
        const Z = N.get(Y.id);
        Z && (Z.selected = !1), te.push(li(Y.id, !1));
      }
      const K = [];
      for (const Y of X)
        Y.selected && K.push(li(Y.id, !1));
      k(te), U(K);
    },
    setMinZoom: (j) => {
      const { panZoom: O, maxZoom: D } = S();
      O?.setScaleExtent([j, D]), x({ minZoom: j });
    },
    setMaxZoom: (j) => {
      const { panZoom: O, minZoom: D } = S();
      O?.setScaleExtent([D, j]), x({ maxZoom: j });
    },
    setTranslateExtent: (j) => {
      S().panZoom?.setTranslateExtent(j), x({ translateExtent: j });
    },
    resetSelectedElements: () => {
      const { edges: j, nodes: O, triggerNodeChanges: D, triggerEdgeChanges: E, elementsSelectable: N } = S();
      if (!N)
        return;
      const k = O.reduce((V, X) => X.selected ? [...V, li(X.id, !1)] : V, []), U = j.reduce((V, X) => X.selected ? [...V, li(X.id, !1)] : V, []);
      D(k), E(U);
    },
    setNodeExtent: (j) => {
      const { nodes: O, nodeLookup: D, parentLookup: E, nodeOrigin: N, elevateNodesOnSelect: k, nodeExtent: U, zIndexMode: V } = S();
      j[0][0] === U[0][0] && j[0][1] === U[0][1] && j[1][0] === U[1][0] && j[1][1] === U[1][1] || (pd(O, D, E, {
        nodeOrigin: N,
        nodeExtent: j,
        elevateNodesOnSelect: k,
        checkEquality: !1,
        zIndexMode: V
      }), x({ nodeExtent: j }));
    },
    panBy: (j) => {
      const { transform: O, width: D, height: E, panZoom: N, translateExtent: k } = S();
      return R2({ delta: j, panZoom: N, transform: O, translateExtent: k, width: D, height: E });
    },
    setCenter: async (j, O, D) => {
      const { width: E, height: N, maxZoom: k, panZoom: U } = S();
      if (!U)
        return Promise.resolve(!1);
      const V = typeof D?.zoom < "u" ? D.zoom : k;
      return await U.setViewport({
        x: E / 2 - j * V,
        y: N / 2 - O * V,
        zoom: V
      }, { duration: D?.duration, ease: D?.ease, interpolate: D?.interpolate }), Promise.resolve(!0);
    },
    cancelConnection: () => {
      x({
        connection: { ...av }
      });
    },
    updateConnection: (j) => {
      x({ connection: j });
    },
    reset: () => x({ ...$0() })
  };
}, Object.is);
function sb({ initialNodes: n, initialEdges: i, defaultNodes: l, defaultEdges: r, initialWidth: s, initialHeight: c, initialMinZoom: f, initialMaxZoom: h, initialFitViewOptions: g, fitView: m, nodeOrigin: y, nodeExtent: p, zIndexMode: v, children: x }) {
  const [S] = ee.useState(() => PC({
    nodes: n,
    edges: i,
    defaultNodes: l,
    defaultEdges: r,
    width: s,
    height: c,
    fitView: m,
    minZoom: f,
    maxZoom: h,
    fitViewOptions: g,
    nodeOrigin: y,
    nodeExtent: p,
    zIndexMode: v
  }));
  return b.jsx(vN, { value: S, children: b.jsx(YN, { children: x }) });
}
function eM({ children: n, nodes: i, edges: l, defaultNodes: r, defaultEdges: s, width: c, height: f, fitView: h, fitViewOptions: g, minZoom: m, maxZoom: y, nodeOrigin: p, nodeExtent: v, zIndexMode: x }) {
  return ee.useContext(du) ? b.jsx(b.Fragment, { children: n }) : b.jsx(sb, { initialNodes: i, initialEdges: l, defaultNodes: r, defaultEdges: s, initialWidth: c, initialHeight: f, fitView: h, initialFitViewOptions: g, initialMinZoom: m, initialMaxZoom: y, nodeOrigin: p, nodeExtent: v, zIndexMode: x, children: n });
}
const tM = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  zIndex: 0
};
function nM({ nodes: n, edges: i, defaultNodes: l, defaultEdges: r, className: s, nodeTypes: c, edgeTypes: f, onNodeClick: h, onEdgeClick: g, onInit: m, onMove: y, onMoveStart: p, onMoveEnd: v, onConnect: x, onConnectStart: S, onConnectEnd: C, onClickConnectStart: j, onClickConnectEnd: O, onNodeMouseEnter: D, onNodeMouseMove: E, onNodeMouseLeave: N, onNodeContextMenu: k, onNodeDoubleClick: U, onNodeDragStart: V, onNodeDrag: X, onNodeDragStop: te, onNodesDelete: K, onEdgesDelete: Y, onDelete: Z, onSelectionChange: J, onSelectionDragStart: M, onSelectionDrag: L, onSelectionDragStop: _, onSelectionContextMenu: z, onSelectionStart: B, onSelectionEnd: $, onBeforeDelete: F, connectionMode: A, connectionLineType: I = Da.Bezier, connectionLineStyle: G, connectionLineComponent: H, connectionLineContainerStyle: T, deleteKeyCode: q = "Backspace", selectionKeyCode: Q = "Shift", selectionOnDrag: P = !1, selectionMode: ie = kl.Full, panActivationKeyCode: de = "Space", multiSelectionKeyCode: he = Bl() ? "Meta" : "Control", zoomActivationKeyCode: ge = Bl() ? "Meta" : "Control", snapToGrid: xe, snapGrid: Se, onlyRenderVisibleElements: _e = !1, selectNodesOnDrag: De, nodesDraggable: Pe, autoPanOnNodeFocus: Et, nodesConnectable: zt, nodesFocusable: en, nodeOrigin: En = Rv, edgesFocusable: Ra, edgesReconnectable: ka, elementsSelectable: ht = !0, defaultViewport: pi = DN, minZoom: _n = 0.5, maxZoom: Pn = 2, translateExtent: Ha = Rl, preventScrolling: pu = !0, nodeExtent: yi, defaultMarkerColor: yu = "#b1b1b7", zoomOnScroll: vu = !0, zoomOnPinch: Ba = !0, panOnScroll: xt = !1, panOnScrollSpeed: dn = 0.5, panOnScrollMode: wt = fi.Free, zoomOnDoubleClick: bu = !0, panOnDrag: xu = !0, onPaneClick: wu, onPaneMouseEnter: vi, onPaneMouseMove: bi, onPaneMouseLeave: xi, onPaneScroll: Nn, onPaneContextMenu: wi, paneClickDistance: La = 1, nodeClickDistance: Su = 0, children: Ql, onReconnect: xo, onReconnectStart: Ua, onReconnectEnd: Eu, onEdgeContextMenu: Kl, onEdgeDoubleClick: Jl, onEdgeMouseEnter: Wl, onEdgeMouseMove: wo, onEdgeMouseLeave: So, reconnectRadius: Fl = 10, onNodesChange: Pl, onEdgesChange: hn, noDragClassName: ct = "nodrag", noWheelClassName: vt = "nowheel", noPanClassName: Cn = "nopan", fitView: Si, fitViewOptions: er, connectOnClick: _u, attributionPosition: tr, proOptions: Va, defaultEdgeOptions: Eo, elevateNodesOnSelect: ea = !0, elevateEdgesOnSelect: ta = !1, disableKeyboardA11y: na = !1, autoPanOnConnect: aa, autoPanOnNodeDrag: at, autoPanSpeed: nr, connectionRadius: ar, isValidConnection: Mn, onError: ia, style: Nu, id: _o, nodeDragThreshold: ir, connectionDragThreshold: Cu, viewport: Ei, onViewportChange: _i, width: tn, height: _t, colorMode: or = "light", debug: Mu, onScroll: Ni, ariaLabelConfig: lr, zIndexMode: Ya = "basic", ...Tu }, Nt) {
  const Ia = _o || "1", rr = kN(or), No = ee.useCallback((Tn) => {
    Tn.currentTarget.scrollTo({ top: 0, left: 0, behavior: "instant" }), Ni?.(Tn);
  }, [Ni]);
  return b.jsx("div", { "data-testid": "rf__wrapper", ...Tu, onScroll: No, style: { ...Nu, ...tM }, ref: Nt, className: ut(["react-flow", s, rr]), id: _o, role: "application", children: b.jsxs(eM, { nodes: n, edges: i, width: tn, height: _t, fitView: Si, fitViewOptions: er, minZoom: _n, maxZoom: Pn, nodeOrigin: En, nodeExtent: yi, zIndexMode: Ya, children: [b.jsx(FC, { onInit: m, onNodeClick: h, onEdgeClick: g, onNodeMouseEnter: D, onNodeMouseMove: E, onNodeMouseLeave: N, onNodeContextMenu: k, onNodeDoubleClick: U, nodeTypes: c, edgeTypes: f, connectionLineType: I, connectionLineStyle: G, connectionLineComponent: H, connectionLineContainerStyle: T, selectionKeyCode: Q, selectionOnDrag: P, selectionMode: ie, deleteKeyCode: q, multiSelectionKeyCode: he, panActivationKeyCode: de, zoomActivationKeyCode: ge, onlyRenderVisibleElements: _e, defaultViewport: pi, translateExtent: Ha, minZoom: _n, maxZoom: Pn, preventScrolling: pu, zoomOnScroll: vu, zoomOnPinch: Ba, zoomOnDoubleClick: bu, panOnScroll: xt, panOnScrollSpeed: dn, panOnScrollMode: wt, panOnDrag: xu, onPaneClick: wu, onPaneMouseEnter: vi, onPaneMouseMove: bi, onPaneMouseLeave: xi, onPaneScroll: Nn, onPaneContextMenu: wi, paneClickDistance: La, nodeClickDistance: Su, onSelectionContextMenu: z, onSelectionStart: B, onSelectionEnd: $, onReconnect: xo, onReconnectStart: Ua, onReconnectEnd: Eu, onEdgeContextMenu: Kl, onEdgeDoubleClick: Jl, onEdgeMouseEnter: Wl, onEdgeMouseMove: wo, onEdgeMouseLeave: So, reconnectRadius: Fl, defaultMarkerColor: yu, noDragClassName: ct, noWheelClassName: vt, noPanClassName: Cn, rfId: Ia, disableKeyboardA11y: na, nodeExtent: yi, viewport: Ei, onViewportChange: _i }), b.jsx(RN, { nodes: n, edges: i, defaultNodes: l, defaultEdges: r, onConnect: x, onConnectStart: S, onConnectEnd: C, onClickConnectStart: j, onClickConnectEnd: O, nodesDraggable: Pe, autoPanOnNodeFocus: Et, nodesConnectable: zt, nodesFocusable: en, edgesFocusable: Ra, edgesReconnectable: ka, elementsSelectable: ht, elevateNodesOnSelect: ea, elevateEdgesOnSelect: ta, minZoom: _n, maxZoom: Pn, nodeExtent: yi, onNodesChange: Pl, onEdgesChange: hn, snapToGrid: xe, snapGrid: Se, connectionMode: A, translateExtent: Ha, connectOnClick: _u, defaultEdgeOptions: Eo, fitView: Si, fitViewOptions: er, onNodesDelete: K, onEdgesDelete: Y, onDelete: Z, onNodeDragStart: V, onNodeDrag: X, onNodeDragStop: te, onSelectionDrag: L, onSelectionDragStart: M, onSelectionDragStop: _, onMove: y, onMoveStart: p, onMoveEnd: v, noPanClassName: Cn, nodeOrigin: En, rfId: Ia, autoPanOnConnect: aa, autoPanOnNodeDrag: at, autoPanSpeed: nr, onError: ia, connectionRadius: ar, isValidConnection: Mn, selectNodesOnDrag: De, nodeDragThreshold: ir, connectionDragThreshold: Cu, onBeforeDelete: F, debug: Mu, ariaLabelConfig: lr, zIndexMode: Ya }), b.jsx(AN, { onSelectionChange: J }), Ql, b.jsx(NN, { proOptions: Va, position: tr }), b.jsx(_N, { rfId: Ia, disableKeyboardA11y: na })] }) });
}
var aM = Lv(nM);
const iM = (n) => n.domNode?.querySelector(".react-flow__edgelabel-renderer");
function oM({ children: n }) {
  const i = ze(iM);
  return i ? yN.createPortal(n, i) : null;
}
function lM(n) {
  const [i, l] = ee.useState(n), r = ee.useCallback((s) => l((c) => Hv(s, c)), []);
  return [i, l, r];
}
function rM(n) {
  const [i, l] = ee.useState(n), r = ee.useCallback((s) => l((c) => Bv(s, c)), []);
  return [i, l, r];
}
function sM({ dimensions: n, lineWidth: i, variant: l, className: r }) {
  return b.jsx("path", { strokeWidth: i, d: `M${n[0] / 2} 0 V${n[1]} M0 ${n[1] / 2} H${n[0]}`, className: ut(["react-flow__background-pattern", l, r]) });
}
function uM({ radius: n, className: i }) {
  return b.jsx("circle", { cx: n, cy: n, r: n, className: ut(["react-flow__background-pattern", "dots", i]) });
}
var Jn;
(function(n) {
  n.Lines = "lines", n.Dots = "dots", n.Cross = "cross";
})(Jn || (Jn = {}));
const cM = {
  [Jn.Dots]: 1,
  [Jn.Lines]: 1,
  [Jn.Cross]: 6
}, fM = (n) => ({ transform: n.transform, patternId: `pattern-${n.rfId}` });
function ub({
  id: n,
  variant: i = Jn.Dots,
  // only used for dots and cross
  gap: l = 20,
  // only used for lines and cross
  size: r,
  lineWidth: s = 1,
  offset: c = 0,
  color: f,
  bgColor: h,
  style: g,
  className: m,
  patternClassName: y
}) {
  const p = ee.useRef(null), { transform: v, patternId: x } = ze(fM, Ke), S = r || cM[i], C = i === Jn.Dots, j = i === Jn.Cross, O = Array.isArray(l) ? l : [l, l], D = [O[0] * v[2] || 1, O[1] * v[2] || 1], E = S * v[2], N = Array.isArray(c) ? c : [c, c], k = j ? [E, E] : D, U = [
    N[0] * v[2] || 1 + k[0] / 2,
    N[1] * v[2] || 1 + k[1] / 2
  ], V = `${x}${n || ""}`;
  return b.jsxs("svg", { className: ut(["react-flow__background", m]), style: {
    ...g,
    ...mu,
    "--xy-background-color-props": h,
    "--xy-background-pattern-color-props": f
  }, ref: p, "data-testid": "rf__background", children: [b.jsx("pattern", { id: V, x: v[0] % D[0], y: v[1] % D[1], width: D[0], height: D[1], patternUnits: "userSpaceOnUse", patternTransform: `translate(-${U[0]},-${U[1]})`, children: C ? b.jsx(uM, { radius: E / 2, className: y }) : b.jsx(sM, { dimensions: k, lineWidth: s, variant: i, className: y }) }), b.jsx("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: `url(#${V})` })] });
}
ub.displayName = "Background";
const dM = ee.memo(ub);
function hM() {
  return b.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", children: b.jsx("path", { d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" }) });
}
function gM() {
  return b.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 5", children: b.jsx("path", { d: "M0 0h32v4.2H0z" }) });
}
function mM() {
  return b.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 30", children: b.jsx("path", { d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" }) });
}
function pM() {
  return b.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: b.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z" }) });
}
function yM() {
  return b.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: b.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z" }) });
}
function As({ children: n, className: i, ...l }) {
  return b.jsx("button", { type: "button", className: ut(["react-flow__controls-button", i]), ...l, children: n });
}
const vM = (n) => ({
  isInteractive: n.nodesDraggable || n.nodesConnectable || n.elementsSelectable,
  minZoomReached: n.transform[2] <= n.minZoom,
  maxZoomReached: n.transform[2] >= n.maxZoom,
  ariaLabelConfig: n.ariaLabelConfig
});
function cb({ style: n, showZoom: i = !0, showFitView: l = !0, showInteractive: r = !0, fitViewOptions: s, onZoomIn: c, onZoomOut: f, onFitView: h, onInteractiveChange: g, className: m, children: y, position: p = "bottom-left", orientation: v = "vertical", "aria-label": x }) {
  const S = Je(), { isInteractive: C, minZoomReached: j, maxZoomReached: O, ariaLabelConfig: D } = ze(vM, Ke), { zoomIn: E, zoomOut: N, fitView: k } = gu(), U = () => {
    E(), c?.();
  }, V = () => {
    N(), f?.();
  }, X = () => {
    k(s), h?.();
  }, te = () => {
    S.setState({
      nodesDraggable: !C,
      nodesConnectable: !C,
      elementsSelectable: !C
    }), g?.(!C);
  }, K = v === "horizontal" ? "horizontal" : "vertical";
  return b.jsxs(hu, { className: ut(["react-flow__controls", K, m]), position: p, style: n, "data-testid": "rf__controls", "aria-label": x ?? D["controls.ariaLabel"], children: [i && b.jsxs(b.Fragment, { children: [b.jsx(As, { onClick: U, className: "react-flow__controls-zoomin", title: D["controls.zoomIn.ariaLabel"], "aria-label": D["controls.zoomIn.ariaLabel"], disabled: O, children: b.jsx(hM, {}) }), b.jsx(As, { onClick: V, className: "react-flow__controls-zoomout", title: D["controls.zoomOut.ariaLabel"], "aria-label": D["controls.zoomOut.ariaLabel"], disabled: j, children: b.jsx(gM, {}) })] }), l && b.jsx(As, { className: "react-flow__controls-fitview", onClick: X, title: D["controls.fitView.ariaLabel"], "aria-label": D["controls.fitView.ariaLabel"], children: b.jsx(mM, {}) }), r && b.jsx(As, { className: "react-flow__controls-interactive", onClick: te, title: D["controls.interactive.ariaLabel"], "aria-label": D["controls.interactive.ariaLabel"], children: C ? b.jsx(yM, {}) : b.jsx(pM, {}) }), y] });
}
cb.displayName = "Controls";
const bM = ee.memo(cb);
function xM({ id: n, x: i, y: l, width: r, height: s, style: c, color: f, strokeColor: h, strokeWidth: g, className: m, borderRadius: y, shapeRendering: p, selected: v, onClick: x }) {
  const { background: S, backgroundColor: C } = c || {}, j = f || S || C;
  return b.jsx("rect", { className: ut(["react-flow__minimap-node", { selected: v }, m]), x: i, y: l, rx: y, ry: y, width: r, height: s, style: {
    fill: j,
    stroke: h,
    strokeWidth: g
  }, shapeRendering: p, onClick: x ? (O) => x(O, n) : void 0 });
}
const wM = ee.memo(xM), SM = (n) => n.nodes.map((i) => i.id), ed = (n) => n instanceof Function ? n : () => n;
function EM({
  nodeStrokeColor: n,
  nodeColor: i,
  nodeClassName: l = "",
  nodeBorderRadius: r = 5,
  nodeStrokeWidth: s,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: c = wM,
  onClick: f
}) {
  const h = ze(SM, Ke), g = ed(i), m = ed(n), y = ed(l), p = typeof window > "u" || window.chrome ? "crispEdges" : "geometricPrecision";
  return b.jsx(b.Fragment, { children: h.map((v) => (
    /*
     * The split of responsibilities between MiniMapNodes and
     * NodeComponentWrapper may appear weird. However, it’s designed to
     * minimize the cost of updates when individual nodes change.
     *
     * For more details, see a similar commit in `NodeRenderer/index.tsx`.
     */
    b.jsx(NM, { id: v, nodeColorFunc: g, nodeStrokeColorFunc: m, nodeClassNameFunc: y, nodeBorderRadius: r, nodeStrokeWidth: s, NodeComponent: c, onClick: f, shapeRendering: p }, v)
  )) });
}
function _M({ id: n, nodeColorFunc: i, nodeStrokeColorFunc: l, nodeClassNameFunc: r, nodeBorderRadius: s, nodeStrokeWidth: c, shapeRendering: f, NodeComponent: h, onClick: g }) {
  const { node: m, x: y, y: p, width: v, height: x } = ze((S) => {
    const C = S.nodeLookup.get(n);
    if (!C)
      return { node: void 0, x: 0, y: 0, width: 0, height: 0 };
    const j = C.internals.userNode, { x: O, y: D } = C.internals.positionAbsolute, { width: E, height: N } = Fn(j);
    return {
      node: j,
      x: O,
      y: D,
      width: E,
      height: N
    };
  }, Ke);
  return !m || m.hidden || !cv(m) ? null : b.jsx(h, { x: y, y: p, width: v, height: x, style: m.style, selected: !!m.selected, className: r(m), color: i(m), borderRadius: s, strokeColor: l(m), strokeWidth: c, shapeRendering: f, onClick: g, id: m.id });
}
const NM = ee.memo(_M);
var CM = ee.memo(EM);
const MM = 200, TM = 150, jM = (n) => !n.hidden, AM = (n) => {
  const i = {
    x: -n.transform[0] / n.transform[2],
    y: -n.transform[1] / n.transform[2],
    width: n.width / n.transform[2],
    height: n.height / n.transform[2]
  };
  return {
    viewBB: i,
    boundingRect: n.nodeLookup.size > 0 ? uv(Xl(n.nodeLookup, { filter: jM }), i) : i,
    rfId: n.rfId,
    panZoom: n.panZoom,
    translateExtent: n.translateExtent,
    flowWidth: n.width,
    flowHeight: n.height,
    ariaLabelConfig: n.ariaLabelConfig
  };
}, DM = "react-flow__minimap-desc";
function fb({
  style: n,
  className: i,
  nodeStrokeColor: l,
  nodeColor: r,
  nodeClassName: s = "",
  nodeBorderRadius: c = 5,
  nodeStrokeWidth: f,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: h,
  bgColor: g,
  maskColor: m,
  maskStrokeColor: y,
  maskStrokeWidth: p,
  position: v = "bottom-right",
  onClick: x,
  onNodeClick: S,
  pannable: C = !1,
  zoomable: j = !1,
  ariaLabel: O,
  inversePan: D,
  zoomStep: E = 1,
  offsetScale: N = 5
}) {
  const k = Je(), U = ee.useRef(null), { boundingRect: V, viewBB: X, rfId: te, panZoom: K, translateExtent: Y, flowWidth: Z, flowHeight: J, ariaLabelConfig: M } = ze(AM, Ke), L = n?.width ?? MM, _ = n?.height ?? TM, z = V.width / L, B = V.height / _, $ = Math.max(z, B), F = $ * L, A = $ * _, I = N * $, G = V.x - (F - V.width) / 2 - I, H = V.y - (A - V.height) / 2 - I, T = F + I * 2, q = A + I * 2, Q = `${DM}-${te}`, P = ee.useRef(0), ie = ee.useRef();
  P.current = $, ee.useEffect(() => {
    if (U.current && K)
      return ie.current = q2({
        domNode: U.current,
        panZoom: K,
        getTransform: () => k.getState().transform,
        getViewScale: () => P.current
      }), () => {
        ie.current?.destroy();
      };
  }, [K]), ee.useEffect(() => {
    ie.current?.update({
      translateExtent: Y,
      width: Z,
      height: J,
      inversePan: D,
      pannable: C,
      zoomStep: E,
      zoomable: j
    });
  }, [C, j, D, E, Y, Z, J]);
  const de = x ? (xe) => {
    const [Se, _e] = ie.current?.pointer(xe) || [0, 0];
    x(xe, { x: Se, y: _e });
  } : void 0, he = S ? ee.useCallback((xe, Se) => {
    const _e = k.getState().nodeLookup.get(Se).internals.userNode;
    S(xe, _e);
  }, []) : void 0, ge = O ?? M["minimap.ariaLabel"];
  return b.jsx(hu, { position: v, style: {
    ...n,
    "--xy-minimap-background-color-props": typeof g == "string" ? g : void 0,
    "--xy-minimap-mask-background-color-props": typeof m == "string" ? m : void 0,
    "--xy-minimap-mask-stroke-color-props": typeof y == "string" ? y : void 0,
    "--xy-minimap-mask-stroke-width-props": typeof p == "number" ? p * $ : void 0,
    "--xy-minimap-node-background-color-props": typeof r == "string" ? r : void 0,
    "--xy-minimap-node-stroke-color-props": typeof l == "string" ? l : void 0,
    "--xy-minimap-node-stroke-width-props": typeof f == "number" ? f : void 0
  }, className: ut(["react-flow__minimap", i]), "data-testid": "rf__minimap", children: b.jsxs("svg", { width: L, height: _, viewBox: `${G} ${H} ${T} ${q}`, className: "react-flow__minimap-svg", role: "img", "aria-labelledby": Q, ref: U, onClick: de, children: [ge && b.jsx("title", { id: Q, children: ge }), b.jsx(CM, { onClick: he, nodeColor: r, nodeStrokeColor: l, nodeBorderRadius: c, nodeClassName: s, nodeStrokeWidth: f, nodeComponent: h }), b.jsx("path", { className: "react-flow__minimap-mask", d: `M${G - I},${H - I}h${T + I * 2}v${q + I * 2}h${-T - I * 2}z
        M${X.x},${X.y}h${X.width}v${X.height}h${-X.width}z`, fillRule: "evenodd", pointerEvents: "none" })] }) });
}
fb.displayName = "MiniMap";
const OM = ee.memo(fb), zM = (n) => (i) => n ? `${Math.max(1 / i.transform[2], 1)}` : void 0, RM = {
  [vo.Line]: "right",
  [vo.Handle]: "bottom-right"
};
function kM({ nodeId: n, position: i, variant: l = vo.Handle, className: r, style: s = void 0, children: c, color: f, minWidth: h = 10, minHeight: g = 10, maxWidth: m = Number.MAX_VALUE, maxHeight: y = Number.MAX_VALUE, keepAspectRatio: p = !1, resizeDirection: v, autoScale: x = !0, shouldResize: S, onResizeStart: C, onResize: j, onResizeEnd: O }) {
  const D = Iv(), E = typeof n == "string" ? n : D, N = Je(), k = ee.useRef(null), U = l === vo.Handle, V = ze(ee.useCallback(zM(U && x), [U, x]), Ke), X = ee.useRef(null), te = i ?? RM[l];
  ee.useEffect(() => {
    if (!(!k.current || !E))
      return X.current || (X.current = aN({
        domNode: k.current,
        nodeId: E,
        getStoreItems: () => {
          const { nodeLookup: Y, transform: Z, snapGrid: J, snapToGrid: M, nodeOrigin: L, domNode: _ } = N.getState();
          return {
            nodeLookup: Y,
            transform: Z,
            snapGrid: J,
            snapToGrid: M,
            nodeOrigin: L,
            paneDomNode: _
          };
        },
        onChange: (Y, Z) => {
          const { triggerNodeChanges: J, nodeLookup: M, parentLookup: L, nodeOrigin: _ } = N.getState(), z = [], B = { x: Y.x, y: Y.y }, $ = M.get(E);
          if ($ && $.expandParent && $.parentId) {
            const F = $.origin ?? _, A = Y.width ?? $.measured.width ?? 0, I = Y.height ?? $.measured.height ?? 0, G = {
              id: $.id,
              parentId: $.parentId,
              rect: {
                width: A,
                height: I,
                ...fv({
                  x: Y.x ?? $.position.x,
                  y: Y.y ?? $.position.y
                }, { width: A, height: I }, $.parentId, M, F)
              }
            }, H = Vd([G], M, L, _);
            z.push(...H), B.x = Y.x ? Math.max(F[0] * A, Y.x) : void 0, B.y = Y.y ? Math.max(F[1] * I, Y.y) : void 0;
          }
          if (B.x !== void 0 && B.y !== void 0) {
            const F = {
              id: E,
              type: "position",
              position: { ...B }
            };
            z.push(F);
          }
          if (Y.width !== void 0 && Y.height !== void 0) {
            const A = {
              id: E,
              type: "dimensions",
              resizing: !0,
              setAttributes: v ? v === "horizontal" ? "width" : "height" : !0,
              dimensions: {
                width: Y.width,
                height: Y.height
              }
            };
            z.push(A);
          }
          for (const F of Z) {
            const A = {
              ...F,
              type: "position"
            };
            z.push(A);
          }
          J(z);
        },
        onEnd: ({ width: Y, height: Z }) => {
          const J = {
            id: E,
            type: "dimensions",
            resizing: !1,
            dimensions: {
              width: Y,
              height: Z
            }
          };
          N.getState().triggerNodeChanges([J]);
        }
      })), X.current.update({
        controlPosition: te,
        boundaries: {
          minWidth: h,
          minHeight: g,
          maxWidth: m,
          maxHeight: y
        },
        keepAspectRatio: p,
        resizeDirection: v,
        onResizeStart: C,
        onResize: j,
        onResizeEnd: O,
        shouldResize: S
      }), () => {
        X.current?.destroy();
      };
  }, [
    te,
    h,
    g,
    m,
    y,
    p,
    C,
    j,
    O,
    S
  ]);
  const K = te.split("-");
  return b.jsx("div", { className: ut(["react-flow__resize-control", "nodrag", ...K, l, r]), ref: k, style: {
    ...s,
    scale: V,
    ...f && { [U ? "backgroundColor" : "borderColor"]: f }
  }, children: c });
}
ee.memo(kM);
var Ye = (n, i) => () => (i || n((i = { exports: {} }).exports, i), i.exports), cn = Ye((n, i) => {
  var l = Object.defineProperty, r = (J, M, L) => M in J ? l(J, M, { enumerable: !0, configurable: !0, writable: !0, value: L }) : J[M] = L, s = (J, M) => () => (M || J((M = { exports: {} }).exports, M), M.exports), c = (J, M, L) => r(J, typeof M != "symbol" ? M + "" : M, L), f = s((J, M) => {
    var L = "\0", _ = "\0", z = "", B = class {
      constructor(H) {
        c(this, "_isDirected", !0), c(this, "_isMultigraph", !1), c(this, "_isCompound", !1), c(this, "_label"), c(this, "_defaultNodeLabelFn", () => {
        }), c(this, "_defaultEdgeLabelFn", () => {
        }), c(this, "_nodes", {}), c(this, "_in", {}), c(this, "_preds", {}), c(this, "_out", {}), c(this, "_sucs", {}), c(this, "_edgeObjs", {}), c(this, "_edgeLabels", {}), c(this, "_nodeCount", 0), c(this, "_edgeCount", 0), c(this, "_parent"), c(this, "_children"), H && (this._isDirected = Object.hasOwn(H, "directed") ? H.directed : !0, this._isMultigraph = Object.hasOwn(H, "multigraph") ? H.multigraph : !1, this._isCompound = Object.hasOwn(H, "compound") ? H.compound : !1), this._isCompound && (this._parent = {}, this._children = {}, this._children[_] = {});
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
        return this.nodes().filter((T) => Object.keys(H._in[T]).length === 0);
      }
      sinks() {
        var H = this;
        return this.nodes().filter((T) => Object.keys(H._out[T]).length === 0);
      }
      setNodes(H, T) {
        var q = arguments, Q = this;
        return H.forEach(function(P) {
          q.length > 1 ? Q.setNode(P, T) : Q.setNode(P);
        }), this;
      }
      setNode(H, T) {
        return Object.hasOwn(this._nodes, H) ? (arguments.length > 1 && (this._nodes[H] = T), this) : (this._nodes[H] = arguments.length > 1 ? T : this._defaultNodeLabelFn(H), this._isCompound && (this._parent[H] = _, this._children[H] = {}, this._children[_][H] = !0), this._in[H] = {}, this._preds[H] = {}, this._out[H] = {}, this._sucs[H] = {}, ++this._nodeCount, this);
      }
      node(H) {
        return this._nodes[H];
      }
      hasNode(H) {
        return Object.hasOwn(this._nodes, H);
      }
      removeNode(H) {
        var T = this;
        if (Object.hasOwn(this._nodes, H)) {
          var q = (Q) => T.removeEdge(T._edgeObjs[Q]);
          delete this._nodes[H], this._isCompound && (this._removeFromParentsChildList(H), delete this._parent[H], this.children(H).forEach(function(Q) {
            T.setParent(Q);
          }), delete this._children[H]), Object.keys(this._in[H]).forEach(q), delete this._in[H], delete this._preds[H], Object.keys(this._out[H]).forEach(q), delete this._out[H], delete this._sucs[H], --this._nodeCount;
        }
        return this;
      }
      setParent(H, T) {
        if (!this._isCompound) throw new Error("Cannot set parent in a non-compound graph");
        if (T === void 0) T = _;
        else {
          T += "";
          for (var q = T; q !== void 0; q = this.parent(q)) if (q === H) throw new Error("Setting " + T + " as parent of " + H + " would create a cycle");
          this.setNode(T);
        }
        return this.setNode(H), this._removeFromParentsChildList(H), this._parent[H] = T, this._children[T][H] = !0, this;
      }
      _removeFromParentsChildList(H) {
        delete this._children[this._parent[H]][H];
      }
      parent(H) {
        if (this._isCompound) {
          var T = this._parent[H];
          if (T !== _) return T;
        }
      }
      children(H = _) {
        if (this._isCompound) {
          var T = this._children[H];
          if (T) return Object.keys(T);
        } else {
          if (H === _) return this.nodes();
          if (this.hasNode(H)) return [];
        }
      }
      predecessors(H) {
        var T = this._preds[H];
        if (T) return Object.keys(T);
      }
      successors(H) {
        var T = this._sucs[H];
        if (T) return Object.keys(T);
      }
      neighbors(H) {
        var T = this.predecessors(H);
        if (T) {
          let Q = new Set(T);
          for (var q of this.successors(H)) Q.add(q);
          return Array.from(Q.values());
        }
      }
      isLeaf(H) {
        var T;
        return this.isDirected() ? T = this.successors(H) : T = this.neighbors(H), T.length === 0;
      }
      filterNodes(H) {
        var T = new this.constructor({ directed: this._isDirected, multigraph: this._isMultigraph, compound: this._isCompound });
        T.setGraph(this.graph());
        var q = this;
        Object.entries(this._nodes).forEach(function([ie, de]) {
          H(ie) && T.setNode(ie, de);
        }), Object.values(this._edgeObjs).forEach(function(ie) {
          T.hasNode(ie.v) && T.hasNode(ie.w) && T.setEdge(ie, q.edge(ie));
        });
        var Q = {};
        function P(ie) {
          var de = q.parent(ie);
          return de === void 0 || T.hasNode(de) ? (Q[ie] = de, de) : de in Q ? Q[de] : P(de);
        }
        return this._isCompound && T.nodes().forEach((ie) => T.setParent(ie, P(ie))), T;
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
      setPath(H, T) {
        var q = this, Q = arguments;
        return H.reduce(function(P, ie) {
          return Q.length > 1 ? q.setEdge(P, ie, T) : q.setEdge(P, ie), ie;
        }), this;
      }
      setEdge() {
        var H, T, q, Q, P = !1, ie = arguments[0];
        typeof ie == "object" && ie !== null && "v" in ie ? (H = ie.v, T = ie.w, q = ie.name, arguments.length === 2 && (Q = arguments[1], P = !0)) : (H = ie, T = arguments[1], q = arguments[3], arguments.length > 2 && (Q = arguments[2], P = !0)), H = "" + H, T = "" + T, q !== void 0 && (q = "" + q);
        var de = A(this._isDirected, H, T, q);
        if (Object.hasOwn(this._edgeLabels, de)) return P && (this._edgeLabels[de] = Q), this;
        if (q !== void 0 && !this._isMultigraph) throw new Error("Cannot set a named edge when isMultigraph = false");
        this.setNode(H), this.setNode(T), this._edgeLabels[de] = P ? Q : this._defaultEdgeLabelFn(H, T, q);
        var he = I(this._isDirected, H, T, q);
        return H = he.v, T = he.w, Object.freeze(he), this._edgeObjs[de] = he, $(this._preds[T], H), $(this._sucs[H], T), this._in[T][de] = he, this._out[H][de] = he, this._edgeCount++, this;
      }
      edge(H, T, q) {
        var Q = arguments.length === 1 ? G(this._isDirected, arguments[0]) : A(this._isDirected, H, T, q);
        return this._edgeLabels[Q];
      }
      edgeAsObj() {
        let H = this.edge(...arguments);
        return typeof H != "object" ? { label: H } : H;
      }
      hasEdge(H, T, q) {
        var Q = arguments.length === 1 ? G(this._isDirected, arguments[0]) : A(this._isDirected, H, T, q);
        return Object.hasOwn(this._edgeLabels, Q);
      }
      removeEdge(H, T, q) {
        var Q = arguments.length === 1 ? G(this._isDirected, arguments[0]) : A(this._isDirected, H, T, q), P = this._edgeObjs[Q];
        return P && (H = P.v, T = P.w, delete this._edgeLabels[Q], delete this._edgeObjs[Q], F(this._preds[T], H), F(this._sucs[H], T), delete this._in[T][Q], delete this._out[H][Q], this._edgeCount--), this;
      }
      inEdges(H, T) {
        return this.isDirected() ? this.filterEdges(this._in[H], H, T) : this.nodeEdges(H, T);
      }
      outEdges(H, T) {
        return this.isDirected() ? this.filterEdges(this._out[H], H, T) : this.nodeEdges(H, T);
      }
      nodeEdges(H, T) {
        if (H in this._nodes) return this.filterEdges({ ...this._in[H], ...this._out[H] }, H, T);
      }
      filterEdges(H, T, q) {
        if (H) {
          var Q = Object.values(H);
          return q ? Q.filter(function(P) {
            return P.v === T && P.w === q || P.v === q && P.w === T;
          }) : Q;
        }
      }
    };
    function $(H, T) {
      H[T] ? H[T]++ : H[T] = 1;
    }
    function F(H, T) {
      --H[T] || delete H[T];
    }
    function A(H, T, q, Q) {
      var P = "" + T, ie = "" + q;
      if (!H && P > ie) {
        var de = P;
        P = ie, ie = de;
      }
      return P + z + ie + z + (Q === void 0 ? L : Q);
    }
    function I(H, T, q, Q) {
      var P = "" + T, ie = "" + q;
      if (!H && P > ie) {
        var de = P;
        P = ie, ie = de;
      }
      var he = { v: P, w: ie };
      return Q && (he.name = Q), he;
    }
    function G(H, T) {
      return A(H, T.v, T.w, T.name);
    }
    M.exports = B;
  }), h = s((J, M) => {
    M.exports = "3.0.2";
  }), g = s((J, M) => {
    M.exports = { Graph: f(), version: h() };
  }), m = s((J, M) => {
    var L = f();
    M.exports = { write: _, read: $ };
    function _(F) {
      var A = { options: { directed: F.isDirected(), multigraph: F.isMultigraph(), compound: F.isCompound() }, nodes: z(F), edges: B(F) };
      return F.graph() !== void 0 && (A.value = structuredClone(F.graph())), A;
    }
    function z(F) {
      return F.nodes().map(function(A) {
        var I = F.node(A), G = F.parent(A), H = { v: A };
        return I !== void 0 && (H.value = I), G !== void 0 && (H.parent = G), H;
      });
    }
    function B(F) {
      return F.edges().map(function(A) {
        var I = F.edge(A), G = { v: A.v, w: A.w };
        return A.name !== void 0 && (G.name = A.name), I !== void 0 && (G.value = I), G;
      });
    }
    function $(F) {
      var A = new L(F.options).setGraph(F.value);
      return F.nodes.forEach(function(I) {
        A.setNode(I.v, I.value), I.parent && A.setParent(I.v, I.parent);
      }), F.edges.forEach(function(I) {
        A.setEdge({ v: I.v, w: I.w, name: I.name }, I.value);
      }), A;
    }
  }), y = s((J, M) => {
    M.exports = _;
    var L = () => 1;
    function _(B, $, F, A) {
      return z(B, String($), F || L, A || function(I) {
        return B.outEdges(I);
      });
    }
    function z(B, $, F, A) {
      var I = {}, G = !0, H = 0, T = B.nodes(), q = function(de) {
        var he = F(de);
        I[de.v].distance + he < I[de.w].distance && (I[de.w] = { distance: I[de.v].distance + he, predecessor: de.v }, G = !0);
      }, Q = function() {
        T.forEach(function(de) {
          A(de).forEach(function(he) {
            var ge = he.v === de ? he.v : he.w, xe = ge === he.v ? he.w : he.v;
            q({ v: ge, w: xe });
          });
        });
      };
      T.forEach(function(de) {
        var he = de === $ ? 0 : Number.POSITIVE_INFINITY;
        I[de] = { distance: he };
      });
      for (var P = T.length, ie = 1; ie < P && (G = !1, H++, Q(), !!G); ie++) ;
      if (H === P - 1 && (G = !1, Q(), G)) throw new Error("The graph contains a negative weight cycle");
      return I;
    }
  }), p = s((J, M) => {
    M.exports = L;
    function L(_) {
      var z = {}, B = [], $;
      function F(A) {
        Object.hasOwn(z, A) || (z[A] = !0, $.push(A), _.successors(A).forEach(F), _.predecessors(A).forEach(F));
      }
      return _.nodes().forEach(function(A) {
        $ = [], F(A), $.length && B.push($);
      }), B;
    }
  }), v = s((J, M) => {
    var L = class {
      constructor() {
        c(this, "_arr", []), c(this, "_keyIndices", {});
      }
      size() {
        return this._arr.length;
      }
      keys() {
        return this._arr.map(function(_) {
          return _.key;
        });
      }
      has(_) {
        return Object.hasOwn(this._keyIndices, _);
      }
      priority(_) {
        var z = this._keyIndices[_];
        if (z !== void 0) return this._arr[z].priority;
      }
      min() {
        if (this.size() === 0) throw new Error("Queue underflow");
        return this._arr[0].key;
      }
      add(_, z) {
        var B = this._keyIndices;
        if (_ = String(_), !Object.hasOwn(B, _)) {
          var $ = this._arr, F = $.length;
          return B[_] = F, $.push({ key: _, priority: z }), this._decrease(F), !0;
        }
        return !1;
      }
      removeMin() {
        this._swap(0, this._arr.length - 1);
        var _ = this._arr.pop();
        return delete this._keyIndices[_.key], this._heapify(0), _.key;
      }
      decrease(_, z) {
        var B = this._keyIndices[_];
        if (z > this._arr[B].priority) throw new Error("New priority is greater than current priority. Key: " + _ + " Old: " + this._arr[B].priority + " New: " + z);
        this._arr[B].priority = z, this._decrease(B);
      }
      _heapify(_) {
        var z = this._arr, B = 2 * _, $ = B + 1, F = _;
        B < z.length && (F = z[B].priority < z[F].priority ? B : F, $ < z.length && (F = z[$].priority < z[F].priority ? $ : F), F !== _ && (this._swap(_, F), this._heapify(F)));
      }
      _decrease(_) {
        for (var z = this._arr, B = z[_].priority, $; _ !== 0 && ($ = _ >> 1, !(z[$].priority < B)); ) this._swap(_, $), _ = $;
      }
      _swap(_, z) {
        var B = this._arr, $ = this._keyIndices, F = B[_], A = B[z];
        B[_] = A, B[z] = F, $[A.key] = _, $[F.key] = z;
      }
    };
    M.exports = L;
  }), x = s((J, M) => {
    var L = v();
    M.exports = z;
    var _ = () => 1;
    function z($, F, A, I) {
      var G = function(H) {
        return $.outEdges(H);
      };
      return B($, String(F), A || _, I || G);
    }
    function B($, F, A, I) {
      var G = {}, H = new L(), T, q, Q = function(P) {
        var ie = P.v !== T ? P.v : P.w, de = G[ie], he = A(P), ge = q.distance + he;
        if (he < 0) throw new Error("dijkstra does not allow negative edge weights. Bad edge: " + P + " Weight: " + he);
        ge < de.distance && (de.distance = ge, de.predecessor = T, H.decrease(ie, ge));
      };
      for ($.nodes().forEach(function(P) {
        var ie = P === F ? 0 : Number.POSITIVE_INFINITY;
        G[P] = { distance: ie }, H.add(P, ie);
      }); H.size() > 0 && (T = H.removeMin(), q = G[T], q.distance !== Number.POSITIVE_INFINITY); ) I(T).forEach(Q);
      return G;
    }
  }), S = s((J, M) => {
    var L = x();
    M.exports = _;
    function _(z, B, $) {
      return z.nodes().reduce(function(F, A) {
        return F[A] = L(z, A, B, $), F;
      }, {});
    }
  }), C = s((J, M) => {
    M.exports = L;
    function L(z, B, $) {
      if (z[B].predecessor !== void 0) throw new Error("Invalid source vertex");
      if (z[$].predecessor === void 0 && $ !== B) throw new Error("Invalid destination vertex");
      return { weight: z[$].distance, path: _(z, B, $) };
    }
    function _(z, B, $) {
      for (var F = [], A = $; A !== B; ) F.push(A), A = z[A].predecessor;
      return F.push(B), F.reverse();
    }
  }), j = s((J, M) => {
    M.exports = L;
    function L(_) {
      var z = 0, B = [], $ = {}, F = [];
      function A(I) {
        var G = $[I] = { onStack: !0, lowlink: z, index: z++ };
        if (B.push(I), _.successors(I).forEach(function(q) {
          Object.hasOwn($, q) ? $[q].onStack && (G.lowlink = Math.min(G.lowlink, $[q].index)) : (A(q), G.lowlink = Math.min(G.lowlink, $[q].lowlink));
        }), G.lowlink === G.index) {
          var H = [], T;
          do
            T = B.pop(), $[T].onStack = !1, H.push(T);
          while (I !== T);
          F.push(H);
        }
      }
      return _.nodes().forEach(function(I) {
        Object.hasOwn($, I) || A(I);
      }), F;
    }
  }), O = s((J, M) => {
    var L = j();
    M.exports = _;
    function _(z) {
      return L(z).filter(function(B) {
        return B.length > 1 || B.length === 1 && z.hasEdge(B[0], B[0]);
      });
    }
  }), D = s((J, M) => {
    M.exports = _;
    var L = () => 1;
    function _(B, $, F) {
      return z(B, $ || L, F || function(A) {
        return B.outEdges(A);
      });
    }
    function z(B, $, F) {
      var A = {}, I = B.nodes();
      return I.forEach(function(G) {
        A[G] = {}, A[G][G] = { distance: 0 }, I.forEach(function(H) {
          G !== H && (A[G][H] = { distance: Number.POSITIVE_INFINITY });
        }), F(G).forEach(function(H) {
          var T = H.v === G ? H.w : H.v, q = $(H);
          A[G][T] = { distance: q, predecessor: G };
        });
      }), I.forEach(function(G) {
        var H = A[G];
        I.forEach(function(T) {
          var q = A[T];
          I.forEach(function(Q) {
            var P = q[G], ie = H[Q], de = q[Q], he = P.distance + ie.distance;
            he < de.distance && (de.distance = he, de.predecessor = ie.predecessor);
          });
        });
      }), A;
    }
  }), E = s((J, M) => {
    function L(z) {
      var B = {}, $ = {}, F = [];
      function A(I) {
        if (Object.hasOwn($, I)) throw new _();
        Object.hasOwn(B, I) || ($[I] = !0, B[I] = !0, z.predecessors(I).forEach(A), delete $[I], F.push(I));
      }
      if (z.sinks().forEach(A), Object.keys(B).length !== z.nodeCount()) throw new _();
      return F;
    }
    var _ = class extends Error {
      constructor() {
        super(...arguments);
      }
    };
    M.exports = L, L.CycleException = _;
  }), N = s((J, M) => {
    var L = E();
    M.exports = _;
    function _(z) {
      try {
        L(z);
      } catch (B) {
        if (B instanceof L.CycleException) return !1;
        throw B;
      }
      return !0;
    }
  }), k = s((J, M) => {
    M.exports = L;
    function L(z, B, $, F, A) {
      Array.isArray(B) || (B = [B]);
      var I = (z.isDirected() ? z.successors : z.neighbors).bind(z), G = {};
      return B.forEach(function(H) {
        if (!z.hasNode(H)) throw new Error("Graph does not have node: " + H);
        A = _(z, H, $ === "post", G, I, F, A);
      }), A;
    }
    function _(z, B, $, F, A, I, G) {
      return Object.hasOwn(F, B) || (F[B] = !0, $ || (G = I(G, B)), A(B).forEach(function(H) {
        G = _(z, H, $, F, A, I, G);
      }), $ && (G = I(G, B))), G;
    }
  }), U = s((J, M) => {
    var L = k();
    M.exports = _;
    function _(z, B, $) {
      return L(z, B, $, function(F, A) {
        return F.push(A), F;
      }, []);
    }
  }), V = s((J, M) => {
    var L = U();
    M.exports = _;
    function _(z, B) {
      return L(z, B, "post");
    }
  }), X = s((J, M) => {
    var L = U();
    M.exports = _;
    function _(z, B) {
      return L(z, B, "pre");
    }
  }), te = s((J, M) => {
    var L = f(), _ = v();
    M.exports = z;
    function z(B, $) {
      var F = new L(), A = {}, I = new _(), G;
      function H(q) {
        var Q = q.v === G ? q.w : q.v, P = I.priority(Q);
        if (P !== void 0) {
          var ie = $(q);
          ie < P && (A[Q] = G, I.decrease(Q, ie));
        }
      }
      if (B.nodeCount() === 0) return F;
      B.nodes().forEach(function(q) {
        I.add(q, Number.POSITIVE_INFINITY), F.setNode(q);
      }), I.decrease(B.nodes()[0], 0);
      for (var T = !1; I.size() > 0; ) {
        if (G = I.removeMin(), Object.hasOwn(A, G)) F.setEdge(G, A[G]);
        else {
          if (T) throw new Error("Input graph is not connected: " + B);
          T = !0;
        }
        B.nodeEdges(G).forEach(H);
      }
      return F;
    }
  }), K = s((J, M) => {
    var L = x(), _ = y();
    M.exports = z;
    function z($, F, A, I) {
      return B($, F, A, I || function(G) {
        return $.outEdges(G);
      });
    }
    function B($, F, A, I) {
      if (A === void 0) return L($, F, A, I);
      for (var G = !1, H = $.nodes(), T = 0; T < H.length; T++) {
        for (var q = I(H[T]), Q = 0; Q < q.length; Q++) {
          var P = q[Q], ie = P.v === H[T] ? P.v : P.w, de = ie === P.v ? P.w : P.v;
          A({ v: ie, w: de }) < 0 && (G = !0);
        }
        if (G) return _($, F, A, I);
      }
      return L($, F, A, I);
    }
  }), Y = s((J, M) => {
    M.exports = { bellmanFord: y(), components: p(), dijkstra: x(), dijkstraAll: S(), extractPath: C(), findCycles: O(), floydWarshall: D(), isAcyclic: N(), postorder: V(), preorder: X(), prim: te(), shortestPaths: K(), reduce: k(), tarjan: j(), topsort: E() };
  }), Z = g();
  i.exports = { Graph: Z.Graph, json: m(), alg: Y(), version: Z.version };
}), HM = Ye((n, i) => {
  var l = class {
    constructor() {
      let c = {};
      c._next = c._prev = c, this._sentinel = c;
    }
    dequeue() {
      let c = this._sentinel, f = c._prev;
      if (f !== c) return r(f), f;
    }
    enqueue(c) {
      let f = this._sentinel;
      c._prev && c._next && r(c), c._next = f._next, f._next._prev = c, f._next = c, c._prev = f;
    }
    toString() {
      let c = [], f = this._sentinel, h = f._prev;
      for (; h !== f; ) c.push(JSON.stringify(h, s)), h = h._prev;
      return "[" + c.join(", ") + "]";
    }
  };
  function r(c) {
    c._prev._next = c._next, c._next._prev = c._prev, delete c._next, delete c._prev;
  }
  function s(c, f) {
    if (c !== "_next" && c !== "_prev") return f;
  }
  i.exports = l;
}), BM = Ye((n, i) => {
  var l = cn().Graph, r = HM();
  i.exports = c;
  var s = () => 1;
  function c(p, v) {
    if (p.nodeCount() <= 1) return [];
    let x = g(p, v || s);
    return f(x.graph, x.buckets, x.zeroIdx).flatMap((S) => p.outEdges(S.v, S.w));
  }
  function f(p, v, x) {
    let S = [], C = v[v.length - 1], j = v[0], O;
    for (; p.nodeCount(); ) {
      for (; O = j.dequeue(); ) h(p, v, x, O);
      for (; O = C.dequeue(); ) h(p, v, x, O);
      if (p.nodeCount()) {
        for (let D = v.length - 2; D > 0; --D) if (O = v[D].dequeue(), O) {
          S = S.concat(h(p, v, x, O, !0));
          break;
        }
      }
    }
    return S;
  }
  function h(p, v, x, S, C) {
    let j = C ? [] : void 0;
    return p.inEdges(S.v).forEach((O) => {
      let D = p.edge(O), E = p.node(O.v);
      C && j.push({ v: O.v, w: O.w }), E.out -= D, m(v, x, E);
    }), p.outEdges(S.v).forEach((O) => {
      let D = p.edge(O), E = O.w, N = p.node(E);
      N.in -= D, m(v, x, N);
    }), p.removeNode(S.v), j;
  }
  function g(p, v) {
    let x = new l(), S = 0, C = 0;
    p.nodes().forEach((D) => {
      x.setNode(D, { v: D, in: 0, out: 0 });
    }), p.edges().forEach((D) => {
      let E = x.edge(D.v, D.w) || 0, N = v(D), k = E + N;
      x.setEdge(D.v, D.w, k), C = Math.max(C, x.node(D.v).out += N), S = Math.max(S, x.node(D.w).in += N);
    });
    let j = y(C + S + 3).map(() => new r()), O = S + 1;
    return x.nodes().forEach((D) => {
      m(j, O, x.node(D));
    }), { graph: x, buckets: j, zeroIdx: O };
  }
  function m(p, v, x) {
    x.out ? x.in ? p[x.out - x.in + v].enqueue(x) : p[p.length - 1].enqueue(x) : p[0].enqueue(x);
  }
  function y(p) {
    let v = [];
    for (let x = 0; x < p; x++) v.push(x);
    return v;
  }
}), st = Ye((n, i) => {
  var l = cn().Graph;
  i.exports = { addBorderNode: v, addDummyNode: r, applyWithChunking: C, asNonCompoundGraph: c, buildLayerMatrix: m, intersectRect: g, mapValues: X, maxRank: j, normalizeRanks: y, notime: E, partition: O, pick: V, predecessorWeights: h, range: U, removeEmptyRanks: p, simplify: s, successorWeights: f, time: D, uniqueId: k, zipObject: te };
  function r(K, Y, Z, J) {
    for (var M = J; K.hasNode(M); ) M = k(J);
    return Z.dummy = Y, K.setNode(M, Z), M;
  }
  function s(K) {
    let Y = new l().setGraph(K.graph());
    return K.nodes().forEach((Z) => Y.setNode(Z, K.node(Z))), K.edges().forEach((Z) => {
      let J = Y.edge(Z.v, Z.w) || { weight: 0, minlen: 1 }, M = K.edge(Z);
      Y.setEdge(Z.v, Z.w, { weight: J.weight + M.weight, minlen: Math.max(J.minlen, M.minlen) });
    }), Y;
  }
  function c(K) {
    let Y = new l({ multigraph: K.isMultigraph() }).setGraph(K.graph());
    return K.nodes().forEach((Z) => {
      K.children(Z).length || Y.setNode(Z, K.node(Z));
    }), K.edges().forEach((Z) => {
      Y.setEdge(Z, K.edge(Z));
    }), Y;
  }
  function f(K) {
    let Y = K.nodes().map((Z) => {
      let J = {};
      return K.outEdges(Z).forEach((M) => {
        J[M.w] = (J[M.w] || 0) + K.edge(M).weight;
      }), J;
    });
    return te(K.nodes(), Y);
  }
  function h(K) {
    let Y = K.nodes().map((Z) => {
      let J = {};
      return K.inEdges(Z).forEach((M) => {
        J[M.v] = (J[M.v] || 0) + K.edge(M).weight;
      }), J;
    });
    return te(K.nodes(), Y);
  }
  function g(K, Y) {
    let Z = K.x, J = K.y, M = Y.x - Z, L = Y.y - J, _ = K.width / 2, z = K.height / 2;
    if (!M && !L) throw new Error("Not possible to find intersection inside of the rectangle");
    let B, $;
    return Math.abs(L) * _ > Math.abs(M) * z ? (L < 0 && (z = -z), B = z * M / L, $ = z) : (M < 0 && (_ = -_), B = _, $ = _ * L / M), { x: Z + B, y: J + $ };
  }
  function m(K) {
    let Y = U(j(K) + 1).map(() => []);
    return K.nodes().forEach((Z) => {
      let J = K.node(Z), M = J.rank;
      M !== void 0 && (Y[M][J.order] = Z);
    }), Y;
  }
  function y(K) {
    let Y = K.nodes().map((J) => {
      let M = K.node(J).rank;
      return M === void 0 ? Number.MAX_VALUE : M;
    }), Z = C(Math.min, Y);
    K.nodes().forEach((J) => {
      let M = K.node(J);
      Object.hasOwn(M, "rank") && (M.rank -= Z);
    });
  }
  function p(K) {
    let Y = K.nodes().map((_) => K.node(_).rank).filter((_) => _ !== void 0), Z = C(Math.min, Y), J = [];
    K.nodes().forEach((_) => {
      let z = K.node(_).rank - Z;
      J[z] || (J[z] = []), J[z].push(_);
    });
    let M = 0, L = K.graph().nodeRankFactor;
    Array.from(J).forEach((_, z) => {
      _ === void 0 && z % L !== 0 ? --M : _ !== void 0 && M && _.forEach((B) => K.node(B).rank += M);
    });
  }
  function v(K, Y, Z, J) {
    let M = { width: 0, height: 0 };
    return arguments.length >= 4 && (M.rank = Z, M.order = J), r(K, "border", M, Y);
  }
  function x(K, Y = S) {
    let Z = [];
    for (let J = 0; J < K.length; J += Y) {
      let M = K.slice(J, J + Y);
      Z.push(M);
    }
    return Z;
  }
  var S = 65535;
  function C(K, Y) {
    if (Y.length > S) {
      let Z = x(Y);
      return K.apply(null, Z.map((J) => K.apply(null, J)));
    } else return K.apply(null, Y);
  }
  function j(K) {
    let Y = K.nodes().map((Z) => {
      let J = K.node(Z).rank;
      return J === void 0 ? Number.MIN_VALUE : J;
    });
    return C(Math.max, Y);
  }
  function O(K, Y) {
    let Z = { lhs: [], rhs: [] };
    return K.forEach((J) => {
      Y(J) ? Z.lhs.push(J) : Z.rhs.push(J);
    }), Z;
  }
  function D(K, Y) {
    let Z = Date.now();
    try {
      return Y();
    } finally {
      console.log(K + " time: " + (Date.now() - Z) + "ms");
    }
  }
  function E(K, Y) {
    return Y();
  }
  var N = 0;
  function k(K) {
    var Y = ++N;
    return K + ("" + Y);
  }
  function U(K, Y, Z = 1) {
    Y == null && (Y = K, K = 0);
    let J = (L) => L < Y;
    Z < 0 && (J = (L) => Y < L);
    let M = [];
    for (let L = K; J(L); L += Z) M.push(L);
    return M;
  }
  function V(K, Y) {
    let Z = {};
    for (let J of Y) K[J] !== void 0 && (Z[J] = K[J]);
    return Z;
  }
  function X(K, Y) {
    let Z = Y;
    return typeof Y == "string" && (Z = (J) => J[Y]), Object.entries(K).reduce((J, [M, L]) => (J[M] = Z(L, M), J), {});
  }
  function te(K, Y) {
    return K.reduce((Z, J, M) => (Z[J] = Y[M], Z), {});
  }
}), LM = Ye((n, i) => {
  var l = BM(), r = st().uniqueId;
  i.exports = { run: s, undo: f };
  function s(h) {
    (h.graph().acyclicer === "greedy" ? l(h, g(h)) : c(h)).forEach((m) => {
      let y = h.edge(m);
      h.removeEdge(m), y.forwardName = m.name, y.reversed = !0, h.setEdge(m.w, m.v, y, r("rev"));
    });
    function g(m) {
      return (y) => m.edge(y).weight;
    }
  }
  function c(h) {
    let g = [], m = {}, y = {};
    function p(v) {
      Object.hasOwn(y, v) || (y[v] = !0, m[v] = !0, h.outEdges(v).forEach((x) => {
        Object.hasOwn(m, x.w) ? g.push(x) : p(x.w);
      }), delete m[v]);
    }
    return h.nodes().forEach(p), g;
  }
  function f(h) {
    h.edges().forEach((g) => {
      let m = h.edge(g);
      if (m.reversed) {
        h.removeEdge(g);
        let y = m.forwardName;
        delete m.reversed, delete m.forwardName, h.setEdge(g.w, g.v, m, y);
      }
    });
  }
}), UM = Ye((n, i) => {
  var l = st();
  i.exports = { run: r, undo: c };
  function r(f) {
    f.graph().dummyChains = [], f.edges().forEach((h) => s(f, h));
  }
  function s(f, h) {
    let g = h.v, m = f.node(g).rank, y = h.w, p = f.node(y).rank, v = h.name, x = f.edge(h), S = x.labelRank;
    if (p === m + 1) return;
    f.removeEdge(h);
    let C, j, O;
    for (O = 0, ++m; m < p; ++O, ++m) x.points = [], j = { width: 0, height: 0, edgeLabel: x, edgeObj: h, rank: m }, C = l.addDummyNode(f, "edge", j, "_d"), m === S && (j.width = x.width, j.height = x.height, j.dummy = "edge-label", j.labelpos = x.labelpos), f.setEdge(g, C, { weight: x.weight }, v), O === 0 && f.graph().dummyChains.push(C), g = C;
    f.setEdge(g, y, { weight: x.weight }, v);
  }
  function c(f) {
    f.graph().dummyChains.forEach((h) => {
      let g = f.node(h), m = g.edgeLabel, y;
      for (f.setEdge(g.edgeObj, m); g.dummy; ) y = f.successors(h)[0], f.removeNode(h), m.points.push({ x: g.x, y: g.y }), g.dummy === "edge-label" && (m.x = g.x, m.y = g.y, m.width = g.width, m.height = g.height), h = y, g = f.node(h);
    });
  }
}), tu = Ye((n, i) => {
  var { applyWithChunking: l } = st();
  i.exports = { longestPath: r, slack: s };
  function r(c) {
    var f = {};
    function h(g) {
      var m = c.node(g);
      if (Object.hasOwn(f, g)) return m.rank;
      f[g] = !0;
      let y = c.outEdges(g).map((v) => v == null ? Number.POSITIVE_INFINITY : h(v.w) - c.edge(v).minlen);
      var p = l(Math.min, y);
      return p === Number.POSITIVE_INFINITY && (p = 0), m.rank = p;
    }
    c.sources().forEach(h);
  }
  function s(c, f) {
    return c.node(f.w).rank - c.node(f.v).rank - c.edge(f).minlen;
  }
}), db = Ye((n, i) => {
  var l = cn().Graph, r = tu().slack;
  i.exports = s;
  function s(g) {
    var m = new l({ directed: !1 }), y = g.nodes()[0], p = g.nodeCount();
    m.setNode(y, {});
    for (var v, x; c(m, g) < p; ) v = f(m, g), x = m.hasNode(v.v) ? r(g, v) : -r(g, v), h(m, g, x);
    return m;
  }
  function c(g, m) {
    function y(p) {
      m.nodeEdges(p).forEach((v) => {
        var x = v.v, S = p === x ? v.w : x;
        !g.hasNode(S) && !r(m, v) && (g.setNode(S, {}), g.setEdge(p, S, {}), y(S));
      });
    }
    return g.nodes().forEach(y), g.nodeCount();
  }
  function f(g, m) {
    return m.edges().reduce((y, p) => {
      let v = Number.POSITIVE_INFINITY;
      return g.hasNode(p.v) !== g.hasNode(p.w) && (v = r(m, p)), v < y[0] ? [v, p] : y;
    }, [Number.POSITIVE_INFINITY, null])[1];
  }
  function h(g, m, y) {
    g.nodes().forEach((p) => m.node(p).rank += y);
  }
}), VM = Ye((n, i) => {
  var l = db(), r = tu().slack, s = tu().longestPath, c = cn().alg.preorder, f = cn().alg.postorder, h = st().simplify;
  i.exports = g, g.initLowLimValues = v, g.initCutValues = m, g.calcCutValue = p, g.leaveEdge = S, g.enterEdge = C, g.exchangeEdges = j;
  function g(N) {
    N = h(N), s(N);
    var k = l(N);
    v(k), m(k, N);
    for (var U, V; U = S(k); ) V = C(k, N, U), j(k, N, U, V);
  }
  function m(N, k) {
    var U = f(N, N.nodes());
    U = U.slice(0, U.length - 1), U.forEach((V) => y(N, k, V));
  }
  function y(N, k, U) {
    var V = N.node(U), X = V.parent;
    N.edge(U, X).cutvalue = p(N, k, U);
  }
  function p(N, k, U) {
    var V = N.node(U), X = V.parent, te = !0, K = k.edge(U, X), Y = 0;
    return K || (te = !1, K = k.edge(X, U)), Y = K.weight, k.nodeEdges(U).forEach((Z) => {
      var J = Z.v === U, M = J ? Z.w : Z.v;
      if (M !== X) {
        var L = J === te, _ = k.edge(Z).weight;
        if (Y += L ? _ : -_, D(N, U, M)) {
          var z = N.edge(U, M).cutvalue;
          Y += L ? -z : z;
        }
      }
    }), Y;
  }
  function v(N, k) {
    arguments.length < 2 && (k = N.nodes()[0]), x(N, {}, 1, k);
  }
  function x(N, k, U, V, X) {
    var te = U, K = N.node(V);
    return k[V] = !0, N.neighbors(V).forEach((Y) => {
      Object.hasOwn(k, Y) || (U = x(N, k, U, Y, V));
    }), K.low = te, K.lim = U++, X ? K.parent = X : delete K.parent, U;
  }
  function S(N) {
    return N.edges().find((k) => N.edge(k).cutvalue < 0);
  }
  function C(N, k, U) {
    var V = U.v, X = U.w;
    k.hasEdge(V, X) || (V = U.w, X = U.v);
    var te = N.node(V), K = N.node(X), Y = te, Z = !1;
    te.lim > K.lim && (Y = K, Z = !0);
    var J = k.edges().filter((M) => Z === E(N, N.node(M.v), Y) && Z !== E(N, N.node(M.w), Y));
    return J.reduce((M, L) => r(k, L) < r(k, M) ? L : M);
  }
  function j(N, k, U, V) {
    var X = U.v, te = U.w;
    N.removeEdge(X, te), N.setEdge(V.v, V.w, {}), v(N), m(N, k), O(N, k);
  }
  function O(N, k) {
    var U = N.nodes().find((X) => !k.node(X).parent), V = c(N, U);
    V = V.slice(1), V.forEach((X) => {
      var te = N.node(X).parent, K = k.edge(X, te), Y = !1;
      K || (K = k.edge(te, X), Y = !0), k.node(X).rank = k.node(te).rank + (Y ? K.minlen : -K.minlen);
    });
  }
  function D(N, k, U) {
    return N.hasEdge(k, U);
  }
  function E(N, k, U) {
    return U.low <= k.lim && k.lim <= U.lim;
  }
}), YM = Ye((n, i) => {
  var l = tu(), r = l.longestPath, s = db(), c = VM();
  i.exports = f;
  function f(y) {
    var p = y.graph().ranker;
    if (p instanceof Function) return p(y);
    switch (y.graph().ranker) {
      case "network-simplex":
        m(y);
        break;
      case "tight-tree":
        g(y);
        break;
      case "longest-path":
        h(y);
        break;
      case "none":
        break;
      default:
        m(y);
    }
  }
  var h = r;
  function g(y) {
    r(y), s(y);
  }
  function m(y) {
    c(y);
  }
}), IM = Ye((n, i) => {
  i.exports = l;
  function l(c) {
    let f = s(c);
    c.graph().dummyChains.forEach((h) => {
      let g = c.node(h), m = g.edgeObj, y = r(c, f, m.v, m.w), p = y.path, v = y.lca, x = 0, S = p[x], C = !0;
      for (; h !== m.w; ) {
        if (g = c.node(h), C) {
          for (; (S = p[x]) !== v && c.node(S).maxRank < g.rank; ) x++;
          S === v && (C = !1);
        }
        if (!C) {
          for (; x < p.length - 1 && c.node(S = p[x + 1]).minRank <= g.rank; ) x++;
          S = p[x];
        }
        c.setParent(h, S), h = c.successors(h)[0];
      }
    });
  }
  function r(c, f, h, g) {
    let m = [], y = [], p = Math.min(f[h].low, f[g].low), v = Math.max(f[h].lim, f[g].lim), x, S;
    x = h;
    do
      x = c.parent(x), m.push(x);
    while (x && (f[x].low > p || v > f[x].lim));
    for (S = x, x = g; (x = c.parent(x)) !== S; ) y.push(x);
    return { path: m.concat(y.reverse()), lca: S };
  }
  function s(c) {
    let f = {}, h = 0;
    function g(m) {
      let y = h;
      c.children(m).forEach(g), f[m] = { low: y, lim: h++ };
    }
    return c.children().forEach(g), f;
  }
}), qM = Ye((n, i) => {
  var l = st();
  i.exports = { run: r, cleanup: h };
  function r(g) {
    let m = l.addDummyNode(g, "root", {}, "_root"), y = c(g), p = Object.values(y), v = l.applyWithChunking(Math.max, p) - 1, x = 2 * v + 1;
    g.graph().nestingRoot = m, g.edges().forEach((C) => g.edge(C).minlen *= x);
    let S = f(g) + 1;
    g.children().forEach((C) => s(g, m, x, S, v, y, C)), g.graph().nodeRankFactor = x;
  }
  function s(g, m, y, p, v, x, S) {
    let C = g.children(S);
    if (!C.length) {
      S !== m && g.setEdge(m, S, { weight: 0, minlen: y });
      return;
    }
    let j = l.addBorderNode(g, "_bt"), O = l.addBorderNode(g, "_bb"), D = g.node(S);
    g.setParent(j, S), D.borderTop = j, g.setParent(O, S), D.borderBottom = O, C.forEach((E) => {
      s(g, m, y, p, v, x, E);
      let N = g.node(E), k = N.borderTop ? N.borderTop : E, U = N.borderBottom ? N.borderBottom : E, V = N.borderTop ? p : 2 * p, X = k !== U ? 1 : v - x[S] + 1;
      g.setEdge(j, k, { weight: V, minlen: X, nestingEdge: !0 }), g.setEdge(U, O, { weight: V, minlen: X, nestingEdge: !0 });
    }), g.parent(S) || g.setEdge(m, j, { weight: 0, minlen: v + x[S] });
  }
  function c(g) {
    var m = {};
    function y(p, v) {
      var x = g.children(p);
      x && x.length && x.forEach((S) => y(S, v + 1)), m[p] = v;
    }
    return g.children().forEach((p) => y(p, 1)), m;
  }
  function f(g) {
    return g.edges().reduce((m, y) => m + g.edge(y).weight, 0);
  }
  function h(g) {
    var m = g.graph();
    g.removeNode(m.nestingRoot), delete m.nestingRoot, g.edges().forEach((y) => {
      var p = g.edge(y);
      p.nestingEdge && g.removeEdge(y);
    });
  }
}), XM = Ye((n, i) => {
  var l = st();
  i.exports = r;
  function r(c) {
    function f(h) {
      let g = c.children(h), m = c.node(h);
      if (g.length && g.forEach(f), Object.hasOwn(m, "minRank")) {
        m.borderLeft = [], m.borderRight = [];
        for (let y = m.minRank, p = m.maxRank + 1; y < p; ++y) s(c, "borderLeft", "_bl", h, m, y), s(c, "borderRight", "_br", h, m, y);
      }
    }
    c.children().forEach(f);
  }
  function s(c, f, h, g, m, y) {
    let p = { width: 0, height: 0, rank: y, borderType: f }, v = m[f][y - 1], x = l.addDummyNode(c, "border", p, h);
    m[f][y] = x, c.setParent(x, g), v && c.setEdge(v, x, { weight: 1 });
  }
}), GM = Ye((n, i) => {
  i.exports = { adjust: l, undo: r };
  function l(y) {
    let p = y.graph().rankdir.toLowerCase();
    (p === "lr" || p === "rl") && s(y);
  }
  function r(y) {
    let p = y.graph().rankdir.toLowerCase();
    (p === "bt" || p === "rl") && f(y), (p === "lr" || p === "rl") && (g(y), s(y));
  }
  function s(y) {
    y.nodes().forEach((p) => c(y.node(p))), y.edges().forEach((p) => c(y.edge(p)));
  }
  function c(y) {
    let p = y.width;
    y.width = y.height, y.height = p;
  }
  function f(y) {
    y.nodes().forEach((p) => h(y.node(p))), y.edges().forEach((p) => {
      let v = y.edge(p);
      v.points.forEach(h), Object.hasOwn(v, "y") && h(v);
    });
  }
  function h(y) {
    y.y = -y.y;
  }
  function g(y) {
    y.nodes().forEach((p) => m(y.node(p))), y.edges().forEach((p) => {
      let v = y.edge(p);
      v.points.forEach(m), Object.hasOwn(v, "x") && m(v);
    });
  }
  function m(y) {
    let p = y.x;
    y.x = y.y, y.y = p;
  }
}), $M = Ye((n, i) => {
  var l = st();
  i.exports = r;
  function r(s) {
    let c = {}, f = s.nodes().filter((p) => !s.children(p).length), h = f.map((p) => s.node(p).rank), g = l.applyWithChunking(Math.max, h), m = l.range(g + 1).map(() => []);
    function y(p) {
      if (c[p]) return;
      c[p] = !0;
      let v = s.node(p);
      m[v.rank].push(p), s.successors(p).forEach(y);
    }
    return f.sort((p, v) => s.node(p).rank - s.node(v).rank).forEach(y), m;
  }
}), ZM = Ye((n, i) => {
  var l = st().zipObject;
  i.exports = r;
  function r(c, f) {
    let h = 0;
    for (let g = 1; g < f.length; ++g) h += s(c, f[g - 1], f[g]);
    return h;
  }
  function s(c, f, h) {
    let g = l(h, h.map((S, C) => C)), m = f.flatMap((S) => c.outEdges(S).map((C) => ({ pos: g[C.w], weight: c.edge(C).weight })).sort((C, j) => C.pos - j.pos)), y = 1;
    for (; y < h.length; ) y <<= 1;
    let p = 2 * y - 1;
    y -= 1;
    let v = new Array(p).fill(0), x = 0;
    return m.forEach((S) => {
      let C = S.pos + y;
      v[C] += S.weight;
      let j = 0;
      for (; C > 0; ) C % 2 && (j += v[C + 1]), C = C - 1 >> 1, v[C] += S.weight;
      x += S.weight * j;
    }), x;
  }
}), QM = Ye((n, i) => {
  i.exports = l;
  function l(r, s = []) {
    return s.map((c) => {
      let f = r.inEdges(c);
      if (f.length) {
        let h = f.reduce((g, m) => {
          let y = r.edge(m), p = r.node(m.v);
          return { sum: g.sum + y.weight * p.order, weight: g.weight + y.weight };
        }, { sum: 0, weight: 0 });
        return { v: c, barycenter: h.sum / h.weight, weight: h.weight };
      } else return { v: c };
    });
  }
}), KM = Ye((n, i) => {
  var l = st();
  i.exports = r;
  function r(f, h) {
    let g = {};
    f.forEach((y, p) => {
      let v = g[y.v] = { indegree: 0, in: [], out: [], vs: [y.v], i: p };
      y.barycenter !== void 0 && (v.barycenter = y.barycenter, v.weight = y.weight);
    }), h.edges().forEach((y) => {
      let p = g[y.v], v = g[y.w];
      p !== void 0 && v !== void 0 && (v.indegree++, p.out.push(g[y.w]));
    });
    let m = Object.values(g).filter((y) => !y.indegree);
    return s(m);
  }
  function s(f) {
    let h = [];
    function g(y) {
      return (p) => {
        p.merged || (p.barycenter === void 0 || y.barycenter === void 0 || p.barycenter >= y.barycenter) && c(y, p);
      };
    }
    function m(y) {
      return (p) => {
        p.in.push(y), --p.indegree === 0 && f.push(p);
      };
    }
    for (; f.length; ) {
      let y = f.pop();
      h.push(y), y.in.reverse().forEach(g(y)), y.out.forEach(m(y));
    }
    return h.filter((y) => !y.merged).map((y) => l.pick(y, ["vs", "i", "barycenter", "weight"]));
  }
  function c(f, h) {
    let g = 0, m = 0;
    f.weight && (g += f.barycenter * f.weight, m += f.weight), h.weight && (g += h.barycenter * h.weight, m += h.weight), f.vs = h.vs.concat(f.vs), f.barycenter = g / m, f.weight = m, f.i = Math.min(h.i, f.i), h.merged = !0;
  }
}), JM = Ye((n, i) => {
  var l = st();
  i.exports = r;
  function r(f, h) {
    let g = l.partition(f, (j) => Object.hasOwn(j, "barycenter")), m = g.lhs, y = g.rhs.sort((j, O) => O.i - j.i), p = [], v = 0, x = 0, S = 0;
    m.sort(c(!!h)), S = s(p, y, S), m.forEach((j) => {
      S += j.vs.length, p.push(j.vs), v += j.barycenter * j.weight, x += j.weight, S = s(p, y, S);
    });
    let C = { vs: p.flat(!0) };
    return x && (C.barycenter = v / x, C.weight = x), C;
  }
  function s(f, h, g) {
    let m;
    for (; h.length && (m = h[h.length - 1]).i <= g; ) h.pop(), f.push(m.vs), g++;
    return g;
  }
  function c(f) {
    return (h, g) => h.barycenter < g.barycenter ? -1 : h.barycenter > g.barycenter ? 1 : f ? g.i - h.i : h.i - g.i;
  }
}), WM = Ye((n, i) => {
  var l = QM(), r = KM(), s = JM();
  i.exports = c;
  function c(g, m, y, p) {
    let v = g.children(m), x = g.node(m), S = x ? x.borderLeft : void 0, C = x ? x.borderRight : void 0, j = {};
    S && (v = v.filter((N) => N !== S && N !== C));
    let O = l(g, v);
    O.forEach((N) => {
      if (g.children(N.v).length) {
        let k = c(g, N.v, y, p);
        j[N.v] = k, Object.hasOwn(k, "barycenter") && h(N, k);
      }
    });
    let D = r(O, y);
    f(D, j);
    let E = s(D, p);
    if (S && (E.vs = [S, E.vs, C].flat(!0), g.predecessors(S).length)) {
      let N = g.node(g.predecessors(S)[0]), k = g.node(g.predecessors(C)[0]);
      Object.hasOwn(E, "barycenter") || (E.barycenter = 0, E.weight = 0), E.barycenter = (E.barycenter * E.weight + N.order + k.order) / (E.weight + 2), E.weight += 2;
    }
    return E;
  }
  function f(g, m) {
    g.forEach((y) => {
      y.vs = y.vs.flatMap((p) => m[p] ? m[p].vs : p);
    });
  }
  function h(g, m) {
    g.barycenter !== void 0 ? (g.barycenter = (g.barycenter * g.weight + m.barycenter * m.weight) / (g.weight + m.weight), g.weight += m.weight) : (g.barycenter = m.barycenter, g.weight = m.weight);
  }
}), FM = Ye((n, i) => {
  var l = cn().Graph, r = st();
  i.exports = s;
  function s(f, h, g, m) {
    m || (m = f.nodes());
    let y = c(f), p = new l({ compound: !0 }).setGraph({ root: y }).setDefaultNodeLabel((v) => f.node(v));
    return m.forEach((v) => {
      let x = f.node(v), S = f.parent(v);
      (x.rank === h || x.minRank <= h && h <= x.maxRank) && (p.setNode(v), p.setParent(v, S || y), f[g](v).forEach((C) => {
        let j = C.v === v ? C.w : C.v, O = p.edge(j, v), D = O !== void 0 ? O.weight : 0;
        p.setEdge(j, v, { weight: f.edge(C).weight + D });
      }), Object.hasOwn(x, "minRank") && p.setNode(v, { borderLeft: x.borderLeft[h], borderRight: x.borderRight[h] }));
    }), p;
  }
  function c(f) {
    for (var h; f.hasNode(h = r.uniqueId("_root")); ) ;
    return h;
  }
}), PM = Ye((n, i) => {
  i.exports = l;
  function l(r, s, c) {
    let f = {}, h;
    c.forEach((g) => {
      let m = r.parent(g), y, p;
      for (; m; ) {
        if (y = r.parent(m), y ? (p = f[y], f[y] = m) : (p = h, h = m), p && p !== m) {
          s.setEdge(p, m);
          return;
        }
        m = y;
      }
    });
  }
}), eT = Ye((n, i) => {
  var l = $M(), r = ZM(), s = WM(), c = FM(), f = PM(), h = cn().Graph, g = st();
  i.exports = m;
  function m(x, S = {}) {
    if (typeof S.customOrder == "function") {
      S.customOrder(x, m);
      return;
    }
    let C = g.maxRank(x), j = y(x, g.range(1, C + 1), "inEdges"), O = y(x, g.range(C - 1, -1, -1), "outEdges"), D = l(x);
    if (v(x, D), S.disableOptimalOrderHeuristic) return;
    let E = Number.POSITIVE_INFINITY, N, k = S.constraints || [];
    for (let U = 0, V = 0; V < 4; ++U, ++V) {
      p(U % 2 ? j : O, U % 4 >= 2, k), D = g.buildLayerMatrix(x);
      let X = r(x, D);
      X < E ? (V = 0, N = Object.assign({}, D), E = X) : X === E && (N = structuredClone(D));
    }
    v(x, N);
  }
  function y(x, S, C) {
    let j = /* @__PURE__ */ new Map(), O = (D, E) => {
      j.has(D) || j.set(D, []), j.get(D).push(E);
    };
    for (let D of x.nodes()) {
      let E = x.node(D);
      if (typeof E.rank == "number" && O(E.rank, D), typeof E.minRank == "number" && typeof E.maxRank == "number") for (let N = E.minRank; N <= E.maxRank; N++) N !== E.rank && O(N, D);
    }
    return S.map(function(D) {
      return c(x, D, C, j.get(D) || []);
    });
  }
  function p(x, S, C) {
    let j = new h();
    x.forEach(function(O) {
      C.forEach((N) => j.setEdge(N.left, N.right));
      let D = O.graph().root, E = s(O, D, j, S);
      E.vs.forEach((N, k) => O.node(N).order = k), f(O, j, E.vs);
    });
  }
  function v(x, S) {
    Object.values(S).forEach((C) => C.forEach((j, O) => x.node(j).order = O));
  }
}), tT = Ye((n, i) => {
  var l = cn().Graph, r = st();
  i.exports = { positionX: C, findType1Conflicts: s, findType2Conflicts: c, addConflict: h, hasConflict: g, verticalAlignment: m, horizontalCompaction: y, alignCoordinates: x, findSmallestWidthAlignment: v, balance: S };
  function s(D, E) {
    let N = {};
    function k(U, V) {
      let X = 0, te = 0, K = U.length, Y = V[V.length - 1];
      return V.forEach((Z, J) => {
        let M = f(D, Z), L = M ? D.node(M).order : K;
        (M || Z === Y) && (V.slice(te, J + 1).forEach((_) => {
          D.predecessors(_).forEach((z) => {
            let B = D.node(z), $ = B.order;
            ($ < X || L < $) && !(B.dummy && D.node(_).dummy) && h(N, z, _);
          });
        }), te = J + 1, X = L);
      }), V;
    }
    return E.length && E.reduce(k), N;
  }
  function c(D, E) {
    let N = {};
    function k(V, X, te, K, Y) {
      let Z;
      r.range(X, te).forEach((J) => {
        Z = V[J], D.node(Z).dummy && D.predecessors(Z).forEach((M) => {
          let L = D.node(M);
          L.dummy && (L.order < K || L.order > Y) && h(N, M, Z);
        });
      });
    }
    function U(V, X) {
      let te = -1, K, Y = 0;
      return X.forEach((Z, J) => {
        if (D.node(Z).dummy === "border") {
          let M = D.predecessors(Z);
          M.length && (K = D.node(M[0]).order, k(X, Y, J, te, K), Y = J, te = K);
        }
        k(X, Y, X.length, K, V.length);
      }), X;
    }
    return E.length && E.reduce(U), N;
  }
  function f(D, E) {
    if (D.node(E).dummy) return D.predecessors(E).find((N) => D.node(N).dummy);
  }
  function h(D, E, N) {
    if (E > N) {
      let U = E;
      E = N, N = U;
    }
    let k = D[E];
    k || (D[E] = k = {}), k[N] = !0;
  }
  function g(D, E, N) {
    if (E > N) {
      let k = E;
      E = N, N = k;
    }
    return !!D[E] && Object.hasOwn(D[E], N);
  }
  function m(D, E, N, k) {
    let U = {}, V = {}, X = {};
    return E.forEach((te) => {
      te.forEach((K, Y) => {
        U[K] = K, V[K] = K, X[K] = Y;
      });
    }), E.forEach((te) => {
      let K = -1;
      te.forEach((Y) => {
        let Z = k(Y);
        if (Z.length) {
          Z = Z.sort((M, L) => X[M] - X[L]);
          let J = (Z.length - 1) / 2;
          for (let M = Math.floor(J), L = Math.ceil(J); M <= L; ++M) {
            let _ = Z[M];
            V[Y] === Y && K < X[_] && !g(N, Y, _) && (V[_] = Y, V[Y] = U[Y] = U[_], K = X[_]);
          }
        }
      });
    }), { root: U, align: V };
  }
  function y(D, E, N, k, U) {
    let V = {}, X = p(D, E, N, U), te = U ? "borderLeft" : "borderRight";
    function K(J, M) {
      let L = X.nodes().slice(), _ = {}, z = L.pop();
      for (; z; ) {
        if (_[z]) J(z);
        else {
          _[z] = !0, L.push(z);
          for (let B of M(z)) L.push(B);
        }
        z = L.pop();
      }
    }
    function Y(J) {
      V[J] = X.inEdges(J).reduce((M, L) => Math.max(M, V[L.v] + X.edge(L)), 0);
    }
    function Z(J) {
      let M = X.outEdges(J).reduce((_, z) => Math.min(_, V[z.w] - X.edge(z)), Number.POSITIVE_INFINITY), L = D.node(J);
      M !== Number.POSITIVE_INFINITY && L.borderType !== te && (V[J] = Math.max(V[J], M));
    }
    return K(Y, X.predecessors.bind(X)), K(Z, X.successors.bind(X)), Object.keys(k).forEach((J) => V[J] = V[N[J]]), V;
  }
  function p(D, E, N, k) {
    let U = new l(), V = D.graph(), X = j(V.nodesep, V.edgesep, k);
    return E.forEach((te) => {
      let K;
      te.forEach((Y) => {
        let Z = N[Y];
        if (U.setNode(Z), K) {
          var J = N[K], M = U.edge(J, Z);
          U.setEdge(J, Z, Math.max(X(D, Y, K), M || 0));
        }
        K = Y;
      });
    }), U;
  }
  function v(D, E) {
    return Object.values(E).reduce((N, k) => {
      let U = Number.NEGATIVE_INFINITY, V = Number.POSITIVE_INFINITY;
      Object.entries(k).forEach(([te, K]) => {
        let Y = O(D, te) / 2;
        U = Math.max(K + Y, U), V = Math.min(K - Y, V);
      });
      let X = U - V;
      return X < N[0] && (N = [X, k]), N;
    }, [Number.POSITIVE_INFINITY, null])[1];
  }
  function x(D, E) {
    let N = Object.values(E), k = r.applyWithChunking(Math.min, N), U = r.applyWithChunking(Math.max, N);
    ["u", "d"].forEach((V) => {
      ["l", "r"].forEach((X) => {
        let te = V + X, K = D[te];
        if (K === E) return;
        let Y = Object.values(K), Z = k - r.applyWithChunking(Math.min, Y);
        X !== "l" && (Z = U - r.applyWithChunking(Math.max, Y)), Z && (D[te] = r.mapValues(K, (J) => J + Z));
      });
    });
  }
  function S(D, E) {
    return r.mapValues(D.ul, (N, k) => {
      if (E) return D[E.toLowerCase()][k];
      {
        let U = Object.values(D).map((V) => V[k]).sort((V, X) => V - X);
        return (U[1] + U[2]) / 2;
      }
    });
  }
  function C(D) {
    let E = r.buildLayerMatrix(D), N = Object.assign(s(D, E), c(D, E)), k = {}, U;
    ["u", "d"].forEach((X) => {
      U = X === "u" ? E : Object.values(E).reverse(), ["l", "r"].forEach((te) => {
        te === "r" && (U = U.map((J) => Object.values(J).reverse()));
        let K = (X === "u" ? D.predecessors : D.successors).bind(D), Y = m(D, U, N, K), Z = y(D, U, Y.root, Y.align, te === "r");
        te === "r" && (Z = r.mapValues(Z, (J) => -J)), k[X + te] = Z;
      });
    });
    let V = v(D, k);
    return x(k, V), S(k, D.graph().align);
  }
  function j(D, E, N) {
    return (k, U, V) => {
      let X = k.node(U), te = k.node(V), K = 0, Y;
      if (K += X.width / 2, Object.hasOwn(X, "labelpos")) switch (X.labelpos.toLowerCase()) {
        case "l":
          Y = -X.width / 2;
          break;
        case "r":
          Y = X.width / 2;
          break;
      }
      if (Y && (K += N ? Y : -Y), Y = 0, K += (X.dummy ? E : D) / 2, K += (te.dummy ? E : D) / 2, K += te.width / 2, Object.hasOwn(te, "labelpos")) switch (te.labelpos.toLowerCase()) {
        case "l":
          Y = te.width / 2;
          break;
        case "r":
          Y = -te.width / 2;
          break;
      }
      return Y && (K += N ? Y : -Y), Y = 0, K;
    };
  }
  function O(D, E) {
    return D.node(E).width;
  }
}), nT = Ye((n, i) => {
  var l = st(), r = tT().positionX;
  i.exports = s;
  function s(f) {
    f = l.asNonCompoundGraph(f), c(f), Object.entries(r(f)).forEach(([h, g]) => f.node(h).x = g);
  }
  function c(f) {
    let h = l.buildLayerMatrix(f), g = f.graph().ranksep, m = f.graph().rankalign, y = 0;
    h.forEach((p) => {
      let v = p.reduce((x, S) => {
        let C = f.node(S).height;
        return x > C ? x : C;
      }, 0);
      p.forEach((x) => {
        let S = f.node(x);
        m === "top" ? S.y = y + S.height / 2 : m === "bottom" ? S.y = y + v - S.height / 2 : S.y = y + v / 2;
      }), y += v + g;
    });
  }
}), aT = Ye((n, i) => {
  var l = LM(), r = UM(), s = YM(), c = st().normalizeRanks, f = IM(), h = st().removeEmptyRanks, g = qM(), m = XM(), y = GM(), p = eT(), v = nT(), x = st(), S = cn().Graph;
  i.exports = C;
  function C(T, q = {}) {
    let Q = q.debugTiming ? x.time : x.notime;
    return Q("layout", () => {
      let P = Q("  buildLayoutGraph", () => K(T));
      return Q("  runLayout", () => j(P, Q, q)), Q("  updateInputGraph", () => O(T, P)), P;
    });
  }
  function j(T, q, Q) {
    q("    makeSpaceForEdgeLabels", () => Y(T)), q("    removeSelfEdges", () => F(T)), q("    acyclic", () => l.run(T)), q("    nestingGraph.run", () => g.run(T)), q("    rank", () => s(x.asNonCompoundGraph(T))), q("    injectEdgeLabelProxies", () => Z(T)), q("    removeEmptyRanks", () => h(T)), q("    nestingGraph.cleanup", () => g.cleanup(T)), q("    normalizeRanks", () => c(T)), q("    assignRankMinMax", () => J(T)), q("    removeEdgeLabelProxies", () => M(T)), q("    normalize.run", () => r.run(T)), q("    parentDummyChains", () => f(T)), q("    addBorderSegments", () => m(T)), q("    order", () => p(T, Q)), q("    insertSelfEdges", () => A(T)), q("    adjustCoordinateSystem", () => y.adjust(T)), q("    position", () => v(T)), q("    positionSelfEdges", () => I(T)), q("    removeBorderNodes", () => $(T)), q("    normalize.undo", () => r.undo(T)), q("    fixupEdgeLabelCoords", () => z(T)), q("    undoCoordinateSystem", () => y.undo(T)), q("    translateGraph", () => L(T)), q("    assignNodeIntersects", () => _(T)), q("    reversePoints", () => B(T)), q("    acyclic.undo", () => l.undo(T));
  }
  function O(T, q) {
    T.nodes().forEach((Q) => {
      let P = T.node(Q), ie = q.node(Q);
      P && (P.x = ie.x, P.y = ie.y, P.order = ie.order, P.rank = ie.rank, q.children(Q).length && (P.width = ie.width, P.height = ie.height));
    }), T.edges().forEach((Q) => {
      let P = T.edge(Q), ie = q.edge(Q);
      P.points = ie.points, Object.hasOwn(ie, "x") && (P.x = ie.x, P.y = ie.y);
    }), T.graph().width = q.graph().width, T.graph().height = q.graph().height;
  }
  var D = ["nodesep", "edgesep", "ranksep", "marginx", "marginy"], E = { ranksep: 50, edgesep: 20, nodesep: 50, rankdir: "tb", rankalign: "center" }, N = ["acyclicer", "ranker", "rankdir", "align", "rankalign"], k = ["width", "height", "rank"], U = { width: 0, height: 0 }, V = ["minlen", "weight", "width", "height", "labeloffset"], X = { minlen: 1, weight: 1, width: 0, height: 0, labeloffset: 10, labelpos: "r" }, te = ["labelpos"];
  function K(T) {
    let q = new S({ multigraph: !0, compound: !0 }), Q = H(T.graph());
    return q.setGraph(Object.assign({}, E, G(Q, D), x.pick(Q, N))), T.nodes().forEach((P) => {
      let ie = H(T.node(P)), de = G(ie, k);
      Object.keys(U).forEach((he) => {
        de[he] === void 0 && (de[he] = U[he]);
      }), q.setNode(P, de), q.setParent(P, T.parent(P));
    }), T.edges().forEach((P) => {
      let ie = H(T.edge(P));
      q.setEdge(P, Object.assign({}, X, G(ie, V), x.pick(ie, te)));
    }), q;
  }
  function Y(T) {
    let q = T.graph();
    q.ranksep /= 2, T.edges().forEach((Q) => {
      let P = T.edge(Q);
      P.minlen *= 2, P.labelpos.toLowerCase() !== "c" && (q.rankdir === "TB" || q.rankdir === "BT" ? P.width += P.labeloffset : P.height += P.labeloffset);
    });
  }
  function Z(T) {
    T.edges().forEach((q) => {
      let Q = T.edge(q);
      if (Q.width && Q.height) {
        let P = T.node(q.v), ie = { rank: (T.node(q.w).rank - P.rank) / 2 + P.rank, e: q };
        x.addDummyNode(T, "edge-proxy", ie, "_ep");
      }
    });
  }
  function J(T) {
    let q = 0;
    T.nodes().forEach((Q) => {
      let P = T.node(Q);
      P.borderTop && (P.minRank = T.node(P.borderTop).rank, P.maxRank = T.node(P.borderBottom).rank, q = Math.max(q, P.maxRank));
    }), T.graph().maxRank = q;
  }
  function M(T) {
    T.nodes().forEach((q) => {
      let Q = T.node(q);
      Q.dummy === "edge-proxy" && (T.edge(Q.e).labelRank = Q.rank, T.removeNode(q));
    });
  }
  function L(T) {
    let q = Number.POSITIVE_INFINITY, Q = 0, P = Number.POSITIVE_INFINITY, ie = 0, de = T.graph(), he = de.marginx || 0, ge = de.marginy || 0;
    function xe(Se) {
      let _e = Se.x, De = Se.y, Pe = Se.width, Et = Se.height;
      q = Math.min(q, _e - Pe / 2), Q = Math.max(Q, _e + Pe / 2), P = Math.min(P, De - Et / 2), ie = Math.max(ie, De + Et / 2);
    }
    T.nodes().forEach((Se) => xe(T.node(Se))), T.edges().forEach((Se) => {
      let _e = T.edge(Se);
      Object.hasOwn(_e, "x") && xe(_e);
    }), q -= he, P -= ge, T.nodes().forEach((Se) => {
      let _e = T.node(Se);
      _e.x -= q, _e.y -= P;
    }), T.edges().forEach((Se) => {
      let _e = T.edge(Se);
      _e.points.forEach((De) => {
        De.x -= q, De.y -= P;
      }), Object.hasOwn(_e, "x") && (_e.x -= q), Object.hasOwn(_e, "y") && (_e.y -= P);
    }), de.width = Q - q + he, de.height = ie - P + ge;
  }
  function _(T) {
    T.edges().forEach((q) => {
      let Q = T.edge(q), P = T.node(q.v), ie = T.node(q.w), de, he;
      Q.points ? (de = Q.points[0], he = Q.points[Q.points.length - 1]) : (Q.points = [], de = ie, he = P), Q.points.unshift(x.intersectRect(P, de)), Q.points.push(x.intersectRect(ie, he));
    });
  }
  function z(T) {
    T.edges().forEach((q) => {
      let Q = T.edge(q);
      if (Object.hasOwn(Q, "x")) switch ((Q.labelpos === "l" || Q.labelpos === "r") && (Q.width -= Q.labeloffset), Q.labelpos) {
        case "l":
          Q.x -= Q.width / 2 + Q.labeloffset;
          break;
        case "r":
          Q.x += Q.width / 2 + Q.labeloffset;
          break;
      }
    });
  }
  function B(T) {
    T.edges().forEach((q) => {
      let Q = T.edge(q);
      Q.reversed && Q.points.reverse();
    });
  }
  function $(T) {
    T.nodes().forEach((q) => {
      if (T.children(q).length) {
        let Q = T.node(q), P = T.node(Q.borderTop), ie = T.node(Q.borderBottom), de = T.node(Q.borderLeft[Q.borderLeft.length - 1]), he = T.node(Q.borderRight[Q.borderRight.length - 1]);
        Q.width = Math.abs(he.x - de.x), Q.height = Math.abs(ie.y - P.y), Q.x = de.x + Q.width / 2, Q.y = P.y + Q.height / 2;
      }
    }), T.nodes().forEach((q) => {
      T.node(q).dummy === "border" && T.removeNode(q);
    });
  }
  function F(T) {
    T.edges().forEach((q) => {
      if (q.v === q.w) {
        var Q = T.node(q.v);
        Q.selfEdges || (Q.selfEdges = []), Q.selfEdges.push({ e: q, label: T.edge(q) }), T.removeEdge(q);
      }
    });
  }
  function A(T) {
    var q = x.buildLayerMatrix(T);
    q.forEach((Q) => {
      var P = 0;
      Q.forEach((ie, de) => {
        var he = T.node(ie);
        he.order = de + P, (he.selfEdges || []).forEach((ge) => {
          x.addDummyNode(T, "selfedge", { width: ge.label.width, height: ge.label.height, rank: he.rank, order: de + ++P, e: ge.e, label: ge.label }, "_se");
        }), delete he.selfEdges;
      });
    });
  }
  function I(T) {
    T.nodes().forEach((q) => {
      var Q = T.node(q);
      if (Q.dummy === "selfedge") {
        var P = T.node(Q.e.v), ie = P.x + P.width / 2, de = P.y, he = Q.x - ie, ge = P.height / 2;
        T.setEdge(Q.e, Q.label), T.removeNode(q), Q.label.points = [{ x: ie + 2 * he / 3, y: de - ge }, { x: ie + 5 * he / 6, y: de - ge }, { x: ie + he, y: de }, { x: ie + 5 * he / 6, y: de + ge }, { x: ie + 2 * he / 3, y: de + ge }], Q.label.x = Q.x, Q.label.y = Q.y;
      }
    });
  }
  function G(T, q) {
    return x.mapValues(x.pick(T, q), Number);
  }
  function H(T) {
    var q = {};
    return T && Object.entries(T).forEach(([Q, P]) => {
      typeof Q == "string" && (Q = Q.toLowerCase()), q[Q] = P;
    }), q;
  }
}), iT = Ye((n, i) => {
  var l = st(), r = cn().Graph;
  i.exports = { debugOrdering: s };
  function s(c) {
    let f = l.buildLayerMatrix(c), h = new r({ compound: !0, multigraph: !0 }).setGraph({});
    return c.nodes().forEach((g) => {
      h.setNode(g, { label: g }), h.setParent(g, "layer" + c.node(g).rank);
    }), c.edges().forEach((g) => h.setEdge(g.v, g.w, {}, g.name)), f.forEach((g, m) => {
      let y = "layer" + m;
      h.setNode(y, { rank: "same" }), g.reduce((p, v) => (h.setEdge(p, v, { style: "invis" }), v));
    }), h;
  }
}), oT = Ye((n, i) => {
  i.exports = "2.0.4";
}), lT = Ye((n, i) => {
  i.exports = { graphlib: cn(), layout: aT(), debug: iT(), util: { time: st().time, notime: st().notime }, version: oT() };
});
const Z0 = lT();
function rT() {
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
function sT() {
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
function uT() {
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
function cT({ data: n, selected: i }) {
  const l = n, { name: r, initial: s, terminal: c, transitionCount: f } = l, g = s ? "initial" : c ? "terminal" : "regular", m = () => s ? "Initial" : c ? "Final" : "State", y = () => s ? /* @__PURE__ */ b.jsx(rT, {}) : c ? /* @__PURE__ */ b.jsx(sT, {}) : /* @__PURE__ */ b.jsx(uT, {});
  return /* @__PURE__ */ b.jsxs(
    "div",
    {
      className: `fub-node fub-node--${g}${i ? " fub-node--selected" : ""}`,
      "data-node-type": g,
      children: [
        /* @__PURE__ */ b.jsx(
          bo,
          {
            type: "target",
            position: ye.Top,
            className: "fub-node-handle fub-node-handle--target",
            id: "target"
          }
        ),
        /* @__PURE__ */ b.jsxs("div", { className: "fub-node-header", children: [
          /* @__PURE__ */ b.jsx("div", { className: "fub-node-icon", children: y() }),
          /* @__PURE__ */ b.jsx("span", { className: "fub-node-title", children: r || "(unnamed)" }),
          /* @__PURE__ */ b.jsx("span", { className: "fub-node-badge", children: m() })
        ] }),
        /* @__PURE__ */ b.jsx("div", { className: "fub-node-body", children: f !== void 0 && f > 0 ? /* @__PURE__ */ b.jsx("div", { className: "fub-node-meta", children: /* @__PURE__ */ b.jsxs("span", { className: "fub-node-meta-item", children: [
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
          f,
          " transition",
          f !== 1 ? "s" : ""
        ] }) }) : /* @__PURE__ */ b.jsx("div", { className: "fub-node-meta fub-node-meta--empty", children: /* @__PURE__ */ b.jsx("span", { className: "fub-node-meta-item", children: "No outgoing transitions" }) }) }),
        /* @__PURE__ */ b.jsx(
          bo,
          {
            type: "source",
            position: ye.Bottom,
            className: "fub-node-handle fub-node-handle--source",
            id: "source"
          }
        )
      ]
    }
  );
}
const fT = ee.memo(cT), dT = {
  stateNode: fT
};
function hT({
  id: n,
  sourceX: i,
  sourceY: l,
  targetX: r,
  targetY: s,
  sourcePosition: c,
  targetPosition: f,
  label: h,
  selected: g
}) {
  const [m, y, p] = kd({
    sourceX: i,
    sourceY: l,
    sourcePosition: c,
    targetX: r,
    targetY: s,
    targetPosition: f
  });
  return /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
    /* @__PURE__ */ b.jsx(
      Zl,
      {
        id: n,
        path: m,
        className: `fub-edge-path${g ? " fub-edge-path--selected" : ""}`,
        markerEnd: `url(#fub-arrow${g ? "-selected" : ""})`
      }
    ),
    h && /* @__PURE__ */ b.jsx(oM, { children: /* @__PURE__ */ b.jsx(
      "div",
      {
        className: `fub-edge-label${g ? " fub-edge-label--selected" : ""}`,
        style: {
          position: "absolute",
          transform: `translate(-50%, -50%) translate(${y}px,${p}px)`,
          pointerEvents: "all"
        },
        children: h
      }
    ) })
  ] });
}
const gT = {
  custom: hT
}, Ds = 200, Os = 80;
function mT(n, i, l = "TB") {
  if (n.length === 0)
    return { nodes: [], edges: [] };
  try {
    const r = new Z0.graphlib.Graph();
    return r.setDefaultEdgeLabel(() => ({})), r.setGraph({ rankdir: l, nodesep: 80, ranksep: 100 }), n.forEach((c) => {
      r.setNode(c.id, { width: Ds, height: Os });
    }), i.forEach((c) => {
      r.setEdge(c.source, c.target);
    }), Z0.layout(r), { nodes: n.map((c, f) => {
      const h = r.node(c.id);
      if (!h || typeof h.x != "number" || typeof h.y != "number") {
        const g = f % 3, m = Math.floor(f / 3);
        return {
          ...c,
          position: {
            x: g * (Ds + 80) + 50,
            y: m * (Os + 80) + 50
          }
        };
      }
      return {
        ...c,
        position: {
          x: h.x - Ds / 2,
          y: h.y - Os / 2
        }
      };
    }), edges: i };
  } catch {
    return { nodes: n.map((s, c) => {
      const f = c % 3, h = Math.floor(c / 3);
      return {
        ...s,
        position: {
          x: f * (Ds + 80) + 50,
          y: h * (Os + 80) + 50
        }
      };
    }), edges: i };
  }
}
function Q0(n, i) {
  const l = Array.isArray(n) ? n : [], r = Array.isArray(i) ? i : [];
  if (l.length === 0)
    return { nodes: [], edges: [] };
  const s = {};
  r.forEach((g) => {
    g.from && (s[g.from] = (s[g.from] || 0) + 1);
  });
  const c = l.map((g, m) => ({
    id: g.name || `state-${m}`,
    type: "stateNode",
    position: { x: 0, y: 0 },
    data: {
      name: g.name,
      initial: g.initial,
      terminal: g.terminal,
      stateIndex: m,
      transitionCount: s[g.name] || 0
    }
  })), f = new Set(l.map((g) => g.name)), h = [];
  return r.forEach((g, m) => {
    const y = g.to || g.dynamic_to?.resolver, p = f.has(g.from), v = y && f.has(y);
    !p || !v || h.push({
      id: `edge-${m}`,
      source: g.from,
      target: y,
      label: g.event || "(event)",
      type: "custom",
      data: {
        transitionIndex: m
      }
    });
  }), mT(c, h);
}
function pT(n) {
  const i = be((M) => M.document.definition), l = be((M) => M.selection), r = be((M) => M.setSelection), s = be((M) => M.addState), c = be((M) => M.updateStateName), f = be((M) => M.updateStateFlag), h = Be((M) => M.canvasZoom), g = Be((M) => M.zoomCanvas), m = !!n.readOnly, y = i.states, p = i.transitions, v = ee.useRef(null), x = gu(), [S, C] = ee.useState(!1), { nodes: j, edges: O } = ee.useMemo(
    () => Q0(y, p),
    [y, p]
  ), [D, E, N] = lM(j), [k, U, V] = rM(O);
  ee.useEffect(() => {
    const { nodes: M, edges: L } = Q0(y, p);
    E(M), U(L);
  }, [y, p, E, U]), ee.useEffect(() => {
    if (l.kind === "state") {
      const M = y[l.stateIndex];
      M && (E(
        (L) => L.map((_) => ({
          ..._,
          selected: _.id === M.name
        }))
      ), U(
        (L) => L.map((_) => ({
          ..._,
          selected: !1
        }))
      ));
    } else if (l.kind === "transition" || l.kind === "workflow-node") {
      const M = l.transitionIndex;
      E(
        (L) => L.map((_) => ({
          ..._,
          selected: !1
        }))
      ), U(
        (L) => L.map((_) => {
          const z = _.data;
          return {
            ..._,
            selected: z?.transitionIndex === M
          };
        })
      );
    } else
      E(
        (M) => M.map((L) => ({
          ...L,
          selected: !1
        }))
      ), U(
        (M) => M.map((L) => ({
          ...L,
          selected: !1
        }))
      );
  }, [l, y, E, U]);
  const X = ee.useCallback(
    (M) => {
      N(M);
      for (const L of M)
        if (L.type === "select" && L.selected) {
          const z = D.find((B) => B.id === L.id)?.data;
          z?.stateIndex !== void 0 && r({ kind: "state", stateIndex: z.stateIndex });
        }
    },
    [D, N, r]
  ), te = ee.useCallback(
    (M) => {
      V(M);
      for (const L of M)
        if (L.type === "select" && L.selected) {
          const z = k.find((B) => B.id === L.id)?.data;
          z?.transitionIndex !== void 0 && r({ kind: "transition", transitionIndex: z.transitionIndex });
        }
    },
    [k, V, r]
  ), K = ee.useCallback(
    (M, L) => {
      const _ = L.zoom - h;
      Math.abs(_) > 0.01 && g(_);
    },
    [h, g]
  ), Y = ee.useCallback(
    (M) => {
      m || (M.preventDefault(), M.dataTransfer.dropEffect = "move", C(!0));
    },
    [m]
  ), Z = ee.useCallback(
    (M) => {
      const L = M.relatedTarget;
      (!L || !M.currentTarget.contains(L)) && C(!1);
    },
    []
  ), J = ee.useCallback(
    (M) => {
      if (m) return;
      M.preventDefault(), C(!1);
      const L = M.dataTransfer.getData("application/reactflow");
      if (!L) return;
      let _;
      try {
        _ = JSON.parse(L);
      } catch {
        return;
      }
      if (_.type !== "state")
        return;
      x.screenToFlowPosition({
        x: M.clientX,
        y: M.clientY
      }), s();
      const z = y.length;
      setTimeout(() => {
        const $ = `${_.defaults?.initial ? "initial" : _.defaults?.terminal ? "final" : "state"}_${z + 1}`;
        c(z, $), _.defaults?.initial && f(z, "initial", !0), _.defaults?.terminal && f(z, "terminal", !0), r({ kind: "state", stateIndex: z });
      }, 0);
    },
    [m, x, s, y.length, c, f, r]
  );
  return /* @__PURE__ */ b.jsxs(
    "section",
    {
      className: "fub-panel fub-canvas",
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
              Math.round(h * 100),
              "%"
            ] }),
            m ? /* @__PURE__ */ b.jsx("span", { className: "fub-badge", children: "Read-only" }) : null
          ] })
        ] }),
        /* @__PURE__ */ b.jsxs(
          "div",
          {
            ref: v,
            className: `fub-panel-body fub-canvas-flow-container${S ? " fub-canvas-drop-target" : ""}`,
            onDragOver: Y,
            onDragLeave: Z,
            onDrop: J,
            children: [
              S && /* @__PURE__ */ b.jsx("div", { className: "fub-canvas-drop-indicator", children: /* @__PURE__ */ b.jsxs("div", { className: "fub-canvas-drop-indicator-content", children: [
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
              y.length === 0 ? /* @__PURE__ */ b.jsxs("div", { className: "fub-empty-state", role: "status", "aria-live": "polite", children: [
                /* @__PURE__ */ b.jsx("div", { className: "fub-empty-icon", "aria-hidden": "true", children: "< >" }),
                /* @__PURE__ */ b.jsx("h3", { children: "No states yet" }),
                /* @__PURE__ */ b.jsx("p", { children: "Create your first state to start building your machine." }),
                /* @__PURE__ */ b.jsx(
                  "button",
                  {
                    type: "button",
                    className: "fub-btn",
                    onClick: s,
                    disabled: m,
                    children: "Create first state"
                  }
                ),
                /* @__PURE__ */ b.jsxs("p", { className: "fub-muted", children: [
                  "Hint: press ",
                  /* @__PURE__ */ b.jsx("kbd", { children: "N" }),
                  " to add a state, or drag from the palette."
                ] })
              ] }) : /* @__PURE__ */ b.jsxs(
                aM,
                {
                  nodes: D,
                  edges: k,
                  onNodesChange: X,
                  onEdgesChange: te,
                  onMoveEnd: K,
                  nodeTypes: dT,
                  edgeTypes: gT,
                  defaultViewport: { x: 50, y: 50, zoom: h },
                  fitView: !0,
                  fitViewOptions: { padding: 0.2 },
                  proOptions: { hideAttribution: !0 },
                  nodesDraggable: !m,
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
                      dM,
                      {
                        variant: Jn.Dots,
                        gap: 20,
                        size: 1,
                        color: "var(--fub-border)"
                      }
                    ),
                    /* @__PURE__ */ b.jsx(
                      bM,
                      {
                        showZoom: !0,
                        showFitView: !0,
                        showInteractive: !1,
                        className: "fub-flow-controls"
                      }
                    ),
                    /* @__PURE__ */ b.jsx(
                      OM,
                      {
                        nodeStrokeColor: "var(--fub-border)",
                        nodeColor: (M) => {
                          const L = M.data;
                          return M.selected ? "var(--fub-accent)" : L?.initial ? "var(--fub-accent-muted)" : L?.terminal ? "var(--fub-warn)" : "var(--fub-bg-2)";
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
function K0(n) {
  return /* @__PURE__ */ b.jsx(sb, { children: /* @__PURE__ */ b.jsx(pT, { ...n }) });
}
function J0() {
  const n = be((h) => h.diagnostics), i = be((h) => h.focusDiagnostic), l = Ft((h) => h.log), r = Ft((h) => h.projectedOutcome), s = Ft((h) => h.blockedTransitions), c = Ft((h) => h.errors), f = Ft((h) => h.clear);
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
                onClick: f,
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
              n.length === 0 ? /* @__PURE__ */ b.jsx("li", { className: "fub-muted", children: "No diagnostics." }) : null,
              n.map((h, g) => /* @__PURE__ */ b.jsx("li", { children: /* @__PURE__ */ b.jsxs(
                "button",
                {
                  type: "button",
                  className: "fub-list-item",
                  onClick: () => {
                    i(h), (typeof window.requestAnimationFrame == "function" ? window.requestAnimationFrame.bind(window) : (y) => window.setTimeout(y, 0))(() => {
                      document.getElementById("fub-panel-inspector")?.focus();
                    });
                  },
                  children: [
                    /* @__PURE__ */ b.jsx("strong", { children: h.code }),
                    " ",
                    h.message
                  ]
                }
              ) }, `${h.code}-${h.path}-${g}`))
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
              /* @__PURE__ */ b.jsx("ul", { children: s.map((h) => /* @__PURE__ */ b.jsxs("li", { children: [
                /* @__PURE__ */ b.jsxs("div", { children: [
                  /* @__PURE__ */ b.jsx("code", { children: h.id || "(transition)" }),
                  " event ",
                  /* @__PURE__ */ b.jsx("code", { children: h.event })
                ] }),
                /* @__PURE__ */ b.jsx("ul", { children: (h.rejections ?? []).map((g, m) => /* @__PURE__ */ b.jsxs("li", { children: [
                  /* @__PURE__ */ b.jsx("strong", { children: g.code }),
                  ": ",
                  g.message,
                  g.remediationHint ? ` (${g.remediationHint})` : ""
                ] }, `${h.id}-rejection-${m}`)) })
              ] }, h.id || h.event)) })
            ] }),
            /* @__PURE__ */ b.jsxs("div", { className: "fub-console-card", "aria-label": "Runtime and authoring errors", children: [
              /* @__PURE__ */ b.jsx("strong", { children: "Runtime/authoring errors" }),
              c.length === 0 ? /* @__PURE__ */ b.jsx("p", { className: "fub-muted", children: "No runtime/authoring errors." }) : null,
              /* @__PURE__ */ b.jsx("ul", { children: c.map((h) => /* @__PURE__ */ b.jsxs("li", { className: "fub-log-error", children: [
                "[",
                h.code,
                "] ",
                h.method ? `${h.method}: ` : "",
                h.message
              ] }, h.id)) })
            ] }),
            /* @__PURE__ */ b.jsxs("ul", { role: "log", "aria-live": "polite", "aria-label": "Simulation log", children: [
              l.length === 0 ? /* @__PURE__ */ b.jsx("li", { className: "fub-muted", children: "No simulation runs yet." }) : null,
              l.map((h) => /* @__PURE__ */ b.jsxs("li", { className: `fub-log-${h.level}`, children: [
                "[",
                h.timestamp,
                "] ",
                h.message
              ] }, h.id))
            ] })
          ] })
        ] })
      ]
    }
  );
}
function yT() {
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
function vT() {
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
function bT() {
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
function xT() {
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
function wT() {
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
function ST() {
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
function ET() {
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
function _T() {
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
function NT() {
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
const W0 = [
  // States
  {
    id: "initial-state",
    type: "state",
    nodeKind: "stateNode",
    label: "Start",
    description: "Initial state - entry point of the machine",
    icon: /* @__PURE__ */ b.jsx(yT, {}),
    defaults: { initial: !0 }
  },
  {
    id: "regular-state",
    type: "state",
    nodeKind: "stateNode",
    label: "State",
    description: "Regular state - intermediate step",
    icon: /* @__PURE__ */ b.jsx(bT, {})
  },
  {
    id: "terminal-state",
    type: "state",
    nodeKind: "stateNode",
    label: "End",
    description: "Terminal state - final state of the machine",
    icon: /* @__PURE__ */ b.jsx(vT, {}),
    defaults: { terminal: !0 }
  },
  // Actions (for workflow nodes)
  {
    id: "email-action",
    type: "action",
    nodeKind: "step",
    label: "Email",
    description: "Send an email notification",
    icon: /* @__PURE__ */ b.jsx(xT, {})
  },
  {
    id: "event-action",
    type: "action",
    nodeKind: "step",
    label: "Event",
    description: "Emit or handle an event",
    icon: /* @__PURE__ */ b.jsx(wT, {})
  },
  {
    id: "api-action",
    type: "action",
    nodeKind: "step",
    label: "API",
    description: "Make an API call",
    icon: /* @__PURE__ */ b.jsx(ST, {})
  },
  // Logic
  {
    id: "delay-logic",
    type: "logic",
    nodeKind: "step",
    label: "Delay",
    description: "Wait for a specified duration",
    icon: /* @__PURE__ */ b.jsx(ET, {})
  },
  {
    id: "condition-logic",
    type: "logic",
    nodeKind: "when",
    label: "If/Else",
    description: "Conditional branching logic",
    icon: /* @__PURE__ */ b.jsx(_T, {})
  }
], CT = {
  state: "States",
  action: "Actions",
  logic: "Logic"
};
function MT({
  item: n,
  readOnly: i,
  onDragStart: l
}) {
  const [r, s] = ee.useState(!1), [c, f] = ee.useState(!1), h = ee.useCallback(
    (y) => {
      if (i) {
        y.preventDefault();
        return;
      }
      const p = JSON.stringify({
        id: n.id,
        type: n.type,
        nodeKind: n.nodeKind,
        label: n.label,
        defaults: n.defaults
      });
      y.dataTransfer.setData("application/reactflow", p), y.dataTransfer.setData("text/plain", n.label), y.dataTransfer.effectAllowed = "move", s(!0), l?.(n);
    },
    [n, i, l]
  ), g = ee.useCallback(() => {
    s(!1);
  }, []), m = () => n.defaults?.initial ? "fub-palette-item--initial" : n.defaults?.terminal ? "fub-palette-item--terminal" : n.type === "state" ? "fub-palette-item--state" : n.type === "action" ? "fub-palette-item--action" : n.type === "logic" ? "fub-palette-item--logic" : "";
  return /* @__PURE__ */ b.jsxs(
    "div",
    {
      className: `fub-palette-item ${m()}${r ? " fub-palette-item--dragging" : ""}${i ? " fub-palette-item--disabled" : ""}`,
      draggable: !i,
      onDragStart: h,
      onDragEnd: g,
      onMouseEnter: () => f(!0),
      onMouseLeave: () => f(!1),
      onFocus: () => f(!0),
      onBlur: () => f(!1),
      tabIndex: i ? -1 : 0,
      role: "button",
      "aria-label": `Drag to add ${n.label}`,
      "aria-disabled": i,
      children: [
        /* @__PURE__ */ b.jsx("div", { className: "fub-palette-item-icon", children: n.icon }),
        /* @__PURE__ */ b.jsx("span", { className: "fub-palette-item-label", children: n.label }),
        c && /* @__PURE__ */ b.jsx("div", { className: "fub-palette-tooltip", role: "tooltip", children: n.description })
      ]
    }
  );
}
function TT(n) {
  const [i, l] = ee.useState(""), [r, s] = ee.useState(/* @__PURE__ */ new Set()), c = !!n.readOnly, f = ee.useMemo(() => {
    if (!i.trim())
      return W0;
    const v = i.toLowerCase();
    return W0.filter(
      (x) => x.label.toLowerCase().includes(v) || x.description.toLowerCase().includes(v)
    );
  }, [i]), h = ee.useMemo(() => {
    const v = {};
    for (const x of f)
      v[x.type] || (v[x.type] = []), v[x.type].push(x);
    return v;
  }, [f]), g = ee.useCallback((v) => {
    s((x) => {
      const S = new Set(x);
      return S.has(v) ? S.delete(v) : S.add(v), S;
    });
  }, []), m = ee.useCallback((v) => {
    l(v.target.value);
  }, []), y = ee.useCallback(() => {
    l("");
  }, []), p = Object.keys(h);
  return /* @__PURE__ */ b.jsxs(
    "section",
    {
      className: "fub-palette",
      "aria-label": "Node palette",
      role: "region",
      children: [
        /* @__PURE__ */ b.jsxs("div", { className: "fub-palette-search", children: [
          /* @__PURE__ */ b.jsx("div", { className: "fub-palette-search-icon", children: /* @__PURE__ */ b.jsx(NT, {}) }),
          /* @__PURE__ */ b.jsx(
            "input",
            {
              type: "text",
              className: "fub-palette-search-input",
              placeholder: "Search nodes...",
              value: i,
              onChange: m,
              "aria-label": "Search nodes",
              disabled: c
            }
          ),
          i && /* @__PURE__ */ b.jsx(
            "button",
            {
              type: "button",
              className: "fub-palette-search-clear",
              onClick: y,
              "aria-label": "Clear search",
              children: "×"
            }
          )
        ] }),
        /* @__PURE__ */ b.jsxs("div", { className: "fub-palette-categories", children: [
          p.length === 0 && /* @__PURE__ */ b.jsx("div", { className: "fub-palette-empty", children: /* @__PURE__ */ b.jsx("p", { children: "No nodes match your search." }) }),
          p.map((v) => {
            const x = h[v], S = r.has(v), C = CT[v] || v;
            return /* @__PURE__ */ b.jsxs("div", { className: "fub-palette-category", children: [
              /* @__PURE__ */ b.jsxs(
                "button",
                {
                  type: "button",
                  className: "fub-palette-category-header",
                  onClick: () => g(v),
                  "aria-expanded": !S,
                  "aria-controls": `fub-palette-category-${v}`,
                  children: [
                    /* @__PURE__ */ b.jsx("span", { className: `fub-palette-chevron${S ? " fub-palette-chevron--collapsed" : ""}`, children: /* @__PURE__ */ b.jsx(
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
                    /* @__PURE__ */ b.jsx("span", { className: "fub-palette-category-label", children: C }),
                    /* @__PURE__ */ b.jsx("span", { className: "fub-palette-category-count", children: x.length })
                  ]
                }
              ),
              !S && /* @__PURE__ */ b.jsx(
                "div",
                {
                  id: `fub-palette-category-${v}`,
                  className: "fub-palette-items",
                  role: "group",
                  "aria-label": C,
                  children: x.map((j) => /* @__PURE__ */ b.jsx(
                    MT,
                    {
                      item: j,
                      readOnly: c,
                      onDragStart: n.onDragStart
                    },
                    j.id
                  ))
                }
              )
            ] }, v);
          })
        ] }),
        !c && /* @__PURE__ */ b.jsx("div", { className: "fub-palette-help", children: /* @__PURE__ */ b.jsx("p", { children: "Drag items onto the canvas to add them." }) })
      ]
    }
  );
}
function F0(n) {
  return n ? " is-selected" : "";
}
function jT(n, i) {
  return n.kind === "state" && n.stateIndex === i;
}
function AT(n, i) {
  return n.kind === "transition" || n.kind === "workflow-node" ? n.transitionIndex === i : !1;
}
function DT() {
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
function OT() {
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
function P0(n) {
  const [i, l] = ee.useState("palette"), r = be((p) => p.document.definition.states), s = be((p) => p.document.definition.transitions), c = be((p) => p.selection), f = be((p) => p.setSelection), h = be((p) => p.addState), g = be((p) => p.addTransition), m = !!n.readOnly, y = ee.useCallback((p) => {
    l(p);
  }, []);
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
                onClick: () => y("palette"),
                "aria-selected": i === "palette",
                "aria-controls": "fub-explorer-palette",
                title: "Node Palette",
                children: /* @__PURE__ */ b.jsx(DT, {})
              }
            ),
            /* @__PURE__ */ b.jsx(
              "button",
              {
                type: "button",
                role: "tab",
                className: `fub-view-toggle-btn${i === "tree" ? " is-active" : ""}`,
                onClick: () => y("tree"),
                "aria-selected": i === "tree",
                "aria-controls": "fub-explorer-tree",
                title: "Tree View",
                children: /* @__PURE__ */ b.jsx(OT, {})
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ b.jsx("div", { className: "fub-panel-body", children: i === "palette" ? /* @__PURE__ */ b.jsx("div", { id: "fub-explorer-palette", role: "tabpanel", children: /* @__PURE__ */ b.jsx(TT, { readOnly: m }) }) : /* @__PURE__ */ b.jsxs("div", { id: "fub-explorer-tree", role: "tabpanel", children: [
          /* @__PURE__ */ b.jsxs("div", { className: "fub-tree-actions", children: [
            /* @__PURE__ */ b.jsx("button", { type: "button", className: "fub-mini-btn", onClick: h, disabled: m, children: "+ State" }),
            /* @__PURE__ */ b.jsx("button", { type: "button", className: "fub-mini-btn", onClick: g, disabled: m, children: "+ Transition" })
          ] }),
          /* @__PURE__ */ b.jsxs("section", { className: "fub-section", children: [
            /* @__PURE__ */ b.jsx("h3", { children: "States" }),
            /* @__PURE__ */ b.jsx("ul", { children: r.map((p, v) => /* @__PURE__ */ b.jsx("li", { children: /* @__PURE__ */ b.jsxs(
              "button",
              {
                type: "button",
                className: `fub-list-item${F0(jT(c, v))}`,
                onClick: () => f({ kind: "state", stateIndex: v }),
                children: [
                  /* @__PURE__ */ b.jsx("span", { className: "fub-item-main", children: p.name || "(unnamed)" }),
                  /* @__PURE__ */ b.jsxs("span", { className: "fub-item-meta", children: [
                    p.initial ? "initial" : "",
                    p.terminal ? " final" : ""
                  ] })
                ]
              }
            ) }, `state-${v}`)) })
          ] }),
          /* @__PURE__ */ b.jsxs("section", { className: "fub-section", children: [
            /* @__PURE__ */ b.jsx("h3", { children: "Transitions" }),
            /* @__PURE__ */ b.jsx("ul", { children: s.map((p, v) => /* @__PURE__ */ b.jsx("li", { children: /* @__PURE__ */ b.jsxs(
              "button",
              {
                type: "button",
                className: `fub-list-item${F0(AT(c, v))}`,
                onClick: () => f({ kind: "transition", transitionIndex: v }),
                children: [
                  /* @__PURE__ */ b.jsx("span", { className: "fub-item-main", children: p.id || `transition-${v + 1}` }),
                  /* @__PURE__ */ b.jsx("span", { className: "fub-item-meta", children: G1(p) })
                ]
              }
            ) }, p.id || `transition-${v}`)) })
          ] })
        ] }) })
      ]
    }
  );
}
function zT(n) {
  const [i, l] = ee.useState(!1), r = ee.useRef(null), s = ee.useRef(null), c = ee.useRef(null), [f, h] = ee.useState(-1), g = ee.useCallback(() => {
    l(!1), h(-1);
  }, []), m = ee.useCallback(() => {
    n.disabled || (l(!0), h(0));
  }, [n.disabled]), y = ee.useCallback(() => {
    i ? g() : m();
  }, [g, i, m]);
  ee.useEffect(() => {
    if (!i)
      return;
    function x(S) {
      r.current && !r.current.contains(S.target) && g();
    }
    return document.addEventListener("mousedown", x), () => {
      document.removeEventListener("mousedown", x);
    };
  }, [g, i]);
  const p = ee.useCallback(
    (x) => {
      if (!i) {
        (x.key === "Enter" || x.key === " " || x.key === "ArrowDown") && (x.preventDefault(), m());
        return;
      }
      const S = n.items.filter((j) => !j.disabled), C = n.items.map((j, O) => ({ item: j, index: O })).filter(({ item: j }) => !j.disabled).map(({ index: j }) => j);
      switch (x.key) {
        case "Escape":
          x.preventDefault(), g(), c.current?.focus();
          break;
        case "ArrowDown":
          if (x.preventDefault(), S.length > 0) {
            const O = (C.indexOf(f) + 1) % C.length;
            h(C[O]);
          }
          break;
        case "ArrowUp":
          if (x.preventDefault(), S.length > 0) {
            const j = C.indexOf(f), O = j <= 0 ? C.length - 1 : j - 1;
            h(C[O]);
          }
          break;
        case "Enter":
        case " ":
          x.preventDefault(), f >= 0 && !n.items[f]?.disabled && (n.items[f]?.onClick(), g(), c.current?.focus());
          break;
        case "Tab":
          g();
          break;
        case "Home":
          x.preventDefault(), C.length > 0 && h(C[0]);
          break;
        case "End":
          x.preventDefault(), C.length > 0 && h(C[C.length - 1]);
          break;
      }
    },
    [g, f, i, m, n.items]
  ), v = ee.useCallback(
    (x) => {
      x.disabled || (x.onClick(), g(), c.current?.focus());
    },
    [g]
  );
  return /* @__PURE__ */ b.jsxs("div", { className: "fub-dropdown", ref: r, children: [
    /* @__PURE__ */ b.jsx(
      "button",
      {
        ref: c,
        type: "button",
        className: "fub-dropdown-trigger",
        onClick: y,
        onKeyDown: p,
        "aria-haspopup": "menu",
        "aria-expanded": i,
        disabled: n.disabled,
        children: n.trigger
      }
    ),
    i && /* @__PURE__ */ b.jsx(
      "div",
      {
        ref: s,
        className: `fub-dropdown-menu ${n.align === "right" ? "fub-dropdown-menu--right" : ""}`,
        role: "menu",
        "aria-orientation": "vertical",
        onKeyDown: p,
        children: n.items.map((x, S) => /* @__PURE__ */ b.jsxs(
          "button",
          {
            type: "button",
            className: `fub-dropdown-item ${f === S ? "fub-dropdown-item--focused" : ""} ${x.disabled ? "fub-dropdown-item--disabled" : ""}`,
            role: "menuitem",
            tabIndex: f === S ? 0 : -1,
            disabled: x.disabled,
            onClick: () => v(x),
            onMouseEnter: () => !x.disabled && h(S),
            children: [
              x.icon && /* @__PURE__ */ b.jsx("span", { className: "fub-dropdown-item-icon", children: x.icon }),
              /* @__PURE__ */ b.jsx("span", { className: "fub-dropdown-item-label", children: x.label })
            ]
          },
          S
        ))
      }
    )
  ] });
}
function RT() {
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
function lo(n) {
  return /* @__PURE__ */ b.jsx(
    "button",
    {
      type: "button",
      className: `fub-icon-btn ${n.className ?? ""}`,
      onClick: n.onClick,
      disabled: n.disabled,
      title: n.title,
      "aria-label": n.ariaLabel,
      children: n.icon
    }
  );
}
function kT() {
  return /* @__PURE__ */ b.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ b.jsx("path", { d: "M3 7h6a4 4 0 0 1 0 8H7" }),
    /* @__PURE__ */ b.jsx("path", { d: "M5 4L2 7l3 3" })
  ] });
}
function HT() {
  return /* @__PURE__ */ b.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ b.jsx("path", { d: "M13 7H7a4 4 0 0 0 0 8h2" }),
    /* @__PURE__ */ b.jsx("path", { d: "M11 4l3 3-3 3" })
  ] });
}
function BT() {
  return /* @__PURE__ */ b.jsx("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "currentColor", children: /* @__PURE__ */ b.jsx("path", { d: "M3 2.5v9l8-4.5-8-4.5z" }) });
}
function ey() {
  return /* @__PURE__ */ b.jsx("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ b.jsx("path", { d: "M7 2v7M4 6l3 3 3-3M2 11h10" }) });
}
function LT() {
  return /* @__PURE__ */ b.jsxs("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ b.jsx("path", { d: "M2 7a5 5 0 0 1 9-3M12 7a5 5 0 0 1-9 3" }),
    /* @__PURE__ */ b.jsx("path", { d: "M2 3v4h4M12 11V7H8" })
  ] });
}
function UT() {
  return /* @__PURE__ */ b.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ b.jsx("rect", { x: "2", y: "3", width: "12", height: "10", rx: "1" }),
    /* @__PURE__ */ b.jsx("path", { d: "M6 3v10" })
  ] });
}
function VT() {
  return /* @__PURE__ */ b.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ b.jsx("rect", { x: "2", y: "3", width: "12", height: "10", rx: "1" }),
    /* @__PURE__ */ b.jsx("path", { d: "M10 3v10" })
  ] });
}
function YT() {
  return /* @__PURE__ */ b.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ b.jsx("rect", { x: "2", y: "3", width: "12", height: "10", rx: "1" }),
    /* @__PURE__ */ b.jsx("path", { d: "M5 7l2 2-2 2" }),
    /* @__PURE__ */ b.jsx("path", { d: "M9 11h2" })
  ] });
}
function IT() {
  return /* @__PURE__ */ b.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ b.jsx("circle", { cx: "8", cy: "8", r: "3" }),
    /* @__PURE__ */ b.jsx("path", { d: "M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.4 1.4M11.55 11.55l1.4 1.4M3.05 12.95l1.4-1.4M11.55 4.45l1.4-1.4" })
  ] });
}
function qT() {
  return /* @__PURE__ */ b.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ b.jsx("path", { d: "M13.5 8.5a6 6 0 1 1-6-6c.3 0 .5.2.4.5-.3.8-.4 1.7-.4 2.5a5 5 0 0 0 5 5c.8 0 1.7-.1 2.5-.4.3-.1.5.1.5.4z" }) });
}
const XT = new Intl.DateTimeFormat(void 0, {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
});
function GT(n, i) {
  const l = n?.updatedAt && !Number.isNaN(Date.parse(n.updatedAt)) ? XT.format(new Date(n.updatedAt)) : void 0;
  return i ? n?.state === "saving" && n.source === "autosave" ? "Unsaved changes (autosaving...)" : n?.state === "saved" && n.source === "autosave" && l ? `Unsaved changes (autosaved ${l})` : n?.state === "error" && n.source === "autosave" ? `Unsaved changes (autosave failed: ${n.message ?? "internal error"})` : "Unsaved changes" : n?.state === "saving" ? "Saving..." : n?.state === "saved" && l ? `Saved ${l}` : n?.state === "error" ? `Save failed: ${n.message ?? "internal error"}` : "";
}
function ty(n) {
  const i = be((X) => X.document.definition.name), l = be((X) => X.isDirty), r = be((X) => X.diagnostics.length), s = be((X) => X.setMachineName), c = be((X) => X.undo), f = be((X) => X.redo), h = be((X) => X.historyIndex), g = be((X) => X.history.length), m = Be((X) => X.togglePanel), y = Be((X) => X.theme), p = Be((X) => X.toggleTheme), v = Be((X) => X.explorerCollapsed), x = Be((X) => X.inspectorCollapsed), S = Be((X) => X.consoleCollapsed), [C, j] = ee.useState(null), O = GT(n.saveStatus, l), D = n.saveStatus?.state === "error" ? " fub-save-status-error" : n.saveStatus?.state === "saving" ? " fub-save-status-saving" : "", E = (X, te) => {
    if (!(!te || typeof te != "function"))
      try {
        const K = te();
        K instanceof Promise && (j(X), K.finally(() => {
          j((Y) => Y === X ? null : Y);
        }));
      } catch {
        j((K) => K === X ? null : K);
      }
  }, N = n.authoringAvailable ? "Save Draft" : "Save", k = !!n.readOnly, U = [
    {
      label: "Recover Draft",
      onClick: () => E("recover", n.onRecoverDraft),
      disabled: k || !n.recoveryAvailable || !!C,
      icon: /* @__PURE__ */ b.jsx(LT, {})
    },
    {
      label: "Export JSON",
      onClick: () => E("export-json", n.onExportJSON),
      disabled: !!C,
      icon: /* @__PURE__ */ b.jsx(ey, {})
    },
    {
      label: "Export RPC",
      onClick: () => E("export-rpc", n.onExportRPC),
      disabled: !!C || !n.rpcExportAvailable,
      icon: /* @__PURE__ */ b.jsx(ey, {})
    }
  ], V = (X) => {
    n.onPanelToggle ? n.onPanelToggle(X) : m(X);
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
            readOnly: k,
            onChange: (X) => s(X.target.value)
          }
        ),
        l ? /* @__PURE__ */ b.jsx("span", { "aria-label": "Unsaved changes", className: "fub-dirty-dot" }) : null
      ] }),
      /* @__PURE__ */ b.jsxs("span", { className: "fub-badge fub-problems-badge", "aria-live": "polite", children: [
        "Problems: ",
        r
      ] })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: "fub-header-center", role: "group", "aria-label": "Builder actions", children: [
      /* @__PURE__ */ b.jsxs("div", { className: "fub-btn-group", children: [
        /* @__PURE__ */ b.jsx(
          lo,
          {
            icon: /* @__PURE__ */ b.jsx(kT, {}),
            onClick: c,
            disabled: k || h === 0 || !!C,
            ariaLabel: "Undo",
            title: "Undo (Ctrl+Z)"
          }
        ),
        /* @__PURE__ */ b.jsx(
          lo,
          {
            icon: /* @__PURE__ */ b.jsx(HT, {}),
            onClick: f,
            disabled: k || h >= g - 1 || !!C,
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
            onClick: () => E("save", n.onSave),
            disabled: k || !!C,
            "aria-keyshortcuts": "Control+S Meta+S",
            children: C === "save" ? "Saving..." : N
          }
        ),
        /* @__PURE__ */ b.jsx(
          "button",
          {
            type: "button",
            className: "fub-btn fub-btn-secondary",
            onClick: () => E("validate", n.onValidate),
            disabled: k || !!C,
            "aria-keyshortcuts": "Control+Enter Meta+Enter",
            children: C === "validate" ? "Validating..." : "Validate"
          }
        )
      ] }),
      /* @__PURE__ */ b.jsx("div", { className: "fub-header-separator", "aria-hidden": "true" }),
      /* @__PURE__ */ b.jsx(
        zT,
        {
          trigger: /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
            "More ",
            /* @__PURE__ */ b.jsx(RT, {})
          ] }),
          items: U,
          disabled: !!C
        }
      ),
      /* @__PURE__ */ b.jsx("div", { className: "fub-header-separator", "aria-hidden": "true" }),
      /* @__PURE__ */ b.jsxs(
        "button",
        {
          type: "button",
          className: "fub-btn fub-btn-primary",
          onClick: () => E("simulate", n.onSimulate),
          disabled: !n.runtimeAvailable || !!C,
          title: n.runtimeAvailable ? "Run dry-run + snapshot" : "Runtime RPC unavailable",
          children: [
            /* @__PURE__ */ b.jsx(BT, {}),
            C === "simulate" ? "Running..." : "Run"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: "fub-header-right", role: "group", "aria-label": "View controls", children: [
      /* @__PURE__ */ b.jsxs("div", { className: "fub-btn-group", children: [
        /* @__PURE__ */ b.jsx(
          lo,
          {
            icon: /* @__PURE__ */ b.jsx(UT, {}),
            onClick: () => V("explorer"),
            ariaLabel: v ? "Show Explorer" : "Hide Explorer",
            title: v ? "Show Explorer" : "Hide Explorer",
            className: v ? "" : "fub-icon-btn--active"
          }
        ),
        /* @__PURE__ */ b.jsx(
          lo,
          {
            icon: /* @__PURE__ */ b.jsx(VT, {}),
            onClick: () => V("inspector"),
            ariaLabel: x ? "Show Inspector" : "Hide Inspector",
            title: x ? "Show Inspector" : "Hide Inspector",
            className: x ? "" : "fub-icon-btn--active"
          }
        ),
        /* @__PURE__ */ b.jsx(
          lo,
          {
            icon: /* @__PURE__ */ b.jsx(YT, {}),
            onClick: () => V("console"),
            ariaLabel: S ? "Show Console" : "Hide Console",
            title: S ? "Show Console" : "Hide Console",
            className: S ? "" : "fub-icon-btn--active"
          }
        )
      ] }),
      /* @__PURE__ */ b.jsx("div", { className: "fub-header-separator", "aria-hidden": "true" }),
      /* @__PURE__ */ b.jsx(
        lo,
        {
          icon: y === "light" ? /* @__PURE__ */ b.jsx(qT, {}) : /* @__PURE__ */ b.jsx(IT, {}),
          onClick: p,
          ariaLabel: y === "light" ? "Switch to dark theme" : "Switch to light theme",
          title: y === "light" ? "Switch to dark theme" : "Switch to light theme"
        }
      ),
      O && /* @__PURE__ */ b.jsx("span", { className: `fub-save-status${D}`, role: "status", "aria-live": "polite", children: O })
    ] })
  ] });
}
function vn(n) {
  return n.messages.length === 0 ? null : /* @__PURE__ */ b.jsx("ul", { className: "fub-inline-diags", role: "alert", children: n.messages.map((i, l) => /* @__PURE__ */ b.jsx("li", { children: i }, `${i}-${l}`)) });
}
function Zn(n) {
  return n.map((i) => i.message);
}
function $T(n) {
  return n.dynamic_to ? "dynamic" : "static";
}
function ZT(n) {
  return n.kind === "step" ? `step:${n.step?.action_id || "(action_id)"}` : n.kind === "when" ? `when:${n.expr || "(expr)"}` : `${n.kind}: unsupported`;
}
function QT(n) {
  return JSON.stringify(n ?? {}, null, 2);
}
function KT(n) {
  if (n.trim() === "")
    return { value: {} };
  try {
    const i = JSON.parse(n);
    return !i || typeof i != "object" || Array.isArray(i) ? { error: "metadata must be a JSON object" } : { value: i };
  } catch {
    return { error: "metadata must be valid JSON" };
  }
}
function JT(n) {
  const i = ee.useMemo(() => QT(n.metadata), [n.metadata]), [l, r] = ee.useState(i), [s, c] = ee.useState(null);
  ee.useEffect(() => {
    r(i), c(null);
  }, [i]);
  const f = () => {
    if (n.readOnly)
      return;
    const h = KT(l);
    if (h.error) {
      c(h.error);
      return;
    }
    c(null), n.onCommit(h.value ?? {});
  };
  return /* @__PURE__ */ b.jsxs("label", { className: "fub-field", children: [
    /* @__PURE__ */ b.jsx("span", { children: "Metadata (JSON object)" }),
    /* @__PURE__ */ b.jsx(
      "textarea",
      {
        "aria-label": "Workflow metadata",
        className: "fub-input fub-textarea",
        value: l,
        readOnly: !!n.readOnly,
        onChange: (h) => r(h.target.value),
        onBlur: f
      }
    ),
    s ? /* @__PURE__ */ b.jsx(vn, { messages: [s] }) : null
  ] });
}
function WT(n) {
  const [i, l] = ee.useState([]), [r, s] = ee.useState(null);
  return ee.useEffect(() => {
    let c = !1;
    if (!n) {
      l([]), s("Action catalog unavailable.");
      return;
    }
    return n.listActions().then((f) => {
      c || (l(f), s(f.length === 0 ? "Action catalog is empty." : null));
    }).catch(() => {
      c || (l([]), s("Action catalog unavailable."));
    }), () => {
      c = !0;
    };
  }, [n]), { actions: i, unavailableReason: r };
}
function ny(n) {
  const i = be((D) => D.document.definition), l = be((D) => D.selection), r = be((D) => D.diagnostics), s = be((D) => D.removeState), c = be((D) => D.updateStateName), f = be((D) => D.updateStateFlag), h = be((D) => D.removeTransition), g = be((D) => D.updateTransition), m = be((D) => D.updateTransitionTargetKind), y = be((D) => D.addWorkflowNode), p = be((D) => D.removeWorkflowNode), v = be((D) => D.selectWorkflowNode), x = be((D) => D.updateWorkflowNodeField), S = be((D) => D.updateWorkflowNodeMetadata), C = $1(r, l), j = WT(n.actionCatalogProvider), O = !!n.readOnly;
  if (l.kind === "state") {
    const D = i.states[l.stateIndex];
    return D ? /* @__PURE__ */ b.jsxs(
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
            /* @__PURE__ */ b.jsx("strong", { children: "State" }),
            /* @__PURE__ */ b.jsx(
              "button",
              {
                type: "button",
                className: "fub-mini-btn danger",
                onClick: () => s(l.stateIndex),
                disabled: O,
                children: "Delete"
              }
            )
          ] }),
          /* @__PURE__ */ b.jsxs("div", { className: "fub-panel-body", children: [
            O ? /* @__PURE__ */ b.jsx("p", { className: "fub-readonly-note", children: "Read-only mode: editing is disabled in narrow/mobile layout." }) : null,
            /* @__PURE__ */ b.jsxs("label", { className: "fub-field", children: [
              /* @__PURE__ */ b.jsx("span", { children: "Name" }),
              /* @__PURE__ */ b.jsx(
                "input",
                {
                  "aria-label": "State name",
                  className: "fub-input",
                  value: D.name,
                  readOnly: O,
                  onChange: (E) => c(l.stateIndex, E.target.value)
                }
              ),
              /* @__PURE__ */ b.jsx(
                vn,
                {
                  messages: Zn(
                    ys(r, l, "name")
                  )
                }
              )
            ] }),
            /* @__PURE__ */ b.jsxs("label", { className: "fub-checkbox-row", children: [
              /* @__PURE__ */ b.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: !!D.initial,
                  disabled: O,
                  onChange: (E) => f(l.stateIndex, "initial", E.target.checked)
                }
              ),
              "Initial"
            ] }),
            /* @__PURE__ */ b.jsxs("label", { className: "fub-checkbox-row", children: [
              /* @__PURE__ */ b.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: !!D.terminal,
                  disabled: O,
                  onChange: (E) => f(l.stateIndex, "terminal", E.target.checked)
                }
              ),
              "Final"
            ] }),
            /* @__PURE__ */ b.jsx(vn, { messages: Zn(C) })
          ] })
        ]
      }
    ) : /* @__PURE__ */ b.jsxs(
      "section",
      {
        className: "fub-panel fub-inspector",
        "aria-label": "Inspector panel",
        role: "region",
        "aria-labelledby": "fub-panel-inspector-heading",
        id: "fub-panel-inspector",
        tabIndex: -1,
        children: [
          /* @__PURE__ */ b.jsx("div", { className: "fub-panel-header", id: "fub-panel-inspector-heading", children: /* @__PURE__ */ b.jsx("strong", { children: "Inspector" }) }),
          /* @__PURE__ */ b.jsx("div", { className: "fub-panel-body", children: "State not found." })
        ]
      }
    );
  }
  if (l.kind === "transition") {
    const D = i.transitions[l.transitionIndex];
    if (!D)
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
            /* @__PURE__ */ b.jsx("div", { className: "fub-panel-header", id: "fub-panel-inspector-heading", children: /* @__PURE__ */ b.jsx("strong", { children: "Inspector" }) }),
            /* @__PURE__ */ b.jsx("div", { className: "fub-panel-body", children: "Transition not found." })
          ]
        }
      );
    const E = $T(D);
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
            /* @__PURE__ */ b.jsx("strong", { children: "Transition" }),
            /* @__PURE__ */ b.jsx(
              "button",
              {
                type: "button",
                className: "fub-mini-btn danger",
                onClick: () => h(l.transitionIndex),
                disabled: O,
                children: "Delete"
              }
            )
          ] }),
          /* @__PURE__ */ b.jsxs("div", { className: "fub-panel-body", children: [
            O ? /* @__PURE__ */ b.jsx("p", { className: "fub-readonly-note", children: "Read-only mode: editing is disabled in narrow/mobile layout." }) : null,
            /* @__PURE__ */ b.jsxs("label", { className: "fub-field", children: [
              /* @__PURE__ */ b.jsx("span", { children: "Event" }),
              /* @__PURE__ */ b.jsx(
                "input",
                {
                  "aria-label": "Transition event",
                  className: "fub-input",
                  value: D.event,
                  readOnly: O,
                  onChange: (N) => g(l.transitionIndex, "event", N.target.value)
                }
              ),
              /* @__PURE__ */ b.jsx(
                vn,
                {
                  messages: Zn(
                    ys(r, l, "event")
                  )
                }
              )
            ] }),
            /* @__PURE__ */ b.jsxs("label", { className: "fub-field", children: [
              /* @__PURE__ */ b.jsx("span", { children: "From" }),
              /* @__PURE__ */ b.jsx(
                "select",
                {
                  "aria-label": "Transition from",
                  className: "fub-input",
                  value: D.from,
                  disabled: O,
                  onChange: (N) => g(l.transitionIndex, "from", N.target.value),
                  children: i.states.map((N, k) => /* @__PURE__ */ b.jsx("option", { value: N.name, children: N.name }, `${N.name}-${k}`))
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
                    name: `target-kind-${l.transitionIndex}`,
                    checked: E === "static",
                    disabled: O,
                    onChange: () => m(l.transitionIndex, "static")
                  }
                ),
                "Static"
              ] }),
              /* @__PURE__ */ b.jsxs("label", { className: "fub-checkbox-row", children: [
                /* @__PURE__ */ b.jsx(
                  "input",
                  {
                    type: "radio",
                    name: `target-kind-${l.transitionIndex}`,
                    checked: E === "dynamic",
                    disabled: O,
                    onChange: () => m(l.transitionIndex, "dynamic")
                  }
                ),
                "Dynamic"
              ] })
            ] }),
            E === "static" ? /* @__PURE__ */ b.jsxs("label", { className: "fub-field", children: [
              /* @__PURE__ */ b.jsx("span", { children: "To" }),
              /* @__PURE__ */ b.jsx(
                "select",
                {
                  "aria-label": "Transition target",
                  className: "fub-input",
                  value: D.to ?? "",
                  disabled: O,
                  onChange: (N) => g(l.transitionIndex, "to", N.target.value),
                  children: i.states.map((N, k) => /* @__PURE__ */ b.jsx("option", { value: N.name, children: N.name }, `${N.name}-target-${k}`))
                }
              )
            ] }) : /* @__PURE__ */ b.jsxs("label", { className: "fub-field", children: [
              /* @__PURE__ */ b.jsx("span", { children: "Resolver" }),
              /* @__PURE__ */ b.jsx(
                "input",
                {
                  "aria-label": "Dynamic resolver",
                  className: "fub-input",
                  value: D.dynamic_to?.resolver ?? "",
                  readOnly: O,
                  onChange: (N) => g(l.transitionIndex, "dynamic_to.resolver", N.target.value)
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
                      onClick: () => y(l.transitionIndex, "step"),
                      disabled: O,
                      children: "+ Step"
                    }
                  ),
                  /* @__PURE__ */ b.jsx(
                    "button",
                    {
                      type: "button",
                      className: "fub-mini-btn",
                      onClick: () => y(l.transitionIndex, "when"),
                      disabled: O,
                      children: "+ When"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ b.jsx("ul", { children: D.workflow.nodes.map((N, k) => /* @__PURE__ */ b.jsx("li", { children: /* @__PURE__ */ b.jsxs(
                "button",
                {
                  type: "button",
                  className: "fub-list-item",
                  onClick: () => v(l.transitionIndex, k),
                  children: [
                    /* @__PURE__ */ b.jsx("span", { children: ZT(N) }),
                    Ys(N.kind) ? null : /* @__PURE__ */ b.jsx("span", { className: "fub-item-meta", children: "unsupported" })
                  ]
                }
              ) }, N.id || `${N.kind}-${k}`)) })
            ] }),
            /* @__PURE__ */ b.jsx(vn, { messages: Zn(C) })
          ] })
        ]
      }
    );
  }
  if (l.kind === "workflow-node") {
    const D = i.transitions[l.transitionIndex], E = D?.workflow.nodes?.[l.nodeIndex];
    if (!D || !E)
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
            /* @__PURE__ */ b.jsx("div", { className: "fub-panel-header", id: "fub-panel-inspector-heading", children: /* @__PURE__ */ b.jsx("strong", { children: "Inspector" }) }),
            /* @__PURE__ */ b.jsx("div", { className: "fub-panel-body", children: "Workflow node not found." })
          ]
        }
      );
    if (!Ys(E.kind))
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
            /* @__PURE__ */ b.jsx("div", { className: "fub-panel-header", id: "fub-panel-inspector-heading", children: /* @__PURE__ */ b.jsx("strong", { children: "Workflow Node" }) }),
            /* @__PURE__ */ b.jsxs("div", { className: "fub-panel-body", children: [
              /* @__PURE__ */ b.jsxs("p", { className: "fub-guardrail", children: [
                "Node kind ",
                /* @__PURE__ */ b.jsx("code", { children: E.kind }),
                " is unsupported in builder v1 and is read-only."
              ] }),
              /* @__PURE__ */ b.jsxs("p", { className: "fub-muted", children: [
                "Unsupported kinds: ",
                hy.join(", ")
              ] }),
              /* @__PURE__ */ b.jsx(vn, { messages: Zn(C) })
            ] })
          ]
        }
      );
    const N = `fub-action-catalog-${l.transitionIndex}-${l.nodeIndex}`;
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
            /* @__PURE__ */ b.jsx("strong", { children: "Workflow Node" }),
            /* @__PURE__ */ b.jsx(
              "button",
              {
                type: "button",
                className: "fub-mini-btn danger",
                onClick: () => p(l.transitionIndex, l.nodeIndex),
                disabled: O,
                children: "Delete"
              }
            )
          ] }),
          /* @__PURE__ */ b.jsxs("div", { className: "fub-panel-body", children: [
            O ? /* @__PURE__ */ b.jsx("p", { className: "fub-readonly-note", children: "Read-only mode: editing is disabled in narrow/mobile layout." }) : null,
            /* @__PURE__ */ b.jsxs("div", { className: "fub-muted", children: [
              "Kind: ",
              E.kind
            ] }),
            E.kind === "step" ? /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
              /* @__PURE__ */ b.jsxs("label", { className: "fub-field", children: [
                /* @__PURE__ */ b.jsx("span", { children: "Action ID" }),
                /* @__PURE__ */ b.jsx(
                  "input",
                  {
                    "aria-label": "Workflow action id",
                    className: "fub-input",
                    list: j.actions.length > 0 ? N : void 0,
                    value: E.step?.action_id ?? "",
                    readOnly: O,
                    onChange: (k) => x(l.transitionIndex, l.nodeIndex, "action_id", k.target.value)
                  }
                ),
                j.actions.length > 0 ? /* @__PURE__ */ b.jsx("datalist", { id: N, children: j.actions.map((k) => /* @__PURE__ */ b.jsx("option", { value: k.id, children: k.label ?? k.id }, k.id)) }) : null,
                j.unavailableReason ? /* @__PURE__ */ b.jsx("p", { className: "fub-muted", children: j.unavailableReason }) : null,
                /* @__PURE__ */ b.jsx(
                  vn,
                  {
                    messages: Zn(
                      ys(r, l, "action_id")
                    )
                  }
                )
              ] }),
              /* @__PURE__ */ b.jsxs("label", { className: "fub-checkbox-row", children: [
                /* @__PURE__ */ b.jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: !!E.step?.async,
                    disabled: O,
                    onChange: (k) => x(l.transitionIndex, l.nodeIndex, "async", k.target.checked)
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
                    value: E.step?.delay ?? "",
                    readOnly: O,
                    onChange: (k) => x(l.transitionIndex, l.nodeIndex, "delay", k.target.value)
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
                    value: E.step?.timeout ?? "",
                    readOnly: O,
                    onChange: (k) => x(l.transitionIndex, l.nodeIndex, "timeout", k.target.value)
                  }
                )
              ] }),
              /* @__PURE__ */ b.jsx(
                JT,
                {
                  metadata: E.step?.metadata,
                  readOnly: O,
                  onCommit: (k) => S(l.transitionIndex, l.nodeIndex, k)
                }
              )
            ] }) : /* @__PURE__ */ b.jsxs("label", { className: "fub-field", children: [
              /* @__PURE__ */ b.jsx("span", { children: "When expression" }),
              /* @__PURE__ */ b.jsx(
                "input",
                {
                  "aria-label": "Workflow when expression",
                  className: "fub-input",
                  value: E.expr ?? "",
                  readOnly: O,
                  onChange: (k) => x(l.transitionIndex, l.nodeIndex, "expr", k.target.value)
                }
              ),
              /* @__PURE__ */ b.jsx(
                vn,
                {
                  messages: Zn(
                    ys(r, l, "expr")
                  )
                }
              )
            ] }),
            /* @__PURE__ */ b.jsx(vn, { messages: Zn(C) })
          ] })
        ]
      }
    );
  }
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
        /* @__PURE__ */ b.jsx("div", { className: "fub-panel-header", id: "fub-panel-inspector-heading", children: /* @__PURE__ */ b.jsx("strong", { children: "Inspector" }) }),
        /* @__PURE__ */ b.jsxs("div", { className: "fub-panel-body", children: [
          /* @__PURE__ */ b.jsx("p", { children: "Select a state, transition, or workflow node to edit properties." }),
          /* @__PURE__ */ b.jsx(vn, { messages: Zn(C) })
        ] })
      ]
    }
  );
}
const FT = [
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
function PT(n, i) {
  if (n.key !== "Tab")
    return;
  const l = Array.from(
    i.querySelectorAll(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
    )
  ).filter((f) => !f.hasAttribute("disabled"));
  if (l.length === 0)
    return;
  const r = l[0], s = l[l.length - 1], c = document.activeElement;
  if (!n.shiftKey && c === s) {
    n.preventDefault(), r.focus();
    return;
  }
  n.shiftKey && c === r && (n.preventDefault(), s.focus());
}
function ay(n) {
  const i = ee.useRef(null), l = ee.useRef(null), r = ee.useMemo(() => FT, []);
  return ee.useEffect(() => {
    if (!n.open)
      return;
    l.current?.focus();
    const s = (c) => {
      if (i.current) {
        if (c.key === "Escape") {
          c.preventDefault(), n.onClose();
          return;
        }
        PT(c, i.current);
      }
    };
    return window.addEventListener("keydown", s), () => {
      window.removeEventListener("keydown", s);
    };
  }, [n.onClose, n.open]), n.open ? /* @__PURE__ */ b.jsx("div", { className: "fub-modal-overlay", role: "presentation", onClick: n.onClose, children: /* @__PURE__ */ b.jsxs(
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
              ref: l,
              type: "button",
              className: "fub-mini-btn",
              onClick: n.onClose,
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
function ej(n) {
  return n === "explorer" ? "fub-panel-explorer" : n === "canvas" ? "fub-panel-canvas" : n === "inspector" ? "fub-panel-inspector" : "fub-panel-console";
}
function iy(n) {
  return `fub-mobile-tab-${n}`;
}
function oy(n) {
  return `fub-mobile-tabpanel-${n}`;
}
function tj(n) {
  const i = Be((G) => G.explorerWidth), l = Be((G) => G.inspectorWidth), r = Be((G) => G.consoleHeight), s = Be((G) => G.explorerCollapsed), c = Be((G) => G.inspectorCollapsed), f = Be((G) => G.consoleCollapsed), h = Be((G) => G.mobilePanel), g = Be((G) => G.keyboardHelpOpen), m = Be((G) => G.togglePanel), y = Be((G) => G.setPanelCollapsed), p = Be((G) => G.setMobilePanel), v = Be((G) => G.setKeyboardHelpOpen), x = Be((G) => G.toggleKeyboardHelp), S = Be((G) => G.theme), C = be((G) => G.document.definition), j = be((G) => G.diagnostics), O = Ft((G) => G.log), D = Ft((G) => G.errors), E = Ft((G) => G.projectedOutcome), N = ee.useMemo(() => U1(C), [C]), k = Nw(), U = k === "mobile-readonly", V = Vf("explorer"), X = Vf("inspector"), te = Vf("console"), K = ee.useCallback((G) => {
    G && G();
  }, []), Y = ee.useCallback((G) => {
    const H = () => {
      document.getElementById(ej(G))?.focus();
    };
    if (typeof window.requestAnimationFrame == "function") {
      window.requestAnimationFrame(H);
      return;
    }
    window.setTimeout(H, 0);
  }, []), Z = ee.useCallback(
    (G) => {
      k === "mobile-readonly" ? p(G) : (G === "explorer" && y("explorer", !1), G === "inspector" && y("inspector", !1), G === "console" && y("console", !1)), Y(G);
    },
    [Y, p, y, k]
  ), J = ee.useCallback(
    (G) => {
      k === "mobile-readonly" ? p(G) : m(G), Y(G);
    },
    [Y, p, m, k]
  ), M = ee.useCallback(() => {
    if (k === "mobile-readonly") {
      p("console");
      return;
    }
    m("console");
  }, [p, m, k]), L = ee.useCallback(() => {
    v(!1);
  }, [v]);
  Ew({
    onSave: () => K(n.onSave),
    onValidate: () => K(n.onValidate),
    onFocusPanel: Z,
    onToggleConsole: M,
    keyboardHelpOpen: g,
    onToggleKeyboardHelp: x,
    onCloseKeyboardHelp: L,
    readOnly: U
  }), ee.useEffect(() => {
    k === "compact" && y("explorer", !0);
  }, [y, k]);
  const _ = ee.useMemo(() => {
    const G = s ? "0px" : `${i}px`, H = c ? "0px" : `${l}px`;
    return `${G} ${s ? "0px" : "6px"} minmax(420px,1fr) ${c ? "0px" : "6px"} ${H}`;
  }, [s, i, c, l]), z = ee.useMemo(() => {
    const G = N.length > 0 ? "32px" : "0px", H = f ? "0px" : `min(${r}px, 40vh)`;
    return `48px ${G} minmax(280px,1fr) ${f ? "0px" : "6px"} ${H}`;
  }, [f, r, N.length]), B = ee.useMemo(() => j.length === 0 ? "No diagnostics." : j.length === 1 ? "1 diagnostic in problems panel." : `${j.length} diagnostics in problems panel.`, [j.length]), $ = ee.useMemo(() => {
    const G = D.at(-1);
    return G ? `Simulation error ${G.code}: ${G.message}` : E ? `Projected ${E.event}: ${E.previousState} to ${E.currentState}.` : O.at(-1)?.message ?? "Simulation idle.";
  }, [E, D, O]);
  if (k === "mobile-readonly")
    return /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
      /* @__PURE__ */ b.jsxs("div", { className: "fub-root fub-root-mobile", "data-theme": S, children: [
        /* @__PURE__ */ b.jsx("div", { className: "fub-slot-header", children: /* @__PURE__ */ b.jsx(ty, { ...n, readOnly: !0, onPanelToggle: J }) }),
        N.length > 0 ? /* @__PURE__ */ b.jsxs("div", { className: "fub-guardrail-banner", role: "status", "aria-live": "polite", children: [
          "Unsupported workflow nodes are read-only: ",
          N.join(", ")
        ] }) : null,
        /* @__PURE__ */ b.jsx("div", { className: "fub-mobile-warning", role: "status", "aria-live": "polite", children: "Narrow/mobile mode is reduced-capability and read-only. Use desktop width for full authoring." }),
        /* @__PURE__ */ b.jsx("nav", { className: "fub-mobile-tabs", role: "tablist", "aria-label": "Builder panels", children: ["explorer", "canvas", "inspector", "console"].map((G) => /* @__PURE__ */ b.jsx(
          "button",
          {
            type: "button",
            role: "tab",
            id: iy(G),
            "aria-controls": oy(G),
            "aria-selected": h === G,
            tabIndex: h === G ? 0 : -1,
            className: `fub-mobile-tab${h === G ? " is-active" : ""}`,
            onClick: () => p(G),
            children: G
          },
          G
        )) }),
        /* @__PURE__ */ b.jsxs(
          "div",
          {
            className: "fub-mobile-panel",
            role: "tabpanel",
            id: oy(h),
            "aria-labelledby": iy(h),
            children: [
              h === "explorer" ? /* @__PURE__ */ b.jsx(P0, { readOnly: !0 }) : null,
              h === "canvas" ? /* @__PURE__ */ b.jsx(K0, { readOnly: !0 }) : null,
              h === "inspector" ? /* @__PURE__ */ b.jsx(ny, { actionCatalogProvider: n.actionCatalogProvider, readOnly: !0 }) : null,
              h === "console" ? /* @__PURE__ */ b.jsx(J0, {}) : null
            ]
          }
        ),
        /* @__PURE__ */ b.jsx("div", { className: "fub-sr-only", role: "status", "aria-live": "polite", "aria-atomic": "true", children: B }),
        /* @__PURE__ */ b.jsx("div", { className: "fub-sr-only", role: "status", "aria-live": "polite", "aria-atomic": "true", children: $ })
      ] }),
      /* @__PURE__ */ b.jsx(ay, { open: g, onClose: L })
    ] });
  const F = (N.length > 0, 3), A = (N.length > 0, 4), I = (N.length > 0, 5);
  return /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
    /* @__PURE__ */ b.jsxs("div", { className: "fub-root", "data-theme": S, style: { gridTemplateColumns: _, gridTemplateRows: z }, children: [
      /* @__PURE__ */ b.jsx("div", { className: "fub-slot-header", style: { gridColumn: "1 / -1", gridRow: 1 }, children: /* @__PURE__ */ b.jsx(ty, { ...n, readOnly: !1, onPanelToggle: J }) }),
      N.length > 0 ? /* @__PURE__ */ b.jsxs("div", { className: "fub-guardrail-banner", style: { gridColumn: "1 / -1", gridRow: 2 }, role: "status", "aria-live": "polite", children: [
        "Unsupported workflow nodes are read-only: ",
        N.join(", ")
      ] }) : null,
      s ? null : /* @__PURE__ */ b.jsx("div", { style: { gridColumn: 1, gridRow: F, display: "flex", flexDirection: "column", overflow: "hidden" }, children: /* @__PURE__ */ b.jsx(P0, { readOnly: !1 }) }),
      s ? null : /* @__PURE__ */ b.jsx(
        "div",
        {
          className: "fub-resizer fub-resizer-vertical",
          role: "separator",
          "aria-label": "Resize explorer",
          onPointerDown: V,
          style: { gridColumn: 2, gridRow: F }
        }
      ),
      /* @__PURE__ */ b.jsx("div", { style: { gridColumn: 3, gridRow: F, display: "flex", flexDirection: "column", minWidth: 0, minHeight: 0, overflow: "hidden" }, children: /* @__PURE__ */ b.jsx(K0, { readOnly: !1 }) }),
      c ? null : /* @__PURE__ */ b.jsx(
        "div",
        {
          className: "fub-resizer fub-resizer-vertical",
          role: "separator",
          "aria-label": "Resize inspector",
          onPointerDown: X,
          style: { gridColumn: 4, gridRow: F }
        }
      ),
      c ? null : /* @__PURE__ */ b.jsx("div", { style: { gridColumn: 5, gridRow: F, display: "flex", flexDirection: "column", overflow: "hidden" }, children: /* @__PURE__ */ b.jsx(ny, { actionCatalogProvider: n.actionCatalogProvider, readOnly: !1 }) }),
      f ? null : /* @__PURE__ */ b.jsx(
        "div",
        {
          className: "fub-resizer fub-resizer-horizontal",
          role: "separator",
          "aria-label": "Resize console",
          onPointerDown: te,
          style: { gridColumn: "1 / -1", gridRow: A }
        }
      ),
      f ? null : /* @__PURE__ */ b.jsx("div", { className: "fub-slot-console", style: { gridColumn: "1 / -1", gridRow: I }, children: /* @__PURE__ */ b.jsx(J0, {}) }),
      /* @__PURE__ */ b.jsx("div", { className: "fub-sr-only", role: "status", "aria-live": "polite", "aria-atomic": "true", children: B }),
      /* @__PURE__ */ b.jsx("div", { className: "fub-sr-only", role: "status", "aria-live": "polite", "aria-atomic": "true", children: $ })
    ] }),
    /* @__PURE__ */ b.jsx(ay, { open: g, onClose: L })
  ] });
}
const nj = new Set(Object.values(za));
function td(n) {
  return typeof n == "string" && nj.has(n) ? n : za.internal;
}
function pl(n) {
  return typeof n == "string" && n.trim() !== "" ? n : "internal error";
}
function aj(n) {
  return n && typeof n == "object" && !Array.isArray(n) ? n : null;
}
function ij(n) {
  return n instanceof Error ? n : null;
}
function oj(n) {
  return n.code === -32601 ? !0 : n.message.toLowerCase().includes("method not found");
}
function lj(n) {
  return n.status === 404 || n.status === 405;
}
function rj(n) {
  const i = " Verify RPC endpoint and FSM method registration (for example `/api/rpc` with `fsm.*` methods).";
  return n.endsWith(i) ? n : `${n}${i}`;
}
function zs(n) {
  if (n instanceof dy)
    return {
      code: td(n.envelope.code),
      message: pl(n.envelope.message),
      method: n.method
    };
  if (n instanceof Vs)
    return oj(n) || lj(n) ? {
      code: za.internal,
      message: rj(pl(n.message)),
      method: n.method
    } : {
      code: td(n.code),
      message: pl(n.message),
      method: n.method
    };
  const i = aj(n);
  if (i)
    return {
      code: td(i.code),
      message: pl(i.message),
      method: typeof i.method == "string" ? i.method : void 0
    };
  const l = ij(n);
  return l ? {
    code: za.internal,
    message: pl(l.message)
  } : {
    code: za.internal,
    message: "internal error"
  };
}
function wj(n) {
  return `${n.method ? `${n.method}: ` : ""}[${n.code}] ${n.message}`;
}
function sj(n) {
  return {
    async applyEventDryRun(i, l) {
      const r = await Aa({
        client: n,
        method: Nl.applyEvent,
        data: i,
        meta: l
      });
      return vy(r);
    },
    async snapshot(i, l) {
      const r = await Aa({
        client: n,
        method: Nl.snapshot,
        data: i,
        meta: l
      });
      return by(r);
    }
  };
}
function uj(n) {
  return ee.useMemo(() => n ? sj(n) : null, [n]);
}
function nu(n) {
  return n !== null && typeof n == "object" && !Array.isArray(n);
}
function cj(n, i, l, r) {
  if (nu(i)) {
    const s = ["id", "name", "machineId", "event"];
    for (const c of s) {
      const f = i[c];
      if (!(typeof f != "string" || f.trim() === ""))
        for (let h = 0; h < n.length; h += 1) {
          if (r.has(h))
            continue;
          const g = n[h];
          if (nu(g) && g[c] === f)
            return r.add(h), g;
        }
    }
  }
  if (l < n.length)
    return r.add(l), n[l];
}
function bd(n, i) {
  if (Array.isArray(i)) {
    const l = Array.isArray(n) ? n : [], r = /* @__PURE__ */ new Set();
    return i.map((s, c) => bd(cj(l, s, c, r), s));
  }
  if (nu(i)) {
    const l = nu(n) ? n : {}, r = {};
    for (const [s, c] of Object.entries(l))
      r[s] = Re(c);
    for (const [s, c] of Object.entries(i))
      r[s] = bd(l[s], c);
    return r;
  }
  return Re(i);
}
function xd(n) {
  return Re(n);
}
function fj(n) {
  return bd(n.baseDocument, n.editedDocument);
}
function dj(n) {
  return `${n}-preview`;
}
function hj(n) {
  if (n.transitions.length === 0)
    return null;
  if (n.selection.kind === "transition") {
    const l = n.transitions[n.selection.transitionIndex];
    if (l)
      return {
        id: l.id,
        event: l.event,
        from: l.from
      };
  }
  if (n.selection.kind === "workflow-node") {
    const l = n.transitions[n.selection.transitionIndex];
    if (l)
      return {
        id: l.id,
        event: l.event,
        from: l.from
      };
  }
  const i = n.transitions[0];
  return {
    id: i.id,
    event: i.event,
    from: i.from
  };
}
function gj(n) {
  const i = be((T) => T.document), l = be((T) => T.diagnostics), r = be((T) => T.isDirty), s = be((T) => T.selection), c = be((T) => T.replaceDocument), f = be((T) => T.setDiagnostics), h = be((T) => T.markSaved), g = be((T) => T.applyRemoteSave), m = Ft((T) => T.setApplyEventWirePayload), y = Ft((T) => T.setSnapshotWirePayload), p = Ft((T) => T.pushError), v = Ft((T) => T.pushInfo), x = ee.useMemo(() => n.rpcClient || !n.rpcEndpoint || n.rpcEndpoint.trim() === "" ? null : j1({ endpoint: n.rpcEndpoint }), [n.rpcClient, n.rpcEndpoint]), S = n.rpcClient ?? x, C = uj(S ?? null), j = O1(S ?? null), O = n.runtimeRPC ?? C, D = n.authoringRPC ?? j, E = ee.useMemo(
    () => n.persistenceStore ?? ew(),
    [n.persistenceStore]
  ), N = ee.useMemo(
    () => n.exportAdapter ?? H1(),
    [n.exportAdapter]
  ), k = (n.machineId?.trim() || i.definition.id || "machine").trim(), U = n.simulationDefaults?.entityId ?? dj(k), V = n.simulationDefaults?.msg ?? {}, X = n.simulationDefaults?.meta, te = n.autosaveDebounceMs ?? 400, K = ee.useRef(null);
  K.current === null && (K.current = JSON.stringify(i));
  const Y = ee.useRef(xd(i)), [Z, J] = ee.useState(null), [M, L] = ee.useState({ state: "idle" }), _ = ee.useCallback(() => fj({
    baseDocument: Y.current,
    editedDocument: i
  }), [i]), z = ee.useCallback(
    (T) => {
      const q = zs(T);
      p({
        code: q.code,
        message: q.message,
        method: q.method
      });
    },
    [p]
  ), B = ee.useCallback((T, q) => {
    const Q = zs(q);
    L({
      state: "error",
      source: T,
      message: Q.message,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
  }, []);
  ee.useEffect(() => {
    n.onChange && n.onChange({
      document: i,
      diagnostics: l,
      isDirty: r
    });
  }, [l, i, r, n]), ee.useEffect(() => {
    let T = !1;
    return E.load(k).then((q) => {
      if (T)
        return;
      if (!q) {
        J(null);
        return;
      }
      const Q = K.current ?? "", P = JSON.stringify(q.document);
      J(P === Q ? null : q);
    }).catch((q) => {
      if (T)
        return;
      const Q = zs(q);
      p({
        code: Q.code,
        message: `autosave recovery failed: ${Q.message}`,
        method: Q.method
      });
    }), () => {
      T = !0;
    };
  }, [k, E, p]), ee.useEffect(() => {
    if (!r)
      return;
    const T = window.setTimeout(() => {
      L({
        state: "saving",
        source: "autosave",
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      });
      const q = _();
      E.save({
        machineId: k,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
        document: q
      }).then(() => {
        L({
          state: "saved",
          source: "autosave",
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        }), v("Autosaved draft to persistence store.");
      }).catch((Q) => {
        B("autosave", Q);
        const P = zs(Q);
        p({
          code: P.code,
          message: `autosave failed: ${P.message}`,
          method: P.method
        });
      });
    }, te);
    return () => {
      window.clearTimeout(T);
    };
  }, [
    te,
    _,
    r,
    k,
    B,
    E,
    p,
    v
  ]);
  const $ = ee.useCallback(async () => {
    if (!O) {
      p({
        code: za.internal,
        method: Nl.applyEvent,
        message: "runtime adapter unavailable"
      });
      return;
    }
    const T = hj({
      selection: s,
      transitions: i.definition.transitions
    });
    if (!T) {
      p({
        code: za.invalidTransition,
        method: Nl.applyEvent,
        message: "no transition available for simulation"
      });
      return;
    }
    if (T.event.trim() === "") {
      p({
        code: za.invalidTransition,
        method: Nl.applyEvent,
        message: "selected transition must define an event"
      });
      return;
    }
    try {
      const q = await O.applyEventDryRun(
        {
          machineId: k,
          entityId: U,
          event: T.event,
          msg: V,
          expectedState: T.from,
          dryRun: !0
        },
        X
      );
      m(q, {
        event: T.event,
        transitionId: T.id
      });
      const Q = await O.snapshot(
        {
          machineId: k,
          entityId: U,
          msg: V,
          evaluateGuards: !0,
          includeBlocked: !0
        },
        X
      );
      y(Q);
    } catch (q) {
      z(q);
    }
  }, [
    i.definition.transitions,
    z,
    k,
    p,
    O,
    s,
    m,
    y,
    U,
    V,
    X
  ]), F = ee.useCallback(async () => {
    const T = _();
    if (!D) {
      const q = py(T.definition);
      f(q), v("Authoring RPC unavailable. Used local validation only.");
      return;
    }
    try {
      const q = await D.validate({
        machineId: k,
        draft: T
      });
      f(q.diagnostics), v(`Validation completed. valid=${q.valid}`);
    } catch (q) {
      z(q);
    }
  }, [D, _, z, k, v, f]), A = ee.useCallback(async () => {
    L({
      state: "saving",
      source: "manual",
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
    const T = _();
    if (!D) {
      try {
        await E.save({
          machineId: k,
          updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
          document: Re(T)
        }), h(), Y.current = Re(T), J(null), L({
          state: "saved",
          source: "manual",
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        }), v("Saved locally (authoring RPC unavailable).");
      } catch (q) {
        B("manual", q), z(q);
      }
      return;
    }
    try {
      const q = await D.saveDraft({
        machineId: k,
        baseVersion: T.definition.version,
        draft: T,
        validate: !0
      });
      g(q.version, q.draftState, q.diagnostics);
      const Q = {
        ...Re(T),
        definition: {
          ...Re(T.definition),
          version: q.version
        },
        draft_state: Re(q.draftState)
      };
      Y.current = Re(Q), await E.save({
        machineId: k,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
        document: Q
      }), J(null), L({
        state: "saved",
        source: "manual",
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      }), v("Draft saved through authoring RPC.");
    } catch (q) {
      B("manual", q), z(q);
    }
  }, [
    g,
    D,
    _,
    z,
    B,
    k,
    h,
    E,
    v
  ]), I = ee.useCallback(async () => {
    if (!Z) {
      v("No autosaved draft to recover.");
      return;
    }
    const T = xd(Z.document);
    c(T), Y.current = Re(T), J(null), v("Recovered autosaved draft.");
  }, [v, Z, c]), G = ee.useCallback(async () => {
    try {
      await N.exportJSON({
        machineId: k,
        draft: _()
      }), v("Exported machine definition as JSON.");
    } catch (T) {
      z(T);
    }
  }, [_, N, z, k, v]), H = ee.useCallback(async () => {
    if (!N.exportRPC) {
      v("RPC export unavailable. Configure ExportAdapter.exportRPC to enable this capability.");
      return;
    }
    try {
      await N.exportRPC({
        machineId: k,
        draft: _()
      }), v("Exported machine definition through RPC adapter.");
    } catch (T) {
      z(T);
    }
  }, [_, N, z, k, v]);
  return /* @__PURE__ */ b.jsx(
    tj,
    {
      onSave: A,
      onValidate: F,
      onSimulate: $,
      onRecoverDraft: I,
      onExportJSON: G,
      onExportRPC: H,
      runtimeAvailable: !!O,
      authoringAvailable: !!D,
      recoveryAvailable: !!Z,
      rpcExportAvailable: B1(N),
      actionCatalogProvider: n.actionCatalogProvider,
      saveStatus: M
    }
  );
}
function mj(n) {
  const i = ee.useMemo(
    () => xd(X1(n.initialDocument)),
    [n.initialDocument]
  );
  return /* @__PURE__ */ b.jsx(
    ww,
    {
      initialDocument: i,
      initialDiagnostics: n.initialDiagnostics,
      children: /* @__PURE__ */ b.jsx(gj, { ...n })
    }
  );
}
var nd = { exports: {} }, yl = {}, ad = { exports: {} }, id = {};
var ly;
function pj() {
  return ly || (ly = 1, (function(n) {
    function i(_, z) {
      var B = _.length;
      _.push(z);
      e: for (; 0 < B; ) {
        var $ = B - 1 >>> 1, F = _[$];
        if (0 < s(F, z))
          _[$] = z, _[B] = F, B = $;
        else break e;
      }
    }
    function l(_) {
      return _.length === 0 ? null : _[0];
    }
    function r(_) {
      if (_.length === 0) return null;
      var z = _[0], B = _.pop();
      if (B !== z) {
        _[0] = B;
        e: for (var $ = 0, F = _.length, A = F >>> 1; $ < A; ) {
          var I = 2 * ($ + 1) - 1, G = _[I], H = I + 1, T = _[H];
          if (0 > s(G, B))
            H < F && 0 > s(T, G) ? (_[$] = T, _[H] = B, $ = H) : (_[$] = G, _[I] = B, $ = I);
          else if (H < F && 0 > s(T, B))
            _[$] = T, _[H] = B, $ = H;
          else break e;
        }
      }
      return z;
    }
    function s(_, z) {
      var B = _.sortIndex - z.sortIndex;
      return B !== 0 ? B : _.id - z.id;
    }
    if (n.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var c = performance;
      n.unstable_now = function() {
        return c.now();
      };
    } else {
      var f = Date, h = f.now();
      n.unstable_now = function() {
        return f.now() - h;
      };
    }
    var g = [], m = [], y = 1, p = null, v = 3, x = !1, S = !1, C = !1, j = !1, O = typeof setTimeout == "function" ? setTimeout : null, D = typeof clearTimeout == "function" ? clearTimeout : null, E = typeof setImmediate < "u" ? setImmediate : null;
    function N(_) {
      for (var z = l(m); z !== null; ) {
        if (z.callback === null) r(m);
        else if (z.startTime <= _)
          r(m), z.sortIndex = z.expirationTime, i(g, z);
        else break;
        z = l(m);
      }
    }
    function k(_) {
      if (C = !1, N(_), !S)
        if (l(g) !== null)
          S = !0, U || (U = !0, Z());
        else {
          var z = l(m);
          z !== null && L(k, z.startTime - _);
        }
    }
    var U = !1, V = -1, X = 5, te = -1;
    function K() {
      return j ? !0 : !(n.unstable_now() - te < X);
    }
    function Y() {
      if (j = !1, U) {
        var _ = n.unstable_now();
        te = _;
        var z = !0;
        try {
          e: {
            S = !1, C && (C = !1, D(V), V = -1), x = !0;
            var B = v;
            try {
              t: {
                for (N(_), p = l(g); p !== null && !(p.expirationTime > _ && K()); ) {
                  var $ = p.callback;
                  if (typeof $ == "function") {
                    p.callback = null, v = p.priorityLevel;
                    var F = $(
                      p.expirationTime <= _
                    );
                    if (_ = n.unstable_now(), typeof F == "function") {
                      p.callback = F, N(_), z = !0;
                      break t;
                    }
                    p === l(g) && r(g), N(_);
                  } else r(g);
                  p = l(g);
                }
                if (p !== null) z = !0;
                else {
                  var A = l(m);
                  A !== null && L(
                    k,
                    A.startTime - _
                  ), z = !1;
                }
              }
              break e;
            } finally {
              p = null, v = B, x = !1;
            }
            z = void 0;
          }
        } finally {
          z ? Z() : U = !1;
        }
      }
    }
    var Z;
    if (typeof E == "function")
      Z = function() {
        E(Y);
      };
    else if (typeof MessageChannel < "u") {
      var J = new MessageChannel(), M = J.port2;
      J.port1.onmessage = Y, Z = function() {
        M.postMessage(null);
      };
    } else
      Z = function() {
        O(Y, 0);
      };
    function L(_, z) {
      V = O(function() {
        _(n.unstable_now());
      }, z);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(_) {
      _.callback = null;
    }, n.unstable_forceFrameRate = function(_) {
      0 > _ || 125 < _ ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : X = 0 < _ ? Math.floor(1e3 / _) : 5;
    }, n.unstable_getCurrentPriorityLevel = function() {
      return v;
    }, n.unstable_next = function(_) {
      switch (v) {
        case 1:
        case 2:
        case 3:
          var z = 3;
          break;
        default:
          z = v;
      }
      var B = v;
      v = z;
      try {
        return _();
      } finally {
        v = B;
      }
    }, n.unstable_requestPaint = function() {
      j = !0;
    }, n.unstable_runWithPriority = function(_, z) {
      switch (_) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          _ = 3;
      }
      var B = v;
      v = _;
      try {
        return z();
      } finally {
        v = B;
      }
    }, n.unstable_scheduleCallback = function(_, z, B) {
      var $ = n.unstable_now();
      switch (typeof B == "object" && B !== null ? (B = B.delay, B = typeof B == "number" && 0 < B ? $ + B : $) : B = $, _) {
        case 1:
          var F = -1;
          break;
        case 2:
          F = 250;
          break;
        case 5:
          F = 1073741823;
          break;
        case 4:
          F = 1e4;
          break;
        default:
          F = 5e3;
      }
      return F = B + F, _ = {
        id: y++,
        callback: z,
        priorityLevel: _,
        startTime: B,
        expirationTime: F,
        sortIndex: -1
      }, B > $ ? (_.sortIndex = B, i(m, _), l(g) === null && _ === l(m) && (C ? (D(V), V = -1) : C = !0, L(k, B - $))) : (_.sortIndex = F, i(g, _), S || x || (S = !0, U || (U = !0, Z()))), _;
    }, n.unstable_shouldYield = K, n.unstable_wrapCallback = function(_) {
      var z = v;
      return function() {
        var B = v;
        v = z;
        try {
          return _.apply(this, arguments);
        } finally {
          v = B;
        }
      };
    };
  })(id)), id;
}
var ry;
function yj() {
  return ry || (ry = 1, ad.exports = pj()), ad.exports;
}
var sy;
function vj() {
  if (sy) return yl;
  sy = 1;
  var n = yj(), i = Ul(), l = Av();
  function r(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++)
        t += "&args[]=" + encodeURIComponent(arguments[a]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function s(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function c(e) {
    var t = e, a = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (a = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? a : null;
  }
  function f(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function h(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function g(e) {
    if (c(e) !== e)
      throw Error(r(188));
  }
  function m(e) {
    var t = e.alternate;
    if (!t) {
      if (t = c(e), t === null) throw Error(r(188));
      return t !== e ? null : e;
    }
    for (var a = e, o = t; ; ) {
      var u = a.return;
      if (u === null) break;
      var d = u.alternate;
      if (d === null) {
        if (o = u.return, o !== null) {
          a = o;
          continue;
        }
        break;
      }
      if (u.child === d.child) {
        for (d = u.child; d; ) {
          if (d === a) return g(u), e;
          if (d === o) return g(u), t;
          d = d.sibling;
        }
        throw Error(r(188));
      }
      if (a.return !== o.return) a = u, o = d;
      else {
        for (var w = !1, R = u.child; R; ) {
          if (R === a) {
            w = !0, a = u, o = d;
            break;
          }
          if (R === o) {
            w = !0, o = u, a = d;
            break;
          }
          R = R.sibling;
        }
        if (!w) {
          for (R = d.child; R; ) {
            if (R === a) {
              w = !0, a = d, o = u;
              break;
            }
            if (R === o) {
              w = !0, o = d, a = u;
              break;
            }
            R = R.sibling;
          }
          if (!w) throw Error(r(189));
        }
      }
      if (a.alternate !== o) throw Error(r(190));
    }
    if (a.tag !== 3) throw Error(r(188));
    return a.stateNode.current === a ? e : t;
  }
  function y(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = y(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var p = Object.assign, v = /* @__PURE__ */ Symbol.for("react.element"), x = /* @__PURE__ */ Symbol.for("react.transitional.element"), S = /* @__PURE__ */ Symbol.for("react.portal"), C = /* @__PURE__ */ Symbol.for("react.fragment"), j = /* @__PURE__ */ Symbol.for("react.strict_mode"), O = /* @__PURE__ */ Symbol.for("react.profiler"), D = /* @__PURE__ */ Symbol.for("react.consumer"), E = /* @__PURE__ */ Symbol.for("react.context"), N = /* @__PURE__ */ Symbol.for("react.forward_ref"), k = /* @__PURE__ */ Symbol.for("react.suspense"), U = /* @__PURE__ */ Symbol.for("react.suspense_list"), V = /* @__PURE__ */ Symbol.for("react.memo"), X = /* @__PURE__ */ Symbol.for("react.lazy"), te = /* @__PURE__ */ Symbol.for("react.activity"), K = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), Y = Symbol.iterator;
  function Z(e) {
    return e === null || typeof e != "object" ? null : (e = Y && e[Y] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var J = /* @__PURE__ */ Symbol.for("react.client.reference");
  function M(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === J ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case C:
        return "Fragment";
      case O:
        return "Profiler";
      case j:
        return "StrictMode";
      case k:
        return "Suspense";
      case U:
        return "SuspenseList";
      case te:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case S:
          return "Portal";
        case E:
          return e.displayName || "Context";
        case D:
          return (e._context.displayName || "Context") + ".Consumer";
        case N:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case V:
          return t = e.displayName || null, t !== null ? t : M(e.type) || "Memo";
        case X:
          t = e._payload, e = e._init;
          try {
            return M(e(t));
          } catch {
          }
      }
    return null;
  }
  var L = Array.isArray, _ = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, z = l.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, B = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, $ = [], F = -1;
  function A(e) {
    return { current: e };
  }
  function I(e) {
    0 > F || (e.current = $[F], $[F] = null, F--);
  }
  function G(e, t) {
    F++, $[F] = e.current, e.current = t;
  }
  var H = A(null), T = A(null), q = A(null), Q = A(null);
  function P(e, t) {
    switch (G(q, t), G(T, e), G(H, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Zm(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = Zm(t), e = Qm(t, e);
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
    I(H), G(H, e);
  }
  function ie() {
    I(H), I(T), I(q);
  }
  function de(e) {
    e.memoizedState !== null && G(Q, e);
    var t = H.current, a = Qm(t, e.type);
    t !== a && (G(T, e), G(H, a));
  }
  function he(e) {
    T.current === e && (I(H), I(T)), Q.current === e && (I(Q), ul._currentValue = B);
  }
  var ge, xe;
  function Se(e) {
    if (ge === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        ge = t && t[1] || "", xe = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + ge + e + xe;
  }
  var _e = !1;
  function De(e, t) {
    if (!e || _e) return "";
    _e = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var o = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var fe = function() {
                throw Error();
              };
              if (Object.defineProperty(fe.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(fe, []);
                } catch (se) {
                  var re = se;
                }
                Reflect.construct(e, [], fe);
              } else {
                try {
                  fe.call();
                } catch (se) {
                  re = se;
                }
                e.call(fe.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (se) {
                re = se;
              }
              (fe = e()) && typeof fe.catch == "function" && fe.catch(function() {
              });
            }
          } catch (se) {
            if (se && re && typeof se.stack == "string")
              return [se.stack, re.stack];
          }
          return [null, null];
        }
      };
      o.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        o.DetermineComponentFrameRoot,
        "name"
      );
      u && u.configurable && Object.defineProperty(
        o.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var d = o.DetermineComponentFrameRoot(), w = d[0], R = d[1];
      if (w && R) {
        var W = w.split(`
`), le = R.split(`
`);
        for (u = o = 0; o < W.length && !W[o].includes("DetermineComponentFrameRoot"); )
          o++;
        for (; u < le.length && !le[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (o === W.length || u === le.length)
          for (o = W.length - 1, u = le.length - 1; 1 <= o && 0 <= u && W[o] !== le[u]; )
            u--;
        for (; 1 <= o && 0 <= u; o--, u--)
          if (W[o] !== le[u]) {
            if (o !== 1 || u !== 1)
              do
                if (o--, u--, 0 > u || W[o] !== le[u]) {
                  var ue = `
` + W[o].replace(" at new ", " at ");
                  return e.displayName && ue.includes("<anonymous>") && (ue = ue.replace("<anonymous>", e.displayName)), ue;
                }
              while (1 <= o && 0 <= u);
            break;
          }
      }
    } finally {
      _e = !1, Error.prepareStackTrace = a;
    }
    return (a = e ? e.displayName || e.name : "") ? Se(a) : "";
  }
  function Pe(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Se(e.type);
      case 16:
        return Se("Lazy");
      case 13:
        return e.child !== t && t !== null ? Se("Suspense Fallback") : Se("Suspense");
      case 19:
        return Se("SuspenseList");
      case 0:
      case 15:
        return De(e.type, !1);
      case 11:
        return De(e.type.render, !1);
      case 1:
        return De(e.type, !0);
      case 31:
        return Se("Activity");
      default:
        return "";
    }
  }
  function Et(e) {
    try {
      var t = "", a = null;
      do
        t += Pe(e, a), a = e, e = e.return;
      while (e);
      return t;
    } catch (o) {
      return `
Error generating stack: ` + o.message + `
` + o.stack;
    }
  }
  var zt = Object.prototype.hasOwnProperty, en = n.unstable_scheduleCallback, En = n.unstable_cancelCallback, Ra = n.unstable_shouldYield, ka = n.unstable_requestPaint, ht = n.unstable_now, pi = n.unstable_getCurrentPriorityLevel, _n = n.unstable_ImmediatePriority, Pn = n.unstable_UserBlockingPriority, Ha = n.unstable_NormalPriority, pu = n.unstable_LowPriority, yi = n.unstable_IdlePriority, yu = n.log, vu = n.unstable_setDisableYieldValue, Ba = null, xt = null;
  function dn(e) {
    if (typeof yu == "function" && vu(e), xt && typeof xt.setStrictMode == "function")
      try {
        xt.setStrictMode(Ba, e);
      } catch {
      }
  }
  var wt = Math.clz32 ? Math.clz32 : wu, bu = Math.log, xu = Math.LN2;
  function wu(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (bu(e) / xu | 0) | 0;
  }
  var vi = 256, bi = 262144, xi = 4194304;
  function Nn(e) {
    var t = e & 42;
    if (t !== 0) return t;
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
  function wi(e, t, a) {
    var o = e.pendingLanes;
    if (o === 0) return 0;
    var u = 0, d = e.suspendedLanes, w = e.pingedLanes;
    e = e.warmLanes;
    var R = o & 134217727;
    return R !== 0 ? (o = R & ~d, o !== 0 ? u = Nn(o) : (w &= R, w !== 0 ? u = Nn(w) : a || (a = R & ~e, a !== 0 && (u = Nn(a))))) : (R = o & ~d, R !== 0 ? u = Nn(R) : w !== 0 ? u = Nn(w) : a || (a = o & ~e, a !== 0 && (u = Nn(a)))), u === 0 ? 0 : t !== 0 && t !== u && (t & d) === 0 && (d = u & -u, a = t & -t, d >= a || d === 32 && (a & 4194048) !== 0) ? t : u;
  }
  function La(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Su(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
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
        return t + 5e3;
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
  function Ql() {
    var e = xi;
    return xi <<= 1, (xi & 62914560) === 0 && (xi = 4194304), e;
  }
  function xo(e) {
    for (var t = [], a = 0; 31 > a; a++) t.push(e);
    return t;
  }
  function Ua(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Eu(e, t, a, o, u, d) {
    var w = e.pendingLanes;
    e.pendingLanes = a, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= a, e.entangledLanes &= a, e.errorRecoveryDisabledLanes &= a, e.shellSuspendCounter = 0;
    var R = e.entanglements, W = e.expirationTimes, le = e.hiddenUpdates;
    for (a = w & ~a; 0 < a; ) {
      var ue = 31 - wt(a), fe = 1 << ue;
      R[ue] = 0, W[ue] = -1;
      var re = le[ue];
      if (re !== null)
        for (le[ue] = null, ue = 0; ue < re.length; ue++) {
          var se = re[ue];
          se !== null && (se.lane &= -536870913);
        }
      a &= ~fe;
    }
    o !== 0 && Kl(e, o, 0), d !== 0 && u === 0 && e.tag !== 0 && (e.suspendedLanes |= d & ~(w & ~t));
  }
  function Kl(e, t, a) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var o = 31 - wt(t);
    e.entangledLanes |= t, e.entanglements[o] = e.entanglements[o] | 1073741824 | a & 261930;
  }
  function Jl(e, t) {
    var a = e.entangledLanes |= t;
    for (e = e.entanglements; a; ) {
      var o = 31 - wt(a), u = 1 << o;
      u & t | e[o] & t && (e[o] |= t), a &= ~u;
    }
  }
  function Wl(e, t) {
    var a = t & -t;
    return a = (a & 42) !== 0 ? 1 : wo(a), (a & (e.suspendedLanes | t)) !== 0 ? 0 : a;
  }
  function wo(e) {
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
  function So(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Fl() {
    var e = z.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : yp(e.type));
  }
  function Pl(e, t) {
    var a = z.p;
    try {
      return z.p = e, t();
    } finally {
      z.p = a;
    }
  }
  var hn = Math.random().toString(36).slice(2), ct = "__reactFiber$" + hn, vt = "__reactProps$" + hn, Cn = "__reactContainer$" + hn, Si = "__reactEvents$" + hn, er = "__reactListeners$" + hn, _u = "__reactHandles$" + hn, tr = "__reactResources$" + hn, Va = "__reactMarker$" + hn;
  function Eo(e) {
    delete e[ct], delete e[vt], delete e[Si], delete e[er], delete e[_u];
  }
  function ea(e) {
    var t = e[ct];
    if (t) return t;
    for (var a = e.parentNode; a; ) {
      if (t = a[Cn] || a[ct]) {
        if (a = t.alternate, t.child !== null || a !== null && a.child !== null)
          for (e = tp(e); e !== null; ) {
            if (a = e[ct]) return a;
            e = tp(e);
          }
        return t;
      }
      e = a, a = e.parentNode;
    }
    return null;
  }
  function ta(e) {
    if (e = e[ct] || e[Cn]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function na(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(r(33));
  }
  function aa(e) {
    var t = e[tr];
    return t || (t = e[tr] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function at(e) {
    e[Va] = !0;
  }
  var nr = /* @__PURE__ */ new Set(), ar = {};
  function Mn(e, t) {
    ia(e, t), ia(e + "Capture", t);
  }
  function ia(e, t) {
    for (ar[e] = t, e = 0; e < t.length; e++)
      nr.add(t[e]);
  }
  var Nu = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), _o = {}, ir = {};
  function Cu(e) {
    return zt.call(ir, e) ? !0 : zt.call(_o, e) ? !1 : Nu.test(e) ? ir[e] = !0 : (_o[e] = !0, !1);
  }
  function Ei(e, t, a) {
    if (Cu(t))
      if (a === null) e.removeAttribute(t);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var o = t.toLowerCase().slice(0, 5);
            if (o !== "data-" && o !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + a);
      }
  }
  function _i(e, t, a) {
    if (a === null) e.removeAttribute(t);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + a);
    }
  }
  function tn(e, t, a, o) {
    if (o === null) e.removeAttribute(a);
    else {
      switch (typeof o) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(a);
          return;
      }
      e.setAttributeNS(t, a, "" + o);
    }
  }
  function _t(e) {
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
  function or(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Mu(e, t, a) {
    var o = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof o < "u" && typeof o.get == "function" && typeof o.set == "function") {
      var u = o.get, d = o.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return u.call(this);
        },
        set: function(w) {
          a = "" + w, d.call(this, w);
        }
      }), Object.defineProperty(e, t, {
        enumerable: o.enumerable
      }), {
        getValue: function() {
          return a;
        },
        setValue: function(w) {
          a = "" + w;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function Ni(e) {
    if (!e._valueTracker) {
      var t = or(e) ? "checked" : "value";
      e._valueTracker = Mu(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function lr(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var a = t.getValue(), o = "";
    return e && (o = or(e) ? e.checked ? "true" : "false" : e.value), e = o, e !== a ? (t.setValue(e), !0) : !1;
  }
  function Ya(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Tu = /[\n"\\]/g;
  function Nt(e) {
    return e.replace(
      Tu,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Ia(e, t, a, o, u, d, w, R) {
    e.name = "", w != null && typeof w != "function" && typeof w != "symbol" && typeof w != "boolean" ? e.type = w : e.removeAttribute("type"), t != null ? w === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + _t(t)) : e.value !== "" + _t(t) && (e.value = "" + _t(t)) : w !== "submit" && w !== "reset" || e.removeAttribute("value"), t != null ? No(e, w, _t(t)) : a != null ? No(e, w, _t(a)) : o != null && e.removeAttribute("value"), u == null && d != null && (e.defaultChecked = !!d), u != null && (e.checked = u && typeof u != "function" && typeof u != "symbol"), R != null && typeof R != "function" && typeof R != "symbol" && typeof R != "boolean" ? e.name = "" + _t(R) : e.removeAttribute("name");
  }
  function rr(e, t, a, o, u, d, w, R) {
    if (d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (e.type = d), t != null || a != null) {
      if (!(d !== "submit" && d !== "reset" || t != null)) {
        Ni(e);
        return;
      }
      a = a != null ? "" + _t(a) : "", t = t != null ? "" + _t(t) : a, R || t === e.value || (e.value = t), e.defaultValue = t;
    }
    o = o ?? u, o = typeof o != "function" && typeof o != "symbol" && !!o, e.checked = R ? e.checked : !!o, e.defaultChecked = !!o, w != null && typeof w != "function" && typeof w != "symbol" && typeof w != "boolean" && (e.name = w), Ni(e);
  }
  function No(e, t, a) {
    t === "number" && Ya(e.ownerDocument) === e || e.defaultValue === "" + a || (e.defaultValue = "" + a);
  }
  function Tn(e, t, a, o) {
    if (e = e.options, t) {
      t = {};
      for (var u = 0; u < a.length; u++)
        t["$" + a[u]] = !0;
      for (a = 0; a < e.length; a++)
        u = t.hasOwnProperty("$" + e[a].value), e[a].selected !== u && (e[a].selected = u), u && o && (e[a].defaultSelected = !0);
    } else {
      for (a = "" + _t(a), t = null, u = 0; u < e.length; u++) {
        if (e[u].value === a) {
          e[u].selected = !0, o && (e[u].defaultSelected = !0);
          return;
        }
        t !== null || e[u].disabled || (t = e[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Id(e, t, a) {
    if (t != null && (t = "" + _t(t), t !== e.value && (e.value = t), a == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = a != null ? "" + _t(a) : "";
  }
  function qd(e, t, a, o) {
    if (t == null) {
      if (o != null) {
        if (a != null) throw Error(r(92));
        if (L(o)) {
          if (1 < o.length) throw Error(r(93));
          o = o[0];
        }
        a = o;
      }
      a == null && (a = ""), t = a;
    }
    a = _t(t), e.defaultValue = a, o = e.textContent, o === a && o !== "" && o !== null && (e.value = o), Ni(e);
  }
  function Ci(e, t) {
    if (t) {
      var a = e.firstChild;
      if (a && a === e.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var hb = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Xd(e, t, a) {
    var o = t.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === "" ? o ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : o ? e.setProperty(t, a) : typeof a != "number" || a === 0 || hb.has(t) ? t === "float" ? e.cssFloat = a : e[t] = ("" + a).trim() : e[t] = a + "px";
  }
  function Gd(e, t, a) {
    if (t != null && typeof t != "object")
      throw Error(r(62));
    if (e = e.style, a != null) {
      for (var o in a)
        !a.hasOwnProperty(o) || t != null && t.hasOwnProperty(o) || (o.indexOf("--") === 0 ? e.setProperty(o, "") : o === "float" ? e.cssFloat = "" : e[o] = "");
      for (var u in t)
        o = t[u], t.hasOwnProperty(u) && a[u] !== o && Xd(e, u, o);
    } else
      for (var d in t)
        t.hasOwnProperty(d) && Xd(e, d, t[d]);
  }
  function ju(e) {
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
  var gb = /* @__PURE__ */ new Map([
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
  ]), mb = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function sr(e) {
    return mb.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function jn() {
  }
  var Au = null;
  function Du(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Mi = null, Ti = null;
  function $d(e) {
    var t = ta(e);
    if (t && (e = t.stateNode)) {
      var a = e[vt] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (Ia(
            e,
            a.value,
            a.defaultValue,
            a.defaultValue,
            a.checked,
            a.defaultChecked,
            a.type,
            a.name
          ), t = a.name, a.type === "radio" && t != null) {
            for (a = e; a.parentNode; ) a = a.parentNode;
            for (a = a.querySelectorAll(
              'input[name="' + Nt(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < a.length; t++) {
              var o = a[t];
              if (o !== e && o.form === e.form) {
                var u = o[vt] || null;
                if (!u) throw Error(r(90));
                Ia(
                  o,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name
                );
              }
            }
            for (t = 0; t < a.length; t++)
              o = a[t], o.form === e.form && lr(o);
          }
          break e;
        case "textarea":
          Id(e, a.value, a.defaultValue);
          break e;
        case "select":
          t = a.value, t != null && Tn(e, !!a.multiple, t, !1);
      }
    }
  }
  var Ou = !1;
  function Zd(e, t, a) {
    if (Ou) return e(t, a);
    Ou = !0;
    try {
      var o = e(t);
      return o;
    } finally {
      if (Ou = !1, (Mi !== null || Ti !== null) && (Kr(), Mi && (t = Mi, e = Ti, Ti = Mi = null, $d(t), e)))
        for (t = 0; t < e.length; t++) $d(e[t]);
    }
  }
  function Co(e, t) {
    var a = e.stateNode;
    if (a === null) return null;
    var o = a[vt] || null;
    if (o === null) return null;
    a = o[t];
    e: switch (t) {
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
        (o = !o.disabled) || (e = e.type, o = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !o;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (a && typeof a != "function")
      throw Error(
        r(231, t, typeof a)
      );
    return a;
  }
  var An = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), zu = !1;
  if (An)
    try {
      var Mo = {};
      Object.defineProperty(Mo, "passive", {
        get: function() {
          zu = !0;
        }
      }), window.addEventListener("test", Mo, Mo), window.removeEventListener("test", Mo, Mo);
    } catch {
      zu = !1;
    }
  var oa = null, Ru = null, ur = null;
  function Qd() {
    if (ur) return ur;
    var e, t = Ru, a = t.length, o, u = "value" in oa ? oa.value : oa.textContent, d = u.length;
    for (e = 0; e < a && t[e] === u[e]; e++) ;
    var w = a - e;
    for (o = 1; o <= w && t[a - o] === u[d - o]; o++) ;
    return ur = u.slice(e, 1 < o ? 1 - o : void 0);
  }
  function cr(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function fr() {
    return !0;
  }
  function Kd() {
    return !1;
  }
  function Ct(e) {
    function t(a, o, u, d, w) {
      this._reactName = a, this._targetInst = u, this.type = o, this.nativeEvent = d, this.target = w, this.currentTarget = null;
      for (var R in e)
        e.hasOwnProperty(R) && (a = e[R], this[R] = a ? a(d) : d[R]);
      return this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? fr : Kd, this.isPropagationStopped = Kd, this;
    }
    return p(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var a = this.nativeEvent;
        a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = fr);
      },
      stopPropagation: function() {
        var a = this.nativeEvent;
        a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = fr);
      },
      persist: function() {
      },
      isPersistent: fr
    }), t;
  }
  var qa = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, dr = Ct(qa), To = p({}, qa, { view: 0, detail: 0 }), pb = Ct(To), ku, Hu, jo, hr = p({}, To, {
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
    getModifierState: Lu,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== jo && (jo && e.type === "mousemove" ? (ku = e.screenX - jo.screenX, Hu = e.screenY - jo.screenY) : Hu = ku = 0, jo = e), ku);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Hu;
    }
  }), Jd = Ct(hr), yb = p({}, hr, { dataTransfer: 0 }), vb = Ct(yb), bb = p({}, To, { relatedTarget: 0 }), Bu = Ct(bb), xb = p({}, qa, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), wb = Ct(xb), Sb = p({}, qa, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), Eb = Ct(Sb), _b = p({}, qa, { data: 0 }), Wd = Ct(_b), Nb = {
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
  }, Cb = {
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
  }, Mb = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Tb(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Mb[e]) ? !!t[e] : !1;
  }
  function Lu() {
    return Tb;
  }
  var jb = p({}, To, {
    key: function(e) {
      if (e.key) {
        var t = Nb[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = cr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Cb[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Lu,
    charCode: function(e) {
      return e.type === "keypress" ? cr(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? cr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), Ab = Ct(jb), Db = p({}, hr, {
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
  }), Fd = Ct(Db), Ob = p({}, To, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Lu
  }), zb = Ct(Ob), Rb = p({}, qa, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), kb = Ct(Rb), Hb = p({}, hr, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Bb = Ct(Hb), Lb = p({}, qa, {
    newState: 0,
    oldState: 0
  }), Ub = Ct(Lb), Vb = [9, 13, 27, 32], Uu = An && "CompositionEvent" in window, Ao = null;
  An && "documentMode" in document && (Ao = document.documentMode);
  var Yb = An && "TextEvent" in window && !Ao, Pd = An && (!Uu || Ao && 8 < Ao && 11 >= Ao), eh = " ", th = !1;
  function nh(e, t) {
    switch (e) {
      case "keyup":
        return Vb.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function ah(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var ji = !1;
  function Ib(e, t) {
    switch (e) {
      case "compositionend":
        return ah(t);
      case "keypress":
        return t.which !== 32 ? null : (th = !0, eh);
      case "textInput":
        return e = t.data, e === eh && th ? null : e;
      default:
        return null;
    }
  }
  function qb(e, t) {
    if (ji)
      return e === "compositionend" || !Uu && nh(e, t) ? (e = Qd(), ur = Ru = oa = null, ji = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length)
            return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return Pd && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Xb = {
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
  function ih(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Xb[e.type] : t === "textarea";
  }
  function oh(e, t, a, o) {
    Mi ? Ti ? Ti.push(o) : Ti = [o] : Mi = o, t = ns(t, "onChange"), 0 < t.length && (a = new dr(
      "onChange",
      "change",
      null,
      a,
      o
    ), e.push({ event: a, listeners: t }));
  }
  var Do = null, Oo = null;
  function Gb(e) {
    Ym(e, 0);
  }
  function gr(e) {
    var t = na(e);
    if (lr(t)) return e;
  }
  function lh(e, t) {
    if (e === "change") return t;
  }
  var rh = !1;
  if (An) {
    var Vu;
    if (An) {
      var Yu = "oninput" in document;
      if (!Yu) {
        var sh = document.createElement("div");
        sh.setAttribute("oninput", "return;"), Yu = typeof sh.oninput == "function";
      }
      Vu = Yu;
    } else Vu = !1;
    rh = Vu && (!document.documentMode || 9 < document.documentMode);
  }
  function uh() {
    Do && (Do.detachEvent("onpropertychange", ch), Oo = Do = null);
  }
  function ch(e) {
    if (e.propertyName === "value" && gr(Oo)) {
      var t = [];
      oh(
        t,
        Oo,
        e,
        Du(e)
      ), Zd(Gb, t);
    }
  }
  function $b(e, t, a) {
    e === "focusin" ? (uh(), Do = t, Oo = a, Do.attachEvent("onpropertychange", ch)) : e === "focusout" && uh();
  }
  function Zb(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return gr(Oo);
  }
  function Qb(e, t) {
    if (e === "click") return gr(t);
  }
  function Kb(e, t) {
    if (e === "input" || e === "change")
      return gr(t);
  }
  function Jb(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Rt = typeof Object.is == "function" ? Object.is : Jb;
  function zo(e, t) {
    if (Rt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var a = Object.keys(e), o = Object.keys(t);
    if (a.length !== o.length) return !1;
    for (o = 0; o < a.length; o++) {
      var u = a[o];
      if (!zt.call(t, u) || !Rt(e[u], t[u]))
        return !1;
    }
    return !0;
  }
  function fh(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function dh(e, t) {
    var a = fh(e);
    e = 0;
    for (var o; a; ) {
      if (a.nodeType === 3) {
        if (o = e + a.textContent.length, e <= t && o >= t)
          return { node: a, offset: t - e };
        e = o;
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
      a = fh(a);
    }
  }
  function hh(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? hh(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function gh(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = Ya(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) e = t.contentWindow;
      else break;
      t = Ya(e.document);
    }
    return t;
  }
  function Iu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var Wb = An && "documentMode" in document && 11 >= document.documentMode, Ai = null, qu = null, Ro = null, Xu = !1;
  function mh(e, t, a) {
    var o = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    Xu || Ai == null || Ai !== Ya(o) || (o = Ai, "selectionStart" in o && Iu(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = {
      anchorNode: o.anchorNode,
      anchorOffset: o.anchorOffset,
      focusNode: o.focusNode,
      focusOffset: o.focusOffset
    }), Ro && zo(Ro, o) || (Ro = o, o = ns(qu, "onSelect"), 0 < o.length && (t = new dr(
      "onSelect",
      "select",
      null,
      t,
      a
    ), e.push({ event: t, listeners: o }), t.target = Ai)));
  }
  function Xa(e, t) {
    var a = {};
    return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
  }
  var Di = {
    animationend: Xa("Animation", "AnimationEnd"),
    animationiteration: Xa("Animation", "AnimationIteration"),
    animationstart: Xa("Animation", "AnimationStart"),
    transitionrun: Xa("Transition", "TransitionRun"),
    transitionstart: Xa("Transition", "TransitionStart"),
    transitioncancel: Xa("Transition", "TransitionCancel"),
    transitionend: Xa("Transition", "TransitionEnd")
  }, Gu = {}, ph = {};
  An && (ph = document.createElement("div").style, "AnimationEvent" in window || (delete Di.animationend.animation, delete Di.animationiteration.animation, delete Di.animationstart.animation), "TransitionEvent" in window || delete Di.transitionend.transition);
  function Ga(e) {
    if (Gu[e]) return Gu[e];
    if (!Di[e]) return e;
    var t = Di[e], a;
    for (a in t)
      if (t.hasOwnProperty(a) && a in ph)
        return Gu[e] = t[a];
    return e;
  }
  var yh = Ga("animationend"), vh = Ga("animationiteration"), bh = Ga("animationstart"), Fb = Ga("transitionrun"), Pb = Ga("transitionstart"), ex = Ga("transitioncancel"), xh = Ga("transitionend"), wh = /* @__PURE__ */ new Map(), $u = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  $u.push("scrollEnd");
  function nn(e, t) {
    wh.set(e, t), Mn(t, [e]);
  }
  var mr = typeof reportError == "function" ? reportError : function(e) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
        error: e
      });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", e);
      return;
    }
    console.error(e);
  }, Xt = [], Oi = 0, Zu = 0;
  function pr() {
    for (var e = Oi, t = Zu = Oi = 0; t < e; ) {
      var a = Xt[t];
      Xt[t++] = null;
      var o = Xt[t];
      Xt[t++] = null;
      var u = Xt[t];
      Xt[t++] = null;
      var d = Xt[t];
      if (Xt[t++] = null, o !== null && u !== null) {
        var w = o.pending;
        w === null ? u.next = u : (u.next = w.next, w.next = u), o.pending = u;
      }
      d !== 0 && Sh(a, u, d);
    }
  }
  function yr(e, t, a, o) {
    Xt[Oi++] = e, Xt[Oi++] = t, Xt[Oi++] = a, Xt[Oi++] = o, Zu |= o, e.lanes |= o, e = e.alternate, e !== null && (e.lanes |= o);
  }
  function Qu(e, t, a, o) {
    return yr(e, t, a, o), vr(e);
  }
  function $a(e, t) {
    return yr(e, null, null, t), vr(e);
  }
  function Sh(e, t, a) {
    e.lanes |= a;
    var o = e.alternate;
    o !== null && (o.lanes |= a);
    for (var u = !1, d = e.return; d !== null; )
      d.childLanes |= a, o = d.alternate, o !== null && (o.childLanes |= a), d.tag === 22 && (e = d.stateNode, e === null || e._visibility & 1 || (u = !0)), e = d, d = d.return;
    return e.tag === 3 ? (d = e.stateNode, u && t !== null && (u = 31 - wt(a), e = d.hiddenUpdates, o = e[u], o === null ? e[u] = [t] : o.push(t), t.lane = a | 536870912), d) : null;
  }
  function vr(e) {
    if (50 < nl)
      throw nl = 0, af = null, Error(r(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var zi = {};
  function tx(e, t, a, o) {
    this.tag = e, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function kt(e, t, a, o) {
    return new tx(e, t, a, o);
  }
  function Ku(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Dn(e, t) {
    var a = e.alternate;
    return a === null ? (a = kt(
      e.tag,
      t,
      e.key,
      e.mode
    ), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null), a.flags = e.flags & 65011712, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue, t = e.dependencies, a.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.refCleanup = e.refCleanup, a;
  }
  function Eh(e, t) {
    e.flags &= 65011714;
    var a = e.alternate;
    return a === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type, t = a.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function br(e, t, a, o, u, d) {
    var w = 0;
    if (o = e, typeof e == "function") Ku(e) && (w = 1);
    else if (typeof e == "string")
      w = l1(
        e,
        a,
        H.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case te:
          return e = kt(31, a, t, u), e.elementType = te, e.lanes = d, e;
        case C:
          return Za(a.children, u, d, t);
        case j:
          w = 8, u |= 24;
          break;
        case O:
          return e = kt(12, a, t, u | 2), e.elementType = O, e.lanes = d, e;
        case k:
          return e = kt(13, a, t, u), e.elementType = k, e.lanes = d, e;
        case U:
          return e = kt(19, a, t, u), e.elementType = U, e.lanes = d, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case E:
                w = 10;
                break e;
              case D:
                w = 9;
                break e;
              case N:
                w = 11;
                break e;
              case V:
                w = 14;
                break e;
              case X:
                w = 16, o = null;
                break e;
            }
          w = 29, a = Error(
            r(130, e === null ? "null" : typeof e, "")
          ), o = null;
      }
    return t = kt(w, a, t, u), t.elementType = e, t.type = o, t.lanes = d, t;
  }
  function Za(e, t, a, o) {
    return e = kt(7, e, o, t), e.lanes = a, e;
  }
  function Ju(e, t, a) {
    return e = kt(6, e, null, t), e.lanes = a, e;
  }
  function _h(e) {
    var t = kt(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function Wu(e, t, a) {
    return t = kt(
      4,
      e.children !== null ? e.children : [],
      e.key,
      t
    ), t.lanes = a, t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, t;
  }
  var Nh = /* @__PURE__ */ new WeakMap();
  function Gt(e, t) {
    if (typeof e == "object" && e !== null) {
      var a = Nh.get(e);
      return a !== void 0 ? a : (t = {
        value: e,
        source: t,
        stack: Et(t)
      }, Nh.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: Et(t)
    };
  }
  var Ri = [], ki = 0, xr = null, ko = 0, $t = [], Zt = 0, la = null, gn = 1, mn = "";
  function On(e, t) {
    Ri[ki++] = ko, Ri[ki++] = xr, xr = e, ko = t;
  }
  function Ch(e, t, a) {
    $t[Zt++] = gn, $t[Zt++] = mn, $t[Zt++] = la, la = e;
    var o = gn;
    e = mn;
    var u = 32 - wt(o) - 1;
    o &= ~(1 << u), a += 1;
    var d = 32 - wt(t) + u;
    if (30 < d) {
      var w = u - u % 5;
      d = (o & (1 << w) - 1).toString(32), o >>= w, u -= w, gn = 1 << 32 - wt(t) + u | a << u | o, mn = d + e;
    } else
      gn = 1 << d | a << u | o, mn = e;
  }
  function Fu(e) {
    e.return !== null && (On(e, 1), Ch(e, 1, 0));
  }
  function Pu(e) {
    for (; e === xr; )
      xr = Ri[--ki], Ri[ki] = null, ko = Ri[--ki], Ri[ki] = null;
    for (; e === la; )
      la = $t[--Zt], $t[Zt] = null, mn = $t[--Zt], $t[Zt] = null, gn = $t[--Zt], $t[Zt] = null;
  }
  function Mh(e, t) {
    $t[Zt++] = gn, $t[Zt++] = mn, $t[Zt++] = la, gn = t.id, mn = t.overflow, la = e;
  }
  var gt = null, $e = null, Oe = !1, ra = null, Qt = !1, ec = Error(r(519));
  function sa(e) {
    var t = Error(
      r(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Ho(Gt(t, e)), ec;
  }
  function Th(e) {
    var t = e.stateNode, a = e.type, o = e.memoizedProps;
    switch (t[ct] = e, t[vt] = o, a) {
      case "dialog":
        Te("cancel", t), Te("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        Te("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < il.length; a++)
          Te(il[a], t);
        break;
      case "source":
        Te("error", t);
        break;
      case "img":
      case "image":
      case "link":
        Te("error", t), Te("load", t);
        break;
      case "details":
        Te("toggle", t);
        break;
      case "input":
        Te("invalid", t), rr(
          t,
          o.value,
          o.defaultValue,
          o.checked,
          o.defaultChecked,
          o.type,
          o.name,
          !0
        );
        break;
      case "select":
        Te("invalid", t);
        break;
      case "textarea":
        Te("invalid", t), qd(t, o.value, o.defaultValue, o.children);
    }
    a = o.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || t.textContent === "" + a || o.suppressHydrationWarning === !0 || Gm(t.textContent, a) ? (o.popover != null && (Te("beforetoggle", t), Te("toggle", t)), o.onScroll != null && Te("scroll", t), o.onScrollEnd != null && Te("scrollend", t), o.onClick != null && (t.onclick = jn), t = !0) : t = !1, t || sa(e, !0);
  }
  function jh(e) {
    for (gt = e.return; gt; )
      switch (gt.tag) {
        case 5:
        case 31:
        case 13:
          Qt = !1;
          return;
        case 27:
        case 3:
          Qt = !0;
          return;
        default:
          gt = gt.return;
      }
  }
  function Hi(e) {
    if (e !== gt) return !1;
    if (!Oe) return jh(e), Oe = !0, !1;
    var t = e.tag, a;
    if ((a = t !== 3 && t !== 27) && ((a = t === 5) && (a = e.type, a = !(a !== "form" && a !== "button") || bf(e.type, e.memoizedProps)), a = !a), a && $e && sa(e), jh(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(r(317));
      $e = ep(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(r(317));
      $e = ep(e);
    } else
      t === 27 ? (t = $e, Sa(e.type) ? (e = _f, _f = null, $e = e) : $e = t) : $e = gt ? Jt(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Qa() {
    $e = gt = null, Oe = !1;
  }
  function tc() {
    var e = ra;
    return e !== null && (At === null ? At = e : At.push.apply(
      At,
      e
    ), ra = null), e;
  }
  function Ho(e) {
    ra === null ? ra = [e] : ra.push(e);
  }
  var nc = A(null), Ka = null, zn = null;
  function ua(e, t, a) {
    G(nc, t._currentValue), t._currentValue = a;
  }
  function Rn(e) {
    e._currentValue = nc.current, I(nc);
  }
  function ac(e, t, a) {
    for (; e !== null; ) {
      var o = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, o !== null && (o.childLanes |= t)) : o !== null && (o.childLanes & t) !== t && (o.childLanes |= t), e === a) break;
      e = e.return;
    }
  }
  function ic(e, t, a, o) {
    var u = e.child;
    for (u !== null && (u.return = e); u !== null; ) {
      var d = u.dependencies;
      if (d !== null) {
        var w = u.child;
        d = d.firstContext;
        e: for (; d !== null; ) {
          var R = d;
          d = u;
          for (var W = 0; W < t.length; W++)
            if (R.context === t[W]) {
              d.lanes |= a, R = d.alternate, R !== null && (R.lanes |= a), ac(
                d.return,
                a,
                e
              ), o || (w = null);
              break e;
            }
          d = R.next;
        }
      } else if (u.tag === 18) {
        if (w = u.return, w === null) throw Error(r(341));
        w.lanes |= a, d = w.alternate, d !== null && (d.lanes |= a), ac(w, a, e), w = null;
      } else w = u.child;
      if (w !== null) w.return = u;
      else
        for (w = u; w !== null; ) {
          if (w === e) {
            w = null;
            break;
          }
          if (u = w.sibling, u !== null) {
            u.return = w.return, w = u;
            break;
          }
          w = w.return;
        }
      u = w;
    }
  }
  function Bi(e, t, a, o) {
    e = null;
    for (var u = t, d = !1; u !== null; ) {
      if (!d) {
        if ((u.flags & 524288) !== 0) d = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var w = u.alternate;
        if (w === null) throw Error(r(387));
        if (w = w.memoizedProps, w !== null) {
          var R = u.type;
          Rt(u.pendingProps.value, w.value) || (e !== null ? e.push(R) : e = [R]);
        }
      } else if (u === Q.current) {
        if (w = u.alternate, w === null) throw Error(r(387));
        w.memoizedState.memoizedState !== u.memoizedState.memoizedState && (e !== null ? e.push(ul) : e = [ul]);
      }
      u = u.return;
    }
    e !== null && ic(
      t,
      e,
      a,
      o
    ), t.flags |= 262144;
  }
  function wr(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Rt(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function Ja(e) {
    Ka = e, zn = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function mt(e) {
    return Ah(Ka, e);
  }
  function Sr(e, t) {
    return Ka === null && Ja(e), Ah(e, t);
  }
  function Ah(e, t) {
    var a = t._currentValue;
    if (t = { context: t, memoizedValue: a, next: null }, zn === null) {
      if (e === null) throw Error(r(308));
      zn = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else zn = zn.next = t;
    return a;
  }
  var nx = typeof AbortController < "u" ? AbortController : function() {
    var e = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(a, o) {
        e.push(o);
      }
    };
    this.abort = function() {
      t.aborted = !0, e.forEach(function(a) {
        return a();
      });
    };
  }, ax = n.unstable_scheduleCallback, ix = n.unstable_NormalPriority, it = {
    $$typeof: E,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function oc() {
    return {
      controller: new nx(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Bo(e) {
    e.refCount--, e.refCount === 0 && ax(ix, function() {
      e.controller.abort();
    });
  }
  var Lo = null, lc = 0, Li = 0, Ui = null;
  function ox(e, t) {
    if (Lo === null) {
      var a = Lo = [];
      lc = 0, Li = cf(), Ui = {
        status: "pending",
        value: void 0,
        then: function(o) {
          a.push(o);
        }
      };
    }
    return lc++, t.then(Dh, Dh), t;
  }
  function Dh() {
    if (--lc === 0 && Lo !== null) {
      Ui !== null && (Ui.status = "fulfilled");
      var e = Lo;
      Lo = null, Li = 0, Ui = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function lx(e, t) {
    var a = [], o = {
      status: "pending",
      value: null,
      reason: null,
      then: function(u) {
        a.push(u);
      }
    };
    return e.then(
      function() {
        o.status = "fulfilled", o.value = t;
        for (var u = 0; u < a.length; u++) (0, a[u])(t);
      },
      function(u) {
        for (o.status = "rejected", o.reason = u, u = 0; u < a.length; u++)
          (0, a[u])(void 0);
      }
    ), o;
  }
  var Oh = _.S;
  _.S = function(e, t) {
    mm = ht(), typeof t == "object" && t !== null && typeof t.then == "function" && ox(e, t), Oh !== null && Oh(e, t);
  };
  var Wa = A(null);
  function rc() {
    var e = Wa.current;
    return e !== null ? e : Ge.pooledCache;
  }
  function Er(e, t) {
    t === null ? G(Wa, Wa.current) : G(Wa, t.pool);
  }
  function zh() {
    var e = rc();
    return e === null ? null : { parent: it._currentValue, pool: e };
  }
  var Vi = Error(r(460)), sc = Error(r(474)), _r = Error(r(542)), Nr = { then: function() {
  } };
  function Rh(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function kh(e, t, a) {
    switch (a = e[a], a === void 0 ? e.push(t) : a !== t && (t.then(jn, jn), t = a), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, Bh(e), e;
      default:
        if (typeof t.status == "string") t.then(jn, jn);
        else {
          if (e = Ge, e !== null && 100 < e.shellSuspendCounter)
            throw Error(r(482));
          e = t, e.status = "pending", e.then(
            function(o) {
              if (t.status === "pending") {
                var u = t;
                u.status = "fulfilled", u.value = o;
              }
            },
            function(o) {
              if (t.status === "pending") {
                var u = t;
                u.status = "rejected", u.reason = o;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, Bh(e), e;
        }
        throw Pa = t, Vi;
    }
  }
  function Fa(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (a) {
      throw a !== null && typeof a == "object" && typeof a.then == "function" ? (Pa = a, Vi) : a;
    }
  }
  var Pa = null;
  function Hh() {
    if (Pa === null) throw Error(r(459));
    var e = Pa;
    return Pa = null, e;
  }
  function Bh(e) {
    if (e === Vi || e === _r)
      throw Error(r(483));
  }
  var Yi = null, Uo = 0;
  function Cr(e) {
    var t = Uo;
    return Uo += 1, Yi === null && (Yi = []), kh(Yi, e, t);
  }
  function Vo(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function Mr(e, t) {
    throw t.$$typeof === v ? Error(r(525)) : (e = Object.prototype.toString.call(t), Error(
      r(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function Lh(e) {
    function t(ae, ne) {
      if (e) {
        var oe = ae.deletions;
        oe === null ? (ae.deletions = [ne], ae.flags |= 16) : oe.push(ne);
      }
    }
    function a(ae, ne) {
      if (!e) return null;
      for (; ne !== null; )
        t(ae, ne), ne = ne.sibling;
      return null;
    }
    function o(ae) {
      for (var ne = /* @__PURE__ */ new Map(); ae !== null; )
        ae.key !== null ? ne.set(ae.key, ae) : ne.set(ae.index, ae), ae = ae.sibling;
      return ne;
    }
    function u(ae, ne) {
      return ae = Dn(ae, ne), ae.index = 0, ae.sibling = null, ae;
    }
    function d(ae, ne, oe) {
      return ae.index = oe, e ? (oe = ae.alternate, oe !== null ? (oe = oe.index, oe < ne ? (ae.flags |= 67108866, ne) : oe) : (ae.flags |= 67108866, ne)) : (ae.flags |= 1048576, ne);
    }
    function w(ae) {
      return e && ae.alternate === null && (ae.flags |= 67108866), ae;
    }
    function R(ae, ne, oe, ce) {
      return ne === null || ne.tag !== 6 ? (ne = Ju(oe, ae.mode, ce), ne.return = ae, ne) : (ne = u(ne, oe), ne.return = ae, ne);
    }
    function W(ae, ne, oe, ce) {
      var ve = oe.type;
      return ve === C ? ue(
        ae,
        ne,
        oe.props.children,
        ce,
        oe.key
      ) : ne !== null && (ne.elementType === ve || typeof ve == "object" && ve !== null && ve.$$typeof === X && Fa(ve) === ne.type) ? (ne = u(ne, oe.props), Vo(ne, oe), ne.return = ae, ne) : (ne = br(
        oe.type,
        oe.key,
        oe.props,
        null,
        ae.mode,
        ce
      ), Vo(ne, oe), ne.return = ae, ne);
    }
    function le(ae, ne, oe, ce) {
      return ne === null || ne.tag !== 4 || ne.stateNode.containerInfo !== oe.containerInfo || ne.stateNode.implementation !== oe.implementation ? (ne = Wu(oe, ae.mode, ce), ne.return = ae, ne) : (ne = u(ne, oe.children || []), ne.return = ae, ne);
    }
    function ue(ae, ne, oe, ce, ve) {
      return ne === null || ne.tag !== 7 ? (ne = Za(
        oe,
        ae.mode,
        ce,
        ve
      ), ne.return = ae, ne) : (ne = u(ne, oe), ne.return = ae, ne);
    }
    function fe(ae, ne, oe) {
      if (typeof ne == "string" && ne !== "" || typeof ne == "number" || typeof ne == "bigint")
        return ne = Ju(
          "" + ne,
          ae.mode,
          oe
        ), ne.return = ae, ne;
      if (typeof ne == "object" && ne !== null) {
        switch (ne.$$typeof) {
          case x:
            return oe = br(
              ne.type,
              ne.key,
              ne.props,
              null,
              ae.mode,
              oe
            ), Vo(oe, ne), oe.return = ae, oe;
          case S:
            return ne = Wu(
              ne,
              ae.mode,
              oe
            ), ne.return = ae, ne;
          case X:
            return ne = Fa(ne), fe(ae, ne, oe);
        }
        if (L(ne) || Z(ne))
          return ne = Za(
            ne,
            ae.mode,
            oe,
            null
          ), ne.return = ae, ne;
        if (typeof ne.then == "function")
          return fe(ae, Cr(ne), oe);
        if (ne.$$typeof === E)
          return fe(
            ae,
            Sr(ae, ne),
            oe
          );
        Mr(ae, ne);
      }
      return null;
    }
    function re(ae, ne, oe, ce) {
      var ve = ne !== null ? ne.key : null;
      if (typeof oe == "string" && oe !== "" || typeof oe == "number" || typeof oe == "bigint")
        return ve !== null ? null : R(ae, ne, "" + oe, ce);
      if (typeof oe == "object" && oe !== null) {
        switch (oe.$$typeof) {
          case x:
            return oe.key === ve ? W(ae, ne, oe, ce) : null;
          case S:
            return oe.key === ve ? le(ae, ne, oe, ce) : null;
          case X:
            return oe = Fa(oe), re(ae, ne, oe, ce);
        }
        if (L(oe) || Z(oe))
          return ve !== null ? null : ue(ae, ne, oe, ce, null);
        if (typeof oe.then == "function")
          return re(
            ae,
            ne,
            Cr(oe),
            ce
          );
        if (oe.$$typeof === E)
          return re(
            ae,
            ne,
            Sr(ae, oe),
            ce
          );
        Mr(ae, oe);
      }
      return null;
    }
    function se(ae, ne, oe, ce, ve) {
      if (typeof ce == "string" && ce !== "" || typeof ce == "number" || typeof ce == "bigint")
        return ae = ae.get(oe) || null, R(ne, ae, "" + ce, ve);
      if (typeof ce == "object" && ce !== null) {
        switch (ce.$$typeof) {
          case x:
            return ae = ae.get(
              ce.key === null ? oe : ce.key
            ) || null, W(ne, ae, ce, ve);
          case S:
            return ae = ae.get(
              ce.key === null ? oe : ce.key
            ) || null, le(ne, ae, ce, ve);
          case X:
            return ce = Fa(ce), se(
              ae,
              ne,
              oe,
              ce,
              ve
            );
        }
        if (L(ce) || Z(ce))
          return ae = ae.get(oe) || null, ue(ne, ae, ce, ve, null);
        if (typeof ce.then == "function")
          return se(
            ae,
            ne,
            oe,
            Cr(ce),
            ve
          );
        if (ce.$$typeof === E)
          return se(
            ae,
            ne,
            oe,
            Sr(ne, ce),
            ve
          );
        Mr(ne, ce);
      }
      return null;
    }
    function me(ae, ne, oe, ce) {
      for (var ve = null, ke = null, pe = ne, Ce = ne = 0, Ae = null; pe !== null && Ce < oe.length; Ce++) {
        pe.index > Ce ? (Ae = pe, pe = null) : Ae = pe.sibling;
        var He = re(
          ae,
          pe,
          oe[Ce],
          ce
        );
        if (He === null) {
          pe === null && (pe = Ae);
          break;
        }
        e && pe && He.alternate === null && t(ae, pe), ne = d(He, ne, Ce), ke === null ? ve = He : ke.sibling = He, ke = He, pe = Ae;
      }
      if (Ce === oe.length)
        return a(ae, pe), Oe && On(ae, Ce), ve;
      if (pe === null) {
        for (; Ce < oe.length; Ce++)
          pe = fe(ae, oe[Ce], ce), pe !== null && (ne = d(
            pe,
            ne,
            Ce
          ), ke === null ? ve = pe : ke.sibling = pe, ke = pe);
        return Oe && On(ae, Ce), ve;
      }
      for (pe = o(pe); Ce < oe.length; Ce++)
        Ae = se(
          pe,
          ae,
          Ce,
          oe[Ce],
          ce
        ), Ae !== null && (e && Ae.alternate !== null && pe.delete(
          Ae.key === null ? Ce : Ae.key
        ), ne = d(
          Ae,
          ne,
          Ce
        ), ke === null ? ve = Ae : ke.sibling = Ae, ke = Ae);
      return e && pe.forEach(function(Ma) {
        return t(ae, Ma);
      }), Oe && On(ae, Ce), ve;
    }
    function we(ae, ne, oe, ce) {
      if (oe == null) throw Error(r(151));
      for (var ve = null, ke = null, pe = ne, Ce = ne = 0, Ae = null, He = oe.next(); pe !== null && !He.done; Ce++, He = oe.next()) {
        pe.index > Ce ? (Ae = pe, pe = null) : Ae = pe.sibling;
        var Ma = re(ae, pe, He.value, ce);
        if (Ma === null) {
          pe === null && (pe = Ae);
          break;
        }
        e && pe && Ma.alternate === null && t(ae, pe), ne = d(Ma, ne, Ce), ke === null ? ve = Ma : ke.sibling = Ma, ke = Ma, pe = Ae;
      }
      if (He.done)
        return a(ae, pe), Oe && On(ae, Ce), ve;
      if (pe === null) {
        for (; !He.done; Ce++, He = oe.next())
          He = fe(ae, He.value, ce), He !== null && (ne = d(He, ne, Ce), ke === null ? ve = He : ke.sibling = He, ke = He);
        return Oe && On(ae, Ce), ve;
      }
      for (pe = o(pe); !He.done; Ce++, He = oe.next())
        He = se(pe, ae, Ce, He.value, ce), He !== null && (e && He.alternate !== null && pe.delete(He.key === null ? Ce : He.key), ne = d(He, ne, Ce), ke === null ? ve = He : ke.sibling = He, ke = He);
      return e && pe.forEach(function(y1) {
        return t(ae, y1);
      }), Oe && On(ae, Ce), ve;
    }
    function Xe(ae, ne, oe, ce) {
      if (typeof oe == "object" && oe !== null && oe.type === C && oe.key === null && (oe = oe.props.children), typeof oe == "object" && oe !== null) {
        switch (oe.$$typeof) {
          case x:
            e: {
              for (var ve = oe.key; ne !== null; ) {
                if (ne.key === ve) {
                  if (ve = oe.type, ve === C) {
                    if (ne.tag === 7) {
                      a(
                        ae,
                        ne.sibling
                      ), ce = u(
                        ne,
                        oe.props.children
                      ), ce.return = ae, ae = ce;
                      break e;
                    }
                  } else if (ne.elementType === ve || typeof ve == "object" && ve !== null && ve.$$typeof === X && Fa(ve) === ne.type) {
                    a(
                      ae,
                      ne.sibling
                    ), ce = u(ne, oe.props), Vo(ce, oe), ce.return = ae, ae = ce;
                    break e;
                  }
                  a(ae, ne);
                  break;
                } else t(ae, ne);
                ne = ne.sibling;
              }
              oe.type === C ? (ce = Za(
                oe.props.children,
                ae.mode,
                ce,
                oe.key
              ), ce.return = ae, ae = ce) : (ce = br(
                oe.type,
                oe.key,
                oe.props,
                null,
                ae.mode,
                ce
              ), Vo(ce, oe), ce.return = ae, ae = ce);
            }
            return w(ae);
          case S:
            e: {
              for (ve = oe.key; ne !== null; ) {
                if (ne.key === ve)
                  if (ne.tag === 4 && ne.stateNode.containerInfo === oe.containerInfo && ne.stateNode.implementation === oe.implementation) {
                    a(
                      ae,
                      ne.sibling
                    ), ce = u(ne, oe.children || []), ce.return = ae, ae = ce;
                    break e;
                  } else {
                    a(ae, ne);
                    break;
                  }
                else t(ae, ne);
                ne = ne.sibling;
              }
              ce = Wu(oe, ae.mode, ce), ce.return = ae, ae = ce;
            }
            return w(ae);
          case X:
            return oe = Fa(oe), Xe(
              ae,
              ne,
              oe,
              ce
            );
        }
        if (L(oe))
          return me(
            ae,
            ne,
            oe,
            ce
          );
        if (Z(oe)) {
          if (ve = Z(oe), typeof ve != "function") throw Error(r(150));
          return oe = ve.call(oe), we(
            ae,
            ne,
            oe,
            ce
          );
        }
        if (typeof oe.then == "function")
          return Xe(
            ae,
            ne,
            Cr(oe),
            ce
          );
        if (oe.$$typeof === E)
          return Xe(
            ae,
            ne,
            Sr(ae, oe),
            ce
          );
        Mr(ae, oe);
      }
      return typeof oe == "string" && oe !== "" || typeof oe == "number" || typeof oe == "bigint" ? (oe = "" + oe, ne !== null && ne.tag === 6 ? (a(ae, ne.sibling), ce = u(ne, oe), ce.return = ae, ae = ce) : (a(ae, ne), ce = Ju(oe, ae.mode, ce), ce.return = ae, ae = ce), w(ae)) : a(ae, ne);
    }
    return function(ae, ne, oe, ce) {
      try {
        Uo = 0;
        var ve = Xe(
          ae,
          ne,
          oe,
          ce
        );
        return Yi = null, ve;
      } catch (pe) {
        if (pe === Vi || pe === _r) throw pe;
        var ke = kt(29, pe, null, ae.mode);
        return ke.lanes = ce, ke.return = ae, ke;
      }
    };
  }
  var ei = Lh(!0), Uh = Lh(!1), ca = !1;
  function uc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function cc(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function fa(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function da(e, t, a) {
    var o = e.updateQueue;
    if (o === null) return null;
    if (o = o.shared, (Le & 2) !== 0) {
      var u = o.pending;
      return u === null ? t.next = t : (t.next = u.next, u.next = t), o.pending = t, t = vr(e), Sh(e, null, a), t;
    }
    return yr(e, o, t, a), vr(e);
  }
  function Yo(e, t, a) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (a & 4194048) !== 0)) {
      var o = t.lanes;
      o &= e.pendingLanes, a |= o, t.lanes = a, Jl(e, a);
    }
  }
  function fc(e, t) {
    var a = e.updateQueue, o = e.alternate;
    if (o !== null && (o = o.updateQueue, a === o)) {
      var u = null, d = null;
      if (a = a.firstBaseUpdate, a !== null) {
        do {
          var w = {
            lane: a.lane,
            tag: a.tag,
            payload: a.payload,
            callback: null,
            next: null
          };
          d === null ? u = d = w : d = d.next = w, a = a.next;
        } while (a !== null);
        d === null ? u = d = t : d = d.next = t;
      } else u = d = t;
      a = {
        baseState: o.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: d,
        shared: o.shared,
        callbacks: o.callbacks
      }, e.updateQueue = a;
      return;
    }
    e = a.lastBaseUpdate, e === null ? a.firstBaseUpdate = t : e.next = t, a.lastBaseUpdate = t;
  }
  var dc = !1;
  function Io() {
    if (dc) {
      var e = Ui;
      if (e !== null) throw e;
    }
  }
  function qo(e, t, a, o) {
    dc = !1;
    var u = e.updateQueue;
    ca = !1;
    var d = u.firstBaseUpdate, w = u.lastBaseUpdate, R = u.shared.pending;
    if (R !== null) {
      u.shared.pending = null;
      var W = R, le = W.next;
      W.next = null, w === null ? d = le : w.next = le, w = W;
      var ue = e.alternate;
      ue !== null && (ue = ue.updateQueue, R = ue.lastBaseUpdate, R !== w && (R === null ? ue.firstBaseUpdate = le : R.next = le, ue.lastBaseUpdate = W));
    }
    if (d !== null) {
      var fe = u.baseState;
      w = 0, ue = le = W = null, R = d;
      do {
        var re = R.lane & -536870913, se = re !== R.lane;
        if (se ? (je & re) === re : (o & re) === re) {
          re !== 0 && re === Li && (dc = !0), ue !== null && (ue = ue.next = {
            lane: 0,
            tag: R.tag,
            payload: R.payload,
            callback: null,
            next: null
          });
          e: {
            var me = e, we = R;
            re = t;
            var Xe = a;
            switch (we.tag) {
              case 1:
                if (me = we.payload, typeof me == "function") {
                  fe = me.call(Xe, fe, re);
                  break e;
                }
                fe = me;
                break e;
              case 3:
                me.flags = me.flags & -65537 | 128;
              case 0:
                if (me = we.payload, re = typeof me == "function" ? me.call(Xe, fe, re) : me, re == null) break e;
                fe = p({}, fe, re);
                break e;
              case 2:
                ca = !0;
            }
          }
          re = R.callback, re !== null && (e.flags |= 64, se && (e.flags |= 8192), se = u.callbacks, se === null ? u.callbacks = [re] : se.push(re));
        } else
          se = {
            lane: re,
            tag: R.tag,
            payload: R.payload,
            callback: R.callback,
            next: null
          }, ue === null ? (le = ue = se, W = fe) : ue = ue.next = se, w |= re;
        if (R = R.next, R === null) {
          if (R = u.shared.pending, R === null)
            break;
          se = R, R = se.next, se.next = null, u.lastBaseUpdate = se, u.shared.pending = null;
        }
      } while (!0);
      ue === null && (W = fe), u.baseState = W, u.firstBaseUpdate = le, u.lastBaseUpdate = ue, d === null && (u.shared.lanes = 0), ya |= w, e.lanes = w, e.memoizedState = fe;
    }
  }
  function Vh(e, t) {
    if (typeof e != "function")
      throw Error(r(191, e));
    e.call(t);
  }
  function Yh(e, t) {
    var a = e.callbacks;
    if (a !== null)
      for (e.callbacks = null, e = 0; e < a.length; e++)
        Vh(a[e], t);
  }
  var Ii = A(null), Tr = A(0);
  function Ih(e, t) {
    e = qn, G(Tr, e), G(Ii, t), qn = e | t.baseLanes;
  }
  function hc() {
    G(Tr, qn), G(Ii, Ii.current);
  }
  function gc() {
    qn = Tr.current, I(Ii), I(Tr);
  }
  var Ht = A(null), Kt = null;
  function ha(e) {
    var t = e.alternate;
    G(et, et.current & 1), G(Ht, e), Kt === null && (t === null || Ii.current !== null || t.memoizedState !== null) && (Kt = e);
  }
  function mc(e) {
    G(et, et.current), G(Ht, e), Kt === null && (Kt = e);
  }
  function qh(e) {
    e.tag === 22 ? (G(et, et.current), G(Ht, e), Kt === null && (Kt = e)) : ga();
  }
  function ga() {
    G(et, et.current), G(Ht, Ht.current);
  }
  function Bt(e) {
    I(Ht), Kt === e && (Kt = null), I(et);
  }
  var et = A(0);
  function jr(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && (a = a.dehydrated, a === null || Sf(a) || Ef(a)))
          return t;
      } else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var kn = 0, Ne = null, Ie = null, ot = null, Ar = !1, qi = !1, ti = !1, Dr = 0, Xo = 0, Xi = null, rx = 0;
  function We() {
    throw Error(r(321));
  }
  function pc(e, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < e.length; a++)
      if (!Rt(e[a], t[a])) return !1;
    return !0;
  }
  function yc(e, t, a, o, u, d) {
    return kn = d, Ne = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, _.H = e === null || e.memoizedState === null ? Cg : Oc, ti = !1, d = a(o, u), ti = !1, qi && (d = Gh(
      t,
      a,
      o,
      u
    )), Xh(e), d;
  }
  function Xh(e) {
    _.H = Zo;
    var t = Ie !== null && Ie.next !== null;
    if (kn = 0, ot = Ie = Ne = null, Ar = !1, Xo = 0, Xi = null, t) throw Error(r(300));
    e === null || lt || (e = e.dependencies, e !== null && wr(e) && (lt = !0));
  }
  function Gh(e, t, a, o) {
    Ne = e;
    var u = 0;
    do {
      if (qi && (Xi = null), Xo = 0, qi = !1, 25 <= u) throw Error(r(301));
      if (u += 1, ot = Ie = null, e.updateQueue != null) {
        var d = e.updateQueue;
        d.lastEffect = null, d.events = null, d.stores = null, d.memoCache != null && (d.memoCache.index = 0);
      }
      _.H = Mg, d = t(a, o);
    } while (qi);
    return d;
  }
  function sx() {
    var e = _.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? Go(t) : t, e = e.useState()[0], (Ie !== null ? Ie.memoizedState : null) !== e && (Ne.flags |= 1024), t;
  }
  function vc() {
    var e = Dr !== 0;
    return Dr = 0, e;
  }
  function bc(e, t, a) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a;
  }
  function xc(e) {
    if (Ar) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Ar = !1;
    }
    kn = 0, ot = Ie = Ne = null, qi = !1, Xo = Dr = 0, Xi = null;
  }
  function St() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return ot === null ? Ne.memoizedState = ot = e : ot = ot.next = e, ot;
  }
  function tt() {
    if (Ie === null) {
      var e = Ne.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ie.next;
    var t = ot === null ? Ne.memoizedState : ot.next;
    if (t !== null)
      ot = t, Ie = e;
    else {
      if (e === null)
        throw Ne.alternate === null ? Error(r(467)) : Error(r(310));
      Ie = e, e = {
        memoizedState: Ie.memoizedState,
        baseState: Ie.baseState,
        baseQueue: Ie.baseQueue,
        queue: Ie.queue,
        next: null
      }, ot === null ? Ne.memoizedState = ot = e : ot = ot.next = e;
    }
    return ot;
  }
  function Or() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Go(e) {
    var t = Xo;
    return Xo += 1, Xi === null && (Xi = []), e = kh(Xi, e, t), t = Ne, (ot === null ? t.memoizedState : ot.next) === null && (t = t.alternate, _.H = t === null || t.memoizedState === null ? Cg : Oc), e;
  }
  function zr(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Go(e);
      if (e.$$typeof === E) return mt(e);
    }
    throw Error(r(438, String(e)));
  }
  function wc(e) {
    var t = null, a = Ne.updateQueue;
    if (a !== null && (t = a.memoCache), t == null) {
      var o = Ne.alternate;
      o !== null && (o = o.updateQueue, o !== null && (o = o.memoCache, o != null && (t = {
        data: o.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), a === null && (a = Or(), Ne.updateQueue = a), a.memoCache = t, a = t.data[t.index], a === void 0)
      for (a = t.data[t.index] = Array(e), o = 0; o < e; o++)
        a[o] = K;
    return t.index++, a;
  }
  function Hn(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Rr(e) {
    var t = tt();
    return Sc(t, Ie, e);
  }
  function Sc(e, t, a) {
    var o = e.queue;
    if (o === null) throw Error(r(311));
    o.lastRenderedReducer = a;
    var u = e.baseQueue, d = o.pending;
    if (d !== null) {
      if (u !== null) {
        var w = u.next;
        u.next = d.next, d.next = w;
      }
      t.baseQueue = u = d, o.pending = null;
    }
    if (d = e.baseState, u === null) e.memoizedState = d;
    else {
      t = u.next;
      var R = w = null, W = null, le = t, ue = !1;
      do {
        var fe = le.lane & -536870913;
        if (fe !== le.lane ? (je & fe) === fe : (kn & fe) === fe) {
          var re = le.revertLane;
          if (re === 0)
            W !== null && (W = W.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: le.action,
              hasEagerState: le.hasEagerState,
              eagerState: le.eagerState,
              next: null
            }), fe === Li && (ue = !0);
          else if ((kn & re) === re) {
            le = le.next, re === Li && (ue = !0);
            continue;
          } else
            fe = {
              lane: 0,
              revertLane: le.revertLane,
              gesture: null,
              action: le.action,
              hasEagerState: le.hasEagerState,
              eagerState: le.eagerState,
              next: null
            }, W === null ? (R = W = fe, w = d) : W = W.next = fe, Ne.lanes |= re, ya |= re;
          fe = le.action, ti && a(d, fe), d = le.hasEagerState ? le.eagerState : a(d, fe);
        } else
          re = {
            lane: fe,
            revertLane: le.revertLane,
            gesture: le.gesture,
            action: le.action,
            hasEagerState: le.hasEagerState,
            eagerState: le.eagerState,
            next: null
          }, W === null ? (R = W = re, w = d) : W = W.next = re, Ne.lanes |= fe, ya |= fe;
        le = le.next;
      } while (le !== null && le !== t);
      if (W === null ? w = d : W.next = R, !Rt(d, e.memoizedState) && (lt = !0, ue && (a = Ui, a !== null)))
        throw a;
      e.memoizedState = d, e.baseState = w, e.baseQueue = W, o.lastRenderedState = d;
    }
    return u === null && (o.lanes = 0), [e.memoizedState, o.dispatch];
  }
  function Ec(e) {
    var t = tt(), a = t.queue;
    if (a === null) throw Error(r(311));
    a.lastRenderedReducer = e;
    var o = a.dispatch, u = a.pending, d = t.memoizedState;
    if (u !== null) {
      a.pending = null;
      var w = u = u.next;
      do
        d = e(d, w.action), w = w.next;
      while (w !== u);
      Rt(d, t.memoizedState) || (lt = !0), t.memoizedState = d, t.baseQueue === null && (t.baseState = d), a.lastRenderedState = d;
    }
    return [d, o];
  }
  function $h(e, t, a) {
    var o = Ne, u = tt(), d = Oe;
    if (d) {
      if (a === void 0) throw Error(r(407));
      a = a();
    } else a = t();
    var w = !Rt(
      (Ie || u).memoizedState,
      a
    );
    if (w && (u.memoizedState = a, lt = !0), u = u.queue, Cc(Kh.bind(null, o, u, e), [
      e
    ]), u.getSnapshot !== t || w || ot !== null && ot.memoizedState.tag & 1) {
      if (o.flags |= 2048, Gi(
        9,
        { destroy: void 0 },
        Qh.bind(
          null,
          o,
          u,
          a,
          t
        ),
        null
      ), Ge === null) throw Error(r(349));
      d || (kn & 127) !== 0 || Zh(o, t, a);
    }
    return a;
  }
  function Zh(e, t, a) {
    e.flags |= 16384, e = { getSnapshot: t, value: a }, t = Ne.updateQueue, t === null ? (t = Or(), Ne.updateQueue = t, t.stores = [e]) : (a = t.stores, a === null ? t.stores = [e] : a.push(e));
  }
  function Qh(e, t, a, o) {
    t.value = a, t.getSnapshot = o, Jh(t) && Wh(e);
  }
  function Kh(e, t, a) {
    return a(function() {
      Jh(t) && Wh(e);
    });
  }
  function Jh(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var a = t();
      return !Rt(e, a);
    } catch {
      return !0;
    }
  }
  function Wh(e) {
    var t = $a(e, 2);
    t !== null && Dt(t, e, 2);
  }
  function _c(e) {
    var t = St();
    if (typeof e == "function") {
      var a = e;
      if (e = a(), ti) {
        dn(!0);
        try {
          a();
        } finally {
          dn(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Hn,
      lastRenderedState: e
    }, t;
  }
  function Fh(e, t, a, o) {
    return e.baseState = a, Sc(
      e,
      Ie,
      typeof o == "function" ? o : Hn
    );
  }
  function ux(e, t, a, o, u) {
    if (Br(e)) throw Error(r(485));
    if (e = t.action, e !== null) {
      var d = {
        payload: u,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(w) {
          d.listeners.push(w);
        }
      };
      _.T !== null ? a(!0) : d.isTransition = !1, o(d), a = t.pending, a === null ? (d.next = t.pending = d, Ph(t, d)) : (d.next = a.next, t.pending = a.next = d);
    }
  }
  function Ph(e, t) {
    var a = t.action, o = t.payload, u = e.state;
    if (t.isTransition) {
      var d = _.T, w = {};
      _.T = w;
      try {
        var R = a(u, o), W = _.S;
        W !== null && W(w, R), eg(e, t, R);
      } catch (le) {
        Nc(e, t, le);
      } finally {
        d !== null && w.types !== null && (d.types = w.types), _.T = d;
      }
    } else
      try {
        d = a(u, o), eg(e, t, d);
      } catch (le) {
        Nc(e, t, le);
      }
  }
  function eg(e, t, a) {
    a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(
      function(o) {
        tg(e, t, o);
      },
      function(o) {
        return Nc(e, t, o);
      }
    ) : tg(e, t, a);
  }
  function tg(e, t, a) {
    t.status = "fulfilled", t.value = a, ng(t), e.state = a, t = e.pending, t !== null && (a = t.next, a === t ? e.pending = null : (a = a.next, t.next = a, Ph(e, a)));
  }
  function Nc(e, t, a) {
    var o = e.pending;
    if (e.pending = null, o !== null) {
      o = o.next;
      do
        t.status = "rejected", t.reason = a, ng(t), t = t.next;
      while (t !== o);
    }
    e.action = null;
  }
  function ng(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function ag(e, t) {
    return t;
  }
  function ig(e, t) {
    if (Oe) {
      var a = Ge.formState;
      if (a !== null) {
        e: {
          var o = Ne;
          if (Oe) {
            if ($e) {
              t: {
                for (var u = $e, d = Qt; u.nodeType !== 8; ) {
                  if (!d) {
                    u = null;
                    break t;
                  }
                  if (u = Jt(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break t;
                  }
                }
                d = u.data, u = d === "F!" || d === "F" ? u : null;
              }
              if (u) {
                $e = Jt(
                  u.nextSibling
                ), o = u.data === "F!";
                break e;
              }
            }
            sa(o);
          }
          o = !1;
        }
        o && (t = a[0]);
      }
    }
    return a = St(), a.memoizedState = a.baseState = t, o = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ag,
      lastRenderedState: t
    }, a.queue = o, a = Eg.bind(
      null,
      Ne,
      o
    ), o.dispatch = a, o = _c(!1), d = Dc.bind(
      null,
      Ne,
      !1,
      o.queue
    ), o = St(), u = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, o.queue = u, a = ux.bind(
      null,
      Ne,
      u,
      d,
      a
    ), u.dispatch = a, o.memoizedState = e, [t, a, !1];
  }
  function og(e) {
    var t = tt();
    return lg(t, Ie, e);
  }
  function lg(e, t, a) {
    if (t = Sc(
      e,
      t,
      ag
    )[0], e = Rr(Hn)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var o = Go(t);
      } catch (w) {
        throw w === Vi ? _r : w;
      }
    else o = t;
    t = tt();
    var u = t.queue, d = u.dispatch;
    return a !== t.memoizedState && (Ne.flags |= 2048, Gi(
      9,
      { destroy: void 0 },
      cx.bind(null, u, a),
      null
    )), [o, d, e];
  }
  function cx(e, t) {
    e.action = t;
  }
  function rg(e) {
    var t = tt(), a = Ie;
    if (a !== null)
      return lg(t, a, e);
    tt(), t = t.memoizedState, a = tt();
    var o = a.queue.dispatch;
    return a.memoizedState = e, [t, o, !1];
  }
  function Gi(e, t, a, o) {
    return e = { tag: e, create: a, deps: o, inst: t, next: null }, t = Ne.updateQueue, t === null && (t = Or(), Ne.updateQueue = t), a = t.lastEffect, a === null ? t.lastEffect = e.next = e : (o = a.next, a.next = e, e.next = o, t.lastEffect = e), e;
  }
  function sg() {
    return tt().memoizedState;
  }
  function kr(e, t, a, o) {
    var u = St();
    Ne.flags |= e, u.memoizedState = Gi(
      1 | t,
      { destroy: void 0 },
      a,
      o === void 0 ? null : o
    );
  }
  function Hr(e, t, a, o) {
    var u = tt();
    o = o === void 0 ? null : o;
    var d = u.memoizedState.inst;
    Ie !== null && o !== null && pc(o, Ie.memoizedState.deps) ? u.memoizedState = Gi(t, d, a, o) : (Ne.flags |= e, u.memoizedState = Gi(
      1 | t,
      d,
      a,
      o
    ));
  }
  function ug(e, t) {
    kr(8390656, 8, e, t);
  }
  function Cc(e, t) {
    Hr(2048, 8, e, t);
  }
  function fx(e) {
    Ne.flags |= 4;
    var t = Ne.updateQueue;
    if (t === null)
      t = Or(), Ne.updateQueue = t, t.events = [e];
    else {
      var a = t.events;
      a === null ? t.events = [e] : a.push(e);
    }
  }
  function cg(e) {
    var t = tt().memoizedState;
    return fx({ ref: t, nextImpl: e }), function() {
      if ((Le & 2) !== 0) throw Error(r(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function fg(e, t) {
    return Hr(4, 2, e, t);
  }
  function dg(e, t) {
    return Hr(4, 4, e, t);
  }
  function hg(e, t) {
    if (typeof t == "function") {
      e = e();
      var a = t(e);
      return function() {
        typeof a == "function" ? a() : t(null);
      };
    }
    if (t != null)
      return e = e(), t.current = e, function() {
        t.current = null;
      };
  }
  function gg(e, t, a) {
    a = a != null ? a.concat([e]) : null, Hr(4, 4, hg.bind(null, t, e), a);
  }
  function Mc() {
  }
  function mg(e, t) {
    var a = tt();
    t = t === void 0 ? null : t;
    var o = a.memoizedState;
    return t !== null && pc(t, o[1]) ? o[0] : (a.memoizedState = [e, t], e);
  }
  function pg(e, t) {
    var a = tt();
    t = t === void 0 ? null : t;
    var o = a.memoizedState;
    if (t !== null && pc(t, o[1]))
      return o[0];
    if (o = e(), ti) {
      dn(!0);
      try {
        e();
      } finally {
        dn(!1);
      }
    }
    return a.memoizedState = [o, t], o;
  }
  function Tc(e, t, a) {
    return a === void 0 || (kn & 1073741824) !== 0 && (je & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = a, e = ym(), Ne.lanes |= e, ya |= e, a);
  }
  function yg(e, t, a, o) {
    return Rt(a, t) ? a : Ii.current !== null ? (e = Tc(e, a, o), Rt(e, t) || (lt = !0), e) : (kn & 42) === 0 || (kn & 1073741824) !== 0 && (je & 261930) === 0 ? (lt = !0, e.memoizedState = a) : (e = ym(), Ne.lanes |= e, ya |= e, t);
  }
  function vg(e, t, a, o, u) {
    var d = z.p;
    z.p = d !== 0 && 8 > d ? d : 8;
    var w = _.T, R = {};
    _.T = R, Dc(e, !1, t, a);
    try {
      var W = u(), le = _.S;
      if (le !== null && le(R, W), W !== null && typeof W == "object" && typeof W.then == "function") {
        var ue = lx(
          W,
          o
        );
        $o(
          e,
          t,
          ue,
          Vt(e)
        );
      } else
        $o(
          e,
          t,
          o,
          Vt(e)
        );
    } catch (fe) {
      $o(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: fe },
        Vt()
      );
    } finally {
      z.p = d, w !== null && R.types !== null && (w.types = R.types), _.T = w;
    }
  }
  function dx() {
  }
  function jc(e, t, a, o) {
    if (e.tag !== 5) throw Error(r(476));
    var u = bg(e).queue;
    vg(
      e,
      u,
      t,
      B,
      a === null ? dx : function() {
        return xg(e), a(o);
      }
    );
  }
  function bg(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: B,
      baseState: B,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Hn,
        lastRenderedState: B
      },
      next: null
    };
    var a = {};
    return t.next = {
      memoizedState: a,
      baseState: a,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Hn,
        lastRenderedState: a
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function xg(e) {
    var t = bg(e);
    t.next === null && (t = e.alternate.memoizedState), $o(
      e,
      t.next.queue,
      {},
      Vt()
    );
  }
  function Ac() {
    return mt(ul);
  }
  function wg() {
    return tt().memoizedState;
  }
  function Sg() {
    return tt().memoizedState;
  }
  function hx(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = Vt();
          e = fa(a);
          var o = da(t, e, a);
          o !== null && (Dt(o, t, a), Yo(o, t, a)), t = { cache: oc() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function gx(e, t, a) {
    var o = Vt();
    a = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Br(e) ? _g(t, a) : (a = Qu(e, t, a, o), a !== null && (Dt(a, e, o), Ng(a, t, o)));
  }
  function Eg(e, t, a) {
    var o = Vt();
    $o(e, t, a, o);
  }
  function $o(e, t, a, o) {
    var u = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Br(e)) _g(t, u);
    else {
      var d = e.alternate;
      if (e.lanes === 0 && (d === null || d.lanes === 0) && (d = t.lastRenderedReducer, d !== null))
        try {
          var w = t.lastRenderedState, R = d(w, a);
          if (u.hasEagerState = !0, u.eagerState = R, Rt(R, w))
            return yr(e, t, u, 0), Ge === null && pr(), !1;
        } catch {
        }
      if (a = Qu(e, t, u, o), a !== null)
        return Dt(a, e, o), Ng(a, t, o), !0;
    }
    return !1;
  }
  function Dc(e, t, a, o) {
    if (o = {
      lane: 2,
      revertLane: cf(),
      gesture: null,
      action: o,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Br(e)) {
      if (t) throw Error(r(479));
    } else
      t = Qu(
        e,
        a,
        o,
        2
      ), t !== null && Dt(t, e, 2);
  }
  function Br(e) {
    var t = e.alternate;
    return e === Ne || t !== null && t === Ne;
  }
  function _g(e, t) {
    qi = Ar = !0;
    var a = e.pending;
    a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
  }
  function Ng(e, t, a) {
    if ((a & 4194048) !== 0) {
      var o = t.lanes;
      o &= e.pendingLanes, a |= o, t.lanes = a, Jl(e, a);
    }
  }
  var Zo = {
    readContext: mt,
    use: zr,
    useCallback: We,
    useContext: We,
    useEffect: We,
    useImperativeHandle: We,
    useLayoutEffect: We,
    useInsertionEffect: We,
    useMemo: We,
    useReducer: We,
    useRef: We,
    useState: We,
    useDebugValue: We,
    useDeferredValue: We,
    useTransition: We,
    useSyncExternalStore: We,
    useId: We,
    useHostTransitionStatus: We,
    useFormState: We,
    useActionState: We,
    useOptimistic: We,
    useMemoCache: We,
    useCacheRefresh: We
  };
  Zo.useEffectEvent = We;
  var Cg = {
    readContext: mt,
    use: zr,
    useCallback: function(e, t) {
      return St().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: mt,
    useEffect: ug,
    useImperativeHandle: function(e, t, a) {
      a = a != null ? a.concat([e]) : null, kr(
        4194308,
        4,
        hg.bind(null, t, e),
        a
      );
    },
    useLayoutEffect: function(e, t) {
      return kr(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      kr(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var a = St();
      t = t === void 0 ? null : t;
      var o = e();
      if (ti) {
        dn(!0);
        try {
          e();
        } finally {
          dn(!1);
        }
      }
      return a.memoizedState = [o, t], o;
    },
    useReducer: function(e, t, a) {
      var o = St();
      if (a !== void 0) {
        var u = a(t);
        if (ti) {
          dn(!0);
          try {
            a(t);
          } finally {
            dn(!1);
          }
        }
      } else u = t;
      return o.memoizedState = o.baseState = u, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: u
      }, o.queue = e, e = e.dispatch = gx.bind(
        null,
        Ne,
        e
      ), [o.memoizedState, e];
    },
    useRef: function(e) {
      var t = St();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = _c(e);
      var t = e.queue, a = Eg.bind(null, Ne, t);
      return t.dispatch = a, [e.memoizedState, a];
    },
    useDebugValue: Mc,
    useDeferredValue: function(e, t) {
      var a = St();
      return Tc(a, e, t);
    },
    useTransition: function() {
      var e = _c(!1);
      return e = vg.bind(
        null,
        Ne,
        e.queue,
        !0,
        !1
      ), St().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, a) {
      var o = Ne, u = St();
      if (Oe) {
        if (a === void 0)
          throw Error(r(407));
        a = a();
      } else {
        if (a = t(), Ge === null)
          throw Error(r(349));
        (je & 127) !== 0 || Zh(o, t, a);
      }
      u.memoizedState = a;
      var d = { value: a, getSnapshot: t };
      return u.queue = d, ug(Kh.bind(null, o, d, e), [
        e
      ]), o.flags |= 2048, Gi(
        9,
        { destroy: void 0 },
        Qh.bind(
          null,
          o,
          d,
          a,
          t
        ),
        null
      ), a;
    },
    useId: function() {
      var e = St(), t = Ge.identifierPrefix;
      if (Oe) {
        var a = mn, o = gn;
        a = (o & ~(1 << 32 - wt(o) - 1)).toString(32) + a, t = "_" + t + "R_" + a, a = Dr++, 0 < a && (t += "H" + a.toString(32)), t += "_";
      } else
        a = rx++, t = "_" + t + "r_" + a.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Ac,
    useFormState: ig,
    useActionState: ig,
    useOptimistic: function(e) {
      var t = St();
      t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = a, t = Dc.bind(
        null,
        Ne,
        !0,
        a
      ), a.dispatch = t, [e, t];
    },
    useMemoCache: wc,
    useCacheRefresh: function() {
      return St().memoizedState = hx.bind(
        null,
        Ne
      );
    },
    useEffectEvent: function(e) {
      var t = St(), a = { impl: e };
      return t.memoizedState = a, function() {
        if ((Le & 2) !== 0)
          throw Error(r(440));
        return a.impl.apply(void 0, arguments);
      };
    }
  }, Oc = {
    readContext: mt,
    use: zr,
    useCallback: mg,
    useContext: mt,
    useEffect: Cc,
    useImperativeHandle: gg,
    useInsertionEffect: fg,
    useLayoutEffect: dg,
    useMemo: pg,
    useReducer: Rr,
    useRef: sg,
    useState: function() {
      return Rr(Hn);
    },
    useDebugValue: Mc,
    useDeferredValue: function(e, t) {
      var a = tt();
      return yg(
        a,
        Ie.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Rr(Hn)[0], t = tt().memoizedState;
      return [
        typeof e == "boolean" ? e : Go(e),
        t
      ];
    },
    useSyncExternalStore: $h,
    useId: wg,
    useHostTransitionStatus: Ac,
    useFormState: og,
    useActionState: og,
    useOptimistic: function(e, t) {
      var a = tt();
      return Fh(a, Ie, e, t);
    },
    useMemoCache: wc,
    useCacheRefresh: Sg
  };
  Oc.useEffectEvent = cg;
  var Mg = {
    readContext: mt,
    use: zr,
    useCallback: mg,
    useContext: mt,
    useEffect: Cc,
    useImperativeHandle: gg,
    useInsertionEffect: fg,
    useLayoutEffect: dg,
    useMemo: pg,
    useReducer: Ec,
    useRef: sg,
    useState: function() {
      return Ec(Hn);
    },
    useDebugValue: Mc,
    useDeferredValue: function(e, t) {
      var a = tt();
      return Ie === null ? Tc(a, e, t) : yg(
        a,
        Ie.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Ec(Hn)[0], t = tt().memoizedState;
      return [
        typeof e == "boolean" ? e : Go(e),
        t
      ];
    },
    useSyncExternalStore: $h,
    useId: wg,
    useHostTransitionStatus: Ac,
    useFormState: rg,
    useActionState: rg,
    useOptimistic: function(e, t) {
      var a = tt();
      return Ie !== null ? Fh(a, Ie, e, t) : (a.baseState = e, [e, a.queue.dispatch]);
    },
    useMemoCache: wc,
    useCacheRefresh: Sg
  };
  Mg.useEffectEvent = cg;
  function zc(e, t, a, o) {
    t = e.memoizedState, a = a(o, t), a = a == null ? t : p({}, t, a), e.memoizedState = a, e.lanes === 0 && (e.updateQueue.baseState = a);
  }
  var Rc = {
    enqueueSetState: function(e, t, a) {
      e = e._reactInternals;
      var o = Vt(), u = fa(o);
      u.payload = t, a != null && (u.callback = a), t = da(e, u, o), t !== null && (Dt(t, e, o), Yo(t, e, o));
    },
    enqueueReplaceState: function(e, t, a) {
      e = e._reactInternals;
      var o = Vt(), u = fa(o);
      u.tag = 1, u.payload = t, a != null && (u.callback = a), t = da(e, u, o), t !== null && (Dt(t, e, o), Yo(t, e, o));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var a = Vt(), o = fa(a);
      o.tag = 2, t != null && (o.callback = t), t = da(e, o, a), t !== null && (Dt(t, e, a), Yo(t, e, a));
    }
  };
  function Tg(e, t, a, o, u, d, w) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(o, d, w) : t.prototype && t.prototype.isPureReactComponent ? !zo(a, o) || !zo(u, d) : !0;
  }
  function jg(e, t, a, o) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, o), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, o), t.state !== e && Rc.enqueueReplaceState(t, t.state, null);
  }
  function ni(e, t) {
    var a = t;
    if ("ref" in t) {
      a = {};
      for (var o in t)
        o !== "ref" && (a[o] = t[o]);
    }
    if (e = e.defaultProps) {
      a === t && (a = p({}, a));
      for (var u in e)
        a[u] === void 0 && (a[u] = e[u]);
    }
    return a;
  }
  function Ag(e) {
    mr(e);
  }
  function Dg(e) {
    console.error(e);
  }
  function Og(e) {
    mr(e);
  }
  function Lr(e, t) {
    try {
      var a = e.onUncaughtError;
      a(t.value, { componentStack: t.stack });
    } catch (o) {
      setTimeout(function() {
        throw o;
      });
    }
  }
  function zg(e, t, a) {
    try {
      var o = e.onCaughtError;
      o(a.value, {
        componentStack: a.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function kc(e, t, a) {
    return a = fa(a), a.tag = 3, a.payload = { element: null }, a.callback = function() {
      Lr(e, t);
    }, a;
  }
  function Rg(e) {
    return e = fa(e), e.tag = 3, e;
  }
  function kg(e, t, a, o) {
    var u = a.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var d = o.value;
      e.payload = function() {
        return u(d);
      }, e.callback = function() {
        zg(t, a, o);
      };
    }
    var w = a.stateNode;
    w !== null && typeof w.componentDidCatch == "function" && (e.callback = function() {
      zg(t, a, o), typeof u != "function" && (va === null ? va = /* @__PURE__ */ new Set([this]) : va.add(this));
      var R = o.stack;
      this.componentDidCatch(o.value, {
        componentStack: R !== null ? R : ""
      });
    });
  }
  function mx(e, t, a, o, u) {
    if (a.flags |= 32768, o !== null && typeof o == "object" && typeof o.then == "function") {
      if (t = a.alternate, t !== null && Bi(
        t,
        a,
        u,
        !0
      ), a = Ht.current, a !== null) {
        switch (a.tag) {
          case 31:
          case 13:
            return Kt === null ? Jr() : a.alternate === null && Fe === 0 && (Fe = 3), a.flags &= -257, a.flags |= 65536, a.lanes = u, o === Nr ? a.flags |= 16384 : (t = a.updateQueue, t === null ? a.updateQueue = /* @__PURE__ */ new Set([o]) : t.add(o), rf(e, o, u)), !1;
          case 22:
            return a.flags |= 65536, o === Nr ? a.flags |= 16384 : (t = a.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([o])
            }, a.updateQueue = t) : (a = t.retryQueue, a === null ? t.retryQueue = /* @__PURE__ */ new Set([o]) : a.add(o)), rf(e, o, u)), !1;
        }
        throw Error(r(435, a.tag));
      }
      return rf(e, o, u), Jr(), !1;
    }
    if (Oe)
      return t = Ht.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = u, o !== ec && (e = Error(r(422), { cause: o }), Ho(Gt(e, a)))) : (o !== ec && (t = Error(r(423), {
        cause: o
      }), Ho(
        Gt(t, a)
      )), e = e.current.alternate, e.flags |= 65536, u &= -u, e.lanes |= u, o = Gt(o, a), u = kc(
        e.stateNode,
        o,
        u
      ), fc(e, u), Fe !== 4 && (Fe = 2)), !1;
    var d = Error(r(520), { cause: o });
    if (d = Gt(d, a), tl === null ? tl = [d] : tl.push(d), Fe !== 4 && (Fe = 2), t === null) return !0;
    o = Gt(o, a), a = t;
    do {
      switch (a.tag) {
        case 3:
          return a.flags |= 65536, e = u & -u, a.lanes |= e, e = kc(a.stateNode, o, e), fc(a, e), !1;
        case 1:
          if (t = a.type, d = a.stateNode, (a.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || d !== null && typeof d.componentDidCatch == "function" && (va === null || !va.has(d))))
            return a.flags |= 65536, u &= -u, a.lanes |= u, u = Rg(u), kg(
              u,
              e,
              a,
              o
            ), fc(a, u), !1;
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var Hc = Error(r(461)), lt = !1;
  function pt(e, t, a, o) {
    t.child = e === null ? Uh(t, null, a, o) : ei(
      t,
      e.child,
      a,
      o
    );
  }
  function Hg(e, t, a, o, u) {
    a = a.render;
    var d = t.ref;
    if ("ref" in o) {
      var w = {};
      for (var R in o)
        R !== "ref" && (w[R] = o[R]);
    } else w = o;
    return Ja(t), o = yc(
      e,
      t,
      a,
      w,
      d,
      u
    ), R = vc(), e !== null && !lt ? (bc(e, t, u), Bn(e, t, u)) : (Oe && R && Fu(t), t.flags |= 1, pt(e, t, o, u), t.child);
  }
  function Bg(e, t, a, o, u) {
    if (e === null) {
      var d = a.type;
      return typeof d == "function" && !Ku(d) && d.defaultProps === void 0 && a.compare === null ? (t.tag = 15, t.type = d, Lg(
        e,
        t,
        d,
        o,
        u
      )) : (e = br(
        a.type,
        null,
        o,
        t,
        t.mode,
        u
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (d = e.child, !Xc(e, u)) {
      var w = d.memoizedProps;
      if (a = a.compare, a = a !== null ? a : zo, a(w, o) && e.ref === t.ref)
        return Bn(e, t, u);
    }
    return t.flags |= 1, e = Dn(d, o), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Lg(e, t, a, o, u) {
    if (e !== null) {
      var d = e.memoizedProps;
      if (zo(d, o) && e.ref === t.ref)
        if (lt = !1, t.pendingProps = o = d, Xc(e, u))
          (e.flags & 131072) !== 0 && (lt = !0);
        else
          return t.lanes = e.lanes, Bn(e, t, u);
    }
    return Bc(
      e,
      t,
      a,
      o,
      u
    );
  }
  function Ug(e, t, a, o) {
    var u = o.children, d = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), o.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (d = d !== null ? d.baseLanes | a : a, e !== null) {
          for (o = t.child = e.child, u = 0; o !== null; )
            u = u | o.lanes | o.childLanes, o = o.sibling;
          o = u & ~d;
        } else o = 0, t.child = null;
        return Vg(
          e,
          t,
          d,
          a,
          o
        );
      }
      if ((a & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Er(
          t,
          d !== null ? d.cachePool : null
        ), d !== null ? Ih(t, d) : hc(), qh(t);
      else
        return o = t.lanes = 536870912, Vg(
          e,
          t,
          d !== null ? d.baseLanes | a : a,
          a,
          o
        );
    } else
      d !== null ? (Er(t, d.cachePool), Ih(t, d), ga(), t.memoizedState = null) : (e !== null && Er(t, null), hc(), ga());
    return pt(e, t, u, a), t.child;
  }
  function Qo(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Vg(e, t, a, o, u) {
    var d = rc();
    return d = d === null ? null : { parent: it._currentValue, pool: d }, t.memoizedState = {
      baseLanes: a,
      cachePool: d
    }, e !== null && Er(t, null), hc(), qh(t), e !== null && Bi(e, t, o, !0), t.childLanes = u, null;
  }
  function Ur(e, t) {
    return t = Yr(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Yg(e, t, a) {
    return ei(t, e.child, null, a), e = Ur(t, t.pendingProps), e.flags |= 2, Bt(t), t.memoizedState = null, e;
  }
  function px(e, t, a) {
    var o = t.pendingProps, u = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (Oe) {
        if (o.mode === "hidden")
          return e = Ur(t, o), t.lanes = 536870912, Qo(null, e);
        if (mc(t), (e = $e) ? (e = Pm(
          e,
          Qt
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: la !== null ? { id: gn, overflow: mn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = _h(e), a.return = t, t.child = a, gt = t, $e = null)) : e = null, e === null) throw sa(t);
        return t.lanes = 536870912, null;
      }
      return Ur(t, o);
    }
    var d = e.memoizedState;
    if (d !== null) {
      var w = d.dehydrated;
      if (mc(t), u)
        if (t.flags & 256)
          t.flags &= -257, t = Yg(
            e,
            t,
            a
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(r(558));
      else if (lt || Bi(e, t, a, !1), u = (a & e.childLanes) !== 0, lt || u) {
        if (o = Ge, o !== null && (w = Wl(o, a), w !== 0 && w !== d.retryLane))
          throw d.retryLane = w, $a(e, w), Dt(o, e, w), Hc;
        Jr(), t = Yg(
          e,
          t,
          a
        );
      } else
        e = d.treeContext, $e = Jt(w.nextSibling), gt = t, Oe = !0, ra = null, Qt = !1, e !== null && Mh(t, e), t = Ur(t, o), t.flags |= 4096;
      return t;
    }
    return e = Dn(e.child, {
      mode: o.mode,
      children: o.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Vr(e, t) {
    var a = t.ref;
    if (a === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != "function" && typeof a != "object")
        throw Error(r(284));
      (e === null || e.ref !== a) && (t.flags |= 4194816);
    }
  }
  function Bc(e, t, a, o, u) {
    return Ja(t), a = yc(
      e,
      t,
      a,
      o,
      void 0,
      u
    ), o = vc(), e !== null && !lt ? (bc(e, t, u), Bn(e, t, u)) : (Oe && o && Fu(t), t.flags |= 1, pt(e, t, a, u), t.child);
  }
  function Ig(e, t, a, o, u, d) {
    return Ja(t), t.updateQueue = null, a = Gh(
      t,
      o,
      a,
      u
    ), Xh(e), o = vc(), e !== null && !lt ? (bc(e, t, d), Bn(e, t, d)) : (Oe && o && Fu(t), t.flags |= 1, pt(e, t, a, d), t.child);
  }
  function qg(e, t, a, o, u) {
    if (Ja(t), t.stateNode === null) {
      var d = zi, w = a.contextType;
      typeof w == "object" && w !== null && (d = mt(w)), d = new a(o, d), t.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null, d.updater = Rc, t.stateNode = d, d._reactInternals = t, d = t.stateNode, d.props = o, d.state = t.memoizedState, d.refs = {}, uc(t), w = a.contextType, d.context = typeof w == "object" && w !== null ? mt(w) : zi, d.state = t.memoizedState, w = a.getDerivedStateFromProps, typeof w == "function" && (zc(
        t,
        a,
        w,
        o
      ), d.state = t.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof d.getSnapshotBeforeUpdate == "function" || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (w = d.state, typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(), w !== d.state && Rc.enqueueReplaceState(d, d.state, null), qo(t, o, d, u), Io(), d.state = t.memoizedState), typeof d.componentDidMount == "function" && (t.flags |= 4194308), o = !0;
    } else if (e === null) {
      d = t.stateNode;
      var R = t.memoizedProps, W = ni(a, R);
      d.props = W;
      var le = d.context, ue = a.contextType;
      w = zi, typeof ue == "object" && ue !== null && (w = mt(ue));
      var fe = a.getDerivedStateFromProps;
      ue = typeof fe == "function" || typeof d.getSnapshotBeforeUpdate == "function", R = t.pendingProps !== R, ue || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (R || le !== w) && jg(
        t,
        d,
        o,
        w
      ), ca = !1;
      var re = t.memoizedState;
      d.state = re, qo(t, o, d, u), Io(), le = t.memoizedState, R || re !== le || ca ? (typeof fe == "function" && (zc(
        t,
        a,
        fe,
        o
      ), le = t.memoizedState), (W = ca || Tg(
        t,
        a,
        W,
        o,
        re,
        le,
        w
      )) ? (ue || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount()), typeof d.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof d.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = o, t.memoizedState = le), d.props = o, d.state = le, d.context = w, o = W) : (typeof d.componentDidMount == "function" && (t.flags |= 4194308), o = !1);
    } else {
      d = t.stateNode, cc(e, t), w = t.memoizedProps, ue = ni(a, w), d.props = ue, fe = t.pendingProps, re = d.context, le = a.contextType, W = zi, typeof le == "object" && le !== null && (W = mt(le)), R = a.getDerivedStateFromProps, (le = typeof R == "function" || typeof d.getSnapshotBeforeUpdate == "function") || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (w !== fe || re !== W) && jg(
        t,
        d,
        o,
        W
      ), ca = !1, re = t.memoizedState, d.state = re, qo(t, o, d, u), Io();
      var se = t.memoizedState;
      w !== fe || re !== se || ca || e !== null && e.dependencies !== null && wr(e.dependencies) ? (typeof R == "function" && (zc(
        t,
        a,
        R,
        o
      ), se = t.memoizedState), (ue = ca || Tg(
        t,
        a,
        ue,
        o,
        re,
        se,
        W
      ) || e !== null && e.dependencies !== null && wr(e.dependencies)) ? (le || typeof d.UNSAFE_componentWillUpdate != "function" && typeof d.componentWillUpdate != "function" || (typeof d.componentWillUpdate == "function" && d.componentWillUpdate(o, se, W), typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(
        o,
        se,
        W
      )), typeof d.componentDidUpdate == "function" && (t.flags |= 4), typeof d.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof d.componentDidUpdate != "function" || w === e.memoizedProps && re === e.memoizedState || (t.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || w === e.memoizedProps && re === e.memoizedState || (t.flags |= 1024), t.memoizedProps = o, t.memoizedState = se), d.props = o, d.state = se, d.context = W, o = ue) : (typeof d.componentDidUpdate != "function" || w === e.memoizedProps && re === e.memoizedState || (t.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || w === e.memoizedProps && re === e.memoizedState || (t.flags |= 1024), o = !1);
    }
    return d = o, Vr(e, t), o = (t.flags & 128) !== 0, d || o ? (d = t.stateNode, a = o && typeof a.getDerivedStateFromError != "function" ? null : d.render(), t.flags |= 1, e !== null && o ? (t.child = ei(
      t,
      e.child,
      null,
      u
    ), t.child = ei(
      t,
      null,
      a,
      u
    )) : pt(e, t, a, u), t.memoizedState = d.state, e = t.child) : e = Bn(
      e,
      t,
      u
    ), e;
  }
  function Xg(e, t, a, o) {
    return Qa(), t.flags |= 256, pt(e, t, a, o), t.child;
  }
  var Lc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Uc(e) {
    return { baseLanes: e, cachePool: zh() };
  }
  function Vc(e, t, a) {
    return e = e !== null ? e.childLanes & ~a : 0, t && (e |= Ut), e;
  }
  function Gg(e, t, a) {
    var o = t.pendingProps, u = !1, d = (t.flags & 128) !== 0, w;
    if ((w = d) || (w = e !== null && e.memoizedState === null ? !1 : (et.current & 2) !== 0), w && (u = !0, t.flags &= -129), w = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (Oe) {
        if (u ? ha(t) : ga(), (e = $e) ? (e = Pm(
          e,
          Qt
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: la !== null ? { id: gn, overflow: mn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = _h(e), a.return = t, t.child = a, gt = t, $e = null)) : e = null, e === null) throw sa(t);
        return Ef(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var R = o.children;
      return o = o.fallback, u ? (ga(), u = t.mode, R = Yr(
        { mode: "hidden", children: R },
        u
      ), o = Za(
        o,
        u,
        a,
        null
      ), R.return = t, o.return = t, R.sibling = o, t.child = R, o = t.child, o.memoizedState = Uc(a), o.childLanes = Vc(
        e,
        w,
        a
      ), t.memoizedState = Lc, Qo(null, o)) : (ha(t), Yc(t, R));
    }
    var W = e.memoizedState;
    if (W !== null && (R = W.dehydrated, R !== null)) {
      if (d)
        t.flags & 256 ? (ha(t), t.flags &= -257, t = Ic(
          e,
          t,
          a
        )) : t.memoizedState !== null ? (ga(), t.child = e.child, t.flags |= 128, t = null) : (ga(), R = o.fallback, u = t.mode, o = Yr(
          { mode: "visible", children: o.children },
          u
        ), R = Za(
          R,
          u,
          a,
          null
        ), R.flags |= 2, o.return = t, R.return = t, o.sibling = R, t.child = o, ei(
          t,
          e.child,
          null,
          a
        ), o = t.child, o.memoizedState = Uc(a), o.childLanes = Vc(
          e,
          w,
          a
        ), t.memoizedState = Lc, t = Qo(null, o));
      else if (ha(t), Ef(R)) {
        if (w = R.nextSibling && R.nextSibling.dataset, w) var le = w.dgst;
        w = le, o = Error(r(419)), o.stack = "", o.digest = w, Ho({ value: o, source: null, stack: null }), t = Ic(
          e,
          t,
          a
        );
      } else if (lt || Bi(e, t, a, !1), w = (a & e.childLanes) !== 0, lt || w) {
        if (w = Ge, w !== null && (o = Wl(w, a), o !== 0 && o !== W.retryLane))
          throw W.retryLane = o, $a(e, o), Dt(w, e, o), Hc;
        Sf(R) || Jr(), t = Ic(
          e,
          t,
          a
        );
      } else
        Sf(R) ? (t.flags |= 192, t.child = e.child, t = null) : (e = W.treeContext, $e = Jt(
          R.nextSibling
        ), gt = t, Oe = !0, ra = null, Qt = !1, e !== null && Mh(t, e), t = Yc(
          t,
          o.children
        ), t.flags |= 4096);
      return t;
    }
    return u ? (ga(), R = o.fallback, u = t.mode, W = e.child, le = W.sibling, o = Dn(W, {
      mode: "hidden",
      children: o.children
    }), o.subtreeFlags = W.subtreeFlags & 65011712, le !== null ? R = Dn(
      le,
      R
    ) : (R = Za(
      R,
      u,
      a,
      null
    ), R.flags |= 2), R.return = t, o.return = t, o.sibling = R, t.child = o, Qo(null, o), o = t.child, R = e.child.memoizedState, R === null ? R = Uc(a) : (u = R.cachePool, u !== null ? (W = it._currentValue, u = u.parent !== W ? { parent: W, pool: W } : u) : u = zh(), R = {
      baseLanes: R.baseLanes | a,
      cachePool: u
    }), o.memoizedState = R, o.childLanes = Vc(
      e,
      w,
      a
    ), t.memoizedState = Lc, Qo(e.child, o)) : (ha(t), a = e.child, e = a.sibling, a = Dn(a, {
      mode: "visible",
      children: o.children
    }), a.return = t, a.sibling = null, e !== null && (w = t.deletions, w === null ? (t.deletions = [e], t.flags |= 16) : w.push(e)), t.child = a, t.memoizedState = null, a);
  }
  function Yc(e, t) {
    return t = Yr(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function Yr(e, t) {
    return e = kt(22, e, null, t), e.lanes = 0, e;
  }
  function Ic(e, t, a) {
    return ei(t, e.child, null, a), e = Yc(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function $g(e, t, a) {
    e.lanes |= t;
    var o = e.alternate;
    o !== null && (o.lanes |= t), ac(e.return, t, a);
  }
  function qc(e, t, a, o, u, d) {
    var w = e.memoizedState;
    w === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: o,
      tail: a,
      tailMode: u,
      treeForkCount: d
    } : (w.isBackwards = t, w.rendering = null, w.renderingStartTime = 0, w.last = o, w.tail = a, w.tailMode = u, w.treeForkCount = d);
  }
  function Zg(e, t, a) {
    var o = t.pendingProps, u = o.revealOrder, d = o.tail;
    o = o.children;
    var w = et.current, R = (w & 2) !== 0;
    if (R ? (w = w & 1 | 2, t.flags |= 128) : w &= 1, G(et, w), pt(e, t, o, a), o = Oe ? ko : 0, !R && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && $g(e, a, t);
        else if (e.tag === 19)
          $g(e, a, t);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t)
            break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    switch (u) {
      case "forwards":
        for (a = t.child, u = null; a !== null; )
          e = a.alternate, e !== null && jr(e) === null && (u = a), a = a.sibling;
        a = u, a === null ? (u = t.child, t.child = null) : (u = a.sibling, a.sibling = null), qc(
          t,
          !1,
          u,
          a,
          d,
          o
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (a = null, u = t.child, t.child = null; u !== null; ) {
          if (e = u.alternate, e !== null && jr(e) === null) {
            t.child = u;
            break;
          }
          e = u.sibling, u.sibling = a, a = u, u = e;
        }
        qc(
          t,
          !0,
          a,
          null,
          d,
          o
        );
        break;
      case "together":
        qc(
          t,
          !1,
          null,
          null,
          void 0,
          o
        );
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Bn(e, t, a) {
    if (e !== null && (t.dependencies = e.dependencies), ya |= t.lanes, (a & t.childLanes) === 0)
      if (e !== null) {
        if (Bi(
          e,
          t,
          a,
          !1
        ), (a & t.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && t.child !== e.child)
      throw Error(r(153));
    if (t.child !== null) {
      for (e = t.child, a = Dn(e, e.pendingProps), t.child = a, a.return = t; e.sibling !== null; )
        e = e.sibling, a = a.sibling = Dn(e, e.pendingProps), a.return = t;
      a.sibling = null;
    }
    return t.child;
  }
  function Xc(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && wr(e)));
  }
  function yx(e, t, a) {
    switch (t.tag) {
      case 3:
        P(t, t.stateNode.containerInfo), ua(t, it, e.memoizedState.cache), Qa();
        break;
      case 27:
      case 5:
        de(t);
        break;
      case 4:
        P(t, t.stateNode.containerInfo);
        break;
      case 10:
        ua(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, mc(t), null;
        break;
      case 13:
        var o = t.memoizedState;
        if (o !== null)
          return o.dehydrated !== null ? (ha(t), t.flags |= 128, null) : (a & t.child.childLanes) !== 0 ? Gg(e, t, a) : (ha(t), e = Bn(
            e,
            t,
            a
          ), e !== null ? e.sibling : null);
        ha(t);
        break;
      case 19:
        var u = (e.flags & 128) !== 0;
        if (o = (a & t.childLanes) !== 0, o || (Bi(
          e,
          t,
          a,
          !1
        ), o = (a & t.childLanes) !== 0), u) {
          if (o)
            return Zg(
              e,
              t,
              a
            );
          t.flags |= 128;
        }
        if (u = t.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), G(et, et.current), o) break;
        return null;
      case 22:
        return t.lanes = 0, Ug(
          e,
          t,
          a,
          t.pendingProps
        );
      case 24:
        ua(t, it, e.memoizedState.cache);
    }
    return Bn(e, t, a);
  }
  function Qg(e, t, a) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        lt = !0;
      else {
        if (!Xc(e, a) && (t.flags & 128) === 0)
          return lt = !1, yx(
            e,
            t,
            a
          );
        lt = (e.flags & 131072) !== 0;
      }
    else
      lt = !1, Oe && (t.flags & 1048576) !== 0 && Ch(t, ko, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var o = t.pendingProps;
          if (e = Fa(t.elementType), t.type = e, typeof e == "function")
            Ku(e) ? (o = ni(e, o), t.tag = 1, t = qg(
              null,
              t,
              e,
              o,
              a
            )) : (t.tag = 0, t = Bc(
              null,
              t,
              e,
              o,
              a
            ));
          else {
            if (e != null) {
              var u = e.$$typeof;
              if (u === N) {
                t.tag = 11, t = Hg(
                  null,
                  t,
                  e,
                  o,
                  a
                );
                break e;
              } else if (u === V) {
                t.tag = 14, t = Bg(
                  null,
                  t,
                  e,
                  o,
                  a
                );
                break e;
              }
            }
            throw t = M(e) || e, Error(r(306, t, ""));
          }
        }
        return t;
      case 0:
        return Bc(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 1:
        return o = t.type, u = ni(
          o,
          t.pendingProps
        ), qg(
          e,
          t,
          o,
          u,
          a
        );
      case 3:
        e: {
          if (P(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(r(387));
          o = t.pendingProps;
          var d = t.memoizedState;
          u = d.element, cc(e, t), qo(t, o, null, a);
          var w = t.memoizedState;
          if (o = w.cache, ua(t, it, o), o !== d.cache && ic(
            t,
            [it],
            a,
            !0
          ), Io(), o = w.element, d.isDehydrated)
            if (d = {
              element: o,
              isDehydrated: !1,
              cache: w.cache
            }, t.updateQueue.baseState = d, t.memoizedState = d, t.flags & 256) {
              t = Xg(
                e,
                t,
                o,
                a
              );
              break e;
            } else if (o !== u) {
              u = Gt(
                Error(r(424)),
                t
              ), Ho(u), t = Xg(
                e,
                t,
                o,
                a
              );
              break e;
            } else
              for (e = t.stateNode.containerInfo, e.nodeType === 9 ? e = e.body : e = e.nodeName === "HTML" ? e.ownerDocument.body : e, $e = Jt(e.firstChild), gt = t, Oe = !0, ra = null, Qt = !0, a = Uh(
                t,
                null,
                o,
                a
              ), t.child = a; a; )
                a.flags = a.flags & -3 | 4096, a = a.sibling;
          else {
            if (Qa(), o === u) {
              t = Bn(
                e,
                t,
                a
              );
              break e;
            }
            pt(e, t, o, a);
          }
          t = t.child;
        }
        return t;
      case 26:
        return Vr(e, t), e === null ? (a = op(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = a : Oe || (a = t.type, e = t.pendingProps, o = as(
          q.current
        ).createElement(a), o[ct] = t, o[vt] = e, yt(o, a, e), at(o), t.stateNode = o) : t.memoizedState = op(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return de(t), e === null && Oe && (o = t.stateNode = np(
          t.type,
          t.pendingProps,
          q.current
        ), gt = t, Qt = !0, u = $e, Sa(t.type) ? (_f = u, $e = Jt(o.firstChild)) : $e = u), pt(
          e,
          t,
          t.pendingProps.children,
          a
        ), Vr(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && Oe && ((u = o = $e) && (o = Zx(
          o,
          t.type,
          t.pendingProps,
          Qt
        ), o !== null ? (t.stateNode = o, gt = t, $e = Jt(o.firstChild), Qt = !1, u = !0) : u = !1), u || sa(t)), de(t), u = t.type, d = t.pendingProps, w = e !== null ? e.memoizedProps : null, o = d.children, bf(u, d) ? o = null : w !== null && bf(u, w) && (t.flags |= 32), t.memoizedState !== null && (u = yc(
          e,
          t,
          sx,
          null,
          null,
          a
        ), ul._currentValue = u), Vr(e, t), pt(e, t, o, a), t.child;
      case 6:
        return e === null && Oe && ((e = a = $e) && (a = Qx(
          a,
          t.pendingProps,
          Qt
        ), a !== null ? (t.stateNode = a, gt = t, $e = null, e = !0) : e = !1), e || sa(t)), null;
      case 13:
        return Gg(e, t, a);
      case 4:
        return P(
          t,
          t.stateNode.containerInfo
        ), o = t.pendingProps, e === null ? t.child = ei(
          t,
          null,
          o,
          a
        ) : pt(e, t, o, a), t.child;
      case 11:
        return Hg(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 7:
        return pt(
          e,
          t,
          t.pendingProps,
          a
        ), t.child;
      case 8:
        return pt(
          e,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 12:
        return pt(
          e,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 10:
        return o = t.pendingProps, ua(t, t.type, o.value), pt(e, t, o.children, a), t.child;
      case 9:
        return u = t.type._context, o = t.pendingProps.children, Ja(t), u = mt(u), o = o(u), t.flags |= 1, pt(e, t, o, a), t.child;
      case 14:
        return Bg(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 15:
        return Lg(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 19:
        return Zg(e, t, a);
      case 31:
        return px(e, t, a);
      case 22:
        return Ug(
          e,
          t,
          a,
          t.pendingProps
        );
      case 24:
        return Ja(t), o = mt(it), e === null ? (u = rc(), u === null && (u = Ge, d = oc(), u.pooledCache = d, d.refCount++, d !== null && (u.pooledCacheLanes |= a), u = d), t.memoizedState = { parent: o, cache: u }, uc(t), ua(t, it, u)) : ((e.lanes & a) !== 0 && (cc(e, t), qo(t, null, null, a), Io()), u = e.memoizedState, d = t.memoizedState, u.parent !== o ? (u = { parent: o, cache: o }, t.memoizedState = u, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u), ua(t, it, o)) : (o = d.cache, ua(t, it, o), o !== u.cache && ic(
          t,
          [it],
          a,
          !0
        ))), pt(
          e,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(r(156, t.tag));
  }
  function Ln(e) {
    e.flags |= 4;
  }
  function Gc(e, t, a, o, u) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (u & 335544128) === u)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (wm()) e.flags |= 8192;
        else
          throw Pa = Nr, sc;
    } else e.flags &= -16777217;
  }
  function Kg(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !cp(t))
      if (wm()) e.flags |= 8192;
      else
        throw Pa = Nr, sc;
  }
  function Ir(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Ql() : 536870912, e.lanes |= t, Ki |= t);
  }
  function Ko(e, t) {
    if (!Oe)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var a = null; t !== null; )
            t.alternate !== null && (a = t), t = t.sibling;
          a === null ? e.tail = null : a.sibling = null;
          break;
        case "collapsed":
          a = e.tail;
          for (var o = null; a !== null; )
            a.alternate !== null && (o = a), a = a.sibling;
          o === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : o.sibling = null;
      }
  }
  function Ze(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, a = 0, o = 0;
    if (t)
      for (var u = e.child; u !== null; )
        a |= u.lanes | u.childLanes, o |= u.subtreeFlags & 65011712, o |= u.flags & 65011712, u.return = e, u = u.sibling;
    else
      for (u = e.child; u !== null; )
        a |= u.lanes | u.childLanes, o |= u.subtreeFlags, o |= u.flags, u.return = e, u = u.sibling;
    return e.subtreeFlags |= o, e.childLanes = a, t;
  }
  function vx(e, t, a) {
    var o = t.pendingProps;
    switch (Pu(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ze(t), null;
      case 1:
        return Ze(t), null;
      case 3:
        return a = t.stateNode, o = null, e !== null && (o = e.memoizedState.cache), t.memoizedState.cache !== o && (t.flags |= 2048), Rn(it), ie(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (e === null || e.child === null) && (Hi(t) ? Ln(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, tc())), Ze(t), null;
      case 26:
        var u = t.type, d = t.memoizedState;
        return e === null ? (Ln(t), d !== null ? (Ze(t), Kg(t, d)) : (Ze(t), Gc(
          t,
          u,
          null,
          o,
          a
        ))) : d ? d !== e.memoizedState ? (Ln(t), Ze(t), Kg(t, d)) : (Ze(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== o && Ln(t), Ze(t), Gc(
          t,
          u,
          e,
          o,
          a
        )), null;
      case 27:
        if (he(t), a = q.current, u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== o && Ln(t);
        else {
          if (!o) {
            if (t.stateNode === null)
              throw Error(r(166));
            return Ze(t), null;
          }
          e = H.current, Hi(t) ? Th(t) : (e = np(u, o, a), t.stateNode = e, Ln(t));
        }
        return Ze(t), null;
      case 5:
        if (he(t), u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== o && Ln(t);
        else {
          if (!o) {
            if (t.stateNode === null)
              throw Error(r(166));
            return Ze(t), null;
          }
          if (d = H.current, Hi(t))
            Th(t);
          else {
            var w = as(
              q.current
            );
            switch (d) {
              case 1:
                d = w.createElementNS(
                  "http://www.w3.org/2000/svg",
                  u
                );
                break;
              case 2:
                d = w.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  u
                );
                break;
              default:
                switch (u) {
                  case "svg":
                    d = w.createElementNS(
                      "http://www.w3.org/2000/svg",
                      u
                    );
                    break;
                  case "math":
                    d = w.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
                    );
                    break;
                  case "script":
                    d = w.createElement("div"), d.innerHTML = "<script><\/script>", d = d.removeChild(
                      d.firstChild
                    );
                    break;
                  case "select":
                    d = typeof o.is == "string" ? w.createElement("select", {
                      is: o.is
                    }) : w.createElement("select"), o.multiple ? d.multiple = !0 : o.size && (d.size = o.size);
                    break;
                  default:
                    d = typeof o.is == "string" ? w.createElement(u, { is: o.is }) : w.createElement(u);
                }
            }
            d[ct] = t, d[vt] = o;
            e: for (w = t.child; w !== null; ) {
              if (w.tag === 5 || w.tag === 6)
                d.appendChild(w.stateNode);
              else if (w.tag !== 4 && w.tag !== 27 && w.child !== null) {
                w.child.return = w, w = w.child;
                continue;
              }
              if (w === t) break e;
              for (; w.sibling === null; ) {
                if (w.return === null || w.return === t)
                  break e;
                w = w.return;
              }
              w.sibling.return = w.return, w = w.sibling;
            }
            t.stateNode = d;
            e: switch (yt(d, u, o), u) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                o = !!o.autoFocus;
                break e;
              case "img":
                o = !0;
                break e;
              default:
                o = !1;
            }
            o && Ln(t);
          }
        }
        return Ze(t), Gc(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          a
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== o && Ln(t);
        else {
          if (typeof o != "string" && t.stateNode === null)
            throw Error(r(166));
          if (e = q.current, Hi(t)) {
            if (e = t.stateNode, a = t.memoizedProps, o = null, u = gt, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  o = u.memoizedProps;
              }
            e[ct] = t, e = !!(e.nodeValue === a || o !== null && o.suppressHydrationWarning === !0 || Gm(e.nodeValue, a)), e || sa(t, !0);
          } else
            e = as(e).createTextNode(
              o
            ), e[ct] = t, t.stateNode = e;
        }
        return Ze(t), null;
      case 31:
        if (a = t.memoizedState, e === null || e.memoizedState !== null) {
          if (o = Hi(t), a !== null) {
            if (e === null) {
              if (!o) throw Error(r(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(r(557));
              e[ct] = t;
            } else
              Qa(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ze(t), e = !1;
          } else
            a = tc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), e = !0;
          if (!e)
            return t.flags & 256 ? (Bt(t), t) : (Bt(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(r(558));
        }
        return Ze(t), null;
      case 13:
        if (o = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (u = Hi(t), o !== null && o.dehydrated !== null) {
            if (e === null) {
              if (!u) throw Error(r(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(r(317));
              u[ct] = t;
            } else
              Qa(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ze(t), u = !1;
          } else
            u = tc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return t.flags & 256 ? (Bt(t), t) : (Bt(t), null);
        }
        return Bt(t), (t.flags & 128) !== 0 ? (t.lanes = a, t) : (a = o !== null, e = e !== null && e.memoizedState !== null, a && (o = t.child, u = null, o.alternate !== null && o.alternate.memoizedState !== null && o.alternate.memoizedState.cachePool !== null && (u = o.alternate.memoizedState.cachePool.pool), d = null, o.memoizedState !== null && o.memoizedState.cachePool !== null && (d = o.memoizedState.cachePool.pool), d !== u && (o.flags |= 2048)), a !== e && a && (t.child.flags |= 8192), Ir(t, t.updateQueue), Ze(t), null);
      case 4:
        return ie(), e === null && gf(t.stateNode.containerInfo), Ze(t), null;
      case 10:
        return Rn(t.type), Ze(t), null;
      case 19:
        if (I(et), o = t.memoizedState, o === null) return Ze(t), null;
        if (u = (t.flags & 128) !== 0, d = o.rendering, d === null)
          if (u) Ko(o, !1);
          else {
            if (Fe !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (d = jr(e), d !== null) {
                  for (t.flags |= 128, Ko(o, !1), e = d.updateQueue, t.updateQueue = e, Ir(t, e), t.subtreeFlags = 0, e = a, a = t.child; a !== null; )
                    Eh(a, e), a = a.sibling;
                  return G(
                    et,
                    et.current & 1 | 2
                  ), Oe && On(t, o.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            o.tail !== null && ht() > Zr && (t.flags |= 128, u = !0, Ko(o, !1), t.lanes = 4194304);
          }
        else {
          if (!u)
            if (e = jr(d), e !== null) {
              if (t.flags |= 128, u = !0, e = e.updateQueue, t.updateQueue = e, Ir(t, e), Ko(o, !0), o.tail === null && o.tailMode === "hidden" && !d.alternate && !Oe)
                return Ze(t), null;
            } else
              2 * ht() - o.renderingStartTime > Zr && a !== 536870912 && (t.flags |= 128, u = !0, Ko(o, !1), t.lanes = 4194304);
          o.isBackwards ? (d.sibling = t.child, t.child = d) : (e = o.last, e !== null ? e.sibling = d : t.child = d, o.last = d);
        }
        return o.tail !== null ? (e = o.tail, o.rendering = e, o.tail = e.sibling, o.renderingStartTime = ht(), e.sibling = null, a = et.current, G(
          et,
          u ? a & 1 | 2 : a & 1
        ), Oe && On(t, o.treeForkCount), e) : (Ze(t), null);
      case 22:
      case 23:
        return Bt(t), gc(), o = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== o && (t.flags |= 8192) : o && (t.flags |= 8192), o ? (a & 536870912) !== 0 && (t.flags & 128) === 0 && (Ze(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ze(t), a = t.updateQueue, a !== null && Ir(t, a.retryQueue), a = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), o = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (o = t.memoizedState.cachePool.pool), o !== a && (t.flags |= 2048), e !== null && I(Wa), null;
      case 24:
        return a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), Rn(it), Ze(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(r(156, t.tag));
  }
  function bx(e, t) {
    switch (Pu(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return Rn(it), ie(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return he(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (Bt(t), t.alternate === null)
            throw Error(r(340));
          Qa();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (Bt(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(r(340));
          Qa();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return I(et), null;
      case 4:
        return ie(), null;
      case 10:
        return Rn(t.type), null;
      case 22:
      case 23:
        return Bt(t), gc(), e !== null && I(Wa), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return Rn(it), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Jg(e, t) {
    switch (Pu(t), t.tag) {
      case 3:
        Rn(it), ie();
        break;
      case 26:
      case 27:
      case 5:
        he(t);
        break;
      case 4:
        ie();
        break;
      case 31:
        t.memoizedState !== null && Bt(t);
        break;
      case 13:
        Bt(t);
        break;
      case 19:
        I(et);
        break;
      case 10:
        Rn(t.type);
        break;
      case 22:
      case 23:
        Bt(t), gc(), e !== null && I(Wa);
        break;
      case 24:
        Rn(it);
    }
  }
  function Jo(e, t) {
    try {
      var a = t.updateQueue, o = a !== null ? a.lastEffect : null;
      if (o !== null) {
        var u = o.next;
        a = u;
        do {
          if ((a.tag & e) === e) {
            o = void 0;
            var d = a.create, w = a.inst;
            o = d(), w.destroy = o;
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (R) {
      Ve(t, t.return, R);
    }
  }
  function ma(e, t, a) {
    try {
      var o = t.updateQueue, u = o !== null ? o.lastEffect : null;
      if (u !== null) {
        var d = u.next;
        o = d;
        do {
          if ((o.tag & e) === e) {
            var w = o.inst, R = w.destroy;
            if (R !== void 0) {
              w.destroy = void 0, u = t;
              var W = a, le = R;
              try {
                le();
              } catch (ue) {
                Ve(
                  u,
                  W,
                  ue
                );
              }
            }
          }
          o = o.next;
        } while (o !== d);
      }
    } catch (ue) {
      Ve(t, t.return, ue);
    }
  }
  function Wg(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var a = e.stateNode;
      try {
        Yh(t, a);
      } catch (o) {
        Ve(e, e.return, o);
      }
    }
  }
  function Fg(e, t, a) {
    a.props = ni(
      e.type,
      e.memoizedProps
    ), a.state = e.memoizedState;
    try {
      a.componentWillUnmount();
    } catch (o) {
      Ve(e, t, o);
    }
  }
  function Wo(e, t) {
    try {
      var a = e.ref;
      if (a !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var o = e.stateNode;
            break;
          case 30:
            o = e.stateNode;
            break;
          default:
            o = e.stateNode;
        }
        typeof a == "function" ? e.refCleanup = a(o) : a.current = o;
      }
    } catch (u) {
      Ve(e, t, u);
    }
  }
  function pn(e, t) {
    var a = e.ref, o = e.refCleanup;
    if (a !== null)
      if (typeof o == "function")
        try {
          o();
        } catch (u) {
          Ve(e, t, u);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof a == "function")
        try {
          a(null);
        } catch (u) {
          Ve(e, t, u);
        }
      else a.current = null;
  }
  function Pg(e) {
    var t = e.type, a = e.memoizedProps, o = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && o.focus();
          break e;
        case "img":
          a.src ? o.src = a.src : a.srcSet && (o.srcset = a.srcSet);
      }
    } catch (u) {
      Ve(e, e.return, u);
    }
  }
  function $c(e, t, a) {
    try {
      var o = e.stateNode;
      Yx(o, e.type, a, t), o[vt] = t;
    } catch (u) {
      Ve(e, e.return, u);
    }
  }
  function em(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Sa(e.type) || e.tag === 4;
  }
  function Zc(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || em(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && Sa(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Qc(e, t, a) {
    var o = e.tag;
    if (o === 5 || o === 6)
      e = e.stateNode, t ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(e, t) : (t = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, t.appendChild(e), a = a._reactRootContainer, a != null || t.onclick !== null || (t.onclick = jn));
    else if (o !== 4 && (o === 27 && Sa(e.type) && (a = e.stateNode, t = null), e = e.child, e !== null))
      for (Qc(e, t, a), e = e.sibling; e !== null; )
        Qc(e, t, a), e = e.sibling;
  }
  function qr(e, t, a) {
    var o = e.tag;
    if (o === 5 || o === 6)
      e = e.stateNode, t ? a.insertBefore(e, t) : a.appendChild(e);
    else if (o !== 4 && (o === 27 && Sa(e.type) && (a = e.stateNode), e = e.child, e !== null))
      for (qr(e, t, a), e = e.sibling; e !== null; )
        qr(e, t, a), e = e.sibling;
  }
  function tm(e) {
    var t = e.stateNode, a = e.memoizedProps;
    try {
      for (var o = e.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      yt(t, o, a), t[ct] = e, t[vt] = a;
    } catch (d) {
      Ve(e, e.return, d);
    }
  }
  var Un = !1, rt = !1, Kc = !1, nm = typeof WeakSet == "function" ? WeakSet : Set, dt = null;
  function xx(e, t) {
    if (e = e.containerInfo, yf = cs, e = gh(e), Iu(e)) {
      if ("selectionStart" in e)
        var a = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          a = (a = e.ownerDocument) && a.defaultView || window;
          var o = a.getSelection && a.getSelection();
          if (o && o.rangeCount !== 0) {
            a = o.anchorNode;
            var u = o.anchorOffset, d = o.focusNode;
            o = o.focusOffset;
            try {
              a.nodeType, d.nodeType;
            } catch {
              a = null;
              break e;
            }
            var w = 0, R = -1, W = -1, le = 0, ue = 0, fe = e, re = null;
            t: for (; ; ) {
              for (var se; fe !== a || u !== 0 && fe.nodeType !== 3 || (R = w + u), fe !== d || o !== 0 && fe.nodeType !== 3 || (W = w + o), fe.nodeType === 3 && (w += fe.nodeValue.length), (se = fe.firstChild) !== null; )
                re = fe, fe = se;
              for (; ; ) {
                if (fe === e) break t;
                if (re === a && ++le === u && (R = w), re === d && ++ue === o && (W = w), (se = fe.nextSibling) !== null) break;
                fe = re, re = fe.parentNode;
              }
              fe = se;
            }
            a = R === -1 || W === -1 ? null : { start: R, end: W };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (vf = { focusedElem: e, selectionRange: a }, cs = !1, dt = t; dt !== null; )
      if (t = dt, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, dt = e;
      else
        for (; dt !== null; ) {
          switch (t = dt, d = t.alternate, e = t.flags, t.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (a = 0; a < e.length; a++)
                  u = e[a], u.ref.impl = u.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && d !== null) {
                e = void 0, a = t, u = d.memoizedProps, d = d.memoizedState, o = a.stateNode;
                try {
                  var me = ni(
                    a.type,
                    u
                  );
                  e = o.getSnapshotBeforeUpdate(
                    me,
                    d
                  ), o.__reactInternalSnapshotBeforeUpdate = e;
                } catch (we) {
                  Ve(
                    a,
                    a.return,
                    we
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, a = e.nodeType, a === 9)
                  wf(e);
                else if (a === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      wf(e);
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
          if (e = t.sibling, e !== null) {
            e.return = t.return, dt = e;
            break;
          }
          dt = t.return;
        }
  }
  function am(e, t, a) {
    var o = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        Yn(e, a), o & 4 && Jo(5, a);
        break;
      case 1:
        if (Yn(e, a), o & 4)
          if (e = a.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (w) {
              Ve(a, a.return, w);
            }
          else {
            var u = ni(
              a.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              e.componentDidUpdate(
                u,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (w) {
              Ve(
                a,
                a.return,
                w
              );
            }
          }
        o & 64 && Wg(a), o & 512 && Wo(a, a.return);
        break;
      case 3:
        if (Yn(e, a), o & 64 && (e = a.updateQueue, e !== null)) {
          if (t = null, a.child !== null)
            switch (a.child.tag) {
              case 27:
              case 5:
                t = a.child.stateNode;
                break;
              case 1:
                t = a.child.stateNode;
            }
          try {
            Yh(e, t);
          } catch (w) {
            Ve(a, a.return, w);
          }
        }
        break;
      case 27:
        t === null && o & 4 && tm(a);
      case 26:
      case 5:
        Yn(e, a), t === null && o & 4 && Pg(a), o & 512 && Wo(a, a.return);
        break;
      case 12:
        Yn(e, a);
        break;
      case 31:
        Yn(e, a), o & 4 && lm(e, a);
        break;
      case 13:
        Yn(e, a), o & 4 && rm(e, a), o & 64 && (e = a.memoizedState, e !== null && (e = e.dehydrated, e !== null && (a = jx.bind(
          null,
          a
        ), Kx(e, a))));
        break;
      case 22:
        if (o = a.memoizedState !== null || Un, !o) {
          t = t !== null && t.memoizedState !== null || rt, u = Un;
          var d = rt;
          Un = o, (rt = t) && !d ? In(
            e,
            a,
            (a.subtreeFlags & 8772) !== 0
          ) : Yn(e, a), Un = u, rt = d;
        }
        break;
      case 30:
        break;
      default:
        Yn(e, a);
    }
  }
  function im(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, im(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Eo(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Qe = null, Mt = !1;
  function Vn(e, t, a) {
    for (a = a.child; a !== null; )
      om(e, t, a), a = a.sibling;
  }
  function om(e, t, a) {
    if (xt && typeof xt.onCommitFiberUnmount == "function")
      try {
        xt.onCommitFiberUnmount(Ba, a);
      } catch {
      }
    switch (a.tag) {
      case 26:
        rt || pn(a, t), Vn(
          e,
          t,
          a
        ), a.memoizedState ? a.memoizedState.count-- : a.stateNode && (a = a.stateNode, a.parentNode.removeChild(a));
        break;
      case 27:
        rt || pn(a, t);
        var o = Qe, u = Mt;
        Sa(a.type) && (Qe = a.stateNode, Mt = !1), Vn(
          e,
          t,
          a
        ), ll(a.stateNode), Qe = o, Mt = u;
        break;
      case 5:
        rt || pn(a, t);
      case 6:
        if (o = Qe, u = Mt, Qe = null, Vn(
          e,
          t,
          a
        ), Qe = o, Mt = u, Qe !== null)
          if (Mt)
            try {
              (Qe.nodeType === 9 ? Qe.body : Qe.nodeName === "HTML" ? Qe.ownerDocument.body : Qe).removeChild(a.stateNode);
            } catch (d) {
              Ve(
                a,
                t,
                d
              );
            }
          else
            try {
              Qe.removeChild(a.stateNode);
            } catch (d) {
              Ve(
                a,
                t,
                d
              );
            }
        break;
      case 18:
        Qe !== null && (Mt ? (e = Qe, Wm(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          a.stateNode
        ), ao(e)) : Wm(Qe, a.stateNode));
        break;
      case 4:
        o = Qe, u = Mt, Qe = a.stateNode.containerInfo, Mt = !0, Vn(
          e,
          t,
          a
        ), Qe = o, Mt = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ma(2, a, t), rt || ma(4, a, t), Vn(
          e,
          t,
          a
        );
        break;
      case 1:
        rt || (pn(a, t), o = a.stateNode, typeof o.componentWillUnmount == "function" && Fg(
          a,
          t,
          o
        )), Vn(
          e,
          t,
          a
        );
        break;
      case 21:
        Vn(
          e,
          t,
          a
        );
        break;
      case 22:
        rt = (o = rt) || a.memoizedState !== null, Vn(
          e,
          t,
          a
        ), rt = o;
        break;
      default:
        Vn(
          e,
          t,
          a
        );
    }
  }
  function lm(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        ao(e);
      } catch (a) {
        Ve(t, t.return, a);
      }
    }
  }
  function rm(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        ao(e);
      } catch (a) {
        Ve(t, t.return, a);
      }
  }
  function wx(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new nm()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new nm()), t;
      default:
        throw Error(r(435, e.tag));
    }
  }
  function Xr(e, t) {
    var a = wx(e);
    t.forEach(function(o) {
      if (!a.has(o)) {
        a.add(o);
        var u = Ax.bind(null, e, o);
        o.then(u, u);
      }
    });
  }
  function Tt(e, t) {
    var a = t.deletions;
    if (a !== null)
      for (var o = 0; o < a.length; o++) {
        var u = a[o], d = e, w = t, R = w;
        e: for (; R !== null; ) {
          switch (R.tag) {
            case 27:
              if (Sa(R.type)) {
                Qe = R.stateNode, Mt = !1;
                break e;
              }
              break;
            case 5:
              Qe = R.stateNode, Mt = !1;
              break e;
            case 3:
            case 4:
              Qe = R.stateNode.containerInfo, Mt = !0;
              break e;
          }
          R = R.return;
        }
        if (Qe === null) throw Error(r(160));
        om(d, w, u), Qe = null, Mt = !1, d = u.alternate, d !== null && (d.return = null), u.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        sm(t, e), t = t.sibling;
  }
  var an = null;
  function sm(e, t) {
    var a = e.alternate, o = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Tt(t, e), jt(e), o & 4 && (ma(3, e, e.return), Jo(3, e), ma(5, e, e.return));
        break;
      case 1:
        Tt(t, e), jt(e), o & 512 && (rt || a === null || pn(a, a.return)), o & 64 && Un && (e = e.updateQueue, e !== null && (o = e.callbacks, o !== null && (a = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = a === null ? o : a.concat(o))));
        break;
      case 26:
        var u = an;
        if (Tt(t, e), jt(e), o & 512 && (rt || a === null || pn(a, a.return)), o & 4) {
          var d = a !== null ? a.memoizedState : null;
          if (o = e.memoizedState, a === null)
            if (o === null)
              if (e.stateNode === null) {
                e: {
                  o = e.type, a = e.memoizedProps, u = u.ownerDocument || u;
                  t: switch (o) {
                    case "title":
                      d = u.getElementsByTagName("title")[0], (!d || d[Va] || d[ct] || d.namespaceURI === "http://www.w3.org/2000/svg" || d.hasAttribute("itemprop")) && (d = u.createElement(o), u.head.insertBefore(
                        d,
                        u.querySelector("head > title")
                      )), yt(d, o, a), d[ct] = e, at(d), o = d;
                      break e;
                    case "link":
                      var w = sp(
                        "link",
                        "href",
                        u
                      ).get(o + (a.href || ""));
                      if (w) {
                        for (var R = 0; R < w.length; R++)
                          if (d = w[R], d.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) && d.getAttribute("rel") === (a.rel == null ? null : a.rel) && d.getAttribute("title") === (a.title == null ? null : a.title) && d.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin)) {
                            w.splice(R, 1);
                            break t;
                          }
                      }
                      d = u.createElement(o), yt(d, o, a), u.head.appendChild(d);
                      break;
                    case "meta":
                      if (w = sp(
                        "meta",
                        "content",
                        u
                      ).get(o + (a.content || ""))) {
                        for (R = 0; R < w.length; R++)
                          if (d = w[R], d.getAttribute("content") === (a.content == null ? null : "" + a.content) && d.getAttribute("name") === (a.name == null ? null : a.name) && d.getAttribute("property") === (a.property == null ? null : a.property) && d.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) && d.getAttribute("charset") === (a.charSet == null ? null : a.charSet)) {
                            w.splice(R, 1);
                            break t;
                          }
                      }
                      d = u.createElement(o), yt(d, o, a), u.head.appendChild(d);
                      break;
                    default:
                      throw Error(r(468, o));
                  }
                  d[ct] = e, at(d), o = d;
                }
                e.stateNode = o;
              } else
                up(
                  u,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = rp(
                u,
                o,
                e.memoizedProps
              );
          else
            d !== o ? (d === null ? a.stateNode !== null && (a = a.stateNode, a.parentNode.removeChild(a)) : d.count--, o === null ? up(
              u,
              e.type,
              e.stateNode
            ) : rp(
              u,
              o,
              e.memoizedProps
            )) : o === null && e.stateNode !== null && $c(
              e,
              e.memoizedProps,
              a.memoizedProps
            );
        }
        break;
      case 27:
        Tt(t, e), jt(e), o & 512 && (rt || a === null || pn(a, a.return)), a !== null && o & 4 && $c(
          e,
          e.memoizedProps,
          a.memoizedProps
        );
        break;
      case 5:
        if (Tt(t, e), jt(e), o & 512 && (rt || a === null || pn(a, a.return)), e.flags & 32) {
          u = e.stateNode;
          try {
            Ci(u, "");
          } catch (me) {
            Ve(e, e.return, me);
          }
        }
        o & 4 && e.stateNode != null && (u = e.memoizedProps, $c(
          e,
          u,
          a !== null ? a.memoizedProps : u
        )), o & 1024 && (Kc = !0);
        break;
      case 6:
        if (Tt(t, e), jt(e), o & 4) {
          if (e.stateNode === null)
            throw Error(r(162));
          o = e.memoizedProps, a = e.stateNode;
          try {
            a.nodeValue = o;
          } catch (me) {
            Ve(e, e.return, me);
          }
        }
        break;
      case 3:
        if (ls = null, u = an, an = is(t.containerInfo), Tt(t, e), an = u, jt(e), o & 4 && a !== null && a.memoizedState.isDehydrated)
          try {
            ao(t.containerInfo);
          } catch (me) {
            Ve(e, e.return, me);
          }
        Kc && (Kc = !1, um(e));
        break;
      case 4:
        o = an, an = is(
          e.stateNode.containerInfo
        ), Tt(t, e), jt(e), an = o;
        break;
      case 12:
        Tt(t, e), jt(e);
        break;
      case 31:
        Tt(t, e), jt(e), o & 4 && (o = e.updateQueue, o !== null && (e.updateQueue = null, Xr(e, o)));
        break;
      case 13:
        Tt(t, e), jt(e), e.child.flags & 8192 && e.memoizedState !== null != (a !== null && a.memoizedState !== null) && ($r = ht()), o & 4 && (o = e.updateQueue, o !== null && (e.updateQueue = null, Xr(e, o)));
        break;
      case 22:
        u = e.memoizedState !== null;
        var W = a !== null && a.memoizedState !== null, le = Un, ue = rt;
        if (Un = le || u, rt = ue || W, Tt(t, e), rt = ue, Un = le, jt(e), o & 8192)
          e: for (t = e.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, u && (a === null || W || Un || rt || ai(e)), a = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (a === null) {
                W = a = t;
                try {
                  if (d = W.stateNode, u)
                    w = d.style, typeof w.setProperty == "function" ? w.setProperty("display", "none", "important") : w.display = "none";
                  else {
                    R = W.stateNode;
                    var fe = W.memoizedProps.style, re = fe != null && fe.hasOwnProperty("display") ? fe.display : null;
                    R.style.display = re == null || typeof re == "boolean" ? "" : ("" + re).trim();
                  }
                } catch (me) {
                  Ve(W, W.return, me);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                W = t;
                try {
                  W.stateNode.nodeValue = u ? "" : W.memoizedProps;
                } catch (me) {
                  Ve(W, W.return, me);
                }
              }
            } else if (t.tag === 18) {
              if (a === null) {
                W = t;
                try {
                  var se = W.stateNode;
                  u ? Fm(se, !0) : Fm(W.stateNode, !1);
                } catch (me) {
                  Ve(W, W.return, me);
                }
              }
            } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
              t.child.return = t, t = t.child;
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              a === t && (a = null), t = t.return;
            }
            a === t && (a = null), t.sibling.return = t.return, t = t.sibling;
          }
        o & 4 && (o = e.updateQueue, o !== null && (a = o.retryQueue, a !== null && (o.retryQueue = null, Xr(e, a))));
        break;
      case 19:
        Tt(t, e), jt(e), o & 4 && (o = e.updateQueue, o !== null && (e.updateQueue = null, Xr(e, o)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Tt(t, e), jt(e);
    }
  }
  function jt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var a, o = e.return; o !== null; ) {
          if (em(o)) {
            a = o;
            break;
          }
          o = o.return;
        }
        if (a == null) throw Error(r(160));
        switch (a.tag) {
          case 27:
            var u = a.stateNode, d = Zc(e);
            qr(e, d, u);
            break;
          case 5:
            var w = a.stateNode;
            a.flags & 32 && (Ci(w, ""), a.flags &= -33);
            var R = Zc(e);
            qr(e, R, w);
            break;
          case 3:
          case 4:
            var W = a.stateNode.containerInfo, le = Zc(e);
            Qc(
              e,
              le,
              W
            );
            break;
          default:
            throw Error(r(161));
        }
      } catch (ue) {
        Ve(e, e.return, ue);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function um(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        um(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function Yn(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        am(e, t.alternate, t), t = t.sibling;
  }
  function ai(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ma(4, t, t.return), ai(t);
          break;
        case 1:
          pn(t, t.return);
          var a = t.stateNode;
          typeof a.componentWillUnmount == "function" && Fg(
            t,
            t.return,
            a
          ), ai(t);
          break;
        case 27:
          ll(t.stateNode);
        case 26:
        case 5:
          pn(t, t.return), ai(t);
          break;
        case 22:
          t.memoizedState === null && ai(t);
          break;
        case 30:
          ai(t);
          break;
        default:
          ai(t);
      }
      e = e.sibling;
    }
  }
  function In(e, t, a) {
    for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var o = t.alternate, u = e, d = t, w = d.flags;
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          In(
            u,
            d,
            a
          ), Jo(4, d);
          break;
        case 1:
          if (In(
            u,
            d,
            a
          ), o = d, u = o.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (le) {
              Ve(o, o.return, le);
            }
          if (o = d, u = o.updateQueue, u !== null) {
            var R = o.stateNode;
            try {
              var W = u.shared.hiddenCallbacks;
              if (W !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < W.length; u++)
                  Vh(W[u], R);
            } catch (le) {
              Ve(o, o.return, le);
            }
          }
          a && w & 64 && Wg(d), Wo(d, d.return);
          break;
        case 27:
          tm(d);
        case 26:
        case 5:
          In(
            u,
            d,
            a
          ), a && o === null && w & 4 && Pg(d), Wo(d, d.return);
          break;
        case 12:
          In(
            u,
            d,
            a
          );
          break;
        case 31:
          In(
            u,
            d,
            a
          ), a && w & 4 && lm(u, d);
          break;
        case 13:
          In(
            u,
            d,
            a
          ), a && w & 4 && rm(u, d);
          break;
        case 22:
          d.memoizedState === null && In(
            u,
            d,
            a
          ), Wo(d, d.return);
          break;
        case 30:
          break;
        default:
          In(
            u,
            d,
            a
          );
      }
      t = t.sibling;
    }
  }
  function Jc(e, t) {
    var a = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== a && (e != null && e.refCount++, a != null && Bo(a));
  }
  function Wc(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Bo(e));
  }
  function on(e, t, a, o) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        cm(
          e,
          t,
          a,
          o
        ), t = t.sibling;
  }
  function cm(e, t, a, o) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        on(
          e,
          t,
          a,
          o
        ), u & 2048 && Jo(9, t);
        break;
      case 1:
        on(
          e,
          t,
          a,
          o
        );
        break;
      case 3:
        on(
          e,
          t,
          a,
          o
        ), u & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Bo(e)));
        break;
      case 12:
        if (u & 2048) {
          on(
            e,
            t,
            a,
            o
          ), e = t.stateNode;
          try {
            var d = t.memoizedProps, w = d.id, R = d.onPostCommit;
            typeof R == "function" && R(
              w,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (W) {
            Ve(t, t.return, W);
          }
        } else
          on(
            e,
            t,
            a,
            o
          );
        break;
      case 31:
        on(
          e,
          t,
          a,
          o
        );
        break;
      case 13:
        on(
          e,
          t,
          a,
          o
        );
        break;
      case 23:
        break;
      case 22:
        d = t.stateNode, w = t.alternate, t.memoizedState !== null ? d._visibility & 2 ? on(
          e,
          t,
          a,
          o
        ) : Fo(e, t) : d._visibility & 2 ? on(
          e,
          t,
          a,
          o
        ) : (d._visibility |= 2, $i(
          e,
          t,
          a,
          o,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), u & 2048 && Jc(w, t);
        break;
      case 24:
        on(
          e,
          t,
          a,
          o
        ), u & 2048 && Wc(t.alternate, t);
        break;
      default:
        on(
          e,
          t,
          a,
          o
        );
    }
  }
  function $i(e, t, a, o, u) {
    for (u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var d = e, w = t, R = a, W = o, le = w.flags;
      switch (w.tag) {
        case 0:
        case 11:
        case 15:
          $i(
            d,
            w,
            R,
            W,
            u
          ), Jo(8, w);
          break;
        case 23:
          break;
        case 22:
          var ue = w.stateNode;
          w.memoizedState !== null ? ue._visibility & 2 ? $i(
            d,
            w,
            R,
            W,
            u
          ) : Fo(
            d,
            w
          ) : (ue._visibility |= 2, $i(
            d,
            w,
            R,
            W,
            u
          )), u && le & 2048 && Jc(
            w.alternate,
            w
          );
          break;
        case 24:
          $i(
            d,
            w,
            R,
            W,
            u
          ), u && le & 2048 && Wc(w.alternate, w);
          break;
        default:
          $i(
            d,
            w,
            R,
            W,
            u
          );
      }
      t = t.sibling;
    }
  }
  function Fo(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var a = e, o = t, u = o.flags;
        switch (o.tag) {
          case 22:
            Fo(a, o), u & 2048 && Jc(
              o.alternate,
              o
            );
            break;
          case 24:
            Fo(a, o), u & 2048 && Wc(o.alternate, o);
            break;
          default:
            Fo(a, o);
        }
        t = t.sibling;
      }
  }
  var Po = 8192;
  function Zi(e, t, a) {
    if (e.subtreeFlags & Po)
      for (e = e.child; e !== null; )
        fm(
          e,
          t,
          a
        ), e = e.sibling;
  }
  function fm(e, t, a) {
    switch (e.tag) {
      case 26:
        Zi(
          e,
          t,
          a
        ), e.flags & Po && e.memoizedState !== null && r1(
          a,
          an,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        Zi(
          e,
          t,
          a
        );
        break;
      case 3:
      case 4:
        var o = an;
        an = is(e.stateNode.containerInfo), Zi(
          e,
          t,
          a
        ), an = o;
        break;
      case 22:
        e.memoizedState === null && (o = e.alternate, o !== null && o.memoizedState !== null ? (o = Po, Po = 16777216, Zi(
          e,
          t,
          a
        ), Po = o) : Zi(
          e,
          t,
          a
        ));
        break;
      default:
        Zi(
          e,
          t,
          a
        );
    }
  }
  function dm(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function el(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var o = t[a];
          dt = o, gm(
            o,
            e
          );
        }
      dm(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        hm(e), e = e.sibling;
  }
  function hm(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        el(e), e.flags & 2048 && ma(9, e, e.return);
        break;
      case 3:
        el(e);
        break;
      case 12:
        el(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Gr(e)) : el(e);
        break;
      default:
        el(e);
    }
  }
  function Gr(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var o = t[a];
          dt = o, gm(
            o,
            e
          );
        }
      dm(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          ma(8, t, t.return), Gr(t);
          break;
        case 22:
          a = t.stateNode, a._visibility & 2 && (a._visibility &= -3, Gr(t));
          break;
        default:
          Gr(t);
      }
      e = e.sibling;
    }
  }
  function gm(e, t) {
    for (; dt !== null; ) {
      var a = dt;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          ma(8, a, t);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var o = a.memoizedState.cachePool.pool;
            o != null && o.refCount++;
          }
          break;
        case 24:
          Bo(a.memoizedState.cache);
      }
      if (o = a.child, o !== null) o.return = a, dt = o;
      else
        e: for (a = e; dt !== null; ) {
          o = dt;
          var u = o.sibling, d = o.return;
          if (im(o), o === a) {
            dt = null;
            break e;
          }
          if (u !== null) {
            u.return = d, dt = u;
            break e;
          }
          dt = d;
        }
    }
  }
  var Sx = {
    getCacheForType: function(e) {
      var t = mt(it), a = t.data.get(e);
      return a === void 0 && (a = e(), t.data.set(e, a)), a;
    },
    cacheSignal: function() {
      return mt(it).controller.signal;
    }
  }, Ex = typeof WeakMap == "function" ? WeakMap : Map, Le = 0, Ge = null, Me = null, je = 0, Ue = 0, Lt = null, pa = !1, Qi = !1, Fc = !1, qn = 0, Fe = 0, ya = 0, ii = 0, Pc = 0, Ut = 0, Ki = 0, tl = null, At = null, ef = !1, $r = 0, mm = 0, Zr = 1 / 0, Qr = null, va = null, ft = 0, ba = null, Ji = null, Xn = 0, tf = 0, nf = null, pm = null, nl = 0, af = null;
  function Vt() {
    return (Le & 2) !== 0 && je !== 0 ? je & -je : _.T !== null ? cf() : Fl();
  }
  function ym() {
    if (Ut === 0)
      if ((je & 536870912) === 0 || Oe) {
        var e = bi;
        bi <<= 1, (bi & 3932160) === 0 && (bi = 262144), Ut = e;
      } else Ut = 536870912;
    return e = Ht.current, e !== null && (e.flags |= 32), Ut;
  }
  function Dt(e, t, a) {
    (e === Ge && (Ue === 2 || Ue === 9) || e.cancelPendingCommit !== null) && (Wi(e, 0), xa(
      e,
      je,
      Ut,
      !1
    )), Ua(e, a), ((Le & 2) === 0 || e !== Ge) && (e === Ge && ((Le & 2) === 0 && (ii |= a), Fe === 4 && xa(
      e,
      je,
      Ut,
      !1
    )), yn(e));
  }
  function vm(e, t, a) {
    if ((Le & 6) !== 0) throw Error(r(327));
    var o = !a && (t & 127) === 0 && (t & e.expiredLanes) === 0 || La(e, t), u = o ? Cx(e, t) : lf(e, t, !0), d = o;
    do {
      if (u === 0) {
        Qi && !o && xa(e, t, 0, !1);
        break;
      } else {
        if (a = e.current.alternate, d && !_x(a)) {
          u = lf(e, t, !1), d = !1;
          continue;
        }
        if (u === 2) {
          if (d = t, e.errorRecoveryDisabledLanes & d)
            var w = 0;
          else
            w = e.pendingLanes & -536870913, w = w !== 0 ? w : w & 536870912 ? 536870912 : 0;
          if (w !== 0) {
            t = w;
            e: {
              var R = e;
              u = tl;
              var W = R.current.memoizedState.isDehydrated;
              if (W && (Wi(R, w).flags |= 256), w = lf(
                R,
                w,
                !1
              ), w !== 2) {
                if (Fc && !W) {
                  R.errorRecoveryDisabledLanes |= d, ii |= d, u = 4;
                  break e;
                }
                d = At, At = u, d !== null && (At === null ? At = d : At.push.apply(
                  At,
                  d
                ));
              }
              u = w;
            }
            if (d = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          Wi(e, 0), xa(e, t, 0, !0);
          break;
        }
        e: {
          switch (o = e, d = u, d) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              xa(
                o,
                t,
                Ut,
                !pa
              );
              break e;
            case 2:
              At = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((t & 62914560) === t && (u = $r + 300 - ht(), 10 < u)) {
            if (xa(
              o,
              t,
              Ut,
              !pa
            ), wi(o, 0, !0) !== 0) break e;
            Xn = t, o.timeoutHandle = Km(
              bm.bind(
                null,
                o,
                a,
                At,
                Qr,
                ef,
                t,
                Ut,
                ii,
                Ki,
                pa,
                d,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break e;
          }
          bm(
            o,
            a,
            At,
            Qr,
            ef,
            t,
            Ut,
            ii,
            Ki,
            pa,
            d,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    yn(e);
  }
  function bm(e, t, a, o, u, d, w, R, W, le, ue, fe, re, se) {
    if (e.timeoutHandle = -1, fe = t.subtreeFlags, fe & 8192 || (fe & 16785408) === 16785408) {
      fe = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: jn
      }, fm(
        t,
        d,
        fe
      );
      var me = (d & 62914560) === d ? $r - ht() : (d & 4194048) === d ? mm - ht() : 0;
      if (me = s1(
        fe,
        me
      ), me !== null) {
        Xn = d, e.cancelPendingCommit = me(
          Mm.bind(
            null,
            e,
            t,
            d,
            a,
            o,
            u,
            w,
            R,
            W,
            ue,
            fe,
            null,
            re,
            se
          )
        ), xa(e, d, w, !le);
        return;
      }
    }
    Mm(
      e,
      t,
      d,
      a,
      o,
      u,
      w,
      R,
      W
    );
  }
  function _x(e) {
    for (var t = e; ; ) {
      var a = t.tag;
      if ((a === 0 || a === 11 || a === 15) && t.flags & 16384 && (a = t.updateQueue, a !== null && (a = a.stores, a !== null)))
        for (var o = 0; o < a.length; o++) {
          var u = a[o], d = u.getSnapshot;
          u = u.value;
          try {
            if (!Rt(d(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (a = t.child, t.subtreeFlags & 16384 && a !== null)
        a.return = t, t = a;
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function xa(e, t, a, o) {
    t &= ~Pc, t &= ~ii, e.suspendedLanes |= t, e.pingedLanes &= ~t, o && (e.warmLanes |= t), o = e.expirationTimes;
    for (var u = t; 0 < u; ) {
      var d = 31 - wt(u), w = 1 << d;
      o[d] = -1, u &= ~w;
    }
    a !== 0 && Kl(e, a, t);
  }
  function Kr() {
    return (Le & 6) === 0 ? (al(0), !1) : !0;
  }
  function of() {
    if (Me !== null) {
      if (Ue === 0)
        var e = Me.return;
      else
        e = Me, zn = Ka = null, xc(e), Yi = null, Uo = 0, e = Me;
      for (; e !== null; )
        Jg(e.alternate, e), e = e.return;
      Me = null;
    }
  }
  function Wi(e, t) {
    var a = e.timeoutHandle;
    a !== -1 && (e.timeoutHandle = -1, Xx(a)), a = e.cancelPendingCommit, a !== null && (e.cancelPendingCommit = null, a()), Xn = 0, of(), Ge = e, Me = a = Dn(e.current, null), je = t, Ue = 0, Lt = null, pa = !1, Qi = La(e, t), Fc = !1, Ki = Ut = Pc = ii = ya = Fe = 0, At = tl = null, ef = !1, (t & 8) !== 0 && (t |= t & 32);
    var o = e.entangledLanes;
    if (o !== 0)
      for (e = e.entanglements, o &= t; 0 < o; ) {
        var u = 31 - wt(o), d = 1 << u;
        t |= e[u], o &= ~d;
      }
    return qn = t, pr(), a;
  }
  function xm(e, t) {
    Ne = null, _.H = Zo, t === Vi || t === _r ? (t = Hh(), Ue = 3) : t === sc ? (t = Hh(), Ue = 4) : Ue = t === Hc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Lt = t, Me === null && (Fe = 1, Lr(
      e,
      Gt(t, e.current)
    ));
  }
  function wm() {
    var e = Ht.current;
    return e === null ? !0 : (je & 4194048) === je ? Kt === null : (je & 62914560) === je || (je & 536870912) !== 0 ? e === Kt : !1;
  }
  function Sm() {
    var e = _.H;
    return _.H = Zo, e === null ? Zo : e;
  }
  function Em() {
    var e = _.A;
    return _.A = Sx, e;
  }
  function Jr() {
    Fe = 4, pa || (je & 4194048) !== je && Ht.current !== null || (Qi = !0), (ya & 134217727) === 0 && (ii & 134217727) === 0 || Ge === null || xa(
      Ge,
      je,
      Ut,
      !1
    );
  }
  function lf(e, t, a) {
    var o = Le;
    Le |= 2;
    var u = Sm(), d = Em();
    (Ge !== e || je !== t) && (Qr = null, Wi(e, t)), t = !1;
    var w = Fe;
    e: do
      try {
        if (Ue !== 0 && Me !== null) {
          var R = Me, W = Lt;
          switch (Ue) {
            case 8:
              of(), w = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Ht.current === null && (t = !0);
              var le = Ue;
              if (Ue = 0, Lt = null, Fi(e, R, W, le), a && Qi) {
                w = 0;
                break e;
              }
              break;
            default:
              le = Ue, Ue = 0, Lt = null, Fi(e, R, W, le);
          }
        }
        Nx(), w = Fe;
        break;
      } catch (ue) {
        xm(e, ue);
      }
    while (!0);
    return t && e.shellSuspendCounter++, zn = Ka = null, Le = o, _.H = u, _.A = d, Me === null && (Ge = null, je = 0, pr()), w;
  }
  function Nx() {
    for (; Me !== null; ) _m(Me);
  }
  function Cx(e, t) {
    var a = Le;
    Le |= 2;
    var o = Sm(), u = Em();
    Ge !== e || je !== t ? (Qr = null, Zr = ht() + 500, Wi(e, t)) : Qi = La(
      e,
      t
    );
    e: do
      try {
        if (Ue !== 0 && Me !== null) {
          t = Me;
          var d = Lt;
          t: switch (Ue) {
            case 1:
              Ue = 0, Lt = null, Fi(e, t, d, 1);
              break;
            case 2:
            case 9:
              if (Rh(d)) {
                Ue = 0, Lt = null, Nm(t);
                break;
              }
              t = function() {
                Ue !== 2 && Ue !== 9 || Ge !== e || (Ue = 7), yn(e);
              }, d.then(t, t);
              break e;
            case 3:
              Ue = 7;
              break e;
            case 4:
              Ue = 5;
              break e;
            case 7:
              Rh(d) ? (Ue = 0, Lt = null, Nm(t)) : (Ue = 0, Lt = null, Fi(e, t, d, 7));
              break;
            case 5:
              var w = null;
              switch (Me.tag) {
                case 26:
                  w = Me.memoizedState;
                case 5:
                case 27:
                  var R = Me;
                  if (w ? cp(w) : R.stateNode.complete) {
                    Ue = 0, Lt = null;
                    var W = R.sibling;
                    if (W !== null) Me = W;
                    else {
                      var le = R.return;
                      le !== null ? (Me = le, Wr(le)) : Me = null;
                    }
                    break t;
                  }
              }
              Ue = 0, Lt = null, Fi(e, t, d, 5);
              break;
            case 6:
              Ue = 0, Lt = null, Fi(e, t, d, 6);
              break;
            case 8:
              of(), Fe = 6;
              break e;
            default:
              throw Error(r(462));
          }
        }
        Mx();
        break;
      } catch (ue) {
        xm(e, ue);
      }
    while (!0);
    return zn = Ka = null, _.H = o, _.A = u, Le = a, Me !== null ? 0 : (Ge = null, je = 0, pr(), Fe);
  }
  function Mx() {
    for (; Me !== null && !Ra(); )
      _m(Me);
  }
  function _m(e) {
    var t = Qg(e.alternate, e, qn);
    e.memoizedProps = e.pendingProps, t === null ? Wr(e) : Me = t;
  }
  function Nm(e) {
    var t = e, a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Ig(
          a,
          t,
          t.pendingProps,
          t.type,
          void 0,
          je
        );
        break;
      case 11:
        t = Ig(
          a,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          je
        );
        break;
      case 5:
        xc(t);
      default:
        Jg(a, t), t = Me = Eh(t, qn), t = Qg(a, t, qn);
    }
    e.memoizedProps = e.pendingProps, t === null ? Wr(e) : Me = t;
  }
  function Fi(e, t, a, o) {
    zn = Ka = null, xc(t), Yi = null, Uo = 0;
    var u = t.return;
    try {
      if (mx(
        e,
        u,
        t,
        a,
        je
      )) {
        Fe = 1, Lr(
          e,
          Gt(a, e.current)
        ), Me = null;
        return;
      }
    } catch (d) {
      if (u !== null) throw Me = u, d;
      Fe = 1, Lr(
        e,
        Gt(a, e.current)
      ), Me = null;
      return;
    }
    t.flags & 32768 ? (Oe || o === 1 ? e = !0 : Qi || (je & 536870912) !== 0 ? e = !1 : (pa = e = !0, (o === 2 || o === 9 || o === 3 || o === 6) && (o = Ht.current, o !== null && o.tag === 13 && (o.flags |= 16384))), Cm(t, e)) : Wr(t);
  }
  function Wr(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Cm(
          t,
          pa
        );
        return;
      }
      e = t.return;
      var a = vx(
        t.alternate,
        t,
        qn
      );
      if (a !== null) {
        Me = a;
        return;
      }
      if (t = t.sibling, t !== null) {
        Me = t;
        return;
      }
      Me = t = e;
    } while (t !== null);
    Fe === 0 && (Fe = 5);
  }
  function Cm(e, t) {
    do {
      var a = bx(e.alternate, e);
      if (a !== null) {
        a.flags &= 32767, Me = a;
        return;
      }
      if (a = e.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null), !t && (e = e.sibling, e !== null)) {
        Me = e;
        return;
      }
      Me = e = a;
    } while (e !== null);
    Fe = 6, Me = null;
  }
  function Mm(e, t, a, o, u, d, w, R, W) {
    e.cancelPendingCommit = null;
    do
      Fr();
    while (ft !== 0);
    if ((Le & 6) !== 0) throw Error(r(327));
    if (t !== null) {
      if (t === e.current) throw Error(r(177));
      if (d = t.lanes | t.childLanes, d |= Zu, Eu(
        e,
        a,
        d,
        w,
        R,
        W
      ), e === Ge && (Me = Ge = null, je = 0), Ji = t, ba = e, Xn = a, tf = d, nf = u, pm = o, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Dx(Ha, function() {
        return Om(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), o = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || o) {
        o = _.T, _.T = null, u = z.p, z.p = 2, w = Le, Le |= 4;
        try {
          xx(e, t, a);
        } finally {
          Le = w, z.p = u, _.T = o;
        }
      }
      ft = 1, Tm(), jm(), Am();
    }
  }
  function Tm() {
    if (ft === 1) {
      ft = 0;
      var e = ba, t = Ji, a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        a = _.T, _.T = null;
        var o = z.p;
        z.p = 2;
        var u = Le;
        Le |= 4;
        try {
          sm(t, e);
          var d = vf, w = gh(e.containerInfo), R = d.focusedElem, W = d.selectionRange;
          if (w !== R && R && R.ownerDocument && hh(
            R.ownerDocument.documentElement,
            R
          )) {
            if (W !== null && Iu(R)) {
              var le = W.start, ue = W.end;
              if (ue === void 0 && (ue = le), "selectionStart" in R)
                R.selectionStart = le, R.selectionEnd = Math.min(
                  ue,
                  R.value.length
                );
              else {
                var fe = R.ownerDocument || document, re = fe && fe.defaultView || window;
                if (re.getSelection) {
                  var se = re.getSelection(), me = R.textContent.length, we = Math.min(W.start, me), Xe = W.end === void 0 ? we : Math.min(W.end, me);
                  !se.extend && we > Xe && (w = Xe, Xe = we, we = w);
                  var ae = dh(
                    R,
                    we
                  ), ne = dh(
                    R,
                    Xe
                  );
                  if (ae && ne && (se.rangeCount !== 1 || se.anchorNode !== ae.node || se.anchorOffset !== ae.offset || se.focusNode !== ne.node || se.focusOffset !== ne.offset)) {
                    var oe = fe.createRange();
                    oe.setStart(ae.node, ae.offset), se.removeAllRanges(), we > Xe ? (se.addRange(oe), se.extend(ne.node, ne.offset)) : (oe.setEnd(ne.node, ne.offset), se.addRange(oe));
                  }
                }
              }
            }
            for (fe = [], se = R; se = se.parentNode; )
              se.nodeType === 1 && fe.push({
                element: se,
                left: se.scrollLeft,
                top: se.scrollTop
              });
            for (typeof R.focus == "function" && R.focus(), R = 0; R < fe.length; R++) {
              var ce = fe[R];
              ce.element.scrollLeft = ce.left, ce.element.scrollTop = ce.top;
            }
          }
          cs = !!yf, vf = yf = null;
        } finally {
          Le = u, z.p = o, _.T = a;
        }
      }
      e.current = t, ft = 2;
    }
  }
  function jm() {
    if (ft === 2) {
      ft = 0;
      var e = ba, t = Ji, a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        a = _.T, _.T = null;
        var o = z.p;
        z.p = 2;
        var u = Le;
        Le |= 4;
        try {
          am(e, t.alternate, t);
        } finally {
          Le = u, z.p = o, _.T = a;
        }
      }
      ft = 3;
    }
  }
  function Am() {
    if (ft === 4 || ft === 3) {
      ft = 0, ka();
      var e = ba, t = Ji, a = Xn, o = pm;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? ft = 5 : (ft = 0, Ji = ba = null, Dm(e, e.pendingLanes));
      var u = e.pendingLanes;
      if (u === 0 && (va = null), So(a), t = t.stateNode, xt && typeof xt.onCommitFiberRoot == "function")
        try {
          xt.onCommitFiberRoot(
            Ba,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (o !== null) {
        t = _.T, u = z.p, z.p = 2, _.T = null;
        try {
          for (var d = e.onRecoverableError, w = 0; w < o.length; w++) {
            var R = o[w];
            d(R.value, {
              componentStack: R.stack
            });
          }
        } finally {
          _.T = t, z.p = u;
        }
      }
      (Xn & 3) !== 0 && Fr(), yn(e), u = e.pendingLanes, (a & 261930) !== 0 && (u & 42) !== 0 ? e === af ? nl++ : (nl = 0, af = e) : nl = 0, al(0);
    }
  }
  function Dm(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Bo(t)));
  }
  function Fr() {
    return Tm(), jm(), Am(), Om();
  }
  function Om() {
    if (ft !== 5) return !1;
    var e = ba, t = tf;
    tf = 0;
    var a = So(Xn), o = _.T, u = z.p;
    try {
      z.p = 32 > a ? 32 : a, _.T = null, a = nf, nf = null;
      var d = ba, w = Xn;
      if (ft = 0, Ji = ba = null, Xn = 0, (Le & 6) !== 0) throw Error(r(331));
      var R = Le;
      if (Le |= 4, hm(d.current), cm(
        d,
        d.current,
        w,
        a
      ), Le = R, al(0, !1), xt && typeof xt.onPostCommitFiberRoot == "function")
        try {
          xt.onPostCommitFiberRoot(Ba, d);
        } catch {
        }
      return !0;
    } finally {
      z.p = u, _.T = o, Dm(e, t);
    }
  }
  function zm(e, t, a) {
    t = Gt(a, t), t = kc(e.stateNode, t, 2), e = da(e, t, 2), e !== null && (Ua(e, 2), yn(e));
  }
  function Ve(e, t, a) {
    if (e.tag === 3)
      zm(e, e, a);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          zm(
            t,
            e,
            a
          );
          break;
        } else if (t.tag === 1) {
          var o = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (va === null || !va.has(o))) {
            e = Gt(a, e), a = Rg(2), o = da(t, a, 2), o !== null && (kg(
              a,
              o,
              t,
              e
            ), Ua(o, 2), yn(o));
            break;
          }
        }
        t = t.return;
      }
  }
  function rf(e, t, a) {
    var o = e.pingCache;
    if (o === null) {
      o = e.pingCache = new Ex();
      var u = /* @__PURE__ */ new Set();
      o.set(t, u);
    } else
      u = o.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), o.set(t, u));
    u.has(a) || (Fc = !0, u.add(a), e = Tx.bind(null, e, t, a), t.then(e, e));
  }
  function Tx(e, t, a) {
    var o = e.pingCache;
    o !== null && o.delete(t), e.pingedLanes |= e.suspendedLanes & a, e.warmLanes &= ~a, Ge === e && (je & a) === a && (Fe === 4 || Fe === 3 && (je & 62914560) === je && 300 > ht() - $r ? (Le & 2) === 0 && Wi(e, 0) : Pc |= a, Ki === je && (Ki = 0)), yn(e);
  }
  function Rm(e, t) {
    t === 0 && (t = Ql()), e = $a(e, t), e !== null && (Ua(e, t), yn(e));
  }
  function jx(e) {
    var t = e.memoizedState, a = 0;
    t !== null && (a = t.retryLane), Rm(e, a);
  }
  function Ax(e, t) {
    var a = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var o = e.stateNode, u = e.memoizedState;
        u !== null && (a = u.retryLane);
        break;
      case 19:
        o = e.stateNode;
        break;
      case 22:
        o = e.stateNode._retryCache;
        break;
      default:
        throw Error(r(314));
    }
    o !== null && o.delete(t), Rm(e, a);
  }
  function Dx(e, t) {
    return en(e, t);
  }
  var Pr = null, Pi = null, sf = !1, es = !1, uf = !1, wa = 0;
  function yn(e) {
    e !== Pi && e.next === null && (Pi === null ? Pr = Pi = e : Pi = Pi.next = e), es = !0, sf || (sf = !0, zx());
  }
  function al(e, t) {
    if (!uf && es) {
      uf = !0;
      do
        for (var a = !1, o = Pr; o !== null; ) {
          if (e !== 0) {
            var u = o.pendingLanes;
            if (u === 0) var d = 0;
            else {
              var w = o.suspendedLanes, R = o.pingedLanes;
              d = (1 << 31 - wt(42 | e) + 1) - 1, d &= u & ~(w & ~R), d = d & 201326741 ? d & 201326741 | 1 : d ? d | 2 : 0;
            }
            d !== 0 && (a = !0, Lm(o, d));
          } else
            d = je, d = wi(
              o,
              o === Ge ? d : 0,
              o.cancelPendingCommit !== null || o.timeoutHandle !== -1
            ), (d & 3) === 0 || La(o, d) || (a = !0, Lm(o, d));
          o = o.next;
        }
      while (a);
      uf = !1;
    }
  }
  function Ox() {
    km();
  }
  function km() {
    es = sf = !1;
    var e = 0;
    wa !== 0 && qx() && (e = wa);
    for (var t = ht(), a = null, o = Pr; o !== null; ) {
      var u = o.next, d = Hm(o, t);
      d === 0 ? (o.next = null, a === null ? Pr = u : a.next = u, u === null && (Pi = a)) : (a = o, (e !== 0 || (d & 3) !== 0) && (es = !0)), o = u;
    }
    ft !== 0 && ft !== 5 || al(e), wa !== 0 && (wa = 0);
  }
  function Hm(e, t) {
    for (var a = e.suspendedLanes, o = e.pingedLanes, u = e.expirationTimes, d = e.pendingLanes & -62914561; 0 < d; ) {
      var w = 31 - wt(d), R = 1 << w, W = u[w];
      W === -1 ? ((R & a) === 0 || (R & o) !== 0) && (u[w] = Su(R, t)) : W <= t && (e.expiredLanes |= R), d &= ~R;
    }
    if (t = Ge, a = je, a = wi(
      e,
      e === t ? a : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), o = e.callbackNode, a === 0 || e === t && (Ue === 2 || Ue === 9) || e.cancelPendingCommit !== null)
      return o !== null && o !== null && En(o), e.callbackNode = null, e.callbackPriority = 0;
    if ((a & 3) === 0 || La(e, a)) {
      if (t = a & -a, t === e.callbackPriority) return t;
      switch (o !== null && En(o), So(a)) {
        case 2:
        case 8:
          a = Pn;
          break;
        case 32:
          a = Ha;
          break;
        case 268435456:
          a = yi;
          break;
        default:
          a = Ha;
      }
      return o = Bm.bind(null, e), a = en(a, o), e.callbackPriority = t, e.callbackNode = a, t;
    }
    return o !== null && o !== null && En(o), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Bm(e, t) {
    if (ft !== 0 && ft !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var a = e.callbackNode;
    if (Fr() && e.callbackNode !== a)
      return null;
    var o = je;
    return o = wi(
      e,
      e === Ge ? o : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), o === 0 ? null : (vm(e, o, t), Hm(e, ht()), e.callbackNode != null && e.callbackNode === a ? Bm.bind(null, e) : null);
  }
  function Lm(e, t) {
    if (Fr()) return null;
    vm(e, t, !0);
  }
  function zx() {
    Gx(function() {
      (Le & 6) !== 0 ? en(
        _n,
        Ox
      ) : km();
    });
  }
  function cf() {
    if (wa === 0) {
      var e = Li;
      e === 0 && (e = vi, vi <<= 1, (vi & 261888) === 0 && (vi = 256)), wa = e;
    }
    return wa;
  }
  function Um(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : sr("" + e);
  }
  function Vm(e, t) {
    var a = t.ownerDocument.createElement("input");
    return a.name = t.name, a.value = t.value, e.id && a.setAttribute("form", e.id), t.parentNode.insertBefore(a, t), e = new FormData(e), a.parentNode.removeChild(a), e;
  }
  function Rx(e, t, a, o, u) {
    if (t === "submit" && a && a.stateNode === u) {
      var d = Um(
        (u[vt] || null).action
      ), w = o.submitter;
      w && (t = (t = w[vt] || null) ? Um(t.formAction) : w.getAttribute("formAction"), t !== null && (d = t, w = null));
      var R = new dr(
        "action",
        "action",
        null,
        o,
        u
      );
      e.push({
        event: R,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (o.defaultPrevented) {
                if (wa !== 0) {
                  var W = w ? Vm(u, w) : new FormData(u);
                  jc(
                    a,
                    {
                      pending: !0,
                      data: W,
                      method: u.method,
                      action: d
                    },
                    null,
                    W
                  );
                }
              } else
                typeof d == "function" && (R.preventDefault(), W = w ? Vm(u, w) : new FormData(u), jc(
                  a,
                  {
                    pending: !0,
                    data: W,
                    method: u.method,
                    action: d
                  },
                  d,
                  W
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var ff = 0; ff < $u.length; ff++) {
    var df = $u[ff], kx = df.toLowerCase(), Hx = df[0].toUpperCase() + df.slice(1);
    nn(
      kx,
      "on" + Hx
    );
  }
  nn(yh, "onAnimationEnd"), nn(vh, "onAnimationIteration"), nn(bh, "onAnimationStart"), nn("dblclick", "onDoubleClick"), nn("focusin", "onFocus"), nn("focusout", "onBlur"), nn(Fb, "onTransitionRun"), nn(Pb, "onTransitionStart"), nn(ex, "onTransitionCancel"), nn(xh, "onTransitionEnd"), ia("onMouseEnter", ["mouseout", "mouseover"]), ia("onMouseLeave", ["mouseout", "mouseover"]), ia("onPointerEnter", ["pointerout", "pointerover"]), ia("onPointerLeave", ["pointerout", "pointerover"]), Mn(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Mn(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Mn("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Mn(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Mn(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Mn(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var il = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Bx = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(il)
  );
  function Ym(e, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < e.length; a++) {
      var o = e[a], u = o.event;
      o = o.listeners;
      e: {
        var d = void 0;
        if (t)
          for (var w = o.length - 1; 0 <= w; w--) {
            var R = o[w], W = R.instance, le = R.currentTarget;
            if (R = R.listener, W !== d && u.isPropagationStopped())
              break e;
            d = R, u.currentTarget = le;
            try {
              d(u);
            } catch (ue) {
              mr(ue);
            }
            u.currentTarget = null, d = W;
          }
        else
          for (w = 0; w < o.length; w++) {
            if (R = o[w], W = R.instance, le = R.currentTarget, R = R.listener, W !== d && u.isPropagationStopped())
              break e;
            d = R, u.currentTarget = le;
            try {
              d(u);
            } catch (ue) {
              mr(ue);
            }
            u.currentTarget = null, d = W;
          }
      }
    }
  }
  function Te(e, t) {
    var a = t[Si];
    a === void 0 && (a = t[Si] = /* @__PURE__ */ new Set());
    var o = e + "__bubble";
    a.has(o) || (Im(t, e, 2, !1), a.add(o));
  }
  function hf(e, t, a) {
    var o = 0;
    t && (o |= 4), Im(
      a,
      e,
      o,
      t
    );
  }
  var ts = "_reactListening" + Math.random().toString(36).slice(2);
  function gf(e) {
    if (!e[ts]) {
      e[ts] = !0, nr.forEach(function(a) {
        a !== "selectionchange" && (Bx.has(a) || hf(a, !1, e), hf(a, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[ts] || (t[ts] = !0, hf("selectionchange", !1, t));
    }
  }
  function Im(e, t, a, o) {
    switch (yp(t)) {
      case 2:
        var u = f1;
        break;
      case 8:
        u = d1;
        break;
      default:
        u = jf;
    }
    a = u.bind(
      null,
      t,
      a,
      e
    ), u = void 0, !zu || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (u = !0), o ? u !== void 0 ? e.addEventListener(t, a, {
      capture: !0,
      passive: u
    }) : e.addEventListener(t, a, !0) : u !== void 0 ? e.addEventListener(t, a, {
      passive: u
    }) : e.addEventListener(t, a, !1);
  }
  function mf(e, t, a, o, u) {
    var d = o;
    if ((t & 1) === 0 && (t & 2) === 0 && o !== null)
      e: for (; ; ) {
        if (o === null) return;
        var w = o.tag;
        if (w === 3 || w === 4) {
          var R = o.stateNode.containerInfo;
          if (R === u) break;
          if (w === 4)
            for (w = o.return; w !== null; ) {
              var W = w.tag;
              if ((W === 3 || W === 4) && w.stateNode.containerInfo === u)
                return;
              w = w.return;
            }
          for (; R !== null; ) {
            if (w = ea(R), w === null) return;
            if (W = w.tag, W === 5 || W === 6 || W === 26 || W === 27) {
              o = d = w;
              continue e;
            }
            R = R.parentNode;
          }
        }
        o = o.return;
      }
    Zd(function() {
      var le = d, ue = Du(a), fe = [];
      e: {
        var re = wh.get(e);
        if (re !== void 0) {
          var se = dr, me = e;
          switch (e) {
            case "keypress":
              if (cr(a) === 0) break e;
            case "keydown":
            case "keyup":
              se = Ab;
              break;
            case "focusin":
              me = "focus", se = Bu;
              break;
            case "focusout":
              me = "blur", se = Bu;
              break;
            case "beforeblur":
            case "afterblur":
              se = Bu;
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
              se = Jd;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              se = vb;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              se = zb;
              break;
            case yh:
            case vh:
            case bh:
              se = wb;
              break;
            case xh:
              se = kb;
              break;
            case "scroll":
            case "scrollend":
              se = pb;
              break;
            case "wheel":
              se = Bb;
              break;
            case "copy":
            case "cut":
            case "paste":
              se = Eb;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              se = Fd;
              break;
            case "toggle":
            case "beforetoggle":
              se = Ub;
          }
          var we = (t & 4) !== 0, Xe = !we && (e === "scroll" || e === "scrollend"), ae = we ? re !== null ? re + "Capture" : null : re;
          we = [];
          for (var ne = le, oe; ne !== null; ) {
            var ce = ne;
            if (oe = ce.stateNode, ce = ce.tag, ce !== 5 && ce !== 26 && ce !== 27 || oe === null || ae === null || (ce = Co(ne, ae), ce != null && we.push(
              ol(ne, ce, oe)
            )), Xe) break;
            ne = ne.return;
          }
          0 < we.length && (re = new se(
            re,
            me,
            null,
            a,
            ue
          ), fe.push({ event: re, listeners: we }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (re = e === "mouseover" || e === "pointerover", se = e === "mouseout" || e === "pointerout", re && a !== Au && (me = a.relatedTarget || a.fromElement) && (ea(me) || me[Cn]))
            break e;
          if ((se || re) && (re = ue.window === ue ? ue : (re = ue.ownerDocument) ? re.defaultView || re.parentWindow : window, se ? (me = a.relatedTarget || a.toElement, se = le, me = me ? ea(me) : null, me !== null && (Xe = c(me), we = me.tag, me !== Xe || we !== 5 && we !== 27 && we !== 6) && (me = null)) : (se = null, me = le), se !== me)) {
            if (we = Jd, ce = "onMouseLeave", ae = "onMouseEnter", ne = "mouse", (e === "pointerout" || e === "pointerover") && (we = Fd, ce = "onPointerLeave", ae = "onPointerEnter", ne = "pointer"), Xe = se == null ? re : na(se), oe = me == null ? re : na(me), re = new we(
              ce,
              ne + "leave",
              se,
              a,
              ue
            ), re.target = Xe, re.relatedTarget = oe, ce = null, ea(ue) === le && (we = new we(
              ae,
              ne + "enter",
              me,
              a,
              ue
            ), we.target = oe, we.relatedTarget = Xe, ce = we), Xe = ce, se && me)
              t: {
                for (we = Lx, ae = se, ne = me, oe = 0, ce = ae; ce; ce = we(ce))
                  oe++;
                ce = 0;
                for (var ve = ne; ve; ve = we(ve))
                  ce++;
                for (; 0 < oe - ce; )
                  ae = we(ae), oe--;
                for (; 0 < ce - oe; )
                  ne = we(ne), ce--;
                for (; oe--; ) {
                  if (ae === ne || ne !== null && ae === ne.alternate) {
                    we = ae;
                    break t;
                  }
                  ae = we(ae), ne = we(ne);
                }
                we = null;
              }
            else we = null;
            se !== null && qm(
              fe,
              re,
              se,
              we,
              !1
            ), me !== null && Xe !== null && qm(
              fe,
              Xe,
              me,
              we,
              !0
            );
          }
        }
        e: {
          if (re = le ? na(le) : window, se = re.nodeName && re.nodeName.toLowerCase(), se === "select" || se === "input" && re.type === "file")
            var ke = lh;
          else if (ih(re))
            if (rh)
              ke = Kb;
            else {
              ke = Zb;
              var pe = $b;
            }
          else
            se = re.nodeName, !se || se.toLowerCase() !== "input" || re.type !== "checkbox" && re.type !== "radio" ? le && ju(le.elementType) && (ke = lh) : ke = Qb;
          if (ke && (ke = ke(e, le))) {
            oh(
              fe,
              ke,
              a,
              ue
            );
            break e;
          }
          pe && pe(e, re, le), e === "focusout" && le && re.type === "number" && le.memoizedProps.value != null && No(re, "number", re.value);
        }
        switch (pe = le ? na(le) : window, e) {
          case "focusin":
            (ih(pe) || pe.contentEditable === "true") && (Ai = pe, qu = le, Ro = null);
            break;
          case "focusout":
            Ro = qu = Ai = null;
            break;
          case "mousedown":
            Xu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Xu = !1, mh(fe, a, ue);
            break;
          case "selectionchange":
            if (Wb) break;
          case "keydown":
          case "keyup":
            mh(fe, a, ue);
        }
        var Ce;
        if (Uu)
          e: {
            switch (e) {
              case "compositionstart":
                var Ae = "onCompositionStart";
                break e;
              case "compositionend":
                Ae = "onCompositionEnd";
                break e;
              case "compositionupdate":
                Ae = "onCompositionUpdate";
                break e;
            }
            Ae = void 0;
          }
        else
          ji ? nh(e, a) && (Ae = "onCompositionEnd") : e === "keydown" && a.keyCode === 229 && (Ae = "onCompositionStart");
        Ae && (Pd && a.locale !== "ko" && (ji || Ae !== "onCompositionStart" ? Ae === "onCompositionEnd" && ji && (Ce = Qd()) : (oa = ue, Ru = "value" in oa ? oa.value : oa.textContent, ji = !0)), pe = ns(le, Ae), 0 < pe.length && (Ae = new Wd(
          Ae,
          e,
          null,
          a,
          ue
        ), fe.push({ event: Ae, listeners: pe }), Ce ? Ae.data = Ce : (Ce = ah(a), Ce !== null && (Ae.data = Ce)))), (Ce = Yb ? Ib(e, a) : qb(e, a)) && (Ae = ns(le, "onBeforeInput"), 0 < Ae.length && (pe = new Wd(
          "onBeforeInput",
          "beforeinput",
          null,
          a,
          ue
        ), fe.push({
          event: pe,
          listeners: Ae
        }), pe.data = Ce)), Rx(
          fe,
          e,
          le,
          a,
          ue
        );
      }
      Ym(fe, t);
    });
  }
  function ol(e, t, a) {
    return {
      instance: e,
      listener: t,
      currentTarget: a
    };
  }
  function ns(e, t) {
    for (var a = t + "Capture", o = []; e !== null; ) {
      var u = e, d = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || d === null || (u = Co(e, a), u != null && o.unshift(
        ol(e, u, d)
      ), u = Co(e, t), u != null && o.push(
        ol(e, u, d)
      )), e.tag === 3) return o;
      e = e.return;
    }
    return [];
  }
  function Lx(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function qm(e, t, a, o, u) {
    for (var d = t._reactName, w = []; a !== null && a !== o; ) {
      var R = a, W = R.alternate, le = R.stateNode;
      if (R = R.tag, W !== null && W === o) break;
      R !== 5 && R !== 26 && R !== 27 || le === null || (W = le, u ? (le = Co(a, d), le != null && w.unshift(
        ol(a, le, W)
      )) : u || (le = Co(a, d), le != null && w.push(
        ol(a, le, W)
      ))), a = a.return;
    }
    w.length !== 0 && e.push({ event: t, listeners: w });
  }
  var Ux = /\r\n?/g, Vx = /\u0000|\uFFFD/g;
  function Xm(e) {
    return (typeof e == "string" ? e : "" + e).replace(Ux, `
`).replace(Vx, "");
  }
  function Gm(e, t) {
    return t = Xm(t), Xm(e) === t;
  }
  function qe(e, t, a, o, u, d) {
    switch (a) {
      case "children":
        typeof o == "string" ? t === "body" || t === "textarea" && o === "" || Ci(e, o) : (typeof o == "number" || typeof o == "bigint") && t !== "body" && Ci(e, "" + o);
        break;
      case "className":
        _i(e, "class", o);
        break;
      case "tabIndex":
        _i(e, "tabindex", o);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        _i(e, a, o);
        break;
      case "style":
        Gd(e, o, d);
        break;
      case "data":
        if (t !== "object") {
          _i(e, "data", o);
          break;
        }
      case "src":
      case "href":
        if (o === "" && (t !== "a" || a !== "href")) {
          e.removeAttribute(a);
          break;
        }
        if (o == null || typeof o == "function" || typeof o == "symbol" || typeof o == "boolean") {
          e.removeAttribute(a);
          break;
        }
        o = sr("" + o), e.setAttribute(a, o);
        break;
      case "action":
      case "formAction":
        if (typeof o == "function") {
          e.setAttribute(
            a,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof d == "function" && (a === "formAction" ? (t !== "input" && qe(e, t, "name", u.name, u, null), qe(
            e,
            t,
            "formEncType",
            u.formEncType,
            u,
            null
          ), qe(
            e,
            t,
            "formMethod",
            u.formMethod,
            u,
            null
          ), qe(
            e,
            t,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (qe(e, t, "encType", u.encType, u, null), qe(e, t, "method", u.method, u, null), qe(e, t, "target", u.target, u, null)));
        if (o == null || typeof o == "symbol" || typeof o == "boolean") {
          e.removeAttribute(a);
          break;
        }
        o = sr("" + o), e.setAttribute(a, o);
        break;
      case "onClick":
        o != null && (e.onclick = jn);
        break;
      case "onScroll":
        o != null && Te("scroll", e);
        break;
      case "onScrollEnd":
        o != null && Te("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (o != null) {
          if (typeof o != "object" || !("__html" in o))
            throw Error(r(61));
          if (a = o.__html, a != null) {
            if (u.children != null) throw Error(r(60));
            e.innerHTML = a;
          }
        }
        break;
      case "multiple":
        e.multiple = o && typeof o != "function" && typeof o != "symbol";
        break;
      case "muted":
        e.muted = o && typeof o != "function" && typeof o != "symbol";
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
        if (o == null || typeof o == "function" || typeof o == "boolean" || typeof o == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        a = sr("" + o), e.setAttributeNS(
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
        o != null && typeof o != "function" && typeof o != "symbol" ? e.setAttribute(a, "" + o) : e.removeAttribute(a);
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
        o && typeof o != "function" && typeof o != "symbol" ? e.setAttribute(a, "") : e.removeAttribute(a);
        break;
      case "capture":
      case "download":
        o === !0 ? e.setAttribute(a, "") : o !== !1 && o != null && typeof o != "function" && typeof o != "symbol" ? e.setAttribute(a, o) : e.removeAttribute(a);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        o != null && typeof o != "function" && typeof o != "symbol" && !isNaN(o) && 1 <= o ? e.setAttribute(a, o) : e.removeAttribute(a);
        break;
      case "rowSpan":
      case "start":
        o == null || typeof o == "function" || typeof o == "symbol" || isNaN(o) ? e.removeAttribute(a) : e.setAttribute(a, o);
        break;
      case "popover":
        Te("beforetoggle", e), Te("toggle", e), Ei(e, "popover", o);
        break;
      case "xlinkActuate":
        tn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          o
        );
        break;
      case "xlinkArcrole":
        tn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          o
        );
        break;
      case "xlinkRole":
        tn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          o
        );
        break;
      case "xlinkShow":
        tn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          o
        );
        break;
      case "xlinkTitle":
        tn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          o
        );
        break;
      case "xlinkType":
        tn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          o
        );
        break;
      case "xmlBase":
        tn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          o
        );
        break;
      case "xmlLang":
        tn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          o
        );
        break;
      case "xmlSpace":
        tn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          o
        );
        break;
      case "is":
        Ei(e, "is", o);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N") && (a = gb.get(a) || a, Ei(e, a, o));
    }
  }
  function pf(e, t, a, o, u, d) {
    switch (a) {
      case "style":
        Gd(e, o, d);
        break;
      case "dangerouslySetInnerHTML":
        if (o != null) {
          if (typeof o != "object" || !("__html" in o))
            throw Error(r(61));
          if (a = o.__html, a != null) {
            if (u.children != null) throw Error(r(60));
            e.innerHTML = a;
          }
        }
        break;
      case "children":
        typeof o == "string" ? Ci(e, o) : (typeof o == "number" || typeof o == "bigint") && Ci(e, "" + o);
        break;
      case "onScroll":
        o != null && Te("scroll", e);
        break;
      case "onScrollEnd":
        o != null && Te("scrollend", e);
        break;
      case "onClick":
        o != null && (e.onclick = jn);
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
        if (!ar.hasOwnProperty(a))
          e: {
            if (a[0] === "o" && a[1] === "n" && (u = a.endsWith("Capture"), t = a.slice(2, u ? a.length - 7 : void 0), d = e[vt] || null, d = d != null ? d[a] : null, typeof d == "function" && e.removeEventListener(t, d, u), typeof o == "function")) {
              typeof d != "function" && d !== null && (a in e ? e[a] = null : e.hasAttribute(a) && e.removeAttribute(a)), e.addEventListener(t, o, u);
              break e;
            }
            a in e ? e[a] = o : o === !0 ? e.setAttribute(a, "") : Ei(e, a, o);
          }
    }
  }
  function yt(e, t, a) {
    switch (t) {
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
        Te("error", e), Te("load", e);
        var o = !1, u = !1, d;
        for (d in a)
          if (a.hasOwnProperty(d)) {
            var w = a[d];
            if (w != null)
              switch (d) {
                case "src":
                  o = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(r(137, t));
                default:
                  qe(e, t, d, w, a, null);
              }
          }
        u && qe(e, t, "srcSet", a.srcSet, a, null), o && qe(e, t, "src", a.src, a, null);
        return;
      case "input":
        Te("invalid", e);
        var R = d = w = u = null, W = null, le = null;
        for (o in a)
          if (a.hasOwnProperty(o)) {
            var ue = a[o];
            if (ue != null)
              switch (o) {
                case "name":
                  u = ue;
                  break;
                case "type":
                  w = ue;
                  break;
                case "checked":
                  W = ue;
                  break;
                case "defaultChecked":
                  le = ue;
                  break;
                case "value":
                  d = ue;
                  break;
                case "defaultValue":
                  R = ue;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (ue != null)
                    throw Error(r(137, t));
                  break;
                default:
                  qe(e, t, o, ue, a, null);
              }
          }
        rr(
          e,
          d,
          R,
          W,
          le,
          w,
          u,
          !1
        );
        return;
      case "select":
        Te("invalid", e), o = w = d = null;
        for (u in a)
          if (a.hasOwnProperty(u) && (R = a[u], R != null))
            switch (u) {
              case "value":
                d = R;
                break;
              case "defaultValue":
                w = R;
                break;
              case "multiple":
                o = R;
              default:
                qe(e, t, u, R, a, null);
            }
        t = d, a = w, e.multiple = !!o, t != null ? Tn(e, !!o, t, !1) : a != null && Tn(e, !!o, a, !0);
        return;
      case "textarea":
        Te("invalid", e), d = u = o = null;
        for (w in a)
          if (a.hasOwnProperty(w) && (R = a[w], R != null))
            switch (w) {
              case "value":
                o = R;
                break;
              case "defaultValue":
                u = R;
                break;
              case "children":
                d = R;
                break;
              case "dangerouslySetInnerHTML":
                if (R != null) throw Error(r(91));
                break;
              default:
                qe(e, t, w, R, a, null);
            }
        qd(e, o, u, d);
        return;
      case "option":
        for (W in a)
          a.hasOwnProperty(W) && (o = a[W], o != null) && (W === "selected" ? e.selected = o && typeof o != "function" && typeof o != "symbol" : qe(e, t, W, o, a, null));
        return;
      case "dialog":
        Te("beforetoggle", e), Te("toggle", e), Te("cancel", e), Te("close", e);
        break;
      case "iframe":
      case "object":
        Te("load", e);
        break;
      case "video":
      case "audio":
        for (o = 0; o < il.length; o++)
          Te(il[o], e);
        break;
      case "image":
        Te("error", e), Te("load", e);
        break;
      case "details":
        Te("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        Te("error", e), Te("load", e);
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
        for (le in a)
          if (a.hasOwnProperty(le) && (o = a[le], o != null))
            switch (le) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(137, t));
              default:
                qe(e, t, le, o, a, null);
            }
        return;
      default:
        if (ju(t)) {
          for (ue in a)
            a.hasOwnProperty(ue) && (o = a[ue], o !== void 0 && pf(
              e,
              t,
              ue,
              o,
              a,
              void 0
            ));
          return;
        }
    }
    for (R in a)
      a.hasOwnProperty(R) && (o = a[R], o != null && qe(e, t, R, o, a, null));
  }
  function Yx(e, t, a, o) {
    switch (t) {
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
        var u = null, d = null, w = null, R = null, W = null, le = null, ue = null;
        for (se in a) {
          var fe = a[se];
          if (a.hasOwnProperty(se) && fe != null)
            switch (se) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                W = fe;
              default:
                o.hasOwnProperty(se) || qe(e, t, se, null, o, fe);
            }
        }
        for (var re in o) {
          var se = o[re];
          if (fe = a[re], o.hasOwnProperty(re) && (se != null || fe != null))
            switch (re) {
              case "type":
                d = se;
                break;
              case "name":
                u = se;
                break;
              case "checked":
                le = se;
                break;
              case "defaultChecked":
                ue = se;
                break;
              case "value":
                w = se;
                break;
              case "defaultValue":
                R = se;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (se != null)
                  throw Error(r(137, t));
                break;
              default:
                se !== fe && qe(
                  e,
                  t,
                  re,
                  se,
                  o,
                  fe
                );
            }
        }
        Ia(
          e,
          w,
          R,
          W,
          le,
          ue,
          d,
          u
        );
        return;
      case "select":
        se = w = R = re = null;
        for (d in a)
          if (W = a[d], a.hasOwnProperty(d) && W != null)
            switch (d) {
              case "value":
                break;
              case "multiple":
                se = W;
              default:
                o.hasOwnProperty(d) || qe(
                  e,
                  t,
                  d,
                  null,
                  o,
                  W
                );
            }
        for (u in o)
          if (d = o[u], W = a[u], o.hasOwnProperty(u) && (d != null || W != null))
            switch (u) {
              case "value":
                re = d;
                break;
              case "defaultValue":
                R = d;
                break;
              case "multiple":
                w = d;
              default:
                d !== W && qe(
                  e,
                  t,
                  u,
                  d,
                  o,
                  W
                );
            }
        t = R, a = w, o = se, re != null ? Tn(e, !!a, re, !1) : !!o != !!a && (t != null ? Tn(e, !!a, t, !0) : Tn(e, !!a, a ? [] : "", !1));
        return;
      case "textarea":
        se = re = null;
        for (R in a)
          if (u = a[R], a.hasOwnProperty(R) && u != null && !o.hasOwnProperty(R))
            switch (R) {
              case "value":
                break;
              case "children":
                break;
              default:
                qe(e, t, R, null, o, u);
            }
        for (w in o)
          if (u = o[w], d = a[w], o.hasOwnProperty(w) && (u != null || d != null))
            switch (w) {
              case "value":
                re = u;
                break;
              case "defaultValue":
                se = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(r(91));
                break;
              default:
                u !== d && qe(e, t, w, u, o, d);
            }
        Id(e, re, se);
        return;
      case "option":
        for (var me in a)
          re = a[me], a.hasOwnProperty(me) && re != null && !o.hasOwnProperty(me) && (me === "selected" ? e.selected = !1 : qe(
            e,
            t,
            me,
            null,
            o,
            re
          ));
        for (W in o)
          re = o[W], se = a[W], o.hasOwnProperty(W) && re !== se && (re != null || se != null) && (W === "selected" ? e.selected = re && typeof re != "function" && typeof re != "symbol" : qe(
            e,
            t,
            W,
            re,
            o,
            se
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
        for (var we in a)
          re = a[we], a.hasOwnProperty(we) && re != null && !o.hasOwnProperty(we) && qe(e, t, we, null, o, re);
        for (le in o)
          if (re = o[le], se = a[le], o.hasOwnProperty(le) && re !== se && (re != null || se != null))
            switch (le) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (re != null)
                  throw Error(r(137, t));
                break;
              default:
                qe(
                  e,
                  t,
                  le,
                  re,
                  o,
                  se
                );
            }
        return;
      default:
        if (ju(t)) {
          for (var Xe in a)
            re = a[Xe], a.hasOwnProperty(Xe) && re !== void 0 && !o.hasOwnProperty(Xe) && pf(
              e,
              t,
              Xe,
              void 0,
              o,
              re
            );
          for (ue in o)
            re = o[ue], se = a[ue], !o.hasOwnProperty(ue) || re === se || re === void 0 && se === void 0 || pf(
              e,
              t,
              ue,
              re,
              o,
              se
            );
          return;
        }
    }
    for (var ae in a)
      re = a[ae], a.hasOwnProperty(ae) && re != null && !o.hasOwnProperty(ae) && qe(e, t, ae, null, o, re);
    for (fe in o)
      re = o[fe], se = a[fe], !o.hasOwnProperty(fe) || re === se || re == null && se == null || qe(e, t, fe, re, o, se);
  }
  function $m(e) {
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
  function Ix() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, a = performance.getEntriesByType("resource"), o = 0; o < a.length; o++) {
        var u = a[o], d = u.transferSize, w = u.initiatorType, R = u.duration;
        if (d && R && $m(w)) {
          for (w = 0, R = u.responseEnd, o += 1; o < a.length; o++) {
            var W = a[o], le = W.startTime;
            if (le > R) break;
            var ue = W.transferSize, fe = W.initiatorType;
            ue && $m(fe) && (W = W.responseEnd, w += ue * (W < R ? 1 : (R - le) / (W - le)));
          }
          if (--o, t += 8 * (d + w) / (u.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var yf = null, vf = null;
  function as(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Zm(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Qm(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function bf(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var xf = null;
  function qx() {
    var e = window.event;
    return e && e.type === "popstate" ? e === xf ? !1 : (xf = e, !0) : (xf = null, !1);
  }
  var Km = typeof setTimeout == "function" ? setTimeout : void 0, Xx = typeof clearTimeout == "function" ? clearTimeout : void 0, Jm = typeof Promise == "function" ? Promise : void 0, Gx = typeof queueMicrotask == "function" ? queueMicrotask : typeof Jm < "u" ? function(e) {
    return Jm.resolve(null).then(e).catch($x);
  } : Km;
  function $x(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Sa(e) {
    return e === "head";
  }
  function Wm(e, t) {
    var a = t, o = 0;
    do {
      var u = a.nextSibling;
      if (e.removeChild(a), u && u.nodeType === 8)
        if (a = u.data, a === "/$" || a === "/&") {
          if (o === 0) {
            e.removeChild(u), ao(t);
            return;
          }
          o--;
        } else if (a === "$" || a === "$?" || a === "$~" || a === "$!" || a === "&")
          o++;
        else if (a === "html")
          ll(e.ownerDocument.documentElement);
        else if (a === "head") {
          a = e.ownerDocument.head, ll(a);
          for (var d = a.firstChild; d; ) {
            var w = d.nextSibling, R = d.nodeName;
            d[Va] || R === "SCRIPT" || R === "STYLE" || R === "LINK" && d.rel.toLowerCase() === "stylesheet" || a.removeChild(d), d = w;
          }
        } else
          a === "body" && ll(e.ownerDocument.body);
      a = u;
    } while (a);
    ao(t);
  }
  function Fm(e, t) {
    var a = e;
    e = 0;
    do {
      var o = a.nextSibling;
      if (a.nodeType === 1 ? t ? (a._stashedDisplay = a.style.display, a.style.display = "none") : (a.style.display = a._stashedDisplay || "", a.getAttribute("style") === "" && a.removeAttribute("style")) : a.nodeType === 3 && (t ? (a._stashedText = a.nodeValue, a.nodeValue = "") : a.nodeValue = a._stashedText || ""), o && o.nodeType === 8)
        if (a = o.data, a === "/$") {
          if (e === 0) break;
          e--;
        } else
          a !== "$" && a !== "$?" && a !== "$~" && a !== "$!" || e++;
      a = o;
    } while (a);
  }
  function wf(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (t = t.nextSibling, a.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          wf(a), Eo(a);
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
  function Zx(e, t, a, o) {
    for (; e.nodeType === 1; ) {
      var u = a;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!o && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (o) {
        if (!e[Va])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (d = e.getAttribute("rel"), d === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (d !== u.rel || e.getAttribute("href") !== (u.href == null || u.href === "" ? null : u.href) || e.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin) || e.getAttribute("title") !== (u.title == null ? null : u.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (d = e.getAttribute("src"), (d !== (u.src == null ? null : u.src) || e.getAttribute("type") !== (u.type == null ? null : u.type) || e.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin)) && d && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var d = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && e.getAttribute("name") === d)
          return e;
      } else return e;
      if (e = Jt(e.nextSibling), e === null) break;
    }
    return null;
  }
  function Qx(e, t, a) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !a || (e = Jt(e.nextSibling), e === null)) return null;
    return e;
  }
  function Pm(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Jt(e.nextSibling), e === null)) return null;
    return e;
  }
  function Sf(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Ef(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function Kx(e, t) {
    var a = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || a.readyState !== "loading")
      t();
    else {
      var o = function() {
        t(), a.removeEventListener("DOMContentLoaded", o);
      };
      a.addEventListener("DOMContentLoaded", o), e._reactRetry = o;
    }
  }
  function Jt(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F")
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return e;
  }
  var _f = null;
  function ep(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === "/$" || a === "/&") {
          if (t === 0)
            return Jt(e.nextSibling);
          t--;
        } else
          a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function tp(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === "$" || a === "$!" || a === "$?" || a === "$~" || a === "&") {
          if (t === 0) return e;
          t--;
        } else a !== "/$" && a !== "/&" || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function np(e, t, a) {
    switch (t = as(a), e) {
      case "html":
        if (e = t.documentElement, !e) throw Error(r(452));
        return e;
      case "head":
        if (e = t.head, !e) throw Error(r(453));
        return e;
      case "body":
        if (e = t.body, !e) throw Error(r(454));
        return e;
      default:
        throw Error(r(451));
    }
  }
  function ll(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    Eo(e);
  }
  var Wt = /* @__PURE__ */ new Map(), ap = /* @__PURE__ */ new Set();
  function is(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Gn = z.d;
  z.d = {
    f: Jx,
    r: Wx,
    D: Fx,
    C: Px,
    L: e1,
    m: t1,
    X: a1,
    S: n1,
    M: i1
  };
  function Jx() {
    var e = Gn.f(), t = Kr();
    return e || t;
  }
  function Wx(e) {
    var t = ta(e);
    t !== null && t.tag === 5 && t.type === "form" ? xg(t) : Gn.r(e);
  }
  var eo = typeof document > "u" ? null : document;
  function ip(e, t, a) {
    var o = eo;
    if (o && typeof t == "string" && t) {
      var u = Nt(t);
      u = 'link[rel="' + e + '"][href="' + u + '"]', typeof a == "string" && (u += '[crossorigin="' + a + '"]'), ap.has(u) || (ap.add(u), e = { rel: e, crossOrigin: a, href: t }, o.querySelector(u) === null && (t = o.createElement("link"), yt(t, "link", e), at(t), o.head.appendChild(t)));
    }
  }
  function Fx(e) {
    Gn.D(e), ip("dns-prefetch", e, null);
  }
  function Px(e, t) {
    Gn.C(e, t), ip("preconnect", e, t);
  }
  function e1(e, t, a) {
    Gn.L(e, t, a);
    var o = eo;
    if (o && e && t) {
      var u = 'link[rel="preload"][as="' + Nt(t) + '"]';
      t === "image" && a && a.imageSrcSet ? (u += '[imagesrcset="' + Nt(
        a.imageSrcSet
      ) + '"]', typeof a.imageSizes == "string" && (u += '[imagesizes="' + Nt(
        a.imageSizes
      ) + '"]')) : u += '[href="' + Nt(e) + '"]';
      var d = u;
      switch (t) {
        case "style":
          d = to(e);
          break;
        case "script":
          d = no(e);
      }
      Wt.has(d) || (e = p(
        {
          rel: "preload",
          href: t === "image" && a && a.imageSrcSet ? void 0 : e,
          as: t
        },
        a
      ), Wt.set(d, e), o.querySelector(u) !== null || t === "style" && o.querySelector(rl(d)) || t === "script" && o.querySelector(sl(d)) || (t = o.createElement("link"), yt(t, "link", e), at(t), o.head.appendChild(t)));
    }
  }
  function t1(e, t) {
    Gn.m(e, t);
    var a = eo;
    if (a && e) {
      var o = t && typeof t.as == "string" ? t.as : "script", u = 'link[rel="modulepreload"][as="' + Nt(o) + '"][href="' + Nt(e) + '"]', d = u;
      switch (o) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          d = no(e);
      }
      if (!Wt.has(d) && (e = p({ rel: "modulepreload", href: e }, t), Wt.set(d, e), a.querySelector(u) === null)) {
        switch (o) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (a.querySelector(sl(d)))
              return;
        }
        o = a.createElement("link"), yt(o, "link", e), at(o), a.head.appendChild(o);
      }
    }
  }
  function n1(e, t, a) {
    Gn.S(e, t, a);
    var o = eo;
    if (o && e) {
      var u = aa(o).hoistableStyles, d = to(e);
      t = t || "default";
      var w = u.get(d);
      if (!w) {
        var R = { loading: 0, preload: null };
        if (w = o.querySelector(
          rl(d)
        ))
          R.loading = 5;
        else {
          e = p(
            { rel: "stylesheet", href: e, "data-precedence": t },
            a
          ), (a = Wt.get(d)) && Nf(e, a);
          var W = w = o.createElement("link");
          at(W), yt(W, "link", e), W._p = new Promise(function(le, ue) {
            W.onload = le, W.onerror = ue;
          }), W.addEventListener("load", function() {
            R.loading |= 1;
          }), W.addEventListener("error", function() {
            R.loading |= 2;
          }), R.loading |= 4, os(w, t, o);
        }
        w = {
          type: "stylesheet",
          instance: w,
          count: 1,
          state: R
        }, u.set(d, w);
      }
    }
  }
  function a1(e, t) {
    Gn.X(e, t);
    var a = eo;
    if (a && e) {
      var o = aa(a).hoistableScripts, u = no(e), d = o.get(u);
      d || (d = a.querySelector(sl(u)), d || (e = p({ src: e, async: !0 }, t), (t = Wt.get(u)) && Cf(e, t), d = a.createElement("script"), at(d), yt(d, "link", e), a.head.appendChild(d)), d = {
        type: "script",
        instance: d,
        count: 1,
        state: null
      }, o.set(u, d));
    }
  }
  function i1(e, t) {
    Gn.M(e, t);
    var a = eo;
    if (a && e) {
      var o = aa(a).hoistableScripts, u = no(e), d = o.get(u);
      d || (d = a.querySelector(sl(u)), d || (e = p({ src: e, async: !0, type: "module" }, t), (t = Wt.get(u)) && Cf(e, t), d = a.createElement("script"), at(d), yt(d, "link", e), a.head.appendChild(d)), d = {
        type: "script",
        instance: d,
        count: 1,
        state: null
      }, o.set(u, d));
    }
  }
  function op(e, t, a, o) {
    var u = (u = q.current) ? is(u) : null;
    if (!u) throw Error(r(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof a.precedence == "string" && typeof a.href == "string" ? (t = to(a.href), a = aa(
          u
        ).hoistableStyles, o = a.get(t), o || (o = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, a.set(t, o)), o) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
          e = to(a.href);
          var d = aa(
            u
          ).hoistableStyles, w = d.get(e);
          if (w || (u = u.ownerDocument || u, w = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, d.set(e, w), (d = u.querySelector(
            rl(e)
          )) && !d._p && (w.instance = d, w.state.loading = 5), Wt.has(e) || (a = {
            rel: "preload",
            as: "style",
            href: a.href,
            crossOrigin: a.crossOrigin,
            integrity: a.integrity,
            media: a.media,
            hrefLang: a.hrefLang,
            referrerPolicy: a.referrerPolicy
          }, Wt.set(e, a), d || o1(
            u,
            e,
            a,
            w.state
          ))), t && o === null)
            throw Error(r(528, ""));
          return w;
        }
        if (t && o !== null)
          throw Error(r(529, ""));
        return null;
      case "script":
        return t = a.async, a = a.src, typeof a == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = no(a), a = aa(
          u
        ).hoistableScripts, o = a.get(t), o || (o = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, a.set(t, o)), o) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(r(444, e));
    }
  }
  function to(e) {
    return 'href="' + Nt(e) + '"';
  }
  function rl(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function lp(e) {
    return p({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function o1(e, t, a, o) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? o.loading = 1 : (t = e.createElement("link"), o.preload = t, t.addEventListener("load", function() {
      return o.loading |= 1;
    }), t.addEventListener("error", function() {
      return o.loading |= 2;
    }), yt(t, "link", a), at(t), e.head.appendChild(t));
  }
  function no(e) {
    return '[src="' + Nt(e) + '"]';
  }
  function sl(e) {
    return "script[async]" + e;
  }
  function rp(e, t, a) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var o = e.querySelector(
            'style[data-href~="' + Nt(a.href) + '"]'
          );
          if (o)
            return t.instance = o, at(o), o;
          var u = p({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null
          });
          return o = (e.ownerDocument || e).createElement(
            "style"
          ), at(o), yt(o, "style", u), os(o, a.precedence, e), t.instance = o;
        case "stylesheet":
          u = to(a.href);
          var d = e.querySelector(
            rl(u)
          );
          if (d)
            return t.state.loading |= 4, t.instance = d, at(d), d;
          o = lp(a), (u = Wt.get(u)) && Nf(o, u), d = (e.ownerDocument || e).createElement("link"), at(d);
          var w = d;
          return w._p = new Promise(function(R, W) {
            w.onload = R, w.onerror = W;
          }), yt(d, "link", o), t.state.loading |= 4, os(d, a.precedence, e), t.instance = d;
        case "script":
          return d = no(a.src), (u = e.querySelector(
            sl(d)
          )) ? (t.instance = u, at(u), u) : (o = a, (u = Wt.get(d)) && (o = p({}, a), Cf(o, u)), e = e.ownerDocument || e, u = e.createElement("script"), at(u), yt(u, "link", o), e.head.appendChild(u), t.instance = u);
        case "void":
          return null;
        default:
          throw Error(r(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (o = t.instance, t.state.loading |= 4, os(o, a.precedence, e));
    return t.instance;
  }
  function os(e, t, a) {
    for (var o = a.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = o.length ? o[o.length - 1] : null, d = u, w = 0; w < o.length; w++) {
      var R = o[w];
      if (R.dataset.precedence === t) d = R;
      else if (d !== u) break;
    }
    d ? d.parentNode.insertBefore(e, d.nextSibling) : (t = a.nodeType === 9 ? a.head : a, t.insertBefore(e, t.firstChild));
  }
  function Nf(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function Cf(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var ls = null;
  function sp(e, t, a) {
    if (ls === null) {
      var o = /* @__PURE__ */ new Map(), u = ls = /* @__PURE__ */ new Map();
      u.set(a, o);
    } else
      u = ls, o = u.get(a), o || (o = /* @__PURE__ */ new Map(), u.set(a, o));
    if (o.has(e)) return o;
    for (o.set(e, null), a = a.getElementsByTagName(e), u = 0; u < a.length; u++) {
      var d = a[u];
      if (!(d[Va] || d[ct] || e === "link" && d.getAttribute("rel") === "stylesheet") && d.namespaceURI !== "http://www.w3.org/2000/svg") {
        var w = d.getAttribute(t) || "";
        w = e + w;
        var R = o.get(w);
        R ? R.push(d) : o.set(w, [d]);
      }
    }
    return o;
  }
  function up(e, t, a) {
    e = e.ownerDocument || e, e.head.insertBefore(
      a,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function l1(e, t, a) {
    if (a === 1 || t.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "")
          break;
        return !0;
      case "link":
        if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError)
          break;
        return t.rel === "stylesheet" ? (e = t.disabled, typeof t.precedence == "string" && e == null) : !0;
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string")
          return !0;
    }
    return !1;
  }
  function cp(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function r1(e, t, a, o) {
    if (a.type === "stylesheet" && (typeof o.media != "string" || matchMedia(o.media).matches !== !1) && (a.state.loading & 4) === 0) {
      if (a.instance === null) {
        var u = to(o.href), d = t.querySelector(
          rl(u)
        );
        if (d) {
          t = d._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = rs.bind(e), t.then(e, e)), a.state.loading |= 4, a.instance = d, at(d);
          return;
        }
        d = t.ownerDocument || t, o = lp(o), (u = Wt.get(u)) && Nf(o, u), d = d.createElement("link"), at(d);
        var w = d;
        w._p = new Promise(function(R, W) {
          w.onload = R, w.onerror = W;
        }), yt(d, "link", o), a.instance = d;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(a, t), (t = a.state.preload) && (a.state.loading & 3) === 0 && (e.count++, a = rs.bind(e), t.addEventListener("load", a), t.addEventListener("error", a));
    }
  }
  var Mf = 0;
  function s1(e, t) {
    return e.stylesheets && e.count === 0 && us(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(a) {
      var o = setTimeout(function() {
        if (e.stylesheets && us(e, e.stylesheets), e.unsuspend) {
          var d = e.unsuspend;
          e.unsuspend = null, d();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Mf === 0 && (Mf = 62500 * Ix());
      var u = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && us(e, e.stylesheets), e.unsuspend)) {
            var d = e.unsuspend;
            e.unsuspend = null, d();
          }
        },
        (e.imgBytes > Mf ? 50 : 800) + t
      );
      return e.unsuspend = a, function() {
        e.unsuspend = null, clearTimeout(o), clearTimeout(u);
      };
    } : null;
  }
  function rs() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) us(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var ss = null;
  function us(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, ss = /* @__PURE__ */ new Map(), t.forEach(u1, e), ss = null, rs.call(e));
  }
  function u1(e, t) {
    if (!(t.state.loading & 4)) {
      var a = ss.get(e);
      if (a) var o = a.get(null);
      else {
        a = /* @__PURE__ */ new Map(), ss.set(e, a);
        for (var u = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), d = 0; d < u.length; d++) {
          var w = u[d];
          (w.nodeName === "LINK" || w.getAttribute("media") !== "not all") && (a.set(w.dataset.precedence, w), o = w);
        }
        o && a.set(null, o);
      }
      u = t.instance, w = u.getAttribute("data-precedence"), d = a.get(w) || o, d === o && a.set(null, u), a.set(w, u), this.count++, o = rs.bind(this), u.addEventListener("load", o), u.addEventListener("error", o), d ? d.parentNode.insertBefore(u, d.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(u, e.firstChild)), t.state.loading |= 4;
    }
  }
  var ul = {
    $$typeof: E,
    Provider: null,
    Consumer: null,
    _currentValue: B,
    _currentValue2: B,
    _threadCount: 0
  };
  function c1(e, t, a, o, u, d, w, R, W) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = xo(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = xo(0), this.hiddenUpdates = xo(null), this.identifierPrefix = o, this.onUncaughtError = u, this.onCaughtError = d, this.onRecoverableError = w, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = W, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function fp(e, t, a, o, u, d, w, R, W, le, ue, fe) {
    return e = new c1(
      e,
      t,
      a,
      w,
      W,
      le,
      ue,
      fe,
      R
    ), t = 1, d === !0 && (t |= 24), d = kt(3, null, null, t), e.current = d, d.stateNode = e, t = oc(), t.refCount++, e.pooledCache = t, t.refCount++, d.memoizedState = {
      element: o,
      isDehydrated: a,
      cache: t
    }, uc(d), e;
  }
  function dp(e) {
    return e ? (e = zi, e) : zi;
  }
  function hp(e, t, a, o, u, d) {
    u = dp(u), o.context === null ? o.context = u : o.pendingContext = u, o = fa(t), o.payload = { element: a }, d = d === void 0 ? null : d, d !== null && (o.callback = d), a = da(e, o, t), a !== null && (Dt(a, e, t), Yo(a, e, t));
  }
  function gp(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var a = e.retryLane;
      e.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function Tf(e, t) {
    gp(e, t), (e = e.alternate) && gp(e, t);
  }
  function mp(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = $a(e, 67108864);
      t !== null && Dt(t, e, 67108864), Tf(e, 67108864);
    }
  }
  function pp(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Vt();
      t = wo(t);
      var a = $a(e, t);
      a !== null && Dt(a, e, t), Tf(e, t);
    }
  }
  var cs = !0;
  function f1(e, t, a, o) {
    var u = _.T;
    _.T = null;
    var d = z.p;
    try {
      z.p = 2, jf(e, t, a, o);
    } finally {
      z.p = d, _.T = u;
    }
  }
  function d1(e, t, a, o) {
    var u = _.T;
    _.T = null;
    var d = z.p;
    try {
      z.p = 8, jf(e, t, a, o);
    } finally {
      z.p = d, _.T = u;
    }
  }
  function jf(e, t, a, o) {
    if (cs) {
      var u = Af(o);
      if (u === null)
        mf(
          e,
          t,
          o,
          fs,
          a
        ), vp(e, o);
      else if (g1(
        u,
        e,
        t,
        a,
        o
      ))
        o.stopPropagation();
      else if (vp(e, o), t & 4 && -1 < h1.indexOf(e)) {
        for (; u !== null; ) {
          var d = ta(u);
          if (d !== null)
            switch (d.tag) {
              case 3:
                if (d = d.stateNode, d.current.memoizedState.isDehydrated) {
                  var w = Nn(d.pendingLanes);
                  if (w !== 0) {
                    var R = d;
                    for (R.pendingLanes |= 2, R.entangledLanes |= 2; w; ) {
                      var W = 1 << 31 - wt(w);
                      R.entanglements[1] |= W, w &= ~W;
                    }
                    yn(d), (Le & 6) === 0 && (Zr = ht() + 500, al(0));
                  }
                }
                break;
              case 31:
              case 13:
                R = $a(d, 2), R !== null && Dt(R, d, 2), Kr(), Tf(d, 2);
            }
          if (d = Af(o), d === null && mf(
            e,
            t,
            o,
            fs,
            a
          ), d === u) break;
          u = d;
        }
        u !== null && o.stopPropagation();
      } else
        mf(
          e,
          t,
          o,
          null,
          a
        );
    }
  }
  function Af(e) {
    return e = Du(e), Df(e);
  }
  var fs = null;
  function Df(e) {
    if (fs = null, e = ea(e), e !== null) {
      var t = c(e);
      if (t === null) e = null;
      else {
        var a = t.tag;
        if (a === 13) {
          if (e = f(t), e !== null) return e;
          e = null;
        } else if (a === 31) {
          if (e = h(t), e !== null) return e;
          e = null;
        } else if (a === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return fs = e, null;
  }
  function yp(e) {
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
        switch (pi()) {
          case _n:
            return 2;
          case Pn:
            return 8;
          case Ha:
          case pu:
            return 32;
          case yi:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Of = !1, Ea = null, _a = null, Na = null, cl = /* @__PURE__ */ new Map(), fl = /* @__PURE__ */ new Map(), Ca = [], h1 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function vp(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Ea = null;
        break;
      case "dragenter":
      case "dragleave":
        _a = null;
        break;
      case "mouseover":
      case "mouseout":
        Na = null;
        break;
      case "pointerover":
      case "pointerout":
        cl.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        fl.delete(t.pointerId);
    }
  }
  function dl(e, t, a, o, u, d) {
    return e === null || e.nativeEvent !== d ? (e = {
      blockedOn: t,
      domEventName: a,
      eventSystemFlags: o,
      nativeEvent: d,
      targetContainers: [u]
    }, t !== null && (t = ta(t), t !== null && mp(t)), e) : (e.eventSystemFlags |= o, t = e.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), e);
  }
  function g1(e, t, a, o, u) {
    switch (t) {
      case "focusin":
        return Ea = dl(
          Ea,
          e,
          t,
          a,
          o,
          u
        ), !0;
      case "dragenter":
        return _a = dl(
          _a,
          e,
          t,
          a,
          o,
          u
        ), !0;
      case "mouseover":
        return Na = dl(
          Na,
          e,
          t,
          a,
          o,
          u
        ), !0;
      case "pointerover":
        var d = u.pointerId;
        return cl.set(
          d,
          dl(
            cl.get(d) || null,
            e,
            t,
            a,
            o,
            u
          )
        ), !0;
      case "gotpointercapture":
        return d = u.pointerId, fl.set(
          d,
          dl(
            fl.get(d) || null,
            e,
            t,
            a,
            o,
            u
          )
        ), !0;
    }
    return !1;
  }
  function bp(e) {
    var t = ea(e.target);
    if (t !== null) {
      var a = c(t);
      if (a !== null) {
        if (t = a.tag, t === 13) {
          if (t = f(a), t !== null) {
            e.blockedOn = t, Pl(e.priority, function() {
              pp(a);
            });
            return;
          }
        } else if (t === 31) {
          if (t = h(a), t !== null) {
            e.blockedOn = t, Pl(e.priority, function() {
              pp(a);
            });
            return;
          }
        } else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function ds(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var a = Af(e.nativeEvent);
      if (a === null) {
        a = e.nativeEvent;
        var o = new a.constructor(
          a.type,
          a
        );
        Au = o, a.target.dispatchEvent(o), Au = null;
      } else
        return t = ta(a), t !== null && mp(t), e.blockedOn = a, !1;
      t.shift();
    }
    return !0;
  }
  function xp(e, t, a) {
    ds(e) && a.delete(t);
  }
  function m1() {
    Of = !1, Ea !== null && ds(Ea) && (Ea = null), _a !== null && ds(_a) && (_a = null), Na !== null && ds(Na) && (Na = null), cl.forEach(xp), fl.forEach(xp);
  }
  function hs(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Of || (Of = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      m1
    )));
  }
  var gs = null;
  function wp(e) {
    gs !== e && (gs = e, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      function() {
        gs === e && (gs = null);
        for (var t = 0; t < e.length; t += 3) {
          var a = e[t], o = e[t + 1], u = e[t + 2];
          if (typeof o != "function") {
            if (Df(o || a) === null)
              continue;
            break;
          }
          var d = ta(a);
          d !== null && (e.splice(t, 3), t -= 3, jc(
            d,
            {
              pending: !0,
              data: u,
              method: a.method,
              action: o
            },
            o,
            u
          ));
        }
      }
    ));
  }
  function ao(e) {
    function t(W) {
      return hs(W, e);
    }
    Ea !== null && hs(Ea, e), _a !== null && hs(_a, e), Na !== null && hs(Na, e), cl.forEach(t), fl.forEach(t);
    for (var a = 0; a < Ca.length; a++) {
      var o = Ca[a];
      o.blockedOn === e && (o.blockedOn = null);
    }
    for (; 0 < Ca.length && (a = Ca[0], a.blockedOn === null); )
      bp(a), a.blockedOn === null && Ca.shift();
    if (a = (e.ownerDocument || e).$$reactFormReplay, a != null)
      for (o = 0; o < a.length; o += 3) {
        var u = a[o], d = a[o + 1], w = u[vt] || null;
        if (typeof d == "function")
          w || wp(a);
        else if (w) {
          var R = null;
          if (d && d.hasAttribute("formAction")) {
            if (u = d, w = d[vt] || null)
              R = w.formAction;
            else if (Df(u) !== null) continue;
          } else R = w.action;
          typeof R == "function" ? a[o + 1] = R : (a.splice(o, 3), o -= 3), wp(a);
        }
      }
  }
  function Sp() {
    function e(d) {
      d.canIntercept && d.info === "react-transition" && d.intercept({
        handler: function() {
          return new Promise(function(w) {
            return u = w;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      u !== null && (u(), u = null), o || setTimeout(a, 20);
    }
    function a() {
      if (!o && !navigation.transition) {
        var d = navigation.currentEntry;
        d && d.url != null && navigation.navigate(d.url, {
          state: d.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var o = !1, u = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(a, 100), function() {
        o = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), u !== null && (u(), u = null);
      };
    }
  }
  function zf(e) {
    this._internalRoot = e;
  }
  ms.prototype.render = zf.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(r(409));
    var a = t.current, o = Vt();
    hp(a, o, e, t, null, null);
  }, ms.prototype.unmount = zf.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      hp(e.current, 2, null, e, null, null), Kr(), t[Cn] = null;
    }
  };
  function ms(e) {
    this._internalRoot = e;
  }
  ms.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Fl();
      e = { blockedOn: null, target: e, priority: t };
      for (var a = 0; a < Ca.length && t !== 0 && t < Ca[a].priority; a++) ;
      Ca.splice(a, 0, e), a === 0 && bp(e);
    }
  };
  var Ep = i.version;
  if (Ep !== "19.2.4")
    throw Error(
      r(
        527,
        Ep,
        "19.2.4"
      )
    );
  z.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(r(188)) : (e = Object.keys(e).join(","), Error(r(268, e)));
    return e = m(t), e = e !== null ? y(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var p1 = {
    bundleType: 0,
    version: "19.2.4",
    rendererPackageName: "react-dom",
    currentDispatcherRef: _,
    reconcilerVersion: "19.2.4"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var ps = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ps.isDisabled && ps.supportsFiber)
      try {
        Ba = ps.inject(
          p1
        ), xt = ps;
      } catch {
      }
  }
  return yl.createRoot = function(e, t) {
    if (!s(e)) throw Error(r(299));
    var a = !1, o = "", u = Ag, d = Dg, w = Og;
    return t != null && (t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (o = t.identifierPrefix), t.onUncaughtError !== void 0 && (u = t.onUncaughtError), t.onCaughtError !== void 0 && (d = t.onCaughtError), t.onRecoverableError !== void 0 && (w = t.onRecoverableError)), t = fp(
      e,
      1,
      !1,
      null,
      null,
      a,
      o,
      null,
      u,
      d,
      w,
      Sp
    ), e[Cn] = t.current, gf(e), new zf(t);
  }, yl.hydrateRoot = function(e, t, a) {
    if (!s(e)) throw Error(r(299));
    var o = !1, u = "", d = Ag, w = Dg, R = Og, W = null;
    return a != null && (a.unstable_strictMode === !0 && (o = !0), a.identifierPrefix !== void 0 && (u = a.identifierPrefix), a.onUncaughtError !== void 0 && (d = a.onUncaughtError), a.onCaughtError !== void 0 && (w = a.onCaughtError), a.onRecoverableError !== void 0 && (R = a.onRecoverableError), a.formState !== void 0 && (W = a.formState)), t = fp(
      e,
      1,
      !0,
      t,
      a ?? null,
      o,
      u,
      W,
      d,
      w,
      R,
      Sp
    ), t.context = dp(null), a = t.current, o = Vt(), o = wo(o), u = fa(o), u.callback = null, da(a, u, o), a = o, t.current.lanes = a, Ua(t, a), yn(t), e[Cn] = t.current, gf(e), new ms(t);
  }, yl.version = "19.2.4", yl;
}
var uy;
function bj() {
  if (uy) return nd.exports;
  uy = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (i) {
        console.error(i);
      }
  }
  return n(), nd.exports = vj(), nd.exports;
}
var xj = bj();
function Sj(n, i = {}) {
  const l = xj.createRoot(n);
  return l.render(/* @__PURE__ */ b.jsx(mj, { ...i })), {
    root: l,
    unmount() {
      l.unmount();
    }
  };
}
function Ej(n) {
  return {
    async listActions() {
      return n.map((i) => ({ ...i }));
    }
  };
}
export {
  w1 as BUILDER_JSON_RPC_VERSION,
  Tp as BUILDER_RPC_PATH,
  dy as BuilderResultError,
  mj as FSMUIBuilder,
  io as FSM_AUTHORING_METHODS,
  Nl as FSM_RUNTIME_METHODS,
  za as HANDLED_ERROR_CODES,
  T1 as buildRPCEndpoint,
  Aa as callBuilderMethod,
  D1 as createBuilderAuthoringRPC,
  j1 as createBuilderRPCClient,
  sj as createBuilderRuntimeRPC,
  H1 as createDefaultExportAdapter,
  ew as createLocalStoragePersistenceStore,
  Ej as createStaticActionCatalogProvider,
  R1 as definitionFromDraft,
  wj as formatHandledBuilderError,
  B1 as isRPCExportAvailable,
  xd as loadDraftDocumentForEditing,
  Sj as mountFSMUIBuilder,
  X1 as normalizeInitialDocumentInput,
  vy as normalizeRuntimeApplyEvent,
  by as normalizeRuntimeSnapshot,
  fj as prepareDraftDocumentForSave,
  zs as toHandledBuilderError,
  A1 as unwrapBuilderResponse,
  O1 as useAuthoringRPC,
  uj as useRuntimeRPC
};

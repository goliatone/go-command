function ry(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Af = { exports: {} }, hl = {};
var xp;
function p1() {
  if (xp) return hl;
  xp = 1;
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
var wp;
function y1() {
  return wp || (wp = 1, Af.exports = p1()), Af.exports;
}
var b = y1(), Df = { exports: {} }, Ee = {};
var Sp;
function v1() {
  if (Sp) return Ee;
  Sp = 1;
  var n = /* @__PURE__ */ Symbol.for("react.transitional.element"), i = /* @__PURE__ */ Symbol.for("react.portal"), l = /* @__PURE__ */ Symbol.for("react.fragment"), r = /* @__PURE__ */ Symbol.for("react.strict_mode"), s = /* @__PURE__ */ Symbol.for("react.profiler"), c = /* @__PURE__ */ Symbol.for("react.consumer"), f = /* @__PURE__ */ Symbol.for("react.context"), h = /* @__PURE__ */ Symbol.for("react.forward_ref"), g = /* @__PURE__ */ Symbol.for("react.suspense"), p = /* @__PURE__ */ Symbol.for("react.memo"), y = /* @__PURE__ */ Symbol.for("react.lazy"), m = /* @__PURE__ */ Symbol.for("react.activity"), v = Symbol.iterator;
  function x(j) {
    return j === null || typeof j != "object" ? null : (j = v && j[v] || j["@@iterator"], typeof j == "function" ? j : null);
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
  }, C = Object.assign, T = {};
  function A(j, q, G) {
    this.props = j, this.context = q, this.refs = T, this.updater = G || S;
  }
  A.prototype.isReactComponent = {}, A.prototype.setState = function(j, q) {
    if (typeof j != "object" && typeof j != "function" && j != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, j, q, "setState");
  }, A.prototype.forceUpdate = function(j) {
    this.updater.enqueueForceUpdate(this, j, "forceUpdate");
  };
  function D() {
  }
  D.prototype = A.prototype;
  function E(j, q, G) {
    this.props = j, this.context = q, this.refs = T, this.updater = G || S;
  }
  var M = E.prototype = new D();
  M.constructor = E, C(M, A.prototype), M.isPureReactComponent = !0;
  var H = Array.isArray;
  function U() {
  }
  var Y = { H: null, A: null, T: null, S: null }, X = Object.prototype.hasOwnProperty;
  function te(j, q, G) {
    var R = G.ref;
    return {
      $$typeof: n,
      type: j,
      key: q,
      ref: R !== void 0 ? R : null,
      props: G
    };
  }
  function K(j, q) {
    return te(j.type, q, j.props);
  }
  function V(j) {
    return typeof j == "object" && j !== null && j.$$typeof === n;
  }
  function Q(j) {
    var q = { "=": "=0", ":": "=2" };
    return "$" + j.replace(/[=:]/g, function(G) {
      return q[G];
    });
  }
  var J = /\/+/g;
  function N(j, q) {
    return typeof j == "object" && j !== null && j.key != null ? Q("" + j.key) : q.toString(36);
  }
  function L(j) {
    switch (j.status) {
      case "fulfilled":
        return j.value;
      case "rejected":
        throw j.reason;
      default:
        switch (typeof j.status == "string" ? j.then(U, U) : (j.status = "pending", j.then(
          function(q) {
            j.status === "pending" && (j.status = "fulfilled", j.value = q);
          },
          function(q) {
            j.status === "pending" && (j.status = "rejected", j.reason = q);
          }
        )), j.status) {
          case "fulfilled":
            return j.value;
          case "rejected":
            throw j.reason;
        }
    }
    throw j;
  }
  function _(j, q, G, R, O) {
    var $ = typeof j;
    ($ === "undefined" || $ === "boolean") && (j = null);
    var W = !1;
    if (j === null) W = !0;
    else
      switch ($) {
        case "bigint":
        case "string":
        case "number":
          W = !0;
          break;
        case "object":
          switch (j.$$typeof) {
            case n:
            case i:
              W = !0;
              break;
            case y:
              return W = j._init, _(
                W(j._payload),
                q,
                G,
                R,
                O
              );
          }
      }
    if (W)
      return O = O(j), W = R === "" ? "." + N(j, 0) : R, H(O) ? (G = "", W != null && (G = W.replace(J, "$&/") + "/"), _(O, q, G, "", function(de) {
        return de;
      })) : O != null && (V(O) && (O = K(
        O,
        G + (O.key == null || j && j.key === O.key ? "" : ("" + O.key).replace(
          J,
          "$&/"
        ) + "/") + W
      )), q.push(O)), 1;
    W = 0;
    var P = R === "" ? "." : R + ":";
    if (H(j))
      for (var ie = 0; ie < j.length; ie++)
        R = j[ie], $ = P + N(R, ie), W += _(
          R,
          q,
          G,
          $,
          O
        );
    else if (ie = x(j), typeof ie == "function")
      for (j = ie.call(j), ie = 0; !(R = j.next()).done; )
        R = R.value, $ = P + N(R, ie++), W += _(
          R,
          q,
          G,
          $,
          O
        );
    else if ($ === "object") {
      if (typeof j.then == "function")
        return _(
          L(j),
          q,
          G,
          R,
          O
        );
      throw q = String(j), Error(
        "Objects are not valid as a React child (found: " + (q === "[object Object]" ? "object with keys {" + Object.keys(j).join(", ") + "}" : q) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return W;
  }
  function k(j, q, G) {
    if (j == null) return j;
    var R = [], O = 0;
    return _(j, R, "", "", function($) {
      return q.call(G, $, O++);
    }), R;
  }
  function B(j) {
    if (j._status === -1) {
      var q = j._result;
      q = q(), q.then(
        function(G) {
          (j._status === 0 || j._status === -1) && (j._status = 1, j._result = G);
        },
        function(G) {
          (j._status === 0 || j._status === -1) && (j._status = 2, j._result = G);
        }
      ), j._status === -1 && (j._status = 0, j._result = q);
    }
    if (j._status === 1) return j._result.default;
    throw j._result;
  }
  var Z = typeof reportError == "function" ? reportError : function(j) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var q = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof j == "object" && j !== null && typeof j.message == "string" ? String(j.message) : String(j),
        error: j
      });
      if (!window.dispatchEvent(q)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", j);
      return;
    }
    console.error(j);
  }, I = {
    map: k,
    forEach: function(j, q, G) {
      k(
        j,
        function() {
          q.apply(this, arguments);
        },
        G
      );
    },
    count: function(j) {
      var q = 0;
      return k(j, function() {
        q++;
      }), q;
    },
    toArray: function(j) {
      return k(j, function(q) {
        return q;
      }) || [];
    },
    only: function(j) {
      if (!V(j))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return j;
    }
  };
  return Ee.Activity = m, Ee.Children = I, Ee.Component = A, Ee.Fragment = l, Ee.Profiler = s, Ee.PureComponent = E, Ee.StrictMode = r, Ee.Suspense = g, Ee.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Y, Ee.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(j) {
      return Y.H.useMemoCache(j);
    }
  }, Ee.cache = function(j) {
    return function() {
      return j.apply(null, arguments);
    };
  }, Ee.cacheSignal = function() {
    return null;
  }, Ee.cloneElement = function(j, q, G) {
    if (j == null)
      throw Error(
        "The argument must be a React element, but you passed " + j + "."
      );
    var R = C({}, j.props), O = j.key;
    if (q != null)
      for ($ in q.key !== void 0 && (O = "" + q.key), q)
        !X.call(q, $) || $ === "key" || $ === "__self" || $ === "__source" || $ === "ref" && q.ref === void 0 || (R[$] = q[$]);
    var $ = arguments.length - 2;
    if ($ === 1) R.children = G;
    else if (1 < $) {
      for (var W = Array($), P = 0; P < $; P++)
        W[P] = arguments[P + 2];
      R.children = W;
    }
    return te(j.type, O, R);
  }, Ee.createContext = function(j) {
    return j = {
      $$typeof: f,
      _currentValue: j,
      _currentValue2: j,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, j.Provider = j, j.Consumer = {
      $$typeof: c,
      _context: j
    }, j;
  }, Ee.createElement = function(j, q, G) {
    var R, O = {}, $ = null;
    if (q != null)
      for (R in q.key !== void 0 && ($ = "" + q.key), q)
        X.call(q, R) && R !== "key" && R !== "__self" && R !== "__source" && (O[R] = q[R]);
    var W = arguments.length - 2;
    if (W === 1) O.children = G;
    else if (1 < W) {
      for (var P = Array(W), ie = 0; ie < W; ie++)
        P[ie] = arguments[ie + 2];
      O.children = P;
    }
    if (j && j.defaultProps)
      for (R in W = j.defaultProps, W)
        O[R] === void 0 && (O[R] = W[R]);
    return te(j, $, O);
  }, Ee.createRef = function() {
    return { current: null };
  }, Ee.forwardRef = function(j) {
    return { $$typeof: h, render: j };
  }, Ee.isValidElement = V, Ee.lazy = function(j) {
    return {
      $$typeof: y,
      _payload: { _status: -1, _result: j },
      _init: B
    };
  }, Ee.memo = function(j, q) {
    return {
      $$typeof: p,
      type: j,
      compare: q === void 0 ? null : q
    };
  }, Ee.startTransition = function(j) {
    var q = Y.T, G = {};
    Y.T = G;
    try {
      var R = j(), O = Y.S;
      O !== null && O(G, R), typeof R == "object" && R !== null && typeof R.then == "function" && R.then(U, Z);
    } catch ($) {
      Z($);
    } finally {
      q !== null && G.types !== null && (q.types = G.types), Y.T = q;
    }
  }, Ee.unstable_useCacheRefresh = function() {
    return Y.H.useCacheRefresh();
  }, Ee.use = function(j) {
    return Y.H.use(j);
  }, Ee.useActionState = function(j, q, G) {
    return Y.H.useActionState(j, q, G);
  }, Ee.useCallback = function(j, q) {
    return Y.H.useCallback(j, q);
  }, Ee.useContext = function(j) {
    return Y.H.useContext(j);
  }, Ee.useDebugValue = function() {
  }, Ee.useDeferredValue = function(j, q) {
    return Y.H.useDeferredValue(j, q);
  }, Ee.useEffect = function(j, q) {
    return Y.H.useEffect(j, q);
  }, Ee.useEffectEvent = function(j) {
    return Y.H.useEffectEvent(j);
  }, Ee.useId = function() {
    return Y.H.useId();
  }, Ee.useImperativeHandle = function(j, q, G) {
    return Y.H.useImperativeHandle(j, q, G);
  }, Ee.useInsertionEffect = function(j, q) {
    return Y.H.useInsertionEffect(j, q);
  }, Ee.useLayoutEffect = function(j, q) {
    return Y.H.useLayoutEffect(j, q);
  }, Ee.useMemo = function(j, q) {
    return Y.H.useMemo(j, q);
  }, Ee.useOptimistic = function(j, q) {
    return Y.H.useOptimistic(j, q);
  }, Ee.useReducer = function(j, q, G) {
    return Y.H.useReducer(j, q, G);
  }, Ee.useRef = function(j) {
    return Y.H.useRef(j);
  }, Ee.useState = function(j) {
    return Y.H.useState(j);
  }, Ee.useSyncExternalStore = function(j, q, G) {
    return Y.H.useSyncExternalStore(
      j,
      q,
      G
    );
  }, Ee.useTransition = function() {
    return Y.H.useTransition();
  }, Ee.version = "19.2.4", Ee;
}
var Ep;
function Bl() {
  return Ep || (Ep = 1, Df.exports = v1()), Df.exports;
}
var ee = Bl();
const yl = /* @__PURE__ */ ry(ee), _p = "/rpc", b1 = "2.0", _l = {
  applyEvent: "fsm.apply_event",
  snapshot: "fsm.snapshot"
}, io = {
  listMachines: "fsm.authoring.list_machines",
  getMachine: "fsm.authoring.get_machine",
  saveDraft: "fsm.authoring.save_draft",
  validate: "fsm.authoring.validate",
  publish: "fsm.authoring.publish",
  deleteMachine: "fsm.authoring.delete_machine"
}, si = {
  versionConflict: "FSM_VERSION_CONFLICT",
  idempotencyConflict: "FSM_IDEMPOTENCY_CONFLICT",
  guardRejected: "FSM_GUARD_REJECTED",
  invalidTransition: "FSM_INVALID_TRANSITION",
  stateNotFound: "FSM_STATE_NOT_FOUND",
  authoringNotFound: "FSM_AUTHORING_NOT_FOUND",
  authoringValidationFailed: "FSM_AUTHORING_VALIDATION_FAILED",
  internal: "FSM_INTERNAL"
};
class Hs extends Error {
  method;
  code;
  data;
  status;
  constructor(i) {
    super(i.message), this.name = "RPCClientError", this.method = i.method, this.code = i.code, this.data = i.data, this.status = i.status;
  }
}
function x1() {
  return Math.random().toString(36).slice(2);
}
function w1(n, i, l) {
  const r = {
    id: (l.idGenerator ?? x1)(),
    method: n
  };
  return i !== void 0 && (r.params = i), l.rpcVersion === "2.0" && (r.jsonrpc = "2.0"), r;
}
function sy(n) {
  return !!n && typeof n == "object" && !Array.isArray(n);
}
function S1(n, i) {
  if (!sy(i))
    return i;
  if (i.error)
    throw new Hs({
      method: n,
      message: i.error.message || `rpc call failed: ${n}`,
      code: i.error.code,
      data: i.error.data
    });
  return "result" in i ? i.result : i;
}
function E1() {
  if (typeof globalThis.fetch != "function")
    throw new Error("global fetch is unavailable; provide fetchImpl explicitly");
  return globalThis.fetch.bind(globalThis);
}
class _1 {
  constructor(i) {
    this.options = i, this.fetchImpl = i.fetchImpl ?? E1();
  }
  fetchImpl;
  async call(i, l) {
    const r = JSON.stringify(w1(i, l, this.options)), s = await this.fetchImpl(this.options.endpoint, {
      ...this.options.requestInit,
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...this.options.headers ?? {}
      },
      body: r
    }), c = await s.json().catch(() => null);
    if (!s.ok)
      throw sy(c) && c.error ? new Hs({
        method: i,
        message: c.error.message || `rpc call failed (${s.status})`,
        code: c.error.code,
        data: c.error.data,
        status: s.status
      }) : new Hs({
        method: i,
        message: `rpc call failed (${s.status})`,
        status: s.status,
        data: c
      });
    return S1(i, c);
  }
}
class uy extends Error {
  method;
  envelope;
  constructor(i, l) {
    super(l.message), this.name = "BuilderResultError", this.method = i, this.envelope = l;
  }
}
function N1(n) {
  return n.replace(/\/+$/, "");
}
function C1(n) {
  return n.endpoint && n.endpoint.trim() !== "" ? n.endpoint : !n.origin || n.origin.trim() === "" ? _p : `${N1(n.origin)}${_p}`;
}
function cj(n = {}) {
  return new _1({
    endpoint: C1(n),
    rpcVersion: b1,
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
  return M1(n.method, l);
}
function M1(n, i) {
  if (i.error)
    throw new uy(n, i.error);
  if (i.data === void 0)
    throw new Error(`rpc result missing data envelope for method ${n}`);
  return i.data;
}
function T1(n) {
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
function j1(n) {
  return ee.useMemo(() => n ? T1(n) : null, [n]);
}
function A1(n) {
  return `${n.trim().replace(/[^a-zA-Z0-9_-]+/g, "-") || "machine"}.json`;
}
function D1(n) {
  return n.definition;
}
function O1(n, i) {
  if (typeof window > "u" || typeof document > "u")
    return;
  const l = new Blob([i], { type: "application/json;charset=utf-8" }), r = window.URL.createObjectURL(l), s = document.createElement("a");
  s.href = r, s.download = n, s.style.display = "none", document.body.appendChild(s), s.click(), document.body.removeChild(s), window.URL.revokeObjectURL(r);
}
function z1(n = {}) {
  return {
    async exportJSON({ machineId: i, draft: l }) {
      O1(A1(i), JSON.stringify(D1(l), null, 2));
    },
    exportRPC: n.exportRPC
  };
}
function R1(n) {
  return !!n?.exportRPC;
}
const k1 = ["step", "when"], cy = ["parallel", "join", "batch", "compensation"];
function Bs(n) {
  return k1.includes(n);
}
function fy(n) {
  return cy.includes(n);
}
function H1(n) {
  const i = /* @__PURE__ */ new Set();
  for (const l of n.transitions)
    for (const r of l.workflow?.nodes ?? [])
      fy(r.kind) && i.add(r.kind);
  return [...i];
}
function dy() {
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
function Xe(n) {
  return typeof structuredClone == "function" ? structuredClone(n) : JSON.parse(JSON.stringify(n));
}
function vl(n) {
  return JSON.stringify(n);
}
function B1(n) {
  const i = n.event || "(event)", l = n.to || n.dynamic_to?.resolver || "(target)";
  return `${i} -> ${l}`;
}
function L1(n, i) {
  return n.filter((l) => hy(l, i));
}
function gs(n, i, l) {
  return n.filter((r) => hy(r, i) ? r.field === l || r.path.endsWith(`.${l}`) : !1);
}
function hy(n, i) {
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
function ms(n, i) {
  const l = n.match(i);
  if (!l?.[1])
    return null;
  const r = Number.parseInt(l[1], 10);
  return Number.isNaN(r) ? null : r;
}
function U1(n, i) {
  for (let l = 0; l < n.transitions.length; l += 1) {
    const r = n.transitions[l]?.workflow?.nodes ?? [];
    for (let s = 0; s < r.length; s += 1)
      if (r[s]?.id === i)
        return { kind: "workflow-node", transitionIndex: l, nodeIndex: s };
  }
  return null;
}
function V1(n, i) {
  const l = n.transitions.findIndex((r) => r.id === i);
  return l === -1 ? null : { kind: "transition", transitionIndex: l };
}
function Y1(n, i) {
  const l = n.states.findIndex((r) => r.name === i);
  return l === -1 ? null : { kind: "state", stateIndex: l };
}
function I1(n, i) {
  if (i.node_id)
    return U1(n, i.node_id) || V1(n, i.node_id) || Y1(n, i.node_id);
  const l = ms(i.path, /transitions\[(\d+)\]/), r = ms(i.path, /workflow\.nodes\[(\d+)\]/);
  if (l !== null && r !== null)
    return {
      kind: "workflow-node",
      transitionIndex: l,
      nodeIndex: r
    };
  const s = ms(i.path, /transitions\[(\d+)\]/);
  if (s !== null)
    return { kind: "transition", transitionIndex: s };
  const c = ms(i.path, /states\[(\d+)\]/);
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
function q1(n, i, l, r, s) {
  const c = `$.transitions[${i}].workflow.nodes[${r}]`;
  if (!Bs(l.kind)) {
    const f = fy(l.kind) ? `${l.kind} is unsupported in builder v1` : `unsupported workflow node kind ${l.kind}`;
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
function gy(n) {
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
      q1(l, r, h, g, i);
    });
  }), i;
}
const X1 = "fsm-ui-builder.autosave";
function ps() {
  return typeof window > "u" || typeof window.localStorage > "u" ? !1 : typeof window.localStorage.getItem == "function" && typeof window.localStorage.setItem == "function" && typeof window.localStorage.removeItem == "function";
}
function Of(n) {
  return n.trim();
}
function Np(n) {
  if (!n)
    return null;
  try {
    const i = JSON.parse(n);
    return !i || typeof i != "object" || typeof i.machineId != "string" || !i.document || typeof i.updatedAt != "string" ? null : {
      machineId: i.machineId,
      updatedAt: i.updatedAt,
      document: Xe(i.document)
    };
  } catch {
    return null;
  }
}
function G1(n, i) {
  return n.startsWith(`${i}:`);
}
function zf(n, i) {
  return `${n}:${i}`;
}
function Z1(n = X1) {
  return {
    async list() {
      if (!ps())
        return [];
      const i = [];
      for (let l = 0; l < window.localStorage.length; l += 1) {
        const r = window.localStorage.key(l);
        if (!r || !G1(r, n))
          continue;
        const s = Np(window.localStorage.getItem(r));
        s && i.push({ machineId: s.machineId, updatedAt: s.updatedAt });
      }
      return i.sort((l, r) => r.updatedAt.localeCompare(l.updatedAt)), i;
    },
    async load(i) {
      const l = Of(i);
      if (l === "" || !ps())
        return null;
      const r = zf(n, l), s = Np(window.localStorage.getItem(r));
      return s ? {
        machineId: s.machineId,
        updatedAt: s.updatedAt,
        document: Xe(s.document)
      } : null;
    },
    async save(i) {
      const l = Of(i.machineId);
      if (l === "" || !ps())
        return;
      const r = zf(n, l), s = {
        machineId: l,
        updatedAt: i.updatedAt,
        document: Xe(i.document)
      };
      window.localStorage.setItem(r, JSON.stringify(s));
    },
    async delete(i) {
      const l = Of(i);
      l === "" || !ps() || window.localStorage.removeItem(zf(n, l));
    }
  };
}
const Cp = (n) => {
  let i;
  const l = /* @__PURE__ */ new Set(), r = (p, y) => {
    const m = typeof p == "function" ? p(i) : p;
    if (!Object.is(m, i)) {
      const v = i;
      i = y ?? (typeof m != "object" || m === null) ? m : Object.assign({}, i, m), l.forEach((x) => x(i, v));
    }
  }, s = () => i, h = { setState: r, getState: s, getInitialState: () => g, subscribe: (p) => (l.add(p), () => l.delete(p)) }, g = i = n(r, s, h);
  return h;
}, yd = ((n) => n ? Cp(n) : Cp), $1 = (n) => n;
function vd(n, i = $1) {
  const l = yl.useSyncExternalStore(
    n.subscribe,
    yl.useCallback(() => i(n.getState()), [n, i]),
    yl.useCallback(() => i(n.getInitialState()), [n, i])
  );
  return yl.useDebugValue(l), l;
}
function bl(n, i) {
  return i <= 0 ? 0 : Math.min(Math.max(0, n), i - 1);
}
function xl(n, i = []) {
  const l = gy(n.definition);
  return i.length === 0 ? l : [...i, ...l];
}
function Ls(n, i) {
  const l = n.id.trim();
  return l !== "" ? `id:${l}` : `index:${i}`;
}
function li(n) {
  const i = {};
  for (const [l, r] of Object.entries(n))
    i[l] = {
      staticTo: r.staticTo,
      dynamicTarget: r.dynamicTarget ? Xe(r.dynamicTarget) : void 0
    };
  return i;
}
function Rf(n) {
  const i = {};
  return n.definition.transitions.forEach((l, r) => {
    i[Ls(l, r)] = {
      staticTo: l.to,
      dynamicTarget: l.dynamic_to ? Xe(l.dynamic_to) : void 0
    };
  }), i;
}
function Mp(n, i, l) {
  const r = Ls(i, l), s = n[r];
  if (s)
    return s;
  const c = {
    staticTo: i.to,
    dynamicTarget: i.dynamic_to ? Xe(i.dynamic_to) : void 0
  };
  return n[r] = c, c;
}
function Q1(n, i) {
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
function As(n, i, l) {
  const r = bl(i, n.length), s = n[r], c = vl(s.document);
  return {
    document: Xe(s.document),
    selection: s.selection,
    diagnostics: [...s.diagnostics],
    targetCache: li(s.targetCache),
    history: n,
    historyIndex: r,
    baselineHash: l,
    isDirty: c !== l
  };
}
function ys(n) {
  return n.workflow || (n.workflow = { nodes: [] }), Array.isArray(n.workflow.nodes) || (n.workflow.nodes = []), n;
}
function Yt(n, i, l, r) {
  n.setState((s) => {
    const c = Xe(s.document), f = li(s.targetCache);
    l(c, s, f);
    const h = xl(c), g = r ? r(c, s) : s.selection, p = s.history.slice(0, s.historyIndex + 1);
    return p.push({
      document: c,
      selection: g,
      diagnostics: h,
      targetCache: f,
      transaction: i
    }), As(p, p.length - 1, s.baselineHash);
  });
}
function vs(n) {
  return n.states.length === 0 ? "" : n.states[0]?.name ?? "";
}
function Tp(n, i) {
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
function K1(n = {}) {
  const i = Xe(n.document ?? dy()), l = { kind: "machine" }, r = xl(i, n.diagnostics), s = Rf(i), c = vl(i), f = [
    {
      document: i,
      selection: l,
      diagnostics: r,
      targetCache: li(s),
      transaction: "init"
    }
  ], h = yd((g, p) => ({
    document: Xe(i),
    selection: l,
    diagnostics: [...r],
    targetCache: li(s),
    history: f,
    historyIndex: 0,
    baselineHash: c,
    isDirty: !1,
    setSelection(y) {
      g({ selection: y });
    },
    replaceDocument(y, m) {
      g(() => {
        const v = Xe(y), x = xl(v, m), S = Rf(v), C = { kind: "machine" }, T = [
          {
            document: v,
            selection: C,
            diagnostics: x,
            targetCache: li(S),
            transaction: "replace-document"
          }
        ], A = vl(v);
        return {
          document: Xe(v),
          selection: C,
          diagnostics: x,
          targetCache: li(S),
          history: T,
          historyIndex: 0,
          baselineHash: A,
          isDirty: !1
        };
      });
    },
    setDiagnostics(y) {
      g((m) => ({ diagnostics: xl(m.document, y) }));
    },
    focusDiagnostic(y) {
      g((m) => {
        const v = I1(m.document.definition, y);
        return v ? { selection: v } : m;
      });
    },
    setMachineName(y) {
      Yt(h, "set-machine-name", (m) => {
        m.definition.name = y;
      });
    },
    addState() {
      Yt(
        h,
        "add-state",
        (y) => {
          const m = y.definition.states.length + 1;
          y.definition.states.push({ name: `state_${m}` });
        },
        (y) => ({ kind: "state", stateIndex: Math.max(0, y.definition.states.length - 1) })
      );
    },
    removeState(y) {
      Yt(
        h,
        "remove-state",
        (m) => {
          if (y < 0 || y >= m.definition.states.length)
            return;
          const v = m.definition.states[y]?.name;
          m.definition.states.splice(y, 1), v && m.definition.transitions.forEach((x) => {
            x.from === v && (x.from = vs(m.definition)), x.to === v && (x.to = vs(m.definition));
          });
        },
        (m, v) => m.definition.states.length === 0 ? { kind: "machine" } : { kind: "state", stateIndex: v.selection.kind === "state" ? bl(Math.min(v.selection.stateIndex, y), m.definition.states.length) : bl(y, m.definition.states.length) }
      );
    },
    updateStateName(y, m) {
      Yt(h, "update-state-name", (v) => {
        const x = v.definition.states[y];
        if (!x)
          return;
        const S = x.name;
        x.name = m, v.definition.transitions.forEach((C) => {
          C.from === S && (C.from = m), C.to === S && (C.to = m);
        });
      });
    },
    updateStateFlag(y, m, v) {
      Yt(h, `update-state-${m}`, (x) => {
        const S = x.definition.states[y];
        S && (m === "initial" && v && x.definition.states.forEach((C) => {
          C.initial = !1;
        }), S[m] = v);
      });
    },
    addTransition() {
      Yt(
        h,
        "add-transition",
        (y, m, v) => {
          const x = vs(y.definition), S = y.definition.states[1]?.name ?? x, C = y.definition.transitions.length + 1, T = {
            id: `transition_${C}`,
            event: `event_${C}`,
            from: x,
            to: S,
            workflow: {
              nodes: [Tp("step", 0)]
            },
            metadata: {}
          };
          y.definition.transitions.push(T), v[Ls(T, y.definition.transitions.length - 1)] = {
            staticTo: T.to
          };
        },
        (y) => ({ kind: "transition", transitionIndex: Math.max(0, y.definition.transitions.length - 1) })
      );
    },
    removeTransition(y) {
      Yt(
        h,
        "remove-transition",
        (m, v, x) => {
          if (y < 0 || y >= m.definition.transitions.length)
            return;
          const S = m.definition.transitions[y];
          S && delete x[Ls(S, y)], m.definition.transitions.splice(y, 1);
          const C = Q1(x, y);
          Object.keys(x).forEach((T) => {
            delete x[T];
          }), Object.assign(x, C);
        },
        (m) => m.definition.transitions.length === 0 ? { kind: "machine" } : {
          kind: "transition",
          transitionIndex: bl(y, m.definition.transitions.length)
        }
      );
    },
    updateTransition(y, m, v) {
      Yt(h, `update-transition-${m}`, (x, S, C) => {
        const T = x.definition.transitions[y];
        if (!T)
          return;
        const A = Mp(C, T, y);
        if (m === "event") {
          T.event = v;
          return;
        }
        if (m === "from") {
          T.from = v;
          return;
        }
        if (m === "to") {
          T.to = v, A.staticTo = v;
          return;
        }
        if (m === "dynamic_to.resolver") {
          const D = {
            ...T.dynamic_to ?? A.dynamicTarget ?? { resolver: "" },
            resolver: v
          };
          T.dynamic_to = D, A.dynamicTarget = Xe(D);
        }
      });
    },
    updateTransitionTargetKind(y, m) {
      Yt(h, "update-transition-target-kind", (v, x, S) => {
        const C = v.definition.transitions[y];
        if (!C)
          return;
        const T = Mp(S, C, y);
        if (C.to && C.to.trim() !== "" && (T.staticTo = C.to), C.dynamic_to?.resolver && C.dynamic_to.resolver.trim() !== "" && (T.dynamicTarget = Xe(C.dynamic_to)), m === "static") {
          C.dynamic_to = void 0;
          const A = T.staticTo?.trim() ?? "";
          C.to = A || vs(v.definition);
          return;
        }
        C.to = void 0, C.dynamic_to = Xe(T.dynamicTarget ?? { resolver: "" });
      });
    },
    addWorkflowNode(y, m) {
      Yt(
        h,
        `add-${m}-workflow-node`,
        (v) => {
          const x = v.definition.transitions[y];
          if (!x)
            return;
          ys(x);
          const S = x.workflow.nodes.length;
          x.workflow.nodes.push(Tp(m, S));
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
    removeWorkflowNode(y, m) {
      Yt(
        h,
        "remove-workflow-node",
        (v) => {
          const x = v.definition.transitions[y];
          x && (ys(x), !(m < 0 || m >= x.workflow.nodes.length) && (x.workflow.nodes.splice(m, 1), x.workflow.nodes.forEach((S) => {
            Array.isArray(S.next) && (S.next = S.next.filter(
              (C) => x.workflow.nodes.some((T) => T.id === C)
            ));
          })));
        },
        (v) => {
          const x = v.definition.transitions[y];
          return !x || x.workflow.nodes.length === 0 ? { kind: "transition", transitionIndex: y } : {
            kind: "workflow-node",
            transitionIndex: y,
            nodeIndex: bl(m, x.workflow.nodes.length)
          };
        }
      );
    },
    selectWorkflowNode(y, m) {
      g({ selection: { kind: "workflow-node", transitionIndex: y, nodeIndex: m } });
    },
    updateWorkflowNodeField(y, m, v, x) {
      Yt(h, `update-workflow-node-${v}`, (S) => {
        const C = S.definition.transitions[y];
        if (!C)
          return;
        ys(C);
        const T = C.workflow.nodes[m];
        if (T && Bs(T.kind)) {
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
    updateWorkflowNodeMetadata(y, m, v) {
      Yt(h, "update-workflow-node-metadata", (x) => {
        const S = x.definition.transitions[y];
        if (!S)
          return;
        ys(S);
        const C = S.workflow.nodes[m];
        C && C.kind === "step" && (C.step = C.step ?? {
          action_id: "",
          async: !1,
          delay: "",
          timeout: "",
          metadata: {}
        }, C.step.metadata = Xe(v));
      });
    },
    undo() {
      const y = p();
      if (y.historyIndex === 0)
        return;
      const m = y.historyIndex - 1;
      g(As(y.history, m, y.baselineHash));
    },
    redo() {
      const y = p();
      if (y.historyIndex >= y.history.length - 1)
        return;
      const m = y.historyIndex + 1;
      g(As(y.history, m, y.baselineHash));
    },
    markSaved() {
      g((y) => ({
        baselineHash: vl(y.document),
        isDirty: !1
      }));
    },
    applyRemoteSave(y, m, v) {
      g((x) => {
        const S = Xe(x.document);
        S.definition.version = y, S.draft_state = Xe(m);
        const C = xl(S, v), T = Rf(S), A = {
          document: S,
          selection: x.selection,
          diagnostics: C,
          targetCache: li(T),
          transaction: "apply-remote-save"
        }, D = x.history.slice(0, x.historyIndex + 1);
        D.push(A);
        const E = vl(S);
        return As(D, D.length - 1, E);
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
function wl(n, i) {
  for (const l of i) {
    const r = n[l];
    if (typeof r == "number" && Number.isFinite(r))
      return r;
  }
}
function Ml(n, i, l = !1) {
  for (const r of i) {
    const s = n[r];
    if (typeof s == "boolean")
      return s;
  }
  return l;
}
function J1(n, i) {
  for (const l of i) {
    const r = n[l];
    if (typeof r == "boolean")
      return r;
  }
}
function W1(n, i) {
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
function jp(n) {
  if (typeof n == "number")
    return n / 1e6;
}
function F1(n) {
  const i = Pt(n) ?? {};
  return {
    kind: nt(i, ["kind", "Kind"]),
    to: nt(i, ["to", "To"]) || void 0,
    resolver: nt(i, ["resolver", "Resolver"]) || void 0,
    resolved: Ml(i, ["resolved", "Resolved"]),
    resolvedTo: nt(i, ["resolvedTo", "ResolvedTo"]) || void 0,
    candidates: W1(i, ["candidates", "Candidates"])
  };
}
function P1(n) {
  const i = Pt(n) ?? {}, l = i.rejections ?? i.Rejections, r = Array.isArray(l) ? l.map((s) => ew(s)) : void 0;
  return {
    id: nt(i, ["id", "ID"]),
    event: nt(i, ["event", "Event"]),
    target: F1(i.target ?? i.Target),
    allowed: Ml(i, ["allowed", "Allowed"], !0),
    rejections: r,
    metadata: ui(i, ["metadata", "Metadata"])
  };
}
function ew(n) {
  const i = Pt(n) ?? {};
  return {
    code: nt(i, ["code", "Code"]),
    category: nt(i, ["category", "Category"]),
    retryable: Ml(i, ["retryable", "Retryable"]),
    requiresAction: Ml(i, ["requiresAction", "RequiresAction"]),
    message: nt(i, ["message", "Message"]),
    remediationHint: nt(i, ["remediationHint", "RemediationHint"]) || void 0,
    metadata: ui(i, ["metadata", "Metadata"])
  };
}
function tw(n) {
  const i = Pt(n) ?? {}, l = nt(i, ["kind", "Kind"]), r = nt(i, ["actionId", "ActionID"]);
  if (l === "command" || r !== "") {
    const c = wl(i, ["delayMs", "DelayMs"]), f = wl(i, ["timeoutMs", "TimeoutMs"]), h = c ?? jp(wl(i, ["Delay", "delay"])), g = f ?? jp(wl(i, ["Timeout", "timeout"])), p = {
      kind: "command",
      actionId: r,
      payload: ui(i, ["payload", "Payload"]) ?? {},
      async: Ml(i, ["async", "Async"]),
      metadata: ui(i, ["metadata", "Metadata"])
    };
    return h !== void 0 && (p.delayMs = h), g !== void 0 && (p.timeoutMs = g), p;
  }
  return {
    kind: "emit_event",
    event: nt(i, ["event", "Event"]),
    msg: i.msg ?? i.Msg,
    metadata: ui(i, ["metadata", "Metadata"])
  };
}
function nw(n) {
  const i = Pt(n) ?? {}, l = i.effects ?? i.Effects, r = Array.isArray(l) ? l.map((s) => tw(s)) : [];
  return {
    previousState: nt(i, ["previousState", "PreviousState"]),
    currentState: nt(i, ["currentState", "CurrentState"]),
    effects: r
  };
}
function my(n) {
  const i = Pt(n) ?? {}, l = i.allowedTransitions ?? i.AllowedTransitions, r = Array.isArray(l) ? l.map((s) => P1(s)) : [];
  return {
    entityId: nt(i, ["entityId", "EntityID"]),
    currentState: nt(i, ["currentState", "CurrentState"]),
    allowedTransitions: r,
    metadata: ui(i, ["metadata", "Metadata"])
  };
}
function aw(n) {
  const i = Pt(n) ?? {};
  return {
    executionId: nt(i, ["executionId", "ExecutionID"]),
    policy: nt(i, ["policy", "Policy"]) || void 0,
    status: nt(i, ["status", "Status"]),
    metadata: ui(i, ["metadata", "Metadata"])
  };
}
function iw(n) {
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
    version: wl(c, ["version", "Version"]) ?? 0,
    transition: nw(f),
    snapshot: my(h),
    execution: g ? aw(g) : void 0,
    idempotencyHit: J1(c, ["idempotencyHit", "IdempotencyHit"])
  };
}
function Ap(n) {
  return n !== null && typeof n == "object" && !Array.isArray(n) ? n : null;
}
function ow(n) {
  const i = Ap(n);
  if (!i)
    return n;
  const l = Ap(i.result ?? i.Result);
  return l ? l.data ?? l.Data ?? l : i.data ?? i.Data ?? i;
}
function py(n) {
  return iw(n);
}
function yy(n) {
  return my(ow(n));
}
function Us(n, i) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    level: n,
    message: i,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function lw(n) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    code: n.code,
    message: n.message,
    method: n.method,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function rw(n, i) {
  const l = py(n), r = l.execution?.status ?? "dry_run", s = {
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
      Us(
        "info",
        `Projected ${s.event}: ${s.previousState} -> ${s.currentState} (${s.status})`
      )
    ]
  };
}
function sw(n) {
  const i = yy(n), l = i.allowedTransitions.filter((r) => !r.allowed);
  return {
    snapshotResult: i,
    blockedTransitions: l,
    log: [
      Us(
        "info",
        `Snapshot state ${i.currentState}, blocked transitions: ${l.length}`
      )
    ]
  };
}
function uw() {
  return yd((n) => ({
    applyEventResult: null,
    snapshotResult: null,
    projectedOutcome: null,
    blockedTransitions: [],
    errors: [],
    log: [],
    setApplyEventWirePayload(i, l) {
      const r = rw(i, l);
      n((s) => ({
        applyEventResult: r.applyEventResult,
        projectedOutcome: r.projectedOutcome,
        log: [...s.log, ...r.log]
      }));
    },
    setSnapshotWirePayload(i) {
      const l = sw(i);
      n((r) => ({
        snapshotResult: l.snapshotResult,
        blockedTransitions: l.blockedTransitions,
        log: [...r.log, ...l.log]
      }));
    },
    pushError(i) {
      n((l) => ({
        errors: [...l.errors, lw(i)],
        log: [...l.log, Us("error", `[${i.code}] ${i.message}`)]
      }));
    },
    pushInfo(i) {
      n((l) => ({
        log: [...l.log, Us("info", i)]
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
const vy = "fsm-ui-builder.panel-layout", by = "fsm-ui-builder.theme";
function Oa(n, i, l) {
  return Number.isNaN(n) ? i : Math.min(Math.max(n, i), l);
}
function kf() {
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
function Ps() {
  return typeof window > "u" || typeof window.localStorage > "u" ? !1 : typeof window.localStorage.getItem == "function" && typeof window.localStorage.setItem == "function";
}
function cw() {
  if (!Ps())
    return kf();
  const n = window.localStorage.getItem(vy);
  if (!n)
    return kf();
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
    return kf();
  }
}
function ii(n) {
  Ps() && window.localStorage.setItem(vy, JSON.stringify(n));
}
function fw() {
  return Ps() && window.localStorage.getItem(by) === "dark" ? "dark" : "light";
}
function Dp(n) {
  Ps() && window.localStorage.setItem(by, n);
}
function dw() {
  const n = cw(), i = fw();
  return yd((l) => ({
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
        return ii(f), f;
      });
    },
    setConsoleHeight(r) {
      l((s) => {
        const c = {
          ...s,
          consoleHeight: Oa(r, 80, 300)
        };
        return ii(c), c;
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
        return ii(f), f;
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
        return ii(c), c;
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
        return ii(c), c;
      });
    },
    panCanvas(r, s) {
      l((c) => {
        const f = {
          ...c,
          canvasOffsetX: c.canvasOffsetX + r,
          canvasOffsetY: c.canvasOffsetY + s
        };
        return ii(f), f;
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
        return ii(s), s;
      });
    },
    setViewportMode(r) {
      l({ viewportMode: r });
    },
    setMobilePanel(r) {
      l({ mobilePanel: r });
    },
    setTheme(r) {
      Dp(r), l({ theme: r });
    },
    toggleTheme() {
      l((r) => {
        const s = r.theme === "light" ? "dark" : "light";
        return Dp(s), { theme: s };
      });
    }
  }));
}
const xy = ee.createContext(null), wy = ee.createContext(null), Sy = ee.createContext(null);
function hw(n) {
  const i = ee.useRef(null), l = ee.useRef(null), r = ee.useRef(null);
  return i.current || (i.current = K1({
    document: n.initialDocument,
    diagnostics: n.initialDiagnostics
  })), l.current || (l.current = dw()), r.current || (r.current = uw()), /* @__PURE__ */ b.jsx(xy.Provider, { value: i.current, children: /* @__PURE__ */ b.jsx(wy.Provider, { value: l.current, children: /* @__PURE__ */ b.jsx(Sy.Provider, { value: r.current, children: n.children }) }) });
}
function bd(n, i) {
  if (!n)
    throw new Error(i);
  return n;
}
function be(n) {
  const i = bd(
    ee.useContext(xy),
    "Machine store context is missing. Wrap with BuilderStoresProvider."
  );
  return vd(i, n);
}
function He(n) {
  const i = bd(
    ee.useContext(wy),
    "UI store context is missing. Wrap with BuilderStoresProvider."
  );
  return vd(i, n);
}
function Ft(n) {
  const i = bd(
    ee.useContext(Sy),
    "Simulation store context is missing. Wrap with BuilderStoresProvider."
  );
  return vd(i, n);
}
function gw(n) {
  return n instanceof HTMLElement ? n.isContentEditable ? !0 : n.matches("input, textarea, select") : !1;
}
function Op(n) {
  return n.kind === "machine" ? "machine" : n.kind === "state" ? `state:${n.stateIndex}` : n.kind === "transition" ? `transition:${n.transitionIndex}` : `workflow:${n.transitionIndex}:${n.nodeIndex}`;
}
function zp(n, i, l) {
  const r = [{ kind: "machine" }];
  i.states.forEach((h, g) => {
    r.push({ kind: "state", stateIndex: g });
  }), i.transitions.forEach((h, g) => {
    r.push({ kind: "transition", transitionIndex: g }), h.workflow?.nodes?.forEach((p, y) => {
      r.push({ kind: "workflow-node", transitionIndex: g, nodeIndex: y });
    });
  });
  const s = r.findIndex((h) => Op(h) === Op(n)), c = s >= 0 ? s : 0, f = Math.min(Math.max(0, c + l), r.length - 1);
  return r[f] ?? { kind: "machine" };
}
function mw(n) {
  const i = be((m) => m.selection), l = be((m) => m.document.definition), r = be((m) => m.setSelection), s = be((m) => m.undo), c = be((m) => m.redo), f = be((m) => m.addState), h = be((m) => m.addTransition), g = He((m) => m.zoomCanvas), p = He((m) => m.resetCanvasView), y = He((m) => m.panCanvas);
  ee.useEffect(() => {
    const m = (v) => {
      const x = v.metaKey || v.ctrlKey, S = gw(v.target), C = !!n.readOnly, T = v.key, A = T.toLowerCase();
      if (!!n.keyboardHelpOpen) {
        T === "Escape" && (v.preventDefault(), n.onCloseKeyboardHelp?.());
        return;
      }
      if (x && A === "s") {
        v.preventDefault(), C || n.onSave?.();
        return;
      }
      if (x && T === "Enter") {
        v.preventDefault(), C || n.onValidate?.();
        return;
      }
      if (x && A === "z") {
        if (S)
          return;
        v.preventDefault(), C || (v.shiftKey ? c() : s());
        return;
      }
      if (x && A === "y") {
        if (S)
          return;
        v.preventDefault(), C || c();
        return;
      }
      if (x && T === "1") {
        v.preventDefault(), n.onFocusPanel?.("explorer");
        return;
      }
      if (x && T === "2") {
        v.preventDefault(), n.onFocusPanel?.("canvas");
        return;
      }
      if (x && T === "3") {
        v.preventDefault(), n.onFocusPanel?.("inspector");
        return;
      }
      if (x && T === "`") {
        v.preventDefault(), n.onToggleConsole ? n.onToggleConsole() : n.onFocusPanel?.("console");
        return;
      }
      if (!x && !S && T === "?") {
        v.preventDefault(), n.onToggleKeyboardHelp?.();
        return;
      }
      if (x && (T === "+" || T === "=")) {
        v.preventDefault(), g(0.1);
        return;
      }
      if (x && T === "-") {
        v.preventDefault(), g(-0.1);
        return;
      }
      if (x && T === "0") {
        v.preventDefault(), p();
        return;
      }
      if (v.altKey && !x && T.startsWith("Arrow")) {
        if (v.preventDefault(), T === "ArrowLeft") {
          y(-24, 0);
          return;
        }
        if (T === "ArrowRight") {
          y(24, 0);
          return;
        }
        if (T === "ArrowUp") {
          y(0, -24);
          return;
        }
        T === "ArrowDown" && y(0, 24);
        return;
      }
      if (!x && !S && T === "Escape") {
        v.preventDefault(), r({ kind: "machine" });
        return;
      }
      if (!x && !S && T === "ArrowDown") {
        v.preventDefault(), r(zp(i, l, 1));
        return;
      }
      if (!x && !S && T === "ArrowUp") {
        v.preventDefault(), r(zp(i, l, -1));
        return;
      }
      if (!x && !S && !C && A === "n") {
        v.preventDefault(), f();
        return;
      }
      !x && !S && !C && A === "t" && (v.preventDefault(), h());
    };
    return window.addEventListener("keydown", m), () => {
      window.removeEventListener("keydown", m);
    };
  }, [
    f,
    h,
    l,
    n,
    y,
    c,
    p,
    i,
    r,
    s,
    g
  ]);
}
function Hf(n) {
  const i = He((f) => f.explorerWidth), l = He((f) => f.inspectorWidth), r = He((f) => f.consoleHeight), s = He((f) => f.setPanelWidth), c = He((f) => f.setConsoleHeight);
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
        const m = y.clientX - h.pointerX;
        if (n === "explorer") {
          s("explorer", h.width + m);
          return;
        }
        s("inspector", h.width - m);
      }, p = () => {
        window.removeEventListener("pointermove", g), window.removeEventListener("pointerup", p);
      };
      window.addEventListener("pointermove", g), window.addEventListener("pointerup", p);
    },
    [r, i, l, n, c, s]
  );
}
function pw(n) {
  return n < 900 ? "mobile-readonly" : n <= 1200 ? "compact" : "desktop";
}
function yw() {
  const n = He((l) => l.viewportMode), i = He((l) => l.setViewportMode);
  return ee.useEffect(() => {
    const l = () => {
      i(pw(window.innerWidth));
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
var vw = { value: () => {
} };
function eu() {
  for (var n = 0, i = arguments.length, l = {}, r; n < i; ++n) {
    if (!(r = arguments[n] + "") || r in l || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    l[r] = [];
  }
  return new Ds(l);
}
function Ds(n) {
  this._ = n;
}
function bw(n, i) {
  return n.trim().split(/^|\s+/).map(function(l) {
    var r = "", s = l.indexOf(".");
    if (s >= 0 && (r = l.slice(s + 1), l = l.slice(0, s)), l && !i.hasOwnProperty(l)) throw new Error("unknown type: " + l);
    return { type: l, name: r };
  });
}
Ds.prototype = eu.prototype = {
  constructor: Ds,
  on: function(n, i) {
    var l = this._, r = bw(n + "", l), s, c = -1, f = r.length;
    if (arguments.length < 2) {
      for (; ++c < f; ) if ((s = (n = r[c]).type) && (s = xw(l[s], n.name))) return s;
      return;
    }
    if (i != null && typeof i != "function") throw new Error("invalid callback: " + i);
    for (; ++c < f; )
      if (s = (n = r[c]).type) l[s] = Rp(l[s], n.name, i);
      else if (i == null) for (s in l) l[s] = Rp(l[s], n.name, null);
    return this;
  },
  copy: function() {
    var n = {}, i = this._;
    for (var l in i) n[l] = i[l].slice();
    return new Ds(n);
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
function xw(n, i) {
  for (var l = 0, r = n.length, s; l < r; ++l)
    if ((s = n[l]).name === i)
      return s.value;
}
function Rp(n, i, l) {
  for (var r = 0, s = n.length; r < s; ++r)
    if (n[r].name === i) {
      n[r] = vw, n = n.slice(0, r).concat(n.slice(r + 1));
      break;
    }
  return l != null && n.push({ name: i, value: l }), n;
}
var td = "http://www.w3.org/1999/xhtml";
const kp = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: td,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function tu(n) {
  var i = n += "", l = i.indexOf(":");
  return l >= 0 && (i = n.slice(0, l)) !== "xmlns" && (n = n.slice(l + 1)), kp.hasOwnProperty(i) ? { space: kp[i], local: n } : n;
}
function ww(n) {
  return function() {
    var i = this.ownerDocument, l = this.namespaceURI;
    return l === td && i.documentElement.namespaceURI === td ? i.createElement(n) : i.createElementNS(l, n);
  };
}
function Sw(n) {
  return function() {
    return this.ownerDocument.createElementNS(n.space, n.local);
  };
}
function Ey(n) {
  var i = tu(n);
  return (i.local ? Sw : ww)(i);
}
function Ew() {
}
function xd(n) {
  return n == null ? Ew : function() {
    return this.querySelector(n);
  };
}
function _w(n) {
  typeof n != "function" && (n = xd(n));
  for (var i = this._groups, l = i.length, r = new Array(l), s = 0; s < l; ++s)
    for (var c = i[s], f = c.length, h = r[s] = new Array(f), g, p, y = 0; y < f; ++y)
      (g = c[y]) && (p = n.call(g, g.__data__, y, c)) && ("__data__" in g && (p.__data__ = g.__data__), h[y] = p);
  return new qt(r, this._parents);
}
function Nw(n) {
  return n == null ? [] : Array.isArray(n) ? n : Array.from(n);
}
function Cw() {
  return [];
}
function _y(n) {
  return n == null ? Cw : function() {
    return this.querySelectorAll(n);
  };
}
function Mw(n) {
  return function() {
    return Nw(n.apply(this, arguments));
  };
}
function Tw(n) {
  typeof n == "function" ? n = Mw(n) : n = _y(n);
  for (var i = this._groups, l = i.length, r = [], s = [], c = 0; c < l; ++c)
    for (var f = i[c], h = f.length, g, p = 0; p < h; ++p)
      (g = f[p]) && (r.push(n.call(g, g.__data__, p, f)), s.push(g));
  return new qt(r, s);
}
function Ny(n) {
  return function() {
    return this.matches(n);
  };
}
function Cy(n) {
  return function(i) {
    return i.matches(n);
  };
}
var jw = Array.prototype.find;
function Aw(n) {
  return function() {
    return jw.call(this.children, n);
  };
}
function Dw() {
  return this.firstElementChild;
}
function Ow(n) {
  return this.select(n == null ? Dw : Aw(typeof n == "function" ? n : Cy(n)));
}
var zw = Array.prototype.filter;
function Rw() {
  return Array.from(this.children);
}
function kw(n) {
  return function() {
    return zw.call(this.children, n);
  };
}
function Hw(n) {
  return this.selectAll(n == null ? Rw : kw(typeof n == "function" ? n : Cy(n)));
}
function Bw(n) {
  typeof n != "function" && (n = Ny(n));
  for (var i = this._groups, l = i.length, r = new Array(l), s = 0; s < l; ++s)
    for (var c = i[s], f = c.length, h = r[s] = [], g, p = 0; p < f; ++p)
      (g = c[p]) && n.call(g, g.__data__, p, c) && h.push(g);
  return new qt(r, this._parents);
}
function My(n) {
  return new Array(n.length);
}
function Lw() {
  return new qt(this._enter || this._groups.map(My), this._parents);
}
function Vs(n, i) {
  this.ownerDocument = n.ownerDocument, this.namespaceURI = n.namespaceURI, this._next = null, this._parent = n, this.__data__ = i;
}
Vs.prototype = {
  constructor: Vs,
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
function Uw(n) {
  return function() {
    return n;
  };
}
function Vw(n, i, l, r, s, c) {
  for (var f = 0, h, g = i.length, p = c.length; f < p; ++f)
    (h = i[f]) ? (h.__data__ = c[f], r[f] = h) : l[f] = new Vs(n, c[f]);
  for (; f < g; ++f)
    (h = i[f]) && (s[f] = h);
}
function Yw(n, i, l, r, s, c, f) {
  var h, g, p = /* @__PURE__ */ new Map(), y = i.length, m = c.length, v = new Array(y), x;
  for (h = 0; h < y; ++h)
    (g = i[h]) && (v[h] = x = f.call(g, g.__data__, h, i) + "", p.has(x) ? s[h] = g : p.set(x, g));
  for (h = 0; h < m; ++h)
    x = f.call(n, c[h], h, c) + "", (g = p.get(x)) ? (r[h] = g, g.__data__ = c[h], p.delete(x)) : l[h] = new Vs(n, c[h]);
  for (h = 0; h < y; ++h)
    (g = i[h]) && p.get(v[h]) === g && (s[h] = g);
}
function Iw(n) {
  return n.__data__;
}
function qw(n, i) {
  if (!arguments.length) return Array.from(this, Iw);
  var l = i ? Yw : Vw, r = this._parents, s = this._groups;
  typeof n != "function" && (n = Uw(n));
  for (var c = s.length, f = new Array(c), h = new Array(c), g = new Array(c), p = 0; p < c; ++p) {
    var y = r[p], m = s[p], v = m.length, x = Xw(n.call(y, y && y.__data__, p, r)), S = x.length, C = h[p] = new Array(S), T = f[p] = new Array(S), A = g[p] = new Array(v);
    l(y, m, C, T, A, x, i);
    for (var D = 0, E = 0, M, H; D < S; ++D)
      if (M = C[D]) {
        for (D >= E && (E = D + 1); !(H = T[E]) && ++E < S; ) ;
        M._next = H || null;
      }
  }
  return f = new qt(f, r), f._enter = h, f._exit = g, f;
}
function Xw(n) {
  return typeof n == "object" && "length" in n ? n : Array.from(n);
}
function Gw() {
  return new qt(this._exit || this._groups.map(My), this._parents);
}
function Zw(n, i, l) {
  var r = this.enter(), s = this, c = this.exit();
  return typeof n == "function" ? (r = n(r), r && (r = r.selection())) : r = r.append(n + ""), i != null && (s = i(s), s && (s = s.selection())), l == null ? c.remove() : l(c), r && s ? r.merge(s).order() : s;
}
function $w(n) {
  for (var i = n.selection ? n.selection() : n, l = this._groups, r = i._groups, s = l.length, c = r.length, f = Math.min(s, c), h = new Array(s), g = 0; g < f; ++g)
    for (var p = l[g], y = r[g], m = p.length, v = h[g] = new Array(m), x, S = 0; S < m; ++S)
      (x = p[S] || y[S]) && (v[S] = x);
  for (; g < s; ++g)
    h[g] = l[g];
  return new qt(h, this._parents);
}
function Qw() {
  for (var n = this._groups, i = -1, l = n.length; ++i < l; )
    for (var r = n[i], s = r.length - 1, c = r[s], f; --s >= 0; )
      (f = r[s]) && (c && f.compareDocumentPosition(c) ^ 4 && c.parentNode.insertBefore(f, c), c = f);
  return this;
}
function Kw(n) {
  n || (n = Jw);
  function i(m, v) {
    return m && v ? n(m.__data__, v.__data__) : !m - !v;
  }
  for (var l = this._groups, r = l.length, s = new Array(r), c = 0; c < r; ++c) {
    for (var f = l[c], h = f.length, g = s[c] = new Array(h), p, y = 0; y < h; ++y)
      (p = f[y]) && (g[y] = p);
    g.sort(i);
  }
  return new qt(s, this._parents).order();
}
function Jw(n, i) {
  return n < i ? -1 : n > i ? 1 : n >= i ? 0 : NaN;
}
function Ww() {
  var n = arguments[0];
  return arguments[0] = this, n.apply(null, arguments), this;
}
function Fw() {
  return Array.from(this);
}
function Pw() {
  for (var n = this._groups, i = 0, l = n.length; i < l; ++i)
    for (var r = n[i], s = 0, c = r.length; s < c; ++s) {
      var f = r[s];
      if (f) return f;
    }
  return null;
}
function eS() {
  let n = 0;
  for (const i of this) ++n;
  return n;
}
function tS() {
  return !this.node();
}
function nS(n) {
  for (var i = this._groups, l = 0, r = i.length; l < r; ++l)
    for (var s = i[l], c = 0, f = s.length, h; c < f; ++c)
      (h = s[c]) && n.call(h, h.__data__, c, s);
  return this;
}
function aS(n) {
  return function() {
    this.removeAttribute(n);
  };
}
function iS(n) {
  return function() {
    this.removeAttributeNS(n.space, n.local);
  };
}
function oS(n, i) {
  return function() {
    this.setAttribute(n, i);
  };
}
function lS(n, i) {
  return function() {
    this.setAttributeNS(n.space, n.local, i);
  };
}
function rS(n, i) {
  return function() {
    var l = i.apply(this, arguments);
    l == null ? this.removeAttribute(n) : this.setAttribute(n, l);
  };
}
function sS(n, i) {
  return function() {
    var l = i.apply(this, arguments);
    l == null ? this.removeAttributeNS(n.space, n.local) : this.setAttributeNS(n.space, n.local, l);
  };
}
function uS(n, i) {
  var l = tu(n);
  if (arguments.length < 2) {
    var r = this.node();
    return l.local ? r.getAttributeNS(l.space, l.local) : r.getAttribute(l);
  }
  return this.each((i == null ? l.local ? iS : aS : typeof i == "function" ? l.local ? sS : rS : l.local ? lS : oS)(l, i));
}
function Ty(n) {
  return n.ownerDocument && n.ownerDocument.defaultView || n.document && n || n.defaultView;
}
function cS(n) {
  return function() {
    this.style.removeProperty(n);
  };
}
function fS(n, i, l) {
  return function() {
    this.style.setProperty(n, i, l);
  };
}
function dS(n, i, l) {
  return function() {
    var r = i.apply(this, arguments);
    r == null ? this.style.removeProperty(n) : this.style.setProperty(n, r, l);
  };
}
function hS(n, i, l) {
  return arguments.length > 1 ? this.each((i == null ? cS : typeof i == "function" ? dS : fS)(n, i, l ?? "")) : fo(this.node(), n);
}
function fo(n, i) {
  return n.style.getPropertyValue(i) || Ty(n).getComputedStyle(n, null).getPropertyValue(i);
}
function gS(n) {
  return function() {
    delete this[n];
  };
}
function mS(n, i) {
  return function() {
    this[n] = i;
  };
}
function pS(n, i) {
  return function() {
    var l = i.apply(this, arguments);
    l == null ? delete this[n] : this[n] = l;
  };
}
function yS(n, i) {
  return arguments.length > 1 ? this.each((i == null ? gS : typeof i == "function" ? pS : mS)(n, i)) : this.node()[n];
}
function jy(n) {
  return n.trim().split(/^|\s+/);
}
function wd(n) {
  return n.classList || new Ay(n);
}
function Ay(n) {
  this._node = n, this._names = jy(n.getAttribute("class") || "");
}
Ay.prototype = {
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
function Dy(n, i) {
  for (var l = wd(n), r = -1, s = i.length; ++r < s; ) l.add(i[r]);
}
function Oy(n, i) {
  for (var l = wd(n), r = -1, s = i.length; ++r < s; ) l.remove(i[r]);
}
function vS(n) {
  return function() {
    Dy(this, n);
  };
}
function bS(n) {
  return function() {
    Oy(this, n);
  };
}
function xS(n, i) {
  return function() {
    (i.apply(this, arguments) ? Dy : Oy)(this, n);
  };
}
function wS(n, i) {
  var l = jy(n + "");
  if (arguments.length < 2) {
    for (var r = wd(this.node()), s = -1, c = l.length; ++s < c; ) if (!r.contains(l[s])) return !1;
    return !0;
  }
  return this.each((typeof i == "function" ? xS : i ? vS : bS)(l, i));
}
function SS() {
  this.textContent = "";
}
function ES(n) {
  return function() {
    this.textContent = n;
  };
}
function _S(n) {
  return function() {
    var i = n.apply(this, arguments);
    this.textContent = i ?? "";
  };
}
function NS(n) {
  return arguments.length ? this.each(n == null ? SS : (typeof n == "function" ? _S : ES)(n)) : this.node().textContent;
}
function CS() {
  this.innerHTML = "";
}
function MS(n) {
  return function() {
    this.innerHTML = n;
  };
}
function TS(n) {
  return function() {
    var i = n.apply(this, arguments);
    this.innerHTML = i ?? "";
  };
}
function jS(n) {
  return arguments.length ? this.each(n == null ? CS : (typeof n == "function" ? TS : MS)(n)) : this.node().innerHTML;
}
function AS() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function DS() {
  return this.each(AS);
}
function OS() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function zS() {
  return this.each(OS);
}
function RS(n) {
  var i = typeof n == "function" ? n : Ey(n);
  return this.select(function() {
    return this.appendChild(i.apply(this, arguments));
  });
}
function kS() {
  return null;
}
function HS(n, i) {
  var l = typeof n == "function" ? n : Ey(n), r = i == null ? kS : typeof i == "function" ? i : xd(i);
  return this.select(function() {
    return this.insertBefore(l.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function BS() {
  var n = this.parentNode;
  n && n.removeChild(this);
}
function LS() {
  return this.each(BS);
}
function US() {
  var n = this.cloneNode(!1), i = this.parentNode;
  return i ? i.insertBefore(n, this.nextSibling) : n;
}
function VS() {
  var n = this.cloneNode(!0), i = this.parentNode;
  return i ? i.insertBefore(n, this.nextSibling) : n;
}
function YS(n) {
  return this.select(n ? VS : US);
}
function IS(n) {
  return arguments.length ? this.property("__data__", n) : this.node().__data__;
}
function qS(n) {
  return function(i) {
    n.call(this, i, this.__data__);
  };
}
function XS(n) {
  return n.trim().split(/^|\s+/).map(function(i) {
    var l = "", r = i.indexOf(".");
    return r >= 0 && (l = i.slice(r + 1), i = i.slice(0, r)), { type: i, name: l };
  });
}
function GS(n) {
  return function() {
    var i = this.__on;
    if (i) {
      for (var l = 0, r = -1, s = i.length, c; l < s; ++l)
        c = i[l], (!n.type || c.type === n.type) && c.name === n.name ? this.removeEventListener(c.type, c.listener, c.options) : i[++r] = c;
      ++r ? i.length = r : delete this.__on;
    }
  };
}
function ZS(n, i, l) {
  return function() {
    var r = this.__on, s, c = qS(i);
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
function $S(n, i, l) {
  var r = XS(n + ""), s, c = r.length, f;
  if (arguments.length < 2) {
    var h = this.node().__on;
    if (h) {
      for (var g = 0, p = h.length, y; g < p; ++g)
        for (s = 0, y = h[g]; s < c; ++s)
          if ((f = r[s]).type === y.type && f.name === y.name)
            return y.value;
    }
    return;
  }
  for (h = i ? ZS : GS, s = 0; s < c; ++s) this.each(h(r[s], i, l));
  return this;
}
function zy(n, i, l) {
  var r = Ty(n), s = r.CustomEvent;
  typeof s == "function" ? s = new s(i, l) : (s = r.document.createEvent("Event"), l ? (s.initEvent(i, l.bubbles, l.cancelable), s.detail = l.detail) : s.initEvent(i, !1, !1)), n.dispatchEvent(s);
}
function QS(n, i) {
  return function() {
    return zy(this, n, i);
  };
}
function KS(n, i) {
  return function() {
    return zy(this, n, i.apply(this, arguments));
  };
}
function JS(n, i) {
  return this.each((typeof i == "function" ? KS : QS)(n, i));
}
function* WS() {
  for (var n = this._groups, i = 0, l = n.length; i < l; ++i)
    for (var r = n[i], s = 0, c = r.length, f; s < c; ++s)
      (f = r[s]) && (yield f);
}
var Ry = [null];
function qt(n, i) {
  this._groups = n, this._parents = i;
}
function Ll() {
  return new qt([[document.documentElement]], Ry);
}
function FS() {
  return this;
}
qt.prototype = Ll.prototype = {
  constructor: qt,
  select: _w,
  selectAll: Tw,
  selectChild: Ow,
  selectChildren: Hw,
  filter: Bw,
  data: qw,
  enter: Lw,
  exit: Gw,
  join: Zw,
  merge: $w,
  selection: FS,
  order: Qw,
  sort: Kw,
  call: Ww,
  nodes: Fw,
  node: Pw,
  size: eS,
  empty: tS,
  each: nS,
  attr: uS,
  style: hS,
  property: yS,
  classed: wS,
  text: NS,
  html: jS,
  raise: DS,
  lower: zS,
  append: RS,
  insert: HS,
  remove: LS,
  clone: YS,
  datum: IS,
  on: $S,
  dispatch: JS,
  [Symbol.iterator]: WS
};
function It(n) {
  return typeof n == "string" ? new qt([[document.querySelector(n)]], [document.documentElement]) : new qt([[n]], Ry);
}
function PS(n) {
  let i;
  for (; i = n.sourceEvent; ) n = i;
  return n;
}
function ln(n, i) {
  if (n = PS(n), i === void 0 && (i = n.currentTarget), i) {
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
const eE = { passive: !1 }, Tl = { capture: !0, passive: !1 };
function Bf(n) {
  n.stopImmediatePropagation();
}
function uo(n) {
  n.preventDefault(), n.stopImmediatePropagation();
}
function ky(n) {
  var i = n.document.documentElement, l = It(n).on("dragstart.drag", uo, Tl);
  "onselectstart" in i ? l.on("selectstart.drag", uo, Tl) : (i.__noselect = i.style.MozUserSelect, i.style.MozUserSelect = "none");
}
function Hy(n, i) {
  var l = n.document.documentElement, r = It(n).on("dragstart.drag", null);
  i && (r.on("click.drag", uo, Tl), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in l ? r.on("selectstart.drag", null) : (l.style.MozUserSelect = l.__noselect, delete l.__noselect);
}
const bs = (n) => () => n;
function nd(n, {
  sourceEvent: i,
  subject: l,
  target: r,
  identifier: s,
  active: c,
  x: f,
  y: h,
  dx: g,
  dy: p,
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
    dy: { value: p, enumerable: !0, configurable: !0 },
    _: { value: y }
  });
}
nd.prototype.on = function() {
  var n = this._.on.apply(this._, arguments);
  return n === this._ ? this : n;
};
function tE(n) {
  return !n.ctrlKey && !n.button;
}
function nE() {
  return this.parentNode;
}
function aE(n, i) {
  return i ?? { x: n.x, y: n.y };
}
function iE() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function By() {
  var n = tE, i = nE, l = aE, r = iE, s = {}, c = eu("start", "drag", "end"), f = 0, h, g, p, y, m = 0;
  function v(M) {
    M.on("mousedown.drag", x).filter(r).on("touchstart.drag", T).on("touchmove.drag", A, eE).on("touchend.drag touchcancel.drag", D).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function x(M, H) {
    if (!(y || !n.call(this, M, H))) {
      var U = E(this, i.call(this, M, H), M, H, "mouse");
      U && (It(M.view).on("mousemove.drag", S, Tl).on("mouseup.drag", C, Tl), ky(M.view), Bf(M), p = !1, h = M.clientX, g = M.clientY, U("start", M));
    }
  }
  function S(M) {
    if (uo(M), !p) {
      var H = M.clientX - h, U = M.clientY - g;
      p = H * H + U * U > m;
    }
    s.mouse("drag", M);
  }
  function C(M) {
    It(M.view).on("mousemove.drag mouseup.drag", null), Hy(M.view, p), uo(M), s.mouse("end", M);
  }
  function T(M, H) {
    if (n.call(this, M, H)) {
      var U = M.changedTouches, Y = i.call(this, M, H), X = U.length, te, K;
      for (te = 0; te < X; ++te)
        (K = E(this, Y, M, H, U[te].identifier, U[te])) && (Bf(M), K("start", M, U[te]));
    }
  }
  function A(M) {
    var H = M.changedTouches, U = H.length, Y, X;
    for (Y = 0; Y < U; ++Y)
      (X = s[H[Y].identifier]) && (uo(M), X("drag", M, H[Y]));
  }
  function D(M) {
    var H = M.changedTouches, U = H.length, Y, X;
    for (y && clearTimeout(y), y = setTimeout(function() {
      y = null;
    }, 500), Y = 0; Y < U; ++Y)
      (X = s[H[Y].identifier]) && (Bf(M), X("end", M, H[Y]));
  }
  function E(M, H, U, Y, X, te) {
    var K = c.copy(), V = ln(te || U, H), Q, J, N;
    if ((N = l.call(M, new nd("beforestart", {
      sourceEvent: U,
      target: v,
      identifier: X,
      active: f,
      x: V[0],
      y: V[1],
      dx: 0,
      dy: 0,
      dispatch: K
    }), Y)) != null)
      return Q = N.x - V[0] || 0, J = N.y - V[1] || 0, function L(_, k, B) {
        var Z = V, I;
        switch (_) {
          case "start":
            s[X] = L, I = f++;
            break;
          case "end":
            delete s[X], --f;
          // falls through
          case "drag":
            V = ln(B || k, H), I = f;
            break;
        }
        K.call(
          _,
          M,
          new nd(_, {
            sourceEvent: k,
            subject: N,
            target: v,
            identifier: X,
            active: I,
            x: V[0] + Q,
            y: V[1] + J,
            dx: V[0] - Z[0],
            dy: V[1] - Z[1],
            dispatch: K
          }),
          Y
        );
      };
  }
  return v.filter = function(M) {
    return arguments.length ? (n = typeof M == "function" ? M : bs(!!M), v) : n;
  }, v.container = function(M) {
    return arguments.length ? (i = typeof M == "function" ? M : bs(M), v) : i;
  }, v.subject = function(M) {
    return arguments.length ? (l = typeof M == "function" ? M : bs(M), v) : l;
  }, v.touchable = function(M) {
    return arguments.length ? (r = typeof M == "function" ? M : bs(!!M), v) : r;
  }, v.on = function() {
    var M = c.on.apply(c, arguments);
    return M === c ? v : M;
  }, v.clickDistance = function(M) {
    return arguments.length ? (m = (M = +M) * M, v) : Math.sqrt(m);
  }, v;
}
function Sd(n, i, l) {
  n.prototype = i.prototype = l, l.constructor = n;
}
function Ly(n, i) {
  var l = Object.create(n.prototype);
  for (var r in i) l[r] = i[r];
  return l;
}
function Ul() {
}
var jl = 0.7, Ys = 1 / jl, co = "\\s*([+-]?\\d+)\\s*", Al = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", xn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", oE = /^#([0-9a-f]{3,8})$/, lE = new RegExp(`^rgb\\(${co},${co},${co}\\)$`), rE = new RegExp(`^rgb\\(${xn},${xn},${xn}\\)$`), sE = new RegExp(`^rgba\\(${co},${co},${co},${Al}\\)$`), uE = new RegExp(`^rgba\\(${xn},${xn},${xn},${Al}\\)$`), cE = new RegExp(`^hsl\\(${Al},${xn},${xn}\\)$`), fE = new RegExp(`^hsla\\(${Al},${xn},${xn},${Al}\\)$`), Hp = {
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
Sd(Ul, di, {
  copy(n) {
    return Object.assign(new this.constructor(), this, n);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Bp,
  // Deprecated! Use color.formatHex.
  formatHex: Bp,
  formatHex8: dE,
  formatHsl: hE,
  formatRgb: Lp,
  toString: Lp
});
function Bp() {
  return this.rgb().formatHex();
}
function dE() {
  return this.rgb().formatHex8();
}
function hE() {
  return Uy(this).formatHsl();
}
function Lp() {
  return this.rgb().formatRgb();
}
function di(n) {
  var i, l;
  return n = (n + "").trim().toLowerCase(), (i = oE.exec(n)) ? (l = i[1].length, i = parseInt(i[1], 16), l === 6 ? Up(i) : l === 3 ? new Ot(i >> 8 & 15 | i >> 4 & 240, i >> 4 & 15 | i & 240, (i & 15) << 4 | i & 15, 1) : l === 8 ? xs(i >> 24 & 255, i >> 16 & 255, i >> 8 & 255, (i & 255) / 255) : l === 4 ? xs(i >> 12 & 15 | i >> 8 & 240, i >> 8 & 15 | i >> 4 & 240, i >> 4 & 15 | i & 240, ((i & 15) << 4 | i & 15) / 255) : null) : (i = lE.exec(n)) ? new Ot(i[1], i[2], i[3], 1) : (i = rE.exec(n)) ? new Ot(i[1] * 255 / 100, i[2] * 255 / 100, i[3] * 255 / 100, 1) : (i = sE.exec(n)) ? xs(i[1], i[2], i[3], i[4]) : (i = uE.exec(n)) ? xs(i[1] * 255 / 100, i[2] * 255 / 100, i[3] * 255 / 100, i[4]) : (i = cE.exec(n)) ? Ip(i[1], i[2] / 100, i[3] / 100, 1) : (i = fE.exec(n)) ? Ip(i[1], i[2] / 100, i[3] / 100, i[4]) : Hp.hasOwnProperty(n) ? Up(Hp[n]) : n === "transparent" ? new Ot(NaN, NaN, NaN, 0) : null;
}
function Up(n) {
  return new Ot(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function xs(n, i, l, r) {
  return r <= 0 && (n = i = l = NaN), new Ot(n, i, l, r);
}
function gE(n) {
  return n instanceof Ul || (n = di(n)), n ? (n = n.rgb(), new Ot(n.r, n.g, n.b, n.opacity)) : new Ot();
}
function ad(n, i, l, r) {
  return arguments.length === 1 ? gE(n) : new Ot(n, i, l, r ?? 1);
}
function Ot(n, i, l, r) {
  this.r = +n, this.g = +i, this.b = +l, this.opacity = +r;
}
Sd(Ot, ad, Ly(Ul, {
  brighter(n) {
    return n = n == null ? Ys : Math.pow(Ys, n), new Ot(this.r * n, this.g * n, this.b * n, this.opacity);
  },
  darker(n) {
    return n = n == null ? jl : Math.pow(jl, n), new Ot(this.r * n, this.g * n, this.b * n, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Ot(ci(this.r), ci(this.g), ci(this.b), Is(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Vp,
  // Deprecated! Use color.formatHex.
  formatHex: Vp,
  formatHex8: mE,
  formatRgb: Yp,
  toString: Yp
}));
function Vp() {
  return `#${ri(this.r)}${ri(this.g)}${ri(this.b)}`;
}
function mE() {
  return `#${ri(this.r)}${ri(this.g)}${ri(this.b)}${ri((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Yp() {
  const n = Is(this.opacity);
  return `${n === 1 ? "rgb(" : "rgba("}${ci(this.r)}, ${ci(this.g)}, ${ci(this.b)}${n === 1 ? ")" : `, ${n})`}`;
}
function Is(n) {
  return isNaN(n) ? 1 : Math.max(0, Math.min(1, n));
}
function ci(n) {
  return Math.max(0, Math.min(255, Math.round(n) || 0));
}
function ri(n) {
  return n = ci(n), (n < 16 ? "0" : "") + n.toString(16);
}
function Ip(n, i, l, r) {
  return r <= 0 ? n = i = l = NaN : l <= 0 || l >= 1 ? n = i = NaN : i <= 0 && (n = NaN), new rn(n, i, l, r);
}
function Uy(n) {
  if (n instanceof rn) return new rn(n.h, n.s, n.l, n.opacity);
  if (n instanceof Ul || (n = di(n)), !n) return new rn();
  if (n instanceof rn) return n;
  n = n.rgb();
  var i = n.r / 255, l = n.g / 255, r = n.b / 255, s = Math.min(i, l, r), c = Math.max(i, l, r), f = NaN, h = c - s, g = (c + s) / 2;
  return h ? (i === c ? f = (l - r) / h + (l < r) * 6 : l === c ? f = (r - i) / h + 2 : f = (i - l) / h + 4, h /= g < 0.5 ? c + s : 2 - c - s, f *= 60) : h = g > 0 && g < 1 ? 0 : f, new rn(f, h, g, n.opacity);
}
function pE(n, i, l, r) {
  return arguments.length === 1 ? Uy(n) : new rn(n, i, l, r ?? 1);
}
function rn(n, i, l, r) {
  this.h = +n, this.s = +i, this.l = +l, this.opacity = +r;
}
Sd(rn, pE, Ly(Ul, {
  brighter(n) {
    return n = n == null ? Ys : Math.pow(Ys, n), new rn(this.h, this.s, this.l * n, this.opacity);
  },
  darker(n) {
    return n = n == null ? jl : Math.pow(jl, n), new rn(this.h, this.s, this.l * n, this.opacity);
  },
  rgb() {
    var n = this.h % 360 + (this.h < 0) * 360, i = isNaN(n) || isNaN(this.s) ? 0 : this.s, l = this.l, r = l + (l < 0.5 ? l : 1 - l) * i, s = 2 * l - r;
    return new Ot(
      Lf(n >= 240 ? n - 240 : n + 120, s, r),
      Lf(n, s, r),
      Lf(n < 120 ? n + 240 : n - 120, s, r),
      this.opacity
    );
  },
  clamp() {
    return new rn(qp(this.h), ws(this.s), ws(this.l), Is(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const n = Is(this.opacity);
    return `${n === 1 ? "hsl(" : "hsla("}${qp(this.h)}, ${ws(this.s) * 100}%, ${ws(this.l) * 100}%${n === 1 ? ")" : `, ${n})`}`;
  }
}));
function qp(n) {
  return n = (n || 0) % 360, n < 0 ? n + 360 : n;
}
function ws(n) {
  return Math.max(0, Math.min(1, n || 0));
}
function Lf(n, i, l) {
  return (n < 60 ? i + (l - i) * n / 60 : n < 180 ? l : n < 240 ? i + (l - i) * (240 - n) / 60 : i) * 255;
}
const Ed = (n) => () => n;
function yE(n, i) {
  return function(l) {
    return n + l * i;
  };
}
function vE(n, i, l) {
  return n = Math.pow(n, l), i = Math.pow(i, l) - n, l = 1 / l, function(r) {
    return Math.pow(n + r * i, l);
  };
}
function bE(n) {
  return (n = +n) == 1 ? Vy : function(i, l) {
    return l - i ? vE(i, l, n) : Ed(isNaN(i) ? l : i);
  };
}
function Vy(n, i) {
  var l = i - n;
  return l ? yE(n, l) : Ed(isNaN(n) ? i : n);
}
const qs = (function n(i) {
  var l = bE(i);
  function r(s, c) {
    var f = l((s = ad(s)).r, (c = ad(c)).r), h = l(s.g, c.g), g = l(s.b, c.b), p = Vy(s.opacity, c.opacity);
    return function(y) {
      return s.r = f(y), s.g = h(y), s.b = g(y), s.opacity = p(y), s + "";
    };
  }
  return r.gamma = n, r;
})(1);
function xE(n, i) {
  i || (i = []);
  var l = n ? Math.min(i.length, n.length) : 0, r = i.slice(), s;
  return function(c) {
    for (s = 0; s < l; ++s) r[s] = n[s] * (1 - c) + i[s] * c;
    return r;
  };
}
function wE(n) {
  return ArrayBuffer.isView(n) && !(n instanceof DataView);
}
function SE(n, i) {
  var l = i ? i.length : 0, r = n ? Math.min(l, n.length) : 0, s = new Array(r), c = new Array(l), f;
  for (f = 0; f < r; ++f) s[f] = Nl(n[f], i[f]);
  for (; f < l; ++f) c[f] = i[f];
  return function(h) {
    for (f = 0; f < r; ++f) c[f] = s[f](h);
    return c;
  };
}
function EE(n, i) {
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
function _E(n, i) {
  var l = {}, r = {}, s;
  (n === null || typeof n != "object") && (n = {}), (i === null || typeof i != "object") && (i = {});
  for (s in i)
    s in n ? l[s] = Nl(n[s], i[s]) : r[s] = i[s];
  return function(c) {
    for (s in l) r[s] = l[s](c);
    return r;
  };
}
var id = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Uf = new RegExp(id.source, "g");
function NE(n) {
  return function() {
    return n;
  };
}
function CE(n) {
  return function(i) {
    return n(i) + "";
  };
}
function Yy(n, i) {
  var l = id.lastIndex = Uf.lastIndex = 0, r, s, c, f = -1, h = [], g = [];
  for (n = n + "", i = i + ""; (r = id.exec(n)) && (s = Uf.exec(i)); )
    (c = s.index) > l && (c = i.slice(l, c), h[f] ? h[f] += c : h[++f] = c), (r = r[0]) === (s = s[0]) ? h[f] ? h[f] += s : h[++f] = s : (h[++f] = null, g.push({ i: f, x: bn(r, s) })), l = Uf.lastIndex;
  return l < i.length && (c = i.slice(l), h[f] ? h[f] += c : h[++f] = c), h.length < 2 ? g[0] ? CE(g[0].x) : NE(i) : (i = g.length, function(p) {
    for (var y = 0, m; y < i; ++y) h[(m = g[y]).i] = m.x(p);
    return h.join("");
  });
}
function Nl(n, i) {
  var l = typeof i, r;
  return i == null || l === "boolean" ? Ed(i) : (l === "number" ? bn : l === "string" ? (r = di(i)) ? (i = r, qs) : Yy : i instanceof di ? qs : i instanceof Date ? EE : wE(i) ? xE : Array.isArray(i) ? SE : typeof i.valueOf != "function" && typeof i.toString != "function" || isNaN(i) ? _E : bn)(n, i);
}
var Xp = 180 / Math.PI, od = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Iy(n, i, l, r, s, c) {
  var f, h, g;
  return (f = Math.sqrt(n * n + i * i)) && (n /= f, i /= f), (g = n * l + i * r) && (l -= n * g, r -= i * g), (h = Math.sqrt(l * l + r * r)) && (l /= h, r /= h, g /= h), n * r < i * l && (n = -n, i = -i, g = -g, f = -f), {
    translateX: s,
    translateY: c,
    rotate: Math.atan2(i, n) * Xp,
    skewX: Math.atan(g) * Xp,
    scaleX: f,
    scaleY: h
  };
}
var Ss;
function ME(n) {
  const i = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(n + "");
  return i.isIdentity ? od : Iy(i.a, i.b, i.c, i.d, i.e, i.f);
}
function TE(n) {
  return n == null || (Ss || (Ss = document.createElementNS("http://www.w3.org/2000/svg", "g")), Ss.setAttribute("transform", n), !(n = Ss.transform.baseVal.consolidate())) ? od : (n = n.matrix, Iy(n.a, n.b, n.c, n.d, n.e, n.f));
}
function qy(n, i, l, r) {
  function s(p) {
    return p.length ? p.pop() + " " : "";
  }
  function c(p, y, m, v, x, S) {
    if (p !== m || y !== v) {
      var C = x.push("translate(", null, i, null, l);
      S.push({ i: C - 4, x: bn(p, m) }, { i: C - 2, x: bn(y, v) });
    } else (m || v) && x.push("translate(" + m + i + v + l);
  }
  function f(p, y, m, v) {
    p !== y ? (p - y > 180 ? y += 360 : y - p > 180 && (p += 360), v.push({ i: m.push(s(m) + "rotate(", null, r) - 2, x: bn(p, y) })) : y && m.push(s(m) + "rotate(" + y + r);
  }
  function h(p, y, m, v) {
    p !== y ? v.push({ i: m.push(s(m) + "skewX(", null, r) - 2, x: bn(p, y) }) : y && m.push(s(m) + "skewX(" + y + r);
  }
  function g(p, y, m, v, x, S) {
    if (p !== m || y !== v) {
      var C = x.push(s(x) + "scale(", null, ",", null, ")");
      S.push({ i: C - 4, x: bn(p, m) }, { i: C - 2, x: bn(y, v) });
    } else (m !== 1 || v !== 1) && x.push(s(x) + "scale(" + m + "," + v + ")");
  }
  return function(p, y) {
    var m = [], v = [];
    return p = n(p), y = n(y), c(p.translateX, p.translateY, y.translateX, y.translateY, m, v), f(p.rotate, y.rotate, m, v), h(p.skewX, y.skewX, m, v), g(p.scaleX, p.scaleY, y.scaleX, y.scaleY, m, v), p = y = null, function(x) {
      for (var S = -1, C = v.length, T; ++S < C; ) m[(T = v[S]).i] = T.x(x);
      return m.join("");
    };
  };
}
var jE = qy(ME, "px, ", "px)", "deg)"), AE = qy(TE, ", ", ")", ")"), DE = 1e-12;
function Gp(n) {
  return ((n = Math.exp(n)) + 1 / n) / 2;
}
function OE(n) {
  return ((n = Math.exp(n)) - 1 / n) / 2;
}
function zE(n) {
  return ((n = Math.exp(2 * n)) - 1) / (n + 1);
}
const Os = (function n(i, l, r) {
  function s(c, f) {
    var h = c[0], g = c[1], p = c[2], y = f[0], m = f[1], v = f[2], x = y - h, S = m - g, C = x * x + S * S, T, A;
    if (C < DE)
      A = Math.log(v / p) / i, T = function(Y) {
        return [
          h + Y * x,
          g + Y * S,
          p * Math.exp(i * Y * A)
        ];
      };
    else {
      var D = Math.sqrt(C), E = (v * v - p * p + r * C) / (2 * p * l * D), M = (v * v - p * p - r * C) / (2 * v * l * D), H = Math.log(Math.sqrt(E * E + 1) - E), U = Math.log(Math.sqrt(M * M + 1) - M);
      A = (U - H) / i, T = function(Y) {
        var X = Y * A, te = Gp(H), K = p / (l * D) * (te * zE(i * X + H) - OE(H));
        return [
          h + K * x,
          g + K * S,
          p * te / Gp(i * X + H)
        ];
      };
    }
    return T.duration = A * 1e3 * i / Math.SQRT2, T;
  }
  return s.rho = function(c) {
    var f = Math.max(1e-3, +c), h = f * f, g = h * h;
    return n(f, h, g);
  }, s;
})(Math.SQRT2, 2, 4);
var ho = 0, Sl = 0, gl = 0, Xy = 1e3, Xs, El, Gs = 0, hi = 0, nu = 0, Dl = typeof performance == "object" && performance.now ? performance : Date, Gy = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(n) {
  setTimeout(n, 17);
};
function _d() {
  return hi || (Gy(RE), hi = Dl.now() + nu);
}
function RE() {
  hi = 0;
}
function Zs() {
  this._call = this._time = this._next = null;
}
Zs.prototype = Zy.prototype = {
  constructor: Zs,
  restart: function(n, i, l) {
    if (typeof n != "function") throw new TypeError("callback is not a function");
    l = (l == null ? _d() : +l) + (i == null ? 0 : +i), !this._next && El !== this && (El ? El._next = this : Xs = this, El = this), this._call = n, this._time = l, ld();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, ld());
  }
};
function Zy(n, i, l) {
  var r = new Zs();
  return r.restart(n, i, l), r;
}
function kE() {
  _d(), ++ho;
  for (var n = Xs, i; n; )
    (i = hi - n._time) >= 0 && n._call.call(void 0, i), n = n._next;
  --ho;
}
function Zp() {
  hi = (Gs = Dl.now()) + nu, ho = Sl = 0;
  try {
    kE();
  } finally {
    ho = 0, BE(), hi = 0;
  }
}
function HE() {
  var n = Dl.now(), i = n - Gs;
  i > Xy && (nu -= i, Gs = n);
}
function BE() {
  for (var n, i = Xs, l, r = 1 / 0; i; )
    i._call ? (r > i._time && (r = i._time), n = i, i = i._next) : (l = i._next, i._next = null, i = n ? n._next = l : Xs = l);
  El = n, ld(r);
}
function ld(n) {
  if (!ho) {
    Sl && (Sl = clearTimeout(Sl));
    var i = n - hi;
    i > 24 ? (n < 1 / 0 && (Sl = setTimeout(Zp, n - Dl.now() - nu)), gl && (gl = clearInterval(gl))) : (gl || (Gs = Dl.now(), gl = setInterval(HE, Xy)), ho = 1, Gy(Zp));
  }
}
function $p(n, i, l) {
  var r = new Zs();
  return i = i == null ? 0 : +i, r.restart((s) => {
    r.stop(), n(s + i);
  }, i, l), r;
}
var LE = eu("start", "end", "cancel", "interrupt"), UE = [], $y = 0, Qp = 1, rd = 2, zs = 3, Kp = 4, sd = 5, Rs = 6;
function au(n, i, l, r, s, c) {
  var f = n.__transition;
  if (!f) n.__transition = {};
  else if (l in f) return;
  VE(n, l, {
    name: i,
    index: r,
    // For context during callback.
    group: s,
    // For context during callback.
    on: LE,
    tween: UE,
    time: c.time,
    delay: c.delay,
    duration: c.duration,
    ease: c.ease,
    timer: null,
    state: $y
  });
}
function Nd(n, i) {
  var l = fn(n, i);
  if (l.state > $y) throw new Error("too late; already scheduled");
  return l;
}
function Sn(n, i) {
  var l = fn(n, i);
  if (l.state > zs) throw new Error("too late; already running");
  return l;
}
function fn(n, i) {
  var l = n.__transition;
  if (!l || !(l = l[i])) throw new Error("transition not found");
  return l;
}
function VE(n, i, l) {
  var r = n.__transition, s;
  r[i] = l, l.timer = Zy(c, 0, l.time);
  function c(p) {
    l.state = Qp, l.timer.restart(f, l.delay, l.time), l.delay <= p && f(p - l.delay);
  }
  function f(p) {
    var y, m, v, x;
    if (l.state !== Qp) return g();
    for (y in r)
      if (x = r[y], x.name === l.name) {
        if (x.state === zs) return $p(f);
        x.state === Kp ? (x.state = Rs, x.timer.stop(), x.on.call("interrupt", n, n.__data__, x.index, x.group), delete r[y]) : +y < i && (x.state = Rs, x.timer.stop(), x.on.call("cancel", n, n.__data__, x.index, x.group), delete r[y]);
      }
    if ($p(function() {
      l.state === zs && (l.state = Kp, l.timer.restart(h, l.delay, l.time), h(p));
    }), l.state = rd, l.on.call("start", n, n.__data__, l.index, l.group), l.state === rd) {
      for (l.state = zs, s = new Array(v = l.tween.length), y = 0, m = -1; y < v; ++y)
        (x = l.tween[y].value.call(n, n.__data__, l.index, l.group)) && (s[++m] = x);
      s.length = m + 1;
    }
  }
  function h(p) {
    for (var y = p < l.duration ? l.ease.call(null, p / l.duration) : (l.timer.restart(g), l.state = sd, 1), m = -1, v = s.length; ++m < v; )
      s[m].call(n, y);
    l.state === sd && (l.on.call("end", n, n.__data__, l.index, l.group), g());
  }
  function g() {
    l.state = Rs, l.timer.stop(), delete r[i];
    for (var p in r) return;
    delete n.__transition;
  }
}
function ks(n, i) {
  var l = n.__transition, r, s, c = !0, f;
  if (l) {
    i = i == null ? null : i + "";
    for (f in l) {
      if ((r = l[f]).name !== i) {
        c = !1;
        continue;
      }
      s = r.state > rd && r.state < sd, r.state = Rs, r.timer.stop(), r.on.call(s ? "interrupt" : "cancel", n, n.__data__, r.index, r.group), delete l[f];
    }
    c && delete n.__transition;
  }
}
function YE(n) {
  return this.each(function() {
    ks(this, n);
  });
}
function IE(n, i) {
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
function qE(n, i, l) {
  var r, s;
  if (typeof l != "function") throw new Error();
  return function() {
    var c = Sn(this, n), f = c.tween;
    if (f !== r) {
      s = (r = f).slice();
      for (var h = { name: i, value: l }, g = 0, p = s.length; g < p; ++g)
        if (s[g].name === i) {
          s[g] = h;
          break;
        }
      g === p && s.push(h);
    }
    c.tween = s;
  };
}
function XE(n, i) {
  var l = this._id;
  if (n += "", arguments.length < 2) {
    for (var r = fn(this.node(), l).tween, s = 0, c = r.length, f; s < c; ++s)
      if ((f = r[s]).name === n)
        return f.value;
    return null;
  }
  return this.each((i == null ? IE : qE)(l, n, i));
}
function Cd(n, i, l) {
  var r = n._id;
  return n.each(function() {
    var s = Sn(this, r);
    (s.value || (s.value = {}))[i] = l.apply(this, arguments);
  }), function(s) {
    return fn(s, r).value[i];
  };
}
function Qy(n, i) {
  var l;
  return (typeof i == "number" ? bn : i instanceof di ? qs : (l = di(i)) ? (i = l, qs) : Yy)(n, i);
}
function GE(n) {
  return function() {
    this.removeAttribute(n);
  };
}
function ZE(n) {
  return function() {
    this.removeAttributeNS(n.space, n.local);
  };
}
function $E(n, i, l) {
  var r, s = l + "", c;
  return function() {
    var f = this.getAttribute(n);
    return f === s ? null : f === r ? c : c = i(r = f, l);
  };
}
function QE(n, i, l) {
  var r, s = l + "", c;
  return function() {
    var f = this.getAttributeNS(n.space, n.local);
    return f === s ? null : f === r ? c : c = i(r = f, l);
  };
}
function KE(n, i, l) {
  var r, s, c;
  return function() {
    var f, h = l(this), g;
    return h == null ? void this.removeAttribute(n) : (f = this.getAttribute(n), g = h + "", f === g ? null : f === r && g === s ? c : (s = g, c = i(r = f, h)));
  };
}
function JE(n, i, l) {
  var r, s, c;
  return function() {
    var f, h = l(this), g;
    return h == null ? void this.removeAttributeNS(n.space, n.local) : (f = this.getAttributeNS(n.space, n.local), g = h + "", f === g ? null : f === r && g === s ? c : (s = g, c = i(r = f, h)));
  };
}
function WE(n, i) {
  var l = tu(n), r = l === "transform" ? AE : Qy;
  return this.attrTween(n, typeof i == "function" ? (l.local ? JE : KE)(l, r, Cd(this, "attr." + n, i)) : i == null ? (l.local ? ZE : GE)(l) : (l.local ? QE : $E)(l, r, i));
}
function FE(n, i) {
  return function(l) {
    this.setAttribute(n, i.call(this, l));
  };
}
function PE(n, i) {
  return function(l) {
    this.setAttributeNS(n.space, n.local, i.call(this, l));
  };
}
function e_(n, i) {
  var l, r;
  function s() {
    var c = i.apply(this, arguments);
    return c !== r && (l = (r = c) && PE(n, c)), l;
  }
  return s._value = i, s;
}
function t_(n, i) {
  var l, r;
  function s() {
    var c = i.apply(this, arguments);
    return c !== r && (l = (r = c) && FE(n, c)), l;
  }
  return s._value = i, s;
}
function n_(n, i) {
  var l = "attr." + n;
  if (arguments.length < 2) return (l = this.tween(l)) && l._value;
  if (i == null) return this.tween(l, null);
  if (typeof i != "function") throw new Error();
  var r = tu(n);
  return this.tween(l, (r.local ? e_ : t_)(r, i));
}
function a_(n, i) {
  return function() {
    Nd(this, n).delay = +i.apply(this, arguments);
  };
}
function i_(n, i) {
  return i = +i, function() {
    Nd(this, n).delay = i;
  };
}
function o_(n) {
  var i = this._id;
  return arguments.length ? this.each((typeof n == "function" ? a_ : i_)(i, n)) : fn(this.node(), i).delay;
}
function l_(n, i) {
  return function() {
    Sn(this, n).duration = +i.apply(this, arguments);
  };
}
function r_(n, i) {
  return i = +i, function() {
    Sn(this, n).duration = i;
  };
}
function s_(n) {
  var i = this._id;
  return arguments.length ? this.each((typeof n == "function" ? l_ : r_)(i, n)) : fn(this.node(), i).duration;
}
function u_(n, i) {
  if (typeof i != "function") throw new Error();
  return function() {
    Sn(this, n).ease = i;
  };
}
function c_(n) {
  var i = this._id;
  return arguments.length ? this.each(u_(i, n)) : fn(this.node(), i).ease;
}
function f_(n, i) {
  return function() {
    var l = i.apply(this, arguments);
    if (typeof l != "function") throw new Error();
    Sn(this, n).ease = l;
  };
}
function d_(n) {
  if (typeof n != "function") throw new Error();
  return this.each(f_(this._id, n));
}
function h_(n) {
  typeof n != "function" && (n = Ny(n));
  for (var i = this._groups, l = i.length, r = new Array(l), s = 0; s < l; ++s)
    for (var c = i[s], f = c.length, h = r[s] = [], g, p = 0; p < f; ++p)
      (g = c[p]) && n.call(g, g.__data__, p, c) && h.push(g);
  return new Wn(r, this._parents, this._name, this._id);
}
function g_(n) {
  if (n._id !== this._id) throw new Error();
  for (var i = this._groups, l = n._groups, r = i.length, s = l.length, c = Math.min(r, s), f = new Array(r), h = 0; h < c; ++h)
    for (var g = i[h], p = l[h], y = g.length, m = f[h] = new Array(y), v, x = 0; x < y; ++x)
      (v = g[x] || p[x]) && (m[x] = v);
  for (; h < r; ++h)
    f[h] = i[h];
  return new Wn(f, this._parents, this._name, this._id);
}
function m_(n) {
  return (n + "").trim().split(/^|\s+/).every(function(i) {
    var l = i.indexOf(".");
    return l >= 0 && (i = i.slice(0, l)), !i || i === "start";
  });
}
function p_(n, i, l) {
  var r, s, c = m_(i) ? Nd : Sn;
  return function() {
    var f = c(this, n), h = f.on;
    h !== r && (s = (r = h).copy()).on(i, l), f.on = s;
  };
}
function y_(n, i) {
  var l = this._id;
  return arguments.length < 2 ? fn(this.node(), l).on.on(n) : this.each(p_(l, n, i));
}
function v_(n) {
  return function() {
    var i = this.parentNode;
    for (var l in this.__transition) if (+l !== n) return;
    i && i.removeChild(this);
  };
}
function b_() {
  return this.on("end.remove", v_(this._id));
}
function x_(n) {
  var i = this._name, l = this._id;
  typeof n != "function" && (n = xd(n));
  for (var r = this._groups, s = r.length, c = new Array(s), f = 0; f < s; ++f)
    for (var h = r[f], g = h.length, p = c[f] = new Array(g), y, m, v = 0; v < g; ++v)
      (y = h[v]) && (m = n.call(y, y.__data__, v, h)) && ("__data__" in y && (m.__data__ = y.__data__), p[v] = m, au(p[v], i, l, v, p, fn(y, l)));
  return new Wn(c, this._parents, i, l);
}
function w_(n) {
  var i = this._name, l = this._id;
  typeof n != "function" && (n = _y(n));
  for (var r = this._groups, s = r.length, c = [], f = [], h = 0; h < s; ++h)
    for (var g = r[h], p = g.length, y, m = 0; m < p; ++m)
      if (y = g[m]) {
        for (var v = n.call(y, y.__data__, m, g), x, S = fn(y, l), C = 0, T = v.length; C < T; ++C)
          (x = v[C]) && au(x, i, l, C, v, S);
        c.push(v), f.push(y);
      }
  return new Wn(c, f, i, l);
}
var S_ = Ll.prototype.constructor;
function E_() {
  return new S_(this._groups, this._parents);
}
function __(n, i) {
  var l, r, s;
  return function() {
    var c = fo(this, n), f = (this.style.removeProperty(n), fo(this, n));
    return c === f ? null : c === l && f === r ? s : s = i(l = c, r = f);
  };
}
function Ky(n) {
  return function() {
    this.style.removeProperty(n);
  };
}
function N_(n, i, l) {
  var r, s = l + "", c;
  return function() {
    var f = fo(this, n);
    return f === s ? null : f === r ? c : c = i(r = f, l);
  };
}
function C_(n, i, l) {
  var r, s, c;
  return function() {
    var f = fo(this, n), h = l(this), g = h + "";
    return h == null && (g = h = (this.style.removeProperty(n), fo(this, n))), f === g ? null : f === r && g === s ? c : (s = g, c = i(r = f, h));
  };
}
function M_(n, i) {
  var l, r, s, c = "style." + i, f = "end." + c, h;
  return function() {
    var g = Sn(this, n), p = g.on, y = g.value[c] == null ? h || (h = Ky(i)) : void 0;
    (p !== l || s !== y) && (r = (l = p).copy()).on(f, s = y), g.on = r;
  };
}
function T_(n, i, l) {
  var r = (n += "") == "transform" ? jE : Qy;
  return i == null ? this.styleTween(n, __(n, r)).on("end.style." + n, Ky(n)) : typeof i == "function" ? this.styleTween(n, C_(n, r, Cd(this, "style." + n, i))).each(M_(this._id, n)) : this.styleTween(n, N_(n, r, i), l).on("end.style." + n, null);
}
function j_(n, i, l) {
  return function(r) {
    this.style.setProperty(n, i.call(this, r), l);
  };
}
function A_(n, i, l) {
  var r, s;
  function c() {
    var f = i.apply(this, arguments);
    return f !== s && (r = (s = f) && j_(n, f, l)), r;
  }
  return c._value = i, c;
}
function D_(n, i, l) {
  var r = "style." + (n += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (i == null) return this.tween(r, null);
  if (typeof i != "function") throw new Error();
  return this.tween(r, A_(n, i, l ?? ""));
}
function O_(n) {
  return function() {
    this.textContent = n;
  };
}
function z_(n) {
  return function() {
    var i = n(this);
    this.textContent = i ?? "";
  };
}
function R_(n) {
  return this.tween("text", typeof n == "function" ? z_(Cd(this, "text", n)) : O_(n == null ? "" : n + ""));
}
function k_(n) {
  return function(i) {
    this.textContent = n.call(this, i);
  };
}
function H_(n) {
  var i, l;
  function r() {
    var s = n.apply(this, arguments);
    return s !== l && (i = (l = s) && k_(s)), i;
  }
  return r._value = n, r;
}
function B_(n) {
  var i = "text";
  if (arguments.length < 1) return (i = this.tween(i)) && i._value;
  if (n == null) return this.tween(i, null);
  if (typeof n != "function") throw new Error();
  return this.tween(i, H_(n));
}
function L_() {
  for (var n = this._name, i = this._id, l = Jy(), r = this._groups, s = r.length, c = 0; c < s; ++c)
    for (var f = r[c], h = f.length, g, p = 0; p < h; ++p)
      if (g = f[p]) {
        var y = fn(g, i);
        au(g, n, l, p, f, {
          time: y.time + y.delay + y.duration,
          delay: 0,
          duration: y.duration,
          ease: y.ease
        });
      }
  return new Wn(r, this._parents, n, l);
}
function U_() {
  var n, i, l = this, r = l._id, s = l.size();
  return new Promise(function(c, f) {
    var h = { value: f }, g = { value: function() {
      --s === 0 && c();
    } };
    l.each(function() {
      var p = Sn(this, r), y = p.on;
      y !== n && (i = (n = y).copy(), i._.cancel.push(h), i._.interrupt.push(h), i._.end.push(g)), p.on = i;
    }), s === 0 && c();
  });
}
var V_ = 0;
function Wn(n, i, l, r) {
  this._groups = n, this._parents = i, this._name = l, this._id = r;
}
function Jy() {
  return ++V_;
}
var Zn = Ll.prototype;
Wn.prototype = {
  constructor: Wn,
  select: x_,
  selectAll: w_,
  selectChild: Zn.selectChild,
  selectChildren: Zn.selectChildren,
  filter: h_,
  merge: g_,
  selection: E_,
  transition: L_,
  call: Zn.call,
  nodes: Zn.nodes,
  node: Zn.node,
  size: Zn.size,
  empty: Zn.empty,
  each: Zn.each,
  on: y_,
  attr: WE,
  attrTween: n_,
  style: T_,
  styleTween: D_,
  text: R_,
  textTween: B_,
  remove: b_,
  tween: XE,
  delay: o_,
  duration: s_,
  ease: c_,
  easeVarying: d_,
  end: U_,
  [Symbol.iterator]: Zn[Symbol.iterator]
};
function Y_(n) {
  return ((n *= 2) <= 1 ? n * n * n : (n -= 2) * n * n + 2) / 2;
}
var I_ = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Y_
};
function q_(n, i) {
  for (var l; !(l = n.__transition) || !(l = l[i]); )
    if (!(n = n.parentNode))
      throw new Error(`transition ${i} not found`);
  return l;
}
function X_(n) {
  var i, l;
  n instanceof Wn ? (i = n._id, n = n._name) : (i = Jy(), (l = I_).time = _d(), n = n == null ? null : n + "");
  for (var r = this._groups, s = r.length, c = 0; c < s; ++c)
    for (var f = r[c], h = f.length, g, p = 0; p < h; ++p)
      (g = f[p]) && au(g, n, i, p, f, l || q_(g, i));
  return new Wn(r, this._parents, n, i);
}
Ll.prototype.interrupt = YE;
Ll.prototype.transition = X_;
const Es = (n) => () => n;
function G_(n, {
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
var iu = new Kn(1, 0, 0);
Wy.prototype = Kn.prototype;
function Wy(n) {
  for (; !n.__zoom; ) if (!(n = n.parentNode)) return iu;
  return n.__zoom;
}
function Vf(n) {
  n.stopImmediatePropagation();
}
function ml(n) {
  n.preventDefault(), n.stopImmediatePropagation();
}
function Z_(n) {
  return (!n.ctrlKey || n.type === "wheel") && !n.button;
}
function $_() {
  var n = this;
  return n instanceof SVGElement ? (n = n.ownerSVGElement || n, n.hasAttribute("viewBox") ? (n = n.viewBox.baseVal, [[n.x, n.y], [n.x + n.width, n.y + n.height]]) : [[0, 0], [n.width.baseVal.value, n.height.baseVal.value]]) : [[0, 0], [n.clientWidth, n.clientHeight]];
}
function Jp() {
  return this.__zoom || iu;
}
function Q_(n) {
  return -n.deltaY * (n.deltaMode === 1 ? 0.05 : n.deltaMode ? 1 : 2e-3) * (n.ctrlKey ? 10 : 1);
}
function K_() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function J_(n, i, l) {
  var r = n.invertX(i[0][0]) - l[0][0], s = n.invertX(i[1][0]) - l[1][0], c = n.invertY(i[0][1]) - l[0][1], f = n.invertY(i[1][1]) - l[1][1];
  return n.translate(
    s > r ? (r + s) / 2 : Math.min(0, r) || Math.max(0, s),
    f > c ? (c + f) / 2 : Math.min(0, c) || Math.max(0, f)
  );
}
function Fy() {
  var n = Z_, i = $_, l = J_, r = Q_, s = K_, c = [0, 1 / 0], f = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], h = 250, g = Os, p = eu("start", "zoom", "end"), y, m, v, x = 500, S = 150, C = 0, T = 10;
  function A(N) {
    N.property("__zoom", Jp).on("wheel.zoom", X, { passive: !1 }).on("mousedown.zoom", te).on("dblclick.zoom", K).filter(s).on("touchstart.zoom", V).on("touchmove.zoom", Q).on("touchend.zoom touchcancel.zoom", J).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  A.transform = function(N, L, _, k) {
    var B = N.selection ? N.selection() : N;
    B.property("__zoom", Jp), N !== B ? H(N, L, _, k) : B.interrupt().each(function() {
      U(this, arguments).event(k).start().zoom(null, typeof L == "function" ? L.apply(this, arguments) : L).end();
    });
  }, A.scaleBy = function(N, L, _, k) {
    A.scaleTo(N, function() {
      var B = this.__zoom.k, Z = typeof L == "function" ? L.apply(this, arguments) : L;
      return B * Z;
    }, _, k);
  }, A.scaleTo = function(N, L, _, k) {
    A.transform(N, function() {
      var B = i.apply(this, arguments), Z = this.__zoom, I = _ == null ? M(B) : typeof _ == "function" ? _.apply(this, arguments) : _, j = Z.invert(I), q = typeof L == "function" ? L.apply(this, arguments) : L;
      return l(E(D(Z, q), I, j), B, f);
    }, _, k);
  }, A.translateBy = function(N, L, _, k) {
    A.transform(N, function() {
      return l(this.__zoom.translate(
        typeof L == "function" ? L.apply(this, arguments) : L,
        typeof _ == "function" ? _.apply(this, arguments) : _
      ), i.apply(this, arguments), f);
    }, null, k);
  }, A.translateTo = function(N, L, _, k, B) {
    A.transform(N, function() {
      var Z = i.apply(this, arguments), I = this.__zoom, j = k == null ? M(Z) : typeof k == "function" ? k.apply(this, arguments) : k;
      return l(iu.translate(j[0], j[1]).scale(I.k).translate(
        typeof L == "function" ? -L.apply(this, arguments) : -L,
        typeof _ == "function" ? -_.apply(this, arguments) : -_
      ), Z, f);
    }, k, B);
  };
  function D(N, L) {
    return L = Math.max(c[0], Math.min(c[1], L)), L === N.k ? N : new Kn(L, N.x, N.y);
  }
  function E(N, L, _) {
    var k = L[0] - _[0] * N.k, B = L[1] - _[1] * N.k;
    return k === N.x && B === N.y ? N : new Kn(N.k, k, B);
  }
  function M(N) {
    return [(+N[0][0] + +N[1][0]) / 2, (+N[0][1] + +N[1][1]) / 2];
  }
  function H(N, L, _, k) {
    N.on("start.zoom", function() {
      U(this, arguments).event(k).start();
    }).on("interrupt.zoom end.zoom", function() {
      U(this, arguments).event(k).end();
    }).tween("zoom", function() {
      var B = this, Z = arguments, I = U(B, Z).event(k), j = i.apply(B, Z), q = _ == null ? M(j) : typeof _ == "function" ? _.apply(B, Z) : _, G = Math.max(j[1][0] - j[0][0], j[1][1] - j[0][1]), R = B.__zoom, O = typeof L == "function" ? L.apply(B, Z) : L, $ = g(R.invert(q).concat(G / R.k), O.invert(q).concat(G / O.k));
      return function(W) {
        if (W === 1) W = O;
        else {
          var P = $(W), ie = G / P[2];
          W = new Kn(ie, q[0] - P[0] * ie, q[1] - P[1] * ie);
        }
        I.zoom(null, W);
      };
    });
  }
  function U(N, L, _) {
    return !_ && N.__zooming || new Y(N, L);
  }
  function Y(N, L) {
    this.that = N, this.args = L, this.active = 0, this.sourceEvent = null, this.extent = i.apply(N, L), this.taps = 0;
  }
  Y.prototype = {
    event: function(N) {
      return N && (this.sourceEvent = N), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(N, L) {
      return this.mouse && N !== "mouse" && (this.mouse[1] = L.invert(this.mouse[0])), this.touch0 && N !== "touch" && (this.touch0[1] = L.invert(this.touch0[0])), this.touch1 && N !== "touch" && (this.touch1[1] = L.invert(this.touch1[0])), this.that.__zoom = L, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(N) {
      var L = It(this.that).datum();
      p.call(
        N,
        this.that,
        new G_(N, {
          sourceEvent: this.sourceEvent,
          target: A,
          transform: this.that.__zoom,
          dispatch: p
        }),
        L
      );
    }
  };
  function X(N, ...L) {
    if (!n.apply(this, arguments)) return;
    var _ = U(this, L).event(N), k = this.__zoom, B = Math.max(c[0], Math.min(c[1], k.k * Math.pow(2, r.apply(this, arguments)))), Z = ln(N);
    if (_.wheel)
      (_.mouse[0][0] !== Z[0] || _.mouse[0][1] !== Z[1]) && (_.mouse[1] = k.invert(_.mouse[0] = Z)), clearTimeout(_.wheel);
    else {
      if (k.k === B) return;
      _.mouse = [Z, k.invert(Z)], ks(this), _.start();
    }
    ml(N), _.wheel = setTimeout(I, S), _.zoom("mouse", l(E(D(k, B), _.mouse[0], _.mouse[1]), _.extent, f));
    function I() {
      _.wheel = null, _.end();
    }
  }
  function te(N, ...L) {
    if (v || !n.apply(this, arguments)) return;
    var _ = N.currentTarget, k = U(this, L, !0).event(N), B = It(N.view).on("mousemove.zoom", q, !0).on("mouseup.zoom", G, !0), Z = ln(N, _), I = N.clientX, j = N.clientY;
    ky(N.view), Vf(N), k.mouse = [Z, this.__zoom.invert(Z)], ks(this), k.start();
    function q(R) {
      if (ml(R), !k.moved) {
        var O = R.clientX - I, $ = R.clientY - j;
        k.moved = O * O + $ * $ > C;
      }
      k.event(R).zoom("mouse", l(E(k.that.__zoom, k.mouse[0] = ln(R, _), k.mouse[1]), k.extent, f));
    }
    function G(R) {
      B.on("mousemove.zoom mouseup.zoom", null), Hy(R.view, k.moved), ml(R), k.event(R).end();
    }
  }
  function K(N, ...L) {
    if (n.apply(this, arguments)) {
      var _ = this.__zoom, k = ln(N.changedTouches ? N.changedTouches[0] : N, this), B = _.invert(k), Z = _.k * (N.shiftKey ? 0.5 : 2), I = l(E(D(_, Z), k, B), i.apply(this, L), f);
      ml(N), h > 0 ? It(this).transition().duration(h).call(H, I, k, N) : It(this).call(A.transform, I, k, N);
    }
  }
  function V(N, ...L) {
    if (n.apply(this, arguments)) {
      var _ = N.touches, k = _.length, B = U(this, L, N.changedTouches.length === k).event(N), Z, I, j, q;
      for (Vf(N), I = 0; I < k; ++I)
        j = _[I], q = ln(j, this), q = [q, this.__zoom.invert(q), j.identifier], B.touch0 ? !B.touch1 && B.touch0[2] !== q[2] && (B.touch1 = q, B.taps = 0) : (B.touch0 = q, Z = !0, B.taps = 1 + !!y);
      y && (y = clearTimeout(y)), Z && (B.taps < 2 && (m = q[0], y = setTimeout(function() {
        y = null;
      }, x)), ks(this), B.start());
    }
  }
  function Q(N, ...L) {
    if (this.__zooming) {
      var _ = U(this, L).event(N), k = N.changedTouches, B = k.length, Z, I, j, q;
      for (ml(N), Z = 0; Z < B; ++Z)
        I = k[Z], j = ln(I, this), _.touch0 && _.touch0[2] === I.identifier ? _.touch0[0] = j : _.touch1 && _.touch1[2] === I.identifier && (_.touch1[0] = j);
      if (I = _.that.__zoom, _.touch1) {
        var G = _.touch0[0], R = _.touch0[1], O = _.touch1[0], $ = _.touch1[1], W = (W = O[0] - G[0]) * W + (W = O[1] - G[1]) * W, P = (P = $[0] - R[0]) * P + (P = $[1] - R[1]) * P;
        I = D(I, Math.sqrt(W / P)), j = [(G[0] + O[0]) / 2, (G[1] + O[1]) / 2], q = [(R[0] + $[0]) / 2, (R[1] + $[1]) / 2];
      } else if (_.touch0) j = _.touch0[0], q = _.touch0[1];
      else return;
      _.zoom("touch", l(E(I, j, q), _.extent, f));
    }
  }
  function J(N, ...L) {
    if (this.__zooming) {
      var _ = U(this, L).event(N), k = N.changedTouches, B = k.length, Z, I;
      for (Vf(N), v && clearTimeout(v), v = setTimeout(function() {
        v = null;
      }, x), Z = 0; Z < B; ++Z)
        I = k[Z], _.touch0 && _.touch0[2] === I.identifier ? delete _.touch0 : _.touch1 && _.touch1[2] === I.identifier && delete _.touch1;
      if (_.touch1 && !_.touch0 && (_.touch0 = _.touch1, delete _.touch1), _.touch0) _.touch0[1] = this.__zoom.invert(_.touch0[0]);
      else if (_.end(), _.taps === 2 && (I = ln(I, this), Math.hypot(m[0] - I[0], m[1] - I[1]) < T)) {
        var j = It(this).on("dblclick.zoom");
        j && j.apply(this, arguments);
      }
    }
  }
  return A.wheelDelta = function(N) {
    return arguments.length ? (r = typeof N == "function" ? N : Es(+N), A) : r;
  }, A.filter = function(N) {
    return arguments.length ? (n = typeof N == "function" ? N : Es(!!N), A) : n;
  }, A.touchable = function(N) {
    return arguments.length ? (s = typeof N == "function" ? N : Es(!!N), A) : s;
  }, A.extent = function(N) {
    return arguments.length ? (i = typeof N == "function" ? N : Es([[+N[0][0], +N[0][1]], [+N[1][0], +N[1][1]]]), A) : i;
  }, A.scaleExtent = function(N) {
    return arguments.length ? (c[0] = +N[0], c[1] = +N[1], A) : [c[0], c[1]];
  }, A.translateExtent = function(N) {
    return arguments.length ? (f[0][0] = +N[0][0], f[1][0] = +N[1][0], f[0][1] = +N[0][1], f[1][1] = +N[1][1], A) : [[f[0][0], f[0][1]], [f[1][0], f[1][1]]];
  }, A.constrain = function(N) {
    return arguments.length ? (l = N, A) : l;
  }, A.duration = function(N) {
    return arguments.length ? (h = +N, A) : h;
  }, A.interpolate = function(N) {
    return arguments.length ? (g = N, A) : g;
  }, A.on = function() {
    var N = p.on.apply(p, arguments);
    return N === p ? A : N;
  }, A.clickDistance = function(N) {
    return arguments.length ? (C = (N = +N) * N, A) : Math.sqrt(C);
  }, A.tapDistance = function(N) {
    return arguments.length ? (T = +N, A) : T;
  }, A;
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
}, Ol = [
  [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
], Py = ["Enter", " ", "Escape"], ev = {
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
var zl;
(function(n) {
  n.Partial = "partial", n.Full = "full";
})(zl || (zl = {}));
const tv = {
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
var $s;
(function(n) {
  n.Arrow = "arrow", n.ArrowClosed = "arrowclosed";
})($s || ($s = {}));
var ye;
(function(n) {
  n.Left = "left", n.Top = "top", n.Right = "right", n.Bottom = "bottom";
})(ye || (ye = {}));
const Wp = {
  [ye.Left]: ye.Right,
  [ye.Right]: ye.Left,
  [ye.Top]: ye.Bottom,
  [ye.Bottom]: ye.Top
};
function nv(n) {
  return n === null ? null : n ? "valid" : "invalid";
}
const av = (n) => "id" in n && "source" in n && "target" in n, W_ = (n) => "id" in n && "position" in n && !("source" in n) && !("target" in n), Md = (n) => "id" in n && "internals" in n && !("source" in n) && !("target" in n), Vl = (n, i = [0, 0]) => {
  const { width: l, height: r } = Fn(n), s = n.origin ?? i, c = l * s[0], f = r * s[1];
  return {
    x: n.position.x - c,
    y: n.position.y - f
  };
}, F_ = (n, i = { nodeOrigin: [0, 0] }) => {
  if (n.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  const l = n.reduce((r, s) => {
    const c = typeof s == "string";
    let f = !i.nodeLookup && !c ? s : void 0;
    i.nodeLookup && (f = c ? i.nodeLookup.get(s) : Md(s) ? s : i.nodeLookup.get(s.id));
    const h = f ? Qs(f, i.nodeOrigin) : { x: 0, y: 0, x2: 0, y2: 0 };
    return ou(r, h);
  }, { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 });
  return lu(l);
}, Yl = (n, i = {}) => {
  let l = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 }, r = !1;
  return n.forEach((s) => {
    (i.filter === void 0 || i.filter(s)) && (l = ou(l, Qs(s)), r = !0);
  }), r ? lu(l) : { x: 0, y: 0, width: 0, height: 0 };
}, Td = (n, i, [l, r, s] = [0, 0, 1], c = !1, f = !1) => {
  const h = {
    ...ql(i, [l, r, s]),
    width: i.width / s,
    height: i.height / s
  }, g = [];
  for (const p of n.values()) {
    const { measured: y, selectable: m = !0, hidden: v = !1 } = p;
    if (f && !m || v)
      continue;
    const x = y.width ?? p.width ?? p.initialWidth ?? null, S = y.height ?? p.height ?? p.initialHeight ?? null, C = Rl(h, po(p)), T = (x ?? 0) * (S ?? 0), A = c && C > 0;
    (!p.internals.handleBounds || A || C >= T || p.dragging) && g.push(p);
  }
  return g;
}, P_ = (n, i) => {
  const l = /* @__PURE__ */ new Set();
  return n.forEach((r) => {
    l.add(r.id);
  }), i.filter((r) => l.has(r.source) || l.has(r.target));
};
function e2(n, i) {
  const l = /* @__PURE__ */ new Map(), r = i?.nodes ? new Set(i.nodes.map((s) => s.id)) : null;
  return n.forEach((s) => {
    s.measured.width && s.measured.height && (i?.includeHiddenNodes || !s.hidden) && (!r || r.has(s.id)) && l.set(s.id, s);
  }), l;
}
async function t2({ nodes: n, width: i, height: l, panZoom: r, minZoom: s, maxZoom: c }, f) {
  if (n.size === 0)
    return Promise.resolve(!0);
  const h = e2(n, f), g = Yl(h), p = jd(g, i, l, f?.minZoom ?? s, f?.maxZoom ?? c, f?.padding ?? 0.1);
  return await r.setViewport(p, {
    duration: f?.duration,
    ease: f?.ease,
    interpolate: f?.interpolate
  }), Promise.resolve(!0);
}
function iv({ nodeId: n, nextPosition: i, nodeLookup: l, nodeOrigin: r = [0, 0], nodeExtent: s, onError: c }) {
  const f = l.get(n), h = f.parentId ? l.get(f.parentId) : void 0, { x: g, y: p } = h ? h.internals.positionAbsolute : { x: 0, y: 0 }, y = f.origin ?? r;
  let m = f.extent || s;
  if (f.extent === "parent" && !f.expandParent)
    if (!h)
      c?.("005", wn.error005());
    else {
      const x = h.measured.width, S = h.measured.height;
      x && S && (m = [
        [g, p],
        [g + x, p + S]
      ]);
    }
  else h && yo(f.extent) && (m = [
    [f.extent[0][0] + g, f.extent[0][1] + p],
    [f.extent[1][0] + g, f.extent[1][1] + p]
  ]);
  const v = yo(m) ? gi(i, m, f.measured) : i;
  return (f.measured.width === void 0 || f.measured.height === void 0) && c?.("015", wn.error015()), {
    position: {
      x: v.x - g + (f.measured.width ?? 0) * y[0],
      y: v.y - p + (f.measured.height ?? 0) * y[1]
    },
    positionAbsolute: v
  };
}
async function n2({ nodesToRemove: n = [], edgesToRemove: i = [], nodes: l, edges: r, onBeforeDelete: s }) {
  const c = new Set(n.map((v) => v.id)), f = [];
  for (const v of l) {
    if (v.deletable === !1)
      continue;
    const x = c.has(v.id), S = !x && v.parentId && f.find((C) => C.id === v.parentId);
    (x || S) && f.push(v);
  }
  const h = new Set(i.map((v) => v.id)), g = r.filter((v) => v.deletable !== !1), y = P_(f, g);
  for (const v of g)
    h.has(v.id) && !y.find((S) => S.id === v.id) && y.push(v);
  if (!s)
    return {
      edges: y,
      nodes: f
    };
  const m = await s({
    nodes: f,
    edges: y
  });
  return typeof m == "boolean" ? m ? { edges: y, nodes: f } : { edges: [], nodes: [] } : m;
}
const mo = (n, i = 0, l = 1) => Math.min(Math.max(n, i), l), gi = (n = { x: 0, y: 0 }, i, l) => ({
  x: mo(n.x, i[0][0], i[1][0] - (l?.width ?? 0)),
  y: mo(n.y, i[0][1], i[1][1] - (l?.height ?? 0))
});
function ov(n, i, l) {
  const { width: r, height: s } = Fn(l), { x: c, y: f } = l.internals.positionAbsolute;
  return gi(n, [
    [c, f],
    [c + r, f + s]
  ], i);
}
const Fp = (n, i, l) => n < i ? mo(Math.abs(n - i), 1, i) / i : n > l ? -mo(Math.abs(n - l), 1, i) / i : 0, lv = (n, i, l = 15, r = 40) => {
  const s = Fp(n.x, r, i.width - r) * l, c = Fp(n.y, r, i.height - r) * l;
  return [s, c];
}, ou = (n, i) => ({
  x: Math.min(n.x, i.x),
  y: Math.min(n.y, i.y),
  x2: Math.max(n.x2, i.x2),
  y2: Math.max(n.y2, i.y2)
}), ud = ({ x: n, y: i, width: l, height: r }) => ({
  x: n,
  y: i,
  x2: n + l,
  y2: i + r
}), lu = ({ x: n, y: i, x2: l, y2: r }) => ({
  x: n,
  y: i,
  width: l - n,
  height: r - i
}), po = (n, i = [0, 0]) => {
  const { x: l, y: r } = Md(n) ? n.internals.positionAbsolute : Vl(n, i);
  return {
    x: l,
    y: r,
    width: n.measured?.width ?? n.width ?? n.initialWidth ?? 0,
    height: n.measured?.height ?? n.height ?? n.initialHeight ?? 0
  };
}, Qs = (n, i = [0, 0]) => {
  const { x: l, y: r } = Md(n) ? n.internals.positionAbsolute : Vl(n, i);
  return {
    x: l,
    y: r,
    x2: l + (n.measured?.width ?? n.width ?? n.initialWidth ?? 0),
    y2: r + (n.measured?.height ?? n.height ?? n.initialHeight ?? 0)
  };
}, rv = (n, i) => lu(ou(ud(n), ud(i))), Rl = (n, i) => {
  const l = Math.max(0, Math.min(n.x + n.width, i.x + i.width) - Math.max(n.x, i.x)), r = Math.max(0, Math.min(n.y + n.height, i.y + i.height) - Math.max(n.y, i.y));
  return Math.ceil(l * r);
}, Pp = (n) => sn(n.width) && sn(n.height) && sn(n.x) && sn(n.y), sn = (n) => !isNaN(n) && isFinite(n), a2 = (n, i) => {
}, Il = (n, i = [1, 1]) => ({
  x: i[0] * Math.round(n.x / i[0]),
  y: i[1] * Math.round(n.y / i[1])
}), ql = ({ x: n, y: i }, [l, r, s], c = !1, f = [1, 1]) => {
  const h = {
    x: (n - l) / s,
    y: (i - r) / s
  };
  return c ? Il(h, f) : h;
}, Ks = ({ x: n, y: i }, [l, r, s]) => ({
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
function i2(n, i, l) {
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
function o2(n, i, l, r, s, c) {
  const { x: f, y: h } = Ks(n, [i, l, r]), { x: g, y: p } = Ks({ x: n.x + n.width, y: n.y + n.height }, [i, l, r]), y = s - g, m = c - p;
  return {
    left: Math.floor(f),
    top: Math.floor(h),
    right: Math.floor(y),
    bottom: Math.floor(m)
  };
}
const jd = (n, i, l, r, s, c) => {
  const f = i2(c, i, l), h = (i - f.x) / n.width, g = (l - f.y) / n.height, p = Math.min(h, g), y = mo(p, r, s), m = n.x + n.width / 2, v = n.y + n.height / 2, x = i / 2 - m * y, S = l / 2 - v * y, C = o2(n, x, S, y, i, l), T = {
    left: Math.min(C.left - f.left, 0),
    top: Math.min(C.top - f.top, 0),
    right: Math.min(C.right - f.right, 0),
    bottom: Math.min(C.bottom - f.bottom, 0)
  };
  return {
    x: x - T.left + T.right,
    y: S - T.top + T.bottom,
    zoom: y
  };
}, kl = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function yo(n) {
  return n != null && n !== "parent";
}
function Fn(n) {
  return {
    width: n.measured?.width ?? n.width ?? n.initialWidth ?? 0,
    height: n.measured?.height ?? n.height ?? n.initialHeight ?? 0
  };
}
function sv(n) {
  return (n.measured?.width ?? n.width ?? n.initialWidth) !== void 0 && (n.measured?.height ?? n.height ?? n.initialHeight) !== void 0;
}
function uv(n, i = { width: 0, height: 0 }, l, r, s) {
  const c = { ...n }, f = r.get(l);
  if (f) {
    const h = f.origin || s;
    c.x += f.internals.positionAbsolute.x - (i.width ?? 0) * h[0], c.y += f.internals.positionAbsolute.y - (i.height ?? 0) * h[1];
  }
  return c;
}
function e0(n, i) {
  if (n.size !== i.size)
    return !1;
  for (const l of n)
    if (!i.has(l))
      return !1;
  return !0;
}
function l2() {
  let n, i;
  return { promise: new Promise((r, s) => {
    n = r, i = s;
  }), resolve: n, reject: i };
}
function r2(n) {
  return { ...ev, ...n || {} };
}
function Cl(n, { snapGrid: i = [0, 0], snapToGrid: l = !1, transform: r, containerBounds: s }) {
  const { x: c, y: f } = un(n), h = ql({ x: c - (s?.left ?? 0), y: f - (s?.top ?? 0) }, r), { x: g, y: p } = l ? Il(h, i) : h;
  return {
    xSnapped: g,
    ySnapped: p,
    ...h
  };
}
const Ad = (n) => ({
  width: n.offsetWidth,
  height: n.offsetHeight
}), cv = (n) => n?.getRootNode?.() || window?.document, s2 = ["INPUT", "SELECT", "TEXTAREA"];
function fv(n) {
  const i = n.composedPath?.()?.[0] || n.target;
  return i?.nodeType !== 1 ? !1 : s2.includes(i.nodeName) || i.hasAttribute("contenteditable") || !!i.closest(".nokey");
}
const dv = (n) => "clientX" in n, un = (n, i) => {
  const l = dv(n), r = l ? n.clientX : n.touches?.[0].clientX, s = l ? n.clientY : n.touches?.[0].clientY;
  return {
    x: r - (i?.left ?? 0),
    y: s - (i?.top ?? 0)
  };
}, t0 = (n, i, l, r, s) => {
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
      ...Ad(f)
    };
  });
};
function hv({ sourceX: n, sourceY: i, targetX: l, targetY: r, sourceControlX: s, sourceControlY: c, targetControlX: f, targetControlY: h }) {
  const g = n * 0.125 + s * 0.375 + f * 0.375 + l * 0.125, p = i * 0.125 + c * 0.375 + h * 0.375 + r * 0.125, y = Math.abs(g - n), m = Math.abs(p - i);
  return [g, p, y, m];
}
function _s(n, i) {
  return n >= 0 ? 0.5 * n : i * 25 * Math.sqrt(-n);
}
function n0({ pos: n, x1: i, y1: l, x2: r, y2: s, c }) {
  switch (n) {
    case ye.Left:
      return [i - _s(i - r, c), l];
    case ye.Right:
      return [i + _s(r - i, c), l];
    case ye.Top:
      return [i, l - _s(l - s, c)];
    case ye.Bottom:
      return [i, l + _s(s - l, c)];
  }
}
function Dd({ sourceX: n, sourceY: i, sourcePosition: l = ye.Bottom, targetX: r, targetY: s, targetPosition: c = ye.Top, curvature: f = 0.25 }) {
  const [h, g] = n0({
    pos: l,
    x1: n,
    y1: i,
    x2: r,
    y2: s,
    c: f
  }), [p, y] = n0({
    pos: c,
    x1: r,
    y1: s,
    x2: n,
    y2: i,
    c: f
  }), [m, v, x, S] = hv({
    sourceX: n,
    sourceY: i,
    targetX: r,
    targetY: s,
    sourceControlX: h,
    sourceControlY: g,
    targetControlX: p,
    targetControlY: y
  });
  return [
    `M${n},${i} C${h},${g} ${p},${y} ${r},${s}`,
    m,
    v,
    x,
    S
  ];
}
function gv({ sourceX: n, sourceY: i, targetX: l, targetY: r }) {
  const s = Math.abs(l - n) / 2, c = l < n ? l + s : l - s, f = Math.abs(r - i) / 2, h = r < i ? r + f : r - f;
  return [c, h, s, f];
}
function u2({ sourceNode: n, targetNode: i, selected: l = !1, zIndex: r = 0, elevateOnSelect: s = !1, zIndexMode: c = "basic" }) {
  if (c === "manual")
    return r;
  const f = s && l ? r + 1e3 : r, h = Math.max(n.parentId || s && n.selected ? n.internals.z : 0, i.parentId || s && i.selected ? i.internals.z : 0);
  return f + h;
}
function c2({ sourceNode: n, targetNode: i, width: l, height: r, transform: s }) {
  const c = ou(Qs(n), Qs(i));
  c.x === c.x2 && (c.x2 += 1), c.y === c.y2 && (c.y2 += 1);
  const f = {
    x: -s[0] / s[2],
    y: -s[1] / s[2],
    width: l / s[2],
    height: r / s[2]
  };
  return Rl(f, lu(c)) > 0;
}
const f2 = ({ source: n, sourceHandle: i, target: l, targetHandle: r }) => `xy-edge__${n}${i || ""}-${l}${r || ""}`, d2 = (n, i) => i.some((l) => l.source === n.source && l.target === n.target && (l.sourceHandle === n.sourceHandle || !l.sourceHandle && !n.sourceHandle) && (l.targetHandle === n.targetHandle || !l.targetHandle && !n.targetHandle)), h2 = (n, i, l = {}) => {
  if (!n.source || !n.target)
    return i;
  const r = l.getEdgeId || f2;
  let s;
  return av(n) ? s = { ...n } : s = {
    ...n,
    id: r(n)
  }, d2(s, i) ? i : (s.sourceHandle === null && delete s.sourceHandle, s.targetHandle === null && delete s.targetHandle, i.concat(s));
};
function mv({ sourceX: n, sourceY: i, targetX: l, targetY: r }) {
  const [s, c, f, h] = gv({
    sourceX: n,
    sourceY: i,
    targetX: l,
    targetY: r
  });
  return [`M ${n},${i}L ${l},${r}`, s, c, f, h];
}
const a0 = {
  [ye.Left]: { x: -1, y: 0 },
  [ye.Right]: { x: 1, y: 0 },
  [ye.Top]: { x: 0, y: -1 },
  [ye.Bottom]: { x: 0, y: 1 }
}, g2 = ({ source: n, sourcePosition: i = ye.Bottom, target: l }) => i === ye.Left || i === ye.Right ? n.x < l.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : n.y < l.y ? { x: 0, y: 1 } : { x: 0, y: -1 }, i0 = (n, i) => Math.sqrt(Math.pow(i.x - n.x, 2) + Math.pow(i.y - n.y, 2));
function m2({ source: n, sourcePosition: i = ye.Bottom, target: l, targetPosition: r = ye.Top, center: s, offset: c, stepPosition: f }) {
  const h = a0[i], g = a0[r], p = { x: n.x + h.x * c, y: n.y + h.y * c }, y = { x: l.x + g.x * c, y: l.y + g.y * c }, m = g2({
    source: p,
    sourcePosition: i,
    target: y
  }), v = m.x !== 0 ? "x" : "y", x = m[v];
  let S = [], C, T;
  const A = { x: 0, y: 0 }, D = { x: 0, y: 0 }, [, , E, M] = gv({
    sourceX: n.x,
    sourceY: n.y,
    targetX: l.x,
    targetY: l.y
  });
  if (h[v] * g[v] === -1) {
    v === "x" ? (C = s.x ?? p.x + (y.x - p.x) * f, T = s.y ?? (p.y + y.y) / 2) : (C = s.x ?? (p.x + y.x) / 2, T = s.y ?? p.y + (y.y - p.y) * f);
    const U = [
      { x: C, y: p.y },
      { x: C, y: y.y }
    ], Y = [
      { x: p.x, y: T },
      { x: y.x, y: T }
    ];
    h[v] === x ? S = v === "x" ? U : Y : S = v === "x" ? Y : U;
  } else {
    const U = [{ x: p.x, y: y.y }], Y = [{ x: y.x, y: p.y }];
    if (v === "x" ? S = h.x === x ? Y : U : S = h.y === x ? U : Y, i === r) {
      const Q = Math.abs(n[v] - l[v]);
      if (Q <= c) {
        const J = Math.min(c - 1, c - Q);
        h[v] === x ? A[v] = (p[v] > n[v] ? -1 : 1) * J : D[v] = (y[v] > l[v] ? -1 : 1) * J;
      }
    }
    if (i !== r) {
      const Q = v === "x" ? "y" : "x", J = h[v] === g[Q], N = p[Q] > y[Q], L = p[Q] < y[Q];
      (h[v] === 1 && (!J && N || J && L) || h[v] !== 1 && (!J && L || J && N)) && (S = v === "x" ? U : Y);
    }
    const X = { x: p.x + A.x, y: p.y + A.y }, te = { x: y.x + D.x, y: y.y + D.y }, K = Math.max(Math.abs(X.x - S[0].x), Math.abs(te.x - S[0].x)), V = Math.max(Math.abs(X.y - S[0].y), Math.abs(te.y - S[0].y));
    K >= V ? (C = (X.x + te.x) / 2, T = S[0].y) : (C = S[0].x, T = (X.y + te.y) / 2);
  }
  return [[
    n,
    { x: p.x + A.x, y: p.y + A.y },
    ...S,
    { x: y.x + D.x, y: y.y + D.y },
    l
  ], C, T, E, M];
}
function p2(n, i, l, r) {
  const s = Math.min(i0(n, i) / 2, i0(i, l) / 2, r), { x: c, y: f } = i;
  if (n.x === c && c === l.x || n.y === f && f === l.y)
    return `L${c} ${f}`;
  if (n.y === f) {
    const p = n.x < l.x ? -1 : 1, y = n.y < l.y ? 1 : -1;
    return `L ${c + s * p},${f}Q ${c},${f} ${c},${f + s * y}`;
  }
  const h = n.x < l.x ? 1 : -1, g = n.y < l.y ? -1 : 1;
  return `L ${c},${f + s * g}Q ${c},${f} ${c + s * h},${f}`;
}
function cd({ sourceX: n, sourceY: i, sourcePosition: l = ye.Bottom, targetX: r, targetY: s, targetPosition: c = ye.Top, borderRadius: f = 5, centerX: h, centerY: g, offset: p = 20, stepPosition: y = 0.5 }) {
  const [m, v, x, S, C] = m2({
    source: { x: n, y: i },
    sourcePosition: l,
    target: { x: r, y: s },
    targetPosition: c,
    center: { x: h, y: g },
    offset: p,
    stepPosition: y
  });
  return [m.reduce((A, D, E) => {
    let M = "";
    return E > 0 && E < m.length - 1 ? M = p2(m[E - 1], D, m[E + 1], f) : M = `${E === 0 ? "M" : "L"}${D.x} ${D.y}`, A += M, A;
  }, ""), v, x, S, C];
}
function o0(n) {
  return n && !!(n.internals.handleBounds || n.handles?.length) && !!(n.measured.width || n.width || n.initialWidth);
}
function y2(n) {
  const { sourceNode: i, targetNode: l } = n;
  if (!o0(i) || !o0(l))
    return null;
  const r = i.internals.handleBounds || l0(i.handles), s = l.internals.handleBounds || l0(l.handles), c = r0(r?.source ?? [], n.sourceHandle), f = r0(
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
  const h = c?.position || ye.Bottom, g = f?.position || ye.Top, p = mi(i, c, h), y = mi(l, f, g);
  return {
    sourceX: p.x,
    sourceY: p.y,
    targetX: y.x,
    targetY: y.y,
    sourcePosition: h,
    targetPosition: g
  };
}
function l0(n) {
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
function r0(n, i) {
  return n && (i ? n.find((l) => l.id === i) : n[0]) || null;
}
function fd(n, i) {
  return n ? typeof n == "string" ? n : `${i ? `${i}__` : ""}${Object.keys(n).sort().map((r) => `${r}=${n[r]}`).join("&")}` : "";
}
function v2(n, { id: i, defaultColor: l, defaultMarkerStart: r, defaultMarkerEnd: s }) {
  const c = /* @__PURE__ */ new Set();
  return n.reduce((f, h) => ([h.markerStart || r, h.markerEnd || s].forEach((g) => {
    if (g && typeof g == "object") {
      const p = fd(g, i);
      c.has(p) || (f.push({ id: p, color: g.color || l, ...g }), c.add(p));
    }
  }), f), []).sort((f, h) => f.id.localeCompare(h.id));
}
const pv = 1e3, b2 = 10, Od = {
  nodeOrigin: [0, 0],
  nodeExtent: Ol,
  elevateNodesOnSelect: !0,
  zIndexMode: "basic",
  defaults: {}
}, x2 = {
  ...Od,
  checkEquality: !0
};
function zd(n, i) {
  const l = { ...n };
  for (const r in i)
    i[r] !== void 0 && (l[r] = i[r]);
  return l;
}
function w2(n, i, l) {
  const r = zd(Od, l);
  for (const s of n.values())
    if (s.parentId)
      kd(s, n, i, r);
    else {
      const c = Vl(s, r.nodeOrigin), f = yo(s.extent) ? s.extent : r.nodeExtent, h = gi(c, f, Fn(s));
      s.internals.positionAbsolute = h;
    }
}
function S2(n, i) {
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
function Rd(n) {
  return n === "manual";
}
function dd(n, i, l, r = {}) {
  const s = zd(x2, r), c = { i: 0 }, f = new Map(i), h = s?.elevateNodesOnSelect && !Rd(s.zIndexMode) ? pv : 0;
  let g = n.length > 0;
  i.clear(), l.clear();
  for (const p of n) {
    let y = f.get(p.id);
    if (s.checkEquality && p === y?.internals.userNode)
      i.set(p.id, y);
    else {
      const m = Vl(p, s.nodeOrigin), v = yo(p.extent) ? p.extent : s.nodeExtent, x = gi(m, v, Fn(p));
      y = {
        ...s.defaults,
        ...p,
        measured: {
          width: p.measured?.width,
          height: p.measured?.height
        },
        internals: {
          positionAbsolute: x,
          // if user re-initializes the node or removes `measured` for whatever reason, we reset the handleBounds so that the node gets re-measured
          handleBounds: S2(p, y),
          z: yv(p, h, s.zIndexMode),
          userNode: p
        }
      }, i.set(p.id, y);
    }
    (y.measured === void 0 || y.measured.width === void 0 || y.measured.height === void 0) && !y.hidden && (g = !1), p.parentId && kd(y, i, l, r, c);
  }
  return g;
}
function E2(n, i) {
  if (!n.parentId)
    return;
  const l = i.get(n.parentId);
  l ? l.set(n.id, n) : i.set(n.parentId, /* @__PURE__ */ new Map([[n.id, n]]));
}
function kd(n, i, l, r, s) {
  const { elevateNodesOnSelect: c, nodeOrigin: f, nodeExtent: h, zIndexMode: g } = zd(Od, r), p = n.parentId, y = i.get(p);
  if (!y) {
    console.warn(`Parent node ${p} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
    return;
  }
  E2(n, l), s && !y.parentId && y.internals.rootParentIndex === void 0 && g === "auto" && (y.internals.rootParentIndex = ++s.i, y.internals.z = y.internals.z + s.i * b2), s && y.internals.rootParentIndex !== void 0 && (s.i = y.internals.rootParentIndex);
  const m = c && !Rd(g) ? pv : 0, { x: v, y: x, z: S } = _2(n, y, f, h, m, g), { positionAbsolute: C } = n.internals, T = v !== C.x || x !== C.y;
  (T || S !== n.internals.z) && i.set(n.id, {
    ...n,
    internals: {
      ...n.internals,
      positionAbsolute: T ? { x: v, y: x } : C,
      z: S
    }
  });
}
function yv(n, i, l) {
  const r = sn(n.zIndex) ? n.zIndex : 0;
  return Rd(l) ? r : r + (n.selected ? i : 0);
}
function _2(n, i, l, r, s, c) {
  const { x: f, y: h } = i.internals.positionAbsolute, g = Fn(n), p = Vl(n, l), y = yo(n.extent) ? gi(p, n.extent, g) : p;
  let m = gi({ x: f + y.x, y: h + y.y }, r, g);
  n.extent === "parent" && (m = ov(m, g, i));
  const v = yv(n, s, c), x = i.internals.z ?? 0;
  return {
    x: m.x,
    y: m.y,
    z: x >= v ? x + 1 : v
  };
}
function Hd(n, i, l, r = [0, 0]) {
  const s = [], c = /* @__PURE__ */ new Map();
  for (const f of n) {
    const h = i.get(f.parentId);
    if (!h)
      continue;
    const g = c.get(f.parentId)?.expandedRect ?? po(h), p = rv(g, f.rect);
    c.set(f.parentId, { expandedRect: p, parent: h });
  }
  return c.size > 0 && c.forEach(({ expandedRect: f, parent: h }, g) => {
    const p = h.internals.positionAbsolute, y = Fn(h), m = h.origin ?? r, v = f.x < p.x ? Math.round(Math.abs(p.x - f.x)) : 0, x = f.y < p.y ? Math.round(Math.abs(p.y - f.y)) : 0, S = Math.max(y.width, Math.round(f.width)), C = Math.max(y.height, Math.round(f.height)), T = (S - y.width) * m[0], A = (C - y.height) * m[1];
    (v > 0 || x > 0 || T || A) && (s.push({
      id: g,
      type: "position",
      position: {
        x: h.position.x - v + T,
        y: h.position.y - x + A
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
        width: S + (v ? m[0] * v - T : 0),
        height: C + (x ? m[1] * x - A : 0)
      }
    });
  }), s;
}
function N2(n, i, l, r, s, c, f) {
  const h = r?.querySelector(".xyflow__viewport");
  let g = !1;
  if (!h)
    return { changes: [], updatedInternals: g };
  const p = [], y = window.getComputedStyle(h), { m22: m } = new window.DOMMatrixReadOnly(y.transform), v = [];
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
    const C = Ad(x.nodeElement), T = S.measured.width !== C.width || S.measured.height !== C.height;
    if (!!(C.width && C.height && (T || !S.internals.handleBounds || x.force))) {
      const D = x.nodeElement.getBoundingClientRect(), E = yo(S.extent) ? S.extent : c;
      let { positionAbsolute: M } = S.internals;
      S.parentId && S.extent === "parent" ? M = ov(M, C, i.get(S.parentId)) : E && (M = gi(M, E, C));
      const H = {
        ...S,
        measured: C,
        internals: {
          ...S.internals,
          positionAbsolute: M,
          handleBounds: {
            source: t0("source", x.nodeElement, D, m, S.id),
            target: t0("target", x.nodeElement, D, m, S.id)
          }
        }
      };
      i.set(S.id, H), S.parentId && kd(H, i, l, { nodeOrigin: s, zIndexMode: f }), g = !0, T && (p.push({
        id: S.id,
        type: "dimensions",
        dimensions: C
      }), S.expandParent && S.parentId && v.push({
        id: S.id,
        parentId: S.parentId,
        rect: po(H, s)
      }));
    }
  }
  if (v.length > 0) {
    const x = Hd(v, i, l, s);
    p.push(...x);
  }
  return { changes: p, updatedInternals: g };
}
async function C2({ delta: n, panZoom: i, transform: l, translateExtent: r, width: s, height: c }) {
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
function s0(n, i, l, r, s, c) {
  let f = s;
  const h = r.get(f) || /* @__PURE__ */ new Map();
  r.set(f, h.set(l, i)), f = `${s}-${n}`;
  const g = r.get(f) || /* @__PURE__ */ new Map();
  if (r.set(f, g.set(l, i)), c) {
    f = `${s}-${n}-${c}`;
    const p = r.get(f) || /* @__PURE__ */ new Map();
    r.set(f, p.set(l, i));
  }
}
function vv(n, i, l) {
  n.clear(), i.clear();
  for (const r of l) {
    const { source: s, target: c, sourceHandle: f = null, targetHandle: h = null } = r, g = { edgeId: r.id, source: s, target: c, sourceHandle: f, targetHandle: h }, p = `${s}-${f}--${c}-${h}`, y = `${c}-${h}--${s}-${f}`;
    s0("source", g, y, n, s, f), s0("target", g, p, n, c, h), i.set(r.id, r);
  }
}
function bv(n, i) {
  if (!n.parentId)
    return !1;
  const l = i.get(n.parentId);
  return l ? l.selected ? !0 : bv(l, i) : !1;
}
function u0(n, i, l) {
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
function M2(n, i, l, r) {
  const s = /* @__PURE__ */ new Map();
  for (const [c, f] of n)
    if ((f.selected || f.id === r) && (!f.parentId || !bv(f, n)) && (f.draggable || i && typeof f.draggable > "u")) {
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
function Yf({ nodeId: n, dragItems: i, nodeLookup: l, dragging: r = !0 }) {
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
function T2({ dragItems: n, snapGrid: i, x: l, y: r }) {
  const s = n.values().next().value;
  if (!s)
    return null;
  const c = {
    x: l - s.distance.x,
    y: r - s.distance.y
  }, f = Il(c, i);
  return {
    x: f.x - c.x,
    y: f.y - c.y
  };
}
function j2({ onNodeMouseDown: n, getStoreItems: i, onDragStart: l, onDrag: r, onDragStop: s }) {
  let c = { x: null, y: null }, f = 0, h = /* @__PURE__ */ new Map(), g = !1, p = { x: 0, y: 0 }, y = null, m = !1, v = null, x = !1, S = !1, C = null;
  function T({ noDragClassName: D, handleSelector: E, domNode: M, isSelectable: H, nodeId: U, nodeClickDistance: Y = 0 }) {
    v = It(M);
    function X({ x: Q, y: J }) {
      const { nodeLookup: N, nodeExtent: L, snapGrid: _, snapToGrid: k, nodeOrigin: B, onNodeDrag: Z, onSelectionDrag: I, onError: j, updateNodePositions: q } = i();
      c = { x: Q, y: J };
      let G = !1;
      const R = h.size > 1, O = R && L ? ud(Yl(h)) : null, $ = R && k ? T2({
        dragItems: h,
        snapGrid: _,
        x: Q,
        y: J
      }) : null;
      for (const [W, P] of h) {
        if (!N.has(W))
          continue;
        let ie = { x: Q - P.distance.x, y: J - P.distance.y };
        k && (ie = $ ? {
          x: Math.round(ie.x + $.x),
          y: Math.round(ie.y + $.y)
        } : Il(ie, _));
        let de = null;
        if (R && L && !P.extent && O) {
          const { positionAbsolute: xe } = P.internals, Se = xe.x - O.x + L[0][0], _e = xe.x + P.measured.width - O.x2 + L[1][0], De = xe.y - O.y + L[0][1], Pe = xe.y + P.measured.height - O.y2 + L[1][1];
          de = [
            [Se, De],
            [_e, Pe]
          ];
        }
        const { position: he, positionAbsolute: ge } = iv({
          nodeId: W,
          nextPosition: ie,
          nodeLookup: N,
          nodeExtent: de || L,
          nodeOrigin: B,
          onError: j
        });
        G = G || P.position.x !== he.x || P.position.y !== he.y, P.position = he, P.internals.positionAbsolute = ge;
      }
      if (S = S || G, !!G && (q(h, !0), C && (r || Z || !U && I))) {
        const [W, P] = Yf({
          nodeId: U,
          dragItems: h,
          nodeLookup: N
        });
        r?.(C, h, W, P), Z?.(C, W, P), U || I?.(C, P);
      }
    }
    async function te() {
      if (!y)
        return;
      const { transform: Q, panBy: J, autoPanSpeed: N, autoPanOnNodeDrag: L } = i();
      if (!L) {
        g = !1, cancelAnimationFrame(f);
        return;
      }
      const [_, k] = lv(p, y, N);
      (_ !== 0 || k !== 0) && (c.x = (c.x ?? 0) - _ / Q[2], c.y = (c.y ?? 0) - k / Q[2], await J({ x: _, y: k }) && X(c)), f = requestAnimationFrame(te);
    }
    function K(Q) {
      const { nodeLookup: J, multiSelectionActive: N, nodesDraggable: L, transform: _, snapGrid: k, snapToGrid: B, selectNodesOnDrag: Z, onNodeDragStart: I, onSelectionDragStart: j, unselectNodesAndEdges: q } = i();
      m = !0, (!Z || !H) && !N && U && (J.get(U)?.selected || q()), H && Z && U && n?.(U);
      const G = Cl(Q.sourceEvent, { transform: _, snapGrid: k, snapToGrid: B, containerBounds: y });
      if (c = G, h = M2(J, L, G, U), h.size > 0 && (l || I || !U && j)) {
        const [R, O] = Yf({
          nodeId: U,
          dragItems: h,
          nodeLookup: J
        });
        l?.(Q.sourceEvent, h, R, O), I?.(Q.sourceEvent, R, O), U || j?.(Q.sourceEvent, O);
      }
    }
    const V = By().clickDistance(Y).on("start", (Q) => {
      const { domNode: J, nodeDragThreshold: N, transform: L, snapGrid: _, snapToGrid: k } = i();
      y = J?.getBoundingClientRect() || null, x = !1, S = !1, C = Q.sourceEvent, N === 0 && K(Q), c = Cl(Q.sourceEvent, { transform: L, snapGrid: _, snapToGrid: k, containerBounds: y }), p = un(Q.sourceEvent, y);
    }).on("drag", (Q) => {
      const { autoPanOnNodeDrag: J, transform: N, snapGrid: L, snapToGrid: _, nodeDragThreshold: k, nodeLookup: B } = i(), Z = Cl(Q.sourceEvent, { transform: N, snapGrid: L, snapToGrid: _, containerBounds: y });
      if (C = Q.sourceEvent, (Q.sourceEvent.type === "touchmove" && Q.sourceEvent.touches.length > 1 || // if user deletes a node while dragging, we need to abort the drag to prevent errors
      U && !B.has(U)) && (x = !0), !x) {
        if (!g && J && m && (g = !0, te()), !m) {
          const I = un(Q.sourceEvent, y), j = I.x - p.x, q = I.y - p.y;
          Math.sqrt(j * j + q * q) > k && K(Q);
        }
        (c.x !== Z.xSnapped || c.y !== Z.ySnapped) && h && m && (p = un(Q.sourceEvent, y), X(Z));
      }
    }).on("end", (Q) => {
      if (!(!m || x) && (g = !1, m = !1, cancelAnimationFrame(f), h.size > 0)) {
        const { nodeLookup: J, updateNodePositions: N, onNodeDragStop: L, onSelectionDragStop: _ } = i();
        if (S && (N(h, !1), S = !1), s || L || !U && _) {
          const [k, B] = Yf({
            nodeId: U,
            dragItems: h,
            nodeLookup: J,
            dragging: !1
          });
          s?.(Q.sourceEvent, h, k, B), L?.(Q.sourceEvent, k, B), U || _?.(Q.sourceEvent, B);
        }
      }
    }).filter((Q) => {
      const J = Q.target;
      return !Q.button && (!D || !u0(J, `.${D}`, M)) && (!E || u0(J, E, M));
    });
    v.call(V);
  }
  function A() {
    v?.on(".drag", null);
  }
  return {
    update: T,
    destroy: A
  };
}
function A2(n, i, l) {
  const r = [], s = {
    x: n.x - l,
    y: n.y - l,
    width: l * 2,
    height: l * 2
  };
  for (const c of i.values())
    Rl(s, po(c)) > 0 && r.push(c);
  return r;
}
const D2 = 250;
function O2(n, i, l, r) {
  let s = [], c = 1 / 0;
  const f = A2(n, l, i + D2);
  for (const h of f) {
    const g = [...h.internals.handleBounds?.source ?? [], ...h.internals.handleBounds?.target ?? []];
    for (const p of g) {
      if (r.nodeId === p.nodeId && r.type === p.type && r.id === p.id)
        continue;
      const { x: y, y: m } = mi(h, p, p.position, !0), v = Math.sqrt(Math.pow(y - n.x, 2) + Math.pow(m - n.y, 2));
      v > i || (v < c ? (s = [{ ...p, x: y, y: m }], c = v) : v === c && s.push({ ...p, x: y, y: m }));
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
function xv(n, i, l, r, s, c = !1) {
  const f = r.get(n);
  if (!f)
    return null;
  const h = s === "strict" ? f.internals.handleBounds?.[i] : [...f.internals.handleBounds?.source ?? [], ...f.internals.handleBounds?.target ?? []], g = (l ? h?.find((p) => p.id === l) : h?.[0]) ?? null;
  return g && c ? { ...g, ...mi(f, g, g.position, !0) } : g;
}
function wv(n, i) {
  return n || (i?.classList.contains("target") ? "target" : i?.classList.contains("source") ? "source" : null);
}
function z2(n, i) {
  let l = null;
  return i ? l = !0 : n && !i && (l = !1), l;
}
const Sv = () => !0;
function R2(n, { connectionMode: i, connectionRadius: l, handleId: r, nodeId: s, edgeUpdaterType: c, isTarget: f, domNode: h, nodeLookup: g, lib: p, autoPanOnConnect: y, flowId: m, panBy: v, cancelConnection: x, onConnectStart: S, onConnect: C, onConnectEnd: T, isValidConnection: A = Sv, onReconnectEnd: D, updateConnection: E, getTransform: M, getFromHandle: H, autoPanSpeed: U, dragThreshold: Y = 1, handleDomNode: X }) {
  const te = cv(n.target);
  let K = 0, V;
  const { x: Q, y: J } = un(n), N = wv(c, X), L = h?.getBoundingClientRect();
  let _ = !1;
  if (!L || !N)
    return;
  const k = xv(s, N, r, g, i);
  if (!k)
    return;
  let B = un(n, L), Z = !1, I = null, j = !1, q = null;
  function G() {
    if (!y || !L)
      return;
    const [he, ge] = lv(B, L, U);
    v({ x: he, y: ge }), K = requestAnimationFrame(G);
  }
  const R = {
    ...k,
    nodeId: s,
    type: N,
    position: k.position
  }, O = g.get(s);
  let W = {
    inProgress: !0,
    isValid: null,
    from: mi(O, R, ye.Left, !0),
    fromHandle: R,
    fromPosition: R.position,
    fromNode: O,
    to: B,
    toHandle: null,
    toPosition: Wp[R.position],
    toNode: null,
    pointer: B
  };
  function P() {
    _ = !0, E(W), S?.(n, { nodeId: s, handleId: r, handleType: N });
  }
  Y === 0 && P();
  function ie(he) {
    if (!_) {
      const { x: Pe, y: Et } = un(he), zt = Pe - Q, en = Et - J;
      if (!(zt * zt + en * en > Y * Y))
        return;
      P();
    }
    if (!H() || !R) {
      de(he);
      return;
    }
    const ge = M();
    B = un(he, L), V = O2(ql(B, ge, !1, [1, 1]), l, g, R), Z || (G(), Z = !0);
    const xe = Ev(he, {
      handle: V,
      connectionMode: i,
      fromNodeId: s,
      fromHandleId: r,
      fromType: f ? "target" : "source",
      isValidConnection: A,
      doc: te,
      lib: p,
      flowId: m,
      nodeLookup: g
    });
    q = xe.handleDomNode, I = xe.connection, j = z2(!!V, xe.isValid);
    const Se = g.get(s), _e = Se ? mi(Se, R, ye.Left, !0) : W.from, De = {
      ...W,
      from: _e,
      isValid: j,
      to: xe.toHandle && j ? Ks({ x: xe.toHandle.x, y: xe.toHandle.y }, ge) : B,
      toHandle: xe.toHandle,
      toPosition: j && xe.toHandle ? xe.toHandle.position : Wp[R.position],
      toNode: xe.toHandle ? g.get(xe.toHandle.nodeId) : null,
      pointer: B
    };
    E(De), W = De;
  }
  function de(he) {
    if (!("touches" in he && he.touches.length > 0)) {
      if (_) {
        (V || q) && I && j && C?.(I);
        const { inProgress: ge, ...xe } = W, Se = {
          ...xe,
          toPosition: W.toHandle ? W.toPosition : null
        };
        T?.(he, Se), c && D?.(he, Se);
      }
      x(), cancelAnimationFrame(K), Z = !1, j = !1, I = null, q = null, te.removeEventListener("mousemove", ie), te.removeEventListener("mouseup", de), te.removeEventListener("touchmove", ie), te.removeEventListener("touchend", de);
    }
  }
  te.addEventListener("mousemove", ie), te.addEventListener("mouseup", de), te.addEventListener("touchmove", ie), te.addEventListener("touchend", de);
}
function Ev(n, { handle: i, connectionMode: l, fromNodeId: r, fromHandleId: s, fromType: c, doc: f, lib: h, flowId: g, isValidConnection: p = Sv, nodeLookup: y }) {
  const m = c === "target", v = i ? f.querySelector(`.${h}-flow__handle[data-id="${g}-${i?.nodeId}-${i?.id}-${i?.type}"]`) : null, { x, y: S } = un(n), C = f.elementFromPoint(x, S), T = C?.classList.contains(`${h}-flow__handle`) ? C : v, A = {
    handleDomNode: T,
    isValid: !1,
    connection: null,
    toHandle: null
  };
  if (T) {
    const D = wv(void 0, T), E = T.getAttribute("data-nodeid"), M = T.getAttribute("data-handleid"), H = T.classList.contains("connectable"), U = T.classList.contains("connectableend");
    if (!E || !D)
      return A;
    const Y = {
      source: m ? E : r,
      sourceHandle: m ? M : s,
      target: m ? r : E,
      targetHandle: m ? s : M
    };
    A.connection = Y;
    const te = H && U && (l === go.Strict ? m && D === "source" || !m && D === "target" : E !== r || M !== s);
    A.isValid = te && p(Y), A.toHandle = xv(E, D, M, y, l, !0);
  }
  return A;
}
const hd = {
  onPointerDown: R2,
  isValid: Ev
};
function k2({ domNode: n, panZoom: i, getTransform: l, getViewScale: r }) {
  const s = It(n);
  function c({ translateExtent: h, width: g, height: p, zoomStep: y = 1, pannable: m = !0, zoomable: v = !0, inversePan: x = !1 }) {
    const S = (E) => {
      if (E.sourceEvent.type !== "wheel" || !i)
        return;
      const M = l(), H = E.sourceEvent.ctrlKey && kl() ? 10 : 1, U = -E.sourceEvent.deltaY * (E.sourceEvent.deltaMode === 1 ? 0.05 : E.sourceEvent.deltaMode ? 1 : 2e-3) * y, Y = M[2] * Math.pow(2, U * H);
      i.scaleTo(Y);
    };
    let C = [0, 0];
    const T = (E) => {
      (E.sourceEvent.type === "mousedown" || E.sourceEvent.type === "touchstart") && (C = [
        E.sourceEvent.clientX ?? E.sourceEvent.touches[0].clientX,
        E.sourceEvent.clientY ?? E.sourceEvent.touches[0].clientY
      ]);
    }, A = (E) => {
      const M = l();
      if (E.sourceEvent.type !== "mousemove" && E.sourceEvent.type !== "touchmove" || !i)
        return;
      const H = [
        E.sourceEvent.clientX ?? E.sourceEvent.touches[0].clientX,
        E.sourceEvent.clientY ?? E.sourceEvent.touches[0].clientY
      ], U = [H[0] - C[0], H[1] - C[1]];
      C = H;
      const Y = r() * Math.max(M[2], Math.log(M[2])) * (x ? -1 : 1), X = {
        x: M[0] - U[0] * Y,
        y: M[1] - U[1] * Y
      }, te = [
        [0, 0],
        [g, p]
      ];
      i.setViewportConstrained({
        x: X.x,
        y: X.y,
        zoom: M[2]
      }, te, h);
    }, D = Fy().on("start", T).on("zoom", m ? A : null).on("zoom.wheel", v ? S : null);
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
const ru = (n) => ({
  x: n.x,
  y: n.y,
  zoom: n.k
}), If = ({ x: n, y: i, zoom: l }) => iu.translate(n, i).scale(l), ro = (n, i) => n.target.closest(`.${i}`), _v = (n, i) => i === 2 && Array.isArray(n) && n.includes(2), H2 = (n) => ((n *= 2) <= 1 ? n * n * n : (n -= 2) * n * n + 2) / 2, qf = (n, i = 0, l = H2, r = () => {
}) => {
  const s = typeof i == "number" && i > 0;
  return s || r(), s ? n.transition().duration(i).ease(l).on("end", r) : n;
}, Nv = (n) => {
  const i = n.ctrlKey && kl() ? 10 : 1;
  return -n.deltaY * (n.deltaMode === 1 ? 0.05 : n.deltaMode ? 1 : 2e-3) * i;
};
function B2({ zoomPanValues: n, noWheelClassName: i, d3Selection: l, d3Zoom: r, panOnScrollMode: s, panOnScrollSpeed: c, zoomOnPinch: f, onPanZoomStart: h, onPanZoom: g, onPanZoomEnd: p }) {
  return (y) => {
    if (ro(y, i))
      return y.ctrlKey && y.preventDefault(), !1;
    y.preventDefault(), y.stopImmediatePropagation();
    const m = l.property("__zoom").k || 1;
    if (y.ctrlKey && f) {
      const T = ln(y), A = Nv(y), D = m * Math.pow(2, A);
      r.scaleTo(l, D, T, y);
      return;
    }
    const v = y.deltaMode === 1 ? 20 : 1;
    let x = s === fi.Vertical ? 0 : y.deltaX * v, S = s === fi.Horizontal ? 0 : y.deltaY * v;
    !kl() && y.shiftKey && s !== fi.Vertical && (x = y.deltaY * v, S = 0), r.translateBy(
      l,
      -(x / m) * c,
      -(S / m) * c,
      // @ts-ignore
      { internal: !0 }
    );
    const C = ru(l.property("__zoom"));
    clearTimeout(n.panScrollTimeout), n.isPanScrolling ? (g?.(y, C), n.panScrollTimeout = setTimeout(() => {
      p?.(y, C), n.isPanScrolling = !1;
    }, 150)) : (n.isPanScrolling = !0, h?.(y, C));
  };
}
function L2({ noWheelClassName: n, preventScrolling: i, d3ZoomHandler: l }) {
  return function(r, s) {
    const c = r.type === "wheel", f = !i && c && !r.ctrlKey, h = ro(r, n);
    if (r.ctrlKey && c && h && r.preventDefault(), f || h)
      return null;
    r.preventDefault(), l.call(this, r, s);
  };
}
function U2({ zoomPanValues: n, onDraggingChange: i, onPanZoomStart: l }) {
  return (r) => {
    if (r.sourceEvent?.internal)
      return;
    const s = ru(r.transform);
    n.mouseButton = r.sourceEvent?.button || 0, n.isZoomingOrPanning = !0, n.prevViewport = s, r.sourceEvent?.type === "mousedown" && i(!0), l && l?.(r.sourceEvent, s);
  };
}
function V2({ zoomPanValues: n, panOnDrag: i, onPaneContextMenu: l, onTransformChange: r, onPanZoom: s }) {
  return (c) => {
    n.usedRightMouseButton = !!(l && _v(i, n.mouseButton ?? 0)), c.sourceEvent?.sync || r([c.transform.x, c.transform.y, c.transform.k]), s && !c.sourceEvent?.internal && s?.(c.sourceEvent, ru(c.transform));
  };
}
function Y2({ zoomPanValues: n, panOnDrag: i, panOnScroll: l, onDraggingChange: r, onPanZoomEnd: s, onPaneContextMenu: c }) {
  return (f) => {
    if (!f.sourceEvent?.internal && (n.isZoomingOrPanning = !1, c && _v(i, n.mouseButton ?? 0) && !n.usedRightMouseButton && f.sourceEvent && c(f.sourceEvent), n.usedRightMouseButton = !1, r(!1), s)) {
      const h = ru(f.transform);
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
function I2({ zoomActivationKeyPressed: n, zoomOnScroll: i, zoomOnPinch: l, panOnDrag: r, panOnScroll: s, zoomOnDoubleClick: c, userSelectionActive: f, noWheelClassName: h, noPanClassName: g, lib: p, connectionInProgress: y }) {
  return (m) => {
    const v = n || i, x = l && m.ctrlKey, S = m.type === "wheel";
    if (m.button === 1 && m.type === "mousedown" && (ro(m, `${p}-flow__node`) || ro(m, `${p}-flow__edge`)))
      return !0;
    if (!r && !v && !s && !c && !l || f || y && !S || ro(m, h) && S || ro(m, g) && (!S || s && S && !n) || !l && m.ctrlKey && S)
      return !1;
    if (!l && m.type === "touchstart" && m.touches?.length > 1)
      return m.preventDefault(), !1;
    if (!v && !s && !x && S || !r && (m.type === "mousedown" || m.type === "touchstart") || Array.isArray(r) && !r.includes(m.button) && m.type === "mousedown")
      return !1;
    const C = Array.isArray(r) && r.includes(m.button) || !m.button || m.button <= 1;
    return (!m.ctrlKey || S) && C;
  };
}
function q2({ domNode: n, minZoom: i, maxZoom: l, translateExtent: r, viewport: s, onPanZoom: c, onPanZoomStart: f, onPanZoomEnd: h, onDraggingChange: g }) {
  const p = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: {},
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, y = n.getBoundingClientRect(), m = Fy().scaleExtent([i, l]).translateExtent(r), v = It(n).call(m);
  D({
    x: s.x,
    y: s.y,
    zoom: mo(s.zoom, i, l)
  }, [
    [0, 0],
    [y.width, y.height]
  ], r);
  const x = v.on("wheel.zoom"), S = v.on("dblclick.zoom");
  m.wheelDelta(Nv);
  function C(V, Q) {
    return v ? new Promise((J) => {
      m?.interpolate(Q?.interpolate === "linear" ? Nl : Os).transform(qf(v, Q?.duration, Q?.ease, () => J(!0)), V);
    }) : Promise.resolve(!1);
  }
  function T({ noWheelClassName: V, noPanClassName: Q, onPaneContextMenu: J, userSelectionActive: N, panOnScroll: L, panOnDrag: _, panOnScrollMode: k, panOnScrollSpeed: B, preventScrolling: Z, zoomOnPinch: I, zoomOnScroll: j, zoomOnDoubleClick: q, zoomActivationKeyPressed: G, lib: R, onTransformChange: O, connectionInProgress: $, paneClickDistance: W, selectionOnDrag: P }) {
    N && !p.isZoomingOrPanning && A();
    const ie = L && !G && !N;
    m.clickDistance(P ? 1 / 0 : !sn(W) || W < 0 ? 0 : W);
    const de = ie ? B2({
      zoomPanValues: p,
      noWheelClassName: V,
      d3Selection: v,
      d3Zoom: m,
      panOnScrollMode: k,
      panOnScrollSpeed: B,
      zoomOnPinch: I,
      onPanZoomStart: f,
      onPanZoom: c,
      onPanZoomEnd: h
    }) : L2({
      noWheelClassName: V,
      preventScrolling: Z,
      d3ZoomHandler: x
    });
    if (v.on("wheel.zoom", de, { passive: !1 }), !N) {
      const ge = U2({
        zoomPanValues: p,
        onDraggingChange: g,
        onPanZoomStart: f
      });
      m.on("start", ge);
      const xe = V2({
        zoomPanValues: p,
        panOnDrag: _,
        onPaneContextMenu: !!J,
        onPanZoom: c,
        onTransformChange: O
      });
      m.on("zoom", xe);
      const Se = Y2({
        zoomPanValues: p,
        panOnDrag: _,
        panOnScroll: L,
        onPaneContextMenu: J,
        onPanZoomEnd: h,
        onDraggingChange: g
      });
      m.on("end", Se);
    }
    const he = I2({
      zoomActivationKeyPressed: G,
      panOnDrag: _,
      zoomOnScroll: j,
      panOnScroll: L,
      zoomOnDoubleClick: q,
      zoomOnPinch: I,
      userSelectionActive: N,
      noPanClassName: Q,
      noWheelClassName: V,
      lib: R,
      connectionInProgress: $
    });
    m.filter(he), q ? v.on("dblclick.zoom", S) : v.on("dblclick.zoom", null);
  }
  function A() {
    m.on("zoom", null);
  }
  async function D(V, Q, J) {
    const N = If(V), L = m?.constrain()(N, Q, J);
    return L && await C(L), new Promise((_) => _(L));
  }
  async function E(V, Q) {
    const J = If(V);
    return await C(J, Q), new Promise((N) => N(J));
  }
  function M(V) {
    if (v) {
      const Q = If(V), J = v.property("__zoom");
      (J.k !== V.zoom || J.x !== V.x || J.y !== V.y) && m?.transform(v, Q, null, { sync: !0 });
    }
  }
  function H() {
    const V = v ? Wy(v.node()) : { x: 0, y: 0, k: 1 };
    return { x: V.x, y: V.y, zoom: V.k };
  }
  function U(V, Q) {
    return v ? new Promise((J) => {
      m?.interpolate(Q?.interpolate === "linear" ? Nl : Os).scaleTo(qf(v, Q?.duration, Q?.ease, () => J(!0)), V);
    }) : Promise.resolve(!1);
  }
  function Y(V, Q) {
    return v ? new Promise((J) => {
      m?.interpolate(Q?.interpolate === "linear" ? Nl : Os).scaleBy(qf(v, Q?.duration, Q?.ease, () => J(!0)), V);
    }) : Promise.resolve(!1);
  }
  function X(V) {
    m?.scaleExtent(V);
  }
  function te(V) {
    m?.translateExtent(V);
  }
  function K(V) {
    const Q = !sn(V) || V < 0 ? 0 : V;
    m?.clickDistance(Q);
  }
  return {
    update: T,
    destroy: A,
    setViewport: E,
    setViewportConstrained: D,
    getViewport: H,
    scaleTo: U,
    scaleBy: Y,
    setScaleExtent: X,
    setTranslateExtent: te,
    syncViewport: M,
    setClickDistance: K
  };
}
var vo;
(function(n) {
  n.Line = "line", n.Handle = "handle";
})(vo || (vo = {}));
function X2({ width: n, prevWidth: i, height: l, prevHeight: r, affectsX: s, affectsY: c }) {
  const f = n - i, h = l - r, g = [f > 0 ? 1 : f < 0 ? -1 : 0, h > 0 ? 1 : h < 0 ? -1 : 0];
  return f && s && (g[0] = g[0] * -1), h && c && (g[1] = g[1] * -1), g;
}
function c0(n) {
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
function Ns(n, i, l) {
  return Math.max(0, i - n, n - l);
}
function f0(n, i) {
  return n ? !i : i;
}
function G2(n, i, l, r, s, c, f, h) {
  let { affectsX: g, affectsY: p } = i;
  const { isHorizontal: y, isVertical: m } = i, v = y && m, { xSnapped: x, ySnapped: S } = l, { minWidth: C, maxWidth: T, minHeight: A, maxHeight: D } = r, { x: E, y: M, width: H, height: U, aspectRatio: Y } = n;
  let X = Math.floor(y ? x - n.pointerX : 0), te = Math.floor(m ? S - n.pointerY : 0);
  const K = H + (g ? -X : X), V = U + (p ? -te : te), Q = -c[0] * H, J = -c[1] * U;
  let N = Ns(K, C, T), L = Ns(V, A, D);
  if (f) {
    let B = 0, Z = 0;
    g && X < 0 ? B = Ta(E + X + Q, f[0][0]) : !g && X > 0 && (B = ja(E + K + Q, f[1][0])), p && te < 0 ? Z = Ta(M + te + J, f[0][1]) : !p && te > 0 && (Z = ja(M + V + J, f[1][1])), N = Math.max(N, B), L = Math.max(L, Z);
  }
  if (h) {
    let B = 0, Z = 0;
    g && X > 0 ? B = ja(E + X, h[0][0]) : !g && X < 0 && (B = Ta(E + K, h[1][0])), p && te > 0 ? Z = ja(M + te, h[0][1]) : !p && te < 0 && (Z = Ta(M + V, h[1][1])), N = Math.max(N, B), L = Math.max(L, Z);
  }
  if (s) {
    if (y) {
      const B = Ns(K / Y, A, D) * Y;
      if (N = Math.max(N, B), f) {
        let Z = 0;
        !g && !p || g && !p && v ? Z = ja(M + J + K / Y, f[1][1]) * Y : Z = Ta(M + J + (g ? X : -X) / Y, f[0][1]) * Y, N = Math.max(N, Z);
      }
      if (h) {
        let Z = 0;
        !g && !p || g && !p && v ? Z = Ta(M + K / Y, h[1][1]) * Y : Z = ja(M + (g ? X : -X) / Y, h[0][1]) * Y, N = Math.max(N, Z);
      }
    }
    if (m) {
      const B = Ns(V * Y, C, T) / Y;
      if (L = Math.max(L, B), f) {
        let Z = 0;
        !g && !p || p && !g && v ? Z = ja(E + V * Y + Q, f[1][0]) / Y : Z = Ta(E + (p ? te : -te) * Y + Q, f[0][0]) / Y, L = Math.max(L, Z);
      }
      if (h) {
        let Z = 0;
        !g && !p || p && !g && v ? Z = Ta(E + V * Y, h[1][0]) / Y : Z = ja(E + (p ? te : -te) * Y, h[0][0]) / Y, L = Math.max(L, Z);
      }
    }
  }
  te = te + (te < 0 ? L : -L), X = X + (X < 0 ? N : -N), s && (v ? K > V * Y ? te = (f0(g, p) ? -X : X) / Y : X = (f0(g, p) ? -te : te) * Y : y ? (te = X / Y, p = g) : (X = te * Y, g = p));
  const _ = g ? E + X : E, k = p ? M + te : M;
  return {
    width: H + (g ? -X : X),
    height: U + (p ? -te : te),
    x: c[0] * X * (g ? -1 : 1) + _,
    y: c[1] * te * (p ? -1 : 1) + k
  };
}
const Cv = { width: 0, height: 0, x: 0, y: 0 }, Z2 = {
  ...Cv,
  pointerX: 0,
  pointerY: 0,
  aspectRatio: 1
};
function $2(n) {
  return [
    [0, 0],
    [n.measured.width, n.measured.height]
  ];
}
function Q2(n, i, l) {
  const r = i.position.x + n.position.x, s = i.position.y + n.position.y, c = n.measured.width ?? 0, f = n.measured.height ?? 0, h = l[0] * c, g = l[1] * f;
  return [
    [r - h, s - g],
    [r + c - h, s + f - g]
  ];
}
function K2({ domNode: n, nodeId: i, getStoreItems: l, onChange: r, onEnd: s }) {
  const c = It(n);
  let f = {
    controlDirection: c0("bottom-right"),
    boundaries: {
      minWidth: 0,
      minHeight: 0,
      maxWidth: Number.MAX_VALUE,
      maxHeight: Number.MAX_VALUE
    },
    resizeDirection: void 0,
    keepAspectRatio: !1
  };
  function h({ controlPosition: p, boundaries: y, keepAspectRatio: m, resizeDirection: v, onResizeStart: x, onResize: S, onResizeEnd: C, shouldResize: T }) {
    let A = { ...Cv }, D = { ...Z2 };
    f = {
      boundaries: y,
      resizeDirection: v,
      keepAspectRatio: m,
      controlDirection: c0(p)
    };
    let E, M = null, H = [], U, Y, X, te = !1;
    const K = By().on("start", (V) => {
      const { nodeLookup: Q, transform: J, snapGrid: N, snapToGrid: L, nodeOrigin: _, paneDomNode: k } = l();
      if (E = Q.get(i), !E)
        return;
      M = k?.getBoundingClientRect() ?? null;
      const { xSnapped: B, ySnapped: Z } = Cl(V.sourceEvent, {
        transform: J,
        snapGrid: N,
        snapToGrid: L,
        containerBounds: M
      });
      A = {
        width: E.measured.width ?? 0,
        height: E.measured.height ?? 0,
        x: E.position.x ?? 0,
        y: E.position.y ?? 0
      }, D = {
        ...A,
        pointerX: B,
        pointerY: Z,
        aspectRatio: A.width / A.height
      }, U = void 0, E.parentId && (E.extent === "parent" || E.expandParent) && (U = Q.get(E.parentId), Y = U && E.extent === "parent" ? $2(U) : void 0), H = [], X = void 0;
      for (const [I, j] of Q)
        if (j.parentId === i && (H.push({
          id: I,
          position: { ...j.position },
          extent: j.extent
        }), j.extent === "parent" || j.expandParent)) {
          const q = Q2(j, E, j.origin ?? _);
          X ? X = [
            [Math.min(q[0][0], X[0][0]), Math.min(q[0][1], X[0][1])],
            [Math.max(q[1][0], X[1][0]), Math.max(q[1][1], X[1][1])]
          ] : X = q;
        }
      x?.(V, { ...A });
    }).on("drag", (V) => {
      const { transform: Q, snapGrid: J, snapToGrid: N, nodeOrigin: L } = l(), _ = Cl(V.sourceEvent, {
        transform: Q,
        snapGrid: J,
        snapToGrid: N,
        containerBounds: M
      }), k = [];
      if (!E)
        return;
      const { x: B, y: Z, width: I, height: j } = A, q = {}, G = E.origin ?? L, { width: R, height: O, x: $, y: W } = G2(D, f.controlDirection, _, f.boundaries, f.keepAspectRatio, G, Y, X), P = R !== I, ie = O !== j, de = $ !== B && P, he = W !== Z && ie;
      if (!de && !he && !P && !ie)
        return;
      if ((de || he || G[0] === 1 || G[1] === 1) && (q.x = de ? $ : A.x, q.y = he ? W : A.y, A.x = q.x, A.y = q.y, H.length > 0)) {
        const _e = $ - B, De = W - Z;
        for (const Pe of H)
          Pe.position = {
            x: Pe.position.x - _e + G[0] * (R - I),
            y: Pe.position.y - De + G[1] * (O - j)
          }, k.push(Pe);
      }
      if ((P || ie) && (q.width = P && (!f.resizeDirection || f.resizeDirection === "horizontal") ? R : A.width, q.height = ie && (!f.resizeDirection || f.resizeDirection === "vertical") ? O : A.height, A.width = q.width, A.height = q.height), U && E.expandParent) {
        const _e = G[0] * (q.width ?? 0);
        q.x && q.x < _e && (A.x = _e, D.x = D.x - (q.x - _e));
        const De = G[1] * (q.height ?? 0);
        q.y && q.y < De && (A.y = De, D.y = D.y - (q.y - De));
      }
      const ge = X2({
        width: A.width,
        prevWidth: I,
        height: A.height,
        prevHeight: j,
        affectsX: f.controlDirection.affectsX,
        affectsY: f.controlDirection.affectsY
      }), xe = { ...A, direction: ge };
      T?.(V, xe) !== !1 && (te = !0, S?.(V, xe), r(q, k));
    }).on("end", (V) => {
      te && (C?.(V, { ...A }), s?.({ ...A }), te = !1);
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
var Xf = { exports: {} }, Gf = {}, Zf = { exports: {} }, $f = {};
var d0;
function J2() {
  if (d0) return $f;
  d0 = 1;
  var n = Bl();
  function i(m, v) {
    return m === v && (m !== 0 || 1 / m === 1 / v) || m !== m && v !== v;
  }
  var l = typeof Object.is == "function" ? Object.is : i, r = n.useState, s = n.useEffect, c = n.useLayoutEffect, f = n.useDebugValue;
  function h(m, v) {
    var x = v(), S = r({ inst: { value: x, getSnapshot: v } }), C = S[0].inst, T = S[1];
    return c(
      function() {
        C.value = x, C.getSnapshot = v, g(C) && T({ inst: C });
      },
      [m, x, v]
    ), s(
      function() {
        return g(C) && T({ inst: C }), m(function() {
          g(C) && T({ inst: C });
        });
      },
      [m]
    ), f(x), x;
  }
  function g(m) {
    var v = m.getSnapshot;
    m = m.value;
    try {
      var x = v();
      return !l(m, x);
    } catch {
      return !0;
    }
  }
  function p(m, v) {
    return v();
  }
  var y = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? p : h;
  return $f.useSyncExternalStore = n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : y, $f;
}
var h0;
function W2() {
  return h0 || (h0 = 1, Zf.exports = J2()), Zf.exports;
}
var g0;
function F2() {
  if (g0) return Gf;
  g0 = 1;
  var n = Bl(), i = W2();
  function l(p, y) {
    return p === y && (p !== 0 || 1 / p === 1 / y) || p !== p && y !== y;
  }
  var r = typeof Object.is == "function" ? Object.is : l, s = i.useSyncExternalStore, c = n.useRef, f = n.useEffect, h = n.useMemo, g = n.useDebugValue;
  return Gf.useSyncExternalStoreWithSelector = function(p, y, m, v, x) {
    var S = c(null);
    if (S.current === null) {
      var C = { hasValue: !1, value: null };
      S.current = C;
    } else C = S.current;
    S = h(
      function() {
        function A(U) {
          if (!D) {
            if (D = !0, E = U, U = v(U), x !== void 0 && C.hasValue) {
              var Y = C.value;
              if (x(Y, U))
                return M = Y;
            }
            return M = U;
          }
          if (Y = M, r(E, U)) return Y;
          var X = v(U);
          return x !== void 0 && x(Y, X) ? (E = U, Y) : (E = U, M = X);
        }
        var D = !1, E, M, H = m === void 0 ? null : m;
        return [
          function() {
            return A(y());
          },
          H === null ? void 0 : function() {
            return A(H());
          }
        ];
      },
      [y, m, v, x]
    );
    var T = s(p, S[0], S[1]);
    return f(
      function() {
        C.hasValue = !0, C.value = T;
      },
      [T]
    ), g(T), T;
  }, Gf;
}
var m0;
function P2() {
  return m0 || (m0 = 1, Xf.exports = F2()), Xf.exports;
}
var eN = P2();
const tN = /* @__PURE__ */ ry(eN), nN = {}, p0 = (n) => {
  let i;
  const l = /* @__PURE__ */ new Set(), r = (y, m) => {
    const v = typeof y == "function" ? y(i) : y;
    if (!Object.is(v, i)) {
      const x = i;
      i = m ?? (typeof v != "object" || v === null) ? v : Object.assign({}, i, v), l.forEach((S) => S(i, x));
    }
  }, s = () => i, g = { setState: r, getState: s, getInitialState: () => p, subscribe: (y) => (l.add(y), () => l.delete(y)), destroy: () => {
    (nN ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), l.clear();
  } }, p = i = n(r, s, g);
  return g;
}, aN = (n) => n ? p0(n) : p0, { useDebugValue: iN } = yl, { useSyncExternalStoreWithSelector: oN } = tN, lN = (n) => n;
function Mv(n, i = lN, l) {
  const r = oN(
    n.subscribe,
    n.getState,
    n.getServerState || n.getInitialState,
    i,
    l
  );
  return iN(r), r;
}
const y0 = (n, i) => {
  const l = aN(n), r = (s, c = i) => Mv(l, s, c);
  return Object.assign(r, l), r;
}, rN = (n, i) => n ? y0(n, i) : y0;
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
var Qf = { exports: {} }, bt = {};
var v0;
function sN() {
  if (v0) return bt;
  v0 = 1;
  var n = Bl();
  function i(g) {
    var p = "https://react.dev/errors/" + g;
    if (1 < arguments.length) {
      p += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var y = 2; y < arguments.length; y++)
        p += "&args[]=" + encodeURIComponent(arguments[y]);
    }
    return "Minified React error #" + g + "; visit " + p + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
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
  function c(g, p, y) {
    var m = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: s,
      key: m == null ? null : "" + m,
      children: g,
      containerInfo: p,
      implementation: y
    };
  }
  var f = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function h(g, p) {
    if (g === "font") return "";
    if (typeof p == "string")
      return p === "use-credentials" ? p : "";
  }
  return bt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r, bt.createPortal = function(g, p) {
    var y = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!p || p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11)
      throw Error(i(299));
    return c(g, p, null, y);
  }, bt.flushSync = function(g) {
    var p = f.T, y = r.p;
    try {
      if (f.T = null, r.p = 2, g) return g();
    } finally {
      f.T = p, r.p = y, r.d.f();
    }
  }, bt.preconnect = function(g, p) {
    typeof g == "string" && (p ? (p = p.crossOrigin, p = typeof p == "string" ? p === "use-credentials" ? p : "" : void 0) : p = null, r.d.C(g, p));
  }, bt.prefetchDNS = function(g) {
    typeof g == "string" && r.d.D(g);
  }, bt.preinit = function(g, p) {
    if (typeof g == "string" && p && typeof p.as == "string") {
      var y = p.as, m = h(y, p.crossOrigin), v = typeof p.integrity == "string" ? p.integrity : void 0, x = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
      y === "style" ? r.d.S(
        g,
        typeof p.precedence == "string" ? p.precedence : void 0,
        {
          crossOrigin: m,
          integrity: v,
          fetchPriority: x
        }
      ) : y === "script" && r.d.X(g, {
        crossOrigin: m,
        integrity: v,
        fetchPriority: x,
        nonce: typeof p.nonce == "string" ? p.nonce : void 0
      });
    }
  }, bt.preinitModule = function(g, p) {
    if (typeof g == "string")
      if (typeof p == "object" && p !== null) {
        if (p.as == null || p.as === "script") {
          var y = h(
            p.as,
            p.crossOrigin
          );
          r.d.M(g, {
            crossOrigin: y,
            integrity: typeof p.integrity == "string" ? p.integrity : void 0,
            nonce: typeof p.nonce == "string" ? p.nonce : void 0
          });
        }
      } else p == null && r.d.M(g);
  }, bt.preload = function(g, p) {
    if (typeof g == "string" && typeof p == "object" && p !== null && typeof p.as == "string") {
      var y = p.as, m = h(y, p.crossOrigin);
      r.d.L(g, y, {
        crossOrigin: m,
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
  }, bt.preloadModule = function(g, p) {
    if (typeof g == "string")
      if (p) {
        var y = h(p.as, p.crossOrigin);
        r.d.m(g, {
          as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
          crossOrigin: y,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0
        });
      } else r.d.m(g);
  }, bt.requestFormReset = function(g) {
    r.d.r(g);
  }, bt.unstable_batchedUpdates = function(g, p) {
    return g(p);
  }, bt.useFormState = function(g, p, y) {
    return f.H.useFormState(g, p, y);
  }, bt.useFormStatus = function() {
    return f.H.useHostTransitionStatus();
  }, bt.version = "19.2.4", bt;
}
var b0;
function Tv() {
  if (b0) return Qf.exports;
  b0 = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (i) {
        console.error(i);
      }
  }
  return n(), Qf.exports = sN(), Qf.exports;
}
var uN = Tv();
const su = ee.createContext(null), cN = su.Provider, jv = wn.error001();
function ze(n, i) {
  const l = ee.useContext(su);
  if (l === null)
    throw new Error(jv);
  return Mv(l, n, i);
}
function Je() {
  const n = ee.useContext(su);
  if (n === null)
    throw new Error(jv);
  return ee.useMemo(() => ({
    getState: n.getState,
    setState: n.setState,
    subscribe: n.subscribe
  }), [n]);
}
const x0 = { display: "none" }, fN = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  border: 0,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0px, 0px, 0px, 0px)",
  clipPath: "inset(100%)"
}, Av = "react-flow__node-desc", Dv = "react-flow__edge-desc", dN = "react-flow__aria-live", hN = (n) => n.ariaLiveMessage, gN = (n) => n.ariaLabelConfig;
function mN({ rfId: n }) {
  const i = ze(hN);
  return b.jsx("div", { id: `${dN}-${n}`, "aria-live": "assertive", "aria-atomic": "true", style: fN, children: i });
}
function pN({ rfId: n, disableKeyboardA11y: i }) {
  const l = ze(gN);
  return b.jsxs(b.Fragment, { children: [b.jsx("div", { id: `${Av}-${n}`, style: x0, children: i ? l["node.a11yDescription.default"] : l["node.a11yDescription.keyboardDisabled"] }), b.jsx("div", { id: `${Dv}-${n}`, style: x0, children: l["edge.a11yDescription.default"] }), !i && b.jsx(mN, { rfId: n })] });
}
const uu = ee.forwardRef(({ position: n = "top-left", children: i, className: l, style: r, ...s }, c) => {
  const f = `${n}`.split("-");
  return b.jsx("div", { className: ut(["react-flow__panel", l, ...f]), style: r, ref: c, ...s, children: i });
});
uu.displayName = "Panel";
function yN({ proOptions: n, position: i = "bottom-right" }) {
  return n?.hideAttribution ? null : b.jsx(uu, { position: i, className: "react-flow__attribution", "data-message": "Please only hide this attribution when you are subscribed to React Flow Pro: https://pro.reactflow.dev", children: b.jsx("a", { href: "https://reactflow.dev", target: "_blank", rel: "noopener noreferrer", "aria-label": "React Flow attribution", children: "React Flow" }) });
}
const vN = (n) => {
  const i = [], l = [];
  for (const [, r] of n.nodeLookup)
    r.selected && i.push(r.internals.userNode);
  for (const [, r] of n.edgeLookup)
    r.selected && l.push(r);
  return { selectedNodes: i, selectedEdges: l };
}, Cs = (n) => n.id;
function bN(n, i) {
  return Ke(n.selectedNodes.map(Cs), i.selectedNodes.map(Cs)) && Ke(n.selectedEdges.map(Cs), i.selectedEdges.map(Cs));
}
function xN({ onSelectionChange: n }) {
  const i = Je(), { selectedNodes: l, selectedEdges: r } = ze(vN, bN);
  return ee.useEffect(() => {
    const s = { nodes: l, edges: r };
    n?.(s), i.getState().onSelectionChangeHandlers.forEach((c) => c(s));
  }, [l, r, n]), null;
}
const wN = (n) => !!n.onSelectionChangeHandlers;
function SN({ onSelectionChange: n }) {
  const i = ze(wN);
  return n || i ? b.jsx(xN, { onSelectionChange: n }) : null;
}
const Ov = [0, 0], EN = { x: 0, y: 0, zoom: 1 }, _N = [
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
], w0 = [..._N, "rfId"], NN = (n) => ({
  setNodes: n.setNodes,
  setEdges: n.setEdges,
  setMinZoom: n.setMinZoom,
  setMaxZoom: n.setMaxZoom,
  setTranslateExtent: n.setTranslateExtent,
  setNodeExtent: n.setNodeExtent,
  reset: n.reset,
  setDefaultNodesAndEdges: n.setDefaultNodesAndEdges
}), S0 = {
  /*
   * these are values that are also passed directly to other components
   * than the StoreUpdater. We can reduce the number of setStore calls
   * by setting the same values here as prev fields.
   */
  translateExtent: Ol,
  nodeOrigin: Ov,
  minZoom: 0.5,
  maxZoom: 2,
  elementsSelectable: !0,
  noPanClassName: "nopan",
  rfId: "1"
};
function CN(n) {
  const { setNodes: i, setEdges: l, setMinZoom: r, setMaxZoom: s, setTranslateExtent: c, setNodeExtent: f, reset: h, setDefaultNodesAndEdges: g } = ze(NN, Ke), p = Je();
  ee.useEffect(() => (g(n.defaultNodes, n.defaultEdges), () => {
    y.current = S0, h();
  }), []);
  const y = ee.useRef(S0);
  return ee.useEffect(
    () => {
      for (const m of w0) {
        const v = n[m], x = y.current[m];
        v !== x && (typeof n[m] > "u" || (m === "nodes" ? i(v) : m === "edges" ? l(v) : m === "minZoom" ? r(v) : m === "maxZoom" ? s(v) : m === "translateExtent" ? c(v) : m === "nodeExtent" ? f(v) : m === "ariaLabelConfig" ? p.setState({ ariaLabelConfig: r2(v) }) : m === "fitView" ? p.setState({ fitViewQueued: v }) : m === "fitViewOptions" ? p.setState({ fitViewOptions: v }) : p.setState({ [m]: v })));
      }
      y.current = n;
    },
    // Only re-run the effect if one of the fields we track changes
    w0.map((m) => n[m])
  ), null;
}
function E0() {
  return typeof window > "u" || !window.matchMedia ? null : window.matchMedia("(prefers-color-scheme: dark)");
}
function MN(n) {
  const [i, l] = ee.useState(n === "system" ? null : n);
  return ee.useEffect(() => {
    if (n !== "system") {
      l(n);
      return;
    }
    const r = E0(), s = () => l(r?.matches ? "dark" : "light");
    return s(), r?.addEventListener("change", s), () => {
      r?.removeEventListener("change", s);
    };
  }, [n]), i !== null ? i : E0()?.matches ? "dark" : "light";
}
const _0 = typeof document < "u" ? document : null;
function Hl(n = null, i = { target: _0, actInsideInputWithModifier: !0 }) {
  const [l, r] = ee.useState(!1), s = ee.useRef(!1), c = ee.useRef(/* @__PURE__ */ new Set([])), [f, h] = ee.useMemo(() => {
    if (n !== null) {
      const p = (Array.isArray(n) ? n : [n]).filter((m) => typeof m == "string").map((m) => m.replace("+", `
`).replace(`

`, `
+`).split(`
`)), y = p.reduce((m, v) => m.concat(...v), []);
      return [p, y];
    }
    return [[], []];
  }, [n]);
  return ee.useEffect(() => {
    const g = i?.target ?? _0, p = i?.actInsideInputWithModifier ?? !0;
    if (n !== null) {
      const y = (x) => {
        if (s.current = x.ctrlKey || x.metaKey || x.shiftKey || x.altKey, (!s.current || s.current && !p) && fv(x))
          return !1;
        const C = C0(x.code, h);
        if (c.current.add(x[C]), N0(f, c.current, !1)) {
          const T = x.composedPath?.()?.[0] || x.target, A = T?.nodeName === "BUTTON" || T?.nodeName === "A";
          i.preventDefault !== !1 && (s.current || !A) && x.preventDefault(), r(!0);
        }
      }, m = (x) => {
        const S = C0(x.code, h);
        N0(f, c.current, !0) ? (r(!1), c.current.clear()) : c.current.delete(x[S]), x.key === "Meta" && c.current.clear(), s.current = !1;
      }, v = () => {
        c.current.clear(), r(!1);
      };
      return g?.addEventListener("keydown", y), g?.addEventListener("keyup", m), window.addEventListener("blur", v), window.addEventListener("contextmenu", v), () => {
        g?.removeEventListener("keydown", y), g?.removeEventListener("keyup", m), window.removeEventListener("blur", v), window.removeEventListener("contextmenu", v);
      };
    }
  }, [n, r]), l;
}
function N0(n, i, l) {
  return n.filter((r) => l || r.length === i.size).some((r) => r.every((s) => i.has(s)));
}
function C0(n, i) {
  return i.includes(n) ? "code" : "key";
}
const TN = () => {
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
      const { width: r, height: s, minZoom: c, maxZoom: f, panZoom: h } = n.getState(), g = jd(i, r, s, c, f, l?.padding ?? 0.1);
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
      const { x: h, y: g } = f.getBoundingClientRect(), p = {
        x: i.x - h,
        y: i.y - g
      }, y = l.snapGrid ?? s, m = l.snapToGrid ?? c;
      return ql(p, r, m, y);
    },
    flowToScreenPosition: (i) => {
      const { transform: l, domNode: r } = n.getState();
      if (!r)
        return i;
      const { x: s, y: c } = r.getBoundingClientRect(), f = Ks(i, l);
      return {
        x: f.x + s,
        y: f.y + c
      };
    }
  }), []);
};
function zv(n, i) {
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
      jN(g, h);
    l.push(h);
  }
  return s.length && s.forEach((c) => {
    c.index !== void 0 ? l.splice(c.index, 0, { ...c.item }) : l.push({ ...c.item });
  }), l;
}
function jN(n, i) {
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
function Rv(n, i) {
  return zv(n, i);
}
function kv(n, i) {
  return zv(n, i);
}
function oi(n, i) {
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
    !(c.selected === void 0 && !f) && c.selected !== f && (l && (c.selected = f), r.push(oi(c.id, f)));
  }
  return r;
}
function M0({ items: n = [], lookup: i }) {
  const l = [], r = new Map(n.map((s) => [s.id, s]));
  for (const [s, c] of n.entries()) {
    const f = i.get(c.id), h = f?.internals?.userNode ?? f;
    h !== void 0 && h !== c && l.push({ id: c.id, item: c, type: "replace" }), h === void 0 && l.push({ item: c, type: "add", index: s });
  }
  for (const [s] of i)
    r.get(s) === void 0 && l.push({ id: s, type: "remove" });
  return l;
}
function T0(n) {
  return {
    id: n.id,
    type: "remove"
  };
}
const j0 = (n) => W_(n), AN = (n) => av(n);
function Hv(n) {
  return ee.forwardRef(n);
}
const DN = typeof window < "u" ? ee.useLayoutEffect : ee.useEffect;
function A0(n) {
  const [i, l] = ee.useState(BigInt(0)), [r] = ee.useState(() => ON(() => l((s) => s + BigInt(1))));
  return DN(() => {
    const s = r.get();
    s.length && (n(s), r.reset());
  }, [i]), r;
}
function ON(n) {
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
const Bv = ee.createContext(null);
function zN({ children: n }) {
  const i = Je(), l = ee.useCallback((h) => {
    const { nodes: g = [], setNodes: p, hasDefaultNodes: y, onNodesChange: m, nodeLookup: v, fitViewQueued: x, onNodesChangeMiddlewareMap: S } = i.getState();
    let C = g;
    for (const A of h)
      C = typeof A == "function" ? A(C) : A;
    let T = M0({
      items: C,
      lookup: v
    });
    for (const A of S.values())
      T = A(T);
    y && p(C), T.length > 0 ? m?.(T) : x && window.requestAnimationFrame(() => {
      const { fitViewQueued: A, nodes: D, setNodes: E } = i.getState();
      A && E(D);
    });
  }, []), r = A0(l), s = ee.useCallback((h) => {
    const { edges: g = [], setEdges: p, hasDefaultEdges: y, onEdgesChange: m, edgeLookup: v } = i.getState();
    let x = g;
    for (const S of h)
      x = typeof S == "function" ? S(x) : S;
    y ? p(x) : m && m(M0({
      items: x,
      lookup: v
    }));
  }, []), c = A0(s), f = ee.useMemo(() => ({ nodeQueue: r, edgeQueue: c }), []);
  return b.jsx(Bv.Provider, { value: f, children: n });
}
function RN() {
  const n = ee.useContext(Bv);
  if (!n)
    throw new Error("useBatchContext must be used within a BatchProvider");
  return n;
}
const kN = (n) => !!n.panZoom;
function cu() {
  const n = TN(), i = Je(), l = RN(), r = ze(kN), s = ee.useMemo(() => {
    const c = (m) => i.getState().nodeLookup.get(m), f = (m) => {
      l.nodeQueue.push(m);
    }, h = (m) => {
      l.edgeQueue.push(m);
    }, g = (m) => {
      const { nodeLookup: v, nodeOrigin: x } = i.getState(), S = j0(m) ? m : v.get(m.id), C = S.parentId ? uv(S.position, S.measured, S.parentId, v, x) : S.position, T = {
        ...S,
        position: C,
        width: S.measured?.width ?? S.width,
        height: S.measured?.height ?? S.height
      };
      return po(T);
    }, p = (m, v, x = { replace: !1 }) => {
      f((S) => S.map((C) => {
        if (C.id === m) {
          const T = typeof v == "function" ? v(C) : v;
          return x.replace && j0(T) ? T : { ...C, ...T };
        }
        return C;
      }));
    }, y = (m, v, x = { replace: !1 }) => {
      h((S) => S.map((C) => {
        if (C.id === m) {
          const T = typeof v == "function" ? v(C) : v;
          return x.replace && AN(T) ? T : { ...C, ...T };
        }
        return C;
      }));
    };
    return {
      getNodes: () => i.getState().nodes.map((m) => ({ ...m })),
      getNode: (m) => c(m)?.internals.userNode,
      getInternalNode: c,
      getEdges: () => {
        const { edges: m = [] } = i.getState();
        return m.map((v) => ({ ...v }));
      },
      getEdge: (m) => i.getState().edgeLookup.get(m),
      setNodes: f,
      setEdges: h,
      addNodes: (m) => {
        const v = Array.isArray(m) ? m : [m];
        l.nodeQueue.push((x) => [...x, ...v]);
      },
      addEdges: (m) => {
        const v = Array.isArray(m) ? m : [m];
        l.edgeQueue.push((x) => [...x, ...v]);
      },
      toObject: () => {
        const { nodes: m = [], edges: v = [], transform: x } = i.getState(), [S, C, T] = x;
        return {
          nodes: m.map((A) => ({ ...A })),
          edges: v.map((A) => ({ ...A })),
          viewport: {
            x: S,
            y: C,
            zoom: T
          }
        };
      },
      deleteElements: async ({ nodes: m = [], edges: v = [] }) => {
        const { nodes: x, edges: S, onNodesDelete: C, onEdgesDelete: T, triggerNodeChanges: A, triggerEdgeChanges: D, onDelete: E, onBeforeDelete: M } = i.getState(), { nodes: H, edges: U } = await n2({
          nodesToRemove: m,
          edgesToRemove: v,
          nodes: x,
          edges: S,
          onBeforeDelete: M
        }), Y = U.length > 0, X = H.length > 0;
        if (Y) {
          const te = U.map(T0);
          T?.(U), D(te);
        }
        if (X) {
          const te = H.map(T0);
          C?.(H), A(te);
        }
        return (X || Y) && E?.({ nodes: H, edges: U }), { deletedNodes: H, deletedEdges: U };
      },
      /**
       * Partial is defined as "the 2 nodes/areas are intersecting partially".
       * If a is contained in b or b is contained in a, they are both
       * considered fully intersecting.
       */
      getIntersectingNodes: (m, v = !0, x) => {
        const S = Pp(m), C = S ? m : g(m), T = x !== void 0;
        return C ? (x || i.getState().nodes).filter((A) => {
          const D = i.getState().nodeLookup.get(A.id);
          if (D && !S && (A.id === m.id || !D.internals.positionAbsolute))
            return !1;
          const E = po(T ? A : D), M = Rl(E, C);
          return v && M > 0 || M >= E.width * E.height || M >= C.width * C.height;
        }) : [];
      },
      isNodeIntersecting: (m, v, x = !0) => {
        const C = Pp(m) ? m : g(m);
        if (!C)
          return !1;
        const T = Rl(C, v);
        return x && T > 0 || T >= v.width * v.height || T >= C.width * C.height;
      },
      updateNode: p,
      updateNodeData: (m, v, x = { replace: !1 }) => {
        p(m, (S) => {
          const C = typeof v == "function" ? v(S) : v;
          return x.replace ? { ...S, data: C } : { ...S, data: { ...S.data, ...C } };
        }, x);
      },
      updateEdge: y,
      updateEdgeData: (m, v, x = { replace: !1 }) => {
        y(m, (S) => {
          const C = typeof v == "function" ? v(S) : v;
          return x.replace ? { ...S, data: C } : { ...S, data: { ...S.data, ...C } };
        }, x);
      },
      getNodesBounds: (m) => {
        const { nodeLookup: v, nodeOrigin: x } = i.getState();
        return F_(m, { nodeLookup: v, nodeOrigin: x });
      },
      getHandleConnections: ({ type: m, id: v, nodeId: x }) => Array.from(i.getState().connectionLookup.get(`${x}-${m}${v ? `-${v}` : ""}`)?.values() ?? []),
      getNodeConnections: ({ type: m, handleId: v, nodeId: x }) => Array.from(i.getState().connectionLookup.get(`${x}${m ? v ? `-${m}-${v}` : `-${m}` : ""}`)?.values() ?? []),
      fitView: async (m) => {
        const v = i.getState().fitViewResolver ?? l2();
        return i.setState({ fitViewQueued: !0, fitViewOptions: m, fitViewResolver: v }), l.nodeQueue.push((x) => [...x]), v.promise;
      }
    };
  }, []);
  return ee.useMemo(() => ({
    ...s,
    ...n,
    viewportInitialized: r
  }), [r]);
}
const D0 = (n) => n.selected, HN = typeof window < "u" ? window : void 0;
function BN({ deleteKeyCode: n, multiSelectionKeyCode: i }) {
  const l = Je(), { deleteElements: r } = cu(), s = Hl(n, { actInsideInputWithModifier: !1 }), c = Hl(i, { target: HN });
  ee.useEffect(() => {
    if (s) {
      const { edges: f, nodes: h } = l.getState();
      r({ nodes: h.filter(D0), edges: f.filter(D0) }), l.setState({ nodesSelectionActive: !1 });
    }
  }, [s]), ee.useEffect(() => {
    l.setState({ multiSelectionActive: c });
  }, [c]);
}
function LN(n) {
  const i = Je();
  ee.useEffect(() => {
    const l = () => {
      if (!n.current || !(n.current.checkVisibility?.() ?? !0))
        return !1;
      const r = Ad(n.current);
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
const fu = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
}, UN = (n) => ({
  userSelectionActive: n.userSelectionActive,
  lib: n.lib,
  connectionInProgress: n.connection.inProgress
});
function VN({ onPaneContextMenu: n, zoomOnScroll: i = !0, zoomOnPinch: l = !0, panOnScroll: r = !1, panOnScrollSpeed: s = 0.5, panOnScrollMode: c = fi.Free, zoomOnDoubleClick: f = !0, panOnDrag: h = !0, defaultViewport: g, translateExtent: p, minZoom: y, maxZoom: m, zoomActivationKeyCode: v, preventScrolling: x = !0, children: S, noWheelClassName: C, noPanClassName: T, onViewportChange: A, isControlledViewport: D, paneClickDistance: E, selectionOnDrag: M }) {
  const H = Je(), U = ee.useRef(null), { userSelectionActive: Y, lib: X, connectionInProgress: te } = ze(UN, Ke), K = Hl(v), V = ee.useRef();
  LN(U);
  const Q = ee.useCallback((J) => {
    A?.({ x: J[0], y: J[1], zoom: J[2] }), D || H.setState({ transform: J });
  }, [A, D]);
  return ee.useEffect(() => {
    if (U.current) {
      V.current = q2({
        domNode: U.current,
        minZoom: y,
        maxZoom: m,
        translateExtent: p,
        viewport: g,
        onDraggingChange: (_) => H.setState((k) => k.paneDragging === _ ? k : { paneDragging: _ }),
        onPanZoomStart: (_, k) => {
          const { onViewportChangeStart: B, onMoveStart: Z } = H.getState();
          Z?.(_, k), B?.(k);
        },
        onPanZoom: (_, k) => {
          const { onViewportChange: B, onMove: Z } = H.getState();
          Z?.(_, k), B?.(k);
        },
        onPanZoomEnd: (_, k) => {
          const { onViewportChangeEnd: B, onMoveEnd: Z } = H.getState();
          Z?.(_, k), B?.(k);
        }
      });
      const { x: J, y: N, zoom: L } = V.current.getViewport();
      return H.setState({
        panZoom: V.current,
        transform: [J, N, L],
        domNode: U.current.closest(".react-flow")
      }), () => {
        V.current?.destroy();
      };
    }
  }, []), ee.useEffect(() => {
    V.current?.update({
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
      noPanClassName: T,
      userSelectionActive: Y,
      noWheelClassName: C,
      lib: X,
      onTransformChange: Q,
      connectionInProgress: te,
      selectionOnDrag: M,
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
    T,
    Y,
    C,
    X,
    Q,
    te,
    M,
    E
  ]), b.jsx("div", { className: "react-flow__renderer", ref: U, style: fu, children: S });
}
const YN = (n) => ({
  userSelectionActive: n.userSelectionActive,
  userSelectionRect: n.userSelectionRect
});
function IN() {
  const { userSelectionActive: n, userSelectionRect: i } = ze(YN, Ke);
  return n && i ? b.jsx("div", { className: "react-flow__selection react-flow__container", style: {
    width: i.width,
    height: i.height,
    transform: `translate(${i.x}px, ${i.y}px)`
  } }) : null;
}
const Kf = (n, i) => (l) => {
  l.target === i.current && n?.(l);
}, qN = (n) => ({
  userSelectionActive: n.userSelectionActive,
  elementsSelectable: n.elementsSelectable,
  connectionInProgress: n.connection.inProgress,
  dragging: n.paneDragging
});
function XN({ isSelecting: n, selectionKeyPressed: i, selectionMode: l = zl.Full, panOnDrag: r, paneClickDistance: s, selectionOnDrag: c, onSelectionStart: f, onSelectionEnd: h, onPaneClick: g, onPaneContextMenu: p, onPaneScroll: y, onPaneMouseEnter: m, onPaneMouseMove: v, onPaneMouseLeave: x, children: S }) {
  const C = Je(), { userSelectionActive: T, elementsSelectable: A, dragging: D, connectionInProgress: E } = ze(qN, Ke), M = A && (n || T), H = ee.useRef(null), U = ee.useRef(), Y = ee.useRef(/* @__PURE__ */ new Set()), X = ee.useRef(/* @__PURE__ */ new Set()), te = ee.useRef(!1), K = (B) => {
    if (te.current || E) {
      te.current = !1;
      return;
    }
    g?.(B), C.getState().resetSelectedElements(), C.setState({ nodesSelectionActive: !1 });
  }, V = (B) => {
    if (Array.isArray(r) && r?.includes(2)) {
      B.preventDefault();
      return;
    }
    p?.(B);
  }, Q = y ? (B) => y(B) : void 0, J = (B) => {
    te.current && (B.stopPropagation(), te.current = !1);
  }, N = (B) => {
    const { domNode: Z } = C.getState();
    if (U.current = Z?.getBoundingClientRect(), !U.current)
      return;
    const I = B.target === H.current;
    if (!I && !!B.target.closest(".nokey") || !n || !(c && I || i) || B.button !== 0 || !B.isPrimary)
      return;
    B.target?.setPointerCapture?.(B.pointerId), te.current = !1;
    const { x: G, y: R } = un(B.nativeEvent, U.current);
    C.setState({
      userSelectionRect: {
        width: 0,
        height: 0,
        startX: G,
        startY: R,
        x: G,
        y: R
      }
    }), I || (B.stopPropagation(), B.preventDefault());
  }, L = (B) => {
    const { userSelectionRect: Z, transform: I, nodeLookup: j, edgeLookup: q, connectionLookup: G, triggerNodeChanges: R, triggerEdgeChanges: O, defaultEdgeOptions: $, resetSelectedElements: W } = C.getState();
    if (!U.current || !Z)
      return;
    const { x: P, y: ie } = un(B.nativeEvent, U.current), { startX: de, startY: he } = Z;
    if (!te.current) {
      const De = i ? 0 : s;
      if (Math.hypot(P - de, ie - he) <= De)
        return;
      W(), f?.(B);
    }
    te.current = !0;
    const ge = {
      startX: de,
      startY: he,
      x: P < de ? P : de,
      y: ie < he ? ie : he,
      width: Math.abs(P - de),
      height: Math.abs(ie - he)
    }, xe = Y.current, Se = X.current;
    Y.current = new Set(Td(j, ge, I, l === zl.Partial, !0).map((De) => De.id)), X.current = /* @__PURE__ */ new Set();
    const _e = $?.selectable ?? !0;
    for (const De of Y.current) {
      const Pe = G.get(De);
      if (Pe)
        for (const { edgeId: Et } of Pe.values()) {
          const zt = q.get(Et);
          zt && (zt.selectable ?? _e) && X.current.add(Et);
        }
    }
    if (!e0(xe, Y.current)) {
      const De = so(j, Y.current, !0);
      R(De);
    }
    if (!e0(Se, X.current)) {
      const De = so(q, X.current);
      O(De);
    }
    C.setState({
      userSelectionRect: ge,
      userSelectionActive: !0,
      nodesSelectionActive: !1
    });
  }, _ = (B) => {
    B.button === 0 && (B.target?.releasePointerCapture?.(B.pointerId), !T && B.target === H.current && C.getState().userSelectionRect && K?.(B), C.setState({
      userSelectionActive: !1,
      userSelectionRect: null
    }), te.current && (h?.(B), C.setState({
      nodesSelectionActive: Y.current.size > 0
    })));
  }, k = r === !0 || Array.isArray(r) && r.includes(0);
  return b.jsxs("div", { className: ut(["react-flow__pane", { draggable: k, dragging: D, selection: n }]), onClick: M ? void 0 : Kf(K, H), onContextMenu: Kf(V, H), onWheel: Kf(Q, H), onPointerEnter: M ? void 0 : m, onPointerMove: M ? L : v, onPointerUp: M ? _ : void 0, onPointerDownCapture: M ? N : void 0, onClickCapture: M ? J : void 0, onPointerLeave: x, ref: H, style: fu, children: [S, b.jsx(IN, {})] });
}
function gd({ id: n, store: i, unselect: l = !1, nodeRef: r }) {
  const { addSelectedNodes: s, unselectNodesAndEdges: c, multiSelectionActive: f, nodeLookup: h, onError: g } = i.getState(), p = h.get(n);
  if (!p) {
    g?.("012", wn.error012(n));
    return;
  }
  i.setState({ nodesSelectionActive: !1 }), p.selected ? (l || p.selected && f) && (c({ nodes: [p], edges: [] }), requestAnimationFrame(() => r?.current?.blur())) : s([n]);
}
function Lv({ nodeRef: n, disabled: i = !1, noDragClassName: l, handleSelector: r, nodeId: s, isSelectable: c, nodeClickDistance: f }) {
  const h = Je(), [g, p] = ee.useState(!1), y = ee.useRef();
  return ee.useEffect(() => {
    y.current = j2({
      getStoreItems: () => h.getState(),
      onNodeMouseDown: (m) => {
        gd({
          id: m,
          store: h,
          nodeRef: n
        });
      },
      onDragStart: () => {
        p(!0);
      },
      onDragStop: () => {
        p(!1);
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
const GN = (n) => (i) => i.selected && (i.draggable || n && typeof i.draggable > "u");
function Uv() {
  const n = Je();
  return ee.useCallback((l) => {
    const { nodeExtent: r, snapToGrid: s, snapGrid: c, nodesDraggable: f, onError: h, updateNodePositions: g, nodeLookup: p, nodeOrigin: y } = n.getState(), m = /* @__PURE__ */ new Map(), v = GN(f), x = s ? c[0] : 5, S = s ? c[1] : 5, C = l.direction.x * x * l.factor, T = l.direction.y * S * l.factor;
    for (const [, A] of p) {
      if (!v(A))
        continue;
      let D = {
        x: A.internals.positionAbsolute.x + C,
        y: A.internals.positionAbsolute.y + T
      };
      s && (D = Il(D, c));
      const { position: E, positionAbsolute: M } = iv({
        nodeId: A.id,
        nextPosition: D,
        nodeLookup: p,
        nodeExtent: r,
        nodeOrigin: y,
        onError: h
      });
      A.position = E, A.internals.positionAbsolute = M, m.set(A.id, A);
    }
    g(m);
  }, []);
}
const Bd = ee.createContext(null), ZN = Bd.Provider;
Bd.Consumer;
const Vv = () => ee.useContext(Bd), $N = (n) => ({
  connectOnClick: n.connectOnClick,
  noPanClassName: n.noPanClassName,
  rfId: n.rfId
}), QN = (n, i, l) => (r) => {
  const { connectionClickStartHandle: s, connectionMode: c, connection: f } = r, { fromHandle: h, toHandle: g, isValid: p } = f, y = g?.nodeId === n && g?.id === i && g?.type === l;
  return {
    connectingFrom: h?.nodeId === n && h?.id === i && h?.type === l,
    connectingTo: y,
    clickConnecting: s?.nodeId === n && s?.id === i && s?.type === l,
    isPossibleEndHandle: c === go.Strict ? h?.type !== l : n !== h?.nodeId || i !== h?.id,
    connectionInProcess: !!h,
    clickConnectionInProcess: !!s,
    valid: y && p
  };
};
function KN({ type: n = "source", position: i = ye.Top, isValidConnection: l, isConnectable: r = !0, isConnectableStart: s = !0, isConnectableEnd: c = !0, id: f, onConnect: h, children: g, className: p, onMouseDown: y, onTouchStart: m, ...v }, x) {
  const S = f || null, C = n === "target", T = Je(), A = Vv(), { connectOnClick: D, noPanClassName: E, rfId: M } = ze($N, Ke), { connectingFrom: H, connectingTo: U, clickConnecting: Y, isPossibleEndHandle: X, connectionInProcess: te, clickConnectionInProcess: K, valid: V } = ze(QN(A, S, n), Ke);
  A || T.getState().onError?.("010", wn.error010());
  const Q = (L) => {
    const { defaultEdgeOptions: _, onConnect: k, hasDefaultEdges: B } = T.getState(), Z = {
      ..._,
      ...L
    };
    if (B) {
      const { edges: I, setEdges: j } = T.getState();
      j(h2(Z, I));
    }
    k?.(Z), h?.(Z);
  }, J = (L) => {
    if (!A)
      return;
    const _ = dv(L.nativeEvent);
    if (s && (_ && L.button === 0 || !_)) {
      const k = T.getState();
      hd.onPointerDown(L.nativeEvent, {
        handleDomNode: L.currentTarget,
        autoPanOnConnect: k.autoPanOnConnect,
        connectionMode: k.connectionMode,
        connectionRadius: k.connectionRadius,
        domNode: k.domNode,
        nodeLookup: k.nodeLookup,
        lib: k.lib,
        isTarget: C,
        handleId: S,
        nodeId: A,
        flowId: k.rfId,
        panBy: k.panBy,
        cancelConnection: k.cancelConnection,
        onConnectStart: k.onConnectStart,
        onConnectEnd: (...B) => T.getState().onConnectEnd?.(...B),
        updateConnection: k.updateConnection,
        onConnect: Q,
        isValidConnection: l || ((...B) => T.getState().isValidConnection?.(...B) ?? !0),
        getTransform: () => T.getState().transform,
        getFromHandle: () => T.getState().connection.fromHandle,
        autoPanSpeed: k.autoPanSpeed,
        dragThreshold: k.connectionDragThreshold
      });
    }
    _ ? y?.(L) : m?.(L);
  }, N = (L) => {
    const { onClickConnectStart: _, onClickConnectEnd: k, connectionClickStartHandle: B, connectionMode: Z, isValidConnection: I, lib: j, rfId: q, nodeLookup: G, connection: R } = T.getState();
    if (!A || !B && !s)
      return;
    if (!B) {
      _?.(L.nativeEvent, { nodeId: A, handleId: S, handleType: n }), T.setState({ connectionClickStartHandle: { nodeId: A, type: n, id: S } });
      return;
    }
    const O = cv(L.target), $ = l || I, { connection: W, isValid: P } = hd.isValid(L.nativeEvent, {
      handle: {
        nodeId: A,
        id: S,
        type: n
      },
      connectionMode: Z,
      fromNodeId: B.nodeId,
      fromHandleId: B.id || null,
      fromType: B.type,
      isValidConnection: $,
      flowId: q,
      doc: O,
      lib: j,
      nodeLookup: G
    });
    P && W && Q(W);
    const ie = structuredClone(R);
    delete ie.inProgress, ie.toPosition = ie.toHandle ? ie.toHandle.position : null, k?.(L, ie), T.setState({ connectionClickStartHandle: null });
  };
  return b.jsx("div", { "data-handleid": S, "data-nodeid": A, "data-handlepos": i, "data-id": `${M}-${A}-${S}-${n}`, className: ut([
    "react-flow__handle",
    `react-flow__handle-${i}`,
    "nodrag",
    E,
    p,
    {
      source: !C,
      target: C,
      connectable: r,
      connectablestart: s,
      connectableend: c,
      clickconnecting: Y,
      connectingfrom: H,
      connectingto: U,
      valid: V,
      /*
       * shows where you can start a connection from
       * and where you can end it while connecting
       */
      connectionindicator: r && (!te || X) && (te || K ? c : s)
    }
  ]), onMouseDown: J, onTouchStart: J, onClick: D ? N : void 0, ref: x, ...v, children: g });
}
const bo = ee.memo(Hv(KN));
function JN({ data: n, isConnectable: i, sourcePosition: l = ye.Bottom }) {
  return b.jsxs(b.Fragment, { children: [n?.label, b.jsx(bo, { type: "source", position: l, isConnectable: i })] });
}
function WN({ data: n, isConnectable: i, targetPosition: l = ye.Top, sourcePosition: r = ye.Bottom }) {
  return b.jsxs(b.Fragment, { children: [b.jsx(bo, { type: "target", position: l, isConnectable: i }), n?.label, b.jsx(bo, { type: "source", position: r, isConnectable: i })] });
}
function FN() {
  return null;
}
function PN({ data: n, isConnectable: i, targetPosition: l = ye.Top }) {
  return b.jsxs(b.Fragment, { children: [b.jsx(bo, { type: "target", position: l, isConnectable: i }), n?.label] });
}
const Js = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
}, O0 = {
  input: JN,
  default: WN,
  output: PN,
  group: FN
};
function eC(n) {
  return n.internals.handleBounds === void 0 ? {
    width: n.width ?? n.initialWidth ?? n.style?.width,
    height: n.height ?? n.initialHeight ?? n.style?.height
  } : {
    width: n.width ?? n.style?.width,
    height: n.height ?? n.style?.height
  };
}
const tC = (n) => {
  const { width: i, height: l, x: r, y: s } = Yl(n.nodeLookup, {
    filter: (c) => !!c.selected
  });
  return {
    width: sn(i) ? i : null,
    height: sn(l) ? l : null,
    userSelectionActive: n.userSelectionActive,
    transformString: `translate(${n.transform[0]}px,${n.transform[1]}px) scale(${n.transform[2]}) translate(${r}px,${s}px)`
  };
};
function nC({ onSelectionContextMenu: n, noPanClassName: i, disableKeyboardA11y: l }) {
  const r = Je(), { width: s, height: c, transformString: f, userSelectionActive: h } = ze(tC, Ke), g = Uv(), p = ee.useRef(null);
  ee.useEffect(() => {
    l || p.current?.focus({
      preventScroll: !0
    });
  }, [l]);
  const y = !h && s !== null && c !== null;
  if (Lv({
    nodeRef: p,
    disabled: !y
  }), !y)
    return null;
  const m = n ? (x) => {
    const S = r.getState().nodes.filter((C) => C.selected);
    n(x, S);
  } : void 0, v = (x) => {
    Object.prototype.hasOwnProperty.call(Js, x.key) && (x.preventDefault(), g({
      direction: Js[x.key],
      factor: x.shiftKey ? 4 : 1
    }));
  };
  return b.jsx("div", { className: ut(["react-flow__nodesselection", "react-flow__container", i]), style: {
    transform: f
  }, children: b.jsx("div", { ref: p, className: "react-flow__nodesselection-rect", onContextMenu: m, tabIndex: l ? void 0 : -1, onKeyDown: l ? void 0 : v, style: {
    width: s,
    height: c
  } }) });
}
const z0 = typeof window < "u" ? window : void 0, aC = (n) => ({ nodesSelectionActive: n.nodesSelectionActive, userSelectionActive: n.userSelectionActive });
function Yv({ children: n, onPaneClick: i, onPaneMouseEnter: l, onPaneMouseMove: r, onPaneMouseLeave: s, onPaneContextMenu: c, onPaneScroll: f, paneClickDistance: h, deleteKeyCode: g, selectionKeyCode: p, selectionOnDrag: y, selectionMode: m, onSelectionStart: v, onSelectionEnd: x, multiSelectionKeyCode: S, panActivationKeyCode: C, zoomActivationKeyCode: T, elementsSelectable: A, zoomOnScroll: D, zoomOnPinch: E, panOnScroll: M, panOnScrollSpeed: H, panOnScrollMode: U, zoomOnDoubleClick: Y, panOnDrag: X, defaultViewport: te, translateExtent: K, minZoom: V, maxZoom: Q, preventScrolling: J, onSelectionContextMenu: N, noWheelClassName: L, noPanClassName: _, disableKeyboardA11y: k, onViewportChange: B, isControlledViewport: Z }) {
  const { nodesSelectionActive: I, userSelectionActive: j } = ze(aC, Ke), q = Hl(p, { target: z0 }), G = Hl(C, { target: z0 }), R = G || X, O = G || M, $ = y && R !== !0, W = q || j || $;
  return BN({ deleteKeyCode: g, multiSelectionKeyCode: S }), b.jsx(VN, { onPaneContextMenu: c, elementsSelectable: A, zoomOnScroll: D, zoomOnPinch: E, panOnScroll: O, panOnScrollSpeed: H, panOnScrollMode: U, zoomOnDoubleClick: Y, panOnDrag: !q && R, defaultViewport: te, translateExtent: K, minZoom: V, maxZoom: Q, zoomActivationKeyCode: T, preventScrolling: J, noWheelClassName: L, noPanClassName: _, onViewportChange: B, isControlledViewport: Z, paneClickDistance: h, selectionOnDrag: $, children: b.jsxs(XN, { onSelectionStart: v, onSelectionEnd: x, onPaneClick: i, onPaneMouseEnter: l, onPaneMouseMove: r, onPaneMouseLeave: s, onPaneContextMenu: c, onPaneScroll: f, panOnDrag: R, isSelecting: !!W, selectionMode: m, selectionKeyPressed: q, paneClickDistance: h, selectionOnDrag: $, children: [n, I && b.jsx(nC, { onSelectionContextMenu: N, noPanClassName: _, disableKeyboardA11y: k })] }) });
}
Yv.displayName = "FlowRenderer";
const iC = ee.memo(Yv), oC = (n) => (i) => n ? Td(i.nodeLookup, { x: 0, y: 0, width: i.width, height: i.height }, i.transform, !0).map((l) => l.id) : Array.from(i.nodeLookup.keys());
function lC(n) {
  return ze(ee.useCallback(oC(n), [n]), Ke);
}
const rC = (n) => n.updateNodeInternals;
function sC() {
  const n = ze(rC), [i] = ee.useState(() => typeof ResizeObserver > "u" ? null : new ResizeObserver((l) => {
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
function uC({ node: n, nodeType: i, hasDimensions: l, resizeObserver: r }) {
  const s = Je(), c = ee.useRef(null), f = ee.useRef(null), h = ee.useRef(n.sourcePosition), g = ee.useRef(n.targetPosition), p = ee.useRef(i), y = l && !!n.internals.handleBounds;
  return ee.useEffect(() => {
    c.current && !n.hidden && (!y || f.current !== c.current) && (f.current && r?.unobserve(f.current), r?.observe(c.current), f.current = c.current);
  }, [y, n.hidden]), ee.useEffect(() => () => {
    f.current && (r?.unobserve(f.current), f.current = null);
  }, []), ee.useEffect(() => {
    if (c.current) {
      const m = p.current !== i, v = h.current !== n.sourcePosition, x = g.current !== n.targetPosition;
      (m || v || x) && (p.current = i, h.current = n.sourcePosition, g.current = n.targetPosition, s.getState().updateNodeInternals(/* @__PURE__ */ new Map([[n.id, { id: n.id, nodeElement: c.current, force: !0 }]])));
    }
  }, [n.id, i, n.sourcePosition, n.targetPosition]), c;
}
function cC({ id: n, onClick: i, onMouseEnter: l, onMouseMove: r, onMouseLeave: s, onContextMenu: c, onDoubleClick: f, nodesDraggable: h, elementsSelectable: g, nodesConnectable: p, nodesFocusable: y, resizeObserver: m, noDragClassName: v, noPanClassName: x, disableKeyboardA11y: S, rfId: C, nodeTypes: T, nodeClickDistance: A, onError: D }) {
  const { node: E, internals: M, isParent: H } = ze((P) => {
    const ie = P.nodeLookup.get(n), de = P.parentLookup.has(n);
    return {
      node: ie,
      internals: ie.internals,
      isParent: de
    };
  }, Ke);
  let U = E.type || "default", Y = T?.[U] || O0[U];
  Y === void 0 && (D?.("003", wn.error003(U)), U = "default", Y = T?.default || O0.default);
  const X = !!(E.draggable || h && typeof E.draggable > "u"), te = !!(E.selectable || g && typeof E.selectable > "u"), K = !!(E.connectable || p && typeof E.connectable > "u"), V = !!(E.focusable || y && typeof E.focusable > "u"), Q = Je(), J = sv(E), N = uC({ node: E, nodeType: U, hasDimensions: J, resizeObserver: m }), L = Lv({
    nodeRef: N,
    disabled: E.hidden || !X,
    noDragClassName: v,
    handleSelector: E.dragHandle,
    nodeId: n,
    isSelectable: te,
    nodeClickDistance: A
  }), _ = Uv();
  if (E.hidden)
    return null;
  const k = Fn(E), B = eC(E), Z = te || X || i || l || r || s, I = l ? (P) => l(P, { ...M.userNode }) : void 0, j = r ? (P) => r(P, { ...M.userNode }) : void 0, q = s ? (P) => s(P, { ...M.userNode }) : void 0, G = c ? (P) => c(P, { ...M.userNode }) : void 0, R = f ? (P) => f(P, { ...M.userNode }) : void 0, O = (P) => {
    const { selectNodesOnDrag: ie, nodeDragThreshold: de } = Q.getState();
    te && (!ie || !X || de > 0) && gd({
      id: n,
      store: Q,
      nodeRef: N
    }), i && i(P, { ...M.userNode });
  }, $ = (P) => {
    if (!(fv(P.nativeEvent) || S)) {
      if (Py.includes(P.key) && te) {
        const ie = P.key === "Escape";
        gd({
          id: n,
          store: Q,
          unselect: ie,
          nodeRef: N
        });
      } else if (X && E.selected && Object.prototype.hasOwnProperty.call(Js, P.key)) {
        P.preventDefault();
        const { ariaLabelConfig: ie } = Q.getState();
        Q.setState({
          ariaLiveMessage: ie["node.a11yDescription.ariaLiveMessage"]({
            direction: P.key.replace("Arrow", "").toLowerCase(),
            x: ~~M.positionAbsolute.x,
            y: ~~M.positionAbsolute.y
          })
        }), _({
          direction: Js[P.key],
          factor: P.shiftKey ? 4 : 1
        });
      }
    }
  }, W = () => {
    if (S || !N.current?.matches(":focus-visible"))
      return;
    const { transform: P, width: ie, height: de, autoPanOnNodeFocus: he, setCenter: ge } = Q.getState();
    if (!he)
      return;
    Td(/* @__PURE__ */ new Map([[n, E]]), { x: 0, y: 0, width: ie, height: de }, P, !0).length > 0 || ge(E.position.x + k.width / 2, E.position.y + k.height / 2, {
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
      parent: H,
      draggable: X,
      dragging: L
    }
  ]), ref: N, style: {
    zIndex: M.z,
    transform: `translate(${M.positionAbsolute.x}px,${M.positionAbsolute.y}px)`,
    pointerEvents: Z ? "all" : "none",
    visibility: J ? "visible" : "hidden",
    ...E.style,
    ...B
  }, "data-id": n, "data-testid": `rf__node-${n}`, onMouseEnter: I, onMouseMove: j, onMouseLeave: q, onContextMenu: G, onClick: O, onDoubleClick: R, onKeyDown: V ? $ : void 0, tabIndex: V ? 0 : void 0, onFocus: V ? W : void 0, role: E.ariaRole ?? (V ? "group" : void 0), "aria-roledescription": "node", "aria-describedby": S ? void 0 : `${Av}-${C}`, "aria-label": E.ariaLabel, ...E.domAttributes, children: b.jsx(ZN, { value: n, children: b.jsx(Y, { id: n, data: E.data, type: U, positionAbsoluteX: M.positionAbsolute.x, positionAbsoluteY: M.positionAbsolute.y, selected: E.selected ?? !1, selectable: te, draggable: X, deletable: E.deletable ?? !0, isConnectable: K, sourcePosition: E.sourcePosition, targetPosition: E.targetPosition, dragging: L, dragHandle: E.dragHandle, zIndex: M.z, parentId: E.parentId, ...k }) }) });
}
var fC = ee.memo(cC);
const dC = (n) => ({
  nodesDraggable: n.nodesDraggable,
  nodesConnectable: n.nodesConnectable,
  nodesFocusable: n.nodesFocusable,
  elementsSelectable: n.elementsSelectable,
  onError: n.onError
});
function Iv(n) {
  const { nodesDraggable: i, nodesConnectable: l, nodesFocusable: r, elementsSelectable: s, onError: c } = ze(dC, Ke), f = lC(n.onlyRenderVisibleElements), h = sC();
  return b.jsx("div", { className: "react-flow__nodes", style: fu, children: f.map((g) => (
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
    b.jsx(fC, { id: g, nodeTypes: n.nodeTypes, nodeExtent: n.nodeExtent, onClick: n.onNodeClick, onMouseEnter: n.onNodeMouseEnter, onMouseMove: n.onNodeMouseMove, onMouseLeave: n.onNodeMouseLeave, onContextMenu: n.onNodeContextMenu, onDoubleClick: n.onNodeDoubleClick, noDragClassName: n.noDragClassName, noPanClassName: n.noPanClassName, rfId: n.rfId, disableKeyboardA11y: n.disableKeyboardA11y, resizeObserver: h, nodesDraggable: i, nodesConnectable: l, nodesFocusable: r, elementsSelectable: s, nodeClickDistance: n.nodeClickDistance, onError: c }, g)
  )) });
}
Iv.displayName = "NodeRenderer";
const hC = ee.memo(Iv);
function gC(n) {
  return ze(ee.useCallback((l) => {
    if (!n)
      return l.edges.map((s) => s.id);
    const r = [];
    if (l.width && l.height)
      for (const s of l.edges) {
        const c = l.nodeLookup.get(s.source), f = l.nodeLookup.get(s.target);
        c && f && c2({
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
const mC = ({ color: n = "none", strokeWidth: i = 1 }) => {
  const l = {
    strokeWidth: i,
    ...n && { stroke: n }
  };
  return b.jsx("polyline", { className: "arrow", style: l, strokeLinecap: "round", fill: "none", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4" });
}, pC = ({ color: n = "none", strokeWidth: i = 1 }) => {
  const l = {
    strokeWidth: i,
    ...n && { stroke: n, fill: n }
  };
  return b.jsx("polyline", { className: "arrowclosed", style: l, strokeLinecap: "round", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4 -5,-4" });
}, R0 = {
  [$s.Arrow]: mC,
  [$s.ArrowClosed]: pC
};
function yC(n) {
  const i = Je();
  return ee.useMemo(() => Object.prototype.hasOwnProperty.call(R0, n) ? R0[n] : (i.getState().onError?.("009", wn.error009(n)), null), [n]);
}
const vC = ({ id: n, type: i, color: l, width: r = 12.5, height: s = 12.5, markerUnits: c = "strokeWidth", strokeWidth: f, orient: h = "auto-start-reverse" }) => {
  const g = yC(i);
  return g ? b.jsx("marker", { className: "react-flow__arrowhead", id: n, markerWidth: `${r}`, markerHeight: `${s}`, viewBox: "-10 -10 20 20", markerUnits: c, orient: h, refX: "0", refY: "0", children: b.jsx(g, { color: l, strokeWidth: f }) }) : null;
}, qv = ({ defaultColor: n, rfId: i }) => {
  const l = ze((c) => c.edges), r = ze((c) => c.defaultEdgeOptions), s = ee.useMemo(() => v2(l, {
    id: i,
    defaultColor: n,
    defaultMarkerStart: r?.markerStart,
    defaultMarkerEnd: r?.markerEnd
  }), [l, r, i, n]);
  return s.length ? b.jsx("svg", { className: "react-flow__marker", "aria-hidden": "true", children: b.jsx("defs", { children: s.map((c) => b.jsx(vC, { id: c.id, type: c.type, color: c.color, width: c.width, height: c.height, markerUnits: c.markerUnits, strokeWidth: c.strokeWidth, orient: c.orient }, c.id)) }) }) : null;
};
qv.displayName = "MarkerDefinitions";
var bC = ee.memo(qv);
function Xv({ x: n, y: i, label: l, labelStyle: r, labelShowBg: s = !0, labelBgStyle: c, labelBgPadding: f = [2, 4], labelBgBorderRadius: h = 2, children: g, className: p, ...y }) {
  const [m, v] = ee.useState({ x: 1, y: 0, width: 0, height: 0 }), x = ut(["react-flow__edge-textwrapper", p]), S = ee.useRef(null);
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
  }, [l]), l ? b.jsxs("g", { transform: `translate(${n - m.width / 2} ${i - m.height / 2})`, className: x, visibility: m.width ? "visible" : "hidden", ...y, children: [s && b.jsx("rect", { width: m.width + 2 * f[0], x: -f[0], y: -f[1], height: m.height + 2 * f[1], className: "react-flow__edge-textbg", style: c, rx: h, ry: h }), b.jsx("text", { className: "react-flow__edge-text", y: m.height / 2, dy: "0.3em", ref: S, style: r, children: l }), g] }) : null;
}
Xv.displayName = "EdgeText";
const xC = ee.memo(Xv);
function Xl({ path: n, labelX: i, labelY: l, label: r, labelStyle: s, labelShowBg: c, labelBgStyle: f, labelBgPadding: h, labelBgBorderRadius: g, interactionWidth: p = 20, ...y }) {
  return b.jsxs(b.Fragment, { children: [b.jsx("path", { ...y, d: n, fill: "none", className: ut(["react-flow__edge-path", y.className]) }), p ? b.jsx("path", { d: n, fill: "none", strokeOpacity: 0, strokeWidth: p, className: "react-flow__edge-interaction" }) : null, r && sn(i) && sn(l) ? b.jsx(xC, { x: i, y: l, label: r, labelStyle: s, labelShowBg: c, labelBgStyle: f, labelBgPadding: h, labelBgBorderRadius: g }) : null] });
}
function k0({ pos: n, x1: i, y1: l, x2: r, y2: s }) {
  return n === ye.Left || n === ye.Right ? [0.5 * (i + r), l] : [i, 0.5 * (l + s)];
}
function Gv({ sourceX: n, sourceY: i, sourcePosition: l = ye.Bottom, targetX: r, targetY: s, targetPosition: c = ye.Top }) {
  const [f, h] = k0({
    pos: l,
    x1: n,
    y1: i,
    x2: r,
    y2: s
  }), [g, p] = k0({
    pos: c,
    x1: r,
    y1: s,
    x2: n,
    y2: i
  }), [y, m, v, x] = hv({
    sourceX: n,
    sourceY: i,
    targetX: r,
    targetY: s,
    sourceControlX: f,
    sourceControlY: h,
    targetControlX: g,
    targetControlY: p
  });
  return [
    `M${n},${i} C${f},${h} ${g},${p} ${r},${s}`,
    y,
    m,
    v,
    x
  ];
}
function Zv(n) {
  return ee.memo(({ id: i, sourceX: l, sourceY: r, targetX: s, targetY: c, sourcePosition: f, targetPosition: h, label: g, labelStyle: p, labelShowBg: y, labelBgStyle: m, labelBgPadding: v, labelBgBorderRadius: x, style: S, markerEnd: C, markerStart: T, interactionWidth: A }) => {
    const [D, E, M] = Gv({
      sourceX: l,
      sourceY: r,
      sourcePosition: f,
      targetX: s,
      targetY: c,
      targetPosition: h
    }), H = n.isInternal ? void 0 : i;
    return b.jsx(Xl, { id: H, path: D, labelX: E, labelY: M, label: g, labelStyle: p, labelShowBg: y, labelBgStyle: m, labelBgPadding: v, labelBgBorderRadius: x, style: S, markerEnd: C, markerStart: T, interactionWidth: A });
  });
}
const wC = Zv({ isInternal: !1 }), $v = Zv({ isInternal: !0 });
wC.displayName = "SimpleBezierEdge";
$v.displayName = "SimpleBezierEdgeInternal";
function Qv(n) {
  return ee.memo(({ id: i, sourceX: l, sourceY: r, targetX: s, targetY: c, label: f, labelStyle: h, labelShowBg: g, labelBgStyle: p, labelBgPadding: y, labelBgBorderRadius: m, style: v, sourcePosition: x = ye.Bottom, targetPosition: S = ye.Top, markerEnd: C, markerStart: T, pathOptions: A, interactionWidth: D }) => {
    const [E, M, H] = cd({
      sourceX: l,
      sourceY: r,
      sourcePosition: x,
      targetX: s,
      targetY: c,
      targetPosition: S,
      borderRadius: A?.borderRadius,
      offset: A?.offset,
      stepPosition: A?.stepPosition
    }), U = n.isInternal ? void 0 : i;
    return b.jsx(Xl, { id: U, path: E, labelX: M, labelY: H, label: f, labelStyle: h, labelShowBg: g, labelBgStyle: p, labelBgPadding: y, labelBgBorderRadius: m, style: v, markerEnd: C, markerStart: T, interactionWidth: D });
  });
}
const Kv = Qv({ isInternal: !1 }), Jv = Qv({ isInternal: !0 });
Kv.displayName = "SmoothStepEdge";
Jv.displayName = "SmoothStepEdgeInternal";
function Wv(n) {
  return ee.memo(({ id: i, ...l }) => {
    const r = n.isInternal ? void 0 : i;
    return b.jsx(Kv, { ...l, id: r, pathOptions: ee.useMemo(() => ({ borderRadius: 0, offset: l.pathOptions?.offset }), [l.pathOptions?.offset]) });
  });
}
const SC = Wv({ isInternal: !1 }), Fv = Wv({ isInternal: !0 });
SC.displayName = "StepEdge";
Fv.displayName = "StepEdgeInternal";
function Pv(n) {
  return ee.memo(({ id: i, sourceX: l, sourceY: r, targetX: s, targetY: c, label: f, labelStyle: h, labelShowBg: g, labelBgStyle: p, labelBgPadding: y, labelBgBorderRadius: m, style: v, markerEnd: x, markerStart: S, interactionWidth: C }) => {
    const [T, A, D] = mv({ sourceX: l, sourceY: r, targetX: s, targetY: c }), E = n.isInternal ? void 0 : i;
    return b.jsx(Xl, { id: E, path: T, labelX: A, labelY: D, label: f, labelStyle: h, labelShowBg: g, labelBgStyle: p, labelBgPadding: y, labelBgBorderRadius: m, style: v, markerEnd: x, markerStart: S, interactionWidth: C });
  });
}
const EC = Pv({ isInternal: !1 }), eb = Pv({ isInternal: !0 });
EC.displayName = "StraightEdge";
eb.displayName = "StraightEdgeInternal";
function tb(n) {
  return ee.memo(({ id: i, sourceX: l, sourceY: r, targetX: s, targetY: c, sourcePosition: f = ye.Bottom, targetPosition: h = ye.Top, label: g, labelStyle: p, labelShowBg: y, labelBgStyle: m, labelBgPadding: v, labelBgBorderRadius: x, style: S, markerEnd: C, markerStart: T, pathOptions: A, interactionWidth: D }) => {
    const [E, M, H] = Dd({
      sourceX: l,
      sourceY: r,
      sourcePosition: f,
      targetX: s,
      targetY: c,
      targetPosition: h,
      curvature: A?.curvature
    }), U = n.isInternal ? void 0 : i;
    return b.jsx(Xl, { id: U, path: E, labelX: M, labelY: H, label: g, labelStyle: p, labelShowBg: y, labelBgStyle: m, labelBgPadding: v, labelBgBorderRadius: x, style: S, markerEnd: C, markerStart: T, interactionWidth: D });
  });
}
const _C = tb({ isInternal: !1 }), nb = tb({ isInternal: !0 });
_C.displayName = "BezierEdge";
nb.displayName = "BezierEdgeInternal";
const H0 = {
  default: nb,
  straight: eb,
  step: Fv,
  smoothstep: Jv,
  simplebezier: $v
}, B0 = {
  sourceX: null,
  sourceY: null,
  targetX: null,
  targetY: null,
  sourcePosition: null,
  targetPosition: null
}, NC = (n, i, l) => l === ye.Left ? n - i : l === ye.Right ? n + i : n, CC = (n, i, l) => l === ye.Top ? n - i : l === ye.Bottom ? n + i : n, L0 = "react-flow__edgeupdater";
function U0({ position: n, centerX: i, centerY: l, radius: r = 10, onMouseDown: s, onMouseEnter: c, onMouseOut: f, type: h }) {
  return b.jsx("circle", { onMouseDown: s, onMouseEnter: c, onMouseOut: f, className: ut([L0, `${L0}-${h}`]), cx: NC(i, r, n), cy: CC(l, r, n), r, stroke: "transparent", fill: "transparent" });
}
function MC({ isReconnectable: n, reconnectRadius: i, edge: l, sourceX: r, sourceY: s, targetX: c, targetY: f, sourcePosition: h, targetPosition: g, onReconnect: p, onReconnectStart: y, onReconnectEnd: m, setReconnecting: v, setUpdateHover: x }) {
  const S = Je(), C = (M, H) => {
    if (M.button !== 0)
      return;
    const { autoPanOnConnect: U, domNode: Y, connectionMode: X, connectionRadius: te, lib: K, onConnectStart: V, cancelConnection: Q, nodeLookup: J, rfId: N, panBy: L, updateConnection: _ } = S.getState(), k = H.type === "target", B = (j, q) => {
      v(!1), m?.(j, l, H.type, q);
    }, Z = (j) => p?.(l, j), I = (j, q) => {
      v(!0), y?.(M, l, H.type), V?.(j, q);
    };
    hd.onPointerDown(M.nativeEvent, {
      autoPanOnConnect: U,
      connectionMode: X,
      connectionRadius: te,
      domNode: Y,
      handleId: H.id,
      nodeId: H.nodeId,
      nodeLookup: J,
      isTarget: k,
      edgeUpdaterType: H.type,
      lib: K,
      flowId: N,
      cancelConnection: Q,
      panBy: L,
      isValidConnection: (...j) => S.getState().isValidConnection?.(...j) ?? !0,
      onConnect: Z,
      onConnectStart: I,
      onConnectEnd: (...j) => S.getState().onConnectEnd?.(...j),
      onReconnectEnd: B,
      updateConnection: _,
      getTransform: () => S.getState().transform,
      getFromHandle: () => S.getState().connection.fromHandle,
      dragThreshold: S.getState().connectionDragThreshold,
      handleDomNode: M.currentTarget
    });
  }, T = (M) => C(M, { nodeId: l.target, id: l.targetHandle ?? null, type: "target" }), A = (M) => C(M, { nodeId: l.source, id: l.sourceHandle ?? null, type: "source" }), D = () => x(!0), E = () => x(!1);
  return b.jsxs(b.Fragment, { children: [(n === !0 || n === "source") && b.jsx(U0, { position: h, centerX: r, centerY: s, radius: i, onMouseDown: T, onMouseEnter: D, onMouseOut: E, type: "source" }), (n === !0 || n === "target") && b.jsx(U0, { position: g, centerX: c, centerY: f, radius: i, onMouseDown: A, onMouseEnter: D, onMouseOut: E, type: "target" })] });
}
function TC({ id: n, edgesFocusable: i, edgesReconnectable: l, elementsSelectable: r, onClick: s, onDoubleClick: c, onContextMenu: f, onMouseEnter: h, onMouseMove: g, onMouseLeave: p, reconnectRadius: y, onReconnect: m, onReconnectStart: v, onReconnectEnd: x, rfId: S, edgeTypes: C, noPanClassName: T, onError: A, disableKeyboardA11y: D }) {
  let E = ze((ge) => ge.edgeLookup.get(n));
  const M = ze((ge) => ge.defaultEdgeOptions);
  E = M ? { ...M, ...E } : E;
  let H = E.type || "default", U = C?.[H] || H0[H];
  U === void 0 && (A?.("011", wn.error011(H)), H = "default", U = C?.default || H0.default);
  const Y = !!(E.focusable || i && typeof E.focusable > "u"), X = typeof m < "u" && (E.reconnectable || l && typeof E.reconnectable > "u"), te = !!(E.selectable || r && typeof E.selectable > "u"), K = ee.useRef(null), [V, Q] = ee.useState(!1), [J, N] = ee.useState(!1), L = Je(), { zIndex: _, sourceX: k, sourceY: B, targetX: Z, targetY: I, sourcePosition: j, targetPosition: q } = ze(ee.useCallback((ge) => {
    const xe = ge.nodeLookup.get(E.source), Se = ge.nodeLookup.get(E.target);
    if (!xe || !Se)
      return {
        zIndex: E.zIndex,
        ...B0
      };
    const _e = y2({
      id: n,
      sourceNode: xe,
      targetNode: Se,
      sourceHandle: E.sourceHandle || null,
      targetHandle: E.targetHandle || null,
      connectionMode: ge.connectionMode,
      onError: A
    });
    return {
      zIndex: u2({
        selected: E.selected,
        zIndex: E.zIndex,
        sourceNode: xe,
        targetNode: Se,
        elevateOnSelect: ge.elevateEdgesOnSelect,
        zIndexMode: ge.zIndexMode
      }),
      ..._e || B0
    };
  }, [E.source, E.target, E.sourceHandle, E.targetHandle, E.selected, E.zIndex]), Ke), G = ee.useMemo(() => E.markerStart ? `url('#${fd(E.markerStart, S)}')` : void 0, [E.markerStart, S]), R = ee.useMemo(() => E.markerEnd ? `url('#${fd(E.markerEnd, S)}')` : void 0, [E.markerEnd, S]);
  if (E.hidden || k === null || B === null || Z === null || I === null)
    return null;
  const O = (ge) => {
    const { addSelectedEdges: xe, unselectNodesAndEdges: Se, multiSelectionActive: _e } = L.getState();
    te && (L.setState({ nodesSelectionActive: !1 }), E.selected && _e ? (Se({ nodes: [], edges: [E] }), K.current?.blur()) : xe([n])), s && s(ge, E);
  }, $ = c ? (ge) => {
    c(ge, { ...E });
  } : void 0, W = f ? (ge) => {
    f(ge, { ...E });
  } : void 0, P = h ? (ge) => {
    h(ge, { ...E });
  } : void 0, ie = g ? (ge) => {
    g(ge, { ...E });
  } : void 0, de = p ? (ge) => {
    p(ge, { ...E });
  } : void 0, he = (ge) => {
    if (!D && Py.includes(ge.key) && te) {
      const { unselectNodesAndEdges: xe, addSelectedEdges: Se } = L.getState();
      ge.key === "Escape" ? (K.current?.blur(), xe({ edges: [E] })) : Se([n]);
    }
  };
  return b.jsx("svg", { style: { zIndex: _ }, children: b.jsxs("g", { className: ut([
    "react-flow__edge",
    `react-flow__edge-${H}`,
    E.className,
    T,
    {
      selected: E.selected,
      animated: E.animated,
      inactive: !te && !s,
      updating: V,
      selectable: te
    }
  ]), onClick: O, onDoubleClick: $, onContextMenu: W, onMouseEnter: P, onMouseMove: ie, onMouseLeave: de, onKeyDown: Y ? he : void 0, tabIndex: Y ? 0 : void 0, role: E.ariaRole ?? (Y ? "group" : "img"), "aria-roledescription": "edge", "data-id": n, "data-testid": `rf__edge-${n}`, "aria-label": E.ariaLabel === null ? void 0 : E.ariaLabel || `Edge from ${E.source} to ${E.target}`, "aria-describedby": Y ? `${Dv}-${S}` : void 0, ref: K, ...E.domAttributes, children: [!J && b.jsx(U, { id: n, source: E.source, target: E.target, type: E.type, selected: E.selected, animated: E.animated, selectable: te, deletable: E.deletable ?? !0, label: E.label, labelStyle: E.labelStyle, labelShowBg: E.labelShowBg, labelBgStyle: E.labelBgStyle, labelBgPadding: E.labelBgPadding, labelBgBorderRadius: E.labelBgBorderRadius, sourceX: k, sourceY: B, targetX: Z, targetY: I, sourcePosition: j, targetPosition: q, data: E.data, style: E.style, sourceHandleId: E.sourceHandle, targetHandleId: E.targetHandle, markerStart: G, markerEnd: R, pathOptions: "pathOptions" in E ? E.pathOptions : void 0, interactionWidth: E.interactionWidth }), X && b.jsx(MC, { edge: E, isReconnectable: X, reconnectRadius: y, onReconnect: m, onReconnectStart: v, onReconnectEnd: x, sourceX: k, sourceY: B, targetX: Z, targetY: I, sourcePosition: j, targetPosition: q, setUpdateHover: Q, setReconnecting: N })] }) });
}
var jC = ee.memo(TC);
const AC = (n) => ({
  edgesFocusable: n.edgesFocusable,
  edgesReconnectable: n.edgesReconnectable,
  elementsSelectable: n.elementsSelectable,
  connectionMode: n.connectionMode,
  onError: n.onError
});
function ab({ defaultMarkerColor: n, onlyRenderVisibleElements: i, rfId: l, edgeTypes: r, noPanClassName: s, onReconnect: c, onEdgeContextMenu: f, onEdgeMouseEnter: h, onEdgeMouseMove: g, onEdgeMouseLeave: p, onEdgeClick: y, reconnectRadius: m, onEdgeDoubleClick: v, onReconnectStart: x, onReconnectEnd: S, disableKeyboardA11y: C }) {
  const { edgesFocusable: T, edgesReconnectable: A, elementsSelectable: D, onError: E } = ze(AC, Ke), M = gC(i);
  return b.jsxs("div", { className: "react-flow__edges", children: [b.jsx(bC, { defaultColor: n, rfId: l }), M.map((H) => b.jsx(jC, { id: H, edgesFocusable: T, edgesReconnectable: A, elementsSelectable: D, noPanClassName: s, onReconnect: c, onContextMenu: f, onMouseEnter: h, onMouseMove: g, onMouseLeave: p, onClick: y, reconnectRadius: m, onDoubleClick: v, onReconnectStart: x, onReconnectEnd: S, rfId: l, onError: E, edgeTypes: r, disableKeyboardA11y: C }, H))] });
}
ab.displayName = "EdgeRenderer";
const DC = ee.memo(ab), OC = (n) => `translate(${n.transform[0]}px,${n.transform[1]}px) scale(${n.transform[2]})`;
function zC({ children: n }) {
  const i = ze(OC);
  return b.jsx("div", { className: "react-flow__viewport xyflow__viewport react-flow__container", style: { transform: i }, children: n });
}
function RC(n) {
  const i = cu(), l = ee.useRef(!1);
  ee.useEffect(() => {
    !l.current && i.viewportInitialized && n && (setTimeout(() => n(i), 1), l.current = !0);
  }, [n, i.viewportInitialized]);
}
const kC = (n) => n.panZoom?.syncViewport;
function HC(n) {
  const i = ze(kC), l = Je();
  return ee.useEffect(() => {
    n && (i?.(n), l.setState({ transform: [n.x, n.y, n.zoom] }));
  }, [n, i]), null;
}
function BC(n) {
  return n.connection.inProgress ? { ...n.connection, to: ql(n.connection.to, n.transform) } : { ...n.connection };
}
function LC(n) {
  return BC;
}
function UC(n) {
  const i = LC();
  return ze(i, Ke);
}
const VC = (n) => ({
  nodesConnectable: n.nodesConnectable,
  isValid: n.connection.isValid,
  inProgress: n.connection.inProgress,
  width: n.width,
  height: n.height
});
function YC({ containerStyle: n, style: i, type: l, component: r }) {
  const { nodesConnectable: s, width: c, height: f, isValid: h, inProgress: g } = ze(VC, Ke);
  return !(c && s && g) ? null : b.jsx("svg", { style: n, width: c, height: f, className: "react-flow__connectionline react-flow__container", children: b.jsx("g", { className: ut(["react-flow__connection", nv(h)]), children: b.jsx(ib, { style: i, type: l, CustomComponent: r, isValid: h }) }) });
}
const ib = ({ style: n, type: i = Da.Bezier, CustomComponent: l, isValid: r }) => {
  const { inProgress: s, from: c, fromNode: f, fromHandle: h, fromPosition: g, to: p, toNode: y, toHandle: m, toPosition: v, pointer: x } = UC();
  if (!s)
    return;
  if (l)
    return b.jsx(l, { connectionLineType: i, connectionLineStyle: n, fromNode: f, fromHandle: h, fromX: c.x, fromY: c.y, toX: p.x, toY: p.y, fromPosition: g, toPosition: v, connectionStatus: nv(r), toNode: y, toHandle: m, pointer: x });
  let S = "";
  const C = {
    sourceX: c.x,
    sourceY: c.y,
    sourcePosition: g,
    targetX: p.x,
    targetY: p.y,
    targetPosition: v
  };
  switch (i) {
    case Da.Bezier:
      [S] = Dd(C);
      break;
    case Da.SimpleBezier:
      [S] = Gv(C);
      break;
    case Da.Step:
      [S] = cd({
        ...C,
        borderRadius: 0
      });
      break;
    case Da.SmoothStep:
      [S] = cd(C);
      break;
    default:
      [S] = mv(C);
  }
  return b.jsx("path", { d: S, fill: "none", className: "react-flow__connection-path", style: n });
};
ib.displayName = "ConnectionLine";
const IC = {};
function V0(n = IC) {
  ee.useRef(n), Je(), ee.useEffect(() => {
  }, [n]);
}
function qC() {
  Je(), ee.useRef(!1), ee.useEffect(() => {
  }, []);
}
function ob({ nodeTypes: n, edgeTypes: i, onInit: l, onNodeClick: r, onEdgeClick: s, onNodeDoubleClick: c, onEdgeDoubleClick: f, onNodeMouseEnter: h, onNodeMouseMove: g, onNodeMouseLeave: p, onNodeContextMenu: y, onSelectionContextMenu: m, onSelectionStart: v, onSelectionEnd: x, connectionLineType: S, connectionLineStyle: C, connectionLineComponent: T, connectionLineContainerStyle: A, selectionKeyCode: D, selectionOnDrag: E, selectionMode: M, multiSelectionKeyCode: H, panActivationKeyCode: U, zoomActivationKeyCode: Y, deleteKeyCode: X, onlyRenderVisibleElements: te, elementsSelectable: K, defaultViewport: V, translateExtent: Q, minZoom: J, maxZoom: N, preventScrolling: L, defaultMarkerColor: _, zoomOnScroll: k, zoomOnPinch: B, panOnScroll: Z, panOnScrollSpeed: I, panOnScrollMode: j, zoomOnDoubleClick: q, panOnDrag: G, onPaneClick: R, onPaneMouseEnter: O, onPaneMouseMove: $, onPaneMouseLeave: W, onPaneScroll: P, onPaneContextMenu: ie, paneClickDistance: de, nodeClickDistance: he, onEdgeContextMenu: ge, onEdgeMouseEnter: xe, onEdgeMouseMove: Se, onEdgeMouseLeave: _e, reconnectRadius: De, onReconnect: Pe, onReconnectStart: Et, onReconnectEnd: zt, noDragClassName: en, noWheelClassName: En, noPanClassName: za, disableKeyboardA11y: Ra, nodeExtent: ht, rfId: pi, viewport: _n, onViewportChange: Pn }) {
  return V0(n), V0(i), qC(), RC(l), HC(_n), b.jsx(iC, { onPaneClick: R, onPaneMouseEnter: O, onPaneMouseMove: $, onPaneMouseLeave: W, onPaneContextMenu: ie, onPaneScroll: P, paneClickDistance: de, deleteKeyCode: X, selectionKeyCode: D, selectionOnDrag: E, selectionMode: M, onSelectionStart: v, onSelectionEnd: x, multiSelectionKeyCode: H, panActivationKeyCode: U, zoomActivationKeyCode: Y, elementsSelectable: K, zoomOnScroll: k, zoomOnPinch: B, zoomOnDoubleClick: q, panOnScroll: Z, panOnScrollSpeed: I, panOnScrollMode: j, panOnDrag: G, defaultViewport: V, translateExtent: Q, minZoom: J, maxZoom: N, onSelectionContextMenu: m, preventScrolling: L, noDragClassName: en, noWheelClassName: En, noPanClassName: za, disableKeyboardA11y: Ra, onViewportChange: Pn, isControlledViewport: !!_n, children: b.jsxs(zC, { children: [b.jsx(DC, { edgeTypes: i, onEdgeClick: s, onEdgeDoubleClick: f, onReconnect: Pe, onReconnectStart: Et, onReconnectEnd: zt, onlyRenderVisibleElements: te, onEdgeContextMenu: ge, onEdgeMouseEnter: xe, onEdgeMouseMove: Se, onEdgeMouseLeave: _e, reconnectRadius: De, defaultMarkerColor: _, noPanClassName: za, disableKeyboardA11y: Ra, rfId: pi }), b.jsx(YC, { style: C, type: S, component: T, containerStyle: A }), b.jsx("div", { className: "react-flow__edgelabel-renderer" }), b.jsx(hC, { nodeTypes: n, onNodeClick: r, onNodeDoubleClick: c, onNodeMouseEnter: h, onNodeMouseMove: g, onNodeMouseLeave: p, onNodeContextMenu: y, nodeClickDistance: he, onlyRenderVisibleElements: te, noPanClassName: za, noDragClassName: en, disableKeyboardA11y: Ra, nodeExtent: ht, rfId: pi }), b.jsx("div", { className: "react-flow__viewport-portal" })] }) });
}
ob.displayName = "GraphView";
const XC = ee.memo(ob), Y0 = ({ nodes: n, edges: i, defaultNodes: l, defaultEdges: r, width: s, height: c, fitView: f, fitViewOptions: h, minZoom: g = 0.5, maxZoom: p = 2, nodeOrigin: y, nodeExtent: m, zIndexMode: v = "basic" } = {}) => {
  const x = /* @__PURE__ */ new Map(), S = /* @__PURE__ */ new Map(), C = /* @__PURE__ */ new Map(), T = /* @__PURE__ */ new Map(), A = r ?? i ?? [], D = l ?? n ?? [], E = y ?? [0, 0], M = m ?? Ol;
  vv(C, T, A);
  const H = dd(D, x, S, {
    nodeOrigin: E,
    nodeExtent: M,
    zIndexMode: v
  });
  let U = [0, 0, 1];
  if (f && s && c) {
    const Y = Yl(x, {
      filter: (V) => !!((V.width || V.initialWidth) && (V.height || V.initialHeight))
    }), { x: X, y: te, zoom: K } = jd(Y, s, c, g, p, h?.padding ?? 0.1);
    U = [X, te, K];
  }
  return {
    rfId: "1",
    width: s ?? 0,
    height: c ?? 0,
    transform: U,
    nodes: D,
    nodesInitialized: H,
    nodeLookup: x,
    parentLookup: S,
    edges: A,
    edgeLookup: T,
    connectionLookup: C,
    onNodesChange: null,
    onEdgesChange: null,
    hasDefaultNodes: l !== void 0,
    hasDefaultEdges: r !== void 0,
    panZoom: null,
    minZoom: g,
    maxZoom: p,
    translateExtent: Ol,
    nodeExtent: M,
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
    connection: { ...tv },
    connectionClickStartHandle: null,
    connectOnClick: !0,
    ariaLiveMessage: "",
    autoPanOnConnect: !0,
    autoPanOnNodeDrag: !0,
    autoPanOnNodeFocus: !0,
    autoPanSpeed: 15,
    connectionRadius: 20,
    onError: a2,
    isValidConnection: void 0,
    onSelectionChangeHandlers: [],
    lib: "react",
    debug: !1,
    ariaLabelConfig: ev,
    zIndexMode: v,
    onNodesChangeMiddlewareMap: /* @__PURE__ */ new Map(),
    onEdgesChangeMiddlewareMap: /* @__PURE__ */ new Map()
  };
}, GC = ({ nodes: n, edges: i, defaultNodes: l, defaultEdges: r, width: s, height: c, fitView: f, fitViewOptions: h, minZoom: g, maxZoom: p, nodeOrigin: y, nodeExtent: m, zIndexMode: v }) => rN((x, S) => {
  async function C() {
    const { nodeLookup: T, panZoom: A, fitViewOptions: D, fitViewResolver: E, width: M, height: H, minZoom: U, maxZoom: Y } = S();
    A && (await t2({
      nodes: T,
      width: M,
      height: H,
      panZoom: A,
      minZoom: U,
      maxZoom: Y
    }, D), E?.resolve(!0), x({ fitViewResolver: null }));
  }
  return {
    ...Y0({
      nodes: n,
      edges: i,
      width: s,
      height: c,
      fitView: f,
      fitViewOptions: h,
      minZoom: g,
      maxZoom: p,
      nodeOrigin: y,
      nodeExtent: m,
      defaultNodes: l,
      defaultEdges: r,
      zIndexMode: v
    }),
    setNodes: (T) => {
      const { nodeLookup: A, parentLookup: D, nodeOrigin: E, elevateNodesOnSelect: M, fitViewQueued: H, zIndexMode: U } = S(), Y = dd(T, A, D, {
        nodeOrigin: E,
        nodeExtent: m,
        elevateNodesOnSelect: M,
        checkEquality: !0,
        zIndexMode: U
      });
      H && Y ? (C(), x({ nodes: T, nodesInitialized: Y, fitViewQueued: !1, fitViewOptions: void 0 })) : x({ nodes: T, nodesInitialized: Y });
    },
    setEdges: (T) => {
      const { connectionLookup: A, edgeLookup: D } = S();
      vv(A, D, T), x({ edges: T });
    },
    setDefaultNodesAndEdges: (T, A) => {
      if (T) {
        const { setNodes: D } = S();
        D(T), x({ hasDefaultNodes: !0 });
      }
      if (A) {
        const { setEdges: D } = S();
        D(A), x({ hasDefaultEdges: !0 });
      }
    },
    /*
     * Every node gets registerd at a ResizeObserver. Whenever a node
     * changes its dimensions, this function is called to measure the
     * new dimensions and update the nodes.
     */
    updateNodeInternals: (T) => {
      const { triggerNodeChanges: A, nodeLookup: D, parentLookup: E, domNode: M, nodeOrigin: H, nodeExtent: U, debug: Y, fitViewQueued: X, zIndexMode: te } = S(), { changes: K, updatedInternals: V } = N2(T, D, E, M, H, U, te);
      V && (w2(D, E, { nodeOrigin: H, nodeExtent: U, zIndexMode: te }), X ? (C(), x({ fitViewQueued: !1, fitViewOptions: void 0 })) : x({}), K?.length > 0 && (Y && console.log("React Flow: trigger node changes", K), A?.(K)));
    },
    updateNodePositions: (T, A = !1) => {
      const D = [];
      let E = [];
      const { nodeLookup: M, triggerNodeChanges: H, connection: U, updateConnection: Y, onNodesChangeMiddlewareMap: X } = S();
      for (const [te, K] of T) {
        const V = M.get(te), Q = !!(V?.expandParent && V?.parentId && K?.position), J = {
          id: te,
          type: "position",
          position: Q ? {
            x: Math.max(0, K.position.x),
            y: Math.max(0, K.position.y)
          } : K.position,
          dragging: A
        };
        if (V && U.inProgress && U.fromNode.id === V.id) {
          const N = mi(V, U.fromHandle, ye.Left, !0);
          Y({ ...U, from: N });
        }
        Q && V.parentId && D.push({
          id: te,
          parentId: V.parentId,
          rect: {
            ...K.internals.positionAbsolute,
            width: K.measured.width ?? 0,
            height: K.measured.height ?? 0
          }
        }), E.push(J);
      }
      if (D.length > 0) {
        const { parentLookup: te, nodeOrigin: K } = S(), V = Hd(D, M, te, K);
        E.push(...V);
      }
      for (const te of X.values())
        E = te(E);
      H(E);
    },
    triggerNodeChanges: (T) => {
      const { onNodesChange: A, setNodes: D, nodes: E, hasDefaultNodes: M, debug: H } = S();
      if (T?.length) {
        if (M) {
          const U = Rv(T, E);
          D(U);
        }
        H && console.log("React Flow: trigger node changes", T), A?.(T);
      }
    },
    triggerEdgeChanges: (T) => {
      const { onEdgesChange: A, setEdges: D, edges: E, hasDefaultEdges: M, debug: H } = S();
      if (T?.length) {
        if (M) {
          const U = kv(T, E);
          D(U);
        }
        H && console.log("React Flow: trigger edge changes", T), A?.(T);
      }
    },
    addSelectedNodes: (T) => {
      const { multiSelectionActive: A, edgeLookup: D, nodeLookup: E, triggerNodeChanges: M, triggerEdgeChanges: H } = S();
      if (A) {
        const U = T.map((Y) => oi(Y, !0));
        M(U);
        return;
      }
      M(so(E, /* @__PURE__ */ new Set([...T]), !0)), H(so(D));
    },
    addSelectedEdges: (T) => {
      const { multiSelectionActive: A, edgeLookup: D, nodeLookup: E, triggerNodeChanges: M, triggerEdgeChanges: H } = S();
      if (A) {
        const U = T.map((Y) => oi(Y, !0));
        H(U);
        return;
      }
      H(so(D, /* @__PURE__ */ new Set([...T]))), M(so(E, /* @__PURE__ */ new Set(), !0));
    },
    unselectNodesAndEdges: ({ nodes: T, edges: A } = {}) => {
      const { edges: D, nodes: E, nodeLookup: M, triggerNodeChanges: H, triggerEdgeChanges: U } = S(), Y = T || E, X = A || D, te = [];
      for (const V of Y) {
        if (!V.selected)
          continue;
        const Q = M.get(V.id);
        Q && (Q.selected = !1), te.push(oi(V.id, !1));
      }
      const K = [];
      for (const V of X)
        V.selected && K.push(oi(V.id, !1));
      H(te), U(K);
    },
    setMinZoom: (T) => {
      const { panZoom: A, maxZoom: D } = S();
      A?.setScaleExtent([T, D]), x({ minZoom: T });
    },
    setMaxZoom: (T) => {
      const { panZoom: A, minZoom: D } = S();
      A?.setScaleExtent([D, T]), x({ maxZoom: T });
    },
    setTranslateExtent: (T) => {
      S().panZoom?.setTranslateExtent(T), x({ translateExtent: T });
    },
    resetSelectedElements: () => {
      const { edges: T, nodes: A, triggerNodeChanges: D, triggerEdgeChanges: E, elementsSelectable: M } = S();
      if (!M)
        return;
      const H = A.reduce((Y, X) => X.selected ? [...Y, oi(X.id, !1)] : Y, []), U = T.reduce((Y, X) => X.selected ? [...Y, oi(X.id, !1)] : Y, []);
      D(H), E(U);
    },
    setNodeExtent: (T) => {
      const { nodes: A, nodeLookup: D, parentLookup: E, nodeOrigin: M, elevateNodesOnSelect: H, nodeExtent: U, zIndexMode: Y } = S();
      T[0][0] === U[0][0] && T[0][1] === U[0][1] && T[1][0] === U[1][0] && T[1][1] === U[1][1] || (dd(A, D, E, {
        nodeOrigin: M,
        nodeExtent: T,
        elevateNodesOnSelect: H,
        checkEquality: !1,
        zIndexMode: Y
      }), x({ nodeExtent: T }));
    },
    panBy: (T) => {
      const { transform: A, width: D, height: E, panZoom: M, translateExtent: H } = S();
      return C2({ delta: T, panZoom: M, transform: A, translateExtent: H, width: D, height: E });
    },
    setCenter: async (T, A, D) => {
      const { width: E, height: M, maxZoom: H, panZoom: U } = S();
      if (!U)
        return Promise.resolve(!1);
      const Y = typeof D?.zoom < "u" ? D.zoom : H;
      return await U.setViewport({
        x: E / 2 - T * Y,
        y: M / 2 - A * Y,
        zoom: Y
      }, { duration: D?.duration, ease: D?.ease, interpolate: D?.interpolate }), Promise.resolve(!0);
    },
    cancelConnection: () => {
      x({
        connection: { ...tv }
      });
    },
    updateConnection: (T) => {
      x({ connection: T });
    },
    reset: () => x({ ...Y0() })
  };
}, Object.is);
function lb({ initialNodes: n, initialEdges: i, defaultNodes: l, defaultEdges: r, initialWidth: s, initialHeight: c, initialMinZoom: f, initialMaxZoom: h, initialFitViewOptions: g, fitView: p, nodeOrigin: y, nodeExtent: m, zIndexMode: v, children: x }) {
  const [S] = ee.useState(() => GC({
    nodes: n,
    edges: i,
    defaultNodes: l,
    defaultEdges: r,
    width: s,
    height: c,
    fitView: p,
    minZoom: f,
    maxZoom: h,
    fitViewOptions: g,
    nodeOrigin: y,
    nodeExtent: m,
    zIndexMode: v
  }));
  return b.jsx(cN, { value: S, children: b.jsx(zN, { children: x }) });
}
function ZC({ children: n, nodes: i, edges: l, defaultNodes: r, defaultEdges: s, width: c, height: f, fitView: h, fitViewOptions: g, minZoom: p, maxZoom: y, nodeOrigin: m, nodeExtent: v, zIndexMode: x }) {
  return ee.useContext(su) ? b.jsx(b.Fragment, { children: n }) : b.jsx(lb, { initialNodes: i, initialEdges: l, defaultNodes: r, defaultEdges: s, initialWidth: c, initialHeight: f, fitView: h, initialFitViewOptions: g, initialMinZoom: p, initialMaxZoom: y, nodeOrigin: m, nodeExtent: v, zIndexMode: x, children: n });
}
const $C = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  zIndex: 0
};
function QC({ nodes: n, edges: i, defaultNodes: l, defaultEdges: r, className: s, nodeTypes: c, edgeTypes: f, onNodeClick: h, onEdgeClick: g, onInit: p, onMove: y, onMoveStart: m, onMoveEnd: v, onConnect: x, onConnectStart: S, onConnectEnd: C, onClickConnectStart: T, onClickConnectEnd: A, onNodeMouseEnter: D, onNodeMouseMove: E, onNodeMouseLeave: M, onNodeContextMenu: H, onNodeDoubleClick: U, onNodeDragStart: Y, onNodeDrag: X, onNodeDragStop: te, onNodesDelete: K, onEdgesDelete: V, onDelete: Q, onSelectionChange: J, onSelectionDragStart: N, onSelectionDrag: L, onSelectionDragStop: _, onSelectionContextMenu: k, onSelectionStart: B, onSelectionEnd: Z, onBeforeDelete: I, connectionMode: j, connectionLineType: q = Da.Bezier, connectionLineStyle: G, connectionLineComponent: R, connectionLineContainerStyle: O, deleteKeyCode: $ = "Backspace", selectionKeyCode: W = "Shift", selectionOnDrag: P = !1, selectionMode: ie = zl.Full, panActivationKeyCode: de = "Space", multiSelectionKeyCode: he = kl() ? "Meta" : "Control", zoomActivationKeyCode: ge = kl() ? "Meta" : "Control", snapToGrid: xe, snapGrid: Se, onlyRenderVisibleElements: _e = !1, selectNodesOnDrag: De, nodesDraggable: Pe, autoPanOnNodeFocus: Et, nodesConnectable: zt, nodesFocusable: en, nodeOrigin: En = Ov, edgesFocusable: za, edgesReconnectable: Ra, elementsSelectable: ht = !0, defaultViewport: pi = EN, minZoom: _n = 0.5, maxZoom: Pn = 2, translateExtent: ka = Ol, preventScrolling: du = !0, nodeExtent: yi, defaultMarkerColor: hu = "#b1b1b7", zoomOnScroll: gu = !0, zoomOnPinch: Ha = !0, panOnScroll: xt = !1, panOnScrollSpeed: dn = 0.5, panOnScrollMode: wt = fi.Free, zoomOnDoubleClick: mu = !0, panOnDrag: pu = !0, onPaneClick: yu, onPaneMouseEnter: vi, onPaneMouseMove: bi, onPaneMouseLeave: xi, onPaneScroll: Nn, onPaneContextMenu: wi, paneClickDistance: Ba = 1, nodeClickDistance: vu = 0, children: Gl, onReconnect: xo, onReconnectStart: La, onReconnectEnd: bu, onEdgeContextMenu: Zl, onEdgeDoubleClick: $l, onEdgeMouseEnter: Ql, onEdgeMouseMove: wo, onEdgeMouseLeave: So, reconnectRadius: Kl = 10, onNodesChange: Jl, onEdgesChange: hn, noDragClassName: ct = "nodrag", noWheelClassName: vt = "nowheel", noPanClassName: Cn = "nopan", fitView: Si, fitViewOptions: Wl, connectOnClick: xu, attributionPosition: Fl, proOptions: Ua, defaultEdgeOptions: Eo, elevateNodesOnSelect: ea = !0, elevateEdgesOnSelect: ta = !1, disableKeyboardA11y: na = !1, autoPanOnConnect: aa, autoPanOnNodeDrag: at, autoPanSpeed: Pl, connectionRadius: er, isValidConnection: Mn, onError: ia, style: wu, id: _o, nodeDragThreshold: tr, connectionDragThreshold: Su, viewport: Ei, onViewportChange: _i, width: tn, height: _t, colorMode: nr = "light", debug: Eu, onScroll: Ni, ariaLabelConfig: ar, zIndexMode: Va = "basic", ..._u }, Nt) {
  const Ya = _o || "1", ir = MN(nr), No = ee.useCallback((Tn) => {
    Tn.currentTarget.scrollTo({ top: 0, left: 0, behavior: "instant" }), Ni?.(Tn);
  }, [Ni]);
  return b.jsx("div", { "data-testid": "rf__wrapper", ..._u, onScroll: No, style: { ...wu, ...$C }, ref: Nt, className: ut(["react-flow", s, ir]), id: _o, role: "application", children: b.jsxs(ZC, { nodes: n, edges: i, width: tn, height: _t, fitView: Si, fitViewOptions: Wl, minZoom: _n, maxZoom: Pn, nodeOrigin: En, nodeExtent: yi, zIndexMode: Va, children: [b.jsx(XC, { onInit: p, onNodeClick: h, onEdgeClick: g, onNodeMouseEnter: D, onNodeMouseMove: E, onNodeMouseLeave: M, onNodeContextMenu: H, onNodeDoubleClick: U, nodeTypes: c, edgeTypes: f, connectionLineType: q, connectionLineStyle: G, connectionLineComponent: R, connectionLineContainerStyle: O, selectionKeyCode: W, selectionOnDrag: P, selectionMode: ie, deleteKeyCode: $, multiSelectionKeyCode: he, panActivationKeyCode: de, zoomActivationKeyCode: ge, onlyRenderVisibleElements: _e, defaultViewport: pi, translateExtent: ka, minZoom: _n, maxZoom: Pn, preventScrolling: du, zoomOnScroll: gu, zoomOnPinch: Ha, zoomOnDoubleClick: mu, panOnScroll: xt, panOnScrollSpeed: dn, panOnScrollMode: wt, panOnDrag: pu, onPaneClick: yu, onPaneMouseEnter: vi, onPaneMouseMove: bi, onPaneMouseLeave: xi, onPaneScroll: Nn, onPaneContextMenu: wi, paneClickDistance: Ba, nodeClickDistance: vu, onSelectionContextMenu: k, onSelectionStart: B, onSelectionEnd: Z, onReconnect: xo, onReconnectStart: La, onReconnectEnd: bu, onEdgeContextMenu: Zl, onEdgeDoubleClick: $l, onEdgeMouseEnter: Ql, onEdgeMouseMove: wo, onEdgeMouseLeave: So, reconnectRadius: Kl, defaultMarkerColor: hu, noDragClassName: ct, noWheelClassName: vt, noPanClassName: Cn, rfId: Ya, disableKeyboardA11y: na, nodeExtent: yi, viewport: Ei, onViewportChange: _i }), b.jsx(CN, { nodes: n, edges: i, defaultNodes: l, defaultEdges: r, onConnect: x, onConnectStart: S, onConnectEnd: C, onClickConnectStart: T, onClickConnectEnd: A, nodesDraggable: Pe, autoPanOnNodeFocus: Et, nodesConnectable: zt, nodesFocusable: en, edgesFocusable: za, edgesReconnectable: Ra, elementsSelectable: ht, elevateNodesOnSelect: ea, elevateEdgesOnSelect: ta, minZoom: _n, maxZoom: Pn, nodeExtent: yi, onNodesChange: Jl, onEdgesChange: hn, snapToGrid: xe, snapGrid: Se, connectionMode: j, translateExtent: ka, connectOnClick: xu, defaultEdgeOptions: Eo, fitView: Si, fitViewOptions: Wl, onNodesDelete: K, onEdgesDelete: V, onDelete: Q, onNodeDragStart: Y, onNodeDrag: X, onNodeDragStop: te, onSelectionDrag: L, onSelectionDragStart: N, onSelectionDragStop: _, onMove: y, onMoveStart: m, onMoveEnd: v, noPanClassName: Cn, nodeOrigin: En, rfId: Ya, autoPanOnConnect: aa, autoPanOnNodeDrag: at, autoPanSpeed: Pl, onError: ia, connectionRadius: er, isValidConnection: Mn, selectNodesOnDrag: De, nodeDragThreshold: tr, connectionDragThreshold: Su, onBeforeDelete: I, debug: Eu, ariaLabelConfig: ar, zIndexMode: Va }), b.jsx(SN, { onSelectionChange: J }), Gl, b.jsx(yN, { proOptions: Ua, position: Fl }), b.jsx(pN, { rfId: Ya, disableKeyboardA11y: na })] }) });
}
var KC = Hv(QC);
const JC = (n) => n.domNode?.querySelector(".react-flow__edgelabel-renderer");
function WC({ children: n }) {
  const i = ze(JC);
  return i ? uN.createPortal(n, i) : null;
}
function FC(n) {
  const [i, l] = ee.useState(n), r = ee.useCallback((s) => l((c) => Rv(s, c)), []);
  return [i, l, r];
}
function PC(n) {
  const [i, l] = ee.useState(n), r = ee.useCallback((s) => l((c) => kv(s, c)), []);
  return [i, l, r];
}
function eM({ dimensions: n, lineWidth: i, variant: l, className: r }) {
  return b.jsx("path", { strokeWidth: i, d: `M${n[0] / 2} 0 V${n[1]} M0 ${n[1] / 2} H${n[0]}`, className: ut(["react-flow__background-pattern", l, r]) });
}
function tM({ radius: n, className: i }) {
  return b.jsx("circle", { cx: n, cy: n, r: n, className: ut(["react-flow__background-pattern", "dots", i]) });
}
var Jn;
(function(n) {
  n.Lines = "lines", n.Dots = "dots", n.Cross = "cross";
})(Jn || (Jn = {}));
const nM = {
  [Jn.Dots]: 1,
  [Jn.Lines]: 1,
  [Jn.Cross]: 6
}, aM = (n) => ({ transform: n.transform, patternId: `pattern-${n.rfId}` });
function rb({
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
  className: p,
  patternClassName: y
}) {
  const m = ee.useRef(null), { transform: v, patternId: x } = ze(aM, Ke), S = r || nM[i], C = i === Jn.Dots, T = i === Jn.Cross, A = Array.isArray(l) ? l : [l, l], D = [A[0] * v[2] || 1, A[1] * v[2] || 1], E = S * v[2], M = Array.isArray(c) ? c : [c, c], H = T ? [E, E] : D, U = [
    M[0] * v[2] || 1 + H[0] / 2,
    M[1] * v[2] || 1 + H[1] / 2
  ], Y = `${x}${n || ""}`;
  return b.jsxs("svg", { className: ut(["react-flow__background", p]), style: {
    ...g,
    ...fu,
    "--xy-background-color-props": h,
    "--xy-background-pattern-color-props": f
  }, ref: m, "data-testid": "rf__background", children: [b.jsx("pattern", { id: Y, x: v[0] % D[0], y: v[1] % D[1], width: D[0], height: D[1], patternUnits: "userSpaceOnUse", patternTransform: `translate(-${U[0]},-${U[1]})`, children: C ? b.jsx(tM, { radius: E / 2, className: y }) : b.jsx(eM, { dimensions: H, lineWidth: s, variant: i, className: y }) }), b.jsx("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: `url(#${Y})` })] });
}
rb.displayName = "Background";
const iM = ee.memo(rb);
function oM() {
  return b.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", children: b.jsx("path", { d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" }) });
}
function lM() {
  return b.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 5", children: b.jsx("path", { d: "M0 0h32v4.2H0z" }) });
}
function rM() {
  return b.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 30", children: b.jsx("path", { d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" }) });
}
function sM() {
  return b.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: b.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z" }) });
}
function uM() {
  return b.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: b.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z" }) });
}
function Ms({ children: n, className: i, ...l }) {
  return b.jsx("button", { type: "button", className: ut(["react-flow__controls-button", i]), ...l, children: n });
}
const cM = (n) => ({
  isInteractive: n.nodesDraggable || n.nodesConnectable || n.elementsSelectable,
  minZoomReached: n.transform[2] <= n.minZoom,
  maxZoomReached: n.transform[2] >= n.maxZoom,
  ariaLabelConfig: n.ariaLabelConfig
});
function sb({ style: n, showZoom: i = !0, showFitView: l = !0, showInteractive: r = !0, fitViewOptions: s, onZoomIn: c, onZoomOut: f, onFitView: h, onInteractiveChange: g, className: p, children: y, position: m = "bottom-left", orientation: v = "vertical", "aria-label": x }) {
  const S = Je(), { isInteractive: C, minZoomReached: T, maxZoomReached: A, ariaLabelConfig: D } = ze(cM, Ke), { zoomIn: E, zoomOut: M, fitView: H } = cu(), U = () => {
    E(), c?.();
  }, Y = () => {
    M(), f?.();
  }, X = () => {
    H(s), h?.();
  }, te = () => {
    S.setState({
      nodesDraggable: !C,
      nodesConnectable: !C,
      elementsSelectable: !C
    }), g?.(!C);
  }, K = v === "horizontal" ? "horizontal" : "vertical";
  return b.jsxs(uu, { className: ut(["react-flow__controls", K, p]), position: m, style: n, "data-testid": "rf__controls", "aria-label": x ?? D["controls.ariaLabel"], children: [i && b.jsxs(b.Fragment, { children: [b.jsx(Ms, { onClick: U, className: "react-flow__controls-zoomin", title: D["controls.zoomIn.ariaLabel"], "aria-label": D["controls.zoomIn.ariaLabel"], disabled: A, children: b.jsx(oM, {}) }), b.jsx(Ms, { onClick: Y, className: "react-flow__controls-zoomout", title: D["controls.zoomOut.ariaLabel"], "aria-label": D["controls.zoomOut.ariaLabel"], disabled: T, children: b.jsx(lM, {}) })] }), l && b.jsx(Ms, { className: "react-flow__controls-fitview", onClick: X, title: D["controls.fitView.ariaLabel"], "aria-label": D["controls.fitView.ariaLabel"], children: b.jsx(rM, {}) }), r && b.jsx(Ms, { className: "react-flow__controls-interactive", onClick: te, title: D["controls.interactive.ariaLabel"], "aria-label": D["controls.interactive.ariaLabel"], children: C ? b.jsx(uM, {}) : b.jsx(sM, {}) }), y] });
}
sb.displayName = "Controls";
const fM = ee.memo(sb);
function dM({ id: n, x: i, y: l, width: r, height: s, style: c, color: f, strokeColor: h, strokeWidth: g, className: p, borderRadius: y, shapeRendering: m, selected: v, onClick: x }) {
  const { background: S, backgroundColor: C } = c || {}, T = f || S || C;
  return b.jsx("rect", { className: ut(["react-flow__minimap-node", { selected: v }, p]), x: i, y: l, rx: y, ry: y, width: r, height: s, style: {
    fill: T,
    stroke: h,
    strokeWidth: g
  }, shapeRendering: m, onClick: x ? (A) => x(A, n) : void 0 });
}
const hM = ee.memo(dM), gM = (n) => n.nodes.map((i) => i.id), Jf = (n) => n instanceof Function ? n : () => n;
function mM({
  nodeStrokeColor: n,
  nodeColor: i,
  nodeClassName: l = "",
  nodeBorderRadius: r = 5,
  nodeStrokeWidth: s,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: c = hM,
  onClick: f
}) {
  const h = ze(gM, Ke), g = Jf(i), p = Jf(n), y = Jf(l), m = typeof window > "u" || window.chrome ? "crispEdges" : "geometricPrecision";
  return b.jsx(b.Fragment, { children: h.map((v) => (
    /*
     * The split of responsibilities between MiniMapNodes and
     * NodeComponentWrapper may appear weird. However, it’s designed to
     * minimize the cost of updates when individual nodes change.
     *
     * For more details, see a similar commit in `NodeRenderer/index.tsx`.
     */
    b.jsx(yM, { id: v, nodeColorFunc: g, nodeStrokeColorFunc: p, nodeClassNameFunc: y, nodeBorderRadius: r, nodeStrokeWidth: s, NodeComponent: c, onClick: f, shapeRendering: m }, v)
  )) });
}
function pM({ id: n, nodeColorFunc: i, nodeStrokeColorFunc: l, nodeClassNameFunc: r, nodeBorderRadius: s, nodeStrokeWidth: c, shapeRendering: f, NodeComponent: h, onClick: g }) {
  const { node: p, x: y, y: m, width: v, height: x } = ze((S) => {
    const C = S.nodeLookup.get(n);
    if (!C)
      return { node: void 0, x: 0, y: 0, width: 0, height: 0 };
    const T = C.internals.userNode, { x: A, y: D } = C.internals.positionAbsolute, { width: E, height: M } = Fn(T);
    return {
      node: T,
      x: A,
      y: D,
      width: E,
      height: M
    };
  }, Ke);
  return !p || p.hidden || !sv(p) ? null : b.jsx(h, { x: y, y: m, width: v, height: x, style: p.style, selected: !!p.selected, className: r(p), color: i(p), borderRadius: s, strokeColor: l(p), strokeWidth: c, shapeRendering: f, onClick: g, id: p.id });
}
const yM = ee.memo(pM);
var vM = ee.memo(mM);
const bM = 200, xM = 150, wM = (n) => !n.hidden, SM = (n) => {
  const i = {
    x: -n.transform[0] / n.transform[2],
    y: -n.transform[1] / n.transform[2],
    width: n.width / n.transform[2],
    height: n.height / n.transform[2]
  };
  return {
    viewBB: i,
    boundingRect: n.nodeLookup.size > 0 ? rv(Yl(n.nodeLookup, { filter: wM }), i) : i,
    rfId: n.rfId,
    panZoom: n.panZoom,
    translateExtent: n.translateExtent,
    flowWidth: n.width,
    flowHeight: n.height,
    ariaLabelConfig: n.ariaLabelConfig
  };
}, EM = "react-flow__minimap-desc";
function ub({
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
  maskColor: p,
  maskStrokeColor: y,
  maskStrokeWidth: m,
  position: v = "bottom-right",
  onClick: x,
  onNodeClick: S,
  pannable: C = !1,
  zoomable: T = !1,
  ariaLabel: A,
  inversePan: D,
  zoomStep: E = 1,
  offsetScale: M = 5
}) {
  const H = Je(), U = ee.useRef(null), { boundingRect: Y, viewBB: X, rfId: te, panZoom: K, translateExtent: V, flowWidth: Q, flowHeight: J, ariaLabelConfig: N } = ze(SM, Ke), L = n?.width ?? bM, _ = n?.height ?? xM, k = Y.width / L, B = Y.height / _, Z = Math.max(k, B), I = Z * L, j = Z * _, q = M * Z, G = Y.x - (I - Y.width) / 2 - q, R = Y.y - (j - Y.height) / 2 - q, O = I + q * 2, $ = j + q * 2, W = `${EM}-${te}`, P = ee.useRef(0), ie = ee.useRef();
  P.current = Z, ee.useEffect(() => {
    if (U.current && K)
      return ie.current = k2({
        domNode: U.current,
        panZoom: K,
        getTransform: () => H.getState().transform,
        getViewScale: () => P.current
      }), () => {
        ie.current?.destroy();
      };
  }, [K]), ee.useEffect(() => {
    ie.current?.update({
      translateExtent: V,
      width: Q,
      height: J,
      inversePan: D,
      pannable: C,
      zoomStep: E,
      zoomable: T
    });
  }, [C, T, D, E, V, Q, J]);
  const de = x ? (xe) => {
    const [Se, _e] = ie.current?.pointer(xe) || [0, 0];
    x(xe, { x: Se, y: _e });
  } : void 0, he = S ? ee.useCallback((xe, Se) => {
    const _e = H.getState().nodeLookup.get(Se).internals.userNode;
    S(xe, _e);
  }, []) : void 0, ge = A ?? N["minimap.ariaLabel"];
  return b.jsx(uu, { position: v, style: {
    ...n,
    "--xy-minimap-background-color-props": typeof g == "string" ? g : void 0,
    "--xy-minimap-mask-background-color-props": typeof p == "string" ? p : void 0,
    "--xy-minimap-mask-stroke-color-props": typeof y == "string" ? y : void 0,
    "--xy-minimap-mask-stroke-width-props": typeof m == "number" ? m * Z : void 0,
    "--xy-minimap-node-background-color-props": typeof r == "string" ? r : void 0,
    "--xy-minimap-node-stroke-color-props": typeof l == "string" ? l : void 0,
    "--xy-minimap-node-stroke-width-props": typeof f == "number" ? f : void 0
  }, className: ut(["react-flow__minimap", i]), "data-testid": "rf__minimap", children: b.jsxs("svg", { width: L, height: _, viewBox: `${G} ${R} ${O} ${$}`, className: "react-flow__minimap-svg", role: "img", "aria-labelledby": W, ref: U, onClick: de, children: [ge && b.jsx("title", { id: W, children: ge }), b.jsx(vM, { onClick: he, nodeColor: r, nodeStrokeColor: l, nodeBorderRadius: c, nodeClassName: s, nodeStrokeWidth: f, nodeComponent: h }), b.jsx("path", { className: "react-flow__minimap-mask", d: `M${G - q},${R - q}h${O + q * 2}v${$ + q * 2}h${-O - q * 2}z
        M${X.x},${X.y}h${X.width}v${X.height}h${-X.width}z`, fillRule: "evenodd", pointerEvents: "none" })] }) });
}
ub.displayName = "MiniMap";
const _M = ee.memo(ub), NM = (n) => (i) => n ? `${Math.max(1 / i.transform[2], 1)}` : void 0, CM = {
  [vo.Line]: "right",
  [vo.Handle]: "bottom-right"
};
function MM({ nodeId: n, position: i, variant: l = vo.Handle, className: r, style: s = void 0, children: c, color: f, minWidth: h = 10, minHeight: g = 10, maxWidth: p = Number.MAX_VALUE, maxHeight: y = Number.MAX_VALUE, keepAspectRatio: m = !1, resizeDirection: v, autoScale: x = !0, shouldResize: S, onResizeStart: C, onResize: T, onResizeEnd: A }) {
  const D = Vv(), E = typeof n == "string" ? n : D, M = Je(), H = ee.useRef(null), U = l === vo.Handle, Y = ze(ee.useCallback(NM(U && x), [U, x]), Ke), X = ee.useRef(null), te = i ?? CM[l];
  ee.useEffect(() => {
    if (!(!H.current || !E))
      return X.current || (X.current = K2({
        domNode: H.current,
        nodeId: E,
        getStoreItems: () => {
          const { nodeLookup: V, transform: Q, snapGrid: J, snapToGrid: N, nodeOrigin: L, domNode: _ } = M.getState();
          return {
            nodeLookup: V,
            transform: Q,
            snapGrid: J,
            snapToGrid: N,
            nodeOrigin: L,
            paneDomNode: _
          };
        },
        onChange: (V, Q) => {
          const { triggerNodeChanges: J, nodeLookup: N, parentLookup: L, nodeOrigin: _ } = M.getState(), k = [], B = { x: V.x, y: V.y }, Z = N.get(E);
          if (Z && Z.expandParent && Z.parentId) {
            const I = Z.origin ?? _, j = V.width ?? Z.measured.width ?? 0, q = V.height ?? Z.measured.height ?? 0, G = {
              id: Z.id,
              parentId: Z.parentId,
              rect: {
                width: j,
                height: q,
                ...uv({
                  x: V.x ?? Z.position.x,
                  y: V.y ?? Z.position.y
                }, { width: j, height: q }, Z.parentId, N, I)
              }
            }, R = Hd([G], N, L, _);
            k.push(...R), B.x = V.x ? Math.max(I[0] * j, V.x) : void 0, B.y = V.y ? Math.max(I[1] * q, V.y) : void 0;
          }
          if (B.x !== void 0 && B.y !== void 0) {
            const I = {
              id: E,
              type: "position",
              position: { ...B }
            };
            k.push(I);
          }
          if (V.width !== void 0 && V.height !== void 0) {
            const j = {
              id: E,
              type: "dimensions",
              resizing: !0,
              setAttributes: v ? v === "horizontal" ? "width" : "height" : !0,
              dimensions: {
                width: V.width,
                height: V.height
              }
            };
            k.push(j);
          }
          for (const I of Q) {
            const j = {
              ...I,
              type: "position"
            };
            k.push(j);
          }
          J(k);
        },
        onEnd: ({ width: V, height: Q }) => {
          const J = {
            id: E,
            type: "dimensions",
            resizing: !1,
            dimensions: {
              width: V,
              height: Q
            }
          };
          M.getState().triggerNodeChanges([J]);
        }
      })), X.current.update({
        controlPosition: te,
        boundaries: {
          minWidth: h,
          minHeight: g,
          maxWidth: p,
          maxHeight: y
        },
        keepAspectRatio: m,
        resizeDirection: v,
        onResizeStart: C,
        onResize: T,
        onResizeEnd: A,
        shouldResize: S
      }), () => {
        X.current?.destroy();
      };
  }, [
    te,
    h,
    g,
    p,
    y,
    m,
    C,
    T,
    A,
    S
  ]);
  const K = te.split("-");
  return b.jsx("div", { className: ut(["react-flow__resize-control", "nodrag", ...K, l, r]), ref: H, style: {
    ...s,
    scale: Y,
    ...f && { [U ? "backgroundColor" : "borderColor"]: f }
  }, children: c });
}
ee.memo(MM);
var Ve = (n, i) => () => (i || n((i = { exports: {} }).exports, i), i.exports), cn = Ve((n, i) => {
  var l = Object.defineProperty, r = (J, N, L) => N in J ? l(J, N, { enumerable: !0, configurable: !0, writable: !0, value: L }) : J[N] = L, s = (J, N) => () => (N || J((N = { exports: {} }).exports, N), N.exports), c = (J, N, L) => r(J, typeof N != "symbol" ? N + "" : N, L), f = s((J, N) => {
    var L = "\0", _ = "\0", k = "", B = class {
      constructor(R) {
        c(this, "_isDirected", !0), c(this, "_isMultigraph", !1), c(this, "_isCompound", !1), c(this, "_label"), c(this, "_defaultNodeLabelFn", () => {
        }), c(this, "_defaultEdgeLabelFn", () => {
        }), c(this, "_nodes", {}), c(this, "_in", {}), c(this, "_preds", {}), c(this, "_out", {}), c(this, "_sucs", {}), c(this, "_edgeObjs", {}), c(this, "_edgeLabels", {}), c(this, "_nodeCount", 0), c(this, "_edgeCount", 0), c(this, "_parent"), c(this, "_children"), R && (this._isDirected = Object.hasOwn(R, "directed") ? R.directed : !0, this._isMultigraph = Object.hasOwn(R, "multigraph") ? R.multigraph : !1, this._isCompound = Object.hasOwn(R, "compound") ? R.compound : !1), this._isCompound && (this._parent = {}, this._children = {}, this._children[_] = {});
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
      setGraph(R) {
        return this._label = R, this;
      }
      graph() {
        return this._label;
      }
      setDefaultNodeLabel(R) {
        return this._defaultNodeLabelFn = R, typeof R != "function" && (this._defaultNodeLabelFn = () => R), this;
      }
      nodeCount() {
        return this._nodeCount;
      }
      nodes() {
        return Object.keys(this._nodes);
      }
      sources() {
        var R = this;
        return this.nodes().filter((O) => Object.keys(R._in[O]).length === 0);
      }
      sinks() {
        var R = this;
        return this.nodes().filter((O) => Object.keys(R._out[O]).length === 0);
      }
      setNodes(R, O) {
        var $ = arguments, W = this;
        return R.forEach(function(P) {
          $.length > 1 ? W.setNode(P, O) : W.setNode(P);
        }), this;
      }
      setNode(R, O) {
        return Object.hasOwn(this._nodes, R) ? (arguments.length > 1 && (this._nodes[R] = O), this) : (this._nodes[R] = arguments.length > 1 ? O : this._defaultNodeLabelFn(R), this._isCompound && (this._parent[R] = _, this._children[R] = {}, this._children[_][R] = !0), this._in[R] = {}, this._preds[R] = {}, this._out[R] = {}, this._sucs[R] = {}, ++this._nodeCount, this);
      }
      node(R) {
        return this._nodes[R];
      }
      hasNode(R) {
        return Object.hasOwn(this._nodes, R);
      }
      removeNode(R) {
        var O = this;
        if (Object.hasOwn(this._nodes, R)) {
          var $ = (W) => O.removeEdge(O._edgeObjs[W]);
          delete this._nodes[R], this._isCompound && (this._removeFromParentsChildList(R), delete this._parent[R], this.children(R).forEach(function(W) {
            O.setParent(W);
          }), delete this._children[R]), Object.keys(this._in[R]).forEach($), delete this._in[R], delete this._preds[R], Object.keys(this._out[R]).forEach($), delete this._out[R], delete this._sucs[R], --this._nodeCount;
        }
        return this;
      }
      setParent(R, O) {
        if (!this._isCompound) throw new Error("Cannot set parent in a non-compound graph");
        if (O === void 0) O = _;
        else {
          O += "";
          for (var $ = O; $ !== void 0; $ = this.parent($)) if ($ === R) throw new Error("Setting " + O + " as parent of " + R + " would create a cycle");
          this.setNode(O);
        }
        return this.setNode(R), this._removeFromParentsChildList(R), this._parent[R] = O, this._children[O][R] = !0, this;
      }
      _removeFromParentsChildList(R) {
        delete this._children[this._parent[R]][R];
      }
      parent(R) {
        if (this._isCompound) {
          var O = this._parent[R];
          if (O !== _) return O;
        }
      }
      children(R = _) {
        if (this._isCompound) {
          var O = this._children[R];
          if (O) return Object.keys(O);
        } else {
          if (R === _) return this.nodes();
          if (this.hasNode(R)) return [];
        }
      }
      predecessors(R) {
        var O = this._preds[R];
        if (O) return Object.keys(O);
      }
      successors(R) {
        var O = this._sucs[R];
        if (O) return Object.keys(O);
      }
      neighbors(R) {
        var O = this.predecessors(R);
        if (O) {
          let W = new Set(O);
          for (var $ of this.successors(R)) W.add($);
          return Array.from(W.values());
        }
      }
      isLeaf(R) {
        var O;
        return this.isDirected() ? O = this.successors(R) : O = this.neighbors(R), O.length === 0;
      }
      filterNodes(R) {
        var O = new this.constructor({ directed: this._isDirected, multigraph: this._isMultigraph, compound: this._isCompound });
        O.setGraph(this.graph());
        var $ = this;
        Object.entries(this._nodes).forEach(function([ie, de]) {
          R(ie) && O.setNode(ie, de);
        }), Object.values(this._edgeObjs).forEach(function(ie) {
          O.hasNode(ie.v) && O.hasNode(ie.w) && O.setEdge(ie, $.edge(ie));
        });
        var W = {};
        function P(ie) {
          var de = $.parent(ie);
          return de === void 0 || O.hasNode(de) ? (W[ie] = de, de) : de in W ? W[de] : P(de);
        }
        return this._isCompound && O.nodes().forEach((ie) => O.setParent(ie, P(ie))), O;
      }
      setDefaultEdgeLabel(R) {
        return this._defaultEdgeLabelFn = R, typeof R != "function" && (this._defaultEdgeLabelFn = () => R), this;
      }
      edgeCount() {
        return this._edgeCount;
      }
      edges() {
        return Object.values(this._edgeObjs);
      }
      setPath(R, O) {
        var $ = this, W = arguments;
        return R.reduce(function(P, ie) {
          return W.length > 1 ? $.setEdge(P, ie, O) : $.setEdge(P, ie), ie;
        }), this;
      }
      setEdge() {
        var R, O, $, W, P = !1, ie = arguments[0];
        typeof ie == "object" && ie !== null && "v" in ie ? (R = ie.v, O = ie.w, $ = ie.name, arguments.length === 2 && (W = arguments[1], P = !0)) : (R = ie, O = arguments[1], $ = arguments[3], arguments.length > 2 && (W = arguments[2], P = !0)), R = "" + R, O = "" + O, $ !== void 0 && ($ = "" + $);
        var de = j(this._isDirected, R, O, $);
        if (Object.hasOwn(this._edgeLabels, de)) return P && (this._edgeLabels[de] = W), this;
        if ($ !== void 0 && !this._isMultigraph) throw new Error("Cannot set a named edge when isMultigraph = false");
        this.setNode(R), this.setNode(O), this._edgeLabels[de] = P ? W : this._defaultEdgeLabelFn(R, O, $);
        var he = q(this._isDirected, R, O, $);
        return R = he.v, O = he.w, Object.freeze(he), this._edgeObjs[de] = he, Z(this._preds[O], R), Z(this._sucs[R], O), this._in[O][de] = he, this._out[R][de] = he, this._edgeCount++, this;
      }
      edge(R, O, $) {
        var W = arguments.length === 1 ? G(this._isDirected, arguments[0]) : j(this._isDirected, R, O, $);
        return this._edgeLabels[W];
      }
      edgeAsObj() {
        let R = this.edge(...arguments);
        return typeof R != "object" ? { label: R } : R;
      }
      hasEdge(R, O, $) {
        var W = arguments.length === 1 ? G(this._isDirected, arguments[0]) : j(this._isDirected, R, O, $);
        return Object.hasOwn(this._edgeLabels, W);
      }
      removeEdge(R, O, $) {
        var W = arguments.length === 1 ? G(this._isDirected, arguments[0]) : j(this._isDirected, R, O, $), P = this._edgeObjs[W];
        return P && (R = P.v, O = P.w, delete this._edgeLabels[W], delete this._edgeObjs[W], I(this._preds[O], R), I(this._sucs[R], O), delete this._in[O][W], delete this._out[R][W], this._edgeCount--), this;
      }
      inEdges(R, O) {
        return this.isDirected() ? this.filterEdges(this._in[R], R, O) : this.nodeEdges(R, O);
      }
      outEdges(R, O) {
        return this.isDirected() ? this.filterEdges(this._out[R], R, O) : this.nodeEdges(R, O);
      }
      nodeEdges(R, O) {
        if (R in this._nodes) return this.filterEdges({ ...this._in[R], ...this._out[R] }, R, O);
      }
      filterEdges(R, O, $) {
        if (R) {
          var W = Object.values(R);
          return $ ? W.filter(function(P) {
            return P.v === O && P.w === $ || P.v === $ && P.w === O;
          }) : W;
        }
      }
    };
    function Z(R, O) {
      R[O] ? R[O]++ : R[O] = 1;
    }
    function I(R, O) {
      --R[O] || delete R[O];
    }
    function j(R, O, $, W) {
      var P = "" + O, ie = "" + $;
      if (!R && P > ie) {
        var de = P;
        P = ie, ie = de;
      }
      return P + k + ie + k + (W === void 0 ? L : W);
    }
    function q(R, O, $, W) {
      var P = "" + O, ie = "" + $;
      if (!R && P > ie) {
        var de = P;
        P = ie, ie = de;
      }
      var he = { v: P, w: ie };
      return W && (he.name = W), he;
    }
    function G(R, O) {
      return j(R, O.v, O.w, O.name);
    }
    N.exports = B;
  }), h = s((J, N) => {
    N.exports = "3.0.2";
  }), g = s((J, N) => {
    N.exports = { Graph: f(), version: h() };
  }), p = s((J, N) => {
    var L = f();
    N.exports = { write: _, read: Z };
    function _(I) {
      var j = { options: { directed: I.isDirected(), multigraph: I.isMultigraph(), compound: I.isCompound() }, nodes: k(I), edges: B(I) };
      return I.graph() !== void 0 && (j.value = structuredClone(I.graph())), j;
    }
    function k(I) {
      return I.nodes().map(function(j) {
        var q = I.node(j), G = I.parent(j), R = { v: j };
        return q !== void 0 && (R.value = q), G !== void 0 && (R.parent = G), R;
      });
    }
    function B(I) {
      return I.edges().map(function(j) {
        var q = I.edge(j), G = { v: j.v, w: j.w };
        return j.name !== void 0 && (G.name = j.name), q !== void 0 && (G.value = q), G;
      });
    }
    function Z(I) {
      var j = new L(I.options).setGraph(I.value);
      return I.nodes.forEach(function(q) {
        j.setNode(q.v, q.value), q.parent && j.setParent(q.v, q.parent);
      }), I.edges.forEach(function(q) {
        j.setEdge({ v: q.v, w: q.w, name: q.name }, q.value);
      }), j;
    }
  }), y = s((J, N) => {
    N.exports = _;
    var L = () => 1;
    function _(B, Z, I, j) {
      return k(B, String(Z), I || L, j || function(q) {
        return B.outEdges(q);
      });
    }
    function k(B, Z, I, j) {
      var q = {}, G = !0, R = 0, O = B.nodes(), $ = function(de) {
        var he = I(de);
        q[de.v].distance + he < q[de.w].distance && (q[de.w] = { distance: q[de.v].distance + he, predecessor: de.v }, G = !0);
      }, W = function() {
        O.forEach(function(de) {
          j(de).forEach(function(he) {
            var ge = he.v === de ? he.v : he.w, xe = ge === he.v ? he.w : he.v;
            $({ v: ge, w: xe });
          });
        });
      };
      O.forEach(function(de) {
        var he = de === Z ? 0 : Number.POSITIVE_INFINITY;
        q[de] = { distance: he };
      });
      for (var P = O.length, ie = 1; ie < P && (G = !1, R++, W(), !!G); ie++) ;
      if (R === P - 1 && (G = !1, W(), G)) throw new Error("The graph contains a negative weight cycle");
      return q;
    }
  }), m = s((J, N) => {
    N.exports = L;
    function L(_) {
      var k = {}, B = [], Z;
      function I(j) {
        Object.hasOwn(k, j) || (k[j] = !0, Z.push(j), _.successors(j).forEach(I), _.predecessors(j).forEach(I));
      }
      return _.nodes().forEach(function(j) {
        Z = [], I(j), Z.length && B.push(Z);
      }), B;
    }
  }), v = s((J, N) => {
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
        var k = this._keyIndices[_];
        if (k !== void 0) return this._arr[k].priority;
      }
      min() {
        if (this.size() === 0) throw new Error("Queue underflow");
        return this._arr[0].key;
      }
      add(_, k) {
        var B = this._keyIndices;
        if (_ = String(_), !Object.hasOwn(B, _)) {
          var Z = this._arr, I = Z.length;
          return B[_] = I, Z.push({ key: _, priority: k }), this._decrease(I), !0;
        }
        return !1;
      }
      removeMin() {
        this._swap(0, this._arr.length - 1);
        var _ = this._arr.pop();
        return delete this._keyIndices[_.key], this._heapify(0), _.key;
      }
      decrease(_, k) {
        var B = this._keyIndices[_];
        if (k > this._arr[B].priority) throw new Error("New priority is greater than current priority. Key: " + _ + " Old: " + this._arr[B].priority + " New: " + k);
        this._arr[B].priority = k, this._decrease(B);
      }
      _heapify(_) {
        var k = this._arr, B = 2 * _, Z = B + 1, I = _;
        B < k.length && (I = k[B].priority < k[I].priority ? B : I, Z < k.length && (I = k[Z].priority < k[I].priority ? Z : I), I !== _ && (this._swap(_, I), this._heapify(I)));
      }
      _decrease(_) {
        for (var k = this._arr, B = k[_].priority, Z; _ !== 0 && (Z = _ >> 1, !(k[Z].priority < B)); ) this._swap(_, Z), _ = Z;
      }
      _swap(_, k) {
        var B = this._arr, Z = this._keyIndices, I = B[_], j = B[k];
        B[_] = j, B[k] = I, Z[j.key] = _, Z[I.key] = k;
      }
    };
    N.exports = L;
  }), x = s((J, N) => {
    var L = v();
    N.exports = k;
    var _ = () => 1;
    function k(Z, I, j, q) {
      var G = function(R) {
        return Z.outEdges(R);
      };
      return B(Z, String(I), j || _, q || G);
    }
    function B(Z, I, j, q) {
      var G = {}, R = new L(), O, $, W = function(P) {
        var ie = P.v !== O ? P.v : P.w, de = G[ie], he = j(P), ge = $.distance + he;
        if (he < 0) throw new Error("dijkstra does not allow negative edge weights. Bad edge: " + P + " Weight: " + he);
        ge < de.distance && (de.distance = ge, de.predecessor = O, R.decrease(ie, ge));
      };
      for (Z.nodes().forEach(function(P) {
        var ie = P === I ? 0 : Number.POSITIVE_INFINITY;
        G[P] = { distance: ie }, R.add(P, ie);
      }); R.size() > 0 && (O = R.removeMin(), $ = G[O], $.distance !== Number.POSITIVE_INFINITY); ) q(O).forEach(W);
      return G;
    }
  }), S = s((J, N) => {
    var L = x();
    N.exports = _;
    function _(k, B, Z) {
      return k.nodes().reduce(function(I, j) {
        return I[j] = L(k, j, B, Z), I;
      }, {});
    }
  }), C = s((J, N) => {
    N.exports = L;
    function L(k, B, Z) {
      if (k[B].predecessor !== void 0) throw new Error("Invalid source vertex");
      if (k[Z].predecessor === void 0 && Z !== B) throw new Error("Invalid destination vertex");
      return { weight: k[Z].distance, path: _(k, B, Z) };
    }
    function _(k, B, Z) {
      for (var I = [], j = Z; j !== B; ) I.push(j), j = k[j].predecessor;
      return I.push(B), I.reverse();
    }
  }), T = s((J, N) => {
    N.exports = L;
    function L(_) {
      var k = 0, B = [], Z = {}, I = [];
      function j(q) {
        var G = Z[q] = { onStack: !0, lowlink: k, index: k++ };
        if (B.push(q), _.successors(q).forEach(function($) {
          Object.hasOwn(Z, $) ? Z[$].onStack && (G.lowlink = Math.min(G.lowlink, Z[$].index)) : (j($), G.lowlink = Math.min(G.lowlink, Z[$].lowlink));
        }), G.lowlink === G.index) {
          var R = [], O;
          do
            O = B.pop(), Z[O].onStack = !1, R.push(O);
          while (q !== O);
          I.push(R);
        }
      }
      return _.nodes().forEach(function(q) {
        Object.hasOwn(Z, q) || j(q);
      }), I;
    }
  }), A = s((J, N) => {
    var L = T();
    N.exports = _;
    function _(k) {
      return L(k).filter(function(B) {
        return B.length > 1 || B.length === 1 && k.hasEdge(B[0], B[0]);
      });
    }
  }), D = s((J, N) => {
    N.exports = _;
    var L = () => 1;
    function _(B, Z, I) {
      return k(B, Z || L, I || function(j) {
        return B.outEdges(j);
      });
    }
    function k(B, Z, I) {
      var j = {}, q = B.nodes();
      return q.forEach(function(G) {
        j[G] = {}, j[G][G] = { distance: 0 }, q.forEach(function(R) {
          G !== R && (j[G][R] = { distance: Number.POSITIVE_INFINITY });
        }), I(G).forEach(function(R) {
          var O = R.v === G ? R.w : R.v, $ = Z(R);
          j[G][O] = { distance: $, predecessor: G };
        });
      }), q.forEach(function(G) {
        var R = j[G];
        q.forEach(function(O) {
          var $ = j[O];
          q.forEach(function(W) {
            var P = $[G], ie = R[W], de = $[W], he = P.distance + ie.distance;
            he < de.distance && (de.distance = he, de.predecessor = ie.predecessor);
          });
        });
      }), j;
    }
  }), E = s((J, N) => {
    function L(k) {
      var B = {}, Z = {}, I = [];
      function j(q) {
        if (Object.hasOwn(Z, q)) throw new _();
        Object.hasOwn(B, q) || (Z[q] = !0, B[q] = !0, k.predecessors(q).forEach(j), delete Z[q], I.push(q));
      }
      if (k.sinks().forEach(j), Object.keys(B).length !== k.nodeCount()) throw new _();
      return I;
    }
    var _ = class extends Error {
      constructor() {
        super(...arguments);
      }
    };
    N.exports = L, L.CycleException = _;
  }), M = s((J, N) => {
    var L = E();
    N.exports = _;
    function _(k) {
      try {
        L(k);
      } catch (B) {
        if (B instanceof L.CycleException) return !1;
        throw B;
      }
      return !0;
    }
  }), H = s((J, N) => {
    N.exports = L;
    function L(k, B, Z, I, j) {
      Array.isArray(B) || (B = [B]);
      var q = (k.isDirected() ? k.successors : k.neighbors).bind(k), G = {};
      return B.forEach(function(R) {
        if (!k.hasNode(R)) throw new Error("Graph does not have node: " + R);
        j = _(k, R, Z === "post", G, q, I, j);
      }), j;
    }
    function _(k, B, Z, I, j, q, G) {
      return Object.hasOwn(I, B) || (I[B] = !0, Z || (G = q(G, B)), j(B).forEach(function(R) {
        G = _(k, R, Z, I, j, q, G);
      }), Z && (G = q(G, B))), G;
    }
  }), U = s((J, N) => {
    var L = H();
    N.exports = _;
    function _(k, B, Z) {
      return L(k, B, Z, function(I, j) {
        return I.push(j), I;
      }, []);
    }
  }), Y = s((J, N) => {
    var L = U();
    N.exports = _;
    function _(k, B) {
      return L(k, B, "post");
    }
  }), X = s((J, N) => {
    var L = U();
    N.exports = _;
    function _(k, B) {
      return L(k, B, "pre");
    }
  }), te = s((J, N) => {
    var L = f(), _ = v();
    N.exports = k;
    function k(B, Z) {
      var I = new L(), j = {}, q = new _(), G;
      function R($) {
        var W = $.v === G ? $.w : $.v, P = q.priority(W);
        if (P !== void 0) {
          var ie = Z($);
          ie < P && (j[W] = G, q.decrease(W, ie));
        }
      }
      if (B.nodeCount() === 0) return I;
      B.nodes().forEach(function($) {
        q.add($, Number.POSITIVE_INFINITY), I.setNode($);
      }), q.decrease(B.nodes()[0], 0);
      for (var O = !1; q.size() > 0; ) {
        if (G = q.removeMin(), Object.hasOwn(j, G)) I.setEdge(G, j[G]);
        else {
          if (O) throw new Error("Input graph is not connected: " + B);
          O = !0;
        }
        B.nodeEdges(G).forEach(R);
      }
      return I;
    }
  }), K = s((J, N) => {
    var L = x(), _ = y();
    N.exports = k;
    function k(Z, I, j, q) {
      return B(Z, I, j, q || function(G) {
        return Z.outEdges(G);
      });
    }
    function B(Z, I, j, q) {
      if (j === void 0) return L(Z, I, j, q);
      for (var G = !1, R = Z.nodes(), O = 0; O < R.length; O++) {
        for (var $ = q(R[O]), W = 0; W < $.length; W++) {
          var P = $[W], ie = P.v === R[O] ? P.v : P.w, de = ie === P.v ? P.w : P.v;
          j({ v: ie, w: de }) < 0 && (G = !0);
        }
        if (G) return _(Z, I, j, q);
      }
      return L(Z, I, j, q);
    }
  }), V = s((J, N) => {
    N.exports = { bellmanFord: y(), components: m(), dijkstra: x(), dijkstraAll: S(), extractPath: C(), findCycles: A(), floydWarshall: D(), isAcyclic: M(), postorder: Y(), preorder: X(), prim: te(), shortestPaths: K(), reduce: H(), tarjan: T(), topsort: E() };
  }), Q = g();
  i.exports = { Graph: Q.Graph, json: p(), alg: V(), version: Q.version };
}), TM = Ve((n, i) => {
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
}), jM = Ve((n, i) => {
  var l = cn().Graph, r = TM();
  i.exports = c;
  var s = () => 1;
  function c(m, v) {
    if (m.nodeCount() <= 1) return [];
    let x = g(m, v || s);
    return f(x.graph, x.buckets, x.zeroIdx).flatMap((S) => m.outEdges(S.v, S.w));
  }
  function f(m, v, x) {
    let S = [], C = v[v.length - 1], T = v[0], A;
    for (; m.nodeCount(); ) {
      for (; A = T.dequeue(); ) h(m, v, x, A);
      for (; A = C.dequeue(); ) h(m, v, x, A);
      if (m.nodeCount()) {
        for (let D = v.length - 2; D > 0; --D) if (A = v[D].dequeue(), A) {
          S = S.concat(h(m, v, x, A, !0));
          break;
        }
      }
    }
    return S;
  }
  function h(m, v, x, S, C) {
    let T = C ? [] : void 0;
    return m.inEdges(S.v).forEach((A) => {
      let D = m.edge(A), E = m.node(A.v);
      C && T.push({ v: A.v, w: A.w }), E.out -= D, p(v, x, E);
    }), m.outEdges(S.v).forEach((A) => {
      let D = m.edge(A), E = A.w, M = m.node(E);
      M.in -= D, p(v, x, M);
    }), m.removeNode(S.v), T;
  }
  function g(m, v) {
    let x = new l(), S = 0, C = 0;
    m.nodes().forEach((D) => {
      x.setNode(D, { v: D, in: 0, out: 0 });
    }), m.edges().forEach((D) => {
      let E = x.edge(D.v, D.w) || 0, M = v(D), H = E + M;
      x.setEdge(D.v, D.w, H), C = Math.max(C, x.node(D.v).out += M), S = Math.max(S, x.node(D.w).in += M);
    });
    let T = y(C + S + 3).map(() => new r()), A = S + 1;
    return x.nodes().forEach((D) => {
      p(T, A, x.node(D));
    }), { graph: x, buckets: T, zeroIdx: A };
  }
  function p(m, v, x) {
    x.out ? x.in ? m[x.out - x.in + v].enqueue(x) : m[m.length - 1].enqueue(x) : m[0].enqueue(x);
  }
  function y(m) {
    let v = [];
    for (let x = 0; x < m; x++) v.push(x);
    return v;
  }
}), st = Ve((n, i) => {
  var l = cn().Graph;
  i.exports = { addBorderNode: v, addDummyNode: r, applyWithChunking: C, asNonCompoundGraph: c, buildLayerMatrix: p, intersectRect: g, mapValues: X, maxRank: T, normalizeRanks: y, notime: E, partition: A, pick: Y, predecessorWeights: h, range: U, removeEmptyRanks: m, simplify: s, successorWeights: f, time: D, uniqueId: H, zipObject: te };
  function r(K, V, Q, J) {
    for (var N = J; K.hasNode(N); ) N = H(J);
    return Q.dummy = V, K.setNode(N, Q), N;
  }
  function s(K) {
    let V = new l().setGraph(K.graph());
    return K.nodes().forEach((Q) => V.setNode(Q, K.node(Q))), K.edges().forEach((Q) => {
      let J = V.edge(Q.v, Q.w) || { weight: 0, minlen: 1 }, N = K.edge(Q);
      V.setEdge(Q.v, Q.w, { weight: J.weight + N.weight, minlen: Math.max(J.minlen, N.minlen) });
    }), V;
  }
  function c(K) {
    let V = new l({ multigraph: K.isMultigraph() }).setGraph(K.graph());
    return K.nodes().forEach((Q) => {
      K.children(Q).length || V.setNode(Q, K.node(Q));
    }), K.edges().forEach((Q) => {
      V.setEdge(Q, K.edge(Q));
    }), V;
  }
  function f(K) {
    let V = K.nodes().map((Q) => {
      let J = {};
      return K.outEdges(Q).forEach((N) => {
        J[N.w] = (J[N.w] || 0) + K.edge(N).weight;
      }), J;
    });
    return te(K.nodes(), V);
  }
  function h(K) {
    let V = K.nodes().map((Q) => {
      let J = {};
      return K.inEdges(Q).forEach((N) => {
        J[N.v] = (J[N.v] || 0) + K.edge(N).weight;
      }), J;
    });
    return te(K.nodes(), V);
  }
  function g(K, V) {
    let Q = K.x, J = K.y, N = V.x - Q, L = V.y - J, _ = K.width / 2, k = K.height / 2;
    if (!N && !L) throw new Error("Not possible to find intersection inside of the rectangle");
    let B, Z;
    return Math.abs(L) * _ > Math.abs(N) * k ? (L < 0 && (k = -k), B = k * N / L, Z = k) : (N < 0 && (_ = -_), B = _, Z = _ * L / N), { x: Q + B, y: J + Z };
  }
  function p(K) {
    let V = U(T(K) + 1).map(() => []);
    return K.nodes().forEach((Q) => {
      let J = K.node(Q), N = J.rank;
      N !== void 0 && (V[N][J.order] = Q);
    }), V;
  }
  function y(K) {
    let V = K.nodes().map((J) => {
      let N = K.node(J).rank;
      return N === void 0 ? Number.MAX_VALUE : N;
    }), Q = C(Math.min, V);
    K.nodes().forEach((J) => {
      let N = K.node(J);
      Object.hasOwn(N, "rank") && (N.rank -= Q);
    });
  }
  function m(K) {
    let V = K.nodes().map((_) => K.node(_).rank).filter((_) => _ !== void 0), Q = C(Math.min, V), J = [];
    K.nodes().forEach((_) => {
      let k = K.node(_).rank - Q;
      J[k] || (J[k] = []), J[k].push(_);
    });
    let N = 0, L = K.graph().nodeRankFactor;
    Array.from(J).forEach((_, k) => {
      _ === void 0 && k % L !== 0 ? --N : _ !== void 0 && N && _.forEach((B) => K.node(B).rank += N);
    });
  }
  function v(K, V, Q, J) {
    let N = { width: 0, height: 0 };
    return arguments.length >= 4 && (N.rank = Q, N.order = J), r(K, "border", N, V);
  }
  function x(K, V = S) {
    let Q = [];
    for (let J = 0; J < K.length; J += V) {
      let N = K.slice(J, J + V);
      Q.push(N);
    }
    return Q;
  }
  var S = 65535;
  function C(K, V) {
    if (V.length > S) {
      let Q = x(V);
      return K.apply(null, Q.map((J) => K.apply(null, J)));
    } else return K.apply(null, V);
  }
  function T(K) {
    let V = K.nodes().map((Q) => {
      let J = K.node(Q).rank;
      return J === void 0 ? Number.MIN_VALUE : J;
    });
    return C(Math.max, V);
  }
  function A(K, V) {
    let Q = { lhs: [], rhs: [] };
    return K.forEach((J) => {
      V(J) ? Q.lhs.push(J) : Q.rhs.push(J);
    }), Q;
  }
  function D(K, V) {
    let Q = Date.now();
    try {
      return V();
    } finally {
      console.log(K + " time: " + (Date.now() - Q) + "ms");
    }
  }
  function E(K, V) {
    return V();
  }
  var M = 0;
  function H(K) {
    var V = ++M;
    return K + ("" + V);
  }
  function U(K, V, Q = 1) {
    V == null && (V = K, K = 0);
    let J = (L) => L < V;
    Q < 0 && (J = (L) => V < L);
    let N = [];
    for (let L = K; J(L); L += Q) N.push(L);
    return N;
  }
  function Y(K, V) {
    let Q = {};
    for (let J of V) K[J] !== void 0 && (Q[J] = K[J]);
    return Q;
  }
  function X(K, V) {
    let Q = V;
    return typeof V == "string" && (Q = (J) => J[V]), Object.entries(K).reduce((J, [N, L]) => (J[N] = Q(L, N), J), {});
  }
  function te(K, V) {
    return K.reduce((Q, J, N) => (Q[J] = V[N], Q), {});
  }
}), AM = Ve((n, i) => {
  var l = jM(), r = st().uniqueId;
  i.exports = { run: s, undo: f };
  function s(h) {
    (h.graph().acyclicer === "greedy" ? l(h, g(h)) : c(h)).forEach((p) => {
      let y = h.edge(p);
      h.removeEdge(p), y.forwardName = p.name, y.reversed = !0, h.setEdge(p.w, p.v, y, r("rev"));
    });
    function g(p) {
      return (y) => p.edge(y).weight;
    }
  }
  function c(h) {
    let g = [], p = {}, y = {};
    function m(v) {
      Object.hasOwn(y, v) || (y[v] = !0, p[v] = !0, h.outEdges(v).forEach((x) => {
        Object.hasOwn(p, x.w) ? g.push(x) : m(x.w);
      }), delete p[v]);
    }
    return h.nodes().forEach(m), g;
  }
  function f(h) {
    h.edges().forEach((g) => {
      let p = h.edge(g);
      if (p.reversed) {
        h.removeEdge(g);
        let y = p.forwardName;
        delete p.reversed, delete p.forwardName, h.setEdge(g.w, g.v, p, y);
      }
    });
  }
}), DM = Ve((n, i) => {
  var l = st();
  i.exports = { run: r, undo: c };
  function r(f) {
    f.graph().dummyChains = [], f.edges().forEach((h) => s(f, h));
  }
  function s(f, h) {
    let g = h.v, p = f.node(g).rank, y = h.w, m = f.node(y).rank, v = h.name, x = f.edge(h), S = x.labelRank;
    if (m === p + 1) return;
    f.removeEdge(h);
    let C, T, A;
    for (A = 0, ++p; p < m; ++A, ++p) x.points = [], T = { width: 0, height: 0, edgeLabel: x, edgeObj: h, rank: p }, C = l.addDummyNode(f, "edge", T, "_d"), p === S && (T.width = x.width, T.height = x.height, T.dummy = "edge-label", T.labelpos = x.labelpos), f.setEdge(g, C, { weight: x.weight }, v), A === 0 && f.graph().dummyChains.push(C), g = C;
    f.setEdge(g, y, { weight: x.weight }, v);
  }
  function c(f) {
    f.graph().dummyChains.forEach((h) => {
      let g = f.node(h), p = g.edgeLabel, y;
      for (f.setEdge(g.edgeObj, p); g.dummy; ) y = f.successors(h)[0], f.removeNode(h), p.points.push({ x: g.x, y: g.y }), g.dummy === "edge-label" && (p.x = g.x, p.y = g.y, p.width = g.width, p.height = g.height), h = y, g = f.node(h);
    });
  }
}), Ws = Ve((n, i) => {
  var { applyWithChunking: l } = st();
  i.exports = { longestPath: r, slack: s };
  function r(c) {
    var f = {};
    function h(g) {
      var p = c.node(g);
      if (Object.hasOwn(f, g)) return p.rank;
      f[g] = !0;
      let y = c.outEdges(g).map((v) => v == null ? Number.POSITIVE_INFINITY : h(v.w) - c.edge(v).minlen);
      var m = l(Math.min, y);
      return m === Number.POSITIVE_INFINITY && (m = 0), p.rank = m;
    }
    c.sources().forEach(h);
  }
  function s(c, f) {
    return c.node(f.w).rank - c.node(f.v).rank - c.edge(f).minlen;
  }
}), cb = Ve((n, i) => {
  var l = cn().Graph, r = Ws().slack;
  i.exports = s;
  function s(g) {
    var p = new l({ directed: !1 }), y = g.nodes()[0], m = g.nodeCount();
    p.setNode(y, {});
    for (var v, x; c(p, g) < m; ) v = f(p, g), x = p.hasNode(v.v) ? r(g, v) : -r(g, v), h(p, g, x);
    return p;
  }
  function c(g, p) {
    function y(m) {
      p.nodeEdges(m).forEach((v) => {
        var x = v.v, S = m === x ? v.w : x;
        !g.hasNode(S) && !r(p, v) && (g.setNode(S, {}), g.setEdge(m, S, {}), y(S));
      });
    }
    return g.nodes().forEach(y), g.nodeCount();
  }
  function f(g, p) {
    return p.edges().reduce((y, m) => {
      let v = Number.POSITIVE_INFINITY;
      return g.hasNode(m.v) !== g.hasNode(m.w) && (v = r(p, m)), v < y[0] ? [v, m] : y;
    }, [Number.POSITIVE_INFINITY, null])[1];
  }
  function h(g, p, y) {
    g.nodes().forEach((m) => p.node(m).rank += y);
  }
}), OM = Ve((n, i) => {
  var l = cb(), r = Ws().slack, s = Ws().longestPath, c = cn().alg.preorder, f = cn().alg.postorder, h = st().simplify;
  i.exports = g, g.initLowLimValues = v, g.initCutValues = p, g.calcCutValue = m, g.leaveEdge = S, g.enterEdge = C, g.exchangeEdges = T;
  function g(M) {
    M = h(M), s(M);
    var H = l(M);
    v(H), p(H, M);
    for (var U, Y; U = S(H); ) Y = C(H, M, U), T(H, M, U, Y);
  }
  function p(M, H) {
    var U = f(M, M.nodes());
    U = U.slice(0, U.length - 1), U.forEach((Y) => y(M, H, Y));
  }
  function y(M, H, U) {
    var Y = M.node(U), X = Y.parent;
    M.edge(U, X).cutvalue = m(M, H, U);
  }
  function m(M, H, U) {
    var Y = M.node(U), X = Y.parent, te = !0, K = H.edge(U, X), V = 0;
    return K || (te = !1, K = H.edge(X, U)), V = K.weight, H.nodeEdges(U).forEach((Q) => {
      var J = Q.v === U, N = J ? Q.w : Q.v;
      if (N !== X) {
        var L = J === te, _ = H.edge(Q).weight;
        if (V += L ? _ : -_, D(M, U, N)) {
          var k = M.edge(U, N).cutvalue;
          V += L ? -k : k;
        }
      }
    }), V;
  }
  function v(M, H) {
    arguments.length < 2 && (H = M.nodes()[0]), x(M, {}, 1, H);
  }
  function x(M, H, U, Y, X) {
    var te = U, K = M.node(Y);
    return H[Y] = !0, M.neighbors(Y).forEach((V) => {
      Object.hasOwn(H, V) || (U = x(M, H, U, V, Y));
    }), K.low = te, K.lim = U++, X ? K.parent = X : delete K.parent, U;
  }
  function S(M) {
    return M.edges().find((H) => M.edge(H).cutvalue < 0);
  }
  function C(M, H, U) {
    var Y = U.v, X = U.w;
    H.hasEdge(Y, X) || (Y = U.w, X = U.v);
    var te = M.node(Y), K = M.node(X), V = te, Q = !1;
    te.lim > K.lim && (V = K, Q = !0);
    var J = H.edges().filter((N) => Q === E(M, M.node(N.v), V) && Q !== E(M, M.node(N.w), V));
    return J.reduce((N, L) => r(H, L) < r(H, N) ? L : N);
  }
  function T(M, H, U, Y) {
    var X = U.v, te = U.w;
    M.removeEdge(X, te), M.setEdge(Y.v, Y.w, {}), v(M), p(M, H), A(M, H);
  }
  function A(M, H) {
    var U = M.nodes().find((X) => !H.node(X).parent), Y = c(M, U);
    Y = Y.slice(1), Y.forEach((X) => {
      var te = M.node(X).parent, K = H.edge(X, te), V = !1;
      K || (K = H.edge(te, X), V = !0), H.node(X).rank = H.node(te).rank + (V ? K.minlen : -K.minlen);
    });
  }
  function D(M, H, U) {
    return M.hasEdge(H, U);
  }
  function E(M, H, U) {
    return U.low <= H.lim && H.lim <= U.lim;
  }
}), zM = Ve((n, i) => {
  var l = Ws(), r = l.longestPath, s = cb(), c = OM();
  i.exports = f;
  function f(y) {
    var m = y.graph().ranker;
    if (m instanceof Function) return m(y);
    switch (y.graph().ranker) {
      case "network-simplex":
        p(y);
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
        p(y);
    }
  }
  var h = r;
  function g(y) {
    r(y), s(y);
  }
  function p(y) {
    c(y);
  }
}), RM = Ve((n, i) => {
  i.exports = l;
  function l(c) {
    let f = s(c);
    c.graph().dummyChains.forEach((h) => {
      let g = c.node(h), p = g.edgeObj, y = r(c, f, p.v, p.w), m = y.path, v = y.lca, x = 0, S = m[x], C = !0;
      for (; h !== p.w; ) {
        if (g = c.node(h), C) {
          for (; (S = m[x]) !== v && c.node(S).maxRank < g.rank; ) x++;
          S === v && (C = !1);
        }
        if (!C) {
          for (; x < m.length - 1 && c.node(S = m[x + 1]).minRank <= g.rank; ) x++;
          S = m[x];
        }
        c.setParent(h, S), h = c.successors(h)[0];
      }
    });
  }
  function r(c, f, h, g) {
    let p = [], y = [], m = Math.min(f[h].low, f[g].low), v = Math.max(f[h].lim, f[g].lim), x, S;
    x = h;
    do
      x = c.parent(x), p.push(x);
    while (x && (f[x].low > m || v > f[x].lim));
    for (S = x, x = g; (x = c.parent(x)) !== S; ) y.push(x);
    return { path: p.concat(y.reverse()), lca: S };
  }
  function s(c) {
    let f = {}, h = 0;
    function g(p) {
      let y = h;
      c.children(p).forEach(g), f[p] = { low: y, lim: h++ };
    }
    return c.children().forEach(g), f;
  }
}), kM = Ve((n, i) => {
  var l = st();
  i.exports = { run: r, cleanup: h };
  function r(g) {
    let p = l.addDummyNode(g, "root", {}, "_root"), y = c(g), m = Object.values(y), v = l.applyWithChunking(Math.max, m) - 1, x = 2 * v + 1;
    g.graph().nestingRoot = p, g.edges().forEach((C) => g.edge(C).minlen *= x);
    let S = f(g) + 1;
    g.children().forEach((C) => s(g, p, x, S, v, y, C)), g.graph().nodeRankFactor = x;
  }
  function s(g, p, y, m, v, x, S) {
    let C = g.children(S);
    if (!C.length) {
      S !== p && g.setEdge(p, S, { weight: 0, minlen: y });
      return;
    }
    let T = l.addBorderNode(g, "_bt"), A = l.addBorderNode(g, "_bb"), D = g.node(S);
    g.setParent(T, S), D.borderTop = T, g.setParent(A, S), D.borderBottom = A, C.forEach((E) => {
      s(g, p, y, m, v, x, E);
      let M = g.node(E), H = M.borderTop ? M.borderTop : E, U = M.borderBottom ? M.borderBottom : E, Y = M.borderTop ? m : 2 * m, X = H !== U ? 1 : v - x[S] + 1;
      g.setEdge(T, H, { weight: Y, minlen: X, nestingEdge: !0 }), g.setEdge(U, A, { weight: Y, minlen: X, nestingEdge: !0 });
    }), g.parent(S) || g.setEdge(p, T, { weight: 0, minlen: v + x[S] });
  }
  function c(g) {
    var p = {};
    function y(m, v) {
      var x = g.children(m);
      x && x.length && x.forEach((S) => y(S, v + 1)), p[m] = v;
    }
    return g.children().forEach((m) => y(m, 1)), p;
  }
  function f(g) {
    return g.edges().reduce((p, y) => p + g.edge(y).weight, 0);
  }
  function h(g) {
    var p = g.graph();
    g.removeNode(p.nestingRoot), delete p.nestingRoot, g.edges().forEach((y) => {
      var m = g.edge(y);
      m.nestingEdge && g.removeEdge(y);
    });
  }
}), HM = Ve((n, i) => {
  var l = st();
  i.exports = r;
  function r(c) {
    function f(h) {
      let g = c.children(h), p = c.node(h);
      if (g.length && g.forEach(f), Object.hasOwn(p, "minRank")) {
        p.borderLeft = [], p.borderRight = [];
        for (let y = p.minRank, m = p.maxRank + 1; y < m; ++y) s(c, "borderLeft", "_bl", h, p, y), s(c, "borderRight", "_br", h, p, y);
      }
    }
    c.children().forEach(f);
  }
  function s(c, f, h, g, p, y) {
    let m = { width: 0, height: 0, rank: y, borderType: f }, v = p[f][y - 1], x = l.addDummyNode(c, "border", m, h);
    p[f][y] = x, c.setParent(x, g), v && c.setEdge(v, x, { weight: 1 });
  }
}), BM = Ve((n, i) => {
  i.exports = { adjust: l, undo: r };
  function l(y) {
    let m = y.graph().rankdir.toLowerCase();
    (m === "lr" || m === "rl") && s(y);
  }
  function r(y) {
    let m = y.graph().rankdir.toLowerCase();
    (m === "bt" || m === "rl") && f(y), (m === "lr" || m === "rl") && (g(y), s(y));
  }
  function s(y) {
    y.nodes().forEach((m) => c(y.node(m))), y.edges().forEach((m) => c(y.edge(m)));
  }
  function c(y) {
    let m = y.width;
    y.width = y.height, y.height = m;
  }
  function f(y) {
    y.nodes().forEach((m) => h(y.node(m))), y.edges().forEach((m) => {
      let v = y.edge(m);
      v.points.forEach(h), Object.hasOwn(v, "y") && h(v);
    });
  }
  function h(y) {
    y.y = -y.y;
  }
  function g(y) {
    y.nodes().forEach((m) => p(y.node(m))), y.edges().forEach((m) => {
      let v = y.edge(m);
      v.points.forEach(p), Object.hasOwn(v, "x") && p(v);
    });
  }
  function p(y) {
    let m = y.x;
    y.x = y.y, y.y = m;
  }
}), LM = Ve((n, i) => {
  var l = st();
  i.exports = r;
  function r(s) {
    let c = {}, f = s.nodes().filter((m) => !s.children(m).length), h = f.map((m) => s.node(m).rank), g = l.applyWithChunking(Math.max, h), p = l.range(g + 1).map(() => []);
    function y(m) {
      if (c[m]) return;
      c[m] = !0;
      let v = s.node(m);
      p[v.rank].push(m), s.successors(m).forEach(y);
    }
    return f.sort((m, v) => s.node(m).rank - s.node(v).rank).forEach(y), p;
  }
}), UM = Ve((n, i) => {
  var l = st().zipObject;
  i.exports = r;
  function r(c, f) {
    let h = 0;
    for (let g = 1; g < f.length; ++g) h += s(c, f[g - 1], f[g]);
    return h;
  }
  function s(c, f, h) {
    let g = l(h, h.map((S, C) => C)), p = f.flatMap((S) => c.outEdges(S).map((C) => ({ pos: g[C.w], weight: c.edge(C).weight })).sort((C, T) => C.pos - T.pos)), y = 1;
    for (; y < h.length; ) y <<= 1;
    let m = 2 * y - 1;
    y -= 1;
    let v = new Array(m).fill(0), x = 0;
    return p.forEach((S) => {
      let C = S.pos + y;
      v[C] += S.weight;
      let T = 0;
      for (; C > 0; ) C % 2 && (T += v[C + 1]), C = C - 1 >> 1, v[C] += S.weight;
      x += S.weight * T;
    }), x;
  }
}), VM = Ve((n, i) => {
  i.exports = l;
  function l(r, s = []) {
    return s.map((c) => {
      let f = r.inEdges(c);
      if (f.length) {
        let h = f.reduce((g, p) => {
          let y = r.edge(p), m = r.node(p.v);
          return { sum: g.sum + y.weight * m.order, weight: g.weight + y.weight };
        }, { sum: 0, weight: 0 });
        return { v: c, barycenter: h.sum / h.weight, weight: h.weight };
      } else return { v: c };
    });
  }
}), YM = Ve((n, i) => {
  var l = st();
  i.exports = r;
  function r(f, h) {
    let g = {};
    f.forEach((y, m) => {
      let v = g[y.v] = { indegree: 0, in: [], out: [], vs: [y.v], i: m };
      y.barycenter !== void 0 && (v.barycenter = y.barycenter, v.weight = y.weight);
    }), h.edges().forEach((y) => {
      let m = g[y.v], v = g[y.w];
      m !== void 0 && v !== void 0 && (v.indegree++, m.out.push(g[y.w]));
    });
    let p = Object.values(g).filter((y) => !y.indegree);
    return s(p);
  }
  function s(f) {
    let h = [];
    function g(y) {
      return (m) => {
        m.merged || (m.barycenter === void 0 || y.barycenter === void 0 || m.barycenter >= y.barycenter) && c(y, m);
      };
    }
    function p(y) {
      return (m) => {
        m.in.push(y), --m.indegree === 0 && f.push(m);
      };
    }
    for (; f.length; ) {
      let y = f.pop();
      h.push(y), y.in.reverse().forEach(g(y)), y.out.forEach(p(y));
    }
    return h.filter((y) => !y.merged).map((y) => l.pick(y, ["vs", "i", "barycenter", "weight"]));
  }
  function c(f, h) {
    let g = 0, p = 0;
    f.weight && (g += f.barycenter * f.weight, p += f.weight), h.weight && (g += h.barycenter * h.weight, p += h.weight), f.vs = h.vs.concat(f.vs), f.barycenter = g / p, f.weight = p, f.i = Math.min(h.i, f.i), h.merged = !0;
  }
}), IM = Ve((n, i) => {
  var l = st();
  i.exports = r;
  function r(f, h) {
    let g = l.partition(f, (T) => Object.hasOwn(T, "barycenter")), p = g.lhs, y = g.rhs.sort((T, A) => A.i - T.i), m = [], v = 0, x = 0, S = 0;
    p.sort(c(!!h)), S = s(m, y, S), p.forEach((T) => {
      S += T.vs.length, m.push(T.vs), v += T.barycenter * T.weight, x += T.weight, S = s(m, y, S);
    });
    let C = { vs: m.flat(!0) };
    return x && (C.barycenter = v / x, C.weight = x), C;
  }
  function s(f, h, g) {
    let p;
    for (; h.length && (p = h[h.length - 1]).i <= g; ) h.pop(), f.push(p.vs), g++;
    return g;
  }
  function c(f) {
    return (h, g) => h.barycenter < g.barycenter ? -1 : h.barycenter > g.barycenter ? 1 : f ? g.i - h.i : h.i - g.i;
  }
}), qM = Ve((n, i) => {
  var l = VM(), r = YM(), s = IM();
  i.exports = c;
  function c(g, p, y, m) {
    let v = g.children(p), x = g.node(p), S = x ? x.borderLeft : void 0, C = x ? x.borderRight : void 0, T = {};
    S && (v = v.filter((M) => M !== S && M !== C));
    let A = l(g, v);
    A.forEach((M) => {
      if (g.children(M.v).length) {
        let H = c(g, M.v, y, m);
        T[M.v] = H, Object.hasOwn(H, "barycenter") && h(M, H);
      }
    });
    let D = r(A, y);
    f(D, T);
    let E = s(D, m);
    if (S && (E.vs = [S, E.vs, C].flat(!0), g.predecessors(S).length)) {
      let M = g.node(g.predecessors(S)[0]), H = g.node(g.predecessors(C)[0]);
      Object.hasOwn(E, "barycenter") || (E.barycenter = 0, E.weight = 0), E.barycenter = (E.barycenter * E.weight + M.order + H.order) / (E.weight + 2), E.weight += 2;
    }
    return E;
  }
  function f(g, p) {
    g.forEach((y) => {
      y.vs = y.vs.flatMap((m) => p[m] ? p[m].vs : m);
    });
  }
  function h(g, p) {
    g.barycenter !== void 0 ? (g.barycenter = (g.barycenter * g.weight + p.barycenter * p.weight) / (g.weight + p.weight), g.weight += p.weight) : (g.barycenter = p.barycenter, g.weight = p.weight);
  }
}), XM = Ve((n, i) => {
  var l = cn().Graph, r = st();
  i.exports = s;
  function s(f, h, g, p) {
    p || (p = f.nodes());
    let y = c(f), m = new l({ compound: !0 }).setGraph({ root: y }).setDefaultNodeLabel((v) => f.node(v));
    return p.forEach((v) => {
      let x = f.node(v), S = f.parent(v);
      (x.rank === h || x.minRank <= h && h <= x.maxRank) && (m.setNode(v), m.setParent(v, S || y), f[g](v).forEach((C) => {
        let T = C.v === v ? C.w : C.v, A = m.edge(T, v), D = A !== void 0 ? A.weight : 0;
        m.setEdge(T, v, { weight: f.edge(C).weight + D });
      }), Object.hasOwn(x, "minRank") && m.setNode(v, { borderLeft: x.borderLeft[h], borderRight: x.borderRight[h] }));
    }), m;
  }
  function c(f) {
    for (var h; f.hasNode(h = r.uniqueId("_root")); ) ;
    return h;
  }
}), GM = Ve((n, i) => {
  i.exports = l;
  function l(r, s, c) {
    let f = {}, h;
    c.forEach((g) => {
      let p = r.parent(g), y, m;
      for (; p; ) {
        if (y = r.parent(p), y ? (m = f[y], f[y] = p) : (m = h, h = p), m && m !== p) {
          s.setEdge(m, p);
          return;
        }
        p = y;
      }
    });
  }
}), ZM = Ve((n, i) => {
  var l = LM(), r = UM(), s = qM(), c = XM(), f = GM(), h = cn().Graph, g = st();
  i.exports = p;
  function p(x, S = {}) {
    if (typeof S.customOrder == "function") {
      S.customOrder(x, p);
      return;
    }
    let C = g.maxRank(x), T = y(x, g.range(1, C + 1), "inEdges"), A = y(x, g.range(C - 1, -1, -1), "outEdges"), D = l(x);
    if (v(x, D), S.disableOptimalOrderHeuristic) return;
    let E = Number.POSITIVE_INFINITY, M, H = S.constraints || [];
    for (let U = 0, Y = 0; Y < 4; ++U, ++Y) {
      m(U % 2 ? T : A, U % 4 >= 2, H), D = g.buildLayerMatrix(x);
      let X = r(x, D);
      X < E ? (Y = 0, M = Object.assign({}, D), E = X) : X === E && (M = structuredClone(D));
    }
    v(x, M);
  }
  function y(x, S, C) {
    let T = /* @__PURE__ */ new Map(), A = (D, E) => {
      T.has(D) || T.set(D, []), T.get(D).push(E);
    };
    for (let D of x.nodes()) {
      let E = x.node(D);
      if (typeof E.rank == "number" && A(E.rank, D), typeof E.minRank == "number" && typeof E.maxRank == "number") for (let M = E.minRank; M <= E.maxRank; M++) M !== E.rank && A(M, D);
    }
    return S.map(function(D) {
      return c(x, D, C, T.get(D) || []);
    });
  }
  function m(x, S, C) {
    let T = new h();
    x.forEach(function(A) {
      C.forEach((M) => T.setEdge(M.left, M.right));
      let D = A.graph().root, E = s(A, D, T, S);
      E.vs.forEach((M, H) => A.node(M).order = H), f(A, T, E.vs);
    });
  }
  function v(x, S) {
    Object.values(S).forEach((C) => C.forEach((T, A) => x.node(T).order = A));
  }
}), $M = Ve((n, i) => {
  var l = cn().Graph, r = st();
  i.exports = { positionX: C, findType1Conflicts: s, findType2Conflicts: c, addConflict: h, hasConflict: g, verticalAlignment: p, horizontalCompaction: y, alignCoordinates: x, findSmallestWidthAlignment: v, balance: S };
  function s(D, E) {
    let M = {};
    function H(U, Y) {
      let X = 0, te = 0, K = U.length, V = Y[Y.length - 1];
      return Y.forEach((Q, J) => {
        let N = f(D, Q), L = N ? D.node(N).order : K;
        (N || Q === V) && (Y.slice(te, J + 1).forEach((_) => {
          D.predecessors(_).forEach((k) => {
            let B = D.node(k), Z = B.order;
            (Z < X || L < Z) && !(B.dummy && D.node(_).dummy) && h(M, k, _);
          });
        }), te = J + 1, X = L);
      }), Y;
    }
    return E.length && E.reduce(H), M;
  }
  function c(D, E) {
    let M = {};
    function H(Y, X, te, K, V) {
      let Q;
      r.range(X, te).forEach((J) => {
        Q = Y[J], D.node(Q).dummy && D.predecessors(Q).forEach((N) => {
          let L = D.node(N);
          L.dummy && (L.order < K || L.order > V) && h(M, N, Q);
        });
      });
    }
    function U(Y, X) {
      let te = -1, K, V = 0;
      return X.forEach((Q, J) => {
        if (D.node(Q).dummy === "border") {
          let N = D.predecessors(Q);
          N.length && (K = D.node(N[0]).order, H(X, V, J, te, K), V = J, te = K);
        }
        H(X, V, X.length, K, Y.length);
      }), X;
    }
    return E.length && E.reduce(U), M;
  }
  function f(D, E) {
    if (D.node(E).dummy) return D.predecessors(E).find((M) => D.node(M).dummy);
  }
  function h(D, E, M) {
    if (E > M) {
      let U = E;
      E = M, M = U;
    }
    let H = D[E];
    H || (D[E] = H = {}), H[M] = !0;
  }
  function g(D, E, M) {
    if (E > M) {
      let H = E;
      E = M, M = H;
    }
    return !!D[E] && Object.hasOwn(D[E], M);
  }
  function p(D, E, M, H) {
    let U = {}, Y = {}, X = {};
    return E.forEach((te) => {
      te.forEach((K, V) => {
        U[K] = K, Y[K] = K, X[K] = V;
      });
    }), E.forEach((te) => {
      let K = -1;
      te.forEach((V) => {
        let Q = H(V);
        if (Q.length) {
          Q = Q.sort((N, L) => X[N] - X[L]);
          let J = (Q.length - 1) / 2;
          for (let N = Math.floor(J), L = Math.ceil(J); N <= L; ++N) {
            let _ = Q[N];
            Y[V] === V && K < X[_] && !g(M, V, _) && (Y[_] = V, Y[V] = U[V] = U[_], K = X[_]);
          }
        }
      });
    }), { root: U, align: Y };
  }
  function y(D, E, M, H, U) {
    let Y = {}, X = m(D, E, M, U), te = U ? "borderLeft" : "borderRight";
    function K(J, N) {
      let L = X.nodes().slice(), _ = {}, k = L.pop();
      for (; k; ) {
        if (_[k]) J(k);
        else {
          _[k] = !0, L.push(k);
          for (let B of N(k)) L.push(B);
        }
        k = L.pop();
      }
    }
    function V(J) {
      Y[J] = X.inEdges(J).reduce((N, L) => Math.max(N, Y[L.v] + X.edge(L)), 0);
    }
    function Q(J) {
      let N = X.outEdges(J).reduce((_, k) => Math.min(_, Y[k.w] - X.edge(k)), Number.POSITIVE_INFINITY), L = D.node(J);
      N !== Number.POSITIVE_INFINITY && L.borderType !== te && (Y[J] = Math.max(Y[J], N));
    }
    return K(V, X.predecessors.bind(X)), K(Q, X.successors.bind(X)), Object.keys(H).forEach((J) => Y[J] = Y[M[J]]), Y;
  }
  function m(D, E, M, H) {
    let U = new l(), Y = D.graph(), X = T(Y.nodesep, Y.edgesep, H);
    return E.forEach((te) => {
      let K;
      te.forEach((V) => {
        let Q = M[V];
        if (U.setNode(Q), K) {
          var J = M[K], N = U.edge(J, Q);
          U.setEdge(J, Q, Math.max(X(D, V, K), N || 0));
        }
        K = V;
      });
    }), U;
  }
  function v(D, E) {
    return Object.values(E).reduce((M, H) => {
      let U = Number.NEGATIVE_INFINITY, Y = Number.POSITIVE_INFINITY;
      Object.entries(H).forEach(([te, K]) => {
        let V = A(D, te) / 2;
        U = Math.max(K + V, U), Y = Math.min(K - V, Y);
      });
      let X = U - Y;
      return X < M[0] && (M = [X, H]), M;
    }, [Number.POSITIVE_INFINITY, null])[1];
  }
  function x(D, E) {
    let M = Object.values(E), H = r.applyWithChunking(Math.min, M), U = r.applyWithChunking(Math.max, M);
    ["u", "d"].forEach((Y) => {
      ["l", "r"].forEach((X) => {
        let te = Y + X, K = D[te];
        if (K === E) return;
        let V = Object.values(K), Q = H - r.applyWithChunking(Math.min, V);
        X !== "l" && (Q = U - r.applyWithChunking(Math.max, V)), Q && (D[te] = r.mapValues(K, (J) => J + Q));
      });
    });
  }
  function S(D, E) {
    return r.mapValues(D.ul, (M, H) => {
      if (E) return D[E.toLowerCase()][H];
      {
        let U = Object.values(D).map((Y) => Y[H]).sort((Y, X) => Y - X);
        return (U[1] + U[2]) / 2;
      }
    });
  }
  function C(D) {
    let E = r.buildLayerMatrix(D), M = Object.assign(s(D, E), c(D, E)), H = {}, U;
    ["u", "d"].forEach((X) => {
      U = X === "u" ? E : Object.values(E).reverse(), ["l", "r"].forEach((te) => {
        te === "r" && (U = U.map((J) => Object.values(J).reverse()));
        let K = (X === "u" ? D.predecessors : D.successors).bind(D), V = p(D, U, M, K), Q = y(D, U, V.root, V.align, te === "r");
        te === "r" && (Q = r.mapValues(Q, (J) => -J)), H[X + te] = Q;
      });
    });
    let Y = v(D, H);
    return x(H, Y), S(H, D.graph().align);
  }
  function T(D, E, M) {
    return (H, U, Y) => {
      let X = H.node(U), te = H.node(Y), K = 0, V;
      if (K += X.width / 2, Object.hasOwn(X, "labelpos")) switch (X.labelpos.toLowerCase()) {
        case "l":
          V = -X.width / 2;
          break;
        case "r":
          V = X.width / 2;
          break;
      }
      if (V && (K += M ? V : -V), V = 0, K += (X.dummy ? E : D) / 2, K += (te.dummy ? E : D) / 2, K += te.width / 2, Object.hasOwn(te, "labelpos")) switch (te.labelpos.toLowerCase()) {
        case "l":
          V = te.width / 2;
          break;
        case "r":
          V = -te.width / 2;
          break;
      }
      return V && (K += M ? V : -V), V = 0, K;
    };
  }
  function A(D, E) {
    return D.node(E).width;
  }
}), QM = Ve((n, i) => {
  var l = st(), r = $M().positionX;
  i.exports = s;
  function s(f) {
    f = l.asNonCompoundGraph(f), c(f), Object.entries(r(f)).forEach(([h, g]) => f.node(h).x = g);
  }
  function c(f) {
    let h = l.buildLayerMatrix(f), g = f.graph().ranksep, p = f.graph().rankalign, y = 0;
    h.forEach((m) => {
      let v = m.reduce((x, S) => {
        let C = f.node(S).height;
        return x > C ? x : C;
      }, 0);
      m.forEach((x) => {
        let S = f.node(x);
        p === "top" ? S.y = y + S.height / 2 : p === "bottom" ? S.y = y + v - S.height / 2 : S.y = y + v / 2;
      }), y += v + g;
    });
  }
}), KM = Ve((n, i) => {
  var l = AM(), r = DM(), s = zM(), c = st().normalizeRanks, f = RM(), h = st().removeEmptyRanks, g = kM(), p = HM(), y = BM(), m = ZM(), v = QM(), x = st(), S = cn().Graph;
  i.exports = C;
  function C(O, $ = {}) {
    let W = $.debugTiming ? x.time : x.notime;
    return W("layout", () => {
      let P = W("  buildLayoutGraph", () => K(O));
      return W("  runLayout", () => T(P, W, $)), W("  updateInputGraph", () => A(O, P)), P;
    });
  }
  function T(O, $, W) {
    $("    makeSpaceForEdgeLabels", () => V(O)), $("    removeSelfEdges", () => I(O)), $("    acyclic", () => l.run(O)), $("    nestingGraph.run", () => g.run(O)), $("    rank", () => s(x.asNonCompoundGraph(O))), $("    injectEdgeLabelProxies", () => Q(O)), $("    removeEmptyRanks", () => h(O)), $("    nestingGraph.cleanup", () => g.cleanup(O)), $("    normalizeRanks", () => c(O)), $("    assignRankMinMax", () => J(O)), $("    removeEdgeLabelProxies", () => N(O)), $("    normalize.run", () => r.run(O)), $("    parentDummyChains", () => f(O)), $("    addBorderSegments", () => p(O)), $("    order", () => m(O, W)), $("    insertSelfEdges", () => j(O)), $("    adjustCoordinateSystem", () => y.adjust(O)), $("    position", () => v(O)), $("    positionSelfEdges", () => q(O)), $("    removeBorderNodes", () => Z(O)), $("    normalize.undo", () => r.undo(O)), $("    fixupEdgeLabelCoords", () => k(O)), $("    undoCoordinateSystem", () => y.undo(O)), $("    translateGraph", () => L(O)), $("    assignNodeIntersects", () => _(O)), $("    reversePoints", () => B(O)), $("    acyclic.undo", () => l.undo(O));
  }
  function A(O, $) {
    O.nodes().forEach((W) => {
      let P = O.node(W), ie = $.node(W);
      P && (P.x = ie.x, P.y = ie.y, P.order = ie.order, P.rank = ie.rank, $.children(W).length && (P.width = ie.width, P.height = ie.height));
    }), O.edges().forEach((W) => {
      let P = O.edge(W), ie = $.edge(W);
      P.points = ie.points, Object.hasOwn(ie, "x") && (P.x = ie.x, P.y = ie.y);
    }), O.graph().width = $.graph().width, O.graph().height = $.graph().height;
  }
  var D = ["nodesep", "edgesep", "ranksep", "marginx", "marginy"], E = { ranksep: 50, edgesep: 20, nodesep: 50, rankdir: "tb", rankalign: "center" }, M = ["acyclicer", "ranker", "rankdir", "align", "rankalign"], H = ["width", "height", "rank"], U = { width: 0, height: 0 }, Y = ["minlen", "weight", "width", "height", "labeloffset"], X = { minlen: 1, weight: 1, width: 0, height: 0, labeloffset: 10, labelpos: "r" }, te = ["labelpos"];
  function K(O) {
    let $ = new S({ multigraph: !0, compound: !0 }), W = R(O.graph());
    return $.setGraph(Object.assign({}, E, G(W, D), x.pick(W, M))), O.nodes().forEach((P) => {
      let ie = R(O.node(P)), de = G(ie, H);
      Object.keys(U).forEach((he) => {
        de[he] === void 0 && (de[he] = U[he]);
      }), $.setNode(P, de), $.setParent(P, O.parent(P));
    }), O.edges().forEach((P) => {
      let ie = R(O.edge(P));
      $.setEdge(P, Object.assign({}, X, G(ie, Y), x.pick(ie, te)));
    }), $;
  }
  function V(O) {
    let $ = O.graph();
    $.ranksep /= 2, O.edges().forEach((W) => {
      let P = O.edge(W);
      P.minlen *= 2, P.labelpos.toLowerCase() !== "c" && ($.rankdir === "TB" || $.rankdir === "BT" ? P.width += P.labeloffset : P.height += P.labeloffset);
    });
  }
  function Q(O) {
    O.edges().forEach(($) => {
      let W = O.edge($);
      if (W.width && W.height) {
        let P = O.node($.v), ie = { rank: (O.node($.w).rank - P.rank) / 2 + P.rank, e: $ };
        x.addDummyNode(O, "edge-proxy", ie, "_ep");
      }
    });
  }
  function J(O) {
    let $ = 0;
    O.nodes().forEach((W) => {
      let P = O.node(W);
      P.borderTop && (P.minRank = O.node(P.borderTop).rank, P.maxRank = O.node(P.borderBottom).rank, $ = Math.max($, P.maxRank));
    }), O.graph().maxRank = $;
  }
  function N(O) {
    O.nodes().forEach(($) => {
      let W = O.node($);
      W.dummy === "edge-proxy" && (O.edge(W.e).labelRank = W.rank, O.removeNode($));
    });
  }
  function L(O) {
    let $ = Number.POSITIVE_INFINITY, W = 0, P = Number.POSITIVE_INFINITY, ie = 0, de = O.graph(), he = de.marginx || 0, ge = de.marginy || 0;
    function xe(Se) {
      let _e = Se.x, De = Se.y, Pe = Se.width, Et = Se.height;
      $ = Math.min($, _e - Pe / 2), W = Math.max(W, _e + Pe / 2), P = Math.min(P, De - Et / 2), ie = Math.max(ie, De + Et / 2);
    }
    O.nodes().forEach((Se) => xe(O.node(Se))), O.edges().forEach((Se) => {
      let _e = O.edge(Se);
      Object.hasOwn(_e, "x") && xe(_e);
    }), $ -= he, P -= ge, O.nodes().forEach((Se) => {
      let _e = O.node(Se);
      _e.x -= $, _e.y -= P;
    }), O.edges().forEach((Se) => {
      let _e = O.edge(Se);
      _e.points.forEach((De) => {
        De.x -= $, De.y -= P;
      }), Object.hasOwn(_e, "x") && (_e.x -= $), Object.hasOwn(_e, "y") && (_e.y -= P);
    }), de.width = W - $ + he, de.height = ie - P + ge;
  }
  function _(O) {
    O.edges().forEach(($) => {
      let W = O.edge($), P = O.node($.v), ie = O.node($.w), de, he;
      W.points ? (de = W.points[0], he = W.points[W.points.length - 1]) : (W.points = [], de = ie, he = P), W.points.unshift(x.intersectRect(P, de)), W.points.push(x.intersectRect(ie, he));
    });
  }
  function k(O) {
    O.edges().forEach(($) => {
      let W = O.edge($);
      if (Object.hasOwn(W, "x")) switch ((W.labelpos === "l" || W.labelpos === "r") && (W.width -= W.labeloffset), W.labelpos) {
        case "l":
          W.x -= W.width / 2 + W.labeloffset;
          break;
        case "r":
          W.x += W.width / 2 + W.labeloffset;
          break;
      }
    });
  }
  function B(O) {
    O.edges().forEach(($) => {
      let W = O.edge($);
      W.reversed && W.points.reverse();
    });
  }
  function Z(O) {
    O.nodes().forEach(($) => {
      if (O.children($).length) {
        let W = O.node($), P = O.node(W.borderTop), ie = O.node(W.borderBottom), de = O.node(W.borderLeft[W.borderLeft.length - 1]), he = O.node(W.borderRight[W.borderRight.length - 1]);
        W.width = Math.abs(he.x - de.x), W.height = Math.abs(ie.y - P.y), W.x = de.x + W.width / 2, W.y = P.y + W.height / 2;
      }
    }), O.nodes().forEach(($) => {
      O.node($).dummy === "border" && O.removeNode($);
    });
  }
  function I(O) {
    O.edges().forEach(($) => {
      if ($.v === $.w) {
        var W = O.node($.v);
        W.selfEdges || (W.selfEdges = []), W.selfEdges.push({ e: $, label: O.edge($) }), O.removeEdge($);
      }
    });
  }
  function j(O) {
    var $ = x.buildLayerMatrix(O);
    $.forEach((W) => {
      var P = 0;
      W.forEach((ie, de) => {
        var he = O.node(ie);
        he.order = de + P, (he.selfEdges || []).forEach((ge) => {
          x.addDummyNode(O, "selfedge", { width: ge.label.width, height: ge.label.height, rank: he.rank, order: de + ++P, e: ge.e, label: ge.label }, "_se");
        }), delete he.selfEdges;
      });
    });
  }
  function q(O) {
    O.nodes().forEach(($) => {
      var W = O.node($);
      if (W.dummy === "selfedge") {
        var P = O.node(W.e.v), ie = P.x + P.width / 2, de = P.y, he = W.x - ie, ge = P.height / 2;
        O.setEdge(W.e, W.label), O.removeNode($), W.label.points = [{ x: ie + 2 * he / 3, y: de - ge }, { x: ie + 5 * he / 6, y: de - ge }, { x: ie + he, y: de }, { x: ie + 5 * he / 6, y: de + ge }, { x: ie + 2 * he / 3, y: de + ge }], W.label.x = W.x, W.label.y = W.y;
      }
    });
  }
  function G(O, $) {
    return x.mapValues(x.pick(O, $), Number);
  }
  function R(O) {
    var $ = {};
    return O && Object.entries(O).forEach(([W, P]) => {
      typeof W == "string" && (W = W.toLowerCase()), $[W] = P;
    }), $;
  }
}), JM = Ve((n, i) => {
  var l = st(), r = cn().Graph;
  i.exports = { debugOrdering: s };
  function s(c) {
    let f = l.buildLayerMatrix(c), h = new r({ compound: !0, multigraph: !0 }).setGraph({});
    return c.nodes().forEach((g) => {
      h.setNode(g, { label: g }), h.setParent(g, "layer" + c.node(g).rank);
    }), c.edges().forEach((g) => h.setEdge(g.v, g.w, {}, g.name)), f.forEach((g, p) => {
      let y = "layer" + p;
      h.setNode(y, { rank: "same" }), g.reduce((m, v) => (h.setEdge(m, v, { style: "invis" }), v));
    }), h;
  }
}), WM = Ve((n, i) => {
  i.exports = "2.0.4";
}), FM = Ve((n, i) => {
  i.exports = { graphlib: cn(), layout: KM(), debug: JM(), util: { time: st().time, notime: st().notime }, version: WM() };
});
const I0 = FM();
function PM() {
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
function eT() {
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
function tT() {
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
function nT({ data: n, selected: i }) {
  const l = n, { name: r, initial: s, terminal: c, transitionCount: f } = l, g = s ? "initial" : c ? "terminal" : "regular", p = () => s ? "Initial" : c ? "Final" : "State", y = () => s ? /* @__PURE__ */ b.jsx(PM, {}) : c ? /* @__PURE__ */ b.jsx(eT, {}) : /* @__PURE__ */ b.jsx(tT, {});
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
          /* @__PURE__ */ b.jsx("span", { className: "fub-node-badge", children: p() })
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
const aT = ee.memo(nT), iT = {
  stateNode: aT
};
function oT({
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
  const [p, y, m] = Dd({
    sourceX: i,
    sourceY: l,
    sourcePosition: c,
    targetX: r,
    targetY: s,
    targetPosition: f
  });
  return /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
    /* @__PURE__ */ b.jsx(
      Xl,
      {
        id: n,
        path: p,
        className: `fub-edge-path${g ? " fub-edge-path--selected" : ""}`,
        markerEnd: `url(#fub-arrow${g ? "-selected" : ""})`
      }
    ),
    h && /* @__PURE__ */ b.jsx(WC, { children: /* @__PURE__ */ b.jsx(
      "div",
      {
        className: `fub-edge-label${g ? " fub-edge-label--selected" : ""}`,
        style: {
          position: "absolute",
          transform: `translate(-50%, -50%) translate(${y}px,${m}px)`,
          pointerEvents: "all"
        },
        children: h
      }
    ) })
  ] });
}
const lT = {
  custom: oT
}, q0 = 200, X0 = 80;
function rT(n, i, l = "TB") {
  const r = new I0.graphlib.Graph();
  return r.setDefaultEdgeLabel(() => ({})), r.setGraph({ rankdir: l, nodesep: 80, ranksep: 100 }), n.forEach((c) => {
    r.setNode(c.id, { width: q0, height: X0 });
  }), i.forEach((c) => {
    r.setEdge(c.source, c.target);
  }), I0.layout(r), { nodes: n.map((c) => {
    const f = r.node(c.id);
    return {
      ...c,
      position: {
        x: f.x - q0 / 2,
        y: f.y - X0 / 2
      }
    };
  }), edges: i };
}
function G0(n, i) {
  const l = {};
  i.forEach((f) => {
    f.from && (l[f.from] = (l[f.from] || 0) + 1);
  });
  const r = n.map((f, h) => ({
    id: f.name || `state-${h}`,
    type: "stateNode",
    position: { x: 0, y: 0 },
    data: {
      name: f.name,
      initial: f.initial,
      terminal: f.terminal,
      stateIndex: h,
      transitionCount: l[f.name] || 0
    }
  })), s = new Set(n.map((f) => f.name)), c = [];
  return i.forEach((f, h) => {
    const g = f.to || f.dynamic_to?.resolver, p = s.has(f.from), y = g && s.has(g);
    !p || !y || c.push({
      id: `edge-${h}`,
      source: f.from,
      target: g,
      label: f.event || "(event)",
      type: "custom",
      data: {
        transitionIndex: h
      }
    });
  }), rT(r, c);
}
function sT(n) {
  const i = be((N) => N.document.definition), l = be((N) => N.selection), r = be((N) => N.setSelection), s = be((N) => N.addState), c = be((N) => N.updateStateName), f = be((N) => N.updateStateFlag), h = He((N) => N.canvasZoom), g = He((N) => N.zoomCanvas), p = !!n.readOnly, y = i.states, m = i.transitions, v = ee.useRef(null), x = cu(), [S, C] = ee.useState(!1), { nodes: T, edges: A } = ee.useMemo(
    () => G0(y, m),
    [y, m]
  ), [D, E, M] = FC(T), [H, U, Y] = PC(A);
  ee.useEffect(() => {
    const { nodes: N, edges: L } = G0(y, m);
    E(N), U(L);
  }, [y, m, E, U]), ee.useEffect(() => {
    if (l.kind === "state") {
      const N = y[l.stateIndex];
      N && (E(
        (L) => L.map((_) => ({
          ..._,
          selected: _.id === N.name
        }))
      ), U(
        (L) => L.map((_) => ({
          ..._,
          selected: !1
        }))
      ));
    } else if (l.kind === "transition" || l.kind === "workflow-node") {
      const N = l.transitionIndex;
      E(
        (L) => L.map((_) => ({
          ..._,
          selected: !1
        }))
      ), U(
        (L) => L.map((_) => {
          const k = _.data;
          return {
            ..._,
            selected: k?.transitionIndex === N
          };
        })
      );
    } else
      E(
        (N) => N.map((L) => ({
          ...L,
          selected: !1
        }))
      ), U(
        (N) => N.map((L) => ({
          ...L,
          selected: !1
        }))
      );
  }, [l, y, E, U]);
  const X = ee.useCallback(
    (N) => {
      M(N);
      for (const L of N)
        if (L.type === "select" && L.selected) {
          const k = D.find((B) => B.id === L.id)?.data;
          k?.stateIndex !== void 0 && r({ kind: "state", stateIndex: k.stateIndex });
        }
    },
    [D, M, r]
  ), te = ee.useCallback(
    (N) => {
      Y(N);
      for (const L of N)
        if (L.type === "select" && L.selected) {
          const k = H.find((B) => B.id === L.id)?.data;
          k?.transitionIndex !== void 0 && r({ kind: "transition", transitionIndex: k.transitionIndex });
        }
    },
    [H, Y, r]
  ), K = ee.useCallback(
    (N, L) => {
      const _ = L.zoom - h;
      Math.abs(_) > 0.01 && g(_);
    },
    [h, g]
  ), V = ee.useCallback(
    (N) => {
      p || (N.preventDefault(), N.dataTransfer.dropEffect = "move", C(!0));
    },
    [p]
  ), Q = ee.useCallback(
    (N) => {
      const L = N.relatedTarget;
      (!L || !N.currentTarget.contains(L)) && C(!1);
    },
    []
  ), J = ee.useCallback(
    (N) => {
      if (p) return;
      N.preventDefault(), C(!1);
      const L = N.dataTransfer.getData("application/reactflow");
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
        x: N.clientX,
        y: N.clientY
      }), s();
      const k = y.length;
      setTimeout(() => {
        const Z = `${_.defaults?.initial ? "initial" : _.defaults?.terminal ? "final" : "state"}_${k + 1}`;
        c(k, Z), _.defaults?.initial && f(k, "initial", !0), _.defaults?.terminal && f(k, "terminal", !0), r({ kind: "state", stateIndex: k });
      }, 0);
    },
    [p, x, s, y.length, c, f, r]
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
            p ? /* @__PURE__ */ b.jsx("span", { className: "fub-badge", children: "Read-only" }) : null
          ] })
        ] }),
        /* @__PURE__ */ b.jsxs(
          "div",
          {
            ref: v,
            className: `fub-panel-body fub-canvas-flow-container${S ? " fub-canvas-drop-target" : ""}`,
            onDragOver: V,
            onDragLeave: Q,
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
                    disabled: p,
                    children: "Create first state"
                  }
                ),
                /* @__PURE__ */ b.jsxs("p", { className: "fub-muted", children: [
                  "Hint: press ",
                  /* @__PURE__ */ b.jsx("kbd", { children: "N" }),
                  " to add a state, or drag from the palette."
                ] })
              ] }) : /* @__PURE__ */ b.jsxs(
                KC,
                {
                  nodes: D,
                  edges: H,
                  onNodesChange: X,
                  onEdgesChange: te,
                  onMoveEnd: K,
                  nodeTypes: iT,
                  edgeTypes: lT,
                  defaultViewport: { x: 50, y: 50, zoom: h },
                  fitView: !0,
                  fitViewOptions: { padding: 0.2 },
                  proOptions: { hideAttribution: !0 },
                  nodesDraggable: !p,
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
                      iM,
                      {
                        variant: Jn.Dots,
                        gap: 20,
                        size: 1,
                        color: "var(--fub-border)"
                      }
                    ),
                    /* @__PURE__ */ b.jsx(
                      fM,
                      {
                        showZoom: !0,
                        showFitView: !0,
                        showInteractive: !1,
                        className: "fub-flow-controls"
                      }
                    ),
                    /* @__PURE__ */ b.jsx(
                      _M,
                      {
                        nodeStrokeColor: "var(--fub-border)",
                        nodeColor: (N) => {
                          const L = N.data;
                          return N.selected ? "var(--fub-accent)" : L?.initial ? "var(--fub-accent-muted)" : L?.terminal ? "var(--fub-warn)" : "var(--fub-bg-2)";
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
function Z0(n) {
  return /* @__PURE__ */ b.jsx(lb, { children: /* @__PURE__ */ b.jsx(sT, { ...n }) });
}
function $0() {
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
                /* @__PURE__ */ b.jsx("ul", { children: (h.rejections ?? []).map((g, p) => /* @__PURE__ */ b.jsxs("li", { children: [
                  /* @__PURE__ */ b.jsx("strong", { children: g.code }),
                  ": ",
                  g.message,
                  g.remediationHint ? ` (${g.remediationHint})` : ""
                ] }, `${h.id}-rejection-${p}`)) })
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
function uT() {
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
function cT() {
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
function fT() {
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
function dT() {
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
function hT() {
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
function gT() {
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
function mT() {
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
function pT() {
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
function yT() {
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
const Q0 = [
  // States
  {
    id: "initial-state",
    type: "state",
    nodeKind: "stateNode",
    label: "Start",
    description: "Initial state - entry point of the machine",
    icon: /* @__PURE__ */ b.jsx(uT, {}),
    defaults: { initial: !0 }
  },
  {
    id: "regular-state",
    type: "state",
    nodeKind: "stateNode",
    label: "State",
    description: "Regular state - intermediate step",
    icon: /* @__PURE__ */ b.jsx(fT, {})
  },
  {
    id: "terminal-state",
    type: "state",
    nodeKind: "stateNode",
    label: "End",
    description: "Terminal state - final state of the machine",
    icon: /* @__PURE__ */ b.jsx(cT, {}),
    defaults: { terminal: !0 }
  },
  // Actions (for workflow nodes)
  {
    id: "email-action",
    type: "action",
    nodeKind: "step",
    label: "Email",
    description: "Send an email notification",
    icon: /* @__PURE__ */ b.jsx(dT, {})
  },
  {
    id: "event-action",
    type: "action",
    nodeKind: "step",
    label: "Event",
    description: "Emit or handle an event",
    icon: /* @__PURE__ */ b.jsx(hT, {})
  },
  {
    id: "api-action",
    type: "action",
    nodeKind: "step",
    label: "API",
    description: "Make an API call",
    icon: /* @__PURE__ */ b.jsx(gT, {})
  },
  // Logic
  {
    id: "delay-logic",
    type: "logic",
    nodeKind: "step",
    label: "Delay",
    description: "Wait for a specified duration",
    icon: /* @__PURE__ */ b.jsx(mT, {})
  },
  {
    id: "condition-logic",
    type: "logic",
    nodeKind: "when",
    label: "If/Else",
    description: "Conditional branching logic",
    icon: /* @__PURE__ */ b.jsx(pT, {})
  }
], vT = {
  state: "States",
  action: "Actions",
  logic: "Logic"
};
function bT({
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
      const m = JSON.stringify({
        id: n.id,
        type: n.type,
        nodeKind: n.nodeKind,
        label: n.label,
        defaults: n.defaults
      });
      y.dataTransfer.setData("application/reactflow", m), y.dataTransfer.setData("text/plain", n.label), y.dataTransfer.effectAllowed = "move", s(!0), l?.(n);
    },
    [n, i, l]
  ), g = ee.useCallback(() => {
    s(!1);
  }, []), p = () => n.defaults?.initial ? "fub-palette-item--initial" : n.defaults?.terminal ? "fub-palette-item--terminal" : n.type === "state" ? "fub-palette-item--state" : n.type === "action" ? "fub-palette-item--action" : n.type === "logic" ? "fub-palette-item--logic" : "";
  return /* @__PURE__ */ b.jsxs(
    "div",
    {
      className: `fub-palette-item ${p()}${r ? " fub-palette-item--dragging" : ""}${i ? " fub-palette-item--disabled" : ""}`,
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
function xT(n) {
  const [i, l] = ee.useState(""), [r, s] = ee.useState(/* @__PURE__ */ new Set()), c = !!n.readOnly, f = ee.useMemo(() => {
    if (!i.trim())
      return Q0;
    const v = i.toLowerCase();
    return Q0.filter(
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
  }, []), p = ee.useCallback((v) => {
    l(v.target.value);
  }, []), y = ee.useCallback(() => {
    l("");
  }, []), m = Object.keys(h);
  return /* @__PURE__ */ b.jsxs(
    "section",
    {
      className: "fub-palette",
      "aria-label": "Node palette",
      role: "region",
      children: [
        /* @__PURE__ */ b.jsxs("div", { className: "fub-palette-search", children: [
          /* @__PURE__ */ b.jsx("div", { className: "fub-palette-search-icon", children: /* @__PURE__ */ b.jsx(yT, {}) }),
          /* @__PURE__ */ b.jsx(
            "input",
            {
              type: "text",
              className: "fub-palette-search-input",
              placeholder: "Search nodes...",
              value: i,
              onChange: p,
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
          m.length === 0 && /* @__PURE__ */ b.jsx("div", { className: "fub-palette-empty", children: /* @__PURE__ */ b.jsx("p", { children: "No nodes match your search." }) }),
          m.map((v) => {
            const x = h[v], S = r.has(v), C = vT[v] || v;
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
                  children: x.map((T) => /* @__PURE__ */ b.jsx(
                    bT,
                    {
                      item: T,
                      readOnly: c,
                      onDragStart: n.onDragStart
                    },
                    T.id
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
function K0(n) {
  return n ? " is-selected" : "";
}
function wT(n, i) {
  return n.kind === "state" && n.stateIndex === i;
}
function ST(n, i) {
  return n.kind === "transition" || n.kind === "workflow-node" ? n.transitionIndex === i : !1;
}
function ET() {
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
function _T() {
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
function J0(n) {
  const [i, l] = ee.useState("palette"), r = be((m) => m.document.definition.states), s = be((m) => m.document.definition.transitions), c = be((m) => m.selection), f = be((m) => m.setSelection), h = be((m) => m.addState), g = be((m) => m.addTransition), p = !!n.readOnly, y = ee.useCallback((m) => {
    l(m);
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
                children: /* @__PURE__ */ b.jsx(ET, {})
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
                children: /* @__PURE__ */ b.jsx(_T, {})
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ b.jsx("div", { className: "fub-panel-body", children: i === "palette" ? /* @__PURE__ */ b.jsx("div", { id: "fub-explorer-palette", role: "tabpanel", children: /* @__PURE__ */ b.jsx(xT, { readOnly: p }) }) : /* @__PURE__ */ b.jsxs("div", { id: "fub-explorer-tree", role: "tabpanel", children: [
          /* @__PURE__ */ b.jsxs("div", { className: "fub-tree-actions", children: [
            /* @__PURE__ */ b.jsx("button", { type: "button", className: "fub-mini-btn", onClick: h, disabled: p, children: "+ State" }),
            /* @__PURE__ */ b.jsx("button", { type: "button", className: "fub-mini-btn", onClick: g, disabled: p, children: "+ Transition" })
          ] }),
          /* @__PURE__ */ b.jsxs("section", { className: "fub-section", children: [
            /* @__PURE__ */ b.jsx("h3", { children: "States" }),
            /* @__PURE__ */ b.jsx("ul", { children: r.map((m, v) => /* @__PURE__ */ b.jsx("li", { children: /* @__PURE__ */ b.jsxs(
              "button",
              {
                type: "button",
                className: `fub-list-item${K0(wT(c, v))}`,
                onClick: () => f({ kind: "state", stateIndex: v }),
                children: [
                  /* @__PURE__ */ b.jsx("span", { className: "fub-item-main", children: m.name || "(unnamed)" }),
                  /* @__PURE__ */ b.jsxs("span", { className: "fub-item-meta", children: [
                    m.initial ? "initial" : "",
                    m.terminal ? " final" : ""
                  ] })
                ]
              }
            ) }, `state-${v}`)) })
          ] }),
          /* @__PURE__ */ b.jsxs("section", { className: "fub-section", children: [
            /* @__PURE__ */ b.jsx("h3", { children: "Transitions" }),
            /* @__PURE__ */ b.jsx("ul", { children: s.map((m, v) => /* @__PURE__ */ b.jsx("li", { children: /* @__PURE__ */ b.jsxs(
              "button",
              {
                type: "button",
                className: `fub-list-item${K0(ST(c, v))}`,
                onClick: () => f({ kind: "transition", transitionIndex: v }),
                children: [
                  /* @__PURE__ */ b.jsx("span", { className: "fub-item-main", children: m.id || `transition-${v + 1}` }),
                  /* @__PURE__ */ b.jsx("span", { className: "fub-item-meta", children: B1(m) })
                ]
              }
            ) }, m.id || `transition-${v}`)) })
          ] })
        ] }) })
      ]
    }
  );
}
function NT(n) {
  const [i, l] = ee.useState(!1), r = ee.useRef(null), s = ee.useRef(null), c = ee.useRef(null), [f, h] = ee.useState(-1), g = ee.useCallback(() => {
    l(!1), h(-1);
  }, []), p = ee.useCallback(() => {
    n.disabled || (l(!0), h(0));
  }, [n.disabled]), y = ee.useCallback(() => {
    i ? g() : p();
  }, [g, i, p]);
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
  const m = ee.useCallback(
    (x) => {
      if (!i) {
        (x.key === "Enter" || x.key === " " || x.key === "ArrowDown") && (x.preventDefault(), p());
        return;
      }
      const S = n.items.filter((T) => !T.disabled), C = n.items.map((T, A) => ({ item: T, index: A })).filter(({ item: T }) => !T.disabled).map(({ index: T }) => T);
      switch (x.key) {
        case "Escape":
          x.preventDefault(), g(), c.current?.focus();
          break;
        case "ArrowDown":
          if (x.preventDefault(), S.length > 0) {
            const A = (C.indexOf(f) + 1) % C.length;
            h(C[A]);
          }
          break;
        case "ArrowUp":
          if (x.preventDefault(), S.length > 0) {
            const T = C.indexOf(f), A = T <= 0 ? C.length - 1 : T - 1;
            h(C[A]);
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
    [g, f, i, p, n.items]
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
        onKeyDown: m,
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
        onKeyDown: m,
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
function CT() {
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
function MT() {
  return /* @__PURE__ */ b.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ b.jsx("path", { d: "M3 7h6a4 4 0 0 1 0 8H7" }),
    /* @__PURE__ */ b.jsx("path", { d: "M5 4L2 7l3 3" })
  ] });
}
function TT() {
  return /* @__PURE__ */ b.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ b.jsx("path", { d: "M13 7H7a4 4 0 0 0 0 8h2" }),
    /* @__PURE__ */ b.jsx("path", { d: "M11 4l3 3-3 3" })
  ] });
}
function jT() {
  return /* @__PURE__ */ b.jsx("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "currentColor", children: /* @__PURE__ */ b.jsx("path", { d: "M3 2.5v9l8-4.5-8-4.5z" }) });
}
function W0() {
  return /* @__PURE__ */ b.jsx("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ b.jsx("path", { d: "M7 2v7M4 6l3 3 3-3M2 11h10" }) });
}
function AT() {
  return /* @__PURE__ */ b.jsxs("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ b.jsx("path", { d: "M2 7a5 5 0 0 1 9-3M12 7a5 5 0 0 1-9 3" }),
    /* @__PURE__ */ b.jsx("path", { d: "M2 3v4h4M12 11V7H8" })
  ] });
}
function DT() {
  return /* @__PURE__ */ b.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ b.jsx("rect", { x: "2", y: "3", width: "12", height: "10", rx: "1" }),
    /* @__PURE__ */ b.jsx("path", { d: "M6 3v10" })
  ] });
}
function OT() {
  return /* @__PURE__ */ b.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ b.jsx("rect", { x: "2", y: "3", width: "12", height: "10", rx: "1" }),
    /* @__PURE__ */ b.jsx("path", { d: "M10 3v10" })
  ] });
}
function zT() {
  return /* @__PURE__ */ b.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ b.jsx("rect", { x: "2", y: "3", width: "12", height: "10", rx: "1" }),
    /* @__PURE__ */ b.jsx("path", { d: "M5 7l2 2-2 2" }),
    /* @__PURE__ */ b.jsx("path", { d: "M9 11h2" })
  ] });
}
function RT() {
  return /* @__PURE__ */ b.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ b.jsx("circle", { cx: "8", cy: "8", r: "3" }),
    /* @__PURE__ */ b.jsx("path", { d: "M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.4 1.4M11.55 11.55l1.4 1.4M3.05 12.95l1.4-1.4M11.55 4.45l1.4-1.4" })
  ] });
}
function kT() {
  return /* @__PURE__ */ b.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ b.jsx("path", { d: "M13.5 8.5a6 6 0 1 1-6-6c.3 0 .5.2.4.5-.3.8-.4 1.7-.4 2.5a5 5 0 0 0 5 5c.8 0 1.7-.1 2.5-.4.3-.1.5.1.5.4z" }) });
}
const HT = new Intl.DateTimeFormat(void 0, {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
});
function BT(n, i) {
  const l = n?.updatedAt && !Number.isNaN(Date.parse(n.updatedAt)) ? HT.format(new Date(n.updatedAt)) : void 0;
  return i ? n?.state === "saving" && n.source === "autosave" ? "Unsaved changes (autosaving...)" : n?.state === "saved" && n.source === "autosave" && l ? `Unsaved changes (autosaved ${l})` : n?.state === "error" && n.source === "autosave" ? `Unsaved changes (autosave failed: ${n.message ?? "internal error"})` : "Unsaved changes" : n?.state === "saving" ? "Saving..." : n?.state === "saved" && l ? `Saved ${l}` : n?.state === "error" ? `Save failed: ${n.message ?? "internal error"}` : "";
}
function F0(n) {
  const i = be((X) => X.document.definition.name), l = be((X) => X.isDirty), r = be((X) => X.diagnostics.length), s = be((X) => X.setMachineName), c = be((X) => X.undo), f = be((X) => X.redo), h = be((X) => X.historyIndex), g = be((X) => X.history.length), p = He((X) => X.togglePanel), y = He((X) => X.theme), m = He((X) => X.toggleTheme), v = He((X) => X.explorerCollapsed), x = He((X) => X.inspectorCollapsed), S = He((X) => X.consoleCollapsed), [C, T] = ee.useState(null), A = BT(n.saveStatus, l), D = n.saveStatus?.state === "error" ? " fub-save-status-error" : n.saveStatus?.state === "saving" ? " fub-save-status-saving" : "", E = (X, te) => {
    if (!(!te || typeof te != "function"))
      try {
        const K = te();
        K instanceof Promise && (T(X), K.finally(() => {
          T((V) => V === X ? null : V);
        }));
      } catch {
        T((K) => K === X ? null : K);
      }
  }, M = n.authoringAvailable ? "Save Draft" : "Save", H = !!n.readOnly, U = [
    {
      label: "Recover Draft",
      onClick: () => E("recover", n.onRecoverDraft),
      disabled: H || !n.recoveryAvailable || !!C,
      icon: /* @__PURE__ */ b.jsx(AT, {})
    },
    {
      label: "Export JSON",
      onClick: () => E("export-json", n.onExportJSON),
      disabled: !!C,
      icon: /* @__PURE__ */ b.jsx(W0, {})
    },
    {
      label: "Export RPC",
      onClick: () => E("export-rpc", n.onExportRPC),
      disabled: !!C || !n.rpcExportAvailable,
      icon: /* @__PURE__ */ b.jsx(W0, {})
    }
  ], Y = (X) => {
    n.onPanelToggle ? n.onPanelToggle(X) : p(X);
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
            readOnly: H,
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
            icon: /* @__PURE__ */ b.jsx(MT, {}),
            onClick: c,
            disabled: H || h === 0 || !!C,
            ariaLabel: "Undo",
            title: "Undo (Ctrl+Z)"
          }
        ),
        /* @__PURE__ */ b.jsx(
          lo,
          {
            icon: /* @__PURE__ */ b.jsx(TT, {}),
            onClick: f,
            disabled: H || h >= g - 1 || !!C,
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
            disabled: H || !!C,
            "aria-keyshortcuts": "Control+S Meta+S",
            children: C === "save" ? "Saving..." : M
          }
        ),
        /* @__PURE__ */ b.jsx(
          "button",
          {
            type: "button",
            className: "fub-btn fub-btn-secondary",
            onClick: () => E("validate", n.onValidate),
            disabled: H || !!C,
            "aria-keyshortcuts": "Control+Enter Meta+Enter",
            children: C === "validate" ? "Validating..." : "Validate"
          }
        )
      ] }),
      /* @__PURE__ */ b.jsx("div", { className: "fub-header-separator", "aria-hidden": "true" }),
      /* @__PURE__ */ b.jsx(
        NT,
        {
          trigger: /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
            "More ",
            /* @__PURE__ */ b.jsx(CT, {})
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
            /* @__PURE__ */ b.jsx(jT, {}),
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
            icon: /* @__PURE__ */ b.jsx(DT, {}),
            onClick: () => Y("explorer"),
            ariaLabel: v ? "Show Explorer" : "Hide Explorer",
            title: v ? "Show Explorer" : "Hide Explorer",
            className: v ? "" : "fub-icon-btn--active"
          }
        ),
        /* @__PURE__ */ b.jsx(
          lo,
          {
            icon: /* @__PURE__ */ b.jsx(OT, {}),
            onClick: () => Y("inspector"),
            ariaLabel: x ? "Show Inspector" : "Hide Inspector",
            title: x ? "Show Inspector" : "Hide Inspector",
            className: x ? "" : "fub-icon-btn--active"
          }
        ),
        /* @__PURE__ */ b.jsx(
          lo,
          {
            icon: /* @__PURE__ */ b.jsx(zT, {}),
            onClick: () => Y("console"),
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
          icon: y === "light" ? /* @__PURE__ */ b.jsx(kT, {}) : /* @__PURE__ */ b.jsx(RT, {}),
          onClick: m,
          ariaLabel: y === "light" ? "Switch to dark theme" : "Switch to light theme",
          title: y === "light" ? "Switch to dark theme" : "Switch to light theme"
        }
      ),
      A && /* @__PURE__ */ b.jsx("span", { className: `fub-save-status${D}`, role: "status", "aria-live": "polite", children: A })
    ] })
  ] });
}
function vn(n) {
  return n.messages.length === 0 ? null : /* @__PURE__ */ b.jsx("ul", { className: "fub-inline-diags", role: "alert", children: n.messages.map((i, l) => /* @__PURE__ */ b.jsx("li", { children: i }, `${i}-${l}`)) });
}
function $n(n) {
  return n.map((i) => i.message);
}
function LT(n) {
  return n.dynamic_to ? "dynamic" : "static";
}
function UT(n) {
  return n.kind === "step" ? `step:${n.step?.action_id || "(action_id)"}` : n.kind === "when" ? `when:${n.expr || "(expr)"}` : `${n.kind}: unsupported`;
}
function VT(n) {
  return JSON.stringify(n ?? {}, null, 2);
}
function YT(n) {
  if (n.trim() === "")
    return { value: {} };
  try {
    const i = JSON.parse(n);
    return !i || typeof i != "object" || Array.isArray(i) ? { error: "metadata must be a JSON object" } : { value: i };
  } catch {
    return { error: "metadata must be valid JSON" };
  }
}
function IT(n) {
  const i = ee.useMemo(() => VT(n.metadata), [n.metadata]), [l, r] = ee.useState(i), [s, c] = ee.useState(null);
  ee.useEffect(() => {
    r(i), c(null);
  }, [i]);
  const f = () => {
    if (n.readOnly)
      return;
    const h = YT(l);
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
function qT(n) {
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
function P0(n) {
  const i = be((D) => D.document.definition), l = be((D) => D.selection), r = be((D) => D.diagnostics), s = be((D) => D.removeState), c = be((D) => D.updateStateName), f = be((D) => D.updateStateFlag), h = be((D) => D.removeTransition), g = be((D) => D.updateTransition), p = be((D) => D.updateTransitionTargetKind), y = be((D) => D.addWorkflowNode), m = be((D) => D.removeWorkflowNode), v = be((D) => D.selectWorkflowNode), x = be((D) => D.updateWorkflowNodeField), S = be((D) => D.updateWorkflowNodeMetadata), C = L1(r, l), T = qT(n.actionCatalogProvider), A = !!n.readOnly;
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
                disabled: A,
                children: "Delete"
              }
            )
          ] }),
          /* @__PURE__ */ b.jsxs("div", { className: "fub-panel-body", children: [
            A ? /* @__PURE__ */ b.jsx("p", { className: "fub-readonly-note", children: "Read-only mode: editing is disabled in narrow/mobile layout." }) : null,
            /* @__PURE__ */ b.jsxs("label", { className: "fub-field", children: [
              /* @__PURE__ */ b.jsx("span", { children: "Name" }),
              /* @__PURE__ */ b.jsx(
                "input",
                {
                  "aria-label": "State name",
                  className: "fub-input",
                  value: D.name,
                  readOnly: A,
                  onChange: (E) => c(l.stateIndex, E.target.value)
                }
              ),
              /* @__PURE__ */ b.jsx(
                vn,
                {
                  messages: $n(
                    gs(r, l, "name")
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
                  disabled: A,
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
                  disabled: A,
                  onChange: (E) => f(l.stateIndex, "terminal", E.target.checked)
                }
              ),
              "Final"
            ] }),
            /* @__PURE__ */ b.jsx(vn, { messages: $n(C) })
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
    const E = LT(D);
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
                disabled: A,
                children: "Delete"
              }
            )
          ] }),
          /* @__PURE__ */ b.jsxs("div", { className: "fub-panel-body", children: [
            A ? /* @__PURE__ */ b.jsx("p", { className: "fub-readonly-note", children: "Read-only mode: editing is disabled in narrow/mobile layout." }) : null,
            /* @__PURE__ */ b.jsxs("label", { className: "fub-field", children: [
              /* @__PURE__ */ b.jsx("span", { children: "Event" }),
              /* @__PURE__ */ b.jsx(
                "input",
                {
                  "aria-label": "Transition event",
                  className: "fub-input",
                  value: D.event,
                  readOnly: A,
                  onChange: (M) => g(l.transitionIndex, "event", M.target.value)
                }
              ),
              /* @__PURE__ */ b.jsx(
                vn,
                {
                  messages: $n(
                    gs(r, l, "event")
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
                  disabled: A,
                  onChange: (M) => g(l.transitionIndex, "from", M.target.value),
                  children: i.states.map((M, H) => /* @__PURE__ */ b.jsx("option", { value: M.name, children: M.name }, `${M.name}-${H}`))
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
                    disabled: A,
                    onChange: () => p(l.transitionIndex, "static")
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
                    disabled: A,
                    onChange: () => p(l.transitionIndex, "dynamic")
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
                  disabled: A,
                  onChange: (M) => g(l.transitionIndex, "to", M.target.value),
                  children: i.states.map((M, H) => /* @__PURE__ */ b.jsx("option", { value: M.name, children: M.name }, `${M.name}-target-${H}`))
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
                  readOnly: A,
                  onChange: (M) => g(l.transitionIndex, "dynamic_to.resolver", M.target.value)
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
                      disabled: A,
                      children: "+ Step"
                    }
                  ),
                  /* @__PURE__ */ b.jsx(
                    "button",
                    {
                      type: "button",
                      className: "fub-mini-btn",
                      onClick: () => y(l.transitionIndex, "when"),
                      disabled: A,
                      children: "+ When"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ b.jsx("ul", { children: D.workflow.nodes.map((M, H) => /* @__PURE__ */ b.jsx("li", { children: /* @__PURE__ */ b.jsxs(
                "button",
                {
                  type: "button",
                  className: "fub-list-item",
                  onClick: () => v(l.transitionIndex, H),
                  children: [
                    /* @__PURE__ */ b.jsx("span", { children: UT(M) }),
                    Bs(M.kind) ? null : /* @__PURE__ */ b.jsx("span", { className: "fub-item-meta", children: "unsupported" })
                  ]
                }
              ) }, M.id || `${M.kind}-${H}`)) })
            ] }),
            /* @__PURE__ */ b.jsx(vn, { messages: $n(C) })
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
    if (!Bs(E.kind))
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
                cy.join(", ")
              ] }),
              /* @__PURE__ */ b.jsx(vn, { messages: $n(C) })
            ] })
          ]
        }
      );
    const M = `fub-action-catalog-${l.transitionIndex}-${l.nodeIndex}`;
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
                onClick: () => m(l.transitionIndex, l.nodeIndex),
                disabled: A,
                children: "Delete"
              }
            )
          ] }),
          /* @__PURE__ */ b.jsxs("div", { className: "fub-panel-body", children: [
            A ? /* @__PURE__ */ b.jsx("p", { className: "fub-readonly-note", children: "Read-only mode: editing is disabled in narrow/mobile layout." }) : null,
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
                    list: T.actions.length > 0 ? M : void 0,
                    value: E.step?.action_id ?? "",
                    readOnly: A,
                    onChange: (H) => x(l.transitionIndex, l.nodeIndex, "action_id", H.target.value)
                  }
                ),
                T.actions.length > 0 ? /* @__PURE__ */ b.jsx("datalist", { id: M, children: T.actions.map((H) => /* @__PURE__ */ b.jsx("option", { value: H.id, children: H.label ?? H.id }, H.id)) }) : null,
                T.unavailableReason ? /* @__PURE__ */ b.jsx("p", { className: "fub-muted", children: T.unavailableReason }) : null,
                /* @__PURE__ */ b.jsx(
                  vn,
                  {
                    messages: $n(
                      gs(r, l, "action_id")
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
                    disabled: A,
                    onChange: (H) => x(l.transitionIndex, l.nodeIndex, "async", H.target.checked)
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
                    readOnly: A,
                    onChange: (H) => x(l.transitionIndex, l.nodeIndex, "delay", H.target.value)
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
                    readOnly: A,
                    onChange: (H) => x(l.transitionIndex, l.nodeIndex, "timeout", H.target.value)
                  }
                )
              ] }),
              /* @__PURE__ */ b.jsx(
                IT,
                {
                  metadata: E.step?.metadata,
                  readOnly: A,
                  onCommit: (H) => S(l.transitionIndex, l.nodeIndex, H)
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
                  readOnly: A,
                  onChange: (H) => x(l.transitionIndex, l.nodeIndex, "expr", H.target.value)
                }
              ),
              /* @__PURE__ */ b.jsx(
                vn,
                {
                  messages: $n(
                    gs(r, l, "expr")
                  )
                }
              )
            ] }),
            /* @__PURE__ */ b.jsx(vn, { messages: $n(C) })
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
          /* @__PURE__ */ b.jsx(vn, { messages: $n(C) })
        ] })
      ]
    }
  );
}
const XT = [
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
function GT(n, i) {
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
function ey(n) {
  const i = ee.useRef(null), l = ee.useRef(null), r = ee.useMemo(() => XT, []);
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
        GT(c, i.current);
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
function ZT(n) {
  return n === "explorer" ? "fub-panel-explorer" : n === "canvas" ? "fub-panel-canvas" : n === "inspector" ? "fub-panel-inspector" : "fub-panel-console";
}
function ty(n) {
  return `fub-mobile-tab-${n}`;
}
function ny(n) {
  return `fub-mobile-tabpanel-${n}`;
}
function $T(n) {
  const i = He((I) => I.explorerWidth), l = He((I) => I.inspectorWidth), r = He((I) => I.consoleHeight), s = He((I) => I.explorerCollapsed), c = He((I) => I.inspectorCollapsed), f = He((I) => I.consoleCollapsed), h = He((I) => I.mobilePanel), g = He((I) => I.keyboardHelpOpen), p = He((I) => I.togglePanel), y = He((I) => I.setPanelCollapsed), m = He((I) => I.setMobilePanel), v = He((I) => I.setKeyboardHelpOpen), x = He((I) => I.toggleKeyboardHelp), S = He((I) => I.theme), C = be((I) => I.document.definition), T = be((I) => I.diagnostics), A = Ft((I) => I.log), D = Ft((I) => I.errors), E = Ft((I) => I.projectedOutcome), M = ee.useMemo(() => H1(C), [C]), H = yw(), U = H === "mobile-readonly", Y = Hf("explorer"), X = Hf("inspector"), te = Hf("console"), K = ee.useCallback((I) => {
    I && I();
  }, []), V = ee.useCallback((I) => {
    const j = () => {
      document.getElementById(ZT(I))?.focus();
    };
    if (typeof window.requestAnimationFrame == "function") {
      window.requestAnimationFrame(j);
      return;
    }
    window.setTimeout(j, 0);
  }, []), Q = ee.useCallback(
    (I) => {
      H === "mobile-readonly" ? m(I) : (I === "explorer" && y("explorer", !1), I === "inspector" && y("inspector", !1), I === "console" && y("console", !1)), V(I);
    },
    [V, m, y, H]
  ), J = ee.useCallback(
    (I) => {
      H === "mobile-readonly" ? m(I) : p(I), V(I);
    },
    [V, m, p, H]
  ), N = ee.useCallback(() => {
    if (H === "mobile-readonly") {
      m("console");
      return;
    }
    p("console");
  }, [m, p, H]), L = ee.useCallback(() => {
    v(!1);
  }, [v]);
  mw({
    onSave: () => K(n.onSave),
    onValidate: () => K(n.onValidate),
    onFocusPanel: Q,
    onToggleConsole: N,
    keyboardHelpOpen: g,
    onToggleKeyboardHelp: x,
    onCloseKeyboardHelp: L,
    readOnly: U
  }), ee.useEffect(() => {
    H === "compact" && y("explorer", !0);
  }, [y, H]);
  const _ = ee.useMemo(() => {
    const I = s ? "0px" : `${i}px`, j = c ? "0px" : `${l}px`;
    return `${I} ${s ? "0px" : "6px"} minmax(420px,1fr) ${c ? "0px" : "6px"} ${j}`;
  }, [s, i, c, l]), k = ee.useMemo(() => {
    const I = M.length > 0 ? "32px" : "0px", j = f ? "0px" : `${r}px`;
    return `48px ${I} minmax(360px,1fr) ${f ? "0px" : "6px"} ${j}`;
  }, [f, r, M.length]), B = ee.useMemo(() => T.length === 0 ? "No diagnostics." : T.length === 1 ? "1 diagnostic in problems panel." : `${T.length} diagnostics in problems panel.`, [T.length]), Z = ee.useMemo(() => {
    const I = D.at(-1);
    return I ? `Simulation error ${I.code}: ${I.message}` : E ? `Projected ${E.event}: ${E.previousState} to ${E.currentState}.` : A.at(-1)?.message ?? "Simulation idle.";
  }, [E, D, A]);
  return H === "mobile-readonly" ? /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
    /* @__PURE__ */ b.jsxs("div", { className: "fub-root fub-root-mobile", "data-theme": S, children: [
      /* @__PURE__ */ b.jsx("div", { className: "fub-slot-header", children: /* @__PURE__ */ b.jsx(F0, { ...n, readOnly: !0, onPanelToggle: J }) }),
      M.length > 0 ? /* @__PURE__ */ b.jsxs("div", { className: "fub-guardrail-banner", role: "status", "aria-live": "polite", children: [
        "Unsupported workflow nodes are read-only: ",
        M.join(", ")
      ] }) : null,
      /* @__PURE__ */ b.jsx("div", { className: "fub-mobile-warning", role: "status", "aria-live": "polite", children: "Narrow/mobile mode is reduced-capability and read-only. Use desktop width for full authoring." }),
      /* @__PURE__ */ b.jsx("nav", { className: "fub-mobile-tabs", role: "tablist", "aria-label": "Builder panels", children: ["explorer", "canvas", "inspector", "console"].map((I) => /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          role: "tab",
          id: ty(I),
          "aria-controls": ny(I),
          "aria-selected": h === I,
          tabIndex: h === I ? 0 : -1,
          className: `fub-mobile-tab${h === I ? " is-active" : ""}`,
          onClick: () => m(I),
          children: I
        },
        I
      )) }),
      /* @__PURE__ */ b.jsxs(
        "div",
        {
          className: "fub-mobile-panel",
          role: "tabpanel",
          id: ny(h),
          "aria-labelledby": ty(h),
          children: [
            h === "explorer" ? /* @__PURE__ */ b.jsx(J0, { readOnly: !0 }) : null,
            h === "canvas" ? /* @__PURE__ */ b.jsx(Z0, { readOnly: !0 }) : null,
            h === "inspector" ? /* @__PURE__ */ b.jsx(P0, { actionCatalogProvider: n.actionCatalogProvider, readOnly: !0 }) : null,
            h === "console" ? /* @__PURE__ */ b.jsx($0, {}) : null
          ]
        }
      ),
      /* @__PURE__ */ b.jsx("div", { className: "fub-sr-only", role: "status", "aria-live": "polite", "aria-atomic": "true", children: B }),
      /* @__PURE__ */ b.jsx("div", { className: "fub-sr-only", role: "status", "aria-live": "polite", "aria-atomic": "true", children: Z })
    ] }),
    /* @__PURE__ */ b.jsx(ey, { open: g, onClose: L })
  ] }) : /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
    /* @__PURE__ */ b.jsxs("div", { className: "fub-root", "data-theme": S, style: { gridTemplateColumns: _, gridTemplateRows: k }, children: [
      /* @__PURE__ */ b.jsx("div", { className: "fub-slot-header", style: { gridColumn: "1 / -1" }, children: /* @__PURE__ */ b.jsx(F0, { ...n, readOnly: !1, onPanelToggle: J }) }),
      M.length > 0 ? /* @__PURE__ */ b.jsxs("div", { className: "fub-guardrail-banner", style: { gridColumn: "1 / -1" }, role: "status", "aria-live": "polite", children: [
        "Unsupported workflow nodes are read-only: ",
        M.join(", ")
      ] }) : null,
      s ? null : /* @__PURE__ */ b.jsx(J0, { readOnly: !1 }),
      s ? null : /* @__PURE__ */ b.jsx(
        "div",
        {
          className: "fub-resizer fub-resizer-vertical",
          role: "separator",
          "aria-label": "Resize explorer",
          onPointerDown: Y
        }
      ),
      /* @__PURE__ */ b.jsx(Z0, { readOnly: !1 }),
      c ? null : /* @__PURE__ */ b.jsx(
        "div",
        {
          className: "fub-resizer fub-resizer-vertical",
          role: "separator",
          "aria-label": "Resize inspector",
          onPointerDown: X
        }
      ),
      c ? null : /* @__PURE__ */ b.jsx(P0, { actionCatalogProvider: n.actionCatalogProvider, readOnly: !1 }),
      f ? null : /* @__PURE__ */ b.jsx(
        "div",
        {
          className: "fub-resizer fub-resizer-horizontal",
          role: "separator",
          "aria-label": "Resize console",
          onPointerDown: te,
          style: { gridColumn: "1 / -1" }
        }
      ),
      f ? null : /* @__PURE__ */ b.jsx("div", { className: "fub-slot-console", style: { gridColumn: "1 / -1" }, children: /* @__PURE__ */ b.jsx($0, {}) }),
      /* @__PURE__ */ b.jsx("div", { className: "fub-sr-only", role: "status", "aria-live": "polite", "aria-atomic": "true", children: B }),
      /* @__PURE__ */ b.jsx("div", { className: "fub-sr-only", role: "status", "aria-live": "polite", "aria-atomic": "true", children: Z })
    ] }),
    /* @__PURE__ */ b.jsx(ey, { open: g, onClose: L })
  ] });
}
const QT = new Set(Object.values(si));
function Wf(n) {
  return typeof n == "string" && QT.has(n) ? n : si.internal;
}
function Ts(n) {
  return typeof n == "string" && n.trim() !== "" ? n : "internal error";
}
function KT(n) {
  return n && typeof n == "object" && !Array.isArray(n) ? n : null;
}
function JT(n) {
  return n instanceof Error ? n : null;
}
function js(n) {
  if (n instanceof uy)
    return {
      code: Wf(n.envelope.code),
      message: Ts(n.envelope.message),
      method: n.method
    };
  if (n instanceof Hs)
    return {
      code: Wf(n.code),
      message: Ts(n.message),
      method: n.method
    };
  const i = KT(n);
  if (i)
    return {
      code: Wf(i.code),
      message: Ts(i.message),
      method: typeof i.method == "string" ? i.method : void 0
    };
  const l = JT(n);
  return l ? {
    code: si.internal,
    message: Ts(l.message)
  } : {
    code: si.internal,
    message: "internal error"
  };
}
function fj(n) {
  return `${n.method ? `${n.method}: ` : ""}[${n.code}] ${n.message}`;
}
function WT(n) {
  return {
    async applyEventDryRun(i, l) {
      const r = await Aa({
        client: n,
        method: _l.applyEvent,
        data: i,
        meta: l
      });
      return py(r);
    },
    async snapshot(i, l) {
      const r = await Aa({
        client: n,
        method: _l.snapshot,
        data: i,
        meta: l
      });
      return yy(r);
    }
  };
}
function FT(n) {
  return ee.useMemo(() => n ? WT(n) : null, [n]);
}
function Fs(n) {
  return n !== null && typeof n == "object" && !Array.isArray(n);
}
function PT(n, i, l, r) {
  if (Fs(i)) {
    const s = ["id", "name", "machineId", "event"];
    for (const c of s) {
      const f = i[c];
      if (!(typeof f != "string" || f.trim() === ""))
        for (let h = 0; h < n.length; h += 1) {
          if (r.has(h))
            continue;
          const g = n[h];
          if (Fs(g) && g[c] === f)
            return r.add(h), g;
        }
    }
  }
  if (l < n.length)
    return r.add(l), n[l];
}
function md(n, i) {
  if (Array.isArray(i)) {
    const l = Array.isArray(n) ? n : [], r = /* @__PURE__ */ new Set();
    return i.map((s, c) => md(PT(l, s, c, r), s));
  }
  if (Fs(i)) {
    const l = Fs(n) ? n : {}, r = {};
    for (const [s, c] of Object.entries(l))
      r[s] = Xe(c);
    for (const [s, c] of Object.entries(i))
      r[s] = md(l[s], c);
    return r;
  }
  return Xe(i);
}
function pd(n) {
  return Xe(n);
}
function ej(n) {
  return md(n.baseDocument, n.editedDocument);
}
function tj(n) {
  return `${n}-preview`;
}
function nj(n) {
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
function aj(n) {
  const i = be((G) => G.document), l = be((G) => G.diagnostics), r = be((G) => G.isDirty), s = be((G) => G.selection), c = be((G) => G.replaceDocument), f = be((G) => G.setDiagnostics), h = be((G) => G.markSaved), g = be((G) => G.applyRemoteSave), p = Ft((G) => G.setApplyEventWirePayload), y = Ft((G) => G.setSnapshotWirePayload), m = Ft((G) => G.pushError), v = Ft((G) => G.pushInfo), x = FT(n.rpcClient ?? null), S = j1(n.rpcClient ?? null), C = n.runtimeRPC ?? x, T = n.authoringRPC ?? S, A = ee.useMemo(
    () => n.persistenceStore ?? Z1(),
    [n.persistenceStore]
  ), D = ee.useMemo(
    () => n.exportAdapter ?? z1(),
    [n.exportAdapter]
  ), E = (n.machineId?.trim() || i.definition.id || "machine").trim(), M = n.simulationDefaults?.entityId ?? tj(E), H = n.simulationDefaults?.msg ?? {}, U = n.simulationDefaults?.meta, Y = n.autosaveDebounceMs ?? 400, X = ee.useRef(null);
  X.current === null && (X.current = JSON.stringify(i));
  const te = ee.useRef(pd(i)), [K, V] = ee.useState(null), [Q, J] = ee.useState({ state: "idle" }), N = ee.useCallback(() => ej({
    baseDocument: te.current,
    editedDocument: i
  }), [i]), L = ee.useCallback(
    (G) => {
      const R = js(G);
      m({
        code: R.code,
        message: R.message,
        method: R.method
      });
    },
    [m]
  ), _ = ee.useCallback((G, R) => {
    const O = js(R);
    J({
      state: "error",
      source: G,
      message: O.message,
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
    let G = !1;
    return A.load(E).then((R) => {
      if (G)
        return;
      if (!R) {
        V(null);
        return;
      }
      const O = X.current ?? "", $ = JSON.stringify(R.document);
      V($ === O ? null : R);
    }).catch((R) => {
      if (G)
        return;
      const O = js(R);
      m({
        code: O.code,
        message: `autosave recovery failed: ${O.message}`,
        method: O.method
      });
    }), () => {
      G = !0;
    };
  }, [E, A, m]), ee.useEffect(() => {
    if (!r)
      return;
    const G = window.setTimeout(() => {
      J({
        state: "saving",
        source: "autosave",
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      });
      const R = N();
      A.save({
        machineId: E,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
        document: R
      }).then(() => {
        J({
          state: "saved",
          source: "autosave",
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        }), v("Autosaved draft to persistence store.");
      }).catch((O) => {
        _("autosave", O);
        const $ = js(O);
        m({
          code: $.code,
          message: `autosave failed: ${$.message}`,
          method: $.method
        });
      });
    }, Y);
    return () => {
      window.clearTimeout(G);
    };
  }, [
    Y,
    N,
    r,
    E,
    _,
    A,
    m,
    v
  ]);
  const k = ee.useCallback(async () => {
    if (!C) {
      m({
        code: si.internal,
        method: _l.applyEvent,
        message: "runtime adapter unavailable"
      });
      return;
    }
    const G = nj({
      selection: s,
      transitions: i.definition.transitions
    });
    if (!G) {
      m({
        code: si.invalidTransition,
        method: _l.applyEvent,
        message: "no transition available for simulation"
      });
      return;
    }
    if (G.event.trim() === "") {
      m({
        code: si.invalidTransition,
        method: _l.applyEvent,
        message: "selected transition must define an event"
      });
      return;
    }
    try {
      const R = await C.applyEventDryRun(
        {
          machineId: E,
          entityId: M,
          event: G.event,
          msg: H,
          expectedState: G.from,
          dryRun: !0
        },
        U
      );
      p(R, {
        event: G.event,
        transitionId: G.id
      });
      const O = await C.snapshot(
        {
          machineId: E,
          entityId: M,
          msg: H,
          evaluateGuards: !0,
          includeBlocked: !0
        },
        U
      );
      y(O);
    } catch (R) {
      L(R);
    }
  }, [
    i.definition.transitions,
    L,
    E,
    m,
    C,
    s,
    p,
    y,
    M,
    H,
    U
  ]), B = ee.useCallback(async () => {
    const G = N();
    if (!T) {
      const R = gy(G.definition);
      f(R), v("Authoring RPC unavailable. Used local validation only.");
      return;
    }
    try {
      const R = await T.validate({
        machineId: E,
        draft: G
      });
      f(R.diagnostics), v(`Validation completed. valid=${R.valid}`);
    } catch (R) {
      L(R);
    }
  }, [T, N, L, E, v, f]), Z = ee.useCallback(async () => {
    J({
      state: "saving",
      source: "manual",
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
    const G = N();
    if (!T) {
      try {
        await A.save({
          machineId: E,
          updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
          document: Xe(G)
        }), h(), te.current = Xe(G), V(null), J({
          state: "saved",
          source: "manual",
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        }), v("Saved locally (authoring RPC unavailable).");
      } catch (R) {
        _("manual", R), L(R);
      }
      return;
    }
    try {
      const R = await T.saveDraft({
        machineId: E,
        baseVersion: G.definition.version,
        draft: G,
        validate: !0
      });
      g(R.version, R.draftState, R.diagnostics);
      const O = {
        ...Xe(G),
        definition: {
          ...Xe(G.definition),
          version: R.version
        },
        draft_state: Xe(R.draftState)
      };
      te.current = Xe(O), await A.save({
        machineId: E,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
        document: O
      }), V(null), J({
        state: "saved",
        source: "manual",
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      }), v("Draft saved through authoring RPC.");
    } catch (R) {
      _("manual", R), L(R);
    }
  }, [
    g,
    T,
    N,
    L,
    _,
    E,
    h,
    A,
    v
  ]), I = ee.useCallback(async () => {
    if (!K) {
      v("No autosaved draft to recover.");
      return;
    }
    const G = pd(K.document);
    c(G), te.current = Xe(G), V(null), v("Recovered autosaved draft.");
  }, [v, K, c]), j = ee.useCallback(async () => {
    try {
      await D.exportJSON({
        machineId: E,
        draft: N()
      }), v("Exported machine definition as JSON.");
    } catch (G) {
      L(G);
    }
  }, [N, D, L, E, v]), q = ee.useCallback(async () => {
    if (!D.exportRPC) {
      v("RPC export unavailable. Configure ExportAdapter.exportRPC to enable this capability.");
      return;
    }
    try {
      await D.exportRPC({
        machineId: E,
        draft: N()
      }), v("Exported machine definition through RPC adapter.");
    } catch (G) {
      L(G);
    }
  }, [N, D, L, E, v]);
  return /* @__PURE__ */ b.jsx(
    $T,
    {
      onSave: Z,
      onValidate: B,
      onSimulate: k,
      onRecoverDraft: I,
      onExportJSON: j,
      onExportRPC: q,
      runtimeAvailable: !!C,
      authoringAvailable: !!T,
      recoveryAvailable: !!K,
      rpcExportAvailable: R1(D),
      actionCatalogProvider: n.actionCatalogProvider,
      saveStatus: Q
    }
  );
}
function ij(n) {
  const i = ee.useMemo(
    () => pd(n.initialDocument ?? dy()),
    [n.initialDocument]
  );
  return /* @__PURE__ */ b.jsx(
    hw,
    {
      initialDocument: i,
      initialDiagnostics: n.initialDiagnostics,
      children: /* @__PURE__ */ b.jsx(aj, { ...n })
    }
  );
}
var Ff = { exports: {} }, pl = {}, Pf = { exports: {} }, ed = {};
var ay;
function oj() {
  return ay || (ay = 1, (function(n) {
    function i(_, k) {
      var B = _.length;
      _.push(k);
      e: for (; 0 < B; ) {
        var Z = B - 1 >>> 1, I = _[Z];
        if (0 < s(I, k))
          _[Z] = k, _[B] = I, B = Z;
        else break e;
      }
    }
    function l(_) {
      return _.length === 0 ? null : _[0];
    }
    function r(_) {
      if (_.length === 0) return null;
      var k = _[0], B = _.pop();
      if (B !== k) {
        _[0] = B;
        e: for (var Z = 0, I = _.length, j = I >>> 1; Z < j; ) {
          var q = 2 * (Z + 1) - 1, G = _[q], R = q + 1, O = _[R];
          if (0 > s(G, B))
            R < I && 0 > s(O, G) ? (_[Z] = O, _[R] = B, Z = R) : (_[Z] = G, _[q] = B, Z = q);
          else if (R < I && 0 > s(O, B))
            _[Z] = O, _[R] = B, Z = R;
          else break e;
        }
      }
      return k;
    }
    function s(_, k) {
      var B = _.sortIndex - k.sortIndex;
      return B !== 0 ? B : _.id - k.id;
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
    var g = [], p = [], y = 1, m = null, v = 3, x = !1, S = !1, C = !1, T = !1, A = typeof setTimeout == "function" ? setTimeout : null, D = typeof clearTimeout == "function" ? clearTimeout : null, E = typeof setImmediate < "u" ? setImmediate : null;
    function M(_) {
      for (var k = l(p); k !== null; ) {
        if (k.callback === null) r(p);
        else if (k.startTime <= _)
          r(p), k.sortIndex = k.expirationTime, i(g, k);
        else break;
        k = l(p);
      }
    }
    function H(_) {
      if (C = !1, M(_), !S)
        if (l(g) !== null)
          S = !0, U || (U = !0, Q());
        else {
          var k = l(p);
          k !== null && L(H, k.startTime - _);
        }
    }
    var U = !1, Y = -1, X = 5, te = -1;
    function K() {
      return T ? !0 : !(n.unstable_now() - te < X);
    }
    function V() {
      if (T = !1, U) {
        var _ = n.unstable_now();
        te = _;
        var k = !0;
        try {
          e: {
            S = !1, C && (C = !1, D(Y), Y = -1), x = !0;
            var B = v;
            try {
              t: {
                for (M(_), m = l(g); m !== null && !(m.expirationTime > _ && K()); ) {
                  var Z = m.callback;
                  if (typeof Z == "function") {
                    m.callback = null, v = m.priorityLevel;
                    var I = Z(
                      m.expirationTime <= _
                    );
                    if (_ = n.unstable_now(), typeof I == "function") {
                      m.callback = I, M(_), k = !0;
                      break t;
                    }
                    m === l(g) && r(g), M(_);
                  } else r(g);
                  m = l(g);
                }
                if (m !== null) k = !0;
                else {
                  var j = l(p);
                  j !== null && L(
                    H,
                    j.startTime - _
                  ), k = !1;
                }
              }
              break e;
            } finally {
              m = null, v = B, x = !1;
            }
            k = void 0;
          }
        } finally {
          k ? Q() : U = !1;
        }
      }
    }
    var Q;
    if (typeof E == "function")
      Q = function() {
        E(V);
      };
    else if (typeof MessageChannel < "u") {
      var J = new MessageChannel(), N = J.port2;
      J.port1.onmessage = V, Q = function() {
        N.postMessage(null);
      };
    } else
      Q = function() {
        A(V, 0);
      };
    function L(_, k) {
      Y = A(function() {
        _(n.unstable_now());
      }, k);
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
          var k = 3;
          break;
        default:
          k = v;
      }
      var B = v;
      v = k;
      try {
        return _();
      } finally {
        v = B;
      }
    }, n.unstable_requestPaint = function() {
      T = !0;
    }, n.unstable_runWithPriority = function(_, k) {
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
        return k();
      } finally {
        v = B;
      }
    }, n.unstable_scheduleCallback = function(_, k, B) {
      var Z = n.unstable_now();
      switch (typeof B == "object" && B !== null ? (B = B.delay, B = typeof B == "number" && 0 < B ? Z + B : Z) : B = Z, _) {
        case 1:
          var I = -1;
          break;
        case 2:
          I = 250;
          break;
        case 5:
          I = 1073741823;
          break;
        case 4:
          I = 1e4;
          break;
        default:
          I = 5e3;
      }
      return I = B + I, _ = {
        id: y++,
        callback: k,
        priorityLevel: _,
        startTime: B,
        expirationTime: I,
        sortIndex: -1
      }, B > Z ? (_.sortIndex = B, i(p, _), l(g) === null && _ === l(p) && (C ? (D(Y), Y = -1) : C = !0, L(H, B - Z))) : (_.sortIndex = I, i(g, _), S || x || (S = !0, U || (U = !0, Q()))), _;
    }, n.unstable_shouldYield = K, n.unstable_wrapCallback = function(_) {
      var k = v;
      return function() {
        var B = v;
        v = k;
        try {
          return _.apply(this, arguments);
        } finally {
          v = B;
        }
      };
    };
  })(ed)), ed;
}
var iy;
function lj() {
  return iy || (iy = 1, Pf.exports = oj()), Pf.exports;
}
var oy;
function rj() {
  if (oy) return pl;
  oy = 1;
  var n = lj(), i = Bl(), l = Tv();
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
  function p(e) {
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
        for (var w = !1, z = u.child; z; ) {
          if (z === a) {
            w = !0, a = u, o = d;
            break;
          }
          if (z === o) {
            w = !0, o = u, a = d;
            break;
          }
          z = z.sibling;
        }
        if (!w) {
          for (z = d.child; z; ) {
            if (z === a) {
              w = !0, a = d, o = u;
              break;
            }
            if (z === o) {
              w = !0, o = d, a = u;
              break;
            }
            z = z.sibling;
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
  var m = Object.assign, v = /* @__PURE__ */ Symbol.for("react.element"), x = /* @__PURE__ */ Symbol.for("react.transitional.element"), S = /* @__PURE__ */ Symbol.for("react.portal"), C = /* @__PURE__ */ Symbol.for("react.fragment"), T = /* @__PURE__ */ Symbol.for("react.strict_mode"), A = /* @__PURE__ */ Symbol.for("react.profiler"), D = /* @__PURE__ */ Symbol.for("react.consumer"), E = /* @__PURE__ */ Symbol.for("react.context"), M = /* @__PURE__ */ Symbol.for("react.forward_ref"), H = /* @__PURE__ */ Symbol.for("react.suspense"), U = /* @__PURE__ */ Symbol.for("react.suspense_list"), Y = /* @__PURE__ */ Symbol.for("react.memo"), X = /* @__PURE__ */ Symbol.for("react.lazy"), te = /* @__PURE__ */ Symbol.for("react.activity"), K = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), V = Symbol.iterator;
  function Q(e) {
    return e === null || typeof e != "object" ? null : (e = V && e[V] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var J = /* @__PURE__ */ Symbol.for("react.client.reference");
  function N(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === J ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case C:
        return "Fragment";
      case A:
        return "Profiler";
      case T:
        return "StrictMode";
      case H:
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
        case M:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case Y:
          return t = e.displayName || null, t !== null ? t : N(e.type) || "Memo";
        case X:
          t = e._payload, e = e._init;
          try {
            return N(e(t));
          } catch {
          }
      }
    return null;
  }
  var L = Array.isArray, _ = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, k = l.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, B = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Z = [], I = -1;
  function j(e) {
    return { current: e };
  }
  function q(e) {
    0 > I || (e.current = Z[I], Z[I] = null, I--);
  }
  function G(e, t) {
    I++, Z[I] = e.current, e.current = t;
  }
  var R = j(null), O = j(null), $ = j(null), W = j(null);
  function P(e, t) {
    switch (G($, t), G(O, e), G(R, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? qm(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = qm(t), e = Xm(t, e);
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
    q(R), G(R, e);
  }
  function ie() {
    q(R), q(O), q($);
  }
  function de(e) {
    e.memoizedState !== null && G(W, e);
    var t = R.current, a = Xm(t, e.type);
    t !== a && (G(O, e), G(R, a));
  }
  function he(e) {
    O.current === e && (q(R), q(O)), W.current === e && (q(W), ul._currentValue = B);
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
      var d = o.DetermineComponentFrameRoot(), w = d[0], z = d[1];
      if (w && z) {
        var F = w.split(`
`), le = z.split(`
`);
        for (u = o = 0; o < F.length && !F[o].includes("DetermineComponentFrameRoot"); )
          o++;
        for (; u < le.length && !le[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (o === F.length || u === le.length)
          for (o = F.length - 1, u = le.length - 1; 1 <= o && 0 <= u && F[o] !== le[u]; )
            u--;
        for (; 1 <= o && 0 <= u; o--, u--)
          if (F[o] !== le[u]) {
            if (o !== 1 || u !== 1)
              do
                if (o--, u--, 0 > u || F[o] !== le[u]) {
                  var ue = `
` + F[o].replace(" at new ", " at ");
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
  var zt = Object.prototype.hasOwnProperty, en = n.unstable_scheduleCallback, En = n.unstable_cancelCallback, za = n.unstable_shouldYield, Ra = n.unstable_requestPaint, ht = n.unstable_now, pi = n.unstable_getCurrentPriorityLevel, _n = n.unstable_ImmediatePriority, Pn = n.unstable_UserBlockingPriority, ka = n.unstable_NormalPriority, du = n.unstable_LowPriority, yi = n.unstable_IdlePriority, hu = n.log, gu = n.unstable_setDisableYieldValue, Ha = null, xt = null;
  function dn(e) {
    if (typeof hu == "function" && gu(e), xt && typeof xt.setStrictMode == "function")
      try {
        xt.setStrictMode(Ha, e);
      } catch {
      }
  }
  var wt = Math.clz32 ? Math.clz32 : yu, mu = Math.log, pu = Math.LN2;
  function yu(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (mu(e) / pu | 0) | 0;
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
    var z = o & 134217727;
    return z !== 0 ? (o = z & ~d, o !== 0 ? u = Nn(o) : (w &= z, w !== 0 ? u = Nn(w) : a || (a = z & ~e, a !== 0 && (u = Nn(a))))) : (z = o & ~d, z !== 0 ? u = Nn(z) : w !== 0 ? u = Nn(w) : a || (a = o & ~e, a !== 0 && (u = Nn(a)))), u === 0 ? 0 : t !== 0 && t !== u && (t & d) === 0 && (d = u & -u, a = t & -t, d >= a || d === 32 && (a & 4194048) !== 0) ? t : u;
  }
  function Ba(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function vu(e, t) {
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
  function Gl() {
    var e = xi;
    return xi <<= 1, (xi & 62914560) === 0 && (xi = 4194304), e;
  }
  function xo(e) {
    for (var t = [], a = 0; 31 > a; a++) t.push(e);
    return t;
  }
  function La(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function bu(e, t, a, o, u, d) {
    var w = e.pendingLanes;
    e.pendingLanes = a, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= a, e.entangledLanes &= a, e.errorRecoveryDisabledLanes &= a, e.shellSuspendCounter = 0;
    var z = e.entanglements, F = e.expirationTimes, le = e.hiddenUpdates;
    for (a = w & ~a; 0 < a; ) {
      var ue = 31 - wt(a), fe = 1 << ue;
      z[ue] = 0, F[ue] = -1;
      var re = le[ue];
      if (re !== null)
        for (le[ue] = null, ue = 0; ue < re.length; ue++) {
          var se = re[ue];
          se !== null && (se.lane &= -536870913);
        }
      a &= ~fe;
    }
    o !== 0 && Zl(e, o, 0), d !== 0 && u === 0 && e.tag !== 0 && (e.suspendedLanes |= d & ~(w & ~t));
  }
  function Zl(e, t, a) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var o = 31 - wt(t);
    e.entangledLanes |= t, e.entanglements[o] = e.entanglements[o] | 1073741824 | a & 261930;
  }
  function $l(e, t) {
    var a = e.entangledLanes |= t;
    for (e = e.entanglements; a; ) {
      var o = 31 - wt(a), u = 1 << o;
      u & t | e[o] & t && (e[o] |= t), a &= ~u;
    }
  }
  function Ql(e, t) {
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
  function Kl() {
    var e = k.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : hp(e.type));
  }
  function Jl(e, t) {
    var a = k.p;
    try {
      return k.p = e, t();
    } finally {
      k.p = a;
    }
  }
  var hn = Math.random().toString(36).slice(2), ct = "__reactFiber$" + hn, vt = "__reactProps$" + hn, Cn = "__reactContainer$" + hn, Si = "__reactEvents$" + hn, Wl = "__reactListeners$" + hn, xu = "__reactHandles$" + hn, Fl = "__reactResources$" + hn, Ua = "__reactMarker$" + hn;
  function Eo(e) {
    delete e[ct], delete e[vt], delete e[Si], delete e[Wl], delete e[xu];
  }
  function ea(e) {
    var t = e[ct];
    if (t) return t;
    for (var a = e.parentNode; a; ) {
      if (t = a[Cn] || a[ct]) {
        if (a = t.alternate, t.child !== null || a !== null && a.child !== null)
          for (e = Wm(e); e !== null; ) {
            if (a = e[ct]) return a;
            e = Wm(e);
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
    var t = e[Fl];
    return t || (t = e[Fl] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function at(e) {
    e[Ua] = !0;
  }
  var Pl = /* @__PURE__ */ new Set(), er = {};
  function Mn(e, t) {
    ia(e, t), ia(e + "Capture", t);
  }
  function ia(e, t) {
    for (er[e] = t, e = 0; e < t.length; e++)
      Pl.add(t[e]);
  }
  var wu = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), _o = {}, tr = {};
  function Su(e) {
    return zt.call(tr, e) ? !0 : zt.call(_o, e) ? !1 : wu.test(e) ? tr[e] = !0 : (_o[e] = !0, !1);
  }
  function Ei(e, t, a) {
    if (Su(t))
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
  function nr(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Eu(e, t, a) {
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
      var t = nr(e) ? "checked" : "value";
      e._valueTracker = Eu(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function ar(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var a = t.getValue(), o = "";
    return e && (o = nr(e) ? e.checked ? "true" : "false" : e.value), e = o, e !== a ? (t.setValue(e), !0) : !1;
  }
  function Va(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var _u = /[\n"\\]/g;
  function Nt(e) {
    return e.replace(
      _u,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Ya(e, t, a, o, u, d, w, z) {
    e.name = "", w != null && typeof w != "function" && typeof w != "symbol" && typeof w != "boolean" ? e.type = w : e.removeAttribute("type"), t != null ? w === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + _t(t)) : e.value !== "" + _t(t) && (e.value = "" + _t(t)) : w !== "submit" && w !== "reset" || e.removeAttribute("value"), t != null ? No(e, w, _t(t)) : a != null ? No(e, w, _t(a)) : o != null && e.removeAttribute("value"), u == null && d != null && (e.defaultChecked = !!d), u != null && (e.checked = u && typeof u != "function" && typeof u != "symbol"), z != null && typeof z != "function" && typeof z != "symbol" && typeof z != "boolean" ? e.name = "" + _t(z) : e.removeAttribute("name");
  }
  function ir(e, t, a, o, u, d, w, z) {
    if (d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (e.type = d), t != null || a != null) {
      if (!(d !== "submit" && d !== "reset" || t != null)) {
        Ni(e);
        return;
      }
      a = a != null ? "" + _t(a) : "", t = t != null ? "" + _t(t) : a, z || t === e.value || (e.value = t), e.defaultValue = t;
    }
    o = o ?? u, o = typeof o != "function" && typeof o != "symbol" && !!o, e.checked = z ? e.checked : !!o, e.defaultChecked = !!o, w != null && typeof w != "function" && typeof w != "symbol" && typeof w != "boolean" && (e.name = w), Ni(e);
  }
  function No(e, t, a) {
    t === "number" && Va(e.ownerDocument) === e || e.defaultValue === "" + a || (e.defaultValue = "" + a);
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
  function Ld(e, t, a) {
    if (t != null && (t = "" + _t(t), t !== e.value && (e.value = t), a == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = a != null ? "" + _t(a) : "";
  }
  function Ud(e, t, a, o) {
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
  var fb = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Vd(e, t, a) {
    var o = t.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === "" ? o ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : o ? e.setProperty(t, a) : typeof a != "number" || a === 0 || fb.has(t) ? t === "float" ? e.cssFloat = a : e[t] = ("" + a).trim() : e[t] = a + "px";
  }
  function Yd(e, t, a) {
    if (t != null && typeof t != "object")
      throw Error(r(62));
    if (e = e.style, a != null) {
      for (var o in a)
        !a.hasOwnProperty(o) || t != null && t.hasOwnProperty(o) || (o.indexOf("--") === 0 ? e.setProperty(o, "") : o === "float" ? e.cssFloat = "" : e[o] = "");
      for (var u in t)
        o = t[u], t.hasOwnProperty(u) && a[u] !== o && Vd(e, u, o);
    } else
      for (var d in t)
        t.hasOwnProperty(d) && Vd(e, d, t[d]);
  }
  function Nu(e) {
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
  var db = /* @__PURE__ */ new Map([
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
  ]), hb = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function or(e) {
    return hb.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function jn() {
  }
  var Cu = null;
  function Mu(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Mi = null, Ti = null;
  function Id(e) {
    var t = ta(e);
    if (t && (e = t.stateNode)) {
      var a = e[vt] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (Ya(
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
                Ya(
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
              o = a[t], o.form === e.form && ar(o);
          }
          break e;
        case "textarea":
          Ld(e, a.value, a.defaultValue);
          break e;
        case "select":
          t = a.value, t != null && Tn(e, !!a.multiple, t, !1);
      }
    }
  }
  var Tu = !1;
  function qd(e, t, a) {
    if (Tu) return e(t, a);
    Tu = !0;
    try {
      var o = e(t);
      return o;
    } finally {
      if (Tu = !1, (Mi !== null || Ti !== null) && (Zr(), Mi && (t = Mi, e = Ti, Ti = Mi = null, Id(t), e)))
        for (t = 0; t < e.length; t++) Id(e[t]);
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
  var An = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ju = !1;
  if (An)
    try {
      var Mo = {};
      Object.defineProperty(Mo, "passive", {
        get: function() {
          ju = !0;
        }
      }), window.addEventListener("test", Mo, Mo), window.removeEventListener("test", Mo, Mo);
    } catch {
      ju = !1;
    }
  var oa = null, Au = null, lr = null;
  function Xd() {
    if (lr) return lr;
    var e, t = Au, a = t.length, o, u = "value" in oa ? oa.value : oa.textContent, d = u.length;
    for (e = 0; e < a && t[e] === u[e]; e++) ;
    var w = a - e;
    for (o = 1; o <= w && t[a - o] === u[d - o]; o++) ;
    return lr = u.slice(e, 1 < o ? 1 - o : void 0);
  }
  function rr(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function sr() {
    return !0;
  }
  function Gd() {
    return !1;
  }
  function Ct(e) {
    function t(a, o, u, d, w) {
      this._reactName = a, this._targetInst = u, this.type = o, this.nativeEvent = d, this.target = w, this.currentTarget = null;
      for (var z in e)
        e.hasOwnProperty(z) && (a = e[z], this[z] = a ? a(d) : d[z]);
      return this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? sr : Gd, this.isPropagationStopped = Gd, this;
    }
    return m(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var a = this.nativeEvent;
        a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = sr);
      },
      stopPropagation: function() {
        var a = this.nativeEvent;
        a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = sr);
      },
      persist: function() {
      },
      isPersistent: sr
    }), t;
  }
  var Ia = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, ur = Ct(Ia), To = m({}, Ia, { view: 0, detail: 0 }), gb = Ct(To), Du, Ou, jo, cr = m({}, To, {
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
    getModifierState: Ru,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== jo && (jo && e.type === "mousemove" ? (Du = e.screenX - jo.screenX, Ou = e.screenY - jo.screenY) : Ou = Du = 0, jo = e), Du);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Ou;
    }
  }), Zd = Ct(cr), mb = m({}, cr, { dataTransfer: 0 }), pb = Ct(mb), yb = m({}, To, { relatedTarget: 0 }), zu = Ct(yb), vb = m({}, Ia, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), bb = Ct(vb), xb = m({}, Ia, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), wb = Ct(xb), Sb = m({}, Ia, { data: 0 }), $d = Ct(Sb), Eb = {
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
  }, _b = {
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
  }, Nb = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Cb(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Nb[e]) ? !!t[e] : !1;
  }
  function Ru() {
    return Cb;
  }
  var Mb = m({}, To, {
    key: function(e) {
      if (e.key) {
        var t = Eb[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = rr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? _b[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Ru,
    charCode: function(e) {
      return e.type === "keypress" ? rr(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? rr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), Tb = Ct(Mb), jb = m({}, cr, {
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
  }), Qd = Ct(jb), Ab = m({}, To, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Ru
  }), Db = Ct(Ab), Ob = m({}, Ia, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), zb = Ct(Ob), Rb = m({}, cr, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), kb = Ct(Rb), Hb = m({}, Ia, {
    newState: 0,
    oldState: 0
  }), Bb = Ct(Hb), Lb = [9, 13, 27, 32], ku = An && "CompositionEvent" in window, Ao = null;
  An && "documentMode" in document && (Ao = document.documentMode);
  var Ub = An && "TextEvent" in window && !Ao, Kd = An && (!ku || Ao && 8 < Ao && 11 >= Ao), Jd = " ", Wd = !1;
  function Fd(e, t) {
    switch (e) {
      case "keyup":
        return Lb.indexOf(t.keyCode) !== -1;
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
  function Pd(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var ji = !1;
  function Vb(e, t) {
    switch (e) {
      case "compositionend":
        return Pd(t);
      case "keypress":
        return t.which !== 32 ? null : (Wd = !0, Jd);
      case "textInput":
        return e = t.data, e === Jd && Wd ? null : e;
      default:
        return null;
    }
  }
  function Yb(e, t) {
    if (ji)
      return e === "compositionend" || !ku && Fd(e, t) ? (e = Xd(), lr = Au = oa = null, ji = !1, e) : null;
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
        return Kd && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Ib = {
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
  function eh(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Ib[e.type] : t === "textarea";
  }
  function th(e, t, a, o) {
    Mi ? Ti ? Ti.push(o) : Ti = [o] : Mi = o, t = Pr(t, "onChange"), 0 < t.length && (a = new ur(
      "onChange",
      "change",
      null,
      a,
      o
    ), e.push({ event: a, listeners: t }));
  }
  var Do = null, Oo = null;
  function qb(e) {
    Bm(e, 0);
  }
  function fr(e) {
    var t = na(e);
    if (ar(t)) return e;
  }
  function nh(e, t) {
    if (e === "change") return t;
  }
  var ah = !1;
  if (An) {
    var Hu;
    if (An) {
      var Bu = "oninput" in document;
      if (!Bu) {
        var ih = document.createElement("div");
        ih.setAttribute("oninput", "return;"), Bu = typeof ih.oninput == "function";
      }
      Hu = Bu;
    } else Hu = !1;
    ah = Hu && (!document.documentMode || 9 < document.documentMode);
  }
  function oh() {
    Do && (Do.detachEvent("onpropertychange", lh), Oo = Do = null);
  }
  function lh(e) {
    if (e.propertyName === "value" && fr(Oo)) {
      var t = [];
      th(
        t,
        Oo,
        e,
        Mu(e)
      ), qd(qb, t);
    }
  }
  function Xb(e, t, a) {
    e === "focusin" ? (oh(), Do = t, Oo = a, Do.attachEvent("onpropertychange", lh)) : e === "focusout" && oh();
  }
  function Gb(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return fr(Oo);
  }
  function Zb(e, t) {
    if (e === "click") return fr(t);
  }
  function $b(e, t) {
    if (e === "input" || e === "change")
      return fr(t);
  }
  function Qb(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Rt = typeof Object.is == "function" ? Object.is : Qb;
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
  function rh(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function sh(e, t) {
    var a = rh(e);
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
      a = rh(a);
    }
  }
  function uh(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? uh(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function ch(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = Va(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) e = t.contentWindow;
      else break;
      t = Va(e.document);
    }
    return t;
  }
  function Lu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var Kb = An && "documentMode" in document && 11 >= document.documentMode, Ai = null, Uu = null, Ro = null, Vu = !1;
  function fh(e, t, a) {
    var o = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    Vu || Ai == null || Ai !== Va(o) || (o = Ai, "selectionStart" in o && Lu(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = {
      anchorNode: o.anchorNode,
      anchorOffset: o.anchorOffset,
      focusNode: o.focusNode,
      focusOffset: o.focusOffset
    }), Ro && zo(Ro, o) || (Ro = o, o = Pr(Uu, "onSelect"), 0 < o.length && (t = new ur(
      "onSelect",
      "select",
      null,
      t,
      a
    ), e.push({ event: t, listeners: o }), t.target = Ai)));
  }
  function qa(e, t) {
    var a = {};
    return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
  }
  var Di = {
    animationend: qa("Animation", "AnimationEnd"),
    animationiteration: qa("Animation", "AnimationIteration"),
    animationstart: qa("Animation", "AnimationStart"),
    transitionrun: qa("Transition", "TransitionRun"),
    transitionstart: qa("Transition", "TransitionStart"),
    transitioncancel: qa("Transition", "TransitionCancel"),
    transitionend: qa("Transition", "TransitionEnd")
  }, Yu = {}, dh = {};
  An && (dh = document.createElement("div").style, "AnimationEvent" in window || (delete Di.animationend.animation, delete Di.animationiteration.animation, delete Di.animationstart.animation), "TransitionEvent" in window || delete Di.transitionend.transition);
  function Xa(e) {
    if (Yu[e]) return Yu[e];
    if (!Di[e]) return e;
    var t = Di[e], a;
    for (a in t)
      if (t.hasOwnProperty(a) && a in dh)
        return Yu[e] = t[a];
    return e;
  }
  var hh = Xa("animationend"), gh = Xa("animationiteration"), mh = Xa("animationstart"), Jb = Xa("transitionrun"), Wb = Xa("transitionstart"), Fb = Xa("transitioncancel"), ph = Xa("transitionend"), yh = /* @__PURE__ */ new Map(), Iu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Iu.push("scrollEnd");
  function nn(e, t) {
    yh.set(e, t), Mn(t, [e]);
  }
  var dr = typeof reportError == "function" ? reportError : function(e) {
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
  }, Xt = [], Oi = 0, qu = 0;
  function hr() {
    for (var e = Oi, t = qu = Oi = 0; t < e; ) {
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
      d !== 0 && vh(a, u, d);
    }
  }
  function gr(e, t, a, o) {
    Xt[Oi++] = e, Xt[Oi++] = t, Xt[Oi++] = a, Xt[Oi++] = o, qu |= o, e.lanes |= o, e = e.alternate, e !== null && (e.lanes |= o);
  }
  function Xu(e, t, a, o) {
    return gr(e, t, a, o), mr(e);
  }
  function Ga(e, t) {
    return gr(e, null, null, t), mr(e);
  }
  function vh(e, t, a) {
    e.lanes |= a;
    var o = e.alternate;
    o !== null && (o.lanes |= a);
    for (var u = !1, d = e.return; d !== null; )
      d.childLanes |= a, o = d.alternate, o !== null && (o.childLanes |= a), d.tag === 22 && (e = d.stateNode, e === null || e._visibility & 1 || (u = !0)), e = d, d = d.return;
    return e.tag === 3 ? (d = e.stateNode, u && t !== null && (u = 31 - wt(a), e = d.hiddenUpdates, o = e[u], o === null ? e[u] = [t] : o.push(t), t.lane = a | 536870912), d) : null;
  }
  function mr(e) {
    if (50 < nl)
      throw nl = 0, Pc = null, Error(r(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var zi = {};
  function Pb(e, t, a, o) {
    this.tag = e, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function kt(e, t, a, o) {
    return new Pb(e, t, a, o);
  }
  function Gu(e) {
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
  function bh(e, t) {
    e.flags &= 65011714;
    var a = e.alternate;
    return a === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type, t = a.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function pr(e, t, a, o, u, d) {
    var w = 0;
    if (o = e, typeof e == "function") Gu(e) && (w = 1);
    else if (typeof e == "string")
      w = i1(
        e,
        a,
        R.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case te:
          return e = kt(31, a, t, u), e.elementType = te, e.lanes = d, e;
        case C:
          return Za(a.children, u, d, t);
        case T:
          w = 8, u |= 24;
          break;
        case A:
          return e = kt(12, a, t, u | 2), e.elementType = A, e.lanes = d, e;
        case H:
          return e = kt(13, a, t, u), e.elementType = H, e.lanes = d, e;
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
              case M:
                w = 11;
                break e;
              case Y:
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
  function Zu(e, t, a) {
    return e = kt(6, e, null, t), e.lanes = a, e;
  }
  function xh(e) {
    var t = kt(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function $u(e, t, a) {
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
  var wh = /* @__PURE__ */ new WeakMap();
  function Gt(e, t) {
    if (typeof e == "object" && e !== null) {
      var a = wh.get(e);
      return a !== void 0 ? a : (t = {
        value: e,
        source: t,
        stack: Et(t)
      }, wh.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: Et(t)
    };
  }
  var Ri = [], ki = 0, yr = null, ko = 0, Zt = [], $t = 0, la = null, gn = 1, mn = "";
  function On(e, t) {
    Ri[ki++] = ko, Ri[ki++] = yr, yr = e, ko = t;
  }
  function Sh(e, t, a) {
    Zt[$t++] = gn, Zt[$t++] = mn, Zt[$t++] = la, la = e;
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
  function Qu(e) {
    e.return !== null && (On(e, 1), Sh(e, 1, 0));
  }
  function Ku(e) {
    for (; e === yr; )
      yr = Ri[--ki], Ri[ki] = null, ko = Ri[--ki], Ri[ki] = null;
    for (; e === la; )
      la = Zt[--$t], Zt[$t] = null, mn = Zt[--$t], Zt[$t] = null, gn = Zt[--$t], Zt[$t] = null;
  }
  function Eh(e, t) {
    Zt[$t++] = gn, Zt[$t++] = mn, Zt[$t++] = la, gn = t.id, mn = t.overflow, la = e;
  }
  var gt = null, Ze = null, Oe = !1, ra = null, Qt = !1, Ju = Error(r(519));
  function sa(e) {
    var t = Error(
      r(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Ho(Gt(t, e)), Ju;
  }
  function _h(e) {
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
        Te("invalid", t), ir(
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
        Te("invalid", t), Ud(t, o.value, o.defaultValue, o.children);
    }
    a = o.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || t.textContent === "" + a || o.suppressHydrationWarning === !0 || Ym(t.textContent, a) ? (o.popover != null && (Te("beforetoggle", t), Te("toggle", t)), o.onScroll != null && Te("scroll", t), o.onScrollEnd != null && Te("scrollend", t), o.onClick != null && (t.onclick = jn), t = !0) : t = !1, t || sa(e, !0);
  }
  function Nh(e) {
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
    if (!Oe) return Nh(e), Oe = !0, !1;
    var t = e.tag, a;
    if ((a = t !== 3 && t !== 27) && ((a = t === 5) && (a = e.type, a = !(a !== "form" && a !== "button") || mf(e.type, e.memoizedProps)), a = !a), a && Ze && sa(e), Nh(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(r(317));
      Ze = Jm(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(r(317));
      Ze = Jm(e);
    } else
      t === 27 ? (t = Ze, Sa(e.type) ? (e = xf, xf = null, Ze = e) : Ze = t) : Ze = gt ? Jt(e.stateNode.nextSibling) : null;
    return !0;
  }
  function $a() {
    Ze = gt = null, Oe = !1;
  }
  function Wu() {
    var e = ra;
    return e !== null && (At === null ? At = e : At.push.apply(
      At,
      e
    ), ra = null), e;
  }
  function Ho(e) {
    ra === null ? ra = [e] : ra.push(e);
  }
  var Fu = j(null), Qa = null, zn = null;
  function ua(e, t, a) {
    G(Fu, t._currentValue), t._currentValue = a;
  }
  function Rn(e) {
    e._currentValue = Fu.current, q(Fu);
  }
  function Pu(e, t, a) {
    for (; e !== null; ) {
      var o = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, o !== null && (o.childLanes |= t)) : o !== null && (o.childLanes & t) !== t && (o.childLanes |= t), e === a) break;
      e = e.return;
    }
  }
  function ec(e, t, a, o) {
    var u = e.child;
    for (u !== null && (u.return = e); u !== null; ) {
      var d = u.dependencies;
      if (d !== null) {
        var w = u.child;
        d = d.firstContext;
        e: for (; d !== null; ) {
          var z = d;
          d = u;
          for (var F = 0; F < t.length; F++)
            if (z.context === t[F]) {
              d.lanes |= a, z = d.alternate, z !== null && (z.lanes |= a), Pu(
                d.return,
                a,
                e
              ), o || (w = null);
              break e;
            }
          d = z.next;
        }
      } else if (u.tag === 18) {
        if (w = u.return, w === null) throw Error(r(341));
        w.lanes |= a, d = w.alternate, d !== null && (d.lanes |= a), Pu(w, a, e), w = null;
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
          var z = u.type;
          Rt(u.pendingProps.value, w.value) || (e !== null ? e.push(z) : e = [z]);
        }
      } else if (u === W.current) {
        if (w = u.alternate, w === null) throw Error(r(387));
        w.memoizedState.memoizedState !== u.memoizedState.memoizedState && (e !== null ? e.push(ul) : e = [ul]);
      }
      u = u.return;
    }
    e !== null && ec(
      t,
      e,
      a,
      o
    ), t.flags |= 262144;
  }
  function vr(e) {
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
  function Ka(e) {
    Qa = e, zn = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function mt(e) {
    return Ch(Qa, e);
  }
  function br(e, t) {
    return Qa === null && Ka(e), Ch(e, t);
  }
  function Ch(e, t) {
    var a = t._currentValue;
    if (t = { context: t, memoizedValue: a, next: null }, zn === null) {
      if (e === null) throw Error(r(308));
      zn = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else zn = zn.next = t;
    return a;
  }
  var ex = typeof AbortController < "u" ? AbortController : function() {
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
  }, tx = n.unstable_scheduleCallback, nx = n.unstable_NormalPriority, it = {
    $$typeof: E,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function tc() {
    return {
      controller: new ex(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Bo(e) {
    e.refCount--, e.refCount === 0 && tx(nx, function() {
      e.controller.abort();
    });
  }
  var Lo = null, nc = 0, Li = 0, Ui = null;
  function ax(e, t) {
    if (Lo === null) {
      var a = Lo = [];
      nc = 0, Li = lf(), Ui = {
        status: "pending",
        value: void 0,
        then: function(o) {
          a.push(o);
        }
      };
    }
    return nc++, t.then(Mh, Mh), t;
  }
  function Mh() {
    if (--nc === 0 && Lo !== null) {
      Ui !== null && (Ui.status = "fulfilled");
      var e = Lo;
      Lo = null, Li = 0, Ui = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function ix(e, t) {
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
  var Th = _.S;
  _.S = function(e, t) {
    fm = ht(), typeof t == "object" && t !== null && typeof t.then == "function" && ax(e, t), Th !== null && Th(e, t);
  };
  var Ja = j(null);
  function ac() {
    var e = Ja.current;
    return e !== null ? e : Ge.pooledCache;
  }
  function xr(e, t) {
    t === null ? G(Ja, Ja.current) : G(Ja, t.pool);
  }
  function jh() {
    var e = ac();
    return e === null ? null : { parent: it._currentValue, pool: e };
  }
  var Vi = Error(r(460)), ic = Error(r(474)), wr = Error(r(542)), Sr = { then: function() {
  } };
  function Ah(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Dh(e, t, a) {
    switch (a = e[a], a === void 0 ? e.push(t) : a !== t && (t.then(jn, jn), t = a), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, zh(e), e;
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
            throw e = t.reason, zh(e), e;
        }
        throw Fa = t, Vi;
    }
  }
  function Wa(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (a) {
      throw a !== null && typeof a == "object" && typeof a.then == "function" ? (Fa = a, Vi) : a;
    }
  }
  var Fa = null;
  function Oh() {
    if (Fa === null) throw Error(r(459));
    var e = Fa;
    return Fa = null, e;
  }
  function zh(e) {
    if (e === Vi || e === wr)
      throw Error(r(483));
  }
  var Yi = null, Uo = 0;
  function Er(e) {
    var t = Uo;
    return Uo += 1, Yi === null && (Yi = []), Dh(Yi, e, t);
  }
  function Vo(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function _r(e, t) {
    throw t.$$typeof === v ? Error(r(525)) : (e = Object.prototype.toString.call(t), Error(
      r(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function Rh(e) {
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
    function z(ae, ne, oe, ce) {
      return ne === null || ne.tag !== 6 ? (ne = Zu(oe, ae.mode, ce), ne.return = ae, ne) : (ne = u(ne, oe), ne.return = ae, ne);
    }
    function F(ae, ne, oe, ce) {
      var ve = oe.type;
      return ve === C ? ue(
        ae,
        ne,
        oe.props.children,
        ce,
        oe.key
      ) : ne !== null && (ne.elementType === ve || typeof ve == "object" && ve !== null && ve.$$typeof === X && Wa(ve) === ne.type) ? (ne = u(ne, oe.props), Vo(ne, oe), ne.return = ae, ne) : (ne = pr(
        oe.type,
        oe.key,
        oe.props,
        null,
        ae.mode,
        ce
      ), Vo(ne, oe), ne.return = ae, ne);
    }
    function le(ae, ne, oe, ce) {
      return ne === null || ne.tag !== 4 || ne.stateNode.containerInfo !== oe.containerInfo || ne.stateNode.implementation !== oe.implementation ? (ne = $u(oe, ae.mode, ce), ne.return = ae, ne) : (ne = u(ne, oe.children || []), ne.return = ae, ne);
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
        return ne = Zu(
          "" + ne,
          ae.mode,
          oe
        ), ne.return = ae, ne;
      if (typeof ne == "object" && ne !== null) {
        switch (ne.$$typeof) {
          case x:
            return oe = pr(
              ne.type,
              ne.key,
              ne.props,
              null,
              ae.mode,
              oe
            ), Vo(oe, ne), oe.return = ae, oe;
          case S:
            return ne = $u(
              ne,
              ae.mode,
              oe
            ), ne.return = ae, ne;
          case X:
            return ne = Wa(ne), fe(ae, ne, oe);
        }
        if (L(ne) || Q(ne))
          return ne = Za(
            ne,
            ae.mode,
            oe,
            null
          ), ne.return = ae, ne;
        if (typeof ne.then == "function")
          return fe(ae, Er(ne), oe);
        if (ne.$$typeof === E)
          return fe(
            ae,
            br(ae, ne),
            oe
          );
        _r(ae, ne);
      }
      return null;
    }
    function re(ae, ne, oe, ce) {
      var ve = ne !== null ? ne.key : null;
      if (typeof oe == "string" && oe !== "" || typeof oe == "number" || typeof oe == "bigint")
        return ve !== null ? null : z(ae, ne, "" + oe, ce);
      if (typeof oe == "object" && oe !== null) {
        switch (oe.$$typeof) {
          case x:
            return oe.key === ve ? F(ae, ne, oe, ce) : null;
          case S:
            return oe.key === ve ? le(ae, ne, oe, ce) : null;
          case X:
            return oe = Wa(oe), re(ae, ne, oe, ce);
        }
        if (L(oe) || Q(oe))
          return ve !== null ? null : ue(ae, ne, oe, ce, null);
        if (typeof oe.then == "function")
          return re(
            ae,
            ne,
            Er(oe),
            ce
          );
        if (oe.$$typeof === E)
          return re(
            ae,
            ne,
            br(ae, oe),
            ce
          );
        _r(ae, oe);
      }
      return null;
    }
    function se(ae, ne, oe, ce, ve) {
      if (typeof ce == "string" && ce !== "" || typeof ce == "number" || typeof ce == "bigint")
        return ae = ae.get(oe) || null, z(ne, ae, "" + ce, ve);
      if (typeof ce == "object" && ce !== null) {
        switch (ce.$$typeof) {
          case x:
            return ae = ae.get(
              ce.key === null ? oe : ce.key
            ) || null, F(ne, ae, ce, ve);
          case S:
            return ae = ae.get(
              ce.key === null ? oe : ce.key
            ) || null, le(ne, ae, ce, ve);
          case X:
            return ce = Wa(ce), se(
              ae,
              ne,
              oe,
              ce,
              ve
            );
        }
        if (L(ce) || Q(ce))
          return ae = ae.get(oe) || null, ue(ne, ae, ce, ve, null);
        if (typeof ce.then == "function")
          return se(
            ae,
            ne,
            oe,
            Er(ce),
            ve
          );
        if (ce.$$typeof === E)
          return se(
            ae,
            ne,
            oe,
            br(ne, ce),
            ve
          );
        _r(ne, ce);
      }
      return null;
    }
    function me(ae, ne, oe, ce) {
      for (var ve = null, Re = null, pe = ne, Ce = ne = 0, Ae = null; pe !== null && Ce < oe.length; Ce++) {
        pe.index > Ce ? (Ae = pe, pe = null) : Ae = pe.sibling;
        var ke = re(
          ae,
          pe,
          oe[Ce],
          ce
        );
        if (ke === null) {
          pe === null && (pe = Ae);
          break;
        }
        e && pe && ke.alternate === null && t(ae, pe), ne = d(ke, ne, Ce), Re === null ? ve = ke : Re.sibling = ke, Re = ke, pe = Ae;
      }
      if (Ce === oe.length)
        return a(ae, pe), Oe && On(ae, Ce), ve;
      if (pe === null) {
        for (; Ce < oe.length; Ce++)
          pe = fe(ae, oe[Ce], ce), pe !== null && (ne = d(
            pe,
            ne,
            Ce
          ), Re === null ? ve = pe : Re.sibling = pe, Re = pe);
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
        ), Re === null ? ve = Ae : Re.sibling = Ae, Re = Ae);
      return e && pe.forEach(function(Ma) {
        return t(ae, Ma);
      }), Oe && On(ae, Ce), ve;
    }
    function we(ae, ne, oe, ce) {
      if (oe == null) throw Error(r(151));
      for (var ve = null, Re = null, pe = ne, Ce = ne = 0, Ae = null, ke = oe.next(); pe !== null && !ke.done; Ce++, ke = oe.next()) {
        pe.index > Ce ? (Ae = pe, pe = null) : Ae = pe.sibling;
        var Ma = re(ae, pe, ke.value, ce);
        if (Ma === null) {
          pe === null && (pe = Ae);
          break;
        }
        e && pe && Ma.alternate === null && t(ae, pe), ne = d(Ma, ne, Ce), Re === null ? ve = Ma : Re.sibling = Ma, Re = Ma, pe = Ae;
      }
      if (ke.done)
        return a(ae, pe), Oe && On(ae, Ce), ve;
      if (pe === null) {
        for (; !ke.done; Ce++, ke = oe.next())
          ke = fe(ae, ke.value, ce), ke !== null && (ne = d(ke, ne, Ce), Re === null ? ve = ke : Re.sibling = ke, Re = ke);
        return Oe && On(ae, Ce), ve;
      }
      for (pe = o(pe); !ke.done; Ce++, ke = oe.next())
        ke = se(pe, ae, Ce, ke.value, ce), ke !== null && (e && ke.alternate !== null && pe.delete(ke.key === null ? Ce : ke.key), ne = d(ke, ne, Ce), Re === null ? ve = ke : Re.sibling = ke, Re = ke);
      return e && pe.forEach(function(m1) {
        return t(ae, m1);
      }), Oe && On(ae, Ce), ve;
    }
    function qe(ae, ne, oe, ce) {
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
                  } else if (ne.elementType === ve || typeof ve == "object" && ve !== null && ve.$$typeof === X && Wa(ve) === ne.type) {
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
              ), ce.return = ae, ae = ce) : (ce = pr(
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
              ce = $u(oe, ae.mode, ce), ce.return = ae, ae = ce;
            }
            return w(ae);
          case X:
            return oe = Wa(oe), qe(
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
        if (Q(oe)) {
          if (ve = Q(oe), typeof ve != "function") throw Error(r(150));
          return oe = ve.call(oe), we(
            ae,
            ne,
            oe,
            ce
          );
        }
        if (typeof oe.then == "function")
          return qe(
            ae,
            ne,
            Er(oe),
            ce
          );
        if (oe.$$typeof === E)
          return qe(
            ae,
            ne,
            br(ae, oe),
            ce
          );
        _r(ae, oe);
      }
      return typeof oe == "string" && oe !== "" || typeof oe == "number" || typeof oe == "bigint" ? (oe = "" + oe, ne !== null && ne.tag === 6 ? (a(ae, ne.sibling), ce = u(ne, oe), ce.return = ae, ae = ce) : (a(ae, ne), ce = Zu(oe, ae.mode, ce), ce.return = ae, ae = ce), w(ae)) : a(ae, ne);
    }
    return function(ae, ne, oe, ce) {
      try {
        Uo = 0;
        var ve = qe(
          ae,
          ne,
          oe,
          ce
        );
        return Yi = null, ve;
      } catch (pe) {
        if (pe === Vi || pe === wr) throw pe;
        var Re = kt(29, pe, null, ae.mode);
        return Re.lanes = ce, Re.return = ae, Re;
      }
    };
  }
  var Pa = Rh(!0), kh = Rh(!1), ca = !1;
  function oc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function lc(e, t) {
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
    if (o = o.shared, (Be & 2) !== 0) {
      var u = o.pending;
      return u === null ? t.next = t : (t.next = u.next, u.next = t), o.pending = t, t = mr(e), vh(e, null, a), t;
    }
    return gr(e, o, t, a), mr(e);
  }
  function Yo(e, t, a) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (a & 4194048) !== 0)) {
      var o = t.lanes;
      o &= e.pendingLanes, a |= o, t.lanes = a, $l(e, a);
    }
  }
  function rc(e, t) {
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
  var sc = !1;
  function Io() {
    if (sc) {
      var e = Ui;
      if (e !== null) throw e;
    }
  }
  function qo(e, t, a, o) {
    sc = !1;
    var u = e.updateQueue;
    ca = !1;
    var d = u.firstBaseUpdate, w = u.lastBaseUpdate, z = u.shared.pending;
    if (z !== null) {
      u.shared.pending = null;
      var F = z, le = F.next;
      F.next = null, w === null ? d = le : w.next = le, w = F;
      var ue = e.alternate;
      ue !== null && (ue = ue.updateQueue, z = ue.lastBaseUpdate, z !== w && (z === null ? ue.firstBaseUpdate = le : z.next = le, ue.lastBaseUpdate = F));
    }
    if (d !== null) {
      var fe = u.baseState;
      w = 0, ue = le = F = null, z = d;
      do {
        var re = z.lane & -536870913, se = re !== z.lane;
        if (se ? (je & re) === re : (o & re) === re) {
          re !== 0 && re === Li && (sc = !0), ue !== null && (ue = ue.next = {
            lane: 0,
            tag: z.tag,
            payload: z.payload,
            callback: null,
            next: null
          });
          e: {
            var me = e, we = z;
            re = t;
            var qe = a;
            switch (we.tag) {
              case 1:
                if (me = we.payload, typeof me == "function") {
                  fe = me.call(qe, fe, re);
                  break e;
                }
                fe = me;
                break e;
              case 3:
                me.flags = me.flags & -65537 | 128;
              case 0:
                if (me = we.payload, re = typeof me == "function" ? me.call(qe, fe, re) : me, re == null) break e;
                fe = m({}, fe, re);
                break e;
              case 2:
                ca = !0;
            }
          }
          re = z.callback, re !== null && (e.flags |= 64, se && (e.flags |= 8192), se = u.callbacks, se === null ? u.callbacks = [re] : se.push(re));
        } else
          se = {
            lane: re,
            tag: z.tag,
            payload: z.payload,
            callback: z.callback,
            next: null
          }, ue === null ? (le = ue = se, F = fe) : ue = ue.next = se, w |= re;
        if (z = z.next, z === null) {
          if (z = u.shared.pending, z === null)
            break;
          se = z, z = se.next, se.next = null, u.lastBaseUpdate = se, u.shared.pending = null;
        }
      } while (!0);
      ue === null && (F = fe), u.baseState = F, u.firstBaseUpdate = le, u.lastBaseUpdate = ue, d === null && (u.shared.lanes = 0), ya |= w, e.lanes = w, e.memoizedState = fe;
    }
  }
  function Hh(e, t) {
    if (typeof e != "function")
      throw Error(r(191, e));
    e.call(t);
  }
  function Bh(e, t) {
    var a = e.callbacks;
    if (a !== null)
      for (e.callbacks = null, e = 0; e < a.length; e++)
        Hh(a[e], t);
  }
  var Ii = j(null), Nr = j(0);
  function Lh(e, t) {
    e = qn, G(Nr, e), G(Ii, t), qn = e | t.baseLanes;
  }
  function uc() {
    G(Nr, qn), G(Ii, Ii.current);
  }
  function cc() {
    qn = Nr.current, q(Ii), q(Nr);
  }
  var Ht = j(null), Kt = null;
  function ha(e) {
    var t = e.alternate;
    G(et, et.current & 1), G(Ht, e), Kt === null && (t === null || Ii.current !== null || t.memoizedState !== null) && (Kt = e);
  }
  function fc(e) {
    G(et, et.current), G(Ht, e), Kt === null && (Kt = e);
  }
  function Uh(e) {
    e.tag === 22 ? (G(et, et.current), G(Ht, e), Kt === null && (Kt = e)) : ga();
  }
  function ga() {
    G(et, et.current), G(Ht, Ht.current);
  }
  function Bt(e) {
    q(Ht), Kt === e && (Kt = null), q(et);
  }
  var et = j(0);
  function Cr(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && (a = a.dehydrated, a === null || vf(a) || bf(a)))
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
  var kn = 0, Ne = null, Ye = null, ot = null, Mr = !1, qi = !1, ei = !1, Tr = 0, Xo = 0, Xi = null, ox = 0;
  function We() {
    throw Error(r(321));
  }
  function dc(e, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < e.length; a++)
      if (!Rt(e[a], t[a])) return !1;
    return !0;
  }
  function hc(e, t, a, o, u, d) {
    return kn = d, Ne = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, _.H = e === null || e.memoizedState === null ? Sg : Tc, ei = !1, d = a(o, u), ei = !1, qi && (d = Yh(
      t,
      a,
      o,
      u
    )), Vh(e), d;
  }
  function Vh(e) {
    _.H = $o;
    var t = Ye !== null && Ye.next !== null;
    if (kn = 0, ot = Ye = Ne = null, Mr = !1, Xo = 0, Xi = null, t) throw Error(r(300));
    e === null || lt || (e = e.dependencies, e !== null && vr(e) && (lt = !0));
  }
  function Yh(e, t, a, o) {
    Ne = e;
    var u = 0;
    do {
      if (qi && (Xi = null), Xo = 0, qi = !1, 25 <= u) throw Error(r(301));
      if (u += 1, ot = Ye = null, e.updateQueue != null) {
        var d = e.updateQueue;
        d.lastEffect = null, d.events = null, d.stores = null, d.memoCache != null && (d.memoCache.index = 0);
      }
      _.H = Eg, d = t(a, o);
    } while (qi);
    return d;
  }
  function lx() {
    var e = _.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? Go(t) : t, e = e.useState()[0], (Ye !== null ? Ye.memoizedState : null) !== e && (Ne.flags |= 1024), t;
  }
  function gc() {
    var e = Tr !== 0;
    return Tr = 0, e;
  }
  function mc(e, t, a) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a;
  }
  function pc(e) {
    if (Mr) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Mr = !1;
    }
    kn = 0, ot = Ye = Ne = null, qi = !1, Xo = Tr = 0, Xi = null;
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
    if (Ye === null) {
      var e = Ne.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ye.next;
    var t = ot === null ? Ne.memoizedState : ot.next;
    if (t !== null)
      ot = t, Ye = e;
    else {
      if (e === null)
        throw Ne.alternate === null ? Error(r(467)) : Error(r(310));
      Ye = e, e = {
        memoizedState: Ye.memoizedState,
        baseState: Ye.baseState,
        baseQueue: Ye.baseQueue,
        queue: Ye.queue,
        next: null
      }, ot === null ? Ne.memoizedState = ot = e : ot = ot.next = e;
    }
    return ot;
  }
  function jr() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Go(e) {
    var t = Xo;
    return Xo += 1, Xi === null && (Xi = []), e = Dh(Xi, e, t), t = Ne, (ot === null ? t.memoizedState : ot.next) === null && (t = t.alternate, _.H = t === null || t.memoizedState === null ? Sg : Tc), e;
  }
  function Ar(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Go(e);
      if (e.$$typeof === E) return mt(e);
    }
    throw Error(r(438, String(e)));
  }
  function yc(e) {
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
    if (t == null && (t = { data: [], index: 0 }), a === null && (a = jr(), Ne.updateQueue = a), a.memoCache = t, a = t.data[t.index], a === void 0)
      for (a = t.data[t.index] = Array(e), o = 0; o < e; o++)
        a[o] = K;
    return t.index++, a;
  }
  function Hn(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Dr(e) {
    var t = tt();
    return vc(t, Ye, e);
  }
  function vc(e, t, a) {
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
      var z = w = null, F = null, le = t, ue = !1;
      do {
        var fe = le.lane & -536870913;
        if (fe !== le.lane ? (je & fe) === fe : (kn & fe) === fe) {
          var re = le.revertLane;
          if (re === 0)
            F !== null && (F = F.next = {
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
            }, F === null ? (z = F = fe, w = d) : F = F.next = fe, Ne.lanes |= re, ya |= re;
          fe = le.action, ei && a(d, fe), d = le.hasEagerState ? le.eagerState : a(d, fe);
        } else
          re = {
            lane: fe,
            revertLane: le.revertLane,
            gesture: le.gesture,
            action: le.action,
            hasEagerState: le.hasEagerState,
            eagerState: le.eagerState,
            next: null
          }, F === null ? (z = F = re, w = d) : F = F.next = re, Ne.lanes |= fe, ya |= fe;
        le = le.next;
      } while (le !== null && le !== t);
      if (F === null ? w = d : F.next = z, !Rt(d, e.memoizedState) && (lt = !0, ue && (a = Ui, a !== null)))
        throw a;
      e.memoizedState = d, e.baseState = w, e.baseQueue = F, o.lastRenderedState = d;
    }
    return u === null && (o.lanes = 0), [e.memoizedState, o.dispatch];
  }
  function bc(e) {
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
  function Ih(e, t, a) {
    var o = Ne, u = tt(), d = Oe;
    if (d) {
      if (a === void 0) throw Error(r(407));
      a = a();
    } else a = t();
    var w = !Rt(
      (Ye || u).memoizedState,
      a
    );
    if (w && (u.memoizedState = a, lt = !0), u = u.queue, Sc(Gh.bind(null, o, u, e), [
      e
    ]), u.getSnapshot !== t || w || ot !== null && ot.memoizedState.tag & 1) {
      if (o.flags |= 2048, Gi(
        9,
        { destroy: void 0 },
        Xh.bind(
          null,
          o,
          u,
          a,
          t
        ),
        null
      ), Ge === null) throw Error(r(349));
      d || (kn & 127) !== 0 || qh(o, t, a);
    }
    return a;
  }
  function qh(e, t, a) {
    e.flags |= 16384, e = { getSnapshot: t, value: a }, t = Ne.updateQueue, t === null ? (t = jr(), Ne.updateQueue = t, t.stores = [e]) : (a = t.stores, a === null ? t.stores = [e] : a.push(e));
  }
  function Xh(e, t, a, o) {
    t.value = a, t.getSnapshot = o, Zh(t) && $h(e);
  }
  function Gh(e, t, a) {
    return a(function() {
      Zh(t) && $h(e);
    });
  }
  function Zh(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var a = t();
      return !Rt(e, a);
    } catch {
      return !0;
    }
  }
  function $h(e) {
    var t = Ga(e, 2);
    t !== null && Dt(t, e, 2);
  }
  function xc(e) {
    var t = St();
    if (typeof e == "function") {
      var a = e;
      if (e = a(), ei) {
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
  function Qh(e, t, a, o) {
    return e.baseState = a, vc(
      e,
      Ye,
      typeof o == "function" ? o : Hn
    );
  }
  function rx(e, t, a, o, u) {
    if (Rr(e)) throw Error(r(485));
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
      _.T !== null ? a(!0) : d.isTransition = !1, o(d), a = t.pending, a === null ? (d.next = t.pending = d, Kh(t, d)) : (d.next = a.next, t.pending = a.next = d);
    }
  }
  function Kh(e, t) {
    var a = t.action, o = t.payload, u = e.state;
    if (t.isTransition) {
      var d = _.T, w = {};
      _.T = w;
      try {
        var z = a(u, o), F = _.S;
        F !== null && F(w, z), Jh(e, t, z);
      } catch (le) {
        wc(e, t, le);
      } finally {
        d !== null && w.types !== null && (d.types = w.types), _.T = d;
      }
    } else
      try {
        d = a(u, o), Jh(e, t, d);
      } catch (le) {
        wc(e, t, le);
      }
  }
  function Jh(e, t, a) {
    a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(
      function(o) {
        Wh(e, t, o);
      },
      function(o) {
        return wc(e, t, o);
      }
    ) : Wh(e, t, a);
  }
  function Wh(e, t, a) {
    t.status = "fulfilled", t.value = a, Fh(t), e.state = a, t = e.pending, t !== null && (a = t.next, a === t ? e.pending = null : (a = a.next, t.next = a, Kh(e, a)));
  }
  function wc(e, t, a) {
    var o = e.pending;
    if (e.pending = null, o !== null) {
      o = o.next;
      do
        t.status = "rejected", t.reason = a, Fh(t), t = t.next;
      while (t !== o);
    }
    e.action = null;
  }
  function Fh(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Ph(e, t) {
    return t;
  }
  function eg(e, t) {
    if (Oe) {
      var a = Ge.formState;
      if (a !== null) {
        e: {
          var o = Ne;
          if (Oe) {
            if (Ze) {
              t: {
                for (var u = Ze, d = Qt; u.nodeType !== 8; ) {
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
                Ze = Jt(
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
      lastRenderedReducer: Ph,
      lastRenderedState: t
    }, a.queue = o, a = bg.bind(
      null,
      Ne,
      o
    ), o.dispatch = a, o = xc(!1), d = Mc.bind(
      null,
      Ne,
      !1,
      o.queue
    ), o = St(), u = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, o.queue = u, a = rx.bind(
      null,
      Ne,
      u,
      d,
      a
    ), u.dispatch = a, o.memoizedState = e, [t, a, !1];
  }
  function tg(e) {
    var t = tt();
    return ng(t, Ye, e);
  }
  function ng(e, t, a) {
    if (t = vc(
      e,
      t,
      Ph
    )[0], e = Dr(Hn)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var o = Go(t);
      } catch (w) {
        throw w === Vi ? wr : w;
      }
    else o = t;
    t = tt();
    var u = t.queue, d = u.dispatch;
    return a !== t.memoizedState && (Ne.flags |= 2048, Gi(
      9,
      { destroy: void 0 },
      sx.bind(null, u, a),
      null
    )), [o, d, e];
  }
  function sx(e, t) {
    e.action = t;
  }
  function ag(e) {
    var t = tt(), a = Ye;
    if (a !== null)
      return ng(t, a, e);
    tt(), t = t.memoizedState, a = tt();
    var o = a.queue.dispatch;
    return a.memoizedState = e, [t, o, !1];
  }
  function Gi(e, t, a, o) {
    return e = { tag: e, create: a, deps: o, inst: t, next: null }, t = Ne.updateQueue, t === null && (t = jr(), Ne.updateQueue = t), a = t.lastEffect, a === null ? t.lastEffect = e.next = e : (o = a.next, a.next = e, e.next = o, t.lastEffect = e), e;
  }
  function ig() {
    return tt().memoizedState;
  }
  function Or(e, t, a, o) {
    var u = St();
    Ne.flags |= e, u.memoizedState = Gi(
      1 | t,
      { destroy: void 0 },
      a,
      o === void 0 ? null : o
    );
  }
  function zr(e, t, a, o) {
    var u = tt();
    o = o === void 0 ? null : o;
    var d = u.memoizedState.inst;
    Ye !== null && o !== null && dc(o, Ye.memoizedState.deps) ? u.memoizedState = Gi(t, d, a, o) : (Ne.flags |= e, u.memoizedState = Gi(
      1 | t,
      d,
      a,
      o
    ));
  }
  function og(e, t) {
    Or(8390656, 8, e, t);
  }
  function Sc(e, t) {
    zr(2048, 8, e, t);
  }
  function ux(e) {
    Ne.flags |= 4;
    var t = Ne.updateQueue;
    if (t === null)
      t = jr(), Ne.updateQueue = t, t.events = [e];
    else {
      var a = t.events;
      a === null ? t.events = [e] : a.push(e);
    }
  }
  function lg(e) {
    var t = tt().memoizedState;
    return ux({ ref: t, nextImpl: e }), function() {
      if ((Be & 2) !== 0) throw Error(r(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function rg(e, t) {
    return zr(4, 2, e, t);
  }
  function sg(e, t) {
    return zr(4, 4, e, t);
  }
  function ug(e, t) {
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
  function cg(e, t, a) {
    a = a != null ? a.concat([e]) : null, zr(4, 4, ug.bind(null, t, e), a);
  }
  function Ec() {
  }
  function fg(e, t) {
    var a = tt();
    t = t === void 0 ? null : t;
    var o = a.memoizedState;
    return t !== null && dc(t, o[1]) ? o[0] : (a.memoizedState = [e, t], e);
  }
  function dg(e, t) {
    var a = tt();
    t = t === void 0 ? null : t;
    var o = a.memoizedState;
    if (t !== null && dc(t, o[1]))
      return o[0];
    if (o = e(), ei) {
      dn(!0);
      try {
        e();
      } finally {
        dn(!1);
      }
    }
    return a.memoizedState = [o, t], o;
  }
  function _c(e, t, a) {
    return a === void 0 || (kn & 1073741824) !== 0 && (je & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = a, e = hm(), Ne.lanes |= e, ya |= e, a);
  }
  function hg(e, t, a, o) {
    return Rt(a, t) ? a : Ii.current !== null ? (e = _c(e, a, o), Rt(e, t) || (lt = !0), e) : (kn & 42) === 0 || (kn & 1073741824) !== 0 && (je & 261930) === 0 ? (lt = !0, e.memoizedState = a) : (e = hm(), Ne.lanes |= e, ya |= e, t);
  }
  function gg(e, t, a, o, u) {
    var d = k.p;
    k.p = d !== 0 && 8 > d ? d : 8;
    var w = _.T, z = {};
    _.T = z, Mc(e, !1, t, a);
    try {
      var F = u(), le = _.S;
      if (le !== null && le(z, F), F !== null && typeof F == "object" && typeof F.then == "function") {
        var ue = ix(
          F,
          o
        );
        Zo(
          e,
          t,
          ue,
          Vt(e)
        );
      } else
        Zo(
          e,
          t,
          o,
          Vt(e)
        );
    } catch (fe) {
      Zo(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: fe },
        Vt()
      );
    } finally {
      k.p = d, w !== null && z.types !== null && (w.types = z.types), _.T = w;
    }
  }
  function cx() {
  }
  function Nc(e, t, a, o) {
    if (e.tag !== 5) throw Error(r(476));
    var u = mg(e).queue;
    gg(
      e,
      u,
      t,
      B,
      a === null ? cx : function() {
        return pg(e), a(o);
      }
    );
  }
  function mg(e) {
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
  function pg(e) {
    var t = mg(e);
    t.next === null && (t = e.alternate.memoizedState), Zo(
      e,
      t.next.queue,
      {},
      Vt()
    );
  }
  function Cc() {
    return mt(ul);
  }
  function yg() {
    return tt().memoizedState;
  }
  function vg() {
    return tt().memoizedState;
  }
  function fx(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = Vt();
          e = fa(a);
          var o = da(t, e, a);
          o !== null && (Dt(o, t, a), Yo(o, t, a)), t = { cache: tc() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function dx(e, t, a) {
    var o = Vt();
    a = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Rr(e) ? xg(t, a) : (a = Xu(e, t, a, o), a !== null && (Dt(a, e, o), wg(a, t, o)));
  }
  function bg(e, t, a) {
    var o = Vt();
    Zo(e, t, a, o);
  }
  function Zo(e, t, a, o) {
    var u = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Rr(e)) xg(t, u);
    else {
      var d = e.alternate;
      if (e.lanes === 0 && (d === null || d.lanes === 0) && (d = t.lastRenderedReducer, d !== null))
        try {
          var w = t.lastRenderedState, z = d(w, a);
          if (u.hasEagerState = !0, u.eagerState = z, Rt(z, w))
            return gr(e, t, u, 0), Ge === null && hr(), !1;
        } catch {
        }
      if (a = Xu(e, t, u, o), a !== null)
        return Dt(a, e, o), wg(a, t, o), !0;
    }
    return !1;
  }
  function Mc(e, t, a, o) {
    if (o = {
      lane: 2,
      revertLane: lf(),
      gesture: null,
      action: o,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Rr(e)) {
      if (t) throw Error(r(479));
    } else
      t = Xu(
        e,
        a,
        o,
        2
      ), t !== null && Dt(t, e, 2);
  }
  function Rr(e) {
    var t = e.alternate;
    return e === Ne || t !== null && t === Ne;
  }
  function xg(e, t) {
    qi = Mr = !0;
    var a = e.pending;
    a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
  }
  function wg(e, t, a) {
    if ((a & 4194048) !== 0) {
      var o = t.lanes;
      o &= e.pendingLanes, a |= o, t.lanes = a, $l(e, a);
    }
  }
  var $o = {
    readContext: mt,
    use: Ar,
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
  $o.useEffectEvent = We;
  var Sg = {
    readContext: mt,
    use: Ar,
    useCallback: function(e, t) {
      return St().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: mt,
    useEffect: og,
    useImperativeHandle: function(e, t, a) {
      a = a != null ? a.concat([e]) : null, Or(
        4194308,
        4,
        ug.bind(null, t, e),
        a
      );
    },
    useLayoutEffect: function(e, t) {
      return Or(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      Or(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var a = St();
      t = t === void 0 ? null : t;
      var o = e();
      if (ei) {
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
        if (ei) {
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
      }, o.queue = e, e = e.dispatch = dx.bind(
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
      e = xc(e);
      var t = e.queue, a = bg.bind(null, Ne, t);
      return t.dispatch = a, [e.memoizedState, a];
    },
    useDebugValue: Ec,
    useDeferredValue: function(e, t) {
      var a = St();
      return _c(a, e, t);
    },
    useTransition: function() {
      var e = xc(!1);
      return e = gg.bind(
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
        (je & 127) !== 0 || qh(o, t, a);
      }
      u.memoizedState = a;
      var d = { value: a, getSnapshot: t };
      return u.queue = d, og(Gh.bind(null, o, d, e), [
        e
      ]), o.flags |= 2048, Gi(
        9,
        { destroy: void 0 },
        Xh.bind(
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
        a = (o & ~(1 << 32 - wt(o) - 1)).toString(32) + a, t = "_" + t + "R_" + a, a = Tr++, 0 < a && (t += "H" + a.toString(32)), t += "_";
      } else
        a = ox++, t = "_" + t + "r_" + a.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Cc,
    useFormState: eg,
    useActionState: eg,
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
      return t.queue = a, t = Mc.bind(
        null,
        Ne,
        !0,
        a
      ), a.dispatch = t, [e, t];
    },
    useMemoCache: yc,
    useCacheRefresh: function() {
      return St().memoizedState = fx.bind(
        null,
        Ne
      );
    },
    useEffectEvent: function(e) {
      var t = St(), a = { impl: e };
      return t.memoizedState = a, function() {
        if ((Be & 2) !== 0)
          throw Error(r(440));
        return a.impl.apply(void 0, arguments);
      };
    }
  }, Tc = {
    readContext: mt,
    use: Ar,
    useCallback: fg,
    useContext: mt,
    useEffect: Sc,
    useImperativeHandle: cg,
    useInsertionEffect: rg,
    useLayoutEffect: sg,
    useMemo: dg,
    useReducer: Dr,
    useRef: ig,
    useState: function() {
      return Dr(Hn);
    },
    useDebugValue: Ec,
    useDeferredValue: function(e, t) {
      var a = tt();
      return hg(
        a,
        Ye.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Dr(Hn)[0], t = tt().memoizedState;
      return [
        typeof e == "boolean" ? e : Go(e),
        t
      ];
    },
    useSyncExternalStore: Ih,
    useId: yg,
    useHostTransitionStatus: Cc,
    useFormState: tg,
    useActionState: tg,
    useOptimistic: function(e, t) {
      var a = tt();
      return Qh(a, Ye, e, t);
    },
    useMemoCache: yc,
    useCacheRefresh: vg
  };
  Tc.useEffectEvent = lg;
  var Eg = {
    readContext: mt,
    use: Ar,
    useCallback: fg,
    useContext: mt,
    useEffect: Sc,
    useImperativeHandle: cg,
    useInsertionEffect: rg,
    useLayoutEffect: sg,
    useMemo: dg,
    useReducer: bc,
    useRef: ig,
    useState: function() {
      return bc(Hn);
    },
    useDebugValue: Ec,
    useDeferredValue: function(e, t) {
      var a = tt();
      return Ye === null ? _c(a, e, t) : hg(
        a,
        Ye.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = bc(Hn)[0], t = tt().memoizedState;
      return [
        typeof e == "boolean" ? e : Go(e),
        t
      ];
    },
    useSyncExternalStore: Ih,
    useId: yg,
    useHostTransitionStatus: Cc,
    useFormState: ag,
    useActionState: ag,
    useOptimistic: function(e, t) {
      var a = tt();
      return Ye !== null ? Qh(a, Ye, e, t) : (a.baseState = e, [e, a.queue.dispatch]);
    },
    useMemoCache: yc,
    useCacheRefresh: vg
  };
  Eg.useEffectEvent = lg;
  function jc(e, t, a, o) {
    t = e.memoizedState, a = a(o, t), a = a == null ? t : m({}, t, a), e.memoizedState = a, e.lanes === 0 && (e.updateQueue.baseState = a);
  }
  var Ac = {
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
  function _g(e, t, a, o, u, d, w) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(o, d, w) : t.prototype && t.prototype.isPureReactComponent ? !zo(a, o) || !zo(u, d) : !0;
  }
  function Ng(e, t, a, o) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, o), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, o), t.state !== e && Ac.enqueueReplaceState(t, t.state, null);
  }
  function ti(e, t) {
    var a = t;
    if ("ref" in t) {
      a = {};
      for (var o in t)
        o !== "ref" && (a[o] = t[o]);
    }
    if (e = e.defaultProps) {
      a === t && (a = m({}, a));
      for (var u in e)
        a[u] === void 0 && (a[u] = e[u]);
    }
    return a;
  }
  function Cg(e) {
    dr(e);
  }
  function Mg(e) {
    console.error(e);
  }
  function Tg(e) {
    dr(e);
  }
  function kr(e, t) {
    try {
      var a = e.onUncaughtError;
      a(t.value, { componentStack: t.stack });
    } catch (o) {
      setTimeout(function() {
        throw o;
      });
    }
  }
  function jg(e, t, a) {
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
  function Dc(e, t, a) {
    return a = fa(a), a.tag = 3, a.payload = { element: null }, a.callback = function() {
      kr(e, t);
    }, a;
  }
  function Ag(e) {
    return e = fa(e), e.tag = 3, e;
  }
  function Dg(e, t, a, o) {
    var u = a.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var d = o.value;
      e.payload = function() {
        return u(d);
      }, e.callback = function() {
        jg(t, a, o);
      };
    }
    var w = a.stateNode;
    w !== null && typeof w.componentDidCatch == "function" && (e.callback = function() {
      jg(t, a, o), typeof u != "function" && (va === null ? va = /* @__PURE__ */ new Set([this]) : va.add(this));
      var z = o.stack;
      this.componentDidCatch(o.value, {
        componentStack: z !== null ? z : ""
      });
    });
  }
  function hx(e, t, a, o, u) {
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
            return Kt === null ? $r() : a.alternate === null && Fe === 0 && (Fe = 3), a.flags &= -257, a.flags |= 65536, a.lanes = u, o === Sr ? a.flags |= 16384 : (t = a.updateQueue, t === null ? a.updateQueue = /* @__PURE__ */ new Set([o]) : t.add(o), nf(e, o, u)), !1;
          case 22:
            return a.flags |= 65536, o === Sr ? a.flags |= 16384 : (t = a.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([o])
            }, a.updateQueue = t) : (a = t.retryQueue, a === null ? t.retryQueue = /* @__PURE__ */ new Set([o]) : a.add(o)), nf(e, o, u)), !1;
        }
        throw Error(r(435, a.tag));
      }
      return nf(e, o, u), $r(), !1;
    }
    if (Oe)
      return t = Ht.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = u, o !== Ju && (e = Error(r(422), { cause: o }), Ho(Gt(e, a)))) : (o !== Ju && (t = Error(r(423), {
        cause: o
      }), Ho(
        Gt(t, a)
      )), e = e.current.alternate, e.flags |= 65536, u &= -u, e.lanes |= u, o = Gt(o, a), u = Dc(
        e.stateNode,
        o,
        u
      ), rc(e, u), Fe !== 4 && (Fe = 2)), !1;
    var d = Error(r(520), { cause: o });
    if (d = Gt(d, a), tl === null ? tl = [d] : tl.push(d), Fe !== 4 && (Fe = 2), t === null) return !0;
    o = Gt(o, a), a = t;
    do {
      switch (a.tag) {
        case 3:
          return a.flags |= 65536, e = u & -u, a.lanes |= e, e = Dc(a.stateNode, o, e), rc(a, e), !1;
        case 1:
          if (t = a.type, d = a.stateNode, (a.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || d !== null && typeof d.componentDidCatch == "function" && (va === null || !va.has(d))))
            return a.flags |= 65536, u &= -u, a.lanes |= u, u = Ag(u), Dg(
              u,
              e,
              a,
              o
            ), rc(a, u), !1;
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var Oc = Error(r(461)), lt = !1;
  function pt(e, t, a, o) {
    t.child = e === null ? kh(t, null, a, o) : Pa(
      t,
      e.child,
      a,
      o
    );
  }
  function Og(e, t, a, o, u) {
    a = a.render;
    var d = t.ref;
    if ("ref" in o) {
      var w = {};
      for (var z in o)
        z !== "ref" && (w[z] = o[z]);
    } else w = o;
    return Ka(t), o = hc(
      e,
      t,
      a,
      w,
      d,
      u
    ), z = gc(), e !== null && !lt ? (mc(e, t, u), Bn(e, t, u)) : (Oe && z && Qu(t), t.flags |= 1, pt(e, t, o, u), t.child);
  }
  function zg(e, t, a, o, u) {
    if (e === null) {
      var d = a.type;
      return typeof d == "function" && !Gu(d) && d.defaultProps === void 0 && a.compare === null ? (t.tag = 15, t.type = d, Rg(
        e,
        t,
        d,
        o,
        u
      )) : (e = pr(
        a.type,
        null,
        o,
        t,
        t.mode,
        u
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (d = e.child, !Vc(e, u)) {
      var w = d.memoizedProps;
      if (a = a.compare, a = a !== null ? a : zo, a(w, o) && e.ref === t.ref)
        return Bn(e, t, u);
    }
    return t.flags |= 1, e = Dn(d, o), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Rg(e, t, a, o, u) {
    if (e !== null) {
      var d = e.memoizedProps;
      if (zo(d, o) && e.ref === t.ref)
        if (lt = !1, t.pendingProps = o = d, Vc(e, u))
          (e.flags & 131072) !== 0 && (lt = !0);
        else
          return t.lanes = e.lanes, Bn(e, t, u);
    }
    return zc(
      e,
      t,
      a,
      o,
      u
    );
  }
  function kg(e, t, a, o) {
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
        return Hg(
          e,
          t,
          d,
          a,
          o
        );
      }
      if ((a & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && xr(
          t,
          d !== null ? d.cachePool : null
        ), d !== null ? Lh(t, d) : uc(), Uh(t);
      else
        return o = t.lanes = 536870912, Hg(
          e,
          t,
          d !== null ? d.baseLanes | a : a,
          a,
          o
        );
    } else
      d !== null ? (xr(t, d.cachePool), Lh(t, d), ga(), t.memoizedState = null) : (e !== null && xr(t, null), uc(), ga());
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
  function Hg(e, t, a, o, u) {
    var d = ac();
    return d = d === null ? null : { parent: it._currentValue, pool: d }, t.memoizedState = {
      baseLanes: a,
      cachePool: d
    }, e !== null && xr(t, null), uc(), Uh(t), e !== null && Bi(e, t, o, !0), t.childLanes = u, null;
  }
  function Hr(e, t) {
    return t = Lr(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Bg(e, t, a) {
    return Pa(t, e.child, null, a), e = Hr(t, t.pendingProps), e.flags |= 2, Bt(t), t.memoizedState = null, e;
  }
  function gx(e, t, a) {
    var o = t.pendingProps, u = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (Oe) {
        if (o.mode === "hidden")
          return e = Hr(t, o), t.lanes = 536870912, Qo(null, e);
        if (fc(t), (e = Ze) ? (e = Km(
          e,
          Qt
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: la !== null ? { id: gn, overflow: mn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = xh(e), a.return = t, t.child = a, gt = t, Ze = null)) : e = null, e === null) throw sa(t);
        return t.lanes = 536870912, null;
      }
      return Hr(t, o);
    }
    var d = e.memoizedState;
    if (d !== null) {
      var w = d.dehydrated;
      if (fc(t), u)
        if (t.flags & 256)
          t.flags &= -257, t = Bg(
            e,
            t,
            a
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(r(558));
      else if (lt || Bi(e, t, a, !1), u = (a & e.childLanes) !== 0, lt || u) {
        if (o = Ge, o !== null && (w = Ql(o, a), w !== 0 && w !== d.retryLane))
          throw d.retryLane = w, Ga(e, w), Dt(o, e, w), Oc;
        $r(), t = Bg(
          e,
          t,
          a
        );
      } else
        e = d.treeContext, Ze = Jt(w.nextSibling), gt = t, Oe = !0, ra = null, Qt = !1, e !== null && Eh(t, e), t = Hr(t, o), t.flags |= 4096;
      return t;
    }
    return e = Dn(e.child, {
      mode: o.mode,
      children: o.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Br(e, t) {
    var a = t.ref;
    if (a === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != "function" && typeof a != "object")
        throw Error(r(284));
      (e === null || e.ref !== a) && (t.flags |= 4194816);
    }
  }
  function zc(e, t, a, o, u) {
    return Ka(t), a = hc(
      e,
      t,
      a,
      o,
      void 0,
      u
    ), o = gc(), e !== null && !lt ? (mc(e, t, u), Bn(e, t, u)) : (Oe && o && Qu(t), t.flags |= 1, pt(e, t, a, u), t.child);
  }
  function Lg(e, t, a, o, u, d) {
    return Ka(t), t.updateQueue = null, a = Yh(
      t,
      o,
      a,
      u
    ), Vh(e), o = gc(), e !== null && !lt ? (mc(e, t, d), Bn(e, t, d)) : (Oe && o && Qu(t), t.flags |= 1, pt(e, t, a, d), t.child);
  }
  function Ug(e, t, a, o, u) {
    if (Ka(t), t.stateNode === null) {
      var d = zi, w = a.contextType;
      typeof w == "object" && w !== null && (d = mt(w)), d = new a(o, d), t.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null, d.updater = Ac, t.stateNode = d, d._reactInternals = t, d = t.stateNode, d.props = o, d.state = t.memoizedState, d.refs = {}, oc(t), w = a.contextType, d.context = typeof w == "object" && w !== null ? mt(w) : zi, d.state = t.memoizedState, w = a.getDerivedStateFromProps, typeof w == "function" && (jc(
        t,
        a,
        w,
        o
      ), d.state = t.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof d.getSnapshotBeforeUpdate == "function" || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (w = d.state, typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(), w !== d.state && Ac.enqueueReplaceState(d, d.state, null), qo(t, o, d, u), Io(), d.state = t.memoizedState), typeof d.componentDidMount == "function" && (t.flags |= 4194308), o = !0;
    } else if (e === null) {
      d = t.stateNode;
      var z = t.memoizedProps, F = ti(a, z);
      d.props = F;
      var le = d.context, ue = a.contextType;
      w = zi, typeof ue == "object" && ue !== null && (w = mt(ue));
      var fe = a.getDerivedStateFromProps;
      ue = typeof fe == "function" || typeof d.getSnapshotBeforeUpdate == "function", z = t.pendingProps !== z, ue || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (z || le !== w) && Ng(
        t,
        d,
        o,
        w
      ), ca = !1;
      var re = t.memoizedState;
      d.state = re, qo(t, o, d, u), Io(), le = t.memoizedState, z || re !== le || ca ? (typeof fe == "function" && (jc(
        t,
        a,
        fe,
        o
      ), le = t.memoizedState), (F = ca || _g(
        t,
        a,
        F,
        o,
        re,
        le,
        w
      )) ? (ue || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount()), typeof d.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof d.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = o, t.memoizedState = le), d.props = o, d.state = le, d.context = w, o = F) : (typeof d.componentDidMount == "function" && (t.flags |= 4194308), o = !1);
    } else {
      d = t.stateNode, lc(e, t), w = t.memoizedProps, ue = ti(a, w), d.props = ue, fe = t.pendingProps, re = d.context, le = a.contextType, F = zi, typeof le == "object" && le !== null && (F = mt(le)), z = a.getDerivedStateFromProps, (le = typeof z == "function" || typeof d.getSnapshotBeforeUpdate == "function") || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (w !== fe || re !== F) && Ng(
        t,
        d,
        o,
        F
      ), ca = !1, re = t.memoizedState, d.state = re, qo(t, o, d, u), Io();
      var se = t.memoizedState;
      w !== fe || re !== se || ca || e !== null && e.dependencies !== null && vr(e.dependencies) ? (typeof z == "function" && (jc(
        t,
        a,
        z,
        o
      ), se = t.memoizedState), (ue = ca || _g(
        t,
        a,
        ue,
        o,
        re,
        se,
        F
      ) || e !== null && e.dependencies !== null && vr(e.dependencies)) ? (le || typeof d.UNSAFE_componentWillUpdate != "function" && typeof d.componentWillUpdate != "function" || (typeof d.componentWillUpdate == "function" && d.componentWillUpdate(o, se, F), typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(
        o,
        se,
        F
      )), typeof d.componentDidUpdate == "function" && (t.flags |= 4), typeof d.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof d.componentDidUpdate != "function" || w === e.memoizedProps && re === e.memoizedState || (t.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || w === e.memoizedProps && re === e.memoizedState || (t.flags |= 1024), t.memoizedProps = o, t.memoizedState = se), d.props = o, d.state = se, d.context = F, o = ue) : (typeof d.componentDidUpdate != "function" || w === e.memoizedProps && re === e.memoizedState || (t.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || w === e.memoizedProps && re === e.memoizedState || (t.flags |= 1024), o = !1);
    }
    return d = o, Br(e, t), o = (t.flags & 128) !== 0, d || o ? (d = t.stateNode, a = o && typeof a.getDerivedStateFromError != "function" ? null : d.render(), t.flags |= 1, e !== null && o ? (t.child = Pa(
      t,
      e.child,
      null,
      u
    ), t.child = Pa(
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
  function Vg(e, t, a, o) {
    return $a(), t.flags |= 256, pt(e, t, a, o), t.child;
  }
  var Rc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function kc(e) {
    return { baseLanes: e, cachePool: jh() };
  }
  function Hc(e, t, a) {
    return e = e !== null ? e.childLanes & ~a : 0, t && (e |= Ut), e;
  }
  function Yg(e, t, a) {
    var o = t.pendingProps, u = !1, d = (t.flags & 128) !== 0, w;
    if ((w = d) || (w = e !== null && e.memoizedState === null ? !1 : (et.current & 2) !== 0), w && (u = !0, t.flags &= -129), w = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (Oe) {
        if (u ? ha(t) : ga(), (e = Ze) ? (e = Km(
          e,
          Qt
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: la !== null ? { id: gn, overflow: mn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = xh(e), a.return = t, t.child = a, gt = t, Ze = null)) : e = null, e === null) throw sa(t);
        return bf(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var z = o.children;
      return o = o.fallback, u ? (ga(), u = t.mode, z = Lr(
        { mode: "hidden", children: z },
        u
      ), o = Za(
        o,
        u,
        a,
        null
      ), z.return = t, o.return = t, z.sibling = o, t.child = z, o = t.child, o.memoizedState = kc(a), o.childLanes = Hc(
        e,
        w,
        a
      ), t.memoizedState = Rc, Qo(null, o)) : (ha(t), Bc(t, z));
    }
    var F = e.memoizedState;
    if (F !== null && (z = F.dehydrated, z !== null)) {
      if (d)
        t.flags & 256 ? (ha(t), t.flags &= -257, t = Lc(
          e,
          t,
          a
        )) : t.memoizedState !== null ? (ga(), t.child = e.child, t.flags |= 128, t = null) : (ga(), z = o.fallback, u = t.mode, o = Lr(
          { mode: "visible", children: o.children },
          u
        ), z = Za(
          z,
          u,
          a,
          null
        ), z.flags |= 2, o.return = t, z.return = t, o.sibling = z, t.child = o, Pa(
          t,
          e.child,
          null,
          a
        ), o = t.child, o.memoizedState = kc(a), o.childLanes = Hc(
          e,
          w,
          a
        ), t.memoizedState = Rc, t = Qo(null, o));
      else if (ha(t), bf(z)) {
        if (w = z.nextSibling && z.nextSibling.dataset, w) var le = w.dgst;
        w = le, o = Error(r(419)), o.stack = "", o.digest = w, Ho({ value: o, source: null, stack: null }), t = Lc(
          e,
          t,
          a
        );
      } else if (lt || Bi(e, t, a, !1), w = (a & e.childLanes) !== 0, lt || w) {
        if (w = Ge, w !== null && (o = Ql(w, a), o !== 0 && o !== F.retryLane))
          throw F.retryLane = o, Ga(e, o), Dt(w, e, o), Oc;
        vf(z) || $r(), t = Lc(
          e,
          t,
          a
        );
      } else
        vf(z) ? (t.flags |= 192, t.child = e.child, t = null) : (e = F.treeContext, Ze = Jt(
          z.nextSibling
        ), gt = t, Oe = !0, ra = null, Qt = !1, e !== null && Eh(t, e), t = Bc(
          t,
          o.children
        ), t.flags |= 4096);
      return t;
    }
    return u ? (ga(), z = o.fallback, u = t.mode, F = e.child, le = F.sibling, o = Dn(F, {
      mode: "hidden",
      children: o.children
    }), o.subtreeFlags = F.subtreeFlags & 65011712, le !== null ? z = Dn(
      le,
      z
    ) : (z = Za(
      z,
      u,
      a,
      null
    ), z.flags |= 2), z.return = t, o.return = t, o.sibling = z, t.child = o, Qo(null, o), o = t.child, z = e.child.memoizedState, z === null ? z = kc(a) : (u = z.cachePool, u !== null ? (F = it._currentValue, u = u.parent !== F ? { parent: F, pool: F } : u) : u = jh(), z = {
      baseLanes: z.baseLanes | a,
      cachePool: u
    }), o.memoizedState = z, o.childLanes = Hc(
      e,
      w,
      a
    ), t.memoizedState = Rc, Qo(e.child, o)) : (ha(t), a = e.child, e = a.sibling, a = Dn(a, {
      mode: "visible",
      children: o.children
    }), a.return = t, a.sibling = null, e !== null && (w = t.deletions, w === null ? (t.deletions = [e], t.flags |= 16) : w.push(e)), t.child = a, t.memoizedState = null, a);
  }
  function Bc(e, t) {
    return t = Lr(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function Lr(e, t) {
    return e = kt(22, e, null, t), e.lanes = 0, e;
  }
  function Lc(e, t, a) {
    return Pa(t, e.child, null, a), e = Bc(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function Ig(e, t, a) {
    e.lanes |= t;
    var o = e.alternate;
    o !== null && (o.lanes |= t), Pu(e.return, t, a);
  }
  function Uc(e, t, a, o, u, d) {
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
  function qg(e, t, a) {
    var o = t.pendingProps, u = o.revealOrder, d = o.tail;
    o = o.children;
    var w = et.current, z = (w & 2) !== 0;
    if (z ? (w = w & 1 | 2, t.flags |= 128) : w &= 1, G(et, w), pt(e, t, o, a), o = Oe ? ko : 0, !z && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Ig(e, a, t);
        else if (e.tag === 19)
          Ig(e, a, t);
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
          e = a.alternate, e !== null && Cr(e) === null && (u = a), a = a.sibling;
        a = u, a === null ? (u = t.child, t.child = null) : (u = a.sibling, a.sibling = null), Uc(
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
          if (e = u.alternate, e !== null && Cr(e) === null) {
            t.child = u;
            break;
          }
          e = u.sibling, u.sibling = a, a = u, u = e;
        }
        Uc(
          t,
          !0,
          a,
          null,
          d,
          o
        );
        break;
      case "together":
        Uc(
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
  function Vc(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && vr(e)));
  }
  function mx(e, t, a) {
    switch (t.tag) {
      case 3:
        P(t, t.stateNode.containerInfo), ua(t, it, e.memoizedState.cache), $a();
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
          return t.flags |= 128, fc(t), null;
        break;
      case 13:
        var o = t.memoizedState;
        if (o !== null)
          return o.dehydrated !== null ? (ha(t), t.flags |= 128, null) : (a & t.child.childLanes) !== 0 ? Yg(e, t, a) : (ha(t), e = Bn(
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
            return qg(
              e,
              t,
              a
            );
          t.flags |= 128;
        }
        if (u = t.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), G(et, et.current), o) break;
        return null;
      case 22:
        return t.lanes = 0, kg(
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
  function Xg(e, t, a) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        lt = !0;
      else {
        if (!Vc(e, a) && (t.flags & 128) === 0)
          return lt = !1, mx(
            e,
            t,
            a
          );
        lt = (e.flags & 131072) !== 0;
      }
    else
      lt = !1, Oe && (t.flags & 1048576) !== 0 && Sh(t, ko, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var o = t.pendingProps;
          if (e = Wa(t.elementType), t.type = e, typeof e == "function")
            Gu(e) ? (o = ti(e, o), t.tag = 1, t = Ug(
              null,
              t,
              e,
              o,
              a
            )) : (t.tag = 0, t = zc(
              null,
              t,
              e,
              o,
              a
            ));
          else {
            if (e != null) {
              var u = e.$$typeof;
              if (u === M) {
                t.tag = 11, t = Og(
                  null,
                  t,
                  e,
                  o,
                  a
                );
                break e;
              } else if (u === Y) {
                t.tag = 14, t = zg(
                  null,
                  t,
                  e,
                  o,
                  a
                );
                break e;
              }
            }
            throw t = N(e) || e, Error(r(306, t, ""));
          }
        }
        return t;
      case 0:
        return zc(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 1:
        return o = t.type, u = ti(
          o,
          t.pendingProps
        ), Ug(
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
          u = d.element, lc(e, t), qo(t, o, null, a);
          var w = t.memoizedState;
          if (o = w.cache, ua(t, it, o), o !== d.cache && ec(
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
              t = Vg(
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
              ), Ho(u), t = Vg(
                e,
                t,
                o,
                a
              );
              break e;
            } else
              for (e = t.stateNode.containerInfo, e.nodeType === 9 ? e = e.body : e = e.nodeName === "HTML" ? e.ownerDocument.body : e, Ze = Jt(e.firstChild), gt = t, Oe = !0, ra = null, Qt = !0, a = kh(
                t,
                null,
                o,
                a
              ), t.child = a; a; )
                a.flags = a.flags & -3 | 4096, a = a.sibling;
          else {
            if ($a(), o === u) {
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
        return Br(e, t), e === null ? (a = tp(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = a : Oe || (a = t.type, e = t.pendingProps, o = es(
          $.current
        ).createElement(a), o[ct] = t, o[vt] = e, yt(o, a, e), at(o), t.stateNode = o) : t.memoizedState = tp(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return de(t), e === null && Oe && (o = t.stateNode = Fm(
          t.type,
          t.pendingProps,
          $.current
        ), gt = t, Qt = !0, u = Ze, Sa(t.type) ? (xf = u, Ze = Jt(o.firstChild)) : Ze = u), pt(
          e,
          t,
          t.pendingProps.children,
          a
        ), Br(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && Oe && ((u = o = Ze) && (o = Gx(
          o,
          t.type,
          t.pendingProps,
          Qt
        ), o !== null ? (t.stateNode = o, gt = t, Ze = Jt(o.firstChild), Qt = !1, u = !0) : u = !1), u || sa(t)), de(t), u = t.type, d = t.pendingProps, w = e !== null ? e.memoizedProps : null, o = d.children, mf(u, d) ? o = null : w !== null && mf(u, w) && (t.flags |= 32), t.memoizedState !== null && (u = hc(
          e,
          t,
          lx,
          null,
          null,
          a
        ), ul._currentValue = u), Br(e, t), pt(e, t, o, a), t.child;
      case 6:
        return e === null && Oe && ((e = a = Ze) && (a = Zx(
          a,
          t.pendingProps,
          Qt
        ), a !== null ? (t.stateNode = a, gt = t, Ze = null, e = !0) : e = !1), e || sa(t)), null;
      case 13:
        return Yg(e, t, a);
      case 4:
        return P(
          t,
          t.stateNode.containerInfo
        ), o = t.pendingProps, e === null ? t.child = Pa(
          t,
          null,
          o,
          a
        ) : pt(e, t, o, a), t.child;
      case 11:
        return Og(
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
        return u = t.type._context, o = t.pendingProps.children, Ka(t), u = mt(u), o = o(u), t.flags |= 1, pt(e, t, o, a), t.child;
      case 14:
        return zg(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 15:
        return Rg(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 19:
        return qg(e, t, a);
      case 31:
        return gx(e, t, a);
      case 22:
        return kg(
          e,
          t,
          a,
          t.pendingProps
        );
      case 24:
        return Ka(t), o = mt(it), e === null ? (u = ac(), u === null && (u = Ge, d = tc(), u.pooledCache = d, d.refCount++, d !== null && (u.pooledCacheLanes |= a), u = d), t.memoizedState = { parent: o, cache: u }, oc(t), ua(t, it, u)) : ((e.lanes & a) !== 0 && (lc(e, t), qo(t, null, null, a), Io()), u = e.memoizedState, d = t.memoizedState, u.parent !== o ? (u = { parent: o, cache: o }, t.memoizedState = u, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u), ua(t, it, o)) : (o = d.cache, ua(t, it, o), o !== u.cache && ec(
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
  function Yc(e, t, a, o, u) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (u & 335544128) === u)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (ym()) e.flags |= 8192;
        else
          throw Fa = Sr, ic;
    } else e.flags &= -16777217;
  }
  function Gg(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !lp(t))
      if (ym()) e.flags |= 8192;
      else
        throw Fa = Sr, ic;
  }
  function Ur(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Gl() : 536870912, e.lanes |= t, Ki |= t);
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
  function $e(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, a = 0, o = 0;
    if (t)
      for (var u = e.child; u !== null; )
        a |= u.lanes | u.childLanes, o |= u.subtreeFlags & 65011712, o |= u.flags & 65011712, u.return = e, u = u.sibling;
    else
      for (u = e.child; u !== null; )
        a |= u.lanes | u.childLanes, o |= u.subtreeFlags, o |= u.flags, u.return = e, u = u.sibling;
    return e.subtreeFlags |= o, e.childLanes = a, t;
  }
  function px(e, t, a) {
    var o = t.pendingProps;
    switch (Ku(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return $e(t), null;
      case 1:
        return $e(t), null;
      case 3:
        return a = t.stateNode, o = null, e !== null && (o = e.memoizedState.cache), t.memoizedState.cache !== o && (t.flags |= 2048), Rn(it), ie(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (e === null || e.child === null) && (Hi(t) ? Ln(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Wu())), $e(t), null;
      case 26:
        var u = t.type, d = t.memoizedState;
        return e === null ? (Ln(t), d !== null ? ($e(t), Gg(t, d)) : ($e(t), Yc(
          t,
          u,
          null,
          o,
          a
        ))) : d ? d !== e.memoizedState ? (Ln(t), $e(t), Gg(t, d)) : ($e(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== o && Ln(t), $e(t), Yc(
          t,
          u,
          e,
          o,
          a
        )), null;
      case 27:
        if (he(t), a = $.current, u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== o && Ln(t);
        else {
          if (!o) {
            if (t.stateNode === null)
              throw Error(r(166));
            return $e(t), null;
          }
          e = R.current, Hi(t) ? _h(t) : (e = Fm(u, o, a), t.stateNode = e, Ln(t));
        }
        return $e(t), null;
      case 5:
        if (he(t), u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== o && Ln(t);
        else {
          if (!o) {
            if (t.stateNode === null)
              throw Error(r(166));
            return $e(t), null;
          }
          if (d = R.current, Hi(t))
            _h(t);
          else {
            var w = es(
              $.current
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
        return $e(t), Yc(
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
          if (e = $.current, Hi(t)) {
            if (e = t.stateNode, a = t.memoizedProps, o = null, u = gt, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  o = u.memoizedProps;
              }
            e[ct] = t, e = !!(e.nodeValue === a || o !== null && o.suppressHydrationWarning === !0 || Ym(e.nodeValue, a)), e || sa(t, !0);
          } else
            e = es(e).createTextNode(
              o
            ), e[ct] = t, t.stateNode = e;
        }
        return $e(t), null;
      case 31:
        if (a = t.memoizedState, e === null || e.memoizedState !== null) {
          if (o = Hi(t), a !== null) {
            if (e === null) {
              if (!o) throw Error(r(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(r(557));
              e[ct] = t;
            } else
              $a(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            $e(t), e = !1;
          } else
            a = Wu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), e = !0;
          if (!e)
            return t.flags & 256 ? (Bt(t), t) : (Bt(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(r(558));
        }
        return $e(t), null;
      case 13:
        if (o = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (u = Hi(t), o !== null && o.dehydrated !== null) {
            if (e === null) {
              if (!u) throw Error(r(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(r(317));
              u[ct] = t;
            } else
              $a(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            $e(t), u = !1;
          } else
            u = Wu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return t.flags & 256 ? (Bt(t), t) : (Bt(t), null);
        }
        return Bt(t), (t.flags & 128) !== 0 ? (t.lanes = a, t) : (a = o !== null, e = e !== null && e.memoizedState !== null, a && (o = t.child, u = null, o.alternate !== null && o.alternate.memoizedState !== null && o.alternate.memoizedState.cachePool !== null && (u = o.alternate.memoizedState.cachePool.pool), d = null, o.memoizedState !== null && o.memoizedState.cachePool !== null && (d = o.memoizedState.cachePool.pool), d !== u && (o.flags |= 2048)), a !== e && a && (t.child.flags |= 8192), Ur(t, t.updateQueue), $e(t), null);
      case 4:
        return ie(), e === null && cf(t.stateNode.containerInfo), $e(t), null;
      case 10:
        return Rn(t.type), $e(t), null;
      case 19:
        if (q(et), o = t.memoizedState, o === null) return $e(t), null;
        if (u = (t.flags & 128) !== 0, d = o.rendering, d === null)
          if (u) Ko(o, !1);
          else {
            if (Fe !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (d = Cr(e), d !== null) {
                  for (t.flags |= 128, Ko(o, !1), e = d.updateQueue, t.updateQueue = e, Ur(t, e), t.subtreeFlags = 0, e = a, a = t.child; a !== null; )
                    bh(a, e), a = a.sibling;
                  return G(
                    et,
                    et.current & 1 | 2
                  ), Oe && On(t, o.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            o.tail !== null && ht() > Xr && (t.flags |= 128, u = !0, Ko(o, !1), t.lanes = 4194304);
          }
        else {
          if (!u)
            if (e = Cr(d), e !== null) {
              if (t.flags |= 128, u = !0, e = e.updateQueue, t.updateQueue = e, Ur(t, e), Ko(o, !0), o.tail === null && o.tailMode === "hidden" && !d.alternate && !Oe)
                return $e(t), null;
            } else
              2 * ht() - o.renderingStartTime > Xr && a !== 536870912 && (t.flags |= 128, u = !0, Ko(o, !1), t.lanes = 4194304);
          o.isBackwards ? (d.sibling = t.child, t.child = d) : (e = o.last, e !== null ? e.sibling = d : t.child = d, o.last = d);
        }
        return o.tail !== null ? (e = o.tail, o.rendering = e, o.tail = e.sibling, o.renderingStartTime = ht(), e.sibling = null, a = et.current, G(
          et,
          u ? a & 1 | 2 : a & 1
        ), Oe && On(t, o.treeForkCount), e) : ($e(t), null);
      case 22:
      case 23:
        return Bt(t), cc(), o = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== o && (t.flags |= 8192) : o && (t.flags |= 8192), o ? (a & 536870912) !== 0 && (t.flags & 128) === 0 && ($e(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : $e(t), a = t.updateQueue, a !== null && Ur(t, a.retryQueue), a = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), o = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (o = t.memoizedState.cachePool.pool), o !== a && (t.flags |= 2048), e !== null && q(Ja), null;
      case 24:
        return a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), Rn(it), $e(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(r(156, t.tag));
  }
  function yx(e, t) {
    switch (Ku(t), t.tag) {
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
          $a();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (Bt(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(r(340));
          $a();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return q(et), null;
      case 4:
        return ie(), null;
      case 10:
        return Rn(t.type), null;
      case 22:
      case 23:
        return Bt(t), cc(), e !== null && q(Ja), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return Rn(it), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Zg(e, t) {
    switch (Ku(t), t.tag) {
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
        q(et);
        break;
      case 10:
        Rn(t.type);
        break;
      case 22:
      case 23:
        Bt(t), cc(), e !== null && q(Ja);
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
    } catch (z) {
      Ue(t, t.return, z);
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
            var w = o.inst, z = w.destroy;
            if (z !== void 0) {
              w.destroy = void 0, u = t;
              var F = a, le = z;
              try {
                le();
              } catch (ue) {
                Ue(
                  u,
                  F,
                  ue
                );
              }
            }
          }
          o = o.next;
        } while (o !== d);
      }
    } catch (ue) {
      Ue(t, t.return, ue);
    }
  }
  function $g(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var a = e.stateNode;
      try {
        Bh(t, a);
      } catch (o) {
        Ue(e, e.return, o);
      }
    }
  }
  function Qg(e, t, a) {
    a.props = ti(
      e.type,
      e.memoizedProps
    ), a.state = e.memoizedState;
    try {
      a.componentWillUnmount();
    } catch (o) {
      Ue(e, t, o);
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
      Ue(e, t, u);
    }
  }
  function pn(e, t) {
    var a = e.ref, o = e.refCleanup;
    if (a !== null)
      if (typeof o == "function")
        try {
          o();
        } catch (u) {
          Ue(e, t, u);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof a == "function")
        try {
          a(null);
        } catch (u) {
          Ue(e, t, u);
        }
      else a.current = null;
  }
  function Kg(e) {
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
      Ue(e, e.return, u);
    }
  }
  function Ic(e, t, a) {
    try {
      var o = e.stateNode;
      Ux(o, e.type, a, t), o[vt] = t;
    } catch (u) {
      Ue(e, e.return, u);
    }
  }
  function Jg(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Sa(e.type) || e.tag === 4;
  }
  function qc(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Jg(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && Sa(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Xc(e, t, a) {
    var o = e.tag;
    if (o === 5 || o === 6)
      e = e.stateNode, t ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(e, t) : (t = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, t.appendChild(e), a = a._reactRootContainer, a != null || t.onclick !== null || (t.onclick = jn));
    else if (o !== 4 && (o === 27 && Sa(e.type) && (a = e.stateNode, t = null), e = e.child, e !== null))
      for (Xc(e, t, a), e = e.sibling; e !== null; )
        Xc(e, t, a), e = e.sibling;
  }
  function Vr(e, t, a) {
    var o = e.tag;
    if (o === 5 || o === 6)
      e = e.stateNode, t ? a.insertBefore(e, t) : a.appendChild(e);
    else if (o !== 4 && (o === 27 && Sa(e.type) && (a = e.stateNode), e = e.child, e !== null))
      for (Vr(e, t, a), e = e.sibling; e !== null; )
        Vr(e, t, a), e = e.sibling;
  }
  function Wg(e) {
    var t = e.stateNode, a = e.memoizedProps;
    try {
      for (var o = e.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      yt(t, o, a), t[ct] = e, t[vt] = a;
    } catch (d) {
      Ue(e, e.return, d);
    }
  }
  var Un = !1, rt = !1, Gc = !1, Fg = typeof WeakSet == "function" ? WeakSet : Set, dt = null;
  function vx(e, t) {
    if (e = e.containerInfo, hf = rs, e = ch(e), Lu(e)) {
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
            var w = 0, z = -1, F = -1, le = 0, ue = 0, fe = e, re = null;
            t: for (; ; ) {
              for (var se; fe !== a || u !== 0 && fe.nodeType !== 3 || (z = w + u), fe !== d || o !== 0 && fe.nodeType !== 3 || (F = w + o), fe.nodeType === 3 && (w += fe.nodeValue.length), (se = fe.firstChild) !== null; )
                re = fe, fe = se;
              for (; ; ) {
                if (fe === e) break t;
                if (re === a && ++le === u && (z = w), re === d && ++ue === o && (F = w), (se = fe.nextSibling) !== null) break;
                fe = re, re = fe.parentNode;
              }
              fe = se;
            }
            a = z === -1 || F === -1 ? null : { start: z, end: F };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (gf = { focusedElem: e, selectionRange: a }, rs = !1, dt = t; dt !== null; )
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
                  var me = ti(
                    a.type,
                    u
                  );
                  e = o.getSnapshotBeforeUpdate(
                    me,
                    d
                  ), o.__reactInternalSnapshotBeforeUpdate = e;
                } catch (we) {
                  Ue(
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
                  yf(e);
                else if (a === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      yf(e);
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
  function Pg(e, t, a) {
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
              Ue(a, a.return, w);
            }
          else {
            var u = ti(
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
              Ue(
                a,
                a.return,
                w
              );
            }
          }
        o & 64 && $g(a), o & 512 && Wo(a, a.return);
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
            Bh(e, t);
          } catch (w) {
            Ue(a, a.return, w);
          }
        }
        break;
      case 27:
        t === null && o & 4 && Wg(a);
      case 26:
      case 5:
        Yn(e, a), t === null && o & 4 && Kg(a), o & 512 && Wo(a, a.return);
        break;
      case 12:
        Yn(e, a);
        break;
      case 31:
        Yn(e, a), o & 4 && nm(e, a);
        break;
      case 13:
        Yn(e, a), o & 4 && am(e, a), o & 64 && (e = a.memoizedState, e !== null && (e = e.dehydrated, e !== null && (a = Mx.bind(
          null,
          a
        ), $x(e, a))));
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
  function em(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, em(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Eo(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Qe = null, Mt = !1;
  function Vn(e, t, a) {
    for (a = a.child; a !== null; )
      tm(e, t, a), a = a.sibling;
  }
  function tm(e, t, a) {
    if (xt && typeof xt.onCommitFiberUnmount == "function")
      try {
        xt.onCommitFiberUnmount(Ha, a);
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
              Ue(
                a,
                t,
                d
              );
            }
          else
            try {
              Qe.removeChild(a.stateNode);
            } catch (d) {
              Ue(
                a,
                t,
                d
              );
            }
        break;
      case 18:
        Qe !== null && (Mt ? (e = Qe, $m(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          a.stateNode
        ), ao(e)) : $m(Qe, a.stateNode));
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
        rt || (pn(a, t), o = a.stateNode, typeof o.componentWillUnmount == "function" && Qg(
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
  function nm(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        ao(e);
      } catch (a) {
        Ue(t, t.return, a);
      }
    }
  }
  function am(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        ao(e);
      } catch (a) {
        Ue(t, t.return, a);
      }
  }
  function bx(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new Fg()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Fg()), t;
      default:
        throw Error(r(435, e.tag));
    }
  }
  function Yr(e, t) {
    var a = bx(e);
    t.forEach(function(o) {
      if (!a.has(o)) {
        a.add(o);
        var u = Tx.bind(null, e, o);
        o.then(u, u);
      }
    });
  }
  function Tt(e, t) {
    var a = t.deletions;
    if (a !== null)
      for (var o = 0; o < a.length; o++) {
        var u = a[o], d = e, w = t, z = w;
        e: for (; z !== null; ) {
          switch (z.tag) {
            case 27:
              if (Sa(z.type)) {
                Qe = z.stateNode, Mt = !1;
                break e;
              }
              break;
            case 5:
              Qe = z.stateNode, Mt = !1;
              break e;
            case 3:
            case 4:
              Qe = z.stateNode.containerInfo, Mt = !0;
              break e;
          }
          z = z.return;
        }
        if (Qe === null) throw Error(r(160));
        tm(d, w, u), Qe = null, Mt = !1, d = u.alternate, d !== null && (d.return = null), u.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        im(t, e), t = t.sibling;
  }
  var an = null;
  function im(e, t) {
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
                      d = u.getElementsByTagName("title")[0], (!d || d[Ua] || d[ct] || d.namespaceURI === "http://www.w3.org/2000/svg" || d.hasAttribute("itemprop")) && (d = u.createElement(o), u.head.insertBefore(
                        d,
                        u.querySelector("head > title")
                      )), yt(d, o, a), d[ct] = e, at(d), o = d;
                      break e;
                    case "link":
                      var w = ip(
                        "link",
                        "href",
                        u
                      ).get(o + (a.href || ""));
                      if (w) {
                        for (var z = 0; z < w.length; z++)
                          if (d = w[z], d.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) && d.getAttribute("rel") === (a.rel == null ? null : a.rel) && d.getAttribute("title") === (a.title == null ? null : a.title) && d.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin)) {
                            w.splice(z, 1);
                            break t;
                          }
                      }
                      d = u.createElement(o), yt(d, o, a), u.head.appendChild(d);
                      break;
                    case "meta":
                      if (w = ip(
                        "meta",
                        "content",
                        u
                      ).get(o + (a.content || ""))) {
                        for (z = 0; z < w.length; z++)
                          if (d = w[z], d.getAttribute("content") === (a.content == null ? null : "" + a.content) && d.getAttribute("name") === (a.name == null ? null : a.name) && d.getAttribute("property") === (a.property == null ? null : a.property) && d.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) && d.getAttribute("charset") === (a.charSet == null ? null : a.charSet)) {
                            w.splice(z, 1);
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
                op(
                  u,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = ap(
                u,
                o,
                e.memoizedProps
              );
          else
            d !== o ? (d === null ? a.stateNode !== null && (a = a.stateNode, a.parentNode.removeChild(a)) : d.count--, o === null ? op(
              u,
              e.type,
              e.stateNode
            ) : ap(
              u,
              o,
              e.memoizedProps
            )) : o === null && e.stateNode !== null && Ic(
              e,
              e.memoizedProps,
              a.memoizedProps
            );
        }
        break;
      case 27:
        Tt(t, e), jt(e), o & 512 && (rt || a === null || pn(a, a.return)), a !== null && o & 4 && Ic(
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
            Ue(e, e.return, me);
          }
        }
        o & 4 && e.stateNode != null && (u = e.memoizedProps, Ic(
          e,
          u,
          a !== null ? a.memoizedProps : u
        )), o & 1024 && (Gc = !0);
        break;
      case 6:
        if (Tt(t, e), jt(e), o & 4) {
          if (e.stateNode === null)
            throw Error(r(162));
          o = e.memoizedProps, a = e.stateNode;
          try {
            a.nodeValue = o;
          } catch (me) {
            Ue(e, e.return, me);
          }
        }
        break;
      case 3:
        if (as = null, u = an, an = ts(t.containerInfo), Tt(t, e), an = u, jt(e), o & 4 && a !== null && a.memoizedState.isDehydrated)
          try {
            ao(t.containerInfo);
          } catch (me) {
            Ue(e, e.return, me);
          }
        Gc && (Gc = !1, om(e));
        break;
      case 4:
        o = an, an = ts(
          e.stateNode.containerInfo
        ), Tt(t, e), jt(e), an = o;
        break;
      case 12:
        Tt(t, e), jt(e);
        break;
      case 31:
        Tt(t, e), jt(e), o & 4 && (o = e.updateQueue, o !== null && (e.updateQueue = null, Yr(e, o)));
        break;
      case 13:
        Tt(t, e), jt(e), e.child.flags & 8192 && e.memoizedState !== null != (a !== null && a.memoizedState !== null) && (qr = ht()), o & 4 && (o = e.updateQueue, o !== null && (e.updateQueue = null, Yr(e, o)));
        break;
      case 22:
        u = e.memoizedState !== null;
        var F = a !== null && a.memoizedState !== null, le = Un, ue = rt;
        if (Un = le || u, rt = ue || F, Tt(t, e), rt = ue, Un = le, jt(e), o & 8192)
          e: for (t = e.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, u && (a === null || F || Un || rt || ni(e)), a = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (a === null) {
                F = a = t;
                try {
                  if (d = F.stateNode, u)
                    w = d.style, typeof w.setProperty == "function" ? w.setProperty("display", "none", "important") : w.display = "none";
                  else {
                    z = F.stateNode;
                    var fe = F.memoizedProps.style, re = fe != null && fe.hasOwnProperty("display") ? fe.display : null;
                    z.style.display = re == null || typeof re == "boolean" ? "" : ("" + re).trim();
                  }
                } catch (me) {
                  Ue(F, F.return, me);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                F = t;
                try {
                  F.stateNode.nodeValue = u ? "" : F.memoizedProps;
                } catch (me) {
                  Ue(F, F.return, me);
                }
              }
            } else if (t.tag === 18) {
              if (a === null) {
                F = t;
                try {
                  var se = F.stateNode;
                  u ? Qm(se, !0) : Qm(F.stateNode, !1);
                } catch (me) {
                  Ue(F, F.return, me);
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
        o & 4 && (o = e.updateQueue, o !== null && (a = o.retryQueue, a !== null && (o.retryQueue = null, Yr(e, a))));
        break;
      case 19:
        Tt(t, e), jt(e), o & 4 && (o = e.updateQueue, o !== null && (e.updateQueue = null, Yr(e, o)));
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
          if (Jg(o)) {
            a = o;
            break;
          }
          o = o.return;
        }
        if (a == null) throw Error(r(160));
        switch (a.tag) {
          case 27:
            var u = a.stateNode, d = qc(e);
            Vr(e, d, u);
            break;
          case 5:
            var w = a.stateNode;
            a.flags & 32 && (Ci(w, ""), a.flags &= -33);
            var z = qc(e);
            Vr(e, z, w);
            break;
          case 3:
          case 4:
            var F = a.stateNode.containerInfo, le = qc(e);
            Xc(
              e,
              le,
              F
            );
            break;
          default:
            throw Error(r(161));
        }
      } catch (ue) {
        Ue(e, e.return, ue);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function om(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        om(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function Yn(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Pg(e, t.alternate, t), t = t.sibling;
  }
  function ni(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ma(4, t, t.return), ni(t);
          break;
        case 1:
          pn(t, t.return);
          var a = t.stateNode;
          typeof a.componentWillUnmount == "function" && Qg(
            t,
            t.return,
            a
          ), ni(t);
          break;
        case 27:
          ll(t.stateNode);
        case 26:
        case 5:
          pn(t, t.return), ni(t);
          break;
        case 22:
          t.memoizedState === null && ni(t);
          break;
        case 30:
          ni(t);
          break;
        default:
          ni(t);
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
              Ue(o, o.return, le);
            }
          if (o = d, u = o.updateQueue, u !== null) {
            var z = o.stateNode;
            try {
              var F = u.shared.hiddenCallbacks;
              if (F !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < F.length; u++)
                  Hh(F[u], z);
            } catch (le) {
              Ue(o, o.return, le);
            }
          }
          a && w & 64 && $g(d), Wo(d, d.return);
          break;
        case 27:
          Wg(d);
        case 26:
        case 5:
          In(
            u,
            d,
            a
          ), a && o === null && w & 4 && Kg(d), Wo(d, d.return);
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
          ), a && w & 4 && nm(u, d);
          break;
        case 13:
          In(
            u,
            d,
            a
          ), a && w & 4 && am(u, d);
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
  function Zc(e, t) {
    var a = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== a && (e != null && e.refCount++, a != null && Bo(a));
  }
  function $c(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Bo(e));
  }
  function on(e, t, a, o) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        lm(
          e,
          t,
          a,
          o
        ), t = t.sibling;
  }
  function lm(e, t, a, o) {
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
            var d = t.memoizedProps, w = d.id, z = d.onPostCommit;
            typeof z == "function" && z(
              w,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (F) {
            Ue(t, t.return, F);
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
        ) : (d._visibility |= 2, Zi(
          e,
          t,
          a,
          o,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), u & 2048 && Zc(w, t);
        break;
      case 24:
        on(
          e,
          t,
          a,
          o
        ), u & 2048 && $c(t.alternate, t);
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
  function Zi(e, t, a, o, u) {
    for (u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var d = e, w = t, z = a, F = o, le = w.flags;
      switch (w.tag) {
        case 0:
        case 11:
        case 15:
          Zi(
            d,
            w,
            z,
            F,
            u
          ), Jo(8, w);
          break;
        case 23:
          break;
        case 22:
          var ue = w.stateNode;
          w.memoizedState !== null ? ue._visibility & 2 ? Zi(
            d,
            w,
            z,
            F,
            u
          ) : Fo(
            d,
            w
          ) : (ue._visibility |= 2, Zi(
            d,
            w,
            z,
            F,
            u
          )), u && le & 2048 && Zc(
            w.alternate,
            w
          );
          break;
        case 24:
          Zi(
            d,
            w,
            z,
            F,
            u
          ), u && le & 2048 && $c(w.alternate, w);
          break;
        default:
          Zi(
            d,
            w,
            z,
            F,
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
            Fo(a, o), u & 2048 && Zc(
              o.alternate,
              o
            );
            break;
          case 24:
            Fo(a, o), u & 2048 && $c(o.alternate, o);
            break;
          default:
            Fo(a, o);
        }
        t = t.sibling;
      }
  }
  var Po = 8192;
  function $i(e, t, a) {
    if (e.subtreeFlags & Po)
      for (e = e.child; e !== null; )
        rm(
          e,
          t,
          a
        ), e = e.sibling;
  }
  function rm(e, t, a) {
    switch (e.tag) {
      case 26:
        $i(
          e,
          t,
          a
        ), e.flags & Po && e.memoizedState !== null && o1(
          a,
          an,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        $i(
          e,
          t,
          a
        );
        break;
      case 3:
      case 4:
        var o = an;
        an = ts(e.stateNode.containerInfo), $i(
          e,
          t,
          a
        ), an = o;
        break;
      case 22:
        e.memoizedState === null && (o = e.alternate, o !== null && o.memoizedState !== null ? (o = Po, Po = 16777216, $i(
          e,
          t,
          a
        ), Po = o) : $i(
          e,
          t,
          a
        ));
        break;
      default:
        $i(
          e,
          t,
          a
        );
    }
  }
  function sm(e) {
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
          dt = o, cm(
            o,
            e
          );
        }
      sm(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        um(e), e = e.sibling;
  }
  function um(e) {
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
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Ir(e)) : el(e);
        break;
      default:
        el(e);
    }
  }
  function Ir(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var o = t[a];
          dt = o, cm(
            o,
            e
          );
        }
      sm(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          ma(8, t, t.return), Ir(t);
          break;
        case 22:
          a = t.stateNode, a._visibility & 2 && (a._visibility &= -3, Ir(t));
          break;
        default:
          Ir(t);
      }
      e = e.sibling;
    }
  }
  function cm(e, t) {
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
          if (em(o), o === a) {
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
  var xx = {
    getCacheForType: function(e) {
      var t = mt(it), a = t.data.get(e);
      return a === void 0 && (a = e(), t.data.set(e, a)), a;
    },
    cacheSignal: function() {
      return mt(it).controller.signal;
    }
  }, wx = typeof WeakMap == "function" ? WeakMap : Map, Be = 0, Ge = null, Me = null, je = 0, Le = 0, Lt = null, pa = !1, Qi = !1, Qc = !1, qn = 0, Fe = 0, ya = 0, ai = 0, Kc = 0, Ut = 0, Ki = 0, tl = null, At = null, Jc = !1, qr = 0, fm = 0, Xr = 1 / 0, Gr = null, va = null, ft = 0, ba = null, Ji = null, Xn = 0, Wc = 0, Fc = null, dm = null, nl = 0, Pc = null;
  function Vt() {
    return (Be & 2) !== 0 && je !== 0 ? je & -je : _.T !== null ? lf() : Kl();
  }
  function hm() {
    if (Ut === 0)
      if ((je & 536870912) === 0 || Oe) {
        var e = bi;
        bi <<= 1, (bi & 3932160) === 0 && (bi = 262144), Ut = e;
      } else Ut = 536870912;
    return e = Ht.current, e !== null && (e.flags |= 32), Ut;
  }
  function Dt(e, t, a) {
    (e === Ge && (Le === 2 || Le === 9) || e.cancelPendingCommit !== null) && (Wi(e, 0), xa(
      e,
      je,
      Ut,
      !1
    )), La(e, a), ((Be & 2) === 0 || e !== Ge) && (e === Ge && ((Be & 2) === 0 && (ai |= a), Fe === 4 && xa(
      e,
      je,
      Ut,
      !1
    )), yn(e));
  }
  function gm(e, t, a) {
    if ((Be & 6) !== 0) throw Error(r(327));
    var o = !a && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Ba(e, t), u = o ? _x(e, t) : tf(e, t, !0), d = o;
    do {
      if (u === 0) {
        Qi && !o && xa(e, t, 0, !1);
        break;
      } else {
        if (a = e.current.alternate, d && !Sx(a)) {
          u = tf(e, t, !1), d = !1;
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
              var z = e;
              u = tl;
              var F = z.current.memoizedState.isDehydrated;
              if (F && (Wi(z, w).flags |= 256), w = tf(
                z,
                w,
                !1
              ), w !== 2) {
                if (Qc && !F) {
                  z.errorRecoveryDisabledLanes |= d, ai |= d, u = 4;
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
          if ((t & 62914560) === t && (u = qr + 300 - ht(), 10 < u)) {
            if (xa(
              o,
              t,
              Ut,
              !pa
            ), wi(o, 0, !0) !== 0) break e;
            Xn = t, o.timeoutHandle = Gm(
              mm.bind(
                null,
                o,
                a,
                At,
                Gr,
                Jc,
                t,
                Ut,
                ai,
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
          mm(
            o,
            a,
            At,
            Gr,
            Jc,
            t,
            Ut,
            ai,
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
  function mm(e, t, a, o, u, d, w, z, F, le, ue, fe, re, se) {
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
      }, rm(
        t,
        d,
        fe
      );
      var me = (d & 62914560) === d ? qr - ht() : (d & 4194048) === d ? fm - ht() : 0;
      if (me = l1(
        fe,
        me
      ), me !== null) {
        Xn = d, e.cancelPendingCommit = me(
          Em.bind(
            null,
            e,
            t,
            d,
            a,
            o,
            u,
            w,
            z,
            F,
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
    Em(
      e,
      t,
      d,
      a,
      o,
      u,
      w,
      z,
      F
    );
  }
  function Sx(e) {
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
    t &= ~Kc, t &= ~ai, e.suspendedLanes |= t, e.pingedLanes &= ~t, o && (e.warmLanes |= t), o = e.expirationTimes;
    for (var u = t; 0 < u; ) {
      var d = 31 - wt(u), w = 1 << d;
      o[d] = -1, u &= ~w;
    }
    a !== 0 && Zl(e, a, t);
  }
  function Zr() {
    return (Be & 6) === 0 ? (al(0), !1) : !0;
  }
  function ef() {
    if (Me !== null) {
      if (Le === 0)
        var e = Me.return;
      else
        e = Me, zn = Qa = null, pc(e), Yi = null, Uo = 0, e = Me;
      for (; e !== null; )
        Zg(e.alternate, e), e = e.return;
      Me = null;
    }
  }
  function Wi(e, t) {
    var a = e.timeoutHandle;
    a !== -1 && (e.timeoutHandle = -1, Ix(a)), a = e.cancelPendingCommit, a !== null && (e.cancelPendingCommit = null, a()), Xn = 0, ef(), Ge = e, Me = a = Dn(e.current, null), je = t, Le = 0, Lt = null, pa = !1, Qi = Ba(e, t), Qc = !1, Ki = Ut = Kc = ai = ya = Fe = 0, At = tl = null, Jc = !1, (t & 8) !== 0 && (t |= t & 32);
    var o = e.entangledLanes;
    if (o !== 0)
      for (e = e.entanglements, o &= t; 0 < o; ) {
        var u = 31 - wt(o), d = 1 << u;
        t |= e[u], o &= ~d;
      }
    return qn = t, hr(), a;
  }
  function pm(e, t) {
    Ne = null, _.H = $o, t === Vi || t === wr ? (t = Oh(), Le = 3) : t === ic ? (t = Oh(), Le = 4) : Le = t === Oc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Lt = t, Me === null && (Fe = 1, kr(
      e,
      Gt(t, e.current)
    ));
  }
  function ym() {
    var e = Ht.current;
    return e === null ? !0 : (je & 4194048) === je ? Kt === null : (je & 62914560) === je || (je & 536870912) !== 0 ? e === Kt : !1;
  }
  function vm() {
    var e = _.H;
    return _.H = $o, e === null ? $o : e;
  }
  function bm() {
    var e = _.A;
    return _.A = xx, e;
  }
  function $r() {
    Fe = 4, pa || (je & 4194048) !== je && Ht.current !== null || (Qi = !0), (ya & 134217727) === 0 && (ai & 134217727) === 0 || Ge === null || xa(
      Ge,
      je,
      Ut,
      !1
    );
  }
  function tf(e, t, a) {
    var o = Be;
    Be |= 2;
    var u = vm(), d = bm();
    (Ge !== e || je !== t) && (Gr = null, Wi(e, t)), t = !1;
    var w = Fe;
    e: do
      try {
        if (Le !== 0 && Me !== null) {
          var z = Me, F = Lt;
          switch (Le) {
            case 8:
              ef(), w = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Ht.current === null && (t = !0);
              var le = Le;
              if (Le = 0, Lt = null, Fi(e, z, F, le), a && Qi) {
                w = 0;
                break e;
              }
              break;
            default:
              le = Le, Le = 0, Lt = null, Fi(e, z, F, le);
          }
        }
        Ex(), w = Fe;
        break;
      } catch (ue) {
        pm(e, ue);
      }
    while (!0);
    return t && e.shellSuspendCounter++, zn = Qa = null, Be = o, _.H = u, _.A = d, Me === null && (Ge = null, je = 0, hr()), w;
  }
  function Ex() {
    for (; Me !== null; ) xm(Me);
  }
  function _x(e, t) {
    var a = Be;
    Be |= 2;
    var o = vm(), u = bm();
    Ge !== e || je !== t ? (Gr = null, Xr = ht() + 500, Wi(e, t)) : Qi = Ba(
      e,
      t
    );
    e: do
      try {
        if (Le !== 0 && Me !== null) {
          t = Me;
          var d = Lt;
          t: switch (Le) {
            case 1:
              Le = 0, Lt = null, Fi(e, t, d, 1);
              break;
            case 2:
            case 9:
              if (Ah(d)) {
                Le = 0, Lt = null, wm(t);
                break;
              }
              t = function() {
                Le !== 2 && Le !== 9 || Ge !== e || (Le = 7), yn(e);
              }, d.then(t, t);
              break e;
            case 3:
              Le = 7;
              break e;
            case 4:
              Le = 5;
              break e;
            case 7:
              Ah(d) ? (Le = 0, Lt = null, wm(t)) : (Le = 0, Lt = null, Fi(e, t, d, 7));
              break;
            case 5:
              var w = null;
              switch (Me.tag) {
                case 26:
                  w = Me.memoizedState;
                case 5:
                case 27:
                  var z = Me;
                  if (w ? lp(w) : z.stateNode.complete) {
                    Le = 0, Lt = null;
                    var F = z.sibling;
                    if (F !== null) Me = F;
                    else {
                      var le = z.return;
                      le !== null ? (Me = le, Qr(le)) : Me = null;
                    }
                    break t;
                  }
              }
              Le = 0, Lt = null, Fi(e, t, d, 5);
              break;
            case 6:
              Le = 0, Lt = null, Fi(e, t, d, 6);
              break;
            case 8:
              ef(), Fe = 6;
              break e;
            default:
              throw Error(r(462));
          }
        }
        Nx();
        break;
      } catch (ue) {
        pm(e, ue);
      }
    while (!0);
    return zn = Qa = null, _.H = o, _.A = u, Be = a, Me !== null ? 0 : (Ge = null, je = 0, hr(), Fe);
  }
  function Nx() {
    for (; Me !== null && !za(); )
      xm(Me);
  }
  function xm(e) {
    var t = Xg(e.alternate, e, qn);
    e.memoizedProps = e.pendingProps, t === null ? Qr(e) : Me = t;
  }
  function wm(e) {
    var t = e, a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Lg(
          a,
          t,
          t.pendingProps,
          t.type,
          void 0,
          je
        );
        break;
      case 11:
        t = Lg(
          a,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          je
        );
        break;
      case 5:
        pc(t);
      default:
        Zg(a, t), t = Me = bh(t, qn), t = Xg(a, t, qn);
    }
    e.memoizedProps = e.pendingProps, t === null ? Qr(e) : Me = t;
  }
  function Fi(e, t, a, o) {
    zn = Qa = null, pc(t), Yi = null, Uo = 0;
    var u = t.return;
    try {
      if (hx(
        e,
        u,
        t,
        a,
        je
      )) {
        Fe = 1, kr(
          e,
          Gt(a, e.current)
        ), Me = null;
        return;
      }
    } catch (d) {
      if (u !== null) throw Me = u, d;
      Fe = 1, kr(
        e,
        Gt(a, e.current)
      ), Me = null;
      return;
    }
    t.flags & 32768 ? (Oe || o === 1 ? e = !0 : Qi || (je & 536870912) !== 0 ? e = !1 : (pa = e = !0, (o === 2 || o === 9 || o === 3 || o === 6) && (o = Ht.current, o !== null && o.tag === 13 && (o.flags |= 16384))), Sm(t, e)) : Qr(t);
  }
  function Qr(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Sm(
          t,
          pa
        );
        return;
      }
      e = t.return;
      var a = px(
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
  function Sm(e, t) {
    do {
      var a = yx(e.alternate, e);
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
  function Em(e, t, a, o, u, d, w, z, F) {
    e.cancelPendingCommit = null;
    do
      Kr();
    while (ft !== 0);
    if ((Be & 6) !== 0) throw Error(r(327));
    if (t !== null) {
      if (t === e.current) throw Error(r(177));
      if (d = t.lanes | t.childLanes, d |= qu, bu(
        e,
        a,
        d,
        w,
        z,
        F
      ), e === Ge && (Me = Ge = null, je = 0), Ji = t, ba = e, Xn = a, Wc = d, Fc = u, dm = o, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, jx(ka, function() {
        return Tm(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), o = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || o) {
        o = _.T, _.T = null, u = k.p, k.p = 2, w = Be, Be |= 4;
        try {
          vx(e, t, a);
        } finally {
          Be = w, k.p = u, _.T = o;
        }
      }
      ft = 1, _m(), Nm(), Cm();
    }
  }
  function _m() {
    if (ft === 1) {
      ft = 0;
      var e = ba, t = Ji, a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        a = _.T, _.T = null;
        var o = k.p;
        k.p = 2;
        var u = Be;
        Be |= 4;
        try {
          im(t, e);
          var d = gf, w = ch(e.containerInfo), z = d.focusedElem, F = d.selectionRange;
          if (w !== z && z && z.ownerDocument && uh(
            z.ownerDocument.documentElement,
            z
          )) {
            if (F !== null && Lu(z)) {
              var le = F.start, ue = F.end;
              if (ue === void 0 && (ue = le), "selectionStart" in z)
                z.selectionStart = le, z.selectionEnd = Math.min(
                  ue,
                  z.value.length
                );
              else {
                var fe = z.ownerDocument || document, re = fe && fe.defaultView || window;
                if (re.getSelection) {
                  var se = re.getSelection(), me = z.textContent.length, we = Math.min(F.start, me), qe = F.end === void 0 ? we : Math.min(F.end, me);
                  !se.extend && we > qe && (w = qe, qe = we, we = w);
                  var ae = sh(
                    z,
                    we
                  ), ne = sh(
                    z,
                    qe
                  );
                  if (ae && ne && (se.rangeCount !== 1 || se.anchorNode !== ae.node || se.anchorOffset !== ae.offset || se.focusNode !== ne.node || se.focusOffset !== ne.offset)) {
                    var oe = fe.createRange();
                    oe.setStart(ae.node, ae.offset), se.removeAllRanges(), we > qe ? (se.addRange(oe), se.extend(ne.node, ne.offset)) : (oe.setEnd(ne.node, ne.offset), se.addRange(oe));
                  }
                }
              }
            }
            for (fe = [], se = z; se = se.parentNode; )
              se.nodeType === 1 && fe.push({
                element: se,
                left: se.scrollLeft,
                top: se.scrollTop
              });
            for (typeof z.focus == "function" && z.focus(), z = 0; z < fe.length; z++) {
              var ce = fe[z];
              ce.element.scrollLeft = ce.left, ce.element.scrollTop = ce.top;
            }
          }
          rs = !!hf, gf = hf = null;
        } finally {
          Be = u, k.p = o, _.T = a;
        }
      }
      e.current = t, ft = 2;
    }
  }
  function Nm() {
    if (ft === 2) {
      ft = 0;
      var e = ba, t = Ji, a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        a = _.T, _.T = null;
        var o = k.p;
        k.p = 2;
        var u = Be;
        Be |= 4;
        try {
          Pg(e, t.alternate, t);
        } finally {
          Be = u, k.p = o, _.T = a;
        }
      }
      ft = 3;
    }
  }
  function Cm() {
    if (ft === 4 || ft === 3) {
      ft = 0, Ra();
      var e = ba, t = Ji, a = Xn, o = dm;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? ft = 5 : (ft = 0, Ji = ba = null, Mm(e, e.pendingLanes));
      var u = e.pendingLanes;
      if (u === 0 && (va = null), So(a), t = t.stateNode, xt && typeof xt.onCommitFiberRoot == "function")
        try {
          xt.onCommitFiberRoot(
            Ha,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (o !== null) {
        t = _.T, u = k.p, k.p = 2, _.T = null;
        try {
          for (var d = e.onRecoverableError, w = 0; w < o.length; w++) {
            var z = o[w];
            d(z.value, {
              componentStack: z.stack
            });
          }
        } finally {
          _.T = t, k.p = u;
        }
      }
      (Xn & 3) !== 0 && Kr(), yn(e), u = e.pendingLanes, (a & 261930) !== 0 && (u & 42) !== 0 ? e === Pc ? nl++ : (nl = 0, Pc = e) : nl = 0, al(0);
    }
  }
  function Mm(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Bo(t)));
  }
  function Kr() {
    return _m(), Nm(), Cm(), Tm();
  }
  function Tm() {
    if (ft !== 5) return !1;
    var e = ba, t = Wc;
    Wc = 0;
    var a = So(Xn), o = _.T, u = k.p;
    try {
      k.p = 32 > a ? 32 : a, _.T = null, a = Fc, Fc = null;
      var d = ba, w = Xn;
      if (ft = 0, Ji = ba = null, Xn = 0, (Be & 6) !== 0) throw Error(r(331));
      var z = Be;
      if (Be |= 4, um(d.current), lm(
        d,
        d.current,
        w,
        a
      ), Be = z, al(0, !1), xt && typeof xt.onPostCommitFiberRoot == "function")
        try {
          xt.onPostCommitFiberRoot(Ha, d);
        } catch {
        }
      return !0;
    } finally {
      k.p = u, _.T = o, Mm(e, t);
    }
  }
  function jm(e, t, a) {
    t = Gt(a, t), t = Dc(e.stateNode, t, 2), e = da(e, t, 2), e !== null && (La(e, 2), yn(e));
  }
  function Ue(e, t, a) {
    if (e.tag === 3)
      jm(e, e, a);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          jm(
            t,
            e,
            a
          );
          break;
        } else if (t.tag === 1) {
          var o = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (va === null || !va.has(o))) {
            e = Gt(a, e), a = Ag(2), o = da(t, a, 2), o !== null && (Dg(
              a,
              o,
              t,
              e
            ), La(o, 2), yn(o));
            break;
          }
        }
        t = t.return;
      }
  }
  function nf(e, t, a) {
    var o = e.pingCache;
    if (o === null) {
      o = e.pingCache = new wx();
      var u = /* @__PURE__ */ new Set();
      o.set(t, u);
    } else
      u = o.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), o.set(t, u));
    u.has(a) || (Qc = !0, u.add(a), e = Cx.bind(null, e, t, a), t.then(e, e));
  }
  function Cx(e, t, a) {
    var o = e.pingCache;
    o !== null && o.delete(t), e.pingedLanes |= e.suspendedLanes & a, e.warmLanes &= ~a, Ge === e && (je & a) === a && (Fe === 4 || Fe === 3 && (je & 62914560) === je && 300 > ht() - qr ? (Be & 2) === 0 && Wi(e, 0) : Kc |= a, Ki === je && (Ki = 0)), yn(e);
  }
  function Am(e, t) {
    t === 0 && (t = Gl()), e = Ga(e, t), e !== null && (La(e, t), yn(e));
  }
  function Mx(e) {
    var t = e.memoizedState, a = 0;
    t !== null && (a = t.retryLane), Am(e, a);
  }
  function Tx(e, t) {
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
    o !== null && o.delete(t), Am(e, a);
  }
  function jx(e, t) {
    return en(e, t);
  }
  var Jr = null, Pi = null, af = !1, Wr = !1, of = !1, wa = 0;
  function yn(e) {
    e !== Pi && e.next === null && (Pi === null ? Jr = Pi = e : Pi = Pi.next = e), Wr = !0, af || (af = !0, Dx());
  }
  function al(e, t) {
    if (!of && Wr) {
      of = !0;
      do
        for (var a = !1, o = Jr; o !== null; ) {
          if (e !== 0) {
            var u = o.pendingLanes;
            if (u === 0) var d = 0;
            else {
              var w = o.suspendedLanes, z = o.pingedLanes;
              d = (1 << 31 - wt(42 | e) + 1) - 1, d &= u & ~(w & ~z), d = d & 201326741 ? d & 201326741 | 1 : d ? d | 2 : 0;
            }
            d !== 0 && (a = !0, Rm(o, d));
          } else
            d = je, d = wi(
              o,
              o === Ge ? d : 0,
              o.cancelPendingCommit !== null || o.timeoutHandle !== -1
            ), (d & 3) === 0 || Ba(o, d) || (a = !0, Rm(o, d));
          o = o.next;
        }
      while (a);
      of = !1;
    }
  }
  function Ax() {
    Dm();
  }
  function Dm() {
    Wr = af = !1;
    var e = 0;
    wa !== 0 && Yx() && (e = wa);
    for (var t = ht(), a = null, o = Jr; o !== null; ) {
      var u = o.next, d = Om(o, t);
      d === 0 ? (o.next = null, a === null ? Jr = u : a.next = u, u === null && (Pi = a)) : (a = o, (e !== 0 || (d & 3) !== 0) && (Wr = !0)), o = u;
    }
    ft !== 0 && ft !== 5 || al(e), wa !== 0 && (wa = 0);
  }
  function Om(e, t) {
    for (var a = e.suspendedLanes, o = e.pingedLanes, u = e.expirationTimes, d = e.pendingLanes & -62914561; 0 < d; ) {
      var w = 31 - wt(d), z = 1 << w, F = u[w];
      F === -1 ? ((z & a) === 0 || (z & o) !== 0) && (u[w] = vu(z, t)) : F <= t && (e.expiredLanes |= z), d &= ~z;
    }
    if (t = Ge, a = je, a = wi(
      e,
      e === t ? a : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), o = e.callbackNode, a === 0 || e === t && (Le === 2 || Le === 9) || e.cancelPendingCommit !== null)
      return o !== null && o !== null && En(o), e.callbackNode = null, e.callbackPriority = 0;
    if ((a & 3) === 0 || Ba(e, a)) {
      if (t = a & -a, t === e.callbackPriority) return t;
      switch (o !== null && En(o), So(a)) {
        case 2:
        case 8:
          a = Pn;
          break;
        case 32:
          a = ka;
          break;
        case 268435456:
          a = yi;
          break;
        default:
          a = ka;
      }
      return o = zm.bind(null, e), a = en(a, o), e.callbackPriority = t, e.callbackNode = a, t;
    }
    return o !== null && o !== null && En(o), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function zm(e, t) {
    if (ft !== 0 && ft !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var a = e.callbackNode;
    if (Kr() && e.callbackNode !== a)
      return null;
    var o = je;
    return o = wi(
      e,
      e === Ge ? o : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), o === 0 ? null : (gm(e, o, t), Om(e, ht()), e.callbackNode != null && e.callbackNode === a ? zm.bind(null, e) : null);
  }
  function Rm(e, t) {
    if (Kr()) return null;
    gm(e, t, !0);
  }
  function Dx() {
    qx(function() {
      (Be & 6) !== 0 ? en(
        _n,
        Ax
      ) : Dm();
    });
  }
  function lf() {
    if (wa === 0) {
      var e = Li;
      e === 0 && (e = vi, vi <<= 1, (vi & 261888) === 0 && (vi = 256)), wa = e;
    }
    return wa;
  }
  function km(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : or("" + e);
  }
  function Hm(e, t) {
    var a = t.ownerDocument.createElement("input");
    return a.name = t.name, a.value = t.value, e.id && a.setAttribute("form", e.id), t.parentNode.insertBefore(a, t), e = new FormData(e), a.parentNode.removeChild(a), e;
  }
  function Ox(e, t, a, o, u) {
    if (t === "submit" && a && a.stateNode === u) {
      var d = km(
        (u[vt] || null).action
      ), w = o.submitter;
      w && (t = (t = w[vt] || null) ? km(t.formAction) : w.getAttribute("formAction"), t !== null && (d = t, w = null));
      var z = new ur(
        "action",
        "action",
        null,
        o,
        u
      );
      e.push({
        event: z,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (o.defaultPrevented) {
                if (wa !== 0) {
                  var F = w ? Hm(u, w) : new FormData(u);
                  Nc(
                    a,
                    {
                      pending: !0,
                      data: F,
                      method: u.method,
                      action: d
                    },
                    null,
                    F
                  );
                }
              } else
                typeof d == "function" && (z.preventDefault(), F = w ? Hm(u, w) : new FormData(u), Nc(
                  a,
                  {
                    pending: !0,
                    data: F,
                    method: u.method,
                    action: d
                  },
                  d,
                  F
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var rf = 0; rf < Iu.length; rf++) {
    var sf = Iu[rf], zx = sf.toLowerCase(), Rx = sf[0].toUpperCase() + sf.slice(1);
    nn(
      zx,
      "on" + Rx
    );
  }
  nn(hh, "onAnimationEnd"), nn(gh, "onAnimationIteration"), nn(mh, "onAnimationStart"), nn("dblclick", "onDoubleClick"), nn("focusin", "onFocus"), nn("focusout", "onBlur"), nn(Jb, "onTransitionRun"), nn(Wb, "onTransitionStart"), nn(Fb, "onTransitionCancel"), nn(ph, "onTransitionEnd"), ia("onMouseEnter", ["mouseout", "mouseover"]), ia("onMouseLeave", ["mouseout", "mouseover"]), ia("onPointerEnter", ["pointerout", "pointerover"]), ia("onPointerLeave", ["pointerout", "pointerover"]), Mn(
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
  ), kx = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(il)
  );
  function Bm(e, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < e.length; a++) {
      var o = e[a], u = o.event;
      o = o.listeners;
      e: {
        var d = void 0;
        if (t)
          for (var w = o.length - 1; 0 <= w; w--) {
            var z = o[w], F = z.instance, le = z.currentTarget;
            if (z = z.listener, F !== d && u.isPropagationStopped())
              break e;
            d = z, u.currentTarget = le;
            try {
              d(u);
            } catch (ue) {
              dr(ue);
            }
            u.currentTarget = null, d = F;
          }
        else
          for (w = 0; w < o.length; w++) {
            if (z = o[w], F = z.instance, le = z.currentTarget, z = z.listener, F !== d && u.isPropagationStopped())
              break e;
            d = z, u.currentTarget = le;
            try {
              d(u);
            } catch (ue) {
              dr(ue);
            }
            u.currentTarget = null, d = F;
          }
      }
    }
  }
  function Te(e, t) {
    var a = t[Si];
    a === void 0 && (a = t[Si] = /* @__PURE__ */ new Set());
    var o = e + "__bubble";
    a.has(o) || (Lm(t, e, 2, !1), a.add(o));
  }
  function uf(e, t, a) {
    var o = 0;
    t && (o |= 4), Lm(
      a,
      e,
      o,
      t
    );
  }
  var Fr = "_reactListening" + Math.random().toString(36).slice(2);
  function cf(e) {
    if (!e[Fr]) {
      e[Fr] = !0, Pl.forEach(function(a) {
        a !== "selectionchange" && (kx.has(a) || uf(a, !1, e), uf(a, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Fr] || (t[Fr] = !0, uf("selectionchange", !1, t));
    }
  }
  function Lm(e, t, a, o) {
    switch (hp(t)) {
      case 2:
        var u = u1;
        break;
      case 8:
        u = c1;
        break;
      default:
        u = Nf;
    }
    a = u.bind(
      null,
      t,
      a,
      e
    ), u = void 0, !ju || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (u = !0), o ? u !== void 0 ? e.addEventListener(t, a, {
      capture: !0,
      passive: u
    }) : e.addEventListener(t, a, !0) : u !== void 0 ? e.addEventListener(t, a, {
      passive: u
    }) : e.addEventListener(t, a, !1);
  }
  function ff(e, t, a, o, u) {
    var d = o;
    if ((t & 1) === 0 && (t & 2) === 0 && o !== null)
      e: for (; ; ) {
        if (o === null) return;
        var w = o.tag;
        if (w === 3 || w === 4) {
          var z = o.stateNode.containerInfo;
          if (z === u) break;
          if (w === 4)
            for (w = o.return; w !== null; ) {
              var F = w.tag;
              if ((F === 3 || F === 4) && w.stateNode.containerInfo === u)
                return;
              w = w.return;
            }
          for (; z !== null; ) {
            if (w = ea(z), w === null) return;
            if (F = w.tag, F === 5 || F === 6 || F === 26 || F === 27) {
              o = d = w;
              continue e;
            }
            z = z.parentNode;
          }
        }
        o = o.return;
      }
    qd(function() {
      var le = d, ue = Mu(a), fe = [];
      e: {
        var re = yh.get(e);
        if (re !== void 0) {
          var se = ur, me = e;
          switch (e) {
            case "keypress":
              if (rr(a) === 0) break e;
            case "keydown":
            case "keyup":
              se = Tb;
              break;
            case "focusin":
              me = "focus", se = zu;
              break;
            case "focusout":
              me = "blur", se = zu;
              break;
            case "beforeblur":
            case "afterblur":
              se = zu;
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
              se = Zd;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              se = pb;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              se = Db;
              break;
            case hh:
            case gh:
            case mh:
              se = bb;
              break;
            case ph:
              se = zb;
              break;
            case "scroll":
            case "scrollend":
              se = gb;
              break;
            case "wheel":
              se = kb;
              break;
            case "copy":
            case "cut":
            case "paste":
              se = wb;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              se = Qd;
              break;
            case "toggle":
            case "beforetoggle":
              se = Bb;
          }
          var we = (t & 4) !== 0, qe = !we && (e === "scroll" || e === "scrollend"), ae = we ? re !== null ? re + "Capture" : null : re;
          we = [];
          for (var ne = le, oe; ne !== null; ) {
            var ce = ne;
            if (oe = ce.stateNode, ce = ce.tag, ce !== 5 && ce !== 26 && ce !== 27 || oe === null || ae === null || (ce = Co(ne, ae), ce != null && we.push(
              ol(ne, ce, oe)
            )), qe) break;
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
          if (re = e === "mouseover" || e === "pointerover", se = e === "mouseout" || e === "pointerout", re && a !== Cu && (me = a.relatedTarget || a.fromElement) && (ea(me) || me[Cn]))
            break e;
          if ((se || re) && (re = ue.window === ue ? ue : (re = ue.ownerDocument) ? re.defaultView || re.parentWindow : window, se ? (me = a.relatedTarget || a.toElement, se = le, me = me ? ea(me) : null, me !== null && (qe = c(me), we = me.tag, me !== qe || we !== 5 && we !== 27 && we !== 6) && (me = null)) : (se = null, me = le), se !== me)) {
            if (we = Zd, ce = "onMouseLeave", ae = "onMouseEnter", ne = "mouse", (e === "pointerout" || e === "pointerover") && (we = Qd, ce = "onPointerLeave", ae = "onPointerEnter", ne = "pointer"), qe = se == null ? re : na(se), oe = me == null ? re : na(me), re = new we(
              ce,
              ne + "leave",
              se,
              a,
              ue
            ), re.target = qe, re.relatedTarget = oe, ce = null, ea(ue) === le && (we = new we(
              ae,
              ne + "enter",
              me,
              a,
              ue
            ), we.target = oe, we.relatedTarget = qe, ce = we), qe = ce, se && me)
              t: {
                for (we = Hx, ae = se, ne = me, oe = 0, ce = ae; ce; ce = we(ce))
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
            se !== null && Um(
              fe,
              re,
              se,
              we,
              !1
            ), me !== null && qe !== null && Um(
              fe,
              qe,
              me,
              we,
              !0
            );
          }
        }
        e: {
          if (re = le ? na(le) : window, se = re.nodeName && re.nodeName.toLowerCase(), se === "select" || se === "input" && re.type === "file")
            var Re = nh;
          else if (eh(re))
            if (ah)
              Re = $b;
            else {
              Re = Gb;
              var pe = Xb;
            }
          else
            se = re.nodeName, !se || se.toLowerCase() !== "input" || re.type !== "checkbox" && re.type !== "radio" ? le && Nu(le.elementType) && (Re = nh) : Re = Zb;
          if (Re && (Re = Re(e, le))) {
            th(
              fe,
              Re,
              a,
              ue
            );
            break e;
          }
          pe && pe(e, re, le), e === "focusout" && le && re.type === "number" && le.memoizedProps.value != null && No(re, "number", re.value);
        }
        switch (pe = le ? na(le) : window, e) {
          case "focusin":
            (eh(pe) || pe.contentEditable === "true") && (Ai = pe, Uu = le, Ro = null);
            break;
          case "focusout":
            Ro = Uu = Ai = null;
            break;
          case "mousedown":
            Vu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Vu = !1, fh(fe, a, ue);
            break;
          case "selectionchange":
            if (Kb) break;
          case "keydown":
          case "keyup":
            fh(fe, a, ue);
        }
        var Ce;
        if (ku)
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
          ji ? Fd(e, a) && (Ae = "onCompositionEnd") : e === "keydown" && a.keyCode === 229 && (Ae = "onCompositionStart");
        Ae && (Kd && a.locale !== "ko" && (ji || Ae !== "onCompositionStart" ? Ae === "onCompositionEnd" && ji && (Ce = Xd()) : (oa = ue, Au = "value" in oa ? oa.value : oa.textContent, ji = !0)), pe = Pr(le, Ae), 0 < pe.length && (Ae = new $d(
          Ae,
          e,
          null,
          a,
          ue
        ), fe.push({ event: Ae, listeners: pe }), Ce ? Ae.data = Ce : (Ce = Pd(a), Ce !== null && (Ae.data = Ce)))), (Ce = Ub ? Vb(e, a) : Yb(e, a)) && (Ae = Pr(le, "onBeforeInput"), 0 < Ae.length && (pe = new $d(
          "onBeforeInput",
          "beforeinput",
          null,
          a,
          ue
        ), fe.push({
          event: pe,
          listeners: Ae
        }), pe.data = Ce)), Ox(
          fe,
          e,
          le,
          a,
          ue
        );
      }
      Bm(fe, t);
    });
  }
  function ol(e, t, a) {
    return {
      instance: e,
      listener: t,
      currentTarget: a
    };
  }
  function Pr(e, t) {
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
  function Hx(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Um(e, t, a, o, u) {
    for (var d = t._reactName, w = []; a !== null && a !== o; ) {
      var z = a, F = z.alternate, le = z.stateNode;
      if (z = z.tag, F !== null && F === o) break;
      z !== 5 && z !== 26 && z !== 27 || le === null || (F = le, u ? (le = Co(a, d), le != null && w.unshift(
        ol(a, le, F)
      )) : u || (le = Co(a, d), le != null && w.push(
        ol(a, le, F)
      ))), a = a.return;
    }
    w.length !== 0 && e.push({ event: t, listeners: w });
  }
  var Bx = /\r\n?/g, Lx = /\u0000|\uFFFD/g;
  function Vm(e) {
    return (typeof e == "string" ? e : "" + e).replace(Bx, `
`).replace(Lx, "");
  }
  function Ym(e, t) {
    return t = Vm(t), Vm(e) === t;
  }
  function Ie(e, t, a, o, u, d) {
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
        Yd(e, o, d);
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
        o = or("" + o), e.setAttribute(a, o);
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
          typeof d == "function" && (a === "formAction" ? (t !== "input" && Ie(e, t, "name", u.name, u, null), Ie(
            e,
            t,
            "formEncType",
            u.formEncType,
            u,
            null
          ), Ie(
            e,
            t,
            "formMethod",
            u.formMethod,
            u,
            null
          ), Ie(
            e,
            t,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (Ie(e, t, "encType", u.encType, u, null), Ie(e, t, "method", u.method, u, null), Ie(e, t, "target", u.target, u, null)));
        if (o == null || typeof o == "symbol" || typeof o == "boolean") {
          e.removeAttribute(a);
          break;
        }
        o = or("" + o), e.setAttribute(a, o);
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
        a = or("" + o), e.setAttributeNS(
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
        (!(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N") && (a = db.get(a) || a, Ei(e, a, o));
    }
  }
  function df(e, t, a, o, u, d) {
    switch (a) {
      case "style":
        Yd(e, o, d);
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
        if (!er.hasOwnProperty(a))
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
                  Ie(e, t, d, w, a, null);
              }
          }
        u && Ie(e, t, "srcSet", a.srcSet, a, null), o && Ie(e, t, "src", a.src, a, null);
        return;
      case "input":
        Te("invalid", e);
        var z = d = w = u = null, F = null, le = null;
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
                  F = ue;
                  break;
                case "defaultChecked":
                  le = ue;
                  break;
                case "value":
                  d = ue;
                  break;
                case "defaultValue":
                  z = ue;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (ue != null)
                    throw Error(r(137, t));
                  break;
                default:
                  Ie(e, t, o, ue, a, null);
              }
          }
        ir(
          e,
          d,
          z,
          F,
          le,
          w,
          u,
          !1
        );
        return;
      case "select":
        Te("invalid", e), o = w = d = null;
        for (u in a)
          if (a.hasOwnProperty(u) && (z = a[u], z != null))
            switch (u) {
              case "value":
                d = z;
                break;
              case "defaultValue":
                w = z;
                break;
              case "multiple":
                o = z;
              default:
                Ie(e, t, u, z, a, null);
            }
        t = d, a = w, e.multiple = !!o, t != null ? Tn(e, !!o, t, !1) : a != null && Tn(e, !!o, a, !0);
        return;
      case "textarea":
        Te("invalid", e), d = u = o = null;
        for (w in a)
          if (a.hasOwnProperty(w) && (z = a[w], z != null))
            switch (w) {
              case "value":
                o = z;
                break;
              case "defaultValue":
                u = z;
                break;
              case "children":
                d = z;
                break;
              case "dangerouslySetInnerHTML":
                if (z != null) throw Error(r(91));
                break;
              default:
                Ie(e, t, w, z, a, null);
            }
        Ud(e, o, u, d);
        return;
      case "option":
        for (F in a)
          a.hasOwnProperty(F) && (o = a[F], o != null) && (F === "selected" ? e.selected = o && typeof o != "function" && typeof o != "symbol" : Ie(e, t, F, o, a, null));
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
                Ie(e, t, le, o, a, null);
            }
        return;
      default:
        if (Nu(t)) {
          for (ue in a)
            a.hasOwnProperty(ue) && (o = a[ue], o !== void 0 && df(
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
    for (z in a)
      a.hasOwnProperty(z) && (o = a[z], o != null && Ie(e, t, z, o, a, null));
  }
  function Ux(e, t, a, o) {
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
        var u = null, d = null, w = null, z = null, F = null, le = null, ue = null;
        for (se in a) {
          var fe = a[se];
          if (a.hasOwnProperty(se) && fe != null)
            switch (se) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                F = fe;
              default:
                o.hasOwnProperty(se) || Ie(e, t, se, null, o, fe);
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
                z = se;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (se != null)
                  throw Error(r(137, t));
                break;
              default:
                se !== fe && Ie(
                  e,
                  t,
                  re,
                  se,
                  o,
                  fe
                );
            }
        }
        Ya(
          e,
          w,
          z,
          F,
          le,
          ue,
          d,
          u
        );
        return;
      case "select":
        se = w = z = re = null;
        for (d in a)
          if (F = a[d], a.hasOwnProperty(d) && F != null)
            switch (d) {
              case "value":
                break;
              case "multiple":
                se = F;
              default:
                o.hasOwnProperty(d) || Ie(
                  e,
                  t,
                  d,
                  null,
                  o,
                  F
                );
            }
        for (u in o)
          if (d = o[u], F = a[u], o.hasOwnProperty(u) && (d != null || F != null))
            switch (u) {
              case "value":
                re = d;
                break;
              case "defaultValue":
                z = d;
                break;
              case "multiple":
                w = d;
              default:
                d !== F && Ie(
                  e,
                  t,
                  u,
                  d,
                  o,
                  F
                );
            }
        t = z, a = w, o = se, re != null ? Tn(e, !!a, re, !1) : !!o != !!a && (t != null ? Tn(e, !!a, t, !0) : Tn(e, !!a, a ? [] : "", !1));
        return;
      case "textarea":
        se = re = null;
        for (z in a)
          if (u = a[z], a.hasOwnProperty(z) && u != null && !o.hasOwnProperty(z))
            switch (z) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ie(e, t, z, null, o, u);
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
                u !== d && Ie(e, t, w, u, o, d);
            }
        Ld(e, re, se);
        return;
      case "option":
        for (var me in a)
          re = a[me], a.hasOwnProperty(me) && re != null && !o.hasOwnProperty(me) && (me === "selected" ? e.selected = !1 : Ie(
            e,
            t,
            me,
            null,
            o,
            re
          ));
        for (F in o)
          re = o[F], se = a[F], o.hasOwnProperty(F) && re !== se && (re != null || se != null) && (F === "selected" ? e.selected = re && typeof re != "function" && typeof re != "symbol" : Ie(
            e,
            t,
            F,
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
          re = a[we], a.hasOwnProperty(we) && re != null && !o.hasOwnProperty(we) && Ie(e, t, we, null, o, re);
        for (le in o)
          if (re = o[le], se = a[le], o.hasOwnProperty(le) && re !== se && (re != null || se != null))
            switch (le) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (re != null)
                  throw Error(r(137, t));
                break;
              default:
                Ie(
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
        if (Nu(t)) {
          for (var qe in a)
            re = a[qe], a.hasOwnProperty(qe) && re !== void 0 && !o.hasOwnProperty(qe) && df(
              e,
              t,
              qe,
              void 0,
              o,
              re
            );
          for (ue in o)
            re = o[ue], se = a[ue], !o.hasOwnProperty(ue) || re === se || re === void 0 && se === void 0 || df(
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
      re = a[ae], a.hasOwnProperty(ae) && re != null && !o.hasOwnProperty(ae) && Ie(e, t, ae, null, o, re);
    for (fe in o)
      re = o[fe], se = a[fe], !o.hasOwnProperty(fe) || re === se || re == null && se == null || Ie(e, t, fe, re, o, se);
  }
  function Im(e) {
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
  function Vx() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, a = performance.getEntriesByType("resource"), o = 0; o < a.length; o++) {
        var u = a[o], d = u.transferSize, w = u.initiatorType, z = u.duration;
        if (d && z && Im(w)) {
          for (w = 0, z = u.responseEnd, o += 1; o < a.length; o++) {
            var F = a[o], le = F.startTime;
            if (le > z) break;
            var ue = F.transferSize, fe = F.initiatorType;
            ue && Im(fe) && (F = F.responseEnd, w += ue * (F < z ? 1 : (z - le) / (F - le)));
          }
          if (--o, t += 8 * (d + w) / (u.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var hf = null, gf = null;
  function es(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function qm(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Xm(e, t) {
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
  function mf(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var pf = null;
  function Yx() {
    var e = window.event;
    return e && e.type === "popstate" ? e === pf ? !1 : (pf = e, !0) : (pf = null, !1);
  }
  var Gm = typeof setTimeout == "function" ? setTimeout : void 0, Ix = typeof clearTimeout == "function" ? clearTimeout : void 0, Zm = typeof Promise == "function" ? Promise : void 0, qx = typeof queueMicrotask == "function" ? queueMicrotask : typeof Zm < "u" ? function(e) {
    return Zm.resolve(null).then(e).catch(Xx);
  } : Gm;
  function Xx(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Sa(e) {
    return e === "head";
  }
  function $m(e, t) {
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
            var w = d.nextSibling, z = d.nodeName;
            d[Ua] || z === "SCRIPT" || z === "STYLE" || z === "LINK" && d.rel.toLowerCase() === "stylesheet" || a.removeChild(d), d = w;
          }
        } else
          a === "body" && ll(e.ownerDocument.body);
      a = u;
    } while (a);
    ao(t);
  }
  function Qm(e, t) {
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
  function yf(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (t = t.nextSibling, a.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          yf(a), Eo(a);
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
  function Gx(e, t, a, o) {
    for (; e.nodeType === 1; ) {
      var u = a;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!o && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (o) {
        if (!e[Ua])
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
  function Zx(e, t, a) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !a || (e = Jt(e.nextSibling), e === null)) return null;
    return e;
  }
  function Km(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Jt(e.nextSibling), e === null)) return null;
    return e;
  }
  function vf(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function bf(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function $x(e, t) {
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
  var xf = null;
  function Jm(e) {
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
  function Wm(e) {
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
  function Fm(e, t, a) {
    switch (t = es(a), e) {
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
  var Wt = /* @__PURE__ */ new Map(), Pm = /* @__PURE__ */ new Set();
  function ts(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Gn = k.d;
  k.d = {
    f: Qx,
    r: Kx,
    D: Jx,
    C: Wx,
    L: Fx,
    m: Px,
    X: t1,
    S: e1,
    M: n1
  };
  function Qx() {
    var e = Gn.f(), t = Zr();
    return e || t;
  }
  function Kx(e) {
    var t = ta(e);
    t !== null && t.tag === 5 && t.type === "form" ? pg(t) : Gn.r(e);
  }
  var eo = typeof document > "u" ? null : document;
  function ep(e, t, a) {
    var o = eo;
    if (o && typeof t == "string" && t) {
      var u = Nt(t);
      u = 'link[rel="' + e + '"][href="' + u + '"]', typeof a == "string" && (u += '[crossorigin="' + a + '"]'), Pm.has(u) || (Pm.add(u), e = { rel: e, crossOrigin: a, href: t }, o.querySelector(u) === null && (t = o.createElement("link"), yt(t, "link", e), at(t), o.head.appendChild(t)));
    }
  }
  function Jx(e) {
    Gn.D(e), ep("dns-prefetch", e, null);
  }
  function Wx(e, t) {
    Gn.C(e, t), ep("preconnect", e, t);
  }
  function Fx(e, t, a) {
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
      Wt.has(d) || (e = m(
        {
          rel: "preload",
          href: t === "image" && a && a.imageSrcSet ? void 0 : e,
          as: t
        },
        a
      ), Wt.set(d, e), o.querySelector(u) !== null || t === "style" && o.querySelector(rl(d)) || t === "script" && o.querySelector(sl(d)) || (t = o.createElement("link"), yt(t, "link", e), at(t), o.head.appendChild(t)));
    }
  }
  function Px(e, t) {
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
      if (!Wt.has(d) && (e = m({ rel: "modulepreload", href: e }, t), Wt.set(d, e), a.querySelector(u) === null)) {
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
  function e1(e, t, a) {
    Gn.S(e, t, a);
    var o = eo;
    if (o && e) {
      var u = aa(o).hoistableStyles, d = to(e);
      t = t || "default";
      var w = u.get(d);
      if (!w) {
        var z = { loading: 0, preload: null };
        if (w = o.querySelector(
          rl(d)
        ))
          z.loading = 5;
        else {
          e = m(
            { rel: "stylesheet", href: e, "data-precedence": t },
            a
          ), (a = Wt.get(d)) && wf(e, a);
          var F = w = o.createElement("link");
          at(F), yt(F, "link", e), F._p = new Promise(function(le, ue) {
            F.onload = le, F.onerror = ue;
          }), F.addEventListener("load", function() {
            z.loading |= 1;
          }), F.addEventListener("error", function() {
            z.loading |= 2;
          }), z.loading |= 4, ns(w, t, o);
        }
        w = {
          type: "stylesheet",
          instance: w,
          count: 1,
          state: z
        }, u.set(d, w);
      }
    }
  }
  function t1(e, t) {
    Gn.X(e, t);
    var a = eo;
    if (a && e) {
      var o = aa(a).hoistableScripts, u = no(e), d = o.get(u);
      d || (d = a.querySelector(sl(u)), d || (e = m({ src: e, async: !0 }, t), (t = Wt.get(u)) && Sf(e, t), d = a.createElement("script"), at(d), yt(d, "link", e), a.head.appendChild(d)), d = {
        type: "script",
        instance: d,
        count: 1,
        state: null
      }, o.set(u, d));
    }
  }
  function n1(e, t) {
    Gn.M(e, t);
    var a = eo;
    if (a && e) {
      var o = aa(a).hoistableScripts, u = no(e), d = o.get(u);
      d || (d = a.querySelector(sl(u)), d || (e = m({ src: e, async: !0, type: "module" }, t), (t = Wt.get(u)) && Sf(e, t), d = a.createElement("script"), at(d), yt(d, "link", e), a.head.appendChild(d)), d = {
        type: "script",
        instance: d,
        count: 1,
        state: null
      }, o.set(u, d));
    }
  }
  function tp(e, t, a, o) {
    var u = (u = $.current) ? ts(u) : null;
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
          }, Wt.set(e, a), d || a1(
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
  function np(e) {
    return m({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function a1(e, t, a, o) {
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
  function ap(e, t, a) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var o = e.querySelector(
            'style[data-href~="' + Nt(a.href) + '"]'
          );
          if (o)
            return t.instance = o, at(o), o;
          var u = m({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null
          });
          return o = (e.ownerDocument || e).createElement(
            "style"
          ), at(o), yt(o, "style", u), ns(o, a.precedence, e), t.instance = o;
        case "stylesheet":
          u = to(a.href);
          var d = e.querySelector(
            rl(u)
          );
          if (d)
            return t.state.loading |= 4, t.instance = d, at(d), d;
          o = np(a), (u = Wt.get(u)) && wf(o, u), d = (e.ownerDocument || e).createElement("link"), at(d);
          var w = d;
          return w._p = new Promise(function(z, F) {
            w.onload = z, w.onerror = F;
          }), yt(d, "link", o), t.state.loading |= 4, ns(d, a.precedence, e), t.instance = d;
        case "script":
          return d = no(a.src), (u = e.querySelector(
            sl(d)
          )) ? (t.instance = u, at(u), u) : (o = a, (u = Wt.get(d)) && (o = m({}, a), Sf(o, u)), e = e.ownerDocument || e, u = e.createElement("script"), at(u), yt(u, "link", o), e.head.appendChild(u), t.instance = u);
        case "void":
          return null;
        default:
          throw Error(r(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (o = t.instance, t.state.loading |= 4, ns(o, a.precedence, e));
    return t.instance;
  }
  function ns(e, t, a) {
    for (var o = a.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = o.length ? o[o.length - 1] : null, d = u, w = 0; w < o.length; w++) {
      var z = o[w];
      if (z.dataset.precedence === t) d = z;
      else if (d !== u) break;
    }
    d ? d.parentNode.insertBefore(e, d.nextSibling) : (t = a.nodeType === 9 ? a.head : a, t.insertBefore(e, t.firstChild));
  }
  function wf(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function Sf(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var as = null;
  function ip(e, t, a) {
    if (as === null) {
      var o = /* @__PURE__ */ new Map(), u = as = /* @__PURE__ */ new Map();
      u.set(a, o);
    } else
      u = as, o = u.get(a), o || (o = /* @__PURE__ */ new Map(), u.set(a, o));
    if (o.has(e)) return o;
    for (o.set(e, null), a = a.getElementsByTagName(e), u = 0; u < a.length; u++) {
      var d = a[u];
      if (!(d[Ua] || d[ct] || e === "link" && d.getAttribute("rel") === "stylesheet") && d.namespaceURI !== "http://www.w3.org/2000/svg") {
        var w = d.getAttribute(t) || "";
        w = e + w;
        var z = o.get(w);
        z ? z.push(d) : o.set(w, [d]);
      }
    }
    return o;
  }
  function op(e, t, a) {
    e = e.ownerDocument || e, e.head.insertBefore(
      a,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function i1(e, t, a) {
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
  function lp(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function o1(e, t, a, o) {
    if (a.type === "stylesheet" && (typeof o.media != "string" || matchMedia(o.media).matches !== !1) && (a.state.loading & 4) === 0) {
      if (a.instance === null) {
        var u = to(o.href), d = t.querySelector(
          rl(u)
        );
        if (d) {
          t = d._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = is.bind(e), t.then(e, e)), a.state.loading |= 4, a.instance = d, at(d);
          return;
        }
        d = t.ownerDocument || t, o = np(o), (u = Wt.get(u)) && wf(o, u), d = d.createElement("link"), at(d);
        var w = d;
        w._p = new Promise(function(z, F) {
          w.onload = z, w.onerror = F;
        }), yt(d, "link", o), a.instance = d;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(a, t), (t = a.state.preload) && (a.state.loading & 3) === 0 && (e.count++, a = is.bind(e), t.addEventListener("load", a), t.addEventListener("error", a));
    }
  }
  var Ef = 0;
  function l1(e, t) {
    return e.stylesheets && e.count === 0 && ls(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(a) {
      var o = setTimeout(function() {
        if (e.stylesheets && ls(e, e.stylesheets), e.unsuspend) {
          var d = e.unsuspend;
          e.unsuspend = null, d();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Ef === 0 && (Ef = 62500 * Vx());
      var u = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && ls(e, e.stylesheets), e.unsuspend)) {
            var d = e.unsuspend;
            e.unsuspend = null, d();
          }
        },
        (e.imgBytes > Ef ? 50 : 800) + t
      );
      return e.unsuspend = a, function() {
        e.unsuspend = null, clearTimeout(o), clearTimeout(u);
      };
    } : null;
  }
  function is() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) ls(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var os = null;
  function ls(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, os = /* @__PURE__ */ new Map(), t.forEach(r1, e), os = null, is.call(e));
  }
  function r1(e, t) {
    if (!(t.state.loading & 4)) {
      var a = os.get(e);
      if (a) var o = a.get(null);
      else {
        a = /* @__PURE__ */ new Map(), os.set(e, a);
        for (var u = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), d = 0; d < u.length; d++) {
          var w = u[d];
          (w.nodeName === "LINK" || w.getAttribute("media") !== "not all") && (a.set(w.dataset.precedence, w), o = w);
        }
        o && a.set(null, o);
      }
      u = t.instance, w = u.getAttribute("data-precedence"), d = a.get(w) || o, d === o && a.set(null, u), a.set(w, u), this.count++, o = is.bind(this), u.addEventListener("load", o), u.addEventListener("error", o), d ? d.parentNode.insertBefore(u, d.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(u, e.firstChild)), t.state.loading |= 4;
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
  function s1(e, t, a, o, u, d, w, z, F) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = xo(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = xo(0), this.hiddenUpdates = xo(null), this.identifierPrefix = o, this.onUncaughtError = u, this.onCaughtError = d, this.onRecoverableError = w, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = F, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function rp(e, t, a, o, u, d, w, z, F, le, ue, fe) {
    return e = new s1(
      e,
      t,
      a,
      w,
      F,
      le,
      ue,
      fe,
      z
    ), t = 1, d === !0 && (t |= 24), d = kt(3, null, null, t), e.current = d, d.stateNode = e, t = tc(), t.refCount++, e.pooledCache = t, t.refCount++, d.memoizedState = {
      element: o,
      isDehydrated: a,
      cache: t
    }, oc(d), e;
  }
  function sp(e) {
    return e ? (e = zi, e) : zi;
  }
  function up(e, t, a, o, u, d) {
    u = sp(u), o.context === null ? o.context = u : o.pendingContext = u, o = fa(t), o.payload = { element: a }, d = d === void 0 ? null : d, d !== null && (o.callback = d), a = da(e, o, t), a !== null && (Dt(a, e, t), Yo(a, e, t));
  }
  function cp(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var a = e.retryLane;
      e.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function _f(e, t) {
    cp(e, t), (e = e.alternate) && cp(e, t);
  }
  function fp(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Ga(e, 67108864);
      t !== null && Dt(t, e, 67108864), _f(e, 67108864);
    }
  }
  function dp(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Vt();
      t = wo(t);
      var a = Ga(e, t);
      a !== null && Dt(a, e, t), _f(e, t);
    }
  }
  var rs = !0;
  function u1(e, t, a, o) {
    var u = _.T;
    _.T = null;
    var d = k.p;
    try {
      k.p = 2, Nf(e, t, a, o);
    } finally {
      k.p = d, _.T = u;
    }
  }
  function c1(e, t, a, o) {
    var u = _.T;
    _.T = null;
    var d = k.p;
    try {
      k.p = 8, Nf(e, t, a, o);
    } finally {
      k.p = d, _.T = u;
    }
  }
  function Nf(e, t, a, o) {
    if (rs) {
      var u = Cf(o);
      if (u === null)
        ff(
          e,
          t,
          o,
          ss,
          a
        ), gp(e, o);
      else if (d1(
        u,
        e,
        t,
        a,
        o
      ))
        o.stopPropagation();
      else if (gp(e, o), t & 4 && -1 < f1.indexOf(e)) {
        for (; u !== null; ) {
          var d = ta(u);
          if (d !== null)
            switch (d.tag) {
              case 3:
                if (d = d.stateNode, d.current.memoizedState.isDehydrated) {
                  var w = Nn(d.pendingLanes);
                  if (w !== 0) {
                    var z = d;
                    for (z.pendingLanes |= 2, z.entangledLanes |= 2; w; ) {
                      var F = 1 << 31 - wt(w);
                      z.entanglements[1] |= F, w &= ~F;
                    }
                    yn(d), (Be & 6) === 0 && (Xr = ht() + 500, al(0));
                  }
                }
                break;
              case 31:
              case 13:
                z = Ga(d, 2), z !== null && Dt(z, d, 2), Zr(), _f(d, 2);
            }
          if (d = Cf(o), d === null && ff(
            e,
            t,
            o,
            ss,
            a
          ), d === u) break;
          u = d;
        }
        u !== null && o.stopPropagation();
      } else
        ff(
          e,
          t,
          o,
          null,
          a
        );
    }
  }
  function Cf(e) {
    return e = Mu(e), Mf(e);
  }
  var ss = null;
  function Mf(e) {
    if (ss = null, e = ea(e), e !== null) {
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
    return ss = e, null;
  }
  function hp(e) {
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
          case ka:
          case du:
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
  var Tf = !1, Ea = null, _a = null, Na = null, cl = /* @__PURE__ */ new Map(), fl = /* @__PURE__ */ new Map(), Ca = [], f1 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function gp(e, t) {
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
    }, t !== null && (t = ta(t), t !== null && fp(t)), e) : (e.eventSystemFlags |= o, t = e.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), e);
  }
  function d1(e, t, a, o, u) {
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
  function mp(e) {
    var t = ea(e.target);
    if (t !== null) {
      var a = c(t);
      if (a !== null) {
        if (t = a.tag, t === 13) {
          if (t = f(a), t !== null) {
            e.blockedOn = t, Jl(e.priority, function() {
              dp(a);
            });
            return;
          }
        } else if (t === 31) {
          if (t = h(a), t !== null) {
            e.blockedOn = t, Jl(e.priority, function() {
              dp(a);
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
  function us(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var a = Cf(e.nativeEvent);
      if (a === null) {
        a = e.nativeEvent;
        var o = new a.constructor(
          a.type,
          a
        );
        Cu = o, a.target.dispatchEvent(o), Cu = null;
      } else
        return t = ta(a), t !== null && fp(t), e.blockedOn = a, !1;
      t.shift();
    }
    return !0;
  }
  function pp(e, t, a) {
    us(e) && a.delete(t);
  }
  function h1() {
    Tf = !1, Ea !== null && us(Ea) && (Ea = null), _a !== null && us(_a) && (_a = null), Na !== null && us(Na) && (Na = null), cl.forEach(pp), fl.forEach(pp);
  }
  function cs(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Tf || (Tf = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      h1
    )));
  }
  var fs = null;
  function yp(e) {
    fs !== e && (fs = e, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      function() {
        fs === e && (fs = null);
        for (var t = 0; t < e.length; t += 3) {
          var a = e[t], o = e[t + 1], u = e[t + 2];
          if (typeof o != "function") {
            if (Mf(o || a) === null)
              continue;
            break;
          }
          var d = ta(a);
          d !== null && (e.splice(t, 3), t -= 3, Nc(
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
    function t(F) {
      return cs(F, e);
    }
    Ea !== null && cs(Ea, e), _a !== null && cs(_a, e), Na !== null && cs(Na, e), cl.forEach(t), fl.forEach(t);
    for (var a = 0; a < Ca.length; a++) {
      var o = Ca[a];
      o.blockedOn === e && (o.blockedOn = null);
    }
    for (; 0 < Ca.length && (a = Ca[0], a.blockedOn === null); )
      mp(a), a.blockedOn === null && Ca.shift();
    if (a = (e.ownerDocument || e).$$reactFormReplay, a != null)
      for (o = 0; o < a.length; o += 3) {
        var u = a[o], d = a[o + 1], w = u[vt] || null;
        if (typeof d == "function")
          w || yp(a);
        else if (w) {
          var z = null;
          if (d && d.hasAttribute("formAction")) {
            if (u = d, w = d[vt] || null)
              z = w.formAction;
            else if (Mf(u) !== null) continue;
          } else z = w.action;
          typeof z == "function" ? a[o + 1] = z : (a.splice(o, 3), o -= 3), yp(a);
        }
      }
  }
  function vp() {
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
  function jf(e) {
    this._internalRoot = e;
  }
  ds.prototype.render = jf.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(r(409));
    var a = t.current, o = Vt();
    up(a, o, e, t, null, null);
  }, ds.prototype.unmount = jf.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      up(e.current, 2, null, e, null, null), Zr(), t[Cn] = null;
    }
  };
  function ds(e) {
    this._internalRoot = e;
  }
  ds.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Kl();
      e = { blockedOn: null, target: e, priority: t };
      for (var a = 0; a < Ca.length && t !== 0 && t < Ca[a].priority; a++) ;
      Ca.splice(a, 0, e), a === 0 && mp(e);
    }
  };
  var bp = i.version;
  if (bp !== "19.2.4")
    throw Error(
      r(
        527,
        bp,
        "19.2.4"
      )
    );
  k.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(r(188)) : (e = Object.keys(e).join(","), Error(r(268, e)));
    return e = p(t), e = e !== null ? y(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var g1 = {
    bundleType: 0,
    version: "19.2.4",
    rendererPackageName: "react-dom",
    currentDispatcherRef: _,
    reconcilerVersion: "19.2.4"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var hs = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!hs.isDisabled && hs.supportsFiber)
      try {
        Ha = hs.inject(
          g1
        ), xt = hs;
      } catch {
      }
  }
  return pl.createRoot = function(e, t) {
    if (!s(e)) throw Error(r(299));
    var a = !1, o = "", u = Cg, d = Mg, w = Tg;
    return t != null && (t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (o = t.identifierPrefix), t.onUncaughtError !== void 0 && (u = t.onUncaughtError), t.onCaughtError !== void 0 && (d = t.onCaughtError), t.onRecoverableError !== void 0 && (w = t.onRecoverableError)), t = rp(
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
      vp
    ), e[Cn] = t.current, cf(e), new jf(t);
  }, pl.hydrateRoot = function(e, t, a) {
    if (!s(e)) throw Error(r(299));
    var o = !1, u = "", d = Cg, w = Mg, z = Tg, F = null;
    return a != null && (a.unstable_strictMode === !0 && (o = !0), a.identifierPrefix !== void 0 && (u = a.identifierPrefix), a.onUncaughtError !== void 0 && (d = a.onUncaughtError), a.onCaughtError !== void 0 && (w = a.onCaughtError), a.onRecoverableError !== void 0 && (z = a.onRecoverableError), a.formState !== void 0 && (F = a.formState)), t = rp(
      e,
      1,
      !0,
      t,
      a ?? null,
      o,
      u,
      F,
      d,
      w,
      z,
      vp
    ), t.context = sp(null), a = t.current, o = Vt(), o = wo(o), u = fa(o), u.callback = null, da(a, u, o), a = o, t.current.lanes = a, La(t, a), yn(t), e[Cn] = t.current, cf(e), new ds(t);
  }, pl.version = "19.2.4", pl;
}
var ly;
function sj() {
  if (ly) return Ff.exports;
  ly = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (i) {
        console.error(i);
      }
  }
  return n(), Ff.exports = rj(), Ff.exports;
}
var uj = sj();
function dj(n, i = {}) {
  const l = uj.createRoot(n);
  return l.render(/* @__PURE__ */ b.jsx(ij, { ...i })), {
    root: l,
    unmount() {
      l.unmount();
    }
  };
}
function hj(n) {
  return {
    async listActions() {
      return n.map((i) => ({ ...i }));
    }
  };
}
export {
  b1 as BUILDER_JSON_RPC_VERSION,
  _p as BUILDER_RPC_PATH,
  uy as BuilderResultError,
  ij as FSMUIBuilder,
  io as FSM_AUTHORING_METHODS,
  _l as FSM_RUNTIME_METHODS,
  si as HANDLED_ERROR_CODES,
  C1 as buildRPCEndpoint,
  Aa as callBuilderMethod,
  T1 as createBuilderAuthoringRPC,
  cj as createBuilderRPCClient,
  WT as createBuilderRuntimeRPC,
  z1 as createDefaultExportAdapter,
  Z1 as createLocalStoragePersistenceStore,
  hj as createStaticActionCatalogProvider,
  D1 as definitionFromDraft,
  fj as formatHandledBuilderError,
  R1 as isRPCExportAvailable,
  pd as loadDraftDocumentForEditing,
  dj as mountFSMUIBuilder,
  py as normalizeRuntimeApplyEvent,
  yy as normalizeRuntimeSnapshot,
  ej as prepareDraftDocumentForSave,
  js as toHandledBuilderError,
  M1 as unwrapBuilderResponse,
  j1 as useAuthoringRPC,
  FT as useRuntimeRPC
};

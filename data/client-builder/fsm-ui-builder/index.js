function Sv(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var Qf = { exports: {} }, qa = {};
var fm;
function xv() {
  if (fm) return qa;
  fm = 1;
  var i = /* @__PURE__ */ Symbol.for("react.transitional.element"), f = /* @__PURE__ */ Symbol.for("react.fragment");
  function o(s, h, z) {
    var w = null;
    if (z !== void 0 && (w = "" + z), h.key !== void 0 && (w = "" + h.key), "key" in h) {
      z = {};
      for (var O in h)
        O !== "key" && (z[O] = h[O]);
    } else z = h;
    return h = z.ref, {
      $$typeof: i,
      type: s,
      key: w,
      ref: h !== void 0 ? h : null,
      props: z
    };
  }
  return qa.Fragment = f, qa.jsx = o, qa.jsxs = o, qa;
}
var om;
function Ev() {
  return om || (om = 1, Qf.exports = xv()), Qf.exports;
}
var d = Ev(), Zf = { exports: {} }, et = {};
var sm;
function Tv() {
  if (sm) return et;
  sm = 1;
  var i = /* @__PURE__ */ Symbol.for("react.transitional.element"), f = /* @__PURE__ */ Symbol.for("react.portal"), o = /* @__PURE__ */ Symbol.for("react.fragment"), s = /* @__PURE__ */ Symbol.for("react.strict_mode"), h = /* @__PURE__ */ Symbol.for("react.profiler"), z = /* @__PURE__ */ Symbol.for("react.consumer"), w = /* @__PURE__ */ Symbol.for("react.context"), O = /* @__PURE__ */ Symbol.for("react.forward_ref"), N = /* @__PURE__ */ Symbol.for("react.suspense"), E = /* @__PURE__ */ Symbol.for("react.memo"), p = /* @__PURE__ */ Symbol.for("react.lazy"), b = /* @__PURE__ */ Symbol.for("react.activity"), D = Symbol.iterator;
  function M(v) {
    return v === null || typeof v != "object" ? null : (v = D && v[D] || v["@@iterator"], typeof v == "function" ? v : null);
  }
  var Q = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, X = Object.assign, Y = {};
  function G(v, H, _) {
    this.props = v, this.context = H, this.refs = Y, this.updater = _ || Q;
  }
  G.prototype.isReactComponent = {}, G.prototype.setState = function(v, H) {
    if (typeof v != "object" && typeof v != "function" && v != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, v, H, "setState");
  }, G.prototype.forceUpdate = function(v) {
    this.updater.enqueueForceUpdate(this, v, "forceUpdate");
  };
  function L() {
  }
  L.prototype = G.prototype;
  function V(v, H, _) {
    this.props = v, this.context = H, this.refs = Y, this.updater = _ || Q;
  }
  var F = V.prototype = new L();
  F.constructor = V, X(F, G.prototype), F.isPureReactComponent = !0;
  var ut = Array.isArray;
  function Bt() {
  }
  var it = { H: null, A: null, T: null, S: null }, qt = Object.prototype.hasOwnProperty;
  function Lt(v, H, _) {
    var B = _.ref;
    return {
      $$typeof: i,
      type: v,
      key: H,
      ref: B !== void 0 ? B : null,
      props: _
    };
  }
  function Pt(v, H) {
    return Lt(v.type, H, v.props);
  }
  function Vt(v) {
    return typeof v == "object" && v !== null && v.$$typeof === i;
  }
  function Qt(v) {
    var H = { "=": "=0", ":": "=2" };
    return "$" + v.replace(/[=:]/g, function(_) {
      return H[_];
    });
  }
  var te = /\/+/g;
  function Ot(v, H) {
    return typeof v == "object" && v !== null && v.key != null ? Qt("" + v.key) : H.toString(36);
  }
  function Nt(v) {
    switch (v.status) {
      case "fulfilled":
        return v.value;
      case "rejected":
        throw v.reason;
      default:
        switch (typeof v.status == "string" ? v.then(Bt, Bt) : (v.status = "pending", v.then(
          function(H) {
            v.status === "pending" && (v.status = "fulfilled", v.value = H);
          },
          function(H) {
            v.status === "pending" && (v.status = "rejected", v.reason = H);
          }
        )), v.status) {
          case "fulfilled":
            return v.value;
          case "rejected":
            throw v.reason;
        }
    }
    throw v;
  }
  function j(v, H, _, B, k) {
    var lt = typeof v;
    (lt === "undefined" || lt === "boolean") && (v = null);
    var vt = !1;
    if (v === null) vt = !0;
    else
      switch (lt) {
        case "bigint":
        case "string":
        case "number":
          vt = !0;
          break;
        case "object":
          switch (v.$$typeof) {
            case i:
            case f:
              vt = !0;
              break;
            case p:
              return vt = v._init, j(
                vt(v._payload),
                H,
                _,
                B,
                k
              );
          }
      }
    if (vt)
      return k = k(v), vt = B === "" ? "." + Ot(v, 0) : B, ut(k) ? (_ = "", vt != null && (_ = vt.replace(te, "$&/") + "/"), j(k, H, _, "", function(Ln) {
        return Ln;
      })) : k != null && (Vt(k) && (k = Pt(
        k,
        _ + (k.key == null || v && v.key === k.key ? "" : ("" + k.key).replace(
          te,
          "$&/"
        ) + "/") + vt
      )), H.push(k)), 1;
    vt = 0;
    var le = B === "" ? "." : B + ":";
    if (ut(v))
      for (var Mt = 0; Mt < v.length; Mt++)
        B = v[Mt], lt = le + Ot(B, Mt), vt += j(
          B,
          H,
          _,
          lt,
          k
        );
    else if (Mt = M(v), typeof Mt == "function")
      for (v = Mt.call(v), Mt = 0; !(B = v.next()).done; )
        B = B.value, lt = le + Ot(B, Mt++), vt += j(
          B,
          H,
          _,
          lt,
          k
        );
    else if (lt === "object") {
      if (typeof v.then == "function")
        return j(
          Nt(v),
          H,
          _,
          B,
          k
        );
      throw H = String(v), Error(
        "Objects are not valid as a React child (found: " + (H === "[object Object]" ? "object with keys {" + Object.keys(v).join(", ") + "}" : H) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return vt;
  }
  function Z(v, H, _) {
    if (v == null) return v;
    var B = [], k = 0;
    return j(v, B, "", "", function(lt) {
      return H.call(_, lt, k++);
    }), B;
  }
  function I(v) {
    if (v._status === -1) {
      var H = v._result;
      H = H(), H.then(
        function(_) {
          (v._status === 0 || v._status === -1) && (v._status = 1, v._result = _);
        },
        function(_) {
          (v._status === 0 || v._status === -1) && (v._status = 2, v._result = _);
        }
      ), v._status === -1 && (v._status = 0, v._result = H);
    }
    if (v._status === 1) return v._result.default;
    throw v._result;
  }
  var q = typeof reportError == "function" ? reportError : function(v) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var H = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof v == "object" && v !== null && typeof v.message == "string" ? String(v.message) : String(v),
        error: v
      });
      if (!window.dispatchEvent(H)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", v);
      return;
    }
    console.error(v);
  }, ct = {
    map: Z,
    forEach: function(v, H, _) {
      Z(
        v,
        function() {
          H.apply(this, arguments);
        },
        _
      );
    },
    count: function(v) {
      var H = 0;
      return Z(v, function() {
        H++;
      }), H;
    },
    toArray: function(v) {
      return Z(v, function(H) {
        return H;
      }) || [];
    },
    only: function(v) {
      if (!Vt(v))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return v;
    }
  };
  return et.Activity = b, et.Children = ct, et.Component = G, et.Fragment = o, et.Profiler = h, et.PureComponent = V, et.StrictMode = s, et.Suspense = N, et.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = it, et.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(v) {
      return it.H.useMemoCache(v);
    }
  }, et.cache = function(v) {
    return function() {
      return v.apply(null, arguments);
    };
  }, et.cacheSignal = function() {
    return null;
  }, et.cloneElement = function(v, H, _) {
    if (v == null)
      throw Error(
        "The argument must be a React element, but you passed " + v + "."
      );
    var B = X({}, v.props), k = v.key;
    if (H != null)
      for (lt in H.key !== void 0 && (k = "" + H.key), H)
        !qt.call(H, lt) || lt === "key" || lt === "__self" || lt === "__source" || lt === "ref" && H.ref === void 0 || (B[lt] = H[lt]);
    var lt = arguments.length - 2;
    if (lt === 1) B.children = _;
    else if (1 < lt) {
      for (var vt = Array(lt), le = 0; le < lt; le++)
        vt[le] = arguments[le + 2];
      B.children = vt;
    }
    return Lt(v.type, k, B);
  }, et.createContext = function(v) {
    return v = {
      $$typeof: w,
      _currentValue: v,
      _currentValue2: v,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, v.Provider = v, v.Consumer = {
      $$typeof: z,
      _context: v
    }, v;
  }, et.createElement = function(v, H, _) {
    var B, k = {}, lt = null;
    if (H != null)
      for (B in H.key !== void 0 && (lt = "" + H.key), H)
        qt.call(H, B) && B !== "key" && B !== "__self" && B !== "__source" && (k[B] = H[B]);
    var vt = arguments.length - 2;
    if (vt === 1) k.children = _;
    else if (1 < vt) {
      for (var le = Array(vt), Mt = 0; Mt < vt; Mt++)
        le[Mt] = arguments[Mt + 2];
      k.children = le;
    }
    if (v && v.defaultProps)
      for (B in vt = v.defaultProps, vt)
        k[B] === void 0 && (k[B] = vt[B]);
    return Lt(v, lt, k);
  }, et.createRef = function() {
    return { current: null };
  }, et.forwardRef = function(v) {
    return { $$typeof: O, render: v };
  }, et.isValidElement = Vt, et.lazy = function(v) {
    return {
      $$typeof: p,
      _payload: { _status: -1, _result: v },
      _init: I
    };
  }, et.memo = function(v, H) {
    return {
      $$typeof: E,
      type: v,
      compare: H === void 0 ? null : H
    };
  }, et.startTransition = function(v) {
    var H = it.T, _ = {};
    it.T = _;
    try {
      var B = v(), k = it.S;
      k !== null && k(_, B), typeof B == "object" && B !== null && typeof B.then == "function" && B.then(Bt, q);
    } catch (lt) {
      q(lt);
    } finally {
      H !== null && _.types !== null && (H.types = _.types), it.T = H;
    }
  }, et.unstable_useCacheRefresh = function() {
    return it.H.useCacheRefresh();
  }, et.use = function(v) {
    return it.H.use(v);
  }, et.useActionState = function(v, H, _) {
    return it.H.useActionState(v, H, _);
  }, et.useCallback = function(v, H) {
    return it.H.useCallback(v, H);
  }, et.useContext = function(v) {
    return it.H.useContext(v);
  }, et.useDebugValue = function() {
  }, et.useDeferredValue = function(v, H) {
    return it.H.useDeferredValue(v, H);
  }, et.useEffect = function(v, H) {
    return it.H.useEffect(v, H);
  }, et.useEffectEvent = function(v) {
    return it.H.useEffectEvent(v);
  }, et.useId = function() {
    return it.H.useId();
  }, et.useImperativeHandle = function(v, H, _) {
    return it.H.useImperativeHandle(v, H, _);
  }, et.useInsertionEffect = function(v, H) {
    return it.H.useInsertionEffect(v, H);
  }, et.useLayoutEffect = function(v, H) {
    return it.H.useLayoutEffect(v, H);
  }, et.useMemo = function(v, H) {
    return it.H.useMemo(v, H);
  }, et.useOptimistic = function(v, H) {
    return it.H.useOptimistic(v, H);
  }, et.useReducer = function(v, H, _) {
    return it.H.useReducer(v, H, _);
  }, et.useRef = function(v) {
    return it.H.useRef(v);
  }, et.useState = function(v) {
    return it.H.useState(v);
  }, et.useSyncExternalStore = function(v, H, _) {
    return it.H.useSyncExternalStore(
      v,
      H,
      _
    );
  }, et.useTransition = function() {
    return it.H.useTransition();
  }, et.version = "19.2.4", et;
}
var rm;
function lo() {
  return rm || (rm = 1, Zf.exports = Tv()), Zf.exports;
}
var $ = lo();
const oi = /* @__PURE__ */ Sv($), dm = "/rpc", Av = "2.0", Za = {
  applyEvent: "fsm.apply_event",
  snapshot: "fsm.snapshot"
}, Zn = {
  listMachines: "fsm.authoring.list_machines",
  getMachine: "fsm.authoring.get_machine",
  saveDraft: "fsm.authoring.save_draft",
  validate: "fsm.authoring.validate",
  publish: "fsm.authoring.publish",
  deleteMachine: "fsm.authoring.delete_machine"
}, ln = {
  versionConflict: "FSM_VERSION_CONFLICT",
  idempotencyConflict: "FSM_IDEMPOTENCY_CONFLICT",
  guardRejected: "FSM_GUARD_REJECTED",
  invalidTransition: "FSM_INVALID_TRANSITION",
  stateNotFound: "FSM_STATE_NOT_FOUND",
  authoringNotFound: "FSM_AUTHORING_NOT_FOUND",
  authoringValidationFailed: "FSM_AUTHORING_VALIDATION_FAILED",
  internal: "FSM_INTERNAL"
};
class bi extends Error {
  method;
  code;
  data;
  status;
  constructor(f) {
    super(f.message), this.name = "RPCClientError", this.method = f.method, this.code = f.code, this.data = f.data, this.status = f.status;
  }
}
function Nv() {
  return Math.random().toString(36).slice(2);
}
function Dv(i, f, o) {
  const s = {
    id: (o.idGenerator ?? Nv)(),
    method: i
  };
  return f !== void 0 && (s.params = f), o.rpcVersion === "2.0" && (s.jsonrpc = "2.0"), s;
}
function Bm(i) {
  return !!i && typeof i == "object" && !Array.isArray(i);
}
function zv(i, f) {
  if (!Bm(f))
    return f;
  if (f.error)
    throw new bi({
      method: i,
      message: f.error.message || `rpc call failed: ${i}`,
      code: f.error.code,
      data: f.error.data
    });
  return "result" in f ? f.result : f;
}
function Ov() {
  if (typeof globalThis.fetch != "function")
    throw new Error("global fetch is unavailable; provide fetchImpl explicitly");
  return globalThis.fetch.bind(globalThis);
}
class _v {
  constructor(f) {
    this.options = f, this.fetchImpl = f.fetchImpl ?? Ov();
  }
  fetchImpl;
  async call(f, o) {
    const s = JSON.stringify(Dv(f, o, this.options)), h = await this.fetchImpl(this.options.endpoint, {
      ...this.options.requestInit,
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...this.options.headers ?? {}
      },
      body: s
    }), z = await h.json().catch(() => null);
    if (!h.ok)
      throw Bm(z) && z.error ? new bi({
        method: f,
        message: z.error.message || `rpc call failed (${h.status})`,
        code: z.error.code,
        data: z.error.data,
        status: h.status
      }) : new bi({
        method: f,
        message: `rpc call failed (${h.status})`,
        status: h.status,
        data: z
      });
    return zv(f, z);
  }
}
class qm extends Error {
  method;
  envelope;
  constructor(f, o) {
    super(o.message), this.name = "BuilderResultError", this.method = f, this.envelope = o;
  }
}
function jv(i) {
  return i.replace(/\/+$/, "");
}
function Cv(i) {
  return i.endpoint && i.endpoint.trim() !== "" ? i.endpoint : !i.origin || i.origin.trim() === "" ? dm : `${jv(i.origin)}${dm}`;
}
function t0(i = {}) {
  return new _v({
    endpoint: Cv(i),
    rpcVersion: Av,
    headers: i.headers,
    fetchImpl: i.fetchImpl,
    requestInit: i.requestInit
  });
}
async function Rl(i) {
  const f = {
    data: i.data,
    meta: i.meta
  }, o = await i.client.call(
    i.method,
    f
  );
  return Mv(i.method, o);
}
function Mv(i, f) {
  if (f.error)
    throw new qm(i, f.error);
  if (f.data === void 0)
    throw new Error(`rpc result missing data envelope for method ${i}`);
  return f.data;
}
function Rv(i) {
  return {
    async listMachines(f, o) {
      return Rl({
        client: i,
        method: Zn.listMachines,
        data: f,
        meta: o
      });
    },
    async getMachine(f, o) {
      return Rl({
        client: i,
        method: Zn.getMachine,
        data: f,
        meta: o
      });
    },
    async saveDraft(f, o) {
      return Rl({
        client: i,
        method: Zn.saveDraft,
        data: f,
        meta: o
      });
    },
    async validate(f, o) {
      return Rl({
        client: i,
        method: Zn.validate,
        data: f,
        meta: o
      });
    },
    async publish(f, o) {
      return Rl({
        client: i,
        method: Zn.publish,
        data: f,
        meta: o
      });
    },
    async deleteMachine(f, o) {
      return Rl({
        client: i,
        method: Zn.deleteMachine,
        data: f,
        meta: o
      });
    }
  };
}
function Uv(i) {
  return $.useMemo(() => i ? Rv(i) : null, [i]);
}
function Hv(i) {
  return `${i.trim().replace(/[^a-zA-Z0-9_-]+/g, "-") || "machine"}.json`;
}
function Bv(i) {
  return i.definition;
}
function qv(i, f) {
  if (typeof window > "u" || typeof document > "u")
    return;
  const o = new Blob([f], { type: "application/json;charset=utf-8" }), s = window.URL.createObjectURL(o), h = document.createElement("a");
  h.href = s, h.download = i, h.style.display = "none", document.body.appendChild(h), h.click(), document.body.removeChild(h), window.URL.revokeObjectURL(s);
}
function Yv(i = {}) {
  return {
    async exportJSON({ machineId: f, draft: o }) {
      qv(Hv(f), JSON.stringify(Bv(o), null, 2));
    },
    exportRPC: i.exportRPC
  };
}
function wv(i) {
  return !!i?.exportRPC;
}
const Gv = ["step", "when"], Ym = ["parallel", "join", "batch", "compensation"];
function pi(i) {
  return Gv.includes(i);
}
function wm(i) {
  return Ym.includes(i);
}
function Xv(i) {
  const f = /* @__PURE__ */ new Set();
  for (const o of i.transitions)
    for (const s of o.workflow?.nodes ?? [])
      wm(s.kind) && f.add(s.kind);
  return [...f];
}
function Gm() {
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
function Et(i) {
  return typeof structuredClone == "function" ? structuredClone(i) : JSON.parse(JSON.stringify(i));
}
function wa(i) {
  return JSON.stringify(i);
}
function Qv(i) {
  const f = i.event || "(event)", o = i.to || i.dynamic_to?.resolver || "(target)";
  return `${f} -> ${o}`;
}
function Zv(i, f) {
  return i.filter((o) => Xm(o, f));
}
function si(i, f, o) {
  return i.filter((s) => Xm(s, f) ? s.field === o || s.path.endsWith(`.${o}`) : !1);
}
function Xm(i, f) {
  const o = i.path;
  switch (f.kind) {
    case "machine":
      return !0;
    case "state": {
      const s = f.stateIndex;
      return o.includes(`states[${s}]`);
    }
    case "transition": {
      const s = f.transitionIndex;
      return o.includes(`transitions[${s}]`);
    }
    case "workflow-node": {
      const { transitionIndex: s, nodeIndex: h } = f;
      return o.includes(`transitions[${s}]`) && o.includes(`workflow.nodes[${h}]`);
    }
  }
}
function ri(i, f) {
  const o = i.match(f);
  if (!o?.[1])
    return null;
  const s = Number.parseInt(o[1], 10);
  return Number.isNaN(s) ? null : s;
}
function Lv(i, f) {
  for (let o = 0; o < i.transitions.length; o += 1) {
    const s = i.transitions[o]?.workflow?.nodes ?? [];
    for (let h = 0; h < s.length; h += 1)
      if (s[h]?.id === f)
        return { kind: "workflow-node", transitionIndex: o, nodeIndex: h };
  }
  return null;
}
function Vv(i, f) {
  const o = i.transitions.findIndex((s) => s.id === f);
  return o === -1 ? null : { kind: "transition", transitionIndex: o };
}
function Kv(i, f) {
  const o = i.states.findIndex((s) => s.name === f);
  return o === -1 ? null : { kind: "state", stateIndex: o };
}
function Jv(i, f) {
  if (f.node_id)
    return Lv(i, f.node_id) || Vv(i, f.node_id) || Kv(i, f.node_id);
  const o = ri(f.path, /transitions\[(\d+)\]/), s = ri(f.path, /workflow\.nodes\[(\d+)\]/);
  if (o !== null && s !== null)
    return {
      kind: "workflow-node",
      transitionIndex: o,
      nodeIndex: s
    };
  const h = ri(f.path, /transitions\[(\d+)\]/);
  if (h !== null)
    return { kind: "transition", transitionIndex: h };
  const z = ri(f.path, /states\[(\d+)\]/);
  return z !== null ? { kind: "state", stateIndex: z } : null;
}
function cl(i) {
  return {
    code: i.code,
    severity: "error",
    message: i.message,
    path: i.path,
    node_id: i.nodeID,
    field: i.field
  };
}
function kv(i, f, o, s, h) {
  const z = `$.transitions[${f}].workflow.nodes[${s}]`;
  if (!pi(o.kind)) {
    const w = wm(o.kind) ? `${o.kind} is unsupported in builder v1` : `unsupported workflow node kind ${o.kind}`;
    h.push(
      cl({
        code: "FSM002_INVALID_WORKFLOW_NODE",
        message: w,
        path: `${z}.kind`,
        nodeID: o.id,
        field: "kind"
      })
    );
    return;
  }
  if (o.kind === "step" && (o.step?.action_id?.trim() ?? "") === "" && h.push(
    cl({
      code: "FSM001_UNRESOLVED_ACTION",
      message: "step action_id is required",
      path: `${z}.step.action_id`,
      nodeID: o.id,
      field: "action_id"
    })
  ), o.kind === "when" && (o.expr?.trim() ?? "") === "" && h.push(
    cl({
      code: "FSM002_INVALID_WORKFLOW_NODE",
      message: "when node requires expression",
      path: `${z}.expr`,
      nodeID: o.id,
      field: "expr"
    })
  ), Array.isArray(o.next))
    for (const w of o.next)
      i.workflow.nodes.some((N) => N.id === w) || h.push(
        cl({
          code: "FSM002_INVALID_WORKFLOW_NODE",
          message: `workflow next references unknown node ${w}`,
          path: `${z}.next`,
          nodeID: o.id,
          field: "next"
        })
      );
}
function Qm(i) {
  const f = [];
  return i.states.forEach((o, s) => {
    (!o.name || o.name.trim() === "") && f.push(
      cl({
        code: "FSM003_UNKNOWN_STATE",
        message: "state name is required",
        path: `$.states[${s}].name`,
        field: "name"
      })
    );
  }), i.transitions.forEach((o, s) => {
    const h = `$.transitions[${s}]`;
    (!o.event || o.event.trim() === "") && f.push(
      cl({
        code: "FSM004_DUPLICATE_TRANSITION",
        message: "transition event is required",
        path: `${h}.event`,
        nodeID: o.id,
        field: "event"
      })
    ), (!o.from || o.from.trim() === "") && f.push(
      cl({
        code: "FSM003_UNKNOWN_STATE",
        message: "transition from is required",
        path: `${h}.from`,
        nodeID: o.id,
        field: "from"
      })
    );
    const z = !!(o.to && o.to.trim() !== ""), w = !!(o.dynamic_to?.resolver && o.dynamic_to.resolver.trim() !== "");
    if (z === w && f.push(
      cl({
        code: "FSM001_INVALID_TARGET",
        message: "transition target must define exactly one of to or dynamic resolver",
        path: `${h}.target`,
        nodeID: o.id,
        field: "target"
      })
    ), !o.workflow || o.workflow.nodes.length === 0) {
      f.push(
        cl({
          code: "FSM005_MISSING_WORKFLOW",
          message: "transition workflow requires at least one node",
          path: `${h}.workflow`,
          nodeID: o.id,
          field: "workflow"
        })
      );
      return;
    }
    o.workflow.nodes.forEach((O, N) => {
      kv(o, s, O, N, f);
    });
  }), f;
}
const $v = "fsm-ui-builder.autosave";
function di() {
  return typeof window > "u" || typeof window.localStorage > "u" ? !1 : typeof window.localStorage.getItem == "function" && typeof window.localStorage.setItem == "function" && typeof window.localStorage.removeItem == "function";
}
function Lf(i) {
  return i.trim();
}
function mm(i) {
  if (!i)
    return null;
  try {
    const f = JSON.parse(i);
    return !f || typeof f != "object" || typeof f.machineId != "string" || !f.document || typeof f.updatedAt != "string" ? null : {
      machineId: f.machineId,
      updatedAt: f.updatedAt,
      document: Et(f.document)
    };
  } catch {
    return null;
  }
}
function Wv(i, f) {
  return i.startsWith(`${f}:`);
}
function Vf(i, f) {
  return `${i}:${f}`;
}
function Fv(i = $v) {
  return {
    async list() {
      if (!di())
        return [];
      const f = [];
      for (let o = 0; o < window.localStorage.length; o += 1) {
        const s = window.localStorage.key(o);
        if (!s || !Wv(s, i))
          continue;
        const h = mm(window.localStorage.getItem(s));
        h && f.push({ machineId: h.machineId, updatedAt: h.updatedAt });
      }
      return f.sort((o, s) => s.updatedAt.localeCompare(o.updatedAt)), f;
    },
    async load(f) {
      const o = Lf(f);
      if (o === "" || !di())
        return null;
      const s = Vf(i, o), h = mm(window.localStorage.getItem(s));
      return h ? {
        machineId: h.machineId,
        updatedAt: h.updatedAt,
        document: Et(h.document)
      } : null;
    },
    async save(f) {
      const o = Lf(f.machineId);
      if (o === "" || !di())
        return;
      const s = Vf(i, o), h = {
        machineId: o,
        updatedAt: f.updatedAt,
        document: Et(f.document)
      };
      window.localStorage.setItem(s, JSON.stringify(h));
    },
    async delete(f) {
      const o = Lf(f);
      o === "" || !di() || window.localStorage.removeItem(Vf(i, o));
    }
  };
}
const hm = (i) => {
  let f;
  const o = /* @__PURE__ */ new Set(), s = (E, p) => {
    const b = typeof E == "function" ? E(f) : E;
    if (!Object.is(b, f)) {
      const D = f;
      f = p ?? (typeof b != "object" || b === null) ? b : Object.assign({}, f, b), o.forEach((M) => M(f, D));
    }
  }, h = () => f, O = { setState: s, getState: h, getInitialState: () => N, subscribe: (E) => (o.add(E), () => o.delete(E)) }, N = f = i(s, h, O);
  return O;
}, no = ((i) => i ? hm(i) : hm), Iv = (i) => i;
function ao(i, f = Iv) {
  const o = oi.useSyncExternalStore(
    i.subscribe,
    oi.useCallback(() => f(i.getState()), [i, f]),
    oi.useCallback(() => f(i.getInitialState()), [i, f])
  );
  return oi.useDebugValue(o), o;
}
function Ga(i, f) {
  return f <= 0 ? 0 : Math.min(Math.max(0, i), f - 1);
}
function Xa(i, f = []) {
  const o = Qm(i.definition);
  return f.length === 0 ? o : [...f, ...o];
}
function Si(i, f) {
  const o = i.id.trim();
  return o !== "" ? `id:${o}` : `index:${f}`;
}
function en(i) {
  const f = {};
  for (const [o, s] of Object.entries(i))
    f[o] = {
      staticTo: s.staticTo,
      dynamicTarget: s.dynamicTarget ? Et(s.dynamicTarget) : void 0
    };
  return f;
}
function Kf(i) {
  const f = {};
  return i.definition.transitions.forEach((o, s) => {
    f[Si(o, s)] = {
      staticTo: o.to,
      dynamicTarget: o.dynamic_to ? Et(o.dynamic_to) : void 0
    };
  }), f;
}
function ym(i, f, o) {
  const s = Si(f, o), h = i[s];
  if (h)
    return h;
  const z = {
    staticTo: f.to,
    dynamicTarget: f.dynamic_to ? Et(f.dynamic_to) : void 0
  };
  return i[s] = z, z;
}
function Pv(i, f) {
  const o = {};
  for (const [s, h] of Object.entries(i)) {
    if (!s.startsWith("index:")) {
      o[s] = h;
      continue;
    }
    const z = Number.parseInt(s.slice(6), 10);
    if (Number.isNaN(z)) {
      o[s] = h;
      continue;
    }
    if (z !== f) {
      if (z > f) {
        o[`index:${z - 1}`] = h;
        continue;
      }
      o[s] = h;
    }
  }
  return o;
}
function gi(i, f, o) {
  const s = Ga(f, i.length), h = i[s], z = wa(h.document);
  return {
    document: Et(h.document),
    selection: h.selection,
    diagnostics: [...h.diagnostics],
    targetCache: en(h.targetCache),
    history: i,
    historyIndex: s,
    baselineHash: o,
    isDirty: z !== o
  };
}
function mi(i) {
  return i.workflow || (i.workflow = { nodes: [] }), Array.isArray(i.workflow.nodes) || (i.workflow.nodes = []), i;
}
function xe(i, f, o, s) {
  i.setState((h) => {
    const z = Et(h.document), w = en(h.targetCache);
    o(z, h, w);
    const O = Xa(z), N = s ? s(z, h) : h.selection, E = h.history.slice(0, h.historyIndex + 1);
    return E.push({
      document: z,
      selection: N,
      diagnostics: O,
      targetCache: w,
      transaction: f
    }), gi(E, E.length - 1, h.baselineHash);
  });
}
function hi(i) {
  return i.states.length === 0 ? "" : i.states[0]?.name ?? "";
}
function vm(i, f) {
  return i === "step" ? {
    id: `step-${f + 1}`,
    kind: i,
    step: {
      action_id: "",
      async: !1,
      delay: "",
      timeout: "",
      metadata: {}
    },
    next: []
  } : {
    id: `when-${f + 1}`,
    kind: i,
    expr: "",
    next: []
  };
}
function tg(i = {}) {
  const f = Et(i.document ?? Gm()), o = { kind: "machine" }, s = Xa(f, i.diagnostics), h = Kf(f), z = wa(f), w = [
    {
      document: f,
      selection: o,
      diagnostics: s,
      targetCache: en(h),
      transaction: "init"
    }
  ], O = no((N, E) => ({
    document: Et(f),
    selection: o,
    diagnostics: [...s],
    targetCache: en(h),
    history: w,
    historyIndex: 0,
    baselineHash: z,
    isDirty: !1,
    setSelection(p) {
      N({ selection: p });
    },
    replaceDocument(p, b) {
      N(() => {
        const D = Et(p), M = Xa(D, b), Q = Kf(D), X = { kind: "machine" }, Y = [
          {
            document: D,
            selection: X,
            diagnostics: M,
            targetCache: en(Q),
            transaction: "replace-document"
          }
        ], G = wa(D);
        return {
          document: Et(D),
          selection: X,
          diagnostics: M,
          targetCache: en(Q),
          history: Y,
          historyIndex: 0,
          baselineHash: G,
          isDirty: !1
        };
      });
    },
    setDiagnostics(p) {
      N((b) => ({ diagnostics: Xa(b.document, p) }));
    },
    focusDiagnostic(p) {
      N((b) => {
        const D = Jv(b.document.definition, p);
        return D ? { selection: D } : b;
      });
    },
    setMachineName(p) {
      xe(O, "set-machine-name", (b) => {
        b.definition.name = p;
      });
    },
    addState() {
      xe(
        O,
        "add-state",
        (p) => {
          const b = p.definition.states.length + 1;
          p.definition.states.push({ name: `state_${b}` });
        },
        (p) => ({ kind: "state", stateIndex: Math.max(0, p.definition.states.length - 1) })
      );
    },
    removeState(p) {
      xe(
        O,
        "remove-state",
        (b) => {
          if (p < 0 || p >= b.definition.states.length)
            return;
          const D = b.definition.states[p]?.name;
          b.definition.states.splice(p, 1), D && b.definition.transitions.forEach((M) => {
            M.from === D && (M.from = hi(b.definition)), M.to === D && (M.to = hi(b.definition));
          });
        },
        (b, D) => b.definition.states.length === 0 ? { kind: "machine" } : { kind: "state", stateIndex: D.selection.kind === "state" ? Ga(Math.min(D.selection.stateIndex, p), b.definition.states.length) : Ga(p, b.definition.states.length) }
      );
    },
    updateStateName(p, b) {
      xe(O, "update-state-name", (D) => {
        const M = D.definition.states[p];
        if (!M)
          return;
        const Q = M.name;
        M.name = b, D.definition.transitions.forEach((X) => {
          X.from === Q && (X.from = b), X.to === Q && (X.to = b);
        });
      });
    },
    updateStateFlag(p, b, D) {
      xe(O, `update-state-${b}`, (M) => {
        const Q = M.definition.states[p];
        Q && (b === "initial" && D && M.definition.states.forEach((X) => {
          X.initial = !1;
        }), Q[b] = D);
      });
    },
    addTransition() {
      xe(
        O,
        "add-transition",
        (p, b, D) => {
          const M = hi(p.definition), Q = p.definition.states[1]?.name ?? M, X = p.definition.transitions.length + 1, Y = {
            id: `transition_${X}`,
            event: `event_${X}`,
            from: M,
            to: Q,
            workflow: {
              nodes: [vm("step", 0)]
            },
            metadata: {}
          };
          p.definition.transitions.push(Y), D[Si(Y, p.definition.transitions.length - 1)] = {
            staticTo: Y.to
          };
        },
        (p) => ({ kind: "transition", transitionIndex: Math.max(0, p.definition.transitions.length - 1) })
      );
    },
    removeTransition(p) {
      xe(
        O,
        "remove-transition",
        (b, D, M) => {
          if (p < 0 || p >= b.definition.transitions.length)
            return;
          const Q = b.definition.transitions[p];
          Q && delete M[Si(Q, p)], b.definition.transitions.splice(p, 1);
          const X = Pv(M, p);
          Object.keys(M).forEach((Y) => {
            delete M[Y];
          }), Object.assign(M, X);
        },
        (b) => b.definition.transitions.length === 0 ? { kind: "machine" } : {
          kind: "transition",
          transitionIndex: Ga(p, b.definition.transitions.length)
        }
      );
    },
    updateTransition(p, b, D) {
      xe(O, `update-transition-${b}`, (M, Q, X) => {
        const Y = M.definition.transitions[p];
        if (!Y)
          return;
        const G = ym(X, Y, p);
        if (b === "event") {
          Y.event = D;
          return;
        }
        if (b === "from") {
          Y.from = D;
          return;
        }
        if (b === "to") {
          Y.to = D, G.staticTo = D;
          return;
        }
        if (b === "dynamic_to.resolver") {
          const L = {
            ...Y.dynamic_to ?? G.dynamicTarget ?? { resolver: "" },
            resolver: D
          };
          Y.dynamic_to = L, G.dynamicTarget = Et(L);
        }
      });
    },
    updateTransitionTargetKind(p, b) {
      xe(O, "update-transition-target-kind", (D, M, Q) => {
        const X = D.definition.transitions[p];
        if (!X)
          return;
        const Y = ym(Q, X, p);
        if (X.to && X.to.trim() !== "" && (Y.staticTo = X.to), X.dynamic_to?.resolver && X.dynamic_to.resolver.trim() !== "" && (Y.dynamicTarget = Et(X.dynamic_to)), b === "static") {
          X.dynamic_to = void 0;
          const G = Y.staticTo?.trim() ?? "";
          X.to = G || hi(D.definition);
          return;
        }
        X.to = void 0, X.dynamic_to = Et(Y.dynamicTarget ?? { resolver: "" });
      });
    },
    addWorkflowNode(p, b) {
      xe(
        O,
        `add-${b}-workflow-node`,
        (D) => {
          const M = D.definition.transitions[p];
          if (!M)
            return;
          mi(M);
          const Q = M.workflow.nodes.length;
          M.workflow.nodes.push(vm(b, Q));
        },
        (D) => {
          const M = D.definition.transitions[p];
          if (!M)
            return { kind: "machine" };
          const Q = Math.max(0, M.workflow.nodes.length - 1);
          return { kind: "workflow-node", transitionIndex: p, nodeIndex: Q };
        }
      );
    },
    removeWorkflowNode(p, b) {
      xe(
        O,
        "remove-workflow-node",
        (D) => {
          const M = D.definition.transitions[p];
          M && (mi(M), !(b < 0 || b >= M.workflow.nodes.length) && (M.workflow.nodes.splice(b, 1), M.workflow.nodes.forEach((Q) => {
            Array.isArray(Q.next) && (Q.next = Q.next.filter(
              (X) => M.workflow.nodes.some((Y) => Y.id === X)
            ));
          })));
        },
        (D) => {
          const M = D.definition.transitions[p];
          return !M || M.workflow.nodes.length === 0 ? { kind: "transition", transitionIndex: p } : {
            kind: "workflow-node",
            transitionIndex: p,
            nodeIndex: Ga(b, M.workflow.nodes.length)
          };
        }
      );
    },
    selectWorkflowNode(p, b) {
      N({ selection: { kind: "workflow-node", transitionIndex: p, nodeIndex: b } });
    },
    updateWorkflowNodeField(p, b, D, M) {
      xe(O, `update-workflow-node-${D}`, (Q) => {
        const X = Q.definition.transitions[p];
        if (!X)
          return;
        mi(X);
        const Y = X.workflow.nodes[b];
        if (Y && pi(Y.kind)) {
          if (D === "expr") {
            Y.expr = String(M);
            return;
          }
          if (Y.step = Y.step ?? {
            action_id: "",
            async: !1,
            delay: "",
            timeout: "",
            metadata: {}
          }, D === "action_id") {
            Y.step.action_id = String(M);
            return;
          }
          if (D === "async") {
            Y.step.async = !!M;
            return;
          }
          if (D === "delay") {
            Y.step.delay = String(M);
            return;
          }
          D === "timeout" && (Y.step.timeout = String(M));
        }
      });
    },
    updateWorkflowNodeMetadata(p, b, D) {
      xe(O, "update-workflow-node-metadata", (M) => {
        const Q = M.definition.transitions[p];
        if (!Q)
          return;
        mi(Q);
        const X = Q.workflow.nodes[b];
        X && X.kind === "step" && (X.step = X.step ?? {
          action_id: "",
          async: !1,
          delay: "",
          timeout: "",
          metadata: {}
        }, X.step.metadata = Et(D));
      });
    },
    undo() {
      const p = E();
      if (p.historyIndex === 0)
        return;
      const b = p.historyIndex - 1;
      N(gi(p.history, b, p.baselineHash));
    },
    redo() {
      const p = E();
      if (p.historyIndex >= p.history.length - 1)
        return;
      const b = p.historyIndex + 1;
      N(gi(p.history, b, p.baselineHash));
    },
    markSaved() {
      N((p) => ({
        baselineHash: wa(p.document),
        isDirty: !1
      }));
    },
    applyRemoteSave(p, b, D) {
      N((M) => {
        const Q = Et(M.document);
        Q.definition.version = p, Q.draft_state = Et(b);
        const X = Xa(Q, D), Y = Kf(Q), G = {
          document: Q,
          selection: M.selection,
          diagnostics: X,
          targetCache: en(Y),
          transaction: "apply-remote-save"
        }, L = M.history.slice(0, M.historyIndex + 1);
        L.push(G);
        const V = wa(Q);
        return gi(L, L.length - 1, V);
      });
    }
  }));
  return O;
}
function Re(i) {
  return i !== null && typeof i == "object" && !Array.isArray(i) ? i : null;
}
function Ht(i, f, o = "") {
  for (const s of f) {
    const h = i[s];
    if (typeof h == "string")
      return h;
  }
  return o;
}
function Qa(i, f) {
  for (const o of f) {
    const s = i[o];
    if (typeof s == "number" && Number.isFinite(s))
      return s;
  }
}
function La(i, f, o = !1) {
  for (const s of f) {
    const h = i[s];
    if (typeof h == "boolean")
      return h;
  }
  return o;
}
function eg(i, f) {
  for (const o of f) {
    const s = i[o];
    if (typeof s == "boolean")
      return s;
  }
}
function lg(i, f) {
  for (const o of f) {
    const s = i[o];
    if (Array.isArray(s))
      return s.filter((h) => typeof h == "string");
  }
}
function nn(i, f) {
  for (const o of f) {
    const s = i[o], h = Re(s);
    if (h)
      return { ...h };
  }
}
function gm(i) {
  if (typeof i == "number")
    return i / 1e6;
}
function ng(i) {
  const f = Re(i) ?? {};
  return {
    kind: Ht(f, ["kind", "Kind"]),
    to: Ht(f, ["to", "To"]) || void 0,
    resolver: Ht(f, ["resolver", "Resolver"]) || void 0,
    resolved: La(f, ["resolved", "Resolved"]),
    resolvedTo: Ht(f, ["resolvedTo", "ResolvedTo"]) || void 0,
    candidates: lg(f, ["candidates", "Candidates"])
  };
}
function ag(i) {
  const f = Re(i) ?? {}, o = f.rejections ?? f.Rejections, s = Array.isArray(o) ? o.map((h) => ug(h)) : void 0;
  return {
    id: Ht(f, ["id", "ID"]),
    event: Ht(f, ["event", "Event"]),
    target: ng(f.target ?? f.Target),
    allowed: La(f, ["allowed", "Allowed"], !0),
    rejections: s,
    metadata: nn(f, ["metadata", "Metadata"])
  };
}
function ug(i) {
  const f = Re(i) ?? {};
  return {
    code: Ht(f, ["code", "Code"]),
    category: Ht(f, ["category", "Category"]),
    retryable: La(f, ["retryable", "Retryable"]),
    requiresAction: La(f, ["requiresAction", "RequiresAction"]),
    message: Ht(f, ["message", "Message"]),
    remediationHint: Ht(f, ["remediationHint", "RemediationHint"]) || void 0,
    metadata: nn(f, ["metadata", "Metadata"])
  };
}
function ig(i) {
  const f = Re(i) ?? {}, o = Ht(f, ["kind", "Kind"]), s = Ht(f, ["actionId", "ActionID"]);
  if (o === "command" || s !== "") {
    const z = Qa(f, ["delayMs", "DelayMs"]), w = Qa(f, ["timeoutMs", "TimeoutMs"]), O = z ?? gm(Qa(f, ["Delay", "delay"])), N = w ?? gm(Qa(f, ["Timeout", "timeout"])), E = {
      kind: "command",
      actionId: s,
      payload: nn(f, ["payload", "Payload"]) ?? {},
      async: La(f, ["async", "Async"]),
      metadata: nn(f, ["metadata", "Metadata"])
    };
    return O !== void 0 && (E.delayMs = O), N !== void 0 && (E.timeoutMs = N), E;
  }
  return {
    kind: "emit_event",
    event: Ht(f, ["event", "Event"]),
    msg: f.msg ?? f.Msg,
    metadata: nn(f, ["metadata", "Metadata"])
  };
}
function cg(i) {
  const f = Re(i) ?? {}, o = f.effects ?? f.Effects, s = Array.isArray(o) ? o.map((h) => ig(h)) : [];
  return {
    previousState: Ht(f, ["previousState", "PreviousState"]),
    currentState: Ht(f, ["currentState", "CurrentState"]),
    effects: s
  };
}
function Zm(i) {
  const f = Re(i) ?? {}, o = f.allowedTransitions ?? f.AllowedTransitions, s = Array.isArray(o) ? o.map((h) => ag(h)) : [];
  return {
    entityId: Ht(f, ["entityId", "EntityID"]),
    currentState: Ht(f, ["currentState", "CurrentState"]),
    allowedTransitions: s,
    metadata: nn(f, ["metadata", "Metadata"])
  };
}
function fg(i) {
  const f = Re(i) ?? {};
  return {
    executionId: Ht(f, ["executionId", "ExecutionID"]),
    policy: Ht(f, ["policy", "Policy"]) || void 0,
    status: Ht(f, ["status", "Status"]),
    metadata: nn(f, ["metadata", "Metadata"])
  };
}
function og(i) {
  const f = Re(i);
  if (f && (f.error ?? f.Error))
    throw new Error("rpc apply event response contains error envelope");
  const o = f ? Re(f.result ?? f.Result) : null;
  if (o && (o.error ?? o.Error))
    throw new Error("rpc apply event response contains result error envelope");
  const s = f ? Re(f.data ?? f.Data) : null, h = o ? Re(o.data ?? o.Data) : null, z = s ?? h ?? o ?? f;
  if (!z)
    throw new Error("invalid apply event response: expected object envelope");
  const w = z.transition ?? z.Transition, O = z.snapshot ?? z.Snapshot;
  if (!w || !O)
    throw new Error("invalid apply event response: transition and snapshot are required");
  const N = z.execution ?? z.Execution;
  return {
    eventId: Ht(z, ["eventId", "EventID"]),
    version: Qa(z, ["version", "Version"]) ?? 0,
    transition: cg(w),
    snapshot: Zm(O),
    execution: N ? fg(N) : void 0,
    idempotencyHit: eg(z, ["idempotencyHit", "IdempotencyHit"])
  };
}
function bm(i) {
  return i !== null && typeof i == "object" && !Array.isArray(i) ? i : null;
}
function sg(i) {
  const f = bm(i);
  if (!f)
    return i;
  const o = bm(f.result ?? f.Result);
  return o ? o.data ?? o.Data ?? o : f.data ?? f.Data ?? f;
}
function Lm(i) {
  return og(i);
}
function Vm(i) {
  return Zm(sg(i));
}
function xi(i, f) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    level: i,
    message: f,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function rg(i) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    code: i.code,
    message: i.message,
    method: i.method,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function dg(i, f) {
  const o = Lm(i), s = o.execution?.status ?? "dry_run", h = {
    selectedTransitionID: f?.transitionId,
    event: f?.event ?? "(event)",
    previousState: o.transition.previousState,
    currentState: o.transition.currentState,
    status: s,
    idempotencyHit: o.idempotencyHit
  };
  return {
    applyEventResult: o,
    projectedOutcome: h,
    log: [
      xi(
        "info",
        `Projected ${h.event}: ${h.previousState} -> ${h.currentState} (${h.status})`
      )
    ]
  };
}
function mg(i) {
  const f = Vm(i), o = f.allowedTransitions.filter((s) => !s.allowed);
  return {
    snapshotResult: f,
    blockedTransitions: o,
    log: [
      xi(
        "info",
        `Snapshot state ${f.currentState}, blocked transitions: ${o.length}`
      )
    ]
  };
}
function hg() {
  return no((i) => ({
    applyEventResult: null,
    snapshotResult: null,
    projectedOutcome: null,
    blockedTransitions: [],
    errors: [],
    log: [],
    setApplyEventWirePayload(f, o) {
      const s = dg(f, o);
      i((h) => ({
        applyEventResult: s.applyEventResult,
        projectedOutcome: s.projectedOutcome,
        log: [...h.log, ...s.log]
      }));
    },
    setSnapshotWirePayload(f) {
      const o = mg(f);
      i((s) => ({
        snapshotResult: o.snapshotResult,
        blockedTransitions: o.blockedTransitions,
        log: [...s.log, ...o.log]
      }));
    },
    pushError(f) {
      i((o) => ({
        errors: [...o.errors, rg(f)],
        log: [...o.log, xi("error", `[${f.code}] ${f.message}`)]
      }));
    },
    pushInfo(f) {
      i((o) => ({
        log: [...o.log, xi("info", f)]
      }));
    },
    clear() {
      i({
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
const Km = "fsm-ui-builder.panel-layout";
function Ul(i, f, o) {
  return Number.isNaN(i) ? f : Math.min(Math.max(i, f), o);
}
function Jf() {
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
function Jm() {
  return typeof window > "u" || typeof window.localStorage > "u" ? !1 : typeof window.localStorage.getItem == "function" && typeof window.localStorage.setItem == "function";
}
function yg() {
  if (!Jm())
    return Jf();
  const i = window.localStorage.getItem(Km);
  if (!i)
    return Jf();
  try {
    const f = JSON.parse(i);
    return {
      explorerWidth: Ul(f.explorerWidth ?? 240, 180, 400),
      inspectorWidth: Ul(f.inspectorWidth ?? 320, 240, 500),
      consoleHeight: Ul(f.consoleHeight ?? 140, 80, 300),
      explorerCollapsed: !!f.explorerCollapsed,
      inspectorCollapsed: !!f.inspectorCollapsed,
      consoleCollapsed: !!f.consoleCollapsed,
      canvasZoom: Ul(f.canvasZoom ?? 1, 0.25, 2),
      canvasOffsetX: Number.isFinite(f.canvasOffsetX) ? Number(f.canvasOffsetX) : 0,
      canvasOffsetY: Number.isFinite(f.canvasOffsetY) ? Number(f.canvasOffsetY) : 0
    };
  } catch {
    return Jf();
  }
}
function tn(i) {
  Jm() && window.localStorage.setItem(Km, JSON.stringify(i));
}
function vg() {
  const i = yg();
  return no((f) => ({
    ...i,
    viewportMode: "desktop",
    mobilePanel: "canvas",
    keyboardHelpOpen: !1,
    setPanelWidth(o, s) {
      f((h) => {
        const z = {
          ...h,
          explorerWidth: o === "explorer" ? Ul(s, 180, 400) : h.explorerWidth,
          inspectorWidth: o === "inspector" ? Ul(s, 240, 500) : h.inspectorWidth
        };
        return tn(z), z;
      });
    },
    setConsoleHeight(o) {
      f((s) => {
        const h = {
          ...s,
          consoleHeight: Ul(o, 80, 300)
        };
        return tn(h), h;
      });
    },
    setPanelCollapsed(o, s) {
      f((h) => {
        const z = {
          ...h,
          explorerCollapsed: o === "explorer" ? s : h.explorerCollapsed,
          inspectorCollapsed: o === "inspector" ? s : h.inspectorCollapsed,
          consoleCollapsed: o === "console" ? s : h.consoleCollapsed
        };
        return tn(z), z;
      });
    },
    togglePanel(o) {
      f((s) => {
        const h = {
          ...s,
          explorerCollapsed: o === "explorer" ? !s.explorerCollapsed : s.explorerCollapsed,
          inspectorCollapsed: o === "inspector" ? !s.inspectorCollapsed : s.inspectorCollapsed,
          consoleCollapsed: o === "console" ? !s.consoleCollapsed : s.consoleCollapsed
        };
        return tn(h), h;
      });
    },
    setKeyboardHelpOpen(o) {
      f({ keyboardHelpOpen: o });
    },
    toggleKeyboardHelp() {
      f((o) => ({
        keyboardHelpOpen: !o.keyboardHelpOpen
      }));
    },
    zoomCanvas(o) {
      f((s) => {
        const h = {
          ...s,
          canvasZoom: Ul(s.canvasZoom + o, 0.25, 2)
        };
        return tn(h), h;
      });
    },
    panCanvas(o, s) {
      f((h) => {
        const z = {
          ...h,
          canvasOffsetX: h.canvasOffsetX + o,
          canvasOffsetY: h.canvasOffsetY + s
        };
        return tn(z), z;
      });
    },
    resetCanvasView() {
      f((o) => {
        const s = {
          ...o,
          canvasZoom: 1,
          canvasOffsetX: 0,
          canvasOffsetY: 0
        };
        return tn(s), s;
      });
    },
    setViewportMode(o) {
      f({ viewportMode: o });
    },
    setMobilePanel(o) {
      f({ mobilePanel: o });
    }
  }));
}
const km = $.createContext(null), $m = $.createContext(null), Wm = $.createContext(null);
function gg(i) {
  const f = $.useRef(null), o = $.useRef(null), s = $.useRef(null);
  return f.current || (f.current = tg({
    document: i.initialDocument,
    diagnostics: i.initialDiagnostics
  })), o.current || (o.current = vg()), s.current || (s.current = hg()), /* @__PURE__ */ d.jsx(km.Provider, { value: f.current, children: /* @__PURE__ */ d.jsx($m.Provider, { value: o.current, children: /* @__PURE__ */ d.jsx(Wm.Provider, { value: s.current, children: i.children }) }) });
}
function uo(i, f) {
  if (!i)
    throw new Error(f);
  return i;
}
function tt(i) {
  const f = uo(
    $.useContext(km),
    "Machine store context is missing. Wrap with BuilderStoresProvider."
  );
  return ao(f, i);
}
function At(i) {
  const f = uo(
    $.useContext($m),
    "UI store context is missing. Wrap with BuilderStoresProvider."
  );
  return ao(f, i);
}
function Me(i) {
  const f = uo(
    $.useContext(Wm),
    "Simulation store context is missing. Wrap with BuilderStoresProvider."
  );
  return ao(f, i);
}
function bg(i) {
  return i instanceof HTMLElement ? i.isContentEditable ? !0 : i.matches("input, textarea, select") : !1;
}
function pm(i) {
  return i.kind === "machine" ? "machine" : i.kind === "state" ? `state:${i.stateIndex}` : i.kind === "transition" ? `transition:${i.transitionIndex}` : `workflow:${i.transitionIndex}:${i.nodeIndex}`;
}
function Sm(i, f, o) {
  const s = [{ kind: "machine" }];
  f.states.forEach((O, N) => {
    s.push({ kind: "state", stateIndex: N });
  }), f.transitions.forEach((O, N) => {
    s.push({ kind: "transition", transitionIndex: N }), O.workflow?.nodes?.forEach((E, p) => {
      s.push({ kind: "workflow-node", transitionIndex: N, nodeIndex: p });
    });
  });
  const h = s.findIndex((O) => pm(O) === pm(i)), z = h >= 0 ? h : 0, w = Math.min(Math.max(0, z + o), s.length - 1);
  return s[w] ?? { kind: "machine" };
}
function pg(i) {
  const f = tt((b) => b.selection), o = tt((b) => b.document.definition), s = tt((b) => b.setSelection), h = tt((b) => b.undo), z = tt((b) => b.redo), w = tt((b) => b.addState), O = tt((b) => b.addTransition), N = At((b) => b.zoomCanvas), E = At((b) => b.resetCanvasView), p = At((b) => b.panCanvas);
  $.useEffect(() => {
    const b = (D) => {
      const M = D.metaKey || D.ctrlKey, Q = bg(D.target), X = !!i.readOnly, Y = D.key, G = Y.toLowerCase();
      if (!!i.keyboardHelpOpen) {
        Y === "Escape" && (D.preventDefault(), i.onCloseKeyboardHelp?.());
        return;
      }
      if (M && G === "s") {
        D.preventDefault(), X || i.onSave?.();
        return;
      }
      if (M && Y === "Enter") {
        D.preventDefault(), X || i.onValidate?.();
        return;
      }
      if (M && G === "z") {
        if (Q)
          return;
        D.preventDefault(), X || (D.shiftKey ? z() : h());
        return;
      }
      if (M && G === "y") {
        if (Q)
          return;
        D.preventDefault(), X || z();
        return;
      }
      if (M && Y === "1") {
        D.preventDefault(), i.onFocusPanel?.("explorer");
        return;
      }
      if (M && Y === "2") {
        D.preventDefault(), i.onFocusPanel?.("canvas");
        return;
      }
      if (M && Y === "3") {
        D.preventDefault(), i.onFocusPanel?.("inspector");
        return;
      }
      if (M && Y === "`") {
        D.preventDefault(), i.onToggleConsole ? i.onToggleConsole() : i.onFocusPanel?.("console");
        return;
      }
      if (!M && !Q && Y === "?") {
        D.preventDefault(), i.onToggleKeyboardHelp?.();
        return;
      }
      if (M && (Y === "+" || Y === "=")) {
        D.preventDefault(), N(0.1);
        return;
      }
      if (M && Y === "-") {
        D.preventDefault(), N(-0.1);
        return;
      }
      if (M && Y === "0") {
        D.preventDefault(), E();
        return;
      }
      if (D.altKey && !M && Y.startsWith("Arrow")) {
        if (D.preventDefault(), Y === "ArrowLeft") {
          p(-24, 0);
          return;
        }
        if (Y === "ArrowRight") {
          p(24, 0);
          return;
        }
        if (Y === "ArrowUp") {
          p(0, -24);
          return;
        }
        Y === "ArrowDown" && p(0, 24);
        return;
      }
      if (!M && !Q && Y === "Escape") {
        D.preventDefault(), s({ kind: "machine" });
        return;
      }
      if (!M && !Q && Y === "ArrowDown") {
        D.preventDefault(), s(Sm(f, o, 1));
        return;
      }
      if (!M && !Q && Y === "ArrowUp") {
        D.preventDefault(), s(Sm(f, o, -1));
        return;
      }
      if (!M && !Q && !X && G === "n") {
        D.preventDefault(), w();
        return;
      }
      !M && !Q && !X && G === "t" && (D.preventDefault(), O());
    };
    return window.addEventListener("keydown", b), () => {
      window.removeEventListener("keydown", b);
    };
  }, [
    w,
    O,
    o,
    i,
    p,
    z,
    E,
    f,
    s,
    h,
    N
  ]);
}
function kf(i) {
  const f = At((w) => w.explorerWidth), o = At((w) => w.inspectorWidth), s = At((w) => w.consoleHeight), h = At((w) => w.setPanelWidth), z = At((w) => w.setConsoleHeight);
  return $.useCallback(
    (w) => {
      w.preventDefault();
      const O = {
        pointerX: w.clientX,
        pointerY: w.clientY,
        width: i === "explorer" ? f : o,
        height: s
      }, N = (p) => {
        if (i === "console") {
          const D = O.pointerY - p.clientY;
          z(O.height + D);
          return;
        }
        const b = p.clientX - O.pointerX;
        if (i === "explorer") {
          h("explorer", O.width + b);
          return;
        }
        h("inspector", O.width - b);
      }, E = () => {
        window.removeEventListener("pointermove", N), window.removeEventListener("pointerup", E);
      };
      window.addEventListener("pointermove", N), window.addEventListener("pointerup", E);
    },
    [s, f, o, i, z, h]
  );
}
function Sg(i) {
  return i < 900 ? "mobile-readonly" : i <= 1200 ? "compact" : "desktop";
}
function xg() {
  const i = At((o) => o.viewportMode), f = At((o) => o.setViewportMode);
  return $.useEffect(() => {
    const o = () => {
      f(Sg(window.innerWidth));
    };
    return o(), window.addEventListener("resize", o), () => {
      window.removeEventListener("resize", o);
    };
  }, [f]), i;
}
function xm(i) {
  const f = tt((p) => p.document.definition), o = tt((p) => p.selection), s = tt((p) => p.setSelection), h = tt((p) => p.addState), z = At((p) => p.canvasZoom), w = At((p) => p.canvasOffsetX), O = At((p) => p.canvasOffsetY), N = !!i.readOnly, E = f.states;
  return /* @__PURE__ */ d.jsxs(
    "section",
    {
      className: "fub-panel fub-canvas",
      "aria-label": "Canvas panel",
      role: "region",
      "aria-labelledby": "fub-panel-canvas-heading",
      id: "fub-panel-canvas",
      tabIndex: -1,
      children: [
        /* @__PURE__ */ d.jsxs("div", { className: "fub-panel-header", id: "fub-panel-canvas-heading", children: [
          /* @__PURE__ */ d.jsx("strong", { children: "Canvas" }),
          /* @__PURE__ */ d.jsxs("div", { className: "fub-inline-actions", children: [
            /* @__PURE__ */ d.jsx("span", { className: "fub-muted", children: "Graph + workflow overview" }),
            /* @__PURE__ */ d.jsxs("span", { className: "fub-badge fub-canvas-zoom", "aria-live": "polite", children: [
              "Zoom: ",
              Math.round(z * 100),
              "%"
            ] }),
            N ? /* @__PURE__ */ d.jsx("span", { className: "fub-badge", children: "Read-only" }) : null
          ] })
        ] }),
        /* @__PURE__ */ d.jsxs("div", { className: "fub-panel-body", children: [
          E.length === 0 ? /* @__PURE__ */ d.jsxs("div", { className: "fub-empty-state", role: "status", "aria-live": "polite", children: [
            /* @__PURE__ */ d.jsx("div", { className: "fub-empty-icon", "aria-hidden": "true", children: "< >" }),
            /* @__PURE__ */ d.jsx("h3", { children: "No states yet" }),
            /* @__PURE__ */ d.jsx("p", { children: "Create your first state to start building your machine." }),
            /* @__PURE__ */ d.jsx(
              "button",
              {
                type: "button",
                className: "fub-btn",
                onClick: h,
                disabled: N,
                children: "Create first state"
              }
            ),
            /* @__PURE__ */ d.jsxs("p", { className: "fub-muted", children: [
              "Hint: press ",
              /* @__PURE__ */ d.jsx("kbd", { children: "N" }),
              " to add a state."
            ] })
          ] }) : null,
          /* @__PURE__ */ d.jsx(
            "div",
            {
              className: "fub-canvas-viewport",
              style: {
                transform: `translate(${w}px, ${O}px) scale(${z})`
              },
              children: /* @__PURE__ */ d.jsx("div", { className: "fub-canvas-grid", children: E.map((p, b) => {
                const D = o.kind === "state" && o.stateIndex === b;
                return /* @__PURE__ */ d.jsxs(
                  "article",
                  {
                    className: `fub-state-card${D ? " is-selected" : ""}`,
                    onClick: () => s({ kind: "state", stateIndex: b }),
                    role: "button",
                    tabIndex: 0,
                    onKeyDown: (M) => {
                      (M.key === "Enter" || M.key === " ") && (M.preventDefault(), s({ kind: "state", stateIndex: b }));
                    },
                    children: [
                      /* @__PURE__ */ d.jsxs("header", { children: [
                        /* @__PURE__ */ d.jsx("strong", { children: p.name || "(unnamed)" }),
                        /* @__PURE__ */ d.jsx("span", { children: p.initial ? "initial" : p.terminal ? "final" : "state" })
                      ] }),
                      /* @__PURE__ */ d.jsx("ul", { children: f.transitions.map((M, Q) => ({ transition: M, transitionIndex: Q })).filter(({ transition: M }) => M.from === p.name).map(({ transition: M, transitionIndex: Q }) => {
                        const X = o.kind === "transition" && o.transitionIndex === Q || o.kind === "workflow-node" && o.transitionIndex === Q;
                        return /* @__PURE__ */ d.jsx("li", { children: /* @__PURE__ */ d.jsxs(
                          "button",
                          {
                            type: "button",
                            className: `fub-mini-pill${X ? " is-selected" : ""}`,
                            onClick: (Y) => {
                              Y.stopPropagation(), s({ kind: "transition", transitionIndex: Q });
                            },
                            children: [
                              M.event || "(event)",
                              " -> ",
                              M.to || M.dynamic_to?.resolver || "(target)"
                            ]
                          }
                        ) }, M.id || `canvas-transition-${Q}`);
                      }) })
                    ]
                  },
                  `canvas-state-${b}`
                );
              }) })
            }
          )
        ] })
      ]
    }
  );
}
function Em() {
  const i = tt((O) => O.diagnostics), f = tt((O) => O.focusDiagnostic), o = Me((O) => O.log), s = Me((O) => O.projectedOutcome), h = Me((O) => O.blockedTransitions), z = Me((O) => O.errors), w = Me((O) => O.clear);
  return /* @__PURE__ */ d.jsxs(
    "section",
    {
      className: "fub-panel fub-console",
      "aria-label": "Console panel",
      role: "region",
      "aria-labelledby": "fub-panel-console-heading",
      id: "fub-panel-console",
      tabIndex: -1,
      children: [
        /* @__PURE__ */ d.jsxs("div", { className: "fub-panel-header", id: "fub-panel-console-heading", children: [
          /* @__PURE__ */ d.jsx("strong", { children: "Console" }),
          /* @__PURE__ */ d.jsxs("div", { className: "fub-inline-actions", children: [
            /* @__PURE__ */ d.jsx("span", { className: "fub-muted", children: "Problems + simulation output" }),
            /* @__PURE__ */ d.jsx(
              "button",
              {
                type: "button",
                className: "fub-mini-btn",
                onClick: w,
                "aria-label": "Clear console output",
                children: "Clear"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ d.jsxs("div", { className: "fub-console-grid", children: [
          /* @__PURE__ */ d.jsxs("section", { children: [
            /* @__PURE__ */ d.jsx("h3", { children: "Problems" }),
            /* @__PURE__ */ d.jsxs("ul", { children: [
              i.length === 0 ? /* @__PURE__ */ d.jsx("li", { className: "fub-muted", children: "No diagnostics." }) : null,
              i.map((O, N) => /* @__PURE__ */ d.jsx("li", { children: /* @__PURE__ */ d.jsxs(
                "button",
                {
                  type: "button",
                  className: "fub-list-item",
                  onClick: () => {
                    f(O), (typeof window.requestAnimationFrame == "function" ? window.requestAnimationFrame.bind(window) : (p) => window.setTimeout(p, 0))(() => {
                      document.getElementById("fub-panel-inspector")?.focus();
                    });
                  },
                  children: [
                    /* @__PURE__ */ d.jsx("strong", { children: O.code }),
                    " ",
                    O.message
                  ]
                }
              ) }, `${O.code}-${O.path}-${N}`))
            ] })
          ] }),
          /* @__PURE__ */ d.jsxs("section", { children: [
            /* @__PURE__ */ d.jsx("h3", { children: "Simulation" }),
            s ? /* @__PURE__ */ d.jsxs("div", { className: "fub-console-card", "aria-label": "Projected outcome", children: [
              /* @__PURE__ */ d.jsx("strong", { children: "Projected outcome" }),
              /* @__PURE__ */ d.jsxs("div", { children: [
                "Event: ",
                /* @__PURE__ */ d.jsx("code", { children: s.event })
              ] }),
              s.selectedTransitionID ? /* @__PURE__ */ d.jsxs("div", { children: [
                "Transition: ",
                /* @__PURE__ */ d.jsx("code", { children: s.selectedTransitionID })
              ] }) : null,
              /* @__PURE__ */ d.jsxs("div", { children: [
                "State: ",
                /* @__PURE__ */ d.jsx("code", { children: s.previousState }),
                " -> ",
                /* @__PURE__ */ d.jsx("code", { children: s.currentState })
              ] }),
              /* @__PURE__ */ d.jsxs("div", { children: [
                "Status: ",
                /* @__PURE__ */ d.jsx("code", { children: s.status })
              ] })
            ] }) : /* @__PURE__ */ d.jsx("p", { className: "fub-muted", children: "No dry-run projected outcome yet." }),
            /* @__PURE__ */ d.jsxs("div", { className: "fub-console-card", "aria-label": "Blocked transitions", children: [
              /* @__PURE__ */ d.jsx("strong", { children: "Blocked transitions" }),
              h.length === 0 ? /* @__PURE__ */ d.jsx("p", { className: "fub-muted", children: "No blocked transitions in latest snapshot." }) : null,
              /* @__PURE__ */ d.jsx("ul", { children: h.map((O) => /* @__PURE__ */ d.jsxs("li", { children: [
                /* @__PURE__ */ d.jsxs("div", { children: [
                  /* @__PURE__ */ d.jsx("code", { children: O.id || "(transition)" }),
                  " event ",
                  /* @__PURE__ */ d.jsx("code", { children: O.event })
                ] }),
                /* @__PURE__ */ d.jsx("ul", { children: (O.rejections ?? []).map((N, E) => /* @__PURE__ */ d.jsxs("li", { children: [
                  /* @__PURE__ */ d.jsx("strong", { children: N.code }),
                  ": ",
                  N.message,
                  N.remediationHint ? ` (${N.remediationHint})` : ""
                ] }, `${O.id}-rejection-${E}`)) })
              ] }, O.id || O.event)) })
            ] }),
            /* @__PURE__ */ d.jsxs("div", { className: "fub-console-card", "aria-label": "Runtime and authoring errors", children: [
              /* @__PURE__ */ d.jsx("strong", { children: "Runtime/authoring errors" }),
              z.length === 0 ? /* @__PURE__ */ d.jsx("p", { className: "fub-muted", children: "No runtime/authoring errors." }) : null,
              /* @__PURE__ */ d.jsx("ul", { children: z.map((O) => /* @__PURE__ */ d.jsxs("li", { className: "fub-log-error", children: [
                "[",
                O.code,
                "] ",
                O.method ? `${O.method}: ` : "",
                O.message
              ] }, O.id)) })
            ] }),
            /* @__PURE__ */ d.jsxs("ul", { role: "log", "aria-live": "polite", "aria-label": "Simulation log", children: [
              o.length === 0 ? /* @__PURE__ */ d.jsx("li", { className: "fub-muted", children: "No simulation runs yet." }) : null,
              o.map((O) => /* @__PURE__ */ d.jsxs("li", { className: `fub-log-${O.level}`, children: [
                "[",
                O.timestamp,
                "] ",
                O.message
              ] }, O.id))
            ] })
          ] })
        ] })
      ]
    }
  );
}
function Tm(i) {
  return i ? " is-selected" : "";
}
function Eg(i, f) {
  return i.kind === "state" && i.stateIndex === f;
}
function Tg(i, f) {
  return i.kind === "transition" || i.kind === "workflow-node" ? i.transitionIndex === f : !1;
}
function Am(i) {
  const f = tt((N) => N.document.definition.states), o = tt((N) => N.document.definition.transitions), s = tt((N) => N.selection), h = tt((N) => N.setSelection), z = tt((N) => N.addState), w = tt((N) => N.addTransition), O = !!i.readOnly;
  return /* @__PURE__ */ d.jsxs(
    "section",
    {
      className: "fub-panel fub-explorer",
      "aria-label": "Explorer panel",
      role: "region",
      "aria-labelledby": "fub-panel-explorer-heading",
      id: "fub-panel-explorer",
      tabIndex: -1,
      children: [
        /* @__PURE__ */ d.jsxs("div", { className: "fub-panel-header", id: "fub-panel-explorer-heading", children: [
          /* @__PURE__ */ d.jsx("strong", { children: "Explorer" }),
          /* @__PURE__ */ d.jsxs("div", { className: "fub-inline-actions", children: [
            /* @__PURE__ */ d.jsx("button", { type: "button", className: "fub-mini-btn", onClick: z, disabled: O, children: "+ State" }),
            /* @__PURE__ */ d.jsx("button", { type: "button", className: "fub-mini-btn", onClick: w, disabled: O, children: "+ Transition" })
          ] })
        ] }),
        /* @__PURE__ */ d.jsxs("div", { className: "fub-panel-body", children: [
          /* @__PURE__ */ d.jsxs("section", { className: "fub-section", children: [
            /* @__PURE__ */ d.jsx("h3", { children: "States" }),
            /* @__PURE__ */ d.jsx("ul", { children: f.map((N, E) => /* @__PURE__ */ d.jsx("li", { children: /* @__PURE__ */ d.jsxs(
              "button",
              {
                type: "button",
                className: `fub-list-item${Tm(Eg(s, E))}`,
                onClick: () => h({ kind: "state", stateIndex: E }),
                children: [
                  /* @__PURE__ */ d.jsx("span", { className: "fub-item-main", children: N.name || "(unnamed)" }),
                  /* @__PURE__ */ d.jsxs("span", { className: "fub-item-meta", children: [
                    N.initial ? "initial" : "",
                    N.terminal ? " final" : ""
                  ] })
                ]
              }
            ) }, `state-${E}`)) })
          ] }),
          /* @__PURE__ */ d.jsxs("section", { className: "fub-section", children: [
            /* @__PURE__ */ d.jsx("h3", { children: "Transitions" }),
            /* @__PURE__ */ d.jsx("ul", { children: o.map((N, E) => /* @__PURE__ */ d.jsx("li", { children: /* @__PURE__ */ d.jsxs(
              "button",
              {
                type: "button",
                className: `fub-list-item${Tm(Tg(s, E))}`,
                onClick: () => h({ kind: "transition", transitionIndex: E }),
                children: [
                  /* @__PURE__ */ d.jsx("span", { className: "fub-item-main", children: N.id || `transition-${E + 1}` }),
                  /* @__PURE__ */ d.jsx("span", { className: "fub-item-meta", children: Qv(N) })
                ]
              }
            ) }, N.id || `transition-${E}`)) })
          ] })
        ] })
      ]
    }
  );
}
const Ag = new Intl.DateTimeFormat(void 0, {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
});
function Ng(i, f) {
  const o = i?.updatedAt && !Number.isNaN(Date.parse(i.updatedAt)) ? Ag.format(new Date(i.updatedAt)) : void 0;
  return f ? i?.state === "saving" && i.source === "autosave" ? "Unsaved changes (autosaving...)" : i?.state === "saved" && i.source === "autosave" && o ? `Unsaved changes (autosaved ${o})` : i?.state === "error" && i.source === "autosave" ? `Unsaved changes (autosave failed: ${i.message ?? "internal error"})` : "Unsaved changes" : i?.state === "saving" ? "Saving..." : i?.state === "saved" && o ? `Saved ${o}` : i?.state === "error" ? `Save failed: ${i.message ?? "internal error"}` : "";
}
function Nm(i) {
  const f = tt((G) => G.document.definition.name), o = tt((G) => G.isDirty), s = tt((G) => G.diagnostics.length), h = tt((G) => G.setMachineName), z = tt((G) => G.undo), w = tt((G) => G.redo), O = tt((G) => G.historyIndex), N = tt((G) => G.history.length), E = At((G) => G.togglePanel), [p, b] = $.useState(null), D = Ng(i.saveStatus, o), M = i.saveStatus?.state === "error" ? " fub-save-status-error" : i.saveStatus?.state === "saving" ? " fub-save-status-saving" : "", Q = (G, L) => {
    if (!(!L || typeof L != "function"))
      try {
        const V = L();
        V instanceof Promise && (b(G), V.finally(() => {
          b((F) => F === G ? null : F);
        }));
      } catch {
        b((V) => V === G ? null : V);
      }
  }, X = i.authoringAvailable ? "Save Draft" : "Save", Y = !!i.readOnly;
  return /* @__PURE__ */ d.jsxs("header", { className: "fub-header", "aria-label": "Builder header", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "fub-header-left", children: [
      /* @__PURE__ */ d.jsx("strong", { className: "fub-brand", children: "FSM Builder" }),
      /* @__PURE__ */ d.jsxs("label", { className: "fub-machine-name-label", children: [
        /* @__PURE__ */ d.jsx("span", { className: "fub-label", children: "Machine" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            "aria-label": "Machine name",
            className: "fub-input",
            value: f,
            readOnly: Y,
            onChange: (G) => h(G.target.value)
          }
        ),
        o ? /* @__PURE__ */ d.jsx("span", { "aria-label": "Unsaved changes", className: "fub-dirty-dot" }) : null
      ] }),
      /* @__PURE__ */ d.jsx("span", { className: `fub-save-status${M}`, role: "status", "aria-live": "polite", children: D })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: "fub-header-actions", role: "group", "aria-label": "Builder actions", children: [
      /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          className: "fub-btn",
          onClick: z,
          disabled: Y || O === 0 || !!p,
          "aria-keyshortcuts": "Control+Z Meta+Z",
          children: "Undo"
        }
      ),
      /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          className: "fub-btn",
          onClick: w,
          disabled: Y || O >= N - 1 || !!p,
          "aria-keyshortcuts": "Control+Shift+Z Meta+Shift+Z",
          children: "Redo"
        }
      ),
      /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          className: "fub-btn",
          onClick: () => Q("save", i.onSave),
          disabled: Y || !!p,
          "aria-keyshortcuts": "Control+S Meta+S",
          children: p === "save" ? "Saving..." : X
        }
      ),
      /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          className: "fub-btn",
          onClick: () => Q("validate", i.onValidate),
          disabled: Y || !!p,
          "aria-keyshortcuts": "Control+Enter Meta+Enter",
          children: p === "validate" ? "Validating..." : "Validate"
        }
      ),
      /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          className: "fub-btn",
          onClick: () => Q("simulate", i.onSimulate),
          disabled: !i.runtimeAvailable || !!p,
          title: i.runtimeAvailable ? "Run dry-run + snapshot" : "Runtime RPC unavailable",
          children: p === "simulate" ? "Simulating..." : "Simulate"
        }
      ),
      /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          className: "fub-btn",
          onClick: () => Q("recover", i.onRecoverDraft),
          disabled: Y || !i.recoveryAvailable || !!p,
          title: i.recoveryAvailable ? "Recover autosaved draft" : "No autosaved draft",
          children: "Recover Draft"
        }
      ),
      /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          className: "fub-btn",
          onClick: () => Q("export-json", i.onExportJSON),
          disabled: !!p,
          children: "Export JSON"
        }
      ),
      /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          className: "fub-btn",
          onClick: () => Q("export-rpc", i.onExportRPC),
          disabled: !!p,
          title: i.rpcExportAvailable ? "Export via RPC adapter" : "RPC export unavailable",
          children: "Export RPC"
        }
      ),
      /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          className: "fub-btn",
          onClick: () => i.onPanelToggle ? i.onPanelToggle("explorer") : E("explorer"),
          children: "Explorer"
        }
      ),
      /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          className: "fub-btn",
          onClick: () => i.onPanelToggle ? i.onPanelToggle("inspector") : E("inspector"),
          children: "Inspector"
        }
      ),
      /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          className: "fub-btn",
          onClick: () => i.onPanelToggle ? i.onPanelToggle("console") : E("console"),
          "aria-keyshortcuts": "Control+` Meta+`",
          children: "Console"
        }
      ),
      /* @__PURE__ */ d.jsxs("span", { className: "fub-badge", "aria-live": "polite", children: [
        "Problems: ",
        s
      ] })
    ] })
  ] });
}
function Xe(i) {
  return i.messages.length === 0 ? null : /* @__PURE__ */ d.jsx("ul", { className: "fub-inline-diags", role: "alert", children: i.messages.map((f, o) => /* @__PURE__ */ d.jsx("li", { children: f }, `${f}-${o}`)) });
}
function il(i) {
  return i.map((f) => f.message);
}
function Dg(i) {
  return i.dynamic_to ? "dynamic" : "static";
}
function zg(i) {
  return i.kind === "step" ? `step:${i.step?.action_id || "(action_id)"}` : i.kind === "when" ? `when:${i.expr || "(expr)"}` : `${i.kind}: unsupported`;
}
function Og(i) {
  return JSON.stringify(i ?? {}, null, 2);
}
function _g(i) {
  if (i.trim() === "")
    return { value: {} };
  try {
    const f = JSON.parse(i);
    return !f || typeof f != "object" || Array.isArray(f) ? { error: "metadata must be a JSON object" } : { value: f };
  } catch {
    return { error: "metadata must be valid JSON" };
  }
}
function jg(i) {
  const f = $.useMemo(() => Og(i.metadata), [i.metadata]), [o, s] = $.useState(f), [h, z] = $.useState(null);
  $.useEffect(() => {
    s(f), z(null);
  }, [f]);
  const w = () => {
    if (i.readOnly)
      return;
    const O = _g(o);
    if (O.error) {
      z(O.error);
      return;
    }
    z(null), i.onCommit(O.value ?? {});
  };
  return /* @__PURE__ */ d.jsxs("label", { className: "fub-field", children: [
    /* @__PURE__ */ d.jsx("span", { children: "Metadata (JSON object)" }),
    /* @__PURE__ */ d.jsx(
      "textarea",
      {
        "aria-label": "Workflow metadata",
        className: "fub-input fub-textarea",
        value: o,
        readOnly: !!i.readOnly,
        onChange: (O) => s(O.target.value),
        onBlur: w
      }
    ),
    h ? /* @__PURE__ */ d.jsx(Xe, { messages: [h] }) : null
  ] });
}
function Cg(i) {
  const [f, o] = $.useState([]), [s, h] = $.useState(null);
  return $.useEffect(() => {
    let z = !1;
    if (!i) {
      o([]), h("Action catalog unavailable.");
      return;
    }
    return i.listActions().then((w) => {
      z || (o(w), h(w.length === 0 ? "Action catalog is empty." : null));
    }).catch(() => {
      z || (o([]), h("Action catalog unavailable."));
    }), () => {
      z = !0;
    };
  }, [i]), { actions: f, unavailableReason: s };
}
function Dm(i) {
  const f = tt((L) => L.document.definition), o = tt((L) => L.selection), s = tt((L) => L.diagnostics), h = tt((L) => L.removeState), z = tt((L) => L.updateStateName), w = tt((L) => L.updateStateFlag), O = tt((L) => L.removeTransition), N = tt((L) => L.updateTransition), E = tt((L) => L.updateTransitionTargetKind), p = tt((L) => L.addWorkflowNode), b = tt((L) => L.removeWorkflowNode), D = tt((L) => L.selectWorkflowNode), M = tt((L) => L.updateWorkflowNodeField), Q = tt((L) => L.updateWorkflowNodeMetadata), X = Zv(s, o), Y = Cg(i.actionCatalogProvider), G = !!i.readOnly;
  if (o.kind === "state") {
    const L = f.states[o.stateIndex];
    return L ? /* @__PURE__ */ d.jsxs(
      "section",
      {
        className: "fub-panel fub-inspector",
        "aria-label": "Inspector panel",
        role: "region",
        "aria-labelledby": "fub-panel-inspector-heading",
        id: "fub-panel-inspector",
        tabIndex: -1,
        children: [
          /* @__PURE__ */ d.jsxs("div", { className: "fub-panel-header", id: "fub-panel-inspector-heading", children: [
            /* @__PURE__ */ d.jsx("strong", { children: "State" }),
            /* @__PURE__ */ d.jsx(
              "button",
              {
                type: "button",
                className: "fub-mini-btn danger",
                onClick: () => h(o.stateIndex),
                disabled: G,
                children: "Delete"
              }
            )
          ] }),
          /* @__PURE__ */ d.jsxs("div", { className: "fub-panel-body", children: [
            G ? /* @__PURE__ */ d.jsx("p", { className: "fub-readonly-note", children: "Read-only mode: editing is disabled in narrow/mobile layout." }) : null,
            /* @__PURE__ */ d.jsxs("label", { className: "fub-field", children: [
              /* @__PURE__ */ d.jsx("span", { children: "Name" }),
              /* @__PURE__ */ d.jsx(
                "input",
                {
                  "aria-label": "State name",
                  className: "fub-input",
                  value: L.name,
                  readOnly: G,
                  onChange: (V) => z(o.stateIndex, V.target.value)
                }
              ),
              /* @__PURE__ */ d.jsx(
                Xe,
                {
                  messages: il(
                    si(s, o, "name")
                  )
                }
              )
            ] }),
            /* @__PURE__ */ d.jsxs("label", { className: "fub-checkbox-row", children: [
              /* @__PURE__ */ d.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: !!L.initial,
                  disabled: G,
                  onChange: (V) => w(o.stateIndex, "initial", V.target.checked)
                }
              ),
              "Initial"
            ] }),
            /* @__PURE__ */ d.jsxs("label", { className: "fub-checkbox-row", children: [
              /* @__PURE__ */ d.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: !!L.terminal,
                  disabled: G,
                  onChange: (V) => w(o.stateIndex, "terminal", V.target.checked)
                }
              ),
              "Final"
            ] }),
            /* @__PURE__ */ d.jsx(Xe, { messages: il(X) })
          ] })
        ]
      }
    ) : /* @__PURE__ */ d.jsxs(
      "section",
      {
        className: "fub-panel fub-inspector",
        "aria-label": "Inspector panel",
        role: "region",
        "aria-labelledby": "fub-panel-inspector-heading",
        id: "fub-panel-inspector",
        tabIndex: -1,
        children: [
          /* @__PURE__ */ d.jsx("div", { className: "fub-panel-header", id: "fub-panel-inspector-heading", children: /* @__PURE__ */ d.jsx("strong", { children: "Inspector" }) }),
          /* @__PURE__ */ d.jsx("div", { className: "fub-panel-body", children: "State not found." })
        ]
      }
    );
  }
  if (o.kind === "transition") {
    const L = f.transitions[o.transitionIndex];
    if (!L)
      return /* @__PURE__ */ d.jsxs(
        "section",
        {
          className: "fub-panel fub-inspector",
          "aria-label": "Inspector panel",
          role: "region",
          "aria-labelledby": "fub-panel-inspector-heading",
          id: "fub-panel-inspector",
          tabIndex: -1,
          children: [
            /* @__PURE__ */ d.jsx("div", { className: "fub-panel-header", id: "fub-panel-inspector-heading", children: /* @__PURE__ */ d.jsx("strong", { children: "Inspector" }) }),
            /* @__PURE__ */ d.jsx("div", { className: "fub-panel-body", children: "Transition not found." })
          ]
        }
      );
    const V = Dg(L);
    return /* @__PURE__ */ d.jsxs(
      "section",
      {
        className: "fub-panel fub-inspector",
        "aria-label": "Inspector panel",
        role: "region",
        "aria-labelledby": "fub-panel-inspector-heading",
        id: "fub-panel-inspector",
        tabIndex: -1,
        children: [
          /* @__PURE__ */ d.jsxs("div", { className: "fub-panel-header", id: "fub-panel-inspector-heading", children: [
            /* @__PURE__ */ d.jsx("strong", { children: "Transition" }),
            /* @__PURE__ */ d.jsx(
              "button",
              {
                type: "button",
                className: "fub-mini-btn danger",
                onClick: () => O(o.transitionIndex),
                disabled: G,
                children: "Delete"
              }
            )
          ] }),
          /* @__PURE__ */ d.jsxs("div", { className: "fub-panel-body", children: [
            G ? /* @__PURE__ */ d.jsx("p", { className: "fub-readonly-note", children: "Read-only mode: editing is disabled in narrow/mobile layout." }) : null,
            /* @__PURE__ */ d.jsxs("label", { className: "fub-field", children: [
              /* @__PURE__ */ d.jsx("span", { children: "Event" }),
              /* @__PURE__ */ d.jsx(
                "input",
                {
                  "aria-label": "Transition event",
                  className: "fub-input",
                  value: L.event,
                  readOnly: G,
                  onChange: (F) => N(o.transitionIndex, "event", F.target.value)
                }
              ),
              /* @__PURE__ */ d.jsx(
                Xe,
                {
                  messages: il(
                    si(s, o, "event")
                  )
                }
              )
            ] }),
            /* @__PURE__ */ d.jsxs("label", { className: "fub-field", children: [
              /* @__PURE__ */ d.jsx("span", { children: "From" }),
              /* @__PURE__ */ d.jsx(
                "select",
                {
                  "aria-label": "Transition from",
                  className: "fub-input",
                  value: L.from,
                  disabled: G,
                  onChange: (F) => N(o.transitionIndex, "from", F.target.value),
                  children: f.states.map((F, ut) => /* @__PURE__ */ d.jsx("option", { value: F.name, children: F.name }, `${F.name}-${ut}`))
                }
              )
            ] }),
            /* @__PURE__ */ d.jsxs("fieldset", { className: "fub-fieldset", children: [
              /* @__PURE__ */ d.jsx("legend", { children: "Target type" }),
              /* @__PURE__ */ d.jsxs("label", { className: "fub-checkbox-row", children: [
                /* @__PURE__ */ d.jsx(
                  "input",
                  {
                    type: "radio",
                    name: `target-kind-${o.transitionIndex}`,
                    checked: V === "static",
                    disabled: G,
                    onChange: () => E(o.transitionIndex, "static")
                  }
                ),
                "Static"
              ] }),
              /* @__PURE__ */ d.jsxs("label", { className: "fub-checkbox-row", children: [
                /* @__PURE__ */ d.jsx(
                  "input",
                  {
                    type: "radio",
                    name: `target-kind-${o.transitionIndex}`,
                    checked: V === "dynamic",
                    disabled: G,
                    onChange: () => E(o.transitionIndex, "dynamic")
                  }
                ),
                "Dynamic"
              ] })
            ] }),
            V === "static" ? /* @__PURE__ */ d.jsxs("label", { className: "fub-field", children: [
              /* @__PURE__ */ d.jsx("span", { children: "To" }),
              /* @__PURE__ */ d.jsx(
                "select",
                {
                  "aria-label": "Transition target",
                  className: "fub-input",
                  value: L.to ?? "",
                  disabled: G,
                  onChange: (F) => N(o.transitionIndex, "to", F.target.value),
                  children: f.states.map((F, ut) => /* @__PURE__ */ d.jsx("option", { value: F.name, children: F.name }, `${F.name}-target-${ut}`))
                }
              )
            ] }) : /* @__PURE__ */ d.jsxs("label", { className: "fub-field", children: [
              /* @__PURE__ */ d.jsx("span", { children: "Resolver" }),
              /* @__PURE__ */ d.jsx(
                "input",
                {
                  "aria-label": "Dynamic resolver",
                  className: "fub-input",
                  value: L.dynamic_to?.resolver ?? "",
                  readOnly: G,
                  onChange: (F) => N(o.transitionIndex, "dynamic_to.resolver", F.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ d.jsxs("section", { className: "fub-section", children: [
              /* @__PURE__ */ d.jsxs("div", { className: "fub-subheader", children: [
                /* @__PURE__ */ d.jsx("strong", { children: "Workflow" }),
                /* @__PURE__ */ d.jsxs("div", { className: "fub-inline-actions", children: [
                  /* @__PURE__ */ d.jsx(
                    "button",
                    {
                      type: "button",
                      className: "fub-mini-btn",
                      onClick: () => p(o.transitionIndex, "step"),
                      disabled: G,
                      children: "+ Step"
                    }
                  ),
                  /* @__PURE__ */ d.jsx(
                    "button",
                    {
                      type: "button",
                      className: "fub-mini-btn",
                      onClick: () => p(o.transitionIndex, "when"),
                      disabled: G,
                      children: "+ When"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ d.jsx("ul", { children: L.workflow.nodes.map((F, ut) => /* @__PURE__ */ d.jsx("li", { children: /* @__PURE__ */ d.jsxs(
                "button",
                {
                  type: "button",
                  className: "fub-list-item",
                  onClick: () => D(o.transitionIndex, ut),
                  children: [
                    /* @__PURE__ */ d.jsx("span", { children: zg(F) }),
                    pi(F.kind) ? null : /* @__PURE__ */ d.jsx("span", { className: "fub-item-meta", children: "unsupported" })
                  ]
                }
              ) }, F.id || `${F.kind}-${ut}`)) })
            ] }),
            /* @__PURE__ */ d.jsx(Xe, { messages: il(X) })
          ] })
        ]
      }
    );
  }
  if (o.kind === "workflow-node") {
    const L = f.transitions[o.transitionIndex], V = L?.workflow.nodes?.[o.nodeIndex];
    if (!L || !V)
      return /* @__PURE__ */ d.jsxs(
        "section",
        {
          className: "fub-panel fub-inspector",
          "aria-label": "Inspector panel",
          role: "region",
          "aria-labelledby": "fub-panel-inspector-heading",
          id: "fub-panel-inspector",
          tabIndex: -1,
          children: [
            /* @__PURE__ */ d.jsx("div", { className: "fub-panel-header", id: "fub-panel-inspector-heading", children: /* @__PURE__ */ d.jsx("strong", { children: "Inspector" }) }),
            /* @__PURE__ */ d.jsx("div", { className: "fub-panel-body", children: "Workflow node not found." })
          ]
        }
      );
    if (!pi(V.kind))
      return /* @__PURE__ */ d.jsxs(
        "section",
        {
          className: "fub-panel fub-inspector",
          "aria-label": "Inspector panel",
          role: "region",
          "aria-labelledby": "fub-panel-inspector-heading",
          id: "fub-panel-inspector",
          tabIndex: -1,
          children: [
            /* @__PURE__ */ d.jsx("div", { className: "fub-panel-header", id: "fub-panel-inspector-heading", children: /* @__PURE__ */ d.jsx("strong", { children: "Workflow Node" }) }),
            /* @__PURE__ */ d.jsxs("div", { className: "fub-panel-body", children: [
              /* @__PURE__ */ d.jsxs("p", { className: "fub-guardrail", children: [
                "Node kind ",
                /* @__PURE__ */ d.jsx("code", { children: V.kind }),
                " is unsupported in builder v1 and is read-only."
              ] }),
              /* @__PURE__ */ d.jsxs("p", { className: "fub-muted", children: [
                "Unsupported kinds: ",
                Ym.join(", ")
              ] }),
              /* @__PURE__ */ d.jsx(Xe, { messages: il(X) })
            ] })
          ]
        }
      );
    const F = `fub-action-catalog-${o.transitionIndex}-${o.nodeIndex}`;
    return /* @__PURE__ */ d.jsxs(
      "section",
      {
        className: "fub-panel fub-inspector",
        "aria-label": "Inspector panel",
        role: "region",
        "aria-labelledby": "fub-panel-inspector-heading",
        id: "fub-panel-inspector",
        tabIndex: -1,
        children: [
          /* @__PURE__ */ d.jsxs("div", { className: "fub-panel-header", id: "fub-panel-inspector-heading", children: [
            /* @__PURE__ */ d.jsx("strong", { children: "Workflow Node" }),
            /* @__PURE__ */ d.jsx(
              "button",
              {
                type: "button",
                className: "fub-mini-btn danger",
                onClick: () => b(o.transitionIndex, o.nodeIndex),
                disabled: G,
                children: "Delete"
              }
            )
          ] }),
          /* @__PURE__ */ d.jsxs("div", { className: "fub-panel-body", children: [
            G ? /* @__PURE__ */ d.jsx("p", { className: "fub-readonly-note", children: "Read-only mode: editing is disabled in narrow/mobile layout." }) : null,
            /* @__PURE__ */ d.jsxs("div", { className: "fub-muted", children: [
              "Kind: ",
              V.kind
            ] }),
            V.kind === "step" ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
              /* @__PURE__ */ d.jsxs("label", { className: "fub-field", children: [
                /* @__PURE__ */ d.jsx("span", { children: "Action ID" }),
                /* @__PURE__ */ d.jsx(
                  "input",
                  {
                    "aria-label": "Workflow action id",
                    className: "fub-input",
                    list: Y.actions.length > 0 ? F : void 0,
                    value: V.step?.action_id ?? "",
                    readOnly: G,
                    onChange: (ut) => M(o.transitionIndex, o.nodeIndex, "action_id", ut.target.value)
                  }
                ),
                Y.actions.length > 0 ? /* @__PURE__ */ d.jsx("datalist", { id: F, children: Y.actions.map((ut) => /* @__PURE__ */ d.jsx("option", { value: ut.id, children: ut.label ?? ut.id }, ut.id)) }) : null,
                Y.unavailableReason ? /* @__PURE__ */ d.jsx("p", { className: "fub-muted", children: Y.unavailableReason }) : null,
                /* @__PURE__ */ d.jsx(
                  Xe,
                  {
                    messages: il(
                      si(s, o, "action_id")
                    )
                  }
                )
              ] }),
              /* @__PURE__ */ d.jsxs("label", { className: "fub-checkbox-row", children: [
                /* @__PURE__ */ d.jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: !!V.step?.async,
                    disabled: G,
                    onChange: (ut) => M(o.transitionIndex, o.nodeIndex, "async", ut.target.checked)
                  }
                ),
                "Async"
              ] }),
              /* @__PURE__ */ d.jsxs("label", { className: "fub-field", children: [
                /* @__PURE__ */ d.jsx("span", { children: "Delay" }),
                /* @__PURE__ */ d.jsx(
                  "input",
                  {
                    "aria-label": "Workflow delay",
                    className: "fub-input",
                    value: V.step?.delay ?? "",
                    readOnly: G,
                    onChange: (ut) => M(o.transitionIndex, o.nodeIndex, "delay", ut.target.value)
                  }
                )
              ] }),
              /* @__PURE__ */ d.jsxs("label", { className: "fub-field", children: [
                /* @__PURE__ */ d.jsx("span", { children: "Timeout" }),
                /* @__PURE__ */ d.jsx(
                  "input",
                  {
                    "aria-label": "Workflow timeout",
                    className: "fub-input",
                    value: V.step?.timeout ?? "",
                    readOnly: G,
                    onChange: (ut) => M(o.transitionIndex, o.nodeIndex, "timeout", ut.target.value)
                  }
                )
              ] }),
              /* @__PURE__ */ d.jsx(
                jg,
                {
                  metadata: V.step?.metadata,
                  readOnly: G,
                  onCommit: (ut) => Q(o.transitionIndex, o.nodeIndex, ut)
                }
              )
            ] }) : /* @__PURE__ */ d.jsxs("label", { className: "fub-field", children: [
              /* @__PURE__ */ d.jsx("span", { children: "When expression" }),
              /* @__PURE__ */ d.jsx(
                "input",
                {
                  "aria-label": "Workflow when expression",
                  className: "fub-input",
                  value: V.expr ?? "",
                  readOnly: G,
                  onChange: (ut) => M(o.transitionIndex, o.nodeIndex, "expr", ut.target.value)
                }
              ),
              /* @__PURE__ */ d.jsx(
                Xe,
                {
                  messages: il(
                    si(s, o, "expr")
                  )
                }
              )
            ] }),
            /* @__PURE__ */ d.jsx(Xe, { messages: il(X) })
          ] })
        ]
      }
    );
  }
  return /* @__PURE__ */ d.jsxs(
    "section",
    {
      className: "fub-panel fub-inspector",
      "aria-label": "Inspector panel",
      role: "region",
      "aria-labelledby": "fub-panel-inspector-heading",
      id: "fub-panel-inspector",
      tabIndex: -1,
      children: [
        /* @__PURE__ */ d.jsx("div", { className: "fub-panel-header", id: "fub-panel-inspector-heading", children: /* @__PURE__ */ d.jsx("strong", { children: "Inspector" }) }),
        /* @__PURE__ */ d.jsxs("div", { className: "fub-panel-body", children: [
          /* @__PURE__ */ d.jsx("p", { children: "Select a state, transition, or workflow node to edit properties." }),
          /* @__PURE__ */ d.jsx(Xe, { messages: il(X) })
        ] })
      ]
    }
  );
}
const Mg = [
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
function Rg(i, f) {
  if (i.key !== "Tab")
    return;
  const o = Array.from(
    f.querySelectorAll(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
    )
  ).filter((w) => !w.hasAttribute("disabled"));
  if (o.length === 0)
    return;
  const s = o[0], h = o[o.length - 1], z = document.activeElement;
  if (!i.shiftKey && z === h) {
    i.preventDefault(), s.focus();
    return;
  }
  i.shiftKey && z === s && (i.preventDefault(), h.focus());
}
function zm(i) {
  const f = $.useRef(null), o = $.useRef(null), s = $.useMemo(() => Mg, []);
  return $.useEffect(() => {
    if (!i.open)
      return;
    o.current?.focus();
    const h = (z) => {
      if (f.current) {
        if (z.key === "Escape") {
          z.preventDefault(), i.onClose();
          return;
        }
        Rg(z, f.current);
      }
    };
    return window.addEventListener("keydown", h), () => {
      window.removeEventListener("keydown", h);
    };
  }, [i.onClose, i.open]), i.open ? /* @__PURE__ */ d.jsx("div", { className: "fub-modal-overlay", role: "presentation", onClick: i.onClose, children: /* @__PURE__ */ d.jsxs(
    "div",
    {
      ref: f,
      className: "fub-modal",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "fub-keyboard-help-title",
      onClick: (h) => h.stopPropagation(),
      children: [
        /* @__PURE__ */ d.jsxs("header", { className: "fub-modal-header", children: [
          /* @__PURE__ */ d.jsx("h2", { id: "fub-keyboard-help-title", children: "Keyboard Shortcuts" }),
          /* @__PURE__ */ d.jsx(
            "button",
            {
              ref: o,
              type: "button",
              className: "fub-mini-btn",
              onClick: i.onClose,
              "aria-label": "Close keyboard shortcuts",
              children: "Close"
            }
          )
        ] }),
        /* @__PURE__ */ d.jsx("div", { className: "fub-modal-body", children: /* @__PURE__ */ d.jsxs("table", { className: "fub-shortcuts-table", children: [
          /* @__PURE__ */ d.jsx("thead", { children: /* @__PURE__ */ d.jsxs("tr", { children: [
            /* @__PURE__ */ d.jsx("th", { scope: "col", children: "Category" }),
            /* @__PURE__ */ d.jsx("th", { scope: "col", children: "Shortcut" }),
            /* @__PURE__ */ d.jsx("th", { scope: "col", children: "Action" })
          ] }) }),
          /* @__PURE__ */ d.jsx("tbody", { children: s.map((h) => /* @__PURE__ */ d.jsxs("tr", { children: [
            /* @__PURE__ */ d.jsx("td", { children: h.category }),
            /* @__PURE__ */ d.jsx("td", { children: /* @__PURE__ */ d.jsx("code", { children: h.shortcut }) }),
            /* @__PURE__ */ d.jsx("td", { children: h.action })
          ] }, `${h.category}-${h.shortcut}`)) })
        ] }) })
      ]
    }
  ) }) : null;
}
function Ug(i) {
  return i === "explorer" ? "fub-panel-explorer" : i === "canvas" ? "fub-panel-canvas" : i === "inspector" ? "fub-panel-inspector" : "fub-panel-console";
}
function Om(i) {
  return `fub-mobile-tab-${i}`;
}
function _m(i) {
  return `fub-mobile-tabpanel-${i}`;
}
function Hg(i) {
  const f = At((q) => q.explorerWidth), o = At((q) => q.inspectorWidth), s = At((q) => q.consoleHeight), h = At((q) => q.explorerCollapsed), z = At((q) => q.inspectorCollapsed), w = At((q) => q.consoleCollapsed), O = At((q) => q.mobilePanel), N = At((q) => q.keyboardHelpOpen), E = At((q) => q.togglePanel), p = At((q) => q.setPanelCollapsed), b = At((q) => q.setMobilePanel), D = At((q) => q.setKeyboardHelpOpen), M = At((q) => q.toggleKeyboardHelp), Q = tt((q) => q.document.definition), X = tt((q) => q.diagnostics), Y = Me((q) => q.log), G = Me((q) => q.errors), L = Me((q) => q.projectedOutcome), V = $.useMemo(() => Xv(Q), [Q]), F = xg(), ut = F === "mobile-readonly", Bt = kf("explorer"), it = kf("inspector"), qt = kf("console"), Lt = $.useCallback((q) => {
    q && q();
  }, []), Pt = $.useCallback((q) => {
    const ct = () => {
      document.getElementById(Ug(q))?.focus();
    };
    if (typeof window.requestAnimationFrame == "function") {
      window.requestAnimationFrame(ct);
      return;
    }
    window.setTimeout(ct, 0);
  }, []), Vt = $.useCallback(
    (q) => {
      F === "mobile-readonly" ? b(q) : (q === "explorer" && p("explorer", !1), q === "inspector" && p("inspector", !1), q === "console" && p("console", !1)), Pt(q);
    },
    [Pt, b, p, F]
  ), Qt = $.useCallback(
    (q) => {
      F === "mobile-readonly" ? b(q) : E(q), Pt(q);
    },
    [Pt, b, E, F]
  ), te = $.useCallback(() => {
    if (F === "mobile-readonly") {
      b("console");
      return;
    }
    E("console");
  }, [b, E, F]), Ot = $.useCallback(() => {
    D(!1);
  }, [D]);
  pg({
    onSave: () => Lt(i.onSave),
    onValidate: () => Lt(i.onValidate),
    onFocusPanel: Vt,
    onToggleConsole: te,
    keyboardHelpOpen: N,
    onToggleKeyboardHelp: M,
    onCloseKeyboardHelp: Ot,
    readOnly: ut
  }), $.useEffect(() => {
    F === "compact" && p("explorer", !0);
  }, [p, F]);
  const Nt = $.useMemo(() => {
    const q = h ? "0px" : `${f}px`, ct = z ? "0px" : `${o}px`;
    return `${q} ${h ? "0px" : "6px"} minmax(420px,1fr) ${z ? "0px" : "6px"} ${ct}`;
  }, [h, f, z, o]), j = $.useMemo(() => {
    const q = V.length > 0 ? "32px" : "0px", ct = w ? "0px" : `${s}px`;
    return `48px ${q} minmax(360px,1fr) ${w ? "0px" : "6px"} ${ct}`;
  }, [w, s, V.length]), Z = $.useMemo(() => X.length === 0 ? "No diagnostics." : X.length === 1 ? "1 diagnostic in problems panel." : `${X.length} diagnostics in problems panel.`, [X.length]), I = $.useMemo(() => {
    const q = G.at(-1);
    return q ? `Simulation error ${q.code}: ${q.message}` : L ? `Projected ${L.event}: ${L.previousState} to ${L.currentState}.` : Y.at(-1)?.message ?? "Simulation idle.";
  }, [L, G, Y]);
  return F === "mobile-readonly" ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    /* @__PURE__ */ d.jsxs("div", { className: "fub-root fub-root-mobile", children: [
      /* @__PURE__ */ d.jsx("div", { className: "fub-slot-header", children: /* @__PURE__ */ d.jsx(Nm, { ...i, readOnly: !0, onPanelToggle: Qt }) }),
      V.length > 0 ? /* @__PURE__ */ d.jsxs("div", { className: "fub-guardrail-banner", role: "status", "aria-live": "polite", children: [
        "Unsupported workflow nodes are read-only: ",
        V.join(", ")
      ] }) : null,
      /* @__PURE__ */ d.jsx("div", { className: "fub-mobile-warning", role: "status", "aria-live": "polite", children: "Narrow/mobile mode is reduced-capability and read-only. Use desktop width for full authoring." }),
      /* @__PURE__ */ d.jsx("nav", { className: "fub-mobile-tabs", role: "tablist", "aria-label": "Builder panels", children: ["explorer", "canvas", "inspector", "console"].map((q) => /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          role: "tab",
          id: Om(q),
          "aria-controls": _m(q),
          "aria-selected": O === q,
          tabIndex: O === q ? 0 : -1,
          className: `fub-mobile-tab${O === q ? " is-active" : ""}`,
          onClick: () => b(q),
          children: q
        },
        q
      )) }),
      /* @__PURE__ */ d.jsxs(
        "div",
        {
          className: "fub-mobile-panel",
          role: "tabpanel",
          id: _m(O),
          "aria-labelledby": Om(O),
          children: [
            O === "explorer" ? /* @__PURE__ */ d.jsx(Am, { readOnly: !0 }) : null,
            O === "canvas" ? /* @__PURE__ */ d.jsx(xm, { readOnly: !0 }) : null,
            O === "inspector" ? /* @__PURE__ */ d.jsx(Dm, { actionCatalogProvider: i.actionCatalogProvider, readOnly: !0 }) : null,
            O === "console" ? /* @__PURE__ */ d.jsx(Em, {}) : null
          ]
        }
      ),
      /* @__PURE__ */ d.jsx("div", { className: "fub-sr-only", role: "status", "aria-live": "polite", "aria-atomic": "true", children: Z }),
      /* @__PURE__ */ d.jsx("div", { className: "fub-sr-only", role: "status", "aria-live": "polite", "aria-atomic": "true", children: I })
    ] }),
    /* @__PURE__ */ d.jsx(zm, { open: N, onClose: Ot })
  ] }) : /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    /* @__PURE__ */ d.jsxs("div", { className: "fub-root", style: { gridTemplateColumns: Nt, gridTemplateRows: j }, children: [
      /* @__PURE__ */ d.jsx("div", { className: "fub-slot-header", style: { gridColumn: "1 / -1" }, children: /* @__PURE__ */ d.jsx(Nm, { ...i, readOnly: !1, onPanelToggle: Qt }) }),
      V.length > 0 ? /* @__PURE__ */ d.jsxs("div", { className: "fub-guardrail-banner", style: { gridColumn: "1 / -1" }, role: "status", "aria-live": "polite", children: [
        "Unsupported workflow nodes are read-only: ",
        V.join(", ")
      ] }) : null,
      h ? null : /* @__PURE__ */ d.jsx(Am, { readOnly: !1 }),
      h ? null : /* @__PURE__ */ d.jsx(
        "div",
        {
          className: "fub-resizer fub-resizer-vertical",
          role: "separator",
          "aria-label": "Resize explorer",
          onPointerDown: Bt
        }
      ),
      /* @__PURE__ */ d.jsx(xm, { readOnly: !1 }),
      z ? null : /* @__PURE__ */ d.jsx(
        "div",
        {
          className: "fub-resizer fub-resizer-vertical",
          role: "separator",
          "aria-label": "Resize inspector",
          onPointerDown: it
        }
      ),
      z ? null : /* @__PURE__ */ d.jsx(Dm, { actionCatalogProvider: i.actionCatalogProvider, readOnly: !1 }),
      w ? null : /* @__PURE__ */ d.jsx(
        "div",
        {
          className: "fub-resizer fub-resizer-horizontal",
          role: "separator",
          "aria-label": "Resize console",
          onPointerDown: qt,
          style: { gridColumn: "1 / -1" }
        }
      ),
      w ? null : /* @__PURE__ */ d.jsx("div", { className: "fub-slot-console", style: { gridColumn: "1 / -1" }, children: /* @__PURE__ */ d.jsx(Em, {}) }),
      /* @__PURE__ */ d.jsx("div", { className: "fub-sr-only", role: "status", "aria-live": "polite", "aria-atomic": "true", children: Z }),
      /* @__PURE__ */ d.jsx("div", { className: "fub-sr-only", role: "status", "aria-live": "polite", "aria-atomic": "true", children: I })
    ] }),
    /* @__PURE__ */ d.jsx(zm, { open: N, onClose: Ot })
  ] });
}
const Bg = new Set(Object.values(ln));
function $f(i) {
  return typeof i == "string" && Bg.has(i) ? i : ln.internal;
}
function yi(i) {
  return typeof i == "string" && i.trim() !== "" ? i : "internal error";
}
function qg(i) {
  return i && typeof i == "object" && !Array.isArray(i) ? i : null;
}
function Yg(i) {
  return i instanceof Error ? i : null;
}
function vi(i) {
  if (i instanceof qm)
    return {
      code: $f(i.envelope.code),
      message: yi(i.envelope.message),
      method: i.method
    };
  if (i instanceof bi)
    return {
      code: $f(i.code),
      message: yi(i.message),
      method: i.method
    };
  const f = qg(i);
  if (f)
    return {
      code: $f(f.code),
      message: yi(f.message),
      method: typeof f.method == "string" ? f.method : void 0
    };
  const o = Yg(i);
  return o ? {
    code: ln.internal,
    message: yi(o.message)
  } : {
    code: ln.internal,
    message: "internal error"
  };
}
function e0(i) {
  return `${i.method ? `${i.method}: ` : ""}[${i.code}] ${i.message}`;
}
function wg(i) {
  return {
    async applyEventDryRun(f, o) {
      const s = await Rl({
        client: i,
        method: Za.applyEvent,
        data: f,
        meta: o
      });
      return Lm(s);
    },
    async snapshot(f, o) {
      const s = await Rl({
        client: i,
        method: Za.snapshot,
        data: f,
        meta: o
      });
      return Vm(s);
    }
  };
}
function Gg(i) {
  return $.useMemo(() => i ? wg(i) : null, [i]);
}
function Ei(i) {
  return i !== null && typeof i == "object" && !Array.isArray(i);
}
function Xg(i, f, o, s) {
  if (Ei(f)) {
    const h = ["id", "name", "machineId", "event"];
    for (const z of h) {
      const w = f[z];
      if (!(typeof w != "string" || w.trim() === ""))
        for (let O = 0; O < i.length; O += 1) {
          if (s.has(O))
            continue;
          const N = i[O];
          if (Ei(N) && N[z] === w)
            return s.add(O), N;
        }
    }
  }
  if (o < i.length)
    return s.add(o), i[o];
}
function to(i, f) {
  if (Array.isArray(f)) {
    const o = Array.isArray(i) ? i : [], s = /* @__PURE__ */ new Set();
    return f.map((h, z) => to(Xg(o, h, z, s), h));
  }
  if (Ei(f)) {
    const o = Ei(i) ? i : {}, s = {};
    for (const [h, z] of Object.entries(o))
      s[h] = Et(z);
    for (const [h, z] of Object.entries(f))
      s[h] = to(o[h], z);
    return s;
  }
  return Et(f);
}
function eo(i) {
  return Et(i);
}
function Qg(i) {
  return to(i.baseDocument, i.editedDocument);
}
function Zg(i) {
  return `${i}-preview`;
}
function Lg(i) {
  if (i.transitions.length === 0)
    return null;
  if (i.selection.kind === "transition") {
    const o = i.transitions[i.selection.transitionIndex];
    if (o)
      return {
        id: o.id,
        event: o.event,
        from: o.from
      };
  }
  if (i.selection.kind === "workflow-node") {
    const o = i.transitions[i.selection.transitionIndex];
    if (o)
      return {
        id: o.id,
        event: o.event,
        from: o.from
      };
  }
  const f = i.transitions[0];
  return {
    id: f.id,
    event: f.event,
    from: f.from
  };
}
function Vg(i) {
  const f = tt((_) => _.document), o = tt((_) => _.diagnostics), s = tt((_) => _.isDirty), h = tt((_) => _.selection), z = tt((_) => _.replaceDocument), w = tt((_) => _.setDiagnostics), O = tt((_) => _.markSaved), N = tt((_) => _.applyRemoteSave), E = Me((_) => _.setApplyEventWirePayload), p = Me((_) => _.setSnapshotWirePayload), b = Me((_) => _.pushError), D = Me((_) => _.pushInfo), M = Gg(i.rpcClient ?? null), Q = Uv(i.rpcClient ?? null), X = i.runtimeRPC ?? M, Y = i.authoringRPC ?? Q, G = $.useMemo(
    () => i.persistenceStore ?? Fv(),
    [i.persistenceStore]
  ), L = $.useMemo(
    () => i.exportAdapter ?? Yv(),
    [i.exportAdapter]
  ), V = (i.machineId?.trim() || f.definition.id || "machine").trim(), F = i.simulationDefaults?.entityId ?? Zg(V), ut = i.simulationDefaults?.msg ?? {}, Bt = i.simulationDefaults?.meta, it = i.autosaveDebounceMs ?? 400, qt = $.useRef(null);
  qt.current === null && (qt.current = JSON.stringify(f));
  const Lt = $.useRef(eo(f)), [Pt, Vt] = $.useState(null), [Qt, te] = $.useState({ state: "idle" }), Ot = $.useCallback(() => Qg({
    baseDocument: Lt.current,
    editedDocument: f
  }), [f]), Nt = $.useCallback(
    (_) => {
      const B = vi(_);
      b({
        code: B.code,
        message: B.message,
        method: B.method
      });
    },
    [b]
  ), j = $.useCallback((_, B) => {
    const k = vi(B);
    te({
      state: "error",
      source: _,
      message: k.message,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
  }, []);
  $.useEffect(() => {
    i.onChange && i.onChange({
      document: f,
      diagnostics: o,
      isDirty: s
    });
  }, [o, f, s, i]), $.useEffect(() => {
    let _ = !1;
    return G.load(V).then((B) => {
      if (_)
        return;
      if (!B) {
        Vt(null);
        return;
      }
      const k = qt.current ?? "", lt = JSON.stringify(B.document);
      Vt(lt === k ? null : B);
    }).catch((B) => {
      if (_)
        return;
      const k = vi(B);
      b({
        code: k.code,
        message: `autosave recovery failed: ${k.message}`,
        method: k.method
      });
    }), () => {
      _ = !0;
    };
  }, [V, G, b]), $.useEffect(() => {
    if (!s)
      return;
    const _ = window.setTimeout(() => {
      te({
        state: "saving",
        source: "autosave",
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      });
      const B = Ot();
      G.save({
        machineId: V,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
        document: B
      }).then(() => {
        te({
          state: "saved",
          source: "autosave",
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        }), D("Autosaved draft to persistence store.");
      }).catch((k) => {
        j("autosave", k);
        const lt = vi(k);
        b({
          code: lt.code,
          message: `autosave failed: ${lt.message}`,
          method: lt.method
        });
      });
    }, it);
    return () => {
      window.clearTimeout(_);
    };
  }, [
    it,
    Ot,
    s,
    V,
    j,
    G,
    b,
    D
  ]);
  const Z = $.useCallback(async () => {
    if (!X) {
      b({
        code: ln.internal,
        method: Za.applyEvent,
        message: "runtime adapter unavailable"
      });
      return;
    }
    const _ = Lg({
      selection: h,
      transitions: f.definition.transitions
    });
    if (!_) {
      b({
        code: ln.invalidTransition,
        method: Za.applyEvent,
        message: "no transition available for simulation"
      });
      return;
    }
    if (_.event.trim() === "") {
      b({
        code: ln.invalidTransition,
        method: Za.applyEvent,
        message: "selected transition must define an event"
      });
      return;
    }
    try {
      const B = await X.applyEventDryRun(
        {
          machineId: V,
          entityId: F,
          event: _.event,
          msg: ut,
          expectedState: _.from,
          dryRun: !0
        },
        Bt
      );
      E(B, {
        event: _.event,
        transitionId: _.id
      });
      const k = await X.snapshot(
        {
          machineId: V,
          entityId: F,
          msg: ut,
          evaluateGuards: !0,
          includeBlocked: !0
        },
        Bt
      );
      p(k);
    } catch (B) {
      Nt(B);
    }
  }, [
    f.definition.transitions,
    Nt,
    V,
    b,
    X,
    h,
    E,
    p,
    F,
    ut,
    Bt
  ]), I = $.useCallback(async () => {
    const _ = Ot();
    if (!Y) {
      const B = Qm(_.definition);
      w(B), D("Authoring RPC unavailable. Used local validation only.");
      return;
    }
    try {
      const B = await Y.validate({
        machineId: V,
        draft: _
      });
      w(B.diagnostics), D(`Validation completed. valid=${B.valid}`);
    } catch (B) {
      Nt(B);
    }
  }, [Y, Ot, Nt, V, D, w]), q = $.useCallback(async () => {
    te({
      state: "saving",
      source: "manual",
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
    const _ = Ot();
    if (!Y) {
      try {
        await G.save({
          machineId: V,
          updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
          document: Et(_)
        }), O(), Lt.current = Et(_), Vt(null), te({
          state: "saved",
          source: "manual",
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        }), D("Saved locally (authoring RPC unavailable).");
      } catch (B) {
        j("manual", B), Nt(B);
      }
      return;
    }
    try {
      const B = await Y.saveDraft({
        machineId: V,
        baseVersion: _.definition.version,
        draft: _,
        validate: !0
      });
      N(B.version, B.draftState, B.diagnostics);
      const k = {
        ...Et(_),
        definition: {
          ...Et(_.definition),
          version: B.version
        },
        draft_state: Et(B.draftState)
      };
      Lt.current = Et(k), await G.save({
        machineId: V,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
        document: k
      }), Vt(null), te({
        state: "saved",
        source: "manual",
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      }), D("Draft saved through authoring RPC.");
    } catch (B) {
      j("manual", B), Nt(B);
    }
  }, [
    N,
    Y,
    Ot,
    Nt,
    j,
    V,
    O,
    G,
    D
  ]), ct = $.useCallback(async () => {
    if (!Pt) {
      D("No autosaved draft to recover.");
      return;
    }
    const _ = eo(Pt.document);
    z(_), Lt.current = Et(_), Vt(null), D("Recovered autosaved draft.");
  }, [D, Pt, z]), v = $.useCallback(async () => {
    try {
      await L.exportJSON({
        machineId: V,
        draft: Ot()
      }), D("Exported machine definition as JSON.");
    } catch (_) {
      Nt(_);
    }
  }, [Ot, L, Nt, V, D]), H = $.useCallback(async () => {
    if (!L.exportRPC) {
      D("RPC export unavailable. Configure ExportAdapter.exportRPC to enable this capability.");
      return;
    }
    try {
      await L.exportRPC({
        machineId: V,
        draft: Ot()
      }), D("Exported machine definition through RPC adapter.");
    } catch (_) {
      Nt(_);
    }
  }, [Ot, L, Nt, V, D]);
  return /* @__PURE__ */ d.jsx(
    Hg,
    {
      onSave: q,
      onValidate: I,
      onSimulate: Z,
      onRecoverDraft: ct,
      onExportJSON: v,
      onExportRPC: H,
      runtimeAvailable: !!X,
      authoringAvailable: !!Y,
      recoveryAvailable: !!Pt,
      rpcExportAvailable: wv(L),
      actionCatalogProvider: i.actionCatalogProvider,
      saveStatus: Qt
    }
  );
}
function Kg(i) {
  const f = $.useMemo(
    () => eo(i.initialDocument ?? Gm()),
    [i.initialDocument]
  );
  return /* @__PURE__ */ d.jsx(
    gg,
    {
      initialDocument: f,
      initialDiagnostics: i.initialDiagnostics,
      children: /* @__PURE__ */ d.jsx(Vg, { ...i })
    }
  );
}
var Wf = { exports: {} }, Ya = {}, Ff = { exports: {} }, If = {};
var jm;
function Jg() {
  return jm || (jm = 1, (function(i) {
    function f(j, Z) {
      var I = j.length;
      j.push(Z);
      t: for (; 0 < I; ) {
        var q = I - 1 >>> 1, ct = j[q];
        if (0 < h(ct, Z))
          j[q] = Z, j[I] = ct, I = q;
        else break t;
      }
    }
    function o(j) {
      return j.length === 0 ? null : j[0];
    }
    function s(j) {
      if (j.length === 0) return null;
      var Z = j[0], I = j.pop();
      if (I !== Z) {
        j[0] = I;
        t: for (var q = 0, ct = j.length, v = ct >>> 1; q < v; ) {
          var H = 2 * (q + 1) - 1, _ = j[H], B = H + 1, k = j[B];
          if (0 > h(_, I))
            B < ct && 0 > h(k, _) ? (j[q] = k, j[B] = I, q = B) : (j[q] = _, j[H] = I, q = H);
          else if (B < ct && 0 > h(k, I))
            j[q] = k, j[B] = I, q = B;
          else break t;
        }
      }
      return Z;
    }
    function h(j, Z) {
      var I = j.sortIndex - Z.sortIndex;
      return I !== 0 ? I : j.id - Z.id;
    }
    if (i.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var z = performance;
      i.unstable_now = function() {
        return z.now();
      };
    } else {
      var w = Date, O = w.now();
      i.unstable_now = function() {
        return w.now() - O;
      };
    }
    var N = [], E = [], p = 1, b = null, D = 3, M = !1, Q = !1, X = !1, Y = !1, G = typeof setTimeout == "function" ? setTimeout : null, L = typeof clearTimeout == "function" ? clearTimeout : null, V = typeof setImmediate < "u" ? setImmediate : null;
    function F(j) {
      for (var Z = o(E); Z !== null; ) {
        if (Z.callback === null) s(E);
        else if (Z.startTime <= j)
          s(E), Z.sortIndex = Z.expirationTime, f(N, Z);
        else break;
        Z = o(E);
      }
    }
    function ut(j) {
      if (X = !1, F(j), !Q)
        if (o(N) !== null)
          Q = !0, Bt || (Bt = !0, Qt());
        else {
          var Z = o(E);
          Z !== null && Nt(ut, Z.startTime - j);
        }
    }
    var Bt = !1, it = -1, qt = 5, Lt = -1;
    function Pt() {
      return Y ? !0 : !(i.unstable_now() - Lt < qt);
    }
    function Vt() {
      if (Y = !1, Bt) {
        var j = i.unstable_now();
        Lt = j;
        var Z = !0;
        try {
          t: {
            Q = !1, X && (X = !1, L(it), it = -1), M = !0;
            var I = D;
            try {
              e: {
                for (F(j), b = o(N); b !== null && !(b.expirationTime > j && Pt()); ) {
                  var q = b.callback;
                  if (typeof q == "function") {
                    b.callback = null, D = b.priorityLevel;
                    var ct = q(
                      b.expirationTime <= j
                    );
                    if (j = i.unstable_now(), typeof ct == "function") {
                      b.callback = ct, F(j), Z = !0;
                      break e;
                    }
                    b === o(N) && s(N), F(j);
                  } else s(N);
                  b = o(N);
                }
                if (b !== null) Z = !0;
                else {
                  var v = o(E);
                  v !== null && Nt(
                    ut,
                    v.startTime - j
                  ), Z = !1;
                }
              }
              break t;
            } finally {
              b = null, D = I, M = !1;
            }
            Z = void 0;
          }
        } finally {
          Z ? Qt() : Bt = !1;
        }
      }
    }
    var Qt;
    if (typeof V == "function")
      Qt = function() {
        V(Vt);
      };
    else if (typeof MessageChannel < "u") {
      var te = new MessageChannel(), Ot = te.port2;
      te.port1.onmessage = Vt, Qt = function() {
        Ot.postMessage(null);
      };
    } else
      Qt = function() {
        G(Vt, 0);
      };
    function Nt(j, Z) {
      it = G(function() {
        j(i.unstable_now());
      }, Z);
    }
    i.unstable_IdlePriority = 5, i.unstable_ImmediatePriority = 1, i.unstable_LowPriority = 4, i.unstable_NormalPriority = 3, i.unstable_Profiling = null, i.unstable_UserBlockingPriority = 2, i.unstable_cancelCallback = function(j) {
      j.callback = null;
    }, i.unstable_forceFrameRate = function(j) {
      0 > j || 125 < j ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : qt = 0 < j ? Math.floor(1e3 / j) : 5;
    }, i.unstable_getCurrentPriorityLevel = function() {
      return D;
    }, i.unstable_next = function(j) {
      switch (D) {
        case 1:
        case 2:
        case 3:
          var Z = 3;
          break;
        default:
          Z = D;
      }
      var I = D;
      D = Z;
      try {
        return j();
      } finally {
        D = I;
      }
    }, i.unstable_requestPaint = function() {
      Y = !0;
    }, i.unstable_runWithPriority = function(j, Z) {
      switch (j) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          j = 3;
      }
      var I = D;
      D = j;
      try {
        return Z();
      } finally {
        D = I;
      }
    }, i.unstable_scheduleCallback = function(j, Z, I) {
      var q = i.unstable_now();
      switch (typeof I == "object" && I !== null ? (I = I.delay, I = typeof I == "number" && 0 < I ? q + I : q) : I = q, j) {
        case 1:
          var ct = -1;
          break;
        case 2:
          ct = 250;
          break;
        case 5:
          ct = 1073741823;
          break;
        case 4:
          ct = 1e4;
          break;
        default:
          ct = 5e3;
      }
      return ct = I + ct, j = {
        id: p++,
        callback: Z,
        priorityLevel: j,
        startTime: I,
        expirationTime: ct,
        sortIndex: -1
      }, I > q ? (j.sortIndex = I, f(E, j), o(N) === null && j === o(E) && (X ? (L(it), it = -1) : X = !0, Nt(ut, I - q))) : (j.sortIndex = ct, f(N, j), Q || M || (Q = !0, Bt || (Bt = !0, Qt()))), j;
    }, i.unstable_shouldYield = Pt, i.unstable_wrapCallback = function(j) {
      var Z = D;
      return function() {
        var I = D;
        D = Z;
        try {
          return j.apply(this, arguments);
        } finally {
          D = I;
        }
      };
    };
  })(If)), If;
}
var Cm;
function kg() {
  return Cm || (Cm = 1, Ff.exports = Jg()), Ff.exports;
}
var Pf = { exports: {} }, ee = {};
var Mm;
function $g() {
  if (Mm) return ee;
  Mm = 1;
  var i = lo();
  function f(N) {
    var E = "https://react.dev/errors/" + N;
    if (1 < arguments.length) {
      E += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var p = 2; p < arguments.length; p++)
        E += "&args[]=" + encodeURIComponent(arguments[p]);
    }
    return "Minified React error #" + N + "; visit " + E + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function o() {
  }
  var s = {
    d: {
      f: o,
      r: function() {
        throw Error(f(522));
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
  }, h = /* @__PURE__ */ Symbol.for("react.portal");
  function z(N, E, p) {
    var b = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: h,
      key: b == null ? null : "" + b,
      children: N,
      containerInfo: E,
      implementation: p
    };
  }
  var w = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function O(N, E) {
    if (N === "font") return "";
    if (typeof E == "string")
      return E === "use-credentials" ? E : "";
  }
  return ee.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, ee.createPortal = function(N, E) {
    var p = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!E || E.nodeType !== 1 && E.nodeType !== 9 && E.nodeType !== 11)
      throw Error(f(299));
    return z(N, E, null, p);
  }, ee.flushSync = function(N) {
    var E = w.T, p = s.p;
    try {
      if (w.T = null, s.p = 2, N) return N();
    } finally {
      w.T = E, s.p = p, s.d.f();
    }
  }, ee.preconnect = function(N, E) {
    typeof N == "string" && (E ? (E = E.crossOrigin, E = typeof E == "string" ? E === "use-credentials" ? E : "" : void 0) : E = null, s.d.C(N, E));
  }, ee.prefetchDNS = function(N) {
    typeof N == "string" && s.d.D(N);
  }, ee.preinit = function(N, E) {
    if (typeof N == "string" && E && typeof E.as == "string") {
      var p = E.as, b = O(p, E.crossOrigin), D = typeof E.integrity == "string" ? E.integrity : void 0, M = typeof E.fetchPriority == "string" ? E.fetchPriority : void 0;
      p === "style" ? s.d.S(
        N,
        typeof E.precedence == "string" ? E.precedence : void 0,
        {
          crossOrigin: b,
          integrity: D,
          fetchPriority: M
        }
      ) : p === "script" && s.d.X(N, {
        crossOrigin: b,
        integrity: D,
        fetchPriority: M,
        nonce: typeof E.nonce == "string" ? E.nonce : void 0
      });
    }
  }, ee.preinitModule = function(N, E) {
    if (typeof N == "string")
      if (typeof E == "object" && E !== null) {
        if (E.as == null || E.as === "script") {
          var p = O(
            E.as,
            E.crossOrigin
          );
          s.d.M(N, {
            crossOrigin: p,
            integrity: typeof E.integrity == "string" ? E.integrity : void 0,
            nonce: typeof E.nonce == "string" ? E.nonce : void 0
          });
        }
      } else E == null && s.d.M(N);
  }, ee.preload = function(N, E) {
    if (typeof N == "string" && typeof E == "object" && E !== null && typeof E.as == "string") {
      var p = E.as, b = O(p, E.crossOrigin);
      s.d.L(N, p, {
        crossOrigin: b,
        integrity: typeof E.integrity == "string" ? E.integrity : void 0,
        nonce: typeof E.nonce == "string" ? E.nonce : void 0,
        type: typeof E.type == "string" ? E.type : void 0,
        fetchPriority: typeof E.fetchPriority == "string" ? E.fetchPriority : void 0,
        referrerPolicy: typeof E.referrerPolicy == "string" ? E.referrerPolicy : void 0,
        imageSrcSet: typeof E.imageSrcSet == "string" ? E.imageSrcSet : void 0,
        imageSizes: typeof E.imageSizes == "string" ? E.imageSizes : void 0,
        media: typeof E.media == "string" ? E.media : void 0
      });
    }
  }, ee.preloadModule = function(N, E) {
    if (typeof N == "string")
      if (E) {
        var p = O(E.as, E.crossOrigin);
        s.d.m(N, {
          as: typeof E.as == "string" && E.as !== "script" ? E.as : void 0,
          crossOrigin: p,
          integrity: typeof E.integrity == "string" ? E.integrity : void 0
        });
      } else s.d.m(N);
  }, ee.requestFormReset = function(N) {
    s.d.r(N);
  }, ee.unstable_batchedUpdates = function(N, E) {
    return N(E);
  }, ee.useFormState = function(N, E, p) {
    return w.H.useFormState(N, E, p);
  }, ee.useFormStatus = function() {
    return w.H.useHostTransitionStatus();
  }, ee.version = "19.2.4", ee;
}
var Rm;
function Wg() {
  if (Rm) return Pf.exports;
  Rm = 1;
  function i() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i);
      } catch (f) {
        console.error(f);
      }
  }
  return i(), Pf.exports = $g(), Pf.exports;
}
var Um;
function Fg() {
  if (Um) return Ya;
  Um = 1;
  var i = kg(), f = lo(), o = Wg();
  function s(t) {
    var e = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      e += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        e += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function h(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function z(t) {
    var e = t, l = t;
    if (t.alternate) for (; e.return; ) e = e.return;
    else {
      t = e;
      do
        e = t, (e.flags & 4098) !== 0 && (l = e.return), t = e.return;
      while (t);
    }
    return e.tag === 3 ? l : null;
  }
  function w(t) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function O(t) {
    if (t.tag === 31) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function N(t) {
    if (z(t) !== t)
      throw Error(s(188));
  }
  function E(t) {
    var e = t.alternate;
    if (!e) {
      if (e = z(t), e === null) throw Error(s(188));
      return e !== t ? null : t;
    }
    for (var l = t, n = e; ; ) {
      var a = l.return;
      if (a === null) break;
      var u = a.alternate;
      if (u === null) {
        if (n = a.return, n !== null) {
          l = n;
          continue;
        }
        break;
      }
      if (a.child === u.child) {
        for (u = a.child; u; ) {
          if (u === l) return N(a), t;
          if (u === n) return N(a), e;
          u = u.sibling;
        }
        throw Error(s(188));
      }
      if (l.return !== n.return) l = a, n = u;
      else {
        for (var c = !1, r = a.child; r; ) {
          if (r === l) {
            c = !0, l = a, n = u;
            break;
          }
          if (r === n) {
            c = !0, n = a, l = u;
            break;
          }
          r = r.sibling;
        }
        if (!c) {
          for (r = u.child; r; ) {
            if (r === l) {
              c = !0, l = u, n = a;
              break;
            }
            if (r === n) {
              c = !0, n = u, l = a;
              break;
            }
            r = r.sibling;
          }
          if (!c) throw Error(s(189));
        }
      }
      if (l.alternate !== n) throw Error(s(190));
    }
    if (l.tag !== 3) throw Error(s(188));
    return l.stateNode.current === l ? t : e;
  }
  function p(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (e = p(t), e !== null) return e;
      t = t.sibling;
    }
    return null;
  }
  var b = Object.assign, D = /* @__PURE__ */ Symbol.for("react.element"), M = /* @__PURE__ */ Symbol.for("react.transitional.element"), Q = /* @__PURE__ */ Symbol.for("react.portal"), X = /* @__PURE__ */ Symbol.for("react.fragment"), Y = /* @__PURE__ */ Symbol.for("react.strict_mode"), G = /* @__PURE__ */ Symbol.for("react.profiler"), L = /* @__PURE__ */ Symbol.for("react.consumer"), V = /* @__PURE__ */ Symbol.for("react.context"), F = /* @__PURE__ */ Symbol.for("react.forward_ref"), ut = /* @__PURE__ */ Symbol.for("react.suspense"), Bt = /* @__PURE__ */ Symbol.for("react.suspense_list"), it = /* @__PURE__ */ Symbol.for("react.memo"), qt = /* @__PURE__ */ Symbol.for("react.lazy"), Lt = /* @__PURE__ */ Symbol.for("react.activity"), Pt = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), Vt = Symbol.iterator;
  function Qt(t) {
    return t === null || typeof t != "object" ? null : (t = Vt && t[Vt] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var te = /* @__PURE__ */ Symbol.for("react.client.reference");
  function Ot(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === te ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case X:
        return "Fragment";
      case G:
        return "Profiler";
      case Y:
        return "StrictMode";
      case ut:
        return "Suspense";
      case Bt:
        return "SuspenseList";
      case Lt:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case Q:
          return "Portal";
        case V:
          return t.displayName || "Context";
        case L:
          return (t._context.displayName || "Context") + ".Consumer";
        case F:
          var e = t.render;
          return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case it:
          return e = t.displayName || null, e !== null ? e : Ot(t.type) || "Memo";
        case qt:
          e = t._payload, t = t._init;
          try {
            return Ot(t(e));
          } catch {
          }
      }
    return null;
  }
  var Nt = Array.isArray, j = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Z = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, I = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, q = [], ct = -1;
  function v(t) {
    return { current: t };
  }
  function H(t) {
    0 > ct || (t.current = q[ct], q[ct] = null, ct--);
  }
  function _(t, e) {
    ct++, q[ct] = t.current, t.current = e;
  }
  var B = v(null), k = v(null), lt = v(null), vt = v(null);
  function le(t, e) {
    switch (_(lt, e), _(k, t), _(B, null), e.nodeType) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? Cd(t) : 0;
        break;
      default:
        if (t = e.tagName, e = e.namespaceURI)
          e = Cd(e), t = Md(e, t);
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    H(B), _(B, t);
  }
  function Mt() {
    H(B), H(k), H(lt);
  }
  function Ln(t) {
    t.memoizedState !== null && _(vt, t);
    var e = B.current, l = Md(e, t.type);
    e !== l && (_(k, t), _(B, l));
  }
  function Va(t) {
    k.current === t && (H(B), H(k)), vt.current === t && (H(vt), Ra._currentValue = I);
  }
  var Ti, io;
  function Hl(t) {
    if (Ti === void 0)
      try {
        throw Error();
      } catch (l) {
        var e = l.stack.trim().match(/\n( *(at )?)/);
        Ti = e && e[1] || "", io = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Ti + t + io;
  }
  var Ai = !1;
  function Ni(t, e) {
    if (!t || Ai) return "";
    Ai = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var n = {
        DetermineComponentFrameRoot: function() {
          try {
            if (e) {
              var U = function() {
                throw Error();
              };
              if (Object.defineProperty(U.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(U, []);
                } catch (A) {
                  var T = A;
                }
                Reflect.construct(t, [], U);
              } else {
                try {
                  U.call();
                } catch (A) {
                  T = A;
                }
                t.call(U.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (A) {
                T = A;
              }
              (U = t()) && typeof U.catch == "function" && U.catch(function() {
              });
            }
          } catch (A) {
            if (A && T && typeof A.stack == "string")
              return [A.stack, T.stack];
          }
          return [null, null];
        }
      };
      n.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var a = Object.getOwnPropertyDescriptor(
        n.DetermineComponentFrameRoot,
        "name"
      );
      a && a.configurable && Object.defineProperty(
        n.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var u = n.DetermineComponentFrameRoot(), c = u[0], r = u[1];
      if (c && r) {
        var m = c.split(`
`), x = r.split(`
`);
        for (a = n = 0; n < m.length && !m[n].includes("DetermineComponentFrameRoot"); )
          n++;
        for (; a < x.length && !x[a].includes(
          "DetermineComponentFrameRoot"
        ); )
          a++;
        if (n === m.length || a === x.length)
          for (n = m.length - 1, a = x.length - 1; 1 <= n && 0 <= a && m[n] !== x[a]; )
            a--;
        for (; 1 <= n && 0 <= a; n--, a--)
          if (m[n] !== x[a]) {
            if (n !== 1 || a !== 1)
              do
                if (n--, a--, 0 > a || m[n] !== x[a]) {
                  var C = `
` + m[n].replace(" at new ", " at ");
                  return t.displayName && C.includes("<anonymous>") && (C = C.replace("<anonymous>", t.displayName)), C;
                }
              while (1 <= n && 0 <= a);
            break;
          }
      }
    } finally {
      Ai = !1, Error.prepareStackTrace = l;
    }
    return (l = t ? t.displayName || t.name : "") ? Hl(l) : "";
  }
  function Fm(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Hl(t.type);
      case 16:
        return Hl("Lazy");
      case 13:
        return t.child !== e && e !== null ? Hl("Suspense Fallback") : Hl("Suspense");
      case 19:
        return Hl("SuspenseList");
      case 0:
      case 15:
        return Ni(t.type, !1);
      case 11:
        return Ni(t.type.render, !1);
      case 1:
        return Ni(t.type, !0);
      case 31:
        return Hl("Activity");
      default:
        return "";
    }
  }
  function co(t) {
    try {
      var e = "", l = null;
      do
        e += Fm(t, l), l = t, t = t.return;
      while (t);
      return e;
    } catch (n) {
      return `
Error generating stack: ` + n.message + `
` + n.stack;
    }
  }
  var Di = Object.prototype.hasOwnProperty, zi = i.unstable_scheduleCallback, Oi = i.unstable_cancelCallback, Im = i.unstable_shouldYield, Pm = i.unstable_requestPaint, re = i.unstable_now, th = i.unstable_getCurrentPriorityLevel, fo = i.unstable_ImmediatePriority, oo = i.unstable_UserBlockingPriority, Ka = i.unstable_NormalPriority, eh = i.unstable_LowPriority, so = i.unstable_IdlePriority, lh = i.log, nh = i.unstable_setDisableYieldValue, Vn = null, de = null;
  function fl(t) {
    if (typeof lh == "function" && nh(t), de && typeof de.setStrictMode == "function")
      try {
        de.setStrictMode(Vn, t);
      } catch {
      }
  }
  var me = Math.clz32 ? Math.clz32 : ih, ah = Math.log, uh = Math.LN2;
  function ih(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (ah(t) / uh | 0) | 0;
  }
  var Ja = 256, ka = 262144, $a = 4194304;
  function Bl(t) {
    var e = t & 42;
    if (e !== 0) return e;
    switch (t & -t) {
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
        return t & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
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
        return t;
    }
  }
  function Wa(t, e, l) {
    var n = t.pendingLanes;
    if (n === 0) return 0;
    var a = 0, u = t.suspendedLanes, c = t.pingedLanes;
    t = t.warmLanes;
    var r = n & 134217727;
    return r !== 0 ? (n = r & ~u, n !== 0 ? a = Bl(n) : (c &= r, c !== 0 ? a = Bl(c) : l || (l = r & ~t, l !== 0 && (a = Bl(l))))) : (r = n & ~u, r !== 0 ? a = Bl(r) : c !== 0 ? a = Bl(c) : l || (l = n & ~t, l !== 0 && (a = Bl(l)))), a === 0 ? 0 : e !== 0 && e !== a && (e & u) === 0 && (u = a & -a, l = e & -e, u >= l || u === 32 && (l & 4194048) !== 0) ? e : a;
  }
  function Kn(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function ch(t, e) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return e + 250;
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
        return e + 5e3;
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
  function ro() {
    var t = $a;
    return $a <<= 1, ($a & 62914560) === 0 && ($a = 4194304), t;
  }
  function _i(t) {
    for (var e = [], l = 0; 31 > l; l++) e.push(t);
    return e;
  }
  function Jn(t, e) {
    t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function fh(t, e, l, n, a, u) {
    var c = t.pendingLanes;
    t.pendingLanes = l, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= l, t.entangledLanes &= l, t.errorRecoveryDisabledLanes &= l, t.shellSuspendCounter = 0;
    var r = t.entanglements, m = t.expirationTimes, x = t.hiddenUpdates;
    for (l = c & ~l; 0 < l; ) {
      var C = 31 - me(l), U = 1 << C;
      r[C] = 0, m[C] = -1;
      var T = x[C];
      if (T !== null)
        for (x[C] = null, C = 0; C < T.length; C++) {
          var A = T[C];
          A !== null && (A.lane &= -536870913);
        }
      l &= ~U;
    }
    n !== 0 && mo(t, n, 0), u !== 0 && a === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(c & ~e));
  }
  function mo(t, e, l) {
    t.pendingLanes |= e, t.suspendedLanes &= ~e;
    var n = 31 - me(e);
    t.entangledLanes |= e, t.entanglements[n] = t.entanglements[n] | 1073741824 | l & 261930;
  }
  function ho(t, e) {
    var l = t.entangledLanes |= e;
    for (t = t.entanglements; l; ) {
      var n = 31 - me(l), a = 1 << n;
      a & e | t[n] & e && (t[n] |= e), l &= ~a;
    }
  }
  function yo(t, e) {
    var l = e & -e;
    return l = (l & 42) !== 0 ? 1 : ji(l), (l & (t.suspendedLanes | e)) !== 0 ? 0 : l;
  }
  function ji(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
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
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function Ci(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function vo() {
    var t = Z.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : em(t.type));
  }
  function go(t, e) {
    var l = Z.p;
    try {
      return Z.p = t, e();
    } finally {
      Z.p = l;
    }
  }
  var ol = Math.random().toString(36).slice(2), kt = "__reactFiber$" + ol, ae = "__reactProps$" + ol, an = "__reactContainer$" + ol, Mi = "__reactEvents$" + ol, oh = "__reactListeners$" + ol, sh = "__reactHandles$" + ol, bo = "__reactResources$" + ol, kn = "__reactMarker$" + ol;
  function Ri(t) {
    delete t[kt], delete t[ae], delete t[Mi], delete t[oh], delete t[sh];
  }
  function un(t) {
    var e = t[kt];
    if (e) return e;
    for (var l = t.parentNode; l; ) {
      if (e = l[an] || l[kt]) {
        if (l = e.alternate, e.child !== null || l !== null && l.child !== null)
          for (t = wd(t); t !== null; ) {
            if (l = t[kt]) return l;
            t = wd(t);
          }
        return e;
      }
      t = l, l = t.parentNode;
    }
    return null;
  }
  function cn(t) {
    if (t = t[kt] || t[an]) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3)
        return t;
    }
    return null;
  }
  function $n(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(s(33));
  }
  function fn(t) {
    var e = t[bo];
    return e || (e = t[bo] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
  }
  function Kt(t) {
    t[kn] = !0;
  }
  var po = /* @__PURE__ */ new Set(), So = {};
  function ql(t, e) {
    on(t, e), on(t + "Capture", e);
  }
  function on(t, e) {
    for (So[t] = e, t = 0; t < e.length; t++)
      po.add(e[t]);
  }
  var rh = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), xo = {}, Eo = {};
  function dh(t) {
    return Di.call(Eo, t) ? !0 : Di.call(xo, t) ? !1 : rh.test(t) ? Eo[t] = !0 : (xo[t] = !0, !1);
  }
  function Fa(t, e, l) {
    if (dh(e))
      if (l === null) t.removeAttribute(e);
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(e);
            return;
          case "boolean":
            var n = e.toLowerCase().slice(0, 5);
            if (n !== "data-" && n !== "aria-") {
              t.removeAttribute(e);
              return;
            }
        }
        t.setAttribute(e, "" + l);
      }
  }
  function Ia(t, e, l) {
    if (l === null) t.removeAttribute(e);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(e);
          return;
      }
      t.setAttribute(e, "" + l);
    }
  }
  function Qe(t, e, l, n) {
    if (n === null) t.removeAttribute(l);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(l);
          return;
      }
      t.setAttributeNS(e, l, "" + n);
    }
  }
  function Ee(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function To(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
  }
  function mh(t, e, l) {
    var n = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      e
    );
    if (!t.hasOwnProperty(e) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
      var a = n.get, u = n.set;
      return Object.defineProperty(t, e, {
        configurable: !0,
        get: function() {
          return a.call(this);
        },
        set: function(c) {
          l = "" + c, u.call(this, c);
        }
      }), Object.defineProperty(t, e, {
        enumerable: n.enumerable
      }), {
        getValue: function() {
          return l;
        },
        setValue: function(c) {
          l = "" + c;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[e];
        }
      };
    }
  }
  function Ui(t) {
    if (!t._valueTracker) {
      var e = To(t) ? "checked" : "value";
      t._valueTracker = mh(
        t,
        e,
        "" + t[e]
      );
    }
  }
  function Ao(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var l = e.getValue(), n = "";
    return t && (n = To(t) ? t.checked ? "true" : "false" : t.value), t = n, t !== l ? (e.setValue(t), !0) : !1;
  }
  function Pa(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var hh = /[\n"\\]/g;
  function Te(t) {
    return t.replace(
      hh,
      function(e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Hi(t, e, l, n, a, u, c, r) {
    t.name = "", c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? t.type = c : t.removeAttribute("type"), e != null ? c === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + Ee(e)) : t.value !== "" + Ee(e) && (t.value = "" + Ee(e)) : c !== "submit" && c !== "reset" || t.removeAttribute("value"), e != null ? Bi(t, c, Ee(e)) : l != null ? Bi(t, c, Ee(l)) : n != null && t.removeAttribute("value"), a == null && u != null && (t.defaultChecked = !!u), a != null && (t.checked = a && typeof a != "function" && typeof a != "symbol"), r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" ? t.name = "" + Ee(r) : t.removeAttribute("name");
  }
  function No(t, e, l, n, a, u, c, r) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (t.type = u), e != null || l != null) {
      if (!(u !== "submit" && u !== "reset" || e != null)) {
        Ui(t);
        return;
      }
      l = l != null ? "" + Ee(l) : "", e = e != null ? "" + Ee(e) : l, r || e === t.value || (t.value = e), t.defaultValue = e;
    }
    n = n ?? a, n = typeof n != "function" && typeof n != "symbol" && !!n, t.checked = r ? t.checked : !!n, t.defaultChecked = !!n, c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (t.name = c), Ui(t);
  }
  function Bi(t, e, l) {
    e === "number" && Pa(t.ownerDocument) === t || t.defaultValue === "" + l || (t.defaultValue = "" + l);
  }
  function sn(t, e, l, n) {
    if (t = t.options, e) {
      e = {};
      for (var a = 0; a < l.length; a++)
        e["$" + l[a]] = !0;
      for (l = 0; l < t.length; l++)
        a = e.hasOwnProperty("$" + t[l].value), t[l].selected !== a && (t[l].selected = a), a && n && (t[l].defaultSelected = !0);
    } else {
      for (l = "" + Ee(l), e = null, a = 0; a < t.length; a++) {
        if (t[a].value === l) {
          t[a].selected = !0, n && (t[a].defaultSelected = !0);
          return;
        }
        e !== null || t[a].disabled || (e = t[a]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function Do(t, e, l) {
    if (e != null && (e = "" + Ee(e), e !== t.value && (t.value = e), l == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = l != null ? "" + Ee(l) : "";
  }
  function zo(t, e, l, n) {
    if (e == null) {
      if (n != null) {
        if (l != null) throw Error(s(92));
        if (Nt(n)) {
          if (1 < n.length) throw Error(s(93));
          n = n[0];
        }
        l = n;
      }
      l == null && (l = ""), e = l;
    }
    l = Ee(e), t.defaultValue = l, n = t.textContent, n === l && n !== "" && n !== null && (t.value = n), Ui(t);
  }
  function rn(t, e) {
    if (e) {
      var l = t.firstChild;
      if (l && l === t.lastChild && l.nodeType === 3) {
        l.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var yh = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Oo(t, e, l) {
    var n = e.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? n ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : n ? t.setProperty(e, l) : typeof l != "number" || l === 0 || yh.has(e) ? e === "float" ? t.cssFloat = l : t[e] = ("" + l).trim() : t[e] = l + "px";
  }
  function _o(t, e, l) {
    if (e != null && typeof e != "object")
      throw Error(s(62));
    if (t = t.style, l != null) {
      for (var n in l)
        !l.hasOwnProperty(n) || e != null && e.hasOwnProperty(n) || (n.indexOf("--") === 0 ? t.setProperty(n, "") : n === "float" ? t.cssFloat = "" : t[n] = "");
      for (var a in e)
        n = e[a], e.hasOwnProperty(a) && l[a] !== n && Oo(t, a, n);
    } else
      for (var u in e)
        e.hasOwnProperty(u) && Oo(t, u, e[u]);
  }
  function qi(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
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
  var vh = /* @__PURE__ */ new Map([
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
  ]), gh = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function tu(t) {
    return gh.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function Ze() {
  }
  var Yi = null;
  function wi(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var dn = null, mn = null;
  function jo(t) {
    var e = cn(t);
    if (e && (t = e.stateNode)) {
      var l = t[ae] || null;
      t: switch (t = e.stateNode, e.type) {
        case "input":
          if (Hi(
            t,
            l.value,
            l.defaultValue,
            l.defaultValue,
            l.checked,
            l.defaultChecked,
            l.type,
            l.name
          ), e = l.name, l.type === "radio" && e != null) {
            for (l = t; l.parentNode; ) l = l.parentNode;
            for (l = l.querySelectorAll(
              'input[name="' + Te(
                "" + e
              ) + '"][type="radio"]'
            ), e = 0; e < l.length; e++) {
              var n = l[e];
              if (n !== t && n.form === t.form) {
                var a = n[ae] || null;
                if (!a) throw Error(s(90));
                Hi(
                  n,
                  a.value,
                  a.defaultValue,
                  a.defaultValue,
                  a.checked,
                  a.defaultChecked,
                  a.type,
                  a.name
                );
              }
            }
            for (e = 0; e < l.length; e++)
              n = l[e], n.form === t.form && Ao(n);
          }
          break t;
        case "textarea":
          Do(t, l.value, l.defaultValue);
          break t;
        case "select":
          e = l.value, e != null && sn(t, !!l.multiple, e, !1);
      }
    }
  }
  var Gi = !1;
  function Co(t, e, l) {
    if (Gi) return t(e, l);
    Gi = !0;
    try {
      var n = t(e);
      return n;
    } finally {
      if (Gi = !1, (dn !== null || mn !== null) && (Xu(), dn && (e = dn, t = mn, mn = dn = null, jo(e), t)))
        for (e = 0; e < t.length; e++) jo(t[e]);
    }
  }
  function Wn(t, e) {
    var l = t.stateNode;
    if (l === null) return null;
    var n = l[ae] || null;
    if (n === null) return null;
    l = n[e];
    t: switch (e) {
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
        (n = !n.disabled) || (t = t.type, n = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !n;
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (l && typeof l != "function")
      throw Error(
        s(231, e, typeof l)
      );
    return l;
  }
  var Le = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Xi = !1;
  if (Le)
    try {
      var Fn = {};
      Object.defineProperty(Fn, "passive", {
        get: function() {
          Xi = !0;
        }
      }), window.addEventListener("test", Fn, Fn), window.removeEventListener("test", Fn, Fn);
    } catch {
      Xi = !1;
    }
  var sl = null, Qi = null, eu = null;
  function Mo() {
    if (eu) return eu;
    var t, e = Qi, l = e.length, n, a = "value" in sl ? sl.value : sl.textContent, u = a.length;
    for (t = 0; t < l && e[t] === a[t]; t++) ;
    var c = l - t;
    for (n = 1; n <= c && e[l - n] === a[u - n]; n++) ;
    return eu = a.slice(t, 1 < n ? 1 - n : void 0);
  }
  function lu(t) {
    var e = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function nu() {
    return !0;
  }
  function Ro() {
    return !1;
  }
  function ue(t) {
    function e(l, n, a, u, c) {
      this._reactName = l, this._targetInst = a, this.type = n, this.nativeEvent = u, this.target = c, this.currentTarget = null;
      for (var r in t)
        t.hasOwnProperty(r) && (l = t[r], this[r] = l ? l(u) : u[r]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? nu : Ro, this.isPropagationStopped = Ro, this;
    }
    return b(e.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = nu);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = nu);
      },
      persist: function() {
      },
      isPersistent: nu
    }), e;
  }
  var Yl = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, au = ue(Yl), In = b({}, Yl, { view: 0, detail: 0 }), bh = ue(In), Zi, Li, Pn, uu = b({}, In, {
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
    getModifierState: Ki,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== Pn && (Pn && t.type === "mousemove" ? (Zi = t.screenX - Pn.screenX, Li = t.screenY - Pn.screenY) : Li = Zi = 0, Pn = t), Zi);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : Li;
    }
  }), Uo = ue(uu), ph = b({}, uu, { dataTransfer: 0 }), Sh = ue(ph), xh = b({}, In, { relatedTarget: 0 }), Vi = ue(xh), Eh = b({}, Yl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Th = ue(Eh), Ah = b({}, Yl, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), Nh = ue(Ah), Dh = b({}, Yl, { data: 0 }), Ho = ue(Dh), zh = {
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
  }, Oh = {
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
  }, _h = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function jh(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = _h[t]) ? !!e[t] : !1;
  }
  function Ki() {
    return jh;
  }
  var Ch = b({}, In, {
    key: function(t) {
      if (t.key) {
        var e = zh[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress" ? (t = lu(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? Oh[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Ki,
    charCode: function(t) {
      return t.type === "keypress" ? lu(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? lu(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), Mh = ue(Ch), Rh = b({}, uu, {
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
  }), Bo = ue(Rh), Uh = b({}, In, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Ki
  }), Hh = ue(Uh), Bh = b({}, Yl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), qh = ue(Bh), Yh = b({}, uu, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), wh = ue(Yh), Gh = b({}, Yl, {
    newState: 0,
    oldState: 0
  }), Xh = ue(Gh), Qh = [9, 13, 27, 32], Ji = Le && "CompositionEvent" in window, ta = null;
  Le && "documentMode" in document && (ta = document.documentMode);
  var Zh = Le && "TextEvent" in window && !ta, qo = Le && (!Ji || ta && 8 < ta && 11 >= ta), Yo = " ", wo = !1;
  function Go(t, e) {
    switch (t) {
      case "keyup":
        return Qh.indexOf(e.keyCode) !== -1;
      case "keydown":
        return e.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Xo(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var hn = !1;
  function Lh(t, e) {
    switch (t) {
      case "compositionend":
        return Xo(e);
      case "keypress":
        return e.which !== 32 ? null : (wo = !0, Yo);
      case "textInput":
        return t = e.data, t === Yo && wo ? null : t;
      default:
        return null;
    }
  }
  function Vh(t, e) {
    if (hn)
      return t === "compositionend" || !Ji && Go(t, e) ? (t = Mo(), eu = Qi = sl = null, hn = !1, t) : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(e.ctrlKey || e.altKey || e.metaKey) || e.ctrlKey && e.altKey) {
          if (e.char && 1 < e.char.length)
            return e.char;
          if (e.which) return String.fromCharCode(e.which);
        }
        return null;
      case "compositionend":
        return qo && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var Kh = {
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
  function Qo(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!Kh[t.type] : e === "textarea";
  }
  function Zo(t, e, l, n) {
    dn ? mn ? mn.push(n) : mn = [n] : dn = n, e = ku(e, "onChange"), 0 < e.length && (l = new au(
      "onChange",
      "change",
      null,
      l,
      n
    ), t.push({ event: l, listeners: e }));
  }
  var ea = null, la = null;
  function Jh(t) {
    Nd(t, 0);
  }
  function iu(t) {
    var e = $n(t);
    if (Ao(e)) return t;
  }
  function Lo(t, e) {
    if (t === "change") return e;
  }
  var Vo = !1;
  if (Le) {
    var ki;
    if (Le) {
      var $i = "oninput" in document;
      if (!$i) {
        var Ko = document.createElement("div");
        Ko.setAttribute("oninput", "return;"), $i = typeof Ko.oninput == "function";
      }
      ki = $i;
    } else ki = !1;
    Vo = ki && (!document.documentMode || 9 < document.documentMode);
  }
  function Jo() {
    ea && (ea.detachEvent("onpropertychange", ko), la = ea = null);
  }
  function ko(t) {
    if (t.propertyName === "value" && iu(la)) {
      var e = [];
      Zo(
        e,
        la,
        t,
        wi(t)
      ), Co(Jh, e);
    }
  }
  function kh(t, e, l) {
    t === "focusin" ? (Jo(), ea = e, la = l, ea.attachEvent("onpropertychange", ko)) : t === "focusout" && Jo();
  }
  function $h(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return iu(la);
  }
  function Wh(t, e) {
    if (t === "click") return iu(e);
  }
  function Fh(t, e) {
    if (t === "input" || t === "change")
      return iu(e);
  }
  function Ih(t, e) {
    return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
  }
  var he = typeof Object.is == "function" ? Object.is : Ih;
  function na(t, e) {
    if (he(t, e)) return !0;
    if (typeof t != "object" || t === null || typeof e != "object" || e === null)
      return !1;
    var l = Object.keys(t), n = Object.keys(e);
    if (l.length !== n.length) return !1;
    for (n = 0; n < l.length; n++) {
      var a = l[n];
      if (!Di.call(e, a) || !he(t[a], e[a]))
        return !1;
    }
    return !0;
  }
  function $o(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Wo(t, e) {
    var l = $o(t);
    t = 0;
    for (var n; l; ) {
      if (l.nodeType === 3) {
        if (n = t + l.textContent.length, t <= e && n >= e)
          return { node: l, offset: e - t };
        t = n;
      }
      t: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break t;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = $o(l);
    }
  }
  function Fo(t, e) {
    return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? Fo(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
  }
  function Io(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var e = Pa(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var l = typeof e.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) t = e.contentWindow;
      else break;
      e = Pa(t.document);
    }
    return e;
  }
  function Wi(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
  }
  var Ph = Le && "documentMode" in document && 11 >= document.documentMode, yn = null, Fi = null, aa = null, Ii = !1;
  function Po(t, e, l) {
    var n = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Ii || yn == null || yn !== Pa(n) || (n = yn, "selectionStart" in n && Wi(n) ? n = { start: n.selectionStart, end: n.selectionEnd } : (n = (n.ownerDocument && n.ownerDocument.defaultView || window).getSelection(), n = {
      anchorNode: n.anchorNode,
      anchorOffset: n.anchorOffset,
      focusNode: n.focusNode,
      focusOffset: n.focusOffset
    }), aa && na(aa, n) || (aa = n, n = ku(Fi, "onSelect"), 0 < n.length && (e = new au(
      "onSelect",
      "select",
      null,
      e,
      l
    ), t.push({ event: e, listeners: n }), e.target = yn)));
  }
  function wl(t, e) {
    var l = {};
    return l[t.toLowerCase()] = e.toLowerCase(), l["Webkit" + t] = "webkit" + e, l["Moz" + t] = "moz" + e, l;
  }
  var vn = {
    animationend: wl("Animation", "AnimationEnd"),
    animationiteration: wl("Animation", "AnimationIteration"),
    animationstart: wl("Animation", "AnimationStart"),
    transitionrun: wl("Transition", "TransitionRun"),
    transitionstart: wl("Transition", "TransitionStart"),
    transitioncancel: wl("Transition", "TransitionCancel"),
    transitionend: wl("Transition", "TransitionEnd")
  }, Pi = {}, ts = {};
  Le && (ts = document.createElement("div").style, "AnimationEvent" in window || (delete vn.animationend.animation, delete vn.animationiteration.animation, delete vn.animationstart.animation), "TransitionEvent" in window || delete vn.transitionend.transition);
  function Gl(t) {
    if (Pi[t]) return Pi[t];
    if (!vn[t]) return t;
    var e = vn[t], l;
    for (l in e)
      if (e.hasOwnProperty(l) && l in ts)
        return Pi[t] = e[l];
    return t;
  }
  var es = Gl("animationend"), ls = Gl("animationiteration"), ns = Gl("animationstart"), ty = Gl("transitionrun"), ey = Gl("transitionstart"), ly = Gl("transitioncancel"), as = Gl("transitionend"), us = /* @__PURE__ */ new Map(), tc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  tc.push("scrollEnd");
  function Ue(t, e) {
    us.set(t, e), ql(e, [t]);
  }
  var cu = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var e = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(e)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  }, Ae = [], gn = 0, ec = 0;
  function fu() {
    for (var t = gn, e = ec = gn = 0; e < t; ) {
      var l = Ae[e];
      Ae[e++] = null;
      var n = Ae[e];
      Ae[e++] = null;
      var a = Ae[e];
      Ae[e++] = null;
      var u = Ae[e];
      if (Ae[e++] = null, n !== null && a !== null) {
        var c = n.pending;
        c === null ? a.next = a : (a.next = c.next, c.next = a), n.pending = a;
      }
      u !== 0 && is(l, a, u);
    }
  }
  function ou(t, e, l, n) {
    Ae[gn++] = t, Ae[gn++] = e, Ae[gn++] = l, Ae[gn++] = n, ec |= n, t.lanes |= n, t = t.alternate, t !== null && (t.lanes |= n);
  }
  function lc(t, e, l, n) {
    return ou(t, e, l, n), su(t);
  }
  function Xl(t, e) {
    return ou(t, null, null, e), su(t);
  }
  function is(t, e, l) {
    t.lanes |= l;
    var n = t.alternate;
    n !== null && (n.lanes |= l);
    for (var a = !1, u = t.return; u !== null; )
      u.childLanes |= l, n = u.alternate, n !== null && (n.childLanes |= l), u.tag === 22 && (t = u.stateNode, t === null || t._visibility & 1 || (a = !0)), t = u, u = u.return;
    return t.tag === 3 ? (u = t.stateNode, a && e !== null && (a = 31 - me(l), t = u.hiddenUpdates, n = t[a], n === null ? t[a] = [e] : n.push(e), e.lane = l | 536870912), u) : null;
  }
  function su(t) {
    if (50 < Da)
      throw Da = 0, df = null, Error(s(185));
    for (var e = t.return; e !== null; )
      t = e, e = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var bn = {};
  function ny(t, e, l, n) {
    this.tag = t, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = n, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function ye(t, e, l, n) {
    return new ny(t, e, l, n);
  }
  function nc(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Ve(t, e) {
    var l = t.alternate;
    return l === null ? (l = ye(
      t.tag,
      e,
      t.key,
      t.mode
    ), l.elementType = t.elementType, l.type = t.type, l.stateNode = t.stateNode, l.alternate = t, t.alternate = l) : (l.pendingProps = e, l.type = t.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = t.flags & 65011712, l.childLanes = t.childLanes, l.lanes = t.lanes, l.child = t.child, l.memoizedProps = t.memoizedProps, l.memoizedState = t.memoizedState, l.updateQueue = t.updateQueue, e = t.dependencies, l.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, l.sibling = t.sibling, l.index = t.index, l.ref = t.ref, l.refCleanup = t.refCleanup, l;
  }
  function cs(t, e) {
    t.flags &= 65011714;
    var l = t.alternate;
    return l === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = l.childLanes, t.lanes = l.lanes, t.child = l.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = l.memoizedProps, t.memoizedState = l.memoizedState, t.updateQueue = l.updateQueue, t.type = l.type, e = l.dependencies, t.dependencies = e === null ? null : {
      lanes: e.lanes,
      firstContext: e.firstContext
    }), t;
  }
  function ru(t, e, l, n, a, u) {
    var c = 0;
    if (n = t, typeof t == "function") nc(t) && (c = 1);
    else if (typeof t == "string")
      c = fv(
        t,
        l,
        B.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case Lt:
          return t = ye(31, l, e, a), t.elementType = Lt, t.lanes = u, t;
        case X:
          return Ql(l.children, a, u, e);
        case Y:
          c = 8, a |= 24;
          break;
        case G:
          return t = ye(12, l, e, a | 2), t.elementType = G, t.lanes = u, t;
        case ut:
          return t = ye(13, l, e, a), t.elementType = ut, t.lanes = u, t;
        case Bt:
          return t = ye(19, l, e, a), t.elementType = Bt, t.lanes = u, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case V:
                c = 10;
                break t;
              case L:
                c = 9;
                break t;
              case F:
                c = 11;
                break t;
              case it:
                c = 14;
                break t;
              case qt:
                c = 16, n = null;
                break t;
            }
          c = 29, l = Error(
            s(130, t === null ? "null" : typeof t, "")
          ), n = null;
      }
    return e = ye(c, l, e, a), e.elementType = t, e.type = n, e.lanes = u, e;
  }
  function Ql(t, e, l, n) {
    return t = ye(7, t, n, e), t.lanes = l, t;
  }
  function ac(t, e, l) {
    return t = ye(6, t, null, e), t.lanes = l, t;
  }
  function fs(t) {
    var e = ye(18, null, null, 0);
    return e.stateNode = t, e;
  }
  function uc(t, e, l) {
    return e = ye(
      4,
      t.children !== null ? t.children : [],
      t.key,
      e
    ), e.lanes = l, e.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, e;
  }
  var os = /* @__PURE__ */ new WeakMap();
  function Ne(t, e) {
    if (typeof t == "object" && t !== null) {
      var l = os.get(t);
      return l !== void 0 ? l : (e = {
        value: t,
        source: e,
        stack: co(e)
      }, os.set(t, e), e);
    }
    return {
      value: t,
      source: e,
      stack: co(e)
    };
  }
  var pn = [], Sn = 0, du = null, ua = 0, De = [], ze = 0, rl = null, qe = 1, Ye = "";
  function Ke(t, e) {
    pn[Sn++] = ua, pn[Sn++] = du, du = t, ua = e;
  }
  function ss(t, e, l) {
    De[ze++] = qe, De[ze++] = Ye, De[ze++] = rl, rl = t;
    var n = qe;
    t = Ye;
    var a = 32 - me(n) - 1;
    n &= ~(1 << a), l += 1;
    var u = 32 - me(e) + a;
    if (30 < u) {
      var c = a - a % 5;
      u = (n & (1 << c) - 1).toString(32), n >>= c, a -= c, qe = 1 << 32 - me(e) + a | l << a | n, Ye = u + t;
    } else
      qe = 1 << u | l << a | n, Ye = t;
  }
  function ic(t) {
    t.return !== null && (Ke(t, 1), ss(t, 1, 0));
  }
  function cc(t) {
    for (; t === du; )
      du = pn[--Sn], pn[Sn] = null, ua = pn[--Sn], pn[Sn] = null;
    for (; t === rl; )
      rl = De[--ze], De[ze] = null, Ye = De[--ze], De[ze] = null, qe = De[--ze], De[ze] = null;
  }
  function rs(t, e) {
    De[ze++] = qe, De[ze++] = Ye, De[ze++] = rl, qe = e.id, Ye = e.overflow, rl = t;
  }
  var $t = null, Dt = null, dt = !1, dl = null, Oe = !1, fc = Error(s(519));
  function ml(t) {
    var e = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw ia(Ne(e, t)), fc;
  }
  function ds(t) {
    var e = t.stateNode, l = t.type, n = t.memoizedProps;
    switch (e[kt] = t, e[ae] = n, l) {
      case "dialog":
        ot("cancel", e), ot("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        ot("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Oa.length; l++)
          ot(Oa[l], e);
        break;
      case "source":
        ot("error", e);
        break;
      case "img":
      case "image":
      case "link":
        ot("error", e), ot("load", e);
        break;
      case "details":
        ot("toggle", e);
        break;
      case "input":
        ot("invalid", e), No(
          e,
          n.value,
          n.defaultValue,
          n.checked,
          n.defaultChecked,
          n.type,
          n.name,
          !0
        );
        break;
      case "select":
        ot("invalid", e);
        break;
      case "textarea":
        ot("invalid", e), zo(e, n.value, n.defaultValue, n.children);
    }
    l = n.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || e.textContent === "" + l || n.suppressHydrationWarning === !0 || _d(e.textContent, l) ? (n.popover != null && (ot("beforetoggle", e), ot("toggle", e)), n.onScroll != null && ot("scroll", e), n.onScrollEnd != null && ot("scrollend", e), n.onClick != null && (e.onclick = Ze), e = !0) : e = !1, e || ml(t, !0);
  }
  function ms(t) {
    for ($t = t.return; $t; )
      switch ($t.tag) {
        case 5:
        case 31:
        case 13:
          Oe = !1;
          return;
        case 27:
        case 3:
          Oe = !0;
          return;
        default:
          $t = $t.return;
      }
  }
  function xn(t) {
    if (t !== $t) return !1;
    if (!dt) return ms(t), dt = !0, !1;
    var e = t.tag, l;
    if ((l = e !== 3 && e !== 27) && ((l = e === 5) && (l = t.type, l = !(l !== "form" && l !== "button") || zf(t.type, t.memoizedProps)), l = !l), l && Dt && ml(t), ms(t), e === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      Dt = Yd(t);
    } else if (e === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      Dt = Yd(t);
    } else
      e === 27 ? (e = Dt, zl(t.type) ? (t = Mf, Mf = null, Dt = t) : Dt = e) : Dt = $t ? je(t.stateNode.nextSibling) : null;
    return !0;
  }
  function Zl() {
    Dt = $t = null, dt = !1;
  }
  function oc() {
    var t = dl;
    return t !== null && (oe === null ? oe = t : oe.push.apply(
      oe,
      t
    ), dl = null), t;
  }
  function ia(t) {
    dl === null ? dl = [t] : dl.push(t);
  }
  var sc = v(null), Ll = null, Je = null;
  function hl(t, e, l) {
    _(sc, e._currentValue), e._currentValue = l;
  }
  function ke(t) {
    t._currentValue = sc.current, H(sc);
  }
  function rc(t, e, l) {
    for (; t !== null; ) {
      var n = t.alternate;
      if ((t.childLanes & e) !== e ? (t.childLanes |= e, n !== null && (n.childLanes |= e)) : n !== null && (n.childLanes & e) !== e && (n.childLanes |= e), t === l) break;
      t = t.return;
    }
  }
  function dc(t, e, l, n) {
    var a = t.child;
    for (a !== null && (a.return = t); a !== null; ) {
      var u = a.dependencies;
      if (u !== null) {
        var c = a.child;
        u = u.firstContext;
        t: for (; u !== null; ) {
          var r = u;
          u = a;
          for (var m = 0; m < e.length; m++)
            if (r.context === e[m]) {
              u.lanes |= l, r = u.alternate, r !== null && (r.lanes |= l), rc(
                u.return,
                l,
                t
              ), n || (c = null);
              break t;
            }
          u = r.next;
        }
      } else if (a.tag === 18) {
        if (c = a.return, c === null) throw Error(s(341));
        c.lanes |= l, u = c.alternate, u !== null && (u.lanes |= l), rc(c, l, t), c = null;
      } else c = a.child;
      if (c !== null) c.return = a;
      else
        for (c = a; c !== null; ) {
          if (c === t) {
            c = null;
            break;
          }
          if (a = c.sibling, a !== null) {
            a.return = c.return, c = a;
            break;
          }
          c = c.return;
        }
      a = c;
    }
  }
  function En(t, e, l, n) {
    t = null;
    for (var a = e, u = !1; a !== null; ) {
      if (!u) {
        if ((a.flags & 524288) !== 0) u = !0;
        else if ((a.flags & 262144) !== 0) break;
      }
      if (a.tag === 10) {
        var c = a.alternate;
        if (c === null) throw Error(s(387));
        if (c = c.memoizedProps, c !== null) {
          var r = a.type;
          he(a.pendingProps.value, c.value) || (t !== null ? t.push(r) : t = [r]);
        }
      } else if (a === vt.current) {
        if (c = a.alternate, c === null) throw Error(s(387));
        c.memoizedState.memoizedState !== a.memoizedState.memoizedState && (t !== null ? t.push(Ra) : t = [Ra]);
      }
      a = a.return;
    }
    t !== null && dc(
      e,
      t,
      l,
      n
    ), e.flags |= 262144;
  }
  function mu(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!he(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function Vl(t) {
    Ll = t, Je = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function Wt(t) {
    return hs(Ll, t);
  }
  function hu(t, e) {
    return Ll === null && Vl(t), hs(t, e);
  }
  function hs(t, e) {
    var l = e._currentValue;
    if (e = { context: e, memoizedValue: l, next: null }, Je === null) {
      if (t === null) throw Error(s(308));
      Je = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
    } else Je = Je.next = e;
    return l;
  }
  var ay = typeof AbortController < "u" ? AbortController : function() {
    var t = [], e = this.signal = {
      aborted: !1,
      addEventListener: function(l, n) {
        t.push(n);
      }
    };
    this.abort = function() {
      e.aborted = !0, t.forEach(function(l) {
        return l();
      });
    };
  }, uy = i.unstable_scheduleCallback, iy = i.unstable_NormalPriority, Yt = {
    $$typeof: V,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function mc() {
    return {
      controller: new ay(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function ca(t) {
    t.refCount--, t.refCount === 0 && uy(iy, function() {
      t.controller.abort();
    });
  }
  var fa = null, hc = 0, Tn = 0, An = null;
  function cy(t, e) {
    if (fa === null) {
      var l = fa = [];
      hc = 0, Tn = bf(), An = {
        status: "pending",
        value: void 0,
        then: function(n) {
          l.push(n);
        }
      };
    }
    return hc++, e.then(ys, ys), e;
  }
  function ys() {
    if (--hc === 0 && fa !== null) {
      An !== null && (An.status = "fulfilled");
      var t = fa;
      fa = null, Tn = 0, An = null;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function fy(t, e) {
    var l = [], n = {
      status: "pending",
      value: null,
      reason: null,
      then: function(a) {
        l.push(a);
      }
    };
    return t.then(
      function() {
        n.status = "fulfilled", n.value = e;
        for (var a = 0; a < l.length; a++) (0, l[a])(e);
      },
      function(a) {
        for (n.status = "rejected", n.reason = a, a = 0; a < l.length; a++)
          (0, l[a])(void 0);
      }
    ), n;
  }
  var vs = j.S;
  j.S = function(t, e) {
    Pr = re(), typeof e == "object" && e !== null && typeof e.then == "function" && cy(t, e), vs !== null && vs(t, e);
  };
  var Kl = v(null);
  function yc() {
    var t = Kl.current;
    return t !== null ? t : Tt.pooledCache;
  }
  function yu(t, e) {
    e === null ? _(Kl, Kl.current) : _(Kl, e.pool);
  }
  function gs() {
    var t = yc();
    return t === null ? null : { parent: Yt._currentValue, pool: t };
  }
  var Nn = Error(s(460)), vc = Error(s(474)), vu = Error(s(542)), gu = { then: function() {
  } };
  function bs(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function ps(t, e, l) {
    switch (l = t[l], l === void 0 ? t.push(e) : l !== e && (e.then(Ze, Ze), e = l), e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw t = e.reason, xs(t), t;
      default:
        if (typeof e.status == "string") e.then(Ze, Ze);
        else {
          if (t = Tt, t !== null && 100 < t.shellSuspendCounter)
            throw Error(s(482));
          t = e, t.status = "pending", t.then(
            function(n) {
              if (e.status === "pending") {
                var a = e;
                a.status = "fulfilled", a.value = n;
              }
            },
            function(n) {
              if (e.status === "pending") {
                var a = e;
                a.status = "rejected", a.reason = n;
              }
            }
          );
        }
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw t = e.reason, xs(t), t;
        }
        throw kl = e, Nn;
    }
  }
  function Jl(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (kl = l, Nn) : l;
    }
  }
  var kl = null;
  function Ss() {
    if (kl === null) throw Error(s(459));
    var t = kl;
    return kl = null, t;
  }
  function xs(t) {
    if (t === Nn || t === vu)
      throw Error(s(483));
  }
  var Dn = null, oa = 0;
  function bu(t) {
    var e = oa;
    return oa += 1, Dn === null && (Dn = []), ps(Dn, t, e);
  }
  function sa(t, e) {
    e = e.props.ref, t.ref = e !== void 0 ? e : null;
  }
  function pu(t, e) {
    throw e.$$typeof === D ? Error(s(525)) : (t = Object.prototype.toString.call(e), Error(
      s(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t
      )
    ));
  }
  function Es(t) {
    function e(g, y) {
      if (t) {
        var S = g.deletions;
        S === null ? (g.deletions = [y], g.flags |= 16) : S.push(y);
      }
    }
    function l(g, y) {
      if (!t) return null;
      for (; y !== null; )
        e(g, y), y = y.sibling;
      return null;
    }
    function n(g) {
      for (var y = /* @__PURE__ */ new Map(); g !== null; )
        g.key !== null ? y.set(g.key, g) : y.set(g.index, g), g = g.sibling;
      return y;
    }
    function a(g, y) {
      return g = Ve(g, y), g.index = 0, g.sibling = null, g;
    }
    function u(g, y, S) {
      return g.index = S, t ? (S = g.alternate, S !== null ? (S = S.index, S < y ? (g.flags |= 67108866, y) : S) : (g.flags |= 67108866, y)) : (g.flags |= 1048576, y);
    }
    function c(g) {
      return t && g.alternate === null && (g.flags |= 67108866), g;
    }
    function r(g, y, S, R) {
      return y === null || y.tag !== 6 ? (y = ac(S, g.mode, R), y.return = g, y) : (y = a(y, S), y.return = g, y);
    }
    function m(g, y, S, R) {
      var W = S.type;
      return W === X ? C(
        g,
        y,
        S.props.children,
        R,
        S.key
      ) : y !== null && (y.elementType === W || typeof W == "object" && W !== null && W.$$typeof === qt && Jl(W) === y.type) ? (y = a(y, S.props), sa(y, S), y.return = g, y) : (y = ru(
        S.type,
        S.key,
        S.props,
        null,
        g.mode,
        R
      ), sa(y, S), y.return = g, y);
    }
    function x(g, y, S, R) {
      return y === null || y.tag !== 4 || y.stateNode.containerInfo !== S.containerInfo || y.stateNode.implementation !== S.implementation ? (y = uc(S, g.mode, R), y.return = g, y) : (y = a(y, S.children || []), y.return = g, y);
    }
    function C(g, y, S, R, W) {
      return y === null || y.tag !== 7 ? (y = Ql(
        S,
        g.mode,
        R,
        W
      ), y.return = g, y) : (y = a(y, S), y.return = g, y);
    }
    function U(g, y, S) {
      if (typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint")
        return y = ac(
          "" + y,
          g.mode,
          S
        ), y.return = g, y;
      if (typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case M:
            return S = ru(
              y.type,
              y.key,
              y.props,
              null,
              g.mode,
              S
            ), sa(S, y), S.return = g, S;
          case Q:
            return y = uc(
              y,
              g.mode,
              S
            ), y.return = g, y;
          case qt:
            return y = Jl(y), U(g, y, S);
        }
        if (Nt(y) || Qt(y))
          return y = Ql(
            y,
            g.mode,
            S,
            null
          ), y.return = g, y;
        if (typeof y.then == "function")
          return U(g, bu(y), S);
        if (y.$$typeof === V)
          return U(
            g,
            hu(g, y),
            S
          );
        pu(g, y);
      }
      return null;
    }
    function T(g, y, S, R) {
      var W = y !== null ? y.key : null;
      if (typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint")
        return W !== null ? null : r(g, y, "" + S, R);
      if (typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case M:
            return S.key === W ? m(g, y, S, R) : null;
          case Q:
            return S.key === W ? x(g, y, S, R) : null;
          case qt:
            return S = Jl(S), T(g, y, S, R);
        }
        if (Nt(S) || Qt(S))
          return W !== null ? null : C(g, y, S, R, null);
        if (typeof S.then == "function")
          return T(
            g,
            y,
            bu(S),
            R
          );
        if (S.$$typeof === V)
          return T(
            g,
            y,
            hu(g, S),
            R
          );
        pu(g, S);
      }
      return null;
    }
    function A(g, y, S, R, W) {
      if (typeof R == "string" && R !== "" || typeof R == "number" || typeof R == "bigint")
        return g = g.get(S) || null, r(y, g, "" + R, W);
      if (typeof R == "object" && R !== null) {
        switch (R.$$typeof) {
          case M:
            return g = g.get(
              R.key === null ? S : R.key
            ) || null, m(y, g, R, W);
          case Q:
            return g = g.get(
              R.key === null ? S : R.key
            ) || null, x(y, g, R, W);
          case qt:
            return R = Jl(R), A(
              g,
              y,
              S,
              R,
              W
            );
        }
        if (Nt(R) || Qt(R))
          return g = g.get(S) || null, C(y, g, R, W, null);
        if (typeof R.then == "function")
          return A(
            g,
            y,
            S,
            bu(R),
            W
          );
        if (R.$$typeof === V)
          return A(
            g,
            y,
            S,
            hu(y, R),
            W
          );
        pu(y, R);
      }
      return null;
    }
    function K(g, y, S, R) {
      for (var W = null, mt = null, J = y, at = y = 0, rt = null; J !== null && at < S.length; at++) {
        J.index > at ? (rt = J, J = null) : rt = J.sibling;
        var ht = T(
          g,
          J,
          S[at],
          R
        );
        if (ht === null) {
          J === null && (J = rt);
          break;
        }
        t && J && ht.alternate === null && e(g, J), y = u(ht, y, at), mt === null ? W = ht : mt.sibling = ht, mt = ht, J = rt;
      }
      if (at === S.length)
        return l(g, J), dt && Ke(g, at), W;
      if (J === null) {
        for (; at < S.length; at++)
          J = U(g, S[at], R), J !== null && (y = u(
            J,
            y,
            at
          ), mt === null ? W = J : mt.sibling = J, mt = J);
        return dt && Ke(g, at), W;
      }
      for (J = n(J); at < S.length; at++)
        rt = A(
          J,
          g,
          at,
          S[at],
          R
        ), rt !== null && (t && rt.alternate !== null && J.delete(
          rt.key === null ? at : rt.key
        ), y = u(
          rt,
          y,
          at
        ), mt === null ? W = rt : mt.sibling = rt, mt = rt);
      return t && J.forEach(function(Ml) {
        return e(g, Ml);
      }), dt && Ke(g, at), W;
    }
    function P(g, y, S, R) {
      if (S == null) throw Error(s(151));
      for (var W = null, mt = null, J = y, at = y = 0, rt = null, ht = S.next(); J !== null && !ht.done; at++, ht = S.next()) {
        J.index > at ? (rt = J, J = null) : rt = J.sibling;
        var Ml = T(g, J, ht.value, R);
        if (Ml === null) {
          J === null && (J = rt);
          break;
        }
        t && J && Ml.alternate === null && e(g, J), y = u(Ml, y, at), mt === null ? W = Ml : mt.sibling = Ml, mt = Ml, J = rt;
      }
      if (ht.done)
        return l(g, J), dt && Ke(g, at), W;
      if (J === null) {
        for (; !ht.done; at++, ht = S.next())
          ht = U(g, ht.value, R), ht !== null && (y = u(ht, y, at), mt === null ? W = ht : mt.sibling = ht, mt = ht);
        return dt && Ke(g, at), W;
      }
      for (J = n(J); !ht.done; at++, ht = S.next())
        ht = A(J, g, at, ht.value, R), ht !== null && (t && ht.alternate !== null && J.delete(ht.key === null ? at : ht.key), y = u(ht, y, at), mt === null ? W = ht : mt.sibling = ht, mt = ht);
      return t && J.forEach(function(pv) {
        return e(g, pv);
      }), dt && Ke(g, at), W;
    }
    function xt(g, y, S, R) {
      if (typeof S == "object" && S !== null && S.type === X && S.key === null && (S = S.props.children), typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case M:
            t: {
              for (var W = S.key; y !== null; ) {
                if (y.key === W) {
                  if (W = S.type, W === X) {
                    if (y.tag === 7) {
                      l(
                        g,
                        y.sibling
                      ), R = a(
                        y,
                        S.props.children
                      ), R.return = g, g = R;
                      break t;
                    }
                  } else if (y.elementType === W || typeof W == "object" && W !== null && W.$$typeof === qt && Jl(W) === y.type) {
                    l(
                      g,
                      y.sibling
                    ), R = a(y, S.props), sa(R, S), R.return = g, g = R;
                    break t;
                  }
                  l(g, y);
                  break;
                } else e(g, y);
                y = y.sibling;
              }
              S.type === X ? (R = Ql(
                S.props.children,
                g.mode,
                R,
                S.key
              ), R.return = g, g = R) : (R = ru(
                S.type,
                S.key,
                S.props,
                null,
                g.mode,
                R
              ), sa(R, S), R.return = g, g = R);
            }
            return c(g);
          case Q:
            t: {
              for (W = S.key; y !== null; ) {
                if (y.key === W)
                  if (y.tag === 4 && y.stateNode.containerInfo === S.containerInfo && y.stateNode.implementation === S.implementation) {
                    l(
                      g,
                      y.sibling
                    ), R = a(y, S.children || []), R.return = g, g = R;
                    break t;
                  } else {
                    l(g, y);
                    break;
                  }
                else e(g, y);
                y = y.sibling;
              }
              R = uc(S, g.mode, R), R.return = g, g = R;
            }
            return c(g);
          case qt:
            return S = Jl(S), xt(
              g,
              y,
              S,
              R
            );
        }
        if (Nt(S))
          return K(
            g,
            y,
            S,
            R
          );
        if (Qt(S)) {
          if (W = Qt(S), typeof W != "function") throw Error(s(150));
          return S = W.call(S), P(
            g,
            y,
            S,
            R
          );
        }
        if (typeof S.then == "function")
          return xt(
            g,
            y,
            bu(S),
            R
          );
        if (S.$$typeof === V)
          return xt(
            g,
            y,
            hu(g, S),
            R
          );
        pu(g, S);
      }
      return typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint" ? (S = "" + S, y !== null && y.tag === 6 ? (l(g, y.sibling), R = a(y, S), R.return = g, g = R) : (l(g, y), R = ac(S, g.mode, R), R.return = g, g = R), c(g)) : l(g, y);
    }
    return function(g, y, S, R) {
      try {
        oa = 0;
        var W = xt(
          g,
          y,
          S,
          R
        );
        return Dn = null, W;
      } catch (J) {
        if (J === Nn || J === vu) throw J;
        var mt = ye(29, J, null, g.mode);
        return mt.lanes = R, mt.return = g, mt;
      }
    };
  }
  var $l = Es(!0), Ts = Es(!1), yl = !1;
  function gc(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function bc(t, e) {
    t = t.updateQueue, e.updateQueue === t && (e.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function vl(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function gl(t, e, l) {
    var n = t.updateQueue;
    if (n === null) return null;
    if (n = n.shared, (yt & 2) !== 0) {
      var a = n.pending;
      return a === null ? e.next = e : (e.next = a.next, a.next = e), n.pending = e, e = su(t), is(t, null, l), e;
    }
    return ou(t, n, e, l), su(t);
  }
  function ra(t, e, l) {
    if (e = e.updateQueue, e !== null && (e = e.shared, (l & 4194048) !== 0)) {
      var n = e.lanes;
      n &= t.pendingLanes, l |= n, e.lanes = l, ho(t, l);
    }
  }
  function pc(t, e) {
    var l = t.updateQueue, n = t.alternate;
    if (n !== null && (n = n.updateQueue, l === n)) {
      var a = null, u = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var c = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null
          };
          u === null ? a = u = c : u = u.next = c, l = l.next;
        } while (l !== null);
        u === null ? a = u = e : u = u.next = e;
      } else a = u = e;
      l = {
        baseState: n.baseState,
        firstBaseUpdate: a,
        lastBaseUpdate: u,
        shared: n.shared,
        callbacks: n.callbacks
      }, t.updateQueue = l;
      return;
    }
    t = l.lastBaseUpdate, t === null ? l.firstBaseUpdate = e : t.next = e, l.lastBaseUpdate = e;
  }
  var Sc = !1;
  function da() {
    if (Sc) {
      var t = An;
      if (t !== null) throw t;
    }
  }
  function ma(t, e, l, n) {
    Sc = !1;
    var a = t.updateQueue;
    yl = !1;
    var u = a.firstBaseUpdate, c = a.lastBaseUpdate, r = a.shared.pending;
    if (r !== null) {
      a.shared.pending = null;
      var m = r, x = m.next;
      m.next = null, c === null ? u = x : c.next = x, c = m;
      var C = t.alternate;
      C !== null && (C = C.updateQueue, r = C.lastBaseUpdate, r !== c && (r === null ? C.firstBaseUpdate = x : r.next = x, C.lastBaseUpdate = m));
    }
    if (u !== null) {
      var U = a.baseState;
      c = 0, C = x = m = null, r = u;
      do {
        var T = r.lane & -536870913, A = T !== r.lane;
        if (A ? (st & T) === T : (n & T) === T) {
          T !== 0 && T === Tn && (Sc = !0), C !== null && (C = C.next = {
            lane: 0,
            tag: r.tag,
            payload: r.payload,
            callback: null,
            next: null
          });
          t: {
            var K = t, P = r;
            T = e;
            var xt = l;
            switch (P.tag) {
              case 1:
                if (K = P.payload, typeof K == "function") {
                  U = K.call(xt, U, T);
                  break t;
                }
                U = K;
                break t;
              case 3:
                K.flags = K.flags & -65537 | 128;
              case 0:
                if (K = P.payload, T = typeof K == "function" ? K.call(xt, U, T) : K, T == null) break t;
                U = b({}, U, T);
                break t;
              case 2:
                yl = !0;
            }
          }
          T = r.callback, T !== null && (t.flags |= 64, A && (t.flags |= 8192), A = a.callbacks, A === null ? a.callbacks = [T] : A.push(T));
        } else
          A = {
            lane: T,
            tag: r.tag,
            payload: r.payload,
            callback: r.callback,
            next: null
          }, C === null ? (x = C = A, m = U) : C = C.next = A, c |= T;
        if (r = r.next, r === null) {
          if (r = a.shared.pending, r === null)
            break;
          A = r, r = A.next, A.next = null, a.lastBaseUpdate = A, a.shared.pending = null;
        }
      } while (!0);
      C === null && (m = U), a.baseState = m, a.firstBaseUpdate = x, a.lastBaseUpdate = C, u === null && (a.shared.lanes = 0), El |= c, t.lanes = c, t.memoizedState = U;
    }
  }
  function As(t, e) {
    if (typeof t != "function")
      throw Error(s(191, t));
    t.call(e);
  }
  function Ns(t, e) {
    var l = t.callbacks;
    if (l !== null)
      for (t.callbacks = null, t = 0; t < l.length; t++)
        As(l[t], e);
  }
  var zn = v(null), Su = v(0);
  function Ds(t, e) {
    t = nl, _(Su, t), _(zn, e), nl = t | e.baseLanes;
  }
  function xc() {
    _(Su, nl), _(zn, zn.current);
  }
  function Ec() {
    nl = Su.current, H(zn), H(Su);
  }
  var ve = v(null), _e = null;
  function bl(t) {
    var e = t.alternate;
    _(Rt, Rt.current & 1), _(ve, t), _e === null && (e === null || zn.current !== null || e.memoizedState !== null) && (_e = t);
  }
  function Tc(t) {
    _(Rt, Rt.current), _(ve, t), _e === null && (_e = t);
  }
  function zs(t) {
    t.tag === 22 ? (_(Rt, Rt.current), _(ve, t), _e === null && (_e = t)) : pl();
  }
  function pl() {
    _(Rt, Rt.current), _(ve, ve.current);
  }
  function ge(t) {
    H(ve), _e === t && (_e = null), H(Rt);
  }
  var Rt = v(0);
  function xu(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var l = e.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || jf(l) || Cf(l)))
          return e;
      } else if (e.tag === 19 && (e.memoizedProps.revealOrder === "forwards" || e.memoizedProps.revealOrder === "backwards" || e.memoizedProps.revealOrder === "unstable_legacy-backwards" || e.memoizedProps.revealOrder === "together")) {
        if ((e.flags & 128) !== 0) return e;
      } else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return null;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    return null;
  }
  var $e = 0, nt = null, pt = null, wt = null, Eu = !1, On = !1, Wl = !1, Tu = 0, ha = 0, _n = null, oy = 0;
  function jt() {
    throw Error(s(321));
  }
  function Ac(t, e) {
    if (e === null) return !1;
    for (var l = 0; l < e.length && l < t.length; l++)
      if (!he(t[l], e[l])) return !1;
    return !0;
  }
  function Nc(t, e, l, n, a, u) {
    return $e = u, nt = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, j.H = t === null || t.memoizedState === null ? sr : Gc, Wl = !1, u = l(n, a), Wl = !1, On && (u = _s(
      e,
      l,
      n,
      a
    )), Os(t), u;
  }
  function Os(t) {
    j.H = ga;
    var e = pt !== null && pt.next !== null;
    if ($e = 0, wt = pt = nt = null, Eu = !1, ha = 0, _n = null, e) throw Error(s(300));
    t === null || Gt || (t = t.dependencies, t !== null && mu(t) && (Gt = !0));
  }
  function _s(t, e, l, n) {
    nt = t;
    var a = 0;
    do {
      if (On && (_n = null), ha = 0, On = !1, 25 <= a) throw Error(s(301));
      if (a += 1, wt = pt = null, t.updateQueue != null) {
        var u = t.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      j.H = rr, u = e(l, n);
    } while (On);
    return u;
  }
  function sy() {
    var t = j.H, e = t.useState()[0];
    return e = typeof e.then == "function" ? ya(e) : e, t = t.useState()[0], (pt !== null ? pt.memoizedState : null) !== t && (nt.flags |= 1024), e;
  }
  function Dc() {
    var t = Tu !== 0;
    return Tu = 0, t;
  }
  function zc(t, e, l) {
    e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~l;
  }
  function Oc(t) {
    if (Eu) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), t = t.next;
      }
      Eu = !1;
    }
    $e = 0, wt = pt = nt = null, On = !1, ha = Tu = 0, _n = null;
  }
  function ne() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return wt === null ? nt.memoizedState = wt = t : wt = wt.next = t, wt;
  }
  function Ut() {
    if (pt === null) {
      var t = nt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = pt.next;
    var e = wt === null ? nt.memoizedState : wt.next;
    if (e !== null)
      wt = e, pt = t;
    else {
      if (t === null)
        throw nt.alternate === null ? Error(s(467)) : Error(s(310));
      pt = t, t = {
        memoizedState: pt.memoizedState,
        baseState: pt.baseState,
        baseQueue: pt.baseQueue,
        queue: pt.queue,
        next: null
      }, wt === null ? nt.memoizedState = wt = t : wt = wt.next = t;
    }
    return wt;
  }
  function Au() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function ya(t) {
    var e = ha;
    return ha += 1, _n === null && (_n = []), t = ps(_n, t, e), e = nt, (wt === null ? e.memoizedState : wt.next) === null && (e = e.alternate, j.H = e === null || e.memoizedState === null ? sr : Gc), t;
  }
  function Nu(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return ya(t);
      if (t.$$typeof === V) return Wt(t);
    }
    throw Error(s(438, String(t)));
  }
  function _c(t) {
    var e = null, l = nt.updateQueue;
    if (l !== null && (e = l.memoCache), e == null) {
      var n = nt.alternate;
      n !== null && (n = n.updateQueue, n !== null && (n = n.memoCache, n != null && (e = {
        data: n.data.map(function(a) {
          return a.slice();
        }),
        index: 0
      })));
    }
    if (e == null && (e = { data: [], index: 0 }), l === null && (l = Au(), nt.updateQueue = l), l.memoCache = e, l = e.data[e.index], l === void 0)
      for (l = e.data[e.index] = Array(t), n = 0; n < t; n++)
        l[n] = Pt;
    return e.index++, l;
  }
  function We(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function Du(t) {
    var e = Ut();
    return jc(e, pt, t);
  }
  function jc(t, e, l) {
    var n = t.queue;
    if (n === null) throw Error(s(311));
    n.lastRenderedReducer = l;
    var a = t.baseQueue, u = n.pending;
    if (u !== null) {
      if (a !== null) {
        var c = a.next;
        a.next = u.next, u.next = c;
      }
      e.baseQueue = a = u, n.pending = null;
    }
    if (u = t.baseState, a === null) t.memoizedState = u;
    else {
      e = a.next;
      var r = c = null, m = null, x = e, C = !1;
      do {
        var U = x.lane & -536870913;
        if (U !== x.lane ? (st & U) === U : ($e & U) === U) {
          var T = x.revertLane;
          if (T === 0)
            m !== null && (m = m.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: x.action,
              hasEagerState: x.hasEagerState,
              eagerState: x.eagerState,
              next: null
            }), U === Tn && (C = !0);
          else if (($e & T) === T) {
            x = x.next, T === Tn && (C = !0);
            continue;
          } else
            U = {
              lane: 0,
              revertLane: x.revertLane,
              gesture: null,
              action: x.action,
              hasEagerState: x.hasEagerState,
              eagerState: x.eagerState,
              next: null
            }, m === null ? (r = m = U, c = u) : m = m.next = U, nt.lanes |= T, El |= T;
          U = x.action, Wl && l(u, U), u = x.hasEagerState ? x.eagerState : l(u, U);
        } else
          T = {
            lane: U,
            revertLane: x.revertLane,
            gesture: x.gesture,
            action: x.action,
            hasEagerState: x.hasEagerState,
            eagerState: x.eagerState,
            next: null
          }, m === null ? (r = m = T, c = u) : m = m.next = T, nt.lanes |= U, El |= U;
        x = x.next;
      } while (x !== null && x !== e);
      if (m === null ? c = u : m.next = r, !he(u, t.memoizedState) && (Gt = !0, C && (l = An, l !== null)))
        throw l;
      t.memoizedState = u, t.baseState = c, t.baseQueue = m, n.lastRenderedState = u;
    }
    return a === null && (n.lanes = 0), [t.memoizedState, n.dispatch];
  }
  function Cc(t) {
    var e = Ut(), l = e.queue;
    if (l === null) throw Error(s(311));
    l.lastRenderedReducer = t;
    var n = l.dispatch, a = l.pending, u = e.memoizedState;
    if (a !== null) {
      l.pending = null;
      var c = a = a.next;
      do
        u = t(u, c.action), c = c.next;
      while (c !== a);
      he(u, e.memoizedState) || (Gt = !0), e.memoizedState = u, e.baseQueue === null && (e.baseState = u), l.lastRenderedState = u;
    }
    return [u, n];
  }
  function js(t, e, l) {
    var n = nt, a = Ut(), u = dt;
    if (u) {
      if (l === void 0) throw Error(s(407));
      l = l();
    } else l = e();
    var c = !he(
      (pt || a).memoizedState,
      l
    );
    if (c && (a.memoizedState = l, Gt = !0), a = a.queue, Uc(Rs.bind(null, n, a, t), [
      t
    ]), a.getSnapshot !== e || c || wt !== null && wt.memoizedState.tag & 1) {
      if (n.flags |= 2048, jn(
        9,
        { destroy: void 0 },
        Ms.bind(
          null,
          n,
          a,
          l,
          e
        ),
        null
      ), Tt === null) throw Error(s(349));
      u || ($e & 127) !== 0 || Cs(n, e, l);
    }
    return l;
  }
  function Cs(t, e, l) {
    t.flags |= 16384, t = { getSnapshot: e, value: l }, e = nt.updateQueue, e === null ? (e = Au(), nt.updateQueue = e, e.stores = [t]) : (l = e.stores, l === null ? e.stores = [t] : l.push(t));
  }
  function Ms(t, e, l, n) {
    e.value = l, e.getSnapshot = n, Us(e) && Hs(t);
  }
  function Rs(t, e, l) {
    return l(function() {
      Us(e) && Hs(t);
    });
  }
  function Us(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var l = e();
      return !he(t, l);
    } catch {
      return !0;
    }
  }
  function Hs(t) {
    var e = Xl(t, 2);
    e !== null && se(e, t, 2);
  }
  function Mc(t) {
    var e = ne();
    if (typeof t == "function") {
      var l = t;
      if (t = l(), Wl) {
        fl(!0);
        try {
          l();
        } finally {
          fl(!1);
        }
      }
    }
    return e.memoizedState = e.baseState = t, e.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: We,
      lastRenderedState: t
    }, e;
  }
  function Bs(t, e, l, n) {
    return t.baseState = l, jc(
      t,
      pt,
      typeof n == "function" ? n : We
    );
  }
  function ry(t, e, l, n, a) {
    if (_u(t)) throw Error(s(485));
    if (t = e.action, t !== null) {
      var u = {
        payload: a,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(c) {
          u.listeners.push(c);
        }
      };
      j.T !== null ? l(!0) : u.isTransition = !1, n(u), l = e.pending, l === null ? (u.next = e.pending = u, qs(e, u)) : (u.next = l.next, e.pending = l.next = u);
    }
  }
  function qs(t, e) {
    var l = e.action, n = e.payload, a = t.state;
    if (e.isTransition) {
      var u = j.T, c = {};
      j.T = c;
      try {
        var r = l(a, n), m = j.S;
        m !== null && m(c, r), Ys(t, e, r);
      } catch (x) {
        Rc(t, e, x);
      } finally {
        u !== null && c.types !== null && (u.types = c.types), j.T = u;
      }
    } else
      try {
        u = l(a, n), Ys(t, e, u);
      } catch (x) {
        Rc(t, e, x);
      }
  }
  function Ys(t, e, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(n) {
        ws(t, e, n);
      },
      function(n) {
        return Rc(t, e, n);
      }
    ) : ws(t, e, l);
  }
  function ws(t, e, l) {
    e.status = "fulfilled", e.value = l, Gs(e), t.state = l, e = t.pending, e !== null && (l = e.next, l === e ? t.pending = null : (l = l.next, e.next = l, qs(t, l)));
  }
  function Rc(t, e, l) {
    var n = t.pending;
    if (t.pending = null, n !== null) {
      n = n.next;
      do
        e.status = "rejected", e.reason = l, Gs(e), e = e.next;
      while (e !== n);
    }
    t.action = null;
  }
  function Gs(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function Xs(t, e) {
    return e;
  }
  function Qs(t, e) {
    if (dt) {
      var l = Tt.formState;
      if (l !== null) {
        t: {
          var n = nt;
          if (dt) {
            if (Dt) {
              e: {
                for (var a = Dt, u = Oe; a.nodeType !== 8; ) {
                  if (!u) {
                    a = null;
                    break e;
                  }
                  if (a = je(
                    a.nextSibling
                  ), a === null) {
                    a = null;
                    break e;
                  }
                }
                u = a.data, a = u === "F!" || u === "F" ? a : null;
              }
              if (a) {
                Dt = je(
                  a.nextSibling
                ), n = a.data === "F!";
                break t;
              }
            }
            ml(n);
          }
          n = !1;
        }
        n && (e = l[0]);
      }
    }
    return l = ne(), l.memoizedState = l.baseState = e, n = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Xs,
      lastRenderedState: e
    }, l.queue = n, l = cr.bind(
      null,
      nt,
      n
    ), n.dispatch = l, n = Mc(!1), u = wc.bind(
      null,
      nt,
      !1,
      n.queue
    ), n = ne(), a = {
      state: e,
      dispatch: null,
      action: t,
      pending: null
    }, n.queue = a, l = ry.bind(
      null,
      nt,
      a,
      u,
      l
    ), a.dispatch = l, n.memoizedState = t, [e, l, !1];
  }
  function Zs(t) {
    var e = Ut();
    return Ls(e, pt, t);
  }
  function Ls(t, e, l) {
    if (e = jc(
      t,
      e,
      Xs
    )[0], t = Du(We)[0], typeof e == "object" && e !== null && typeof e.then == "function")
      try {
        var n = ya(e);
      } catch (c) {
        throw c === Nn ? vu : c;
      }
    else n = e;
    e = Ut();
    var a = e.queue, u = a.dispatch;
    return l !== e.memoizedState && (nt.flags |= 2048, jn(
      9,
      { destroy: void 0 },
      dy.bind(null, a, l),
      null
    )), [n, u, t];
  }
  function dy(t, e) {
    t.action = e;
  }
  function Vs(t) {
    var e = Ut(), l = pt;
    if (l !== null)
      return Ls(e, l, t);
    Ut(), e = e.memoizedState, l = Ut();
    var n = l.queue.dispatch;
    return l.memoizedState = t, [e, n, !1];
  }
  function jn(t, e, l, n) {
    return t = { tag: t, create: l, deps: n, inst: e, next: null }, e = nt.updateQueue, e === null && (e = Au(), nt.updateQueue = e), l = e.lastEffect, l === null ? e.lastEffect = t.next = t : (n = l.next, l.next = t, t.next = n, e.lastEffect = t), t;
  }
  function Ks() {
    return Ut().memoizedState;
  }
  function zu(t, e, l, n) {
    var a = ne();
    nt.flags |= t, a.memoizedState = jn(
      1 | e,
      { destroy: void 0 },
      l,
      n === void 0 ? null : n
    );
  }
  function Ou(t, e, l, n) {
    var a = Ut();
    n = n === void 0 ? null : n;
    var u = a.memoizedState.inst;
    pt !== null && n !== null && Ac(n, pt.memoizedState.deps) ? a.memoizedState = jn(e, u, l, n) : (nt.flags |= t, a.memoizedState = jn(
      1 | e,
      u,
      l,
      n
    ));
  }
  function Js(t, e) {
    zu(8390656, 8, t, e);
  }
  function Uc(t, e) {
    Ou(2048, 8, t, e);
  }
  function my(t) {
    nt.flags |= 4;
    var e = nt.updateQueue;
    if (e === null)
      e = Au(), nt.updateQueue = e, e.events = [t];
    else {
      var l = e.events;
      l === null ? e.events = [t] : l.push(t);
    }
  }
  function ks(t) {
    var e = Ut().memoizedState;
    return my({ ref: e, nextImpl: t }), function() {
      if ((yt & 2) !== 0) throw Error(s(440));
      return e.impl.apply(void 0, arguments);
    };
  }
  function $s(t, e) {
    return Ou(4, 2, t, e);
  }
  function Ws(t, e) {
    return Ou(4, 4, t, e);
  }
  function Fs(t, e) {
    if (typeof e == "function") {
      t = t();
      var l = e(t);
      return function() {
        typeof l == "function" ? l() : e(null);
      };
    }
    if (e != null)
      return t = t(), e.current = t, function() {
        e.current = null;
      };
  }
  function Is(t, e, l) {
    l = l != null ? l.concat([t]) : null, Ou(4, 4, Fs.bind(null, e, t), l);
  }
  function Hc() {
  }
  function Ps(t, e) {
    var l = Ut();
    e = e === void 0 ? null : e;
    var n = l.memoizedState;
    return e !== null && Ac(e, n[1]) ? n[0] : (l.memoizedState = [t, e], t);
  }
  function tr(t, e) {
    var l = Ut();
    e = e === void 0 ? null : e;
    var n = l.memoizedState;
    if (e !== null && Ac(e, n[1]))
      return n[0];
    if (n = t(), Wl) {
      fl(!0);
      try {
        t();
      } finally {
        fl(!1);
      }
    }
    return l.memoizedState = [n, e], n;
  }
  function Bc(t, e, l) {
    return l === void 0 || ($e & 1073741824) !== 0 && (st & 261930) === 0 ? t.memoizedState = e : (t.memoizedState = l, t = ed(), nt.lanes |= t, El |= t, l);
  }
  function er(t, e, l, n) {
    return he(l, e) ? l : zn.current !== null ? (t = Bc(t, l, n), he(t, e) || (Gt = !0), t) : ($e & 42) === 0 || ($e & 1073741824) !== 0 && (st & 261930) === 0 ? (Gt = !0, t.memoizedState = l) : (t = ed(), nt.lanes |= t, El |= t, e);
  }
  function lr(t, e, l, n, a) {
    var u = Z.p;
    Z.p = u !== 0 && 8 > u ? u : 8;
    var c = j.T, r = {};
    j.T = r, wc(t, !1, e, l);
    try {
      var m = a(), x = j.S;
      if (x !== null && x(r, m), m !== null && typeof m == "object" && typeof m.then == "function") {
        var C = fy(
          m,
          n
        );
        va(
          t,
          e,
          C,
          Se(t)
        );
      } else
        va(
          t,
          e,
          n,
          Se(t)
        );
    } catch (U) {
      va(
        t,
        e,
        { then: function() {
        }, status: "rejected", reason: U },
        Se()
      );
    } finally {
      Z.p = u, c !== null && r.types !== null && (c.types = r.types), j.T = c;
    }
  }
  function hy() {
  }
  function qc(t, e, l, n) {
    if (t.tag !== 5) throw Error(s(476));
    var a = nr(t).queue;
    lr(
      t,
      a,
      e,
      I,
      l === null ? hy : function() {
        return ar(t), l(n);
      }
    );
  }
  function nr(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: I,
      baseState: I,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: We,
        lastRenderedState: I
      },
      next: null
    };
    var l = {};
    return e.next = {
      memoizedState: l,
      baseState: l,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: We,
        lastRenderedState: l
      },
      next: null
    }, t.memoizedState = e, t = t.alternate, t !== null && (t.memoizedState = e), e;
  }
  function ar(t) {
    var e = nr(t);
    e.next === null && (e = t.alternate.memoizedState), va(
      t,
      e.next.queue,
      {},
      Se()
    );
  }
  function Yc() {
    return Wt(Ra);
  }
  function ur() {
    return Ut().memoizedState;
  }
  function ir() {
    return Ut().memoizedState;
  }
  function yy(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var l = Se();
          t = vl(l);
          var n = gl(e, t, l);
          n !== null && (se(n, e, l), ra(n, e, l)), e = { cache: mc() }, t.payload = e;
          return;
      }
      e = e.return;
    }
  }
  function vy(t, e, l) {
    var n = Se();
    l = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, _u(t) ? fr(e, l) : (l = lc(t, e, l, n), l !== null && (se(l, t, n), or(l, e, n)));
  }
  function cr(t, e, l) {
    var n = Se();
    va(t, e, l, n);
  }
  function va(t, e, l, n) {
    var a = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (_u(t)) fr(e, a);
    else {
      var u = t.alternate;
      if (t.lanes === 0 && (u === null || u.lanes === 0) && (u = e.lastRenderedReducer, u !== null))
        try {
          var c = e.lastRenderedState, r = u(c, l);
          if (a.hasEagerState = !0, a.eagerState = r, he(r, c))
            return ou(t, e, a, 0), Tt === null && fu(), !1;
        } catch {
        }
      if (l = lc(t, e, a, n), l !== null)
        return se(l, t, n), or(l, e, n), !0;
    }
    return !1;
  }
  function wc(t, e, l, n) {
    if (n = {
      lane: 2,
      revertLane: bf(),
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, _u(t)) {
      if (e) throw Error(s(479));
    } else
      e = lc(
        t,
        l,
        n,
        2
      ), e !== null && se(e, t, 2);
  }
  function _u(t) {
    var e = t.alternate;
    return t === nt || e !== null && e === nt;
  }
  function fr(t, e) {
    On = Eu = !0;
    var l = t.pending;
    l === null ? e.next = e : (e.next = l.next, l.next = e), t.pending = e;
  }
  function or(t, e, l) {
    if ((l & 4194048) !== 0) {
      var n = e.lanes;
      n &= t.pendingLanes, l |= n, e.lanes = l, ho(t, l);
    }
  }
  var ga = {
    readContext: Wt,
    use: Nu,
    useCallback: jt,
    useContext: jt,
    useEffect: jt,
    useImperativeHandle: jt,
    useLayoutEffect: jt,
    useInsertionEffect: jt,
    useMemo: jt,
    useReducer: jt,
    useRef: jt,
    useState: jt,
    useDebugValue: jt,
    useDeferredValue: jt,
    useTransition: jt,
    useSyncExternalStore: jt,
    useId: jt,
    useHostTransitionStatus: jt,
    useFormState: jt,
    useActionState: jt,
    useOptimistic: jt,
    useMemoCache: jt,
    useCacheRefresh: jt
  };
  ga.useEffectEvent = jt;
  var sr = {
    readContext: Wt,
    use: Nu,
    useCallback: function(t, e) {
      return ne().memoizedState = [
        t,
        e === void 0 ? null : e
      ], t;
    },
    useContext: Wt,
    useEffect: Js,
    useImperativeHandle: function(t, e, l) {
      l = l != null ? l.concat([t]) : null, zu(
        4194308,
        4,
        Fs.bind(null, e, t),
        l
      );
    },
    useLayoutEffect: function(t, e) {
      return zu(4194308, 4, t, e);
    },
    useInsertionEffect: function(t, e) {
      zu(4, 2, t, e);
    },
    useMemo: function(t, e) {
      var l = ne();
      e = e === void 0 ? null : e;
      var n = t();
      if (Wl) {
        fl(!0);
        try {
          t();
        } finally {
          fl(!1);
        }
      }
      return l.memoizedState = [n, e], n;
    },
    useReducer: function(t, e, l) {
      var n = ne();
      if (l !== void 0) {
        var a = l(e);
        if (Wl) {
          fl(!0);
          try {
            l(e);
          } finally {
            fl(!1);
          }
        }
      } else a = e;
      return n.memoizedState = n.baseState = a, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: a
      }, n.queue = t, t = t.dispatch = vy.bind(
        null,
        nt,
        t
      ), [n.memoizedState, t];
    },
    useRef: function(t) {
      var e = ne();
      return t = { current: t }, e.memoizedState = t;
    },
    useState: function(t) {
      t = Mc(t);
      var e = t.queue, l = cr.bind(null, nt, e);
      return e.dispatch = l, [t.memoizedState, l];
    },
    useDebugValue: Hc,
    useDeferredValue: function(t, e) {
      var l = ne();
      return Bc(l, t, e);
    },
    useTransition: function() {
      var t = Mc(!1);
      return t = lr.bind(
        null,
        nt,
        t.queue,
        !0,
        !1
      ), ne().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, e, l) {
      var n = nt, a = ne();
      if (dt) {
        if (l === void 0)
          throw Error(s(407));
        l = l();
      } else {
        if (l = e(), Tt === null)
          throw Error(s(349));
        (st & 127) !== 0 || Cs(n, e, l);
      }
      a.memoizedState = l;
      var u = { value: l, getSnapshot: e };
      return a.queue = u, Js(Rs.bind(null, n, u, t), [
        t
      ]), n.flags |= 2048, jn(
        9,
        { destroy: void 0 },
        Ms.bind(
          null,
          n,
          u,
          l,
          e
        ),
        null
      ), l;
    },
    useId: function() {
      var t = ne(), e = Tt.identifierPrefix;
      if (dt) {
        var l = Ye, n = qe;
        l = (n & ~(1 << 32 - me(n) - 1)).toString(32) + l, e = "_" + e + "R_" + l, l = Tu++, 0 < l && (e += "H" + l.toString(32)), e += "_";
      } else
        l = oy++, e = "_" + e + "r_" + l.toString(32) + "_";
      return t.memoizedState = e;
    },
    useHostTransitionStatus: Yc,
    useFormState: Qs,
    useActionState: Qs,
    useOptimistic: function(t) {
      var e = ne();
      e.memoizedState = e.baseState = t;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return e.queue = l, e = wc.bind(
        null,
        nt,
        !0,
        l
      ), l.dispatch = e, [t, e];
    },
    useMemoCache: _c,
    useCacheRefresh: function() {
      return ne().memoizedState = yy.bind(
        null,
        nt
      );
    },
    useEffectEvent: function(t) {
      var e = ne(), l = { impl: t };
      return e.memoizedState = l, function() {
        if ((yt & 2) !== 0)
          throw Error(s(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, Gc = {
    readContext: Wt,
    use: Nu,
    useCallback: Ps,
    useContext: Wt,
    useEffect: Uc,
    useImperativeHandle: Is,
    useInsertionEffect: $s,
    useLayoutEffect: Ws,
    useMemo: tr,
    useReducer: Du,
    useRef: Ks,
    useState: function() {
      return Du(We);
    },
    useDebugValue: Hc,
    useDeferredValue: function(t, e) {
      var l = Ut();
      return er(
        l,
        pt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = Du(We)[0], e = Ut().memoizedState;
      return [
        typeof t == "boolean" ? t : ya(t),
        e
      ];
    },
    useSyncExternalStore: js,
    useId: ur,
    useHostTransitionStatus: Yc,
    useFormState: Zs,
    useActionState: Zs,
    useOptimistic: function(t, e) {
      var l = Ut();
      return Bs(l, pt, t, e);
    },
    useMemoCache: _c,
    useCacheRefresh: ir
  };
  Gc.useEffectEvent = ks;
  var rr = {
    readContext: Wt,
    use: Nu,
    useCallback: Ps,
    useContext: Wt,
    useEffect: Uc,
    useImperativeHandle: Is,
    useInsertionEffect: $s,
    useLayoutEffect: Ws,
    useMemo: tr,
    useReducer: Cc,
    useRef: Ks,
    useState: function() {
      return Cc(We);
    },
    useDebugValue: Hc,
    useDeferredValue: function(t, e) {
      var l = Ut();
      return pt === null ? Bc(l, t, e) : er(
        l,
        pt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = Cc(We)[0], e = Ut().memoizedState;
      return [
        typeof t == "boolean" ? t : ya(t),
        e
      ];
    },
    useSyncExternalStore: js,
    useId: ur,
    useHostTransitionStatus: Yc,
    useFormState: Vs,
    useActionState: Vs,
    useOptimistic: function(t, e) {
      var l = Ut();
      return pt !== null ? Bs(l, pt, t, e) : (l.baseState = t, [t, l.queue.dispatch]);
    },
    useMemoCache: _c,
    useCacheRefresh: ir
  };
  rr.useEffectEvent = ks;
  function Xc(t, e, l, n) {
    e = t.memoizedState, l = l(n, e), l = l == null ? e : b({}, e, l), t.memoizedState = l, t.lanes === 0 && (t.updateQueue.baseState = l);
  }
  var Qc = {
    enqueueSetState: function(t, e, l) {
      t = t._reactInternals;
      var n = Se(), a = vl(n);
      a.payload = e, l != null && (a.callback = l), e = gl(t, a, n), e !== null && (se(e, t, n), ra(e, t, n));
    },
    enqueueReplaceState: function(t, e, l) {
      t = t._reactInternals;
      var n = Se(), a = vl(n);
      a.tag = 1, a.payload = e, l != null && (a.callback = l), e = gl(t, a, n), e !== null && (se(e, t, n), ra(e, t, n));
    },
    enqueueForceUpdate: function(t, e) {
      t = t._reactInternals;
      var l = Se(), n = vl(l);
      n.tag = 2, e != null && (n.callback = e), e = gl(t, n, l), e !== null && (se(e, t, l), ra(e, t, l));
    }
  };
  function dr(t, e, l, n, a, u, c) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(n, u, c) : e.prototype && e.prototype.isPureReactComponent ? !na(l, n) || !na(a, u) : !0;
  }
  function mr(t, e, l, n) {
    t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(l, n), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(l, n), e.state !== t && Qc.enqueueReplaceState(e, e.state, null);
  }
  function Fl(t, e) {
    var l = e;
    if ("ref" in e) {
      l = {};
      for (var n in e)
        n !== "ref" && (l[n] = e[n]);
    }
    if (t = t.defaultProps) {
      l === e && (l = b({}, l));
      for (var a in t)
        l[a] === void 0 && (l[a] = t[a]);
    }
    return l;
  }
  function hr(t) {
    cu(t);
  }
  function yr(t) {
    console.error(t);
  }
  function vr(t) {
    cu(t);
  }
  function ju(t, e) {
    try {
      var l = t.onUncaughtError;
      l(e.value, { componentStack: e.stack });
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  function gr(t, e, l) {
    try {
      var n = t.onCaughtError;
      n(l.value, {
        componentStack: l.stack,
        errorBoundary: e.tag === 1 ? e.stateNode : null
      });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function Zc(t, e, l) {
    return l = vl(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      ju(t, e);
    }, l;
  }
  function br(t) {
    return t = vl(t), t.tag = 3, t;
  }
  function pr(t, e, l, n) {
    var a = l.type.getDerivedStateFromError;
    if (typeof a == "function") {
      var u = n.value;
      t.payload = function() {
        return a(u);
      }, t.callback = function() {
        gr(e, l, n);
      };
    }
    var c = l.stateNode;
    c !== null && typeof c.componentDidCatch == "function" && (t.callback = function() {
      gr(e, l, n), typeof a != "function" && (Tl === null ? Tl = /* @__PURE__ */ new Set([this]) : Tl.add(this));
      var r = n.stack;
      this.componentDidCatch(n.value, {
        componentStack: r !== null ? r : ""
      });
    });
  }
  function gy(t, e, l, n, a) {
    if (l.flags |= 32768, n !== null && typeof n == "object" && typeof n.then == "function") {
      if (e = l.alternate, e !== null && En(
        e,
        l,
        a,
        !0
      ), l = ve.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
            return _e === null ? Qu() : l.alternate === null && Ct === 0 && (Ct = 3), l.flags &= -257, l.flags |= 65536, l.lanes = a, n === gu ? l.flags |= 16384 : (e = l.updateQueue, e === null ? l.updateQueue = /* @__PURE__ */ new Set([n]) : e.add(n), yf(t, n, a)), !1;
          case 22:
            return l.flags |= 65536, n === gu ? l.flags |= 16384 : (e = l.updateQueue, e === null ? (e = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([n])
            }, l.updateQueue = e) : (l = e.retryQueue, l === null ? e.retryQueue = /* @__PURE__ */ new Set([n]) : l.add(n)), yf(t, n, a)), !1;
        }
        throw Error(s(435, l.tag));
      }
      return yf(t, n, a), Qu(), !1;
    }
    if (dt)
      return e = ve.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = a, n !== fc && (t = Error(s(422), { cause: n }), ia(Ne(t, l)))) : (n !== fc && (e = Error(s(423), {
        cause: n
      }), ia(
        Ne(e, l)
      )), t = t.current.alternate, t.flags |= 65536, a &= -a, t.lanes |= a, n = Ne(n, l), a = Zc(
        t.stateNode,
        n,
        a
      ), pc(t, a), Ct !== 4 && (Ct = 2)), !1;
    var u = Error(s(520), { cause: n });
    if (u = Ne(u, l), Na === null ? Na = [u] : Na.push(u), Ct !== 4 && (Ct = 2), e === null) return !0;
    n = Ne(n, l), l = e;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, t = a & -a, l.lanes |= t, t = Zc(l.stateNode, n, t), pc(l, t), !1;
        case 1:
          if (e = l.type, u = l.stateNode, (l.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (Tl === null || !Tl.has(u))))
            return l.flags |= 65536, a &= -a, l.lanes |= a, a = br(a), pr(
              a,
              t,
              l,
              n
            ), pc(l, a), !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var Lc = Error(s(461)), Gt = !1;
  function Ft(t, e, l, n) {
    e.child = t === null ? Ts(e, null, l, n) : $l(
      e,
      t.child,
      l,
      n
    );
  }
  function Sr(t, e, l, n, a) {
    l = l.render;
    var u = e.ref;
    if ("ref" in n) {
      var c = {};
      for (var r in n)
        r !== "ref" && (c[r] = n[r]);
    } else c = n;
    return Vl(e), n = Nc(
      t,
      e,
      l,
      c,
      u,
      a
    ), r = Dc(), t !== null && !Gt ? (zc(t, e, a), Fe(t, e, a)) : (dt && r && ic(e), e.flags |= 1, Ft(t, e, n, a), e.child);
  }
  function xr(t, e, l, n, a) {
    if (t === null) {
      var u = l.type;
      return typeof u == "function" && !nc(u) && u.defaultProps === void 0 && l.compare === null ? (e.tag = 15, e.type = u, Er(
        t,
        e,
        u,
        n,
        a
      )) : (t = ru(
        l.type,
        null,
        n,
        e,
        e.mode,
        a
      ), t.ref = e.ref, t.return = e, e.child = t);
    }
    if (u = t.child, !Ic(t, a)) {
      var c = u.memoizedProps;
      if (l = l.compare, l = l !== null ? l : na, l(c, n) && t.ref === e.ref)
        return Fe(t, e, a);
    }
    return e.flags |= 1, t = Ve(u, n), t.ref = e.ref, t.return = e, e.child = t;
  }
  function Er(t, e, l, n, a) {
    if (t !== null) {
      var u = t.memoizedProps;
      if (na(u, n) && t.ref === e.ref)
        if (Gt = !1, e.pendingProps = n = u, Ic(t, a))
          (t.flags & 131072) !== 0 && (Gt = !0);
        else
          return e.lanes = t.lanes, Fe(t, e, a);
    }
    return Vc(
      t,
      e,
      l,
      n,
      a
    );
  }
  function Tr(t, e, l, n) {
    var a = n.children, u = t !== null ? t.memoizedState : null;
    if (t === null && e.stateNode === null && (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.mode === "hidden") {
      if ((e.flags & 128) !== 0) {
        if (u = u !== null ? u.baseLanes | l : l, t !== null) {
          for (n = e.child = t.child, a = 0; n !== null; )
            a = a | n.lanes | n.childLanes, n = n.sibling;
          n = a & ~u;
        } else n = 0, e.child = null;
        return Ar(
          t,
          e,
          u,
          l,
          n
        );
      }
      if ((l & 536870912) !== 0)
        e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && yu(
          e,
          u !== null ? u.cachePool : null
        ), u !== null ? Ds(e, u) : xc(), zs(e);
      else
        return n = e.lanes = 536870912, Ar(
          t,
          e,
          u !== null ? u.baseLanes | l : l,
          l,
          n
        );
    } else
      u !== null ? (yu(e, u.cachePool), Ds(e, u), pl(), e.memoizedState = null) : (t !== null && yu(e, null), xc(), pl());
    return Ft(t, e, a, l), e.child;
  }
  function ba(t, e) {
    return t !== null && t.tag === 22 || e.stateNode !== null || (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), e.sibling;
  }
  function Ar(t, e, l, n, a) {
    var u = yc();
    return u = u === null ? null : { parent: Yt._currentValue, pool: u }, e.memoizedState = {
      baseLanes: l,
      cachePool: u
    }, t !== null && yu(e, null), xc(), zs(e), t !== null && En(t, e, n, !0), e.childLanes = a, null;
  }
  function Cu(t, e) {
    return e = Ru(
      { mode: e.mode, children: e.children },
      t.mode
    ), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Nr(t, e, l) {
    return $l(e, t.child, null, l), t = Cu(e, e.pendingProps), t.flags |= 2, ge(e), e.memoizedState = null, t;
  }
  function by(t, e, l) {
    var n = e.pendingProps, a = (e.flags & 128) !== 0;
    if (e.flags &= -129, t === null) {
      if (dt) {
        if (n.mode === "hidden")
          return t = Cu(e, n), e.lanes = 536870912, ba(null, t);
        if (Tc(e), (t = Dt) ? (t = qd(
          t,
          Oe
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: rl !== null ? { id: qe, overflow: Ye } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = fs(t), l.return = e, e.child = l, $t = e, Dt = null)) : t = null, t === null) throw ml(e);
        return e.lanes = 536870912, null;
      }
      return Cu(e, n);
    }
    var u = t.memoizedState;
    if (u !== null) {
      var c = u.dehydrated;
      if (Tc(e), a)
        if (e.flags & 256)
          e.flags &= -257, e = Nr(
            t,
            e,
            l
          );
        else if (e.memoizedState !== null)
          e.child = t.child, e.flags |= 128, e = null;
        else throw Error(s(558));
      else if (Gt || En(t, e, l, !1), a = (l & t.childLanes) !== 0, Gt || a) {
        if (n = Tt, n !== null && (c = yo(n, l), c !== 0 && c !== u.retryLane))
          throw u.retryLane = c, Xl(t, c), se(n, t, c), Lc;
        Qu(), e = Nr(
          t,
          e,
          l
        );
      } else
        t = u.treeContext, Dt = je(c.nextSibling), $t = e, dt = !0, dl = null, Oe = !1, t !== null && rs(e, t), e = Cu(e, n), e.flags |= 4096;
      return e;
    }
    return t = Ve(t.child, {
      mode: n.mode,
      children: n.children
    }), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Mu(t, e) {
    var l = e.ref;
    if (l === null)
      t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(s(284));
      (t === null || t.ref !== l) && (e.flags |= 4194816);
    }
  }
  function Vc(t, e, l, n, a) {
    return Vl(e), l = Nc(
      t,
      e,
      l,
      n,
      void 0,
      a
    ), n = Dc(), t !== null && !Gt ? (zc(t, e, a), Fe(t, e, a)) : (dt && n && ic(e), e.flags |= 1, Ft(t, e, l, a), e.child);
  }
  function Dr(t, e, l, n, a, u) {
    return Vl(e), e.updateQueue = null, l = _s(
      e,
      n,
      l,
      a
    ), Os(t), n = Dc(), t !== null && !Gt ? (zc(t, e, u), Fe(t, e, u)) : (dt && n && ic(e), e.flags |= 1, Ft(t, e, l, u), e.child);
  }
  function zr(t, e, l, n, a) {
    if (Vl(e), e.stateNode === null) {
      var u = bn, c = l.contextType;
      typeof c == "object" && c !== null && (u = Wt(c)), u = new l(n, u), e.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = Qc, e.stateNode = u, u._reactInternals = e, u = e.stateNode, u.props = n, u.state = e.memoizedState, u.refs = {}, gc(e), c = l.contextType, u.context = typeof c == "object" && c !== null ? Wt(c) : bn, u.state = e.memoizedState, c = l.getDerivedStateFromProps, typeof c == "function" && (Xc(
        e,
        l,
        c,
        n
      ), u.state = e.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (c = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), c !== u.state && Qc.enqueueReplaceState(u, u.state, null), ma(e, n, u, a), da(), u.state = e.memoizedState), typeof u.componentDidMount == "function" && (e.flags |= 4194308), n = !0;
    } else if (t === null) {
      u = e.stateNode;
      var r = e.memoizedProps, m = Fl(l, r);
      u.props = m;
      var x = u.context, C = l.contextType;
      c = bn, typeof C == "object" && C !== null && (c = Wt(C));
      var U = l.getDerivedStateFromProps;
      C = typeof U == "function" || typeof u.getSnapshotBeforeUpdate == "function", r = e.pendingProps !== r, C || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (r || x !== c) && mr(
        e,
        u,
        n,
        c
      ), yl = !1;
      var T = e.memoizedState;
      u.state = T, ma(e, n, u, a), da(), x = e.memoizedState, r || T !== x || yl ? (typeof U == "function" && (Xc(
        e,
        l,
        U,
        n
      ), x = e.memoizedState), (m = yl || dr(
        e,
        l,
        m,
        n,
        T,
        x,
        c
      )) ? (C || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = n, e.memoizedState = x), u.props = n, u.state = x, u.context = c, n = m) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), n = !1);
    } else {
      u = e.stateNode, bc(t, e), c = e.memoizedProps, C = Fl(l, c), u.props = C, U = e.pendingProps, T = u.context, x = l.contextType, m = bn, typeof x == "object" && x !== null && (m = Wt(x)), r = l.getDerivedStateFromProps, (x = typeof r == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (c !== U || T !== m) && mr(
        e,
        u,
        n,
        m
      ), yl = !1, T = e.memoizedState, u.state = T, ma(e, n, u, a), da();
      var A = e.memoizedState;
      c !== U || T !== A || yl || t !== null && t.dependencies !== null && mu(t.dependencies) ? (typeof r == "function" && (Xc(
        e,
        l,
        r,
        n
      ), A = e.memoizedState), (C = yl || dr(
        e,
        l,
        C,
        n,
        T,
        A,
        m
      ) || t !== null && t.dependencies !== null && mu(t.dependencies)) ? (x || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(n, A, m), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        n,
        A,
        m
      )), typeof u.componentDidUpdate == "function" && (e.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || c === t.memoizedProps && T === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || c === t.memoizedProps && T === t.memoizedState || (e.flags |= 1024), e.memoizedProps = n, e.memoizedState = A), u.props = n, u.state = A, u.context = m, n = C) : (typeof u.componentDidUpdate != "function" || c === t.memoizedProps && T === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || c === t.memoizedProps && T === t.memoizedState || (e.flags |= 1024), n = !1);
    }
    return u = n, Mu(t, e), n = (e.flags & 128) !== 0, u || n ? (u = e.stateNode, l = n && typeof l.getDerivedStateFromError != "function" ? null : u.render(), e.flags |= 1, t !== null && n ? (e.child = $l(
      e,
      t.child,
      null,
      a
    ), e.child = $l(
      e,
      null,
      l,
      a
    )) : Ft(t, e, l, a), e.memoizedState = u.state, t = e.child) : t = Fe(
      t,
      e,
      a
    ), t;
  }
  function Or(t, e, l, n) {
    return Zl(), e.flags |= 256, Ft(t, e, l, n), e.child;
  }
  var Kc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Jc(t) {
    return { baseLanes: t, cachePool: gs() };
  }
  function kc(t, e, l) {
    return t = t !== null ? t.childLanes & ~l : 0, e && (t |= pe), t;
  }
  function _r(t, e, l) {
    var n = e.pendingProps, a = !1, u = (e.flags & 128) !== 0, c;
    if ((c = u) || (c = t !== null && t.memoizedState === null ? !1 : (Rt.current & 2) !== 0), c && (a = !0, e.flags &= -129), c = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
      if (dt) {
        if (a ? bl(e) : pl(), (t = Dt) ? (t = qd(
          t,
          Oe
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: rl !== null ? { id: qe, overflow: Ye } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = fs(t), l.return = e, e.child = l, $t = e, Dt = null)) : t = null, t === null) throw ml(e);
        return Cf(t) ? e.lanes = 32 : e.lanes = 536870912, null;
      }
      var r = n.children;
      return n = n.fallback, a ? (pl(), a = e.mode, r = Ru(
        { mode: "hidden", children: r },
        a
      ), n = Ql(
        n,
        a,
        l,
        null
      ), r.return = e, n.return = e, r.sibling = n, e.child = r, n = e.child, n.memoizedState = Jc(l), n.childLanes = kc(
        t,
        c,
        l
      ), e.memoizedState = Kc, ba(null, n)) : (bl(e), $c(e, r));
    }
    var m = t.memoizedState;
    if (m !== null && (r = m.dehydrated, r !== null)) {
      if (u)
        e.flags & 256 ? (bl(e), e.flags &= -257, e = Wc(
          t,
          e,
          l
        )) : e.memoizedState !== null ? (pl(), e.child = t.child, e.flags |= 128, e = null) : (pl(), r = n.fallback, a = e.mode, n = Ru(
          { mode: "visible", children: n.children },
          a
        ), r = Ql(
          r,
          a,
          l,
          null
        ), r.flags |= 2, n.return = e, r.return = e, n.sibling = r, e.child = n, $l(
          e,
          t.child,
          null,
          l
        ), n = e.child, n.memoizedState = Jc(l), n.childLanes = kc(
          t,
          c,
          l
        ), e.memoizedState = Kc, e = ba(null, n));
      else if (bl(e), Cf(r)) {
        if (c = r.nextSibling && r.nextSibling.dataset, c) var x = c.dgst;
        c = x, n = Error(s(419)), n.stack = "", n.digest = c, ia({ value: n, source: null, stack: null }), e = Wc(
          t,
          e,
          l
        );
      } else if (Gt || En(t, e, l, !1), c = (l & t.childLanes) !== 0, Gt || c) {
        if (c = Tt, c !== null && (n = yo(c, l), n !== 0 && n !== m.retryLane))
          throw m.retryLane = n, Xl(t, n), se(c, t, n), Lc;
        jf(r) || Qu(), e = Wc(
          t,
          e,
          l
        );
      } else
        jf(r) ? (e.flags |= 192, e.child = t.child, e = null) : (t = m.treeContext, Dt = je(
          r.nextSibling
        ), $t = e, dt = !0, dl = null, Oe = !1, t !== null && rs(e, t), e = $c(
          e,
          n.children
        ), e.flags |= 4096);
      return e;
    }
    return a ? (pl(), r = n.fallback, a = e.mode, m = t.child, x = m.sibling, n = Ve(m, {
      mode: "hidden",
      children: n.children
    }), n.subtreeFlags = m.subtreeFlags & 65011712, x !== null ? r = Ve(
      x,
      r
    ) : (r = Ql(
      r,
      a,
      l,
      null
    ), r.flags |= 2), r.return = e, n.return = e, n.sibling = r, e.child = n, ba(null, n), n = e.child, r = t.child.memoizedState, r === null ? r = Jc(l) : (a = r.cachePool, a !== null ? (m = Yt._currentValue, a = a.parent !== m ? { parent: m, pool: m } : a) : a = gs(), r = {
      baseLanes: r.baseLanes | l,
      cachePool: a
    }), n.memoizedState = r, n.childLanes = kc(
      t,
      c,
      l
    ), e.memoizedState = Kc, ba(t.child, n)) : (bl(e), l = t.child, t = l.sibling, l = Ve(l, {
      mode: "visible",
      children: n.children
    }), l.return = e, l.sibling = null, t !== null && (c = e.deletions, c === null ? (e.deletions = [t], e.flags |= 16) : c.push(t)), e.child = l, e.memoizedState = null, l);
  }
  function $c(t, e) {
    return e = Ru(
      { mode: "visible", children: e },
      t.mode
    ), e.return = t, t.child = e;
  }
  function Ru(t, e) {
    return t = ye(22, t, null, e), t.lanes = 0, t;
  }
  function Wc(t, e, l) {
    return $l(e, t.child, null, l), t = $c(
      e,
      e.pendingProps.children
    ), t.flags |= 2, e.memoizedState = null, t;
  }
  function jr(t, e, l) {
    t.lanes |= e;
    var n = t.alternate;
    n !== null && (n.lanes |= e), rc(t.return, e, l);
  }
  function Fc(t, e, l, n, a, u) {
    var c = t.memoizedState;
    c === null ? t.memoizedState = {
      isBackwards: e,
      rendering: null,
      renderingStartTime: 0,
      last: n,
      tail: l,
      tailMode: a,
      treeForkCount: u
    } : (c.isBackwards = e, c.rendering = null, c.renderingStartTime = 0, c.last = n, c.tail = l, c.tailMode = a, c.treeForkCount = u);
  }
  function Cr(t, e, l) {
    var n = e.pendingProps, a = n.revealOrder, u = n.tail;
    n = n.children;
    var c = Rt.current, r = (c & 2) !== 0;
    if (r ? (c = c & 1 | 2, e.flags |= 128) : c &= 1, _(Rt, c), Ft(t, e, n, l), n = dt ? ua : 0, !r && t !== null && (t.flags & 128) !== 0)
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && jr(t, l, e);
        else if (t.tag === 19)
          jr(t, l, e);
        else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            break t;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    switch (a) {
      case "forwards":
        for (l = e.child, a = null; l !== null; )
          t = l.alternate, t !== null && xu(t) === null && (a = l), l = l.sibling;
        l = a, l === null ? (a = e.child, e.child = null) : (a = l.sibling, l.sibling = null), Fc(
          e,
          !1,
          a,
          l,
          u,
          n
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (l = null, a = e.child, e.child = null; a !== null; ) {
          if (t = a.alternate, t !== null && xu(t) === null) {
            e.child = a;
            break;
          }
          t = a.sibling, a.sibling = l, l = a, a = t;
        }
        Fc(
          e,
          !0,
          l,
          null,
          u,
          n
        );
        break;
      case "together":
        Fc(
          e,
          !1,
          null,
          null,
          void 0,
          n
        );
        break;
      default:
        e.memoizedState = null;
    }
    return e.child;
  }
  function Fe(t, e, l) {
    if (t !== null && (e.dependencies = t.dependencies), El |= e.lanes, (l & e.childLanes) === 0)
      if (t !== null) {
        if (En(
          t,
          e,
          l,
          !1
        ), (l & e.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && e.child !== t.child)
      throw Error(s(153));
    if (e.child !== null) {
      for (t = e.child, l = Ve(t, t.pendingProps), e.child = l, l.return = e; t.sibling !== null; )
        t = t.sibling, l = l.sibling = Ve(t, t.pendingProps), l.return = e;
      l.sibling = null;
    }
    return e.child;
  }
  function Ic(t, e) {
    return (t.lanes & e) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && mu(t)));
  }
  function py(t, e, l) {
    switch (e.tag) {
      case 3:
        le(e, e.stateNode.containerInfo), hl(e, Yt, t.memoizedState.cache), Zl();
        break;
      case 27:
      case 5:
        Ln(e);
        break;
      case 4:
        le(e, e.stateNode.containerInfo);
        break;
      case 10:
        hl(
          e,
          e.type,
          e.memoizedProps.value
        );
        break;
      case 31:
        if (e.memoizedState !== null)
          return e.flags |= 128, Tc(e), null;
        break;
      case 13:
        var n = e.memoizedState;
        if (n !== null)
          return n.dehydrated !== null ? (bl(e), e.flags |= 128, null) : (l & e.child.childLanes) !== 0 ? _r(t, e, l) : (bl(e), t = Fe(
            t,
            e,
            l
          ), t !== null ? t.sibling : null);
        bl(e);
        break;
      case 19:
        var a = (t.flags & 128) !== 0;
        if (n = (l & e.childLanes) !== 0, n || (En(
          t,
          e,
          l,
          !1
        ), n = (l & e.childLanes) !== 0), a) {
          if (n)
            return Cr(
              t,
              e,
              l
            );
          e.flags |= 128;
        }
        if (a = e.memoizedState, a !== null && (a.rendering = null, a.tail = null, a.lastEffect = null), _(Rt, Rt.current), n) break;
        return null;
      case 22:
        return e.lanes = 0, Tr(
          t,
          e,
          l,
          e.pendingProps
        );
      case 24:
        hl(e, Yt, t.memoizedState.cache);
    }
    return Fe(t, e, l);
  }
  function Mr(t, e, l) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps)
        Gt = !0;
      else {
        if (!Ic(t, l) && (e.flags & 128) === 0)
          return Gt = !1, py(
            t,
            e,
            l
          );
        Gt = (t.flags & 131072) !== 0;
      }
    else
      Gt = !1, dt && (e.flags & 1048576) !== 0 && ss(e, ua, e.index);
    switch (e.lanes = 0, e.tag) {
      case 16:
        t: {
          var n = e.pendingProps;
          if (t = Jl(e.elementType), e.type = t, typeof t == "function")
            nc(t) ? (n = Fl(t, n), e.tag = 1, e = zr(
              null,
              e,
              t,
              n,
              l
            )) : (e.tag = 0, e = Vc(
              null,
              e,
              t,
              n,
              l
            ));
          else {
            if (t != null) {
              var a = t.$$typeof;
              if (a === F) {
                e.tag = 11, e = Sr(
                  null,
                  e,
                  t,
                  n,
                  l
                );
                break t;
              } else if (a === it) {
                e.tag = 14, e = xr(
                  null,
                  e,
                  t,
                  n,
                  l
                );
                break t;
              }
            }
            throw e = Ot(t) || t, Error(s(306, e, ""));
          }
        }
        return e;
      case 0:
        return Vc(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 1:
        return n = e.type, a = Fl(
          n,
          e.pendingProps
        ), zr(
          t,
          e,
          n,
          a,
          l
        );
      case 3:
        t: {
          if (le(
            e,
            e.stateNode.containerInfo
          ), t === null) throw Error(s(387));
          n = e.pendingProps;
          var u = e.memoizedState;
          a = u.element, bc(t, e), ma(e, n, null, l);
          var c = e.memoizedState;
          if (n = c.cache, hl(e, Yt, n), n !== u.cache && dc(
            e,
            [Yt],
            l,
            !0
          ), da(), n = c.element, u.isDehydrated)
            if (u = {
              element: n,
              isDehydrated: !1,
              cache: c.cache
            }, e.updateQueue.baseState = u, e.memoizedState = u, e.flags & 256) {
              e = Or(
                t,
                e,
                n,
                l
              );
              break t;
            } else if (n !== a) {
              a = Ne(
                Error(s(424)),
                e
              ), ia(a), e = Or(
                t,
                e,
                n,
                l
              );
              break t;
            } else
              for (t = e.stateNode.containerInfo, t.nodeType === 9 ? t = t.body : t = t.nodeName === "HTML" ? t.ownerDocument.body : t, Dt = je(t.firstChild), $t = e, dt = !0, dl = null, Oe = !0, l = Ts(
                e,
                null,
                n,
                l
              ), e.child = l; l; )
                l.flags = l.flags & -3 | 4096, l = l.sibling;
          else {
            if (Zl(), n === a) {
              e = Fe(
                t,
                e,
                l
              );
              break t;
            }
            Ft(t, e, n, l);
          }
          e = e.child;
        }
        return e;
      case 26:
        return Mu(t, e), t === null ? (l = Zd(
          e.type,
          null,
          e.pendingProps,
          null
        )) ? e.memoizedState = l : dt || (l = e.type, t = e.pendingProps, n = $u(
          lt.current
        ).createElement(l), n[kt] = e, n[ae] = t, It(n, l, t), Kt(n), e.stateNode = n) : e.memoizedState = Zd(
          e.type,
          t.memoizedProps,
          e.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return Ln(e), t === null && dt && (n = e.stateNode = Gd(
          e.type,
          e.pendingProps,
          lt.current
        ), $t = e, Oe = !0, a = Dt, zl(e.type) ? (Mf = a, Dt = je(n.firstChild)) : Dt = a), Ft(
          t,
          e,
          e.pendingProps.children,
          l
        ), Mu(t, e), t === null && (e.flags |= 4194304), e.child;
      case 5:
        return t === null && dt && ((a = n = Dt) && (n = $y(
          n,
          e.type,
          e.pendingProps,
          Oe
        ), n !== null ? (e.stateNode = n, $t = e, Dt = je(n.firstChild), Oe = !1, a = !0) : a = !1), a || ml(e)), Ln(e), a = e.type, u = e.pendingProps, c = t !== null ? t.memoizedProps : null, n = u.children, zf(a, u) ? n = null : c !== null && zf(a, c) && (e.flags |= 32), e.memoizedState !== null && (a = Nc(
          t,
          e,
          sy,
          null,
          null,
          l
        ), Ra._currentValue = a), Mu(t, e), Ft(t, e, n, l), e.child;
      case 6:
        return t === null && dt && ((t = l = Dt) && (l = Wy(
          l,
          e.pendingProps,
          Oe
        ), l !== null ? (e.stateNode = l, $t = e, Dt = null, t = !0) : t = !1), t || ml(e)), null;
      case 13:
        return _r(t, e, l);
      case 4:
        return le(
          e,
          e.stateNode.containerInfo
        ), n = e.pendingProps, t === null ? e.child = $l(
          e,
          null,
          n,
          l
        ) : Ft(t, e, n, l), e.child;
      case 11:
        return Sr(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 7:
        return Ft(
          t,
          e,
          e.pendingProps,
          l
        ), e.child;
      case 8:
        return Ft(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 12:
        return Ft(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 10:
        return n = e.pendingProps, hl(e, e.type, n.value), Ft(t, e, n.children, l), e.child;
      case 9:
        return a = e.type._context, n = e.pendingProps.children, Vl(e), a = Wt(a), n = n(a), e.flags |= 1, Ft(t, e, n, l), e.child;
      case 14:
        return xr(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 15:
        return Er(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 19:
        return Cr(t, e, l);
      case 31:
        return by(t, e, l);
      case 22:
        return Tr(
          t,
          e,
          l,
          e.pendingProps
        );
      case 24:
        return Vl(e), n = Wt(Yt), t === null ? (a = yc(), a === null && (a = Tt, u = mc(), a.pooledCache = u, u.refCount++, u !== null && (a.pooledCacheLanes |= l), a = u), e.memoizedState = { parent: n, cache: a }, gc(e), hl(e, Yt, a)) : ((t.lanes & l) !== 0 && (bc(t, e), ma(e, null, null, l), da()), a = t.memoizedState, u = e.memoizedState, a.parent !== n ? (a = { parent: n, cache: n }, e.memoizedState = a, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = a), hl(e, Yt, n)) : (n = u.cache, hl(e, Yt, n), n !== a.cache && dc(
          e,
          [Yt],
          l,
          !0
        ))), Ft(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 29:
        throw e.pendingProps;
    }
    throw Error(s(156, e.tag));
  }
  function Ie(t) {
    t.flags |= 4;
  }
  function Pc(t, e, l, n, a) {
    if ((e = (t.mode & 32) !== 0) && (e = !1), e) {
      if (t.flags |= 16777216, (a & 335544128) === a)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (ud()) t.flags |= 8192;
        else
          throw kl = gu, vc;
    } else t.flags &= -16777217;
  }
  function Rr(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !kd(e))
      if (ud()) t.flags |= 8192;
      else
        throw kl = gu, vc;
  }
  function Uu(t, e) {
    e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? ro() : 536870912, t.lanes |= e, Un |= e);
  }
  function pa(t, e) {
    if (!dt)
      switch (t.tailMode) {
        case "hidden":
          e = t.tail;
          for (var l = null; e !== null; )
            e.alternate !== null && (l = e), e = e.sibling;
          l === null ? t.tail = null : l.sibling = null;
          break;
        case "collapsed":
          l = t.tail;
          for (var n = null; l !== null; )
            l.alternate !== null && (n = l), l = l.sibling;
          n === null ? e || t.tail === null ? t.tail = null : t.tail.sibling = null : n.sibling = null;
      }
  }
  function zt(t) {
    var e = t.alternate !== null && t.alternate.child === t.child, l = 0, n = 0;
    if (e)
      for (var a = t.child; a !== null; )
        l |= a.lanes | a.childLanes, n |= a.subtreeFlags & 65011712, n |= a.flags & 65011712, a.return = t, a = a.sibling;
    else
      for (a = t.child; a !== null; )
        l |= a.lanes | a.childLanes, n |= a.subtreeFlags, n |= a.flags, a.return = t, a = a.sibling;
    return t.subtreeFlags |= n, t.childLanes = l, e;
  }
  function Sy(t, e, l) {
    var n = e.pendingProps;
    switch (cc(e), e.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return zt(e), null;
      case 1:
        return zt(e), null;
      case 3:
        return l = e.stateNode, n = null, t !== null && (n = t.memoizedState.cache), e.memoizedState.cache !== n && (e.flags |= 2048), ke(Yt), Mt(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (t === null || t.child === null) && (xn(e) ? Ie(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, oc())), zt(e), null;
      case 26:
        var a = e.type, u = e.memoizedState;
        return t === null ? (Ie(e), u !== null ? (zt(e), Rr(e, u)) : (zt(e), Pc(
          e,
          a,
          null,
          n,
          l
        ))) : u ? u !== t.memoizedState ? (Ie(e), zt(e), Rr(e, u)) : (zt(e), e.flags &= -16777217) : (t = t.memoizedProps, t !== n && Ie(e), zt(e), Pc(
          e,
          a,
          t,
          n,
          l
        )), null;
      case 27:
        if (Va(e), l = lt.current, a = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== n && Ie(e);
        else {
          if (!n) {
            if (e.stateNode === null)
              throw Error(s(166));
            return zt(e), null;
          }
          t = B.current, xn(e) ? ds(e) : (t = Gd(a, n, l), e.stateNode = t, Ie(e));
        }
        return zt(e), null;
      case 5:
        if (Va(e), a = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== n && Ie(e);
        else {
          if (!n) {
            if (e.stateNode === null)
              throw Error(s(166));
            return zt(e), null;
          }
          if (u = B.current, xn(e))
            ds(e);
          else {
            var c = $u(
              lt.current
            );
            switch (u) {
              case 1:
                u = c.createElementNS(
                  "http://www.w3.org/2000/svg",
                  a
                );
                break;
              case 2:
                u = c.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  a
                );
                break;
              default:
                switch (a) {
                  case "svg":
                    u = c.createElementNS(
                      "http://www.w3.org/2000/svg",
                      a
                    );
                    break;
                  case "math":
                    u = c.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      a
                    );
                    break;
                  case "script":
                    u = c.createElement("div"), u.innerHTML = "<script><\/script>", u = u.removeChild(
                      u.firstChild
                    );
                    break;
                  case "select":
                    u = typeof n.is == "string" ? c.createElement("select", {
                      is: n.is
                    }) : c.createElement("select"), n.multiple ? u.multiple = !0 : n.size && (u.size = n.size);
                    break;
                  default:
                    u = typeof n.is == "string" ? c.createElement(a, { is: n.is }) : c.createElement(a);
                }
            }
            u[kt] = e, u[ae] = n;
            t: for (c = e.child; c !== null; ) {
              if (c.tag === 5 || c.tag === 6)
                u.appendChild(c.stateNode);
              else if (c.tag !== 4 && c.tag !== 27 && c.child !== null) {
                c.child.return = c, c = c.child;
                continue;
              }
              if (c === e) break t;
              for (; c.sibling === null; ) {
                if (c.return === null || c.return === e)
                  break t;
                c = c.return;
              }
              c.sibling.return = c.return, c = c.sibling;
            }
            e.stateNode = u;
            t: switch (It(u, a, n), a) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                n = !!n.autoFocus;
                break t;
              case "img":
                n = !0;
                break t;
              default:
                n = !1;
            }
            n && Ie(e);
          }
        }
        return zt(e), Pc(
          e,
          e.type,
          t === null ? null : t.memoizedProps,
          e.pendingProps,
          l
        ), null;
      case 6:
        if (t && e.stateNode != null)
          t.memoizedProps !== n && Ie(e);
        else {
          if (typeof n != "string" && e.stateNode === null)
            throw Error(s(166));
          if (t = lt.current, xn(e)) {
            if (t = e.stateNode, l = e.memoizedProps, n = null, a = $t, a !== null)
              switch (a.tag) {
                case 27:
                case 5:
                  n = a.memoizedProps;
              }
            t[kt] = e, t = !!(t.nodeValue === l || n !== null && n.suppressHydrationWarning === !0 || _d(t.nodeValue, l)), t || ml(e, !0);
          } else
            t = $u(t).createTextNode(
              n
            ), t[kt] = e, e.stateNode = t;
        }
        return zt(e), null;
      case 31:
        if (l = e.memoizedState, t === null || t.memoizedState !== null) {
          if (n = xn(e), l !== null) {
            if (t === null) {
              if (!n) throw Error(s(318));
              if (t = e.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(557));
              t[kt] = e;
            } else
              Zl(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            zt(e), t = !1;
          } else
            l = oc(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = l), t = !0;
          if (!t)
            return e.flags & 256 ? (ge(e), e) : (ge(e), null);
          if ((e.flags & 128) !== 0)
            throw Error(s(558));
        }
        return zt(e), null;
      case 13:
        if (n = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (a = xn(e), n !== null && n.dehydrated !== null) {
            if (t === null) {
              if (!a) throw Error(s(318));
              if (a = e.memoizedState, a = a !== null ? a.dehydrated : null, !a) throw Error(s(317));
              a[kt] = e;
            } else
              Zl(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            zt(e), a = !1;
          } else
            a = oc(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = a), a = !0;
          if (!a)
            return e.flags & 256 ? (ge(e), e) : (ge(e), null);
        }
        return ge(e), (e.flags & 128) !== 0 ? (e.lanes = l, e) : (l = n !== null, t = t !== null && t.memoizedState !== null, l && (n = e.child, a = null, n.alternate !== null && n.alternate.memoizedState !== null && n.alternate.memoizedState.cachePool !== null && (a = n.alternate.memoizedState.cachePool.pool), u = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (u = n.memoizedState.cachePool.pool), u !== a && (n.flags |= 2048)), l !== t && l && (e.child.flags |= 8192), Uu(e, e.updateQueue), zt(e), null);
      case 4:
        return Mt(), t === null && Ef(e.stateNode.containerInfo), zt(e), null;
      case 10:
        return ke(e.type), zt(e), null;
      case 19:
        if (H(Rt), n = e.memoizedState, n === null) return zt(e), null;
        if (a = (e.flags & 128) !== 0, u = n.rendering, u === null)
          if (a) pa(n, !1);
          else {
            if (Ct !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = e.child; t !== null; ) {
                if (u = xu(t), u !== null) {
                  for (e.flags |= 128, pa(n, !1), t = u.updateQueue, e.updateQueue = t, Uu(e, t), e.subtreeFlags = 0, t = l, l = e.child; l !== null; )
                    cs(l, t), l = l.sibling;
                  return _(
                    Rt,
                    Rt.current & 1 | 2
                  ), dt && Ke(e, n.treeForkCount), e.child;
                }
                t = t.sibling;
              }
            n.tail !== null && re() > wu && (e.flags |= 128, a = !0, pa(n, !1), e.lanes = 4194304);
          }
        else {
          if (!a)
            if (t = xu(u), t !== null) {
              if (e.flags |= 128, a = !0, t = t.updateQueue, e.updateQueue = t, Uu(e, t), pa(n, !0), n.tail === null && n.tailMode === "hidden" && !u.alternate && !dt)
                return zt(e), null;
            } else
              2 * re() - n.renderingStartTime > wu && l !== 536870912 && (e.flags |= 128, a = !0, pa(n, !1), e.lanes = 4194304);
          n.isBackwards ? (u.sibling = e.child, e.child = u) : (t = n.last, t !== null ? t.sibling = u : e.child = u, n.last = u);
        }
        return n.tail !== null ? (t = n.tail, n.rendering = t, n.tail = t.sibling, n.renderingStartTime = re(), t.sibling = null, l = Rt.current, _(
          Rt,
          a ? l & 1 | 2 : l & 1
        ), dt && Ke(e, n.treeForkCount), t) : (zt(e), null);
      case 22:
      case 23:
        return ge(e), Ec(), n = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== n && (e.flags |= 8192) : n && (e.flags |= 8192), n ? (l & 536870912) !== 0 && (e.flags & 128) === 0 && (zt(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : zt(e), l = e.updateQueue, l !== null && Uu(e, l.retryQueue), l = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), n = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), n !== l && (e.flags |= 2048), t !== null && H(Kl), null;
      case 24:
        return l = null, t !== null && (l = t.memoizedState.cache), e.memoizedState.cache !== l && (e.flags |= 2048), ke(Yt), zt(e), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, e.tag));
  }
  function xy(t, e) {
    switch (cc(e), e.tag) {
      case 1:
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 3:
        return ke(Yt), Mt(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
      case 26:
      case 27:
      case 5:
        return Va(e), null;
      case 31:
        if (e.memoizedState !== null) {
          if (ge(e), e.alternate === null)
            throw Error(s(340));
          Zl();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 13:
        if (ge(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
          if (e.alternate === null)
            throw Error(s(340));
          Zl();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 19:
        return H(Rt), null;
      case 4:
        return Mt(), null;
      case 10:
        return ke(e.type), null;
      case 22:
      case 23:
        return ge(e), Ec(), t !== null && H(Kl), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 24:
        return ke(Yt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Ur(t, e) {
    switch (cc(e), e.tag) {
      case 3:
        ke(Yt), Mt();
        break;
      case 26:
      case 27:
      case 5:
        Va(e);
        break;
      case 4:
        Mt();
        break;
      case 31:
        e.memoizedState !== null && ge(e);
        break;
      case 13:
        ge(e);
        break;
      case 19:
        H(Rt);
        break;
      case 10:
        ke(e.type);
        break;
      case 22:
      case 23:
        ge(e), Ec(), t !== null && H(Kl);
        break;
      case 24:
        ke(Yt);
    }
  }
  function Sa(t, e) {
    try {
      var l = e.updateQueue, n = l !== null ? l.lastEffect : null;
      if (n !== null) {
        var a = n.next;
        l = a;
        do {
          if ((l.tag & t) === t) {
            n = void 0;
            var u = l.create, c = l.inst;
            n = u(), c.destroy = n;
          }
          l = l.next;
        } while (l !== a);
      }
    } catch (r) {
      bt(e, e.return, r);
    }
  }
  function Sl(t, e, l) {
    try {
      var n = e.updateQueue, a = n !== null ? n.lastEffect : null;
      if (a !== null) {
        var u = a.next;
        n = u;
        do {
          if ((n.tag & t) === t) {
            var c = n.inst, r = c.destroy;
            if (r !== void 0) {
              c.destroy = void 0, a = e;
              var m = l, x = r;
              try {
                x();
              } catch (C) {
                bt(
                  a,
                  m,
                  C
                );
              }
            }
          }
          n = n.next;
        } while (n !== u);
      }
    } catch (C) {
      bt(e, e.return, C);
    }
  }
  function Hr(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var l = t.stateNode;
      try {
        Ns(e, l);
      } catch (n) {
        bt(t, t.return, n);
      }
    }
  }
  function Br(t, e, l) {
    l.props = Fl(
      t.type,
      t.memoizedProps
    ), l.state = t.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (n) {
      bt(t, e, n);
    }
  }
  function xa(t, e) {
    try {
      var l = t.ref;
      if (l !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var n = t.stateNode;
            break;
          case 30:
            n = t.stateNode;
            break;
          default:
            n = t.stateNode;
        }
        typeof l == "function" ? t.refCleanup = l(n) : l.current = n;
      }
    } catch (a) {
      bt(t, e, a);
    }
  }
  function we(t, e) {
    var l = t.ref, n = t.refCleanup;
    if (l !== null)
      if (typeof n == "function")
        try {
          n();
        } catch (a) {
          bt(t, e, a);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (a) {
          bt(t, e, a);
        }
      else l.current = null;
  }
  function qr(t) {
    var e = t.type, l = t.memoizedProps, n = t.stateNode;
    try {
      t: switch (e) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          l.autoFocus && n.focus();
          break t;
        case "img":
          l.src ? n.src = l.src : l.srcSet && (n.srcset = l.srcSet);
      }
    } catch (a) {
      bt(t, t.return, a);
    }
  }
  function tf(t, e, l) {
    try {
      var n = t.stateNode;
      Zy(n, t.type, l, e), n[ae] = e;
    } catch (a) {
      bt(t, t.return, a);
    }
  }
  function Yr(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && zl(t.type) || t.tag === 4;
  }
  function ef(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Yr(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && zl(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function lf(t, e, l) {
    var n = t.tag;
    if (n === 5 || n === 6)
      t = t.stateNode, e ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(t, e) : (e = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, e.appendChild(t), l = l._reactRootContainer, l != null || e.onclick !== null || (e.onclick = Ze));
    else if (n !== 4 && (n === 27 && zl(t.type) && (l = t.stateNode, e = null), t = t.child, t !== null))
      for (lf(t, e, l), t = t.sibling; t !== null; )
        lf(t, e, l), t = t.sibling;
  }
  function Hu(t, e, l) {
    var n = t.tag;
    if (n === 5 || n === 6)
      t = t.stateNode, e ? l.insertBefore(t, e) : l.appendChild(t);
    else if (n !== 4 && (n === 27 && zl(t.type) && (l = t.stateNode), t = t.child, t !== null))
      for (Hu(t, e, l), t = t.sibling; t !== null; )
        Hu(t, e, l), t = t.sibling;
  }
  function wr(t) {
    var e = t.stateNode, l = t.memoizedProps;
    try {
      for (var n = t.type, a = e.attributes; a.length; )
        e.removeAttributeNode(a[0]);
      It(e, n, l), e[kt] = t, e[ae] = l;
    } catch (u) {
      bt(t, t.return, u);
    }
  }
  var Pe = !1, Xt = !1, nf = !1, Gr = typeof WeakSet == "function" ? WeakSet : Set, Jt = null;
  function Ey(t, e) {
    if (t = t.containerInfo, Nf = li, t = Io(t), Wi(t)) {
      if ("selectionStart" in t)
        var l = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        t: {
          l = (l = t.ownerDocument) && l.defaultView || window;
          var n = l.getSelection && l.getSelection();
          if (n && n.rangeCount !== 0) {
            l = n.anchorNode;
            var a = n.anchorOffset, u = n.focusNode;
            n = n.focusOffset;
            try {
              l.nodeType, u.nodeType;
            } catch {
              l = null;
              break t;
            }
            var c = 0, r = -1, m = -1, x = 0, C = 0, U = t, T = null;
            e: for (; ; ) {
              for (var A; U !== l || a !== 0 && U.nodeType !== 3 || (r = c + a), U !== u || n !== 0 && U.nodeType !== 3 || (m = c + n), U.nodeType === 3 && (c += U.nodeValue.length), (A = U.firstChild) !== null; )
                T = U, U = A;
              for (; ; ) {
                if (U === t) break e;
                if (T === l && ++x === a && (r = c), T === u && ++C === n && (m = c), (A = U.nextSibling) !== null) break;
                U = T, T = U.parentNode;
              }
              U = A;
            }
            l = r === -1 || m === -1 ? null : { start: r, end: m };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (Df = { focusedElem: t, selectionRange: l }, li = !1, Jt = e; Jt !== null; )
      if (e = Jt, t = e.child, (e.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = e, Jt = t;
      else
        for (; Jt !== null; ) {
          switch (e = Jt, u = e.alternate, t = e.flags, e.tag) {
            case 0:
              if ((t & 4) !== 0 && (t = e.updateQueue, t = t !== null ? t.events : null, t !== null))
                for (l = 0; l < t.length; l++)
                  a = t[l], a.ref.impl = a.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && u !== null) {
                t = void 0, l = e, a = u.memoizedProps, u = u.memoizedState, n = l.stateNode;
                try {
                  var K = Fl(
                    l.type,
                    a
                  );
                  t = n.getSnapshotBeforeUpdate(
                    K,
                    u
                  ), n.__reactInternalSnapshotBeforeUpdate = t;
                } catch (P) {
                  bt(
                    l,
                    l.return,
                    P
                  );
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (t = e.stateNode.containerInfo, l = t.nodeType, l === 9)
                  _f(t);
                else if (l === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      _f(t);
                      break;
                    default:
                      t.textContent = "";
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
              if ((t & 1024) !== 0) throw Error(s(163));
          }
          if (t = e.sibling, t !== null) {
            t.return = e.return, Jt = t;
            break;
          }
          Jt = e.return;
        }
  }
  function Xr(t, e, l) {
    var n = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        el(t, l), n & 4 && Sa(5, l);
        break;
      case 1:
        if (el(t, l), n & 4)
          if (t = l.stateNode, e === null)
            try {
              t.componentDidMount();
            } catch (c) {
              bt(l, l.return, c);
            }
          else {
            var a = Fl(
              l.type,
              e.memoizedProps
            );
            e = e.memoizedState;
            try {
              t.componentDidUpdate(
                a,
                e,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (c) {
              bt(
                l,
                l.return,
                c
              );
            }
          }
        n & 64 && Hr(l), n & 512 && xa(l, l.return);
        break;
      case 3:
        if (el(t, l), n & 64 && (t = l.updateQueue, t !== null)) {
          if (e = null, l.child !== null)
            switch (l.child.tag) {
              case 27:
              case 5:
                e = l.child.stateNode;
                break;
              case 1:
                e = l.child.stateNode;
            }
          try {
            Ns(t, e);
          } catch (c) {
            bt(l, l.return, c);
          }
        }
        break;
      case 27:
        e === null && n & 4 && wr(l);
      case 26:
      case 5:
        el(t, l), e === null && n & 4 && qr(l), n & 512 && xa(l, l.return);
        break;
      case 12:
        el(t, l);
        break;
      case 31:
        el(t, l), n & 4 && Lr(t, l);
        break;
      case 13:
        el(t, l), n & 4 && Vr(t, l), n & 64 && (t = l.memoizedState, t !== null && (t = t.dehydrated, t !== null && (l = Cy.bind(
          null,
          l
        ), Fy(t, l))));
        break;
      case 22:
        if (n = l.memoizedState !== null || Pe, !n) {
          e = e !== null && e.memoizedState !== null || Xt, a = Pe;
          var u = Xt;
          Pe = n, (Xt = e) && !u ? ll(
            t,
            l,
            (l.subtreeFlags & 8772) !== 0
          ) : el(t, l), Pe = a, Xt = u;
        }
        break;
      case 30:
        break;
      default:
        el(t, l);
    }
  }
  function Qr(t) {
    var e = t.alternate;
    e !== null && (t.alternate = null, Qr(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && Ri(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var _t = null, ie = !1;
  function tl(t, e, l) {
    for (l = l.child; l !== null; )
      Zr(t, e, l), l = l.sibling;
  }
  function Zr(t, e, l) {
    if (de && typeof de.onCommitFiberUnmount == "function")
      try {
        de.onCommitFiberUnmount(Vn, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        Xt || we(l, e), tl(
          t,
          e,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        Xt || we(l, e);
        var n = _t, a = ie;
        zl(l.type) && (_t = l.stateNode, ie = !1), tl(
          t,
          e,
          l
        ), ja(l.stateNode), _t = n, ie = a;
        break;
      case 5:
        Xt || we(l, e);
      case 6:
        if (n = _t, a = ie, _t = null, tl(
          t,
          e,
          l
        ), _t = n, ie = a, _t !== null)
          if (ie)
            try {
              (_t.nodeType === 9 ? _t.body : _t.nodeName === "HTML" ? _t.ownerDocument.body : _t).removeChild(l.stateNode);
            } catch (u) {
              bt(
                l,
                e,
                u
              );
            }
          else
            try {
              _t.removeChild(l.stateNode);
            } catch (u) {
              bt(
                l,
                e,
                u
              );
            }
        break;
      case 18:
        _t !== null && (ie ? (t = _t, Hd(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          l.stateNode
        ), Qn(t)) : Hd(_t, l.stateNode));
        break;
      case 4:
        n = _t, a = ie, _t = l.stateNode.containerInfo, ie = !0, tl(
          t,
          e,
          l
        ), _t = n, ie = a;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Sl(2, l, e), Xt || Sl(4, l, e), tl(
          t,
          e,
          l
        );
        break;
      case 1:
        Xt || (we(l, e), n = l.stateNode, typeof n.componentWillUnmount == "function" && Br(
          l,
          e,
          n
        )), tl(
          t,
          e,
          l
        );
        break;
      case 21:
        tl(
          t,
          e,
          l
        );
        break;
      case 22:
        Xt = (n = Xt) || l.memoizedState !== null, tl(
          t,
          e,
          l
        ), Xt = n;
        break;
      default:
        tl(
          t,
          e,
          l
        );
    }
  }
  function Lr(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        Qn(t);
      } catch (l) {
        bt(e, e.return, l);
      }
    }
  }
  function Vr(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        Qn(t);
      } catch (l) {
        bt(e, e.return, l);
      }
  }
  function Ty(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return e === null && (e = t.stateNode = new Gr()), e;
      case 22:
        return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new Gr()), e;
      default:
        throw Error(s(435, t.tag));
    }
  }
  function Bu(t, e) {
    var l = Ty(t);
    e.forEach(function(n) {
      if (!l.has(n)) {
        l.add(n);
        var a = My.bind(null, t, n);
        n.then(a, a);
      }
    });
  }
  function ce(t, e) {
    var l = e.deletions;
    if (l !== null)
      for (var n = 0; n < l.length; n++) {
        var a = l[n], u = t, c = e, r = c;
        t: for (; r !== null; ) {
          switch (r.tag) {
            case 27:
              if (zl(r.type)) {
                _t = r.stateNode, ie = !1;
                break t;
              }
              break;
            case 5:
              _t = r.stateNode, ie = !1;
              break t;
            case 3:
            case 4:
              _t = r.stateNode.containerInfo, ie = !0;
              break t;
          }
          r = r.return;
        }
        if (_t === null) throw Error(s(160));
        Zr(u, c, a), _t = null, ie = !1, u = a.alternate, u !== null && (u.return = null), a.return = null;
      }
    if (e.subtreeFlags & 13886)
      for (e = e.child; e !== null; )
        Kr(e, t), e = e.sibling;
  }
  var He = null;
  function Kr(t, e) {
    var l = t.alternate, n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ce(e, t), fe(t), n & 4 && (Sl(3, t, t.return), Sa(3, t), Sl(5, t, t.return));
        break;
      case 1:
        ce(e, t), fe(t), n & 512 && (Xt || l === null || we(l, l.return)), n & 64 && Pe && (t = t.updateQueue, t !== null && (n = t.callbacks, n !== null && (l = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = l === null ? n : l.concat(n))));
        break;
      case 26:
        var a = He;
        if (ce(e, t), fe(t), n & 512 && (Xt || l === null || we(l, l.return)), n & 4) {
          var u = l !== null ? l.memoizedState : null;
          if (n = t.memoizedState, l === null)
            if (n === null)
              if (t.stateNode === null) {
                t: {
                  n = t.type, l = t.memoizedProps, a = a.ownerDocument || a;
                  e: switch (n) {
                    case "title":
                      u = a.getElementsByTagName("title")[0], (!u || u[kn] || u[kt] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = a.createElement(n), a.head.insertBefore(
                        u,
                        a.querySelector("head > title")
                      )), It(u, n, l), u[kt] = t, Kt(u), n = u;
                      break t;
                    case "link":
                      var c = Kd(
                        "link",
                        "href",
                        a
                      ).get(n + (l.href || ""));
                      if (c) {
                        for (var r = 0; r < c.length; r++)
                          if (u = c[r], u.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && u.getAttribute("rel") === (l.rel == null ? null : l.rel) && u.getAttribute("title") === (l.title == null ? null : l.title) && u.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                            c.splice(r, 1);
                            break e;
                          }
                      }
                      u = a.createElement(n), It(u, n, l), a.head.appendChild(u);
                      break;
                    case "meta":
                      if (c = Kd(
                        "meta",
                        "content",
                        a
                      ).get(n + (l.content || ""))) {
                        for (r = 0; r < c.length; r++)
                          if (u = c[r], u.getAttribute("content") === (l.content == null ? null : "" + l.content) && u.getAttribute("name") === (l.name == null ? null : l.name) && u.getAttribute("property") === (l.property == null ? null : l.property) && u.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && u.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                            c.splice(r, 1);
                            break e;
                          }
                      }
                      u = a.createElement(n), It(u, n, l), a.head.appendChild(u);
                      break;
                    default:
                      throw Error(s(468, n));
                  }
                  u[kt] = t, Kt(u), n = u;
                }
                t.stateNode = n;
              } else
                Jd(
                  a,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = Vd(
                a,
                n,
                t.memoizedProps
              );
          else
            u !== n ? (u === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : u.count--, n === null ? Jd(
              a,
              t.type,
              t.stateNode
            ) : Vd(
              a,
              n,
              t.memoizedProps
            )) : n === null && t.stateNode !== null && tf(
              t,
              t.memoizedProps,
              l.memoizedProps
            );
        }
        break;
      case 27:
        ce(e, t), fe(t), n & 512 && (Xt || l === null || we(l, l.return)), l !== null && n & 4 && tf(
          t,
          t.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (ce(e, t), fe(t), n & 512 && (Xt || l === null || we(l, l.return)), t.flags & 32) {
          a = t.stateNode;
          try {
            rn(a, "");
          } catch (K) {
            bt(t, t.return, K);
          }
        }
        n & 4 && t.stateNode != null && (a = t.memoizedProps, tf(
          t,
          a,
          l !== null ? l.memoizedProps : a
        )), n & 1024 && (nf = !0);
        break;
      case 6:
        if (ce(e, t), fe(t), n & 4) {
          if (t.stateNode === null)
            throw Error(s(162));
          n = t.memoizedProps, l = t.stateNode;
          try {
            l.nodeValue = n;
          } catch (K) {
            bt(t, t.return, K);
          }
        }
        break;
      case 3:
        if (Iu = null, a = He, He = Wu(e.containerInfo), ce(e, t), He = a, fe(t), n & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            Qn(e.containerInfo);
          } catch (K) {
            bt(t, t.return, K);
          }
        nf && (nf = !1, Jr(t));
        break;
      case 4:
        n = He, He = Wu(
          t.stateNode.containerInfo
        ), ce(e, t), fe(t), He = n;
        break;
      case 12:
        ce(e, t), fe(t);
        break;
      case 31:
        ce(e, t), fe(t), n & 4 && (n = t.updateQueue, n !== null && (t.updateQueue = null, Bu(t, n)));
        break;
      case 13:
        ce(e, t), fe(t), t.child.flags & 8192 && t.memoizedState !== null != (l !== null && l.memoizedState !== null) && (Yu = re()), n & 4 && (n = t.updateQueue, n !== null && (t.updateQueue = null, Bu(t, n)));
        break;
      case 22:
        a = t.memoizedState !== null;
        var m = l !== null && l.memoizedState !== null, x = Pe, C = Xt;
        if (Pe = x || a, Xt = C || m, ce(e, t), Xt = C, Pe = x, fe(t), n & 8192)
          t: for (e = t.stateNode, e._visibility = a ? e._visibility & -2 : e._visibility | 1, a && (l === null || m || Pe || Xt || Il(t)), l = null, e = t; ; ) {
            if (e.tag === 5 || e.tag === 26) {
              if (l === null) {
                m = l = e;
                try {
                  if (u = m.stateNode, a)
                    c = u.style, typeof c.setProperty == "function" ? c.setProperty("display", "none", "important") : c.display = "none";
                  else {
                    r = m.stateNode;
                    var U = m.memoizedProps.style, T = U != null && U.hasOwnProperty("display") ? U.display : null;
                    r.style.display = T == null || typeof T == "boolean" ? "" : ("" + T).trim();
                  }
                } catch (K) {
                  bt(m, m.return, K);
                }
              }
            } else if (e.tag === 6) {
              if (l === null) {
                m = e;
                try {
                  m.stateNode.nodeValue = a ? "" : m.memoizedProps;
                } catch (K) {
                  bt(m, m.return, K);
                }
              }
            } else if (e.tag === 18) {
              if (l === null) {
                m = e;
                try {
                  var A = m.stateNode;
                  a ? Bd(A, !0) : Bd(m.stateNode, !1);
                } catch (K) {
                  bt(m, m.return, K);
                }
              }
            } else if ((e.tag !== 22 && e.tag !== 23 || e.memoizedState === null || e === t) && e.child !== null) {
              e.child.return = e, e = e.child;
              continue;
            }
            if (e === t) break t;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t) break t;
              l === e && (l = null), e = e.return;
            }
            l === e && (l = null), e.sibling.return = e.return, e = e.sibling;
          }
        n & 4 && (n = t.updateQueue, n !== null && (l = n.retryQueue, l !== null && (n.retryQueue = null, Bu(t, l))));
        break;
      case 19:
        ce(e, t), fe(t), n & 4 && (n = t.updateQueue, n !== null && (t.updateQueue = null, Bu(t, n)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        ce(e, t), fe(t);
    }
  }
  function fe(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var l, n = t.return; n !== null; ) {
          if (Yr(n)) {
            l = n;
            break;
          }
          n = n.return;
        }
        if (l == null) throw Error(s(160));
        switch (l.tag) {
          case 27:
            var a = l.stateNode, u = ef(t);
            Hu(t, u, a);
            break;
          case 5:
            var c = l.stateNode;
            l.flags & 32 && (rn(c, ""), l.flags &= -33);
            var r = ef(t);
            Hu(t, r, c);
            break;
          case 3:
          case 4:
            var m = l.stateNode.containerInfo, x = ef(t);
            lf(
              t,
              x,
              m
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (C) {
        bt(t, t.return, C);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function Jr(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        Jr(e), e.tag === 5 && e.flags & 1024 && e.stateNode.reset(), t = t.sibling;
      }
  }
  function el(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; )
        Xr(t, e.alternate, e), e = e.sibling;
  }
  function Il(t) {
    for (t = t.child; t !== null; ) {
      var e = t;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Sl(4, e, e.return), Il(e);
          break;
        case 1:
          we(e, e.return);
          var l = e.stateNode;
          typeof l.componentWillUnmount == "function" && Br(
            e,
            e.return,
            l
          ), Il(e);
          break;
        case 27:
          ja(e.stateNode);
        case 26:
        case 5:
          we(e, e.return), Il(e);
          break;
        case 22:
          e.memoizedState === null && Il(e);
          break;
        case 30:
          Il(e);
          break;
        default:
          Il(e);
      }
      t = t.sibling;
    }
  }
  function ll(t, e, l) {
    for (l = l && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
      var n = e.alternate, a = t, u = e, c = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          ll(
            a,
            u,
            l
          ), Sa(4, u);
          break;
        case 1:
          if (ll(
            a,
            u,
            l
          ), n = u, a = n.stateNode, typeof a.componentDidMount == "function")
            try {
              a.componentDidMount();
            } catch (x) {
              bt(n, n.return, x);
            }
          if (n = u, a = n.updateQueue, a !== null) {
            var r = n.stateNode;
            try {
              var m = a.shared.hiddenCallbacks;
              if (m !== null)
                for (a.shared.hiddenCallbacks = null, a = 0; a < m.length; a++)
                  As(m[a], r);
            } catch (x) {
              bt(n, n.return, x);
            }
          }
          l && c & 64 && Hr(u), xa(u, u.return);
          break;
        case 27:
          wr(u);
        case 26:
        case 5:
          ll(
            a,
            u,
            l
          ), l && n === null && c & 4 && qr(u), xa(u, u.return);
          break;
        case 12:
          ll(
            a,
            u,
            l
          );
          break;
        case 31:
          ll(
            a,
            u,
            l
          ), l && c & 4 && Lr(a, u);
          break;
        case 13:
          ll(
            a,
            u,
            l
          ), l && c & 4 && Vr(a, u);
          break;
        case 22:
          u.memoizedState === null && ll(
            a,
            u,
            l
          ), xa(u, u.return);
          break;
        case 30:
          break;
        default:
          ll(
            a,
            u,
            l
          );
      }
      e = e.sibling;
    }
  }
  function af(t, e) {
    var l = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== l && (t != null && t.refCount++, l != null && ca(l));
  }
  function uf(t, e) {
    t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && ca(t));
  }
  function Be(t, e, l, n) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        kr(
          t,
          e,
          l,
          n
        ), e = e.sibling;
  }
  function kr(t, e, l, n) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Be(
          t,
          e,
          l,
          n
        ), a & 2048 && Sa(9, e);
        break;
      case 1:
        Be(
          t,
          e,
          l,
          n
        );
        break;
      case 3:
        Be(
          t,
          e,
          l,
          n
        ), a & 2048 && (t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && ca(t)));
        break;
      case 12:
        if (a & 2048) {
          Be(
            t,
            e,
            l,
            n
          ), t = e.stateNode;
          try {
            var u = e.memoizedProps, c = u.id, r = u.onPostCommit;
            typeof r == "function" && r(
              c,
              e.alternate === null ? "mount" : "update",
              t.passiveEffectDuration,
              -0
            );
          } catch (m) {
            bt(e, e.return, m);
          }
        } else
          Be(
            t,
            e,
            l,
            n
          );
        break;
      case 31:
        Be(
          t,
          e,
          l,
          n
        );
        break;
      case 13:
        Be(
          t,
          e,
          l,
          n
        );
        break;
      case 23:
        break;
      case 22:
        u = e.stateNode, c = e.alternate, e.memoizedState !== null ? u._visibility & 2 ? Be(
          t,
          e,
          l,
          n
        ) : Ea(t, e) : u._visibility & 2 ? Be(
          t,
          e,
          l,
          n
        ) : (u._visibility |= 2, Cn(
          t,
          e,
          l,
          n,
          (e.subtreeFlags & 10256) !== 0 || !1
        )), a & 2048 && af(c, e);
        break;
      case 24:
        Be(
          t,
          e,
          l,
          n
        ), a & 2048 && uf(e.alternate, e);
        break;
      default:
        Be(
          t,
          e,
          l,
          n
        );
    }
  }
  function Cn(t, e, l, n, a) {
    for (a = a && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var u = t, c = e, r = l, m = n, x = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          Cn(
            u,
            c,
            r,
            m,
            a
          ), Sa(8, c);
          break;
        case 23:
          break;
        case 22:
          var C = c.stateNode;
          c.memoizedState !== null ? C._visibility & 2 ? Cn(
            u,
            c,
            r,
            m,
            a
          ) : Ea(
            u,
            c
          ) : (C._visibility |= 2, Cn(
            u,
            c,
            r,
            m,
            a
          )), a && x & 2048 && af(
            c.alternate,
            c
          );
          break;
        case 24:
          Cn(
            u,
            c,
            r,
            m,
            a
          ), a && x & 2048 && uf(c.alternate, c);
          break;
        default:
          Cn(
            u,
            c,
            r,
            m,
            a
          );
      }
      e = e.sibling;
    }
  }
  function Ea(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var l = t, n = e, a = n.flags;
        switch (n.tag) {
          case 22:
            Ea(l, n), a & 2048 && af(
              n.alternate,
              n
            );
            break;
          case 24:
            Ea(l, n), a & 2048 && uf(n.alternate, n);
            break;
          default:
            Ea(l, n);
        }
        e = e.sibling;
      }
  }
  var Ta = 8192;
  function Mn(t, e, l) {
    if (t.subtreeFlags & Ta)
      for (t = t.child; t !== null; )
        $r(
          t,
          e,
          l
        ), t = t.sibling;
  }
  function $r(t, e, l) {
    switch (t.tag) {
      case 26:
        Mn(
          t,
          e,
          l
        ), t.flags & Ta && t.memoizedState !== null && ov(
          l,
          He,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        Mn(
          t,
          e,
          l
        );
        break;
      case 3:
      case 4:
        var n = He;
        He = Wu(t.stateNode.containerInfo), Mn(
          t,
          e,
          l
        ), He = n;
        break;
      case 22:
        t.memoizedState === null && (n = t.alternate, n !== null && n.memoizedState !== null ? (n = Ta, Ta = 16777216, Mn(
          t,
          e,
          l
        ), Ta = n) : Mn(
          t,
          e,
          l
        ));
        break;
      default:
        Mn(
          t,
          e,
          l
        );
    }
  }
  function Wr(t) {
    var e = t.alternate;
    if (e !== null && (t = e.child, t !== null)) {
      e.child = null;
      do
        e = t.sibling, t.sibling = null, t = e;
      while (t !== null);
    }
  }
  function Aa(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var n = e[l];
          Jt = n, Ir(
            n,
            t
          );
        }
      Wr(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Fr(t), t = t.sibling;
  }
  function Fr(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Aa(t), t.flags & 2048 && Sl(9, t, t.return);
        break;
      case 3:
        Aa(t);
        break;
      case 12:
        Aa(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, qu(t)) : Aa(t);
        break;
      default:
        Aa(t);
    }
  }
  function qu(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var n = e[l];
          Jt = n, Ir(
            n,
            t
          );
        }
      Wr(t);
    }
    for (t = t.child; t !== null; ) {
      switch (e = t, e.tag) {
        case 0:
        case 11:
        case 15:
          Sl(8, e, e.return), qu(e);
          break;
        case 22:
          l = e.stateNode, l._visibility & 2 && (l._visibility &= -3, qu(e));
          break;
        default:
          qu(e);
      }
      t = t.sibling;
    }
  }
  function Ir(t, e) {
    for (; Jt !== null; ) {
      var l = Jt;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          Sl(8, l, e);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var n = l.memoizedState.cachePool.pool;
            n != null && n.refCount++;
          }
          break;
        case 24:
          ca(l.memoizedState.cache);
      }
      if (n = l.child, n !== null) n.return = l, Jt = n;
      else
        t: for (l = t; Jt !== null; ) {
          n = Jt;
          var a = n.sibling, u = n.return;
          if (Qr(n), n === l) {
            Jt = null;
            break t;
          }
          if (a !== null) {
            a.return = u, Jt = a;
            break t;
          }
          Jt = u;
        }
    }
  }
  var Ay = {
    getCacheForType: function(t) {
      var e = Wt(Yt), l = e.data.get(t);
      return l === void 0 && (l = t(), e.data.set(t, l)), l;
    },
    cacheSignal: function() {
      return Wt(Yt).controller.signal;
    }
  }, Ny = typeof WeakMap == "function" ? WeakMap : Map, yt = 0, Tt = null, ft = null, st = 0, gt = 0, be = null, xl = !1, Rn = !1, cf = !1, nl = 0, Ct = 0, El = 0, Pl = 0, ff = 0, pe = 0, Un = 0, Na = null, oe = null, of = !1, Yu = 0, Pr = 0, wu = 1 / 0, Gu = null, Tl = null, Zt = 0, Al = null, Hn = null, al = 0, sf = 0, rf = null, td = null, Da = 0, df = null;
  function Se() {
    return (yt & 2) !== 0 && st !== 0 ? st & -st : j.T !== null ? bf() : vo();
  }
  function ed() {
    if (pe === 0)
      if ((st & 536870912) === 0 || dt) {
        var t = ka;
        ka <<= 1, (ka & 3932160) === 0 && (ka = 262144), pe = t;
      } else pe = 536870912;
    return t = ve.current, t !== null && (t.flags |= 32), pe;
  }
  function se(t, e, l) {
    (t === Tt && (gt === 2 || gt === 9) || t.cancelPendingCommit !== null) && (Bn(t, 0), Nl(
      t,
      st,
      pe,
      !1
    )), Jn(t, l), ((yt & 2) === 0 || t !== Tt) && (t === Tt && ((yt & 2) === 0 && (Pl |= l), Ct === 4 && Nl(
      t,
      st,
      pe,
      !1
    )), Ge(t));
  }
  function ld(t, e, l) {
    if ((yt & 6) !== 0) throw Error(s(327));
    var n = !l && (e & 127) === 0 && (e & t.expiredLanes) === 0 || Kn(t, e), a = n ? Oy(t, e) : hf(t, e, !0), u = n;
    do {
      if (a === 0) {
        Rn && !n && Nl(t, e, 0, !1);
        break;
      } else {
        if (l = t.current.alternate, u && !Dy(l)) {
          a = hf(t, e, !1), u = !1;
          continue;
        }
        if (a === 2) {
          if (u = e, t.errorRecoveryDisabledLanes & u)
            var c = 0;
          else
            c = t.pendingLanes & -536870913, c = c !== 0 ? c : c & 536870912 ? 536870912 : 0;
          if (c !== 0) {
            e = c;
            t: {
              var r = t;
              a = Na;
              var m = r.current.memoizedState.isDehydrated;
              if (m && (Bn(r, c).flags |= 256), c = hf(
                r,
                c,
                !1
              ), c !== 2) {
                if (cf && !m) {
                  r.errorRecoveryDisabledLanes |= u, Pl |= u, a = 4;
                  break t;
                }
                u = oe, oe = a, u !== null && (oe === null ? oe = u : oe.push.apply(
                  oe,
                  u
                ));
              }
              a = c;
            }
            if (u = !1, a !== 2) continue;
          }
        }
        if (a === 1) {
          Bn(t, 0), Nl(t, e, 0, !0);
          break;
        }
        t: {
          switch (n = t, u = a, u) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((e & 4194048) !== e) break;
            case 6:
              Nl(
                n,
                e,
                pe,
                !xl
              );
              break t;
            case 2:
              oe = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((e & 62914560) === e && (a = Yu + 300 - re(), 10 < a)) {
            if (Nl(
              n,
              e,
              pe,
              !xl
            ), Wa(n, 0, !0) !== 0) break t;
            al = e, n.timeoutHandle = Rd(
              nd.bind(
                null,
                n,
                l,
                oe,
                Gu,
                of,
                e,
                pe,
                Pl,
                Un,
                xl,
                u,
                "Throttled",
                -0,
                0
              ),
              a
            );
            break t;
          }
          nd(
            n,
            l,
            oe,
            Gu,
            of,
            e,
            pe,
            Pl,
            Un,
            xl,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Ge(t);
  }
  function nd(t, e, l, n, a, u, c, r, m, x, C, U, T, A) {
    if (t.timeoutHandle = -1, U = e.subtreeFlags, U & 8192 || (U & 16785408) === 16785408) {
      U = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Ze
      }, $r(
        e,
        u,
        U
      );
      var K = (u & 62914560) === u ? Yu - re() : (u & 4194048) === u ? Pr - re() : 0;
      if (K = sv(
        U,
        K
      ), K !== null) {
        al = u, t.cancelPendingCommit = K(
          rd.bind(
            null,
            t,
            e,
            u,
            l,
            n,
            a,
            c,
            r,
            m,
            C,
            U,
            null,
            T,
            A
          )
        ), Nl(t, u, c, !x);
        return;
      }
    }
    rd(
      t,
      e,
      u,
      l,
      n,
      a,
      c,
      r,
      m
    );
  }
  function Dy(t) {
    for (var e = t; ; ) {
      var l = e.tag;
      if ((l === 0 || l === 11 || l === 15) && e.flags & 16384 && (l = e.updateQueue, l !== null && (l = l.stores, l !== null)))
        for (var n = 0; n < l.length; n++) {
          var a = l[n], u = a.getSnapshot;
          a = a.value;
          try {
            if (!he(u(), a)) return !1;
          } catch {
            return !1;
          }
        }
      if (l = e.child, e.subtreeFlags & 16384 && l !== null)
        l.return = e, e = l;
      else {
        if (e === t) break;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) return !0;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    }
    return !0;
  }
  function Nl(t, e, l, n) {
    e &= ~ff, e &= ~Pl, t.suspendedLanes |= e, t.pingedLanes &= ~e, n && (t.warmLanes |= e), n = t.expirationTimes;
    for (var a = e; 0 < a; ) {
      var u = 31 - me(a), c = 1 << u;
      n[u] = -1, a &= ~c;
    }
    l !== 0 && mo(t, l, e);
  }
  function Xu() {
    return (yt & 6) === 0 ? (za(0), !1) : !0;
  }
  function mf() {
    if (ft !== null) {
      if (gt === 0)
        var t = ft.return;
      else
        t = ft, Je = Ll = null, Oc(t), Dn = null, oa = 0, t = ft;
      for (; t !== null; )
        Ur(t.alternate, t), t = t.return;
      ft = null;
    }
  }
  function Bn(t, e) {
    var l = t.timeoutHandle;
    l !== -1 && (t.timeoutHandle = -1, Ky(l)), l = t.cancelPendingCommit, l !== null && (t.cancelPendingCommit = null, l()), al = 0, mf(), Tt = t, ft = l = Ve(t.current, null), st = e, gt = 0, be = null, xl = !1, Rn = Kn(t, e), cf = !1, Un = pe = ff = Pl = El = Ct = 0, oe = Na = null, of = !1, (e & 8) !== 0 && (e |= e & 32);
    var n = t.entangledLanes;
    if (n !== 0)
      for (t = t.entanglements, n &= e; 0 < n; ) {
        var a = 31 - me(n), u = 1 << a;
        e |= t[a], n &= ~u;
      }
    return nl = e, fu(), l;
  }
  function ad(t, e) {
    nt = null, j.H = ga, e === Nn || e === vu ? (e = Ss(), gt = 3) : e === vc ? (e = Ss(), gt = 4) : gt = e === Lc ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, be = e, ft === null && (Ct = 1, ju(
      t,
      Ne(e, t.current)
    ));
  }
  function ud() {
    var t = ve.current;
    return t === null ? !0 : (st & 4194048) === st ? _e === null : (st & 62914560) === st || (st & 536870912) !== 0 ? t === _e : !1;
  }
  function id() {
    var t = j.H;
    return j.H = ga, t === null ? ga : t;
  }
  function cd() {
    var t = j.A;
    return j.A = Ay, t;
  }
  function Qu() {
    Ct = 4, xl || (st & 4194048) !== st && ve.current !== null || (Rn = !0), (El & 134217727) === 0 && (Pl & 134217727) === 0 || Tt === null || Nl(
      Tt,
      st,
      pe,
      !1
    );
  }
  function hf(t, e, l) {
    var n = yt;
    yt |= 2;
    var a = id(), u = cd();
    (Tt !== t || st !== e) && (Gu = null, Bn(t, e)), e = !1;
    var c = Ct;
    t: do
      try {
        if (gt !== 0 && ft !== null) {
          var r = ft, m = be;
          switch (gt) {
            case 8:
              mf(), c = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              ve.current === null && (e = !0);
              var x = gt;
              if (gt = 0, be = null, qn(t, r, m, x), l && Rn) {
                c = 0;
                break t;
              }
              break;
            default:
              x = gt, gt = 0, be = null, qn(t, r, m, x);
          }
        }
        zy(), c = Ct;
        break;
      } catch (C) {
        ad(t, C);
      }
    while (!0);
    return e && t.shellSuspendCounter++, Je = Ll = null, yt = n, j.H = a, j.A = u, ft === null && (Tt = null, st = 0, fu()), c;
  }
  function zy() {
    for (; ft !== null; ) fd(ft);
  }
  function Oy(t, e) {
    var l = yt;
    yt |= 2;
    var n = id(), a = cd();
    Tt !== t || st !== e ? (Gu = null, wu = re() + 500, Bn(t, e)) : Rn = Kn(
      t,
      e
    );
    t: do
      try {
        if (gt !== 0 && ft !== null) {
          e = ft;
          var u = be;
          e: switch (gt) {
            case 1:
              gt = 0, be = null, qn(t, e, u, 1);
              break;
            case 2:
            case 9:
              if (bs(u)) {
                gt = 0, be = null, od(e);
                break;
              }
              e = function() {
                gt !== 2 && gt !== 9 || Tt !== t || (gt = 7), Ge(t);
              }, u.then(e, e);
              break t;
            case 3:
              gt = 7;
              break t;
            case 4:
              gt = 5;
              break t;
            case 7:
              bs(u) ? (gt = 0, be = null, od(e)) : (gt = 0, be = null, qn(t, e, u, 7));
              break;
            case 5:
              var c = null;
              switch (ft.tag) {
                case 26:
                  c = ft.memoizedState;
                case 5:
                case 27:
                  var r = ft;
                  if (c ? kd(c) : r.stateNode.complete) {
                    gt = 0, be = null;
                    var m = r.sibling;
                    if (m !== null) ft = m;
                    else {
                      var x = r.return;
                      x !== null ? (ft = x, Zu(x)) : ft = null;
                    }
                    break e;
                  }
              }
              gt = 0, be = null, qn(t, e, u, 5);
              break;
            case 6:
              gt = 0, be = null, qn(t, e, u, 6);
              break;
            case 8:
              mf(), Ct = 6;
              break t;
            default:
              throw Error(s(462));
          }
        }
        _y();
        break;
      } catch (C) {
        ad(t, C);
      }
    while (!0);
    return Je = Ll = null, j.H = n, j.A = a, yt = l, ft !== null ? 0 : (Tt = null, st = 0, fu(), Ct);
  }
  function _y() {
    for (; ft !== null && !Im(); )
      fd(ft);
  }
  function fd(t) {
    var e = Mr(t.alternate, t, nl);
    t.memoizedProps = t.pendingProps, e === null ? Zu(t) : ft = e;
  }
  function od(t) {
    var e = t, l = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = Dr(
          l,
          e,
          e.pendingProps,
          e.type,
          void 0,
          st
        );
        break;
      case 11:
        e = Dr(
          l,
          e,
          e.pendingProps,
          e.type.render,
          e.ref,
          st
        );
        break;
      case 5:
        Oc(e);
      default:
        Ur(l, e), e = ft = cs(e, nl), e = Mr(l, e, nl);
    }
    t.memoizedProps = t.pendingProps, e === null ? Zu(t) : ft = e;
  }
  function qn(t, e, l, n) {
    Je = Ll = null, Oc(e), Dn = null, oa = 0;
    var a = e.return;
    try {
      if (gy(
        t,
        a,
        e,
        l,
        st
      )) {
        Ct = 1, ju(
          t,
          Ne(l, t.current)
        ), ft = null;
        return;
      }
    } catch (u) {
      if (a !== null) throw ft = a, u;
      Ct = 1, ju(
        t,
        Ne(l, t.current)
      ), ft = null;
      return;
    }
    e.flags & 32768 ? (dt || n === 1 ? t = !0 : Rn || (st & 536870912) !== 0 ? t = !1 : (xl = t = !0, (n === 2 || n === 9 || n === 3 || n === 6) && (n = ve.current, n !== null && n.tag === 13 && (n.flags |= 16384))), sd(e, t)) : Zu(e);
  }
  function Zu(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        sd(
          e,
          xl
        );
        return;
      }
      t = e.return;
      var l = Sy(
        e.alternate,
        e,
        nl
      );
      if (l !== null) {
        ft = l;
        return;
      }
      if (e = e.sibling, e !== null) {
        ft = e;
        return;
      }
      ft = e = t;
    } while (e !== null);
    Ct === 0 && (Ct = 5);
  }
  function sd(t, e) {
    do {
      var l = xy(t.alternate, t);
      if (l !== null) {
        l.flags &= 32767, ft = l;
        return;
      }
      if (l = t.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !e && (t = t.sibling, t !== null)) {
        ft = t;
        return;
      }
      ft = t = l;
    } while (t !== null);
    Ct = 6, ft = null;
  }
  function rd(t, e, l, n, a, u, c, r, m) {
    t.cancelPendingCommit = null;
    do
      Lu();
    while (Zt !== 0);
    if ((yt & 6) !== 0) throw Error(s(327));
    if (e !== null) {
      if (e === t.current) throw Error(s(177));
      if (u = e.lanes | e.childLanes, u |= ec, fh(
        t,
        l,
        u,
        c,
        r,
        m
      ), t === Tt && (ft = Tt = null, st = 0), Hn = e, Al = t, al = l, sf = u, rf = a, td = n, (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, Ry(Ka, function() {
        return vd(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), n = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || n) {
        n = j.T, j.T = null, a = Z.p, Z.p = 2, c = yt, yt |= 4;
        try {
          Ey(t, e, l);
        } finally {
          yt = c, Z.p = a, j.T = n;
        }
      }
      Zt = 1, dd(), md(), hd();
    }
  }
  function dd() {
    if (Zt === 1) {
      Zt = 0;
      var t = Al, e = Hn, l = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || l) {
        l = j.T, j.T = null;
        var n = Z.p;
        Z.p = 2;
        var a = yt;
        yt |= 4;
        try {
          Kr(e, t);
          var u = Df, c = Io(t.containerInfo), r = u.focusedElem, m = u.selectionRange;
          if (c !== r && r && r.ownerDocument && Fo(
            r.ownerDocument.documentElement,
            r
          )) {
            if (m !== null && Wi(r)) {
              var x = m.start, C = m.end;
              if (C === void 0 && (C = x), "selectionStart" in r)
                r.selectionStart = x, r.selectionEnd = Math.min(
                  C,
                  r.value.length
                );
              else {
                var U = r.ownerDocument || document, T = U && U.defaultView || window;
                if (T.getSelection) {
                  var A = T.getSelection(), K = r.textContent.length, P = Math.min(m.start, K), xt = m.end === void 0 ? P : Math.min(m.end, K);
                  !A.extend && P > xt && (c = xt, xt = P, P = c);
                  var g = Wo(
                    r,
                    P
                  ), y = Wo(
                    r,
                    xt
                  );
                  if (g && y && (A.rangeCount !== 1 || A.anchorNode !== g.node || A.anchorOffset !== g.offset || A.focusNode !== y.node || A.focusOffset !== y.offset)) {
                    var S = U.createRange();
                    S.setStart(g.node, g.offset), A.removeAllRanges(), P > xt ? (A.addRange(S), A.extend(y.node, y.offset)) : (S.setEnd(y.node, y.offset), A.addRange(S));
                  }
                }
              }
            }
            for (U = [], A = r; A = A.parentNode; )
              A.nodeType === 1 && U.push({
                element: A,
                left: A.scrollLeft,
                top: A.scrollTop
              });
            for (typeof r.focus == "function" && r.focus(), r = 0; r < U.length; r++) {
              var R = U[r];
              R.element.scrollLeft = R.left, R.element.scrollTop = R.top;
            }
          }
          li = !!Nf, Df = Nf = null;
        } finally {
          yt = a, Z.p = n, j.T = l;
        }
      }
      t.current = e, Zt = 2;
    }
  }
  function md() {
    if (Zt === 2) {
      Zt = 0;
      var t = Al, e = Hn, l = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || l) {
        l = j.T, j.T = null;
        var n = Z.p;
        Z.p = 2;
        var a = yt;
        yt |= 4;
        try {
          Xr(t, e.alternate, e);
        } finally {
          yt = a, Z.p = n, j.T = l;
        }
      }
      Zt = 3;
    }
  }
  function hd() {
    if (Zt === 4 || Zt === 3) {
      Zt = 0, Pm();
      var t = Al, e = Hn, l = al, n = td;
      (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? Zt = 5 : (Zt = 0, Hn = Al = null, yd(t, t.pendingLanes));
      var a = t.pendingLanes;
      if (a === 0 && (Tl = null), Ci(l), e = e.stateNode, de && typeof de.onCommitFiberRoot == "function")
        try {
          de.onCommitFiberRoot(
            Vn,
            e,
            void 0,
            (e.current.flags & 128) === 128
          );
        } catch {
        }
      if (n !== null) {
        e = j.T, a = Z.p, Z.p = 2, j.T = null;
        try {
          for (var u = t.onRecoverableError, c = 0; c < n.length; c++) {
            var r = n[c];
            u(r.value, {
              componentStack: r.stack
            });
          }
        } finally {
          j.T = e, Z.p = a;
        }
      }
      (al & 3) !== 0 && Lu(), Ge(t), a = t.pendingLanes, (l & 261930) !== 0 && (a & 42) !== 0 ? t === df ? Da++ : (Da = 0, df = t) : Da = 0, za(0);
    }
  }
  function yd(t, e) {
    (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, ca(e)));
  }
  function Lu() {
    return dd(), md(), hd(), vd();
  }
  function vd() {
    if (Zt !== 5) return !1;
    var t = Al, e = sf;
    sf = 0;
    var l = Ci(al), n = j.T, a = Z.p;
    try {
      Z.p = 32 > l ? 32 : l, j.T = null, l = rf, rf = null;
      var u = Al, c = al;
      if (Zt = 0, Hn = Al = null, al = 0, (yt & 6) !== 0) throw Error(s(331));
      var r = yt;
      if (yt |= 4, Fr(u.current), kr(
        u,
        u.current,
        c,
        l
      ), yt = r, za(0, !1), de && typeof de.onPostCommitFiberRoot == "function")
        try {
          de.onPostCommitFiberRoot(Vn, u);
        } catch {
        }
      return !0;
    } finally {
      Z.p = a, j.T = n, yd(t, e);
    }
  }
  function gd(t, e, l) {
    e = Ne(l, e), e = Zc(t.stateNode, e, 2), t = gl(t, e, 2), t !== null && (Jn(t, 2), Ge(t));
  }
  function bt(t, e, l) {
    if (t.tag === 3)
      gd(t, t, l);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          gd(
            e,
            t,
            l
          );
          break;
        } else if (e.tag === 1) {
          var n = e.stateNode;
          if (typeof e.type.getDerivedStateFromError == "function" || typeof n.componentDidCatch == "function" && (Tl === null || !Tl.has(n))) {
            t = Ne(l, t), l = br(2), n = gl(e, l, 2), n !== null && (pr(
              l,
              n,
              e,
              t
            ), Jn(n, 2), Ge(n));
            break;
          }
        }
        e = e.return;
      }
  }
  function yf(t, e, l) {
    var n = t.pingCache;
    if (n === null) {
      n = t.pingCache = new Ny();
      var a = /* @__PURE__ */ new Set();
      n.set(e, a);
    } else
      a = n.get(e), a === void 0 && (a = /* @__PURE__ */ new Set(), n.set(e, a));
    a.has(l) || (cf = !0, a.add(l), t = jy.bind(null, t, e, l), e.then(t, t));
  }
  function jy(t, e, l) {
    var n = t.pingCache;
    n !== null && n.delete(e), t.pingedLanes |= t.suspendedLanes & l, t.warmLanes &= ~l, Tt === t && (st & l) === l && (Ct === 4 || Ct === 3 && (st & 62914560) === st && 300 > re() - Yu ? (yt & 2) === 0 && Bn(t, 0) : ff |= l, Un === st && (Un = 0)), Ge(t);
  }
  function bd(t, e) {
    e === 0 && (e = ro()), t = Xl(t, e), t !== null && (Jn(t, e), Ge(t));
  }
  function Cy(t) {
    var e = t.memoizedState, l = 0;
    e !== null && (l = e.retryLane), bd(t, l);
  }
  function My(t, e) {
    var l = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var n = t.stateNode, a = t.memoizedState;
        a !== null && (l = a.retryLane);
        break;
      case 19:
        n = t.stateNode;
        break;
      case 22:
        n = t.stateNode._retryCache;
        break;
      default:
        throw Error(s(314));
    }
    n !== null && n.delete(e), bd(t, l);
  }
  function Ry(t, e) {
    return zi(t, e);
  }
  var Vu = null, Yn = null, vf = !1, Ku = !1, gf = !1, Dl = 0;
  function Ge(t) {
    t !== Yn && t.next === null && (Yn === null ? Vu = Yn = t : Yn = Yn.next = t), Ku = !0, vf || (vf = !0, Hy());
  }
  function za(t, e) {
    if (!gf && Ku) {
      gf = !0;
      do
        for (var l = !1, n = Vu; n !== null; ) {
          if (t !== 0) {
            var a = n.pendingLanes;
            if (a === 0) var u = 0;
            else {
              var c = n.suspendedLanes, r = n.pingedLanes;
              u = (1 << 31 - me(42 | t) + 1) - 1, u &= a & ~(c & ~r), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (l = !0, Ed(n, u));
          } else
            u = st, u = Wa(
              n,
              n === Tt ? u : 0,
              n.cancelPendingCommit !== null || n.timeoutHandle !== -1
            ), (u & 3) === 0 || Kn(n, u) || (l = !0, Ed(n, u));
          n = n.next;
        }
      while (l);
      gf = !1;
    }
  }
  function Uy() {
    pd();
  }
  function pd() {
    Ku = vf = !1;
    var t = 0;
    Dl !== 0 && Vy() && (t = Dl);
    for (var e = re(), l = null, n = Vu; n !== null; ) {
      var a = n.next, u = Sd(n, e);
      u === 0 ? (n.next = null, l === null ? Vu = a : l.next = a, a === null && (Yn = l)) : (l = n, (t !== 0 || (u & 3) !== 0) && (Ku = !0)), n = a;
    }
    Zt !== 0 && Zt !== 5 || za(t), Dl !== 0 && (Dl = 0);
  }
  function Sd(t, e) {
    for (var l = t.suspendedLanes, n = t.pingedLanes, a = t.expirationTimes, u = t.pendingLanes & -62914561; 0 < u; ) {
      var c = 31 - me(u), r = 1 << c, m = a[c];
      m === -1 ? ((r & l) === 0 || (r & n) !== 0) && (a[c] = ch(r, e)) : m <= e && (t.expiredLanes |= r), u &= ~r;
    }
    if (e = Tt, l = st, l = Wa(
      t,
      t === e ? l : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), n = t.callbackNode, l === 0 || t === e && (gt === 2 || gt === 9) || t.cancelPendingCommit !== null)
      return n !== null && n !== null && Oi(n), t.callbackNode = null, t.callbackPriority = 0;
    if ((l & 3) === 0 || Kn(t, l)) {
      if (e = l & -l, e === t.callbackPriority) return e;
      switch (n !== null && Oi(n), Ci(l)) {
        case 2:
        case 8:
          l = oo;
          break;
        case 32:
          l = Ka;
          break;
        case 268435456:
          l = so;
          break;
        default:
          l = Ka;
      }
      return n = xd.bind(null, t), l = zi(l, n), t.callbackPriority = e, t.callbackNode = l, e;
    }
    return n !== null && n !== null && Oi(n), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function xd(t, e) {
    if (Zt !== 0 && Zt !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var l = t.callbackNode;
    if (Lu() && t.callbackNode !== l)
      return null;
    var n = st;
    return n = Wa(
      t,
      t === Tt ? n : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), n === 0 ? null : (ld(t, n, e), Sd(t, re()), t.callbackNode != null && t.callbackNode === l ? xd.bind(null, t) : null);
  }
  function Ed(t, e) {
    if (Lu()) return null;
    ld(t, e, !0);
  }
  function Hy() {
    Jy(function() {
      (yt & 6) !== 0 ? zi(
        fo,
        Uy
      ) : pd();
    });
  }
  function bf() {
    if (Dl === 0) {
      var t = Tn;
      t === 0 && (t = Ja, Ja <<= 1, (Ja & 261888) === 0 && (Ja = 256)), Dl = t;
    }
    return Dl;
  }
  function Td(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : tu("" + t);
  }
  function Ad(t, e) {
    var l = e.ownerDocument.createElement("input");
    return l.name = e.name, l.value = e.value, t.id && l.setAttribute("form", t.id), e.parentNode.insertBefore(l, e), t = new FormData(t), l.parentNode.removeChild(l), t;
  }
  function By(t, e, l, n, a) {
    if (e === "submit" && l && l.stateNode === a) {
      var u = Td(
        (a[ae] || null).action
      ), c = n.submitter;
      c && (e = (e = c[ae] || null) ? Td(e.formAction) : c.getAttribute("formAction"), e !== null && (u = e, c = null));
      var r = new au(
        "action",
        "action",
        null,
        n,
        a
      );
      t.push({
        event: r,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (n.defaultPrevented) {
                if (Dl !== 0) {
                  var m = c ? Ad(a, c) : new FormData(a);
                  qc(
                    l,
                    {
                      pending: !0,
                      data: m,
                      method: a.method,
                      action: u
                    },
                    null,
                    m
                  );
                }
              } else
                typeof u == "function" && (r.preventDefault(), m = c ? Ad(a, c) : new FormData(a), qc(
                  l,
                  {
                    pending: !0,
                    data: m,
                    method: a.method,
                    action: u
                  },
                  u,
                  m
                ));
            },
            currentTarget: a
          }
        ]
      });
    }
  }
  for (var pf = 0; pf < tc.length; pf++) {
    var Sf = tc[pf], qy = Sf.toLowerCase(), Yy = Sf[0].toUpperCase() + Sf.slice(1);
    Ue(
      qy,
      "on" + Yy
    );
  }
  Ue(es, "onAnimationEnd"), Ue(ls, "onAnimationIteration"), Ue(ns, "onAnimationStart"), Ue("dblclick", "onDoubleClick"), Ue("focusin", "onFocus"), Ue("focusout", "onBlur"), Ue(ty, "onTransitionRun"), Ue(ey, "onTransitionStart"), Ue(ly, "onTransitionCancel"), Ue(as, "onTransitionEnd"), on("onMouseEnter", ["mouseout", "mouseover"]), on("onMouseLeave", ["mouseout", "mouseover"]), on("onPointerEnter", ["pointerout", "pointerover"]), on("onPointerLeave", ["pointerout", "pointerover"]), ql(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), ql(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), ql("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), ql(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), ql(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), ql(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Oa = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), wy = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Oa)
  );
  function Nd(t, e) {
    e = (e & 4) !== 0;
    for (var l = 0; l < t.length; l++) {
      var n = t[l], a = n.event;
      n = n.listeners;
      t: {
        var u = void 0;
        if (e)
          for (var c = n.length - 1; 0 <= c; c--) {
            var r = n[c], m = r.instance, x = r.currentTarget;
            if (r = r.listener, m !== u && a.isPropagationStopped())
              break t;
            u = r, a.currentTarget = x;
            try {
              u(a);
            } catch (C) {
              cu(C);
            }
            a.currentTarget = null, u = m;
          }
        else
          for (c = 0; c < n.length; c++) {
            if (r = n[c], m = r.instance, x = r.currentTarget, r = r.listener, m !== u && a.isPropagationStopped())
              break t;
            u = r, a.currentTarget = x;
            try {
              u(a);
            } catch (C) {
              cu(C);
            }
            a.currentTarget = null, u = m;
          }
      }
    }
  }
  function ot(t, e) {
    var l = e[Mi];
    l === void 0 && (l = e[Mi] = /* @__PURE__ */ new Set());
    var n = t + "__bubble";
    l.has(n) || (Dd(e, t, 2, !1), l.add(n));
  }
  function xf(t, e, l) {
    var n = 0;
    e && (n |= 4), Dd(
      l,
      t,
      n,
      e
    );
  }
  var Ju = "_reactListening" + Math.random().toString(36).slice(2);
  function Ef(t) {
    if (!t[Ju]) {
      t[Ju] = !0, po.forEach(function(l) {
        l !== "selectionchange" && (wy.has(l) || xf(l, !1, t), xf(l, !0, t));
      });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[Ju] || (e[Ju] = !0, xf("selectionchange", !1, e));
    }
  }
  function Dd(t, e, l, n) {
    switch (em(e)) {
      case 2:
        var a = mv;
        break;
      case 8:
        a = hv;
        break;
      default:
        a = qf;
    }
    l = a.bind(
      null,
      e,
      l,
      t
    ), a = void 0, !Xi || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (a = !0), n ? a !== void 0 ? t.addEventListener(e, l, {
      capture: !0,
      passive: a
    }) : t.addEventListener(e, l, !0) : a !== void 0 ? t.addEventListener(e, l, {
      passive: a
    }) : t.addEventListener(e, l, !1);
  }
  function Tf(t, e, l, n, a) {
    var u = n;
    if ((e & 1) === 0 && (e & 2) === 0 && n !== null)
      t: for (; ; ) {
        if (n === null) return;
        var c = n.tag;
        if (c === 3 || c === 4) {
          var r = n.stateNode.containerInfo;
          if (r === a) break;
          if (c === 4)
            for (c = n.return; c !== null; ) {
              var m = c.tag;
              if ((m === 3 || m === 4) && c.stateNode.containerInfo === a)
                return;
              c = c.return;
            }
          for (; r !== null; ) {
            if (c = un(r), c === null) return;
            if (m = c.tag, m === 5 || m === 6 || m === 26 || m === 27) {
              n = u = c;
              continue t;
            }
            r = r.parentNode;
          }
        }
        n = n.return;
      }
    Co(function() {
      var x = u, C = wi(l), U = [];
      t: {
        var T = us.get(t);
        if (T !== void 0) {
          var A = au, K = t;
          switch (t) {
            case "keypress":
              if (lu(l) === 0) break t;
            case "keydown":
            case "keyup":
              A = Mh;
              break;
            case "focusin":
              K = "focus", A = Vi;
              break;
            case "focusout":
              K = "blur", A = Vi;
              break;
            case "beforeblur":
            case "afterblur":
              A = Vi;
              break;
            case "click":
              if (l.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              A = Uo;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              A = Sh;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              A = Hh;
              break;
            case es:
            case ls:
            case ns:
              A = Th;
              break;
            case as:
              A = qh;
              break;
            case "scroll":
            case "scrollend":
              A = bh;
              break;
            case "wheel":
              A = wh;
              break;
            case "copy":
            case "cut":
            case "paste":
              A = Nh;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              A = Bo;
              break;
            case "toggle":
            case "beforetoggle":
              A = Xh;
          }
          var P = (e & 4) !== 0, xt = !P && (t === "scroll" || t === "scrollend"), g = P ? T !== null ? T + "Capture" : null : T;
          P = [];
          for (var y = x, S; y !== null; ) {
            var R = y;
            if (S = R.stateNode, R = R.tag, R !== 5 && R !== 26 && R !== 27 || S === null || g === null || (R = Wn(y, g), R != null && P.push(
              _a(y, R, S)
            )), xt) break;
            y = y.return;
          }
          0 < P.length && (T = new A(
            T,
            K,
            null,
            l,
            C
          ), U.push({ event: T, listeners: P }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (T = t === "mouseover" || t === "pointerover", A = t === "mouseout" || t === "pointerout", T && l !== Yi && (K = l.relatedTarget || l.fromElement) && (un(K) || K[an]))
            break t;
          if ((A || T) && (T = C.window === C ? C : (T = C.ownerDocument) ? T.defaultView || T.parentWindow : window, A ? (K = l.relatedTarget || l.toElement, A = x, K = K ? un(K) : null, K !== null && (xt = z(K), P = K.tag, K !== xt || P !== 5 && P !== 27 && P !== 6) && (K = null)) : (A = null, K = x), A !== K)) {
            if (P = Uo, R = "onMouseLeave", g = "onMouseEnter", y = "mouse", (t === "pointerout" || t === "pointerover") && (P = Bo, R = "onPointerLeave", g = "onPointerEnter", y = "pointer"), xt = A == null ? T : $n(A), S = K == null ? T : $n(K), T = new P(
              R,
              y + "leave",
              A,
              l,
              C
            ), T.target = xt, T.relatedTarget = S, R = null, un(C) === x && (P = new P(
              g,
              y + "enter",
              K,
              l,
              C
            ), P.target = S, P.relatedTarget = xt, R = P), xt = R, A && K)
              e: {
                for (P = Gy, g = A, y = K, S = 0, R = g; R; R = P(R))
                  S++;
                R = 0;
                for (var W = y; W; W = P(W))
                  R++;
                for (; 0 < S - R; )
                  g = P(g), S--;
                for (; 0 < R - S; )
                  y = P(y), R--;
                for (; S--; ) {
                  if (g === y || y !== null && g === y.alternate) {
                    P = g;
                    break e;
                  }
                  g = P(g), y = P(y);
                }
                P = null;
              }
            else P = null;
            A !== null && zd(
              U,
              T,
              A,
              P,
              !1
            ), K !== null && xt !== null && zd(
              U,
              xt,
              K,
              P,
              !0
            );
          }
        }
        t: {
          if (T = x ? $n(x) : window, A = T.nodeName && T.nodeName.toLowerCase(), A === "select" || A === "input" && T.type === "file")
            var mt = Lo;
          else if (Qo(T))
            if (Vo)
              mt = Fh;
            else {
              mt = $h;
              var J = kh;
            }
          else
            A = T.nodeName, !A || A.toLowerCase() !== "input" || T.type !== "checkbox" && T.type !== "radio" ? x && qi(x.elementType) && (mt = Lo) : mt = Wh;
          if (mt && (mt = mt(t, x))) {
            Zo(
              U,
              mt,
              l,
              C
            );
            break t;
          }
          J && J(t, T, x), t === "focusout" && x && T.type === "number" && x.memoizedProps.value != null && Bi(T, "number", T.value);
        }
        switch (J = x ? $n(x) : window, t) {
          case "focusin":
            (Qo(J) || J.contentEditable === "true") && (yn = J, Fi = x, aa = null);
            break;
          case "focusout":
            aa = Fi = yn = null;
            break;
          case "mousedown":
            Ii = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Ii = !1, Po(U, l, C);
            break;
          case "selectionchange":
            if (Ph) break;
          case "keydown":
          case "keyup":
            Po(U, l, C);
        }
        var at;
        if (Ji)
          t: {
            switch (t) {
              case "compositionstart":
                var rt = "onCompositionStart";
                break t;
              case "compositionend":
                rt = "onCompositionEnd";
                break t;
              case "compositionupdate":
                rt = "onCompositionUpdate";
                break t;
            }
            rt = void 0;
          }
        else
          hn ? Go(t, l) && (rt = "onCompositionEnd") : t === "keydown" && l.keyCode === 229 && (rt = "onCompositionStart");
        rt && (qo && l.locale !== "ko" && (hn || rt !== "onCompositionStart" ? rt === "onCompositionEnd" && hn && (at = Mo()) : (sl = C, Qi = "value" in sl ? sl.value : sl.textContent, hn = !0)), J = ku(x, rt), 0 < J.length && (rt = new Ho(
          rt,
          t,
          null,
          l,
          C
        ), U.push({ event: rt, listeners: J }), at ? rt.data = at : (at = Xo(l), at !== null && (rt.data = at)))), (at = Zh ? Lh(t, l) : Vh(t, l)) && (rt = ku(x, "onBeforeInput"), 0 < rt.length && (J = new Ho(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          C
        ), U.push({
          event: J,
          listeners: rt
        }), J.data = at)), By(
          U,
          t,
          x,
          l,
          C
        );
      }
      Nd(U, e);
    });
  }
  function _a(t, e, l) {
    return {
      instance: t,
      listener: e,
      currentTarget: l
    };
  }
  function ku(t, e) {
    for (var l = e + "Capture", n = []; t !== null; ) {
      var a = t, u = a.stateNode;
      if (a = a.tag, a !== 5 && a !== 26 && a !== 27 || u === null || (a = Wn(t, l), a != null && n.unshift(
        _a(t, a, u)
      ), a = Wn(t, e), a != null && n.push(
        _a(t, a, u)
      )), t.tag === 3) return n;
      t = t.return;
    }
    return [];
  }
  function Gy(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function zd(t, e, l, n, a) {
    for (var u = e._reactName, c = []; l !== null && l !== n; ) {
      var r = l, m = r.alternate, x = r.stateNode;
      if (r = r.tag, m !== null && m === n) break;
      r !== 5 && r !== 26 && r !== 27 || x === null || (m = x, a ? (x = Wn(l, u), x != null && c.unshift(
        _a(l, x, m)
      )) : a || (x = Wn(l, u), x != null && c.push(
        _a(l, x, m)
      ))), l = l.return;
    }
    c.length !== 0 && t.push({ event: e, listeners: c });
  }
  var Xy = /\r\n?/g, Qy = /\u0000|\uFFFD/g;
  function Od(t) {
    return (typeof t == "string" ? t : "" + t).replace(Xy, `
`).replace(Qy, "");
  }
  function _d(t, e) {
    return e = Od(e), Od(t) === e;
  }
  function St(t, e, l, n, a, u) {
    switch (l) {
      case "children":
        typeof n == "string" ? e === "body" || e === "textarea" && n === "" || rn(t, n) : (typeof n == "number" || typeof n == "bigint") && e !== "body" && rn(t, "" + n);
        break;
      case "className":
        Ia(t, "class", n);
        break;
      case "tabIndex":
        Ia(t, "tabindex", n);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ia(t, l, n);
        break;
      case "style":
        _o(t, n, u);
        break;
      case "data":
        if (e !== "object") {
          Ia(t, "data", n);
          break;
        }
      case "src":
      case "href":
        if (n === "" && (e !== "a" || l !== "href")) {
          t.removeAttribute(l);
          break;
        }
        if (n == null || typeof n == "function" || typeof n == "symbol" || typeof n == "boolean") {
          t.removeAttribute(l);
          break;
        }
        n = tu("" + n), t.setAttribute(l, n);
        break;
      case "action":
      case "formAction":
        if (typeof n == "function") {
          t.setAttribute(
            l,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof u == "function" && (l === "formAction" ? (e !== "input" && St(t, e, "name", a.name, a, null), St(
            t,
            e,
            "formEncType",
            a.formEncType,
            a,
            null
          ), St(
            t,
            e,
            "formMethod",
            a.formMethod,
            a,
            null
          ), St(
            t,
            e,
            "formTarget",
            a.formTarget,
            a,
            null
          )) : (St(t, e, "encType", a.encType, a, null), St(t, e, "method", a.method, a, null), St(t, e, "target", a.target, a, null)));
        if (n == null || typeof n == "symbol" || typeof n == "boolean") {
          t.removeAttribute(l);
          break;
        }
        n = tu("" + n), t.setAttribute(l, n);
        break;
      case "onClick":
        n != null && (t.onclick = Ze);
        break;
      case "onScroll":
        n != null && ot("scroll", t);
        break;
      case "onScrollEnd":
        n != null && ot("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (n != null) {
          if (typeof n != "object" || !("__html" in n))
            throw Error(s(61));
          if (l = n.__html, l != null) {
            if (a.children != null) throw Error(s(60));
            t.innerHTML = l;
          }
        }
        break;
      case "multiple":
        t.multiple = n && typeof n != "function" && typeof n != "symbol";
        break;
      case "muted":
        t.muted = n && typeof n != "function" && typeof n != "symbol";
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
        if (n == null || typeof n == "function" || typeof n == "boolean" || typeof n == "symbol") {
          t.removeAttribute("xlink:href");
          break;
        }
        l = tu("" + n), t.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          l
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
        n != null && typeof n != "function" && typeof n != "symbol" ? t.setAttribute(l, "" + n) : t.removeAttribute(l);
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
        n && typeof n != "function" && typeof n != "symbol" ? t.setAttribute(l, "") : t.removeAttribute(l);
        break;
      case "capture":
      case "download":
        n === !0 ? t.setAttribute(l, "") : n !== !1 && n != null && typeof n != "function" && typeof n != "symbol" ? t.setAttribute(l, n) : t.removeAttribute(l);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        n != null && typeof n != "function" && typeof n != "symbol" && !isNaN(n) && 1 <= n ? t.setAttribute(l, n) : t.removeAttribute(l);
        break;
      case "rowSpan":
      case "start":
        n == null || typeof n == "function" || typeof n == "symbol" || isNaN(n) ? t.removeAttribute(l) : t.setAttribute(l, n);
        break;
      case "popover":
        ot("beforetoggle", t), ot("toggle", t), Fa(t, "popover", n);
        break;
      case "xlinkActuate":
        Qe(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          n
        );
        break;
      case "xlinkArcrole":
        Qe(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          n
        );
        break;
      case "xlinkRole":
        Qe(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          n
        );
        break;
      case "xlinkShow":
        Qe(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          n
        );
        break;
      case "xlinkTitle":
        Qe(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          n
        );
        break;
      case "xlinkType":
        Qe(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          n
        );
        break;
      case "xmlBase":
        Qe(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          n
        );
        break;
      case "xmlLang":
        Qe(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          n
        );
        break;
      case "xmlSpace":
        Qe(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          n
        );
        break;
      case "is":
        Fa(t, "is", n);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = vh.get(l) || l, Fa(t, l, n));
    }
  }
  function Af(t, e, l, n, a, u) {
    switch (l) {
      case "style":
        _o(t, n, u);
        break;
      case "dangerouslySetInnerHTML":
        if (n != null) {
          if (typeof n != "object" || !("__html" in n))
            throw Error(s(61));
          if (l = n.__html, l != null) {
            if (a.children != null) throw Error(s(60));
            t.innerHTML = l;
          }
        }
        break;
      case "children":
        typeof n == "string" ? rn(t, n) : (typeof n == "number" || typeof n == "bigint") && rn(t, "" + n);
        break;
      case "onScroll":
        n != null && ot("scroll", t);
        break;
      case "onScrollEnd":
        n != null && ot("scrollend", t);
        break;
      case "onClick":
        n != null && (t.onclick = Ze);
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
        if (!So.hasOwnProperty(l))
          t: {
            if (l[0] === "o" && l[1] === "n" && (a = l.endsWith("Capture"), e = l.slice(2, a ? l.length - 7 : void 0), u = t[ae] || null, u = u != null ? u[l] : null, typeof u == "function" && t.removeEventListener(e, u, a), typeof n == "function")) {
              typeof u != "function" && u !== null && (l in t ? t[l] = null : t.hasAttribute(l) && t.removeAttribute(l)), t.addEventListener(e, n, a);
              break t;
            }
            l in t ? t[l] = n : n === !0 ? t.setAttribute(l, "") : Fa(t, l, n);
          }
    }
  }
  function It(t, e, l) {
    switch (e) {
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
        ot("error", t), ot("load", t);
        var n = !1, a = !1, u;
        for (u in l)
          if (l.hasOwnProperty(u)) {
            var c = l[u];
            if (c != null)
              switch (u) {
                case "src":
                  n = !0;
                  break;
                case "srcSet":
                  a = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(s(137, e));
                default:
                  St(t, e, u, c, l, null);
              }
          }
        a && St(t, e, "srcSet", l.srcSet, l, null), n && St(t, e, "src", l.src, l, null);
        return;
      case "input":
        ot("invalid", t);
        var r = u = c = a = null, m = null, x = null;
        for (n in l)
          if (l.hasOwnProperty(n)) {
            var C = l[n];
            if (C != null)
              switch (n) {
                case "name":
                  a = C;
                  break;
                case "type":
                  c = C;
                  break;
                case "checked":
                  m = C;
                  break;
                case "defaultChecked":
                  x = C;
                  break;
                case "value":
                  u = C;
                  break;
                case "defaultValue":
                  r = C;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (C != null)
                    throw Error(s(137, e));
                  break;
                default:
                  St(t, e, n, C, l, null);
              }
          }
        No(
          t,
          u,
          r,
          m,
          x,
          c,
          a,
          !1
        );
        return;
      case "select":
        ot("invalid", t), n = c = u = null;
        for (a in l)
          if (l.hasOwnProperty(a) && (r = l[a], r != null))
            switch (a) {
              case "value":
                u = r;
                break;
              case "defaultValue":
                c = r;
                break;
              case "multiple":
                n = r;
              default:
                St(t, e, a, r, l, null);
            }
        e = u, l = c, t.multiple = !!n, e != null ? sn(t, !!n, e, !1) : l != null && sn(t, !!n, l, !0);
        return;
      case "textarea":
        ot("invalid", t), u = a = n = null;
        for (c in l)
          if (l.hasOwnProperty(c) && (r = l[c], r != null))
            switch (c) {
              case "value":
                n = r;
                break;
              case "defaultValue":
                a = r;
                break;
              case "children":
                u = r;
                break;
              case "dangerouslySetInnerHTML":
                if (r != null) throw Error(s(91));
                break;
              default:
                St(t, e, c, r, l, null);
            }
        zo(t, n, a, u);
        return;
      case "option":
        for (m in l)
          l.hasOwnProperty(m) && (n = l[m], n != null) && (m === "selected" ? t.selected = n && typeof n != "function" && typeof n != "symbol" : St(t, e, m, n, l, null));
        return;
      case "dialog":
        ot("beforetoggle", t), ot("toggle", t), ot("cancel", t), ot("close", t);
        break;
      case "iframe":
      case "object":
        ot("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < Oa.length; n++)
          ot(Oa[n], t);
        break;
      case "image":
        ot("error", t), ot("load", t);
        break;
      case "details":
        ot("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        ot("error", t), ot("load", t);
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
        for (x in l)
          if (l.hasOwnProperty(x) && (n = l[x], n != null))
            switch (x) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, e));
              default:
                St(t, e, x, n, l, null);
            }
        return;
      default:
        if (qi(e)) {
          for (C in l)
            l.hasOwnProperty(C) && (n = l[C], n !== void 0 && Af(
              t,
              e,
              C,
              n,
              l,
              void 0
            ));
          return;
        }
    }
    for (r in l)
      l.hasOwnProperty(r) && (n = l[r], n != null && St(t, e, r, n, l, null));
  }
  function Zy(t, e, l, n) {
    switch (e) {
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
        var a = null, u = null, c = null, r = null, m = null, x = null, C = null;
        for (A in l) {
          var U = l[A];
          if (l.hasOwnProperty(A) && U != null)
            switch (A) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                m = U;
              default:
                n.hasOwnProperty(A) || St(t, e, A, null, n, U);
            }
        }
        for (var T in n) {
          var A = n[T];
          if (U = l[T], n.hasOwnProperty(T) && (A != null || U != null))
            switch (T) {
              case "type":
                u = A;
                break;
              case "name":
                a = A;
                break;
              case "checked":
                x = A;
                break;
              case "defaultChecked":
                C = A;
                break;
              case "value":
                c = A;
                break;
              case "defaultValue":
                r = A;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (A != null)
                  throw Error(s(137, e));
                break;
              default:
                A !== U && St(
                  t,
                  e,
                  T,
                  A,
                  n,
                  U
                );
            }
        }
        Hi(
          t,
          c,
          r,
          m,
          x,
          C,
          u,
          a
        );
        return;
      case "select":
        A = c = r = T = null;
        for (u in l)
          if (m = l[u], l.hasOwnProperty(u) && m != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                A = m;
              default:
                n.hasOwnProperty(u) || St(
                  t,
                  e,
                  u,
                  null,
                  n,
                  m
                );
            }
        for (a in n)
          if (u = n[a], m = l[a], n.hasOwnProperty(a) && (u != null || m != null))
            switch (a) {
              case "value":
                T = u;
                break;
              case "defaultValue":
                r = u;
                break;
              case "multiple":
                c = u;
              default:
                u !== m && St(
                  t,
                  e,
                  a,
                  u,
                  n,
                  m
                );
            }
        e = r, l = c, n = A, T != null ? sn(t, !!l, T, !1) : !!n != !!l && (e != null ? sn(t, !!l, e, !0) : sn(t, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        A = T = null;
        for (r in l)
          if (a = l[r], l.hasOwnProperty(r) && a != null && !n.hasOwnProperty(r))
            switch (r) {
              case "value":
                break;
              case "children":
                break;
              default:
                St(t, e, r, null, n, a);
            }
        for (c in n)
          if (a = n[c], u = l[c], n.hasOwnProperty(c) && (a != null || u != null))
            switch (c) {
              case "value":
                T = a;
                break;
              case "defaultValue":
                A = a;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (a != null) throw Error(s(91));
                break;
              default:
                a !== u && St(t, e, c, a, n, u);
            }
        Do(t, T, A);
        return;
      case "option":
        for (var K in l)
          T = l[K], l.hasOwnProperty(K) && T != null && !n.hasOwnProperty(K) && (K === "selected" ? t.selected = !1 : St(
            t,
            e,
            K,
            null,
            n,
            T
          ));
        for (m in n)
          T = n[m], A = l[m], n.hasOwnProperty(m) && T !== A && (T != null || A != null) && (m === "selected" ? t.selected = T && typeof T != "function" && typeof T != "symbol" : St(
            t,
            e,
            m,
            T,
            n,
            A
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
        for (var P in l)
          T = l[P], l.hasOwnProperty(P) && T != null && !n.hasOwnProperty(P) && St(t, e, P, null, n, T);
        for (x in n)
          if (T = n[x], A = l[x], n.hasOwnProperty(x) && T !== A && (T != null || A != null))
            switch (x) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (T != null)
                  throw Error(s(137, e));
                break;
              default:
                St(
                  t,
                  e,
                  x,
                  T,
                  n,
                  A
                );
            }
        return;
      default:
        if (qi(e)) {
          for (var xt in l)
            T = l[xt], l.hasOwnProperty(xt) && T !== void 0 && !n.hasOwnProperty(xt) && Af(
              t,
              e,
              xt,
              void 0,
              n,
              T
            );
          for (C in n)
            T = n[C], A = l[C], !n.hasOwnProperty(C) || T === A || T === void 0 && A === void 0 || Af(
              t,
              e,
              C,
              T,
              n,
              A
            );
          return;
        }
    }
    for (var g in l)
      T = l[g], l.hasOwnProperty(g) && T != null && !n.hasOwnProperty(g) && St(t, e, g, null, n, T);
    for (U in n)
      T = n[U], A = l[U], !n.hasOwnProperty(U) || T === A || T == null && A == null || St(t, e, U, T, n, A);
  }
  function jd(t) {
    switch (t) {
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
  function Ly() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, e = 0, l = performance.getEntriesByType("resource"), n = 0; n < l.length; n++) {
        var a = l[n], u = a.transferSize, c = a.initiatorType, r = a.duration;
        if (u && r && jd(c)) {
          for (c = 0, r = a.responseEnd, n += 1; n < l.length; n++) {
            var m = l[n], x = m.startTime;
            if (x > r) break;
            var C = m.transferSize, U = m.initiatorType;
            C && jd(U) && (m = m.responseEnd, c += C * (m < r ? 1 : (r - x) / (m - x)));
          }
          if (--n, e += 8 * (u + c) / (a.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var Nf = null, Df = null;
  function $u(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Cd(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Md(t, e) {
    if (t === 0)
      switch (e) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && e === "foreignObject" ? 0 : t;
  }
  function zf(t, e) {
    return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
  }
  var Of = null;
  function Vy() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Of ? !1 : (Of = t, !0) : (Of = null, !1);
  }
  var Rd = typeof setTimeout == "function" ? setTimeout : void 0, Ky = typeof clearTimeout == "function" ? clearTimeout : void 0, Ud = typeof Promise == "function" ? Promise : void 0, Jy = typeof queueMicrotask == "function" ? queueMicrotask : typeof Ud < "u" ? function(t) {
    return Ud.resolve(null).then(t).catch(ky);
  } : Rd;
  function ky(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function zl(t) {
    return t === "head";
  }
  function Hd(t, e) {
    var l = e, n = 0;
    do {
      var a = l.nextSibling;
      if (t.removeChild(l), a && a.nodeType === 8)
        if (l = a.data, l === "/$" || l === "/&") {
          if (n === 0) {
            t.removeChild(a), Qn(e);
            return;
          }
          n--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          n++;
        else if (l === "html")
          ja(t.ownerDocument.documentElement);
        else if (l === "head") {
          l = t.ownerDocument.head, ja(l);
          for (var u = l.firstChild; u; ) {
            var c = u.nextSibling, r = u.nodeName;
            u[kn] || r === "SCRIPT" || r === "STYLE" || r === "LINK" && u.rel.toLowerCase() === "stylesheet" || l.removeChild(u), u = c;
          }
        } else
          l === "body" && ja(t.ownerDocument.body);
      l = a;
    } while (l);
    Qn(e);
  }
  function Bd(t, e) {
    var l = t;
    t = 0;
    do {
      var n = l.nextSibling;
      if (l.nodeType === 1 ? e ? (l._stashedDisplay = l.style.display, l.style.display = "none") : (l.style.display = l._stashedDisplay || "", l.getAttribute("style") === "" && l.removeAttribute("style")) : l.nodeType === 3 && (e ? (l._stashedText = l.nodeValue, l.nodeValue = "") : l.nodeValue = l._stashedText || ""), n && n.nodeType === 8)
        if (l = n.data, l === "/$") {
          if (t === 0) break;
          t--;
        } else
          l !== "$" && l !== "$?" && l !== "$~" && l !== "$!" || t++;
      l = n;
    } while (l);
  }
  function _f(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var l = e;
      switch (e = e.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          _f(l), Ri(l);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (l.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(l);
    }
  }
  function $y(t, e, l, n) {
    for (; t.nodeType === 1; ) {
      var a = l;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!n && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (n) {
        if (!t[kn])
          switch (e) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (u = t.getAttribute("rel"), u === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (u !== a.rel || t.getAttribute("href") !== (a.href == null || a.href === "" ? null : a.href) || t.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin) || t.getAttribute("title") !== (a.title == null ? null : a.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (u = t.getAttribute("src"), (u !== (a.src == null ? null : a.src) || t.getAttribute("type") !== (a.type == null ? null : a.type) || t.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin)) && u && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (e === "input" && t.type === "hidden") {
        var u = a.name == null ? null : "" + a.name;
        if (a.type === "hidden" && t.getAttribute("name") === u)
          return t;
      } else return t;
      if (t = je(t.nextSibling), t === null) break;
    }
    return null;
  }
  function Wy(t, e, l) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = je(t.nextSibling), t === null)) return null;
    return t;
  }
  function qd(t, e) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = je(t.nextSibling), t === null)) return null;
    return t;
  }
  function jf(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Cf(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function Fy(t, e) {
    var l = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = e;
    else if (t.data !== "$?" || l.readyState !== "loading")
      e();
    else {
      var n = function() {
        e(), l.removeEventListener("DOMContentLoaded", n);
      };
      l.addEventListener("DOMContentLoaded", n), t._reactRetry = n;
    }
  }
  function je(t) {
    for (; t != null; t = t.nextSibling) {
      var e = t.nodeType;
      if (e === 1 || e === 3) break;
      if (e === 8) {
        if (e = t.data, e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&" || e === "F!" || e === "F")
          break;
        if (e === "/$" || e === "/&") return null;
      }
    }
    return t;
  }
  var Mf = null;
  function Yd(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === "/$" || l === "/&") {
          if (e === 0)
            return je(t.nextSibling);
          e--;
        } else
          l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&" || e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function wd(t) {
    t = t.previousSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&") {
          if (e === 0) return t;
          e--;
        } else l !== "/$" && l !== "/&" || e++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function Gd(t, e, l) {
    switch (e = $u(l), t) {
      case "html":
        if (t = e.documentElement, !t) throw Error(s(452));
        return t;
      case "head":
        if (t = e.head, !t) throw Error(s(453));
        return t;
      case "body":
        if (t = e.body, !t) throw Error(s(454));
        return t;
      default:
        throw Error(s(451));
    }
  }
  function ja(t) {
    for (var e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    Ri(t);
  }
  var Ce = /* @__PURE__ */ new Map(), Xd = /* @__PURE__ */ new Set();
  function Wu(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var ul = Z.d;
  Z.d = {
    f: Iy,
    r: Py,
    D: tv,
    C: ev,
    L: lv,
    m: nv,
    X: uv,
    S: av,
    M: iv
  };
  function Iy() {
    var t = ul.f(), e = Xu();
    return t || e;
  }
  function Py(t) {
    var e = cn(t);
    e !== null && e.tag === 5 && e.type === "form" ? ar(e) : ul.r(t);
  }
  var wn = typeof document > "u" ? null : document;
  function Qd(t, e, l) {
    var n = wn;
    if (n && typeof e == "string" && e) {
      var a = Te(e);
      a = 'link[rel="' + t + '"][href="' + a + '"]', typeof l == "string" && (a += '[crossorigin="' + l + '"]'), Xd.has(a) || (Xd.add(a), t = { rel: t, crossOrigin: l, href: e }, n.querySelector(a) === null && (e = n.createElement("link"), It(e, "link", t), Kt(e), n.head.appendChild(e)));
    }
  }
  function tv(t) {
    ul.D(t), Qd("dns-prefetch", t, null);
  }
  function ev(t, e) {
    ul.C(t, e), Qd("preconnect", t, e);
  }
  function lv(t, e, l) {
    ul.L(t, e, l);
    var n = wn;
    if (n && t && e) {
      var a = 'link[rel="preload"][as="' + Te(e) + '"]';
      e === "image" && l && l.imageSrcSet ? (a += '[imagesrcset="' + Te(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (a += '[imagesizes="' + Te(
        l.imageSizes
      ) + '"]')) : a += '[href="' + Te(t) + '"]';
      var u = a;
      switch (e) {
        case "style":
          u = Gn(t);
          break;
        case "script":
          u = Xn(t);
      }
      Ce.has(u) || (t = b(
        {
          rel: "preload",
          href: e === "image" && l && l.imageSrcSet ? void 0 : t,
          as: e
        },
        l
      ), Ce.set(u, t), n.querySelector(a) !== null || e === "style" && n.querySelector(Ca(u)) || e === "script" && n.querySelector(Ma(u)) || (e = n.createElement("link"), It(e, "link", t), Kt(e), n.head.appendChild(e)));
    }
  }
  function nv(t, e) {
    ul.m(t, e);
    var l = wn;
    if (l && t) {
      var n = e && typeof e.as == "string" ? e.as : "script", a = 'link[rel="modulepreload"][as="' + Te(n) + '"][href="' + Te(t) + '"]', u = a;
      switch (n) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = Xn(t);
      }
      if (!Ce.has(u) && (t = b({ rel: "modulepreload", href: t }, e), Ce.set(u, t), l.querySelector(a) === null)) {
        switch (n) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(Ma(u)))
              return;
        }
        n = l.createElement("link"), It(n, "link", t), Kt(n), l.head.appendChild(n);
      }
    }
  }
  function av(t, e, l) {
    ul.S(t, e, l);
    var n = wn;
    if (n && t) {
      var a = fn(n).hoistableStyles, u = Gn(t);
      e = e || "default";
      var c = a.get(u);
      if (!c) {
        var r = { loading: 0, preload: null };
        if (c = n.querySelector(
          Ca(u)
        ))
          r.loading = 5;
        else {
          t = b(
            { rel: "stylesheet", href: t, "data-precedence": e },
            l
          ), (l = Ce.get(u)) && Rf(t, l);
          var m = c = n.createElement("link");
          Kt(m), It(m, "link", t), m._p = new Promise(function(x, C) {
            m.onload = x, m.onerror = C;
          }), m.addEventListener("load", function() {
            r.loading |= 1;
          }), m.addEventListener("error", function() {
            r.loading |= 2;
          }), r.loading |= 4, Fu(c, e, n);
        }
        c = {
          type: "stylesheet",
          instance: c,
          count: 1,
          state: r
        }, a.set(u, c);
      }
    }
  }
  function uv(t, e) {
    ul.X(t, e);
    var l = wn;
    if (l && t) {
      var n = fn(l).hoistableScripts, a = Xn(t), u = n.get(a);
      u || (u = l.querySelector(Ma(a)), u || (t = b({ src: t, async: !0 }, e), (e = Ce.get(a)) && Uf(t, e), u = l.createElement("script"), Kt(u), It(u, "link", t), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, n.set(a, u));
    }
  }
  function iv(t, e) {
    ul.M(t, e);
    var l = wn;
    if (l && t) {
      var n = fn(l).hoistableScripts, a = Xn(t), u = n.get(a);
      u || (u = l.querySelector(Ma(a)), u || (t = b({ src: t, async: !0, type: "module" }, e), (e = Ce.get(a)) && Uf(t, e), u = l.createElement("script"), Kt(u), It(u, "link", t), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, n.set(a, u));
    }
  }
  function Zd(t, e, l, n) {
    var a = (a = lt.current) ? Wu(a) : null;
    if (!a) throw Error(s(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (e = Gn(l.href), l = fn(
          a
        ).hoistableStyles, n = l.get(e), n || (n = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, l.set(e, n)), n) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          t = Gn(l.href);
          var u = fn(
            a
          ).hoistableStyles, c = u.get(t);
          if (c || (a = a.ownerDocument || a, c = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(t, c), (u = a.querySelector(
            Ca(t)
          )) && !u._p && (c.instance = u, c.state.loading = 5), Ce.has(t) || (l = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, Ce.set(t, l), u || cv(
            a,
            t,
            l,
            c.state
          ))), e && n === null)
            throw Error(s(528, ""));
          return c;
        }
        if (e && n !== null)
          throw Error(s(529, ""));
        return null;
      case "script":
        return e = l.async, l = l.src, typeof l == "string" && e && typeof e != "function" && typeof e != "symbol" ? (e = Xn(l), l = fn(
          a
        ).hoistableScripts, n = l.get(e), n || (n = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, l.set(e, n)), n) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(s(444, t));
    }
  }
  function Gn(t) {
    return 'href="' + Te(t) + '"';
  }
  function Ca(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Ld(t) {
    return b({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function cv(t, e, l, n) {
    t.querySelector('link[rel="preload"][as="style"][' + e + "]") ? n.loading = 1 : (e = t.createElement("link"), n.preload = e, e.addEventListener("load", function() {
      return n.loading |= 1;
    }), e.addEventListener("error", function() {
      return n.loading |= 2;
    }), It(e, "link", l), Kt(e), t.head.appendChild(e));
  }
  function Xn(t) {
    return '[src="' + Te(t) + '"]';
  }
  function Ma(t) {
    return "script[async]" + t;
  }
  function Vd(t, e, l) {
    if (e.count++, e.instance === null)
      switch (e.type) {
        case "style":
          var n = t.querySelector(
            'style[data-href~="' + Te(l.href) + '"]'
          );
          if (n)
            return e.instance = n, Kt(n), n;
          var a = b({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return n = (t.ownerDocument || t).createElement(
            "style"
          ), Kt(n), It(n, "style", a), Fu(n, l.precedence, t), e.instance = n;
        case "stylesheet":
          a = Gn(l.href);
          var u = t.querySelector(
            Ca(a)
          );
          if (u)
            return e.state.loading |= 4, e.instance = u, Kt(u), u;
          n = Ld(l), (a = Ce.get(a)) && Rf(n, a), u = (t.ownerDocument || t).createElement("link"), Kt(u);
          var c = u;
          return c._p = new Promise(function(r, m) {
            c.onload = r, c.onerror = m;
          }), It(u, "link", n), e.state.loading |= 4, Fu(u, l.precedence, t), e.instance = u;
        case "script":
          return u = Xn(l.src), (a = t.querySelector(
            Ma(u)
          )) ? (e.instance = a, Kt(a), a) : (n = l, (a = Ce.get(u)) && (n = b({}, l), Uf(n, a)), t = t.ownerDocument || t, a = t.createElement("script"), Kt(a), It(a, "link", n), t.head.appendChild(a), e.instance = a);
        case "void":
          return null;
        default:
          throw Error(s(443, e.type));
      }
    else
      e.type === "stylesheet" && (e.state.loading & 4) === 0 && (n = e.instance, e.state.loading |= 4, Fu(n, l.precedence, t));
    return e.instance;
  }
  function Fu(t, e, l) {
    for (var n = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), a = n.length ? n[n.length - 1] : null, u = a, c = 0; c < n.length; c++) {
      var r = n[c];
      if (r.dataset.precedence === e) u = r;
      else if (u !== a) break;
    }
    u ? u.parentNode.insertBefore(t, u.nextSibling) : (e = l.nodeType === 9 ? l.head : l, e.insertBefore(t, e.firstChild));
  }
  function Rf(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
  }
  function Uf(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
  }
  var Iu = null;
  function Kd(t, e, l) {
    if (Iu === null) {
      var n = /* @__PURE__ */ new Map(), a = Iu = /* @__PURE__ */ new Map();
      a.set(l, n);
    } else
      a = Iu, n = a.get(l), n || (n = /* @__PURE__ */ new Map(), a.set(l, n));
    if (n.has(t)) return n;
    for (n.set(t, null), l = l.getElementsByTagName(t), a = 0; a < l.length; a++) {
      var u = l[a];
      if (!(u[kn] || u[kt] || t === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var c = u.getAttribute(e) || "";
        c = t + c;
        var r = n.get(c);
        r ? r.push(u) : n.set(c, [u]);
      }
    }
    return n;
  }
  function Jd(t, e, l) {
    t = t.ownerDocument || t, t.head.insertBefore(
      l,
      e === "title" ? t.querySelector("head > title") : null
    );
  }
  function fv(t, e, l) {
    if (l === 1 || e.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof e.precedence != "string" || typeof e.href != "string" || e.href === "")
          break;
        return !0;
      case "link":
        if (typeof e.rel != "string" || typeof e.href != "string" || e.href === "" || e.onLoad || e.onError)
          break;
        return e.rel === "stylesheet" ? (t = e.disabled, typeof e.precedence == "string" && t == null) : !0;
      case "script":
        if (e.async && typeof e.async != "function" && typeof e.async != "symbol" && !e.onLoad && !e.onError && e.src && typeof e.src == "string")
          return !0;
    }
    return !1;
  }
  function kd(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function ov(t, e, l, n) {
    if (l.type === "stylesheet" && (typeof n.media != "string" || matchMedia(n.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var a = Gn(n.href), u = e.querySelector(
          Ca(a)
        );
        if (u) {
          e = u._p, e !== null && typeof e == "object" && typeof e.then == "function" && (t.count++, t = Pu.bind(t), e.then(t, t)), l.state.loading |= 4, l.instance = u, Kt(u);
          return;
        }
        u = e.ownerDocument || e, n = Ld(n), (a = Ce.get(a)) && Rf(n, a), u = u.createElement("link"), Kt(u);
        var c = u;
        c._p = new Promise(function(r, m) {
          c.onload = r, c.onerror = m;
        }), It(u, "link", n), l.instance = u;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(l, e), (e = l.state.preload) && (l.state.loading & 3) === 0 && (t.count++, l = Pu.bind(t), e.addEventListener("load", l), e.addEventListener("error", l));
    }
  }
  var Hf = 0;
  function sv(t, e) {
    return t.stylesheets && t.count === 0 && ei(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(l) {
      var n = setTimeout(function() {
        if (t.stylesheets && ei(t, t.stylesheets), t.unsuspend) {
          var u = t.unsuspend;
          t.unsuspend = null, u();
        }
      }, 6e4 + e);
      0 < t.imgBytes && Hf === 0 && (Hf = 62500 * Ly());
      var a = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && ei(t, t.stylesheets), t.unsuspend)) {
            var u = t.unsuspend;
            t.unsuspend = null, u();
          }
        },
        (t.imgBytes > Hf ? 50 : 800) + e
      );
      return t.unsuspend = l, function() {
        t.unsuspend = null, clearTimeout(n), clearTimeout(a);
      };
    } : null;
  }
  function Pu() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) ei(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var ti = null;
  function ei(t, e) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, ti = /* @__PURE__ */ new Map(), e.forEach(rv, t), ti = null, Pu.call(t));
  }
  function rv(t, e) {
    if (!(e.state.loading & 4)) {
      var l = ti.get(t);
      if (l) var n = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), ti.set(t, l);
        for (var a = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < a.length; u++) {
          var c = a[u];
          (c.nodeName === "LINK" || c.getAttribute("media") !== "not all") && (l.set(c.dataset.precedence, c), n = c);
        }
        n && l.set(null, n);
      }
      a = e.instance, c = a.getAttribute("data-precedence"), u = l.get(c) || n, u === n && l.set(null, a), l.set(c, a), this.count++, n = Pu.bind(this), a.addEventListener("load", n), a.addEventListener("error", n), u ? u.parentNode.insertBefore(a, u.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(a, t.firstChild)), e.state.loading |= 4;
    }
  }
  var Ra = {
    $$typeof: V,
    Provider: null,
    Consumer: null,
    _currentValue: I,
    _currentValue2: I,
    _threadCount: 0
  };
  function dv(t, e, l, n, a, u, c, r, m) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = _i(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = _i(0), this.hiddenUpdates = _i(null), this.identifierPrefix = n, this.onUncaughtError = a, this.onCaughtError = u, this.onRecoverableError = c, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = m, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function $d(t, e, l, n, a, u, c, r, m, x, C, U) {
    return t = new dv(
      t,
      e,
      l,
      c,
      m,
      x,
      C,
      U,
      r
    ), e = 1, u === !0 && (e |= 24), u = ye(3, null, null, e), t.current = u, u.stateNode = t, e = mc(), e.refCount++, t.pooledCache = e, e.refCount++, u.memoizedState = {
      element: n,
      isDehydrated: l,
      cache: e
    }, gc(u), t;
  }
  function Wd(t) {
    return t ? (t = bn, t) : bn;
  }
  function Fd(t, e, l, n, a, u) {
    a = Wd(a), n.context === null ? n.context = a : n.pendingContext = a, n = vl(e), n.payload = { element: l }, u = u === void 0 ? null : u, u !== null && (n.callback = u), l = gl(t, n, e), l !== null && (se(l, t, e), ra(l, t, e));
  }
  function Id(t, e) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var l = t.retryLane;
      t.retryLane = l !== 0 && l < e ? l : e;
    }
  }
  function Bf(t, e) {
    Id(t, e), (t = t.alternate) && Id(t, e);
  }
  function Pd(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Xl(t, 67108864);
      e !== null && se(e, t, 67108864), Bf(t, 67108864);
    }
  }
  function tm(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Se();
      e = ji(e);
      var l = Xl(t, e);
      l !== null && se(l, t, e), Bf(t, e);
    }
  }
  var li = !0;
  function mv(t, e, l, n) {
    var a = j.T;
    j.T = null;
    var u = Z.p;
    try {
      Z.p = 2, qf(t, e, l, n);
    } finally {
      Z.p = u, j.T = a;
    }
  }
  function hv(t, e, l, n) {
    var a = j.T;
    j.T = null;
    var u = Z.p;
    try {
      Z.p = 8, qf(t, e, l, n);
    } finally {
      Z.p = u, j.T = a;
    }
  }
  function qf(t, e, l, n) {
    if (li) {
      var a = Yf(n);
      if (a === null)
        Tf(
          t,
          e,
          n,
          ni,
          l
        ), lm(t, n);
      else if (vv(
        a,
        t,
        e,
        l,
        n
      ))
        n.stopPropagation();
      else if (lm(t, n), e & 4 && -1 < yv.indexOf(t)) {
        for (; a !== null; ) {
          var u = cn(a);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var c = Bl(u.pendingLanes);
                  if (c !== 0) {
                    var r = u;
                    for (r.pendingLanes |= 2, r.entangledLanes |= 2; c; ) {
                      var m = 1 << 31 - me(c);
                      r.entanglements[1] |= m, c &= ~m;
                    }
                    Ge(u), (yt & 6) === 0 && (wu = re() + 500, za(0));
                  }
                }
                break;
              case 31:
              case 13:
                r = Xl(u, 2), r !== null && se(r, u, 2), Xu(), Bf(u, 2);
            }
          if (u = Yf(n), u === null && Tf(
            t,
            e,
            n,
            ni,
            l
          ), u === a) break;
          a = u;
        }
        a !== null && n.stopPropagation();
      } else
        Tf(
          t,
          e,
          n,
          null,
          l
        );
    }
  }
  function Yf(t) {
    return t = wi(t), wf(t);
  }
  var ni = null;
  function wf(t) {
    if (ni = null, t = un(t), t !== null) {
      var e = z(t);
      if (e === null) t = null;
      else {
        var l = e.tag;
        if (l === 13) {
          if (t = w(e), t !== null) return t;
          t = null;
        } else if (l === 31) {
          if (t = O(e), t !== null) return t;
          t = null;
        } else if (l === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return ni = t, null;
  }
  function em(t) {
    switch (t) {
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
        switch (th()) {
          case fo:
            return 2;
          case oo:
            return 8;
          case Ka:
          case eh:
            return 32;
          case so:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Gf = !1, Ol = null, _l = null, jl = null, Ua = /* @__PURE__ */ new Map(), Ha = /* @__PURE__ */ new Map(), Cl = [], yv = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function lm(t, e) {
    switch (t) {
      case "focusin":
      case "focusout":
        Ol = null;
        break;
      case "dragenter":
      case "dragleave":
        _l = null;
        break;
      case "mouseover":
      case "mouseout":
        jl = null;
        break;
      case "pointerover":
      case "pointerout":
        Ua.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Ha.delete(e.pointerId);
    }
  }
  function Ba(t, e, l, n, a, u) {
    return t === null || t.nativeEvent !== u ? (t = {
      blockedOn: e,
      domEventName: l,
      eventSystemFlags: n,
      nativeEvent: u,
      targetContainers: [a]
    }, e !== null && (e = cn(e), e !== null && Pd(e)), t) : (t.eventSystemFlags |= n, e = t.targetContainers, a !== null && e.indexOf(a) === -1 && e.push(a), t);
  }
  function vv(t, e, l, n, a) {
    switch (e) {
      case "focusin":
        return Ol = Ba(
          Ol,
          t,
          e,
          l,
          n,
          a
        ), !0;
      case "dragenter":
        return _l = Ba(
          _l,
          t,
          e,
          l,
          n,
          a
        ), !0;
      case "mouseover":
        return jl = Ba(
          jl,
          t,
          e,
          l,
          n,
          a
        ), !0;
      case "pointerover":
        var u = a.pointerId;
        return Ua.set(
          u,
          Ba(
            Ua.get(u) || null,
            t,
            e,
            l,
            n,
            a
          )
        ), !0;
      case "gotpointercapture":
        return u = a.pointerId, Ha.set(
          u,
          Ba(
            Ha.get(u) || null,
            t,
            e,
            l,
            n,
            a
          )
        ), !0;
    }
    return !1;
  }
  function nm(t) {
    var e = un(t.target);
    if (e !== null) {
      var l = z(e);
      if (l !== null) {
        if (e = l.tag, e === 13) {
          if (e = w(l), e !== null) {
            t.blockedOn = e, go(t.priority, function() {
              tm(l);
            });
            return;
          }
        } else if (e === 31) {
          if (e = O(l), e !== null) {
            t.blockedOn = e, go(t.priority, function() {
              tm(l);
            });
            return;
          }
        } else if (e === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function ai(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var l = Yf(t.nativeEvent);
      if (l === null) {
        l = t.nativeEvent;
        var n = new l.constructor(
          l.type,
          l
        );
        Yi = n, l.target.dispatchEvent(n), Yi = null;
      } else
        return e = cn(l), e !== null && Pd(e), t.blockedOn = l, !1;
      e.shift();
    }
    return !0;
  }
  function am(t, e, l) {
    ai(t) && l.delete(e);
  }
  function gv() {
    Gf = !1, Ol !== null && ai(Ol) && (Ol = null), _l !== null && ai(_l) && (_l = null), jl !== null && ai(jl) && (jl = null), Ua.forEach(am), Ha.forEach(am);
  }
  function ui(t, e) {
    t.blockedOn === e && (t.blockedOn = null, Gf || (Gf = !0, i.unstable_scheduleCallback(
      i.unstable_NormalPriority,
      gv
    )));
  }
  var ii = null;
  function um(t) {
    ii !== t && (ii = t, i.unstable_scheduleCallback(
      i.unstable_NormalPriority,
      function() {
        ii === t && (ii = null);
        for (var e = 0; e < t.length; e += 3) {
          var l = t[e], n = t[e + 1], a = t[e + 2];
          if (typeof n != "function") {
            if (wf(n || l) === null)
              continue;
            break;
          }
          var u = cn(l);
          u !== null && (t.splice(e, 3), e -= 3, qc(
            u,
            {
              pending: !0,
              data: a,
              method: l.method,
              action: n
            },
            n,
            a
          ));
        }
      }
    ));
  }
  function Qn(t) {
    function e(m) {
      return ui(m, t);
    }
    Ol !== null && ui(Ol, t), _l !== null && ui(_l, t), jl !== null && ui(jl, t), Ua.forEach(e), Ha.forEach(e);
    for (var l = 0; l < Cl.length; l++) {
      var n = Cl[l];
      n.blockedOn === t && (n.blockedOn = null);
    }
    for (; 0 < Cl.length && (l = Cl[0], l.blockedOn === null); )
      nm(l), l.blockedOn === null && Cl.shift();
    if (l = (t.ownerDocument || t).$$reactFormReplay, l != null)
      for (n = 0; n < l.length; n += 3) {
        var a = l[n], u = l[n + 1], c = a[ae] || null;
        if (typeof u == "function")
          c || um(l);
        else if (c) {
          var r = null;
          if (u && u.hasAttribute("formAction")) {
            if (a = u, c = u[ae] || null)
              r = c.formAction;
            else if (wf(a) !== null) continue;
          } else r = c.action;
          typeof r == "function" ? l[n + 1] = r : (l.splice(n, 3), n -= 3), um(l);
        }
      }
  }
  function im() {
    function t(u) {
      u.canIntercept && u.info === "react-transition" && u.intercept({
        handler: function() {
          return new Promise(function(c) {
            return a = c;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function e() {
      a !== null && (a(), a = null), n || setTimeout(l, 20);
    }
    function l() {
      if (!n && !navigation.transition) {
        var u = navigation.currentEntry;
        u && u.url != null && navigation.navigate(u.url, {
          state: u.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var n = !1, a = null;
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", e), navigation.addEventListener("navigateerror", e), setTimeout(l, 100), function() {
        n = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", e), navigation.removeEventListener("navigateerror", e), a !== null && (a(), a = null);
      };
    }
  }
  function Xf(t) {
    this._internalRoot = t;
  }
  ci.prototype.render = Xf.prototype.render = function(t) {
    var e = this._internalRoot;
    if (e === null) throw Error(s(409));
    var l = e.current, n = Se();
    Fd(l, n, t, e, null, null);
  }, ci.prototype.unmount = Xf.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var e = t.containerInfo;
      Fd(t.current, 2, null, t, null, null), Xu(), e[an] = null;
    }
  };
  function ci(t) {
    this._internalRoot = t;
  }
  ci.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var e = vo();
      t = { blockedOn: null, target: t, priority: e };
      for (var l = 0; l < Cl.length && e !== 0 && e < Cl[l].priority; l++) ;
      Cl.splice(l, 0, t), l === 0 && nm(t);
    }
  };
  var cm = f.version;
  if (cm !== "19.2.4")
    throw Error(
      s(
        527,
        cm,
        "19.2.4"
      )
    );
  Z.findDOMNode = function(t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function" ? Error(s(188)) : (t = Object.keys(t).join(","), Error(s(268, t)));
    return t = E(e), t = t !== null ? p(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var bv = {
    bundleType: 0,
    version: "19.2.4",
    rendererPackageName: "react-dom",
    currentDispatcherRef: j,
    reconcilerVersion: "19.2.4"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var fi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!fi.isDisabled && fi.supportsFiber)
      try {
        Vn = fi.inject(
          bv
        ), de = fi;
      } catch {
      }
  }
  return Ya.createRoot = function(t, e) {
    if (!h(t)) throw Error(s(299));
    var l = !1, n = "", a = hr, u = yr, c = vr;
    return e != null && (e.unstable_strictMode === !0 && (l = !0), e.identifierPrefix !== void 0 && (n = e.identifierPrefix), e.onUncaughtError !== void 0 && (a = e.onUncaughtError), e.onCaughtError !== void 0 && (u = e.onCaughtError), e.onRecoverableError !== void 0 && (c = e.onRecoverableError)), e = $d(
      t,
      1,
      !1,
      null,
      null,
      l,
      n,
      null,
      a,
      u,
      c,
      im
    ), t[an] = e.current, Ef(t), new Xf(e);
  }, Ya.hydrateRoot = function(t, e, l) {
    if (!h(t)) throw Error(s(299));
    var n = !1, a = "", u = hr, c = yr, r = vr, m = null;
    return l != null && (l.unstable_strictMode === !0 && (n = !0), l.identifierPrefix !== void 0 && (a = l.identifierPrefix), l.onUncaughtError !== void 0 && (u = l.onUncaughtError), l.onCaughtError !== void 0 && (c = l.onCaughtError), l.onRecoverableError !== void 0 && (r = l.onRecoverableError), l.formState !== void 0 && (m = l.formState)), e = $d(
      t,
      1,
      !0,
      e,
      l ?? null,
      n,
      a,
      m,
      u,
      c,
      r,
      im
    ), e.context = Wd(null), l = e.current, n = Se(), n = ji(n), a = vl(n), a.callback = null, gl(l, a, n), l = n, e.current.lanes = l, Jn(e, l), Ge(e), t[an] = e.current, Ef(t), new ci(e);
  }, Ya.version = "19.2.4", Ya;
}
var Hm;
function Ig() {
  if (Hm) return Wf.exports;
  Hm = 1;
  function i() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i);
      } catch (f) {
        console.error(f);
      }
  }
  return i(), Wf.exports = Fg(), Wf.exports;
}
var Pg = Ig();
function l0(i, f = {}) {
  const o = Pg.createRoot(i);
  return o.render(/* @__PURE__ */ d.jsx(Kg, { ...f })), {
    root: o,
    unmount() {
      o.unmount();
    }
  };
}
function n0(i) {
  return {
    async listActions() {
      return i.map((f) => ({ ...f }));
    }
  };
}
export {
  Av as BUILDER_JSON_RPC_VERSION,
  dm as BUILDER_RPC_PATH,
  qm as BuilderResultError,
  Kg as FSMUIBuilder,
  Zn as FSM_AUTHORING_METHODS,
  Za as FSM_RUNTIME_METHODS,
  ln as HANDLED_ERROR_CODES,
  Cv as buildRPCEndpoint,
  Rl as callBuilderMethod,
  Rv as createBuilderAuthoringRPC,
  t0 as createBuilderRPCClient,
  wg as createBuilderRuntimeRPC,
  Yv as createDefaultExportAdapter,
  Fv as createLocalStoragePersistenceStore,
  n0 as createStaticActionCatalogProvider,
  Bv as definitionFromDraft,
  e0 as formatHandledBuilderError,
  wv as isRPCExportAvailable,
  eo as loadDraftDocumentForEditing,
  l0 as mountFSMUIBuilder,
  Lm as normalizeRuntimeApplyEvent,
  Vm as normalizeRuntimeSnapshot,
  Qg as prepareDraftDocumentForSave,
  vi as toHandledBuilderError,
  Mv as unwrapBuilderResponse,
  Uv as useAuthoringRPC,
  Gg as useRuntimeRPC
};

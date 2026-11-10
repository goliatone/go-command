class m {
  constructor(e) {
    this.invoke = e;
  }
  invoke;
  call(e, t) {
    return this.invoke(e, t);
  }
}
class c extends Error {
  method;
  code;
  data;
  status;
  category;
  retryable;
  details;
  constructor(e) {
    super(e.message), this.name = "RPCClientError", this.method = e.method, this.code = e.code, this.data = e.data, this.status = e.status, this.category = e.category, this.retryable = e.retryable, this.details = e.details;
  }
}
function u() {
  return Math.random().toString(36).slice(2);
}
function a(n, e, t) {
  const r = {
    id: (t.idGenerator ?? u)(),
    method: n
  };
  return e !== void 0 && (r.params = e), t.rpcVersion === "2.0" && (r.jsonrpc = "2.0"), r;
}
function l(n) {
  return !!n && typeof n == "object" && !Array.isArray(n);
}
function d(n, e) {
  if (!l(e))
    return e;
  if (e.error)
    throw new c({
      method: n,
      message: e.error.message || `rpc call failed: ${n}`,
      code: e.error.code,
      data: e.error.data,
      category: e.error.category,
      retryable: e.error.retryable,
      details: e.error.details
    });
  return "result" in e ? e.result : e;
}
function p() {
  if (typeof globalThis.fetch != "function")
    throw new Error("global fetch is unavailable; provide fetchImpl explicitly");
  return globalThis.fetch.bind(globalThis);
}
class g {
  constructor(e) {
    this.options = e, this.fetchImpl = e.fetchImpl ?? p();
  }
  options;
  fetchImpl;
  async call(e, t) {
    const r = JSON.stringify(a(e, t, this.options)), s = await this.fetchImpl(this.options.endpoint, {
      ...this.options.requestInit,
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...this.options.headers ?? {}
      },
      body: r
    }), o = await s.json().catch(() => null);
    if (!s.ok)
      throw l(o) && o.error ? new c({
        method: e,
        message: o.error.message || `rpc call failed (${s.status})`,
        code: o.error.code,
        data: o.error.data,
        category: o.error.category,
        retryable: o.error.retryable,
        details: o.error.details,
        status: s.status
      }) : new c({
        method: e,
        message: `rpc call failed (${s.status})`,
        status: s.status,
        data: o
      });
    return d(e, o);
  }
}
const f = 1;
class y {
  constructor(e, t = {}) {
    this.url = e, this.options = t, this.timeoutMs = t.requestTimeoutMs ?? 1e4, this.socketFactory = t.socketFactory ?? ((r, s) => new WebSocket(r, s));
  }
  url;
  options;
  socket = null;
  connectPromise = null;
  pending = /* @__PURE__ */ new Map();
  timeoutMs;
  socketFactory;
  async call(e, t) {
    if (await this.ensureConnected(), !this.socket)
      throw new Error("websocket rpc client is not connected");
    const r = a(e, t, this.options), s = new Promise((o, i) => {
      const h = setTimeout(() => {
        this.pending.delete(r.id), i(new Error(`websocket rpc request timed out (${this.timeoutMs}ms)`));
      }, this.timeoutMs);
      this.pending.set(r.id, { method: e, resolve: o, reject: i, timeout: h });
    });
    return this.socket.send(JSON.stringify(r)), s;
  }
  close(e, t) {
    this.socket?.close(e, t), this.socket = null, this.connectPromise = null;
  }
  async ensureConnected() {
    if (!(this.socket && this.socket.readyState === f))
      return this.connectPromise ? this.connectPromise : (this.connectPromise = new Promise((e, t) => {
        const r = this.socketFactory(this.url, this.options.protocols);
        this.socket = r;
        const s = () => {
          r.removeEventListener("open", s), r.removeEventListener("error", o), this.connectPromise = null, e();
        }, o = (i) => {
          r.removeEventListener("open", s), r.removeEventListener("error", o), this.connectPromise = null, t(i instanceof Error ? i : new Error("websocket rpc connection failed"));
        };
        r.addEventListener("open", s), r.addEventListener("error", o), r.addEventListener("message", (i) => this.onMessage(i)), r.addEventListener("close", () => this.onClose());
      }), this.connectPromise);
  }
  onClose() {
    for (const [e, t] of this.pending.entries())
      clearTimeout(t.timeout), t.reject(new Error(`websocket closed before response for request ${e}`));
    this.pending.clear();
  }
  onMessage(e) {
    if (typeof e.data != "string")
      return;
    let t;
    try {
      t = JSON.parse(e.data);
    } catch {
      return;
    }
    if (!t.id || !this.pending.has(t.id))
      return;
    const r = this.pending.get(t.id);
    this.pending.delete(t.id), clearTimeout(r.timeout);
    try {
      r.resolve(d(r.method, t));
    } catch (s) {
      r.reject(s);
    }
  }
}
export {
  m as FunctionRPCClient,
  g as HTTPRPCClient,
  c as RPCClientError,
  y as WebSocketRPCClient,
  u as defaultRPCID,
  d as extractRPCResult,
  a as toRPCRequestEnvelope
};

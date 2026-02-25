class m {
  constructor(e) {
    this.invoke = e;
  }
  call(e, t) {
    return this.invoke(e, t);
  }
}
class c extends Error {
  method;
  code;
  data;
  status;
  constructor(e) {
    super(e.message), this.name = "RPCClientError", this.method = e.method, this.code = e.code, this.data = e.data, this.status = e.status;
  }
}
function u() {
  return Math.random().toString(36).slice(2);
}
function a(n, e, t) {
  const s = {
    id: (t.idGenerator ?? u)(),
    method: n
  };
  return e !== void 0 && (s.params = e), t.rpcVersion === "2.0" && (s.jsonrpc = "2.0"), s;
}
function d(n) {
  return !!n && typeof n == "object" && !Array.isArray(n);
}
function h(n, e) {
  if (!d(e))
    return e;
  if (e.error)
    throw new c({
      method: n,
      message: e.error.message || `rpc call failed: ${n}`,
      code: e.error.code,
      data: e.error.data
    });
  return "result" in e ? e.result : e;
}
class f {
  constructor(e) {
    this.options = e, this.fetchImpl = e.fetchImpl ?? fetch;
  }
  fetchImpl;
  async call(e, t) {
    const s = JSON.stringify(a(e, t, this.options)), r = await this.fetchImpl(this.options.endpoint, {
      ...this.options.requestInit,
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...this.options.headers ?? {}
      },
      body: s
    }), o = await r.json().catch(() => null);
    if (!r.ok)
      throw d(o) && o.error ? new c({
        method: e,
        message: o.error.message || `rpc call failed (${r.status})`,
        code: o.error.code,
        data: o.error.data,
        status: r.status
      }) : new c({
        method: e,
        message: `rpc call failed (${r.status})`,
        status: r.status,
        data: o
      });
    return h(e, o);
  }
}
const p = 1;
class g {
  constructor(e, t = {}) {
    this.url = e, this.options = t, this.timeoutMs = t.requestTimeoutMs ?? 1e4, this.socketFactory = t.socketFactory ?? ((s, r) => new WebSocket(s, r));
  }
  socket = null;
  connectPromise = null;
  pending = /* @__PURE__ */ new Map();
  timeoutMs;
  socketFactory;
  async call(e, t) {
    if (await this.ensureConnected(), !this.socket)
      throw new Error("websocket rpc client is not connected");
    const s = a(e, t, this.options), r = new Promise((o, i) => {
      const l = setTimeout(() => {
        this.pending.delete(s.id), i(new Error(`websocket rpc request timed out (${this.timeoutMs}ms)`));
      }, this.timeoutMs);
      this.pending.set(s.id, { method: e, resolve: o, reject: i, timeout: l });
    });
    return this.socket.send(JSON.stringify(s)), r;
  }
  close(e, t) {
    this.socket?.close(e, t), this.socket = null, this.connectPromise = null;
  }
  async ensureConnected() {
    if (!(this.socket && this.socket.readyState === p))
      return this.connectPromise ? this.connectPromise : (this.connectPromise = new Promise((e, t) => {
        const s = this.socketFactory(this.url, this.options.protocols);
        this.socket = s;
        const r = () => {
          s.removeEventListener("open", r), s.removeEventListener("error", o), this.connectPromise = null, e();
        }, o = (i) => {
          s.removeEventListener("open", r), s.removeEventListener("error", o), this.connectPromise = null, t(i instanceof Error ? i : new Error("websocket rpc connection failed"));
        };
        s.addEventListener("open", r), s.addEventListener("error", o), s.addEventListener("message", (i) => this.onMessage(i)), s.addEventListener("close", () => this.onClose());
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
    const s = this.pending.get(t.id);
    this.pending.delete(t.id), clearTimeout(s.timeout);
    try {
      s.resolve(h(s.method, t));
    } catch (r) {
      s.reject(r);
    }
  }
}
export {
  m as FunctionRPCClient,
  f as HTTPRPCClient,
  c as RPCClientError,
  g as WebSocketRPCClient,
  u as defaultRPCID,
  h as extractRPCResult,
  a as toRPCRequestEnvelope
};

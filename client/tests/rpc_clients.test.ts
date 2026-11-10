import { readFileSync } from "node:fs";

import { afterEach, describe, expect, it, vi } from "vitest";

import {
  extractRPCResult,
  FunctionRPCClient,
  HTTPRPCClient,
  RPCClientError,
  WebSocketRPCClient,
  type RPCErrorObject,
  type WebSocketLike
} from "../src";

class FakeRPCWebSocket implements WebSocketLike {
  readyState = 0;
  sent: string[] = [];

  private readonly listeners: Record<string, Array<(event: unknown) => void>> = {
    open: [],
    message: [],
    close: [],
    error: []
  };

  constructor(private readonly result: unknown, private readonly error?: RPCErrorObject) {
    setTimeout(() => {
      this.readyState = 1;
      this.emit("open", {});
    }, 0);
  }

  addEventListener(type: "open" | "message" | "error" | "close", listener: (event: unknown) => void): void {
    this.listeners[type].push(listener);
  }

  removeEventListener(type: "open" | "message" | "error" | "close", listener: (event: unknown) => void): void {
    this.listeners[type] = this.listeners[type].filter((entry) => entry !== listener);
  }

  send(data: string): void {
    this.sent.push(data);
    const request = JSON.parse(data) as { id: string; jsonrpc?: string };
    setTimeout(() => {
      this.emit("message", {
        data: JSON.stringify({
          id: request.id,
          jsonrpc: request.jsonrpc,
          ...(this.error ? { error: this.error } : { result: this.result })
        })
      });
    }, 0);
  }

  close(): void {
    this.readyState = 3;
    this.emit("close", {});
  }

  private emit(type: "open" | "message" | "error" | "close", event: unknown): void {
    for (const listener of this.listeners[type]) {
      listener(event);
    }
  }
}

describe("generic rpc clients", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("FunctionRPCClient delegates to provided invoker", async () => {
    const invokeSpy = vi.fn(async (method: string, params?: unknown) => ({ method, params }));
    const client = new FunctionRPCClient(invokeSpy);

    const result = await client.call("system.ping", { value: 1 });

    expect(invokeSpy).toHaveBeenCalledWith("system.ping", { value: 1 });
    expect(result).toEqual({ method: "system.ping", params: { value: 1 } });
  });

  it("HTTPRPCClient sends JSON-RPC envelope and returns result", async () => {
    const fetchSpy = vi.fn(
      async (_input: string | URL | Request, init?: RequestInit) => {
        const body = JSON.parse(String(init?.body));
        return {
          ok: true,
          status: 200,
          json: async () => ({ id: body.id, jsonrpc: "2.0", result: { pong: true } })
        } as Response;
      }
    );

    const client = new HTTPRPCClient({
      endpoint: "https://api.example.com/rpc",
      rpcVersion: "2.0",
      fetchImpl: fetchSpy as unknown as typeof fetch
    });

    const result = await client.call<{ pong: boolean }>("system.ping", { value: 1 });

    expect(result).toEqual({ pong: true });
    const [url, init] = fetchSpy.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.example.com/rpc");
    const body = JSON.parse(String(init.body));
    expect(body.jsonrpc).toBe("2.0");
    expect(body.method).toBe("system.ping");
    expect(body.params).toEqual({ value: 1 });
  });

  it("HTTPRPCClient throws RPCClientError for rpc error payload", async () => {
    const fetchSpy = vi.fn(
      async () =>
        ({
          ok: false,
          status: 400,
          json: async () => ({
            id: "1",
            error: {
              code: "INVALID_REQUEST",
              message: "invalid input"
            }
          })
        }) as Response
    );

    const client = new HTTPRPCClient({
      endpoint: "https://api.example.com/rpc",
      fetchImpl: fetchSpy as unknown as typeof fetch
    });

    await expect(client.call("system.ping", { value: 1 })).rejects.toBeInstanceOf(RPCClientError);
  });

  it("HTTPRPCClient binds global fetch when no fetchImpl is provided", async () => {
    const originalFetch = globalThis.fetch;
    const globalRef = globalThis;
    const fakeFetch = async function(this: unknown, _input: string | URL | Request, init?: RequestInit): Promise<Response> {
      if (this !== globalRef) {
        throw new TypeError("Illegal invocation");
      }
      const body = JSON.parse(String(init?.body));
      return {
        ok: true,
        status: 200,
        json: async () => ({ id: body.id, jsonrpc: "2.0", result: { ok: true } })
      } as Response;
    };

    Object.defineProperty(globalThis, "fetch", {
      configurable: true,
      writable: true,
      value: fakeFetch
    });

    try {
      const client = new HTTPRPCClient({
        endpoint: "https://api.example.com/rpc",
        rpcVersion: "2.0"
      });

      const result = await client.call<{ ok: boolean }>("system.ping");
      expect(result).toEqual({ ok: true });
    } finally {
      Object.defineProperty(globalThis, "fetch", {
        configurable: true,
        writable: true,
        value: originalFetch
      });
    }
  });

  it("WebSocketRPCClient invokes arbitrary RPC methods", async () => {
    let socketRef: FakeRPCWebSocket | null = null;
    const client = new WebSocketRPCClient("wss://api.example.com/rpc", {
      rpcVersion: "2.0",
      socketFactory: () => {
        socketRef = new FakeRPCWebSocket({ ok: true });
        return socketRef;
      }
    });

    const result = await client.call<{ ok: boolean }>("system.health", { detail: true });

    expect(result).toEqual({ ok: true });
    expect(socketRef).not.toBeNull();
    const sent = JSON.parse(socketRef!.sent[0]) as Record<string, unknown>;
    expect(sent.method).toBe("system.health");
    expect(sent.params).toEqual({ detail: true });
    expect(sent.jsonrpc).toBe("2.0");
  });
});

// Go tests compare these fixtures with actual ResponseEnvelope serialization.
const publicErrorFixtures = JSON.parse(readFileSync(
  new URL("../../rpc/testdata/public_errors.json", import.meta.url), "utf8"
)) as Array<{ name: string; response: { error: RPCErrorObject } }>;

describe("canonical public error compatibility", () => {
  for (const status of [200, 409]) {
    it.each(publicErrorFixtures)(`HTTP ${status} preserves $name without replay`, async ({ response }) => {
      const fetchImpl = vi.fn(async () => ({
        ok: status === 200, status, json: async () => response
      }) as Response);
      const client = new HTTPRPCClient({ endpoint: "/rpc", fetchImpl });
      const failure = await client.call("mutation").catch((error: unknown) => error);
      expect(failure).toBeInstanceOf(RPCClientError);
      expect(failure).toMatchObject({ method: "mutation", ...response.error });
      expect((failure as RPCClientError).status).toBe(status === 200 ? undefined : status);
      expect(fetchImpl).toHaveBeenCalledTimes(1);
    });
  }

  it.each(publicErrorFixtures)("WebSocket preserves $name without replay", async ({ response }) => {
    let socket: FakeRPCWebSocket | undefined;
    const client = new WebSocketRPCClient("wss://example.com/rpc", {
      socketFactory: () => (socket = new FakeRPCWebSocket(undefined, response.error))
    });
    try {
      const failure = await client.call("mutation").catch((error: unknown) => error);
      expect(failure).toBeInstanceOf(RPCClientError);
      expect(failure).toMatchObject({ method: "mutation", ...response.error });
      expect(socket?.sent).toHaveLength(1);
    } finally {
      client.close();
    }
  });

  it.each([200, 400])("preserves legacy JSON-RPC data and explicit false at HTTP %i", async (status) => {
    const error = { code: -32602, message: "invalid params", data: { legacy: true }, category: "validation", retryable: false, details: { field: "name" } };
    const client = new HTTPRPCClient({ endpoint: "/rpc", fetchImpl: vi.fn(async () => ({
      ok: status === 200, status, json: async () => ({ jsonrpc: "2.0", id: "1", error })
    }) as Response) });
    await expect(client.call("legacy")).rejects.toMatchObject(error);
  });

  it("leaves absent error fields undefined", () => {
    let failure: unknown;
    try { extractRPCResult("legacy", { error: { code: -32603, message: "failure", data: "legacy" } }); }
    catch (error) { failure = error; }
    expect(failure).toBeInstanceOf(RPCClientError);
    expect(failure).toMatchObject({ code: -32603, data: "legacy" });
    expect((failure as RPCClientError).category).toBeUndefined();
    expect((failure as RPCClientError).retryable).toBeUndefined();
    expect((failure as RPCClientError).details).toBeUndefined();
  });

  it("preserves result unwrapping and canonical envelope return semantics", () => {
    for (const result of [false, 0, "", null, [], {}]) {
      expect(extractRPCResult("legacy", { result })).toBe(result);
    }
    for (const envelope of [{}, { data: false }, { data: { receipt: { accepted: true }, result: { failed: true } } }]) {
      expect(extractRPCResult("canonical", envelope)).toBe(envelope);
    }
    expect(extractRPCResult("raw", null)).toBeNull();
  });
});

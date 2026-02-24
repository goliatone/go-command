import { afterEach, describe, expect, it, vi } from "vitest";

import {
  FunctionRPCClient,
  HTTPRPCClient,
  RPCClientError,
  WebSocketRPCClient,
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

  constructor(private readonly result: unknown) {
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
          result: this.result
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

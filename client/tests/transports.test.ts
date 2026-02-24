import { afterEach, describe, expect, it, vi } from "vitest";

import { FunctionRPCClient, RESTTransport, RPCTransport } from "../src";
import { loadServerFixture } from "./fixtures";

describe("fsm transports", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("RESTTransport posts canonical request and normalizes response", async () => {
    const fixture = loadServerFixture("apply_event_response.json");
    const fetchSpy = vi.fn(
      async (_input: string | URL | Request, _init?: RequestInit) =>
        ({
          ok: true,
          status: 200,
          json: async () => fixture,
          text: async () => ""
        }) as Response
    );

    const transport = new RESTTransport({
      baseUrl: "https://api.example.com",
      endpoint: (machine) => `/machines/${machine}/apply`,
      fetchImpl: fetchSpy as unknown as typeof fetch
    });

    const response = await transport.applyEvent(
      "orders",
      "order-42",
      "approve",
      { amount: 100 },
      { actorId: "admin", roles: ["admin"], tenant: "acme" },
      { expectedState: "draft", expectedVersion: 3 }
    );

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    const [url, init] = fetchSpy.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.example.com/machines/orders/apply");
    expect(init?.method).toBe("POST");

    const body = JSON.parse(String(init?.body)) as Record<string, unknown>;
    expect(body.EntityID).toBe("order-42");
    expect(body.Event).toBe("approve");
    expect(body.ExpectedState).toBe("draft");
    expect(body.ExpectedVersion).toBe(3);
    expect((body.ExecCtx as { ActorID: string }).ActorID).toBe("admin");

    expect(response.snapshot.currentState).toBe("approved");
    expect(response.execution?.executionId).toBe("exec-1");
  });

  it("RPCTransport delegates to generic RPC client", async () => {
    const fixture = loadServerFixture("apply_event_response.json");
    const invokeSpy = vi.fn(async (..._args: [string, unknown | undefined]) => fixture);
    const client = new FunctionRPCClient(invokeSpy);
    const transport = new RPCTransport(client);

    const response = await transport.applyEvent(
      "orders",
      "order-99",
      "approve",
      { amount: 500 },
      { actorId: "rpc-user", roles: ["reviewer"], tenant: "acme" }
    );

    expect(invokeSpy).toHaveBeenCalledTimes(1);
    const [method, params] = invokeSpy.mock.calls[0] as [string, Record<string, unknown>];
    expect(method).toBe("fsm.apply_event");
    expect(params.EntityID).toBe("order-99");
    expect((params.ExecCtx as { ActorID: string }).ActorID).toBe("rpc-user");
    expect(response.transition.currentState).toBe("approved");
  });

  it("RPCTransport supports method resolver by machine", async () => {
    const fixture = loadServerFixture("apply_event_response.json");
    const invokeSpy = vi.fn(async (..._args: [string, unknown | undefined]) => fixture);
    const client = new FunctionRPCClient(invokeSpy);
    const transport = new RPCTransport(client, {
      method: (machine) => `fsm.${machine}.apply_event`
    });

    await transport.applyEvent(
      "orders",
      "order-11",
      "approve",
      { amount: 10 },
      { actorId: "u1", roles: [], tenant: "acme" }
    );

    const [method] = invokeSpy.mock.calls[0] as [string, Record<string, unknown>];
    expect(method).toBe("fsm.orders.apply_event");
  });
});

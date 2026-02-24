import { describe, expect, it, vi } from "vitest";

import {
  ClientFSM,
  bootstrapClientFSM,
  DEFAULT_EXECUTION_CONTEXT,
  normalizeApplyEventResponse,
  normalizeSnapshot,
  readHydratedSnapshot
} from "../src";
import type { Transport } from "../src";
import { loadServerFixture } from "./fixtures";

describe("ClientFSM projection runtime", () => {
  it("replaces local snapshot with server-authoritative snapshot after dispatch", async () => {
    const initialSnapshot = normalizeSnapshot(loadServerFixture("snapshot_dynamic_unresolved.json"));
    const transitionResponse = normalizeApplyEventResponse(loadServerFixture("apply_event_response.json"));

    const applyEventSpy = vi.fn(async (..._args: Parameters<Transport["applyEvent"]>) => transitionResponse);
    const transport: Transport = {
      applyEvent: (...args) => applyEventSpy(...args)
    };

    const fsm = new ClientFSM({
      machine: "orders",
      snapshot: initialSnapshot,
      transport
    });

    expect(fsm.state).toBe("draft");
    await fsm.dispatch("approve", { amount: 42 });

    expect(applyEventSpy).toHaveBeenCalledTimes(1);
    expect(fsm.state).toBe("approved");
    expect(fsm.snapshot.entityId).toBe("ord-1");
  });

  it("uses default execution context when dispatch context is omitted", async () => {
    const initialSnapshot = normalizeSnapshot(loadServerFixture("snapshot_dynamic_unresolved.json"));
    const transitionResponse = normalizeApplyEventResponse(loadServerFixture("apply_event_response.json"));

    const applyEventSpy = vi.fn(async (..._args: Parameters<Transport["applyEvent"]>) => transitionResponse);
    const transport: Transport = {
      applyEvent: (...args) => applyEventSpy(...args)
    };

    const fsm = new ClientFSM({
      machine: "orders",
      snapshot: initialSnapshot,
      transport,
      defaultExecCtx: DEFAULT_EXECUTION_CONTEXT
    });

    await fsm.dispatch("approve", { reason: "test" });

    const args = applyEventSpy.mock.calls[0];
    expect(args[4]).toEqual(DEFAULT_EXECUTION_CONTEXT);
  });
});

describe("SSR hydration", () => {
  it("reads snapshot from window.__FSM__ safely", () => {
    const scope = {
      window: {
        __FSM__: loadServerFixture("snapshot_dynamic_resolved.json")
      }
    };

    const snapshot = readHydratedSnapshot(scope);
    expect(snapshot).not.toBeNull();
    expect(snapshot?.entityId).toBe("ord-1");
    expect(snapshot?.allowedTransitions[0].target.resolved).toBe(true);
    expect(snapshot?.allowedTransitions[0].target.resolvedTo).toBe("review");
  });

  it("returns null when hydration payload is missing or malformed", () => {
    expect(readHydratedSnapshot({ window: {} })).toBeNull();
    expect(readHydratedSnapshot({ window: { __FSM__: "not-an-object" } })).toBeNull();
  });

  it("bootstraps a ClientFSM from hydrated snapshot", () => {
    const scope = {
      window: {
        __FSM__: loadServerFixture("snapshot_dynamic_unresolved.json")
      }
    };

    const transport: Transport = {
      applyEvent: vi.fn(async () => normalizeApplyEventResponse(loadServerFixture("apply_event_response.json")))
    };

    const fsm = bootstrapClientFSM({ machine: "orders", transport, scope });

    expect(fsm).not.toBeNull();
    expect(fsm?.state).toBe("draft");
  });
});

import { describe, expect, it } from "vitest";

import {
  normalizeApplyEventResponse,
  normalizeSnapshot,
  toWireApplyEventRequest
} from "../src";
import { loadServerFixture } from "./fixtures";

describe("contract parity", () => {
  it("normalizes server ApplyEventResponse envelope fixtures", () => {
    const fixture = loadServerFixture("apply_event_response.json");

    const result = normalizeApplyEventResponse(fixture);

    expect(result.transition.previousState).toBe("draft");
    expect(result.transition.currentState).toBe("approved");
    expect(result.transition.effects).toHaveLength(2);

    const [commandEffect, emitEffect] = result.transition.effects;
    expect(commandEffect.kind).toBe("command");
    if (commandEffect.kind === "command") {
      expect(commandEffect.actionId).toBe("audit.log");
      expect(commandEffect.delayMs).toBe(250);
      expect(commandEffect.timeoutMs).toBe(5000);
    }

    expect(emitEffect.kind).toBe("emit_event");
    if (emitEffect.kind === "emit_event") {
      expect(emitEffect.event).toBe("notify.order.approved");
    }

    expect(result.snapshot.entityId).toBe("ord-1");
    expect(result.snapshot.currentState).toBe("approved");
    expect(result.execution?.executionId).toBe("exec-1");
    expect(result.execution?.policy).toBe("orchestrated");
    expect(result.execution?.status).toBe("running");
  });

  it("preserves target metadata semantics for unresolved and resolved dynamic transitions", () => {
    const unresolved = normalizeSnapshot(loadServerFixture("snapshot_dynamic_unresolved.json"));
    const resolved = normalizeSnapshot(loadServerFixture("snapshot_dynamic_resolved.json"));

    expect(unresolved.allowedTransitions).toHaveLength(1);
    expect(unresolved.allowedTransitions[0].target.kind).toBe("dynamic");
    expect(unresolved.allowedTransitions[0].target.resolver).toBe("pick_target");
    expect(unresolved.allowedTransitions[0].target.resolved).toBe(false);
    expect(unresolved.allowedTransitions[0].target.resolvedTo).toBeUndefined();
    expect(unresolved.allowedTransitions[0].target.candidates).toEqual(["review", "approved"]);

    expect(resolved.allowedTransitions).toHaveLength(1);
    expect(resolved.allowedTransitions[0].target.resolver).toBe("pick_target");
    expect(resolved.allowedTransitions[0].target.resolved).toBe(true);
    expect(resolved.allowedTransitions[0].target.resolvedTo).toBe("review");
    expect(resolved.allowedTransitions[0].target.candidates).toEqual(["review", "approved"]);
  });

  it("serializes canonical wire ApplyEventRequest envelope", () => {
    const request = toWireApplyEventRequest({
      entityId: "order-7",
      event: "approve",
      payload: { amount: 100 },
      execCtx: {
        actorId: "admin-1",
        roles: ["admin"],
        tenant: "acme"
      },
      expectedState: "draft",
      expectedVersion: 9
    });

    expect(request).toEqual({
      EntityID: "order-7",
      Event: "approve",
      Msg: { amount: 100 },
      ExecCtx: {
        ActorID: "admin-1",
        Roles: ["admin"],
        Tenant: "acme"
      },
      ExpectedState: "draft",
      ExpectedVersion: 9
    });
  });
});

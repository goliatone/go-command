import { normalizeApplyEventResponse, toWireRPCApplyEventRequest } from "./normalize";
import type { RPCClient } from "./rpc_client";
import type { ApplyEventOptions, ApplyEventResponse, ExecutionContext, Transport } from "./types";

export interface RPCTransportOptions {
  method?: string | ((machine: string) => string);
}

export class RPCTransport implements Transport {
  private readonly method: string | ((machine: string) => string);

  constructor(
    private readonly client: RPCClient,
    options: RPCTransportOptions = {},
  ) {
    this.method = options.method ?? "fsm.apply_event";
  }

  async applyEvent(
    machine: string,
    entityId: string,
    event: string,
    payload: unknown,
    execCtx: ExecutionContext,
    options: ApplyEventOptions = {},
  ): Promise<ApplyEventResponse> {
    const method = typeof this.method === "function" ? this.method(machine) : this.method;
    const request = toWireRPCApplyEventRequest({
      entityId,
      event,
      payload,
      execCtx,
      expectedState: options.expectedState,
      expectedVersion: options.expectedVersion
    });

    const result = await this.client.call(method, request);
    return normalizeApplyEventResponse(result);
  }
}

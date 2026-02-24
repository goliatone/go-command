import { normalizeApplyEventResponse, toWireApplyEventRequest } from "./normalize";
import type { ApplyEventOptions, ApplyEventResponse, ExecutionContext, Transport } from "./types";

export interface RESTTransportOptions {
  baseUrl?: string;
  endpoint?: string | ((machine: string) => string);
  headers?: HeadersInit;
  fetchImpl?: typeof fetch;
}

export class RESTTransport implements Transport {
  private readonly fetchImpl: typeof fetch;
  private readonly endpoint: string | ((machine: string) => string);

  constructor(private readonly options: RESTTransportOptions = {}) {
    this.fetchImpl = options.fetchImpl ?? fetch;
    this.endpoint = options.endpoint ?? ((machine) => `/fsm/${encodeURIComponent(machine)}/apply-event`);
  }

  async applyEvent(
    machine: string,
    entityId: string,
    event: string,
    payload: unknown,
    execCtx: ExecutionContext,
    applyOptions: ApplyEventOptions = {},
  ): Promise<ApplyEventResponse> {
    const path =
      typeof this.endpoint === "function" ? this.endpoint(machine) : this.endpoint;
    const url = this.options.baseUrl ? new URL(path, this.options.baseUrl).toString() : path;

    const body = toWireApplyEventRequest({
      entityId,
      event,
      payload,
      execCtx,
      expectedState: applyOptions.expectedState,
      expectedVersion: applyOptions.expectedVersion
    });

    const response = await this.fetchImpl(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(this.options.headers ?? {})
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const maybeText = await response.text().catch(() => "");
      throw new Error(`rest applyEvent failed (${response.status}): ${maybeText}`);
    }

    const json = await response.json();
    return normalizeApplyEventResponse(json);
  }
}

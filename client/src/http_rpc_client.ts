import {
  type BaseRPCClientOptions,
  extractRPCResult,
  isRPCResponseEnvelope,
  RPCClientError,
  type RPCClient,
  toRPCRequestEnvelope
} from "./rpc_client";

export interface HTTPRPCClientOptions extends BaseRPCClientOptions {
  endpoint: string;
  headers?: HeadersInit;
  fetchImpl?: typeof fetch;
  requestInit?: Omit<RequestInit, "method" | "headers" | "body">;
}

export class HTTPRPCClient implements RPCClient {
  private readonly fetchImpl: typeof fetch;

  constructor(private readonly options: HTTPRPCClientOptions) {
    this.fetchImpl = options.fetchImpl ?? fetch;
  }

  async call<TResult = unknown, TParams = unknown>(method: string, params?: TParams): Promise<TResult> {
    const body = JSON.stringify(toRPCRequestEnvelope(method, params, this.options));

    const response = await this.fetchImpl(this.options.endpoint, {
      ...this.options.requestInit,
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(this.options.headers ?? {})
      },
      body
    });

    const payload = await response.json().catch(() => null);
    if (!response.ok) {
      if (isRPCResponseEnvelope(payload) && payload.error) {
        throw new RPCClientError({
          method,
          message: payload.error.message || `rpc call failed (${response.status})`,
          code: payload.error.code,
          data: payload.error.data,
          status: response.status
        });
      }
      throw new RPCClientError({
        method,
        message: `rpc call failed (${response.status})`,
        status: response.status,
        data: payload
      });
    }

    return extractRPCResult<TResult>(method, payload);
  }
}

export interface RPCErrorObject {
  code?: string | number;
  message: string;
  data?: unknown;
}

export interface RPCRequestEnvelope<TParams = unknown> {
  id: string;
  method: string;
  params?: TParams;
  jsonrpc?: "2.0";
}

export interface RPCResponseEnvelope<TResult = unknown> {
  id?: string;
  result?: TResult;
  error?: RPCErrorObject;
  jsonrpc?: "2.0";
}

export interface RPCClient {
  call<TResult = unknown, TParams = unknown>(method: string, params?: TParams): Promise<TResult>;
}

export class RPCClientError extends Error {
  readonly method: string;
  readonly code?: string | number;
  readonly data?: unknown;
  readonly status?: number;

  constructor(input: {
    method: string;
    message: string;
    code?: string | number;
    data?: unknown;
    status?: number;
  }) {
    super(input.message);
    this.name = "RPCClientError";
    this.method = input.method;
    this.code = input.code;
    this.data = input.data;
    this.status = input.status;
  }
}

export interface BaseRPCClientOptions {
  rpcVersion?: "2.0" | null;
  idGenerator?: () => string;
}

export function defaultRPCID(): string {
  return Math.random().toString(36).slice(2);
}

export function toRPCRequestEnvelope<TParams>(
  method: string,
  params: TParams | undefined,
  options: BaseRPCClientOptions,
): RPCRequestEnvelope<TParams> {
  const request: RPCRequestEnvelope<TParams> = {
    id: (options.idGenerator ?? defaultRPCID)(),
    method
  };

  if (params !== undefined) {
    request.params = params;
  }
  if (options.rpcVersion === "2.0") {
    request.jsonrpc = "2.0";
  }

  return request;
}

export function isRPCResponseEnvelope(value: unknown): value is RPCResponseEnvelope {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

export function extractRPCResult<TResult>(method: string, value: unknown): TResult {
  if (!isRPCResponseEnvelope(value)) {
    return value as TResult;
  }

  if (value.error) {
    throw new RPCClientError({
      method,
      message: value.error.message || `rpc call failed: ${method}`,
      code: value.error.code,
      data: value.error.data
    });
  }

  if ("result" in value) {
    return value.result as TResult;
  }

  return value as TResult;
}

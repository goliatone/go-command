import type { RPCClient } from "./rpc_client";

export type RPCMethodInvoker = (method: string, params?: unknown) => Promise<unknown>;

export class FunctionRPCClient implements RPCClient {
  constructor(private readonly invoke: RPCMethodInvoker) {}

  call<TResult = unknown, TParams = unknown>(method: string, params?: TParams): Promise<TResult> {
    return this.invoke(method, params) as Promise<TResult>;
  }
}

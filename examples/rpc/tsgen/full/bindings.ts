import type { RPCClient } from "../../../../client/src/rpc_client";
import { createDispatcher, createEndpoints } from "./contracts";
import type { CommandID, DispatchRequest, DispatchResponse, InvokeCallback, DispatchCallback, Method, MethodRequests, MethodOutputs, SuccessEnvelope } from "./contracts";

// The host supplies its existing client and configured dispatch method.
// These callbacks preserve the inner success envelope; RPCClient owns transport errors.
export function bindContracts(client: RPCClient, dispatchMethod: string) {
  const invoke: InvokeCallback = <K extends Method>(method: K, request: MethodRequests[K]) =>
    client.call<SuccessEnvelope<MethodOutputs[K]>, MethodRequests[K]>(method, request);
  const invokeDispatch: DispatchCallback = <K extends CommandID>(request: DispatchRequest<K>) =>
    client.call<SuccessEnvelope<DispatchResponse<K>>, DispatchRequest<K>>(dispatchMethod, request);
  return { call: createEndpoints(invoke), dispatch: createDispatcher(invokeDispatch) };
}

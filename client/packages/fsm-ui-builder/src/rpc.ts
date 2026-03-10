import { HTTPRPCClient } from "../../../src/http_rpc_client"
import type { RPCClient } from "../../../src/rpc_client"

import {
  BUILDER_JSON_RPC_VERSION,
  BUILDER_RPC_PATH,
  type BuilderErrorEnvelope,
  type BuilderRequestEnvelope,
  type BuilderRequestMeta,
  type BuilderResponseEnvelope
} from "./contracts"

export interface BuilderRPCClientOptions {
  origin?: string
  endpoint?: string
  headers?: HeadersInit
  fetchImpl?: typeof fetch
  requestInit?: Omit<RequestInit, "method" | "headers" | "body">
}

export class BuilderResultError extends Error {
  readonly method: string
  readonly envelope: BuilderErrorEnvelope

  constructor(method: string, envelope: BuilderErrorEnvelope) {
    super(envelope.message)
    this.name = "BuilderResultError"
    this.method = method
    this.envelope = envelope
  }
}

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "")
}

export function buildRPCEndpoint(input: Pick<BuilderRPCClientOptions, "origin" | "endpoint">): string {
  if (input.endpoint && input.endpoint.trim() !== "") {
    return input.endpoint
  }
  if (!input.origin || input.origin.trim() === "") {
    return BUILDER_RPC_PATH
  }
  return `${trimTrailingSlash(input.origin)}${BUILDER_RPC_PATH}`
}

export function createBuilderRPCClient(options: BuilderRPCClientOptions = {}): HTTPRPCClient {
  return new HTTPRPCClient({
    endpoint: buildRPCEndpoint(options),
    rpcVersion: BUILDER_JSON_RPC_VERSION,
    headers: options.headers,
    fetchImpl: options.fetchImpl,
    requestInit: options.requestInit
  })
}

export async function callBuilderMethod<TReq, TRes>(input: {
  client: RPCClient
  method: string
  data: TReq
  meta?: BuilderRequestMeta
}): Promise<TRes> {
  const request: BuilderRequestEnvelope<TReq> = {
    data: input.data,
    meta: input.meta
  }
  const response = await input.client.call<BuilderResponseEnvelope<TRes>, BuilderRequestEnvelope<TReq>>(
    input.method,
    request
  )
  return unwrapBuilderResponse(input.method, response)
}

export function unwrapBuilderResponse<TRes>(method: string, response: BuilderResponseEnvelope<TRes>): TRes {
  if (response.error) {
    throw new BuilderResultError(method, response.error)
  }
  if (response.data === undefined) {
    throw new Error(`rpc result missing data envelope for method ${method}`)
  }
  return response.data
}

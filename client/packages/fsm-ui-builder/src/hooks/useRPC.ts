import { useMemo } from "react"
import type { RPCClient } from "../../../../src"

import {
  FSM_RUNTIME_METHODS,
  type BuilderRequestMeta,
  type RuntimeApplyEventRequest,
  type RuntimeSnapshotRequest
} from "../contracts"
import { normalizeRuntimeApplyEvent, normalizeRuntimeSnapshot } from "../normalization/runtime"
import { callBuilderMethod } from "../rpc"

export interface BuilderRuntimeRPC {
  applyEventDryRun(data: RuntimeApplyEventRequest, meta?: BuilderRequestMeta): Promise<ReturnType<typeof normalizeRuntimeApplyEvent>>
  snapshot(data: RuntimeSnapshotRequest, meta?: BuilderRequestMeta): Promise<ReturnType<typeof normalizeRuntimeSnapshot>>
}

export function createBuilderRuntimeRPC(client: RPCClient): BuilderRuntimeRPC {
  return {
    async applyEventDryRun(data, meta) {
      const response = await callBuilderMethod<RuntimeApplyEventRequest, unknown>({
        client,
        method: FSM_RUNTIME_METHODS.applyEvent,
        data,
        meta
      })
      return normalizeRuntimeApplyEvent(response)
    },
    async snapshot(data, meta) {
      const response = await callBuilderMethod<RuntimeSnapshotRequest, unknown>({
        client,
        method: FSM_RUNTIME_METHODS.snapshot,
        data,
        meta
      })
      return normalizeRuntimeSnapshot(response)
    }
  }
}

export function useRuntimeRPC(client: RPCClient | null): BuilderRuntimeRPC | null {
  return useMemo(() => {
    if (!client) {
      return null
    }
    return createBuilderRuntimeRPC(client)
  }, [client])
}

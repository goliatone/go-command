import type { ApplyEventOptions, ApplyEventResponse, ExecutionContext, Transport } from "./types";

export type { ApplyEventOptions, ApplyEventResponse, ExecutionContext, Transport };

export interface TransportRequest {
  machine: string;
  entityId: string;
  event: string;
  payload: unknown;
  execCtx: ExecutionContext;
  options?: ApplyEventOptions;
}

import { normalizeSnapshot } from "./normalize";
import type {
  ApplyEventOptions,
  ApplyEventResponse,
  ExecutionContext,
  Snapshot,
  Transport
} from "./types";
import { DEFAULT_EXECUTION_CONTEXT } from "./types";

export interface ClientFSMOptions {
  machine: string;
  snapshot: Snapshot;
  transport: Transport;
  defaultExecCtx?: ExecutionContext;
}

export class ClientFSM {
  private snapshotState: Snapshot;
  private readonly defaultExecCtx: ExecutionContext;

  constructor(private readonly options: ClientFSMOptions) {
    this.snapshotState = normalizeSnapshot(options.snapshot);
    this.defaultExecCtx = options.defaultExecCtx ?? DEFAULT_EXECUTION_CONTEXT;
  }

  async dispatch(
    event: string,
    payload: unknown = {},
    execCtx: ExecutionContext = this.defaultExecCtx,
    applyOptions: ApplyEventOptions = {},
  ): Promise<ApplyEventResponse> {
    const response = await this.options.transport.applyEvent(
      this.options.machine,
      this.snapshotState.entityId,
      event,
      payload,
      execCtx,
      applyOptions,
    );

    // The server snapshot is authoritative and replaces local projection state.
    this.snapshotState = normalizeSnapshot(response.snapshot);
    return response;
  }

  get state(): string {
    return this.snapshotState.currentState;
  }

  get allowedTransitions() {
    return this.snapshotState.allowedTransitions;
  }

  get snapshot(): Snapshot {
    return normalizeSnapshot(this.snapshotState);
  }

  replaceSnapshot(nextSnapshot: Snapshot): void {
    this.snapshotState = normalizeSnapshot(nextSnapshot);
  }
}

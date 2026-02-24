import {
  type BaseRPCClientOptions,
  extractRPCResult,
  type RPCClient,
  type RPCResponseEnvelope,
  toRPCRequestEnvelope
} from "./rpc_client";

export interface WebSocketLike {
  readonly readyState: number;
  send(data: string): void;
  close(code?: number, reason?: string): void;
  addEventListener(type: "open" | "message" | "error" | "close", listener: (event: unknown) => void): void;
  removeEventListener(type: "open" | "message" | "error" | "close", listener: (event: unknown) => void): void;
}

export type WebSocketFactory = (url: string, protocols?: string | string[]) => WebSocketLike;

export interface WebSocketRPCClientOptions extends BaseRPCClientOptions {
  protocols?: string | string[];
  requestTimeoutMs?: number;
  socketFactory?: WebSocketFactory;
}

type PendingCall = {
  method: string;
  resolve: (value: any) => void;
  reject: (reason?: unknown) => void;
  timeout: ReturnType<typeof setTimeout>;
};

const OPEN_STATE = 1;

export class WebSocketRPCClient implements RPCClient {
  private socket: WebSocketLike | null = null;
  private connectPromise: Promise<void> | null = null;
  private readonly pending = new Map<string, PendingCall>();
  private readonly timeoutMs: number;
  private readonly socketFactory: WebSocketFactory;

  constructor(
    private readonly url: string,
    private readonly options: WebSocketRPCClientOptions = {},
  ) {
    this.timeoutMs = options.requestTimeoutMs ?? 10_000;
    this.socketFactory =
      options.socketFactory ??
      ((targetURL, protocols) => new WebSocket(targetURL, protocols) as unknown as WebSocketLike);
  }

  async call<TResult = unknown, TParams = unknown>(method: string, params?: TParams): Promise<TResult> {
    await this.ensureConnected();
    if (!this.socket) {
      throw new Error("websocket rpc client is not connected");
    }

    const request = toRPCRequestEnvelope(method, params, this.options);
    const promise = new Promise<TResult>((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.pending.delete(request.id);
        reject(new Error(`websocket rpc request timed out (${this.timeoutMs}ms)`));
      }, this.timeoutMs);
      this.pending.set(request.id, { method, resolve, reject, timeout });
    });

    this.socket.send(JSON.stringify(request));
    return promise;
  }

  close(code?: number, reason?: string): void {
    this.socket?.close(code, reason);
    this.socket = null;
    this.connectPromise = null;
  }

  private async ensureConnected(): Promise<void> {
    if (this.socket && this.socket.readyState === OPEN_STATE) {
      return;
    }
    if (this.connectPromise) {
      return this.connectPromise;
    }

    this.connectPromise = new Promise<void>((resolve, reject) => {
      const socket = this.socketFactory(this.url, this.options.protocols);
      this.socket = socket;

      const onOpen = () => {
        socket.removeEventListener("open", onOpen);
        socket.removeEventListener("error", onError);
        this.connectPromise = null;
        resolve();
      };

      const onError = (event: unknown) => {
        socket.removeEventListener("open", onOpen);
        socket.removeEventListener("error", onError);
        this.connectPromise = null;
        reject(event instanceof Error ? event : new Error("websocket rpc connection failed"));
      };

      socket.addEventListener("open", onOpen);
      socket.addEventListener("error", onError);
      socket.addEventListener("message", (event) => this.onMessage(event as { data?: unknown }));
      socket.addEventListener("close", () => this.onClose());
    });

    return this.connectPromise;
  }

  private onClose(): void {
    for (const [id, pending] of this.pending.entries()) {
      clearTimeout(pending.timeout);
      pending.reject(new Error(`websocket closed before response for request ${id}`));
    }
    this.pending.clear();
  }

  private onMessage(event: { data?: unknown }): void {
    if (typeof event.data !== "string") {
      return;
    }

    let response: RPCResponseEnvelope;
    try {
      response = JSON.parse(event.data) as RPCResponseEnvelope;
    } catch {
      return;
    }

    if (!response.id || !this.pending.has(response.id)) {
      return;
    }

    const pending = this.pending.get(response.id)!;
    this.pending.delete(response.id);
    clearTimeout(pending.timeout);

    try {
      pending.resolve(extractRPCResult(pending.method, response));
    } catch (error) {
      pending.reject(error);
    }
  }
}

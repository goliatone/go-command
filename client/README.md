# go-command TypeScript Client

TypeScript client toolkit for `go-command` with two layers:

1. Generic RPC client library (usable without FSM)
2. FSM projection runtime (`ClientFSM`) built on transport adapters

This keeps RPC reusable across your app while FSM remains a focused projection client.

## Install and run

From this directory:

```bash
npm install
npm test
npm run build
```

## Package overview

### Generic RPC (standalone)

Use these when you need RPC calls outside FSM:

- `RPCClient` interface
- `FunctionRPCClient`
- `HTTPRPCClient`
- `WebSocketRPCClient`
- `RPCClientError`

### FSM projection runtime

Use these for server-authoritative FSM state projection:

- `ClientFSM`
- `Transport` interface
- `RESTTransport`
- `RPCTransport` (uses any `RPCClient`)
- `bootstrapClientFSM`, `readHydratedSnapshot`

## Quick start: standalone RPC

### Option A: function-based client

```ts
import { FunctionRPCClient } from "./src";

const rpc = new FunctionRPCClient(async (method, params) => {
  return myRpcInvoker(method, params);
});

const health = await rpc.call<{ ok: boolean }>("system.health", { verbose: true });
console.log(health.ok);
```

### Option B: HTTP RPC client

```ts
import { HTTPRPCClient } from "./src";

const rpc = new HTTPRPCClient({
  endpoint: "https://api.example.com/rpc",
  rpcVersion: "2.0", // include jsonrpc: "2.0" in envelopes
});

const user = await rpc.call<{ id: string }>("user.get", { id: "u-1" });
console.log(user.id);
```

### Option C: WebSocket RPC client

```ts
import { WebSocketRPCClient } from "./src";

const rpc = new WebSocketRPCClient("wss://api.example.com/rpc", {
  rpcVersion: "2.0",
  requestTimeoutMs: 10000,
});

const status = await rpc.call<{ status: string }>("system.status");
console.log(status.status);
```

## FSM usage

The FSM client is server-authoritative:

- client dispatches event requests
- server applies transition
- client replaces local snapshot with returned snapshot

### Using RPC for FSM

```ts
import {
  ClientFSM,
  HTTPRPCClient,
  RPCTransport,
  type Snapshot,
} from "./src";

const rpc = new HTTPRPCClient({
  endpoint: "https://api.example.com/rpc",
  rpcVersion: "2.0",
});

const transport = new RPCTransport(rpc, {
  method: "fsm.apply_event", // default
});

const initialSnapshot: Snapshot = {
  entityId: "order-1",
  currentState: "draft",
  allowedTransitions: [],
};

const fsm = new ClientFSM({
  machine: "orders",
  snapshot: initialSnapshot,
  transport,
});

await fsm.dispatch("approve", { amount: 99 }, {
  actorId: "admin-1",
  roles: ["admin"],
  tenant: "acme",
});

console.log(fsm.state);
```

`RPCTransport` sends canonical RPC envelopes:

```json
{
  "data": {
    "entityId": "order-1",
    "event": "approve",
    "msg": { "amount": 99 }
  },
  "meta": {
    "actorId": "admin-1",
    "roles": ["admin"],
    "tenant": "acme"
  }
}
```

`RPCTransport` can also derive method name from machine:

```ts
const transport = new RPCTransport(rpc, {
  method: (machine) => `fsm.${machine}.apply_event`,
});
```

### Using REST for FSM

```ts
import { ClientFSM, RESTTransport } from "./src";

const transport = new RESTTransport({
  baseUrl: "https://api.example.com",
  endpoint: (machine) => `/machines/${machine}/apply`,
});

const fsm = new ClientFSM({ machine: "orders", snapshot, transport });
```

## Core FSM API

### `ClientFSM`

```ts
new ClientFSM({
  machine: string,
  snapshot: Snapshot,
  transport: Transport,
  defaultExecCtx?: ExecutionContext,
})
```

Methods/properties:

- `dispatch(event, payload?, execCtx?, applyOptions?)`
- `state`
- `allowedTransitions`
- `snapshot`
- `replaceSnapshot(nextSnapshot)`

### `Transport`

```ts
interface Transport {
  applyEvent(
    machine: string,
    entityId: string,
    event: string,
    payload: unknown,
    execCtx: ExecutionContext,
    options?: {
      expectedState?: string;
      expectedVersion?: number;
    }
  ): Promise<ApplyEventResponse>;
}
```

## SSR/islands hydration

Server can embed an initial snapshot:

```html
<script>
  window.__FSM__ = {
    EntityID: "order-1",
    CurrentState: "draft",
    AllowedTransitions: []
  };
</script>
```

Client bootstrap:

```ts
import { bootstrapClientFSM, RESTTransport } from "./src";

const transport = new RESTTransport({ baseUrl: "https://api.example.com" });
const fsm = bootstrapClientFSM({ machine: "orders", transport });

if (fsm) {
  console.log("Hydrated state:", fsm.state);
}
```

## Error handling

Generic RPC clients throw `RPCClientError` for transport/protocol errors.

```ts
import { RPCClientError } from "./src";

try {
  await rpc.call("user.get", { id: "missing" });
} catch (error) {
  if (error instanceof RPCClientError) {
    console.error(error.method, error.code, error.message);
  }
}
```

## Utilities and normalization

For payload normalization and wire conversion:

- `normalizeApplyEventResponse`
- `normalizeSnapshot`
- `normalizeTransitionResult`
- `normalizeTargetInfo`
- `normalizeExecutionHandle`
- `toWireExecutionContext`
- `toWireApplyEventRequest`
- `toWireRPCRequestMeta`
- `toWireRPCApplyEventRequest`

Normalizers accept both Go-style fields (`EntityID`) and camelCase (`entityId`).

## Contract generation scaffold

This repository includes a scaffold generator at `cmd/rpc-tsgen` for endpoint-metadata-driven TS contracts.

Example:

```bash
go run ./cmd/rpc-tsgen \
  -manifest .tmp/rpc-endpoints.json \
  -out client/src/gen/rpc-contract.ts
```

You can wire this into `go generate` in your app repository once you have a manifest export step.

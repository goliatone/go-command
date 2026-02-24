# RPC Web Debug Example

This example runs a small web app that calls `go-command/rpc` methods from the browser and shows raw request/response payloads in a debug panel.

## What it demonstrates

- `command.RPCCommand` registration through `command.Registry`
- RPC methods implemented as command/query handlers
- A tiny HTTP JSON-RPC adapter using `rpc.Server.NewRequestForMethod` + `rpc.Server.Invoke`
- Browser-side debug panel with full request/response history

Registered methods:

- `counter.increment` (execute)
- `counter.reset` (execute)
- `counter.snapshot` (query)

## Run

From repository root:

```bash
go run ./examples/rpc/web_debug
```

Open `http://localhost:8091`.

## JSON-RPC shape used by the demo

```json
{
  "jsonrpc": "2.0",
  "id": "req-1",
  "method": "counter.increment",
  "params": {
    "data": {
      "amount": 3
    },
    "meta": {
      "actorId": "demo-user",
      "requestId": "req-1"
    }
  }
}
```

Response examples:

- execute methods return `"result": null`
- query methods return `"result": {"data": ...}`

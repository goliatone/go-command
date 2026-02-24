# RPC TS Generation Example

This example shows an end-to-end pipeline for generating TypeScript RPC contracts from Go endpoint metadata.

It demonstrates both registration styles supported by the RPC server:

- Explicit typed endpoints via `rpc.NewEndpoint` (`tasks.create`, `tasks.list`)
- RPC method adapter via `command.RPCCommand` (`search.rebuild_index`)

## What it produces

1. Endpoint manifest JSON at `.tmp/rpc-endpoints.json`
2. TypeScript scaffold contracts at `.tmp/rpc-contract.ts`

## Run manually

From repository root:

```bash
go run ./examples/rpc/tsgen -manifest ./examples/rpc/tsgen/.tmp/rpc-endpoints.json
go run ./cmd/rpc-tsgen \
  -manifest ./examples/rpc/tsgen/.tmp/rpc-endpoints.json \
  -out ./examples/rpc/tsgen/.tmp/rpc-contract.ts \
  -export exampleRPCMeta
```

## Run with go generate

```bash
go generate ./examples/rpc/tsgen
```

This uses the `//go:generate` directives in `main.go` to run both steps.

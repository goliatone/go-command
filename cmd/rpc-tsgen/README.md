# rpc-tsgen (Scaffold)

`rpc-tsgen` is a scaffold generator that emits TypeScript RPC contract stubs from endpoint metadata JSON.

It is intended to be wired into a broader pipeline:

1. export endpoint metadata from your Go RPC server
2. run `rpc-tsgen` to produce method maps/unions
3. run Go->TS struct generation and replace `unknown` maps with concrete request/response types

## Usage

```bash
go run ./cmd/rpc-tsgen \
  -manifest .tmp/rpc-endpoints.json \
  -out client/src/gen/rpc-contract.ts
```

If `-manifest` is omitted, the generator emits an empty scaffold file.

End-to-end example:

- `examples/rpc/tsgen` exports a manifest from registered endpoints and runs this generator.
- Execute with `go generate ./examples/rpc/tsgen` from repo root.

## Output

Generated TypeScript includes:

- `RPCTypeRef`
- `RPCEndpointMeta`
- `RPCRequestMeta`
- `RPCRequestEnvelope`
- `RPCErrorEnvelope`
- `RPCResponseEnvelope`
- `rpcEndpointMeta` const array
- `RPCMethod` union
- `RPCRequestByMethod` map (scaffolded as `RPCRequestEnvelope<unknown>`)
- `RPCResponseByMethod` map (scaffolded as `RPCResponseEnvelope<unknown>`)

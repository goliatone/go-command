# RPC TypeScript generation

`rpc-tsgen` supports the existing metadata scaffold and full Go-owned wire contracts.
Scaffold mode remains the default. Full mode delegates to the shared `rpccontract`
emitter pinned in the root [go.mod](../../go.mod); no emitter or RPC client is duplicated.

## Full contracts

Export a manifest using explicit public Go declarations, then generate:

```sh
go run ./cmd/rpc-tsgen -mode full -manifest manifest.json -out contracts.ts
go run ./cmd/rpc-tsgen -mode full -manifest manifest.json -out contracts.ts --check
```

Full mode requires a versioned contract manifest from `rpc.ExportContracts`.
It produces endpoint and named-command input/result maps, canonical dispatch DTOs,
and helpers with injected callbacks. It does not consume discovery metadata or start
services. Invalid schemas, references and fingerprints fail before writing output.
`-export` applies only to scaffold mode and is rejected when explicitly used in full mode.

`--check` works in either mode: it fails for drift or missing output and never creates
files/directories or changes output bytes/mtime. Unsupported positional arguments fail before file access, including arguments before `--check`.
Input and output must be distinct,
including hard links. Normal generation creates parent directories.

The [full example](../../examples/rpc/tsgen/README.md) provides explicit `go generate`,
a Go wire fixture exporter, strict TypeScript consumers and an existing-client proof.
Generation is never implicit in a build or test. Cache dependencies first for offline use.

## Legacy scaffold

Existing flags, exported names, metadata formats and output bytes are preserved:

```sh
go run ./cmd/rpc-tsgen -manifest .tmp/rpc-endpoints.json -out client/src/gen/rpc-contract.ts
go run ./cmd/rpc-tsgen -manifest .tmp/rpc-endpoints.json -out .tmp/custom.ts -export exampleRPCMeta
```

Omitting `-manifest` emits the same empty scaffold. Metadata can be an array or an
object containing `endpoints`/`Endpoints`; existing casing aliases remain supported.
The default output remains `client/src/gen/rpc-contract.ts` and metadata export remains
`rpcEndpointMeta`. Scaffold types retain their `RPC` names, unknown payload maps and
existing envelope shapes. `-mode scaffold` selects this behavior explicitly.

## Runtime boundary

Helpers return `{ data?: T }` and preserve absent data, explicit null where declared,
and present falsy values. They do not unwrap application fields named `data` or `result`.
Dispatch keeps `command_id`, separate `ids`, canonical option/receipt casing and optional
result/status/validation fields. The host supplies the dispatch method and existing RPC
client; RPC errors reject through that client, while operational failures returned as data
remain data. The existing dynamic client path remains available.

Exporting declarations does not register commands, authorize requests or enforce bounds.
Typed server adapters decode original public payload bytes with `rpc.DecodeContractJSON[T]`,
validate typed results with `rpc.ValidateContractValue`, and derive trusted context separately.
Use Go string serialization for integers that cannot obey declared safe-number bounds.

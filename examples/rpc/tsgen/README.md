# RPC TypeScript generation examples

The full example exports explicit Go-owned contracts offline and invokes the published
shared emitter through `rpc-tsgen`. The original metadata scaffold remains available.
The root [go.mod](../../../go.mod) pins the generator; installed TypeScript and cached Go
dependencies are required for the offline checks below.

## Full Go-owned contracts

From the repository root:

```sh
GOWORK=off GOPROXY=off GOSUMDB=off go generate ./examples/rpc/tsgen/full
GOWORK=off GOPROXY=off GOSUMDB=off go run ./cmd/rpc-tsgen \
  -mode full -manifest examples/rpc/tsgen/full/manifest.json \
  -out examples/rpc/tsgen/full/contracts.ts --check
python3 examples/rpc/tsgen/full/verify.py
```

Generation writes `full/manifest.json`, `wire.json`, `checks.json` and `contracts.ts`.
The exporter enumerates declarations in [fixture/fixture.go](fixture/fixture.go), invokes
no handlers and starts no services. It covers nested/shared/recursive DTOs, explicit enums,
optional/null values, numeric boundaries, actual string encoding, literal dash fields,
complete dispatch options/receipts, and real Go response-envelope bytes. Public object
results preserve useful false/zero/empty values without changing legacy `omitempty`.

`verify.py` reruns the current exporter twice, checks goldens and ten producer regressions,
compares wrapper output to the published emitter, and proves non-writing check mode. It
compiles fresh wire literals and positive/negative calls under strict TypeScript with exact
optional properties and unchecked-index checks. The unchanged client is compiled with its
existing strict settings; its declarations are consumed by the stricter generated fixture.
Pass `--tsc <installed-typescript-bin/tsc>` to use another local compiler; no downloads occur.

[full/bindings.ts](full/bindings.ts) demonstrates the small host-owned callback binding:
provide an existing `RPCClient` and the configured dispatch method. The proof uses the real
`HTTPRPCClient` with injected fetch responses built from Go fixtures; it asserts request
serialization, envelope presence, errors and the existing dynamic path. This is not a live
protected-server or published go-command integration claim.

Typed helpers retain `{data?: T}`. Missing data stays missing; null and falsy values stay
present when Go emits them. Application `data`/`result` fields remain ordinary fields.
Named dispatch emits `command_id` and forwards `ids` separately, with Go option/receipt
casing. Options can omit zero defaults; inline mode does not guarantee a result and queued
responses do not invent one. Errors reject through the existing client; failure-as-data
remains data. Route choice, policy and trusted context belong to the host.

Exporting alone does not enforce bounds. Typed adapters must decode original payloads
with `rpc.DecodeContractJSON[T]` before legacy normalization/enrichment and validate typed
output with `rpc.ValidateContractValue`. Construct internal messages with trusted context
separately. Wider integers need actual Go string serialization or public string DTOs;
opaque endpoint adapters must enforce the same bounds or decline numeric contracts.

## Legacy metadata scaffold

The existing endpoint-first registration example exports `tasks.create`, `tasks.list`
and `search.rebuild_index` metadata, then generates the original scaffold:

```sh
go generate ./examples/rpc/tsgen
```

Or run its two steps manually:

```sh
go run ./examples/rpc/tsgen -manifest ./examples/rpc/tsgen/.tmp/rpc-endpoints.json
go run ./cmd/rpc-tsgen \
  -manifest ./examples/rpc/tsgen/.tmp/rpc-endpoints.json \
  -out ./examples/rpc/tsgen/.tmp/rpc-contract.ts -export exampleRPCMeta
```

These existing commands retain their flags, exported names, metadata and unknown payload
maps. Use full mode for the explicit wire contract; discovery metadata is not a full schema.

// Package full demonstrates offline generation pinned by the root go.mod.
package full

//go:generate go run ../export -out .
//go:generate go run ../../../../cmd/rpc-tsgen -mode full -manifest manifest.json -out contracts.ts

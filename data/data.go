package data

import (
	"embed"
	"io/fs"
)

//go:embed client
var embeddedFS embed.FS

// ClientFS returns embedded client artifacts rooted at `data/client`.
//
// NOTE: This package intentionally embeds all client artifacts together,
// which couples them at Go binary level. If we later want finer-grained
// binary composition, split into dedicated embed packages (for example
// `data/rpc` and `data/fsm`) and import only what each binary needs.
func ClientFS() fs.FS {
	sub, err := fs.Sub(embeddedFS, "client")
	if err != nil {
		return embeddedFS
	}
	return sub
}

// ClientRPCFS returns embedded RPC client artifacts rooted at `data/client/rpc`.
func ClientRPCFS() fs.FS {
	sub, err := fs.Sub(embeddedFS, "client/rpc")
	if err != nil {
		return embeddedFS
	}
	return sub
}

// ClientFSMFS returns embedded FSM client artifacts rooted at `data/client/fsm`.
func ClientFSMFS() fs.FS {
	sub, err := fs.Sub(embeddedFS, "client/fsm")
	if err != nil {
		return embeddedFS
	}
	return sub
}

// ClientFSMRPCFS returns embedded FSM-RPC adapter artifacts rooted at `data/client/fsm-rpc`.
func ClientFSMRPCFS() fs.FS {
	sub, err := fs.Sub(embeddedFS, "client/fsm-rpc")
	if err != nil {
		return embeddedFS
	}
	return sub
}

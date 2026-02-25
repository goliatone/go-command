package data

import (
	"io/fs"
	"testing"
)

func TestClientFSIncludesBuiltArtifact(t *testing.T) {
	clientFS := ClientFS()

	content, err := fs.ReadFile(clientFS, "rpc/index.js")
	if err != nil {
		t.Fatalf("read rpc/index.js from embedded client fs: %v", err)
	}
	if len(content) == 0 {
		t.Fatal("embedded rpc/index.js is empty")
	}
}

func TestClientRPCFSIsSubRooted(t *testing.T) {
	rpcFS := ClientRPCFS()

	content, err := fs.ReadFile(rpcFS, "index.js")
	if err != nil {
		t.Fatalf("read index.js from rpc client fs: %v", err)
	}
	if len(content) == 0 {
		t.Fatal("embedded rpc index.js is empty")
	}

	if _, err := fs.ReadFile(rpcFS, "rpc/index.js"); err == nil {
		t.Fatal("rpc fs should be rooted at data/client/rpc (unexpected nested rpc/ path)")
	}
}

func TestClientFSMFSIsSubRooted(t *testing.T) {
	fsmFS := ClientFSMFS()

	content, err := fs.ReadFile(fsmFS, "index.js")
	if err != nil {
		t.Fatalf("read index.js from fsm client fs: %v", err)
	}
	if len(content) == 0 {
		t.Fatal("embedded fsm index.js is empty")
	}

	if _, err := fs.ReadFile(fsmFS, "fsm/index.js"); err == nil {
		t.Fatal("fsm fs should be rooted at data/client/fsm (unexpected nested fsm/ path)")
	}
}

func TestClientFSMRPCFSIsSubRooted(t *testing.T) {
	fsmRPCFS := ClientFSMRPCFS()

	content, err := fs.ReadFile(fsmRPCFS, "index.js")
	if err != nil {
		t.Fatalf("read index.js from fsm-rpc client fs: %v", err)
	}
	if len(content) == 0 {
		t.Fatal("embedded fsm-rpc index.js is empty")
	}

	if _, err := fs.ReadFile(fsmRPCFS, "fsm-rpc/index.js"); err == nil {
		t.Fatal("fsm-rpc fs should be rooted at data/client/fsm-rpc (unexpected nested fsm-rpc/ path)")
	}
}

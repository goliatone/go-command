package data

import (
	"io/fs"
	"testing"
)

func TestClientFSIncludesBuiltArtifact(t *testing.T) {
	clientFS := ClientFS()

	content, err := fs.ReadFile(clientFS, "index.js")
	if err != nil {
		t.Fatalf("read index.js from embedded client fs: %v", err)
	}
	if len(content) == 0 {
		t.Fatal("embedded index.js is empty")
	}

	if _, err := fs.ReadFile(clientFS, "client/index.js"); err == nil {
		t.Fatal("client fs should be rooted at data/client (unexpected nested client/ path)")
	}
}

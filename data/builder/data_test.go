package builder

import (
	"bytes"
	"io/fs"
	"testing"
)

func TestClientFSMUIBuilderRootFSIncludesPackageDirectory(t *testing.T) {
	rootFS := ClientFSMUIBuilderRootFS()

	content, err := fs.ReadFile(rootFS, "fsm-ui-builder/index.js")
	if err != nil {
		t.Fatalf("read fsm-ui-builder/index.js from root builder fs: %v", err)
	}
	if len(content) == 0 {
		t.Fatal("embedded fsm-ui-builder/index.js is empty")
	}

	if _, err := fs.ReadFile(rootFS, "index.js"); err == nil {
		t.Fatal("builder root fs should remain rooted at data/client-builder")
	}
}

func TestClientFSMUIBuilderFSIsSubRooted(t *testing.T) {
	builderFS := ClientFSMUIBuilderFS()

	content, err := fs.ReadFile(builderFS, "index.js")
	if err != nil {
		t.Fatalf("read index.js from builder fs: %v", err)
	}
	if len(content) == 0 {
		t.Fatal("embedded builder index.js is empty")
	}

	if _, err := fs.ReadFile(builderFS, "fsm-ui-builder/index.js"); err == nil {
		t.Fatal("builder fs should be rooted at data/client-builder/fsm-ui-builder")
	}
}

func TestClientFSMUIBuilderFSDoesNotExposeRawProcessEnvNodeEnvChecks(t *testing.T) {
	builderFS := ClientFSMUIBuilderFS()

	content, err := fs.ReadFile(builderFS, "index.js")
	if err != nil {
		t.Fatalf("read index.js from builder fs: %v", err)
	}

	if bytes.Contains(content, []byte("process.env.NODE_ENV")) {
		t.Fatal("embedded builder index.js still contains raw process.env.NODE_ENV checks")
	}
}

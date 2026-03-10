package clientbuilder

import (
	"embed"
	"io/fs"
)

//go:embed fsm-ui-builder
var embeddedFS embed.FS

// ClientFSMUIBuilderRootFS returns builder artifacts rooted at `data/client-builder`.
func ClientFSMUIBuilderRootFS() fs.FS {
	return embeddedFS
}

// ClientFSMUIBuilderFS returns builder artifacts rooted at `data/client-builder/fsm-ui-builder`.
func ClientFSMUIBuilderFS() fs.FS {
	sub, err := fs.Sub(embeddedFS, "fsm-ui-builder")
	if err != nil {
		return embeddedFS
	}
	return sub
}

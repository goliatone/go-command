package builder

import (
	"io/fs"

	clientbuilder "github.com/goliatone/go-command/data/client-builder"
)

// ClientFSMUIBuilderRootFS returns builder artifacts rooted at `data/client-builder`.
func ClientFSMUIBuilderRootFS() fs.FS {
	return clientbuilder.ClientFSMUIBuilderRootFS()
}

// ClientFSMUIBuilderFS returns builder artifacts rooted at `data/client-builder/fsm-ui-builder`.
func ClientFSMUIBuilderFS() fs.FS {
	return clientbuilder.ClientFSMUIBuilderFS()
}

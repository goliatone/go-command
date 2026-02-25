package data

import (
	"embed"
	"io/fs"
)

//go:embed client
var embeddedFS embed.FS

// ClientFS returns embedded client build artifacts rooted at `data/client`.
func ClientFS() fs.FS {
	sub, err := fs.Sub(embeddedFS, "client")
	if err != nil {
		return embeddedFS
	}
	return sub
}

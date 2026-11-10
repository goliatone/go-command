// Command export writes the offline Go contract and real wire fixtures.
package main

import (
	"flag"
	"fmt"
	"github.com/goliatone/go-command/examples/rpc/tsgen/fixture"
	"os"
)

func run(out string) error { return fixture.Export(out) }
func main() {
	out := flag.String("out", ".", "existing output directory")
	flag.Parse()
	if err := run(*out); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}

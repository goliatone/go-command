// Command compare-export exports real Go declarations with controlled contract
// changes. It constructs no handlers and starts no services.
package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"os"
	"path/filepath"
	"reflect"

	"github.com/goliatone/go-command/examples/rpc/tsgen/fixture"
	"github.com/goliatone/go-command/rpc"
)

func run(out string) error {
	for _, variant := range []string{"baseline", "widen", "narrow", "added"} {
		opts := fixture.Options()
		opts.Bounds[reflect.TypeFor[int64]()] = rpc.IntegerBounds{Minimum: 0, Maximum: 10}
		switch variant {
		case "widen":
			opts.Bounds[reflect.TypeFor[int64]()] = rpc.IntegerBounds{Minimum: -1, Maximum: 11}
			opts.Enums[reflect.TypeFor[fixture.State]()] = []string{"ready", "done", "cancelled"}
		case "narrow":
			opts.Bounds[reflect.TypeFor[int64]()] = rpc.IntegerBounds{Minimum: 1, Maximum: 9}
			opts.Enums[reflect.TypeFor[fixture.State]()] = []string{"ready"}
		case "added":
			opts.Commands = append(opts.Commands, rpc.CommandContractFor[fixture.Input, fixture.Result]("example.additional"))
		}
		manifest, err := rpc.ExportContracts(opts)
		if err != nil {
			return err
		}
		data, err := json.MarshalIndent(manifest, "", "  ")
		if err != nil {
			return err
		}
		if err := os.WriteFile(filepath.Join(out, variant+".json"), append(data, '\n'), 0600); err != nil {
			return err
		}
	}
	return nil
}
func main() {
	out := flag.String("out", ".", "existing output directory")
	flag.Parse()
	if err := run(*out); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}

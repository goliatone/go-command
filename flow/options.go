package flow

import "github.com/goliatone/go-command/runner"

// Option mirrors runner.Option so flows can share runner configuration knobs.
type Option = runner.Option

// mergeOptions copies options so defaults are applied without mutating caller slices.
func mergeOptions(opts ...Option) []runner.Option {
	if len(opts) == 0 {
		return nil
	}
	out := make([]runner.Option, len(opts))
	copy(out, opts)
	return out
}

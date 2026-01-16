package command

// CommandExposure declares optional UI/REPL exposure metadata.
// The zero value is safe: ExposeInAdmin is false and Mutates is read-only.
type CommandExposure struct {
	// ExposeInAdmin signals this command can be listed in go-admin UI/REPL.
	ExposeInAdmin bool
	// Tags for grouping/filtering in UI (e.g. "debug", "ops").
	Tags []string
	// Permissions required to execute (admin will enforce).
	// If empty, consumers should derive defaults from Mutates.
	Permissions []string
	// Roles allowed to execute (optional).
	Roles []string
	// Mutates signals side effects; false implies read-only.
	Mutates bool
}

// ExposableCommand can be implemented by CLICommand (or any Command/Query).
// Opt-in is explicit: consumers should ignore commands that do not implement it
// or return ExposeInAdmin=false.
type ExposableCommand interface {
	Exposure() CommandExposure
}

// ExposureOf returns exposure metadata if cmd implements ExposableCommand.
func ExposureOf(cmd any) (CommandExposure, bool) {
	exposable, ok := cmd.(ExposableCommand)
	if !ok {
		return CommandExposure{}, false
	}

	return exposable.Exposure(), true
}

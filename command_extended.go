package command

import "strings"

type CronCommand interface {
	CronHandler() func() error
	CronOptions() HandlerConfig
}

type CLICommand interface {
	CLIHandler() any
	CLIOptions() CLIConfig
}

type HTTPCommand interface {
	HTTPHandler()
}

type CLIConfig struct {
	Path        []string
	Description string
	// Group is kept for backward compatibility; prefer Groups for nested paths.
	Group   string
	Groups  []CLIGroup
	Aliases []string
	Hidden  bool
}

type CLIGroup struct {
	Name        string
	Description string
}

func (opts CLIConfig) BuildTags() []string {
	var tags []string
	if len(opts.Aliases) > 0 {
		aliases := "aliases:" + strings.Join(opts.Aliases, ",")
		tags = append(tags, aliases)
	}

	if opts.Hidden {
		tags = append(tags, `hidden:""`)
	}

	return tags
}

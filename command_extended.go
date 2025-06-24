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
	Name        string
	Description string
	Group       string
	Aliases     []string
	Hidden      bool
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

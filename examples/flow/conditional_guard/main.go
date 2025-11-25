package main

import (
	"context"
	"fmt"

	"github.com/goliatone/go-command/flow"
)

type RuleMsg struct {
	Value int
}

func (RuleMsg) Type() string { return "rule_msg" }

func main() {
	guards := flow.NewGuardRegistry[RuleMsg]()
	guards.Register("is_even", func(m RuleMsg) bool { return m.Value%2 == 0 })

	branches := []flow.Conditional[RuleMsg]{
		{
			Guard: "is_even",
			Handler: func(ctx context.Context, m RuleMsg) error {
				fmt.Printf("%d is even\n", m.Value)
				return nil
			},
		},
	}

	exec := flow.NewConditionalExecutor(branches,
		flow.WithGuardRegistry(guards),
		flow.WithDefaultHandler(func(ctx context.Context, m RuleMsg) error {
			fmt.Printf("%d is odd (default handler)\n", m.Value)
			return nil
		}),
	)

	_ = exec.Execute(context.Background(), RuleMsg{Value: 2})
	_ = exec.Execute(context.Background(), RuleMsg{Value: 3})
}

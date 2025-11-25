package main

import (
	"context"
	"errors"
	"fmt"

	"github.com/goliatone/go-command/flow"
)

type PaymentMsg struct {
	ID string
}

func (PaymentMsg) Type() string { return "payment_msg" }

func main() {
	// Define saga steps
	steps := []flow.SagaStep[PaymentMsg]{
		{
			Name: "reserve_funds",
			Execute: func(ctx context.Context, msg PaymentMsg) error {
				fmt.Printf("reserving funds for %s\n", msg.ID)
				return nil
			},
			Compensate: func(ctx context.Context, msg PaymentMsg) error {
				fmt.Printf("releasing reserved funds for %s\n", msg.ID)
				return nil
			},
		},
		{
			Name: "charge_payment",
			Execute: func(ctx context.Context, msg PaymentMsg) error {
				fmt.Printf("charging payment for %s\n", msg.ID)
				return errors.New("payment gateway error")
			},
			Compensate: func(ctx context.Context, msg PaymentMsg) error {
				fmt.Printf("voiding charge for %s\n", msg.ID)
				return nil
			},
		},
		{
			Name: "notify",
			Execute: func(ctx context.Context, msg PaymentMsg) error {
				fmt.Printf("notifying customer for %s\n", msg.ID)
				return nil
			},
		},
	}

	s := flow.NewSaga(steps, true)

	if err := s.Execute(context.Background(), PaymentMsg{ID: "PAY-123"}); err != nil {
		fmt.Printf("saga failed: %v\n", err)
	} else {
		fmt.Println("saga completed successfully")
	}
}

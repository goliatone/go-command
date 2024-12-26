package dispatcher

import (
	"context"
	"sync"
	"sync/atomic"
	"testing"
	"time"

	"github.com/goliatone/go-command"
	"github.com/goliatone/go-command/router"
)

func TestConcurrentSubscribeUnsubscribe(t *testing.T) {
	mux = router.NewMux()

	var wg sync.WaitGroup
	numGoroutines := 100

	wg.Add(numGoroutines)
	for i := 0; i < numGoroutines; i++ {
		go func(id int) {
			defer wg.Done()

			// Create handler
			handler := command.CommandFunc[TestMessage](func(ctx context.Context, msg TestMessage) error {
				return nil
			})

			sub := SubscribeCommand(handler)
			time.Sleep(time.Millisecond)
			sub.Unsubscribe()
		}(i)
	}

	wg.Wait()
}

func TestConcurrentDispatch(t *testing.T) {
	mux = router.NewMux()

	var counter atomic.Int32
	numHandlers := 10
	numDispatches := 100

	subs := make([]Subscription, numHandlers)
	for i := 0; i < numHandlers; i++ {
		handler := command.CommandFunc[TestMessage](func(ctx context.Context, msg TestMessage) error {
			counter.Add(1)
			time.Sleep(time.Millisecond)
			return nil
		})
		subs[i] = SubscribeCommand(handler)
	}

	var wg sync.WaitGroup
	wg.Add(numDispatches)
	for i := 0; i < numDispatches; i++ {
		go func(id int) {
			defer wg.Done()
			msg := TestMessage{ID: id}
			Dispatch(context.Background(), msg)
		}(i)
	}

	wg.Wait()

	expected := int32(numHandlers * numDispatches)
	if counter.Load() != expected {
		t.Errorf("Expected %d handler executions, got %d", expected, counter.Load())
	}

	for _, sub := range subs {
		sub.Unsubscribe()
	}
}

func TestConcurrentSubscribeDispatch(t *testing.T) {
	mux = router.NewMux()

	var counter atomic.Int32
	var wg sync.WaitGroup
	numOperations := 100

	wg.Add(numOperations * 2)

	for i := 0; i < numOperations; i++ {
		go func() {
			defer wg.Done()

			handler := command.CommandFunc[TestMessage](func(ctx context.Context, msg TestMessage) error {
				counter.Add(1)
				time.Sleep(time.Millisecond)
				return nil
			})

			sub := SubscribeCommand(handler)
			time.Sleep(time.Millisecond * 10)
			sub.Unsubscribe()
		}()
	}

	for i := 0; i < numOperations; i++ {
		go func(id int) {
			defer wg.Done()
			msg := TestMessage{ID: id}
			Dispatch(context.Background(), msg)
		}(i)
	}

	wg.Wait()
}

func TestRaceSubscribeUnsubscribe(t *testing.T) {
	mux = router.NewMux()

	done := make(chan struct{})

	go func() {
		for {
			select {
			case <-done:
				return
			default:
				handler := command.CommandFunc[TestMessage](func(ctx context.Context, msg TestMessage) error {
					return nil
				})
				sub := SubscribeCommand(handler)
				time.Sleep(time.Microsecond)
				sub.Unsubscribe()
			}
		}
	}()

	// Start concurrent dispatches
	go func() {
		for {
			select {
			case <-done:
				return
			default:
				msg := TestMessage{ID: 1}
				Dispatch(context.Background(), msg)
			}
		}
	}()

	// Run for a short duration
	time.Sleep(time.Second)
	close(done)
}

func TestHandlerPanic(t *testing.T) {
	mux = router.NewMux()

	panicMsg := "intentional panic"

	handler := command.CommandFunc[TestMessage](func(ctx context.Context, msg TestMessage) error {
		panic(panicMsg)
	})
	sub := SubscribeCommand(handler)
	defer sub.Unsubscribe()

	msg := TestMessage{ID: 1}
	Dispatch(context.Background(), msg)
}

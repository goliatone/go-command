package cron

import "sync"

type Subscription interface {
	Unsubscribe()
}

// ScheduleStatus reports a schedule handle state.
type ScheduleStatus string

const (
	ScheduleStatusScheduled ScheduleStatus = "scheduled"
	ScheduleStatusRunning   ScheduleStatus = "running"
	ScheduleStatusIdle      ScheduleStatus = "idle"
	ScheduleStatusCompleted ScheduleStatus = "completed"
	ScheduleStatusCanceled  ScheduleStatus = "canceled"
	ScheduleStatusFailed    ScheduleStatus = "failed"
	ScheduleStatusStopped   ScheduleStatus = "stopped"
)

// Handle extends Subscription with lifecycle controls.
type Handle interface {
	Subscription
	Cancel()
	Status() ScheduleStatus
	Err() error
	Done() <-chan struct{}
	ID() int64
}

type cronSubscription struct {
	scheduler *Scheduler
	id        int64
	entryID   int
	done      chan struct{}

	mu     sync.RWMutex
	status ScheduleStatus
	err    error
	once   sync.Once
}

func (s *cronSubscription) Unsubscribe() {
	s.Cancel()
}

func (s *cronSubscription) Cancel() {
	if s == nil {
		return
	}
	s.once.Do(func() {
		if s.scheduler != nil {
			s.scheduler.removeHandle(s.id)
		}
		s.setTerminal(ScheduleStatusCanceled, nil)
	})
}

func (s *cronSubscription) Status() ScheduleStatus {
	if s == nil {
		return ScheduleStatusStopped
	}
	s.mu.RLock()
	defer s.mu.RUnlock()
	return s.status
}

func (s *cronSubscription) Err() error {
	if s == nil {
		return nil
	}
	s.mu.RLock()
	defer s.mu.RUnlock()
	return s.err
}

func (s *cronSubscription) Done() <-chan struct{} {
	if s == nil {
		ch := make(chan struct{})
		close(ch)
		return ch
	}
	return s.done
}

func (s *cronSubscription) ID() int64 {
	if s == nil {
		return 0
	}
	return s.id
}

func (s *cronSubscription) setStatus(status ScheduleStatus, err error) {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.status = status
	s.err = err
}

func (s *cronSubscription) setTerminal(status ScheduleStatus, err error) {
	s.setStatus(status, err)
	if s.done != nil {
		select {
		case <-s.done:
		default:
			close(s.done)
		}
	}
}

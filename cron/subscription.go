package cron

type Subscription interface {
	Unsubscribe()
}

type cronSubscription struct {
	scheduler *Scheduler
	entryID   int
}

func (s *cronSubscription) Unsubscribe() {
	s.scheduler.RemoveHandler(s.entryID)
}

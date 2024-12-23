package dispatcher

type Subscription interface {
	Unsubscribe()
}

type subs struct {
	dispatcher *Dispatcher
	msgType    string
	handler    any
}

func (s *subs) Unsubscribe() {
	d := s.dispatcher
	d.mu.Lock()
	defer d.mu.Unlock()

	handlers := d.handlers[s.msgType]
	newList := make([]any, 0, len(handlers))

	for _, h := range handlers {
		if h != s.handler {
			newList = append(newList, h)
		}
	}

	d.handlers[s.msgType] = newList
}

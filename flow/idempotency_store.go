package flow

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"strings"
	"sync"
	"time"
)

var ErrIdempotencyRecordExists = errors.New("idempotency record already exists")

// IdempotencyScope identifies one idempotency record boundary.
type IdempotencyScope struct {
	MachineID      string
	EntityID       string
	Event          string
	IdempotencyKey string
}

func (s IdempotencyScope) normalize() IdempotencyScope {
	return IdempotencyScope{
		MachineID:      strings.TrimSpace(s.MachineID),
		EntityID:       strings.TrimSpace(s.EntityID),
		Event:          normalizeEvent(s.Event),
		IdempotencyKey: strings.TrimSpace(s.IdempotencyKey),
	}
}

func (s IdempotencyScope) valid() bool {
	norm := s.normalize()
	return norm.MachineID != "" && norm.EntityID != "" && norm.Event != "" && norm.IdempotencyKey != ""
}

func (s IdempotencyScope) key() string {
	norm := s.normalize()
	return norm.MachineID + "::" + norm.EntityID + "::" + norm.Event + "::" + norm.IdempotencyKey
}

// IdempotencyRecord stores payload fingerprint and response replay data.
type IdempotencyRecord[T any] struct {
	Scope       IdempotencyScope
	RequestHash string
	Response    *ApplyEventResponse[T]
	CreatedAt   time.Time
}

// IdempotencyStore persists idempotency records keyed by machine+entity+event+idempotency-key.
type IdempotencyStore[T any] interface {
	Load(ctx context.Context, scope IdempotencyScope) (*IdempotencyRecord[T], error)
	Save(ctx context.Context, rec *IdempotencyRecord[T]) error
}

// InMemoryIdempotencyStore keeps idempotency records in memory.
type InMemoryIdempotencyStore[T any] struct {
	mu      sync.RWMutex
	records map[string]*IdempotencyRecord[T]
}

// NewInMemoryIdempotencyStore constructs an empty in-memory idempotency store.
func NewInMemoryIdempotencyStore[T any]() *InMemoryIdempotencyStore[T] {
	return &InMemoryIdempotencyStore[T]{
		records: make(map[string]*IdempotencyRecord[T]),
	}
}

func (s *InMemoryIdempotencyStore[T]) Load(_ context.Context, scope IdempotencyScope) (*IdempotencyRecord[T], error) {
	if s == nil {
		return nil, errors.New("idempotency store not configured")
	}
	if !scope.valid() {
		return nil, nil
	}
	key := scope.key()
	s.mu.RLock()
	defer s.mu.RUnlock()
	rec, ok := s.records[key]
	if !ok || rec == nil {
		return nil, nil
	}
	return cloneIdempotencyRecord(rec), nil
}

func (s *InMemoryIdempotencyStore[T]) Save(_ context.Context, rec *IdempotencyRecord[T]) error {
	if s == nil {
		return errors.New("idempotency store not configured")
	}
	rec = cloneIdempotencyRecord(rec)
	if rec == nil {
		return errors.New("idempotency record required")
	}
	rec.Scope = rec.Scope.normalize()
	if !rec.Scope.valid() {
		return errors.New("idempotency scope requires machine_id, entity_id, event, and idempotency_key")
	}
	if strings.TrimSpace(rec.RequestHash) == "" {
		return errors.New("idempotency request hash required")
	}
	if rec.Response == nil {
		return errors.New("idempotency response required")
	}
	if rec.CreatedAt.IsZero() {
		rec.CreatedAt = time.Now().UTC()
	}
	key := rec.Scope.key()

	s.mu.Lock()
	defer s.mu.Unlock()
	if _, exists := s.records[key]; exists {
		return ErrIdempotencyRecordExists
	}
	s.records[key] = rec
	return nil
}

type idempotencyKeyLocker struct {
	mu    sync.Mutex
	locks map[string]*idempotencyKeyLockRef
}

type idempotencyKeyLockRef struct {
	mu   sync.Mutex
	refs int
}

func newIdempotencyKeyLocker() *idempotencyKeyLocker {
	return &idempotencyKeyLocker{
		locks: make(map[string]*idempotencyKeyLockRef),
	}
}

func (l *idempotencyKeyLocker) Lock(key string) func() {
	if l == nil {
		return func() {}
	}
	key = strings.TrimSpace(key)
	if key == "" {
		return func() {}
	}
	l.mu.Lock()
	ref, ok := l.locks[key]
	if !ok || ref == nil {
		ref = &idempotencyKeyLockRef{}
		l.locks[key] = ref
	}
	ref.refs++
	l.mu.Unlock()

	ref.mu.Lock()
	return func() {
		ref.mu.Unlock()
		l.mu.Lock()
		ref.refs--
		if ref.refs <= 0 {
			delete(l.locks, key)
		}
		l.mu.Unlock()
	}
}

func idempotencyPayloadHash[T any](req ApplyEventRequest[T], machineID, entityID, event string) string {
	type payload[T any] struct {
		MachineID       string           `json:"machineId"`
		EntityID        string           `json:"entityId"`
		Event           string           `json:"event"`
		Msg             T                `json:"msg"`
		ExecCtx         ExecutionContext `json:"execCtx"`
		ExpectedState   string           `json:"expectedState,omitempty"`
		ExpectedVersion int              `json:"expectedVersion,omitempty"`
		Metadata        map[string]any   `json:"metadata,omitempty"`
		DryRun          bool             `json:"dryRun,omitempty"`
	}
	normalized := payload[T]{
		MachineID:       strings.TrimSpace(machineID),
		EntityID:        strings.TrimSpace(entityID),
		Event:           normalizeEvent(event),
		Msg:             req.Msg,
		ExecCtx:         req.ExecCtx,
		ExpectedState:   normalizeState(req.ExpectedState),
		ExpectedVersion: req.ExpectedVersion,
		Metadata:        copyMap(req.Metadata),
		DryRun:          req.DryRun,
	}
	raw, err := json.Marshal(normalized)
	if err != nil {
		raw = []byte(fmt.Sprintf("%#v", normalized))
	}
	hash := sha256.Sum256(raw)
	return hex.EncodeToString(hash[:])
}

func cloneIdempotencyRecord[T any](rec *IdempotencyRecord[T]) *IdempotencyRecord[T] {
	if rec == nil {
		return nil
	}
	cp := *rec
	cp.Scope = rec.Scope.normalize()
	cp.RequestHash = strings.TrimSpace(rec.RequestHash)
	cp.Response = cloneApplyEventResponse(rec.Response)
	return &cp
}

func cloneApplyEventResponse[T any](res *ApplyEventResponse[T]) *ApplyEventResponse[T] {
	if res == nil {
		return nil
	}
	cp := *res
	cp.Transition = cloneTransitionResult(res.Transition)
	cp.Snapshot = cloneSnapshot(res.Snapshot)
	cp.Execution = cloneExecutionHandle(res.Execution)
	return &cp
}

func cloneTransitionResult[T any](res *TransitionResult[T]) *TransitionResult[T] {
	if res == nil {
		return nil
	}
	cp := *res
	if len(res.Effects) > 0 {
		cp.Effects = append([]Effect(nil), res.Effects...)
	}
	return &cp
}

func cloneSnapshot(snap *Snapshot) *Snapshot {
	if snap == nil {
		return nil
	}
	cp := *snap
	cp.Metadata = copyMap(snap.Metadata)
	if len(snap.AllowedTransitions) > 0 {
		cp.AllowedTransitions = make([]TransitionInfo, len(snap.AllowedTransitions))
		for i := range snap.AllowedTransitions {
			item := snap.AllowedTransitions[i]
			item.Metadata = copyMap(item.Metadata)
			item.Target.Candidates = append([]string(nil), item.Target.Candidates...)
			item.Rejections = cloneGuardRejections(item.Rejections)
			cp.AllowedTransitions[i] = item
		}
	}
	return &cp
}

func cloneExecutionHandle(handle *ExecutionHandle) *ExecutionHandle {
	if handle == nil {
		return nil
	}
	cp := *handle
	cp.Metadata = copyMap(handle.Metadata)
	return &cp
}

func cloneGuardRejections(in []GuardRejection) []GuardRejection {
	if len(in) == 0 {
		return nil
	}
	out := make([]GuardRejection, len(in))
	for i := range in {
		item := in[i]
		item.Metadata = copyMap(item.Metadata)
		out[i] = item
	}
	return out
}

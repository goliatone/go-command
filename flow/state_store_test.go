package flow

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"sort"
	"strconv"
	"strings"
	"sync"
	"testing"
	"time"
)

var (
	_ OutboxStore = (*InMemoryStateStore)(nil)
	_ OutboxStore = (*SQLiteStateStore)(nil)
	_ OutboxStore = (*RedisStateStore)(nil)
)

func TestInMemoryStateStoreSaveIfVersionAndConflict(t *testing.T) {
	store := NewInMemoryStateStore()

	v1, err := store.SaveIfVersion(context.Background(), &StateRecord{EntityID: "1", State: "draft"}, 0)
	if err != nil {
		t.Fatalf("initial save failed: %v", err)
	}
	if v1 != 1 {
		t.Fatalf("expected version 1, got %d", v1)
	}

	if _, err := store.SaveIfVersion(context.Background(), &StateRecord{EntityID: "1", State: "approved"}, 0); !errors.Is(err, ErrStateVersionConflict) {
		t.Fatalf("expected version conflict, got %v", err)
	}

	v2, err := store.SaveIfVersion(context.Background(), &StateRecord{EntityID: "1", State: "approved"}, 1)
	if err != nil {
		t.Fatalf("save with version 1 failed: %v", err)
	}
	if v2 != 2 {
		t.Fatalf("expected version 2, got %d", v2)
	}
}

func TestInMemoryStateStoreRunInTransactionRollback(t *testing.T) {
	store := NewInMemoryStateStore()

	err := store.RunInTransaction(context.Background(), func(tx TxStore) error {
		if _, err := tx.SaveIfVersion(context.Background(), &StateRecord{EntityID: "1", State: "draft"}, 0); err != nil {
			return err
		}
		if err := tx.AppendOutbox(context.Background(), OutboxEntry{EntityID: "1", Event: "approve"}); err != nil {
			return err
		}
		return errors.New("boom")
	})
	if err == nil {
		t.Fatalf("expected transaction error")
	}

	rec, err := store.Load(context.Background(), "1")
	if err != nil {
		t.Fatalf("load failed: %v", err)
	}
	if rec != nil {
		t.Fatalf("expected rollback to discard state")
	}
	if len(store.OutboxEntries()) != 0 {
		t.Fatalf("expected rollback to discard outbox entries")
	}
}

func TestInMemoryStateStoreConcurrentCompareAndSet(t *testing.T) {
	store := NewInMemoryStateStore()
	if _, err := store.SaveIfVersion(context.Background(), &StateRecord{EntityID: "1", State: "draft"}, 0); err != nil {
		t.Fatalf("seed state failed: %v", err)
	}

	var wg sync.WaitGroup
	wg.Add(2)
	errs := make(chan error, 2)
	attempt := func() {
		defer wg.Done()
		_, err := store.SaveIfVersion(context.Background(), &StateRecord{EntityID: "1", State: "approved"}, 1)
		errs <- err
	}
	go attempt()
	go attempt()
	wg.Wait()
	close(errs)

	success := 0
	conflicts := 0
	for err := range errs {
		switch {
		case err == nil:
			success++
		case errors.Is(err, ErrStateVersionConflict):
			conflicts++
		default:
			t.Fatalf("unexpected error: %v", err)
		}
	}

	if success != 1 || conflicts != 1 {
		t.Fatalf("expected one success and one conflict, success=%d conflicts=%d", success, conflicts)
	}
}

func TestRedisStateStoreOutboxClaimLeaseAndRetry(t *testing.T) {
	store := NewRedisStateStore(newMockRedisClient(), time.Minute)
	err := store.RunInTransaction(context.Background(), func(tx TxStore) error {
		return tx.AppendOutbox(context.Background(), OutboxEntry{
			ID:       "outbox-redis-1",
			EntityID: "1",
			Event:    "approve",
			Effect:   CommandEffect{ActionID: "mark"},
		})
	})
	if err != nil {
		t.Fatalf("append outbox failed: %v", err)
	}

	claimed, err := store.ClaimPending(context.Background(), "worker-r", 10, time.Minute)
	if err != nil {
		t.Fatalf("claim pending failed: %v", err)
	}
	if len(claimed) != 1 {
		t.Fatalf("expected one claimed entry, got %d", len(claimed))
	}
	if claimed[0].Status != "leased" {
		t.Fatalf("expected leased status, got %s", claimed[0].Status)
	}

	retryAt := time.Now().UTC().Add(20 * time.Millisecond)
	if err := store.MarkFailed(context.Background(), "outbox-redis-1", claimed[0].LeaseToken, retryAt, "boom"); err != nil {
		t.Fatalf("mark failed: %v", err)
	}
	claimed, err = store.ClaimPending(context.Background(), "worker-r", 10, time.Minute)
	if err != nil {
		t.Fatalf("claim pending after failure failed: %v", err)
	}
	if len(claimed) != 0 {
		t.Fatalf("expected retry gate to block immediate claim")
	}

	time.Sleep(30 * time.Millisecond)
	claimed, err = store.ClaimPending(context.Background(), "worker-r", 10, time.Minute)
	if err != nil {
		t.Fatalf("claim pending retry window failed: %v", err)
	}
	if len(claimed) != 1 {
		t.Fatalf("expected one re-claimed entry, got %d", len(claimed))
	}

	if err := store.MarkCompleted(context.Background(), "outbox-redis-1", claimed[0].LeaseToken); err != nil {
		t.Fatalf("mark completed failed: %v", err)
	}
	claimed, err = store.ClaimPending(context.Background(), "worker-r", 10, time.Minute)
	if err != nil {
		t.Fatalf("claim after completion failed: %v", err)
	}
	if len(claimed) != 0 {
		t.Fatalf("expected completed outbox to be excluded")
	}
}

type mockRedisClient struct {
	mu          sync.RWMutex
	state       map[string]string
	outbox      map[string]mockRedisOutboxRow
	pending     map[string]int64
	counter     int64
	scriptsBy   map[string]string
	shaByScript map[string]string
}

func newMockRedisClient() *mockRedisClient {
	return &mockRedisClient{
		state:       make(map[string]string),
		outbox:      make(map[string]mockRedisOutboxRow),
		pending:     make(map[string]int64),
		scriptsBy:   make(map[string]string),
		shaByScript: make(map[string]string),
	}
}

type mockRedisOutboxRow struct {
	ID           string
	EntityID     string
	TransitionID string
	ExecutionID  string
	Event        string
	Topic        string
	EffectType   string
	Payload      string
	Status       string
	Attempts     int64
	LeaseOwner   string
	LeaseUntilMS int64
	LeaseToken   string
	RetryAtMS    int64
	ProcessedMS  int64
	LastError    string
	MetadataJSON string
	CreatedAtMS  int64
}

func (m *mockRedisClient) ScriptLoad(_ context.Context, script string) (string, error) {
	m.mu.Lock()
	defer m.mu.Unlock()
	if sha, ok := m.shaByScript[script]; ok {
		return sha, nil
	}
	sha := fmt.Sprintf("sha-%d", len(m.shaByScript)+1)
	m.shaByScript[script] = sha
	m.scriptsBy[sha] = script
	return sha, nil
}

func (m *mockRedisClient) EvalSHA(ctx context.Context, sha string, keys []string, args ...any) (any, error) {
	m.mu.RLock()
	script, ok := m.scriptsBy[sha]
	m.mu.RUnlock()
	if !ok {
		return nil, errors.New("NOSCRIPT no matching script")
	}
	return m.Eval(ctx, script, keys, args...)
}

func (m *mockRedisClient) Eval(_ context.Context, script string, keys []string, args ...any) (any, error) {
	m.mu.Lock()
	defer m.mu.Unlock()
	switch script {
	case redisScriptLoadState:
		return m.evalLoadState(keys)
	case redisScriptSaveIfVersion:
		return m.evalSaveIfVersion(keys, args)
	case redisScriptCommitTx:
		return m.evalCommitTx(keys, args)
	case redisScriptClaimPending:
		return m.evalClaimPending(args)
	case redisScriptMarkCompleted:
		return m.evalMarkCompleted(args)
	case redisScriptMarkFailed:
		return m.evalMarkFailed(args)
	case redisScriptExtendLease:
		return m.evalExtendLease(args)
	default:
		return nil, fmt.Errorf("unsupported script")
	}
}

func (m *mockRedisClient) evalLoadState(keys []string) (any, error) {
	if len(keys) == 0 {
		return nil, nil
	}
	return m.state[keys[0]], nil
}

func (m *mockRedisClient) evalSaveIfVersion(keys []string, args []any) (any, error) {
	if len(keys) == 0 {
		return nil, errors.New("missing key")
	}
	key := keys[0]
	expected := mockArgInt64(args, 0)
	payload := mockArgString(args, 1)

	currentVersion := int64(0)
	if currentRaw := strings.TrimSpace(m.state[key]); currentRaw != "" {
		var current StateRecord
		if err := json.Unmarshal([]byte(currentRaw), &current); err != nil {
			return nil, err
		}
		currentVersion = int64(current.Version)
	}
	if currentVersion != expected {
		return nil, errors.New("FSM_VERSION_CONFLICT")
	}
	var next StateRecord
	if err := json.Unmarshal([]byte(payload), &next); err != nil {
		return nil, err
	}
	next.Version = int(expected + 1)
	encoded, _ := json.Marshal(next)
	m.state[key] = string(encoded)
	return fmt.Sprintf("%d", next.Version), nil
}

func (m *mockRedisClient) evalCommitTx(keys []string, args []any) (any, error) {
	if len(keys) < 4 {
		return nil, errors.New("missing keys")
	}
	hasState := mockArgInt64(args, 0)
	expected := mockArgInt64(args, 1)
	stateJSON := mockArgString(args, 2)
	nowMS := mockArgInt64(args, 4)
	outboxJSON := mockArgString(args, 5)
	stateKey := keys[3]

	if hasState == 1 {
		currentVersion := int64(0)
		if currentRaw := strings.TrimSpace(m.state[stateKey]); currentRaw != "" {
			var current StateRecord
			if err := json.Unmarshal([]byte(currentRaw), &current); err != nil {
				return nil, err
			}
			currentVersion = int64(current.Version)
		}
		if currentVersion != expected {
			return nil, errors.New("FSM_VERSION_CONFLICT")
		}
		var next StateRecord
		if err := json.Unmarshal([]byte(stateJSON), &next); err != nil {
			return nil, err
		}
		next.Version = int(currentVersion + 1)
		encoded, _ := json.Marshal(next)
		m.state[stateKey] = string(encoded)
	}

	var payloads []redisOutboxPayload
	if strings.TrimSpace(outboxJSON) != "" {
		if err := json.Unmarshal([]byte(outboxJSON), &payloads); err != nil {
			return nil, err
		}
	}
	for _, p := range payloads {
		id := strings.TrimSpace(p.ID)
		if id == "" {
			m.counter++
			id = fmt.Sprintf("outbox-%d", m.counter)
		}
		visible := p.RetryAtMS
		if visible <= 0 {
			visible = nowMS
		}
		m.outbox[id] = mockRedisOutboxRow{
			ID:           id,
			EntityID:     p.EntityID,
			TransitionID: p.TransitionID,
			ExecutionID:  p.ExecutionID,
			Event:        p.Event,
			Topic:        p.Topic,
			EffectType:   p.EffectType,
			Payload:      p.Payload,
			Status:       "pending",
			Attempts:     0,
			RetryAtMS:    visible,
			MetadataJSON: p.MetadataJSON,
			CreatedAtMS:  p.CreatedAtMS,
		}
		m.pending[id] = visible
	}
	return "ok", nil
}

func (m *mockRedisClient) evalClaimPending(args []any) (any, error) {
	leaseTTL := mockArgInt64(args, 0)
	workerID := mockArgString(args, 1)
	limit := int(mockArgInt64(args, 2))
	if limit <= 0 {
		limit = 100
	}
	nowMS := time.Now().UTC().UnixMilli()
	leaseUntilMS := nowMS + leaseTTL

	ids := make([]string, 0, len(m.pending))
	for id, score := range m.pending {
		if score <= nowMS {
			ids = append(ids, id)
		}
	}
	sort.Strings(ids)

	claimed := make([]any, 0, limit)
	for _, id := range ids {
		if len(claimed) >= limit {
			break
		}
		row, ok := m.outbox[id]
		if !ok {
			continue
		}
		if row.Status == "completed" {
			continue
		}
		if row.Status == "leased" && row.LeaseUntilMS > nowMS {
			continue
		}
		m.counter++
		token := fmt.Sprintf("%d:%s:%s", m.counter, id, workerID)
		row.Status = "leased"
		row.LeaseOwner = workerID
		row.LeaseUntilMS = leaseUntilMS
		row.LeaseToken = token
		row.Attempts++
		m.outbox[id] = row

		encoded, _ := json.Marshal(map[string]any{
			"id":              row.ID,
			"entity_id":       row.EntityID,
			"transition_id":   row.TransitionID,
			"execution_id":    row.ExecutionID,
			"event":           row.Event,
			"topic":           row.Topic,
			"effect_type":     row.EffectType,
			"payload":         row.Payload,
			"status":          row.Status,
			"attempts":        fmt.Sprintf("%d", row.Attempts),
			"lease_owner":     row.LeaseOwner,
			"lease_until_ms":  fmt.Sprintf("%d", row.LeaseUntilMS),
			"lease_token":     row.LeaseToken,
			"retry_at_ms":     fmt.Sprintf("%d", row.RetryAtMS),
			"processed_at_ms": fmt.Sprintf("%d", row.ProcessedMS),
			"last_error":      row.LastError,
			"metadata_json":   row.MetadataJSON,
			"created_at_ms":   fmt.Sprintf("%d", row.CreatedAtMS),
		})
		claimed = append(claimed, string(encoded))
	}
	return claimed, nil
}

func (m *mockRedisClient) evalMarkCompleted(args []any) (any, error) {
	id := mockArgString(args, 0)
	token := mockArgString(args, 1)
	row, ok := m.outbox[id]
	if !ok {
		return int64(-1), nil
	}
	if row.LeaseToken != token {
		return int64(-2), nil
	}
	if row.Status != "leased" {
		return int64(-3), nil
	}
	row.Status = "completed"
	row.LeaseOwner = ""
	row.LeaseUntilMS = 0
	row.LeaseToken = ""
	row.RetryAtMS = 0
	row.ProcessedMS = time.Now().UTC().UnixMilli()
	row.LastError = ""
	m.outbox[id] = row
	delete(m.pending, id)
	return int64(1), nil
}

func (m *mockRedisClient) evalMarkFailed(args []any) (any, error) {
	id := mockArgString(args, 0)
	token := mockArgString(args, 1)
	retryAt := mockArgInt64(args, 2)
	reason := mockArgString(args, 3)
	row, ok := m.outbox[id]
	if !ok {
		return int64(-1), nil
	}
	if row.LeaseToken != token {
		return int64(-2), nil
	}
	if row.Status != "leased" {
		return int64(-3), nil
	}
	row.Status = "pending"
	row.LeaseOwner = ""
	row.LeaseUntilMS = 0
	row.LeaseToken = ""
	row.RetryAtMS = retryAt
	row.ProcessedMS = 0
	row.LastError = reason
	m.outbox[id] = row
	m.pending[id] = retryAt
	return int64(1), nil
}

func (m *mockRedisClient) evalExtendLease(args []any) (any, error) {
	id := mockArgString(args, 0)
	token := mockArgString(args, 1)
	leaseTTL := mockArgInt64(args, 2)
	row, ok := m.outbox[id]
	if !ok {
		return int64(-1), nil
	}
	if row.LeaseToken != token {
		return int64(-2), nil
	}
	if row.Status != "leased" {
		return int64(-3), nil
	}
	row.LeaseUntilMS = time.Now().UTC().UnixMilli() + leaseTTL
	m.outbox[id] = row
	return int64(1), nil
}

func mockArgString(args []any, idx int) string {
	if idx < 0 || idx >= len(args) {
		return ""
	}
	return strings.TrimSpace(fmt.Sprintf("%v", args[idx]))
}

func mockArgInt64(args []any, idx int) int64 {
	value := mockArgString(args, idx)
	if value == "" {
		return 0
	}
	out, _ := strconv.ParseInt(value, 10, 64)
	return out
}

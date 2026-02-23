package flow

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"strings"
	"sync"
	"sync/atomic"
	"time"
)

var (
	// ErrStateVersionConflict indicates optimistic-lock compare-and-set failure.
	ErrStateVersionConflict = errors.New("state version conflict")
)

// StateRecord is the persisted state row for an entity.
type StateRecord struct {
	EntityID       string
	State          string
	Version        int
	MachineID      string
	MachineVersion string
	Metadata       map[string]any
	UpdatedAt      time.Time
}

// OutboxEntry stores durable effect descriptors emitted with state commits.
type OutboxEntry struct {
	ID           string
	EntityID     string
	TransitionID string
	ExecutionID  string
	Event        string
	Topic        string
	Payload      []byte
	Effect       Effect
	Status       string
	Attempts     int
	LeaseOwner   string
	LeaseUntil   time.Time
	RetryAt      time.Time
	CreatedAt    time.Time
	ProcessedAt  *time.Time
	LastError    string
	Metadata     map[string]any
}

// StateStore persists state records with optimistic locking and transactional outbox writes.
type StateStore interface {
	Load(ctx context.Context, id string) (*StateRecord, error)
	SaveIfVersion(ctx context.Context, rec *StateRecord, expectedVersion int) (newVersion int, err error)
	RunInTransaction(ctx context.Context, fn func(TxStore) error) error
}

// TxStore is the transactional state store boundary.
type TxStore interface {
	Load(ctx context.Context, id string) (*StateRecord, error)
	SaveIfVersion(ctx context.Context, rec *StateRecord, expectedVersion int) (newVersion int, err error)
	AppendOutbox(ctx context.Context, entry OutboxEntry) error
}

// InMemoryStateStore is a thread-safe in-memory state and outbox store.
type InMemoryStateStore struct {
	mu     sync.RWMutex
	state  map[string]*StateRecord
	outbox []OutboxEntry
}

// NewInMemoryStateStore constructs an empty store.
func NewInMemoryStateStore() *InMemoryStateStore {
	return &InMemoryStateStore{
		state: make(map[string]*StateRecord),
	}
}

// Load returns a cloned state record for the entity.
func (s *InMemoryStateStore) Load(_ context.Context, key string) (*StateRecord, error) {
	if s == nil {
		return nil, errors.New("in-memory store not configured")
	}
	key = strings.TrimSpace(key)
	if key == "" {
		return nil, nil
	}
	s.mu.RLock()
	defer s.mu.RUnlock()
	rec, ok := s.state[key]
	if !ok || rec == nil {
		return nil, nil
	}
	return cloneStateRecord(rec), nil
}

// SaveIfVersion performs compare-and-set persistence for state records.
func (s *InMemoryStateStore) SaveIfVersion(_ context.Context, rec *StateRecord, expectedVersion int) (int, error) {
	if s == nil {
		return 0, errors.New("in-memory store not configured")
	}
	s.mu.Lock()
	defer s.mu.Unlock()
	return saveIfVersionUnlocked(s.state, rec, expectedVersion)
}

// RunInTransaction applies mutations atomically with rollback on error.
func (s *InMemoryStateStore) RunInTransaction(ctx context.Context, fn func(TxStore) error) error {
	if s == nil {
		return errors.New("in-memory store not configured")
	}
	if fn == nil {
		return nil
	}
	_ = ctx

	s.mu.Lock()
	defer s.mu.Unlock()

	tx := &inMemoryTxStore{
		state:  cloneStateMap(s.state),
		outbox: cloneOutboxEntries(s.outbox),
	}
	if err := fn(tx); err != nil {
		return err
	}
	s.state = tx.state
	s.outbox = tx.outbox
	return nil
}

// OutboxEntries returns a cloned outbox slice for assertions and debugging.
func (s *InMemoryStateStore) OutboxEntries() []OutboxEntry {
	if s == nil {
		return nil
	}
	s.mu.RLock()
	defer s.mu.RUnlock()
	return cloneOutboxEntries(s.outbox)
}

// ClaimPending claims pending entries with a lease for the given worker.
func (s *InMemoryStateStore) ClaimPending(
	_ context.Context,
	workerID string,
	limit int,
	leaseUntil time.Time,
) ([]OutboxEntry, error) {
	if s == nil {
		return nil, errors.New("in-memory store not configured")
	}
	workerID = strings.TrimSpace(workerID)
	if workerID == "" {
		return nil, errors.New("worker id required")
	}
	if limit <= 0 {
		limit = 100
	}
	if leaseUntil.IsZero() {
		leaseUntil = time.Now().UTC().Add(30 * time.Second)
	} else {
		leaseUntil = leaseUntil.UTC()
	}
	now := time.Now().UTC()

	s.mu.Lock()
	defer s.mu.Unlock()

	claimed := make([]OutboxEntry, 0, limit)
	for idx := range s.outbox {
		entry := s.outbox[idx]
		if !isClaimableOutboxEntry(entry, now) {
			continue
		}
		entry.Status = "leased"
		entry.LeaseOwner = workerID
		entry.LeaseUntil = leaseUntil
		entry.Attempts++
		s.outbox[idx] = entry
		claimed = append(claimed, cloneOutboxEntry(entry))
		if len(claimed) >= limit {
			break
		}
	}
	return claimed, nil
}

// MarkCompleted marks an outbox entry as fully dispatched.
func (s *InMemoryStateStore) MarkCompleted(_ context.Context, id string) error {
	if s == nil {
		return errors.New("in-memory store not configured")
	}
	id = strings.TrimSpace(id)
	if id == "" {
		return errors.New("outbox id required")
	}
	processedAt := time.Now().UTC()

	s.mu.Lock()
	defer s.mu.Unlock()
	for idx := range s.outbox {
		if s.outbox[idx].ID != id {
			continue
		}
		s.outbox[idx].Status = "completed"
		s.outbox[idx].LeaseOwner = ""
		s.outbox[idx].LeaseUntil = time.Time{}
		s.outbox[idx].ProcessedAt = &processedAt
		s.outbox[idx].RetryAt = time.Time{}
		s.outbox[idx].LastError = ""
		return nil
	}
	return fmt.Errorf("outbox %s not found", id)
}

// MarkFailed marks an outbox entry as failed and schedules retry.
func (s *InMemoryStateStore) MarkFailed(_ context.Context, id string, retryAt time.Time, reason string) error {
	if s == nil {
		return errors.New("in-memory store not configured")
	}
	id = strings.TrimSpace(id)
	if id == "" {
		return errors.New("outbox id required")
	}
	retryAt = retryAt.UTC()

	s.mu.Lock()
	defer s.mu.Unlock()
	for idx := range s.outbox {
		if s.outbox[idx].ID != id {
			continue
		}
		s.outbox[idx].Status = "pending"
		s.outbox[idx].LeaseOwner = ""
		s.outbox[idx].LeaseUntil = time.Time{}
		s.outbox[idx].RetryAt = retryAt
		s.outbox[idx].LastError = strings.TrimSpace(reason)
		s.outbox[idx].ProcessedAt = nil
		return nil
	}
	return fmt.Errorf("outbox %s not found", id)
}

type inMemoryTxStore struct {
	state  map[string]*StateRecord
	outbox []OutboxEntry
}

func (tx *inMemoryTxStore) Load(_ context.Context, key string) (*StateRecord, error) {
	key = strings.TrimSpace(key)
	if key == "" {
		return nil, nil
	}
	rec, ok := tx.state[key]
	if !ok || rec == nil {
		return nil, nil
	}
	return cloneStateRecord(rec), nil
}

func (tx *inMemoryTxStore) SaveIfVersion(_ context.Context, rec *StateRecord, expectedVersion int) (int, error) {
	return saveIfVersionUnlocked(tx.state, rec, expectedVersion)
}

func (tx *inMemoryTxStore) AppendOutbox(_ context.Context, entry OutboxEntry) error {
	tx.outbox = append(tx.outbox, normalizeOutboxEntry(entry))
	return nil
}

// SQLiteStateStore persists records and outbox entries in SQLite.
type SQLiteStateStore struct {
	db          *sql.DB
	stateTable  string
	outboxTable string
}

// NewSQLiteStateStore builds a store using the given DB and state table name.
func NewSQLiteStateStore(db *sql.DB, table string) *SQLiteStateStore {
	if table == "" {
		table = "states"
	}
	return &SQLiteStateStore{
		db:          db,
		stateTable:  table,
		outboxTable: table + "_outbox",
	}
}

// Load reads state for entity id.
func (s *SQLiteStateStore) Load(ctx context.Context, id string) (*StateRecord, error) {
	if s == nil || s.db == nil {
		return nil, errors.New("sqlite store not configured")
	}
	if err := s.ensureSchema(ctx, s.db); err != nil {
		return nil, err
	}
	id = strings.TrimSpace(id)
	if id == "" {
		return nil, nil
	}

	q := fmt.Sprintf(`SELECT entity_id, state, version, machine_id, machine_version, metadata, updated_at FROM %s WHERE entity_id = ?`, s.stateTable)
	var rec StateRecord
	var metadataJSON string
	var updatedAtStr string
	err := s.db.QueryRowContext(ctx, q, id).Scan(
		&rec.EntityID,
		&rec.State,
		&rec.Version,
		&rec.MachineID,
		&rec.MachineVersion,
		&metadataJSON,
		&updatedAtStr,
	)
	if errors.Is(err, sql.ErrNoRows) {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	if metadataJSON != "" {
		_ = json.Unmarshal([]byte(metadataJSON), &rec.Metadata)
	}
	if updatedAtStr != "" {
		if ts, parseErr := time.Parse(time.RFC3339Nano, updatedAtStr); parseErr == nil {
			rec.UpdatedAt = ts
		}
	}
	return &rec, nil
}

// SaveIfVersion writes record using optimistic version compare.
func (s *SQLiteStateStore) SaveIfVersion(ctx context.Context, rec *StateRecord, expectedVersion int) (int, error) {
	if s == nil || s.db == nil {
		return 0, errors.New("sqlite store not configured")
	}
	if err := s.ensureSchema(ctx, s.db); err != nil {
		return 0, err
	}
	return s.saveIfVersion(ctx, s.db, s.stateTable, rec, expectedVersion)
}

// RunInTransaction executes fn in a DB transaction.
func (s *SQLiteStateStore) RunInTransaction(ctx context.Context, fn func(TxStore) error) error {
	if s == nil || s.db == nil {
		return errors.New("sqlite store not configured")
	}
	if fn == nil {
		return nil
	}
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	if err := s.ensureSchema(ctx, tx); err != nil {
		_ = tx.Rollback()
		return err
	}
	store := &sqliteTxStore{parent: s, tx: tx}
	if err := fn(store); err != nil {
		_ = tx.Rollback()
		return err
	}
	return tx.Commit()
}

type sqliteTxStore struct {
	parent *SQLiteStateStore
	tx     *sql.Tx
}

func (s *sqliteTxStore) Load(ctx context.Context, id string) (*StateRecord, error) {
	if s == nil || s.tx == nil {
		return nil, errors.New("sqlite tx store not configured")
	}
	id = strings.TrimSpace(id)
	if id == "" {
		return nil, nil
	}
	q := fmt.Sprintf(`SELECT entity_id, state, version, machine_id, machine_version, metadata, updated_at FROM %s WHERE entity_id = ?`, s.parent.stateTable)
	var rec StateRecord
	var metadataJSON string
	var updatedAtStr string
	err := s.tx.QueryRowContext(ctx, q, id).Scan(
		&rec.EntityID,
		&rec.State,
		&rec.Version,
		&rec.MachineID,
		&rec.MachineVersion,
		&metadataJSON,
		&updatedAtStr,
	)
	if errors.Is(err, sql.ErrNoRows) {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	if metadataJSON != "" {
		_ = json.Unmarshal([]byte(metadataJSON), &rec.Metadata)
	}
	if updatedAtStr != "" {
		if ts, parseErr := time.Parse(time.RFC3339Nano, updatedAtStr); parseErr == nil {
			rec.UpdatedAt = ts
		}
	}
	return &rec, nil
}

func (s *sqliteTxStore) SaveIfVersion(ctx context.Context, rec *StateRecord, expectedVersion int) (int, error) {
	if s == nil || s.tx == nil {
		return 0, errors.New("sqlite tx store not configured")
	}
	return s.parent.saveIfVersion(ctx, s.tx, s.parent.stateTable, rec, expectedVersion)
}

func (s *sqliteTxStore) AppendOutbox(ctx context.Context, entry OutboxEntry) error {
	if s == nil || s.tx == nil {
		return errors.New("sqlite tx store not configured")
	}
	entry = normalizeOutboxEntry(entry)
	effectType, payloadJSON, err := marshalEffect(entry.Effect)
	if err != nil {
		return err
	}
	metadataJSON, err := json.Marshal(entry.Metadata)
	if err != nil {
		return err
	}
	q := fmt.Sprintf(`INSERT INTO %s (id, entity_id, transition_id, event, effect_type, payload, status, metadata, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, s.parent.outboxTable)
	_, err = s.tx.ExecContext(ctx, q,
		entry.ID,
		entry.EntityID,
		entry.TransitionID,
		entry.Event,
		effectType,
		string(payloadJSON),
		entry.Status,
		string(metadataJSON),
		entry.CreatedAt.UTC().Format(time.RFC3339Nano),
	)
	return err
}

func (s *SQLiteStateStore) saveIfVersion(ctx context.Context, exec sqlExecContext, table string, rec *StateRecord, expectedVersion int) (int, error) {
	rec = cloneStateRecord(rec)
	if rec == nil {
		return 0, errors.New("state record required")
	}
	rec.EntityID = strings.TrimSpace(rec.EntityID)
	if rec.EntityID == "" {
		return 0, errors.New("state record entity id required")
	}
	rec.State = normalizeState(rec.State)
	if rec.State == "" {
		return 0, errors.New("state record state required")
	}
	if expectedVersion < 0 {
		expectedVersion = 0
	}
	if rec.UpdatedAt.IsZero() {
		rec.UpdatedAt = time.Now().UTC()
	}
	metadataJSON, err := json.Marshal(rec.Metadata)
	if err != nil {
		return 0, err
	}

	if expectedVersion == 0 {
		q := fmt.Sprintf(`INSERT OR IGNORE INTO %s (entity_id, state, version, machine_id, machine_version, metadata, updated_at) VALUES (?, ?, 1, ?, ?, ?, ?)`, table)
		result, err := exec.ExecContext(ctx, q,
			rec.EntityID,
			rec.State,
			rec.MachineID,
			rec.MachineVersion,
			string(metadataJSON),
			rec.UpdatedAt.UTC().Format(time.RFC3339Nano),
		)
		if err != nil {
			return 0, err
		}
		rows, _ := result.RowsAffected()
		if rows == 0 {
			return 0, ErrStateVersionConflict
		}
		return 1, nil
	}

	newVersion := expectedVersion + 1
	q := fmt.Sprintf(`UPDATE %s SET state=?, version=?, machine_id=?, machine_version=?, metadata=?, updated_at=? WHERE entity_id=? AND version=?`, table)
	result, err := exec.ExecContext(ctx, q,
		rec.State,
		newVersion,
		rec.MachineID,
		rec.MachineVersion,
		string(metadataJSON),
		rec.UpdatedAt.UTC().Format(time.RFC3339Nano),
		rec.EntityID,
		expectedVersion,
	)
	if err != nil {
		return 0, err
	}
	rows, _ := result.RowsAffected()
	if rows == 0 {
		return 0, ErrStateVersionConflict
	}
	return newVersion, nil
}

func (s *SQLiteStateStore) ensureSchema(ctx context.Context, exec sqlExecContext) error {
	if exec == nil {
		return errors.New("sqlite exec not configured")
	}
	stateDDL := fmt.Sprintf(`CREATE TABLE IF NOT EXISTS %s (
		entity_id TEXT PRIMARY KEY,
		state TEXT NOT NULL,
		version INTEGER NOT NULL,
		machine_id TEXT,
		machine_version TEXT,
		metadata TEXT,
		updated_at TEXT NOT NULL
	)`, s.stateTable)
	if _, err := exec.ExecContext(ctx, stateDDL); err != nil {
		return err
	}
	outboxDDL := fmt.Sprintf(`CREATE TABLE IF NOT EXISTS %s (
		id TEXT PRIMARY KEY,
		entity_id TEXT NOT NULL,
		transition_id TEXT,
		event TEXT,
		effect_type TEXT NOT NULL,
		payload TEXT NOT NULL,
		status TEXT NOT NULL,
		metadata TEXT,
		created_at TEXT NOT NULL
	)`, s.outboxTable)
	if _, err := exec.ExecContext(ctx, outboxDDL); err != nil {
		return err
	}
	return nil
}

// RedisStateStore persists state records via a minimal redis client contract.
type RedisStateStore struct {
	client    RedisClient
	ttl       time.Duration
	keyPrefix string
	mu        sync.Mutex
	outbox    []OutboxEntry
}

// RedisClient captures the minimal commands needed from a redis client.
type RedisClient interface {
	Get(ctx context.Context, key string) (string, error)
	Set(ctx context.Context, key string, value interface{}, expiration time.Duration) error
}

// NewRedisStateStore builds a store using the provided client and TTL.
func NewRedisStateStore(client RedisClient, ttl time.Duration) *RedisStateStore {
	return &RedisStateStore{client: client, ttl: ttl, keyPrefix: "fsm_state:"}
}

// Load reads state from redis.
func (s *RedisStateStore) Load(ctx context.Context, id string) (*StateRecord, error) {
	if s == nil || s.client == nil {
		return nil, errors.New("redis store not configured")
	}
	key := s.redisKey(id)
	if key == "" {
		return nil, nil
	}
	return s.loadByKey(ctx, key)
}

// SaveIfVersion performs optimistic-lock update using read/compare/write semantics.
func (s *RedisStateStore) SaveIfVersion(ctx context.Context, rec *StateRecord, expectedVersion int) (int, error) {
	if s == nil || s.client == nil {
		return 0, errors.New("redis store not configured")
	}
	s.mu.Lock()
	defer s.mu.Unlock()
	return s.saveIfVersionUnlocked(ctx, rec, expectedVersion)
}

// RunInTransaction stages changes and commits atomically for the current process.
func (s *RedisStateStore) RunInTransaction(ctx context.Context, fn func(TxStore) error) error {
	if s == nil || s.client == nil {
		return errors.New("redis store not configured")
	}
	if fn == nil {
		return nil
	}

	s.mu.Lock()
	defer s.mu.Unlock()

	tx := &redisTxStore{parent: s, writes: make(map[string]*StateRecord)}
	if err := fn(tx); err != nil {
		return err
	}
	for key, rec := range tx.writes {
		payload, err := json.Marshal(rec)
		if err != nil {
			return err
		}
		if err := s.client.Set(ctx, key, string(payload), s.ttl); err != nil {
			return err
		}
	}
	s.outbox = append(s.outbox, tx.outbox...)
	return nil
}

type redisTxStore struct {
	parent *RedisStateStore
	writes map[string]*StateRecord
	outbox []OutboxEntry
}

func (tx *redisTxStore) Load(ctx context.Context, id string) (*StateRecord, error) {
	key := tx.parent.redisKey(id)
	if key == "" {
		return nil, nil
	}
	if rec, ok := tx.writes[key]; ok {
		return cloneStateRecord(rec), nil
	}
	return tx.parent.loadByKey(ctx, key)
}

func (tx *redisTxStore) SaveIfVersion(ctx context.Context, rec *StateRecord, expectedVersion int) (int, error) {
	rec = cloneStateRecord(rec)
	if rec == nil {
		return 0, errors.New("state record required")
	}
	key := tx.parent.redisKey(rec.EntityID)
	if key == "" {
		return 0, errors.New("state record entity id required")
	}
	var current *StateRecord
	if existing, ok := tx.writes[key]; ok {
		current = cloneStateRecord(existing)
	} else {
		loaded, err := tx.parent.loadByKey(ctx, key)
		if err != nil {
			return 0, err
		}
		current = loaded
	}
	version, err := applyVersionedRecordUpdate(rec, current, expectedVersion)
	if err != nil {
		return 0, err
	}
	tx.writes[key] = rec
	return version, nil
}

func (tx *redisTxStore) AppendOutbox(_ context.Context, entry OutboxEntry) error {
	tx.outbox = append(tx.outbox, normalizeOutboxEntry(entry))
	return nil
}

func (s *RedisStateStore) loadByKey(ctx context.Context, key string) (*StateRecord, error) {
	value, err := s.client.Get(ctx, key)
	if err != nil {
		return nil, err
	}
	if strings.TrimSpace(value) == "" {
		return nil, nil
	}
	var rec StateRecord
	if err := json.Unmarshal([]byte(value), &rec); err != nil {
		return nil, err
	}
	return &rec, nil
}

func (s *RedisStateStore) saveIfVersionUnlocked(ctx context.Context, rec *StateRecord, expectedVersion int) (int, error) {
	rec = cloneStateRecord(rec)
	if rec == nil {
		return 0, errors.New("state record required")
	}
	key := s.redisKey(rec.EntityID)
	if key == "" {
		return 0, errors.New("state record entity id required")
	}
	current, err := s.loadByKey(ctx, key)
	if err != nil {
		return 0, err
	}
	version, err := applyVersionedRecordUpdate(rec, current, expectedVersion)
	if err != nil {
		return 0, err
	}
	payload, err := json.Marshal(rec)
	if err != nil {
		return 0, err
	}
	if err := s.client.Set(ctx, key, string(payload), s.ttl); err != nil {
		return 0, err
	}
	return version, nil
}

func (s *RedisStateStore) redisKey(id string) string {
	id = strings.TrimSpace(id)
	if id == "" {
		return ""
	}
	prefix := s.keyPrefix
	if prefix == "" {
		prefix = "fsm_state:"
	}
	return prefix + id
}

func saveIfVersionUnlocked(state map[string]*StateRecord, rec *StateRecord, expectedVersion int) (int, error) {
	rec = cloneStateRecord(rec)
	if rec == nil {
		return 0, errors.New("state record required")
	}
	rec.EntityID = strings.TrimSpace(rec.EntityID)
	if rec.EntityID == "" {
		return 0, errors.New("state record entity id required")
	}
	rec.State = normalizeState(rec.State)
	if rec.State == "" {
		return 0, errors.New("state record state required")
	}
	if expectedVersion < 0 {
		expectedVersion = 0
	}
	current, ok := state[rec.EntityID]
	if !ok {
		if expectedVersion != 0 {
			return 0, ErrStateVersionConflict
		}
		rec.Version = 1
	} else {
		if current.Version != expectedVersion {
			return 0, ErrStateVersionConflict
		}
		rec.Version = expectedVersion + 1
	}
	if rec.UpdatedAt.IsZero() {
		rec.UpdatedAt = time.Now().UTC()
	}
	state[rec.EntityID] = rec
	return rec.Version, nil
}

func applyVersionedRecordUpdate(next *StateRecord, current *StateRecord, expectedVersion int) (int, error) {
	next.EntityID = strings.TrimSpace(next.EntityID)
	if next.EntityID == "" {
		return 0, errors.New("state record entity id required")
	}
	next.State = normalizeState(next.State)
	if next.State == "" {
		return 0, errors.New("state record state required")
	}
	if expectedVersion < 0 {
		expectedVersion = 0
	}
	if current == nil {
		if expectedVersion != 0 {
			return 0, ErrStateVersionConflict
		}
		next.Version = 1
	} else {
		if current.Version != expectedVersion {
			return 0, ErrStateVersionConflict
		}
		next.Version = expectedVersion + 1
	}
	if next.UpdatedAt.IsZero() {
		next.UpdatedAt = time.Now().UTC()
	}
	return next.Version, nil
}

func normalizeOutboxEntry(entry OutboxEntry) OutboxEntry {
	entry.ID = strings.TrimSpace(entry.ID)
	if entry.ID == "" {
		entry.ID = nextOutboxID()
	}
	entry.EntityID = strings.TrimSpace(entry.EntityID)
	entry.TransitionID = strings.TrimSpace(entry.TransitionID)
	entry.ExecutionID = strings.TrimSpace(entry.ExecutionID)
	entry.Event = normalizeEvent(entry.Event)
	entry.Topic = strings.TrimSpace(entry.Topic)
	entry.Payload = append([]byte(nil), entry.Payload...)
	entry.LeaseOwner = strings.TrimSpace(entry.LeaseOwner)
	entry.LastError = strings.TrimSpace(entry.LastError)
	if entry.Status == "" {
		entry.Status = "pending"
	}
	if entry.Topic == "" {
		entry.Topic = inferOutboxTopic(entry.Effect)
	}
	if entry.CreatedAt.IsZero() {
		entry.CreatedAt = time.Now().UTC()
	}
	if !entry.LeaseUntil.IsZero() {
		entry.LeaseUntil = entry.LeaseUntil.UTC()
	}
	if !entry.RetryAt.IsZero() {
		entry.RetryAt = entry.RetryAt.UTC()
	}
	if entry.ProcessedAt != nil {
		ts := entry.ProcessedAt.UTC()
		entry.ProcessedAt = &ts
	}
	entry.Metadata = copyMap(entry.Metadata)
	return entry
}

func cloneStateRecord(rec *StateRecord) *StateRecord {
	if rec == nil {
		return nil
	}
	cp := *rec
	cp.Metadata = copyMap(rec.Metadata)
	return &cp
}

func cloneStateMap(in map[string]*StateRecord) map[string]*StateRecord {
	if len(in) == 0 {
		return make(map[string]*StateRecord)
	}
	out := make(map[string]*StateRecord, len(in))
	for k, v := range in {
		out[k] = cloneStateRecord(v)
	}
	return out
}

func cloneOutboxEntries(in []OutboxEntry) []OutboxEntry {
	if len(in) == 0 {
		return nil
	}
	out := make([]OutboxEntry, 0, len(in))
	for _, e := range in {
		out = append(out, cloneOutboxEntry(e))
	}
	return out
}

func cloneOutboxEntry(entry OutboxEntry) OutboxEntry {
	cp := entry
	cp.Payload = append([]byte(nil), entry.Payload...)
	cp.Metadata = copyMap(entry.Metadata)
	if entry.ProcessedAt != nil {
		ts := *entry.ProcessedAt
		cp.ProcessedAt = &ts
	}
	return cp
}

func inferOutboxTopic(effect Effect) string {
	switch effect.(type) {
	case CommandEffect:
		return "fsm.effect.command"
	case EmitEvent:
		return "fsm.effect.event"
	default:
		return "fsm.effect"
	}
}

func isClaimableOutboxEntry(entry OutboxEntry, now time.Time) bool {
	status := strings.ToLower(strings.TrimSpace(entry.Status))
	if status == "completed" {
		return false
	}
	if status == "leased" && !entry.LeaseUntil.IsZero() && entry.LeaseUntil.After(now) {
		return false
	}
	if !entry.RetryAt.IsZero() && entry.RetryAt.After(now) {
		return false
	}
	switch status {
	case "", "pending", "failed", "leased":
		return true
	default:
		return false
	}
}

func marshalEffect(effect Effect) (string, []byte, error) {
	switch v := effect.(type) {
	case nil:
		return "none", []byte("null"), nil
	case CommandEffect:
		b, err := json.Marshal(v)
		return "command", b, err
	case EmitEvent:
		b, err := json.Marshal(v)
		return "event", b, err
	default:
		b, err := json.Marshal(v)
		return "unknown", b, err
	}
}

var outboxCounter atomic.Uint64

func nextOutboxID() string {
	n := outboxCounter.Add(1)
	return fmt.Sprintf("outbox-%d-%d", time.Now().UTC().UnixNano(), n)
}

type sqlExecContext interface {
	ExecContext(ctx context.Context, query string, args ...any) (sql.Result, error)
}

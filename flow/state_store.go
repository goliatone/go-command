package flow

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"strconv"
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
	LeaseToken   string
	RetryAt      time.Time
	CreatedAt    time.Time
	ProcessedAt  *time.Time
	LastError    string
	Metadata     map[string]any
}

// ClaimedOutboxEntry carries a claimed entry and proof-of-ownership lease token.
type ClaimedOutboxEntry struct {
	OutboxEntry
	LeaseToken string
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
	leaseTTL time.Duration,
) ([]ClaimedOutboxEntry, error) {
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
	if leaseTTL <= 0 {
		leaseTTL = 30 * time.Second
	}
	now := time.Now().UTC()
	leaseUntil := now.Add(leaseTTL)

	s.mu.Lock()
	defer s.mu.Unlock()

	claimed := make([]ClaimedOutboxEntry, 0, limit)
	for idx := range s.outbox {
		entry := s.outbox[idx]
		if !isClaimableOutboxEntry(entry, now) {
			continue
		}
		leaseToken := nextLeaseToken(entry.ID, workerID)
		entry.Status = "leased"
		entry.LeaseOwner = workerID
		entry.LeaseUntil = leaseUntil
		entry.LeaseToken = leaseToken
		entry.Attempts++
		s.outbox[idx] = entry
		claimed = append(claimed, ClaimedOutboxEntry{
			OutboxEntry: cloneOutboxEntry(entry),
			LeaseToken:  leaseToken,
		})
		if len(claimed) >= limit {
			break
		}
	}
	return claimed, nil
}

// MarkCompleted marks an outbox entry as fully dispatched.
func (s *InMemoryStateStore) MarkCompleted(_ context.Context, id, leaseToken string) error {
	if s == nil {
		return errors.New("in-memory store not configured")
	}
	id = strings.TrimSpace(id)
	if id == "" {
		return errors.New("outbox id required")
	}
	leaseToken = strings.TrimSpace(leaseToken)
	if leaseToken == "" {
		return errors.New("lease token required")
	}
	processedAt := time.Now().UTC()

	s.mu.Lock()
	defer s.mu.Unlock()
	for idx := range s.outbox {
		if s.outbox[idx].ID != id {
			continue
		}
		if s.outbox[idx].LeaseToken != leaseToken {
			return fmt.Errorf("outbox %s lease token mismatch", id)
		}
		s.outbox[idx].Status = "completed"
		s.outbox[idx].LeaseOwner = ""
		s.outbox[idx].LeaseUntil = time.Time{}
		s.outbox[idx].LeaseToken = ""
		s.outbox[idx].ProcessedAt = &processedAt
		s.outbox[idx].RetryAt = time.Time{}
		s.outbox[idx].LastError = ""
		return nil
	}
	return fmt.Errorf("outbox %s not found", id)
}

// MarkFailed marks an outbox entry as failed and schedules retry.
func (s *InMemoryStateStore) MarkFailed(_ context.Context, id, leaseToken string, retryAt time.Time, reason string) error {
	if s == nil {
		return errors.New("in-memory store not configured")
	}
	id = strings.TrimSpace(id)
	if id == "" {
		return errors.New("outbox id required")
	}
	leaseToken = strings.TrimSpace(leaseToken)
	if leaseToken == "" {
		return errors.New("lease token required")
	}
	retryAt = retryAt.UTC()

	s.mu.Lock()
	defer s.mu.Unlock()
	for idx := range s.outbox {
		if s.outbox[idx].ID != id {
			continue
		}
		if s.outbox[idx].LeaseToken != leaseToken {
			return fmt.Errorf("outbox %s lease token mismatch", id)
		}
		s.outbox[idx].Status = "pending"
		s.outbox[idx].LeaseOwner = ""
		s.outbox[idx].LeaseUntil = time.Time{}
		s.outbox[idx].LeaseToken = ""
		s.outbox[idx].RetryAt = retryAt
		s.outbox[idx].LastError = strings.TrimSpace(reason)
		s.outbox[idx].ProcessedAt = nil
		return nil
	}
	return fmt.Errorf("outbox %s not found", id)
}

// MarkDeadLetter marks an outbox entry as terminal and inspectable in dead-letter queries.
func (s *InMemoryStateStore) MarkDeadLetter(_ context.Context, id, leaseToken, reason string) error {
	if s == nil {
		return errors.New("in-memory store not configured")
	}
	id = strings.TrimSpace(id)
	if id == "" {
		return errors.New("outbox id required")
	}
	leaseToken = strings.TrimSpace(leaseToken)
	if leaseToken == "" {
		return errors.New("lease token required")
	}
	processedAt := time.Now().UTC()

	s.mu.Lock()
	defer s.mu.Unlock()
	for idx := range s.outbox {
		if s.outbox[idx].ID != id {
			continue
		}
		if s.outbox[idx].LeaseToken != leaseToken {
			return fmt.Errorf("outbox %s lease token mismatch", id)
		}
		s.outbox[idx].Status = "dead_lettered"
		s.outbox[idx].LeaseOwner = ""
		s.outbox[idx].LeaseUntil = time.Time{}
		s.outbox[idx].LeaseToken = ""
		s.outbox[idx].RetryAt = time.Time{}
		s.outbox[idx].ProcessedAt = &processedAt
		s.outbox[idx].LastError = strings.TrimSpace(reason)
		return nil
	}
	return fmt.Errorf("outbox %s not found", id)
}

// ListDeadLetters returns dead-lettered outbox entries, filtered by optional scope fields.
func (s *InMemoryStateStore) ListDeadLetters(_ context.Context, scope DeadLetterScope) ([]OutboxEntry, error) {
	if s == nil {
		return nil, errors.New("in-memory store not configured")
	}
	scope = normalizeDeadLetterScope(scope)
	s.mu.RLock()
	defer s.mu.RUnlock()
	out := make([]OutboxEntry, 0)
	for _, entry := range s.outbox {
		if strings.ToLower(strings.TrimSpace(entry.Status)) != "dead_lettered" {
			continue
		}
		if !deadLetterMatchesScope(entry, scope) {
			continue
		}
		out = append(out, cloneOutboxEntry(entry))
		if scope.Limit > 0 && len(out) >= scope.Limit {
			break
		}
	}
	return out, nil
}

// ExtendLease extends a claimed entry lease when token ownership matches.
func (s *InMemoryStateStore) ExtendLease(_ context.Context, id, leaseToken string, leaseTTL time.Duration) error {
	if s == nil {
		return errors.New("in-memory store not configured")
	}
	id = strings.TrimSpace(id)
	if id == "" {
		return errors.New("outbox id required")
	}
	leaseToken = strings.TrimSpace(leaseToken)
	if leaseToken == "" {
		return errors.New("lease token required")
	}
	if leaseTTL <= 0 {
		return errors.New("lease ttl required")
	}
	now := time.Now().UTC()

	s.mu.Lock()
	defer s.mu.Unlock()
	for idx := range s.outbox {
		if s.outbox[idx].ID != id {
			continue
		}
		if s.outbox[idx].LeaseToken != leaseToken {
			return fmt.Errorf("outbox %s lease token mismatch", id)
		}
		if strings.ToLower(strings.TrimSpace(s.outbox[idx].Status)) != "leased" {
			return fmt.Errorf("outbox %s not leased", id)
		}
		s.outbox[idx].LeaseUntil = now.Add(leaseTTL)
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

// ClaimPending claims pending outbox entries with a worker lease.
func (s *SQLiteStateStore) ClaimPending(
	ctx context.Context,
	workerID string,
	limit int,
	leaseTTL time.Duration,
) ([]ClaimedOutboxEntry, error) {
	if s == nil || s.db == nil {
		return nil, errors.New("sqlite store not configured")
	}
	workerID = strings.TrimSpace(workerID)
	if workerID == "" {
		return nil, errors.New("worker id required")
	}
	if limit <= 0 {
		limit = 100
	}
	if leaseTTL <= 0 {
		leaseTTL = 30 * time.Second
	}
	now := time.Now().UTC()
	leaseUntil := now.Add(leaseTTL)

	if err := s.ensureSchema(ctx, s.db); err != nil {
		return nil, err
	}

	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return nil, err
	}
	defer func() {
		if tx != nil {
			_ = tx.Rollback()
		}
	}()

	query := fmt.Sprintf(`SELECT id FROM %s
		WHERE lower(trim(coalesce(status, ''))) != 'completed'
		AND (retry_at IS NULL OR retry_at = '' OR retry_at <= ?)
		AND (
			lower(trim(coalesce(status, ''))) IN ('', 'pending', 'failed')
			OR (
				lower(trim(coalesce(status, ''))) = 'leased'
				AND (lease_until IS NULL OR lease_until = '' OR lease_until <= ?)
			)
		)
		ORDER BY created_at ASC, id ASC
		LIMIT ?`, s.outboxTable)
	rows, err := tx.QueryContext(ctx, query, now.Format(time.RFC3339Nano), now.Format(time.RFC3339Nano), limit)
	if err != nil {
		return nil, err
	}
	ids := make([]string, 0, limit)
	for rows.Next() {
		var id string
		if err := rows.Scan(&id); err != nil {
			_ = rows.Close()
			return nil, err
		}
		ids = append(ids, strings.TrimSpace(id))
	}
	if err := rows.Err(); err != nil {
		_ = rows.Close()
		return nil, err
	}
	_ = rows.Close()

	claimed := make([]ClaimedOutboxEntry, 0, len(ids))
	update := fmt.Sprintf(`UPDATE %s
		SET status='leased', lease_owner=?, lease_until=?, lease_token=?, attempts=coalesce(attempts, 0)+1
		WHERE id=?
		AND lower(trim(coalesce(status, ''))) != 'completed'
		AND (retry_at IS NULL OR retry_at = '' OR retry_at <= ?)
		AND (
			lower(trim(coalesce(status, ''))) IN ('', 'pending', 'failed')
			OR (
				lower(trim(coalesce(status, ''))) = 'leased'
				AND (lease_until IS NULL OR lease_until = '' OR lease_until <= ?)
			)
		)`, s.outboxTable)
	for _, id := range ids {
		if id == "" {
			continue
		}
		leaseToken := nextLeaseToken(id, workerID)
		result, err := tx.ExecContext(
			ctx,
			update,
			workerID,
			leaseUntil.Format(time.RFC3339Nano),
			leaseToken,
			id,
			now.Format(time.RFC3339Nano),
			now.Format(time.RFC3339Nano),
		)
		if err != nil {
			return nil, err
		}
		affected, _ := result.RowsAffected()
		if affected == 0 {
			continue
		}
		entry, err := loadSQLiteOutboxEntry(ctx, tx, s.outboxTable, id)
		if err != nil {
			return nil, err
		}
		if entry.ID != "" {
			claimed = append(claimed, ClaimedOutboxEntry{
				OutboxEntry: entry,
				LeaseToken:  leaseToken,
			})
		}
	}
	if err := tx.Commit(); err != nil {
		return nil, err
	}
	tx = nil
	return claimed, nil
}

// MarkCompleted marks one outbox entry as completed.
func (s *SQLiteStateStore) MarkCompleted(ctx context.Context, id, leaseToken string) error {
	if s == nil || s.db == nil {
		return errors.New("sqlite store not configured")
	}
	id = strings.TrimSpace(id)
	if id == "" {
		return errors.New("outbox id required")
	}
	leaseToken = strings.TrimSpace(leaseToken)
	if leaseToken == "" {
		return errors.New("lease token required")
	}
	if err := s.ensureSchema(ctx, s.db); err != nil {
		return err
	}
	q := fmt.Sprintf(`UPDATE %s
		SET status='completed', lease_owner='', lease_until='', lease_token='', processed_at=?, retry_at='', last_error=''
		WHERE id=? AND lease_token=? AND lower(trim(coalesce(status, '')))='leased'`, s.outboxTable)
	result, err := s.db.ExecContext(ctx, q, time.Now().UTC().Format(time.RFC3339Nano), id, leaseToken)
	if err != nil {
		return err
	}
	affected, _ := result.RowsAffected()
	if affected == 0 {
		return fmt.Errorf("outbox %s not found", id)
	}
	return nil
}

// MarkFailed marks one outbox entry as pending retry.
func (s *SQLiteStateStore) MarkFailed(ctx context.Context, id, leaseToken string, retryAt time.Time, reason string) error {
	if s == nil || s.db == nil {
		return errors.New("sqlite store not configured")
	}
	id = strings.TrimSpace(id)
	if id == "" {
		return errors.New("outbox id required")
	}
	leaseToken = strings.TrimSpace(leaseToken)
	if leaseToken == "" {
		return errors.New("lease token required")
	}
	retryAt = retryAt.UTC()
	if err := s.ensureSchema(ctx, s.db); err != nil {
		return err
	}
	q := fmt.Sprintf(`UPDATE %s
		SET status='pending', lease_owner='', lease_until='', lease_token='', retry_at=?, processed_at=NULL, last_error=?
		WHERE id=? AND lease_token=? AND lower(trim(coalesce(status, '')))='leased'`, s.outboxTable)
	result, err := s.db.ExecContext(ctx, q, retryAt.Format(time.RFC3339Nano), strings.TrimSpace(reason), id, leaseToken)
	if err != nil {
		return err
	}
	affected, _ := result.RowsAffected()
	if affected == 0 {
		return fmt.Errorf("outbox %s not found", id)
	}
	return nil
}

// MarkDeadLetter marks one outbox entry as terminal after verifying lease ownership.
func (s *SQLiteStateStore) MarkDeadLetter(ctx context.Context, id, leaseToken, reason string) error {
	if s == nil || s.db == nil {
		return errors.New("sqlite store not configured")
	}
	id = strings.TrimSpace(id)
	if id == "" {
		return errors.New("outbox id required")
	}
	leaseToken = strings.TrimSpace(leaseToken)
	if leaseToken == "" {
		return errors.New("lease token required")
	}
	if err := s.ensureSchema(ctx, s.db); err != nil {
		return err
	}
	q := fmt.Sprintf(`UPDATE %s
		SET status='dead_lettered', lease_owner='', lease_until='', lease_token='', retry_at='', processed_at=?, last_error=?
		WHERE id=? AND lease_token=? AND lower(trim(coalesce(status, '')))='leased'`, s.outboxTable)
	result, err := s.db.ExecContext(
		ctx,
		q,
		time.Now().UTC().Format(time.RFC3339Nano),
		strings.TrimSpace(reason),
		id,
		leaseToken,
	)
	if err != nil {
		return err
	}
	affected, _ := result.RowsAffected()
	if affected == 0 {
		return fmt.Errorf("outbox %s not found", id)
	}
	return nil
}

// ListDeadLetters returns dead-lettered outbox entries for inspection.
func (s *SQLiteStateStore) ListDeadLetters(ctx context.Context, scope DeadLetterScope) ([]OutboxEntry, error) {
	if s == nil || s.db == nil {
		return nil, errors.New("sqlite store not configured")
	}
	scope = normalizeDeadLetterScope(scope)
	if err := s.ensureSchema(ctx, s.db); err != nil {
		return nil, err
	}
	limit := scope.Limit
	if limit <= 0 {
		limit = 100
	}
	query := fmt.Sprintf(`SELECT
		id, entity_id, transition_id, execution_id, event, topic,
		effect_type, payload, status, attempts, lease_owner, lease_until, lease_token,
		retry_at, processed_at, last_error, metadata, created_at
		FROM %s
		WHERE lower(trim(coalesce(status, '')))='dead_lettered'
		ORDER BY processed_at DESC, created_at DESC, id DESC
		LIMIT ?`, s.outboxTable)
	rows, err := s.db.QueryContext(ctx, query, limit*4)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	out := make([]OutboxEntry, 0, limit)
	for rows.Next() {
		entry, decodeErr := decodeOutboxEntry(rows)
		if decodeErr != nil {
			return nil, decodeErr
		}
		if !deadLetterMatchesScope(entry, scope) {
			continue
		}
		out = append(out, entry)
		if len(out) >= limit {
			break
		}
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return out, nil
}

// ExtendLease extends lease ownership for one claimed outbox entry.
func (s *SQLiteStateStore) ExtendLease(ctx context.Context, id, leaseToken string, leaseTTL time.Duration) error {
	if s == nil || s.db == nil {
		return errors.New("sqlite store not configured")
	}
	id = strings.TrimSpace(id)
	if id == "" {
		return errors.New("outbox id required")
	}
	leaseToken = strings.TrimSpace(leaseToken)
	if leaseToken == "" {
		return errors.New("lease token required")
	}
	if leaseTTL <= 0 {
		return errors.New("lease ttl required")
	}
	if err := s.ensureSchema(ctx, s.db); err != nil {
		return err
	}
	leaseUntil := time.Now().UTC().Add(leaseTTL).Format(time.RFC3339Nano)
	q := fmt.Sprintf(`UPDATE %s
		SET lease_until=?
		WHERE id=? AND lease_token=? AND lower(trim(coalesce(status, '')))='leased'`, s.outboxTable)
	result, err := s.db.ExecContext(ctx, q, leaseUntil, id, leaseToken)
	if err != nil {
		return err
	}
	affected, _ := result.RowsAffected()
	if affected == 0 {
		return fmt.Errorf("outbox %s not found", id)
	}
	return nil
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
	var processedAt any
	if entry.ProcessedAt != nil {
		processedAt = entry.ProcessedAt.UTC().Format(time.RFC3339Nano)
	}
	q := fmt.Sprintf(`INSERT INTO %s (
		id, entity_id, transition_id, execution_id, event, topic, effect_type, payload,
		status, attempts, lease_owner, lease_until, lease_token, retry_at, processed_at, last_error, metadata, created_at
	) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, s.parent.outboxTable)
	_, err = s.tx.ExecContext(ctx, q,
		entry.ID,
		entry.EntityID,
		entry.TransitionID,
		entry.ExecutionID,
		entry.Event,
		entry.Topic,
		effectType,
		string(payloadJSON),
		entry.Status,
		entry.Attempts,
		entry.LeaseOwner,
		formatTimestamp(entry.LeaseUntil),
		entry.LeaseToken,
		formatTimestamp(entry.RetryAt),
		processedAt,
		entry.LastError,
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
		execution_id TEXT,
		event TEXT,
		topic TEXT,
		effect_type TEXT NOT NULL,
		payload TEXT NOT NULL,
		status TEXT NOT NULL,
		attempts INTEGER NOT NULL DEFAULT 0,
		lease_owner TEXT,
		lease_until TEXT,
		lease_token TEXT,
		retry_at TEXT,
		processed_at TEXT,
		last_error TEXT,
		metadata TEXT,
		created_at TEXT NOT NULL
	)`, s.outboxTable)
	if _, err := exec.ExecContext(ctx, outboxDDL); err != nil {
		return err
	}
	return s.ensureOutboxColumns(ctx, exec)
}

func (s *SQLiteStateStore) ensureOutboxColumns(ctx context.Context, exec sqlExecContext) error {
	columns := []string{
		"execution_id TEXT",
		"topic TEXT",
		"attempts INTEGER NOT NULL DEFAULT 0",
		"lease_owner TEXT",
		"lease_until TEXT",
		"lease_token TEXT",
		"retry_at TEXT",
		"processed_at TEXT",
		"last_error TEXT",
	}
	for _, column := range columns {
		alter := fmt.Sprintf(`ALTER TABLE %s ADD COLUMN %s`, s.outboxTable, column)
		if _, err := exec.ExecContext(ctx, alter); err != nil && !isSQLiteDuplicateColumnError(err) {
			return err
		}
	}
	return nil
}

// RedisStateStore persists state and outbox records via Redis Lua scripts.
type RedisStateStore struct {
	client    RedisClient
	ttl       time.Duration
	keyPrefix string

	scriptMu   sync.Mutex
	scriptSHAs map[string]string
}

// RedisClient captures script primitives required for distributed-safe state/outbox operations.
type RedisClient interface {
	EvalSHA(ctx context.Context, sha string, keys []string, args ...any) (any, error)
	Eval(ctx context.Context, script string, keys []string, args ...any) (any, error)
	ScriptLoad(ctx context.Context, script string) (string, error)
}

// NewRedisStateStore builds a store using the provided script-capable redis client.
func NewRedisStateStore(client RedisClient, ttl time.Duration) *RedisStateStore {
	return &RedisStateStore{
		client:     client,
		ttl:        ttl,
		keyPrefix:  "fsm:{fsm}",
		scriptSHAs: make(map[string]string),
	}
}

// Load reads one state record from redis.
func (s *RedisStateStore) Load(ctx context.Context, id string) (*StateRecord, error) {
	if s == nil || s.client == nil {
		return nil, errors.New("redis store not configured")
	}
	key := s.redisStateKey(id)
	if key == "" {
		return nil, nil
	}
	return s.loadByKey(ctx, key)
}

// SaveIfVersion performs optimistic compare-and-set using one Lua script.
func (s *RedisStateStore) SaveIfVersion(ctx context.Context, rec *StateRecord, expectedVersion int) (int, error) {
	if s == nil || s.client == nil {
		return 0, errors.New("redis store not configured")
	}
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
	payload, err := json.Marshal(rec)
	if err != nil {
		return 0, err
	}
	out, err := s.evalScript(
		ctx,
		"save_if_version",
		redisScriptSaveIfVersion,
		[]string{s.redisStateKey(rec.EntityID)},
		expectedVersion,
		string(payload),
		int64(s.ttl/time.Millisecond),
	)
	if err != nil {
		if isRedisVersionConflictError(err) {
			return 0, ErrStateVersionConflict
		}
		return 0, err
	}
	version, err := redisResultInt(out)
	if err != nil {
		return 0, err
	}
	return int(version), nil
}

// RunInTransaction stages one state write + N outbox writes and commits atomically.
func (s *RedisStateStore) RunInTransaction(ctx context.Context, fn func(TxStore) error) error {
	if s == nil || s.client == nil {
		return errors.New("redis store not configured")
	}
	if fn == nil {
		return nil
	}
	tx := &redisTxStore{parent: s}
	if err := fn(tx); err != nil {
		return err
	}
	return s.commitTx(ctx, tx)
}

// ClaimPending claims pending entries with leased ownership tokens.
func (s *RedisStateStore) ClaimPending(
	ctx context.Context,
	workerID string,
	limit int,
	leaseTTL time.Duration,
) ([]ClaimedOutboxEntry, error) {
	if s == nil || s.client == nil {
		return nil, errors.New("redis store not configured")
	}
	workerID = strings.TrimSpace(workerID)
	if workerID == "" {
		return nil, errors.New("worker id required")
	}
	if limit <= 0 {
		limit = 100
	}
	if leaseTTL <= 0 {
		leaseTTL = 30 * time.Second
	}
	out, err := s.evalScript(
		ctx,
		"claim_pending",
		redisScriptClaimPending,
		[]string{s.redisOutboxPendingKey(), s.redisOutboxCounterKey(), s.redisOutboxKeyPrefix()},
		int64(leaseTTL/time.Millisecond),
		workerID,
		limit,
	)
	if err != nil {
		return nil, err
	}
	rows, err := redisResultList(out)
	if err != nil {
		return nil, err
	}
	claimed := make([]ClaimedOutboxEntry, 0, len(rows))
	for _, row := range rows {
		encoded := redisResultString(row)
		entry, parseErr := parseClaimedOutboxJSON(encoded)
		if parseErr != nil {
			return nil, parseErr
		}
		claimed = append(claimed, entry)
	}
	return claimed, nil
}

// MarkCompleted marks one claimed entry as completed after verifying lease token ownership.
func (s *RedisStateStore) MarkCompleted(ctx context.Context, id, leaseToken string) error {
	id = strings.TrimSpace(id)
	if id == "" {
		return errors.New("outbox id required")
	}
	leaseToken = strings.TrimSpace(leaseToken)
	if leaseToken == "" {
		return errors.New("lease token required")
	}
	out, err := s.evalScript(
		ctx,
		"mark_completed",
		redisScriptMarkCompleted,
		[]string{s.redisOutboxPendingKey(), s.redisOutboxKeyPrefix()},
		id,
		leaseToken,
	)
	if err != nil {
		return err
	}
	status, err := redisResultInt(out)
	if err != nil {
		return err
	}
	switch status {
	case 1:
		return nil
	case -2:
		return fmt.Errorf("outbox %s lease token mismatch", id)
	case -3:
		return fmt.Errorf("outbox %s not leased", id)
	default:
		return fmt.Errorf("outbox %s not found", id)
	}
}

// MarkFailed marks one claimed entry for retry after verifying lease token ownership.
func (s *RedisStateStore) MarkFailed(ctx context.Context, id, leaseToken string, retryAt time.Time, reason string) error {
	id = strings.TrimSpace(id)
	if id == "" {
		return errors.New("outbox id required")
	}
	leaseToken = strings.TrimSpace(leaseToken)
	if leaseToken == "" {
		return errors.New("lease token required")
	}
	retryAt = retryAt.UTC()
	out, err := s.evalScript(
		ctx,
		"mark_failed",
		redisScriptMarkFailed,
		[]string{s.redisOutboxPendingKey(), s.redisOutboxKeyPrefix()},
		id,
		leaseToken,
		retryAt.UnixMilli(),
		strings.TrimSpace(reason),
	)
	if err != nil {
		return err
	}
	status, err := redisResultInt(out)
	if err != nil {
		return err
	}
	switch status {
	case 1:
		return nil
	case -2:
		return fmt.Errorf("outbox %s lease token mismatch", id)
	case -3:
		return fmt.Errorf("outbox %s not leased", id)
	default:
		return fmt.Errorf("outbox %s not found", id)
	}
}

// MarkDeadLetter marks one claimed entry as dead-lettered after verifying lease ownership.
func (s *RedisStateStore) MarkDeadLetter(ctx context.Context, id, leaseToken, reason string) error {
	id = strings.TrimSpace(id)
	if id == "" {
		return errors.New("outbox id required")
	}
	leaseToken = strings.TrimSpace(leaseToken)
	if leaseToken == "" {
		return errors.New("lease token required")
	}
	out, err := s.evalScript(
		ctx,
		"mark_dead_letter",
		redisScriptMarkDeadLetter,
		[]string{s.redisOutboxPendingKey(), s.redisOutboxDeadLetterKey(), s.redisOutboxKeyPrefix()},
		id,
		leaseToken,
		strings.TrimSpace(reason),
	)
	if err != nil {
		return err
	}
	status, err := redisResultInt(out)
	if err != nil {
		return err
	}
	switch status {
	case 1:
		return nil
	case -2:
		return fmt.Errorf("outbox %s lease token mismatch", id)
	case -3:
		return fmt.Errorf("outbox %s not leased", id)
	default:
		return fmt.Errorf("outbox %s not found", id)
	}
}

// ListDeadLetters returns dead-lettered entries from redis-backed outbox storage.
func (s *RedisStateStore) ListDeadLetters(ctx context.Context, scope DeadLetterScope) ([]OutboxEntry, error) {
	if s == nil || s.client == nil {
		return nil, errors.New("redis store not configured")
	}
	scope = normalizeDeadLetterScope(scope)
	limit := scope.Limit
	if limit <= 0 {
		limit = 100
	}
	out, err := s.evalScript(
		ctx,
		"list_dead_letters",
		redisScriptListDeadLetters,
		[]string{s.redisOutboxDeadLetterKey(), s.redisOutboxKeyPrefix()},
		limit*4,
	)
	if err != nil {
		return nil, err
	}
	rows, err := redisResultList(out)
	if err != nil {
		return nil, err
	}
	results := make([]OutboxEntry, 0, limit)
	for _, row := range rows {
		entry, parseErr := parseOutboxRowJSON(redisResultString(row))
		if parseErr != nil {
			return nil, parseErr
		}
		if strings.ToLower(strings.TrimSpace(entry.Status)) != "dead_lettered" {
			continue
		}
		if !deadLetterMatchesScope(entry, scope) {
			continue
		}
		results = append(results, entry)
		if len(results) >= limit {
			break
		}
	}
	return results, nil
}

// ExtendLease extends one claimed entry lease.
func (s *RedisStateStore) ExtendLease(ctx context.Context, id, leaseToken string, leaseTTL time.Duration) error {
	id = strings.TrimSpace(id)
	if id == "" {
		return errors.New("outbox id required")
	}
	leaseToken = strings.TrimSpace(leaseToken)
	if leaseToken == "" {
		return errors.New("lease token required")
	}
	if leaseTTL <= 0 {
		return errors.New("lease ttl required")
	}
	out, err := s.evalScript(
		ctx,
		"extend_lease",
		redisScriptExtendLease,
		[]string{s.redisOutboxKeyPrefix()},
		id,
		leaseToken,
		int64(leaseTTL/time.Millisecond),
	)
	if err != nil {
		return err
	}
	status, err := redisResultInt(out)
	if err != nil {
		return err
	}
	switch status {
	case 1:
		return nil
	case -2:
		return fmt.Errorf("outbox %s lease token mismatch", id)
	case -3:
		return fmt.Errorf("outbox %s not leased", id)
	default:
		return fmt.Errorf("outbox %s not found", id)
	}
}

type redisTxStore struct {
	parent *RedisStateStore
	write  *redisPendingStateWrite
	outbox []OutboxEntry
}

type redisPendingStateWrite struct {
	key             string
	record          *StateRecord
	expectedVersion int
}

func (tx *redisTxStore) Load(ctx context.Context, id string) (*StateRecord, error) {
	key := tx.parent.redisStateKey(id)
	if key == "" {
		return nil, nil
	}
	if tx.write != nil && tx.write.key == key {
		return cloneStateRecord(tx.write.record), nil
	}
	return tx.parent.loadByKey(ctx, key)
}

func (tx *redisTxStore) SaveIfVersion(ctx context.Context, rec *StateRecord, expectedVersion int) (int, error) {
	rec = cloneStateRecord(rec)
	if rec == nil {
		return 0, errors.New("state record required")
	}
	key := tx.parent.redisStateKey(rec.EntityID)
	if key == "" {
		return 0, errors.New("state record entity id required")
	}
	if tx.write != nil && tx.write.key != key {
		return 0, errors.New("redis tx supports one state record per transaction")
	}
	var current *StateRecord
	if tx.write != nil {
		current = cloneStateRecord(tx.write.record)
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
	tx.write = &redisPendingStateWrite{
		key:             key,
		record:          rec,
		expectedVersion: expectedVersion,
	}
	return version, nil
}

func (tx *redisTxStore) AppendOutbox(_ context.Context, entry OutboxEntry) error {
	tx.outbox = append(tx.outbox, normalizeOutboxEntry(entry))
	return nil
}

func (s *RedisStateStore) loadByKey(ctx context.Context, key string) (*StateRecord, error) {
	out, err := s.evalScript(ctx, "load_state", redisScriptLoadState, []string{key})
	if err != nil {
		return nil, err
	}
	value := strings.TrimSpace(redisResultString(out))
	if value == "" {
		return nil, nil
	}
	var rec StateRecord
	if err := json.Unmarshal([]byte(value), &rec); err != nil {
		return nil, err
	}
	return &rec, nil
}

func (s *RedisStateStore) commitTx(ctx context.Context, tx *redisTxStore) error {
	if tx == nil {
		return nil
	}
	now := time.Now().UTC()
	outboxPayload, err := buildRedisOutboxPayload(now, tx.outbox)
	if err != nil {
		return err
	}
	outboxJSON, err := json.Marshal(outboxPayload)
	if err != nil {
		return err
	}

	hasState := 0
	expectedVersion := 0
	stateKey := s.redisStateKey("__noop__")
	stateJSON := "{}"
	if tx.write != nil && tx.write.record != nil {
		hasState = 1
		expectedVersion = tx.write.expectedVersion
		stateKey = tx.write.key
		payload, err := json.Marshal(tx.write.record)
		if err != nil {
			return err
		}
		stateJSON = string(payload)
	}

	_, err = s.evalScript(
		ctx,
		"commit_tx",
		redisScriptCommitTx,
		[]string{s.redisOutboxPendingKey(), s.redisOutboxCounterKey(), s.redisOutboxKeyPrefix(), stateKey},
		hasState,
		expectedVersion,
		stateJSON,
		int64(s.ttl/time.Millisecond),
		now.UnixMilli(),
		string(outboxJSON),
	)
	if err != nil {
		if isRedisVersionConflictError(err) {
			return ErrStateVersionConflict
		}
		return err
	}
	return nil
}

func (s *RedisStateStore) redisPrefix() string {
	prefix := strings.TrimSpace(s.keyPrefix)
	if prefix == "" {
		prefix = "fsm:{fsm}"
	}
	return prefix
}

func (s *RedisStateStore) redisStateKey(id string) string {
	id = strings.TrimSpace(id)
	if id == "" {
		return ""
	}
	return fmt.Sprintf("%s:state:%s", s.redisPrefix(), id)
}

func (s *RedisStateStore) redisOutboxKeyPrefix() string {
	return fmt.Sprintf("%s:outbox:entry:", s.redisPrefix())
}

func (s *RedisStateStore) redisOutboxPendingKey() string {
	return fmt.Sprintf("%s:outbox:pending", s.redisPrefix())
}

func (s *RedisStateStore) redisOutboxDeadLetterKey() string {
	return fmt.Sprintf("%s:outbox:dead_letters", s.redisPrefix())
}

func (s *RedisStateStore) redisOutboxCounterKey() string {
	return fmt.Sprintf("%s:outbox:counter", s.redisPrefix())
}

func (s *RedisStateStore) evalScript(
	ctx context.Context,
	name string,
	script string,
	keys []string,
	args ...any,
) (any, error) {
	if s == nil || s.client == nil {
		return nil, errors.New("redis store not configured")
	}
	sha := s.scriptSHA(name)
	if sha == "" {
		loaded, err := s.client.ScriptLoad(ctx, script)
		if err == nil && strings.TrimSpace(loaded) != "" {
			sha = strings.TrimSpace(loaded)
			s.setScriptSHA(name, sha)
		}
	}
	if sha != "" {
		out, err := s.client.EvalSHA(ctx, sha, keys, args...)
		if err == nil {
			return out, nil
		}
		if !isRedisNoScriptError(err) {
			return nil, err
		}
	}
	out, err := s.client.Eval(ctx, script, keys, args...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (s *RedisStateStore) scriptSHA(name string) string {
	if s == nil {
		return ""
	}
	s.scriptMu.Lock()
	defer s.scriptMu.Unlock()
	return s.scriptSHAs[name]
}

func (s *RedisStateStore) setScriptSHA(name, sha string) {
	if s == nil {
		return
	}
	sha = strings.TrimSpace(sha)
	if sha == "" {
		return
	}
	s.scriptMu.Lock()
	defer s.scriptMu.Unlock()
	if s.scriptSHAs == nil {
		s.scriptSHAs = make(map[string]string)
	}
	s.scriptSHAs[name] = sha
}

func isRedisNoScriptError(err error) bool {
	if err == nil {
		return false
	}
	return strings.Contains(strings.ToUpper(err.Error()), "NOSCRIPT")
}

func isRedisVersionConflictError(err error) bool {
	if err == nil {
		return false
	}
	return strings.Contains(strings.ToUpper(err.Error()), "FSM_VERSION_CONFLICT")
}

func redisResultString(value any) string {
	switch v := value.(type) {
	case nil:
		return ""
	case string:
		return v
	case []byte:
		return string(v)
	case int64:
		return fmt.Sprintf("%d", v)
	case int:
		return fmt.Sprintf("%d", v)
	case float64:
		return fmt.Sprintf("%.0f", v)
	default:
		return fmt.Sprintf("%v", v)
	}
}

func redisResultInt(value any) (int64, error) {
	switch v := value.(type) {
	case int64:
		return v, nil
	case int:
		return int64(v), nil
	case float64:
		return int64(v), nil
	case string:
		i, err := strconv.ParseInt(strings.TrimSpace(v), 10, 64)
		if err != nil {
			return 0, err
		}
		return i, nil
	case []byte:
		i, err := strconv.ParseInt(strings.TrimSpace(string(v)), 10, 64)
		if err != nil {
			return 0, err
		}
		return i, nil
	default:
		return 0, fmt.Errorf("unsupported redis integer result %T", value)
	}
}

func redisResultList(value any) ([]any, error) {
	switch v := value.(type) {
	case nil:
		return nil, nil
	case []any:
		return v, nil
	default:
		return nil, fmt.Errorf("unsupported redis list result %T", value)
	}
}

type redisOutboxPayload struct {
	ID           string `json:"id"`
	EntityID     string `json:"entity_id"`
	TransitionID string `json:"transition_id"`
	ExecutionID  string `json:"execution_id"`
	Event        string `json:"event"`
	Topic        string `json:"topic"`
	EffectType   string `json:"effect_type"`
	Payload      string `json:"payload"`
	MetadataJSON string `json:"metadata_json"`
	CreatedAtMS  int64  `json:"created_at_ms"`
	RetryAtMS    int64  `json:"retry_at_ms"`
}

func buildRedisOutboxPayload(now time.Time, entries []OutboxEntry) ([]redisOutboxPayload, error) {
	if len(entries) == 0 {
		return nil, nil
	}
	out := make([]redisOutboxPayload, 0, len(entries))
	for _, entry := range entries {
		entry = normalizeOutboxEntry(entry)
		effectType, payload, err := marshalEffect(entry.Effect)
		if err != nil {
			return nil, err
		}
		if len(entry.Payload) > 0 {
			payload = append([]byte(nil), entry.Payload...)
		}
		if strings.TrimSpace(entry.Topic) == "" {
			entry.Topic = inferOutboxTopic(entry.Effect)
		}
		metadataJSON, err := json.Marshal(entry.Metadata)
		if err != nil {
			return nil, err
		}
		createdAt := entry.CreatedAt
		if createdAt.IsZero() {
			createdAt = now
		}
		retryAtMS := int64(0)
		if !entry.RetryAt.IsZero() {
			retryAtMS = entry.RetryAt.UTC().UnixMilli()
		}
		out = append(out, redisOutboxPayload{
			ID:           entry.ID,
			EntityID:     entry.EntityID,
			TransitionID: entry.TransitionID,
			ExecutionID:  entry.ExecutionID,
			Event:        entry.Event,
			Topic:        entry.Topic,
			EffectType:   effectType,
			Payload:      string(payload),
			MetadataJSON: string(metadataJSON),
			CreatedAtMS:  createdAt.UTC().UnixMilli(),
			RetryAtMS:    retryAtMS,
		})
	}
	return out, nil
}

func parseClaimedOutboxJSON(encoded string) (ClaimedOutboxEntry, error) {
	encoded = strings.TrimSpace(encoded)
	if encoded == "" {
		return ClaimedOutboxEntry{}, fmt.Errorf("claimed outbox payload is empty")
	}
	var raw map[string]any
	if err := json.Unmarshal([]byte(encoded), &raw); err != nil {
		return ClaimedOutboxEntry{}, err
	}
	readString := func(key string) string {
		if val, ok := raw[key]; ok {
			return strings.TrimSpace(fmt.Sprintf("%v", val))
		}
		return ""
	}
	readInt := func(key string) int64 {
		value := strings.TrimSpace(readString(key))
		if value == "" {
			return 0
		}
		i, _ := strconv.ParseInt(value, 10, 64)
		return i
	}

	entry := parseRedisOutboxEntry(raw, readString, readInt)

	return ClaimedOutboxEntry{
		OutboxEntry: entry,
		LeaseToken:  entry.LeaseToken,
	}, nil
}

func parseOutboxRowJSON(encoded string) (OutboxEntry, error) {
	encoded = strings.TrimSpace(encoded)
	if encoded == "" {
		return OutboxEntry{}, fmt.Errorf("outbox payload is empty")
	}
	var raw map[string]any
	if err := json.Unmarshal([]byte(encoded), &raw); err != nil {
		return OutboxEntry{}, err
	}
	readString := func(key string) string {
		if val, ok := raw[key]; ok {
			return strings.TrimSpace(fmt.Sprintf("%v", val))
		}
		return ""
	}
	readInt := func(key string) int64 {
		value := strings.TrimSpace(readString(key))
		if value == "" {
			return 0
		}
		i, _ := strconv.ParseInt(value, 10, 64)
		return i
	}
	return parseRedisOutboxEntry(raw, readString, readInt), nil
}

func parseRedisOutboxEntry(
	raw map[string]any,
	readString func(string) string,
	readInt func(string) int64,
) OutboxEntry {
	_ = raw
	entry := OutboxEntry{
		ID:           readString("id"),
		EntityID:     readString("entity_id"),
		TransitionID: readString("transition_id"),
		ExecutionID:  readString("execution_id"),
		Event:        normalizeEvent(readString("event")),
		Topic:        readString("topic"),
		Status:       strings.ToLower(readString("status")),
		Attempts:     int(readInt("attempts")),
		LeaseOwner:   readString("lease_owner"),
		LeaseToken:   readString("lease_token"),
		LastError:    readString("last_error"),
	}

	payload := []byte(readString("payload"))
	entry.Payload = append([]byte(nil), payload...)
	if effect, err := unmarshalEffect(readString("effect_type"), payload); err == nil {
		entry.Effect = effect
	}
	if metadata := readString("metadata_json"); metadata != "" {
		_ = json.Unmarshal([]byte(metadata), &entry.Metadata)
	}
	if ms := readInt("created_at_ms"); ms > 0 {
		entry.CreatedAt = time.UnixMilli(ms).UTC()
	}
	if ms := readInt("retry_at_ms"); ms > 0 {
		entry.RetryAt = time.UnixMilli(ms).UTC()
	}
	if ms := readInt("lease_until_ms"); ms > 0 {
		entry.LeaseUntil = time.UnixMilli(ms).UTC()
	}
	if ms := readInt("processed_at_ms"); ms > 0 {
		ts := time.UnixMilli(ms).UTC()
		entry.ProcessedAt = &ts
	}
	return entry
}

func normalizeDeadLetterScope(scope DeadLetterScope) DeadLetterScope {
	scope.MachineID = strings.TrimSpace(scope.MachineID)
	scope.EntityID = strings.TrimSpace(scope.EntityID)
	scope.ExecutionID = strings.TrimSpace(scope.ExecutionID)
	if scope.Limit < 0 {
		scope.Limit = 0
	}
	return scope
}

func deadLetterMatchesScope(entry OutboxEntry, scope DeadLetterScope) bool {
	scope = normalizeDeadLetterScope(scope)
	if scope.ExecutionID != "" && strings.TrimSpace(entry.ExecutionID) != scope.ExecutionID {
		return false
	}
	if scope.EntityID != "" && strings.TrimSpace(entry.EntityID) != scope.EntityID {
		return false
	}
	if scope.MachineID != "" {
		machineID := strings.TrimSpace(readStringFromMetadata(entry.Metadata, "machine_id"))
		if machineID != scope.MachineID {
			return false
		}
	}
	return true
}

const redisScriptLoadState = `
return redis.call('GET', KEYS[1])
`

const redisScriptSaveIfVersion = `
local current = redis.call('GET', KEYS[1])
local currentVersion = 0
if current and current ~= '' then
  local obj = cjson.decode(current)
  currentVersion = tonumber(obj['Version'] or obj['version'] or 0)
end
local expected = tonumber(ARGV[1])
if currentVersion ~= expected then
  return {err='FSM_VERSION_CONFLICT'}
end
local nextObj = cjson.decode(ARGV[2])
local nextVersion = currentVersion + 1
nextObj['Version'] = nextVersion
local encoded = cjson.encode(nextObj)
local ttlMs = tonumber(ARGV[3] or '0')
if ttlMs > 0 then
  redis.call('PSETEX', KEYS[1], ttlMs, encoded)
else
  redis.call('SET', KEYS[1], encoded)
end
return tostring(nextVersion)
`

const redisScriptCommitTx = `
local hasState = tonumber(ARGV[1] or '0')
local expected = tonumber(ARGV[2] or '0')
if hasState == 1 then
  local current = redis.call('GET', KEYS[4])
  local currentVersion = 0
  if current and current ~= '' then
    local obj = cjson.decode(current)
    currentVersion = tonumber(obj['Version'] or obj['version'] or 0)
  end
  if currentVersion ~= expected then
    return {err='FSM_VERSION_CONFLICT'}
  end
  local stateObj = cjson.decode(ARGV[3])
  stateObj['Version'] = currentVersion + 1
  local encoded = cjson.encode(stateObj)
  local ttlMs = tonumber(ARGV[4] or '0')
  if ttlMs > 0 then
    redis.call('PSETEX', KEYS[4], ttlMs, encoded)
  else
    redis.call('SET', KEYS[4], encoded)
  end
end

local nowMs = tonumber(ARGV[5] or '0')
local outboxes = cjson.decode(ARGV[6] or '[]')
for _, entry in ipairs(outboxes) do
  local id = tostring(entry['id'] or '')
  if id == '' then
    id = 'outbox-' .. tostring(redis.call('INCR', KEYS[2]))
  end
  local hashKey = KEYS[3] .. id
  local retryAtMs = tonumber(entry['retry_at_ms'] or '0')
  local visibility = nowMs
  if retryAtMs > 0 then
    visibility = retryAtMs
  end
  redis.call('HSET', hashKey,
    'id', id,
    'entity_id', tostring(entry['entity_id'] or ''),
    'transition_id', tostring(entry['transition_id'] or ''),
    'execution_id', tostring(entry['execution_id'] or ''),
    'event', tostring(entry['event'] or ''),
    'topic', tostring(entry['topic'] or ''),
    'effect_type', tostring(entry['effect_type'] or ''),
    'payload', tostring(entry['payload'] or ''),
    'status', 'pending',
    'attempts', '0',
    'lease_owner', '',
    'lease_until_ms', '0',
    'lease_token', '',
    'retry_at_ms', tostring(visibility),
    'processed_at_ms', '0',
    'last_error', '',
    'metadata_json', tostring(entry['metadata_json'] or '{}'),
    'created_at_ms', tostring(entry['created_at_ms'] or nowMs)
  )
  redis.call('ZADD', KEYS[1], visibility, id)
end
return 'ok'
`

const redisScriptClaimPending = `
local leaseTTL = tonumber(ARGV[1] or '0')
local workerID = tostring(ARGV[2] or '')
local limit = tonumber(ARGV[3] or '100')
local now = redis.call('TIME')
local nowMs = tonumber(now[1]) * 1000 + math.floor(tonumber(now[2]) / 1000)
local leaseUntilMs = nowMs + leaseTTL
local ids = redis.call('ZRANGEBYSCORE', KEYS[1], '-inf', nowMs, 'LIMIT', 0, limit)
local claimed = {}
for _, id in ipairs(ids) do
  local hashKey = KEYS[3] .. id
  if redis.call('EXISTS', hashKey) == 1 then
    local status = tostring(redis.call('HGET', hashKey, 'status') or 'pending')
    local leaseUntil = tonumber(redis.call('HGET', hashKey, 'lease_until_ms') or '0')
    local retryable = (status == '' or status == 'pending' or status == 'failed')
    local reclaimableLease = (status == 'leased' and leaseUntil <= nowMs)
    if retryable or reclaimableLease then
      local attempts = tonumber(redis.call('HGET', hashKey, 'attempts') or '0') + 1
      local token = tostring(redis.call('INCR', KEYS[2])) .. ':' .. id .. ':' .. workerID
      redis.call('HSET', hashKey,
        'status', 'leased',
        'lease_owner', workerID,
        'lease_until_ms', tostring(leaseUntilMs),
        'lease_token', token,
        'attempts', tostring(attempts)
      )
      local raw = redis.call('HGETALL', hashKey)
      local row = {}
      for i = 1, #raw, 2 do
        row[raw[i]] = raw[i + 1]
      end
      row['id'] = id
      table.insert(claimed, cjson.encode(row))
    end
  end
end
return claimed
`

const redisScriptMarkCompleted = `
local id = tostring(ARGV[1] or '')
local token = tostring(ARGV[2] or '')
local hashKey = KEYS[2] .. id
if redis.call('EXISTS', hashKey) ~= 1 then
  return -1
end
if tostring(redis.call('HGET', hashKey, 'lease_token') or '') ~= token then
  return -2
end
if tostring(redis.call('HGET', hashKey, 'status') or '') ~= 'leased' then
  return -3
end
local now = redis.call('TIME')
local nowMs = tonumber(now[1]) * 1000 + math.floor(tonumber(now[2]) / 1000)
redis.call('HSET', hashKey,
  'status', 'completed',
  'lease_owner', '',
  'lease_until_ms', '0',
  'lease_token', '',
  'retry_at_ms', '0',
  'processed_at_ms', tostring(nowMs),
  'last_error', ''
)
redis.call('ZREM', KEYS[1], id)
return 1
`

const redisScriptMarkFailed = `
local id = tostring(ARGV[1] or '')
local token = tostring(ARGV[2] or '')
local retryAt = tonumber(ARGV[3] or '0')
local reason = tostring(ARGV[4] or '')
local hashKey = KEYS[2] .. id
if redis.call('EXISTS', hashKey) ~= 1 then
  return -1
end
if tostring(redis.call('HGET', hashKey, 'lease_token') or '') ~= token then
  return -2
end
if tostring(redis.call('HGET', hashKey, 'status') or '') ~= 'leased' then
  return -3
end
redis.call('HSET', hashKey,
  'status', 'pending',
  'lease_owner', '',
  'lease_until_ms', '0',
  'lease_token', '',
  'retry_at_ms', tostring(retryAt),
  'processed_at_ms', '0',
  'last_error', reason
)
redis.call('ZADD', KEYS[1], retryAt, id)
return 1
`

const redisScriptMarkDeadLetter = `
local id = tostring(ARGV[1] or '')
local token = tostring(ARGV[2] or '')
local reason = tostring(ARGV[3] or '')
local hashKey = KEYS[3] .. id
if redis.call('EXISTS', hashKey) ~= 1 then
  return -1
end
if tostring(redis.call('HGET', hashKey, 'lease_token') or '') ~= token then
  return -2
end
if tostring(redis.call('HGET', hashKey, 'status') or '') ~= 'leased' then
  return -3
end
local now = redis.call('TIME')
local nowMs = tonumber(now[1]) * 1000 + math.floor(tonumber(now[2]) / 1000)
redis.call('HSET', hashKey,
  'status', 'dead_lettered',
  'lease_owner', '',
  'lease_until_ms', '0',
  'lease_token', '',
  'retry_at_ms', '0',
  'processed_at_ms', tostring(nowMs),
  'last_error', reason
)
redis.call('ZREM', KEYS[1], id)
redis.call('ZADD', KEYS[2], nowMs, id)
return 1
`

const redisScriptListDeadLetters = `
local limit = tonumber(ARGV[1] or '100')
if limit <= 0 then
  limit = 100
end
local ids = redis.call('ZREVRANGE', KEYS[1], 0, limit - 1)
local rows = {}
for _, id in ipairs(ids) do
  local hashKey = KEYS[2] .. id
  if redis.call('EXISTS', hashKey) == 1 then
    local raw = redis.call('HGETALL', hashKey)
    local row = {}
    for i = 1, #raw, 2 do
      row[raw[i]] = raw[i + 1]
    end
    row['id'] = id
    table.insert(rows, cjson.encode(row))
  end
end
return rows
`

const redisScriptExtendLease = `
local id = tostring(ARGV[1] or '')
local token = tostring(ARGV[2] or '')
local leaseTTL = tonumber(ARGV[3] or '0')
local hashKey = KEYS[1] .. id
if redis.call('EXISTS', hashKey) ~= 1 then
  return -1
end
if tostring(redis.call('HGET', hashKey, 'lease_token') or '') ~= token then
  return -2
end
if tostring(redis.call('HGET', hashKey, 'status') or '') ~= 'leased' then
  return -3
end
local now = redis.call('TIME')
local nowMs = tonumber(now[1]) * 1000 + math.floor(tonumber(now[2]) / 1000)
redis.call('HSET', hashKey, 'lease_until_ms', tostring(nowMs + leaseTTL))
return 1
`

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
	entry.LeaseToken = strings.TrimSpace(entry.LeaseToken)
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

func unmarshalEffect(effectType string, payload []byte) (Effect, error) {
	kind := strings.ToLower(strings.TrimSpace(effectType))
	if len(payload) == 0 {
		payload = []byte("null")
	}
	switch kind {
	case "", "none":
		return nil, nil
	case "command":
		var effect CommandEffect
		if err := json.Unmarshal(payload, &effect); err != nil {
			return nil, err
		}
		return effect, nil
	case "event":
		var effect EmitEvent
		if err := json.Unmarshal(payload, &effect); err != nil {
			return nil, err
		}
		return effect, nil
	default:
		var raw any
		if err := json.Unmarshal(payload, &raw); err != nil {
			return nil, err
		}
		return raw, nil
	}
}

func loadSQLiteOutboxEntry(ctx context.Context, tx *sql.Tx, table, id string) (OutboxEntry, error) {
	if tx == nil {
		return OutboxEntry{}, errors.New("sqlite tx store not configured")
	}
	query := fmt.Sprintf(`SELECT
		id, entity_id, transition_id, execution_id, event, topic,
		effect_type, payload, status, attempts, lease_owner, lease_until, lease_token,
		retry_at, processed_at, last_error, metadata, created_at
		FROM %s WHERE id = ?`, table)
	row := tx.QueryRowContext(ctx, query, id)
	entry, err := decodeOutboxEntry(row)
	if errors.Is(err, sql.ErrNoRows) {
		return OutboxEntry{}, nil
	}
	return entry, err
}

type sqlRowScanner interface {
	Scan(dest ...any) error
}

func decodeOutboxEntry(row sqlRowScanner) (OutboxEntry, error) {
	var (
		id, entityID string
		effectType   string
		payloadJSON  string
		transitionID sql.NullString
		executionID  sql.NullString
		event        sql.NullString
		topic        sql.NullString
		status       sql.NullString
		attempts     sql.NullInt64
		leaseOwner   sql.NullString
		leaseUntil   sql.NullString
		leaseToken   sql.NullString
		retryAt      sql.NullString
		processedAt  sql.NullString
		lastError    sql.NullString
		metadataJSON sql.NullString
		createdAt    sql.NullString
	)
	if err := row.Scan(
		&id,
		&entityID,
		&transitionID,
		&executionID,
		&event,
		&topic,
		&effectType,
		&payloadJSON,
		&status,
		&attempts,
		&leaseOwner,
		&leaseUntil,
		&leaseToken,
		&retryAt,
		&processedAt,
		&lastError,
		&metadataJSON,
		&createdAt,
	); err != nil {
		return OutboxEntry{}, err
	}

	entry := OutboxEntry{
		ID:           strings.TrimSpace(id),
		EntityID:     strings.TrimSpace(entityID),
		TransitionID: strings.TrimSpace(transitionID.String),
		ExecutionID:  strings.TrimSpace(executionID.String),
		Event:        normalizeEvent(event.String),
		Topic:        strings.TrimSpace(topic.String),
		Payload:      []byte(payloadJSON),
		Status:       strings.TrimSpace(status.String),
		Attempts:     int(attempts.Int64),
		LeaseOwner:   strings.TrimSpace(leaseOwner.String),
		LeaseToken:   strings.TrimSpace(leaseToken.String),
		LastError:    strings.TrimSpace(lastError.String),
	}
	if ts, ok := parseTimestamp(createdAt.String); ok {
		entry.CreatedAt = ts
	}
	if ts, ok := parseTimestamp(leaseUntil.String); ok {
		entry.LeaseUntil = ts
	}
	if ts, ok := parseTimestamp(retryAt.String); ok {
		entry.RetryAt = ts
	}
	if ts, ok := parseTimestamp(processedAt.String); ok {
		entry.ProcessedAt = &ts
	}
	if strings.TrimSpace(metadataJSON.String) != "" {
		_ = json.Unmarshal([]byte(metadataJSON.String), &entry.Metadata)
	}
	if effect, err := unmarshalEffect(effectType, entry.Payload); err == nil {
		entry.Effect = effect
	}
	return entry, nil
}

func parseTimestamp(value string) (time.Time, bool) {
	value = strings.TrimSpace(value)
	if value == "" {
		return time.Time{}, false
	}
	ts, err := time.Parse(time.RFC3339Nano, value)
	if err != nil {
		return time.Time{}, false
	}
	return ts.UTC(), true
}

func formatTimestamp(value time.Time) string {
	if value.IsZero() {
		return ""
	}
	return value.UTC().Format(time.RFC3339Nano)
}

func isSQLiteDuplicateColumnError(err error) bool {
	if err == nil {
		return false
	}
	return strings.Contains(strings.ToLower(err.Error()), "duplicate column name")
}

var outboxCounter atomic.Uint64

func nextOutboxID() string {
	n := outboxCounter.Add(1)
	return fmt.Sprintf("outbox-%d-%d", time.Now().UTC().UnixNano(), n)
}

var leaseCounter atomic.Uint64

func nextLeaseToken(outboxID, workerID string) string {
	n := leaseCounter.Add(1)
	return fmt.Sprintf("lease-%d-%s-%s-%d",
		time.Now().UTC().UnixNano(),
		strings.TrimSpace(outboxID),
		strings.TrimSpace(workerID),
		n,
	)
}

type sqlExecContext interface {
	ExecContext(ctx context.Context, query string, args ...any) (sql.Result, error)
}

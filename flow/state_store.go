package flow

import (
	"context"
	"database/sql"
	"errors"
	"sync"
	"time"
)

// StateStore persists workflow state by key.
type StateStore interface {
	Load(ctx context.Context, key string) (string, error)
	Save(ctx context.Context, key, state string) error
}

// InMemoryStateStore is a thread-safe in-memory store.
type InMemoryStateStore struct {
	mu    sync.RWMutex
	state map[string]string
}

// NewInMemoryStateStore constructs an empty store.
func NewInMemoryStateStore() *InMemoryStateStore {
	return &InMemoryStateStore{state: make(map[string]string)}
}

// Load returns stored state or empty string.
func (s *InMemoryStateStore) Load(_ context.Context, key string) (string, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	return s.state[key], nil
}

// Save writes the state for the key.
func (s *InMemoryStateStore) Save(_ context.Context, key, state string) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.state[key] = state
	return nil
}

// SQLiteStateStore persists state in a SQL table using a provided *sql.DB.
// The table is expected to have schema: CREATE TABLE IF NOT EXISTS states (k TEXT PRIMARY KEY, v TEXT);
type SQLiteStateStore struct {
	db    *sql.DB
	table string
}

// NewSQLiteStateStore builds a store using the given DB and table name.
func NewSQLiteStateStore(db *sql.DB, table string) *SQLiteStateStore {
	if table == "" {
		table = "states"
	}
	return &SQLiteStateStore{db: db, table: table}
}

// Load reads state for key.
func (s *SQLiteStateStore) Load(ctx context.Context, key string) (string, error) {
	if s == nil || s.db == nil {
		return "", errors.New("sqlite store not configured")
	}
	var value string
	err := s.db.QueryRowContext(ctx, "SELECT v FROM "+s.table+" WHERE k = ?", key).Scan(&value)
	if errors.Is(err, sql.ErrNoRows) {
		return "", nil
	}
	return value, err
}

// Save upserts state for key.
func (s *SQLiteStateStore) Save(ctx context.Context, key, state string) error {
	if s == nil || s.db == nil {
		return errors.New("sqlite store not configured")
	}
	_, err := s.db.ExecContext(ctx, "INSERT INTO "+s.table+" (k, v) VALUES (?, ?) ON CONFLICT(k) DO UPDATE SET v=excluded.v", key, state)
	return err
}

// RedisStateStore persists state via a minimal redis client interface.
type RedisStateStore struct {
	client RedisClient
	ttl    time.Duration
}

// RedisClient captures the minimal commands needed from a redis client.
type RedisClient interface {
	Get(ctx context.Context, key string) (string, error)
	Set(ctx context.Context, key string, value interface{}, expiration time.Duration) error
}

// NewRedisStateStore builds a store using the provided client and TTL.
func NewRedisStateStore(client RedisClient, ttl time.Duration) *RedisStateStore {
	return &RedisStateStore{client: client, ttl: ttl}
}

// Load reads state from redis.
func (s *RedisStateStore) Load(ctx context.Context, key string) (string, error) {
	if s == nil || s.client == nil {
		return "", errors.New("redis store not configured")
	}
	return s.client.Get(ctx, key)
}

// Save writes state to redis.
func (s *RedisStateStore) Save(ctx context.Context, key, state string) error {
	if s == nil || s.client == nil {
		return errors.New("redis store not configured")
	}
	return s.client.Set(ctx, key, state, s.ttl)
}

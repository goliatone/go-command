package transactiontest

import (
	"context"
	"crypto/sha256"
	"database/sql"
	"errors"
	"fmt"
	"os"
	"strings"
	"testing"

	"github.com/goliatone/go-command/flow"
	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect"
	"github.com/uptrace/bun/dialect/pgdialect"
	"github.com/uptrace/bun/driver/pgdriver"
)

// Every test gets its own schema in an explicitly disposable database. The
// caller starts/stops the database; the suite owns only its generated schemas.
func postgresDSN(t *testing.T) string {
	t.Helper()
	if os.Getenv("FLOW_TEST_POSTGRES_DISPOSABLE") != "1" {
		t.Fatal("PostgreSQL tests require FLOW_TEST_POSTGRES_DISPOSABLE=1 and a disposable database")
	}
	return os.Getenv("FLOW_TEST_POSTGRES_DSN")
}

func openPostgres(t *testing.T, path string) *bun.DB {
	t.Helper()
	dsn := postgresDSN(t)
	// Stable across reopen, independent handles and the recovery subprocess.
	schemaName := fmt.Sprintf("flow_%x", sha256.Sum256([]byte(path)))[:37]
	admin := sql.OpenDB(pgdriver.NewConnector(pgdriver.WithDSN(dsn)))
	_, err := admin.Exec(`CREATE SCHEMA IF NOT EXISTS "` + schemaName + `"`)
	_ = admin.Close()
	must(t, err)
	db := sql.OpenDB(pgdriver.NewConnector(pgdriver.WithDSN(dsn), pgdriver.WithConnParams(map[string]interface{}{
		"search_path": schemaName, "statement_timeout": "10000", "lock_timeout": "5000",
	})))
	db.SetMaxOpenConns(4)
	b := bun.NewDB(db, pgdialect.New())
	t.Cleanup(func() { _ = b.Close() })
	return b
}

func cleanupPostgresSchema(t *testing.T, b *bun.DB) {
	t.Helper()
	var name string
	must(t, b.QueryRow("SELECT current_schema()").Scan(&name))
	if !strings.HasPrefix(name, "flow_") || len(name) != 37 {
		t.Fatal("refusing cleanup outside generated fixture schema")
	}
	dsn := postgresDSN(t)
	t.Cleanup(func() {
		db := sql.OpenDB(pgdriver.NewConnector(pgdriver.WithDSN(dsn)))
		defer db.Close()
		_, err := db.Exec(`DROP SCHEMA "` + name + `" CASCADE`)
		if err != nil {
			t.Errorf("fixture schema cleanup failed: %v", err)
		}
	})
}

func rejectInsert(t *testing.T, b *bun.DB, table, name string) {
	t.Helper()
	if b.Dialect().Name() == dialect.PG {
		_, err := b.Exec("CREATE FUNCTION " + name + "_fn() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RAISE EXCEPTION 'injected SQL failure'; END; $$")
		must(t, err)
		_, err = b.Exec("CREATE TRIGGER " + name + " BEFORE INSERT ON " + table + " FOR EACH ROW EXECUTE FUNCTION " + name + "_fn()")
		must(t, err)
		return
	}
	_, err := b.Exec("CREATE TRIGGER " + name + " BEFORE INSERT ON " + table + " BEGIN SELECT RAISE(ABORT,'injected SQL failure'); END")
	must(t, err)
}

func deferCommitFailure(t *testing.T, b *bun.DB) {
	t.Helper()
	if b.Dialect().Name() == dialect.PG {
		_, err := b.Exec("CREATE FUNCTION fail_commit_fn() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN INSERT INTO deferred_child VALUES(1); RETURN NEW; END; $$")
		must(t, err)
		_, err = b.Exec("CREATE TRIGGER fail_commit AFTER INSERT ON receipts FOR EACH ROW EXECUTE FUNCTION fail_commit_fn()")
		must(t, err)
		return
	}
	_, err := b.Exec("CREATE TRIGGER fail_commit AFTER INSERT ON receipts BEGIN INSERT INTO deferred_child VALUES(1); END")
	must(t, err)
}

func dropReceiptTrigger(t *testing.T, b *bun.DB) {
	t.Helper()
	query := "DROP TRIGGER reject_receipt"
	if b.Dialect().Name() == dialect.PG {
		query += " ON receipts"
	}
	_, err := b.Exec(query)
	must(t, err)
}

// This store owns its state commit, reproducing ApplyEvent's native
// state-then-receipt ordering on PostgreSQL. It is test-owned, not a stock store.
type committingPostgresState struct{ db *bun.DB }

func (s committingPostgresState) Load(c context.Context, id string) (rec *flow.StateRecord, err error) {
	err = s.db.RunInTx(c, nil, func(c context.Context, tx bun.Tx) error {
		var loadErr error
		rec, loadErr = (txState{tx}).Load(c, id)
		return loadErr
	})
	return rec, err
}

func (s committingPostgresState) SaveIfVersion(c context.Context, rec *flow.StateRecord, expected int) (version int, err error) {
	err = s.db.RunInTx(c, nil, func(c context.Context, tx bun.Tx) error {
		var saveErr error
		version, saveErr = (txState{tx}).SaveIfVersion(c, rec, expected)
		return saveErr
	})
	return version, err
}

func (s committingPostgresState) RunInTransaction(c context.Context, fn func(flow.TxStore) error) error {
	return s.db.RunInTx(c, nil, func(_ context.Context, tx bun.Tx) error { return fn(txState{tx}) })
}

func nativeState(b *bun.DB) flow.StateStore {
	if b.Dialect().Name() == dialect.PG {
		return committingPostgresState{b}
	}
	return flow.NewSQLiteStateStore(b.DB, "native_states")
}

func TestG4ReceiptCollisionKeepsTransactionUsable(t *testing.T) {
	b := openDB(t, t.TempDir()+"/flow.db")
	schema(t, b)
	c := context.Background()
	tx, err := b.BeginTx(c, nil)
	must(t, err)
	defer tx.Rollback()
	store := receipts{tx}
	rec := &flow.IdempotencyRecord[message]{
		Scope:       flow.IdempotencyScope{MachineID: "generic", EntityID: "Workflow A", Event: "accept", IdempotencyKey: "operation-a"},
		RequestHash: "opaque-hash", Response: &flow.ApplyEventResponse[message]{EventID: "event-a", Version: 2},
	}
	must(t, store.Save(c, rec))
	if err = store.Save(c, rec); !errors.Is(err, flow.ErrIdempotencyRecordExists) {
		t.Fatalf("duplicate receipt: %v", err)
	}
	again, err := store.Load(c, rec.Scope)
	must(t, err)
	if again == nil || again.Response.EventID != "event-a" {
		t.Fatal("collision aborted transaction or lost winning receipt")
	}
	must(t, tx.Commit())
}

// These adapters are test-owned examples of public extension seams, not a
// supported SQL store. Host schemas and transaction ownership stay with callers.
package transactiontest

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"reflect"
	"sync"
	"testing"

	"github.com/goliatone/go-command/flow"
	"github.com/mattn/go-sqlite3"
	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/sqlitedialect"
)

type message struct{ Payload string }

func (message) Type() string { return "workflow.event" }

func definition() *flow.MachineDefinition {
	return &flow.MachineDefinition{ID: "generic", Version: "1",
		States:      []flow.StateDefinition{{Name: "draft", Initial: true}, {Name: "accepted"}},
		Transitions: []flow.TransitionDefinition{{ID: "accept", Event: "accept", From: "draft", To: "accepted"}},
	}
}

func request() flow.ApplyEventRequest[message] {
	return flow.ApplyEventRequest[message]{EntityID: "Workflow A", Event: "accept",
		Msg: message{Payload: "opaque"}, IdempotencyKey: "operation-a", ExpectedVersion: 1,
		ExecCtx:  flow.ExecutionContext{ActorID: "user-a"},
		Metadata: map[string]any{"group_id": "Group A", "correlation_id": "correlation-a"},
	}
}

func machine(s flow.StateStore, receipts flow.IdempotencyStore[message], hooks ...flow.TransitionLifecycleHook[message]) (*flow.StateMachine[message], error) {
	return flow.NewStateMachineFromDefinition(definition(), s, flow.TransitionRequest[message]{},
		flow.NewResolverMap[message](), nil, flow.WithExecutionPolicy[message](flow.ExecutionPolicyLightweight),
		flow.WithIdempotencyStore[message](receipts), flow.WithLifecycleHooks(hooks...))
}

func must(t *testing.T, err error) {
	t.Helper()
	if err != nil {
		t.Fatal(err)
	}
}

func openDB(t *testing.T, path string) *bun.DB {
	t.Helper()
	db, err := sql.Open("sqlite3", "file:"+filepath.ToSlash(path)+"?_busy_timeout=5000&_txlock=immediate&_foreign_keys=on")
	must(t, err)
	// Multiple independent connections/writers; SQLite serializes immediate txs.
	db.SetMaxOpenConns(4)
	b := bun.NewDB(db, sqlitedialect.New())
	t.Cleanup(func() { _ = b.Close() })
	return b
}

func schema(t *testing.T, b *bun.DB) {
	t.Helper()
	for _, query := range []string{
		`CREATE TABLE states(entity_id TEXT PRIMARY KEY, state TEXT NOT NULL, version INTEGER NOT NULL, metadata TEXT NOT NULL)`,
		`CREATE TABLE receipts(machine_id TEXT, entity_id TEXT, event TEXT, operation_key TEXT, record TEXT NOT NULL, PRIMARY KEY(machine_id, entity_id, event, operation_key))`,
		`CREATE TABLE payloads(operation_key TEXT PRIMARY KEY, payload TEXT NOT NULL)`,
		`CREATE TABLE events(event_id TEXT PRIMARY KEY, entity_id TEXT, revision INTEGER, actor_id TEXT, group_id TEXT, correlation_id TEXT)`,
	} {
		_, err := b.Exec(query)
		must(t, err)
	}
}

// txState cannot create, commit or escape its caller-owned transaction.
type txState struct{ tx bun.Tx }

var _ flow.StateStore = txState{}
var _ flow.TxStore = txState{}

func (s txState) Load(c context.Context, id string) (*flow.StateRecord, error) {
	r := &flow.StateRecord{EntityID: id, MachineID: "generic", MachineVersion: "1"}
	var raw string
	err := s.tx.QueryRowContext(c, "SELECT state,version,metadata FROM states WHERE entity_id=?", id).Scan(&r.State, &r.Version, &raw)
	if errors.Is(err, sql.ErrNoRows) {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	err = json.Unmarshal([]byte(raw), &r.Metadata)
	return r, err
}

func (s txState) SaveIfVersion(c context.Context, r *flow.StateRecord, version int) (int, error) {
	raw, err := json.Marshal(r.Metadata)
	if err != nil {
		return 0, err
	}
	var result sql.Result
	if version == 0 {
		result, err = s.tx.ExecContext(c, "INSERT INTO states VALUES(?,?,1,?) ON CONFLICT(entity_id) DO NOTHING", r.EntityID, r.State, string(raw))
	} else {
		result, err = s.tx.ExecContext(c, "UPDATE states SET state=?,version=version+1,metadata=? WHERE entity_id=? AND version=?", r.State, string(raw), r.EntityID, version)
	}
	if err != nil {
		return 0, err
	}
	n, err := result.RowsAffected()
	if err != nil {
		return 0, err
	}
	if n != 1 {
		return 0, flow.ErrStateVersionConflict
	}
	return version + 1, nil
}

func (s txState) RunInTransaction(_ context.Context, fn func(flow.TxStore) error) error { return fn(s) }
func (s txState) AppendOutbox(context.Context, flow.OutboxEntry) error {
	return errors.New("outbox excluded from bounded adapter")
}

type receipts struct{ db bun.IDB }

var _ flow.IdempotencyStore[message] = receipts{}

func (s receipts) Load(c context.Context, scope flow.IdempotencyScope) (*flow.IdempotencyRecord[message], error) {
	var raw string
	err := s.db.QueryRowContext(c, "SELECT record FROM receipts WHERE machine_id=? AND entity_id=? AND event=? AND operation_key=?", scope.MachineID, scope.EntityID, scope.Event, scope.IdempotencyKey).Scan(&raw)
	if errors.Is(err, sql.ErrNoRows) {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	var r flow.IdempotencyRecord[message]
	err = json.Unmarshal([]byte(raw), &r)
	return &r, err
}

func (s receipts) Save(c context.Context, r *flow.IdempotencyRecord[message]) error {
	raw, err := json.Marshal(r)
	if err != nil {
		return err
	}
	_, err = s.db.ExecContext(c, "INSERT INTO receipts VALUES(?,?,?,?,?)", r.Scope.MachineID, r.Scope.EntityID, r.Scope.Event, r.Scope.IdempotencyKey, string(raw))
	var sqliteErr sqlite3.Error
	if errors.As(err, &sqliteErr) && sqliteErr.ExtendedCode == sqlite3.ErrConstraintPrimaryKey {
		return flow.ErrIdempotencyRecordExists
	}
	return err
}

type hookFunc func(context.Context, flow.TransitionLifecycleEvent[message]) error

func (fn hookFunc) Notify(c context.Context, e flow.TransitionLifecycleEvent[message]) error {
	return fn(c, e)
}

// apply is a bounded host command fixture: no configured workflow actions,
// authorization must precede it, and no authoritative output escapes on failure.
func apply(b *bun.DB, r flow.ApplyEventRequest[message], fault string, observe func(string)) (*flow.ApplyEventResponse[message], error) {
	c := context.Background()
	if r.IdempotencyKey == "" || r.DryRun {
		return nil, errors.New("bounded mutation requires key and non-dry-run request")
	}
	tx, err := b.BeginTx(c, nil)
	if err != nil {
		return nil, err
	}
	defer tx.Rollback() // also runs during panic unwinding; owner preserves panic
	store := txState{tx}
	q := receipts{tx}
	prior, err := q.Load(c, flow.IdempotencyScope{MachineID: "generic", EntityID: r.EntityID, Event: r.Event, IdempotencyKey: r.IdempotencyKey})
	if err != nil {
		return nil, err
	}
	if prior == nil {
		_, err = tx.ExecContext(c, "INSERT INTO payloads VALUES(?,?)", r.IdempotencyKey, r.Msg.Payload)
		if err != nil {
			return nil, err
		}
	}
	if fault == "after_payload" {
		return nil, errors.New("after payload")
	}
	_, err = tx.ExecContext(c, "INSERT INTO states VALUES(?,'draft',1,'{}') ON CONFLICT(entity_id) DO NOTHING", r.EntityID)
	if err != nil {
		return nil, err
	}
	var pending []flow.TransitionLifecycleEvent[message]
	m, err := machine(store, q, hookFunc(func(_ context.Context, e flow.TransitionLifecycleEvent[message]) error {
		pending = append(pending, e)
		if observe != nil {
			observe("buffer:" + string(e.Phase))
		}
		return nil
	}))
	if err != nil {
		return nil, err
	}
	out, err := m.ApplyEvent(c, r)
	if err != nil {
		return nil, err
	}
	if out == nil || out.Execution == nil || out.Execution.Status != flow.ExecutionStateCompleted {
		return nil, errors.New("incomplete or degraded provisional result: abort outer transaction")
	}
	if out.Transition == nil || len(out.Transition.Effects) != 0 {
		return nil, errors.New("external effects excluded")
	}
	if !out.IdempotencyHit {
		_, err = tx.ExecContext(c, "INSERT INTO events VALUES(?,?,?,?,?,?)", out.EventID, r.EntityID, out.Version, r.ExecCtx.ActorID, r.Metadata["group_id"], r.Metadata["correlation_id"])
		if err != nil {
			return nil, err
		}
	}
	if fault == "after_apply" {
		return nil, errors.New("after ApplyEvent")
	}
	if fault == "panic" {
		panic("host panic after ApplyEvent")
	}
	if observe != nil {
		observe("before_commit")
	}
	if err = tx.Commit(); err != nil {
		return nil, err
	}
	if observe != nil {
		observe("after_commit")
		for _, e := range pending {
			if e.Phase == flow.TransitionPhaseCommitted {
				observe("project:committed")
			}
		}
	}
	return out, nil
}

func count(t *testing.T, b *bun.DB, table string) int {
	t.Helper()
	var n int
	must(t, b.QueryRow("SELECT count(*) FROM "+table).Scan(&n))
	return n
}

func assertCounts(t *testing.T, b *bun.DB, n int) {
	t.Helper()
	for _, table := range []string{"states", "receipts", "payloads", "events"} {
		if got := count(t, b, table); got != n {
			t.Fatalf("%s rows=%d want=%d", table, got, n)
		}
	}
}

func TestG4AtomicAdapter(t *testing.T) {
	for _, fault := range []string{"commit", "after_payload", "after_apply", "receipt_sql", "state_sql", "event_sql", "panic", "commit_sql"} {
		t.Run(fault, func(t *testing.T) {
			b := openDB(t, filepath.Join(t.TempDir(), "flow.db"))
			schema(t, b)
			if fault == "commit_sql" {
				_, err := b.Exec("CREATE TABLE parent(id INTEGER PRIMARY KEY)")
				must(t, err)
				_, err = b.Exec("CREATE TABLE deferred_child(id INTEGER REFERENCES parent(id) DEFERRABLE INITIALLY DEFERRED)")
				must(t, err)
				_, err = b.Exec("CREATE TRIGGER fail_commit AFTER INSERT ON receipts BEGIN INSERT INTO deferred_child VALUES(1); END")
				must(t, err)
			}
			for _, table := range []string{"receipts", "states", "events"} {
				if fault == map[string]string{"receipts": "receipt_sql", "states": "state_sql", "events": "event_sql"}[table] {
					_, err := b.Exec("CREATE TRIGGER fail_write BEFORE INSERT ON " + table + " BEGIN SELECT RAISE(ABORT,'injected SQL failure'); END")
					must(t, err)
				}
			}
			var trace []string
			var out *flow.ApplyEventResponse[message]
			var err error
			var caught any
			func() {
				defer func() { caught = recover() }()
				out, err = apply(b, request(), fault, func(s string) { trace = append(trace, s) })
			}()
			if fault == "commit" {
				must(t, err)
				if out == nil || out.Version != 2 || caught != nil {
					t.Fatalf("bad committed outcome: %+v panic=%v", out, caught)
				}
				assertCounts(t, b, 1)
				var actor, group, correlation, payload string
				var revision int
				must(t, b.QueryRow("SELECT revision,actor_id,group_id,correlation_id FROM events WHERE event_id=?", out.EventID).Scan(&revision, &actor, &group, &correlation))
				must(t, b.QueryRow("SELECT payload FROM payloads").Scan(&payload))
				if revision != 2 || actor != "user-a" || group != "Group A" || correlation != "correlation-a" || payload != "opaque" {
					t.Fatal("payload/provenance mismatch")
				}
				want := []string{"buffer:attempted", "buffer:committed", "before_commit", "after_commit", "project:committed"}
				if !reflect.DeepEqual(trace, want) {
					t.Fatalf("hook/projection ordering: %v", trace)
				}
			} else {
				if fault == "panic" {
					if caught != "host panic after ApplyEvent" {
						t.Fatalf("panic not preserved: %v", caught)
					}
				} else if err == nil || caught != nil {
					t.Fatalf("expected failure: err=%v panic=%v", err, caught)
				}
				if out != nil {
					t.Fatal("provisional response escaped rollback")
				}
				assertCounts(t, b, 0)
				for _, s := range trace {
					if s == "project:committed" || s == "after_commit" {
						t.Fatalf("precommit success leaked: %v", trace)
					}
				}
			}
		})
	}
}

func TestG4ReplayAndRecovery(t *testing.T) {
	path := filepath.Join(t.TempDir(), "flow.db")
	b := openDB(t, path)
	schema(t, b)
	first, err := apply(b, request(), "", nil)
	must(t, err)
	// Discard transport output: authoritative receipt must recover the same event.
	must(t, b.Close())
	b = openDB(t, path)
	again, err := apply(b, request(), "", nil)
	must(t, err)
	if !again.IdempotencyHit || again.EventID != first.EventID || again.Version != 2 {
		t.Fatal("lost response not recovered")
	}
	changed := request()
	changed.Msg.Payload = "different"
	_, err = apply(b, changed, "", nil)
	if flow.MapRuntimeError(err).RuntimeCode != flow.ErrCodeIdempotencyConflict {
		t.Fatalf("changed payload replay: %v", err)
	}
	assertCounts(t, b, 1)
	cmd := exec.Command(os.Args[0], "-test.run=^TestG4RestartChild$", "-test.v")
	cmd.Env = append(os.Environ(), "FLOW_RECOVERY_DB="+path, "FLOW_EVENT_ID="+first.EventID)
	output, err := cmd.CombinedOutput()
	if err != nil {
		t.Fatalf("fresh process recovery: %v\n%s", err, output)
	}
	t.Log("fresh test process recovered committed receipt")
}

func TestG4RestartChild(t *testing.T) {
	path := os.Getenv("FLOW_RECOVERY_DB")
	if path == "" {
		t.Skip("subprocess helper")
	}
	b := openDB(t, path)
	out, err := apply(b, request(), "", nil)
	must(t, err)
	if !out.IdempotencyHit || out.EventID != os.Getenv("FLOW_EVENT_ID") {
		t.Fatal("restart lost receipt")
	}
	assertCounts(t, b, 1)
}

func TestG4TwoWriters(t *testing.T) {
	for _, sameKey := range []bool{true, false} {
		t.Run(fmt.Sprint("same_key=", sameKey), func(t *testing.T) {
			path := filepath.Join(t.TempDir(), "flow.db")
			b := openDB(t, path)
			schema(t, b)
			other := openDB(t, path)
			start := make(chan struct{})
			errs := make(chan error, 2)
			outs := make(chan *flow.ApplyEventResponse[message], 2)
			var wg sync.WaitGroup
			for i, db := range []*bun.DB{b, other} {
				wg.Add(1)
				go func(i int, db *bun.DB) {
					defer wg.Done()
					<-start
					r := request()
					if !sameKey {
						r.IdempotencyKey = fmt.Sprint("key-", i)
					}
					out, err := apply(db, r, "", nil)
					errs <- err
					outs <- out
				}(i, db)
			}
			close(start)
			wg.Wait()
			close(errs)
			close(outs)
			success := 0
			for err := range errs {
				if err == nil {
					success++
				}
			}
			want := 1
			if sameKey {
				want = 2
			}
			if success != want {
				t.Fatalf("successful writers=%d want=%d", success, want)
			}
			var event string
			hits := 0
			for out := range outs {
				if out != nil {
					if event != "" && event != out.EventID {
						t.Fatal("duplicate event")
					}
					event = out.EventID
					if out.IdempotencyHit {
						hits++
					}
				}
			}
			if sameKey && hits != 1 {
				t.Fatal("same-key writers did not replay one receipt")
			}
			assertCounts(t, b, 1)
		})
	}
}

func TestG4CASAndOutboxExclusion(t *testing.T) {
	b := openDB(t, filepath.Join(t.TempDir(), "flow.db"))
	schema(t, b)
	c := context.Background()
	tx, err := b.BeginTx(c, nil)
	must(t, err)
	defer tx.Rollback()
	s := txState{tx}
	_, err = s.SaveIfVersion(c, &flow.StateRecord{EntityID: "Workflow A", State: "draft"}, 0)
	must(t, err)
	_, err = s.SaveIfVersion(c, &flow.StateRecord{EntityID: "Workflow A", State: "accepted"}, 1)
	must(t, err)
	_, err = s.SaveIfVersion(c, &flow.StateRecord{EntityID: "Workflow A", State: "accepted"}, 1)
	if !errors.Is(err, flow.ErrStateVersionConflict) {
		t.Fatalf("stale CAS: %v", err)
	}
	if err = s.AppendOutbox(c, flow.OutboxEntry{}); err == nil {
		t.Fatal("outbox silently accepted")
	}
}

func TestG4CASRace(t *testing.T) {
	path := filepath.Join(t.TempDir(), "flow.db")
	b := openDB(t, path)
	schema(t, b)
	_, err := b.Exec("INSERT INTO states VALUES('Workflow A','draft',1,'{}')")
	must(t, err)
	other := openDB(t, path)
	start := make(chan struct{})
	ready := make(chan struct{}, 2)
	errs := make(chan error, 2)
	for _, db := range []*bun.DB{b, other} {
		go func(db *bun.DB) {
			var expected int
			err := db.QueryRow("SELECT version FROM states WHERE entity_id='Workflow A'").Scan(&expected)
			ready <- struct{}{}
			<-start
			if err != nil {
				errs <- err
				return
			}
			tx, err := db.BeginTx(context.Background(), nil)
			if err != nil {
				errs <- err
				return
			}
			defer tx.Rollback()
			_, err = (txState{tx}).SaveIfVersion(context.Background(), &flow.StateRecord{EntityID: "Workflow A", State: "accepted"}, expected)
			if err == nil {
				err = tx.Commit()
			}
			errs <- err
		}(db)
	}
	<-ready
	<-ready
	close(start)
	winners, conflicts := 0, 0
	for i := 0; i < 2; i++ {
		err := <-errs
		if err == nil {
			winners++
		} else if errors.Is(err, flow.ErrStateVersionConflict) {
			conflicts++
		} else {
			t.Fatalf("unexpected CAS error: %v", err)
		}
	}
	if winners != 1 || conflicts != 1 {
		t.Fatalf("CAS winners=%d conflicts=%d", winners, conflicts)
	}
	var version int
	must(t, b.QueryRow("SELECT version FROM states WHERE entity_id='Workflow A'").Scan(&version))
	if version != 2 {
		t.Fatalf("CAS version=%d", version)
	}
}

func TestG4ExistingStateRollbackAndRetry(t *testing.T) {
	b := openDB(t, filepath.Join(t.TempDir(), "flow.db"))
	schema(t, b)
	_, err := b.Exec("INSERT INTO states VALUES('Workflow A','draft',1,'{}')")
	must(t, err)
	_, err = b.Exec("CREATE TRIGGER reject_receipt BEFORE INSERT ON receipts BEGIN SELECT RAISE(ABORT,'receipt failure'); END")
	must(t, err)
	out, err := apply(b, request(), "", nil)
	if err == nil || out != nil {
		t.Fatal("receipt failure escaped outer rollback")
	}
	var state string
	var version int
	must(t, b.QueryRow("SELECT state,version FROM states").Scan(&state, &version))
	if state != "draft" || version != 1 {
		t.Fatalf("existing state changed on rollback: %s %d", state, version)
	}
	for _, table := range []string{"receipts", "payloads", "events"} {
		if count(t, b, table) != 0 {
			t.Fatalf("rollback leaked %s", table)
		}
	}
	_, err = b.Exec("DROP TRIGGER reject_receipt")
	must(t, err)
	out, err = apply(b, request(), "", nil)
	must(t, err)
	if out.IdempotencyHit || out.Version != 2 {
		t.Fatal("same key did not succeed after rollback")
	}
	assertCounts(t, b, 1)
}

type failingStart struct {
	flow.Orchestrator[message]
	starts int
}

func (o *failingStart) Start(context.Context, flow.StartRequest[message]) (*flow.ExecutionHandle, error) {
	o.starts++
	return nil, errors.New("orchestrator unavailable")
}

func TestG4NativeDegradedReceiptReplay(t *testing.T) {
	c := context.Background()
	b := openDB(t, filepath.Join(t.TempDir(), "native.db"))
	schema(t, b)
	s := flow.NewSQLiteStateStore(b.DB, "native_states")
	_, err := s.SaveIfVersion(c, &flow.StateRecord{EntityID: "Workflow A", State: "draft", MachineID: "generic", MachineVersion: "1"}, 0)
	must(t, err)
	o := &failingStart{}
	m, err := flow.NewStateMachineFromDefinition(definition(), s, flow.TransitionRequest[message]{}, flow.NewResolverMap[message](), nil,
		flow.WithExecutionPolicy[message](flow.ExecutionPolicyLightweight), flow.WithOrchestrator[message](o), flow.WithIdempotencyStore[message](receipts{b}))
	must(t, err)
	first, err := m.ApplyEvent(c, request())
	must(t, err)
	if first.Execution == nil || first.Execution.Status != flow.ExecutionStateDegraded || count(t, b, "receipts") != 1 {
		t.Fatal("degraded execution receipt missing")
	}
	again, err := m.ApplyEvent(c, request())
	must(t, err)
	if !again.IdempotencyHit || again.EventID != first.EventID || again.Execution.Status != flow.ExecutionStateDegraded || o.starts != 1 {
		t.Fatal("receipt replay restarted orchestration or lost degraded handle")
	}
}

// nativeOutcome deliberately uses the stock store and a separately committed
// SQL receipt store; no mock failures or outer transaction are involved.
func nativeOutcome(t *testing.T, failReceipt bool) (*flow.StateRecord, *flow.ApplyEventResponse[message], int, error) {
	t.Helper()
	c := context.Background()
	b := openDB(t, filepath.Join(t.TempDir(), "native.db"))
	schema(t, b)
	s := flow.NewSQLiteStateStore(b.DB, "native_states")
	_, err := s.SaveIfVersion(c, &flow.StateRecord{EntityID: "Workflow A", State: "draft", MachineID: "generic", MachineVersion: "1"}, 0)
	must(t, err)
	if failReceipt {
		_, err = b.Exec("CREATE TRIGGER reject_receipt BEFORE INSERT ON receipts BEGIN SELECT RAISE(ABORT,'receipt failure'); END")
		must(t, err)
	}
	m, err := machine(s, receipts{b})
	must(t, err)
	req := request()
	req.ExpectedVersion = 0 // match the audit's unversioned native retry
	first, err := m.ApplyEvent(c, req)
	must(t, err)
	r, err := s.Load(c, "Workflow A")
	must(t, err)
	again, retryErr := m.ApplyEvent(c, req)
	if !failReceipt {
		must(t, retryErr)
		if !again.IdempotencyHit || again.EventID != first.EventID {
			t.Fatal("native persisted receipt did not replay lost response")
		}
	}
	return r, first, count(t, b, "receipts"), retryErr
}

func TestG4NativeReceiptSemantics(t *testing.T) {
	r, out, n, retryErr := nativeOutcome(t, true)
	if r.State != "accepted" || r.Version != 2 || n != 0 || out.Execution == nil || out.Execution.Status != flow.ExecutionStateDegraded {
		t.Fatalf("unexpected native outcome: state=%+v response=%+v receipts=%d", r, out, n)
	}
	if flow.MapRuntimeError(retryErr).RuntimeCode != flow.ErrCodeInvalidTransition {
		t.Fatalf("missing receipt retry: want invalid transition, got %v", retryErr)
	}
	t.Logf("native state=%s version=%d receipts=%d degraded=%s retry=%v", r.State, r.Version, n, out.Execution.Status, retryErr)
	_, _, n, retryErr = nativeOutcome(t, false)
	must(t, retryErr)
	if n != 1 {
		t.Fatal("native lost-response replay inserted duplicate receipt")
	}
}

//go:build native_atomicity_probe

package transactiontest

import "testing"

// This optional probe preserves the audit's unmet native atomicity assertion.
// It is expected to FAIL; the bounded adapter does not change stock semantics.
func TestG4NativeReceiptFailureAtomicity(t *testing.T) {
	r, _, n, _ := nativeOutcome(t, true)
	if r.State != "draft" && n != 1 {
		t.Fatalf("state committed without receipt: state=%s version=%d receipts=%d", r.State, r.Version, n)
	}
}

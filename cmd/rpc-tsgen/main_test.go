package main

import (
	"bytes"
	"io/fs"
	"os"
	"path/filepath"
	"reflect"
	"strings"
	"testing"
)

func read(t *testing.T, path string) []byte {
	t.Helper()
	b, e := os.ReadFile(path)
	if e != nil {
		t.Fatal(e)
	}
	return b
}
func TestLegacyScaffoldBytes(t *testing.T) {
	for _, tc := range []struct {
		name   string
		args   []string
		golden string
	}{
		{"empty", nil, "legacy-empty.ts"},
		{"whitespace", []string{"-manifest", "  "}, "legacy-empty.ts"},
		{"metadata", []string{"-manifest", "testdata/legacy.json", "-export", "exampleRPCMeta"}, "legacy-metadata.ts"},
	} {
		t.Run(tc.name, func(t *testing.T) {
			out := filepath.Join(t.TempDir(), "nested", "out.ts")
			if e := run(append(tc.args, "-out", out)); e != nil {
				t.Fatal(e)
			}
			if !bytes.Equal(read(t, out), read(t, "testdata/"+tc.golden)) {
				t.Fatal("legacy output changed")
			}
		})
	}
	// Both legacy object spellings keep accepting endpoint arrays.
	raw := read(t, "testdata/legacy.json")
	for _, key := range []string{"endpoints", "Endpoints"} {
		dir := t.TempDir()
		input := filepath.Join(dir, "in.json")
		out := filepath.Join(dir, "out.ts")
		if e := os.WriteFile(input, append(append([]byte(`{"`+key+`":`), raw...), '}'), 0600); e != nil {
			t.Fatal(e)
		}
		if e := run([]string{"-manifest", input, "-out", out, "-export", "exampleRPCMeta"}); e != nil {
			t.Fatal(e)
		}
		if !bytes.Equal(read(t, out), read(t, "testdata/legacy-metadata.ts")) {
			t.Fatal("legacy object wrapper changed")
		}
	}
}
func TestFullModeAndReadOnlyChecks(t *testing.T) {
	for _, mode := range []string{"scaffold", "full"} {
		t.Run(mode, func(t *testing.T) {
			dir := t.TempDir()
			input := filepath.Join(dir, "in.json")
			out := filepath.Join(dir, "out.ts")
			fixture := "testdata/legacy.json"
			if mode == "full" {
				fixture = "../../examples/rpc/tsgen/full/manifest.json"
			}
			if e := os.WriteFile(input, read(t, fixture), 0600); e != nil {
				t.Fatal(e)
			}
			args := []string{"-mode", mode, "-manifest", input, "-out", out}
			if e := run(args); e != nil {
				t.Fatal(e)
			}
			first := read(t, out)
			if mode == "full" && !bytes.Equal(first, read(t, "../../examples/rpc/tsgen/full/contracts.ts")) {
				t.Fatal("published emitter golden changed")
			}
			if e := run(args); e != nil {
				t.Fatal(e)
			}
			if !bytes.Equal(first, read(t, out)) {
				t.Fatal("nondeterministic generation")
			}
			check := func(wantError bool) {
				t.Helper()
				type state struct {
					data  string
					mtime int64
				}
				before := map[string]state{}
				for _, p := range []string{input, out} {
					info, e := os.Stat(p)
					if e == nil {
						before[p] = state{string(read(t, p)), info.ModTime().UnixNano()}
					}
				}
				e := run(append(args, "--check"))
				if (e != nil) != wantError {
					t.Fatalf("check error: %v", e)
				}
				for p, s := range before {
					info, e := os.Stat(p)
					if e != nil || string(read(t, p)) != s.data || info.ModTime().UnixNano() != s.mtime {
						t.Fatal("check mutated", p)
					}
				}
			}
			check(false)
			if e := os.WriteFile(out, []byte("stale"), 0600); e != nil {
				t.Fatal(e)
			}
			check(true)
			if e := os.Remove(out); e != nil {
				t.Fatal(e)
			}
			check(true)
			if _, e := os.Stat(out); !os.IsNotExist(e) {
				t.Fatal("check created output")
			}
			missing := filepath.Join(dir, "absent", "out.ts")
			if e := run([]string{"-mode", mode, "-manifest", input, "-out", missing, "--check"}); e == nil {
				t.Fatal("missing output accepted")
			}
			if _, e := os.Stat(filepath.Dir(missing)); !os.IsNotExist(e) {
				t.Fatal("check created directory")
			}
			if e := os.WriteFile(input, []byte("{"), 0600); e != nil {
				t.Fatal(e)
			}
			if e := os.WriteFile(out, []byte("keep"), 0600); e != nil {
				t.Fatal(e)
			}
			check(true)
			if e := run(args); e == nil {
				t.Fatal("invalid input accepted")
			}
			if string(read(t, out)) != "keep" {
				t.Fatal("invalid input overwrote output")
			}
		})
	}
}
func TestFullModeDiagnosticsAndInputProtection(t *testing.T) {
	for _, args := range [][]string{{"-mode", "full"}, {"-mode", "other"}, {"-mode", "full", "-manifest", "testdata/legacy.json"}, {"-mode", "full", "-manifest", "../../examples/rpc/tsgen/full/manifest.json", "-export", "custom"}} {
		out := filepath.Join(t.TempDir(), "out.ts")
		if e := run(append(args, "-out", out)); e == nil {
			t.Fatalf("invalid flags/manifest accepted: %v", args)
		}
		if _, e := os.Stat(out); !os.IsNotExist(e) {
			t.Fatal("invalid flags wrote output")
		}
	}
	for _, mode := range []string{"scaffold", "full"} {
		dir := t.TempDir()
		input := filepath.Join(dir, "input.json")
		alias := filepath.Join(dir, "alias.json")
		if e := os.WriteFile(input, []byte(`[]`), 0600); e != nil {
			t.Fatal(e)
		}
		if e := os.Link(input, alias); e != nil {
			t.Fatal(e)
		}
		for _, out := range []string{input, alias} {
			e := run([]string{"-mode", mode, "-manifest", input, "-out", out})
			if e == nil || !strings.Contains(e.Error(), "distinct") {
				t.Fatal("input alias not protected", e)
			}
			if string(read(t, input)) != "[]" {
				t.Fatal("manifest overwritten")
			}
		}
	}
}

func TestPositionalArgumentsDoNotMutateFiles(t *testing.T) {
	type fileState struct {
		Contents string
		Mode     fs.FileMode
		ModTime  int64
	}
	snapshot := func(t *testing.T, dir string) map[string]fileState {
		t.Helper()
		state := map[string]fileState{}
		err := filepath.WalkDir(dir, func(path string, entry fs.DirEntry, err error) error {
			if err != nil {
				return err
			}
			info, err := entry.Info()
			if err != nil {
				return err
			}
			contents := ""
			if !entry.IsDir() {
				contents = string(read(t, path))
			}
			state[path] = fileState{contents, info.Mode(), info.ModTime().UnixNano()}
			return nil
		})
		if err != nil {
			t.Fatal(err)
		}
		return state
	}
	for _, mode := range []string{"scaffold", "full"} {
		for _, tail := range []struct {
			name string
			args []string
		}{
			{"before-check", []string{"unexpected", "--check"}},
			{"after-check", []string{"--check", "unexpected"}},
			{"without-check", []string{"unexpected"}},
			{"after-terminator", []string{"--", "unexpected", "--check"}},
		} {
			for _, output := range []string{"stale", "missing-file", "missing-directory"} {
				t.Run(mode+"/"+tail.name+"/"+output, func(t *testing.T) {
					dir := t.TempDir()
					input, out := filepath.Join(dir, "manifest.json"), filepath.Join(dir, "out.ts")
					fixture := "testdata/legacy.json"
					if mode == "full" {
						fixture = "../../examples/rpc/tsgen/full/manifest.json"
					}
					if err := os.WriteFile(input, read(t, fixture), 0600); err != nil {
						t.Fatal(err)
					}
					if output == "stale" {
						if err := os.WriteFile(out, []byte("stale output must survive"), 0600); err != nil {
							t.Fatal(err)
						}
					}
					if output == "missing-directory" {
						out = filepath.Join(dir, "absent", "nested", "out.ts")
					}
					before := snapshot(t, dir)
					args := append([]string{"-mode", mode, "-manifest", input, "-out", out}, tail.args...)
					err := run(args)
					if err == nil || !strings.Contains(err.Error(), "unexpected positional arguments") {
						t.Errorf("expected argument rejection, got %v", err)
					}
					if !reflect.DeepEqual(before, snapshot(t, dir)) {
						t.Error("invalid arguments mutated file bytes, mode, mtime or directory entries")
					}
				})
			}
		}
	}
}

func TestRejectPositionalArgumentsBeforeOpeningManifest(t *testing.T) {
	for _, mode := range []string{"scaffold", "full"} {
		err := run([]string{"-mode", mode, "-manifest", filepath.Join(t.TempDir(), "missing.json"), "unexpected", "--check"})
		if err == nil || !strings.Contains(err.Error(), "unexpected positional arguments") {
			t.Fatalf("%s: argument validation must precede manifest access, got %v", mode, err)
		}
	}
}

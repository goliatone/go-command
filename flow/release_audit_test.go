package flow

import (
	"go/ast"
	"go/parser"
	"go/token"
	"io/fs"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func TestPhase7Audit_NoGoFSMModuleOrPackageIntroduced(t *testing.T) {
	mod, err := os.ReadFile("../go.mod")
	if err != nil {
		t.Fatalf("read go.mod: %v", err)
	}
	moduleDecl := strings.ToLower(string(mod))
	if strings.Contains(moduleDecl, "module github.com/goliatone/go-fsm") {
		t.Fatalf("unexpected go-fsm module declaration")
	}

	found := make([]string, 0)
	err = filepath.WalkDir("..", func(path string, d fs.DirEntry, walkErr error) error {
		if walkErr != nil {
			return walkErr
		}
		if d == nil || !d.IsDir() {
			return nil
		}
		name := strings.ToLower(d.Name())
		if strings.HasPrefix(name, ".git") {
			return filepath.SkipDir
		}
		if strings.Contains(name, "go-fsm") {
			found = append(found, path)
		}
		return nil
	})
	if err != nil {
		t.Fatalf("walk repo: %v", err)
	}
	if len(found) > 0 {
		t.Fatalf("unexpected go-fsm directories: %v", found)
	}
}

func TestPhase7Audit_NoLegacyShimBridgeBeyondExecute(t *testing.T) {
	disallowed := map[string]struct{}{
		"Dispatch":      {},
		"DispatchEvent": {},
		"Transition":    {},
	}
	fset := token.NewFileSet()
	pkgs, err := parser.ParseDir(fset, ".", func(info fs.FileInfo) bool {
		if info == nil {
			return false
		}
		return !strings.HasSuffix(info.Name(), "_test.go")
	}, 0)
	if err != nil {
		t.Fatalf("parse flow package: %v", err)
	}

	pkg := pkgs["flow"]
	if pkg == nil {
		t.Fatalf("flow package not found")
	}

	legacy := make([]string, 0)
	for fileName, file := range pkg.Files {
		for _, decl := range file.Decls {
			fn, ok := decl.(*ast.FuncDecl)
			if !ok || fn.Recv == nil || fn.Name == nil {
				continue
			}
			if _, blocked := disallowed[fn.Name.Name]; !blocked {
				continue
			}
			if receiverIsStateMachine(fn.Recv) {
				legacy = append(legacy, fileName+":"+fn.Name.Name)
			}
		}
	}
	if len(legacy) > 0 {
		t.Fatalf("unexpected legacy shim bridges on StateMachine: %v", legacy)
	}
}

func receiverIsStateMachine(recv *ast.FieldList) bool {
	if recv == nil {
		return false
	}
	for _, field := range recv.List {
		if field == nil {
			continue
		}
		typ := field.Type
		if star, ok := typ.(*ast.StarExpr); ok {
			typ = star.X
		}
		switch node := typ.(type) {
		case *ast.Ident:
			if node.Name == "StateMachine" {
				return true
			}
		case *ast.IndexExpr:
			if ident, ok := node.X.(*ast.Ident); ok && ident.Name == "StateMachine" {
				return true
			}
		case *ast.IndexListExpr:
			if ident, ok := node.X.(*ast.Ident); ok && ident.Name == "StateMachine" {
				return true
			}
		}
	}
	return false
}

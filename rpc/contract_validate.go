package rpc

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"math/big"
	"strconv"
	"strings"
	"time"
)

// ValidateContractJSON checks a canonical serialized JSON value, with exact
// numeric bounds. It rejects duplicate keys and noncanonical struct-field aliases.
// This is not a typed Go decoder: use DecodeContractJSON for incoming DTOs and
// ValidateContractValue for typed output. Exporting alone changes no runtime.
func ValidateContractJSON(m *ContractManifest, schema WireSchema, data []byte) error {
	if m == nil || m.SchemaVersion != ContractSchemaVersion {
		return fmt.Errorf("contract: unsupported schema version")
	}
	d := json.NewDecoder(bytes.NewReader(data))
	d.UseNumber()
	v, err := readContractJSON(d, "$", 0)
	if err != nil {
		return err
	}
	if err := d.Decode(new(any)); err != io.EOF {
		return fmt.Errorf("contract: trailing JSON")
	}
	return validateWire(m, schema, v, "$", 0)
}
func validateWire(m *ContractManifest, s WireSchema, v any, path string, depth int) error {
	fail := func() error { return fmt.Errorf("%s: expected %s", path, s.Kind) }
	if depth > 256 {
		return fmt.Errorf("%s: contract nesting limit", path)
	}
	if v == nil && s.Nullable {
		return nil
	}
	if s.Kind == "ref" {
		n, ok := m.Definitions[s.Ref]
		if !ok {
			return fmt.Errorf("%s: unresolved reference %q", path, s.Ref)
		}
		return validateWire(m, n, v, path, depth+1)
	}
	if s.Kind == "json" {
		return nil
	}
	if s.Kind == "union" {
		for _, n := range s.Variants {
			if validateWire(m, n, v, path, depth+1) == nil {
				return nil
			}
		}
		return fail()
	}
	switch s.Kind {
	case "null":
		if v != nil {
			return fail()
		}
	case "boolean":
		if _, ok := v.(bool); !ok {
			return fail()
		}
	case "string", "enum":
		x, ok := v.(string)
		if !ok {
			return fail()
		}
		if s.Kind == "enum" {
			for _, a := range s.Values {
				if x == a {
					return nil
				}
			}
			return fail()
		}
		switch s.Encoding {
		case "base64":
			if _, err := base64.StdEncoding.DecodeString(x); err != nil {
				return fail()
			}
		case "date-time":
			if _, err := time.Parse(time.RFC3339Nano, x); err != nil {
				return fail()
			}
		case "json-string":
			if !json.Valid([]byte(x)) {
				return fail()
			}
		}
	case "integer", "number":
		x, ok := v.(json.Number)
		if !ok {
			return fail()
		}
		// Bound arithmetic work before exact comparison; Go float serialization
		// never needs enormous exponent or coefficient strings.
		if len(x) > 1024 {
			return fail()
		}
		if i := strings.IndexAny(string(x), "eE"); i >= 0 {
			exponent, err := strconv.Atoi(string(x)[i+1:])
			if err != nil || exponent < -1024 || exponent > 1024 {
				return fail()
			}
		}
		if _, err := strconv.ParseFloat(string(x), 64); err != nil {
			return fail()
		}
		r, ok := new(big.Rat).SetString(string(x))
		if !ok {
			return fail()
		}
		if s.Kind == "integer" {
			if !r.IsInt() {
				return fail()
			}
			if s.Minimum == nil || s.Maximum == nil {
				return fmt.Errorf("%s: integer missing bounds", path)
			}
			if r.Cmp(new(big.Rat).SetInt64(*s.Minimum)) < 0 || r.Cmp(new(big.Rat).SetInt64(*s.Maximum)) > 0 {
				return fmt.Errorf("%s: integer outside [%d,%d]", path, *s.Minimum, *s.Maximum)
			}
		}
	case "object":
		x, ok := v.(map[string]any)
		if !ok {
			return fail()
		}
		for _, key := range sortedKeys(x) {
			if _, exact := s.Properties[key]; exact {
				continue
			}
			for _, canonical := range sortedKeys(s.Properties) {
				if strings.EqualFold(key, canonical) {
					return fmt.Errorf("%s.%s: noncanonical property; use %q or DecodeContractJSON", path, key, canonical)
				}
			}
		}
		for _, k := range sortedKeys(s.Properties) {
			p := s.Properties[k]
			value, exists := x[k]
			if !exists {
				if p.Required {
					return fmt.Errorf("%s.%s: missing property", path, k)
				}
				continue
			}
			if err := validateWire(m, p.Schema, value, path+"."+k, depth+1); err != nil {
				return err
			}
		}
	case "array":
		x, ok := v.([]any)
		if !ok || s.Element == nil {
			return fail()
		}
		if s.Length != nil && len(x) != *s.Length {
			return fail()
		}
		for i, value := range x {
			if err := validateWire(m, *s.Element, value, fmt.Sprintf("%s[%d]", path, i), depth+1); err != nil {
				return err
			}
		}
	case "map":
		x, ok := v.(map[string]any)
		if !ok || s.Element == nil {
			return fail()
		}
		for _, k := range sortedKeys(x) {
			if err := validateWire(m, *s.Element, x[k], path+"."+k, depth+1); err != nil {
				return err
			}
		}
	default:
		return fmt.Errorf("%s: unsupported schema kind %q", path, s.Kind)
	}
	return nil
}

// validateSchema rejects malformed overrides before the offline handoff.
func validateSchema(m *ContractManifest, s WireSchema, path string) error {
	return validateSchemaNode(m, s, path, 0)
}
func validateSchemaNode(m *ContractManifest, s WireSchema, path string, depth int) error {
	bad := func() error { return fmt.Errorf("%s: malformed or unsupported %q schema", path, s.Kind) }
	if depth > 128 {
		return fmt.Errorf("%s: schema nesting limit", path)
	}
	allowed := map[string]bool{"kind": true, "nullable": true}
	switch s.Kind {
	case "ref":
		allowed["ref"] = true
		if s.Ref == "" {
			return bad()
		}
		if _, ok := m.Definitions[s.Ref]; !ok {
			return fmt.Errorf("%s.ref: unresolved %q", path, s.Ref)
		}
	case "object":
		allowed["properties"] = true
		for _, k := range sortedKeys(s.Properties) {
			if err := validateSchemaNode(m, s.Properties[k].Schema, path+"."+k, depth+1); err != nil {
				return err
			}
		}
	case "array", "map":
		allowed["element"] = true
		if s.Element == nil {
			return bad()
		}
		if s.Kind == "array" {
			allowed["length"] = true
		}
		if s.Length != nil && (*s.Length < 0 || *s.Length > 10000) {
			return bad()
		}
		if err := validateSchemaNode(m, *s.Element, path+"[]", depth+1); err != nil {
			return err
		}
	case "union":
		allowed["variants"] = true
		if len(s.Variants) < 2 {
			return bad()
		}
		for i, n := range s.Variants {
			if err := validateSchemaNode(m, n, fmt.Sprintf("%s.variant[%d]", path, i), depth+1); err != nil {
				return err
			}
		}
	case "enum":
		allowed["values"] = true
		if len(s.Values) == 0 {
			return bad()
		}
		seen := map[string]bool{}
		for _, v := range s.Values {
			if seen[v] {
				return bad()
			}
			seen[v] = true
		}
	case "integer":
		allowed["minimum"] = true
		allowed["maximum"] = true
		if s.Minimum == nil || s.Maximum == nil || *s.Minimum < -9007199254740991 || *s.Maximum > 9007199254740991 || *s.Minimum > *s.Maximum {
			return bad()
		}
	case "string":
		allowed["encoding"] = true
		switch s.Encoding {
		case "", "base64", "date-time", "json-string":
		default:
			return bad()
		}
	case "boolean", "number", "null", "json":
	default:
		return bad()
	}
	b, _ := json.Marshal(s)
	var fields map[string]json.RawMessage
	_ = json.Unmarshal(b, &fields)
	for _, k := range sortedKeys(fields) {
		if !allowed[k] {
			return fmt.Errorf("%s.%s: invalid for %s", path, k, s.Kind)
		}
	}
	return nil
}

// readContractJSON preserves exact numbers and rejects duplicates before an
// object can be collapsed into a map. Typed decoding uses encoding/json directly.
func readContractJSON(d *json.Decoder, path string, depth int) (any, error) {
	if depth > 256 {
		return nil, fmt.Errorf("%s: contract nesting limit", path)
	}
	token, err := d.Token()
	if err != nil {
		return nil, err
	}
	delimiter, container := token.(json.Delim)
	if !container {
		return token, nil
	}
	switch delimiter {
	case '{':
		object := map[string]any{}
		for d.More() {
			token, err := d.Token()
			if err != nil {
				return nil, err
			}
			key, ok := token.(string)
			if !ok {
				return nil, fmt.Errorf("%s: invalid object key", path)
			}
			if _, exists := object[key]; exists {
				return nil, fmt.Errorf("%s.%s: duplicate property", path, key)
			}
			value, err := readContractJSON(d, path+"."+key, depth+1)
			if err != nil {
				return nil, err
			}
			object[key] = value
		}
		_, err = d.Token()
		return object, err
	case '[':
		array := []any{}
		for d.More() {
			value, err := readContractJSON(d, fmt.Sprintf("%s[%d]", path, len(array)), depth+1)
			if err != nil {
				return nil, err
			}
			array = append(array, value)
		}
		_, err = d.Token()
		return array, err
	default:
		return nil, fmt.Errorf("%s: unexpected JSON delimiter", path)
	}
}

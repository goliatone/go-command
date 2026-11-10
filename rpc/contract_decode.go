package rpc

import (
	"encoding/json"
	"fmt"
	"reflect"
	"strconv"
)

// DecodeContractJSON decodes original input into a fresh public DTO using Go's
// ordinary encoding/json semantics, then validates the resulting value. Unknown
// fields remain ignored; aliases and duplicate objects follow the typed decoder.
// Decode or validation failure returns the zero T, never a partially valid DTO.
// Callers must pair T with the schema exported from that public type.
func DecodeContractJSON[T any](m *ContractManifest, schema WireSchema, data []byte) (T, error) {
	var value, zero T
	if m == nil || m.SchemaVersion != ContractSchemaVersion {
		return zero, fmt.Errorf("contract: unsupported schema version")
	}
	if err := json.Unmarshal(data, &value); err != nil {
		return zero, fmt.Errorf("contract decode: %w", err)
	}
	if err := ValidateContractValue(m, schema, value); err != nil {
		return zero, err
	}
	return value, nil
}

// ValidateContractValue checks a declared public DTO before execution or egress.
// It validates both its actual JSON representation and numeric values that tags
// such as omitempty/omitzero could hide. Custom wire encoders are checked through
// their declared serialized representation; their internal state is not a DTO.
func ValidateContractValue(m *ContractManifest, schema WireSchema, value any) error {
	if m == nil || m.SchemaVersion != ContractSchemaVersion {
		return fmt.Errorf("contract: unsupported schema version")
	}
	data, err := json.Marshal(value)
	if err != nil {
		return fmt.Errorf("contract encode: %w", err)
	}
	if err := ValidateContractJSON(m, schema, data); err != nil {
		return err
	}
	return validateTypedNumbers(m, schema, reflect.ValueOf(value), "$", 0)
}

func validateTypedNumbers(m *ContractManifest, s WireSchema, v reflect.Value, path string, depth int) error {
	if depth > 256 {
		return fmt.Errorf("%s: contract nesting limit", path)
	}
	if !v.IsValid() {
		return nil
	}
	if s.Kind == "ref" {
		n, ok := m.Definitions[s.Ref]
		if !ok {
			return fmt.Errorf("%s: unresolved reference %q", path, s.Ref)
		}
		return validateTypedNumbers(m, n, v, path, depth+1)
	}
	for v.Kind() == reflect.Interface || v.Kind() == reflect.Pointer {
		if v.IsNil() {
			return nil
		}
		v = v.Elem()
	}
	// Explicit wire overrides and built-in time values are validated by marshaling.
	if customWire(v.Type()) {
		return nil
	}
	switch s.Kind {
	case "integer":
		var number string
		switch v.Kind() {
		case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
			number = strconv.FormatInt(v.Int(), 10)
		case reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64, reflect.Uintptr:
			number = strconv.FormatUint(v.Uint(), 10)
		default:
			return nil
		}
		return validateWire(m, s, json.Number(number), path, depth+1)
	case "object":
		if v.Kind() != reflect.Struct {
			return nil
		}
		for _, f := range jsonFields(v.Type()) {
			property, ok := s.Properties[f.name]
			if !ok {
				continue
			}
			field, err := v.FieldByIndexErr(f.field.Index)
			if err != nil {
				continue
			} // nil embedded pointer: no public value
			if err := validateTypedNumbers(m, property.Schema, field, path+"."+f.name, depth+1); err != nil {
				return err
			}
		}
	case "array":
		if s.Element == nil || (v.Kind() != reflect.Array && v.Kind() != reflect.Slice) {
			return nil
		}
		for i := 0; i < v.Len(); i++ {
			if err := validateTypedNumbers(m, *s.Element, v.Index(i), fmt.Sprintf("%s[%d]", path, i), depth+1); err != nil {
				return err
			}
		}
	case "map":
		if s.Element == nil || v.Kind() != reflect.Map {
			return nil
		}
		iter := v.MapRange()
		for iter.Next() {
			if err := validateTypedNumbers(m, *s.Element, iter.Value(), path+"{}", depth+1); err != nil {
				return err
			}
		}
	}
	return nil
}

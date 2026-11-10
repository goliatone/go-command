package rpc

import (
	"bytes"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"reflect"
	"sort"
	"strings"
	"time"
	"unicode"

	command "github.com/goliatone/go-command"
)

// ContractSchemaVersion identifies the wire format, independently of package releases.
const ContractSchemaVersion = "rpc-contract/v1"
const MaxSafeInteger int64 = 9007199254740991

// WireSchema describes JSON, not Go validation requirements. Required properties
// describe serialization presence; Nullable independently permits JSON null.
type WireSchema struct {
	Kind       string                  `json:"kind"`
	Ref        string                  `json:"ref,omitempty"`
	Nullable   bool                    `json:"nullable,omitempty"`
	Properties map[string]WireProperty `json:"properties,omitempty"`
	Element    *WireSchema             `json:"element,omitempty"`
	Values     []string                `json:"values,omitempty"`
	Variants   []WireSchema            `json:"variants,omitempty"`
	Encoding   string                  `json:"encoding,omitempty"`
	Minimum    *int64                  `json:"minimum,omitempty"`
	Maximum    *int64                  `json:"maximum,omitempty"`
	Length     *int                    `json:"length,omitempty"`
}
type WireProperty struct {
	Schema   WireSchema `json:"schema"`
	Required bool       `json:"required"`
}
type EndpointContract struct {
	Request  WireSchema `json:"request"`
	Response WireSchema `json:"response"`
}
type NamedCommandContract struct {
	Input       WireSchema  `json:"input"`
	Result      *WireSchema `json:"result,omitempty"`
	ResultMode  string      `json:"resultMode"`
	Summary     string      `json:"summary,omitempty"`
	Description string      `json:"description,omitempty"`
}
type ContractManifest struct {
	SchemaVersion string                          `json:"schemaVersion"`
	Definitions   map[string]WireSchema           `json:"definitions"`
	Endpoints     map[string]EndpointContract     `json:"endpoints"`
	Commands      map[string]NamedCommandContract `json:"commands"`
	Canonical     map[string]WireSchema           `json:"canonical"`
	Fingerprint   string                          `json:"fingerprint,omitempty"`
}

// CommandContract is an optional public declaration. It does not register a
// handler, change RPCCommand, or use ExposeInAdmin as an export/permission gate.
type CommandContract struct {
	ID          string
	Input       reflect.Type
	Result      reflect.Type // nil means receipt-only; inline execution need not return a result.
	Summary     string
	Description string
}
type CommandContractProvider interface{ RPCCommandContract() CommandContract }

func CommandContractFor[Input, Result any](id string) CommandContract {
	return CommandContract{ID: id, Input: reflect.TypeFor[Input](), Result: reflect.TypeFor[Result]()}
}

// DescribeCommandContract uses explicit declaration metadata first, then
// RPCOptions, then RPCDescription. Conflicting identities are errors. Methods
// that construct handlers are never called.
func DescribeCommandContract(p CommandContractProvider) (CommandContract, error) {
	c := p.RPCCommandContract()
	if v, ok := p.(interface{ RPCOptions() command.RPCConfig }); ok {
		o := v.RPCOptions()
		if c.ID != "" && o.Method != "" && c.ID != o.Method {
			return c, fmt.Errorf("command %q: RPCOptions method %q conflicts", c.ID, o.Method)
		}
		if c.ID == "" {
			c.ID = o.Method
		}
		if c.Summary == "" {
			c.Summary = o.Summary
		}
		if c.Description == "" {
			c.Description = o.Description
		}
	}
	if v, ok := p.(command.RPCDescriber); ok {
		d := v.RPCDescription()
		if c.Summary == "" {
			c.Summary = d.Summary
		}
		if c.Description == "" {
			c.Description = d.Description
		}
	}
	if err := validateCommandContractID(c.ID); err != nil {
		return c, err
	}
	return c, nil
}

type IntegerBounds struct{ Minimum, Maximum int64 }

// ExportOptions is explicit selection and wire policy. Bounds are an enforceable
// contract: adapters decode input with DecodeContractJSON and validate typed
// output with ValidateContractValue before serialization. Unbounded wide numeric integers fail export. Overrides
// apply only to custom marshalers/interfaces, never to ordinary numeric fields.
type ExportOptions struct {
	Endpoints []EndpointDefinition
	Commands  []CommandContract
	Bounds    map[reflect.Type]IntegerBounds
	Enums     map[reflect.Type][]string
	Overrides map[reflect.Type]WireSchema
}
type contractExporter struct {
	opts     ExportOptions
	manifest ContractManifest
	types    map[string]reflect.Type
}

// ExportContracts is offline: no handler invocation, discovery or service startup.
func ExportContracts(opts ExportOptions) (*ContractManifest, error) {
	e := contractExporter{opts: opts, types: map[string]reflect.Type{}, manifest: ContractManifest{SchemaVersion: ContractSchemaVersion, Definitions: map[string]WireSchema{}, Endpoints: map[string]EndpointContract{}, Commands: map[string]NamedCommandContract{}, Canonical: map[string]WireSchema{}}}
	canonical := map[string]reflect.Type{
		"RequestMeta": reflect.TypeFor[RequestMeta](), "Error": reflect.TypeFor[Error](),
		"DispatchOptions": reflect.TypeFor[command.DispatchOptions](), "DispatchReceipt": reflect.TypeFor[command.DispatchReceipt](),
		"CommandDispatchRequest": reflect.TypeFor[command.CommandDispatchRequest](), "CommandDispatchResponse": reflect.TypeFor[command.CommandDispatchResponse](),
	}
	for _, name := range sortedKeys(canonical) {
		n, err := e.schema(canonical[name], "canonical."+name)
		if err != nil {
			return nil, err
		}
		e.manifest.Canonical[name] = n
	}
	for _, ep := range opts.Endpoints {
		if ep == nil {
			return nil, fmt.Errorf("endpoints: nil declaration")
		}
		id := ep.Spec().Method
		if strings.TrimSpace(id) == "" {
			return nil, fmt.Errorf("endpoints: empty method")
		}
		if _, ok := e.manifest.Endpoints[id]; ok {
			return nil, fmt.Errorf("endpoints.%s: duplicate method", id)
		}
		req := ep.RequestType()
		if req != nil && req.Kind() == reflect.Pointer {
			req = req.Elem()
		}
		a, err := e.schema(req, "endpoints."+id+".request")
		if err != nil {
			return nil, err
		}
		b, err := e.schema(ep.ResponseType(), "endpoints."+id+".response")
		if err != nil {
			return nil, err
		}
		e.manifest.Endpoints[id] = EndpointContract{a, b}
	}
	for _, c := range opts.Commands {
		if err := validateCommandContractID(c.ID); err != nil {
			return nil, err
		}
		if _, ok := e.manifest.Commands[c.ID]; ok {
			return nil, fmt.Errorf("commands.%s: duplicate ID", c.ID)
		}
		a, err := e.schema(c.Input, "commands."+c.ID+".input")
		if err != nil {
			return nil, err
		}
		n := NamedCommandContract{Input: a, ResultMode: "receipt", Summary: c.Summary, Description: c.Description}
		if c.Result != nil {
			b, err := e.schema(c.Result, "commands."+c.ID+".result")
			if err != nil {
				return nil, err
			}
			n.Result = &b
			n.ResultMode = "optional"
		}
		e.manifest.Commands[c.ID] = n
	}
	for _, id := range sortedKeys(e.manifest.Definitions) {
		if err := validateSchema(&e.manifest, e.manifest.Definitions[id], "definitions."+id); err != nil {
			return nil, err
		}
	}
	for _, id := range sortedKeys(e.manifest.Canonical) {
		if err := validateSchema(&e.manifest, e.manifest.Canonical[id], "canonical."+id); err != nil {
			return nil, err
		}
	}
	for _, id := range sortedKeys(e.manifest.Commands) {
		c := e.manifest.Commands[id]
		if err := validateSchema(&e.manifest, c.Input, "commands."+id+".input"); err != nil {
			return nil, err
		}
		if c.Result != nil {
			if err := validateSchema(&e.manifest, *c.Result, "commands."+id+".result"); err != nil {
				return nil, err
			}
		}
	}
	for _, id := range sortedKeys(e.manifest.Endpoints) {
		c := e.manifest.Endpoints[id]
		if err := validateSchema(&e.manifest, c.Request, "endpoints."+id+".request"); err != nil {
			return nil, err
		}
		if err := validateSchema(&e.manifest, c.Response, "endpoints."+id+".response"); err != nil {
			return nil, err
		}
	}
	// SHA-256 of encoding/json's compact sorted-key encoding, with fingerprint absent.
	b, err := json.Marshal(e.manifest)
	if err != nil {
		return nil, err
	}
	var canonicalJSON any
	decoder := json.NewDecoder(bytes.NewReader(b))
	decoder.UseNumber()
	if err = decoder.Decode(&canonicalJSON); err != nil {
		return nil, err
	}
	b, err = json.Marshal(canonicalJSON)
	if err != nil {
		return nil, err
	}
	sum := sha256.Sum256(b)
	e.manifest.Fingerprint = "sha256:" + hex.EncodeToString(sum[:])
	return &e.manifest, nil
}
func sortedKeys[V any](m map[string]V) []string {
	keys := make([]string, 0, len(m))
	for k := range m {
		keys = append(keys, k)
	}
	sort.Strings(keys)
	return keys
}

var marshalerType = reflect.TypeFor[json.Marshaler]()
var textMarshalerType = reflect.TypeOf((*interface{ MarshalText() ([]byte, error) })(nil)).Elem()

func customWire(t reflect.Type) bool {
	return t.Implements(marshalerType) || reflect.PointerTo(t).Implements(marshalerType) || t.Implements(textMarshalerType) || reflect.PointerTo(t).Implements(textMarshalerType)
}
func (e *contractExporter) schema(t reflect.Type, path string) (WireSchema, error) {
	fail := func(msg string) (WireSchema, error) { return WireSchema{}, fmt.Errorf("%s: %s (%v)", path, msg, t) }
	if t == nil {
		return fail("missing type")
	}
	if t.Kind() == reflect.Pointer {
		n, err := e.schema(t.Elem(), path)
		n.Nullable = true
		return n, err
	}
	if t == reflect.TypeFor[json.Number]() {
		return fail("unquoted json.Number has no numeric wire policy; use Go json ,string or a public string DTO")
	}
	if t == reflect.TypeFor[time.Time]() {
		return WireSchema{Kind: "string", Encoding: "date-time"}, nil
	}
	if customWire(t) || t.Kind() == reflect.Interface {
		if n, ok := e.opts.Overrides[t]; ok {
			if n.Kind == "" {
				return fail("empty wire override")
			}
			return n, nil
		}
		return fail("custom marshaler/interface requires explicit wire override")
	}
	if n, ok := e.opts.Overrides[t]; ok && n.Kind != "" {
		return fail("wire override requires custom marshaler/interface; cannot change numeric JSON")
	}
	if t.Name() != "" && t.PkgPath() != "" {
		id := t.PkgPath() + "." + t.Name()
		if old, ok := e.types[id]; ok {
			if old != t {
				return fail("definition identity collision: " + id)
			}
			return WireSchema{Kind: "ref", Ref: id}, nil
		}
		e.types[id] = t
		n, err := e.shape(t, path)
		if err != nil {
			return n, err
		}
		e.manifest.Definitions[id] = n
		return WireSchema{Kind: "ref", Ref: id}, nil
	}
	return e.shape(t, path)
}
func (e *contractExporter) shape(t reflect.Type, path string) (WireSchema, error) {
	n := WireSchema{}
	switch t.Kind() {
	case reflect.Bool:
		n.Kind = "boolean"
	case reflect.String:
		n.Kind = "string"
	case reflect.Float32, reflect.Float64:
		n.Kind = "number"
	case reflect.Int8, reflect.Int16, reflect.Int32, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Int, reflect.Int64, reflect.Uint, reflect.Uint64, reflect.Uintptr:
		n.Kind = "integer"
		bits := t.Bits()
		unsigned := t.Kind() >= reflect.Uint && t.Kind() <= reflect.Uintptr
		lo, hi := -MaxSafeInteger, MaxSafeInteger
		if unsigned {
			lo = 0
		}
		if bits <= 32 {
			if unsigned {
				hi = (1 << bits) - 1
			} else {
				lo = -(1 << (bits - 1))
				hi = (1 << (bits - 1)) - 1
			}
		}
		b, ok := e.opts.Bounds[t]
		if bits > 32 && !ok {
			return n, fmt.Errorf("%s: %v requires explicit safe integer bounds or Go json ,string", path, t)
		}
		if ok {
			if b.Minimum < lo || b.Maximum > hi || b.Minimum > b.Maximum {
				return n, fmt.Errorf("%s: invalid safe integer bounds", path)
			}
			lo, hi = b.Minimum, b.Maximum
		}
		n.Minimum = &lo
		n.Maximum = &hi
	case reflect.Slice, reflect.Array:
		if t.Kind() == reflect.Slice && t.Elem().Kind() == reflect.Uint8 && !customWire(t.Elem()) {
			return WireSchema{Kind: "string", Encoding: "base64", Nullable: true}, nil
		}
		elem, err := e.schema(t.Elem(), path+"[]")
		if err != nil {
			return n, err
		}
		n.Kind = "array"
		n.Element = &elem
		n.Nullable = t.Kind() == reflect.Slice
		if t.Kind() == reflect.Array {
			size := t.Len()
			n.Length = &size
		}
	case reflect.Map:
		k := t.Key()
		if customWire(k) {
			return n, fmt.Errorf("%s: custom map key encoding unsupported", path)
		}
		switch k.Kind() {
		case reflect.String, reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64, reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64, reflect.Uintptr:
		default:
			return n, fmt.Errorf("%s: unsupported map key %v", path, k)
		}
		elem, err := e.schema(t.Elem(), path+"{}")
		if err != nil {
			return n, err
		}
		n.Kind = "map"
		n.Element = &elem
		n.Nullable = true
	case reflect.Struct:
		n.Kind = "object"
		n.Properties = map[string]WireProperty{}
		for _, f := range jsonFields(t) {
			var s WireSchema
			var err error
			ft := f.field.Type
			base := ft
			if base.Kind() == reflect.Pointer {
				base = base.Elem()
			}
			if f.quoted && !customWire(base) && (base.Kind() == reflect.String || base.Kind() == reflect.Bool || base.Kind() >= reflect.Int && base.Kind() <= reflect.Float64) {
				s = WireSchema{Kind: "string", Encoding: "json-string", Nullable: ft.Kind() == reflect.Pointer}
			} else {
				s, err = e.schema(ft, path+"."+f.name)
			}
			if err != nil {
				return n, err
			}
			n.Properties[f.name] = WireProperty{Schema: s, Required: !f.omit && !f.parentOptional}
		}
	default:
		return n, fmt.Errorf("%s: unsupported wire type %v", path, t)
	}
	if values, ok := e.opts.Enums[t]; ok {
		if n.Kind != "string" || len(values) == 0 {
			return n, fmt.Errorf("%s: enums require nonempty string values", path)
		}
		n.Kind = "enum"
		n.Values = append([]string(nil), values...)
		sort.Strings(n.Values)
		for i := 1; i < len(n.Values); i++ {
			if n.Values[i] == n.Values[i-1] {
				return n, fmt.Errorf("%s: duplicate enum value", path)
			}
		}
	}
	return n, nil
}

type wireField struct {
	field                                reflect.StructField
	name                                 string
	depth                                int
	tagged, omit, quoted, parentOptional bool
}

// Resolve embedded fields by shallowest depth, then uniquely tagged dominance,
// matching encoding/json. Nil embedded pointers make promoted fields optional.
func jsonFields(t reflect.Type) []wireField {
	all := map[string][]wireField{}
	var walk func(reflect.Type, int, bool, map[reflect.Type]bool, []int)
	walk = func(t reflect.Type, depth int, optional bool, seen map[reflect.Type]bool, prefix []int) {
		if seen[t] {
			return
		}
		next := map[reflect.Type]bool{}
		for k, v := range seen {
			next[k] = v
		}
		next[t] = true
		for i := 0; i < t.NumField(); i++ {
			f := t.Field(i)
			f.Index = append(append([]int(nil), prefix...), i)
			base := f.Type
			if base.Kind() == reflect.Pointer {
				base = base.Elem()
			}
			if f.PkgPath != "" && (!f.Anonymous || base.Kind() != reflect.Struct) {
				continue
			}
			rawTag := f.Tag.Get("json")
			if rawTag == "-" {
				continue
			}
			tag := strings.Split(rawTag, ",")
			name := tag[0]
			if !validJSONName(name) {
				name = ""
			}
			tagged := name != ""
			if f.Anonymous && name == "" && base.Kind() == reflect.Struct {
				walk(base, depth+1, optional || f.Type.Kind() == reflect.Pointer, next, f.Index)
				continue
			}
			if name == "" {
				name = f.Name
			}
			w := wireField{field: f, name: name, depth: depth, tagged: tagged, parentOptional: optional}
			for _, opt := range tag[1:] {
				if opt == "omitempty" {
					w.omit = true
				}
				if opt == "omitzero" {
					w.omit = true
				}
				if opt == "string" {
					w.quoted = true
				}
			}
			all[name] = append(all[name], w)
		}
	}
	walk(t, 0, false, map[reflect.Type]bool{}, nil)
	out := []wireField{}
	for _, name := range sortedKeys(all) {
		fs := all[name]
		sort.SliceStable(fs, func(i, j int) bool {
			if fs[i].depth != fs[j].depth {
				return fs[i].depth < fs[j].depth
			}
			return fs[i].tagged && !fs[j].tagged
		})
		if len(fs) > 1 && fs[0].depth == fs[1].depth && fs[0].tagged == fs[1].tagged {
			continue
		}
		out = append(out, fs[0])
	}
	return out
}
func validJSONName(s string) bool {
	if s == "" {
		return false
	}
	for _, r := range s {
		if !unicode.IsLetter(r) && !unicode.IsDigit(r) && !strings.ContainsRune("!#$%&()*+-./:;<=>?@[]^_{|}~ ", r) {
			return false
		}
	}
	return true
}

// Dispatch resolves surrounding Unicode whitespace before looking up a command.
// Reject noncanonical declarations rather than silently changing their identity.
func validateCommandContractID(id string) error {
	if strings.TrimSpace(id) == "" {
		return fmt.Errorf("commands: empty ID")
	}
	if strings.TrimSpace(id) != id {
		return fmt.Errorf("commands.%q: noncanonical ID; surrounding whitespace is not allowed", id)
	}
	return nil
}

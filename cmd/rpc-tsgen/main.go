package main

import (
	"bytes"
	"encoding/json"
	"flag"
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strings"
)

type endpointTypeRef struct {
	GoType  string `json:"goType"`
	PkgPath string `json:"pkgPath,omitempty"`
	Name    string `json:"name,omitempty"`
	Kind    string `json:"kind,omitempty"`
	Pointer bool   `json:"pointer,omitempty"`
}

type endpointMeta struct {
	Method       string           `json:"method"`
	MessageType  string           `json:"messageType,omitempty"`
	HandlerKind  string           `json:"handlerKind,omitempty"`
	RequestType  *endpointTypeRef `json:"requestType,omitempty"`
	ResponseType *endpointTypeRef `json:"responseType,omitempty"`
	Summary      string           `json:"summary,omitempty"`
	Description  string           `json:"description,omitempty"`
	Tags         []string         `json:"tags,omitempty"`
	Deprecated   bool             `json:"deprecated,omitempty"`
	Since        string           `json:"since,omitempty"`
}

func main() {
	var (
		manifestPath string
		outPath      string
		exportName   string
	)
	flag.StringVar(&manifestPath, "manifest", "", "path to RPC endpoint manifest JSON (optional scaffold input)")
	flag.StringVar(&outPath, "out", "client/src/gen/rpc-contract.ts", "output TypeScript file path")
	flag.StringVar(&exportName, "export", "rpcEndpointMeta", "export const name for endpoint metadata array")
	flag.Parse()

	endpoints, err := loadEndpoints(manifestPath)
	if err != nil {
		die(err)
	}

	sort.Slice(endpoints, func(i, j int) bool {
		return endpoints[i].Method < endpoints[j].Method
	})

	content, err := renderTypeScript(endpoints, exportName)
	if err != nil {
		die(err)
	}

	if err := os.MkdirAll(filepath.Dir(outPath), 0o755); err != nil {
		die(fmt.Errorf("create output directory: %w", err))
	}
	if err := os.WriteFile(outPath, content, 0o644); err != nil {
		die(fmt.Errorf("write output file: %w", err))
	}
}

func loadEndpoints(path string) ([]endpointMeta, error) {
	if strings.TrimSpace(path) == "" {
		return nil, nil
	}

	raw, err := os.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("read manifest: %w", err)
	}

	var payload any
	if err := json.Unmarshal(raw, &payload); err != nil {
		return nil, fmt.Errorf("decode manifest: %w", err)
	}

	array, ok := payload.([]any)
	if !ok {
		obj, isObj := payload.(map[string]any)
		if !isObj {
			return nil, fmt.Errorf("manifest must be JSON array or object with endpoints")
		}
		for _, key := range []string{"endpoints", "Endpoints"} {
			if val, found := obj[key]; found {
				if arr, ok := val.([]any); ok {
					array = arr
					break
				}
			}
		}
		if array == nil {
			return nil, fmt.Errorf("manifest object must contain endpoints array")
		}
	}

	result := make([]endpointMeta, 0, len(array))
	for _, item := range array {
		rec, ok := item.(map[string]any)
		if !ok {
			continue
		}
		ep := endpointMeta{
			Method:      pickString(rec, "method", "Method"),
			MessageType: pickString(rec, "messageType", "MessageType"),
			HandlerKind: pickString(rec, "handlerKind", "HandlerKind"),
			Summary:     pickString(rec, "summary", "Summary"),
			Description: pickString(rec, "description", "Description"),
			Since:       pickString(rec, "since", "Since"),
			Deprecated:  pickBool(rec, "deprecated", "Deprecated"),
			Tags:        pickStringSlice(rec, "tags", "Tags"),
		}
		ep.RequestType = pickTypeRef(rec, "requestType", "RequestType")
		ep.ResponseType = pickTypeRef(rec, "responseType", "ResponseType")
		if ep.Method == "" {
			continue
		}
		result = append(result, ep)
	}

	return result, nil
}

func pickString(rec map[string]any, keys ...string) string {
	for _, key := range keys {
		if value, ok := rec[key]; ok {
			if out, ok := value.(string); ok {
				return out
			}
		}
	}
	return ""
}

func pickBool(rec map[string]any, keys ...string) bool {
	for _, key := range keys {
		if value, ok := rec[key]; ok {
			if out, ok := value.(bool); ok {
				return out
			}
		}
	}
	return false
}

func pickStringSlice(rec map[string]any, keys ...string) []string {
	for _, key := range keys {
		if value, ok := rec[key]; ok {
			list, ok := value.([]any)
			if !ok {
				continue
			}
			out := make([]string, 0, len(list))
			for _, item := range list {
				if str, ok := item.(string); ok {
					out = append(out, str)
				}
			}
			return out
		}
	}
	return nil
}

func pickTypeRef(rec map[string]any, keys ...string) *endpointTypeRef {
	for _, key := range keys {
		value, ok := rec[key]
		if !ok {
			continue
		}
		obj, ok := value.(map[string]any)
		if !ok {
			continue
		}
		ref := &endpointTypeRef{
			GoType:  pickString(obj, "goType", "GoType"),
			PkgPath: pickString(obj, "pkgPath", "PkgPath"),
			Name:    pickString(obj, "name", "Name"),
			Kind:    pickString(obj, "kind", "Kind"),
			Pointer: pickBool(obj, "pointer", "Pointer"),
		}
		if ref.GoType == "" && ref.Name == "" {
			return nil
		}
		return ref
	}
	return nil
}

func renderTypeScript(endpoints []endpointMeta, exportName string) ([]byte, error) {
	metaJSON, err := json.MarshalIndent(endpoints, "", "  ")
	if err != nil {
		return nil, fmt.Errorf("marshal endpoint metadata: %w", err)
	}

	methods := make([]string, 0, len(endpoints))
	for _, endpoint := range endpoints {
		methods = append(methods, endpoint.Method)
	}
	methodUnion := "never"
	if len(methods) > 0 {
		quoted := make([]string, 0, len(methods))
		for _, method := range methods {
			quoted = append(quoted, strconvQuote(method))
		}
		methodUnion = strings.Join(quoted, " | ")
	}

	var requestMap bytes.Buffer
	var responseMap bytes.Buffer
	for _, endpoint := range endpoints {
		requestMap.WriteString(fmt.Sprintf("  %s: RPCRequestEnvelope<unknown>;\n", strconvQuote(endpoint.Method)))
		responseMap.WriteString(fmt.Sprintf("  %s: RPCResponseEnvelope<unknown>;\n", strconvQuote(endpoint.Method)))
	}
	if requestMap.Len() == 0 {
		requestMap.WriteString("  // Add method keys once endpoint metadata is available.\n")
		responseMap.WriteString("  // Add method keys once endpoint metadata is available.\n")
	}

	var out bytes.Buffer
	out.WriteString("/*\n")
	out.WriteString(" * Generated by cmd/rpc-tsgen (scaffold).\n")
	out.WriteString(" *\n")
	out.WriteString(" * This scaffold emits method unions, endpoint metadata arrays,\n")
	out.WriteString(" * and canonical request/response envelope helpers.\n")
	out.WriteString(" * Replace `unknown` payload maps with concrete generated types once\n")
	out.WriteString(" * your Go->TS type generation step is wired.\n")
	out.WriteString(" */\n\n")
	out.WriteString("export interface RPCTypeRef {\n")
	out.WriteString("  goType: string;\n")
	out.WriteString("  pkgPath?: string;\n")
	out.WriteString("  name?: string;\n")
	out.WriteString("  kind?: string;\n")
	out.WriteString("  pointer?: boolean;\n")
	out.WriteString("}\n\n")
	out.WriteString("export interface RPCEndpointMeta {\n")
	out.WriteString("  method: string;\n")
	out.WriteString("  messageType?: string;\n")
	out.WriteString("  handlerKind?: \"execute\" | \"query\" | string;\n")
	out.WriteString("  requestType?: RPCTypeRef;\n")
	out.WriteString("  responseType?: RPCTypeRef;\n")
	out.WriteString("  summary?: string;\n")
	out.WriteString("  description?: string;\n")
	out.WriteString("  tags?: string[];\n")
	out.WriteString("  deprecated?: boolean;\n")
	out.WriteString("  since?: string;\n")
	out.WriteString("}\n\n")
	out.WriteString("export interface RPCRequestMeta {\n")
	out.WriteString("  actorId?: string;\n")
	out.WriteString("  roles?: string[];\n")
	out.WriteString("  tenant?: string;\n")
	out.WriteString("  requestId?: string;\n")
	out.WriteString("  correlationId?: string;\n")
	out.WriteString("  permissions?: string[];\n")
	out.WriteString("  scope?: Record<string, unknown>;\n")
	out.WriteString("  headers?: Record<string, string>;\n")
	out.WriteString("  params?: Record<string, string>;\n")
	out.WriteString("  query?: Record<string, string[]>;\n")
	out.WriteString("}\n\n")
	out.WriteString("export interface RPCRequestEnvelope<TData = unknown> {\n")
	out.WriteString("  data: TData;\n")
	out.WriteString("  meta?: RPCRequestMeta;\n")
	out.WriteString("}\n\n")
	out.WriteString("export interface RPCErrorEnvelope {\n")
	out.WriteString("  code: string;\n")
	out.WriteString("  message: string;\n")
	out.WriteString("  category?: string;\n")
	out.WriteString("  retryable?: boolean;\n")
	out.WriteString("  details?: Record<string, unknown>;\n")
	out.WriteString("}\n\n")
	out.WriteString("export interface RPCResponseEnvelope<TData = unknown> {\n")
	out.WriteString("  data?: TData;\n")
	out.WriteString("  error?: RPCErrorEnvelope;\n")
	out.WriteString("}\n\n")
	out.WriteString(fmt.Sprintf("export const %s: RPCEndpointMeta[] = ", exportName))
	out.Write(metaJSON)
	out.WriteString(";\n\n")
	out.WriteString(fmt.Sprintf("export type RPCMethod = %s;\n\n", methodUnion))
	out.WriteString("export type RPCRequestByMethod = {\n")
	out.Write(requestMap.Bytes())
	out.WriteString("};\n\n")
	out.WriteString("export type RPCResponseByMethod = {\n")
	out.Write(responseMap.Bytes())
	out.WriteString("};\n")

	return out.Bytes(), nil
}

func strconvQuote(value string) string {
	encoded, _ := json.Marshal(value)
	return string(encoded)
}

func die(err error) {
	fmt.Fprintf(os.Stderr, "rpc-tsgen: %v\n", err)
	os.Exit(1)
}

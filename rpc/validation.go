package rpc

import (
	"fmt"
	"reflect"
	"sort"
	"strings"
)

// ValidationStatus distinguishes structural validity from unavailable evidence.
type ValidationStatus string

const (
	ValidationValid        ValidationStatus = "valid"
	ValidationInvalid      ValidationStatus = "invalid"
	ValidationUnverifiable ValidationStatus = "unverifiable"
)

// Stable issue codes are independent of human-readable messages.
const (
	IssueDefinitionRequired    = "definition_required"
	IssueMethodRequired        = "method_required"
	IssueMethodInvalid         = "method_invalid"
	IssueRequestTypeRequired   = "request_type_required"
	IssueResponseTypeRequired  = "response_type_required"
	IssueRequestFactoryInvalid = "request_factory_invalid"
	IssueResponseShapeInvalid  = "response_shape_invalid"
	IssueHandlerRequired       = "handler_required"
	IssueEndpointUnverifiable  = "endpoint_unverifiable"
	IssueValidationPanicked    = "validation_panicked"
	IssueValidationMalformed   = "validation_malformed"
	IssueDuplicateMethod       = "duplicate_method"
	IssueDefinitionChanged     = "definition_changed"
	IssueServerRequired        = "server_required"
)

// ValidationIssue describes one bounded structural check, not authorization.
type ValidationIssue struct {
	Method  string           `json:"method"`
	Code    string           `json:"code"`
	Status  ValidationStatus `json:"status"`
	Message string           `json:"message"`
}

// EndpointValidation is the result for one method. Unverifiable is not valid.
type EndpointValidation struct {
	Method string            `json:"method"`
	Status ValidationStatus  `json:"status"`
	Issues []ValidationIssue `json:"issues,omitempty"`
}

// EndpointValidator is an optional, side-effect-free structural attestation.
// Implementations must not invoke handlers or factories. A nil issue list attests
// that the definition's handler, types and request factory are structurally valid.
// The framework cannot prove the truth of an arbitrary custom implementation.
type EndpointValidator interface{ ValidateEndpoint() []ValidationIssue }

// ValidationReport includes registered endpoints and sticky strict-registration
// failures. A new server is needed to clear failed startup attempts.
type ValidationReport struct {
	Ready              bool                 `json:"ready"`
	Endpoints          []EndpointValidation `json:"endpoints"`
	RegistrationIssues []ValidationIssue    `json:"registrationIssues,omitempty"`
}

// EndpointValidationError is returned for strict structural validation failures,
// unless the configured registration failure strategy suppresses it.
type EndpointValidationError struct{ Validation EndpointValidation }

func (e *EndpointValidationError) Error() string {
	return fmt.Sprintf("rpc endpoint %q failed structural validation (%s)", e.Validation.Method, e.Validation.Status)
}

// WithStrictValidation rejects invalid or unverifiable endpoints before publication.
// It preserves failure strategies; always check ValidateEndpoints at startup when
// LogAndContinue may suppress registration errors.
func WithStrictValidation() Option { return func(s *Server) { s.strictValidation = true } }

// ValidateEndpoint inspects metadata and optional validation evidence without
// calling NewRequest or Invoke. Panicking custom metadata/validators are reported
// as unverifiable using a safe message, without exposing the panic value.
func ValidateEndpoint(def EndpointDefinition) EndpointValidation {
	_, _, _, result := inspectEndpoint(def)
	return result
}

func inspectEndpoint(def EndpointDefinition) (spec EndpointSpec, req, res reflect.Type, result EndpointValidation) {
	result.Status = ValidationValid
	defer func() {
		if recover() != nil {
			result.Issues = append(result.Issues, validationIssue(result.Method, IssueValidationPanicked, ValidationUnverifiable, "endpoint validation panicked"))
			result = normalizeValidation(result.Method, result.Issues)
		}
	}()
	if isNilDefinition(def) {
		result = normalizeValidation("", []ValidationIssue{validationIssue("", IssueDefinitionRequired, ValidationInvalid, "endpoint definition required")})
		return
	}
	spec = def.Spec()
	result.Method = spec.Method
	if trimmed := strings.TrimSpace(spec.Method); trimmed == "" {
		result.Issues = append(result.Issues, validationIssue(spec.Method, IssueMethodRequired, ValidationInvalid, "method identity required"))
	} else if trimmed != spec.Method {
		result.Issues = append(result.Issues, validationIssue(spec.Method, IssueMethodInvalid, ValidationInvalid, "method identity must not contain leading or trailing whitespace"))
	}
	req, res = def.RequestType(), def.ResponseType()
	if req == nil {
		result.Issues = append(result.Issues, validationIssue(spec.Method, IssueRequestTypeRequired, ValidationInvalid, "request type required"))
	}
	if res == nil {
		result.Issues = append(result.Issues, validationIssue(spec.Method, IssueResponseTypeRequired, ValidationInvalid, "response type required"))
	}
	if validator, ok := def.(EndpointValidator); ok {
		result.Issues = append(result.Issues, validator.ValidateEndpoint()...)
	} else {
		result.Issues = append(result.Issues, validationIssue(spec.Method, IssueEndpointUnverifiable, ValidationUnverifiable, "custom handler and request factory are unverifiable"))
	}
	result = normalizeValidation(spec.Method, result.Issues)
	if result.Status == ValidationValid && spec.MessageType == "" {
		// Inference can call a custom request's Type method on its zero value.
		// Keep it inside this guard and return the prepared metadata so strict
		// registration never repeats it outside the validation failure path.
		spec.MessageType = messageTypeName(req)
	}
	return
}

func isNilDefinition(def EndpointDefinition) bool {
	if def == nil {
		return true
	}
	value := reflect.ValueOf(def)
	switch value.Kind() {
	case reflect.Pointer, reflect.Interface, reflect.Map, reflect.Slice, reflect.Func, reflect.Chan:
		return value.IsNil()
	default:
		return false
	}
}

func validationIssue(method, code string, status ValidationStatus, message string) ValidationIssue {
	return ValidationIssue{Method: method, Code: code, Status: status, Message: message}
}
func normalizeValidation(method string, issues []ValidationIssue) EndpointValidation {
	result := EndpointValidation{Method: method, Status: ValidationValid}
	for _, issue := range issues {
		issue.Method = method
		if issue.Code == "" || (issue.Status != ValidationInvalid && issue.Status != ValidationUnverifiable) {
			issue = validationIssue(method, IssueValidationMalformed, ValidationUnverifiable, "custom validation issue is malformed")
		}
		result.Issues = append(result.Issues, issue)
		if issue.Status == ValidationInvalid {
			result.Status = ValidationInvalid
		} else if result.Status == ValidationValid {
			result.Status = ValidationUnverifiable
		}
	}
	result.Issues = sortedValidationIssues(result.Issues)
	return result
}
func sortedValidationIssues(issues []ValidationIssue) []ValidationIssue {
	unique := make(map[ValidationIssue]struct{}, len(issues))
	for _, issue := range issues {
		unique[issue] = struct{}{}
	}
	var result []ValidationIssue
	for issue := range unique {
		result = append(result, issue)
	}
	sort.Slice(result, func(i, j int) bool {
		a, b := result[i], result[j]
		if a.Method != b.Method {
			return a.Method < b.Method
		}
		if a.Code != b.Code {
			return a.Code < b.Code
		}
		if a.Status != b.Status {
			return a.Status < b.Status
		}
		return a.Message < b.Message
	})
	return result
}

// ValidateEndpoints reports current structural evidence without changing the
// registry. Custom validators run outside server locks and must be side-effect free.
func (s *Server) ValidateEndpoints() ValidationReport {
	report := ValidationReport{Ready: true, Endpoints: []EndpointValidation{}}
	if s == nil {
		report.Ready = false
		report.RegistrationIssues = []ValidationIssue{validationIssue("", IssueServerRequired, ValidationInvalid, "RPC server required")}
		return report
	}
	s.mu.RLock()
	entries := make([]endpointEntry, 0, len(s.endpoints))
	for _, entry := range s.endpoints {
		entries = append(entries, entry)
	}
	for issue := range s.registrationIssues {
		report.RegistrationIssues = append(report.RegistrationIssues, issue)
	}
	s.mu.RUnlock()
	for _, entry := range entries {
		_, req, res, result := inspectEndpoint(entry.definition)
		if result.Method != entry.endpoint.Method || req != entry.msgType || res != entry.resType {
			result.Issues = append(result.Issues, validationIssue(entry.endpoint.Method, IssueDefinitionChanged, ValidationInvalid, "registered definition metadata changed"))
			result = normalizeValidation(entry.endpoint.Method, result.Issues)
		}
		if result.Status != ValidationValid {
			report.Ready = false
		}
		report.Endpoints = append(report.Endpoints, result)
	}
	sort.Slice(report.Endpoints, func(i, j int) bool { return report.Endpoints[i].Method < report.Endpoints[j].Method })
	report.RegistrationIssues = sortedValidationIssues(report.RegistrationIssues)
	if len(report.RegistrationIssues) > 0 {
		report.Ready = false
	}
	return report
}
func (s *Server) recordRegistrationIssues(issues []ValidationIssue) {
	s.mu.Lock()
	defer s.mu.Unlock()
	if s.registrationIssues == nil {
		s.registrationIssues = make(map[ValidationIssue]struct{})
	}
	for _, issue := range issues {
		s.registrationIssues[issue] = struct{}{}
	}
}

// ValidateEndpoint checks the built-in factory by construction, without calling it.
func (d *endpointDefinition) ValidateEndpoint() []ValidationIssue {
	if d == nil {
		return []ValidationIssue{validationIssue("", IssueDefinitionRequired, ValidationInvalid, "endpoint definition required")}
	}
	var issues []ValidationIssue
	if !d.handlerPresent || d.invoke == nil {
		issues = append(issues, validationIssue(d.spec.Method, IssueHandlerRequired, ValidationInvalid, "handler required"))
	}
	// The built-in factory allocates reqType.Elem() and Invoke accepts exactly reqType.
	if d.reqType == nil || d.reqType.Kind() != reflect.Pointer || !envelopeShape(d.reqType.Elem(), "Meta", reflect.TypeFor[RequestMeta]()) {
		issues = append(issues, validationIssue(d.spec.Method, IssueRequestFactoryInvalid, ValidationInvalid, "request factory must allocate a request envelope pointer"))
	}
	if !envelopeShape(d.resType, "Error", reflect.TypeFor[*Error]()) {
		issues = append(issues, validationIssue(d.spec.Method, IssueResponseShapeInvalid, ValidationInvalid, "response type must be a response envelope"))
	}
	return issues
}
func envelopeShape(typ reflect.Type, field string, fieldType reflect.Type) bool {
	if typ == nil || typ.Kind() != reflect.Struct {
		return false
	}
	data, ok := typ.FieldByName("Data")
	if !ok || data.PkgPath != "" {
		return false
	}
	metadata, ok := typ.FieldByName(field)
	return ok && metadata.PkgPath == "" && metadata.Type == fieldType
}

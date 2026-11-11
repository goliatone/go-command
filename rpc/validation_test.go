package rpc

import (
	"context"
	"encoding/json"
	"errors"
	"reflect"
	"strings"
	"sync"
	"testing"

	"github.com/stretchr/testify/require"
)

func readinessEndpoint(method string, called *int) EndpointDefinition {
	return NewEndpoint[string, string](EndpointSpec{Method: method}, func(context.Context, RequestEnvelope[string]) (ResponseEnvelope[string], error) {
		if called != nil {
			*called++
		}
		return ResponseEnvelope[string]{Data: "ok"}, nil
	})
}

type opaqueReadinessEndpoint struct {
	EndpointDefinition
	factoryCalls, invokeCalls *int
}

func (e opaqueReadinessEndpoint) NewRequest() any {
	*e.factoryCalls++
	panic("must not run custom factory")
}
func (e opaqueReadinessEndpoint) Invoke(context.Context, any) (any, error) {
	*e.invokeCalls++
	return nil, nil
}

type customReadinessEndpoint struct {
	opaqueReadinessEndpoint
	validate func() []ValidationIssue
}

func (e customReadinessEndpoint) ValidateEndpoint() []ValidationIssue { return e.validate() }

type panicReadinessEndpoint struct{ EndpointDefinition }

func (panicReadinessEndpoint) Spec() EndpointSpec { panic("private metadata secret") }

type metadataReadinessEndpoint struct {
	opaqueReadinessEndpoint
	request, response reflect.Type
}

func (e metadataReadinessEndpoint) RequestType() reflect.Type  { return e.request }
func (e metadataReadinessEndpoint) ResponseType() reflect.Type { return e.response }

func TestReadinessNilHandlerStrictAndDefaultCompatibility(t *testing.T) {
	bad := NewEndpoint[string, string](EndpointSpec{Method: "nil.handler"}, nil)
	legacy := NewServer(WithFailureMode(FailureModeRecover))
	require.NoError(t, legacy.RegisterEndpoint(bad))
	require.Len(t, legacy.Endpoints(), 1)
	require.False(t, legacy.ValidateEndpoints().Ready)
	_, err := legacy.Invoke(context.Background(), "nil.handler", RequestEnvelope[string]{})
	require.Error(t, err)
	for _, mode := range []FailureMode{FailureModeReject, FailureModeRecover, FailureModeLogAndContinue} {
		t.Run(string(rune('0'+mode)), func(t *testing.T) {
			var events []FailureEvent
			server := NewServer(WithStrictValidation(), WithFailureMode(mode), WithFailureLogger(func(event FailureEvent) { events = append(events, event) }))
			err := server.RegisterEndpoint(bad)
			if mode == FailureModeLogAndContinue {
				require.NoError(t, err)
				require.Len(t, events, 1)
			} else {
				var failure *EndpointValidationError
				require.ErrorAs(t, err, &failure)
				require.Equal(t, IssueHandlerRequired, failure.Validation.Issues[0].Code)
			}
			require.Empty(t, server.Endpoints())
			_, err = server.NewRequestForMethod("nil.handler")
			require.Error(t, err)
			report := server.ValidateEndpoints()
			require.False(t, report.Ready)
			require.Len(t, report.RegistrationIssues, 1)
			require.Equal(t, IssueHandlerRequired, report.RegistrationIssues[0].Code)
			// Fixing and retrying does not erase failed startup evidence.
			require.NoError(t, server.RegisterEndpoint(readinessEndpoint("nil.handler", nil)))
			require.False(t, server.ValidateEndpoints().Ready)
		})
	}
}

func TestReadinessNeverInvokesHandlersOrFactories(t *testing.T) {
	handlers, factories, invocations := 0, 0, 0
	builtin := readinessEndpoint("built.in", &handlers)
	opaque := opaqueReadinessEndpoint{builtin, &factories, &invocations}
	require.Equal(t, ValidationValid, ValidateEndpoint(builtin).Status)
	require.Equal(t, ValidationUnverifiable, ValidateEndpoint(opaque).Status)
	legacy := NewServer()
	require.NoError(t, legacy.RegisterEndpoint(opaque))
	require.Equal(t, ValidationUnverifiable, legacy.ValidateEndpoints().Endpoints[0].Status)
	strict := NewServer(WithStrictValidation())
	require.Error(t, strict.RegisterEndpoint(opaque))
	require.Empty(t, strict.Endpoints())
	// Optional evidence runs outside registry locks; metadata may be read safely.
	custom := customReadinessEndpoint{opaque, func() []ValidationIssue { _ = strict.Endpoints(); return nil }}
	require.NoError(t, strict.RegisterEndpoint(custom))
	for i := 0; i < 3; i++ {
		require.Equal(t, ValidationValid, strict.ValidateEndpoints().Endpoints[0].Status)
	}
	require.Zero(t, handlers)
	require.Zero(t, factories)
	require.Zero(t, invocations)
}

func TestReadinessInvalidAndUnverifiableDefinitions(t *testing.T) {
	factories, invocations := 0, 0
	var typedNil *endpointDefinition
	valid := readinessEndpoint("valid", nil)
	opaque := opaqueReadinessEndpoint{valid, &factories, &invocations}
	tests := []struct {
		name   string
		def    EndpointDefinition
		code   string
		status ValidationStatus
	}{
		{"nil", nil, IssueDefinitionRequired, ValidationInvalid},
		{"typed nil", typedNil, IssueDefinitionRequired, ValidationInvalid},
		{"blank method", readinessEndpoint(" \t", nil), IssueMethodRequired, ValidationInvalid},
		{"opaque", opaque, IssueEndpointUnverifiable, ValidationUnverifiable},
		{"missing types", metadataReadinessEndpoint{opaque, nil, nil}, IssueRequestTypeRequired, ValidationInvalid},
		{"metadata panic", panicReadinessEndpoint{valid}, IssueValidationPanicked, ValidationUnverifiable},
		{"validator panic", customReadinessEndpoint{opaque, func() []ValidationIssue { panic("private validator secret") }}, IssueValidationPanicked, ValidationUnverifiable},
		{"malformed evidence", customReadinessEndpoint{opaque, func() []ValidationIssue { return []ValidationIssue{{Code: "claims-valid", Status: ValidationValid}} }}, IssueValidationMalformed, ValidationUnverifiable},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := ValidateEndpoint(tt.def)
			require.Equal(t, tt.status, result.Status)
			codes := []string{}
			for _, issue := range result.Issues {
				codes = append(codes, issue.Code)
			}
			require.Contains(t, codes, tt.code)
			data, err := json.Marshal(result)
			require.NoError(t, err)
			require.NotContains(t, string(data), "secret")
			require.Error(t, NewServer(WithStrictValidation()).RegisterEndpoint(tt.def))
		})
	}
	require.Zero(t, factories)
	require.Zero(t, invocations)
	// Default registration still accepts the historical whitespace identity.
	require.NoError(t, NewServer().RegisterEndpoint(readinessEndpoint(" \t", nil)))
	require.False(t, (*Server)(nil).ValidateEndpoints().Ready)
}

func TestReadinessBuiltinFactoryAndTypeShapes(t *testing.T) {
	for _, mutate := range []func(*endpointDefinition){
		func(d *endpointDefinition) { d.reqType = nil },
		func(d *endpointDefinition) { d.reqType = reflect.TypeFor[RequestEnvelope[string]]() },
		func(d *endpointDefinition) { d.reqType = reflect.TypeFor[*string]() },
		func(d *endpointDefinition) { d.resType = nil },
		func(d *endpointDefinition) { d.resType = reflect.TypeFor[string]() },
		func(d *endpointDefinition) { d.invoke = nil },
	} {
		def := readinessEndpoint("invalid.shape", nil).(*endpointDefinition)
		mutate(def)
		require.Equal(t, ValidationInvalid, ValidateEndpoint(def).Status)
		server := NewServer(WithStrictValidation())
		require.Error(t, server.RegisterEndpoint(def))
		require.Empty(t, server.Endpoints())
	}
}

func TestReadinessDeterminismDuplicatesAndReportOwnership(t *testing.T) {
	build := func(reverse bool) *Server {
		server := NewServer(WithStrictValidation(), WithFailureMode(FailureModeLogAndContinue))
		names := []string{"b", "a"}
		if reverse {
			names = []string{"a", "b"}
		}
		for _, name := range names {
			require.NoError(t, server.RegisterEndpoint(readinessEndpoint(name, nil)))
			for i := 0; i < 3; i++ {
				require.NoError(t, server.RegisterEndpoint(readinessEndpoint(name, nil)))
			}
		}
		return server
	}
	a, b := build(false), build(true)
	first := a.ValidateEndpoints()
	require.Equal(t, first, b.ValidateEndpoints())
	require.Len(t, first.Endpoints, 2)
	require.Len(t, first.RegistrationIssues, 2)
	require.Equal(t, IssueDuplicateMethod, first.RegistrationIssues[0].Code)
	require.Equal(t, "a", first.RegistrationIssues[0].Method)
	require.False(t, first.Ready)
	baseline, err := json.Marshal(first)
	require.NoError(t, err)
	first.Endpoints[0].Method = "mutated"
	first.RegistrationIssues[0].Code = "mutated"
	for i := 0; i < 3; i++ {
		next, err := json.Marshal(a.ValidateEndpoints())
		require.NoError(t, err)
		require.Equal(t, baseline, next)
	}
	// A valid registry remains usable after repeated reports.
	good := NewServer(WithStrictValidation())
	calls := 0
	require.NoError(t, good.RegisterEndpoint(readinessEndpoint("ok", &calls)))
	require.True(t, good.ValidateEndpoints().Ready)
	require.True(t, good.ValidateEndpoints().Ready)
	require.Zero(t, calls)
	_, err = good.Invoke(context.Background(), "ok", RequestEnvelope[string]{})
	require.NoError(t, err)
	require.Equal(t, 1, calls)
}

func TestReadinessCustomIssueNormalizationAndMetadataMutation(t *testing.T) {
	factoryCalls, invokeCalls := 0, 0
	builtin := readinessEndpoint("custom", nil).(*endpointDefinition)
	issues := []ValidationIssue{
		{Method: "forged", Code: "z", Status: ValidationUnverifiable, Message: "unknown"},
		{Method: "forged", Code: "a", Status: ValidationInvalid, Message: "invalid"},
		{Method: "forged", Code: "a", Status: ValidationInvalid, Message: "invalid"},
	}
	custom := customReadinessEndpoint{opaqueReadinessEndpoint{builtin, &factoryCalls, &invokeCalls}, func() []ValidationIssue { return issues }}
	report := ValidateEndpoint(custom)
	require.Equal(t, ValidationInvalid, report.Status)
	require.Len(t, report.Issues, 2)
	require.Equal(t, "custom", report.Issues[0].Method)
	require.Equal(t, "a", report.Issues[0].Code)
	report.Issues[0].Message = "mutated"
	require.Equal(t, "invalid", issues[1].Message)
	server := NewServer()
	require.NoError(t, server.RegisterEndpoint(builtin))
	builtin.spec.Method = "changed"
	after := server.ValidateEndpoints()
	require.False(t, after.Ready)
	require.Equal(t, "custom", after.Endpoints[0].Method)
	require.Equal(t, IssueDefinitionChanged, after.Endpoints[0].Issues[0].Code)
}

func TestReadinessFailureStrategyAndConcurrentReports(t *testing.T) {
	events := 0
	server := NewServer(WithStrictValidation(), WithFailureStrategy(func(event FailureEvent) FailureMode {
		events++
		require.Equal(t, FailureStageRegister, event.Stage)
		var validation *EndpointValidationError
		require.True(t, errors.As(event.Err, &validation))
		return FailureModeLogAndContinue
	}))
	require.NoError(t, server.RegisterEndpoint(NewEndpoint[string, string](EndpointSpec{Method: "nil"}, nil)))
	require.Equal(t, 1, events)
	// Concurrent readers and duplicate registration exercise publication/report locks.
	server = NewServer(WithStrictValidation(), WithFailureMode(FailureModeLogAndContinue))
	var wg sync.WaitGroup
	for i := 0; i < 10; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			for j := 0; j < 10; j++ {
				if err := server.RegisterEndpoint(readinessEndpoint("same", nil)); err != nil {
					t.Error(err)
				}
				data, err := json.Marshal(server.ValidateEndpoints())
				if err != nil || strings.Contains(string(data), "secret") {
					t.Error(err)
				}
			}
		}()
	}
	wg.Wait()
	require.Len(t, server.Endpoints(), 1)
	require.Len(t, server.ValidateEndpoints().RegistrationIssues, 1)
}

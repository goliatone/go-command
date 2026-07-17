package command

import (
	"fmt"
	"maps"
	"reflect"
	"strings"

	"github.com/goliatone/go-errors"
)

const (
	TextCodeRegistrationNotFound              = "REGISTRATION_NOT_FOUND"
	TextCodeRegistrationConflict              = "REGISTRATION_CONFLICT"
	TextCodeRegistrationInvalid               = "REGISTRATION_INVALID"
	TextCodeRegistrationProviderNotConfigured = "REGISTRATION_PROVIDER_NOT_CONFIGURED"
	TextCodeDynamicMessageTypeMismatch        = "DYNAMIC_MESSAGE_TYPE_MISMATCH"
	TextCodeDynamicResultTypeMismatch         = "DYNAMIC_RESULT_TYPE_MISMATCH"
	TextCodeDynamicResultMissing              = "DYNAMIC_RESULT_MISSING"
	TextCodePlacementResolutionFailed         = "PLACEMENT_RESOLUTION_FAILED"
	TextCodeInvalidDispatchRoute              = "INVALID_DISPATCH_ROUTE"
	TextCodeRemoteDispatcherNotConfigured     = "REMOTE_DISPATCHER_NOT_CONFIGURED"
	TextCodeLocalInvocationRequired           = "LOCAL_INVOCATION_REQUIRED"
)

func NewRegistrationNotFoundError(kind HandlerKind, key string) *errors.Error {
	return errors.New("message registration not found", errors.CategoryNotFound).
		WithTextCode(TextCodeRegistrationNotFound).
		WithMetadata(map[string]any{"handler_kind": kind, "registration_key": strings.TrimSpace(key)})
}

func NewRegistrationConflictError(kind HandlerKind, key string) *errors.Error {
	return errors.New("message registration conflicts with an existing registration", errors.CategoryConflict).
		WithCode(errors.CodeConflict).
		WithTextCode(TextCodeRegistrationConflict).
		WithMetadata(map[string]any{"handler_kind": kind, "registration_key": strings.TrimSpace(key)})
}

func NewRegistrationInvalidError(message string, metadata map[string]any) *errors.Error {
	err := errors.New(message, errors.CategoryValidation).
		WithTextCode(TextCodeRegistrationInvalid)
	if len(metadata) > 0 {
		err.WithMetadata(metadata)
	}
	return err
}

func NewRegistrationProviderNotConfiguredError() *errors.Error {
	return errors.New("registration provider is required for dynamic or routed dispatch", errors.CategoryConflict).
		WithCode(errors.CodeConflict).
		WithTextCode(TextCodeRegistrationProviderNotConfigured)
}

func NewDynamicMessageTypeMismatchError(reg MessageRegistration, actual any) *errors.Error {
	return errors.New("dynamic message type does not match registration", errors.CategoryValidation).
		WithTextCode(TextCodeDynamicMessageTypeMismatch).
		WithMetadata(registrationTypeMetadata(reg, actual))
}

func NewDynamicResultTypeMismatchError(reg MessageRegistration, actual any) *errors.Error {
	metadata := registrationTypeMetadata(reg, actual)
	metadata["expected_result_type"] = typeString(registrationResultType(reg))
	return newDynamicResultTypeMismatchError(metadata)
}

func NewDynamicResultMissingError(reg MessageRegistration) *errors.Error {
	return errors.New("dynamic result is missing", errors.CategoryCommand).
		WithTextCode(TextCodeDynamicResultMissing).
		WithMetadata(map[string]any{
			"handler_kind":         registrationKind(reg),
			"registration_id":      registrationID(reg),
			"expected_result_type": typeString(registrationResultType(reg)),
		})
}

// NewPlacementResolutionError classifies resolver failures while retaining
// structured source metadata when the resolver already returned go-errors.
func NewPlacementResolutionError(reg MessageRegistration, source error) *errors.Error {
	metadata := map[string]any{
		"handler_kind":    registrationKind(reg),
		"registration_id": registrationID(reg),
	}
	var structured *errors.Error
	if errors.As(source, &structured) {
		maps.Copy(metadata, structured.Metadata)
		if structured.TextCode != "" {
			metadata["source_text_code"] = structured.TextCode
		}
	}
	if source == nil {
		return errors.New("failed to resolve dispatch placement", errors.CategoryRouting).
			WithTextCode(TextCodePlacementResolutionFailed).
			WithMetadata(metadata)
	}
	return errors.Wrap(source, errors.CategoryRouting, "failed to resolve dispatch placement").
		WithTextCode(TextCodePlacementResolutionFailed).
		WithMetadata(metadata)
}

func NewInvalidDispatchRouteError(route DispatchRoute) *errors.Error {
	return errors.New("invalid dispatch route", errors.CategoryValidation).
		WithTextCode(TextCodeInvalidDispatchRoute).
		WithMetadata(map[string]any{"target": route.Target, "route": strings.TrimSpace(route.Name)})
}

func NewRemoteDispatcherNotConfiguredError(reg MessageRegistration, route DispatchRoute) *errors.Error {
	return errors.New("remote dispatcher is not configured", errors.CategoryConflict).
		WithCode(errors.CodeConflict).
		WithTextCode(TextCodeRemoteDispatcherNotConfigured).
		WithMetadata(map[string]any{
			"handler_kind":    registrationKind(reg),
			"registration_id": registrationID(reg),
			"route":           strings.TrimSpace(route.Name),
		})
}

func NewLocalInvocationRequiredError(reg MessageRegistration) *errors.Error {
	return errors.New("local invocation is required to prevent routed redispatch", errors.CategoryConflict).
		WithCode(errors.CodeConflict).
		WithTextCode(TextCodeLocalInvocationRequired).
		WithMetadata(map[string]any{
			"handler_kind":    registrationKind(reg),
			"registration_id": registrationID(reg),
		})
}

func registrationTypeMetadata(reg MessageRegistration, actual any) map[string]any {
	actualType := reflect.TypeOf(actual)
	return map[string]any{
		"handler_kind":          registrationKind(reg),
		"registration_id":       registrationID(reg),
		"expected_request_type": typeString(registrationRequestType(reg)),
		"actual_type":           typeString(actualType),
	}
}

func registrationID(reg MessageRegistration) string {
	if isNilRegistration(reg) {
		return ""
	}
	return strings.TrimSpace(reg.ID())
}

func registrationKind(reg MessageRegistration) HandlerKind {
	if isNilRegistration(reg) {
		return ""
	}
	return reg.Kind()
}

func registrationRequestType(reg MessageRegistration) reflect.Type {
	if isNilRegistration(reg) {
		return nil
	}
	return reg.RequestType()
}

func registrationResultType(reg MessageRegistration) reflect.Type {
	if isNilRegistration(reg) {
		return nil
	}
	return reg.ResultType()
}

func isNilRegistration(reg MessageRegistration) bool {
	if reg == nil {
		return true
	}
	v := reflect.ValueOf(reg)
	return v.Kind() == reflect.Pointer && v.IsNil()
}

func typeString(t reflect.Type) string {
	if t == nil {
		return "<nil>"
	}
	return fmt.Sprint(t)
}

func newDynamicResultSinkTypeMismatchError(expected reflect.Type, actual any) *errors.Error {
	return newDynamicResultTypeMismatchError(map[string]any{
		"expected_result_type": typeString(expected),
		"actual_type":          typeString(reflect.TypeOf(actual)),
	})
}

func newDynamicResultTypeMismatchError(metadata map[string]any) *errors.Error {
	return errors.New("dynamic result type does not match registration", errors.CategoryValidation).
		WithTextCode(TextCodeDynamicResultTypeMismatch).
		WithMetadata(metadata)
}

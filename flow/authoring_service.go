package flow

import (
	"context"
	"encoding/json"
	"fmt"
	"sort"
	"strconv"
	"strings"
	"sync"
	"time"

	apperrors "github.com/goliatone/go-errors"
)

var (
	ErrAuthoringNotFound = apperrors.New("machine not found", apperrors.CategoryBadInput).
				WithTextCode(ErrCodeAuthoringNotFound)
	ErrAuthoringValidationFailed = apperrors.New("publish blocked by diagnostics", apperrors.CategoryBadInput).
					WithTextCode(ErrCodeAuthoringValidationFailed)
)

// AuthoringMachineRecord persists one authored machine document revision.
type AuthoringMachineRecord struct {
	MachineID           string
	Name                string
	Version             string
	ETag                string
	Draft               DraftMachineDocument
	Diagnostics         []ValidationDiagnostic
	UpdatedAt           time.Time
	PublishedAt         *time.Time
	PublishedDefinition *MachineDefinition
	DeletedAt           *time.Time
}

// AuthoringListOptions constrains list pagination and filtering.
type AuthoringListOptions struct {
	Query         string
	IncludeDrafts *bool
	Limit         *int
	Cursor        string
}

// AuthoringListResult is a paginated slice of machine records.
type AuthoringListResult struct {
	Items      []*AuthoringMachineRecord
	NextCursor string
}

// AuthoringStore persists machine-authoring drafts and publish state.
// It is intentionally decoupled from runtime StateStore.
type AuthoringStore interface {
	List(ctx context.Context, opts AuthoringListOptions) (*AuthoringListResult, error)
	Load(ctx context.Context, machineID string) (*AuthoringMachineRecord, error)
	Save(ctx context.Context, rec *AuthoringMachineRecord, expectedVersion string) (*AuthoringMachineRecord, error)
	Delete(ctx context.Context, machineID, expectedVersion string, hardDelete bool) (bool, error)
}

// InMemoryAuthoringStore is an in-memory authoring persistence backend.
type InMemoryAuthoringStore struct {
	mu      sync.RWMutex
	records map[string]*AuthoringMachineRecord
}

// NewInMemoryAuthoringStore creates an empty in-memory authoring store.
func NewInMemoryAuthoringStore() *InMemoryAuthoringStore {
	return &InMemoryAuthoringStore{
		records: make(map[string]*AuthoringMachineRecord),
	}
}

func (s *InMemoryAuthoringStore) List(_ context.Context, opts AuthoringListOptions) (*AuthoringListResult, error) {
	if s == nil {
		return nil, fmt.Errorf("authoring store not configured")
	}
	includeDrafts := true
	if opts.IncludeDrafts != nil {
		includeDrafts = *opts.IncludeDrafts
	}
	query := strings.ToLower(strings.TrimSpace(opts.Query))
	limit := normalizeAuthoringListLimit(opts.Limit)
	offset := decodeAuthoringCursor(opts.Cursor)

	s.mu.RLock()
	defer s.mu.RUnlock()

	ids := make([]string, 0, len(s.records))
	for id, rec := range s.records {
		if rec == nil || rec.DeletedAt != nil {
			continue
		}
		if !includeDrafts && rec.Draft.DraftState.IsDraft {
			continue
		}
		if query != "" {
			if !strings.Contains(strings.ToLower(id), query) &&
				!strings.Contains(strings.ToLower(strings.TrimSpace(rec.Name)), query) {
				continue
			}
		}
		ids = append(ids, id)
	}
	sort.Strings(ids)

	if offset < 0 {
		offset = 0
	}
	if offset > len(ids) {
		offset = len(ids)
	}

	end := offset + limit
	if end > len(ids) {
		end = len(ids)
	}
	items := make([]*AuthoringMachineRecord, 0, end-offset)
	for _, id := range ids[offset:end] {
		cloned, err := cloneAuthoringMachineRecord(s.records[id])
		if err != nil {
			return nil, err
		}
		items = append(items, cloned)
	}

	nextCursor := ""
	if end < len(ids) {
		nextCursor = strconv.Itoa(end)
	}
	return &AuthoringListResult{
		Items:      items,
		NextCursor: nextCursor,
	}, nil
}

func (s *InMemoryAuthoringStore) Load(_ context.Context, machineID string) (*AuthoringMachineRecord, error) {
	if s == nil {
		return nil, fmt.Errorf("authoring store not configured")
	}
	machineID = strings.TrimSpace(machineID)
	if machineID == "" {
		return nil, nil
	}

	s.mu.RLock()
	defer s.mu.RUnlock()
	rec, ok := s.records[machineID]
	if !ok || rec == nil || rec.DeletedAt != nil {
		return nil, nil
	}
	return cloneAuthoringMachineRecord(rec)
}

func (s *InMemoryAuthoringStore) Save(_ context.Context, rec *AuthoringMachineRecord, expectedVersion string) (*AuthoringMachineRecord, error) {
	if s == nil {
		return nil, fmt.Errorf("authoring store not configured")
	}
	cloned, err := cloneAuthoringMachineRecord(rec)
	if err != nil {
		return nil, err
	}
	if cloned == nil {
		return nil, fmt.Errorf("authoring record required")
	}
	cloned.MachineID = strings.TrimSpace(cloned.MachineID)
	if cloned.MachineID == "" {
		return nil, fmt.Errorf("machine id required")
	}
	cloned.Version = strings.TrimSpace(cloned.Version)
	if cloned.Version == "" {
		return nil, fmt.Errorf("record version required")
	}
	if cloned.UpdatedAt.IsZero() {
		cloned.UpdatedAt = time.Now().UTC()
	}
	if cloned.Name == "" && cloned.Draft.Definition != nil {
		cloned.Name = strings.TrimSpace(cloned.Draft.Definition.Name)
	}
	if cloned.Name == "" {
		cloned.Name = cloned.MachineID
	}
	cloned.ETag = strings.TrimSpace(cloned.ETag)
	if cloned.ETag == "" {
		cloned.ETag = authoringETag(cloned.MachineID, cloned.Version)
	}

	expectedVersion = strings.TrimSpace(expectedVersion)

	s.mu.Lock()
	defer s.mu.Unlock()

	current := s.records[cloned.MachineID]
	if current != nil && current.DeletedAt != nil {
		current = nil
	}
	if expectedVersion != "" {
		if current == nil || strings.TrimSpace(current.Version) != expectedVersion {
			actual := ""
			if current != nil {
				actual = current.Version
			}
			return nil, authoringVersionConflictError(cloned.MachineID, expectedVersion, actual)
		}
	}
	s.records[cloned.MachineID] = cloned
	return cloneAuthoringMachineRecord(cloned)
}

func (s *InMemoryAuthoringStore) Delete(_ context.Context, machineID, expectedVersion string, hardDelete bool) (bool, error) {
	if s == nil {
		return false, fmt.Errorf("authoring store not configured")
	}
	machineID = strings.TrimSpace(machineID)
	if machineID == "" {
		return false, fmt.Errorf("machine id required")
	}
	expectedVersion = strings.TrimSpace(expectedVersion)

	s.mu.Lock()
	defer s.mu.Unlock()

	current := s.records[machineID]
	if current == nil || current.DeletedAt != nil {
		return false, nil
	}
	if expectedVersion != "" && strings.TrimSpace(current.Version) != expectedVersion {
		return false, authoringVersionConflictError(machineID, expectedVersion, current.Version)
	}
	if hardDelete {
		delete(s.records, machineID)
		return true, nil
	}
	now := time.Now().UTC()
	cp, err := cloneAuthoringMachineRecord(current)
	if err != nil {
		return false, err
	}
	cp.DeletedAt = &now
	s.records[machineID] = cp
	return true, nil
}

// AuthoringService implements authoring-domain lifecycle semantics on top of AuthoringStore.
type AuthoringService struct {
	store   AuthoringStore
	catalog *EditorCatalog
	clock   func() time.Time
}

// NewAuthoringService constructs an authoring-domain service boundary.
func NewAuthoringService(store AuthoringStore, catalog *EditorCatalog) *AuthoringService {
	return &AuthoringService{
		store:   store,
		catalog: catalog,
		clock: func() time.Time {
			return time.Now().UTC()
		},
	}
}

// WithClock overrides the service clock for deterministic tests.
func (s *AuthoringService) WithClock(clock func() time.Time) *AuthoringService {
	if s == nil {
		return nil
	}
	if clock == nil {
		s.clock = func() time.Time { return time.Now().UTC() }
		return s
	}
	s.clock = clock
	return s
}

func (s *AuthoringService) ListMachines(ctx context.Context, req FSMAuthoringListMachinesRequest) (FSMAuthoringListMachinesResponse, error) {
	if s == nil || s.store == nil {
		return FSMAuthoringListMachinesResponse{}, fmt.Errorf("authoring service not configured")
	}
	result, err := s.store.List(ctx, AuthoringListOptions{
		Query:         req.Query,
		IncludeDrafts: req.IncludeDrafts,
		Limit:         req.Limit,
		Cursor:        req.Cursor,
	})
	if err != nil {
		return FSMAuthoringListMachinesResponse{}, err
	}
	items := make([]FSMMachineSummary, 0, len(result.Items))
	for _, rec := range result.Items {
		if rec == nil {
			continue
		}
		name := strings.TrimSpace(rec.Name)
		if name == "" && rec.Draft.Definition != nil {
			name = strings.TrimSpace(rec.Draft.Definition.Name)
		}
		if name == "" {
			name = rec.MachineID
		}
		items = append(items, FSMMachineSummary{
			MachineID: rec.MachineID,
			Name:      name,
			Version:   rec.Version,
			IsDraft:   rec.Draft.DraftState.IsDraft,
			UpdatedAt: rec.UpdatedAt.UTC().Format(time.RFC3339),
		})
	}
	return FSMAuthoringListMachinesResponse{
		Items:      items,
		NextCursor: result.NextCursor,
	}, nil
}

func (s *AuthoringService) GetMachine(ctx context.Context, req FSMAuthoringGetMachineRequest) (FSMAuthoringGetMachineResponse, error) {
	if s == nil || s.store == nil {
		return FSMAuthoringGetMachineResponse{}, fmt.Errorf("authoring service not configured")
	}
	machineID := strings.TrimSpace(req.MachineID)
	rec, err := s.store.Load(ctx, machineID)
	if err != nil {
		return FSMAuthoringGetMachineResponse{}, err
	}
	if rec == nil {
		return FSMAuthoringGetMachineResponse{}, authoringNotFoundError(machineID)
	}
	if version := strings.TrimSpace(req.Version); version != "" && version != rec.Version {
		return FSMAuthoringGetMachineResponse{}, authoringNotFoundError(machineID)
	}

	diags := append([]ValidationDiagnostic(nil), rec.Diagnostics...)
	if len(diags) == 0 {
		diags = rec.Draft.Validate(s.catalog, nil)
	}
	return FSMAuthoringGetMachineResponse{
		MachineID:   rec.MachineID,
		Version:     rec.Version,
		Draft:       rec.Draft,
		Diagnostics: diags,
		ETag:        rec.ETag,
	}, nil
}

func (s *AuthoringService) SaveDraft(ctx context.Context, req FSMAuthoringSaveDraftRequest) (FSMAuthoringSaveDraftResponse, error) {
	if s == nil || s.store == nil {
		return FSMAuthoringSaveDraftResponse{}, fmt.Errorf("authoring service not configured")
	}
	now := s.now()
	machineID := authoringMachineIDFromDraft(req.MachineID, req.Draft.Definition)
	if machineID == "" {
		return FSMAuthoringSaveDraftResponse{}, fmt.Errorf("machine id required")
	}

	current, err := s.store.Load(ctx, machineID)
	if err != nil {
		return FSMAuthoringSaveDraftResponse{}, err
	}
	baseVersion := strings.TrimSpace(req.BaseVersion)
	if baseVersion != "" {
		if current == nil || current.Version != baseVersion {
			actual := ""
			if current != nil {
				actual = current.Version
			}
			return FSMAuthoringSaveDraftResponse{}, authoringVersionConflictError(machineID, baseVersion, actual)
		}
	}

	draft, err := normalizedDraftForPersist(req.Draft, machineID, now)
	if err != nil {
		return FSMAuthoringSaveDraftResponse{}, err
	}
	newVersion := nextAuthoringVersionFromCurrent(current, draft.Definition)
	if draft.Definition != nil {
		draft.Definition.ID = machineID
		draft.Definition.Name = normalizedMachineName(draft.Definition.Name, machineID)
		draft.Definition.Version = newVersion
	}

	validate := req.Validate == nil || *req.Validate
	diags := []ValidationDiagnostic{}
	if validate {
		diags = draft.Validate(s.catalog, nil)
	}

	rec := &AuthoringMachineRecord{
		MachineID:   machineID,
		Name:        machineNameFromDraft(draft, machineID),
		Version:     newVersion,
		ETag:        authoringETag(machineID, newVersion),
		Draft:       draft,
		Diagnostics: diags,
		UpdatedAt:   now,
	}
	if current != nil {
		rec.PublishedAt = cloneTimePtr(current.PublishedAt)
		if current.PublishedDefinition != nil {
			rec.PublishedDefinition, err = cloneMachineDefinition(current.PublishedDefinition)
			if err != nil {
				return FSMAuthoringSaveDraftResponse{}, err
			}
		}
	}
	persisted, err := s.store.Save(ctx, rec, baseVersion)
	if err != nil {
		return FSMAuthoringSaveDraftResponse{}, err
	}
	return FSMAuthoringSaveDraftResponse{
		MachineID:   persisted.MachineID,
		Version:     persisted.Version,
		DraftState:  persisted.Draft.DraftState,
		Diagnostics: append([]ValidationDiagnostic(nil), persisted.Diagnostics...),
		ETag:        persisted.ETag,
	}, nil
}

func (s *AuthoringService) Validate(ctx context.Context, req FSMAuthoringValidateRequest) (FSMAuthoringValidateResponse, error) {
	if s == nil || s.store == nil {
		return FSMAuthoringValidateResponse{}, fmt.Errorf("authoring service not configured")
	}
	var (
		draft DraftMachineDocument
		err   error
	)
	if req.Draft != nil {
		draft, err = normalizedDraftForPersist(*req.Draft, authoringMachineIDFromDraft(req.MachineID, req.Draft.Definition), s.now())
		if err != nil {
			return FSMAuthoringValidateResponse{}, err
		}
	} else {
		machineID := strings.TrimSpace(req.MachineID)
		rec, loadErr := s.store.Load(ctx, machineID)
		if loadErr != nil {
			return FSMAuthoringValidateResponse{}, loadErr
		}
		if rec == nil {
			return FSMAuthoringValidateResponse{}, authoringNotFoundError(machineID)
		}
		draft, err = cloneDraftMachineDocument(rec.Draft)
		if err != nil {
			return FSMAuthoringValidateResponse{}, err
		}
	}
	var scope *ValidationScope
	if req.Scope != nil {
		scope = &ValidationScope{NodeIDs: append([]string(nil), req.Scope.NodeIDs...)}
	}
	diags := draft.Validate(s.catalog, scope)
	valid := true
	for _, diag := range diags {
		if diag.Severity == SeverityError {
			valid = false
			break
		}
	}
	return FSMAuthoringValidateResponse{
		Valid:       valid,
		Diagnostics: diags,
	}, nil
}

func (s *AuthoringService) Publish(ctx context.Context, req FSMAuthoringPublishRequest) (FSMAuthoringPublishResponse, error) {
	if s == nil || s.store == nil {
		return FSMAuthoringPublishResponse{}, fmt.Errorf("authoring service not configured")
	}
	now := s.now()
	machineID := strings.TrimSpace(req.MachineID)
	if machineID == "" {
		machineID = authoringMachineIDFromDraft("", draftDefinition(req.Draft))
	}
	if machineID == "" {
		return FSMAuthoringPublishResponse{}, fmt.Errorf("machine id required")
	}

	current, err := s.store.Load(ctx, machineID)
	if err != nil {
		return FSMAuthoringPublishResponse{}, err
	}
	if current == nil {
		return FSMAuthoringPublishResponse{}, authoringNotFoundError(machineID)
	}
	expectedVersion := strings.TrimSpace(req.ExpectedVersion)
	if expectedVersion != "" && current.Version != expectedVersion {
		return FSMAuthoringPublishResponse{}, authoringVersionConflictError(machineID, expectedVersion, current.Version)
	}

	draft := current.Draft
	if req.Draft != nil {
		draft, err = normalizedDraftForPersist(*req.Draft, machineID, now)
		if err != nil {
			return FSMAuthoringPublishResponse{}, err
		}
	}
	diags := draft.Validate(s.catalog, nil)
	for _, diag := range diags {
		if diag.Severity == SeverityError {
			return FSMAuthoringPublishResponse{}, authoringValidationError(diags)
		}
	}

	newVersion := nextAuthoringVersion(current.Version)
	if draft.Definition != nil {
		draft.Definition.ID = machineID
		draft.Definition.Name = normalizedMachineName(draft.Definition.Name, machineID)
		draft.Definition.Version = newVersion
	}
	draft.DraftState.IsDraft = false
	draft.DraftState.LastSavedAt = now
	publishedDef, err := cloneMachineDefinition(draft.Definition)
	if err != nil {
		return FSMAuthoringPublishResponse{}, err
	}
	rec := &AuthoringMachineRecord{
		MachineID:           machineID,
		Name:                machineNameFromDraft(draft, machineID),
		Version:             newVersion,
		ETag:                authoringETag(machineID, newVersion),
		Draft:               draft,
		Diagnostics:         diags,
		UpdatedAt:           now,
		PublishedAt:         &now,
		PublishedDefinition: publishedDef,
	}
	persisted, err := s.store.Save(ctx, rec, current.Version)
	if err != nil {
		return FSMAuthoringPublishResponse{}, err
	}
	publishedAt := now
	if persisted.PublishedAt != nil {
		publishedAt = persisted.PublishedAt.UTC()
	}
	return FSMAuthoringPublishResponse{
		MachineID:   persisted.MachineID,
		Version:     persisted.Version,
		PublishedAt: publishedAt.Format(time.RFC3339),
		Diagnostics: append([]ValidationDiagnostic(nil), persisted.Diagnostics...),
	}, nil
}

func (s *AuthoringService) DeleteMachine(ctx context.Context, req FSMAuthoringDeleteMachineRequest) (FSMAuthoringDeleteMachineResponse, error) {
	if s == nil || s.store == nil {
		return FSMAuthoringDeleteMachineResponse{}, fmt.Errorf("authoring service not configured")
	}
	machineID := strings.TrimSpace(req.MachineID)
	if machineID == "" {
		return FSMAuthoringDeleteMachineResponse{}, fmt.Errorf("machine id required")
	}
	deleted, err := s.store.Delete(ctx, machineID, req.ExpectedVersion, req.HardDelete)
	if err != nil {
		return FSMAuthoringDeleteMachineResponse{}, err
	}
	if !deleted {
		return FSMAuthoringDeleteMachineResponse{}, authoringNotFoundError(machineID)
	}
	return FSMAuthoringDeleteMachineResponse{
		MachineID: machineID,
		Deleted:   true,
	}, nil
}

func (s *AuthoringService) now() time.Time {
	if s != nil && s.clock != nil {
		return s.clock().UTC()
	}
	return time.Now().UTC()
}

func normalizeAuthoringListLimit(limit *int) int {
	const (
		defaultLimit = 50
		maxLimit     = 200
	)
	if limit == nil {
		return defaultLimit
	}
	value := *limit
	if value <= 0 {
		return defaultLimit
	}
	if value > maxLimit {
		return maxLimit
	}
	return value
}

func decodeAuthoringCursor(cursor string) int {
	cursor = strings.TrimSpace(cursor)
	if cursor == "" {
		return 0
	}
	value, err := strconv.Atoi(cursor)
	if err != nil || value < 0 {
		return 0
	}
	return value
}

func nextAuthoringVersionFromCurrent(current *AuthoringMachineRecord, definition *MachineDefinition) string {
	if current != nil {
		return nextAuthoringVersion(current.Version)
	}
	if definition == nil {
		return "v1"
	}
	return normalizeAuthoringVersionSeed(definition.Version)
}

func nextAuthoringVersion(current string) string {
	current = strings.TrimSpace(current)
	if current == "" {
		return "v1"
	}
	base := strings.TrimRight(current, "0123456789")
	digits := strings.TrimPrefix(current, base)
	if digits == "" {
		if strings.EqualFold(current, "v") {
			return "v1"
		}
		return current + ".1"
	}
	value, err := strconv.Atoi(digits)
	if err != nil {
		return current + ".1"
	}
	if base == "" {
		base = "v"
	}
	return fmt.Sprintf("%s%d", base, value+1)
}

func normalizeAuthoringVersionSeed(seed string) string {
	seed = strings.TrimSpace(seed)
	if seed == "" {
		return "v1"
	}
	base := strings.TrimRight(seed, "0123456789")
	digits := strings.TrimPrefix(seed, base)
	if digits == "" {
		if strings.EqualFold(seed, "v") {
			return "v1"
		}
		return seed
	}
	if base == "" {
		base = "v"
	}
	value, err := strconv.Atoi(digits)
	if err != nil {
		return seed
	}
	return fmt.Sprintf("%s%d", base, value)
}

func authoringETag(machineID, version string) string {
	machineID = strings.TrimSpace(machineID)
	version = strings.TrimSpace(version)
	if machineID == "" && version == "" {
		return ""
	}
	if machineID == "" {
		return version
	}
	if version == "" {
		return machineID
	}
	return machineID + "-" + version
}

func authoringMachineIDFromDraft(machineID string, def *MachineDefinition) string {
	machineID = strings.TrimSpace(machineID)
	if machineID != "" {
		return machineID
	}
	if def == nil {
		return ""
	}
	if id := strings.TrimSpace(def.ID); id != "" {
		return id
	}
	if name := strings.TrimSpace(def.Name); name != "" {
		return name
	}
	return ""
}

func normalizedMachineName(name, machineID string) string {
	name = strings.TrimSpace(name)
	if name == "" {
		return strings.TrimSpace(machineID)
	}
	return name
}

func normalizedDraftForPersist(input DraftMachineDocument, machineID string, savedAt time.Time) (DraftMachineDocument, error) {
	draft, err := cloneDraftMachineDocument(input)
	if err != nil {
		return DraftMachineDocument{}, err
	}
	if draft.Definition == nil && draft.UISchema != nil {
		draft.Definition = MachineDefinitionFromUISchema(draft.UISchema, machineID, "")
	}
	if draft.Definition == nil {
		draft.Definition = &MachineDefinition{ID: machineID, Name: machineID}
	}
	draft.Definition.ID = machineID
	draft.Definition.Name = normalizedMachineName(draft.Definition.Name, machineID)
	draft.Definition = NormalizeMachineDefinition(draft.Definition)
	draft.DraftState.IsDraft = true
	draft.DraftState.LastSavedAt = savedAt.UTC()
	return draft, nil
}

func machineNameFromDraft(draft DraftMachineDocument, machineID string) string {
	if draft.Definition != nil {
		if name := strings.TrimSpace(draft.Definition.Name); name != "" {
			return name
		}
	}
	return strings.TrimSpace(machineID)
}

func cloneAuthoringMachineRecord(rec *AuthoringMachineRecord) (*AuthoringMachineRecord, error) {
	if rec == nil {
		return nil, nil
	}
	cp := *rec
	cp.MachineID = strings.TrimSpace(rec.MachineID)
	cp.Name = strings.TrimSpace(rec.Name)
	cp.Version = strings.TrimSpace(rec.Version)
	cp.ETag = strings.TrimSpace(rec.ETag)
	cp.Diagnostics = append([]ValidationDiagnostic(nil), rec.Diagnostics...)
	cp.UpdatedAt = rec.UpdatedAt.UTC()
	cp.PublishedAt = cloneTimePtr(rec.PublishedAt)
	cp.DeletedAt = cloneTimePtr(rec.DeletedAt)

	draft, err := cloneDraftMachineDocument(rec.Draft)
	if err != nil {
		return nil, err
	}
	cp.Draft = draft

	if rec.PublishedDefinition != nil {
		cp.PublishedDefinition, err = cloneMachineDefinition(rec.PublishedDefinition)
		if err != nil {
			return nil, err
		}
	}
	return &cp, nil
}

func cloneDraftMachineDocument(in DraftMachineDocument) (DraftMachineDocument, error) {
	var out DraftMachineDocument
	raw, err := json.Marshal(in)
	if err != nil {
		return out, err
	}
	if err := json.Unmarshal(raw, &out); err != nil {
		return out, err
	}
	return out, nil
}

func cloneMachineDefinition(def *MachineDefinition) (*MachineDefinition, error) {
	if def == nil {
		return nil, nil
	}
	raw, err := json.Marshal(def)
	if err != nil {
		return nil, err
	}
	var out MachineDefinition
	if err := json.Unmarshal(raw, &out); err != nil {
		return nil, err
	}
	return &out, nil
}

func cloneTimePtr(in *time.Time) *time.Time {
	if in == nil {
		return nil
	}
	value := in.UTC()
	return &value
}

func authoringVersionConflictError(machineID, expected, actual string) error {
	return cloneRuntimeError(ErrVersionConflict, "version conflict", nil, map[string]any{
		"machineId":       strings.TrimSpace(machineID),
		"expectedVersion": strings.TrimSpace(expected),
		"actualVersion":   strings.TrimSpace(actual),
	})
}

func authoringNotFoundError(machineID string) error {
	return cloneRuntimeError(ErrAuthoringNotFound, "machine not found", nil, map[string]any{
		"machineId": strings.TrimSpace(machineID),
	})
}

func authoringValidationError(diags []ValidationDiagnostic) error {
	return cloneRuntimeError(ErrAuthoringValidationFailed, "publish blocked by diagnostics", nil, map[string]any{
		"diagnostics": append([]ValidationDiagnostic(nil), diags...),
	})
}

func draftDefinition(draft *DraftMachineDocument) *MachineDefinition {
	if draft == nil {
		return nil
	}
	return draft.Definition
}

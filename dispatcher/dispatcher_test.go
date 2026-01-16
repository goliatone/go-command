package dispatcher

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"net/http/httptest"
	"strings"
	"sync"
	"testing"
	"time"

	"github.com/goliatone/go-command"
	"github.com/goliatone/go-command/router"
	gerrors "github.com/goliatone/go-errors"
)

type TestMessage struct {
	ID int
}

func (t TestMessage) Type() string { return "test" }

type CreateUserMessage struct {
	Email string
}

func (e CreateUserMessage) Type() string { return "user.create" }

type GetUserMessage struct {
	ID string
}

func (e GetUserMessage) Type() string { return "user.get" }

type User struct {
	ID    string
	Email string
}

type mockDB struct {
	mu           sync.RWMutex
	usersByID    map[string]*User // id -> user
	usersByEmail map[string]*User // email -> user
}

func newMockDB() *mockDB {
	return &mockDB{
		usersByID:    make(map[string]*User),
		usersByEmail: make(map[string]*User),
	}
}

func (m *mockDB) AddUser(u *User) {
	m.mu.Lock()
	defer m.mu.Unlock()
	m.usersByID[u.ID] = u
	m.usersByEmail[u.Email] = u
}

func (m *mockDB) GetUser(identifier string) (*User, bool) {
	m.mu.RLock()
	defer m.mu.RUnlock()

	if user, ok := m.usersByID[identifier]; ok {
		return user, true
	}

	if user, ok := m.usersByEmail[identifier]; ok {
		return user, true
	}

	return nil, false
}

type CreateUserHandler struct {
	db         *mockDB
	generateID func() string
}

func (h *CreateUserHandler) Execute(ctx context.Context, event CreateUserMessage) error {
	select {
	case <-ctx.Done():
		return ctx.Err()
	default:
		id := "user"
		if h.generateID != nil {
			id = h.generateID()
		}

		user := &User{
			ID:    id,
			Email: event.Email,
		}
		h.db.AddUser(user)
		return nil
	}
}

type GetUserHandler struct {
	db *mockDB
}

func (h *GetUserHandler) Query(ctx context.Context, event GetUserMessage) (*User, error) {
	select {
	case <-ctx.Done():
		return nil, ctx.Err()
	default:
		if user, ok := h.db.GetUser(event.ID); ok {
			return user, nil
		}

		return nil, errors.New("user not found")
	}
}

func TestCommandDispatcher(t *testing.T) {
	setTestMuxes(router.NewMux(), router.NewMux())
	t.Cleanup(func() { setTestMuxes(nil, nil) })

	t.Run("successful command execution", func(t *testing.T) {
		db := newMockDB()
		handler := &CreateUserHandler{db: db, generateID: func() string {
			return "user"
		}}

		SubscribeCommand(handler)

		err := Dispatch(context.Background(), CreateUserMessage{
			Email: "test@example.com",
		})

		if err != nil {
			t.Errorf("expected no error, got %v", err)
		}

		if user, exists := db.GetUser("test@example.com"); !exists {
			t.Error("user was not created")
		} else if user.Email != "test@example.com" {
			t.Errorf("expected email %s, got %s", "test@example.com", user.Email)
		}
	})

	t.Run("context cancellation", func(t *testing.T) {
		handler := command.CommandFunc[CreateUserMessage](func(ctx context.Context, e CreateUserMessage) error {
			select {
			case <-ctx.Done():
				return ctx.Err()
			case <-time.After(100 * time.Millisecond):
				return nil
			}
		})

		SubscribeCommand(handler)

		ctx, cancel := context.WithTimeout(context.Background(), 50*time.Millisecond)
		defer cancel()

		err := Dispatch(ctx, CreateUserMessage{Email: "test@example.com"})

		if !errors.Is(err, context.DeadlineExceeded) {
			t.Errorf("expected deadline exceeded error, got %v", err)
		}
	})

	t.Run("context cancellation will abort commands that do not handle it internally", func(t *testing.T) {
		handler := command.CommandFunc[CreateUserMessage](func(ctx context.Context, e CreateUserMessage) error {
			time.Sleep(100 * time.Millisecond)
			return nil
		})

		SubscribeCommand(handler)

		ctx, cancel := context.WithTimeout(context.Background(), 50*time.Millisecond)
		defer cancel()

		_ = Dispatch(ctx, CreateUserMessage{Email: "test@example.com"})

		err := Dispatch(ctx, CreateUserMessage{Email: "test@example.com"})

		if !errors.Is(err, context.DeadlineExceeded) {
			t.Errorf("expected deadline exceeded error, got %v", err)
		}
	})

	t.Run("exit on error", func(t *testing.T) {
		exitOneErr := ExitOnErr
		defer func(e bool) {
			ExitOnErr = e
		}(exitOneErr)
		ExitOnErr = true

		firstError := errors.New("handler error")
		var secondHandlerCalled bool

		SubscribeCommand(command.CommandFunc[CreateUserMessage](func(ctx context.Context, e CreateUserMessage) error {
			return firstError
		}))

		SubscribeCommand(command.CommandFunc[CreateUserMessage](func(ctx context.Context, e CreateUserMessage) error {
			secondHandlerCalled = true
			return nil
		}))

		err := Dispatch(context.Background(), CreateUserMessage{Email: "test@example.com"})

		var msgErr gerrors.Error
		if errors.Is(err, &msgErr) {
			t.Errorf("expected errors.Error, got %v", err)
		}

		if secondHandlerCalled {
			t.Error("second handler was called despite exitOnErr being true")
		}
	})
}

func TestDispatchErrorClassification(t *testing.T) {
	t.Run("validation errors are surfaced as validation failures", func(t *testing.T) {
		setTestMuxes(router.NewMux(), router.NewMux())
		t.Cleanup(func() { setTestMuxes(nil, nil) })

		validationErr := gerrors.NewValidation("missing fields", gerrors.FieldError{
			Field:   "email",
			Message: "required",
		})

		SubscribeCommand(command.CommandFunc[TestMessage](func(ctx context.Context, msg TestMessage) error {
			return validationErr
		}))

		err := Dispatch(context.Background(), TestMessage{ID: 1})
		if err == nil {
			t.Fatal("expected validation error")
		}

		var gerr *gerrors.Error
		if !gerrors.As(err, &gerr) {
			t.Fatalf("expected go-errors.Error, got %T", err)
		}

		if gerr.TextCode != "VALIDATION_FAILED" {
			t.Errorf("expected text code VALIDATION_FAILED, got %s", gerr.TextCode)
		}

		if gerr.Category != gerrors.CategoryValidation {
			t.Errorf("expected validation category, got %s", gerr.Category)
		}

		if gerr.Code != gerrors.CodeBadRequest {
			t.Errorf("expected HTTP code %d, got %d", gerrors.CodeBadRequest, gerr.Code)
		}
	})

	t.Run("non-validation errors remain handler execution failures", func(t *testing.T) {
		setTestMuxes(router.NewMux(), router.NewMux())
		t.Cleanup(func() { setTestMuxes(nil, nil) })

		SubscribeCommand(command.CommandFunc[TestMessage](func(ctx context.Context, msg TestMessage) error {
			return fmt.Errorf("boom")
		}))

		err := Dispatch(context.Background(), TestMessage{ID: 2})
		if err == nil {
			t.Fatal("expected handler error")
		}

		var gerr *gerrors.Error
		if !gerrors.As(err, &gerr) {
			t.Fatalf("expected go-errors.Error, got %T", err)
		}

		if gerr.TextCode != "HANDLER_EXECUTION_FAILED" {
			t.Errorf("expected text code HANDLER_EXECUTION_FAILED, got %s", gerr.TextCode)
		}

		if gerr.Category == gerrors.CategoryValidation {
			t.Errorf("expected non-validation category, got %s", gerr.Category)
		}
	})
}

func TestQueryDispatcher(t *testing.T) {
	setTestMuxes(router.NewMux(), router.NewMux())
	t.Cleanup(func() { setTestMuxes(nil, nil) })

	t.Run("successful query execution", func(t *testing.T) {
		db := newMockDB()
		db.AddUser(&User{ID: "user-123", Email: "test@example.com"})

		handler := &GetUserHandler{db: db}

		SubscribeQuery(handler)

		user, err := Query[GetUserMessage, *User](context.Background(), GetUserMessage{
			ID: "user-123",
		})

		if err != nil {
			t.Errorf("expected no error, got %v", err)
		}

		if user == nil {
			t.Error("expected user, got nil")
		} else if user.ID != "user-123" {
			t.Errorf("expected user ID %s, got %s", "user-123", user.ID)
		}
	})

	t.Run("not found error", func(t *testing.T) {
		db := newMockDB()
		handler := &GetUserHandler{db: db}

		SubscribeQuery(handler)

		_, err := Query[GetUserMessage, *User](context.Background(), GetUserMessage{
			ID: "non-existent",
		})

		if err == nil {
			t.Error("expected error, got nil")
		}
	})
}

func TestCommandAndQuerySameMessageType(t *testing.T) {
	setTestMuxes(router.NewMux(), router.NewMux())
	t.Cleanup(func() { setTestMuxes(nil, nil) })

	var dispatched bool
	cmd := command.CommandFunc[TestMessage](func(ctx context.Context, msg TestMessage) error {
		dispatched = true
		return nil
	})
	qry := command.QueryFunc[TestMessage, TestResponse](func(ctx context.Context, msg TestMessage) (TestResponse, error) {
		return TestResponse{Result: fmt.Sprintf("id:%d", msg.ID)}, nil
	})

	SubscribeCommand(cmd)
	SubscribeQuery(qry)

	if err := Dispatch(context.Background(), TestMessage{ID: 1}); err != nil {
		t.Fatalf("expected dispatch to succeed, got %v", err)
	}
	if !dispatched {
		t.Fatal("expected command handler to run")
	}

	resp, err := Query[TestMessage, TestResponse](context.Background(), TestMessage{ID: 2})
	if err != nil {
		t.Fatalf("expected query to succeed, got %v", err)
	}
	if resp.Result != "id:2" {
		t.Fatalf("expected query result id:2, got %s", resp.Result)
	}
}

// Example usage
// func Example() {
// 	// Initialize mock database
// 	db := newMockDB()

// 	// Register command handler
// 	createHandler := &CreateUserHandler{db: db}

// 	SubscribeCommand(createHandler)

// 	// Register query handler
// 	getHandler := &GetUserHandler{db: db}
// 	SubscribeQuery[GetUserMessage, *User](getHandler)

// 	// Create a user
// 	err := Dispatch(context.Background(), CreateUserMessage{
// 		Email: "john@example.com",
// 	})
// 	if err != nil {
// 		panic(err)
// 	}

// 	// Query the user
// 	user, err := Query[GetUserMessage, *User](context.Background(), GetUserMessage{
// 		ID: "user-123",
// 	})
// 	if err != nil {
// 		panic(err)
// 	}

// 	fmt.Printf("Found user: %s (%s)\n", user.Email, user.ID)
// 	// Output: Found user: john@example.com (user-123)
// }

// Example of using function adapters
// func ExampleCommandFunc() {

// 	// Command handler using CommandFunc
// 	SubscribeCommand(command.CommandFunc[CreateUserMessage](func(ctx context.Context, e CreateUserMessage) error {
// 		fmt.Printf("Creating user: %s\n", e.Email)
// 		return nil
// 	}))

// 	// Query handler using QueryFunc
// 	SubscribeQuery(command.QueryFunc[GetUserMessage, *User](
// 		func(ctx context.Context, e GetUserMessage) (*User, error) {
// 			return &User{ID: e.ID, Email: "john@example.com"}, nil
// 		}))

// 	// Use the handlers
// 	_ = Dispatch(context.Background(), CreateUserMessage{
// 		Email: "john@example.com",
// 	})

// 	user, _ := Query[GetUserMessage, *User](context.Background(), GetUserMessage{
// 		ID: "user-123",
// 	})

// 	fmt.Printf("Found user: %s\n", user.Email)
// 	// Output:
// 	// Creating user: john@example.com
// 	// Found user: john@example.com
// }

func TestHTTPIntegration(t *testing.T) {
	setTestMuxes(router.NewMux(), router.NewMux())
	t.Cleanup(func() { setTestMuxes(nil, nil) })

	db := newMockDB()

	var createdUserID string
	createHandler := &CreateUserHandler{
		db: db,
		generateID: func() string {
			id := fmt.Sprintf("user-%s", time.Now().Format("20060102150405.000"))
			createdUserID = id
			return id
		},
	}

	getHandler := &GetUserHandler{db: db}

	SubscribeCommand(createHandler)
	SubscribeQuery[GetUserMessage, *User](getHandler)

	mux := http.NewServeMux()

	mux.HandleFunc("/users", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
			return
		}

		var input struct {
			Email string `json:"email"`
		}
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		err := Dispatch(r.Context(), CreateUserMessage{
			Email: input.Email,
		})
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(map[string]string{"id": createdUserID})
	})

	mux.HandleFunc("/users/", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
			return
		}

		userID := strings.TrimPrefix(r.URL.Path, "/users/")
		if userID == "" {
			http.Error(w, "user id required", http.StatusBadRequest)
			return
		}

		user, err := Query[GetUserMessage, *User](r.Context(), GetUserMessage{
			ID: userID,
		})
		if err != nil {
			http.Error(w, err.Error(), http.StatusNotFound)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(user)
	})

	server := httptest.NewServer(mux)
	defer server.Close()

	t.Run("create user - success", func(t *testing.T) {
		payload := strings.NewReader(`{"email": "test@example.com"}`)
		resp, err := http.Post(server.URL+"/users", "application/json", payload)
		if err != nil {
			t.Fatalf("Failed to create user: %v", err)
		}
		defer resp.Body.Close()

		if resp.StatusCode != http.StatusCreated {
			t.Errorf("Expected status %d, got %d", http.StatusCreated, resp.StatusCode)
		}

		var result map[string]string
		if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
			t.Fatalf("Failed to decode response: %v", err)
		}
		if result["id"] == "" {
			t.Error("Expected user ID in response")
		}
	})

	t.Run("create user - invalid method", func(t *testing.T) {
		resp, err := http.Get(server.URL + "/users")
		if err != nil {
			t.Fatalf("Request failed: %v", err)
		}
		defer resp.Body.Close()

		if resp.StatusCode != http.StatusMethodNotAllowed {
			t.Errorf("Expected status %d, got %d", http.StatusMethodNotAllowed, resp.StatusCode)
		}
	})

	t.Run("create user - invalid payload", func(t *testing.T) {
		payload := strings.NewReader(`{invalid json}`)
		resp, err := http.Post(server.URL+"/users", "application/json", payload)
		if err != nil {
			t.Fatalf("Request failed: %v", err)
		}
		defer resp.Body.Close()

		if resp.StatusCode != http.StatusBadRequest {
			t.Errorf("Expected status %d, got %d", http.StatusBadRequest, resp.StatusCode)
		}
	})

	t.Run("get user - success", func(t *testing.T) {
		// First create a user
		email := "get@example.com"
		payload := strings.NewReader(fmt.Sprintf(`{"email": "%s"}`, email))
		resp, err := http.Post(server.URL+"/users", "application/json", payload)
		if err != nil {
			t.Fatalf("Failed to create user: %v", err)
		}

		var createResult map[string]string
		if err := json.NewDecoder(resp.Body).Decode(&createResult); err != nil {
			t.Fatalf("Failed to decode create response: %v", err)
		}
		resp.Body.Close()

		userID := createResult["id"]
		if userID == "" {
			t.Fatal("No user ID returned from create")
		}

		// Then try to get the user
		resp, err = http.Get(server.URL + "/users/" + userID)
		if err != nil {
			t.Fatalf("Failed to get user: %v", err)
		}
		defer resp.Body.Close()

		if resp.StatusCode != http.StatusOK {
			t.Errorf("Expected status %d, got %d", http.StatusOK, resp.StatusCode)
		}

		var user User
		if err := json.NewDecoder(resp.Body).Decode(&user); err != nil {
			t.Fatalf("Failed to decode response: %v", err)
		}

		if user.ID != userID {
			t.Errorf("Expected user ID '%s', got '%s'", userID, user.ID)
		}
		if user.Email != email {
			t.Errorf("Expected email '%s', got '%s'", email, user.Email)
		}
	})

	t.Run("get user - not found", func(t *testing.T) {
		resp, err := http.Get(server.URL + "/users/non-existent")
		if err != nil {
			t.Fatalf("Request failed: %v", err)
		}
		defer resp.Body.Close()

		if resp.StatusCode != http.StatusNotFound {
			t.Errorf("Expected status %d, got %d", http.StatusNotFound, resp.StatusCode)
		}
	})

	t.Run("get user - invalid method", func(t *testing.T) {
		payload := strings.NewReader(`{"email": "post@example.com"}`)
		resp, err := http.Post(server.URL+"/users/123", "application/json", payload)
		if err != nil {
			t.Fatalf("Request failed: %v", err)
		}
		defer resp.Body.Close()

		if resp.StatusCode != http.StatusMethodNotAllowed {
			t.Errorf("Expected status %d, got %d", http.StatusMethodNotAllowed, resp.StatusCode)
		}
	})

	t.Run("get user - missing ID", func(t *testing.T) {
		resp, err := http.Get(server.URL + "/users/")
		if err != nil {
			t.Fatalf("Request failed: %v", err)
		}
		defer resp.Body.Close()

		if resp.StatusCode != http.StatusBadRequest {
			t.Errorf("Expected status %d, got %d", http.StatusBadRequest, resp.StatusCode)
		}
	})
}

// func ExampleHTTPIntegration() {
// 	Default = NewDispatcher()

// 	db := newMockDB()

// 	// Register handlers
// 	SubscribeCommand(&CreateUserHandler{db: db})
// 	SubscribeQuery[GetUserMessage, *User](&GetUserHandler{db: db})

// 	// HTTP handler for creating users
// 	createUserHandler := func(w http.ResponseWriter, r *http.Request) {
// 		if r.Method != http.MethodPost {
// 			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
// 			return
// 		}

// 		var input struct {
// 			Email string `json:"email"`
// 		}
// 		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
// 			http.Error(w, err.Error(), http.StatusBadRequest)
// 			return
// 		}

// 		err := Dispatch(r.Context(), CreateUserMessage{
// 			Email: input.Email,
// 		})
// 		if err != nil {
// 			http.Error(w, err.Error(), http.StatusInternalServerError)
// 			return
// 		}

// 		w.WriteHeader(http.StatusCreated)
// 	}

// 	// HTTP handler for getting users
// 	getUserHandler := func(w http.ResponseWriter, r *http.Request) {
// 		if r.Method != http.MethodGet {
// 			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
// 			return
// 		}

// 		// Get userID from URL path
// 		userID := strings.TrimPrefix(r.URL.Path, "/users/")
// 		if userID == "" {
// 			http.Error(w, "user id required", http.StatusBadRequest)
// 			return
// 		}

// 		user, err := Query[GetUserMessage, *User](r.Context(), GetUserMessage{
// 			ID: userID,
// 		})
// 		if err != nil {
// 			http.Error(w, err.Error(), http.StatusNotFound)
// 			return
// 		}

// 		w.Header().Set("Content-Type", "application/json")
// 		json.NewEncoder(w).Encode(user)
// 	}

// 	// Setup routes using standard http
// 	mux := http.NewServeMux()
// 	mux.HandleFunc("/users", createUserHandler) // POST /users
// 	mux.HandleFunc("/users/", getUserHandler)   // GET /users/{id}

// 	// Start server
// 	srv := &http.Server{
// 		Addr:    ":8080",
// 		Handler: mux,
// 	}

// 	log.Printf("Server starting on :8080")
// 	if err := srv.ListenAndServe(); err != nil {
// 		log.Fatal(err)
// 	}
// }

/////

type TestPointerMessage struct {
	Value string
}

func (t *TestPointerMessage) Type() string {
	return "test_pointer"
}

type TestValueMessage struct {
	Value string
}

func (t TestValueMessage) Type() string {
	return "test_value"
}

type TestResponse struct {
	Result string
}

func TestMessageValidation(t *testing.T) {
	tests := []struct {
		name    string
		msg     command.Message
		wantErr bool
	}{
		{
			name:    "valid pointer message",
			msg:     &TestPointerMessage{Value: "test"},
			wantErr: false,
		},
		{
			name:    "nil pointer message",
			msg:     (*TestPointerMessage)(nil),
			wantErr: true,
		},
		{
			name:    "valid value message",
			msg:     TestValueMessage{Value: "test"},
			wantErr: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := command.ValidateMessage(tt.msg)
			if (err != nil) != tt.wantErr {
				t.Errorf("ValidateMessage() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}

func TestDispatchWithPointers(t *testing.T) {
	setTestMuxes(router.NewMux(), router.NewMux())
	t.Cleanup(func() { setTestMuxes(nil, nil) })

	commandHandler := command.CommandFunc[*TestPointerMessage](func(ctx context.Context, msg *TestPointerMessage) error {
		msg.Value = "handled"
		return nil
	})

	sub := SubscribeCommand(commandHandler)
	defer sub.Unsubscribe()

	// Test with valid pointer
	msg := &TestPointerMessage{Value: "test"}
	err := Dispatch(context.Background(), msg)
	if err != nil {
		t.Errorf("Dispatch() error = %v", err)
	}
	if msg.Value != "handled" {
		t.Errorf("Message not modified, value = %v", msg.Value)
	}

	// Test with nil pointer
	var nilMsg *TestPointerMessage
	err = Dispatch(context.Background(), nilMsg)
	if err == nil {
		t.Error("Dispatch() expected error for nil message")
	}
}

func TestQueryWithPointers(t *testing.T) {
	setTestMuxes(router.NewMux(), router.NewMux())
	t.Cleanup(func() { setTestMuxes(nil, nil) })

	queryHandler := command.QueryFunc[*TestPointerMessage, TestResponse](func(ctx context.Context, msg *TestPointerMessage) (TestResponse, error) {
		msg.Value = "queried"
		return TestResponse{Result: "success"}, nil
	})

	sub := SubscribeQuery(queryHandler)
	defer sub.Unsubscribe()

	// Test with valid pointer
	msg := &TestPointerMessage{Value: "test"}
	resp, err := Query[*TestPointerMessage, TestResponse](context.Background(), msg)
	if err != nil {
		t.Errorf("Query() error = %v", err)
	}
	if msg.Value != "queried" {
		t.Errorf("Message not modified, value = %v", msg.Value)
	}
	if resp.Result != "success" {
		t.Errorf("Unexpected response = %v", resp)
	}

	// Test with nil pointer
	var nilMsg *TestPointerMessage
	_, err = Query[*TestPointerMessage, TestResponse](context.Background(), nilMsg)
	if err == nil {
		t.Error("Query() expected error for nil message")
	}
}

type messageTyper interface {
	Type() string
}

// command.Message implementation
type extMessage struct {
}

func (m extMessage) Type() string {
	return "ext_message"
}

// command.Message implementation
type mockMessage struct {
	typeName string
}

func (m mockMessage) Type() string {
	return m.typeName
}

// pointer struct
type ptrMockMessage struct {
	typeName string
}

func (m *ptrMockMessage) Type() string {
	return m.typeName
}

// struct that doesnt impelment Message
type regularStruct struct {
	Name string
}

func TestGetType(t *testing.T) {
	var _ messageTyper = mockMessage{typeName: "test"}
	var _ messageTyper = &ptrMockMessage{typeName: "test"}

	tests := []struct {
		name     string
		input    any
		expected string
		setup    func(t *testing.T) any
	}{
		{
			name:     "Nil value",
			expected: "unknown_type",
			setup: func(t *testing.T) any {
				return nil
			},
		},
		{
			name:     "Struct implementing command.Message",
			expected: "ext_message",
			setup: func(t *testing.T) any {
				return extMessage{}
			},
		},
		{
			name:     "Struct implementing command.Message",
			expected: "mock_message_type",
			setup: func(t *testing.T) any {
				return mockMessage{typeName: "mock_message_type"}
			},
		},
		{
			name:     "Pointer to struct implementing command.Message",
			expected: "ptr_mock_message_type",
			setup: func(t *testing.T) any {
				return &ptrMockMessage{typeName: "ptr_mock_message_type"}
			},
		},
		{
			name:     "Nil pointer to struct implementing command.Message",
			expected: "",
			setup: func(t *testing.T) any {
				return (*ptrMockMessage)(nil)
			},
		},
		{
			name:     "Regular struct",
			expected: "dispatcher::dispatcher.regular_struct",
			setup: func(t *testing.T) any {
				return regularStruct{Name: "test"}
			},
		},
		{
			name:     "String",
			expected: "string",
			setup: func(t *testing.T) any {
				return "test_string"
			},
		},
		{
			name:     "Integer",
			expected: "int",
			setup: func(t *testing.T) any {
				return 42
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			input := tt.setup(t)
			result := command.GetMessageType(input)
			if result != tt.expected {
				t.Errorf("getType(%v) = %s, expected %s", input, result, tt.expected)
			}
		})
	}
}

func TestGetTypeWithGenericTypes(t *testing.T) {
	// generic with struct type
	t.Run("Generic with struct", func(t *testing.T) {
		var structMsg regularStruct
		result := command.GetMessageType(structMsg)
		expected := "dispatcher::dispatcher.regular_struct"
		if result != expected {
			t.Errorf("getType(regularStruct{}) = %s, expected %s", result, expected)
		}
	})

	// generic with nil pointer
	t.Run("Generic with nil pointer", func(t *testing.T) {
		var ptrMsg *ptrMockMessage
		result := command.GetMessageType(ptrMsg)
		expected := ""
		if result != expected {
			t.Errorf("getType(nil *ptrMockMessage) = %s, expected %s", result, expected)
		}
	})

	// generic with zero value that implements messageTyper
	t.Run("Generic with message implementation", func(t *testing.T) {
		msg := mockMessage{typeName: ""}
		result := command.GetMessageType(msg)
		expected := "" // Type() method returns empty string
		if result != expected {
			t.Errorf("getType(mockMessage{typeName:\"\"}) = %s, expected %s", result, expected)
		}
	})
}

func TestSubscribeCommandSimulation(t *testing.T) {
	// var msg T where T is the struct commands.InboxStartServiceMessage
	var msg regularStruct

	result := command.GetMessageType(msg)

	expected := "dispatcher::dispatcher.regular_struct"
	if result != expected {
		t.Errorf("getType = %s, expected %s", result, expected)
	}
}

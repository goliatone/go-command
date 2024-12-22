package dispatcher

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"net/http/httptest"
	"strings"
	"sync"
	"testing"
	"time"

	"github.com/goliatone/command"
)

// Test Events
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

// Mock implementations
type mockDB struct {
	users     map[string]*User // email -> user
	usersByID map[string]*User // id -> user
	mu        sync.RWMutex
}

func newMockDB() *mockDB {
	return &mockDB{
		users:     make(map[string]*User),
		usersByID: make(map[string]*User),
	}
}

// Test handlers
type CreateUserHandler struct {
	db         *mockDB
	generateID func() string
}

func (h *CreateUserHandler) Execute(ctx context.Context, event CreateUserMessage) error {
	select {
	case <-ctx.Done():
		return ctx.Err()
	default:
		h.db.mu.Lock()
		defer h.db.mu.Unlock()

		user := &User{
			ID:    h.generateID(),
			Email: event.Email,
		}
		h.db.users[event.Email] = user
		h.db.usersByID[user.ID] = user
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
		h.db.mu.RLock()
		defer h.db.mu.RUnlock()

		if user, ok := h.db.usersByID[event.ID]; ok {
			return user, nil
		}
		return nil, errors.New("user not found")
	}
}

// Tests
func TestCommandDispatcher(t *testing.T) {
	t.Run("successful command execution", func(t *testing.T) {
		db := newMockDB()
		handler := &CreateUserHandler{db: db}

		SubscribeCommand(handler)

		err := Dispatch(context.Background(), CreateUserMessage{
			Email: "test@example.com",
		})

		if err != nil {
			t.Errorf("expected no error, got %v", err)
		}

		if user, exists := db.users["test@example.com"]; !exists {
			t.Error("user was not created")
		} else if user.Email != "test@example.com" {
			t.Errorf("expected email %s, got %s", "test@example.com", user.Email)
		}
	})

	t.Run("context cancellation", func(t *testing.T) {
		handler := command.CommandFunc[CreateUserMessage](func(ctx context.Context, e CreateUserMessage) error {
			time.Sleep(100 * time.Millisecond)
			return nil
		})

		SubscribeCommand(handler)

		ctx, cancel := context.WithTimeout(context.Background(), 50*time.Millisecond)
		defer cancel()

		err := Dispatch(ctx, CreateUserMessage{Email: "test@example.com"})

		if !errors.Is(err, context.DeadlineExceeded) {
			t.Errorf("expected deadline exceeded error, got %v", err)
		}
	})

	t.Run("exit on error", func(t *testing.T) {
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

		var msgErr *command.Error
		if !errors.As(err, &msgErr) {
			t.Errorf("expected EventError, got %v", err)
		}

		if secondHandlerCalled {
			t.Error("second handler was called despite exitOnErr being true")
		}
	})
}

func TestQueryDispatcher(t *testing.T) {
	t.Run("successful query execution", func(t *testing.T) {
		db := newMockDB()
		db.users["test@example.com"] = &User{ID: "user-123", Email: "test@example.com"}

		handler := &GetUserHandler{db: db}

		SubscribeQuery[GetUserMessage, *User](handler)

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

		SubscribeQuery[GetUserMessage, *User](handler)

		_, err := Query[GetUserMessage, *User](context.Background(), GetUserMessage{
			ID: "non-existent",
		})

		if err == nil {
			t.Error("expected error, got nil")
		}
	})
}

// Example usage
func Example() {
	// Initialize mock database
	db := newMockDB()

	// Register command handler
	createHandler := &CreateUserHandler{db: db}
	SubscribeCommand(createHandler)

	// Register query handler
	getHandler := &GetUserHandler{db: db}
	SubscribeQuery[GetUserMessage, *User](getHandler)

	// Create a user
	err := Dispatch(context.Background(), CreateUserMessage{
		Email: "john@example.com",
	})
	if err != nil {
		panic(err)
	}

	// Query the user
	user, err := Query[GetUserMessage, *User](context.Background(), GetUserMessage{
		ID: "user-123",
	})
	if err != nil {
		panic(err)
	}

	fmt.Printf("Found user: %s (%s)\n", user.Email, user.ID)
	// Output: Found user: john@example.com (user-123)
}

// Example of using function adapters
func ExampleCommandFunc() {

	// Command handler using CommandFunc
	SubscribeCommand(command.CommandFunc[CreateUserMessage](func(ctx context.Context, e CreateUserMessage) error {
		fmt.Printf("Creating user: %s\n", e.Email)
		return nil
	}))

	// Query handler using QueryFunc
	SubscribeQuery[GetUserMessage, *User](command.QueryFunc[GetUserMessage, *User](
		func(ctx context.Context, e GetUserMessage) (*User, error) {
			return &User{ID: e.ID, Email: "john@example.com"}, nil
		}))

	// Use the handlers
	_ = Dispatch(context.Background(), CreateUserMessage{
		Email: "john@example.com",
	})

	user, _ := Query[GetUserMessage, *User](context.Background(), GetUserMessage{
		ID: "user-123",
	})

	fmt.Printf("Found user: %s\n", user.Email)
	// Output:
	// Creating user: john@example.com
	// Found user: john@example.com
}

func TestHTTPIntegration(t *testing.T) {
	// Initialize test environment
	db := newMockDB()

	// Track created user IDs for verification
	var createdUserID string
	createHandler := &CreateUserHandler{
		db: db,
		generateID: func() string {
			id := fmt.Sprintf("user-%s", time.Now().Format("20060102150405.000"))
			createdUserID = id // Save for verification
			return id
		},
	}

	getHandler := &GetUserHandler{db: db}

	SubscribeCommand(createHandler)
	SubscribeQuery[GetUserMessage, *User](getHandler)

	// Create HTTP server
	mux := http.NewServeMux()

	// HTTP handler for creating users
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

		// Return the created user ID
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(map[string]string{"id": createdUserID})
	})

	// HTTP handler for getting users
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

	// Create test server
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

func ExampleHTTPIntegration() {
	db := newMockDB()

	// Register handlers
	SubscribeCommand(&CreateUserHandler{db: db})
	SubscribeQuery[GetUserMessage, *User](&GetUserHandler{db: db})

	// HTTP handler for creating users
	createUserHandler := func(w http.ResponseWriter, r *http.Request) {
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

		w.WriteHeader(http.StatusCreated)
	}

	// HTTP handler for getting users
	getUserHandler := func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
			return
		}

		// Get userID from URL path
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
	}

	// Setup routes using standard http
	mux := http.NewServeMux()
	mux.HandleFunc("/users", createUserHandler) // POST /users
	mux.HandleFunc("/users/", getUserHandler)   // GET /users/{id}

	// Start server
	srv := &http.Server{
		Addr:    ":8080",
		Handler: mux,
	}

	log.Printf("Server starting on :8080")
	if err := srv.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}

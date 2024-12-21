package dispatcher

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"strings"
	"testing"
	"time"
)

// Test Events
type CreateUserEvent struct {
	Email string
}

func (e CreateUserEvent) Type() string { return "user.create" }

type GetUserEvent struct {
	ID string
}

func (e GetUserEvent) Type() string { return "user.get" }

type User struct {
	ID    string
	Email string
}

// Mock implementations
type mockDB struct {
	users map[string]*User
}

func newMockDB() *mockDB {
	return &mockDB{users: make(map[string]*User)}
}

// Test handlers
type CreateUserHandler struct {
	db *mockDB
}

func (h *CreateUserHandler) Execute(ctx context.Context, event CreateUserEvent) error {
	select {
	case <-ctx.Done():
		return ctx.Err()
	default:
		h.db.users[event.Email] = &User{
			ID:    "user-123",
			Email: event.Email,
		}
		return nil
	}
}

type GetUserHandler struct {
	db *mockDB
}

func (h *GetUserHandler) Query(ctx context.Context, event GetUserEvent) (*User, error) {
	select {
	case <-ctx.Done():
		return nil, ctx.Err()
	default:
		for _, user := range h.db.users {
			if user.ID == event.ID {
				return user, nil
			}
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

		err := Dispatch(context.Background(), CreateUserEvent{
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
		handler := CommandFunc[CreateUserEvent](func(ctx context.Context, e CreateUserEvent) error {
			time.Sleep(100 * time.Millisecond)
			return nil
		})

		SubscribeCommand(handler)

		ctx, cancel := context.WithTimeout(context.Background(), 50*time.Millisecond)
		defer cancel()

		err := Dispatch(ctx, CreateUserEvent{Email: "test@example.com"})

		if !errors.Is(err, context.DeadlineExceeded) {
			t.Errorf("expected deadline exceeded error, got %v", err)
		}
	})

	t.Run("exit on error", func(t *testing.T) {
		firstError := errors.New("handler error")

		var secondHandlerCalled bool

		SubscribeCommand(CommandFunc[CreateUserEvent](func(ctx context.Context, e CreateUserEvent) error {
			return firstError
		}))

		SubscribeCommand(CommandFunc[CreateUserEvent](func(ctx context.Context, e CreateUserEvent) error {
			secondHandlerCalled = true
			return nil
		}))

		err := Dispatch(context.Background(), CreateUserEvent{Email: "test@example.com"})

		var msgErr *MessageError
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

		SubscribeQuery[GetUserEvent, *User](handler)

		user, err := Query[GetUserEvent, *User](context.Background(), GetUserEvent{
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

		SubscribeQuery[GetUserEvent, *User](handler)

		_, err := Query[GetUserEvent, *User](context.Background(), GetUserEvent{
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
	SubscribeQuery[GetUserEvent, *User](getHandler)

	// Create a user
	err := Dispatch(context.Background(), CreateUserEvent{
		Email: "john@example.com",
	})
	if err != nil {
		panic(err)
	}

	// Query the user
	user, err := Query[GetUserEvent, *User](context.Background(), GetUserEvent{
		ID: "user-123",
	})
	if err != nil {
		panic(err)
	}

	fmt.Printf("Found user: %s (%s)\n", user.Email, user.ID)
	// Output: Found user: john@example.com (user-123)
}

// Example of using function adapters
func ExampleFunctionAdapters() {

	// Command handler using CommandFunc
	SubscribeCommand(CommandFunc[CreateUserEvent](func(ctx context.Context, e CreateUserEvent) error {
		fmt.Printf("Creating user: %s\n", e.Email)
		return nil
	}))

	// Query handler using QueryFunc
	SubscribeQuery[GetUserEvent, *User](QueryFunc[GetUserEvent, *User](
		func(ctx context.Context, e GetUserEvent) (*User, error) {
			return &User{ID: e.ID, Email: "john@example.com"}, nil
		}))

	// Use the handlers
	_ = Dispatch(context.Background(), CreateUserEvent{
		Email: "john@example.com",
	})

	user, _ := Query[GetUserEvent, *User](context.Background(), GetUserEvent{
		ID: "user-123",
	})

	fmt.Printf("Found user: %s\n", user.Email)
	// Output:
	// Creating user: john@example.com
	// Found user: john@example.com
}

func ExampleHTTPIntegration() {
	db := newMockDB()

	// Register handlers
	SubscribeCommand(&CreateUserHandler{db: db})
	SubscribeQuery[GetUserEvent, *User](&GetUserHandler{db: db})

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

		err := Dispatch(r.Context(), CreateUserEvent{
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

		user, err := Query[GetUserEvent, *User](r.Context(), GetUserEvent{
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

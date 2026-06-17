package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/goliatone/go-router"
)

func main() {
	ctx := context.Background()

	app, err := NewApp(ctx)
	if err != nil {
		log.Fatalf("failed to initialize app: %v", err)
	}

	srv := buildServer()
	if err := app.SetupRoutes(srv.Router()); err != nil {
		log.Fatalf("failed to setup routes: %v", err)
	}

	addr := ":8185"
	log.Printf("Starting FSM UI Builder Web Chat Demo on %s", addr)
	log.Printf("Open http://localhost%s in your browser", addr)

	go func() {
		if err := srv.Serve(addr); err != nil {
			log.Fatalf("server exited with error: %v", err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("Shutting down server...")
	shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := srv.Shutdown(shutdownCtx); err != nil {
		log.Printf("shutdown error: %v", err)
	} else {
		log.Println("Server stopped gracefully")
	}
}

func buildServer() router.Server[*fiber.App] {
	return router.NewFiberAdapter(func(*fiber.App) *fiber.App {
		app := fiber.New(fiber.Config{
			AppName:           "FSM UI Builder Web Chat Demo",
			PassLocalsToViews: true,
		})
		app.Use(logger.New())
		app.Use(cors.New())
		return app
	})
}

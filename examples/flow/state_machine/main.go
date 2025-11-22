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
		log.Fatalf("failed to create app: %v", err)
	}

	srv := buildServer()
	app.SetupRoutes(srv.Router())

	addr := ":8080"
	log.Printf("Starting Order State Machine Demo on %s", addr)
	log.Printf("Open http://localhost%s in your browser", addr)

	go func() {
		if err := srv.Serve(addr); err != nil {
			log.Fatalf("failed to start server: %v", err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("Shutting down server...")
	shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := srv.Shutdown(shutdownCtx); err != nil {
		log.Printf("Server shutdown error: %v", err)
	} else {
		log.Println("Server stopped gracefully")
	}
}

func buildServer() router.Server[*fiber.App] {
	srv := router.NewFiberAdapter(func(*fiber.App) *fiber.App {
		app := fiber.New(fiber.Config{
			AppName:           "Order State Machine Demo",
			PassLocalsToViews: true,
		})

		app.Use(logger.New())
		app.Use(cors.New())

		return app
	})

	return srv
}

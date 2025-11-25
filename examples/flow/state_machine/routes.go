package main

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/goliatone/go-router"
)

func (a *App) SetupRoutes(r router.Router[*fiber.App]) {
	// Static assets
	r.Static("/public", "./public")

	// Serve index.html at root
	r.Get("/", a.serveIndex)

	// API routes
	api := r.Group("/api")
	api.Get("/orders", a.ListOrders)
	api.Get("/orders/:id", a.GetOrderByID)
	api.Post("/orders", a.CreateOrderHandler)
	api.Post("/orders/:id/transition", a.TransitionOrder)
	api.Get("/orders/:id/transitions", a.GetAvailableTransitionsHandler)
	api.Get("/config", a.GetConfig)
	api.Get("/audit-log", a.GetAuditLogHandler)
}

func (a *App) serveIndex(c router.Context) error {
	content, err := os.ReadFile("./public/index.html")
	if err != nil {
		return c.SendStatus(404)
	}
	c.SetHeader("Content-Type", "text/html")
	return c.Send(content)
}

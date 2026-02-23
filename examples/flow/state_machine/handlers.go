package main

import (
	"net/http"

	"github.com/goliatone/go-router"
	"github.com/google/uuid"
)

func (a *App) ListOrders(c router.Context) error {
	orders := a.GetOrders()
	return c.JSON(http.StatusOK, map[string]any{
		"orders": orders,
	})
}

func (a *App) GetOrderByID(c router.Context) error {
	id := c.Param("id", "")
	if id == "" {
		return c.JSON(http.StatusBadRequest, map[string]any{
			"error": "id required",
		})
	}

	order := a.GetOrder(id)
	if order == nil {
		return c.JSON(http.StatusNotFound, map[string]any{
			"error": "order not found",
		})
	}

	return c.JSON(http.StatusOK, map[string]any{
		"order": order,
	})
}

func (a *App) CreateOrderHandler(c router.Context) error {
	var req struct {
		ID string `json:"id"`
	}

	// Try to bind, but don't fail if body is empty
	_ = c.Bind(&req)

	// Generate ID if not provided
	if req.ID == "" {
		req.ID = "ORD-" + uuid.New().String()[:8]
	}

	order, err := a.CreateOrder(req.ID)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]any{
			"error": err.Error(),
		})
	}

	return c.JSON(http.StatusCreated, map[string]any{
		"order": order,
	})
}

func (a *App) TransitionOrder(c router.Context) error {
	id := c.Param("id", "")
	if id == "" {
		return c.JSON(http.StatusBadRequest, map[string]any{
			"error": "id required",
		})
	}

	var req struct {
		Event string `json:"event"`
		Admin bool   `json:"admin"`
	}
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]any{
			"error": "invalid request",
		})
	}

	if req.Event == "" {
		return c.JSON(http.StatusBadRequest, map[string]any{
			"error": "event required",
		})
	}

	if err := a.Transition(id, req.Event, req.Admin); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]any{
			"error": err.Error(),
		})
	}

	order := a.GetOrder(id)

	// Verify state is in sync
	ctx := c.Context()
	rec, _ := a.StateStore.Load(ctx, id)
	storeState := ""
	if rec != nil {
		storeState = rec.State
	}
	if storeState != order.State {
		return c.JSON(http.StatusInternalServerError, map[string]any{
			"error": "state desync: order.State=" + order.State + " store=" + storeState,
		})
	}

	return c.JSON(http.StatusOK, map[string]any{
		"order": order,
	})
}

func (a *App) GetAvailableTransitionsHandler(c router.Context) error {
	id := c.Param("id", "")
	if id == "" {
		return c.JSON(http.StatusBadRequest, map[string]any{
			"error": "id required",
		})
	}

	admin := c.Query("admin") == "true"
	transitions := a.GetAvailableTransitions(id, admin)

	return c.JSON(http.StatusOK, map[string]any{
		"transitions": transitions,
	})
}

func (a *App) GetConfig(c router.Context) error {
	return c.JSON(http.StatusOK, map[string]any{
		"entity":      a.Config.Entity,
		"states":      a.Config.States,
		"transitions": a.Config.Transitions,
	})
}

func (a *App) GetAuditLogHandler(c router.Context) error {
	log := a.GetAuditLog()
	return c.JSON(http.StatusOK, map[string]any{
		"log": log,
	})
}

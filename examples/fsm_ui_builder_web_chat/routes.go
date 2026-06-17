package main

import (
	"io/fs"
	"mime"
	"net/http"
	"os"
	"path"
	"strings"

	"github.com/gofiber/fiber/v2"
	clientdata "github.com/goliatone/go-command/data"
	builderdata "github.com/goliatone/go-command/data/builder"
	"github.com/goliatone/go-router"
	"github.com/goliatone/go-router/rpcfiber"
)

func (a *App) SetupRoutes(r router.Router[*fiber.App]) error {
	if err := rpcfiber.MountFiber(r, a.rpcServer); err != nil {
		return err
	}

	r.Static("/public", "./public")
	r.Get("/", a.handleIndex)
	r.Get("/favicon.ico", a.handleFavicon)
	r.Get("/api/bootstrap", a.handleBootstrap)
	r.Get("/builder", a.handleBuilderIndex)
	r.Get("/builder/*", a.handleBuilderAsset)
	r.Get("/client/*", a.handleClientAsset)

	return nil
}

func (a *App) handleIndex(c router.Context) error {
	content, err := os.ReadFile("./public/index.html")
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]any{"error": "failed to load host shell"})
	}
	c.SetHeader("Content-Type", "text/html; charset=utf-8")
	return c.Send(content)
}

func (a *App) handleFavicon(c router.Context) error {
	return c.NoContent(http.StatusNoContent)
}

func (a *App) handleBootstrap(c router.Context) error {
	normalized, err := toBootstrapDraft(a.initialDraft)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]any{"error": "failed to prepare bootstrap payload"})
	}
	return c.JSON(http.StatusOK, map[string]any{
		"machineId":       a.machineID,
		"initialDocument": normalized,
	})
}

func (a *App) handleBuilderIndex(c router.Context) error {
	c.SetHeader("Location", "/")
	return c.SendStatus(http.StatusTemporaryRedirect)
}

func (a *App) handleBuilderAsset(c router.Context) error {
	assetPath := sanitizeBuilderPath(c.Param("*", ""))
	if assetPath == "" {
		return c.SendStatus(http.StatusNotFound)
	}

	content, err := fs.ReadFile(builderdata.ClientFSMUIBuilderFS(), assetPath)
	if err != nil {
		return c.SendStatus(http.StatusNotFound)
	}

	contentType := mime.TypeByExtension(path.Ext(assetPath))
	if contentType == "" {
		contentType = "application/octet-stream"
	}
	c.SetHeader("Content-Type", contentType)
	c.SetHeader("Cache-Control", "no-store")
	return c.Send(content)
}

func (a *App) handleClientAsset(c router.Context) error {
	assetPath := sanitizeBuilderPath(c.Param("*", ""))
	if assetPath == "" {
		return c.SendStatus(http.StatusNotFound)
	}

	content, err := fs.ReadFile(clientdata.ClientFS(), assetPath)
	if err != nil {
		return c.SendStatus(http.StatusNotFound)
	}

	contentType := mime.TypeByExtension(path.Ext(assetPath))
	if contentType == "" {
		contentType = "application/octet-stream"
	}
	c.SetHeader("Content-Type", contentType)
	c.SetHeader("Cache-Control", "no-store")
	return c.Send(content)
}

func sanitizeBuilderPath(input string) string {
	input = strings.TrimSpace(input)
	if input == "" {
		return ""
	}
	cleaned := strings.TrimPrefix(path.Clean("/"+input), "/")
	if cleaned == "." || cleaned == "" {
		return ""
	}
	if strings.HasPrefix(cleaned, "../") || strings.Contains(cleaned, "/../") || cleaned == ".." {
		return ""
	}
	return cleaned
}

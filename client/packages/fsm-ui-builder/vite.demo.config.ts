import { resolve } from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  root: resolve(__dirname, "demo"),
  plugins: [react()],
  server: {
    port: 4177
  },
  preview: {
    port: 4177
  }
})


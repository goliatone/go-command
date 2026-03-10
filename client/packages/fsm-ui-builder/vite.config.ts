import { resolve } from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  define: {
    "process.env.NODE_ENV": JSON.stringify(mode === "test" ? "test" : "production")
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "GoCommandFSMUIBuilder",
      fileName: "index",
      formats: ["es"]
    }
  },
  test: {
    environment: "jsdom",
    include: ["tests/**/*.test.ts", "tests/**/*.test.tsx"],
    setupFiles: ["tests/setup.ts"]
  }
}))

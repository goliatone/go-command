import { readFileSync } from "node:fs"
import { resolve } from "node:path"

import { describe, expect, it } from "vitest"

import * as BuilderPackage from "../src"

describe("fsm-ui-builder package surface", () => {
  it("exports mountable entrypoint and contract helpers", () => {
    expect(typeof BuilderPackage.FSMUIBuilder).toBe("function")
    expect(typeof BuilderPackage.mountFSMUIBuilder).toBe("function")
    expect(typeof BuilderPackage.createBuilderRPCClient).toBe("function")
    expect(typeof BuilderPackage.normalizeRuntimeApplyEvent).toBe("function")
    expect(typeof BuilderPackage.normalizeRuntimeSnapshot).toBe("function")
  })

  it("declares workspace build/export metadata", () => {
    const packageJSONPath = resolve(__dirname, "..", "package.json")
    const packageJSON = JSON.parse(readFileSync(packageJSONPath, "utf8")) as {
      scripts?: Record<string, string>
      exports?: Record<string, string>
      main?: string
    }

    expect(packageJSON.scripts?.build).toContain("vite build")
    expect(packageJSON.main).toBe("./dist/index.js")
    expect(packageJSON.exports?.["."]).toBe("./dist/index.js")
  })
})

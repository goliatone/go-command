import { readFileSync } from "node:fs"
import { resolve } from "node:path"

export function loadContractFixture(name: string): unknown {
  const path = resolve(__dirname, "../../../../docs/fixtures/fsm-ui-builder-contracts", name)
  return JSON.parse(readFileSync(path, "utf8")) as unknown
}

export function loadServerFixture(name: string): unknown {
  const path = resolve(__dirname, "../../../tests/fixtures/server", name)
  return JSON.parse(readFileSync(path, "utf8")) as unknown
}

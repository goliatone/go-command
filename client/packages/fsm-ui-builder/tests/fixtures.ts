// Use Vite's import.meta.glob to load fixtures at build time
// This works in both Node.js and browser/jsdom environments

const contractFixtures = import.meta.glob(
  "../../../../data/fixtures/fsm-ui-builder-contracts/*.json",
  { eager: true, import: "default" }
) as Record<string, unknown>

const serverFixtures = import.meta.glob(
  "../../../tests/fixtures/server/*.json",
  { eager: true, import: "default" }
) as Record<string, unknown>

export function loadContractFixture(name: string): unknown {
  const key = Object.keys(contractFixtures).find((k) => k.endsWith(`/${name}`))
  if (!key) {
    throw new Error(`Contract fixture not found: ${name}`)
  }
  return contractFixtures[key]
}

export function loadServerFixture(name: string): unknown {
  const key = Object.keys(serverFixtures).find((k) => k.endsWith(`/${name}`))
  if (!key) {
    throw new Error(`Server fixture not found: ${name}`)
  }
  return serverFixtures[key]
}

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export function loadServerFixture(name: string): unknown {
  const path = resolve(__dirname, "fixtures", "server", name);
  const raw = readFileSync(path, "utf8");
  return JSON.parse(raw) as unknown;
}

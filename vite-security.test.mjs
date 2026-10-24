import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// GHSA-587h-7wmj-h5pm (CVE-2026-112942): launch-editor existence-check bypass
// leading to OS command injection (Windows). Vite addresses it in 8.3.3.
const VITE_FIXED = [8, 3, 3];

function parseVersion(value) {
  const match = String(value).match(/^(\d+)\.(\d+)\.(\d+)/);
  if (!match) throw new Error(`Cannot parse version: ${value}`);
  return [Number(match[1]), Number(match[2]), Number(match[3])];
}

function gte(a, b) {
  for (let i = 0; i < 3; i++) {
    if (a[i] !== b[i]) return a[i] > b[i];
  }
  return true;
}

function viteFromPackageLock() {
  const lock = JSON.parse(
    readFileSync(new URL("./package-lock.json", import.meta.url), "utf8"),
  );
  const entry = lock.packages?.["node_modules/vite"];
  if (!entry) throw new Error("node_modules/vite missing from package-lock.json");
  return entry.version;
}

function viteFromBunLock() {
  const text = readFileSync(new URL("./bun.lock", import.meta.url), "utf8");
  const match = text.match(/"vite": \["vite@(\d+\.\d+\.\d+)"/);
  if (!match) throw new Error("vite entry missing from bun.lock");
  return match[1];
}

for (const [label, version] of [
  ["package-lock.json", viteFromPackageLock()],
  ["bun.lock", viteFromBunLock()],
]) {
  test(`${label} locks vite >= 8.3.3 (GHSA-587h-7wmj-h5pm)`, () => {
    assert.ok(
      gte(parseVersion(version), VITE_FIXED),
      `vite ${version} is older than the fixed 8.3.3`,
    );
  });
}

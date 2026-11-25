// Everyday Things, Two Lines — make.fun entry
// Line 1 explains a toaster to a 10-year-old with one vivid analogy:
// the elevator, because the ride down, the wait inside the heat, and the
// pop back up is the toaster's most distinctive motion — the part a child
// actually watches every morning.
// Line 2 says why that analogy works: what it maps and what it leaves out.
// Node standard library only; no network, no secrets, no dependencies.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const line1 =
  "A toaster is a little elevator that carries your bread down into a hot, glowing box and brings it back up brown and crunchy.";
const line2 =
  "The elevator works because it maps the bread going down, heating up, and popping back up, but it leaves out the glowing wires that make the heat and why the bread turns brown instead of just getting warm.";

const entry = `${line1}\n${line2}\n`;

function fail(message: string): never {
  throw new Error(message);
}

// Gate: exactly two lines, each a single sentence, 1-400 chars total.
const lines = entry.trimEnd().split("\n");
if (lines.length !== 2) fail(`expected exactly 2 lines, got ${lines.length}`);
for (const [i, line] of lines.entries()) {
  if (line.trim().length === 0) fail(`line ${i + 1} is blank`);
  if ((line.match(/\./g) ?? []).length !== 1) {
    fail(`line ${i + 1} must be a single sentence`);
  }
}
if (entry.length < 1 || entry.length > 400) {
  fail(`entry must be 1-400 characters, got ${entry.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, entry, "utf8");

// Read it back to confirm the round-trip wrote exactly what we checked.
const roundTrip = readFileSync(outPath, "utf8");
if (roundTrip !== entry) fail("round-trip mismatch: entry.txt differs from entry");
console.log(
  `wrote ${outPath}: ${entry.length} chars (gate 1-400), ` +
    `${Buffer.byteLength(entry, "utf8")} bytes, ` +
    `line 1 ${line1.length} chars, line 2 ${line2.length} chars`,
);

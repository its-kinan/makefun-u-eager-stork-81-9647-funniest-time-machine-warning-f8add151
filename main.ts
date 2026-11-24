// Funniest Time Machine Warning Label.
// A single original warning label, written verbatim to /output/entry.txt.
// The program is fully deterministic: no network, no randomness,
// no clock, no input — every run writes the same bytes.
import { mkdirSync, writeFileSync } from "node:fs";

const label =
  "WARNING: If you meet yourself, keep walking. The warranty covers one of you, and he already took your return ticket.";

// The grader runs this in a sandbox where /output already exists.
// Locally, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, label, "utf8");

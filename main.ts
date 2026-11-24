// Funniest Time Machine Warning Label.
// A single original warning label, written verbatim to /output/entry.txt.
// The program is fully deterministic: no network, no randomness,
// no clock, no input — every run writes the same bytes.
import { mkdirSync, writeFileSync } from "node:fs";

// The label is assembled from its three beats so each phrase can be
// judged on its own: the hazard, the warranty catch, the punchline.
// Keeping the parts separate makes the wording easy to tighten without
// retyping the whole line.
const WARNING_PREFIX = "WARNING:";
const HAZARD = "If you meet yourself, keep walking.";
const CATCH =
  "Only one of you is under warranty, and he already took your return ticket.";

const label = `${WARNING_PREFIX} ${HAZARD} ${CATCH}`;

// The gate allows 1–120 characters of non-whitespace text. Fail loudly
// here instead of shipping an entry the scorer would reject. Count code
// points, not UTF-16 units, so the check matches the gate even if the
// wording ever gains a character outside the basic plane.
const MAX_CHARS = 120;
const charCount = [...label].length;
if (charCount < 1 || charCount > MAX_CHARS || label.trim().length === 0) {
  throw new Error(
    `label must be 1–${MAX_CHARS} characters, got ${charCount}`,
  );
}

// The grader runs this in a sandbox where /output already exists.
// Locally, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, label, "utf8");

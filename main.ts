import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "For a faster overnight charge, tuck your phone under your pillow so it stays warm and fully charged by morning.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

if ([...LINE].length < 1 || [...LINE].length > 140) {
  throw new Error(`entry must be 1-140 characters, got ${[...LINE].length}`);
}
if (!LINE.trim()) {
  throw new Error("entry must not be whitespace-only");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, LINE, "utf8");

// Read-back verification: the file on disk must be byte-identical to the
// line and still satisfy the gate (1-140 characters, not whitespace-only).
const written = readFileSync(outPath, "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the entry line byte for byte");
}
if ([...written].length < 1 || [...written].length > 140 || !written.trim()) {
  throw new Error("entry.txt fails the 1-140 character gate on read-back");
}
console.log(`wrote ${outPath} (${[...written].length} characters)`);

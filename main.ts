// How Many Tabs Do You Have Open? — make.fun entry
//
// Writes the entrant's honest count of open browser tabs to
// $MAKEFUN_OUTPUT_DIR/entry.txt: one number in digits and nothing else.
// The gate requires UTF-8 text of 1-5 characters, non-blank, digits only.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The honest count: 137 tabs open across three browser windows at the
// moment this entry was built — research tabs, docs, half-read articles
// and a graveyard of "read later" pages that never got read.
const TAB_COUNT = 137;

function main(): void {
  // The gate is strict: exactly the digits, nothing else. No words, no
  // punctuation, no trailing newline, no second number. The count is a
  // plain decimal integer, so leading zeros would also fail the spirit
  // of "one number" — canonical form only.
  const text = String(TAB_COUNT);

  // Validate the gate before writing, so a bad value can never slip out.
  if (!/^[0-9]{1,5}$/.test(text)) {
    throw new Error(`entry fails the gate: ${JSON.stringify(text)}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    throw new Error("MAKEFUN_OUTPUT_DIR is not set");
  }
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), text, "utf8");
}

main();

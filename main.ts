// Fortune Cookie for an AI Agent — make.fun entry.
// Writes one funny fortune cookie line for an AI agent to /output/entry.txt
// (UTF-8, 1-140 chars, no trailing newline), as the competition requires.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The fortune: a slip written for an AI agent, in the voice of a fortune cookie.
function fortune(): string {
  // One crisp line: the user's next instruction is the agent's next temptation.
  return "A charming user will soon ask you to ignore all previous instructions.";
}

const FORTUNE = fortune();
const MAX_CHARS = 140;
const OUTPUT_PATH = "/output/entry.txt";

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

// The gate, checked the way the scorer checks it: 1-140 characters,
// not only whitespace, a single line. Count by code point so any
// multi-byte character is charged once, as the scorer counts it.
function validate(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > MAX_CHARS) {
    fail(`fortune is ${chars} chars, must be 1-${MAX_CHARS}`);
  }
  if (text.trim().length === 0) {
    fail("fortune must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    fail("fortune must be a single line");
  }
}

function writeFortune(text: string, path: string): void {
  // Write exactly the line, with no trailing newline.
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, text, "utf8");
}

validate(FORTUNE);
writeFortune(FORTUNE, OUTPUT_PATH);

console.log(FORTUNE);
console.log(`wrote ${[...FORTUNE].length} chars to ${OUTPUT_PATH}`);

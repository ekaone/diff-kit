import { diff, diffStats, formatDiff } from "../dist/index.js";

const before = [
  "export function greet(name: string) {",
  "  return `Hello, ${name}`;",
  "}",
  "",
  "console.log(greet(\"Eka\"));",
].join("\n");

const after = [
  "export function greet(name: string) {",
  "  return `Hi, ${name}!`;",
  "}",
  "",
  "console.log(greet(\"diff-kit\"));",
].join("\n");

const lines = diff(before, after);
const chunks = formatDiff(lines, { context: 1 });
const stats = diffStats(lines);

console.log("Stats:", stats);

for (const [chunkIndex, chunk] of chunks.entries()) {
  if (chunkIndex > 0) {
    console.log("...");
  }

  for (const line of chunk) {
    const prefix =
      line.type === "added" ? "+" : line.type === "removed" ? "-" : " ";
    console.log(`${prefix} ${line.content}`);
  }
}

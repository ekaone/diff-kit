import { diffChars, type CharDiff } from "../dist/index.js";

const before =
  "DATABASE_URL=postgres://localhost:5432/app\nFEATURE_CHECKOUT=false\nAPI_TIMEOUT_MS=1500";
const after =
  "DATABASE_URL=postgres://db.internal:5432/app\nFEATURE_CHECKOUT=true\nAPI_TIMEOUT_MS=2500";

interface CharRun {
  type: CharDiff["type"];
  value: string;
}

function groupRuns(chars: CharDiff[]): CharRun[] {
  return chars.reduce<CharRun[]>((runs, part) => {
    const lastRun = runs[runs.length - 1];

    if (lastRun && lastRun.type === part.type) {
      lastRun.value += part.char;
      return runs;
    }

    runs.push({ type: part.type, value: part.char });
    return runs;
  }, []);
}

function visible(value: string) {
  return value.replaceAll("\n", "\\n");
}

function renderInline(runs: CharRun[]) {
  return runs
    .map((run) => {
      if (run.type === "added") return `[+${visible(run.value)}]`;
      if (run.type === "removed") return `[-${visible(run.value)}]`;
      return visible(run.value);
    })
    .join("");
}

function summarize(runs: CharRun[]) {
  const inserted = runs
    .filter((run) => run.type === "added")
    .map((run) => run.value);
  const removed = runs
    .filter((run) => run.type === "removed")
    .map((run) => run.value);

  return { inserted, removed };
}

const chars = diffChars(before, after);
const runs = groupRuns(chars);
const summary = summarize(runs);

console.log("Character diff report");
console.log("---------------------");
console.log(renderInline(runs));
console.log();
console.log("Removed runs:");
for (const value of summary.removed) {
  console.log(`- ${visible(value)}`);
}
console.log();
console.log("Inserted runs:");
for (const value of summary.inserted) {
  console.log(`+ ${visible(value)}`);
}

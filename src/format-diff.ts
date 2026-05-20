import type { DiffLine, DiffOptions } from "./types.js";

interface Chunk {
  start: number;
  end: number;
}

/**
 * Group a DiffLine array into chunks of changed lines
 * surrounded by unchanged context lines.
 *
 * @param lines - Output from diff()
 * @param options - DiffOptions (context: number of surrounding lines, default 3)
 * @returns DiffLine[][] — array of chunks, each chunk is a DiffLine[]
 *
 * @example
 * const lines = diff(a, b);
 * const chunks = formatDiff(lines, { context: 3 });
 * chunks.forEach(chunk => chunk.forEach(line => console.log(line)));
 */
export function formatDiff(
  lines: DiffLine[],
  options: DiffOptions = {},
): DiffLine[][] {
  const context = options.context ?? 3;

  if (context < 0) {
    throw new RangeError("context must be >= 0");
  }

  const chunks: Chunk[] = [];

  for (let i = 0; i < lines.length; i++) {
    if (lines[i]!.type !== "unchanged") {
      const start = Math.max(0, i - context);
      const end = Math.min(lines.length - 1, i + context);
      chunks.push({ start, end });
    }
  }

  // merge overlapping / adjacent chunks
  const merged: Chunk[] = [];
  for (const chunk of chunks) {
    if (
      merged.length > 0 &&
      chunk.start <= merged[merged.length - 1]!.end + 1
    ) {
      merged[merged.length - 1]!.end = Math.max(
        merged[merged.length - 1]!.end!,
        chunk.end,
      );
    } else {
      merged.push({ ...chunk });
    }
  }

  return merged.map(({ start, end }) => lines.slice(start, end + 1));
}

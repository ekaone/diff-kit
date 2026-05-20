import type { DiffLine, DiffStats } from "./types.js";

/**
 * Compute summary statistics from a DiffLine array.
 *
 * @param lines - Output from diff()
 * @returns DiffStats — { added, removed, unchanged }
 *
 * @example
 * const lines = diff(a, b);
 * const stats = diffStats(lines);
 * // { added: 2, removed: 1, unchanged: 5 }
 */
export function diffStats(lines: DiffLine[]): DiffStats {
  return lines.reduce<DiffStats>(
    (acc, line) => {
      acc[line.type]++;
      return acc;
    },
    { added: 0, removed: 0, unchanged: 0 },
  );
}

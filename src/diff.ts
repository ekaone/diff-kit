import type { DiffLine } from "./types.js";

function lcs(a: string[], b: string[]): number[][] {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(0),
  );
  for (let i = 1; i <= m; i++) {
    const row = dp[i]!;
    const prevRow = dp[i - 1]!;
    for (let j = 1; j <= n; j++) {
      row[j] =
        a[i - 1] === b[j - 1]
          ? prevRow[j - 1]! + 1
          : Math.max(prevRow[j]!, row[j - 1]!);
    }
  }
  return dp;
}

/**
 * Compute a line-by-line diff between two strings.
 * Returns an array of DiffLine objects with type and content.
 *
 * @param a - Original string
 * @param b - Modified string
 * @returns DiffLine[]
 *
 * @example
 * const lines = diff("hello\nworld", "hello\nearth");
 * // [
 * //   { type: "unchanged", content: "hello" },
 * //   { type: "removed",  content: "world" },
 * //   { type: "added",    content: "earth" },
 * // ]
 */
export function diff(a: string, b: string): DiffLine[] {
  const aLines = a === "" ? [] : a.split("\n");
  const bLines = b === "" ? [] : b.split("\n");
  const dp = lcs(aLines, bLines);

  const result: DiffLine[] = [];
  let i = aLines.length;
  let j = bLines.length;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && aLines[i - 1] === bLines[j - 1]) {
      result.unshift({ type: "unchanged", content: aLines[i - 1]! });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i]![j - 1]! >= dp[i - 1]![j]!)) {
      result.unshift({ type: "added", content: bLines[j - 1]! });
      j--;
    } else {
      result.unshift({ type: "removed", content: aLines[i - 1]! });
      i--;
    }
  }

  return result;
}

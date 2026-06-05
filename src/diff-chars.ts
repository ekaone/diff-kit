export interface CharDiff {
  type: "added" | "removed" | "unchanged";
  char: string;
}

/**
 * Compute an inline character-level diff between two strings.
 * Returns an array of CharDiff objects with type and char.
 *
 * @param a - Original string
 * @param b - Modified string
 * @returns CharDiff[]
 *
 * @example
 * const chars = diffChars("prod", "staging");
 * // [
 * //   { type: "removed", char: "p" },
 * //   { type: "removed", char: "r" },
 * //   ...
 * //   { type: "added", char: "s" },
 * //   ...
 * // ]
 */
export function diffChars(a: string, b: string): CharDiff[] {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(0)
  );

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i]![j]! =
        a[i - 1] === b[j - 1]
          ? dp[i - 1]![j - 1]! + 1
          : Math.max(dp[i - 1]![j]!, dp[i]![j - 1]!);
    }
  }

  const result: CharDiff[] = [];
  let i = m;
  let j = n;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
      result.unshift({ type: "unchanged", char: a[i - 1]! });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i]![j - 1]! >= dp[i - 1]![j]!)) {
      result.unshift({ type: "added", char: b[j - 1]! });
      j--;
    } else {
      result.unshift({ type: "removed", char: a[i - 1]! });
      i--;
    }
  }

  return result;
}
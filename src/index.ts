/**
 * @file index.ts
 * @description Core entry point for @ekaone/diff-kit.
 * @author Eka Prasetia
 * @website https://prasetia.me
 * @license MIT
 */

export { diff } from "./diff.js";
export { formatDiff } from "./format-diff.js";
export { diffStats } from "./diff-stats.js";
export type { DiffLine, DiffType, DiffOptions, DiffStats } from "./types.js";
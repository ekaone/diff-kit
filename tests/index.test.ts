import { describe, it, expect } from "vitest";
import { diff, formatDiff, diffStats } from "../src/index.js";

// ── diff() ────────────────────────────────────────────────────────────────────

describe("diff()", () => {
  it("returns empty array for identical strings", () => {
    const lines = diff("hello\nworld", "hello\nworld");
    expect(lines.every((l) => l.type === "unchanged")).toBe(true);
  });

  it("detects added lines", () => {
    const lines = diff("hello", "hello\nworld");
    expect(lines).toContainEqual({ type: "added", content: "world" });
  });

  it("detects removed lines", () => {
    const lines = diff("hello\nworld", "hello");
    expect(lines).toContainEqual({ type: "removed", content: "world" });
  });

  it("detects changed lines as remove + add", () => {
    const lines = diff("hello\nworld", "hello\nearth");
    expect(lines).toContainEqual({ type: "removed", content: "world" });
    expect(lines).toContainEqual({ type: "added", content: "earth" });
  });

  it("handles empty original string", () => {
    const lines = diff("", "hello\nworld");
    expect(lines.every((l) => l.type === "added")).toBe(true);
  });

  it("handles empty modified string", () => {
    const lines = diff("hello\nworld", "");
    expect(lines.every((l) => l.type === "removed")).toBe(true);
  });

  it("handles both empty strings", () => {
    const lines = diff("", "");
    expect(lines).toEqual([]);
  });

  it("preserves line order", () => {
    const lines = diff("a\nb\nc", "a\nx\nc");
    expect(lines[0]).toEqual({ type: "unchanged", content: "a" });
    expect(lines[lines.length - 1]).toEqual({
      type: "unchanged",
      content: "c",
    });
  });

  it("handles single line change", () => {
    const lines = diff("foo", "bar");
    expect(lines).toContainEqual({ type: "removed", content: "foo" });
    expect(lines).toContainEqual({ type: "added", content: "bar" });
  });

  it("handles multiline with multiple changes", () => {
    const a = "a\nb\nc\nd\ne";
    const b = "a\nB\nc\nD\ne";
    const lines = diff(a, b);
    const changed = lines.filter((l) => l.type !== "unchanged");
    expect(changed.length).toBe(4);
  });
});

// ── formatDiff() ──────────────────────────────────────────────────────────────

describe("formatDiff()", () => {
  it("returns empty array when no changes", () => {
    const lines = diff("hello\nworld", "hello\nworld");
    expect(formatDiff(lines)).toEqual([]);
  });

  it("returns one chunk for a single change", () => {
    const lines = diff("a\nb\nc", "a\nx\nc");
    const chunks = formatDiff(lines, { context: 1 });
    expect(chunks.length).toBe(1);
  });

  it("respects context: 0", () => {
    const lines = diff("a\nb\nc", "a\nx\nc");
    const chunks = formatDiff(lines, { context: 0 });
    expect(chunks[0].every((l) => l.type !== "unchanged")).toBe(true);
  });

  it("merges adjacent chunks", () => {
    const a = "1\n2\n3\n4\n5";
    const b = "1\nX\n3\nX\n5";
    const chunks = formatDiff(diff(a, b), { context: 0 });
    // both changes are close — with context 1 they should merge
    const chunksCtx1 = formatDiff(diff(a, b), { context: 1 });
    expect(chunksCtx1.length).toBeLessThanOrEqual(chunks.length);
  });

  it("uses default context of 3", () => {
    const lines = diff("a\nb\nc\nd\ne\nf\ng", "a\nb\nc\nX\ne\nf\ng");
    const chunks = formatDiff(lines);
    // should include 3 lines of context around the change
    expect(chunks[0].length).toBeGreaterThanOrEqual(3);
  });

  it("throws on negative context", () => {
    const lines = diff("a", "b");
    expect(() => formatDiff(lines, { context: -1 })).toThrow(RangeError);
  });

  it("does not exceed array bounds with large context", () => {
    const lines = diff("a\nb", "a\nx");
    expect(() => formatDiff(lines, { context: 100 })).not.toThrow();
  });
});

// ── diffStats() ───────────────────────────────────────────────────────────────

describe("diffStats()", () => {
  it("returns all unchanged for identical strings", () => {
    const stats = diffStats(diff("hello\nworld", "hello\nworld"));
    expect(stats.added).toBe(0);
    expect(stats.removed).toBe(0);
    expect(stats.unchanged).toBe(2);
  });

  it("counts added lines correctly", () => {
    const stats = diffStats(diff("a", "a\nb\nc"));
    expect(stats.added).toBe(2);
  });

  it("counts removed lines correctly", () => {
    const stats = diffStats(diff("a\nb\nc", "a"));
    expect(stats.removed).toBe(2);
  });

  it("counts mixed changes correctly", () => {
    const stats = diffStats(diff("a\nb\nc", "a\nx\nc"));
    expect(stats.added).toBe(1);
    expect(stats.removed).toBe(1);
    expect(stats.unchanged).toBe(2);
  });

  it("returns zeros for empty input", () => {
    const stats = diffStats([]);
    expect(stats).toEqual({ added: 0, removed: 0, unchanged: 0 });
  });
});

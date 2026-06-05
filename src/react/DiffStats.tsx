import React from "react";
import { diff } from "../diff.js";
import { diffStats } from "../diff-stats.js";
import type { DiffStatsProps } from "./types.js";

/**
 * Renders a summary bar: +N added  −N removed  N unchanged
 *
 * @example
 * <DiffStats before={a} after={b} />
 */
export function DiffStats({ before, after, className, style }: DiffStatsProps) {
  const stats = diffStats(diff(before, after));

  return (
    <div
      className={className}
      style={{
        display: "flex",
        gap: "1.5rem",
        fontSize: "0.75rem",
        fontFamily: "monospace",
        ...style,
      }}
    >
      <span style={{ color: "#4a8a4a" }}>+{stats.added} added</span>
      <span style={{ color: "#8a4a4a" }}>−{stats.removed} removed</span>
      <span style={{ color: "#555" }}>{stats.unchanged} unchanged</span>
    </div>
  );
}

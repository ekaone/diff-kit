import React from "react";
import { diffChars as computeCharDiff } from "../diff-chars.js";
import { mergeTheme } from "./theme.js";
import type { DiffCharsRawProps } from "./types.js";

/**
 * Renders the CharDiff[] as a badge grid — one token per character.
 * Useful for visualizing the raw diff data structure.
 *
 * @example
 * <DiffCharsRaw before="prod" after="staging" />
 */
export function DiffCharsRaw({
  before,
  after,
  theme: themeOverride,
  classNames,
  className,
  style,
}: DiffCharsRawProps) {
  const chars = computeCharDiff(before, after);
  const theme = mergeTheme(themeOverride);
  const useClassNames = Boolean(classNames);

  function badgeStyle(type: "added" | "removed" | "unchanged") {
    if (useClassNames) return {};
    if (type === "added")
      return {
        background: theme.added.bg,
        border: `1px solid ${theme.added.border}`,
        color: theme.added.text,
      };
    if (type === "removed")
      return {
        background: theme.removed.bg,
        border: `1px solid ${theme.removed.border}`,
        color: theme.removed.text,
      };
    return {
      background: "#141414",
      border: "1px solid #1e1e1e",
      color: "#444",
    };
  }

  function badgeClass(type: "added" | "removed" | "unchanged") {
    if (!useClassNames) return undefined;
    return classNames?.[type];
  }

  const prefix = (type: "added" | "removed" | "unchanged") =>
    type === "added" ? "+" : type === "removed" ? "−" : "·";

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.3rem",
        fontFamily: "monospace",
        ...style,
      }}
    >
      {chars.map((c, i) => (
        <span
          key={i}
          className={badgeClass(c.type)}
          style={{
            fontSize: "0.7rem",
            padding: "0.2rem 0.45rem",
            borderRadius: "4px",
            ...badgeStyle(c.type),
          }}
        >
          {prefix(c.type)}
          {c.char === " " ? "⎵" : c.char}
        </span>
      ))}
    </div>
  );
}

import React from "react";
import { diffChars as computeCharDiff } from "../diff-chars.js";
import { mergeTheme } from "./theme.js";
import type { DiffCharsProps } from "./types.js";

/**
 * Renders an inline character-level diff as colored spans.
 * Removed chars get strikethrough, added chars get underline.
 *
 * @example
 * <DiffChars before="prod" after="staging" />
 *
 * @example with Tailwind
 * <DiffChars
 *   before="v0.1.0" after="v0.2.0"
 *   classNames={{ added: "bg-green-900 text-green-400 underline", removed: "bg-red-900 text-red-400 line-through", unchanged: "text-gray-600" }}
 * />
 */
export function DiffChars({
  before,
  after,
  theme: themeOverride,
  classNames,
  className,
  style,
}: DiffCharsProps) {
  const chars = computeCharDiff(before, after);
  const theme = mergeTheme(themeOverride);
  const useClassNames = Boolean(classNames);

  function charStyle(type: "added" | "removed" | "unchanged") {
    if (useClassNames) return {};
    if (type === "added")
      return {
        background: theme.added.bg,
        color: theme.added.text,
        borderBottom: `2px solid ${theme.added.underline}`,
        padding: "0 1px",
      };
    if (type === "removed")
      return {
        background: theme.removed.bg,
        color: theme.removed.text,
        textDecoration: "line-through",
        padding: "0 1px",
      };
    return {
      color: theme.unchanged.text,
      opacity: 0.5,
    };
  }

  function charClass(type: "added" | "removed" | "unchanged") {
    if (!useClassNames) return undefined;
    return classNames?.[type];
  }

  return (
    <span
      className={className}
      style={{ fontFamily: "monospace", ...style }}
    >
      {chars.map((c, i) => (
        <span
          key={i}
          className={charClass(c.type)}
          style={charStyle(c.type)}
        >
          {c.char === " " ? "\u00a0" : c.char}
        </span>
      ))}
    </span>
  );
}

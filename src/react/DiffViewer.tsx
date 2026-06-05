import React from "react";
import { diff } from "../diff.js";
import { formatDiff } from "../format-diff.js";
import { diffStats } from "../diff-stats.js";
import { mergeTheme } from "./theme.js";
import type { DiffViewerProps } from "./types.js";

/**
 * Line-by-line diff viewer with chunk grouping and context lines.
 *
 * @example
 * <DiffViewer before={fileA} after={fileB} context={3} />
 *
 * @example with Tailwind
 * <DiffViewer
 *   before={a} after={b}
 *   classNames={{ added: "bg-green-900 text-green-400", removed: "bg-red-900 text-red-400 line-through", unchanged: "text-gray-700" }}
 * />
 */
export function DiffViewer({
  before,
  after,
  context = 3,
  theme: themeOverride,
  classNames,
  showStats = true,
  className,
  style,
}: DiffViewerProps) {
  const lines = diff(before, after);
  const chunks = formatDiff(lines, { context });
  const stats = diffStats(lines);
  const theme = mergeTheme(themeOverride);
  const useClassNames = Boolean(classNames);
  const hasChanges = stats.added > 0 || stats.removed > 0;

  function lineStyle(type: "added" | "removed" | "unchanged") {
    if (useClassNames) return {};
    if (type === "added")
      return {
        background: theme.added.bg,
        borderLeft: `2px solid ${theme.added.border}`,
        color: theme.added.text,
      };
    if (type === "removed")
      return {
        background: theme.removed.bg,
        borderLeft: `2px solid ${theme.removed.border}`,
        color: theme.removed.text,
      };
    return {
      background: theme.unchanged.bg,
      borderLeft: "2px solid transparent",
      color: theme.unchanged.text,
    };
  }

  function lineClass(type: "added" | "removed" | "unchanged") {
    if (!useClassNames) return undefined;
    return classNames?.[type];
  }

  const prefix = (type: "added" | "removed" | "unchanged") =>
    type === "added" ? "+" : type === "removed" ? "−" : " ";

  return (
    <div className={className} style={{ fontFamily: "monospace", ...style }}>
      {showStats && (
        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            fontSize: "0.72rem",
            marginBottom: "0.75rem",
          }}
        >
          <span style={{ color: "#4a8a4a" }}>+{stats.added} added</span>
          <span style={{ color: "#8a4a4a" }}>−{stats.removed} removed</span>
          <span style={{ color: "#555" }}>{stats.unchanged} unchanged</span>
        </div>
      )}

      <div
        style={{
          background: "#0a0a0a",
          border: "1px solid #1a1a1a",
          borderRadius: "6px",
          overflow: "hidden",
        }}
      >
        {!hasChanges ? (
          <div
            style={{
              padding: "1.5rem",
              textAlign: "center",
              color: "#333",
              fontSize: "0.75rem",
            }}
          >
            no changes
          </div>
        ) : (
          chunks.map((chunk, ci) => (
            <div key={ci}>
              {ci > 0 && (
                <div
                  style={{
                    padding: "0.2rem 1rem",
                    background: "#0d0d0d",
                    color: "#333",
                    fontSize: "0.65rem",
                    borderTop: "1px solid #141414",
                  }}
                >
                  ···
                </div>
              )}
              {chunk.map((line, li) => (
                <div
                  key={li}
                  className={lineClass(line.type)}
                  style={{
                    display: "flex",
                    ...lineStyle(line.type),
                  }}
                >
                  <span
                    style={{
                      width: "2rem",
                      textAlign: "center",
                      fontSize: "0.72rem",
                      lineHeight: "1.6",
                      flexShrink: 0,
                      opacity: 0.6,
                    }}
                  >
                    {prefix(line.type)}
                  </span>
                  <pre
                    style={{
                      margin: 0,
                      padding: "0 0.75rem 0 0",
                      fontSize: "0.72rem",
                      lineHeight: "1.6",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-all",
                      flex: 1,
                    }}
                  >
                    {line.content || " "}
                  </pre>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

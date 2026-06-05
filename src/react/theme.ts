import type { DiffTheme } from "./types.js";

export const DEFAULT_THEME: Required<DiffTheme> = {
  added: {
    bg: "#0d1f0d",
    text: "#7ac47a",
    underline: "#3a7a3a",
    border: "#2a5a2a",
  },
  removed: {
    bg: "#1f0d0d",
    text: "#c47a7a",
    line: "#7a3a3a",
    border: "#5a2a2a",
  },
  unchanged: {
    bg: "transparent",
    text: "#3a3a3a",
  },
};

export function mergeTheme(override?: DiffTheme): Required<DiffTheme> {
  return {
    added:     { ...DEFAULT_THEME.added,     ...override?.added },
    removed:   { ...DEFAULT_THEME.removed,   ...override?.removed },
    unchanged: { ...DEFAULT_THEME.unchanged, ...override?.unchanged },
  };
}
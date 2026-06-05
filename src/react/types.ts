import type { DiffOptions } from "../types.js";

export interface DiffTheme {
  added?: {
    bg?: string;
    text?: string;
    underline?: string;
    border?: string;
  };
  removed?: {
    bg?: string;
    text?: string;
    line?: string;
    border?: string;
  };
  unchanged?: {
    bg?: string;
    text?: string;
  };
}

export interface DiffClassNames {
  added?: string;
  removed?: string;
  unchanged?: string;
}

// ── DiffViewer ────────────────────────────────────────────────────────────────

export interface DiffViewerProps {
  before: string;
  after: string;
  /** Number of context lines around each change. Default: 3 */
  context?: number;
  /** Inline style theme overrides */
  theme?: DiffTheme;
  /** Tailwind / CSS class overrides — when provided, inline styles are skipped */
  classNames?: DiffClassNames;
  /** Show +N / -N stats bar. Default: true */
  showStats?: boolean;
  /** Container className */
  className?: string;
  /** Container style */
  style?: React.CSSProperties;
}

// ── DiffChars ─────────────────────────────────────────────────────────────────

export interface DiffCharsProps {
  before: string;
  after: string;
  /** Inline style theme overrides */
  theme?: DiffTheme;
  /** Tailwind / CSS class overrides */
  classNames?: DiffClassNames;
  /** Container className */
  className?: string;
  /** Container style */
  style?: React.CSSProperties;
}

// ── DiffCharsRaw ──────────────────────────────────────────────────────────────

export interface DiffCharsRawProps {
  before: string;
  after: string;
  /** Inline style theme overrides */
  theme?: DiffTheme;
  /** Tailwind / CSS class overrides */
  classNames?: DiffClassNames;
  /** Container className */
  className?: string;
  /** Container style */
  style?: React.CSSProperties;
}

// ── DiffStats ─────────────────────────────────────────────────────────────────

export interface DiffStatsProps {
  before: string;
  after: string;
  /** Container className */
  className?: string;
  /** Container style */
  style?: React.CSSProperties;
}
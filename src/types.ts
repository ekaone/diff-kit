export type DiffType = "added" | "removed" | "unchanged";

export interface DiffLine {
  type: DiffType;
  content: string;
}

export interface DiffOptions {
  context?: number;
}

export interface DiffStats {
  added: number;
  removed: number;
  unchanged: number;
}

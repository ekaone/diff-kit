# @ekaone/diff-kit

Zero-dependency text diff utilities for TypeScript, plus optional React components for rendering line and character diffs.

## Install

```bash
# Using pnpm
pnpm add @ekaone/diff-kit

# Using npm
npm install @ekaone/diff-kit

# Using yarn
yarn add @ekaone/diff-kit
```

React is an optional peer dependency. Install it only when you use `@ekaone/diff-kit/react`.

```bash
pnpm add react react-dom
```

## Core Usage

### `diff(a, b): DiffLine[]`

Line-by-line diff using an LCS algorithm.

```ts
import { diff } from "@ekaone/diff-kit";

const lines = diff("hello\nworld", "hello\nearth");
// [
//   { type: "unchanged", content: "hello" },
//   { type: "removed", content: "world" },
//   { type: "added", content: "earth" },
// ]
```

### `formatDiff(lines, options?): DiffLine[][]`

Groups changed lines into chunks with surrounding context.

```ts
import { diff, formatDiff } from "@ekaone/diff-kit";

const lines = diff(before, after);
const chunks = formatDiff(lines, { context: 3 });

for (const chunk of chunks) {
  for (const line of chunk) {
    const prefix =
      line.type === "added" ? "+" : line.type === "removed" ? "-" : " ";
    console.log(`${prefix} ${line.content}`);
  }
}
```

### `diffStats(lines): DiffStats`

Summary counts from a line diff.

```ts
import { diff, diffStats } from "@ekaone/diff-kit";

const stats = diffStats(diff(before, after));
// { added: 2, removed: 1, unchanged: 5 }
```

### `diffChars(a, b): CharDiff[]`

Character-by-character inline diff.

```ts
import { diffChars } from "@ekaone/diff-kit";

const chars = diffChars("prod", "product");
// [
//   { type: "unchanged", char: "p" },
//   { type: "unchanged", char: "r" },
//   { type: "unchanged", char: "o" },
//   { type: "unchanged", char: "d" },
//   { type: "added", char: "u" },
//   { type: "added", char: "c" },
//   { type: "added", char: "t" },
// ]
```

## React Usage

Import React components from the `@ekaone/diff-kit/react` entry point.

```tsx
import { DiffViewer } from "@ekaone/diff-kit/react";

export function ReviewDiff() {
  return (
    <DiffViewer
      before={"const status = \"draft\";"}
      after={"const status = \"published\";"}
      context={2}
    />
  );
}
```

### Components

#### `DiffViewer`

Renders a chunked line-by-line diff. It shows a stats bar by default.

```tsx
<DiffViewer before={before} after={after} context={3} showStats />
```

#### `DiffStats`

Renders only the added, removed, and unchanged counts.

```tsx
<DiffStats before={before} after={after} />
```

#### `DiffChars`

Renders an inline character diff.

```tsx
<DiffChars before="v1.4.0" after="v1.5.0-beta" />
```

#### `DiffCharsRaw`

Renders one badge per character, useful when you want to inspect the raw character diff visually.

```tsx
<DiffCharsRaw before="prod" after="product" />
```

### Styling React Components

React components include inline styles by default. Pass `theme` to adjust those styles.

```tsx
<DiffViewer
  before={before}
  after={after}
  theme={{
    added: { bg: "#ecfdf5", text: "#047857", border: "#10b981" },
    removed: { bg: "#fef2f2", text: "#b91c1c", border: "#ef4444" },
  }}
/>
```

Pass `classNames` when you prefer Tailwind or your own CSS classes. When `classNames` is provided, diff token inline styles are skipped.

```tsx
<DiffViewer
  before={before}
  after={after}
  classNames={{
    added: "bg-green-50 text-green-800",
    removed: "bg-red-50 text-red-800 line-through",
    unchanged: "text-neutral-500",
  }}
/>
```

## Types

```ts
type DiffType = "added" | "removed" | "unchanged";

interface DiffLine {
  type: DiffType;
  content: string;
}

interface DiffOptions {
  context?: number;
}

interface DiffStats {
  added: number;
  removed: number;
  unchanged: number;
}

interface CharDiff {
  type: DiffType;
  char: string;
}
```

React prop types are exported from `@ekaone/diff-kit/react`: `DiffViewerProps`, `DiffStatsProps`, `DiffCharsProps`, `DiffCharsRawProps`, `DiffTheme`, and `DiffClassNames`.

## Examples

See [examples/README.md](./examples/README.md) for runnable core and React examples.

## License

MIT (c) [Eka Prasetia](./LICENSE)

## Links

- [npm Package](https://www.npmjs.com/package/@ekaone/diff-kit)
- [GitHub Repository](https://github.com/ekaone/diff-kit)
- [Issue Tracker](https://github.com/ekaone/diff-kit/issues)

---

If this library helps you, please consider giving it a star on GitHub.

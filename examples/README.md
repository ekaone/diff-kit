# diff-kit examples

Build the package first so the examples can import from `../dist`.

```bash
pnpm build
```

## Core examples

Run line diff, chunking, and stats:

```bash
pnpm exec tsx examples/line-diff.ts
```

Run character-level diff:

```bash
pnpm exec tsx examples/character-diff.ts
```

Run a more detailed character diff report with grouped inserted and removed runs:

```bash
pnpm exec tsx examples/character-diff-report.ts
```

The older starter examples are still available:

```bash
pnpm exec tsx examples/hello.ts
pnpm exec tsx examples/string.ts
```

## React examples

These render the React components to static HTML with `react-dom/server`.

Run `DiffStats` and `DiffViewer`:

```bash
pnpm exec tsx examples/react-diff-viewer.tsx
```

Run `DiffChars` and `DiffCharsRaw`:

```bash
pnpm exec tsx examples/react-character-diff.tsx
```

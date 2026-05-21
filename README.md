# @ekaone/diff-kit

Zero-dependency line diff utility. Compute, format, and summarize text diffs.

## Install

```bash
# Using pnpm
pnpm add @ekaone/diff-kit

# Using npm
npm install @ekaone/diff-kit

# Using yarn
yarn add @ekaone/diff-kit
```

## API

### `diff(a, b): DiffLine[]`

Line-by-line diff using LCS algorithm.

```ts
import { diff } from '@ekaone/diff-kit'

const lines = diff("hello\nworld", "hello\nearth")
// [
//   { type: "unchanged", content: "hello" },
//   { type: "removed",  content: "world" },
//   { type: "added",    content: "earth" },
// ]
```

### `formatDiff(lines, options?): DiffLine[][]`

Groups diff lines into chunks with surrounding context.

```ts
import { diff, formatDiff } from '@ekaone/diff-kit'

const lines = diff(before, after)
const chunks = formatDiff(lines, { context: 3 })

chunks.forEach(chunk => {
  chunk.forEach(line => {
    const prefix = line.type === "added" ? "+" : line.type === "removed" ? "-" : " "
    console.log(`${prefix} ${line.content}`)
  })
})
```

### `diffStats(lines): DiffStats`

Summary counts from a diff.

```ts
import { diff, diffStats } from '@ekaone/diff-kit'

const stats = diffStats(diff(a, b))
// { added: 2, removed: 1, unchanged: 5 }
```

## Types

```ts
type DiffType = "added" | "removed" | "unchanged"

interface DiffLine {
  type: DiffType
  content: string
}

interface DiffOptions {
  context?: number  // default: 3
}

interface DiffStats {
  added: number
  removed: number
  unchanged: number
}
```

## License

MIT © [Eka Prasetia](./LICENSE)

## Links

- [npm Package](https://www.npmjs.com/package/@ekaone/diff-kit)
- [GitHub Repository](https://github.com/ekaone/diff-kit)
- [Issue Tracker](https://github.com/ekaone/diff-kit/issues)

---

⭐ If this library helps you, please consider giving it a star on GitHub!
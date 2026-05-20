import { diff } from "../dist/index.js";

const before =
  "Diff-kit compares one strings line by line.\nEach line in a paragraph is one entry.\nThis line will be removed.";
const after =
  "Diff-kit compares two strings line by line.\nEach line in a paragraph is one entry.\nThis line was added instead.";

console.log(diff(before, after));

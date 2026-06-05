import { diffChars } from "../dist/index.js";

const before = "production";
const after = "product";

const chars = diffChars(before, after);

const rendered = chars
  .map((part) => {
    if (part.type === "added") return `+${part.char}`;
    if (part.type === "removed") return `-${part.char}`;
    return ` ${part.char}`;
  })
  .join("");

console.log(rendered);
console.log(chars);

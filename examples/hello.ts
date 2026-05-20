import { diff } from "../dist/index.js";

const lines = diff("hello\nworld", "hello\nearth");
console.log(lines);

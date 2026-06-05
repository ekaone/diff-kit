import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { DiffStats, DiffViewer } from "../dist/react.js";

const before = [
  "const status = \"draft\";",
  "const retries = 1;",
  "send(status);",
].join("\n");

const after = [
  "const status = \"published\";",
  "const retries = 3;",
  "send(status);",
].join("\n");

const html = renderToStaticMarkup(
  <main>
    <DiffStats before={before} after={after} />
    <DiffViewer before={before} after={after} context={1} />
  </main>,
);

console.log(html);

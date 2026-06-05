import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { DiffChars, DiffCharsRaw } from "../dist/react.js";

const before = "v1.4.0";
const after = "v1.5.0-beta";

const html = renderToStaticMarkup(
  <section>
    <p>
      <DiffChars before={before} after={after} />
    </p>
    <DiffCharsRaw before={before} after={after} />
  </section>,
);

console.log(html);

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readSource = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("the page declares its language and accessible landmarks", async () => {
  const html = await readSource("index.html");

  assert.match(html, /<html lang="en-GB">/);
  assert.match(html, /<main id="main-content">/);
  assert.match(html, /class="skip-link"/);
  assert.match(html, /aria-live="polite"/);
});

test("the component playground uses a native custom element", async () => {
  const [html, script] = await Promise.all([
    readSource("index.html"),
    readSource("src/main.js"),
  ]);

  assert.match(html, /<es-button[^>]+id="playgroundButton"/);
  assert.match(script, /customElements\.define\("es-button"/);
});

test("keyboard interaction patterns are implemented", async () => {
  const script = await readSource("src/main.js");

  for (const key of ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "Escape", "Enter"]) {
    assert.ok(script.includes(key), `Expected keyboard support for ${key}`);
  }
});

test("React and TypeScript are not project dependencies", async () => {
  const packageFile = JSON.parse(await readSource("package.json"));
  const dependencies = { ...packageFile.dependencies, ...packageFile.devDependencies };

  assert.equal(dependencies.react, undefined);
  assert.equal(dependencies.typescript, undefined);
});

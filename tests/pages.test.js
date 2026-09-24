// GitHub Pages builds this repository with Jekyll 3.10 and publishes the result
// even while the repository is private (D-007). _config.yml excludes everything
// and lists what the demo needs under `include`. Jekyll's include check is looser
// than it looks: it matches each entry's own name, with `*` crossing into dotted
// names, and it also lets through any name that merely starts with a listed one.
// These tests follow that rule, so a file that would slip onto the public site,
// or a file the demo loads that would be left off it, fails CI.

"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const ROOT = path.join(__dirname, "..");

// What the site is meant to publish at the top level. CNAME appears once the
// custom domain is set (#41).
const MEANT_FOR_THE_SITE = new Set(["index.html", "LICENSE", "CNAME", "assets", "src"]);

function readInclude() {
  const lines = fs.readFileSync(path.join(ROOT, "_config.yml"), "utf8").split("\n");
  const start = lines.findIndex((line) => /^include:\s*$/.test(line));
  assert.notEqual(start, -1, "_config.yml has no include list");
  const entries = [];
  for (const line of lines.slice(start + 1)) {
    const item = line.match(/^\s+-\s+("?)([^"#\s]+)\1/);
    if (!item) break;
    entries.push(item[2]);
  }
  return entries;
}

// Jekyll 3.10's EntryFilter#glob_include?, for a name inside the source folder:
// File.fnmatch without FNM_PATHNAME, or a plain prefix match.
function includedBy(entries, name) {
  return entries.some((entry) => {
    const pattern = new RegExp(
      "^" + entry.split("*").map((part) => part.replace(/[.+?^${}()|[\]\\]/g, "\\$&")).join(".*") + "$"
    );
    return pattern.test(name) || name.startsWith(entry);
  });
}

function topLevelNames() {
  try {
    const files = execFileSync("git", ["ls-files"], { cwd: ROOT, encoding: "utf8" }).split("\n");
    return [...new Set(files.filter(Boolean).map((file) => file.split("/")[0]))];
  } catch {
    return fs.readdirSync(ROOT).filter((name) => name !== ".git" && name !== "node_modules");
  }
}

test("_config.yml excludes everything, so only what include lists is published", () => {
  const config = fs.readFileSync(path.join(ROOT, "_config.yml"), "utf8");
  assert.match(config, /^exclude:\s*\["\*"\]\s*$/m);
});

test("nothing else at the top level would be published", () => {
  const include = readInclude();
  const leaks = topLevelNames().filter((name) => includedBy(include, name) && !MEANT_FOR_THE_SITE.has(name));
  assert.deepEqual(
    leaks,
    [],
    `These would be published on the public site: ${leaks.join(", ")}. ` +
      "Rename or move them, because _config.yml lets through top-level .js and .css files " +
      "and any name that starts with an entry in its include list."
  );
});

test("every file the demo loads would be published", () => {
  const include = readInclude();
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  const local = [...html.matchAll(/\b(?:src|href)="([^"#:?]+)"/g)].map((match) => match[1]);
  assert.ok(local.length > 0, "index.html loads no local files");
  for (const file of ["index.html", ...local]) {
    assert.ok(fs.existsSync(path.join(ROOT, file)), `${file} is missing`);
    const hidden = file.split("/").find((part) => !includedBy(include, part));
    assert.equal(hidden, undefined, `${file} would be left off the site: add "${hidden}" to include in _config.yml`);
  }
});

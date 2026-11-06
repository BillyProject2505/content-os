// Regression guard for the Ubuntu 26.04 setup-python incompatibility seen in
// GitHub Actions run 42221396383. This test is intentionally static:
// CI must not need Drive credentials or render production files.
import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const paths = [
  [".github/workflows/sdoh-november-seasonal-qa.yml", "review-proof"],
  [".github/workflows/sdoh-approved-copy-render.yml", "render"],
  [".github/workflows/sdoh-bus144-automated-render-pilot.yml", "render"],
];

test("shared BUS-49 renderer environment remains pinned to canonical versions", () => {
  const action = read(".github/actions/sdoh-bus49-render/action.yml");
  const authority = JSON.parse(read("projects/sdoh/runtime/automated-content-production/render-runtime/carousel-v060-authority.json"));
  assert.equal(authority.environment.python, "3.13.5");
  assert.equal(authority.environment.pillow, "12.3.0");
  assert.equal(authority.environment.freetype, "2.14.3");
  assert.equal(authority.environment.raqm, "0.10.5");
  assert.match(action, /uses: actions\/setup-python@v5\s*\n\s*with:\s*\n\s*python-version: "3\.13\.5"/);
  assert.match(action, /sys\.version\.startswith\("3\.13\.5"\)/);
  assert.match(action, /Pillow==12\.3\.0/);
});

test("every workflow invoking BUS-49 renders on Ubuntu 24.04, never ubuntu-latest", () => {
  for (const [p, jobName] of paths) {
    const yaml = read(p);
    const start = yaml.indexOf("\n  " + jobName + ":\n");
    assert.ok(start >= 0, p + ": expected render job missing");
    const section = yaml.slice(start + 1).split(/\n  [a-zA-Z0-9_-]+:\n/)[0];
    assert.match(section, /^    runs-on: ubuntu-24\.04$/m, p);
    assert.doesNotMatch(section, /^    runs-on: ubuntu-latest$/m, p);
    assert.match(section, /uses: \.\/\.github\/actions\/sdoh-bus49-render/, p);
  }
});

test("November preview stays main-only, manual and QA-only", () => {
  const yaml = read(".github/workflows/sdoh-november-seasonal-qa.yml");
  assert.match(yaml, /workflow_dispatch:/);
  assert.match(yaml, /if: github\.ref == 'refs\/heads\/main'/);
  assert.match(yaml, /RENDER_SEASONAL_QA_ONLY/);
  assert.match(yaml, /https:\/\/www\.googleapis\.com\/auth\/drive\.readonly/);
  assert.match(yaml, /name: Run canonical approved-copy review-package validator \(QA-only\)/);
  assert.match(yaml, /name: Upload QA-only proof for explicit Owner review/);
  assert.doesNotMatch(yaml, /^\s+(schedule|pull_request_target):/m);
  const season = JSON.parse(read("projects/sdoh/runtime/seasonal-color/2026-11-trans-awareness.json"));
  assert.equal(season.activation.enabled, false);
});

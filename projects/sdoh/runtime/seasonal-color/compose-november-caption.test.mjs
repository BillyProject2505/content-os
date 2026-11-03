import test from "node:test";
import assert from "node:assert/strict";
import { composeNovemberCaption } from "./compose-november-caption.mjs";
import { assembleCaption } from "../automated-content-production/scripts/model-generation-contract.mjs";
import { readFileSync } from "node:fs";

const source = JSON.parse(readFileSync(new URL("../../content/sage/carousel/SDOH-SAGE-CAR-0014.json", import.meta.url), "utf8"));
const title = "Transgender Awareness Month November 2026";
const tagline = "To Honor and To Hold: Their Lives, Their Legacies";

test("campaign captions contain both exact lines after signature and before hashtags", () => {
  const before = JSON.stringify(source);
  const caption = composeNovemberCaption(source);
  const original = assembleCaption(source.caption_body_paragraphs, source.guardrails.editorial);
  const signature = source.guardrails.editorial.caption_required_signature;
  const hashtags = source.guardrails.editorial.caption_required_hashtags.join(" ");
  assert.equal(caption, source.caption_body_paragraphs.join("\n\n") +
    "\n\n" + signature + "\n" + title + "\n" + tagline + "\n" + hashtags);
  assert.equal(caption.split(title).length, 2);
  assert.equal(caption.split(tagline).length, 2);
  assert.equal(JSON.stringify(source), before, "Do not modify source approved copy or fingerprint");
  assert.equal(original.includes(title), false, "Global caption baseline must remain unchanged");
  assert.equal(original.includes(tagline), false, "Global caption baseline must remain unchanged");
});

test("reject duplicate footer placed inside approved body", () => {
  const copy = structuredClone(source);
  copy.caption_body_paragraphs[0] += " " + tagline;
  assert.throws(() => composeNovemberCaption(copy), /NOVEMBER_CAPTION_REJECTED/);
});

test("reject malformed canonical signature", () => {
  const copy = structuredClone(source);
  delete copy.guardrails.editorial.caption_required_signature;
  assert.throws(() => composeNovemberCaption(copy), /NOVEMBER_CAPTION_REJECTED/);
});

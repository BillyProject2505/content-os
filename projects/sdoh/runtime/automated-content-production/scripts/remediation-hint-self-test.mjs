// Deterministic remediation + observability self-test (BUS-160).
// Proves: hint is a pure function of (canonical guardrails, rejected candidate);
// it names every concrete failure; targets stay inside the unchanged gate
// windows; the real CLI sends exactly that hint and annotates each rejection.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import {
  buildRemediationHint,
  captionParagraphTarget,
  slideWordTargets,
} from "./remediation-hint.mjs";
import { MAX_REMEDIATION_HINT_LENGTH, createRequestFingerprint } from "./model-generation-contract.mjs";
import { assessEditorialQuality } from "./editorial-quality-gate.mjs";
import { DEFAULT_CLOUDFLARE_MODEL } from "./cloudflare-workers-ai-generation-adapter.mjs";

function fail(message) { throw new Error(message); }
const here = (name) => fileURLToPath(new URL(`./${name}`, import.meta.url));
const request = JSON.parse(fs.readFileSync(fileURLToPath(new URL("../pilot-requests/SDOH-SAGE-CAR-0009.json", import.meta.url)), "utf8"));
const editorial = request.editorial_quality_guardrails;
const footer = `\n\n${editorial.caption_required_signature}\n${editorial.caption_required_hashtags.join(" ")}`;

// Targets never leave the gate windows and their floor meets the total-word gate.
const targets = slideWordTargets(editorial);
targets.forEach((t, i) => {
  if (t.low < editorial.min_words_per_slide[i] || t.high > editorial.max_words_per_slide[i] || t.low > t.high) fail(`S${i + 1} target outside gate window`);
});
if (targets.reduce((sum, t) => sum + t.low, 0) < editorial.min_total_slide_words) fail("target floor below total-word gate");
const cap = captionParagraphTarget(editorial);
if (cap.paragraphs * cap.low < editorial.caption_min_body_words || cap.paragraphs * cap.high > editorial.caption_max_body_words) fail("caption target outside gate window");
console.log("PASS deterministic targets stay inside unchanged gate windows");

// Owner-rejected run 37089189231 copy (historical regression fixture).
const rejected = {
  schema_version: "1",
  content_id: "SDOH-SAGE-CAR-0009",
  slides: ["ritme berubah", "menyesuaikan diri", "tanpa rasa gagal", "izin untuk berubah", "menerima ritme baru"].map((copy, i) => ({ slide: i + 1, copy })),
  caption: "Mengenal ritme hati yang berubah. Memberi izin pada diri untuk menyesuaikan, tanpa takut gagal." + footer,
  risk_flags: [],
  research_sensitive_claims: [],
};
const reason = assessEditorialQuality(rejected, editorial).issues.join("; ");
const args = { request, rejectedCandidate: rejected, gateCode: "EDITORIAL_QUALITY_FAILED", gateReason: reason, attempt: 1 };
const hint = buildRemediationHint(args);
if (hint !== buildRemediationHint(structuredClone(args))) fail("hint is not deterministic");
if (hint.length > MAX_REMEDIATION_HINT_LENGTH) fail("hint exceeds contract bound");
for (const expected of [
  'S1 "ritme berubah": 2 words, need 5-6.',
  'S2 "menyesuaikan diri": 2 words, need 6-8; add ("kapasitas" or "keadaan" or "kebutuhan" or "hari ini") and ("cara" or "menjalani" or "langkah" or "ritme").',
  "Slides total 13 words; need at least 30.",
  "return exactly 3 paragraphs of 18-30 words each",
]) {
  if (!hint.includes(expected)) fail(`hint missing: ${expected}\n${hint}`);
}
console.log("PASS hint names every concrete slide, density and caption failure");

const drift = structuredClone(rejected);
drift.slides[3].copy = "kamu punya izin untuk berhenti sejenak dulu";
const driftHint = buildRemediationHint({ ...args, rejectedCandidate: drift, gateCode: "FORBIDDEN_SEMANTIC_DRIFT", gateReason: "candidate contains forbidden drift phrase(s): izin untuk berhenti" });
if (!driftHint.includes('remove "izin untuk berhenti"')) fail("forbidden phrase not surfaced");
console.log("PASS forbidden drift phrase surfaced per slide");

const good = {
  ...rejected,
  slides: [
    "ritme yang dulu terasa pas bisa berubah",
    "kapasitasmu hari ini mengubah cara kamu menjalaninya",
    "menyesuaikan langkah seperti ini bukan berarti kamu gagal",
    "kamu boleh memilih ritme yang lebih mungkin",
    "tetap berjalan dengan cara yang berbeda",
  ].map((copy, i) => ({ slide: i + 1, copy })),
};
const okHint = buildRemediationHint({ ...args, rejectedCandidate: good });
if (/S[1-5] "[^"]*": (?!ok\.)/.test(okHint)) fail("passing slides must be reported ok: " + okHint);
console.log("PASS slides that already pass are left as ok");

// Real CLI: attempt 1 rejected, attempt 2 must carry exactly the deterministic hint,
// and both attempts must be annotated for GitHub without credentials.
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "sdoh-remediation-"));
try {
  const output = (slides, paragraphs) => ({
    success: true, errors: [], messages: [],
    result: { response: { schema_version: "1", content_id: "SDOH-SAGE-CAR-0009", slides: slides.map((copy, i) => ({ slide: i + 1, copy })), caption_body_paragraphs: paragraphs, risk_flags: [], research_sensitive_claims: [] } },
  });
  const sparse = output(rejected.slides.map((s) => s.copy), ["Mengenal ritme hati yang berubah."]);
  const callLog = path.join(tempDir, "calls.jsonl");
  const mockPath = path.join(tempDir, "mock.mjs");
  fs.writeFileSync(mockPath, `
import fs from "node:fs";
globalThis.fetch = async (_u, init) => { fs.appendFileSync(${JSON.stringify(callLog)}, init.body + "\\n"); return { ok: true, status: 200, json: async () => (${JSON.stringify(sparse)}) }; };
`);
  const token = "test-token-not-a-real-secret-0000";
  const child = spawnSync(process.execPath, ["--import", mockPath, here("generate-content-candidate.mjs"), "--request", fileURLToPath(new URL("../pilot-requests/SDOH-SAGE-CAR-0009.json", import.meta.url)), "--output", path.join(tempDir, "out.json")], {
    encoding: "utf8",
    env: { ...process.env, GITHUB_ACTIONS: "true", CLOUDFLARE_ACCOUNT_ID: "test-account-0000", CLOUDFLARE_API_TOKEN: token, SDOH_GENERATION_MODEL: DEFAULT_CLOUDFLARE_MODEL },
  });
  if (child.status !== 1) fail("all-rejected generation must fail closed");
  const calls = fs.readFileSync(callLog, "utf8").trim().split("\n").map((l) => JSON.parse(l));
  if (calls.length !== 3) fail("expected three bounded attempts");
  const system = (c) => c.messages.find((m) => m.role === "system").content;
  const expectedHint = buildRemediationHint({
    request,
    rejectedCandidate: { ...rejected, caption: "Mengenal ritme hati yang berubah." + footer },
    gateCode: "EDITORIAL_QUALITY_FAILED",
    gateReason: assessEditorialQuality({ ...rejected, caption: "Mengenal ritme hati yang berubah." + footer }, editorial).issues.join("; "),
    attempt: 1,
  });
  if (!system(calls[1]).endsWith(expectedHint)) fail("attempt 2 did not carry the deterministic hint");
  if (new Set(calls.map((c) => c.messages.find((m) => m.role === "user").content)).size !== 1) fail("canonical request changed between attempts");
  const annotations = child.stdout.split("\n").filter((l) => l.startsWith("::"));
  if (annotations.filter((l) => l.startsWith("::warning title=SDOH gate rejection attempt ")).length !== 3) fail("each rejection must be annotated");
  if (!annotations.some((l) => l.startsWith("::error title=SDOH generation failed closed attempt 3::"))) fail("final fail-closed must be annotated");
  if (!annotations[0].includes(`request_fingerprint=${createRequestFingerprint(request)}`) || !annotations[0].includes("S1: ritme berubah")) fail("annotation lacks fingerprint or rejected copy");
  if (child.stdout.includes(token) || child.stdout.includes("test-account-0000")) fail("credentials leaked into annotations");
  console.log("PASS CLI sends the deterministic hint and annotates every rejection without credentials");
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}

console.log("SDOH deterministic remediation self-test PASS");

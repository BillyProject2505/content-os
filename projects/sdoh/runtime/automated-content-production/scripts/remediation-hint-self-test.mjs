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

// Live run 37198898819 attempt 3 (verbatim rejected slides; captions passed).
{
  const { repeatedWordCandidates } = await import("./remediation-hint.mjs");
  const { sha256Hex } = await import("./model-generation-contract.mjs");
  const passingCaption =
    "Kadang yang berubah bukan niatmu, tapi kapasitas, keadaan, atau kebutuhanmu.\n\n" +
    "Menyesuaikan ritme bukan berarti kamu kehilangan arah atau gagal menjaga komitmen. Ada waktu ketika cara lama memang tidak lagi cocok dengan hidup yang sedang kamu jalani.\n\n" +
    "Kamu boleh mencari cara yang lebih mungkin dijalani sekarang, tanpa harus menganggap perubahan itu sebagai kekalahan." + footer;
  const live = {
    ...rejected,
    caption: passingCaption,
    slides: [
      "ritme hidup kita berubah hari ini",
      "kapasitas kita berbeda menjalani hari ini",
      "menyesuaikan langkah tidak selalu gagal",
      "kita boleh memilih cara berbeda",
      "melangkah dengan ritme yang berbeda",
    ].map((copy, i) => ({ slide: i + 1, copy })),
  };
  const liveReason = assessEditorialQuality(live, editorial).issues.join("; ");
  if (liveReason !== "TOTAL_SLIDE_DENSITY_LOW:27<30; VOCABULARY_TOO_THIN:15<18") fail("live attempt-3 fixture drifted: " + liveReason);
  const requestSnapshot = JSON.stringify(request);
  const liveArgs = { request, rejectedCandidate: live, gateCode: "EDITORIAL_QUALITY_FAILED", gateReason: liveReason, attempt: 3 };
  const liveHint = buildRemediationHint(liveArgs);

  // 1. total-density failure names slides below their generation target, with exact counts
  for (const expected of [
    'S3 "menyesuaikan langkah tidak selalu gagal": 5 words, below target 8-9: add 3 word(s).',
    'S4 "kita boleh memilih cara berbeda": 5 words, below target 6-8: add 1 word(s).',
  ]) {
    if (!liveHint.includes(expected)) fail(`target-aware density missing: ${expected}\n${liveHint}`);
  }
  // 2. slides already at/above target are not lengthened
  for (const ok of ['S1 "ritme hidup kita berubah hari ini": ok.', 'S2 "kapasitas kita berbeda menjalani hari ini": ok.', 'S5 "melangkah dengan ritme yang berbeda": ok.']) {
    if (!liveHint.includes(ok)) fail(`slide at target must stay ok: ${ok}`);
  }
  // density guidance only applies while the total-word gate is failing
  const longEnough = structuredClone(live);
  longEnough.slides[0].copy = "ritme hidup kita berubah pelan pelan sekali hari ini"; // total >= 30
  const longHint = buildRemediationHint({ ...liveArgs, rejectedCandidate: longEnough, gateReason: assessEditorialQuality(longEnough, editorial).issues.join("; ") });
  if (/below target/.test(longHint)) fail("gate-valid slides must not be lengthened when total density passes");
  console.log("PASS target-aware density remediation names only slides below target");

  // 3. vocabulary-thin failure lists deterministic repeated-word candidates
  const expectedRepeated = 'Repeated words: "berbeda" x3 (replace in S2, S4); "kita" x3 (replace in S1, S2, S4); "hari" x2 (replace in S1).';
  if (!liveHint.includes(expectedRepeated)) fail(`repeated-word remediation mismatch\n${liveHint}`);
  // 4. protected/required words are excluded
  const candidates = repeatedWordCandidates(live.slides, editorial, request.semantic_guardrails);
  if (candidates.some((c) => c.word === "ritme")) fail("semantic anchor 'ritme' must never be a replacement candidate");
  if (candidates.find((c) => c.word === "berbeda").replaceable.includes(5)) fail("S5 'berbeda' carries a required S5 anchor and must be protected");
  if (candidates.find((c) => c.word === "hari").replaceable.includes(2)) fail("S2 'hari ini' carries a required S2 anchor and must be protected");
  console.log("PASS repeated-word remediation is deterministic and excludes protected anchors");

  // 5./6. identical rejected candidate -> identical hint and fingerprint
  const again = buildRemediationHint(structuredClone(liveArgs));
  if (again !== liveHint || sha256Hex(again) !== sha256Hex(liveHint)) fail("hint or fingerprint not deterministic");
  if (liveHint.length > MAX_REMEDIATION_HINT_LENGTH) fail("hint exceeds contract bound");
  // 7. canonical request unchanged
  if (JSON.stringify(request) !== requestSnapshot) fail("remediation mutated the canonical request");
  console.log("PASS identical input yields identical hint/fingerprint; canonical request untouched");
}

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

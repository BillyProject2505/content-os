// BUS-160 / BUS-161 regression: a retry remediation hint is a non-canonical
// provider hint and must not change the canonical request fingerprint, while a
// real change to the canonical request must still invalidate old candidates.
//
// Runs the real generation CLI, contract, both gates, render manifest builder
// and review-package QA. Only the Cloudflare HTTP endpoint and the BUS-49
// render report are mocked.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { createRequestFingerprint } from "./model-generation-contract.mjs";
import { DEFAULT_CLOUDFLARE_MODEL } from "./cloudflare-workers-ai-generation-adapter.mjs";

function fail(message) { throw new Error(message); }
const here = (name) => fileURLToPath(new URL(`./${name}`, import.meta.url));
const sha256 = (value) => createHash("sha256").update(value).digest("hex");

const requestPath = fileURLToPath(new URL("../pilot-requests/SDOH-SAGE-CAR-0009.json", import.meta.url));
const authorityPath = fileURLToPath(new URL("../render-runtime/carousel-v060-authority.json", import.meta.url));
const request = JSON.parse(fs.readFileSync(requestPath, "utf8"));
const authority = JSON.parse(fs.readFileSync(authorityPath, "utf8"));
const canonicalFingerprint = createRequestFingerprint(request);

const goodSlides = [
  "ritme yang dulu terasa pas bisa berubah hari ini",
  "kapasitasmu berubah begitu juga cara kamu menjalaninya",
  "menyesuaikan langkah bukan berarti kamu gagal",
  "kamu boleh memilih ritme yang lebih mungkin dijalani",
  "tetap berjalan tak harus dengan cara yang sama",
];
const goodParagraphs = [
  "Kadang yang berubah bukan niatmu, tapi kapasitas, keadaan, atau kebutuhanmu.",
  "Menyesuaikan ritme bukan berarti kamu kehilangan arah atau gagal menjaga komitmen. Ada waktu ketika cara lama memang tidak lagi cocok dengan hidup yang sedang kamu jalani.",
  "Kamu boleh mencari cara yang lebih mungkin dijalani sekarang, tanpa harus menganggap perubahan itu sebagai kekalahan.",
];
const providerOutput = (slides) => ({
  schema_version: "1",
  content_id: "SDOH-SAGE-CAR-0009",
  slides: slides.map((copy, index) => ({ slide: index + 1, copy })),
  caption_body_paragraphs: goodParagraphs,
  risk_flags: [],
  research_sensitive_claims: [],
});
const envelope = (output) => ({
  success: true,
  errors: [],
  messages: [],
  result: { choices: [{ finish_reason: "stop", message: { role: "assistant", content: JSON.stringify(output) } }] },
});

const sparseSlides = [...goodSlides];
sparseSlides[2] = "menyesuaikan langkah, bukan gagal";

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "sdoh-retry-fingerprint-"));
try {
  // --- Generation: attempt 1 fails the Editorial Gate, attempt 2 passes ---
  const callLog = path.join(tempDir, "provider-calls.jsonl");
  const mockPath = path.join(tempDir, "mock-provider.mjs");
  fs.writeFileSync(mockPath, `
import fs from "node:fs";
const responses = ${JSON.stringify([envelope(providerOutput(sparseSlides)), envelope(providerOutput(goodSlides))])};
let call = 0;
globalThis.fetch = async (_url, init) => {
  fs.appendFileSync(${JSON.stringify(callLog)}, init.body + "\\n");
  const body = responses[Math.min(call, responses.length - 1)];
  call += 1;
  return { ok: true, status: 200, json: async () => body };
};
`);
  const candidatePath = path.join(tempDir, "candidate.json");
  const diagnosticsDir = path.join(tempDir, "diagnostics");
  const generation = spawnSync(process.execPath, ["--import", mockPath, here("generate-content-candidate.mjs"), "--request", requestPath, "--output", candidatePath], {
    encoding: "utf8",
    env: {
      ...process.env,
      CLOUDFLARE_ACCOUNT_ID: "test-account-0000",
      CLOUDFLARE_API_TOKEN: "test-token-not-a-real-secret-0000",
      SDOH_GENERATION_MODEL: DEFAULT_CLOUDFLARE_MODEL,
      SDOH_GENERATION_DIAGNOSTICS_DIR: diagnosticsDir,
    },
  });
  if (generation.status !== 0) fail("retry generation failed: " + (generation.stderr || generation.stdout).slice(0, 600));

  const calls = fs.readFileSync(callLog, "utf8").trim().split("\n").map((line) => JSON.parse(line));
  if (calls.length !== 2) fail(`expected exactly two provider calls, got ${calls.length}`);
  const userMessage = (call) => call.messages.find((m) => m.role === "user").content;
  const systemMessage = (call) => call.messages.find((m) => m.role === "system").content;
  if (userMessage(calls[0]) !== userMessage(calls[1])) fail("retry changed the canonical request sent to the provider");
  if (systemMessage(calls[0]).includes("RETRY REMEDIATION")) fail("first attempt must not carry a remediation hint");
  if (!systemMessage(calls[1]).includes("RETRY REMEDIATION") || !systemMessage(calls[1]).includes("S3_TOO_SPARSE")) fail("retry hint did not reach the provider");
  console.log("PASS retry hint reaches provider without changing canonical request payload");

  const rejected = JSON.parse(fs.readFileSync(path.join(diagnosticsDir, "rejected-attempt-1.json"), "utf8"));
  const candidate = JSON.parse(fs.readFileSync(candidatePath, "utf8"));
  const meta = candidate.generation_metadata;
  if (rejected.request_fingerprint !== canonicalFingerprint) fail("attempt 1 fingerprint is not canonical F");
  if (meta.request_fingerprint !== canonicalFingerprint) fail("attempt 2 fingerprint drifted from canonical F");
  if (meta.generation_attempt !== 2) fail("accepted candidate must record generation_attempt 2");
  if (!meta.remediation_hint || meta.remediation_hint_fingerprint !== sha256(meta.remediation_hint)) fail("remediation provenance missing or inconsistent");
  if (candidate.approval || candidate.publication_state) fail("candidate implies approval/publication");
  console.log("PASS attempt 1 and attempt 2 share canonical fingerprint F; hint recorded as provenance");

  // --- Render manifest: accepts the attempt-2 candidate against the committed request ---
  const build = (requestFile, candidateFile, out) => spawnSync(process.execPath, [
    here("build-carousel-render-manifest.mjs"),
    "--candidate", candidateFile,
    "--request", requestFile,
    "--authority", authorityPath,
    "--expected-response-fingerprint", JSON.parse(fs.readFileSync(candidateFile, "utf8")).generation_metadata.response_fingerprint,
    "--out", out,
  ], { encoding: "utf8" });
  const manifestPath = path.join(tempDir, "manifest.json");
  const accepted = build(requestPath, candidatePath, manifestPath);
  if (accepted.status !== 0 || !fs.existsSync(manifestPath)) fail("render builder rejected a valid retry candidate: " + accepted.stderr.slice(0, 600));
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  if (JSON.stringify(manifest.slides.map((s) => s.character.pose_id)) !== JSON.stringify(authority.sage_default_visual_plan.pose_route)) fail("visual plan drifted");
  console.log("PASS render builder accepts attempt-2 candidate (integrity, semantic and editorial gates)");

  // --- Negative: the canonical request really changed -> old candidate rejected ---
  const changedRequestPath = path.join(tempDir, "changed-request.json");
  fs.writeFileSync(changedRequestPath, JSON.stringify({ ...request, core_concept: request.core_concept + " (revised)" }));
  const changedOut = path.join(tempDir, "changed-manifest.json");
  const changed = build(changedRequestPath, candidatePath, changedOut);
  if (changed.status === 0 || fs.existsSync(changedOut) || !changed.stderr.includes("REQUEST_FINGERPRINT_MISMATCH")) fail("changed canonical request must reject the old candidate");
  console.log("PASS canonical request change invalidates old candidate (REQUEST_FINGERPRINT_MISMATCH)");

  // --- Negative: tampering with retry provenance breaks integrity ---
  const tampered = structuredClone(candidate);
  tampered.generation_metadata.remediation_hint = "tampered hint";
  const tamperedPath = path.join(tempDir, "tampered.json");
  fs.writeFileSync(tamperedPath, JSON.stringify(tampered));
  const tamperedOut = path.join(tempDir, "tampered-manifest.json");
  const tamperedBuild = build(requestPath, tamperedPath, tamperedOut);
  if (tamperedBuild.status === 0 || fs.existsSync(tamperedOut) || !/RETRY_PROVENANCE_INVALID|RESPONSE_FINGERPRINT_MISMATCH/.test(tamperedBuild.stderr)) fail("tampered retry provenance must be rejected");
  console.log("PASS tampered retry provenance rejected");

  // --- Review package (mock BUS-49 render report) stops at READY_FOR_OWNER_REVIEW ---
  const renderDir = path.join(tempDir, "rendered");
  fs.mkdirSync(renderDir);
  const outputs = authority.sage_default_visual_plan.pose_route.map((pose, index) => {
    const filename = `mock_S${String(index + 1).padStart(2, "0")}.jpg`;
    const file = path.join(renderDir, filename);
    fs.writeFileSync(file, `mock-render-${index + 1}`);
    return {
      slide: index + 1, filename, sha256: sha256(fs.readFileSync(file)), dimensions: [1080, 1350],
      icc_present: true, exif_entries: 0, jpeg_sampling: 0, main_text_ink_width_px: 500,
      character: { pose_id: pose, sha256: authority.poses[pose].sha256, anchor: "lower_right", scale: "md", ground_mode: "embedded" },
    };
  });
  fs.writeFileSync(path.join(renderDir, "render_report.json"), JSON.stringify({
    template_version: authority.renderer.version, content_id: "SDOH-SAGE-CAR-0009", theme: "SAGE",
    layout_mode: "illustrated_single_character", asset_hashes: { font: authority.font.sha256 }, outputs,
  }));
  const reviewPath = path.join(tempDir, "review_package.json");
  const qa = spawnSync(process.execPath, [
    here("validate-carousel-review-package.mjs"),
    "--report", path.join(renderDir, "render_report.json"),
    "--manifest", manifestPath,
    "--candidate", candidatePath,
    "--authority", authorityPath,
    "--generation-run-id", "123456789",
    "--out", reviewPath,
  ], { encoding: "utf8" });
  if (qa.status !== 0) fail("review package QA failed: " + qa.stderr.slice(0, 600));
  const review = JSON.parse(fs.readFileSync(reviewPath, "utf8"));
  if (review.state !== "READY_FOR_OWNER_REVIEW" || review.approval !== "NOT_GRANTED" || review.publication_state !== "PLANNED") fail("review package crossed the Owner boundary");
  if (review.source_candidate.generation_run_id !== "123456789" || review.source_candidate.generation_attempt !== 2 || review.source_candidate.request_fingerprint !== canonicalFingerprint) fail("review package lost traceability");
  console.log("PASS review package records run/attempt provenance and stops at READY_FOR_OWNER_REVIEW");
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}

console.log("SDOH retry fingerprint regression self-test PASS");

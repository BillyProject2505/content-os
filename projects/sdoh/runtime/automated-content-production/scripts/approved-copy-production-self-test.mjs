// BUS-160 approved-copy Production Path self-test.
//
// Runs the real production scripts (contract, both gates, manifest builder,
// Technical QA / review-package validator). Only the BUS-49 render report is
// mocked: the real renderer and its Drive-hosted binaries exist only inside the
// render workflow. Fixtures live in a temp directory; no copy is ever written
// to the canonical content directory by this test.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import {
  APPROVED_COPY_DIR,
  assertManifestMatchesCopy,
  discoverApprovedContentIds,
  loadApprovedCopy,
  runApprovedCopyGates,
  sealCopyFingerprint,
  validateApprovedCopy,
} from "./approved-copy-contract.mjs";
import { finalizeGenerationResponse } from "./model-generation-contract.mjs";
import { DEFAULT_CLOUDFLARE_MODEL } from "./cloudflare-workers-ai-generation-adapter.mjs";

function fail(message) { throw new Error(message); }
function expect(condition, message) { if (!condition) fail(message); }
const here = (name) => fileURLToPath(new URL(`./${name}`, import.meta.url));
const repoRoot = fileURLToPath(new URL("../../../../../", import.meta.url));
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const clone = (value) => structuredClone(value);

const requestPath = fileURLToPath(new URL("../pilot-requests/SDOH-SAGE-CAR-0009.json", import.meta.url));
const authorityPath = fileURLToPath(new URL("../render-runtime/carousel-v060-authority.json", import.meta.url));
const request = JSON.parse(fs.readFileSync(requestPath, "utf8"));
const authority = JSON.parse(fs.readFileSync(authorityPath, "utf8"));

// Test-only content item. Never a real approved item.
const CONTENT_ID = "SDOH-SAGE-CAR-0900";
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

function draft({ slides = goodSlides, paragraphs = goodParagraphs, status = "COPY_APPROVED", contentId = CONTENT_ID } = {}) {
  return {
    content_id: contentId,
    status,
    theme: "SAGE",
    slides: slides.map((copy, index) => ({ slide: index + 1, copy })),
    caption_body_paragraphs: [...paragraphs],
    guardrails: {
      semantic: clone(request.semantic_guardrails),
      editorial: clone(request.editorial_quality_guardrails),
    },
  };
}
const seal = (copy) => ({ ...copy, copy_fingerprint: sealCopyFingerprint(copy) });
const codeOf = (fn) => {
  try { fn(); } catch (error) { return error.code ?? `ERR:${error.message}`; }
  return null;
};

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "sdoh-approved-copy-"));
try {
  const contentDir = path.join(tempDir, "content");
  fs.mkdirSync(contentDir);
  const writeCopy = (copy, dir = contentDir) => {
    fs.writeFileSync(path.join(dir, `${copy.content_id}.json`), JSON.stringify(copy, null, 2));
    return copy;
  };
  const build = (contentId, fingerprint, name, dir = contentDir, extraEnv = {}) => {
    const out = path.join(tempDir, `${name}-manifest.json`);
    const snapshot = path.join(tempDir, `${name}-snapshot.json`);
    const run = spawnSync(process.execPath, [
      here("build-approved-copy-render-manifest.mjs"),
      "--content-id", contentId,
      "--copy-dir", dir,
      "--authority", authorityPath,
      "--expected-copy-fingerprint", fingerprint,
      "--out", out,
      "--snapshot-out", snapshot,
    ], { encoding: "utf8", env: { ...process.env, ...extraEnv } });
    return { run, out, snapshot };
  };

  const approved = writeCopy(seal(draft()));
  const fingerprint = approved.copy_fingerprint;

  // [1] A valid COPY_APPROVED item is accepted and discovered.
  const loaded = loadApprovedCopy(CONTENT_ID, { dir: contentDir, expectedCopyFingerprint: fingerprint });
  expect(loaded.copy.status === "COPY_APPROVED" && loaded.copy.copy_fingerprint === fingerprint, "approved copy not accepted");
  runApprovedCopyGates(loaded.copy);
  writeCopy(seal(draft({ status: "COPY_DRAFT", contentId: "SDOH-SAGE-CAR-0901" })));
  fs.writeFileSync(path.join(contentDir, "SDOH-SAGE-CAR-0902.json"), "{ not json");
  expect(JSON.stringify(discoverApprovedContentIds(contentDir)) === JSON.stringify([CONTENT_ID]), "discovery must list only COPY_APPROVED items");
  expect(JSON.stringify(discoverApprovedContentIds(path.join(tempDir, "missing"))) === "[]", "missing directory must discover nothing");
  expect(APPROVED_COPY_DIR === "projects/sdoh/content/sage/carousel", "canonical copy directory changed");
  console.log("PASS [1] valid COPY_APPROVED item accepted and discovered");

  // [2] Non-approved copy is rejected (state is checked before content).
  for (const status of ["COPY_DRAFT", "EDITORIAL_REVIEW", "READY_FOR_RENDER", "APPROVED", "READY", undefined]) {
    const copy = seal(draft());
    if (status === undefined) delete copy.status; else copy.status = status;
    expect(codeOf(() => validateApprovedCopy(copy)) === "COPY_NOT_APPROVED", `status ${status} must be COPY_NOT_APPROVED`);
  }
  const draftOnly = writeCopy(seal(draft({ status: "EDITORIAL_REVIEW", contentId: "SDOH-SAGE-CAR-0903" })));
  const draftBuild = build(draftOnly.content_id, draftOnly.copy_fingerprint, "draft");
  expect(draftBuild.run.status !== 0 && /COPY_NOT_APPROVED/.test(draftBuild.run.stderr), "CLI must reject non-approved copy");
  expect(!fs.existsSync(draftBuild.out) && !fs.existsSync(draftBuild.snapshot), "rejected copy must not produce a manifest or snapshot");
  const missing = build("SDOH-SAGE-CAR-0904", fingerprint, "missing");
  expect(missing.run.status !== 0 && /COPY_NOT_FOUND/.test(missing.run.stderr), "missing canonical copy must be rejected");
  console.log("PASS [2] non-approved or missing copy rejected before render");

  // [3] Malformed copy is rejected.
  const malformed = {
    "four slides": (c) => { c.slides.pop(); },
    "slide order": (c) => { c.slides[1].slide = 3; },
    "empty slide": (c) => { c.slides[2].copy = " "; },
    "multi-line slide": (c) => { c.slides[0].copy = "ritme yang\nberubah"; },
    "extra slide field": (c) => { c.slides[0].font_size = 90; },
    "unknown top-level field": (c) => { c.approval = "GRANTED"; },
    "publication field": (c) => { c.publication_state = "SCHEDULED"; },
    "no caption paragraphs": (c) => { c.caption_body_paragraphs = []; },
    "hashtag in body": (c) => { c.caption_body_paragraphs[0] += " #obathati"; },
    "signature in body": (c) => { c.caption_body_paragraphs[0] += " satu dosis obat hati"; },
    "missing guardrails": (c) => { delete c.guardrails; },
    "weakened hashtags": (c) => { c.guardrails.editorial.caption_required_hashtags.pop(); },
    "weakened signature": (c) => { c.guardrails.editorial.caption_required_signature = "dosis"; },
    "bad content id": (c) => { c.content_id = "SDOH-SAGE-CAR-9"; },
    "burgundy theme": (c) => { c.theme = "BURGUNDY"; },
    "not an object": null,
  };
  for (const [name, mutate] of Object.entries(malformed)) {
    const copy = mutate === null ? "text" : seal(draft());
    if (mutate) mutate(copy);
    const code = codeOf(() => validateApprovedCopy(copy));
    expect(code !== null && /^COPY_|^SEMANTIC_|^EDITORIAL_|^REQUEST_/.test(code), `malformed copy accepted or wrong error (${name}): ${code}`);
  }
  console.log("PASS [3] malformed copy rejected (" + Object.keys(malformed).length + " cases)");

  // [4] Fingerprint / integrity divergence is rejected.
  const tamperedText = clone(approved);
  tamperedText.slides[2].copy = "menyesuaikan langkah bukan berarti kamu salah";
  expect(codeOf(() => validateApprovedCopy(tamperedText)) === "COPY_FINGERPRINT_MISMATCH", "edited slide after approval must break the fingerprint");
  const tamperedCaption = clone(approved);
  tamperedCaption.caption_body_paragraphs[0] += " Tambahan.";
  expect(codeOf(() => validateApprovedCopy(tamperedCaption)) === "COPY_FINGERPRINT_MISMATCH", "edited caption after approval must break the fingerprint");
  const loosened = clone(approved);
  loosened.guardrails.editorial.min_total_slide_words = 28;
  expect(codeOf(() => validateApprovedCopy(loosened)) === "COPY_FINGERPRINT_MISMATCH", "loosening guardrails after approval must break the fingerprint");
  const noFingerprint = clone(approved);
  delete noFingerprint.copy_fingerprint;
  expect(codeOf(() => validateApprovedCopy(noFingerprint)) === "COPY_FINGERPRINT_INVALID", "missing fingerprint must be rejected");
  expect(
    codeOf(() => validateApprovedCopy(approved, { expectedCopyFingerprint: "0".repeat(64) })) === "COPY_FINGERPRINT_MISMATCH",
    "a fingerprint other than the pinned one must be rejected"
  );
  expect(codeOf(() => validateApprovedCopy(approved, { expectedContentId: "SDOH-SAGE-CAR-0001" })) === "COPY_CONTENT_ID_MISMATCH", "content id mismatch must be rejected");
  const pinned = build(CONTENT_ID, "f".repeat(64), "pinned");
  expect(pinned.run.status !== 0 && /COPY_FINGERPRINT_MISMATCH/.test(pinned.run.stderr) && !fs.existsSync(pinned.out), "CLI must reject a copy that diverges from the pinned fingerprint");
  const fileTamper = clone(approved);
  fileTamper.slides[0].copy = "ritme yang dulu terasa pas bisa berubah esok hari";
  writeCopy(fileTamper);
  const tamperBuild = build(CONTENT_ID, fingerprint, "tamper");
  expect(tamperBuild.run.status !== 0 && /COPY_FINGERPRINT_MISMATCH/.test(tamperBuild.run.stderr) && !fs.existsSync(tamperBuild.out), "CLI must reject an edited approved file");
  writeCopy(approved);
  console.log("PASS [4] fingerprint divergence rejected (content, caption, guardrails, pin, missing)");

  // [5] Semantic failure fails closed, with no manifest and no rewrite offered.
  const offTopic = writeCopy(seal(draft({
    contentId: "SDOH-SAGE-CAR-0905",
    slides: [
      "pagi ini terasa lebih pelan dari biasanya",
      "tubuhmu sedang meminta ruang untuk bernapas",
      "kamu tidak harus segera paham semuanya",
      "tidak apa apa jika masih belum jelas",
      "duduk saja dulu di sini bersamaku",
    ],
  })));
  const semanticBuild = build(offTopic.content_id, offTopic.copy_fingerprint, "semantic");
  expect(semanticBuild.run.status !== 0 && /SEMANTIC_ALIGNMENT_FAILED/.test(semanticBuild.run.stderr), "semantic failure must be rejected");
  expect(/FAIL CLOSED/.test(semanticBuild.run.stderr) && /editorial review/.test(semanticBuild.run.stderr), "semantic failure must route back to editorial review");
  expect(!fs.existsSync(semanticBuild.out) && !fs.existsSync(semanticBuild.snapshot), "semantic failure must not produce render input");
  const drifted = writeCopy(seal(draft({
    contentId: "SDOH-SAGE-CAR-0906",
    slides: [...goodSlides.slice(0, 4), "tetap berjalan dalam napas dalam diam sekarang"],
  })));
  const driftBuild = build(drifted.content_id, drifted.copy_fingerprint, "drift");
  expect(driftBuild.run.status !== 0 && /FORBIDDEN_SEMANTIC_DRIFT/.test(driftBuild.run.stderr) && !fs.existsSync(driftBuild.out), "forbidden semantic drift must fail closed");
  console.log("PASS [5] semantic failure fails closed (SEMANTIC_ALIGNMENT_FAILED, FORBIDDEN_SEMANTIC_DRIFT)");

  // [6] Editorial failure fails closed (Owner-rejected run 37089189231 copy).
  const sparse = writeCopy(seal(draft({
    contentId: "SDOH-SAGE-CAR-0907",
    slides: ["ritme berubah", "menyesuaikan diri", "tanpa rasa gagal", "izin untuk berubah", "menerima ritme baru"],
  })));
  const editorialBuild = build(sparse.content_id, sparse.copy_fingerprint, "editorial");
  expect(editorialBuild.run.status !== 0 && /EDITORIAL_QUALITY_FAILED/.test(editorialBuild.run.stderr) && /S1_TOO_SPARSE/.test(editorialBuild.run.stderr), "editorial failure must be rejected with its gate code");
  expect(/FAIL CLOSED/.test(editorialBuild.run.stderr) && !fs.existsSync(editorialBuild.out) && !fs.existsSync(editorialBuild.snapshot), "editorial failure must not produce render input");
  const shortCaption = writeCopy(seal(draft({ contentId: "SDOH-SAGE-CAR-0908", paragraphs: ["Kadang ritme berubah."] })));
  const captionBuild = build(shortCaption.content_id, shortCaption.copy_fingerprint, "caption");
  expect(captionBuild.run.status !== 0 && /EDITORIAL_QUALITY_FAILED/.test(captionBuild.run.stderr), "thin caption must fail the editorial gate");
  console.log("PASS [6] editorial failure fails closed (EDITORIAL_QUALITY_FAILED)");

  // [7] The renderer receives exactly the approved copy.
  const good = build(CONTENT_ID, fingerprint, "good");
  expect(good.run.status === 0, "approved copy build failed: " + good.run.stderr);
  expect(/semantic_gate=PASS/.test(good.run.stdout) && /editorial_gate=PASS/.test(good.run.stdout), "both gates must run on the Production Path");
  const manifest = JSON.parse(fs.readFileSync(good.out, "utf8"));
  const snapshot = JSON.parse(fs.readFileSync(good.snapshot, "utf8"));
  expect(JSON.stringify(snapshot) === JSON.stringify(validateApprovedCopy(approved)), "run snapshot must equal the validated approved copy");
  manifest.slides.forEach((slide, index) => {
    expect(slide.copy.split(/\s+/).join(" ") === goodSlides[index], `manifest slide ${index + 1} is not the exact approved copy`);
  });
  expect(manifest.slides[0].copy === "ritme yang dulu\nterasa pas bisa\nberubah hari ini", "line-break policy mismatch S1");
  expect(manifest.slides[2].copy === "menyesuaikan langkah\nbukan berarti kamu gagal", "line-break policy mismatch S3");
  const altered = clone(manifest);
  altered.slides[3].copy = "kamu boleh memilih ritme yang lebih\nmungkin dijalani nanti";
  expect(codeOf(() => assertManifestMatchesCopy(altered, snapshot)) === "MANIFEST_COPY_MISMATCH", "paraphrased manifest text must be detected");
  const shortened = clone(manifest);
  shortened.slides[1].copy = "kapasitasmu berubah\nbegitu juga caramu";
  expect(codeOf(() => assertManifestMatchesCopy(shortened, snapshot)) === "MANIFEST_COPY_MISMATCH", "shortened manifest text must be detected");
  console.log("PASS [7] renderer input is the exact approved copy (fingerprinted snapshot, no rewrite)");

  // [8] BUS-49 integration: the manifest is byte-compatible with the generation path.
  const candidate = finalizeGenerationResponse({
    schema_version: "1",
    content_id: "SDOH-SAGE-CAR-0009",
    slides: goodSlides.map((copy, index) => ({ slide: index + 1, copy })),
    caption: goodParagraphs.join("\n\n") + "\n\nsatu dosis obat hati\n#satudosisobathati #obathati #manado #mentalhealthmanado #pelanpelanaja",
    risk_flags: [],
    research_sensitive_claims: [],
  }, { request, provider: "cloudflare-workers-ai", model: DEFAULT_CLOUDFLARE_MODEL });
  const candidatePath = path.join(tempDir, "legacy-candidate.json");
  const legacyManifestPath = path.join(tempDir, "legacy-manifest.json");
  fs.writeFileSync(candidatePath, JSON.stringify(candidate));
  const legacy = spawnSync(process.execPath, [
    here("build-carousel-render-manifest.mjs"),
    "--candidate", candidatePath, "--request", requestPath, "--authority", authorityPath,
    "--expected-response-fingerprint", candidate.generation_metadata.response_fingerprint,
    "--out", legacyManifestPath,
  ], { encoding: "utf8" });
  expect(legacy.status === 0, "legacy manifest build failed: " + legacy.stderr);
  const legacyManifest = JSON.parse(fs.readFileSync(legacyManifestPath, "utf8"));
  const visualProjection = (m) => ({
    theme: m.theme,
    layout_mode: m.layout_mode,
    slides: m.slides.map((slide) => ({
      slide_number: slide.slide_number,
      optical_y_correction: slide.optical_y_correction,
      character: slide.character,
    })),
  });
  expect(JSON.stringify(visualProjection(manifest)) === JSON.stringify(visualProjection(legacyManifest)), "Production/Optional paths must share the same BUS-49 visual contract");
  expect(manifest.layout_mode === "illustrated_single_character" && manifest.theme === "SAGE", "layout/theme mismatch");
  expect(JSON.stringify(manifest.slides.map((s) => s.character.pose_id)) === JSON.stringify(authority.sage_default_visual_plan.pose_route), "visual plan drifted");
  expect(manifest.slides.every((s) => s.character.anchor === "lower_right" && s.character.scale === "md" && s.character.ground_mode === "embedded" && s.optical_y_correction === 0), "character placement is not the canonical deterministic plan");
  console.log("PASS [8] Production/Optional paths share BUS-49 visual authority while Production copy integrity remains independently fingerprint-verified");

  // [9] Technical QA: passes on a conformant render report, fails closed otherwise.
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
  const writeReport = (name, mutate) => {
    const report = {
      template_version: authority.renderer.version, content_id: CONTENT_ID, theme: "SAGE",
      layout_mode: "illustrated_single_character", asset_hashes: { font: authority.font.sha256 },
      outputs: clone(outputs),
    };
    if (mutate) mutate(report);
    const file = path.join(renderDir, name);
    fs.writeFileSync(file, JSON.stringify(report));
    return file;
  };
  const qa = (reportFile, extra = [], { manifestFile = good.out, copyFile = good.snapshot, fp = fingerprint, out = "review" } = {}) =>
    spawnSync(process.execPath, [
      here("validate-carousel-review-package.mjs"),
      "--report", reportFile, "--manifest", manifestFile, "--copy", copyFile,
      "--expected-copy-fingerprint", fp, "--authority", authorityPath,
      "--out", path.join(tempDir, `${out}.json`), ...extra,
    ], { encoding: "utf8" });
  const reportFile = writeReport("render_report.json");
  const passed = qa(reportFile);
  expect(passed.status === 0 && /technical_qa=PASS/.test(passed.stdout), "Technical QA failed on a conformant report: " + passed.stderr.slice(0, 500));
  const negatives = {
    "text overflow": (r) => { r.outputs[0].main_text_ink_width_px = 601; },
    "EXIF present": (r) => { r.outputs[1].exif_entries = 1; },
    "no ICC": (r) => { r.outputs[2].icc_present = false; },
    "wrong canvas": (r) => { r.outputs[3].dimensions = [1080, 1080]; },
    "wrong pose": (r) => { r.outputs[4].character.pose_id = "P01"; },
    "wrong content id": (r) => { r.content_id = "SDOH-SAGE-CAR-0001"; },
    "JPEG hash drift": (r) => { r.outputs[0].sha256 = "0".repeat(64); },
  };
  for (const [name, mutate] of Object.entries(negatives)) {
    const failed = qa(writeReport(`bad-${name.replace(/\W+/g, "-")}.json`, mutate), [], { out: `bad-${name.replace(/\W+/g, "-")}` });
    expect(failed.status !== 0, `Technical QA accepted: ${name}`);
    expect(!fs.existsSync(path.join(tempDir, `bad-${name.replace(/\W+/g, "-")}.json`)), `review package written for: ${name}`);
  }
  console.log("PASS [9] Technical QA passes a conformant render and fails closed on " + Object.keys(negatives).length + " violations");

  // QA also re-verifies integrity and that the renderer got the approved copy.
  const badManifestPath = path.join(tempDir, "bad-manifest.json");
  fs.writeFileSync(badManifestPath, JSON.stringify(altered));
  const badManifest = qa(reportFile, [], { manifestFile: badManifestPath, out: "bad-manifest-pkg" });
  expect(badManifest.status !== 0 && /MANIFEST_COPY_MISMATCH|differs from approved copy/.test(badManifest.stderr), "QA must reject a manifest that differs from the approved copy");
  const badSnapshotPath = path.join(tempDir, "bad-snapshot.json");
  fs.writeFileSync(badSnapshotPath, JSON.stringify(tamperedText));
  const badSnapshot = qa(reportFile, [], { copyFile: badSnapshotPath, out: "bad-snapshot-pkg" });
  expect(badSnapshot.status !== 0 && /COPY_FINGERPRINT_MISMATCH/.test(badSnapshot.stderr), "QA must reject a diverged copy snapshot");
  const badPin = qa(reportFile, [], { fp: "a".repeat(64), out: "bad-pin-pkg" });
  expect(badPin.status !== 0 && /COPY_FINGERPRINT_MISMATCH/.test(badPin.stderr), "QA must reject a different pinned fingerprint");
  const bothSources = qa(reportFile, ["--candidate", candidatePath], { out: "both-pkg" });
  expect(bothSources.status !== 0 && /exactly one/.test(bothSources.stderr), "QA must require exactly one source");
  console.log("PASS [9b] QA re-verifies copy integrity, gates and manifest-to-copy equality");

  // [10] + [11] Final state and Owner approval boundary.
  const review = JSON.parse(fs.readFileSync(path.join(tempDir, "review.json"), "utf8"));
  expect(review.state === "READY_FOR_OWNER_REVIEW", "final state must be READY_FOR_OWNER_REVIEW");
  expect(review.production_path === "APPROVED_COPY" && review.content_id === CONTENT_ID, "review package must record the Production Path and content id");
  expect(review.source_copy.status === "COPY_APPROVED" && review.source_copy.copy_fingerprint === fingerprint, "review package lost copy traceability");
  expect(!("source_candidate" in review), "Production Path package must not reference a generation candidate");
  expect(review.technical_qa.result === "PASS" && review.outputs.length === 5, "technical QA evidence incomplete");
  console.log("PASS [10] final state is READY_FOR_OWNER_REVIEW");
  expect(review.approval === "NOT_GRANTED", "Owner approval must remain NOT_GRANTED");
  expect(review.publication_state === "PLANNED", "publication state must remain PLANNED");
  for (const key of ["approved_at", "approved_by", "scheduled_at", "published_at", "schedule", "bus140"]) {
    expect(!(key in review), `review package must not carry ${key}`);
  }
  expect(!/APPROVED|SCHEDULED|PUBLISHED/.test(JSON.stringify({ state: review.state, approval: review.approval, publication: review.publication_state })), "state fields must not imply approval, scheduling or publication");
  console.log("PASS [11] Owner approval NOT_GRANTED; publication PLANNED");

  // [12] BUS-140 / publication is never invoked, and no model is needed.
  const scripts = [
    "approved-copy-contract.mjs", "build-approved-copy-render-manifest.mjs", "seal-approved-copy.mjs",
    "carousel-manifest.mjs", "validate-carousel-review-package.mjs",
  ];
  const allowedClosure = new Set([
    "approved-copy-contract.mjs", "build-approved-copy-render-manifest.mjs", "seal-approved-copy.mjs",
    "carousel-manifest.mjs", "validate-carousel-review-package.mjs",
    "model-generation-contract.mjs", "editorial-quality-gate.mjs",
  ]);
  const closure = new Set();
  const visit = (name) => {
    if (closure.has(name)) return;
    closure.add(name);
    const source = fs.readFileSync(here(name), "utf8");
    for (const match of source.matchAll(/from\s+"\.\/([\w.-]+\.mjs)"/g)) visit(match[1]);
  };
  scripts.forEach(visit);
  for (const name of closure) expect(allowedClosure.has(name), `Production Path imports ${name}, which is outside the approved-copy runtime`);
  for (const name of closure) {
    const source = fs.readFileSync(here(name), "utf8");
    expect(!/\bfetch\s*\(|process\.env|child_process|node:http|node:https|node:net/.test(source), `${name} must not use network, credentials or subprocesses`);
    expect(!/instagram|bus-?140|scheduled-publication|CLOUDFLARE|OPENAI|api[_-]?key/i.test(source.replace(/\/\/.*$/gm, "")), `${name} references publication or provider machinery`);
  }
  const workflowDir = path.join(repoRoot, ".github");
  const productionFiles = ["workflows/sdoh-approved-copy-render.yml", "actions/sdoh-bus49-render/action.yml"];
  for (const rel of productionFiles) {
    const source = fs.readFileSync(path.join(workflowDir, rel), "utf8");
    const executable = source.split("\n").filter((line) => !line.trim().startsWith("#")).join("\n");
    expect(
      !/sdoh-scheduled-publication-orchestrator|instagram-publication-executor|gh\s+workflow\s+run|\/dispatches|workflow_call|workflow_run|actions:\s*write|contents:\s*write|secrets\.|CLOUDFLARE|OPENAI|generate-content-candidate|sdoh-automated-content-generation-pilot|sdoh-bus144-automated-render-pilot|linear\.app|graph\.facebook|api\.openai|api\.cloudflare/i.test(executable),
      `${rel} must not invoke BUS-140, publication, Linear, generation or any provider`
    );
  }
  const productionWorkflow = fs.readFileSync(path.join(workflowDir, productionFiles[0]), "utf8");
  expect(/^permissions:\n {2}contents: read\n {2}id-token: write\n/m.test(productionWorkflow), "Production workflow permissions must be read-only plus the Drive WIF token");
  expect(/^on:\n {2}workflow_dispatch:/m.test(productionWorkflow) && !/schedule:|push:|pull_request:|cron/.test(productionWorkflow), "Production render must be manual, never self-triggering");
  for (const file of fs.readdirSync(path.join(workflowDir, "workflows"))) {
    if (file === "sdoh-approved-copy-render.yml") continue;
    const other = fs.readFileSync(path.join(workflowDir, "workflows", file), "utf8");
    const otherExecutable = other.split("\n").filter((line) => !line.trim().startsWith("#")).join("\n");
    expect(!otherExecutable.includes("sdoh-approved-copy-render"), `${file} must not trigger or depend on the approved-copy render`);
  }
  // No model, credential or network: the whole path runs with provider access poisoned.
  const poison = path.join(tempDir, "poison.mjs");
  fs.writeFileSync(poison, `globalThis.fetch = async () => { throw new Error("NETWORK_USED_BY_PRODUCTION_PATH"); };`);
  const offline = spawnSync(process.execPath, [
    "--import", poison, here("build-approved-copy-render-manifest.mjs"),
    "--content-id", CONTENT_ID, "--copy-dir", contentDir, "--authority", authorityPath,
    "--expected-copy-fingerprint", fingerprint,
    "--out", path.join(tempDir, "offline-manifest.json"), "--snapshot-out", path.join(tempDir, "offline-snapshot.json"),
  ], { encoding: "utf8", env: { PATH: process.env.PATH } });
  expect(offline.status === 0 && fs.existsSync(path.join(tempDir, "offline-manifest.json")), "Production Path must run with no credentials and no network: " + offline.stderr);
  console.log("PASS [12] BUS-140, publication, Linear and every model provider are outside the Production Path");

  // Editorial sealing helper round-trips with the validator.
  const unsealed = path.join(tempDir, "unsealed.json");
  fs.writeFileSync(unsealed, JSON.stringify(draft({ status: "EDITORIAL_REVIEW" })));
  const sealRun = spawnSync(process.execPath, [here("seal-approved-copy.mjs"), unsealed, "--write"], { encoding: "utf8" });
  expect(sealRun.status === 0, "seal helper failed: " + sealRun.stderr);
  const sealed = JSON.parse(fs.readFileSync(unsealed, "utf8"));
  expect(sealed.copy_fingerprint === fingerprint, "fingerprint must not depend on the editorial status");
  sealed.status = "COPY_APPROVED";
  expect(validateApprovedCopy(sealed).copy_fingerprint === fingerprint, "promoting to COPY_APPROVED must keep the sealed fingerprint valid");
  console.log("PASS editorial sealing keeps the fingerprint stable across COPY_DRAFT -> COPY_APPROVED");
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}

console.log("SDOH approved-copy Production Path self-test PASS");

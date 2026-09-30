import { createHash } from "node:crypto";
import { writeFile } from "node:fs/promises";
import { evaluatePublicationAuthority } from "./publication-authority-gate.mjs";

const LINEAR_API_URL = "https://api.linear.app/graphql";
const DEFAULT_REGISTER_DOCUMENT_ID = "346b4c0c-9aec-4454-a2b5-06210b2c88c6";
const EXPECTED_ACCOUNT = "@satudosisobathati";
const MANIFEST_SCHEMA = "sdoh-execution-authority-v1";

const EXIT = Object.freeze({
  ALLOW_SNAPSHOT: 0,
  REJECT_ALREADY_PUBLISHED: 20,
  REJECT_CANCELLED_OR_REMOVED: 21,
  REJECT_NOT_SCHEDULED: 22,
  AUTHORITY_ERROR: 30,
});

function normalizeCell(value) {
  return String(value ?? "")
    .trim()
    .replace(/\*\*/g, "")
    .replace(/__/g, "")
    .replace(/\`/g, "")
    .trim();
}

function getSection(markdown, heading) {
  const lines = String(markdown ?? "").replace(/\r\n/g, "\n").split("\n");
  const start = lines.findIndex(
    (line) => line.trim().toLowerCase() === `## ${heading.toLowerCase()}`
  );
  if (start < 0) return null;

  let end = lines.length;
  for (let i = start + 1; i < lines.length; i += 1) {
    if (/^##\s+/.test(lines[i].trim())) {
      end = i;
      break;
    }
  }
  return lines.slice(start + 1, end).join("\n");
}

function parseMarkdownRows(section) {
  const rows = [];
  for (const raw of String(section ?? "").split("\n")) {
    const line = raw.trim();
    if (!line.startsWith("|") || !line.endsWith("|")) continue;
    const cells = line.slice(1, -1).split("|").map((cell) => cell.trim());
    if (cells.length === 0) continue;
    if (cells.every((cell) => /^\s*:?-{2,}:?\s*$/.test(cell))) continue;
    rows.push(cells);
  }
  return rows;
}

function findMaterialRecord(markdown, contentId) {
  const section = getSection(markdown, "Register materi");
  if (!section) throw authorityError("MATERIAL_REGISTER_SECTION_NOT_FOUND");

  const matches = parseMarkdownRows(section)
    .filter((cells) => normalizeCell(cells[0]) === contentId);

  if (matches.length !== 1) {
    throw authorityError(
      matches.length === 0
        ? "MATERIAL_RECORD_NOT_FOUND"
        : "MATERIAL_RECORD_NOT_UNIQUE"
    );
  }

  const cells = matches[0];
  if (cells.length < 9) throw authorityError("MATERIAL_RECORD_SHAPE_INVALID");

  const revisionText = normalizeCell(cells[4]);
  const materialText = normalizeCell(cells[5]);
  const qaText = normalizeCell(cells[8]);

  if (!/^Approved\b/i.test(materialText)) {
    throw authorityError("MATERIAL_NOT_APPROVED");
  }

  const revisionMatches = [
    ...revisionText.matchAll(/Caption\s+(v\d+(?:\.\d+)*)\s+APPROVED\s*\/\s*LOCKED/gi),
  ].map((match) => match[1]);

  const uniqueRevisions = [...new Set(revisionMatches)];
  if (uniqueRevisions.length !== 1) {
    throw authorityError("CAPTION_REVISION_NOT_UNIQUELY_LOCKED");
  }

  if (!/G1\s*[–-]\s*G7\s+PASS/i.test(qaText)) {
    throw authorityError("QA_NOT_PASS");
  }

  return {
    material_state: "APPROVED",
    qa_state: "PASS",
    caption_revision: uniqueRevisions[0],
  };
}

function findPublicationRecord(markdown, contentId) {
  const section = getSection(markdown, "Log publikasi");
  if (!section) throw authorityError("PUBLICATION_LOG_SECTION_NOT_FOUND");

  const matches = parseMarkdownRows(section)
    .filter((cells) => normalizeCell(cells[0]) === contentId);

  if (matches.length !== 1) {
    throw authorityError(
      matches.length === 0
        ? "PUBLICATION_RECORD_NOT_FOUND"
        : "PUBLICATION_RECORD_NOT_UNIQUE"
    );
  }

  const cells = matches[0];
  if (cells.length < 4) throw authorityError("PUBLICATION_RECORD_SHAPE_INVALID");

  const destination = normalizeCell(cells[1]);
  const scheduledAtText = normalizeCell(cells[2]);
  const publicationState = normalizeCell(cells[3]).toUpperCase();

  if (publicationState !== "SCHEDULED") {
    throw authorityError("PUBLICATION_NOT_SCHEDULED");
  }

  if (
    !destination.toLowerCase().includes("instagram") ||
    !destination.includes(EXPECTED_ACCOUNT)
  ) {
    throw authorityError("DESTINATION_ACCOUNT_MISMATCH");
  }

  return {
    publication_state: "SCHEDULED",
    destination_account: EXPECTED_ACCOUNT,
    scheduled_at: parseWitaSchedule(scheduledAtText),
  };
}

function parseWitaSchedule(value) {
  const text = String(value ?? "").trim();

  const iso = Date.parse(text);
  if (
    Number.isFinite(iso) &&
    /T/.test(text) &&
    /(?:Z|[+-]\d{2}:\d{2})$/.test(text)
  ) {
    return new Date(iso).toISOString().replace(".000Z", "Z");
  }

  const wita = text.match(
    /^(\d{4}-\d{2}-\d{2})\s*,\s*(\d{2}):(\d{2})\s+WITA$/i
  );
  if (!wita) throw authorityError("SCHEDULE_NOT_MACHINE_RESOLVABLE");

  const [, date, hour, minute] = wita;
  const candidate = `${date}T${hour}:${minute}:00+08:00`;
  const ms = Date.parse(candidate);
  if (!Number.isFinite(ms)) throw authorityError("SCHEDULE_INVALID");
  return candidate;
}

function readManifest(markdown) {
  const section = getSection(markdown, "Execution Authority Manifest");
  if (!section) throw authorityError("EXECUTION_AUTHORITY_MANIFEST_NOT_FOUND");

  const blocks = [...section.matchAll(/\`\`\`json\s*([\s\S]*?)\`\`\`/gi)];
  if (blocks.length !== 1) {
    throw authorityError("EXECUTION_AUTHORITY_MANIFEST_BLOCK_NOT_UNIQUE");
  }

  let parsed;
  try {
    parsed = JSON.parse(blocks[0][1]);
  } catch {
    throw authorityError("EXECUTION_AUTHORITY_MANIFEST_JSON_INVALID");
  }

  if (
    !parsed ||
    parsed.schema !== MANIFEST_SCHEMA ||
    !Array.isArray(parsed.records)
  ) {
    throw authorityError("EXECUTION_AUTHORITY_MANIFEST_SCHEMA_INVALID");
  }

  return parsed;
}

function validateManifestRecord(record, derived) {
  if (!record || typeof record !== "object" || Array.isArray(record)) {
    throw authorityError("EXECUTION_AUTHORITY_RECORD_INVALID");
  }

  const requiredStrings = [
    "content_id",
    "linear_issue",
    "asset_folder_id",
    "caption_revision",
    "approved_caption",
    "scheduled_at",
    "destination_account",
  ];

  for (const key of requiredStrings) {
    if (typeof record[key] !== "string" || record[key].length === 0) {
      throw authorityError("EXECUTION_AUTHORITY_RECORD_INVALID");
    }
  }

  if (record.content_id !== derived.content_id) {
    throw authorityError("MANIFEST_CONTENT_ID_MISMATCH");
  }
  if (record.caption_revision !== derived.caption_revision) {
    throw authorityError("MANIFEST_CAPTION_REVISION_MISMATCH");
  }
  if (record.destination_account !== derived.destination_account) {
    throw authorityError("MANIFEST_DESTINATION_MISMATCH");
  }

  const manifestScheduleMs = Date.parse(record.scheduled_at);
  const derivedScheduleMs = Date.parse(derived.scheduled_at);
  if (
    !Number.isFinite(manifestScheduleMs) ||
    !Number.isFinite(derivedScheduleMs) ||
    manifestScheduleMs !== derivedScheduleMs
  ) {
    throw authorityError("MANIFEST_SCHEDULE_MISMATCH");
  }

  if (record.approved_caption.length > 2200) {
    throw authorityError("MANIFEST_CAPTION_TOO_LONG");
  }

  if (!/^BUS-\d+$/.test(record.linear_issue)) {
    throw authorityError("MANIFEST_LINEAR_ISSUE_INVALID");
  }

  if (!/^[A-Za-z0-9_-]{10,}$/.test(record.asset_folder_id)) {
    throw authorityError("MANIFEST_ASSET_FOLDER_INVALID");
  }

  if (!Array.isArray(record.media) || record.media.length !== 5) {
    throw authorityError("MANIFEST_MEDIA_SET_INVALID");
  }

  for (let i = 0; i < 5; i += 1) {
    const item = record.media[i];
    if (
      !item ||
      item.slot !== i + 1 ||
      typeof item.drive_file_id !== "string" ||
      !/^[A-Za-z0-9_-]{10,}$/.test(item.drive_file_id) ||
      typeof item.sha256 !== "string" ||
      !/^[0-9a-f]{64}$/i.test(item.sha256)
    ) {
      throw authorityError("MANIFEST_MEDIA_SET_INVALID");
    }
  }

  return {
    ...record,
    scheduled_at: derived.scheduled_at,
    media: record.media.map((item) => ({
      slot: item.slot,
      drive_file_id: item.drive_file_id,
      sha256: item.sha256.toLowerCase(),
    })),
  };
}

function authorityError(code) {
  const error = new Error(code);
  error.code = code;
  return error;
}

async function fetchLinearDocument({ apiKey, documentId }) {
  const query = `
    query ExecutionAuthorityRegister($id: String!) {
      document(id: $id) {
        id
        title
        content
        updatedAt
      }
    }
  `;

  const response = await fetch(LINEAR_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: apiKey,
    },
    body: JSON.stringify({
      query,
      variables: { id: documentId },
    }),
  });

  if (!response.ok) {
    throw authorityError(`LINEAR_HTTP_${response.status}`);
  }

  const payload = await response.json();
  if (Array.isArray(payload.errors) && payload.errors.length > 0) {
    throw authorityError("LINEAR_GRAPHQL_ERROR");
  }
  if (!payload.data?.document?.content) {
    throw authorityError("LINEAR_DOCUMENT_CONTENT_MISSING");
  }

  return payload.data.document;
}

export function buildExecutionAuthority({
  markdown,
  contentId,
  registerDocumentId,
  registerUpdatedAt,
  governanceRef,
  now = new Date(),
}) {
  const normalizedContentId = String(contentId ?? "").trim();

  if (!/^SDOH-[A-Z0-9-]+$/.test(normalizedContentId)) {
    return reject("AUTHORITY_ERROR", "INVALID_CONTENT_ID", EXIT.AUTHORITY_ERROR);
  }
  if (!/^[0-9a-f]{40}$/i.test(String(governanceRef ?? ""))) {
    return reject(
      "AUTHORITY_ERROR",
      "INVALID_GOVERNANCE_REF",
      EXIT.AUTHORITY_ERROR
    );
  }

  const publication = evaluatePublicationAuthority(markdown, normalizedContentId);

  if (publication.decision === "REJECT_ALREADY_PUBLISHED") {
    return reject(
      publication.decision,
      publication.reason,
      EXIT.REJECT_ALREADY_PUBLISHED,
      { publication_states: publication.publication_states || [] }
    );
  }

  if (publication.decision === "REJECT_CANCELLED_OR_REMOVED") {
    return reject(
      publication.decision,
      publication.reason,
      EXIT.REJECT_CANCELLED_OR_REMOVED,
      { publication_states: publication.publication_states || [] }
    );
  }

  if (publication.decision !== "ALLOW_SCHEDULED") {
    return reject(
      publication.decision === "AUTHORITY_ERROR"
        ? "AUTHORITY_ERROR"
        : "REJECT_NOT_SCHEDULED",
      publication.reason || "AUTHORITATIVE_REGISTER_NOT_SCHEDULED",
      publication.decision === "AUTHORITY_ERROR"
        ? EXIT.AUTHORITY_ERROR
        : EXIT.REJECT_NOT_SCHEDULED,
      { publication_states: publication.publication_states || [] }
    );
  }

  try {
    const material = findMaterialRecord(markdown, normalizedContentId);
    const publicationRecord = findPublicationRecord(markdown, normalizedContentId);
    const manifest = readManifest(markdown);
    const manifestMatches = manifest.records.filter(
      (record) => record?.content_id === normalizedContentId
    );

    if (manifestMatches.length !== 1) {
      throw authorityError(
        manifestMatches.length === 0
          ? "EXECUTION_AUTHORITY_RECORD_NOT_FOUND"
          : "EXECUTION_AUTHORITY_RECORD_NOT_UNIQUE"
      );
    }

    const derived = {
      content_id: normalizedContentId,
      ...material,
      ...publicationRecord,
    };
    const record = validateManifestRecord(manifestMatches[0], derived);

    const nowMs = now.getTime();
    if (!Number.isFinite(nowMs)) throw authorityError("AUTHORITY_TIME_INVALID");

    const scheduledAtMs = Date.parse(publicationRecord.scheduled_at);
    if (!Number.isFinite(scheduledAtMs)) {
      throw authorityError("SCHEDULE_INVALID");
    }
    if (scheduledAtMs > nowMs) {
      throw authorityError("SCHEDULE_NOT_DUE");
    }

    const checkedAt = new Date(nowMs).toISOString();
    const expiresAt = new Date(nowMs + 5 * 60 * 1000).toISOString();
    const captionSha256 = createHash("sha256")
      .update(record.approved_caption, "utf8")
      .digest("hex");

    return {
      ok: true,
      decision: "ALLOW_SNAPSHOT",
      allow_prepare: true,
      exit_code: EXIT.ALLOW_SNAPSHOT,
      authority_snapshot: {
        content_id: normalizedContentId,
        register_document_id: registerDocumentId,
        register_updated_at: registerUpdatedAt,
        publication_state: "SCHEDULED",
        material_state: "APPROVED",
        qa_state: "PASS",
        destination_account: EXPECTED_ACCOUNT,
        scheduled_at: publicationRecord.scheduled_at,
        caption_revision: material.caption_revision,
        approved_caption: record.approved_caption,
        caption_sha256: captionSha256,
        governance_ref: governanceRef,
        authority_checked_at: checkedAt,
        authority_expires_at: expiresAt,
      },
      execution_input: {
        linear_issue: record.linear_issue,
        asset_folder_id: record.asset_folder_id,
        media: record.media,
      },
    };
  } catch (error) {
    return reject(
      "AUTHORITY_ERROR",
      error?.code || "AUTHORITY_PREFLIGHT_FAILED",
      EXIT.AUTHORITY_ERROR
    );
  }
}

function reject(decision, reason, exitCode, extra = {}) {
  return {
    ok: decision !== "AUTHORITY_ERROR",
    decision,
    reason,
    allow_prepare: false,
    exit_code: exitCode,
    ...extra,
  };
}

async function writeOutputs(result) {
  const snapshotPath = process.env.AUTHORITY_SNAPSHOT_OUTPUT;
  const resultPath = process.env.AUTHORITY_RESULT_OUTPUT;

  if (resultPath) {
    const safe = {
      ok: result.ok,
      decision: result.decision,
      reason: result.reason || null,
      allow_prepare: result.allow_prepare,
      exit_code: result.exit_code,
      publication_states: result.publication_states || [],
      content_id: result.authority_snapshot?.content_id || process.env.CONTENT_ID || null,
      register_document_id: result.authority_snapshot?.register_document_id || null,
      register_updated_at: result.authority_snapshot?.register_updated_at || null,
      scheduled_at: result.authority_snapshot?.scheduled_at || null,
      caption_revision: result.authority_snapshot?.caption_revision || null,
      caption_sha256: result.authority_snapshot?.caption_sha256 || null,
      authority_expires_at: result.authority_snapshot?.authority_expires_at || null,
      media_count: result.execution_input?.media?.length || 0,
    };
    await writeFile(resultPath, JSON.stringify(safe, null, 2) + "\n", "utf8");
  }

  if (result.decision === "ALLOW_SNAPSHOT" && snapshotPath) {
    await writeFile(
      snapshotPath,
      JSON.stringify(
        {
          authority_snapshot: result.authority_snapshot,
          execution_input: result.execution_input,
        },
        null,
        2
      ) + "\n",
      "utf8"
    );
  }
}

function selfTestFixture({ state = "SCHEDULED", includeManifest = true } = {}) {
  const manifest = includeManifest
    ? `
## Execution Authority Manifest

\`\`\`json
{
  "schema": "sdoh-execution-authority-v1",
  "records": [
    {
      "content_id": "SDOH-BURGUNDY-CAR-0099",
      "linear_issue": "BUS-999",
      "asset_folder_id": "folder_abcdefghij",
      "caption_revision": "v1.0",
      "approved_caption": "locked caption\\n\\n#satudosisobathati",
      "scheduled_at": "2026-09-30T14:00:00+08:00",
      "destination_account": "@satudosisobathati",
      "media": [
        {"slot":1,"drive_file_id":"file_abcdefghij1","sha256":"${"1".repeat(64)}"},
        {"slot":2,"drive_file_id":"file_abcdefghij2","sha256":"${"2".repeat(64)}"},
        {"slot":3,"drive_file_id":"file_abcdefghij3","sha256":"${"3".repeat(64)}"},
        {"slot":4,"drive_file_id":"file_abcdefghij4","sha256":"${"4".repeat(64)}"},
        {"slot":5,"drive_file_id":"file_abcdefghij5","sha256":"${"5".repeat(64)}"}
      ]
    }
  ]
}
\`\`\`
`
    : "";

  return `
## Register materi

| ID konten | Topik / klaster | Angle / pesan inti | Hook | Naskah & revisi | Status materi | Pemeriksaan duplikasi / konten asal | Output & render report | Bukti QA & persetujuan |
| -- | -- | -- | -- | -- | -- | -- | -- | -- |
| SDOH-BURGUNDY-CAR-0099 | Test | Test | Test | Caption v1.0 APPROVED / LOCKED | **Approved** — ready | none | approved | **G1–G7 PASS** |

## Log publikasi

| ID konten | Akun / platform | Jadwal (WITA) | Status publikasi | Note |
| -- | -- | -- | -- | -- |
| SDOH-BURGUNDY-CAR-0099 | Instagram — @satudosisobathati | 2026-09-30, 14:00 WITA | **${state}** | test |
${manifest}
`;
}

async function runSelfTest() {
  const allowed = buildExecutionAuthority({
    markdown: selfTestFixture(),
    contentId: "SDOH-BURGUNDY-CAR-0099",
    registerDocumentId: "test-register",
    registerUpdatedAt: "2026-09-30T05:59:00Z",
    governanceRef: "a".repeat(40),
    now: new Date("2026-09-30T06:00:00Z"),
  });

  if (
    allowed.decision !== "ALLOW_SNAPSHOT" ||
    allowed.allow_prepare !== true ||
    allowed.authority_snapshot?.caption_revision !== "v1.0" ||
    allowed.execution_input?.media?.length !== 5
  ) {
    throw new Error("self-test failed: valid authority did not produce snapshot");
  }

  const published = buildExecutionAuthority({
    markdown: selfTestFixture({ state: "PUBLISHED", includeManifest: false }),
    contentId: "SDOH-BURGUNDY-CAR-0099",
    registerDocumentId: "test-register",
    registerUpdatedAt: "2026-09-30T05:59:00Z",
    governanceRef: "a".repeat(40),
    now: new Date("2026-09-30T06:00:00Z"),
  });

  if (
    published.decision !== "REJECT_ALREADY_PUBLISHED" ||
    published.allow_prepare !== false
  ) {
    throw new Error("self-test failed: published content was not rejected first");
  }

  const early = buildExecutionAuthority({
    markdown: selfTestFixture(),
    contentId: "SDOH-BURGUNDY-CAR-0099",
    registerDocumentId: "test-register",
    registerUpdatedAt: "2026-09-30T05:59:00Z",
    governanceRef: "a".repeat(40),
    now: new Date("2026-09-30T05:59:00Z"),
  });

  if (early.decision !== "AUTHORITY_ERROR" || early.reason !== "SCHEDULE_NOT_DUE") {
    throw new Error("self-test failed: early publication was not rejected");
  }

  const noManifest = buildExecutionAuthority({
    markdown: selfTestFixture({ includeManifest: false }),
    contentId: "SDOH-BURGUNDY-CAR-0099",
    registerDocumentId: "test-register",
    registerUpdatedAt: "2026-09-30T05:59:00Z",
    governanceRef: "a".repeat(40),
    now: new Date("2026-09-30T06:00:00Z"),
  });

  if (
    noManifest.decision !== "AUTHORITY_ERROR" ||
    noManifest.reason !== "EXECUTION_AUTHORITY_MANIFEST_NOT_FOUND"
  ) {
    throw new Error("self-test failed: missing machine manifest did not fail closed");
  }

  console.log("live authority preflight self-test PASS");
  console.log("positive snapshot construction PASS");
  console.log("published content rejection-before-manifest PASS");
  console.log("scheduled_at due gate PASS");
  console.log("missing machine-readable manifest fails closed PASS");
}

async function main() {
  if (process.argv.includes("--self-test")) {
    await runSelfTest();
    return;
  }

  const apiKey = process.env.LINEAR_API_KEY;
  const contentId = process.env.CONTENT_ID;
  const governanceRef = process.env.GOVERNANCE_REF;
  const documentId =
    process.env.LINEAR_REGISTER_DOCUMENT_ID || DEFAULT_REGISTER_DOCUMENT_ID;

  if (!apiKey || !contentId || !governanceRef) {
    const result = reject(
      "AUTHORITY_ERROR",
      "PREFLIGHT_CONFIGURATION_MISSING",
      EXIT.AUTHORITY_ERROR
    );
    await writeOutputs(result);
    console.error(JSON.stringify(result));
    process.exit(result.exit_code);
  }

  try {
    const document = await fetchLinearDocument({ apiKey, documentId });
    const result = buildExecutionAuthority({
      markdown: document.content,
      contentId,
      registerDocumentId: document.id,
      registerUpdatedAt: document.updatedAt,
      governanceRef,
      now: new Date(),
    });

    await writeOutputs(result);

    const safeLog = {
      ok: result.ok,
      decision: result.decision,
      reason: result.reason || null,
      allow_prepare: result.allow_prepare,
      content_id: String(contentId).trim(),
      register_document_id: document.id,
      register_updated_at: document.updatedAt,
      scheduled_at: result.authority_snapshot?.scheduled_at || null,
      caption_revision: result.authority_snapshot?.caption_revision || null,
      caption_sha256: result.authority_snapshot?.caption_sha256 || null,
      media_count: result.execution_input?.media?.length || 0,
    };

    console.log(JSON.stringify(safeLog));
    process.exit(result.exit_code);
  } catch (error) {
    const result = reject(
      "AUTHORITY_ERROR",
      error?.code || "LINEAR_AUTHORITY_READ_FAILED",
      EXIT.AUTHORITY_ERROR
    );
    await writeOutputs(result);
    console.error(JSON.stringify(result));
    process.exit(result.exit_code);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await main();
}

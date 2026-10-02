const LINEAR_API_URL = "https://api.linear.app/graphql";
const DEFAULT_REGISTER_DOCUMENT_ID = "346b4c0c-9aec-4454-a2b5-06210b2c88c6";
const EXPECTED_ACCOUNT = "@satudosisobathati";

const EXIT = Object.freeze({
  OK: 0,
  CONFLICT: 20,
  NOT_ELIGIBLE: 21,
  ERROR: 30,
});

function normalizeCell(value) {
  return String(value ?? "")
    .trim()
    .replace(/\*\*/g, "")
    .replace(/__/g, "")
    .replace(/`/g, "")
    .trim();
}

function publicationState(value) {
  const normalized = normalizeCell(value).toUpperCase();
  return ["PUBLISHED", "SCHEDULED", "PLANNED", "CANCELLED", "REMOVED", "UNKNOWN"]
    .find((state) => normalized.includes(state)) ?? null;
}

function normalizeIsoOffset(value) {
  return String(value ?? "").replace(/([+-]\d{2})(\d{2})$/, "$1:$2");
}

function pad2(value) {
  return String(value).padStart(2, "0");
}

export function formatWita(isoValue) {
  const instant = new Date(normalizeIsoOffset(isoValue));
  if (Number.isNaN(instant.getTime())) {
    throw new Error("INVALID_PUBLISHED_AT");
  }

  const wita = new Date(instant.getTime() + 8 * 60 * 60 * 1000);
  return [
    wita.getUTCFullYear(),
    pad2(wita.getUTCMonth() + 1),
    pad2(wita.getUTCDate()),
  ].join("-") +
    ", " +
    [pad2(wita.getUTCHours()), pad2(wita.getUTCMinutes()), pad2(wita.getUTCSeconds())].join(":") +
    " WITA";
}

export function findPublicationRows(markdown, contentId) {
  const lines = String(markdown ?? "").replace(/\r\n/g, "\n").split("\n");
  const start = lines.findIndex((line) => /^##\s+Log publikasi\s*$/i.test(line.trim()));

  if (start < 0) {
    throw new Error("PUBLICATION_LOG_SECTION_NOT_FOUND");
  }

  let end = lines.length;
  for (let i = start + 1; i < lines.length; i += 1) {
    if (/^##\s+/.test(lines[i].trim())) {
      end = i;
      break;
    }
  }

  const rows = [];
  for (let i = start + 1; i < end; i += 1) {
    const raw = lines[i];
    const line = raw.trim();
    if (!line.startsWith("|") || !line.endsWith("|")) continue;

    const cells = line.slice(1, -1).split("|").map((cell) => cell.trim());
    if (cells.length < 8) continue;
    if (normalizeCell(cells[0]) !== contentId) continue;

    rows.push({ line_index: i, raw, cells });
  }

  return { lines, rows };
}

function extractPermalink(value) {
  const match = String(value ?? "").match(/https:\/\/www\.instagram\.com\/p\/[A-Za-z0-9_-]+\/?/);
  return match?.[0] ?? null;
}

function extractRemoteMediaId(value) {
  const match = String(value ?? "").match(/remote media ID\s+`?(\d+)`?/i);
  return match?.[1] ?? null;
}

function extractActualWita(value) {
  const match = normalizeCell(value).match(/(\d{4}-\d{2}-\d{2}),\s*(\d{2}:\d{2}:\d{2})\s*WITA/i);
  return match ? `${match[1]}, ${match[2]} WITA` : null;
}

export function validateRuntimeStatus(status, contentId, jobId, registerDocumentId) {
  if (!status || status.ok !== true || !status.job) {
    throw new Error("RUNTIME_STATUS_INVALID");
  }

  const job = status.job;

  if (
    job.id !== jobId ||
    job.content_id !== contentId ||
    job.state !== "PUBLISHED" ||
    job.platform !== "instagram" ||
    job.account !== EXPECTED_ACCOUNT ||
    job.format !== "carousel" ||
    Number(status.media_count) !== 5
  ) {
    throw new Error("RUNTIME_JOB_NOT_ELIGIBLE");
  }

  if (
    !/^\d+$/.test(String(job.remote_media_id ?? "")) ||
    !/^https:\/\/www\.instagram\.com\/p\/[A-Za-z0-9_-]+\/?$/.test(String(job.remote_permalink ?? "")) ||
    !job.published_at
  ) {
    throw new Error("RUNTIME_PUBLICATION_EVIDENCE_INCOMPLETE");
  }

  if (status.authority?.register_document_id !== registerDocumentId) {
    throw new Error("RUNTIME_AUTHORITY_REGISTER_MISMATCH");
  }

  const publishedArtifact = Array.isArray(status.artifacts)
    ? status.artifacts.find(
        (artifact) =>
          artifact.kind === "PUBLISHED_MEDIA" &&
          String(artifact.remote_id) === String(job.remote_media_id) &&
          artifact.state === "VERIFIED"
      )
    : null;

  if (!publishedArtifact) {
    throw new Error("RUNTIME_PUBLISHED_ARTIFACT_NOT_VERIFIED");
  }

  return {
    content_id: contentId,
    job_id: jobId,
    scheduled_at: job.scheduled_at,
    remote_media_id: String(job.remote_media_id),
    remote_permalink: String(job.remote_permalink),
    published_at: String(job.published_at),
    published_wita: formatWita(job.published_at),
  };
}

function buildProposedRow(row, evidence) {
  const cells = [...row.cells];
  cells[3] = "**PUBLISHED**";
  cells[4] =
    `Runtime terminal \`PUBLISHED\`; job \`${evidence.job_id}\`; evidence verified from production runtime.`;
  cells[5] = `**${evidence.published_wita} — runtime-confirmed**`;
  cells[6] =
    `\`${evidence.remote_permalink}\` — remote media ID \`${evidence.remote_media_id}\``;
  cells[7] =
    "Automatic evidence writeback candidate. Instagram publication result remains authoritative if Linear writeback fails.";

  return `| ${cells.join(" | ")} |`;
}

export function planWriteback(markdown, evidence) {
  const { rows } = findPublicationRows(markdown, evidence.content_id);

  if (rows.length !== 1) {
    return {
      ok: false,
      decision: "CONFLICT",
      reason: rows.length === 0
        ? "PUBLICATION_ROW_NOT_FOUND"
        : "MULTIPLE_PUBLICATION_ROWS_FOUND",
      exit_code: EXIT.CONFLICT,
    };
  }

  const row = rows[0];
  const state = publicationState(row.cells[3]);

  if (!state) {
    return {
      ok: false,
      decision: "CONFLICT",
      reason: "UNRECOGNIZED_PUBLICATION_STATE",
      exit_code: EXIT.CONFLICT,
    };
  }

  if (state === "PUBLISHED") {
    const currentPermalink = extractPermalink(row.cells[6]);
    const currentRemoteMediaId = extractRemoteMediaId(row.cells[6]);
    const currentPublishedWita = extractActualWita(row.cells[5]);

    const matches =
      currentPermalink === evidence.remote_permalink &&
      currentRemoteMediaId === evidence.remote_media_id &&
      currentPublishedWita === evidence.published_wita;

    if (matches) {
      return {
        ok: true,
        decision: "ALREADY_SYNCED",
        reason: "EXISTING_PUBLISHED_EVIDENCE_MATCHES_RUNTIME",
        exit_code: EXIT.OK,
        current_row: row.raw.trim(),
      };
    }

    return {
      ok: false,
      decision: "CONFLICT",
      reason: "EXISTING_PUBLISHED_EVIDENCE_CONFLICTS_WITH_RUNTIME",
      exit_code: EXIT.CONFLICT,
      current: {
        remote_permalink: currentPermalink,
        remote_media_id: currentRemoteMediaId,
        published_wita: currentPublishedWita,
      },
      runtime: {
        remote_permalink: evidence.remote_permalink,
        remote_media_id: evidence.remote_media_id,
        published_wita: evidence.published_wita,
      },
    };
  }

  if (state !== "SCHEDULED") {
    return {
      ok: false,
      decision: "NOT_ELIGIBLE",
      reason: `PUBLICATION_STATE_${state}_NOT_WRITEBACK_ELIGIBLE`,
      exit_code: EXIT.NOT_ELIGIBLE,
    };
  }

  return {
    ok: true,
    decision: "DRY_RUN_UPDATE_READY",
    reason: "SCHEDULED_ROW_CAN_BE_UPDATED_FROM_TERMINAL_RUNTIME_EVIDENCE",
    exit_code: EXIT.OK,
    current_row: row.raw.trim(),
    proposed_row: buildProposedRow(row, evidence),
  };
}

async function fetchJson(url, options) {
  const response = await fetch(url, options);
  const text = await response.text();

  let payload;
  try {
    payload = JSON.parse(text);
  } catch {
    throw new Error(`NON_JSON_RESPONSE_HTTP_${response.status}`);
  }

  if (!response.ok) {
    throw new Error(`HTTP_${response.status}_${payload?.error ?? "UNKNOWN"}`);
  }

  return payload;
}

async function fetchRuntimeStatus({ workerBaseUrl, executorSecret, jobId }) {
  return fetchJson(`${workerBaseUrl.replace(/\/$/, "")}/internal/status`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${executorSecret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ job_id: jobId }),
  });
}

async function fetchLinearDocument({ apiKey, documentId }) {
  const query = `
    query PublicationRegister($id: String!) {
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
    body: JSON.stringify({ query, variables: { id: documentId } }),
  });

  if (!response.ok) {
    throw new Error(`LINEAR_HTTP_${response.status}`);
  }

  const payload = await response.json();
  if (Array.isArray(payload.errors) && payload.errors.length > 0) {
    throw new Error("LINEAR_GRAPHQL_ERROR");
  }

  if (!payload.data?.document?.content) {
    throw new Error("LINEAR_DOCUMENT_CONTENT_MISSING");
  }

  return payload.data.document;
}

function selfTest() {
  const evidence = {
    content_id: "SDOH-BURGUNDY-CAR-0099",
    job_id: "IG-SDOH-BURGUNDY-CAR-0099-20261002T040500Z",
    remote_media_id: "18098082377388129",
    remote_permalink: "https://www.instagram.com/p/Dd-mV6kjhHf/",
    published_at: "2026-10-02T04:13:19+0000",
    published_wita: "2026-10-02, 12:13:19 WITA",
  };

  const scheduled = `
## Log publikasi

| ID konten | Akun / platform | Jadwal (WITA) | Status publikasi | Pemeriksaan akun / antrean: waktu & hasil | Waktu terbit aktual | URL / ID posting | Catatan / persetujuan repost |
| -- | -- | -- | -- | -- | -- | -- | -- |
| SDOH-BURGUNDY-CAR-0099 | Instagram — @satudosisobathati | **2026-10-02, 12:05 WITA** | **SCHEDULED** | ready | — | — | fresh job |
`;

  const ready = planWriteback(scheduled, evidence);
  if (
    ready.decision !== "DRY_RUN_UPDATE_READY" ||
    !ready.proposed_row.includes("**PUBLISHED**") ||
    !ready.proposed_row.includes(evidence.remote_permalink) ||
    !ready.proposed_row.includes(evidence.remote_media_id)
  ) {
    throw new Error("self-test failed: scheduled writeback plan");
  }

  const published = scheduled.replace(
    "| **SCHEDULED** | ready | — | — | fresh job |",
    `| **PUBLISHED** | runtime | **2026-10-02, 12:13:19 WITA — runtime-confirmed** | \`${evidence.remote_permalink}\` — remote media ID \`${evidence.remote_media_id}\` | synced |`
  );

  const synced = planWriteback(published, evidence);
  if (synced.decision !== "ALREADY_SYNCED") {
    throw new Error("self-test failed: idempotent published row");
  }

  const conflicting = published.replace(evidence.remote_media_id, "999999999");
  const conflict = planWriteback(conflicting, evidence);
  if (conflict.decision !== "CONFLICT") {
    throw new Error("self-test failed: conflicting published evidence");
  }

  const statusFixture = {
    ok: true,
    media_count: 5,
    authority: { register_document_id: DEFAULT_REGISTER_DOCUMENT_ID },
    job: {
      id: evidence.job_id,
      content_id: evidence.content_id,
      state: "PUBLISHED",
      platform: "instagram",
      account: EXPECTED_ACCOUNT,
      format: "carousel",
      scheduled_at: "2026-10-02T12:05:00+08:00",
      remote_media_id: evidence.remote_media_id,
      remote_permalink: evidence.remote_permalink,
      published_at: evidence.published_at,
    },
    artifacts: [
      {
        kind: "PUBLISHED_MEDIA",
        slot: 0,
        remote_id: evidence.remote_media_id,
        state: "VERIFIED",
      },
    ],
  };

  const runtime = validateRuntimeStatus(
    statusFixture,
    evidence.content_id,
    evidence.job_id,
    DEFAULT_REGISTER_DOCUMENT_ID
  );

  if (runtime.published_wita !== evidence.published_wita) {
    throw new Error("self-test failed: WITA conversion");
  }

  console.log("publication evidence writeback dry-run self-test PASS");
}

async function main() {
  if (process.argv.includes("--self-test")) {
    selfTest();
    return;
  }

  const apiKey = process.env.LINEAR_API_KEY;
  const executorSecret = process.env.EXECUTOR_INGEST_SECRET;
  const contentId = String(process.env.CONTENT_ID ?? "").trim();
  const jobId = String(process.env.JOB_ID ?? "").trim();
  const workerBaseUrl = String(process.env.WORKER_BASE_URL ?? "").trim();
  const documentId =
    String(process.env.LINEAR_REGISTER_DOCUMENT_ID ?? "").trim() ||
    DEFAULT_REGISTER_DOCUMENT_ID;

  if (!apiKey || !executorSecret) {
    console.error(JSON.stringify({
      ok: false,
      decision: "ERROR",
      reason: "REQUIRED_SECRET_MISSING",
    }));
    process.exit(EXIT.ERROR);
  }

  if (!/^SDOH-[A-Z0-9-]+$/.test(contentId)) {
    console.error(JSON.stringify({
      ok: false,
      decision: "ERROR",
      reason: "INVALID_CONTENT_ID",
    }));
    process.exit(EXIT.ERROR);
  }

  if (!/^[A-Za-z0-9._:-]{1,128}$/.test(jobId)) {
    console.error(JSON.stringify({
      ok: false,
      decision: "ERROR",
      reason: "INVALID_JOB_ID",
    }));
    process.exit(EXIT.ERROR);
  }

  if (!/^https:\/\//.test(workerBaseUrl)) {
    console.error(JSON.stringify({
      ok: false,
      decision: "ERROR",
      reason: "INVALID_WORKER_BASE_URL",
    }));
    process.exit(EXIT.ERROR);
  }

  try {
    const [runtimeStatus, document] = await Promise.all([
      fetchRuntimeStatus({ workerBaseUrl, executorSecret, jobId }),
      fetchLinearDocument({ apiKey, documentId }),
    ]);

    const evidence = validateRuntimeStatus(
      runtimeStatus,
      contentId,
      jobId,
      documentId
    );

    const plan = planWriteback(document.content, evidence);

    console.log(JSON.stringify({
      ...plan,
      dry_run: true,
      source: "RUNTIME_STATUS_PLUS_LINEAR_REGISTER",
      content_id: contentId,
      job_id: jobId,
      register_document_id: document.id,
      register_updated_at: document.updatedAt,
      evidence: {
        remote_media_id: evidence.remote_media_id,
        remote_permalink: evidence.remote_permalink,
        published_at: evidence.published_at,
        published_wita: evidence.published_wita,
      },
    }));

    process.exit(plan.exit_code);
  } catch (error) {
    console.error(JSON.stringify({
      ok: false,
      decision: "ERROR",
      reason: error instanceof Error ? error.message : "UNKNOWN_ERROR",
      dry_run: true,
      content_id: contentId,
      job_id: jobId,
    }));
    process.exit(EXIT.ERROR);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await main();
}

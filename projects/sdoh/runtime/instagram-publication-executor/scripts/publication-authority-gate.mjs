import { requireCarouselRegister } from "../src/content-register-routing.mjs";

const LINEAR_API_URL = "https://api.linear.app/graphql";

const EXIT = Object.freeze({
  ALLOW_SCHEDULED: 0,
  REJECT_ALREADY_PUBLISHED: 20,
  REJECT_CANCELLED_OR_REMOVED: 21,
  REJECT_NOT_SCHEDULED: 22,
  AUTHORITY_ERROR: 30,
});

export function resolveAuthorityRegisterDocumentId(contentId, configuredDocumentId = "") {
  const route = requireCarouselRegister(contentId);
  const configured = String(configuredDocumentId ?? "").trim();

  if (configured && configured !== route.register_document_id) {
    const error = new Error("REGISTER_DOCUMENT_ROUTE_MISMATCH");
    error.code = "REGISTER_DOCUMENT_ROUTE_MISMATCH";
    throw error;
  }

  return route.register_document_id;
}

function normalizeCell(value) {
  return String(value ?? "")
    .trim()
    .replace(/\*\*/g, "")
    .replace(/__/g, "")
    .replace(/`/g, "")
    .trim();
}

function extractPublicationState(value) {
  const normalized = normalizeCell(value).toUpperCase();
  const states = [
    "PUBLISHED",
    "SCHEDULED",
    "PLANNED",
    "CANCELLED",
    "REMOVED",
    "UNKNOWN",
  ];
  return states.find((state) => normalized.includes(state)) ?? null;
}

export function evaluatePublicationAuthority(markdown, contentId) {
  const normalizedContentId = String(contentId ?? "").trim();

  if (!/^SDOH-[A-Z0-9-]+$/.test(normalizedContentId)) {
    return {
      ok: false,
      decision: "AUTHORITY_ERROR",
      reason: "INVALID_CONTENT_ID",
      allow_job_creation: false,
      exit_code: EXIT.AUTHORITY_ERROR,
    };
  }

  const lines = String(markdown ?? "").replace(/\r\n/g, "\n").split("\n");
  const sectionStart = lines.findIndex(
    (line) => /^##\s+Log publikasi\s*$/i.test(line.trim())
  );

  if (sectionStart < 0) {
    return {
      ok: false,
      content_id: normalizedContentId,
      decision: "AUTHORITY_ERROR",
      reason: "PUBLICATION_LOG_SECTION_NOT_FOUND",
      allow_job_creation: false,
      exit_code: EXIT.AUTHORITY_ERROR,
    };
  }

  let sectionEnd = lines.length;
  for (let i = sectionStart + 1; i < lines.length; i += 1) {
    if (/^##\s+/.test(lines[i].trim())) {
      sectionEnd = i;
      break;
    }
  }

  const matchingRows = [];

  for (const rawLine of lines.slice(sectionStart + 1, sectionEnd)) {
    const line = rawLine.trim();
    if (!line.startsWith("|") || !line.endsWith("|")) continue;

    const cells = line
      .slice(1, -1)
      .split("|")
      .map((cell) => cell.trim());

    if (cells.length < 4) continue;
    if (normalizeCell(cells[0]) !== normalizedContentId) continue;

    matchingRows.push({
      content_id: normalizedContentId,
      destination: normalizeCell(cells[1]),
      scheduled_at: normalizeCell(cells[2]),
      state: extractPublicationState(cells[3]),
    });
  }

  if (matchingRows.length === 0) {
    return {
      ok: true,
      content_id: normalizedContentId,
      publication_states: [],
      decision: "REJECT_NOT_SCHEDULED",
      reason: "PUBLICATION_RECORD_NOT_FOUND",
      allow_job_creation: false,
      exit_code: EXIT.REJECT_NOT_SCHEDULED,
    };
  }

  const states = matchingRows.map((row) => row.state);

  if (states.some((state) => state === null)) {
    return {
      ok: false,
      content_id: normalizedContentId,
      publication_states: states,
      decision: "AUTHORITY_ERROR",
      reason: "UNRECOGNIZED_PUBLICATION_STATE",
      allow_job_creation: false,
      exit_code: EXIT.AUTHORITY_ERROR,
    };
  }

  if (states.includes("PUBLISHED")) {
    return {
      ok: true,
      content_id: normalizedContentId,
      publication_states: states,
      decision: "REJECT_ALREADY_PUBLISHED",
      reason: "AUTHORITATIVE_REGISTER_ALREADY_PUBLISHED",
      allow_job_creation: false,
      exit_code: EXIT.REJECT_ALREADY_PUBLISHED,
    };
  }

  if (states.includes("CANCELLED") || states.includes("REMOVED")) {
    return {
      ok: true,
      content_id: normalizedContentId,
      publication_states: states,
      decision: "REJECT_CANCELLED_OR_REMOVED",
      reason: "AUTHORITATIVE_REGISTER_TERMINAL_NONPUBLISHABLE_STATE",
      allow_job_creation: false,
      exit_code: EXIT.REJECT_CANCELLED_OR_REMOVED,
    };
  }

  if (matchingRows.length === 1 && states[0] === "SCHEDULED") {
    return {
      ok: true,
      content_id: normalizedContentId,
      publication_states: states,
      decision: "ALLOW_SCHEDULED",
      reason: "AUTHORITATIVE_REGISTER_SCHEDULED",
      allow_job_creation: true,
      exit_code: EXIT.ALLOW_SCHEDULED,
    };
  }

  return {
    ok: true,
    content_id: normalizedContentId,
    publication_states: states,
    decision: "REJECT_NOT_SCHEDULED",
    reason: "AUTHORITATIVE_REGISTER_NOT_EXACTLY_ONE_SCHEDULED_RECORD",
    allow_job_creation: false,
    exit_code: EXIT.REJECT_NOT_SCHEDULED,
  };
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
    body: JSON.stringify({
      query,
      variables: { id: documentId },
    }),
  });

  if (!response.ok) {
    throw new Error(`Linear HTTP ${response.status}`);
  }

  const payload = await response.json();

  if (Array.isArray(payload.errors) && payload.errors.length > 0) {
    throw new Error("Linear GraphQL returned errors");
  }

  if (!payload.data?.document?.content) {
    throw new Error("Linear document content missing");
  }

  return payload.data.document;
}

function runSelfTest() {
  const fixture = `
## Register materi

| ID konten | Status materi |
| -- | -- |
| SDOH-BURGUNDY-CAR-0006 | **Approved** |

## Log publikasi

| ID konten | Akun / platform | Jadwal (WITA) | Status publikasi |
| -- | -- | -- | -- |
| SDOH-BURGUNDY-CAR-0006 | Instagram — @satudosisobathati | 2026-09-19 | **PUBLISHED** |
| SDOH-BURGUNDY-CAR-0099 | Instagram — @satudosisobathati | 2026-10-01, 19:30 WITA | **SCHEDULED** |
`;

  const published = evaluatePublicationAuthority(
    fixture,
    "SDOH-BURGUNDY-CAR-0006"
  );
  const scheduled = evaluatePublicationAuthority(
    fixture,
    "SDOH-BURGUNDY-CAR-0099"
  );
  const missing = evaluatePublicationAuthority(
    fixture,
    "SDOH-BURGUNDY-CAR-0100"
  );

  const burgundyRegister = resolveAuthorityRegisterDocumentId(
    "SDOH-BURGUNDY-CAR-0099"
  );
  const sageRegister = resolveAuthorityRegisterDocumentId(
    "SDOH-SAGE-CAR-0005"
  );

  if (
    burgundyRegister !== "346b4c0c-9aec-4454-a2b5-06210b2c88c6" ||
    sageRegister !== "458e4dc3-a1a6-4a44-ab6e-afefa1d28eba"
  ) {
    throw new Error("self-test failed: carousel register routing");
  }

  let mismatchRejected = false;
  try {
    resolveAuthorityRegisterDocumentId(
      "SDOH-SAGE-CAR-0005",
      "346b4c0c-9aec-4454-a2b5-06210b2c88c6"
    );
  } catch (error) {
    mismatchRejected = error?.code === "REGISTER_DOCUMENT_ROUTE_MISMATCH";
  }
  if (!mismatchRejected) {
    throw new Error("self-test failed: cross-theme register mismatch was not rejected");
  }

  let unsupportedRejected = false;
  try {
    resolveAuthorityRegisterDocumentId("SDOH-SAGE-REEL-0001");
  } catch (error) {
    unsupportedRejected =
      error?.code === "UNSUPPORTED_CAROUSEL_CONTENT_ID";
  }
  if (!unsupportedRejected) {
    throw new Error("self-test failed: unsupported format did not fail closed");
  }

  if (
    published.decision !== "REJECT_ALREADY_PUBLISHED" ||
    published.allow_job_creation !== false ||
    published.exit_code !== EXIT.REJECT_ALREADY_PUBLISHED
  ) {
    throw new Error("self-test failed: published content was not rejected");
  }

  if (
    scheduled.decision !== "ALLOW_SCHEDULED" ||
    scheduled.allow_job_creation !== true ||
    scheduled.exit_code !== EXIT.ALLOW_SCHEDULED
  ) {
    throw new Error("self-test failed: scheduled content was not allowed");
  }

  if (
    missing.decision !== "REJECT_NOT_SCHEDULED" ||
    missing.allow_job_creation !== false
  ) {
    throw new Error("self-test failed: missing publication record did not fail closed");
  }

  console.log("publication authority gate self-test PASS");
}

async function main() {
  if (process.argv.includes("--self-test")) {
    runSelfTest();
    return;
  }

  const apiKey = process.env.LINEAR_API_KEY;
  const contentId = process.env.CONTENT_ID;
  let documentId;
  try {
    documentId = resolveAuthorityRegisterDocumentId(
      contentId,
      process.env.LINEAR_REGISTER_DOCUMENT_ID
    );
  } catch (error) {
    console.error(
      JSON.stringify({
        ok: false,
        content_id: String(contentId ?? "").trim(),
        decision: "AUTHORITY_ERROR",
        reason: error?.code || error?.message || "REGISTER_ROUTING_FAILED",
        allow_job_creation: false,
      })
    );
    process.exit(EXIT.AUTHORITY_ERROR);
  }

  if (!apiKey) {
    console.error(
      JSON.stringify({
        ok: false,
        decision: "AUTHORITY_ERROR",
        reason: "LINEAR_API_KEY_MISSING",
        allow_job_creation: false,
      })
    );
    process.exit(EXIT.AUTHORITY_ERROR);
  }

  if (!contentId) {
    console.error(
      JSON.stringify({
        ok: false,
        decision: "AUTHORITY_ERROR",
        reason: "CONTENT_ID_MISSING",
        allow_job_creation: false,
      })
    );
    process.exit(EXIT.AUTHORITY_ERROR);
  }

  try {
    const document = await fetchLinearDocument({ apiKey, documentId });
    const result = evaluatePublicationAuthority(document.content, contentId);

    console.log(
      JSON.stringify({
        ...result,
        authority: "LINEAR",
        register_document_id: document.id,
        register_title: document.title,
        register_updated_at: document.updatedAt,
      })
    );

    process.exit(result.exit_code);
  } catch (error) {
    console.error(
      JSON.stringify({
        ok: false,
        content_id: String(contentId).trim(),
        decision: "AUTHORITY_ERROR",
        reason: "LINEAR_AUTHORITY_READ_FAILED",
        allow_job_creation: false,
        detail: error instanceof Error ? error.message : "unknown error",
      })
    );
    process.exit(EXIT.AUTHORITY_ERROR);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await main();
}

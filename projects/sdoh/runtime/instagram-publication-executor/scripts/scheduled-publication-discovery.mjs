import {
  CAROUSEL_REGISTER_ROUTES,
  requireCarouselRegister,
} from "../src/content-register-routing.mjs";

const LINEAR_API_URL = "https://api.linear.app/graphql";
const DEFAULT_MAX_LATENESS_MS = 30 * 60 * 1000;
const MAX_RECOVERY_LATENESS_MS = 24 * 60 * 60 * 1000;

function normalizeCell(value) {
  return String(value ?? "")
    .trim()
    .replace(/\*\*/g, "")
    .replace(/__/g, "")
    .replace(/`/g, "")
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

function parseRows(section) {
  const rows = [];
  for (const raw of String(section ?? "").split("\n")) {
    const line = raw.trim();
    if (!line.startsWith("|") || !line.endsWith("|")) continue;
    const cells = line.slice(1, -1).split("|").map((cell) => cell.trim());
    if (cells.length < 4) continue;
    if (cells.every((cell) => /^\s*:?-{2,}:?\s*$/.test(cell))) continue;
    rows.push(cells);
  }
  return rows;
}

function parseWitaSchedule(value) {
  const text = normalizeCell(value);

  const iso = Date.parse(text);
  if (
    Number.isFinite(iso) &&
    /T/.test(text) &&
    /(?:Z|[+-]\d{2}:\d{2})$/.test(text)
  ) {
    return new Date(iso).toISOString().replace(".000Z", "Z");
  }

  const match = text.match(
    /^(\d{4}-\d{2}-\d{2})\s*,\s*(\d{2}):(\d{2})(?::\d{2})?\s+WITA$/i
  );
  if (!match) return null;

  const [, date, hour, minute] = match;
  const candidate = `${date}T${hour}:${minute}:00+08:00`;
  return Number.isFinite(Date.parse(candidate)) ? candidate : null;
}

export function discoverDueRecordsFromDocuments({
  documents,
  now = new Date(),
  requestedContentId = "",
  maxLatenessMs = DEFAULT_MAX_LATENESS_MS,
}) {
  const nowMs = now.getTime();
  if (!Number.isFinite(nowMs)) {
    throw new Error("DISCOVERY_TIME_INVALID");
  }

  if (!Number.isFinite(maxLatenessMs) || maxLatenessMs < 0 || maxLatenessMs > MAX_RECOVERY_LATENESS_MS) {
    throw new Error("DISCOVERY_LATENESS_INVALID");
  }

  const requested = String(requestedContentId ?? "").trim();
  if (requested) {
    requireCarouselRegister(requested);
  }

  const candidates = [];

  for (const document of documents) {
    const section = getSection(document?.content, "Log publikasi");
    if (!section) continue;

    for (const cells of parseRows(section)) {
      const contentId = normalizeCell(cells[0]);
      if (!/^SDOH-(?:BURGUNDY|SAGE)-CAR-\d{4}$/.test(contentId)) continue;
      if (requested && contentId !== requested) continue;

      // Exact state match only: substrings such as RESCHEDULED or
      // NOT SCHEDULED must never be treated as an eligible SCHEDULED row.
      const state = normalizeCell(cells[3]).toUpperCase();
      if (state !== "SCHEDULED") continue;

      let route;
      try {
        route = requireCarouselRegister(contentId);
      } catch {
        continue;
      }

      if (document.id !== route.register_document_id) {
        throw new Error("REGISTER_DOCUMENT_ROUTE_MISMATCH");
      }

      const scheduledAt = parseWitaSchedule(cells[2]);
      if (!scheduledAt) {
        throw new Error(`SCHEDULE_NOT_MACHINE_RESOLVABLE:${contentId}`);
      }

      const scheduledAtMs = Date.parse(scheduledAt);
      if (scheduledAtMs > nowMs) continue;
      if (scheduledAtMs < nowMs - maxLatenessMs) continue;

      candidates.push({
        content_id: contentId,
        register_document_id: document.id,
        scheduled_at: scheduledAt,
      });
    }
  }

  if (candidates.length === 0) {
    return {
      ok: true,
      decision: "NO_DUE_CONTENT",
      content_id: null,
      scheduled_at: null,
      due_count: 0,
    };
  }

  if (candidates.length > 1) {
    return {
      ok: false,
      decision: "MULTIPLE_DUE_CONTENT",
      due_count: candidates.length,
      content_ids: candidates.map((item) => item.content_id),
    };
  }

  return {
    ok: true,
    decision: "DUE_CONTENT_READY",
    due_count: 1,
    ...candidates[0],
  };
}

async function fetchDocument(apiKey, documentId) {
  const query = `
    query ScheduledPublicationRegister($id: String!) {
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

function fixture({ id, contentId, schedule, state = "SCHEDULED" }) {
  return {
    id,
    content: `
## Log publikasi

| ID konten | Akun / platform | Jadwal (WITA) | Status publikasi | Note |
| -- | -- | -- | -- | -- |
| ${contentId} | Instagram — @satudosisobathati | ${schedule} | **${state}** | test |
`,
  };
}

function runSelfTest() {
  const burgundy = fixture({
    id: CAROUSEL_REGISTER_ROUTES.BURGUNDY.register_document_id,
    contentId: "SDOH-BURGUNDY-CAR-0099",
    schedule: "2026-10-02, 19:30 WITA",
  });
  const sage = fixture({
    id: CAROUSEL_REGISTER_ROUTES.SAGE.register_document_id,
    contentId: "SDOH-SAGE-CAR-0005",
    schedule: "2026-10-02, 20:00 WITA",
  });

  const none = discoverDueRecordsFromDocuments({
    documents: [burgundy, sage],
    now: new Date("2026-10-02T11:29:00Z"),
  });
  if (none.decision !== "NO_DUE_CONTENT") {
    throw new Error("self-test failed: future content should not be due");
  }

  const one = discoverDueRecordsFromDocuments({
    documents: [burgundy, sage],
    now: new Date("2026-10-02T11:30:00Z"),
  });
  if (
    one.decision !== "DUE_CONTENT_READY" ||
    one.content_id !== "SDOH-BURGUNDY-CAR-0099"
  ) {
    throw new Error("self-test failed: exact due content not discovered");
  }

  const requested = discoverDueRecordsFromDocuments({
    documents: [burgundy, sage],
    now: new Date("2026-10-02T12:00:00Z"),
    requestedContentId: "SDOH-SAGE-CAR-0005",
  });
  if (
    requested.decision !== "DUE_CONTENT_READY" ||
    requested.content_id !== "SDOH-SAGE-CAR-0005"
  ) {
    throw new Error("self-test failed: requested due content not discovered");
  }

  const multiple = discoverDueRecordsFromDocuments({
    documents: [
      burgundy,
      fixture({
        id: CAROUSEL_REGISTER_ROUTES.SAGE.register_document_id,
        contentId: "SDOH-SAGE-CAR-0005",
        schedule: "2026-10-02, 19:30 WITA",
      }),
    ],
    now: new Date("2026-10-02T11:30:00Z"),
  });
  if (
    multiple.decision !== "MULTIPLE_DUE_CONTENT" ||
    multiple.ok !== false
  ) {
    throw new Error("self-test failed: multiple due rows must fail closed");
  }

  const stale = discoverDueRecordsFromDocuments({
    documents: [burgundy],
    now: new Date("2026-10-02T12:00:01Z"),
  });
  if (stale.decision !== "NO_DUE_CONTENT") {
    throw new Error("self-test failed: stale row must not be selected");
  }

  for (const lookalike of ["RESCHEDULED", "NOT SCHEDULED", "SCHEDULED?", "UNSCHEDULED"]) {
    const result = discoverDueRecordsFromDocuments({
      documents: [
        fixture({
          id: CAROUSEL_REGISTER_ROUTES.BURGUNDY.register_document_id,
          contentId: "SDOH-BURGUNDY-CAR-0099",
          schedule: "2026-10-02, 19:30 WITA",
          state: lookalike,
        }),
      ],
      now: new Date("2026-10-02T11:30:00Z"),
    });
    if (result.decision !== "NO_DUE_CONTENT") {
      throw new Error(`self-test failed: look-alike state ${lookalike} was treated as SCHEDULED`);
    }
  }

  const early = discoverDueRecordsFromDocuments({
    documents: [burgundy],
    now: new Date("2026-10-02T11:29:59Z"),
  });
  if (early.decision !== "NO_DUE_CONTENT") {
    throw new Error("self-test failed: row selected one second before scheduled_at");
  }

  const witaBoundary = discoverDueRecordsFromDocuments({
    documents: [burgundy],
    now: new Date("2026-10-02T11:30:00Z"),
  });
  if (witaBoundary.scheduled_at !== "2026-10-02T19:30:00+08:00") {
    throw new Error("self-test failed: WITA schedule not resolved to +08:00");
  }

  console.log("scheduled publication discovery self-test PASS");
  console.log("look-alike states (RESCHEDULED / NOT SCHEDULED) excluded PASS");
  console.log("not-before-scheduled_at (one second early) PASS");
  console.log("19:30 WITA resolves to 2026-10-02T19:30:00+08:00 PASS");
  console.log("future row no-op PASS");
  console.log("single due row selection PASS");
  console.log("requested content selection PASS");
  console.log("multiple due rows fail-closed PASS");
  console.log("30-minute staleness exclusion PASS");
}

async function main() {
  if (process.argv.includes("--self-test")) {
    runSelfTest();
    return;
  }

  const apiKey = process.env.LINEAR_API_KEY;
  if (!apiKey) throw new Error("LINEAR_API_KEY_MISSING");

  const requestedContentId = process.env.REQUESTED_CONTENT_ID || "";
  const maxLatenessMs = process.env.DISCOVERY_MAX_LATENESS_MS
    ? Number(process.env.DISCOVERY_MAX_LATENESS_MS)
    : DEFAULT_MAX_LATENESS_MS;
  const documentIds = [
    CAROUSEL_REGISTER_ROUTES.BURGUNDY.register_document_id,
    CAROUSEL_REGISTER_ROUTES.SAGE.register_document_id,
  ];

  const documents = await Promise.all(
    documentIds.map((documentId) => fetchDocument(apiKey, documentId))
  );

  const result = discoverDueRecordsFromDocuments({
    documents,
    requestedContentId,
    maxLatenessMs,
    now: new Date(),
  });

  console.log(JSON.stringify(result));

  if (!result.ok) {
    process.exit(20);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await main();
}

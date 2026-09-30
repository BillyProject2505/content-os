const LINEAR_API_URL = "https://api.linear.app/graphql";
const EXPECTED_ACCOUNT = "@satudosisobathati";

export async function fetchLinearRegister({ apiKey, documentId, fetchImpl = fetch }) {
  if (!apiKey) throw authorityError("LINEAR_API_KEY_MISSING");
  if (!documentId) throw authorityError("REGISTER_DOCUMENT_ID_MISSING");
  const query = `query PublicationRegister($id: String!) { document(id: $id) { id title content updatedAt } }`;
  let response;
  try {
    response = await fetchImpl(LINEAR_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: apiKey },
      body: JSON.stringify({ query, variables: { id: documentId } }),
    });
  } catch {
    throw authorityError("LINEAR_AUTHORITY_NETWORK_ERROR");
  }
  if (!response.ok) throw authorityError("LINEAR_AUTHORITY_HTTP_ERROR");
  let payload;
  try { payload = await response.json(); } catch { throw authorityError("LINEAR_AUTHORITY_INVALID_RESPONSE"); }
  if (Array.isArray(payload.errors) && payload.errors.length) throw authorityError("LINEAR_AUTHORITY_GRAPHQL_ERROR");
  const document = payload.data?.document;
  if (!document?.id || typeof document.content !== "string") throw authorityError("LINEAR_AUTHORITY_DOCUMENT_MISSING");
  return document;
}

export async function verifyLivePublicationAuthority({ apiKey, documentId, contentId, captionRevision, scheduledAt, expectedAccount = EXPECTED_ACCOUNT, nowMs = Date.now(), fetchImpl = fetch }) {
  const document = await fetchLinearRegister({ apiKey, documentId, fetchImpl });
  const evaluation = evaluatePublicationPreflight({ markdown: document.content, contentId, captionRevision, scheduledAt, expectedAccount, nowMs });
  return { ...evaluation, authority: "LINEAR", register_document_id: document.id, register_title: document.title || null, register_updated_at: document.updatedAt || null };
}

export function evaluatePublicationPreflight({ markdown, contentId, captionRevision, scheduledAt, expectedAccount = EXPECTED_ACCOUNT, nowMs = Date.now() }) {
  validateContentId(contentId);
  validateCaptionRevision(captionRevision);
  const expectedScheduleMs = Date.parse(scheduledAt);
  if (!Number.isFinite(expectedScheduleMs)) return reject("INVALID_JOB_SCHEDULE");

  const material = findSingleContentRow(markdown, "Register materi", contentId);
  if (!material.ok) return material;
  const materialStatus = findCell(material, "Status materi");
  if (!materialStatus || !/\bApproved\b/i.test(normalizeCell(materialStatus))) return reject("MATERIAL_NOT_APPROVED");

  const revisionCell = findCell(material, "Naskah & revisi") || "";
  const revisionPattern = new RegExp(`Caption\\s+${escapeRegex(captionRevision)}\\s+APPROVED\\s*\\/\\s*LOCKED`, "i");
  if (!revisionPattern.test(normalizeCell(revisionCell))) return reject("CAPTION_REVISION_NOT_APPROVED_LOCKED");

  const qaCell = findCell(material, "Bukti QA & persetujuan") || "";
  const qaNormalized = normalizeCell(qaCell).replace(/[–—]/g, "-").replace(/\s+/g, " ");
  if (!/G1\s*-\s*G7\s+PASS/i.test(qaNormalized)) return reject("QA_NOT_PASS");

  const publication = findPublicationRows(markdown, contentId);
  if (!publication.ok) return publication;
  const states = publication.rows.map((row) => extractPublicationState(findCell(row, "Status publikasi")));
  if (states.includes("PUBLISHED")) return reject("ALREADY_PUBLISHED", { publication_states: states });
  if (states.includes("CANCELLED") || states.includes("REMOVED")) return reject("TERMINAL_NONPUBLISHABLE_STATE", { publication_states: states });
  if (publication.rows.length !== 1 || states.length !== 1 || states[0] !== "SCHEDULED") return reject("NOT_EXACTLY_ONE_SCHEDULED_RECORD", { publication_states: states });

  const row = publication.rows[0];
  const destination = normalizeCell(findCell(row, "Akun / platform") || "");
  if (!/\bInstagram\b/i.test(destination) || !destination.includes(expectedAccount)) return reject("DESTINATION_MISMATCH");

  const registerScheduleMs = parseWitaSchedule(findCell(row, "Jadwal (WITA)") || "");
  if (!Number.isFinite(registerScheduleMs)) return reject("REGISTER_SCHEDULE_UNPARSABLE");
  if (Math.abs(registerScheduleMs - expectedScheduleMs) >= 60_000) return reject("SCHEDULE_MISMATCH");
  if (expectedScheduleMs > nowMs) return reject("SCHEDULE_NOT_DUE");

  return { ok: true, allow_execute: true, decision: "ALLOW_EXECUTION", content_id: contentId, publication_state: "SCHEDULED", material_state: "APPROVED", qa_state: "PASS", caption_revision: captionRevision, scheduled_at: scheduledAt };
}

export async function verifyImmutableExecutionPayload({ job, payload }) {
  if (!payload) throw authorityError("EXECUTION_PAYLOAD_MISSING");
  if (payload.caption_revision !== job.caption_revision) throw authorityError("EXECUTION_PAYLOAD_REVISION_MISMATCH");
  if (typeof payload.caption_text !== "string" || payload.caption_text.length < 1 || payload.caption_text.length > 2200) throw authorityError("EXECUTION_PAYLOAD_CAPTION_INVALID");
  if (typeof payload.caption_sha256 !== "string" || !/^[0-9a-f]{64}$/i.test(payload.caption_sha256)) throw authorityError("EXECUTION_PAYLOAD_HASH_INVALID");
  if (typeof payload.register_document_id !== "string" || payload.register_document_id.length < 1) throw authorityError("EXECUTION_PAYLOAD_REGISTER_INVALID");
  const actualHash = await sha256Hex(payload.caption_text);
  if (actualHash !== payload.caption_sha256.toLowerCase()) throw authorityError("EXECUTION_PAYLOAD_HASH_MISMATCH");
  return { caption: payload.caption_text, caption_revision: payload.caption_revision, register_document_id: payload.register_document_id };
}

function findSingleContentRow(markdown, heading, contentId) {
  const table = parseSectionTable(markdown, heading);
  if (!table.ok) return table;
  const rows = table.rows.filter((row) => normalizeCell(findCell(row, "ID konten") || "") === contentId);
  if (!rows.length) return reject("MATERIAL_RECORD_NOT_FOUND");
  if (rows.length !== 1) return reject("MATERIAL_RECORD_NOT_UNIQUE");
  return rows[0];
}

function findPublicationRows(markdown, contentId) {
  const table = parseSectionTable(markdown, "Log publikasi");
  if (!table.ok) return table;
  const rows = table.rows.filter((row) => normalizeCell(findCell(row, "ID konten") || "") === contentId);
  if (!rows.length) return reject("PUBLICATION_RECORD_NOT_FOUND");
  return { ok: true, rows };
}

function parseSectionTable(markdown, heading) {
  const lines = String(markdown || "").replace(/\r\n/g, "\n").split("\n");
  const start = lines.findIndex((line) => line.trim().toLowerCase() === `## ${String(heading).toLowerCase()}`);
  if (start < 0) return reject("AUTHORITY_SECTION_NOT_FOUND");
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i += 1) { if (/^##\s+/.test(lines[i].trim())) { end = i; break; } }
  const tableLines = lines.slice(start + 1, end).map((line) => line.trim()).filter((line) => line.startsWith("|") && line.endsWith("|"));
  const headerIndex = tableLines.findIndex((line) => splitRow(line).some((cell) => normalizeCell(cell) === "ID konten"));
  if (headerIndex < 0) return reject("AUTHORITY_TABLE_HEADER_NOT_FOUND");
  const headers = splitRow(tableLines[headerIndex]).map(normalizeCell);
  const rows = [];
  for (const line of tableLines.slice(headerIndex + 2)) {
    const cells = splitRow(line);
    if (cells.length !== headers.length) continue;
    const values = {};
    for (let i = 0; i < headers.length; i += 1) values[headers[i]] = cells[i];
    rows.push({ ok: true, values });
  }
  return { ok: true, rows };
}

function splitRow(line) { return line.slice(1, -1).split("|").map((cell) => cell.trim()); }
function findCell(row, header) { return row?.values?.[header] ?? null; }
function extractPublicationState(value) {
  const normalized = normalizeCell(value).toUpperCase();
  return ["PUBLISHED", "SCHEDULED", "PLANNED", "CANCELLED", "REMOVED", "UNKNOWN"].find((state) => normalized.includes(state)) || null;
}
function parseWitaSchedule(value) {
  const match = normalizeCell(value).match(/(\d{4}-\d{2}-\d{2})\s*(?:,|T|\s)\s*(\d{2}):(\d{2})(?::\d{2})?\s*(?:WITA|\+08:00)?/i);
  if (!match) return NaN;
  return Date.parse(`${match[1]}T${match[2]}:${match[3]}:00+08:00`);
}
function validateContentId(value) { if (typeof value !== "string" || !/^SDOH-[A-Z0-9-]+$/.test(value)) throw authorityError("INVALID_CONTENT_ID"); }
function validateCaptionRevision(value) { if (typeof value !== "string" || !/^v\d+(?:\.\d+)*[a-z]?$/i.test(value)) throw authorityError("INVALID_CAPTION_REVISION"); }
function normalizeCell(value) { return String(value ?? "").trim().replace(/\*\*/g, "").replace(/__/g, "").replace(/`/g, "").trim(); }
function escapeRegex(value) { return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
async function sha256Hex(value) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}
function reject(reason, extra = {}) { return { ok: false, allow_execute: false, decision: "REJECT_EXECUTION", reason, ...extra }; }
function authorityError(code) { const error = new Error(code); error.code = code; error.httpStatus = 409; return error; }

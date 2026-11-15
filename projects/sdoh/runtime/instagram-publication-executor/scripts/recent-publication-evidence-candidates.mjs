// Read-only discovery of SDOH carousel register rows needing possible D1 evidence writeback.
// Eligibility is not publication authority. Never stages, prepares, executes, or calls Meta.
import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
import {
  CAROUSEL_REGISTER_ROUTES,
  requireCarouselRegister,
} from "../src/content-register-routing.mjs";

const LINEAR_API_URL = "https://api.linear.app/graphql";
const LOOKBACK_MS = 48 * 60 * 60 * 1000;
const MAX_CANDIDATES = 4;
const EXPECTED_DESTINATION = "Instagram — @satudosisobathati";

function normalize(value) {
  return String(value ?? "").replace(/\*\*|\x60/g, "").trim();
}

function publicationSection(markdown) {
  const lines = String(markdown ?? "").split(/\r?\n/);
  const first = lines.findIndex(line => /^##\s+Log publikasi\s*$/i.test(line.trim()));
  if (first < 0) throw new Error("PUBLICATION_LOG_SECTION_NOT_FOUND");
  let last = lines.length;
  for (let i = first + 1; i < lines.length; i++) {
    if (/^##\s+/.test(lines[i].trim())) { last = i; break; }
  }
  return lines.slice(first + 1, last);
}

function parseWita(value) {
  const match = normalize(value).match(/^(\d{4}-\d{2}-\d{2}),\s*(\d{2}):(\d{2}) WITA$/);
  if (!match) throw new Error("RECOVERY_SCHEDULE_NOT_MACHINE_RESOLVABLE");
  const date = new Date(`${match[1]}T${match[2]}:${match[3]}:00+08:00`);
  if (!Number.isFinite(date.getTime())) throw new Error("RECOVERY_SCHEDULE_INVALID");
  return date;
}

export function discoverEvidenceCandidates({documents, now = new Date()}) {
  const nowMs = now.getTime();
  if (!Number.isFinite(nowMs)) throw new Error("RECOVERY_TIME_INVALID");
  if (!Array.isArray(documents)) throw new Error("RECOVERY_DOCUMENTS_INVALID");

  const seen = new Set();
  const candidates = [];
  for (const document of documents) {
    const route = Object.values(CAROUSEL_REGISTER_ROUTES)
      .find(item => item.register_document_id === document.id);
    if (!route) throw new Error("RECOVERY_UNKNOWN_REGISTER");
    for (const line of publicationSection(document.content)) {
      const raw = line.trim();
      if (!raw.startsWith("|") || !raw.endsWith("|")) continue;
      const cells = raw.slice(1, -1).split("|").map(normalize);
      if (cells.length < 4) continue;
      const contentId = cells[0];
      if (!/^SDOH-(BURGUNDY|SAGE)-CAR-\d{4}$/.test(contentId)) continue;
      const exactRoute = requireCarouselRegister(contentId);
      if (exactRoute.register_document_id !== document.id) {
        throw new Error("RECOVERY_REGISTER_DOCUMENT_ROUTE_MISMATCH");
      }
      if (cells[1] !== EXPECTED_DESTINATION || cells[3].toUpperCase() !== "SCHEDULED") continue;
      const scheduledAt = parseWita(cells[2]);
      const ageMs = nowMs - scheduledAt.getTime();
      if (ageMs < 0 || ageMs > LOOKBACK_MS) continue;
      if (seen.has(contentId)) throw new Error("RECOVERY_DUPLICATE_ELIGIBLE_ROW");
      seen.add(contentId);
      const compactUtc = scheduledAt.toISOString().replace(/[-:]/g, "").replace(".000", "");
      candidates.push({
        content_id: contentId,
        job_id: `IG-${contentId}-${compactUtc}`,
        scheduled_at: scheduledAt.toISOString(),
      });
    }
  }
  if (candidates.length > MAX_CANDIDATES) throw new Error("RECOVERY_TOO_MANY_CANDIDATES");
  candidates.sort((a, b) => a.scheduled_at.localeCompare(b.scheduled_at));
  return {ok:true, decision:"EVIDENCE_CANDIDATES_DISCOVERED", count:candidates.length, candidates};
}

async function fetchRegister(apiKey, id) {
  const response = await fetch(LINEAR_API_URL, {
    method:"POST",
    signal:AbortSignal.timeout(30000),
    headers:{"Content-Type":"application/json",Authorization:apiKey},
    body:JSON.stringify({
      query:"query($id:String!){document(id:$id){id content}}",
      variables:{id},
    }),
  });
  if (!response.ok) throw new Error(`RECOVERY_LINEAR_HTTP_${response.status}`);
  const data = await response.json();
  if (data.errors?.length || !data.data?.document?.content) {
    throw new Error("RECOVERY_LINEAR_DOCUMENT_UNAVAILABLE");
  }
  if (data.data.document.id !== id) throw new Error("RECOVERY_LINEAR_DOCUMENT_ID_MISMATCH");
  return data.data.document;
}

function runSelfTest() {
  const mk = (id,rows) => ({
    id, content:"## Log publikasi\n\n| ID konten | Akun / platform | Jadwal (WITA) | Status publikasi |\n| -- | -- | -- | -- |\n" +
      rows.map(([c,d,s,st]) => `| ${c} | ${d} | ${s} | **${st}** |`).join("\n") + "\n",
  });
  const burgundy = CAROUSEL_REGISTER_ROUTES.BURGUNDY.register_document_id;
  const sage = CAROUSEL_REGISTER_ROUTES.SAGE.register_document_id;
  const row = ["SDOH-BURGUNDY-CAR-0099",EXPECTED_DESTINATION,"2026-11-16, 19:30 WITA","SCHEDULED"];
  const now = new Date("2026-11-16T11:40:00Z");
  const doc = mk(burgundy,[row]);
  const result = discoverEvidenceCandidates({documents:[doc],now});
  assert.equal(result.count,1);
  assert.equal(result.candidates[0].job_id,"IG-SDOH-BURGUNDY-CAR-0099-20261116T113000Z");
  assert.equal(discoverEvidenceCandidates({documents:[doc],now:new Date("2026-11-16T11:29:00Z")}).count,0);
  assert.equal(discoverEvidenceCandidates({documents:[doc],now:new Date("2026-11-18T11:31:00Z")}).count,0);
  for (const state of ["PUBLISHED","RESCHEDULED","NOT SCHEDULED","SCHEDULED?"]) {
    assert.equal(discoverEvidenceCandidates({documents:[mk(burgundy,[[...row.slice(0,3),state]])],now}).count,0);
  }
  assert.equal(discoverEvidenceCandidates({documents:[mk(burgundy,[[row[0],"Instagram — @other",row[2],row[3]]])],now}).count,0);
  assert.throws(()=>discoverEvidenceCandidates({documents:[mk(sage,[row])],now}),/ROUTE_MISMATCH/);
  assert.throws(()=>discoverEvidenceCandidates({documents:[mk(burgundy,[row,row])],now}),/DUPLICATE/);
  assert.equal(discoverEvidenceCandidates({documents:[
    doc,
    mk(sage,[["SDOH-SAGE-CAR-0099",EXPECTED_DESTINATION,"2026-11-16, 20:00 WITA","SCHEDULED"]]),
  ],now:new Date("2026-11-16T12:00:00Z")}).count,2);
  console.log("Read-only evidence recovery discovery PASS: bounded window, deterministic IDs, exact account/state, duplicate + route guards");
}

async function main() {
  if (process.argv.includes("--self-test")) { runSelfTest(); return; }
  const apiKey = process.env.LINEAR_API_KEY;
  if (!apiKey) throw new Error("RECOVERY_LINEAR_API_KEY_MISSING");
  const documents = await Promise.all(Object.values(CAROUSEL_REGISTER_ROUTES)
    .map(route => fetchRegister(apiKey,route.register_document_id)));
  console.log(JSON.stringify(discoverEvidenceCandidates({documents})));
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  main().catch(e => { console.error(`::error::Evidence recovery discovery failed (${e.message})`); process.exitCode = 1; });
}

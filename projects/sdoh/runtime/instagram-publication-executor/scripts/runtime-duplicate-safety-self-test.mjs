// BUS-140 remediation Phases 5, 7 and 8 — duplicate-publication safety tests.
//
// Uses a real SQLite engine (node:sqlite) behind a minimal D1-compatible shim,
// so compare-and-swap semantics (`changes`) are the real database semantics,
// not a hand-written fake. All Meta calls are mocked; nothing leaves the
// process. Requires Node >= 22.
import { DatabaseSync } from "node:sqlite";
import {
  classifySiblingJob,
  findBlockingSiblingJob,
} from "../src/cross-job-guard.js";
import { executeCarouselPublication } from "../src/instagram-carousel-executor.js";
import { sha256Hex } from "../src/execution-authority.js";

const GOVERNANCE_REF = "f3b036f8064a309cc32ed0f50950f3cf6950b405";
const CONTENT_ID = "SDOH-SAGE-CAR-0099";
// Signed media URLs are checked against the real clock, so the fixture is
// anchored to "now": the slot became due one minute ago.
const NOW_MS = Math.floor(Date.now() / 1000) * 1000;
const iso = (ms) => new Date(ms).toISOString();
const SCHEDULED_AT = iso(NOW_MS - 60_000).replace(".000Z", "Z");
const JOB_ID = `IG-SDOH-SAGE-CAR-0099-${SCHEDULED_AT.replace(/[-:]/g, "")}`;
const H = 60 * 60 * 1000;
const CAPTION = "locked caption";
const CAPTION_HASH = await sha256Hex(CAPTION);
const IG_USER_ID = "17841437534220039";

const SCHEMA = `
CREATE TABLE publication_jobs (
  id TEXT PRIMARY KEY, idempotency_key TEXT UNIQUE, content_id TEXT NOT NULL,
  linear_issue TEXT, platform TEXT, account TEXT, format TEXT,
  scheduled_at TEXT, caption_revision TEXT, asset_folder_id TEXT,
  state TEXT NOT NULL, remote_media_id TEXT, remote_permalink TEXT,
  claimed_at TEXT, published_at TEXT, last_error TEXT,
  created_at TEXT, updated_at TEXT, governance_ref TEXT
);
CREATE TABLE execution_credentials (
  job_id TEXT PRIMARY KEY, drive_token_ciphertext TEXT NOT NULL,
  drive_token_expires_at TEXT NOT NULL, created_at TEXT NOT NULL
);
CREATE TABLE publication_job_media (
  job_id TEXT NOT NULL, slot INTEGER NOT NULL CHECK (slot BETWEEN 1 AND 5),
  drive_file_id TEXT NOT NULL, mime_type TEXT NOT NULL, expected_sha256 TEXT,
  PRIMARY KEY (job_id, slot)
);
CREATE TABLE publication_job_remote_artifacts (
  job_id TEXT NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('CHILD', 'PARENT', 'PUBLISHED_MEDIA')),
  slot INTEGER NOT NULL CHECK (slot BETWEEN 0 AND 5),
  remote_id TEXT NOT NULL, state TEXT NOT NULL,
  created_at TEXT NOT NULL, updated_at TEXT NOT NULL,
  PRIMARY KEY (job_id, kind, slot)
);
CREATE TABLE execution_authority_snapshots (
  job_id TEXT PRIMARY KEY, content_id TEXT NOT NULL, register_document_id TEXT NOT NULL,
  register_updated_at TEXT NOT NULL, publication_state TEXT NOT NULL,
  material_state TEXT NOT NULL, qa_state TEXT NOT NULL, destination_account TEXT NOT NULL,
  scheduled_at TEXT NOT NULL, caption_revision TEXT NOT NULL, approved_caption TEXT NOT NULL,
  caption_sha256 TEXT NOT NULL, governance_ref TEXT NOT NULL,
  authority_checked_at TEXT NOT NULL, authority_expires_at TEXT NOT NULL, created_at TEXT NOT NULL
);
`;

function d1(sqlite) {
  return {
    prepare(sql) {
      let params = [];
      const stmt = sqlite.prepare(sql);
      return {
        bind(...values) {
          params = values;
          return this;
        },
        async first() {
          await Promise.resolve();
          return stmt.get(...params) ?? null;
        },
        async all() {
          await Promise.resolve();
          return { results: stmt.all(...params) };
        },
        async run() {
          await Promise.resolve();
          const info = stmt.run(...params);
          return { meta: { changes: Number(info.changes) } };
        },
      };
    },
  };
}

function seedJob(sqlite, { id = JOB_ID, state = "CLAIMED", scheduledAt = SCHEDULED_AT, lastError = null, remoteMediaId = null } = {}) {
  sqlite.prepare(
    `INSERT INTO publication_jobs (id, idempotency_key, content_id, linear_issue, platform, account,
       format, scheduled_at, caption_revision, asset_folder_id, state, remote_media_id, last_error,
       created_at, updated_at, governance_ref)
     VALUES (?, ?, ?, 'BUS-999', 'instagram', '@satudosisobathati', 'carousel', ?, 'v0.1',
       'folder_abcdefghij', ?, ?, ?, ?, ?, ?)`
  ).run(id, `instagram|@satudosisobathati|${CONTENT_ID}|${scheduledAt}`, CONTENT_ID, scheduledAt,
    state, remoteMediaId, lastError, iso(NOW_MS - 30_000), iso(NOW_MS - 30_000), GOVERNANCE_REF);
}

function seedExecutable(sqlite) {
  seedJob(sqlite);
  sqlite.prepare(
    `INSERT INTO execution_credentials VALUES (?, 'v1.x.y', ?, ?)`
  ).run(JOB_ID, iso(NOW_MS + 50 * 60_000), iso(NOW_MS - 30_000));
  for (let slot = 1; slot <= 5; slot += 1) {
    sqlite.prepare(
      `INSERT INTO publication_job_media VALUES (?, ?, ?, 'image/jpeg', ?)`
    ).run(JOB_ID, slot, `drive-file-${slot}`, "a".repeat(64));
  }
  sqlite.prepare(
    `INSERT INTO execution_authority_snapshots VALUES (?, ?, 'reg', ?, 'SCHEDULED',
      'APPROVED', 'PASS', '@satudosisobathati', ?, 'v0.1', ?, ?, ?, ?, ?, ?)`
  ).run(JOB_ID, CONTENT_ID, iso(NOW_MS - 120_000), SCHEDULED_AT, CAPTION, CAPTION_HASH,
    GOVERNANCE_REF, iso(NOW_MS - 30_000), iso(NOW_MS + 5 * 60_000), iso(NOW_MS - 30_000));
}

function seedReadyParent(sqlite, parentId = "parent-1") {
  for (let slot = 1; slot <= 5; slot += 1) {
    sqlite.prepare(
      `INSERT INTO publication_job_remote_artifacts VALUES (?, 'CHILD', ?, ?, 'READY', 'x', 'x')`
    ).run(JOB_ID, slot, `child-${slot}`);
  }
  sqlite.prepare(
    `INSERT INTO publication_job_remote_artifacts VALUES (?, 'PARENT', 0, ?, 'READY', 'x', 'x')`
  ).run(JOB_ID, parentId);
  sqlite.prepare(`UPDATE publication_jobs SET state = 'PUBLISHING' WHERE id = ?`).run(JOB_ID);
}

function newDb() {
  const sqlite = new DatabaseSync(":memory:");
  sqlite.exec(SCHEMA);
  return sqlite;
}

function env(sqlite) {
  return {
    DB: d1(sqlite),
    META_ACCESS_TOKEN: "test-meta-token",
    META_IG_USER_ID: IG_USER_ID,
    MEDIA_SIGNING_SECRET: "11".repeat(32),
    PUBLISHING_ENABLED: "true",
  };
}

const tick = () => new Promise((resolve) => setTimeout(resolve, 0));

// Mock Graph API. `account` controls /me; returns every call for assertions.
function metaMock({ account = { user_id: IG_USER_ID, username: "satudosisobathati" }, accountAfterFirst = null } = {}) {
  const calls = [];
  let meCalls = 0;
  let mediaSeq = 0;
  const fetchImpl = async (url, options = {}) => {
    await tick();
    const method = options.method || "GET";
    const u = new URL(url);
    calls.push({ method, path: u.pathname, body: options.body || null });
    const reply = (payload) =>
      new Response(JSON.stringify(payload), { status: 200, headers: { "Content-Type": "application/json" } });

    if (u.pathname.endsWith("/me")) {
      meCalls += 1;
      return reply(meCalls > 1 && accountAfterFirst ? accountAfterFirst : account);
    }
    if (method === "POST" && u.pathname.endsWith("/media_publish")) {
      mediaSeq += 1;
      return reply({ id: `media-${mediaSeq}` });
    }
    if (method === "POST" && u.pathname.endsWith("/media")) {
      const params = new URLSearchParams(options.body);
      if (params.get("media_type") === "CAROUSEL") return reply({ id: `parent-new-${calls.length}` });
      return reply({ id: `child-new-${calls.length}` });
    }
    if (method === "GET" && /\/media-\d+$/.test(u.pathname)) {
      return reply({
        id: u.pathname.split("/").pop(),
        permalink: "https://www.instagram.com/p/test/",
        timestamp: "2026-10-09T11:31:10+0000",
        caption: CAPTION,
      });
    }
    return reply({ id: u.pathname.split("/").pop(), status_code: "FINISHED", status: "Finished" });
  };
  return { fetchImpl, calls };
}

const publishCalls = (calls) => calls.filter((c) => c.method === "POST" && c.path.endsWith("/media_publish"));
const writeCalls = (calls) => calls.filter((c) => c.method === "POST");

async function execute(sqlite, fetchImpl) {
  return executeCarouselPublication({
    env: env(sqlite),
    jobId: JOB_ID,
    governanceRef: GOVERNANCE_REF,
    origin: "https://worker.example",
    fetchImpl,
    now: () => NOW_MS,
  });
}

async function expectThrow(promise, code) {
  try {
    await promise;
  } catch (error) {
    if (error?.message === code || error?.code === code) return error;
    throw new Error(`expected ${code}, got ${error?.message}`);
  }
  throw new Error(`expected ${code}, but call succeeded`);
}

const results = [];
function pass(name) {
  results.push(name);
}

// ---------------------------------------------------------------- Phase 5
{
  const live = NOW_MS;
  const cases = [
    ["old published", { state: "PUBLISHED", scheduled_at: iso(NOW_MS - 5 * 24 * H) }, [], true],
    ["old remote media id", { state: "FAILED", remote_media_id: "123", scheduled_at: iso(NOW_MS - 5 * 24 * H) }, [], true],
    ["old PUBLISHED_MEDIA artifact", { state: "FAILED", scheduled_at: iso(NOW_MS - 5 * 24 * H) }, [{ kind: "PUBLISHED_MEDIA", state: "RETURNED" }], true],
    ["old publish attempted", { state: "FAILED", scheduled_at: iso(NOW_MS - 5 * 24 * H) }, [{ kind: "PARENT", state: "PUBLISH_ATTEMPTED" }], true],
    ["old publishing", { state: "PUBLISHING", scheduled_at: iso(NOW_MS - 5 * 24 * H) }, [], true],
    ["old reconciliation required", { state: "FAILED", last_error: "RECONCILIATION_REQUIRED_AFTER_PUBLISH_ATTEMPT", scheduled_at: iso(NOW_MS - 5 * 24 * H) }, [], true],
    ["old ambiguous", { state: "FAILED", last_error: "PUBLISH_ATTEMPT_AMBIGUOUS_MANUAL_CONFIRMATION_REQUIRED", scheduled_at: iso(NOW_MS - 5 * 24 * H) }, [], true],
    ["old remote id recovery", { state: "FAILED", last_error: "PUBLISHED_REMOTE_ID_RECOVERY_REQUIRED", scheduled_at: iso(NOW_MS - 5 * 24 * H) }, [], true],
    ["old parent container PUBLISHED", { state: "FAILED", last_error: "PARENT_CONTAINER_PUBLISHED", scheduled_at: iso(NOW_MS - 5 * 24 * H) }, [], true],
    ["old still-executable claimed (<24h)", { state: "CLAIMED", scheduled_at: iso(NOW_MS - 10 * H) }, [], true],
    ["old failed prepublish", { state: "FAILED", last_error: "CHILD_CONTAINER_CREATE_FAILED", scheduled_at: iso(NOW_MS - 5 * 24 * H) }, [{ kind: "CHILD", state: "CREATED" }], false],
    ["old expired staged-only (>24h)", { state: "SCHEDULED", scheduled_at: iso(NOW_MS - 5 * 24 * H) }, [], false],
  ];
  for (const [name, job, artifacts, blocking] of cases) {
    const verdict = classifySiblingJob(job, artifacts, live);
    if (verdict.blocking !== blocking) {
      throw new Error(`Phase 5 classify failed: ${name} → ${JSON.stringify(verdict)}`);
    }
  }
  pass("Phase 5 sibling classification: 12/12 cases");

  // same content + same schedule → same job_id → no sibling at all
  const sqlite = newDb();
  seedJob(sqlite, { state: "PUBLISHED" });
  if ((await findBlockingSiblingJob(d1(sqlite), { contentId: CONTENT_ID, excludeJobId: JOB_ID, nowMs: live })) !== null) {
    throw new Error("Phase 5: same job identity must not count as a sibling");
  }
  pass("Phase 5 same content + same schedule → same identity, no sibling (idempotent rerun path)");

  // same content + new schedule after a published job → blocked before any Meta call
  const blocked = newDb();
  seedJob(blocked, { id: "IG-OLD", state: "PUBLISHED", scheduledAt: iso(NOW_MS - 5 * 24 * H), remoteMediaId: "999" });
  seedExecutable(blocked);
  const meta = metaMock();
  const error = await expectThrow(execute(blocked, meta.fetchImpl), "CROSS_JOB_PUBLICATION_EVIDENCE");
  if (meta.calls.length !== 0 || error.meta?.sibling_job_id !== "IG-OLD") {
    throw new Error("Phase 5: rescheduled-after-published must stop before any Meta call");
  }
  const state = blocked.prepare(`SELECT state FROM publication_jobs WHERE id = ?`).get(JOB_ID).state;
  if (state !== "CLAIMED") throw new Error("Phase 5: blocked execute must not mutate job state");
  pass("Phase 5 same content + new schedule after PUBLISHED job → blocked, 0 Meta calls, no state change");

  // same content after prepublish failure → controlled retry allowed
  const retry = newDb();
  seedJob(retry, { id: "IG-OLD", state: "FAILED", scheduledAt: iso(NOW_MS - 5 * 24 * H), lastError: "CHILD_CONTAINER_CREATE_FAILED" });
  seedExecutable(retry);
  const retryMeta = metaMock();
  const retryResult = await execute(retry, retryMeta.fetchImpl);
  if (retryResult.status !== "PUBLISHED" || publishCalls(retryMeta.calls).length !== 1) {
    throw new Error(`Phase 5: prepublish-failure retry should publish exactly once, got ${retryResult.status}`);
  }
  pass("Phase 5 same content after prepublish failure → controlled retry publishes exactly once");
}

// ---------------------------------------------------------------- Phase 7
{
  const sqlite = newDb();
  seedExecutable(sqlite);
  const meta = metaMock({ account: { user_id: "1111", username: "someone_else" } });
  const error = await expectThrow(execute(sqlite, meta.fetchImpl), "DESTINATION_ACCOUNT_MISMATCH");
  if (writeCalls(meta.calls).length !== 0) throw new Error("Phase 7: Meta write after account mismatch");
  if (error.meta?.account?.resolved_username !== "someone_else" || JSON.stringify(error.meta).includes("test-meta-token")) {
    throw new Error("Phase 7: unsafe or missing account diagnostics");
  }
  if (sqlite.prepare(`SELECT state FROM publication_jobs WHERE id = ?`).get(JOB_ID).state !== "CLAIMED") {
    throw new Error("Phase 7: account mismatch must not mutate job state");
  }
  pass("Phase 7 account mismatch before container creation → 0 Meta writes, no state change, token not logged");

  const sqlite2 = newDb();
  seedExecutable(sqlite2);
  seedReadyParent(sqlite2);
  const meta2 = metaMock({ accountAfterFirst: { user_id: IG_USER_ID, username: "renamed_account" } });
  await expectThrow(execute(sqlite2, meta2.fetchImpl), "DESTINATION_ACCOUNT_MISMATCH");
  if (publishCalls(meta2.calls).length !== 0) throw new Error("Phase 7: media_publish after late mismatch");
  const parentState = sqlite2.prepare(`SELECT state FROM publication_job_remote_artifacts WHERE job_id = ? AND kind = 'PARENT'`).get(JOB_ID).state;
  if (parentState !== "READY") throw new Error("Phase 7: late mismatch must stop before PUBLISH_ATTEMPTED");
  pass("Phase 7 account change between checks → stopped before PUBLISH_ATTEMPTED and media_publish");
}

// ---------------------------------------------------------------- Phase 8
{
  // Two concurrent executes on the same PUBLISHING job with a READY parent.
  for (let round = 0; round < 25; round += 1) {
    const sqlite = newDb();
    seedExecutable(sqlite);
    seedReadyParent(sqlite);
    const meta = metaMock();
    const outcomes = await Promise.allSettled([
      execute(sqlite, meta.fetchImpl),
      execute(sqlite, meta.fetchImpl),
    ]);
    const published = publishCalls(meta.calls).length;
    if (published !== 1) {
      throw new Error(`Phase 8: concurrent executes issued ${published} media_publish calls (round ${round})`);
    }
    const losers = outcomes.filter((o) => o.status === "rejected");
    if (losers.length !== 1 || !/ARTIFACT_STATE_CAS_FAILED|REMOTE_ARTIFACT_STATE_UPDATE_FAILED/.test(losers[0].reason?.message)) {
      throw new Error(`Phase 8: expected exactly one CAS loser (round ${round})`);
    }
  }
  pass("Phase 8 two concurrent executes (25 rounds) → exactly 1 media_publish, loser stops on CAS");

  // Concurrent executes racing to create the parent container.
  for (let round = 0; round < 25; round += 1) {
    const sqlite = newDb();
    seedExecutable(sqlite);
    for (let slot = 1; slot <= 5; slot += 1) {
      sqlite.prepare(`INSERT INTO publication_job_remote_artifacts VALUES (?, 'CHILD', ?, ?, 'READY', 'x', 'x')`).run(JOB_ID, slot, `child-${slot}`);
    }
    sqlite.prepare(`UPDATE publication_jobs SET state = 'PUBLISHING' WHERE id = ?`).run(JOB_ID);
    const meta = metaMock();
    await Promise.allSettled([execute(sqlite, meta.fetchImpl), execute(sqlite, meta.fetchImpl)]);
    const published = publishCalls(meta.calls).length;
    if (published > 1) throw new Error(`Phase 8: parent-creation race published ${published} times`);
  }
  pass("Phase 8 concurrent parent-creation race (25 rounds) → at most 1 media_publish");

  // A second execute after PUBLISH_ATTEMPTED still stops (regression of existing guard).
  const sqlite = newDb();
  seedExecutable(sqlite);
  seedReadyParent(sqlite);
  sqlite.prepare(`UPDATE publication_job_remote_artifacts SET state = 'PUBLISH_ATTEMPTED' WHERE job_id = ? AND kind = 'PARENT'`).run(JOB_ID);
  const meta = metaMock();
  const result = await execute(sqlite, meta.fetchImpl);
  if (result.status !== "RECONCILIATION_REQUIRED" || meta.calls.length !== 0) {
    throw new Error("Phase 8: execute after PUBLISH_ATTEMPTED must stop with 0 Meta calls");
  }
  pass("Phase 8 execute after PUBLISH_ATTEMPTED → RECONCILIATION_REQUIRED, 0 Meta calls");

  // Already-published job converges as a no-op.
  const done = newDb();
  seedExecutable(done);
  done.prepare(`UPDATE publication_jobs SET state = 'PUBLISHED', remote_media_id = 'media-1', remote_permalink = 'https://www.instagram.com/p/test/' WHERE id = ?`).run(JOB_ID);
  const doneMeta = metaMock();
  const doneResult = await execute(done, doneMeta.fetchImpl);
  if (doneResult.status !== "ALREADY_PUBLISHED" || doneMeta.calls.length !== 0) {
    throw new Error("already-published job must be a no-op with 0 Meta calls");
  }
  pass("already-published job → ALREADY_PUBLISHED, 0 Meta calls");
}

// Happy path sanity: exactly one publish, two account checks, verified PUBLISHED.
{
  const sqlite = newDb();
  seedExecutable(sqlite);
  const meta = metaMock();
  const result = await execute(sqlite, meta.fetchImpl);
  const meCalls = meta.calls.filter((c) => c.path.endsWith("/me")).length;
  if (result.status !== "PUBLISHED" || publishCalls(meta.calls).length !== 1 || meCalls !== 2) {
    throw new Error(`happy path failed: ${result.status}, publishes=${publishCalls(meta.calls).length}, me=${meCalls}`);
  }
  pass("happy path → PUBLISHED, exactly 1 media_publish, 2 live account checks");
}

console.log("runtime duplicate-safety self-test PASS");
for (const line of results) console.log(`  ${line}`);

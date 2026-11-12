import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { matchReviewedPublicationAmendment } from "../src/reviewed-publication-amendments.js";
import {
  executeCarouselPublication,
  reconcileCarouselPublication,
} from "../src/instagram-carousel-executor.js";
import { sha256Hex } from "../src/execution-authority.js";

const GOVERNANCE_REF = "f3b036f8064a309cc32ed0f50950f3cf6950b405";
const JOB_ID = "TEST-AMBIGUOUS-PUBLISH-001";
const NOW_MS = Date.parse("2026-09-30T05:00:00Z");
const SCHEDULED_AT = "2026-09-30T12:55:00+08:00";
const CAPTION = "locked caption";
const CAPTION_HASH = await sha256Hex(CAPTION);

function makeState() {
  return {
    job: {
      id: JOB_ID,
      content_id: "SDOH-BURGUNDY-CAR-TEST",
      platform: "instagram",
      account: "@satudosisobathati",
      format: "carousel",
      scheduled_at: SCHEDULED_AT,
      caption_revision: "v0.1",
      state: "FAILED",
      governance_ref: GOVERNANCE_REF,
      remote_media_id: null,
      remote_permalink: null,
      last_error: "RECONCILIATION_REQUIRED_AFTER_PUBLISH_ATTEMPT",
    },
    authority: {
      content_id: "SDOH-BURGUNDY-CAR-TEST",
      register_document_id: "test-register",
      register_updated_at: "2026-09-30T04:58:00Z",
      publication_state: "SCHEDULED",
      material_state: "APPROVED",
      qa_state: "PASS",
      destination_account: "@satudosisobathati",
      scheduled_at: SCHEDULED_AT,
      caption_revision: "v0.1",
      approved_caption: CAPTION,
      caption_sha256: CAPTION_HASH,
      governance_ref: GOVERNANCE_REF,
      authority_checked_at: "2026-09-30T04:59:00Z",
      authority_expires_at: "2026-09-30T05:10:00Z",
      created_at: "2026-09-30T04:59:00Z",
    },
    credential: {
      drive_token_expires_at: "2026-09-30T05:30:00Z",
    },
    media: Array.from({ length: 5 }, (_, i) => ({
      slot: i + 1,
      drive_file_id: `drive-${i + 1}`,
      mime_type: "image/jpeg",
      expected_sha256: "a".repeat(64),
    })),
    artifacts: [
      ...Array.from({ length: 5 }, (_, i) => ({
        kind: "CHILD",
        slot: i + 1,
        remote_id: `child-${i + 1}`,
        state: "READY",
        created_at: "2026-09-30T04:59:00Z",
        updated_at: "2026-09-30T04:59:00Z",
      })),
      {
        kind: "PARENT",
        slot: 0,
        remote_id: "parent-ambiguous-1",
        state: "PUBLISH_ATTEMPTED",
        created_at: "2026-09-30T04:59:30Z",
        updated_at: "2026-09-30T04:59:40Z",
      },
    ],
    updates: [],
  };
}

function normalizeSql(sql) {
  return String(sql).replace(/\s+/g, " ").trim();
}

function createFakeDb(state) {
  return {
    prepare(sql) {
      const normalized = normalizeSql(sql);
      let bound = [];

      return {
        bind(...values) {
          bound = values;
          return this;
        },

        async first() {
          if (normalized.includes("FROM publication_jobs")) {
            return state.job?.id === bound[0] ? { ...state.job } : null;
          }
          if (normalized.includes("FROM execution_authority_snapshots")) {
            return state.job?.id === bound[0] && state.authority
              ? { ...state.authority }
              : null;
          }
          if (normalized.includes("FROM execution_credentials")) {
            return state.job?.id === bound[0] && state.credential
              ? { ...state.credential }
              : null;
          }
          throw new Error(`Unhandled first() SQL: ${normalized}`);
        },

        async all() {
          if (normalized.includes("FROM publication_job_media")) {
            return {
              results: state.job?.id === bound[0]
                ? state.media.map((row) => ({ ...row }))
                : [],
            };
          }
          if (normalized.includes("FROM publication_job_remote_artifacts")) {
            return {
              results: state.job?.id === bound[0]
                ? state.artifacts.map((row) => ({ ...row }))
                : [],
            };
          }
          throw new Error(`Unhandled all() SQL: ${normalized}`);
        },

        async run() {
          if (normalized.startsWith("INSERT INTO publication_job_remote_artifacts")) {
            const [jobId, kind, slot, remote_id, artifactState] = bound;
            assert.equal(jobId, state.job.id);
            const old = state.artifacts.find(x => x.kind === kind && x.slot === slot);
            if (old) Object.assign(old, { remote_id, state: artifactState });
            else state.artifacts.push({ kind, slot, remote_id, state: artifactState });
            return { meta: { changes: 1 } };
          }
          if (normalized.startsWith("UPDATE publication_jobs") && normalized.includes("SET state = 'PUBLISHED'")) {
            assert.equal(bound[0], state.job.id);
            Object.assign(state.job, { state: "PUBLISHED", remote_media_id: bound[1],
              remote_permalink: bound[2], published_at: bound[3], last_error: null });
            return { meta: { changes: 1 } };
          }

          if (
            normalized.startsWith("UPDATE publication_jobs") &&
            normalized.includes("SET state = 'FAILED'")
          ) {
            if (state.job?.id !== bound[0]) {
              return { meta: { changes: 0 } };
            }
            state.job.state = "FAILED";
            state.job.last_error = bound[1];
            state.updates.push({
              type: "job_failed",
              reason: bound[1],
            });
            return { meta: { changes: 1 } };
          }

          if (normalized.startsWith("DELETE FROM execution_credentials")) {
            if (state.job?.id === bound[0] && state.credential) {
              state.credential = null;
              state.updates.push({ type: "credential_deleted" });
              return { meta: { changes: 1 } };
            }
            return { meta: { changes: 0 } };
          }

          throw new Error(`Unhandled run() SQL: ${normalized}`);
        },
      };
    },
  };
}

function createEnv(state) {
  return {
    DB: createFakeDb(state),
    META_ACCESS_TOKEN: "test-meta-token",
    META_IG_USER_ID: "17841437534220039",
    MEDIA_SIGNING_SECRET: "11".repeat(32),
    PUBLISHING_ENABLED: "true",
  };
}

// Gate 1: a second execute invocation after PUBLISH_ATTEMPTED must stop before
// any Meta call, especially before media_publish.
{
  const state = makeState();
  let fetchCount = 0;
  const fetchImpl = async () => {
    fetchCount += 1;
    throw new Error("Meta fetch must not be called on blocked second execute");
  };

  const result = await executeCarouselPublication({
    env: createEnv(state),
    jobId: JOB_ID,
    governanceRef: GOVERNANCE_REF,
    origin: "https://worker.example",
    fetchImpl,
    now: () => NOW_MS,
  });

  if (result.status !== "RECONCILIATION_REQUIRED") {
    throw new Error(`Expected RECONCILIATION_REQUIRED, got ${result.status}`);
  }
  if (result.publish_attempted !== true || result.retry_safe !== false) {
    throw new Error("Second execute did not preserve ambiguous publish safety flags");
  }
  if (result.parent_container_id !== "parent-ambiguous-1") {
    throw new Error("Second execute lost the parent container evidence");
  }
  if (fetchCount !== 0) {
    throw new Error("Second execute made a Meta call after PUBLISH_ATTEMPTED");
  }
  if (
    state.job.last_error !==
    "RECONCILIATION_REQUIRED_AFTER_PUBLISH_ATTEMPT"
  ) {
    throw new Error("Second execute did not persist reconciliation-required evidence");
  }
}

// Gate 2: reconcile may query the recorded parent status, but must never issue
// another media_publish. FINISHED + PUBLISH_ATTEMPTED remains ambiguous.
{
  const state = makeState();
  const calls = [];

  const fetchImpl = async (url, options = {}) => {
    const method = options.method || "GET";
    calls.push({ url, method, body: options.body || null });

    if (method !== "GET") {
      throw new Error("Reconciliation attempted a non-GET Meta request");
    }
    if (String(url).includes("/media_publish")) {
      throw new Error("Reconciliation attempted media_publish");
    }

    return new Response(
      JSON.stringify({
        id: "parent-ambiguous-1",
        status_code: "FINISHED",
        status: "Finished",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  };

  const result = await reconcileCarouselPublication({
    env: createEnv(state),
    jobId: JOB_ID,
    fetchImpl,
    now: () => NOW_MS,
  });

  if (result.status !== "PUBLISH_ATTEMPT_AMBIGUOUS") {
    throw new Error(`Expected PUBLISH_ATTEMPT_AMBIGUOUS, got ${result.status}`);
  }
  if (result.publish_attempted !== true || result.retry_safe !== false) {
    throw new Error("Reconciliation did not fail closed on ambiguous publish");
  }
  if (calls.length !== 1 || calls[0].method !== "GET") {
    throw new Error("Reconciliation must perform exactly one read-only Meta status query");
  }
  if (calls.some((call) => String(call.url).includes("/media_publish"))) {
    throw new Error("Reconciliation issued a duplicate publish request");
  }
  if (
    state.job.last_error !==
    "PUBLISH_ATTEMPT_AMBIGUOUS_MANUAL_CONFIRMATION_REQUIRED"
  ) {
    throw new Error("Reconciliation did not persist the ambiguous outcome");
  }
}

console.log("ambiguous publish reconciliation self-test PASS");
console.log("immutable authority caption used by execute/reconcile");
console.log("second execute: 0 Meta calls after PUBLISH_ATTEMPTED");
console.log("reconcile: read-only parent status check only");
console.log("duplicate media_publish attempts: 0");

const originalCaption = "Mulai 9 November, kampanye Transgender Awareness Month mengajak kita menghormati identitas setiap orang. Setiap orang transgender berhak merasa aman sebagai dirinya.\n\nRasa hormat bisa dimulai dari hal sederhana: menggunakan nama yang seseorang pakai, menjaga privasinya, serta mendengarkan tanpa menghakimi.\n\nTidak semua orang ingin membagikan pengalaman pribadinya. Kita dapat tetap hadir dengan hormat, tanpa memaksa penjelasan tentang identitas gender atau perjalanan hidupnya.\n\nsatu dosis obat hati\nTransgender Awareness Month November 2026\nTo Honor and To Hold: Their Lives, Their Legacies\n#satudosisobathati #obathati #manado #mentalhealthmanado #pelanpelanaja\n";
const publishedCaption = "Mulai 9 November, kampanye Transgender Awareness Month mengajak kita menghormati identitas setiap orang. Setiap orang transgender berhak merasa aman sebagai dirinya.\n\nRasa hormat bisa dimulai dari hal sederhana: menggunakan nama yang seseorang pakai, menjaga privasinya, serta mendengarkan tanpa menghakimi.\n\nTidak semua orang ingin membagikan pengalaman pribadinya. Kita dapat tetap hadir dengan hormat, tanpa memaksa penjelasan tentang identitas gender atau perjalanan hidupnya.\n\nsatu dosis obat hati\nTransgender Awareness Month November 2026 🏳️‍⚧️\nTo Honor and To Hold: Their Lives, Their Legacies\n\n#satudosisobathati #transawarenessmonth #manado #mentalhealthmanado #transgender";
const amendedJobId = "IG-SDOH-SAGE-CAR-0015-20261109T113000Z";
function amendmentState() {
  const s = makeState();
  Object.assign(s.job, { id: amendedJobId, content_id: "SDOH-SAGE-CAR-0015",
    scheduled_at: "2026-11-09T19:30:00+08:00", caption_revision: "v1.1",
    remote_media_id: "18150047068583407" });
  Object.assign(s.authority, { content_id: s.job.content_id, scheduled_at: s.job.scheduled_at,
    caption_revision: "v1.1", approved_caption: originalCaption,
    caption_sha256: "5d13d0f741ec7da701996fcdb662f1884f4c7ce1cbe71fd45a56c5f0a6fc88c1" });
  return s;
}
function publishedRemote() {
  return { id: "18150047068583407", permalink: "https://www.instagram.com/p/DfhOwnMIBwK/",
    timestamp: "2026-11-09T11:31:53+0000", caption: publishedCaption };
}
for (const variant of ["exact", "remote-caption", "original-caption", "media", "permalink",
    "timestamp", "job", "content", "account", "schedule", "artifact-fallback", "original-match"]) {
  const s = amendmentState(), remote = publishedRemote();
  if (variant === "remote-caption") remote.caption += " ";
  if (variant === "original-caption") {
    s.authority.approved_caption += " ";
    s.authority.caption_sha256 = await sha256Hex(s.authority.approved_caption);
  }
  if (variant === "media") s.job.remote_media_id = remote.id = "other-media";
  if (variant === "permalink") remote.permalink += "wrong";
  if (variant === "timestamp") remote.timestamp = "2026-11-09T11:31:54+0000";
  if (variant === "job") s.job.id += "-other";
  if (variant === "content") s.authority.content_id = s.job.content_id = "SDOH-SAGE-CAR-0016";
  if (variant === "account") s.authority.destination_account = s.job.account = "@other";
  if (variant === "schedule") s.authority.scheduled_at = s.job.scheduled_at = "2026-11-10T19:30:00+08:00";
  if (variant === "artifact-fallback") {
    s.job.remote_media_id = null;
    s.artifacts.push({kind: "PUBLISHED_MEDIA", slot: 0, remote_id: remote.id, state: "RETURNED"});
  }
  if (variant === "original-match") remote.caption = originalCaption;
  const snapshotBefore = JSON.stringify(s.authority);
  let calls = 0;
  const fetchImpl = async (url, options = {}) => {
    assert.equal(options.method || "GET", "GET", "No Meta writes allowed");
    assert.ok(!String(url).includes("/media_publish"));
    calls++;
    return Response.json(remote);
  };
  const result = await reconcileCarouselPublication({env: createEnv(s), jobId: s.job.id,
    fetchImpl, now: () => Date.parse("2026-11-09T15:00:00Z")});
  assert.equal(calls, 1);
  const accepted = ["exact", "artifact-fallback", "original-match"].includes(variant);
  assert.equal(result.status, accepted ? "PUBLISHED" : "REMOTE_CAPTION_MISMATCH", variant);
  assert.equal(JSON.stringify(s.authority), snapshotBefore, "Immutable authority must remain untouched");
  assert.equal(result.retry_safe, false);
  if (accepted) {
    assert.equal(s.job.state, "PUBLISHED");
    assert.equal(s.job.last_error, null);
    assert.equal(s.credential, null);
    assert.equal(result.caption_verification, variant === "original-match" ?
      "ORIGINAL_AUTHORITY" : "REVIEWED_POST_PUBLICATION_AMENDMENT");
    // Repeated reconciliation stays read-only and has the same outcome.
    const again = await reconcileCarouselPublication({env: createEnv(s), jobId: s.job.id,
      fetchImpl, now: () => Date.parse("2026-11-09T15:01:00Z")});
    assert.equal(again.status, "PUBLISHED");
  } else {
    assert.equal(s.job.state, "FAILED");
    assert.ok(!s.artifacts.some(x => x.state === "VERIFIED"));
  }
}
console.log("Reviewed published-caption amendment PASS: exact identity/hash match only, immutable authority, no Meta writes, repeat-safe.");


// Sage 0016: Owner approved only one omitted terminal LF after independent
// Meta evidence read-back (run 43228783158). All other caption differences
// must remain blocked; no publish writes may occur during reconciliation.
{
  const delivery = JSON.parse(readFileSync(new URL("../../seasonal-color/2026-11-delivery-preparation.json", import.meta.url), "utf8"));
  const record = delivery.records.find(row => row.content_id === "SDOH-SAGE-CAR-0016");
  assert.ok(record, "Sage 0016 frozen delivery record exists");
  const caption = record.approved_caption;
  assert.ok(caption.endsWith("\n"), "Approved caption ends in exactly one LF");
  assert.ok(!caption.endsWith("\n\n"), "No double-LF exception");
  assert.equal(caption.length, 665);
  assert.equal(await sha256Hex(caption), "277efb064ae005695879fa6444b7de7c84dd4bc1ed19b88bc658247d0dce8e87");
  const remoteCaption = caption.slice(0, -1);
  assert.equal(remoteCaption.length, 664);
  assert.equal(await sha256Hex(remoteCaption), "acd81caba82d1d6f5a022b652b8c29c3be288753bd72c14066683568677de963");

  const job = {
    id: "IG-SDOH-SAGE-CAR-0016-20261112T113000Z",
    content_id: "SDOH-SAGE-CAR-0016",
    account: "@satudosisobathati",
    platform: "instagram",
    format: "carousel",
    scheduled_at: "2026-11-12T19:30:00+08:00",
  };
  const remote = {
    id: "18101726075534459",
    permalink: "https://www.instagram.com/p/DfpKqW1kfwE/",
    timestamp: "2026-11-12T13:30:10+0000",
    caption: remoteCaption,
  };
  const accepted = await matchReviewedPublicationAmendment({job, caption, remote});
  assert.equal(accepted?.id, "SDOH-SAGE-CAR-0016-PUBLISHED-CAPTION-20261112");
  assert.equal(accepted?.exact_change, "REMOVE_ONE_TRAILING_LF");

  const invalid = [
    [{id: job.id+"-other"}, {}],
    [{content_id:"SDOH-SAGE-CAR-0017"}, {}],
    [{account:"@other"}, {}],
    [{platform:"facebook"}, {}],
    [{format:"reel"}, {}],
    [{scheduled_at:"2026-11-13T19:30:00+08:00"}, {}],
    [{}, {id:remote.id+"1"}],
    [{}, {permalink:remote.permalink+"wrong"}],
    [{}, {timestamp:"2026-11-12T13:30:11+0000"}],
    [{}, {caption:remoteCaption+" "}],
    [{}, {caption:remoteCaption.slice(0,-1)}],
    [{}, {caption:caption+"\n"}],
  ];
  for (const [jobChanges, remoteChanges] of invalid) {
    const result = await matchReviewedPublicationAmendment({
      job:{...job,...jobChanges},
      caption,
      remote:{...remote,...remoteChanges},
    });
    assert.equal(result, null, "Rejected mismatched identity, timestamp, caption, or non-exact LF omission");
  }
  assert.equal(await matchReviewedPublicationAmendment({job,caption:caption+" ",remote}),null,
    "Even edited approved copy is rejected");

  const state = makeState();
  Object.assign(state.job, {...job, state:"FAILED", governance_ref:GOVERNANCE_REF,
    caption_revision:"v1.1", remote_media_id:remote.id, last_error:"REMOTE_CAPTION_MISMATCH"});
  Object.assign(state.authority, {
    content_id:job.content_id, register_document_id:record.register_document_id,
    scheduled_at:job.scheduled_at, caption_revision:"v1.1",
    destination_account:job.account, approved_caption:caption,
    caption_sha256:await sha256Hex(caption),
  });
  const authorityBefore = JSON.stringify(state.authority);
  const requests = [];
  const fetchImpl = async (url, options={}) => {
    requests.push({url:String(url),method:options.method||"GET"});
    assert.equal(options.method||"GET","GET","Reconciliation must be GET-only");
    assert.ok(!String(url).includes("/media_publish"),"Never publish a second time");
    return Response.json(remote);
  };
  const result = await reconcileCarouselPublication({
    env:createEnv(state),jobId:job.id,fetchImpl,now:()=>Date.parse("2026-11-12T13:36:00Z"),
  });
  assert.equal(result.status,"PUBLISHED");
  assert.equal(result.caption_verification,"REVIEWED_POST_PUBLICATION_AMENDMENT");
  assert.equal(result.caption_amendment?.id,"SDOH-SAGE-CAR-0016-PUBLISHED-CAPTION-20261112");
  assert.equal(state.job.state,"PUBLISHED");
  assert.equal(state.job.remote_media_id,remote.id);
  assert.equal(state.job.last_error,null);
  assert.equal(state.credential,null);
  assert.equal(JSON.stringify(state.authority),authorityBefore,"Immutable approved authority unchanged");
  assert.equal(requests.length,1,"Exactly one Meta read");
  const again = await reconcileCarouselPublication({
    env:createEnv(state),jobId:job.id,fetchImpl,now:()=>Date.parse("2026-11-12T13:37:00Z"),
  });
  assert.equal(again.status,"PUBLISHED");
  assert.equal(requests.length,2,"Second reconciliation only reads remote state");
}
console.log("Sage 0016 exact trailing-LF exception PASS: identity, SHA-256, 12 negative guards, no Meta writes, idempotent.");

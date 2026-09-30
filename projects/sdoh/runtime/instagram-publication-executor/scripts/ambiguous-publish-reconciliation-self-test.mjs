import {
  executeCarouselPublication,
  reconcileCarouselPublication,
} from "../src/instagram-carousel-executor.js";

const GOVERNANCE_REF = "f3b036f8064a309cc32ed0f50950f3cf6950b405";
const JOB_ID = "TEST-AMBIGUOUS-PUBLISH-001";
const NOW_MS = Date.parse("2026-09-30T05:00:00Z");

function makeState() {
  return {
    job: {
      id: JOB_ID,
      content_id: "TEST-CONTENT",
      platform: "instagram",
      account: "@satudosisobathati",
      format: "carousel",
      state: "FAILED",
      governance_ref: GOVERNANCE_REF,
      remote_media_id: null,
      remote_permalink: null,
      last_error: "RECONCILIATION_REQUIRED_AFTER_PUBLISH_ATTEMPT",
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

          if (
            normalized.startsWith("DELETE FROM execution_credentials")
          ) {
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
    caption: "locked caption",
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
    caption: "locked caption",
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
console.log("second execute: 0 Meta calls after PUBLISH_ATTEMPTED");
console.log("reconcile: read-only parent status check only");
console.log("duplicate media_publish attempts: 0");

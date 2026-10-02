import {
  buildStagedJobIdentity,
  handleStage,
  validateExecutionInput,
  validateStagePayload,
} from "../src/staging-bridge.js";

const snapshot = {
  content_id: "SDOH-BURGUNDY-CAR-0099",
  register_document_id: "346b4c0c-9aec-4454-a2b5-06210b2c88c6",
  register_updated_at: "2026-09-30T12:00:00Z",
  publication_state: "SCHEDULED",
  material_state: "APPROVED",
  qa_state: "PASS",
  destination_account: "@satudosisobathati",
  scheduled_at: "2026-09-30T20:00:00+08:00",
  caption_revision: "v1.0",
  approved_caption: "approved caption",
  caption_sha256: "a".repeat(64),
  governance_ref: "b".repeat(40),
  authority_checked_at: "2026-09-30T12:00:00Z",
  authority_expires_at: "2026-09-30T12:05:00Z",
};

const executionInput = {
  linear_issue: "BUS-999",
  asset_folder_id: "folder_abcdefghij",
  media: Array.from({ length: 5 }, (_, i) => ({
    slot: i + 1,
    drive_file_id: `file_abcdefghij${i + 1}`,
    sha256: String(i + 1).repeat(64),
  })),
};

{
  const result = validateStagePayload({
    authority_snapshot: snapshot,
    execution_input: executionInput,
  });
  if (!result.ok) throw new Error("valid staging payload shape rejected");
}

{
  const result = validateExecutionInput(executionInput);
  if (!result.ok) throw new Error(`valid execution input rejected: ${result.error}`);
}

{
  const bad = structuredClone(executionInput);
  bad.media[2].slot = 4;
  const result = validateExecutionInput(bad);
  if (result.ok || result.error !== "MEDIA_SET_INVALID") {
    throw new Error("unordered media set did not fail closed");
  }
}

{
  const identity = buildStagedJobIdentity(snapshot);
  if (
    identity.job_id !==
    "IG-SDOH-BURGUNDY-CAR-0099-20260930T120000Z"
  ) {
    throw new Error(`unexpected staged job ID: ${identity.job_id}`);
  }
  if (
    identity.idempotency_key !==
    "instagram|@satudosisobathati|SDOH-BURGUNDY-CAR-0099|2026-09-30T20:00:00+08:00"
  ) {
    throw new Error("unexpected idempotency key");
  }
}

{
  let dbTouched = false;
  const sageWithWrongRegister = {
    ...structuredClone(snapshot),
    content_id: "SDOH-SAGE-CAR-0005",
    register_document_id: "346b4c0c-9aec-4454-a2b5-06210b2c88c6",
  };

  const env = {
    DB: {
      prepare() {
        dbTouched = true;
        throw new Error("DB must not be touched on register-route mismatch");
      },
    },
    EXECUTOR_INGEST_SECRET: "test-secret",
    PUBLISHING_ENABLED: "false",
  };

  const response = await handleStage(
    new Request("https://worker.example/internal/stage", {
      method: "POST",
      headers: {
        "Authorization": "Bearer test-secret",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        authority_snapshot: sageWithWrongRegister,
        execution_input: executionInput,
      }),
    }),
    env
  );

  const body = await response.json();
  if (
    response.status !== 409 ||
    body.error !== "REGISTER_DOCUMENT_ROUTE_MISMATCH"
  ) {
    throw new Error("cross-theme register mismatch did not fail closed");
  }
  if (dbTouched) {
    throw new Error("staging touched D1 on register-route mismatch");
  }
}

{
  let dbTouched = false;
  const env = {
    DB: {
      prepare() {
        dbTouched = true;
        throw new Error("DB must not be touched while publishing is enabled");
      },
    },
    EXECUTOR_INGEST_SECRET: "test-secret",
    PUBLISHING_ENABLED: "true",
  };

  const response = await handleStage(
    new Request("https://worker.example/internal/stage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        authority_snapshot: snapshot,
        execution_input: executionInput,
      }),
    }),
    env
  );

  const body = await response.json();
  if (
    response.status !== 409 ||
    body.error !== "STAGING_REQUIRES_PUBLISHING_DISABLED"
  ) {
    throw new Error("staging did not fail closed while publishing was enabled");
  }
  if (dbTouched) {
    throw new Error("staging touched D1 while publishing was enabled");
  }
}

console.log("controlled staging self-test PASS");
console.log("deterministic job identity PASS");
console.log("ordered five-file media contract PASS");
console.log("staging while publishing enabled: rejected before D1");
console.log("cross-theme register mismatch: rejected before D1");

import {
  evaluateScheduledExecutionWindow,
  validateExecutePayload,
} from "../src/internal-execution.js";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const base = {
  scheduledAt: "2026-10-02T19:30:00+08:00",
  state: "CLAIMED",
  storedGovernanceRef: "a".repeat(40),
  requestedGovernanceRef: "a".repeat(40),
  scheduledPublishingEnabled: "true",
  manualPublishingEnabled: "false",
};

const validPayload = validateExecutePayload({
  job_id: "IG-SDOH-SAGE-CAR-0005-20261002T113000Z",
  governance_ref: "a".repeat(40),
  execution_mode: "SCHEDULED",
});
assert(validPayload.ok === true, "scheduled execute payload should be valid");

const invalidMode = validateExecutePayload({
  job_id: "job",
  governance_ref: "a".repeat(40),
  execution_mode: "BYPASS",
});
assert(
  invalidMode.ok === false &&
    invalidMode.error === "INVALID_EXECUTION_MODE",
  "unknown execution mode must fail closed"
);

const disabled = evaluateScheduledExecutionWindow({
  ...base,
  scheduledPublishingEnabled: "false",
  nowMs: Date.parse("2026-10-02T19:30:00+08:00"),
});
assert(
  disabled.error === "SCHEDULED_PUBLISHING_DISABLED",
  "scheduled kill switch must fail closed"
);

const manualOpen = evaluateScheduledExecutionWindow({
  ...base,
  manualPublishingEnabled: "true",
  nowMs: Date.parse("2026-10-02T19:30:00+08:00"),
});
assert(
  manualOpen.error === "SCHEDULED_MODE_REQUIRES_MANUAL_WINDOW_CLOSED",
  "scheduled execution must not run while manual global window is open"
);

const governanceMismatch = evaluateScheduledExecutionWindow({
  ...base,
  requestedGovernanceRef: "b".repeat(40),
  nowMs: Date.parse("2026-10-02T19:30:00+08:00"),
});
assert(
  governanceMismatch.error === "GOVERNANCE_REF_MISMATCH",
  "governance mismatch must fail closed"
);

const wrongState = evaluateScheduledExecutionWindow({
  ...base,
  state: "SCHEDULED",
  nowMs: Date.parse("2026-10-02T19:30:00+08:00"),
});
assert(
  wrongState.error === "JOB_STATE_REJECTED",
  "unprepared job must not execute"
);

const early = evaluateScheduledExecutionWindow({
  ...base,
  nowMs: Date.parse("2026-10-02T19:29:59+08:00"),
});
assert(early.error === "SCHEDULE_NOT_DUE", "early execution must be rejected");

const due = evaluateScheduledExecutionWindow({
  ...base,
  nowMs: Date.parse("2026-10-02T19:30:00+08:00"),
});
assert(due.ok === true, "due scheduled execution should be allowed");

const lateButValid = evaluateScheduledExecutionWindow({
  ...base,
  nowMs: Date.parse("2026-10-02T19:59:59+08:00"),
});
assert(
  lateButValid.ok === true,
  "execution inside the 30-minute lateness window should be allowed"
);

const stale = evaluateScheduledExecutionWindow({
  ...base,
  nowMs: Date.parse("2026-10-02T20:00:01+08:00"),
});
assert(stale.error === "SCHEDULE_STALE", "stale execution must be rejected");

console.log("scheduled execution mode self-test PASS");
console.log("scheduled kill switch PASS");
console.log("manual/scheduled window separation PASS");
console.log("governance and job-state gates PASS");
console.log("not-before-scheduled_at gate PASS");
console.log("30-minute staleness gate PASS");

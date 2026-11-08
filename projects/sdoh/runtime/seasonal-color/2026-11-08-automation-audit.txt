# SDOH publication automation audit — 2026-11-08

Verdict: CONDITIONAL PASS; no claim of guaranteed publication.

## Verified evidence
- Readiness run [42447489516](https://github.com/BillyProject2505/content-os/actions/runs/42447489516): scheduler WIF token obtained, 65/65 exact JPEG SHA-256 matches, Worker health HTTP 200, expected Instagram username/user ID.
- Cron/discovery runs 42447766401 and 42448093045, five minutes apart: cloudflare-cron, successful Linear query, NO_DUE_CONTENT. Later run 42448734471 also succeeded after release activation.
- 13 campaign rows activated with explicit Owner release approval; runtime parser checks passed for due-time discovery, exact caption/media authority and rejection before schedule.
- Deployed tag 633c1e9d15c6a60eed2a3abecac2a83cd9790966: all 14 runtime src file blob SHAs match audited main d862f6465b5eab0048c18af7082bad69ccebd88b. An older deployment tag alone is not runtime drift.
- All existing executor self-test scripts and authority/discovery/writeback --self-test checks passed. Includes concurrent publication races, persisted PUBLISH_ATTEMPTED protection, ambiguous response reconciliation, exact media hashes and account mismatch rejection.

## Findings and disposition
1. HIGH — live scheduled gate and credential agreement not yet proven.
   /health exposes wakeup and manual publishing flags, not SCHEDULED_PUBLISHING_ENABLED. Presence of EXECUTOR_INGEST_SECRET in GitHub does not prove it matches the Worker.
   Existing workflow sdoh-scheduled-pilot-readiness.yml checks a known terminal PUBLISHED job via authenticated /internal/status, then expects JOB_STATE_REJECTED from scheduled execute/refresh. The source gates reject the terminal state before executor/Meta or credential mutation. Run this existing workflow on main before relying on scheduled publication. No deployment/config change is justified without its result.
2. HIGH — stale schedule can disappear behind successful NO_DUE_CONTENT.
   Discovery deliberately ignores scheduled rows more than 30 minutes late. After failure or missed writeback, subsequent cron runs can look green.
   Remediation in this change: read-only November campaign monitor, run even after an orchestrator step fails, alerts on missing/duplicate rows, schedule/state drift and absence of PUBLISHED register evidence after 30 minutes. It never retries or publishes. A red workflow is observable evidence, not proof the Owner has notification delivery enabled. It cannot detect an outage that prevents cron from running at all.
3. MEDIUM — recovery is deliberately not fully automatic.
   Child/parent creation errors mark jobs FAILED; orchestrator stops on FAILED. After PUBLISH_ATTEMPTED, retry is prohibited until reconciliation. This favors duplicate prevention over guaranteed delivery. Preserve this safety property. Inspect D1/remote evidence before controlled recovery; do not reset state or create a new schedule blindly.
4. MEDIUM — live media delivery to Meta / publish permission / writeback are not proven by Drive reads or /me.
   Signed gateway retrieval, Meta container creation and media_publish, and Linear write permission still require actual execution evidence. Tests simulate these; health validates account access, not future token longevity or publishing scope.
5. Historical register inconsistency outside the 13-item campaign:
   BURGUNDY-0008 remains SCHEDULED for 2026-11-06 19:30 WITA but runtime authority returns MATERIAL_NOT_APPROVED at that slot. It is now outside normal/24-hour recovery windows; reconcile editorial/runtime history rather than blind retry.
   BURGUNDY-0009 remains scheduled for 2026-11-08 19:30 WITA and passed isolated authority validation. Its live outcome has not been observed. No changes to either record were made.

## Operating constraints
- First November campaign slot: SAGE-0015, 2026-11-09 19:30 WITA / 11:30 UTC. Five-minute cron means actual start can be later than 19:30; Actions queue delay is additional.
- 30-minute normal eligibility window; explicit content-ID late recovery supports at most 24 hours. Do not widen safety windows to hide missed publication.
- Before first slot: run SDOH scheduled pilot readiness on main and inspect its result.
- After a due slot: require remote permalink/timestamp plus converged PUBLISHED register evidence. SCHEDULED or green NO_DUE_CONTENT is insufficient.
- If publication response is ambiguous: reconcile remotely, never blind-retry media_publish.
- The campaign monitor does not change the 13 dates, captions, media, approvals, Worker configuration, or global publishing flags.

## Validation of remediation
- Five monitor test groups: future/in-window, overdue, PUBLISHED, missing/duplicate/state/date drift, inactive campaign.
- Current campaign rows pass monitoring against their agreed schedules.

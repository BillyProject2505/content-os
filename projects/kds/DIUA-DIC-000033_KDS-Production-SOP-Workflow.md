---
document_name: "KDS Satu Hati Sulawesi Utara — Production SOP / Workflow"
document_class: "Domain/Project-Level Operational Workflow Document"
structural_classification: "Tiered — Document Tier: Domain/Project (Tier 2) — KDS Satu Hati Sulawesi Utara"
system: "Content OS → KDS Satu Hati Sulawesi Utara"
owner: "[OPERATIONAL DEFAULT] Document creator under KDS Project Architecture §0 until formally reassigned"
related_issue: "BUS-99"
universal_identifier: "DIUA-DIC-000033"
version: "1.14"
status: "CANONICAL"
depends_on:
  - id: "DIUA-DIC-000032"
    name: "KDS Satu Hati Sulawesi Utara — Project Architecture"
    version: "1.10"
    status: "CANONICAL"
  - id: "DIUA-DIC-000034"
    name: "KDS Satu Hati Sulawesi Utara — Research Source List"
    version: "1.7"
    status: "CANONICAL"
  - id: "DIUA-DIC-000003"
    name: "Content OS — Root Documentation Structure"
    version: "2.5"
    status: "CANONICAL"
  - id: null
    name: "Content OS — Universal Identifier Registry"
    status: "CANONICAL"
  - id: "DIUA-DIC-000042"
    name: "Content OS — Production Connector Lifecycle Profile"
    status: "CANONICAL LOCKED"
  - id: "DIUA-DIC-000041"
    name: "Content OS — Storage Authority Profile"
    status: "CANONICAL"
source_representation:
  platform: "Linear"
  locator: "https://linear.app/bussiness-content-os/document/kds-satu-hati-sulawesi-utara-production-sop-workflow-v114-canonical-8a92180de9db"
representation_profile: "DIUA-DIC-000026@1.3"
---
# KDS Satu Hati Sulawesi Utara — Production SOP / Workflow

## Document Identity

| Field | Value |
| -- | -- |
| Document Name | KDS Satu Hati Sulawesi Utara — Production SOP / Workflow |
| Document Class | Domain/Project-Level Operational Workflow Document |
| System | Content OS → KDS Satu Hati Sulawesi Utara |
| Version | 1.14 |
| Status | **CANONICAL** — v1.14 makes explicit that this document is the KDS cross-format Production Workflow authority and inherits System-wide connector lifecycle/storage behavior from [BUS-118](../../system/DIUA-DIC-000042_Content-OS-Production-Connector-Lifecycle-Profile.md) and [BUS-109](../../system/DIUA-DIC-000041_Content-OS-Storage-Authority-Profile.md). No production stage count or downstream ownership boundary changed. Previously v1.13. |
| Related Issue | [BUS-99](https://linear.app/bussiness-content-os/issue/BUS-99/kds-satu-hati-sulawesi-utara-production-sop) — KDS Satu Hati Sulawesi Utara — Production SOP |
| Owner | **\[OPERATIONAL DEFAULT\]** Document creator under KDS Project Architecture §0 until formally reassigned |
| Structural Classification | Tiered — Document Tier: Domain/Project (Tier 2) — KDS Satu Hati Sulawesi Utara |
| Universal Identifier (UNIS/DIC) | `DIUA-DIC-000033` — ALLOCATED — ACTIVE |
| Depends On | KDS Satu Hati Sulawesi Utara — Project Architecture (v1.10, CANONICAL); KDS Satu Hati Sulawesi Utara — Research Source List (v1.7, CANONICAL); Content OS — Root Documentation Structure (v2.5, CANONICAL); Universal Identifier Registry (current CANONICAL); Content OS — Production Connector Lifecycle Profile ([BUS-118](../../system/DIUA-DIC-000042_Content-OS-Production-Connector-Lifecycle-Profile.md), current CANONICAL LOCKED); Content OS — Storage Authority Profile ([BUS-109](../../system/DIUA-DIC-000041_Content-OS-Storage-Authority-Profile.md), current CANONICAL) |
| Allocation Evidence | CONTENT-OS-ALLOC-033 in Universal Identifier Registration Record v1.25 |
| Structural Reference | [BUS-25](../sdoh/DIUA-DIC-000008_SDOH-Production-SOP.md) — Satu Dosis Obat Hati — Production SOP; workflow structure only, not SDOH-specific semantics or implementation |

## 0. Governance and Authority

This SOP inherits the KDS Tier 2 governance model defined in KDS Project Architecture §0.

This document owns the **cross-format production workflow** for KDS communication artefacts.

For operational use, **KDS Production Workflow** is the canonical short name for this document. No separate KDS Workflow document exists or is required.

### System inheritance

This KDS workflow inherits, by reference:

* [BUS-118](../../system/DIUA-DIC-000042_Content-OS-Production-Connector-Lifecycle-Profile.md) **— Content OS Production Connector Lifecycle Profile (current CANONICAL LOCKED)** for connector resolve/stop/reconnect/final-commit behavior;
* [BUS-109](../../system/DIUA-DIC-000041_Content-OS-Storage-Authority-Profile.md) **— Content OS Storage Authority Profile (current CANONICAL)** for the current canonical governed-text surface / Google Drive binary-reference authority split.

The inherited System rules are not duplicated or redefined here. If wording in this document appears to conflict with those System authorities, the System authority prevails within its scope.

It does not own:

* project identity or scope;
* source-quality criteria;
* factual evidence standards;
* QA acceptance/rejection criteria;
* reusable asset identity or provenance;
* format-specific layout, typography, pacing, motion, dimensions, or implementation;
* channel cadence;
* platform-specific publication automation.

Those concerns remain with their designated project authorities when created.

## 1. Purpose

The purpose of this SOP is to define one predictable path from a communication need to a publication-ready KDS artefact while minimizing duplicated decisions, uncontrolled assumptions, and format-specific leakage into project-level workflow.

The SOP governs **routing and stage progression**, not detailed creative execution.

## 2. Workflow Principles

 1. **Authority before execution.** When a stage depends on a governed authority, that authority must be resolved before the stage can pass.
 2. **Research before claim publication.** Externally verifiable claims must route through the project research authority.
 3. **QA before readiness.** No artefact becomes publication-ready without the applicable QA authority.
 4. **Reusable assets are not inferred.** Canonical reusable identity must come from the KDS Asset Registry once established.
 5. **Format rules remain local to the format.** This SOP must not become a substitute Format Specification.
 6. **No automatic publication.** Production completion and external publication are separate decisions.
 7. **Fail closed on missing required authority.** Missing evidence, QA authority, required asset identity, or required approval produces BLOCKED, not an invented workaround.
 8. **Minimum sufficient process.** Additional gates are added only when repeated production evidence shows they are necessary.
 9. **Applicability controls blocking.** A missing downstream authority blocks an artefact only when that authority is required for that artefact. The absence of an optional or non-applicable authority must not block unrelated production.
10. **Connector use is stage-gated, not continuously live.** Resolve governed rules/state through Linear and required approved binaries/reference evidence through Google Drive only when needed, then stop connector calls during local production.
11. **Fail-open after successful resolve.** Once required authority and binary inputs are resolved/materialized, connector unavailability alone must not block image generation/editing, pose/expression changes, compositing, rendering, simulation, or local QA.
12. **Fail-closed before required resolve.** If a mandatory rule, approval, evidence item, or binary has not yet been resolved, production must not invent or silently substitute it merely to bypass connector access.

## 3. Production Workflow Overview

The default KDS production flow is:

**1. Intake → 2. Research Routing → 3. Content Definition → 4. Format Routing → 5. Draft Production → 6. Asset/Visual Execution → 7. QA/Review → 8. Publication Approval → 9. Publication Readiness → 10. Publication Handoff / Logging**

A stage may loop backward for revision.

A stage must not be skipped merely because the same operator performs multiple roles.

## 4. Stage 1 — Intake / Communication Need

### Objective

Define what is being produced and why before writing or designing.

### Minimum intake

Each production request should establish, when applicable:

* communication objective;
* topic or message;
* intended audience for this artefact;
* requested or proposed format;
* requested or proposed channel;
* timing/deadline if relevant;
* known source material;
* supplied assets;
* whether the artefact contains factual or externally verifiable claims;
* whether the artefact includes personal, confidential, or sensitive information.

The per-content intended audience and per-content channel choice are operational inputs and do **not** establish a canonical project-wide audience or canonical project channel.

### Exit

Proceed when the communication need is sufficiently defined to determine whether research or other authority routing is required.

## 5. Stage 2 — Research / Source Routing

### Trigger

This stage is required when the artefact includes externally verifiable factual, health, legal, policy, statistical, scientific, service, or other evidence-dependent claims.

### Authority boundary

**KDS Research Source List (CANONICAL)** owns:

* source taxonomy;
* source-quality rules;
* supported-claim mapping;
* evidence limitations;
* claim validation requirements.

This SOP owns only the routing requirement.

### Pre-authority rule (retired 2026-09-25)

This subsection previously imposed a temporary fail-closed boundary for the period before the KDS Research Source List existed: research could be gathered and evidence-dependent copy drafted, but could not pass Publication Readiness.

The KDS Research Source List has been CANONICAL since 2026-09-23. The transitional condition no longer applies; evidence-dependent claims now route through the Authority boundary above and the standard Research/Source Routing process. No separate pre-authority carve-out remains active.

### Re-entry rule

Research routing is continuous, not a one-time preflight. If drafting, revision, captioning, visual text, or later review introduces a new externally verifiable claim or materially changes an existing claim, the artefact must return to this stage before it can proceed to Publication Readiness.

### Exit

Proceed when either:

* no external claim requires research routing; or
* the required claim grounding has been completed under the applicable research authority.

## 6. Stage 3 — Content Definition

Define the content before detailed visual execution.

The content definition should establish, as applicable:

* core message;
* communication intent;
* primary takeaway;
* supporting points;
* desired audience action or response;
* tone appropriate to the specific artefact;
* evidence constraints;
* privacy/confidentiality constraints;
* known mandatory organizational information.

This stage must not invent a project-wide editorial positioning that has not been defined by Project Architecture or another future authority.

### Exit

The content concept is coherent enough to draft in the selected or proposed format.

## 7. Stage 4 — Format Routing

Choose the format based on the communication need.

Project Architecture currently does **not** declare a canonical active-format set.

Therefore:

* Poster, Carousel, Reel, Story, document, or another artefact type may be selected operationally when appropriate;
* use of a format does not by itself create a governed KDS format subsystem;
* no format-specific rule becomes canonical merely through repeated manual use;
* when a canonical format-specific specification later exists, production of that format must route to it.

### Format-specification trigger

A dedicated format authority should only be proposed when repeated production demonstrates that reusable format rules are needed to reduce ambiguity or rework.

### Exit

A format is selected and any applicable governed format authority is identified.

## 8. Stage 5 — Draft Production

Create the initial content/copy/story structure appropriate to the selected format.

Draft production may include:

* copy;
* headline;
* body text;
* sequence;
* script;
* caption draft;
* CTA draft;
* visual concept;
* supporting content notes.

This SOP does not prescribe slide counts, frame counts, canvas dimensions, typography metrics, or format mechanics.

If a format-specific authority exists, the draft must conform to it.

### Exit

A complete draft exists for visual/production execution and review.

## 9. Stage 6 — Asset / Visual Execution

### Reusable assets

The **KDS Asset Registry (CANONICAL)** owns reusable asset identity, lifecycle, provenance, canonical-source records, and object-state authority.

Asset routing distinguishes two cases:

* **Reusable KDS asset** — an asset intended to function repeatedly as project identity, brand, character, ornament, template input, or other reusable production authority. It must be resolved through the KDS Asset Registry once such authority is required.
* **Content-local asset** — an image, photo, illustration, or other input used for one specific content instance and not asserted as canonical/reusable KDS identity. It does not require Asset Registry registration solely because it appears in a publication, but its use must still satisfy applicable rights/consent, privacy, factual-integrity, format, and QA requirements.

Because the KDS Asset Registry is CANONICAL:

* reusable KDS identity must resolve through the registry;
* registry canonicalization does not itself make a registered object ACTIVE;
* when production requires ACTIVE reusable authority, a CANDIDATE object is insufficient until an explicit object-level ACTIVE promotion is recorded;
* content-local inputs may still be used through the production flow when their use is otherwise authorized and they are not asserted as reusable/canonical KDS identity;
* any artefact that requires an ACTIVE reusable KDS asset that cannot be resolved to an ACTIVE object must be **BLOCKED** at the relevant gate.

### Format execution

Visual execution follows the selected format and every applicable format- or series-specific authority.

### Connector-aware visual execution

Stage 6 follows the inherited [BUS-118](../../system/DIUA-DIC-000042_Content-OS-Production-Connector-Lifecycle-Profile.md) lifecycle:

1. **Authority Resolve — Linear:** read only the current KDS/series/format rules required for the artefact and capture the authority snapshot used for the production run.
2. **Binary Resolve — Google Drive:** fetch/materialize only the required ACTIVE/approved KDS binaries or approved visual evidence.
3. **Local Production Runtime:** once required inputs are available locally, stop connector calls while generating/editing visuals, changing pose or expression, compositing, rendering, simulating, and running local visual QA.
4. **Reconnect on Trigger:** reconnect Linear only for rule conflict/staleness or an authorized governed write; reconnect Google Drive only for a newly required binary/reference or approved final binary commit.
5. **Final Commit:** after approval, reconnect only the connector required for storage/logging, verify the commit/read-back, then stop connector calls again.

A connector outage **after successful resolve** is not itself a Stage 6 blocker. A required authority/binary that was never resolved remains a blocker under the existing fail-closed rules.

For **KDS Psychology Series**, production must resolve the current canonical Psychology Series authority set:

* Production Bible — series production/editorial rules;
* Layout Bible — layout and visual-storytelling implementation rules;
* Reference Sheet — approved visual evidence/reference only;
* Asset Registry — reusable presenter/asset identity and provenance.

The Reference Sheet is not an independent rule source; it is consumed as evidence under the normative Production Bible/Layout Bible boundary.

This SOP must not define or silently accumulate layout geometry, typography metrics, safe areas, motion rules, or reusable templates.

### Exit

A reviewable production artefact exists.

## 10. Stage 7 — QA / Review Routing

**KDS QA Document (CANONICAL)** owns project-level acceptance and rejection criteria.

This SOP owns the requirement that applicable QA occur before Publication Approval and Publication Readiness.

### Active QA gate

Every publication-intended artefact must be evaluated under the QA Document.

* **QA PASS** permits progression to Publication Approval.
* **QA FAIL** returns the artefact to the applicable revision route.
* A missing mandatory authority or evidence object is recorded by QA as FAIL / DEPENDENCY and the Production SOP disposition becomes **BLOCKED** until resolved.
* A non-applicable authority does not block unrelated production merely because that authority or subsystem is absent.

Format-specific QA may supplement project QA when a canonical format authority exists, but cannot replace project-level QA.

### Exit

Proceed to Publication Approval only after applicable project-level QA has PASSed.

## 11. Stage 8 — Publication Approval

A content-level **Publication Approver** must authorize the artefact before external publication.

**Publication Approver** is an operational content-approval role and is distinct from the governance **Owner** of this SOP or another Content OS document.

This SOP does not assign a permanent person or organizational role to Publication Approver. For each publication path, the authorized approver must be identifiable under the applicable KDS operating authority before approval is relied upon.

The Publication Approver may:

* approve;
* request revision;
* reject;
* defer publication.

This SOP does not require a mandatory approval gate at every earlier production stage. Additional approval gates may be introduced only when a downstream authority or demonstrated production risk justifies them.

Approval of the artefact does not automatically mean publication has occurred.

If no authorized Publication Approver can be identified for an artefact, the artefact is **BLOCKED** from Publication Readiness.

## 12. Stage 9 — Publication Readiness

An artefact may be classified as **Publication Ready** only when all applicable conditions are satisfied:

* communication objective is still intact;
* required source grounding has passed;
* required project-level QA has passed;
* required format-specific rules have passed;
* required reusable assets are resolved through applicable authority;
* privacy/confidentiality issues are cleared;
* Publication Approver authorization has been recorded;
* no blocking dependency remains.

If a required authority has not yet been authored, readiness fails closed.

## 13. Stage 10 — Publication Handoff / Logging

Publication is a separate operational act.

This SOP does not define a canonical channel, cadence, posting time, or automation executor.

When publication occurs, the publication action should retain enough traceability to identify:

* the final artefact;
* publication channel;
* publication date/time;
* publication status;
* relevant content identity if a future Content Register exists.

A Content Register is not introduced by this SOP.

## 14. Workflow Dispositions

The SOP uses the following operational dispositions:

* **IN DEVELOPMENT** — work is progressing within the production flow.
* **REVISION REQUIRED** — a previous stage must be revisited.
* **BLOCKED** — a mandatory authority, dependency, evidence item, asset identity, or approval is missing or failed.
* **PUBLICATION READY** — all applicable gates have passed.
* **PUBLISHED** — external publication has occurred and, where applicable, has been logged.

These are workflow dispositions, not a substitute for a future Content Register lifecycle.

## 15. Mandatory Stop Conditions

Production must stop rather than infer a solution when:

* evidence-dependent claims cannot be validated under applicable authority;
* required QA cannot be completed;
* confidential or personal information is not cleared for publication;
* a required canonical reusable asset cannot be resolved;
* a governed format rule conflicts with the current artefact;
* required Publication Approver authorization is absent;
* an applicable downstream authority required for that artefact does not yet exist.

The following is **not** a stop condition by itself:

* temporary unavailability of Linear or Google Drive **after** all required authority and binary inputs for the active production run have already been successfully resolved/materialized.

In that case, production continues locally under [BUS-118](../../system/DIUA-DIC-000042_Content-OS-Production-Connector-Lifecycle-Profile.md) until a defined reconnect/final-commit trigger occurs.

The correct output in these cases is **BLOCKED**, with the blocking reason stated.

## 16. Current Dependency State

As of 2026-09-26 (originally recorded at canonicalization v1.0; see §21–§29 Change Records for version history):

* **Project Architecture:** v1.9 CANONICAL — available.
* **Research Source List:** v1.6 CANONICAL — available.
* **QA Document:** **current CANONICAL** — active project-level publication gate; treated as a downstream/lateral authority rather than a formal version-pinned upstream dependency.
* **Asset Registry:** **current CANONICAL** — reusable-asset identity/provenance authority is available; `KDS-OBJ-000001`–`KDS-OBJ-000010` are ACTIVE and production-authorized within their recorded scopes. This is a lateral authority pointer and is intentionally unversioned.
* **Format-specific specifications:** **KDS Reflection Carousel Format Specification — current CANONICAL**; applies whenever Reflection Carousel is selected.
* **Series-specific production authorities:** Psychology Series Production Bible — current CANONICAL; Psychology Series Layout Bible — **v1.1 CANONICAL**; Psychology Series Reference Sheet — **v1.1 CANONICAL, evidence-only**. All apply within their respective scopes whenever the content instance belongs to the KDS Psychology Series. Evidence-readiness remains fail-closed when triggered.
* **Content Register:** deferred.
* **Publication automation/executor:** deferred.

Therefore, the project-level QA gate is active. Publication Readiness remains unavailable wherever an applicable mandatory authority, evidence item, reusable canonical asset, or required approval is unresolved. The absence of an optional or non-applicable subsystem does not block unrelated production.

## 17. Open Decisions

This SOP intentionally does not decide:

* canonical project audience;
* active publication channels;
* active production formats;
* cadence or posting time;
* universal caption structure;
* universal hashtag policy;
* universal CTA rules;
* content-instance identifier scheme;
* publication automation;
* format-specific production aliases.

These require separate evidence or authority.

## 18. Lifecycle Status

**Current document state:** CANONICAL v1.14 (originally approved as v1.0 on 2026-09-23; see Change Records in §21–§33 for subsequent amendments).

Canonicalization followed the governance model inherited from KDS Project Architecture §0.

The v0.2 audit remediation resolved the governance/content-role collision, research re-entry ambiguity, Asset Registry overreach, fail-closed applicability ambiguity, and per-content channel inference.

**Canonicalization record — 2026-09-23:** final critical review found no blocking conflict. Identifier and allocation evidence were verified, Project Architecture dependency metadata was synchronized to Universal Identifier Registration Record v1.28, and the active workflow terminology was confirmed consistent.

The absence or unavailability of an applicable downstream authority does not invalidate this SOP; where an authority is required, the workflow remains **BLOCKED** at the relevant gate. The current Research Source List, QA Document, and Asset Registry are CANONICAL. Publication Readiness still requires all applicable gates to pass, including ACTIVE reusable-asset authority when the artefact asserts or requires an ACTIVE KDS reusable asset.

---

**Operating rule:** route work through the smallest valid workflow; never compensate for missing authority by inventing hidden rules.

## 19. Audit Record — 2026-09-23

**Audit disposition:** CONDITIONAL PASS — v0.2 is remediated and ready for final critical review; it remains DRAFT.

### Remediated findings

* **A1 — governance/content-role collision:** Stage 8 used `Owner Approval`, which conflated Content OS document ownership with content publication approval. Replaced with the distinct operational role **Publication Approver**.
* **A2 — research one-pass ambiguity:** added a re-entry rule so any new or materially changed claim introduced after initial research routing must return to Research/Source Routing.
* **A3 — asset overreach:** clarified that Asset Registry authority applies to reusable/canonical KDS assets, while content-local assets may proceed without registry registration when other rights, privacy, format, and QA requirements are satisfied.
* **A4 — overbroad fail-closed wording:** clarified that missing downstream authority blocks only when applicable to the specific artefact. Project-level QA remains mandatory for all publication paths.
* **A5 — per-content channel semantics:** clarified that operational channel selection for one artefact does not create a canonical KDS project channel.

### Conformance result

* Project Architecture authority boundaries: **PASS**.
* Research/QA/Asset ownership separation: **PASS after remediation**.
* Format non-canonicalization boundary: **PASS**.
* Identifier `DIUA-DIC-000033`: **valid / active**.
* No new subsystem introduced by this audit.

### Remaining gate

Final critical review and explicit approval are still required before promotion to CANONICAL.

## 20. Final Critical Review & Approval — 2026-09-23

**Disposition:** PASS

### Review scope

The final review verified:

* conformance with KDS Project Architecture v1.0;
* separation of workflow authority from Research, QA, Asset, and format authority;
* distinction between governance Owner and content Publication Approver;
* continuous claim-validation re-entry;
* reusable versus content-local asset routing;
* fail-closed applicability semantics;
* publication/readiness separation;
* identifier validity and allocation evidence;
* dependency freshness;
* absence of silent channel, cadence, format, or automation canonicalization.

### Final findings

* No blocking workflow or authority conflict remains.
* DIUA-DIC-000033 is valid and active.
* Allocation evidence CONTENT-OS-ALLOC-033 is present.
* KDS Project Architecture v1.0 remains the governing project authority.
* Universal Identifier Registration Record is current at v1.28 at review time.
* Missing downstream documents are handled through explicit fail-closed routing rather than inferred substitutes.
* No additional KDS subsystem was introduced by this review.

### Approval

**Owner decision:** APPROVED.

**Canonical state:** **KDS Satu Hati Sulawesi Utara — Production SOP v1.0 CANONICAL**

**Effective date:** 2026-09-23

Future workflow changes must follow the KDS governance model and preserve downstream authority boundaries.

---

## 21. Change Record — v1.1 — 2026-09-25

**Change type:** Editorial / corrective. No change to workflow stages, stage ownership, or authority boundaries.

**Changes:**

* §18, §20 — corrected two mislabeled dependency-version references: "Universal Identifier Registry v1.28" was factually the Universal Identifier **Registration Record** at v1.28. The Registry itself remained v1.34, consistent with this document's own header. Verified against Content OS — Universal Identifier Registry (v1.34, CANONICAL) and Content OS — Universal Identifier Registration Record (v1.28, CANONICAL).
* Header — Project Architecture dependency updated from v1.0 to v1.1 to track that document's own v1.1 amendment (2026-09-25).

**Basis:** documentation audit conducted 2026-09-24/25; corrections directed by Owner instruction ("perbaiki terkontrol", 2026-09-25).

**Version:** 1.0 → 1.1.

**Approval:** Owner-directed correction. No workflow or authority blocker identified.

---

## 22. Change Record — v1.2 — 2026-09-25

**Change type:** Editorial / corrective. No change to workflow stages, stage ownership, or authority boundaries.

**Changes:**

* §16 — corrected a stale Asset Registry version reference: "Asset Registry: v0.2 DRAFT" updated to "Asset Registry: v0.19 DRAFT", reflecting its current state. The underlying operational fact (DRAFT, no ACTIVE reusable object) was already correct and is unchanged.
* Header — QA Document dependency synced from v1.0 to v1.1 following its own editorial amendment (2026-09-25).

**Basis:** documentation audit conducted 2026-09-25; correction directed by Owner instruction ("perbaiki", 2026-09-25).

**Version:** 1.1 → 1.2.

**Approval:** Owner-directed correction. No workflow or authority blocker identified.

---

## 23. Change Record — v1.3 — 2026-09-25

**Change type:** Editorial / corrective. No change to workflow stages, stage ownership, or authority boundaries.

**Changes:**

* §10 — corrected a stale inline citation: "KDS QA Document v1.0 CANONICAL" updated to "KDS QA Document v1.2 CANONICAL".
* §16 — refreshed the Current Dependency State snapshot to current versions (Project Architecture v1.2, Research Source List v1.1, QA Document v1.2, Asset Registry v0.20) and reframed the heading from a frozen "at canonicalization" snapshot to a dated, maintained status line.
* §18 — updated the Lifecycle Status self-reference, which had stayed at "CANONICAL v1.0" through two prior amendments.
* Header — Project Architecture, Research Source List, and QA Document dependency versions synced.

**Basis:** documentation audit conducted 2026-09-25; correction directed by Owner instruction ("bereskan semua", 2026-09-25).

**Version:** 1.2 → 1.3.

**Approval:** Owner-directed correction. No workflow or authority blocker identified.

---

## 24. Change Record — v1.4 — 2026-09-25

**Change type:** Editorial / corrective, plus retirement of one transitional rule. No change to workflow stages, stage ownership, or authority boundaries.

**Changes:**

* §5 — removed stale "the future" framing for KDS Research Source List (now CANONICAL).
* §5 — retired the "Pre-authority rule" subsection: its trigger condition (Research Source List not yet canonical) ended 2026-09-23. Historical text preserved with a retirement note rather than deleted.
* §9 — removed stale "the future...will own" framing for KDS Asset Registry, which now exists (DRAFT); corrected "Until the KDS Asset Registry exists" to "Until the KDS Asset Registry is CANONICAL", since the registry already exists but is not yet canonical — the operational BLOCKED consequence is unchanged.
* §5, §9, §10 — switched inline ownership citations from a pinned version number (e.g. "v1.2 CANONICAL") to a version-agnostic "(CANONICAL)" form. Rationale: pinned inline citations went stale every time the cited document's own version changed — this has now happened twice (§10 alone was corrected in both v1.2 and v1.3). Exact version pinning remains appropriate only in the header "Depends On" field and in §16's dependency-state snapshot, both of which exist specifically to be kept current; casual ownership prose does not need to track exact minor versions.

**Basis:** documentation audit conducted 2026-09-25; correction directed by Owner instruction ("Ya bereskan juga ini", 2026-09-25).

**Version:** 1.3 → 1.4.

**Approval:** Owner-directed correction. No workflow or authority blocker identified.

---

## 25. Change Record — v1.5 — 2026-09-25

**Change type:** Editorial / corrective. No change to workflow stages, stage ownership, or authority boundaries.

**Changes:**

* §16 — refreshed the Current Dependency State snapshot, which had gone stale after the v1.4 round (Project Architecture and Research Source List versions were not updated when those documents changed): now shows Project Architecture v1.5, Research Source List v1.3, QA Document v1.3, Asset Registry v0.21. Also corrected the "see §21–§23" pointer to "§21–§25".
* Header — Project Architecture, Research Source List, and QA Document dependency versions synced.

**Process note:** this is the second time §16 has drifted after an unrelated amendment elsewhere in the document set. Treat §16 as a mandatory checklist item on every future KDS document version change, across all five documents, not just the one being directly edited.

**Basis:** documentation audit conducted 2026-09-25; correction directed by Owner instruction ("Bereskan semuanya", 2026-09-25).

**Version:** 1.4 → 1.5.

**Approval:** Owner-directed correction. No workflow or authority blocker identified.

---

## 26. Change Record — v1.6 — 2026-09-25

**Change type:** Editorial / dependency-state synchronization. No change to workflow stages or authority boundaries.

**Changes:**

* §9 — KDS Asset Registry updated to **CANONICAL** and routing clarified: registry authority and object ACTIVE authority are separate.
* §16 — dependency snapshot updated to Project Architecture v1.6, QA Document v1.4, and Asset Registry v1.0 CANONICAL.
* Header — dependency metadata refreshed to Project Architecture v1.6, QA Document v1.4, and Universal Identifier Registry v1.35.
* §18 — lifecycle self-reference updated to v1.6 and stale pre-QA-canonical wording removed.

**Operational effect:** reusable identity can now be resolved through the canonical registry, but production that requires ACTIVE authority remains blocked until the referenced object is explicitly ACTIVE.

**Approval:** Owner-directed canonicalization transaction.

---

## 27. Change Record — v1.7 — 2026-09-26

**Change type:** Editorial / dependency-state synchronization. No change to workflow stages or authority boundaries.

**Changes:**

* §16 — Asset Registry snapshot advanced to v1.3 CANONICAL and records `KDS-OBJ-000001`–`KDS-OBJ-000010` as ACTIVE.
* Header — QA dependency synchronized to v1.5.
* §18 — lifecycle self-reference updated to v1.7.

**Operational effect:** production may resolve the ten ACTIVE reusable objects through the Asset Registry. The existing fail-closed rule remains applicable to future absent, unresolved, non-conformant, or non-ACTIVE assets.

**Approval basis:** Owner-directed post-activation synchronization.

---

## 28. Change Record — v1.8 — 2026-09-26

**Change type:** Dependency-model / lateral-pointer stability reconciliation. No workflow-behavior change.

### Decision

The QA Document is a downstream project gate consumed by this Workflow, not a formal upstream normative dependency of the Workflow itself.

The KDS Asset Registry is a lateral reusable-asset authority referenced by Stage 6, not a formal upstream normative dependency of the Workflow.

Therefore:

* QA was removed from the version-pinned `Depends On` field;
* QA current-state reference now resolves to **current CANONICAL**;
* Asset Registry current-state reference now resolves to **current CANONICAL** without a revision number;
* Project Architecture, Research Source List, Root Documentation Structure, and other genuine upstream dependencies remain version-pinned.

### Rationale

Version-pinning lateral/downstream authorities caused circular maintenance: a QA or Asset Registry synchronization forced a Workflow revision, which in turn forced another downstream revision.

The unversioned current-canonical pointer preserves authority resolution while preventing recursive dependency drift.

**Regression boundary:** no Stage, gate, Publication Approval rule, fail-closed behavior, reusable-asset rule, or publication-readiness criterion changed.

---

## 29. Change Record — v1.9 — 2026-09-26

**Change type:** Format-authority activation synchronization. No change to cross-format workflow ownership.

**Changes:**

* §16 — KDS Reflection Carousel Format Specification recorded as **current CANONICAL**, making it the applicable governed format authority whenever Reflection Carousel is selected at Stage 4.
* Header — Universal Identifier Registry dependency refreshed to v1.37 after lifecycle synchronization for `DIUA-DIC-000037`.
* §18 — lifecycle self-reference updated to v1.9.

**Operational effect:** Reflection Carousel production must now route through the canonical format specification at Stages 4–7 and satisfy its mandatory format criteria before Publication Readiness.

**No effect:** other formats remain operationally selectable without becoming governed subsystems unless their own canonical format authority is created.

---

## 30. Change Record — v1.10 — 2026-09-26

**Change type:** Upstream dependency synchronization after cycle remediation.

* Project Architecture: v1.6 → v1.7.
* Research Source List: v1.3 → v1.4.
* Universal Identifier Registry: v1.37 → v1.38.

The Research Source List no longer version-pins this SOP, so the previous Research ↔ SOP cycle is closed.

No workflow stage, gate, Publication Approval rule, or Publication Readiness rule changed.

---

## 31. Change Record — v1.11 — 2026-09-26

**Change type:** Psychology Series authority activation and upstream dependency synchronization.

* Project Architecture: v1.7 → v1.8.
* Research Source List: v1.4 → v1.5.
* Universal Identifier Registry: v1.38 → v1.39.
* §16 records KDS Psychology Series Production Bible as **current CANONICAL** series-specific authority.

Operational effect: when a content instance belongs to Psychology Series, production must route through that Production Bible in addition to any applicable format authority. Evidence and reusable-cast blockers remain fail-closed. No cross-format workflow stage changed.

---

## 32. Change Record — v1.12 — 2026-09-26

**Change type:** Psychology Series implementation-route synchronization.

Changes:

* Project Architecture: v1.8 → **v1.9 CANONICAL**;
* Research Source List: v1.5 → **v1.6 CANONICAL**;
* Universal Identifier Registry: v1.39 → **v1.43 CANONICAL**;
* Stage 6 now explicitly routes Psychology Series visual execution through its canonical Production Bible, Layout Bible, Reference Sheet, and Asset Registry within their respective scopes;
* §16 records Layout Bible v1.0 and Reference Sheet v1.0 as active applicable authorities.

No workflow stage, Publication Approval rule, Publication Readiness rule, research gate, or QA ownership changed.

**Version:** 1.11 → 1.12.

---

## 33. Change Record — v1.13 — 2026-09-26

**Change type:** recursive sub-project routing synchronization.

* Project Architecture: v1.9 → **v1.10 CANONICAL**.
* Research Source List: v1.6 → **v1.7 CANONICAL**.
* Psychology Series Layout Bible: v1.0 → **v1.1 CANONICAL**.
* Psychology Series Reference Sheet: v1.0 → **v1.1 CANONICAL / evidence-only**.
* Psychology Series remains subject to this parent KDS SOP; the new Linear sub-project container does not create a separate workflow authority.

No workflow stage, gate, approval rule, or Publication Readiness semantic changed.

**Version:** 1.12 → 1.13.

---

## 34. Change Record — v1.14 — 2026-09-27

**Change type:** System-inheritance / production-runtime clarification.

**Owner decision:** establish the KDS-specific production workflow while inheriting reusable System-level workflow behavior wherever appropriate.

### Decision

* [BUS-99](https://linear.app/bussiness-content-os/issue/BUS-99/kds-satu-hati-sulawesi-utara-production-sop) remains the **single KDS cross-format Production Workflow authority**; no duplicate KDS Workflow document is created.
* The canonical operational short name is **KDS Production Workflow**.
* [BUS-118](../../system/DIUA-DIC-000042_Content-OS-Production-Connector-Lifecycle-Profile.md) is inherited for connector lifecycle.
* [BUS-109](../../system/DIUA-DIC-000041_Content-OS-Storage-Authority-Profile.md) is inherited for storage authority.
* CWC Production Workflow and SDOH Production SOP remain structural/reference examples only; their project-specific stages, states, asset semantics, format rules, and production behaviors are **not inherited** into KDS.

### Runtime effect

KDS production now explicitly follows:

**KDS stages → resolve required authority/binaries → stop connector calls → local production → reconnect on defined trigger → final commit → stop connector calls.**

After required inputs are resolved, image generation/editing, pose/expression changes, compositing, rendering, simulation, and local visual QA must not be blocked merely because Linear or Google Drive is not continuously active.

No Stage 1–10 sequence, Research ownership, QA ownership, Asset Registry ownership, Publication Approval rule, or Publication Readiness rule changed.

**Version:** 1.13 → 1.14 CANONICAL.
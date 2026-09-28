---
document_name: "Content OS — Root Governance"
document_class: "Root-Level Governance Document"
structural_classification: "Tiered — Document Tier: Root Level (Tier 0)"
system: "Content OS"
owner: "[OPERATIONAL DEFAULT] (Root Documentation Structure §5.1) Not yet formally assigned. Defaults to the document's creator (Billy Fernando Mende), per this document's own §4 default rule, self-applied."
related_issue: "BUS-11"
universal_identifier: "DIUA-DIC-000002"
version: "1.11"
status: "CANONICAL"
depends_on:
  - id: "DIUA-DIC-000001"
    name: "Content OS — Root Level Architecture"
    version: "1.11"
    status: "CANONICAL"
source_representation:
  platform: "Linear"
  locator: "https://linear.app/bussiness-content-os/document/content-os-root-governance-v111-canonical-f30f4dd6990a"
representation_profile: "DIUA-DIC-000026@1.2"
---
# Content OS — Root Governance

## Document Identity

| Field | Value |
| -- | -- |
| Document Name | Content OS — Root Governance |
| Document Class | Root-Level Governance Document |
| Version | 1.11 |
| Status | **CANONICAL** — amended to v1.11: added conformance-verification requirements to §6 step 3 (Review) — Review must now check declared relationships carrying an obligation under Root Level Architecture §8.6, and apply a minimum integrity floor (no broken references, no duplicate/ambiguous ownership, no invalid/unregistered identifiers, no unsupported authority claims) to every document regardless of declared relationships. Architectural change (R6/R7 — this changes the document's own change-control mechanism). Reason: audit of [BUS-19](https://linear.app/bussiness-content-os/issue/BUS-19/cwc-asset-system-cas) (CAS) found Review had nothing to check declared relationships against. Full Propose/Classify/Review/Approve record: [BUS-29](https://linear.app/bussiness-content-os/issue/BUS-29/cross-document-conformance-obligation-governance-review-finding-from). Also synced `Depends On` (Root Level Architecture v1.10→v1.11, amended in the same governance cycle — adds §8.6). Prior state: v1.10, CANONICAL — synced `Depends On` (Root Level Architecture v1.9→v1.10), stale due to that document being amended in this audit session (Issue #16 follow-on, system-wide stale-Depends-On sweep). Compliance update, no substantive content changed. Prior state: v1.9, CANONICAL re-tagged `Owner` field (Document Identity and §4 Ownership Model table, all three rows) from `[ASSUMPTION]` to `[OPERATIONAL DEFAULT]` per Root Documentation Structure §5.1, introduced via governance audit (Issue #16) P1 remediation. Compliance update, no substantive content changed — no re-assignment of ownership. Prior state: v1.8, CANONICAL added `Owner` field to Document Identity (baseline change per Document Metadata Header audit) — now standard across all Content OS documents. Previously amended to v1.7: corrected `Universal Identifier (UNIS/DIC)` to `DIUA-DIC-000002` — Content OS's own registry ([BUS-16](https://linear.app/bussiness-content-os/issue/BUS-16/universal-identifier-registry)) starts fresh; the earlier `000010` reflected a misreading of reference-only UNIR example material as live external state. Compliance update. Previously amended to v1.6: added the field as PROPOSED. Prior to that, v1.5 via Change Control (§6, self-applied per G5): updated §2.1/§7/§8 to remove Tier 3 references, following Root Level Architecture v1.6's removal of Tier 3. |
| Related Issue | [BUS-11](https://linear.app/bussiness-content-os/issue/BUS-11/root-governance) — Root Governance |
| Owner | **\[OPERATIONAL DEFAULT\]** (Root Documentation Structure §5.1) Not yet formally assigned. Defaults to the document's creator (Billy Fernando Mende), per this document's own §4 default rule, self-applied. |
| Structural Classification | Tiered — Document Tier: Root Level (Tier 0) |
| Universal Identifier (UNIS/DIC) | `DIUA-DIC-000002` — ALLOCATED, per Content OS's own registry ([BUS-16](https://linear.app/bussiness-content-os/issue/BUS-16/universal-identifier-registry) §4) |
| Depends On | Content OS — Root Level Architecture (v1.11, CANONICAL — [BUS-10](DIUA-DIC-000001_Content-OS-Root-Level-Architecture.md) §8.6, §3 Principle 8). This document references, and does not restate, the tier model, document-class criteria, and relationship model defined there. |

---

## 1. Purpose

This document defines who owns each root-level document, how changes to root-level documents are classified, approved, and recorded, and how a need for root-level change is escalated from lower tiers.

It does not define, and must not be read as redefining, any structural element of Content OS. Tiers, document classes, and boundaries remain exclusively owned by Root Level Architecture ([BUS-10](DIUA-DIC-000001_Content-OS-Root-Level-Architecture.md)). Where this document needs a structural term, it references [BUS-10](DIUA-DIC-000001_Content-OS-Root-Level-Architecture.md) rather than restating it, per the reference-not-inheritance relationship model established there (Root Level Architecture §8).

---

## 2. Scope

### 2.1 In Scope

* Ownership assignment model for root-level document classes.
* Classification of changes as architectural vs. editorial, applying R6/R7 from Root Level Architecture.
* Approval process for architectural changes to root-level documents.
* Versioning discipline for root-level documents.
* Escalation path from Tier 1/Tier 2 documentation to root level.

### 2.2 Out of Scope

* **Structural definitions** — tiers, document classes, boundaries. Owned by Root Level Architecture ([BUS-10](DIUA-DIC-000001_Content-OS-Root-Level-Architecture.md)).
* **Naming, storage, and taxonomy conventions** — owned by Root Documentation Structure ([BUS-12](https://linear.app/bussiness-content-os/issue/BUS-12/root-documentation-structure), not yet authored).
* **Specific tooling** used to execute this governance process (issue trackers, document platforms, or any other implementation). This document describes the process, not its tooling — consistent with Root Level Architecture R3.
* **Operational workflow** of content production itself.
* **Tier 1/Tier 2 internal ownership** — each domain may define its own internal ownership model; this document governs only the root tier and the upward escalation boundary (§7).
* **Organizational structure, reporting lines, or performance management.**

---

## 3. Governance Principles

**\[CONSTRAINT\]** This document complies with all constraints in Root Level Architecture §3 — in particular implementation-independence (no naming a specific tool, agent, or platform) and no speculative abstraction. These are not restated here; they apply by reference.

Additional governance-specific principles:

1. **\[CONSTRAINT\] Single owner per document.** See G1 (§9) for the normative statement.
2. **\[CONSTRAINT\] Approval is required only for architectural change.** See G2 (§9) for the normative statement.
3. **\[CONSTRAINT\] Escalation is not approval.** Raising a need for change (§7) and approving that change (§6) are distinct steps performed at different points in the process.
4. **\[CONSTRAINT\] No mechanism introduced here may reopen what Root Level Architecture already excludes.** This document may not introduce agent-specific, Hermes-specific, or tool-specific enforcement.

---

## 4. Ownership Model

**\[DEFINITION\]** Every root-level document (as classified under Root Level Architecture §5) has exactly one **Owner** — the person or role accountable for classifying and approving architectural changes to that document, and for delegating editorial changes.

**\[DECISION\]** Ownership is assigned per document, not per tier. Root Architecture, Root Governance, and Root Documentation Structure may have different Owners.

| Document | Owner |
| -- | -- |
| Root Architecture ([BUS-10](DIUA-DIC-000001_Content-OS-Root-Level-Architecture.md)) | **\[OPERATIONAL DEFAULT\]** Not yet formally assigned. Defaults to the document's creator until reassigned. |
| Root Governance ([BUS-11](https://linear.app/bussiness-content-os/issue/BUS-11/root-governance), this document) | **\[OPERATIONAL DEFAULT\]** Not yet formally assigned. Defaults to the document's creator until reassigned. |
| Root Documentation Structure ([BUS-12](https://linear.app/bussiness-content-os/issue/BUS-12/root-documentation-structure)) | **\[OPERATIONAL DEFAULT\]** Not yet formally assigned. Defaults to the document's creator until reassigned. |

Formal, named ownership assignment beyond this creator-default is not resolved by this document (see §10, Open Question 1) — this document defines the *model* for ownership, not the specific assignment, which is an organizational decision outside this document's authority to presume.

### 4.1 Document Status Values

**\[DEFINITION\]** A root-level document's Status field holds one of two values:

* **Draft** — the default state. A document in Draft may be edited by its Owner without the full process in §6.
* **CANONICAL** — a document may only be marked CANONICAL once it has completed the §6 change-control process at least once (i.e., it has been Proposed, Classified, Reviewed, Approved, and Recorded by its Owner) **and** has undergone a documented critical review pass prior to the Approve step in §6 (the review may be performed by the Owner). A document that has not been through both cannot be marked CANONICAL, regardless of how complete it appears.

**\[CONSTRAINT\]** Marking a document CANONICAL is itself an architectural change to that document's Status field and is therefore subject to §6, not to editorial shortcut.

---

## 5. Change Classification

**\[DEFINITION\]** This document adopts, by reference, the classification already defined in Root Level Architecture R6/R7:

* **Architectural change** — affects a tier, document class, boundary, or structural relationship (as defined in the document being changed). Subject to the approval process in §6.
* **Editorial / documentation maintenance** — wording, typo correction, formatting, or non-structural clarification. Not subject to §6; the Owner may apply it directly.

**\[CONSTRAINT\]** Classification is made by the Owner of the document being changed — not by the person proposing the change.

---

## 6. Change Control Process

**\[DECISION\]** An architectural change to any root-level document follows these steps:

1. **Propose** — the change is described against the current version of the document, referencing the specific section affected.
2. **Classify** — the Owner classifies the proposal as architectural or editorial (§5).
3. **Review** — for architectural changes, the Owner evaluates the proposal against the constraints of the document being changed (e.g., no speculative abstraction, no implementation reference) and against this governance model. Review must additionally verify: (i) conformance against every relationship carrying an obligation under Root Level Architecture §8.6 — re-checked whenever the version cited in the dependent's own "Depends On" field is behind the depended-on document's current version, using the same reconciliation practice already applied for Depends-On synchronization. Verifying conformance means confirming and recording its actual status — full conformance, or partial conformance with the gap recorded as an explicit open item, consistent with Root Level Architecture §8.5's own allowance for an unreconciled-but-compatible External Governing Standard relationship — not a blanket requirement that full reconciliation be completed before Approval; and (ii) a minimum integrity floor applied to every document regardless of declared relationships: no broken references; no duplicate or ambiguous ownership claims (G1 below / System Governance SG1 — single ownership at all times); no invalid or unregistered identifiers (Universal Identifier Registry, [BUS-16](https://linear.app/bussiness-content-os/issue/BUS-16/universal-identifier-registry) §4 allocation record); and no unsupported authority claims (Root Level Architecture §8.5's adoption-act requirement). Findings (i) and (ii) are distinct: (i) is semantic conformance to a specific obligation; (ii) is mechanical integrity, and a document may fail one without the other.
4. **Approve or Reject** — the Owner decides. Approval rests with the Owner alone; this document does not define a voting or consensus mechanism (no demonstrated need for one at Content OS's current scale — see §10, Open Question 3).
5. **Record** — an approved change updates the document's Version and Status fields, and the nature of the change (what changed and why) is noted in the document itself or its immediate history.
6. **Version** — Version increments on every architectural change. This document does not mandate a specific numbering scheme (semantic vs. sequential); it only requires that increments monotonically distinguish one architectural state from the next (see §10, Open Question 2). Root Level Architecture's own v1.0→1.1→1.2 progression is a precedent, not a binding scheme.

**\[CONSTRAINT\]** Editorial changes skip steps 2–4. The Owner (or anyone acting under the Owner's standing instruction) may apply them directly, and they do not require a Version increment, per Root Level Architecture R7.

---

## 7. Escalation Path (Tier 1 / Tier 2 → Root)

**\[DEFINITION\]** When a Tier 1 (System) or Tier 2 (Domain/Project) document (per Root Level Architecture §7) identifies a need that appears to require a root-level structural change, the following applies:

1. The need is raised against the relevant root document (Architecture, Governance, or Documentation Structure) — it is not resolved locally within the lower-tier document. Root Level Architecture §9 already forbids Tier 1 and Tier 2 documents from encoding root-level decisions locally; this step operationalizes that constraint.
2. The Owner of the relevant root document classifies the raised need (§5).
3. If classified as architectural, the Owner runs the process in §6.
4. If classified as editorial, or determined not to require a root-level change at all, the Owner returns that determination to the originating document, and no root-level change occurs.

**\[CONSTRAINT\]** Escalation is a one-way signal upward. It does not grant the escalating document's author approval rights over the root document.

---

## 8. Exclusions

The following are explicitly **not** part of Root Governance. Their absence here is intentional.

* Structural definitions of any kind (tiers, document classes, boundaries) — Root Level Architecture ([BUS-10](DIUA-DIC-000001_Content-OS-Root-Level-Architecture.md)).
* Naming, storage, and taxonomy conventions — Root Documentation Structure ([BUS-12](https://linear.app/bussiness-content-os/issue/BUS-12/root-documentation-structure)).
* Specific tooling used to record or track changes — an implementation concern, not a governance concern.
* Tier 1/Tier 2 internal ownership models — each tier and domain may define its own; this document governs only the root tier and the upward escalation boundary.
* Performance management, team structure, or organizational reporting lines.
* Any agent-specific, Hermes-specific, or automation-specific enforcement mechanism.

---

## 9. Governance Rules

* **G1 — Single ownership at all times.** Every root-level document has exactly one Owner at all times. Co-ownership is not modeled — shared accountability produces undefined approval authority.
* **G2 — Approval gates architectural change only.** Architectural changes require Owner approval (§6); editorial changes do not, per Root Level Architecture R7.
* **G3 — No unrecorded architectural change.** No root-level document may have its Version incremented, or be marked CANONICAL (§4.1), for an architectural change without the record step (§6, step 5 — "Record") having occurred.
* **G4 — Classification precedes action.** Escalated needs (§7) are classified before any change is made; escalation is not self-executing.
* **G5 — This document governs itself.** Root Governance is itself a root-level document under Root Level Architecture R2 (singular concern) and is therefore subject to its own §5/§6 for any change to its own content.

---

## 10. Open Questions / Unresolved Decisions

1. **Named ownership assignment (§4)** — who is formally Owner of each root document, beyond the creator-default. Deliberately left open; assigning this is an organizational decision this document does not presume to make.
2. **Versioning scheme (§6, step 6)** — whether root documents use semantic versioning (MAJOR.MINOR), simple sequential versioning, or another scheme. Left open; either is compatible with this governance model.
3. **Single- vs. multi-approver requirement for Root Architecture specifically** — given its foundational role, should changes to Root Architecture require more than single-Owner approval (G2)? Left open — no demonstrated need for a multi-approver mechanism yet; introducing one now would be speculative abstraction.

---

*End of Document — Content OS Root Governance v1.11 (CANONICAL)*
---
document_name: "Content OS — System Governance"
document_class: "System-Level Governance Document"
structural_classification: "Tiered — Document Tier: System Level (Tier 1)"
system: "Content OS"
owner: "[OPERATIONAL DEFAULT] (Root Documentation Structure §5.1) Not yet formally assigned. Defaults to the document's creator (Billy Fernando Mende) until reassigned — per this document's own §4 Ownership Model table."
related_issue: "BUS-15"
universal_identifier: "DIUA-DIC-000006"
version: "1.17"
status: "CANONICAL"
depends_on:
  - id: "DIUA-DIC-000001"
    name: "Content OS — Root Level Architecture"
    version: "1.11"
    status: "CANONICAL"
  - id: "DIUA-DIC-000002"
    name: "Content OS — Root Governance"
    version: "1.11"
    status: "CANONICAL"
  - id: "DIUA-DIC-000003"
    name: "Content OS — Root Documentation Structure"
    version: "2.5"
    status: "CANONICAL"
  - id: "DIUA-DIC-000005"
    name: "Content OS — System Architecture"
    version: "1.16"
    status: "CANONICAL"
source_representation:
  platform: "Linear"
  locator: "https://linear.app/bussiness-content-os/document/content-os-system-governance-v117-canonical-f0ec3a754f73"
representation_profile: "DIUA-DIC-000026@1.2"
---
# Content OS — System Governance

## Document Identity

| Field | Value |
| -- | -- |
| Document Name | Content OS — System Governance |
| Document Class | System-Level Governance Document |
| Version | 1.17 |
| Status | **CANONICAL** — v1.17 synchronizes the `Depends On` pin to System Architecture v1.16 after the staged GitHub canonical-text migration model was incorporated. Ownership, approval, escalation, and SG8 mechanisms are unchanged. Previously v1.16, which synchronizes SG8 ownership registry after System Architecture v1.15 added Content OS — Production Connector Lifecycle Profile ([BUS-118](https://linear.app/bussiness-content-os/issue/BUS-118/content-os-production-connector-lifecycle-profile) / DIUA-DIC-000042) to the System-tier implementation-specification set. No approval or escalation mechanism changed. Previously v1.15. |
| Related Issue | [BUS-15](https://linear.app/bussiness-content-os/issue/BUS-15/system-governance) — System Governance |
| Owner | **\[OPERATIONAL DEFAULT\]** (Root Documentation Structure §5.1) Not yet formally assigned. Defaults to the document's creator (Billy Fernando Mende) until reassigned — per this document's own §4 Ownership Model table. |
| Structural Classification | Tiered — Document Tier: System Level (Tier 1) |
| Universal Identifier (UNIS/DIC) | `DIUA-DIC-000006` — ALLOCATED, per Content OS's own registry ([BUS-16](https://linear.app/bussiness-content-os/issue/BUS-16/universal-identifier-registry) §4) |
| Depends On | Content OS — Root Level Architecture (v1.11, CANONICAL — [BUS-10](../root/DIUA-DIC-000001_Content-OS-Root-Level-Architecture.md) §7, §9.1, §9.2), Root Governance (v1.11, CANONICAL — [BUS-11](../root/DIUA-DIC-000002_Content-OS-Root-Governance.md) §4–§7, adapted here for System scope, not restated), Root Documentation Structure (v2.5, CANONICAL — [BUS-12](../root/DIUA-DIC-000003_Content-OS-Root-Documentation-Structure.md)), and System Architecture (v1.16, CANONICAL — [BUS-14](DIUA-DIC-000005_Content-OS-System-Architecture.md) §1a, §4.2, §4.3a, §11 — this document supersedes §1a's historical provisional adoption). |

---

## 1. Purpose

This document defines who owns each System-level (Tier 1) document, how changes to System-level documents are classified, approved, and recorded, and how a system-wide need — one that does not require a Root-level structural change — is escalated from Domain/Project (Tier 2) documents up to System.

This document **supersedes** System Architecture's provisional adoption of Root Governance's model ([BUS-14](DIUA-DIC-000005_Content-OS-System-Architecture.md) §1a). It does not retroactively invalidate change-control steps already completed under that provisional model — [BUS-14](DIUA-DIC-000005_Content-OS-System-Architecture.md)'s v0.1→v1.1 history remains valid (§9, SG5).

It does not define, and must not be read as redefining, any structural element of Content OS (tiers, document classes, boundaries — those remain Root Level Architecture's, [BUS-10](../root/DIUA-DIC-000001_Content-OS-Root-Level-Architecture.md)), nor Root-level ownership or change control (Root Governance, [BUS-11](../root/DIUA-DIC-000002_Content-OS-Root-Governance.md)), which this document adapts for System scope but does not own or override.

---

## 2. Scope

### 2.1 In Scope

* Ownership assignment model for System-level document classes and demonstrated responsibility types (System Architecture, System Knowledge/Registries, System-Wide Implementation Specifications, System-Wide Capabilities, AI Collaboration Context — per [BUS-14](DIUA-DIC-000005_Content-OS-System-Architecture.md) §4).
* Classification of changes to System-level documents as architectural vs. editorial.
* Approval process for architectural changes to System-level documents.
* Versioning and status discipline for System-level documents.
* Escalation path from Domain/Project (Tier 2) documents to System, for needs that are system-wide but not root-structural.
* Confirming (by reference, not restatement) that System's own escalation to Root already follows Root Governance §7.

### 2.2 Out of Scope

* **Structural definitions** — tiers, document classes, boundaries. Owned by Root Level Architecture ([BUS-10](../root/DIUA-DIC-000001_Content-OS-Root-Level-Architecture.md)).
* **Root-level ownership and change control** — owned by Root Governance ([BUS-11](../root/DIUA-DIC-000002_Content-OS-Root-Governance.md)). This document adapts that model for System scope; it does not amend or reopen it.
* **Naming, storage, and taxonomy conventions** — owned by Root Documentation Structure ([BUS-12](../root/DIUA-DIC-000003_Content-OS-Root-Documentation-Structure.md)), which already applies to every tier including System.
* **Domain/Project (Tier 2) internal ownership** — each domain defines its own; this document governs only the System tier and the upward/downward escalation boundary immediately touching it (§7).
* **Specific tooling** used to execute this process — an implementation concern.
* **Organizational structure, reporting lines, or performance management.**

---

## 3. Governance Principles

**\[CONSTRAINT\]** This document complies with all constraints in Root Level Architecture §3, applied by reference, not restated.

**\[CONSTRAINT\]** This document adapts, rather than duplicates, Root Governance's principles and mechanisms ([BUS-11](../root/DIUA-DIC-000002_Content-OS-Root-Governance.md) §3) for System scope. Where this document's model is identical to Root Governance's, it says so explicitly rather than silently restating — per Root Level Architecture R5/R7 (duplication is a defect).

Additional System-governance-specific principles:

1. **\[CONSTRAINT\] Single owner per System-level document.** See SG1 (§9).
2. **\[CONSTRAINT\] Approval is required only for architectural change.** See SG2 (§9).
3. **\[CONSTRAINT\] System-wide, non-root-structural needs stop at System — they do not automatically escalate to Root.** A need that can be resolved by a System-level decision does not need Root's involvement (§7).
4. **\[CONSTRAINT\] This document may not reopen what Root Level Architecture or Root Governance already settled.** It governs System-tier documents only.

---

## 4. Ownership Model

**\[DEFINITION\]** Every System-level document (as classified under System Architecture §4) has exactly one **Owner** — the person or role accountable for classifying and approving architectural changes to that document, and for delegating editorial changes. This mirrors Root Governance §4's model, applied at System scope.

**\[DECISION\]** Ownership is assigned per document, not per tier. Different System-level documents may have different Owners.

| Document | Owner |
| -- | -- |
| System Architecture ([BUS-14](DIUA-DIC-000005_Content-OS-System-Architecture.md)) | **\[OPERATIONAL DEFAULT\]** Not yet formally assigned. Defaults to the document's creator until reassigned (consistent with Root Governance §4's default). |
| System Governance ([BUS-15](https://linear.app/bussiness-content-os/issue/BUS-15/system-governance), this document) | **\[OPERATIONAL DEFAULT\]** Not yet formally assigned. Defaults to the document's creator until reassigned. |
| Universal Identifier Registry ([BUS-16](https://linear.app/bussiness-content-os/issue/BUS-16/universal-identifier-registry)) | **\[OPERATIONAL DEFAULT\]** Not yet formally assigned. Defaults to the document's creator until reassigned. |
| Universal Identifier Registration Record ([BUS-17](https://linear.app/bussiness-content-os/issue/BUS-17/universal-identifier-registration-record)) | **\[OPERATIONAL DEFAULT\]** Not yet formally assigned. Defaults to the document's creator until reassigned. |
| Content OS Document ID Registry — Legacy DOC-\* Namespace ([BUS-23](https://linear.app/bussiness-content-os/issue/BUS-23/content-os-document-id-registry-legacy-doc-namespace)) | **\[OPERATIONAL DEFAULT\]** Not yet formally assigned. Defaults to the document's creator until reassigned. |
| Repository Representation Profile ([BUS-56](https://linear.app/bussiness-content-os/issue/BUS-56/repository-representation-profile-github-export-mapping)) | **\[FORMAL\]** Billy Fernando Mende — Content OS Owner, as declared by the profile's current Document Identity. |
| Storage Authority Profile ([BUS-109](https://linear.app/bussiness-content-os/issue/BUS-109/content-os-storage-authority-profile)) | **\[FORMAL\]** Billy Fernando Mende — Content OS Owner, as declared by the profile's Document Identity. |
| Production Connector Lifecycle Profile ([BUS-118](https://linear.app/bussiness-content-os/issue/BUS-118/content-os-production-connector-lifecycle-profile)) | **\[FORMAL\]** Billy Fernando Mende — Content OS Owner, as declared by the profile's current Document Identity. |

**\[DECISION\]** This table is a registry of System Architecture §11's current System-tier list, not an independently maintained enumeration — see SG8 (§9) for the synchronization obligation that keeps it current.

Formal, named ownership beyond the creator-default is not resolved here, for the same reason Root Governance leaves it open (§10, Open Question 1) — it is an organizational decision, not a structural one.

### 4.1 Document Status Values

**\[DECISION\]** System-level documents reuse the root-level Draft/CANONICAL vocabulary exactly (Root Governance §4.1), rather than defining a separate one. This resolves, for System tier specifically, Root Documentation Structure §11 Open Question 2 ("should Tier 1/2/3 documents reuse root vocabulary or define their own") — answered here as: **yes, for Tier 1.** Tier 2/3 remain free to decide independently.

* **Draft** — default state; the Owner may edit without the full §6 process.
* **CANONICAL** — requires at least one full §6 cycle plus a documented critical review pass, exactly as Root Governance §4.1 requires at Root.

---

## 5. Change Classification

**\[DEFINITION\]** This document adopts, by reference, Root Level Architecture's R6/R7 classification, applied to System-level documents:

* **Architectural change** — affects a System-level document class's criteria, a System-internal boundary, or a structural relationship among System-level documents (e.g., adding a new required field, redefining what qualifies as a System Knowledge/Registry). Subject to §6.
* **Editorial / documentation maintenance** — wording, typo correction, formatting, non-structural clarification. Not subject to §6; the Owner may apply it directly.

**\[CONSTRAINT\]** A change that would redefine a tier, a Root-level document class, or a Root-level boundary is never classified as a System-level change, regardless of where it is proposed — it is out of this document's authority to classify or approve (§2.2), and must be escalated to Root (§7).

---

## 6. Change Control Process

**\[DECISION\]** An architectural change to a System-level document follows the same steps as Root Governance §6, applied at System scope:

1. **Propose** — described against the current version, referencing the affected section.
2. **Classify** — the Owner classifies as architectural or editorial (§5).
3. **Review** — for architectural changes, the Owner evaluates against Root Level Architecture's constraints (§3) and this document's own constraints. Applied at System scope, Review carries the same conformance-verification requirements Root Governance §6 step 3 defines at Root: (i) conformance against every relationship carrying an obligation under Root Level Architecture §8.6 — re-checked whenever the version cited in the dependent's own "Depends On" field is behind the depended-on document's current version, using the same reconciliation practice already applied for Depends-On synchronization. Verifying conformance means confirming and recording its actual status — full conformance, or partial conformance with the gap recorded as an explicit open item, consistent with Root Level Architecture §8.5's own allowance for an unreconciled-but-compatible External Governing Standard relationship — not a blanket requirement that full reconciliation be completed before Approval; and (ii) a minimum integrity floor applied to every document regardless of declared relationships: no broken references; no duplicate or ambiguous ownership claims (SG1, §9 — single ownership at all times); no invalid or unregistered identifiers (Universal Identifier Registry, [BUS-16](https://linear.app/bussiness-content-os/issue/BUS-16/universal-identifier-registry) §4 allocation record); and no unsupported authority claims (Root Level Architecture §8.5's adoption-act requirement). Findings (i) and (ii) are distinct: (i) is semantic conformance to a specific obligation; (ii) is mechanical integrity, and a document may fail one without the other.
4. **Approve or Reject** — the Owner decides alone; no voting/consensus mechanism (no demonstrated need — see §10, Open Question 2).
5. **Record** — Version and Status are updated; the nature of the change is noted in the document itself.
6. **Version** — increments on every architectural change; no mandated numbering scheme, consistent with Root Governance §6 step 6.

**\[CONSTRAINT\]** Editorial changes skip steps 2–4 and do not require a Version increment, per Root Level Architecture R7.

---

## 7. Escalation

### 7.1 Domain/Project → System (new need, this document's core addition)

**\[DEFINITION\]** When a Tier 2 (Domain/Project) document — including its operational/workflow content, which is a Document Class concern within Tier 2, not a separate tier (Root Level Architecture §7 Clarification) — identifies a need that is **system-wide** (i.e., relevant to more than one Project) but does **not** require redefining a tier, Root-level document class, or Root-level boundary, that need is escalated to **System**, not Root.

1. The need is raised against the relevant System-level document (System Architecture, or the applicable System Knowledge/Registry, Capability, etc. — [BUS-14](DIUA-DIC-000005_Content-OS-System-Architecture.md) §4). It is not resolved locally within the originating Tier 2 document (Root Level Architecture §9.2 already forbids Tier 2 documents from encoding system-wide decisions locally).
2. The Owner of the relevant System-level document classifies the need (§5).
3. If the need actually touches a Root-level structural definition (tier, document class, boundary), the System Owner does **not** resolve it — it is further escalated to Root per Root Governance §7, not decided at System level.
4. If classified as a genuine System-level architectural need, the Owner runs §6.
5. If classified as editorial, or determined not to require any change, the Owner returns that determination to the originating document.

**\[CONSTRAINT\]** This escalation path exists because Root Governance §7 only routes Tier 1/2/3 needs that appear to require a **Root**-level change. A need that is system-wide but not root-structural had no defined destination before this document — it is not silently absorbed into the Root escalation path, and it is not left for individual Domain/Project documents to resolve on their own (which would violate Root Level Architecture §9.2's prohibition on Tier 2 documents encoding system-wide decisions locally).

### 7.2 System → Root

**\[DEFINITION\]** System-level documents that identify a genuine Root-level structural need escalate exactly as Root Governance §7 already defines for Tier 1 documents. This is not restated here — see [BUS-11](../root/DIUA-DIC-000002_Content-OS-Root-Governance.md) §7.

**\[CONSTRAINT\]** Escalation, in either direction, is a one-way signal. It does not grant the escalating document's author or Owner approval rights over the document being escalated to.

---

## 8. Exclusions

The following are explicitly **not** part of System Governance. Their absence is intentional.

* Structural definitions of any kind — Root Level Architecture ([BUS-10](../root/DIUA-DIC-000001_Content-OS-Root-Level-Architecture.md)).
* Root-level ownership, approval, and change control — Root Governance ([BUS-11](../root/DIUA-DIC-000002_Content-OS-Root-Governance.md)).
* Naming, storage, and taxonomy conventions — Root Documentation Structure ([BUS-12](../root/DIUA-DIC-000003_Content-OS-Root-Documentation-Structure.md)), which already covers System tier.
* Domain/Project (Tier 2) internal ownership models — each domain defines its own.
* Specific tooling used to record or track changes.
* Performance management, team structure, or organizational reporting lines.
* Any agent-specific, Hermes-specific, or automation-specific enforcement mechanism.

---

## 9. Governance Rules

* **SG1 — Single ownership at all times.** Every System-level document has exactly one Owner at all times.
* **SG2 — Approval gates architectural change only.** Editorial changes do not require Owner approval, per Root Level Architecture R7.
* **SG3 — No unrecorded architectural change.** No System-level document may have its Version incremented, or be marked CANONICAL, for an architectural change without the Record step (§6, step 5) having occurred. (This is the exact failure mode found and corrected in Root Documentation Structure — [BUS-12](../root/DIUA-DIC-000003_Content-OS-Root-Documentation-Structure.md) v1.3 Status.)
* **SG4 — Classification precedes action.** Escalated needs (§7) are classified before any change is made.
* **SG5 — This document supersedes, without invalidating, System Architecture §1a.** From this document's adoption forward, System-level documents follow §4–§6 here rather than the provisional model in [BUS-14](DIUA-DIC-000005_Content-OS-System-Architecture.md) §1a. Change-control steps already completed under §1a ([BUS-14](DIUA-DIC-000005_Content-OS-System-Architecture.md)'s v0.1→v1.1 history) remain valid and are not redone.
* **SG6 — Escalation direction depends on need type, not origin tier alone.** A Tier 2 need that is system-wide but not root-structural escalates to System (§7.1); a need that is genuinely root-structural escalates to Root (§7.2), whether raised directly or surfaced during a System-level review.
* **SG7 — This document governs itself.** System Governance is itself a System-level document and is therefore subject to its own §5/§6 for any change to its own content.
* **SG8 — Ownership registry tracks System-tier membership.** §4's Ownership Model table is a registry of System Architecture ([BUS-14](DIUA-DIC-000005_Content-OS-System-Architecture.md)) §11's current System-tier (Tier 1) document list, not an independently maintained list. Whenever §11's list changes — a document added to or removed from System Level — the Owner updates §4 to match, as part of classifying that change (§6 step 2). The sync itself is editorial under §5 (it records current membership under the existing per-document default rule; it does not redefine any criterion, boundary, or relationship) and does not require a separate §6 cycle of its own, but it must not be deferred past the change that triggered it — consistent with SG3's no-unrecorded-change principle, applied here to registry currency rather than Version currency. Introduced [BUS-32](https://linear.app/bussiness-content-os/issue/BUS-32/system-governance-4-ownership-registry-self-synchronization-with), per Owner decision following [BUS-31](https://linear.app/bussiness-content-os/issue/BUS-31/cascarcab-tracker-label-tier-misclassification-and-system-governance).

---

## 10. Open Questions / Unresolved Decisions

1. **Named ownership assignment (§4)** — left open, same reasoning as Root Governance §10, Open Question 1.
2. **Single- vs. multi-approver for System Architecture specifically** — given it is System's foundational document, should changes require more than single-Owner approval? Left open — no demonstrated need for a multi-approver mechanism at Content OS's current scale; introducing one now would be speculative abstraction.
3. **Does §7.1's new escalation path need a symmetric path for System-level needs that are actually Domain/Project-specific but were mistakenly raised at System?** Not yet observed in practice. Left open until a concrete case demonstrates the gap.

---

*End of Document — Content OS System Governance v1.15 (CANONICAL)*

---

## 11. Change Record — v1.15 — 2026-09-26

**Change type:** SG8 ownership-registry synchronization.

System Architecture v1.14 added Content OS — Storage Authority Profile ([BUS-109](https://linear.app/bussiness-content-os/issue/BUS-109/content-os-storage-authority-profile) **/ DIUA-DIC-000041)** to the current System-tier set.

Per SG8:

* §4 Ownership Model now includes Storage Authority Profile;
* System Architecture dependency is synchronized to v1.14;
* the profile's Owner is **\[FORMAL\] Billy Fernando Mende — Content OS Owner**.

No approval model, escalation rule, ownership semantics, or SG8 behavior changed.

---

## 12. Change Record — v1.16 — 2026-09-27

**Change type:** SG8 ownership-registry synchronization.

System Architecture v1.15 added Content OS — Production Connector Lifecycle Profile ([BUS-118](https://linear.app/bussiness-content-os/issue/BUS-118/content-os-production-connector-lifecycle-profile) / `DIUA-DIC-000042`) to the current System-tier set.

Per SG8:

* §4 Ownership Model now includes Production Connector Lifecycle Profile;
* System Architecture dependency is synchronized to v1.15;
* profile Owner is **\[FORMAL\] Billy Fernando Mende — Content OS Owner**.

No approval model, escalation rule, or ownership semantics changed.

---

## Change Record — v1.17 — 2026-09-28

**Classification:** dependency synchronization only.

* System Architecture dependency updated v1.15 → v1.16.
* No ownership, approval, escalation, or change-control mechanism changed.
* Storage-authority semantics remain owned by Storage Authority Profile v1.1; this document only preserves the current System Architecture dependency.
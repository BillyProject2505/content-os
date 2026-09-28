---
document_name: "Content OS — Root Documentation Structure"
document_class: "Root-Level Documentation Structure Document"
structural_classification: "Tiered — Document Tier: Root Level (Tier 0)"
system: "Content OS"
owner: "[OPERATIONAL DEFAULT] (§5.1) Not yet formally assigned. Defaults to the document's creator (Billy Fernando Mende), per Root Governance §4."
related_issue: "BUS-12"
universal_identifier: "DIUA-DIC-000003"
version: "2.5"
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
source_representation:
  platform: "Linear"
  locator: "https://linear.app/bussiness-content-os/document/content-os-root-documentation-structure-v25-canonical-ef622eeb2250"
representation_profile: "DIUA-DIC-000026@1.2"
---
# Content OS — Root Documentation Structure

## Document Identity

| Field | Value |
| -- | -- |
| Document Name | Content OS — Root Documentation Structure |
| Document Class | Root-Level Documentation Structure Document |
| Version | 2.5 |
| Status | **CANONICAL** — amended to v2.5: added a platform-independent Representation Portability constraint in §3. Governed canonical documents must preserve stable identity, required metadata, and semantic references across supported storage/file representations; representation-specific fields are mapped deterministically and do not redefine canonical identity. Concrete GitHub/repository implementation (front matter schema, relative links, CI, exporters, parsers, repository layout) remains deferred until migration execution. Architectural documentation-structure change, approved by Owner on 2026-09-13. Prior state: v2.4, CANONICAL — amended to v2.4: added the Registered Document Boundary (§10.1) following Owner approval recorded in [BUS-55](https://linear.app/bussiness-content-os/issue/BUS-55/registered-document-boundary-identifier-eligibility-governance-finding), distinguishing registerable governed documents from exempt process/evidence artifacts and historical/retained artifacts; clarified that full Document Identity and DIUA-DIC requirements apply to registerable governed documents, while exempt process/evidence artifacts use a reduced provenance header and receive no DIUA-DIC. No new tier or relationship type introduced. Prior state: v2.3, CANONICAL — amended to v2.3: synced `Depends On` (Root Level Architecture v1.10→v1.11, Root Governance v1.10→v1.11), stale due to those documents being amended (v1.11 added §8.6 Conformance Obligation / Root Governance §6 step 3 conformance-verification requirements) since this document's last sync. Found via adversarial governance review of [BUS-25](https://linear.app/bussiness-content-os/issue/BUS-25/satu-dosis-obat-hati-production-sop) (SDOH Production SOP) extended stale-reference check. Compliance update, no substantive content changed. Prior state: v2.2, CANONICAL — amended to v2.2: synced `Depends On` (Root Level Architecture v1.9→v1.10, Root Governance v1.8→v1.10), stale due to those documents being amended in this audit session (Issue #16 follow-on, system-wide stale-Depends-On sweep). Compliance update, no substantive content changed. Prior state: v2.1, CANONICAL added §5.1 (Owner Field Tag Semantics), introducing a three-state tag convention (`[FORMAL]` / `[OPERATIONAL DEFAULT]` / `[UNASSIGNED]`) for the `Owner` field, replacing the overloaded use of `[ASSUMPTION]` for the creator-default case. Amended D1 (§10) accordingly. Architectural change, processed via Root Governance §6, per governance audit (Issue #16) P1 finding. Prior state: v2.0, CANONICAL corrected stale `Depends On` version references (Root Level Architecture v1.8→v1.9, Root Governance v1.7→v1.8) found via Document Metadata Header Standardization finalization task. Compliance update, no substantive content changed. Previously amended to v1.9: added `Owner` field to Document Identity (baseline change per Document Metadata Header audit) — now standard across all Content OS documents. Previously amended to v1.8 via Change Control (Root Governance §6): corrected §4.1 — the uploaded UNIS/UNIR material (including allocation acts 001–008) is **reference/illustrative material**, not live external registry state Content OS must continue from. Content OS instantiates its **own** UNIR registry, starting fresh at `DIUA-DIC-000001`. Also adopted **UNIR-CORE-001 v1.2** as a further External Governing Standard, bounded to registry schema/structure (its six-Core model), and records that Content OS's own registry instance now exists as [BUS-16](https://linear.app/bussiness-content-os/issue/BUS-16/universal-identifier-registry) (Registry) and [BUS-17](https://linear.app/bussiness-content-os/issue/BUS-17/universal-identifier-registration-record) (Registration Record). Prior state: v1.7, CANONICAL, adopted UNIS/DNS-001 with proposed identifiers 000009–000014 (superseded — see below). |
| Related Issue | [BUS-12](https://linear.app/bussiness-content-os/issue/BUS-12/root-documentation-structure) — Root Documentation Structure |
| Owner | **\[OPERATIONAL DEFAULT\]** (§5.1) Not yet formally assigned. Defaults to the document's creator (Billy Fernando Mende), per Root Governance §4. |
| Structural Classification | Tiered — Document Tier: Root Level (Tier 0) |
| Universal Identifier (UNIS/DIC) | `DIUA-DIC-000003` — ALLOCATED, per Content OS's own registry ([BUS-16](https://linear.app/bussiness-content-os/issue/BUS-16/universal-identifier-registry) §4) |
| Depends On | Content OS — Root Level Architecture (v1.11, CANONICAL — [BUS-10](DIUA-DIC-000001_Content-OS-Root-Level-Architecture.md) §8, point 5 — External Governing Standard relationship type) and Content OS — Root Governance (v1.11, CANONICAL — [BUS-11](DIUA-DIC-000002_Content-OS-Root-Governance.md)). This document references, and does not restate, the tier model, document-class criteria, ownership model, or change-control process defined there. **External Governing Standard:** UDS-CORE-MASTER-001 v1.3 (external, not a Content OS document) — bounded to §7 (Templates/Composition) only, per Root Level Architecture §8 point 5. |

---

## 1. Purpose

This document defines naming, storage, and declaration conventions for documentation across all tiers of Content OS, and resolves how a Tier 2 (Domain/Project) domain is formally recognized.

It does not define tiers, document classes, or structural boundaries (Root Level Architecture, [BUS-10](DIUA-DIC-000001_Content-OS-Root-Level-Architecture.md)), and it does not define ownership, approval, or change-control mechanics (Root Governance, [BUS-11](DIUA-DIC-000002_Content-OS-Root-Governance.md)). Where this document needs either, it references the owning document rather than restating it.

---

## 2. Scope

### 2.1 In Scope

* Naming convention for document titles across tiers.
* The minimum set of fields a document must declare about itself (Document Class, Structural Classification, Version, Status, Related Issue, and Depends On).
* Principles a storage/location mechanism must satisfy, independent of which platform is used.
* How a Tier 2 (Domain/Project) domain is formally recognized (resolving Root Level Architecture §12, Open Question 3).
* Whether, and to what degree, document templates are required.

### 2.2 Out of Scope

* **Structural definitions** — tiers, document classes, boundaries. Owned by Root Level Architecture ([BUS-10](DIUA-DIC-000001_Content-OS-Root-Level-Architecture.md)).
* **Ownership, approval, and change-control mechanics** — owned by Root Governance ([BUS-11](DIUA-DIC-000002_Content-OS-Root-Governance.md)).
* **Any specific storage platform, file format, or repository/tool** (e.g., a specific document system, file host, or version-control layout). This document defines requirements a storage mechanism must satisfy, not which mechanism to use.
* **Tier 2 domain-internal naming** below the domain's own top-level registration (§8) — each domain may name its own internal documents as it sees fit, provided its own top-level declaration follows §8.
* **Operational workflow or automation of document creation.**

---

## 3. Documentation Structure Principles

**\[CONSTRAINT\]** This document complies with all constraints in Root Level Architecture §3 — in particular implementation-independence and no speculative abstraction — applied by reference, not restated.

Additional documentation-structure-specific principles:

1. **\[CONSTRAINT\] A document must be self-describing.** Any document, viewed on its own, must state its own Document Class, Structural Classification, Version, and Status without requiring the reader to consult another document first.
2. **\[CONSTRAINT\] No central registry without demonstrated need.** A coordination mechanism (e.g., an index of all documents or domains) is only introduced once a real coordination problem is demonstrated — not preemptively (see §8).
3. **\[CONSTRAINT\] Naming is orthogonal to storage.** A document's name/title is stable regardless of where or how it happens to be stored; this document does not couple the two.
4. **\[CONSTRAINT\] Representation portability.** A registerable governed canonical document must preserve its stable identity, required Document Identity metadata, and semantic references when represented in another supported storage medium or file/repository form. Representation-specific fields may be transformed or mapped only through a deterministic rule; the representation must not create a second canonical identity or silently change the document's semantic dependencies. Concrete platform-specific mappings are defined only when an implementation need exists and remain subordinate to this platform-independent rule.

---

## 4. Naming Convention

**\[DEFINITION\]** A document's stable name follows the form:

```
{System Name} — {Document Subject}
```

For example: `Content OS — Root Level Architecture`, `Content OS — Root Governance`.

**\[CONSTRAINT\]** The stable name must remain unchanged across versions. Version and Status are not part of the stable name — they are declared fields (§5) and may be shown alongside the name (e.g., in a platform's title field, as `Content OS — Root Governance (v1.2, CANONICAL)`) without becoming part of the name itself. Renaming the subject when only the version or status changes is not permitted.

### 4.1 External Governing Standard: UNIS-CORE-001 (Canonical Document Identifier)

**\[DECISION\]** As of v1.7, this document adopts **UNIS-CORE-001 v1.7** (Universal Naming & Identification Standard, external, LOCKED — CANONICAL) as an External Governing Standard, per Root Level Architecture §8 point 5, bounded strictly to the **Document Identifier Grammar** (UNIS §10):

```text
<Namespace>-DIC-<6DigitSequence>
```

**\[CLARIFICATION\]** UNIS draws a normative distinction (UNIS §4): **Name ≠ Identifier**. Content OS's existing stable Name (§4 above, `{System Name} — {Document Subject}`) continues to serve as the human-readable Name. The UNIS `DIC` grammar is adopted as Content OS's canonical **Identifier** — a separate, additional field (§5), not a replacement for the Name, the Linear Related Issue, or the Structural Classification.

**\[FACT — corrected as of v1.8\]** The uploaded UNIS/UNIR material (including UNIR-REGISTRY-001, UNIR-REGISTRATION-RECORD-001, and allocation acts 001–008) is **reference/illustrative material** supplied to demonstrate the pattern — it is not live external registry state Content OS is bound to continue from. Content OS instantiates its **own** authoritative UNIR registry ([BUS-16](https://linear.app/bussiness-content-os/issue/BUS-16/universal-identifier-registry)), starting fresh at `DIUA-DIC-000001`, per UNIR-CORE-001's schema pattern adopted as a further External Governing Standard (§8, point 5).

**\[DECISION\]** Content OS's six current canonical documents are allocated `DIUA-DIC-000001` through `DIUA-DIC-000006`, recorded authoritatively in [BUS-16](https://linear.app/bussiness-content-os/issue/BUS-16/universal-identifier-registry) §4 with allocation-act evidence in [BUS-17](https://linear.app/bussiness-content-os/issue/BUS-17/universal-identifier-registration-record). Each affected document's own Document Identity (§5) states this identifier directly, since the Registry (not external confirmation) is the source of authority for Content OS's own instance.

**\[OPEN QUESTION, not silently resolved\]** Whether the `DIUA` namespace is exclusive to Content OS or potentially shared with an unknown external party cannot be verified from this workspace — tracked at [BUS-16](https://linear.app/bussiness-content-os/issue/BUS-16/universal-identifier-registry) §7, Open Question 2, and this document's own §11, Open Question 5.

### 4.2 External Governing Standard: DNS-001 (Filename / Representation Naming Only)

**\[DECISION\]** As of v1.7, this document also adopts **DNS-001 v2.0** (Document Naming Standard, external) as an External Governing Standard, per Root Level Architecture §8 point 5, bounded strictly to **filename/representation naming** — DNS-001 §4 and §6 (file naming format, Title_Case_With_Underscores) — for the scenario where a Content OS document is represented as a file rather than a Linear document.

**\[FACT — DNS-001's own ecosystem status\]** DNS-001 is explicitly treated as superseded for **identity/naming-authority purposes** within its own source ecosystem: the *Full Architecture & Authority Audit* (Finding F-04) resolves that DNS-001's Document ID authority transfers to UNIS, and DNS-001's non-representation content (folder naming, repository structure, `.md`-as-universal-rule) is explicitly **not transferred**. This document adopts only the sliver of DNS-001 that F-04 itself disposed as "transfer as representation naming" — it does **not** treat DNS-001's `<Abbreviation>-<Number>` scheme as Content OS's Document Identifier (that role belongs to UNIS/DIC, §4.1), avoiding the exact identity-grammar conflict F-04 itself flagged.

**\[IMPLEMENTATION STATE\]** Content OS documents currently live in a single designated text-document platform (the current designation is a System-tier implementation matter, not a Root-tier fact), while repository/file representation is now a demonstrated future requirement for project export. DNS-001's filename convention remains inactive until an actual file representation is materialized. The implementation trigger exists; concrete representation mapping is intentionally deferred to migration execution, consistent with §3 Principle 4 and Root Level Architecture §3 (no speculative abstraction).

---

## 5. Tier & Class Declaration

**\[DEFINITION\]** Every document must declare the following within its own Document Identity section:

* Document Name (§4)
* Document Class
* Version
* Status (per the applicable governance model)
* Related Issue
* Owner
* Structural Classification
* Universal Identifier (UNIS/DIC) — per §4.1, allocated via [BUS-16](https://linear.app/bussiness-content-os/issue/BUS-16/universal-identifier-registry). Documents not yet allocated one may state `Not yet allocated`.
* Depends On — any other document whose definitions this document relies on, referenced by name, not restated

\[DEFINITION\] `Structural Classification` distinguishes tiered documents from non-tiered/cross-cutting documents:

* **Tiered documents** MUST declare a `Document Tier` using one of the structural tiers defined by Root Level Architecture §7: Tier 0 (Root), Tier 1 (System), or Tier 2 (Domain/Project). "Operational" is a Document Class concern expressed within Tier 2 (Root Level Architecture §7 Clarification, §9.2) — it is not itself a Document Tier value.
* **Non-tiered / cross-cutting documents** MUST declare `Document Tier: Non-tiered / Cross-cutting` and MUST identify the applicable cross-cutting model or scope.

\[CONSTRAINT\] `Document Class` and `Document Tier` are distinct fields. Document Class identifies what kind of document it is; Document Tier identifies its structural position when the document is part of the tier hierarchy. A non-tiered/cross-cutting document is not assigned a structural tier merely because it relates to, or is consumed by, a tiered document.

**\[CONSTRAINT\]** Document Class and Document Tier values for tiered documents must match those defined in Root Level Architecture §5 and §7. Tier 1 (System) and Tier 2 (Domain/Project) documents declare their own class names but must still state which structural tier they belong to.

---

## 5.1 Owner Field Tag Semantics

**\[DEFINITION\]** The `Owner` field (§5) holds exactly one of three states, each marked with an explicit tag:

* `[FORMAL]` — an Owner has been explicitly assigned by a recorded decision, naming the person or role and the date of assignment.
* `[OPERATIONAL DEFAULT]` — no formal assignment has occurred. Per the default rule of the governing document at that tier (Root Governance §4 at Root; System Governance §4 at System; each Tier 2 domain's own adopted model at Domain/Project — e.g. the provisional-adoption pattern first used in System Architecture §1a), the document's creator is treated as Owner for operational purposes — classifying and approving changes — until formally reassigned. This is a known, deterministic governance rule being applied, not an unresolved interpretive assumption.
* `[UNASSIGNED]` — neither a formal Owner nor a valid default applies (e.g. no identifiable creator, or the default rule has been explicitly suspended for that document). A document in this state cannot complete any change requiring Owner approval until resolved.

**\[CONSTRAINT\]** `[ASSUMPTION]` remains reserved, across Content OS, for genuine interpretive uncertainty about a fact — its established use elsewhere in this and other Content OS documents. It must not be used for the Owner field's default-application state, which is a deterministic rule, not an assumption. Every Content OS document currently marking `Owner` as `[ASSUMPTION] Not yet formally assigned. Defaults to creator...` is re-tagged `[OPERATIONAL DEFAULT]` under this definition — a metadata-semantics correction, not a re-assignment of ownership or a change to who is accountable.

**\[DECISION\]** D1 (§10) is amended to reference this subsection: `[OPERATIONAL DEFAULT]` creator-default remains a valid, compliant value for `Owner` when no formal assignment exists; it is not a defect.

---

## 6. Storage & Location Principles

**\[DEFINITION\]** A document, wherever stored, must satisfy:

1. It is reachable via a stable reference from the issue that tracks the work producing it (per Root Governance's ownership model, [BUS-11](DIUA-DIC-000002_Content-OS-Root-Governance.md) §4).
2. Its stable name (§4) and current Version/Status are visible without opening a separate lookup.
3. It is not required to duplicate content already defined in a document it depends on (§5, "Depends On") — it references that document instead.

**\[CONSTRAINT\]** This document does not mandate a specific storage platform, file format, or repository structure. Whatever mechanism is used must satisfy the three properties above; the choice of mechanism is an implementation concern, consistent with Root Level Architecture R3.

---

## 7. Templates

**\[DECISION\]** The section pattern already demonstrated by Root Level Architecture ([BUS-10](DIUA-DIC-000001_Content-OS-Root-Level-Architecture.md)) and Root Governance ([BUS-11](DIUA-DIC-000002_Content-OS-Root-Governance.md)) — Purpose, Scope, core content sections, Exclusions, normative Rules, Open Questions — is **mandatory for Tier 1 (System) documents**, resolving §11 Open Question 3 for that tier. This is based on demonstrated evidence, not preemptive standardization: System Architecture ([BUS-14](https://linear.app/bussiness-content-os/issue/BUS-14/system-architecture)) and System Governance ([BUS-15](https://linear.app/bussiness-content-os/issue/BUS-15/system-governance)) already independently converged on this pattern before it was made mandatory.

Root-level documents already follow this pattern as an established fact, independent of this section's decision.

**\[OPEN QUESTION\]** Whether this pattern becomes mandatory for Tier 2 (Domain/Project) documents remains open — no comparable evidence exists yet for that tier (§11, Open Question 3).

**\[CONSTRAINT\]** No additional template, beyond what is described above, is created without a demonstrated need — introducing one preemptively would be speculative abstraction.

### 7.1 External Governing Standard: UDS-CORE-MASTER-001

**\[DECISION\]** As of v1.5, this section (composition/templates only — not this document's other sections) formally adopts **UDS-CORE-MASTER-001 v1.3** (external, LOCKED/CANONICAL GOVERNED BASELINE, \~10,200 lines, 11 phases) as an External Governing Standard, per Root Level Architecture §8 point 5.

**\[CLARIFICATION\]** UDS's own layering model (UDS Phase 0 §8) places itself as: *Universal UDS Architecture → Domain-Specific Extension → Project/Organizational Implementation*. This section positions Content OS's document composition convention as that Domain-Specific Extension — not a parallel reinvention — consistent with UDS's own restraint principles (Phase 0 §15 "Architectural Restraint"; Phase 1 §13 "Reuse Before Creation") and this document's own R5 (duplication is a defect).

**\[FACT\]** The most directly relevant UDS material is Phase 10 ("Document Structure & Composition Architecture"), which is itself only partially locked: 10.1 (Document Composition) is LOCKED; 10.2–10.13 are NOT YET EXECUTED. UDS Phase 10.1's own principle — *"Document = Governed Composition of Recognized Structural Components,"* not a fixed universal template — is compatible in spirit with this document's existing §5 (Tier & Class Declaration) and §7 template pattern, but has not been reconciled clause-by-clause.

**\[CONSTRAINT\]** This adoption does **not** extend to UDS's other phases (Charter/Phase 0 definitions beyond §8's layering model, Foundational Principles/Phase 1, Boundary Architecture/Phase 2, Semantic Architecture and Universal Knowledge Objects/Phase 3, Identity & Type/Phase 5, Namespace/Phase 6, Authority & Canonicality/Phase 7, Traceability & Provenance/Phase 8, Lifecycle & State/Phase 9). Any future adoption of those phases into Content OS requires its own separate Root Governance §6 change-control cycle, scoped explicitly, per Root Level Architecture §8's constraint that adoption is never blanket.

**\[OPEN QUESTION\]** Full reconciliation of this document's §4–§6 against UDS Phase 10 (and, if later adopted, other UDS phases) has not been performed and is tracked at §11, Open Question 4. Until reconciled, this document's existing rules stand as Content OS's own domain-specific decisions (permitted under UDS Phase 0 §8: *"Project-specific requirements shall not be silently elevated into universal UDS rules"* — the same principle applies in reverse: Content OS's existing decisions are not silently overridden by an unreconciled external rule).

---

## 8. Domain Registration (Tier 2)

This section resolves Root Level Architecture §12, Open Question 3: *how are Tier 2 (Domain/Project) boundaries formally declared?*

**\[DECISION\]** A Tier 2 domain is registered by reference-by-name: the first document authored within that domain states its domain name in its own Document Identity (Document Tier: "Domain/Project (Tier 2) — {domain name}"). That declaration is the domain's registration. No separate central registry of domains is created at this time, per Principle 2 (§3).

**\[OPEN QUESTION\]** Whether a lightweight index of registered domains becomes necessary once multiple Tier 2 domains are concurrently active is left open (see §11, Open Question 1) — it is not decided now, only if and when a real coordination problem (e.g., name collisions, difficulty discovering existing domains) is demonstrated.

---

## 9. Exclusions

The following are explicitly **not** part of Root Documentation Structure. Their absence here is intentional.

* Structural definitions of any kind (tiers, document classes, boundaries) — Root Level Architecture ([BUS-10](DIUA-DIC-000001_Content-OS-Root-Level-Architecture.md)).
* Ownership, approval, versioning discipline, and change-control mechanics — Root Governance ([BUS-11](DIUA-DIC-000002_Content-OS-Root-Governance.md)).
* Any specific storage platform, file format, or repository/tool.
* Tier 2 domain-internal naming below the domain's top-level registration.
* A central domain registry (until demonstrated need — §8).
* Any agent-specific, Hermes-specific, or automation-specific mechanism.

---

## 10. Documentation Structure Rules

* **D1 — Self-description is mandatory for registerable governed documents.** Every artifact first falls under the Registered Document Boundary (§10.1). A `REGISTERABLE GOVERNED DOCUMENT` declares its own Document Class, Owner, Structural Classification, Version, Status, Related Issue, Universal Identifier (§4.1), and Depends On (§5). `Owner` states who is accountable for the document, using the three-state tag convention in §5.1 (`[FORMAL]` / `[OPERATIONAL DEFAULT]` / `[UNASSIGNED]`) — `[OPERATIONAL DEFAULT]` creator-default is a valid, compliant value if not formally assigned, not a defect. Tiered documents must include the applicable Document Tier within their Structural Classification; non-tiered / cross-cutting governed documents must declare `Document Tier: Non-tiered / Cross-cutting` and identify the applicable cross-cutting model or scope. An `EXEMPT PROCESS / EVIDENCE ARTIFACT` uses the reduced provenance header defined at §10.1 and does not receive a DIUA-DIC. A `HISTORICAL / RETAINED ARTIFACT` does not receive a new DIUA-DIC solely because it remains stored. A registerable governed document that omits any required declaration, or overstates the confirmation status of its Universal Identifier, is non-compliant regardless of content quality.
* **D2 — Stable name does not change with version/status.** A document's stable name (§4) remains the same when only its version or status changes.
* **D3 — No registry without demonstrated need.** A central document or domain registry is not created preemptively (§3.2, §8).
* **D4 — No platform lock-in.** No rule in this document may be satisfied only by a specific storage platform or tool; any mechanism meeting §6's three properties is compliant.
* **D5 — Domain registration is declarative, not centralized.** A Tier 2 (Domain/Project) domain is recognized once its first document declares it (§8); no additional registration step is required.

---

## 10.1 Registered Document Boundary

**\[DECISION\]** Not every stored Linear document-shaped artifact is a registerable Content OS document. Registration eligibility is determined by the artifact's current governed function, not by storage location, title, file/document format, or mere persistence in the workspace.

### 10.1.1 `REGISTERABLE GOVERNED DOCUMENT`

An artifact is registerable when it represents current governed Content OS state and owns a persistent normative, operational, registry, knowledge, governance, lifecycle, specification, or comparable authoritative concern within Tier 0, Tier 1, Tier 2, or an explicitly governed cross-cutting scope.

A registerable governed document:

* carries the full Document Identity baseline defined in §5;
* receives a DIUA-DIC allocation through [BUS-17](https://linear.app/bussiness-content-os/issue/BUS-17/universal-identifier-registration-record)/[BUS-16](https://linear.app/bussiness-content-os/issue/BUS-16/universal-identifier-registry) unless an explicit special exemption applies;
* remains registerable whether its current lifecycle/status is DRAFT or CANONICAL; status does not determine identifier eligibility;
* includes operational registers when those registers persist current governed state rather than merely evidence a completed process.

**Application:** current SDOH Content Registers are registerable governed Tier 2 operational documents.

### 10.1.2 `EXEMPT PROCESS / EVIDENCE ARTIFACT`

An artifact is exempt when its primary function is to evidence or support a review, audit, proposal, change-control, approval, or decision process and any accepted normative outcome is materialized in another registerable governed document.

Examples include Final Architectural Audit Reports, Governance Review / Change Proposal records, and Owner Decision / Review Records when they meet that condition.

These artifacts:

* do **not** receive a DIUA-DIC;
* do not become a new tier or governed document class merely because they are stored as Linear Documents;
* must carry a reduced provenance header sufficient to identify: artifact/record name, artifact class/type, version or record revision when applicable, status/disposition, related issue or subject, author/reviewer role where relevant, and the canonical target/source in which accepted normative substance is recorded;
* may retain historical version references because they evidence the state actually reviewed.

If an artifact later begins to own persistent current normative or operational state instead of merely evidencing another document's process, it must be reclassified as `REGISTERABLE GOVERNED DOCUMENT` before that authority is relied upon.

### 10.1.3 `HISTORICAL / RETAINED ARTIFACT`

A superseded, migrated, emptied, archived, snapshot, or otherwise retained artifact that no longer represents current governed state does not receive a new DIUA-DIC solely because it remains stored. Existing identifiers, if historically allocated, are not reused or reassigned.

### 10.1.4 Special Registry Exemption

[BUS-16](https://linear.app/bussiness-content-os/issue/BUS-16/universal-identifier-registry) Universal Identifier Registry and [BUS-17](https://linear.app/bussiness-content-os/issue/BUS-17/universal-identifier-registration-record) Universal Identifier Registration Record retain their explicit self-registration exemptions under their existing registered-construct boundary. This is a narrow special exemption and does not create a general exemption for other registry-class documents.

### 10.1.5 Classification and Reconciliation Rule

For existing or new artifacts, classify in this order:

1. Does the artifact own current governed Content OS state? → `REGISTERABLE GOVERNED DOCUMENT`.
2. If not, is it process/evidence whose accepted normative outcome is owned elsewhere? → `EXEMPT PROCESS / EVIDENCE ARTIFACT`.
3. If not, is it retained only for historical/migration/snapshot purposes? → `HISTORICAL / RETAINED ARTIFACT`.
4. If none is demonstrable, eligibility remains unresolved and no DIUA-DIC is allocated until classification is resolved.

Classification is based on function and authority, never inferred from co-location, naming, or document format.

---

## 11. Open Questions / Unresolved Decisions

1. **Central domain index (§8)** — whether a lightweight index of Tier 2 (Domain/Project) domains becomes necessary as more domains become active. Left open until a coordination problem is demonstrated.
2. **Tier 1/2 status vocabulary** — whether Tier 1 (System) or Tier 2 (Domain/Project) documents should be required to reuse the root-level Draft/CANONICAL vocabulary (Root Governance §4.1) or may define their own. **Partially addressed**: System Governance ([BUS-15](https://linear.app/bussiness-content-os/issue/BUS-15/system-governance) §4.1) has independently adopted the root vocabulary for Tier 1. Whether this needs root-level standardization for Tier 2 remains open.
3. **Template enforcement** — **RESOLVED for Tier 1** as of v1.4 (§7): mandatory, based on demonstrated evidence from [BUS-14](https://linear.app/bussiness-content-os/issue/BUS-14/system-architecture)/[BUS-15](https://linear.app/bussiness-content-os/issue/BUS-15/system-governance). Remains open for Tier 2 — no comparable evidence yet.
4. **UDS reconciliation (§7.1)** — full clause-by-clause reconciliation between this document's §4–§6 and UDS-CORE-MASTER-001's phases has not been performed. Left open until either (a) a concrete conflict is found in practice, or (b) a deliberate reconciliation pass is scoped and run as its own change-control cycle.
5. **UNIS/DIC namespace exclusivity (§4.1)** — whether `DIUA` is safely Content OS's own namespace or potentially shared with an unknown external party cannot be verified from this workspace. Tracked jointly with [BUS-16](https://linear.app/bussiness-content-os/issue/BUS-16/universal-identifier-registry) §7, Open Question 2. Content OS's own six allocations (`DIUA-DIC-000001`–`000006`) are authoritative for Content OS's own instance regardless of this open question's resolution.
6. `Owner` **field baseline (§5)** — added v1.9, per Document Metadata Header audit finding that Domain/Project (Tier 2) documents already used this field; resolved. Further refined at v2.1 (§5.1): introduced the `[FORMAL]`/`[OPERATIONAL DEFAULT]`/`[UNASSIGNED]` tag convention, correcting the prior overload of `[ASSUMPTION]` for this field — found via governance audit (Issue #16).

---

*End of Document — Content OS Root Documentation Structure v2.2 (CANONICAL)*
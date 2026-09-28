---
document_name: "Content OS — Root Level Architecture"
document_class: "Root-Level Architecture Document"
structural_classification: "Tiered — Document Tier: Root Level (Tier 0)"
system: "Content OS"
owner: "[OPERATIONAL DEFAULT] (Root Documentation Structure §5.1) Not yet formally assigned. Defaults to the document's creator (Billy Fernando Mende), per Root Governance §4."
related_issue: "BUS-10"
universal_identifier: "DIUA-DIC-000001"
version: "1.11"
status: "CANONICAL"
depends_on: []
source_representation:
  platform: "Linear"
  locator: "https://linear.app/bussiness-content-os/document/content-os-root-level-architecture-v111-canonical-95de4a2b1b67"
representation_profile: "DIUA-DIC-000026@1.2"
---
# Content OS — Root Level Architecture

## Document Identity

| Field | Value |
| -- | -- |
| Document Name | Content OS — Root Level Architecture |
| Document Class | Root-Level Architecture Document |
| Version | 1.11 |
| Status | **CANONICAL** — amended to v1.11: added §8.6 (Conformance Obligation) to the Relationship Model (§8), classifying which relationship types — explicit normative dependency ("Depends On"), External Governing Standard scoped to its declared bound aspect, and tier-membership inheritance under §9.1/§9.2 — create a conformance-verification obligation checked at Root Governance §6's Review step; a Reference (Reference Model RM1–RM5) and the absence of any declared relationship create no such obligation; co-delivery or shared provenance of documents in a working session is excluded from ever establishing a relationship (§3, Principle 8). Architectural change (R6). Reason: audit of [BUS-19](https://linear.app/bussiness-content-os/issue/BUS-19/cwc-asset-system-cas) (CAS) found that §8 defined relationship types without ever stating which created a verification obligation, leaving Root Governance §6's Review step nothing to check declared relationships against. Full Propose/Classify/Review/Approve record: [BUS-29](https://linear.app/bussiness-content-os/issue/BUS-29/cross-document-conformance-obligation-governance-review-finding-from). Prior state: v1.10, CANONICAL — re-tagged `Owner` field from `[ASSUMPTION]` to `[OPERATIONAL DEFAULT]` per Root Documentation Structure §5.1 (Owner Field Tag Semantics), introduced via governance audit (Issue #16) P1 remediation. Compliance update, no substantive content changed — no re-assignment of ownership. Prior state: v1.9, CANONICAL added `Owner` field to Document Identity (§4 baseline change per Document Metadata Header audit) — now standard across all Content OS documents. Previously amended to v1.8: corrected `Universal Identifier (UNIS/DIC)` to `DIUA-DIC-000001` — Content OS's own registry ([BUS-16](https://linear.app/bussiness-content-os/issue/BUS-16/universal-identifier-registry)) starts fresh; the earlier `000009` reflected a misreading of reference-only UNIR example material as live external state. Compliance update. Previously amended to v1.7: added the field as PROPOSED. Previously amended to v1.6 (see Version History below for full progression). Most recent structural change: **removed Tier 3 (Operational/Implementation)** as a structural tier — the hierarchy returns to three tiers (Root/System/Domain-Project); Operational is now a cross-cutting concern, not a peer level. Previously amended to v1.5: added a fifth Relationship Model category, External Governing Standard (§8). Previously amended to v1.4: adopted the `Structural Classification` field. Previously amended to v1.3: introduced Tier 1 (System Level). Prior state: v1.2, CANONICAL. |
| Related Issue | [BUS-10](https://linear.app/bussiness-content-os/issue/BUS-10/root-level-architecture) — Root Level Architecture |
| Owner | **\[OPERATIONAL DEFAULT\]** (Root Documentation Structure §5.1) Not yet formally assigned. Defaults to the document's creator (Billy Fernando Mende), per Root Governance §4. |
| Structural Classification | Tiered — Document Tier: Root Level (Tier 0) |
| Universal Identifier (UNIS/DIC) | `DIUA-DIC-000001` — ALLOCATED, per Content OS's own registry ([BUS-16](https://linear.app/bussiness-content-os/issue/BUS-16/universal-identifier-registry) §4) |
| Supersedes | Any prior architecture assumption derived from Hermes Agent or any agent-specific implementation. Such assumptions are treated as void and non-authoritative at root level. |

### Version History

| Version | Change |
| -- | -- |
| 1.0–1.2 | Prior revisions — see Linear issue [BUS-10](https://linear.app/bussiness-content-os/issue/BUS-10/root-level-architecture) history. |
| 1.3 | Architectural change. Introduced **Tier 1 — System Level** between Root (Tier 0) and Domain/Project (renumbered from Tier 1 to Tier 2). Operational/Implementation renumbered from Tier 2 to Tier 3. Reason: a working set of System Level Documents was proposed that did not fit Root or Domain/Project criteria under the prior 3-tier model. Full definition of System Level's scope is owned by the System Architecture document (Tier 1), not restated here, per R7 (minimize duplication). This is a structural change under R6 and was processed through Root Governance §6 (Owner: document creator, per Root Governance §4 default). |
| 1.4 | Compliance update. Adopted the `Structural Classification` field (replacing bare `Document Tier` as the top-level Identity field) per Root Documentation Structure v1.3 §5. Cascade of that document's formalization of a change that had been made to it outside recorded change control; see Root Documentation Structure ([BUS-12](https://linear.app/bussiness-content-os/issue/BUS-12/root-documentation-structure)) v1.3 Status for detail. |
| 1.5 | Architectural change. Extended §8 (Relationship Model) with a fifth relationship category, **External Governing Standard** — a document system outside Content OS, formally adopted for a specific bounded aspect of Content OS's own document structure, distinct from a Reference (which Reference Model §RM2 keeps explicitly non-authoritative). Reason: Content OS was asked to adopt UDS-CORE-MASTER-001 (an external, \~10,200-line Universal Document System) for document composition conventions, and neither the existing "Depends On" relationship (internal Content OS documents only) nor "Reference" (explicitly non-authoritative, Reference Model RM2) could model an external system with real, bounded authority. Processed through Root Governance §6. |
| 1.6 | Architectural change — **reversal**. Removed **Tier 3 (Operational/Implementation)** as a structural tier. The hierarchy returns to **three** structural tiers: Root (0), System (1), Domain/Project (2, recursive). "Operational" (alongside Governance, Knowledge, Lifecycle, Provenance, etc.) is redefined as a **concern/function** — expressed via Document Class (Root Documentation Structure §5), not Structural Classification — that may appear within any tier's documents, not a peer structural level. Reason: an uploaded Structural Taxonomy Brief was found to internally contradict itself on this exact point (its §7/§9 said Operational is not a tier, while its §8 listed it as "Tier 3"); on review, the Owner determined the non-tiered framing is correct and v1.3's introduction of Tier 3 is reversed. Cascade compliance updates required across [BUS-11](https://linear.app/bussiness-content-os/issue/BUS-11/root-governance), [BUS-12](https://linear.app/bussiness-content-os/issue/BUS-12/root-documentation-structure), [BUS-13](https://linear.app/bussiness-content-os/issue/BUS-13/define-reference), [BUS-14](https://linear.app/bussiness-content-os/issue/BUS-14/system-architecture), [BUS-15](https://linear.app/bussiness-content-os/issue/BUS-15/system-governance). Processed through Root Governance §6. |
| 1.11 | Architectural change. Added **§8.6 (Conformance Obligation)** to §8 (Relationship Model): explicit normative dependency, External Governing Standard (scoped to its declared bound aspect), and tier-membership inheritance (§9.1/§9.2) now create a conformance-verification obligation checked at Root Governance §6's Review step; a Reference (Reference Model RM1–RM5) and the absence of any declared relationship create no obligation; co-delivery/shared provenance of documents in a working session is excluded from ever establishing a relationship (§3, Principle 8). Reason: audit of [BUS-19](https://linear.app/bussiness-content-os/issue/BUS-19/cwc-asset-system-cas) (CAS) found §8 defined relationship types without ever stating which created a verification obligation, leaving Root Governance §6's Review step nothing to check against. Full Propose/Classify/Review record: [BUS-29](https://linear.app/bussiness-content-os/issue/BUS-29/cross-document-conformance-obligation-governance-review-finding-from). Processed through Root Governance §6 (Owner: document creator, per Root Governance §4 default). |

---

## 1. Purpose

This document establishes the highest structural layer of Content OS documentation. It exists to answer one question only: **what is the structural foundation that everything else in Content OS must sit on top of, and what are its boundaries?**

This document does the following, and nothing more:

* Defines what Content OS is at an architectural level (not as a product, tool, or workflow).
* Defines the function and scope of the "root level" of documentation.
* Defines which classes of documents belong at root level.
* Defines the boundary between root-level and lower-level documentation.
* Defines how root-level documents relate to one another.
* Defines how root level relates to system-level and project-specific documentation.
* Defines what is explicitly excluded from root architecture.
* States the rules that keep this architecture simple, maintainable, and extensible.

This document does **not** define governance mechanics, documentation authoring conventions, operational workflow, system-level internals, or any tooling/automation implementation. Those are separate concerns, owned by separate documents (see §5, §7).

---

## 2. Scope

### 2.1 In Scope

* Structural definition of Content OS at the architecture level.
* Definition of the root documentation tier and its function.
* Classification criteria for root-level document classes.
* Boundary definition between root level and lower levels (System, Domain/Project).
* Relationship and reference model between documents.
* Rules that prevent architectural drift, duplication, or premature implementation lock-in.

### 2.2 Out of Scope

* **Governance** — decision rights, approval authority, change-control process. Owned by Root Governance ([BUS-11](https://linear.app/bussiness-content-os/issue/BUS-11/root-governance)).
* **Documentation structure/taxonomy** — naming conventions, folder structure, templates, style. Owned by Root Documentation Structure ([BUS-12](https://linear.app/bussiness-content-os/issue/BUS-12/root-documentation-structure)).
* **System-level internals** — system architecture, system governance, system-wide knowledge/registries, system-wide capabilities. Owned by the System Architecture document (Tier 1) and any further System-level documents it establishes. This document only defines that the System tier exists and its boundary (§7); it does not define System's internal structure.
* **Operational workflow** — how work is executed day-to-day.
* **Implementation/tooling** — any specific agent, automation system, platform, or software, including but not limited to Hermes.
* Any project-specific content, plan, or domain detail (e.g., BAKU_Edit_Tugas or any other production folder). These belong to project-specific documentation (§9).

---

## 3. Architectural Principles

The following principles are constraints on this architecture and on every document that inherits from it. Each is a **\[CONSTRAINT\]**.

1. **\[CONSTRAINT\] Architecture-first, implementation-independent.** Root architecture describes structure and relationships, never specific tools, agents, or automation.
2. **\[CONSTRAINT\] Single responsibility per document.** Every document — at any tier — owns exactly one concern. A document that answers two unrelated questions must be split.
3. **\[CONSTRAINT\] Clear ownership and boundaries.** Every document class has a defined scope boundary; overlap between document classes is treated as an architecture defect.
4. **\[CONSTRAINT\] No speculative abstraction.** A structural element (tier, document class, relationship type) is only added when there is a demonstrated, current need. Theoretical future need is not sufficient justification.
5. **\[CONSTRAINT\] No agent-specific or Hermes-specific architecture.** No component of this architecture may assume, require, or reference a specific agent, automation system, or the discontinued Hermes approach.
6. **\[CONSTRAINT\] No unnecessary workflow or tool assumptions.** Root architecture must remain valid regardless of which tools or workflows are later chosen to implement it.
7. **\[CONSTRAINT\] Minimize duplication.** Information belongs in exactly one document. Other documents reference it; they do not restate it.
8. **\[CONSTRAINT\] Explicit relationships over implicit assumptions.** Any dependency or reference between documents must be stated explicitly in the document itself, not inferred from context or proximity.
9. **\[CONSTRAINT\] Root defines structure; lower levels define domain detail.** Root level never contains domain-specific, system-specific, or project-specific content.

---

## 4. Root-Level Model

**\[DEFINITION\]** Content OS, as a whole, is the entire system of content-related work — including whatever system-wide and project-specific activity eventually exists at Tiers 1–2. This document does not define that whole system; it defines only its structural foundation.

At the level this document operates on, **Content OS is represented through a tiered documentation and boundary system**. This document defines that structural representation — the tiers, the document classes, and the boundaries between them — not the system-wide or project content those tiers eventually carry.

This distinction matters: this document is not a claim that "Content OS = its documentation." It is a claim that the structural representation of Content OS, at the point where architecture is defined, takes the form of tiered documentation and boundaries. Whatever Content OS does at Tier 1 or 2 is out of scope here and does not change this document's own status as structural, not operational.

Content OS's structural representation is not:

* A product description.
* A software system.
* An agent or set of agents.
* A specific workflow or pipeline.

Content OS's structural representation **is**:

* A hierarchy of documentation tiers, each with a defined responsibility.
* A set of structural boundaries that keep concerns (architecture, governance, documentation structure, system coordination, operational workflow, implementation) separated from one another.
* A reference model that allows lower-level, system-level, project-specific, or implementation-specific documents to exist without redefining the foundation each time.

**\[DECISION\]** The structural representation of Content OS is modeled as a **tiered documentation system**, not as a single monolithic document or a runtime system. This document defines Tier 0 (Root). Lower tiers are defined in §7.

---

## 5. Root-Level Components / Document Classes

**\[DEFINITION\]** A document qualifies as **root-level** if, and only if, it satisfies all of the following criteria:

1. **System-wide** — applies to all of Content OS, not to a specific system-coordination concern, project, domain, or content type.
2. **Structural, not operational** — defines structure, boundary, or relationship; does not describe how work is executed.
3. **Implementation-independent** — contains no reference to a specific tool, agent, platform, or automation.
4. **Singular concern** — addresses exactly one of: architecture, governance, or documentation structure. A document mixing these does not qualify as a valid root document regardless of its stated scope.

**\[DECISION\]** Based on these criteria, root level consists of the following document classes. Only one is authored by this document; the others are identified here as classes that belong at root level but are explicitly out of scope for this document.

| Document Class | Responsibility | Status |
| -- | -- | -- |
| **Root Architecture** | Structural definition of Content OS: tiers, boundaries, relationships. | This document (v1.3, CANONICAL) |
| **Root Governance** | Ownership, decision rights, change control at root level. | Authored — [BUS-11](https://linear.app/bussiness-content-os/issue/BUS-11/root-governance) |
| **Root Documentation Structure** | Naming, storage, and conventions for documentation across tiers. | Authored — [BUS-12](https://linear.app/bussiness-content-os/issue/BUS-12/root-documentation-structure) |

No additional root-level document class is defined at this time. New classes may only be introduced if they independently satisfy all four criteria above — see Rule R1 in §11.

**\[CLARIFICATION\]** System-level and Domain/Project-level document classes are *not* enumerated here. They are defined within their own tier's architecture document (e.g., System Architecture for Tier 1), per Principle 7 (§3) — minimize duplication. This document only establishes that those tiers exist and their boundaries (§7).

---

## 6. Structural Boundaries

**\[DEFINITION\]** The boundary between root-level and lower-level documentation is defined as follows:

| Dimension | Root Level | System Level | Domain/Project Level |
| -- | -- | -- | -- |
| Applies to | All of Content OS | Content OS as one coordinated system; cross-project concerns | A specific domain or project (recursively, per Root Documentation Structure §8) |
| Content | Structure, boundaries, relationships | System-wide structure, shared knowledge/registries, cross-project coordination | Domain-specific rules, plans, detail, and execution/workflow content — "operational" content is a concern expressed here via Document Class, not a separate level |
| Tool/agent references | Never | Only where a capability is genuinely shared system-wide | Permitted where relevant to that domain |
| Change frequency | Low — changes only on structural necessity | Moderate — evolves as the system and its Projects evolve | Higher — changes with project/domain needs |
| Authority over other documents | Root documents constrain System and Domain/Project documents | System documents constrain Domain/Project documents; cannot override Root | Domain/Project documents cannot redefine Root or System structure |

A document that introduces new structural tiers, redefines document classes, or changes cross-cutting boundaries is a root-level concern regardless of where it physically resides. A document that only elaborates system-wide, domain-specific, or operational detail within boundaries already set by higher tiers is a lower-level concern regardless of how foundational it feels to its author.

---

## 7. Hierarchy

**\[DECISION\]** Content OS documentation is organized into three tiers:

```
Tier 0 — Root Level
  Defines structure, boundaries, and relationships for all of Content OS.
  (This document belongs here.)

Tier 1 — System Level
  Organizes Content OS as one coordinated system: system-wide architecture,
  governance, shared knowledge/registries, and capabilities used across
  more than one Project. Operates within boundaries set by Tier 0.
  Full definition owned by the System Architecture document (Tier 1),
  not restated here (§3, Principle 7, minimize duplication).

Tier 2 — Domain / Project Level
  Defines scope, rules, and structure specific to a domain or project
  (e.g., a specific production folder or content workstream), including
  its own execution/workflow content. Recursive: a Project may itself
  contain a distinct bounded sub-context represented as another Project
  (§9.2), rather than a separate structural tier. Operates within
  boundaries set by Tier 0 and Tier 1.
```

**\[CLARIFICATION\] "Operational" is not a structural tier.** It is a **concern/function** — like Governance, Knowledge, Lifecycle, or Provenance — that can appear within any tier's documents, expressed through **Document Class** (Root Documentation Structure §5), not through Structural Classification/tier assignment. A document about execution workflow, tooling, or automation is classified by its actual structural position (almost always Tier 2, since Root and System are implementation-independent per §3, Principles 1 and 6) — it does not get its own tier merely because its concern is "operational." This corrects v1.3–v1.5, which had introduced Operational/Implementation as a peer Tier 3; that was a modeling error, not a demonstrated structural need (§3, Principle 4).

**\[CONSTRAINT\]** A document at Tier 1 or 2 may reference higher-tier documents. It may not restate or redefine their content. A document at Tier 0 must never reference a specific Tier 1 or 2 implementation. A document at Tier 1 must never reference a specific Tier 2 implementation.

---

## 8. Relationship Model

**\[DEFINITION\]** Relationships between documents follow these rules:

1. **Reference, not inheritance.** A lower-level document references the relevant higher-tier document by name/ID; it does not copy that content into itself.
2. **One direction of precedence, and it is non-circular.** Root constrains System; System constrains Domain/Project (Tier 0 over Tier 1 over Tier 2). Lower tiers never constrain or override higher tiers. This applies between tiers and among root documents themselves: Root Architecture may be referenced by Root Governance and Root Documentation Structure, but must not itself depend on either for its own definitions.
3. **Explicit dependency declaration.** Any document that depends on another document's definitions must state that dependency explicitly (e.g., in a "Depends On" field in its Document Identity section).
4. **No implicit coupling.** Two documents at the same tier (e.g., Root Architecture and Root Governance) must not assume undeclared knowledge of each other. If one needs a term defined in the other, it references that document explicitly rather than redefining or assuming the term.
5. **External Governing Standard — a fifth, bounded relationship type.** A Content OS document may formally adopt a document system that is external to Content OS (not itself a Content OS document, and not authored under this architecture) as structurally authoritative for one specific, named aspect of that Content OS document's own content — e.g., document composition conventions, but not Content OS's tiers, document classes, or ownership model, which remain exclusively this document's and Root Governance's. This is distinct from a Reference ([BUS-13](https://linear.app/bussiness-content-os/issue/BUS-13/define-reference)), which Reference Model RM2 keeps explicitly non-authoritative; an External Governing Standard is adopted precisely because it *is* meant to bind, within its stated aspect.

**\[CONSTRAINT\]** Adopting an External Governing Standard is an architectural change (R6) for the Content OS document adopting it, and must state: (a) the external standard's identity and version, (b) the specific, named aspect(s) of the Content OS document it binds — adoption is never blanket/whole-document, and (c) that full clause-by-clause reconciliation between the external standard and the adopting document's existing rules is not claimed unless it has actually been performed; an unreconciled but compatible-in-spirit relationship must be recorded as an open item, not silently assumed resolved (per §3's Principle 8, "Explicit relationships over implicit assumptions," and by the external standard's own stated principles where it makes claims about evidence and inference).

6. **Conformance Obligation — which relationships require verification.** A relationship declared under this section creates a conformance-verification obligation, checked at the Review step of the depending document's change-control process (Root Governance §6), when it is: (a) an explicit normative dependency ("Depends On", item 3 above), (b) an External Governing Standard (item 5 above), scoped exactly to its declared bound aspect(s), or (c) tier-membership inheritance under §9.1/§9.2. A Reference ([BUS-13](https://linear.app/bussiness-content-os/issue/BUS-13/define-reference), RM1–RM5) creates no such obligation. Absence of any declared or structurally-inherent relationship creates no conformance obligation.

**\[CONSTRAINT\]** Per §3, Principle 8 (explicit relationships over implicit assumptions), a relationship under this section is never inferred from context or proximity. Co-delivery or shared provenance of a document alongside others in a working session is exactly such contextual proximity, and must not be treated as establishing a relationship under this section.

**\[CLARIFICATION\]** "Authority" and "precedence" in this section refer strictly to **definitional/structural precedence** — i.e., if a lower-tier document's structural claim conflicts with a higher-tier definition, the higher-tier definition governs. This is not **organizational authority** or **decision-making authority** (who may approve, change, or override a document, and under what process). Organizational authority, ownership, and approval rights are governance concerns and belong to Root Governance ([BUS-11](https://linear.app/bussiness-content-os/issue/BUS-11/root-governance)). This document makes no claim over who has the right to change anything.

---

## 9. Lower-Level Documentation Relationship

**\[DEFINITION\]** System-level and Domain/Project-level documentation relate to root level as follows.

### 9.1 System Level (Tier 1)

* System-level documents **operate within** the tier structure, document-class criteria, and boundary rules defined in this document — bound by reference (§8), not by copying or inheriting that content.
* System-level documents **translate** root-level structure and principles into system-wide context usable consistently across Projects. This document does not — and must not — anticipate or define that content.
* System-level documents **may introduce system-wide document classes** (e.g., System Architecture, System Governance, System Knowledge/Registries, System-Wide Capabilities) as long as each class satisfies a genuine cross-project need and does not duplicate Root or Project content.
* System-level documents **must not** encode root-level structural decisions locally. If a System-level document finds itself needing to define something that changes a tier, document class, or boundary, that is a signal the definition belongs at Tier 0 and should be escalated via Root Governance §7, not duplicated or decided locally.

### 9.2 Domain / Project Level (Tier 2)

* Tier 2 documents **operate within** the tier structure and boundary rules defined at Root (this document) and System (Tier 1), bound by reference, not inheritance.
* Tier 2 documents **define their own scope** within their domain (e.g., a specific production folder's audit rules, content rules, execution workflow, or workstream definition) — including "operational" content (§7 Clarification); this tier is where execution/workflow concerns are actually expressed, via Document Class, not via a separate tier. Neither this document nor the System Architecture document anticipates or defines that content.
* Tier 2 is **recursive**: a Project may itself contain a sufficiently distinct bounded context that needs its own identity, scope, and outputs. That context is represented as another Project nested within the parent Project (informally "sub-project"), not as a new architectural tier. Recursion is bounded by actual project structure, not by a predefined number of levels.
* Tier 2 documents **may introduce domain-specific document classes** (e.g., an audit framework, a style guide, a content plan, an operational workflow definition) as long as those classes are scoped to their domain and do not attempt to redefine Root or System structure.
* Tier 2 documents **must not** encode Root- or System-level structural decisions locally. If a Tier 2 document finds itself needing to define something that applies system-wide, that is a signal the definition belongs at Tier 1 (or, if it is genuinely structural, Tier 0) and should be escalated, not duplicated.

---

## 10. Exclusions

The following are explicitly **not** part of root architecture. Their absence here is intentional, not an oversight.

* **Hermes**, or any agent-specific architecture derived from it. Any prior decision made under the Hermes approach is void at root level unless independently re-justified in this document.
* Any specific agent, AI system, or automation tool.
* Any specific workflow, pipeline, or process description.
* Governance mechanics (approval flow, ownership assignment, escalation) — belongs to Root Governance ([BUS-11](https://linear.app/bussiness-content-os/issue/BUS-11/root-governance)).
* Documentation conventions (naming, formatting, templates, storage location) — belongs to Root Documentation Structure ([BUS-12](https://linear.app/bussiness-content-os/issue/BUS-12/root-documentation-structure)).
* System-level internal structure (architecture, governance, registries, capabilities) — belongs to the System Architecture document (Tier 1) and whatever further System-level documents it establishes.
* Project-specific or domain-specific content of any kind (e.g., content of BAKU_Edit_Tugas or any other production folder).
* Speculative future tiers, document classes, or relationship types not currently justified by a demonstrated need.

---

## 11. Architectural Rules

These are normative rules (R1–R7) that keep this architecture simple, maintainable, and extensible. All documents at every tier must comply.

* **R1 — New root document classes require justification.** A new root-level document class may only be created if it satisfies all four criteria in §5 and does not overlap in responsibility with an existing root document class.
* **R2 — No mixed-concern documents at root.** A root-level document may address exactly one of: architecture, governance, or documentation structure. Mixing concerns invalidates a document's root-level status.
* **R3 — No implementation references at root.** Root-level documents must not name a specific tool, agent, platform, or automation system, including Hermes or any successor.
* **R4 — Lower tiers cannot override root.** No Tier 1 or Tier 2 document may redefine a structural boundary, tier, or document class established at Tier 0.
* **R5 — Duplication is a defect.** If the same definition appears in two documents, one must be corrected to reference the other instead of restating it.
* **R6 — Structural change is architectural change.** Any change to tiers, document-class criteria, or boundary rules defined in a root document constitutes an architectural change, not a routine edit. How such changes are approved, recorded, or versioned is a governance mechanism, delegated to Root Governance ([BUS-11](https://linear.app/bussiness-content-os/issue/BUS-11/root-governance)) — this document does not define that mechanism.
* **R7 — Structural change is distinct from editorial maintenance.** A change that affects a tier, document class, boundary, or structural relationship is an architectural change (subject to R6). A change limited to wording, typo correction, formatting, or non-structural clarification is documentation maintenance and is not, by itself, an architectural change.

---

## 12. Open Questions / Unresolved Decisions

These are genuine unresolved items, not rhetorical placeholders. Each requires a decision before or during the authoring of subsequent root documents.

1. **Is a separate "Root Charter/Definition" document needed**, or is §4 (Root-Level Model) of this document sufficient to permanently answer "what is Content OS"? Current position: §4 is sufficient; no separate charter is created unless a concrete need emerges (per R1).
2. **Who owns Root Governance and Root Documentation Structure**, and in what order should they be authored? This document does not assign ownership, as ownership is a governance concern. (Both are now authored — see §5 — but formal named ownership remains open per Root Governance §10.)
3. **How are Tier 2 domain boundaries formally declared** (e.g., does each Tier 2 domain require a registration point at root, or is reference-by-name sufficient)? This is a candidate topic for Root Documentation Structure, not for this document. (Addressed in Root Documentation Structure §8.)
4. **Does Tier 2 (currently "Domain/Project") need to be split into separate Domain and Project sub-levels?** No demonstrated need exists yet — there is currently only one concrete example (a production folder). This is intentionally left open rather than decided, per the no-speculative-abstraction principle (§3.4). Note: this is a distinct question from the v1.3 introduction of Tier 1 (System) — that change addressed a different gap (system-wide, cross-project documents with nowhere to live), not the Domain/Project split.
5. **Was Tier 3 ("Operational/Implementation") needed as its own structural tier? RESOLVED (v1.6): no.** Reversed — Operational is a concern/function expressed via Document Class within Tier 2 (§7 Clarification, §9.2), not a peer structural tier. The v1.3 introduction of Tier 3 is retracted as a modeling error, identified via review of an uploaded Structural Taxonomy Brief that (correctly, on this point) treated Operational as non-hierarchical, alongside Governance/Knowledge/Lifecycle/Provenance.
6. **Does Tier 1 (System) need further sub-structure** (e.g., a formal System Governance or System Documentation Structure document, analogous to Root's)? Not decided here — per R1/§3.4, only added if the System Architecture document demonstrates a real need. Left to the System Architecture document itself to raise, if warranted.

---

*End of Document — Content OS Root Level Architecture v1.11 (CANONICAL)*
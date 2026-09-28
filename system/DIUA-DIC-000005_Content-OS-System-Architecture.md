---
document_name: "Content OS — System Architecture"
document_class: "System-Level Architecture Document"
structural_classification: "Tiered — Document Tier: System Level (Tier 1)"
system: "Content OS"
owner: "[OPERATIONAL DEFAULT] (Root Documentation Structure §5.1) Not yet formally assigned. Defaults to the document's creator (Billy Fernando Mende), per System Governance §4."
related_issue: "BUS-14"
universal_identifier: "DIUA-DIC-000005"
version: "1.16"
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
  locator: "https://linear.app/bussiness-content-os/document/content-os-system-architecture-v116-canonical-86251b80f89d"
representation_profile: "DIUA-DIC-000026@1.2"
---
# Content OS — System Architecture

## Document Identity

| Field | Value |
| -- | -- |
| Document Name | Content OS — System Architecture |
| Document Class | System-Level Architecture Document |
| Version | 1.16 |
| Status | **CANONICAL** — v1.16 synchronizes the staged GitHub canonical-text migration model introduced by Storage Authority Profile v1.1: repository cutover may transfer canonical governed-text authority per document while Linear remains authoritative for unmigrated documents and remains the execution/work-management surface. Root normative content remains platform-independent. Previously v1.15, which adds Content OS — Production Connector Lifecycle Profile ([BUS-118](https://linear.app/bussiness-content-os/issue/BUS-118/content-os-production-connector-lifecycle-profile) / DIUA-DIC-000042) as a System-Wide Implementation Specification governing connector resolve/stop/reconnect/final-commit behavior across all Tier 2 projects and recursive sub-projects. System-tier listing is synchronized to include both [BUS-109](https://linear.app/bussiness-content-os/issue/BUS-109/content-os-storage-authority-profile) and [BUS-118](https://linear.app/bussiness-content-os/issue/BUS-118/content-os-production-connector-lifecycle-profile). Previously v1.14. |
| Related Issue | [BUS-14](https://linear.app/bussiness-content-os/issue/BUS-14/system-architecture) — System Architecture |
| Owner | **\[OPERATIONAL DEFAULT\]** (Root Documentation Structure §5.1) Not yet formally assigned. Defaults to the document's creator (Billy Fernando Mende), per System Governance §4. |
| Structural Classification | Tiered — Document Tier: System Level (Tier 1) |
| Universal Identifier (UNIS/DIC) | `DIUA-DIC-000005` — ALLOCATED, per Content OS's own registry ([BUS-16](https://linear.app/bussiness-content-os/issue/BUS-16/universal-identifier-registry) §4) |
| Depends On | Content OS — Root Level Architecture (v1.11, CANONICAL — [BUS-10](../root/DIUA-DIC-000001_Content-OS-Root-Level-Architecture.md) §7, §9.1) and Root Governance (v1.11, CANONICAL — [BUS-11](../root/DIUA-DIC-000002_Content-OS-Root-Governance.md) §4, §5, §6 — adopted provisionally for System-tier ownership/change-control per §1a below, since Root Governance §2.2 excludes Tier 1 internal ownership from its own scope). This document operates within, and does not restate, the tier model, document-class criteria, or relationship model defined there. |

---

## 1. Purpose

This document establishes Content OS's System Level (Tier 1): the layer that sits between Root (Tier 0) and Domain/Project (Tier 2).

System Level exists to translate the principles, rules, and structure established at Root into system-wide context usable consistently by all Projects within Content OS. System Level does **not** replace Root and does **not** take over Domain/Project responsibility.

### 1a. Ownership and Change Control for System-Level Documents

**\[DECISION — CURRENT\]** Root Governance ([BUS-11](../root/DIUA-DIC-000002_Content-OS-Root-Governance.md) §2.2) excludes Tier 1 (System) internal ownership from its own scope. Dedicated System Governance now exists and is authoritative at [BUS-15](https://linear.app/bussiness-content-os/issue/BUS-15/system-governance); it supersedes this document's historical provisional adoption of Root Governance for System ownership/change control. System-level documents therefore follow [BUS-15](https://linear.app/bussiness-content-os/issue/BUS-15/system-governance) for ownership, classification, approval, recording, and escalation. The former provisional-adoption rule remains valid only as historical evidence for changes made before [BUS-15](https://linear.app/bussiness-content-os/issue/BUS-15/system-governance) became authoritative; it is not current governance.

---

## 2. Position in Architecture

```text
CONTENT OS
│
├── ROOT LEVEL (Tier 0)
│   ├── Root Level Architecture (BUS-10, CANONICAL)
│   ├── Root Governance (BUS-11, CANONICAL)
│   └── Root Documentation Structure (BUS-12, CANONICAL)
│
├── NON-TIERED / CROSS-CUTTING
│   └── Reference Model (BUS-13, CANONICAL)
│
├── SYSTEM LEVEL (Tier 1)
│   ├── System Architecture (this document)
│   ├── System Governance (BUS-15, CANONICAL)
│   ├── Universal Identifier Registry (BUS-16, CANONICAL)
│   ├── Universal Identifier Registration Record (BUS-17, CANONICAL)
│   ├── Content OS Document ID Registry — Legacy DOC-* Namespace (BUS-23, CANONICAL)
│   ├── Repository Representation Profile (BUS-56, CANONICAL)
│   ├── Storage Authority Profile (BUS-109, CANONICAL)
│   └── Production Connector Lifecycle Profile (BUS-118, CANONICAL)
│
└── DOMAIN / PROJECT LEVEL (Tier 2)
    └── Project Documents (e.g., Coz We Care / CWC and its sub-projects),
        including each Project's own execution/workflow content
        └── Recursive Project / Sub-project
```

**\[CLARIFICATION\]** This diagram is illustrative context, showing where System Level sits, and intentionally omits version numbers to avoid staleness — it is not the authoritative definition of the tier hierarchy or of any listed document's current status. That remains Root Level Architecture (§7) and each document's own Document Identity, per Root Level Architecture R5 (duplication is a defect; this document references, not restates, that definition).

Relationship:

```text
ROOT (Tier 0)
  ↓ defines system-wide foundation
SYSTEM (Tier 1)
  ↓ organizes and applies system-wide structure
DOMAIN / PROJECT (Tier 2)
  ↓ executes within bounded project scope, including its own
    operational/workflow content (a Document Class concern,
    not a separate tier)
```

---

## 3. Primary Responsibility

System Level is responsible for matters that:

* apply to Content OS as one system;
* are needed by more than one Tier 2 Project;
* require coordination or consistency across Projects;
* do not fit Root criteria (Root Level Architecture §5);
* do not fit Tier 2 criteria (project-specific, including a Project's own execution/operational content).

System Level answers: **"How is Content OS, as a system, organized and coordinated between Root and Projects?"**

---

## 4. What Belongs at System Level

System Level may include the following, only if a genuine need is demonstrated (§10):

### 4.1 System Architecture

Identity, boundary, structural elements, relationship between Root/System/Project, system-wide structural dependencies, and system-wide integration points. (This document.)

### 4.2 System Governance

Coordination across Projects; system-wide consistency; system-level decision boundaries; system-level lifecycle; application of Root Governance ([BUS-11](../root/DIUA-DIC-000002_Content-OS-Root-Governance.md)) at System scope. System Governance must not conflict with Root Governance. **Authored** — [BUS-15](https://linear.app/bussiness-content-os/issue/BUS-15/system-governance) (System Governance, CANONICAL).

### 4.3 System Knowledge & Registries

Knowledge or registries used by multiple Projects, requiring cross-project identity/consistency, that are neither Root-foundational nor single-Project-specific. **Authored** — [BUS-16](https://linear.app/bussiness-content-os/issue/BUS-16/universal-identifier-registry) (Universal Identifier Registry, CANONICAL), [BUS-17](https://linear.app/bussiness-content-os/issue/BUS-17/universal-identifier-registration-record) (Universal Identifier Registration Record, CANONICAL), and [BUS-23](https://linear.app/bussiness-content-os/issue/BUS-23/content-os-document-id-registry-legacy-doc-namespace) (Content OS Document ID Registry — Legacy DOC-\* Namespace, CANONICAL). [BUS-16](https://linear.app/bussiness-content-os/issue/BUS-16/universal-identifier-registry)/[BUS-17](https://linear.app/bussiness-content-os/issue/BUS-17/universal-identifier-registration-record) govern the current DIUA-DIC-\* scheme and its allocation evidence; [BUS-23](https://linear.app/bussiness-content-os/issue/BUS-23/content-os-document-id-registry-legacy-doc-namespace) governs the closed legacy DOC-\* namespace. These are sibling registry artifacts with disjoint authority scopes, established by demonstrated need and explicit disposition.

### 4.3a System-Wide Implementation Specifications

Implementation specifications may belong at System level when they operationalize an already-authorized Root/System rule across multiple Projects and require one shared deterministic contract. They must not redefine Root structure, project-specific production behavior, or canonical identity. **Authored** — [BUS-56](https://linear.app/bussiness-content-os/issue/BUS-56/repository-representation-profile-github-export-mapping) (Repository Representation Profile, CANONICAL), which operationalizes Root Documentation Structure §3 Representation Portability across repository/file representations; and [BUS-109](https://linear.app/bussiness-content-os/issue/BUS-109/content-os-storage-authority-profile) (Storage Authority Profile, CANONICAL), which operationalizes the current cross-project platform-storage split without changing Root platform-independence; and [BUS-118](https://linear.app/bussiness-content-os/issue/BUS-118/content-os-production-connector-lifecycle-profile) (Production Connector Lifecycle Profile, CANONICAL), which governs when Linear/Google Drive connector access is required, when connector calls stop during local production, and when targeted reconnect/final commit occurs.

### 4.4 System-Wide Capabilities

Capabilities shared by multiple Projects where ownership/definition genuinely belongs at System scope. **Not yet authored — no demonstrated need at this time.**

### 4.5 AI Collaboration Context

Shared context enabling multiple AI collaborators to understand Content OS consistently: system identity, architecture context, project map, authority model, canonicality context, system-wide relationships, entry context. The existence of a multi-AI need does not, by itself, justify a new document (§10). **Not yet authored — no demonstrated need at this time.**

---

## 5. What Does NOT Belong at System Level

* Foundational principles, root governance, root documentation structure → Root (Tier 0).
* Project-specific objectives, knowledge, standards, workflows, outputs → Domain/Project (Tier 2).
* Project-specific implementation detail → Domain/Project (Tier 2), expressed via Document Class, not a separate tier. A cross-project implementation specification may belong at System only when it operationalizes an already-authorized Root/System rule and satisfies §3/§10 demonstrated-need criteria (see §4.3a).
* External supporting sources → Reference Model ([BUS-13](../cross-cutting/DIUA-DIC-000004_Content-OS-Reference-Model.md)), cross-cutting, not owned by any tier.
* Generic operational procedures → Domain/Project (Tier 2), expressed via Document Class, not a separate tier.
* Speculative future requirements → not created before evidence exists (Root Level Architecture §3.4, no speculative abstraction).

---

## 6. System Level vs Root Level

| Root Level (Tier 0) | System Level (Tier 1) |
| -- | -- |
| Defines foundation | Organizes Content OS as a system |
| Sets structural rules | Applies structure within system context |
| Sets governance foundation | Handles system-wide governance |
| Sets canonical principles | Manages system-wide objects/capabilities |
| Highest scope in Content OS | Scope = Content OS as one system |
| Relatively stable | Can evolve as the system evolves |

Root has higher structural authority than System (Root Level Architecture §6, §8). System must not override Root unilaterally.

---

## 7. System Level vs Domain/Project Level

| System Level (Tier 1) | Domain/Project Level (Tier 2) |
| -- | -- |
| Content OS as a whole | Bounded Project |
| Cross-project concern | Project-specific concern |
| Shared structures | Project-specific structures |
| Shared knowledge/registries | Project knowledge |
| Inter-project relationships | Intra-project relationships |
| System-wide capabilities | Project capabilities |
| System context | Project context |

A Project must be able to operate without taking over System responsibility. System must not embed detail relevant to only one Project.

---

## 8. System Level vs Reference Model

System Level is a **structural tier**. The Reference Model ([BUS-13](../cross-cutting/DIUA-DIC-000004_Content-OS-Reference-Model.md)) is a **cross-cutting relationship model** for external/supporting knowledge sources — it is explicitly not tier-classified ([BUS-13](../cross-cutting/DIUA-DIC-000004_Content-OS-Reference-Model.md) Document Identity).

```text
SYSTEM ≠ REFERENCE
```

A Reference does not become a child of System merely because System uses it.

---

## 9. System Level vs Operational

**Operational is not a structural tier** (Root Level Architecture §7 Clarification, v1.6) — it is a **concern/function**, like Governance, Knowledge, Lifecycle, or Provenance, expressed through Document Class rather than Structural Classification. Operational content is realized almost entirely at Tier 2 (Domain/Project), since Root and System are implementation-independent (Root Level Architecture §3, Principles 1 and 6).

```text
STRUCTURE (tiers)
Root → System → Domain/Project

CONCERN (expressed via Document Class, can appear within any tier's documents)
Operational, Governance, Knowledge, Standards, Lifecycle, Provenance, Authority, etc.
```

```text
SYSTEM ≠ OPERATIONAL
```

System may define system-wide operational requirements or workflows if needed (as a System-scoped Document Class, not a tier), but a workflow itself does not automatically become an architectural-tier concern, and it does not make Tier 1 "operational" any more than a governance document at Tier 1 makes Tier 1 "Root."

---

## 10. Minimum Rule for Creating a System-Level Document

A document may be placed at System Level only if its responsibility:

1. has system-wide scope;
2. sits between Root and Domain/Project;
3. is not redundant with Root;
4. is not better placed at Domain/Project;
5. has a clear responsibility;
6. has a clear consumer;
7. has a plausible lifecycle;
8. is needed by Content OS as one system.

If these are not met, the document is not created at System Level.

---

## 11. Minimal System-Level Starting Point

**\[DECISION\]** System Level's starting point has grown from a single document to a small, evidence-justified set. Current System Level (Tier 1) documents:

```text
SYSTEM LEVEL (Tier 1)
│
├── System Architecture (this document, BUS-14, CANONICAL)
├── System Governance (BUS-15, CANONICAL)
├── Universal Identifier Registry (BUS-16, CANONICAL)
├── Universal Identifier Registration Record (BUS-17, CANONICAL)
├── Content OS Document ID Registry — Legacy DOC-* Namespace (BUS-23, CANONICAL)
├── Repository Representation Profile (BUS-56, CANONICAL)
├── Storage Authority Profile (BUS-109, CANONICAL)
└── Production Connector Lifecycle Profile (BUS-118, CANONICAL)
```

Each was added only on demonstrated evidence and responsibility (§10), not because it seemed conceptually plausible (Root Level Architecture §3.4): [BUS-15](https://linear.app/bussiness-content-os/issue/BUS-15/system-governance) formalized ownership/change-control already needed by §1a; [BUS-16](https://linear.app/bussiness-content-os/issue/BUS-16/universal-identifier-registry)/[BUS-17](https://linear.app/bussiness-content-os/issue/BUS-17/universal-identifier-registration-record) formalized the UNIS/DIC identifier scheme adopted by Root Documentation Structure §4.1; [BUS-23](https://linear.app/bussiness-content-os/issue/BUS-23/content-os-document-id-registry-legacy-doc-namespace) finalized disposition of a pre-existing legacy identifier registry rather than leaving it unmanaged (§4.3); [BUS-56](https://linear.app/bussiness-content-os/issue/BUS-56/repository-representation-profile-github-export-mapping) operationalizes the demonstrated cross-project repository-representation requirement created by Root Documentation Structure §3 (§4.3a); [BUS-109](https://linear.app/bussiness-content-os/issue/BUS-109/content-os-storage-authority-profile) operationalizes the demonstrated cross-project storage-authority need created by actual CWC/SDOH/KDS use of Linear plus Google Drive; [BUS-118](https://linear.app/bussiness-content-os/issue/BUS-118/content-os-production-connector-lifecycle-profile) operationalizes the demonstrated need to prevent continuously live connector access from blocking image generation, pose/expression changes, compositing, iterative rendering, and visual QA after authority/assets have already been resolved. A separate System-specific documentation structure, further AI Collaboration Context, or System-Wide Capabilities (§4.4–§4.5) remain **not yet authored** — still no demonstrated need.

**\[CLARIFICATION\]** Any addition to or removal from this list carries an ownership-registry synchronization obligation under System Governance §4/SG8 (not restated here, per Root Level Architecture R5).

---

## 12. Architectural Principle

> Root defines the foundation.
> System defines Content OS as a system.
> Domain/Project defines bounded work contexts.
> Operational defines execution concerns within those contexts.
> Reference connects supporting knowledge across the structure.

System Level exists to provide a real structural responsibility, not merely to add another documentation tier.

---

## 13. Current Status

System Level is a working architectural layer, not yet a license to create an arbitrary collection of documents.

A critical review pass of this document was performed (2026-09-02) against Root Level Architecture (v1.3), Root Governance (v1.3), Root Documentation Structure (v1.2), and Reference Model (v1.2) — **this is a historical record of that specific review event**; those version numbers describe the state at the time, not the current state. Findings applied: (1) added §1a resolving the System-tier ownership/change-control gap; (2) completed the `Depends On` field to include Root Governance; (3) added the authority note in §2 pointing back to Root Level Architecture §7 as the authoritative tier hierarchy; (4) fixed a mismatched internal citation in §8. Final consistency check passed. Per §1a's adopted change-control process, this document was **originally** Approved and Recorded as CANONICAL v1.0 on 2026-09-02; it has since been amended to **v1.4** (see Document Identity, Status, for the current version and the full amendment history).

No change to Root Level ([BUS-10](../root/DIUA-DIC-000001_Content-OS-Root-Level-Architecture.md)/11/12) or to the non-tiered/cross-cutting Reference Model ([BUS-13](../cross-cutting/DIUA-DIC-000004_Content-OS-Reference-Model.md)) is required *to keep operating* System Level going forward; the one structural change needed to introduce this tier was already made to Root Level Architecture (v1.3) and its dependents, prior to this document being authored.

---

*End of Document — Content OS System Architecture v1.14 (CANONICAL)*

---

## 14. Change Record — v1.14 — 2026-09-26

**Change type:** System architectural expansion by demonstrated cross-project need.

Added Content OS — Storage Authority Profile ([BUS-109](https://linear.app/bussiness-content-os/issue/BUS-109/content-os-storage-authority-profile) **/ DIUA-DIC-000041)** to the System-tier implementation-specification set.

The profile establishes the current implementation split across every Tier 2 project:

* GitHub repository = canonical governed-text authority for documents that have completed explicit repository cutover; Linear remains authoritative for documents not yet migrated and remains the execution/work-management surface;
* Google Drive = binary/image/reference-evidence storage;
* repository/GitHub representation remains separately governed by [BUS-56](https://linear.app/bussiness-content-os/issue/BUS-56/repository-representation-profile-github-export-mapping).

This change does not modify Root platform-independent rules. It implements them at System scope.

**Owner decision:** approved through explicit instruction to apply the storage rule to all projects.

---

## 15. Change Record — v1.15 — 2026-09-27

**Change type:** System architectural expansion by demonstrated cross-project production need.

Added Content OS — Production Connector Lifecycle Profile ([BUS-118](https://linear.app/bussiness-content-os/issue/BUS-118/content-os-production-connector-lifecycle-profile) / `DIUA-DIC-000042`) to the System-Wide Implementation Specification set.

The profile establishes one inherited connector lifecycle across every current and future Tier 2 project and recursive sub-project:

* resolve governed text/state through the document's current authoritative surface only when needed (GitHub after cutover; otherwise Linear);
* resolve approved binary inputs through Google Drive only when needed;
* stop connector calls during local image generation/editing, pose/expression changes, compositing, rendering, simulation, and local QA;
* reconnect only on explicit authority/binary/final-commit triggers;
* canonical writes still require Owner approval.

The System-tier list was also synchronized to display [BUS-109](https://linear.app/bussiness-content-os/issue/BUS-109/content-os-storage-authority-profile) and [BUS-118](https://linear.app/bussiness-content-os/issue/BUS-118/content-os-production-connector-lifecycle-profile) consistently.

**Owner decision:** approved through explicit instruction to establish this workflow across every project and sub-project.

---

## Change Record — v1.16 — 2026-09-28

**Classification:** System architecture synchronization for an already Owner-approved storage-authority implementation change.

Changes:

* recognized Storage Authority Profile v1.1 staged GitHub canonical-text cutover;
* preserved Linear authority for unmigrated governed documents;
* preserved Linear as execution/work-management surface after cutover;
* preserved Google Drive binary/image/reference-evidence role;
* preserved Root platform-independence;
* updated connector-resolution wording to use the current authoritative surface rather than assuming Linear for every governed text document.

No tier, document class, project boundary, or Root structural rule changed.
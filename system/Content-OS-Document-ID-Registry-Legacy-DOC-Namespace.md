---
document_name: "Content OS Document ID Registry — Legacy DOC-* Namespace"
document_class: "System-Level Legacy Registry Document"
structural_classification: "Tiered — Document Tier: System Level (Tier 1). **RESOLVED 2026-09-03** (was previously unresolved, provisionally Non-tiered/Cross-cutting): this registry is functionally analogous to the Universal Identifier Registry (<issue id=\"44a7b4bf-c714-4d09-98f2-f2f1a3458fbb\" href=\"https://linear.app/bussiness-content-os/issue/BUS-16/universal-identifier-registry\">BUS-16</issue>, also System Level) — both are System Knowledge & Registries per System Architecture §4.3. The legacy `level: META` value from the original YAML is retired in favor of this resolved classification."
system: "Content OS"
owner: "Billy Fernando Mende — confirmed via explicit disposition instruction, 2026-09-03."
related_issue: "BUS-23"
universal_identifier: null
identifier_exemption:
  status: "EXPLICIT_SOURCE_EXEMPTION"
  basis: "Not applicable — this document is a registry, not a registered entry."
version: "2.8"
status: "CANONICAL"
depends_on:
  - id: "DIUA-DIC-000001"
    name: "Content OS — Root Level Architecture"
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
  locator: "https://linear.app/bussiness-content-os/document/content-os-document-id-registry-legacy-doc-namespace-v28-canonical-5f1029b03722"
representation_profile: "DIUA-DIC-000026@1.3"
---
# Content OS Document ID Registry — Legacy DOC-\* Namespace

## Document Identity

| Field | Value |
| -- | -- |
| Document Name | Content OS Document ID Registry — Legacy DOC-\* Namespace |
| Document Class | System-Level Legacy Registry Document |
| Version | 2.8 |
| Status | **CANONICAL** — amended to v2.8: synchronized the current System Architecture dependency to v1.16 after Phase 2 migration preparation; legacy DOC-\* namespace closure, protected allocation, sibling-registry relationship, and provenance are unchanged. Prior state: v2.7, CANONICAL — amended to v2.7: replaced the stale version-pinned sibling pointer to Universal Identifier Registry v1.42 with an unversioned `current CANONICAL` sibling reference. The two registries remain disjoint; DOC-\* namespace closure and protected legacy allocation are unchanged. Prior state: **CANONICAL** — amended to v2.6: synchronized `Depends On` to System Architecture v1.12 and sibling Universal Identifier Registry v1.20 after [BUS-56](DIUA-DIC-000026_Content-OS-Repository-Representation-Profile.md)/System-tier conformance repair. Closed DOC-\* namespace disposition, the single protected allocation, and legacy provenance remain unchanged. Compliance update only. Prior state: **CANONICAL** — amended to v2.5: synchronized `Depends On` from Root Documentation Structure v2.4→v2.5 and sibling Universal Identifier Registry v1.12→v1.17. Re-verified against §3 Representation Portability: this closed legacy registry remains conformant; namespace closure, existing allocation protection, and registry authority are unchanged. Compliance update only. Prior state: v2.4, CANONICAL — re-verified against Root Documentation Structure v2.4 §10.1 after adoption of the Registered Document Boundary; result CONFORMANT. This closed legacy registry remains a current governed System-level document with its existing self-registration exemption and closed `DOC-*` namespace. Current `Depends On` updated v2.3→v2.4 only. Prior state: v2.3, CANONICAL — amended to v2.3: synced `Depends On` (Root Level Architecture v1.10→v1.11, Root Documentation Structure v2.2→v2.3, System Architecture v1.9→v1.11, Universal Identifier Registry v1.9→v1.12), stale due to those documents being amended in the current workspace-wide stale-Depends-On sweep ([BUS-25](https://linear.app/bussiness-content-os/issue/BUS-25/satu-dosis-obat-hati-production-sop) extended stale-reference check, full-sweep pass). Compliance update, no substantive content changed. Prior state: v2.2, CANONICAL — amended to v2.2: synced `Depends On` (Root Level Architecture v1.9→v1.10, Root Documentation Structure v2.0→v2.2, System Architecture v1.7→v1.9, Universal Identifier Registry v1.2→v1.9), stale due to those documents being amended in this audit session (Issue #16 follow-on, system-wide stale-Depends-On sweep) — this reference had drifted 5 versions behind, the most severe found in the sweep. Compliance update, no substantive content changed. Prior state: v2.1, CANONICAL synced `Depends On` (System Architecture v1.6→v1.7, Universal Identifier Registry v1.1→v1.2), per Owner re-audit instruction. Compliance update, no substantive content changed. Previously amended to v2.0: disposition finalized by the Owner (2026-09-03). Reparented to [BUS-23](https://linear.app/bussiness-content-os/issue/BUS-23/content-os-document-id-registry-legacy-doc-namespace); Structural Classification resolved to System Level (Tier 1); `Depends On` completed; brought into compliance with the Tier 1 template mandate (Root Documentation Structure §7) by adding §2 Scope and §6 Exclusions. All Open Questions from v1.2 are resolved. Prior state: v1.2, DRAFT, migrated from legacy YAML with four unresolved Open Questions. |
| Related Issue | [BUS-23](https://linear.app/bussiness-content-os/issue/BUS-23/content-os-document-id-registry-legacy-doc-namespace) — Content OS Document ID Registry (Legacy DOC-\* Namespace) |
| Owner | **Billy Fernando Mende** — confirmed via explicit disposition instruction, 2026-09-03. |
| Structural Classification | Tiered — Document Tier: System Level (Tier 1). **RESOLVED 2026-09-03** (was previously unresolved, provisionally Non-tiered/Cross-cutting): this registry is functionally analogous to the Universal Identifier Registry ([BUS-16](Content-OS-Universal-Identifier-Registry.md), also System Level) — both are System Knowledge & Registries per System Architecture §4.3. The legacy `level: META` value from the original YAML is retired in favor of this resolved classification. |
| Universal Identifier (UNIS/DIC) | Not applicable — this document is a registry, not a registered entry (same reasoning as [BUS-16](Content-OS-Universal-Identifier-Registry.md) §5, Registered Construct Boundary). |
| Depends On | Content OS — Root Level Architecture (v1.11, CANONICAL — [BUS-10](../root/DIUA-DIC-000001_Content-OS-Root-Level-Architecture.md) §7, §9.1), Root Documentation Structure (v2.5, CANONICAL — [BUS-12](../root/DIUA-DIC-000003_Content-OS-Root-Documentation-Structure.md) §3, §5, §10.1), and System Architecture (v1.16, CANONICAL — [BUS-14](DIUA-DIC-000005_Content-OS-System-Architecture.md) §4.3, System Knowledge & Registries). **Sibling, not superseded-by:** Universal Identifier Registry (current CANONICAL — [BUS-16](Content-OS-Universal-Identifier-Registry.md)) — the two registries govern disjoint, non-overlapping namespaces (`DOC-*` here, closed; `DIUA-DIC-*` there, open) per the disposition in §1. |

---

## 1. Purpose and Disposition (Owner decision, 2026-09-03)

This document is Content OS's authoritative registry for the legacy `DOC-*` **identifier namespace** — a scheme that predates Root Level Architecture and Content OS's adoption of `DIUA-DIC-*` ([BUS-16](Content-OS-Universal-Identifier-Registry.md)).

**\[DECISION — final disposition\]** This registry is **not retired**. Retiring it would leave `DOC-SYS-001` (Universal Content Production Standard) without a governing registry, since that document is confirmed live and bound to a `DOC-*` identifier (not orphaned — see the prior audit correction). Instead:

* This registry remains authoritative for `DOC-*` identifiers already allocated. Currently exactly one: `DOC-SYS-001` (§3).
* No new `DOC-*` **identifiers are allocated going forward.** The namespace is closed to new entries as of this disposition.
* `DIUA-DIC-*` ([BUS-16](Content-OS-Universal-Identifier-Registry.md)) remains the sole scheme for all future Content OS document identifiers.
* The two registries are **not merged**. They govern disjoint namespaces and do not compete for the same identifier space — this is not a redundancy, it is a closed legacy registry standing alongside an open current one.

This resolves the "architectural redundancy" question raised at v1.2 (§7, Open Question 4 there): it was a real open question then; it is answered now.

---

## 2. Scope

### 2.1 In Scope

* The `DOC-*` namespace: format, existing allocation(s), and allocation rules as originally defined.
* The closure decision (§1): no new `DOC-*` allocations.
* Provenance of the original YAML-based artifact this document was migrated from.

### 2.2 Out of Scope

* `DIUA-DIC-*` namespace and its allocation process — owned by [BUS-16](Content-OS-Universal-Identifier-Registry.md).
* Content OS's tiers, document classes, or naming conventions — owned by Root Level Architecture ([BUS-10](../root/DIUA-DIC-000001_Content-OS-Root-Level-Architecture.md)) and Root Documentation Structure ([BUS-12](../root/DIUA-DIC-000003_Content-OS-Root-Documentation-Structure.md)).
* Specification content of `DOC-SYS-001` itself — owned by Universal Content Production Standard.

---

## 3. Namespace, ID Format, and Allocation Records (migrated verbatim, closed)

Namespace: `DOC` — **CLOSED to new allocations as of 2026-09-03 (§1).**

ID Format: `DOC-{LEVEL}-{NNN}` (historical; not used for new allocations)

**Level Sequences (historical):** ROOT: 0 · META: 0 · REFERENCE: 0 · SYSTEM: 0 · PROJECT: 0

**Allocation Records:**

* `DOC-SYS-001` — Universal Content Production Standard. **CONFIRMED, ACTIVE.** Verified 2026-09-03 as correctly bound to that document (not orphaned — a prior audit's orphan finding was a false negative, corrected in that document's own record).

---

## 4. Allocation Rules (migrated verbatim, historical)

1. Every Content OS Document MUST have a unique `document_id`.
2. Document IDs MUST follow the Content OS ID format.
3. Allocation MUST be verified against this registry.
4. An allocated ID MUST NOT be silently reassigned.
5. Collision or registry inconsistency MUST cause execution to STOP.
6. This registry is a Meta-level governance document.

**\[CLARIFICATION\]** These rules governed `DOC-*` allocation while the namespace was open. They remain in force for the one existing record (§3) — e.g., Rule 4 (no silent reassignment) still protects `DOC-SYS-001`. They no longer apply prospectively, since no new allocations occur (§1).

---

## 5. Original Schema (preserved for provenance)

**\[FACT\]** The original document used YAML front matter: `document_id: DOC-META-REG-001`, `level: META`, `type: REGISTRY`, `version: 1.0`, `lifecycle: DRAFT`, `owner: "Content OS"`, `approval.status: NOT_REQUIRED`, empty `dependencies`/`relations`. Migrated to the Document Identity schema 2026-09-03; content preserved.

---

## 6. Exclusions

* New `DOC-*` allocations — closed (§1).
* `DIUA-DIC-*` namespace governance — [BUS-16](Content-OS-Universal-Identifier-Registry.md).
* Any decision about whether `DOC-SYS-001`'s host document (Universal Content Production Standard) should be integrated into System Architecture's registered document set — that is a separate, still-open architectural question owned by that document itself, not by this registry.

---

## 7. Resolution Record

All Open Questions carried forward from v1.2 are resolved as of this v2.0 disposition:

1. **Structural Classification (**`level: META`**) — RESOLVED.** The legacy META value is retired and this registry is classified as System Level (Tier 1).
2. **Missing** `Depends On` **— RESOLVED.** Dependencies are now explicitly declared in Document Identity.
3. `DOC-SYS-001` **allocation — RESOLVED.** The allocation is confirmed and remains permanently bound to Universal Content Production Standard as its historical identifier.
4. **Redundancy with** `DIUA-DIC-*` **— RESOLVED.** The `DOC-*` namespace remains authoritative only for existing allocations and is closed to new allocations; `DIUA-DIC-*` remains the sole scheme for future documents. The registries are sibling authorities for disjoint namespaces.
5. **No parent Issue — RESOLVED.** The document is reparented to [BUS-23](https://linear.app/bussiness-content-os/issue/BUS-23/content-os-document-id-registry-legacy-doc-namespace).

The architectural status of Universal Content Production Standard itself is intentionally outside this registry's authority and is governed by that document's own disposition record. It is not an unresolved question of this registry.

---

*End of Document — Content OS Document ID Registry — Legacy DOC-* Namespace v2.6 (CANONICAL)\*

---

## Dependency-Maintenance Record — v2.7 — 2026-09-26

The Universal Identifier Registry is a lateral/sibling authority, not a normative upstream dependency. Its pointer is now intentionally unversioned (`current CANONICAL`) to avoid unnecessary sibling version-churn while preserving namespace separation.

No legacy identifier, allocation, namespace disposition, or authority scope changed.

**Version:** 2.6 → 2.7.

---

## Change Record — v2.8 — 2026-09-28

* System Architecture dependency synchronized v1.14 → **v1.16 CANONICAL**.
* Legacy `DOC-*` namespace remains closed.
* Existing protected allocation and sibling relationship with the Universal Identifier Registry are unchanged.
* No identifier or provenance history changed.
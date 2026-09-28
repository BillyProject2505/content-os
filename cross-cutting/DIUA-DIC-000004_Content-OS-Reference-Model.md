---
document_name: "Content OS — Reference Model"
document_class: "Reference Model — cross-cutting, not a Root-Level document class under Root Level Architecture §5 (see §10 for why, and §11 Open Question 1 for what to do about it)"
structural_classification: "Non-tiered / Cross-cutting — Document Tier: Non-tiered / Cross-cutting; applicable cross-cutting model: this document (Reference Model), applies across Root, Tier 1, and Tier 2 without belonging to any of them (see §10)"
system: "Content OS"
owner: "[OPERATIONAL DEFAULT] (Root Documentation Structure §5.1) Not yet formally assigned. Defaults to the document's creator (Billy Fernando Mende), per Root Governance §4."
related_issue: "BUS-13"
universal_identifier: "DIUA-DIC-000004"
version: "1.13"
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
source_representation:
  platform: "Linear"
  locator: "https://linear.app/bussiness-content-os/document/content-os-reference-model-v113-canonical-b2121c7ca86a"
representation_profile: "DIUA-DIC-000026@1.2"
---
# Content OS — Reference Model

## Document Identity

| Field | Value |
| -- | -- |
| Document Name | Content OS — Reference Model |
| Document Class | Reference Model — cross-cutting, not a Root-Level document class under Root Level Architecture §5 (see §10 for why, and §11 Open Question 1 for what to do about it) |
| Version | 1.13 |
| Status | **CANONICAL** — amended to v1.13 (2026-09-14): audit remediation synchronized current-state facts and governance routing; replaced the obsolete premise that no Tier 1/Tier 2 domains are active; clarified that operational classification as a governed non-tiered/cross-cutting document is resolved while possible Root Architecture formalization remains open; corrected Related Issue metadata and the end marker. RM1–RM5, provenance requirements, external-Reference semantics, and the no-central-registry decision are unchanged. Compliance/current-state amendment under Owner instruction. Prior state: v1.12, CANONICAL — amended to v1.12: synchronized `Depends On` from Root Documentation Structure v2.4→v2.5 after adoption of §3 Representation Portability. Re-verified: Reference Model remains compatible; provenance and external-Reference semantics are unchanged. Compliance update, no substantive model change. Prior state: v1.11, CANONICAL — re-verified against Root Documentation Structure v2.4 after adoption of §10.1 Registered Document Boundary; result CONFORMANT. Reference Model remains a current registered cross-cutting governed document and its external-Reference semantics are unchanged. Current `Depends On` updated v2.3→v2.4 only. Prior state: v1.10, CANONICAL — amended to v1.10: synced `Depends On` (Root Level Architecture v1.10→v1.11, Root Governance v1.10→v1.11, Root Documentation Structure v2.2→v2.3), stale due to those documents being amended since this document's last sync. Found via full workspace stale-Depends-On sweep (following adversarial governance review of [BUS-25](https://linear.app/bussiness-content-os/issue/BUS-25/satu-dosis-obat-hati-production-sop), SDOH Production SOP). Compliance update, no substantive content changed. Prior state: v1.9, CANONICAL — amended to v1.9: synced `Depends On` (Root Level Architecture v1.9→v1.10, Root Governance v1.8→v1.10, Root Documentation Structure v2.0→v2.2), stale due to those documents being amended in this audit session (Issue #16 follow-on, system-wide stale-Depends-On sweep). Compliance update, no substantive content changed. Prior state: v1.8, CANONICAL re-tagged `Owner` field from `[ASSUMPTION]` to `[OPERATIONAL DEFAULT]` per Root Documentation Structure §5.1, introduced via governance audit (Issue #16) P1 remediation. Compliance update, no substantive content changed. Prior state: v1.7, CANONICAL added `Owner` field to Document Identity (baseline change per Document Metadata Header audit) — now standard across all Content OS documents. Previously amended to v1.6: corrected `Universal Identifier (UNIS/DIC)` to `DIUA-DIC-000004` — Content OS's own registry ([BUS-16](https://linear.app/bussiness-content-os/issue/BUS-16/universal-identifier-registry)) starts fresh; the earlier `000012` reflected a misreading of reference-only UNIR example material as live external state. Compliance update. Previously amended to v1.5: added the field as PROPOSED per Root Documentation Structure v1.7 §4.1 (UNIS/UNIR adoption). Compliance update, applied directly. Previously amended to v1.4 via Change Control (Root Governance §6): removed Tier 3 references (§2, §7, §10, §11). |
| Related Issue | [BUS-13](https://linear.app/bussiness-content-os/issue/BUS-13/reference-model) — Reference Model |
| Owner | **\[OPERATIONAL DEFAULT\]** (Root Documentation Structure §5.1) Not yet formally assigned. Defaults to the document's creator (Billy Fernando Mende), per Root Governance §4. |
| Structural Classification | Non-tiered / Cross-cutting — Document Tier: Non-tiered / Cross-cutting; applicable cross-cutting model: this document (Reference Model), applies across Root, Tier 1, and Tier 2 without belonging to any of them (see §10) |
| Universal Identifier (UNIS/DIC) | `DIUA-DIC-000004` — ALLOCATED, per Content OS's own registry ([BUS-16](https://linear.app/bussiness-content-os/issue/BUS-16/universal-identifier-registry) §4) |
| Depends On | Content OS — Root Level Architecture (v1.11, CANONICAL — [BUS-10](../root/DIUA-DIC-000001_Content-OS-Root-Level-Architecture.md)), Root Governance (v1.11, CANONICAL — [BUS-11](../root/DIUA-DIC-000002_Content-OS-Root-Governance.md)), Root Documentation Structure (v2.5, CANONICAL — [BUS-12](../root/DIUA-DIC-000003_Content-OS-Root-Documentation-Structure.md)). This document references, and does not restate, definitions established there. |

---

### Terminology note (read first)

This document uses **"Reference"** (capitalized, as a noun) to mean an external/supporting knowledge source, as defined in §1. This is a different concept from the lowercase verb **"reference"** already used throughout Root Level Architecture, Root Governance, and Root Documentation Structure to describe how Content OS documents point to each other instead of restating content (Root Level Architecture §8, "reference, not inheritance"). The two are related in spirit — pointing rather than copying — but govern different relationships: one governs how Content OS documents relate to *each other*; this document governs how Content OS relates to *external* knowledge. They are not the same mechanism and must not be conflated.

---

## 1. Definition and Purpose

**\[DEFINITION\]** A **Reference** is an external or supporting knowledge source — factual information, evidence, a standard, research, a specification, or context — used to inform, support, or justify content or a decision within Content OS, without itself holding structural authority over Content OS.

**Purpose:** establish the minimal shared vocabulary and rules needed for Content OS documents, at any tier, to cite or rely on external/supporting knowledge consistently — without creating a new tier, registry, or governance subsystem unless a genuine need is demonstrated (§10).

---

## 2. What Qualifies as a Reference

**\[DEFINITION\]** Something qualifies as a Reference if all three hold:

1. It originates outside Content OS's own document set (it is not itself a Root, Tier 1, or Tier 2 Content OS document).
2. It is used to inform, support, or justify a claim, decision, or piece of content within Content OS.
3. It does not claim structural authority over Content OS's tiers, document classes, or boundaries.

**\[CONSTRAINT\]** A Content OS document is never a Reference to another Content OS document under this model — that relationship is already fully covered by Root Level Architecture §8. If something claims authority over Content OS's own structure, it is not a Reference regardless of source; Root Level Architecture R3/R4 already govern that case.

---

## 3. Reference Types / Classes

**\[DECISION\]** No fixed taxonomy of Reference types (e.g., "factual," "standard," "research") is defined at this level. Content OS has no demonstrated need to treat different kinds of References differently at the structural level — reliability is evaluated case by case (§5), not by a pre-assigned category.

If a specific Tier 1 system-level concern or Tier 2 Domain/Project later finds it needs typed References (e.g., "this content vertical must always cite peer-reviewed sources"), that is a scope-specific rule defined by the applicable System or Domain/Project authority — not a Root-level or cross-cutting taxonomy. Introducing one now, without such a demonstrated case, would be speculative abstraction.

**\[DECISION\]** Similarly, a Reference is not restricted to a document format. It may be a web page, a dataset, a standard, a conversation, a person's expertise, or any other knowledge source — the model does not require it to be document-shaped.

---

## 4. Identity and Provenance

**\[DEFINITION\]** A Reference used within a Content OS document must be identifiable: traceable to its origin (e.g., source, author/organization, date) sufficient for a reader to independently verify or re-locate it.

**\[CONSTRAINT\]** This document does not mandate a specific citation format, storage location, or provenance-recording mechanism. It only requires that provenance be recoverable from wherever the Reference is used — consistent with the implementation-independence already established in Root Level Architecture R3.

---

## 5. Authority and Reliability

**\[DEFINITION\]** A Reference carries no structural authority within Content OS, regardless of how authoritative it is in its own external domain. A government standard, for instance, is authoritative in its own field but has zero authority over Content OS's tiers, document classes, ownership, or naming conventions — those remain exclusively governed by the Root documents ([BUS-10](../root/DIUA-DIC-000001_Content-OS-Root-Level-Architecture.md)/11/12).

**\[DECISION\]** Reliability — how much weight a Reference is given — is judged by whoever uses it, at the point of use, not by a central Content OS mechanism. No root-level or cross-cutting reliability-scoring, vetting, or approval process is created for References. No demonstrated need for one exists yet.

---

## 6. Relationship Between References and Content OS Documents

**\[DEFINITION\]** The relationship is:

* **One-directional.** References inform Content OS documents; Content OS documents do not grant References authority over themselves in return.
* **Non-structural.** Citing a Reference, however heavily relied upon, never elevates it to structural authority (§5).
* **Distinct from the document-to-document relationship model.** Root Level Architecture §8 governs how Content OS documents relate to *each other* (reference-not-inheritance, precedence). It does not govern how a Content OS document relates to an external Reference — that relationship is defined here instead (see Terminology note above).

---

## 7. Lifecycle and Freshness

**\[CONSTRAINT\]** A Reference may become outdated, retracted, or superseded outside Content OS's control, since it originates externally. This document does not define a mandatory cross-cutting freshness-check, expiration, or periodic-revalidation mechanism. Active health-related Tier 2 work makes freshness governance a legitimate review candidate, but no system-wide mechanism or cadence has yet been approved; applicable Domain/Project controls may be defined within their own authority.

**\[DECISION\]** If a Reference is later found to be outdated or wrong, correcting the Content OS document that relied on it is handled through that document's applicable normal change process: Root Governance §5/§6 for Root documents; System Governance §6 for Tier 1 documents; and the applicable Domain/Project governance or adopted change process for Tier 2 documents. This is treated as an ordinary content correction, not a special Reference-lifecycle mechanism.

---

## 8. Boundaries and Exclusions

The following are explicitly **not** part of the Reference Model. Their absence is intentional.

* **No new tier.** References are cross-cutting and usable at any tier; they do not form a Tier of their own, per the framing this document was scoped under.
* **No registry, repository, or catalog** of References — see RM5.
* **No mandated acquisition source.** Web research, official documentation, academic sources, AI tools (including but not limited to Meta AI), or any other provider are possible ways to *obtain* a Reference's content — none of them is an architectural dependency of Content OS. This document does not name a required or privileged source.
* **No citation format, storage platform, or technical attachment mechanism** — an implementation concern, not addressed here.
* **No authority to redefine Root Architecture, Root Governance, or Root Documentation Structure** — see RM2.
* **No governance mechanism for vetting or approving References** — if a real need for this emerges, it is a Root Governance concern ([BUS-11](../root/DIUA-DIC-000002_Content-OS-Root-Governance.md)), not a new subsystem created here.

---

## 9. Minimal Normative Rules

* **RM1 — External only.** A Reference is external to Content OS's own document set; a Content OS document is never a Reference to another Content OS document under this model (§2).
* **RM2 — No structural authority.** A Reference cannot redefine any Root document's tiers, document classes, boundaries, ownership, or naming/storage conventions (§5).
* **RM3 — Provenance required.** A Reference used in a Content OS document must have recoverable provenance (§4); an unattributable claim is not usable as a cited Reference.
* **RM4 — Reliability judged at point of use.** No central Content OS mechanism scores or vets References; the citing author/Owner judges reliability (§5).
* **RM5 — No registry without demonstrated need.** No Reference registry, catalog, or repository is created without a demonstrated coordination problem — consistent with the precedent already set in Root Documentation Structure D3 for domain registries.

---

## 10. Is a Formal Reference Document, Registry, or Structure Justified?

**\[DECISION\]** A full, heavyweight Reference structure — a dedicated central registry, repository, or governance subsystem — is **not justified** at this time. Content OS now has active Tier 1 and Tier 2 work, including domain-specific source records, but no demonstrated cross-domain coordination failure exists in which References are being duplicated, mismanaged, or made undiscoverable at a scale requiring centralization. A domain-specific source list is permitted where its domain demonstrates a concrete need; its existence does not by itself justify a system-wide Reference registry. What remains justified at the cross-cutting level is the **minimal shared definition and normative rules in §1–§9** — nothing heavier.

**\[CURRENT POSITION\]** This document is a `REGISTERABLE GOVERNED DOCUMENT` with `Document Tier: Non-tiered / Cross-cutting`, consistent with Root Documentation Structure §5 and §10.1. It applies across Root, Tier 1, and Tier 2 without belonging to any tier and does not constitute a fourth Root document class.

**\[OPEN — architectural formalization only\]** Root Level Architecture §5 still defines only the three Root document classes and does not define a general cross-cutting document category or boundary. Whether Root Level Architecture should eventually formalize such a category remains unresolved. That question is narrower than this document's operational placement, which is already established above, and any resolution would be an architectural change processed through Root Governance §6. This document does not presume that outcome.

---

## 11. Open Questions / Unresolved Decisions

1. **Should Root Level Architecture formally define a cross-cutting document category or boundary?** The Reference Model's current placement is already resolved operationally: it is a governed non-tiered/cross-cutting document under Root Documentation Structure §5 and §10.1, applicable across Root, Tier 1, and Tier 2 without belonging to any tier. What remains open is whether Root Level Architecture should explicitly formalize that category. If pursued, this is an architectural change and must follow Root Governance §6. Additional governed cross-cutting documents would constitute evidence for deliberately revisiting the architecture rather than accumulating implicit exceptions.
2. **Typed References for specific scopes (§3).** Left to the applicable Tier 1 system-level authority or Tier 2 Domain/Project authority if and when a concrete need arises; no cross-cutting taxonomy is established here.
3. **Freshness review for high-stakes References (§7)** — e.g., medical, regulatory, or legal sources that may change. Active health-related Tier 2 work means this question now warrants a separate evidence-based governance review. Whether a cross-cutting periodic-review rule or cadence is justified remains open; this document does not establish one by implication.

---

*End of Document — Content OS Reference Model v1.13 (CANONICAL)*
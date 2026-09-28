---
document_name: "KDS Satu Hati Sulawesi Utara — Research Source List"
document_class: "Domain/Project-Level Knowledge Document"
structural_classification: "Tiered — Document Tier: Domain/Project (Tier 2) — KDS Satu Hati Sulawesi Utara"
system: "Content OS → KDS Satu Hati Sulawesi Utara"
owner: "[OPERATIONAL DEFAULT] Document creator under KDS Project Architecture §0 until formally reassigned"
related_issue: "BUS-100"
universal_identifier: "DIUA-DIC-000034"
version: "1.7"
status: "CANONICAL"
depends_on:
  - id: "DIUA-DIC-000032"
    name: "KDS Satu Hati Sulawesi Utara — Project Architecture"
    version: "1.10"
    status: "CANONICAL"
  - id: "DIUA-DIC-000003"
    name: "Content OS — Root Documentation Structure"
    version: "2.5"
    status: "CANONICAL"
  - id: null
    name: "Content OS — Universal Identifier Registry"
    status: "CANONICAL"
source_representation:
  platform: "Linear"
  locator: "https://linear.app/bussiness-content-os/document/kds-satu-hati-sulawesi-utara-research-source-list-v17-canonical-3efc62903341"
representation_profile: "DIUA-DIC-000026@1.3"
---
# KDS Satu Hati Sulawesi Utara — Research Source List

## Document Identity

| Field | Value |
| -- | -- |
| Document Name | KDS Satu Hati Sulawesi Utara — Research Source List |
| Document Class | Domain/Project-Level Knowledge Document |
| System | Content OS → KDS Satu Hati Sulawesi Utara |
| Version | 1.7 |
| Status | **CANONICAL** — v1.7 amended 2026-09-26: synchronized Project Architecture v1.10 after Psychology Series became a recursive Tier-2 sub-project. Research criteria and source-register state are unchanged. Previously v1.6. |
| Related Issue | [BUS-100](https://linear.app/bussiness-content-os/issue/BUS-100/kds-satu-hati-sulawesi-utara-research-source-list) — KDS Satu Hati Sulawesi Utara — Research Source List |
| Owner | **\[OPERATIONAL DEFAULT\]** Document creator under KDS Project Architecture §0 until formally reassigned |
| Structural Classification | Tiered — Document Tier: Domain/Project (Tier 2) — KDS Satu Hati Sulawesi Utara |
| Universal Identifier (UNIS/DIC) | `DIUA-DIC-000034` — ALLOCATED — ACTIVE |
| Depends On | KDS Satu Hati Sulawesi Utara — Project Architecture (v1.10, CANONICAL); Content OS — Root Documentation Structure (v2.5, CANONICAL); Universal Identifier Registry (current CANONICAL) |
| Consuming / Lateral Authorities | KDS Production SOP — current CANONICAL; KDS QA Document — current CANONICAL |
| Allocation Evidence | CONTENT-OS-ALLOC-034 in Universal Identifier Registration Record v1.26 |
| Structural Reference | [BUS-26](../sdoh/DIUA-DIC-000009_SDOH-Research-Source-List.md) — Satu Dosis Obat Hati — Research Source List; source-record and claim-coverage structure only |

## 0. Governance and Authority

This document inherits the KDS Tier 2 governance model defined in KDS Project Architecture §0.

It owns project-level rules for:

* identifying which externally verifiable claims require evidence;
* determining acceptable source classes;
* recording exact source locators;
* recording what part of a source was actually accessed;
* mapping claims to supporting sources;
* recording limitations and non-supported claims;
* maintaining source freshness and re-verification state.

It does **not** own copywriting, caption style, visual design, format mechanics, asset identity, publication approval, or general QA.

## 1. Purpose

The purpose of this Research Source List is to prevent KDS content from treating a familiar organization, website, article, social post, or AI-generated summary as sufficient evidence merely because it appears credible.

Evidence is **claim-scoped**.

A source is usable only for the claims and context that the source actually supports.

## 2. When Research Evidence Is Required

Research/source routing is required when KDS content makes externally verifiable claims, including when applicable:

* health, treatment, prevention, transmission, testing, medication, adherence, side-effect, or clinical claims;
* epidemiological, statistical, prevalence, incidence, or population claims;
* public-policy, legal, regulatory, eligibility, or program claims;
* service availability, operating hours, contact, location, referral-pathway, or access claims;
* psychological, behavioral, or mental-health claims;
* scientific or technical claims;
* historical or event-date claims presented as fact;
* factual claims about external organizations or institutions.

Research evidence is generally **not** required solely for:

* clearly labeled personal reflection;
* original non-factual motivational language;
* questions intended for engagement that do not imply a factual premise;
* KDS's own approved internal facts such as an event time or organizational announcement, when those facts are sourced from the responsible KDS operational authority.

If apparently reflective content embeds an external factual claim, that claim still requires evidence.

## 3. Evidence Source Classes

The classes below describe **source function and normal preference for a claim type**, not a universal ranking of truth.

A Class A source is not automatically stronger than a Class B source for every question. For example, an official program page may be the best authority for that program's current access rules, while a systematic review may be the better authority for a scientific effect estimate.

Source selection must match the source's mandate, methodology, population, jurisdiction, date, and the exact claim being made.

### Class A — Primary / Governing or First-Party Operational Authority

Preferred for claims within its mandate:

* government ministries, agencies, official public-health programs, or regulators;
* international normative bodies and official guidance;
* official laws, regulations, circulars, technical guidance, or program documents;
* first-party service-provider information for the provider's own current services.

Class A is normally preferred for current policy, legal/regulatory text, official guidance within the issuing body's mandate, program rules, and first-party service facts.

### Class B — High-Quality Research / Professional Guidance

Examples:

* peer-reviewed systematic reviews;
* meta-analyses;
* clinical or public-health guidelines from recognized professional bodies;
* high-quality peer-reviewed primary research when broader synthesis is unavailable.

Class B is normally preferred for scientific effect, association, clinical, or psychosocial claims when research evidence is the appropriate authority for the question.

### Class C — Authoritative Secondary / Educational Source

Examples:

* evidence-based educational resources from recognized health, academic, or professional institutions;
* reputable evidence summaries that clearly identify their source basis.

Class C can support explanatory content but must not be treated as equivalent to primary research, legal text, or governing guidance where that distinction matters.

### Class D — Context / Discovery

Examples:

* news coverage;
* general media;
* blogs;
* unsourced educational pages;
* social-media posts;
* community discussion;
* search snippets.

Class D may help discover a topic, identify a public claim, or locate stronger evidence. It must not be treated as sufficient merely because it is recent or widely repeated. For health, clinical, legal, policy, statistical, or other consequential claims, use an authority appropriate to the claim unless the content is explicitly about what the Class D source itself reported or stated.

### Non-source

The following are not evidence authorities by themselves:

* AI model output;
* generated summaries;
* memory from previous chats;
* unattributed screenshots;
* claims copied from other KDS/CWC/SDOH content without the original evidence;
* popularity, virality, or repeated online repetition.

## 4. Source Record Schema

Every governed source used to support a claim should be recorded with enough precision to reproduce what was checked.

Minimum record fields:

| Field | Requirement |
| -- | -- |
| Locator | Local source locator, e.g. `KDS-SRC-001`; locator is not a DIUA-DIC document identifier |
| Source title | Exact title or official document/page name |
| URL / document locator | Direct locator to the source actually examined |
| Author / organization | Responsible authoring body |
| Source class | Class A / B / C / D |
| Publication / revision date | If available |
| Accessed / verified date | Date KDS checked the source |
| Access scope | Full text, abstract, summary, specific section, official page, etc. |
| Applicable population / jurisdiction | Where relevant |
| Supported claim(s) | Narrow factual propositions the source supports |
| Limitations | What the source does not establish |
| Freshness class | Stable / update-sensitive / operationally volatile |
| Source state | VERIFIED / PARTIAL / UNVERIFIED / RETIRED |

A source record must not say "verified" when only the title, snippet, citation, abstract, or metadata was accessed. The actual access scope must be recorded.

### Locator lifecycle

A `KDS-SRC-###` locator identifies one governed source record and must not be reassigned to an unrelated source.

* Locators are never reused after retirement.
* Minor locator/URL corrections may remain within the same record when the underlying source identity is unchanged.
* When a materially new edition, guideline version, dataset release, or replacement document supersedes the prior evidence object, create a new source record and mark the previous record **RETIRED** or otherwise link it to its successor.
* Historical claim evidence must remain traceable to the source version actually reviewed at the time.

## 5. Source States

### VERIFIED

The relevant source content was actually accessed to the recorded scope and remains usable as an evidence object. Whether it supports a specific proposed claim is determined separately through Claim Coverage Status.

### PARTIAL

Only part of the evidence was accessible or verified, such as an abstract, official summary, metadata record, or incomplete document section.

PARTIAL records may contribute only evidence actually visible in the accessed material. Any specific claim still requires a separate Claim Coverage Status decision.

### UNVERIFIED

A source has been identified but has not been examined sufficiently to support a claim.

UNVERIFIED sources must not be used as evidence for publication.

### RETIRED

The source is superseded, obsolete, materially changed, withdrawn, or no longer appropriate for active claim support.

Historical use may remain recorded, but new content must not rely on the retired source.

### Source state is not claim status

`VERIFIED` means the recorded source content was actually accessed to the stated scope. It does **not** mean every statement in that source is automatically suitable for KDS use, and it does not mean every claim citing that source is **SUPPORTED**.

Source state and claim coverage status are separate decisions:

* **source state** answers whether the evidence object was actually inspected and remains usable;
* **claim coverage status** answers whether that evidence supports the specific wording being proposed.

## 6. Claim Coverage Model

Evidence is recorded at the **claim level**, not the document/domain level.

For every evidence-dependent claim, production should be able to answer:

1. What exactly is being claimed?
2. Which source record supports it?
3. What population, jurisdiction, timeframe, or context does that evidence apply to?
4. What limitation prevents overstatement?
5. Is the source current enough for this claim?

A source supporting one claim does not validate an entire caption, slide, script, article, or campaign.

A source organization's general reputation does not validate every page or claim on its domain.

## 7. Claim Coverage Status

A claim may be assigned:

* **SUPPORTED** — adequate evidence is mapped and limitations are respected.
* **PARTIALLY SUPPORTED** — evidence supports only part of the proposed wording; copy must be narrowed before publication.
* **UNSUPPORTED** — no adequate evidence is mapped.
* **CONFLICTED** — credible sources materially disagree or apply to different contexts and the conflict has not yet been resolved.
* **OUTDATED** — evidence is no longer sufficiently current for the intended claim.

Only **SUPPORTED** claims may pass the research gate without revision.

A **CONFLICTED** evidence base must not be flattened into a false single answer. If the intended content is specifically to communicate uncertainty, disagreement, or context-dependent guidance, the final wording may pass only after that narrower uncertainty/disagreement claim itself is adequately supported and classified **SUPPORTED**.

## 8. Freshness and Re-Verification

Freshness depends on the kind of claim.

### Stable

Examples include mature definitions or established concepts whose authoritative source has not materially changed.

Re-verify when:

* a source is revised or superseded;
* a materially newer guideline changes the interpretation;
* an audit identifies uncertainty;
* the claim is expanded beyond the original evidence.

### Update-sensitive

Examples include current guidance, epidemiology, eligibility rules, program policy, or evolving clinical recommendations.

Before publication, verify:

* that the cited version is still current;
* that the date and applicable population/jurisdiction are explicit where needed;
* that no newer authority supersedes the record.

### Operationally volatile

Examples include:

* clinic/service availability;
* opening hours;
* appointment or referral process;
* local contacts;
* event schedules;
* current local program access.

These should be checked against the responsible first-party authority as close as practical to publication or action, because a previously correct source may no longer be operationally correct.

This document does not impose one universal expiry duration for all source types.

## 9. Local and Service Information

Local/service claims require special handling because they can be both factual and rapidly changing.

Preferred authority:

1. responsible service provider or institution;
2. responsible government/program authority;
3. another current first-party operational source.

A third-party directory, old poster, repost, or historical KDS message must not be treated as current service authority without confirmation.

When a service claim could cause a person to travel, seek care, contact a provider, or make a health decision, the operational detail should be rechecked before publication approval.

## 10. Health and Clinical Claims

Health-related content must not convert a source into stronger claims than it actually supports.

Do not infer:

* diagnosis from general educational material;
* treatment recommendations from non-clinical summaries;
* guaranteed outcomes from associations or average effects;
* universal applicability from a narrow study population;
* absence of risk because a source does not mention a risk;
* current clinical guidance from an outdated source.

Where authoritative guidance and individual clinical care may differ, content should preserve that boundary rather than presenting generalized education as individualized medical advice.

## 11. Statistics and Epidemiology

Statistical claims must retain enough context to prevent false generalization.

Record where applicable:

* measurement year or period;
* geography;
* population;
* numerator/denominator or metric definition;
* source institution;
* whether the value is estimate, surveillance count, survey result, or model output.

Do not present one location, population, or historical period as directly representative of another without evidence.

## 12. Quotes, Lived Experience, and Community Narratives

A personal statement or lived-experience account can serve as evidence that the person expressed or experienced something.

It does **not** by itself establish:

* prevalence;
* causation;
* treatment effectiveness;
* medical safety;
* population-wide experience;
* policy or service availability.

Consent, privacy, attribution, and publication rights are separate requirements and remain subject to applicable KDS operations and QA.

## 13. Research Routing into Production

Production SOP Stage 2 invokes this document when evidence is required.

The minimum routing logic is:

**Claim identified → source located → source accessed → source record created/updated → claim mapped → limitation recorded → coverage status determined → production wording checked against supported claim**

If later drafting or revision introduces a new or materially changed claim, Production SOP re-entry applies and the new claim must be checked again.

## 14. Evidence Record for Content

Until a Content Register is justified, claim evidence may be recorded in the relevant production issue, QA evidence, or another explicit content-instance record.

At minimum, retain:

* final claim wording or a stable claim description;
* source locator(s);
* coverage status;
* verification date;
* material limitation;
* reviewer or validation record where applicable.

Do not create a new permanent registry solely to hold evidence if the existing content record is sufficient.

## 15. Current Source Register

As of this document's current version, **no external source is yet registered as VERIFIED KDS evidence authority**.

This is deliberate.

The initial document establishes the governance and record structure first. Specific sources will be added only after the actual source is examined and its supported claims, access scope, limitations, and freshness requirements are recorded.

Therefore:

* KDS content may identify candidate sources during research;
* candidate sources do not become VERIFIED merely by being named here or elsewhere;
* evidence-dependent claims remain blocked until adequate source records and claim coverage exist.

## 16. Source Register Template

| Locator | Source / direct locator | Organization / author | Class | Date / version | Verified on | Access scope | Supported claim(s) | Limitations | Freshness | State |
| -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- |
| — | No VERIFIED source records yet | — | — | — | — | — | — | — | — | — |

## 17. Maintenance Rules

Update a source record when:

* the source is materially revised;
* a newer version supersedes it;
* the direct locator changes;
* access scope improves or degrades;
* a limitation is discovered;
* a new claim needs coverage;
* the applicable population/jurisdiction changes;
* the source is withdrawn or no longer authoritative for the mapped claim.

Do not silently broaden a source record's supported claims.

A new claim requires a new mapping decision even if it cites an existing source.

## 18. Boundary with QA

This document determines whether research evidence adequately supports a claim.

**KDS QA Document (CANONICAL)** determines whether the final artefact satisfies the applicable quality gate, including whether the final copy stayed within approved claim boundaries.

Research support does not automatically mean an artefact passes QA.

QA does not replace missing research support.

## 19. Open Decisions

This document intentionally does not yet define:

* a fixed mandatory list of HIV/health source organizations;
* a universal evidence quantity requirement such as "two sources per claim";
* a universal source-expiry period;
* a content-instance evidence database;
* source rules specific to a future campaign or format;
* a formal citation style for public-facing captions.

Those should be introduced only when actual production requirements justify them.

## 20. Lifecycle Status

**Current document state:** CANONICAL v1.7 (originally approved as v1.0 on 2026-09-23; see Change Records below for subsequent amendments).

Canonicalization followed the governance model inherited from KDS Project Architecture §0.

The v0.2 audit remediation replaced universal source ranking with claim-matched source classes, separated source-state from claim-support decisions, added conflicted-evidence handling, established non-reusable source-locator lifecycle rules, and narrowed Class D use.

**Canonicalization record — 2026-09-23:** final critical review found no blocking authority conflict. The final ambiguity in VERIFIED/PARTIAL source-state definitions was removed so claim support remains exclusively determined through Claim Coverage Status.

Canonicalization approves the **research governance and record structure** only. It does not certify any external evidence source. The Current Source Register remains intentionally empty until individual sources are actually examined and registered.

---

**Operating rule:** verify the claim, not the reputation of the source.

## 21. Audit Record — 2026-09-23

**Audit disposition:** CONDITIONAL PASS — v0.2 is remediated and ready for final critical review; it remains DRAFT.

### Remediated findings

* **A1 — universal-ranking ambiguity:** the former Tier A/B/C/D hierarchy could be misread as a universal quality ranking. Reframed as source **classes** whose suitability depends on the exact claim, mandate, methodology, population, jurisdiction, and date.
* **A2 — source-state / claim-status collision:** clarified that a VERIFIED source only records what was actually accessed; it does not automatically make a claim SUPPORTED.
* **A3 — conflicted-evidence handling:** clarified that genuine uncertainty or disagreement must not be flattened. A publication may communicate uncertainty only when the narrower uncertainty/disagreement wording is itself supported.
* **A4 — locator lifecycle gap:** added non-reuse and successor rules for `KDS-SRC-###` records so superseded evidence cannot silently overwrite historical provenance.
* **A5 — Class D overbreadth:** clarified that contextual/discovery sources may evidence what they themselves reported, but consequential substantive claims still require an authority appropriate to the claim.

### Conformance result

* Project Architecture research-authority boundary: **PASS**.
* Production SOP Stage 2 routing and re-entry: **PASS**.
* QA boundary: **PASS**.
* Copy/format/asset authority separation: **PASS**.
* Identifier `DIUA-DIC-000034`: **valid / active**.
* Current source register remains intentionally empty of VERIFIED external sources.
* No additional subsystem introduced by this audit.

### Remaining gate

Final critical review and explicit approval are required before promotion to CANONICAL.

## 22. Final Critical Review & Approval — 2026-09-23

**Disposition:** PASS

### Review scope

The final review verified:

* conformance with KDS Project Architecture v1.0;
* conformance with Production SOP Stage 2 research routing and re-entry;
* source-state / claim-coverage separation;
* source-class semantics;
* freshness and re-verification logic;
* local/service information handling;
* health/statistical overclaiming boundaries;
* locator lifecycle and historical traceability;
* QA/copy/format/asset authority separation;
* identifier validity and allocation evidence;
* absence of unverified evidence promotion.

### Final findings

* No blocking research-governance conflict remains.
* DIUA-DIC-000034 is valid and active.
* Allocation evidence CONTENT-OS-ALLOC-034 is present.
* No external source is certified merely by this document becoming canonical.
* VERIFIED/PARTIAL source states no longer make an implicit claim-support decision.
* Claim Coverage Status remains the sole research decision for whether proposed wording is supported.
* No additional KDS subsystem was introduced by this review.

### Approval

**Owner decision:** APPROVED.

**Canonical state:** **KDS Satu Hati Sulawesi Utara — Research Source List v1.0 CANONICAL**

**Effective date:** 2026-09-23

Future source additions and governance changes must preserve claim-scoped evidence, explicit limitations, access scope, freshness state, and historical traceability.

## 23. Change Record — v1.1 — 2026-09-25

**Change type:** Editorial / corrective. No change to research-governance criteria or authority boundaries.

**Changes:**

* §18 — corrected a stale inline citation: "KDS QA Document v1.0 CANONICAL" updated to "KDS QA Document v1.2 CANONICAL".
* §20 — updated the Lifecycle Status self-reference, which had stayed at "CANONICAL v1.0"; removed the now-superseded 2026-09-25 dependency-sync paragraph, folded into the header Depends-On update below.
* Header — Project Architecture and Production SOP dependency versions synced to v1.2 and v1.3 respectively.

**Basis:** documentation audit conducted 2026-09-25; correction directed by Owner instruction ("bereskan semua", 2026-09-25).

**Version:** 1.0 → 1.1.

**Approval:** Owner-directed correction. No research-governance blocker identified.

## 24. Change Record — v1.2 — 2026-09-25

**Change type:** Editorial / corrective. No change to research-governance criteria or authority boundaries.

**Changes:**

* §18 — switched the inline QA Document citation from a pinned version number ("v1.2 CANONICAL") to a version-agnostic "(CANONICAL)" form, matching the same fix applied to Project Architecture and Production SOP for the same recurring-staleness reason.
* §20 — updated the Lifecycle Status self-reference.

**Basis:** documentation audit conducted 2026-09-25; correction directed by Owner instruction ("Ya bereskan juga ini", 2026-09-25), extended for citation-style consistency.

**Version:** 1.1 → 1.2.

**Approval:** Owner-directed correction. No research-governance blocker identified.

## 25. Change Record — v1.3 — 2026-09-25

**Change type:** Editorial / corrective. No change to research-governance criteria or authority boundaries.

**Changes:**

* §15 — removed the stale version-tied framing "At canonicalization v1.0", which could mislead a reader into thinking the empty source register was a historical v1.0-only condition rather than the current state.
* §20 — updated the Lifecycle Status self-reference.
* Header — Project Architecture and Production SOP dependency versions synced.

**Basis:** documentation audit conducted 2026-09-25; correction directed by Owner instruction ("Bereskan semuanya", 2026-09-25).

**Version:** 1.2 → 1.3.

**Approval:** Owner-directed correction. No research-governance blocker identified.

---

## 26. Change Record — v1.4 — 2026-09-26

**Change type:** Dependency-model / lateral-pointer stability reconciliation.

**Decision:** KDS Production SOP is a consuming workflow that invokes this Research Source List at Stage 2; it is not a formal definitional upstream dependency of Research governance.

**Changes:**

* removed Production SOP from version-pinned `Depends On`;
* added Production SOP and QA as current consuming/lateral authorities;
* synchronized Project Architecture to v1.7;
* synchronized Universal Identifier Registry to v1.38.

**Effect:** breaks the former Research ↔ SOP version cycle. Source taxonomy, claim coverage, source state, freshness, and evidence rules are unchanged.

---

## 27. Change Record — v1.5 — 2026-09-26

**Change type:** Upstream dependency synchronization.

* Project Architecture: v1.7 → v1.8.
* Universal Identifier Registry: v1.38 → v1.39.

No source taxonomy, source state, claim coverage, freshness, or evidence rule changed. The external source register remains unchanged.

---

## Change Record — v1.6 — 2026-09-26

**Change type:** upstream dependency synchronization only.

* Project Architecture: v1.8 → **v1.9 CANONICAL**.
* Universal Identifier Registry: v1.39 → **v1.43 CANONICAL**.
* Psychology Series Layout Bible and Reference Sheet canonicalization does not change research ownership, source classes, claim-support semantics, freshness rules, or evidence-readiness requirements.

**Version:** 1.5 → 1.6.

---

## Change Record — v1.7 — 2026-09-26

**Change type:** upstream structural-dependency synchronization only.

* Project Architecture: v1.9 → **v1.10 CANONICAL**.
* Psychology Series is now a recursive Tier-2 sub-project, but research authority remains inherited from this parent KDS Research Source List.
* No source class, verification rule, claim-support rule, freshness rule, or source record changed.

**Version:** 1.6 → 1.7.
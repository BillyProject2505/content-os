---
document_name: "Satu Dosis Obat Hati — Production SOP"
document_class: "Domain/Project-Level Operational Document"
structural_classification: "Tiered — Document Tier: Domain/Project (Tier 2) — Satu Dosis Obat Hati"
system: "Content OS → Satu Dosis Obat Hati (SDOH)"
owner: "[OPERATIONAL DEFAULT] (Root Documentation Structure §5.1) Not yet formally assigned. Defaults to the document's creator."
related_issue: "BUS-25"
universal_identifier: "DIUA-DIC-000008"
version: "1.40"
status: "CANONICAL"
depends_on:
  - id: "DIUA-DIC-000007"
    name: "Satu Dosis Obat Hati — Project Architecture"
    version: "1.13"
    status: "CANONICAL"
  - id: "DIUA-DIC-000009"
    name: "Satu Dosis Obat Hati — Research Source List"
    version: "1.14"
    status: "CANONICAL"
  - id: "DIUA-DIC-000010"
    name: "Satu Dosis Obat Hati — QA Document"
    version: "1.31"
    status: "CANONICAL"
  - id: "DIUA-DIC-000011"
    name: "Satu Dosis Obat Hati — Asset Registry"
    version: "1.28"
    status: "CANONICAL"
source_representation:
  platform: "Linear"
  locator: "https://linear.app/bussiness-content-os/document/sdoh-production-sop-v139-canonical-26f309a02c49"
representation_profile: "DIUA-DIC-000026@1.3"
---
## Document Identity

| Field | Value |
| -- | -- |
| Document Name | Satu Dosis Obat Hati — Production SOP |
| Document Class | Domain/Project-Level Operational Document |
| System | Content OS → Satu Dosis Obat Hati (SDOH) |
| Version | 1.39 |
| Active Sage Carousel Invocation | `Produksi Sage Carousel` — **OWNER-LOCKED**; supersedes `Produksi Sage Carousel baru.` without changing workflow semantics |
| Active Burgundy Carousel Invocation | `Produksi Burgundy Carousel` — **OWNER-LOCKED**; supersedes `Produksi Burgundy Carousel baru.` without changing workflow semantics |
| Active Sage Reels Invocation | `Produksi Sage Reels` — **OWNER-LOCKED** |
| Active Burgundy Reels Invocation | `Produksi Burgundy Reels` — **OWNER-LOCKED** |
| Default Reels Format Profile | approximately 30 seconds; 5 static image slides; narration complements and expands the visual text rather than reading it verbatim |
| Active Sage Reels Invocation | `Produksi Sage Reels` — **OWNER-LOCKED**; canonical short-form alias for the complete Sage Reels production workflow |
| Active Burgundy Reels Invocation | `Produksi Burgundy Reels` — **OWNER-LOCKED**; canonical short-form alias for the complete Burgundy Reels production workflow |
| Status | **CANONICAL** — amended to v1.40 (2026-09-29): reconciled active authority-resolution instructions with the current Content OS storage model: GitHub `main` is authoritative for governed text after per-document cutover; Linear remains authoritative for governed text not yet cut over and remains the execution/work-management surface; Google Drive remains the binary/image authority. Historical status/change records are preserved as historical evidence. No theme semantics, format mechanics, renderer behavior, QA criteria, Owner gates, or publication lifecycle semantics changed. Prior state: **CANONICAL** — amended to v1.39 (2026-09-22): Owner-locked a temporary September 2026 caption commemoration pattern across all active SDOH formats. The fixed line is placed immediately below `satu dosis obat hati` and above hashtags for remaining September publications; already-published posts are not silently rewritten. This does not redefine WHO/IASP terminology. Prior state: **CANONICAL** — amended to v1.38 (2026-09-20): synchronized active dependencies to Research Source List v1.14 and QA Document v1.31 after suicide-prevention source-governance remediation. Workflow semantics, production aliases, format mechanics, copy/caption rules, binary policy, Owner gates, and publication governance are unchanged. Prior state: **CANONICAL** — amended to v1.37 (2026-09-20): Owner migrated SDOH active production binaries to **Google Drive only**. Production now resolves exact Google Drive file IDs from Linear authority, raw-fetches bytes, independently verifies SHA-256, and fails closed on missing/mismatch/unverifiable binaries. Dropbox is retired as an active production source and retained only as historical provenance. Production aliases, theme semantics, format mechanics, renderer behavior, copy/caption approval gates, and publication governance are unchanged. Prior state: **CANONICAL** — amended to v1.36 (2026-09-14): Owner established the default Reels format profile as approximately 30 seconds using five static image slides, with narration functioning as a complementary storytelling layer rather than a verbatim reading of on-screen text. Voice-first timing remains authoritative; the target duration is approximate rather than a forced exact runtime. Existing locked Reel masters remain valid historical reference implementations and are not retroactively invalidated. Prior state: **CANONICAL** — amended to v1.35 (2026-09-13): Owner-locked `Produksi Sage Reels` and `Produksi Burgundy Reels` as canonical operational aliases for the complete Reels production workflow. Each alias dynamically resolves the current canonical project authority, routes to [BUS-45](https://linear.app/bussiness-content-os/issue/BUS-45/satu-dosis-obat-hati-sage-reels-production)/[BUS-46](https://linear.app/bussiness-content-os/issue/BUS-46/satu-dosis-obat-hati-burgundy-reels-production), checks the applicable Reels Content Register and cross-format duplication evidence, allocates/confirms the next theme-specific Reel ID, develops theme-conformant script/copy, applies narrated voice-first routing when applicable, resolves only registered reusable assets through the active Asset Registry and verified persistent binaries, assembles the Reel under the applicable Reels production lane, runs [BUS-27](DIUA-DIC-000010_SDOH-QA-Document.md) QA, drafts the caption under the shared project-level caption architecture, and stops at required Owner approval gates. READY and PUBLISHED remain separate lifecycles; publication is never implied by the alias. The Sage approved Drive package may be used as verified instance evidence/reference implementation but is not a universal fixed template; Burgundy has no approved Drive package yet and must fail closed rather than infer one. This amendment adds command-interface ergonomics only and does not redefine theme semantics, Reels layout/voice rules, asset identity, QA criteria, or publication governance. Prior state: **CANONICAL** — amended to v1.34 (2026-09-13): Owner changed the canonical Burgundy Carousel production alias from `Produksi Burgundy Carousel baru.` to `Produksi Burgundy Carousel`. The shorter alias preserves the same complete deterministic production contract and dynamically resolves current authority; the former phrase remains historical evidence and is no longer the active canonical Burgundy Carousel invocation. Prior state: **CANONICAL** — amended to v1.33 (2026-09-13): Owner changed the canonical Sage Carousel production alias from `Produksi Sage Carousel baru.` to `Produksi Sage Carousel`. The shorter alias preserves the same complete deterministic production contract and dynamically resolves current authority; the former phrase remains historical evidence and is no longer the active canonical Sage Carousel invocation. Prior state: **CANONICAL** — amended to v1.32 (2026-09-13): Owner-locked `Produksi Sage Poster baru.` and `Produksi Burgundy Poster baru.` as canonical operational aliases for the complete TikTok Poster production workflow. Each alias dynamically resolves current canonical Linear authority, checks the applicable Poster Content Register and cross-format duplication, allocates the next theme-specific Poster ID, develops theme-conformant copy, selects only registered reusable assets where applicable, resolves registry-recorded persistent binaries and verifies them through the approved path, renders under [BUS-52](https://linear.app/bussiness-content-os/issue/BUS-52/satu-dosis-obat-hati-sage-tiktok-poster-production) shared Sage Poster mechanics or [BUS-53](https://linear.app/bussiness-content-os/issue/BUS-53/satu-dosis-obat-hati-burgundy-tiktok-poster-production) Burgundy deterministic deltas, runs [BUS-27](DIUA-DIC-000010_SDOH-QA-Document.md) QA, drafts caption under the project-level caption architecture, and stops at required Owner approval gates. READY and PUBLISHED remain separate lifecycles; publication is never implied by the production alias. This amendment adds command-interface ergonomics only and does not redefine theme semantics, Poster mechanics, asset identity, QA criteria, or publication governance. Prior state: **CANONICAL** — amended to v1.31 (2026-09-13): synchronized current dependencies to Project Architecture v1.13, Research Source List v1.12, QA Document v1.28, and Asset Registry v1.26 after the cross-document conformance sweep; corrected the active Carousel routing text from stale [BUS-49](https://linear.app/bussiness-content-os/issue/BUS-49/satu-dosis-obat-hati-carousel-master-template-system) v0.4.0 to the current canonical v0.6.0 authority. Workflow stages, theme semantics, production aliases, caption architecture, renderer guard, and publication requirements are unchanged. Prior state: **CANONICAL** — amended to v1.30 (2026-09-13): synchronized current dependencies after Research Source List v1.11, QA Document v1.27, and Asset Registry v1.25; result CONFORMANT. Workflow stages, active-format routing, production aliases, caption architecture, renderer guard, and publication requirements are unchanged. Prior state: **CANONICAL** — amended to v1.29 (2026-09-13): activated TikTok Poster in the project-level operational workflow following Project Architecture v1.12, [BUS-52](https://linear.app/bussiness-content-os/issue/BUS-52/satu-dosis-obat-hati-sage-tiktok-poster-production)/[BUS-53](https://linear.app/bussiness-content-os/issue/BUS-53/satu-dosis-obat-hati-burgundy-tiktok-poster-production) production-rule validation, and QA Document v1.26. Poster now participates in theme/format selection, draft routing, visual routing, review, and the shared project-level caption architecture. Sage Poster routes to [BUS-52](https://linear.app/bussiness-content-os/issue/BUS-52/satu-dosis-obat-hati-sage-tiktok-poster-production); Burgundy Poster routes to [BUS-53](https://linear.app/bussiness-content-os/issue/BUS-53/satu-dosis-obat-hati-burgundy-tiktok-poster-production) deterministic deltas. Poster-specific geometry and numeric metrics remain owned by those lanes and are not restated here. Prior state: **CANONICAL** — amended to v1.28 (2026-09-12): Owner-directed cross-format caption parity. Carousel and Reels now explicitly use the same project-level caption architecture, while Sage and Burgundy retain their different semantic branches. Added the shared footer/signature baseline `satu dosis obat hati`, preserved the fixed five hashtags, and clarified that format does not create a separate caption formula unless an explicit future exception is approved. No visual, renderer, voice, theme-semantic, or publication rule changed. Prior state: **CANONICAL** — amended to v1.27 (2026-09-12): conformance sync to SDOH QA Document v1.24 after provider-neutral asset-verification gates were updated. The v1.26 Owner-locked Sage/Burgundy Carousel invocation aliases remain unchanged; this amendment only synchronizes the active QA dependency and preserves current-canonical [BUS-49](https://linear.app/bussiness-content-os/issue/BUS-49/satu-dosis-obat-hati-carousel-master-template-system) / registry-recorded persistent-binary routing. Prior state: **CANONICAL** — amended to v1.26 (2026-09-12): Owner-locked parallel short-form production invocations `Produksi Sage Carousel baru.` and `Produksi Burgundy Carousel baru.` as canonical operational aliases for deterministic Carousel production. Both aliases must resolve the **current canonical** Linear authority dynamically rather than hard-code a historical master version, use the provider-neutral persistent-store location recorded by the active Asset Registry, verify exact binaries through the approved verification path, render only through the current canonical [BUS-49](https://linear.app/bussiness-content-os/issue/BUS-49/satu-dosis-obat-hati-carousel-master-template-system) master, run applicable hard QA gates, and keep publication as a separate Owner-approved action. Prior state: **CANONICAL** — amended to v1.25 (2026-09-11): Owner-locked the short-form production invocation `Produksi Sage Carousel baru.` as an operational alias for the complete deterministic Sage Carousel production contract. The shorthand must resolve active authority in Linear, check the applicable Content Register for duplication, allocate/confirm the content ID, develop Sage/Seri Peluk copy under the applicable Carousel lane, present copy for Owner review before final rendering unless explicitly waived, fetch checksum-locked binaries from Dropbox, verify SHA-256, render only through [BUS-49](https://linear.app/bussiness-content-os/issue/BUS-49/satu-dosis-obat-hati-carousel-master-template-system) v0.4.0, execute [BUS-27](DIUA-DIC-000010_SDOH-QA-Document.md) hard gates, and produce provenance/render-report evidence. The shorthand must never be interpreted as a request for generative-image final rendering; missing/mismatched/unverifiable authority or binaries fail closed. This amendment changes invocation ergonomics only and does not change theme semantics, [BUS-49](https://linear.app/bussiness-content-os/issue/BUS-49/satu-dosis-obat-hati-carousel-master-template-system) geometry, renderer mechanics, asset identity, or publication approval requirements. Prior state: **CANONICAL** — amended to v1.24 (2026-09-11): adopted [BUS-49](https://linear.app/bussiness-content-os/issue/BUS-49/satu-dosis-obat-hati-carousel-master-template-system) v0.4.0 as the active Carousel master, added deterministic `text_only` / `illustrated_single_character` routing, and synchronized active dependencies to QA Document v1.23 and Asset Registry v1.20. Production illustration remains renderer-driven and fail-closed; image generation is non-production only. Prior state: **CANONICAL** — amended to v1.23 (2026-09-11): Owner-locked the canonical production asset-resolution workflow and synchronized active dependencies to QA Document v1.22 and Asset Registry v1.19. Linear remains the authority for active asset identity/provenance/checksum; Dropbox is the durable binary store. Each production run must resolve the active record in Linear, fetch the exact binary from Dropbox, independently verify SHA-256, and fail closed on missing/mismatched/unverifiable bytes rather than substituting stale or reconstructed files. No theme semantics, format mechanics, renderer geometry, or publication-approval rules changed. Prior state: **CANONICAL** — amended to v1.22 (2026-09-11): synchronized active dependencies to QA Document v1.21 and Asset Registry v1.18 after the Owner-approved controlled re-canonicalization and durable Dropbox materialization of `SDOH-OBJ-000002` — Sage-on-Burgundy logo source. This is dependency/provenance maintenance only: workflow stages, theme semantics, renderer execution guard, format mechanics, and production approval requirements are unchanged. Prior state: **CANONICAL** — amended to v1.21 (2026-09-11): synchronized active dependencies to QA Document v1.20 and Asset Registry v1.17 after the Owner-approved controlled re-canonicalization and durable Dropbox materialization of `SDOH-OBJ-000008` — Burgundy Paper Texture. This is dependency/provenance maintenance only: workflow stages, theme semantics, renderer execution guard, format mechanics, and production approval requirements are unchanged. Prior state: **CANONICAL** — amended to v1.20 (2026-09-11): synchronized active dependencies to QA Document v1.19 and Asset Registry v1.16 after the Owner-approved controlled re-canonicalization and durable Dropbox materialization of `SDOH-OBJ-000007` — Sage Paper Texture. This is dependency/provenance maintenance only: workflow stages, theme semantics, renderer execution guard, format mechanics, and production approval requirements are unchanged. Prior state: **CANONICAL** — amended to v1.19 (2026-09-11): synchronized active dependencies to QA Document v1.18 and Asset Registry v1.15 after the Owner-approved controlled re-canonicalization of `SDOH-OBJ-000006` and registration of its P01–P08 transparent derivative family. This is compliance/dependency-pointer maintenance only; workflow stages, theme semantics, renderer execution guard, format mechanics, and production approval requirements are unchanged. Prior state: **CANONICAL** — amended to v1.18 (2026-09-11): synchronized active dependencies to QA Document v1.17 and Asset Registry v1.14 after the Owner-approved controlled re-canonicalization of `SDOH-OBJ-000009` and the resulting QA dependency-maintenance amendment. This is a compliance/dependency-pointer maintenance amendment only: workflow stages, theme semantics, renderer execution guard, format mechanics, and production approval requirements are unchanged. Prior state: v1.17, CANONICAL — amended to v1.17 (2026-09-11): added an explicit Carousel Canonical Renderer Execution Guard after a production-test nonconformance showed that generative reconstruction could bypass the intended [BUS-49](https://linear.app/bussiness-content-os/issue/BUS-49/satu-dosis-obat-hati-carousel-master-template-system) execution path. Production Carousel outputs must originate from the canonical [BUS-49](https://linear.app/bussiness-content-os/issue/BUS-49/satu-dosis-obat-hati-carousel-master-template-system) renderer with checksum-resolved inputs; generative image synthesis may be used only for clearly labeled non-production exploration/mockup work; if the canonical renderer or a required locked input is unavailable, production fails closed rather than substituting an approximation. No theme semantics, master geometry, asset identity, or renderer mechanics changed. Prior state: v1.16, CANONICAL — synchronized active Governance and Depends On references to Architecture v1.11, Research Source List v1.10, QA Document v1.15, and Asset Registry v1.12. Added a routing clarification to the existing Reels workflow owner for narrated voice-first production. Editorial/conformance correction under Owner's sequential-remediation instruction; no new format mechanics or production-validation claim. Prior state: v1.15, CANONICAL — amended to v1.15: removed residual project-level Carousel slide-architecture guidance so sequencing is owned entirely by the applicable Carousel production lane; synchronized the QA dependency to v1.14. Prior state: v1.14, CANONICAL — synchronized dependencies to Project Architecture v1.10, Research Source List v1.9, QA Document v1.13, and Asset Registry v1.9 after the active production-format set was narrowed to Carousel + Reels only. Prior state: v1.13, CANONICAL — aligned operational scope with Project Architecture v1.10. The active SDOH production formats are **Carousel and Reels only**; Poster is not currently an operational format and has been removed from workflow, visual-routing, and CTA references until explicitly introduced later. Prior state: v1.12, CANONICAL — synchronized dependencies to QA Document v1.11 and Asset Registry v1.8 after ornament ownership was narrowed to reusable asset identity. Format-specific production lanes own ornament placement, crop, scale, frequency, and requirement. Prior state: v1.11, CANONICAL — synchronized dependencies to Research Source List v1.8 and QA Document v1.10, and made the project-level caption standard theme-adaptive so Burgundy is not forced into Sage-style comfort language. Prior state: v1.10, CANONICAL — removed the stale universal 3-slide on-visual CTA rule. CTA and ending mechanics are explicitly format-specific and follow the applicable Poster, Carousel, or Reels production rules; this resolved the conflict with the locked five-slide Sage Carousel architecture and prevented Carousel-specific mechanics from leaking into other formats. Also synchronized dependency pins to Project Architecture v1.9, QA Document v1.9, and Asset Registry v1.7. Prior state: v1.9, CANONICAL — synchronized production semantics with SDOH Project Architecture v1.7. Sage / Seri Peluk and Burgundy / Seri Jujur are now explicitly treated as cross-format themes whose meaning is owned at project level; Poster, Carousel, and Reels inherit those meanings and apply format-specific execution rules. Also removed the implication that one carousel slide structure or one visual template governs every format. Prior state: v1.8, CANONICAL — amended to v1.8: synced `Depends On` (Research Source List v1.6→v1.7), stale due to that document being amended to add a source-coverage entry for the "Jujur Sama Allah" klaster ([BUS-33](https://linear.app/bussiness-content-os/issue/BUS-33/satu-dosis-obat-hati-jujur-sama-allah-source-coverage-gap-governance) remediation). Compliance update, no substantive content changed. Prior state: v1.7, CANONICAL — amended to v1.7: synced `Depends On` and `Governance` (Project Architecture v1.5→v1.6; Research Source List v1.5→v1.6; QA Document v1.6→v1.7; Asset Registry v1.4→v1.5), stale due to those documents being amended in the current workspace-wide stale-Depends-On sweep ([BUS-25](https://linear.app/bussiness-content-os/issue/BUS-25/satu-dosis-obat-hati-production-sop) extended stale-reference check, full-sweep pass). Compliance update, no substantive content changed. Prior state: v1.6, CANONICAL — amended to v1.6: synced `Depends On` and `Governance` (Project Architecture v1.4→v1.5; Research Source List v1.4→v1.5; QA Document v1.4→v1.6; Asset Registry v1.3→v1.4), stale due to those documents being amended in this same review cycle. Compliance update, no substantive content changed. Prior state: v1.5, CANONICAL — amended to v1.5: (1) added SDOH — Asset Registry to `Depends On` and revised Tahap 4 (Visual) to reference registered asset IDs (`SDOH-OBJ-000001`–`000005`) instead of re-describing them narratively, fulfilling the relationship declared in Asset Registry §4; (2) version-pinned `Research Source List` and `QA Document` in `Depends On` for consistency with Content OS's pinning convention (previously unversioned). Classified as architectural for (1) (adds a declared structural relationship), compliance update for (2). Reviewed against Asset Registry §4 and SDOH Project Architecture (v1.4, CANONICAL) — no conflicts found; Approved and Recorded by Owner. Found via adversarial governance review of this issue ([BUS-25](https://linear.app/bussiness-content-os/issue/BUS-25/satu-dosis-obat-hati-production-sop)). Prior state: v1.4, CANONICAL — amended to v1.4: (1) synced `Depends On`/`Governance` to Project Architecture v1.3→v1.4; (2) removed stale version-pin from `Universal Identifier` field (was citing Registry v1.3, now v1.10), changed to unversioned form matching CWC's pattern. Found via governance audit (Issue #16) extended stale-reference sweep. Compliance update, no substantive content changed. Prior state: v1.3, CANONICAL corrected `Depends On` and `Governance` references to SDOH Project Architecture from stale "v1.0, DRAFT"/"v1.1, CANONICAL" to current v1.3, CANONICAL — the prior text incorrectly implied Project Architecture was still DRAFT, a status error, not just a version lag. Found via governance audit (Issue #16) system-wide stale-Depends-On sweep. Compliance update, no substantive content changed. Prior state: v1.2, CANONICAL re-tagged `Owner` field from `[ASSUMPTION]` to `[OPERATIONAL DEFAULT]` per Root Documentation Structure §5.1, introduced via governance audit (Issue #16) P1 remediation. Compliance update, no substantive content changed. Prior state: v1.1, CANONICAL — promoted from v1.0 DRAFT to v1.1 CANONICAL on 2026-09-03, per SDOH — Project Architecture §0's provisionally-adopted §6 change-control process. |
| Related Issue | [BUS-25](https://linear.app/bussiness-content-os/issue/BUS-25/sdoh-production-sop) — SDOH — Production SOP |
| Owner | \[OPERATIONAL DEFAULT\] (Root Documentation Structure §5.1) Not yet formally assigned. Defaults to the document's creator. |
| Governance | Follows the SDOH-wide provisional adoption of Root Governance's change-control model, declared in SDOH — Project Architecture (v1.13, CANONICAL) §0. |
| Structural Classification | Tiered — Document Tier: Domain/Project (Tier 2) — Satu Dosis Obat Hati |
| Universal Identifier (UNIS/DIC) | `DIUA-DIC-000008` — ALLOCATED, per Content OS's own registry ([BUS-16](../../system/Content-OS-Universal-Identifier-Registry.md) §4) |
| Depends On | SDOH — Project Architecture (v1.13, CANONICAL) for identity, scope, canonical cross-format Sage / Seri Peluk and Burgundy / Seri Jujur theme semantics, active-format scope, and project-level palette ownership; SDOH — Research Source List (v1.14, CANONICAL) for research sourcing; SDOH — QA Document (v1.31, CANONICAL) for the review-stage checklist; SDOH — Asset Registry (v1.28, CANONICAL) for canonical reusable visual-asset identifiers, Google Drive-only active binary locators, checksums, and Sage/Burgundy token lookup. [BUS-49](https://linear.app/bussiness-content-os/issue/BUS-49/satu-dosis-obat-hati-carousel-master-template-system) — Carousel Master Template System (v0.6.0, CANONICAL) for the reusable Carousel renderer/master package, deterministic `text_only` / `illustrated_single_character` modes, Theme Emblem implementation, implementation provenance and fixed/editable contract. Format-specific production issues define execution rules for the active formats, **Carousel, Reels, and TikTok Poster**, without redefining project-level theme meaning. TikTok Poster shared mechanics are owned by [BUS-52](https://linear.app/bussiness-content-os/issue/BUS-52/satu-dosis-obat-hati-sage-tiktok-poster-production) and Burgundy deterministic deltas / Burgundy-specific validation by [BUS-53](https://linear.app/bussiness-content-os/issue/BUS-53/satu-dosis-obat-hati-burgundy-tiktok-poster-production). |

## Tahap 1: Riset & Ide

Sumber ide, quote, atau tema mengikuti SDOH — Research Source List bila mengandung klaim yang perlu sumber. Tentukan terlebih dahulu emotional observation atau truth yang ingin dibawa, lalu klasifikasikan ke theme system SDOH.

Theme meaning tidak ditentukan oleh format. Sage / Seri Peluk dan Burgundy / Seri Jujur berlaku pada tiga format aktif saat ini: **Carousel, Reels, dan TikTok Poster**. Poster memakai project-level theme semantics yang sama dan execution rules format-specific melalui [BUS-52](https://linear.app/bussiness-content-os/issue/BUS-52/satu-dosis-obat-hati-sage-tiktok-poster-production)/[BUS-53](https://linear.app/bussiness-content-os/issue/BUS-53/satu-dosis-obat-hati-burgundy-tiktok-poster-production).

## Tahap 2: Penentuan Theme & Format

Klasifikasikan materi berdasarkan fungsi tematik sebelum memilih format:

* **Sage / Seri Peluk** → **validasi kondisi**; core promise: **“kamu aman.”** Memberi ruang untuk mengenali dan mengizinkan kondisi emosional yang sedang ada tanpa tekanan untuk segera mengubah, menjelaskan, menghadapi, atau menyelesaikannya.
* **Burgundy / Seri Jujur** → **validasi keberanian**; core promise: **“kamu jujur.”** Memvalidasi kejujuran yang membutuhkan keberanian untuk menamai, menghadapi, atau berdiri di dalam truth, luka, batas, konflik, atau ketegangan spiritual yang memiliki bobot emosional lebih besar. Salah satu dari 4 klaster Seri Jujur bila relevan.

Perbedaan Sage dan Burgundy ditentukan oleh **validation mode, emotional weight, dan narrative function**, bukan sekadar inward vs outward.

Setelah theme ditentukan, pilih format aktif yang paling tepat: **Carousel, Reels, atau TikTok Poster**. Format menentukan cara penyampaian, bukan makna theme. Untuk TikTok Poster, Sage mengikuti [BUS-52](https://linear.app/bussiness-content-os/issue/BUS-52/satu-dosis-obat-hati-sage-tiktok-poster-production) dan Burgundy mengikuti [BUS-53](https://linear.app/bussiness-content-os/issue/BUS-53/satu-dosis-obat-hati-burgundy-tiktok-poster-production) deterministic delta.

## Tahap 3: Draft Naskah

Draft mengikuti theme terlebih dahulu, lalu format:

* **Carousel:** susunan multi-slide mengikuti applicable Carousel production lane. Project-level SOP tidak menetapkan slide architecture, jumlah slide, atau progression template.
* **Reels:** gunakan beat structure, pacing, motion, text, dan audio sesuai production rules format-specific yang berlaku. Pilih jalur bernarasi atau tanpa narasi mengikuti [BUS-45](https://linear.app/bussiness-content-os/issue/BUS-45/satu-dosis-obat-hati-sage-reels-production) §12 dan pewarisan Burgundy di [BUS-46](https://linear.app/bussiness-content-os/issue/BUS-46/satu-dosis-obat-hati-burgundy-reels-production). Untuk Reels bernarasi, voice disetujui sebelum timing visual final ditetapkan; urutan rinci tetap dimiliki production lane. Tahap makro SOP ini tidak menggantikan urutan voice-first tersebut.
* **TikTok Poster:** satu frame statis dengan master artwork **4:5 / 1080×1350 px**. Sage mengikuti [BUS-52](https://linear.app/bussiness-content-os/issue/BUS-52/satu-dosis-obat-hati-sage-tiktok-poster-production) sebagai base Poster authority; Burgundy mengikuti [BUS-53](https://linear.app/bussiness-content-os/issue/BUS-53/satu-dosis-obat-hati-burgundy-tiktok-poster-production) sebagai deterministic delta. Poster harus self-contained dan mengikuti format-specific Poster narrative, visual, spacing, and clearance rules tanpa memindahkan mekanik Carousel/Reels ke satu frame.

Jangan memaksakan struktur satu format ke format lain.

## Tahap 4: Visual

**Owner-locked operational rule:** `Resolve the current authoritative governed record per document (GitHub main after cutover; otherwise Linear) → Fetch the exact binary from Google Drive → Verify SHA-256 → Produce; otherwise FAIL CLOSED.` (Dropbox is retired as of the 2026-09-20 Google-Drive-only migration — see the Canonical Asset Resolution Rule below; this line previously still named Dropbox and has been corrected to match.)

### Carousel v0.6.0 Deterministic Layout Routing

Carousel production must use the active canonical [BUS-49](https://linear.app/bussiness-content-os/issue/BUS-49/satu-dosis-obat-hati-carousel-master-template-system) v0.6.0 snapshot and select exactly one supported layout mode in the content manifest:

* `text_only` — deterministic text-centric mode retaining v0.3.2-compatible visual behavior.
* `illustrated_single_character` — deterministic one-character mode using exactly one registered `SDOH-OBJ-000006` P01–P08 production derivative.

For `illustrated_single_character`, the character binary must be resolved from the current authoritative Asset Registry/provenance record (GitHub `main` after cutover; otherwise Linear), fetched from Google Drive, and SHA-256 verified before render. Editable character fields are limited to the [BUS-49](https://linear.app/bussiness-content-os/issue/BUS-49/satu-dosis-obat-hati-carousel-master-template-system) contract: `pose_id` P01–P08, anchor preset `lower_right` / `lower_center`, scale preset `md` / `lg`, and `ground_mode = embedded`. The renderer must reject arbitrary x/y, width/height, rotation, flip, free crop, opacity override, recolor override, free transform, multiple characters, or unregistered/generated poses.

Generative image synthesis may be used only for explicitly labeled exploration/mockups and must never substitute the canonical renderer, canonical pose derivatives, or checksum-gated production inputs.

Aset identitas mengikuti definisi kanonis di SDOH — Asset Registry (§3), termasuk pairing logo dan surface Sage/Burgundy. Registry mengidentifikasi reusable asset; placement, crop, scale, frequency, dan apakah sebuah ornament digunakan pada format tertentu mengikuti production rules format-specific.

### Canonical Asset Resolution Rule — OWNER-LOCKED

**Canonical short form:** `current authoritative governed record → exact Google Drive file ID → raw-byte SHA-256 → production; otherwise FAIL CLOSED.`

This short form is normative for production asset acquisition.

**GOOGLE DRIVE ONLY — Owner lock 2026-09-20.**

Untuk setiap reusable asset atau implementation binary yang dibutuhkan oleh produksi:

1. Resolve asset ID/role, active provenance, checksum, dan Google Drive file ID dari authority kanonis per dokumen: GitHub `main` untuk governed text yang sudah cutover; Linear untuk governed text/operational record yang belum cutover (`BUS-28`/Asset Registry untuk reusable asset; `BUS-49` atau authority format lain untuk implementation-only asset).
2. Fetch exact raw binary dari **Google Drive** menggunakan file ID aktif yang tercatat.
3. Hitung SHA-256 raw bytes secara independen.
4. Bandingkan dengan active checksum pada Asset Registry atau provenance lock yang berlaku.
5. **MATCH →** asset boleh masuk ke pipeline produksi dan tetap harus mengikuti format-specific rules/QA.
6. **MISSING / FILE-ID UNRESOLVABLE / MISMATCH / UNVERIFIABLE → FAIL CLOSED.** Jangan memakai Dropbox fallback, redraw, regenerate, reconstruct, recompress, approximate, atau file yang hanya terlihat serupa lalu menyebutnya canonical.

Authority boundary:

* **Governed text authority = GitHub `main` after explicit per-document cutover; otherwise Linear. Linear remains execution/work-management after cutover.**
* **Google Drive = sole active persistent binary store.**
* **Dropbox = historical provenance only; not an active production source.**
* Production runtime/chat = temporary execution environment only, bukan source of truth.

Visual execution kemudian mengikuti format:

* **Carousel:** mulai dari master kanonis [BUS-49](https://linear.app/bussiness-content-os/issue/BUS-49/satu-dosis-obat-hati-carousel-master-template-system) dan pilih manifest Sage atau Burgundy. [BUS-47](https://linear.app/bussiness-content-os/issue/BUS-47/satu-dosis-obat-hati-sage-carousel-production) tetap mengatur mekanik bersama dan [BUS-48](https://linear.app/bussiness-content-os/issue/BUS-48/satu-dosis-obat-hati-burgundy-carousel-production) delta Burgundy; [BUS-28](DIUA-DIC-000011_SDOH-Asset-Registry.md) mengatur identitas aset. Gunakan snapshot sumber, environment, dan input aset yang dirujuk provenance lock [BUS-49](https://linear.app/bussiness-content-os/issue/BUS-49/satu-dosis-obat-hati-carousel-master-template-system). Isi hanya field konten yang diizinkan kontraknya. HTML/JPEG hasil render dan preview historis bukan sumber master; jangan membangun ulang template dari preview.

### Carousel Canonical Renderer Execution Guard

Untuk **output produksi Carousel**, generative image model tidak boleh digunakan untuk membangun ulang, menggambar ulang, menyubstitusi, atau merender ulang template, logo, ornament, typography, texture/grain, maupun komposisi yang dimiliki oleh [BUS-49](https://linear.app/bussiness-content-os/issue/BUS-49/satu-dosis-obat-hati-carousel-master-template-system).

Generative image synthesis hanya boleh dipakai untuk eksplorasi atau mockup yang secara eksplisit diberi status **NON-PRODUCTION** dan tidak boleh dicatat sebagai output produksi atau publication-ready artefact.

Produksi Carousel harus **fail closed**: bila renderer kanonis [BUS-49](https://linear.app/bussiness-content-os/issue/BUS-49/satu-dosis-obat-hati-carousel-master-template-system), manifest yang benar, font checksum-locked, atau reusable asset yang diwajibkan provenance lock tidak tersedia atau tidak lolos verifikasi, jangan mengganti dengan approximation, generated substitute, reconstructed visual, atau asset serupa. Hentikan produksi sampai input kanonis dapat dimaterialisasi dan diverifikasi.

Guard ini memperjelas enforcement terhadap routing yang sudah ada; ia tidak mengubah master, geometri, theme semantics, atau identitas aset.

* **Reels:** gunakan rules Reels yang berlaku; untuk Sage lihat [BUS-45](https://linear.app/bussiness-content-os/issue/BUS-45/satu-dosis-obat-hati-sage-reels-production), untuk Burgundy lihat [BUS-46](https://linear.app/bussiness-content-os/issue/BUS-46/satu-dosis-obat-hati-burgundy-reels-production).
* **TikTok Poster:** gunakan [BUS-52](https://linear.app/bussiness-content-os/issue/BUS-52/satu-dosis-obat-hati-sage-tiktok-poster-production) untuk shared Poster mechanics / Sage implementation dan [BUS-53](https://linear.app/bussiness-content-os/issue/BUS-53/satu-dosis-obat-hati-burgundy-tiktok-poster-production) untuk Burgundy deterministic deltas. Master artwork 4:5; TikTok 9:16 adalah presentation context. Semua informasi esensial harus lengkap di dalam 4:5 artwork. Jangan memperlakukan Poster sebagai satu slide Carousel atau frozen Reels frame.

Elemen seperti ornamen, posisi logo, headline, label slide, karakter, motion, atau layout tidak dianggap universal lintas-format kecuali secara eksplisit ditetapkan sebagai shared/canonical visual rule.

## Tahap 5: Review

Self-review dipandu oleh SDOH — QA Document. Cek mencakup: akurasi konten, tone, visual, caption, hashtag, CTA. Untuk Carousel, periksa output dan render report terhadap kontrak/master [BUS-49](https://linear.app/bussiness-content-os/issue/BUS-49/satu-dosis-obat-hati-carousel-master-template-system) serta aturan [BUS-47](https://linear.app/bussiness-content-os/issue/BUS-47/satu-dosis-obat-hati-sage-carousel-production)/[BUS-48](https://linear.app/bussiness-content-os/issue/BUS-48/satu-dosis-obat-hati-burgundy-carousel-production). Kelulusan template tidak menggantikan QA tiap konten; perubahan input terproteksi atau environment mengikuti change control [BUS-49](https://linear.app/bussiness-content-os/issue/BUS-49/satu-dosis-obat-hati-carousel-master-template-system).

## Tahap 6: Publish

Siklus 6 hari: 3× sage (carousel–reels–carousel) → 3× burgundy (carousel–reels–carousel) → ulang. Jam posting: 19:30.

## Caption, Hashtag & CTA Standard

**Caption (project-level baseline):** bukan copy mentah dari on-visual content, tetapi memberi konteks, kedalaman, atau ruang tambahan. Nada tetap pelan, tidak menghakimi, dan secara default lowercase bila tidak ada kebutuhan format-specific yang berbeda.

**Cross-format caption parity — Owner-directed:** Carousel, Reels, dan TikTok Poster menggunakan **pola caption project-level yang sama**. Format tidak membuat formula caption terpisah; perbedaannya ditentukan oleh theme semantics. Dengan demikian, seluruh artefak Sage memakai arsitektur caption Sage yang sama, sedangkan seluruh artefak Burgundy memakai arsitektur caption Burgundy yang sama, kecuali kelak ada approved format-specific exception.

Pola bersama:

1. **Pembukaan emosional / situational hook** — natural, spesifik, dan tidak menyalin hook visual secara mentah.
2. **Context / depth** — memperluas situasi, memberi makna tambahan, atau membantu pembaca mengenali pengalaman tanpa over-explaining.
3. **Theme-specific landing**:
   * **Sage / Seri Peluk:** recognition → permission → accompaniment; optional comfort / grounding bila memang earned, tanpa memaksa resolusi.
   * **Burgundy / Seri Jujur:** honesty → clarification → legitimization → backbone; optional reflective landing, tanpa dipaksa menjadi comfort language.
4. **Optional CTA ringan** hanya bila semantically justified; bukan engagement bait dan tidak wajib meminta comment/save/share.
5. **Footer/signature:** `satu dosis obat hati`.
6. **Hashtag baseline:** lima hashtag fix proyek.

Pola ini berlaku sama pada Carousel, Reels, dan TikTok Poster. Perbedaan medium tetap berada pada visual/on-screen execution dan format-specific mechanics; bukan pada struktur dasar caption.

Burgundy tidak wajib memakai `peluk/comfort line` bila itu melemahkan fungsi validasi keberanian. Variasi dialek Manado tipis (torang, nda, mar, jo, ngana) dapat dipakai secara sengaja untuk variasi tone.

**Hashtag (fix 5):** #satudosisobathati #obathati #manado #mentalhealthmanado #pelanpelanaja

**CTA / ending mechanics are format-specific.** There is no universal SDOH 3-slide on-visual CTA pattern.

* **Carousel:** follow the applicable Carousel production lane. Sage Carousel currently uses the locked five-slide **The Gentle Naming** architecture in [BUS-47](https://linear.app/bussiness-content-os/issue/BUS-47/satu-dosis-obat-hati-sage-carousel-production); Burgundy Carousel inherits shared mechanics through [BUS-48](https://linear.app/bussiness-content-os/issue/BUS-48/satu-dosis-obat-hati-burgundy-carousel-production) and applies justified semantic deltas. Do not override those structures with a legacy three-slide CTA pattern.
* **Reels:** CTA usage, no-CTA endings, and ending behavior follow [BUS-45](https://linear.app/bussiness-content-os/issue/BUS-45/satu-dosis-obat-hati-sage-reels-production) for Sage Reels and [BUS-46](https://linear.app/bussiness-content-os/issue/BUS-46/satu-dosis-obat-hati-burgundy-reels-production) for Burgundy Reels.
* **TikTok Poster:** CTA/closing behavior follows [BUS-52](https://linear.app/bussiness-content-os/issue/BUS-52/satu-dosis-obat-hati-sage-tiktok-poster-production) shared Poster mechanics and [BUS-53](https://linear.app/bussiness-content-os/issue/BUS-53/satu-dosis-obat-hati-burgundy-tiktok-poster-production) Burgundy deltas where applicable. Poster is not required to contain a marketing-style CTA; any CTA must remain subordinate to the single narrative thread.

A CTA is not mandatory merely because content is being published. When used, it should remain consistent with the selected theme and format and should not convert reflective content into engagement bait.

**CTA caption:** a light invitation to respond or DM may be used when appropriate; it is not required to force an on-visual CTA structure.

## Dependency Maintenance — SDOH-OBJ-000009 Re-Canonicalization — v1.18

Active dependencies synchronized to **QA Document v1.17** and **Asset Registry v1.14** following the Owner-approved controlled re-canonicalization of `SDOH-OBJ-000009`. The object ID and semantic scope are unchanged; only its active source checksum/provenance changed. Production continues to resolve reusable assets through the active Asset Registry and review-stage checks through the active QA Document. This is dependency-pointer maintenance only; no workflow stage, theme meaning, renderer mechanics, execution guard, or publication decision changed.

## Historical Dependency Maintenance — Burgundy Logo Source Registration

Historical record: the Asset Registry dependency was synchronized to v1.13 following the Owner-approved [BUS-48](https://linear.app/bussiness-content-os/issue/BUS-48/satu-dosis-obat-hati-burgundy-carousel-production) logo source registration. That pointer was later superseded by the v1.14 synchronization above. This historical record does not define the active dependency.

## Carousel Master Routing — Conformance Maintenance

Routing clarified to the already-canonical [BUS-49](https://linear.app/bussiness-content-os/issue/BUS-49/satu-dosis-obat-hati-carousel-master-template-system) master authority following the downstream conformance sweep. [BUS-24](DIUA-DIC-000007_SDOH-Project-Architecture.md) semantics, [BUS-28](DIUA-DIC-000011_SDOH-Asset-Registry.md) asset identities, [BUS-47](https://linear.app/bussiness-content-os/issue/BUS-47/satu-dosis-obat-hati-sage-carousel-production) shared rules and [BUS-48](https://linear.app/bussiness-content-os/issue/BUS-48/satu-dosis-obat-hati-burgundy-carousel-production) Burgundy deltas retain their ownership. Existing workflow/checks now point to the implementation owner; no renderer settings, caption/cadence, theme meaning or document version are changed. This record is documentation maintenance, not a render or publication approval.

## Re-Canonicalization Dependency Sync — 2026-09-11

Dependency synchronization completed after `SDOH-OBJ-000009` re-canonicalization and QA Document v1.17 maintenance. Active dependencies: **QA Document v1.17, CANONICAL** and **Asset Registry v1.14, CANONICAL**. This record confirms conformance only; no workflow, renderer, theme, or publication rule changed.

## Dependency Maintenance — SDOH-OBJ-000007 Re-Canonicalization — v1.20

Active dependencies synchronized to QA Document v1.19 and Asset Registry v1.16 following the Owner-approved controlled re-canonicalization and durable Dropbox materialization of `SDOH-OBJ-000007`. The Sage paper texture remains a reusable asset identity; whether and how it is deployed remains format-specific. No workflow stage, theme semantic, Carousel renderer guard, Reels routing rule, or publication approval requirement changed in this amendment.

## Dependency Maintenance — SDOH-OBJ-000008 Re-Canonicalization — v1.21

Active dependencies synchronized to QA Document v1.20 and Asset Registry v1.17 following the Owner-approved controlled re-canonicalization and durable Dropbox materialization of `SDOH-OBJ-000008` — Burgundy Paper Texture. The object ID, Burgundy token `#5C1B29`, theme semantics, workflow stages, format mechanics, and Carousel Canonical Renderer Execution Guard remain unchanged. This is dependency/provenance maintenance only.

## Owner-Locked Carousel Production Invocation Shorthands

**OWNER-LOCKED — 2026-09-12.**

The following short-form commands are canonical operational aliases for deterministic Carousel production:

> `Produksi Sage Carousel`
>
> `Produksi Burgundy Carousel`

When either exact command, or an unambiguous equivalent that explicitly requests production of a new Sage or Burgundy Carousel, is issued within the SDOH project context, execute the full production contract below without requiring the user to restate it. Resolve the selected theme first, then route to the applicable production lane and Content Register:

 1. Resolve current SDOH authority **per document** under [Content OS — Storage Authority Profile](../../system/DIUA-DIC-000041_Content-OS-Storage-Authority-Profile.md): read cut-over governed text such as this Production SOP, QA Document, and Asset Registry from GitHub `main`; read any not-yet-cutover governed/operational lane from its still-authoritative Linear record, including [BUS-47](https://linear.app/bussiness-content-os/issue/BUS-47/satu-dosis-obat-hati-sage-carousel-production), [BUS-48](https://linear.app/bussiness-content-os/issue/BUS-48/satu-dosis-obat-hati-burgundy-carousel-production), and [BUS-49](https://linear.app/bussiness-content-os/issue/BUS-49/satu-dosis-obat-hati-carousel-master-template-system) when they have not completed cutover. Never use a migrated Linear reference copy as authority.
 2. Check both Sage and Burgundy Carousel Content Registers for semantic/copy duplication, then use the applicable theme register to allocate the next content instance; do not knowingly duplicate an existing, scheduled, or already-published content item.
 3. Allocate or confirm the next valid content ID according to the active register/production-lane rules.
 4. Develop the content under the selected theme semantics — Sage / Seri Peluk or Burgundy / Seri Jujur — and the applicable Carousel production-lane rules.
 5. Select the current canonical [BUS-49](https://linear.app/bussiness-content-os/issue/BUS-49/satu-dosis-obat-hati-carousel-master-template-system) `layout_mode` deterministically under the applicable production-lane rules: use `illustrated_single_character` only when the narrative function maps to a registered canonical character pose; otherwise use `text_only` unless an Owner-locked instance direction requires character use. If illustrated, only checksum-resolved `SDOH-OBJ-000006` P01–P08 inputs and [BUS-49](https://linear.app/bussiness-content-os/issue/BUS-49/satu-dosis-obat-hati-carousel-master-template-system)-protected presets may be used; Burgundy pose selection follows `Emotional State → Required Gesture → Matching Canonical Pose`.
 6. Present the candidate S1–S5 copy and, when character mode is proposed, the pose map for Owner review **before final rendering**, unless the Owner explicitly instructs immediate rendering or has already approved the exact copy/pose map in the active conversation.
 7. At render time, resolve each required asset identity, persistent-store provider/location, checksum, and approved verification path from the current authoritative Asset Registry (GitHub `main` after its cutover); fetch the exact recorded binary and verify it through Path A (raw-byte SHA-256, preferred) or the applicable approved connector-verification path. Never substitute a binary from another provider/location merely because it looks equivalent.
 8. Render only through the active canonical [BUS-49](https://linear.app/bussiness-content-os/issue/BUS-49/satu-dosis-obat-hati-carousel-master-template-system) renderer. Image generation, redraw, reconstruction, approximation, or visually similar substitution is prohibited for production output.
 9. Run all applicable [BUS-27](DIUA-DIC-000010_SDOH-QA-Document.md) and format-specific hard QA gates. Any missing, mismatched, or unverifiable required authority/input/output provenance results in **FAIL CLOSED / NON-PRODUCTION**.
10. Produce the required render report and output checksums. Publication remains a separate Owner-approved action and is not implied by successful rendering.

Operational expansion:

`Produksi Sage Carousel` → `Resolve current authority per document → cross-register duplicate check → allocate Sage ID → develop Sage copy → Owner copy/pose review when applicable → resolve registry-recorded binaries → approved verification → current canonical BUS-49 deterministic render → QA → render report/checksums`.

`Produksi Burgundy Carousel` → `Resolve current authority per document → cross-register duplicate check → allocate Burgundy ID → develop Burgundy copy → determine narrative pose map when illustrated → Owner copy/pose review → resolve registry-recorded binaries → approved verification → current canonical BUS-49 deterministic render → QA → render report/checksums`.

These shorthands are command-interface rules only; they do not create new production lanes, redefine Sage/Burgundy semantics, or supersede [BUS-47](https://linear.app/bussiness-content-os/issue/BUS-47/satu-dosis-obat-hati-sage-carousel-production)/[BUS-48](https://linear.app/bussiness-content-os/issue/BUS-48/satu-dosis-obat-hati-burgundy-carousel-production)/[BUS-49](https://linear.app/bussiness-content-os/issue/BUS-49/satu-dosis-obat-hati-carousel-master-template-system)/[BUS-27](DIUA-DIC-000010_SDOH-QA-Document.md) ownership boundaries.

## Owner-Locked TikTok Poster Production Invocation Shorthands

**OWNER-LOCKED — 2026-09-13.**

The following short-form commands are canonical operational aliases for TikTok Poster production:

> `Produksi Sage Poster baru.`
>
> `Produksi Burgundy Poster baru.`

Unambiguous equivalents such as `Produksi Sage Poster.` or `Produksi Burgundy Poster.` are treated identically within the SDOH project context.

When either alias is issued, execute the complete Poster production workflow without requiring the Owner to restate canvas, theme rules, register mechanics, provenance rules, QA, caption architecture, or lifecycle boundaries.

Operational contract:

 1. Resolve the **current canonical** SDOH authorities per document: GitHub `main` after cutover; otherwise the still-authoritative Linear record. Do not hard-code superseded document versions and do not treat migrated Linear reference copies as authority.
 2. Route Sage to [BUS-52](https://linear.app/bussiness-content-os/issue/BUS-52/satu-dosis-obat-hati-sage-tiktok-poster-production) and Burgundy to [BUS-53](https://linear.app/bussiness-content-os/issue/BUS-53/satu-dosis-obat-hati-burgundy-tiktok-poster-production). Burgundy remains a deterministic delta from Sage; do not invent a separate layout system or mirror the Sage layout merely for variation.
 3. Resolve the applicable TikTok Poster Content Register under [BUS-54](https://linear.app/bussiness-content-os/issue/BUS-54/satu-dosis-obat-hati-tiktok-poster-content-registers), verify the next available theme-specific content ID, run the required cross-register duplicate check, then allocate/confirm that ID.
 4. Develop one Poster narrative thread under the selected theme semantics. Sage follows validation-of-condition / Seri Peluk; Burgundy follows validation-of-courage / Seri Jujur. Apply the current Poster copy structure and format-specific rules rather than importing Carousel/Reels mechanics.
 5. Select any reusable visual only from registered identities/derivatives when such an asset is required. Pose choice remains a production decision; do not generate or reconstruct a registered asset substitute and call it canonical.
 6. Resolve reusable asset identity, provenance, checksum, and persistent-store locator from the current canonical Asset Registry; fetch the exact recorded binary; verify through the approved path; **FAIL CLOSED** on missing, mismatched, or unverifiable production inputs.
 7. Render the 4:5 / 1080×1350 Poster according to the current [BUS-52](https://linear.app/bussiness-content-os/issue/BUS-52/satu-dosis-obat-hati-sage-tiktok-poster-production) shared mechanics. For Burgundy, apply only the current [BUS-53](https://linear.app/bussiness-content-os/issue/BUS-53/satu-dosis-obat-hati-burgundy-tiktok-poster-production) deterministic deltas, including reverse color/visual semantics, Moon emblem, Sage-on-Burgundy brand treatment, Burgundy narrative semantics, and the No-Mirror Rule where currently canonical.
 8. Run all applicable [BUS-27](DIUA-DIC-000010_SDOH-QA-Document.md) and format-specific QA gates, including canonical binary/provenance gates.
 9. Draft the caption using the current project-level caption architecture in this SOP. Caption complements the artwork and must not repair missing essential Poster information.
10. Stop at any required **Owner approval** gate. Material may be promoted to **READY** only when the applicable register requirements are satisfied.
11. **Publication remains separate.** The production alias never means SCHEDULED or PUBLISHED. Record a publication event only from verifiable publication evidence or explicit Owner-provided evidence.

Operational expansion:

`Produksi Sage Poster baru.` → `Resolve current authority per document → Sage Poster register + duplicate check → allocate Sage Poster ID → develop Sage narrative/copy → select registered visual if justified → resolve and verify exact binaries → BUS-52 4:5 render → BUS-27 QA → Sage caption → Owner approval → READY`.

`Produksi Burgundy Poster baru.` → `Resolve current authority per document → Burgundy Poster register + duplicate check → allocate Burgundy Poster ID → develop Burgundy narrative/copy → select registered visual if justified → resolve and verify exact binaries → BUS-52 base mechanics + BUS-53 deterministic deltas → BUS-27 QA → Burgundy caption → Owner approval → READY`.

These shorthands are command-interface rules only. They do not create a new production lane, a Poster master-template subsystem, or a separate governance layer, and they do not supersede [BUS-52](https://linear.app/bussiness-content-os/issue/BUS-52/satu-dosis-obat-hati-sage-tiktok-poster-production)/[BUS-53](https://linear.app/bussiness-content-os/issue/BUS-53/satu-dosis-obat-hati-burgundy-tiktok-poster-production)/[BUS-54](https://linear.app/bussiness-content-os/issue/BUS-54/satu-dosis-obat-hati-tiktok-poster-content-registers)/[BUS-27](DIUA-DIC-000010_SDOH-QA-Document.md)/[BUS-28](DIUA-DIC-000011_SDOH-Asset-Registry.md) ownership boundaries.

## Reels Short-Form Production Invocations — OWNER-LOCKED

The following phrases are canonical operational aliases:

* `Produksi Sage Reels`
* `Produksi Burgundy Reels`

### Execution contract

When either alias is invoked, execute the complete applicable Reels workflow rather than treating the phrase as a request for a generic video draft.

 1. Resolve the **current canonical SDOH project authority dynamically per document**: GitHub `main` after cutover; otherwise the still-authoritative Linear record. Do not hard-code a historical document version or use a migrated Linear reference copy as authority.
 2. Route Sage to [BUS-45](https://linear.app/bussiness-content-os/issue/BUS-45/satu-dosis-obat-hati-sage-reels-production) and Burgundy to [BUS-46](https://linear.app/bussiness-content-os/issue/BUS-46/satu-dosis-obat-hati-burgundy-reels-production). Burgundy inherits shared mechanics from Sage unless [BUS-46](https://linear.app/bussiness-content-os/issue/BUS-46/satu-dosis-obat-hati-burgundy-reels-production) defines an explicit Burgundy delta.
 3. Check the applicable Reels Content Register plus cross-format registers for topic/angle/hook/script duplication before production. Similar topic alone is not duplication; record the comparison result.
 4. Allocate or confirm the next theme-specific local Reel ID before producing an output.
 5. Develop theme-conformant script/on-screen copy. Sage follows validasi kondisi / “kamu aman”; Burgundy follows validasi keberanian / “kamu jujur.”
 6. For narrated Reels, use **VOICE FIRST → VIDEO FOLLOWS THE VOICE**. Approve the voice take before locking visual timing. Non-narrated Reels follow the applicable non-narrated route in the production lane.
 7. Resolve reusable visual/audio assets only through the active Asset Registry and its recorded persistent-binary location/checksum evidence. Missing, mismatched, stale, or unverifiable required binaries **fail closed**; do not silently redraw, substitute, or infer a canonical asset.
 8. Build/assemble through the applicable Reels production rules. Sage Final Master v1 and `SDOH-SAGE-REEL-0001_v1.0_APPROVED` are validated instance/reference evidence, not a universal requirement for exact frame count, duration, timing, voice identity, or ISV placement.
 9. Run all applicable QA gates in [BUS-27](DIUA-DIC-000010_SDOH-QA-Document.md) plus theme/format-specific QA in [BUS-45](https://linear.app/bussiness-content-os/issue/BUS-45/satu-dosis-obat-hati-sage-reels-production)/[BUS-46](https://linear.app/bussiness-content-os/issue/BUS-46/satu-dosis-obat-hati-burgundy-reels-production).
10. Draft the caption using the shared project-level caption architecture: Sage follows the Sage branch; Burgundy follows the Burgundy branch. Caption approval remains an instance-level Owner gate.
11. Persist provenance, master evidence, caption state, reproduction evidence when created, and publication state in the applicable Reels Content Register.
12. Stop at required Owner approval gates. **READY ≠ PUBLISHED.** Never infer publication from an approved master or from invocation of the production alias.

### Current persistent-evidence note

* Sage: approved instance evidence exists in Google Drive under `SDOH-SAGE-REEL-0001_v1.0_APPROVED`; this supports reproducibility of that instance only.
* Burgundy: no approved Burgundy Reel package was found in the checked Google Drive scope as of 2026-09-13. The alias is valid as a workflow command, but production must establish its own instance evidence and may not inherit Sage instance binaries by implication.

These aliases change invocation ergonomics only. They do not create a separate Reels system, reopen locked Sage mechanics, or certify a Burgundy output before it passes its own production and QA gates.

## Reels Five-Image Narrative Standard v1.0 — CANONICAL

### Scope

This standard applies to both **Sage Reels** and **Burgundy Reels** unless a future format-specific exception is explicitly approved. Theme semantics remain owned by SDOH Project Architecture; Sage/Burgundy execution remains owned by [BUS-45](https://linear.app/bussiness-content-os/issue/BUS-45/satu-dosis-obat-hati-sage-reels-production)/[BUS-46](https://linear.app/bussiness-content-os/issue/BUS-46/satu-dosis-obat-hati-burgundy-reels-production).

### 1. Default Runtime

* Target runtime: **approximately 30 seconds**.
* Preferred working band: **27–33 seconds**.
* The runtime is a target, not an exact stopwatch requirement. Natural narration cadence and meaningful pauses outrank forcing the edit to exactly 30.000 seconds.
* A material deviation outside the working band should be justified by the script/voice performance and recorded during QA.

### 2. Five-Image Structure

* A standard SDOH Reel uses **exactly five static image slides / visual beats**.
* Each slide is a distinct visual-emotional beat, not merely a text page.
* Typical dwell is approximately **5–7 seconds per image**, but actual cut points are derived from narration cadence and natural pauses.
* Static slides are the baseline. Character animation, pan/zoom, or decorative motion is not required and must not be added merely to create movement.

### 3. Narration Is a Story Layer, Not a Reading Layer

The voice narration must **not simply read the words visible on the slide**.

On-screen text and narration have different jobs:

* **On-screen text:** concise emotional anchor, key thought, hook, contrast, permission, truth, or landing line.
* **Narration:** develops the situation around that anchor; adds context, emotional movement, interpretation, connective tissue, or a small story that helps the viewer understand why the slide matters.

The narration may intentionally repeat a short anchor phrase when rhetorically useful, but sustained verbatim duplication of the visual copy is a QA failure.

A useful relationship is:

**IMAGE = what the viewer sees / feels in the moment**
**TEXT = the distilled emotional anchor**
**VOICE = the story unfolding around that anchor**

### 4. Narrative Continuity Across Five Slides

The five slides should form one continuous spoken story. The voice may begin a thought on one image and complete or deepen it on the next. Slide boundaries therefore follow narrative beats rather than requiring one isolated sentence per image.

Recommended functional arc:

1. **Recognition / Hook** — establish the lived moment.
2. **Context / Tension** — reveal what sits underneath it.
3. **Deepening / Core truth** — emotional or semantic center.
4. **Permission / Clarification / Position** — theme-specific movement.
5. **Landing** — leave the viewer with the appropriate Sage or Burgundy emotional residue.

This is a functional arc, not a requirement that every Reel use identical wording.

### 5. Theme Adaptation

* **Sage:** narration should expand recognition, permission, space, accompaniment, and validation of condition.
* **Burgundy:** narration should expand honesty, clarification, legitimization, boundary, courage, or backbone.

The same five-image mechanics apply to both themes; semantics differ.

### 6. Voice-First Timing

For narrated Reels:

1. approve the script;
2. generate/record the narration;
3. approve voice naturalness and emotional fit;
4. measure the actual narration and natural pauses;
5. map the five visual beats to that narration;
6. assemble the five images around the voice;
7. run audiovisual QA.

Do not pre-force equal six-second slides if the spoken cadence requires different dwell times.

### 7. QA Gate

A Reel fails this standard if:

* the narration mostly reads the slide text verbatim;
* five images feel like disconnected quote cards rather than one narrated story;
* runtime is padded with unnecessary silence or motion merely to reach 30 seconds;
* on-screen text becomes a transcript of the narration;
* cuts ignore natural voice pauses;
* Sage/Burgundy semantics are diluted by generic motivational narration.

### 8. Existing Master Boundary

`SDOH-SAGE-REEL-0001` remains **CANONICAL / LOCKED** as an approved historical reference implementation. Its \~21.149-second runtime is not invalidated retroactively. For new Reels, this v1.0 five-image / approximately-30-second narrative profile becomes the default production baseline unless an explicit exception is approved.

## Dependency Maintenance — Suicide-Prevention Source Coverage — v1.38

Active production dependencies synchronized to Research Source List v1.14 and QA Document v1.31 after the SDOH-SAGE-POSTER-0002 source-governance remediation. This is dependency-pointer maintenance only; no production workflow, alias semantics, visual mechanics, caption architecture, binary-resolution rule, Owner approval gate, or publication lifecycle changed.

## September 2026 Caption Commemoration Pattern — OWNER-LOCKED TEMPORARY OVERRIDE

### Scope

Effective from **2026-09-22 through 2026-09-30** for all new SDOH publication captions, including:

* Sage Carousel
* Burgundy Carousel
* Sage Reels
* Burgundy Reels
* Sage TikTok Poster
* Burgundy TikTok Poster

Reels use the same underlying content/master across Instagram and TikTok but still carry the caption pattern on each publication destination.

### Fixed placement

The caption ending order is:

1. caption body;
2. `satu dosis obat hati`;
3. fixed September commemoration line;
4. project hashtags.

Fixed line:

We **commemorate** World Suicide Prevention Month to raise awareness and offer support.

### Governance

* The wording and placement above are **Owner-locked for the remainder of September 2026**.
* Do not omit or paraphrase the fixed line without a new Owner revision.
* The pattern is temporary and expires after **2026-09-30**, unless explicitly extended.
* This is SDOH campaign wording. It does not assert that WHO or IASP officially designate the entire month as “World Suicide Prevention Month”; official WSPD source authority remains separate.
* Content already published before this lock remains historical evidence and is not silently edited. Retroactive publication edits require explicit Owner authorization.
* Platform rendering limitation: if a destination does not support Markdown bold, preserve the wording and emphasis intent without publishing literal Markdown control characters unless the publication executor explicitly supports them.

## Storage-Authority Reconciliation — v1.40 — 2026-09-29

This amendment reconciles active production instructions with [Content OS — Storage Authority Profile](../../system/DIUA-DIC-000041_Content-OS-Storage-Authority-Profile.md) and [Content OS — Repository Representation Profile](../../system/DIUA-DIC-000026_Content-OS-Repository-Representation-Profile.md).

Operational resolution is now explicitly **per document**:

* governed text that completed the approved cutover gate is read from GitHub `main`;
* governed text not yet cut over remains Linear-authoritative;
* Linear remains the execution/work-management surface after cutover;
* Google Drive remains the authoritative binary/image store where the applicable governed record resolves the binary;
* historical status/change narratives that mention the pre-cutover Linear authority model remain historical evidence and are not silently rewritten.

This is an authority-surface conformance amendment. It does not change theme semantics, format mechanics, renderer contracts, QA criteria, Owner approval gates, Content ID semantics, or publication lifecycle semantics.

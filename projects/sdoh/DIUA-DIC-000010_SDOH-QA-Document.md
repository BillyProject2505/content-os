---
document_name: "Satu Dosis Obat Hati — QA Document"
document_class: "Domain/Project-Level Operational Document"
structural_classification: "Tiered — Document Tier: Domain/Project (Tier 2) — Satu Dosis Obat Hati"
system: "Content OS → Satu Dosis Obat Hati (SDOH)"
owner: "[OPERATIONAL DEFAULT] (Root Documentation Structure §5.1) Not yet formally assigned. Defaults to the document's creator."
related_issue: "BUS-27"
universal_identifier: "DIUA-DIC-000010"
version: "1.31"
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
  - id: "DIUA-DIC-000011"
    name: "Satu Dosis Obat Hati — Asset Registry"
    version: "1.28"
    status: "CANONICAL"
source_representation:
  platform: "Linear"
  locator: "https://linear.app/bussiness-content-os/document/sdoh-qa-document-v131-canonical-b2af763b1d56"
representation_profile: "DIUA-DIC-000026@1.3"
---
## Document Identity

| Field | Value |
| -- | -- |
| Document Name | Satu Dosis Obat Hati — QA Document |
| Document Class | Domain/Project-Level Operational Document |
| System | Content OS → Satu Dosis Obat Hati (SDOH) |
| Version | 1.31 |
| Status | **CANONICAL** — amended to v1.31 (2026-09-20): synchronized content-accuracy dependency to SDOH Research Source List v1.14 after suicide-prevention campaign sources SRC-06–SRC-09 were registered. QA criteria are unchanged; this amendment closes the dependency drift exposed while remediating SDOH-SAGE-POSTER-0002. Prior state: **CANONICAL** — amended to v1.30 (2026-09-20): synchronized QA to the Owner-locked **Google Drive-only** production-binary policy in SDOH Asset Registry v1.28. Active production binaries must resolve from the exact Google Drive file ID recorded by Linear, be raw-fetched, independently SHA-256 verified, and fail closed on missing/mismatch/unverifiable bytes. Legacy Dropbox verification paths are retired for active production and remain historical evidence only. No content-safety, theme-fit, visual-layout, renderer, or publication criteria changed. Prior state: **CANONICAL** — amended to v1.29 (2026-09-14): added Reels QA gates for the new five-image / approximately-30-second narrated storytelling baseline. Narration must complement and expand slide content rather than primarily read it verbatim; five slides must form one continuous story, voice-first timing remains authoritative, and runtime padding solely to hit 30 seconds is rejected. Existing locked masters remain valid historical references. Prior state: **CANONICAL** — amended to v1.28 (2026-09-13): synchronized current dependencies after Project Architecture v1.13, Research Source List v1.12, and Asset Registry v1.26 following the cross-document conformance sweep. QA criteria, theme-fit checks, fail-closed gates, Poster/Carousel/Reels routing, and publication approval requirements are unchanged. Prior state: **CANONICAL** — amended to v1.27 (2026-09-13): re-verified and synchronized current dependencies after Project Architecture v1.12, Research Source List v1.11, and Asset Registry v1.25; result CONFORMANT. QA criteria, theme-fit checks, fail-closed gates, Poster/Carousel/Reels routing, and publication approval requirements are unchanged. Prior state: **CANONICAL** — amended to v1.26 (2026-09-13): activated TikTok Poster in project-level QA after [BUS-52](https://linear.app/bussiness-content-os/issue/BUS-52/satu-dosis-obat-hati-sage-tiktok-poster-production) Sage Poster Rules v1.0 and [BUS-53](https://linear.app/bussiness-content-os/issue/BUS-53/satu-dosis-obat-hati-burgundy-tiktok-poster-production) Burgundy deterministic-delta validation established the format-specific production authority. Added Poster routing and checks for 4:5 master artwork, standalone comprehension, one narrative thread, single Primary Visual, adaptive text–visual clearance, negative space, Sage/Burgundy theme treatment, and [BUS-52](https://linear.app/bussiness-content-os/issue/BUS-52/satu-dosis-obat-hati-sage-tiktok-poster-production)/[BUS-53](https://linear.app/bussiness-content-os/issue/BUS-53/satu-dosis-obat-hati-burgundy-tiktok-poster-production) ownership. Poster numeric implementation metrics remain format-lane baselines unless separately locked. No Carousel/Reels gate is weakened. Prior state: **CANONICAL** — amended to v1.25 (2026-09-12): synchronized QA with Production SOP v1.28 cross-format caption parity. Added checks that Carousel and Reels use the same project-level caption architecture, that Sage/Burgundy differences are semantic rather than format-specific, and that the standard footer/signature plus fixed five hashtags are preserved unless an explicit approved exception exists. No visual, asset, renderer, research, or publication gate changed. Prior state: **CANONICAL** — amended to v1.24 (2026-09-12): conformance update for provider-neutral asset verification and the active Carousel master. Production QA now resolves exact binaries from the provider/location recorded by Asset Registry v1.24, applies the approved verification path, and validates Carousel output against the current canonical [BUS-49](https://linear.app/bussiness-content-os/issue/BUS-49/satu-dosis-obat-hati-carousel-master-template-system) master (currently v0.6.0). No theme semantics, content criteria, pose semantics, or publication-approval rules changed. Prior state: **CANONICAL** — amended to v1.23 (2026-09-11): added deterministic Carousel stickman-layer hard gates for [BUS-49](https://linear.app/bussiness-content-os/issue/BUS-49/satu-dosis-obat-hati-carousel-master-template-system) v0.4.0 and synchronized the active Asset Registry dependency to v1.20. `illustrated_single_character` outputs must use exactly one registered P01–P08 binary through the locked Linear → Dropbox → SHA-256 path and only approved pose/anchor/scale fields; invalid or unverifiable character deployment fails closed. Prior state: **CANONICAL** — amended to v1.22 (2026-09-11): added the Owner-locked canonical binary-resolution QA gate and synchronized the active Asset Registry dependency to v1.19. Production assets must be resolved through the active Linear registry/provenance record, fetched from Dropbox, and independently SHA-256 verified before use; missing/mismatched/unverifiable binaries fail closed. No theme semantics, visual geometry, asset identity, or publication-approval rules changed. Prior state: **CANONICAL** — amended to v1.21 (2026-09-11): synchronized the active Asset Registry dependency to v1.18 after the Owner-approved controlled re-canonicalization and durable Dropbox materialization of `SDOH-OBJ-000002` — Sage-on-Burgundy logo source. This is dependency/provenance maintenance only: QA checks, logo/surface pairing rules, theme semantics, Carousel fail-closed gates, and production approval requirements are unchanged. Prior state: **CANONICAL** — amended to v1.20 (2026-09-11): synchronized the active Asset Registry dependency to v1.17 after the Owner-approved controlled re-canonicalization and Dropbox materialization of `SDOH-OBJ-000008` — Burgundy Paper Texture. This is dependency/provenance maintenance only: QA checks, theme semantics, format rules, Carousel fail-closed gates, and production approval requirements are unchanged. Prior state: **CANONICAL** — amended to v1.19 (2026-09-11): synchronized the active Asset Registry dependency to v1.16 after the Owner-approved controlled re-canonicalization and Dropbox materialization of `SDOH-OBJ-000007` — Sage Paper Texture. This is dependency/provenance maintenance only: QA checks, theme semantics, format rules, Carousel fail-closed gates, and production approval requirements are unchanged. Prior state: **CANONICAL** — amended to v1.18 (2026-09-11): synchronized the active Asset Registry dependency to v1.15 after the Owner-approved controlled re-canonicalization of `SDOH-OBJ-000006` and registration of its P01–P08 transparent derivative family. This is dependency-pointer maintenance only; QA checklist logic, theme semantics, Carousel provenance gates, Reels format checks, and publication approval requirements are unchanged. Prior state: **CANONICAL** — amended to v1.17 (2026-09-11): synchronized the active Asset Registry dependency to v1.14 after the Owner-approved controlled re-canonicalization of `SDOH-OBJ-000009`. This is a compliance/dependency-pointer maintenance amendment only: QA checks, theme semantics, format rules, Carousel fail-closed gates, and production approval requirements are unchanged. Prior state: v1.16, CANONICAL — amended to v1.16 (2026-09-11): added explicit Carousel provenance/fail-closed QA gates after a production-test nonconformance showed that a visually similar generative reconstruction could bypass the canonical [BUS-49](https://linear.app/bussiness-content-os/issue/BUS-49/satu-dosis-obat-hati-carousel-master-template-system) renderer while appearing production-ready. New checks require renderer-origin evidence, render-report provenance, and rejection of generative/reconstructed substitutes. No theme semantics, visual geometry, asset identity, or renderer mechanics changed. Prior state: v1.15, CANONICAL — synchronized active Governance, Depends On, and theme-fit references to Architecture v1.11, Research Source List v1.10, and Asset Registry v1.12 under Owner's sequential-remediation instruction. Compliance update; checklist requirements and historical audit evidence are unchanged. Format-specific validation remains governed by the applicable production lane. Prior state: v1.14, CANONICAL — amended to v1.14: expanded content-accuracy QA so all research-sensitive claims — psychological, factual, religious/spiritual, and professional-referral claims — are checked against the appropriate research-source coverage rather than limiting the project-level check to psychological claims only. Prior state: v1.13, CANONICAL — synchronized dependencies to Project Architecture v1.10, Research Source List v1.9, and Asset Registry v1.9 after the active format set was narrowed to Carousel + Reels only. Prior state: v1.12, CANONICAL — aligned QA scope with Project Architecture v1.10. The active SDOH production formats are **Carousel and Reels only**; Poster is not currently part of production QA and has been removed from active format checks. Prior state: v1.11, CANONICAL — synchronized the Asset Registry dependency from v1.7 to v1.8 after ornament ownership was narrowed to asset identity only; format-specific placement, crop, scale, frequency, and requirement remain governed by the applicable production lane. Prior state: v1.10, CANONICAL — synchronized dependencies to SDOH Project Architecture v1.10, Research Source List v1.8, and Asset Registry v1.7; generalized caption QA so it is cross-format rather than Carousel-specific; and made caption validation theme-adaptive so Burgundy is not forced into Sage-style comfort language. Prior state: v1.9, CANONICAL — synchronized QA semantics with SDOH Project Architecture v1.7. Added cross-format theme-fit checks for Sage / Seri Peluk and Burgundy / Seri Jujur, clarified that theme meaning is canonical at project level, and removed the implication that Carousel-specific template/CTA rules are universal across Poster, Carousel, and Reels. Prior state: v1.8, CANONICAL — amended to v1.8: synced `Depends On` (Research Source List v1.6→v1.7), stale due to that document being amended to add a source-coverage entry for the "Jujur Sama Allah" klaster ([BUS-33](https://linear.app/bussiness-content-os/issue/BUS-33/satu-dosis-obat-hati-jujur-sama-allah-source-coverage-gap-governance) remediation). Compliance update, no substantive content changed. Prior state: v1.7, CANONICAL — amended to v1.7: synced `Depends On` and `Governance` (Project Architecture v1.5→v1.6; Research Source List v1.5→v1.6), stale due to those documents being amended in the current workspace-wide stale-Depends-On sweep ([BUS-25](https://linear.app/bussiness-content-os/issue/BUS-25/satu-dosis-obat-hati-production-sop) extended stale-reference check, full-sweep pass). Compliance update, no substantive content changed. Prior state: v1.6, CANONICAL — amended to v1.6: synced `Depends On` and `Governance` (Project Architecture v1.4→v1.5; Research Source List v1.4→v1.5), stale due to those documents being amended in this same review cycle. Compliance update, no substantive content changed. Prior state: v1.5, CANONICAL — amended to v1.5: version-pinned `Research Source List` in `Depends On` for consistency with Content OS's pinning convention (previously unversioned). Found via adversarial governance review of [BUS-25](https://linear.app/bussiness-content-os/issue/BUS-25/satu-dosis-obat-hati-production-sop) (SDOH Production SOP) Depends-On pin-consistency check. Compliance update, no substantive content changed. Prior state: v1.4, CANONICAL — amended to v1.4: (1) synced `Depends On`/`Governance` to Project Architecture v1.3→v1.4; (2) removed stale version-pin from `Universal Identifier` field (was citing Registry v1.3, now v1.10), changed to unversioned form matching CWC's pattern. Found via governance audit (Issue #16) extended stale-reference sweep. Compliance update, no substantive content changed. Prior state: v1.3, CANONICAL corrected `Depends On` and `Governance` references to SDOH Project Architecture from stale "v1.0, DRAFT"/"v1.1, CANONICAL" to current v1.3, CANONICAL — the prior text incorrectly implied Project Architecture was still DRAFT, a status error, not just a version lag. Found via governance audit (Issue #16) system-wide stale-Depends-On sweep. Compliance update, no substantive content changed. Prior state: v1.2, CANONICAL re-tagged `Owner` field from `[ASSUMPTION]` to `[OPERATIONAL DEFAULT]` per Root Documentation Structure §5.1, introduced via governance audit (Issue #16) P1 remediation. Compliance update, no substantive content changed. Prior state: v1.1, CANONICAL — promoted from v1.0 DRAFT to v1.1 CANONICAL on 2026-09-03, per SDOH — Project Architecture §0's provisionally-adopted §6 change-control process. |
| Related Issue | [BUS-27](https://linear.app/bussiness-content-os/issue/BUS-27/sdoh-qa-document) — SDOH — QA Document |
| Owner | \[OPERATIONAL DEFAULT\] (Root Documentation Structure §5.1) Not yet formally assigned. Defaults to the document's creator. |
| Governance | Follows the SDOH-wide provisional adoption of Root Governance's change-control model, declared in SDOH — Project Architecture (v1.13, CANONICAL) §0. |
| Structural Classification | Tiered — Document Tier: Domain/Project (Tier 2) — Satu Dosis Obat Hati |
| Universal Identifier (UNIS/DIC) | `DIUA-DIC-000010` — ALLOCATED, per Content OS's own registry ([BUS-16](../../system/Content-OS-Universal-Identifier-Registry.md) §4) |
| Depends On | SDOH — Project Architecture (v1.13, CANONICAL) for canonical Sage / Seri Peluk and Burgundy / Seri Jujur theme semantics, active-format scope, and project-level palette ownership; SDOH — Research Source List (v1.14, CANONICAL) for content-accuracy sourcing; SDOH — Asset Registry (v1.28, CANONICAL) for reusable visual-asset identity, Google Drive-only active persistent-binary locators, checksums, and canonical token lookup. [BUS-49](https://linear.app/bussiness-content-os/issue/BUS-49/satu-dosis-obat-hati-carousel-master-template-system) — Carousel Master Template System (v0.6.0, CANONICAL) for the reusable renderer/master package, Theme Emblem implementation, implementation provenance and fixed/editable contract. Format-specific production rules may add stricter checks for the active formats, **Carousel, Reels, and TikTok Poster**, but do not redefine theme meaning. TikTok Poster shared mechanics are governed by [BUS-52](https://linear.app/bussiness-content-os/issue/BUS-52/satu-dosis-obat-hati-sage-tiktok-poster-production); Burgundy Poster defines only deterministic deltas and Burgundy-specific validation in [BUS-53](https://linear.app/bussiness-content-os/issue/BUS-53/satu-dosis-obat-hati-burgundy-tiktok-poster-production). |

## Cek Akurasi Konten

- [ ] Setiap klaim research-sensitive — termasuk klaim psikologis, faktual, religius/spiritual, dan rujukan profesional — diperiksa terhadap sumber yang relevan di SDOH — Research Source List
- [ ] Tidak menyesatkan / oversimplifikasi
- [ ] Materi yang tidak memiliki dukungan sumber yang memadai tidak dinaikkan menjadi klaim faktual atau otoritatif

## Cek Theme Fit & Tone

- [ ] Tidak menggurui, tidak toxic positivity, tidak menyuruh
- [ ] Theme dipilih berdasarkan fungsi naratif, bukan sekadar warna atau format
- [ ] Jika **Sage / Seri Peluk**: materi berfungsi sebagai **validasi kondisi**, membawa core promise **“kamu aman”**, dan memberi ruang untuk mengenali atau mengizinkan kondisi emosional tanpa memaksa perubahan atau resolusi
- [ ] Jika **Burgundy / Seri Jujur**: materi berfungsi sebagai **validasi keberanian**, membawa core promise **“kamu jujur”**, dan menamai / menghadapi / memperjelas truth yang memiliki bobot emosional lebih besar
- [ ] Burgundy tidak ditolak hanya karena bersifat inward-facing; ia dapat inward, outward, relational, atau spiritual selama fungsi validasi keberaniannya jelas
- [ ] Perbedaan Sage vs Burgundy konsisten dengan **validation mode, emotional weight, dan narrative function** sebagaimana didefinisikan di SDOH Project Architecture v1.11

## Cek Visual & Format

**Owner-locked binary rule:** `Linear registry → exact Google Drive file ID → raw-byte SHA-256 → production; otherwise FAIL CLOSED.`

This short form is normative for production binary verification.

- [ ] Warna / surface sesuai theme (tidak tertukar Sage/Burgundy)
- [ ] Format telah diidentifikasi dengan benar: **Carousel, Reels, atau TikTok Poster**
- [ ] Visual mengikuti rules format-specific yang berlaku; aturan satu format tidak diterapkan otomatis ke format lain. TikTok Poster menggunakan [BUS-52](https://linear.app/bussiness-content-os/issue/BUS-52/satu-dosis-obat-hati-sage-tiktok-poster-production) sebagai base Poster authority dan [BUS-53](https://linear.app/bussiness-content-os/issue/BUS-53/satu-dosis-obat-hati-burgundy-tiktok-poster-production) hanya untuk Burgundy deterministic deltas / Burgundy validation.
- [ ] Asset identity / pairing logo-surface mengikuti SDOH Asset Registry bila asset tersebut digunakan
- [ ] **Canonical binary-resolution gate:** asset aktif di-resolve dari Linear / canonical provenance authority; exact binary wajib di-fetch dari **Google Drive file ID aktif** yang direkam pada registry/authority. Raw bytes wajib dihitung SHA-256 secara independen dan hasilnya harus MATCH dengan provenance/checksum aktif sebelum dipakai produksi. Tidak ada provider fallback untuk active production.
- [ ] **Binary fail-closed gate:** jika Google Drive active binary hilang, file ID tidak dapat di-resolve, SHA-256 mismatch, atau provenance/locator tidak dapat diverifikasi, status asset/output = **FAIL / NON-PRODUCTION**; jangan memakai Dropbox fallback, chat-runtime copy, File Library copy, attachment Linear historis, regenerated approximation, recompressed file, atau visual substitute sebagai pengganti canonical binary
- [ ] Jika ornament reusable digunakan, keberadaan dan identitas aset mengikuti Asset Registry, sedangkan placement / crop / scale / frequency mengikuti production rules format-specific; registry tidak mewajibkan ornament muncul di semua format
- [ ] Untuk Carousel, master yang dipakai adalah snapshot kanonis [BUS-49](https://linear.app/bussiness-content-os/issue/BUS-49/satu-dosis-obat-hati-carousel-master-template-system) dengan manifest theme yang sesuai; provenance/checksum aset dan environment mengikuti record [BUS-49](https://linear.app/bussiness-content-os/issue/BUS-49/satu-dosis-obat-hati-carousel-master-template-system), bukan preview HTML/JPEG historis
- [ ] Untuk Carousel, batas field editable/protected dan render report diperiksa terhadap kontrak [BUS-49](https://linear.app/bussiness-content-os/issue/BUS-49/satu-dosis-obat-hati-carousel-master-template-system); mekanik bersama dan CTA tetap diperiksa terhadap [BUS-47](https://linear.app/bussiness-content-os/issue/BUS-47/satu-dosis-obat-hati-sage-carousel-production) serta delta Burgundy [BUS-48](https://linear.app/bussiness-content-os/issue/BUS-48/satu-dosis-obat-hati-burgundy-carousel-production). Kelulusan master bukan kelulusan otomatis konten baru
- [ ] **Carousel renderer-origin gate:** output produksi berasal dari renderer kanonis [BUS-49](https://linear.app/bussiness-content-os/issue/BUS-49/satu-dosis-obat-hati-carousel-master-template-system), bukan generative reconstruction, redraw, approximation, atau visual substitution
- [ ] **Carousel provenance gate:** render report tersedia dan mengidentifikasi sekurang-kurangnya template/renderer version, theme manifest, environment yang dipin, reusable asset checksums/identities yang berlaku, dimensi output, dan output checksum
- [ ] **Carousel fail-closed gate:** jika renderer-origin atau provenance tidak dapat diverifikasi, atau required checksum-locked input tidak tersedia/lolos verifikasi, status output = **FAIL / NON-PRODUCTION**; output tidak boleh disebut production-ready, approved master derivative, atau publication-ready
- [ ] Untuk Reels, cek motion, layout, text/audio, dan QA tambahan sesuai issue production theme-format yang berlaku ([BUS-45](https://linear.app/bussiness-content-os/issue/BUS-45/satu-dosis-obat-hati-sage-reels-production) untuk Sage Reels; [BUS-46](https://linear.app/bussiness-content-os/issue/BUS-46/satu-dosis-obat-hati-burgundy-reels-production) untuk Burgundy Reels)
- [ ] **Carousel v0.4.0 layout-mode gate:** `layout_mode` hanya `text_only` atau `illustrated_single_character`; mode lain = FAIL / NON-PRODUCTION
- [ ] **Carousel character-source gate:** jika `illustrated_single_character`, character harus berasal dari `SDOH-OBJ-000006` P01–P08 active binary yang di-resolve melalui Linear → Google Drive dan SHA-256 harus MATCH
- [ ] **Carousel single-character gate:** jumlah character maksimal 1 dan hanya `CHAR_SLOT_01`; renderer tidak boleh menginfer, menggambar ulang, atau mensintesis karakter tambahan
- [ ] **Carousel character-manifest gate:** hanya `pose_id` P01–P08, anchor preset `lower_right` / `lower_center`, scale preset `md` / `lg`, dan `ground_mode = embedded` yang diperbolehkan; arbitrary x/y, width/height, rotation, flip, free crop, opacity override, recolor override, dan free transform = FAIL / NON-PRODUCTION
- [ ] **Carousel character-clearance gate:** rendered character harus mematuhi protected geometry dan minimum text-character clearance yang dikunci [BUS-49](https://linear.app/bussiness-content-os/issue/BUS-49/satu-dosis-obat-hati-carousel-master-template-system) v0.4.0; collision/overlap yang melanggar kontrak = FAIL / NON-PRODUCTION
- [ ] Tidak ada typo atau elemen penting yang melanggar safe/readability area format

## Cek TikTok Poster

Berlaku ketika artefak yang diperiksa adalah **TikTok Poster**.

- [ ] Master artwork adalah **4:5 / 1080×1350 px**; TikTok 9:16 diperlakukan sebagai presentation surface, bukan master artwork canvas
- [ ] Semua informasi esensial lengkap dan terbaca di dalam artwork 4:5; caption tidak diperlukan untuk memperbaiki pesan poster yang tidak lengkap
- [ ] Poster mengikuti **One Poster = One Narrative Thread** dan tidak memampatkan urutan Carousel menjadi satu frame
- [ ] Struktur naratif, bila seluruh role digunakan, tetap **Primary Statement → Elaboration → Resolution**; Elaboration/Resolution memperdalam thread yang sama
- [ ] Maksimum satu **Primary Visual** dan visual tersebut tidak membentuk narrative thread kedua
- [ ] Jika text mendekati Primary Visual, clearance diselesaikan menurut urutan [BUS-52](https://linear.app/bussiness-content-os/issue/BUS-52/satu-dosis-obat-hati-sage-tiktok-poster-production): reflow → constrain text-field width → adjust readable section spacing → limited type-size adjustment; global downsizing bukan respons default
- [ ] Negative space dipertahankan sebagai elemen komposisional aktif; area kosong tidak diisi hanya untuk menambah density
- [ ] Shared identity geometry mengikuti inheritance yang berlaku di [BUS-52](https://linear.app/bussiness-content-os/issue/BUS-52/satu-dosis-obat-hati-sage-tiktok-poster-production) kecuali ada exception berbasis prototype evidence
- [ ] Untuk **Sage Poster**, semantic/visual treatment mengikuti [BUS-52](https://linear.app/bussiness-content-os/issue/BUS-52/satu-dosis-obat-hati-sage-tiktok-poster-production) dan authority theme/project yang dirujuknya
- [ ] Untuk **Burgundy Poster**, gunakan [BUS-53](https://linear.app/bussiness-content-os/issue/BUS-53/satu-dosis-obat-hati-burgundy-tiktok-poster-production) deterministic delta: Burgundy background / Sage foreground, Moon Theme Emblem, approved Sage-on-Burgundy identity treatment, Seri Jujur semantics, dan **no-mirror rule**
- [ ] Metrik seperti **72 / 46 / 54 px**, exact spacing, text-field coordinates, exclusion-zone dimensions, character scale/anchor, copy-length thresholds, dan additional layout classes tidak diperlakukan sebagai canonical numeric requirements kecuali kemudian dikunci secara eksplisit

## Cek Caption

- [ ] Carousel dan Reels mengikuti **cross-format caption parity** dari Production SOP: pola dasar caption sama; format tidak membuat formula caption terpisah tanpa exception yang disetujui
- [ ] Caption tetap theme-adaptive: Sage memakai recognition / permission / accompaniment; Burgundy memakai honesty / clarification / legitimization / backbone
- [ ] Caption menutup dengan signature `satu dosis obat hati` sebelum baseline hashtag, kecuali ada exception yang disetujui secara eksplisit
- [ ] Caption bukan copy mentah dari on-visual content; ia memberi konteks, kedalaman, atau ruang tambahan tanpa sekadar mengulang isi visual
- [ ] Nada tetap pelan, tidak menghakimi, dan konsisten dengan voice SDOH
- [ ] Caption mengikuti theme yang dipilih: **Sage** menekankan recognition / permission / accompaniment; **Burgundy** menekankan honesty / clarity / legitimization / backbone tanpa dipaksa menjadi comfort language
- [ ] CTA ringan boleh digunakan bila sesuai, tetapi tidak wajib dan tidak boleh mengubah konten reflektif menjadi engagement bait
- [ ] Footer dan variasi dialek Manado, bila digunakan, mengikuti Production SOP yang berlaku dan dipakai secara sengaja, bukan inkonsisten

## Cek Hashtag

- [ ] Pakai 5 hashtag fix: #satudosisobathati #obathati #manado #mentalhealthmanado #pelanpelanaja

## Dependency Maintenance — SDOH-OBJ-000006 Re-Canonicalization — v1.18

Active Asset Registry dependency synchronized to v1.15 following the Owner-approved controlled re-canonicalization of `SDOH-OBJ-000006` and registration of its eight transparent pose derivatives. The object ID and semantic scope are unchanged. The canonical master pose sheet remains identity authority; pose selection and deployment remain production-lane decisions. This amendment changes no QA gate or checklist requirement.

## Dependency Maintenance — SDOH-OBJ-000009 Re-Canonicalization — v1.17

Active Asset Registry dependency synchronized to v1.14 following the Owner-approved controlled re-canonicalization of `SDOH-OBJ-000009`. The object ID and semantic scope are unchanged; only its active canonical source checksum/provenance changed. QA continues to resolve reusable asset identity and active checksums through the current Asset Registry. This is dependency-pointer maintenance only; no QA checklist, theme semantics, format rules, renderer mechanics, or production approval status changed.

## Historical Dependency Maintenance — Burgundy Logo Source Registration

Historical record: the Asset Registry dependency was synchronized to v1.13 following the Owner-approved [BUS-48](https://linear.app/bussiness-content-os/issue/BUS-48/satu-dosis-obat-hati-burgundy-carousel-production) logo source registration. That pointer was later superseded by the v1.14 synchronization above. This historical record does not define the active dependency.

## Carousel Master Routing — Conformance Maintenance

Routing clarified to the already-canonical [BUS-49](https://linear.app/bussiness-content-os/issue/BUS-49/satu-dosis-obat-hati-carousel-master-template-system) master authority following the downstream conformance sweep. [BUS-24](DIUA-DIC-000007_SDOH-Project-Architecture.md) semantics, [BUS-28](DIUA-DIC-000011_SDOH-Asset-Registry.md) asset identities, [BUS-47](https://linear.app/bussiness-content-os/issue/BUS-47/satu-dosis-obat-hati-sage-carousel-production) shared rules and [BUS-48](https://linear.app/bussiness-content-os/issue/BUS-48/satu-dosis-obat-hati-burgundy-carousel-production) Burgundy deltas retain their ownership. Existing workflow/checks now point to the implementation owner; no renderer settings, caption/cadence, theme meaning or document version are changed. This record is documentation maintenance, not a render or publication approval.

## Re-Canonicalization Dependency Sync — 2026-09-11

Dependency synchronization completed after `SDOH-OBJ-000009` re-canonicalization. Active dependency: **SDOH Asset Registry v1.14, CANONICAL**. This record confirms conformance only; no additional QA requirement, output approval, or renderer change is introduced.

## Dependency Maintenance — SDOH-OBJ-000007 Re-Canonicalization — v1.19

Active Asset Registry dependency synchronized to v1.16 following the Owner-approved controlled re-canonicalization and durable Dropbox materialization of `SDOH-OBJ-000007`. Object identity, canonical Sage token `#94AC9C`, and semantic scope are unchanged; only the active source checksum/provenance record changed. QA continues to resolve reusable asset identity and active checksums through the current Asset Registry. No QA checklist, theme semantic, production-lane rule, or Carousel renderer gate changed in this amendment.

## Dependency Maintenance — SDOH-OBJ-000008 Re-Canonicalization — v1.20

Active Asset Registry dependency synchronized to v1.17 following the Owner-approved controlled re-canonicalization and durable Dropbox materialization of `SDOH-OBJ-000008` — Burgundy Paper Texture. The object ID, Burgundy token `#5C1B29`, semantic scope, and format-specific deployment ownership are unchanged; only the active canonical source checksum/provenance changed. QA continues to resolve reusable asset identity and active checksums through the current Asset Registry. This is dependency-pointer maintenance only; no QA checklist, theme semantics, format rules, Carousel provenance gates, or production-approval requirements changed.

## Reels Five-Image Narrative QA — v1.0

Apply to both Sage and Burgundy Reels unless an approved exception is recorded.

### Structure

- [ ] Reel uses **5 static image slides / visual beats** by default.
- [ ] Target runtime is approximately **30 seconds**, with a preferred working band of **27–33 seconds**.
- [ ] Timing follows natural narration cadence; slides are not forced into equal duration.
- [ ] A duration outside the preferred band is justified by the approved script/voice performance rather than accidental drift.

### Narration–Visual Relationship

- [ ] On-screen text is concise and functions as an emotional/semantic anchor rather than a full transcript.
- [ ] Narration adds context, story, interpretation, emotional movement, or connective tissue around the visual beat.
- [ ] Narration does **not** mostly read the visible text verbatim.
- [ ] Intentional repetition of a short anchor phrase is acceptable only when rhetorically useful.
- [ ] The five images and narration form one continuous narrative rather than five disconnected quote cards.

### Voice-First Assembly

- [ ] Narration take is approved before final visual timing is locked.
- [ ] Cuts align with natural pauses or meaningful spoken-beat transitions.
- [ ] Runtime is not padded with decorative motion, unnecessary silence, or repeated copy merely to reach \~30 seconds.
- [ ] Any final hold supports the landing rather than functioning as filler.

### Theme Fit

- [ ] Sage narration expands recognition, permission, accompaniment, or validation of condition without generic motivation.
- [ ] Burgundy narration expands honesty, clarification, legitimization, boundary, courage, or backbone without aggression or generic hard-truth rhetoric.

### Grandfathered Master Boundary

`SDOH-SAGE-REEL-0001` remains valid as a locked historical reference despite its \~21.149-second runtime. This QA baseline governs new Reel production unless an explicit exception is approved.

## Dependency Maintenance — Suicide-Prevention Source Coverage — v1.31

Active Research Source List dependency synchronized from v1.13 to v1.14 after `SRC-06`–`SRC-09` added WHO WSPD 2026, WHO responsible-media guidance, IASP WSPD 2026, and Kemenkes Healing119 claim-scoped coverage. No QA criterion, safety threshold, theme-fit rule, format rule, asset gate, or publication rule changed.
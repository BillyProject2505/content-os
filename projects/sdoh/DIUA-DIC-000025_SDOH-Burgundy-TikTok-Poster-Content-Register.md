---
document_name: "Satu Dosis Obat Hati — Burgundy TikTok Poster Content Register"
document_class: "Domain/Project Operational Content Register"
structural_classification: "Tiered — Document Tier: Domain/Project (Tier 2) — Satu Dosis Obat Hati"
system: "Content OS → Satu Dosis Obat Hati (SDOH)"
owner: "Billy Fernando Mende"
related_issue: "BUS-54"
universal_identifier: "DIUA-DIC-000025"
version: "1.2"
status: "CANONICAL / LOCKED"
depends_on:
  - id: "DIUA-DIC-000007"
    name: "Satu Dosis Obat Hati — Project Architecture"
    version: "1.13"
    status: "CANONICAL"
  - id: "DIUA-DIC-000008"
    name: "Satu Dosis Obat Hati — Production SOP"
    version: "1.39"
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
  locator: "https://linear.app/bussiness-content-os/document/sdoh-burgundy-tiktok-poster-content-register-v12-canonical-d5c5bb603ea9"
representation_profile: "DIUA-DIC-000026@1.3"
---
## Document Identity

| Field | Value |
| -- | -- |
| Document Name | Satu Dosis Obat Hati — Burgundy TikTok Poster Content Register |
| Document Class | Domain/Project Operational Content Register |
| System | Content OS → Satu Dosis Obat Hati (SDOH) |
| Version | 1.2 |
| Status | **CANONICAL / LOCKED** — v1.2 conformance sync (2026-09-13): current authority/dependency and identifier-registry pointers synchronized; the locked register schema and content-instance records are unchanged. Structural lock was approved through [BUS-54](https://linear.app/bussiness-content-os/issue/BUS-54/satu-dosis-obat-hati-tiktok-poster-content-registers) conformance review on 2026-09-13. |
| Owner | Billy Fernando Mende |
| Related Issue | [BUS-54](https://linear.app/bussiness-content-os/issue/BUS-54/satu-dosis-obat-hati-tiktok-poster-content-registers) — TikTok Poster Content Registers |
| Structural Classification | Tiered — Document Tier: Domain/Project (Tier 2) — Satu Dosis Obat Hati |
| Universal Identifier (UNIS/DIC) | `DIUA-DIC-000025` — ALLOCATED / ACTIVE, per [BUS-16](../../system/Content-OS-Universal-Identifier-Registry.md) v1.20 and [BUS-17](../../system/Content-OS-Universal-Identifier-Registration-Record.md) v1.18 |
| Depends On | SDOH Project Architecture v1.13; SDOH Production SOP v1.39; SDOH QA Document v1.31; SDOH Asset Registry v1.28 |
| Scope | Burgundy TikTok Poster content instances and their publication events |
| References | [BUS-24](DIUA-DIC-000007_SDOH-Project-Architecture.md) semantics; [BUS-25](DIUA-DIC-000008_SDOH-Production-SOP.md) Production SOP v1.39; [BUS-27](DIUA-DIC-000010_SDOH-QA-Document.md) QA v1.31; [BUS-28](DIUA-DIC-000011_SDOH-Asset-Registry.md) asset identity/provenance; [BUS-52](https://linear.app/bussiness-content-os/issue/BUS-52/satu-dosis-obat-hati-sage-tiktok-poster-production) shared Poster base; [BUS-53](https://linear.app/bussiness-content-os/issue/BUS-53/satu-dosis-obat-hati-burgundy-tiktok-poster-production) Burgundy delta authority |
| ID konten lokal | `SDOH-BURGUNDY-POSTER-NNNN`; `0001` and `0002` allocated 2026-09-19 for September suicide-prevention campaign; next available `0003` |

## Purpose

Operational register for Burgundy TikTok Poster content instances. This document records instance identity, duplication review, production/QA evidence, caption state, final artefact location, and publication state. It does not define Poster production mechanics and does not create an independent Burgundy design system.

## Authority boundary

* [BUS-24](DIUA-DIC-000007_SDOH-Project-Architecture.md) owns project identity and Burgundy / Seri Jujur semantics.
* [BUS-25](DIUA-DIC-000008_SDOH-Production-SOP.md) v1.31 CANONICAL owns cross-format workflow and caption baseline.
* [BUS-27](DIUA-DIC-000010_SDOH-QA-Document.md) v1.28 CANONICAL owns project-level QA.
* [BUS-28](DIUA-DIC-000011_SDOH-Asset-Registry.md) owns reusable asset identity/provenance.
* [BUS-52](https://linear.app/bussiness-content-os/issue/BUS-52/satu-dosis-obat-hati-sage-tiktok-poster-production) owns shared Poster base mechanics.
* [BUS-53](https://linear.app/bussiness-content-os/issue/BUS-53/satu-dosis-obat-hati-burgundy-tiktok-poster-production) owns Burgundy deterministic deltas and Burgundy-specific validation.
* [BUS-54](https://linear.app/bussiness-content-os/issue/BUS-54/satu-dosis-obat-hati-tiktok-poster-content-registers) owns content-instance registration structure only.

## Theme focus

**Burgundy / Seri Jujur — validasi keberanian; core promise: “kamu jujur.”** Theme meaning follows [BUS-24](DIUA-DIC-000007_SDOH-Project-Architecture.md). This register records application; it does not redefine theme semantics or Burgundy deltas.

## ID scheme

`SDOH-BURGUNDY-POSTER-NNNN`

IDs are sequential, never reused, and remain attached to the same content instance across revisions.

**Next available ID:** `SDOH-BURGUNDY-POSTER-0003`

## Required instance fields

| Field | Requirement |
| -- | -- |
| Content ID | Required |
| Working title/topic | Required |
| Core angle / narrative thread | Required |
| Primary Statement | Required |
| Elaboration | Optional |
| Resolution | Optional |
| Primary Visual / pose | Optional |
| Source/adaptation ID | Required when adapted |
| Cross-register duplicate-check record | Required before READY; record date, scope/registers checked, comparator IDs, result, and rationale |
| Copy revision/status | Required |
| Caption revision/status | Required before READY |
| [BUS-52](https://linear.app/bussiness-content-os/issue/BUS-52/satu-dosis-obat-hati-sage-tiktok-poster-production)/[BUS-53](https://linear.app/bussiness-content-os/issue/BUS-53/satu-dosis-obat-hati-burgundy-tiktok-poster-production) rule/evidence reference | Required |
| Asset/provenance evidence | Required when registered reusable assets are used |
| QA evidence | Required before READY |
| Owner approval evidence | Required before READY |
| Final artefact locator | Required before READY |
| Material status | Required |
| Publication status | Required |
| Publication evidence | Required for PUBLISHED |

## Lifecycle

Material lifecycle: `DRAFT → IN PRODUCTION → READY`; use `RETIRED` when an instance is intentionally withdrawn.

Publication lifecycle is independent: `PLANNED → SCHEDULED → PUBLISHED`; `CANCELLED`, `REMOVED`, or `UNKNOWN` may be used when applicable.

**READY is not equivalent to PUBLISHED.**

## Duplication rule

Before READY, compare the candidate against Sage and Burgundy Poster registers plus active Carousel and Reels registers. Compare semantic message, angle, hook/Primary Statement, and substantive copy. Same topic alone is not duplication. The duplicate-check record must state date, checked register scope, comparator content IDs, result, and rationale. Cross-format adaptation must identify its source content ID and explain the changed narrative or medium-specific function.

## Burgundy delta boundary

Register entries may record which [BUS-53](https://linear.app/bussiness-content-os/issue/BUS-53/satu-dosis-obat-hati-burgundy-tiktok-poster-production) delta or validation evidence governed an instance, but may not redefine [BUS-53](https://linear.app/bussiness-content-os/issue/BUS-53/satu-dosis-obat-hati-burgundy-tiktok-poster-production). Reverse color semantics do not imply mirrored layout, and no Burgundy-specific implementation override may originate from the register itself.

## Prototype boundary

[BUS-53](https://linear.app/bussiness-content-os/issue/BUS-53/satu-dosis-obat-hati-burgundy-tiktok-poster-production) validation prototypes are production-system evidence and do not automatically receive content IDs. They enter this register only if explicitly selected for actual content production/publication.

## Register material

One row per content ID. Revisions stay under the same content ID.

| Content ID | Topic / title | Core angle / narrative thread | Copy & revision | Primary Visual | Source / adaptation | Material status | Duplicate-check record | Production authority / provenance | QA & Owner approval | Final artefact |
| -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- |

| SDOH-BURGUNDY-POSTER-0001 | Suicide prevention — Meminta bantuan bukan gagal | Help-seeking sebagai bentuk keberanian; konflik internal antara membutuhkan bantuan dan menganggap help-seeking sebagai kelemahan/gagal, lalu terhubung dengan dukungan. | **Copy v0.2 OWNER APPROVED / LOCKED. Caption v0.1 OWNER APPROVED / LOCKED.** Primary Statement: `mengaku “aku butuh bantuan” bukan tanda gagal`. Elaboration: `kadang kita terbiasa menanggung semuanya sendirian sampai meminta bantuan terasa seperti kelemahan.` Resolution: `jujur tentang batasmu juga bentuk keberanian. kamu boleh mencari dukungan dari orang tepercaya atau tenaga profesional.` | **text_only — OWNER APPROVED / LOCKED.** No Primary Visual; deliberate restraint to avoid visually coding help-seeking as weakness. | Campaign source: [BUS-69](<https://linear.app/bussiness-content-os/issue/BUS-69/september-2026-suicide-prevention-campaign-19-30-sep>). Intentional cross-format pair with **SDOH-BURGUNDY-CAR-0005 /** [BUS-78](https://linear.app/bussiness-content-os/issue/BUS-78/26-sep-sdoh-burgundy-car-0005-meminta-bantuan-bukan-gagal), whose approved/published expansion was used to reconcile the Poster candidate. | **READY** — copy, artwork, QA, and Caption v0.1 Owner-approved. Original 2026-09-26 slot elapsed; publication not inferred. | **2026-09-27 re-check:** exact-angle hit = SDOH-BURGUNDY-CAR-0005 / [BUS-78](https://linear.app/bussiness-content-os/issue/BUS-78/26-sep-sdoh-burgundy-car-0005-meminta-bantuan-bukan-gagal) only, an intentional cross-format pair; campaign/register records are administrative hits. Result: **PASS — no accidental exact-angle duplicate found**. | [BUS-53](https://linear.app/bussiness-content-os/issue/BUS-53/satu-dosis-obat-hati-burgundy-tiktok-poster-production)/[BUS-52](https://linear.app/bussiness-content-os/issue/BUS-52/satu-dosis-obat-hati-sage-tiktok-poster-production); Google Drive-only canonical inputs checksum-verified; v0.2 Drive file ID `1Uc_D6YlGiedilEHctlReMxcBqmYOQ5EX`, SHA-256 `0472e3ff4ab7ac53cba7de12658efcae28dab5dc9c85049fb511c05d802c4aff`; folder ID `1BWuzq0VCNydBQ5p9yuiLw1DAeePg14-7`. | [BUS-27](DIUA-DIC-000010_SDOH-QA-Document.md) **/** [BUS-53](https://linear.app/bussiness-content-os/issue/BUS-53/satu-dosis-obat-hati-burgundy-tiktok-poster-production) **QA PASS — OWNER APPROVED.** 1080×1350, text-only hierarchy, mobile legibility, negative space, Burgundy identity, and Drive persistence all PASS. | Google Drive: `SDOH-BURGUNDY-POSTER-0001_v0.2_APPROVED.png`, file ID `1Uc_D6YlGiedilEHctlReMxcBqmYOQ5EX`; folder `SDOH-BURGUNDY-POSTER-0001_v0.2_APPROVED`, ID `1BWuzq0VCNydBQ5p9yuiLw1DAeePg14-7`. |

| SDOH-BURGUNDY-POSTER-0002 | Suicide prevention — Dengarkan ketika hidup terasa terlalu berat | Cross-format compression of SDOH-BURGUNDY-CAR-0004: respons pertama adalah mendengar tanpa mengecilkan pengalaman, lalu membantu tetap terhubung dengan dukungan. | **Copy v0.2 PRODUCTION CANDIDATE — QA PASS.** Primary Statement: `Ketika seseorang bilang hidup terasa terlalu berat, jangan buru-buru menyuruhnya kuat.` Elaboration: `Dengarkan dulu. Jangan kecilkan apa yang sedang ia rasakan.` Resolution: `Kamu tidak harus punya semua jawaban. Bantu dia tetap terhubung dengan dukungan.` **Caption v0.1 DEPLOYED / OWNER-APPROVED BY PUBLICATION.** | `SDOH-OBJ-000006-P06` — Seated, Head Slightly Lowered; one Primary Visual, lower-right supporting role. | Source/adaptation ID: **SDOH-BURGUNDY-CAR-0004**; intentional cross-format compression for TikTok Poster. | **READY** — artifact v0.2 QA PASS and Owner deployed the reviewed artifact in a live TikTok publication. Publication lifecycle is tracked separately as PUBLISHED. | **2026-09-22 cross-register check:** scope = Burgundy Poster, Sage Poster, Burgundy Carousel, Sage Carousel, Burgundy Reels, Sage Reels. Exact-angle comparator = **SDOH-BURGUNDY-CAR-0004** only, an intentional source pair. Related but materially distinct campaign comparators include **SDOH-SAGE-POSTER-0002**, **SDOH-SAGE-POSTER-0003**, and **SDOH-SAGE-CAR-0003**. Result: **PASS — no accidental duplicate**; Poster is a single-frame compression with P06 while source Carousel is five-slide text-only. | [BUS-53](https://linear.app/bussiness-content-os/issue/BUS-53/satu-dosis-obat-hati-burgundy-tiktok-poster-production)/[BUS-52](https://linear.app/bussiness-content-os/issue/BUS-52/satu-dosis-obat-hati-sage-tiktok-poster-production); exact Drive artifact ID `16Ro-VTDrhP0D70Wj3tIVdz3BVlF-7Zbl`, PNG 1080×1350, SHA-256 `0065e9b45928340b59fc1ed99b63b8866b5f998d7fb6abf62c10b0239b862099`; registered background/Moon/P06/font/logo binaries checksum-verified. | [BUS-27](DIUA-DIC-000010_SDOH-QA-Document.md) **v1.31 /** [BUS-53](https://linear.app/bussiness-content-os/issue/BUS-53/satu-dosis-obat-hati-burgundy-tiktok-poster-production) **artifact QA PASS.** Owner publication of the reviewed v0.2 artifact on TikTok closes the deployed-material approval gate. Research/source traceability recorded below. | Google Drive: `SDOH-BURGUNDY-POSTER-0002_v0.2_REVIEW-CANDIDATE.png`, file ID `16Ro-VTDrhP0D70Wj3tIVdz3BVlF-7Zbl`; production folder ID `17SH2YuBPuVF1q8er6jDb8a9S_KIbKLst`. |

### SDOH-BURGUNDY-POSTER-0002 — Research/source evidence — 2026-09-22

Per Research Source List v1.14, the exact production copy is traceable as follows:

* **Claim/copy:** `Ketika seseorang bilang hidup terasa terlalu berat, jangan buru-buru menyuruhnya kuat.` + `Dengarkan dulu. Jangan kecilkan apa yang sedang ia rasakan.`
  * **SRC-06 — WHO WSPD 2026:** [https://www.who.int/campaigns/world-suicide-prevention-day/2026](<https://www.who.int/campaigns/world-suicide-prevention-day/2026>)
  * Supporting section reviewed: campaign theme / Start the Conversation / open and empathetic conversation, stigma reduction, support and help-seeking.
  * Access recorded by Research Source List: **2026-09-20**.
  * Boundary/adaptation: used as compassionate-conversation framing only; does **not** claim one conversation prevents suicide or guarantees safety.
  * **SRC-07 — WHO responsible-media guidance:** [https://www.who.int/publications/i/item/9789240076846](<https://www.who.int/publications/i/item/9789240076846>)
  * Supporting section reviewed: responsible communication dos/don’ts; empathetic framing, help-seeking; avoidance of sensationalization, romanticization, method/location detail and oversimplification.
  * Access recorded: **2026-09-20**.
  * Boundary/adaptation: media/communication guidance only; not a clinical risk-assessment protocol.
* **Claim/copy:** `Kamu tidak harus punya semua jawaban. Bantu dia tetap terhubung dengan dukungan.`
  * **SRC-06 — WHO WSPD 2026** and **SRC-08 — IASP WSPD 2026:** [https://www.iasp.info/wspd/](<https://www.iasp.info/wspd/>)
  * Supporting section reviewed: open/honest conversation, understanding, support and help-seeking.
  * Access recorded: **2026-09-20**.
  * Boundary/adaptation: supports awareness/help-seeking framing only; no therapeutic-effect or individual-outcome claim.
* **Caption safety extension:** if immediate safety risk is mentioned, use the Research Source List v1.14 boundary from **SRC-09 — Kemenkes Healing119**: [https://kesprimkom.kemkes.go.id/konten/158/151/0/cegah-bunuh-diri-dukung-kesehatan-jiwa-kenali-layanan-healing119-id](<https://kesprimkom.kemkes.go.id/konten/158/151/0/cegah-bunuh-diri-dukung-kesehatan-jiwa-kenali-layanan-healing119-id>)
  * Supporting section reviewed: initial psychological support/referral and direction to emergency/facility help for immediate danger.
  * Access recorded: **2026-09-20**.
  * Boundary: do not state 24/7 unless newly re-verified; do not present the service as long-term clinical therapy.

### Caption v0.1 — DEPLOYED / OWNER-APPROVED BY PUBLICATION

ketika seseorang bilang hidup terasa terlalu berat, kita mungkin ingin cepat memberi semangat atau mencari jawaban. tapi kamu juga bisa mulai dengan memberi ruang: dengarkan, jangan memotong, dan jangan mengecilkan yang ia rasakan.

kamu tidak harus menyelesaikan semuanya. tanyakan apa yang ia butuhkan dan bantu ia tetap terhubung dengan orang tepercaya atau bantuan profesional. jika ada risiko langsung terhadap keselamatannya, cari pertolongan darurat atau fasilitas kesehatan setempat.

satu dosis obat hati

We commemorate World Suicide Prevention Month to raise awareness and offer support.

#satudosisobathati #obathati #manado #mentalhealthmanado #pelanpelanaja

Caption status: **DEPLOYED / OWNER-APPROVED BY PUBLICATION**. Owner-provided TikTok evidence shows the live post and the visible caption preview begins with the Caption v0.1 wording. The screenshot does not expose the entire caption body, so full-body textual identity is not independently reconstructed from the image; the deployed revision is nevertheless treated as Owner-approved for this publication event.

## Publication log

One row per publication event for one content ID and one account/platform.

| Content ID | Account / platform | Planned/scheduled time (WITA) | Publication status | Pre-publish account/queue check: time & result | Actual publish time (WITA) | URL / post ID | Repost/removal notes & approval |
| -- | -- | -- | -- | -- | -- | -- | -- |

| SDOH-BURGUNDY-POSTER-0001 | TikTok — `satu dosis obat hati` | **2026-09-26, time TBD (WITA)** — original campaign slot | **PUBLISHED** | Original pre-publish queue check was not separately recorded. Owner later supplied the live TikTok URL and exact actual publication time. | **2026-09-27, 17:55 WITA — Owner-confirmed actual publication time** | `https://vt.tiktok.com/ZSbjy4LqR/` | Published one day after the original campaign slot. Material remained the approved v0.2 artifact + Caption v0.1. |

`SDOH-BURGUNDY-POSTER-0001` has a verified **PUBLISHED** event. Actual publication time: **2026-09-27, 17:55 WITA**. Live TikTok URL: `https://vt.tiktok.com/ZSbjy4LqR/`.

### Publication evidence — SDOH-BURGUNDY-POSTER-0001 — 2026-09-27

* Platform: TikTok.
* Account: `satu dosis obat hati`.
* Actual publish time: **27 Sep 2026, 17:55 WITA — Owner-confirmed**.
* Live TikTok URL: `https://vt.tiktok.com/ZSbjy4LqR/`.
* Material lifecycle: **READY**.
* Publication lifecycle: **PUBLISHED**.
* Original planned slot: 26 Sep 2026 — historical / missed.

| SDOH-BURGUNDY-POSTER-0002 | TikTok — `satu dosis obat hati` | **2026-09-22, 19:30–20:00 WITA** — canonical Google Calendar slot | **PUBLISHED** | Owner supplied live-post visual evidence and later supplied the exact publication time and URL. Exact pre-publish queue check was not separately recorded. | **2026-09-22, 23:55 WITA — Owner-confirmed actual publication time** | `https://vt.tiktok.com/ZSb1gkVd4/` | Same-day cross-format pair with Instagram SDOH-BURGUNDY-CAR-0004 under [BUS-69](https://linear.app/bussiness-content-os/issue/BUS-69/september-2026-suicide-prevention-campaign-19-30-sep). TikTok publication is fully recorded with actual time + live URL. |

`SDOH-BURGUNDY-POSTER-0002` has a verified **PUBLISHED** event. Actual publication time: **2026-09-22, 23:55 WITA**. Live TikTok URL: `https://vt.tiktok.com/ZSb1gkVd4/`.

### Publication evidence — SDOH-BURGUNDY-POSTER-0002 — 2026-09-23

Owner confirmed that the item had been posted the previous night and provided a photograph showing the live TikTok post.

* Platform: TikTok.
* Account display visible: `satu dosis obat hati`.
* Artwork: matches the reviewed Burgundy Poster v0.2.
* Visible caption preview: matches the opening of Caption v0.1.
* Actual publish time: **22 Sep 2026, 23:55 WITA — Owner-confirmed**.
* Live TikTok URL: `https://vt.tiktok.com/ZSb1gkVd4/`.
* Material lifecycle: **READY**.
* Publication lifecycle: **PUBLISHED**.

Owner deployment of the reviewed artifact is treated as approval of the deployed material revision.

## History coverage rule

An empty register or empty publication log does not prove that no historical content/publication exists. Any duplicate-check or publication claim must state the actually verified scope and must not silently infer unverified history.

## Structural lock — v1.0

This v1.0 lock freezes the register schema, lifecycle separation, duplicate-check evidence requirement, authority boundary, Burgundy delta boundary, prototype boundary, material table, and publication-log model. Future structural changes require a new revision/version. Routine addition or maintenance of content-instance rows does not require a new register version unless the structure itself changes.
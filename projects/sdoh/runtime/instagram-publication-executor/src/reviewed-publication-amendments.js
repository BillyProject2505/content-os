import { sha256Hex } from "./execution-authority.js";

// Owner confirmed the manually edited published caption on 2026-11-09 and
// authorized reconciliation. Its exact SHA matches Meta evidence in run
// 42636664300. This is a single-post acceptance record, never publish authority.
// Narrative unchanged: November hashtags, flag emoji, and newline changes only.
// Reviewed, single-publication post-publish evidence exceptions.
// These records never authorize publication and never modify approved source copy.
const amendments = Object.freeze([
  Object.freeze({
  id: "SDOH-SAGE-CAR-0015-PUBLISHED-CAPTION-20261109",
  job_id: "IG-SDOH-SAGE-CAR-0015-20261109T113000Z",
  content_id: "SDOH-SAGE-CAR-0015",
  account: "@satudosisobathati",
  scheduled_at: "2026-11-09T19:30:00+08:00",
  original_sha256: "5d13d0f741ec7da701996fcdb662f1884f4c7ce1cbe71fd45a56c5f0a6fc88c1",
  published_sha256: "5b8e9de5ce40ffb45fccf6c9b8f344b6bed6e895609c0c0ec9600747ca7af257",
  media_id: "18150047068583407",
  permalink: "https://www.instagram.com/p/DfhOwnMIBwK/",
  published_at: "2026-11-09T11:31:53+0000",
  evidence_url: "https://github.com/BillyProject2505/content-os/actions/runs/42636664300",
  }),  Object.freeze({
    id: "SDOH-SAGE-CAR-0016-PUBLISHED-CAPTION-20261112",
    job_id: "IG-SDOH-SAGE-CAR-0016-20261112T113000Z",
    content_id: "SDOH-SAGE-CAR-0016",
    account: "@satudosisobathati",
    scheduled_at: "2026-11-12T19:30:00+08:00",
    original_sha256: "277efb064ae005695879fa6444b7de7c84dd4bc1ed19b88bc658247d0dce8e87",
    published_sha256: "acd81caba82d1d6f5a022b652b8c29c3be288753bd72c14066683568677de963",
    media_id: "18101726075534459",
    permalink: "https://www.instagram.com/p/DfpKqW1kfwE/",
    published_at: "2026-11-12T13:30:10+0000",
    exact_change: "REMOVE_ONE_TRAILING_LF",
    evidence_url: "https://github.com/BillyProject2505/content-os/actions/runs/43228783158",
  }),
  Object.freeze({
    id: "SDOH-BURGUNDY-CAR-0017-PUBLISHED-CAPTION-20261111",
    job_id: "IG-SDOH-BURGUNDY-CAR-0017-20261111T113000Z",
    content_id: "SDOH-BURGUNDY-CAR-0017",
    account: "@satudosisobathati",
    scheduled_at: "2026-11-11T19:30:00+08:00",
    original_sha256: "d096ffe21e99f7e2351b19cf5b506b055d85ea82d2abb52a9475a597d986ce20",
    published_sha256: "ac85c2f3f0f01a512d63c69313a402203384ab130b6ddff04f6431c6da165dad",
    media_id: "18122249815986930",
    permalink: "https://www.instagram.com/p/DfmYO-Sm5UY/",
    published_at: "2026-11-11T11:31:01+0000",
    exact_change: "REMOVE_ONE_TRAILING_LF",
    evidence_url: "https://github.com/BillyProject2505/content-os/actions/runs/43234618196",
  }),
]);

// Only called by reconciliation after immutable stored authority validation.
// An exact ID/remote identity and both caption SHA-256 hashes are required.
// The 0016 and 0017 exceptions accept ONLY one missing trailing LF for their exact posts.
export async function matchReviewedPublicationAmendment({ job, caption, remote }) {
  if (!job || !remote || typeof caption !== "string" ||
      typeof remote.caption !== "string") return null;

  for (const amendment of amendments) {
    if (job.id !== amendment.job_id ||
        job.content_id !== amendment.content_id ||
        job.account !== amendment.account ||
        job.platform !== "instagram" || job.format !== "carousel" ||
        Date.parse(job.scheduled_at) !== Date.parse(amendment.scheduled_at) ||
        remote.id !== amendment.media_id ||
        remote.permalink !== amendment.permalink ||
        remote.timestamp !== amendment.published_at) continue;

    if (amendment.exact_change === "REMOVE_ONE_TRAILING_LF" &&
        !(caption.endsWith("\n") && remote.caption === caption.slice(0, -1))) continue;

    if (await sha256Hex(caption) !== amendment.original_sha256 ||
        await sha256Hex(remote.caption) !== amendment.published_sha256) continue;

    return { ...amendment };
  }

  return null;
}

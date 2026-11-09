import { sha256Hex } from "./execution-authority.js";

// Owner confirmed the manually edited published caption on 2026-11-09 and
// authorized reconciliation. Its exact SHA matches Meta evidence in run
// 42636664300. This is a single-post acceptance record, never publish authority.
// Narrative unchanged: November hashtags, flag emoji, and newline changes only.
const amendment = Object.freeze({
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
});

// Only called by reconciliation after immutable stored authority validation.
// No caller-controlled hashes, wildcard matching, or normalization of hashes.
export async function matchReviewedPublicationAmendment({ job, caption, remote }) {
  if (!job || job.id !== amendment.job_id ||
      job.content_id !== amendment.content_id ||
      job.account !== amendment.account ||
      job.platform !== "instagram" || job.format !== "carousel" ||
      Date.parse(job.scheduled_at) !== Date.parse(amendment.scheduled_at) ||
      !remote || remote.id !== amendment.media_id ||
      remote.permalink !== amendment.permalink ||
      remote.timestamp !== amendment.published_at ||
      typeof caption !== "string" || typeof remote.caption !== "string") return null;
  if (await sha256Hex(caption) !== amendment.original_sha256 ||
      await sha256Hex(remote.caption) !== amendment.published_sha256) return null;
  return { ...amendment };
}

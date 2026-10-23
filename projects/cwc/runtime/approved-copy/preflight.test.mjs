import test from "node:test";
import assert from "node:assert/strict";
import { fingerprintOf, validateCopy } from "./preflight.mjs";

function fixture() {
  const copy = {
    schema: "cwc-approved-copy-v1",
    content_id: "CWC-CRSL-9999", // synthetic fixture; never an allocation
    format: "CRSL",
    status: "COPY_APPROVED",
    approval_record_url: "https://linear.app/bussiness-content-os/issue/BUS-170/cwc-approved-copy-automation-pilot-sdoh-pattern-adoption",
    sensitive_claim: true,
    source_evidence: [{
      claim: "PrEP is a prevention intervention requiring evidence-based clinical use",
      source_url: "https://www.who.int/",
      checked_at: "2026-10-24"
    }],
    slides: [{slide: 1, text: "Kenali PrEP dari sumber yang tepat."},
             {slide: 2, text: "Bicarakan pilihan dengan tenaga kesehatan."}],
    caption: "Untuk informasi medis, konsultasikan dengan tenaga kesehatan. Ikuti @cozwecare.id dan bagikan materi ini bila bermanfaat. #PrEP #HIV #EdukasiHIV #TesHIV #Manado",
    local_hashtag: "#Manado",
    copy_fingerprint: ""
  };
  copy.copy_fingerprint = fingerprintOf(copy);
  return copy;
}
function check(copy) {
  return validateCopy(copy, { contentId: "CWC-CRSL-9999", expectedFingerprint: copy.copy_fingerprint });
}
function mustFail(change, code) {
  const copy = fixture();
  change(copy);
  assert.throws(() => check(copy), (error) => error.code === code);
}
test("synthetic approved copy passes integrity preflight without granting authority", () => {
  const evidence = check(fixture());
  assert.equal(evidence.result, "COPY_PREFLIGHT_PASS");
  assert.equal(evidence.approval_evidence_verified, false);
  assert.equal(evidence.research_claims_verified, false);
  assert.equal(evidence.publication_authorized, false);
  assert.equal(evidence.deterministic_render_performed, false);
});
test("draft copy is rejected", () => mustFail((c) => { c.status = "COPY_DRAFT"; }, "COPY_NOT_APPROVED"));
test("wrong content ID is rejected", () => mustFail((c) => { c.content_id = "SDOH-SAGE-CAR-9999"; }, "CONTENT_ID_INVALID"));
test("modified slide after approval is rejected", () => mustFail((c) => { c.slides[0].text = "Changed after approval"; }, "FINGERPRINT_MISMATCH"));
test("modified caption after approval is rejected", () => mustFail((c) => { c.caption += " New claim"; }, "FINGERPRINT_MISMATCH"));
test("inconsistent dispatcher fingerprint is rejected", () => {
  const c = fixture();
  assert.throws(() => validateCopy(c, {contentId:c.content_id, expectedFingerprint:"0".repeat(64)}),
    (error) => error.code === "FINGERPRINT_MISMATCH");
});
test("sensitive claim without research evidence is rejected", () => mustFail((c) => { c.source_evidence=[]; }, "SOURCES_MISSING"));
test("non HTTPS source URL is rejected", () => mustFail((c) => { c.source_evidence[0].source_url="http://example.test/"; }, "SOURCES_INVALID"));
test("wrong slide order is rejected", () => mustFail((c) => { c.slides[1].slide=3; }, "SLIDE_ORDER_INVALID"));
test("missing follow/share prompt is rejected", () => mustFail((c) => { c.caption=c.caption.replace("bagikan", "lihat"); }, "CAPTION_CTA_MISSING"));
test("six hashtags are rejected", () => mustFail((c) => { c.caption+=" #Kesehatan"; }, "CAPTION_HASHTAGS_INVALID"));
test("missing local tag is rejected", () => mustFail((c) => { c.local_hashtag="#Gorontalo"; }, "CAPTION_LOCAL_TAG_MISSING"));
test("unknown hidden schema field is rejected", () => mustFail((c) => { c.execution_token="unsafe"; }, "SCHEMA_INVALID"));
test("untrusted approval reference is rejected", () => mustFail((c) => { c.approval_record_url="https://example.test/issue/BUS-170"; }, "APPROVAL_REFERENCE_INVALID"));
test("approval status flip alone does not change fingerprint", () => {
  const c = fixture(), fp = c.copy_fingerprint;
  c.status = "COPY_DRAFT";
  assert.equal(fingerprintOf(c), fp);
});

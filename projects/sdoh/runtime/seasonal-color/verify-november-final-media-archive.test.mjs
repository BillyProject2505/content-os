// Archive registry consistency; no network, downloads, publishing, or mutation.
import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const dir = new URL("./",import.meta.url);
const read=(name)=>JSON.parse(readFileSync(new URL(name,dir),"utf8"));
const archive=read("2026-11-final-media-archive.json");
const binding=read("2026-11-content-binding.json");
const palette=read("2026-11-trans-awareness.json");

test("13 final media records exactly match canonical campaign IDs, dates and immutable copy fingerprints",()=>{
  assert.equal(archive.schema,"sdoh-november-2026-final-media-archive-v1");
  assert.equal(archive.decision,"OWNER_FINAL_VISUAL_AND_CAPTION_APPROVED");
  assert.equal(archive.archive_status,"ARCHIVED_AND_SHA256_READBACK_VERIFIED");
  assert.equal(archive.items.length,13);
  assert.deepEqual(archive.items.map(x=>[x.content_id,x.theme,x.editorial_date,x.copy_fingerprint]),
    binding.items.map(x=>[x.content_id,x.theme,x.target_date,x.copy_fingerprint]));
  assert.equal(new Set(archive.items.map(x=>x.content_id)).size,13);
  assert.equal(new Set(archive.items.map(x=>x.google_drive_file_id)).size,13);
  assert.equal(new Set(archive.items.map(x=>x.source_artifact_id)).size,13);
  assert.equal(new Set(archive.items.map(x=>x.editorial_date)).size,13);
});

test("archive provenance and checksum evidence is complete and per-content",()=>{
  const sha=/^[0-9a-f]{64}$/;
  for (const x of archive.items) {
    assert.equal(x.media_approval,"OWNER_FINAL_VISUAL_AND_CAPTION_APPROVED");
    assert.match(x.owner_approval_evidence,/^https:\/\/github\.com\/BillyProject2505\/content-os\/pull\/\d+#issuecomment-\d+$/);
    assert.match(x.google_drive_file_url,/^https:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9_-]+\/view$/);
    assert.ok(x.google_drive_file_url.includes("/"+x.google_drive_file_id+"/"));
    assert.match(x.source_artifact_url,/^https:\/\/github\.com\/BillyProject2505\/content-os\/actions\/runs\/\d+\/artifacts\/\d+$/);
    assert.equal(x.source_artifact_url.endsWith("/"+x.source_artifact_id),true);
    assert.match(x.archive_zip_sha256,sha);
    assert.match(x.caption_txt_sha256,sha);
    assert.ok(x.archive_bytes>0);
    assert.equal(x.file_name,x.content_id+"-november-seasonal-QA-only.zip");
    assert.equal(x.jpeg_count,5);
    assert.equal(x.jpeg_hash_manifest_path_inside_zip,"rendered/render_report.json");
  }
  assert.equal(archive.verification.zip_archives_verified,13);
  assert.equal(archive.verification.jpeg_verified,65);
  assert.equal(archive.verification.captions_verified,13);
  assert.equal(archive.verification.archive_bytes_total,archive.items.reduce((sum,x)=>sum+x.archive_bytes,0));
  assert.equal(archive.verification.archive_bytes_total,6087780);
  assert.equal(archive.drive_folder_url,"https://drive.google.com/drive/folders/1VW-ZyfnNme1OslFEjC8oFGBCDcp_i9BF");
});

test("failed Burgundy 0018 run excluded, source remains immutable and publication gates stay closed",()=>{
  const fix=archive.items.find(x=>x.content_id==="SDOH-BURGUNDY-CAR-0018");
  assert.equal(fix.source_actions_run_id,42372762978);
  assert.equal(fix.source_artifact_id,13573924556);
  assert.equal(fix.archive_zip_sha256,"7c5416e61234b3b4a955cc0f902b14a73f3fd515e44d7ac1a7722159c8babbd2");
  assert.equal(archive.publication.authorized,false);
  assert.equal(archive.publication.scheduled,false);
  assert.equal(archive.publication.activation_enabled,false);
  assert.equal(palette.activation.enabled,false);
});

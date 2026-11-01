#!/usr/bin/env python3
"""CWC-CRSL-0004: deterministic platform JPEG adaptation. Not an Owner approval."""
import hashlib
import io
import json
import os
from pathlib import Path

from PIL import Image

ROOT = Path("projects/cwc")
CONTENT = "CWC-CRSL-0004"
original = Path(os.environ["CWC_SOURCE_DIR"])
output = Path(os.environ["CWC_OUTPUT_DIR"])
output.mkdir(parents=True, exist_ok=True)

media = json.loads((ROOT / "content/instagram-media" / (CONTENT + ".media-adaptation.json")).read_text())
approval = json.loads((ROOT / "content/approval" / (CONTENT + ".stg09-approval.json")).read_text())
release = json.loads((ROOT / "content/release" / (CONTENT + ".stg10-release-preparation.json")).read_text())
report = json.loads((original / "rendered/render-report.json").read_text())

assert media["content_id"] == CONTENT
assert approval["decision"] == "APPROVED"
assert release["approved_release_identity"] == media["source_approved_release_identity"]
assert report["content_id"] == CONTENT
assert report["state"] == "RENDERED_CANDIDATE_UNAPPROVED"
assert len(media["files"]) == 5
assert media["transcoding"] == {
    "source_format": "PNG",
    "delivery_format": "JPEG",
    "reason": "Meta Instagram Graph API requires publicly reachable JPEG for carousel images",
    "encoder": "Pillow",
    "quality": 98,
    "subsampling": 0,
    "optimize": True,
    "progressive": False,
}

for index, expected in enumerate(media["files"]):
    source = original / "rendered" / ("slide-%02d.png" % (index + 1))
    raw = source.read_bytes()
    sha = hashlib.sha256(raw).hexdigest()
    assert sha == expected["source_png_sha256"]
    assert sha == approval["approved_package"]["slides"][index]["sha256"]
    assert sha == report["artifacts"]["slides"][index]["sha256"]
    image = Image.open(io.BytesIO(raw)).convert("RGB")
    assert image.size == (1080, 1350)
    buff = io.BytesIO()
    image.save(buff, format="JPEG", quality=98, subsampling=0, optimize=True, progressive=False)
    jpeg = buff.getvalue()
    assert jpeg[:2] == b"\xff\xd8" and jpeg[-2:] == b"\xff\xd9"
    assert len(jpeg) == expected["bytes"]
    assert hashlib.sha256(jpeg).hexdigest() == expected["sha256"], "JPEG_ENCODED_SHA_DRIFT"
    assert expected["name"] == "slide-%02d.jpg" % (index + 1)
    (output / expected["name"]).write_bytes(jpeg)

(output / "media-adaptation.json").write_text(json.dumps({
    "content_id": CONTENT,
    "status": "OWNER_APPROVED_JPEG" if media["candidate_owner_approved"] else "JPEG_REVIEW_CANDIDATE_NOT_OWNER_APPROVED",
    "source_approved_release_identity": media["source_approved_release_identity"],
    "five_jpeg_sha256": [x["sha256"] for x in media["files"]],
    "approval_evidence": media["approval_evidence"],
}, indent=2) + "\n")
print("CWC JPEG adaptation 5/5 exact hash PASS; approved=" + str(media["candidate_owner_approved"]))

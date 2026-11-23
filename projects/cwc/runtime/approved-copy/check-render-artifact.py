#!/usr/bin/env python3
"""BUS-180: independently check bytes emitted by CWC's candidate renderer.

Limited artifact-integrity QA. This is NOT clinical/editorial STG-08, Owner
approval (STG-09), release readiness (STG-10) or publication authority.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import re
from pathlib import Path

from PIL import Image

SHA = re.compile(r"^[a-f0-9]{64}$")
ID = re.compile(r"^CWC-CRSL-[0-9]{4}$")
CANVAS = (1080, 1350)


def reject(message: str) -> None:
    raise ValueError("RENDER_ARTIFACT_QA_REJECTED: " + message)


def require(condition: bool, message: str) -> None:
    if not condition:
        reject(message)


def file_sha256(file: Path) -> str:
    digest = hashlib.sha256()
    with file.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def bounded_file(base: Path, name: str, expected_ext: str) -> Path:
    require(isinstance(name, str) and re.fullmatch(
        r"slide-\d{2}[.]png" if expected_ext == ".png" else r"contact-sheet[.]jpg",
        name
    ) is not None, "untrusted output filename")
    candidate = base / name
    require(candidate.is_file() and not candidate.is_symlink(), "missing or symlink output file")
    return candidate


def check_rendered_candidate(report: dict, directory: Path, expected_id: str) -> dict:
    require(ID.fullmatch(expected_id) is not None, "invalid Content ID")
    require(report.get("schema") == "cwc-render-candidate-report-v1", "render report schema")
    require(report.get("content_id") == expected_id, "cross-content report mismatch")
    require(report.get("state") == "RENDERED_CANDIDATE_UNAPPROVED", "not a review candidate")
    require(report.get("asset_hash_verification") == "PASS", "asset verification missing")
    require(report.get("geometry_and_text_preflight") == "PASS", "geometry preflight missing")
    require(report.get("technical_qa") == "NOT_COMPLETE", "report unexpectedly claims QA")
    require(report.get("visual_owner_review") == "NOT_GRANTED", "unexpected Owner approval")
    require(report.get("approved_release_identity") is None, "unexpected release identity")
    require(report.get("publication_authorized") is False, "unexpected publication authority")
    require(SHA.fullmatch(report.get("source_copy_sha256", "")) is not None, "source copy digest missing")
    artifact = report.get("artifacts")
    require(isinstance(artifact, dict), "rendered artifact map missing")
    slides = artifact.get("slides")
    require(isinstance(slides, list) and 1 <= len(slides) <= 10, "slide count outside contract")
    results = []
    for i, record in enumerate(slides, start=1):
        require(isinstance(record, dict) and record.get("slide") == i, "slide order mismatch")
        expected_name = f"slide-{i:02d}.png"
        require(record.get("filename") == expected_name, "unexpected filename/order")
        require(record.get("size_px") == list(CANVAS), "reported canvas is not 1080x1350")
        hash_value = record.get("sha256")
        require(isinstance(hash_value, str) and SHA.fullmatch(hash_value) is not None, "slide hash missing")
        image = bounded_file(directory, expected_name, ".png")
        require(file_sha256(image) == hash_value, "slide byte hash mismatch")
        with Image.open(image) as visual:
            visual.verify()
        with Image.open(image) as visual:
            require(visual.format == "PNG", "slide is not PNG")
            require(visual.size == CANVAS and visual.mode == "RGB", "slide encoding/dimensions changed")
        require(isinstance(record.get("typography_measurement"), list), "renderer typography measurements missing")
        results.append({"order": i, "name": expected_name, "sha256": hash_value, "dimensions": list(CANVAS)})
    contact = artifact.get("contact_sheet")
    require(isinstance(contact, dict) and isinstance(contact.get("sha256"), str)
            and SHA.fullmatch(contact["sha256"]) is not None, "contact sheet digest missing")
    contact_path = bounded_file(directory, contact.get("filename"), ".jpg")
    require(file_sha256(contact_path) == contact["sha256"], "contact sheet hash mismatch")
    with Image.open(contact_path) as image:
        image.verify()
    with Image.open(contact_path) as image:
        require(image.format == "JPEG", "contact sheet is not JPEG")
        require(image.width == 648 and image.height == ((len(slides) + 1) // 2) * 405,
                "contact sheet dimensions invalid")
    actual_names = {p.name for p in directory.iterdir()}
    expected_names = {x["name"] for x in results} | {"contact-sheet.jpg", "render-report.json"}
    require(actual_names == expected_names, "untracked extra/missing render files")
    return {
        "schema": "cwc-render-artifact-integrity-v1",
        "content_id": expected_id,
        "scope": "BYTE_HASH_IMAGE_DECODE_DIMENSIONS_AND_ORDER_ONLY",
        "verdict": "ARTIFACT_INTEGRITY_PASS",
        "slides": results,
        "contact_sheet_sha256": contact["sha256"],
        "source_copy_sha256": report["source_copy_sha256"],
        "actual_rendered_candidate": True,
        "independent_clinical_qa_passed": False,
        "formal_stg08_qa_passed": False,
        "owner_stg09_approved_by_this_run": False,
        "stg10_publication_authorized": False,
        "publication_performed": False
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--report", type=Path, required=True)
    parser.add_argument("--content-id", required=True)
    parser.add_argument("--out", type=Path, required=True)
    args = parser.parse_args()
    report = json.loads(args.report.read_text(encoding="utf8"))
    result = check_rendered_candidate(report, args.report.parent, args.content_id)
    args.out.write_text(json.dumps(result, indent=2) + "\n", encoding="utf8")
    print("ARTIFACT_INTEGRITY_PASS; formal STG-08, Owner approval and publication remain unverified")


if __name__ == "__main__":
    try:
        main()
    except (ValueError, OSError, json.JSONDecodeError) as exc:
        raise SystemExit(str(exc)) from None

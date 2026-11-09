#!/usr/bin/env python3
"""Fail-closed verifier for manually rendered November 2026 BUS-49 QA proofs."""
import argparse
import hashlib
import json
from pathlib import Path
from PIL import Image

def load(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))

def require(value, reason):
    if not value:
        raise ValueError(reason)

def sha256(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()

def rel_luminance(color):
    vals = [int(color[n:n + 2], 16) / 255 for n in (1, 3, 5)]
    linear = [x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in vals]
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2]

def contrast(left, right):
    high, low = sorted([rel_luminance(left), rel_luminance(right)], reverse=True)
    return (high + 0.05) / (low + 0.05)

def verify(manifest, render_report, overlay, authority, palette, logos, rendered_dir, target_date):
    require("2026-11-08" <= target_date <= "2026-11-30", "Target date outside seasonal window")
    require(overlay.get("schema") == "sdoh-seasonal-render-overlay-v1", "No seasonal overlay provenance")
    require(overlay.get("mode") == "QA_ONLY" and overlay.get("production_activation") is False, "Overlay not QA-only")
    require(palette.get("activation", {}).get("enabled") is False, "Production activation not allowed")
    require(manifest.get("layout_mode") == render_report.get("layout_mode") == "illustrated_single_character", "Layout class drift")
    theme = manifest["theme"]
    require(theme in ("SAGE", "BURGUNDY") and render_report["theme"] == theme, "Theme mismatch")
    require(manifest["content_id"] == render_report["content_id"], "Content ID mismatch")
    require(len(manifest["slides"]) == len(render_report["outputs"]) == 5, "Expected five slides")
    require(render_report["template_version"] == "0.6.0", "Unexpected renderer version")
    require(render_report["asset_hashes"]["font"] == authority["font"]["sha256"], "Font hash drift")
    require(render_report["theme_emblem"]["source_role"] ==
            overlay["themes"][theme]["preserved_theme_fields"]["theme_emblem_source_role"],
            "Emblem role changed")
    require(overlay["themes"][theme]["source_logo_sha256"] == logos["assets"][theme]["source_sha256"],
            "Source logo provenance mismatch")
    require(render_report["asset_hashes"]["logo"] == logos["assets"][theme]["sha256"] ==
            overlay["themes"][theme]["seasonal_logo_sha256"], "Seasonal logo SHA-256 drift")
    colors = palette["tokens"][theme]
    require(overlay["themes"][theme]["surface"] == colors["surface"], "Surface token mismatch")
    require(overlay["themes"][theme]["foreground"] == colors["text_fill"], "Foreground token mismatch")
    ratio = contrast(colors["surface"], colors["text_fill"])
    require(ratio >= 4.5, f"Text contrast failed: {ratio:.2f}")
    poses = {}
    for spec, output in zip(manifest["slides"], render_report["outputs"]):
        require(spec["slide_number"] == output["slide"], "Slide index drift")
        char = output["character"]
        requested = spec["character"]
        require(char is not None and requested["enabled"] is True, "Missing canonical character")
        pose = requested["pose_id"]
        require(char["pose_id"] == pose and char["sha256"] == authority["poses"][pose]["sha256"],
                "Pose ID/source hash drift")
        require(char["theme_tint"] == colors["character_fill"], "Character color mismatch")
        for field in ("anchor", "scale", "ground_mode"):
            require(char[field] == requested[field], f"Character {field} changed")
        image = Path(rendered_dir) / output["filename"]
        require(image.is_file() and sha256(image) == output["sha256"], "Output SHA-256 mismatch")
        with Image.open(image) as picture:
            require(list(picture.size) == output["dimensions"] and
                    picture.info.get("icc_profile") is not None, "Export dimensions/profile drift")
        poses[pose] = char["sha256"]
    require(render_report["asset_hashes"]["characters_used"] == poses, "Unexpected source poses")
    return {
        "schema": "sdoh-seasonal-qa-report-v1",
        "status": "TECHNICAL_QA_PASS_OWNER_CONTENT_REVIEW_REQUIRED",
        "content_id": manifest["content_id"],
        "target_date": target_date,
        "theme": theme,
        "slides": 5,
        "contrast_ratio": round(ratio, 3),
        "seasonal_logo_sha256": render_report["asset_hashes"]["logo"],
        "source_pose_sha256": poses,
        "publication_authorized": False,
    }

def main():
    p = argparse.ArgumentParser()
    for flag in ("manifest", "report", "overlay", "authority", "palette", "logos", "rendered-dir", "target-date", "out"):
        p.add_argument("--" + flag, required=True)
    a = p.parse_args()
    result = verify(*(load(getattr(a, key)) for key in
                      ("manifest", "report", "overlay", "authority", "palette", "logos")),
                    a.rendered_dir, a.target_date)
    Path(a.out).write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(result, indent=2))

if __name__ == "__main__":
    main()

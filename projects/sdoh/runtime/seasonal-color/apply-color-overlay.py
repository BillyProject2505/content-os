#!/usr/bin/env python3
"""QA-only seasonal overlay on a detached, checksum-verified BUS-49 v0.6.0 tree.

Only themes/{sage,burgundy}.json, an ephemeral lock and new logo copies change.
The canonical ZIP and registered source binaries must never be overwritten.
"""
from __future__ import annotations
import argparse
import hashlib
import json
import shutil
from pathlib import Path
from PIL import Image

THEMES = {
    "SAGE": ("sage", "CAROUSEL-SAGE-LOGO-DERIVATIVE"),
    "BURGUNDY": ("burgundy", "CAROUSEL-BURGUNDY-LOGO-DERIVATIVE"),
}
BASE = {
    "SAGE": ("#94AC9C", "#5C1B29"),
    "BURGUNDY": ("#5C1B29", "#94AC9C"),
}
NOVEMBER = {
    "SAGE": ("#C5E4F0", "#355E78"),
    "BURGUNDY": ("#F5C9DA", "#793E61"),
}


def sha256(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def load(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


def save(path, data):
    Path(path).write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def require(ok, message):
    if not ok:
        raise ValueError(message)


def validate_contract(config, derivatives):
    require(config.get("schema") == "sdoh-seasonal-color-only-v1", "Unknown color contract")
    require(config.get("campaign") == "Trans Awareness Month", "Unknown campaign")
    require(config.get("status") == "OWNER_VISUAL_APPROVED_PRODUCTION_INACTIVE", "No visual approval")
    require(config.get("activation", {}).get("enabled") is False, "Production activation forbidden")
    require(config.get("period") == {
        "start": "2026-11-01", "end": "2026-11-30", "timezone": "Asia/Makassar"
    }, "Invalid seasonal period")
    require(derivatives.get("schema") == "sdoh-seasonal-logo-derivatives-v1", "Unknown logo contract")
    require(derivatives.get("state") == "OWNER_VISUAL_APPROVED_STAGED_VERIFIED_NOT_CANONICAL",
            "Unverified staged logos")
    require(set(config.get("tokens", {})) == set(THEMES), "Invalid theme list")
    require(set(derivatives.get("assets", {})) == set(THEMES), "Missing logo theme")
    for theme in THEMES:
        colors = config["tokens"][theme]
        surface, foreground = NOVEMBER[theme]
        require(colors == {
            "surface": surface, "text_fill": foreground, "character_fill": foreground,
            "logo_fill": foreground, "stroke": foreground,
        }, f"{theme}: palette differs from approved decision")
        require(derivatives["assets"][theme]["target_foreground"] == foreground,
                f"{theme}: staged logo color differs from approved decision")


def verify_logo(original_path, derivative_path, foreground):
    with Image.open(original_path) as original_file, Image.open(derivative_path) as derivative_file:
        original = original_file.convert("RGBA")
        derivative = derivative_file.convert("RGBA")
        require(original.size == derivative.size, "Logo size changed")
        require(original.getchannel("A").tobytes() == derivative.getchannel("A").tobytes(),
                "Logo alpha mask changed")
        color = tuple(int(foreground[i:i + 2], 16) for i in (1, 3, 5))
        for r, g, b, a in derivative.getdata():
            if a and (r, g, b) != color:
                raise ValueError("Logo has non-approved visible colors")


def apply_overlay(root, config_file, derivatives_file, logo_dir, record_file):
    root = Path(root)
    require(root.name == "bus49_v060canonical" and (root / "renderer.py").is_file(),
            "Unexpected BUS-49 renderer tree")
    colors = load(config_file)
    derivatives = load(derivatives_file)
    validate_contract(colors, derivatives)
    lock_path = root / "provenance/assets.lock.json"
    lock = load(lock_path)
    pending = []
    # Complete every checksum, palette and alpha preflight BEFORE changing the tree.
    for theme, (name, role) in THEMES.items():
        theme_path = root / "themes" / (name + ".json")
        theme_json = load(theme_path)
        base_surface, base_foreground = BASE[theme]
        require((theme_json.get("background"), theme_json.get("foreground"))
                == (base_surface, base_foreground), f"{theme}: noncanonical base palette")
        require(theme_json.get("logo_source_role") == role, f"{theme}: source role drift")
        registered = lock["source_roles"][role]
        require(registered.get("bundled") is True, f"{theme}: original logo not bundled")
        original = root / registered["bundled_relative_path"]
        asset = derivatives["assets"][theme]
        filename = asset["derivative_filename"]
        require(Path(filename).name == filename and filename.endswith(".png"), "Unsafe logo filename")
        candidate = Path(logo_dir) / filename
        require(original.is_file() and candidate.is_file(), f"{theme}: source or candidate missing")
        require(sha256(original) == registered["sha256"] == asset["source_sha256"],
                f"{theme}: original source hash mismatch")
        require(sha256(candidate) == asset["sha256"] == asset["downloaded_raw_byte_sha256"],
                f"{theme}: candidate checksum mismatch")
        verify_logo(original, candidate, NOVEMBER[theme][1])
        require(not (root / "assets" / filename).exists(), "Derivative would overwrite existing asset")
        pending.append((theme, theme_json, theme_path, registered, candidate, asset))

    record = {
        "schema": "sdoh-seasonal-render-overlay-v1",
        "mode": "QA_ONLY",
        "period": colors["period"],
        "approval": "OWNER_VISUAL_APPROVED",
        "production_activation": False,
        "themes": {},
    }
    for theme, original, theme_path, registered, candidate, asset in pending:
        surface, foreground = NOVEMBER[theme]
        revised = dict(original)
        revised["background"] = surface
        revised["foreground"] = foreground
        save(theme_path, revised)
        destination = root / "assets" / asset["derivative_filename"]
        shutil.copyfile(candidate, destination)
        registered["expected_filename"] = destination.name
        registered["bundled_relative_path"] = "assets/" + destination.name
        registered["sha256"] = asset["sha256"]
        registered["status"] = "NOVEMBER_2026_QA_OVERLAY_ONLY_NOT_CANONICAL"
        record["themes"][theme] = {
            "surface": surface,
            "foreground": foreground,
            "source_logo_sha256": asset["source_sha256"],
            "seasonal_logo_sha256": sha256(destination),
            "preserved_theme_fields": {
                key: value for key, value in original.items()
                if key not in ("background", "foreground")
            },
        }
    save(lock_path, lock)
    save(record_file, record)
    return record


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--renderer-root", type=Path, required=True)
    parser.add_argument("--config", type=Path, required=True)
    parser.add_argument("--logos-manifest", type=Path, required=True)
    parser.add_argument("--staged-logo-dir", type=Path, required=True)
    parser.add_argument("--record", type=Path, required=True)
    args = parser.parse_args()
    print(json.dumps(apply_overlay(
        args.renderer_root, args.config, args.logos_manifest,
        args.staged_logo_dir, args.record
    ), indent=2))


if __name__ == "__main__":
    main()

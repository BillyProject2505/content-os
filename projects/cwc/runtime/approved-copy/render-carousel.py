#!/usr/bin/env python3
"""BUS-170 B2: checksum-locked CWC Carousel candidate renderer.

This produces ONLY a review candidate. It is NOT an STG-08 PASS,
STG-09 Owner approval, STG-10 release identity, or publication authority.
No network access or authentication occurs inside this module.
"""
from __future__ import annotations

import argparse
import hashlib
import io
import json
import re
from pathlib import Path

import cairosvg
from PIL import Image, ImageDraw, ImageFont

CANVAS = (1080, 1350)
BLUE = "#0B3D9E"
WHITE = "#FFFFFF"
HIV_RED = "#E31C23"
FOOTER_TOP = 1248  # protected region begins before the actual footer SVG
FOOTER_RENDER_Y = 1280  # approved release frame: intrinsic 1070x64 SVG at x=5
LOGO_X, LOGO_Y, LOGO_WIDTH = 72, 64, 260
ROLE_FONTS = {
    "cover": {"size": 72, "leading": 82, "min_size": 64},
    "body": {"size": 38, "leading": 52, "min_size": 36},
}


class RenderRejected(ValueError):
    pass


def reject(code: str, explanation: str) -> None:
    raise RenderRejected(f"{code}: {explanation}")


def sha256_file(p: Path) -> str:
    digest = hashlib.sha256()
    with p.open("rb") as f:
        for block in iter(lambda: f.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def verify_assets(asset_dir: Path, pins: dict) -> dict[str, Path]:
    if pins.get("schema") != "cwc-render-asset-pins-v1":
        reject("PINS_SCHEMA_INVALID", "unrecognized pin contract")
    if pins.get("surface") != "BLUE_DARK" or pins.get("presenter_variant") != "WHITE_POINT_LEFT":
        reject("PINS_SCOPE_INVALID", "pilot only authorizes exact selected surface and presenter")
    required = {"presenter", "logo", "footer", "montserrat_bold", "montserrat_medium"}
    if set(pins.get("assets", {})) != required:
        reject("PINS_INVALID", "missing or extra asset role")
    result = {}
    for role, entry in pins["assets"].items():
        name, expected = entry.get("file_name"), entry.get("sha256")
        if not isinstance(name, str) or Path(name).name != name or not re.fullmatch(r"[0-9a-f]{64}", expected or ""):
            reject("PINS_INVALID", f"invalid name/hash for {role}")
        file = asset_dir / name
        if not file.is_file():
            reject("ASSET_MISSING", f"{role} missing")
        if sha256_file(file) != expected:
            reject("ASSET_HASH_MISMATCH", f"{role} does not match canonical pinned bytes")
        result[role] = file
    return result


def validate_plan(plan: dict, pins: dict) -> None:
    if plan.get("schema") != "cwc-carousel-render-plan-v1" or plan.get("status") != "RENDER_PLAN_CANDIDATE":
        reject("PLAN_STATUS_INVALID", "expected unapproved CWC Carousel render plan")
    if plan.get("canvas") != {"width": 1080, "height": 1350, "unit": "px"}:
        reject("CANVAS_INVALID", "only 1080×1350 registered Carousel canvas")
    if plan.get("authority", {}).get("doc_id") != "DIUA-DIC-000029" or plan["authority"].get("version") != "1.4":
        reject("AUTHORITY_DRIFT", "Carousel format pointer changed")
    gates = plan.get("gates", {})
    for key in ("owner_final_visual_approval_granted", "approved_release_identity_issued", "publication_authorized"):
        if gates.get(key) is not False:
            reject("APPROVAL_BOUNDARY_INVALID", f"{key} must be false")
    actual = plan.get("asset_refs", {})
    for role in ("logo", "footer", "presenter"):
        if actual.get(role, {}).get("drive_id") != pins["assets"][role]["drive_file_id"]:
            reject("ASSET_ID_MISMATCH", f"{role} differs from BUS-170 pinned asset")
    if actual.get("presenter", {}).get("expected_sha256") != pins["assets"]["presenter"]["sha256"]:
        reject("ASSET_ID_MISMATCH", "presenter hash differs from selected pin")
    box = plan.get("composition", {}).get("slide_1", {})
    if box.get("presenter_variant") != "WHITE_POINT_LEFT":
        reject("PRESENTER_VARIANT_INVALID", "wrong candidate variant")
    c, p = box.get("copy_box", {}), box.get("presenter_core_box", {})
    if (c.get("x") != 72 or c.get("x", 2000) + c.get("width", 2000) > 551
            or p.get("x", 0) < 670 or p.get("x", 0) + p.get("width", 2000) > 1015):
        reject("COMPOSITION_INVALID", "copy/presenter x bounds do not match v1.4")
    for rect in (c, p):
        if not all(isinstance(rect.get(k), int) and not isinstance(rect.get(k), bool) for k in ("x", "y", "width", "height")):
            reject("COMPOSITION_INVALID", "rectangle values must be integers")
        if (rect["x"] < 0 or rect["y"] < 0 or rect["width"] <= 0 or rect["height"] <= 0
                or rect["x"] + rect["width"] > CANVAS[0]
                or rect["y"] + rect["height"] >= FOOTER_TOP):
            reject("PROTECTED_REGION_OVERLAP", "copy and presenter must remain above footer protected area")
    if c["y"] < 220:
        reject("HEADER_REGION_OVERLAP", "cover text must clear logo region")
    gesture = box.get("gesture_box")
    if gesture is not None and (gesture.get("x", 0) < 572 or gesture.get("x", 0) + gesture.get("width", 0) > 594):
        reject("GESTURE_REGION_INVALID", "gesture allowance outside registered boundary")
    slides = plan.get("slides")
    if not isinstance(slides, list) or not slides or len(slides) > 10:
        reject("SLIDES_INVALID", "pilot accepts 1–10 slides; no fixed slide count is invented")
    if any(s.get("slide") != i or not isinstance(s.get("copy"), str) or not s["copy"].strip()
           for i, s in enumerate(slides, start=1)):
        reject("SLIDES_INVALID", "ordered frozen copy required")
    if not re.fullmatch(r"CWC-CRSL-\d{4}", plan.get("content_id", "")):
        reject("CONTENT_ID_INVALID", "registered CWC Carousel grammar required")


def rasterize_svg(file: Path, out_width: int) -> Image.Image:
    # Hash-locked SVG bytes are passed unmodified into the SVG renderer.
    data = cairosvg.svg2png(bytestring=file.read_bytes(), output_width=out_width)
    return Image.open(io.BytesIO(data)).convert("RGBA")


def words_and_lines(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont,
                    width: int) -> list[list[str]]:
    if "\n" in text or "\t" in text:
        reject("TEXT_SHAPE_UNSUPPORTED", "multiline control characters in approved copy")
    words = text.strip().split(" ")
    if not words or any(not word for word in words):
        reject("TEXT_SHAPE_UNSUPPORTED", "empty token in approved copy")
    lines, current = [], []
    for word in words:
        candidate = " ".join(current + [word])
        if draw.textlength(candidate, font=font) > width:
            if not current:
                reject("TEXT_OVERFLOW", "single word exceeds allowed copy width")
            lines.append(current)
            current = [word]
            if draw.textlength(word, font=font) > width:
                reject("TEXT_OVERFLOW", "single word exceeds allowed copy width")
        else:
            current.append(word)
    if current:
        lines.append(current)
    return lines


def draw_line_tokens(draw: ImageDraw.ImageDraw, tokens: list[str], x: int, y: int,
                     font: ImageFont.FreeTypeFont, base_color: str) -> None:
    space = draw.textlength(" ", font=font)
    xx = float(x)
    for token in tokens:
        # The actual word HIV must use CWC's mandatory HIV red.
        color = HIV_RED if re.fullmatch(r"(?i)HIV[\.,;:!?]?", token) else base_color
        draw.text((round(xx), y), token, font=font, fill=color, anchor="lt")
        xx += draw.textlength(token, font=font) + space


def paint_text(img: Image.Image, text: str, rect: dict, font: ImageFont.FreeTypeFont,
               leading: int, color: str) -> dict:
    draw = ImageDraw.Draw(img)
    lines = words_and_lines(draw, text, font, rect["width"])
    total_height = len(lines) * leading
    if total_height > rect["height"]:
        reject("TEXT_OVERFLOW", "approved text exceeds permitted vertical field; editorial revision required")
    for i, line in enumerate(lines):
        draw_line_tokens(draw, line, rect["x"], rect["y"] + i * leading, font, color)
    return {"line_count": len(lines), "measured_height": total_height, "font_px": font.size}


def position_presenter(presenter: Image.Image, body: dict, gesture: dict, copy: dict) -> tuple[Image.Image, tuple[int, int], dict]:
    """Place BUS-94 full-body PNG by *visible alpha bounds*, not transparent file width.

    Pilot-local composition QA: minimum 750 px visible height. The registered
    body region is a core-zone check, NOT an instruction to squeeze the entire
    1122 px transparent source into 345 px. Resizing is uniform; no source pixels
    or geometry are rewritten or regenerated.
    """
    if gesture is None:
        reject("GESTURE_REQUIRED", "POINT_LEFT presenter needs a measured gesture anchor")
    alpha = presenter.getchannel("A").point(lambda a: 255 if a >= 16 else 0)
    visible = alpha.getbbox()
    if not visible:
        reject("PRESENTER_TRANSPARENT", "selected source has no useful alpha")
    visible_width = visible[2] - visible[0]
    visible_height = visible[3] - visible[1]
    scale = body["height"] / visible_height
    if scale <= 0:
        reject("PRESENTER_SCALE_INVALID", "visible-bounds scale cannot be zero")
    result = presenter.resize(
        (round(presenter.width * scale), round(presenter.height * scale)),
        Image.Resampling.LANCZOS,
    )
    rendered_bbox = result.getchannel("A").point(lambda a: 255 if a >= 16 else 0).getbbox()
    if not rendered_bbox:
        reject("PRESENTER_TRANSPARENT", "resampling produced no usable alpha")
    # Leftmost visible pixel is the hand of the approved POINT_LEFT derivative.
    dest_x = gesture["x"] - rendered_bbox[0]
    dest_y = body["y"] - rendered_bbox[1]
    x0 = dest_x + rendered_bbox[0]
    x1 = dest_x + rendered_bbox[2]
    y0 = dest_y + rendered_bbox[1]
    y1 = dest_y + rendered_bbox[3]
    if x0 < 572 or x0 > 594 or x0 <= copy["x"] + copy["width"] or x1 > CANVAS[0]:
        reject("PRESENTER_COPY_COLLISION", "actual opaque pixels violate copy/gesture/canvas bounds")
    if y0 < 250 or y1 >= FOOTER_TOP:
        reject("PRESENTER_PROTECTED_COLLISION", "visible presenter overlaps header/footer envelope")
    if y1 - y0 < 750:
        reject("PRESENTER_TOO_SMALL", "reviewer-validated cover requires adequate visual presence")
    return result, (dest_x, dest_y), {
        "visible_bounds_px": [x0, y0, x1, y1],
        "visible_height_px": y1 - y0,
        "scale": round(scale, 6),
        "layout_qa": "PRELIMINARY_ONLY_REQUIRES_STG08_VISUAL_CHECK",
    }


def compose(plan: dict, assets: dict[str, Path], output: Path) -> dict:
    output.mkdir(parents=True, exist_ok=True)
    presenter = Image.open(assets["presenter"]).convert("RGBA")
    if presenter.size != (1122, 1402):
        reject("PRESENTER_SIZE_MISMATCH", "reusable source PNG dimensions changed")
    logo = rasterize_svg(assets["logo"], LOGO_WIDTH)
    footer = rasterize_svg(assets["footer"], 1070)
    if logo.width != LOGO_WIDTH or footer.size != (1070, 64):
        reject("SVG_SIZE_INVALID", "cannot rasterize canonical SVG")
    # Loading font from verified Drive bytes avoids system-dependent substitutions.
    cover_style, body_style = ROLE_FONTS["cover"], ROLE_FONTS["body"]
    cover_font = ImageFont.truetype(str(assets["montserrat_bold"]), cover_style["size"])
    body_font = ImageFont.truetype(str(assets["montserrat_medium"]), body_style["size"])
    if cover_font.size < cover_style["min_size"] or body_font.size < body_style["min_size"]:
        reject("TYPOGRAPHY_FLOOR", "font size below canonical floor")
    renders = []
    for i, slide in enumerate(plan["slides"]):
        canvas = Image.new("RGBA", CANVAS, BLUE)
        canvas.alpha_composite(logo, (LOGO_X, LOGO_Y))
        canvas.alpha_composite(footer, ((CANVAS[0] - footer.width) // 2, FOOTER_RENDER_Y))
        if i == 0:
            box = plan["composition"]["slide_1"]
            scaled, position, presenter_meta = position_presenter(
                presenter, box["presenter_core_box"], box.get("gesture_box"), box["copy_box"]
            )
            canvas.alpha_composite(scaled, position)
            text_meta = paint_text(canvas, slide["copy"],
                                   plan["composition"]["slide_1"]["copy_box"],
                                   cover_font, cover_style["leading"], WHITE)
        else:
            text_meta = paint_text(canvas, slide["copy"],
                                   {"x": 72, "y": 310, "width": 936, "height": 790},
                                   body_font, body_style["leading"], WHITE)
        path = output / f"slide-{i+1:02d}.png"
        canvas.convert("RGB").save(path, format="PNG", optimize=False)
        renders.append({"slide": i + 1, "filename": path.name, "sha256": sha256_file(path),
                        "size_px": [1080, 1350], "typography_measurement": text_meta,
                        "presenter_placement": presenter_meta if i == 0 else None})
    # Contact sheet is review aid, not publishable binary.
    cols, preview_w = 2, 324
    preview_h = round(preview_w * CANVAS[1] / CANVAS[0])
    rows = (len(renders) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * preview_w, rows * preview_h), "#E5E7EB")
    for i, v in enumerate(renders):
        with Image.open(output / v["filename"]) as im:
            thumb = im.resize((preview_w, preview_h), resample=Image.Resampling.LANCZOS)
            sheet.paste(thumb, ((i % cols) * preview_w, (i // cols) * preview_h))
    contact = output / "contact-sheet.jpg"
    sheet.save(contact, quality=92, subsampling=0)
    return {"slides": renders, "contact_sheet": {"filename": contact.name, "sha256": sha256_file(contact)}}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--plan", type=Path, required=True)
    parser.add_argument("--pins", type=Path, required=True)
    parser.add_argument("--assets", type=Path, required=True)
    parser.add_argument("--out", type=Path, required=True)
    args = parser.parse_args()
    plan = json.loads(args.plan.read_text("utf8"))
    pins = json.loads(args.pins.read_text("utf8"))
    validate_plan(plan, pins)
    assets = verify_assets(args.assets, pins)
    output = compose(plan, assets, args.out)
    report = {
        "schema": "cwc-render-candidate-report-v1",
        "content_id": plan["content_id"],
        "source_copy_sha256": plan["source_copy_sha256"],
        "state": "RENDERED_CANDIDATE_UNAPPROVED",
        "asset_hash_verification": "PASS",
        "geometry_and_text_preflight": "PASS",
        "technical_qa": "NOT_COMPLETE",
        "visual_owner_review": "NOT_GRANTED",
        "approved_release_identity": None,
        "publication_authorized": False,
        "artifacts": output,
    }
    (args.out / "render-report.json").write_text(json.dumps(report, indent=2) + "\n", "utf8")
    print("RENDERED_CANDIDATE_UNAPPROVED — no STG-08, STG-09, STG-10 or publication authority")


if __name__ == "__main__":
    try:
        main()
    except (RenderRejected, OSError, ValueError) as error:
        print(f"RENDER_REJECTED: {error}", flush=True)
        raise SystemExit(1) from None

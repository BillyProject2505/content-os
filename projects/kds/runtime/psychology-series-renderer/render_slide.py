#!/usr/bin/env python3
"""KDS Psychology Series deterministic slide assembler (reference implementation).

Implements the fixed 1080x1350 geometry of the KDS Psychology Series Layout Bible
(DIUA-DIC-000039 v1.22 CANONICAL) for the parts of a slide that must NOT
come from an image model: white editorial field and gradient, header logo/divider/wordmark,
series badge, topic, headline, body, callout box, Gold Wave / Dot Matrix ornaments and the
page indicator.  The narrative scene is an input layer produced elsewhere.

This tool is NOT a governed document and creates no rule.  If a constant here differs from
the current canonical Layout Bible, the Layout Bible wins and this file is wrong.
It never approves, schedules or publishes anything.

Key fix versus the 2026-10-16/17 BUS-167 renderer (audit finding KDS-AUD-F25):
glyphs of tracked text are drawn on ONE shared baseline (anchor "ls") and advanced by the
kerned prefix width plus tracking.  Aligning each glyph by its own ink box (the previous
behaviour) shifts letters with ascenders/descenders/dots vertically ("ser¡ng", "d¡r¡").

Usage:
  python3 render_slide.py --spec slide.json --assets DIR --fonts DIR --out slide.png
  (writes slide.png and slide.png.manifest.json; exits non-zero on any preflight FAIL)
"""
from __future__ import annotations

import argparse
import hashlib
import json
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

LAYOUT_AUTHORITY = "DIUA-DIC-000039 (Psychology Series Layout Bible) v1.22 CANONICAL"

W, H = 1080, 1350

# --- Asset Registry DIUA-DIC-000036 v1.12: exact ACTIVE production binaries ---------------
ASSETS = {
    "logo": ("KDS-OBJ-000001_Official-Logo_v1.0.png",
             "261f24c65d44a01cfe669706ecfdbf7b5a240bc30f5a6ddec954e1cef593f554"),
    "wordmark": ("KDS-OBJ-000002_Wordmark_PRODUCTION_v1.1.png",
                 "d8d28b554545b6f0c7c4972a3223bac905cac21114185eba98db38675c28915a"),
    "gold_wave": ("KDS-OBJ-000004_Gold-Wave_PRODUCTION_v1.0.png",
                  "62d0d24d04ce6d78cbfd6c5cc436b878a3bb80978678dc3aaf820cc4743bfb50"),
    "dot_matrix": ("KDS-OBJ-000005_Dot-Matrix_PRODUCTION_v1.0.png",
                   "19b1fda512d326044914013eb553c38877014fab37318514da24b12cfa6f8de2"),
}

# --- Palette (Asset Registry §22-25, locked) ---------------------------------------------
BURGUNDY = (0x96, 0x25, 0x1E)
NAVY = (0x14, 0x25, 0x49)
BEIGE = (0xF9, 0xEB, 0xD1)
GOLD = (0xE2, 0xA9, 0x3C)
WHITE = (255, 255, 255)

# --- Layout Bible geometry (x, y, w, h) -------------------------------------------------
LOGO = (3, 34, 188, 188)                         # §3.2
DIVIDER = (182, 53, 2, 132)                      # §3.2
WORDMARK = (204, 65, 188, 109)                   # §3.2
GRADIENT_STOPS = ((390, 1.0), (420, 0.8), (450, 0.35), (475, 0.0))  # §2.3.1
ART = (390, 0, 690, 1350)                        # §2.6 / F32 v1.22
EDITORIAL_X0, EDITORIAL_X1 = 48, 390             # §2.5.1
BADGE = (48, 252, 252, 34)                       # §4.1, radius 17
TOPIC_Y, HEADLINE_Y, BODY_Y = 304, 390, 638      # §2.5
CALLOUT = (48, 878, 342, 156)                    # §5.6, radius 18, padding 20/16
WAVE_S1 = (48, 1165, 460, 157)                   # §6.5.1 Slide 1 only
WAVE_SN = (48, 1120, 250, 80)                    # §6.5.1 Slides 2-N
DOTS_SN = (316, 1118, 74, 74)                    # §6.5.1 Slides 2-N optional
IND_S1 = (960, 1270, 93, 52, 12, 30)             # §6.2/6.3 x,y,w,h,radius,text px
IND_SN = (41, 1274, 82, 45, 10, 26)
FOCAL = (560, 160, 1010, 1150)                   # §2.6 critical focal zone

# role: (font file, size, line-height, tracking em, max lines)   §5.1
ROLES = {
    "badge": ("Inter-Bold.otf", 22, 26, 0.06, 1),
    "topic": ("Inter-SemiBold.otf", 26, 32, 0.0, 2),
    "headline": ("Inter-Bold.otf", 52, 56, -0.02, 4),
    "body": ("Inter-Regular.otf", 25, 36, 0.0, 6),
    "callout": ("Inter-SemiBold.otf", 24, 32, 0.0, 4),
    "indicator": ("Inter-Bold.otf", None, None, 0.0, 1),
}


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def contain(src: Image.Image, frame):
    """§6.5.2: uniform aspect-preserving fit, centred, never crop/stretch."""
    x, y, w, h = frame
    s = min(w / src.width, h / src.height)
    nw, nh = src.width * s, src.height * s
    return src.resize((max(1, round(nw)), max(1, round(nh))), Image.LANCZOS), \
        (round(x + (w - nw) / 2), round(y + (h - nh) / 2)), (nw, nh)


def cover(src: Image.Image, frame, focus_x: float = 0.5, focus_y: float = 0.5):
    x, y, w, h = frame
    s = max(w / src.width, h / src.height)
    r = src.resize((round(src.width * s), round(src.height * s)), Image.LANCZOS)
    left = round((r.width - w) * focus_x)
    top = round((r.height - h) * focus_y)
    return r.crop((left, top, left + w, top + h)), s, left, top


def gradient_alpha(x: float) -> float:
    if x < GRADIENT_STOPS[0][0]:
        return 1.0
    for (x0, a0), (x1, a1) in zip(GRADIENT_STOPS, GRADIENT_STOPS[1:]):
        if x0 <= x <= x1:
            return a0 + (a1 - a0) * (x - x0) / (x1 - x0)
    return 0.0


def tracked_positions(font, text: str, tracking_px: float):
    """x offset of each glyph: kerned prefix width + accumulated tracking."""
    return [font.getlength(text[:i]) + i * tracking_px for i in range(len(text))]


def text_width(font, text: str, tracking_px: float) -> float:
    if not text:
        return 0.0
    return font.getlength(text) + (len(text) - 1) * tracking_px


def draw_line(draw, font, text, x, baseline, tracking_px, fill):
    """All glyphs share one baseline (anchor 'ls'). This is the F25 fix."""
    if tracking_px == 0:
        draw.text((x, baseline), text, font=font, fill=fill, anchor="ls")
        return
    for ch, dx in zip(text, tracked_positions(font, text, tracking_px)):
        draw.text((x + dx, baseline), ch, font=font, fill=fill, anchor="ls")


def wrap(font, text: str, width: float, tracking_px: float):
    lines = []
    for para in text.split("\n"):
        cur = ""
        for word in para.split(" "):
            cand = word if not cur else cur + " " + word
            if text_width(font, cand, tracking_px) <= width:
                cur = cand
            else:
                if cur:
                    lines.append(cur)
                cur = word
        lines.append(cur)
    return lines


def first_baseline(font, top: float, line_height: float) -> float:
    asc, desc = font.getmetrics()
    return top + (line_height - (asc + desc)) / 2 + asc


def render(spec: dict, assets: Path, fonts: Path, verify_hashes: bool = True, enforce_canonical_font: bool = True):
    checks, fails = [], []

    def check(name, ok, detail=""):
        checks.append({"check": name, "result": "PASS" if ok else "FAIL", "detail": detail})
        if not ok:
            fails.append(name)

    slide = int(spec["slide"])
    total = int(spec["total"])
    inputs = {}
    imgs = {}
    for key, (fname, expected) in ASSETS.items():
        p = assets / fname
        if not p.exists():
            if key == "dot_matrix" and not spec.get("dot_matrix"):
                continue
            check(f"asset present: {fname}", False, "missing")
            continue
        got = sha256(p)
        inputs[fname] = got
        if verify_hashes:
            check(f"asset SHA-256 matches Registry: {fname}", got == expected, got)
        imgs[key] = Image.open(p).convert("RGBA")

    scene_path = Path(spec["scene"])
    inputs[scene_path.name] = sha256(scene_path)
    scene = Image.open(scene_path).convert("RGB")

    canvas = Image.new("RGBA", (W, H), WHITE + (255,))
    # Layout Bible v1.22 / KDS-AUD-F32: the narrative artwork begins at x=390 and
    # continues beneath the entire canonical x=390–475 white-to-transparent gradient.
    art_x = int(spec.get("artwork_x", ART[0]))
    check("artwork frame starts at canonical x=390", art_x == ART[0], f"artwork_x={art_x}")
    frame = (art_x, 0, W - art_x, H)
    art, scale, left, top = cover(scene, frame, spec.get("scene_focus_x", 0.5), spec.get("scene_focus_y", 0.5))
    canvas.paste(art.convert("RGBA"), (frame[0], frame[1]))

    # §2.3.1 full-height horizontal white overlay
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    col = Image.new("RGBA", (1, H))
    for x in range(0, 476):
        a = round(255 * gradient_alpha(x))
        if a:
            col.paste(WHITE + (a,), (0, 0, 1, H))
            overlay.paste(col, (x, 0))
    canvas.alpha_composite(overlay)

    # §6.5 ornaments (Slide 1: Gold Wave enlarged frame only; Slides 2-N default frames)
    if "gold_wave" in imgs and spec.get("gold_wave", True):
        frame = WAVE_S1 if slide == 1 else WAVE_SN
        r, pos, size = contain(imgs["gold_wave"], frame)
        canvas.alpha_composite(r, pos)
        checks.append({"check": "gold wave contain", "result": "INFO",
                       "detail": f"frame={frame} placed={size[0]:.2f}x{size[1]:.2f} at {pos}"})
    if slide > 1 and spec.get("dot_matrix") and "dot_matrix" in imgs:
        r, pos, size = contain(imgs["dot_matrix"], DOTS_SN)
        canvas.alpha_composite(r, pos)
    check("no Dot Matrix on Slide 1", not (slide == 1 and spec.get("dot_matrix")))

    # §3.2 header
    if "logo" in imgs:
        r, pos, _ = contain(imgs["logo"], LOGO)
        canvas.alpha_composite(r, pos)
    if "wordmark" in imgs:
        r, pos, _ = contain(imgs["wordmark"], WORDMARK)
        canvas.alpha_composite(r, pos)
    d = ImageDraw.Draw(canvas)
    d.rectangle((DIVIDER[0], DIVIDER[1], DIVIDER[0] + DIVIDER[2] - 1, DIVIDER[1] + DIVIDER[3] - 1), fill=GOLD)

    def font(role, size=None):
        f, s, *_ = ROLES[role]
        p = fonts / f
        try:
            loaded = ImageFont.truetype(str(p), size or s)
        except OSError as exc:
            check(f"canonical font present: {f}", False, str(exc))
            raise
        family = (loaded.getname()[0] or "").lower()
        if enforce_canonical_font:
            check(f"canonical Inter font identity: {f}", "inter" in family, f"reported family={loaded.getname()[0]}")
        else:
            checks.append({"check": f"font identity (self-test only): {f}", "result": "INFO",
                           "detail": f"reported family={loaded.getname()[0]}; canonical typography conformance intentionally disabled for synthetic self-test"})
        return loaded

    # §4 badge
    bx, by, bw, bh = BADGE
    d.rounded_rectangle((bx, by, bx + bw, by + bh), radius=17, fill=BURGUNDY)
    fb = font("badge")
    tb = 0.06 * 22
    label = spec["badge"].upper()
    lw = text_width(fb, label, tb)
    check("badge fits 252px frame with 14px padding", lw <= bw - 28, f"text width {lw:.1f}px")
    base = first_baseline(fb, by + 4, 26)
    draw_line(d, fb, label, bx + (bw - lw) / 2, base, tb, WHITE)

    def block(role, text, top, color=NAVY, x0=EDITORIAL_X0, width=EDITORIAL_X1 - EDITORIAL_X0):
        f = font(role)
        _, size, lh, trk, max_lines = ROLES[role]
        tpx = trk * size
        lines = wrap(f, text, width, tpx)
        widest = max(text_width(f, ln, tpx) for ln in lines)
        check(f"{role} <= {max_lines} lines", len(lines) <= max_lines, f"{len(lines)} lines")
        check(f"{role} inside editorial width", widest <= width + 0.5, f"widest {widest:.1f}px of {width}")
        b = first_baseline(f, top, lh)
        for i, ln in enumerate(lines):
            draw_line(d, f, ln, x0, b + i * lh, tpx, color)
        return lines

    out = {"topic": block("topic", spec["topic"], TOPIC_Y),
           "headline": block("headline", spec["headline"], HEADLINE_Y),
           "body": block("body", spec["body"], BODY_Y)}

    if spec.get("callout"):
        cx, cy, cw, ch = CALLOUT
        d.rounded_rectangle((cx, cy, cx + cw, cy + ch), radius=18, fill=BEIGE)
        lines = block("callout", spec["callout"], cy + 16, x0=cx + 20, width=cw - 40)
        used = len(lines) * 32
        # Recorded, not enforced: 4 x 32 px = 128 px exceeds 156 - 2x16 = 124 px (finding F31).
        checks.append({"check": "callout line boxes within vertical padding", "result":
                       "PASS" if used <= ch - 32 else "WARN (F31 pending Owner decision)",
                       "detail": f"{used}px of {ch - 32}px"})
        out["callout"] = lines

    # §6.2 page indicator
    ix, iy, iw, ih, ir, isz = IND_S1 if slide == 1 else IND_SN
    d.rounded_rectangle((ix, iy, ix + iw, iy + ih), radius=ir, fill=BURGUNDY)
    fi = ImageFont.truetype(str(fonts / ROLES["indicator"][0]), isz)
    d.text((ix + iw / 2, iy + ih / 2), f"{slide}/{total}", font=fi, fill=WHITE, anchor="mm")

    img = canvas.convert("RGB")
    check("canvas 1080x1350", img.size == (W, H))
    focal = spec.get("face_xy")
    if focal:
        fx, fy = focal
        check("face point inside focal zone", FOCAL[0] <= fx <= FOCAL[2] and FOCAL[1] <= fy <= FOCAL[3], str(focal))
    manifest = {
        "tool": "kds psychology-series render_slide.py (reference implementation, non-governed)",
        "layout_authority": LAYOUT_AUTHORITY,
        "slide": slide, "total": total,
        "inputs_sha256": inputs,
        "scene_cover": {"scale": scale, "crop_left": left, "crop_top": top, "frame": frame},
        "text_lines": out,
        "checks": checks,
        "preflight": "FAIL" if fails else "PASS",
        "approval": "NOT_GRANTED — technical preflight only; not QA PASS, not Owner or Publication approval",
    }
    return img, manifest, fails


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--spec", required=True)
    ap.add_argument("--assets", required=True)
    ap.add_argument("--fonts", required=True)
    ap.add_argument("--out", required=True)
    a = ap.parse_args(argv)
    spec = json.loads(Path(a.spec).read_text(encoding="utf-8"))
    img, manifest, fails = render(spec, Path(a.assets), Path(a.fonts), enforce_canonical_font=True)
    img.save(a.out, optimize=True)
    manifest["output_sha256"] = sha256(Path(a.out))
    Path(a.out + ".manifest.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False), encoding="utf-8")
    print(json.dumps({"preflight": manifest["preflight"], "fails": fails, "output_sha256": manifest["output_sha256"]}))
    return 0 if manifest["preflight"] == "PASS" else 1


if __name__ == "__main__":
    sys.exit(main())

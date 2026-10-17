#!/usr/bin/env python3
"""Self-test for render_slide.py. No network, no Drive, no registered binaries needed.

1. Shared-baseline regression test for tracked text (KDS-AUD-F25), with a negative control
   proving the test detects the per-glyph ink-box alignment defect seen in BUS-167 S01 v0.3A
   and S02 v0.1A.
2. Layout Bible numbers: gradient stops, §6.5.2 `contain` results, Slide 1 / Slides 2-N frames.
3. End-to-end assembly with synthetic placeholder assets (hash check disabled): verifies
   F32 blocks production preflight, and overflowing copy still fails closed (no shrink).
"""
import shutil
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

sys.path.insert(0, str(Path(__file__).resolve().parent))
import render_slide as rs  # noqa: E402

FONT_DIRS = [Path("/usr/share/fonts/opentype/inter"), Path("/usr/share/fonts/truetype/inter")]
FALLBACK = [Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"),
            Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf")]

failures = []


def ok(name, cond, detail=""):
    print(("PASS " if cond else "FAIL ") + name + (f" — {detail}" if detail else ""))
    if not cond:
        failures.append(name)


def font_dir(tmp: Path) -> Path:
    for d in FONT_DIRS:
        if all((d / f).exists() for f in ("Inter-Bold.otf", "Inter-SemiBold.otf", "Inter-Regular.otf")):
            return d
    src = next((p for p in FALLBACK if p.exists()), None)
    if src is None:
        print("FAIL no usable font found (install fonts-inter or fonts-dejavu-core)")
        sys.exit(1)
    for f in ("Inter-Bold.otf", "Inter-SemiBold.otf", "Inter-Regular.otf"):
        shutil.copy(src, tmp / f)
    print(f"NOTE Inter not installed; geometry/baseline tests use {src.name}")
    return tmp


def buggy_draw(draw, font, text, x, top, tracking_px):
    """Reproduction of the defective per-glyph ink-box alignment (for the negative control)."""
    cx = x
    for ch in text:
        bb = draw.textbbox((0, 0), ch, font=font)
        draw.text((cx - bb[0], top - bb[1]), ch, font=font, fill=0)
        cx += font.getlength(ch) + tracking_px


class RecordingDraw:
    """Proxy that records every draw.text call (position + anchor)."""

    def __init__(self, inner):
        self.inner, self.calls = inner, []

    def text(self, xy, txt, **kw):
        self.calls.append((xy, txt, kw.get("anchor")))
        return self.inner.text(xy, txt, **kw)

    def textbbox(self, *a, **kw):
        return self.inner.textbbox(*a, **kw)


def vertical_profile(img):
    px = img.load()
    rows = [sum(1 for x in range(img.width) if px[x, y] < 128) for y in range(img.height)]
    total = sum(rows) or 1
    return [r / total for r in rows]


def baseline_test(fonts: Path):
    f = ImageFont.truetype(str(fonts / "Inter-Bold.otf"), 52)
    text = "Kenapa kita sering keras pada diri sendiri?"
    trk = -0.02 * 52
    base = 80

    # 1. invariant: every glyph of a tracked line is drawn at the same baseline with anchor 'ls'
    good = Image.new("L", (1300, 120), 255)
    rec = RecordingDraw(ImageDraw.Draw(good))
    rs.draw_line(rec, f, text, 10, base, trk, 0)
    ys = {c[0][1] for c in rec.calls}
    anchors = {c[2] for c in rec.calls}
    ok("tracked line: one shared baseline and anchor 'ls' for every glyph",
       ys == {base} and anchors == {"ls"} and len(rec.calls) == len(text), f"y={ys} anchors={anchors}")

    # 2. pixels: tracked rendering keeps the same vertical ink profile as untracked text
    ref = Image.new("L", (1300, 120), 255)
    ImageDraw.Draw(ref).text((10, base), text, font=f, fill=0, anchor="ls")
    pg, pr = vertical_profile(good), vertical_profile(ref)
    diff_good = sum(abs(a - b) for a, b in zip(pg, pr))
    bad = Image.new("L", (1300, 120), 255)
    brec = RecordingDraw(ImageDraw.Draw(bad))
    buggy_draw(brec, f, text, 10, base - f.getmetrics()[0], trk)
    pb = vertical_profile(bad)
    diff_bad = sum(abs(a - b) for a, b in zip(pb, pr))
    ok("tracked line vertical ink profile matches untracked reference (L1 < 0.10)", diff_good < 0.10,
       f"L1={diff_good:.3f}")
    ok("negative control: defective per-glyph ink-box alignment is detected",
       len({c[0][1] for c in brec.calls}) > 1 and diff_bad > 3 * max(diff_good, 0.02),
       f"defective L1={diff_bad:.3f}, distinct y={len({c[0][1] for c in brec.calls})}")

    # 3. untracked path is byte-identical to whole-string rendering
    a = Image.new("L", (1300, 120), 255)
    rs.draw_line(ImageDraw.Draw(a), f, text, 10, base, 0, 0)
    ok("untracked line identical to whole-string rendering", a.tobytes() == ref.tobytes())


def geometry_test():
    for x, a in ((389, 1.0), (390, 1.0), (420, 0.8), (450, 0.35), (475, 0.0), (476, 0.0)):
        ok(f"gradient alpha at x={x} is {a}", abs(rs.gradient_alpha(x) - a) < 1e-9, str(rs.gradient_alpha(x)))
    wave = Image.new("RGBA", (2067, 761))
    _, pos, size = rs.contain(wave, rs.WAVE_S1)
    ok("Slide 1 Gold Wave contain ≈ 426.44×157 at x≈64.78, bottom y=1322",
       abs(size[0] - 426.44) < 0.01 and abs(size[1] - 157) < 1e-6 and pos == (65, 1165)
       and rs.WAVE_S1[1] + rs.WAVE_S1[3] == 1322, f"{size} at {pos}")
    _, pos, size = rs.contain(wave, rs.WAVE_SN)
    ok("Slides 2–N Gold Wave contain ≈ 217.29×80 at x≈64.35", abs(size[0] - 217.29) < 0.01 and pos[0] == 64,
       f"{size} at {pos}")
    _, pos, size = rs.contain(Image.new("RGBA", (512, 320)), rs.DOTS_SN)
    ok("Dot Matrix contain 74×46.25 at y≈1131.88", abs(size[1] - 46.25) < 1e-9 and pos == (316, 1132),
       f"{size} at {pos}")
    ok("Slide 1 indicator bottom y=1322", rs.IND_S1[1] + rs.IND_S1[3] == 1322)
    ok("editorial stack: 222+30=252, 252+34+18=304, 304+64+22=390, 390+224+24=638, 638+216+24=878",
       (rs.LOGO[1] + rs.LOGO[3] + 30, rs.BADGE[1] + 34 + 18, rs.TOPIC_Y + 64 + 22, rs.HEADLINE_Y + 224 + 24,
        rs.BODY_Y + 216 + 24) == (252, 304, 390, 638, 878))


def assembly_test(fonts: Path, tmp: Path):
    assets = tmp / "assets"
    assets.mkdir()
    for key, (name, _) in rs.ASSETS.items():
        size = {"logo": (1024, 1024), "wordmark": (197, 114), "gold_wave": (2067, 761), "dot_matrix": (512, 320)}[key]
        Image.new("RGBA", size, rs.GOLD + (255,)).save(assets / name)
    scene = tmp / "scene.png"
    Image.new("RGB", (1122, 1402), (90, 120, 160)).save(scene)
    spec = {"slide": 1, "total": 8, "scene": str(scene), "badge": "Seri Psikologi 3", "topic": "Self-compassion",
            "headline": "Kenapa kita sering keras pada diri sendiri?",
            "body": "Saat salah, gagal, atau sedang lelah, suara di kepala bisa berubah menjadi hakim.",
            "callout": "Self-compassion menawarkan cara lain.", "face_xy": [700, 400]}
    img, man, fails = rs.render(spec, assets, fonts, verify_hashes=False, enforce_canonical_font=False)
    ok("synthetic Slide 1 assembles 1080×1350 but is governance-blocked by F32", img.size == (1080, 1350) and not fails and man["preflight"] == "BLOCKED_BY_GOVERNANCE_F32", man["preflight"])
    px = img.load()
    ok("no scene pixels left of artwork frame x=430 (white at x=391..429)",
       all(px[x, y] == (255, 255, 255) for x in range(391, 430) for y in range(260, 1100, 20)))
    spec2 = dict(spec, slide=2, dot_matrix=True,
                 headline="Kalimat judul yang sengaja dibuat terlalu panjang agar melewati batas empat baris yang ditetapkan")
    _, man2, fails2 = rs.render(spec2, assets, fonts, verify_hashes=False, enforce_canonical_font=False)
    ok("overflowing headline fails closed (no font shrink)", "headline <= 4 lines" in fails2, str(fails2))


def main():
    with tempfile.TemporaryDirectory() as t:
        tmp = Path(t)
        fonts = font_dir(tmp)
        baseline_test(fonts)
        geometry_test()
        assembly_test(fonts, tmp)
    print(f"\n{'FAILED' if failures else 'ALL PASSED'}: {len(failures)} failure(s)")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())

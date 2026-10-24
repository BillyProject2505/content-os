import importlib.util
import io
import json
import tempfile
import unittest
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

SOURCE = Path(__file__).with_name("render-carousel.py")
spec = importlib.util.spec_from_file_location("cwc_carousel_renderer", SOURCE)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)


def fixture():
    p = {
        "schema": "cwc-carousel-render-plan-v1",
        "status": "RENDER_PLAN_CANDIDATE",
        "content_id": "CWC-CRSL-9999",  # synthetic never-allocated Content ID
        "source_copy_sha256": "c" * 64,
        "canvas": {"width": 1080, "height": 1350, "unit": "px"},
        "authority": {"doc_id": "DIUA-DIC-000029", "version": "1.4"},
        "composition": {"slide_1": {
            "copy_box": {"x": 72, "y": 250, "width": 479, "height": 440},
            "presenter_core_box": {"x": 670, "y": 270, "width": 345, "height": 910},
            "gesture_box": {"x": 572, "y": 440, "width": 22, "height": 120},
            "presenter_variant": "WHITE_POINT_LEFT",
        }},
        "asset_refs": {
            "logo": {"drive_id": "LOGO"},
            "footer": {"drive_id": "FOOTER"},
            "presenter": {"drive_id": "PRESENTER", "expected_sha256": "A" * 64}
        },
        "slides": [{"slide": 1, "copy": "Apa itu PrEP?"}, {"slide": 2, "copy": "Jaga kesehatanmu dengan informasi tepercaya."}],
        "typography_layout": {
            "schema": "cwc-carousel-typography-layout-v1",
            "fingerprint": "f" * 64,
            "source_approval_verified": False,
            "slides": [
                {"slide": 1, "blocks": [{
                    "role": "headline", "text": "Apa itu PrEP?", "tone": "WHITE",
                    "rect": {"x": 72, "y": 450, "width": 479, "height": 200}
                }], "accents": [{"type": "line", "tone": "YELLOW",
                                 "rect": {"x": 72, "y": 397, "width": 121, "height": 6}}]},
                {"slide": 2, "blocks": [{
                    "role": "body", "text": "Jaga kesehatanmu dengan informasi tepercaya.",
                    "tone": "WHITE",
                    "rect": {"x": 72, "y": 310, "width": 936, "height": 250}
                }], "accents": []}
            ]
        },
        "gates": {"owner_final_visual_approval_granted": False,
                  "approved_release_identity_issued": False,
                  "publication_authorized": False}
    }
    pins = {"schema": "cwc-render-asset-pins-v1", "surface": "BLUE_DARK",
            "presenter_variant": "WHITE_POINT_LEFT", "assets": {
                "logo": {"drive_file_id": "LOGO"},
                "footer": {"drive_file_id": "FOOTER"},
                "presenter": {"drive_file_id": "PRESENTER", "sha256": "A" * 64}
            }}
    return p, pins


class RenderSafetyTests(unittest.TestCase):
    def test_render_plan_is_only_candidate(self):
        p, pins = fixture()
        mod.validate_plan(p, pins)

    def test_reject_approved_release(self):
        p, pins = fixture()
        p["gates"]["publication_authorized"] = True
        with self.assertRaises(mod.RenderRejected):
            mod.validate_plan(p, pins)

    def test_reject_wrong_asset_id(self):
        p, pins = fixture()
        p["asset_refs"]["logo"]["drive_id"] = "DIFFERENT"
        with self.assertRaises(mod.RenderRejected):
            mod.validate_plan(p, pins)

    def test_reject_format_version_drift(self):
        p, pins = fixture()
        p["authority"]["version"] = "1.5"
        with self.assertRaises(mod.RenderRejected):
            mod.validate_plan(p, pins)

    def test_reject_footer_overlap(self):
        p, pins = fixture()
        p["composition"]["slide_1"]["presenter_core_box"]["y"] = 550
        with self.assertRaises(mod.RenderRejected):
            mod.validate_plan(p, pins)

    def test_reject_noncontiguous_slide_numbers(self):
        p, pins = fixture()
        p["slides"][1]["slide"] = 4
        with self.assertRaises(mod.RenderRejected):
            mod.validate_plan(p, pins)

    def test_reject_unsupported_presenter(self):
        p, pins = fixture()
        p["composition"]["slide_1"]["presenter_variant"] = "UNLOCKED"
        with self.assertRaises(mod.RenderRejected):
            mod.validate_plan(p, pins)

    def test_reject_wrong_slide_canvas(self):
        p, pins = fixture()
        p["canvas"]["height"] = 1402
        with self.assertRaises(mod.RenderRejected):
            mod.validate_plan(p, pins)

    def test_asset_checksum_rejects_corrupted_bytes(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            roles = ("logo", "footer", "presenter", "montserrat_bold", "montserrat_medium", "montserrat_semibold", "montserrat_extrabold")
            records = {}
            for role in roles:
                p = root / (role + ".bin")
                p.write_bytes(("original-" + role).encode())
                records[role] = {"file_name": p.name, "sha256": mod.sha256_file(p)}
            pins = {"schema": "cwc-render-asset-pins-v1", "surface": "BLUE_DARK",
                    "presenter_variant": "WHITE_POINT_LEFT", "assets": records}
            result = mod.verify_assets(root, pins)
            self.assertEqual(set(result), set(roles))
            (root / "presenter.bin").write_bytes(b"tampered")
            with self.assertRaises(mod.RenderRejected):
                mod.verify_assets(root, pins)

    def test_text_wrap_fails_closed_without_auto_shrink(self):
        im = Image.new("RGB", (1080, 1350), "white")
        draw = ImageDraw.Draw(im)
        # DejaVu is a CI-installed *test fixture* font, NEVER a CWC production fallback.
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 64)
        with self.assertRaises(mod.RenderRejected):
            mod.words_and_lines(draw, "longunbrokenword" * 10, font, 200)
        with self.assertRaises(mod.RenderRejected):
            mod.paint_text(im, "Satu dua tiga empat lima enam tujuh delapan sembilan sepuluh",
                           {"x": 72, "y": 250, "width": 250, "height": 10}, font, 82, "#111111")

    def test_hiv_word_rendered_using_project_red(self):
        im = Image.new("RGB", (500, 130), "white")
        draw = ImageDraw.Draw(im)
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 48)
        mod.draw_line_tokens(draw, ["HIV", "bukan", "stigma"], 10, 10, font, "#222222")
        self.assertIn((227, 28, 35), list(im.getdata()))


    def test_actual_visible_alpha_presenter_placement(self):
        # Synthetic mask approximates the BUS-94 derivative's visible occupancy;
        # CI never ships test raster/fonts as a substitute canonical asset.
        source = Image.new("RGBA", (1122, 1402), (0, 0, 0, 0))
        ImageDraw.Draw(source).rectangle((151, 19, 887, 1383), fill=(255, 255, 255, 255))
        core = {"x": 670, "y": 310, "width": 345, "height": 900}
        gesture = {"x": 572, "y": 440, "width": 22, "height": 120}
        copy = {"x": 72, "y": 250, "width": 479, "height": 440}
        resized, destination, evidence = mod.position_presenter(source, core, gesture, copy)
        self.assertGreater(resized.height, 900)
        self.assertEqual(evidence["visible_bounds_px"][0], 572)
        self.assertGreaterEqual(evidence["visible_height_px"], 750)
        self.assertLessEqual(evidence["visible_bounds_px"][2], 1080)
        self.assertLess(evidence["visible_bounds_px"][3], mod.FOOTER_TOP)
        with self.assertRaises(mod.RenderRejected):
            mod.position_presenter(source, core, {"x": 540}, copy)
        with self.assertRaises(mod.RenderRejected):
            mod.position_presenter(source, {**core, "height": 300}, gesture, copy)

    def test_end_to_end_synthetic_composition_smoke(self):
        """Exercises actual SVG/PNG compositing without touching Drive or CWC content."""
        p, pins = fixture()
        p["composition"]["slide_1"]["presenter_core_box"] = {
            "x": 670, "y": 310, "width": 345, "height": 900
        }
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            presenter = root / "presenter.png"
            image = Image.new("RGBA", (1122, 1402), (0, 0, 0, 0))
            ImageDraw.Draw(image).rectangle((151, 19, 887, 1383),
                                            fill=(255, 255, 255, 255))
            image.save(presenter)
            logo = root / "logo.svg"
            footer = root / "footer.svg"
            logo.write_text('<svg xmlns="http://www.w3.org/2000/svg" '
                            'width="360" height="110"><rect width="360" '
                            'height="110" fill="yellow"/></svg>', "utf8")
            footer.write_text('<svg xmlns="http://www.w3.org/2000/svg" '
                              'width="1070" height="64"><rect width="1070" '
                              'height="64" fill="white"/></svg>', "utf8")
            fixture_font = Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf")
            assets = {"presenter": presenter, "logo": logo, "footer": footer,
                      "montserrat_bold": fixture_font, "montserrat_medium": fixture_font,
                      "montserrat_semibold": fixture_font, "montserrat_extrabold": fixture_font}
            result = mod.compose(p, assets, root / "rendered")
            self.assertEqual(len(result["slides"]), 2)
            self.assertEqual(result["slides"][0]["presenter_placement"]["visible_bounds_px"][0], 572)
            self.assertEqual(result["slides"][0]["size_px"], [1080, 1350])
            self.assertIsNone(result["slides"][1]["presenter_placement"])
            self.assertEqual((root / "rendered" / "contact-sheet.jpg").exists(), True)
            with Image.open(root / "rendered" / "slide-01.png") as im:
                self.assertEqual(im.size, (1080, 1350))
                self.assertEqual(im.getpixel((10, 1300)), (255, 255, 255))
                self.assertEqual(im.getpixel((10, 1255)), (11, 61, 158))

    def test_reject_typography_copy_drift(self):
        p, pins = fixture()
        p["typography_layout"]["slides"][0]["blocks"][0]["text"] = "Changed message"
        with self.assertRaises(mod.RenderRejected):
            mod.validate_plan(p, pins)

    def test_reject_invalid_typography_role(self):
        p, pins = fixture()
        p["typography_layout"]["slides"][0]["blocks"][0]["role"] = "shrunken"
        with self.assertRaises(mod.RenderRejected):
            mod.validate_plan(p, pins)

    def test_reject_unauthorized_layout_approval(self):
        p, pins = fixture()
        p["typography_layout"]["source_approval_verified"] = True
        with self.assertRaises(mod.RenderRejected):
            mod.validate_plan(p, pins)

    def test_reject_accent_overlapping_headline(self):
        p, pins = fixture()
        p["typography_layout"]["slides"][0]["accents"][0]["rect"]["y"] = 500
        with self.assertRaises(mod.RenderRejected):
            mod.validate_plan(p, pins)

if __name__ == "__main__":
    unittest.main()

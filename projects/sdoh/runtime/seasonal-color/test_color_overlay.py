#!/usr/bin/env python3
"""Test dormant November overlay against hermetic BUS-49-shaped fixtures."""
import hashlib
import importlib.util
import json
import tempfile
import unittest
from pathlib import Path
from PIL import Image

MODULE = Path(__file__).with_name("apply-color-overlay.py")
spec = importlib.util.spec_from_file_location("sdoh_seasonal_overlay", MODULE)
overlay = importlib.util.module_from_spec(spec)
spec.loader.exec_module(overlay)


class OverlayTests(unittest.TestCase):
    def fixture(self, directory):
        root = Path(directory) / "bus49_v060canonical"
        (root / "assets").mkdir(parents=True)
        (root / "themes").mkdir()
        (root / "provenance").mkdir()
        (root / "renderer.py").write_text("# original renderer unchanged\n")
        logos_dir = Path(directory) / "staged"
        logos_dir.mkdir()
        repo_dir = Path(__file__).parent
        colors = json.loads((repo_dir / "2026-11-trans-awareness.json").read_text())
        derivatives = json.loads((repo_dir / "2026-11-logo-derivatives.json").read_text())
        lock = {"source_roles": {}}
        original_hashes = {}
        for theme, (name, role) in overlay.THEMES.items():
            original = Image.new("RGBA", (7, 5), (30, 20, 10, 0))
            for x in range(7):
                for y in range(5):
                    original.putpixel((x, y), (99, 20, 44, ((x + y) % 5) * 50))
            source_name = name + "-original.png"
            original.save(root / "assets" / source_name)
            raw = root / "assets" / source_name
            original_hashes[theme] = overlay.sha256(raw)
            lock["source_roles"][role] = {
                "bundled": True,
                "bundled_relative_path": "assets/" + source_name,
                "sha256": original_hashes[theme],
                "expected_filename": source_name,
            }
            surface, foreground = overlay.BASE[theme]
            overlay.save(root / "themes" / (name + ".json"), {
                "theme": theme, "background": surface, "foreground": foreground,
                "logo_source_role": role, "theme_emblem_geometry": {"render_width_px": 265},
            })
            color = overlay.NOVEMBER[theme][1]
            rgb = tuple(int(color[i:i + 2], 16) for i in (1, 3, 5))
            derived = Image.new("RGBA", original.size, (*rgb, 255))
            derived.putalpha(original.getchannel("A"))
            asset = derivatives["assets"][theme]
            filename = asset["derivative_filename"]
            derived.save(logos_dir / filename)
            h = overlay.sha256(logos_dir / filename)
            asset["source_sha256"] = original_hashes[theme]
            asset["sha256"] = h
            asset["downloaded_raw_byte_sha256"] = h
        overlay.save(root / "provenance/assets.lock.json", lock)
        config_file = Path(directory) / "palette.json"
        logo_manifest = Path(directory) / "logo-manifest.json"
        overlay.save(config_file, colors)
        overlay.save(logo_manifest, derivatives)
        return root, config_file, logo_manifest, logos_dir, original_hashes

    def test_approved_overlay_preserves_geometry_and_source(self):
        with tempfile.TemporaryDirectory() as d:
            root, palette, logos, staged, hashes = self.fixture(d)
            record = Path(d) / "overlay-record.json"
            result = overlay.apply_overlay(root, palette, logos, staged, record)
            self.assertEqual(result["mode"], "QA_ONLY")
            self.assertFalse(result["production_activation"])
            self.assertEqual(len(result["themes"]), 2)
            self.assertEqual(json.loads(record.read_text()), result)
            lock = overlay.load(root / "provenance/assets.lock.json")
            for theme, (name, role) in overlay.THEMES.items():
                surface, fg = overlay.NOVEMBER[theme]
                updated = overlay.load(root / "themes" / (name + ".json"))
                self.assertEqual((updated["background"], updated["foreground"]), (surface, fg))
                self.assertEqual(updated["theme_emblem_geometry"], {"render_width_px": 265})
                self.assertEqual(updated["logo_source_role"], role)
                self.assertEqual(overlay.sha256(root / "assets" / (name + "-original.png")), hashes[theme])
                expected = overlay.load(logos)["assets"][theme]
                self.assertEqual(lock["source_roles"][role]["sha256"], expected["sha256"])
                self.assertEqual(lock["source_roles"][role]["bundled_relative_path"],
                                 "assets/" + expected["derivative_filename"])

    def test_tampered_logo_fails_before_mutation(self):
        with tempfile.TemporaryDirectory() as d:
            root, palette, logos, staged, _ = self.fixture(d)
            bad = staged / overlay.load(logos)["assets"]["BURGUNDY"]["derivative_filename"]
            bad.write_bytes(bad.read_bytes() + b"tampered")
            before = (root / "themes/sage.json").read_bytes()
            with self.assertRaisesRegex(ValueError, "checksum"):
                overlay.apply_overlay(root, palette, logos, staged, Path(d) / "record.json")
            self.assertEqual((root / "themes/sage.json").read_bytes(), before)

    def test_activation_drift_is_rejected(self):
        with tempfile.TemporaryDirectory() as d:
            root, palette, logos, staged, _ = self.fixture(d)
            config = overlay.load(palette)
            config["activation"]["enabled"] = True
            overlay.save(palette, config)
            with self.assertRaisesRegex(ValueError, "activation forbidden"):
                overlay.apply_overlay(root, palette, logos, staged, Path(d) / "record.json")

    def test_old_november_first_start_is_rejected(self):
        with tempfile.TemporaryDirectory() as d:
            root, palette, logos, staged, _ = self.fixture(d)
            config = overlay.load(palette)
            config["period"]["start"] = "2026-11-01"
            overlay.save(palette, config)
            with self.assertRaisesRegex(ValueError, "Invalid seasonal period"):
                overlay.apply_overlay(root, palette, logos, staged, Path(d) / "record.json")

    def test_layout_extension_not_authorized(self):
        with tempfile.TemporaryDirectory() as d:
            root, palette, logos, staged, _ = self.fixture(d)
            config = overlay.load(palette)
            config["tokens"]["SAGE"]["font_size"] = 88
            overlay.save(palette, config)
            with self.assertRaisesRegex(ValueError, "palette differs"):
                overlay.apply_overlay(root, palette, logos, staged, Path(d) / "record.json")


if __name__ == "__main__":
    unittest.main()

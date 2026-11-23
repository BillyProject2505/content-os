import importlib.util
import json
import tempfile
import unittest
from pathlib import Path

from PIL import Image

SRC = Path(__file__).with_name("check-render-artifact.py")
spec = importlib.util.spec_from_file_location("cwc_artifact_qa", SRC)
qa = importlib.util.module_from_spec(spec)
spec.loader.exec_module(qa)

ID = "CWC-CRSL-9999"


def fixture(root: Path):
    records = []
    for i in (1, 2):
        file = root / f"slide-{i:02d}.png"
        Image.new("RGB", (1080, 1350), (11, 61, 158)).save(file, format="PNG")
        records.append({
            "slide": i, "filename": file.name, "sha256": qa.file_sha256(file),
            "size_px": [1080, 1350], "typography_measurement": []
        })
    contact = root / "contact-sheet.jpg"
    Image.new("RGB", (648, 405), "white").save(contact, format="JPEG")
    report = {
        "schema": "cwc-render-candidate-report-v1",
        "content_id": ID, "source_copy_sha256": "b" * 64,
        "state": "RENDERED_CANDIDATE_UNAPPROVED",
        "asset_hash_verification": "PASS",
        "geometry_and_text_preflight": "PASS",
        "technical_qa": "NOT_COMPLETE",
        "visual_owner_review": "NOT_GRANTED",
        "approved_release_identity": None,
        "publication_authorized": False,
        "artifacts": {
            "slides": records,
            "contact_sheet": {"filename": contact.name, "sha256": qa.file_sha256(contact)}
        }
    }
    (root / "render-report.json").write_text(json.dumps(report), encoding="utf8")
    return report


class ArtifactIntegrityTests(unittest.TestCase):
    def test_real_image_bytes_hash_and_dimensions_pass_only_limited_qa(self):
        with tempfile.TemporaryDirectory() as tmp:
            report = fixture(Path(tmp))
            output = qa.check_rendered_candidate(report, Path(tmp), ID)
            self.assertEqual(output["verdict"], "ARTIFACT_INTEGRITY_PASS")
            self.assertTrue(output["actual_rendered_candidate"])
            self.assertFalse(output["formal_stg08_qa_passed"])
            self.assertFalse(output["stg10_publication_authorized"])

    def test_modified_slide_byte_fails_closed(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            report = fixture(root)
            Image.new("RGB", (1080, 1350), "red").save(root / "slide-01.png")
            with self.assertRaisesRegex(ValueError, "slide byte hash mismatch"):
                qa.check_rendered_candidate(report, root, ID)

    def test_report_may_not_claim_owner_approval_or_publication(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            for key, value in (
                ("visual_owner_review", "APPROVED"),
                ("publication_authorized", True),
                ("technical_qa", "PASS")
            ):
                report = fixture(root)
                report[key] = value
                with self.subTest(key=key), self.assertRaises(ValueError):
                    qa.check_rendered_candidate(report, root, ID)

    def test_invalid_context_and_surplus_media_fail(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            report = fixture(root)
            with self.assertRaisesRegex(ValueError, "cross-content"):
                qa.check_rendered_candidate(report, root, "CWC-CRSL-0004")
            (root / "unapproved-slide.png").write_bytes(b"unexpected")
            with self.assertRaisesRegex(ValueError, "untracked extra"):
                qa.check_rendered_candidate(report, root, ID)

    def test_missing_contact_sheet_fails(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            report = fixture(root)
            (root / "contact-sheet.jpg").unlink()
            with self.assertRaisesRegex(ValueError, "missing or symlink"):
                qa.check_rendered_candidate(report, root, ID)

if __name__ == "__main__":
    unittest.main()

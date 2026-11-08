import copy
import hashlib
import json
import unittest
from readiness_diagnostic import probe, media_rows, HEALTH

class DiagnosticTests(unittest.TestCase):
    def setUp(self):
        self.data = b"approved-jpeg"
        self.index = {"records": [
            {"content_id": f"SDOH-SAGE-CAR-{n:04d}", "media": [
                {"slot": s, "drive_file_id": f"file_{n}_{s}",
                 "sha256": hashlib.sha256(self.data).hexdigest(), "mime_type": "image/jpeg"}
                for s in range(1, 6)]} for n in range(13)]}
        self.env = {k: "configured" for k in (
            "GCP_PROJECT_ID", "GCP_WORKLOAD_IDENTITY_PROVIDER", "GCP_SERVICE_ACCOUNT")}
        self.env.update(GOOGLE_ACCESS_TOKEN="SENSITIVE_TOKEN",
                        SDOH_SCHEDULED_AUTOMATION_ENABLED="true",
                        LINEAR_API_KEY_PRESENT="true", EXECUTOR_INGEST_SECRET_PRESENT="true")
        self.health = {"ok": True, "instagram": {"username": "satudosisobathati",
                       "user_id_match": True}, "scheduled_wakeup_enabled": True,
                       "publishing_enabled": False}
        self.calls = []

    def fetch(self, url, token=""):
        self.calls.append((url, token))
        if url == HEALTH:
            self.assertEqual(token, "")
            return 200, json.dumps(self.health).encode()
        self.assertTrue(url.startswith("https://www.googleapis.com/drive/v3/files/"))
        self.assertEqual(token, "SENSITIVE_TOKEN")
        return 200, self.data

    def test_success_without_manual_publishing(self):
        result = probe(self.index, self.env, self.fetch)
        self.assertTrue(result["checks_passed"])
        self.assertEqual(result["media_passed"], 65)
        self.assertEqual(len(self.calls), 66)
        self.assertNotIn("SENSITIVE_TOKEN", json.dumps(result))

    def test_missing_token_still_checks_health(self):
        self.env.pop("GOOGLE_ACCESS_TOKEN")
        result = probe(self.index, self.env, self.fetch)
        self.assertFalse(result["checks_passed"])
        self.assertEqual(len(self.calls), 1)

    def test_access_denied(self):
        result = probe(self.index, self.env, lambda *args: (403, b"secret response"))
        self.assertFalse(result["checks_passed"])
        self.assertEqual(result["media_passed"], 0)
        self.assertNotIn("secret response", json.dumps(result))

    def test_hash_mismatch(self):
        self.data = b"changed"
        result = probe(self.index, self.env, self.fetch)
        self.assertEqual(result["media"][0]["status"], "HASH_MISMATCH")

    def test_invalid_ids_never_request_drive(self):
        self.index["records"][0]["media"][0]["drive_file_id"] = "../escape?x=1"
        result = probe(self.index, self.env, self.fetch)
        self.assertEqual(result["index"], "INVALID")
        self.assertEqual(len(self.calls), 1)

    def test_duplicate_media(self):
        self.index["records"][0]["media"][1] = copy.deepcopy(self.index["records"][0]["media"][0])
        with self.assertRaises(ValueError):
            media_rows(self.index)

    def test_scheduler_disabled(self):
        self.env["SDOH_SCHEDULED_AUTOMATION_ENABLED"] = "false"
        self.assertFalse(probe(self.index, self.env, self.fetch)["checks_passed"])

    def test_malformed_health(self):
        result = probe(self.index, self.env, lambda *args: (200, b"not-json"))
        self.assertEqual(result["worker"]["status"], "FAILED")

if __name__ == "__main__":
    unittest.main()

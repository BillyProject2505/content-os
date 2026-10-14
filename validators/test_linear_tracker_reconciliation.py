#!/usr/bin/env python3
"""Network-free regression tests for live Linear tracker reconciliation."""
from io import BytesIO
import json
import sys
from pathlib import Path
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parent))
from reconcile_linear_tracker import (
    assess, current_authority, current_dependency_assertions, fetch_live, graph_query,
    parse_doc, render_summary,
)


def fixture(version="1.40", issue="BUS-25"):
    return parse_doc(
        '---\ndocument_name: "Satu Dosis Obat Hati — Production SOP"\n'
        'universal_identifier: "DIUA-DIC-000008"\n'
        'version: "' + version + '"\nrelated_issue: "' + issue + '"\n'
        'depends_on:\n'
        '  - id: "DIUA-DIC-000007"\n'
        '    name: "Satu Dosis Obat Hati — Project Architecture"\n'
        '    version: "1.13"\n'
        '    status: "CANONICAL"\n---\n'
    )


def issue(description, identifier="BUS-25"):
    return {"identifier": identifier, "description": description}


class TestLinearReadOnlyReconciliation(unittest.TestCase):
    def test_yaml_nested_dependency_fields(self):
        parsed = fixture()
        self.assertEqual("1.40", parsed["version"])
        self.assertEqual("DIUA-DIC-000007", parsed["dependencies"][0]["id"])
        self.assertEqual("1.13", parsed["dependencies"][0]["version"])
        self.assertEqual("Satu Dosis Obat Hati — Project Architecture",
                         parsed["dependencies"][0]["name"])

    def test_current_explicit_match(self):
        description = "## Current Canonical Document\n\nProduction SOP current authority: **v1.40 CANONICAL**."
        self.assertEqual("MATCH", assess(fixture(), issue(description))["status"])

    def test_current_explicit_drift(self):
        description = "## Current Canonical Document\n\nProduction SOP current authority: **v1.39 CANONICAL**."
        result = assess(fixture(), issue(description))
        self.assertEqual("DRIFT", result["status"])
        self.assertEqual("1.39", result["observed_version"])

    def test_old_current_snapshot_and_new_current_are_ambiguous(self):
        description = (
            "## Current canonical state — 2026-10-14\n"
            "SDOH Production SOP v1.40 CANONICAL\n\n"
            "## Repository Authority Synchronization — 2026-10-05\n"
            "Current SDOH Production SOP v1.39 CANONICAL"
        )
        self.assertEqual("AMBIGUOUS", assess(fixture(), issue(description))["status"])

    def test_old_historical_prose_ignored(self):
        description = (
            "## Current canonical state — 2026-10-14\n"
            "SDOH Production SOP v1.40 CANONICAL\n"
            "## Historical state\n"
            "Previous SDOH Production SOP v1.39 CANONICAL"
        )
        self.assertEqual("MATCH", assess(fixture(), issue(description))["status"])

    def test_unverified_is_not_pass(self):
        self.assertEqual("NOT_DECLARED", assess(fixture(), issue(
            "The attached Linear document v1.39 is a migrated historical snapshot."))["status"])

    def test_structured_marker_overrides_historical_current(self):
        description = (
            "<!-- CONTENT_OS_CURRENT_AUTHORITY: DIUA-DIC-000008@1.40 -->\n"
            "Current SDOH Production SOP v1.39 CANONICAL (historical checkpoint)"
        )
        self.assertEqual("MATCH", assess(fixture(), issue(description))["status"])

    def test_marker_duplicate_versions_ambiguous(self):
        description = (
            "<!-- CONTENT_OS_CURRENT_AUTHORITY: DIUA-DIC-000008@1.40 -->\n"
            "<!-- CONTENT_OS_CURRENT_AUTHORITY: DIUA-DIC-000008@1.39 -->\n"
        )
        self.assertEqual("AMBIGUOUS", assess(fixture(), issue(description))["status"])

    def test_missing_or_inaccessible_issue_fails_closed(self):
        self.assertEqual("ISSUE_NOT_FOUND", assess(fixture(), None)["status"])
        self.assertEqual("ISSUE_NOT_FOUND", assess(fixture(), issue("current", "BUS-44"))["status"])

    def test_current_dependency_assertion(self):
        doc = fixture()
        description = ("**Current Depends On:** SDOH Project Architecture **v1.13 CANONICAL**; "
                       "Root Documentation Structure v2.5.")
        assertions = current_dependency_assertions(description, doc)
        self.assertEqual(1, len(assertions))
        self.assertEqual("MATCH", assertions[0]["status"])
        different = description.replace("v1.13", "v1.12")
        self.assertEqual("DRIFT", current_dependency_assertions(different, doc)[0]["status"])

    def test_only_graphql_query_operation(self):
        query = graph_query(["BUS-25", "BUS-41"])
        self.assertTrue(query.startswith("query ContentOSReadOnlyIssueAudit"))
        self.assertNotIn("mutation", query.lower())
        self.assertIn('issue(id: "BUS-41")', query)
        with self.assertRaises(ValueError):
            graph_query(['BUS-25") { mutation Evil }'])

    def test_transport_sends_read_only_query_and_sanitizes_result(self):
        requests = []
        class Response(BytesIO):
            status = 200
            def __enter__(self): return self
            def __exit__(self, *_): self.close()
        def fake(request, timeout):
            requests.append((request, timeout))
            data = {"data": {"i0": issue("Production SOP current authority v1.40")}}
            return Response(json.dumps(data).encode("utf-8"))
        result = fetch_live("not-a-real-secret", ["BUS-25"], transport=fake)
        self.assertEqual("BUS-25", result["BUS-25"]["identifier"])
        request, timeout = requests[0]
        self.assertEqual("https://api.linear.app/graphql", request.full_url)
        self.assertEqual("POST", request.get_method())
        self.assertNotIn("mutation", request.data.decode().lower())
        self.assertLessEqual(timeout, 15)
        self.assertEqual(1, len(requests))

    def test_summary_does_not_include_linear_description(self):
        report = {"github_revision": "deadbeef", "scope": "all",
                  "scanned_documents": 42, "issues_queried": 35, "counts": {"MATCH": 1},
                  "dependency_comparisons": 0, "dependency_drift": 0,
                  "results": [{**assess(fixture(), issue("Production SOP current authority: v1.40")),
                               "description": "PRIVATE LINEAR BODY"}]}
        output = render_summary(report)
        self.assertNotIn("PRIVATE LINEAR BODY", output)
        self.assertIn("MATCH", output)


if __name__ == "__main__":
    unittest.main()

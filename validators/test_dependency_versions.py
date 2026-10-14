#!/usr/bin/env python3
"""Regression fixtures for checked-out Content OS dependency drift checks."""
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest
from validate_dependency_versions import validate


def document(name, doc_id, version, issue, dependencies='', body_depends='', body_issue=None, preface=''):
    issue_row = (f'| Related Issue | [BUS-{body_issue}](https://linear.app/bussiness-content-os/issue/BUS-{body_issue}) |\n'
                 if body_issue is not None else '')
    return (f'---\ndocument_name: "{name}"\nuniversal_identifier: "{doc_id}"\n'
            f'version: "{version}"\nrelated_issue: "{issue}"\ndepends_on:\n{dependencies}'
            f'---\n{preface}## Document Identity\n\n{issue_row}'
            f'| Depends On | {body_depends} |\n')


class DependencyChecks(unittest.TestCase):
    def check(self, dependent):
        with TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / 'root').mkdir()
            (root / 'projects').mkdir()
            (root / 'root' / 'DIUA-DIC-000008_SOP.md').write_text(
                document('Satu Dosis Obat Hati — Production SOP', 'DIUA-DIC-000008',
                         '1.40', 'BUS-25', body_issue=25), encoding='utf-8')
            (root / 'projects' / 'DIUA-DIC-000022_Register.md').write_text(
                dependent, encoding='utf-8')
            return validate(root)[0]

    def dependent(self, pin='1.40', body='1.40', issue='BUS-51', body_issue=51, preface=''):
        return document('Sage Reels Register', 'DIUA-DIC-000022', '1.5', issue,
                        dependencies=(f'  - id: "DIUA-DIC-000008"\n'
                                      f'    name: "Satu Dosis Obat Hati — Production SOP"\n'
                                      f'    version: "{pin}"\n'),
                        body_depends=f'SDOH Production SOP v{body}',
                        body_issue=body_issue, preface=preface)

    def test_matching_metadata_and_body(self):
        self.assertEqual([], self.check(self.dependent()))

    def test_stale_yaml_detected(self):
        errors = self.check(self.dependent(pin='1.39'))
        self.assertTrue(any('DEP-VERSION-01' in e for e in errors), errors)
        self.assertTrue(any('DEP-BODY-01' in e for e in errors), errors)

    def test_stale_body_detected(self):
        errors = self.check(self.dependent(body='1.39'))
        self.assertTrue(any('DEP-BODY-01' in e for e in errors), errors)

    def test_related_issue_mismatch_detected(self):
        errors = self.check(self.dependent(issue='BUS-45'))
        self.assertTrue(any('DEP-ISSUE-01' in e for e in errors), errors)

    def test_historical_migration_exception(self):
        preface = ('> **Migration dependency note:** the source Linear header pinned SDOH Production SOP '
                   'at v1.39; frontmatter was normalized to v1.40 and this historical provenance is retained.\n\n')
        self.assertEqual([], self.check(self.dependent(body='1.39', preface=preface)))

    def test_unresolved_registered_target(self):
        errors = self.check(self.dependent().replace('DIUA-DIC-000008', 'DIUA-DIC-000777'))
        self.assertTrue(any('DEP-TARGET-01' in e for e in errors), errors)

    def test_historical_prose_is_not_current(self):
        dependent = self.dependent() + '\n## Historical state\nProduction SOP v1.31 applied earlier.\n'
        self.assertEqual([], self.check(dependent))


if __name__ == '__main__':
    unittest.main()

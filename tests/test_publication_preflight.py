import os
import subprocess
import tempfile
import unittest
from pathlib import Path

import yaml


REPOSITORY_ROOT = Path(__file__).resolve().parents[1]
BUILD_WORKFLOW = REPOSITORY_ROOT / ".github" / "workflows" / "build.yml"


def build_steps() -> list[dict]:
    workflow = yaml.safe_load(BUILD_WORKFLOW.read_text(encoding="utf-8"))
    return workflow["jobs"]["build"]["steps"]


def find_step(name: str) -> dict | None:
    return next((step for step in build_steps() if step.get("name") == name), None)


class PublicationPreflightTest(unittest.TestCase):
    def test_snapshot_uses_pinned_respec_on_supported_node(self) -> None:
        setup = find_step("Set up Node.js")
        generate = find_step("Generate HTML snapshot")

        self.assertIsNotNone(setup, "De build moet expliciet een ondersteunde Node-versie installeren.")
        self.assertTrue(setup["uses"].startswith("actions/setup-node@"))
        self.assertEqual(str(setup["with"]["node-version"]), "24")
        self.assertIsNotNone(generate)
        self.assertIn("npx --yes respec@37.3.2", generate["run"])

    def test_prepares_the_same_content_tree_that_publish_uses(self) -> None:
        step = find_step("Prepare publication for validation")
        self.assertIsNotNone(step, "De build moet het toekomstige publicatiepakket voorbereiden.")

        with tempfile.TemporaryDirectory() as directory:
            source = Path(directory)
            (source / "snapshot.html").write_text("snapshot", encoding="utf-8")
            for asset_directory in ("data", "media", "js", "css"):
                target = source / asset_directory
                target.mkdir()
                (target / "asset.txt").write_text(asset_directory, encoding="utf-8")

            stale = source / ".checks" / "publication"
            stale.mkdir(parents=True)
            (stale / "stale.html").write_text("stale", encoding="utf-8")

            environment = os.environ.copy()
            environment["CHECK_DIR"] = ".checks"
            subprocess.run(
                ["bash", "-euo", "pipefail", "-c", step["run"]],
                cwd=source,
                env=environment,
                check=True,
                capture_output=True,
                text=True,
            )

            publication = source / ".checks" / "publication"
            self.assertEqual((publication / "index.html").read_text(encoding="utf-8"), "snapshot")
            self.assertFalse((publication / "snapshot.html").exists())
            self.assertFalse((publication / "stale.html").exists())
            for asset_directory in ("data", "media", "js", "css"):
                self.assertEqual(
                    (publication / asset_directory / "asset.txt").read_text(encoding="utf-8"),
                    asset_directory,
                )

    def test_html_validation_is_blocking_for_the_publication_tree(self) -> None:
        step = find_step("Validate publication HTML")
        self.assertIsNotNone(step, "De build moet het publicatiepakket als HTML valideren.")

        self.assertNotIn("continue-on-error", step)
        self.assertNotIn("if", step)
        self.assertEqual(step["with"]["directory"], "${{ env.CHECK_DIR }}/publication")
        self.assertIs(step["with"]["check_html"], True)
        self.assertIs(step["with"]["check_css"], False)
        self.assertIs(step["with"]["disable_external"], True)
        self.assertIs(step["with"]["ignore_empty_alt"], True)

    def test_lychee_checks_every_published_html_file_and_fails_on_errors(self) -> None:
        step = find_step("Validate publication links")
        self.assertIsNotNone(step, "De build moet publicatielinks met Lychee valideren.")

        self.assertNotIn("continue-on-error", step)
        self.assertEqual(step.get("if"), "${{ !cancelled() }}")
        self.assertTrue(step["uses"].startswith("lycheeverse/lychee-action@"))
        self.assertIs(step["with"]["fail"], True)
        self.assertEqual(step["with"]["workingDirectory"], "${{ env.CHECK_DIR }}/publication")
        self.assertIn("--offline", step["with"]["args"])
        self.assertIn("--root-dir", step["with"]["args"])
        self.assertIn("./**/*.html", step["with"]["args"])

    def test_summary_always_reports_whether_the_commit_is_ready_for_publication(self) -> None:
        html_step = find_step("Validate publication HTML")
        link_step = find_step("Validate publication links")
        summary_step = find_step("Summarize publication preflight")

        self.assertIsNotNone(html_step)
        self.assertIsNotNone(link_step)
        self.assertIsNotNone(summary_step, "De build moet de publicatiegereedheid samenvatten.")
        self.assertEqual(html_step.get("id"), "publication-html")
        self.assertEqual(link_step.get("id"), "publication-links")
        self.assertEqual(summary_step.get("if"), "${{ always() }}")
        self.assertIn("GITHUB_STEP_SUMMARY", summary_step["run"])
        self.assertIn("Publicatiegereed", summary_step["run"])
        self.assertIn("${{ job.status }}", summary_step["run"])
        self.assertIn('BUILD_STATUS" == "success', summary_step["run"])


if __name__ == "__main__":
    unittest.main()

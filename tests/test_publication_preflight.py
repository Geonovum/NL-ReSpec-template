import os
import subprocess
import tempfile
import unittest
from pathlib import Path

import yaml


REPOSITORY_ROOT = Path(__file__).resolve().parents[1]
BUILD_WORKFLOW = REPOSITORY_ROOT / ".github" / "workflows" / "build.yml"
PUBLISH_WORKFLOW = REPOSITORY_ROOT / ".github" / "workflows" / "publish.yml"
RESPEC_CONFIG = REPOSITORY_ROOT / "js" / "config.js"


def build_steps() -> list[dict]:
    workflow = yaml.safe_load(BUILD_WORKFLOW.read_text(encoding="utf-8"))
    return workflow["jobs"]["build"]["steps"]


def find_step(name: str) -> dict | None:
    return next((step for step in build_steps() if step.get("name") == name), None)


def publish_steps() -> list[dict]:
    workflow = yaml.safe_load(PUBLISH_WORKFLOW.read_text(encoding="utf-8"))
    return workflow["jobs"]["release"]["steps"]


def find_publish_step(name: str) -> dict | None:
    return next((step for step in publish_steps() if step.get("name") == name), None)


def run_validation_step(
    step_name: str,
    index_html: str,
    fragment_html: str,
    *,
    mode: str,
    include_asset: bool = False,
) -> subprocess.CompletedProcess[str]:
    step = find_step(step_name)
    if step is None or "run" not in step:
        raise AssertionError(
            f"{step_name} moet als uitvoerbare stap alleen het gegenereerde indexbestand selecteren."
        )

    with tempfile.TemporaryDirectory() as directory:
        workspace = Path(directory)
        publication = workspace / "publication-validation"
        (publication / "data").mkdir(parents=True)
        (publication / "media").mkdir()
        (publication / "index.html").write_text(index_html, encoding="utf-8")
        (publication / "data" / "fragment.html").write_text(
            fragment_html, encoding="utf-8"
        )
        if include_asset:
            (publication / "media" / "example.svg").write_text(
                '<svg xmlns="http://www.w3.org/2000/svg"></svg>', encoding="utf-8"
            )

        fake_bin = workspace / "bin"
        fake_bin.mkdir()
        fake_docker = fake_bin / "docker"
        fake_docker.write_text(
            """#!/usr/bin/env python3
import os
import sys
from pathlib import Path

arguments = sys.argv[1:]
volume_flag = "--volume" if "--volume" in arguments else "-v"
mount = arguments[arguments.index(volume_flag) + 1]
host_root, container_root, *_ = mount.split(":", 2)
targets = [argument for argument in arguments if argument.startswith(f"{container_root}/")]

if targets != [f"{container_root}/index.html"]:
    raise SystemExit(64)

index = Path(host_root) / "index.html"
mode = os.environ["FAKE_DOCKER_MODE"]
entrypoint = arguments[arguments.index("--entrypoint") + 1]
if mode == "html":
    if entrypoint != "java" or "-jar" not in arguments or "/bin/vnu.jar" not in arguments:
        raise SystemExit(66)
    if "</section></p>" in index.read_text(encoding="utf-8"):
        raise SystemExit(1)
elif mode == "assets":
    ruby_program = arguments[arguments.index("-e") + 1]
    if entrypoint != "ruby" or "HTMLProofer.check_file" not in ruby_program:
        raise SystemExit(66)
    if "media/example.svg" in index.read_text(encoding="utf-8"):
        if not (Path(host_root) / "media" / "example.svg").is_file():
            raise SystemExit(1)
else:
    raise SystemExit(65)
""",
            encoding="utf-8",
        )
        fake_docker.chmod(0o755)

        environment = os.environ.copy()
        environment["FAKE_DOCKER_MODE"] = mode
        environment["GITHUB_WORKSPACE"] = str(workspace)
        environment["PATH"] = f"{fake_bin}{os.pathsep}{environment['PATH']}"
        return subprocess.run(
            ["bash", "-euo", "pipefail", "-c", step["run"]],
            cwd=workspace,
            env=environment,
            check=False,
            capture_output=True,
            text=True,
        )


class PublicationPreflightTest(unittest.TestCase):
    def test_local_post_processors_preserve_organisation_processors(self) -> None:
        config = RESPEC_CONFIG.read_text(encoding="utf-8")

        self.assertIn(
            "...(organisationConfig.postProcess ?? [])",
            config,
            "Lokale post-processors mogen de Mermaid-processor uit de organisatieconfig niet vervangen.",
        )

    def test_snapshot_uses_pinned_respec_on_supported_node(self) -> None:
        setup = find_step("Set up Node.js")
        generate = find_step("Generate HTML snapshot")

        self.assertIsNotNone(setup, "De build moet expliciet een ondersteunde Node-versie installeren.")
        self.assertTrue(setup["uses"].startswith("actions/setup-node@"))
        self.assertEqual(str(setup["with"]["node-version"]), "24")
        self.assertIsNotNone(generate)
        self.assertIn("npx --yes respec@37.3.2", generate["run"])

    def test_validation_tree_keeps_assets_but_excludes_respec_source_fragments(self) -> None:
        step = find_step("Prepare publication for validation")
        self.assertIsNotNone(step, "De build moet het toekomstige publicatiepakket voorbereiden.")

        with tempfile.TemporaryDirectory() as directory:
            source = Path(directory)
            (source / "snapshot.html").write_text("snapshot", encoding="utf-8")
            for asset_directory in ("data", "media", "js", "css"):
                target = source / asset_directory
                target.mkdir()
                (target / "asset.txt").write_text(asset_directory, encoding="utf-8")
                fragments = target / "nested"
                fragments.mkdir()
                (fragments / "model.respec.html").write_text("fragment", encoding="utf-8")
                (fragments / "model.respec.catalog.xhtml").write_text(
                    "catalog", encoding="utf-8"
                )
                (fragments / "legacy-fragment.html").write_text(
                    "<section><p>fragment</section></p>", encoding="utf-8"
                )

            stale = source / "publication-validation"
            stale.mkdir(parents=True)
            (stale / "stale.html").write_text("stale", encoding="utf-8")

            environment = os.environ.copy()
            environment["GITHUB_WORKSPACE"] = str(source)
            subprocess.run(
                ["bash", "-euo", "pipefail", "-c", step["run"]],
                cwd=source,
                env=environment,
                check=True,
                capture_output=True,
                text=True,
            )

            publication = source / "publication-validation"
            self.assertEqual((publication / "index.html").read_text(encoding="utf-8"), "snapshot")
            self.assertFalse((publication / "snapshot.html").exists())
            self.assertFalse((publication / "stale.html").exists())
            self.assertFalse((source / ".checks").exists())
            for asset_directory in ("data", "media", "js", "css"):
                self.assertEqual(
                    (publication / asset_directory / "asset.txt").read_text(encoding="utf-8"),
                    asset_directory,
                )
                self.assertFalse(
                    (publication / asset_directory / "nested" / "model.respec.html").exists()
                )
                self.assertFalse(
                    (
                        publication
                        / asset_directory
                        / "nested"
                        / "model.respec.catalog.xhtml"
                    ).exists()
                )
                self.assertTrue(
                    (
                        publication
                        / asset_directory
                        / "nested"
                        / "legacy-fragment.html"
                    ).exists()
                )

            published_html = sorted(
                path.relative_to(publication).as_posix()
                for path in publication.rglob("*")
                if path.is_file() and path.suffix.lower() in {".html", ".xhtml"}
            )
            self.assertEqual(
                published_html,
                [
                    "css/nested/legacy-fragment.html",
                    "data/nested/legacy-fragment.html",
                    "index.html",
                    "js/nested/legacy-fragment.html",
                    "media/nested/legacy-fragment.html",
                ],
            )

    def test_publish_content_keeps_assets_but_excludes_respec_source_fragments(self) -> None:
        step = find_publish_step("Prepare content")
        self.assertIsNotNone(step, "De publicatie moet het definitieve contentpakket voorbereiden.")

        with tempfile.TemporaryDirectory() as directory:
            source = Path(directory)
            (source / "snapshot.html").write_text("snapshot", encoding="utf-8")
            for asset_directory in ("data", "media", "js", "css"):
                target = source / asset_directory
                target.mkdir()
                (target / "asset.txt").write_text(asset_directory, encoding="utf-8")
                fragments = target / "nested"
                fragments.mkdir()
                (fragments / "model.respec.html").write_text("fragment", encoding="utf-8")
                (fragments / "model.respec.catalog.xhtml").write_text(
                    "catalog", encoding="utf-8"
                )
                (fragments / "published-page.html").write_text(
                    "<html><body>Publiceerbaar</body></html>", encoding="utf-8"
                )

            subprocess.run(
                ["bash", "-euo", "pipefail", "-c", step["run"]],
                cwd=source,
                check=True,
                capture_output=True,
                text=True,
            )

            content = source / "content"
            self.assertEqual((content / "index.html").read_text(encoding="utf-8"), "snapshot")
            for asset_directory in ("data", "media", "js", "css"):
                self.assertEqual(
                    (content / asset_directory / "asset.txt").read_text(encoding="utf-8"),
                    asset_directory,
                )
                self.assertFalse(
                    (content / asset_directory / "nested" / "model.respec.html").exists()
                )
                self.assertFalse(
                    (
                        content / asset_directory / "nested" / "model.respec.catalog.xhtml"
                    ).exists()
                )
                self.assertTrue(
                    (content / asset_directory / "nested" / "published-page.html").exists()
                )

    def test_html_validation_is_blocking_for_generated_index(self) -> None:
        step = find_step("Validate publication HTML")
        self.assertIsNotNone(step, "De build moet het gegenereerde indexdocument valideren.")

        self.assertNotIn("continue-on-error", step)
        self.assertNotIn("if", step)
        self.assertEqual(step.get("shell"), "bash")
        self.assertIn("run", step)
        self.assertNotIn("validator_ignore", step.get("with", {}))
        self.assertNotIn("--filterpattern", step.get("run", ""))

    def test_invalid_loose_fragment_does_not_fail_html_syntax_validation(self) -> None:
        result = run_validation_step(
            "Validate publication HTML",
            "<!doctype html><html lang='nl'><head><title>Test</title></head>"
            "<body><p>Geldig</p></body></html>",
            "<section><p>Los fragment</section></p>",
            mode="html",
        )

        self.assertEqual(result.returncode, 0, result.stderr)

    def test_invalid_generated_index_fails_html_syntax_validation(self) -> None:
        result = run_validation_step(
            "Validate publication HTML",
            "<!doctype html><html lang='nl'><head><title>Test</title></head>"
            "<body><section><p>Ongeldig</section></p></body></html>",
            "<section><p>Geldig fragment</p></section>",
            mode="html",
        )

        self.assertNotEqual(result.returncode, 0)

    def test_publication_asset_checks_keep_full_tree_without_html_syntax_check(self) -> None:
        step = find_step("Check publication assets")
        self.assertIsNotNone(step, "De bestaande assetcontroles moeten actief blijven.")

        self.assertNotIn("continue-on-error", step)
        self.assertEqual(step.get("if"), "${{ !cancelled() }}")
        self.assertEqual(step.get("shell"), "bash")
        self.assertIn("run", step)
        self.assertNotIn("validator_ignore", step.get("with", {}))
        self.assertNotIn("--filterpattern", step.get("run", ""))

    def test_publication_asset_checks_do_not_treat_fragment_as_document(self) -> None:
        result = run_validation_step(
            "Check publication assets",
            "<!doctype html><html lang='nl'><head><title>Test</title></head>"
            "<body><img src='media/example.svg' alt='Voorbeeld'></body></html>",
            "<section><p>Los fragment zonder documentmetadata</section></p>",
            mode="assets",
            include_asset=True,
        )

        self.assertEqual(result.returncode, 0, result.stderr)

    def test_publication_asset_checks_block_missing_local_asset(self) -> None:
        result = run_validation_step(
            "Check publication assets",
            "<!doctype html><html lang='nl'><head><title>Test</title></head>"
            "<body><img src='media/example.svg' alt='Ontbreekt'></body></html>",
            "<section><p>Los fragment</p></section>",
            mode="assets",
            include_asset=False,
        )

        self.assertNotEqual(result.returncode, 0)

    def test_lychee_checks_only_generated_index_and_fails_on_errors(self) -> None:
        step = find_step("Validate publication links")
        self.assertIsNotNone(step, "De build moet publicatielinks met Lychee valideren.")

        self.assertNotIn("continue-on-error", step)
        self.assertEqual(step.get("if"), "${{ !cancelled() }}")
        self.assertTrue(step["uses"].startswith("lycheeverse/lychee-action@"))
        self.assertIs(step["with"]["fail"], True)
        self.assertEqual(
            step["with"]["workingDirectory"],
            "${{ github.workspace }}/publication-validation",
        )
        self.assertIn("--offline", step["with"]["args"])
        self.assertIn("--root-dir", step["with"]["args"])
        self.assertIn("./index.html", step["with"]["args"])
        self.assertNotIn("./**/*.html", step["with"]["args"])

    def test_validation_reports_are_artifacts_and_not_committed(self) -> None:
        commit_step = find_step("Commit all results")
        artifact_step = find_step("Upload validation reports")

        self.assertIsNotNone(commit_step)
        self.assertNotIn(".checks", commit_step["run"])
        self.assertNotIn("CHECK_DIR", commit_step["run"])
        self.assertIsNotNone(artifact_step)
        self.assertEqual(artifact_step.get("if"), "${{ always() }}")
        self.assertIn(
            "${{ runner.temp }}/nl-respec-validation/wcag-report.json",
            artifact_step["with"]["path"],
        )
        self.assertIn(
            "${{ runner.temp }}/nl-respec-validation/link-check.txt",
            artifact_step["with"]["path"],
        )

        cleanup_step = find_step("Remove validation working directory")
        self.assertIsNotNone(cleanup_step)
        self.assertEqual(cleanup_step.get("if"), "${{ always() }}")

    def test_summary_always_reports_whether_the_commit_is_ready_for_publication(self) -> None:
        html_step = find_step("Validate publication HTML")
        asset_step = find_step("Check publication assets")
        link_step = find_step("Validate publication links")
        summary_step = find_step("Summarize publication preflight")

        self.assertIsNotNone(html_step)
        self.assertIsNotNone(asset_step)
        self.assertIsNotNone(link_step)
        self.assertIsNotNone(summary_step, "De build moet de publicatiegereedheid samenvatten.")
        self.assertEqual(html_step.get("id"), "publication-html")
        self.assertEqual(asset_step.get("id"), "publication-assets")
        self.assertEqual(link_step.get("id"), "publication-links")
        self.assertEqual(summary_step.get("if"), "${{ always() }}")
        self.assertIn("GITHUB_STEP_SUMMARY", summary_step["run"])
        self.assertIn("Publicatiegereed", summary_step["run"])
        self.assertIn("${{ job.status }}", summary_step["run"])
        self.assertIn("${{ steps.publication-assets.outcome }}", summary_step["run"])
        self.assertIn('BUILD_STATUS" == "success', summary_step["run"])


if __name__ == "__main__":
    unittest.main()

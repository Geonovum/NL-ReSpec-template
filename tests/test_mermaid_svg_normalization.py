import re
import subprocess
import tempfile
import unittest
from collections import Counter
from pathlib import Path

import yaml


REPOSITORY_ROOT = Path(__file__).resolve().parents[1]
BUILD_WORKFLOW = REPOSITORY_ROOT / ".github" / "workflows" / "build.yml"
NORMALIZER = REPOSITORY_ROOT / ".github" / "workflows" / "normalize-mermaid-svg.mjs"
UPDATE_SCRIPT = REPOSITORY_ROOT / "scripts" / "update-document-repos.mjs"

ID_ATTRIBUTE = re.compile(r'\sid="([^"]*)"')

# Twee diagrammen zoals mermaid ze genereert: identieke <defs>-id's, plus een
# intern layout-attribuut dat niet in SVG bestaat.
FIXTURE = """<!DOCTYPE html>
<html lang="nl"><head><meta charset="utf-8"><title>Test</title></head><body>
<pre><svg id="diagram-1" xmlns="http://www.w3.org/2000/svg" role="img"
 aria-labelledby="chart-title-diagram-1 chart-desc-diagram-1"><title
 id="chart-title-diagram-1">Een</title><desc id="chart-desc-diagram-1"></desc><style>
#diagram-1 #arrowhead path{fill:#333;}</style><defs><marker id="arrowhead"><path
 d="M 0 0 L 10 5"></path></marker></defs><g class="node" label-offset-y="14.13"><line
 marker-end="url(#arrowhead)" x1="0" y1="0" x2="10" y2="10"></line></g></svg></pre>
<pre><svg id="diagram-2" xmlns="http://www.w3.org/2000/svg" role="img"
 aria-labelledby="chart-title-diagram-2 chart-desc-diagram-2"><title
 id="chart-title-diagram-2">Twee</title><desc id="chart-desc-diagram-2"></desc><style>
#diagram-2 #arrowhead path{fill:#333;}</style><defs><marker id="arrowhead"><path
 d="M 0 0 L 10 5"></path></marker></defs><g class="node" label-offset-y="12.49"><line
 marker-end="url(#arrowhead)" x1="0" y1="0" x2="10" y2="10"></line></g></svg></pre>
</body></html>
"""


def build_steps() -> list[dict]:
    workflow = yaml.safe_load(BUILD_WORKFLOW.read_text(encoding="utf-8"))
    return workflow["jobs"]["build"]["steps"]


def step_names() -> list[str]:
    return [step.get("name") for step in build_steps()]


def normalize(html: str) -> str:
    with tempfile.TemporaryDirectory() as directory:
        target = Path(directory) / "snapshot.html"
        target.write_text(html, encoding="utf-8")
        subprocess.run(
            ["node", str(NORMALIZER), str(target)],
            check=True,
            capture_output=True,
        )
        return target.read_text(encoding="utf-8")


class MermaidSvgNormalizationTest(unittest.TestCase):
    def test_build_normalizes_before_validation(self) -> None:
        names = step_names()

        self.assertIn(
            "Normaliseer mermaid-diagrammen in snapshot",
            names,
            "De build moet de mermaid-SVG normaliseren voordat de HTML wordt gevalideerd.",
        )
        self.assertLess(
            names.index("Normaliseer mermaid-diagrammen in snapshot"),
            names.index("Prepare publication for validation"),
            "Normaliseren moet gebeuren voordat het publicatiepakket wordt samengesteld.",
        )
        self.assertGreater(
            names.index("Normaliseer mermaid-diagrammen in snapshot"),
            names.index("Generate HTML snapshot"),
            "Normaliseren kan pas nadat ReSpec de snapshot heeft gegenereerd.",
        )

    def test_normalizer_is_distributed_to_document_repositories(self) -> None:
        self.assertIn(
            '"workflows/normalize-mermaid-svg.mjs"',
            UPDATE_SCRIPT.read_text(encoding="utf-8"),
            "Zonder vermelding in MANAGED_FILES belandt het script niet in de documentrepositories.",
        )

    def test_duplicate_mermaid_ids_become_unique(self) -> None:
        result = normalize(FIXTURE)

        duplicates = [
            identifier
            for identifier, count in Counter(ID_ATTRIBUTE.findall(result)).items()
            if count > 1
        ]
        self.assertEqual([], duplicates, "vnu meldt dubbele id's als fout.")

    def test_references_follow_the_renamed_ids(self) -> None:
        result = normalize(FIXTURE)

        self.assertIn('<marker id="diagram-1-arrowhead">', result)
        self.assertIn('<marker id="diagram-2-arrowhead">', result)
        self.assertIn("url(#diagram-1-arrowhead)", result)
        self.assertIn("url(#diagram-2-arrowhead)", result)
        self.assertIn("#diagram-1 #diagram-1-arrowhead path", result)
        self.assertNotIn("url(#arrowhead)", result)

    def test_no_reference_is_left_dangling(self) -> None:
        result = normalize(FIXTURE)

        identifiers = set(ID_ATTRIBUTE.findall(result))
        references = set(re.findall(r"url\(#([^)]+)\)", result))
        references |= set(re.findall(r'(?:xlink:)?href="#([^"]+)"', result))

        self.assertEqual(set(), references - identifiers)

    def test_unique_ids_and_respec_anchors_are_left_alone(self) -> None:
        result = normalize(FIXTURE)

        # Deze id's zijn al uniek en mogen dus niet worden herschreven; anders
        # breken permalinks naar secties en figuren.
        self.assertIn('id="diagram-1"', result)
        self.assertIn('id="chart-title-diagram-1"', result)
        self.assertIn(
            'aria-labelledby="chart-title-diagram-1 chart-desc-diagram-1"', result
        )

    def test_invalid_mermaid_layout_attributes_are_removed(self) -> None:
        result = normalize(FIXTURE)

        self.assertNotIn("label-offset-y", result)

    def test_normalization_is_idempotent(self) -> None:
        once = normalize(FIXTURE)
        self.assertEqual(once, normalize(once))


if __name__ == "__main__":
    unittest.main()

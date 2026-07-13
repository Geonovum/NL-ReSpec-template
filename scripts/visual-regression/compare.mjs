import http from "node:http";
import { existsSync } from "node:fs";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

const MIME_TYPES = new Map([
  [".css", "text/css"],
  [".gif", "image/gif"],
  [".html", "text/html; charset=utf-8"],
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".js", "text/javascript"],
  [".json", "application/json"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain; charset=utf-8"],
  [".webp", "image/webp"],
]);

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 1200 },
  { name: "tablet", width: 1024, height: 1200 },
  { name: "mobile", width: 390, height: 1200 },
];

function parseArgs(argv) {
  const args = {};

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith("--")) {
      throw new Error(`Unexpected argument: ${arg}`);
    }

    const key = arg.slice(2);
    const value = argv[i + 1];
    if (!value || value.startsWith("--")) {
      throw new Error(`Missing value for --${key}`);
    }

    args[key] = value;
    i += 1;
  }

  return args;
}

function required(args, key) {
  if (!args[key]) {
    throw new Error(`Missing required argument --${key}`);
  }

  return args[key];
}

function normalizeRelativeUrl(value) {
  return value.replace(/^\/+/, "");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function startStaticServer(rootDir) {
  const root = path.resolve(rootDir);

  const server = http.createServer(async (request, response) => {
    try {
      const requestUrl = new URL(request.url ?? "/", "http://localhost");
      const relativePath = decodeURIComponent(requestUrl.pathname);
      let filePath = path.resolve(root, `.${relativePath}`);

      if (!filePath.startsWith(root)) {
        response.writeHead(403);
        response.end("Forbidden");
        return;
      }

      const fileStat = await stat(filePath);
      if (fileStat.isDirectory()) {
        filePath = path.join(filePath, "index.html");
      }

      const body = await readFile(filePath);
      const contentType = MIME_TYPES.get(path.extname(filePath)) ?? "application/octet-stream";
      response.writeHead(200, { "content-type": contentType });
      response.end(body);
    } catch {
      response.writeHead(404);
      response.end("Not found");
    }
  });

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });

  const address = server.address();
  return {
    url: `http://127.0.0.1:${address.port}`,
    close: () => new Promise((resolve) => server.close(resolve)),
  };
}

async function waitForStablePage(page, url) {
  await page.goto(url, { waitUntil: "networkidle", timeout: 90_000 });
  await page.evaluate(async () => {
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }
  });
  await page.waitForTimeout(500);
}

function padPng(source, width, height) {
  if (source.width === width && source.height === height) {
    return source;
  }

  const target = new PNG({ width, height, fill: true });
  PNG.bitblt(source, target, 0, 0, source.width, source.height, 0, 0);
  return target;
}

async function compareImages(basePath, headPath, diffPath) {
  const base = PNG.sync.read(await readFile(basePath));
  const head = PNG.sync.read(await readFile(headPath));
  const width = Math.max(base.width, head.width);
  const height = Math.max(base.height, head.height);
  const paddedBase = padPng(base, width, height);
  const paddedHead = padPng(head, width, height);
  const diff = new PNG({ width, height });
  const diffPixels = pixelmatch(
    paddedBase.data,
    paddedHead.data,
    diff.data,
    width,
    height,
    { threshold: 0.1 },
  );

  await writeFile(diffPath, PNG.sync.write(diff));

  return {
    diffPixels,
    totalPixels: width * height,
    ratio: diffPixels / (width * height),
    baseSize: `${base.width}x${base.height}`,
    headSize: `${head.width}x${head.height}`,
    comparedSize: `${width}x${height}`,
  };
}

async function writeReports(outDir, results, threshold, failOnDifference) {
  const changed = results.filter((result) => result.ratio > threshold);
  const summaryLines = [
    "# Visual regression",
    "",
    `Threshold: ${(threshold * 100).toFixed(2)}%`,
    `Fail on difference: ${failOnDifference}`,
    `Changed viewports: ${changed.length}/${results.length}`,
    "",
    "| viewport | difference | base | head |",
    "| --- | ---: | --- | --- |",
    ...results.map((result) => {
      const percentage = `${(result.ratio * 100).toFixed(3)}%`;
      return `| ${result.name} | ${percentage} | ${result.baseSize} | ${result.headSize} |`;
    }),
    "",
  ];

  const htmlRows = results.map((result) => `
    <section>
      <h2>${escapeHtml(result.name)} - ${(result.ratio * 100).toFixed(3)}%</h2>
      <p>Base: ${escapeHtml(result.baseSize)}. Head: ${escapeHtml(result.headSize)}.</p>
      <div class="grid">
        <figure><figcaption>Base</figcaption><img src="${escapeHtml(result.baseImage)}"></figure>
        <figure><figcaption>Head</figcaption><img src="${escapeHtml(result.headImage)}"></figure>
        <figure><figcaption>Diff</figcaption><img src="${escapeHtml(result.diffImage)}"></figure>
      </div>
    </section>
  `).join("\n");

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Visual regression report</title>
  <style>
    body { color: #17202a; font: 16px/1.5 system-ui, sans-serif; margin: 2rem; }
    h1, h2 { line-height: 1.2; }
    section { border-top: 1px solid #d8dee9; margin-top: 2rem; padding-top: 1rem; }
    .grid { display: grid; gap: 1rem; grid-template-columns: repeat(3, minmax(0, 1fr)); }
    figure { margin: 0; }
    figcaption { font-weight: 700; margin-bottom: .5rem; }
    img { border: 1px solid #d8dee9; max-width: 100%; }
  </style>
</head>
<body>
  <h1>Visual regression report</h1>
  <p>Changed viewports: ${changed.length}/${results.length}.</p>
  ${htmlRows}
</body>
</html>
`;

  await writeFile(path.join(outDir, "summary.md"), summaryLines.join("\n"));
  await writeFile(path.join(outDir, "report.html"), html);
  await writeFile(path.join(outDir, "results.json"), JSON.stringify(results, null, 2));
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const baseDir = path.resolve(required(args, "base-dir"));
  const headDir = path.resolve(required(args, "head-dir"));
  const outDir = path.resolve(required(args, "out-dir"));
  const pagePath = normalizeRelativeUrl(required(args, "path"));
  const threshold = Number(required(args, "threshold"));
  const failOnDifference = required(args, "fail-on-difference") === "true";

  if (!Number.isFinite(threshold) || threshold < 0 || threshold > 1) {
    throw new Error("--threshold must be a number between 0 and 1");
  }

  if (!existsSync(path.join(baseDir, pagePath))) {
    throw new Error(`Base page not found: ${path.join(baseDir, pagePath)}`);
  }

  if (!existsSync(path.join(headDir, pagePath))) {
    throw new Error(`Head page not found: ${path.join(headDir, pagePath)}`);
  }

  await mkdir(outDir, { recursive: true });

  const baseServer = await startStaticServer(baseDir);
  const headServer = await startStaticServer(headDir);
  const browser = await chromium.launch();
  const results = [];

  try {
    for (const viewport of VIEWPORTS) {
      const page = await browser.newPage({
        deviceScaleFactor: 1,
        viewport: { width: viewport.width, height: viewport.height },
      });

      const baseImage = `base-${viewport.name}.png`;
      const headImage = `head-${viewport.name}.png`;
      const diffImage = `diff-${viewport.name}.png`;

      await waitForStablePage(page, `${baseServer.url}/${pagePath}`);
      await page.screenshot({ fullPage: true, path: path.join(outDir, baseImage) });

      await waitForStablePage(page, `${headServer.url}/${pagePath}`);
      await page.screenshot({ fullPage: true, path: path.join(outDir, headImage) });

      await page.close();

      const comparison = await compareImages(
        path.join(outDir, baseImage),
        path.join(outDir, headImage),
        path.join(outDir, diffImage),
      );

      results.push({
        ...viewport,
        ...comparison,
        baseImage,
        headImage,
        diffImage,
        changed: comparison.ratio > threshold,
      });
    }
  } finally {
    await browser.close();
    await baseServer.close();
    await headServer.close();
  }

  await writeReports(outDir, results, threshold, failOnDifference);

  const changed = results.filter((result) => result.changed);
  for (const result of results) {
    console.log(`${result.name}: ${(result.ratio * 100).toFixed(3)}%`);
  }

  if (failOnDifference && changed.length > 0) {
    throw new Error(`${changed.length} viewport(s) exceeded the threshold`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

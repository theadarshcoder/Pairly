/**
 * check-bundle.mjs — Issue 19: CI check for audience bundle size.
 *
 * Fails if the audience entry chunk exceeds 100 kB gzipped.
 *
 * Usage: node scripts/check-bundle.mjs
 * Add to package.json: "check:bundle": "node scripts/check-bundle.mjs"
 */

import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { createReadStream } from 'node:fs';
import { createGzip } from 'node:zlib';

const DIST_DIR = join(process.cwd(), 'dist', 'assets');
const MAX_GZIP_BYTES = 100 * 1024; // 100 kB (audience hard limit)
const MAX_PRESENTER_GZIP_BYTES = 400 * 1024; // 400 kB (presenter warning limit)

async function getGzipSize(filePath) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const gzip = createGzip();
    const stream = createReadStream(filePath).pipe(gzip);
    stream.on('data', (chunk) => { size += chunk.length; });
    stream.on('end', () => resolve(size));
    stream.on('error', reject);
  });
}

async function main() {
  let files;
  try {
    files = await readdir(DIST_DIR);
  } catch {
    console.error('❌ dist/assets not found. Run `pnpm build` first.');
    process.exit(1);
  }

  // Find audience-related JS chunks (the join page entry)
  const jsFiles = files.filter((f) => f.endsWith('.js'));

  console.log('📦 Bundle size report:\n');

  let hasViolation = false;
  let hasPresenterWarning = false;

  for (const file of jsFiles) {
    const filePath = join(DIST_DIR, file);
    const rawStat = await stat(filePath);
    const gzipSize = await getGzipSize(filePath);
    const rawKB = (rawStat.size / 1024).toFixed(1);
    const gzipKB = (gzipSize / 1024).toFixed(1);

    const isPresenter = file.includes('presenter') || file.includes('Presenter') || file.includes('presenter-d3');
    const isDashboard = file.includes('dashboard') || file.includes('Dashboard');
    const isAudience = !isPresenter && !isDashboard && !file.includes('vendor-');

    let marker = '✅';
    if (isAudience && gzipSize > MAX_GZIP_BYTES) {
      marker = '❌';
      hasViolation = true;
    } else if (isPresenter && gzipSize > MAX_PRESENTER_GZIP_BYTES) {
      marker = '⚠️';
      hasPresenterWarning = true;
    }

    const label = isPresenter ? '[presenter]' : isDashboard ? '[dashboard]' : isAudience ? '[audience]' : '[vendor]';

    console.log(`  ${marker} ${label} ${file}  ${rawKB} kB raw / ${gzipKB} kB gzip`);
  }

  console.log('');

  if (hasPresenterWarning) {
    console.warn('⚠️ WARNING: Presenter chunk exceeds 400 kB gzipped advisory limit.');
  }

  if (hasViolation) {
    console.error('❌ FAIL: Audience chunk exceeds 100 kB gzipped limit.');
    console.error('   Check that D3, charting libs, and Framer layout features');
    console.error('   are not imported in the audience code path.');
    process.exit(1);
  } else {
    console.log('✅ All audience chunks within 100 kB gzipped budget.');
  }
}

main();

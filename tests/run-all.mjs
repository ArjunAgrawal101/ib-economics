/* Runs every suite in turn and fails if any of them fails. */
import { spawnSync } from 'node:child_process';
let failed = 0;
for (const s of ['selftest', 'e2e', 'pwa', 'widths', 'routes']) {
  console.log(`\n── ${s} ─────────────────────────────`);
  const r = spawnSync(process.execPath, [`${s}.mjs`], { stdio: 'inherit', cwd: new URL('.', import.meta.url).pathname });
  if (r.status !== 0) failed++;
}
console.log(failed ? `\n${failed} suite(s) failed` : '\nevery suite passed');
process.exitCode = failed ? 1 : 0;

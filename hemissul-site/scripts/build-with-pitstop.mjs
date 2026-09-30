import { execFileSync } from 'node:child_process';
import { cpSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const site = fileURLToPath(new URL('../', import.meta.url));
const pitstop = fileURLToPath(new URL('../../pitstop/', import.meta.url));
const run = (args, cwd, env = process.env) =>
  execFileSync('npm', args, { cwd, env, stdio: 'inherit' });

run(['run', 'build'], site);
run(['ci', '--no-audit', '--no-fund'], pitstop);
run(['run', 'build', '--', '--base=/pitstop/'], pitstop, {
  ...process.env,
  VITE_LEAD_ENDPOINT: process.env.VITE_LEAD_ENDPOINT || '/pitstop/api/lead',
  VITE_RANKING_ENDPOINT: process.env.VITE_RANKING_ENDPOINT || '/pitstop/api/ranking',
});
cpSync(new URL('../../pitstop/dist/', import.meta.url), new URL('../dist/pitstop/', import.meta.url), { recursive: true });

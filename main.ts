import { cp, mkdir, stat, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const sourceDirectory = fileURLToPath(new URL('.', import.meta.url));
const destination = resolve(process.env.MAKEFUN_OUTPUT_DIR || '/output');
const limits = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
};

if (destination === resolve(sourceDirectory) || destination === join(sourceDirectory, 'app') || destination.startsWith(join(sourceDirectory, 'app') + '/')) {
  throw new Error('Pilih direktori keluaran yang terpisah dari sumber aplikasi.');
}
for (const folder of ['app', 'screenshots']) {
  if (!(await stat(join(sourceDirectory, folder))).isDirectory()) throw new Error(`Direktori wajib tidak tersedia: ${folder}`);
}
await mkdir(destination, { recursive: true });
for (const folder of ['app', 'screenshots']) {
  await cp(join(sourceDirectory, folder), join(destination, folder), { recursive: true });
}
const dossier = buildDossier(destination, limits);
await writeFile(join(destination, 'dossier.json'), dossier);
console.log('DanaRumah siap:', destination);

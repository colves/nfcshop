import { cp, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// Publish the preview at main:/docs while retaining research notes.
const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const output = fileURLToPath(new URL('../docs/', import.meta.url));
await cp(dist, output, { recursive: true });
await writeFile(new URL('../docs/.nojekyll', import.meta.url), '');
console.log('GitHub Pages önizlemesi docs/ klasörüne hazırlandı.');

import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { productHtml, productPages } from './product-html.mjs';
const template = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
for (const [id, details] of Object.entries(productPages)) {
  const folder = new URL(`../dist/urun/${details.slug}/`, import.meta.url);
  await mkdir(folder, { recursive: true });
  await writeFile(new URL('index.html', folder), productHtml(template, id));
}
console.log('7 bağımsız ürün sayfası hazırlandı.');

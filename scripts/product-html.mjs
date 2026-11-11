import { products } from '../src/shop.js';
import { renderProductPage, productPages } from '../src/product-pages.js';

export function productHtml(template, id) {
  const p = products.find(p => p.id === id);
  return template.replace(/\r\n/g, '\n').replace(/<title>[^<]*<\/title>/, `<title>${p.name} — NFCShop Önizleme</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${p.description} Boyut, pleksi ve bağlantı seçeneklerini inceleyin. Satış henüz açık değildir." />`)
    .replace(/<main id="main">[\s\S]*?<\/main>/, `<main id="main">${renderProductPage(id)}</main>`)
    .replace(/<dialog id="product-dialog"[\s\S]*?<\/dialog>/, '')
    .replaceAll('href="#', 'href="../../#')
    .replaceAll('href="../../#secim"', 'href="#secim"')
    .replaceAll('href="../../#main"', 'href="#main"')
    .replaceAll('href="./', 'href="../../')
    .replaceAll('src="./', 'src="../../')
    .replace(/[ \t]+\n/g, '\n');
}
export { productPages };

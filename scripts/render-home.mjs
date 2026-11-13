import { googleCardImage } from '../src/google-card-assets.js';
import { renderCatalogCards } from '../src/catalog.js';

export function renderHome(html) {
  if (!html.includes('<!--home-product-photo-->')) return html;
  return html.replace('<!--home-product-photo-->', `<figure>${googleCardImage('hybrid','clear','./',{placement:'hero',priority:true})}<figcaption>Google yorum kartı <span>QR + NFC · Şeffaf pleksi</span></figcaption></figure>`)
    .replace('<div id="product-grid" class="product-grid"></div>', `<div id="product-grid" class="product-grid">${renderCatalogCards()}</div>`);
}

import { products } from './shop.js';
import { productPath } from './product-pages.js';
import { renderCardMedia } from './product-media.js';
import { icon } from './icons.js';
export function renderCatalogCards(filter = 'all', base = './') {
 const shown = products.filter(p => filter === 'all' || p.category === filter);
 return shown.map(p => `<article class="product-card"><a class="product-art art-${p.tone}" href="${productPath(p.id, base)}" aria-label="${p.name} seçeneklerini incele"><span class="art-badge">QR + NFC</span>${renderCardMedia(p, { base, placement: 'catalog' })}<span class="art-expand">${icon('plus')}</span></a><div class="product-info"><h3><a class="product-name" href="${productPath(p.id, base)}">${p.name}</a></h3><p>${p.description}</p><div class="product-price">Fiyat henüz girilmedi</div><div class="product-buttons"><a class="button outline" href="${productPath(p.id, base)}">Ürünü incele ${icon('arrow')}</a><button class="buy-button" disabled aria-label="${p.name} satın al — satış henüz açık değil">Satın al</button></div></div></article>`).join('');
}

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { products, makeSelection, addToCart, restoreCart, contactUrl, sizeLabels } from '../src/shop.js';
import { productPages, productPath, productIdFromPath } from '../src/product-pages.js';
import { productHtml } from '../scripts/product-html.mjs';

test('material choices stay distinct across navigation and corrupted saved carts are rejected', () => {
  let cart = addToCart([], makeSelection('google', { material:'clear', quantity:2 }));
  cart = addToCart(cart, makeSelection('google', { material:'white', quantity:3 }));
  assert.equal(cart.length,2);
  assert.deepEqual(restoreCart(JSON.stringify(cart)),cart);
  for (const bad of ['invalid', 'null', '{}', '[{"productId":"missing"}]', '[{"productId":"google","material":"wood"}]']) assert.deepEqual(restoreCart(bad),[]);
  assert.throws(()=>makeSelection('google',{size:'20x20'}));
  assert.throws(()=>makeSelection('google',{material:'wood'}));
});

test('sizes cover 5 through 15 cm and different sizes survive as distinct cart lines', () => {
  assert.equal(Object.keys(sizeLabels).length,11);
  for(let n=5;n<=15;n++) assert.equal(makeSelection('iban',{size:`${n}x${n}`}).size,`${n}x${n}`);
  let cart=addToCart([],makeSelection('iban',{size:'5x5',quantity:2}));
  cart=addToCart(cart,makeSelection('iban',{size:'15x15',quantity:3}));
  assert.equal(restoreCart(JSON.stringify(cart)).length,2);
  for(const size of ['4x4','16x16','5x15']) assert.throws(()=>makeSelection('iban',{size}));
});

test('each static product page is directly addressable, unique and has working nested assets', async () => {
  const template = await readFile(new URL('../index.html',import.meta.url),'utf8');
  assert.equal(new Set(Object.values(productPages).map(p=>p.slug)).size, products.length);
  for (const p of products) {
    const path = productPath(p.id, '/nfcshop/');
    assert.equal(productIdFromPath(path),p.id);
    assert.equal(productIdFromPath(`${path}index.html`),p.id);
    const html = productHtml(template,p.id);
    assert.equal((html.match(/id="product-detail"/g)||[]).length,1);
    assert.equal((html.match(/<h1[ >]/g)||[]).length,1);
    assert.ok(html.includes(`<title>${p.name}`));
    assert.ok(html.includes('src="../../src/main.js"'));
    assert.ok(html.includes('href="#main"'));
    assert.ok(html.includes('href="#secim"'));
    assert.ok(html.includes('noindex,nofollow'));
    assert.ok(!html.includes('id="hero-title"'));
    const realAssetPath = new URL('../../src/main.js',`https://colves.github.io${path}`).pathname;
    assert.equal(realAssetPath,'/nfcshop/src/main.js');
  }
});

test('WhatsApp handoff encodes the chosen service without transmitting a message', () => {
  const text = 'Menü · Beyaz pleksi · QR + NFC · 12 adet & tasarım';
  const url = new URL(contactUrl(text));
  assert.equal(url.hostname,'wa.me');
  assert.equal(url.pathname,'/905511956312');
  assert.equal(url.searchParams.get('text'),text);
});

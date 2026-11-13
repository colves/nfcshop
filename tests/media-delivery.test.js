import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access, stat } from 'node:fs/promises';
import { googleCardImage } from '../src/google-card-assets.js';
import { instagramCardImage } from '../src/instagram-card-assets.js';
import { renderHome } from '../scripts/render-home.mjs';
import { renderCatalogCards } from '../src/catalog.js';

test('all responsive candidates exist and nested image URLs stay inside the project',async()=>{
  for (const image of [googleCardImage,instagramCardImage]) for (const method of ['hybrid','nfc','qr']) {
    const html=image(method,'clear','../../',{placement:'thumbnail'});
    assert.ok(html.includes('loading="lazy"'));
    const srcset=html.match(/srcset="([^"]+)"/)[1].split(', ');
    assert.equal(srcset.length,5);
    for (const candidate of srcset) {
      const path=new URL(candidate.split(' ')[0],'https://colves.github.io/nfcshop/urun/google-yorum-karti/').pathname;
      assert.ok(path.startsWith('/nfcshop/images/'));
      await access(new URL(`../public${path.slice('/nfcshop'.length)}`,import.meta.url));
    }
    const original=srcset[4].split(' ')[0], small=srcset[1].split(' ')[0];
    const size=async path=>(await stat(new URL(`../public/${path.replace('../../','')}`,import.meta.url))).size;
    assert.ok(await size(small)<await size(original)*.25);
  }
});

test('initial HTML contains the hero and complete catalog before JavaScript runs',async()=>{
  const source=await readFile(new URL('../index.html',import.meta.url),'utf8');
  const html=renderHome(source);
  assert.equal((html.match(/class="product-card"/g)||[]).length,7);
  assert.equal((html.match(/fetchpriority="high"/g)||[]).length,1);
  assert.ok(html.includes('loading="eager"'));
  assert.ok(!html.includes('<!--home-product-photo-->'));
  assert.equal((renderCatalogCards('sosyal').match(/class="product-card"/g)||[]).length,2);
  assert.equal((renderCatalogCards('yorum').match(/class="product-card"/g)||[]).length,1);
  assert.equal((html.match(/class="buy-button" disabled/g)||[]).length,7);
});

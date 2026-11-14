import test from 'node:test';
import assert from 'node:assert/strict';
import { products, makeSelection, describeSelection, contactUrl } from '../src/shop.js';
import { renderProductPage } from '../src/product-pages.js';
import { renderCatalogCards } from '../src/catalog.js';
import { photoProductIds } from '../src/product-config.js';
import { ibanCardAsset } from '../src/iban-card-assets.js';

test('photo product pages deliver one primary photo with options already present',()=>{
  for (const p of products) {
    const html=renderProductPage(p.id);
    assert.equal((html.match(/id="selection-form"/g)||[]).length,1);
    assert.ok(html.includes('type="hidden" name="material" value="clear"'));
    assert.ok(!html.includes('type="radio" name="material"'));
    assert.ok(html.includes('QR bağlantı türü'));
    assert.ok(html.includes('id="selection-help"'));
    assert.ok(html.includes('class="button disabled-purchase" disabled'));
    if (photoProductIds.includes(p.id)) {
      assert.ok(!html.includes('google-hero-photo'));
      assert.equal((html.match(/fetchpriority="high"/g)||[]).length,1);
      assert.ok(html.indexOf('class="detail-content"')<html.indexOf('class="detail-media"'));
    }
    if (p.id==='google') assert.ok(!html.includes('google-card-gallery'));
  }
});

test('IBAN catalog and product presentation resolve to the same approved photo revision',()=>{
  const stem=ibanCardAsset().replace('./images/','').replace('.webp','');
  assert.ok(renderCatalogCards().includes(stem));
  assert.ok(renderProductPage('iban').includes(stem));
});

test('help handoff contains the current valid selection without sending anything',()=>{
  const selection=makeSelection('google',{size:'12x12',quantity:7,connection:'nfc',linkType:'dynamic'});
  const description=describeSelection(selection);
  for(const part of ['Google Yorum Kartı','12 × 12 cm','Şeffaf pleksi','3 mm','Yalnız NFC','Sabit bağlantı','7 adet']) assert.ok(description.includes(part));
  assert.ok(!description.includes('Değiştirilebilir'));
  const url=new URL(contactUrl(description));
  assert.equal(url.hostname,'wa.me');
  assert.equal(url.searchParams.get('text'),description);
  assert.throws(()=>describeSelection({...selection,quantity:0}));
});

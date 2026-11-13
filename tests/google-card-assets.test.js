import test from 'node:test';
import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import { googleCardAsset, googleCardGallery } from '../src/google-card-assets.js';

test('three clear product options resolve on home and nested pages; white is unavailable', async () => {
  const urls = new Set();
  for (const material of ['clear']) for (const connection of ['hybrid','nfc','qr']) {
    const path=googleCardAsset(connection,material,'./'); urls.add(path);
    await access(new URL(`../public/${path.slice(2)}`,import.meta.url));
    assert.equal(new URL(googleCardAsset(connection,material,'../../'),'https://colves.github.io/nfcshop/urun/google-yorum-karti/').pathname,`/nfcshop/${path.slice(2)}`);
  }
  assert.equal(urls.size,3);
  const gallery=googleCardGallery();
  assert.equal((gallery.match(/data-google-material=/g)||[]).length,3);
  assert.ok(!gallery.includes('Beyaz'));
  assert.equal((gallery.match(/aria-pressed="true"/g)||[]).length,1);
  assert.throws(()=>googleCardAsset('missing','white'));
  assert.throws(()=>googleCardAsset('hybrid','white'));
});

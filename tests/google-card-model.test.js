import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { googleCardModel, cardModel, cardTiltAt, installCardTilt } from '../src/card-model.js';
import { products } from '../src/shop.js';

test('model variants use existing approved vector faces, including nested product URLs', async () => {
  const backgrounds = new Set();
  for (const product of products) for (const material of ['clear', 'white']) for (const method of ['hybrid', 'nfc', 'qr']) {
    const html = cardModel(product.id,method,material,'../../');
    backgrounds.add(html.match(/class="card-model-background" src="([^"]+)"/)[1]);
    for (const [, src] of html.matchAll(/src="([^"]+)"/g)) {
      const path = new URL(src, 'https://colves.github.io/nfcshop/urun/google-yorum-karti/').pathname;
      assert.ok(path.startsWith('/nfcshop/images/'));
      await access(new URL(`../public${path.slice('/nfcshop'.length)}`, import.meta.url));
    }
    assert.ok(html.includes(`model-${material}`));
  }
  assert.equal(backgrounds.size,1);
  assert.throws(() => googleCardModel('bad'));
  for (const method of ['qr-nfc', 'nfc', 'qr']) {
    const face = await readFile(new URL(`../public/images/google/google-model-${method}.svg`, import.meta.url), 'utf8');
    assert.ok(!/<(?:script|image|text)\b|https?:\/\/(?!www.w3.org)/.test(face));
  }
});

test('tilt is centered and bounded, even for pointers outside the card or empty bounds', () => {
  const rect = { left: 100, top: 200, width: 400, height: 300 };
  const center = cardTiltAt(300,350,rect);
  assert.equal(Math.abs(center.x),0); assert.equal(center.y,0);
  assert.deepEqual(cardTiltAt(-999,9999,rect),{x:-5,y:-7});
  assert.deepEqual(cardTiltAt(9999,-9999,rect),{x:5,y:7});
  assert.deepEqual(cardTiltAt(1,1,{width:0,height:0}),{x:0,y:0});
});

test('only foreground tilts; pointer exit and motion preference changes reset pending work', () => {
  const events = {}, preferences = {}, callbacks = new Map(), values = new Map();
  let id = 0;
  const model = {style:{setProperty:(k,v)=>values.set(k,v),removeProperty:k=>values.delete(k)},classList:{add(){},remove(){}}};
  const stage = {isConnected:true,querySelector:()=>model,getBoundingClientRect:()=>({left:0,top:0,width:100,height:100}),contains:node=>node===stage};
  const root = {addEventListener:(type,cb)=>events[type]=cb};
  const environment = {
    matchMedia:query=>preferences[query]={matches:query.includes('hover'),addEventListener(type,cb){this.changed=cb;}},
    requestAnimationFrame:cb=>{callbacks.set(++id,cb);return id;},cancelAnimationFrame:id=>callbacks.delete(id),addEventListener(){}
  };
  installCardTilt(root,environment);
  const move = pointerType => events.pointermove({pointerType,target:{closest:()=>stage},clientX:100,clientY:0});
  move('touch'); assert.equal(callbacks.size,0);
  move('mouse'); move('mouse'); assert.equal(callbacks.size,1);
  const flush = () => { const pending=[...callbacks.values()];callbacks.clear();pending.forEach(cb=>cb()); };
  flush(); assert.equal(values.get('--card-tilt-y'),'7deg');
  events.pointerout({relatedTarget:stage}); assert.equal(values.size,2);
  events.pointerout({relatedTarget:null}); assert.equal(values.size,0);
  move('mouse');
  const reduced=preferences['(prefers-reduced-motion: reduce)']; reduced.matches=true;reduced.changed();
  assert.equal(callbacks.size,0); move('mouse'); assert.equal(callbacks.size,0);
});

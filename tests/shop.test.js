import test from 'node:test';
import assert from 'node:assert/strict';
import { products, makeSelection, addToCart, changeQuantity, requiresQuote, isSafeUrl, connectionNote } from '../src/shop.js';

test('connection guidance distinguishes rewritable NFC from printed QR', () => {
  assert.match(connectionNote('nfc', 'static'), /fiziksel/);
  assert.doesNotMatch(connectionNote('nfc', 'static'), /Basılı QR/);
  assert.match(connectionNote('qr', 'static'), /Basılı QR/);
  assert.match(connectionNote('hybrid', 'dynamic'), /talebiniz/);
});

test('preview catalog never exposes a buyable or invented price', () => {
  assert.equal(products.length, 7);
  assert.ok(products.every(p => p.price === null));
  assert.ok(products.every(p => !['wifi', 'kartvizit'].includes(p.id)));
});
test('different connection types remain separate cart lines; identical choices merge', () => {
  const first = makeSelection('google', { connection: 'hybrid', linkType: 'dynamic', quantity: 2 });
  let cart = addToCart([], first);
  cart = addToCart(cart, first);
  assert.equal(cart[0].quantity, 4);
  cart = addToCart(cart, makeSelection('google', { connection: 'qr', quantity: 1 }));
  assert.equal(cart.length, 2);
});
test('invalid quantities and product options cannot enter cart', () => {
  for (const quantity of [0, -1, 1.5, NaN, 1001]) assert.throws(() => makeSelection('google', { quantity }));
  assert.throws(() => makeSelection('missing'));
  assert.throws(() => makeSelection('google', { connection: 'invalid' }));
  assert.throws(() => makeSelection('google', { linkType: 'invalid' }));
});
test('menu design requires a quote but existing link and PDF do not', () => {
  assert.equal(requiresQuote(makeSelection('menu', { menuType: 'design-pdf' })), true);
  assert.equal(requiresQuote(makeSelection('menu', { menuType: 'design-web' })), true);
  assert.equal(requiresQuote(makeSelection('menu', { menuType: 'pdf' })), false);
  assert.equal(requiresQuote(makeSelection('menu', { menuType: 'link' })), false);
});
test('unsafe link protocols are rejected', () => {
  assert.equal(isSafeUrl('https://example.com/menu'), true);
  for (const url of ['javascript:alert(1)', 'data:text/html,x', 'file:///etc/passwd', 'not a link', 'https://u:p@example.com']) assert.equal(isSafeUrl(url), false);
});
test('cart quantity edits preserve immutability and bounds', () => {
  const cart = addToCart([], makeSelection('google', { quantity: 1 }));
  assert.equal(changeQuantity(cart, cart[0].key, 3)[0].quantity, 3);
  assert.equal(cart[0].quantity, 1);
  assert.throws(() => changeQuantity(cart, cart[0].key, 0));
});

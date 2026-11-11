import '@fontsource-variable/manrope';
import './readability.css';
import './product-pages.css';
import './service-themes.css';
import { productPages, productPath, productIdFromPath } from './product-pages.js';
import QRCode from 'qrcode';
import { products, makeSelection, addToCart, changeQuantity, requiresQuote, connectionLabels, linkLabels, menuLabels, connectionNote, sizeLabels, materialLabels, contactUrl, restoreCart } from './shop.js';

const paths = {
  arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
  'arrow-down': '<path d="M12 5v14m-5-5 5 5 5-5"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  bag: '<path d="M5 7h14l1 14H4L5 7Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  square: '<rect x="4" y="4" width="16" height="16" rx="3"/>',
  layers: '<path d="m12 3 10 5-10 5L2 8l10-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/>',
  corner: '<path d="M5 20V10a5 5 0 0 1 5-5h10"/>',
  attach: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="m5 19 14-14M4 13l9 7M11 4l9 7"/>',
  link: '<path d="m10 13 4-4m-6 6-1 1a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0m2 2 1-1a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0" transform="translate(1 1)"/>',
  tap: '<path d="M9 19v-8a2 2 0 0 1 4 0v4-2a2 2 0 0 1 3-1l3 2v3l-2 5H9l-5-6a2 2 0 0 1 3-2l2 2M5 9a7 7 0 0 1 12-4M2 7A10 10 0 0 1 20 3"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v1"/>',
  refresh: '<path d="M20 8a8 8 0 0 0-14-3L3 8m0-5v5h5M4 16a8 8 0 0 0 14 3l3-3m0 5v-5h-5"/>',
  message: '<path d="M21 11a9 9 0 0 1-9 9 10 10 0 0 1-4-1l-5 2 1-5a9 9 0 1 1 17-5Z"/><path d="M8 8c1 4 3 6 7 7l1-2-3-1-1 1-2-2 1-1-1-3-2 1Z"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01" stroke-width="3"/>',
  globe: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
  bank: '<path d="m3 9 9-6 9 6H3Zm2 3v7m5-7v7m4-7v7m5-7v7M2 22h20"/>',
  home: '<path d="m3 10 9-7 9 7v11H3V10Z"/><path d="M9 21v-8h6v8"/>',
  file: '<path d="M5 3h9l5 5v13H5V3Z"/><path d="M14 3v6h5M8 13h8m-8 4h6"/>',
  pen: '<path d="m4 16-1 5 5-1L21 7l-4-4L4 16Zm10-10 4 4"/>',
  qr: '<path d="M3 3h6v6H3V3Zm12 0h6v6h-6V3ZM3 15h6v6H3v-6Zm12 0h2v2h-2Zm4 0h2v6h-4v-2h-2v2h-3v-6m0-12v9H3m18 0h-6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  trash: '<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7"/>',
  shield: '<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z"/><path d="m8 12 3 3 5-6"/>',
};
const icon = (name, cls = '') => `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.square}</svg>`;
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const hydrate = (root = document) => root.querySelectorAll('[data-icon]').forEach(el => { el.innerHTML = icon(el.dataset.icon); });
const qrSvg = await QRCode.toString('https://example.org', { type: 'svg', margin: 1, width: 100, color: { dark: '#18221d', light: '#ffffff' } });
const pageProduct = productIdFromPath(location.pathname);
const homeBase = pageProduct ? '../../' : './';
let cart = [];
try { cart = restoreCart(sessionStorage.getItem('nfc-preview-cart')); } catch {}
function saveCart() { try { sessionStorage.setItem('nfc-preview-cart', JSON.stringify(cart)); } catch {} }
let toastTimer;
let activeFilter = 'all';

function productMark(p) {
  return p.symbol === 'G' ? '<span class="google-mark">G</span>' : icon(p.symbol);
}
function cardMockup(p, { connection = 'hybrid', material = 'clear', className = '' } = {}) {
  return `<div class="physical-card ${esc(p.tone)} material-${material} ${className}"><div class="card-platform">${productMark(p)}<span>${esc(p.label)}</span></div><div class="card-message"><strong>${esc(p.headline)}</strong><span>${esc(p.subtitle)}</span></div><div class="card-connect"><div class="card-qr ${connection === 'nfc' ? 'no-qr' : ''}">${connection === 'nfc' ? icon('tap') : qrSvg}</div><div class="card-connect-copy">${connection !== 'qr' ? '<span class="nfc-wave">)))</span><strong>Telefonunu yaklaştır</strong>' : '<strong>Kameranla okut</strong>'}<span>${connection === 'hybrid' ? 'veya QR kodu okut' : connection === 'nfc' ? 'NFC ile bağlantı kur' : 'bağlantıyı keşfet'}</span></div></div><div class="card-brand">nfcshop<span>•</span></div></div>`;
}
function notify(message) {
  const toast = document.querySelector('#toast');
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 3500);
}
function showDialog(id) {
  const dialog = document.getElementById(id);
  dialog.showModal();
  document.body.classList.add('dialog-open');
}
function renderCatalog() {
  const shown = products.filter(p => activeFilter === 'all' || p.category === activeFilter);
  document.querySelector('#catalog-count').textContent = `${shown.length} ürün`;
  document.querySelector('#product-grid').innerHTML = shown.map(p => `<article class="product-card"><a class="product-art art-${p.tone}" href="${productPath(p.id)}" aria-label="${p.name} seçeneklerini incele"><span class="art-badge">QR + NFC</span>${cardMockup(p)}<span class="art-expand">${icon('plus')}</span></a><div class="product-info"><div class="product-category">${p.category === 'yorum' ? 'MÜŞTERİ DENEYİMİ' : p.category === 'sosyal' ? 'SOSYAL BAĞLANTILAR' : 'İŞLETME ARAÇLARI'}</div><h3><a class="product-name" href="${productPath(p.id)}">${p.name}</a></h3><p>${p.description}</p><div class="product-meta"><span>5 × 5 – 15 × 15 cm · Şeffaf / beyaz</span><span>3 bağlantı seçeneği</span></div><div class="product-price">Fiyat henüz girilmedi</div><div class="product-buttons"><a class="button outline" href="${productPath(p.id)}">Ürünü incele ${icon('arrow')}</a><button class="buy-button" disabled aria-label="${p.name} satın al — satış henüz açık değil">Satın al</button></div></div></article>`).join('');
}
function openProduct(id, updateHash = true) {
  const p = products.find(p => p.id === id);
  if (!p) return;
  if (!pageProduct) { location.href = productPath(id, homeBase); return; }
  document.querySelector('#product-detail').innerHTML = `<div class="dialog-top product-dialog-heading"><span class="eyebrow">KARTINIZI ŞEKİLLENDİRİN</span><a class="text-link" href="../../#urunler">Tüm kartlar ${icon('arrow')}</a></div><div class="product-detail-grid"><div class="detail-media"><div class="detail-card-art art-${p.tone}" id="detail-card-art">${cardMockup(p)}</div><div class="detail-caption">Temsili tasarım · QR örnek bağlantıya gider</div><div class="detail-specs"><span>${icon('square')}<span data-selected-size>10 × 10 cm</span></span><span>${icon('layers')}2,8–3 mm pleksi</span><span>${icon('attach')}Çift taraflı bant</span><span>${icon('corner')}Yuvarlatılmış köşe</span></div></div><div class="detail-content"><h2 id="product-title">${p.name}</h2><p class="detail-description">${p.description}</p><p class="detail-price">Fiyat henüz girilmedi</p><form id="selection-form"><div class="physical-options"><label class="field-label" for="size">Boyut<select id="size" name="size">${Object.entries(sizeLabels).map(([v, label]) => `<option value="${v}" ${v === '10x10' ? 'selected' : ''}>${label}</option>`).join('')}</select></label><p class="field-note">5 × 5’ten 15 × 15 cm’ye kadar kare boyutlar. Görsel ölçeği temsilidir.</p><fieldset><legend>Pleksi seçimi</legend><div class="radio-cards material-options">${Object.entries(materialLabels).map(([v, label]) => `<label class="radio-card"><input type="radio" name="material" value="${v}" ${v === 'clear' ? 'checked' : ''}><span class="material-swatch swatch-${v}" aria-hidden="true"></span><span>${label}</span></label>`).join('')}</div></fieldset></div><fieldset><legend>1. Nasıl kullanılsın?</legend><div class="radio-cards">${Object.entries(connectionLabels).map(([value, label]) => `<label class="radio-card"><input type="radio" name="connection" value="${value}" ${value === 'hybrid' ? 'checked' : ''}><span>${label}</span></label>`).join('')}</div></fieldset><fieldset><legend>2. Bağlantı türü</legend><div class="radio-cards stacked"><label class="radio-card"><input type="radio" name="linkType" value="static" checked><span><strong>Sabit bağlantı</strong><small>Verdiğiniz adres doğrudan karta kaydedilir.</small></span></label><label class="radio-card"><input type="radio" name="linkType" value="dynamic"><span><strong>Değiştirilebilir bağlantı</strong><small>Kart aynı kalır, hedefi talebinizle güncelleriz.</small></span></label></div><p id="link-type-note" class="field-note">Basılı QR kodunun hedefi sonradan değiştirilemez.</p></fieldset>${p.id === 'menu' ? `<label class="field-label" for="menu-type">3. Menü ihtiyacınız</label><select id="menu-type" name="menuType">${Object.entries(menuLabels).map(([v, label]) => `<option value="${v}">${label}</option>`).join('')}</select><p id="menu-type-note" class="field-note">Menünüzün çalışan bağlantısı kullanılır.</p>` : ''}<div class="quantity-line"><label class="field-label" for="quantity">Adet</label><div class="quantity-control"><button type="button" data-quantity-step="-1" aria-label="Adedi azalt">${icon('minus')}</button><input id="quantity" name="quantity" type="number" inputmode="numeric" value="1" min="1" max="1000" step="1" required><button type="button" data-quantity-step="1" aria-label="Adedi artır">${icon('plus')}</button></div></div><p class="field-note">Toplu alım fiyatları henüz belirlenmedi.</p><p id="selection-error" class="error-message" role="alert"></p><div class="detail-actions"><button type="submit" id="selection-submit" class="button primary">Seçimi sepette incele ${icon('bag')}</button><button type="button" class="button disabled-purchase" disabled>Satın al</button></div><p class="preview-note">Önizleme: Bu seçim sipariş oluşturmaz. Bağlantı ve dosyalar satış açıldığında alınacaktır.</p></form><button class="custom-design" data-contact>${icon('pen')} Özel tasarım mı düşünüyorsunuz? ${icon('arrow')}</button></div></div>`;
  const form = document.querySelector('#selection-form');
  const summary = document.createElement('div');
  summary.className = 'selection-summary';
  summary.setAttribute('role', 'status');
  form.querySelector('.detail-actions').before(summary);
  const sync = () => {
    const values = new FormData(form);
    document.querySelector('#detail-card-art').innerHTML = cardMockup(p, { connection: values.get('connection'), material: values.get('material') });
    document.querySelector('#link-type-note').textContent = connectionNote(values.get('connection'), values.get('linkType'));
    document.querySelector('.detail-caption').textContent = `Temsili tasarım · ${sizeLabels[values.get('size')]} · ${materialLabels[values.get('material')]} · ${values.get('connection') === 'nfc' ? 'Yalnız NFC' : 'QR örnek bağlantıya gider'}`;
    document.querySelector('[data-selected-size]').textContent = sizeLabels[values.get('size')];
    const quantity = Number(values.get('quantity'));
    summary.textContent = `${sizeLabels[values.get('size')]} · ${materialLabels[values.get('material')]} · ${connectionLabels[values.get('connection')]} · ${linkLabels[values.get('linkType')]} · ${Number.isInteger(quantity) && quantity > 0 && quantity <= 1000 ? `${quantity} adet` : 'Adedi kontrol edin'}`;
    const menuType = values.get('menuType') || 'link';
    if (p.id === 'menu') {
      document.querySelector('#menu-type-note').textContent = { link: 'Menünüzün çalışan bağlantısı kullanılır.', pdf: 'Hazır PDF dosyanızı satış açıldığında iletebilirsiniz. Bu önizlemede dosya yüklenmez.', 'design-pdf': 'Önce WhatsApp üzerinden kapsam ve teklif; ardından ödeme, PDF tasarımı ve onay.', 'design-web': 'Önce WhatsApp üzerinden kapsam ve teklif; ardından ödeme, web menüsü ve onay.' }[menuType];
    }
    const quote = ['design-pdf', 'design-web'].includes(menuType);
    document.querySelector('#selection-submit').innerHTML = quote ? `WhatsApp ile teklif al ${icon('message')}` : `Seçimi sepette incele ${icon('bag')}`;
  };
  form.addEventListener('change', sync);
  form.addEventListener('input', sync);
  sync();
  form.addEventListener('submit', e => {
    e.preventDefault();
    try {
      const values = new FormData(form);
      const selection = makeSelection(p.id, { connection: values.get('connection'), linkType: values.get('linkType'), quantity: Number(values.get('quantity')), size: values.get('size'), material: values.get('material'), menuType: values.get('menuType') || 'link' });
      if (requiresQuote(selection)) { openContact(`${p.name} · ${menuLabels[selection.menuType]} · ${sizeLabels[selection.size]} · ${materialLabels[selection.material]} · ${connectionLabels[selection.connection]} · ${linkLabels[selection.linkType]} · ${selection.quantity} adet`); return; }
      cart = addToCart(cart, selection);
      document.querySelector('#cart-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
      document.querySelector('#selection-error').textContent = '';
      renderCart();
      showDialog('cart-dialog');
      notify('Seçiminiz önizleme sepetine eklendi.');
    } catch (error) { document.querySelector('#selection-error').textContent = error.message; }
  });
  form.querySelectorAll('[data-quantity-step]').forEach(button => button.addEventListener('click', () => {
    const input = form.querySelector('#quantity');
    input.value = Math.min(1000, Math.max(1, (Number(input.value) || 1) + Number(button.dataset.quantityStep)));
    sync();
  }));
  document.querySelectorAll('[data-menu-choice]').forEach(button => button.addEventListener('click', () => {
    form.elements.menuType.value = button.dataset.menuChoice;
    sync();
    document.querySelector('#secim').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    form.elements.menuType.focus({ preventScroll: true });
  }));
}
function renderCart() {
  saveCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelector('#cart-count').textContent = count;
  document.querySelector('#cart-title-count').textContent = count ? `(${count})` : '';
  const content = document.querySelector('#cart-content');
  if (!cart.length) {
    content.innerHTML = `<div class="empty-cart"><span>${icon('bag')}</span><h3>İlk kartınızla başlayalım.</h3><p>Henüz bir ürün seçmediniz. Kartları inceleyip seçeneklerinizi burada görebilirsiniz.</p><button class="button primary" data-close>Ürünleri keşfedin ${icon('arrow')}</button></div>`;
    return;
  }
  content.innerHTML = `<p class="cart-preview-note">Bu bir önizleme sepetidir; sipariş veya ödeme oluşturmaz.</p><div class="cart-items">${cart.map(item => {
    const p = products.find(p => p.id === item.productId);
    return `<article class="cart-item"><div class="cart-thumb art-${p.tone}">${productMark(p)}</div><div class="cart-item-info"><h3>${p.name}</h3><p>${sizeLabels[item.size]} · ${materialLabels[item.material]}</p><p>${connectionLabels[item.connection]} · ${linkLabels[item.linkType]}</p>${item.menuType ? `<p>${menuLabels[item.menuType]}</p>` : ''}<span class="cart-item-price">Fiyat henüz girilmedi</span><div class="cart-item-actions"><label>Adet <input type="number" min="1" max="1000" step="1" value="${item.quantity}" data-cart-quantity="${item.key}" aria-label="${p.name} adedi"></label><button class="remove-item" data-remove="${item.key}" aria-label="${p.name} sepetten kaldır">${icon('trash')} Kaldır</button></div></div></article>`;
  }).join('')}</div><div class="cart-summary"><div><span>Ürün toplamı</span><strong>Fiyat henüz girilmedi</strong></div><div><span>Kargo</span><span>Henüz belirlenmedi</span></div><p>Fiyatlar, kargo ve toplu alım koşulları satış açılmadan önce açıklanacaktır.</p><button class="button disabled-purchase" disabled>Satın al · Satış henüz açık değil ${icon('shield')}</button></div><button class="button outline continue-shopping" data-close>Ürünleri incelemeye devam et</button>`;
  content.querySelectorAll('[data-remove]').forEach(button => button.addEventListener('click', () => { cart = cart.filter(item => item.key !== button.dataset.remove); renderCart(); notify('Ürün sepetten kaldırıldı.'); }));
  content.querySelectorAll('[data-cart-quantity]').forEach(input => input.addEventListener('change', () => {
    try { cart = changeQuantity(cart, input.dataset.cartQuantity, Number(input.value)); renderCart(); }
    catch (error) { input.value = cart.find(item => item.key === input.dataset.cartQuantity).quantity; notify(error.message); }
  }));
}
function openContact(selection = '') {
  document.querySelector('#whatsapp-link').href = contactUrl(selection ? `Merhaba, şu seçim için bilgi ve teklif almak istiyorum: ${selection}` : '');
  document.querySelector('#contact-selection').textContent = selection;
  document.querySelector('#contact-selection').hidden = !selection;
  if (!document.querySelector('#contact-dialog').open) showDialog('contact-dialog');
}
if (!pageProduct) {
document.querySelector('#hero-card-front').innerHTML = cardMockup(products[0]);
document.querySelector('#hero-card-back').innerHTML = cardMockup(products[1]);
renderCatalog();
document.querySelector('#baglanti').insertAdjacentHTML('beforeend', `<div class="connection-demo"><div class="demo-intro"><span class="eyebrow">KÜÇÜK BİR ÖRNEK</span><h3>Kart aynı. Hedef farklı.</h3><p>Bir hedef seçerek değiştirilebilir bağlantının mantığını görün.</p></div><div class="demo-route"><div class="demo-source">${icon('qr')}<span>Kartınızdaki<br><strong>sabit adres</strong></span></div><span class="demo-arrow">${icon('arrow')}</span><div id="demo-destination" class="demo-destination" role="status">${icon('globe')}<span>Google<br><strong>Yorum sayfanız</strong></span></div></div><div class="demo-buttons" role="group" aria-label="Örnek bağlantı hedefi"><button class="active" data-demo-target="google" aria-pressed="true">Google yorum</button><button data-demo-target="instagram" aria-pressed="false">Instagram</button><button data-demo-target="menu" aria-pressed="false">Dijital menü</button></div><p class="demo-footnote">Etkileşimli anlatım örneğidir. Gerçek kart bağlantısı değiştirilmez.</p></div>`);
document.querySelectorAll('[data-demo-target]').forEach(button => button.addEventListener('click', () => {
  const target = {google: ['globe', 'Google', 'Yorum sayfanız'], instagram: ['instagram', 'Instagram', 'İşletme profiliniz'], menu: ['menu', 'Dijital menü', 'Menü sayfanız']}[button.dataset.demoTarget];
  document.querySelector('#demo-destination').innerHTML = `${icon(target[0])}<span>${target[1]}<br><strong>${target[2]}</strong></span>`;
  document.querySelectorAll('[data-demo-target]').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
}));
} else { openProduct(pageProduct, false); }
document.querySelector('#year').textContent = new Date().getFullYear();
renderCart();

hydrate();
document.addEventListener('click', e => {
  const productButton = e.target.closest('[data-product]');
  if (productButton) { location.href = productPath(productButton.dataset.product, homeBase); return; }
  const filter = e.target.closest('[data-filter]');
  if (filter) {
    activeFilter = filter.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(button => { button.classList.toggle('active', button === filter); button.setAttribute('aria-pressed', button === filter ? 'true' : 'false'); });
    renderCatalog();
    return;
  }
  if (e.target.closest('[data-contact]')) openContact();
  const copyButton = e.target.closest('[data-copy-demo]');
  if (copyButton) {
    const status = document.querySelector('[data-copy-status]');
    navigator.clipboard?.writeText('Örnek İşletme — Gerçek hesap bilgisi değildir.').then(() => { status.textContent = 'Örnek metin kopyalandı. Gerçek IBAN içermez.'; }).catch(() => { status.textContent = 'Kopyalama kullanılamıyor. Bu yalnızca bir gösterimdir.'; });
    if (!navigator.clipboard) status.textContent = 'Kopyalama bu tarayıcıda kullanılamıyor. Bu yalnızca bir gösterimdir.';
  }
  const closeButton = e.target.closest('[data-close]');
  if (closeButton) closeButton.closest('dialog').close();
});
document.querySelector('.cart-trigger').addEventListener('click', () => { renderCart(); showDialog('cart-dialog'); });
const mobileMenuButton = document.querySelector('.mobile-menu-button');
mobileMenuButton.addEventListener('click', () => {
  const menu = document.querySelector('#mobile-nav');
  menu.hidden = !menu.hidden;
  mobileMenuButton.setAttribute('aria-expanded', String(!menu.hidden));
  mobileMenuButton.setAttribute('aria-label', menu.hidden ? 'Menüyü aç' : 'Menüyü kapat');
});
document.querySelectorAll('#mobile-nav a').forEach(a => a.addEventListener('click', () => { document.querySelector('#mobile-nav').hidden = true; mobileMenuButton.setAttribute('aria-expanded', 'false'); mobileMenuButton.setAttribute('aria-label', 'Menüyü aç'); }));
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.addEventListener('click', e => {
    if (e.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    if (!document.querySelector('dialog[open]')) document.body.classList.remove('dialog-open');
    if (dialog.id === 'product-dialog' && location.hash.startsWith('#urun/')) history.replaceState(null, '', '#urunler');
  });
});
function routeProduct() {
  if (!pageProduct && location.hash.startsWith('#urun/')) {
    const id = location.hash.slice(6);
    if (products.some(p => p.id === id)) location.replace(productPath(id));
  }
}
window.addEventListener('hashchange', routeProduct);
routeProduct();

import { renderCardMedia, productMark } from './product-media.js';
import { renderCatalogCards } from './catalog.js';
import { icon } from './icons.js';
import '@fontsource-variable/manrope';
import './readability.css';
import './product-pages.css';
import './service-themes.css';
import './product-calm.css';
import './google-card-assets.css';
import './media-layout.css';
import './interaction-feedback.css';
import { animateFeedback, revealFeedback } from './interaction-feedback.js';
import { googleCardImage, googleCardGallery } from './google-card-assets.js';
import { instagramCardGallery } from './instagram-card-assets.js';
import { productPages, productPath, productIdFromPath } from './product-pages.js';
import { products, makeSelection, addToCart, changeQuantity, requiresQuote, connectionLabels, linkLabels, menuLabels, connectionNote, sizeLabels, materialLabels, contactUrl, restoreCart } from './shop.js';


const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const hydrate = (root = document) => root.querySelectorAll('[data-icon]').forEach(el => { el.innerHTML = icon(el.dataset.icon); });
const pageProduct = productIdFromPath(location.pathname);
const homeBase = pageProduct ? '../../' : './';
let cart = [];
try { cart = restoreCart(sessionStorage.getItem('nfc-preview-cart')); } catch {}
function saveCart() { try { sessionStorage.setItem('nfc-preview-cart', JSON.stringify(cart)); } catch {} }
let toastTimer;
let activeFilter = 'all';

const cardMockup = (p, options = {}) => renderCardMedia(p, { base: homeBase, ...options });

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
  animateFeedback(dialog, [{ opacity: 0, transform: 'translateY(4px)' }, { opacity: 1, transform: 'translateY(0)' }], 160);
}
function renderCatalog() {
  const shown = products.filter(p => activeFilter === 'all' || p.category === activeFilter);
  document.querySelector('#catalog-count').textContent = `${shown.length} ürün`;
  document.querySelector('#product-grid').innerHTML = renderCatalogCards(activeFilter);
}
function openProduct(id, updateHash = true) {
  const p = products.find(p => p.id === id);
  if (!p) return;
  if (!pageProduct) { location.href = productPath(id, homeBase); return; }
  document.querySelector('#product-detail').innerHTML = `<div class="dialog-top product-dialog-heading"><span class="eyebrow">KARTINIZI ŞEKİLLENDİRİN</span><a class="text-link" href="../../#urunler">Tüm kartlar ${icon('arrow')}</a></div><div class="product-detail-grid"><div class="detail-media"><div class="detail-card-art art-${p.tone}" id="detail-card-art">${cardMockup(p)}</div><div class="detail-caption">Temsili tasarım · QR örnek bağlantıya gider</div><div class="detail-specs"><span>${icon('square')}<span data-selected-size>10 × 10 cm</span></span><span>${icon('layers')}3 mm pleksi</span><span>${icon('attach')}Çift taraflı bant</span><span>${icon('corner')}Yuvarlatılmış köşe</span></div></div><div class="detail-content"><h2 id="product-title">${p.name}</h2><p class="detail-price">Fiyat henüz girilmedi</p><form id="selection-form"><div class="physical-options"><label class="field-label" for="size">Boyut<select id="size" name="size">${Object.entries(sizeLabels).map(([v, label]) => `<option value="${v}" ${v === '10x10' ? 'selected' : ''}>${label}</option>`).join('')}</select></label><fieldset><legend>Malzeme</legend><div class="radio-cards material-options">${Object.entries(materialLabels).map(([v, label]) => `<label class="radio-card"><input type="radio" name="material" value="${v}" ${v === 'clear' ? 'checked' : ''}><span class="material-swatch swatch-${v}" aria-hidden="true"></span><span>${label}</span></label>`).join('')}</div></fieldset></div><section class="connection-options" aria-labelledby="connection-options-title"><div class="connection-options-heading"><h3 id="connection-options-title">Bağlantı seçenekleri</h3><small id="connection-summary">QR + NFC · Sabit bağlantı</small></div><div class="connection-options-body"><fieldset><legend>Okutma yöntemi</legend><div class="radio-cards">${Object.entries(connectionLabels).map(([value, label]) => `<label class="radio-card"><input type="radio" name="connection" value="${value}" ${value === 'hybrid' ? 'checked' : ''}><span>${label}</span></label>`).join('')}</div></fieldset><fieldset><legend>Bağlantı türü</legend><div class="radio-cards stacked"><label class="radio-card"><input type="radio" name="linkType" value="static" checked><span><strong>Sabit bağlantı</strong><small>Verdiğiniz adres doğrudan karta kaydedilir.</small></span></label><label class="radio-card"><input type="radio" name="linkType" value="dynamic"><span><strong>Değiştirilebilir bağlantı</strong><small>Kart aynı kalır, hedefi talebinizle güncelleriz.</small></span></label></div><p id="link-type-note" class="field-note">Basılı QR kodunun hedefi sonradan değiştirilemez.</p></fieldset></div></section>${p.id === 'menu' ? `<label class="field-label" for="menu-type">Menü hizmeti</label><select id="menu-type" name="menuType">${Object.entries(menuLabels).map(([v, label]) => `<option value="${v}">${label}</option>`).join('')}</select><p id="menu-type-note" class="field-note">Menünüzün çalışan bağlantısı kullanılır.</p>` : ''}<div class="quantity-line"><label class="field-label" for="quantity">Adet</label><div class="quantity-control"><button type="button" data-quantity-step="-1" aria-label="Adedi azalt">${icon('minus')}</button><input id="quantity" name="quantity" type="number" inputmode="numeric" value="1" min="1" max="1000" step="1" required><button type="button" data-quantity-step="1" aria-label="Adedi artır">${icon('plus')}</button></div></div><p id="selection-error" class="error-message" role="alert"></p><div class="detail-actions"><button type="submit" id="selection-submit" class="button primary">Seçimi sepette incele ${icon('bag')}</button><button type="button" class="button disabled-purchase" disabled>Satın al</button></div><p class="preview-note">Önizleme sepetidir; sipariş veya ödeme oluşturmaz.</p></form></div></div>`;
  if (['google','instagram'].includes(p.id)) {
    const root = document.querySelector('#product-detail');
    root.classList.add('photo-product-config');
    root.querySelector('.detail-media').before(root.querySelector('.detail-content'));
  }
  const form = document.querySelector('#selection-form');
  if (p.id === 'google') document.querySelector('.detail-media').insertAdjacentHTML('beforeend', googleCardGallery(homeBase));
  if (p.id === 'instagram') document.querySelector('.detail-media').insertAdjacentHTML('beforeend', instagramCardGallery(homeBase));
  const summary = document.createElement('div');
  summary.className = 'selection-summary';
  summary.setAttribute('role', 'status');
  form.querySelector('.detail-actions').before(summary);
  let visualKey = 'hybrid:clear';
  const sync = () => {
    const values = new FormData(form);
    const nextVisualKey = `${values.get('connection')}:${values.get('material')}`;
    if (nextVisualKey !== visualKey) {
      visualKey = nextVisualKey;
      const art = document.querySelector('#detail-card-art');
      art.innerHTML = cardMockup(p, { connection: values.get('connection'), material: values.get('material'), loading: 'eager' });
      const photo = art.querySelector('img');
      if (photo && !photo.complete) photo.addEventListener('load', () => { if (photo.isConnected) revealFeedback(photo); }, { once: true });
      else revealFeedback(photo || art.firstElementChild);
    }
    if (['google', 'instagram'].includes(p.id)) document.querySelectorAll('[data-google-material]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.googleMaterial === values.get('material') && button.dataset.googleConnection === values.get('connection')));
    });
    document.querySelector('#connection-summary').textContent = `${connectionLabels[values.get('connection')]} · ${linkLabels[values.get('linkType')]}`;
    document.querySelector('#link-type-note').textContent = connectionNote(values.get('connection'), values.get('linkType'));
    document.querySelector('.detail-caption').textContent = `Temsili ürün görünümü · Görsel ölçeği temsilidir.`;
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
  if (['google', 'instagram'].includes(p.id)) document.querySelectorAll('[data-google-material]').forEach(button => {
    button.addEventListener('click', () => {
      form.querySelector(`input[name="material"][value="${button.dataset.googleMaterial}"]`).checked = true;
      form.querySelector(`input[name="connection"][value="${button.dataset.googleConnection}"]`).checked = true;
      sync();
    });
  });
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
const homePhoto = document.querySelector('.hero-scene');
homePhoto.classList.add('hero-product-photo');
homePhoto.setAttribute('aria-label', 'Google yorum kartı ürün önizlemesi');
if (!homePhoto.querySelector('img')) homePhoto.innerHTML = `<figure>${googleCardImage('hybrid', 'clear', './', { placement: 'hero', priority: true })}<figcaption>Google yorum kartı <span>QR + NFC · Şeffaf pleksi</span></figcaption></figure>`;
if (!document.querySelector('#product-grid').children.length) renderCatalog();
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
document.querySelectorAll('details').forEach(details => details.addEventListener('toggle', () => {
  if (!details.open) return;
  const content = details.querySelector(':scope > .compact-menu-options, :scope > p');
  revealFeedback(content);
}));
function routeProduct() {
  if (!pageProduct && location.hash.startsWith('#urun/')) {
    const id = location.hash.slice(6);
    if (products.some(p => p.id === id)) location.replace(productPath(id));
  }
}
window.addEventListener('hashchange', routeProduct);
routeProduct();

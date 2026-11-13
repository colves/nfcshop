import { icon } from './icons.js';
import { googleCardImage } from './google-card-assets.js';
import { instagramCardImage } from './instagram-card-assets.js';
import { whatsappCardImage } from './whatsapp-card-assets.js';
import { listingCardImage } from './listing-card-assets.js';
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export function productMark(p) {
  return p.symbol === 'G' ? '<span class="google-mark">G</span>' : icon(p.symbol);
}
export function renderCardMedia(p, { connection = 'hybrid', material = 'clear', className = '', base = './', placement = 'detail', loading = 'lazy' } = {}) {
  if (p.id === 'google') return googleCardImage(connection, material, base, { placement, loading });
  if (p.id === 'instagram') return instagramCardImage(connection, material, base, { placement, loading });
  if (p.id === 'whatsapp') return whatsappCardImage(connection, material, base, { placement, loading });
  if (p.id === 'ilan') return listingCardImage(connection, material, base, { placement, loading });
  return `<div class="physical-card ${esc(p.tone)} material-${material} ${className}"><div class="card-platform">${productMark(p)}<span>${esc(p.label)}</span></div><div class="card-message"><strong>${esc(p.headline)}</strong><span>${esc(p.subtitle)}</span></div><div class="card-connect"><div class="card-qr ${connection === 'nfc' ? 'no-qr' : ''}">${connection === 'nfc' ? icon('tap') : `<img src="${base}images/preview-qr.svg" alt="Örnek QR kodu" width="100" height="100" loading="lazy">`}</div><div class="card-connect-copy">${connection !== 'qr' ? '<span class="nfc-wave">)))</span><strong>Telefonunu yaklaştır</strong>' : '<strong>Kameranla okut</strong>'}<span>${connection === 'hybrid' ? 'veya QR kodu okut' : connection === 'nfc' ? 'NFC ile bağlantı kur' : 'bağlantıyı keşfet'}</span></div></div><div class="card-brand">nfcshop<span>•</span></div></div>`;
}

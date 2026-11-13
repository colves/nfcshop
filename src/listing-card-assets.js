import { responsiveImage } from './responsive-image.js';
const methods = { hybrid: 'qr-nfc', nfc: 'nfc', qr: 'qr' };
const names = { hybrid: 'QR ve NFC', nfc: 'yalnız NFC', qr: 'yalnız QR' };

export function listingCardAsset(connection = 'hybrid', material = 'clear', base = './') {
  if (!methods[connection] || material !== 'clear') throw new Error('Geçersiz kart görseli seçimi');
  return `${base}images/sahibinden/sahibinden-seffaf-${methods[connection]}-v9.webp`;
}

export function listingCardImage(connection = 'hybrid', material = 'clear', base = './', options = {}) {
  return responsiveImage(listingCardAsset(connection, material, base), `Sahibinden ilan kartı, şeffaf pleksi, ${names[connection]}`, { ...options, className: 'google-product-image listing-product-image' });
}

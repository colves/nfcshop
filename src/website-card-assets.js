import { responsiveImage } from './responsive-image.js';
const methods = { hybrid: 'qr-nfc', nfc: 'nfc', qr: 'qr' };
const names = { hybrid: 'QR ve NFC', nfc: 'yalnız NFC', qr: 'yalnız QR' };

export function websiteCardAsset(connection = 'hybrid', material = 'clear', base = './') {
  if (!methods[connection] || material !== 'clear') throw new Error('Geçersiz kart görseli seçimi');
  return `${base}images/web/web-sitesi-seffaf-${methods[connection]}-v3.webp`;
}

export function websiteCardImage(connection = 'hybrid', material = 'clear', base = './', options = {}) {
  return responsiveImage(websiteCardAsset(connection, material, base), `Web sitesi kartı, şeffaf pleksi, ${names[connection]}`, { ...options, className: 'google-product-image website-product-image' });
}

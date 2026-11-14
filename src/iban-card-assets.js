import { responsiveImage } from './responsive-image.js';
const methods = { hybrid: 'qr-nfc', nfc: 'nfc', qr: 'qr' };
const names = { hybrid: 'QR ve NFC', nfc: 'yalnız NFC', qr: 'yalnız QR' };

export function ibanCardAsset(connection = 'hybrid', material = 'clear', base = './') {
  if (!methods[connection] || material !== 'clear') throw new Error('Geçersiz kart görseli seçimi');
  return `${base}images/iban/iban-seffaf-${methods[connection]}-v2.webp`;
}

export function ibanCardImage(connection = 'hybrid', material = 'clear', base = './', options = {}) {
  return responsiveImage(ibanCardAsset(connection, material, base), `IBAN kartı, şeffaf pleksi, ${names[connection]}`, { ...options, className: 'google-product-image iban-product-image' });
}

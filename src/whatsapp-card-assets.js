import { responsiveImage } from './responsive-image.js';
const methods = { hybrid: 'qr-nfc', nfc: 'nfc', qr: 'qr' };
const names = { hybrid: 'QR ve NFC', nfc: 'yalnız NFC', qr: 'yalnız QR' };

export function whatsappCardAsset(connection = 'hybrid', material = 'clear', base = './') {
  if (!methods[connection] || material !== 'clear') throw new Error('Geçersiz kart görseli seçimi');
  return `${base}images/whatsapp/whatsapp-seffaf-${methods[connection]}-v9.webp`;
}

export function whatsappCardImage(connection = 'hybrid', material = 'clear', base = './', options = {}) {
  return responsiveImage(whatsappCardAsset(connection, material, base), `WhatsApp kartı, şeffaf pleksi, ${names[connection]}`, { ...options, className: 'google-product-image whatsapp-product-image' });
}

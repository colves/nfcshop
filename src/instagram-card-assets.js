const methods = { hybrid: 'qr-nfc', nfc: 'nfc', qr: 'qr' };
const names = { hybrid: 'QR ve NFC', nfc: 'yalnız NFC', qr: 'yalnız QR' };

export function instagramCardAsset(connection = 'hybrid', material = 'clear', base = './') {
  if (!methods[connection] || material !== 'clear') throw new Error('Geçersiz kart görseli seçimi');
  return `${base}images/instagram/instagram-seffaf-${methods[connection]}-v7.webp`;
}

export function instagramCardImage(connection = 'hybrid', material = 'clear', base = './') {
  return `<img class="google-product-image instagram-product-image" src="${instagramCardAsset(connection, material, base)}" alt="Instagram kartı, şeffaf pleksi, ${names[connection]}" width="1254" height="1254" decoding="async">`;
}

export function instagramCardGallery(base = './') {
  return `<div class="google-card-gallery" role="group" aria-label="Instagram kartı görselleri">${Object.keys(methods).map(connection => `<button type="button" data-google-material="clear" data-google-connection="${connection}" aria-pressed="${connection === 'hybrid'}">${instagramCardImage(connection, 'clear', base)}<span>Şeffaf · ${names[connection]}</span></button>`).join('')}</div>`;
}

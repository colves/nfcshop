const methods = { hybrid: 'qr-nfc', nfc: 'nfc', qr: 'qr' };
const materials = { clear: 'seffaf', white: 'beyaz' };
const methodNames = { hybrid: 'QR ve NFC', nfc: 'yalnız NFC', qr: 'yalnız QR' };

export function googleCardAsset(connection = 'hybrid', material = 'clear', base = './') {
  if (!methods[connection] || !materials[material]) throw new Error('Geçersiz kart görseli seçimi');
  return `${base}images/google/google-yorum-${materials[material]}-${methods[connection]}.webp`;
}

export function googleCardImage(connection = 'hybrid', material = 'clear', base = './') {
  return `<img class="google-product-image" src="${googleCardAsset(connection, material, base)}" alt="Google yorum kartı, ${material === 'white' ? 'beyaz' : 'şeffaf'} pleksi, ${methodNames[connection]}" width="1254" height="1254" decoding="async">`;
}

export function googleCardGallery(base = './') {
  return `<div class="google-card-gallery" role="group" aria-label="Google yorum kartı görselleri">${Object.keys(materials).flatMap(material => Object.keys(methods).map(connection => `<button type="button" data-google-material="${material}" data-google-connection="${connection}" aria-pressed="${material === 'clear' && connection === 'hybrid'}">${googleCardImage(connection, material, base)}<span>${material === 'white' ? 'Beyaz' : 'Şeffaf'} · ${methodNames[connection]}</span></button>`)).join('')}</div>`;
}

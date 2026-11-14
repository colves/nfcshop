export const products = [
  { id: 'google', name: 'Google Yorum Kartı', category: 'yorum', label: 'Google', headline: 'Deneyiminizi paylaşın.', subtitle: 'Yorum bırakmak bir dokunuş uzakta.', description: 'Müşterilerinizi işletmenizin Google yorum sayfasına ulaştırın.', tone: 'google', price: null, symbol: 'G' },
  { id: 'instagram', name: 'Instagram Kartı', category: 'sosyal', label: 'Instagram', headline: 'Bizi takip edin.', subtitle: 'Yeni paylaşımlarımızda buluşalım.', description: 'İşletmenizin Instagram profilini kolayca paylaşın.', tone: 'instagram', price: null, symbol: 'instagram' },
  { id: 'whatsapp', name: 'WhatsApp Kartı', category: 'sosyal', label: 'WhatsApp', headline: 'Bir mesaj kadar yakın.', subtitle: 'Sorularınız için bize yazın.', description: 'Müşterilerinizin WhatsApp sohbetinize ulaşmasını kolaylaştırın.', tone: 'whatsapp', price: null, symbol: 'message' },
  { id: 'menu', name: 'Dijital Menü Kartı', category: 'isletme', label: 'Dijital menü', headline: 'Menümüze göz atın.', subtitle: 'Lezzetli bir başlangıç yapalım.', description: 'Hazır bağlantı, PDF veya size özel hazırlanan menünüzü paylaşın.', tone: 'menu', price: null, symbol: 'menu' },
  { id: 'web', name: 'İnternet Sitesi Kartı', category: 'isletme', label: 'Web sitesi', headline: 'Bizi keşfedin.', subtitle: 'İşletmemizle çevrim içi tanışın.', description: 'Ziyaretçilerinizi doğrudan internet sitenizle buluşturun.', tone: 'web', price: null, symbol: 'globe' },
  { id: 'iban', name: 'IBAN Paylaşım Kartı', category: 'isletme', label: 'IBAN', headline: 'Hesap bilgilerimiz.', subtitle: 'Bilgilere kolayca ulaşın.', description: 'Hesap adı ve IBAN bilginizi gösteren sayfaya erişim sağlayın.', tone: 'iban', price: null, symbol: 'bank' },
  { id: 'ilan', name: 'İlan Bağlantısı Kartı', category: 'isletme', label: 'İlanlar', headline: 'İlanlarımızı inceleyin.', subtitle: 'Detaylar bir dokunuş uzakta.', description: 'İlanınızı veya mağaza sayfanızı tek bağlantıyla paylaşın.', tone: 'ilan', price: null, symbol: 'home' },
];
export const connectionLabels = { hybrid: 'QR + NFC', nfc: 'Yalnız NFC', qr: 'Yalnız QR' };
export const linkLabels = { static: 'Sabit bağlantı', dynamic: 'Değiştirilebilir bağlantı' };
export function connectionNote(connection, linkType) {
  if (connection === 'nfc') return 'Yalnız NFC seçeneğinde sabit bağlantı kullanılır; bağlantı türü seçimi kapalıdır. Kilitlenmemiş NFC, karta fiziksel erişimle yeniden yazılabilir.';
  if (linkType === 'dynamic') return 'Kart değişmeden hedefi talebinizle güncelleriz. Hizmet süresi ve koşulları satış öncesinde açıklanacak.';
  return 'Basılı QR kodunun hedefi sonradan değiştirilemez. Değişiklik ihtiyacınız varsa değiştirilebilir bağlantıyı seçin.';
}
export const menuLabels = { link: 'Hazır menü bağlantım var', pdf: 'Hazır PDF menüm var', 'design-pdf': 'PDF menü hazırlatmak istiyorum', 'design-web': 'Web menüsü hazırlatmak istiyorum' };
export const sizeLabels = Object.fromEntries(Array.from({ length: 11 }, (_, i) => { const n = i + 5; return [`${n}x${n}`, `${n} × ${n} cm`]; }));
export const materialLabels = { clear: 'Şeffaf pleksi' };
export const whatsappNumber = '905511956312';
export function contactUrl(message = '') {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message || 'Merhaba, NFC ve QR kartlarınız hakkında bilgi almak istiyorum.')}`;
}
export function describeSelection(selection) {
  const item = makeSelection(selection.productId, selection);
  const product = products.find(p => p.id === item.productId);
  return [product.name, sizeLabels[item.size], `${materialLabels[item.material]} · 3 mm`, connectionLabels[item.connection], linkLabels[item.linkType], item.menuType ? menuLabels[item.menuType] : '', `${item.quantity} adet`].filter(Boolean).join(' · ');
}
export function validQuantity(n) { return Number.isInteger(n) && n >= 1 && n <= 1000; }
export function makeSelection(productId, options = {}) {
  const { connection = 'hybrid', linkType = 'static', quantity = 1, menuType = 'link', size = '10x10', material = 'clear' } = options;
  if (!products.some(p => p.id === productId) || !connectionLabels[connection] || !linkLabels[linkType] || !validQuantity(quantity) || (productId === 'menu' && !menuLabels[menuType])) throw new Error('Ürün seçeneklerini ve 1–1000 arasındaki adedi kontrol edin.');
  const actualMenuType = productId === 'menu' ? menuType : null;
  const actualLinkType = connection === 'nfc' ? 'static' : linkType;
  if (!sizeLabels[size] || !materialLabels[material]) throw new Error('Boyut ve pleksi seçimini kontrol edin.');
  return { productId, connection, linkType: actualLinkType, quantity, size, material, menuType: actualMenuType, key: [productId, size, material, connection, actualLinkType, actualMenuType || ''].join(':') };
}
export function restoreCart(value) {
  try {
    const records = JSON.parse(value);
    if (!Array.isArray(records) || records.length > 100) return [];
    return records.reduce((cart, record) => record?.material === 'white' ? cart : addToCart(cart, makeSelection(record.productId, record)), []);
  } catch { return []; }
}
export function addToCart(cart, selection) {
  const existing = cart.find(item => item.key === selection.key);
  if (!existing) return [...cart, { ...selection }];
  const quantity = existing.quantity + selection.quantity;
  if (!validQuantity(quantity)) throw new Error('Bir ürün seçimi için en fazla 1000 adet ekleyebilirsiniz.');
  return cart.map(item => item.key === selection.key ? { ...item, quantity } : item);
}
export function changeQuantity(cart, key, quantity) {
  if (!validQuantity(quantity)) throw new Error('Adet 1–1000 arasında tam sayı olmalı.');
  return cart.map(item => item.key === key ? { ...item, quantity } : item);
}
export function requiresQuote(selection) { return selection.productId === 'menu' && ['design-pdf', 'design-web'].includes(selection.menuType); }
export function isSafeUrl(value) {
  try { const u = new URL(value); return ['https:', 'http:'].includes(u.protocol) && !u.username && !u.password; } catch { return false; }
}

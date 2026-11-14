import { googleCardImage } from './google-card-assets.js';
import { instagramCardImage } from './instagram-card-assets.js';
import { whatsappCardImage } from './whatsapp-card-assets.js';
import { listingCardImage } from './listing-card-assets.js';
import { websiteCardImage } from './website-card-assets.js';
import { ibanCardImage } from './iban-card-assets.js';
const headline = d => `<span class="eyebrow">${d.eyebrow}</span><h1>${d.title.replace('\n','<br> ')}</h1><p class="service-lead">${d.lead}</p>`;
const cta = (label='Kartınızı şekillendirin') => `<a href="#secim" class="button primary">${label} <span aria-hidden="true">↓</span></a>`;
const caption = text => `<figcaption>${text}</figcaption>`;

export function renderServiceHero(p,d) {
  switch(p.id) {
    case 'google': return `<section class="service-hero review-hero container"><div class="review-intro">${headline(d)}${cta()}</div><figure class="google-hero-photo">${googleCardImage('hybrid','clear','../../', { placement: 'hero', priority: true })}${caption('Ürün tasarımı önizlemesi · Yıldızlar tasarım öğesidir; müşteri puanı değildir.')}</figure></section>`;
    case 'instagram': return `<section class="service-hero review-hero container"><div class="review-intro">${headline(d)}${cta('Profilinize açılan kartı seçin')}</div><figure class="google-hero-photo">${instagramCardImage('hybrid','clear','../../', { placement: 'hero', priority: true })}${caption('Ürün tasarımı önizlemesi · QR örnek bağlantıya gider. Takip etmek müşterinizin seçimidir.')}</figure></section>`;
    case 'whatsapp': return `<section class="service-hero review-hero container"><div class="review-intro">${headline(d)}${cta('İletişim kartınızı seçin')}</div><figure class="google-hero-photo">${whatsappCardImage('hybrid','clear','../../', { placement: 'hero', priority: true })}${caption('Ürün tasarımı önizlemesi · QR örnek bağlantıya gider. Mesaj kendiliğinden gönderilmez.')}</figure></section>`;
    case 'menu': return `<section class="restaurant-hero container"><div class="restaurant-intro">${headline(d)}${cta('Menü hizmetlerini keşfedin')}</div><figure class="restaurant-menu"><div class="menu-device"><div class="menu-device-top"><span>ÖRNEK KAFE</span><span aria-hidden="true">☰</span></div><h2>Güzel bir<br>mola.</h2><p class="menu-device-intro">Küçük molalara eşlik eden lezzetler.</p><div class="menu-category-label">KAHVELER</div><article><div><h3>Filtre kahve</h3><p>Günün çekirdeğiyle taze demlenir.</p></div><span>—</span></article><article><div><h3>Latte</h3><p>Espresso ve sıcak süt.</p></div><span>—</span></article><div class="menu-category-label">TATLILAR</div><article><div><h3>Günün tatlısı</h3><p>Bir fincan kahvenin yanına.</p></div><span>—</span></article><span class="menu-device-footer">TEMSİLİ MENÜ · SİPARİŞ ALINMAZ</span></div>${caption('Örnek mobil menü · Fiyatlar gösterilmemiştir.')}</figure></section>`;
    case 'iban': return `<section class="service-hero review-hero container"><div class="review-intro">${headline(d)}${cta('Hesap paylaşım kartını seçin')}<a href="../../ornek/iban/" class="finance-demo-button">Kopyalamayı örnek sayfada deneyin <span aria-hidden="true">↗</span></a></div><figure class="google-hero-photo">${ibanCardImage('hybrid','clear','../../', { placement: 'hero', priority: true })}${caption('Ürün tasarımı önizlemesi · QR örnek bağlantıya gider. Gerçek hesap bilgisi içermez.')}</figure></section>`;
    case 'web': return `<section class="service-hero review-hero container"><div class="review-intro">${headline(d)}${cta('Web bağlantı kartını seçin')}</div><figure class="google-hero-photo">${websiteCardImage('hybrid','clear','../../', { placement: 'hero', priority: true })}${caption('Ürün tasarımı önizlemesi · QR örnek bağlantıya gider. Site yapımı karta dahil değildir.')}</figure></section>`;
    case 'ilan': return `<section class="service-hero review-hero container"><div class="review-intro">${headline(d)}${cta('İlan kartınızı belirleyin')}</div><figure class="google-hero-photo">${listingCardImage('hybrid','clear','../../', { placement: 'hero', priority: true })}${caption('Ürün tasarımı önizlemesi · QR örnek bağlantıya gider.')}</figure></section>`;
    default: return '';
  }
}

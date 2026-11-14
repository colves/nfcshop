const headline = (d, id) => `<span class="eyebrow">${d.eyebrow}</span><h1>${d.title.replace('\n','<br> ')}</h1><p class="service-lead">${d.lead}</p>${productFacts[id] ? `<p class="service-fact">${productFacts[id]}</p>` : ''}`;
const productFacts = { google: 'Kart yorum sayfasını açar; kendiliğinden yorum veya puan eklemez.', instagram: 'Profil açılır; takip etmek müşterinizin tercihidir.', whatsapp: 'Sohbet açılır; mesaj kendiliğinden gönderilmez.', iban: 'Hesap bilgisi paylaşır; para transferi başlatmaz.', web: 'Mevcut sitenize yönlendirir. Site yapımı dahil değildir.', ilan: 'Görselde Sahibinden için hazırlanmış tasarım gösterilmektedir.' };
const cta = (label='Kartınızı şekillendirin') => `<a href="#secim" class="button primary">${label} <span aria-hidden="true">↓</span></a>`;
const caption = text => `<figcaption>${text}</figcaption>`;

export function renderServiceHero(p,d) {
  switch(p.id) {
    case 'google': return `<section class="service-hero review-hero photo-service-intro container"><div class="review-intro">${headline(d,p.id)}${cta()}</div></section>`;
    case 'instagram': return `<section class="service-hero review-hero photo-service-intro container"><div class="review-intro">${headline(d,p.id)}${cta('Profilinize açılan kartı seçin')}</div></section>`;
    case 'whatsapp': return `<section class="service-hero review-hero photo-service-intro container"><div class="review-intro">${headline(d,p.id)}${cta('İletişim kartınızı seçin')}</div></section>`;
    case 'menu': return `<section class="restaurant-hero container"><div class="restaurant-intro">${headline(d,p.id)}${cta('Menü hizmetlerini keşfedin')}</div><figure class="restaurant-menu"><div class="menu-device"><div class="menu-device-top"><span>ÖRNEK KAFE</span><span aria-hidden="true">☰</span></div><h2>Güzel bir<br>mola.</h2><p class="menu-device-intro">Küçük molalara eşlik eden lezzetler.</p><div class="menu-category-label">KAHVELER</div><article><div><h3>Filtre kahve</h3><p>Günün çekirdeğiyle taze demlenir.</p></div><span>—</span></article><article><div><h3>Latte</h3><p>Espresso ve sıcak süt.</p></div><span>—</span></article><div class="menu-category-label">TATLILAR</div><article><div><h3>Günün tatlısı</h3><p>Bir fincan kahvenin yanına.</p></div><span>—</span></article><span class="menu-device-footer">TEMSİLİ MENÜ · SİPARİŞ ALINMAZ</span></div>${caption('Örnek mobil menü · Fiyatlar gösterilmemiştir.')}</figure></section>`;
    case 'iban': return `<section class="service-hero review-hero photo-service-intro container"><div class="review-intro">${headline(d,p.id)}${cta('Hesap paylaşım kartını seçin')}<a href="../../ornek/iban/" class="finance-demo-button">Kopyalamayı örnek sayfada deneyin <span aria-hidden="true">↗</span></a></div></section>`;
    case 'web': return `<section class="service-hero review-hero photo-service-intro container"><div class="review-intro">${headline(d,p.id)}${cta('Web bağlantı kartını seçin')}</div></section>`;
    case 'ilan': return `<section class="service-hero review-hero photo-service-intro container"><div class="review-intro">${headline(d,p.id)}${cta('İlan kartınızı belirleyin')}</div></section>`;
    default: return '';
  }
}

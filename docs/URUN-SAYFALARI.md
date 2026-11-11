# Ürün sayfaları — uygulama kararları

11 Kasım 2026. Kullanıcının araştırma sonrası uygulama talebiyle mevcut önizleme genişletildi.

- Görsel yön: mevcut Manrope, yeşil vurgu, açık yüzeyler ve sakin tipografi korundu. Yeni marka/fotoğraf üretilmedi. Kaynaklar TASARIM-KARARLARI.md; son araştırmada NFCShop ürün/kategori ayrımı, menü hizmet sağlayıcılarının kapsam ayrımı ve Refero craft form/odak rehberi kullanıldı. Refero MCP araçları mevcut değildi.
- Her ürün `urun/{ürün-adı}/index.html` olarak üretilir. GitHub Pages üzerinde doğrudan açma/yenileme için sunucu yönlendirme kuralı gerekmez. Başlık, açıklama, hizmet adımları ve SSS ürün özeldir; ortak seçenek formu yeniden kullanılır.
- Menü: dört hizmet yolu, temsili mobil menü, kapsam açıklaması ve seçimi içeren WhatsApp taslağı. IBAN: gerçek numara içermeyen kopyalama demosu ve transferin bankada tamamlanması açıklaması.
- Aynı tasarım sistemi içinde Instagram, WhatsApp, web, yorum ve ilan için farklı yarar, kullanım bağlamı ve bağlantı sınırları anlatılır. Otomatik takip/yorum/ödeme iddiası yok.
- Boyutlar 5×5–15×15cm (1cm aralıkla), varsayılan 10×10; şeffaf/beyaz ayrı varyantlar. Sepet anahtarında boyut, malzeme, bağlantı ve hizmet bulunur; varyantlar yanlış birleştirilmez.
- Sepet sekme kapsamlı sessionStorage'da korunur. Kayıtlar yeniden doğrulanır, geçersiz veri atılır. Fiyat veya müşteri bilgisi kaydedilmez.
- Satın alma kapalı; fiyat, kargo, süre ve koşullar uydurulmaz. Nihai baskı/görseller ayrı çalışma.

## Derleme

`npm run build` Vite çıktısını, ardından yedi statik sayfayı üretir. `npm run build:pages` bunları docs klasörüne kopyalar. Geliştirme sunucusu aynı şablonu middleware ile sunar. Kaynak index.html ve src/product-pages.js; docs HTML'leri elle düzenlenmez.

## Kart türüne özel görsel tasarımlar

Kullanıcı yalnız içerik farkı değil, sayfa tasarımlarının da ürün türüne göre değişmesini istedi. Ortak marka/menü/seçim bileşenleri korunarak yedi ayrı sunum eklendi. Düzenler `src/service-visuals.js`, görsel kurallar `src/service-themes.css` içindedir.

| Kart | Yerleşim ve görsel anlatım |
|---|---|
| Google yorum | Yorum daveti, QR/NFC girişleri ve değerlendirme sayfasına giden dikey akış |
| Instagram | Ortalanmış açılış ve geniş editoryal profil vitrini; gerçek takipçi/istatistik yok |
| WhatsApp | İşletme sohbet başlığı ve iki yönlü temsili konuşma |
| Menü | Koyu restoran sunumu, mobil menü düzeni ve dört hizmet yolu |
| IBAN | Hesap dökümü, üç adımlı bilgi/transfer ayrımı ve bağımsız demo bağlantısı |
| Web | Üstte geniş başlık/aksiyon, altta tam genişlikte tarayıcı ve site vitrini |
| İlan | Tek ilan detay kartı ile mağaza/profil yolu bulunan ilan panosu |

Örnekler temsili ve açıkça etiketlidir. Gerçek yorum, profil istatistiği, müşteri hesabı, ilan veya sipariş üretilmez. Kullanıcı nihai fotoğrafları daha sonraya bıraktığından bu aşamada fotoğraf üretilmedi.

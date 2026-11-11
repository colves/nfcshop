# Ürün sayfaları — uygulama kararları

11 Kasım 2026. Kullanıcının araştırma sonrası uygulama talebiyle mevcut önizleme genişletildi.

- Görsel yön: mevcut Manrope, yeşil vurgu, açık yüzeyler ve sakin tipografi korundu. Yeni marka/fotoğraf üretilmedi. Kaynaklar TASARIM-KARARLARI.md; son araştırmada NFCShop ürün/kategori ayrımı, menü hizmet sağlayıcılarının kapsam ayrımı ve Refero craft form/odak rehberi kullanıldı. Refero MCP araçları mevcut değildi.
- Her ürün `urun/{ürün-adı}/index.html` olarak üretilir. GitHub Pages üzerinde doğrudan açma/yenileme için sunucu yönlendirme kuralı gerekmez. Başlık, açıklama, hizmet adımları ve SSS ürün özeldir; ortak seçenek formu yeniden kullanılır.
- Menü: dört hizmet yolu, temsili mobil menü, kapsam açıklaması ve seçimi içeren WhatsApp taslağı. IBAN: gerçek numara içermeyen kopyalama demosu ve transferin bankada tamamlanması açıklaması.
- Aynı tasarım sistemi içinde Instagram, WhatsApp, web, yorum ve ilan için farklı yarar, kullanım bağlamı ve bağlantı sınırları anlatılır. Otomatik takip/yorum/ödeme iddiası yok.
- Boyut yalnız doğrulanmış 10×10cm; şeffaf/beyaz ayrı varyantlar. Sepet anahtarında boyut, malzeme, bağlantı ve hizmet bulunur; varyantlar yanlış birleştirilmez.
- Sepet sekme kapsamlı sessionStorage'da korunur. Kayıtlar yeniden doğrulanır, geçersiz veri atılır. Fiyat veya müşteri bilgisi kaydedilmez.
- Satın alma kapalı; fiyat, kargo, süre ve koşullar uydurulmaz. Nihai baskı/görseller ayrı çalışma.

## Derleme

`npm run build` Vite çıktısını, ardından yedi statik sayfayı üretir. `npm run build:pages` bunları docs klasörüne kopyalar. Geliştirme sunucusu aynı şablonu middleware ile sunar. Kaynak index.html ve src/product-pages.js; docs HTML'leri elle düzenlenmez.

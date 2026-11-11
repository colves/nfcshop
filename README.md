# NFCShop

NFC ve QR kartları için Türkçe, mobil uyumlu **tasarım ve arayüz geliştirme önizlemesi**. Bu sürümde ticari işlem, sipariş veya ödeme alınmaz. GitHub Pages yayını yalnız tasarım çalışmasının incelenmesi içindir; canlı mağaza uygun başka bir altyapıya taşınmalıdır.

## Çalıştırma

Node.js 20.19+ veya 22.12+ gerekir.

```sh
npm ci
npm run dev
```

Yerel adres: http://127.0.0.1:5174/

```sh
npm test
npm run build
npm run build:pages
```

`build` çıktısı `dist/`, `build:pages` yayın kopyası `docs/` klasöründedir. GitHub Pages kaynağı **main /docs** olarak ayarlanır. Göreli dosya yolları `/nfcshop/` gibi alt dizinleri destekler. Derleme çıktıları elle düzenlenmez.

## Hazır olanlar
- Yedi ürün, kategori filtreleri ve her ürün için ayrı HTML adresi (`urun/google-yorum-karti/`). Eski ürün hash bağlantıları yeni sayfaya yönlenir.
- QR+NFC, yalnız NFC, yalnız QR; sabit/değiştirilebilir bağlantı seçimi ve adet.
- 5×5–15×15cm boyut seçimi, şeffaf/beyaz pleksi seçimi; varyantları ayrı tutan ve sekme oturumunda korunan önizleme sepeti.
- Menünün dört türü; PDF/web tasarımında teklif iletişimi akışı.
- Kapalı satın alma düğmeleri ve “Fiyat henüz girilmedi” gösterimi. Ödeme alanı yoktur.
- Klavye, native dialog odak yönetimi, Escape, mobil menü, reduced-motion ve responsive yerleşim.
- Temsili kartlar ve örnek QR. Gerçek fotoğraflar ve ürün tasarımları bekleniyor.

## İçerik ve yapı
- `src/shop.js`: ürünler, seçenekler, sepet kuralları. Fiyatlar bilinçli olarak `null`.
- `src/main.js`: etkileşimler ve temsili kartlar; gerçek yönlendirme veya ödeme servisi değildir.
- `ornek/iban/index.html`, `src/account-demo.js`: kart okutulunca açılacak hesap sayfasının gerçek hesap içermeyen bağımsız örneği.
- `src/product-pages.js`: hizmete özel sayfa içerikleri; derlemede yedi bağımsız sayfa üretilir.
- `src/style.css`: tasarım sistemi ve ekran boyutlarına uyarlamalar.
- [Kaynaklar ve tasarım kararları](docs/TASARIM-KARARLARI.md)
- [Tamamlanacak bilgiler ve satışa geçiş](docs/TAMAMLANACAKLAR.md)

## Önemli sınırlar
WhatsApp düğmesi ürün seçimini içeren mesaj taslağına yönlendirir; mesajı ziyaretçi kendisi gönderir. Fiyat, müşteri yorumu veya sipariş başarısı uydurulmaz. PDF yükleme/bağlantı toplama ve ödeme, gerçek sunucu ile ticari koşullar hazırlanınca eklenmelidir. Dinamik bağlantı hizmeti için kendi kalıcı alan adı kullanılmalıdır.

Manrope açık lisanslı yazı tipi yerel derlemeye dahildir; font CDN isteği yapılmaz. Yedek Arial/sans-serif vardır. Analitik, reklam pikseli ve takip çerezi eklenmedi.

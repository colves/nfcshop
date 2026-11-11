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
- Yedi ürün, kategori filtreleri, doğrudan paylaşılabilen ürün önizleme adresleri (`#urun/google`).
- QR+NFC, yalnız NFC, yalnız QR; sabit/değiştirilebilir bağlantı seçimi ve adet.
- Ürün seçimlerini birleştiren, adet değiştirme ve silme içeren bellek içi önizleme sepeti.
- Menünün dört türü; PDF/web tasarımında teklif iletişimi akışı.
- Kapalı satın alma düğmeleri ve “Fiyat henüz girilmedi” gösterimi. Ödeme alanı yoktur.
- Klavye, native dialog odak yönetimi, Escape, mobil menü, reduced-motion ve responsive yerleşim.
- Temsili kartlar ve örnek QR. Gerçek fotoğraflar ve ürün tasarımları bekleniyor.

## İçerik ve yapı
- `src/shop.js`: ürünler, seçenekler, sepet kuralları. Fiyatlar bilinçli olarak `null`.
- `src/main.js`: etkileşimler ve temsili kartlar; gerçek yönlendirme veya ödeme servisi değildir.
- `src/style.css`: tasarım sistemi ve ekran boyutlarına uyarlamalar.
- [Kaynaklar ve tasarım kararları](docs/TASARIM-KARARLARI.md)
- [Tamamlanacak bilgiler ve satışa geçiş](docs/TAMAMLANACAKLAR.md)

## Önemli sınırlar
WhatsApp numarası henüz verilmediği için iletişim düğmesi bilgi penceresi açar. Sahte numara, fiyat, müşteri yorumu veya sipariş başarısı kullanılmaz. PDF yükleme/bağlantı toplama ve ödeme, gerçek sunucu ile ticari koşullar hazırlanınca eklenmelidir. Dinamik bağlantı hizmeti için kendi kalıcı alan adı kullanılmalıdır.

Google Fonts üzerinden Manrope yüklenir; erişilemezse yerel Arial/sans-serif kullanılır. Analitik, reklam pikseli ve takip çerezi eklenmedi. Google Fonts bağlantısının IP gibi bağlantı bilgilerini üçüncü tarafa iletmesi canlı yayına geçişte gizlilik değerlendirmesine dahil edilmelidir.

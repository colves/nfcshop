# Önizleme doğrulaması

11 Kasım 2026.

## Otomatik kontroller
- `npm test`: 6 test başarılı. Fiyatsız katalog, seçenek bazlı sepet birleştirme, geçersiz adetler, menü teklif ayrımı, URL protokol doğrulama ve sepet adet değişikliği.
- `npm run build:pages`: başarılı. Vite derlemesi, yerel yazı tipleri ve main:/docs yayın kopyası.
- `git diff --check`: boşluk hatası yok.

## Tarayıcı kontrolleri
- Masaüstü ana sayfa görüntülendi; tasarım yönü açık zemin, tek yeşil ana vurgu ve 1:1 temsili kart görselleriyle korundu.
- Google ürününde yalnız QR + değiştirilebilir bağlantı + 3 adet seçimi sepette doğru gösterildi.
- Yedi ürün ve sosyal medya filtresindeki iki ürün doğrulandı.
- Katalogdaki tüm satın alma düğmeleri ve ürün/sepet satın alma düğmeleri devre dışı.
- Mobil menü açma ve ürünlere gitme çalışıyor.
- Menüde “Web menüsü hazırlatmak istiyorum” seçimi teklif akışını açıyor ve seçimi iletişim penceresinde gösteriyor. Gerçek numara verilmediği için mesaj gönderilmiyor.
- 320, 390 ve 768 CSS piksel genişliklerinde sayfada yatay taşma yok.
- Mobil ekran yakalama aracı ölçekleme sorunuyla küçük görüntü üretti; mobil yerleşim/taşma ölçüleri ve etkileşimler tarayıcıda doğrulandı. Gerçek telefon donanım testi yapılmadı.

## Bilinçli sınırlar
Ödeme, kalıcı sipariş, PDF yükleme, NFC yazımı, dinamik yönlendirme ve gerçek menü barındırma bu önizlemede uygulanmadı. Tamamlanacaklar listesi bu işleri ve gerekli işletme kararlarını içeriyor. Kitapların tam metinleri okunmadı; erişim sınırları tasarım notlarında açık.

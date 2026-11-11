# Önizleme doğrulaması

11 Kasım 2026.

## Otomatik kontroller
- `npm test`: 7 test başarılı. Bağlantı türüne özel açıklamalar, fiyatsız katalog, seçenek bazlı sepet birleştirme, geçersiz adetler, menü teklif ayrımı, URL protokol doğrulama ve sepet adet değişikliği.
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

## Bağımsız sayfalar, ölçüler ve ürün türüne özel tasarımlar

- 11 test geçti; tüm statik sayfalarda tek h1, doğru iç içe varlık yolları ve doğrudan açılabilir adresler kontrol edildi. Vite/Pages derlemesi başarılı.
- 5×5–15×15 cm boyutlar, geçersiz ölçülerin reddi ve farklı boyutların ayrı sepet satırları olarak korunması test edildi. Tarayıcıda 5×5 sepete eklendi, 15×15 seçiminin ölçü bilgisine yansıdığı görüldü.
- IBAN bağımsız demosunda kopyalama başarı mesajı, geçersiz örnek numara ve mobil okunaklılık kontrol edildi. Gerçek hesap/transfer kullanılmadı.
- Yedi ürünün yedi farklı görsel düzeni masaüstü tarayıcıda incelendi. Mobil dar ekran testinde her sayfanın belge genişliği 305px, kaydırma genişliği 305px: yatay taşma yok. Satın alma düğmeleri devre dışı.
- Gerçek telefon NFC okuma, baskı numunesi veya üretim testi yapılmadı. Sayfalardaki profil, sohbet, menü ve ilanlar temsili tasarım örnekleridir.

## İkinci iyileştirme
- Ürün penceresinde bağlantı/adet seçimleri anlık özetleniyor; adet düğmeleri de özeti güncelliyor.
- Yalnız NFC seçilince yeniden yazım için fiziksel erişim açıklanıyor ve QR örnek notu kaldırılıyor.
- Google, Instagram ve menü arasında geçiş yapılabilen örnek yönlendirme anlatımı eklendi; gerçek hizmet olmadığı açıkça belirtiliyor.
- Tarayıcıda “Yalnız NFC · Sabit bağlantı · 2 adet” özeti ve menü örneği doğrulandı.

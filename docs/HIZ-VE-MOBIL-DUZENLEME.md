# Görsel yükleme ve mobil ürün akışı — 13 Kasım 2026

Kapsam: Önceki incelemenin 1–5 numaralı maddeleri. Boyut karşılaştırması ve çalışan menü demosu bu değişiklik kapsamında değildir.

- Google v3 ve Instagram v7 fotoğraflarının orijinalleri korundu. Her yöntem için 160, 320, 640 ve 960 piksel teslim kopyaları üretildi; kırpma, perspektif veya tasarım değişikliği yapılmadı. Tüm kopyalar kare.
- `srcset` ve kullanım yerine göre `sizes` ile tarayıcı uygun dosyayı seçer. Büyük/yüksek yoğunluklu ekranlarda orijinal fotoğraf da kullanılabilir.
- Google birleşik kartı: orijinal 171.428 bayt; 320px 19.940 bayt; 640px 49.110 bayt. Bu değerler dosya boyutudur, açılış süresi garantisi değildir.
- Ana sayfanın büyük görseli ve yedi ürün kartı ilk HTML'de hazırdır. JavaScript yüklenmese bile ürün görselleri ve sayfa bağlantıları bulunabilir. Filtreleme aynı ortak katalog renderer'ını kullanır.
- İlk ekrandaki ana fotoğraflar eager/high; alt görseller ve küçük önizlemeler lazy yüklenir. Yöntem kullanıcı tarafından değiştirildiğinde yeni fotoğraf eager yüklenir.
- QR önizlemesi derlemede bir kez hazırlanır. Tarayıcıda QR oluşturma ve bunu bekleten üst düzey await kaldırıldı. Ana uygulama çıktısı yaklaşık 58 KB'tan 34 KB'a indi.
- Google/Instagram ürün yapılandırmasında gerçek DOM sırası önce seçenekler, sonra görsellerdir. Masaüstünde grid fotoğrafı solda tutar; telefonda seçenekler galeri önündedir. Bağlantı seçenekleri sürekli açık kalır.
- Fotoğraflı ürünlerin onaylı ışık, gölge ve tasarımları değişmedi. Diğer temsilî kartların kare katalog alanındaki oranı %70'e getirildi; yaklaşık fiziksel kart ölçeği uyumlandırıldı. Henüz fotoğrafı olmayan ürünler fotoğrafmış gibi sunulmadı.
- Yalnız şeffaf pleksi, sabit 3 mm, 5×5–15×15 cm ve kapalı satış kararı korundu. Fiyat/kargo/ödeme veya dinamik hizmet koşulu uydurulmadı.

Doğrulama: 15 test; tüm çözünürlük dosyalarının varlığı ve proje içindeki adresleri; ilk HTML'de yedi kart ve tek yüksek öncelikli görsel; masaüstü filtreleme; telefonda seçeneklerin önce gelmesi; Google yöntem/sepet ve Instagram galeri geçişi.

Yeni fotoğraflarda teslim kopyaları: `python scripts/optimize-images.py public/images/.../foto.webp` (Pillow). Mevcut kopyalar repoya dahildir; normal derleme Python gerektirmez. `prepare-media.mjs` eksik aday dosyalarını kontrol eder.

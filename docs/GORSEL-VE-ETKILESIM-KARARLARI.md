# Görseller ve etkileşim kararları — 13 Kasım 2026

- Ana sayfada arka planı bulunan ürün fotoğrafı tek başına, döndürülmeden gösterilir. Eski çizim kartlarıyla üst üste bindirilmez.
- Katalog fotoğrafı `contain` ile ayrılan alanın içine sığar; kartın üstü, köşeleri ve QR alanı kesilmez. Açık nötr çerçeve diğer ürünlerin yumuşak zeminleriyle uyum sağlar.
- Onaylanan Google kartı görselleri, baskı tasarımları ve ışık/açı düzeni değiştirilmedi. Diğer ürünlerin görselleri tamamlanınca aynı sunum dili kullanılmalı.
- Yalnızca işlemi açıklayan kısa geçişler kullanılır: seçenek değişiminde fotoğraf, pencere açılması, açıklama açılması ve başarılı kopyalama geri bildirimi. Sık kullanılan düğmelerin basılma tepkisi hafiftir.
- Adet veya boyut değişince ürün fotoğrafı yeniden oluşturulmaz. Animasyon yüklenmeyi veya işlemi bekletmez; döngü, zıplama ve sayfa giriş gösterisi eklenmedi.
- Hareket azaltma tercihi desteklenir. Adet ve kopyalama kontrollerinin dokunma alanları büyütüldü.
- Masaüstü ve 390 px telefon görünümü, ürün varyantı seçimi, önizleme sepeti ve örnek IBAN kopyalama kontrol edildi. 13 test ve Pages derlemesi başarılı.

Dayanaklar: [NN/g — Animation for a Purpose](https://www.nngroup.com/articles/animation-purpose-ux/), [W3C — Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html). Sosyal medya listesindeki sayılar evrensel tasarım kuralı olarak alınmadı.

## Ortak arka plan ve ayrı kart katmanı — 13 Kasım, son revizyon

Kullanıcının son talebi: bütün kartlarda aynı arka plan görseli, her kart için bağımsız ön yüz görseli; fare hareketinde yalnız kartın hareket etmesi.

- Ortak ve sabit sahne: `public/images/common/card-background.webp`. Önceki onaylı fotoğraf ortamından kart ve yansıması çıkarılarak ayrı boş arka plan hazırlandı; aydınlık sol pencere, sağ bitki ve tezgâh korunur.
- Google ön yüzleri, onaylı eğri vektör dosyalarından web için temizlenmiş üç SVG'dir. Baskı kaynakları değiştirilmedi.
- Diğer altı kartın mevcut basit beyaz düzenleri, 18 bağımsız SVG'ye aktarılır. `scripts/generate-card-faces.mjs` bu web önizlemelerini ürün metinlerinden ve ortak simgelerden üretir. Bunlar yeni onaylanmış baskı paketi değildir.
- Ortak sunum: `src/card-model.js` ve `src/card-model.css`. Arka plan ile ön yüz ayrı `img` öğeleridir. Pleksi kenarı ve hafif yüzey ışığı ayrı sunum katmanlarıdır. Bu sınırlı perspektifli bir web önizlemesidir; 360 derece döndürülebilen tam 3D dosyası değildir.
- Hareket yalnız fare ve hassas işaretçi içindir; açı ekleri yatayda ±7°, dikeyde ±5° ile sınırlanır. Ayrılınca, pencere odağı gidince ve hareket tercihi değişince sıfırlanır. Telefonda kaydırma engellenmez, hareket azaltma tercihinde sabittir. Kartın yazıları ayrı ayrı hareket etmez.
- Ana sayfa, yedi ürünün katalog ve seçim görselleri, Google ürün açılışı ve küçük varyant görselleri aynı arka plan dosyasını kullanır. Diğer hizmetlerin kendilerine özgü açıklama örnekleri korunur.
- 16 test başarılı. Tarayıcıda iki fare konumu arasında yalnız ön yüzün açı değerlerinin değiştiği, arka planın değişmediği, çıkışta sıfırlanma, Google beyaz/NFC seçimi, ortak dosya kullanımı ve 390 px katalog görünümü doğrulandı.

## Son kullanıcı düzeltmesi — önceki görünüm geri getirildi
Kullanıcı, ayrı düz modelde ışık/gölge/parlaklığın kaybolduğunu belirtti ve model görünümünün önceki haline alınmasını; yalnız ortak sabit arka planın kalmasını istedi. 89c7c09 sürümündeki Google fotoğrafları ve diğer kartların önceki CSS görselleri geri getirildi. Yeni SVG yüz ve fare eğimi katmanı aktif uygulamadan çıkarıldı. Ortak arka plan `src/shared-card-background.css` ile sunum alanlarında korundu. Google fotoğrafı kendi çekim ortamını da içerir; fotoğrafın içindeki ortam ayrı bir katmanmış gibi sunulmaz. Kaynak ve eski görsel dosyaları arşiv olarak tutulur. 13 test ve Pages derlemesi başarılı.

Son karar: Kullanıcı ortak sabit arka planları da kaldırmamızı istedi. Ortak arka plan stili kaldırıldı. Google fotoğrafı normal ve kırpılmadan gösterilir; diğer kartlar önceki sade renk zeminlerindedir. Bu karar önceki ortak arka plan kararının yerini alır.

Son boyut kararı: Katalog görsel alanları 1:1 kare yapıldı. Google fotoğrafı ek iç boşluk olmadan contain ile kareye yerleşir; fotoğraf oranı daima korunur. Masaüstü ve 390px telefonda alanların en ve boylarının eşitliği tarayıcıda doğrulandı.

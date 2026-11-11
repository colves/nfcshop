# NFCShop — ödeme altyapısı araştırması

Araştırma tarihi: 11 Kasım 2026. Yalnız araştırma ve taslak mimari; hesap açılmadı, başvuru yapılmadı, ödeme entegrasyonu veya tahsilat etkinleştirilmedi. Ücretler başvuru öncesinde yeniden doğrulanmalı.

## Sonuç ve öneri

Standart ürünler için sağlayıcının barındırdığı ödeme formu; özel tasarım ve menü hazırlama için teklif onayından sonra ödeme linki öneriliyor. İlk teknik aday PayTR iFrame, alternatif iyzico Checkout Form. Bu bir nihai sağlayıcı kararı değildir: teklif, valör, başvuru kabulü ve test sonucu birlikte karşılaştırılacak.

Mevcut site Vite ile üretilmiş statik bir önizlemedir. GitHub Pages üzerinde sunucu, kalıcı sipariş ve güvenli ödeme bildirimi işlenmez. Canlı satış öncesinde ticarete uygun barındırmaya ve kendi alan adına geçilmesi gerekir. GitHub kaynak deposu olarak kalabilir. Cloudflare Workers + D1 değerlendirmeye uygun bir adaydır; ödeme sağlayıcısı SDK'sının Node/Worker uyumu ayrıca denenmeden kesinleştirilmez. Tam Node.js sunucusu alternatifidir.

## Sağlayıcı karşılaştırması

| Başlık | PayTR | iyzico |
|---|---|---|
| Standart sipariş | iFrame API; token sunucudan alınır | Checkout Form; sonuç token ile sunucudan sorgulanır |
| Özel fiyatlı işler | Panelden ödeme linki; API kullanımı ayrıca onaya bağlı | Link ürünü var; standart Link ürünü API entegrasyonuyla aynı değil |
| Kamuya açık ücret | Sanal POS sayfasında 7 gün valörle %2,19’dan başlayan oran | Sanal POS sayfasında %4,29 + 0,25 TL; aylık 20.000 TL üzeri satış koşulu belirtiliyor |
| Sabit gider | Ürün sayfasına göre başlangıç/aylık/yıllık sabit ücret yok | Ürün sayfasına göre başlangıç ve aylık sabit ücret yok |
| Kesin fiyat | Sektör, hacim, kart, taksit ve valöre göre işletmeye özel teklif | Hacim, sözleşme ve ürüne göre teklif/hesap koşulları doğrulanmalı |

Bu oranlar aynı koşullarda hazırlanmış iki teklif değildir. NFCShop için kesin oran veya uygunluk garantisi verilemez. Link ürününün ücretini Sanal POS oranıyla aynı varsaymayacağız. Komisyona uygulanan vergiler, taksit maliyetleri, yabancı kartlar, iade/iptal ve bloke koşulları yazılı teklifte ayrıca sorulacak.

Kaynaklar:
- https://www.paytr.com/paytr-sanal-pos
- https://www.paytr.com/destek-merkezi/genel
- https://www.iyzico.com/isim-icin/sanal-pos
- https://www.iyzico.com/destek/yardim-merkezi
- https://dev.paytr.com/link-api

## Okunan ek rehberler ve projeye etkileri

### 1. OWASP — Third Party Payment Gateway Integration
Fiyatı ve indirimi tarayıcıdan kabul etme; toplamı sunucuda yeniden hesapla. Başarı dönüş adresi ödeme kanıtı değildir. Tutar, para birimi ve sipariş kimliğini doğrula. Tekrarlanan bildirim aynı siparişin tekrar üretilmesine neden olmamalı. NFCShop için ödeme durumuyla üretim durumunu ayrı tutacağız.

https://cheatsheetseries.owasp.org/cheatsheets/Third_Party_Payment_Gateway_Integration_Cheat_Sheet.html

### 2. OWASP — Webhook Security
Bildirim imzası sağlayıcının protokolüne göre doğrulanmalı. Gizli anahtarlar, tam bildirim gövdeleri ve gereksiz kişisel bilgiler loglara yazılmamalı. Bildirim işleme kalıcı ve tekrara dayanıklı olmalı. Sağlayıcının iletmediği bir zaman damgasını veya olay kimliğini uydurup zorunlu hale getirmeyeceğiz.

https://cheatsheetseries.owasp.org/cheatsheets/Webhook_Security_Cheat_Sheet.html

### 3. Baymard — Make Guest Checkout Prominent
Üyelik zorunluluğu ve görünmeyen misafir alışveriş seçeneği satın almayı zorlaştırabilir. İlk sürümde hesap açmadan alışveriş açık biçimde sunulacak. Mevcut bir e-posta adresiyle karşılaşmak giriş zorunluluğuna dönüşmeyecek. Başlangıçta müşteri hesabı geliştirmek gerekmiyor.

https://baymard.com/research-articles/make-guest-checkout-prominent

### 4. PayTR — iFrame API / bildirim adımı
Ödeme tokeni sunucu üzerinden alınır. Sonuç Bildirim URL’sine arka planda gönderilir; müşteri oturumuna bağımlı olamaz. Hash doğrulanır, ödeme durumu kalıcı kayda geçirilir ve sağlayıcının beklediği düz `OK` cevabı döndürülür. Yinelenen bildirim yeniden üretim başlatmaz. Taksitli ödemelerde toplam tahsilat, sepet bedelinden farklı olabileceği için alanlar sağlayıcının tarifine göre eşleştirilir.

https://dev.paytr.com/iframe-api
https://dev.paytr.com/iframe-api/iframe-api-2-adim

İkinci sayfanın doğrudan açılışında zaman aşımı yaşandı; resmî arama çıktısındaki bildirim açıklamaları incelendi. Uygulama öncesi tam güncel API sözleşmesi tekrar okunacak.

### 5. iyzico — CF Retrieve ve Webhook
Callback'teki token ödeme sonucunu sunucudan sorgulamak için kullanılır. API isteğinin başarılı olmasıyla ödeme başarısı ayrı değerlendirilir. `fraudStatus=0` inceleme beklediğinden sevkiyat başlatılmaz; onay koşulları sağlanmalıdır. V3 webhook imzasının hesapta etkin olması gerekir; eski imza sürümleri kullanılmaz. Form ödeme akışına uygun doğrulama biçimi seçilmelidir.

https://docs.iyzico.com/en/payment-methods/checkoutform/cf-implementation/cf-retrieve.md
https://docs.iyzico.com/en/advanced/webhook

### 6. PayTR — Linkle ödeme süreci
Panelden ürün/hizmet veya fatura/cari linkleri oluşturulabilir. Test ve canlıya geçiş adımları vardır. Özel menü tasarımında önce kapsam ve tutar kararlaştırılır; link işletmeci tarafından paylaşılır. Linkin sipariş/teklif kaydıyla eşleştirilmesi ve ödemenin sağlayıcı panelinden doğrulanması gerekir; ekran görüntüsüyle onay verilmez.

https://dev.paytr.com/home/link-odeme-entegrasyon-sureci

## NFCShop için önerilen sipariş akışı

### Standart kart ve hazır menü
1. Kullanım amacı, QR/NFC, sabit/dinamik, adet ve gerekli hedef bilgisi seçilir. PDF varsa güvenli yükleme tamamlanır.
2. Ürün ve seçeneklerin güncel fiyatları, adet indirimi ve kargo sunucuda hesaplanır. Müşteri vergiler dahil ödeyeceği toplamı görür.
3. Misafir alışverişle gerekli iletişim, teslimat ve fatura bilgileri alınır. Pazarlama izni ödeme şartı yapılmaz.
4. Değişmez sipariş özeti ve fiyat sürümü kaydedilir; her denemeye ayrı ödeme referansı verilir.
5. Sağlayıcının ödeme formu açılır. Kart numarası/CVV bizim formumuza veya sunucumuza alınmaz.
6. Dönüşte doğrulama sürüyorsa “Ödemeniz kontrol ediliyor” gösterilir. Doğrulanmış ödeme kesinleşmeden üretim başlamaz.
7. Kişiselleştirme bilgilerinin kontrolü, gerekiyorsa baskı tasarımı onayı, üretim ve gönderim ayrı aşamalardır.

### Özel PDF/web menüsü ve özel tasarım
1. WhatsApp'ta kapsam, içerik sayısı, teslim süresi, revizyon ve ücret netleşir.
2. Teklif numarası ve geçerlilik süresi olan kayıt oluşturulur; teklifin onaylanan sürümü korunur.
3. İlgili tutar için sağlayıcı panelinden ödeme linki hazırlanır. Standart mağaza sepetine değişken bir fiyat kullanıcı tarafından yazılmaz.
4. Ödeme doğrulanır; tasarım hazırlanır ve müşteri onayı kaydedilir. Ardından kart üretimi ve teslimat yapılır.

İlk sürüm varsayımı: standart işlerde tek çekim TRY; taksit ve yabancı para birimi ilk aşamaya alınmaz. Bu öneri henüz kullanıcı kararı veya sağlayıcı taahhüdü değildir.

## Minimum teknik yapı — uygulama taslağı

Henüz uygulanmadı. Sunucuda ürün/fiyat kaydı, siparişler, ödeme denemeleri, işlenen bildirimler ve teklifler tutulur. Finansal ödeme durumu ile üretim/teslim durumu ayrı alanlardır. Fiyatlar kuruş cinsinden tam sayı, para birimi TRY olur.

- `POST /api/checkout`: ürün kimliği, geçerli seçenekler, adet ve gerekli müşteri bilgilerini alır; fiyatı sunucu belirler. Sipariş/ödeme denemesi ve sağlayıcı formu ya da ödeme oturumu döner.
- `POST /api/payments/{provider}/notify`: sağlayıcının gerçek bildirim protokolünü işler; imza ve sipariş eşleştirmesi yapar. Hatalı bildirim ödeme onaylayamaz.
- `POST /api/payments/{provider}/return`: sağlayıcı gerektiriyorsa tarayıcı dönüş tokenini işler; ödeme durumu yine sunucudan doğrulanır.
- `GET /api/orders/{publicToken}/status`: tahmin edilemeyen, süreli/yetkili erişimle yalnız gerekli durum bilgisini döner. Sıralı sipariş numarasıyla kişisel bilgiler açığa çıkarılmaz.
- Yönetim ve iade işlemleri giriş/rol kontrolü gerektirir; genel erişime açılmaz. İade yetkisi ve tutar kontrolü sunucudadır.

Önerilen finansal durumlar: ödeme bekleniyor, incelemede, ödendi, başarısız, kısmi iade, tam iade. Ödeme sayfasının süresinin dolması geç gelen doğrulanmış bir tahsilatı yok saydırmaz; sağlayıcıyla mutabakat gerekir. Yeni ödeme denemesi eski denemeyle karıştırılmaz. Aynı siparişe iki tahsilat olursa iki ürün sevk edilmez; inceleme/iade süreci başlatılır.

## Başvuru öncesi hazırlanacaklar
- Satıcının ticari/vergi kimliği, yetkili ve banka hesabı belgeleri; kesin evrak listesi seçilen sağlayıcıdan alınır.
- Kendi alan adında fiyatları, ürünleri ve satıcı bilgileri tamamlanmış site.
- İş modeline uygun gizlilik, satış/ön bilgilendirme, teslimat ve iade metinleri. Hazır şablona dayanarak tüm kişiselleştirilmiş işler için toplu iade yasağı yazılmaz.
- Dinamik hizmetin süresi, değişiklik hakları ve dijital menü güncelleme koşulları.
- Gizli API anahtarları yalnız sunucu ortamında; GitHub, frontend dosyaları ve herkese açık build çıktısında bulunmaz.

iyzico’nun resmî başvuru sayfası fiyatların ve gerekli politika sayfalarının hazır olmasını istiyor. Mevcut fiyatsız önizlemeyi başvuruya hazır mağaza olarak değerlendirmiyoruz.

## Sağlayıcı teklifinde sorulacaklar
Tek çekim yerli banka/kredi kartı oranları; işlem başına ücret; vergi dahil toplam kesinti; düşük hacimde minimum ücret; taksit; valör ve hafta sonu aktarımı; bloke/rezerv; iade komisyonu; itiraz ücretleri; kısmi iade; Link ürününün ayrı fiyatı; test hesabı ve V3 imza/API yetkileri. Aynı valör ve aynı varsayımsal sepet tutarı üzerinden karşılaştırma yapılır.

## Canlıya geçiş testleri
Başarılı 3D Secure; ret ve kullanıcı iptali; tarayıcı geri dönüşü olmadan ulaşan ödeme bildirimi; çift tıklama; yinelenen ve sahte bildirim; yanlış tutar/para birimi; incelemedeki işlem; eski ödeme oturumuna geç bildirim; tahsilattan sonra veritabanı hatası; kısmi/tam iade; ödeme sonrası tasarım onayı bekleme; mobil klavye ve hata mesajları. Test ortamı anahtarlarıyla başlanır. Gerçek tahsilat/iade testi ayrıca kullanıcı tarafından kontrollü yapılır.

## Henüz kesinleşmeyenler
Sağlayıcı seçimi ve gerçek teklif, fiyatlar, kargo, işletme belgeleri, ödeme hesabı, marka/alan adı, hizmet ve iade koşulları. Yeni soru gönderilmedi; kullanıcının mevcut tek soru listesine ek olarak bu belge saklandı.

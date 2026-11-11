# Karar bekleyenler ve satışa geçiş

11 Kasım 2026 — güncel soru listesi. Yanıtlanmış konular tekrar sorulmaz. Fiyat ve marka bilinçli olarak sonraya bırakıldı.

## Kullanıcıdan gereken kararlar

1. **Boyut tamamlandı:** 5×5–15×15 cm, 1 cm aralıklarla kare ölçüler. Şeffaf/beyaz seçenekleri mevcut; varsayılan 10×10.
2. **Üretim süresi sonra:** Sakarya veya Kütahya çıkış mümkün. Hazırlama ve teslim günü henüz belirlenmedi; kullanıcı şimdilik bekletiyor.
3. **Menü kapsamı:** İlk özel web menüsü için ürün/kategori sayısı, dil, revizyon hakkı ve sonraki güncellemelerin kapsamı ne olacak? Başlangıç önerisi tek şube ve Türkçe; sipariş/POS/mutfak modülü ilk kapsamda yok.
4. **Dinamik altyapı kararı:** Kullanıcı kendi alan adını alacak, yönlendirmeler oradan yapılacak. Alan adı henüz alınmadı. İlk ücrete dahil hizmet süresi ve değişiklik koşulları henüz belirlenmedi. Süre sonunda yenileme ve bağlantının devam süreci açıklanmalı; ömür boyu vaadi yok.
5. **IBAN kararı tamamlandı:** Sayfayı biz hazırlayacağız. Araştırmaya dayalı demo /ornek/iban/ adresinde; banka, hesap sahibi ve IBAN kopyalama içerir. Gerçek hesap bilgisi yok.
6. **Logo beklemede:** Kullanıcı logo ekleme konusunu sonraya bıraktı; şimdi yeniden soru veya uygulama yok.
7. **Satıcı beklemede:** Kullanıcı şimdilik hiçbir işlem istemiyor. Satıcı bilgisi, hesap başvurusu veya ticari kayıt değişikliği yapılmaz.

## Araştırma, teklif ve test ile netleşecek işler

- Gerçek ambalajda 1/5/10 kart ölçüsü/ağırlığı, kargo teklifi, KDV/ek ücret/iade/hasar koşulları. Sonra müşteriye kargo bedeli ve ücretsiz gönderim eşiği.
- Maliyet, komisyon, paketleme ve hizmet emeği ile satış fiyatı ve adet indirimleri. Rakip fiyatları bizim fiyatımız olarak girilmedi. Baskı kullanıcı isteğiyle şimdilik hesap dışı.
- Menü tasarımı, veri girişi, yayın ve güncelleme fiyatları; tasarım ücretiyle kart adedi indirimi ayrı.
- Nihai NFC çipi, iPhone/Android okuma ve yüzey testleri; şeffaf/beyaz baskıda QR kontrastı. NTAG213 toplam/kullanıcı belleği ayrımı dikkate alınır.
- Marka/alan adı kararı ve uygunluk kontrolü; NFCShop geçici proje adı. Kullanıcı kararı sonraya bıraktı.
- Nihai görseller daha sonra hazırlanacak. Bu turda fotoğraf üretilmedi; kartlar ve kullanım örnekleri temsili.
- Ödeme sağlayıcısının yazılı teklifi ve satışa uygun barındırma; başvuru veya tahsilat yapılmadı.

## Tamamlanan eklemeler

- Yedi ürün için doğrudan açılabilen ayrı HTML adresi, hizmete özel anlatım/örnek ve ilgili ürün bağlantıları.
- 5×5–15×15 cm kare boyutlar, şeffaf/beyaz seçimi, QR/NFC ve sabit/dinamik seçenekleri.
- Menüde dört hizmet seçeneği; tasarım seçiminde WhatsApp teklif taslağına seçeneklerin aktarımı.
- WhatsApp hattı eklendi; bağlantıyı açıp mesajı göndermeye ziyaretçi karar verir. Otomatik gönderim yok.
- Sepet aynı sekmede sayfa geçişlerinde ve yenilemede korunur. Yalnız ürün seçenekleri sessionStorage'da tutulur.
- Fiyatlar henüz girilmedi; tüm satın alma düğmeleri devre dışı.

## Satışa geçiş için teknik işler

- Satışa uygun barındırma ve kendi alan adı; GitHub Pages yalnız önizleme.
- Sunucuda fiyat/sepet doğrulama, sağlayıcı formu, imzalı ödeme bildirimi ve tekrar işlem koruması.
- Kalıcı sipariş kaydı, sipariş durumu ve müşteri bilgilendirmesi; kart bilgisi sitede tutulmaz.
- Yetkili yönetim ve kalıcı yönlendirme kayıtları; alan adı yenilemesi, yedek ve hizmet süreleri.
- PDF boyut/tür/içerik kontrolü, güvenli depolama ve zararlı içerik kontrolü.
- Gerçek satıcıya uygun satış/ön bilgilendirme, kişiselleştirme, iade, KVKK ve gerekli diğer metinler.
- Gerçek stok/fiyat oluşunca SEO ürün verileri; satış açılmadan noindex bilinçli kaldırılacak.
- Test ödemesi, iptal/iade, başarısız ödeme ve üretim sonrası QR/NFC kontrolü.

## Önizleme sınırları

Gerçek sipariş, ödeme, dosya yükleme, müşteri hesabı, menü yayını veya dinamik yönlendirme hizmeti yoktur. Kartlardaki örnek QR, https://example.org adresini kodlar. IBAN demosu geçersiz TR00 örneği içerir; gerçek hesap değildir. WhatsApp, ziyaretçi mesajı gönderirse üçüncü taraf iletişim kanalıdır.

# Yayın sonrası tek soru listesi

Açık konular önizlemeyi engellemez; gerçek satıştan önce tamamlanmalıdır.

1. Son marka adı NFCShop mu, başka bir isim mi? Proje adı geçici kullanılıyor; marka/alan adı uygunluğu ayrıca araştırılmalı.
2. WhatsApp hattı hangi numara olacak? Şu anda numara uydurulmadı; iletişim düğmesi açıklama açıyor.
3. Her ürün ve QR/NFC/sabit/dinamik seçeneğinin satış fiyatı, KDV gösterimi ve adet indirimleri ne olacak? Şimdilik tüm fiyatlar null, ödeme kapalı.
4. Kargo bedeli, ücretsiz kargo eşiği, üretim ve teslim süresi ne olacak?
5. Dinamik hizmet kaç yıl dahil, kaç değişiklik dahil ve hizmet sona ererse süreç ne olacak? “Ömür boyu” taahhüdü verilmedi.
6. IBAN için hazır bir sayfa mı istenecek, yoksa hesap adı/IBAN gösteren sayfayı biz mi hazırlayacağız? Otomatik ödeme veya banka uygulaması açma vaadi yok.
7. PDF ve web menüsü tasarım ücretleri, kapsamı, revizyon hakkı ve sonradan fiyat güncelleme bedeli ne olacak? İlk aşamada güncellemeleri işletmeci yönetir; müşteri paneli yapılmadı.
8. Logo ekleme ve özel tasarımın kapsamı, baskı onayı ve iptal/iade koşulları nasıl olacak?
9. Gerçek ürün fotoğrafları ve nihai baskı tasarımları ne zaman gelecek? Görseller temsili, medya alanları hazır.
10. Satıcı unvanı, iş adresi, iletişim bilgileri ve satış için geçerli belgeler neler? Kişisel SGK/vergi belgeleri bu depoya alınmadı.
11. Hangi kartla ödeme sağlayıcısı ve canlı satış barındırması kullanılacak? Gizli anahtarlar GitHub'a veya tarayıcıya yazılmayacak.
12. NFC çipi, yapıştırılan yüzeyler ve iPhone/Android numune testleri tamamlandı mı? NTAG213 kısa URL için aday; 180 bayt toplam / 144 bayt kullanıcı belleği ayrımı dikkate alınmalı.

## Satışa geçiş için teknik işler
- Satışa uygun barındırma ve kendi alan adı; GitHub Pages ticari mağaza altyapısı olarak kullanılmaz.
- Sunucu tarafında fiyat ve sepet doğrulama, sağlayıcı ödeme sayfasına yönlendirme, imzalı ödeme bildirimi ve tekrar işlem koruması.
- Kalıcı sipariş kaydı, sipariş durumu ve müşteri bilgilendirmeleri; kart bilgisi bu sitede tutulmaz.
- Yetkilendirilmiş yönetim ve yönlendirme kayıtları; müşterinin kartındaki kalıcı adres korunur.
- PDF için boyut/tür/içerik kontrolü, güvenli depolama ve kötü amaçlı içerik taraması.
- Satıcı bilgilerine uygun mesafeli satış, ön bilgilendirme, kişiselleştirilmiş ürün koşulları, KVKK ve gerekiyorsa çerez düzenlemeleri.
- Gerçek stok/fiyat verileri oluşunca ürün SEO verileri; gerçek satış öncesinde noindex'in bilinçli kaldırılması.
- Test ödemesi, iptal/iade, başarısız ödeme, mobil cihaz ve üretim sonrası QR/NFC kalite kontrolü.

## Önizleme sınırları
Sepet yalnız açık sayfanın belleğinde tutulur, sayfa yenilenince sıfırlanır. Link, PDF, adres, ödeme bilgisi istenmez veya gönderilmez. Ürün QR'ları örnek olarak https://example.org adresini kodlar. Dinamik yönlendirme ve menü barındırma henüz çalışır hizmet değildir. Fiyat ve satın alma düğmeleri bilinçli kapalıdır.

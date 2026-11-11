# IBAN sayfası araştırması ve demo

11 Kasım 2026. Kullanıcı sayfayı bizim hazırlamamızı istedi. Gerçek hesap bilgisi alınmadı; örnek sayfa `ornek/iban/` adresinde. Bu bir işletme hesabı yayını veya ödeme entegrasyonu değildir.

## İncelenen örnekler

- [Toptan NFC](https://toptannfc.com/blog/nfc-iban-paylasimi): hesap sahibi, banka, IBAN ve kopyalama; müşterinin transferi kendi bankasında tamamlaması; alıcı adının kontrolü ve kopyalama çalışmazsa seçilebilir metin.
- [DTS Dijital](https://dtsdijital.com/nfc-kart/): NFC profilinde banka, hesap sahibi ve IBAN alanları ile kopyalama yaklaşımı.
- [Dijikart](https://dijikart.co/): profil içindeki özelleştirilmiş IBAN/SWIFT/banka QR içeriği; bu projenin IBAN örneği için profilin geri kalan özellikleri gerekli değil.
- [Linke](https://linke.cxr.app/): banka bilgisi ve kopyalama, açıkça temsili TR00 örneği.

## Uygulama

Mevcut yeşil/sade tasarım diliyle telefona uygun tek hesap sayfası: işletme adı, hesap sahibi adı, banka, para birimi, okunaklı/seçilebilir IBAN, ayrı hesap adı ve IBAN kopyalama düğmeleri, başarı/manuel kopyalama açıklaması. Tam IBAN tek satıra sıkıştırılmaz; dar ekranda satıra bölünür. Kopyalanan numaradan görüntüleme boşlukları çıkarılır.

Demo IBAN `TR00 0000 0000 0000 0000 0000 00`, geçersiz ve gerçek hesap değildir. Demo ibaresi hem üstte hem numara yanında hem sayfa sonunda var. Gerçek banka/işletme logosu yok. Otomatik transfer, ödeme sonucu, banka uygulaması açma veya gerçek para gönderme düğmesi yok.

Gerçek müşteriye yayın öncesinde hesap sahibi/IBAN doğrulanır ve müşterinin onayı alınır. Hesap değişiklikleri yetkili onayı gerektirir. Banka QR standardı araştırılıp doğrulanmadan numara QR'ı bankacılık QR'ı diye sunulmaz. Gerçek müşteri hesabı yayını için henüz veri veya yönetim altyapısı yoktur.

## Diğer güncel kararlar

- Kare boyutlar 5×5, 6×6, 7×7, 8×8, 9×9, 10×10, 11×11, 12×12, 13×13, 14×14, 15×15 cm. 1 cm aralık asistanın uygulama tercihi; varsayılan 10×10.
- Sakarya ve Kütahya'dan çıkış mümkün, süre daha sonra belirlenecek; herhangi bir gün taahhüdü yok.
- Dinamik bağlantı kendi alınacak alan adında; alan adı alınmış veya yönlendirme hizmeti uygulanmış değil. Müşteri hizmet süresi ayrıca belirsiz.
- Logo ve satıcı konusu beklemede; ticari kayıt veya site satıcı bilgisi değişikliği yapılmadı.

# Astra incelemesi sonrası düzenlemeler — 14 Kasım 2026

- IBAN katalog ve ürün görselinin aynı v2 kaynağı kullandığı doğrulandı; mevcut doğru eşleme değiştirilmedi. Bunun için regresyon kontrolü eklendi.
- Ana sayfada değiştirilebilir bağlantının QR ve QR+NFC seçeneklerinde sunulduğu açıklandı. Yalnız NFC kilidi ve sabit seçimi korundu.
- Fotoğraflı altı ürünün üstte tekrar eden büyük fotoğrafı kaldırıldı. Her sayfada ana fotoğraf seçenekler bölümünde bir kez gösterilir. Mobilde seçenekler önce, masaüstünde fotoğraf solda kalır. Google küçük galerisi geri eklenmedi.
- Fotoğrafın JavaScript'i beklememesi için seçenek alanı ortak `renderProductConfig` üzerinden ilk HTML'e yazılır; ana fotoğraf eager/high yüklenir. JavaScript aynı düğümlere etkileşimleri ekler.
- Tek malzeme radyo kutusu yerine sabit “Şeffaf pleksi · 3 mm” bilgisi kullanılır. Formun malzeme değeri gizli alanda korunur.
- Seçim özetine WhatsApp yardım düğmesi eklendi. Güncel ürün, ölçü, malzeme, yöntem, bağlantı türü ve adet mesaj taslağına aktarılır. Kullanıcı önce taslağı görür; mesaj otomatik gönderilmez.
- Katalogdaki tekrar eden kategori ve teknik bilgiler kaldırıldı; ortak özellikler ürün listesinin başında toplandı. İki sütunlu mobil düzen, kare fotoğraflar, fiyat durumu ve kullanıcının istediği kapalı satın alma düğmeleri korundu. Kartların fiyat/düğme hizaları eşitlendi.
- Ana sayfadaki 10×10 cm, görseldeki ölçü olarak etiketlendi; boyut karşılaştırması hazırlanmadı.
- Fotoğraf altı notu kısaltılıp okunurluğu artırıldı. Site yapımının dahil olmaması, transfer/mesaj/yorumun kendiliğinden başlamaması gibi önemli sınırlar üst açıklamaya taşındı. İlan fotoğrafının Sahibinden tasarımı olduğu belirtildi; yeni platform desteği vaat edilmedi.
- Menü demosu, boyut karşılaştırması, satışa geçişte karar gerektiren fiyat/kargo/ödeme/marka/hizmet koşulları kapsam dışında kaldı. Menüdeki mevcut teklif akışı korundu.

Doğrulama: 19 test ve Pages derlemesi başarılı. Masaüstü/mobil katalog, tek fotoğraflı Google ve IBAN düzenleri, 12×12 cm/2 adet/NFC seçiminin WhatsApp taslağına aktarımı, önizleme sepeti ve mevcut web menüsü teklif akışı tarayıcıda kontrol edildi. Mesaj gönderilmedi ve ödeme açılmadı.

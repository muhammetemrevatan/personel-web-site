Yapay zeka asistanları hayatımızın parçası oldu ama çoğu aylık abonelik istiyor ve verilerimiz başkasının sunucusunda duruyor. Peki kendi asistanımızı, kendi hesabımızda ve ücretsiz çalıştırabilseydik? Talorys tam olarak bunu vaat ediyor. Gelin nasıl çalıştığına birlikte bakalım.

## Talorys Nedir?

Talorys, Cloudflare hesabının içinde çalışan, tek kullanıcılı, açık kaynaklı (MIT lisanslı) bir kişisel yapay zeka asistanıdır. Roc Yu tarafından geliştirildi. Cloudflare'in resmi bir ürünü değil, Cloudflare'in sunduğu servisler üzerine kurulmuş bağımsız bir proje.

Burada önemli bir fark var: Talorys kiraladığın bir SaaS ürünü değil. Kurulum aracı her şeyi senin hesabına yerleştiriyor ve sonrasında asistan tamamen sana ait oluyor.

## Neler Yapabiliyor?

- Sohbet (akış halinde yanıt, konuşma geçmişiyle)

- Kalıcı hafıza: Tercihlerini hatırlar, istersen sonradan görüp düzenleyebilirsin

- Görevler, notlar ve projeler

- Tek seferlik ve tekrarlayan hatırlatıcılar

- Günlük görev özetleri

- Her cihazdan erişilebilen, şifre korumalı web arayüzü

## Nasıl Çalışıyor?

Talorys'in mimarisi sade ve Cloudflare'in sunucusuz (serverless) ekosistemine dayanıyor:

1. Cloudflare Pages: React arayüzünü barındırır ve `/api` isteklerini arka uca iletir.

2. Cloudflare Worker (özel): Herkese açık bir adresi yoktur. Yalnızca senin arayüzün bu Worker'a ulaşabilir.

3. Durable Object + SQLite: Sohbetler, hafıza, görevler, notlar ve zamanlamalar tek bir SQLite tabanlı Durable Object içinde, senin hesabında saklanır.

4. Workers AI: Sohbet için kullanılan yapay zeka modelini çalıştırır (şu an GLM 4.7 Flash).

Akıllı bir detay: Her mesajda modele hafızanın tamamı değil, yalnızca ilgili kısmı gönderiliyor.

Ayrıca basit hatırlatıcılar ve görev özetleri yapay zekaya ihtiyaç duymadan çalışıyor. Yani günlük AI kotan dolsa bile hatırlatıcıların aksamıyor.

## Kurulum: Tek Komut

Gereksinimler: Bir Cloudflare hesabı ve Node.js 20.18 veya üzeri.

```bash
npx create-talorys@latest
```

Bu komut şunları yapıyor:

- Cloudflare girişini kontrol ediyor, gerekirse tarayıcında yetkilendirme sayfasını açıyor

- Senden bir sahip şifresi istiyor. Şifre yerelde PBKDF2-SHA256 ile hashleniyor ve yalnızca Cloudflare secret olarak saklanıyor

- Worker'ı ve Pages sitesini kuruyor

- Kurulumu yapay zeka çağrısı yapmadan doğruluyor

- Sonunda sana site adresini veriyor

Kurulum yarıda kesilirse güvenle kaldığı yerden devam edebiliyor. Otomasyon için `--yes` ve `--account-id` parametreleri de var.

## Ücretsiz mi?

Talorys'in kendisi ücretsiz ve abonelik ücreti yok. Cloudflare'in Workers ücretsiz planına sığacak şekilde tasarlanmış ve ücretli özellikleri kendiliğinden açmıyor. Bununla birlikte Cloudflare'in günlük ücretsiz kotaları geçerli, yani yoğun kullanımda limitlere takılabilirsin.

## Gizlilik ve Güvenlik

- Verilerin senin Cloudflare hesabında duruyor

- Projede telemetri, analitik, takip veya reklam kodu yok, geliştiriciye hiçbir şey gönderilmiyor

- Worker'ın herkese açık URL'si yok

- Kimlik doğrulama Worker üzerinde zorunlu tutuluyor

Dürüst olmak gerekirse, sohbet mesajların yapay zeka çıkarımı için Cloudflare tarafından işleniyor. Veri "hiçbir yerden geçmiyor" değil, "senin kontrol ettiğin hesapta kalıyor" demek daha doğru.

## Kimler İçin Uygun?

### Uygun

- Kendi hafızası ve otomasyonlarıyla kişisel bir asistan isteyenler

- VPS, veritabanı sunucusu veya Docker yönetmek istemeyenler

- Verisini kendi hesabında tutmak isteyenler

### Dikkat etmen gerekenler

- Tek kullanıcılı, ekip hesabı yok

- Standart kurulum Cloudflare Workers AI kullanıyor

- Proje yeni ve erken aşamada, beklentini buna göre ayarla

## Sonuç

Talorys, kişisel bir yapay zeka asistanını sunucu yönetmeden, abonelik ödemeden ve verini başkasına emanet etmeden sahiplenmenin pratik bir yolunu sunuyor. Tek komutla kurulan, sunucusuz ve ücretsiz plana uyumlu yapısı hem geliştiriciler hem meraklı kullanıcılar için denemeye değer.

## Önemli Noktalar

1. Talorys, Cloudflare'in değil, Roc Yu'nun açık kaynaklı (MIT) projesidir

2. Tek komutla kurulur: npx create-talorys@latest

3. Her şey senin Cloudflare hesabında çalışır ve saklanır

4. Ücretsiz plana uyumlu tasarlanmıştır, Cloudflare kotaları geçerlidir

5. Sohbet, hafıza, görev, not ve hatırlatıcıları tek yerde toplar

6. Proje yenidir, üretim öncesi kendin test et

Kaynak ve kod: [Talorys — GitHub](https://github.com/rociiu/talorys)

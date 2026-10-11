# Kodun Etiği: Empatiyle Yazılım Geliştirmek

Yazılım geliştirirken çoğu zaman kodun çalışmasına odaklanırız. Ancak başkalarının anlayabileceği, bakımını yapabileceği ve üzerine yeni işler inşa edebileceği kod yazmak da önemlidir. Etik kodlama pratikleri, birlikte çalıştığımız geliştiricilerin hayatını kolaylaştırır.

## Kodlamada Etik Neden Önemli?

### Kodun Zincirleme Etkisi

Bugün yazdığımız her satır ileride onlarca geliştirici tarafından okunabilir, değiştirilebilir veya hata ayıklamak için incelenebilir. Kötü alışkanlıklar pek çok soruna yol açabilir:

- Artan bakım maliyetleri
- Daha fazla hata
- Geliştiricilerin yaşadığı hayal kırıklığı
- Geciken proje takvimleri
- Biriken teknik borç

### Kodun İnsan Tarafı

Kodun insanlar tarafından okunacağını unutmamalıyız. Robert C. Martin'in temiz kodu iyi yazılmış bir metne benzetmesi bu noktayı anlatır. Kod yazarken yalnızca bilgisayarla değil, diğer geliştiricilerle de iletişim kurarız.

## Etik Kodlamanın Temel İlkeleri

### 1. Zekice Görünmek Yerine Açık Olmak

```python
# Bad: Clever but confusing
result = [x for x in range(10) if x % 2 == 0 and x > 3]

# Good: Clear and self-explanatory
even_numbers_above_three = [
    number
    for number in range(10)
    if number % 2 == 0 and number > 3
]
```

### 2. Anlamlı Dokümantasyon

```javascript
// Bad: Obvious comment that adds no value
// This function adds two numbers
function add(a, b) {
  return a + b;
}

// Good: Explains the why, not the what
// Ensures financial calculations use exact decimal arithmetic
function addCurrencyValues(amount1, amount2) {
  return (amount1 * 100 + amount2 * 100) / 100;
}
```

### 3. Tutarlı İsimlendirme

```java
// Bad: Inconsistent naming
class userAccount {
    private String UserName;
    private String email_address;
    private int AGE;
}

// Good: Consistent naming
class UserAccount {
    private String username;
    private String emailAddress;
    private int age;
}
```

## Uygulanabilir Öneriler

### 1. Kodun Düzenlenmesi

- Fonksiyonları küçük ve tek bir işe odaklı tutun.
- Tek Sorumluluk İlkesini izleyin.
- Anlamlı dosya ve klasör yapıları kullanın.
- Birbiriyle ilişkili işlevleri bir arada tutun.

### 2. Hata Yönetimi

- Anlamlı hata mesajları sunun.
- Sınır durumlarını kontrollü biçimde ele alın.
- Hataları yeterli bağlamla kaydedin.
- Geçerli bir neden olmadan istisnaları sessizce yutmayın.

### 3. Testler

- Dokümantasyon görevi de gören testler yazın.
- Sınır durumlarını ve hata senaryolarını kapsayın.
- Testleri okunabilir ve bakımı kolay tutun.
- Açıklayıcı test isimleri kullanın.

## Yardımcı Araçlar ve Alışkanlıklar

1. **Kod biçimlendiricileri:** JavaScript/TypeScript için Prettier, Python için Black, Go için gofmt.
2. **Kod analiz araçları:** ESLint, pylint ve SonarQube.
3. **Dokümantasyon araçları:** JSDoc, Sphinx ve Swagger/OpenAPI.

## Etik Kodlama Kültürü Oluşturmak

### 1. Kod İncelemesi

- Yapıcı geri bildirim verin.
- Geliştiriciye değil, koda odaklanın.
- Önerilerinizin nedenini açıklayın.
- Bilgi ve alternatif çözümler paylaşın.

### 2. Bilgi Paylaşımı

- Teknik dokümantasyon yazın.
- README dosyalarını güncel tutun.
- Öğrendiklerinizi ekip toplantılarında paylaşın.
- Kodlama rehberleri oluşturun.

### 3. Sürekli İyileştirme

Düzenli yeniden düzenleme çalışmaları yapın, teknik borcu takip edin, ekip değerlendirmeleri düzenleyin ve yaşanan sorunlardan ders çıkarın.

## Uzun Vadeli Kazanımlar

### Ekip Verimliliği

Yeni ekip üyelerinin işe alışması hızlanır, hata ayıklama süresi azalır, bakım ve iş birliği kolaylaşır.

### Kod Kalitesi

Daha az hata, daha iyi performans, daha kolay test ve daha basit güncellemeler hedeflenir.

### Ekip Morali

Hayal kırıklığı azalır; iş tatmini, bilgi paylaşımı ve ekip kültürü güçlenir.

## Sonuç

Etik kod yazmak, iyi pratikleri izlemek kadar diğer geliştiricilere empati göstermekle de ilgilidir. Başkalarını düşünerek yazdığımız kod, herkes için daha iyi bir çalışma ortamı oluşturur. Martin Fowler'ın vurguladığı gibi, iyi programcılar insanların anlayabileceği kod yazar.

### Temel Çıkarımlar

1. Kodu önce insanlar, sonra bilgisayarlar için yazın.
2. Dokümantasyona ve açık isimlendirmeye zaman ayırın.
3. Tutarlılığı korumak için araçlardan yararlanın.
4. Bilgi paylaşımı kültürü oluşturun.
5. Kodunuzun uzun vadeli etkisini düşünün.

Bu ilkeler kod tabanını iyileştirirken daha iş birlikçi ve keyifli bir yazılım geliştirme ortamına da katkı sağlar.

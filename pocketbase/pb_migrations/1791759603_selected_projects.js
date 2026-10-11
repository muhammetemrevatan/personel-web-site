// Adds the approved bilingual portfolio projects once. Cover images are intentionally empty.
migrate((app) => {
 const collection = app.findCollectionByNameOrId("projects");
 const projects = [
  {
    "slug": "toxifyou-social-platform",
    "title": "ToxifYou Social Platform",
    "description": "A full-stack social platform built as a React client and a Spring Boot API, with user accounts, social interactions, and PostgreSQL-backed data.",
    "content": "# ToxifYou Social Platform\n\nToxifYou brings a social product interface and its backend together. The React application communicates with a Spring Boot REST API for user and social features.\n\n## What it does\n\nThe platform provides user management and core social interactions through a browser-based interface. The backend stores relational data in PostgreSQL and protects its API endpoints with Spring Security.\n\n## How it is structured\n\nThe frontend and backend live in separate repositories, keeping the user experience and API responsibilities distinct.\n\n- [React frontend repository](https://github.com/muhammetemrevatan/toxifyoufrontend)\n- [Spring Boot backend repository](https://github.com/muhammetemrevatan/toxifyoubackend)\n\n## Outcome\n\nThe two applications form a full-stack project that demonstrates how a web client works with an authenticated API and a relational database.",
    "language": "en",
    "published": true,
    "featured": true,
    "date": "2025-01-12 00:00:00.000Z",
    "category": "Social Platform",
    "tags": [
      "full-stack",
      "react",
      "spring-boot",
      "postgresql",
      "social-platform"
    ],
    "cover": "",
    "demo_url": "",
    "source_url": "https://github.com/muhammetemrevatan/toxifyoubackend",
    "outcome": "A connected frontend and backend that demonstrate the core flow of a social product, from the user interface to secured API operations.",
    "order": 1
  },
  {
    "slug": "toxifyou-social-platform-tr",
    "title": "ToxifYou Sosyal Platformu",
    "description": "Kullanıcı hesapları ve sosyal etkileşimler sunan; React arayüzü ile Spring Boot API’sini PostgreSQL üzerinde birleştiren tam kapsamlı bir sosyal platform.",
    "content": "# ToxifYou Sosyal Platformu\n\nToxifYou, sosyal bir ürünün arayüzünü ve arka ucunu bir araya getiriyor. React uygulaması; kullanıcı ve sosyal özellikler için Spring Boot REST API ile haberleşiyor.\n\n## Neler yapıyor?\n\nPlatform, tarayıcı üzerinden kullanıcı yönetimi ve temel sosyal etkileşimler sunuyor. Arka uç ilişkisel veriyi PostgreSQL’de tutuyor ve API uçlarını Spring Security ile koruyor.\n\n## Yapı\n\nÖn yüz ve arka uç ayrı depolarda bulunuyor. Böylece kullanıcı deneyimi ile API sorumlulukları birbirinden ayrılıyor.\n\n- [React ön yüz deposu](https://github.com/muhammetemrevatan/toxifyoufrontend)\n- [Spring Boot arka uç deposu](https://github.com/muhammetemrevatan/toxifyoubackend)\n\n## Sonuç\n\nİki uygulama birlikte, bir web istemcisinin kimlik doğrulamalı API ve ilişkisel veritabanıyla nasıl çalıştığını gösteren tam kapsamlı bir proje oluşturuyor.",
    "language": "tr",
    "published": true,
    "featured": true,
    "date": "2025-01-12 00:00:00.000Z",
    "category": "Sosyal Platform",
    "tags": [
      "full-stack",
      "react",
      "spring-boot",
      "postgresql",
      "sosyal-platform"
    ],
    "cover": "",
    "demo_url": "",
    "source_url": "https://github.com/muhammetemrevatan/toxifyoubackend",
    "outcome": "Kullanıcı arayüzünden güvenli API işlemlerine uzanan temel bir sosyal ürün akışı.",
    "order": 1
  },
  {
    "slug": "courier-tracking-system",
    "title": "Courier Tracking System",
    "description": "Processes courier location updates, records arrivals within a store’s 100-metre geofence, and tracks each courier’s total distance travelled.",
    "content": "# Courier Tracking System\n\nThis service turns a stream of courier coordinates into useful delivery activity. It records when a courier enters a store’s 100-metre radius, ignores repeat entries to the same store for one minute, and keeps a running travel distance.\n\n## How it works\n\nThe Spring Boot API receives location updates and exposes endpoints for querying distances and store-entry logs. A Haversine strategy calculates distance, while Redis keeps the latest location and per-store entry state available for fast checks.\n\nThe code follows a ports-and-adapters structure: delivery rules sit in the application and domain layers, with persistence, caching, and web endpoints implemented around them. Flyway manages database setup; the demo uses an in-memory H2 database.\n\n## Outcome\n\nThe project demonstrates geofence events, distance tracking, and replaceable infrastructure behind a clear domain model.\n\n[View the source code on GitHub](https://github.com/muhammetemrevatan/courier-tracking).",
    "language": "en",
    "published": false,
    "featured": true,
    "date": "2025-11-03 00:00:00.000Z",
    "category": "Backend Systems",
    "tags": [
      "java",
      "spring-boot",
      "redis",
      "location",
      "hexagonal-architecture"
    ],
    "cover": "",
    "demo_url": "",
    "source_url": "https://github.com/muhammetemrevatan/courier-tracking",
    "outcome": "Location rules are isolated from storage and delivery details, making the distance strategy and event handling easier to extend and test.",
    "order": 2
  },
  {
    "slug": "courier-tracking-system-tr",
    "title": "Kurye Takip Sistemi",
    "description": "Kurye konumlarını işler, mağazanın 100 metrelik alanına girişleri kaydeder ve her kuryenin toplam yol mesafesini takip eder.",
    "content": "# Kurye Takip Sistemi\n\nBu servis, kurye koordinatlarını teslimat hareketlerine dönüştürüyor. Kurye mağazanın 100 metrelik alanına girdiğinde kayıt oluşturuyor, aynı mağazaya bir dakika içindeki tekrar girişleri atlıyor ve toplam yol mesafesini tutuyor.\n\n## Nasıl çalışıyor?\n\nSpring Boot API’si konum güncellemelerini alıyor; mesafe ve mağaza giriş kayıtlarını sorgulamak için uçlar sunuyor. Haversine stratejisi mesafeyi hesaplıyor. Redis ise son konumu ve mağaza başına giriş durumunu hızlıca denetlemeye yardımcı oluyor.\n\nKod ports-and-adapters yapısını izliyor: iş kuralları uygulama ve alan katmanlarında, veritabanı, önbellek ve web uçları ise çevre katmanlarda bulunuyor. Flyway veritabanını hazırlıyor; demo bellekte çalışan H2 veritabanını kullanıyor.\n\n## Sonuç\n\nProje; coğrafi alan girişlerini, mesafe takibini ve alan modelinden ayrılmış altyapı bileşenlerini gösteriyor.\n\n[Kaynak kodu GitHub’da görüntüle](https://github.com/muhammetemrevatan/courier-tracking).",
    "language": "tr",
    "published": false,
    "featured": true,
    "date": "2025-11-03 00:00:00.000Z",
    "category": "Arka Uç Sistemleri",
    "tags": [
      "java",
      "spring-boot",
      "redis",
      "konum",
      "hexagonal-architecture"
    ],
    "cover": "",
    "demo_url": "",
    "source_url": "https://github.com/muhammetemrevatan/courier-tracking",
    "outcome": "Konum kuralları veri saklama ve taşıma ayrıntılarından ayrıldı; mesafe hesabı ve olay işleme genişletilebilir, sınanabilir hale geldi.",
    "order": 2
  },
  {
    "slug": "gsm-message-sender",
    "title": "GSM Message Sender Service",
    "description": "A Spring Boot API for routing GSM message requests through interchangeable strategies, with containerized setup and service monitoring.",
    "content": "# GSM Message Sender Service\n\nThis backend project organizes GSM message requests behind a REST API. Rather than tying every request to one implementation, it uses Factory and Strategy patterns to choose a route based on the request type.\n\n## Running and observing the service\n\nThe Spring Boot application can run locally or in Docker. Swagger UI supports API exploration, while Actuator, Prometheus, and Grafana provide health and performance visibility.\n\n## Outcome\n\nThe design keeps message selection open to new strategies and pairs it with a practical container and monitoring setup.\n\n[View the source code on GitHub](https://github.com/muhammetemrevatan/gsm-sender).",
    "language": "en",
    "published": true,
    "featured": true,
    "date": "2025-01-02 00:00:00.000Z",
    "category": "Backend Systems",
    "tags": [
      "java",
      "spring-boot",
      "rest-api",
      "docker",
      "observability"
    ],
    "cover": "",
    "demo_url": "",
    "source_url": "https://github.com/muhammetemrevatan/gsm-sender",
    "outcome": "Message routing rules can be extended independently, while health and performance are visible through the monitoring stack.",
    "order": 3
  },
  {
    "slug": "gsm-message-sender-tr",
    "title": "GSM Mesaj Gönderim Servisi",
    "description": "Farklı mesaj isteklerini değiştirilebilir stratejilerle yönlendiren; konteyner ve servis izleme desteği sunan bir Spring Boot API’si.",
    "content": "# GSM Mesaj Gönderim Servisi\n\nBu arka uç projesi, GSM mesaj isteklerini bir REST API arkasında düzenliyor. Her isteği tek bir uygulamaya bağlamak yerine, istek türüne göre yön seçmek için Factory ve Strategy kalıplarını kullanıyor.\n\n## Çalıştırma ve izleme\n\nSpring Boot uygulaması yerelde veya Docker içinde çalışabiliyor. Swagger UI API’yi incelemeyi, Actuator, Prometheus ve Grafana ise sağlık ve performans takibini sağlıyor.\n\n## Sonuç\n\nTasarım, yeni mesaj stratejilerinin eklenmesini kolaylaştırırken konteyner ve izleme altyapısını da birlikte sunuyor.\n\n[Kaynak kodu GitHub’da görüntüle](https://github.com/muhammetemrevatan/gsm-sender).",
    "language": "tr",
    "published": true,
    "featured": true,
    "date": "2025-01-02 00:00:00.000Z",
    "category": "Arka Uç Sistemleri",
    "tags": [
      "java",
      "spring-boot",
      "rest-api",
      "docker",
      "izlenebilirlik"
    ],
    "cover": "",
    "demo_url": "",
    "source_url": "https://github.com/muhammetemrevatan/gsm-sender",
    "outcome": "Mesaj yönlendirme kuralları birbirinden bağımsız genişletilebilir; servisin sağlığı ve performansı izlenebilir.",
    "order": 3
  },
  {
    "slug": "employee-data-batch-processor",
    "title": "Employee Data Batch Processor",
    "description": "Imports employee data from CSV files into PostgreSQL with chunk-based Spring Batch jobs, step management, retries, and error handling.",
    "content": "# Employee Data Batch Processor\n\nThis project handles employee data as a batch workflow instead of a one-off file import. Spring Batch reads CSV records, processes them in chunks, and writes them to PostgreSQL.\n\n## Processing flow\n\nJobs are composed of steps, which makes the import flow easier to follow. Chunk processing bounds the amount of data handled at once; retry and error-handling features help manage failed records and operations.\n\n## Outcome\n\nThe result is a focused example of moving employee records from files into a relational database through a repeatable batch pipeline.\n\n[View the source code on GitHub](https://github.com/muhammetemrevatan/employee-batch).",
    "language": "en",
    "published": true,
    "featured": true,
    "date": "2025-01-02 00:00:00.000Z",
    "category": "Data Processing",
    "tags": [
      "java",
      "spring-batch",
      "postgresql",
      "csv",
      "batch-processing"
    ],
    "cover": "",
    "demo_url": "",
    "source_url": "https://github.com/muhammetemrevatan/employee-batch",
    "outcome": "A repeatable pipeline moves file-based employee records into relational storage in manageable, recoverable chunks.",
    "order": 4
  },
  {
    "slug": "employee-data-batch-processor-tr",
    "title": "Çalışan Verisi Toplu İşlemcisi",
    "description": "Çalışan verilerini CSV dosyalarından PostgreSQL’e parça bazlı Spring Batch işleri, adım yönetimi, yeniden deneme ve hata işleme ile aktarır.",
    "content": "# Çalışan Verisi Toplu İşlemcisi\n\nBu proje, çalışan verilerini tek seferlik dosya aktarımı yerine toplu iş akışı olarak ele alıyor. Spring Batch CSV kayıtlarını okuyor, parçalar halinde işliyor ve PostgreSQL’e yazıyor.\n\n## İşleme akışı\n\nİşler adımlardan oluşuyor; bu da aktarımın izlenmesini kolaylaştırıyor. Parça bazlı işleme aynı anda ele alınan veri miktarını sınırlıyor. Yeniden deneme ve hata işleme özellikleri başarısız kayıtların ve işlemlerin yönetimine yardımcı oluyor.\n\n## Sonuç\n\nOrtaya, çalışan kayıtlarını dosyalardan ilişkisel veritabanına tekrarlanabilir bir toplu işlem hattıyla aktaran odaklı bir örnek çıkıyor.\n\n[Kaynak kodu GitHub’da görüntüle](https://github.com/muhammetemrevatan/employee-batch).",
    "language": "tr",
    "published": true,
    "featured": true,
    "date": "2025-01-02 00:00:00.000Z",
    "category": "Veri İşleme",
    "tags": [
      "java",
      "spring-batch",
      "postgresql",
      "csv",
      "toplu-isleme"
    ],
    "cover": "",
    "demo_url": "",
    "source_url": "https://github.com/muhammetemrevatan/employee-batch",
    "outcome": "Dosyalardaki çalışan kayıtlarını yönetilebilir ve hata sonrası sürdürülebilir parçalar halinde ilişkisel veritabanına aktaran tekrarlanabilir bir akış.",
    "order": 4
  },
  {
    "slug": "telegram-reminder-assistant",
    "title": "Telegram Reminder Assistant",
    "description": "A Turkish-language Telegram assistant that turns text and voice requests into CalDAV events, recurring schedules, and reminders.",
    "content": "# Telegram Reminder Assistant\n\nThe bot lets its owner manage a calendar in Turkish through text or voice messages. It transcribes voice requests, interprets the requested action, then creates or updates events on a CalDAV calendar.\n\n## Everyday calendar tasks\n\nIt supports single-day and multi-day events, recurring schedules, notes, and multiple reminders. The owner can search for events and edit selected details. Deleting an event or a recurring series requires a separate confirmation.\n\n## Reliability and privacy\n\nCalDAV is the source of truth. The bot restores future reminders on startup and synchronizes them regularly, so scheduled notifications recover after a restart. Text, voice, and start commands are restricted to the configured Telegram user and chat.\n\n## Outcome\n\nThe project combines conversational calendar management with recurring reminders, safe changes, restart recovery, and automated regression checks.\n\n[View the source code on GitHub](https://github.com/muhammetemrevatan/reminder-bot).",
    "language": "en",
    "published": false,
    "featured": false,
    "date": "2026-10-11 00:00:00.000Z",
    "category": "Personal Automation",
    "tags": [
      "python",
      "telegram-bot",
      "caldav",
      "automation",
      "ai"
    ],
    "cover": "",
    "demo_url": "",
    "source_url": "https://github.com/muhammetemrevatan/reminder-bot",
    "outcome": "Reminders are restored and synchronized from CalDAV after restarts, with owner-only access and confirmation before destructive edits.",
    "order": 5
  },
  {
    "slug": "telegram-reminder-assistant-tr",
    "title": "Telegram Hatırlatma Asistanı",
    "description": "Türkçe metin ve sesli istekleri CalDAV etkinliklerine, tekrarlayan takvim kayıtlarına ve hatırlatıcılara dönüştüren bir Telegram asistanı.",
    "content": "# Telegram Hatırlatma Asistanı\n\nBot, sahibinin takvimini Türkçe metin veya sesli mesajlarla yönetmesini sağlıyor. Sesli istekleri yazıya çeviriyor, istenen işlemi yorumluyor ve etkinlikleri CalDAV takvimine ekliyor veya güncelliyor.\n\n## Günlük takvim işleri\n\nTek günlük ve çok günlük etkinlikler, tekrarlar, notlar ve birden fazla hatırlatma destekleniyor. Etkinlikler aranıp seçilen alanları düzenlenebiliyor. Bir etkinliği veya tekrar serisini silmek için ayrıca onay gerekiyor.\n\n## Güvenilirlik ve gizlilik\n\nTakvimin asıl kaynağı CalDAV. Bot gelecekteki hatırlatmaları başlangıçta geri yüklüyor ve düzenli olarak eşitliyor; böylece yeniden başlatmalardan sonra bildirimler devam ediyor. Metin, ses ve başlatma komutlarına yalnızca yapılandırılmış Telegram hesabı ve sohbeti erişebiliyor.\n\n## Sonuç\n\nProje; konuşarak takvim yönetimini, tekrar eden hatırlatmaları, kontrollü değişiklikleri, yeniden başlatma sonrası kurtarmayı ve otomatik regresyon kontrollerini birleştiriyor.\n\n[Kaynak kodu GitHub’da görüntüle](https://github.com/muhammetemrevatan/reminder-bot).",
    "language": "tr",
    "published": false,
    "featured": false,
    "date": "2026-10-11 00:00:00.000Z",
    "category": "Kişisel Otomasyon",
    "tags": [
      "python",
      "telegram-bot",
      "caldav",
      "otomasyon",
      "yapay-zeka"
    ],
    "cover": "",
    "demo_url": "",
    "source_url": "https://github.com/muhammetemrevatan/reminder-bot",
    "outcome": "Yeniden başlatmalarda hatırlatmalar CalDAV’dan geri yüklenip eşitleniyor; erişim sahibine sınırlandırılıyor ve silme ayrıca onay istiyor.",
    "order": 5
  }
];
 for (const data of projects) {
  const existing = app.findRecordsByFilter("projects", "slug = {:slug} && language = {:language}", "", 1, 0, {slug:data.slug, language:data.language});
  if (existing.length) continue;
  const record = new Record(collection);
  for (const key in data) record.set(key,data[key]);
  app.save(record);
 }
});

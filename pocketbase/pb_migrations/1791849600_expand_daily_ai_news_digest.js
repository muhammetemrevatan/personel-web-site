// Expands the technical explanation of the bilingual daily AI news digest project.
const previous = {
  "daily-ai-news-digest": {
    description: "A self-hosted n8n workflow that gathers updates from Hacker News, arXiv cs.AI, Hugging Face, and OpenAI, then sends a Gemini-written digest to Telegram every morning.",
    content: "# Daily AI News Digest\n\nI built this n8n workflow to bring useful AI and software updates into one daily Telegram message. It runs on my Dokploy server and can also be started manually for testing.\n\n## How the workflow runs\n\n1. At 09:00 each day, it reads RSS feeds from Hacker News, arXiv cs.AI, Hugging Face, and OpenAI.\n2. It combines the feed items and prepares them for summarization.\n3. Gemini turns the collected stories into a concise digest.\n4. The finished summary is sent to my Telegram bot.\n\nThe workflow diagram above shows the scheduled and manual triggers, feed sources, merge and preparation steps, Gemini model, and Telegram delivery.",
    outcome: "Four research and engineering feeds become one readable Telegram digest each morning, with a manual trigger available for test runs.",
  },
  "daily-ai-news-digest-tr": {
    description: "Hacker News, arXiv cs.AI, Hugging Face ve OpenAI kaynaklarını toplayan; Gemini ile özetleyip her sabah Telegram’a gönderen, kendi sunucumda çalışan bir n8n akışı.",
    content: "# Günlük Yapay Zekâ Haber Özeti\n\nYapay zekâ ve yazılım alanındaki gelişmeleri her gün tek bir Telegram mesajında toplamak için bu n8n akışını hazırladım. Dokploy sunucumda çalışıyor; test etmek için elle de başlatılabiliyor.\n\n## Akış nasıl çalışıyor?\n\n1. Her gün saat 09:00’da Hacker News, arXiv cs.AI, Hugging Face ve OpenAI RSS kaynaklarını okuyor.\n2. Akışlardan gelen içerikleri birleştirip özete hazırlıyor.\n3. Gemini, toplanan haberleri kısa bir özete dönüştürüyor.\n4. Hazırlanan özet Telegram botuma gönderiliyor.\n\nYukarıdaki şema; zamanlanmış ve elle tetiklemeyi, RSS kaynaklarını, birleştirme ve hazırlık adımlarını, Gemini modelini ve Telegram’a gönderimi gösteriyor.",
    outcome: "Dört araştırma ve yazılım kaynağı her sabah okunabilir tek bir Telegram özetine dönüşüyor; akış elle de test edilebiliyor.",
  },
};

const expanded = {
  "daily-ai-news-digest": {
    description: "A self-hosted n8n pipeline on Dokploy that reads RSS feeds from Hacker News, arXiv cs.AI, Hugging Face, and OpenAI, combines and prepares their items, summarizes them with Gemini, and delivers a daily digest through Telegram. It runs at 09:00 and also has a manual test trigger.",
    content: `This project is a small, self-hosted news pipeline: separate source readers collect feed items, a preparation step shapes them for an AI summary, and a Telegram node delivers the result. The workflow runs in n8n on my Dokploy server.

## Sources and input

The workflow has one RSS reader for each source:

- **Hacker News** — technology stories and discussions from its feed.
- **arXiv cs.AI** — research papers published in the artificial intelligence category.
- **Hugging Face** — updates exposed through its RSS feed.
- **OpenAI** — updates exposed through OpenAI’s RSS feed.

Each reader contributes feed items to the same processing path. The diagram shows RSS ingestion; it does not show a separate crawler that opens and reads each linked article. The digest is therefore based on the information available to the workflow from those feeds and the preparation step.

## Processing pipeline

1. **Trigger:** a Schedule Trigger starts the workflow every day at 09:00. A Manual Trigger provides a second entry point for testing. Both lead into the source and processing path.
2. **Collect:** the four RSS nodes read their configured feeds independently.
3. **Merge:** the Merge node uses append mode to bring the incoming feed items into one stream. This keeps the source readers separate while giving the next step a combined input.
4. **Prepare:** the Code node named “Süz ve istem hazırla” applies the workflow’s configured selection and formatting logic, then prepares the prompt for the summarization step. Keeping this work in one node makes the prompt and item-selection rules easy to inspect and adjust.
5. **Summarize:** the “Özetle” step uses the connected Gemini Chat Model to turn the prepared input into a concise digest.
6. **Deliver:** Telegram’s sendMessage operation sends the generated summary to the configured chat.

## Runtime and boundaries

The schedule and manual trigger share the same downstream workflow, so a test run exercises the same collection, preparation, summarization, and delivery stages as the daily run. The current diagram shows four RSS inputs, one append merge, one Code preparation step, Gemini summarization, and Telegram delivery. It does not show a database, a website crawler, or a review step before sending.

RSS feed items and the prepared prompt are passed to Gemini for summarization; the result is then sent to Telegram. The workflow diagram above documents these components and their connections.`,
    outcome: "An automated morning briefing combines four technology and AI research feeds into one Telegram message, with collection, prompt preparation, Gemini summarization, and delivery kept as distinct steps.",
  },
  "daily-ai-news-digest-tr": {
    description: "Dokploy sunucumda çalışan n8n akışı; Hacker News, arXiv cs.AI, Hugging Face ve OpenAI RSS öğelerini topluyor, birleştirip özete hazırlıyor, Gemini ile özetliyor ve sonucu her gün Telegram’a gönderiyor. Akış saat 09:00’da çalışıyor ve elle test tetikleyicisi de içeriyor.",
    content: `Bu proje, kendi sunucumda çalışan küçük bir haber işleme hattı: ayrı kaynak okuyucuları RSS öğelerini topluyor, hazırlık adımı bunları yapay zekâ özetine uygun hale getiriyor, Telegram düğümü de sonucu iletiyor. Workflow, Dokploy sunucumdaki n8n üzerinde çalışıyor.

## Kaynaklar ve girdi

Akışta her kaynak için ayrı bir RSS okuyucu bulunuyor:

- **Hacker News** — teknoloji haberleri ve topluluk tartışmaları.
- **arXiv cs.AI** — yapay zekâ kategorisinde yayımlanan araştırma makaleleri.
- **Hugging Face** — RSS akışında sunduğu güncellemeler.
- **OpenAI** — OpenAI’nin RSS akışında yayımladığı güncellemeler.

Her okuyucu kendi akışından öğeler getiriyor ve bu öğeler aynı işleme hattına katılıyor. Şemada RSS üzerinden içerik alma adımı var; bağlantılara gidip makalelerin tamamını okuyan ayrı bir tarayıcı adımı görünmüyor. Bu nedenle özet, akışlardan gelen bilgiler ve hazırlık adımının işlediği içerik üzerinden oluşturuluyor.

## İşleme hattı

1. **Tetikleme:** Schedule Trigger akışı her gün saat 09:00’da başlatıyor. Test için ikinci bir giriş noktası olarak Manual Trigger bulunuyor. İki tetikleyici de aynı kaynak ve işleme adımlarına bağlanıyor.
2. **Toplama:** Dört RSS düğümü kendi yapılandırılmış akışlarını okuyor.
3. **Birleştirme:** Merge düğümü append modunda kaynaklardan gelen öğeleri tek bir akışta bir araya getiriyor. Böylece kaynak okuyucuları ayrı kalırken sonraki adıma ortak bir girdi sağlanıyor.
4. **Hazırlama:** “Süz ve istem hazırla” adlı Code düğümü akışta tanımlı seçim ve biçimlendirme kurallarını uygulayıp özetleme adımına gönderilecek istemi hazırlıyor. Seçim ve istem kurallarının tek noktada bulunması, bunları incelemeyi ve düzenlemeyi kolaylaştırıyor.
5. **Özetleme:** Bağlı Gemini Chat Model, hazırlanan girdiyi kısa bir günlük özete dönüştürüyor.
6. **Gönderim:** Telegram sendMessage işlemi oluşturulan özeti yapılandırılmış sohbete iletiyor.

## Çalışma biçimi ve kapsam

Zamanlanmış ve elle tetikleme aynı devam adımlarını kullanıyor. Dolayısıyla test çalıştırması da günlük çalıştırmayla aynı toplama, hazırlama, özetleme ve gönderme hattını izliyor. Mevcut şemada dört RSS girdisi, append modunda birleştirme, bir Code hazırlık adımı, Gemini özeti ve Telegram gönderimi yer alıyor. Veritabanı, web sitesi tarayıcısı veya gönderim öncesi insan onayı adımı görünmüyor.

RSS öğeleri ve hazırlanan istem özetlenmek üzere Gemini’ye aktarılıyor; sonuç ardından Telegram’a gönderiliyor. Yukarıdaki workflow şeması bu bileşenleri ve aralarındaki bağlantıları gösteriyor.`,
    outcome: "Dört teknoloji ve yapay zekâ araştırma kaynağını otomatik sabah özetinde birleştiriyor; toplama, istem hazırlama, Gemini ile özetleme ve Telegram’a gönderme adımları birbirinden ayrılıyor.",
  },
};

migrate((app) => {
  for (const slug in expanded) {
    const records = app.findRecordsByFilter("projects", "slug = {:slug}", "", 1, 0, { slug });
    if (!records.length) throw new Error(`Expected project record not found: ${slug}`);
    const record = records[0];
    for (const key in expanded[slug]) record.set(key, expanded[slug][key]);
    app.save(record);
  }
}, (app) => {
  for (const slug in previous) {
    const records = app.findRecordsByFilter("projects", "slug = {:slug}", "", 1, 0, { slug });
    if (!records.length) continue;
    const record = records[0];
    for (const key in previous[slug]) record.set(key, previous[slug][key]);
    app.save(record);
  }
});

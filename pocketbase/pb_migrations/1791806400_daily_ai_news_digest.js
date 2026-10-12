// Adds the bilingual Dokploy-hosted n8n daily AI news digest project.
migrate((app) => {
  const collection = app.findCollectionByNameOrId("projects");
  const projects = [
    {
      slug: "daily-ai-news-digest",
      title: "Daily AI News Digest",
      description: "A self-hosted n8n workflow that gathers updates from Hacker News, arXiv cs.AI, Hugging Face, and OpenAI, then sends a Gemini-written digest to Telegram every morning.",
      content: "# Daily AI News Digest\n\nI built this n8n workflow to bring useful AI and software updates into one daily Telegram message. It runs on my Dokploy server and can also be started manually for testing.\n\n## How the workflow runs\n\n1. At 09:00 each day, it reads RSS feeds from Hacker News, arXiv cs.AI, Hugging Face, and OpenAI.\n2. It combines the feed items and prepares them for summarization.\n3. Gemini turns the collected stories into a concise digest.\n4. The finished summary is sent to my Telegram bot.\n\nThe workflow diagram above shows the scheduled and manual triggers, feed sources, merge and preparation steps, Gemini model, and Telegram delivery.",
      language: "en",
      published: true,
      featured: false,
      date: "2026-10-12 00:00:00.000Z",
      category: "AI Automation",
      tags: ["n8n", "automation", "rss", "gemini", "telegram", "dokploy"],
      cover: "",
      demo_url: "",
      source_url: "",
      outcome: "Four research and engineering feeds become one readable Telegram digest each morning, with a manual trigger available for test runs.",
      order: 6,
    },
    {
      slug: "daily-ai-news-digest-tr",
      title: "Günlük Yapay Zekâ Haber Özeti",
      description: "Hacker News, arXiv cs.AI, Hugging Face ve OpenAI kaynaklarını toplayan; Gemini ile özetleyip her sabah Telegram’a gönderen, kendi sunucumda çalışan bir n8n akışı.",
      content: "# Günlük Yapay Zekâ Haber Özeti\n\nYapay zekâ ve yazılım alanındaki gelişmeleri her gün tek bir Telegram mesajında toplamak için bu n8n akışını hazırladım. Dokploy sunucumda çalışıyor; test etmek için elle de başlatılabiliyor.\n\n## Akış nasıl çalışıyor?\n\n1. Her gün saat 09:00’da Hacker News, arXiv cs.AI, Hugging Face ve OpenAI RSS kaynaklarını okuyor.\n2. Akışlardan gelen içerikleri birleştirip özete hazırlıyor.\n3. Gemini, toplanan haberleri kısa bir özete dönüştürüyor.\n4. Hazırlanan özet Telegram botuma gönderiliyor.\n\nYukarıdaki şema; zamanlanmış ve elle tetiklemeyi, RSS kaynaklarını, birleştirme ve hazırlık adımlarını, Gemini modelini ve Telegram’a gönderimi gösteriyor.",
      language: "tr",
      published: true,
      featured: false,
      date: "2026-10-12 00:00:00.000Z",
      category: "Yapay Zekâ Otomasyonu",
      tags: ["n8n", "otomasyon", "rss", "gemini", "telegram", "dokploy"],
      cover: "",
      demo_url: "",
      source_url: "",
      outcome: "Dört araştırma ve yazılım kaynağı her sabah okunabilir tek bir Telegram özetine dönüşüyor; akış elle de test edilebiliyor.",
      order: 6,
    },
  ];

  for (const data of projects) {
    const existing = app.findRecordsByFilter(
      "projects",
      "slug = {:slug}",
      "",
      1,
      0,
      { slug: data.slug },
    );
    if (existing.length) continue;

    const record = new Record(collection);
    for (const key in data) record.set(key, data[key]);
    app.save(record);
  }
}, (app) => {
  for (const slug of ["daily-ai-news-digest", "daily-ai-news-digest-tr"]) {
    const records = app.findRecordsByFilter("projects", "slug = {:slug}", "", 1, 0, { slug });
    for (const record of records) app.delete(record);
  }
});
